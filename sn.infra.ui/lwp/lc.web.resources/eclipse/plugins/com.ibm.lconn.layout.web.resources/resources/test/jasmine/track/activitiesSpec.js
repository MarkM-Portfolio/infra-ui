/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("com.ibm.lconn.layout.test.jasmine.track.activitiesSpec");

dojo.require("com.ibm.lconn.layout.track.activities");
dojo.require("com.ibm.lconn.layout.track");
dojo.require("dojox.uuid.generateRandomUuid");

(function(tracker, coreTracker, array, lang, generateRandomUuid, topic) {
   describe("the activities tracker", function() {
      var METHODS = [
            'read',
            'trackActivitiesApp',
            'connectOASetContext'
      ], INSTANCE = {
         name : {
            type : 'foo',
            foo : 'bar'
         },
         creator : {
            userid : generateRandomUuid()
         },
         created : new Date().getTime(),
         htmlUrl : 'http://www.example.com',
         activityId : generateRandomUuid()
      }, ENTRY = lang.mixin(lang.clone(INSTANCE), {
         type : 'entry'
      }), TODO = lang.mixin(lang.clone(INSTANCE), {
         type : 'todo'
      }), NODE = lang.mixin(lang.clone(INSTANCE), {
         nodes : [ {
            id : generateRandomUuid(),
            name : {
               type : 'foo',
               foo : 'bar'
            },
            creator : {
               userid : generateRandomUuid()
            },
            created : new Date().getTime(),
            htmlUrl : 'http://www.example.com',
            activityviewUrl : 'http://view.example.com',
            activityId : generateRandomUuid()
         }
         ]
      }), ACTIVITY = lang.clone(INSTANCE);
      var _OAGetContext, _OASetContext;
      beforeEach(function() {
         _OAGetContext = lang.getObject("OAGetContext");
         _OASetContext = lang.getObject("OASetContext");
      });
      afterEach(function() {
         lang.setObject("OAGetContext", _OAGetContext);
         lang.setObject("OASetContext", _OASetContext);
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
         expect(function() {
            tracker.read('entry');
         }).toThrow();
         expect(function() {
            tracker.read('node');
         }).toThrow();
         expect(function() {
            tracker.read('activity');
         }).toThrow();
      });

      // Entry
      it("the read method works as expected with an Entry", function() {
         tracker.read('entry', ENTRY);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('ACTIVITIES');
         expect(args[2].extra.contentLink).toBe(ACTIVITY.htmlUrl);
      });

      // Todo
      it("the read method works as expected with a Todo", function() {
         tracker.read('entry', TODO);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('ACTIVITIES');
         expect(args[2].extra.contentLink).toBe(ACTIVITY.htmlUrl);
      });

      // Node
      it("the read method works as expected with a Node", function() {
         tracker.read('node', NODE);
         expect(coreTracker.read).not.toHaveBeenCalled();
      });
      it("the read method works as expected with a Node - activity page and entry in context", function() {
         lang.setObject("OAGetContext", function() {
            return {
               pageId : 'activitypage',
               params : {
                  entry : NODE.nodes[0].id
               }
            };
         });
         tracker.read('node', NODE);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('ACTIVITIES');
         expect(args[2].extra.contentLink).toBe(ACTIVITY.htmlUrl);
      });

      // Activity
      it("the read method works as expected with an Activity", function() {
         tracker.read('activity', ACTIVITY);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('ACTIVITIES');
         expect(args[2].extra.contentLink).toBe(ACTIVITY.activityviewUrl);
      });
      it("the read method works as expected with an Activity - members page", function() {
         lang.setObject("OAGetContext", function() {
            return {
               pageId : 'activitypage_members'
            };
         });
         tracker.read('activity', ACTIVITY);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[0]).toBe(ACTIVITY.id + 'MEMBERSHIP');
         expect(args[1]).toBe('MEMBERSHIP');
         expect(args[2].source).toBe('ACTIVITIES');
         expect(args[2].extra.contentLink).toBe(ACTIVITY.activityviewUrl);
      });
      it("the read method works as expected with an Activity - activity page, entry in context", function() {
         lang.setObject("OAGetContext", function() {
            return {
               pageId : 'activitypage',
               params : {
                  entry : NODE.nodes[0].id
               }
            };
         });
         tracker.read('activity', ACTIVITY);
         expect(coreTracker.read).not.toHaveBeenCalled();
      });

      // Topics
      it("the read method is invoked when a topic 'p_activity' is published", function() {
         topic.publish('p_activity', ACTIVITY);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('ACTIVITIES');
      });
      it("the read method is invoked when a topic 'p_activityNode' is published", function() {
         lang.setObject("OAGetContext", function() {
            return {
               pageId : 'activitypage',
               params : {
                  entry : NODE.nodes[0].id
               }
            };
         });
         topic.publish('p_activityNode', NODE);
         expect(coreTracker.read).toHaveBeenCalled();
         var args = coreTracker.read.calls.argsFor(0);
         expect(args[2].source).toBe('ACTIVITIES');
      });

      it("the method trackActivitiesApp is invoked after OASetContext is invoked", function() {
         spyOn(tracker, 'trackActivitiesApp');
         lang.setObject("OAGetContext", function() {
            return {
               pageId : 'activitypage',
               params : {
                  entry : NODE.nodes[0].id
               }
            };
         });
         var setContext = lang.setObject("OASetContext", function() {
            return;
         });
         tracker.connectOASetContext();
         setContext();
         expect(tracker.trackActivitiesApp).toHaveBeenCalled();
      });

      it("the method trackActivitiesApp calls read() when the value of pageId doesn't start with 'activitypage'", function() {
         spyOn(tracker, 'read');
         lang.setObject("OAGetContext", function() {
            return {
               pageId : '__activitypage__'
            };
         });
         tracker.trackActivitiesApp();
         expect(tracker.read).toHaveBeenCalledWith("activities", "__activitypage__");
         expect(tracker.nodes).toBeNull();
      });
      it("the method trackActivitiesApp does not call read() when the value of pageId starts with 'activitypage'", function() {
         spyOn(tracker, 'read');
         lang.setObject("OAGetContext", function() {
            return {
               pageId : 'activitypage__'
            };
         });
         tracker.trackActivitiesApp();
         expect(tracker.read).not.toHaveBeenCalled();
         expect(tracker.nodes).toBeNull();
      });

      it("overwrites lconn.act.NodeUtil.expandNode to call read() on the node whose id matches the uuid argument", function() {
         spyOn(tracker, 'read');
         var expandNode = lang.setObject("lconn.act.NodeUtil.expandNode", jasmine.createSpy('expandNode'));
         tracker.instrumentExpandNode();
         tracker.nodes = NODE.nodes;
         lang.getObject("lconn.act.NodeUtil.expandNode")(NODE.nodes[0].id, undefined, true, undefined);
         // tracker.read() is called with desired node
         expect(tracker.read).toHaveBeenCalledWith("entry", NODE.nodes[0]);
         // Calls original function with same arguments
         expect(expandNode).toHaveBeenCalledWith(NODE.nodes[0].id, undefined, true, undefined);
      });
   });
}(com.ibm.lconn.layout.track.activities, com.ibm.lconn.layout.track, dojo, dojo, dojox.uuid.generateRandomUuid, dojo));
