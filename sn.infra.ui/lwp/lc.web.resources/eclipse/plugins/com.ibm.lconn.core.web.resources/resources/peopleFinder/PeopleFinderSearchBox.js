/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.peopleFinder.PeopleFinderSearchBox");

dojo.require("dijit._Widget");
dojo.require("lconn.core.peopleFinder.ResultDropDown");
dojo.require("lconn.core.peopleFinder.DataReader");
dojo.require("lconn.core.config.properties");

/**
 * Common People Finder typeahead utility.
 * It manage all the requests and results display of People.
 * 
 * This class is supposed to be subclassed in order to use it.
 * 
 * @class lconn.core.peopleFinder.PeopleFinderSearchBox
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.peopleFinder.PeopleFinderSearchBox",
	[dijit._Widget], /** @lends lconn.core.peopleFinder.PeopleFinderSearchBox.prototype */
{
	/**
	 * Constructor of an object that extends lconn.core.peopleFinder.DataReader.
	 * It can be used to customize DataReader behaviors.
	 * 
	 * @default [lconn.core.peopleFinder.DataReader]
	 * @type {function}
	 * @see lconn.core.peopleFinder.DataReader
	 */
	DataReaderOjbect: lconn.core.peopleFinder.DataReader,
	
	/**
	 * Constructor of an object that extends lconn.core.peopleFinder.ResultDropDown.
	 * It can be used to customize ResultDropDown behaviors.
	 * 
	 * @default [lconn.core.peopleFinder.ResultDropDown]
	 * @type {function}
	 * @see lconn.core.peopleFinder.ResultDropDown
	 */
	ResultDropDownObject: lconn.core.peopleFinder.ResultDropDown,
	
	//lconn.core.peopleFinder.DataReader vars
	/**
	 * To change default additional fields values in the request;
	 * e.g. {
	 * 			low:['city','country'],
	 * 			medium:['workPhone'],
	 * 			high:['tag']
	 * 		}
	 * 
	 * @default [{low: ['city','country'], high: ['workPhone','tag']}]
	 * @type {{low: Array.<String>, medium: Array.<String>, high: Array<String>}}
	 */
	additionalFields: null,
	
	/**
	 * Overrides the default number of results returned from the request.
	 * 
	 * @default [4]
	 * @type {Number}
	 */
	resultsNumber: 4,
	
	/**
	 * If false results returned from the request would not contain the highlight tags around the query matches.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	highlight: true,
	
	/**
	 * If true the query will match names and emails only.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	searchOnlyNameAndEmail: false,
	
	/**
	 * If true at least one term in the query will match names and emails.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	mustMatchNameOrEmail: false,
	//End of lconn.core.peopleFinder.DataReader vars
	
	//lconn.core.peopleFinder.ResultDropDown vars
	/**
	 * If true the person graphic will change based on the confidence.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	useConfidence: true,
	
	/**
	 * To set the drop down tooltip orientation based on dijit.popup orient property.
	 * 
	 * @see dijit.popup
	 */
	orientation: null,
	
	/**
	 * To customize no results message.
	 * 
	 * @type {String}
	 */
	PF_NO_RESULTS_MESSAGE: "",
	
	/**
	 * If false the no results message wont be shown.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	showNoResultsMessage: true,
	
	/**
	 * To override default drop down tooltip width (in pixels).
	 * 
	 * @default [300]
	 * @type {Number}
	 */
	dropDownWidth: 300,
	//End of lconn.core.peopleFinder.ResultDropDown vars
	
	/**
	 * Defines an aria-label property on the input field.
	 * 
	 * @type {String}
	 */
	PF_ARIA_LABEL: "",
	
	/**
	 * Key to get the request timeout property from configuration file.
	 * 
	 * @constant
	 * @readonly
	 * @type {String}
	 */
	TIMEOUT_PROPERTY: "com.ibm.lconn.core.peopleFinder.timeout",
	
	/**
	 * Anchor for the dropDown element different from PFtextField.
	 * If undefined PFtextField will be used.
	 * 
	 * @type {HTMLElement}
	 */
	PFdropdownAnchor: null,
	
	/**
	 * Text field used for People Finder search.
	 * 
	 * @type {HTMLInputElement}
	 */
	PFtextField: null,
	
	/**
	 * To prevent People Finder initialization of temporary disable it.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	PFdisable: false,
	
	resultDropDown: null,
	dataReader: null,
	activeDescendantId: null,
	_queryTimeout: 200,
	_mouseDown: false,
	_timeoutID: null,
	_keyPressed: false,
	
	postCreate: function() {
		if(!this.PFtextField || this.PFdisable) {
			return;
		}
		
		if(!this.PFdropdownAnchor) {
			this.PFdropdownAnchor = this.PFtextField;
		}
		
		var timeout = parseInt(lconn.core.config.properties[this.TIMEOUT_PROPERTY]);
		if(timeout) {
			this._queryTimeout = timeout;
		}
		
		this.dataReader = new this.DataReaderOjbect({
			pageSize: this.resultsNumber,
			highlight: this.highlight,
			searchOnlyNameAndEmail: this.searchOnlyNameAndEmail,
			mustMatchNameOrEmail: this.mustMatchNameOrEmail
		});
		if(!lconn.core.peopleFinder.DataReader.prototype.isPrototypeOf(this.dataReader) && dojo.config.isDebug) {
			console.warn("ATTENTION! The provided class "+this.dataReader.declaredClass+" is not a subclass of lconn.core.peopleFinder.DataReader");
		}
		if(this.additionalFields) {
			dojo.mixin(this.dataReader.additionalFields, this.additionalFields);
		}
		this.dataReader.startup();
		
		if(!this.PFtextField.id) {
			this.PFtextField.id = this.id + "_PFtextField";
		}
		
		this.resultDropDown = new this.ResultDropDownObject({
			useConfidence: this.useConfidence,
			orientation: this.orientation,
			PF_NO_RESULTS_MESSAGE: this.PF_NO_RESULTS_MESSAGE,
			showNoResultsMessage: this.showNoResultsMessage,
			dropDownWidth: this.dropDownWidth
		});
		if(!lconn.core.peopleFinder.ResultDropDown.prototype.isPrototypeOf(this.resultDropDown) && dojo.config.isDebug) {
			console.warn("ATTENTION! The provided class "+this.resultDropDown.declaredClass+" is not a subclass of lconn.core.peopleFinder.ResultDropDown");
		}
		this.resultDropDown.startup();
		
		this.connect(this.resultDropDown, "onActiveDescendantChanged", "_changeActiveDescendantId");
		this.connect(this.resultDropDown.domNode, "onmousedown", "_PFonMouseDown");
		this.connect(this.resultDropDown, "onPersonSelected", "onPersonSelected");
		this.resultDropDown.connect(this, "search", "closeResults");
		
		this.connect(this.PFtextField, "onkeypress", "typeAheadCallback");
		if(!dojo.isIE) {
			this.connect(this.PFtextField, "oninput", "_onInput");
		}
		this.connect(this.PFtextField, "onblur", "onFieldBlur");
		this.connect(this.PFtextField, "onfocus", "onFieldFocus");

		this.PFtextField.parentElement.setAttribute("role", "combobox");
		this.PFtextField.parentElement.setAttribute("popupactive", "true");
		this.PFtextField.parentElement.setAttribute("aria-expanded", "false");
		
		this.PFtextField.setAttribute("role", "textbox");
		this.PFtextField.setAttribute("aria-invalid", "false");
		if(this.PF_ARIA_LABEL) {
			this.PFtextField.setAttribute("aria-label", this.PF_ARIA_LABEL);
		}
		
		this.PFtextField.autocomplete = "off";
	},
	
	destroy: function() {
		if(this.dataReader){
			this.dataReader.destroyRecursive();
		}
		if(this.resultDropDown){
			this.resultDropDown.destroyRecursive();
		}
		this.inherited(arguments);
	},
	
	typeAheadCallback: function(evt) {
		if(this.PFdisable || (!evt.keyChar && (evt.which == 27 || evt.keyCode == 27 /* Escape key */))) {
			this.resultDropDown.closeResults();
			this.PFtextField.removeAttribute("aria-activedescendant");
			this.PFtextField.parentElement.setAttribute("aria-expanded", "false");
			return;
		}
		
		if(!evt.keyChar && (evt.which == 13 || evt.keyCode == 13 /* Enter key */)) {
			dojo.stopEvent(evt);
			this.resultDropDown.executeSelectedAction();
			return;
		}
		
		if(!evt.keyChar && (evt.which == 38 || evt.keyCode == 38 /* Arrow up key */)) {
			dojo.stopEvent(evt);
			this.resultDropDown.selectPreviousElement();
			return;
		}
		
		if(!evt.keyChar && (evt.which == 40 || evt.keyCode == 40 /* Arrow down key */)) {
			dojo.stopEvent(evt);
			this.resultDropDown.selectNextElement();
			return;
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
		
		this._timeoutID = setTimeout(dojo.hitch(this, function() {
			var str = this.PFtextField.value;
			str = dojo.string.trim(str);
			
			if(!str || this.PFisPlaceholderActive()) {
				this.dataReader.lastQuery.query = "";
				this.resultDropDown.closeResults();
				this.PFtextField.removeAttribute("aria-activedescendant");
				this.PFtextField.parentElement.setAttribute("aria-expanded", "false");
				this.activeDescendantId = null;
				return;
			}
			
			if(str === this.dataReader.lastQuery.query) {
				return;
			}
			
			this.dataReader.executeQuery(str, dojo.hitch(this, "showTypeaheadResults"), null);
		}), this._queryTimeout);
	},
	
	_setActiveDescendant: function() {
		if(this.activeDescendantId) {
			this.PFtextField.setAttribute("aria-activedescendant", this.activeDescendantId);
		} else {
			this.PFtextField.setAttribute("aria-activedescendant", this.resultDropDown.id);
		}
	},
	
	_changeActiveDescendantId: function(id) {
		this.activeDescendantId = id;
		this._setActiveDescendant();
	},
	
	showTypeaheadResults: function(data) {
		this.resultDropDown.setResults(data);
		
		this.resultDropDown.showResults(this, this.PFdropdownAnchor);
		this.PFtextField.parentElement.setAttribute("aria-owns", this.resultDropDown.id);
		this._setActiveDescendant();
		this.PFtextField.parentElement.setAttribute("aria-expanded", "true");
	},
	
	onFieldBlur: function(evt) {
		if(this._mouseDown) {
			this._mouseDown = false;
			return;
		}
		
		this.resultDropDown.closeResults();
		this.PFtextField.removeAttribute("aria-activedescendant");
		this.PFtextField.parentElement.setAttribute("aria-expanded", "false");
	},
	
	onFieldFocus: function(evt) {
		var str = this.dataReader.lastQuery.query;
		
		if(str && !this.PFisPlaceholderActive()) {
			this.resultDropDown.showResults(this, this.PFdropdownAnchor);
			this._setActiveDescendant();
			this.PFtextField.parentElement.setAttribute("aria-expanded", "true");
		}
	},
	
	_PFonMouseDown: function(evt) {
		this._mouseDown = true;
		setTimeout(dojo.hitch(this, function() {
			this.PFtextField.focus();
		}), 1);
	},
	
	/**
	 * Method to be overridden by the subclass if it uses a placeholder as "value" of the input field.
	 * 
	 * @abstract
	 */
	PFisPlaceholderActive: function() {
		return false;
	},
	
	/**
	 * Method to be overridden or connected to by the subclass.
	 * Called when an entry in the drop down tooltip is selected.
	 * 
	 * @abstract
	 * @param {{displayName: String, userId: String, mail: String}} person
	 */
	onPersonSelected: function(person) {
		//Callback - nothing here
	}
});
