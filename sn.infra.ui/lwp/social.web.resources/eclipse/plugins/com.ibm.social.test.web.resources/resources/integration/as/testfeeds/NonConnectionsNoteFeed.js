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
dojo.provide("com.ibm.social.test.integration.as.testfeeds.NonConnectionsNoteFeed");

/**
 * A feed that contains a "note" type activity that isn't from Connections.
 * This tests that a normal NewsItem is produced with no exceptions.
 */
dojo.declare("com.ibm.social.test.integration.as.testfeeds.NonConnectionsNoteFeed",
				com.ibm.social.test.integration.as.testfeeds.BaseTestFeed,
				{
					name: "Non-Connections Note Feed",
					expectedFragments: 1,
					expectedClasses: ["com.ibm.social.as.item.NewsItem"],

					content : {
						"startIndex" : 0,
						"totalResults" : 1,
						"entry" : [ {
							"target" : {
								"objectType" : "person",
								"id" : "d0b3b6c0-7546-102f-9f4c-f6be80987c6a",
								"displayName" : "John Doe5",
								"url" : "http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/html/profileView.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a"
							},
							"provider" : {
								"id" : "http://www.ibm.com/xmlns/prod/sn",
								"displayName" : "IBM Connections - News Service",
								"url" : "http://dubxpcvm423.mul.ie.ibm.com:9082/news"
							},
							"generator" : {
								"image" : {
									"url" : "http://dubxpcvm423.mul.ie.ibm.com:9082/homepage/nav/common/images/iconProfiles16.png"
								},
								"id" : "profiles",
								"displayName" : "IBM Connections - Profiles",
								"url" : "http://dubxpcvm423.mul.ie.ibm.com:9082/profiles"
							},
							"actor" : {
								"id" : "d0b3b6c0-7546-102f-9f4c-f6be80987c6a",
								"displayName" : "John Doe5"
							},
							"title" : "John Doe5 A simple test ",
							"content" : "",
							"id" : "urn:lsid:ibm.com:activitystreams:88a630c9-a79b-498e-b24c-08eed3d42aeb",
							"published" : "2011-10-25T12:34:11.835Z",
							"object" : {
								"summary" : "A simple test ",
								"objectType" : "note",
								"id" : "d45e763a-d700-47a8-a61d-542eb8630cec",
								"displayName" : "John Doe5",
								"url" : "http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/html/profileView.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a&entryId=d45e763a-d700-47a8-a61d-542eb8630cec"
							},
							"verb" : "post",
							"url" : "https://dubxpcvm423.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/88a630c9-a79b-498e-b24c-08eed3d42aeb"
						} ],
						"itemsPerPage" : 1
					}
				});