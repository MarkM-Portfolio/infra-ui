/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/dom-construct",
      "dojo/dom-geometry",
      "ic-core/PeopleTypeAheadFormatMixin",
      "ic-core/globalization/bidiUtil"
], function(domConstruct, domGeom, PeopleTypeAheadFormatMixin, bidiUtil) {

   describe("the core.PeopleTypeAheadFormatMixin mixin", function() {
      var typeahead;

      beforeEach(function() {
         typeahead = new PeopleTypeAheadFormatMixin();
      });

      afterEach(function() {
         typeahead = undefined;
      });

      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(typeahead.formatItem).toEqual(jasmine.any(Function));
            expect(typeahead._getLabelFromItem).toEqual(jasmine.any(Function));
            expect(typeahead._htmlify).toEqual(jasmine.any(Function));
         });
      });

      describe("the method formatItem()", function() {
         it("returns a string value even if item and HTML are null", function() {
            var html = null;
            var item = null;
            var result = typeahead.formatItem(item, html);
            expect(typeof result == "string").toBeTruthy();
         });

         it("returns a string value when item doesnt inlcude quotes or commas, and html is true or false", function() {
            var html = true;
            var item = {
               name : "Notreal Guy",
               type : "0",
               uid : "notrealUID",
               userid : "d7d822c0-8396-102f-98c1-85b1e4fcc8a0"
            };
            var result = typeahead.formatItem(item, html);
            expect(result).not.toBeNull();
            expect(typeof result == "string").toBeTruthy();
            expect(result).toBe(domGeom.isBodyLtr() ? "Notreal Guy" : bidiUtil.enforceTextDirection("Notreal Guy", 'rtl'));
            html = false;
            result = typeahead.formatItem(item, html);
            expect(result).not.toBeNull();
            expect(typeof result == "string").toBeTruthy();
            expect(result).toBe(domGeom.isBodyLtr() ? "Notreal Guy" : bidiUtil.enforceTextDirection("Notreal Guy", 'rtl'));
         });

         it("returns a string value even if item includes quotes, and html is true or false", function() {
            var html = true;
            var item = {
               name : "Not\"real\" Guy",
               type : "0",
               uid : "notrealUID",
               userid : "d7d822c0-8396-102f-98c1-85b1e4fcc8a0"
            };
            var result = typeahead.formatItem(item, html);
            expect(result).not.toBeNull();
            expect(typeof result == "string").toBeTruthy();
            expect(result).toBe(domGeom.isBodyLtr() ? "Not&quot;real&quot; Guy" : bidiUtil.enforceTextDirection("Not&quot;real&quot; Guy", 'rtl'));

            html = false;
            result = typeahead.formatItem(item, html);
            expect(result).not.toBeNull();
            expect(typeof result == "string").toBeTruthy();
            expect(result).toBe(domGeom.isBodyLtr() ? 'Not"real" Guy' : bidiUtil.enforceTextDirection('Not"real" Guy', 'rtl'));
         });

         it("returns a string value even if item includes commas, and html is true or false", function() {
            var html = true;
            var item = {
               name : "Notreal, Guy",
               type : "0",
               uid : "notrealUID",
               userid : "d7d822c0-8396-102f-98c1-85b1e4fcc8a0"
            };
            var result = typeahead.formatItem(item, html);
            expect(result).not.toBeNull();
            expect(typeof result == "string").toBeTruthy();
            expect(result).toBe(domGeom.isBodyLtr() ? "Notreal, Guy" : bidiUtil.enforceTextDirection("Notreal, Guy", 'rtl'));

            html = false;
            result = typeahead.formatItem(item, html);
            expect(result).not.toBeNull();
            expect(typeof result == "string").toBeTruthy();
            expect(result).toBe(domGeom.isBodyLtr() ? "Notreal, Guy" : bidiUtil.enforceTextDirection("Notreal, Guy", 'rtl'));
         });
      });

      describe("the method _getLabelFromItem()", function() {
         it("returns the item's name, email and business owner when existing", function() {
            expect(typeahead._getLabelFromItem({
               name : 'doge',
               email : 'doge@example.com',
               businessOwner : 'doge inc.'
            })).toBe(domGeom.isBodyLtr() ? 'doge : doge inc. <doge@example.com>\u200E' : bidiUtil
                  .enforceTextDirection('doge : doge inc. \u200E<doge@example.com>\u200E', 'rtl'));
            expect(typeahead._getLabelFromItem({
               name : 'doge',
               member : 'doge@example.com',
               businessOwner : 'doge inc.'
            })).toBe(domGeom.isBodyLtr() ? 'doge : doge inc. <doge@example.com>\u200E' : bidiUtil
                  .enforceTextDirection('doge : doge inc. \u200E<doge@example.com>\u200E', 'rtl'));
         });
         it("returns the item's name and email when existing", function() {
            expect(typeahead._getLabelFromItem({
               name : 'doge',
               email : 'doge@example.com'
            })).toBe(domGeom.isBodyLtr() ? 'doge <doge@example.com>\u200E' : bidiUtil.enforceTextDirection('doge \u200E<doge@example.com>\u200E', 'rtl'));
            expect(typeahead._getLabelFromItem({
               name : 'doge',
               member : 'doge@example.com'
            })).toBe(domGeom.isBodyLtr() ? 'doge <doge@example.com>\u200E' : bidiUtil.enforceTextDirection('doge \u200E<doge@example.com>\u200E', 'rtl'));
         });
         it("returns the item's name when existing", function() {
            expect(typeahead._getLabelFromItem({
               name : 'doge'
            })).toBe(domGeom.isBodyLtr() ? 'doge' : bidiUtil.enforceTextDirection('doge', 'rtl'));
         });
         it("returns an empty string when the item doesn't have a name property", function() {
            expect(typeahead._getLabelFromItem({
               type : 'doge'
            })).toBe(domGeom.isBodyLtr() ? '' : bidiUtil.enforceTextDirection('', 'rtl'));
         });
         it("returns the argument when it's a string", function() {
            expect(typeahead._getLabelFromItem('doge')).toBe('doge');
         });
         it("returns an empty string when the item is null or undefined", function() {
            expect(typeahead._getLabelFromItem(null)).toBe(domGeom.isBodyLtr() ? '' : bidiUtil.enforceTextDirection('', 'rtl'));
            expect(typeahead._getLabelFromItem()).toBe(domGeom.isBodyLtr() ? '' : bidiUtil.enforceTextDirection('', 'rtl'));
         });
      });

      describe("the method _htmlify()", function() {
         it("correctly replaces entities", function() {
            expect(typeahead._htmlify('&<<..??>>"')).toBe('&amp;&lt;&lt;..??&gt;&gt;&quot;');
         });
         it("doesn't alter strings without HTML entities", function() {
            expect(typeahead._htmlify('galileo figaro magnifico')).toBe('galileo figaro magnifico');
         });
      });
   });
});
