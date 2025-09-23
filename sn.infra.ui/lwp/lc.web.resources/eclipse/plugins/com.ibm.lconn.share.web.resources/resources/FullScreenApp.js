/* Copyright IBM Corp. 2009, 2016  All Rights Reserved.              */

dojo.provide("lconn.share.FullScreenApp");

dojo.require("lconn.share.util.urifragment");
dojo.require("lconn.share.AbstractApp");
dojo.require("lconn.share.util.history");
dojo.require("lconn.share.util.misc");
dojo.require("com.ibm.oneui.util.Url");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.urifragment");
dojo.require("dijit._base.wai"); // triggers dijit_a11y
dojo.require("lconn.core.config.features");

dojo.declare("lconn.share.FullScreenApp", [lconn.share.AbstractApp], {
   init: function(document) {
      var lang = this.language = dojo.getObject("lconn.share.config.formattingLanguageParam") || dojo.getObject("djConfig.locale") || "en";
      this.baseParams = {};
      this.globalUrlParams = {};
      this.document = this.d = document;

      var routes = this.routes = this.initRoutes(lang, this.globalUrlParams);
      routes.getAuthenticatedUser = dojo.hitch(this, this.getAuthenticatedUser);
      this.uriApp = routes.getAppPath();

      this.prefs = this.initPreferences();
      
      var features = lconn.core.config.features;

      //dojo.connect(dojo.doc.documentElement, "onkeypress", this, "onKeypress");
      dojo.connect(dojo.doc.documentElement, "onclick", this, "onClick");
            
      this.history = lconn.share.util.history;
      dojo.connect(this.history, "onchange", this, "load");
      return true;
   },
   
   start: function(url) {
      this.onApplicationStart();
      if (this.history) this.history.init();
      try {
         this.authenticatedUser = this.initAuthentication();
      } catch (e) {
         this.showAuthenticationError(e);
         return;
      }

      var uri = this.resolveUri(url);
      if (!this.authenticatedUser && this.isProtectedUri(uri)) {
         this.login(uri.toCanonicalString(), {redirect: true});
         return;
      }
      var debugParam = lconn.share.util.misc.first(uri.queryParameters.debug);
      if (debugParam)
    	  this.baseParams.debug = debugParam;
      var langParam = lconn.share.util.misc.first(uri.queryParameters.lang);
      if (langParam)
    	  this.baseParams.lang = langParam;
      this.load(uri);
   },
      
   initAuthentication: function() {
      return this._loadAuthentication();
   },
   
   login: function(s, opt) {
      var e = lconn.share.util.misc.last(arguments);
      if (lconn.share.util.html.isEvent(e))
         dojo.stopEvent(e);

      if (this.scene && this.scene.onlogin && this.scene.onlogin())
         return;
      
      s = s || this.getUrl();
      var f = dojo.getObject("lconn.share.config.services.login");
      if (f)
         dojo.hitch(this, f)(s);
      else {
         var url = this.routes.getLoginUrl(typeof s == "string" ? s : this.getUrl());
         if (opt && opt.redirect)
            window.location.replace(url);
         else
            window.location.href = url;      
      }
   },
   checkLogout: function(e) {
      if (this.scene && this.scene.onlogout && this.scene.onlogout())
         dojo.stopEvent(e);
   },
   logout: function(s) {
      var e = lconn.share.util.misc.last(arguments);
      if (lconn.share.util.html.isEvent(e))
         dojo.stopEvent(e);
      
      if (this.scene && this.scene.onlogout && this.scene.onlogout())
         return;
         
      var f = dojo.getObject("lconn.share.config.services.logout");
      if (f)
         dojo.hitch(this, f)(s);
      else {  
         var url = this.routes.getLogoutUrl((typeof s == "string") ? s : null);
         window.location.href = url;
         //this.navigate(url, {forceReload: true});
      }
   },
   
   onLogin: function() {
      var oldUser = this.authenticatedUser;

      try {
         this.authenticatedUser = this._loadAuthentication();
      } catch (e) {
         this.showAuthenticationError(e);
         return;
      }

      var newUser = this.authenticatedUser;
      if (!newUser) {
         console.log("App::onLogin DEBUG got notified of authentication, but somehow failed");
         this.onUserReset.apply(this,arguments);
      }
      else if (oldUser) {
         if (oldUser.id != newUser.id) {
            console.log("App::onLogin DEBUG authenticated user has changed, return to welcome page");
            this.onUserReset.apply(this,arguments);
         }
         else {
            console.log("App::onLogin DEBUG authenticated user is same as old user, no action necessary");
            this.onUserReauthenticated.apply(this,arguments);
         }
      }
      else {
         console.log("App::onLogin DEBUG authenticated user has changed, not authenticated before");
         this.onUserLogin.apply(this,arguments);
      }
   },

   onLoginError: function() {console.log("App::onLogin DEBUG authentication error");},
   onUserLogin: function() {},
   onUserReauthenticated: function() {},
   onUserReset: function() {},
   
   waitingForLogin: function() {
      return this._waitingForLogin;
   },
   
   navigate: function(url, opt) {
      if (this.scene && this.scene.onnavigate && this.scene.onnavigate(url))
         return;
      this.history.stop();

      var uri = this.resolveUri(url);
      var shortForm = this.toAnchorForm(uri);
      url = shortForm.toCanonicalString();

      var state = null;
      var pageUri = new dojo._Url(window.location.href);
      if (pageUri.path !== this.uriApp) {
        // The current URL path is different from the app URL path, so the page URL must have
        // been rewritten with pushState. So, set the state object to make history use pushState,
        // in order to prevent the page from reloading due to the path changing
        state = {};
      }
      
      if(opt && opt.forceReload) {
         this.showLoading();
         this.history.reload(url);
      }
      else {
         this.history.add(url, opt ? opt.replace : false, state);
      }
   },

   load: function(url) {
      var uri = this.resolveUri(url);
      var newUrl = uri.toCanonicalString();
      if (!this.authenticatedUser && this.isProtectedUri(uri)) {
         this.login(newUrl, {redirect: true});
         return;
      }
      this.urlState = newUrl;
      this._load(uri);
   },

   _load: function() {
      return this.inherited(arguments);
   },
   
   reload: function() {
      this.load(this.getUrl());
   },
   
   /**
    * Return true if the specified URI requires that the user be authenticated
    */
   isProtectedUri: function(uri) {
      return false;
   }   
});

lconn.share.FullScreenApp.onload = function onload(window, app) {
   if (window['pe'])
      return;
   var dj = window['dojo'];

   if (!app)
      throw "Unable to find an application to load";
   try {      
      dj.require(app);
      var appConstructor = dj.getObject(app);
   
      var app = new appConstructor();
      if (!window['pe'])
         window.pe = app;
      if (!app.init(document))
         return;
      setTimeout(function() {app.start(window.location.href);},0);
   } catch (e) {
      console.log("unable to load application");
      throw e;
   }
};
