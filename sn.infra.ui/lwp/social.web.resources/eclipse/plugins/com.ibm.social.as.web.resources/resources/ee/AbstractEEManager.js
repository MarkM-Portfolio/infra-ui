/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.ee.AbstractEEManager");

dojo.require("com.ibm.social.as.ee.EEIterator");
dojo.require("com.ibm.social.as.constants.events");

dojo.require("com.ibm.social.as.listener.Subscriber");

/**
 * Embedded experience manager that looks after the creation
 * and control of the EE popup and artifacts.
 * @author Robert Campion
 */

dojo.declare(
"com.ibm.social.as.ee.AbstractEEManager", 
[com.ibm.social.as.listener.Subscriber],
{
	iterator: null,
	
	preview: null,
	
	// the news item displayed
	newsItem: null,
	
	// temporary holding the news item
	tempNewsItem: null,
	
	// Event that triggered the last opener.
	eeOpenByKeyboardEvent: null,
	
	itemClickedEvent: com.ibm.social.as.constants.events.ITEMCLICKED,
	
	// event trigerred when view or filter changes
	updateStateEvent: com.ibm.social.as.constants.events.UPDATESTATE,
	
	// event trigerred when click comment link
	startComment: com.ibm.social.as.constants.events.STARTCOMMENT,
	
	likePopUp: com.ibm.social.as.constants.events.LIKEPOPUPOPEN,
	
	updateEETargetEvent: com.ibm.social.as.constants.events.UPDATEEETARGET,
	
	feedDestroyEvent: com.ibm.social.as.constants.events.FEEDDESTROYED,
	
	feedDestroyHandle: null,
	
	constructor: function(options){
		// Mix the options in with this class
		if(options){
			dojo.mixin(this, options);
		}
		
		// Setup the EE Iterator
		this.iterator = new com.ibm.social.as.ee.EEIterator();

		// Subscribe to events
		this.setupSubscribes();
	},
	
	/**
	 * Subscribe to events. Called from constructor.
	 */
	setupSubscribes: function(){
		// Subscribe to news item click event
		this.subscribe(this.itemClickedEvent, dojo.hitch(this, "onItemPreview"));
		
		// Subscribe to the state change event (view/filter changes)
		this.subscribe(this.updateStateEvent, dojo.hitch(this, "onUpdateState"));
		
		this.setupFeedDestroySubscribes();
		
		// Update the EE's target
		this.subscribe(this.updateEETargetEvent, dojo.hitch(this, "updateEETarget"));		
	},
	setupFeedDestroySubscribes: function() {
		this.subscribe(this.feedDestroyEvent, dojo.hitch(this, function(item, e) {
			this.tempNewsItem = null;
			this.newsItem = null;
			if(this.preview)
			   this.preview.destroy();
		}));
	},
	
	setupEEPreviewSubscribes: function() {
		if(this.preview) {
			// Subscribe to the startComment event - close EE
			this.subscribe(this.startComment, dojo.hitch(this.preview.dialog, "close"));
			
			// Subscribe to the likePopUp event - close EE
			this.subscribe(this.likePopUp, dojo.hitch(this.preview.dialog, "close"));
			
			// New general event to close EE
			this.subscribe(com.ibm.social.as.constants.events.CLOSEEE, dojo.hitch(this.preview.dialog, "close"));
			
			this.openEEHandler = dojo.connect(this.preview.dialog, "onOpen", this, "onOpenEE");
			this.closeEEHandler = dojo.connect(this.preview.dialog, "onClose", this, "onCloseEE");
		}
	},
	
	onOpenEE: function() {
		this.newsItem = this.tempNewsItem;
		this.newsItem.isEEOpen = true;
	},
	
	onCloseEE: function() {
		this.newsItem.isEEOpen = false;
		// keep highlight if the close is triggered by commenting on the news item
		if(this.newsItem.newsItemNode && com.ibm.social.as.comment.commentInputManager &&
				com.ibm.social.as.comment.commentInputManager.commentingNewsItem != this.newsItem.newsData.id) {
			dojo.removeClass(this.newsItem.newsItemNode, "lotusPostHover");
			
			//deselect the item when closing the EE - skip when commenting in process
			dojo.publish(com.ibm.social.as.constants.events.ITEMDESELECTED, [this.newsItem]);				
		}			
		
		/* If the EE was opened by the keyboard we want to put focus back on the element before
		   the EE opened and also make sure the correct item is highlighted in the AS. */
		if (this.eeOpenByKeyboardEvent && this.newsItem.newsItemNode) {
			dojo.addClass(this.newsItem.newsItemNode, "lotusPostHover");
			this.eeOpenByKeyboardEvent.focusElement.focus();
			dojo.publish(com.ibm.social.as.constants.events.ITEMGOTFOCUS,[this.eeOpenByKeyboardEvent.item, true]);
		}
		
		// Tidy up the event that opened the EE.
		this.eeOpenByKeyboardEvent = null;
	},
	
	/**
	 * Called when the state changes. E.g. if a filter or view changes
	 * We need to close the EE
	 */
	onUpdateState: function() {
		if ( this.preview && this.preview.dialog ) {
			this.preview.dialog.close();
		}
	},
	
	/**
	 * Called when a user selects a news item.
	 * @param item
	 * @e event that initiated the preview
	 */
	onItemPreview: function(item,e){
		
		// Build an object that contains enough information to put focus back when ee is closed.
		this.eeOpenByKeyboardEvent = null;

		if (e) {
			var keyPressed = e.keyCode || e.which;
			
			if (keyPressed) {
				this.eeOpenByKeyboardEvent = { 
					item: item, 
					focusElement: e.target,
					keyCode: keyPressed
				};
			}	
		}
		
		// prevent EE popup if there is commenting ongoing
		if (com.ibm.social.as.configManager.checkDirtyFlag() && 
				com.ibm.social.as.comment.commentInputManager.isCommenting && 
					com.ibm.social.as.DirtyChecker.isDirty()) {
			return;
		}
		
		// temporary holding the news item until the EE is open
		// we can't this.newsItem = item because the onItemPreivew is called before onOpenEE, 
		// in this case, it will close the new item if we clicked
		this.tempNewsItem = item;
		
		if(!item.isEEOpen){
			// Open the preview dialog, passing this item's domNode
			this.openPreviewDialog(item.domNode);
		}else if(this.preview){
			// Close the preview dialog (EE)
			this.preview.dialog.close();
		}
	},
	openPreviewDialog: function(domNode) {
		// Open the preview dialog, passing this item's domNode
		if(this.preview)
			this.preview.dialog.open(domNode);		
	},
	
	/**
	 * Updates the target node the EE ties to. This is needed when an item the user is
	 * viewing in the EE is updated dynamically, and its dom node updates in the stream.
	 * @param item {NewsItem}
	 */
	updateEETarget: function(item){
		// Update the target the EE uses.
		if(this.preview)
		   this.preview.dialog.updateTarget(item.domNode);
		
		// Update the object that holds details of the last focused item.
		if (this.eeOpenByKeyboardEvent) {
			this.eeOpenByKeyboardEvent.item = item;
			this.eeOpenByKeyboardEvent.focusElement = item.newsItemNode;
			this.newsItem.isEEOpen = true;
		}
		this.newsItem = item;
	},
	
	/**
	 * Destroy resources.
	 */
	destroy: function(){
		if(this.preview)
		   this.preview.dialog.destroyRecursive();
		this.iterator.destroy();
		dojo.disconnect(this.openEEHandler);
		dojo.disconnect(this.closeEEHandler);
	}
});
