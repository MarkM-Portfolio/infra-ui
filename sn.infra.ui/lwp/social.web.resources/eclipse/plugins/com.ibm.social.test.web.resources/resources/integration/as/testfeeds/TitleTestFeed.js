/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                              */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
dojo.provide("com.ibm.social.test.integration.as.testfeeds.TitleTestFeed");

dojo.require("com.ibm.social.test.integration.as.testfeeds.BaseTestFeed");

/**
 * Feed that contains elements to test HTML in the title attribute rather than content. 
 * 
 * Items are set up as follows:
 * 
 * 1) Title attribute with empty content (CRE container may supply content by default)
 * 2) Title attribute with no content attribute
 * 3) No title or content attribute (neither are mandatory in a 3rd party feed).
 * 4) No title but a content attribute which should not be used.
 */
dojo.declare("com.ibm.social.test.integration.as.testfeeds.TitleTestFeed",
				[com.ibm.social.test.integration.as.testfeeds.BaseTestFeed],
				{
					name: "TitleTestFeed",
					expectedFragments: 2,
					expectedClasses: ["com.ibm.social.as.item.NewsItem",
					                  "com.ibm.social.as.item.NewsItem"
					                  ],
					content : {
						"startIndex" : 0,
						"totalResults" : 1,
						"entry" : [ {
							"actor" : {
								"id" : "d0b3b6c0-7546-102f-9f4c-f6be80987c6a",
								"displayName" : "John Doe5"
							},
							"published" : "2011-10-25T12:34:11.835Z",
							"verb" : null,
							"url" : "https://dubxpcvm423.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/88a630c9-a79b-498e-b24c-08eed3d42aeb",
							"title": "<a>Some HTML</a>",
							"content": ""
						},
						{
							"actor" : {
								"id" : "d0b3b6c0-7546-102f-9f4c-f6be80987c6a",
								"displayName" : "John Doe5"
							},
							"title" : "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe5.\" href=\"http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/html/profileView.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/photo.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a\" alt=\"This is a photo of John Doe5.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe5\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003ed0b3b6c0-7546-102f-9f4c-f6be80987c6a\u003c/span\u003e\u003c/span\u003e \u003cspan class=\"profiles entry\"\u003eA simple test \u003c/span\u003e",
							"published" : "2011-10-25T12:34:11.835Z",
							"verb" : null,
							"url" : "https://dubxpcvm423.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/88a630c9-a79b-498e-b24c-08eed3d42aeb"
						},
						{
							"actor" : {
								"id" : "d0b3b6c0-7546-102f-9f4c-f6be80987c6a",
								"displayName" : "John Doe5"
							},
							"published" : "2011-10-25T12:34:11.835Z",
							"verb" : null,
							"url" : "https://dubxpcvm423.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/88a630c9-a79b-498e-b24c-08eed3d42aeb"
						},
						{
							"actor" : {
								"id" : "d0b3b6c0-7546-102f-9f4c-f6be80987c6a",
								"displayName" : "John Doe5"
							},
							"content": "Should not be used",
							"published" : "2011-10-25T12:34:11.835Z",
							"verb" : null,
							"url" : "https://dubxpcvm423.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/88a630c9-a79b-498e-b24c-08eed3d42aeb"
						} ],

						"itemsPerPage" : 1
					}
				});