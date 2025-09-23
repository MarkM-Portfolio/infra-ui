/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.container._Accessor');

dojo.require('com.ibm.lconn.gadget.container.Accessor');
dojo.require('com.ibm.lconn.gadget.container.Topics');
dojo.require("com.ibm.lconn.gadget.resources.iRuntimeModule");
dojo.require('com.ibm.lconn.gadget.services.viewModifications');
dojo.require('com.ibm.lconn.gadget.services.lifecycleModifications');
dojo.require('com.ibm.lconn.gadget.services.set_title');
dojo.require('com.ibm.lconn.gadget.services.oauthPopupDialog');
dojo.require('com.ibm.lconn.gadget.services.sso_reauth_callback');
dojo.require('com.ibm.lconn.gadget.services.fake_handleRpcMethod');
dojo.require('com.ibm.lconn.gadget.services.tokenRefreshService');
dojo.require('com.ibm.lconn.gadget.services.urlSecurityService');
dojo.require('com.ibm.lconn.gadget.container.ICActions');
dojo.require('com.ibm.lconn.gadget.services.ICActionsContainer');
dojo.require('com.ibm.lconn.gadget.config.settings');
dojo.require('com.ibm.lconn.gadget.util.trace');

dojo.require('lconn.core.config');
dojo.require('lconn.core.config.services');
dojo.require('lconn.core.util.LCDeferred');
dojo.require('lconn.core.util.LCDeferredList');
dojo.require('lconn.core.util.amdLoader');
dojo.require('lconn.core.url');

dojo.require('com.ibm.oneui.util.proxy');

dojo.require('dojo.cookie');

(function init_com_ibm_lconn_gadget_container__Accessor(
 dojo,
 lconn_core_url_,
 lconn_core_config_,
 lconn_core_config_services_,
 LCDeferred_,
 LCDeferredList_,
 settings_,
 trace_,
 com_ibm_oneui_util_proxy_,
 Topics_,
 tokenRefreshService_
) {
	//
	// Various globals
	//
	var instance_ = null;
	
	var require_ = lconn.core.util.amdLoader.require;
	
	var securitySettings_ = settings_.security;
	
	var location_ = dojo.global.location;
	
   var COOKIE_PRELOADED_ = 'X-IC-Preload';

   var isSafari_ =
      (function() {
         var browser=navigator.appName;
         var navindex= navigator.userAgent.indexOf('Safari');

         return (navindex !== -1 || browser === 'Safari');
      })();

	var dojoLocale_ = (dojo.config.locale || ''),
		dojoLocalelang_ = dojoLocale_.substr(0, Math.min(dojoLocale_.length, 2)),
		dojoLocaleCountry_ = dojoLocale_.substr(Math.min(dojoLocale_.length, 3), Math.min(dojoLocale_.length, 5));
	
	var creLocale_ = (function() {
		var country = {
			"pt" : "br", "zh" : "tw"	
		};
		
		var specialCase = {
			'zh' : 'zh-cn',
			'he' : 'iw',
			'id' : 'in',
			'nb' : 'no'
		};
	
		var locale = dojoLocalelang_;
		
		// handle country cases
		if (country[dojoLocalelang_] && country[dojoLocalelang_] == dojoLocaleCountry_) {
			locale = locale + "-" + dojoLocaleCountry_;
		}
		
		locale = specialCase[locale] || locale;
		
		if (!locale) {
			locale = 'en';
		}
		
		return locale;
	})();
	
	var creResUrl_ = lconn_core_config_services_.opensocial,
		creResUrlObj_ = lconn_core_url_.parse(
			location_.toString(), 
			creResUrl_ ? com_ibm_oneui_util_proxy_(lconn_core_url_.getServiceUrl(creResUrl_).toString()) : "");
	
	//
	// Config blankGif if unconfigured
	//
	if (!dojo.config.blankGif) {
		(function configBlankGif_() {
			var webResUrl_ = lconn_core_config_services_.webresources,
				webResUrlObj_ = lconn_core_url_.parse(
					location_.toString(), 
					com_ibm_oneui_util_proxy_(lconn_core_url_.getServiceUrl(webResUrl_).toString()));
				
			dojo.config.blankGif =  webResUrlObj_.toString() + "/web/com.ibm.lconn.core.styles.oneui3/images/blank.gif";
		})();
	}
	
	var self = this;

	/**
	 * Return a promise to load the CRE JavaScript
	 */
	function loadCreJs_() {
		var loadCompletePromise = new LCDeferred_();
		
		var versionStamp_ = lconn_core_config_.versionStamp || '';
		
		var cre_locale_include_ = (creLocale_ && creLocale_ !== '') ? 'cre.messages.' + creLocale_ + ':' : '',
			versionStampParam_ = '&_ic_versionStamp=' + versionStamp_,
			debug_param = (dojo.config.isDebug ? '&debug=1&noCache=1' : versionStampParam_),
			resUrl = creResUrlObj_.toString() + '/gadgets/js/cre.iruntime:cre.iwidget.event:cre.wire:cre.iwidget:cre.iwidget.itemset:'
				+ 'cre.util.stringify:cre.service.event:cre.osgadget:' + cre_locale_include_
				+ 'core:container:rpc:pubsub-2:views:embedded-experiences:open-views:selection:actions:viewenhancements:shared-script-frame:'
				+ 'cre.service.people:ibm.connections.sharedialog:com.ibm.connections.sharedialog:'
				+ 'com.ibm.connections.ee:ibm.connections.ee:container.nongadget:shindig.sha1:'
				+ 'open-views.js?c=1' + debug_param + '&ver=' + versionStamp_;
		
		// Maintain XHR fallback in case JS bride fails
		if (!dojo.global.cre$) {
			trace_.debug('_Accessor.loadCreJs_ loading CRE JS from: ' + resUrl);	
			
			// use async loader
			// defect 113900, use separate thread of CRE js loading
			setTimeout(dojo.hitch(self, function() {
				require_(
					[resUrl],
					function() {
						trace_.debug('_Accessor.loadCreJs_ SUCCESS: Load CRE JS');
						loadCompletePromise.resolve();
						trace_.debug('_Accessor.__instance__ Exit load');	
					},
					function(error) {
						trace_.error('_Accessor.loadCreJs_ ERROR: ', error);
						loadCompletePromise.errback(error);
					}
				);
			}), 0);
		} else {
			trace_.debug('_Accessor.loadCreJs_ SUCCESS: Load CRE JS via JS Bridge');					
			loadCompletePromise.resolve();
		}
		
		return loadCompletePromise;
	}
	
	
	var asyncDependencies_ = ["window.osapi.container.Container", "window.osapi.container.Service", "window.__CONTAINER_URI"]; 
	window.__IC_iContainer2_AsyncDependenciesInit = new LCDeferred_();		
	
	window._chkIC_Accessor_AsyncDependencies_ = function() {
		var done = false;
		try {
  			for (var i = asyncDependencies_.length; i--; ) {
			  if (typeof (eval(asyncDependencies_[i])) === 'undefined') {
			    throw("undefined leaf node");
			  }
			}
			done = true; // no exceptions on access or undefined leafs
		} catch (e) {/* console.log(e) */ }
		if (done) {
			// all dependencies exist ... proceed
			window.__IC_iContainer2_AsyncDependenciesInit.resolve();
		} else {
			setTimeout("window._chkIC_Accessor_AsyncDependencies_()", 50);
		}
	}
	

	/**
	 * perform CRE configuration
	 */
	function configCre_(config) {
		var loc = location_;
		
		cre$.config.SCHEME = loc.protocol.substring(0, loc.protocol.length-1);
		cre$.config.HOST = loc.hostname;
		cre$.config.PORT = (loc.port && loc.port !== '') ? loc.port : '';
		cre$.config.CONTEXT_ROOT = creResUrlObj_.path;

		cre$.config.locales = [creLocale_];
		
		cre$.config.MAX_TOKEN_TTL = securitySettings_.gadgetTokenTTLSec;
	}
		
	/**
	 * setup the configuration for the common container
	 */
	function configCommonContainer_(config) {
		var cc = {}, 
			CC = osapi.container.ContainerConfig;
		
		cc[osapi.container.ServiceConfig.API_HOST] = [creResUrlObj_.scheme, '://', creResUrlObj_.authority].join('');
		cc[osapi.container.ServiceConfig.API_PATH] = creResUrlObj_.path + '/rpc';
		
		cc[CC.TOKEN_REFRESH_INTERVAL] = securitySettings_.gadgetTokenTTLSec * 1000; // CC wants times in msec
		cc[CC.GET_CONTAINER_TOKEN] = tokenRefreshService_.getTokenRefresher();
		cc[CC.GET_LANGUAGE] = function() { return dojoLocalelang_; };
		cc[CC.GET_COUNTRY] = function() { return dojoLocaleCountry_; };
		
		// pref handlers
		cc[CC.SET_PREFERENCES] = function(siteId, gadgetUrl, preferences) { 		
			// override setting of preferences
			var topic = Topics_.getSiteTopic(gadgetUrl, Topics_.GadgetWindow.SET_PREFS);
			dojo.publish(topic, [{"siteId": siteId, "gadgetUrl": gadgetUrl, "preferences": preferences}]);
		};
		
		// debug mode handlers
		if (dojo.config.isDebug) {
			// setting this to false will cause a debug rendering
			cc[CC.RENDER_DEBUG] = true;
			cc[CC.RENDER_TEST] = true;
		}
		return cc;
	}
	
	/**
	 * register services for this common container
	 */
	function registerServices_(commonContainer) {
		// SVC: Views
		com.ibm.lconn.gadget.services.viewModifications.registerService(commonContainer);
		
		// SVC: Set title
		com.ibm.lconn.gadget.services.set_title.registerService(commonContainer);
		
		// SVC: Gadgets LifeCycle
		com.ibm.lconn.gadget.services.lifecycleModifications.registerService(commonContainer);
		
		// SVC: OAuth
		com.ibm.lconn.gadget.services.oauthPopupDialog.registerService(commonContainer);
		
		// SVC: CRE SSO Reauth
		com.ibm.lconn.gadget.services.sso_reauth_callback.registerService(commonContainer);
		
		// SVC: fake osapi._handleRpcMethod - just logs call
		com.ibm.lconn.gadget.services.fake_handleRpcMethod.registerService(commonContainer);
		
		// SVC: tokenRefreshHandler
		tokenRefreshService_.registerService(commonContainer);
		
	    // SVC: NavigateGadgetHandler
      com.ibm.lconn.gadget.container.ICActions.__instance__().registerService(commonContainer);
		
		// SVC: url security service
		com.ibm.lconn.gadget.services.urlSecurityService.registerService(commonContainer);
	}
	
	
	/**
	 * Implementation of Accessor
	 * @private
	 * @class
	 * @extends com.ibm.lconn.gadget.container.Accessor
	 */
	var Accessor_ = dojo.declare('', [com.ibm.lconn.gadget.container.Accessor], {	
		/* The opensocial container */
		_commonContainerPromise : null,
		/* CRE API */
		_iRuntimePromise : null,
		
		/**
		 * Constructor 
		 * @param loadCompletePromise {Object}
		 */
		constructor : function(loadCompletePromise, config) {
			trace_.entering('com.ibm.lconn.gadget.container._Accessor.prototype', 'constructor', arguments);
			
			// setup promises
			this._commonContainerPromise = new LCDeferred_();
			this._iRuntimePromise = new LCDeferred_();
			
			//
			// Load complete callback
			//
			loadCompletePromise.then(
				dojo.hitch(this, '_loadComplete', config),
				dojo.hitch(this, '_loadError'));
			
			trace_.exiting('com.ibm.lconn.gadget.container._Accessor.prototype', 'constructor', arguments);
		},
		
		/**
		 * @see com.ibm.lconn.gadget.container.Accessor.prototype.getCommonContainer
		 */
		getCommonContainer : function() {
			return this._commonContainerPromise;
		},
		
		/**
		 * @see com.ibm.lconn.gadget.container.Accessor.prototype.getIRuntime
		 */
		getIRuntime : function() {
			return this._iRuntimePromise;
		},
		
		fakeOpen : function() {
         var context = {
            "id" : "0",
            eventType : "PRELOAD"
         };

         var webResUrl_ = lconn_core_config_services_.webresources, webResUrlObj_ = lconn_core_url_
               .parse(location_.toString(),
                     com_ibm_oneui_util_proxy_(lconn_core_url_
                           .getServiceUrl(webResUrl_).toString()));
         var webResourcesUrl_ = webResUrlObj_.toString();

         var gadgetUrl = webResourcesUrl_
               + "/web/com.ibm.social.ee/ConnectionsEE.xml";

         var c = document.getElementsByTagName("body")[0];
         var div = dojo.create("div", {
            id : dijit.getUniqueId("fake")
         }, c);
         div.style.display = 'none';
         var def = [ {
            definitionUrl : gadgetUrl,
            mode:"preload",
            placement : dojo.attr(div, "id"),
            componentType : "gadget",
            instanceData : {
               renderParams : { },
               viewParams: { },
               eeDataModel : {
                  context : context
               }
            }
         } ];

         if (cre$ && cre$.iRuntime) {
            cre$.iRuntime.loadWidgets(def).then(function() {
               trace_.debug('_Accessor.fakeOpen preload done');
               dojo.cookie(COOKIE_PRELOADED_, "true" , {path: '/', secure: true, samesite: 'None'});
            }, function(error) {
               trace_.error('_Accessor.fakeOpen ERROR: ', error);
            });
         }
      },

		/**
		 * Called when cre JS load complete.
		 * @memberOf com.ibm.lconn.gadget.container._Accessor.prototype
		 * @name getCommonContainer
		 * @function
		 * @private
		 */
		_loadComplete : function(config, loadPromises /* First: containerToken; Second: JS load */) {
  			trace_.entering('com.ibm.lconn.gadget.container._Accessor.prototype', '_loadComplete');
			
			// FIRST: Setup CRE config
			configCre_(config);
			
			// SECOND: Setup config for CommonContainer, and make instance
			var ccConfig = configCommonContainer_(config);
			
			window._chkIC_Accessor_AsyncDependencies_();
			window.__IC_iContainer2_AsyncDependenciesInit.then(dojo.hitch(this, function() {
			  setTimeout(dojo.hitch(this, function() {
				var containerTokenData = loadPromises[0][1];
				var commonContainer = new osapi.container.Container(ccConfig);
			
				// THIRD: Set the '__CONTAINER' setting to specify the name of the container used [TODO: doc in shindig]
				//	Line needs to be AFTER JS load. Not doc'd properly
				dojo.global.__CONTAINER = 'default';
			
				// FOURTH: register servces
				registerServices_(commonContainer);			
			
				// FIFTH: set the container token 
				//   Need to manually set CommonContainer token to get correct refresh behavior
				cre$.internalutil.setCREContainerToken(containerTokenData.creToken);
				commonContainer.updateContainerSecurityToken(null, 
					cre$.internalutil.getCREContainerToken().token, 
					securitySettings_.containerTokenCheckSec);
			
				// SIXTH: complete iRuntime INIT and resolve promises for iRuntime / commonContainer
				cre$.iRuntime.setCommonContainer(commonContainer, {
					configSecurityToken : false,	// DISABLE; bug in CRE handling so want to handle manually
					configInlineOAH : true 			// Connect OAH from MuM to Gadgets
				});
			
				this._commonContainerPromise.resolve(commonContainer);
				this._iRuntimePromise.resolve(cre$.iRuntime);
			
         		if ((securitySettings_.preloadJS) || (isSafari_ && (securitySettings_.preloadJSSafari))){
            		var cookieVal = this.getCookieVals_(COOKIE_PRELOADED_);
            		if (!cookieVal || (!cookieVal.length > 0)) {
                		this.fakeOpen();
            		}
         		}
			  }), 10); // various timeouts of 0 happen in the Shindig layer ... let them execute first	
			}));

			trace_.exiting('com.ibm.lconn.gadget.container._Accessor.prototype', '_loadComplete');
		},

      /**
       * Helper to work over bugs in dojo.cookie
       */
      getCookieVals_ : function(cookieName) {
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
      },

		/**
		 * Callback for JavaScript layer load errors
		 * @memberOf com.ibm.lconn.gadget.container._Accessor.prototype
		 * @name getCommonContainer
		 * @function
		 * @private
		 */
		_loadError : function(error) {
			trace_.error('_Accessor.prototype._loadError called.', error);

			this._commonContainerPromise.errback(error);
			this._iRuntimePromise.errback(error);			
		}
	});
	
	
	/*
	 * Add real '__instance__' method to interface
	 */
	dojo.mixin(com.ibm.lconn.gadget.container.Accessor, {
		/**
		 * Method to load CRE JS. This returns a promise to obtain the Accessor singleton .
		 * 
		 * @private
		 * @memberOf com.ibm.lconn.gadget.container._Accessor
		 * @name __instance__
		 * @function
		 * @returns {Object} A promise object that will complete when the CRE is
		 *          loaded
		 */
		__instance__ : function(config) {
			trace_.entering('com.ibm.lconn.gadget.container._Accessor', '__instance__');
			
			if (instance_ === null) {
				var loadJsPromise = loadCreJs_(),
					loadTokenPromise = tokenRefreshService_.getContainerToken(loadJsPromise);
				
				instance_ = new Accessor_(new LCDeferredList_([loadTokenPromise, loadJsPromise]), config);				
			} else {
				trace_.debug('_Accessor.__instance__ Already called, skipping re-init');
			}
			
			trace_.exiting('com.ibm.lconn.gadget.container._Accessor', '__instance__');
			
			return instance_;
		}
	});
})(
 dojo,
 lconn.core.url,
 lconn.core.config,
 lconn.core.config.services,
 lconn.core.util.LCDeferred,
 lconn.core.util.LCDeferredList,
 com.ibm.lconn.gadget.config.settings,
 com.ibm.lconn.gadget.util.trace,
 com.ibm.oneui.util.proxy,
 com.ibm.lconn.gadget.container.Topics,
 com.ibm.lconn.gadget.services.tokenRefreshService);
