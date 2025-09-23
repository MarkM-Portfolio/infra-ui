/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for lconn.core.TypeAheadFormatMixin.
 * 
 * @namespace lconn.test.jasmine.core.TypeAheadFormatMixinSpec
 */
dojo.provide("lconn.test.jasmine.core.TypeAheadFormatMixinSpec");

dojo.require("lconn.core.TypeAheadFormatMixin");

(function(TypeAheadFormatMixin) {
   describe("the interface of lconn.core.TypeAheadFormatMixin", function() {
      var typeahead;
      beforeEach(function() {
         typeahead = new TypeAheadFormatMixin();
      });
      afterEach(function() {});
      it('implements the expected methods', function() {
         expect(typeahead.formatItem).toEqual(jasmine.any(Function));
         expect(typeahead.formatItemHtml).toEqual(jasmine.any(Function));
         expect(typeahead._getLabelFromItem).toEqual(jasmine.any(Function));
         expect(typeahead._getMenuLabelFromItem).toEqual(jasmine.any(Function));
      });
   });

   describe("the method lconn.core.TypeAheadFormatMixin.formatItem()", function() {
      var typeahead;
      beforeEach(function() {
         typeahead = new TypeAheadFormatMixin();
      });
      it('correctly formats items', function() {
         var ITEM = "<p>A paragraph with <b>bold text</b></p>", ENCODED_ITEM = "&lt;p&gt;A paragraph with &lt;b&gt;bold text&lt;/b&gt;&lt;/p&gt;";
         expect(typeahead.formatItem(null)).toBeNull();
         expect(typeahead.formatItem('')).toBe('');
         expect(typeahead.formatItem(ITEM)).toBe(ITEM);

         expect(typeahead.formatItem(null, true)).toBe('');
         expect(typeahead.formatItem('', true)).toBe('');
         expect(typeahead.formatItem(ITEM, true)).toBe(ENCODED_ITEM);
      });
   });

   describe("the method lconn.core.TypeAheadFormatMixin.formatItemHtml()", function() {
      var typeahead;
      beforeEach(function() {
         typeahead = new TypeAheadFormatMixin();
      });
      it('correctly formats items', function() {
         var ITEM = "<p>A paragraph with <b>bold text</b></p>", ENCODED_ITEM = "&lt;p&gt;A paragraph with &lt;b&gt;bold text&lt;/b&gt;&lt;/p&gt;";
         expect(typeahead.formatItemHtml(ITEM)).toBe(ENCODED_ITEM);
      });
   });

   describe("the method lconn.core.TypeAheadFormatMixin._getMenuLabelFromItem()", function() {
      var typeahead;
      beforeEach(function() {
         typeahead = new TypeAheadFormatMixin();
      });
      afterEach(function() {});
      it('correctly highlights matches', function() {
         typeahead.focusNode = {
            value : 'Amy'
         };
         // Full name match
         expect(typeahead._getMenuLabelFromItem('Amy Jones2').label).toBe('<b>Amy</b> Jones2');
         // Full middle name match
         expect(typeahead._getMenuLabelFromItem('Mrs. Amy Jones2').label).toBe('Mrs. <b>Amy</b> Jones2');
         // Beginning of name
         expect(typeahead._getMenuLabelFromItem('Amygail Jones2').label).toBe('<b>Amy</b>gail Jones2');
         // Beginning of surname
         expect(typeahead._getMenuLabelFromItem('Her Amyness').label).toBe('Her <b>Amy</b>ness');
      });
      it('ignores entities while matching', function() {
         typeahead.focusNode = {
            value : 'lt'
         };
         expect(typeahead._getMenuLabelFromItem('Pete <Maverick> Mitchell').label).toBe('Pete &lt;Maverick&gt; Mitchell');
         typeahead.focusNode = {
            value : 'gt'
         };
         expect(typeahead._getMenuLabelFromItem('Nick <Goose> Bradshaw').label).toBe('Nick &lt;Goose&gt; Bradshaw');
         typeahead.focusNode = {
            value : 'amp'
         };
         expect(typeahead._getMenuLabelFromItem('Tom & Jerry').label).toBe('Tom &amp; Jerry');
      });
      it('correctly highlights matches that can be encoded to entities', function() {
         typeahead.focusNode = {
            value : '<'
         };
         expect(typeahead._getMenuLabelFromItem('Pete <Maverick> Mitchell').label).toBe('Pete <b>&lt;</b>Maverick&gt; Mitchell');
         typeahead.focusNode = {
            value : '>'
         };
         expect(typeahead._getMenuLabelFromItem('Nick <Goose> Bradshaw').label).toBe('Nick &lt;Goose<b>&gt;</b> Bradshaw');
         typeahead.focusNode = {
            value : '&'
         };
         expect(typeahead._getMenuLabelFromItem('Tom & Jerry').label).toBe('Tom <b>&amp;</b> Jerry');
      });
   });
}(lconn.core.TypeAheadFormatMixin));
