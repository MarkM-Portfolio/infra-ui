/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.typeahead.ResultDropDownSpec");

dojo.require("lconn.core.typeahead.ResultDropDown");

(function(ResultDropDown) {

   describe("the widget lconn.core.typeahead.ResultDropDown", function() {
      var dropDown;
      beforeEach(function() {
         dropDown = new ResultDropDown();
         dropDown.startup();
      });
      describe("the interface ", function() {
         it("implements the expected methods", function() {
            expect(dropDown.showResults).toEqual(jasmine.any(Function));
            expect(dropDown.showLogin).toEqual(jasmine.any(Function));
            expect(dropDown.closeResults).toEqual(jasmine.any(Function));
            expect(dropDown.setResults).toEqual(jasmine.any(Function));
            expect(dropDown.addServiceResponse).toEqual(jasmine.any(Function));
            expect(dropDown.selectNextElement).toEqual(jasmine.any(Function));
            expect(dropDown.selectPreviousElement).toEqual(jasmine.any(Function));
            expect(dropDown.executeSelectedAction).toEqual(jasmine.any(Function));
            expect(dropDown.setQueryString).toEqual(jasmine.any(Function));
            expect(dropDown.getString).toEqual(jasmine.any(Function));
            expect(dropDown.onMouseOver).toEqual(jasmine.any(Function));
            expect(dropDown.searchOnScope).toEqual(jasmine.any(Function));
            expect(dropDown.onActiveDescendantChanged).toEqual(jasmine.any(Function));
         });
      });
      describe("the showResults method", function() {
         it("calls dijit.popup.open method", function() {
            spyOn(dijit.popup, "open");
            dropDown.showResults(null, null, false);
            expect(dijit.popup.open).toHaveBeenCalled();
         });
      });
      describe("the addServiceResponse method", function() {
         it("insert a new service", function() {
            spyOn(dropDown._serviceOrder, "push");
            dropDown.addServiceResponse("serviceID");
            expect(dropDown._serviceNodeIndex.serviceID).toEqual(jasmine.any(Object));
            expect(dropDown._serviceOrder.push).toHaveBeenCalledWith("serviceID");
         });
      });
      describe("the setResults method", function() {
         it("set results for a service", function() {
            dropDown.addServiceResponse("serviceID");
            var data = {
               foo : "test",
               bar : true
            };
            dropDown.setResults("serviceID", data);
            expect(dropDown._serviceNodeIndex.serviceID.results).toEqual([]);
            expect(dropDown._serviceNodeIndex.serviceID.response).toEqual(data);
         });
      });
   });
}(lconn.core.typeahead.ResultDropDown));
