/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.action.DeferredExample");
dojo.require("lconn.share.action.DeferredAction");

dojo.declare("lconn.share.action.DeferredExample", [lconn.share.action.DeferredAction], {
   //delegateName: "lconn.share.action.impl.DeferredExample",
   //delegateBundle: "lconn.share.action.impl._bundle",
   constructor: function(app, opts) {
      this.app = app;
      this.opts = opts;
   }
});
