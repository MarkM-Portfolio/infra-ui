/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.mentions.MentionsHelperSpec");

dojo.require("lconn.core.widget.mentions.MentionsHelper");

(function(MentionsHelper) {
   
   var m;
   beforeEach(function() {
      m = new MentionsHelper();
   });
   
   describe("the mixin lconn.core.widget.mentions.MentionsHelper", function() {
      it("adds the expected methods", function() {
         expect(m.initRangy).toEqual(jasmine.any(Function));
         expect(m.initTypeahead).toEqual(jasmine.any(Function));
         expect(m.closeTypeahead).toEqual(jasmine.any(Function));
         expect(m.resultListOpened).toEqual(jasmine.any(Function));
         expect(m.mouseDownListener).toEqual(jasmine.any(Function));
         expect(m.mouseMoveListener).toEqual(jasmine.any(Function));
         expect(m.mouseUpListener).toEqual(jasmine.any(Function));
         expect(m.selectOption).toEqual(jasmine.any(Function));
         expect(m.createMentionsSpan).toEqual(jasmine.any(Function));
         expect(m.addTrack).toEqual(jasmine.any(Function));
         expect(m.updateTrack).toEqual(jasmine.any(Function));
         expect(m.stopTrack).toEqual(jasmine.any(Function));
         expect(m.search).toEqual(jasmine.any(Function));
         expect(m.positionTypeahead).toEqual(jasmine.any(Function));
         expect(m.clickListener).toEqual(jasmine.any(Function));
         expect(m.findNextNode).toEqual(jasmine.any(Function));
         expect(m.getNodeAttributes).toEqual(jasmine.any(Function));
         expect(m.keyListener).toEqual(jasmine.any(Function));
         expect(m.displayBizCard).toEqual(jasmine.any(Function));
         expect(m.pasteListener).toEqual(jasmine.any(Function));
         expect(m.handleFFPaste).toEqual(jasmine.any(Function));
         expect(m.postPaste).toEqual(jasmine.any(Function));
         expect(m.cutListener).toEqual(jasmine.any(Function));
         expect(m.resetBox).toEqual(jasmine.any(Function));
         expect(m.setShadowText).toEqual(jasmine.any(Function));
         expect(m.setText).toEqual(jasmine.any(Function));
         expect(m.blurListener).toEqual(jasmine.any(Function));
         expect(m.focusListener).toEqual(jasmine.any(Function));
         expect(m.selectTypeaheadOption).toEqual(jasmine.any(Function));
         expect(m.safariNodeFix).toEqual(jasmine.any(Function));
         expect(m.getMentions).toEqual(jasmine.any(Function));
         expect(m.cleanUp).toEqual(jasmine.any(Function));
         expect(m.resizeTypeahead).toEqual(jasmine.any(Function));
         expect(m.applyEEStyles).toEqual(jasmine.any(Function));
      });
   });
   
   describe("the lconn.core.widget.mentions.MentionsHelper.keyListener() method", function() {
      it("checks to ensure the return value is still undefined", function() {
         expect(m.keyListener({keyCode: 20})).toBeUndefined();
      });
      it("checks the return value isn't null", function() {
         expect(m.keyListener).not.toBeNull();
      });
   });
   
}(lconn.core.widget.mentions.MentionsHelper));
