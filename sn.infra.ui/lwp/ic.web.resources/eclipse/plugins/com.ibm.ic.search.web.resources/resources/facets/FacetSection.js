/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/json",
	"dojo/on",
	"dojo/text!../templates/FacetSection.html",
	"dijit/_Widget",
	"dijit/_Templated",
	"ic-core/HelpLauncher",
	"ic-core/url",
	"../Constants"
], function (domAttr, declare, lang, domClass, domConstruct, domStyle, JSON, on, template, _Widget, _Templated, HelpLauncher, urlModule, Constants) {

	var FacetSection = declare(
		"lconn.search.facets.FacetSection",
		[_Widget, _Templated],
	{
		// The isFacetOpen and isFacetValid booleans help to enhance facets performance
		// When an XHR request is issued to get search results, the server will process 
		// and return content only for facets that are currently open (indicated by the isFacetOpen property).
		// The values in isFacetOpen are persistent. When changed, they are saved in a browser cookie, 
		// and restored from there each time searchResults.js is loaded. 
		// The isFacetValid property indicates whether the facet is already loaded with the valid content.
		// When isFacetValid is true, the XHR request should not ask for this facet's content, even when it is open.
	
		bodyDomNode:						null,							// The facet's DOM body node
		facetId:							null,							// The facet id as defined in lconn.search.Constants	
		getCategoryConstraintParameters:	function(/*String*/facetId){},	// Callback used to get current API constraints
		getQueryCategoryConstraints:		function(/*String*/facetId){},	// Callback used to get current category constraints from query
		helpLink:							null,							// The DOM node for the help link
		isFacetOpen:						true,							// When true, facet is open and twisty is expanded
		isFacetValid:						false,							// When true, facet is up to date no need to retrieve from server
		isTypeTagWidget:					true,							// When true this widget is a descendant of lconn.core.CommonTags.TagWidget
		noContentDomNode:					null,							// DOM node displayed instead of bodyDomNode if facet is empty
		performQuery:						function(/*String*/facetId, /*function*/callback){},	// Callback used to perform an API query
		strings:							null,							// Localization strings object
		templateString: template,
		twistyDomNode:						null,							// The twisty DOM node 
		updateCookie:						function(){},					// Callback used to update the facets visibility cookie
		widget:								null,							// The dojo instance of the facet (like the lconn.search.CommonTags.SearchTagWidget object)
		_twistyCollapseContent:				null,
		_twistyExpandContent:				null,
		
		buildRendering: function(){
			if (this.srcNodeRef){ 
				// Only attempt to build rendering using the template if a srcNodeRef argument was passed on construction
				this.inherited(arguments);
				
				this._updateVisibility();
				
				// Place the facet widget's DOM node inside the template's body DOM node
				domConstruct.place(this.widget.domNode,this.bodyDomNode);
					
				// Set the twisty's title according to its open status
				var twistyTitle = this.isFacetOpen ? this.strings.twistyCollapse : this.strings.twistyExpand;
				domAttr.set(this.twistyDomNode, "title", twistyTitle);
				
				// Set the twisty's content according to its open status
				this._twistyCollapseContent = document.createElement('div');
				domClass.add(this._twistyCollapseContent, 'lotusAltText');
				this._twistyCollapseContent.innerHTML = "-";
				this._twistyExpandContent = document.createElement('div');
				domClass.add(this._twistyExpandContent, 'lotusAltText');
				this._twistyExpandContent.innerHTML = "+";
				this.twistyDomNode.appendChild(this.isFacetOpen ? this._twistyCollapseContent : this._twistyExpandContent);
				
				// Handle the click event on the twisty
				this.connect(this.twistyDomNode, "onclick", lang.hitch(this, function(){
					this._toggleTwisty(true/*updateFacetWhenNotValid*/);
				}));
				
				this.helpLink = HelpLauncher.createHelpLink(this.helpLink, this.strings.title, this.strings.helpDescription, {	
					HELP: this.strings.helpLabel,
					CLOSE: this.strings.helpClose
				});
				
				// Setting the containerNode ensures destroyRecursive destroys the children
				this.containerNode = this.domNode;
			}
		},
		
		_closeFacet: function(/*boolean*/updateFacetWhenNotValid) {
			this.isFacetOpen = false;
			if (updateFacetWhenNotValid) {
				this.updateCookie();
			}
		},
		
		_isFacetRequestedInUrl:function(/*String*/url){
			var isFacetRequested = false;
			var parsedUrl = urlModule.parse(url);
			var params = parsedUrl.queryParameters;
			var facets = params.facet;
			if (facets) {
				var oneFacet;
				if (lang.isArray(facets)) {
					// We will fall here when two or more facets are open
					for (var i=0; i<facets.length; i++){
						oneFacet = JSON.parse(facets[i]);
						if (oneFacet && oneFacet.id === this.facetId) {
							isFacetRequested = true;
							break;
						}
					}
				} else {
					// We will fall here when only one facet is open
					oneFacet = JSON.parse(facets);
					if (oneFacet && oneFacet.id === this.facetId) {
						isFacetRequested = true;
					}
				}
			}
			return isFacetRequested;
		},
		
		isVisible: function(){
			// summary: This function should be overridden if the facet has limited visibility, for example if it 
			// is only visible when filtered to a certain component, like the trends facet in relation to status
			// updates.
			return true;
		},
		
		_openFacet: function(/*boolean*/updateFacetWhenNotValid) {
			// summary: Called when facet's twisty is expanded for the first time
			
			this.isFacetOpen = true;
			if (updateFacetWhenNotValid) {
				this.updateCookie();
				if (!this.isFacetValid) {
					if (this.widget && this.widget.showLoading){
						this.widget.showLoading();
					}
								
					var callback = lang.hitch(this,function(data, evt){
						return this.updateWidget(evt.url);
					});
					
					this.performQuery(this.facetId, callback);
				}
			}
		},
		
		_updateVisibility:function(){
			//summary: Some facet widgets needs to be hidden in certain circumstances (for example, the Trend facet)
			if (this.domNode && domAttr.get(this.domNode, "class") === "lotusSection"){
				if(this.isVisible()){
					domStyle.set(this.domNode, "display", "");
				} else{
					domStyle.set(this.domNode, "display", "none");
				}
			}
		},
		
		_toggleTwisty:function(/*boolean*/updateFacetWhenNotValid) {
			if (this.domNode && this.twistyDomNode && this.bodyDomNode){
				if(domStyle.get(this.bodyDomNode, "display")==="none") {
					
					domStyle.set(this.bodyDomNode, "display", "");
					
					domClass.remove(this.twistyDomNode,"lotusTwistyClosed");
					domClass.add(this.twistyDomNode,"lotusTwistyOpen");
					domAttr.set(this.twistyDomNode, "title", this.strings.twistyCollapse);
					if (this.twistyDomNode.contains(this._twistyExpandContent)) {
						this.twistyDomNode.removeChild(this._twistyExpandContent);
					}
					this.twistyDomNode.appendChild(this._twistyCollapseContent);
					
					this._openFacet(updateFacetWhenNotValid);				
					
					domAttr.set(this.domNode, "aria-expanded", "true");
				} else {
					domStyle.set(this.bodyDomNode, "display", "none");
					
					domClass.remove(this.twistyDomNode,"lotusTwistyOpen");
					domClass.add(this.twistyDomNode,"lotusTwistyClosed");
					domAttr.set(this.twistyDomNode, "title", this.strings.twistyExpand);
					if (this.twistyDomNode.contains(this._twistyCollapseContent)) {
						this.twistyDomNode.removeChild(this._twistyCollapseContent);
					}
					this.twistyDomNode.appendChild(this._twistyExpandContent);
					
					this._closeFacet(updateFacetWhenNotValid);			
					
					domAttr.set(this.domNode, "aria-expanded", "false");
				}
			}
		},
		
		updateTwisty:function() {
			if (this.twistyDomNode && this.bodyDomNode){
				// Only update twisty if we have references to twisty DOM nodes
				var isFacetOpenInDOM = domClass.contains(this.twistyDomNode, "lotusTwistyOpen");
				if (this.isFacetOpen !== isFacetOpenInDOM) {
					// Note: This is called from searchResults.js setup via the FacetsManager
					// Accordingly we set updateWhenFacetIsInvalid to "false", 
					// i.e. do not get facet's contents from server
					this._toggleTwisty(false/*updateWhenFacetIsInvalid*/);
				}
			}
		},
		
		updateWidget: function(/*String*/url, /*boolean*/isSearchError){
			if (this.widget){	
				
				this._updateVisibility();
	
				if(this.isFacetOpen && this.bodyDomNode && this.noContentDomNode) {
					// Check above for if DOM nodes exist is to handle use case for if rendering was not built using the template.
					if (isSearchError) {
						domStyle.set(this.bodyDomNode, "display", "none");
						domStyle.set(this.noContentDomNode, "display", "");
						return;
					} else {
						domStyle.set(this.bodyDomNode, "display", "");
						domStyle.set(this.noContentDomNode, "display", "none");
					}
				}
				
				var isRequested = this._isFacetRequestedInUrl(url);
				if (isRequested){
					this.isFacetValid = true;
					
					if (this.isTypeTagWidget){
						// Tag type facet widgets (eg Tag, Trend, EcmDocumentType) need to be passed selectedTags before reload
						this.widget.selectedTags = "";
						var selectedTagsArray = [];
						var items = this.getQueryCategoryConstraints(this.facetId);
						if (items && items.length>0){
							for (var i=0; i<items.length; i++){
								var values = items[i].values;
								for (var j=0; j<values.length; j++){
									var id = values[j].id;
									var indexOfSlash = id.indexOf("/");
									var startOffset = indexOfSlash === 0 ? 0 : indexOfSlash+1;
									selectedTagsArray.push(id.substr(startOffset));
								}
							}
						}
						this.widget.setSelectedTags(selectedTagsArray);
						this.widget.reload();
					} else if (this.facetId === Constants.FacetIds.DATE){
						// Date facet widget's update method needs to be passed the category constraints
						var dateParameters = this.getCategoryConstraintParameters(this.facetId);
						this.widget.update(dateParameters);
					} else {			
						this.widget.update();
					}
				}
			}
		}
	
	});
	
	return FacetSection;
});
