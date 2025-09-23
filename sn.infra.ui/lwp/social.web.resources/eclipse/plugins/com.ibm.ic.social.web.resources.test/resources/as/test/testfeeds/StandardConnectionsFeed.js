/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
], function () {

	/**
	 * A feed that contains all the contents of a regular Connections feed.
	 */
	var StandardConnectionsFeed = declare(null,
					{
						name: "Connections Feed",
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
								"connections" : {
									"actionable" : "false",
									"broadcast" : "true"
								},
								openSocial: {
									embed: {
										context:"",
										gadget:"http://dubxpcvm423.mul.ie.ibm.com:9082/connections/resources/web/com.ibm.social.ee/ConnectionsEE.xml"
									}
								},
								"title" : "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe5.\" href=\"http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/html/profileView.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"http://dubxpcvm423.mul.ie.ibm.com:9082/profiles/photo.do?userid=d0b3b6c0-7546-102f-9f4c-f6be80987c6a\" alt=\"This is a photo of John Doe5.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe5\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003ed0b3b6c0-7546-102f-9f4c-f6be80987c6a\u003c/span\u003e\u003c/span\u003e \u003cspan class=\"profiles entry\"\u003eA simple test \u003c/span\u003e ",
								"content" : "",
								"id" : "urn:lsid:ibm.com:activitystreams:88a630c9-a79b-498e-b24c-08eed3d42aeb",
								"published" : "2011-10-25T12:34:11.835Z",
								"object" : {
									"summary" : "A simple test ",
									"objectType" : "normal",
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
	return StandardConnectionsFeed;
});
