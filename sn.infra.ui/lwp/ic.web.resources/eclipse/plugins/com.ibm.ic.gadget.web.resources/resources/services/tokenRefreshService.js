/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"dojo/cookie",
	"ic-core/auth",
	"./TokenRefreshHandler"
], function (lang, cookie, auth, TokenRefreshHandlerModule) {

	com.ibm.lconn.gadget.services.tokenRefreshService =
	(function(
	 dojo,
	 TokenRefreshHandler,
	 lconn_core_auth_)
	{
		// API to export
		var api_ = {};
		
		// Singleton of refresh handler
		var instance_ = new TokenRefreshHandler();
		
		/**
		 * @see com.ibm.lconn.gadget.services.TokenRefreshHandler.prototype.getContainerToken
		 */
		api_.getContainerToken = function(p) {
			return instance_.getContainerToken(p);
		};
		
		/**
		 * Get an instance of the refresh
		 * 
		 * @method
		 * @memberOf com.ibm.lconn.gadget.services.tokenRefreshService
		 * @public
		 * @return A function that can should be set as the contaner token refesh handler for the common container
		 */
		api_.getTokenRefresher = function() {
			return lang.hitch(instance_, 'tokenRefresh');
		};
		
		/**
		 * Register this service
		 * 
		 * @method
		 * @memberOf com.ibm.lconn.gadget.services.tokenRefreshService
		 * @public
		 * @return A function that can should be set as the token reresh handler
		 */
		api_.registerService = function(commonContainer) {
			instance_.setCommonContainer(commonContainer);
		};
	
		//
		// add log out handler
		//
		lconn_core_auth_.addLogoutHandler(function() {
			instance_.logoutHandler();
		});
		
		return api_;
	})
	(dojo,
	 TokenRefreshHandlerModule,
	 auth);
	return com.ibm.lconn.gadget.services.tokenRefreshService;
});
