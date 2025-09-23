/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.applicationPaletteSpec");

dojo.require("lconn.core.applicationPalette");

(function(applicationPalette) {
   describe("the interface of lconn.core.applicationPalette", function() {
      it("implements the expected methods", function() {
         expect(applicationPalette.currentTabId).toEqual(jasmine.any(Function));
         expect(applicationPalette.hidePalette).toEqual(jasmine.any(Function));
         expect(applicationPalette.showPalette).toEqual(jasmine.any(Function));
         expect(applicationPalette.addWidget).toEqual(jasmine.any(Function));
         expect(applicationPalette.changeLayout).toEqual(jasmine.any(Function));
         expect(applicationPalette.getjsonData).toEqual(jasmine.any(Function));
         expect(applicationPalette.getLayoutJsonData).toEqual(jasmine.any(Function));
         expect(applicationPalette.canAdd).toEqual(jasmine.any(Function));
         expect(applicationPalette.canSwitchLayout).toEqual(jasmine.any(Function));

         var ap = new applicationPalette();
         expect(ap.onLoad).toEqual(jasmine.any(Function));
         expect(ap.onSwitch).toEqual(jasmine.any(Function));
         expect(ap._createPaletteWidget).toEqual(jasmine.any(Function));
         expect(ap._paletteButtonListener).toEqual(jasmine.any(Function));
         expect(ap._buttonStatusHandler).toEqual(jasmine.any(Function));
      });
   });
}(lconn.core.applicationPalette));
