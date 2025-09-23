/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/array",
      "dojo/_base/lang",
      "dojox/uuid/generateRandomUuid",
      "ic-ui/layout/track",
      "ic-ui/layout/track/communityfiles"
], function(array, lang, generateRandomUuid, coreTracker, tracker) {

   describe("the communityfiles tracker", function() {
      var METHODS = [ 'read'
      ], APP = {
         getAuthenticatedUserId : function() {
            return generateRandomUuid();
         },
         routes : {
            getCollectionUrl : function(id) {
               return id;
            },
            getFileSummaryUrl : function(ignore, id) {
               return id;
            },
            getListUrl : function() {
               return 'http://www.example.com';
            }
         }
      }, FILE = {
         getId : function() {
            return generateRandomUuid();
         },
         getTitle : function() {
            return 'title';
         },
         getAuthor : function() {
            return {
               id : generateRandomUuid()
            };
         },
         getSystemCreated : function() {
            return new Date();
         },
         getLibraryId : function() {
            return generateRandomUuid();
         }
      }, SCENE = {
         app : APP
      }, COMMUNITY_FILESUMMARY = lang.mixin(lang.clone(SCENE), {
         fileId : generateRandomUuid(),
         document : FILE,
         sceneInfo : {
            id : "lconn.files.comm.scenes.owned.CommunityFileSummary"
         }
      }), COMMUNITY_COLLECTIONSUMMARY = lang.mixin(lang.clone(SCENE), {
         collection : {
            getId : function() {
               return generateRandomUuid();
            },
            getName : function() {
               return 'foo';
            },
            getAuthor : function() {
               return {
                  id : generateRandomUuid()
               };
            },
            getSystemCreated : function() {
               return new Date();
            }
         },
         sceneInfo : {
            id : "lconn.files.comm.scenes.owned.CommunityCollectionSummary"
         }
      }), COMMUNITY_FILEPREVIEW = lang.mixin(lang.clone(SCENE), {
         fileId : generateRandomUuid(),
         document : FILE,
         sceneInfo : {
            id : "lconn.files.scenes.FilePreview"
         }
      }), SCENE_WITH_DEFAULT_TRACKER = lang.mixin(lang.clone(SCENE), {
         sceneInfo : {
            id : "lconn.files.scene.with.default.tracker"
         }
      });
      beforeEach(function() {
         spyOn(coreTracker, 'read');
      });
      it("implements the expected methods", function() {
         array.forEach(METHODS, function(method) {
            expect(tracker[method]).toEqual(jasmine.any(Function));
         });
      });
      it("the read method doesn't throw with no arguments", function() {
         expect(function() {
            tracker.read();
         }).toThrow();
      });
      it("the read method works as expected with the FileSummary scene", function() {
         tracker.read(COMMUNITY_FILESUMMARY);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('FILES');
      });
      it("the read method works as expected with the CollectionSummary scene", function() {
         tracker.read(COMMUNITY_COLLECTIONSUMMARY);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('FILES');
      });
      it("the read method works as expected with the FilePreview scene", function() {
         tracker.read(COMMUNITY_FILEPREVIEW);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('FILES');
      });
      it("the read method works as expected with any other scene", function() {
         tracker.read(SCENE_WITH_DEFAULT_TRACKER);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('FILES');
      });
   });
});
