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

dojo.provide("com.ibm.social.as.view.ActivityStreamView");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("com.ibm.social.as.util.configNormalizer");
dojo.require("com.ibm.social.as.filter.FilterContainer");
dojo.require("com.ibm.social.as.controller.Controller");
dojo.require("com.ibm.social.as.paging.PagingHandler");
dojo.require("com.ibm.social.as.item.manager.NewsItemFactory");
dojo.require("com.ibm.social.as.item.manager.NewsItemManager");
dojo.require("com.ibm.social.as.view.PlaceholderView");
dojo.require("com.ibm.social.as.util.ActivityStreamViewUtil");
dojo.require("com.ibm.social.as.loading.Loader");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("lconn.news.microblogging.sharebox.events");
dojo.require("com.ibm.social.as.util.LinkTarget");
dojo.require("com.ibm.social.gadget.people.scanner");
dojo.require("com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag");
dojo.require("com.ibm.social.as.util.ASNewRelic");
dojo.require("com.ibm.social.as.util.ASKeys");

dojo.requireLocalization("com.ibm.social.as","activitystream");

/**
 * Displays the main river of news content. Acts like a container
 * for river of news items.
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.view.ActivityStreamView",
[dijit._Widget, dijit._Templated,
 com.ibm.social.as.util.LinkTarget,
 com.ibm.social.as.view.PlaceholderView,
 com.ibm.social.as.util.ActivityStreamViewUtil,
 com.ibm.social.as.util.configNormalizer],
{
	// Properties for the feed
	feedProperties: null,
	
	// Filter menu widget container
	filterContainer: null,
		
	// Embedded experience manager
	eEManager: null,
	
	// Config manager
	configManager: null,
	
	// State manager
	// TODO rename to controller
	controller: null,
	
	// Loader dijit
	loader: null,
	
	// pagingHandler
	pagingHandler: null,
	
	// Manager to handle creation tasks
	newsItemManager: null,
	
	// Error message dijit
	errorNewsItem: null,
	
	// Config error message
	configErrorNewsItem: null,
	
	// Resource strings
	strings: null,
	
	showPagingTopOverride: false,
	
	// New Relic Helper
	ASNewRelic: null,
	
	// ref for top of activity stream anchor
	asPermLinkAnchorRef: "asPermLinkAnchor",
	
	populateInitEventName: com.ibm.social.as.constants.events.INIT,
	
	populateFeedErrorEventName: com.ibm.social.as.constants.events.POPULATEERROR,
	
	configErrorEventName: com.ibm.social.as.constants.events.CONFIGERROR,
	
	populateEventName: com.ibm.social.as.constants.events.POPULATE,
	
	resizeTextHeight: com.ibm.social.as.constants.events.RESIZEHEIGHT,
	
	updateEETargetEvent: com.ibm.social.as.constants.events.UPDATEEETARGET,
	
	newsItemDeleteEvent: com.ibm.social.as.constants.events.NEWSITEMDELETE,
	
	itemSelectedEvent:  com.ibm.social.as.constants.events.ITEMSELECTED,
	
	dynamicUpdateFailure: com.ibm.social.as.constants.events.DYNAMICFAIL,
	
	updateFiltersEvent: com.ibm.social.as.constants.events.UPDATEFILTERS,
	
	showPagingTopBorderEvent: com.ibm.social.as.constants.events.SHOWTOPBORDER,
	
	removePagingTopBorderEvent: com.ibm.social.as.constants.events.REMOVETOPBORDER,
	
	templatePath: dojo.moduleUrl("com.ibm.social.as", "view/templates/activityStreamView.html"),
	
	postCreate: function(){
		as_console_debug("ActivityStreamView postCreate");
		
		this.inherited(arguments);										
		var newsItemFactory = this.configManager.getNewsItemFactory();
		this.newsItemManager = this.configManager.getNewsItemManager(newsItemFactory);			
		
		this.loader = new com.ibm.social.as.loading.Loader({
			loaderAttachNode: this.loadingNode
		});	
		
		this.pagingLoader = new com.ibm.social.as.loading.Loader({
			loaderAttachNode: this.pagingLoaderNode
		});	
		
		// Create the embedded experience manager if needed
		var eeManagerClass = this.configManager.getEEManager();
		if ( eeManagerClass ) {
			dojo.require(eeManagerClass); // should be pulled in by module, but jsut in case
			this.eEManager = new (dojo.getObject(eeManagerClass))();
		}
		
		// Build the controller
		this.controller = new com.ibm.social.as.controller.Controller({
			configManager: this.configManager,
			view: this
		});

		// Make the pagingHandler
		this.pagingHandler = new com.ibm.social.as.paging.PagingHandler({
			targetBottomScrollerNode: this.showMoreNode,
			view: this
		});

		this.subscribe(this.populateInitEventName, dojo.hitch(this, "setupNewsFeed"));

		this.subscribe(this.populateEventName, dojo.hitch(this, "populateNewsFeed"));

		this.subscribe(this.populateFeedErrorEventName, dojo.hitch(this, "newsFeedError"));

		this.subscribe(this.configErrorEventName, dojo.hitch(this, "asConfigError"));

		this.subscribe(this.newsItemDeleteEvent, dojo.hitch(this, "newsItemDeleted"));

		this.subscribe(this.dynamicUpdateFailure, dojo.hitch(this, "updateNewsItemDynamicUpdateError"));

		this.subscribe(this.updateFiltersEvent, dojo.hitch(this, "updateFilters"));

		this.subscribe(this.showPagingTopBorderEvent, function(){
			this.showPagingTopOverride = true;
		});

		this.subscribe(this.removePagingTopBorderEvent, dojo.hitch(this, "hidePagingTopBorder"));

		this.subscribe(com.ibm.social.as.constants.events.STATEUPDATED, dojo.hitch(this, "showDesc"));

		//Sticky header
		if(!activityStreamAbstractHelper.isGadget) {
		    this.connect(window, "onscroll", dojo.hitch(this, "setSticky"));
		    this.connect(window, "onresize", dojo.hitch(this, "setSticky"));
		    this.connect(window, "onresize", dojo.hitch(this, "setHeaderWidth"));
		}

		this.subscribe(lconn.news.microblogging.sharebox.events.SHAREBOX_EXPANDING, dojo.hitch(this, "setHeaderExpanded"));
	    this.subscribe(lconn.news.microblogging.sharebox.events.SHAREBOX_COLLAPSING, dojo.hitch(this, "setHeaderCollapsed"));
	    
	    if (com.ibm.social.incontext.util.html.isHighContrast()){	    	
	    	var leftFin = dojo.query(".stream-finLeft", this.domNode)[0];	
			dojo.addClass(leftFin, "stream-finLeftHighContrast");
	    }
	    
	    this.ASNewRelic = new com.ibm.social.as.util.ASNewRelic();
		
	},
	
	getWinOffset: function(){
		return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	},
	
	hasHeaderMenu: function(){
		return dojo.some(this.controller.configHandler.getSelectedObjects(), function(obj){
			return dojo.getObject("filters.type", false, obj) == "links";
		});
	},
	
	setSticky: function(){
		if (!this.topOffset){
			this.topOffset = dojo.position(this.streamHeaderWrapper, true).y - 10;
		}
		if (this.hasHeaderMenu() && this.getWinOffset() > this.topOffset && document.body.offsetWidth > 990) {
	        dojo.addClass(this.streamHeaderWrapper, "isSticky");
	        dojo.attr(this.streamHeaderWrapper,"aria-hidden","true");
	    } else {
	    	dojo.removeClass(this.streamHeaderWrapper, "isSticky");	
	    	setTimeout(dojo.hitch(this, function(){
	    		dojo.attr(this.streamHeaderWrapper,"aria-hidden","false");				
			}), 0);
	    }
		
		this.setHeaderWidth();
		
		//Make room for fixed header
        this.setLabelTop();
	},
	setLabelTop: function(){
	    if (dojo.hasClass(this.streamHeaderWrapper, "isSticky")) {
	        dojo.style(this.pagingTop, "margin-top", (dojo.position(this.streamHeaderWrapper).h - 6) + "px");
	    } else {
	        dojo.style(this.pagingTop, "margin-top", "0px");
	    }
	},
	setHeaderWidth: function(){
	    if (dojo.hasClass(this.streamHeaderWrapper, "isSticky")) {
	        dojo.style(this.streamHeaderWrapper, "width", (dojo.position("lotusContent").w) + "px");
	    } else {
	        dojo.style(this.streamHeaderWrapper, "width", "auto");
	    }
	},
	setHeaderExpanded: function(){
		dojo.addClass(this.streamHeaderWrapper, "isExpanded");
	},
	setHeaderCollapsed: function(){
		dojo.removeClass(this.streamHeaderWrapper, "isExpanded");
	},
		
	postMixInProperties: function() {
		this.inherited(arguments);
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as","activitystream");
	},
	
	/**
	 * Update the Filter area with the current view description
	 */
	showDesc: function(newViewId) {
		var view = this.controller.configHandler.getSelectedViewFilterDescription();
		if(view){
			this.asDescription.innerHTML = view.description;
			this.placeholderHeaderCenter.setAttribute("aria-label", view.description);
		}
		
	},

	/**
	 * Setup the Activity stream page including clear page, display filters and launch loading indicator
	 * @param controller - Controller object
	 * @param dontRefreshFilters - boolean
	 * @param destroyNewsFeed - boolean
	 */
	// TODO Possibly rename as it not only populates but appends
	// when the data comes from the ShareBox
	setupNewsFeed: function(dontRefreshFilters, destroyNewsFeed, dynamicAdd){
		as_console_debug("ActivityStreamView initializeNewsFeedPage args:", arguments);		
		// We may need to destroy the news feed before populating
		// it with content
		if(destroyNewsFeed){
			// Destory the news feed and refresh the loader
			this.destroyNewsFeed();
			this.pagingHandler.hidePagingHandler();
			this.pagingHandler.hideBackToTop();		
			this.loader.recycleLoader(false);
		}
		// Don't show the loader for dynamic adds (from EE/Sharebox)
		else if(!dynamicAdd){
			// in this case we are paging
			this.pagingLoader.recycleLoader(true);
		}
			
		// Only refresh the filters menu when we need to
		// e.g. at load and when a new view is clicked
		if(!dontRefreshFilters){
			this.updateFilters();
		}
		
		// If the filter container isn't created, 
		// Or if there are no filters for current view:
		//   hide the paging border
		if(!this.showPagingTopOverride && (!this.filterContainer || !this.controller.configHandler.getSelectedObjects()[0].filters) ) {
			this.hidePagingTopBorder();
		} else {
			this.showPagingTopBorder();
		}
	},
	
	/**
	 * Utility function to find a widget and set dynamic update failure
	 */
	updateNewsItemDynamicUpdateError: function(incomingActivityId, updatedSince){
		dojo.some(dijit.findWidgets(this.newsFeedNode), function(widget){
			// If this widget matches the new objectId
			if(widget.newsData && widget.newsData.getActivityId() && 
					(widget.newsData.getActivityId().indexOf(incomingActivityId) !== -1)){
				widget.setDynamicUpdateFailed(updatedSince);			
				// Break
				return true;
			}
		});
	},
	
	/**
	 * Utility function to find a widget and open its EE
	 */
	openEEForNewsItemWidget: function(incomingActivityId){
		dojo.some(dijit.findWidgets(this.newsFeedNode), function(widget){
			// If this widget matches the new objectId
			if(widget.newsData && widget.newsData.getActivityId() && 
					(widget.newsData.getActivityId().indexOf(incomingActivityId) !== -1)){
				widget.openEE();			
				// Break
				return true;
			}
		});
	},
	
	/**
	 * Handle dynamic updates to the feed
	 * 1) Fake addition to the top of the stream
	 * 2) Update in place Activities in the stream. Within rollup only update on rollup id
	 * within non rollup update based on the story id and allow dynamic updates to multiple
	 * existing Activities. For example two events based on microblog, liking one in the EE
	 * updates both instances.
	 */
	populateDynamicUpdate: function(newsItems, destroyNewsFeed, clickEvent, isRollup, urlUpdater){
		//setup fragment array to match index of news items returned from dynamic feed request
		var fragment = new Array();
		for(var i = 0; i < newsItems.length; i++){
			var newsItemArray = new Array();
			newsItemArray[0] = newsItems[i];
			fragment[i] = this.newsItemManager.createNewsItems(newsItemArray, true);
		}
		
		// Place the widget(s) on the screen (use first item, this is only used in the fake)
		var incomingActivityId = (newsItems.length > 0) ? newsItems[0].getActivityId() : undefined;
		
		//If config error insert the error item at top of feed
		//This could be userInfo obj missing which would not block the feed from rendering
		//but affects usage, so continue to display feed with message
		if(this.configErrorNewsItem){
			dojo.place(this.configErrorNewsItem.domNode,  fragment[0].firstChild, "first");
		}
		
		//iterator over fragments and items updating each one. May be more than one
		//based on dynamic update to non rollup view.
		for(var i = 0; i < fragment.length; i++){
			if(urlUpdater && urlUpdater.updateUrls) {
				urlUpdater.updateUrls(fragment[i]);
			}					
			this.placeWidgets(fragment[i], newsItems[i], true, isRollup);
		}								
		
		// if a clickEvent is passed through call open on the EE for the widget
		// This only occurs when a user clicks on a fake item before its rendered
		// fully - we honour the click to open EE when the item fully loads.
		if(clickEvent && incomingActivityId){
			this.openEEForNewsItemWidget(incomingActivityId);
		}
		
		// Bidi support
    	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
	},
	
	/**
	 * Handle a full feed update on the activity stream including appending to an existing feed.
	 */
	populateFeedUpdate: function(response, newsItems, destroyNewsFeed, isRollup, urlUpdater, singleItemFeed){
		// check that we don't have duplicate entries, if this isn't a dynamic update
		if(isRollup) {
			// loop through currently rendered items
			dojo.forEach(dijit.findWidgets(this.newsFeedNode), function(dij){
				// loop through items received, stop & remove if we hit a match.
				dojo.some(newsItems, 
					function(item, ind){
						if(dojo.getObject("newsData.connections.rollupid", false, dij) === item.connections.rollupid) {
							newsItems.splice(ind, 1);
							return true;
						}
					}
				);
			});
		}
		//check non rollup view to ensure the first item back on subsequent feed
		//is not a duplicate. Needed because updatedBefore param is inclusive of the 
		//pub date of the last item in the prev feed
		if(!isRollup) {
			var lastNewsItem = this.getLastNewsItem();
			if(lastNewsItem){
				var firstNewsItem = newsItems[0];
				if(firstNewsItem && lastNewsItem.newsData.id === firstNewsItem.id){
					newsItems.splice(0, 1);
				}
			}		
		}
		
		// If we're appending to the current stream but there are no more items to display
		// we show the "Back to top" link instead of "Show more".
		if(!destroyNewsFeed && newsItems.length <= 0){
			// Remove the loader that may be on display
			this.removeLoaders();
			this.pagingHandler.showBackToTop();
			return;
		}
		
		var fragment = new Array();
		fragment[0] = this.newsItemManager.createNewsItems(newsItems, false);
		
		//If config error insert the error item at top of feed
		//This could be userInfo obj missing which would not block the feed from rendering
		//but affects usage, so continue to display feed with message
		if(this.configErrorNewsItem){
			dojo.place(this.configErrorNewsItem.domNode,  fragment[0].firstChild, "first");
		}
		
		if(urlUpdater && urlUpdater.updateUrls) {
			urlUpdater.updateUrls(fragment[0]);							
		}			
		this.placeWidgets(fragment[0], newsItems[0], false, isRollup);				
		
		if(!singleItemFeed){
			// Update the showing amount which will decide whether to display the
			// "Show more" link or not. Use the response's itemsPerPage property 
			// which will be indicative of the page size returned but not necessarily 
			// of the amount we're showing. Some news items may have been cropped by 
			// the XhrController.
			this.pagingHandler.updateShowingAmount(response.itemsPerPage);
		}	
		
		this.checkPermLinkFragment();
		
		// Bidi support
    	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
	},
	
	/**
	 * Check the configManager to see if the view is on a filter with blank label
	 * this is a perm link view and move the page to the top of the stream to bring
	 * Addressed item into view
	 */
	checkPermLinkFragment: function(){
		if(this.configManager.isPermLinkViewOfAS()){
			setTimeout(dojo.hitch(this, function(){
				dijit.scrollIntoView(this.asPermLinkAnchorRef);
			}), 300)
		}
	},
	
	/**
	 * Populates the news feed UI with data coming from the model.
	 * @param response {JSON} in the ActivityStreams format.
	 * @param dynamicAdd {Boolean} true if this is a dynamic add (e.g. from EE).
	 */
	populateNewsFeed: function(response, destroyNewsFeed, dynamicAdd, clickEvent, scrollTop, url){
		as_console_debug("ActivityStreamView populateNewsFeed args:", arguments);

		// SHINDIG-1758
		if ( !response.entry && response.list ) {
			response.entry = response.list;
		}
		
		// Depending on the feed we request, we may get array of entries, or single entry
		// sometimes, we request a single item
		var singleItemFeed = !dojo.isArray(response.entry);
		var newsItems = singleItemFeed ? [response.entry] : response.entry;		
		var isRollup = (url && url.indexOf("rollup=true")!==-1);
		var urlUpdater = this.configManager.getUrlUpdater();
		if(dynamicAdd){
			this.populateDynamicUpdate(newsItems, destroyNewsFeed, clickEvent, isRollup, urlUpdater)			
		} else {
			this.populateFeedUpdate(response, newsItems, destroyNewsFeed, isRollup, urlUpdater, singleItemFeed)			
		}											

		// Both modifyContentLinkTargets and people scanner involve using dojo.query
		// to find nodes within the stream. By doing them in sequence and on the actual dom node
		// as opposed to the fragment, we should get some benefit from caches used by dojo.query		
		// For each content node modify the anchor targets
		this.modifyContentLinkTargets(this.domNode);
		// Is the activity stream in use a gadget
		var isGadget = (activityStreamAbstractHelper && activityStreamAbstractHelper.isGadget);
		
		// Scan the DOM node and add person card support
		com.ibm.social.gadget.people.scanner.scan(this.domNode, !isGadget);
				
		dojo.publish(this.resizeTextHeight, ["all"]);
		
		dojo.publish(com.ibm.social.as.constants.events.FEEDRENDERED);
		//We scroll to top due to sticky nav, need to reset the view
		//only return to top when adding new feed, if paging, stay in place
		if(destroyNewsFeed && (this.isStickyHeader() || scrollTop)){
			window.scrollTo(0, 0);	
		}
		
		// New Relic - Activity Stream is loaded
		this.ASNewRelic.track(com.ibm.social.as.util.ASKeys.ACTIVITY_STREAM_LOADED, {isDynamicAdd : dynamicAdd === true ? dynamicAdd : false});
	},
	
	isStickyHeader: function(){
		return dojo.hasClass(this.streamHeaderWrapper, "isSticky");
	},
	
	/**
	 * Handles placing the widgets onto the stream.
	 * @param widgetDom {DOMNode} Contains one/many widgets
	 * @param incomingActivityId {String} objectId of the incoming news item
	 * @param dynamicAdd {Boolean} true if this is a dynamic add (e.g. from EE).
	 */
	placeWidgets: function(widgetDom, newsItem, dynamicAdd, isRollup){
		// The position we're going to add the content to.
		// Default to last (used on initial load and paging).
		var position = "last";
		// The place the content will be added to.
		var placeNode = this.newsFeedNode;
		
		var widgetById;
		// News item being added to the stream
		var incomingNewsItem;
		
		if(dynamicAdd){
			// Iterate through the existing news item dijits and check if one with this 
			// object id is showing. Check for activity id as well as story id. A fake
			// item placed on the glass will not have the story id generated.
			dojo.some(dijit.findWidgets(this.newsFeedNode), function(widget){
				
				if(isRollup){
					//If this widget matches the new activity id
					if(widget.newsData && widget.newsData.getActivityId() == newsItem.getActivityId()){
						position = "replace";
						widgetById = widget;
						return;
					}									
				}
				else{
					// If this widget matches the new story id
					if(widget.newsData && widget.newsData.getId() == newsItem.getId()){
						// Replace it with the new dijit coming in
						position = "replace";
						widgetById = widget;
						return;
					}					
				}
			});
			
			if(widgetById){				
				placeNode = widgetById.domNode;
				incomingNewsItem = this.handleDynamicWidgetReplace(widgetById, widgetDom);			
			}// Else, just add this at the top of the stream
			else{
				position = "first";
			}
		}
		
		// Remove the loader that may be on display
		this.removeLoaders();
		
		// Drop the fragment onto the page
		dojo.place(widgetDom, placeNode, position);
		
		// Restore the auto height (may have been changed in destoryNewsFeed)		
		dojo.style(this.newsFeedNode, {minHeight: "0"});
		
		// If incomingNewsItem is defined, the EE is open for the news item being replaced
		if(incomingNewsItem){
			incomingNewsItem.isEEOpen = true;
			// Update the target of the EE
			dojo.publish(this.updateEETargetEvent, [incomingNewsItem]);
			//EE open so updated item should be selected
			dojo.publish(this.itemSelectedEvent, [incomingNewsItem]);
		}
	},
	
	handleDynamicWidgetReplace:function(widget, widgetDom){
		var incomingNewsItem;
		// If the widget being replaced is open in the EE
		if(widget.isEEOpen){
			// Set the incoming news item to be the first child of dom
			incomingNewsItem = (widgetDom.firstChild) ? dijit.byId(widgetDom.firstChild.id) : undefined;
		}
		
		// Destroy this widget but keep its DOM
		widget.destroyRecursive(true);
		return incomingNewsItem;

	},
	
	/**
	 * Handle an error event from the Controller and display the appropriate message
	 */
	newsFeedError: function(error, onTop){	
		as_console_debug("ActivityStreamView newsFeedError");
		
		// Destroy the old NewsFeedError if it exists
		if(this.errorNewsItem){
			this.errorNewsItem.destroyRecursive();
		}
		var errMessage = (error) ? error.message : "";

		// Create the new NewsFeedError
		this.errorNewsItem = this.newsItemManager.factory.createNewsItem("NewsFeedError", {
			showMoreMessage: errMessage
		}, dojo.create("div", {}));
		var position = (onTop) ? "first" : "last";
		this.removeLoaders();

		// Display the error message at the top or bottom of the stream
		dojo.place(this.errorNewsItem.domNode,  this.newsFeedNode, position);
	},
	
	removeLoaders: function(){
		this.loader.removeLoader();
		this.pagingLoader.removeLoader();
	},
	
	/**
	 * Handle an error event from the Controller and display the appropriate message
	 */
	asConfigError: function(placeError, showMoreMsg){	
		as_console_debug("ActivityStreamView asConfigError");

		// Create the new NewsFeedError
		this.configErrorNewsItem = this.newsItemManager.factory.createNewsItem("NewsFeedError", {
			errorMessage: this.strings.invalidASConfig,
			showMoreMessage: showMoreMsg
		}, dojo.create("div", {}));

		if(placeError)
			dojo.place(this.configErrorNewsItem.domNode,  this.newsFeedNode, "first");
	},
	
	/**
	 * Either creates or updates the filter container
	 */
	updateFilters: function(){
		as_console_debug("ActivityStreamView updateFilters");
		if(this.controller.configHandler.getSelectedObjects()[0].filters && this.controller.configHandler.getSelectedObjects()[0].filters.selectedItem == "topUpdates") {
			return;
		}
		//hide sharkfin if not sub header exists
		if(!this.hasHeaderMenu()){
			dojo.addClass(this.headerFinsNode, "lotusHidden");
			dojo.addClass(this.pagingNode, "noSubFilterView");
			dojo.attr(this.pagingNode, "role", "presentation");
			//revert header to old oneUI style
			dojo.removeClass(this.streamHeaderWrapper, "streamHeaderWrapper");
		}
		// If the filter container has not been created
		if(!this.filterContainer){
			// Create the filter container
			this.filterContainer = new com.ibm.social.as.filter.FilterContainer({
				controller: this.controller,
				sharkFinNode: this.filterSharkfin,
				searchBarNode: this.searchBoxMain
				}, this.filterContainerNode);
		}else{
			// Just create a new filter, no need for new container
			this.filterContainer.createFirstFilter();
		}
	},
	
	/**
	 * If all items deleted , display 'no content' message
	 */
	newsItemDeleted: function(){
		if(!this.newsFeedNode.hasChildNodes() && dojo.hasClass(this.pagingHandler.showMoreNode, "lotusHidden")){
			this.newsItemManager.noContentItem = this.newsItemManager.createNewsItem("NoContent");
			this.placeWidgets(this.newsItemManager.noContentItem.domNode);
		}
	},
	
	/**
	 * Hide the paging's top border.
	 */
	hidePagingTopBorder: function(){
		dojo.addClass(this.pagingTop, "asNoTopPaging");
	},
	
	/**
	 * Show the paging's top border.
	 */
	showPagingTopBorder: function() {
		dojo.removeClass(this.pagingTop, "asNoTopPaging");
	},
	
	
	/**
	 * Destroys the current news feed (i.e. its widgets).
	 * TODO: May move this to a util class so as to keep
	 * everything clean.
	 */
	destroyNewsFeed: function(){
		// Persist with the same height to prevent the page from jumping
		var asHeight = dojo.marginBox(this.newsFeedNode).h;
		dojo.style(this.newsFeedNode, {minHeight: asHeight + "px"});
		// Publish that we are about to tear down the Stream so resources
		// can release news item references
		dojo.publish(com.ibm.social.as.constants.events.FEEDDESTROYED);
		// Destroy the current feed that's there
		dojo.forEach(dijit.findWidgets(this.newsFeedNode), function(widget){
			widget.destroyRecursive();
		});
		
		dojo.empty(this.newsFeedNode);
	},
	
	/**
	 * Destroy this widget and all of its descendants
	 */
	destroyRecursive: function(){
		// Destroy all children dijits
		dojo.forEach(dijit.findWidgets(this.domNode), function(widget){
			widget.destroyRecursive();
		});
		
		// Manually destroy the paging handler (as this is not a direct descendant)
		this.pagingHandler.destroyRecursive();
		
		// Call into specific class destroys
		this.controller.destroy();
		if(this.eEManager){
			this.eEManager.destroy();
		}
		
		this.inherited(arguments);
	}
});
