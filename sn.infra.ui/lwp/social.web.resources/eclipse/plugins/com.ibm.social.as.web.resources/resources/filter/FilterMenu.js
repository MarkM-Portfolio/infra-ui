/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.filter.FilterMenu");

dojo.require("com.ibm.social.as.constants.events");
dojo.provide("com.ibm.social.as.filter.Filter");

dojo.declare("com.ibm.social.as.filter.FilterMenu", 
[com.ibm.social.as.filter.Filter],
{
	/** Instance variables */ 
	templatePath: dojo.moduleUrl("com.ibm.social.as", "filter/templates/filterMenu.html"),
	
	/**
	 * Updates the menu options in the UI.
	 */
	postCreate: function(){
		this.inherited(arguments);
		if(dojo.isIE != 8){
			  dojo.addClass(this.filterHolderNode, "maxWidth");
		}
		
			
		dojo.create("label",{
			"for": this.filterHolderNode.id,
			innerHTML: "_",
			className: "lotusHidden"
		},this.filterMenuNode, "first");
		this.subscribe(com.ibm.social.as.constants.events.FILTERMENUHIDE, "hideFilterMenuFromTab");
		
	},
	
	hideFilterMenuFromTab: function(flag){
		if(flag == "true"){
			dojo.attr(this.filterHolderNode, "tabindex", "-1");
		} else {
			dojo.removeAttr(this.filterHolderNode, "tabindex");
		}
		
	},
	
	/** Called when a menu item has been clicked */
	menuItemClicked : function(){
		var selectNode = this.filterHolderNode;
		var targetNode = selectNode.options[selectNode.selectedIndex];
		var targetValue = targetNode.value;
		
		// If we had a hidden filter option, remove it
		for(var i = 0; i < selectNode.options.length; i++){
			if(this.isHidden(selectNode.options[i].value)){
				delete this.filterOptions[selectNode.options[i].value];
				selectNode.remove(i);
				break;
			}
		}
		
		this.filterClicked(targetValue);
	},
	
	/**
	 * Create a single menu item node
	 * @param menuItemValue {String} The text that will be displayed in the menu item
	 * @param menuItemLabel {String} name
	 * @param selected {Boolean} true if selected, false otherwise.
	 * @returns {DOMNode} <option>
	 */
	createFilterItemNode: function(menuItemValue, menuItemLabel, selected){
		// Don't use the menu item role or the items won't be read out by Jaws.
		var option = dojo.create("option", {
			value: menuItemValue,
			innerHTML: menuItemLabel
		});
		
		// if displaying a hidden filter, then we have no label text
		// Display a "Select a filter" string (which will be removed when
		// user selects a filter)
		if(this.isHidden(menuItemValue)){
			option.innerHTML = this.getLocalizedString("selectFilter");
			option.disabled = true;
		}
		
		if(selected){
			option.selected = true;
		}
		
		return option;
	}	
});
