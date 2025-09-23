/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-class",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-as/util/ConfigObjectUtil",
		"ic-as/util/Localizer"
	], function (declare, lang, domClass, _Templated, _Widget, events, ConfigObjectUtil, Localizer) {
	
		var Filter = declare("com.ibm.social.as.filter.Filter",
		[_Widget, _Templated,
		 Localizer],
		{
			// Filter that this menu represents
			filter: null,
		
			container: null,
		
			stateArr: null,
		
			// Options that are available in the filter menu
			filterOptions: null,
		
			// Property representing the second filter menu dijit,
			// if there is one.
			subFilterMenu: null,
		
			// Id of the currently selected filter
			selectedFilterId: "",
		
			// Set whether or not the item is focused
			isFocused: false,
		
			// Utility object
			util: ConfigObjectUtil,
		
			// Name of the filter change event topic.
			// This will be used to 'publish' an update to the feed.
			onFilterChangeEventName: events.UPDATESTATE,
		
			/**
			 * Simply sets the filterOptions value.
			 */
			postMixInProperties: function(){
				this.filterOptions = this.filter.options;
			},
		
			/**
			 * Updates the menu options in the UI.
			 */
			postCreate: function(){
				this.updateFilterOptions();
			},
		
			/** Called when a menu item has been clicked */
			filterClicked : function(newFilterId){
				as_console_debug("Filter filterClicked newFilterId:", newFilterId);
				this.isFocused = true;
				// Publish that there has been a filter change triggered.
				// This will refresh the news feed.
				var stateArr = this.stateArr.concat([newFilterId]);
		
				if(this.filter.selectedItem == newFilterId) {
					stateArr = [];	// just do a normal refresh if the filter hasn't actually changed
									// this avoids applying default filters below this one
				}
		
				topic.publish(this.onFilterChangeEventName, stateArr, this._focused);
		
				// Update the selected menu option.
				var optionClicked = this.updateOptionSelected(newFilterId);
		
				// If there are further filter options available for this filter option,
				// it means there should be a secondary filter menu.
				if(optionClicked.filters){
					// No subFilterMenu so create it
					this.createSubFilter(optionClicked.filters);
				}else if(this.subFilterMenu){
					// There is a filter menu, but we don't need it so hide it
					this.subFilterMenu.hide();
				}
			},
		
			/**
			 * Update the filter menu with options
			 */
			updateFilterOptions: function(filterOptions){
				// Update the filterOptions if passed
				if(filterOptions){
					this.filterOptions = filterOptions;
				}
		
				var subFilterMenuCreated = false;
				var fragment = document.createDocumentFragment();
		
				// Iterate through filter options and create filters
				for(var v in this.filterOptions){
					var filterOption = this.filterOptions[v];
					fragment.appendChild(this.createFilterItemNode(v, filterOption.label, v==this.filter.selectedItem, filterOption.description));
				}
		
				// Get the selected option
				this.selectedFilterId = this.util.getSelectedOrDefaultOptionKey(this.filter);
				var filters = this.filterOptions[this.selectedFilterId].filters;
		
				// If this node is selected and it contains filters
				// we need to show them
				if(filters){
					// don't create immediately, we need the constructor to return and place the current filter domNode
					// before the sub filter's node is placed, to maintain order
					window.setTimeout(lang.hitch(this, "createSubFilter", filters), 0);
					subFilterMenuCreated = true;
				}
		
				// If there is no second filter menu needed for this view
				// but the actual filter menu has been created previously
				// hide it from view. An example of this occurring can be
				// seen when switching from "I'm following" to
				// "Action Required" in Homepage.
				if(!subFilterMenuCreated && this.subFilterMenu){
					this.subFilterMenu.hide();
				}
		
				this.filterHolderNode.appendChild(fragment);
				//Reset the focus if required when rebuilding filter menu
				if(this.isFocused){
					window.setTimeout(lang.hitch(this, "focusMainFilter", filters), 0);
				}
			},
		
			focusMainFilter: function() {
				if (typeof this.filterHolderNode != "undefined"){
						this.filterHolderNode.focus();
				}
			},
		
			createSubFilter: function(filters) {
				this.subFilterMenu = this.container.createSubFilterMenu(filters, this.stateArr.concat([this.selectedFilterId]));
			},
		
			/**
			 * Updates the filter's 'selected' boolean on the config object.
			 * This allows us to switch between feed views and still return
			 * to the same location/filters that we left.
			 * @param newFilterId - id of the new filter currently selected
			 * @returns optionClicked - Returns the filter option selected
			 * TODO: Possibly move to the controller
			 */
			updateOptionSelected: function(newFilterId){
		
				var optionClicked = this.filter.options[newFilterId];
				this.filter.selectedItem = newFilterId;
		
				// Update the selected filter id
				this.selectedFilterId = newFilterId;
		
				return optionClicked;
			},
		
			hide: function(){
				if(this.domNode) { // may have been destroyed
					domClass.add(this.domNode, "lotusHidden");
				}
			},
		
			show: function(){
				domClass.remove(this.domNode, "lotusHidden");
			},
		
			/**
			 * A hidden filter is used to display a special initial feed
			 * in the ActivityStream. It does not have a menu label, and does not
			 * appear in the drop-down. Once de-selected, cannot be re-selected
			 */
			isHidden: function(menuId) {
				return menuId === "__hidden__";
		    },
		
		
		    /**
		     * Destroy this dijit.
		     * @param preserveDom {Boolean}
		     */
		    destroyRecursive: function(preserveDom) {
		    	// Destroy the second filter if it exists
		    	if(this.subFilterMenu){
		    		this.subFilterMenu.destroyRecursive(preserveDom);
		    	}
		
		    	// Call into the parent
		    	this.inherited(arguments);
		    },
		
		    _onBlur: function(e){
				this.isFocused = false;
			}
		
		});
		
		return Filter;
	});
