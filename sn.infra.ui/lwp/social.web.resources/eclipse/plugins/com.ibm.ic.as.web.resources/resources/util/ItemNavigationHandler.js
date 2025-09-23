/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.           */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/query",
		"ic-as/constants/events",
		"ic-as/listener/Subscriber",
		"dijit/focus"
	], function (declare, lang, query, events, Subscriber, focusUtil) {
	
		
		/**
		 * @author Jim Antill
		 * 
		 * Class used to handle navigation amongst the news items in the stream.
		 * Uses the Subscriber to handle the event subscriptions. Inherits the destroy
		 * function which will unsubscribe any events.
		 */
		
		var ItemNavigationHandler = declare("com.ibm.social.as.util.ItemNavigationHandler", 
		Subscriber,
		{
			// Constants used for the up and down arrow presses.
			KEYUP: 38,
			KEYDOWN: 40,
			landmark: ".activityStreamNewsItemContainer",
			subscriptionKey: events.KEYBOARDNAVIGATION,
			changeItemHandle: null,
			
			constructor: function() {
				/* Subscribe to the KEYBOARDNAVIGATION event that will be used to trigger the navigation
					handling code. */
					this.subscribe(this.subscriptionKey,
						lang.hitch(this, function(node, keycode) { this._moveFocus(node, keycode);}));
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
					if(moveToDomNode.focus){
						focusUtil.focus(moveToDomNode);
					}
					else {
						/* We need to set focus on the container within the chosen news item. */
						var toFocus = query(this.landmark, moveToDomNode);
						if(toFocus.length > 0){
							focusUtil.focus(toFocus[0]);
						}						
					}
				}
			}
		});
		return ItemNavigationHandler;
	});
