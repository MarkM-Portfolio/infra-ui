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

dojo.provide("com.ibm.social.test.integration.as.testfeeds.controller.DynamicAddFeed");

com.ibm.social.test.integration.as.testfeeds.controller.DynamicAddFeed = {
		"published": "2012-03-02T16:12:16.094Z",
		"url": "/connections/opensocial/rest/activitystreams/@public/@all/@all/urn:lsid:lconn.ibm.com:profiles.story:cbf88070-bdf8-4a33-b5b3-297eafed8269",
		"target": {
			"objectType": "person",
			"id": "urn:lsid:lconn.ibm.com:profiles.person:userId1dynaAdd",
			"displayName": "FName SName",
			"url": "/profiles/html/profileView.do?userid=userId"
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
			"id": "urn:lsid:lconn.ibm.com:profiles.person:userIdDynaAdd",
			"displayName": "FName SName"
		},
		"connections": {
			"broadcast": "true",
			"rollupid": "urn:lsid:lconn.ibm.com:profiles.note:0043a46c-a4e8-42da-a712-d6298fee6a19",
			"isPublic": "true",
			"saved": "false",
			"rollupUrl": "/connections/opensocial/rest/activitystreams/@public/@all/@all?&filterBy=object&filterOp=equals&filterValue=0043a46c-a4e8-42da-a712-d6298fee6a19",
			"canUnFollow": "true"
		},
		"title": "FName SName aa ",
		"content": "\u003cspan class=\"vcard\"\u003e\u003ca class=\"fn url\" title=\"This is a link to the profile of FName SName.\" href=\"/profiles/html/profileView.do?userid=userId\"\u003e\u003cspan class=\"photo\" src=\"/profiles/photo.do?userid=userId\" alt=\"This is a photo of FName SName.\" style=\"display : none\"\u003e\u003c/span\u003eFName SName\u003c/a\u003e\u003cspan class=\"x-lconn-userid\" style=\"display : none\"\u003euserId\u003c/span\u003e\u003c/span\u003e \u003cspan class=\"profiles entry\"\u003eaa \u003c/span\u003e",
		"id": "urn:lsid:lconn.ibm.com:profiles.story:cbf88070-bdf8-4a33-b5b3-297eafed8269-dynaAdd",
		"updated": "2012-03-02T16:12:16.218Z",
		"object": {
			"summary": "aa ",
			"objectType": "note",
			"author": {
				"objectType": "person",
				"id": "urn:lsid:lconn.ibm.com:profiles.person:userId",
				"displayName": "FName SName"
			},
			"id": "urn:lsid:lconn.ibm.com:profiles.note:0043a46c-a4e8-42da-a712-d6298fee6a19-defaultDynaAdd",
			"displayName": "FName SName",
			"published": "2012-03-02T16:12:16.094Z",
			"url": "/profiles/html/profileView.do?userid=userId&entryId=0043a46c-a4e8-42da-a712-d6298fee6a19"
		},
		"verb": "post"
	}