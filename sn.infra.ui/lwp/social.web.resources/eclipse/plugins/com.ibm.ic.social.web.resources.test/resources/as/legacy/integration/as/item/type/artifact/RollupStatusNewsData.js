/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([], function () {

	com.ibm.social.test.integration.as.item.type.artifact.RollupStatusNewsData = {
		"published": "2012-02-02T17:07:01.422Z",
		"url": "/connections/opensocial/rest/activitystreams/@public/@all/@all/327d89f0-912a-469d-8cea-079fdba93e9b",
		"target": {
			"summary": "rollup status ",
			"replies": {
				"items": [{
					"content": "comment",
					"author": {
						"objectType": "person",
						"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
						"displayName": "John Doe10"
					},
					"updated": "2012-02-02T17:07:01.422Z",
					"id": "5c9a940a-c168-45b1-93f7-f8be5ffe896f"
				}],
				"totalItems": 1
			},
			"objectType": "note",
			"author": {
				"objectType": "person",
				"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
				"displayName": "John Doe10"
			},
			"updated": "2012-02-02T17:07:01.422Z",
			"id": "a1ce7e59-c863-447e-9616-6824f8245f3c",
			"displayName": "John Doe10",
			"published": "2012-02-02T17:06:56.248Z",
			"url": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryid=a1ce7e59-c863-447e-9616-6824f8245f3c"
		},
		"provider": {
			"id": "http://www.ibm.com/xmlns/prod/sn",
			"displayName": "IBM Connections - News Service",
			"url": "/news"
		},
		"generator": {
			"image": {
				"url": "/homepage/nav/common/images/iconProfiles16.png"
			},
			"id": "profiles",
			"displayName": "IBM Connections - Profiles",
			"url": "/profiles"
		},
		"actor": {
			"objectType": "person",
			"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
			"displayName": "John Doe10"
		},
		"connections": {
			"broadcast": "true",
			"rollupid": "a1ce7e59-c863-447e-9616-6824f8245f3c",
			"saved": "false",
			"canUnFollow": "true"
		},
		"openSocial": {
			"embed": {
				"gadget": "/connections/resources/web/com.ibm.social.ee/StatusUpdate.xml",
				"context": {
					"summary": "rollup status ",
					"connectionsContentUrl": "/profiles/atom/mv/theboard/comment.do?commentId=5c9a940a-c168-45b1-93f7-f8be5ffe896f",
					"published": "2012-02-02T17:07:01.422Z",
					"isPublic": "true",
					"eventType": "profiles.wall.comment.added",
					"actor": {
						"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
						"displayName": "John Doe10"
					},
					"iconUrl": "/homepage/nav/common/images/iconProfiles16.png",
					"numLikes": "0",
					"title": "John Doe10",
					"numComments": "1",
					"updated": "false",
					"id": "a1ce7e59-c863-447e-9616-6824f8245f3c",
					"itemUrl": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryid=a1ce7e59-c863-447e-9616-6824f8245f3c",
					"eventTitle": "John Doe10 commented on their own board entry."
				}
			}
		},
		"title": "John Doe10 commented on their own board entry.",
		"content": "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe10.\" href=\"/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" alt=\"This is a photo of John Doe10.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe10\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003e5172b2c0-7547-102f-9f51-f6be80987c6a\u003c/span\u003e\u003c/span\u003e commented on their own board entry.",
		"id": "urn:lsid:ibm.com:activitystreams:327d89f0-912a-469d-8cea-079fdba93e9b",
		"updated": "2012-02-02T17:07:01.434Z",
		"object": {
			"summary": "comment ",
			"replies": {
				"totalItems": 0
			},
			"objectType": "comment",
			"author": {
				"objectType": "person",
				"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
				"displayName": "John Doe10"
			},
			"id": "5c9a940a-c168-45b1-93f7-f8be5ffe896f",
			"likes": {
				"totalItems": 1
			},
			"published": "2012-02-02T17:07:01.422Z",
			"url": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryid=a1ce7e59-c863-447e-9616-6824f8245f3c"
		},
		"verb": "post"
	};
	return com.ibm.social.test.integration.as.item.type.artifact.RollupStatusNewsData;
});
