/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Jasmine spec for {@link lconn.core.lcTextArea.mixins.IMentionsSupport}
 * 
 * @module lconn.test.jasmine.lcTextArea.IMentionsSupportSpec
 */
dojo.provide("lconn.test.jasmine.lcTextArea.BasicTextBoxSpec");

dojo.require("lconn.core.lcTextArea.widgets.BasicTextBox");

(function(basicTextBox) {

   var textbox;
   beforeEach(function() {
      textbox = new basicTextBox({mentionsEnabled: false});
   });

   describe("the lconn.core.lcTextArea.widgets.BasicTextBox", function() {
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

}(lconn.core.lcTextArea.widgets.BasicTextBox));

