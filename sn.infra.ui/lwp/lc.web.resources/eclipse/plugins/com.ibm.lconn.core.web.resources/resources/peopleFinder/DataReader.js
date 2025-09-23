/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.peopleFinder.DataReader");

dojo.require("lconn.core.typeahead.DataReader");

/**
 * This class will manage all requests to People Finder API
 * 
 * @class lconn.core.peopleFinder.DataReader
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.peopleFinder.DataReader",
	[lconn.core.typeahead.DataReader], /** @lends lconn.core.peopleFinder.DataReader.prototype */
{
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
	additionalFields: {
		low: ['city','country'],
		high: ['workPhone','tag']
	},
	
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
	
	/**
	 * To disable phonetics system.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	disablePhonetics: false,
	
	path: "/people/typeahead",
	resultsId: "persons",
	
	_initLastQuery: function(baseUrl) {
		this.inherited(arguments);
		
		this.lastQuery.additionalFields = JSON.stringify(this.additionalFields);
	},
	
	/**
	 * Execute the query to the People Finder server.
	 * If the request returns successfully, "successCallback" will be called
	 * 
	 * @param {String} query
	 * @param {successCallback} successCallback
	 * @param {errorCallback} errorCallback
	 */
	executeQuery: function(query, successCallback, errorCallback) {
		var promise = this.inherited(arguments);
		promise.then(successCallback);
		promise.otherwise(errorCallback);
	},
	
	/**
	 * Execute the last query asking for the next page of results.
	 * 
	 * @param {successCallback} successCallback
	 * @param {errorCallback} errorCallback
	 */
	getNextPage: function(successCallback, errorCallback) {
		this.lastQuery.page++;
		this.executeQuery(null, successCallback, errorCallback);
	},
	
	_constructLastQueryString: function() {
		return lconn.core.url.rewrite(this.lastQuery.url, {
			query: (this.lastQuery.query ? this.lastQuery.query : undefined),
			pageSize: this.lastQuery.pageSize,
			page: (this.lastQuery.page > 1 ? this.lastQuery.page : undefined),
			additionalFields: this.lastQuery.additionalFields,
			source: "ic_searchbox_dropdown",
			highlight: this.highlight,
			searchOnlyNameAndEmail: this.searchOnlyNameAndEmail,
			mustMatchNameOrEmail: this.mustMatchNameOrEmail,
			disablePhonetics: this.disablePhonetics
		});
	}
});
