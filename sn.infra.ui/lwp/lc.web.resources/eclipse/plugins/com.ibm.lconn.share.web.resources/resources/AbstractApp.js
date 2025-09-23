/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.AbstractApp");
dojo.require("lconn.share.util.uri");

dojo.declare("lconn.share.AbstractApp", null, {
   loadRecursion: 0,
   _busy: 0,

   constructor:function constructor() {},
   
   destroy: function() {
      lconn.share.util.misc.destroy(this.globalActions);
      this.globalActions = null;
   },

   /** 
    * Implementors should override this class if they wish to perform behavior prior to application start.
    * Will be executed prior to the initialization of the user object 
    */
   onApplicationStart: function() {
      dojo.publish("lconn/share/app/start", [this]);
   },
      
   /** 
    * Implementors must define this method to create a preferences object
    initPreferences: function() {},
    */
   /** 
    * Implementors must define this method to create a route definition 
    * @param lang The current language parameter
    * @param parameters any parameters which should be globally applied to URLs
    initRoutes: function(lang, parameters) {},
    */
   
   getAuthenticatedUser: function() {
      return this.authenticatedUser;
   },
   getAuthenticatedUserId: function() {
      return this.authenticatedUser ? this.authenticatedUser.id : null;
   },
   isAuthenticated: function() {
      var u = this.authenticatedUser;
      return (u && typeof u != "undefined");
   },
   _handleCheckAuth: function(async, response, ioArgs) {
      ioArgs = ioArgs || {};
      dojo.setObject("args.auth.preventReload", true, ioArgs);
      
      if (this.auth.isAuthenticationRequired(response, ioArgs)) {
         this.onAuthenticationRequestDetected(response, ioArgs, null);
         async(false, ioArgs);
      }
      else if (response instanceof Error) {
         async(response, ioArgs);
      }
      else {
         var user = this.createUser(response.items[0]);
         user.permissions = new lconn.share.bean.StreamPermissions({authenticatedId: user.id, guest: user.isGuest, orgId: user.orgId});
         var loggedIn = (user && typeof user == "object" && this.authenticatedUser && this.authenticatedUser.id == user.id)
         if (loggedIn)
            this.authenticatedUser = user;
         else
            this.onAuthenticationRequestDetected(response, ioArgs, null);
         
         async(loggedIn, ioArgs);
      }
   },
   checkAuthentication: function(async) {
      var v = {};
      var deferred = this.net.getJson({
         url: this.routes.getUserInfoServiceUrl(),
         auth: {secured: false},
         handle: dojo.hitch(this, "_handleCheckAuth", async),
         noStatus: true
      });
      return deferred;
   },
   getNonce: function(callback) {
      var app = this;
      return this.checkAuthentication(function(response, ioArgs) {
         if(response instanceof Error)
            callback(response, ioArgs);
         else if(response == false) {
            var error = new Error("unauthenticated");
            error.code = "unauthenticated";
            callback(error, ioArgs);
         }
         else
            callback(app.authenticatedUser.nonce, ioArgs);
      });
   },
   createUser: function(user) {
      if (!user)
         return null;
      if (!user.photoURL)
         user.photoURL = this.routes.getUserPhotoUrl(user);
      return user;
   },
   /**
    * Implementors must define this method to change the current URL
    navigate: function(url, opt) {},
    */

   /**
    * Decodes URL state into a new scene, fires the appropriate event listeners, and then changes the scene.  Will shortcut scene change
    * if the current scene implements the "refresh(sceneInfo)".  Scenes may return a URL from their begin method that will switch the current
    * scene (behaves like an HTTP forward).
    *
    * @param url A decoded "safe" dojo._Url
    */
   _load: function(url) {
      if (this.sceneAvailable) {
        this._pageLoaded = true;
      }
      
      this.sceneAvailable = false;
      if (this.loadRecursion > 10) {
         this.loadRecursion = 0;
         throw "Scenes have recursed "+this.loadRecursion+" times, url is "+url;
      }

      try {
         this.working();

         var state = this._decodeState(url);
         
         if (state instanceof dojo.Deferred)
            state.addCallback(this, "_preLoadFinal").addErrback(this, "showError");
         else
            this._preLoadFinal(state);
      } catch (e) {
         if (!e._handled) {
            console.error(e);
            this.showError(e);
         }
         if (dojo.isIE)
            throw e;
      }
   },
   
   _shouldSkipLoad: function(state) {
      if (!lconn.core.config.features("fileviewer-detailspage") || !this._pageLoaded) {
         return false;
      }
      
      return state.showViewer;
   },
   
   _preLoadFinal: function (state) {
      this._skipLoad = this._shouldSkipLoad(state);

      var viewerDeferred;
      if (state.showViewer) {
         viewerDeferred = this.showViewer(state.fileId);
      }

      if (!this._skipLoad) {
         if (viewerDeferred) {
            viewerDeferred.always(dojo.hitch(this, this._loadFinal, state));
         } else {
            this._loadFinal(state);
         }
      } else {
         this.sceneAvailable = true;
         this.loadRecursion = 0;
         this.idle();
      }
   },
   
   showViewer: function (fileId) {
      var deferred;

      var viewer = dojo.getObject("ic-share.fileviewer.ConnectionsFileViewer");
      if (viewer) {
         deferred = viewer.openFromId(fileId, {showErrorInOverlay: false}).then(null, dojo.hitch(this, function(error) {
            if (this.messages) {
               setTimeout(dojo.hitch(this, function () {
                  this.messages.add({
                     error: true,
                     message: error.userMessage
                  });
               }), 1000);
            }
         }));
      } else {
         deferred = new dojo.Deferred();
         deferred.reject();
      }

      return deferred;
   },
   
   getUrl: function(opt) {	   	   
	   var uri = window.location.href || this.urlState;
	   
	   if (opt && opt.appRelative) {
		   var uri = this.resolveUri(uri);
		   var base = this.routes._comPath ? this.routes.getBaseCommPath() : this.routes.getBasePath();
		   if (uri.path.indexOf(base) == 0) {
		   	uri = new com.ibm.oneui.util.Url(uri);
		   	uri.path = uri.path.substring(base.length);
		   	uri.scheme = uri.authority = null;
		   	uri = uri.toString();
		   }
	   } 
	   
	   return uri;
   },
   /**
    * Takes any URL input and sanitizes it into a dojo URI object. Will throw if the URL is null.
    */
   resolveUri: function(url) {
      var uri;
      if (typeof url == "string") {
         uri = lconn.share.util.uri.parseUri(url);
         uri = this.fromAnchorForm(uri);
      }
      else if (url instanceof dojo._Url)
         uri = url;
      else
         throw "resolveUri requires a string or dojo._Url";
      return uri;
   },
   
   toAnchorForm: function(uri) {
      return lconn.share.util.urifragment.toAnchorForm(uri, this.routes.getAppPath(), this.baseParams);
   },

   fromAnchorForm: function(uri) {
      return lconn.share.util.urifragment.fromAnchorForm(uri, this.routes.getAppPath());
   },
   
   _loadFinal: function(sceneInfo) {
      try {
         if (this.scene && this.scene.refresh) {
            this.loadRecursion++;
            if (this.scene.refresh(sceneInfo)) {
               this.loadRecursion = 0;
               this.sceneAvailable = true;
               return;
            }
         }

         var id = sceneInfo.id;
         if (!id)
            throw "No scene identifier from _decodeState()";
         var dj = dojo;
         dj.require(id);
         var constructor = dojo.getObject(id);
         if (!id)
            throw "No object defined for '"+id+"'";

         var scene = new constructor(this, sceneInfo);
      
         var oldScene = this.scene;
         
         this._endScene(scene);

         this.onBeforeSceneChange(oldScene,scene);
         dojo.publish("lconn/share/scene/begin", [id, scene, sceneInfo, this]);
   
         this.scene = scene;
         var next = scene.begin(oldScene);
         
         // Support scenes that simply return a URL @deprecated after 3.0
         if (typeof next == "string")
            next = {url: next};
         
         // Scenes may return an object indicating what the next scene should be, and
         // whether the current URL should be kept or replaced.  Scenes that do this 
         // should copy data over during the begin method.
         if (next) {
            if (!next.url)
               throw "Must return a URL for the next state";
            
            if (next.redirect) {
               this.loadRecursion = 0;
               this.hasScene = this.sceneAvailable = true;
               this.navigate(next.url, {replace: true});
            }
            else {
               this.loadRecursion++;
               var uri = this.resolveUri(next.url);
               this._load(uri);
            }
            return;
         }

         this.loadRecursion = 0;
         this.hasScene = this.sceneAvailable = true;
         
      } catch (e) {
         try {e._handled = true;} catch (e1) {}
         console.error(e);
         this.showError(e);
         if (dojo.isIE)
            throw e;
      } finally {
         this.idle();
      }
   },
   
   _endScene: function(arg) {
      var s = this.scene;
      if (s && s.end) {
         try {
            s.end(arg);
         } catch (e) {
            console.error(e);
         }
         this.scene = null;
      }
   },
   
   /**
    * Implementors should provide a method that returns an object with at least the following parameter:
    *
    *   id: the class name of a scene to load
    *
    _decodeState: function(url) {},
    */

   /** 
    * Called just before a scene starts
    */
   onBeforeSceneChange: function(oldScene,newScene) {},
   
   JS_HREF: /^javascript:/,
   onClick: function(e) {
      if (e.target) {
         var t = e.target;
         var nn = t.nodeName.toLowerCase();
         
         if ("input" == nn || "select" == nn || "option" == nn)
            return;
         
         if ("a" != nn) {
            do {
               t = t.parentNode;
               if (!t || t._nolink) {
                  t = e.target.parentNode;
                  while (t && !t._nolink) {
                     t._nolink = true;
                     t = t.parentNode;
                  } 
                  return;
               }
            }
            while (t.nodeName.toLowerCase() != "a");
         }

         if (dojo.hasClass(t, "lconnDownloadable")) {
            if (dojo.isIE && this.history)
               this.history.resetHash();
         }
         else if (dojo.attr(t, "topic")) {
            dojo.publish(dojo.attr(t, "topic"), [t, e]);
         }
         else if (t.href && t.href.indexOf(this.uriApp) != -1 && !t.ignore && !this.JS_HREF.exec(t.href) && dojo.attr(t, "ignore") !== "true") {
            var uri;
            try {uri = lconn.share.util.uri.parseUri(t.href);} catch (e) {}
            if (uri && uri.path && uri.path.indexOf(this.uriApp) == 0) {
               dojo.stopEvent(e);
               this.navigate(t.href);
               return;
            }
         }
      }
   },
   
   find: function() {
      var item;
      var scene = this.scene;
      if (scene && scene.find) {
         var f = scene.find;
         item = f.apply(scene, arguments);
      }
      if (!item)
         item = this._find.apply(this, arguments);
      return item;
   },
   _find: function() {},
   
   getGlobalActions: function() {
      if (!this.globalActions)
         this.initGlobalActions();
      return this.globalActions;
   },  
   initGlobalActions: function() {
      this.globalActions = [];
   },
   
   working: function(text) {
      if (this._busy++ >= 0) {
         if (this.hasScene)
            this.showWorking(text);
      }
   },
   idle: function(force) {
      if (--this._busy < 1 || force == true) {
         this._busy = 0;
         this.showIdle();
      }
   },
   showWorking: function(text) {},
   showIdle: function() {},
   
   activateHelp: function() {},
   
   showLoading: function() {},
   showAuthenticationError: function(e) {},
   showError: function(e) {}
});
