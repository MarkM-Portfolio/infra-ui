/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/dom",
		"dojo/_base/declare",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/query",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-as/filter/Filter",
		"ic-as/filter/FilterListAriaHelper",
		"ic-as/filter/IFilterMenuOption"
	], function (dojo, dom, declare, domAttr, domClass, domConstruct, query, _Templated, _Widget, events, Filter, FilterListAriaHelper, IFilterMenuOption) {
	
		/**
		 * Filter list that will show filters as a list, rather than a menu.
		 * 
		 * @author Robert Campion
		 */
		
		var FilterList = declare("com.ibm.social.as.filter.FilterList", 
		[Filter, IFilterMenuOption],
		{	
			
			ariaNode: null,
			
			// Event to indicate end of populating the news feed
			populateEventName: events.POPULATE,
			
			
			postCreate: function(){
				this.inherited(arguments);
				
				// Add the 'lotusFirst' class to the first li (removes left border)
				query("> li:first-child", this.filterHolderNode).addClass("lotusFirst");
				
				this.ariaNode = domConstruct.create("span",{
					id : "ariaFilter",
					className : "lotusHidden",
					innerHTML : "Filter Holder for navigation buttons"
					}, this.filterHolderNode, "after");
				
				domAttr.set(this.filterHolderNode, "aria-labelledby", this.ariaNode.id);
				
				
				// If the selectedNode hasn't been created
				if(!this.getSelectedNode()){
					// Get the first li's anchor node
					var listItemLinks = query("> li:first-child a", this.filterHolderNode);
					if(listItemLinks && listItemLinks.length > 0){
						var firstListItemLink = listItemLinks[0];
						// We need to select a node and add appropriate class
						this.setSelectedNode(firstListItemLink);
						domClass.add(firstListItemLink, "filterSelected");
						domAttr.set(firstListItemLink, "aria-pressed", "true");
					}
				}
				new FilterListAriaHelper(this.filterHolderNode);
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
				
				domClass.add(targetNode, "filterSelected");
				domAttr.set(targetNode, "aria-pressed", "true");
				
				// If a selectedNode exists, remove filterSelected class
				if(this.getSelectedNode()){
					domClass.remove(this.getSelectedNode(), "filterSelected");
					domAttr.set(this.getSelectedNode(), "aria-pressed", "false");
				}
				
				this.updateSharkFin(dom.byId(targetNode.id));
				
				// Update selectedNode
				this.setSelectedNode(targetNode);
			},						
			
		
			focusMainFilter: function(){
				this.getSelectedNode().focus();
			}
		});
		
		return FilterList;
	});
