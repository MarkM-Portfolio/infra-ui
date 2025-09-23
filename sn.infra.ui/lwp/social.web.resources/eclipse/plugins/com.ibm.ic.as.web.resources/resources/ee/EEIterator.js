/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/topic",
		"dijit/registry",
		"ic-as/constants/events",
		"ic-ee/gadget/EEIterator"
	], function (declare, lang, topic, registry, events, EEIterator) {
	
		/**
		 * Custom Homepage activity stream iterator that uses a linked list
		 * approach for retrieving and displaying news items in the EE.
		 * @author Robert Campion
		 */
		
		var EEIterator = declare("com.ibm.social.as.ee.EEIterator", 
		EEIterator,
		{
			// The currentNewsItem being displayed in the EE
			currentNewsItem: null,
			
			feedDestroyHandle: null,
			
			constructor: function() {
				// Listen out for when the feed is destroyed and remove references to news items
				this.feedDestroyHandle = topic.subscribe(events.FEEDDESTROYED, lang.hitch(this, function(item, e) {
						this.currentNewsItem = null;
					}));
			},
			
			
			/**
			 * Transform the item passed into an EE acceptable object.
			 * @param item (Node) representing the data that the EE will display
			 * @returns (Object) that the EE uses to render content in the popup
			 */
			transform: function(item) {
				// Get the current news item dijit.
				// This contains all the data we need.
				var currentNewsItem = this.currentNewsItem = registry.byId(item.id);
				var newsData = currentNewsItem.newsData;
				// The embed object is taken directly from the news entry.
				var embedObject = newsData.getEmbedObject();
		
				// Make sure there is an embed object before returning to the EE
				if(embedObject){
					//Add activity url to context
					if(embedObject.context && !embedObject.context.activityUrl) {
						embedObject.context.activityUrl = (newsData.getActivityUrl()) ? 
								newsData.getActivityUrl() : newsData.getObjectUrl();
					}
					// Return an object that the EE can display
					return {
						gadgetXmlUrl: embedObject.gadget,
						gadgetUrl: embedObject.url || null,
						// TODO: Public flag should come from news item
						isPublic: false,
						isLoggedIn: true,
						around: item,
						eventHtml: newsData.getTitle(),
						context: embedObject.context,
						entry: newsData,
						user: com.ibm.social.as.configManager.getUserInfoId()
					};
				}else{			
					console.warn("EEIterator: There is no embed object for this news item");
					// Return an object that the EE can display
					return {
						// TODO: Public flag should come from news item
						isPublic: false,
						isLoggedIn: true,
						around: item,
						eventHtml: newsData.getTitle(),
						entry: newsData,
						user: com.ibm.social.as.configManager.getUserInfoId()
					};			
				}
			},
			
			/**
			 * Called by the dialog on open of EE.
			 * @param around (Node) clicked dom node.
			 * @returns see transform function above
			 */
			find: function(around){
				return this.transform(around);
			},
			
			/**
			 * Has the current news item got a next item available.
			 * @returns (Boolean) true if it does, false otherwise.
			 */
			hasNext: function(){
				return (this.currentNewsItem.next) ? true : false;
			},
			
			/**
			 * Has the current news item got a previous item available.
			 * @returns (Boolean) true if it does, false otherwise.
			 */
			hasPrevious: function(){
				return (this.currentNewsItem.previous) ? true : false;
			},
			
			/**
			 * Get the next news item available.
			 */
			next: function(){
				return this.transform(this.currentNewsItem.next.domNode);
			},
			
			/**
			 * Get the previous news item available.
			 */
			previous: function(){
				return this.transform(this.currentNewsItem.previous.domNode);
			},
			
			destroy: function(){
				this.feedDestroyHandle.remove();
			}
		});
		
		
		return EEIterator;
	});
