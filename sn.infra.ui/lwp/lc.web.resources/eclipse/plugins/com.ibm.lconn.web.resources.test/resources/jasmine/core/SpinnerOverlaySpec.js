/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.core.SpinnerOverlaySpec");

dojo.require("lconn.core.SpinnerOverlay");

(function(SpinnerOverlay) {
   describe('the lconn.core.SpinnerOverlay class', function() {
      var widget;
      beforeEach(function() {
         widget = new SpinnerOverlay();
      });
      it('implements the expected methods', function() {
         expect(widget.showSpinner).toEqual(jasmine.any(Function));
         expect(widget.hideSpinner).toEqual(jasmine.any(Function));
      });
   });
}(lconn.core.SpinnerOverlay));
