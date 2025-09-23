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
dojo.provide("com.ibm.social.test.integration.as.testfeeds.NoContentFeed");

/**
 * A feed that contains a status update.
 */
dojo.declare("com.ibm.social.test.integration.as.testfeeds.NoContentFeed",
				com.ibm.social.test.integration.as.testfeeds.BaseTestFeed,
				{
					name: "No Content Feed",
					expectedFragments: 1,
					expectedClasses: ["com.ibm.social.as.item.NoContentItem"],

					content : {
						"startIndex" : 0,
						"totalResults" : 1,
						"entry" : [ ],
						"itemsPerPage" : 1
					}
				});