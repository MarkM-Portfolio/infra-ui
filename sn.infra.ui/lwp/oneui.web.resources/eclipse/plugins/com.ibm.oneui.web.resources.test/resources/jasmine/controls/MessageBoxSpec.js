/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.jasmine.controls.MessageBoxSpec");

dojo.require("com.ibm.oneui.controls.MessageBox");

(function(MessageBox) {

   function create(args) {
      return new MessageBox(args || {}, dojo.create('div'));
   }

   var HELLO_WORLD = "Hello world!";

   /**
    * Message Box widget Jasmine spec
    * 
    * @module com.ibm.oneui.test.jasmine.controls.MessageBoxSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the com.ibm.oneui.controls.MessageBox widget", function() {
      var widget;
      var widget;
      beforeEach(function() {
         jasmine.clock().install();
      });
      afterEach(function() {
         if (widget) {
            widget.destroy();
         }
         jasmine.clock().uninstall();
      });
      it("can be instantiated without errors", function() {
         expect(function() {
            widget = create();
         }).not.toThrow();
         expect(widget).not.toBeNull();
      });
      it("exposes message box type constants", function() {
         expect(MessageBox.TYPE.ERROR).toBeDefined();
         expect(MessageBox.TYPE.INFO).toBeDefined();
         expect(MessageBox.TYPE.WARNING).toBeDefined();
         expect(MessageBox.TYPE.SHARED_EXTERNAL).toBeDefined();
      });
      it("implements the expected methods", function() {
         widget = create();
         expect(widget.close).toEqual(jasmine.any(Function));
         expect(widget.showMoreLessClicked).toEqual(jasmine.any(Function));
         expect(widget.onClose).toEqual(jasmine.any(Function));
      });
      it("the close method hides the box", function() {
         widget = create();
         spyOn(widget, "onClose");
         widget.close();
         expect(dojo.hasClass(widget.domNode, "lotusHidden")).toBeTruthy();
         expect(widget.onClose).toHaveBeenCalled();
      });
      it("the close method reassigns focus to the focus node", function() {
         widget = create();
         widget.focusPostClose = jasmine.createSpyObj('focusPostClose', [ 'focus'
         ]);
         widget.focusPostClose.tagName = jasmine.createSpyObj('tagName', [ 'toLowerCase'
         ]);
         widget.close();
         jasmine.clock().tick(101);
         expect(widget.focusPostClose.focus).toHaveBeenCalled();
      });
      it("the close button is visible if canClose is true", function() {
         widget = create({
            canClose : true
         });
         expect(dojo.hasClass(widget.closeBtn, "lotusHidden")).toBeFalsy();
      });
      it("the Show More button is hiddel if msgMore is not set", function() {
         widget = create();
         expect(dojo.hasClass(widget.showMoreNode, "lotusHidden")).toBeTruthy();
         expect(dojo.hasClass(widget.showLessNode, "lotusHidden")).toBeTruthy();
      });
      it("the Show More button is visible if msgMore is set", function() {
         widget = create({
            msgMore : "<MORE>"
         });
         expect(dojo.hasClass(widget.showMoreNode, "lotusHidden")).toBeFalsy();
         expect(dojo.hasClass(widget.showLessNode, "lotusHidden")).toBeTruthy();
      });
      it("the Show Less button becomes visible if showMoreLessClicked() is invoked", function() {
         widget = create({
            msgMore : "<MORE>"
         });
         expect(dojo.hasClass(widget.showMoreNode, "lotusHidden")).toBeFalsy();
         expect(dojo.hasClass(widget.showLessNode, "lotusHidden")).toBeTruthy();
         widget.showMoreLessClicked();
         expect(dojo.hasClass(widget.showMoreNode, "lotusHidden")).toBeTruthy();
         expect(dojo.hasClass(widget.showLessNode, "lotusHidden")).toBeFalsy();
      });
      it("if msg is a node, the widget renders the node", function() {
         widget = create({
            msg : document.createTextNode(HELLO_WORLD)
         });
         expect(widget.msgBody.innerHTML).toBe(HELLO_WORLD);
      });
      it("if msg is a string, the widget displays the string", function() {
         widget = create({
            msg : HELLO_WORLD
         });
         expect(widget.msgBody.innerHTML).toBe(HELLO_WORLD);
      });
      it("if msg is a function, the widget renders the node returned by the function", function() {
         widget = create({
            msg : function(d) {
               return d.createTextNode(HELLO_WORLD);
            }
         });
         expect(widget.msgBody.innerHTML).toBe(HELLO_WORLD);
      });
      it("if msg is anything else, the widget renders a comment and issues a warning", function() {
         spyOn(console, "warn");
         widget = create({
            msg : true
         });
         expect(console.warn).toHaveBeenCalled();
         expect(widget.msgBody.innerHTML).toBe("<!-- No message -->");
      });
      it("can be of type Error", function() {
         widget = create({
            type : MessageBox.TYPE.ERROR
         });
//         expect(dojo.hasClass(widget.domNode, "")).toBeTruthy();
         expect(dojo.hasClass(widget.imgNode, "lotusIconMsgError")).toBeTruthy();
      });
      it("can be of type Info", function() {
         widget = create({
            type : MessageBox.TYPE.INFO
         });
         expect(dojo.hasClass(widget.domNode, "lotusInfo")).toBeTruthy();
         expect(dojo.hasClass(widget.imgNode, "lotusIconMsgInfo")).toBeTruthy();
      });
      it("can be of type Warning", function() {
         widget = create({
            type : MessageBox.TYPE.WARNING
         });
         expect(dojo.hasClass(widget.domNode, "lotusWarning")).toBeTruthy();
         expect(dojo.hasClass(widget.imgNode, "lotusIconMsgWarning")).toBeTruthy();
      });
      it("can be of type Success", function() {
         widget = create({
            type : MessageBox.TYPE.SUCCESS
         });
         expect(dojo.hasClass(widget.domNode, "lotusSuccess")).toBeTruthy();
         expect(dojo.hasClass(widget.imgNode, "lotusIconMsgSuccess")).toBeTruthy();
      });
      it("can be of type Shared Externally", function() {
         widget = create({
            type : MessageBox.TYPE.SHARED_EXTERNAL
         });
         expect(dojo.hasClass(widget.domNode, "lconnSharedExternal")).toBeTruthy();
         expect(dojo.hasClass(widget.imgNode, "lconnIconMsgSharedExternal")).toBeTruthy();
      });
   });
}(com.ibm.oneui.controls.MessageBox));
