/* Copyright IBM Corp. 2011, 2021  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/dom-geometry",
		"dojo/i18n",
		"dojo/_base/lang",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/dom-style",
		"dojo/dom-construct",
		"dojo/on",
		"dojo/text!ic-as/view/templates/activityStreamView.html",
		"dojo/topic",
		"dojo/window",
		"dijit/_Templated",
		"dijit/_Widget",
		"dijit/registry",
		"ic-as/constants/events",
		"ic-as/loading/Loader",
		"ic-as/util/ActivityStreamViewUtil",
		"ic-as/util/LinkTarget",
		"ic-as/paging/PagingHandler",
		"ic-as/controller/Controller",
		"ic-as/filter/FilterContainer",
		"ic-as/util/configNormalizer",
		"ic-as/util/hashtag/search/ActivityStreamSearchHashtag",
		"ic-as/view/PlaceholderView",
		"ic-socgadget/people/scanner",
		"ic-news/microblogging/sharebox/events"
	], function (dojo, array, declare, domGeometry, i18n, lang, domAttr, domClass, i18nactivitystream, domStyle, domConstruct, on, template, topic, dojoWindow, _Templated, _Widget, registry, events, Loader, ActivityStreamViewUtil, LinkTarget, PagingHandler, Controller, FilterContainer, configNormalizer, ActivityStreamSearchHashtag, PlaceholderView, scanner, newsMicrobloggingShareboxEvents) {
	
		/**
		 * Displays the main river of news content. Acts like a container
		 * for river of news items.
		 * @author Robert Campion
		 */
		
		var ActivityStreamView = declare("com.ibm.social.as.view.ActivityStreamView",
		[_Widget, _Templated,
		 LinkTarget,
		 PlaceholderView,
		 ActivityStreamViewUtil,
		 configNormalizer],
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
			
			// ref for top of activity stream anchor
			asPermLinkAnchorRef: "asPermLinkAnchor",
			
			populateInitEventName: events.INIT,
			
			populateFeedErrorEventName: events.POPULATEERROR,
			
			configErrorEventName: events.CONFIGERROR,
			
			populateEventName: events.POPULATE,
			
			resizeTextHeight: events.RESIZEHEIGHT,
			
			updateEETargetEvent: events.UPDATEEETARGET,
			
			newsItemDeleteEvent: events.NEWSITEMDELETE,
			
			itemSelectedEvent:  events.ITEMSELECTED,
			
			dynamicUpdateFailure: events.DYNAMICFAIL,
			
			updateFiltersEvent: events.UPDATEFILTERS,
			
			showPagingTopBorderEvent: events.SHOWTOPBORDER,
			
			removePagingTopBorderEvent: events.REMOVETOPBORDER,
			
			templateString: template,
			
			postCreate: function(){
				as_console_debug("ActivityStreamView postCreate");
				
				this.inherited(arguments);										
				var newsItemFactory = this.configManager.getNewsItemFactory();
				this.newsItemManager = this.configManager.getNewsItemManager(newsItemFactory);			
				
				this.loader = new Loader({
					loaderAttachNode: this.loadingNode
				});	
				
				this.pagingLoader = new Loader({
					loaderAttachNode: this.pagingLoaderNode
				});	
				
				// Create the embedded experience manager if needed
				var eeManagerClass = this.configManager.getEEManager();
				if ( eeManagerClass ) {
					dojo.require(eeManagerClass); // should be pulled in by module, but jsut in case
					this.eEManager = new (lang.getObject(eeManagerClass))();
				}
				
				// Build the controller
				this.controller = new Controller({
					configManager: this.configManager,
					view: this
				});
		
				// Make the pagingHandler
				this.pagingHandler = new PagingHandler({
					targetBottomScrollerNode: this.showMoreNode,
					view: this
				});
		
				this.own(topic.subscribe(this.populateInitEventName, lang.hitch(this, "setupNewsFeed")));
		
				this.own(topic.subscribe(this.populateEventName, lang.hitch(this, "populateNewsFeed")));
		
				this.own(topic.subscribe(this.populateFeedErrorEventName, lang.hitch(this, "newsFeedError")));
		
				this.own(topic.subscribe(this.configErrorEventName, lang.hitch(this, "asConfigError")));
		
				this.own(topic.subscribe(this.newsItemDeleteEvent, lang.hitch(this, "newsItemDeleted")));
		
				this.own(topic.subscribe(this.dynamicUpdateFailure, lang.hitch(this, "updateNewsItemDynamicUpdateError")));
		
				this.own(topic.subscribe(this.updateFiltersEvent, lang.hitch(this, "updateFilters")));
		
				this.subscribe(this.showPagingTopBorderEvent, function(){
					this.showPagingTopOverride = true;
				});
		
				this.own(topic.subscribe(this.removePagingTopBorderEvent, lang.hitch(this, "hidePagingTopBorder")));
		
				this.own(topic.subscribe(events.STATEUPDATED, lang.hitch(this, "showDesc")));
		
				//Sticky header
				if(!activityStreamAbstractHelper.isGadget) {
				    this.own(on(window, "scroll", lang.hitch(this, "setSticky")));
				    this.own(on(window, "resize", lang.hitch(this, "setSticky")));
				    this.own(on(window, "resize", lang.hitch(this, "setHeaderWidth")));
				}
		
				this.own(topic.subscribe(newsMicrobloggingShareboxEvents.SHAREBOX_EXPANDING, lang.hitch(this, "setHeaderExpanded")));
			    this.own(topic.subscribe(newsMicrobloggingShareboxEvents.SHAREBOX_COLLAPSING, lang.hitch(this, "setHeaderCollapsed")));
				
			},
			
			getWinOffset: function(){
				return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
			},
			
			hasHeaderMenu: function(){
				return array.some(this.controller.configHandler.getSelectedObjects(), function(obj){
					return lang.getObject("filters.type", false, obj) == "links";
				});
			},
			
			setSticky: function(){
				if (!this.topOffset){
					this.topOffset = domGeometry.position(this.streamHeaderWrapper, true).y - 10;
				}
				if (this.hasHeaderMenu() && this.getWinOffset() > this.topOffset && document.body.offsetWidth > 990) {
			        domClass.add(this.streamHeaderWrapper, "isSticky");
			        domAttr.set(this.streamHeaderWrapper, "aria-hidden", "true");
			    } else {
			    	domClass.remove(this.streamHeaderWrapper, "isSticky");	
			    	setTimeout(lang.hitch(this, function(){
			    		domAttr.set(this.streamHeaderWrapper, "aria-hidden", "false");				
					}), 0);
			    }
				
				this.setHeaderWidth();
				
				//Make room for fixed header
		        this.setLabelTop();
			},
			setLabelTop: function(){
			    if (domClass.contains(this.streamHeaderWrapper, "isSticky")) {
			        domStyle.set(this.pagingTop, "margin-top", (domGeometry.position(this.streamHeaderWrapper).h - 6) + "px");
			    } else {
			        domStyle.set(this.pagingTop, "margin-top", "0px");
			    }
			},
			setHeaderWidth: function(){
			    if (domClass.contains(this.streamHeaderWrapper, "isSticky")) {
			        domStyle.set(this.streamHeaderWrapper, "width", (domGeometry.position("lotusContent").w) + "px");
			    } else {
			        domStyle.set(this.streamHeaderWrapper, "width", "auto");
			    }
			},
			setHeaderExpanded: function(){
				domClass.add(this.streamHeaderWrapper, "isExpanded");
			},
			setHeaderCollapsed: function(){
				domClass.remove(this.streamHeaderWrapper, "isExpanded");
			},
				
			postMixInProperties: function() {
				this.inherited(arguments);
				this.strings = i18nactivitystream;
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
				array.some(registry.findWidgets(this.newsFeedNode), function(widget){
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
				array.some(registry.findWidgets(this.newsFeedNode), function(widget){
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
					domConstruct.place(this.configErrorNewsItem.domNode,  fragment[0].firstChild, "first");
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
					array.forEach(registry.findWidgets(this.newsFeedNode), function(dij){
						// loop through items received, stop & remove if we hit a match.
						array.some(newsItems, 
							function(item, ind){
								if(lang.getObject("newsData.connections.rollupid", false, dij) === item.connections.rollupid) {
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
					domConstruct.place(this.configErrorNewsItem.domNode,  fragment[0].firstChild, "first");
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
					setTimeout(lang.hitch(this, function(){
						dojoWindow.scrollIntoView(this.asPermLinkAnchorRef);
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
				var singleItemFeed = !lang.isArray(response.entry);
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
				scanner.scan(this.domNode, !isGadget);
						
				topic.publish(this.resizeTextHeight, "all");
				
				topic.publish(events.FEEDRENDERED);
				//We scroll to top due to sticky nav, need to reset the view
				//only return to top when adding new feed, if paging, stay in place
				if(destroyNewsFeed && (this.isStickyHeader() || scrollTop)){
					window.scrollTo(0, 0);	
				}
			},
			
			isStickyHeader: function(){
				return domClass.contains(this.streamHeaderWrapper, "isSticky");
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
					array.some(registry.findWidgets(this.newsFeedNode), function(widget){
						
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
				domConstruct.place(widgetDom, placeNode, position);
				
				// Restore the auto height (may have been changed in destoryNewsFeed)		
				domStyle.set(this.newsFeedNode, {minHeight: "0"});
				
				// If incomingNewsItem is defined, the EE is open for the news item being replaced
				if(incomingNewsItem){
					incomingNewsItem.isEEOpen = true;
					// Update the target of the EE
					topic.publish(this.updateEETargetEvent, incomingNewsItem);
					//EE open so updated item should be selected
					topic.publish(this.itemSelectedEvent, incomingNewsItem);
				}
			},
			
			handleDynamicWidgetReplace:function(widget, widgetDom){
				var incomingNewsItem;
				// If the widget being replaced is open in the EE
				if(widget.isEEOpen){
					// Set the incoming news item to be the first child of dom
					incomingNewsItem = (widgetDom.firstChild) ? registry.byId(widgetDom.firstChild.id) : undefined;
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
				}, domConstruct.create("div", {}));
				var position = (onTop) ? "first" : "last";
				this.removeLoaders();
		
				// Display the error message at the top or bottom of the stream
				domConstruct.place(this.errorNewsItem.domNode,  this.newsFeedNode, position);
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
				}, domConstruct.create("div", {}));
		
				if(placeError)
					domConstruct.place(this.configErrorNewsItem.domNode,  this.newsFeedNode, "first");
			},
			
			/**
			 * Either creates or updates the filter container
			 */
			updateFilters: function(){
				as_console_debug("ActivityStreamView updateFilters");
				//hide sharkfin if not sub header exists
				if(!this.hasHeaderMenu()){
					domClass.add(this.headerFinsNode, "lotusHidden");
					domClass.add(this.pagingNode, "noSubFilterView");
					domAttr.set(this.pagingNode, "role", "presentation");
					//revert header to old oneUI style
					domClass.remove(this.streamHeaderWrapper, "streamHeaderWrapper");
				}
				// If the filter container has not been created
				if(!this.filterContainer){
					// Create the filter container
					this.filterContainer = new FilterContainer({
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
				if(!this.newsFeedNode.hasChildNodes() && domClass.contains(this.pagingHandler.showMoreNode, "lotusHidden")){
					this.newsItemManager.noContentItem = this.newsItemManager.createNewsItem("NoContent");
					this.placeWidgets(this.newsItemManager.noContentItem.domNode);
				}
			},
			
			/**
			 * Hide the paging's top border.
			 */
			hidePagingTopBorder: function(){
				domClass.add(this.pagingTop, "asNoTopPaging");
			},
			
			/**
			 * Show the paging's top border.
			 */
			showPagingTopBorder: function() {
				domClass.remove(this.pagingTop, "asNoTopPaging");
			},
			
			
			/**
			 * Destroys the current news feed (i.e. its widgets).
			 * TODO: May move this to a util class so as to keep
			 * everything clean.
			 */
			destroyNewsFeed: function(){
				// Persist with the same height to prevent the page from jumping
				var asHeight = domGeometry.marginBox(this.newsFeedNode).h;
				domStyle.set(this.newsFeedNode, {minHeight: asHeight + "px"});
				// Publish that we are about to tear down the Stream so resources
				// can release news item references
				topic.publish(events.FEEDDESTROYED);
				// Destroy the current feed that's there
				array.forEach(registry.findWidgets(this.newsFeedNode), function(widget){
					widget.destroyRecursive();
				});
				
				domConstruct.empty(this.newsFeedNode);
			},
			
			/**
			 * Destroy this widget and all of its descendants
			 */
			destroyRecursive: function(){
				// Destroy all children dijits
				array.forEach(registry.findWidgets(this.domNode), function(widget){
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
		
		return ActivityStreamView;
	});
