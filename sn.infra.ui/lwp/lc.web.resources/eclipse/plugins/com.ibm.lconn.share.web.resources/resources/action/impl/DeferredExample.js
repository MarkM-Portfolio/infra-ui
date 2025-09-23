/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.action.impl.DeferredExample");

dojo.declare("lconn.share.action.impl.DeferredExample", null, {
   constructor: function(app, opts) {
      this.app = app;
      this.opts = opts;
   },
   execute: function(item, opt) {
      alert("Deferred action executed");
   }
});
