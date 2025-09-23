/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/cookie",
	"dojo/request",
	"ic-core/util/LCDeferred",
	"../config/settings",
	"ic-core/auth",
	"ic-core/url",
	"ic-core/config/services",
	"../util/trace",
	"ic-ui/util/proxy"
], function (dojo, declare, lang, cookie, request, LCDeferredModule, settings, auth, url, services, trace, proxy) {

	/**
	 * Exports a single method - 
	 * 	'refresh(callback)'
	 * 
	 */
	com.ibm.lconn.gadget.services.TokenRefreshHandler = 
	(function(
	 dojo,
	 lconn_core_auth,
	 lconn_core_url,
	 lconn_core_config_services,
	 LCDeferred,
	 com_ibm_oneui_util_proxy,
	 trace_,
	 settings_,
	 undef) 
	{
		/* In this file, the userData tuple is of the format:
		 * 
		 * { 
		 *  isAuth : ..,
		 * 	userId : ..
		 * }
		 */
		var api_ = {};
		
		var securitySettings_ = settings_.security;
		
		var HEADER_LC_AUTH_ = 'X-LConn-Auth',
			HEADER_CRE_USER_ = 'X-IC-CRE-User',
			HEADER_CRE_REQ_ORIGIN_ = 'X-IC-CRE-Request-Origin',
			HEADER_NONCE_ = 'X-Update-Nonce',
			COOKIE_CONTAINER_TOKEN_CHECK_ = 'X-IC-Container-Token';
			
		var creResUrl_ = lconn_core_config_services.opensocial,
			creResUrlObj_ = lconn_core_url.parse(
				lang.getObject("location", dojo.global).toString(), 
				creResUrl_ ? 
					com_ibm_oneui_util_proxy(lconn_core_url.getServiceUrl(creResUrl_).toString()) : "");
		
		var location_ = dojo.global.location;
		
		trace_.debug('Container token refresh TTL is: ' + securitySettings_.containerTokenTTLSec);
		trace_.debug('Container token check: ' + securitySettings_.containerTokenCheckSec);
		
		/**
		 * Check that the old/new user are the same
		 * @private
		 * @function
		 * @param {Object} oldUserData A structure containing the user data that was valid when the page first loaded
		 * @param {Object} 
		 */
		function checkSameUser_(oldUserData, newUserData) {
			return oldUserData && oldUserData.userId === newUserData.userId;
		}	
		
		/**
		 * Invalidate all of the gadget tokens in the container
		 * @private
		 */
		function invalidateGadgetTokens_(commonContainer) {
			trace_.debug('Invalidating current token data');
			
			var sites = commonContainer.sites_;
		
			for (var siteId in sites) {
				var site = sites[siteId];
				if (site instanceof osapi.container.GadgetSite) {
					var holder = site.getActiveSiteHolder();
					var gadgetInfo = commonContainer.service_.getCachedGadgetMetadata(holder.getUrl());
					gadgetInfo[osapi.container.MetadataResponse.NEEDS_TOKEN_REFRESH] = true; // force token refresh
				}
			}
		}
		
		/**
		 * Helper to work over bugs in dojo.cookie
		 */
		function getCookieVals_(cookieName) {
			var c = document.cookie,
				pattern = "(?:^|; )" + dojo.regexp.escapeString(cookieName) + "=([^;]*)",
				matches,
				resMatcher = new RegExp(pattern), 
				res, results = [], i;
			
			matches = c.match(new RegExp(pattern, "g"));
			
			if (matches && matches.length > 0) {
				i = matches.length;
				while (i--) {
					res = matches[i];
					results.push(decodeURIComponent(res.match(resMatcher)[1]));
				}
			}
			
			return results;
		}
		
		/**
		 * Helper to check same user for all cookie values
		 */
		function checkSameUserForAllVals_(userData, cookieValues) {
			var cookieValue, cookieVal, cookieDom;
			var foundMatch = false, foundMatchDomain = null, isMatch;
			var domain = location_.hostname;
			
			var i, c;
					
			if (cookieValues) {
				i = cookieValues.length;
				while (i--) {
					cookieValue = cookieValues[i];
					if ((c = cookieValue.indexOf('$')) > 0 && c < cookieValue.length-1) {
						cookieDom = cookieValue.substring(0, c);
						cookieVal = cookieValue.substring(c+1);
						
						isMatch = checkSameUser_(userData, {userId : cookieVal, isAuth : (cookieVal.indexOf('anonymous') !== 0) });
						
						// value is sub of expected domain
						if ((domain.indexOf(cookieDom) + cookieDom.length) === domain.length) {
							if (foundMatchDomain === null || cookieDom === domain) { // first time through; or have more specific value
								if (foundMatchDomain === cookieDom) {
									foundMatch = foundMatch || isMatch;
								} else {
									foundMatchDomain = cookieDom;
									foundMatch = isMatch;
								}
							}
						}
					}
				}	
			}
			
			return foundMatch;
		}
		
		/* Handle edge case of poorly configured AJAX proxy or proxy that is mangling cookies*/
		function ensureReauthTokenFromProxy_(userData) {
			var cookieVals = getCookieVals_(COOKIE_CONTAINER_TOKEN_CHECK_);
			if (!checkSameUserForAllVals_(userData, cookieVals)) {
				// in theory this will only be hit in the proxy case, however double check that the cookie is accessible at this moment in time
				trace_.debug("Must be in proxy situation, not getting container token cookie back from server.");
	
				var cookieValue = location_.hostname + "$" + userData.userId;
				cookie(COOKIE_CONTAINER_TOKEN_CHECK_, cookieValue , {path: '/'});
			}
		}
		
		/**
		 * 
		 * @public
		 * @class
		 */
		api_ = declare('', [], {
			_userData : null,
			_lastUpdate : null,
			_containerToken : null,
			_commonContainer : null,
			
			/**
			 * Get the initial user data.  If this object is uninitialized, set the initial user data
			 * @method
			 * @memberOf com.ibm.lconn.gadget.container.services.TokenRefreshHandler.prototype
			 * @public
			 * @return {Object} A promise containing a data slug of the format:
			 * 	{
			 * 		creToken : creContainerTokenJson,
			 * 		userData : { /- user data tuple -/ }
			 * 	}
			 */
			getContainerToken : function(loadCREPromise) {
				var	self = this,
					tokenLoadPromise = new LCDeferred(),
					p = loadCREPromise ? loadCREPromise : com.ibm.lconn.gadget.container.iContainer2.getIRuntime();
				if (typeof(window['__isgadget']) == 'undefined') { // only get a container token when not running within a gadget
					p.then(function() {
						if (typeof(window['shindig']) === 'undefined') {
							console.error('FATAL: shindig is undefined, returning');
							return;
						}
						var user = (typeof(window['user']) !== 'undefined' ?  window['user'] : null),
							 userid = (typeof(window['userid']) !== 'undefined' ?  window['userid'] : null),
							 u = (user ? user : userid),
							 sha1 = shindig.sha1();

						u = (u ? u : (auth ? auth.getUser() : null));
						if (u) {
                     sha1.update(u);
                     u = sha1.digestString();
                  } else { //all of the above failed to get a user identifier
                     u = (new Date()).valueOf();
                  }
                  var tokenRefreshUrl = [creResUrlObj_.toString(), '/common/tokenRefresh?type=container&token=', '&u=', u].join('');							 

						var headers = {};	
						headers[HEADER_NONCE_] = "check";
						headers[HEADER_CRE_REQ_ORIGIN_] = location_.href;
	
						request(tokenRefreshUrl, {method: "GET", handleAs: 'json', headers : headers, sync: false}).response.then(lang.hitch(self, '_creTokenDataHandlerLoad', tokenLoadPromise), lang.hitch(self, '_creTokenDataHandlerError', tokenLoadPromise));	//xhrGet
					}); // p.then
				}
				
				return tokenLoadPromise;
			},
			
			/**
			 * Checks if the token need refresh
			 * 
			 * @method
			 * @memberOf com.ibm.lconn.gadget.container.services.TokenRefreshHandler.prototype
			 * @private
			 * @return {Boolean} 
			 */
			_getCachedToken : function() {
				var now = new Date().getTime();
				var cookieVals = getCookieVals_(COOKIE_CONTAINER_TOKEN_CHECK_);
				var cachedToken = this._containerToken;
				var nextUpdate = this._lastUpdate;
				
				if (nextUpdate) {
					nextUpdate += (securitySettings_.containerTokenTTLSec * 1000);
				}
				
				if (!checkSameUserForAllVals_(this._userData, cookieVals)) {
					return false;
				} else if ((cachedToken && cachedToken.token) && (nextUpdate && now < nextUpdate)) {
					return cachedToken.token;
				} else {
					return false;
				}
			},
			
			/**
			 * Handle loading of the cre token data
			 * @private
			 */
			_creTokenDataHandlerLoad : function(tokenLoadPromise, response) {
				var data = response.data,
				    ioargs = response;
				
				trace_.debug('SUCCESS: Load token: %o', data);
	
				var userData = this._parseUserData(ioargs);
				
				ensureReauthTokenFromProxy_(userData);
				
				tokenLoadPromise.callback({
					creToken : data.containerToken,
					userData : userData
				});
	
				if (!this._userData) {
					this._lastUpdate = new Date().getTime();
					this._containerToken = data.containerToken;
					this._userData = userData;
				}
			},
			
			/**
			 * Parse user data from the headers
			 * @private
			 */
			_parseUserData : function(ioargs) {
			   var isAuth = ('true' === ioargs.xhr.getResponseHeader(HEADER_LC_AUTH_));
			   var userId = ioargs.xhr.getResponseHeader(HEADER_CRE_USER_);
			   if (!userId) {
			      // We should always get a userId back on the HEADER_CRE_USER_,
			      // 'X-IC-CRE-User' header... if we don't switch over to anon user.
			      isAuth = false;
			      userId = 'anonymous_12cb0bb53b1e82f9abb84c4bc1a21f1ed371c5165ff8a629e88547b6b9d368f5';
			      trace_.warn('No X-IC-CRE-User header, switching to anon user');
			   }
				return {
					isAuth : isAuth,
					userId : userId
				};
			},
			
			/**
			 * Handle load errors of cre token data
			 * @private
			 */
			_creTokenDataHandlerError : function(tokenLoadPromise, error, ioargs) {
				trace_.error('ERROR: ' + error);
				tokenLoadPromise.errback(error);
			},
			
			/**
			 * Invalidate 
			 */
			
			
			/**
			 * Clear out the shindig token data
			 * @private
			 */
			_clearTokenData : function(runCallbacks) {
				this._invalidateGadgetTokens();
			},
			
			/**
			 * Internal method that actually performs the user data refresh logic
			 * 
			 * @method
			 * @memberOf com.ibm.lconn.gadget.container.services.TokenRefreshHandler.prototype
			 * @param runCallbacks {Function} A function that should be executed if the refresh 
			 * 	operation is valid to continue
			 */
			tokenRefresh : function(runCallbacks) {
				var self = this,
					cachedToken = this._getCachedToken();
	
				if (!cachedToken) {
					this.getContainerToken().then(
						function (data) {
							if ((!data) || (!data.creToken) || (!data.userData) || (!data.userData.userId)) {
								var undef, refreshInSec = securitySettings_.transientErrorRetryIntervalSec;
								trace_.debug('data: ' + data);
								trace_.debug('data.creToken: ' + data.creToken);
								trace_.debug('data.userData: ' + data.userData);
								trace_.debug('data.userData.userId: ' + data.userData.userId);
								trace_.warn('Error while refreshing container token - bad data.  Will retry in: ' + refreshInSec + ' seconds');
								runCallbacks(undef, refreshInSec);
								return;
							}
							self._containerToken = data.creToken;
							self._lastUpdate = new Date().getTime();
							
							if (!checkSameUser_(self._userData, data.userData)) {
								// clear existing tokens
								invalidateGadgetTokens_(self._commonContainer);
								
								// update state
								self._userData = data.userData;
								
								// update container token
								runCallbacks(data.creToken.token, securitySettings_.containerTokenCheckSec);
								
								// trigger full token refresh
								self._commonContainer.refreshTokens_();
								
								// update CRE
								cre$.internalutil.setCREContainerToken(data.creToken);
								
							} else {
								trace_.debug('Token refresh success %o', data);
								runCallbacks(data.creToken.token, securitySettings_.containerTokenCheckSec);
								cre$.internalutil.setCREContainerToken(data.creToken);
							}
						},
						function (error) {
							var undef, refreshInSec = securitySettings_.transientErrorRetryIntervalSec;
							trace_.warn('Error while refreshing container token.  Will retry in: ' + refreshInSec + ' seconds');
							runCallbacks(undef, refreshInSec);
						});
				} else {
					//trace_.debug('Existing token data is valid.');
					runCallbacks(cachedToken, securitySettings_.containerTokenCheckSec);
				}
			},
			
			/**
			 * Set the common container instance
			 * 
			 * @method
			 * @memberOf com.ibm.lconn.gadget.container.services.TokenRefreshHandler.prototype
			 * @public
			 * @param commonContainer {Object} Reference to the Common Container 
			 */
			setCommonContainer : function(commonContainer) {
				this._commonContainer = commonContainer;
			},
			
			/**
			 * Method for handling logout
			 * @method
			 * @memberOf com.ibm.lconn.gadget.container.services.TokenRefreshHandler.prototype
			 * @public
			 */
			logoutHandler : function() {
				// clear a cookie at both the SSO and server URL levels
				cookie(COOKIE_CONTAINER_TOKEN_CHECK_, undef, {expires: -1, domain: securitySettings_.ssoDomain, path: '/'});
				cookie(COOKIE_CONTAINER_TOKEN_CHECK_, undef, {expires: -1, path: '/'});
			}
		});	
		
		return api_;
	})
	(dojo,
	 auth,
	 url,
	 services,
	 LCDeferredModule,
	 proxy,
	 trace,
	 settings);
	
	return com.ibm.lconn.gadget.services.TokenRefreshHandler;
});
