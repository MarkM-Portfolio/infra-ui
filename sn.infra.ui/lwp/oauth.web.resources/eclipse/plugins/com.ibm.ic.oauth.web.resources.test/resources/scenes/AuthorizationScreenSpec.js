/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-oauth/scenes/AuthorizationScreen"
], function (Scene) {

   /**
    * Jasmine spec for AuthorizationScreen scene
    * @module ic-oauth-test.scenes.AuthorizationScreenSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the AuthorizationScreen prototype", function() {
      var scene;
      beforeEach(function(){
         scene = new Scene();
      });
      it('implements the expected methods', function() {
         expect(scene.begin).toEqual(jasmine.any(Function));
         expect(scene.end).toEqual(jasmine.any(Function));
         expect(scene.show).toEqual(jasmine.any(Function));
         // Custom methods
         expect(scene.render).toEqual(jasmine.any(Function));
         expect(scene.initAutoOAuth).toEqual(jasmine.any(Function));
      });
      it('has the expected properties', function() {
         expect(scene.revokeInstructions).toBeDefined();
      });
   });
});
