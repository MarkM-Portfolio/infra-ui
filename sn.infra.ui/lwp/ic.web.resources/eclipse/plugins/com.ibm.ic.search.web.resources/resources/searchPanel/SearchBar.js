/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/event",
	"dojo/has",
	"dojo/i18n",
	"dojo/i18n!./nls/SearchBar",
	"dojo/text!./templates/SearchBar.html",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/form/DropDownButton",
	"dijit/DropDownMenu",
	"dijit/MenuItem",
	"dijit/form/TextBox",
	"dojox/encoding/digests/SHA1",
	"ic-core/config/features",
	"ic-ui/layout/insights/NewRelic",
	"ic-ui/layout/insights/tracker"
], function (declare, lang, eventModule, has, i18n, i18nSearchBar, template, domClass, domAttr, _Templated, _Widget, DropDownButton, DropDownMenu, MenuItem, TextBox, SHA1, has, NewRelic, trackerObj) {

	var Tracker = trackerObj.getInstance("search");
	if(!has("search-panel-ui-insights")) {
		Tracker = {
			track: function() {}
		}
	}
	
	/**
	 * 
	 * @class ic-search/searchPanel/SearchBar
	 * @extends dijit/_Widget
	 * @extends dijit/_Templated
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var SearchBar = declare(
		"lconn.search.searchPanel.SearchBar",
		[_Widget, _Templated], /** @lends ic-search.searchPanel.SearchBar.prototype */
	{
		templateString: template,
		widgetsInTemplate: true,
		commonStrings: null,
		globalScopeAria: "",
		globalScopeLabel: "",
		thirdPartySearchEngines: null,
		dropDownButton: null,
		selectedOption: null,
		hideInstructions: false,
		_globalScopeId: "ic-search_globalScope",
		_selectedScope: null,
		_queryTimeout: 200,
		_lastQuery: "",
		_timeoutID: null,
		_keyPressed: false,
		_keyToIgnore: {
			 9: true,	//tab
			16: true,	//shift
			17: true,	//ctrl
			18: true,	//alt
			27: true	//esc
		},
		
		constructor: function(){
			this.commonStrings = i18nSearchBar;
			lang.mixin(this, this.commonStrings);
			this.inherited(arguments);
		},
		
		postCreate: function() {
			this.connect(this.getTextField(), "onkeypress", "typeAheadCallback");
			if(!has("ie")) {
				this.connect(this.getTextField(), "oninput", "_onInput");
			}
			this.connect(this.getTextField(), "onfocus", "onBarFocused");
			this.connect(this.getTextField(), "onblur", "onBarBlurred");
			domAttr.set(this.searchBox.textbox, "aria-control", this.ariaLiveNode.id);
			
			if(!this.hideInstructions) {
				domClass.remove(this.searchInstructions, "lotusHidden");
				domAttr.set(this.searchBox.textbox, "aria-describedby", this.searchInstructions.id)
			}
			
			// hack to avoid changes in every Connections Component to pass the variable
			if(!this.thirdPartySearchEngines) {
				this.thirdPartySearchEngines = window.lconn_core_thirdPartySearchEngines || dojo.getObject("lconn.share.config.services.externalSearchScopes") || dojo.getObject("lconn.share0.config.services.connections.search.externalSearchScopes") || [];
			}
			// end of hack
			
			if(this.thirdPartySearchEngines && this.thirdPartySearchEngines.length > 0) {
				this._globalScopeId = this.id + "_" + this._globalScopeId;
				var menu = new DropDownMenu({
					style: "display: none; color: #6F6F6F;",
					onItemClick: lang.hitch(this, function(item) {
						if (!item) {
							return;
						}
						this.selectedOption = item;
						this.dropDownButton.setLabel(item.label);
						this.searchBox.focus();
						if(item.id == this._globalScopeId) {
							this.runQuery(true);
						} else {
							this.onThirdPartySelected();
						}
					})
				});
				
				this.selectedOption = new MenuItem({
					label: this.globalScopeLabel,
					id: this._globalScopeId
				});
				menu.addChild(this.selectedOption);
				
				for(var i=0; i < this.thirdPartySearchEngines.length; i++) {
					this.thirdPartySearchEngines[i].id = this.id + "_" + SHA1(JSON.stringify(this.thirdPartySearchEngines[i]));
					delete this.thirdPartySearchEngines[i].iconClass;
					try {
						menu.addChild(new MenuItem(this.thirdPartySearchEngines[i]));
					} catch(e) {
						console.debug(e);
					}
				}
				menu.startup();
				this.dropDownButton = new DropDownButton({
					label: this.selectedOption.label,
					dropDown: menu
				});
				this.dropDownButton.startup();
				
				this._dropDownOptions.appendChild(this.dropDownButton.domNode);
				this._dropDownOptions.querySelector('.dijitArrowButtonInner').className = "lotusArrow lotusDropDownSprite";
				this._globalOptionNode.style.display = "none";
				this._dropDownOptions.style.display = "";
			}
		},
		
		typeAheadCallback: function(evt) {
			var keyCode = evt.which || evt.keyCode;
			if(!evt.keyChar && keyCode == 13 /* Enter key */) {
				eventModule.stop(evt);
				this.onSearchClicked(evt);
				return;
			}
			
			if(this._keyToIgnore[keyCode]) {
				//keys to be ignored - DO NOT STOP EVENT
				return
			}
			
			if (!this.isThirdPartySearchEngineSelected()) {
				this.runQuery();
			}
			this._keyPressed = true;
		},
		
		_onInput: function(evt) {
			if(!this._keyPressed){
				this.typeAheadCallback(evt);
			}
			this._keyPressed = false;
		},
		
		runQuery: function(ignoreLastQuery) {
			clearTimeout(this._timeoutID);
			
			this._timeoutID = setTimeout(lang.hitch(this, function() {
				var str = this.searchBox ? this.searchBox.get("value") : "";
				str = lang.trim(str);
				
				Tracker.track("panel.typeQuery", {
					queryLength: str.length
				});
				
				if(!str) {
					this._lastQuery = "";
					this.onEmptyQuery();
					domClass.add(this._clearAllButton, "lotusHidden");
					return;
				} else {
				   domClass.remove(this._clearAllButton, "lotusHidden");
				}
				
				if(str === this._lastQuery && !ignoreLastQuery) {
					return;
				}
				
				this._lastQuery = str;
				this.onTypeahead(str);
			}), this._queryTimeout);
		},
		
		setLocalScopeOption: function(label, ariaLabel) {
			this._localOptionNode.innerHTML = "";
			this._localOptionNode.style.display = "none";
			if(label && ariaLabel) {
				domAttr.set(this._localOptionNode, "aria-label", ariaLabel);
				this._localOptionNode.appendChild(document.createTextNode(label));
				this._localOptionNode.style.display = "";
			}
		},
		
		selectScope: function(scopeNode, newPlaceholder) {
			if(this._selectedScope) {
				domClass.remove(this._selectedScope, "icSelectedScope");
			}
			this._selectedScope = (scopeNode == this._globalOptionNode && this._globalOptionNode.style.display == "none" ? this._dropDownOptions : scopeNode);
			domClass.add(this._selectedScope, "icSelectedScope");
			
			if(newPlaceholder) {
				this._setCurrentScopePlaceholder(newPlaceholder);
			}
		},
		
		showScopes: function() {
			domClass.remove(this._optionsNode, "lotusHidden");
		},
		
		hideScopes: function() {
			domClass.add(this._optionsNode, "lotusHidden");
		},
		
		_getCurrentScopePlaceHolder: function() {
			return this.SEARCH_PLACEHOLDER;
		},
		
		_setCurrentScopePlaceholder: function(newPlaceholder) {
			this.SEARCH_PLACEHOLDER = newPlaceholder;
			this.searchBox.set("title", this.SEARCH_PLACEHOLDER);
			this.searchBox.set("placeholder", this.SEARCH_PLACEHOLDER);
		},
		
		getTextField: function() {
			return this.searchBox.textbox;
		},
		
		getTextValue: function() {
			return this.searchBox.get("value");
		},
		
		setTextValue: function(newValue) {
			this.searchBox.set("value", newValue);
			this.runQuery();
		},
		
		setAriaLiveString: function(newString) {
			this.ariaLiveNode.textContent = newString;
		},
		
		isThirdPartySearchEngineSelected: function() {
			var isThirdPartySearchEngine = false;
			
			if(this.thirdPartySearchEngines) {
				var currentSelectedScopeId = this.selectedOption ? this.selectedOption.id : '';
	
				for (var i = 0; i < this.thirdPartySearchEngines.length && !isThirdPartySearchEngine; i++) {
					isThirdPartySearchEngine = (this.thirdPartySearchEngines[i].id == currentSelectedScopeId);
				}
			}

			return isThirdPartySearchEngine;
		},
		
		getSelectedThirdPartyOption: function() {
			var selOption = null;
			
			if(this.thirdPartySearchEngines) {
				for (var i = 0; i < this.thirdPartySearchEngines.length && !selOption; i++) {
					selOption = (this.thirdPartySearchEngines[i].id == this.selectedOption.id) && this.thirdPartySearchEngines[i];
				}
			}
			
			return selOption;
		},
		
		focus: function() {
			this.searchBox.focus();
			this.searchBox.textbox.select();
		},
		
		onTypeahead: function(query) {
			//Callback - nothing here
		},
		
		onEmptyQuery: function() {
			//Callback - nothing here
		},
		
		onSearchClicked: function(evt) {
			if(this._selectedScope == this._localOptionNode) {
				this.onLocalOptionClicked(evt);
			} else if(this.isThirdPartySearchEngineSelected()) {
				this.onThirdPartySearch(evt);
			} else {
				this.onGlobalOptionClicked(evt);
			}
		},
		
		onClearAllClicked: function(evt) {
		   this.setTextValue('');
		   this.focus();
      },
		
		onLocalOptionClicked: function(evt) {
			//Callback - nothing here
		},
		
		onGlobalOptionClicked: function(evt) {
			//Callback - nothing here
		},
		
		onThirdPartySearch: function(evt) {
			//Callback - nothing here
		},
		
		onThirdPartySelected: function() {
			//Callback - nothing here
		},
		
		onBarFocused: function() {
			//Callback - nothing here
		},
		
		onBarBlurred: function() {
			//Callback - nothing here
		}
	});
	
	return SearchBar;
});