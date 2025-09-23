/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.         */

define([
	"dojo/dom-construct",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/i18n!./nls/searchResults",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/on",
	"dojo/topic",
	"dojo/dom-geometry",
	"dijit/_Widget",
	"ic-core/url",
	"ic-core/config/features",
	"ic-core/config/services",
	"./aclFilter",
	"./parentFilter",
	"./typeFilter"
], function (domConstruct, array, declare, lang, i18nsearchResults, domClass, domStyle, on, topic, domGeom, _Widget, url, has, services, aclFilter, parentFilter, typeFilter) {

	var FiltersForm = declare(
		"lconn.search.FiltersForm",
		_Widget,
	{
		apiHandler: null,						// Instance of lconn.search.searchAPI
		communitiesEnabled: false,				// Whether or not forum categories are enabled in LotusConnections-config
		defaultProfilesUserStateSearch: null,	// The config setting for profiles user state search in LotusConnections-config
		forumCategoriesEnabled: false,			// Whether or not forum categories are enabled in LotusConnections-config
		ideationBlogsEnabled: false,			// Whether or not IdeationBlogs are enabled in LotusConnections-config
		_strings: null,
		onSubmit: null,							// Function to call when the form is submitted
		standaloneBlogsDisabled: false,			// Whether or not blogs are disabled as a standalone app (ie. only inside a community)
		standaloneForumsDisabled: false,		// Whether or not forums are disabled as a standalone app (ie. only inside a community)
		standaloneWikisDisabled: false,			// Whether or not wikis are disabled as a standalone app (ie. only inside a community)
		isUserExternal: false,					// Whether authenticated user is external user
		shouldBoostMyContent: true,				//content boost
		
		ADVANCED_SEARCH_PATH: "/web/jsp/advancedSearch.jsp",
		
		buildRendering : function() {
	
			this._strings = i18nsearchResults;
	
			this.shouldBoostMyContent = this.apiHandler.isPersonalizationEnabled();
	
			var form = domConstruct.create("form");
			domClass.add(form, "lotusForm lconnClearFix");
			domStyle.set(form, {
				"marginTop":"5px",
				"marginBottom":"38px",
				"background":"none"
			});
			
			var div = domConstruct.create('div', {
				"id":"filtersContainer",
				"class":"lotusMeta icFiltersLeft",
				"innerHTML":'&nbsp;<span class="lotusAccess" id="lconnSearchResultsFiltersDescription">' + this._strings.FILTERS_DESCRIPTION + '</span>'
			}, form);
			if(has("ie") != 7){
				// This CSS causes problems in IE7 mode. Works correctly in IE Standards mode.
				domStyle.set(div, {
					"paddingBottom":"1em",
					"borderBottom":"1px solid #EEE",
					"display": "inline-block" //content boost
				});
			}
	
			if (this._isAclDropDownVisible()) {
				var acl = new aclFilter({
					apiHandler: this.apiHandler,
					onSubmit: this.onSubmit,
					id: this.id+"_acl"
				});
				domConstruct.place(acl.domNode,div);
			}
	
			if (this._isTypeDropDownVisible()){
				var type = new typeFilter({
					apiHandler: this.apiHandler, 
					communitiesEnabled: this.communitiesEnabled,
					defaultProfilesUserStateSearch: this.defaultProfilesUserStateSearch,
					ideationBlogsEnabled: this.ideationBlogsEnabled,
					onSubmit: this.onSubmit,
					id: this.id+"_type"
				});
				domConstruct.place(type.domNode,div);
			}
	
			if (this._isAllTypesDropDownVisible()){
				var parent = new parentFilter({
					apiHandler: this.apiHandler, 
					onSubmit: this.onSubmit,
					id: this.id+"_parent"
				});
				domConstruct.place(parent.domNode,div);
			}
	
			if (this._isAclDropDownVisible() || this._isTypeDropDownVisible() || this._isAllTypesDropDownVisible() ){
				this._createLinkSubmit(div);
			}
			
			//content boost - start
			var rightDiv = domConstruct.create("div", {"class": "icFiltersRight", "style": "display: inline-block"});
			form.appendChild(rightDiv);
			
			var contentBoostContainer = document.createElement("div");
			contentBoostContainer.style.display = "inline-block";
			contentBoostContainer.style.padding = "0px 10px";
			
			var checkBox = document.createElement("input");
			checkBox.id = this.id + "_contentBoost";
			checkBox.setAttribute("type", "checkbox");
			checkBox.setAttribute("role", "checkbox");
			checkBox.style.verticalAlign = "middle";
			checkBox.checked = this.shouldBoostMyContent;
			checkBox.setAttribute("aria-checked", this.shouldBoostMyContent);
			this.connect(checkBox, "onclick", lang.hitch(this, "_checkBoxClicked", checkBox));
			contentBoostContainer.appendChild(checkBox);
			
			var label = document.createElement("label");
			label.setAttribute("for", checkBox.id);
			label.style.padding = "0px 5px";
			label.innerHTML = this._strings.BOOST_MY_CONTENT;
			contentBoostContainer.appendChild(label);
			
			rightDiv.appendChild(contentBoostContainer);
			//content boost - end
			
			//advancedSearch - start
			if(has("search-global-search-restyle")) {
				var advancedSearchNode = document.createElement("div");
				advancedSearchNode.style.display = "inline-block";
				
				var advancedSearchLink = document.createElement("a");
				advancedSearchLink.href = url.getServiceUrl(services.search) + this.ADVANCED_SEARCH_PATH;
				advancedSearchLink.innerHTML = this._strings.ADVANCED_SEARCH;
				advancedSearchNode.appendChild(advancedSearchLink);
				
				rightDiv.appendChild(advancedSearchNode);
			}
			//advancedSearch - stop
			
			this.domNode = form;
			
			// Setting the containerNode ensures destroyRecursive destroys the children
			this.containerNode = this.domNode;
		},
		
		_isTypeDropDownVisible : function() {
			var component = this.apiHandler.getComponentFilter();
			if (component!=="activities" && component!=="forums" && component!=="blogs"
				&& component!=="communities" && component!=="wikis" && component!=="profiles"){
				return false;
			}
			return true;
		},
		
		_isAllTypesDropDownVisible : function() {
			var component = this.apiHandler.getComponentFilter();
			var allTypesDropDownVisible;
			if (component === "files" || component === "all_files") {
				allTypesDropDownVisible = true;
			} else {
				allTypesDropDownVisible = !this.isUserExternal;
			}
			return allTypesDropDownVisible && this.communitiesEnabled && 
				this._currentComponentCanBeStandalone() && this._isCommunitiesEntitled();
		},
		
		// Add check communities entitlements
		_isCommunitiesEntitled: function() {
			if (this.filterOptions && array.indexOf(this.filterOptions,"communities")>=0){
				return true;
			}
			return false;
		},
		
		_isAclDropDownVisible : function() {
			return !this.isUserExternal;
		},
	
		_currentComponentCanBeStandalone : function(){
			var component = this.apiHandler.getComponentFilter();
			if (component === "blogs" && this.standaloneBlogsDisabled){
				return false;
			}
			if (component === "forums" && this.standaloneForumsDisabled){
				return false;
			}
			if (component === "wikis" && this.standaloneWikisDisabled){
				return false;
			}			
			return true;
		},
		
		_createLinkSubmit : function(parentDiv){
			var div = domConstruct.create("div", {
				"class":"lotusLeft"
			}, parentDiv);
			domStyle.set(div, "padding", "0px 2px");
			
			if(domGeom.isBodyLtr()){
				domStyle.set(div, "marginLeft", "5px");
			} else {
				domStyle.set(div, "marginRight", "5px");
			}
			
			var a = domConstruct.create("a", {
				"innerHTML":this._strings.FILTERS_SUBMIT,
				"href":"javascript:;",
				"role":"button",
				"id":this.id+"_Submit"
			}, div);
			this.connect(a, "onclick", lang.hitch(this,this.onSubmit,{focusNode: this.id+"_Submit"}));
		},
		
		_checkBoxClicked: function(checkBox, evt) {
			if(evt) {
				evt.preventDefault(), evt.stopPropagation();
			}
			
			this.shouldBoostMyContent = checkBox.checked;
			checkBox.setAttribute("aria-checked", this.shouldBoostMyContent);
			this.apiHandler.setPersonalization(this.shouldBoostMyContent);
			this.onSubmit({focusNode: checkBox.id});
		}
	});
	return FiltersForm;
});
