/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.jasmine.controls.GridRendererSpec");

dojo.require("com.ibm.oneui.controls.GridRenderer");

(function(GridRenderer) {
   /**
    * Grid Renderer Jasmine spec
    * 
    * @module com.ibm.oneui.test.jasmine.controls.GridRendererSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the com.ibm.oneui.controls.GridRenderer widget", function() {
      var renderer;
      beforeEach(function() {
         renderer = new GridRenderer();
      });
      it("implements the expected properties", function() {
         expect(renderer.nls).not.toBeUndefined();
         expect(renderer.emptyClass).not.toBeUndefined();
         expect(renderer.errorClass).not.toBeUndefined();
         expect(renderer.loadingClass).not.toBeUndefined();
         expect(renderer.loadingImgClass).not.toBeUndefined();
      });
      it("implements the expected methods", function() {
         expect(renderer.render).toEqual(jasmine.any(Function));
         expect(renderer.renderLoading).toEqual(jasmine.any(Function));
         expect(renderer.renderError).toEqual(jasmine.any(Function));
         expect(renderer.getSortInfo).toEqual(jasmine.any(Function));
         expect(renderer.renderSorting).toEqual(jasmine.any(Function));
         expect(renderer.renderSort).toEqual(jasmine.any(Function));
         expect(renderer.renderItem).toEqual(jasmine.any(Function));
         expect(renderer.renderItems).toEqual(jasmine.any(Function));
      });
   });
}(com.ibm.oneui.controls.GridRenderer));
