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

dojo.provide("com.ibm.social.test.integration.as.mockXhrResponses.updatesBefore");

com.ibm.social.test.integration.as.mockXhrResponses.updatesBefore = {
	    "startIndex": 0,
	    "totalResults": -1,
	    "connections": {
	        "isAdmin": "true"
	    },
	    "filtered": true,
	    "title": "IBM Connections - News feed for John Doe10",
	    "itemsPerPage": 2,
	    "sorted": true,
	    "list": [
	        {
	            "published": "2013-03-14T17:26:48.448Z",
	            "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/urn:lsid:lconn.ibm.com:profiles.story:b98c69b1-d54a-4ac1-824f-a30d86a6ca94",
	            "target": {
	                "connections": {
	                    "state": "active"
	                },
	                "objectType": "person",
	                "id": "urn:lsid:lconn.ibm.com:profiles.person:5172b2c0-7547-102f-9f51-f6be80987c6a",
	                "displayName": "John Doe10",
	                "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a"
	            },
	            "provider": {
	                "id": "http://www.ibm.com/xmlns/prod/sn",
	                "displayName": "IBM Connections - News Service",
	                "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/news"
	            },
	            "generator": {
	                "image": {
	                    "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/resources/web/com.ibm.oneui3.styles/imageLibrary/Icons/ComponentsGray/ProfilesGray16.png?etag=20130306.234007"
	                },
	                "id": "profiles",
	                "displayName": "IBM Connections - Profiles",
	                "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles"
	            },
	            "actor": {
	                "connections": {
	                    "state": "active"
	                },
	                "objectType": "person",
	                "id": "urn:lsid:lconn.ibm.com:profiles.person:5172b2c0-7547-102f-9f51-f6be80987c6a",
	                "displayName": "John Doe10"
	            },
	            "connections": {
	                "broadcast": "true",
	                "rollupid": "urn:lsid:lconn.ibm.com:profiles.note:e407b54e-e636-451d-a2b9-a14ac39aeac5",
	                "isPublic": "true",
	                "saved": "false",
	                "rollupUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@public/@all/@all?&filterBy=object&filterOp=equals&filterValue=e407b54e-e636-451d-a2b9-a14ac39aeac5",
	                "shortTitle": "<span class=\"vcard\"><a class=\"fn url\" title=\"Open the profile of John Doe10.\" href=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"><span class=\"photo\" src=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" role=\"presentation\" style=\"display : none\"></span>John Doe10</a><span class=\"x-lconn-userid\" style=\"display : none\">5172b2c0-7547-102f-9f51-f6be80987c6a</span></span> posted a status update.",
	                "containerId": "712a8727-b49c-40ee-bbfb-65fe261fd47a",
	                "containerName": "John Doe10",
	                "plainTitle": "John Doe10 blooh",
	                "atomUrl": "/rest/ublog/@all/@all/e407b54e-e636-451d-a2b9-a14ac39aeac5?format=atom",
	                "followedResource": "true",
	                "likeService": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/ublog/@all/@all/urn:lsid:lconn.ibm.com:profiles.note:e407b54e-e636-451d-a2b9-a14ac39aeac5/likes"
	            },
	            "openSocial": {
	                "embed": {
	                    "gadget": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/resources/web/com.ibm.social.ee/ConnectionsEE.xml",
	                    "context": {
	                        "isPublic": "true",
	                        "eventType": "profiles.status.updated",
	                        "eventId": "urn:lsid:lconn.ibm.com:profiles.story:b98c69b1-d54a-4ac1-824f-a30d86a6ca94",
	                        "actor": {
	                            "connections": {
	                                "state": "active"
	                            },
	                            "objectType": "person",
	                            "id": "urn:lsid:lconn.ibm.com:profiles.person:5172b2c0-7547-102f-9f51-f6be80987c6a",
	                            "displayName": "John Doe10"
	                        },
	                        "iconUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/resources/web/com.ibm.oneui3.styles/imageLibrary/Icons/ComponentsGray/ProfilesGray16.png?etag=20130306.234007",
	                        "numLikes": "0",
	                        "summary": "blooh",
	                        "rollupUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@public/@all/@all?&filterBy=object&filterOp=equals&filterValue=e407b54e-e636-451d-a2b9-a14ac39aeac5",
	                        "openSocial": {
	                            "connections": {
	                                "generator": {
	                                    "image": {
	                                        "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/resources/web/com.ibm.oneui3.styles/imageLibrary/Icons/ComponentsGray/ProfilesGray16.png?etag=20130306.234007"
	                                    },
	                                    "id": "profiles",
	                                    "displayName": "IBM Connections - Profiles",
	                                    "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles"
	                                },
	                                "rollupUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@public/@all/@all?&filterBy=object&filterOp=equals&filterValue=e407b54e-e636-451d-a2b9-a14ac39aeac5"
	                            }
	                        },
	                        "title": "John Doe10",
	                        "tags": [],
	                        "numComments": "0",
	                        "updated": "false",
	                        "id": "urn:lsid:lconn.ibm.com:profiles.note:e407b54e-e636-451d-a2b9-a14ac39aeac5",
	                        "connectionsContentUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/ublog/@all/@all/e407b54e-e636-451d-a2b9-a14ac39aeac5?format=atom",
	                        "containerid": "712a8727-b49c-40ee-bbfb-65fe261fd47a",
	                        "itemUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryId=e407b54e-e636-451d-a2b9-a14ac39aeac5",
	                        "eventTitle": "<span class=\"vcard\"><a class=\"fn url\" title=\"Open the profile of John Doe10.\" href=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"><span class=\"photo\" src=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" role=\"presentation\" style=\"display : none\"></span>John Doe10</a><span class=\"x-lconn-userid\" style=\"display : none\">5172b2c0-7547-102f-9f51-f6be80987c6a</span></span> <span>blooh</span>",
	                        "published": "2013-03-14T17:26:48.448Z"
	                    }
	                }
	            },
	            "title": "<span class=\"vcard\"><a class=\"fn url\" title=\"Open the profile of John Doe10.\" href=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"><span class=\"photo\" src=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" role=\"presentation\" style=\"display : none\"></span>John Doe10</a><span class=\"x-lconn-userid\" style=\"display : none\">5172b2c0-7547-102f-9f51-f6be80987c6a</span></span> <span>blooh</span>",
	            "id": "urn:lsid:lconn.ibm.com:profiles.story:b98c69b1-d54a-4ac1-824f-a30d86a6ca94",
	            "updated": "2013-03-14T17:26:48.475Z",
	            "object": {
	                "summary": "blooh",
	                "replies": {
	                    "totalItems": 0
	                },
	                "objectType": "note",
	                "author": {
	                    "connections": {
	                        "state": "active"
	                    },
	                    "objectType": "person",
	                    "id": "urn:lsid:lconn.ibm.com:profiles.person:5172b2c0-7547-102f-9f51-f6be80987c6a",
	                    "displayName": "John Doe10"
	                },
	                "id": "urn:lsid:lconn.ibm.com:profiles.note:e407b54e-e636-451d-a2b9-a14ac39aeac5",
	                "likes": {
	                    "totalItems": 0
	                },
	                "displayName": "John Doe10",
	                "published": "2013-03-14T17:26:48.448Z",
	                "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryId=e407b54e-e636-451d-a2b9-a14ac39aeac5"
	            },
	            "verb": "post"
	        },
	        {
	            "published": "2013-03-14T17:17:44.717Z",
	            "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@me/@all/@all/urn:lsid:lconn.ibm.com:profiles.story:bf4b5c44-5270-46ec-9700-4b0dc04230de",
	            "target": {
	                "connections": {
	                    "state": "active"
	                },
	                "objectType": "person",
	                "id": "urn:lsid:lconn.ibm.com:profiles.person:5172b2c0-7547-102f-9f51-f6be80987c6a",
	                "displayName": "John Doe10",
	                "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a"
	            },
	            "provider": {
	                "id": "http://www.ibm.com/xmlns/prod/sn",
	                "displayName": "IBM Connections - News Service",
	                "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/news"
	            },
	            "generator": {
	                "image": {
	                    "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/resources/web/com.ibm.oneui3.styles/imageLibrary/Icons/ComponentsGray/ProfilesGray16.png?etag=20130306.234007"
	                },
	                "id": "profiles",
	                "displayName": "IBM Connections - Profiles",
	                "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles"
	            },
	            "actor": {
	                "connections": {
	                    "state": "active"
	                },
	                "objectType": "person",
	                "id": "urn:lsid:lconn.ibm.com:profiles.person:5172b2c0-7547-102f-9f51-f6be80987c6a",
	                "displayName": "John Doe10"
	            },
	            "connections": {
	                "broadcast": "true",
	                "rollupid": "urn:lsid:lconn.ibm.com:profiles.note:eab7846d-417c-4cd0-8826-7f188a9c5622",
	                "isPublic": "true",
	                "saved": "false",
	                "rollupUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@public/@all/@all?&filterBy=object&filterOp=equals&filterValue=eab7846d-417c-4cd0-8826-7f188a9c5622",
	                "shortTitle": "<span class=\"vcard\"><a class=\"fn url\" title=\"Open the profile of John Doe10.\" href=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"><span class=\"photo\" src=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" role=\"presentation\" style=\"display : none\"></span>John Doe10</a><span class=\"x-lconn-userid\" style=\"display : none\">5172b2c0-7547-102f-9f51-f6be80987c6a</span></span> posted a status update.",
	                "containerId": "712a8727-b49c-40ee-bbfb-65fe261fd47a",
	                "containerName": "John Doe10",
	                "plainTitle": "John Doe10 blah",
	                "atomUrl": "/rest/ublog/@all/@all/eab7846d-417c-4cd0-8826-7f188a9c5622?format=atom",
	                "followedResource": "true",
	                "likeService": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/ublog/@all/@all/urn:lsid:lconn.ibm.com:profiles.note:eab7846d-417c-4cd0-8826-7f188a9c5622/likes"
	            },
	            "openSocial": {
	                "embed": {
	                    "gadget": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/resources/web/com.ibm.social.ee/ConnectionsEE.xml",
	                    "context": {
	                        "isPublic": "true",
	                        "eventType": "profiles.status.updated",
	                        "eventId": "urn:lsid:lconn.ibm.com:profiles.story:bf4b5c44-5270-46ec-9700-4b0dc04230de",
	                        "actor": {
	                            "connections": {
	                                "state": "active"
	                            },
	                            "objectType": "person",
	                            "id": "urn:lsid:lconn.ibm.com:profiles.person:5172b2c0-7547-102f-9f51-f6be80987c6a",
	                            "displayName": "John Doe10"
	                        },
	                        "iconUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/resources/web/com.ibm.oneui3.styles/imageLibrary/Icons/ComponentsGray/ProfilesGray16.png?etag=20130306.234007",
	                        "numLikes": "0",
	                        "summary": "blah",
	                        "rollupUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@public/@all/@all?&filterBy=object&filterOp=equals&filterValue=eab7846d-417c-4cd0-8826-7f188a9c5622",
	                        "openSocial": {
	                            "connections": {
	                                "generator": {
	                                    "image": {
	                                        "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/resources/web/com.ibm.oneui3.styles/imageLibrary/Icons/ComponentsGray/ProfilesGray16.png?etag=20130306.234007"
	                                    },
	                                    "id": "profiles",
	                                    "displayName": "IBM Connections - Profiles",
	                                    "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles"
	                                },
	                                "rollupUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/activitystreams/@public/@all/@all?&filterBy=object&filterOp=equals&filterValue=eab7846d-417c-4cd0-8826-7f188a9c5622"
	                            }
	                        },
	                        "title": "John Doe10",
	                        "tags": [],
	                        "numComments": "0",
	                        "updated": "false",
	                        "id": "urn:lsid:lconn.ibm.com:profiles.note:eab7846d-417c-4cd0-8826-7f188a9c5622",
	                        "connectionsContentUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/connections/opensocial/rest/ublog/@all/@all/eab7846d-417c-4cd0-8826-7f188a9c5622?format=atom",
	                        "containerid": "712a8727-b49c-40ee-bbfb-65fe261fd47a",
	                        "itemUrl": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryId=eab7846d-417c-4cd0-8826-7f188a9c5622",
	                        "eventTitle": "<span class=\"vcard\"><a class=\"fn url\" title=\"Open the profile of John Doe10.\" href=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"><span class=\"photo\" src=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" role=\"presentation\" style=\"display : none\"></span>John Doe10</a><span class=\"x-lconn-userid\" style=\"display : none\">5172b2c0-7547-102f-9f51-f6be80987c6a</span></span> <span>blah</span>",
	                        "published": "2013-03-14T17:17:44.717Z"
	                    }
	                }
	            },
	            "title": "<span class=\"vcard\"><a class=\"fn url\" title=\"Open the profile of John Doe10.\" href=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\"><span class=\"photo\" src=\"https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/photo.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a\" role=\"presentation\" style=\"display : none\"></span>John Doe10</a><span class=\"x-lconn-userid\" style=\"display : none\">5172b2c0-7547-102f-9f51-f6be80987c6a</span></span> <span>blah</span>",
	            "id": "urn:lsid:lconn.ibm.com:profiles.story:bf4b5c44-5270-46ec-9700-4b0dc04230de",
	            "updated": "2013-03-14T17:17:44.797Z",
	            "object": {
	                "summary": "blah",
	                "replies": {
	                    "totalItems": 0
	                },
	                "objectType": "note",
	                "author": {
	                    "connections": {
	                        "state": "active"
	                    },
	                    "objectType": "person",
	                    "id": "urn:lsid:lconn.ibm.com:profiles.person:5172b2c0-7547-102f-9f51-f6be80987c6a",
	                    "displayName": "John Doe10"
	                },
	                "id": "urn:lsid:lconn.ibm.com:profiles.note:eab7846d-417c-4cd0-8826-7f188a9c5622",
	                "likes": {
	                    "totalItems": 0
	                },
	                "displayName": "John Doe10",
	                "published": "2013-03-14T17:17:44.717Z",
	                "url": "https://dubxpcvm799.mul.ie.ibm.com:9445/profiles/html/profileView.do?userid=5172b2c0-7547-102f-9f51-f6be80987c6a&entryId=eab7846d-417c-4cd0-8826-7f188a9c5622"
	            },
	            "verb": "post"
	        }
	    ],
	    "updatedSince": true
	}