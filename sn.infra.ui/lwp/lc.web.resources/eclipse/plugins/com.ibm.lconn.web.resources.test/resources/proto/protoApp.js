/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

(function(){

dojo.provide('lconn.test.proto.scenes.Proto');
dojo.require('lconn.core.app.scenes.AbstractScene');
dojo.require('lconn.core.app.scenes');
dojo.declare('lconn.test.proto.scenes.Proto', lconn.core.app.scenes.AbstractScene, {
   begin: function() {
      var app=this.app,lcas=lconn.core.app.scenes;
      lcas.applyConnectionsTemplate(app, {cols:this.app.getColumns(),titlebar2:true});
      var opt = {title:'&lt;Proto App&gt;'};
      if (this.app.getTabs())
         lcas.applyTitleBarTabs(app, this.app.getTabs(), opt);
      else
         lcas.applyTitleBar(app, opt);
   },
   end: function(newScene) {
      dojo.forEach(['main','titlebar'], dojo.hitch(this, function(el){
         dojo.destroy(this[el])
      }));
   }
});

dojo.provide('lconn.test.proto.Routes');
dojo.require('lconn.core.app.AbstractRoutes');
dojo.declare('lconn.test.proto.Routes', lconn.core.app.AbstractRoutes, {
   // TODO:
});
var instance = null;
dojo.provide('lconn.test.proto.protoApp');
dojo.require('lconn.core.app.AbstractApp');
dojo.require('lconn.core.app._DeclarativeLayoutMixin');
dojo.declare('lconn.test.proto.protoApp', [lconn.core.app.AbstractApp, lconn.core.app._DeclarativeLayoutMixin], {
   cols: 'lcr',
   tabs: null,
   rtl: false,
   nls: {error:'There was an error',warning:'Try again later'},
   constructor: function() {
      if (instance)
         throw "Only one instance of '" + this.declaredClass + "' can exist.";
      instance = this;
   },
   resolveScene: function() {
      return this.decorate(new lconn.test.proto.scenes.Proto(this));
   },
   initializeRoutes: function() {
      return new lconn.test.proto.Routes();
   },
   setRTL: function(rtl) { this.rtl = rtl; this.reload(); },
   isRTL: function() { return this.rtl; },
   setColumns: function(cols) { this.cols = cols; this.reload(); },
   getColumns: function() { return this.cols; },
   setTabs: function(tabs) { this.tabs = tabs; this.reload(); },
   getTabs: function() { return this.tabs; }
});
lconn.test.proto.protoApp.getInstance=function() {return instance;}

dojo.addOnLoad(function(){
   //lconn.core.theme.addAllStylesheets(null, 'gen4');
   new lconn.test.proto.protoApp().start();
})
})();
