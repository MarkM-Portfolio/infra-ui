/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-core/CommonTags/AjaxCall"
], function (declare, lang, AjaxCall) {

	var AjaxCallProxy = declare(
		"lconn.search.facets.AjaxCallProxy",
		AjaxCall, 
	{
		HANDLE_AS:					"json",													// No need to parse data via the feed converter
		
		facetId:					null,													// The facet id
		getDisplayName:				function(/*String*/name){},								// Callback function to get the facet display name
		getFacetValues:				function(/*String*/facetId){},							// Callback function to get the facet values fragment from the data store
		getQueryCategoryConstraints:function(/*String*/facetId){},							// Callback function to get the category constraints from the data store
		rejectTag:					function(/*String*/tagName, /*String*/selectedTag){},	// Callback function to check if the tag should be rejected
		
		constructor: function(/*Object*/args){
			lang.mixin(this, args);
		},
			
		getTags: function(/*function*/callBack, /*boolean*/isFirstLoad, /*String*/selectedTags) {
			var tags = [];
			this.addSelectedTags(tags);
			this.addTagsFromFacet(tags,selectedTags);
			
			callBack.call(null,tags);
		},
		
		addSelectedTags: function(tags){
			var items = this.getQueryCategoryConstraints(this.facetId);
			if (items && items.length>0){
				for (var i=0; i<items.length; i++){
					var values = items[i].values;
					for (var j=0; j<values.length; j++){
						
						var id = values[j].id;
						var originalName = values[j].label;
						
						var displayName = this.getDisplayName(originalName);
	
						var tag = {};
						
						tag.id = this.stripPrefix(id);
						tag.name = originalName;
						tag.displayName = displayName;
						tag.frequency = -1;
						
						if (tag.name){
							tags.push(tag);
						}
					}
				}
			}
			
		},
		
		addTagsFromFacet: function(tags, selectedTags){
			var facetTags = this.getFacetValues(this.facetId);
			if (!facetTags){
				return;
			}
			var selectedTagName = this.getNameById(facetTags, selectedTags);
			
			for (var i = 0; i < facetTags.length; i++) {
				var facetTag = facetTags[i];
	
				var id = facetTag.getAttribute("id");
				var weight = facetTag.getAttribute("weight");
				var originalName = facetTag.getAttribute("label");
				
				if (selectedTagName && this.rejectTag(originalName, selectedTagName)){
					continue;
				}
				var displayName = this.getDisplayName(originalName);
				
				var facetTag = {};
				
				facetTag.name = originalName;
				facetTag.displayName = displayName;
				facetTag.frequency = parseInt(weight,10);
				facetTag.id = this.stripPrefix(id);
				
				if (facetTag.name){
					tags.push(facetTag);
				}
			}
		},
		
		stripPrefix: function(/*String*/id){
			// All facet value ids are of the format "facetKey/id"
			// like Tag/green, EcmDocumentType/1002.... etc.
			var indexOfSlash = id.indexOf("/");
			var startOffset = indexOfSlash === 0 ? 0 : indexOfSlash+1;
			return id.substr(startOffset);
		},
		
		getNameById: function(/*String*/tagValues, /*String*/selectedTagId){
			if(tagValues && selectedTagId){
				for (var i = 0; i < tagValues.length; i++) {
					var tagId = this.stripPrefix(tagValues[i].getAttribute("id"));
					if (selectedTagId === tagId){
						return tagValues[i].getAttribute("label");
					}
				}
			}
		}
	});
	
	return AjaxCallProxy;
});
