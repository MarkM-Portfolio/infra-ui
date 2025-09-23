/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.quickResults.DataReader");

dojo.require("lconn.core.typeahead.DataReader");

/**
 * This class will manage all requests to Quick Results API
 * 
 * @class lconn.core.quickResults.DataReader
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.quickResults.DataReader",
	[lconn.core.typeahead.DataReader], /** @lends lconn.core.quickResults.DataReader.prototype */
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
		return lconn.core.url.rewrite(this.lastQuery.url, {
			query: (this.lastQuery.query ? this.lastQuery.query : undefined),
			pageSize: this.lastQuery.pageSize,
			page: (this.lastQuery.page > 1 ? this.lastQuery.page : undefined),
			//source: "ic_searchbox_dropdown",
			highlight: this.highlight,
			disableSpellingCorrection: this.disableSpellingCorrection
		});
	}
});
