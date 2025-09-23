/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/cookie",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/i18n!../nls/FacetsManager",
	"dojo/json",
	"dijit/_Widget",
	"../Constants",
	"./Date",
	"./EcmDocumentType",
	"./FacetSection",
	"./Person",
	"./Tag",
	"./Trend"
], function (declare, lang, cookie, dom, domConstruct, i18nFacetsManager, JSON, _Widget, Constants, Date, EcmDocumentType, FacetSection, Person, Tag, Trend) {

	var FacetsManager = declare(
		"lconn.search.facets.FacetsManager",
		_Widget,
	{
		
		FACETS_VISIBILITY_COOKIE: "lconn.search.searchResults.facetsVisibility",
		
		apiHandler:		null,			// An instance of lconn.search.searchAPI
		dataStore:		null,			// An instance of lconn.search.searchData
		facets:			{},				// Array of lconn.search.facets.FacetSection instances
		results:		null,			// The instance of lconn.search.searchResults
		_strings:		i18nFacetsManager,
		
		buildRendering: function(){
			if (this.srcNodeRef){ 
				
				// Remove any existing child DOM nodes 
				domConstruct.empty(this.srcNodeRef);
				
				// Only attempt to build rendering using the template if a srcNodeRef argument was passed on construction
				this.inherited(arguments);
				
				var facetId;
			
				// If no facets specified, assume all facets should be displayed in default configuration.
				if (!this.facets){
					this.facets = {};
					for (var property in Constants.FacetIds) {
						if (Constants.FacetIds.hasOwnProperty(property)){
							facetId = Constants.FacetIds[property];
							this.facets[facetId] = {};
							// Facets should be closed by default
							this.facets[facetId].isFacetOpen = false;
						}
					}
				}
				
				// Create section DOM node for each facet.
				for (var i=0; i<Constants.FacetOrder.length; i++){
					facetId = Constants.FacetOrder[i];
					if (this.facets.hasOwnProperty(facetId)){
						this.facets[facetId].sectionDomNode = domConstruct.create("div", {}, this.domNode);
					}
				}
				
				// Setting the containerNode ensures destroyRecursive destroys the children
				this.containerNode = this.domNode;
			}
		},
		
		postCreate: function(){
			if (this.facets){
				for (var facetId in this.facets) {
					if (this.facets.hasOwnProperty(facetId)){
						this._createFacet(facetId);
					}
				}
				
				this._updateFacetsOpenStatesFromCookie();
			}
		},
	
		_createFacet: function(/*String*/facetId) {
			// summary: Using the facets object passed as an argument to the constructor as a base, builds up
			// the arguments for lconn.search.facets.FacetSection.constructor.
			
			var sectionDomNode = dom.byId(this.facets[facetId].sectionDomNode);
			var widgetDomNode = dom.byId(this.facets[facetId].widgetDomNode);
			
			if (widgetDomNode === sectionDomNode){
				// These two variables should never refer to the same DOM node.
				this.sectionDomNode = null;
			}
			
			if (sectionDomNode || widgetDomNode) {
				var args = lang.mixin(this.facets[facetId],{
					facetId:							facetId,
					getCategoryConstraintParameters:	lang.hitch(this,"_getCategoryConstraintParameters"),
					getQueryCategoryConstraints:		lang.hitch(this,"getQueryCategoryConstraints"),
					performQuery:						lang.hitch(this,"_performQuery"),
					strings:							this._strings,
					updateCookie:						lang.hitch(this,"_updateFacetsVisibilityCookie", facetId)
				});
	
				switch(facetId) {
				
					case Constants.FacetIds.TAG:
						lang.mixin(args, {
							strings:			{
													helpClose:			this._strings.CLOSE_HELP_TAG,
													helpDescription:	this._strings.DESCRIPTION_TAG,
													helpLabel:			this._strings.HELP_TAG,
													noContent:			this._strings.NO_TAG_CONTENT,
													title:				this._strings.TITLE_TAG,
													twistyCollapse:		this._strings.COLLAPSE_TAG,
													twistyExpand:		this._strings.EXPAND_TAG
												},
							widget:				new Tag({
													getFacetValues:		lang.hitch(this.dataStore,"getFacetValuesFragment"),
													getQueryCategoryConstraints: 
														lang.hitch(this.dataStore,"getQueryCategoryConstraints"),
													onSelect:			lang.hitch(this.results,"performTagFilter"),
													onDeselect:			lang.hitch(this.results,"removeTagFilter")
												}, widgetDomNode)
						});
						break;
						
					case Constants.FacetIds.DATE:
						lang.mixin(args, {
							isTypeTagWidget:	false, // default is true
							strings:			{
													helpClose:			this._strings.CLOSE_HELP_DATE,
													helpDescription:	this._strings.DESCRIPTION_DATE,
													helpLabel:			this._strings.HELP_DATE,
													noContent:			this._strings.NO_DATE_CONTENT,
													title:				this._strings.TITLE_DATE,
													twistyCollapse:		this._strings.COLLAPSE_DATE,
													twistyExpand:		this._strings.EXPAND_DATE
												},
							widget:				new Date({
													dateTransform:		lang.hitch(this.dataStore,"dateTransform")
												}, widgetDomNode)
						});
						break;
						
					case Constants.FacetIds.PERSON:
						lang.mixin(args, {
							isTypeTagWidget:	false, // default is true
							strings:			{
													helpClose:			this._strings.CLOSE_HELP_PERSON,
													helpDescription:	this._strings.DESCRIPTION_PERSON,
													helpLabel:			this._strings.HELP_PERSON,
													noContent:			this._strings.NO_PERSON_CONTENT,
													title:				this._strings.TITLE_PERSON,
													twistyCollapse:		this._strings.COLLAPSE_PERSON,
													twistyExpand:		this._strings.EXPAND_PERSON
												},
							widget:				new Person({
													peopleTransform:	lang.hitch(this.dataStore,"peopleTransform"),
													personSlider:		args.slider
												}, widgetDomNode)
						});
						break;
						
					case Constants.FacetIds.TREND:
						lang.mixin(args, {
							isVisible:			lang.hitch(this,function(){
													return this.apiHandler.getComponentFilter() === "status_updates";
												}),
							strings:			{
													helpClose:			this._strings.CLOSE_HELP_TREND,
													helpDescription:	this._strings.DESCRIPTION_TREND,
													helpLabel:			this._strings.HELP_TREND,
													noContent:			this._strings.NO_TREND_CONTENT,
													title:				this._strings.TITLE_TREND,
													twistyCollapse:		this._strings.COLLAPSE_TREND,
													twistyExpand:		this._strings.EXPAND_TREND
												},
							widget:				new Trend({
													getFacetValues:		lang.hitch(this.dataStore,"getFacetValuesFragment"),
													getQueryCategoryConstraints: 
														lang.hitch(this.dataStore,"getQueryCategoryConstraints"),
													onSelect:			lang.hitch(this.results,"performTrendFilter"),
													onDeselect:			lang.hitch(this.results,"removeTrendFilter")
												}, widgetDomNode)
	
						});
						break;
						
					case Constants.FacetIds.ECM_DOCUMENT_TYPE:
						lang.mixin(args, {
							isVisible:			lang.hitch(this,function(){
													var componentFilter = this.apiHandler.getComponentFilter();
													return componentFilter === "all_files" || componentFilter === "ecm_files";
												}),
							strings:			{
													helpClose:			this._strings.CLOSE_HELP_ECM_DOCUMENT_TYPE,
													helpDescription:	this._strings.DESCRIPTION_ECM_DOCUMENT_TYPE,
													helpLabel:			this._strings.HELP_ECM_DOCUMENT_TYPE,
													noContent:			this._strings.NO_ECM_DOCUMENT_TYPE_CONTENT,
													title:				this._strings.TITLE_ECM_DOCUMENT_TYPE,
													twistyCollapse:		this._strings.COLLAPSE_ECM_DOCUMENT_TYPE,
													twistyExpand:		this._strings.EXPAND_ECM_DOCUMENT_TYPE
												},
							widget:				new EcmDocumentType({
													apiHandler:			this.apiHandler,
													getConstraints:		lang.hitch(this.dataStore,"getQueryConstraintsAsObjects"),
													getQueryCategoryConstraints: 
														lang.hitch(this.dataStore,"getQueryCategoryConstraints"),
													getFacetValues:		lang.hitch(this.dataStore,"getFacetValuesFragment"),
													onDeselect:			lang.hitch(this.results,"removeEcmDocumentTypeFilter"),
													onPropertiesChange:	lang.hitch(this.results,"update"),
													onSelect:			lang.hitch(this.results,"performEcmDocumentTypeFilter")
												}, widgetDomNode)
						});
						break;
				}
				
				this.facets[facetId] = new FacetSection(args, sectionDomNode);
			}
		},
		
		_getCategoryConstraintParameters: function(/*String*/facetId){
			// summary: Used by lconn.search.facets.FacetSection to get current API constraints
			return this.apiHandler.getCategoryConstraintParameters(facetId);
		},
		
		getQueryCategoryConstraints: function(/*String*/facetId){
			return this.dataStore.getQueryCategoryConstraints(facetId);
		},
		
		_getFacetsVisibilityCookie:function(facetId) {
			var objectFromCookie = null;
			if (cookie.isSupported()) {
				var cookieName = this.FACETS_VISIBILITY_COOKIE + "." + facetId;
				// following line in comment is for debug purposes, remove comment to clear the cookie
				//dojo.cookie(cookieName, null, {expires : -1});
				var facetsCookie = cookie(cookieName);
				if (facetsCookie){
					objectFromCookie = JSON.parse(facetsCookie);
				}
			}
			return objectFromCookie;
		},
		
		getOpenInvalidFacets: function(/*boolean*/invalidateFacets){
			// summary: Used by lconn.search.searchResults._update to determine which facets to request.
			
			var openInvalidFacets = [];
			for (var facetId in this.facets) {
				if (this.facets.hasOwnProperty(facetId)){
					var facetSection = this.facets[facetId];
					
					if (invalidateFacets) {
						facetSection.isFacetValid = false;
					}
					
					if (facetSection.widget && !facetSection.isFacetValid && facetSection.isFacetOpen && facetSection.isVisible()){
						openInvalidFacets.push(facetId);
					} 
				}
			}
			return openInvalidFacets;
		},
		
		getWidget: function(/*String*/facetId) {
			if (this.facets && this.facets.hasOwnProperty(facetId)){
				var facetSection = this.facets[facetId];
				if (facetSection && facetSection.widget){
					return facetSection.widget;
				} 
			}
			return null;
		},
		
		_performQuery: function(/*String*/facetId, /*function*/callback){
			// summary: Used by lconn.search.facets.FacetSection to perform API queries
			var isPublic = this.apiHandler.publicSearch;
			var url = this.apiHandler.getFacetAPI(facetId);	
			this.dataStore.performQuery(isPublic, url, callback);
		},
		
		_updateFacetsOpenStatesFromCookie:function() {
			
			for (var facetId in this.facets) {
				// When cookie exists, we override each facet's open state from the cookie
				var facetCookieObject = this._getFacetsVisibilityCookie(facetId);
				var facetSection = this.facets[facetId];
				if (facetCookieObject) {
					if (facetSection.twistyDomNode && facetSection.bodyDomNode){
						// Only update based on cookie if we have references to twisty DOM nodes
						facetSection.isFacetOpen = facetCookieObject.isFacetOpen;
					}
				}
				facetSection.updateTwisty();
			}
		},
		
		_updateFacetsVisibilityCookie:function(facetId) {
			// summary: Used by lconn.search.facets.FacetSection to update the facets cookie
			if (cookie.isSupported() && facetId) {
				var facetsOpenState = {};
				if (this.facets.hasOwnProperty(facetId)){
					var facetSection = this.facets[facetId];
					facetsOpenState.isFacetOpen = facetSection.isFacetOpen;
				}
				var jsonPref = JSON.stringify(facetsOpenState);
				var cookieName = this.FACETS_VISIBILITY_COOKIE + "." + facetId;
				cookie(cookieName, jsonPref, {expires : 1});
			}
		},
		
		update:function(/*String*/url, /*boolean*/isSearchError) {
			// summary: Update each of the facets
			var facetId;
			for (facetId in this.facets) {
				if (this.facets.hasOwnProperty(facetId)){
					var facetSection = this.facets[facetId];
					facetSection.updateWidget(url, isSearchError);
				}
			}
		}
	
	});
	
	return FacetsManager;
});
