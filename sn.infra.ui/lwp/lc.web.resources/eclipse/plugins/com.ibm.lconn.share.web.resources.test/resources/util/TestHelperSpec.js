/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("lconn.share.test.util.TestHelperSpec");
   dojo.require("lconn.share.test.util.TestHelper");
   dojo.require("dojo.cache");
   
   var TestHelper = lconn.share.test.util.TestHelper;
   
   var libraryEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/Library/Entry.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/Library/Entry.xml")
   };
   var libraryFeed = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/Library/Locked_Feed.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/Library/Locked_Feed.xml")
   };
   
   describe("lconn.share.test.util.TestHelper.loadFileContent", function() {
      it("should return a bean only using fileData implying the first (only) entry", function(){
         expect(TestHelper.loadFileContent(libraryEntry)).not.toBeFalsy();
      });
      it("should return a bean using fileData and the first (only) entry", function(){
         expect(TestHelper.loadFileContent(libraryEntry, 0)).not.toBeFalsy();
      });
      it("should return a bean using fileData and the first entry in the feed", function(){
         expect(TestHelper.loadFileContent(libraryFeed, 0)).not.toBeFalsy();
      });
      it("should return a bean using fileData and the second entry in the feed", function(){
         expect(TestHelper.loadFileContent(libraryFeed, 1)).not.toBeFalsy();
      });
      it("should return a bean using fileData and the third (last) entry in the feed", function(){
         expect(TestHelper.loadFileContent(libraryFeed, 2)).not.toBeFalsy();
      });
      it("should return throw an error when fileData is not specified, implying the first entry", function(){
         expect(function() {TestHelper.loadFileContent(null);}).toThrow();
      });
      it("should return throw an error when fileData is not specified, using the first entry", function(){
         expect(function() {TestHelper.loadFileContent(null, 0);}).toThrow();
      });
      it("should return throw an error when using fileData, and using a bad index value (negative)", function(){
         expect(function() {TestHelper.loadFileContent(libraryEntry, -1);}).toThrow();
      });
      it("should return throw an error when using fileData, and using a bad index value (larger than the amount of entries)", function(){
         expect(function() {TestHelper.loadFileContent(libraryEntry, 999);}).toThrow();
      });
   });
   
}());
