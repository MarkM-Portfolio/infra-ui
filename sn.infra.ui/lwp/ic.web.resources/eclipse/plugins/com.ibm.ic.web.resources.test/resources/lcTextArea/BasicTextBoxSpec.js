/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([ "ic-core/lcTextArea/widgets/BasicTextBox"
], function(BasicTextBox) {

   /**
    * Jasmine spec for {@link ic-core.lcTextArea.widgets.BasicTextBox}
    * 
    * @module ic-test.lcTextArea.BasicTextBoxSpec
    */

   describe("the ic-core/lcTextArea/widgets/BasicTextBox widget", function() {
      var textbox;
      beforeEach(function() {
         textbox = new BasicTextBox({
            mentionsEnabled : false
         });
      });

      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(textbox.constructor).toEqual(jasmine.any(Function));
            expect(textbox.destroy).toEqual(jasmine.any(Function));
            expect(textbox.buildRendering).toEqual(jasmine.any(Function));
            expect(textbox.postCreate).toEqual(jasmine.any(Function));
            expect(textbox.resetBox).toEqual(jasmine.any(Function));
            expect(textbox.resetFeature).toEqual(jasmine.any(Function));
            expect(textbox._mixInSupport).toEqual(jasmine.any(Function));
            expect(textbox._showShadowText).toEqual(jasmine.any(Function));
            expect(textbox._hideShadowText).toEqual(jasmine.any(Function));
            expect(textbox.setRows).toEqual(jasmine.any(Function));
            expect(textbox.collapseTextBox).toEqual(jasmine.any(Function));
            expect(textbox.expandTextBox).toEqual(jasmine.any(Function));
            expect(textbox.setReadOnly).toEqual(jasmine.any(Function));
            expect(textbox.setEditable).toEqual(jasmine.any(Function));
            expect(textbox.setFocus).toEqual(jasmine.any(Function));
            expect(textbox.getText).toEqual(jasmine.any(Function));
            expect(textbox.setText).toEqual(jasmine.any(Function));
            expect(textbox.setEditorAttr).toEqual(jasmine.any(Function));
            expect(textbox.getMentions).toEqual(jasmine.any(Function));
            expect(textbox.handleURLInput).toEqual(jasmine.any(Function));
            expect(textbox.handleMention).toEqual(jasmine.any(Function));
            expect(textbox.shouldNotify).toEqual(jasmine.any(Function));
            expect(textbox.onLoad).toEqual(jasmine.any(Function));
            expect(textbox.setTypeAheadHeader).toEqual(jasmine.any(Function));
            expect(textbox.addMentionsCallback).toEqual(jasmine.any(Function));
            expect(textbox.addCustomCSS).toEqual(jasmine.any(Function));
            expect(textbox.removeCustomCSS).toEqual(jasmine.any(Function));
            expect(textbox.isFocused).toEqual(jasmine.any(Function));
            expect(textbox.setNetwork).toEqual(jasmine.any(Function));
         });
      });
   });
});
