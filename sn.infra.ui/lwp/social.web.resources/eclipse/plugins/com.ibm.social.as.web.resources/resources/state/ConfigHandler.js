/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.state.ConfigHandler");

dojo.require("com.ibm.social.as.util.ConfigObjectUtil");

/**
 * Handler that updates the configuration object's selected state.
 */

dojo.declare("com.ibm.social.as.state.ConfigHandler", null,
{
	// Configuration object for the activity stream
	configObject: null,
	
	// Utility class for working with the config object
	configObjectUtil: null,
	
	constructor: function(){
		// Setup the config object
		this.configObject = com.ibm.social.as.configManager.getConfigObject();
		this.configObjectUtil = com.ibm.social.as.util.ConfigObjectUtil;
	},
	
	/**
	 * Update the config object's view and filters based on state.
	 * @param stateArr {Array} represents the state we wish to move to.
	 */
	updateConfigState: function(stateArr){
		if(stateArr.length == 0) {
			return; // empty arr means just refresh
		}
		
		stateArr = dojo.clone(stateArr); // don't damage someone else's array
		
		var baseObj = this.configObject;
		
		// loop from base (views) downward until we cannot select any further
		while(baseObj.filters) {
			baseObj = this.getSelectedOrFirstObj(baseObj.filters, stateArr);
		}
	},
	
	/**
	 * return an array of selected objects
	 */
	getSelectedObjects: function(){
		var selectedArray = [],
			baseObj = this.configObject;
		// loop from base (views) downward until we cannot select any further
		while(baseObj.filters) {
			baseObj = this.configObjectUtil.getSelectedOrDefaultOptionObj(baseObj.filters);
			selectedArray.push(baseObj);
		}
		return selectedArray;
	},

	
	/**
	 * return an array of selected object keys
	 */
	getSelectedKeys: function(){
		var selectedArray = [],
			baseObj = this.configObject, selectedItem;
		// loop from base (views) downward until we cannot select any further
		while(baseObj.filters) {
			selectedItem = this.configObjectUtil.getSelectedOrDefaultOptionKey(baseObj.filters);
			selectedArray.push(selectedItem); // get Selected *might* select the first item for us
			baseObj = baseObj.filters.options[selectedItem];
		}
		return selectedArray;
	},
	
	/**
	 * if the selectedArr's first element is available, select that, remove it from the array and return it
	 * otherwise, select the first option, and return that
	 * (if there is a previous selection - ignore, use the selectedArr or the first element)
	 * @param options {Object} options from which to select
	 * @param selectedArr {Array} keys to select
	 */
	getSelectedOrFirstObj: function(filters, selectedArr){
		var selectedOpt;
		//fixup where an object is passed and not an array
		if(!dojo.isArray(selectedArr)){
			selectedArr = [selectedArr];
		}
		if(filters.options[selectedArr[0]]) {
			selectedOpt = selectedArr.shift(); // remove first elem from array
		} else {
			selectedOpt = this.configObjectUtil.getDefaultOption(filters);
		}
		return this.setSelected(selectedOpt, filters);
	},
	
	/**
	 * Sets the 'selected' property to true on a view or filter.
	 * TODO: May move to util
	 * @param options - Options from which the selected item will be found.
	 * @param selectId - ID for the selected item.
	 * @returns (Object) - item that was selected
	 */
	setSelected: function(selectId, filters){
		filters.selectedItem = selectId;
		
		return filters.options[selectId];
	},
	
	/**
	 * Convenience method for getting the currently selected
	 * View filter. That is lowest level filter that contains
	 * a rollup param (analogous to old View concept).
	 * @returns (Object) - item that was selected
	 */
	getSelectedViewFilter: function(){
		return this.iterateUpFilterHierarchyForParam("rollup");
	},
	
	/**
	 * Convenience method for getting the currently selected
	 * View filter. That is lowest level filter that contains
	 * a count param (analogous to old View concept).
	 * @returns (Object) - item that was selected
	 */
	getSelectedViewFilterWithCount: function(){
		return this.iterateUpFilterHierarchyForParam("count");
	},
	
	iterateUpFilterHierarchyForParam: function(param){
		var filters = this.getSelectedObjects();
		for (var i = filters.length - 1; i >= 0; i--) {
		    if(filters[i].params && filters[i].params[param]){
		    	return filters[i];
		    }		    
		}
	},
	
	/**
	 * Return the highest item in filter hierarchy with a description set
	 */
	getSelectedViewFilterDescription: function(){
		var filters = this.getSelectedObjects();
		for (var i = filters.length - 1; i >= 0; i--) {
		    if(filters[i].params && filters[i].description){
		    	return filters[i];
		    }		    
		}
	}
});
