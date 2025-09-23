/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
	"dojo/_base/declare",
	"ic-test/integration/as/testfeeds/BaseTestFeed"
], function (declare, BaseTestFeed) {

	/**
	 * A feed that contains a status update.
	 */
	var StatusUpdateFeed = declare("com.ibm.social.test.integration.as.testfeeds.StatusUpdateFeed",
					BaseTestFeed,
					{
						name: "StatusUpdate Feed",
						expectedFragments: 1,
						expectedClasses: ["com.ibm.social.as.item.StatusNewsItem"],
	
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
								"title" : "John Doe5 A simple test ",
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
	return StatusUpdateFeed;
});
