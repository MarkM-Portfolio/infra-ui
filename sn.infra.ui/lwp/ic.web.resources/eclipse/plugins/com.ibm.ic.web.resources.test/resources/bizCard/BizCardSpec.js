/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-ui/BizCard"
], function(BizCard) {

   /**
    * BizCard framework specs
    * 
    * @namespace ic-test.bizCard
    */

   /**
    * BizCard widget Jasmine spec
    * 
    * @module ic-test.bizCard.BizCardSpec
    * @author Davide Riso <davide.riso@ie.ibm.com>
    */
   describe("the BusinessCard widget", function() {
      var widget;
      afterEach(function() {
         if (widget) {
            widget.destroy();
         }
      });
      it("can be instantiated without errors", function() {
         expect(function() {
            widget = new BizCard();
         }).not.toThrow();
         expect(widget).not.toBeNull();
      });
      it("sets isFrontSide to true if x-lconn-userid is set", function() {
         widget = new BizCard({
            "key" : {
               "x-lconn-userid" : "91ae7240-8f0a-1028-737f-db07163b51b2"
            }
         });
         expect(widget.isFrontSide).toBeTruthy();
      });
      it("sets isFrontSide to true if the email is set", function() {
         widget = new BizCard({
            "key" : {
               "email" : "abc@abc.com"
            }
         });
         expect(widget.isFrontSide).toBeTruthy();
      });
   });

   describe("the coreui.BizCard.update() method", function() {
      var widget;
      beforeEach(function() {
         widget = new BizCard();
      });
      afterEach(function() {
         if (widget) {
            widget.destroy();
         }
      });
      it("sets the key field", function() {
         widget.update({
            "x-lconn-userid" : "91ae7240-8f0a-1028-737f-db07163b51b2"
         });
         expect(widget.key).not.toBeNull();
      });
      it("sets the value field", function() {
         widget.update({
            "x-lconn-userid" : "91ae7240-8f0a-1028-737f-db07163b51b2"
         });
         expect(widget.value).not.toBeNull();
      });
      it("the method resetUI is called", function() {
         spyOn(widget, "resetUI");
         widget.update({
            "x-lconn-userid" : "91ae7240-8f0a-1028-737f-db07163b51b2"
         });
         expect(widget.resetUI).toHaveBeenCalled();
      });

   });

   describe("the coreui.ui.BizCard.resetUI() method", function() {
      var widget;
      beforeEach(function() {
         widget = new BizCard();
      });
      afterEach(function() {
         if (widget) {
            widget.destroy();
         }
      });
      it("the field frontFullName is set to empty", function() {
         widget.resetUI();
         expect(widget.frontFullName.innerHTML).toBe('');
      });
   });

});
