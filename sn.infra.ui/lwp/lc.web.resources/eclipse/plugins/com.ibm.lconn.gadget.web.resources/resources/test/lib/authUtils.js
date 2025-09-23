/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


dojo.provide('com.ibm.lconn.gadget.test.lib.authUtils');

dojo.require('lconn.core.url');
dojo.require('lconn.core.config.services');
dojo.require('com.ibm.oneui.util.proxy');
dojo.require('com.ibm.social.incontext.util.proxy');

com.ibm.lconn.gadget.test.lib.authUtils =
(function(
 dojo,
 lconn_core_url_,
 lconn_core_config_services_,
 com_ibm_oneui_util_proxy_)
{ 
	var api_ = {};
	
	// hook to indicate login fail
	var loginSuccess_ = true;
	
	// validate that we are logged in
	function validateLogin_() {
		var location_ = dojo.global.location;
		
		var creResUrl_ = lconn_core_config_services_.opensocial,
			creResUrlObj_ = lconn_core_url_.parse(
				location_.toString(), creResUrl_ ? com_ibm_oneui_util_proxy_(
					lconn_core_url_.getServiceUrl(creResUrl_).toString()) : "");
		
		dojo.xhrGet({
			url: com.ibm.social.incontext.util.proxy(creResUrlObj_.toString() + "/ic/rest/isAuthenticated"),
			handleAs: "json",
			preventCache: true,
			sync: true,
			failOk : true,
			error: function(response, ioArgs) {
				if(ioArgs && ioArgs.xhr && ioArgs.xhr.status == "401") {
					loginSuccess_ = false;
				}
			}
		});
	}
	
	validateLogin_();
	
	/**
	 * Indicate if the user is authenticated or not
	 * @property
	 * @public
	 */
	api_.isAuthenticated = loginSuccess_;
	
	return api_;
})
(dojo,
 lconn.core.url,
 lconn.core.config.services,
 com.ibm.oneui.util.proxy);
