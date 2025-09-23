/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.test.MyDeferredActionWithError");

dojo.require("com.ibm.social.layout.Action");

dojo.declare("com.ibm.social.layout.test.MyDeferredActionWithError", [com.ibm.social.layout.Action], {
   name: "Error (loaded)",
   execute: function(){
      throw "I threw an error!";
   }
});
