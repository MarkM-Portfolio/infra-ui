/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.typeahead.TypeAheadManagerSpec");

dojo.require("lconn.core.typeahead.TypeAheadManager");

(function(TypeAheadManager) {

   describe("the widget lconn.core.typeahead.TypeAheadManager", function() {
      var manager;
      beforeEach(function() {
         var promise = {
            then : function() {
               return;
            },
            otherwhise : function() {
               return;
            }
         };
         var input = document.createElement("input");
         document.createElement("div").appendChild(input);
         manager = new TypeAheadManager({
            TAtextField : input,
            TAservicesList : [ {
               id : "serviceID",
               setTimeout : function() {
                  console.log("timeout set");
               },
               setPageSize : function() {
                  console.log("page size set");
               },
               executeQuery : function() {
                  console.log("execute query called");
                  return promise;
               }
            }
            ]
         });
         manager.startup();
      });
      describe("the interface ", function() {
         it("implements the expected methods", function() {
            expect(manager.typeAheadCallback).toEqual(jasmine.any(Function));
            expect(manager.runQuery).toEqual(jasmine.any(Function));
            expect(manager.setTypeaheadResults).toEqual(jasmine.any(Function));
            expect(manager.showTypeaheadResults).toEqual(jasmine.any(Function));
            expect(manager.onFieldBlur).toEqual(jasmine.any(Function));
            expect(manager.onFieldFocus).toEqual(jasmine.any(Function));
            expect(manager.TAupdateCurrentScope).toEqual(jasmine.any(Function));
            expect(manager.TAisPlaceholderActive).toEqual(jasmine.any(Function));
            expect(manager.search).toEqual(jasmine.any(Function));
         });
      });
      describe("the typeAheadCallback method", function() {
         it("calls resultDropDown.closeResults pressing escape key", function() {
            var event;
            if (document.createEvent) {
               event = document.createEvent("Events");
               event.initEvent("keypress", true, true);
            }
            else {
               event = document.createEventObject();
            }
            event.keyCode = event.which = 27; /* Escape key */
            spyOn(manager.resultDropDown, "closeResults");
            manager.typeAheadCallback(event);
            expect(manager.resultDropDown.closeResults).toHaveBeenCalled();
         });
         it("calls resultDropDown.executeSelectedAction pressing enter key", function() {
            var event;
            if (document.createEvent) {
               event = document.createEvent("Events");
               event.initEvent("keypress", true, true);
            }
            else {
               event = document.createEventObject();
            }
            event.keyCode = event.which = 13; /* Enter key */
            spyOn(manager.resultDropDown, "executeSelectedAction");
            manager.typeAheadCallback(event);
            expect(manager.resultDropDown.executeSelectedAction).toHaveBeenCalled();
         });
         it("calls resultDropDown.selectPreviousElement pressing arrow up key", function() {
            var event;
            if (document.createEvent) {
               event = document.createEvent("Events");
               event.initEvent("keypress", true, true);
            }
            else {
               event = document.createEventObject();
            }
            event.keyCode = event.which = 38; /* Arrow up key */
            spyOn(manager.resultDropDown, "selectPreviousElement");
            manager.typeAheadCallback(event);
            expect(manager.resultDropDown.selectPreviousElement).toHaveBeenCalled();
         });
         it("calls resultDropDown.selectNextElement pressing arrow down key", function() {
            var event;
            if (document.createEvent) {
               event = document.createEvent("Events");
               event.initEvent("keypress", true, true);
            }
            else {
               event = document.createEventObject();
            }
            event.keyCode = event.which = 40; /* Arrow down key */
            spyOn(manager.resultDropDown, "selectNextElement");
            manager.typeAheadCallback(event);
            expect(manager.resultDropDown.selectNextElement).toHaveBeenCalled();
         });
         it("calls resultDropDown.runQuery pressing any other key", function() {
            var event;
            if (document.createEvent) {
               event = document.createEvent("Events");
               event.initEvent("keypress", true, true);
            }
            else {
               event = document.createEventObject();
            }
            event.keyCode = event.which = 65; /* a key */
            spyOn(manager, "runQuery");
            manager.typeAheadCallback(event);
            expect(manager.runQuery).toHaveBeenCalled();
         });
      });
      describe("the runQuery method", function() {
         beforeEach(function() {
            jasmine.clock().install();
            var scope = document.createElement("div");
            scope.innerHTML = "testScope";
            manager.TAscopeLabelNode = scope;
         });
         afterEach(function() {
            jasmine.clock().uninstall();
         });
         it("calls the resultDropDown.setQueryString method", function() {
            spyOn(manager.resultDropDown, "setQueryString");
            spyOn(manager.TAservicesList[0], "executeQuery").and.callThrough();
            manager.TAtextField.value = "test";
            manager.runQuery();
            jasmine.clock().tick(manager._queryTimeout + 1);
            expect(manager.resultDropDown.setQueryString).toHaveBeenCalledWith("test", "testScope");
            expect(manager.TAservicesList[0].executeQuery).toHaveBeenCalledWith("test");
         });
      });
      describe("the setTypeaheadResults method", function() {
         it("calls resultDropDown.setResults method", function() {
            spyOn(manager.resultDropDown, "setResults");
            manager.setTypeaheadResults("serviceID", {});
            expect(manager.resultDropDown.setResults).toHaveBeenCalledWith("serviceID", {});
         });
         it("calls resultDropDown.showLogin method if login is required", function() {
            spyOn(manager.resultDropDown, "setResults");
            spyOn(manager.resultDropDown, "showLogin");
            manager.setTypeaheadResults("serviceID", {
               showLogin : true
            });
            expect(manager.resultDropDown.setResults).toHaveBeenCalledWith("serviceID", {
               showLogin : true
            });
            expect(manager.resultDropDown.showLogin).toHaveBeenCalledWith(true);
         });
      });
   });
}(lconn.core.typeahead.TypeAheadManager));
