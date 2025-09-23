/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.globalization.bidiTests");

dojo.require("doh.runner");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("lconn.core.globalization.config");

/**
 * Test case for Bidi utilities
 * @module lconn.test.globalization.bidiTests
 * @author Moshe Wajnberg <wajnberg@il.ibm.com>
 */
(function(bidi, config) {
   var LTR = 'ltr', RTL = 'rtl';
   doh.register("lconn.test.globalization.bidiTests", [{
      name : 'test getTextDirection',
      runTest : function() {
         var str1 = "Test \u05d0\u05d1\u05d2";
         var str2 = "\u05d0\u05d1\u05d2 Test";
         var str3 = "";
         doh.is(LTR, bidi.getTextDirection(str1, config.TEXT_DIRECTION.LEFT_TO_RIGHT));
         doh.is(RTL, bidi.getTextDirection(str1, config.TEXT_DIRECTION.RIGHT_TO_LEFT));
         doh.is(LTR, bidi.getTextDirection(str1, config.TEXT_DIRECTION.CONTEXTUAL));
         doh.is(RTL, bidi.getTextDirection(str2, config.TEXT_DIRECTION.CONTEXTUAL));
         doh.is("", bidi.getTextDirection(str3, config.TEXT_DIRECTION.CONTEXTUAL));
      }
   }, {
      name : 'test enforceTextDirection',
      runTest : function() {
         var str1 = "Test \u05d0\u05d1\u05d2";
         var str2 = "\u05d0\u05d1\u05d2 Test";
         doh.is("\u202ATest \u05d0\u05d1\u05d2\u202C", bidi.enforceTextDirection(str1, config.TEXT_DIRECTION.LEFT_TO_RIGHT));
         doh.is("\u202BTest \u05d0\u05d1\u05d2\u202C", bidi.enforceTextDirection(str1, config.TEXT_DIRECTION.RIGHT_TO_LEFT));
         doh.is("\u202ATest \u05d0\u05d1\u05d2\u202C", bidi.enforceTextDirection(str1, config.TEXT_DIRECTION.CONTEXTUAL));
         doh.is("\u202B\u05d0\u05d1\u05d2 Test\u202C", bidi.enforceTextDirection(str2, config.TEXT_DIRECTION.CONTEXTUAL));
      }
   }]);
}(lconn.core.globalization.bidiUtil, lconn.core.globalization.config));
