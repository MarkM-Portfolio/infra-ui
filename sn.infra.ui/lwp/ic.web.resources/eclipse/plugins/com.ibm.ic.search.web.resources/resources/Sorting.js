/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/i18n!./nls/Sorting",
	"dijit/_Widget",
	"dijit/registry",
	"./SortingControl"
], function (array, declare, lang, domClass, domConstruct, i18nSorting, _Widget, registry, SortingControl) {

	var Sorting = declare(
		"lconn.search.Sorting",
		_Widget,
	{
		
		clearSort:			function(){},	// Function callback to clear the sorting
		currentSortKey:		"relevance",	// String
		currentSortOrder:	"desc",			// String
		sortBy:				function(){},	// Function callback to sort the search results
		sortOptions:		[],				// Array of objects with key and label attributes.
		_strings:			i18nSorting,
		
		postMixInProperties: function() {
			this.inherited(arguments);
			
			if (!this.currentSortKey){
				this.currentSortKey = "relevance";
			}
			
			if (!this.currentSortOrder){
				this.currentSortOrder = "desc";
			}
		},
		
		buildRendering: function() {
			this.inherited(arguments);
			
			domClass.add(this.domNode, "lotusSort");
			
			domConstruct.create("span", {
				"id":			"lconnSearchSortLabel",
				"class":		"lotusLeft",
				"innerHTML":	this._strings.SORT_BY + "&#160;"
			}, this.domNode, "only");
			
			// Setting the containerNode ensures destroyRecursive destroys the children
			this.containerNode = domConstruct.create("ul", {
				"class":			"lotusInlinelist", 
				"role":				"group", 
				"aria-labelledby":	"lconnSearchSortLabel"
			}, this.domNode);
			
			array.forEach(this.sortOptions, function(sortOption, index){
				
				var li = domConstruct.create("li", {"role":"presentation"}, this.containerNode);
			
				if (index === 0){
					domClass.add(li,"lotusFirst");
				}
				
				var controlId = this.id + "_" + sortOption.key;
				
				var oldControl = registry.byId(controlId);
				if (oldControl){
					oldControl.destroyRecursive();
				}
				
				var control = new SortingControl({
					clearSort:		lang.hitch(this,"clearSort"),
					id:				controlId,
					isActive:		this.currentSortKey === sortOption.key,
					isDescending:	this.currentSortOrder !== "asc",
					key:			sortOption.key,
					label:			sortOption.label,
					sortBy:			lang.hitch(this,"sortBy")
				}, li);
				
			}, this);
		}
	
	});
	return Sorting;
});
