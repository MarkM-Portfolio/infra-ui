/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/json",
	"dojo/topic",
	"ic-core/url",
	"ic-core/config/features",
	"./Constants"
], function (arrayModule, declare, lang, JSON, topic, urlModule, has, Constants) {

	var searchAPI = declare(
		"lconn.search.searchAPI",
		null,
	{
		// summary:
		//		This object is for handling the changes to the API urls.
		//		For example, pass it the tag to filter by, the person to filter by
		//		or the date to filter by to alter the API call.
		
		/* Constants */
		PUBLIC_API_URL:					"/atom/search",				// Search results feed public content API URL
		PRIVATE_API_URL:				"/atomfba/mysearch",		// Search results feed public and private content API URL
		SEARCH_TAG_CHANGED_TOPIC:		"search/tag/changed",		// Topic for tag changes
		SEARCH_PERSON_CHANGED_TOPIC:	"search/person/changed",	// Topic for person changes
		
		/* Instance variables */
		contextRoot:		null,					// The context root for the API
		_page:				1,						// Currently selected page
		_pageSize:			10,						// Currently selected page size
		publicSearch:		true,					// Whether the public or private search is currently selected
		queryString:		null,					// Query string (or request parameters)
		_queryTerm:			"",						// Current query term
		_sortOrder:			null,					// Currently selected sort order
		_sortKey:			null,					// Currently selected sort key
		_personalization:	null,
		_limitResults:		null,
		
		constructor: function(/*Object*/args){
			// summary: 'args' should be an object with contextRoot, publicSearch and queryString attributes.
			lang.mixin(this, args);
			
			if (this.queryString === "null"){
				// This happens due to GET parameter access
				this.queryString="?";
			} else {
				this.queryString=this.parseQueryString(this.queryString);
			}
		},
		
		_escapeCategoryConstraintValue: function(/*String*/unescaped){
			var regex = new RegExp("/","g");
			var escaped = unescaped.replace(regex,"\\/");
			return escaped;
		},
	
		_unescapeCategoryConstraintValue: function(/*String*/escaped){
			var regex  = new RegExp("\\\\/","g");
			var unescaped = escaped.replace(regex,"/");
			return unescaped;
		},
		
		parseQueryString: function(/*String*/qString) {	
			// Handles the null or empty string case
			var url = urlModule.parse(qString || "?");
		
			var params = url.queryParameters;
	
			// Component parameter is deprecated but supported for now
			if (params.component && !params.scope){
				params.scope = params.component;
				delete params.component;
			}
			
			// Filter empty scopes
			if (params.scope && lang.isArray(params.scope)){
				params.scope = arrayModule.filter(params.scope, function(item){
					return item !== '';
				});
				if (params.scope.length === 1){
					params.scope = params.scope[0];
				}
			}
			
			// Extract the data we need
			this._queryTerm		= params.query || "";
			this._sortKey		= params.sortKey || null;
			this._sortOrder		= params.sortOrder || null;
			this._pageSize		= params.pageSize || 10;
			this._page			= params.page || 1;
			this._parsePersonalization(params.personalization);
			
			
			// Default sort for status updates is date descending
			if (params.scope && params.scope === 'status_updates' && !this._sortKey){
				this._sortKey = 'date';
				this._sortOrder = 'desc';
			}
			
			// Clear data we have stored in instance variables
			delete params.sortKey;
			delete params.sortOrder;
			delete params.page;
			delete params.pageSize;
			delete params.personalization;
			
			// Clear data we don't want
			delete params.debug;
			delete params.x;
			delete params.y;
			delete params.searchNodesearchInput_textbox;
			delete params.commonSearchControlDivsearchInput_textbox;
		
			url=urlModule.write(url);
			if (url===""){
			return "?query=";
			} else {
				return url;
			}
		},
		
		_parsePersonalization: function(value) {
			this._personalization = {
				type: "personalContentBoost",
				value: "on"
			};
			this._limitResults = {
				type: "limitTotalResults",
				value: "on"
			}
			if(value instanceof Array) {
				for(var i=0; i < value.length; i++) {
					var pers = JSON.parse(decodeURIComponent(value[0]));
					if(pers.type == "personalContentBoost") {
						this._personalization = pers;
					} else if(pers.type == "limitTotalResults") {
						this._limitResults = pers;
					}
				}
			} else if(value) {
				var pers = JSON.parse(decodeURIComponent(value));
				if(pers.type == "personalContentBoost") {
					this._personalization = pers;
				} else if(pers.type == "limitTotalResults") {
					this._limitResults = pers;
				}
			}
		},
		
		getFacetAPI: function(/*String*/facetId) {
			// returns: The url string for the facet API call for the specified facet
			return this.getCombinedAPI(this.publicSearch, [facetId], 0);
		},
		
		getDateFacetAPI: function(/*boolean*/isPublic) {
			// returns: The url string for the Date facet API call
			return this.getFacetAPI(Constants.FacetIds.DATE);
		},
		
		getPersonFacetAPI: function(/*boolean*/isPublic) {
			// returns: The url string for the Person facet API call
			return this.getFacetAPI(Constants.FacetIds.PERSON);
		},
		
		getTagFacetAPI: function(/*boolean*/isPublic) {
			// returns: The url string for the Tag facet API call
			return this.getFacetAPI(Constants.FacetIds.TAG);
		},
		
		getTrendFacetAPI: function(/*boolean*/isPublic) {
			// returns: The url string for the Trend facet API call
			return this.getFacetAPI(Constants.FacetIds.TREND);
		},
	
		getSearchResultsAPI: function(/*boolean*/isPublic) {
			// returns: The url string for the Search API call
			return this.getCombinedAPI(isPublic, [], this._pageSize);
		},
	
		getCombinedAPI: function(/*boolean?*/isPublic, /*String[]?*/requestedFacets, /*int?*/pageSize) {
			// The pageSize argument is optional. If not specified, the current page size is used instead.
			// returns: The url string for the combined API
	
			var requestedPageSize = this._pageSize;
			if (pageSize || pageSize === 0) {
				requestedPageSize = pageSize;
			}
			
			var url;
			if(isPublic) {
				url = urlModule.parse(this.contextRoot + this.PUBLIC_API_URL + this.queryString);
			} else {
				url = urlModule.parse(this.contextRoot + this.PRIVATE_API_URL + this.queryString);
			}
			
			var facet = [];
			if (requestedFacets){
				for (var i=0; i<requestedFacets.length; i++) {
					var facetId = requestedFacets[i];
					// Note that the value 50 for the "count" property is the default as facets whose 
					// widget inherits from the CommonTags.TagWidget (which is all of them except the 
					// Date and Person facet widgets) can not display more items than this due to a 
					// hard coded limit in that base class.
					switch(facetId) {
						case Constants.FacetIds.DATE:
							facet.push(JSON.stringify({ id: facetId, count: 90, depth: 2 }));
							break;
						case Constants.FacetIds.PERSON:
							facet.push(JSON.stringify({ id: facetId, count: 100 }));
							break;
						default:
							facet.push(JSON.stringify({ id: facetId, count: 30 }));
							break;
					}
				}
			}
			
			var params = url.queryParameters;
			params.personalization = JSON.stringify(this._personalization);
			if(has("search-pagination-limit-ui")) {
				params.personalization = [params.personalization, JSON.stringify(this._limitResults)];
			}
			params.sortKey = this._sortKey;
			params.sortOrder = this._sortOrder;
			params.page = this._page;
			params.pageSize = requestedPageSize;
			params.facet = facet;
			
			var componentFilter = this.getComponentFilterFull();
			if (!componentFilter || componentFilter==="communities" || componentFilter==="communities:content"){
				params.promoteStatusUpdates = 1;
			}
			
			return urlModule.write(url);
		},
	
		getParameterString: function() {
			// returns: the parameter string used by the apis
			return this.queryString;
		},
		
		getConstraintParametersAsObjects: function() {
			// returns: a object array of the constraint parameters present 
			//			an empty array if none are present
			var constraints = this.getConstraintParametersAsStrings();
			var values = [];
			
			var constraint; 
			arrayModule.forEach(constraints, function(constraint){
				values.push(JSON.parse(constraint));
			});
			
			return values;
		},
		
		getConstraintParametersAsStrings: function(){
			// returns: a string array of the constraint parameters present 
			//			an empty array if none are present
			var url = urlModule.parse(this.queryString);
			var params = url.queryParameters;
			var constraints = params.constraint;
			
			if (lang.isArray(constraints)){
				return constraints;
			} else if (constraints){
				return [constraints];
			} else {
				return [];
			}
		},
		
		getCategoryConstraintParameters: function(/*String*/root){
			var constraints = this.getConstraintParametersAsObjects();
			var values = [];
			
			var rootRegex = new RegExp(root+"/(.+)");
			
			var constraint; 
			arrayModule.forEach(constraints, function(constraint){
				if (constraint.type && constraint.type === "category" && constraint.values){
					var constraintValues = [];
					arrayModule.forEach(constraint.values, function(value){
						var result = rootRegex.exec(value);
						if (result){
							var escapedValue = result[1];
							var unescapedValue = this._unescapeCategoryConstraintValue(escapedValue);
							constraintValues.push(unescapedValue);
						}
					}, this);
					if (constraintValues.length > 1){
						values.push(constraintValues);
					} else if (constraintValues.length!==0){
						values.push(constraintValues[0]);
					}
				}
			}, this);
	
			return values;
		},
		
		getFieldConstraintParametersAsObjects: function(/*String*/ id, /*String[]*/values){
			var constraints = this.getConstraintParametersAsObjects();
			
			var filteredArray = arrayModule.filter(constraints, function(constraint){
				if (constraint.type === 'field' && constraint.id === id){
					if(!values || !constraint.values || constraint.values.length !== values.length){
						return false;
					}
					for(var i=0; i<values.length; i++) {
						if(values[i] != constraint.values[i]){ 
							// Allow type conversion in the check here (42.5 == "42.5", 42.5 !== "42.5")
							return false;
						}
					}
					return true;
				}
				return false;
			}, this);
			
			if (filteredArray.length === 1){
				return filteredArray[0];
			} else {
				return filteredArray;
			}
		},
		
		getRangeConstraintParametersAsObjects: function(/*String*/ id, /*Object[]*/values){
			var constraints = this.getConstraintParametersAsObjects();
			
			var filteredArray = arrayModule.filter(constraints, function(constraint){
				if (constraint.type === 'range' && constraint.id === id){
					if(!values || !constraint.values || constraint.values.length !== values.length){
						return false;
					}
					for(var i=0; i<values.length; i++) {
						if(values[i].le != constraint.values[i].le || values[i].ge != constraint.values[i].ge){ 
							// Allow type conversion in the check here (42.5 == "42.5", 42.5 !== "42.5")
							return false;
						}
						if(values[i].l != constraint.values[i].l || values[i].g != constraint.values[i].g){ 
							// Allow type conversion in the check here (42.5 == "42.5", 42.5 !== "42.5")
							return false;
						}
					}
					return true;
				}
				return false;
			}, this);
			
			if (filteredArray.length === 1){
				return filteredArray[0];
			} else {
				return filteredArray;
			}
		},
		
		getFieldConstraintParameter: function(/*String*/id){
			var constraints = this.getConstraintParametersAsObjects();
			var values = [];
					
			var constraint; 
			arrayModule.forEach(constraints, function(constraint){
				if (constraint.type && constraint.type === "field" && constraint.id && constraint.id === id && constraint.values){
					var value;
					arrayModule.forEach(constraint.values, function(value){
						values.push(value);
					}, this);
				}
			}, this);
			
			return values;
		},
		
		removeFieldConstraintParameter: function(/*String*/id, /*String or String[]*/value, /*boolean*/ exactMatch) {
			
			var values;
			if (lang.isArray(value)){
				values = value;
			} else {
				values = [value];
			}
			
			var constraint = {
					type: "field",
					id: id,
					values: values,
					exactMatch: exactMatch ? true : false 
			};
			var json = JSON.stringify(constraint);
			this.removeConstraint(json);
		},
		
		addConstraintParameter: function(/*Object*/constraint){
			var constraints = this.getConstraintParametersAsStrings();
			var json = JSON.stringify(constraint);
			
			var exists = arrayModule.indexOf(constraints,json)>=0;
			if (!exists){
				constraints.push(json);
				
				var url = urlModule.parse(this.queryString);
				url.queryParameters.constraint = constraints;
				
				this.queryString = urlModule.write(url);
				return true;
			}
			return false;
		},
		
		addFieldConstraintParameter: function(/*String*/id, /*String or String[]*/value, /*boolean*/ exactMatch) {
			
			var values;
			if (lang.isArray(value)){
				values = value;
			} else {
				values = [value];
			}
			
			var constraint = {
					type: "field",
					id: id,
					values: values,
					exactMatch: exactMatch ? true : false 
			};
			return this.addConstraintParameter(constraint);
		},
		
		addInclusiveRangeConstraintParameter: function(/*String*/id, /*String or Number*/lowerBoundary, /*String or Number*/upperBoundary) {
			var constraint = {
					type: "range",
					id: id,
					values: [{"ge":lowerBoundary,"le":upperBoundary}]
			};
			return this.addConstraintParameter(constraint);
		},
		
		getTagParameters: function() {
			return this.getCategoryConstraintParameters(Constants.FacetIds.TAG);
		},
		
		getEcmDocumentTypeParameters: function() {
			return this.getCategoryConstraintParameters(Constants.FacetIds.ECM_DOCUMENT_TYPE);
		},
		
		getTrendParameters: function() {
			return this.getCategoryConstraintParameters(Constants.FacetIds.TREND);
		},
	
		getDateParameters: function() {
			return this.getCategoryConstraintParameters(Constants.FacetIds.DATE);
		},
	
		getPersonParameters: function() {
			return this.getCategoryConstraintParameters(Constants.FacetIds.PERSON);
		},
		
		addAndEscapeSimpleCategoryConstraintParameter: function(/*String*/facetId, /*String*/value) {
			var escaped = this._escapeCategoryConstraintValue(value);
			var categoryPath = facetId + "/" + escaped;
			var constraint = {
					type: "category",
					values: [categoryPath]
			};
			var result = this.addConstraintParameter(constraint);
			if(facetId == Constants.FacetIds.TAG) {
				topic.publish(this.SEARCH_TAG_CHANGED_TOPIC, this.getTagParameters(), value, false);
			} else if(facetId == Constants.FacetIds.PERSON) {
				topic.publish(this.SEARCH_PERSON_CHANGED_TOPIC, this.getPersonParameters(), value, false);
			}
			return result;
		},
	
		addTag: function(/*String*/tag) {
			// summary: Add a tag to the API calls so that each API url has it as a filter
			var t = this.addAndEscapeSimpleCategoryConstraintParameter(Constants.FacetIds.TAG, tag);
			return t;
		},
	
		addEcmDocumentType: function(/*String*/ecmDocumentType) {
			// summary: Add an ecm document type to the API calls so that each API url has it as a filter
			return this.addAndEscapeSimpleCategoryConstraintParameter(Constants.FacetIds.ECM_DOCUMENT_TYPE, ecmDocumentType);
		},
	
		addTrend: function(/*String*/trend) {
			// summary: Add a trend to the API calls so that each API url has it as a filter
			return this.addAndEscapeSimpleCategoryConstraintParameter(Constants.FacetIds.TREND, trend);
		},
		
		removeSource: function(/*String*/source) {
			
			var constraints = this.getConstraintParametersAsObjects();
			
			arrayModule.forEach(constraints, function(constraint){
				if (constraint.type && constraint.type === "category" && constraint.values){
					var filtered = arrayModule.filter(constraint.values, function(item){
						return item !== "Source/"+source;
					}, this);
					
					if (filtered!==constraint.values){
						this.removeConstraint(JSON.stringify(constraint));
						constraint.values = filtered;
						if (constraint.values.length===1 && constraint.values[0].substring(0,7)==="Source/" && this.getComponentFilter()===""){
							this.changeComponent(constraint.values[0].substring(7));
						} else {
							this.addConstraintParameter(constraint);
						}
					}
				}
			}, this);
			
			this._page=1;
		},
		
		removeEcmDocumentType: function(/*String*/ecmDocumentType) {	
			this.removeTagType(Constants.FacetIds.ECM_DOCUMENT_TYPE, ecmDocumentType);
		},
	
		removeTag: function(/*String*/tag) {	
			this.removeTagType(Constants.FacetIds.TAG, tag);
			topic.publish(this.SEARCH_TAG_CHANGED_TOPIC, this.getTagParameters(), tag, true);
		},
		
		removeTagType: function(/*String*/ facetId, /*String*/tag){
			// summary: Remove a tag type value (Tag, Trend or EcmDocumentType) from the API calls so that each API url drops that filter
			var escaped = this._escapeCategoryConstraintValue(tag);
			
			var constraint = {
					type: "category",
					values: new Array(facetId + "/" + escaped)
			};
			var value = JSON.stringify(constraint);
			this.removeConstraint(value);
			this._page = 1;
		},
	
		removeTrend: function(/*String*/trend) {
			this.removeTagType(Constants.FacetIds.TREND, trend);
		},
		
		addDate: function(/*String*/date) {
			// summary: Add a date to the API calls so that each API url has it as a filter
			var constraint = {
					type: "category",
					values: new Array(date)
			};
			return this.addConstraintParameter(constraint);
		},
		
		removeDate: function(/*String*/date) {
			// summary: Remove a date from the API calls so that each API url drops that filter
			var constraint = {
					type: "category",
					values: new Array(Constants.FacetIds.DATE + "/" + date)
			};
			var value = JSON.stringify(constraint);
			this.removeConstraint(value);
			this._page = 1;
		},
		
		addPerson: function(/*String*/person) {
			// summary: Add a person to the API calls so that each API url has it as a filter
			var constraint = {
					type: "category",
					values: new Array(Constants.FacetIds.PERSON + "/" + person)
			};
			var result = this.addConstraintParameter(constraint);
			topic.publish(this.SEARCH_PERSON_CHANGED_TOPIC, this.getPersonParameters(), person, false);
			return result;
		},
		
		removePerson: function(/*String*/person) {
			// summary: Remove a person from the API calls so that each API url drops that filter
			person = person.replace("\\\"","\"","g");
			person = person.replace("\\\'","\'","g");
			
			var constraint = {
					type: "category",
					values: new Array(Constants.FacetIds.PERSON + "/" + person)
			};
			var value = JSON.stringify(constraint);
			this.removeConstraint(value);
			this._page=1;
			topic.publish(this.SEARCH_PERSON_CHANGED_TOPIC, this.getPersonParameters(), person, true);
		},
		
		removeConstraint: function(/*String*/value){
			var url = urlModule.parse(this.queryString);
			var params = url.queryParameters;
			var existing = params.constraint;
			
			if (lang.isArray(existing)){
				params.constraint = arrayModule.filter(existing, function(item){
					return value!==item;
				});
			} else if (existing){
				existing= existing.replace(/'/g, '"');
				value = value.replace(/'/g, '"');
				if (this.compareConstraint(JSON.parse(existing),JSON.parse(value))){
					delete params.constraint;
				}
			}
			
			this.queryString = urlModule.write(url);
			if (!this.queryString || this.queryString === ""){
				this.queryString = "?";
			}
		},
		
		compareConstraint: function(c1, c2) {
			if (c1.type && !c2.type || !c1.type && c2.type ){
				return false;
			}
			if (c1.type !== c2.type){
				return false;
			}
				
			if (c1.id && !c2.id || !c1.id && c2.id ){
				return false;
			}
			if (c1.id !== c2.id){
				return false;
			}
				
			if (c1.values && !c2.values || !c1.values && c2.values ){
				return false;
			}
			if (c1.values.length != c2.values.length ){
				return false;
			}
		    for (var i = 0, l=c1.values.length; i < l; i++) {
				if (c1.values[i] !== c2.values[i]){
					return false;
				}
			}
			
			return true;
				
		},
		
		changeComponent: function(/*String*/component) {
			// summary: Remove previous component reference in the API call and add in the one specified
			
			var previousComponent = this.getComponentFilterFull();
			
			if (component === "communities"){
				this.removeScope("stand-alone");
			}
			
			if (component !== "none"){
				this.removeScope(previousComponent);
				this.addScope(component);
			} else {
				this.removeScope(previousComponent);
				this.setParent("");
			}
			
			this._page = 1;
		},
		
		changePage: function(/*String*/page) {
			// summary: Move to a different page in the results
			this._page = page;
		},
		
		changePageSize: function(/*integer*/pageSize) {
			// summary: Change the page size of the search results
			this._pageSize = pageSize;
			this._page = 1;
		},
		
		changeQuery: function(/*String*/newQuery) {
			// summary: Change the query parameter
			var url = urlModule.parse(this.queryString);
			var params = url.queryParameters;
			var existing = params.query;
			
			if (existing){
				delete params.query;
			}
			
			params.query = newQuery; 
			
			this.queryString = urlModule.write(url);
			if (!this.queryString || this.queryString === ""){
				this.queryString = "?";
			}
			
			this._queryTerm = newQuery;
		},
	
		clearQueryString: function() {
			// summary: Clear the query string
			this.queryString="";
		},
		
		sortResults: function(/*String*/key,/*String*/order) {
			this._sortKey=key;
			this._sortOrder=order;
		},
		
		getComponentFilter: function() {
			var component = this.getComponentFilterFull();
			
			if (!component){
				return "";
			} else if (component.indexOf(":")===-1){
				return component;
			} else {
				var array = component.split(":");
				return array[0];
			}
		},
		
		isComponentScope: function(/*String*/ scope){
			if (scope !== "personalOnly" && scope !== "personalOnlyByACL" && scope !== "stand-alone" && scope !== "allconnections"){
					return true;
			}
			return false;
		},
		
		isEmptyQueryString: function(){	
			var url = urlModule.parse(this.queryString || "?");
			var params = url.queryParameters;
			
			if (params.scope === "allconnections" || params.scope === ""){
				delete params.scope;
			}
			
			if (params.query === ""){
				delete params.query;
			}
			
			url = urlModule.write(url);
			return url === "";
		},
		
		isParentScope: function(/*String*/ scope){
			if (scope === "communities" || scope === "stand-alone"){
				return true;
			}
			return false;
		},
		
		getComponentFilterFull: function() {
			var url = urlModule.parse(this.queryString);
			var params = url.queryParameters;
			var scopes = params.scope;
			
			if (lang.isArray(scopes)){
				
				var componentFilterFull = "";
				
				arrayModule.forEach(scopes, function(currentScope){
					if (this.isComponentScope(currentScope) && !this.isParentScope(currentScope)){
						componentFilterFull = currentScope;
					}
				}, this);
				
				if (componentFilterFull === ""){
					arrayModule.forEach(scopes, function(currentScope){
						if (this.isComponentScope(currentScope)){
							componentFilterFull = currentScope;
						}
					}, this);
				}
				
				return componentFilterFull;
			} else if (this.isComponentScope(scopes)){
				return scopes;
			} else {
				return "";
			}
		},
		
		getHash: function(/*boolean*/isPublic) {
			var stringToHash = this.queryString 
								+ "&page=" + this._page
								+ "&pageSize=" + this._pageSize
								+ "&personalization=" + JSON.stringify(this._personalization);
			if(has("search-pagination-limit-ui")) {
				stringToHash += "&personalization=" + JSON.stringify(this._limitResults);
			}
			if(this._sortKey) { 
				stringToHash += "&sortKey=" + this._sortKey + "&sortOrder=" + this._sortOrder;
			}
			
			return encodeURIComponent(stringToHash);
			
		},
		
		setHash: function(/*String*/hashed) {
			var stringFromHash = decodeURIComponent(hashed);
			this.queryString = this.parseQueryString(stringFromHash);
		},
		
		addScope: function(/*String*/value){
			var url = urlModule.parse(this.queryString);
			var params = url.queryParameters;
			var existing = params.scope;
			
			if (lang.isArray(existing)){
				if(arrayModule.indexOf(existing, value) === -1) {
					existing.push(value);
				}
			} else if (existing && existing!==value) {
				params.scope = [existing,value];
			} else {
				params.scope = value;
			}
			
			this.queryString = urlModule.write(url);
		},
		
		removeScope: function(/*String*/value){
			var url = urlModule.parse(this.queryString);
			var params = url.queryParameters;
			var existing = params.scope;
			
			if (lang.isArray(existing)){
				params.scope = arrayModule.filter(existing, function(item){
					return value!==item;
				});
			} else if (existing && existing === value) {
				delete params.scope;
			}
			
			this.queryString = urlModule.write(url);
			if (!this.queryString || this.queryString === ""){
				this.queryString = "?";
			}
		},
		
		setParent: function(/*String*/value) {
			if (value === "none"){
				this.addScope("stand-alone");
				this.removeScope("communities");
			} else if (value === "communities"){
				this.addScope("communities");
				this.removeScope("stand-alone");
			} else {
				this.removeScope("stand-alone");
				this.removeScope("communities");
			}
		},
		
		getParent: function() {
			var url = urlModule.parse(this.queryString);
			var params = url.queryParameters;
			var scopes = params.scope;
			
			if (lang.isArray(scopes)){
				var parent = "";
				arrayModule.forEach(scopes, function(currentScope){
					if (currentScope === "communities"){
						parent = "communities";
					} else if (currentScope === "stand-alone"){
						parent = "none";
					}
				}, this);
				return parent;
			} else if (scopes === "communities"){
				return "communities";
			} else if (scopes === "stand-alone"){
				return "none";
			}
			return "";
		},
		
		setPersonalOnly: function(/*boolean*/value) {
			if (value === true){
				this.addScope("personalOnly");
			} else {
				this.removeScope("personalOnly");
			}
		},
		
		getPersonalOnly: function() {
			var url = urlModule.parse(this.queryString);
			var params = url.queryParameters;
			var scopes = params.scope;
			
			if (lang.isArray(scopes)){
				var personalOnly = false;
				arrayModule.forEach(scopes, function(currentScope){
					if (currentScope === "personalOnly"){
						personalOnly = true;
					}
				}, this);
				return personalOnly;
			} else {
				return (scopes === "personalOnly");
			}
		},
		
		getPage: function(){
			return this._page;
		},
		
		getQueryTerm: function(){
			return this._queryTerm;
		},
		
		getSortKey: function(){
			return this._sortKey;
		},
		
		getSortOrder: function(){
			return this._sortOrder;
		},
		
		isPersonalizationEnabled: function() {
			return this._personalization.value == "on";
		},
		
		setPersonalization: function(bool) {
			this._personalization.value = bool ? "on" : "off";
		}
	});
	return searchAPI;
});
