/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.typeahead.DataReader");

dojo.require("dijit._Widget");
dojo.require("lconn.core.url");
dojo.require("lconn.core.auth");
dojo.require("lconn.core.config.services");
dojo.require("dojo.Deferred");

/**
 * This class will manage all requests to a Search API
 * 
 * @class lconn.core.typeahead.DataReader
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.typeahead.DataReader",
	[dijit._Widget], /** @lends lconn.core.typeahead.DataReader.prototype */
{
	/**
	 * @callback successCallback
	 * @param {{data: Array.<Object>, totalResults: Number, pageSize: Number}} response
	 */
	
	/**
	 * @callback errorCallback
	 * @param {ProgressEvent} error
	 */
	
	/**
	 * Represent the last query sent to the server.
	 * 
	 * @type {{url: String, query: String, pageSize: Number, page: Number}}
	 */
	lastQuery: null,
	
	/**
	 * Overrides the default number of results returned from the request.
	 * 
	 * @default [4]
	 * @type {Number}
	 */
	pageSize: 4,
	
	/**
	 * If false results returned from the request would not contain the highlight tags around the query matches.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	highlight: true,
	
	/**
	 * If true it allows the service to send requests with null or empty query field.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	canSendEmptyQueries: false,
	
	basicAuthentication: "/fba",
	anonymousAuthentication: "/anonymous",
	path: "",
	resultsId: "",
	
	_xhr: null,
	_promise: null,
	timeout: 0,
	
	startup: function() {
		this.inherited(arguments);
		
		var searchUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.search);
		var authenticationType = (lconn.core.auth.isAuthenticated() ? this.basicAuthentication : this.anonymousAuthentication);
		
		this._initLastQuery(searchUrl + authenticationType);
	},
	
	_initLastQuery: function(baseUrl) {
		this.lastQuery = {
			url: baseUrl + this.path,
			query: "",
			pageSize: this.pageSize,
			page: 1
		};
	},
	
	/**
	 * To reset the lastQuery object to the default values
	 */
	resetLastQuery: function() {
		this.lastQuery.query = "";
		this.lastQuery.page = 1;
	},
	
	/**
	 * Execute the query to the server.
	 * If the request returns successfully, if registered to the returned promise the "successCallback" will be called.
	 * 
	 * @param {String} query
	 * @return {Promise} promise
	 */
	executeQuery: function(query) {
		this.abortLastRequest();
		
		this._promise = new dojo.Deferred();
		
		if(query) {
			this.lastQuery.query = query;
		} else if(!this.lastQuery.query && !this.canSendEmptyQueries) {
			setTimeout(dojo.hitch(this, function() {
				this._promise.cancel();
			}), 1);
			return this._promise.promise;
		}
		
		var xhrArgs = {
			url: this._constructLastQueryString(),
			content: "",
			handleAs: "json",
			load: dojo.hitch(this, "_querySuccess"), 
			error: dojo.hitch(this, "_queryError"),
			failOk: true
		};
		if(this.timeout > 0) {
			xhrArgs.timeout = this.timeout;
		}
		this._xhr = dojo.xhrGet(xhrArgs);
		
		return this._promise.promise;
	},
	
	/**
	 * Execute the last query asking for the next page of results.
	 * 
	 * @return {Promise} promise
	 */
	getNextPage: function() {
		this.lastQuery.page++;
		return this.executeQuery(null);
	},
	
	_constructLastQueryString: function() {
		return lconn.core.url.rewrite(this.lastQuery.url, {
			query: (this.lastQuery.query ? this.lastQuery.query : undefined),
			pageSize: this.lastQuery.pageSize,
			page: (this.lastQuery.page > 1 ? this.lastQuery.page : undefined),
			highlight: this.highlight
		});
	},
	
	_querySuccess: function(data, ioargs) {
		if (ioargs.xhr.status == 200) {
			if(this._promise && (!this._promise.isResolved() || !this._promise.isCanceled())) {
				var args = {
						data: data[this.resultsId],
						totalResults: data.totalResults,
						pageSize: this.pageSize
				};
				this._promise.resolve(args);
			}
		} else {
			this._queryError(null, {status: ioargs.xhr.status});
		}
	},
	
	_queryError: function(error) {
		if(error && error.dojoType == "cancel") {
			if(dojo.config.isDebug) {
				console.debug(error);
			}
		}
		
		if(this._promise) {
			this._promise.reject(error);
		}
	},
	
	/**
	 * To abort last sent request if it's not returned yet.
	 */
	abortLastRequest: function() {
		if(this._xhr) {
			this._xhr.cancel();
		} else if(this._promise) {
			this._promise.cancel();
		}
	},
	
	/**
	 * Set request pageSize
	 * 
	 * @param {Number} size
	 */
	setPageSize: function(size) {
		this.lastQuery.pageSize = size > 0 ? size : this.pageSize;
	}
});
