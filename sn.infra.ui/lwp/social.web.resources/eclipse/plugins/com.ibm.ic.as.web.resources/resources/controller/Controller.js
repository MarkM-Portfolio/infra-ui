/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/controller/UrlGenerator",
		"ic-as/controller/XhrController",
		"ic-as/extension/ExtensionHelper",
		"ic-as/listener/EventListener",
		"ic-as/controller/DynamicLoadController",
		"ic-as/controller/DynamicUnloadController",
		"ic-as/constants/events",
		"ic-as/listener/ExternalEventListener",
		"ic-as/state/ConfigHandler",
		"ic-as/util/ConfigObjectUtil",
		"ic-as/util/configNormalizer"
	], function (array, declare, lang, UrlGenerator, XhrController, ExtensionHelper, EventListener, DynamicLoadController, DynamicUnloadController, events, ExternalEventListener, ConfigHandler, ConfigObjectUtil, configNormalizer) {
	
		/**
		 * Controller for the Activity Stream.
		 * @author Robert Campion
		 */
		
		var Controller = declare("com.ibm.social.as.controller.Controller", 
		[XhrController,
		 DynamicLoadController,
		 DynamicUnloadController,
		 configNormalizer],
		{
			
			// String URL of the 
			currentUrl: "",
			
			// Manager tasked with handling the config object
			configManager: null,
			
			// Handles making changes to the config object
			configHandler: null,
			
			// Utility object
			util: null,
			
			// Event listener
			eventListener: null,
			
			// External event listener
			extEventListener: null,
			
			// Extension helper used for switching extensions
			extensionHelper: null,
			
			// Event name for initialization of populating the news feed
			populateFeedInitEventName: events.INIT,
			
			// Event fired when we change our state
			stateUpdatedEvent: events.STATEUPDATED,
			
			/**
			 * Builds all the appropriate controller objects and 
			 * fetches the feed once complete
			 * @param options
			 */
			constructor: function(options){
				// Mix the options in with this class
				if(options){
					lang.mixin(this, options);
				}
				
				// Create the internal event listener
				this.eventListener = new EventListener({
					controller: this
				});
				
				// Create the external event listener to listen to events outside the AS
				this.extEventListener = new ExternalEventListener({
					controller: this
				});
				
				// Create the util object
				this.util = ConfigObjectUtil;
				
				// Create the UrlGenerator
				this.urlGen = new UrlGenerator({
					defaultUrlTemplateValues: this.configManager.getDefaultUrlTemplateValues()
				});
				
				// Create the Model
				this.model = this.configManager.getActivityStreamModel();
				
				// Init the extension helper
				this.extensionHelper = new ExtensionHelper();
		
				// Init the config handler
				this.configHandler = new ConfigHandler();
				
				this.extensionHelper.queueExtensions(null, this.configManager.getConfigObject());
			},
			
			/**
			 * A call to update the AS state has been made.
			 * @param {object} stateObj - Object denoting the changes to the state
			 */
			onUpdateState: function(stateArr){
				
				// handle outgoing extensions
				array.forEach(this.configHandler.getSelectedObjects(), function(option){
					this.extensionHelper.queueExtensions(option);
				}, this);
				
				// Make updates to the configuration object's state
				this.configHandler.updateConfigState(stateArr);
				
				//handle incoming extensions
				array.forEach(this.configHandler.getSelectedObjects(), function(option){
					this.extensionHelper.queueExtensions(null, option);
				}, this);
				
				// Build the feed URL and fetch it
				this.buildAndFetchFeed();
			},
			
			/**
			 * This function may be called either on startup, or when
			 * the view has been changed (from ExternalEventListener).
			 */
			buildAndFetchFeed: function(){
				
				this.attachAndFetch(null, false, true);
			},
			
			/**
			 * Called when the page is changed (from PagingHandler).
			 */
			onPageChange: function(paramObj){
				
				//passed by the pagingHandler forces the url to be built 
				//without any count params added, so we page back to default
				if(paramObj.resetCount){
					this.resetUrlAttachParts(true);
				}				
				
				var targetUrl = this.urlGen.getCurrentUrl();
				
				for(var paramKey in paramObj) {
					// If both param name and value are passed
					if(paramObj.hasOwnProperty(paramKey) && paramObj[paramKey]) {
						// Attach them to the URL
						targetUrl = this.urlGen.attachUrlQueryParam(targetUrl, paramKey, paramObj[paramKey]);
					}
				}
				
				this.fetchFeed(targetUrl, true);
			},
			
			/**
			 * Called when the url params are changed.
			 */
			onParamChange: function(paramsObj, scrollTop){
				this.urlGen.attachUrlPart({params:paramsObj});
				
				var targetUrl = this.urlGen.getCurrentUrl();
				
				this.fetchFeed(targetUrl, true, true, false, false, scrollTop);
			},
			
			/**
			 * Attach a URL part, plus a possible secondary filter and then
			 * fetch a new feed.
			 * @param filter {Object} Filter object that should be attached
			 * @param dontRefreshFilters {Boolean} indicates whether the top filters
			 *  should be refreshed or not
			 * @param destroyNewsFeed {Boolean} set to true to destroy current news feed
			 * @param ignoreSecondaryFilter {Boolean} is the filter being process a
			 *  secondary filter. true if so, false otherwise.
			 */
			attachAndFetch: function(filter, dontRefreshFilters, destroyNewsFeed, ignoreSecondaryFilter){
				
				// Reset the URL and attach parts
				this.resetUrlAttachParts();
				// Search for the news feed, refreshing the filters and
				// destroying the current news feed
				this.fetchFeed(this.urlGen.getCurrentUrl(), dontRefreshFilters, destroyNewsFeed);
			},
			
			/**
			 * Reset the URL and attach all available parts (e.g. current view and filters).
			 */
			resetUrlAttachParts: function(resetCount){
				// Reset the URL
				this.urlGen.resetUrl();
				
				// Attach available view and filters
				array.forEach(this.configHandler.getSelectedObjects(), function(part){
					if(resetCount && part.params && part.params.count){
						delete part.params.count;
					}			
					this.urlGen.attachUrlPart(part);
				}, this);
			},
			
			/**
			 * Searches for a news feed based on passed in 'url' param.
			 * @param url {String} the REST URL endpoint to retrieve stream data from
			 * @param dontRefreshFilters {Boolean} indicates whether the top
			 * filters should be refreshed or not
			 * @param destroyNewsFeed {Boolean} set to true to destroy current news feed
			 * @param dynamicAdd {Boolean} Are we adding something dynamically (e.g. from Sharebox/EE)
			 */
			fetchFeed: function(url, dontRefreshFilters, destroyNewsFeed, dynamicAdd, clickEvent, scrollTop){
				// Load/Unload all queued extensions
				this.extensionHelper.switchExtensions();
				
				activityStreamAbstractHelper.call(this.stateUpdatedEvent, [this.configHandler.getSelectedKeys()]);
				//Send event to the view to allow it to render components before feed returns
				topic.publish(this.populateFeedInitEventName, dontRefreshFilters, destroyNewsFeed, dynamicAdd, clickEvent);
			
				// Parent 'XhrController' will fetch data
				this.inherited(arguments);
			},
			
			/**
			 * Override. See XhrController for more information.
			 * @param destroyNewsFeed
			 * @param dynamicAdd
			 * @param response
			 */
			onFeedLoad: function(destroyNewsFeed, dynamicAdd, url, clickAction, scrollTop, response){
				// If the response contains a connections object
				if(response.connections){
					// Update the config with it
					this.configManager.getConfigObject().connections = response.connections; 
				}
				
				// Call the parent XhrController
				this.inherited(arguments);
			},
			
			/**
			 * Destroy any artifacts that need to be destroyed.
			 */
			destroy: function(){
				this.eventListener.destroy();
				this.extEventListener.destroy();
				
				// Pass the destroy call onto superclasses
				this.inherited(arguments);
			}
		});
		
		return Controller;
	});
