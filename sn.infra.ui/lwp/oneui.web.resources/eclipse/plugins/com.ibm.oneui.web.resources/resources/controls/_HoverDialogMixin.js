/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	/**
	 * A mixin class to HoverPopup that provides behavior for underlays, focus capture
	 * and management, and click to close behaviors.
	 * @mixin com.ibm.oneui.controls._HoverDialogMixin
	 * @extends dijit._DialogMixin
	 * @author Clayton Coleman <claycole@us.ibm.com>
	 */
	dojo.provide("com.ibm.oneui.controls._HoverDialogMixin");
	dojo.require("dijit.DialogUnderlay");
	dojo.require("dijit._DialogMixin");

	dojo.require("dojo.i18n");
	dojo.requireLocalization("com.ibm.oneui.controls", "HoverPopup");

	var messages = dojo.i18n.getLocalization("com.ibm.oneui.controls", "HoverPopup");
	
	dojo.declare("com.ibm.oneui.controls._HoverDialogMixin", dijit._DialogMixin, /** @lends com.ibm.oneui.controls._HoverDialogMixin.prototype */ {
		
		/** Set to true to include an underlay for this item */
		underlay: false,
		
		/**
		 * This boolean tracks whether the popup should manage focus, subclasses may
		 * set or remove thisto guarantee that focus is appropriately
		 * changed.  If false, the onClose event will not move the focus back to
		 * the opener node.
		 */
		_hasF: false,
		
		/** Creates managed connects */
		createManagedConnects: function() {
			this.managedConnect(dojo.body(), "onkeypress", this, "_onKeyPress");
			this.managedConnect(dojo.body(), "onclick", this, "_onBodyClick");
			//this.managedConnect(dojo, "stopEvent", this, "_onStopEvent");
			
			var underlay = this.underlay;
			if (underlay === true) {
				var useFixed = true;
				underlay = this.underlay = new dijit.DialogUnderlay({dialogId: this.id, "class": useFixed ? "lotusPopupUnderlayFixed" : ""});
				if (useFixed)
					underlay.layout = function(){};
				else {
					this.managedConnect(window, "onscroll", underlay, "layout");
					this.managedConnect(window, "onresize", underlay, "layout");
				}
				underlay.domNode.title = messages.closeHint;
			}
		},
		
		openWithFocus: function(target) {
			this._takeF = true;
			this.open(target);
			this._takeF = false;
		},
	
		_onKeyPress: function(/*Event*/ evt){
			// summary:
			//		Handler for keyboard events
			// description:
			//		Keep keyboard focus in dialog; close dialog on escape key
			// tags:
			//		private
	
			var node = evt.target;
			var dk = dojo.keys;
			if(evt.charOrCode === dk.TAB){
				this._getFocusItems(this._getDomNode());
			}
			var singleFocusItem = (this._firstFocusItem == this._lastFocusItem);
			if(evt.charOrCode == dk.ESCAPE){
				if (evt._cancelled) return;
				evt._cancelled = true;
				var dialog = com.ibm.oneui.controls.internal._getPopupForNode(node) || this;
				// Use setTimeout to avoid crash on IE, see #10396.
				setTimeout(dojo.hitch(dialog, "close"), 0);
				dojo.stopEvent(evt);
			}else if(node == this._firstFocusItem && evt.shiftKey && evt.charOrCode === dk.TAB){
				if(!singleFocusItem){
					dijit.focus(this._lastFocusItem); // send focus to last item in dialog
				}
				dojo.stopEvent(evt);
			}else if(node == this._lastFocusItem && evt.charOrCode === dk.TAB && !evt.shiftKey){
				if(!singleFocusItem){
					dijit.focus(this._firstFocusItem); // send focus to first item in dialog
				}
				dojo.stopEvent(evt);
			}else if(evt.charOrCode === dk.TAB){
				// we want the browser's default tab handling to move focus
				// but we don't want the tab to propagate upwards
				evt.stopPropagation();
			}
		},
				
		_onBodyClick: function(e) {
			var target = e && e.target;
			if (target && !dojo.isDescendant(target, this._getDomNode()) && (!this._target || !dojo.isDescendant(target, this._target))) {
				this._hasF = false;
				this.close();
			}
		},
		
		_onStopEvent: function(e) {
			if (e.type == "click")
				this._onBodyClick(e);
		},
		
		onVisible: function() {
			if (this._takeF) {
				this._hasF = true;
				this._getFocusItems(this._getDomNode());
				dijit.focus(this._firstFocusItem);
			}
		},
		
		onOpen: function() {
			if (this.underlay)
				this.underlay.show();
		},
		
		onClose: function() {
			if (this.underlay)
				this.underlay.hide();
			if (this._hasF)
				dijit.focus(this._target);
			this._hasF = false;
		},
		
		_targetClickAround: function(e) {
			dojo.stopEvent(e);
			this.openWithFocus(this._determineTarget(e.target));
		},
		
		_getDomNode: function() {
			return this._getMasterPopup().domNode;		
		}
	});
})();
