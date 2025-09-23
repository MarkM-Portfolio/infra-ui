/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.jasmine.controls.GridSpec");

dojo.require("com.ibm.oneui.controls.Grid");

(function(Grid) {

   var URL = "http://www.example.com";

   /**
    * Grid widget Jasmine spec
    * 
    * @module com.ibm.oneui.test.jasmine.controls.GridSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the com.ibm.oneui.controls.Grid widget", function() {
      var grid;
      beforeEach(function() {
         grid = new Grid();
      });
      afterEach(function() {
         if (grid) {
            grid.destroy();
         }
      });
      it("implements the expected properties", function() {
         expect(grid.strings).not.toBeUndefined();
         expect(grid.data).not.toBeUndefined();
         expect(grid.renderer).not.toBeUndefined();
      });
      it("implements the expected methods", function() {
         expect(grid.refresh).toEqual(jasmine.any(Function));
         expect(grid.update).toEqual(jasmine.any(Function));
         expect(grid.onUpdate).toEqual(jasmine.any(Function));
      });
      it("the refresh method triggers a call to update with the correct arguments", function() {
         spyOn(grid, "update");
         grid.data = {
            fromUrl : true
         };
         grid.refresh();
         expect(grid.update.calls.first().args).toEqual([ null
         ]);

         grid.data = {};
         grid.refresh();
         expect(grid.update.calls.mostRecent().args).toEqual([]);

         delete grid.data;
         var update_calls = grid.update.calls.count();
         grid.refresh();
         // update is not invoked again
         expect(grid.update.calls.count()).toBe(update_calls);
      });
      it("the update method loads data from url with no arguments", function() {
         spyOn(grid, "_loadFromUrl");
         grid.url = URL;
         grid.update();
         expect(grid._loadFromUrl).toHaveBeenCalledWith(URL);
      });
      it("the update method delegates the renderer with JSON or XML data arguments", function() {
         spyOn(grid, "onUpdate");
         grid.renderer = jasmine.createSpyObj('renderer', [
               'render',
               'renderEmpty'
         ]);
         // This will call renderer.render() and onUpdate()
         grid.update({
            json : {}
         });
         // This will call renderer.render() and onUpdate()
         grid.update({
            xml : {}
         });
         // This will call renderer.renderEmpty() and onUpdate()
         grid.update({});

         expect(grid.onUpdate.calls.count()).toBe(3);
         expect(grid.renderer.render.calls.count()).toBe(2);
         expect(grid.renderer.renderEmpty.calls.count()).toBe(1);
      });
      it("if instantiated with a renderer, its renderLoading method is invoked", function() {
         var renderer = jasmine.createSpyObj('renderer', [ 'renderLoading'
         ]);
         var grid1 = new Grid({
            renderer : renderer
         });
         expect(grid1).not.toBeNull();
         expect(renderer.renderLoading).toHaveBeenCalled();
      });
      it("uses the strings.empty if msgNoData is not set", function() {
         var msg = '__msg_no_data__';
         var strings = {
            empty : '__strings_empty__'
         };
         var grid1 = new Grid({
            msgNoData : msg
         });
         var grid2 = new Grid({
            strings : strings
         });
         expect(grid1.msgNoData).toBe(msg);
         expect(grid2.msgNoData).toBe(strings.empty);
      });
      it("the _updateWithError method calls the renderer's renderError method", function() {
         var renderer = jasmine.createSpyObj('renderer', [ 'renderError'
         ]);
         var error = '__error__';
         grid.renderer = renderer;
         grid._updateWithError(error);
         expect(renderer.renderError).toHaveBeenCalled();
         expect(renderer.renderError.calls.mostRecent().args[3]).toBe(error);

         delete grid.renderer;
         expect(function() {
            grid._updateWithError(error);
         }).not.toThrow();
      });
   });
}(com.ibm.oneui.controls.Grid));
