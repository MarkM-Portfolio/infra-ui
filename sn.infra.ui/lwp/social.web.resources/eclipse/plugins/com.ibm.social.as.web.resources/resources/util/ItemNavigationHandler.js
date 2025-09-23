/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.           */


dojo.provide("com.ibm.social.as.util.ItemNavigationHandler");

dojo.require("com.ibm.social.as.listener.Subscriber");
dojo.require("com.ibm.social.as.constants.events");

/**
 * @author Jim Antill
 * 
 * Class used to handle navigation amongst the news items in the stream.
 * Uses the Subscriber to handle the event subscriptions. Inherits the destroy
 * function which will unsubscribe any events.
 */

dojo.declare("com.ibm.social.as.util.ItemNavigationHandler", 
[com.ibm.social.as.listener.Subscriber],
{
	// Constants used for the up and down arrow presses.
	KEYUP: 38,
	KEYDOWN: 40,
	
	changeItemHandle: null,
	
	constructor: function() {
		/* Subscribe to the KEYBOARDNAVIGATION event that will be used to trigger the navigation
			handling code. */
		this.subscribe(com.ibm.social.as.constants.events.KEYBOARDNAVIGATION,
						dojo.hitch(this, function(node, keycode) { this._moveFocus(node, keycode);}));
	},
	
	/**
	 * Moves the focus to the next item based on the item passed in and the keycode.
	 * @param {DOMNode} - Dom Node of item that is being moved from
	 * @param {keyCode} - Code of the key that has been pressed.
	 */
	_moveFocus: function(node, keycode) {
		var moveToDomNode = null;
		
		// Get the next Domnode that we want to move to as a sibling of the current Domnode.
		switch(keycode) {
			case this.KEYUP:
				moveToDomNode = node.previousSibling;
				break;
			case this.KEYDOWN:
				moveToDomNode = node.nextSibling;
				break;
			default:
				moveToDomNode = null;
		}

		if (moveToDomNode) {
			/* We need to set focus on the container within the chosen news item. */
			var toFocus = dojo.query(".activityStreamNewsItemContainer", moveToDomNode);

			if (toFocus.length > 0) {
				toFocus[0].focus();
			}
		}
	}
});
