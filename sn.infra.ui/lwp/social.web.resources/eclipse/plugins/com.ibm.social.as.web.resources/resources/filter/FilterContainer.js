/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.filter.FilterContainer");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("com.ibm.social.as.filter.FilterList");
dojo.require("com.ibm.social.as.filter.FilterMenu");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.view.PlaceholderView");
dojo.require("com.ibm.social.as.filter.search.ASSearchBarMenuOption");
dojo.require("com.ibm.social.as.filter.SharkFinHandler");

dojo.declare("com.ibm.social.as.filter.FilterContainer", 
[dijit._Widget, dijit._Templated],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "filter/templates/filterContainer.html"),
	
	// The current feed on display in the Activity Stream
	controller: null,

	// Filter menus object which contains properties for each
	// filter menu on display
	filterMenus: null,
	
	// Filter dijit types
	filterTypes: null,
	
	filterNodes: null,
	
	sharkFinNode:null,
	
	asNarrowMode:false,
	
	asSearchBar:null,
	
	asSearchBarEnabled: false,
	
	rendered: false,
	
	placeholderAddEvent: com.ibm.social.as.constants.events.PLACEHOLDERADD,
	placeholderRemoveEvent: com.ibm.social.as.constants.events.PLACEHOLDERREMOVE,
	
	// Place holder header right location 
	placeholderHeaderRightLocation: com.ibm.social.as.view.placeholder.location.headerRight,
	
	// Place holder header left location 
	placeholderHeaderLeftLocation: com.ibm.social.as.view.placeholder.location.headerLeft,
	
	postCreate: function(){
		as_console_debug("FilterContainer postCreate");
		
		this.filterMenuTempl = {
				menuWidget: null,
				domNode: null,
				eventName: com.ibm.social.as.constants.events.UPDATESTATE
			};
		
		this.filterMenus = [];
		
		this.filterTypes = {
			"default": "com.ibm.social.as.filter.FilterMenu",
			"links": "com.ibm.social.as.filter.FilterList"
		};
		
		this.filterNodes = [];
		
		this.createFirstFilter();		
		this.rendered = true;
		this.setSearchBarEnabled(this.asSearchBarEnabled);
		this.subscribe(com.ibm.social.as.constants.events.ENABLESEARCH, "setSearchBarEnabled");
		com.ibm.social.as.filter.SharkFinHandler.getInstance().setSharkFinNode(this.sharkFinNode);
	},
	
	/**
	 * Show/Hide the search bar option
	 */
	setSearchBarEnabled: function(flag){
		this.asSearchBarEnabled = flag;		
		if(this.rendered){
			if(flag){
				this.placeSearchBar();
				dojo.removeClass(this.asSearchBar.domNode, "lotusHidden");
			} else {
				if(this.asSearchBar)
					dojo.addClass(this.asSearchBar.domNode, "lotusHidden");
			}
		}
	},
	
	/**
	 * Create the searchBar on the filter
	 */
	placeSearchBar: function(){
		if(!this.asSearchBar && this.asSearchBarEnabled){
			this.asSearchBar = new com.ibm.social.as.filter.search.ASSearchBarMenuOption({
				containerNode: this,
				sharkFinNode: this.sharkFinNode,
				searchBarNode: this.searchBarNode
			});
			dojo.place(this.asSearchBar.domNode, this.searchContainerNode);
		}		
	},
		
	/**
	 * Create the first filter menu.
	 */
	createFirstFilter: function(){
		as_console_debug("FilterContainer createFirstFilter");
		
		dojo.publish(this.placeholderRemoveEvent, [this.placeholderHeaderRightLocation]);
		
		this.createFilterMenu(this.controller.configHandler.getSelectedObjects()[0].filters, [this.controller.configHandler.getSelectedKeys().shift()]);
	},
	
	/**
	 * Creates the second filter menu.
	 * @param filters - Filters to be displayed
	 * @returns filterMenuWidget
	 */
	createSubFilterMenu: function(filters, stateArr){
		as_console_debug("FilterContainer createSubFilterMenu args:", filters);
		
		return this.createFilterMenu(filters, stateArr);
	},
	
	/**
	 * Creates a filter menu.
	 * @param filterMenuProp - The filter menu property name ("first" or "second")
	 * @param filters - Filter options used to populate the filter menu
	 * @returns a filter menu widget
	 */
	createFilterMenu: function(filters, stateArr){
		as_console_debug("FilterContainer createFilterMenu args:", arguments);
		var filterMenu = this.filterMenus[stateArr.length-1] = this.filterMenus[stateArr.length-1] || dojo.clone(this.filterMenuTempl);
		var isFilterFocused = (filterMenu.menuWidget && filterMenu.menuWidget.isFocused)? true : false;
		// Destroy any previous filterMenus
		dojo.forEach(this.filterMenus.slice(stateArr.length-1), function(menu){
			if(menu.menuWidget){
				menu.menuWidget.destroyRecursive();
			}
		});
		
		if ( filters ) {
			var cls = dojo.getObject(this.getFilterType(filters));
			filterMenu.menuWidget = new cls({
				filter: filters,
				stateArr: stateArr,
				onFilterChangeEventName: filterMenu.eventName,
				container: this,
				sharkFinNode: this.sharkFinNode,
				isFocused: isFilterFocused
			});
			
			// Put the filter somewhere on the page
			this.placeFilterMenu(filterMenu, filters.align, filters.type == "links");
		}
		
		return filterMenu.menuWidget;
	},
	
	/**
	 * Place the filter menu's DOM node on the page.
	 * @param filterMenu {Object}
	 * @param align {String}
	 */
	placeFilterMenu: function(filterMenu, align, links){
		if(align === "right"){
			// If filter is meant to be right aligned, use global placeholder to place it.
			dojo.publish(this.placeholderAddEvent, 
					[this.placeholderHeaderRightLocation, filterMenu.menuWidget.domNode]);
		}else{
			if(links || this.asNarrowMode) {
				if(!filterMenu.domNode) {
					filterMenu.domNode = dojo.create("span", {}, this.containerNode);
				}
				// Otherwise, just place it inside the container.
				dojo.place(filterMenu.menuWidget.domNode, filterMenu.domNode);
			} else {
				// If filter is meant to be a menu, use global placeholder to place it.
				dojo.publish(this.placeholderAddEvent, 
						[this.placeholderHeaderRightLocation, filterMenu.menuWidget.domNode]);
			}
		}
	},
	
	/**
	 * Get the filter type based on the filters passed
	 * @param filters {Object}
	 * @returns
	 */
	getFilterType: function(filters){
		// Use the filters type, or default
		var filterType = filters.type || "default";
		return this.filterTypes[filterType];
	}
});
