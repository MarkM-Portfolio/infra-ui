/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/i18n",
	"dojo/i18n!./nls/ResultDropDown",
	"../../config/services",
	"../ResultDropDown",
	"../../url",
	"../../widgetUtils"
], function (dojo, declare, lang, domClass, i18n, i18nResultDropDown, services, ResultDropDown, urlModule, widgetUtils) {

	var ResultDropDown = declare(
		"lconn.core.peopleFinder.directory.ResultDropDown",
		ResultDropDown,
	{
		normalScopeNode: null,
		normalScopeTextNode: null,
		directoryNode: null,
		directoryLinkNode: null,
		
		strings: null,
		
		currentQuery: "",
		
		_doNotDisplay: false,
		
		postMixInProperties: function(){
			this.inherited(arguments);
			this.strings = i18nResultDropDown;
			lang.mixin(this, this.strings);
		},
		
		buildRendering: function() {
			this.inherited(arguments);
			
			this.createdWidgets = [];
			this.selectionArray = [];
			
			var container = document.createElement("div");
			container.style.width = this.width + "px";
			container.style.border = "0px";
			domClass.add(container, "icSearchResults");
			
			this.normalScopeNode = document.createElement("div");
			this.normalScopeNode.setAttribute("role", "option");
			this.normalScopeNode.setAttribute("aria-describedby", this.id + "_normalScopeAria");
			domClass.add(this.normalScopeNode, "pfNormalScope");
			this.connect(this.normalScopeNode, "onclick", "searchOnScope");
			this.connect(this.normalScopeNode, "onmouseover", lang.hitch(this, "onMouseOver", this.normalScopeNode));
			
			var searchButton = document.createElement("div");
			searchButton.className = "lotusSearch pfSearchIcon";
			var sbEl = document.createElement("span");
			sbEl.className = "lotusBtnImg";
			var searchImg = document.createElement("input");
			searchImg.type = "image";
			searchImg.className = "lotusSearchButton";
			searchImg.src = widgetUtils.addVersionNumber(this._blankGif);
			searchImg.alt = "";
			searchImg.setAttribute("role", "presentation");
			sbEl.appendChild(searchImg);
			searchButton.appendChild(sbEl);
			this.normalScopeNode.appendChild(searchButton);
			
			this.normalScopeTextNode = document.createElement("div");
			domClass.add(this.normalScopeTextNode, "pfTextMessage");
			this.normalScopeNode.appendChild(this.normalScopeTextNode);
			
			this.directoryNode = document.createElement("div");
			domClass.add(this.directoryNode, "pfDirectoryResults");
			domClass.add(this.directoryNode, "lconnSearchHighlight");
			this.directoryNode.style.display = "none";
			
			var titleNode = document.createElement("div");
			domClass.add(titleNode, "pfTitle");
			titleNode.innerHTML = this.DIRECTORY_RESULTS;
			this.directoryNode.appendChild(titleNode);
			
			this.resultContainer = document.createElement("div");
			this.directoryNode.appendChild(this.resultContainer);
			
			this.directoryLinkNode = document.createElement("div");
			this.directoryLinkNode.setAttribute("role", "option");
			this.directoryLinkNode.setAttribute("aria-describedby", this.id + "_moreDirectoryAria");
			domClass.add(this.directoryLinkNode, "pfDirectoryLink");
			var moreLink = document.createElement("span");
			domClass.add(moreLink, "pfLinkNode");
			moreLink.innerHTML = this.MORE_DIRECTORY_RESULTS;
			//moreLink.href = "javascript:;";
			//this.connect(moreLink, "onclick", "redirectToDirectory");
			this.directoryLinkNode.appendChild(moreLink);
			this.connect(this.directoryLinkNode, "onclick", "redirectToDirectory");
			this.connect(this.directoryLinkNode, "onmouseover", lang.hitch(this, "onMouseOver", this.directoryLinkNode));
			this.directoryNode.appendChild(this.directoryLinkNode);
			
			var normalScopeAria = document.createElement("div");
			domClass.add(normalScopeAria, "lotusHidden");
			normalScopeAria.innerHTML = this.SEARCH_SCOPE_ARIA_LABEL;
			normalScopeAria.id = this.id + "_normalScopeAria";
			var entryAria = document.createElement("div");
			domClass.add(entryAria, "lotusHidden");
			entryAria.innerHTML = this.ENTRY_ARIA_LABEL;
			entryAria.id = this.id + "_entryAria";
			var moreDirectoryAria = document.createElement("div");
			domClass.add(moreDirectoryAria, "lotusHidden");
			moreDirectoryAria.innerHTML = this.MORE_DIRECTORY_ARIA_LABEL;
			moreDirectoryAria.id = this.id + "_moreDirectoryAria";
			
			container.appendChild(this.normalScopeNode);
			container.appendChild(this.directoryNode);
			container.appendChild(normalScopeAria);
			container.appendChild(entryAria);
			container.appendChild(moreDirectoryAria);
			
			this.content = container;
		},
		
		_cleanAll: function() {
			this.inherited(arguments);
			
			this.directoryNode.style.display = "none";
		},
		
		setResults: function(data) {
			this._cleanAll();
			
			if(!data || !data.data) {
				this.closeResults();
				return;
			}
			data = data.data;
			
			this.selectionArray.push(this.normalScopeNode);
			
			this._insertElements(data);
					
			if(data.length > 0) {
				this.selectionArray.push(this.directoryLinkNode);
				this.directoryNode.style.display = "";
			}
			
			this._prepareSelectionArray();
			
			this._selectElement(this.selectionArray[0]);
		},
		
		executeSelectedAction: function() {
			if(!this.selectedElement) {
				this.normalScopeNode.click();
			} else {
				this.selectedElement.click();
			}
			
			this._doNotDisplay = true;
			this.closeResults();
			setTimeout(lang.hitch(this, function() {
				this._doNotDisplay = false;
			}), 500);
		},
		
		setQueryString: function(query, scope) {
			this.currentQuery = query;
			this.normalScopeTextNode.innerHTML = this.getString("SEARCH_SCOPE_STRING", {"query": query, "scope": scope});
		},
		
		entrySelected: function(entry, evt) {
			entry.personClick();
		},
		
		searchOnScope: function() {
			//Callback - nothing here
		},
		
		onActiveDescendantChanged: function(id) {
			//Callback - nothing here
		},
		
		redirectToDirectory: function() {
			var url = urlModule.getServiceUrl(services.profiles);
			url += "/html/searchProfiles.do#q=" + encodeURIComponent(this.currentQuery)
			window.location = url;
		},
		
		getString: function(stringId, params) {
			return dojo.string.substitute(this.strings[stringId], params);
		}
	});
	return ResultDropDown;
});
