/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.test.MyDeferredBundleAction1");

dojo.require("com.ibm.social.layout.test.MyAction");

dojo.declare("com.ibm.social.layout.test.MyDeferredBundleAction1", [com.ibm.social.layout.test.MyAction], {
   name: "BundleAction1 (loaded)",
   msg: "Executing deferred bundle action 1!"
});
