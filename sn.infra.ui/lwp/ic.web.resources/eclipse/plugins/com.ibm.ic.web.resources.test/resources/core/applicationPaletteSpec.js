/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "ic-core/applicationPalette"
], function(applicationPalette) {

   /**
    * Core specs
    * 
    * @namespace ic-test.core
    */

   /**
    * Jasmine spec for the {@link ic-core.applicationPalette} module
    * 
    * @module ic-test.core.applicationPaletteSpec
    */

   describe("the interface of ic-core/applicationPalette", function() {
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
});
