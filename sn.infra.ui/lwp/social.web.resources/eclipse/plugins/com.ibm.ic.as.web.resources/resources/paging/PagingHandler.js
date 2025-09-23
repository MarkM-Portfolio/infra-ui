/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/dom-class",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/text!ic-as/paging/templates/pagingHandler.html",
		"dojo/topic",
		"ic-as/constants/events",
		"ic-as/feed/FeedLink",
		"ic-as/paging/interfaces/IPagingHandler"
	], function (dojo, declare, domClass, i18nactivitystream, template, topic, events, FeedLink, IPagingHandler) {
	
		/**
		 * Controls the paging of the Activity Stream. Once the page needs to change
		 * (either by a complete new page or an append) it publishes to an event and
		 * includes the page number it needs.
		 * @author Robert Campion
		 */
		
		var PagingHandler = declare("com.ibm.social.as.paging.PagingHandler", 
		IPagingHandler,
		{
			// preconfigured default
			defaultPagingAmount: 20,
			
			// The amount we expect to see in the stream.
			pagingAmount: 20,
			
			// Have we paged for this view/filter yet
			hasPaged: false,
			
			// Activity stream view
			view: null,
			
			// Resource bundle
			strings: null,
			
			feedLink: null,
			
			lastNewsItemNode: null,
			
			resetCount: false,
			
			pagingEventName: events.PAGECHANGE,
			
			templateString: template,
			
			postMixInProperties: function(){
				this.strings = i18nactivitystream;
				// check to see if the config is overriding the page-size
				var defUrlParams = com.ibm.social.as.configManager.getDefaultUrlTemplateValues();
				if ( defUrlParams && defUrlParams.count ) {
					// updated expected pagingAmount based on pagesize defined in config
					this.pagingAmount = defUrlParams.count;
				}		
			},
			
			postCreate: function(){
				this.feedLink = new FeedLink({}, this.feedLinkNode);
				
				this.inherited(arguments);
			},
			
			/**
			 * Show the next page.
			 */
			showNextPage: function(){
				var updateObj = {};
				
				// We've paged
				this.hasPaged = true;
				
				// Get the last news item in the AS feed
				var lastNewsItem = this.view.getLastNewsItem();
				this.lastNewsItemNode = lastNewsItem.domNode;
				// Get the last news item time - use the published time of the event.
				updateObj["updatedBefore"] = (lastNewsItem && lastNewsItem.newsData) ? lastNewsItem.newsData.getPublished() : null;
				
				updateObj["snapshot"] = activityStreamConfig.connections.snapshot || null;
				
				updateObj["resetCount"] = this.resetCount;
				
				// Publish an event to signal that the feed should be updated using 
				// updatedBefore as a parameter. If lastNewsItemTime is null, the 
				// listener will handle it (by just making a normal request).
				topic.publish(this.pagingEventName, updateObj);
			},
			
			/**
			 * Catch the keypress for the Show Next button.
			 * @param e {event} - The event that caused the function to be called
			 */
			showNextPageKey: function(e) {
				// If spacebar has been pressed show the next page.
				if (e && (e.keyCode || e.which) === 32) {
						this.showNextPage();
				}
			},
			
			/**
			 * Go back to the top of the page.
			 */
			goBackToTop: function(){
				window.scrollTo(0, 0);
				var firstNewsItem = this.view.getFirstNewsItem();
				// focus to the first item in the AS
				topic.publish(events.ITEMGOTFOCUS, firstNewsItem, true, firstNewsItem.newsItemNode);
			},
			
			/**
			 * Catch the keypress for the back to top button.
			 * @param e {event} - The event that caused the function to be called
			 */
			backToTopKey: function(e) {
				// If space bar has been pressed then go back to top.
				if (e && (e.keyCode || e.which) === 32) {
					this.goBackToTop();
					
					// Stop propgation to prevent the display jumping back down.
					e.preventDefault(), e.stopPropagation();
				}
			},
			
			updateShowingAmount: function(amount){
				var pageCount = this.pagingAmount;
				//if the view has specified a count then page at that level
				var viewFilter = this.view.controller.configHandler.getSelectedViewFilterWithCount();
				if(viewFilter && viewFilter.params.count){
					pageCount = viewFilter.params.count;
					delete viewFilter.params.count;
					this.resetCount = true;
				}
				var defUrlParams = com.ibm.social.as.configManager.getDefaultUrlTemplateValues();
				if ( defUrlParams && defUrlParams.count ) {
					this.resetCount = true;
					this.pagingAmount = this.defaultPagingAmount;
					delete defUrlParams.count;
				}		
				// Refocus to the first new coming item after user click show more link
				if(this.lastNewsItemNode){
					var newFirstNode = this.lastNewsItemNode.nextSibling;
					if(newFirstNode){
						var newFirstNewsItem = dijit.byNode(newFirstNode);
						topic.publish(events.ITEMGOTFOCUS, newFirstNewsItem, true, newFirstNewsItem.newsItemNode);
					}
				}
				// Hide/show the scroller depending on the amount of items in the view.
				// If the amount is less than what we expect, there are no more news 
				// items available, so hide the scroller.
				if(amount < this.pagingAmount && this.hasPaged){
					// There's no more items an we have paged, show back to top
					this.showBackToTop();
				}else if(amount >= pageCount){
					// There may still be more items
					this.showShowMore();
				}else{
					// Hide both links
					this.hidePagingHandler();
					this.hideBackToTop();
				}
			},
			
			showShowMore: function(){
				// Reset this flag, 'showNextPage' will set it
				this.resetHasPaged();
				
				// Hide the back to top node first
				domClass.add(this.backToTopNode, "lotusHidden");
				
				// Show the 'Show more' node
				domClass.remove(this.showMoreNode, "lotusHidden");
			},
			
			showBackToTop: function(){
				// Reset hasPaged
				this.resetHasPaged();
				
				// Should not show both paging handler and back to top
				this.hidePagingHandler();
				
				// Show the 
				domClass.remove(this.backToTopNode, "lotusHidden");
			},
			
			/**
			 * Provide a function to hide the bottom scroller, between 
			 * feed retrievals etc
			 */
			hidePagingHandler: function(){
				domClass.add(this.showMoreNode, "lotusHidden");
			},
			
			/**
			 * Hide the back to top link.
			 */
			hideBackToTop: function(){
				domClass.add(this.backToTopNode, "lotusHidden");
			},
			
			/**
			 * Resets hasPaged to false.
			 */
			resetHasPaged: function(){
				this.hasPaged = false;
			},
			
			/**
			 * Destroy this dijit and its children.
			 */
			destroyRecursive: function(){
				this.feedLink.destroyRecursive();
			}
		});
		
		return PagingHandler;
	});
