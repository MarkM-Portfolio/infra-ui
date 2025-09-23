/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"dojo/cookie",
	"dojo/request/util",
	"dojo/aspect",
	"ic-core/ajax/auth"
], function (lang, cookie, requestUtil, aspect, authModule) {

	// handler registered by the customer
	// there can be only one handler as defined in LotusConnections-Config.xml
	// Deprecated in 2.5.1
	//com.ibm.ajax.auth._customerHandler = null;
	
	// ensure the lconn.search.auth namespace is correctly created
	searchAuthModule = lang.getObject("lconn.search.auth", true);
	searchAuthModule.formBasedUtility = {
		// Summary:				 Utility encapsulating the logic for detecting the form based auth challenge on Ajax requests.
		// Original Author:		 Vincent Burckhardt
		// Modified for Search:	 Paul Magrath
		
		// _contextRoot: String
		_contextRoot: null,
		
		// _redirectPath: String
		_redirectPath: "/auth/login.jsp",
		
		// COOKIE_NAME: String
		COOKIE_NAME: "SearchRedirect",
		
		isCustomAuthEnabled: false,
		_customerHandler: null,
	
		init: function(contextRoot){
			this._contextRoot = contextRoot;
			this._overrideXhrCalls();
		},
		
		init: function(contextRoot, path){
			this._contextRoot = contextRoot;
		this._redirectPath = path;
			this._overrideXhrCalls();
		},
		
		SearchCustomAuthHandler: function(auth, response, ioArgs){
		// if there was any custom auth handling needed for search we'd do it here
		//alert(this._contextRoot+this._redirectPath);
		},
		
		/*
		_setupCustomAuth: function(){
			var auth = com.ibm.ajax.auth;
			
			if ((lconn.dboard.global.custom_auth_class != null) && (lconn.dboard.global.custom_auth_class != "")) {
				this.isCustomAuthEnabled = true;
				
				try {
					this.customClass = dojo.eval("new " + lconn.dboard.global.custom_auth_class + "();");
				} 
				catch (e) {
					console.log("Error while instantiating the custom detection handler class " + lconn.dboard.global.custom_auth_class);
					console.log(e.message);
					this.isCustomAuthEnabled = false;
				}
			}
		}, */
		
		_registerAuthenticationHandler: function(){
			// sumarry: register default configuration handler or customer registered handler
			
			var auth = authModule;
			var useCustomerAuthHandler = false;
			
			// should we use the handler registered by the customer?
			// useCustomerAuthHandler = this.isCustomAuthEnabled && (typeof this.customClass.authenticationHandler != "undefined");
			
			// if (useCustomerAuthHandler == false) {
				// register default authentication handler
				var url = this._contextRoot + this._redirectPath;
				var handler = {
					// just put the context root, which is form based auth protected
					url: url,
					authenticationRequired: function(response, ioArgs, onauthenticated){
						var racp = window.location.href.replace(/,/g, "%2C");
						//dojo.cookie(that.COOKIE_NAME, racp, {path: "/"});
						// dojo.cookie seems to be encoding the url, causing a redirect error
						document.cookie = "SearchRedirect=" + racp + "; path=/";
						location.href = this.url;
					},
					onSuccess: function(response, ioArgs){
						console.log("Successfully loaded");
					}
				}
				// check based on both content and reponse status
				//auth.setDefaultAuthenticationTests(false, true, true);
				auth.setAuthenticationHandler(lang.hitch(handler, handler.authenticationRequired));
		//}
		// else {
			//register customer authentication handler
		//	auth.setDefaultAuthenticationTests(true, false, false);
		//	auth.setAuthenticationHandler(dojo.hitch(this.customClass, "authenticationRequired"));
		//}
		},
		
		
		_addCustomerAuthenticationChecks: function(){
			// summary: add authentication checks registered by the customer if any
			
			var auth = authModule;
			var addCustomerChecked = this.isCustomAuthEnabled && (typeof this.customClass.isAuthenticationRequired != "undefined");
			
			if (addCustomerChecked) {
				this._customerHandler = lang.hitch(this.customClass, "isAuthenticationRequired");
				// leaving the addAuthenticationCheck here on purpose, holding till 2.5.1 to get consistency
				// the custom customer logic may already call addAuthenticationCheck to register the handler
				// adding it twice won't hurt (small performance impact)
				auth.addAuthenticationCheck(this._customerHandler);
			}
		}, 
	
		_overrideXhrCalls: function(){
			//summary: Dynamically override the dojo.xhr* calls to invoke the form based auth mechanism
			var auth = authModule;
			
			var that = this;
			//this._setupCustomAuth();
			
			this._registerAuthenticationHandler();
			
			// add our detection handler
			auth.addAuthenticationCheck(lang.hitch(this, "SearchCustomAuthHandler"));
			this._addCustomerAuthenticationChecks();
			
			aspect.around(requestUtil, "parseArgs", function(originalFunc){
				return function(url, options, skipData) {
					try {
						options = auth.prepareSecure(options);
					} 
					catch (e) {
						console.log("exception in overriden dojo/request/xhr (form-based auth");
						console.log(e);
					}
					 
					return originalFunc(url, options, skipData);
				};
			});
		}
	};
	
	return searchAuthModule.formBasedUtility;
});