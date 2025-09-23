/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.peopleFinder.PersonDetector");

dojo.require("dijit._Widget");
dojo.require("lconn.core.peopleFinder.DataReader");

/**
 * 
 * 
 * @class lconn.core.peopleFinder.PersonDetector
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.peopleFinder.PersonDetector",
	[dijit._Widget], /** @lends lconn.core.peopleFinder.PersonDetector.prototype */
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
	 * Overrides the default number of results returned.
	 * 
	 * @default [3]
	 * @type {Number}
	 */
	resultsNumber: 3,
	
	/**
	 * To change default additional fields values in the request;
	 * e.g. {
	 * 			low:['city','country'],
	 * 			medium:['workPhone'],
	 * 			high:['tag']
	 * 		}
	 * 
	 * @default [null]
	 * @type {{low: Array.<String>, medium: Array.<String>, high: Array<String>}}
	 */
	additionalFields: {},
	
	/**
	 * To disable phonetics system.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	disablePhonetics: false,
	
	dataReader: null,
	_splittedQuery: null,
	_latestStatus: null,
	_queue: null,
	
	startup: function() {
		this.inherited(arguments);
		
		this.dataReader = new this.DataReaderOjbect({
			pageSize: this.resultsNumber,
			highlight: false,
			searchOnlyNameAndEmail: true,
			additionalFields: this.additionalFields,
			disablePhonetics: this.disablePhonetics
		});
		
		this.dataReader.startup();
		
		this._latestStatus = {
			queryChecked: "",
			foundStartIndex: -1,
			foundEndIndex: -1,
			startIndex: 0,
			endIndex: 0
		};
		this._queue = [];
	},
	
	detect: function(query) {
		if(!query || dojo.string.trim(query) == dojo.string.trim(this._latestStatus.queryChecked)) {
			return;
		}
		this.dataReader.abortLastRequest();
		var start = 0;
		var end = 0;
		if(this._latestStatus.queryChecked && query.indexOf(this._latestStatus.queryChecked) == 0) {
			start = this._latestStatus.foundStartIndex > -1 ? this._latestStatus.foundStartIndex : this._latestStatus.endIndex + 1;
			end = this._latestStatus.foundEndIndex > -1 ? this._latestStatus.foundEndIndex + 1 : this._latestStatus.endIndex + 1;
			
			if(query.split(" ").length == this._latestStatus.queryChecked.split(" ").length && end > 0) {
				end--;
			}
			if(end < start) {
				start = end;
			}
		}
		this._splittedQuery = query.split(" ");
		
		this._latestStatus.foundStartIndex = -1;
		this._latestStatus.foundEndIndex = -1;
		this._latestStatus.queryChecked = "";
		
		this._startDetection(start, end, -1);
	},
	
	_startDetection: function(startIndex, endIndex, runningId) {
		if(runningId < 0) {
			runningId = this._queue.length;
			this._queue.push(false);
			for(var i=0; i < runningId; i++) {
				this._queue[i] = true;
			}
		} else if(this._queue[runningId]) {
			return;
		}
		
		var query = this._getQuery(startIndex, endIndex);
		if(!query) {
			this._queue = [];
			return;
		}
		
		this._latestStatus.startIndex = startIndex;
		this._latestStatus.endIndex = endIndex;
		this._latestStatus.queryChecked = this._getQuery(0, endIndex);
		
		this.dataReader.executeQuery(query, dojo.hitch(this, "_handleResults", startIndex, endIndex, runningId));
	},
	
	_handleResults: function(startIndex, endIndex, runningId, data) {
		if(this._queue[runningId]) {
			return;
		}
		
		if(data.length > 0) {
			if(data[0].confidence == "high" || data[0].confidence == "medium") {
				this.onPersonFound(data, this._getQuery(startIndex, endIndex));
				this._latestStatus.foundStartIndex = startIndex;
				this._latestStatus.foundEndIndex = endIndex;
			}
			endIndex++;
			this._startDetection(startIndex, endIndex, runningId);
		} else {
			this.onNoPersonFound();
			
			startIndex++;
			if(startIndex > endIndex) {
				endIndex++;
			}
			this._startDetection(startIndex, endIndex, runningId);
		}
	},
	
	_getQuery: function(startIndex, endIndex) {
		var query = "";
		for(var i=startIndex; i < this._splittedQuery.length && i <= endIndex && endIndex < this._splittedQuery.length; i++) {
			query += this._splittedQuery[i] + " ";
		}
		
		return dojo.string.trim(query);
	},
	
	/**
	 * Method to be overriden or connected to.
	 * Called when a person has been found inside the query.
	 * 
	 * @abstract
	 * @param {Array.<Object>} persons
	 * @param {String} matchingQuery
	 */
	onPersonFound: function(persons, matchingQuery) {
		//callback nothing here
	},
	
	/**
	 * Method to be overriden or connected to.
	 * Called when no person has been found inside the query.
	 * 
	 * @abstract
	 */
	onNoPersonFound: function() {
		//callback nothing here
	}
});
