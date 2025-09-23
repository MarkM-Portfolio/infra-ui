/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"../url",
	"../typeahead/DataReader"
], function (declare, url, DataReader) {
	
	/**
	 * This class will manage all requests to Quick Results API
	 * 
	 * @class ic-core.quickResults.DataReader
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var DataReader = declare(
		"lconn.core.quickResults.DataReader",
		DataReader, /** @lends ic-core.quickResults.DataReader.prototype */
	{
		/**
		 * To disable spelling correction system.
		 * 
		 * @default [false]
		 * @type {Boolean}
		 */
		disableSpellingCorrection: false,
		
		path: "/quickresults/typeahead",
		resultsId: "pages",
		
		_constructLastQueryString: function() {
			return url.rewrite(this.lastQuery.url, {
				query: (this.lastQuery.query ? this.lastQuery.query : undefined),
				pageSize: this.lastQuery.pageSize,
				page: (this.lastQuery.page > 1 ? this.lastQuery.page : undefined),
				//source: "ic_searchbox_dropdown",
				highlight: this.highlight,
				disableSpellingCorrection: this.disableSpellingCorrection
			});
		}
	});
	return DataReader;
});
