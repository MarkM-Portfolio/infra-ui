/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([], function () {

	com.ibm.social.test.integration.as.item.type.artifact.RollupImageFileNewsData = {
		"published": "2012-02-02T16:07:28.510Z",
		"url": "/connections/opensocial/rest/activitystreams/@public/@all/@all/5d3c7923-d117-4e19-a6a5-485e6037c138",
		"provider": {
			"id": "http://www.ibm.com/xmlns/prod/sn",
			"displayName": "IBM Connections - News Service",
			"url": "/news"
		},
		"generator": {
			"image": {
				"url": "/homepage/nav/common/images/iconForums16.png"
			},
			"id": "forums",
			"displayName": "IBM Connections - Forums",
			"url": "/forums"
		},
		"actor": {
			"objectType": "person",
			"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
			"displayName": "John Doe10"
		},
		"connections": {
			"broadcast": "false",
			"rollupid": "4afc6163-8423-49f0-839f-be6cb8c0c875",
			"saved": "false",
			"canUnFollow": "true"
		},
		"openSocial": {
			"embed": {
				"gadget": "/connections/resources/web/com.ibm.social.ee/Generic.xml",
				"context": {
					"connectionsContentUrl": "/forums/",
					"published": "2012-02-02T16:07:28.510Z",
					"isPublic": "false",
					"eventType": "forum.created",
					"actor": {
						"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
						"displayName": "John Doe10"
					},
					"iconUrl": "/homepage/nav/common/images/iconForums16.png",
					"numLikes": "0",
					"title": "Doe Community",
					"numComments": "0",
					"updated": "false",
					"id": "4afc6163-8423-49f0-839f-be6cb8c0c875",
					"itemUrl": "/forums/html/forum?id=4afc6163-8423-49f0-839f-be6cb8c0c875",
					"eventTitle": "John Doe10 created the Doe Community forum."
				}
			}
		},
		"title": "John Doe10 created the Doe Community forum.",
		"content": "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe10.\" href=\"/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" alt=\"This is a photo of John Doe10.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe10\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003e5172b2c0-7547-102f-9f51-f6be80987c6a\u003c/span\u003e\u003c/span\u003e created the \u003ca class=\"forums container\" title=\"Open original item\" href=\"/forums/html/forum?id=4afc6163-8423-49f0-839f-be6cb8c0c875\"\u003eDoe Community\u003c/a\u003e forum.",
		"id": "urn:lsid:ibm.com:activitystreams:5d3c7923-d117-4e19-a6a5-485e6037c138",
		"updated": "2012-02-02T16:07:28.550Z",
		"object": {
			"objectType": "forum",
			"id": "4afc6163-8423-49f0-839f-be6cb8c0c875",
			"displayName": "Doe Community",
			"url": "/forums/html/forum?id=4afc6163-8423-49f0-839f-be6cb8c0c875"
		},
		"verb": "post"
	};
	return com.ibm.social.test.integration.as.item.type.artifact.RollupImageFileNewsData;
});
