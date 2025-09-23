/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("com.ibm.lconn.layout.test.jasmine.track.mediagallerySpec");

dojo.require("com.ibm.lconn.layout.track.mediagallery");
dojo.require("com.ibm.lconn.layout.track");
dojo.require("dojox.uuid.generateRandomUuid");
dojo.require("dojox.lang.functional.object");

(function(tracker, coreTracker, array, lang, generateRandomUuid, topic, df) {
   function exclUuid(times) {
      var i, s = generateRandomUuid();
      for (i = 1; i < times; i++) {
         s += '!' + generateRandomUuid();
      }
      return s;
   }
   describe("the mediagallery tracker",
      function() {
         var METHODS = [ 'read'
         ], DATA = {
            getId : function() {
               return exclUuid(2);
            },
            getTitle : function() {
               return 'title';
            },
            getAuthor : function() {
               return {
                  id : generateRandomUuid()
               };
            },
            getCreationDate : function() {
               return new Date();
            }
         }, SUMMARY_DATA = lang.mixin(lang.clone(DATA), {}), PREVIEW_DATA = lang.mixin(lang.clone(DATA), {}), LIBRARY_DATA = lang.mixin(lang.clone(DATA), {}), IW = {
            getAuthenticatedUser : function() {
               return generateRandomUuid();
            },
            getWidgetName : function() {
               return 'MediaGallery_1';
            },
            df : {
               getRepositoryId : function() {
                  return exclUuid(3);
               }
            }
         }, FAKE_IW = {
            getWidgetName : function() {
               return 'fake';
            }
         };
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
         it("the read method works as expected with the Summary view", function() {
            tracker.read('Summary', SUMMARY_DATA, IW);
            expect(coreTracker.read).toHaveBeenCalled();
            var args = coreTracker.read.calls.argsFor(0);
            expect(args[2].source).toBe('MEDIAGALLERY');
         });
         it("the read method works as expected with the Summary view - fake iwidget", function() {
            tracker.read('Summary', SUMMARY_DATA, FAKE_IW);
            expect(coreTracker.read).not.toHaveBeenCalled();
         });
         it("the read method works as expected with the Preview view", function() {
            tracker.read('Preview', PREVIEW_DATA, IW);
            expect(coreTracker.read).toHaveBeenCalled();
            var args = coreTracker.read.calls.argsFor(0);
            expect(args[2].source).toBe('MEDIAGALLERY');
         });
         it("the read method works as expected with the Library view", function() {
            tracker.read('Library', LIBRARY_DATA, IW);
            expect(coreTracker.read).toHaveBeenCalled();
            var args = coreTracker.read.calls.argsFor(0);
            expect(args[2].source).toBe('MEDIAGALLERY');
         });
         var TOPICS = {
            'quickr.lw.scenes.AbstractDocumentSummary.setSceneData' : SUMMARY_DATA,
            'quickr.lw.action.MGPreview.renderMediaPreview' : PREVIEW_DATA,
            'quickr.lw.scenes.AbstractDocMain.onRequestsCompleted' : LIBRARY_DATA
         };
         df.forIn(TOPICS, function(doc, name) {
            it("the read method is invoked when a topic '" + name + "' is published", function() {
               // FIXME: this is required to cope with the different expected
               // structure
               doc.doc = doc;
               topic.publish(name, [
                     doc,
                     IW
               ]);
               expect(coreTracker.read).toHaveBeenCalled();
               var args = coreTracker.read.calls.argsFor(0);
               expect(args[2].source).toBe('MEDIAGALLERY');
            });
         });
      });

}(com.ibm.lconn.layout.track.mediagallery, com.ibm.lconn.layout.track, dojo, dojo, dojox.uuid.generateRandomUuid, dojo, dojox.lang.functional));
