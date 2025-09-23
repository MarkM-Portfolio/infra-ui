/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.        */

	define([
		"dojo/_base/declare",
		"dojo/dom-class",
		"ic-core/aria/Toolbar"
	], function (declare, domClass, Toolbar) {
	
		/**
		 * Custom Aria handler which will preserve the currently pressed item in the side navigation.
		 * This subclasses the Toolbar class, but provides it's own implementation of the _isSelected
		 * function so the currently selected item in the menu isn't forgotten.
		 * @author scrawford, Jim Antill
		 */
		var FilterListAriaHelper = declare("com.ibm.social.as.filter.FilterListAriaHelper", Toolbar, {
		   /* WAI role of the container node to which the helper will be attached. Will throw exception if source node doesn't have this role */
		   containerRole: "toolbar",
		   /* WAI role of active items that are descendants of the helper's source node */
		   itemRole: "button",
			   
		   /**
		    * Override the _isSelected function to correctly determine the currently pressed item.
		    * The item is determined as pressed if it has an aria-pressed attribute set to true.
		    * @param item - The menu item being looked at.
		    * @return boolean - True if the item is determined as being pressed, otherwise false.
		    */
		   _isSelected: function(item) {
			   return domClass.contains(item, "filterSelected");
		   }
		});
		return FilterListAriaHelper;
	});
