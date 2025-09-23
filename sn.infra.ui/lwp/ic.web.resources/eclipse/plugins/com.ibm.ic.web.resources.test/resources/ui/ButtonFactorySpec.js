/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-ui/ButtonFactory"
], function(ButtonFactory) {

   /**
    * Button Factory Jasmine spec
    * 
    * @module ic-test.ui.ButtonFactorySpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the ic-ui/ButtonFactory util", function() {
      it("implements the expected methods", function() {
         expect(ButtonFactory.createButton).toEqual(jasmine.any(Function));
         expect(ButtonFactory.createMenuButton).toEqual(jasmine.any(Function));
         expect(ButtonFactory.createFormButton).toEqual(jasmine.any(Function));
      });
   });
});
