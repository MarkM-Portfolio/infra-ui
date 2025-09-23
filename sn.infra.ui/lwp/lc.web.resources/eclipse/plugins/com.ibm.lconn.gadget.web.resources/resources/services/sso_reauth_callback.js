/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.services.sso_reauth_callback");

dojo.require("lconn.core.auth");
dojo.require("com.ibm.lconn.gadget.util.trace");

/**
 * registers an rpc service that provides the CRE SSO reauth API with a login URL
 */
com.ibm.lconn.gadget.services.sso_reauth_callback.registerService = function(container){
	container.rpcRegister("_cre_sso_reauth_cb", function(rpcArgs) {
		// var site = rpcArgs[osapi.container.GadgetSite.RPC_ARG_KEY]; // may be useful in other cases
		com.ibm.lconn.gadget.util.trace.log("_cre_sso_reauth_cb rpc service fired with arguments", arguments);
		com.ibm.lconn.gadget.util.trace.log("redirecting to login...");
		lconn.core.auth.logoutAndlogin();
	});
};
