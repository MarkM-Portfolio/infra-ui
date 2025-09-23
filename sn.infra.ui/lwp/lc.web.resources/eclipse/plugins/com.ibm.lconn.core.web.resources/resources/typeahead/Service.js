/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.typeahead.Service");

dojo.require("dijit._Widget");
dojo.require("lconn.core.typeahead.DataReader");
dojo.require("lconn.core.auth");
dojo.require("dojo.Deferred");

/**
 * This class will manage the queries to a Service and how to display
 * results from it.
 * 
 * @class lconn.core.typeahead.Service
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.typeahead.Service",
	[dijit._Widget], /** @lends lconn.core.typeahead.Service.prototype */
{
	/**
	 * The header to display before results.
	 * 
	 * @type {HTMLElement}
	 */
	header: null,
	
	/**
	 * The footer to display after results.
	 * 
	 * @type {HTMLElement}
	 */
	footer: null,
	
	/**
	 * If true no request will be sent without a login
	 * ans will ask to login.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	isLoginNeeded: false,
	
	/**
	 * If true the service will be disabled and wont send any
	 * request.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	isDisabled: false,
	
	/**
	 * The minimum number of results to display.
	 * Any negative number means all results
	 * 
	 * @default [-1]
	 * @type {Number}
	 */
	minToDisplay: -1,
	
	/**
	 * The number of character after which minimum results
	 * to display will be ignored.
	 * Any negative number means all results
	 * 
	 * @default [-1]
	 * @type {Number}
	 */
	lengthToIgnoreMin: -1,
	
	/**
	 * This parameter will be passed to the result widgets to
	 * tell them their content needs to be focusable.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	isFocusable: false,
	
	/**
	 * This parameter will be checked before creating and
	 * binding results to aria nodes.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	useAriaNodes: true,
	
	_dataReader: null,
	_createdWidgets: null,
	
	postCreate: function() {
		this._dataReader = new lconn.core.typeahead.DataReader();
		this._dataReader.startup();
	},
	
	startup: function() {
		this._createdWidgets = [];
	},
	
	destroy: function() {
		this._cleanAll();
	},
	
	_cleanAll: function() {
		if(this._createdWidgets) {
			for(var i=0; i < this._createdWidgets.length; i++) {
				this._createdWidgets[i].destroyRecursive();
			}
		}
		
		if(this.header && this.header.parentNode) {
			this.header.parentNode.removeChild(this.header);
		}
		
		if(this.footer && this.footer.parentNode) {
			this.footer.parentNode.removeChild(this.footer);
		}
		
		this._createdWidgets = [];
	},
	
	/**
	 * Execute the query to the service's server.
	 * 
	 * @param {String} query
	 * @return {Promise} promise
	 */
	executeQuery: function(query) {
		var promise = new dojo.Deferred();
		
		if(this._checkBeforeQueryExec(promise)) {
			var dataReaderPromise = this._dataReader.executeQuery(query);
			dataReaderPromise.then(dojo.hitch(this, "_handleResults", promise, query));
			dataReaderPromise.otherwise(dojo.hitch(this, "_handleError", promise));
		}
		
		return promise.promise;
	},
	
	/**
	 * Execute the last query asking for the next page of results.
	 * 
	 * @return {Promise} promise
	 */
	getNextPage: function() {
		var promise = new dojo.Deferred();
		
		if(this._checkBeforeQueryExec(promise)) {
			var dataReaderPromise = this._dataReader.getNextPage();
			dataReaderPromise.then(dojo.hitch(this, "_handleResults", promise, this._dataReader.lastQuery.query));
			dataReaderPromise.otherwise(dojo.hitch(this, "_handleError", promise));
		}
		
		return promise.promise;
	},
	
	/**
	 * Perform some controls before running a query.
	 * Returns true if the query can run, false otherwise.
	 * 
	 * @param {Promise} promise
	 * @return {Boolean} shouldExecQuery
	 */
	_checkBeforeQueryExec: function(promise) {
		var shouldExecQuery = true;
		
		if(this.isDisabled) {
			this._handleDisabled(promise);
			shouldExecQuery = false;
		} else if(this.isLoginNeeded && !lconn.core.auth.isAuthenticated()) {
			this._handleLogin(promise);
			shouldExecQuery = false;
		}
		
		return shouldExecQuery;
	},
	
	/**
	 * Handle results of a success query
	 * 
	 * @param {Promise} promise
	 * @param {String} query
	 * @param {{totalResults: Number, pageSize: Number, data: Array.<Object>}} results
	 */
	_handleResults: function(promise, query, results) {
		this._cleanAll();
		var dataObject = {
				header: this.header,
				footer: this.footer,
				aria: this.useAriaNodes ? this.initAriaNodes() : [],
				results: this.initResults(results.data),
				totalResults: results.totalResults,
				pageSize: results.pageSize
		};
		
		if(this.minToDisplay >= 0 && (query.length <= this.lengthToIgnoreMin || this.lengthToIgnoreMin < 0)) {
			dataObject.minToDisplay = this.minToDisplay;
		} else if(this.minToDisplay < 0) {
			dataObject.minToDisplay = dataObject.totalResults;
		}
		
		promise.resolve(dataObject);
	},
	
	/**
	 * Handle errors of a query
	 * 
	 * @param {Promise} promise
	 * @param {Object} error
	 */
	_handleError: function(promise, error) {
		if(error && error.dojoType == "cancel") {
			promise.cancel(error);
		} else {
			this._cleanAll();
			promise.resolve({});
		}
	},
	
	/**
	 * Handle response for login needed
	 * 
	 * @param {Promise} promise
	 */
	_handleLogin: function(promise) {
		// true is to tell the dropdown to show the login option
		promise.resolve({showLogin: true});
	},
	
	/**
	 * Handle response for service disabled
	 * 
	 * @param {Promise} promise
	 */
	_handleDisabled: function(promise) {
		this._cleanAll();
		promise.resolve({serviceDisabled: true});
	},
	
	/**
	 * Initialise widgets to display results and divide those
	 * based on importance.
	 * 
	 * @param {Object} data
	 * @return {{low: Array.<HTMLElemet>, medium: Array.<HTMLElemet>, high: Array<HTMLElemet>}} widgets
	 */
	initResults: function(data) {
		//to be overridden
		return {};
	},
	
	/**
	 * Initialise ARIA nodes for screen readers.
	 * 
	 * @return {Array.<HTMLElemet>} nodes
	 */
	initAriaNodes: function() {
		//to be overridden
		return [];
	},
	
	/**
	 * Set request timeout
	 * 
	 * @param {Number} timeout
	 */
	setTimeout: function(timeout) {
		this._dataReader.timeout = timeout;
	},
	
	/**
	 * Set request pageSize
	 * 
	 * @param {Number} size
	 */
	setPageSize: function(size) {
		this._dataReader.setPageSize(size);
	},
	
	/**
	 * Callback to be called when an entry result
	 * will get focus
	 * 
	 * @param {HTMLElement} element
	 */
	focusCallback: function(element) {
		//Callback - nothing here
	}
});
