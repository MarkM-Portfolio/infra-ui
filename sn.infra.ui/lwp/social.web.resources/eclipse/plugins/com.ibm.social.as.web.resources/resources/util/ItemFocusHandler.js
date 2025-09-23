/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.           */


dojo.provide("com.ibm.social.as.util.ItemFocusHandler");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.incontext.util.html");

/**
 * @author Jim Antill
 * 
 * Class used to maintain which news item on the Activity Stream has focus.
 * Also keeps track of the currently selected item.
 */

dojo.declare("com.ibm.social.as.util.ItemFocusHandler", null,
{
	currentItem: null,
	currentSelectedItem: null,
	
	gotFocusHandle: null,
	lostFocusHandle: null,
	selectHandle: null,
	deselectHandle: null,
	feedDestroyHandle: null,
	
	constructor: function() {
		// Subscribe to event published when a news item gets focus.
		this.gotFocusHandle = dojo.subscribe(com.ibm.social.as.constants.events.ITEMGOTFOCUS,
								dojo.hitch(this, function(item,e,focus) { this._changeItemFocus(item, e, focus);}));
		
		// Subscribe to event published when a news item loses focus.
		this.lostFocusHandle = dojo.subscribe(com.ibm.social.as.constants.events.ITEMLOSTFOCUS,
								dojo.hitch(this, function(item, e) { this._itemLostFocus(item, e);}));
		
		// Subscribe to event published when a news item loses focus.
		this.selectHandle = dojo.subscribe(com.ibm.social.as.constants.events.ITEMSELECTED,
								dojo.hitch(this, function(item, e) { this._itemSelected(item, e);}));
		
		// Subscribe to event published when a news item loses focus.
		this.deselectHandle = dojo.subscribe(com.ibm.social.as.constants.events.ITEMDESELECTED,
								dojo.hitch(this, function(item, e) { this._itemDeselected(item, e);}));
		
		// Listen out for when the feed is destroyed and remove references to news items
		this.feedDestroyHandle = dojo.subscribe(com.ibm.social.as.constants.events.FEEDDESTROYED,
				dojo.hitch(this, function() {
					this.currentItem = null;
					this.currentSelectedItem = null;
				}));
	},

	
	/**
	 * Fired by moving focus from one news item to another. The current item is
	 * disabled and the new item made the current one.
	 * 
	 * @param item {NewsItem}   - The News Item widget that has taken focus.
	 * @param force {Boolean}   - If set to true then the node is highlighted regardless of whether it is
	 * 							  already the current item.
	 * @param toFocus {DomNode} - Element to put focus back on (optional)
	 */
	_changeItemFocus: function(item,force, toFocus) {
		// Check we are not still on the same item. This happens when a link in the item is clicked
		// such as the add comment link.
		if (!this.currentItem || item != this.currentItem || force) {
			this._disableCurrentNewsItem();
			this._setCurrentItem(item);
			
			// If we need to put focus back on a particular element then do this after a small delay.
			if (toFocus && toFocus.focus) {
				setTimeout(function() {toFocus.focus();},300);
			} 
		}
	},
	
	/**
	 * Handle a call to select an item, which will involve deselecting
	 * the existing item and selecting the specified item.
	 * 
	 * @param item {NewsItem}   - The News Item that is selected.
	 */
	_itemSelected: function(item, e) {
		if (!this.currentSelectedItem || item != this.currentSelectedItem) {

            var dirty = dojo.getObject("currentSelectedItem.commentInput.dirty", false, this);

            var confirmCloseCallback = dojo.hitch(this, function(confirmClose){
                if(confirmClose){
                    this._deselectNewsItem(this.currentSelectedItem, true);
                    this._selectCurrentItem(item);
                }
            });

            // check if it's dirty (= user has entered some comment text)
            if(dirty){
                com.ibm.social.incontext.util.html.promptContentChangedDialog(confirmCloseCallback);
            } else {
                confirmCloseCallback(true);
            }
		}
	},
	
	/**
	 * Style the item as selected and store a reference to it
	 *
	 * @param item {widget} - News item widget to be made current.
	 */
	_selectCurrentItem: function(item) {
		if (item.newsItemNode) {
			dojo.addClass(item.newsItemNode, "lotusPostSelected");
			this.currentSelectedItem = item;
		}
	},
	
	/**
	 * Item has been deselected
	 * 
	 * @param item {NewsItem}   - The News Item that is unselected.
	 */
	_itemDeselected: function(item, e) {
		if (item) {
			this._deselectNewsItem(item, false);
		}
	},
	
	/**
	 * Deselected item, update styles accordingly.
	 * If the passed in item does not equal the current stored one
	 * then just update the style, otherwise deselect the current one
	 * and nullify the reference to it.
	 */
	_deselectNewsItem: function(item, selectInProgress) {
		//in this case deselect our cached and the one passed in
		//during dynamic update we may have two references the old cached widget
		//and the new one.
		if(item && item.newsItemNode && item !== this.currentSelectedItem) {
			dojo.removeClass(item.newsItemNode, "lotusPostSelected");	
			if(selectInProgress){
				dojo.removeClass(this.currentSelectedItem.newsItemNode, "lotusPostSelected");				
			}
		}
		//otherwise update the cached selected item and nullify it.
		else {
			if(this.currentSelectedItem && this.currentSelectedItem.newsItemNode){
				dojo.removeClass(this.currentSelectedItem.newsItemNode, "lotusPostSelected");

				//make a call to reset the comment input after deselection
				if(this.currentSelectedItem.inlineComments){
					this.currentSelectedItem.inlineComments.resetCommentInput();	
				}				
				this.currentSelectedItem = null;				
			}
			else{// item may have been deleted from the stream, nullify
				this.currentSelectedItem = null;
			}
		}
	},
	
	/**
	 * Called when a newsitem loses focus. If the event isn't supplied or is caused
	 * by the mouse moving out of a news item then we do nothing. Otherwise, we need to
	 * look at the element in focus and see if that's within a news item.
	 *
	 * @param item {object} - News item container that has lost focus.
	 * @param e	{event}  - The event that triggered the function.
	 */
	_itemLostFocus: function(item, e) {
		if (typeof e=="undefined") {
			/* Need to use a timeout because the new active element probably
			   hasn't taken focus yet. */
			setTimeout(dojo.hitch(this, "_unsetActiveNewsItem"),20);
		} else {
			/* If the mouse has moved to a non-activity stream part of
			 * page, and focus isn't within the current news item, then we need to
			 * remove focus from the current item.
			 */
			if (e.relatedTarget && !this._getParentNewsItem(e.relatedTarget)) {
				if (!this._getParentNewsItem(document.activeElement)) {
					this._disableCurrentNewsItem(this.currentItem);
				}
			}	
		}
	},
	
	/**
	 * Disables the current news item when a field outside a news item container is entered.
	 */
	_unsetActiveNewsItem: function() {
		// Get the parent news item of the element - if any.
		var parentNewsItem = this._getParentNewsItem(document.activeElement);
		
		// If the element isn't contained within a news item then take the
		// highlighting off the current item. The on focus of a newly focused
		// item will handle bringing that into focus.
		if (parentNewsItem==null) {
			this._disableCurrentNewsItem();
		}
	},
	
	/**
	 * Disables the news item set as the current item.
	 */
	_disableCurrentNewsItem: function() {
		// Check to see the current item isn't null and it's still being displayed.
		if (this.currentItem && this.currentItem.newsItemNode) {
			dojo.removeClass(this.currentItem.newsItemNode, "lotusPostHover");
		}
		
		this.currentItem = null;
	},
	
	/**
	 * Sets the supplied news item as being current.
	 * @param item {widget} - News item widget to be made current.
	 */
	_setCurrentItem: function(item) {
		if (item.newsItemNode) {
			dojo.addClass(item.newsItemNode, "lotusPostHover");
			this.currentItem = item;
		}
	},
	

	/**
	 * Gets the containing news item of the node passed in. The search has a maximum depth after
	 * which it is abandoned.
	 * 
	 * @param node {DOMNode} - Node to see if it's contained in a news item.
	 * @return node {DOMNode} - The node of the container or null 
	 */
	_getParentNewsItem: function(node) {
		var maxDepth = 10;
		
	    while (node) {
	    	// Stop looking if we have found the parent news item.
	    	if (dojo.hasClass(node, "activityStreamNewsItemContainer")) {
	    		break;
	    	}
	    	
	    	// If we have reached the maxdepth then set node to null so we don't look
	    	// any further. Otherwise set so the parentNode is inspected next.
	    	node = (maxDepth-- > 0) ? node.parentNode : null;
	    }
	    
	    return node;
	},
	
	/**
	 * Destroy method that tidies up the ItemFocusHandler, unsubscribing
	 * from events.
	 */
	destroy: function() {
		dojo.unsubscribe(this.gotFocusHandle);
		dojo.unsubscribe(this.lostFocusHandle);
		dojo.unsubscribe(this.selectHandle);
		dojo.unsubscribe(this.deselectHandle);
		dojo.unsubscribe(this.feedDestroyHandle);
	}
});
