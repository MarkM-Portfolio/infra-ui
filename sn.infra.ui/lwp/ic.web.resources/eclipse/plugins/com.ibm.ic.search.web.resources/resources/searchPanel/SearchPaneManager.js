/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/fx",
	"dojo/_base/event",
	"dojo/DeferredList",
	"dojo/dom-class",
	"dojo/dom-geometry",
	"dojo/dom-attr",
	"dojo/i18n",
	"dojo/i18n!./nls/SearchPaneManager",
	"dojo/text!./templates/SearchPaneManager.html",
	"dojo/string",
	"dijit/_Widget",
	"dijit/_Templated",
	"ic-core/url",
	"ic-core/config/services",
	"ic-core/config/features",
	"ic-core/peopleFinder/directory/PeopleFinderService",
	"ic-core/quickResults/QuickResultsService",
	"ic-ui/layout/insights/NewRelic",
	"ic-ui/layout/insights/tracker",
	"./SearchBar",
	"./SearchPane",
	"./history/HistoryWidget",
	"./typeahead/TypeaheadWidget"
], function (declare, lang, fx, eventModule, DeferredList, domClass, domGeom, domAttr, i18n, i18nSearchPaneManager, template, string,
		_Widget, _Templated, urlModule, services, has, PeopleFinderService, QuickResultsService, NewRelic, trackerObj, SearchBar,
		SearchPane, HistoryWidget, TypeaheadWidget) {

	var Tracker = trackerObj.getInstance("search");
	if(!has("search-panel-ui-insights")) {
		Tracker = {
			track: function() {}
		}
	}
	
	/**
	 * Connnections Search Panel widget
	 * 
	 * @class ic-search/searchPanel/SearchPaneManager
	 * @extends dijit/_Widget
	 * @extends dijit/_Templated
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var SearchPaneManager = declare(
		"lconn.search.searchPanel.SearchPaneManager",
		[_Widget, _Templated], /** @lends ic-search.searchPanel.SearchPaneManager.prototype */
	{
		/**
		 * localOption is an object (if an array first element will be taken) which will be used
		 * to initialise the search scope related to the current page.
		 * Example:
		 * {
		 * 		//A resourced string which will be used as the scope label
		 * 		label: 'myResourcedLabel',
		 * 
		 * 		//When this scope is selected, a hidden input field named 'scope' is set
		 * 		//to (in this example) 'keyword'.
		 * 		scope: 'keyword',
		 * 
		 * 		//When this scope is selected, a hidden input field named 'component' is set
		 * 		//to (in this example) 'profiles'.
		 * 		feature: 'profiles',
		 * 
		 *		//it will use localSearchUrl. (OPTIONAL)
		 * 		//Specify a post URL to use especially for this scope. If none is given,
		 * 		action: '/profiles/html/keywordSearch.do',
		 * 
		 * 		//Optionally specify whether this option should GET or POST
		 * 		method: "GET",	(or "POST")
		 * 
		 * 		//if defined, this OPTIONAL parameter wont send the form,
		 * 		//but will replace (in this example) {myQuery} in the action
		 * 		//with the query the user entered and then redirect to the
		 * 		//new action url
		 * 		valueReplaceParam: 'myQuery'
		 * }
		 * 
		 * @default [null]
		 * @type {?(Object|Array)}
		 */
		localOptions: null,
		
		/**
		 * thirdPartySearchEngines is an array of objects which will be used to initialize several
		 * menu items in the scope drop down of the search panel. Shown are several supported
		 * options, however note that the entire object will be passed in as the parameter
		 * object to dijit.MenuItem so you may use that to your advantage.
		 * Example:
		 * [{
		 * 		//A resourced string which will be used as the MenuItem label
		 * 		label: myResourcedLabel,
		 * 
		 * 		//When this menu item is selected, a hidden input field named
		 * 		//'scope' is set to (in this example) 'keyword'.
		 * 		scope: 'keyword',
		 * 
		 * 		//Specify a post URL to use especially for this menu item. If none
		 * 		// is given, it will use localSearchUrl (see below). (OPTIONAL)
		 * 		action: 'www.ibm.com/search'
		 * }]
		 * 
		 * @default [null]
		 * @type {Array}
		 */
		thirdPartySearchEngines : null,
		
		SEARCH_DIRECTORY: "directory",
		SEARCH_PATH : "/web/search",
		
		/**
		 * Reference to the SearchBar inside the panel.
		 * 
		 * @see {@link ic-search/searchPanel/SearchBar}
		 */
		searchBar: null,
		_tmpSearchBar: null,
		
		/**
		 * Defines the visualisation mode of the search panel.
		 * If true, it will appear as a search bar open (useful for result pages).
		 * If false (default), it will appear as a button which will open the search panel
		 * 
		 * @default [false]
		 * @type {boolean}
		 */
		isSearchBarModeOn: false,
		
		/**
		 * Defines the minimum amount of pixels from top of the page
		 * the search button would keep while page is scrolling.
		 * 
		 * @default [20]
		 * @type {number}
		 */
		buttonMinTop: 20,
		
		/**
		 * Defines the minimum amount of pixels from top of the page
		 * the panel would keep while page is scrolling.
		 * 
		 * @default [0]
		 * @type {number}
		 */
		panelMinTop: 0,
		
		templateString: template,
		widgetsInTemplate: true,
		commonStrings: null,
		historyWidget: null,
		typeaheadWidget: null,
		searchPane: null,
		servicesList: null,
		globalScope: null,
		_offsets: {},
		_serciveTimeout: 1500,
		_maxResults: 7,
		_globalOptionNode: null,
		_localOptionNode: null,
		_optionsNode: null,
		_selectedOption: null,
		_disabled: true,
		
		_LOCAL_SCOPE: "local",
		_GLOBAL_SCOPE: "global",
		_THIRD_PARTY: "third_party",
		
		postMixInProperties: function(){
			this.commonStrings = i18nSearchPaneManager;
			lang.mixin(this, this.commonStrings);
			
			this.globalScope = {
				label: this.ALL_CONTENT,
				scope: "allconnections",
				action: urlModule.getServiceUrl(services.search) + this.SEARCH_PATH,
				method: "GET"
			};
			
			this.inherited(arguments);
		},
		
		postCreate: function() {
			if(this.localOptions instanceof Array) {
				this.localOptions = this.localOptions[0];
			}
			
			this._selectedOption = this.globalScope;
			this.connect(this.domNode, "onclick", "openSearchPane");
			
			this.connect(this._otherSearchBar, "onGlobalOptionClicked", lang.hitch(this, "runSearch", this._GLOBAL_SCOPE));
			this.connect(this._otherSearchBar, "onLocalOptionClicked", lang.hitch(this, "runSearch", this._LOCAL_SCOPE));
			this.connect(this._otherSearchBar, "onThirdPartySearch", lang.hitch(this, "runSearch", this._THIRD_PARTY));
			
			this.searchBar = new SearchBar({
				SEARCH_PLACEHOLDER: this.SEARCH_BAR_PLACEHOLDER,
				SEARCH_ALT_TEXT: this.SEARCH_BAR_ALT_TEXT,
				SEARCH_INSTRUCTIONS: this.SEARCH_BAR_INSTRUCTIONS,
				globalScopeLabel: this.globalScope.label,
				globalScopeAria: this.GLOBAL_SCOPE_BUTTON,
				thirdPartySearchEngines: this.thirdPartySearchEngines
			});
			this.searchBar.startup();
			this.searchBar.selectScope(this.searchBar._globalOptionNode);
			if(this.localOptions && this.localOptions.label) {
				this.searchBar.setLocalScopeOption(this.localOptions.label, string.substitute(this.LOCAL_SCOPE_BUTTON, {scope: this.localOptions.label}));
			}
			this.connect(this.searchBar, "onGlobalOptionClicked", lang.hitch(this, "runSearch", this._GLOBAL_SCOPE));
			this.connect(this.searchBar, "onLocalOptionClicked", lang.hitch(this, "runSearch", this._LOCAL_SCOPE));
			this.connect(this.searchBar, "onThirdPartySearch", lang.hitch(this, "runSearch", this._THIRD_PARTY));
			this.connect(this.searchBar, "onEmptyQuery", "_handleEmptyQuery");
			this.connect(this.searchBar, "onTypeahead", "runTypeaheadQuery");
			this.connect(this.searchBar, "onThirdPartySelected", "_handleThirdPartySelection");
			var that = this;
			this.connect(this.searchBar, "runQuery", function() {
				setTimeout(function() {
					if(that.searchBar.getTextField().value) {
						that.historyWidget.hideWidget();
						that.searchBar.showScopes();
					}
				}, 1);
			});
			this.searchPane = new SearchPane();
			this.searchPane.topSection.appendChild(this.searchBar.domNode);
			this.searchPane.startup();
			this.searchBar.connect(this.searchPane, "onShowEnded", this.searchBar.focus);
			this.connect(this.searchPane, "onHideEnded", "_focus");
			
			this.connect(document, "onscroll", "_scroll");
			
			this.connect(this._searchButton, "onfocus", function() {
				domClass.add(this.domNode, "icSearchFocused");
			});
			this.connect(this._searchButton, "onblur", function() {
				domClass.remove(this.domNode, "icSearchFocused");
			});
			
			this.historyWidget = new HistoryWidget({
				resultPerPage: 10,
				scrollNode: this.searchPane.domNode,
				containerWidth: this.searchPane.paneWidth
			});
			this.historyWidget.startup();
			this.historyWidget.hideWidget();
			this.searchPane.bottomSection.appendChild(this.historyWidget.domNode);
			this.searchPane.connect(this.historyWidget, "onEntryFocused", "_onEntryFocused");
			
			if(!this.servicesList) {
				this._initServices();
			}
			
			this.typeaheadWidget = new TypeaheadWidget({disableFooters: true, NO_RESULTS_MESSAGE: this.TYPEAHEAD_NO_RESULTS});
			this.typeaheadWidget.startup();
			this.connect(this.typeaheadWidget, "loginNodeFocused", lang.hitch(this.searchPane, "_onEntryFocused"));
			this.typeaheadWidget.hideWidget();
			this.searchPane.bottomSection.appendChild(this.typeaheadWidget.domNode);
			
			for(var i=0; i < this.servicesList.length; i++) {
				var service = this.servicesList[i];
				service.setTimeout(this._serciveTimeout);
				service.setPageSize(this._maxResults);
				service.focusCallback = lang.hitch(this.searchPane, "_onEntryFocused");
				this.typeaheadWidget.addServiceResponse(service.id);
			}
			
			this.domNode.style.display = "none";
			this._checkNavBar();
		},
		
		_checkNavBar: function() {
			var navBar = document.querySelector(".ics-scbanner");
			if(!document.body.classList.contains("scloud3")) {
				this._disabled = false;
				this._finalizeWidget();
			} else if(navBar && !navBar.classList.contains("loading")) {
				this._disabled = false;
				this._finalizeWidget();
			} else {
				setTimeout(lang.hitch(this, "_checkNavBar"), 100);
			}
		},
		
		_finalizeWidget: function() {
			if(this._disabled) {
				return;
			}
			this.domNode.style.display = "";
			this._initPosition();
			this._scroll();
			if(this.isSearchBarModeOn) {
				this._switchSearchBarMode();
			}
		},
		
		_initPosition: function() {
			if(this._disabled) {
				return;
			}
			//setting top fixed position
			if(document.getElementById("lotusBanner")){
				var navBar = domGeom.position("lotusBanner");
				this._populateOffsets(navBar.y + navBar.h);
				if(!this.isSearchBarModeOn) {
					this.domNode.style.top = this._offsets.domNode + "px";
					this.searchPane.domNode.style.top = this._offsets.searchPane + "px";
				}
			}
		},
		
		_initServices: function() {
			var pfService = new PeopleFinderService({
				isFocusable: true,
				SEARCH_PANE_COUNT_ID: "PEOPLE_FINDER_ANNOUNCEMENT"
			});
			pfService.startup();
			this.connect(pfService, "entryClicked", function(widget, evt) {
				if(evt.currentTarget && evt.currentTarget.href && evt.currentTarget.href.match(/^mailto:/i)) {
					Tracker.track("panel.clickPFMail", {
						confidence: widget.confidence
					});
				} else {
					Tracker.track("panel.clickPFEntry", {
						confidence: widget.confidence
					});
				}
			});
			
			var qrService = new QuickResultsService({
				isFocusable: true,
				SEARCH_PANE_COUNT_ID: "QUICK_RESULTS_ANNOUNCEMENT"
			});
			qrService.startup();
			this.connect(qrService, "entryClicked", function(widget, evt) {
				Tracker.track("panel.clickQREntry", {
					resultType: widget.source,
					viewedDate: widget.date.toISOString()
				});
			});
			
			this.servicesList = [
				qrService,
				pfService
			];
		},
		
		destroy: function() {
			this.searchBar.destroy();
			this.historyWidget.destroy();
			this.typeaheadWidget.destroy();
			this.searchPane.destroy();
		},
		
		_focus: function() {
			if(this.searchPane.domNode.contains(document.activeElement)) {
				this.focus();
			}
		},
		
		focus: function() {
			this._searchButton.focus();
		},
		
		runSearch: function(scope) {
			var query = this.searchBar.getTextValue();
			if(!query.trim()) {
				return;
			}
			
			switch(scope) {
				case this._LOCAL_SCOPE: this._selectedOption = this.localOptions; break;
				case this._THIRD_PARTY: this._selectedOption = this.searchBar.getSelectedThirdPartyOption() || this.globalScope; break;
				default: this._selectedOption = this.globalScope;
			}
			
			Tracker.track("panel.search", {
				queryLength: query.length,
				queryScope: this._selectedOption.scope || this._selectedOption.feature
			});
			
			if(this.onSubmit()) {
				if(scope == this._LOCAL_SCOPE && this.localOptions.valueReplaceParam) {
					var url = this.localOptions.action;
					url = url.replace(new RegExp("\{" + this.localOptions.valueReplaceParam + "\}", "gi"), encodeURIComponent(query));
					window.location.href = url;
					return;
				}
				this._prepareForm(this._selectedOption, query);
				this.formNode.submit();
			}
		},
		
		_prepareForm: function(item, query) {
			if (item.scope) {
				this.scopeNode.value = item.scope;
				this.featureNode.value = item.feature ? item.feature : '';
			} else if (item.feature) {
				if (item.feature == 'allareas') {
					this.featureNode.value = '';
				} else {
					this.featureNode.value = item.feature;
				}
				this.scopeNode.value = '';
			}
			
			if (item.action) {
				if (item.scope == "extkeyword") {
					this.formNode.method = "GET";
					this.formNode.action = item.action;
				} else {
					this.formNode.method = "POST";
					this.formNode.action = item.action;
				}
			} else {
				this.formNode.method = "GET";
				this.formNode.action = this.globalScope.action;
			}
			
			if (item.method && item.method == "GET" || item.method == "POST") {
				this.formNode.method = item.method;
			}
			
			this.queryNode.value = query;
			this.featureNode.name = item.action == this.globalScope.action ? "scope" : "component";
			
			if(!this.featureNode.value) {
				domAttr.set(this.featureNode, "disabled", true);
			} else {
				domAttr.remove(this.featureNode, "disabled");
			}
			
			if(!this.scopeNode.value) {
				domAttr.set(this.scopeNode, "disabled", true);
			} else {
				domAttr.remove(this.scopeNode, "disabled");
			}
		},
		
		runTypeaheadQuery: function(query) {
			this.typeaheadWidget._showLogin = false;
			var promisesList = [];
			for(var i=0; i < this.servicesList.length; i++) {
				var service = this.servicesList[i];
				var promise = service.executeQuery(query);
				promise.then(lang.hitch(this, "_setTypeaheadResults", service.id));
				promisesList.push(promise);
			}
			
			var deferredList = new DeferredList(promisesList);
			deferredList.then(lang.hitch(this, "_showTypeaheadResults"));
		},
		
		_setTypeaheadResults: function(serviceId, data) {
			this.typeaheadWidget.setResults(serviceId, data);
			if(data && data.showLogin) {
				this.typeaheadWidget.showLogin(data.showLogin);
			}
		},
		
		_showTypeaheadResults: function() {
			this.typeaheadWidget.showWidget();
			var ariaString = [];
			for(var i=0; i < this.servicesList.length; i++) {
				var service = this.servicesList[i];
				var n = this.typeaheadWidget.getResultsCountForService(service.id);
				if(n > 0) {
					ariaString.push(string.substitute((n > 1 ? this.commonStrings[service.SEARCH_PANE_COUNT_ID] : this.commonStrings[service.SEARCH_PANE_COUNT_ID + "_SINGULAR"]), {number: n}));
				}
			}
			if(ariaString.length > 0) {
				ariaString.push(string.substitute(this.SEARCH_SCOPE_ANNOUNCEMENT, {scope: this.isSearchBarModeOn && this.localOptions ? this.localOptions.label : this.globalScope.label}));
			}
			
			setTimeout(lang.hitch(this, function() {
				this.searchBar.setAriaLiveString(ariaString.join(". "));
			}), 1);
		},
		
		runHistoryQuery: function() {
			var promise = this.historyWidget.initHistoryContent();
			promise.then(lang.hitch(this, function() {
				this.historyWidget.showWidget();
			}));
		},
		
		_handleEmptyQuery: function() {
			setTimeout(lang.hitch(this, function() {
				this.searchBar.setAriaLiveString("");
			}), 1);
			this.searchBar.hideScopes();
			this.typeaheadWidget.hideWidget();
			this.runHistoryQuery();
		},
		
		_handleThirdPartySelection: function() {
			setTimeout(lang.hitch(this, function() {
				this.searchBar.setAriaLiveString("");
			}), 1);
			this.historyWidget.hideWidget();
			this.typeaheadWidget.hideWidget();
		},
		
		_populateOffsets: function(additionalOffset) {
			if(this._disabled) {
				return;
			}
			this._offsets.domNode = domGeom.position(this.domNode).y;
			var displayValue = this.searchPane.domNode.style.display;
			this.searchPane.domNode.style.display = "";
			this._offsets.searchPane = domGeom.position(this.searchPane.domNode).y;
			this.searchPane.domNode.style.display = displayValue;
			
			if(additionalOffset) {
				this._offsets.domNode += additionalOffset;
				this._offsets.searchPane += additionalOffset;
			}
		},
		
		_scroll: function(evt) {
			if(this._disabled) {
				return;
			}
			if(this.isSearchBarModeOn) {
				return;
			}
			if(!this._offsets.domNode) {
				this._populateOffsets();
			}
			var posOffset = this._offsets.domNode - window.pageYOffset;
			var offsetPanel = this._offsets.searchPane - window.pageYOffset;
			if(posOffset <= this.buttonMinTop && window.pageYOffset > 0) {
				this.domNode.style.top = this.buttonMinTop + "px";
				this.searchPane.domNode.style.top = this.panelMinTop + "px";
			} else if(posOffset <= this.buttonMinTop && window.pageYOffset <= 0) {
				this.domNode.style.top = this._offsets.domNode + "px";
				this.searchPane.domNode.style.top = this._offsets.searchPane + "px";
			} else {
				this.domNode.style.top = posOffset + "px";
				this.searchPane.domNode.style.top = offsetPanel + "px";
			}
		},
		
		setLocalOptions: function(newOption) {
			this.localOptions = newOption || {label: ""};
			
			if(this.localOptions instanceof Array) {
				this.localOptions = this.localOptions[0];
			}
			
			this.searchBar.setLocalScopeOption(this.localOptions.label, string.substitute(this.LOCAL_SCOPE_BUTTON, {scope: this.localOptions.label}));
		},
		
		openSearchPane: function(evt) {
			if(this.isSearchBarModeOn) {
				return;
			}
			if(this._disabled) {
				setTimeout(lang.hitch(this, "openSearchPane", evt), 100);
			}
			
			if(evt) {
				eventModule.stop(evt);
			}
			
			Tracker.track("panel.open", {
				pageScrollOffset: window.pageYOffset
			});
			
			this.searchPane.show();
			
			if(!this.searchBar._lastQuery) {
				this.runHistoryQuery();
			}
		},
		
		/**
		 * Return the selected option triggered by a user search.
		 * 
		 * @return {Object} selectedOption
		 */
		getSelectedOption: function() {
			return this._selectedOption;
		},
		
		/**
		 * Return true if the selected option is a third party search engine.
		 * 
		 * @return {boolean} isThirdPartySearchEngineSelected
		 */
		isThirdPartySearchEngineSelected: function() {
			return this.searchBar.isThirdPartySearchEngineSelected();
		},
		
		/**
		 * Change isSearchBarModeOn and perform the proper visual changes if needed.
		 * 
		 * @param {boolean} isOn
		 */
		setSearchBarMode: function(isOn) {
			isOn = !!isOn;
			if(this.isSearchBarModeOn == isOn) {
				return;
			}
			
			this.isSearchBarModeOn = isOn;
			
			this._switchSearchBarMode();
		},
		
		_switchSearchBarMode: function() {
			if(this._disabled) {
				return;
			}
			if(this.isSearchBarModeOn) {
				domClass.add(this.domNode, "icSearchBarMode");
				var query = this.searchBar.getTextValue();
				this._otherSearchBar.setTextValue(query);
				
				this._tmpSearchBar = this.searchBar;
				this.searchBar = this._otherSearchBar;
				
				if(this.localOptions && this.localOptions.label) {
					this.searchBar.setLocalScopeOption(this.localOptions.label, string.substitute(this.LOCAL_SCOPE_BUTTON, {scope: this.localOptions.label}));
					this.searchBar.selectScope(this.searchBar._localOptionNode, string.substitute(this.LOCAL_SCOPE_PLACEHOLDER, {scope: this.localOptions.label}));
					this._selectedOption = this.localOptions;
				}
				
				this._searchButton.style.display = "none";
				this.domNode.style.top = "0px";
				this.searchBar.domNode.style.display = "";
				this.searchPane.hide();
			} else {
				domClass.remove(this.domNode, "icSearchBarMode");
				var query = this.searchBar.getTextValue();
				this._tmpSearchBar.setTextValue(query);
				
				this.searchBar.selectScope(this.searchBar._globalOptionNode, this.GLOBAL_SCOPE_PLACEHOLDER);
				this.searchBar = this._tmpSearchBar;
				this._selectedOption = this.globalScope;
				
				this._otherSearchBar.domNode.style.display = "none";
				this._searchButton.style.display = "";
				this._scroll();
			}
		},
		
		/**
		 * Override this function if you want to run some special javascript
		 * when the form is submitted. Return false if you don't want to
		 * actually perform a full form submit. Return true if you do.
		 */
		onSubmit: function() {
			//Override me
			return true;
		}
	});
	
	return SearchPaneManager;
});