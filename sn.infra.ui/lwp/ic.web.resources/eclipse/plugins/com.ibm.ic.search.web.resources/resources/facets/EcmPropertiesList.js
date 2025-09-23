/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/i18n!../nls/EcmPropertiesList",
	"dojo/date/locale",
	"dojo/_base/declare",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/dom-construct",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/json",
	"dojo/on",
	"dojo/request/xhr",
	"dojo/_base/config",
	"dojo/number",
	"dojo/text!../templates/EcmPropertiesList.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/registry",
	"ic-core/HelpLauncher",
	"ic-ui/aria/Toolbar",
	"./EcmPropertiesPopup"
], function (i18nEcmPropertiesList, locale, declare, domAttr, domStyle, domConstruct, lang, array, JSON, on, xhr, config, number, template, _Templated, _Widget, registry, HelpLauncher, Toolbar, EcmPropertiesPopup) {

	var EcmPropertiesList = declare(
		"lconn.search.facets.EcmPropertiesList",
		[_Widget, _Templated],
	{
		
		URL_PATH:				"/json/labels/properties?ecmDocumentType=",
		TIMEOUT:				12000,
		
		apiHandler:				null,			// An instance of lconn.search.searchAPI
		documentType:			null,			// Currently selected ECM document type
		getConstraints:			function(){},	// Callback function to get the query constraints from the data store.
		onChange:				function(){},	// Callback function executed on change, eg to update the search results
		_popup:					null,			// An instance of lconn.search.EcmPropertiesPopup
		_propertiesData:		null,			// Map of property ids to metadata (a map of dataType, label and defaultValue).
		_selectedProperties:	[],				// Currently selected properties
		_strings:				i18nEcmPropertiesList,
		templateString: template,
		
		postCreate: function(){	
			this.inherited(arguments);
			
			// Create help launcher
			this.helpLink = HelpLauncher.createHelpLink(this.helpLink, this._strings.PROPERTIES, this._strings.PROPERTIES_HELP_TEXT, {	
				HELP: this._strings.PROPERTIES_HELP_LABEL,
				CLOSE: this._strings.PROPERTIES_HELP_CLOSE
			});
			
			// Need to build an array of the selected properties
			this._selectedProperties = [];
			
			// Only constraints related to ECM properties will have the dataType attribute of the constraint populated in the REST API response
			var constraints = this.getConstraints();
			array.forEach(constraints, function(constraint){
				if (constraint.dataType && constraint.values){
					var apiConstraint;
					if (constraint.type === "range"){
						apiConstraint = this.apiHandler.getRangeConstraintParametersAsObjects(constraint.id, [constraint.values[0]]);
					} else {
						apiConstraint = this.apiHandler.getFieldConstraintParametersAsObjects(constraint.id, [constraint.values[0].id]);
					}	
					this._selectedProperties.push({name: constraint.id, constraint: constraint, apiConstraint: apiConstraint});
				}
			}, this);
			
			this._renderList();
			
			// Since the REST API response doesn't include whether there are other properties 
			// or whether the properties that have already had constraints appleid allow 
			// multiple values, we need to retrieve the properties metadata to determine 
			// whether there are any properties for the user to add a constraint on and 
			// hence whether or not we should display the add property button.
			domStyle.set(this._loadingNode, "display", "");
			this._fetchData(lang.hitch(this,"_loadPropertiesData"), lang.hitch(this,"_onError"));
		},
		
		_addProperty: function(){
			this._editProperty();
		},
		
		_applyFieldConstraint: function(/*String*/id, /*String or String[]*/value, /*boolean*/ exactMatch){
			this.apiHandler.addFieldConstraintParameter(id,value,exactMatch);
			this.onChange({focusNode: "ecmPropertiesListAddPropertyButton" }); 
		},
		
		_applyRangeConstraint: function(/*String*/id, /*String or Number*/lowerBoundary, /*String or Number*/upperBoundary){
			this.apiHandler.addInclusiveRangeConstraintParameter(id,lowerBoundary,upperBoundary);
			this.onChange({focusNode: "ecmPropertiesListAddPropertyButton" }); 
		},
		
		_editProperty: function(/*Object?*/previousConstraint){
			//summary: Displays 'Edit Property' popup if previousConstraint specified, 'Add Property' popup if not.
			
			if (this._popup){
				this._popup.destroyRecursive();
			}
			
			this._popup = new EcmPropertiesPopup({
				applyFieldConstraint:		lang.hitch(this,"_applyFieldConstraint"),
				applyRangeConstraint:		lang.hitch(this,"_applyRangeConstraint"),
				documentType:				this.documentType,
				fetchData:					lang.hitch(this,"_fetchData"),
				isAddable:					lang.hitch(this, "_isAddable"),
				previousConstraint:			previousConstraint,
				removeConstraint:			lang.hitch(this.apiHandler,"removeConstraint")
			});
		},
		
		_fetchData: function(/*function*/onLoad, /*function*/onError){
			
			if (this._propertiesData){
				// Use cached properties metadata if loaded
				onLoad(this._propertiesData);
			} else {
				var url = this.apiHandler.contextRoot + this.URL_PATH + encodeURIComponent(this.documentType);
				
				xhr(url, {method: "GET", handleAs: "json", timeout: this.TIMEOUT, sync: false}).response.then(
						function(response) {
							var res = lang.mixin({}, response);
							res.args = lang.mixin(res.args, response.options);
							onLoad(response.data || response.text, res);
						}, function(response) {
							var res = lang.mixin(response, response.response);
							res.args = lang.mixin(res.args, res.options);
							onError(res, res);
						});
			}
		},
		
		_isAddable: function(/*Object*/property){
			for (var i=0; i<this._selectedProperties.length; i++){
				var currentSelectedProperty = this._selectedProperties[i];
				if (currentSelectedProperty.name === property.name){
					// You can't filter twice by the same ECM property unless multiple === true
					return currentSelectedProperty.multiple;
				}
			}
			return true;
		},
		
		_loadPropertiesData: function(/*Object[]*/data, /*Object*/evt){
		
			this._propertiesData = data;
			
			var getMetadata = lang.hitch(this,function(/*String*/propertyName){
				var data = this._propertiesData;
				for (var i=0; i<data.length; i++){
					var name = data[i].name;
					if (propertyName === name){
						return data[i];
					}
				}
			});
			
			if (this._selectedProperties.length > 0){	
				// Mixin the appropriate property metadata into the relevant array item
				array.forEach(this._selectedProperties, function(item){
					lang.mixin(item, getMetadata(item.name));
				}, this);
			}
			
			domStyle.set(this._loadingNode, "display", "none");
			
			var showAddPropertyButton = false;
			for (var i=0; i<this._propertiesData.length; i++){
				var property = this._propertiesData[i];
				if (this._isAddable(property)){
					showAddPropertyButton = true;
					break;
				}
			}
			
			if (!showAddPropertyButton){
				
				var message;
				if (this._selectedProperties.length > 0){
					message = this._strings.NO_MORE_PROPERTIES;
				} else {
					message = this._strings.NO_PROPERTIES;
				}
						
				domConstruct.create("span",{
					innerHTML:	message
				}, this._addPropertyButtonContainer, "only");
			}
			
		},
		
		_onError: function(/*Object*/data, /*Object*/evt){
			//TODO Remove the below hack once Gili has implemented the REST API
			if (config.isDebug){
				this._loadPropertiesData([
					{
						"name":"DateCreated",
						"dataType":"dateTime",
						"label":"Date Created",
						"multiple":false,
						"defaultValue":"2012-11-01"
					},
					{
						"name":"Creator",
						"dataType":"string",
						"label":"Creator",
						"multiple":true,
						"defaultValue":"Default"
					},
					{
						"name":"IsReserved",
						"dataType":"boolean",
						"label":"Is Reserved",
						"multiple":false,
						"defaultValue":"false"
					},
					{
						"name":"MinorVersionNumber",
						"dataType":"double",
						"label":"Minor Version Number",
						"multiple":false,
						"defaultValue":"42.5"
					},
					{
						"name":"MajorVersionNumber",
						"dataType":"long",
						"label":"Major Version Number",
						"multiple":false,
						"defaultValue":"42"
					},
					{
						"name":"MovieRating",
						"dataType":"string",
						"label":"Movie Rating",
						"options": [{"label":"General","id":"G"},
									{"label":"Parental Guidance","id":"PG"},
									{"label":"Restricted","id":"R"},
									{"label":"Not Rated","id":"NR"}],
						"multiple":false,
						"defaultValue":"PG"
					}
				]);
				return;
			}
			// End hack. The below is the actual error handling code.
			
			domAttr.set(this.domNode, "innerHTML", this._strings.ERROR_OCCURRED);
			domConstruct.create("div",{
				"innerHTML": data
			}, this.domNode, "last");
		},
		
		_renderDeleteButton: function(/*DOMNode*/parentNode, /*String*/label, /*function*/removeCallback){
			var deleteAriaLabel = lang.replace(this._strings.REMOVE_THE_PROPERTY_X_FROM_THE_SELECTED_FILTER,{name:label});
			
			var deleteBttn = domConstruct.create("a",{
				"class":		"lotusDelete",
				"role":			"button",
				"href":			"javascript:;",
				"title":		deleteAriaLabel
			}, parentNode); 
			
			this.connect(deleteBttn, "onclick", lang.hitch(this, removeCallback));
			
			domConstruct.create("img",{
				"src":			config.blankGif,
				"aria-label":	deleteAriaLabel,
				"alt":			""
			}, deleteBttn);
			
			domConstruct.create("span",{
				"class":		"lotusAltText",
				"innerHTML":	"X"
			}, deleteBttn); 
		},
		
		_renderEditButton: function(/*DOMNode*/parentNode, /*String*/describedBy, /*function*/editCallback){
			var editBttn = domConstruct.create("a",{
				"aria-describedby":		describedBy,
				"aria-label":			this._strings.EDIT_PROPERTY,
				"href":					"javascript:;",
				"innerHTML":			this._strings.EDIT,
				"role":					"button"
			}, parentNode); 
			
			this.connect(editBttn, "onclick", lang.hitch(this, editCallback));
		},
		
		_renderList: function(){
			
			if (this._selectedProperties.length > 0){
				domStyle.set(this._contentNode, "display", "");
				
				array.forEach(this._selectedProperties, function(element){
					var nameLabel = element.constraint.label ? element.constraint.label : element.constraint.id;
									
					var valueLabel;
					if (element.constraint.dataType === "dateTime"){								
						// Numeric range constraint values need to be formatted as dates
						var lowerBoundary = number.parse(element.constraint.values[0].ge);
						var upperBoundary = number.parse(element.constraint.values[0].le);
						var formatOptions = {selector: "date"}; // format date only
						var formattedStartDate = locale.format(new Date(lowerBoundary), formatOptions);
						var formattedEndDate = locale.format(new Date(upperBoundary), formatOptions);
						
						if (formattedStartDate === formattedEndDate){
							// Date constraint is for a single day
							valueLabel = formattedStartDate;
						} else {
							// Date constraint is for a date range
							valueLabel = lang.replace(this._strings.DATE1_TO_DATE2, {date1: formattedStartDate, date2: formattedEndDate});
						}
					} else {					
						valueLabel = element.constraint.values[0].label ? element.constraint.values[0].label : element.constraint.values[0].id;
					}
					
					var editCallback = lang.hitch(this, function(){
						this._editProperty(element.apiConstraint);
					});
					
					var removeCallback = lang.hitch(this, function(){
						this.apiHandler.removeConstraint(JSON.stringify(element.apiConstraint));
						this.onChange({focusNode: "ecmPropertiesListAddPropertyButton"});
					});
					
					this._renderListItem(nameLabel, valueLabel, editCallback, removeCallback);
				}, this);
			}
		},
		
		_renderListItem: function(/*String*/nameLabel, /*String*/valueLabel, /*function*/editCallback, /*function*/removeCallback){
			var li = domConstruct.create("li", {}, this._contentNode);
			
			var id = registry.getUniqueId(this.declaredClass+"Item");
			
			domConstruct.create("div",{
				"class":		"lotusLeft",
				"id":			id+"_Name",
				"innerHTML":	nameLabel,
				"role":			"heading"
			}, li);
			
			domConstruct.create("div",{
				"class":		"lotusLeft lotusMeta lotusClear",
				"id":			id+"_Value",
				"innerHTML":	valueLabel
			}, li);	
			
			var actionsList = domConstruct.create("ul",{
				"class":		"lotusInlinelist lotusActions",
				"role":			"toolbar"
			}, li);
			
			/* Edit action */
			var editLi = domConstruct.create("li", {
				"class":		"lotusFirst"
			}, actionsList);
			this._renderEditButton(editLi, id+"_Name "+id+"_Value", editCallback);
			
			/* Remove action */
			var deleteLi = domConstruct.create("li", {}, actionsList);
			this._renderDeleteButton(deleteLi, nameLabel, removeCallback);
			
			new Toolbar(actionsList);
		},
		
		removeAllSelectedProperties: function(){
			// This is used by lconn.search.EcmDocumentType on removal of an EcmDocumentType facet filter
			for (var i=0; i<this._selectedProperties.length; i++){
				var element = this._selectedProperties[i];
				this.apiHandler.removeConstraint(JSON.stringify(element.apiConstraint));
			}
		}
	
	});
	
	return EcmPropertiesList;
});
