/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/json",
	"dojo/dom-construct",
	"dojo/_base/declare",
	"dojo/i18n!./nls/FilterArea",
	"dojo/_base/window",
	"dojo/has",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/on",
	"dojo/query",
	"dojo/dom-geometry",
	"dojo/number",
	"dojo/date/locale",
	"dojo/_base/config",
	"dojox/html/entities",
	"dijit/_Widget",
	"./Constants"
], function (JSON, domConstruct, declare, i18nFilterArea, windowModule, has, domClass, domAttr, lang, array, on, query, domGeom, number, locale, config, entities, _Widget, Constants) {

	var FilterArea = declare(
		"lconn.search.FilterArea",
		_Widget,
	{
		
		apiHandler:					null,				// An instance of lconn.search.searchAPI
		getConstraints:				function(){},		// Callback function used to get the currently applied constraints
		onChange:					function(){},		// Callback function executed on change, eg to update the search results
		onFocusLost:				function(){},		// Callback function executed when there is nothing to focus on in the domNode
		_strings:					i18nFilterArea,
		
		buildRendering: function(){
			this.inherited(arguments);
			
			// Add the appropriate CSS class
			domClass.add(this.domNode, "lotusFilters2");
			
			// Create DOM nodes for container and label for the "Matching all of" filters
			var matchAllList = this._createSearchFilterSectionContainer(this._strings.MATCHING_ALL_OF);
			
			// Create DOM nodes to contain the DocumentType filters (this will also be the parent DIV of the DIV for the Properties filters)
			var ecmDocumentTypeSection = this._createSearchFilterSectionContainer(this._strings.MATCHING_DOCUMENT_TYPE);
			
			// Create DOM nodes to contain the Properties filters
			var ecmPropertiesList = this._createEcmPropertiesContainer();
			
			// Parse the constraints and create filters for each
			var constraints = this.getConstraints();
			array.forEach(constraints, function(constraint){
				if (constraint.values && constraint.values.length > 0){
					if (constraint.type === "category" && constraint.values.length === 1 && constraint.values[0].id && constraint.values[0].id.indexOf("EcmDocumentType/")===0){		
						this._createConstraintFilter(constraint, ecmDocumentTypeSection);
					} else if (constraint.dataType){
						// We assume here that if a constraint has a dataType attribute, that it is an ECM property constraint
						this._createEcmPropertyConstraintFilter(constraint, ecmPropertiesList);
					} else if ((constraint.id !== "libraryId") && (constraint.id !== "FIELD_LIBRARY_DBINTERNAL_UID" )){
						// libraryId constraint is applied to "This Wiki" searches but label is not returned in API
						// For now, simply not showing filter for the libraryId constraint. Will be addressed fully
						// in API in work item 86423.
						this._createConstraintFilter(constraint, matchAllList);
					}
				}
			}, this);
			
			// Change label on matchAllList if there is only a single filter applied
			if (query(".lotusFilter", matchAllList).length === 1){
				var label = query("span",matchAllList.parentNode)[0];
				domAttr.set(label, "innerHTML", this._strings.MATCHING+'&#160;');
			}
			
			// Place each of the DIVs as long as they aren't empty 
			this._placeIfNotEmpty(matchAllList.parentNode, this.domNode);
			this._placeIfNotEmpty(ecmPropertiesList.parentNode, ecmDocumentTypeSection);
			this._placeIfNotEmpty(ecmDocumentTypeSection.parentNode, this.domNode);
		},
		
		_createConstraintFilter: function(/*Object*/constraint, /*DOMNode*/matchAllList){
			if (constraint.values.length === 1){
				this._createConstraintValueFilter(constraint,constraint.values[0],matchAllList);
			} else {
				var matchOneOfDiv = this._createSearchFilterSectionContainer(this._strings.MATCHING_ONE_OF);
				array.forEach(constraint.values, function(value){
					this._createConstraintValueFilter(constraint,value,matchOneOfDiv);
				}, this);
				domConstruct.place(matchOneOfDiv, this.domNode);
			}
		},
		
		_createConstraintValueFilter: function(/*Object*/constraint, /*Object*/constraintValue, /*DOMNode*/container){
			
			var getFacetId = function(/*String*/ categoryId){
				for (var i=0; i<=Constants.FacetOrder.length; i++){
					var facetId = Constants.FacetOrder[i];
					if (categoryId.indexOf(facetId) === 0){
						return facetId;
					}
				}
				if (categoryId.indexOf("Source") === 0){
					return "Source";
				}
			};
					
			var a = this._createFilter(constraintValue.label);
			
			if (constraint.type === "category"){
				var facetId = getFacetId(constraintValue.id);
				
				if (facetId === "Date"){
					this.connect(a, "onclick", lang.hitch(this, function(){
						var date = constraintValue.id.substring(facetId.length+1); // Remove "Date/" prefix
						this.apiHandler.removeDate(date);
						this.onChange({focusNode: this});
					}));
				} else if (facetId === "EcmDocumentType"){
					var ecmDocumentTypeElements = constraintValue.label.split('/');
					if (ecmDocumentTypeElements && ecmDocumentTypeElements.length > 1){
						a = this._createFilter(ecmDocumentTypeElements[ecmDocumentTypeElements.length-1]);
					}
					this.connect(a, "onclick", lang.hitch(this, function(){
						var ecmDocumentTypeId = constraintValue.id.substring(facetId.length+1); // Remove "EcmDocumentType/" prefix
						this.apiHandler.removeEcmDocumentType(ecmDocumentTypeId);
						this.onChange({focusNode: this});
					}));
				} else if (facetId === "Person"){
					this.connect(a, "onclick", lang.hitch(this, function(){
						var person = constraintValue.id.substring(facetId.length+1); // Remove "Person/" prefix
						this.apiHandler.removePerson(person);
						this.onChange({focusNode: this});
					}));
				} else if (facetId === "Source"){
					this.connect(a, "onclick", lang.hitch(this, function(){
						var source = constraintValue.id.substring(facetId.length+1); // Remove "Source/" prefix
						this.apiHandler.removeSource(source);
						this.onChange({focusNode: this});
					}));
				} else if (facetId === "Tag"){
					this.connect(a, "onclick", lang.hitch(this, function(){
						var tag = constraintValue.id.substring(facetId.length+1); // Remove "Tag/" prefix
						this.apiHandler.removeTag(tag);
						this.onChange({focusNode: this});
					}));
				} else if (facetId === "Trend"){
					this.connect(a, "onclick", lang.hitch(this, function(){
						var trend = constraintValue.id.substring(facetId.length+1); // Remove "Trend/" prefix
						this.apiHandler.removeTrend(trend);
						this.onChange({focusNode: this});
					}));
				}
			} else {
				var apiConstraint;
				if (constraint.type === "range"){
					apiConstraint = this.apiHandler.getRangeConstraintParametersAsObjects(constraint.id, [constraint.values[0]]);
				} else {
					apiConstraint = this.apiHandler.getFieldConstraintParametersAsObjects(constraint.id, [constraint.values[0].id]);
				}	
				this.connect(a, "onclick", lang.hitch(this, function(){
					this.apiHandler.removeConstraint(JSON.stringify(apiConstraint));
					this.onChange({focusNode: this});
				}));
			} 
			
			domConstruct.place(a, container);
		},
		
		_createEcmPropertiesContainer: function(){	
			var div = domConstruct.create("div");
			domConstruct.create("span", {
				"innerHTML":	this._strings.PROPERTIES_PREFIX+'&#160;'
			}, div);
			var ul = domConstruct.create("ul", {
				"class":		"lotusInlinelist"
			}, div);
			return ul;
		},
		
		_createEcmPropertyConstraintFilter: function(/*Object*/constraint, /*DOMNode*/container){
			var nameLabel = constraint.label ? constraint.label : constraint.id;
			
			var filterLabel;
			if (constraint.dataType === "dateTime"){		
				// Numeric range constraint values need to be formatted as dates
				var lowerBoundary = number.parse(constraint.values[0].ge);
				var upperBoundary = number.parse(constraint.values[0].le);
				var formatOptions = {selector: "date"}; // format date only
				var formattedStartDate = locale.format(new Date(lowerBoundary), formatOptions);
				var formattedEndDate = locale.format(new Date(upperBoundary), formatOptions);
				
				if (formattedStartDate === formattedEndDate){
					// Date constraint is for a single day
					filterLabel = lang.replace(this._strings.PROPERTY_X_IS_Y, {
						property:	nameLabel, 
						value:		formattedStartDate
					});
				} else {
					// Date constraint is for a date range
					filterLabel = lang.replace(this._strings.PROPERTY_X_IS_DATE1_TO_DATE2, {
						property:	nameLabel, 
						date1:		formattedStartDate,
						date2:		formattedEndDate
					});
				}
			} else {
				var valueLabel = constraint.values[0].label ? constraint.values[0].label : constraint.values[0].id;		
				filterLabel = lang.replace(this._strings.PROPERTY_X_IS_Y, {property: nameLabel, value: valueLabel});
			}
			
			var a = this._createFilter(filterLabel);
			domConstruct.place(a, container);
			
			var apiConstraint;
			if (constraint.type === "range"){
				apiConstraint = this.apiHandler.getRangeConstraintParametersAsObjects(constraint.id, [constraint.values[0]]);
			} else {
				apiConstraint = this.apiHandler.getFieldConstraintParametersAsObjects(constraint.id, [constraint.values[0].id]);
			}
			
			this.connect(a, "onclick", lang.hitch(this, function(){
				this.apiHandler.removeConstraint(JSON.stringify(apiConstraint));
				this.onChange({focusNode: this});
			}));
		},
		
		_createFilter: function(/*String*/str){
			// summary: Creates a filter using accessible OneUI markup 
			
			var li = domConstruct.create("li");
			
			var isLtr = domGeom.isBodyLtr();
	
			var a = domConstruct.create("a",{
				"class":		"lotusFilter",
				"href":			"javascript:;",
				"innerHTML":	entities.encode(str),
				"role":			"button",
				"title":		this._strings.REMOVE_FILTER_TOOLTIP
			}, li);
	
			domConstruct.create("span",{
				"class": "lotusAccess",
				"innerHTML": this._strings.REMOVE_FILTER_TOOLTIP
			}, a);
			
			var dirChar = "";
			if (!isLtr){
				dirChar = "\u200F";
			}else if(has("ie")){
				dirChar = " ";
			}
			var dirNode = windowModule.doc.createTextNode(dirChar);
			domConstruct.place(dirNode, a);
	
			domConstruct.create("img", {
				"class":		"lotusDelete",
				"role":			"presentation",
				"alt":			this._strings.REMOVE_FILTER_TITLE,
				"src":			config.blankGif
			}, a);
	
			domConstruct.create("span", {
				"class":		"lotusAltText",
				"innerHTML":	"X"
			}, a);
	
			return li;
		},
		
		_createSearchFilterSectionContainer: function(/*String*/label){
			var div = domConstruct.create('div', {
				"class":		"lotusSearchFilterSection"
			});
			domConstruct.create("span", {
				"innerHTML":	label+'&#160;'
			}, div);
			var ul = domConstruct.create("ul", {
				"class":		"lotusInlinelist"
			}, div);
			return ul;		
		},
		
		focus: function(){
			var filters = query("a.lotusFilter", this.domNode);
			if (filters && filters.length > 0){
				filters[0].focus();
			} else {
				this.onFocusLost();
			}
		},
		
		_placeIfNotEmpty: function(/*DOMNode*/node, /*DOMNode*/refNode){
			// summary: Places the node as long as it contains at least one element
			//	which has the class lotusFilter.
			var count = query(".lotusFilter", node).length;
			if (count > 0){
				domConstruct.place(node, refNode);
			}
		},
		
		update: function() {
			// summary: Update the filter area
			
			// Remove any existing filter area UI elements	
			if (this.domNode != null) {
				domConstruct.empty(this.domNode);
			}
			this.buildRendering();
		}
	});
	return FilterArea;
});
