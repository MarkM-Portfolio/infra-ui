/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
dojo.provide("com.ibm.social.test.integration.as.testfeeds.BaseTestFeed");

/**
 * Provides a base class for testfeeds consumed in the tests for the ActivityStream news
 * item creation. The testfeed class contains the feed and also attributes which are checked
 * against in the Doh tests.
 * 
 * Each test feed contains the following attributes:
 * name					- A name for the feed
 * content 				- The JSON feed consumed by the ActivityStream
 * expectedFragments 	- The number of news item HTML fragments expected to be produced
 * expectedClasses		- Array of the expected classes of items created.
 */
dojo.declare("com.ibm.social.test.integration.as.testfeeds.BaseTestFeed",null,
{
	name: "",
	expectedFragments: 0,
	content: null,
	expectedClasses: null
});