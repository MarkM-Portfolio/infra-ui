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

dojo.provide("com.ibm.social.test.integration.as.item.type.artifact.RollupFileNewsData");

com.ibm.social.test.integration.as.item.type.artifact.RollupFileNewsData = {
	"published": "2012-02-02T17:09:24.262Z",
	"url": "/connections/opensocial/rest/activitystreams/@public/@all/@all/4a5ea4c6-3f4e-4207-9cc3-74d49e42c63a",
	"target": {
		"replies": {
			"items": [{
				"content": "ss",
				"author": {
					"objectType": "person",
					"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
					"displayName": "John Doe10"
				},
				"updated": "2012-02-02T17:09:24.262Z",
				"id": "4ba83624-d6da-4c3a-94df-d2a9ac234242"
			}],
			"totalItems": 1
		},
		"objectType": "file",
		"image": {
			"url": "/files"
		},
		"author": {
			"objectType": "person",
			"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
			"displayName": "John Doe10"
		},
		"updated": "2012-02-02T16:53:02.119Z",
		"id": "f6362df5-f83d-479c-a16b-31f2c2bc06bc",
		"displayName": "ci-log.txt",
		"published": "2012-02-02T16:53:02.336Z",
		"url": "/files/app/file/f6362df5-f83d-479c-a16b-31f2c2bc06bc"
	},
	"provider": {
		"id": "http://www.ibm.com/xmlns/prod/sn",
		"displayName": "IBM Connections - News Service",
		"url": "/news"
	},
	"generator": {
		"image": {
			"url": "/homepage/nav/common/images/iconFiles16.png"
		},
		"id": "files",
		"displayName": "IBM Connections - Files",
		"url": "/files"
	},
	"actor": {
		"objectType": "person",
		"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
		"displayName": "John Doe10"
	},
	"connections": {
		"broadcast": "false",
		"rollupid": "f6362df5-f83d-479c-a16b-31f2c2bc06bc",
		"saved": "false",
		"canUnFollow": "true"
	},
	"openSocial": {
		"embed": {
			"gadget": "/connections/resources/web/com.ibm.social.ee/File.xml",
			"context": {
				"connectionsContentUrl": "/files/form/api/library/2efe6b8e-06ec-43fc-b91e-b3c3351b58e7/document/f6362df5-f83d-479c-a16b-31f2c2bc06bc/comment/4ba83624-d6da-4c3a-94df-d2a9ac234242/media",
				"published": "2012-02-02T17:09:24.262Z",
				"isPublic": "true",
				"eventType": "files.file.comment.created",
				"actor": {
					"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
					"displayName": "John Doe10"
				},
				"iconUrl": "/homepage/nav/common/images/iconFiles16.png",
				"numLikes": "0",
				"title": "ci-log.txt",
				"numComments": "1",
				"updated": "false",
				"id": "f6362df5-f83d-479c-a16b-31f2c2bc06bc",
				"itemUrl": "/files/app/file/f6362df5-f83d-479c-a16b-31f2c2bc06bc",
				"eventTitle": "John Doe10 commented on the file ci-log.txt."
			}
		}
	},
	"title": "John Doe10 commented on the file ci-log.txt.",
	"content": "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe10.\" href=\"/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" alt=\"This is a photo of John Doe10.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe10\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003e5172b2c0-7547-102f-9f51-f6be80987c6a\u003c/span\u003e\u003c/span\u003e commented on the file \u003ca class=\"files entry\" title=\"Open original item\" href=\"/files/app/file/f6362df5-f83d-479c-a16b-31f2c2bc06bc\"\u003eci-log.txt\u003c/a\u003e.",
	"id": "urn:lsid:ibm.com:activitystreams:4a5ea4c6-3f4e-4207-9cc3-74d49e42c63a",
	"updated": "2012-02-02T17:09:24.274Z",
	"object": {
		"summary": "ss ",
		"replies": {
			
		},
		"objectType": "comment",
		"author": {
			"objectType": "person",
			"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
			"displayName": "John Doe10"
		},
		"id": "4ba83624-d6da-4c3a-94df-d2a9ac234242",
		"published": "2012-02-02T17:09:24.262Z",
		"url": "/files/app/file/f6362df5-f83d-479c-a16b-31f2c2bc06bc?comment=4ba83624-d6da-4c3a-94df-d2a9ac234242"
	},
	"verb": "post"
};