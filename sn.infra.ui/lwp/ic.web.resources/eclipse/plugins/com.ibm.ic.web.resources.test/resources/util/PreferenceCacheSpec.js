/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/lang",
   "dojo/json",
   "ic-core/util/PreferenceCache"
], function (lang, JSON, PreferenceCache) {

/**
 * Jasmine spec for the Preference Cache utility
 * @module ic-test.util.PreferenceCacheSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
   var ICPREFS = 'icprefs';
   describe("the interface of ic-core/util/PreferenceCache", function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(PreferenceCache.get)).toBeTruthy();
         expect(lang.isFunction(PreferenceCache.set)).toBeTruthy();
         expect(lang.isFunction(PreferenceCache.unset)).toBeTruthy();
         expect(lang.isFunction(PreferenceCache.clear)).toBeTruthy();
      });
   });

   describe("the method ic-core/util/PreferenceCache::get()", function() {
      beforeEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      afterEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      it('returns the expected value', function() {
         PreferenceCache.set('a', 'b');
         expect(PreferenceCache.get('a')).toEqual('b');

         var o = {a:'b',c:1};
         PreferenceCache.set('o', o);
         expect(PreferenceCache.get('o')).toEqual(o);
      });
   });

   describe("the method ic-core/util/PreferenceCache::set()", function() {
      beforeEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      afterEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      it('sets the expected scalar value', function() {
         PreferenceCache.set('a', 'b');
         expect(localStorage.getItem(ICPREFS)).not.toBeNull();
         expect(JSON.parse(localStorage.getItem(ICPREFS)).a).not.toBeNull();
         expect(JSON.parse(localStorage.getItem(ICPREFS)).a).toEqual('b');
      });
      it('sets the expected object value', function() {
         var o = {a:'d',d:4};
         PreferenceCache.set('m', o);
         expect(localStorage.getItem(ICPREFS)).not.toBeNull();
         expect(localStorage.getItem(ICPREFS).m).not.toBeNull();
         expect(JSON.parse(localStorage.getItem(ICPREFS)).m).toEqual(o);
      });
   });
   describe("the method ic-core/util/PreferenceCache::unset()", function() {
      beforeEach(function() {
         localStorage.removeItem(ICPREFS);
         localStorage.setItem(ICPREFS, JSON.stringify({a: 123, b: 456}));
      });
      afterEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      it('unsets the values correctly', function() {
         PreferenceCache.unset('a');
         expect(localStorage.getItem(ICPREFS)).not.toBeNull();
         expect(JSON.parse(localStorage.getItem(ICPREFS)).a).toBe(undefined);
         expect(JSON.parse(localStorage.getItem(ICPREFS)).b).not.toBeNull();
         expect(JSON.parse(localStorage.getItem(ICPREFS)).b).toBe(456);
         expect(PreferenceCache.get('a')).toBe(undefined);
         expect(PreferenceCache.get('b')).toBe(456);
      });
   });
   describe("the method ic-core/util/PreferenceCache::clear()", function() {
      beforeEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      afterEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      it('clears cached preferences correctly', function() {
         PreferenceCache.set('a', 9);
         PreferenceCache.set('b', {i:1,j:2});
         PreferenceCache.clear();
         expect(localStorage.getItem(ICPREFS)).toBeNull();
         expect(PreferenceCache.get('a')).toBe(undefined);
         expect(PreferenceCache.get('b')).toBe(undefined);
      });
   });
});
