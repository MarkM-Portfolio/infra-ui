/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.jasmine.controls.ButtonFactorySpec");

dojo.require("com.ibm.oneui.controls.ButtonFactory");

(function(ButtonFactory) {
   /**
    * Button Factory Jasmine spec
    * 
    * @module com.ibm.oneui.test.jasmine.controls.ButtonFactorySpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the com.ibm.oneui.controls.ButtonFactory util", function() {
      it("implements the expected methods", function() {
         expect(ButtonFactory.createButton).toEqual(jasmine.any(Function));
         expect(ButtonFactory.createMenuButton).toEqual(jasmine.any(Function));
         expect(ButtonFactory.createFormButton).toEqual(jasmine.any(Function));
      });
   });
}(com.ibm.oneui.controls.ButtonFactory));
