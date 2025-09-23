/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/dom-style",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/i18n!../nls/EcmDocumentType",
	"dojo/aspect",
	"dojo/dom-attr",
	"dojo/_base/array",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/query",
	"dojo/string",
	"dijit/form/HorizontalSlider",
	"ic-core/CommonTags/TagWidget", //defines lconn.core.CommonTags.TagTransform
	"./EcmPropertiesList",
	"./Tag"
], function (domStyle, declare, lang, i18nEcmDocumentType, aspect, domAttr, array, domConstruct, on, query, string, HorizontalSlider, TagWidget, EcmPropertiesList, Tag) {
	
	var TagTransform = lang.getObject("lconn.core.CommonTags.TagTransform");
	
	var EcmDocumentType = declare(
		"lconn.search.facets.EcmDocumentType",
		Tag,
	{
	
		DEFAULT_VISIBILITY:		10,
		MIN_ITEMS_FOR_SLIDER:	2,
		
		apiHandler:				null,				// An instance of lconn.search.searchAPI
		facetId:				"EcmDocumentType",	
		getConstraints:			function(){},		// Callback function to get the query constraints from the data store.
		multiSelected:			false,				// Don't allow selecting more than one ECM document type
		onPropertiesChange:		function(){},		// Callback to execute on properties list change, eg to update the search results
		_propertiesList:		null,				// An instance of lconn.search.EcmPropertiesList
		_slider:				null,				// An instance of dijit.form.HorizontalSlider 
		tagListCount:			100,				// Maximum size of list. Slider allows control, so we can ask for a long list.
		_viewType:				"list",				// Sets the current view to the list in lconn.core.CommonTags.TagWidget
		_visibility:			null,				// Visibility - controlled by slider.
	
		postMixInProperties: function(){
			this.inherited(arguments);
			
			// Replace all Tag facet specific strings with ECM document type facet replacements
			var strings = i18nEcmDocumentType;
			this.nls = lang.clone(this.nls);
			lang.mixin(this.nls, strings);
		},
		
		postCreate: function(){
			this.inherited(arguments);
	
			this._createSlider();
					
			// On removal of an EcmDocumentType facet filter, all selected properties should also be removed.
			aspect.after(this.apiHandler, "removeEcmDocumentType", lang.hitch(this, function(){
				if (this._propertiesList){
					this._propertiesList.removeAllSelectedProperties();
				}
			}), true);
			
			// Setting the containerNode ensures destroyRecursive destroys the children
			this.containerNode = this.domNode;
		},
		
		_createSlider: function(){
			this._slider = new HorizontalSlider({
				discreteValues:			1,
				intermediateChanges:	true,
				maximum:				1,
				minimum:				0,
				showButtons:			false,
				value:					0
			});
			
			// Set the onChange handler for the slider
			this.connect(this._slider, "onChange", lang.hitch(this, "_setVisibility"));
			
			this._hideSlider();
			
			domConstruct.place(this._slider.domNode, this.domNode, "first");		
		},
		
		getDisplayName: function(/*String*/originalName){
			// description: This method overrides lconn.core.CommonTags.TagWidget.getDisplayName. 
			//   It is used from lconn.search.facets.AjaxCallProxy.
			var ecmDocumentTypeElements = originalName.split('/');
			if(!ecmDocumentTypeElements || ecmDocumentTypeElements.length <= 0){
				return originalName;
			}
			var lastEcmDocumentTypeElement = ecmDocumentTypeElements[ecmDocumentTypeElements.length-1];
			return lastEcmDocumentTypeElement;
		},
		
		getEcmDocumentTypeIdByLabel: function(/*String*/label) {
			var id = label;
			if (this.tags) {
				for (var i=0; i<this.tags.length; i++) {
					if (label === this.tags[i].name) {
						id = this.tags[i].id;
						return id;
					}
				}
			}
			
			// Check to see if label matches a constraint
			var constraints = this.getConstraints();
			array.forEach(constraints, function(constraint){
				if (constraint.type === "category" && constraint.values && constraint.values.length > 0){
					array.forEach(constraint.values, function(constraintValue){
						if (constraintValue.label && constraintValue.id.indexOf(this.facetId+"/")===0 && constraintValue.label === label){
							id = constraintValue.id.substring(this.facetId.length+1);			
						}
					}, this);
				}
			}, this);
			
			return id;
		},
		
		getEcmDocumentTypeLabelById: function(/*String*/id) {
			var label = id;
			if (this.tags) {
				for (var i=0; i<this.tags.length; i++) {
					if (id === this.tags[i].id) {
						label = this.tags[i].name;
						return label;
					}
				}
			}
			
			// Check to see if id matches a constraint
			var categoryPath = this.facetId + "/" + id;
			var constraints = this.getConstraints();
			array.forEach(constraints, function(constraint){
				if (constraint.type === "category" && constraint.values && constraint.values.length > 0){
					array.forEach(constraint.values, function(constraintValue){
						if (constraintValue.id && constraintValue.id === categoryPath){
							label = constraintValue.label;
						}
					}, this);
				}
			}, this);
			
			return label;
		},
		
		_hideSlider: function(){
			domStyle.set(this._slider.domNode, "display", "none");
		},
	
		rejectTag: function(/*String*/currentDocumentTypeName, /*String*/selectedDocumentTypeName){
			if (!currentDocumentTypeName || !selectedDocumentTypeName){
				return false;
			}
			//if the selected document type starts with the current document, it's a parent  
			var isStartsWith = (selectedDocumentTypeName.indexOf(currentDocumentTypeName) === 0);
			var isDifferent = (selectedDocumentTypeName !== currentDocumentTypeName);
			if (isDifferent && isStartsWith){
				return true;
			}
			return false;
		},
		
		_show: function() {
			this.inherited(arguments);
			domStyle.set(this._tagListLink, "display", "none");
			domStyle.set(this._tagCloudLink, "display", "none");
		},
		
		_showSlider: function(){
			domStyle.set(this._slider.domNode, "display", "");
		},
		
		updateView: function(){
			this.inherited(arguments);
			
			if (this._propertiesList){
				this._propertiesList.destroy();
			}
			
			if (this.selectedTags!==''){
				var selectedDocumentTypeId = this.getEcmDocumentTypeIdByLabel(this.selectedTags);
				
				this._propertiesList = new EcmPropertiesList({
					apiHandler:			this.apiHandler,
					documentType:		selectedDocumentTypeId,
					getConstraints:		lang.hitch(this, "getConstraints"),
					onChange:			this.onPropertiesChange
				});
				domConstruct.place(this._propertiesList.domNode, this.domNode, "last");
			}
	
			this._setVisibility(this.DEFAULT_VISIBILITY);
			this._updateSlider();
		},
		
		_setVisibility:function(/*Number*/visibility) {
			// summary: Called when the slider changes, updates the list with the new visibility setting
			if(this._tagListView) {
				var as = query('li', this._tagListView);
				
				if (visibility<as.length){
					this._visibility = visibility;
				} else {
					this._visibility = as.length;
				}
				
				for(var i=0;i<as.length;i++) {
					domStyle.set(as[i], "display", (i<this._visibility) ? "" : "none");
				}
			}
		},
		
		_updateSlider:function() {
			// summary: Updates the maximum of the slider 
			domAttr.set(this._slider.domNode, "role", "presentation");
			var listItems = query('li', this._tagListView);
			if (listItems){
				this._slider.minimum = 0;
				this._slider.maximum = Math.max(listItems.length,2);
				this._slider.set("value",this._visibility);
			}
			this._hideSlider();
			if (!this.selectedTags && this._visibility >= this.MIN_ITEMS_FOR_SLIDER){
				this._showSlider();
			}
				
		},
	
		renderTag: function(a, tag) {
			a.title = string.substitute(this.nls.rs_addTagTitle, [tag.displayName,tag.frequency]);
			this.connect(a, "click", lang.hitch(this, "_addSelectedTagFromEvent", tag.id));
		},
	    
		existsInRelated: function(tag) {
			return (TagTransform.existsInRelatedTags(tag.id,this._selectedTagsArr));
		},
		
		findTag : function(selectedTag){
			if (selectedTag && this.tags){
				var length = this.tags.length;
				for (var i=0; i<length; i++) {
					var currentTag = this.tags[i];
					if (currentTag.id === selectedTag){
						return currentTag;
					}
				}
			}
			return null;
		}
	
	});
	
	
	return EcmDocumentType;
});
