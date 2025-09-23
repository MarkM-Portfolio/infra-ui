/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/dom-construct",
		"dojo/text!ic-as/paging/interfaces/templates/iPagingHandler.html",
		"dijit/_Templated",
		"dijit/_Widget"
	], function (declare, domConstruct, template, _Templated, _Widget) {
	
		/**
		 * Interface that should be extended by anybody wishing to define their own
		 * paging handler class. This interface should not be created on its own.
		 * @author Robert Campion
		 */
		
		var IPagingHandler = declare("com.ibm.social.as.paging.interfaces.IPagingHandler", 
		[_Widget, _Templated],
		{
			templateString: template,
			
			// The current page of the feed.
			page: 1,
			
			// Depending on the scrolling you want, pass nodes into this class under these
			// variable names. For example, if you only want a bottom scroller, pass it in
			// under the 'targetBottomScrollerNode' var. If you want scrollers at the top
			// and bottom, pass a node in for each var.
			targetTopScrollerNode: null,
			targetBottomScrollerNode: null,
			
			pagingEventName: "",
			
			/**
			 * Called after the HTML template has been rendered.
			 * Sets up the scroller nodes.
			 */
			postCreate: function(){
				// If there is a top scroller node passed in
				if(this.targetTopScrollerNode){
					// Replace the current node (from the template HTML) with it
					domConstruct.place(this.targetTopScrollerNode, this.topScrollerNode, "replace");
				}
				
				// If there is a bottom scroller node passed in
				if(this.targetBottomScrollerNode){
					// Replace the current node (from the template HTML) with it
					domConstruct.place(this.bottomScrollerNode, this.targetBottomScrollerNode, "replace");
				}
			},
			
			/**
			 * Refresh the page number, back to its original. Also update the showing amount
			 * to remove the paging until it is reset.
			 */
			refreshPage: function(){
				this.page = 1;
				this.updateShowingAmount(0);
			},
			
			/**
			 * Show the next page.
			 */
			showNextPage: function(){
				this.page++;
				
				topic.publish(this.pagingEventName, this.page);
			},
			
			/**
			 * Show the previous page.
			 */
			showPreviousPage: function(){
				this.page--;
				
				topic.publish(this.pagingEventName, this.page);
			},
			
			/**
			 * Updated the amount of items being displayed in the view.
			 * Use this function to hide the scroller nodes if needs be.
			 * E.g. if there is less than 20 items in the view, you may
			 * wish to the the scrollers altogether.
			 * @override
			 * @param amount
			 */
			updateShowingAmount: function(amount){}
		});
		
		return IPagingHandler;
	});
