/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.ee.EEManagerGadget");

dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.listener.Subscriber");

/**
 * Embedded experience manager that looks after the creation
 * and control of the EE popup and artifacts for AS Gadgets
 * @author Brian O'Gorman
 */

dojo.declare(
"com.ibm.social.as.ee.EEManagerGadget", 
[com.ibm.social.as.listener.Subscriber],
{
	// the news item displayed
	newsItem: null,
	
	// temporary holding the news item
	tempNewsItem: null,
	
	itemClickedEvent: com.ibm.social.as.constants.events.ITEMCLICKED,
	
	// event trigerred when view or filter changes
	updateStateEvent: com.ibm.social.as.constants.events.UPDATESTATE,
	
	// event trigerred when click comment link
	startComment: com.ibm.social.as.constants.events.STARTCOMMENT,
	
	updateEETargetEvent: com.ibm.social.as.constants.events.UPDATEEETARGET,
	
	// container gadget site for currently open EE. Used for closing EE
	eeGadgetSite: null,
	
	constructor: function(options){
		// Mix the options in with this class
		if(options){
			dojo.mixin(this, options);
		}
		
		// If container does not support the open-views feature
		// we have no support for opening EEs. Dont bother
		// subscribing to the events.
		if ( gadgets.util.hasFeature("open-views" ) ) {
			// Subscribe to events
			this.setupSubscribes();
		}
	},
	
	/**
	 * Subscribe to events. Called from constructor.
	 */
	setupSubscribes: function(){
		// Subscribe to news item click event
		this.subscribe(this.itemClickedEvent, dojo.hitch(this, "onItemPreview"));
		
		// Subscribe to the state change event (view/filter changes)
		this.subscribe(this.updateStateEvent, dojo.hitch(this, "onUpdateState"));
		
		// Subscribe to the startComment event - close EE
		//this.subscribe(this.startComment, dojo.hitch(this, "closeCurrentEE"));
		
		// Update the EE's target
		this.subscribe(this.updateEETargetEvent, dojo.hitch(this, "updateEETarget"));
	},
	
	onOpenEE: function(site, data) {
		as_console_debug("EEManagerGadget - onOpenEE - ", arguments);
		this.eeGadgetSite = site;
	},
	
	onCloseEE: function(newsItem, result) {
		this.newsItem.isEEOpen = false;
		// keep highlight if the close is triggered by commenting on the news item
		if(newsItem.newsItemNode && com.ibm.social.as.comment.commentInputManager &&
				com.ibm.social.as.comment.commentInputManager.commentingNewsItem != newsItem.newsData.id) {
			dojo.removeClass(newsItem.newsItemNode, "lotusPostHover");
			
			//deselect the item when closing the EE - skip when commenting in process
			dojo.publish(com.ibm.social.as.constants.events.ITEMDESELECTED, [newsItem]);				
		}
		as_console_debug("EEManagerGadget - onCloseEE - ", arguments);
	},
	
	/**
	 * Called when the state changes. E.g. if a filter or view changes
	 * We need to close the EE
	 */
	onUpdateState: function() {
		this.closeCurrentEE();
	},
	
	/**
	 * Called when a user selects a news item.
	 * @param item
	 */
	onItemPreview: function(item){
		this.closeCurrentEE();
		this.newsItem = item;
		this.newsItem.isEEOpen = true;
		
		// prevent EE popup if there is commenting ongoing
		if (com.ibm.social.as.configManager.checkDirtyFlag() && 
				com.ibm.social.as.comment.commentInputManager.isCommenting && 
					com.ibm.social.as.DirtyChecker.isDirty()) {
			return;
		}
		
		var newsData = item && item.newsData;
		var embedObj = (newsData && newsData.getEmbedObject());
		var params = {};
		params.viewTarget = "slideout";
		as_console_debug("EEManagerGadget - onItemPreview - EE viewtarget is: " + params.viewTarget);
		
		as_console_debug("EEManagerGadget - onItemPreview - embedObj: " + embedObj);
		gadgets.views.openEmbeddedExperience(
			dojo.hitch(this, "onCloseEE", this.newsItem),
			dojo.hitch(this, "onOpenEE"),
			embedObj,
			params
		);
	},
	
	closeCurrentEE: function() {
		if ( this.eeGadgetSite ) {
			as_console_debug("EEManagerGadget - closing EE - ", this.eeGadgetSite);
			gadgets.views.close(this.eeGadgetSite);
			as_console_debug("EEManagerGadget - closed EE - ", this.eeGadgetSite);
			this.eeGadgetSite = null;
		}
		
	},
	
	/**
	 * Updates the target node the EE ties to. This is needed when an item the user is
	 * viewing in the EE is updated dynamically, and its dom node updates in the stream.
	 * @param item {NewsItem}
	 */
	updateEETarget: function(item){
		this.newsItem = item;
	},
	
	/**
	 * Destroy resources.
	 */
	destroy: function(){
		this.closeCurrentEE();
		this.inherited(arguments);
	}
});
