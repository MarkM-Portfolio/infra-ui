/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "ic-core/globalization/config"
], function (config) {

   /**
    * Jasmine spec for Globalization configuration
    * @module ic-test.globalization.configTests
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var C = config.CALENDAR, T = config.TEXT_DIRECTION, S = config.SETTINGS;
   var d = config.defaults;
   describe("ic-core/globalization/config", function() {
      it('has the correct calendar constants', function() {
         // CALENDAR
         expect(C.GREGORIAN).toBe("gregorian");
         expect(C.HIJRI).toBe("hijri");
         expect(C.HEBREW).toBe("hebrew");
      });
      it('has the correct text direction constants', function() {
         // TEXT_DIRECTION
         expect(T.DEFAULT).toBe("default");
         expect(T.LEFT_TO_RIGHT).toBe("ltr");
         expect(T.RIGHT_TO_LEFT).toBe("rtl");
         expect(T.CONTEXTUAL).toBe("contextual");
      });
      it('has the correct setting names', function() {
         // SETTINGS
         expect(S.BIDI_ENABLED).toBe("bidiEnabled");
         expect(S.TEXT_DIRECTION).toBe("textDirection");
         expect(S.CALENDAR).toBe("calendar");
      });
      it('has the correct defaults', function() {
         expect(d.bidiEnabled).toBeFalsy();
         expect(d.calendar).toBe(C.GREGORIAN);
         expect(d.textDirection).toBe(T.DEFAULT);
      });
   });
});
