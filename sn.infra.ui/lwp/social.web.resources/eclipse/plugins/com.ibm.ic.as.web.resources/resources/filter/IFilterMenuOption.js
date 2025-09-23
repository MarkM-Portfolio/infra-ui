/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/text!ic-as/filter/templates/filterList.html",
		"dojo/topic",
		"ic-as/filter/SharkFinHandler"
	], function (dojo, declare, lang, domAttr, domClass, domConstruct, template, topic, SharkFinHandler) {
	
		var IFilterMenuOption = declare("com.ibm.social.as.filter.IFilterMenuOption", null,
		{
			templateString: template,
			
			sharkFinNode: null,
			
			updateSharkFin: function(node){	
				SharkFinHandler.getInstance().updateSharkFin(node);	
			},
			
			setSelectedNode: function(node){
				SharkFinHandler.getInstance().setSelectedNode(node);	
			},
			
			getSelectedNode: function(){
				return SharkFinHandler.getInstance().getSelectedNode();	
			},
			
			/**
			 * Create a filter item node for this filter list.
			 * @param menuItemValue {String} id/value
			 * @param menuItemLabel {String} name
			 * @param selected {Boolean} true if selected, false otherwise.
			 * @param menuTitle {String} (Optional) description/title for the list element
			 * @param ariaLabel {String} (Optional) a11y description
			 * @returns {DOMNode} li
			 */
			createFilterItemNode: function(menuItemValue, menuItemLabel, selected, menuTitle, ariaLabel){
				// Create list item. Don't give the role menuitem as this stops Jaws reading out the value.
				var li = domConstruct.create("li");
				
				// Create internal li link
				var a = domConstruct.create("a", {
					href: "javascript:;",
					id: menuItemValue,
					innerHTML: menuItemLabel,
					role: "button",
					"data-navbutton": "true",
					title: menuTitle || "",
					"aria-label": ariaLabel || menuTitle || ""
				}, li);
				
				// If this item is selected, add class and update selected node
				if(selected){
					domClass.add(a, "filterSelected");
					domAttr.set(a, "aria-pressed", "true");
					this.setSelectedNode(a);		
					// need to wait for end of feed load or else init fin placement is off.
					// need to revisit this to see if we can get an earlier point to update the fin
					this.own(topic.subscribe(this.populateEventName, lang.hitch(this, "updateSharkFin", a)));
				}
				
				return li;
			}
			
		});
		return IFilterMenuOption;
	});
