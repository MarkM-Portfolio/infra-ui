/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "ic-core/auth",
      "../util/trace"
], function(lang, auth, trace) {

   var sso_reauth_callback = lang.getObject("com.ibm.lconn.gadget.services.sso_reauth_callback", true);
   /**
    * registers an rpc service that provides the CRE SSO reauth API with a login
    * URL
    */
   sso_reauth_callback.registerService = function(container) {
      container.rpcRegister("_cre_sso_reauth_cb", function(rpcArgs) {
         // may be useful in other cases
         // var site = rpcArgs[osapi.container.GadgetSite.RPC_ARG_KEY];
         trace.log("_cre_sso_reauth_cb rpc service fired with arguments", arguments);
         trace.log("redirecting to login...");
         auth.logoutAndlogin();
      });
   };

   return sso_reauth_callback;
});
