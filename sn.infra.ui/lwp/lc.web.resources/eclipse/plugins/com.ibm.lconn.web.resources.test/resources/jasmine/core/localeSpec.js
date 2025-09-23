/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.localeSpec");

dojo.require("lconn.core.locale");
dojo.require("lconn.test.mocks.locale");

/**
 * Jasmine spec for lconn.core.locale
 * @module lconn.test.jasmine.core.localeSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(lcl, mocks) {
	var LANGS = 'EN_US|PT|PT_BR|HE|NB';
	describe('the interface of lconn.core.locale', function() {
		it('implements the expected methods', function() {
			expect(dojo.isFunction(lcl.getLocale)).toBeTruthy();
			expect(dojo.isFunction(lcl.getLanguage)).toBeTruthy();
			expect(dojo.isFunction(lcl.getCountry)).toBeTruthy();
			expect(dojo.isFunction(lcl.toJavaLocale)).toBeTruthy();
		});
	});

	describe('the method lconn.core.locale.getLocale()', function() {
		var locale;
		beforeEach(function() {
			locale = dojo.locale;
		});
		afterEach(function() {
			dojo.locale = locale;
		});
		dojo.forEach(LANGS.split('|'), function(l) {
			it('returns \'' + mocks[l] + '\' when dojo.locale is \'' + mocks[l] + '\'', function() {
				dojo.locale = mocks[l];
				expect(lcl.getLocale()).toBe(mocks[l]);
			});
		});
	});

	describe('the method lconn.core.locale.getLanguage()', function() {
		var locale;
		beforeEach(function() {
			locale = dojo.locale;
		});
		afterEach(function() {
			dojo.locale = locale;
		});
		dojo.forEach(LANGS.split('|'), function(l) {
			it('returns \'' + mocks[l+'_LANG'] + '\' when dojo.locale is \'' + mocks[l] + '\'', function() {
				dojo.locale = mocks[l];
				expect(lcl.getLanguage()).toBe(mocks[l+'_LANG']);
			});
		});
	});

	describe('the method lconn.core.locale.getCountry()', function() {
		var locale;
		beforeEach(function() {
			locale = dojo.locale;
		});
		afterEach(function() {
			dojo.locale = locale;
		});
		dojo.forEach(LANGS.split('|'), function(l) {
			it('returns \'' + mocks[l+'_COUNTRY'] + '\' when dojo.locale is \'' + mocks[l] + '\'', function() {
				dojo.locale = mocks[l];
				expect(lcl.getCountry()).toBe(mocks[l+'_COUNTRY']);
			});
		});
	});
	
	describe('the method lconn.core.locale.getVariant()', function() {
		var locale;
		beforeEach(function() {
			locale = dojo.locale;
		});
		afterEach(function() {
			dojo.locale = locale;
		});
		dojo.forEach(LANGS.split('|'), function(l) {
			it('returns \'\' when dojo.locale is \'' + mocks[l] + '\'', function() {
				dojo.locale = mocks[l];
				expect(lcl.getVariant()).toBe('');
			});
		});
	});
	
	describe('the method lconn.core.locale.toJavaLocale()', function() {
		var locale;
		beforeEach(function() {
			locale = dojo.locale;
		});
		afterEach(function() {
			dojo.locale = locale;
		});
		dojo.forEach(LANGS.split('|'), function(l) {
			it('returns \'' + mocks[l+'_JAVA'] + '\' when dojo.locale is \'' + mocks[l] + '\'', function() {
				dojo.locale = mocks[l];
				expect(lcl.toJavaLocale()).toBe(mocks[l+'_JAVA']);
			});
		});
	});
}(lconn.core.locale, lconn.test.mocks.locale));
