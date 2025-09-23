/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.jasmine.controls.FeedsSpec");

dojo.require("com.ibm.oneui.controls.Feeds");

(function(Feeds) {

   /**
    * Feeds widget Jasmine spec
    * 
    * @module com.ibm.oneui.test.jasmine.controls.FeedsSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the com.ibm.oneui.controls.Feeds widget", function() {
      var feeds;
      beforeEach(function() {
         feeds = new Feeds();
      });
      afterEach(function() {
         if (feeds) {
            feeds.destroy();
         }
      });
      it("implements the expected properties", function() {
         expect(feeds.items).not.toBeUndefined();
      });
      it("implements the expected methods", function() {
         expect(feeds.decorate).toEqual(jasmine.any(Function));
      });
   });

}(com.ibm.oneui.controls.Feeds));
