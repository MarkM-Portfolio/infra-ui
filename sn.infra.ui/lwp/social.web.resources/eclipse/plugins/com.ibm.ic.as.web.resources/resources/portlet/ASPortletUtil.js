/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom",
		"dojo/topic",
		"ic-as/ActivityStream",
		"ic-as/config/enablement",
		"ic-as/constants/events",
		"ic-as/portlet/ActivityStreamPortletConfigUtil",
		"ic-as/util/AbstractHelper",
		"ic-as/util/xhr/XhrHandler",
		"ic-core/config/services",
		"ic-core/url"
	], function (array, declare, lang, dom, topic, ActivityStream, enablement, events, ActivityStreamPortletConfigUtil, AbstractHelper, XhrHandler, services, url) {
	
		var ASPortletUtil = declare("com.ibm.social.as.portlet.ASPortletUtil", null, {
		   cfgUtil: null,
		   
		   constructor: function(){
			   XhrHandler.init();
			   this.inherited(arguments);
			},
		   initAS: function() {
		      this.cfgUtil = new ActivityStreamPortletConfigUtil();
		      this.buildConf();
		   },
		   buildConf: function() {
		      var promise = this.cfgUtil.getASConfig();
		         promise.then(lang.hitch(this, function(asCfg){
		            asc.cfg = asCfg; // keep this for later/debugging
		            window.activityStreamConfig = asCfg;
		            //EE config
		            asCfg.eeCfg = asc.eeConfig || {};
		            
		            if(asc.showActivityStream) {
		               //Poc config
		               if(asc.portletUrlSettings) {
		                  asCfg.portletUrlSettings = asc.portletUrlSettings;
		                  asCfg.linkTarget = asc.portletUrlSettings.openLinksNewWindow ? "_blank": "_self";
		                  asCfg.urlUpdater = new com.ibm.social.as.portlet.PortletUrlUtil(asc.portletUrlSettings);
		                  topic.subscribe(events.ITEMDESELECTED, function(widgetInfoArray){
		                	 if(widgetInfoArray && !lang.isArray(widgetInfoArray))
		                		 widgetInfoArray = [widgetInfoArray];
		                     array.forEach(widgetInfoArray, lang.hitch(null, function(updater, widgetInfo){
		                        updater.updateUrlsByWidget(widgetInfo)
		                     }, asCfg.urlUpdater));
		                  });
		               }
		               if (asc.count){
			 				if(asCfg.defaultUrlTemplateValues){
			 					asCfg.defaultUrlTemplateValues.count = asc.count;
			 				} else {
			 					asCfg.defaultUrlTemplateValues = {count: asc.count};
			 				}
		               }
		               if(asCfg.enablement === undefined){
		            	   asCfg.enablement = [];            	  
		               }
		               asCfg.enablement.push({name: enablement.AS_VIDEO_PREVIEW, enabled:false});
		               
		               //Create Activity Stream
		     		   var activityStream = new ActivityStream({
		                  configObject: asCfg,
		                  domNode: dom.byId(asc.activityStreamNodeId),
		                  selectedState: true
		               });
		            }
		
		            ///Render share section
		            if(typeof asc.actionEmail === "undefined" && asc.showSharebox && services.microblogging ) {
		               this.showInputForm(asc);
		            }
			     }), asc.errorCallback);
		   },
		   //Render share section
		   showInputForm: function(asc) {
			   var context = {};
			   if(asc.isCommunityStream && asc.communityId) {
				   context.resourceId = asc.communityId;
				   context.resourceType = "community";
				   var wui = asc.cfg.widgetUserInfo;
				   if(wui && (wui.canPersonalize == "true"))
					   context.userRole="OWNER";
				   else if(wui && (wui.canContribute =="true"))
					   context.userRole="MEMBER";
				   else 
					   context.userRole="NONE";
			   } else {
				   context.resourceId = (asc.isProfilesStream && asc.profileId) ? asc.profileId : asc.cfg.userInfo.id;
		           context.resourceType = "person";
			   }
			   this.shareBoxWidget = new com.ibm.social.sharebox.ContextualSharebox({
					newsSvcUrl : asc.getProxiedUrl(url.getServiceUrl(services.news)),
					xhrHandler: (typeof activityStreamAbstractHelper != "undefined") ? 
							activityStreamAbstractHelper : new AbstractHelper({}),
					context : context
				}, dom.byId(asc.shareNodeId));
			   
		   },
		   
		   //Retrieve number of views available for activity stream
		   getViewCount: function() {
		      var count = 0;
		      if ( asc && asc.cfg && asc.cfg.views ) {
		         for ( var v in asc.cfg.views ) {
		            if ( asc.cfg.views.hasOwnProperty(v) ) {
		               count++;
		            }
		         }
		      }		
		      return count;
			}
		});
		
		//Following code was added so that the "Share" section may work even when the activity stream is not loaded
		//Define the as_console_debug wrapper if required
		//Do not overwrite if already declared
		if ( !window.as_console_debug ) {
			(function() { // anon function so we are not cluttering global with vars.
				var s = window.location.search;
				var enableLogging = s && ( 
							s.indexOf("debug=dojo") != -1 || 
							s.indexOf("debug=true") != -1 ||
							s.indexOf("debug-as") != -1 );
				if ( enableLogging && window.console && window.console.debug ) {
					try {
						// Safari & IE do not like assigning console.debug to something
						// Will throw exception
						window.as_console_debug = window.console.debug;
						window.as_console_debug("Create as_console_debug()");
					} catch ( e ) {
						// fall back to more basic version
						window.as_console_debug = function() {
							var msg = "", i;
							for ( i = 0; i < arguments.length; i++ ) {
								msg += arguments[i] + " ";
							}
							window.console.debug(msg);
						};
					}
				} else {
					window.as_console_debug = function() {};
				}
			})();
		};
		
		return ASPortletUtil;
	});
