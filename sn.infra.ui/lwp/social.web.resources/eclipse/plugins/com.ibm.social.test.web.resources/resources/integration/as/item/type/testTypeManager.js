/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * type manager tests.
 */

dojo.provide("com.ibm.social.test.integration.as.item.type.testTypeManager");




dojo.require("com.ibm.social.as.item.data.NewsDataAccessor");

dojo.require("com.ibm.social.test.integration.as.item.type.artifact.FileNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.ImageFileNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.NormalNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.ContentNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.RollupFileNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.RollupImageFileNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.RollupStatusFileNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.RollupStatusImageFileNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.RollupStatusNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.RollupNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.StatusFileNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.StatusImageFileNewsData");
dojo.require("com.ibm.social.test.integration.as.item.type.artifact.StatusNewsData");


var typeManager = new com.ibm.social.as.item.type.TypeManager();
var artifact = com.ibm.social.test.integration.as.item.type.artifact;

function mixinNewsData(newsData){
	dojo.safeMixin(newsData, new com.ibm.social.as.item.data.NewsDataAccessor());
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
var testsArray = dojo.map(newsTypeTests, function(testName){
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