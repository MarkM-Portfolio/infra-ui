/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.services.oauthPopupDialog");

dojo.require("com.ibm.lconn.gadget.services.dialog.IframeDialog");
dojo.require("com.ibm.lconn.gadget.services.dialog.OAuthErrorDialog");
dojo.require('com.ibm.lconn.gadget.services.tokenRefreshService');

dojo.require('com.ibm.lconn.gadget.util.trace');
dojo.require('lconn.core.auth');

/**
 * registers an rpc service that allows the connections specific oauthpopup gadget api override to open oauth authorization windows as modal
 * JS dialogs instead of popup browser windows
 */
com.ibm.lconn.gadget.services.oauthPopupDialog.registerService = function(container) {
	// map of iframes windows -> handler to track what action to take when a window auth has autocompleted
	var windowInfo_ = {};
	
	var tokenRefreshService_ = com.ibm.lconn.gadget.services.tokenRefreshService,
		authService_ = lconn.core.auth;
	
	var trace_ = com.ibm.lconn.gadget.util.trace;
	
	var StatusReturns_ = {
		/**
		 * Indicates that the OAuth authorize flow has completed successfully.
		 */
		AUTHORIZE_SUCCESS : 'authorize_success',

		/**
		 * Indicates that the authorize attempt was rejected by the user.
		 */
		AUTHORIZE_REJECTED : 'authorize_rejected',

		/**
		 * Indicates that the there was some form of server error during the grant flow.
		 */
		AUTHORIZE_SERVER_ERROR : 'authorize_server_error',

		/**
		 * Indicates that auto-grant flow completed and rejected the attempt.
		 */
		AUTO_AUTHORIZE_REJECTED : 'auto_authorize_rejected'
	};

	// allows iframes to indicate auth status to the container
	container.rpcRegister("_ic_oauth_dialog_status", function(rpcArgs, data) {
		if (!data.status)
			return;

		var status = data.status,
			errMessage = data.message,
			closeHandler = windowInfo_[rpcArgs.f].handler,
			dialog = windowInfo_[rpcArgs.f].dialog;
				
		if (closeHandler === undefined)
			return;
		
		switch (status) {
			case StatusReturns_.AUTHORIZE_SUCCESS:
				closeHandler();
				break;
			case StatusReturns_.AUTHORIZE_REJECTED:
				closeHandler();
				break;
			case StatusReturns_.AUTHORIZE_SERVER_ERROR:
				if (dialog.isAuto) {
					closeHandler(true);
				} else {
					dialog.show();
				}
				break;
			case StatusReturns_.AUTO_AUTHORIZE_REJECTED:
				if (dialog.isAuto) {
					closeHandler(true);
				} else {
					dialog.show();
				}
				break;
		}
		
		
		if(errMessage)
			console.log(errMessage);
	});

	
	
	var siteIdLock_ = {};
	
	container.setupNonGadgetRpcEndpoint();
	
	container.rpcRegister("_ic_oauth_dialog_open", function(rpcArgs, url, windowOptions, pid, isAuto) {
		var site = rpcArgs[osapi.container.GadgetSite.RPC_ARG_KEY];
		var siteId = site.getId();
		var handlerIndex = null;
		
		//
		// indicate close
		function rpcIndicateClose(isAutoFail) {
			site.rpcCall("_ic_oauth_dialog_closed", function(){}, { isAutoFail : isAutoFail, pids : siteIdLock_[siteId] });
			delete(siteIdLock_[siteId]);								
			if (handlerIndex) {
				delete windowInfo_[handlerIndex];
			}
		}
		
		//
		// display the dialog
		function doDialog() {

			// probably don't need all these serviceIds, but just in case...
			var rpcServiceIds = ["_ic_oauth_dialog_status", "__ack", "__cb", 
			                     "gadgets.rpc.config", "gadgets.rpc.register", 
			                     "gadgets.rpc.unregister", "gadgets.rpc.registerDefault", 
			                     "gadgets.rpc.unregisterDefault", 
			                     "gadgets.rpc.forceParentVerifiable", "gadgets.rpc.call", 
			                     "gadgets.rpc.getRelayUrl", "gadgets.rpc.setRelayUrl", 
			                     "gadgets.rpc.setAuthToken", "gadgets.rpc.setupReceiver", 
			                     "gadgets.rpc.getAuthToken", "gadgets.rpc.removeReceiver", 
			                     "gadgets.rpc.getRelayChannel", "gadgets.rpc.receive", 
			                     "gadgets.rpc.receiveSameDomain", "gadgets.rpc.getOrigin", 
			                     "gadgets.rpc.getTargetOrigin"],
				ifd = new com.ibm.lconn.gadget.services.dialog.IframeDialog(url, windowOptions, isAuto),
				iframeId = com.ibm.lconn.gadget.util.specHelper.nextDomId(),
				iframeContainerId = com.ibm.lconn.gadget.util.specHelper.nextDomId();
			
			gadgets.rpc.setUpRpcIdsForNonGadgetIframe(iframeId, iframeContainerId, url, rpcServiceIds); // magic!
			ifd.init(iframeId, iframeContainerId);
			if(!isAuto) {
				ifd.show();
			}
			
			// in top function scope
			handlerIndex = iframeId;
	
			var closeHandler = function(isAutoFail) {
				ifd.destroy();
				rpcIndicateClose(isAutoFail);
			};
	
			// support either auto close, or manual close as a fallback
			dojo.connect(ifd, "onClose", closeHandler);
			windowInfo_[iframeId] = {
				window : ifd.getWindow(),
				handler : closeHandler,
				dialog: ifd
			};
		}		
		
		//
		// main logic
		//
		if (!siteIdLock_[siteId]) {
			siteIdLock_[siteId] = [pid];
			
			tokenRefreshService_.getContainerToken().then(
				function(data) {
					var userData = data.userData;
					
					if (!userData.isAuth) {
						authService_.login();
					} else {
						doDialog();
					}					
				},
				function(error) {
					trace_.error("Error checking user authentication: " + error)
					var dialog = new com.ibm.lconn.gadget.services.dialog.OAuthErrorDialog();
					dialog.startup();
					dialog.show();
					rpcIndicateClose(isAuto);
				});
			
		} else {
			siteIdLock_[siteId].push(pid);
		}
		
	});
};
