/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "./auth"
], function(lang, authModule) {

   lang.setObject("test.sampleauth.isAuthenticationRequired", function(auth, response, ioArgs) {
      var isLogin = false;
      try {
         isLogin = (ioArgs && ioArgs.xhr && "true" == ioArgs.xhr.getResponseHeader("X-LConn-Login"));
      }
      catch (ignore) {
      }
      return isLogin;
   });
   authModule.setAuthenticationHandler(test.sampleauth.isAuthenticationRequired);
   authModule.setDefaultAuthenticationTests(false, false, false);

   return test.sampleauth;
});
