/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.social.as.filter.IFilterMenuOption");
dojo.require("com.ibm.social.as.filter.SharkFinHandler");

dojo.declare("com.ibm.social.as.filter.IFilterMenuOption", null,
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "filter/templates/filterList.html"),
	
	sharkFinNode: null,
	
	updateSharkFin: function(node){	
		com.ibm.social.as.filter.SharkFinHandler.getInstance().updateSharkFin(node);	
	},
	
	setSelectedNode: function(node){
		com.ibm.social.as.filter.SharkFinHandler.getInstance().setSelectedNode(node);	
	},
	
	getSelectedNode: function(){
		return com.ibm.social.as.filter.SharkFinHandler.getInstance().getSelectedNode();	
	},
	
	/**
	 * Create a filter item node for this filter list.
	 * @param menuItemValue {String} id/value
	 * @param menuItemLabel {String} name
	 * @param selected {Boolean} true if selected, false otherwise.
	 * @param menuTitle {String} (Optional) description/title for the list element
	 * @param ariaLabel {String} (Optional) a11y description
	 * @returns {DOMNode} li
	 */
	createFilterItemNode: function(menuItemValue, menuItemLabel, selected, menuTitle, ariaLabel){
		// Create list item. Don't give the role menuitem as this stops Jaws reading out the value.
		var li = dojo.create("li");
		
		// Create internal li link
		var a = dojo.create("a", {
			href: "javascript:;",
			id: menuItemValue,
			innerHTML: menuItemLabel,
			role: "button",
			"data-navbutton": "true",
			title: menuTitle || "",
			"aria-label": ariaLabel || menuTitle || ""
		}, li);
		
		// If this item is selected, add class and update selected node
		if(selected){
			dojo.addClass(a, "filterSelected");
			this.setSelectedNode(a);
			// need to wait for end of feed load or else init fin placement is off.
			// need to revisit this to see if we can get an earlier point to update the fin
			this.subscribe(this.populateEventName, dojo.hitch(this, "updateSharkFin", a));
		}
		
		return li;
	}
	
});
