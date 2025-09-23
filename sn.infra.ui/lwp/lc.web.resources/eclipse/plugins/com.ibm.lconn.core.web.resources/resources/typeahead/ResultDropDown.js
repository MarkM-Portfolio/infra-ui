/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.typeahead.ResultDropDown");

dojo.require("dijit.TooltipDialog");
dojo.require("lconn.core.auth");
dojo.require("lconn.core.widgetUtils");

dojo.require("dojo.i18n");
dojo.requireLocalization("lconn.core.typeahead", "ResultDropDown");

/**
 * This class will manage the rendering of lconn.core.typeahead.Service
 * results using a drop down tooltip.
 * 
 * @class lconn.core.typeahead.ResultDropDown
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.typeahead.ResultDropDown",
	[dijit.TooltipDialog], /** @lends lconn.core.typeahead.ResultDropDown.prototype */
{
	/**
	 * To override default drop down tooltip width (in pixels).
	 * 
	 * @default [300]
	 * @type {Number}
	 */
	width: 300,
	
	/**
	 * To set the drop down tooltip orientation based on dijit.popup orient property.
	 * 
	 * @see dijit.popup
	 */
	orientation: null,
	
	/**
	 * To override default maximum results showed.
	 * 
	 * @default [7]
	 * @type {Number}
	 */
	maxResults: 7,
	
	/**
	 * Represent the current selected item from the results list.
	 * 
	 * @readonly
	 * @type {Object}
	 */
	selectedElement: null,
	
	/**
	 * If true a graphical "callout-arrow" will appear in the top right part of the dialog.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	showCalloutArrow: true,
	
	_selectionArray: null,
	_serviceNodeIndex: null,
	_serviceOrder: null,
	_doNotDisplay: false,
	_strings: null,
	_blankImg: "",
	_showLogin: false,
	
	//template vars
	normalScopeNode: null,
	normalScopeTextNode: null,
	resultsContainer: null,
	loginNode: null,
	
	postMixInProperties: function(){
		this.inherited(arguments);
		
		this._strings = dojo.i18n.getLocalization("lconn.core.typeahead", "ResultDropDown");
		dojo.mixin(this, this._strings);
		
		this._blankImg = lconn.core.widgetUtils.addVersionNumber(this._blankGif);
		
		this._selectionArray = [];
		this._serviceNodeIndex = {};
		this._serviceOrder = [];
	},
	
	buildRendering: function() {
		this.inherited(arguments);
		
		var container = document.createElement("div");
		container.style.width = this.width + "px";
		container.style.border = "0px";
		container.style.padding = "2px";
		dojo.addClass(container, "icSearchResults");
		
		if(this.showCalloutArrow) {
			var arrowShadow = document.createElement("div");
			dojo.addClass(arrowShadow, "taArrowShadow");
			var arrow = document.createElement("div");
			dojo.addClass(arrow, "taArrow");
			arrowShadow.appendChild(arrow);
			container.appendChild(arrowShadow);
		}
		
		this.normalScopeNode = document.createElement("div");
		this.normalScopeNode.setAttribute("role", "option");
		this.normalScopeNode.setAttribute("aria-describedby", this.id + "_normalScopeAria");
		dojo.addClass(this.normalScopeNode, "pfNormalScope");
		this.connect(this.normalScopeNode, "onclick", "searchOnScope");
		this.connect(this.normalScopeNode, "onclick", "closeAndPreventReopen");
		this.connect(this.normalScopeNode, "onmouseover", dojo.hitch(this, "onMouseOver", this.normalScopeNode));
		
		if(this.showCalloutArrow) {
			var arrowSelected = document.createElement("div");
			dojo.addClass(arrowSelected, "taArrowSelected");
			this.normalScopeNode.appendChild(arrowSelected);
		}
		
		var searchButton = document.createElement("div");
		dojo.addClass(searchButton, "lotusSearch pfSearchIcon");
		var sbEl = document.createElement("span");
		sbEl.className = "lotusBtnImg";
		var searchImg = document.createElement("input");
		searchImg.type = "image";
		dojo.addClass(searchImg, "lotusSearchButton");
		searchImg.src = lconn.core.widgetUtils.addVersionNumber(this._blankGif);
		searchImg.alt = "";
		searchImg.setAttribute("role", "presentation");
		sbEl.appendChild(searchImg);
		searchButton.appendChild(sbEl);
		this.normalScopeNode.appendChild(searchButton);
		
		this.normalScopeTextNode = document.createElement("div");
		dojo.addClass(this.normalScopeTextNode, "pfTextMessage");
		this.normalScopeNode.appendChild(this.normalScopeTextNode);
		
		var normalScopeAria = document.createElement("div");
		dojo.addClass(normalScopeAria, "lotusHidden");
		normalScopeAria.innerHTML = this.SEARCH_SCOPE_ARIA_LABEL;
		normalScopeAria.id = this.id + "_normalScopeAria";
		this.normalScopeNode.appendChild(normalScopeAria);
		
		this.resultsContainer = document.createElement("div");
		dojo.addClass(this.resultsContainer, "pfDirectoryResults lconnSearchHighlight");
		
		var loginContainer = document.createElement("div");
		dojo.addClass(loginContainer, "pfDirectoryResults");
		this.loginNode = document.createElement("div");
		dojo.addClass(this.loginNode, "lconn_gray pfEntry");
		this.loginNode.style.padding = "10px";
		this.loginNode.setAttribute("role", "option");
		this.loginNode.setAttribute("aria-describedby", this.id + "_loginAria");
		this.loginNode.innerHTML = this.LOGIN_MESSAGE;
		this.connect(this.loginNode, "onmouseover", dojo.hitch(this, "onMouseOver", this.loginNode));
		this.connect(this.loginNode, "onclick", dojo.hitch(this, "_login", this.loginNode));
		loginContainer.appendChild(this.loginNode);
		
		var loginAria = document.createElement("div");
		dojo.addClass(loginAria, "lotusHidden");
		loginAria.innerHTML = this.LOGIN_ARIA_LABEL;
		loginAria.id = this.id + "_loginAria";
		loginContainer.appendChild(loginAria);
		
		container.appendChild(this.normalScopeNode);
		container.appendChild(this.resultsContainer);
		container.appendChild(loginContainer);
		
		this.content = container;
	},
	
	startup: function() {
		this.containerNode.style.padding = "0px";
		this.containerNode.setAttribute("role", "listbox");
		this.containerNode.setAttribute("wairole", "listbox");
		this.containerNode.setAttribute("aria-live", "polite");
	},
	
	destroy: function() {
		dijit.popup.close(this);
		this.inherited(arguments);
	},
	
	showResults: function(parent, node, skipPopulation) {
		if(this._doNotDisplay) {
			return;
		}
		
		this._prepareResultsContent(skipPopulation);
		
		var args = {
			parent: parent,
			popup: this,
			around: node,
			onClose: dojo.hitch(this, "_removeScrollbarFix")
		};
		if(this.orientation) {
			args.orient = this.orientation;
		}
		
		dijit.popup.open(args);
		this._addScrollbarFix();
	},
	
	_prepareResultsContent: function(skipPopulation) {
		if(!skipPopulation) {
			this._populateResults();
		}
		this._selectionArray = [];
		this._constructSelectionArray();
		
		if(this._showLogin) {
			dojo.removeClass(this.loginNode, "lotusHidden");
			this._selectionArray.push(this.loginNode);
		} else {
			dojo.addClass(this.loginNode, "lotusHidden");
		}
		
		this._prepareSelectionArray();
		this._selectElement(this._selectionArray[0]);
	},
	
	showLogin: function(shouldShow) {
		this._showLogin = shouldShow;
	},
	
	closeResults: function() {
		dijit.popup.close(this);
	},
	
	_addScrollbarFix: function() {
		if(this.domNode.parentElement) {
			dojo.addClass(this.domNode.parentElement, "pfScrollbarFix");
		}
	},
	
	_removeScrollbarFix: function() {
		if(this.domNode.parentElement) {
			dojo.removeClass(this.domNode.parentElement, "pfScrollbarFix");
		}
	},
	
	setResults: function(serviceId, data) {
		if(!this._serviceNodeIndex[serviceId]) {
			return;
		}
		
		this._serviceNodeIndex[serviceId].results = [];
		this._serviceNodeIndex[serviceId].response = data;
	},
	
	_populateResults: function() {
		var inserted = 0;
		var high = [];
		var medium = [];
		var low = [];
		
		for(var i=0; i < this._serviceOrder.length; i++) {
			var serviceId = this._serviceOrder[i];
			this._serviceNodeIndex[serviceId].node.innerHTML = "";
			
			if(this._serviceNodeIndex[serviceId].response && this._serviceNodeIndex[serviceId].response.totalResults > 0) {
				var max = this._serviceNodeIndex[serviceId].response.minToDisplay || 0;
				
				var diff = 0;
				if(this._serviceNodeIndex[serviceId].response.results.high) {
					diff += this._insertElements(serviceId, this._serviceNodeIndex[serviceId].response.results.high, max - diff, high);
				}
				if(this._serviceNodeIndex[serviceId].response.results.medium) {
					diff += this._insertElements(serviceId, this._serviceNodeIndex[serviceId].response.results.medium, max - diff, medium);
				}
				if(this._serviceNodeIndex[serviceId].response.results.low) {
					diff += this._insertElements(serviceId, this._serviceNodeIndex[serviceId].response.results.low, max - diff, low);
				}
				
				inserted += diff;
			}
		}
		
		var filler = high.concat(medium, low);
		this._insertFillers(filler, inserted);
		
		for(var i=0; i < this._serviceOrder.length; i++) {
			this._addHeader(this._serviceOrder[i]);
			this._addFooter(this._serviceOrder[i]);
			this._addAriaNodes(this._serviceOrder[i]);
		}
	},
	
	_addHeader: function(serviceId) {
		if(this._serviceNodeIndex[serviceId].response.header && this._serviceNodeIndex[serviceId].results.length > 0) {
			this._serviceNodeIndex[serviceId].node.insertBefore(this._serviceNodeIndex[serviceId].response.header, this._serviceNodeIndex[serviceId].node.firstChild);
		}
	},
	
	_addAriaNodes: function(serviceId) {
		if(this._serviceNodeIndex[serviceId].response.aria
				&& this._serviceNodeIndex[serviceId].response.aria.length > 0
				&& this._serviceNodeIndex[serviceId].results.length > 0) {
			for(var i=0; i < this._serviceNodeIndex[serviceId].response.aria.length; i++) {
				this._serviceNodeIndex[serviceId].node.appendChild(this._serviceNodeIndex[serviceId].response.aria[i]);
			}
		}
	},
	
	_addFooter: function(serviceId) {
		if(this._serviceNodeIndex[serviceId].response.footer && this._serviceNodeIndex[serviceId].results.length > 0) {
			this._serviceNodeIndex[serviceId].response.footer.setAttribute("role", "option");
			this.connect(this._serviceNodeIndex[serviceId].response.footer, "onmouseover", dojo.hitch(this, "onMouseOver", this._serviceNodeIndex[serviceId].response.footer));
			
			this._serviceNodeIndex[serviceId].node.appendChild(this._serviceNodeIndex[serviceId].response.footer);
			this._serviceNodeIndex[serviceId].results.push(this._serviceNodeIndex[serviceId].response.footer);
		}
	},
	
	_insertFillers: function(filler, inserted) {
		for(var i=0; i < filler.length && inserted < this.maxResults; i++) {
			var serviceId = filler[i].id;
			var item = filler[i].item;
			
			this._serviceNodeIndex[serviceId].node.appendChild(item);
			this._serviceNodeIndex[serviceId].results.push(item);
			inserted++;
		}
	},
	
	_insertElements: function(serviceId, data, max, filler) {
		
		for(var i=0; i < data.length; i++) {
			data[i].setAttribute("role", "option");
			dojo.addClass(data[i], "pfEntry");
			this.connect(data[i], "onmouseover", dojo.hitch(this, "onMouseOver", data[i]));
			this.connect(data[i], "onclick", "closeAndPreventReopen");
			
			if(i < max) {
				this._serviceNodeIndex[serviceId].node.appendChild(data[i]);
				this._serviceNodeIndex[serviceId].results.push(data[i]);
			} else {
				filler.push({
					id: serviceId,
					item: data[i]
				});
			}
		}
		return (i < max ? i : max); //returns how many inserted
	},
	
	addServiceResponse: function(serviceId) {
		var serviceNode = document.createElement("div");
		serviceNode.id = serviceId + "_resultsNode";
		this.resultsContainer.appendChild(serviceNode);
		this._serviceNodeIndex[serviceId] = {
			node: serviceNode,
			tmpNode: document.createElement("div"),
			results: [],
			response: null
		};
		this._serviceOrder.push(serviceId);
	},
	
	_constructSelectionArray: function() {
		this._selectionArray.push(this.normalScopeNode);
		for(var i=0; i < this._serviceOrder.length; i++) {
			var results = this._serviceNodeIndex[this._serviceOrder[i]].results;
			if(results) {
				this._selectionArray = this._selectionArray.concat(results);
			}
		}
	},
	
	_prepareSelectionArray: function() {
		for(var i=0; i < this._selectionArray.length; i++) {
			var element = this._selectionArray[i];
			element.setAttribute("aria-posinset", i+1);
			element.setAttribute("aria-setsize", this._selectionArray.length);
			
			if(!element.id) {
				element.setAttribute("id", this.id + "_option_" + i);
			}
		}
	},
	
	selectNextElement: function() {
		if(!this.selectedElement) {
			return;
		}
		var index = dojo.indexOf(this._selectionArray, this.selectedElement);
		var nextIndex = (this._selectionArray.length-1 > index && index >= 0) ? index + 1 : 0;
		this._selectElement(this._selectionArray[nextIndex]);
	},
	
	selectPreviousElement: function() {
		if(!this.selectedElement) {
			return;
		}
		var index = dojo.indexOf(this._selectionArray, this.selectedElement);
		var prevIndex = (this._selectionArray.length-1 >= index && index > 0) ? index - 1 : this._selectionArray.length - 1;
		this._selectElement(this._selectionArray[prevIndex]);
	},
	
	executeSelectedAction: function() {
		if(!this.selectedElement) {
			this.normalScopeNode.click();
		} else {
			this.selectedElement.click();
		}
	},
	
	closeAndPreventReopen: function() {
		this._doNotDisplay = true;
		this.closeResults();
		setTimeout(dojo.hitch(this, function() {
			this._doNotDisplay = false;
		}), 500);
	},
	
	setQueryString: function(query, scope) {
		this.normalScopeTextNode.innerHTML = this.getString("SEARCH_SCOPE_STRING", {"query": this._escapeHtml(query), "scope": scope});
		
		this._showLogin = false;
	},
	
	_escapeHtml: function(str) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	},
	
	getString: function(stringId, params) {
		return dojo.string.substitute(this._strings[stringId], params);
	},
	
	_selectElement: function(element) {
		if(this.selectedElement) {
			dojo.removeClass(this.selectedElement, "pfSelected");
			dijit.setWaiState(this.selectedElement, "selected", "false");
		}
		if(!element) {
			return;
		}
		this.selectedElement = element;
		dojo.addClass(this.selectedElement, "pfSelected");
		dijit.setWaiState(this.selectedElement, "selected", "true");
		
		setTimeout(dojo.hitch(this, "onActiveDescendantChanged", element.id), 1);
	},
	
	_login: function() {
		lconn.core.auth.login();
	},
	
	onMouseOver: function(element, evt) {
		dojo.stopEvent(evt);
		this._selectElement(element);
	},
	
	searchOnScope: function() {
		//Callback - nothing here
	},
	
	/**
	 * Method to be overriden or connected to by the subclass.
	 * Called when the aria-activedescendant property should be changed.
	 * 
	 * @abstract
	 * @param {String} id
	 */
	onActiveDescendantChanged: function(id) {
		//Callback - nothing here
	}
});
