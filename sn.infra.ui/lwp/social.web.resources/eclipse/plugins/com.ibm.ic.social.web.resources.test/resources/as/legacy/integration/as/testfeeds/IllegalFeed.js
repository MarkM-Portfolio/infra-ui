/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
	"dojo/_base/declare"
], function (declare) {

	/**
	 * Feed that contains two items, one with a missing actor which makes it an
	 * illegal entry.
	 */
	var IllegalFeed = declare("com.ibm.social.test.integration.as.testfeeds.IllegalFeed",
					com.ibm.social.test.integration.as.testfeeds.BaseTestFeed,
					{
						name: "IllegalFeed",
						expectedFragments: 1,
						expectedClasses: ["com.ibm.social.as.item.NewsItem"],
						content : {
							"startIndex" : 0,
							"totalResults" : 1,
							"entry" : [ {
								"actor" : {
									"id" : "d0b3b6c0-7546-102f-9f4c-f6be80987c6a",
									"displayName" : "John Doe5"
								},
								"content" : "Sample content",
								"published" : "2011-10-25T12:34:11.835Z",
								"verb" : null,
								"url" : "https://dubxpcvm423.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/88a630c9-a79b-498e-b24c-08eed3d42aeb"
							},
							{
								"content" : "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe5.\" href=\"http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/html/profileView.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/photo.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a\" alt=\"This is a photo of John Doe5.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe5\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003ed0b3b6c0-7546-102f-9f4c-f6be80987c6a\u003c/span\u003e\u003c/span\u003e \u003cspan class=\"profiles entry\"\u003eA simple test \u003c/span\u003e",
								"published" : "2011-10-25T12:34:11.835Z",
								"verb" : null,
								"url" : "https://dubxpcvm423.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/88a630c9-a79b-498e-b24c-08eed3d42aeb"
							} ],
							"itemsPerPage" : 1
						}
					});
	return IllegalFeed;
});
