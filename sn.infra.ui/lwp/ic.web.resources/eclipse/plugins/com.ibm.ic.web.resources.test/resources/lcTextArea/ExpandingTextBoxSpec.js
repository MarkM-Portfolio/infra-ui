/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-core/lcTextArea/widgets/ExpandingTextBox"
], function(ExpandingTextBox) {

   /**
    * Jasmine spec for {@link ic-core.lcTextArea.widgets.ExpandingTextBox}
    * 
    * @module ic-test.lcTextArea.ExpandingTextBoxSpec
    */

   describe("the ic-core/lcTextArea/widgets/ExpandingTextBox widget", function() {
      var textbox;
      beforeEach(function() {
         textbox = new ExpandingTextBox();
      });

      it("implements the expected methods", function() {
         expect(textbox.resetFeature).toEqual(jasmine.any(Function));
         expect(textbox.setFocus).toEqual(jasmine.any(Function));
         expect(textbox.onChange).toEqual(jasmine.any(Function));
      });
   });
});
