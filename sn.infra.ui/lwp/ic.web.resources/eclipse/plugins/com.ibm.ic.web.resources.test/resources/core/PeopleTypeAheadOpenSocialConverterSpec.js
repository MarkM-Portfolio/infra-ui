/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "ic-core/PeopleTypeAheadOpenSocialConverter"
], function (PeopleTypeAheadOpenSocialConverter) {

   describe('the ic-core/PeopleTypeAheadOpenSocialConverter class', function() {
      var converter;
      beforeEach(function(){
         converter = new PeopleTypeAheadOpenSocialConverter();
      });
   
      describe('the interface', function() {
         it('implements the expected methods', function() {
            expect(converter.convertOpenSocialPeopleTypeAheadFeed).toBeDefined();
            expect(converter._createWrapper).toBeDefined();
            expect(converter._convertItem).toBeDefined();
            expect(converter._getEmail).toBeDefined();
         });
      });
   
      describe('the method convertOpenSocialPeopleTypeAheadFeed', function() {
         var osFeed = {
               "startIndex" : 0,
               "totalResults" : 3,
               "connections" : {},
               "filtered" : true,
               "itemsPerPage" : 20,
               "sorted" : true,
               "list" : [
                     {
                        "appData" : {
                           "connections" : {
                              "organizationId" : "urn:lsid:lconn.ibm.com:connections.organization:00000000-0000-0000-0000-000000000000"
                           }
                        },
                        "displayName" : "Akita Dogear",
                        "id" : "urn:lsid:lconn.ibm.com:profiles.person:49e48bc0-0101-102e-8797-f78755f7e0ed"
                     },
                     {
                        "appData" : {
                           "connections" : {
                              "organizationId" : "urn:lsid:lconn.ibm.com:connections.organization:00000000-0000-0000-0000-000000000000"
                           }
                        },
                        "displayName" : "Alex Kordun",
                        "emails" : [ {
                           "type" : "primary",
                           "value" : "akordun@us.ibm.com",
                           "primary" : true
                        } ],
                        "id" : "urn:lsid:lconn.ibm.com:profiles.person:5668e440-0101-102e-8aef-f78755f7e0ed"
                     },
                     {
                        "appData" : {
                           "connections" : {
                              "organizationId" : "urn:lsid:lconn.ibm.com:connections.organization:00000000-0000-0000-0000-000000000000"
                           }
                        },
                        "displayName" : "Amy Jones",
                        "emails" : [ {
                           "type" : "primary",
                           "value" : "ajones@janet.iris.com",
                           "primary" : true
                        } ],
                        "id" : "urn:lsid:lconn.ibm.com:profiles.person:8e5cb1c0-ab47-1032-865f-8c70e77c237a"
                     } ],
               "updatedSince" : true
            };
            var expectedRes = {
               identifier : "member",
               label : "name",
               items : [
                     {
                        member : "",
                        name : "Akita Dogear",
                        type : "0",
                        userid : "49e48bc0-0101-102e-8797-f78755f7e0ed"
                     },
                     {
                        member : "akordun@us.ibm.com",
                        name : "Alex Kordun",
                        type : "0",
                        userid : "5668e440-0101-102e-8aef-f78755f7e0ed"
                     },
                     {
                        member : "ajones@janet.iris.com",
                        name : "Amy Jones",
                        type : "0",
                        userid : "8e5cb1c0-ab47-1032-865f-8c70e77c237a"
                     } ]
            };
         it('converts the OpenSocial feed into a feed the PeopleTypeAhead can consume', function() {
            expect(converter.convertOpenSocialPeopleTypeAheadFeed(osFeed)).toEqual(expectedRes);
         });
      });
   
      describe('the method _createWrapper', function() {
         it('creates a wrapper for the people items', function() {
            expect(converter._createWrapper()).toEqual({identifier: "member", label: "name", items: []});
         });
      });
   
      describe('the method _convertItem', function() {
         var osItem;
         it('creates an individual people item consumable by the PersonTypeAhead', function() {
            osItem = {
                  "appData" : {
                     "connections" : {
                        "organizationId" : "urn:lsid:lconn.ibm.com:connections.organization:00000000-0000-0000-0000-000000000000"
                     }
                  },
                  "displayName" : "Amy Jones",
                  "emails" : [ {
                     "type" : "primary",
                     "value" : "ajones@janet.iris.com",
                     "primary" : true
                  } ],
                  "id" : "urn:lsid:lconn.ibm.com:profiles.person:510b99c0-0101-102e-893f-f78755f7e0ed"
               };
            var expectedResult = {
                  name : "Amy Jones",
                  userid : "510b99c0-0101-102e-893f-f78755f7e0ed",
                  member : "ajones@janet.iris.com",
                  type : "0"
               };
            expect(converter._convertItem(osItem)).toEqual(expectedResult);
         });
      });
   
      describe('the method _getEmail', function() {
         var emails;
         it('returns the primary email', function() {
            emails = [{type: "work", value: "work@ibm.com"}, {type: "primary", value: "primary@ibm.com"}, {type: "home", value:"home@ibm.com"}];
            expect(converter._getEmail(emails)).toBe('primary@ibm.com');
         });
         it('returns the first email in the array when no primary email found', function() {
            emails = [{type: "work", value: "work@ibm.com"}, {type: "home", value:"home@ibm.com"}];
            expect(converter._getEmail(emails)).toBe('work@ibm.com');
         });
      });
   });
});
