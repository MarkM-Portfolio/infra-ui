/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2011, 2021                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

	define([
		"dojo/_base/declare",
		"ic-as/config/ActivityStreamConfigProcessor",
		"ic-as/config/ConfigManager",
		"ic-as/constants/events",
		"ic-as/util/AbstractHelper",
		"ic-as/util/ItemFocusHandler",
		"ic-as/util/ItemNavigationHandler",
		"ic-as/util/badging/BadgingUtil",
		"ic-as/view/ActivityStreamView"
	], function (declare, ActivityStreamConfigProcessor, ConfigManager, events, AbstractHelper, ItemFocusHandler, ItemNavigationHandler, BadgingUtil, ActivityStreamView) {
	
		var ActivityStream = declare("com.ibm.social.as.ActivityStream", null,
		{	
			// Call this when we have loaded up all our resources
			activityStreamLoadedEvent: events.ACTIVITYSTREAMLOADED,
			
			// Event called when we want to update the AS state
			updateStateEvent: events.UPDATESTATE,
			
			// Configuration object to be passed in at initialization.
			configManager: null,
			
			// The domNode we will attach the Activity Stream Dijit to.
			domNode: null,
		
			itemFocusHandler: null,
			
			itemNavigationHandler: null,
			
			badgingUtil: null,
			
			constructor: function(options){
				// Create a special abstract helper solely for the 
				// Activity Stream gadget.
				window.activityStreamAbstractHelper = new AbstractHelper({
					isGadget: options.isGadget
				});	
				
				if(!com.ibm.social.as.configManager){
					//// process the config - this allows customers to modify the config before we use it
					var cfg = options.configObject.isProcessed ? options.configObject :
						ActivityStreamConfigProcessor.processConfig(options.configObject);
					com.ibm.social.as.configManager = new ConfigManager({
						configObject: cfg
					});
				}
				
				// Create the object that will monitor the items, handling focus etc.
				this.itemFocusHandler = new ItemFocusHandler();
				
				// Create the object that will handle navigation between stream items.
				this.itemNavigationHandler = new ItemNavigationHandler();
				
				this.badgingUtil = new BadgingUtil();
				
				// Create the ActivityStreamView
				new ActivityStreamView({
					configManager: com.ibm.social.as.configManager
				}, options.domNode);
				
				this.validateConfig(options.configObject);
		
				// We've loaded up all our resources, call onLoad
				this.onLoad(options.selectedState);
			},
			
			/**
			 * Validate config objects - handle as follows
			 * -ConfigObject or views undefined, call event to display config error.
			 * -userInfo Obj undefined call event to display config error at top
			 * of feed. AS can function with userInfo not defined.
			 */
			validateConfig: function(configObj){
				if (!configObj || !configObj.views){
					var errormsg = (!configObj) ? "configObject" : "views";
					activityStreamAbstractHelper.call(events.CONFIGERROR, [true, errormsg + ": null"]);				
				}
			},
			
			/**
			 * Called once we've loaded all the resources we need. 
			 * It publishes to external entities telling them it's loaded.
			 */
			onLoad: function(selectedState){
				// Inform others (e.g. external state handler) that we are loaded
				activityStreamAbstractHelper.call(this.activityStreamLoadedEvent, null);
				
				// If a selected state has been passed in
				if(selectedState){
					// Use it to load up the AS at that state
					activityStreamAbstractHelper.call(this.updateStateEvent, [selectedState]);
				}
			},
			
			/**
			 * Destroy function to clean up the activity stream item.
			 */
			destroy: function() {
				if (this.itemFocusHandler) {
					this.itemFocusHandler.destroy();
				}
				
				if (this.itemNavigationHandler) {
					this.itemNavigationHandler.destroy();
				}
				
				if (this.badgingUtil) {
					this.badgingUtil.destroy();
				}
			}
		});
		
		// Define the as_console_debug wrapper if required
		// Might be pre-defined by AS gadget, in which case do not overwrite
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
		
		return ActivityStream;
	});
