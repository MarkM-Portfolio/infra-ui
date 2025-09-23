/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dijit/_Widget",
	"dijit/_Templated",
	"dojo/i18n",
	"dojo/i18n!./nls/TypeaheadWidget",
	"dojo/text!./templates/TypeaheadWidget.html",
	"ic-core/auth",
	"ic-core/peopleFinder/directory/PeopleFinderService",
	"ic-core/quickResults/QuickResultsService",
	"ic-core/config/properties"
], function (declare, lang, domClass, domAttr, _Widget, _Templated, i18n, i18nTypeaheadWidget, template, auth, PeopleFinderService, QuickResultsService, properties) {
	
	/**
	 * Widget to handle QuickResults and PeopleFinder services
	 * 
	 * @class ic-search/searchPanel/typeahead/TypeaheadWidget
	 * @extends dijit/_Widget
	 * @extends dijit/_Templated
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var TypeaheadWidget = declare(
		"lconn.search.searchPanel.typeahead.TypeaheadWidget",
		[_Widget, _Templated], /** @lends ic-search.searchPanel.typeahead.TypeaheadWidget.prototype */
	{
		/**
		 * To override default maximum results showed.
		 * 
		 * @default [7]
		 * @type {Number}
		 */
		maxResults: 7,
		
		/**
		 * To not append footers from result services
		 * 
		 * @default [false]
		 * @type {Boolean}
		 */
		disableFooters: false,
		
		templateString: template,
		servicesList: null,
		isVisible: false,
		commonStrings: null,
		_serviceOrder: null,
		_serviceNodeIndex: null,
		_showLogin: false,
		
		constructor: function(){
			this.commonStrings = i18nTypeaheadWidget;
			lang.mixin(this, this.commonStrings);
			this.inherited(arguments);
		},
		
		postCreate: function() {
			this._serviceOrder = [];
			this._serviceNodeIndex = [];
			
			var loginButton = this.loginNode.getElementsByTagName("a")[0];
			if(loginButton) {
				this.connect(loginButton, "onfocus", lang.hitch(this, "loginNodeFocused", this.loginNode));
			}
			
			if(properties["quickResultsEnabled"] !== "true") {
				domClass.add(this.messagesNode, "lotusHidden");
			}
		},
		
		addServiceResponse: function(serviceId) {
			var serviceNode = document.createElement("div");
			serviceNode.id = serviceId + "_resultsNode";
			domAttr.set(serviceNode, "role", "navigation");
			this.resultsContainer.appendChild(serviceNode);
			this._serviceNodeIndex[serviceId] = {
				node: serviceNode,
				tmpNode: document.createElement("div"),
				results: [],
				response: null
			};
			this._serviceOrder.push(serviceId);
		},
		
		setResults: function(serviceId, data) {
			if(!this._serviceNodeIndex[serviceId]) {
				return;
			}
			
			this._serviceNodeIndex[serviceId].results = [];
			this._serviceNodeIndex[serviceId].response = data;
		},
		
		_prepareResultsContent: function() {
			var inserted = this._populateResults();
			
			if(inserted == 0) {
				domClass.remove(this.noResultsNode, "lotusHidden");
				setTimeout(lang.hitch(this, "_forceNoResultsMessage"));
			} else {
				domClass.add(this.noResultsNode, "lotusHidden");
			}
			
			if(this._showLogin) {
				domClass.remove(this.loginNode, "lotusHidden");
			} else {
				domClass.add(this.loginNode, "lotusHidden");
			}
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
			inserted = this._insertFillers(filler, inserted);
			
			for(var i=0; i < this._serviceOrder.length; i++) {
				this._addHeader(this._serviceOrder[i]);
				if(!this.disableFooters) {
					this._addFooter(this._serviceOrder[i]);
				}
				var serviceNode = this._serviceNodeIndex[this._serviceOrder[i]].node;
				serviceNode.style.display = serviceNode.children.length > 0 ? "" : "none";
			}
			
			return inserted;
		},
		
		_insertElements: function(serviceId, data, max, filler) {
			for(var i=0; i < data.length; i++) {
				domClass.add(data[i], "pfEntry");
				
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
		
		_insertFillers: function(filler, inserted) {
			for(var i=0; i < filler.length && inserted < this.maxResults; i++) {
				var serviceId = filler[i].id;
				var item = filler[i].item;
				
				this._serviceNodeIndex[serviceId].node.appendChild(item);
				this._serviceNodeIndex[serviceId].results.push(item);
				inserted++;
			}
			return inserted;
		},
		
		_addHeader: function(serviceId) {
			if(this._serviceNodeIndex[serviceId].response.header && this._serviceNodeIndex[serviceId].results.length > 0) {
				domAttr.set(this._serviceNodeIndex[serviceId].node, "aria-label", this._serviceNodeIndex[serviceId].response.header.textContent);
				this._serviceNodeIndex[serviceId].node.insertBefore(this._serviceNodeIndex[serviceId].response.header, this._serviceNodeIndex[serviceId].node.firstChild);
			}
		},
		
		_addFooter: function(serviceId) {
			if(this._serviceNodeIndex[serviceId].response.footer && this._serviceNodeIndex[serviceId].results.length > 0) {
				domClass.add(this._serviceNodeIndex[serviceId].response.footer, "pfEntry");
				
				this._serviceNodeIndex[serviceId].node.appendChild(this._serviceNodeIndex[serviceId].response.footer);
				this._serviceNodeIndex[serviceId].results.push(this._serviceNodeIndex[serviceId].response.footer);
			}
		},
		
		_forceNoResultsMessage: function() {
			this.noResultsNode.innerHTML = this.noResultsNode.innerHTML;
		},
		
		_login: function() {
			auth.login();
		},
		
		loginNodeFocused: function(element) {
			//Callback - nothing here
		},
		
		showLogin: function(shouldShow) {
			this._showLogin = shouldShow;
		},
		
		hideWidget: function() {
			domClass.add(this.domNode, "lotusHidden");
			this.isVisible = false;
		},
		
		showWidget: function() {
			this._prepareResultsContent();
			domClass.remove(this.domNode, "lotusHidden");
			this.isVisible = true;
		},
		
		getResultsCountForService: function(serviceId) {
			return this._serviceNodeIndex[serviceId].results.length;
		}
	});
	
	return TypeaheadWidget;
});