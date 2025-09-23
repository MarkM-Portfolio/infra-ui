/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.manager.NewsItemManager");

dojo.require("com.ibm.social.as.item.data.NewsDataAccessor");
dojo.require("com.ibm.social.as.item.type.TypeManager");

/**
 * Manages the creation of news items.
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.manager.NewsItemManager", [],
{
	// Factory used to create news items
	factory: null,
	
	// Handles what news item types will be created
	typeManager: null,
	
	// Pointer to the No Content widget if shown.
	noContentItem: null,
	
	constructor: function(factory){
		this.factory = factory;
		this.typeManager = new com.ibm.social.as.item.type.TypeManager();
	},
	
	/**
	 * Creates all the news items and returns them in a fragment.
	 * @param newsItems - Array containing data for news items
	 * @returns Node fragment containing newly created news items.
	 */
	createNewsItems: function(newsItems, insertAtTop){
		// Create a document fragment that will act as a repository
		// for all the widget nodes. This provides a performance boost
		// as the browser doesn't have to reflow for every new node.
		var fragment = document.createDocumentFragment();
		
		var renderedItems = 0;
		var newsItemsLength = newsItems.length;
		
		// Iterate through all the news items
		for(var i = 0; i < newsItemsLength; i++){
			var newsData = newsItems[i];

			// Mixin the accessors we will use to get attributes of the entries. This  
			// safeguards against non-mandatory attributes not being supplied.
			dojo.safeMixin(newsData, new com.ibm.social.as.item.data.NewsDataAccessor());
			// Init the news data accessor
			newsData.init();

			if(newsData.isAllMandatorySupplied()){
				var newsItemWidget = this.createNewsItem(this.getNewsItemType(newsData), newsData);						
				
				// If this news item is the last one to be appended to the feed
				if(i == newsItemsLength-1){
					// Add a class indicating so. This will be read by ActivityStreamUtil 
					// to retrieve the last news item in the feed
					dojo.addClass(newsItemWidget.domNode, "lastNewsItem");
				}
				
				fragment.appendChild(newsItemWidget.domNode);
				
				if(insertAtTop){
					// Destroy the No Content item if it's shown.
					if(this.noContentItem){
						this.noContentItem.destroy();
					}
				}
				
				renderedItems++;
			}
		}

		// Handle the case where there are no items to display or none were rendered.
		// When we're just inserting at the top, there's no need for a NoContentItem.
		if(renderedItems == 0 && !insertAtTop){
			// Create the no content item and append it to the fragment
			this.noContentItem = this.createNewsItem("NoContent");
			fragment = this.noContentItem.domNode;
		}
		
		return fragment;
	},
	
	/**
	 * Create a news item
	 * @param type {String} The type of news item you want to create
	 * @param newsData {Object} Information to populate the news item
	 * @returns
	 */
	createNewsItem: function(type, newsData){
		if (!com.ibm.social.as.item.NewsItem.prototype.newsItemPostCreateAction) {
			com.ibm.social.as.item.NewsItem.prototype.newsItemPostCreateAction = function () {
				console.info("adding newsItemPostCreateAction to NewsItemPrototype");
			};
		}

		if(dojo.config.isDebug){
			// Create the News item type
			return this.factory.createNewsItem(type, {
				newsData: newsData
			}, dojo.create("div", {}));
		} else {
			try{
				// Create the News item type
				return this.factory.createNewsItem(type, {
					newsData: newsData
				}, dojo.create("div", {}));
			}catch(error){
				// There has been an error, show the error message
				console.error("Error creating a " + type + " NewsItem with id: " + 
									newsData.id + " %o", error);
				return this.factory.createNewsItem("NewsFeedError", {
					errorType: "itemError",
					showMoreMessage: error.message
				}, dojo.create("div", {}));
			}	
		}
		
	},
	
	/**
	 * Get the news item type that should be used to display this
	 * news item.
	 * @param newsData
	 * @returns
	 */
	getNewsItemType: function(newsData){
		return this.typeManager.getType(newsData);
	}
});
