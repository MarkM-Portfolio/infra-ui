/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-oauth/scenes/ApplicationList"
], function (Scene) {

   /**
    * Jasmine spec for ApplicationList scene
    * @module ic-oauth-test.scenes.ApplicationListSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the ApplicationList prototype", function() {
      var scene;
      beforeEach(function(){
         scene = new Scene();
      });
      it('implements the expected methods', function() {
         expect(scene.begin).toEqual(jasmine.any(Function));
         expect(scene.end).toEqual(jasmine.any(Function));
         expect(scene.show).toEqual(jasmine.any(Function));
         // Custom methods
         expect(scene.getSortInfo).toEqual(jasmine.any(Function));
         expect(scene.getTabs).toEqual(jasmine.any(Function));
         expect(scene.render).toEqual(jasmine.any(Function));
      });
   });
});
