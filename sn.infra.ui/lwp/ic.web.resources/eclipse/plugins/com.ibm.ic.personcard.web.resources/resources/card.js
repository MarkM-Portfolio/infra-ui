/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"dojo/has",
	"net/jazz/ajax/xdloader"
], function (lang, has, xdloader) {

	(function() {
		/**
		 * Provides basic functions for using the card prior to the full set of Javascript being loaded.
		 * Works in concert with the tabs.js module.
		 */
				var body = document.body, html = document.documentElement;
		var parent = window.parent;
		var canSendMessages = false;
		try {canSendMessages = parent && parent.postMessage;} catch (e) {alert("unable to set up messaging: "+e);}
		
		/**
		 * Calculate the height of the document contents.
		 */
		window.documentHeight = function() {
			var height = (has("ie")) 
			? Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight)
			: (has("chrome") 
				? Math.max(html.scrollHeight, html.offsetHeight, body.offsetHeight)
				: Math.max(body.scrollHeight, html.offsetHeight, body.offsetHeight)
				)
			return height;
		}
		
		var timer;
		var callbacks = [];
		var lastHeight = 0;
		/**
		 * Indicate that the content of this page was changed and the size may 
		 * differ.  When this page is running in a window (and on supported 
		 * browsers), the parent window will receive a message indicating the 
		 * content has changed height.  
		 * 
		 * @param callback (optional) A function to invoke when the resize is either
		 * 	complete.  Guaranteed to be invoked.
		 */
		window.contentChanged = function(callback) {
			if (canSendMessages) {
				var height = documentHeight();
				if (height > lastHeight) {
					lastHeight = height;
					contentChanging();
					parent.postMessage("oslc-preview-height:"+height, "*", window);
					clearTimeout(timer);
					timer = setTimeout(window.onresize, 200);
					if (typeof callback == "function") callbacks.push(callback);
					return;
				}
			}
			if (callback) callback();
		}
		
		/**
		 * Make be invoked by a consumer to indicate that the page will shortly be
		 * resized.  Will hide the scrollbar until a resize happens.  Generally,
		 * invoke before modifying the DOM in a way that will change the page size.
		 */
		window.contentChanging = function() {
			html.style.overflowY = "hidden";
		}
		
		/**
		 * When the window is resized, revert the overflow protection and invoke
		 * any callbacks.  May also be invoked by a timer if the page does not
		 * resize in time.
		 */
		window.onresize = function() {
			html.style.overflowY = "";		
			while (callbacks.length)
				(callbacks.shift())();
		}
		
		var PREFIX_MESSAGE_CLOSEABLE = "vulcan-card-can-close:";
		/**
		 * Indicate to the parent that this content should not be easily closed
		 * (usually when editing a form).
		 */
		window.setWindowCloseable = function(value) {
			if (canSendMessages)
				parent.postMessage(PREFIX_MESSAGE_CLOSEABLE+(!!value), "*", window);
		}
		
		window.showTab = function(arg, e) {
			var el = (arg.nodeType ? arg.id : arg);
			xdloader.batch_load_async(window.modules, lang.partial(dojo.publish, "/card/section/change", [el]));
		}
		
		window.addAwareness = function(el) {
			//TODO: onload, set awareness for a node
		}
	})();
	return com.ibm.social.personcard.card;
});
