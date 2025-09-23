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
dojo.provide("com.ibm.social.test.integration.as.testfeeds.ImageItemFeed");

/**
 * Feed that will contains an imagefile element. 
 * The object element denoting the file type contains minimal attributes.
 */
dojo.declare("com.ibm.social.test.integration.as.testfeeds.ImageItemFeed",
				com.ibm.social.test.integration.as.testfeeds.BaseTestFeed,
				{
					name: "ImageItemFeed",
					expectedFragments: 1,
					expectedClasses: ["com.ibm.social.as.item.ImageFileNewsItem"],

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
							"actor" : {
								"id" : "d0b3b6c0-7546-102f-9f4c-f6be80987c6a",
								"displayName" : "John Doe5"
							},
							"title" : "testfile.txt",
							"content" : "",
							"id" : "urn:lsid:ibm.com:activitystreams:88a630c9-a79b-498e-b24c-08eed3d42aeb",
							"published" : "2011-10-25T12:34:11.835Z",
							"object" : {
								"displayName": "pictureOfMe.jpg",
								"objectType" : "file",
								"image" : {"mediaItemId": "2342432-sfsf-gfdgfdgd", url: "http://sdfsdfsf"}
							},
							"verb" : "post",
							"url" : "https://dubxpcvm423.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/88a630c9-a79b-498e-b24c-08eed3d42aeb"
						} ],
						"itemsPerPage" : 1
					}
				});