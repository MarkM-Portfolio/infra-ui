/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.widget.palette.dataStoreBuilderSpec");

// TODO: rename to lconn.core.widget.palette.dataStoreBuilder
dojo.require("lconn.core.paletteOneUI.PaletteDataStoreBuilder");

(function(builder) {
   var JSON = "{\"categories\":[{\"id\":\"0\",\"name\":\"Activities\",\"css\":\"http://xyz.com/activitiesLogo.png\",\"widgets\":[{\"id\":\"1\",\"name\":\"Todos widget\",\"desc\":\"Display todos\",\"xmlDefUrl\":\"http://xyz.com/activities_todos.xml\",\"previewImgUrl\":\"http://xyz.com/todosWidgetSnapshot.png\",\"widgetType\":\"primary\"},{\"id\":\"2\",\"name\":\"Calendar widget\",\"desc\":\"Display calendar\",\"xmlDefUrl\":\"http://xyz.com/activities_calendar.xml\",\"previewImgUrl\":\"http://xyz.com/calendarWidgetSnapshot.png\",\"widgetType\":\"primary\"}]}]}", JSON_FILE = "../paletteOneUI/widgetJSON.txt", JSON_FILE_MALFORMED = "./widget/palette/malformed.json";
   var b;

   describe('the palette data store builder using a JSON object', function() {
      beforeEach(function() {
         b = new builder();
      });
      it('fetches widget items from the store', function(done) {
         var deferred = b.buildDataStore(JSON);
         deferred.addCallback(function(store) {
            function callback(items, request) {
               expect(items.length).toEqual(2);
               expect(store.getLabel(items[0])).toEqual("Todos widget");
               expect(store.getLabel(items[1])).toEqual("Calendar widget");

               done();
            }

            function error(e) {
               console.log("errback called while fetching widgets items");
               console.log(e);

               done();
            }

            store.fetch({
               query : {
                  type : "widget"
               },
               queryOptions : {
                  ignoreCase : true
               },
               onComplete : callback,
               onError : error
            });
         });
      });

      it('fetches widget categories from the store and associated widget items', function(done) {
         var deferred = b.buildDataStore(JSON);
         deferred.addCallback(function(store) {
            function callback(items, request) {
               expect(items.length).toEqual(1);
               expect(store.getLabel(items[0])).toEqual("Activities");

               expect(items[0].children.length).toEqual(2);
               expect(store.getLabel(items[0].children[0])).toEqual("Todos widget");
               expect(store.getLabel(items[0].children[1])).toEqual("Calendar widget");

               done();
            }

            function error(e) {
               console.log("errback called while fetching widgets items");
               console.log(e);

               done();
            }

            store.fetch({
               query : {
                  type : "widgetCategory"
               },
               queryOptions : {
                  ignoreCase : true
               },
               onComplete : callback,
               onError : error
            });
         });
      });

      it('invokes the errback when the JSON is null', function(done) {
         var deferred = b.buildDataStore(null);
         deferred.addBoth(function(store) {
            expect(true).toBeFalsy();
            done();
         }, function(store) {
            expect(true).toBeTruthy();
            done();
         });
      });

      it('invokes the errback when the JSON is malformed', function(done) {
         var deferred = b.buildDataStore("a=b");
         deferred.addBoth(function(store) {
            expect(true).toBeFalsy();
            done();
         }, function(store) {
            expect(true).toBeTruthy();
            done();
         });
      });
   });

   describe('the palette data store builder fetching JSON with XHR', function() {
      beforeEach(function() {
         b = new builder();
      });
      it('fetches widget items from the store', function(done) {
         var deferred = b.buildDataStore(JSON_FILE, true);
         deferred.addCallback(function(store) {
            function callback(items, request) {
               expect(items.length).toEqual(2);
               expect(store.getLabel(items[0])).toEqual("Activities");

               expect(items[0].children.length).toEqual(2);
               expect(store.getLabel(items[0].children[0])).toEqual("Todos widget");
               expect(store.getLabel(items[0].children[1])).toEqual("Calendar widget");

               expect(store.getLabel(items[1])).toEqual("Profiles");

               expect(items[1].children.length).toEqual(2);
               expect(store.getLabel(items[1].children[0])).toEqual("My Profile");
               expect(store.getLabel(items[1].children[1])).toEqual("My colleagues");

               done();
            }

            function error(e) {
               console.log("errback called while fetching widgets items");
               console.log(e);

               done();
            }

            store.fetch({
               query : {
                  type : "widgetCategory"
               },
               queryOptions : {
                  ignoreCase : true
               },
               onComplete : callback,
               onError : error
            });
         });
      });

      it('fetches widget categories from the store and associated widget items', function(done) {
         var deferred = b.buildDataStore(JSON_FILE, true);
         deferred.addCallback(function(store) {
            function callback(items, request) {
               expect(items.length).toEqual(4);
               expect(store.getLabel(items[0])).toEqual("Todos widget");
               expect(store.getLabel(items[1])).toEqual("Calendar widget");
               expect(store.getLabel(items[2])).toEqual("My Profile");
               expect(store.getLabel(items[3])).toEqual("My colleagues");

               done();
            }

            function error(e) {
               console.log("errback called while fetching widgets items");
               console.log(e);

               done();
            }

            store.fetch({
               query : {
                  type : "widget"
               },
               queryOptions : {
                  ignoreCase : true
               },
               onComplete : callback,
               onError : error
            });
         });
      });

      it('invokes the errback when the JSON is null', function(done) {
         var deferred = b.buildDataStore(null, true);
         deferred.addCallbacks(function(store) {
            expect(true).toBeFalsy();
            done();
         }, function(store) {
            expect(true).toBeTruthy();
            done();
         });
      });

      it('invokes the errback when the JSON is malformed', function(done) {
         var deferred = b.buildDataStore(JSON_FILE_MALFORMED, true);
         deferred.addCallbacks(function(store) {
            expect(true).toBeFalsy();
            done();
         }, function(store) {
            expect(true).toBeTruthy();
            done();
         });
      });
   });
}(lconn.core.paletteOneUI.PaletteDataStoreBuilder));
