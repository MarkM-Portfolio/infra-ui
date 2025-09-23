/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.peopleFinder.directory.ResultDropDown");

dojo.require("lconn.core.peopleFinder.ResultDropDown");
dojo.require("lconn.core.widgetUtils");
dojo.require("lconn.core.url");

dojo.requireLocalization("lconn.core.peopleFinder.directory", "ResultDropDown");

dojo.declare(
	"lconn.core.peopleFinder.directory.ResultDropDown",
	[lconn.core.peopleFinder.ResultDropDown],
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
		this.strings = dojo.i18n.getLocalization("lconn.core.peopleFinder.directory", "ResultDropDown");
		dojo.mixin(this, this.strings);
	},
	
	buildRendering: function() {
		this.inherited(arguments);
		
		this.createdWidgets = [];
		this.selectionArray = [];
		
		var container = document.createElement("div");
		container.style.width = this.width + "px";
		container.style.border = "0px";
		dojo.addClass(container, "icSearchResults");
		
		this.normalScopeNode = document.createElement("div");
		this.normalScopeNode.setAttribute("role", "option");
		this.normalScopeNode.setAttribute("aria-describedby", this.id + "_normalScopeAria");
		dojo.addClass(this.normalScopeNode, "pfNormalScope");
		this.connect(this.normalScopeNode, "onclick", "searchOnScope");
		this.connect(this.normalScopeNode, "onmouseover", dojo.hitch(this, "onMouseOver", this.normalScopeNode));
		
		var searchButton = document.createElement("div");
		searchButton.className = "lotusSearch pfSearchIcon";
		var sbEl = document.createElement("span");
		sbEl.className = "lotusBtnImg";
		var searchImg = document.createElement("input");
		searchImg.type = "image";
		searchImg.className = "lotusSearchButton";
		searchImg.src = lconn.core.widgetUtils.addVersionNumber(this._blankGif);
		searchImg.alt = "";
		searchImg.setAttribute("role", "presentation");
		sbEl.appendChild(searchImg);
		searchButton.appendChild(sbEl);
		this.normalScopeNode.appendChild(searchButton);
		
		this.normalScopeTextNode = document.createElement("div");
		dojo.addClass(this.normalScopeTextNode, "pfTextMessage");
		this.normalScopeNode.appendChild(this.normalScopeTextNode);
		
		this.directoryNode = document.createElement("div");
		dojo.addClass(this.directoryNode, "pfDirectoryResults");
		dojo.addClass(this.directoryNode, "lconnSearchHighlight");
		this.directoryNode.style.display = "none";
		
		var titleNode = document.createElement("div");
		dojo.addClass(titleNode, "pfTitle");
		titleNode.innerHTML = this.DIRECTORY_RESULTS;
		this.directoryNode.appendChild(titleNode);
		
		this.resultContainer = document.createElement("div");
		this.directoryNode.appendChild(this.resultContainer);
		
		this.directoryLinkNode = document.createElement("div");
		this.directoryLinkNode.setAttribute("role", "option");
		this.directoryLinkNode.setAttribute("aria-describedby", this.id + "_moreDirectoryAria");
		dojo.addClass(this.directoryLinkNode, "pfDirectoryLink");
		var moreLink = document.createElement("span");
		dojo.addClass(moreLink, "pfLinkNode");
		moreLink.innerHTML = this.MORE_DIRECTORY_RESULTS;
		//moreLink.href = "javascript:;";
		//this.connect(moreLink, "onclick", "redirectToDirectory");
		this.directoryLinkNode.appendChild(moreLink);
		this.connect(this.directoryLinkNode, "onclick", "redirectToDirectory");
		this.connect(this.directoryLinkNode, "onmouseover", dojo.hitch(this, "onMouseOver", this.directoryLinkNode));
		this.directoryNode.appendChild(this.directoryLinkNode);
		
		var normalScopeAria = document.createElement("div");
		dojo.addClass(normalScopeAria, "lotusHidden");
		normalScopeAria.innerHTML = this.SEARCH_SCOPE_ARIA_LABEL;
		normalScopeAria.id = this.id + "_normalScopeAria";
		var entryAria = document.createElement("div");
		dojo.addClass(entryAria, "lotusHidden");
		entryAria.innerHTML = this.ENTRY_ARIA_LABEL;
		entryAria.id = this.id + "_entryAria";
		var moreDirectoryAria = document.createElement("div");
		dojo.addClass(moreDirectoryAria, "lotusHidden");
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
		setTimeout(dojo.hitch(this, function() {
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
		var url = this.getDirectoryLink();
		url += "#q=" + encodeURIComponent(this.currentQuery);
		window.location = url;
	},
	
	getString: function(stringId, params) {
		return dojo.string.substitute(this.strings[stringId], params);
	},
	
	getDirectoryLink: function() {
		var url = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles) || lconn.core.url.getServiceUrl(lconn.core.config.services.scprofiles).toString().replace(/\/contacts/, "");
		url += "/html/searchProfiles.do";
		return url;
	}
});
