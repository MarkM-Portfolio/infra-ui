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
dojo.provide("com.ibm.social.test.integration.as.testfeeds.TinyFeed");

/**
 * Example of an extremely small feed with lots of missing optional attributes.
 * Note, the feed MUST have a published and actor object, although the actor can be empty.
 */
dojo.declare("com.ibm.social.test.integration.as.testfeeds.TinyFeed",
				com.ibm.social.test.integration.as.testfeeds.BaseTestFeed,
				{
					name: "TinyFeed",
					expectedFragments: 1,
					expectedClasses: ["com.ibm.social.as.item.NewsItem"],

					content: {
						"startIndex" : 0,
						"totalResults" : 1,
						"entry" : [ {
							"actor": {"id":""
							},
							"object": {
								"id":"a"
							},
							"generator":{
								"id":"An External Application1"
							},
							"published":"2011-10-06T12:25:44.529Z"
						}]
					}
				});