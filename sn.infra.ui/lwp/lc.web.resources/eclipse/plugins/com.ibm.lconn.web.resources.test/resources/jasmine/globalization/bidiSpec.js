/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.globalization.bidiSpec");

dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("lconn.core.globalization.config");

/**
 * Jasmine spec for Bidi utilities
 * @module lconn.test.jasmine.globalization.bidiTests
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(bidi, config) {
   var LTR = 'ltr', RTL = 'rtl', TD = config.TEXT_DIRECTION;
   describe("the method getTextDirection()", function() {
      it('returns the correct text direction', function() {
         var str1 = "Test \u05d0\u05d1\u05d2";
         var str2 = "\u05d0\u05d1\u05d2 Test";
         var str3 = "";
         expect(bidi.getTextDirection(str1, TD.LEFT_TO_RIGHT)).toBe(LTR);
         expect(bidi.getTextDirection(str1, TD.RIGHT_TO_LEFT)).toBe(RTL);
         expect(bidi.getTextDirection(str1, TD.CONTEXTUAL)).toBe(LTR);
         expect(bidi.getTextDirection(str2, TD.CONTEXTUAL)).toBe(RTL);
         expect(bidi.getTextDirection(str3, TD.CONTEXTUAL)).toBe(LTR);
      });
   });
   describe("the method enforceTextDirection()", function() {
      it('returns the correct value', function() {
         var str1 = "Test \u05d0\u05d1\u05d2";
         var str2 = "\u05d0\u05d1\u05d2 Test";
         expect(bidi.enforceTextDirection(str1, TD.LEFT_TO_RIGHT)).toBe("\u202ATest \u05d0\u05d1\u05d2\u202C");
         expect(bidi.enforceTextDirection(str1, TD.RIGHT_TO_LEFT)).toBe("\u202BTest \u05d0\u05d1\u05d2\u202C");
         expect(bidi.enforceTextDirection(str1, TD.CONTEXTUAL)).toBe("\u202ATest \u05d0\u05d1\u05d2\u202C");
         expect(bidi.enforceTextDirection(str2, TD.CONTEXTUAL)).toBe("\u202B\u05d0\u05d1\u05d2 Test\u202C");
      });
   });
   describe("the method inputRTLProcessing()", function() {
       it('sets the correct direction attr', function() {
           var str1 = "";
           var str2 = "\u05d0\u05d1\u05d2";
           var str3 = "test";
           
           config.defaults[config.SETTINGS.BIDI_ENABLED] = true;
           
           var mockTextBox = document.createElement('input');
           mockTextBox.setAttribute("type","text");
           mockTextBox.setAttribute("id","mockTextBox");
           mockTextBox.setAttribute("class","bidiAware");
           
           mockTextBox.setAttribute("value",str1);
           mockTextBox.setAttribute("dir",TD.LEFT_TO_RIGHT);
           bidi.inputRTLProcessing(mockTextBox, TD.CONTEXTUAL);
           expect(mockTextBox.getAttribute("dir")).toBe(TD.LEFT_TO_RIGHT);
           
           mockTextBox.setAttribute("value",str2);
           mockTextBox.setAttribute("dir",TD.LEFT_TO_RIGHT);
           bidi.inputRTLProcessing(mockTextBox, TD.CONTEXTUAL);
           expect(mockTextBox.getAttribute("dir")).toBe(TD.RIGHT_TO_LEFT);
           
           mockTextBox.setAttribute("value",str3);
           mockTextBox.setAttribute("dir",TD.RIGHT_TO_LEFT);
           bidi.inputRTLProcessing(mockTextBox, TD.CONTEXTUAL);
           expect(mockTextBox.getAttribute("dir")).toBe(TD.LEFT_TO_RIGHT);
           
           //Changing this back because it cause another test to fail.
           config.defaults[config.SETTINGS.BIDI_ENABLED] = false;
       });
   });
}(lconn.core.globalization.bidiUtil, lconn.core.globalization.config));
