/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"ic-as/item/data/NewsDataAccessor",
	"ic-test/integration/as/item/type/artifact/StatusFileNewsData"
], function (dojo, array, NewsDataAccessor, StatusFileNewsData) {

	/**
	 * type manager tests.
	 */
	
	var typeManager = new com.ibm.social.as.item.type.TypeManager();
	var artifact = com.ibm.social.test.integration.as.item.type.artifact;
	
	function mixinNewsData(newsData){
		dojo.safeMixin(newsData, new NewsDataAccessor());
		newsData.init();
		
		return newsData;
	}
	
	/*
	 * Instead of creating individual bloated tests, an array is used to map to the 
	 * test data entries and expected types.
	 * TODO: Add 3 more tests for images once defect 56448 is ready.
	 */
	
	// All the news type tests
	var newsTypeTests = [
	    "Normal",
		"Content",
		"Status",
		"StatusFile",
		"File",
		"ImageFile",
		"Rollup",
		"RollupStatus",
		"RollupFile",
		"RollupStatusFile"
	];
	
	// Tests array
	var testsArray = array.map(newsTypeTests, function(testName){
		return {
			name: "test" + testName + "Type",
			setUp: function(){
				this.newsData = mixinNewsData(artifact[testName + "NewsData"]);
			},
			runTest: function(){
				doh.is(testName, typeManager.getType(this.newsData));
			}
		}
	});
	
	
	doh.register("com.ibm.social.test.integration.as.item.type.testTypeManager", testsArray);
	return com.ibm.social.test.integration.as.item.type.testTypeManager;
});
