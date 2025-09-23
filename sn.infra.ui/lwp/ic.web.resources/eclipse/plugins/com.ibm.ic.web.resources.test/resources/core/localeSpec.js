/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "ic-core/locale",
      "ic-test/mocks/locale"
], function(lang, locale, mocks) {

   /**
    * Jasmine spec for ic-core/locale
    * 
    * @module ic-test.localeSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var LANGS = 'EN_US|PT|PT_BR|HE|NB|ID';
   describe('the interface of ic-core/locale', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(locale.getLocale)).toBeTruthy();
         expect(lang.isFunction(locale.getLanguage)).toBeTruthy();
         expect(lang.isFunction(locale.getCountry)).toBeTruthy();
         expect(lang.isFunction(locale.toJavaLocale)).toBeTruthy();
      });
   });

   describe('the method ic-core/locale.getLocale()', function() {
      dojo.forEach(LANGS.split('|'), function(l) {
         it('returns \'' + mocks[l] + '\' when dojo.locale is \'' + mocks[l] + '\'', function() {
            dojo.locale = mocks[l];
            expect(locale.getLocale()).toBe(mocks[l]);
         });
      });
   });

   describe('the method ic-core/locale.getLanguage()', function() {
      var locale_;
      beforeEach(function() {
         locale_ = dojo.locale;
      });
      afterEach(function() {
         dojo.locale = locale_;
      });
      dojo.forEach(LANGS.split('|'), function(l) {
         it('returns \'' + mocks[l + '_LANG'] + '\' when dojo.locale is \'' + mocks[l] + '\'', function() {
            dojo.locale = mocks[l];
            expect(locale.getLanguage()).toBe(mocks[l + '_LANG']);
         });
      });
   });

   describe('the method ic-core/locale.getCountry()', function() {
      var locale_;
      beforeEach(function() {
         locale_ = dojo.locale;
      });
      afterEach(function() {
         dojo.locale = locale_;
      });
      dojo.forEach(LANGS.split('|'), function(l) {
         it('returns \'' + mocks[l + '_COUNTRY'] + '\' when dojo.locale is \'' + mocks[l] + '\'', function() {
            dojo.locale = mocks[l];
            expect(locale.getCountry()).toBe(mocks[l + '_COUNTRY']);
         });
      });
   });

   describe('the method ic-core/locale.getVariant()', function() {
      var locale_;
      beforeEach(function() {
         locale_ = dojo.locale;
      });
      afterEach(function() {
         dojo.locale = locale_;
      });
      dojo.forEach(LANGS.split('|'), function(l) {
         it('returns \'\' when dojo.locale is \'' + mocks[l] + '\'', function() {
            dojo.locale = mocks[l];
            expect(locale.getVariant()).toBe('');
         });
      });
   });

   describe('the method ic-core/locale.toJavaLocale()', function() {
      var locale_;
      beforeEach(function() {
         locale_ = dojo.locale;
      });
      afterEach(function() {
         dojo.locale = locale_;
      });
      dojo.forEach(LANGS.split('|'), function(l) {
         it('returns \'' + mocks[l + '_JAVA'] + '\' when dojo.locale is \'' + mocks[l] + '\'', function() {
            dojo.locale = mocks[l];
            expect(locale.toJavaLocale()).toBe(mocks[l + '_JAVA']);
         });
      });
   });
});
