/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/dom-class",
		"dojo/_base/declare",
		"dojo/dom",
		"dojo/dom-attr",
		"dojo/dom-construct",
		"dojo/query",
		"dojo/topic",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-as/filter/IFilterMenuOption",
		"ic-as/search/ActivityStreamSearchBar",
		"ic-as/util/Localizer",
	], function (dojo, domClass, declare, dom, domAttr, domConstruct, query, topic, _Templated, _Widget, events, IFilterMenuOption, ActivityStreamSearchBar, Localizer) {
	
		var ASSearchBarMenuOption = declare("com.ibm.social.as.filter.search.ASSearchBarMenuOption",
		[_Widget, _Templated, IFilterMenuOption, Localizer],
		{
			
			asSearchBar: null,
			asSearchBarEnable: false,
			searchOption: null,
			searchMenuOptionId: "asSearchMenuOption",
			
			postCreate: function(){
				this.inherited(arguments);
				domClass.add(this.domNode, "lotusHidden");
				var searchIcon = domConstruct.create("img", { 
					src: this._blankGif, 
					alt: "",
					className: "otherActivityStream14 otherActivityStream14-asSearchMag14 icStream-searchIcon", 
					role: "presentation"});
				
				searchOption = this.createFilterItemNode(this.searchMenuOptionId, searchIcon.outerHTML+"&nbsp;", false, this.getLocalizedString("asSearchBarOpen"));
				domConstruct.place(searchOption, this.filterHolderNode);
				// Add the 'lotusFirst' class to the first li (removes left border)
				query("> li:first-child", this.filterHolderNode).addClass("lotusFirst");
				domAttr.remove(this.filterHolderNode, "role", "");
				this.own(topic.subscribe(events.FILTERMENUHIDE, lang.hitch(this,"asSearchBarToggleListener")));
				this.asSearchBar = new ActivityStreamSearchBar({}, this.searchBarNode);		
			},
			
			focusSharkFinOnSearch: function(e){
				
				// Get the target and add the filterSelected class
				var targetNode = e.target;
			
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
				var searchMenuOption = query("#"+this.searchMenuOptionId, this.filterHolderNode);
				if(searchMenuOption.length > 0 && flag == "true"){
					domAttr.set(searchMenuOption[0], "title", this.getLocalizedString("asSearchBarCancel"));
				} else {
					domAttr.set(searchMenuOption[0], "title", this.getLocalizedString("asSearchBarOpen"));
				}
			}
			
		});
		return ASSearchBarMenuOption;
	});
