/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/config/enablement",
		"ic-as/util/ConfigObjectUtil",
		"ic-as/util/configNormalizer",
		"ic-core/config/services",
		"ic-as/util/hashtag/HashtagUtil",
        "ic-as/listener/Subscriber",
        "ic-as/constants/events"
	], function (dojo, array, declare, lang, enablement, ConfigObjectUtil, configNormalizer, icServices, HashtagUtil, subscriber, events) {
	
		/**
		 * Configuration manager that controls the config object.
		 * @author Robert Campion
		 */
		
		var ConfigManager = declare([configNormalizer, subscriber],
		{
			// Configuration object to be passed in at initialization
			configObject: null,
			
			activityStreamModel: null,
			
			// Paging handler object
			pagingHandler: null,
			
			newsItemFactory: null,
			
			newsItemManager: null,
			
			searchHashtagUtil: null,
			
			configObjectUtil: null,
			
			constructor: function(options){
				this.debug("ConfigManager constructor");
				if(options === undefined){
					this.configObject = {};
				}

                this.subscribe(events.MICROBLOGCONFIGLOADED, dojo.hitch(this, function(params){
                    this.mbConfigParams = (params && params.params) ? params.params : params;
                }));

				// Mix the options in with this class
				if(options){
					lang.mixin(this, options);
				}
				
				var configObj = this.configObject;
				
				// Provide defaults for any classes that are not overridden
				configObj.activityStreamModelClass = 
					configObj.activityStreamModelClass || "ic-as.ActivityStreamModel";
				configObj.pagingHandlerClass = 
					configObj.pagingHandlerClass || "ic-as.paging.PagingHandler";
				configObj.newsItemFactoryClass = 
					configObj.newsItemFactoryClass || "ic-as.item.manager.NewsItemFactory";
				configObj.newsItemManagerClass = 
					configObj.newsItemManagerClass || "ic-as.item.manager.NewsItemManager";
				var asHashtagEnabled = (lang.exists("ic-as.util.hashtag.ASHashtagUtil") &&
						enablement.checkEnablement(enablement.AS_HASHTAG_SEARCH));
				
				var hashtagUtilClass = (asHashtagEnabled) 
						? "ic-as.util.hashtag.ASHashtagUtil" : "ic-as.util.hashtag.HashtagUtil";
		
				configObj.searchHashtagUtilClass =
					configObj.searchHashtagUtilClass || hashtagUtilClass;
				// We may need to prefix the defaultUrlTempalte with the OpenSocial service url
				// Need to ensure we pick correct one based on current page protocol
				if ( configObj.defaultUrlTemplate ) {
					var urlTemplate = configObj.defaultUrlTemplate;
					var osSvc = icServices.opensocial;
					if ( configObj.defaultUrlTemplate.substring(0,4).toLowerCase() != "http" && osSvc ) {
						if ( window.location.protocol == "https:" && osSvc.secureEnabled && osSvc.secureUrl ) {
							configObj.defaultUrlTemplate = osSvc.secureUrl + urlTemplate;
						} else if ( osSvc.url ) {
							configObj.defaultUrlTemplate = osSvc.url + urlTemplate;
						}
					}
				}
				
				this.configObjectUtil = ConfigObjectUtil;
			},
			
			getConfigObject: function(){
				return this.configObject;
			},
			
			getActivityStreamModel: function(){
		        this.debug("ConfigManager getActivityStreamModel");
				
				this._checkMember("activityStreamModel", "activityStreamModelClass");
				
				return this.activityStreamModel;
			},
			
			getPagingHandler: function(props){
		        this.debug("ConfigManager getPagingHandler");
				
				this._checkMember("pagingHandler", "pagingHandlerClass", props);
				
				return this.pagingHandler;
			},
			
			getNewsItemFactory: function(){
		        this.debug("ConfigManager getNewsItemFactory");
				
				this._checkMember("newsItemFactory", "newsItemFactoryClass");
				
				return this.newsItemFactory;
			},
			
			getNewsItemManager: function(newsItemFactory){
		        this.debug("ConfigManager getNewsItemManager");
				
				this._checkMember("newsItemManager", "newsItemManagerClass", newsItemFactory);
				
				return this.newsItemManager;
			},
			
			getSearchHashtagUtil: function(){
		        this.debug("ConfigManager getSearchHashtagUtil");
				
				this._checkMember("searchHashtagUtil", "searchHashtagUtilClass");
				
				return this.searchHashtagUtil;
			},
			
			getViews: function(){
				return this.configObject.filters;
			},
			
			getDefaultUrlTemplateValues: function(){
				return this.configObject.defaultUrlTemplateValues;
			},
			
			getUserInfoId: function(){	
				return (this.configObject.userInfo) ? this.configObject.userInfo.id : undefined;
			},
			
			getUserInfoDisplayName: function() {
				return (this.configObject.userInfo) ? this.configObject.userInfo.displayName: undefined;
			},
			
			getEEConfig: function() {
		        return this.configObject.eeCfg;
			},
			getUrlUpdater: function(node) {
				return this.configObject.urlUpdater;
			},
			
			/** Is the share box defined */
			isShareBox: function(){
		        this.debug("ConfigManager isShareBox");
				return (this.configObject.shareBox != undefined);
			},
			
			/** Is the embedded experience gadget defined */
			getEEManager: function(){
		        this.debug("ConfigManager getEEManager");
				return this.configObject.eeManager;
			},
		
			/**Provide target value to determine if links should open in a new window or not */
			getLinkTarget: function() {
				return this.configObject.linkTarget || "_blank";
			},
			
			/** Is dynamic loading disabled (see DynamicLoadController) */
			isDynamicLoadingDisabled: function(){
				return (this.configObject.dynamicLoadingDisabled);
			},
			
			/** Is the current user in the News admin role */
			isUserNewsAdmin: function(){
				var connObj = this.configObject.connections;
				return (connObj && (connObj.isAdmin === "true"));
			},
			
			/** Should we test dirty flag before navigation */
			checkDirtyFlag: function() {
				return (this.configObject.dirtyChecker === "true");
			},
		
			/** Liking might be disabled by config... e.g. for non-member in moderated community */
			isReadonlyLikes: function() {
				return (this.configObject && this.configObject.readonlyLikes && this.configObject.readonlyLikes === "true") ? true : false;
			},
			
			isInlineCommentingEnabled: function() {
				var isInlineCommentingEnabled = true;
				if(this.configObject && this.configObject.inlineCommentingEnabled === false){
					isInlineCommentingEnabled = this.configObject.inlineCommentingEnabled;
				}
				return isInlineCommentingEnabled;
			},
			
			/** 
			 * Allow an array called enablement to be set in config which can drive settings 
			 * in enablement.js for turning on/off features
			 */
			isFeatureEnabledByConfig: function(featureName) {
				var isFeatureConfigEnabled = true;
				if(this.configObject && this.configObject.enablement){
					isFeatureConfigEnabled = array.some(this.configObject.enablement, function(value){
						if(value && value.name === featureName && !value.enabled) {
							return false;
						}
					});
				}
				return isFeatureConfigEnabled;
			},
			
			/** Return true if we are in a view where the view label is blank or does not exist, assumption is this is perm link view */
			isPermLinkViewOfAS: function() {
				var currentView = this.configObjectUtil.getSelectedOrDefaultOptionObj(this.getViews());
				var flag = false;
				if(currentView && currentView.filters){
					var filter = currentView.filters;
					var option = this.configObjectUtil.getSelectedOrDefaultOptionObj(filter);
					//if no label set this is a perm link view
					if(!option.label){
						flag = true;
					}
				}
			
				return flag;
			},
		
		    /**
		     * Debug helper function.
		     * @param messge {String} will be appended after context
		     */
		    debug: function(message){
		        if(typeof as_console_debug !== "undefined"){
		            as_console_debug("com.ibm.social.as.config.ConfigManager - " + message);
		        } else if (typeof console !== "undefined") {
		            console.debug("com.ibm.social.as.config.ConfigManager - " + message);
		        }
		    },
		
			_checkMember: function(member, memberClass, params) {
				params = params || {};
				if(!this[member]){
					if(lang.exists(this.configObject[memberClass])){
						var cls = lang.getObject(this.configObject[memberClass]);
						this[member] = new cls(params);
					}
				}
			}
		});


		ConfigManager._Instance = null;
		  
		ConfigManager.getInstance = function(options){
			if(ConfigManager._Instance == null){
				ConfigManager._Instance = new ConfigManager(options);	
		  	}
		  	return ConfigManager._Instance;
		}
		
		return ConfigManager.getInstance();
	});
