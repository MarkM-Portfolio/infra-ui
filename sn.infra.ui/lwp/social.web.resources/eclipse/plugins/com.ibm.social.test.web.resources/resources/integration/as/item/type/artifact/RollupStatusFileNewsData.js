/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.integration.as.item.type.artifact.RollupStatusFileNewsData");

com.ibm.social.test.integration.as.item.type.artifact.RollupStatusFileNewsData = {
	"published": "2012-02-02T17:14:10.464Z",
	"url": "/connections/opensocial/rest/activitystreams/@public/@all/@all/b9fcb925-dc7e-4c39-bbad-d18c7cc61c3c",
	"target": {
		"attachments": [{
			"image": {
				
			},
			"author": {
				"id": "3349db52-8f0f-4462-a9ea-6ae4e0c61223"
			},
			"id": "dd2d4764-d1c6-46fc-bf00-f8c694aadc97",
			"displayName": "ci-log.txt",
			"published": "2012-02-02T17:14:01.480Z",
			"url": "/files/form/anonymous/api/library/2efe6b8e-06ec-43fc-b91e-b3c3351b58e7/document/f6362df5-f83d-479c-a16b-31f2c2bc06bc/media/ci-log.txt"
		}],
		"summary": "su with file rolled up ",
		"replies": {
			"items": [{
				"content": "comment",
				"author": {
					"objectType": "person",
					"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
					"displayName": "John Doe10"
				},
				"updated": "2012-02-02T17:14:10.464Z",
				"id": "e6a6953f-8bc4-4fb8-beb3-849c82aae38b"
			}],
			"totalItems": 1
		},
		"objectType": "note",
		"author": {
			"objectType": "person",
			"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
			"displayName": "John Doe10"
		},
		"updated": "2012-02-02T17:14:10.464Z",
		"id": "58380e2d-7110-479a-981e-d6dfb3288889",
		"displayName": "John Doe10",
		"published": "2012-02-02T17:14:01.480Z",
		"url": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryid=58380e2d-7110-479a-981e-d6dfb3288889"
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
		"rollupid": "58380e2d-7110-479a-981e-d6dfb3288889",
		"saved": "false",
		"canUnFollow": "true"
	},
	"openSocial": {
		"embed": {
			"gadget": "/connections/resources/web/com.ibm.social.ee/StatusUpdate.xml",
			"context": {
				"summary": "su with file rolled up ",
				"connectionsContentUrl": "/profiles/atom/mv/theboard/comment.do?commentId=e6a6953f-8bc4-4fb8-beb3-849c82aae38b",
				"published": "2012-02-02T17:14:10.464Z",
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
				"id": "58380e2d-7110-479a-981e-d6dfb3288889",
				"itemUrl": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryid=58380e2d-7110-479a-981e-d6dfb3288889",
				"eventTitle": "John Doe10 commented on their own board entry."
			}
		}
	},
	"title": "John Doe10 commented on their own board entry.",
	"content": "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe10.\" href=\"/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" alt=\"This is a photo of John Doe10.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe10\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003e5172b2c0-7547-102f-9f51-f6be80987c6a\u003c/span\u003e\u003c/span\u003e commented on their own board entry.",
	"id": "urn:lsid:ibm.com:activitystreams:b9fcb925-dc7e-4c39-bbad-d18c7cc61c3c",
	"updated": "2012-02-02T17:14:10.474Z",
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
		"id": "e6a6953f-8bc4-4fb8-beb3-849c82aae38b",
		"likes": {
			"totalItems": 1
		},
		"published": "2012-02-02T17:14:10.464Z",
		"url": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryid=58380e2d-7110-479a-981e-d6dfb3288889"
	},
	"verb": "post"
};