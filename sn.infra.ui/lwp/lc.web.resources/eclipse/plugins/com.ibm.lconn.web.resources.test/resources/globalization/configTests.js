/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.globalization.configTests");

dojo.require("doh.runner");
dojo.require("lconn.core.globalization.config");

/**
 * Test case for Globalization configuration
 * @module lconn.test.globalization.configTests
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(config) {
   var C = config.CALENDAR, T = config.TEXT_DIRECTION, S = config.SETTINGS;
   var d = config.defaults;
   doh.register("lconn.test.globalization.bidiTests", [{
      name : 'test constants',
      runTest : function() {
         // CALENDAR
         doh.is("gregorian", C.GREGORIAN);
         doh.is("hijri", C.HIJRI);
         doh.is("hebrew", C.HEBREW);

         // TEXT_DIRECTION
         doh.is("default", T.DEFAULT);
         doh.is("ltr", T.LEFT_TO_RIGHT);
         doh.is("rtl", T.RIGHT_TO_LEFT);
         doh.is("contextual", T.CONTEXTUAL);

         // SETTINGS
         doh.is("bidiEnabled", S.BIDI_ENABLED);
         doh.is("textDirection", S.TEXT_DIRECTION);
         doh.is("calendar", S.CALENDAR);
      }
   }, {
      name : 'test defaults',
      runTest : function() {
         doh.f(d.bidiEnabled);
         doh.is(C.GREGORIAN, d.calendar);
         doh.is(T.DEFAULT, d.textDirection);
      }
   }]);
}(lconn.core.globalization.config));
