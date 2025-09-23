/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.util.PreferenceCacheSpec");
dojo.require("lconn.core.util.PreferenceCache");

/**
 * Jasmine spec for the Preference Cache utility
 * @module lconn.test.jasmine.util.PreferenceCacheSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(cache) {
   var ICPREFS = 'icprefs';
   describe("the interface of lconn.test.util.PreferenceCache", function() {
      it('implements the expected methods', function() {
         expect(dojo.isFunction(cache.get)).toBeTruthy();
         expect(dojo.isFunction(cache.set)).toBeTruthy();
         expect(dojo.isFunction(cache.unset)).toBeTruthy();
         expect(dojo.isFunction(cache.clear)).toBeTruthy();
      });
   });
   
   describe("the method lconn.test.util.PreferenceCache.get()", function() {
      beforeEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      afterEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      it('returns the expected value', function() {
         cache.set('a', 'b');
         expect(cache.get('a')).toEqual('b');
         
         var o = {a:'b',c:1};
         cache.set('o', o);
         expect(cache.get('o')).toEqual(o);
      });
   });
   
   describe("the method lconn.test.util.PreferenceCache.set()", function() {
      beforeEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      afterEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      it('sets the expected scalar value', function() {
         cache.set('a', 'b');
         expect(localStorage.getItem(ICPREFS)).not.toBeNull();
         expect(dojo.fromJson(localStorage.getItem(ICPREFS))['a']).not.toBeNull();
         expect(dojo.fromJson(localStorage.getItem(ICPREFS))['a']).toEqual('b');
      });
      it('sets the expected object value', function() {
         var o = {a:'d',d:4};
         cache.set('m', o);
         expect(localStorage.getItem(ICPREFS)).not.toBeNull();
         expect(localStorage.getItem(ICPREFS)['m']).not.toBeNull();
         expect(dojo.fromJson(localStorage.getItem(ICPREFS))['m']).toEqual(o);
      });
   });
   describe("the method lconn.test.util.PreferenceCache.unset()", function() {
      beforeEach(function() {
         localStorage.removeItem(ICPREFS);
         localStorage.setItem(ICPREFS, dojo.toJson({a: 123, b: 456}));
      });
      afterEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      it('unsets the values correctly', function() {
         cache.unset('a');
         expect(localStorage.getItem(ICPREFS)).not.toBeNull();
         expect(dojo.fromJson(localStorage.getItem(ICPREFS))['a']).toBe(undefined);
         expect(dojo.fromJson(localStorage.getItem(ICPREFS))['b']).not.toBeNull();
         expect(dojo.fromJson(localStorage.getItem(ICPREFS))['b']).toBe(456);
         expect(cache.get('a')).toBe(undefined);
         expect(cache.get('b')).toBe(456);
      });
   });
   describe("the method lconn.test.util.PreferenceCache.clear()", function() {
      beforeEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      afterEach(function() {
         localStorage.removeItem(ICPREFS);
      });
      it('clears cached preferences correctly', function() {
         cache.set('a', 9);
         cache.set('b', {i:1,j:2});
         cache.clear();
         expect(localStorage.getItem(ICPREFS)).toBeNull();
         expect(cache.get('a')).toBe(undefined);
         expect(cache.get('b')).toBe(undefined);
      });
   });
}(lconn.core.util.PreferenceCache));
