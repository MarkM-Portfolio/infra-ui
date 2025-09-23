/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/has",
		"dojo/text!ic-as/filter/templates/filterMenu.html",
		"dojo/topic",
		"ic-as/constants/events"
	], function (dojo, declare, domAttr, domClass, domConstruct, has, template, topic, events) {
	
		declare("com.ibm.social.as.filter.FilterMenu", 
		com.ibm.social.as.filter.Filter,
		{
			/** Instance variables */ 
			templateString: template,
			
			/**
			 * Updates the menu options in the UI.
			 */
			postCreate: function(){
				this.inherited(arguments);
				if(has("ie") != 8){
					  domClass.add(this.filterHolderNode, "maxWidth");
				}
				
					
				domConstruct.create("label",{
					"for": this.filterHolderNode.id,
					innerHTML: "_",
					className: "lotusHidden"
				},this.filterMenuNode, "first");
				this.own(topic.subscribe(events.FILTERMENUHIDE, lang.hitch(this,"hideFilterMenuFromTab")));
				
			},
			
			hideFilterMenuFromTab: function(flag){
				if(flag == "true"){
					domAttr.set(this.filterHolderNode, "tabindex", "-1");
				} else {
					domAttr.remove(this.filterHolderNode, "tabindex");
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
				var option = domConstruct.create("option", {
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
		
		return com.ibm.social.as.filter.Filter;
	});
