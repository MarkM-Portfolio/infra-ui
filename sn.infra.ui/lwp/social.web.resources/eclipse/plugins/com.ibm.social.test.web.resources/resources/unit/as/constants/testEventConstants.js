/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * DOH test to ensure the constants events declarations are correct
 * in each of the components. Important to ensure that the constants
 * for the events in each class are correct. Test mainly used when
 * changing events to constants to ensure all references to events
 * match.
 */

dojo.provide("com.ibm.social.test.unit.as.constants.testEventConstants");
	        	
dojo.require("lconn.homepage.as.extension.TagManagerExtension");
dojo.require("lconn.homepage.as.sidenav.SideNavigation");
dojo.require("lconn.homepage.as.tagmanager.TagFilterDijit");
dojo.require("lconn.homepage.as.tagmanager.TagManager");
dojo.require("com.ibm.social.test.unit.as.testfeeds.StandardConnectionsFeed");
dojo.require("com.ibm.social.as.config.ConfigManager");
dojo.require("com.ibm.social.as.ActivityStream");
dojo.require("com.ibm.social.as.ActivityStreamModel");
dojo.require("com.ibm.social.as.config.ConfigManager");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.controller.Controller");
dojo.require("com.ibm.social.as.ee.EEManager");
dojo.require("com.ibm.social.as.filter.FilterContainer");
dojo.require("com.ibm.social.as.filter.FilterMenu");
dojo.require("com.ibm.social.as.listener.EventListener");
dojo.require("com.ibm.social.as.listener.ExternalEventListener");
dojo.require("com.ibm.social.as.paging.PagingHandler");
dojo.require("com.ibm.social.as.state.StateHelper");
dojo.require("com.ibm.social.as.view.ActivityStreamView");
dojo.require("com.ibm.social.as.view.PlaceholderView");
dojo.require("lconn.homepage.as.badge.ActionRequiredBadge");
dojo.require("lconn.homepage.as.message.MessageContainer");
dojo.require("lconn.homepage.as.state.StateHandler");
dojo.require("lconn.homepage.core.constants.DojoEvents");
dojo.require("lconn.homepage.ui.constants.UIEvents");
dojo.require("com.ibm.social.test.unit.as.config.homepage.config");

// There is one test function for each class having it's events changed to constants.
doh.registerGroup("unit.as.constants.testEventConstants", [
                                                                      
	function test_ActionRequiredBadge() {
		var actionRequired = new lconn.homepage.as.badge.ActionRequiredBadge();
		
		doh.is(actionRequired.updateBadgeEventName =, this.group.eventConstants.ACTIONREQUIREDBADGEUPDATE);
		doh.is(actionRequired.decreaseBadgeEventName =, this.group.eventConstants.ACTIONREQUIREDBADGEDECREASE);
	},

	function test_ActivityStream() {
		var realOnLoad = com.ibm.social.as.ActivityStream.prototype.onLoad;
		
		dojo.extend(com.ibm.social.as.ActivityStream,
			{onLoad: function(){}});
		var activityStream = new com.ibm.social.as.ActivityStream(
								{isGadget: false,
								 configObject:{}
		});
		doh.is(activityStream.activityStreamLoadedEvent =, this.group.eventConstants.ACTIVITYSTREAMLOADED);
		doh.is(activityStream.updateStateEvent =, this.group.eventConstants.UPDATESTATE);

		dojo.extend(com.ibm.social.as.ActivityStream,
			{onLoad: realOnLoad});
	},

	function test_ActivityStreamView() {
		var activityStreamView = new com.ibm.social.as.view.ActivityStreamView({configManager: com.ibm.social.as.configManager});
		doh.is(activityStreamView.populateInitEventName =, this.group.eventConstants.INIT);
		doh.is(activityStreamView.populateFeedErrorEventName =, this.group.eventConstants.POPULATEERROR);
		doh.is(activityStreamView.populateEventName =, this.group.eventConstants.POPULATE);
	},

	function test_Controller() {
		var controller = new com.ibm.social.as.controller.Controller({configManager: com.ibm.social.as.configManager});
		doh.is(controller.populateFeedInitEventName =, this.group.eventConstants.INIT);
		doh.is(controller.populateFeedEventName =, this.group.eventConstants.POPULATE);
		doh.is(controller.stateUpdatedEvent =, this.group.eventConstants.STATEUPDATED);
		doh.is(controller.populateFeedErrorEventName =, this.group.eventConstants.POPULATEERROR);
	},
	
	function test_EEManager() {
		var eemanagerproto = com.ibm.social.as.ee.EEManager.prototype;
		doh.is(eemanagerproto.itemClickedEvent =, this.group.eventConstants.ITEMCLICKED);
	},

	function test_EventListener() {
		var eventListener = new com.ibm.social.as.listener.EventListener({controller: eventController});
		doh.is(eventListener.pageChangeEvent =, this.group.eventConstants.PAGECHANGE);
	},
	
	function test_ExternalEventListener() {
		var extEventController = {onUpdateState: function() {}};
		var externalEventListener = new com.ibm.social.as.listener.ExternalEventListener({controller: extEventController});
		doh.is(externalEventListener.updateStateEvent =, this.group.eventConstants.UPDATESTATE);					
	},
	
	function test_FilterContainer() {
		var realCreateFirstFilter = com.ibm.social.as.filter.FilterContainer.prototype.createFirstFilter;
		
		dojo.extend(com.ibm.social.as.filter.FilterContainer,
			{createFirstFilter: function(){}});
		var filterContainer = new com.ibm.social.as.filter.FilterContainer(
									{currentView: {filters: {label:""}}});
		doh.is(filterContainer.filterMenus.first.eventName =, this.group.eventConstants.UPDATESTATE);
		doh.is(filterContainer.filterMenus.second.eventName =, this.group.eventConstants.UPDATESTATE);
		
		dojo.extend(com.ibm.social.as.filter.FilterContainer,
			{createFirstFilter: realCreateFirstFilter});
	},
	
	function test_FilterMenu() {
		var realUpdateFilterOptions = com.ibm.social.as.filter.FilterMenu.prototype.updateFilterOptions;
		
		dojo.extend(com.ibm.social.as.filter.FilterMenu, {updateFilterOptions: function(){}});
		var filterMenu = new com.ibm.social.as.filter.FilterMenu({filter:{label:""}});
		doh.is(filterMenu.onFilterChangeEventName =, this.group.eventConstants.UPDATESTATE);
		
		dojo.extend(com.ibm.social.as.filter.FilterMenu, {updateFilterOptions: realUpdateFilterOptions});
	},

	function test_MessageContainer() {
		var container = new lconn.homepage.as.message.MessageContainer();
		doh.is(container.createMessageEventName =, this.group.eventConstants.CREATEMESSAGE);
		doh.is(container.clearMessageEventName =, this.group.eventConstants.CLEARMESSAGE);
		doh.is(container.stateUpdatedEvent =, this.group.eventConstants.STATEUPDATED);
	},
	
	function test_NewsItem() {
		var standardFeed = new com.ibm.social.test.unit.as.testfeeds.StandardConnectionsFeed();
		var newsData = dojo.safeMixin(standardFeed.content.entry[0], 
								new com.ibm.social.as.item.data.NewsDataAccessor());
			
		var newsItem = new com.ibm.social.as.item.NewsItem({
				newsData: newsData
		}, dojo.byId("newsItemDiv"));
		
		doh.is(newsItem.itemClickedEvent , com.ibm.social.as.constants.events.ITEMCLICKED);
	},
						
	
	function test_PagingHandler() {
		var pagingHandler = new com.ibm.social.as.paging.PagingHandler();
		doh.is(pagingHandler.pagingEventName =, this.group.eventConstants.PAGECHANGE);
	},
	
	
	function test_PlaceHolderView() {
		var placeHolderView = new com.ibm.social.as.view.PlaceholderView({configManager: com.ibm.social.as.configManager});
		for(var eventName in placeHolderView.placeholderEvents) {
			doh.t(eventName === this.group.eventConstants.PLACEHOLDERADD ||
						   eventName === this.group.eventConstants.PLACEHOLDERREMOVE);
		}
	},
	
	function test_SideNavigation() {
		var nav = new lconn.homepage.as.sidenav.SideNavigation();
		doh.is(nav.updateStateEvent =, this.group.eventConstants.UPDATESTATE);
		doh.is(nav.stateUpdatedEvent =, this.group.eventConstants.STATEUPDATED);
	},

	function test_StateHandler() {
		var handler = new lconn.homepage.as.state.StateHandler();
		doh.is(handler.updateStateEvent =, this.group.eventConstants.UPDATESTATE);
		doh.is(handler.stateUpdatedEvent =, this.group.eventConstants.STATEUPDATED);
		doh.is(handler.activityStreamLoadedEvent =, this.group.eventConstants.ACTIVITYSTREAMLOADED);
	},
	
	function test_TagFilterDijit() {
		var realCreateTagFilterMenu = lconn.homepage.as.tagmanager.TagFilterDijit.prototype.createTagFilterMenu;
		dojo.extend(lconn.homepage.as.tagmanager.TagFilterDijit, 
			{createTagFilterMenu: function(){}});
		
		var tagFilter = new lconn.homepage.as.tagmanager.TagFilterDijit();
		doh.is(tagFilter.updateFilterEventName =, this.group.eventConstants.UPDATETAGFILTER);
		doh.is(tagFilter.fliterChangeEventName =, this.group.eventConstants.UPDATESTATE);
		
		dojo.extend(lconn.homepage.as.tagmanager.TagFilterDijit,
			{createTagFilterMenu : realCreateTagFilterMenu});;
	},
	
	function test_TagManagerExtension() {
		var realGetTagSubscriptions = lconn.homepage.as.tagmanager.TagManager.prototype.getTagSubscriptions;
		var realSetupAddTagsTypeAhead = lconn.homepage.as.tagmanager.TagManager.prototype._setupAddTagsTypeAhead;
		var realSetupRemoveTagCombo = lconn.homepage.as.tagmanager.TagManager.prototype._setupRemoveTagCombo;

		dojo.extend(lconn.homepage.as.tagmanager.TagManager,
			{getTagSubscriptions: function(){}});
		dojo.extend(lconn.homepage.as.tagmanager.TagManager,
			{_setupAddTagsTypeAhead: function(){}});
		dojo.extend(lconn.homepage.as.tagmanager.TagManager, 
			{_setupRemoveTagCombo: function(){}});
		
		var ext = new lconn.homepage.as.extension.TagManagerExtension();
		doh.is(ext.placeholderAddEventName =, this.group.eventConstants.PLACEHOLDERADD);
		doh.is(ext.placeholderRemoveEventName =, this.group.eventConstants.PLACEHOLDERREMOVE);
		doh.is(ext.tagsFollowingEventName =, this.group.eventConstants.TAGSFOLLOWING);
		
		dojo.extend(lconn.homepage.as.tagmanager.TagManager,
			{getTagSubscriptions: realGetTagSubscriptions});
		dojo.extend(lconn.homepage.as.tagmanager.TagManager,
			{_setupAddTagsTypeAhead: realSetupAddTagsTypeAhead});
		dojo.extend(lconn.homepage.as.tagmanager.TagManager,
			{_setupRemoveTagCombo: realSetupRemoveTagCombo});
	}],
	function setUp(){
		this.eventConstants = window.eventConstants = com.ibm.social.as.constants.events;
		com.ibm.social.as.configManager = new com.ibm.social.as.config.ConfigManager({configObject: window.activityStreamConfig});
	
		//Define a mock for the abtractHelper if it isn't defined.
		if (!(window.abstractHelper)) window.abstractHelper={ register: function(){}};
		
		//Mock for the eventController that provides stubs for required functions.
		window.eventController = { onFilterChange: function() {},
							onSecondFilterChange: function() {},
							onPageChange: function() {}
							};
	}
);
