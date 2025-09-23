/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Widget",
	"./DataReader"
], function (declare, lang, _Widget, DataReader) {
	
	/**
	 * 
	 * 
	 * @class ic-core.peopleFinder.PersonDetector
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var PersonDetector = declare(
		"lconn.core.peopleFinder.PersonDetector",
		_Widget, /** @lends ic-core.peopleFinder.PersonDetector.prototype */
	{
		/**
		 * Constructor of an object that extends lconn.core.peopleFinder.DataReader.
		 * It can be used to customize DataReader behaviors.
		 * 
		 * @default [lconn.core.peopleFinder.DataReader]
		 * @type {function}
		 * @see lconn.core.peopleFinder.DataReader
		 */
		DataReaderOjbect: DataReader,
		
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
		
		dataReader: null,
		_splittedQuery: null,
		_shouldStop: false,
		
		startup: function() {
			this.inherited(arguments);
			
			this.dataReader = new this.DataReaderOjbect({
				pageSize: this.resultsNumber,
				highlight: false,
				searchOnlyNameAndEmail: true,
				additionalFields: this.additionalFields
			});
			
			this.dataReader.startup();
		},
		
		detect: function(query) {
			if(!query) {
				return;
			}
			this._shouldStop = true;
			this.dataReader.abortLastRequest();
			this._splittedQuery = query.split(" ");
			
			this._startDetection(0, 0, false);
		},
		
		_startDetection: function(startIndex, endIndex, stopOnNoResults) {
			if(this._shouldStop && endIndex > 0) {
				this._shouldStop = false;
				return;
			}
			
			var query = this._getQuery(startIndex, endIndex);
			if(!query) {
				return;
			}
			
			this.dataReader.executeQuery(query, lang.hitch(this, "_handleResults", startIndex, endIndex, stopOnNoResults));
		},
		
		_handleResults: function(startIndex, endIndex, stopOnNoResults, data) {
			if(this._shouldStop && endIndex > 0) {
				this._shouldStop = false;
				return;
			}
			this._shouldStop = false;
			
			if(data.length > 0) {
				if(data[0].confidence == "high") {
					this.onPersonFound(data, this._getQuery(startIndex, endIndex));
					stopOnNoResults = true;
				}
				endIndex++;
				this._startDetection(startIndex, endIndex, stopOnNoResults);
			} else if(!stopOnNoResults) {
				startIndex++;
				if(startIndex > endIndex) {
					endIndex++;
				}
				this._startDetection(startIndex, endIndex, stopOnNoResults);
			}
		},
		
		_getQuery: function(startIndex, endIndex) {
			var query = "";
			for(var i=startIndex; i < this._splittedQuery.length && i <= endIndex && endIndex < this._splittedQuery.length; i++) {
				query += this._splittedQuery[i] + " ";
			}
			
			return query.trim();
		},
		
		/**
		 * Method to be overriden or connected to.
		 * Called when a person has been found inside the query.
		 * 
		 * @abstract
		 * @param {Array.<Object>} persons
		 * @param {String} matchingQuery
		 */
		onPersonFound: function(data, matchingQuery) {
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
	
	return PersonDetector;
});
