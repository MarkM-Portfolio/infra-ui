/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.controller.XhrController");

dojo.require("com.ibm.social.as.constants.events");

/**
 * XHR Controller for the Activity Stream.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.controller.XhrController", null,
{
	// The currently on going XHRs
	currentXhrs: null,
	
	// Model store of the activity stream news items
	model: null,
	
	// The activity sttream view
	view: null,
	
	// Event name for end of populating the news feed
	populateFeedEventName: com.ibm.social.as.constants.events.POPULATE,
	
	// Event name when when an error occurs on Feed population
	populateFeedErrorEventName: com.ibm.social.as.constants.events.POPULATEERROR,
	
	constructor: function(){
		this.currentXhrs = [];
	},
	
	/**
	 * Make an XHR request to fetch the AS feed.
	 */
	fetchFeed: function(url, dontRefreshFilters, destroyNewsFeed, dynamicAdd, clickEvent, scrollTop){
		// Cancel any XHR requests that we've made
		while(this.currentXhrs.length > 0){
			var lastXhr = this.currentXhrs[this.currentXhrs.length-1];
			// If this is a dynamic add and the previous request wasn't
			if(dynamicAdd && !lastXhr.dynamicAdd && lastXhr.fired < 0){
				// Cancel this fetch as we don't want a dynamic update interrupting
				// a normal request (i.e. choose feed over status update request)
				return;
			}
			
			var xhr = this.currentXhrs.pop();
			
			if (xhr.cancel){
				// No problem calling if cancelled already
				xhr.cancel();
			}
		}
			
		// Ask the model to get the stream
		var xhr = this.model.getStream({
			newsUrl: url,
			onLoad: dojo.partial(dojo.hitch(this, "onFeedLoad"), destroyNewsFeed, dynamicAdd, url, clickEvent, scrollTop),
			onError: dojo.partial(dojo.hitch(this, "onFeedError"), destroyNewsFeed, dynamicAdd, url, clickEvent, scrollTop)
		});
		
		if(xhr){
			xhr.dynamicAdd = dynamicAdd;
			this.currentXhrs.push(xhr);
		}
	},
	
	/**
	 * Called when the AS feed has loaded. Contacts the View to display the response.
	 * @param destroyNewsFeed {Boolean} destroy existing news feed
	 * @param dynamicAdd {Boolean} Are we adding something dynamically (e.g. from Sharebox/EE)
	 * @param response {Object}
	 */
	onFeedLoad: function(destroyNewsFeed, dynamicAdd, url, clickAction, scrollTop, response){
		dojo.publish(com.ibm.social.as.constants.events.FEEDFETCHED, [url, destroyNewsFeed]);
		if(!destroyNewsFeed && !dynamicAdd){
			// Filter the entries returned in the response so that any currently
			// displayed news items are not shown twice in the stream
			var lastNewsDataId = this.getLastNewsItemId();
			response.entry = this.filterEntriesById(response.entry, lastNewsDataId);
		}
		
		// Publish an event to populate the AS view
		dojo.publish(this.populateFeedEventName, [response, destroyNewsFeed, dynamicAdd, clickAction, scrollTop, url]);
	},
	
	onFeedError: function(destroyNewsFeed, dynamicAdd, url, clickAction, scrollTop, error){
		// If dojoType is 'cancel' it means the request has been aborted, 
		// so probably not an error 
		if (error.dojoType == "cancel"){ 
			return; 
		}
		
		dojo.publish(com.ibm.social.as.constants.events.FEEDFETCHED, [url, destroyNewsFeed]);
		
		console.error("XhrController onFeedError - Failed to load feed - error: %o", error);
		
		// Display error message.. unless it's an unauthenticated error
		// If unauthenticated, we will be redirected to login page
		// Dont flash up an error before that
		if ( error.unauthenticated !== true ) {
			dojo.publish(this.populateFeedErrorEventName, [error, dynamicAdd]);
		}
	},
	
	/**
	 * Starting at index 0, search through the entries array. If an entry is found
	 * with an id matching the 'id' param, slice the array up until that point.
	 * @param entries {Array} response entries coming back from the AS feed.
	 * @param id {String} identifier of the last currently displayed news item.
	 * @returns {Array} a potentially cropped entries array.
	 */
	filterEntriesById: function(entries, id){
		if(!id || !entries){
			return entries;
		}
		
		// Iterate through the entries, removing all found
		// up until the id we have.
		for(var e = 0; e < entries.length; e++){
			var entry = entries[e];
			
			if(entry.id == id){
				// Found our news item
				return entries.slice(e + 1);
			}
		}
		
		// No entries found with id, return passed entries
		return entries;
	},
	
	/**
	 * Get the last news item being shown in the stream return its id.
	 * @returns {String} id
	 */
	getLastNewsItemId: function(){
		var lastNewsItem = this.view.getLastNewsItem();
		
		return (lastNewsItem) ? lastNewsItem.newsData.getId() : null;
	}
});
