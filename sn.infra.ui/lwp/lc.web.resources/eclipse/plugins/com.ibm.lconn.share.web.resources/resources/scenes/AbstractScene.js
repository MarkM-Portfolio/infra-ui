/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.scenes.AbstractScene");
dojo.require("lconn.share.util.misc");

dojo.declare("lconn.share.scenes.AbstractScene", null, {
   constructor: function constructor(app, sceneInfo) {
      this.app = app;
      this.sceneInfo = sceneInfo;
   },

   end: function() {
      // Reset scene header      
      var titleBar = dojo.exists("app.layout.titleBar", this) ? this.app.layout.titleBar : null;
      if (titleBar)
         titleBar.resetSceneHeader();
      
      dojo.forEach(this._connects || [], function(conn){
         dojo.forEach(conn, dojo.disconnect);
      });
      dojo.forEach(this._subs || [], dojo.unsubscribe);
      dojo.forEach(this._refs || [], lconn.share.util.misc.destroy);
   },
   
   /**
    * Return true if and only if this is the currently active
    * scene.  Use when checking to see whether to render or
    * update the page. 
    */
   isCurrentScene: function() {
      return this.app && this.app.scene == this;
   },
   
   connect: function(obj, event, context, method, dontFix) {
      if (!this._connects) this._connects = [];
      this._connects.push(dojo.connect(obj, event, context, method, dontFix));
   },
   subscribe: function(e, f) {
      if (!this._subs) this._subs = []; 
      this._subs.push(dojo.subscribe(e, this, f));
   },
   ref: function() {
      if (!this._refs) this._refs = []; 
      this._refs.push(dojo._toArray(arguments));
      return arguments[0];
   },
   
   //TODO: remove, same implementation as default in App.js
   onActionSuccess: function(e) {
      this.app.messages.add(e.messages);
   },
   
   onKeypress: function(e) {
      var actions = this.globalActions;
      if (actions)
         for (var i=0; i<actions.length; i++) {
            var action = actions[i];
            if (action.keyboardShortcut == e.keyChar && action.isValid(this.authenticatedUser,{})) {
               action.execute(this.authenticatedUser,{});
               return;
            }
         }
   },
   
   onComplete: function(type) {
      if (!this.completed) this.completed = {};
      this.completed[type || "scene"] = true;
   }   
});
