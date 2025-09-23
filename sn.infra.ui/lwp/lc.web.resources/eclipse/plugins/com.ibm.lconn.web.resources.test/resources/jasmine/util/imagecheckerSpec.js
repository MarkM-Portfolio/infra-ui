/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.util.imagecheckerSpec");

dojo.require("lconn.core.util.imagechecker");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");

(function(imagechecker) {
   
   function u(path) {
      return lconn.core.url.getServiceUrl(lconn.core.config.services.webresources) + path;
   }
   var GOOD = u('/web/com.ibm.lconn.core.styles.oneui3/images/blank.gif'),
      BAD = 'http://localhost/blank.gif',
      ONE_GOOD_ONE_BAD = [GOOD, BAD],
      TWO_GOOD = [GOOD, GOOD],
      TWO_BAD = [BAD, BAD];

   describe("lconn.core.util.imagechecker", function() {
      it("implements the expected methods", function() {
         expect(imagechecker.checkExist).toEqual(jasmine.any(Function));
      });
   });

   describe("the function lconn.core.util.imagechecker.checkExist()", function() {
      it("rejects the deferred if no images are passed", function(done) {
         imagechecker.checkExist().then(function() {
            expect(true).toBeFalsy();
            done();
         }, function() {
            expect(true).toBeTruthy();
            done();
         });
      });
      it("passes a valid image to the callback", function(done) {
         imagechecker.checkExist(GOOD).then(function(good) {
            expect(true).toBeTruthy();
            expect(good).not.toBeNull();
            expect(good.length).toBe(1);
            expect(dojo.indexOf(good, GOOD)).not.toBe(-1);
            done();
         }, function(bad) {
            expect(true).toBeFalsy();
            done();
         });
      });
      it("passes a bad image to the errback", function(done) {
         imagechecker.checkExist(BAD).then(function(good) {
            expect(true).toBeFalsy();
            done();
         }, function(bad) {
            expect(true).toBeTruthy();
            expect(bad).not.toBeNull();
            expect(bad.length).toBe(1);
            expect(dojo.indexOf(bad, BAD)).not.toBe(-1);
            done();
         });
      });
      it("passes valid images to the callback if some are", function(done) {
         imagechecker.checkExist(ONE_GOOD_ONE_BAD).then(function(good) {
            expect(true).toBeTruthy();
            expect(good).not.toBeNull();
            expect(good.length).toBe(1);
            done();
         }, function(bad) {
            expect(true).toBeFalsy();
            done();
         });
      });
      it("passes valid images to the callback if they're all valid", function(done) {
         imagechecker.checkExist(TWO_GOOD).then(function(good) {
            expect(true).toBeTruthy();
            expect(good).not.toBeNull();
            expect(good.length).toBe(2);
            done();
         }, function(bad) {
            expect(true).toBeFalsy();
            done();
         });
      });
      it("passes bad images to the errback if they're all bad", function(done) {
         imagechecker.checkExist(TWO_BAD).then(function(good) {
            expect(true).toBeFalsy();
            done();
         }, function(bad) {
            expect(true).toBeTruthy();
            expect(bad).not.toBeNull();
            expect(bad.length).toBe(2);
            done();
         });
      });
   });

}(lconn.core.util.imagechecker));
