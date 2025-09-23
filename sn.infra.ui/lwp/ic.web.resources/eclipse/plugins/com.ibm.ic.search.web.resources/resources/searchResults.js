/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/i18n!./nls/searchResults",
	"dojo/_base/declare",
	"dojo/dom-style",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/on",
	"dojo/query",
	"dojo/topic",
	"dojo/_base/kernel",
	"dojo/_base/config",
	"dijit/_Widget",
	"dijit/registry",
	"./facets/FacetsManager",
	"./QueryForm",
	"./FiltersForm",
	"./FilterArea",
	"ic-core/config/features",
	"ic-core/globalization/bidiUtil",
	"./Constants",
	"ic-core/url",
	"./resultsView",
	"./SearchResultsFeed",
	"./searchAPI",
	"./searchData",
	"ic-ui/MessageBox"
], function (i18nsearchResults, declare, domStyle, array, lang, domConstruct, dom, domAttr, domClass, on, query, topic, kernel, config, _Widget, registry, FacetsManager, QueryForm, FiltersForm, FilterArea, has, bidiUtil, Constants, urlModule, resultsViewModule, SearchResultsFeed, searchAPI, searchData, MessageBox) {

	var searchResults = declare(
		"lconn.search.searchResults",
		_Widget,
	{
		// Reference: https://w3-connections.ibm.com/wikis/home?lang=en_US#/wiki/Lotus%20Connections%202.5/page/Search%20UI%20Widget%204.5
	
		/*
		 * It is expected that the parameters object passed as the first argument to the constructor will contain the following:-
		 *
		 *		componentFilter: Object
		 *			(Optional) An instance of lconn.search.componentFilter. Provides the UI for switching between
		 *			search result scopes for different components. 
		 *		contentDomNode: DOMNode
		 *			The DOM node in which to display the query form, filter area, filter form and search results.
		 *		contextRoot: String
		 *			The context root of the Search application. If not on the same server, this should
		 *			be via your AJAX proxy. 
		 *		facetsDomNode: DOMNode
		 *			(Optional but recommended) The DOM node in which to display the facets. If using the default 
		 *			facets configuration (see below), this can be specified instead of the facetsConfiguration attribute. 
		 *			Otherwise, the sectionDomNode attributes for each facet in the facetsConfiguration can be omitted. 
		 *		isPublic: boolean
		 *			Indicates whether the search results should be limited to public content only.
		 *		queryString: String
		 *			The query string to be passed to the Search API for retrieving the search results.
		 *
		 * If you are not displaying any other content on the page, you can provide a srcNodeRef argument to the 
		 * constructor instead of supplying the contentDomNode and facetsDomNode arguments. If you do this, then
		 * the widget will create the necessary container DIVs for the contentDomNode and the facetsDomNode for
		 * you: the lotusColLeft, lotusContent and lotusClear DIVs.
		 *
		 * The following additional properties are supported but usage is discouraged for UI consistency reasons:
		 *
		 *		facetsConfiguration: Object
		 *			(Optional) The facetsConfiguration object should contain a number of objects, each referenced
		 *			via the id of a facet. Each object can have two attributes:- sectionDomNode and	isFacetOpen. 
		 *			sectionDomNode is required unless a facetsDomNode is supplied below. isFacetOpen is optional. 
		 *			isFacetOpen is assumed to be true if not specified. An example: 
		 *				facetsConfiguration = {Tag: {sectionDomNode: dojo.byId("tagFacet"), isFacetOpen: true }} 
		 *		filterAreaDomNode: DOMNode
		 *			(Optional, ignored if contentDomNode specified) The DOM node in which to display the filters that 
		 *			are currently applied. This DOM	node would usually be directly above the resultsDomNode and directly
		 *			below the queryFormDomNode.
		 *		queryFormDomNode: DOMNode 
		 *			(Optional, ignored if contentDomNode specified) The DOM node in which to display the query input
		 *			form and any 'Did you mean?' suggestion. This DOM node would usually be directly above the 
		 *			resultsDomNode.
		 *		resultsDomNode: DOMNode
		 *			(Specify instead of contentDomNode, ignored if contentDomNode specified) The DOM node in which
		 *			to display the search results.
		 *
		 * The usage of the showFilters and showHeading configuration variables is also discouraged for UI consistency
		 * reasons.
		 */
		
		/* Instance variables: these should be considered to be private. */
		APIHandler:						null,	// An instance of lconn.search.searchAPI
		componentFilter:				null,	// An instance of lconn.search.componentFilter
		DATASTORE:						null,	// An instance of lconn.search.searchData
		_facetsManager:					null,	// An instance of lconn.search.facets.FacetsManager
		FILTERAREA:						null,	// An instance of lconn.search.FilterArea
		_queryForm:						null,	// An instance of lconn.search.QueryForm	
		resultsDomNode:					null,	// The DOM node to display the search results in
		_Trans:							i18nsearchResults,
		
		/* Configuration variables provided on construction. */
		communitiesEnabled:				true,	// Whether or not Communities are enabled in LotusConnections-config
		defaultProfilesUserStateSearch:	null,	// The config setting for profiles user state search in LotusConnections-config
		forumCategoriesEnabled:			false,	// Whether or not forum categories are enabled in LotusConnections-config
		emptyRedirect:					null,	// URL to redirect to if the query string becomes empty
		ideationBlogsEnabled:			true,	// Whether or not IdeationBlogs are enabled in LotusConnections-config
		showFilters:					true,	// Whether or not to place aclFilter, parentFilter, and typeFilter in resultsDomNode
		showHeading:					true,	// Whether or not to show a heading above the search results in resultsDomNode
		standaloneBlogsDisabled:		false,	// Whether or not blogs are disabled as a standalone app (ie. only inside a community)
		standaloneForumsDisabled:		false,	// Whether or not forums are disabled as a standalone app (ie. only inside a community)
		standaloneWikisDisabled:		false,	// Whether or not wikis are disabled as a standalone app (ie. only inside a community)
		isUserExternal:					false,	// Whether authenticated user is external user
		usePersonalization:				false,	// if true will show personalization UI options
		
		buildRendering: function() {
			this.inherited(arguments);
	
			if (this.srcNodeRef){
				domClass.add(this.domNode, "lotusMain");
				
				var leftColumn = domConstruct.create("div", {"class": "lotusColLeft"}, this.domNode);
				this.facetsDomNode = domConstruct.create("div", {}, leftColumn);
				
				var content = domConstruct.create("div", {
					"class":	"lotusContent icSearchResultsPage",
					"role":		"main"
				}, this.domNode);
				this.contentDomNode = domConstruct.create("div", {}, content);
				
				domConstruct.create("div", {"class": "lotusClear"});
			}
		},
		
		postCreate: function() {	
			this.inherited(arguments);
			
			this.APIHandler = new searchAPI({	
				contextRoot:		this.contextRoot, 
				queryString:		this.queryString,
				publicSearch:		this.isPublic
			});
			
			this.DATASTORE = new searchData({
				filter:				this.APIHandler.getComponentFilter(),
				usePersonalization:	this.usePersonalization
			});
			
			this._facetsManager = new FacetsManager({
				apiHandler:			this.APIHandler,
				dataStore:			this.DATASTORE,
				facets:				this.facetsConfiguration,
				results:			this
			}, this.facetsDomNode);
			
			if (this.componentFilter){
				this.connect(this.componentFilter, "onSelect", lang.hitch(this, "performFilter"));
			}
			
			if (this.contentDomNode){
				domConstruct.empty(this.contentDomNode); 
				var id = this.contentDomNode.id || this.id;
				var headerDomNode = domConstruct.create("div", {"class": "lotusHeader lconnSearchHeader"}, this.contentDomNode);
				this.queryFormDomNode = domConstruct.create("div", {}, headerDomNode);
				this.filterAreaDomNode = domConstruct.create("div", {});
				this.resultsDomNode = domConstruct.create("div", {id: id+"_results", "class": "lconnClearFix"}, this.contentDomNode);
			}
			
			if (this.queryFormDomNode){
				this._queryForm = new QueryForm({
					getDidYouMean:	lang.hitch(this.DATASTORE, "didYouMeanTransform"),
					getQueryTerm:	lang.hitch(this.APIHandler, "getQueryTerm"),
					updateQuery:	lang.hitch(this, "updateQuery")
				}, this.queryFormDomNode);
			}
			
			if (this.filterAreaDomNode){
				this.FILTERAREA = new FilterArea({
					apiHandler:		this.APIHandler,
					getConstraints:	lang.hitch(this.DATASTORE, "getQueryConstraintsAsObjects"),
					onFocusLost:	lang.hitch(this, "focus"),
					onChange:		lang.hitch(this, "update")
				}, this.filterAreaDomNode);
			}
		},
		
		getChildren: function(){
			// summary:
			//		Returns all the widgets contained by this widget. This implementation
			//		overrides the default implementation in dijit.Widget. This is necessary in
			//		order to ensure that destroyDescendants works correctly despite the fact
			//		that this widget does not have a container node.
			
			var children = [];
			children.push(this._facetsManager);
			
			if (this.resultsDomNode){
				array.forEach(registry.findWidgets(this.resultsDomNode), function(widget) {
					children.push(widget);
				});
			}
			
			if (this.FILTERAREA){
				children.push(this.FILTERAREA);
			}
			
			if (this._queryForm){
				children.push(this._queryForm);
			}
			
			return children;
		},
		
		setup: function(contextRoot,queryString,isPublic,resultsDomNodeId,datesDomNodeId,tagsDomNodeId,trendsDomNodeId,personDomNodeId,
				filterAreaDomNodeId, showFiltersArg, forumCategoriesEnabledArg, 
				communitiesEnabledArg, defaultProfilesUserStateSearchArg, ideationBlogsEnabledArg) {
			// summary: 
			//		Setup function. This has been deprecated in favour of searchSetup. To ensure compatibility
			//		with other applications using lconn.search.searchResults (eg Communities, Forums, etc), has not been
			//		removed yet.
			// tags: 
			//		deprecated
			kernel.deprecated("lconn.search.searchResults.setup", "Use lconn.search.searchResults.constructor instead", "4.5");
			
			var args = {	
				contextRoot:			contextRoot,
				facetsConfiguration:	{},
				isPublic:				isPublic,
				queryString:			queryString,
				resultsDomNode:			dom.byId(resultsDomNodeId),
				showFilters:			false,
				showHeading:			false
			};
			
			// The use of widgetDomNode in facetsConfiguration is also deprecated and is provided only to support
			// applications still using this setup function.
			if (datesDomNodeId){
				args.facetsConfiguration[Constants.FacetIds.DATE] = {
					widgetDomNode:	dom.byId(datesDomNodeId)
				};
			}
			if (tagsDomNodeId){
				args.facetsConfiguration[Constants.FacetIds.TAG] = {
					widgetDomNode:	dom.byId(tagsDomNodeId)
				};
			}
			if (trendsDomNodeId){
				args.facetsConfiguration[Constants.FacetIds.TREND] = {
					widgetDomNode:	dom.byId(trendsDomNodeId)
				};
			}
			if (personDomNodeId){
				var widgetDomNode = dom.byId(personDomNodeId);
				var widgets = registry.findWidgets(widgetDomNode.parentNode);
				var slider;
				if (widgets.length === 1){
					slider = widgets[0];
				}
				args.facetsConfiguration[Constants.FacetIds.PERSON] = {
					widgetDomNode:	widgetDomNode,
					slider:			slider
				};
			}
			if (filterAreaDomNodeId){
				args.filterAreaDomNode = dom.byId(filterAreaDomNodeId);
			}
			if (showFiltersArg){
				args.showFilters = showFiltersArg;
			}
			if (forumCategoriesEnabledArg){
				args.forumCategoriesEnabled = forumCategoriesEnabledArg;
			}
			if (communitiesEnabledArg){
				args.communitiesEnabled = communitiesEnabledArg;
			}
			if (defaultProfilesUserStateSearchArg){
				args.defaultProfilesUserStateSearch = defaultProfilesUserStateSearchArg;
			}
			if (ideationBlogsEnabledArg){
				args.ideationBlogsEnabled = ideationBlogsEnabledArg;
			}
			
			lang.mixin(this, args);
			this.postCreate();
		},
	
		updateQuery: function(/*String*/newQuery, /*String|DOMNode*/focusNode) {
			// summary: Alter the current query string
			this.APIHandler.changeQuery(newQuery);
			this.APIHandler.changePage(1);
			this.update({focusNode: focusNode});
		},
		
		performFilter: function(/*String*/component, /*boolean*/update, /*String|DOMNode*/focusNode) {
			// summary: Filter the search by a component
			var fieldUserState = "FIELD_USER_STATE";
			var fieldUserStateValue = this.APIHandler.getFieldConstraintParameter(fieldUserState);
			if (this.APIHandler.getComponentFilter()==="profiles" && fieldUserStateValue){
				this.APIHandler.removeFieldConstraintParameter("FIELD_USER_STATE", fieldUserStateValue, false);
			} 
			if (component==="profiles") {
				this.APIHandler.removeScope("personalOnly");
			}
			this.APIHandler.changePage(1);
			this.APIHandler.changeComponent(component);
			if (component==='status_updates'){
				this.APIHandler.sortResults("date","desc");
			} else {
				this.APIHandler.sortResults(null,null);
			}
			this.DATASTORE.setFilter(component);
			if (update!==false){
				this.update({focusNode: focusNode});
			}
		},
		
		_performTagTypeFilter: function(/*String*/facetKey, /*String*/facetItem) {
			if(this.APIHandler.addAndEscapeSimpleCategoryConstraintParameter(facetKey, facetItem)) {
				this.APIHandler.changePage(1);
				this.update({focusNode: this._facetsManager.getWidget(facetKey)});
			}
		},
		
		performTagFilter: function(/*String*/tag) {
			// summary: Filter the search results by a Tag facet value
			this._performTagTypeFilter(Constants.FacetIds.TAG, tag);
		},
		
		performEcmDocumentTypeFilter: function(/*String*/ecmDocumentType) {
			// summary: Filter the search results by an EcmDocumentType facet value
			
			// Remove previous Ecm Document Type filter, if present
			this._removeExistingTagTypeFilter(Constants.FacetIds.ECM_DOCUMENT_TYPE);
			
			// Filter to all_files or ecm_files as appropriate
			if (this.componentFilter && this.componentFilter.options && array.indexOf(this.componentFilter.options,"all_files")>=0){
				this.performFilter("all_files", false);
			} else {
				this.performFilter("ecm_files", false);
			}
			
			// Filter to appropriate Ecm Document Type
			this._performTagTypeFilter(Constants.FacetIds.ECM_DOCUMENT_TYPE, ecmDocumentType);
		},
	
		performTrendFilter: function(/*String*/trend) {
			// summary: Filter the search results by a Trend facet value
			this._performTagTypeFilter(Constants.FacetIds.TREND, trend);
		},
		
		performPersonFilter: function(/*String*/person) {
			// summary: Filter the search results by a Person facet value
			if(this.APIHandler.addPerson(person)) {
				this.APIHandler.changePage(1);
				this.update({focusNode: this._facetsManager.getWidget(Constants.FacetIds.PERSON)});
			}
		},
		
		performDateFilter: function(/*String*/date) {
			// summary: Filter the search results by a Date facet value
			this.filterdate=date;
			this.APIHandler.changePage(1);
			this.APIHandler.addDate(date);
			this.update({focusNode: this._facetsManager.getWidget(Constants.FacetIds.DATE)});
		},
		
		performPagination: function(/*Integer*/page, /*String|DOMNode*/focusNode) {
			// summary: Move to the next page of the results (called from pagination bar)
			this.APIHandler.changePage(page);
			this.update({skipFacetsUpdate: true, focusNode: focusNode});
			if(!focusNode) {
				window.scrollTo(document.body.scrollLeft, 0);
			}
		},
		
		_removeExistingTagTypeFilter: function(/*String*/facetId){
			var items = this.DATASTORE.getQueryCategoryConstraints(facetId);
			if ((!items) || (items.length<=0)){
				return;
			}
			for (var i=0; i<items.length; i++){
				var values = items[i].values;
				for (var j=0; j<values.length; j++){
					var id = values[j].id;
					var indexOfSlash = id.indexOf("/");
					var startOffset = indexOfSlash === 0 ? 0 : indexOfSlash+1;
					var existingId = id.substr(startOffset);
					this.APIHandler.removeTagType(facetId, existingId);
				}
			}
		},
		
		removeFilter: function() {
			// summary: Remove the current component filter
			this.APIHandler.changeComponent("none"); // find if there is a component filter
			this.APIHandler.changePage(1);
			this.update();
		},
		
		removeTagFilter: function(/*String*/tag) {
			// summary: Remove a Tag facet filter
			this.APIHandler.removeTag(tag);
			this.update({focusNode: this._facetsManager.getWidget(Constants.FacetIds.TAG)});
		},
		
		removeTagFilters: function() {
			// summary: Remove all Tag facet filters
			var tags = this.APIHandler.getTagParameters();
			for (var i=1; i<tags.length; i++){
				this.APIHandler.removeTag(tags[i]);
			}
			this.update({focusNode: this._facetsManager.getWidget(Constants.FacetIds.TAG)});
		},
		
		removeEcmDocumentTypeFilter: function(/*String*/ecmDocumentType) {
			// summary: Remove an EcmDocumentType facet filter
			
			// If ecmDocumentType is a label, lconn.search.facets.EcmDocumentType.getEcmDocumentTypeIdByLabel will resolve it to an id.
			var ecmDocumentTypeWidget = this._facetsManager.getWidget(Constants.FacetIds.ECM_DOCUMENT_TYPE);
			if (ecmDocumentTypeWidget){
				ecmDocumentType = ecmDocumentTypeWidget.getEcmDocumentTypeIdByLabel(ecmDocumentType);
			}
			 
			this.APIHandler.removeEcmDocumentType(ecmDocumentType);
			
			this.update({focusNode: this._facetsManager.getWidget(Constants.FacetIds.ECM_DOCUMENT_TYPE)});
		},
		
		removeTrendFilter: function(/*String*/trend) {
			// summary: Remove a Trend facet filter
			this.APIHandler.removeTrend(trend);
			this.update({focusNode: this._facetsManager.getWidget(Constants.FacetIds.TREND)});
		},
		
		removeTrendFilters: function() {
			// summary: Remove all Trend facet filters
			var trends = this.APIHandler.getTrendParameters();
			for (var i=1; i<trends.length; i++){
				this.APIHandler.removeTrend(trends[i]);
			}
			this.update({focusNode: this._facetsManager.getWidget(Constants.FacetIds.TREND)});
		},
		
		_showResultsViewIsLoading: function() {
			query(".lconnApplicationLoading", this.resultsDomNode).orphan();
			
			domClass.add(this.resultsDomNode, "lotusDim");
			
			var loadingDiv = domConstruct.create("div", {
				"class":		"lconnApplicationLoading"
			}, this.resultsDomNode, "first");
			
			var loadingWidth = domStyle.get(this.resultsDomNode, "width");
			if (loadingWidth < 500) {
				// Covers defect 97112 (OCS 114177)
				loadingWidth = 500;
			}
			domStyle.set(loadingDiv, {
				"width":	loadingWidth + "px"
			});
			
			domConstruct.create("img", {
				"class":		"lotusLoading",
				"src":			config.blankGif,
				"role":			"presentation"
			}, loadingDiv);
			
			domConstruct.create("div", {
				"innerHTML":	this._Trans.LOADING
			}, loadingDiv);
		},
		
		update: function(args) {
			// summary: Update the page (ie refresh). Connects to onChange.
			this.onChange();
			this._update(args);
		},
		
		updatePage: function(arg) {
			// Deprecated
			kernel.deprecated("lconn.search.searchResults.updatePage", "Use lconn.search.searchResults.update instead", "4.5");
			this.update();
		},
		
		updateResults: function(arg) {
			// Deprecated
			kernel.deprecated("lconn.search.searchResults.updateResults", "Use lconn.search.searchResults.update instead", "4.5");
			this.update();
		},
		
		_update: function(/*Object?*/args) {
			// summary:
			//		Updates the page without firing onChange.
			//		args can be an object with the following optional attributes: skipFacetsUpdate (boolean), focusNode (String|DOMNode).
		
			if (this.APIHandler.isEmptyQueryString() && this.emptyRedirect){
				// Execute redirect in a timeout for cross-browser compatibility 
				setTimeout(lang.hitch(this,function(){
					window.location.href = this.emptyRedirect;
				}), 20);
				return false;
			}
	
			// _update() will perform update for facets as well (in addition to search results)
			// when a facet exists, it is open, and its content is invalid (i.e. needs update)
			// By default, for a new search, all facets will be set as invalid, unless skipFacetsUpdate is true
			var invalidateFacets = !(args && args.skipFacetsUpdate);
			var requestedFacets = this._facetsManager.getOpenInvalidFacets(invalidateFacets);
	
			this._showResultsViewIsLoading();
			
			if (this.componentFilter){
				this.componentFilter.update(this.APIHandler);
			}
			
			this.DATASTORE.setFilter(this.APIHandler.getComponentFilter());
			var url = this.APIHandler.getCombinedAPI(this.APIHandler.publicSearch, requestedFacets);
			this.DATASTORE.performQuery(this.APIHandler.publicSearch, url, lang.hitch(this, "_handleResults"), args, true);
		},
		
		_updateFilterArea: function() {
			// summary: Update the filter area
			if(this.FILTERAREA) {
				this.FILTERAREA.update();
			}
		},
		
		_updateQueryForm: function() {
			// summary: Update both of the query input forms (or whichever are present)
			
			if (this._queryForm){
				// Update the search query input form above the search results
				this._queryForm.update();
			}
			
			var searchForm = registry.byId("searchForm");
			if (searchForm){
				// Update the common search query input form on the top right
				searchForm.setValue(this.APIHandler.getQueryTerm());
				searchForm.setSelectedFeature(this.APIHandler.getComponentFilter());
			}
		},
		
		updateFilters: function() {
			if (this.showFilters && this.resultsDomNode){
				var filtersForm = new FiltersForm({
					apiHandler: this.APIHandler,
					communitiesEnabled: this.communitiesEnabled,
					defaultProfilesUserStateSearch: this.defaultProfilesUserStateSearch,
					forumCategoriesEnabled: this.forumCategoriesEnabled,
					ideationBlogsEnabled: this.ideationBlogsEnabled,
					onSubmit: lang.hitch(this, "update"),
					id: domAttr.get(this.resultsDomNode, "id") + "_FiltersForm",
					standaloneBlogsDisabled: this.standaloneBlogsDisabled, 
					standaloneForumsDisabled: this.standaloneForumsDisabled,
					standaloneWikisDisabled: this.standaloneWikisDisabled,
					isUserExternal: this.isUserExternal,
					filterOptions: this.componentFilter.options
				});
				domConstruct.place(filtersForm.domNode, this.resultsDomNode, 'first');
			}
		},
		
		_detachFilterArea: function() {
			if(this.filterAreaDomNode && this.filterAreaDomNode.parentNode) {
				this.filterAreaDomNode.parentNode.removeChild(this.filterAreaDomNode);
			}
		},
		
		_attachFilterArea: function() {
			if(this.filterAreaDomNode && this.resultsDomNode) {
				domConstruct.place(this.filterAreaDomNode, this.resultsDomNode, "first");
			}
		},
		
		_showSearchResultsError: function(/*container*/parentNode, /*String*/theErrorMessage) {
			var messageContainer = domConstruct.create("div", {}, parentNode, "only");
			new MessageBox({
				canClose:	false,
				_strings:	{
								icon_alt:	this._Trans.ERROR,
								a11y_label: this._Trans.ERROR_PREFIX
							},
				type:		MessageBox.TYPE.ERROR,
				msg:		theErrorMessage
			}, messageContainer);
		},
		
		_handleResults: function(data, ioArgs) {
			// summary: Place the results into the DOM or display error message, as appropriate.
			
			// Remove lotusDim class applied in _showResultsViewIsLoading()
			domClass.remove(this.resultsDomNode, "lotusDim");
			
			if(this.DATASTORE.getError()) {
				this._showSearchResultsError(this.resultsDomNode, this.DATASTORE.getError());
				this._facetsManager.update(ioArgs.url, /*isSearchError*/true);
			} else {
				this._updateQueryForm();
				this._facetsManager.update(ioArgs.url);
				// updateFilterArea must be called after FacetsManager.update, because for 
				// some facets like EcmDocumentType, to update the filter area we rely on 
				// facetValues processed and setup in FacetsManager.update
				this._updateFilterArea();
				this._detachFilterArea();
					
				// Delete any existing resultsView widget
				array.forEach(registry.findWidgets(this.resultsDomNode), function(w) {
					w.destroyRecursive();
				});
				// Communities delete the DOM nodes for the old results view before
				// they call update.
				var resultsViewId = domAttr.get(this.resultsDomNode, "id") + "_View";
				var oldResultsView = registry.byId(resultsViewId);
				if (oldResultsView){
					oldResultsView.destroyRecursive();
				}
					
				// Create and place the new resultsView widget
				var resultsView = new resultsViewModule({
					clearSort:						lang.hitch(this, "clearSort"),
					currentComponentFilterFull:		this.APIHandler.getComponentFilterFull(),
					currentPage:					this.APIHandler.getPage(),
					currentSortKey:					this.APIHandler.getSortKey(),
					currentSortOrder:				this.APIHandler.getSortOrder(),
					dataStore:						this.DATASTORE, 
					id:								resultsViewId,
					onTransformError:				lang.hitch(this, "_showSearchResultsError"),
					performPagination:				lang.hitch(this, "performPagination"),
					showHeading:					this.showHeading,
					sortBy:							lang.hitch(this, "sortBy")
				});
				domConstruct.place(resultsView.domNode, this.resultsDomNode, "only");
				
				var feedView = new SearchResultsFeed ({
					searchResultsFeed:	ioArgs.url
				});
				domConstruct.place(feedView.domNode, this.resultsDomNode);
				
				// Bidi support
				bidiUtil.enforceTextDirectionOnPage(this.resultsDomNode);
				
				// Update the filters and set the focus node
				this.updateFilters();
				this._attachFilterArea();
				this.focus(ioArgs.args.focusNode);
			}
		},
		
		focus: function(/*String|DOMNode?*/ focusNode){
			if (focusNode){
				var target = registry.byId(focusNode);
				if (!target){
					target = dom.byId(focusNode);
				}
				if (target && target.focus){
					try {
						target.focus();
						return;
					} catch (e){/*quiet*/}
				}
			}
			
			// No focusNode so focus on first search result instead
			if (this.resultsDomNode){
				var resultsView = registry.byId(domAttr.get(this.resultsDomNode, "id") + "_View");
				resultsView.focus();
			}
		},
		
		setPVisible: function(visibilityThreshold, personFacetDomNode) {
			kernel.deprecated("lconn.search.searchResults.setPVisible", 
					"Pass a reference to the person slider in the constructor as facetsConfiguration.Person.slider", "4.5");
		},
		
		dateHandler: function(elemntId) {
			// tags: deprecated
			kernel.deprecated("lconn.search.searchResults.dateHandler", "Use lconn.core.DateUtil instead", "4.0");
		},
		
		toggleChildren: function(facetBodyId) {
			// tags: deprecated
			kernel.deprecated("lconn.search.searchResults.toggleChildren", "Use click event handlers instead", "4.5");
		},
		
		setPageSize: function(/*Integer*/pageSize, /*String|DOMNode*/focusNode) {
			this.APIHandler.changePageSize(pageSize);
			this.update({skipFacetsUpdate: true, focusNode: focusNode});
		},
		
		sortBy: function(/*String*/sortKey,/*String*/direction,/*String|DOMNode*/focusNode){
			this.APIHandler.sortResults(sortKey,direction);
			this.APIHandler.changePage(1);
			this.update({skipFacetsUpdate: true, focusNode: focusNode});
		},
		
		toggleSort: function(evt) {
			var eventRef = (typeof evt !== "undefined") ? evt : event;
			var elem = (typeof eventRef.target !== "undefined") ? eventRef.target : eventRef.srcElement;
			if(elem) {
				if(domClass.contains(elem,"lotusAscending")) {
					this.sortBy(elem.getAttribute("key"),"desc");
				} else {
					this.sortBy(elem.getAttribute("key"),"asc");
				}
			}
		},
		
		sortDescending: function(evt) {
			var elem;
			if(!evt) {evt = window.event;}
			if(evt.target) {elem=evt.target;}
			else if(evt.srcElement) {elem=evt.srcElement;}
			if(elem.nodeType === 3) {elem = elem.parentNode;}
			if(elem) {
				this.sortBy(elem.getAttribute("key"),"desc");
			}
		},
		
		sortAscending: function(evt) {
			var elem;
			if(!evt) {evt = window.event;}
			if(evt.target) {elem=evt.target;}
			else if(evt.srcElement) {elem=evt.srcElement;}
			if(elem.nodeType === 3) {elem = elem.parentNode;}
			if(elem) {
				this.sortBy(elem.getAttribute("key"),"asc");
			}
		},
		
		clearSort: function(/*String|DOMNode*/focusNode) {
			this.sortBy(null,null,focusNode);
		},
		
		tagOnlySearch: function(/*String*/tag) {
			this.APIHandler.clearQueryString();
			this.APIHandler.addTag(tag);
			this.update();
		},
		
		navigate: function(anchor,event) {
			// tags: deprecated
			kernel.deprecated("lconn.search.searchResults.navigate", "Use return true instead", "4.5");
			return true;
		},
		
		getLastRequest: function() {
			return this.APIHandler.getParameterString();
		},
		
		getStateHash: function() {
			return this.APIHandler.getHash();
		},
		
		onChange: function(){
			// summary: Use Dojo connect on this function to react to changes.
		},
		
		/**
		 * Register the callback provided to the tagChange topic.
		 * The callback will receive 3 parameters:
		 * 1- an array which will contain all tags currently selected
		 * 2- a string with the tag (added or removed)
		 * 3- a boolean (true = tag removed, false = tag added)
		 * 
		 * @param {function} callback
		 * @return {Object} hadler
		 */
		registerTagChange: function(/*Function*/callback) {
			return topic.subscribe(this.APIHandler.SEARCH_TAG_CHANGED_TOPIC, callback);
		},
		
		setStateHash: function(/*String*/hashed) {
			this.APIHandler.setHash(hashed);
			var compFilter = this.APIHandler.getComponentFilter();
			this.DATASTORE.setFilter(compFilter);
		}
	});
	
	return searchResults;
});