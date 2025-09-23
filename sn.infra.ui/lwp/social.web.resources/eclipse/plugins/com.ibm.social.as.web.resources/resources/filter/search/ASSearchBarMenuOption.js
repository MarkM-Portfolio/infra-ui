/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.filter.search.ASSearchBarMenuOption");
dojo.require("com.ibm.social.as.filter.IFilterMenuOption");
dojo.require("com.ibm.social.as.search.ActivityStreamSearchBar");
dojo.require("com.ibm.social.as.util.Localizer");

dojo.declare("com.ibm.social.as.filter.search.ASSearchBarMenuOption",
[dijit._Widget, dijit._Templated, com.ibm.social.as.filter.IFilterMenuOption, com.ibm.social.as.util.Localizer],
{
	
	asSearchBar: null,
	asSearchBarEnable: false,
	searchOption: null,
	searchMenuOptionId: "asSearchMenuOption",
	
	postCreate: function(){
		this.inherited(arguments);
		dojo.addClass(this.domNode, "lotusHidden");
		
		var searchIcon;
		if (com.ibm.social.incontext.util.html.isHighContrast()){
			searchIcon = dojo.create("div", { innerHTML: this.getLocalizedString("asSearchBarOpen") });
		}else {		
			searchIcon = dojo.create("img", { 
				src: this._blankGif, 
				alt: "",
				className: "otherActivityStream14 otherActivityStream14-asSearchMag14 icStream-searchIcon", 
				role: "presentation"
			});
		}
		
		searchOption = this.createFilterItemNode(this.searchMenuOptionId, searchIcon.outerHTML+"&nbsp;", false, this.getLocalizedString("asSearchBarOpen"));
		dojo.place(searchOption, this.filterHolderNode);
		// Add the 'lotusFirst' class to the first li (removes left border)
		dojo.query("> li:first-child", this.filterHolderNode).addClass("lotusFirst");
		dojo.removeAttr(this.filterHolderNode, "role", "");
		this.subscribe(com.ibm.social.as.constants.events.FILTERMENUHIDE, "asSearchBarToggleListener");
		this.asSearchBar = new com.ibm.social.as.search.ActivityStreamSearchBar({}, this.searchBarNode);		
	},
	
	focusSharkFinOnSearch: function(e){
		
		// Get the target and add the filterSelected class
		var targetNode = e.target;
	
		// Return if this node is already selected
		if(targetNode.id === this.getSelectedNode().id){
			return;
		}
		
		dojo.addClass(targetNode, "filterSelected");
		dojo.attr(targetNode, "aria-pressed", "true");
		
		// If a selectedNode exists, remove filterSelected class
		if(this.getSelectedNode()){
			dojo.removeClass(this.getSelectedNode(), "filterSelected");
			dojo.attr(this.getSelectedNode(), "aria-pressed", "false");
		}
		
		this.updateSharkFin(dojo.byId(targetNode.id));
		
		// Update selectedNode
		this.setSelectedNode(targetNode);
	},	
	
	/**
	 * Called when a filter list item is clicked.
	 * @param e {Event}
	 */
	listItemClicked: function(e){
		var isOpen = this.asSearchBar.toggle();
	},
	
	/**
	 * if open then toggle the menu item title and vice versa
	 */
	asSearchBarToggleListener: function(flag){
		var searchMenuOption = dojo.query("#"+this.searchMenuOptionId, this.filterHolderNode);
		if(searchMenuOption.length > 0 && flag == "true"){
			dojo.attr(searchMenuOption[0], "title", this.getLocalizedString("asSearchBarCancel"));
		} else {
			dojo.attr(searchMenuOption[0], "title", this.getLocalizedString("asSearchBarOpen"));
		}
	}
	
});
