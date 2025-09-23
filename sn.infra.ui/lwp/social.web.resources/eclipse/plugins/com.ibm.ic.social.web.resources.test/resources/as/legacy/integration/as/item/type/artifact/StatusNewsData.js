/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([], function () {

	com.ibm.social.test.integration.as.item.type.artifact.StatusNewsData = {
		"published": "2012-02-02T16:35:50.474Z",
		"url": "/connections/opensocial/rest/activitystreams/@public/@all/@all/a37ef9ed-de2c-4f7d-a175-a35b00dfa2b8",
		"target": {
			"objectType": "person",
			"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
			"displayName": "John Doe10",
			"url": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a"
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
			"rollupid": "c09f2d80-4533-4b55-b6e8-21ef79bb1a97",
			"saved": "false",
			"canUnFollow": "true"
		},
		"openSocial": {
			"embed": {
				"gadget": "/connections/resources/web/com.ibm.social.ee/StatusUpdate.xml",
				"context": {
					"summary": "status update ",
					"connectionsContentUrl": "/profiles/atom/mv/theboard/entry.do?entryId=c09f2d80-4533-4b55-b6e8-21ef79bb1a97",
					"published": "2012-02-02T16:35:50.474Z",
					"isPublic": "true",
					"eventType": "profiles.status.updated",
					"actor": {
						"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
						"displayName": "John Doe10"
					},
					"iconUrl": "/homepage/nav/common/images/iconProfiles16.png",
					"numLikes": "0",
					"title": "John Doe10",
					"numComments": "0",
					"updated": "false",
					"id": "c09f2d80-4533-4b55-b6e8-21ef79bb1a97",
					"itemUrl": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryid=c09f2d80-4533-4b55-b6e8-21ef79bb1a97",
					"eventTitle": "John Doe10 status update "
				}
			}
		},
		"title": "John Doe10 status update ",
		"content": "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of John Doe10.\" href=\"/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"\u003e\u003cspan class=\"photo\" src=\"/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" alt=\"This is a photo of John Doe10.\" style=\"display : none\"\u003e\u003c/span\u003eJohn Doe10\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003e5172b2c0-7547-102f-9f51-f6be80987c6a\u003c/span\u003e\u003c/span\u003e \u003cspan class=\"profiles entry\"\u003estatus update \u003c/span\u003e",
		"id": "urn:lsid:ibm.com:activitystreams:a37ef9ed-de2c-4f7d-a175-a35b00dfa2b8",
		"updated": "2012-02-02T16:35:50.485Z",
		"object": {
			"summary": "status update ",
			"replies": {
				"totalItems": 0
			},
			"objectType": "note",
			"author": {
				"objectType": "person",
				"id": "5172b2c0-7547-102f-9f51-f6be80987c6a",
				"displayName": "John Doe10"
			},
			"id": "c09f2d80-4533-4b55-b6e8-21ef79bb1a97",
			"displayName": "John Doe10",
			"published": "2012-02-02T16:35:50.474Z",
			"url": "/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryid=c09f2d80-4533-4b55-b6e8-21ef79bb1a97"
		},
		"verb": "post"
	};
	return com.ibm.social.test.integration.as.item.type.artifact.StatusNewsData;
});
