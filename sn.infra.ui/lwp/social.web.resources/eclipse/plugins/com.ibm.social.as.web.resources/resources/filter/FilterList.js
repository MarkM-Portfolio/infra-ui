/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.filter.FilterList");

dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.filter.Filter");
dojo.require("com.ibm.social.as.filter.FilterListAriaHelper");
dojo.require("com.ibm.social.as.filter.IFilterMenuOption");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

/**
 * Filter list that will show filters as a list, rather than a menu.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.filter.FilterList", 
[com.ibm.social.as.filter.Filter, com.ibm.social.as.filter.IFilterMenuOption],
{	
	
	ariaNode: null,
	
	// Event to indicate end of populating the news feed
	populateEventName: com.ibm.social.as.constants.events.POPULATE,
	
	
	postCreate: function(){
		this.inherited(arguments);
		
		// Add the 'lotusFirst' class to the first li (removes left border)
		dojo.query("> li:first-child", this.filterHolderNode).addClass("lotusFirst");
		
		this.ariaNode = dojo.create("span",{
			id : "ariaFilter",
			className : "lotusHidden",
			innerHTML : "Filter Holder for navigation buttons"
			}, this.filterHolderNode, "after");
		
		dojo.attr(this.filterHolderNode, "aria-labelledby", this.ariaNode.id);
		
		
		// If the selectedNode hasn't been created
		if(!this.getSelectedNode()){
			// Get the first li's anchor node
			var listItemLinks = dojo.query("> li:first-child a", this.filterHolderNode);
			if(listItemLinks && listItemLinks.length > 0){
				var firstListItemLink = listItemLinks[0];
				// We need to select a node and add appropriate class
				this.setSelectedNode(firstListItemLink);
				dojo.addClass(firstListItemLink, "filterSelected");
			}
		}
		new com.ibm.social.as.filter.FilterListAriaHelper(this.filterHolderNode);
	},
	
	/**
	 * Called when a filter list item is clicked.
	 * @param e {Event}
	 */
	listItemClicked: function(e){
		
		// Get the target and add the filterSelected class
		var targetNode = e.target;
		
		// Return if this node is not a filter option
		if(!(targetNode.id in this.filterOptions)){
			return;
		}
		
		// Call into the parent indicating filter clicked
		this.filterClicked(targetNode.id);
		
		// Return if this node is already selected
		if(targetNode.id === this.getSelectedNode().id){
			return;
		}
		
		dojo.addClass(targetNode, "filterSelected");

		// If a selectedNode exists, remove filterSelected class
		if(this.getSelectedNode()){
			dojo.removeClass(this.getSelectedNode(), "filterSelected");
		}
		
		this.updateSharkFin(dojo.byId(targetNode.id));
		
		// Update selectedNode
		this.setSelectedNode(targetNode);
	},						
	

	focusMainFilter: function(){
		this.getSelectedNode().focus();
	}
});
