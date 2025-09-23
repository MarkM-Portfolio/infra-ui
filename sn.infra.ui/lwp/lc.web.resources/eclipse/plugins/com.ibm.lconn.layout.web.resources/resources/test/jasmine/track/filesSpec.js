/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("com.ibm.lconn.layout.test.jasmine.track.filesSpec");

dojo.require("com.ibm.lconn.layout.track.files");
dojo.require("com.ibm.lconn.layout.track");
dojo.require("dojox.uuid.generateRandomUuid");

(function(tracker, coreTracker, array, lang, generateRandomUuid) {
   describe("the files tracker", function() {
      var METHODS = [ 'read'
      ]/*, APP = {
         getAuthenticatedUserId : function() {
            return generateRandomUuid();
         },
         routes : {
            getUserChannelUrl : function(id) {
               return id;
            },
            getFileSummaryUrl : function(libraryId, fileId) {
               return fileId;
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
         getLibraryAuthor : function() {
            return {
               name : 'Andreas Berzat'
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
      }, FILESUMMARY = lang.mixin(lang.clone(SCENE), {
         fileId : generateRandomUuid(),
         document : FILE,
         sceneInfo : {
            id : "lconn.files.scenes.FileSummary"
         }
      }), COLLECTIONSUMMARY = lang.mixin(lang.clone(SCENE), {
         collection : {
            getId : function() {
               return generateRandomUuid()
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
            id : "lconn.files.scenes.CollectionSummary"
         }
      }), USERCHANNEL = lang.mixin(lang.clone(SCENE), {
         library : {
            getId : function() {
               return generateRandomUuid();
            },
            getOwner : function() {
               return {
                  name : 'Andreas Berzat'
               };
            }
         },
         sceneInfo : {
            id : "lconn.files.scenes.UserChannel"
         }
      }), SCENE_WITH_DEFAULT_TRACKER = lang.mixin(lang.clone(SCENE), {
         sceneInfo : {
            id : "lconn.files.scene.with.default.tracker"
         }
      })*/;
      it("implements the expected methods", function() {
         array.forEach(METHODS, function(method) {
            expect(tracker[method]).toEqual(jasmine.any(Function));
         });
      });
      // FIXME: the communityfiles tracker overrides the files tracker's read
      // method. They cannot coexist in a page
//      it("the read method works as expected", function() {
//         expect(function() {
//            tracker.read();
//         }).toThrow();
//
//         spyOn(coreTracker, 'read');
//
//         tracker.read(FILESUMMARY);
//         expect(coreTracker.read).toHaveBeenCalled();
//         var args = coreTracker.read.calls.argsFor(0);
//         expect(args[2].source).toBe('FILES');
//
//         tracker.read(COLLECTIONSUMMARY);
//         expect(coreTracker.read).toHaveBeenCalled();
//         args = coreTracker.read.calls.argsFor(0);
//         expect(args[2].source).toBe('FILES');
//
//         tracker.read(USERCHANNEL);
//         expect(coreTracker.read).toHaveBeenCalled();
//         args = coreTracker.read.calls.argsFor(0);
//         expect(args[2].source).toBe('FILES');
//
//         tracker.read(SCENE_WITH_DEFAULT_TRACKER);
//         expect(coreTracker.read).toHaveBeenCalled();
//         args = coreTracker.read.calls.argsFor(0);
//         expect(args[2].source).toBe('FILES');
//      });
   });

}(com.ibm.lconn.layout.track.files, com.ibm.lconn.layout.track, dojo, dojo, dojox.uuid.generateRandomUuid));
