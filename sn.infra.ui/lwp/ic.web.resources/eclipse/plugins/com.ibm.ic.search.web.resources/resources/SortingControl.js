/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/i18n!./nls/Sorting",
	"dojo/query",
	"dojo/string",
	"dijit/_Widget"
], function (declare, domAttr, domClass, domConstruct, i18nSorting, query, string, _Widget) {

	var SortingControl = declare(
		"lconn.search.SortingControl",
		_Widget,
	{
		
		clearSort:		function(){},	// Function callback to clear the sorting
		isActive:		false,			// boolean
		isDescending:	true,			// boolean
		key:			null,			// String
		label:			null,			// String
		sortBy:			function(){},	// Function callback to sort the search results
		_strings:		i18nSorting,
		
		buildRendering : function() {
			this.inherited(arguments);
			
			var a = domConstruct.create("a", {
				role:		"button",
				href:		"javascript:;",
				key:		this.key,
				id:			this.id+"_Bttn",
				innerHTML:	this.label
			}, this.domNode);
			
			if (this.isActive){
				domClass.add(a, "lotusActiveSort");
				domAttr.set(a, "aria-pressed", "true");
				
				if (this.isDescending){
					domAttr.set(a, "title", this._strings.SORT_DESCENDING);
					domAttr.set(a, "aria-label", string.substitute(this._strings.SORT_ACTIVE_DESCENDING,[this.label]));
					domClass.add(a, "lotusDescending");
					domConstruct.create("span", { "class": "lotusAltText", "innerHTML": " &#8595;" }, a);
				} else {
					domAttr.set(a, "title", this._strings.SORT_ASCENDING);
					domAttr.set(a, "aria-label", string.substitute(this._strings.SORT_ACTIVE_ASCENDING,[this.label]));
					domClass.add(a, "lotusAscending");
					domConstruct.create("span", { "class": "lotusAltText", "innerHTML": " &#8593;" }, a);
				}
			} else {
				domAttr.set(a, "title", string.substitute(this._strings.SORT_INACTIVE,[this.label]));
				domAttr.set(a, "aria-label", string.substitute(this._strings.SORT_INACTIVE,[this.label]));
				domAttr.set(a, "aria-pressed", "false");
			}
		},
		
		postCreate : function(){ 
			this.inherited(arguments);
			
			var a = query("a", this.domNode);
			if (this.key === "relevance"){
				if (this.isActive){
					a.attr("title", this._strings.SORT_DESCENDING_DISABLED);
					a.attr("aria-label", string.substitute(this._strings.SORT_ACTIVE_DESCENDING_DISABLED,[this.label]));
					a.attr("aria-disabled", "true");
					a.attr("disabled", "disabled");
					a.addClass("lotusDisabled");
				} else {
					a.connect("onclick", this, function(){
						this.clearSort(this.id+"_Bttn");
					});
				}
			} else if (this.isActive && this.isDescending){
				a.connect("onclick", this, function(){
					this.sortBy(this.key, "asc", this.id+"_Bttn");
				});
			} else {
				a.connect("onclick", this, function(){
					this.sortBy(this.key, "desc", this.id+"_Bttn");
				});
			}
		}
		
	});
	return SortingControl;
});