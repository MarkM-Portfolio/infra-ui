/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

/*global test*/
dojo.provide("test.sampleauth");
dojo.require("com.ibm.ajax.auth");

test.sampleauth.isAuthenticationRequired = function(auth, response, ioArgs) {
   var isLogin = false;
   try {
      isLogin = (ioArgs && ioArgs.xhr && "true" == ioArgs.xhr.getResponseHeader("X-LConn-Login"));
   } catch (ignore) {}
   return isLogin;
};
com.ibm.ajax.auth.setAuthenticationHandler(test.sampleauth.isAuthenticationRequired);
com.ibm.ajax.auth.setDefaultAuthenticationTests(false, false, false);
