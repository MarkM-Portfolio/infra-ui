/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.controller.DynamicLoadController");

dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.listener.Registrar");

/**
 * Controller for dynamically loading news items into the Activity Stream. 
 * It's used when:
 * 
 * 		a) A status update is added from the sharebox
 * 		b) An update is made to a news item from the EE
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.controller.DynamicLoadController", 
[com.ibm.social.as.listener.Registrar],
{
	// Used to identify dynamic load requests
	loadRequest: 0,
	
	// Timeout id of main setTimeout function
	loadRequestTimeout: "",
	
	// store the updatedSince timestampe for the current load
	currentLoadUpdatedSince: null,
	
	// Activity Stream config object
	configManager: null,
	
	// Object id of the activity entry we search for
	objectId: null,
	
	// build up queue of items
	queue: [],
	
	dynamicUpdateInProgress: false,
	
	dynamicUpdateFailure: com.ibm.social.as.constants.events.DYNAMICFAIL,
	
	constructor: function(){
		this.configManager = com.ibm.social.as.configManager;
		
		this.register(com.ibm.social.as.constants.events.ADDACTIVITYENTRY, 
						dojo.hitch(this, "onLoadRequest"));
	},
	
	onLoadRequest: function(objectId, timestamp, timeoutOverride, clickEvent){
		// Check if dynamic loading is disabled
		// still continue if this is an update and not loading a new item
		if(this.isDynamicLoadDisabled() && !this.view.containsNewsItemWithId(objectId)){
			as_console_debug("DynamicLoadController - dynamic loading is disabled");
			return;
		}
		
		this.currentLoadUpdatedSince = timestamp;
		
		// Make sure the object is present
		if(!objectId){
			console.warn("DynamicLoadController - load requested but no object id was passed");
			return;
		}

		// if we are already laoding something, put this on queue
		if ( this.objectId ) {
			this.addToQueue(objectId, timestamp);
			return;
		} else {
			this.objectId = objectId;
			// Attach the object id as a parameter to the URL
			var url = this.attachObjectIdParam(objectId);
			
			// If timestamp is there, attach that too
			// Do not attach if we are on a view without rollup (therefore likes do not signal an update)
			var currentFilter = this.configHandler.getSelectedViewFilter();
			if(timestamp && currentFilter && currentFilter.params 
					&& currentFilter.params.rollup){
				url = this.urlGen.attachUrlQueryParam(url, "updatedSince", timestamp);
			}
			
			//if timeoutOverride passed in only make one timeout call
			if(timeoutOverride){
				this.loadRequest = 0; 
			}else{
				this.setLoadRequest(2);
			}

			// Send request after 2 seconds (to give the server time to process)
			this.makeTimeoutRequest(url, timeoutOverride || 2000, clickEvent);
		}		
	},
	
	/**
	 * Adds new item to queue, if we are already processing one
	 * If we find objectId already in queue, we update timestamp to new one
	 * @param objectId
	 * @param timestamp
	 */
	addToQueue: function(objectId, timestamp) {
		var addedTime = (new Date()).getTime();
		// Check if item already in queue (and update timestamp if it is)
		var alreadyInQ = dojo.some(this.queue, function(item) {
			if ( item.objectId === objectId ) {
				item.timestamp = timestamp;
				item.addedTime = addedTime;
				return true;
			}
			return false; 
		});
		
		if ( !alreadyInQ ) {
			this.queue.push({
				objectId: objectId, 
				timestamp: timestamp,
				addedTime: addedTime
			});
		}
	},
	
	removeFromQueue: function(objectId) {
		var newQueue = dojo.filter(this.queue, function(item) {
			return item.objectId != objectId;
		});
		this.queue = newQueue;
	},
	
	/**
	 * Remove current item from queue, check if there is another and launch it
	 */
	nextFromQueue: function() {
		if ( this.objectId ) {
			this.removeFromQueue(this.objectId);
			this.objectId = null;
			
			var next = this.queue.pop();
			if ( next ) {
				// ensure a minimum of 1 second between getting request to load
				// file, and making the actual request
				// This will allowed later items in queue to request immediately
				// while ensuring a bit of a delay for early items
				var timeout = 1000 - ( (new Date()).getTime() - next.addedTime );
				if ( timeout < 1 ) timeout = 1;
				
				this.onLoadRequest(next.objectId, next.timestamp, timeout);
			}
		}
	},
	
   /**
	*  - resest any currently timed out dynamic requests
	*  - set flag to false so any feed being requested is ignored when returned
	*  - reset the queue object so nothing queued is attempted and next time
	*    a queue is set up there will be no items hanging around
	*/
	cancelDynamicLoadRequestAndResetQueue: function() {
		if(this.dynamicUpdateInProgress){
			this.resetLoadRequestTimeout();	
			this.dynamicUpdateInProgress = false;
			this.queue=[];
			this.objectId = null;			
		}
	},
	
	/**
	 * Extended in NetworkInviteExtension
	 */
	onFeedLoad: function(destroyNewsFeed, insertAtTop, url, clickEvent, scrollTop, response, request){
		as_console_debug("DynamicLoadController onFeedLoad args:", arguments);
		
		// SHINDIG-1758
		if (response.list) {
			response.entry = response.list;
		}
		//if a non dynamic add request passes through, cancel any dymamic calls
		if(!insertAtTop){
			this.cancelDynamicLoadRequestAndResetQueue();
			// Continue with loading the data
			this.inherited(arguments);
		} else {
			// If this is a dynamic load request and no entries returned first retry
			if((!response.entry || response.entry.length == 0) && this.loadRequest == 2){			
				this.makeTimeoutRequest(request.url, 3000, clickEvent);
			// Still now response from dynamic load make another attempt
			}else if((!response.entry || response.entry.length == 0) && this.loadRequest == 1){
				this.makeTimeoutRequest(request.url, 5000,  clickEvent);
			// finally give up and publish dynamic update failure event 
			}else if((!response.entry || response.entry.length == 0) && 
					this.loadRequest == 0 && this.objectId ){
				dojo.publish(this.dynamicUpdateFailure, [this.objectId, this.currentLoadUpdatedSince]);
				this.resetLoadRequestTimeout();
				this.nextFromQueue();
			}else if(this.dynamicUpdateInProgress){
				this.resetLoadRequestTimeout();						
				// Continue with loading the data
				this.inherited(arguments);
				
				this.nextFromQueue();
			}
				
			// Reset the load request flag
			this.resetLoadRequest(0);			
		}
		
	},
		
	onFeedError: function(){
		// Even on error we need to reset the loadRequest flag.
		// Otherwise we may keep looping.
		this.resetLoadRequest(0);
		
		this.inherited(arguments);
		this.nextFromQueue();
	},
	
	/**
	 * Make a fetch feed request after a certain timeout. Needed for dynamic loads
	 * because it may take some time for the server to process requests.
	 * @param url {String} URL endpoint to request info from.
	 * @param timeout {Int} amount of time in ms to wait before requesting. 
	 */
	makeTimeoutRequest: function(url, timeout, clickEvent){
		this.dynamicUpdateInProgress = true;
		this.loadRequestTimeout = window.setTimeout(dojo.hitch(this, function(){
			this.fetchFeed(url, true, false, true, clickEvent);
		}), timeout);
	},
	
	/**
	 * This is a dynamic load request, so set the flag to true.
	 */
	setLoadRequest: function(val){
		this.loadRequest = val ? val : this.loadRequest + 1;
	},
	
	/**
	 * If this is a dynamic load request, need to reset it (to false). This basically ensures
	 * that requests made twice are only made by dynamic load requests (from Sharebox or EE). 
	 */
	resetLoadRequest: function(val){
		this.loadRequest = val ? val : this.loadRequest - 1;
	},
	
	/**
	 * If there is a timeout waiting, we need to cancel it. Otherwise it may fire after a current 
	 * view/filter request is made and may trigger an incorrect update to the UI (showing a wrong item).
	 */
	resetLoadRequestTimeout: function(){
		if(this.loadRequestTimeout){
			// Clear the timeout
			window.clearTimeout(this.loadRequestTimeout);
			// Reset it
			this.loadRequestTimeout = "";
		}
	},
	
	attachObjectIdParam: function(objectId){
		var attachUrlQueryParam = this.urlGen.attachUrlQueryParam;
		
		var url = attachUrlQueryParam(this.urlGen.getCurrentUrl(), "filterBy", "object");
		url = attachUrlQueryParam(url, "filterOp", "equals");
		url = attachUrlQueryParam(url, "filterValue", objectId);
		
		return url;
	},
	
	/**
	 * Is dynamic loading disabled?
	 * @returns {Boolean}
	 */
	isDynamicLoadDisabled: function(){
		return this.configManager.isDynamicLoadingDisabled();
	}
});
