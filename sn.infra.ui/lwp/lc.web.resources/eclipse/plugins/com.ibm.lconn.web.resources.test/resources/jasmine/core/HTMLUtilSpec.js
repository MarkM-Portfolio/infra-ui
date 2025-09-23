/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.core.HTMLUtilSpec");

dojo.require("lconn.core.HTMLUtil");
dojo.require("dojox.lang.functional.object");

(function(object, HTMLUtil) {

   /**
    * Jasmine spec for HTMLUtil util
    * 
    * @module lconn.test.jasmine.core.HTMLUtilSpec
    */

   var EXPECTATIONS = {
      'foo' : 'foo',
      '<foo>' : '&lt;foo&gt;',
      'foo="bar"' : 'foo="bar"',
      'foo=\'bar\'' : 'foo=\'bar\'',
      'foo=\\bar\\' : 'foo=\\bar\\'
   }, EXPECTATIONS_INLINE = {
      'foo' : 'foo',
      '<foo>' : '&lt;foo&gt;',
      'foo="bar"' : 'foo=&#34;bar&#34;',
      'foo=\'bar\'' : 'foo=&#39;bar&#39;',
      'foo=\\bar\\' : 'foo=&#92;&#92;bar&#92;&#92;'
   }, EXPECTATIONS_Q = {
      'foo' : 'foo',
      '<foo>' : '<foo>',
      'foo="bar"' : 'foo=&#34;bar&#34;',
      'foo=\'bar\'' : 'foo=&#39;bar&#39;',
      'foo=\\bar\\' : 'foo=&#92;&#92;bar&#92;&#92;'
   };

   describe('the HTMLUtil util', function() {
      it('implements the expected methdos', function() {
         expect(HTMLUtil.escapeText).toEqual(jasmine.any(Function));
         expect(HTMLUtil.escapeInlineText).toEqual(jasmine.any(Function));
         expect(HTMLUtil.escape_q).toEqual(jasmine.any(Function));
         expect(HTMLUtil.setInnerTextNode).toEqual(jasmine.any(Function));
      });

      it('the escapeText() method returns the expected values - inline is false', function() {
         expect(HTMLUtil.escapeText()).toBe('');
         expect(HTMLUtil.escapeText('')).toBe('');
         object.forIn(EXPECTATIONS, function(value, key) {
            expect(HTMLUtil.escapeText(key)).toBe(value);
         });
      });

      it('the escapeText() method returns the expected values - inline is true', function() {
         expect(HTMLUtil.escapeText(undefined, true)).toBe('');
         expect(HTMLUtil.escapeText('', true)).toBe('');
         object.forIn(EXPECTATIONS_INLINE, function(value, key) {
            expect(HTMLUtil.escapeText(key, true)).toBe(value);
         });
      });

      it('the escapeInlineText() method is equivalent to escapeText() with inline true', function() {
         expect(HTMLUtil.escapeInlineText(undefined)).toEqual(HTMLUtil.escapeText(undefined, true));
         expect(HTMLUtil.escapeInlineText('')).toBe(HTMLUtil.escapeText('', true));
         object.forIn(EXPECTATIONS_INLINE, function(value, key) {
            expect(HTMLUtil.escapeInlineText(key)).toBe(HTMLUtil.escapeText(key, true));
         });
      });

      it('the escape_q() method returns the expected values', function() {
         expect(HTMLUtil.escape_q(undefined, true)).toBe('');
         expect(HTMLUtil.escape_q('', true)).toBe('');
         object.forIn(EXPECTATIONS_Q, function(value, key) {
            expect(HTMLUtil.escape_q(key, true)).toBe(value);
         });
      });
   });

}(dojox.lang.functional, lconn.core.HTMLUtil));
