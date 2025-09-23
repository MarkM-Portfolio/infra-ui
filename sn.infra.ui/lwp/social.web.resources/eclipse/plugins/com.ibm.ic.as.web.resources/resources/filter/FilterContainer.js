/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/lang",
		"dojo/_base/declare",
		"dojo/_base/array",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/text!ic-as/filter/templates/filterContainer.html",
		"dojo/topic",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-as/filter/SharkFinHandler",
		"ic-as/filter/search/ASSearchBarMenuOption"
	], function (lang, declare, array, domClass, domConstruct, template, topic, _Templated, _Widget, events, SharkFinHandler, ASSearchBarMenuOption) {
	
		var FilterContainer = declare("com.ibm.social.as.filter.FilterContainer", 
		[_Widget, _Templated],
		{
			templateString: template,
			
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
			
			placeholderAddEvent: events.PLACEHOLDERADD,
			placeholderRemoveEvent: events.PLACEHOLDERREMOVE,
			
			// Place holder header right location 
			placeholderHeaderRightLocation: com.ibm.social.as.view.placeholder.location.headerRight,
			
			// Place holder header left location 
			placeholderHeaderLeftLocation: com.ibm.social.as.view.placeholder.location.headerLeft,
			
			postCreate: function(){
				as_console_debug("FilterContainer postCreate");
				
				this.filterMenuTempl = {
						menuWidget: null,
						domNode: null,
						eventName: events.UPDATESTATE
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
				this.own(topic.subscribe(events.ENABLESEARCH, lang.hitch(this,"setSearchBarEnabled")));
				SharkFinHandler.getInstance().setSharkFinNode(this.sharkFinNode);
			},
			
			/**
			 * Show/Hide the search bar option
			 */
			setSearchBarEnabled: function(flag){
				this.asSearchBarEnabled = flag;		
				if(this.rendered){
					if(flag){
						this.placeSearchBar();
						domClass.remove(this.asSearchBar.domNode, "lotusHidden");
					} else {
						if(this.asSearchBar)
							domClass.add(this.asSearchBar.domNode, "lotusHidden");
					}
				}
			},
			
			/**
			 * Create the searchBar on the filter
			 */
			placeSearchBar: function(){
				if(!this.asSearchBar && this.asSearchBarEnabled){
					this.asSearchBar = new ASSearchBarMenuOption({
						containerNode: this,
						sharkFinNode: this.sharkFinNode,
						searchBarNode: this.searchBarNode
					});
					domConstruct.place(this.asSearchBar.domNode, this.searchContainerNode);
				}		
			},
				
			/**
			 * Create the first filter menu.
			 */
			createFirstFilter: function(){
				as_console_debug("FilterContainer createFirstFilter");
				
				topic.publish(this.placeholderRemoveEvent, this.placeholderHeaderRightLocation);
				
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
				var filterMenu = this.filterMenus[stateArr.length-1] = this.filterMenus[stateArr.length-1] || lang.clone(this.filterMenuTempl);
				var isFilterFocused = (filterMenu.menuWidget && filterMenu.menuWidget.isFocused)? true : false;
				// Destroy any previous filterMenus
				array.forEach(this.filterMenus.slice(stateArr.length-1), function(menu){
					if(menu.menuWidget){
						menu.menuWidget.destroyRecursive();
					}
				});
				
				if ( filters ) {
					var cls = lang.getObject(this.getFilterType(filters));
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
					topic.publish(this.placeholderAddEvent, this.placeholderHeaderRightLocation, filterMenu.menuWidget.domNode);
				}else{
					if(links || this.asNarrowMode) {
						if(!filterMenu.domNode) {
							filterMenu.domNode = domConstruct.create("span", {}, this.containerNode);
						}
						// Otherwise, just place it inside the container.
						domConstruct.place(filterMenu.menuWidget.domNode, filterMenu.domNode);
					} else {
						// If filter is meant to be a menu, use global placeholder to place it.
						topic.publish(this.placeholderAddEvent, this.placeholderHeaderRightLocation, filterMenu.menuWidget.domNode);
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
		return FilterContainer;
	});
