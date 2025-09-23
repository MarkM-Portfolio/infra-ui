/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-core/quickResults/DataReader"
], function (declare, DataReader) {

	/**
	 * This class will manage all requests to Quick Results API
	 * 
	 * @class ic-search/searchPanel/history/HistoryDataReader
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var HistoryDataReader = declare(
		"lconn.search.searchPanel.history.HistoryDataReader",
		DataReader, /** @lends ic-search.searchPanel.history.HistoryDataReader.prototype */
	{
		
	});
	
	return HistoryDataReader;
});