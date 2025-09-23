define([
	"dojo/_base/declare"
], function (declare) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	(function() {
			function getItemAtPosition() {
			var item = this._items[this._position];
			return this.transform(item);
		}
		
		/**
		 * @class ic-ui.ItemIterator
		 * @author Clayton Coleman <claycole@us.ibm.com>
		 */
		var ItemIterator = declare("com.ibm.oneui.ItemIterator", null, /** @lends ic-ui.ItemIterator.prototype */ {
			/**
			 * If true then a "Next" at the end of the list will return to the initial item.
			 */
			circular: true,
			
			_position: 0,
			
			/**
			 * This constructor takes a list of items and returns them as 
			 * next or previous are called.
			 */
			constructor: function(items) {
				this._items = items;
			},
			hasNext: function() {
				return this._items.length > 1 && (this.circular || this._position != this._items.length-1);
			},
			hasPrevious: function() {
				return this._items.length > 1 && (this.circular || this._position != 0);
			},
			next: function() {
				var next = this._position = (this._position+1) % this._items.length;
				if (next == 0)
					return this.nextPage();
				return getItemAtPosition.call(this);
			},
			nextPage: getItemAtPosition,
			previous: function() {
				var previous = this._position = (this._items.length+this._position-1) % this._items.length;
				if (previous == this._items.length)
					return this.previousPage();
				return getItemAtPosition.call(this);
			},
			previousPage: getItemAtPosition,
			item: getItemAtPosition,
			find: function(around) {
				for (var i=0,l=this._items.length; i<l; i++) {
					if (this.isAround(this._items[i], around)) {
						this._position = i;
						return getItemAtPosition.call(this);
					}
				}
				throw "Item around not found";
			},
			
			/**
			 * Default implementation expects item.around to be a string (document element id) or
			 * actual HTML element, and for around to be an actual HTML element.
			 */
			isAround: function(item, around) {
				return item.around === around.id || item.around === around;
			},
			
			/**
			 * Subclasses may perform a transformation of an internal object before it is returned
			 * from the iterator.
			 */
			transform: function(item) {
				return item;
			}
		});
	})();
	return ItemIterator;
});
