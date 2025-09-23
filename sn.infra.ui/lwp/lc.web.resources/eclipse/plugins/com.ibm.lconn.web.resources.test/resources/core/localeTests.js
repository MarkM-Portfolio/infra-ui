/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.core.localeTests");

dojo.require("doh.runner");
dojo.require("lconn.core.locale");
dojo.require("lconn.test.mocks.locale");

(function(lcl, mocks) {
   doh.register("lconn.test.core.localeTests", [ {
      name : 'test interface',
      runTest : function() {
         doh.t(dojo.isFunction(lcl.getLocale));
         doh.t(dojo.isFunction(lcl.getLanguage));
         doh.t(dojo.isFunction(lcl.getCountry));
         doh.t(dojo.isFunction(lcl.toJavaLocale));
      }
   }, {
      name : 'test getLocale()',
      setUp : function() {
         this.locale = dojo.locale;
      },
      runTest : function() {
         dojo.locale = mocks.EN_US;
         doh.is(mocks.EN_US, lcl.getLocale());

         dojo.locale = mocks.PT;
         doh.is(mocks.PT, lcl.getLocale());

         dojo.locale = mocks.PT_BR;
         doh.is(mocks.PT_BR, lcl.getLocale());
         
         dojo.locale = mocks.HE;
         doh.is(mocks.HE, lcl.getLocale());

         dojo.locale = mocks.NB;
         doh.is(mocks.NB, lcl.getLocale());
      },
      tearDown : function() {
         dojo.locale = this.locale;
      }
   }, {
      name : 'test getLanguage()',
      setUp : function() {
         this.locale = dojo.locale;
      },
      runTest : function() {
         dojo.locale = mocks.EN_US;
         doh.is(mocks.EN_US_LANG, lcl.getLanguage());

         dojo.locale = mocks.PT;
         doh.is(mocks.PT_LANG, lcl.getLanguage());

         dojo.locale = mocks.PT_BR;
         doh.is(mocks.PT_BR_LANG, lcl.getLanguage());

         dojo.locale = mocks.HE;
         doh.is(mocks.HE_LANG, lcl.getLanguage());

         dojo.locale = mocks.NB;
         doh.is(mocks.NB_LANG, lcl.getLanguage());
      },
      tearDown : function() {
         dojo.locale = this.locale;
      }
   }, {
      name : 'test getCountry()',
      setUp : function() {
         this.locale = dojo.locale;
      },
      runTest : function() {
         dojo.locale = mocks.EN_US;
         doh.is(mocks.EN_US_COUNTRY, lcl.getCountry());

         dojo.locale = mocks.PT;
         doh.is(mocks.PT_COUNTRY, lcl.getCountry());

         dojo.locale = mocks.PT_BR;
         doh.is(mocks.PT_BR_COUNTRY, lcl.getCountry());

         dojo.locale = mocks.HE;
         doh.is(mocks.HE_COUNTRY, lcl.getCountry());

         dojo.locale = mocks.NB;
         doh.is(mocks.NB_COUNTRY, lcl.getCountry());
      },
      tearDown : function() {
         dojo.locale = this.locale;
      }
   }, {
      name : 'test toJavaLocale()',
      setUp : function() {
         this.locale = dojo.locale;
      },
      runTest : function() {
         dojo.locale = mocks.EN_US;
         doh.is(mocks.EN_US_JAVA, lcl.toJavaLocale());

         dojo.locale = mocks.PT;
         doh.is(mocks.PT_JAVA, lcl.toJavaLocale());

         dojo.locale = mocks.PT_BR;
         doh.is(mocks.PT_BR_JAVA, lcl.toJavaLocale());

         dojo.locale = mocks.HE;
         doh.is(mocks.HE_JAVA, lcl.toJavaLocale());

         dojo.locale = mocks.NB;
         doh.is(mocks.NB_JAVA, lcl.toJavaLocale());
      },
      tearDown : function() {
         dojo.locale = this.locale;
      }
   }]);
}(lconn.core.locale, lconn.test.mocks.locale));
