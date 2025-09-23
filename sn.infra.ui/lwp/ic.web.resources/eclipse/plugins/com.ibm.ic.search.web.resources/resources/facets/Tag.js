/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/query",
	"ic-core/CommonTags/TagWidget", //defines lconn.core.CommonTags.TagTransform
	"./AjaxCallProxy"
], function (declare, lang, aspect, dom, domAttr, domClass, query, TagWidget, AjaxCallProxy) {

	var TagTransform = lang.getObject("lconn.core.CommonTags.TagTransform");
	var Tag = declare(
		"lconn.search.facets.Tag",
		TagWidget,
	{	
		facetId:						"Tag",				// Could also be Trend or EcmDocumentType
		getDisplayName:					function(){},		// Callback function to get the facet display name
		getFacetValues:					function(){},		// Callback function to get the facet values fragment from the data store
		getQueryCategoryConstraints:	function(){},		// Callback function to get the category constraint values from the data store
		loadOnStartup:					false,				// Set to false as we don't want CommonTags.TagWidget to attempt to load on instantiation 
		onSelect:						function(){},		// Callback function to execute when a tag is added to the selected tags
		onDeselect:						function(){},		// Callback function to execute when a tag is removed from the selected tags
		redirectWhenClickTag:			false,				// Set to false if we don't want CommonTags.TagWidget to force the page to redirect once the user clicks on a tag
		rejectTag:						function(){},		// Callback function to allow implementers to reject tags
		
		postMixInProperties :function(){
			this.inherited(arguments);
			
			this.ajaxCall = new AjaxCallProxy({
				facetId: this.facetId, 
				getFacetValues: this.getFacetValues, 
				getQueryCategoryConstraints: this.getQueryCategoryConstraints, 
				getDisplayName: this.getDisplayName,
				rejectTag: this.rejectTag});
		},
		
		buildRendering: function(){
			this.inherited(arguments);
			
			// Remove search box
			query("a",this._tagSearchText).style("display","none");
			query("form",this._tagSearchForm).style("display","none");
		
			// Remove slider and any other obsolete UI elements only for Tag facet itself, not other facets which extend this widget
			if (this.facetId === "Tag" && this.srcNodeRef){
				// Get placeholder dom node (necessary for Wikis)
				var placeholderDomNode = dom.byId(domAttr.get(this.srcNodeRef, "id"));
				if (placeholderDomNode && placeholderDomNode.parentNode) {
					var containerParent = placeholderDomNode.parentNode;
					var nodeList = containerParent.childNodes;
					while (nodeList.length > 1) {
						for (var i=0; i < nodeList.length; i++) {
							if (nodeList[i] !== placeholderDomNode) {
								containerParent.removeChild(nodeList[i]);
							}
						}
					}
				}
			}
		},
		
		postCreate: function() {
			this.inherited(arguments);
				
			// update search results when tag widget changes
			aspect.after(this, "_addSelectedTag", this.onSelect, true);
			aspect.after(this, "_removeSelectedTag", this.onDeselect, true);
		},
		
		_createTypeAhead: function(){
			// Override lconn.core.CommonTags.TagWidget._createTypeAhead so that type ahead is not created.
		},
		
		focus: function(){
			var filters = query("a", this.domNode);
			if (filters && filters.length > 0){
				filters[0].focus();
			}
		},
		
		reviseName: function(originalName){
			return originalName;
		},
		
		showLoading:function() {
			domClass.add(this._noTags, "lotusHidden");				// Erases the "No tags yet" content when relevant
			domClass.add(this._normalTagsSection, "lotusHidden");	// Erases the previous tags when relevant 
			domClass.remove(this._loadTags, "lotusHidden");		// Displays the load icon+"Load Content"
		},
		
	
		// Following methods "_addSelectedTag" and "prepareData",
		// override lconn.core.CommonTags.TagWidget methods in order to support tags with spaces for Search (EL)
		// Due to release constraints (August 2013), most code below is a copy of the methods in TagWidget,
		// since it was decided NOT to touch the core widget TagWidget to avoid full regression test on all 
		// widgets inheriting from TagWidget.
		// The leading "_" in the name of "_addSelectedTag" implies that this method in TagWidget is "private".
		// Keeping this name, though now it is called from outside TagWidget as well, 
		// is a bad practice, but again in order to avoid any changes in the core widget TagWidget, 
		// the name was not changed (i.e. leading underscore was not removed).
		// These logic must be refactored in NEXT+1
		
		_addSelectedTag: function(tag) {
			if (!tag)
				return;
			var newTags = [tag];
			// all below is copy of method from parent class
			var allSelected = [];
	       
			if (this.multiSelected == true) {
				allSelected = this._selectedTagsArr || [];
				for (var p=0; p<newTags.length; p++) {	    	  
					if (!newTags[p] || TagTransform.existsInRelatedTags(newTags[p], allSelected)) {
						continue;
					}
					allSelected.push(newTags[p]);
				}
			} else {
				for (var p=0; p<newTags.length; p++) {	    	  
					if (!newTags[p]) {
						continue;
					}
					allSelected.push(newTags[p]);
				}   
			}
	         
			if (allSelected.length > 0) {
				this._selectedTagsArr = allSelected;
				this.selectedTags = this._selectedTagsArr.join(' ');
	
				if (this.redirectWhenClickTag == false)
					this.reload(false);
				else
					this.ajaxCall.redirect(this.selectedTags);
			} else {
				this.updateView();
			}
		},
		   
		prepareData:function() {
			if (this.facetId === "Tag") {
				// Widgets supporting tags with spaces must ensure that _selectedTagsArr is always being
				// setup from constraints, and never from selectedTags, as the super method does
				if (this._selectedTagsArr === null) {
					this._selectedTagsArr = new Array();
				}
				this._selectedTagsArr = this._selectedTagsArr.sort();
				this.selectedTags = this._selectedTagsArr.join(' ');
			} else {
				this.inherited(arguments);
			}
	    }
	
	});
	
	return Tag;
});
