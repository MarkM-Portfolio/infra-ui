/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	dojo.provide("com.ibm.oneui.controls.PreviewDialog");
	dojo.require("com.ibm.oneui.controls.HoverDialog");
	
	dojo.requireLocalization("com.ibm.oneui.controls", "PreviewDialog");
	
	/**
	 * @class com.ibm.oneui.controls.PreviewDialog
	 * @author Clayton Coleman <claycole@us.ibm.com>
	 */
	dojo.declare("com.ibm.oneui.controls.PreviewDialog", com.ibm.oneui.controls.HoverDialog, /** @lends com.ibm.oneui.controls.PreviewDialog.prototype */ {
		/**
		 * If true, expand to fill as much of the page as possible. 
		 * 
		 * @experimental API interface may change
		 * @notyetimplemented
		 */
		fullHeight: false,
		
		/**
		 * Preview dialogs support the concept of an iterator - an interface that returns
		 * information about whether there are more items available.  An iterator should 
		 * support the methods described in the public interface of ItemIterator.  Iterators
		 * may have deferred behavior for when information must be returned from a server.
		 * 
		 * The iterator MUST return an object with a member "around" that contains the
		 * DOMElement corresponding to this item on the page, which is used for positioning. 
		 */
		iterator: null,
		
		/**
		 * Implement this method to render the contents of the preview dialog to match
		 * the currently selected item.
		 * 
		 * 		function(item, PreviewDialog instance, DOMElement for contents) {
		 * 			// item is optional, and is the object returned by the iterator
		 * 			//		interface
		 * 		}
		 */
		updateDialogContents: null,

		// Internal only
		_clickAround: "_targetClickAround",
		
		createContents: function(widget) {
			var presentation = this._presentation; 
			if (!presentation) {
				presentation = this._presentation = this.initPresentation();
				dojo.place(presentation.domNode, widget.domNode);
			}
			return presentation.domNode;
		},
		
		/**
		 * Subclassers may override this method to provide a more complex preview
		 * dialog presentation.  The base implementation depends on the "parent"
		 * attribute, but the updateContents override is only provided for ease of
		 * extension.
		 */
		initPresentation: function() {
			return new com.ibm.oneui.controls.PreviewDialogPresentation({
				parent: this,
				updateContents: this.updateDialogContents
			});
		},
		
		onOpen: function() {
			this.inherited(arguments);
			var iterator = this.iterator;
			if (iterator)
				this._update(true, iterator.find(this._target), iterator.hasNext(), iterator.hasPrevious());
		},
		
		next: function() {
			var iterator = this.iterator;
			if (!iterator.hasNext() || this._updating)
				return;
			this._update(false, iterator.next(), iterator.hasNext(), true, true);
		},
		previous: function() {
			var iterator = this.iterator;
			if (!iterator.hasPrevious() || this._updating)
				return;
			this._update(false, iterator.previous(), true, iterator.hasPrevious(), false);
		},
		
		_update: function(onOpen, item, hasNext, hasPrevious, forward) {
			if (this._updating)
				return;

			this._updating = true;
			var presentation = this._presentation;
			
			if (item instanceof dojo.Deferred) {
				presentation.loading(true);
				item.addBoth(this, function(item) {
					this._updating = false;
					this._update(onOpen, item, hasNext, hasPrevious, forward);
				});
				return;
			}
				
			var around = item.around;
			
			presentation.setPaging(hasNext, hasPrevious);
			presentation.updateContents(item, this, presentation.contentNode);
			
			if (!onOpen) {
				var hadFocus = this._hasF;
				this._hasF = false;
				this.close();
			}
			if (!onOpen) {
				this.open(around);
				if (hadFocus) {
					var target;
					if (forward)
						target = hasNext ? presentation.nextNode : presentation.prevNode;
					else if (!forward)
						target = hasPrevious ? presentation.prevNode : presentation.nextNode;
					if (!target) {
						this._getFocusItems(this._getDomNode());
						target = this._firstFocusItem;
					}
						
					dijit.focus(target);
					this._hasF = true;
				}
			}
			
			this._updating = false;
		}
	});
	
	/**
	 * @class com.ibm.oneui.controls.PreviewDialogPresentation
	 * @author Clayton Coleman <claycole@us.ibm.com>
	 */
	dojo.declare("com.ibm.oneui.controls.PreviewDialogPresentation", [dijit._Widget, dijit._Templated], /** @lends com.ibm.oneui.controls.PreviewDialogPresentation.prototype */ {
		templatePath: dojo.moduleUrl("com.ibm.oneui", "controls/templates/PreviewDialog.html"),
		messages: dojo.i18n.getLocalization("com.ibm.oneui.controls", "PreviewDialog"),
		title: "\u00a0",
		
		next: function(e) {
			dojo.stopEvent(e);
			this.parent.next();
		},
		
		previous: function(e) {
			dojo.stopEvent(e);
			this.parent.previous();
		},
		
		/**
		 * Indicate whether paging up and down is available
		 */
		setPaging: function(hasNext, hasPrevious) {
			this.nextNode.style.display = hasNext ? "" : "none";
			this.prevNode.style.display = hasPrevious ? "" : "none";
		},
		
		/**
		 * Default implementation that updates the title node as a string.
		 * Subclasses should handle null, deferrable, or empty items.  Must
		 * support strings as the first argument (for an explicit text title).
		 */
		setTitle: function(title) {
			this.titleNode.firstChild.data = title || " ";
		},
		
		loading: function(setTitle) {
			if (setTitle)
				this.setTitle("Loading...");
			this.contentNode.innerHTML = "<div class='lotusLoading' style='min-height: 60px; background-position: center center;'></div>";
		}
	});
	
})();
