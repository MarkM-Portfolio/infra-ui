/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/request",
	"ic-core/config",
	"ic-core/config/services",
	"ic-core/url",
	"ic-incontext/util/proxy",
	"ic-ui/util/proxy"
], function (dojo, request, config, services, url, ibmSocialIncontextUtilProxy, proxy) {

	
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
			
			request(ibmSocialIncontextUtilProxy(creResUrlObj_.toString() + "/ic/rest/isAuthenticated"), {method: "GET", handleAs: "json", preventCache: true, sync: true, failOk : true}).then(null, (response, ioArgs) {
					if(ioArgs && ioArgs.xhr && ioArgs.xhr.status == "401") {
						loginSuccess_ = false;
					}
				}
			});
		);
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
	 url,
	 services,
	 proxy);
	return com.ibm.lconn.gadget.test.lib.authUtils;
});
