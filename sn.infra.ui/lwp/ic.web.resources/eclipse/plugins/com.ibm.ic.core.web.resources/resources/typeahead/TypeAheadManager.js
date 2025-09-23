/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/DeferredList",
	"dojo/_base/config",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/event",
	"dojo/dom-geometry",
	"dijit/_Widget",
	"dojo/has",
	"dojo/topic",
	"../config/properties",
	"./ResultDropDown",
	"./Service"
], function (DeferredList, config, declare, lang, eventModule, domGeometry, _Widget, has, topic, properties, ResultDropDownPrototype, Service) {
	
	/**
	 * 
	 * 
	 * @class ic-core.typeahead.TypeAheadManager
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var TypeAheadManager = declare(
		"lconn.core.typeahead.TypeAheadManager",
		[_Widget], /** @lends ic-core.typeahead.TypeAheadManager.prototype */
	{
		/**
		 * Key to get the request timeout property from configuration file.
		 * 
		 * @constant
		 * @readonly
		 * @type {String}
		 */
		TIMEOUT_PROPERTY: "com.ibm.lconn.core.peopleFinder.timeout",
		
		/**
		 * Key to get the service request abort timeout from configuration file.
		 * 
		 * @constant
		 * @readonly
		 * @type {String}
		 */
		SERVICE_TIMEOUT_PROPERTY: "com.ibm.lconn.core.typeahead.serviceRequest.timeout",
		
		/**
		 * Key to get the maximum results number from configuration file.
		 * 
		 * @constant
		 * @readonly
		 * @type {String}
		 */
		MAX_RESULTS_PROPERTY: "com.ibm.lconn.core.typeahead.maxResults",
		
		/**
		 * Prototype of a ic-core/typeahead/ResultDropDown implementation.
		 * Use this if you want to override ResultDropDown class.
		 * 
		 * @default [ic-core/typeahead/ResultDropDown]
		 * @type {Function}
		 */
		ResultDropDown: ResultDropDownPrototype,
		
		//lconn.core.typeahead.ResultDropDown vars
		/**
		 * To set the drop down tooltip orientation based on dijit.popup orient property.
		 * 
		 * @see dijit.popup
		 */
		orientation: null,
		
		/**
		 * To override default drop down tooltip width (in pixels).
		 * 
		 * @default [300]
		 * @type {Number}
		 */
		dropDownWidth: 300,
		//End of lconn.core.typeahead.ResultDropDown vars
		
		/**
		 * Node that contains the label of the current scope
		 * 
		 * @type {HTMLElement}
		 */
		TAscopeLabelNode: null,
		
		/**
		 * Anchor for the dropDown element different from TAtextField.
		 * If undefined TAtextField will be used.
		 * 
		 * @type {HTMLElement}
		 */
		TAdropdownAnchor: null,
		
		/**
		 * Text field used for typeahead search.
		 * 
		 * @type {HTMLInputElement}
		 */
		TAtextField: null,
		
		/**
		 * To prevent typeahead initialization of temporary disable it.
		 * 
		 * @default [false]
		 * @type {Boolean}
		 */
		TAdisable: false,
		
		/**
		 * An ordered array of lconn.core.typeahead.Service to display
		 * 
		 * @default [null]
		 * @type {Array}
		 */
		TAservicesList: null,
		
		resultDropDown: null,
		activeDescendantId: null,
		_queryTimeout: 200,
		_serciveTimeout: 1500,
		_maxResults: 7,
		_mouseDown: false,
		_timeoutID: null,
		_keyPressed: false,
		_lastQuery: "",
		_keyToIgnore: {
			9: true,	//tab
			16: true,	//shift
			17: true,	//ctrl
			18: true	//alt
		},
		
		postCreate: function() {
			if(!this.TAtextField || this.TAdisable || !this.TAservicesList) {
				return;
			}
			
			if(!this.TAdropdownAnchor) {
				this.TAdropdownAnchor = this.TAtextField;
			}
			
			var timeout = parseInt(properties[this.TIMEOUT_PROPERTY]);
			if(timeout) {
				this._queryTimeout = timeout;
			}
			timeout = parseInt(properties[this.SERVICE_TIMEOUT_PROPERTY]);
			if(timeout) {
				this._serciveTimeout = timeout;
			}
			var maxRes = parseInt(properties[this.MAX_RESULTS_PROPERTY]);
			if(maxRes) {
				this._maxResults = maxRes;
			}
			
			if(!this.TAtextField.id) {
				this.TAtextField.id = this.id + "_TAtextField";
			}
			
			if(!this.orientation) {
				this.orientation = domGeometry.isBodyLtr() ? {'BR':'TR'} : {'BL':'TL'};
			}
			
			this.resultDropDown = new this.ResultDropDown({
				orientation: this.orientation,
				dropDownWidth: this.dropDownWidth,
				maxResults: this._maxResults
			});
			
			this.resultDropDown.startup();
			
			for(var i=0; i < this.TAservicesList.length; i++) {
				var service = this.TAservicesList[i];
				if(!Service.prototype.isPrototypeOf(service) && config.isDebug) {
					console.warn("ATTENTION! The provided class "+service.declaredClass+" is not a subclass of lconn.core.typeahead.Service");
				}
				service.setTimeout(this._serciveTimeout);
				service.setPageSize(this._maxResults);
				this.resultDropDown.addServiceResponse(service.id);
			}
			
			this.connect(this.resultDropDown, "onActiveDescendantChanged", "_changeActiveDescendantId");
			this.connect(this.resultDropDown.domNode, "onmousedown", "_TAonMouseDown");
			this.resultDropDown.connect(this, "search", "closeResults");
			this.connect(this.resultDropDown, "searchOnScope", "search");
			
			this.connect(this.TAtextField, "onkeypress", "typeAheadCallback");
			if(!has("ie")) {
				this.connect(this.TAtextField, "oninput", "_onInput");
			}
			this.connect(this.TAtextField, "onblur", "onFieldBlur");
			this.connect(this.TAtextField, "onfocus", "onFieldFocus");
	
			this.TAtextField.parentElement.setAttribute("role", "combobox");
			this.TAtextField.parentElement.setAttribute("popupactive", "true");
			this.TAtextField.parentElement.setAttribute("aria-expanded", "false");
			
			this.TAtextField.setAttribute("role", "textbox");
			this.TAtextField.setAttribute("aria-invalid", "false");
			if(this.TA_ARIA_LABEL) {
				this.TAtextField.setAttribute("aria-label", this.TA_ARIA_LABEL);
			}
			
			this.TAtextField.autocomplete = "off";
		},
		
		destroy: function() {
			if(this.resultDropDown){
				this.resultDropDown.destroyRecursive();
			}
			this.inherited(arguments);
		},
		
		typeAheadCallback: function(evt) {
			var keyCode = evt.which || evt.keyCode;
			if(this.TAdisable || (!evt.keyChar && keyCode == 27 /* Escape key */)) {
				this.resultDropDown.closeResults();
				this.TAtextField.removeAttribute("aria-activedescendant");
				this.TAtextField.parentElement.setAttribute("aria-expanded", "false");
				return;
			}
			
			if(!evt.keyChar && keyCode == 13 /* Enter key */) {
				eventModule.stop(evt);
				this.resultDropDown.executeSelectedAction();
				return;
			}
			
			if(!evt.keyChar && keyCode == 38 /* Arrow up key */) {
				eventModule.stop(evt);
				this.resultDropDown.selectPreviousElement();
				return;
			}
			
			if(!evt.keyChar && keyCode == 40 /* Arrow down key */) {
				eventModule.stop(evt);
				this.resultDropDown.selectNextElement();
				return;
			}
			
			if(this._keyToIgnore[keyCode]) {
				//keys to be ignored - DO NOT STOP EVENT
				return
			}
			
			this.runQuery();
			this._keyPressed = true;
		},
		
		_onInput: function(evt) {
			if(!this._keyPressed){
				this.typeAheadCallback(evt);
			}
			this._keyPressed = false;
		},
		
		runQuery: function() {
			clearTimeout(this._timeoutID);
			
			this._timeoutID = setTimeout(lang.hitch(this, function() {
				var str = this.TAtextField.value;
				str = lang.trim(str);
				
				if(!str || this.TAisPlaceholderActive()) {
					this._handleEmptyQueryString();
					return;
				}
				
				if(str === this._lastQuery) {
					return;
				}
				
				this._lastQuery = str;
				
				this.resultDropDown.setQueryString(str, this.TAscopeLabelNode.innerHTML);
				var promisesList = [];
				for(var i=0; i < this.TAservicesList.length; i++) {
					var service = this.TAservicesList[i];
					var promise = service.executeQuery(str);
					promise.then(lang.hitch(this, "setTypeaheadResults", service.id));
					promisesList.push(promise);
				}
				
				var deferredList = new DeferredList(promisesList);
				deferredList.then(lang.hitch(this, "showTypeaheadResults"));
			}), this._queryTimeout);
		},
		
		_handleEmptyQueryString: function() {
			this._lastQuery = "";
			this.resultDropDown.closeResults();
			this.TAtextField.removeAttribute("aria-activedescendant");
			this.TAtextField.parentElement.setAttribute("aria-expanded", "false");
			this.activeDescendantId = null;
		},
		
		_setActiveDescendant: function() {
			if(this.activeDescendantId) {
				this.TAtextField.setAttribute("aria-activedescendant", this.activeDescendantId);
			} else {
				this.TAtextField.setAttribute("aria-activedescendant", this.resultDropDown.id);
			}
		},
		
		_changeActiveDescendantId: function(id) {
			this.activeDescendantId = id;
			this._setActiveDescendant();
		},
		
		setTypeaheadResults: function(serviceId, data) {
			this.resultDropDown.setResults(serviceId, data);
			if(data && data.showLogin) {
				this.resultDropDown.showLogin(data.showLogin);
			}
		},
		
		showTypeaheadResults: function() {
			this.resultDropDown.showResults(this, this.TAdropdownAnchor);
			this.TAtextField.parentElement.setAttribute("aria-owns", this.resultDropDown.id);
			this._setActiveDescendant();
			this.TAtextField.parentElement.setAttribute("aria-expanded", "true");
		},
		
		onFieldBlur: function(evt) {
			if(this._mouseDown) {
				this._mouseDown = false;
				return;
			}
			
			this.resultDropDown.closeResults();
			this.TAtextField.removeAttribute("aria-activedescendant");
			this.TAtextField.parentElement.setAttribute("aria-expanded", "false");
		},
		
		onFieldFocus: function(evt) {
			var str = this._lastQuery;
			
			if(str && !this.TAisPlaceholderActive()) {
				this.resultDropDown.showResults(this, this.TAdropdownAnchor, true);
				this._setActiveDescendant();
				this.TAtextField.parentElement.setAttribute("aria-expanded", "true");
			}
		},
		
		_TAonMouseDown: function(evt) {
			if(evt) {
				eventModule.stop(evt);
			}
			this._mouseDown = true;
			setTimeout(lang.hitch(this, function() {
				this.TAtextField.focus();
			}), 1);
		},
		
		TAupdateCurrentScope: function() {
			this.resultDropDown.setQueryString(this._lastQuery, this.TAscopeLabelNode.innerHTML);
		},
		
		/**
		 * Method to be overridden by the subclass if it uses a placeholder as "value" of the input field.
		 * 
		 * @abstract
		 */
		TAisPlaceholderActive: function() {
			return false;
		},
		
		/**
		 * Method to be overriden by the subclass or to connect to 
		 */
		search: function() {
			//Method to override or connect
		}
	});
	return TypeAheadManager;
});
