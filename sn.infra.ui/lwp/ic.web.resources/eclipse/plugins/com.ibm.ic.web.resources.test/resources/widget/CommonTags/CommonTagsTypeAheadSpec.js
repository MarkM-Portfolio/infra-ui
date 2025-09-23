/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "ic-core/CommonTags/CommonTagsTypeAhead",
      "dojo/dom-construct"
], function(CommonTagsTypeAhead, domConstruct) {

   describe("CommonTagsTypeAhead", function() {
      var typeahead;
      beforeEach(function() {
         typeahead = new CommonTagsTypeAhead({}, domConstruct.create('div'));
      });
      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(typeahead.formatItem).toEqual(jasmine.any(Function));
         });
      });
      describe("the formatItem() method", function() {
         it("returns the item if it's a string", function() {
            expect(typeahead.formatItem('')).toBe('');
            expect(typeahead.formatItem('foo bar')).toBe('foo bar');
            expect(typeahead.formatItem('<html>')).toBe('<html>');
            expect(typeahead.formatItem('<html>', true)).toBe('&lt;html&gt;');
         });
         it("returns the item's name if it's an object with a name property", function() {
            expect(typeahead.formatItem({
               name : 'Andreas Berzat'
            })).toBe('Andreas Berzat');
            expect(typeahead.formatItem({
               name : ''
            })).toBe('');
            expect(typeahead.formatItem({
               name : 'Andreas <b>Berzat</b>'
            })).toBe('Andreas <b>Berzat</b>');
            expect(typeahead.formatItem({
               name : 'Andreas <b>Berzat</b>'
            }, true)).toBe('Andreas &lt;b&gt;Berzat&lt;/b&gt;');
         });
         it("returns the item's displayName if it's an object with a displayName property", function() {
            expect(typeahead.formatItem({
               displayName : 'Dina Maroni'
            })).toBe('Dina Maroni');
            expect(typeahead.formatItem({
               displayName : ''
            })).toBe('');
            expect(typeahead.formatItem({
               displayName : 'Dina <b>Maroni</b>'
            })).toBe('Dina <b>Maroni</b>');
            expect(typeahead.formatItem({
               displayName : 'Dina <b>Maroni</b>'
            }, true)).toBe('Dina &lt;b&gt;Maroni&lt;/b&gt;');
         });
         it("returns the item's name if it's an object with both a name and a displayName property", function() {
            expect(typeahead.formatItem({
               name : 'Andreas Berzat',
               displayName : 'Dina Maroni'
            })).toBe('Andreas Berzat');
            expect(typeahead.formatItem({
               name : '',
               displayName : ''
            })).toBe('');
         });
      });
   });

});
