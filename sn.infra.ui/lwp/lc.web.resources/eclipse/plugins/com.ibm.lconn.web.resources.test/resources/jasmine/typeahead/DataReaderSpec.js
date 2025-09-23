/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.typeahead.DataReaderSpec");

dojo.require("lconn.core.typeahead.DataReader");

(function(DataReader) {

   describe("the widget lconn.core.typeahead.DataReader", function() {
      var datareader;
      beforeEach(function() {
         datareader = new DataReader();
         datareader.startup();
      });
      describe("the interface ", function() {
         it("implements the expected methods", function() {
            expect(datareader.resetLastQuery).toEqual(jasmine.any(Function));
            expect(datareader.executeQuery).toEqual(jasmine.any(Function));
            expect(datareader.getNextPage).toEqual(jasmine.any(Function));
            expect(datareader.abortLastRequest).toEqual(jasmine.any(Function));
            expect(datareader.setPageSize).toEqual(jasmine.any(Function));
         });
      });
      describe("the setPageSize method", function() {
         it("doesn't throw when passing negative or no values", function() {
            expect(function() {
               datareader.setPageSize();
            }).not.toThrow();
            expect(function() {
               datareader.setPageSize(-1);
            }).not.toThrow();
         });
         it("doesn't throw when passing positive or zero values", function() {
            expect(function() {
               datareader.setPageSize(0);
            }).not.toThrow();
            expect(function() {
               datareader.setPageSize(1);
            }).not.toThrow();
         });
      });
      describe("the getNextPage method", function() {
         it("calls the executeQuery method", function() {
            spyOn(datareader, "executeQuery");
            datareader.getNextPage();
            expect(datareader.executeQuery).toHaveBeenCalledWith(null);
         });
         it("increments the lastQuery.page member", function() {
            datareader.getNextPage();
            expect(datareader.lastQuery.page).toBe(2);
         });
      });
      describe("the abortLastRequest method", function() {
         it("calls cancel on the _xhr member if set", function() {
            datareader._xhr = jasmine.createSpyObj("xhr", [ "cancel"
            ]);
            datareader.abortLastRequest();
            expect(datareader._xhr.cancel).toHaveBeenCalled();
         });
         it("calls cancel on the _promise member if set and if _xhr is not set", function() {
            datareader._xhr = null;
            datareader._promise = jasmine.createSpyObj("promise", [ "cancel"
            ]);
            datareader.abortLastRequest();
            expect(datareader._promise.cancel).toHaveBeenCalled();
         });
      });
      describe("the resetLastQuery method", function() {
         it("resets the lastQuery properties", function() {
            datareader.resetLastQuery();
            expect(datareader.lastQuery.query).toBe("");
            expect(datareader.lastQuery.page).toBe(1);
         });
      });
   });
}(lconn.core.typeahead.DataReader));
