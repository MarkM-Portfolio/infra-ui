/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"dojo/dom-construct",
	"dojo/i18n!./nls/HistoryWidget",
	"dojo/i18n",
	"dojo/dom-class",
	"dojo/dom-geometry",
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/text!./templates/HistoryWidget.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"./HistoryService",
	"ic-core/auth",
	"ic-core/config/features",
	"ic-core/config/properties",
	"ic-ui/layout/insights/NewRelic",
	"ic-ui/layout/insights/tracker"
], function (domConstruct, i18nHistoryWidget, i18n, domClass, domGeom, domAttr, declare, lang, template, _Templated, _Widget, HistoryService,
		auth, has, properties, NewRelic, trackerObj) {

	var Tracker = trackerObj.getInstance("search");
	if(!has("search-panel-ui-insights")) {
		Tracker = {
			track: function() {}
		}
	}
	
	/**
	 * lconn.core.typeahead.Service implementation for
	 * History Result service
	 * 
	 * @class ic-search/searchPanel/history/HistoryWidge
	 * @extends dijit/_Widget
	 * @extends dijit/_Templated
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var HistoryWidget = declare(
		"lconn.search.searchPanel.history.HistoryWidget",
		[_Widget, _Templated], /** @lends ic-search.searchPanel.history.HistoryWidge.prototype */
	{
		templateString: template,
		commonStrings: null,
		resultPerPage: 5,
		historyService: null,
		selectionArray: null,
		isVisible: false,
		scrollNode: null,
		containerWidth: 400,
		_groupKeys: null,
		_groupNodes: null,
		_toGiveFocus: null,
		_lastEntry: null,
		_handlers: null,
		_isNextPageRunning: false,
		
		postMixInProperties: function(){
			this.commonStrings = i18nHistoryWidget;
			lang.mixin(this, this.commonStrings);
			this.inherited(arguments);
		},
		
		postCreate: function() {
			this.historyService = new HistoryService({
				resultPerPage: this.resultPerPage,
				isFocusable: true,
				focusCallback: lang.hitch(this, "onEntryFocused")
			});
			this.historyService.startup();
			this.connect(this.historyService, "entryClicked", function(widget, evt) {
				Tracker.track("panel.clickHistoryEntry", {
					resultType: widget.source,
					viewedDate: widget.date.toISOString()
				});
			});
			this.selectionArray = [];
			this._handlers = [];
			this.connect(this.loadingFrameFocusable, "onfocus", lang.hitch(this, "onEntryFocused", this.loadingFrame));
			var node = this.scrollNode || document.body;
			this.connect(node, "onscroll", "checkMoreResultsNeeded");
			this.connect(node, "onscroll", lang.hitch(this, function() {
				Tracker.track("panel.scrollHistory", {
					loadedResults: this.selectionArray.length
				});
			}));
			this.connect(window, "onresize", "checkMoreResultsNeeded");
			this.noHistoryMessageNode.style.width = (this.containerWidth - 68) + "px";	//68 = the margin left/right of its class
			this.loginNeededNode.style.width = (this.containerWidth - 68) + "px";	//68 = the margin left/right of its class
		},
		
		initHistoryContent: function() {
			this.noHistoryMessageNode.style.display = "none";
			var promise = this.historyService.executeQuery("");
			promise = promise.then(lang.hitch(this, "_handleHistoryResults"));
			return promise;
		},
		
		getMoreHistoryContent: function() {
			this._isNextPageRunning = true;
			var promise = this.historyService.getNextPage();
			promise.then(lang.hitch(this, "_appendResults"));
		},
		
		_releaseHandlers: function() {
			for(var i=0; i < this._handlers.length; i++) {
				this._handlers[i].remove();
			}
			this._handlers = [];
		},
		
		_handleHistoryResults: function(data) {
			this.selectionArray = [];
			this._groupKeys = [];
			this._groupNodes = [];
			this._releaseHandlers();
			this.loadingFrame.style.display = "";
			
			if(!data.results || !data.totalResults > 0) {
				this.handleNoResults();
				return;
			}
			
			domConstruct.empty(this.historyContentNode);
			domClass.remove(this.historyContentNode, "lotusHidden");
			domClass.remove(this.historyTitleNode, "lotusHidden");
			
			this._appendResults(data);
			this.checkMoreResultsNeeded();
		},
		
		_appendResults: function(data) {
			this._isNextPageRunning = false;
			this._checkLastPage(data.results._size, data.totalResults, data.pageSize);
			this._insertHistory(data);
			
			if(document.activeElement == this.loadingFrameFocusable && this._toGiveFocus) {
				this._toGiveFocus.focus();
				this._toGiveFocus = null;
			}
		},
		
		_insertHistory: function(data) {
			for(var k=0; k < data.results._index.length; k++) {
				var key = data.results._index[k];
				var group = data.results[key];
				if(this._groupKeys.indexOf(key) < 0) {
					var groupNode = document.createElement("div");
					domAttr.set(groupNode, "role", "navigation");
					domAttr.set(groupNode, "aria-label", group.header.textContent);
					groupNode.appendChild(group.header);
					this.historyContentNode.appendChild(groupNode);
					this._groupKeys.push(key);
					this._groupNodes[key] = groupNode;
				} else {
					domClass.remove(this._groupNodes[key].lastChild, "pfLastEntry");
				}
				for(var i=0; i < group.elements.length; i++) {
					domClass.add(group.elements[i], "pfEntry");
					if(i == group.elements.length - 1) {
						domClass.add(group.elements[i], "pfLastEntry");
					}
					this._groupNodes[key].appendChild(group.elements[i]);
					this._handlers.push(this.connect(group.elements[i], "onclick", "entryClicked"));
					this.selectionArray.push(group.elements[i]);
					
					if((document.activeElement == this.loadingFrameFocusable || document.activeElement == this._lastEntry)
							&& !this._toGiveFocus) {
						this._toGiveFocus = group.elements[i];
					}
					this._lastEntry = group.elements[i];
				}
			}
		},
		
		getSelectionArray: function() {
			return this.selectionArray;
		},
		
		checkMoreResultsNeeded: function() {
			if(!this.loadingFrame || this._isNextPageRunning) {
				return;
			}
			
			setTimeout(lang.hitch(this, function() {
				if(this._checkElementIsDisplayed()) {
					this.getMoreHistoryContent();
				}
			}), 1);
		},
		
		_checkElementIsDisplayed: function() {
			if(this.loadingFrame.style.display == "none") {
				return false;
			}
			
			var scrollPos = domGeom.position(this.scrollNode)
			var limitHeight = scrollPos ? (scrollPos.y + scrollPos.h) : (has("ie") <= 8 ? document.documentElement.clientHeight : window.innerHeight);
			
			var elemPos = domGeom.position(this.loadingFrame);

			return (elemPos.y < limitHeight);
		},
		
		_checkLastPage: function(currentReqLenght, totalResults, pageSize) {
			if(totalResults <= pageSize || currentReqLenght < pageSize) {
				if(document.activeElement == this.loadingFrameFocusable && this._lastEntry) {
					this._lastEntry.focus();
					this._lastEntry = null;
				}
				this.loadingFrame.style.display = "none";
			}
		},
		
		hideWidget: function() {
			domClass.add(this.domNode, "lotusHidden");
			this.isVisible = false;
		},
		
		showWidget: function() {
			domClass.remove(this.domNode, "lotusHidden");
			this.isVisible = true;
			setTimeout(lang.hitch(this, "_forceAriaReadings"), 30);
		},
		
		handleNoResults: function() {
			domClass.add(this.historyContentNode, "lotusHidden");
			domClass.add(this.historyTitleNode, "lotusHidden");
			if(auth.isAuthenticated()) {
				this.noHistoryMessageNode.style.display = "";
				this.loginNeededNode.style.display = "none";
			} else {
				this.noHistoryMessageNode.style.display = "none";
				this.loginNeededNode.style.display = "";
			}
			this.loadingFrame.style.display = "none";
			if(properties["quickResultsEnabled"] !== "true") {
				this.noHistoryMessageNode.style.display = "none";
				this.loginNeededNode.style.display = "none";
			}
		},
		
		_forceAriaReadings: function() {
			if(this.noHistoryMessageNode.style.display != "none") {
				this.noHistoryMessageNode.innerHTML = this.noHistoryMessageNode.innerHTML;
			}
			if(this.loginNeededNode.style.display != "none") {
				this.loginNeededNode.innerHTML = this.loginNeededNode.innerHTML;
			}
		},
		
		_login: function() {
			auth.login();
		},
		
		onEntryFocused: function(element) {
			//Callback - nothing here
		},
		
		entryClicked: function() {
			//Callback - nothing here
		}
	});
	
	return HistoryWidget;
});