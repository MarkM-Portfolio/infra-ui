/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.test.MyDeferredBundleAction2");

dojo.require("com.ibm.social.layout.test.MyAction");

dojo.declare("com.ibm.social.layout.test.MyDeferredBundleAction2", [com.ibm.social.layout.test.MyAction], {
   name: "BundleAction2 (loaded)",
   msg: "Executing deferred bundle action 2!"
});
