/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.core.featuresSpec");

dojo.require("lconn.core.config.features");

(function(features) {
   describe("lconn.core.config.features", function() {
      beforeEach(function () {
         this.gatekeeperConfig = window.gatekeeperConfig;

         window.gatekeeperConfig = {
            featureA: true,
            featureB: false
         };
      });

      afterEach(function () {
         window.gatekeeperConfig = this.gatekeeperConfig;
      });

      it("should return truthy if a feature is on", function() {
         expect(features("featureA")).toBeTruthy();
      });

      it("should return falsy if a feature is off", function() {
         expect(features("featureB")).toBeFalsy();
      });

      it("should return falsy if a feature does not exist", function() {
         expect(features("featureC")).toBeFalsy();
      });
      
      it("should define add() in case existing consumers expect it to exist", function () {
         expect(features.add).not.toThrow();
      })
   });
}(lconn.core.config.features));
