/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/has",
   "ic-core/widget/mentions/MentionsDataFormatter"
], function (has, MentionsDataFormatter) {

   
   /**
    * Jasmine spec for {@link ic-core.widget.mentions.MentionsDataFormatter}
    * 
    * @module ic-test.mentions.MentionsDataFormatterSpec
    */
   var TEXT_DATA = {
      textData: [{
         type: "text",
         value: "foo"
      }, {
         type: "text",
         value: "bar"
      }]
   }, HTML_DATA = {
      textData: [{
         type: "html",
         value: "<b>foo</b>"
      }, {
         type: "html",
         value: "<i>bar</i>"
      }]
   }, MENTIONS_DATA = {
      textData: [{
         type: 'PersonMention',
         displayName: 'Amy Jones6',
         hasSymbol: true,
         userId: "4a603f91-d92b-4731-8b07-86f49b341c7e"
      }, {
         type: 'PersonMention',
         displayName: '%Amy &Jones2^',
         hasSymbol: false,
         userId: "4f9fdbcf-6f85-47f9-8a98-711f7ab03478"
      },{
         type: 'PersonMention',
         displayName: 'Amy <Jones14>',
         hasSymbol: false,
         userId: "1f4fdbgf-6f95-14f9-8a98-716f7ab11487"
      }]
   }, MIXED_DATA = {
      textData: [].concat(HTML_DATA.textData).concat(MENTIONS_DATA.textData).concat(TEXT_DATA.textData)
   };
   
   var FORMATTED = {
      TEXT_DATA: 'foobar',
      HTML_DATA: '<b>foo</b><i>bar</i>',
      MENTIONS_DATA : '<span class="vcard"><span class="fn">@Amy Jones6</span><span class="x-lconn-userid">4a603f91-d92b-4731-8b07-86f49b341c7e</span></span><span class="vcard"><span class="fn">%Amy &Jones2^</span><span class="x-lconn-userid">4f9fdbcf-6f85-47f9-8a98-711f7ab03478</span></span><span class="vcard"><span class="fn">Amy <Jones14></span><span class="x-lconn-userid">1f4fdbgf-6f95-14f9-8a98-716f7ab11487</span></span>'
   };
   FORMATTED.MIXED_DATA = FORMATTED.HTML_DATA + FORMATTED.MENTIONS_DATA + FORMATTED.TEXT_DATA;

   describe("the ic-core/widget/mentions/MentionsDataFormatter class", function() {
      var formatter;
      beforeEach(function() {
         formatter = new MentionsDataFormatter();
      });
   
      describe("interface", function() {
         it("implements the expected methods", function() {
            expect(formatter.formatData).toEqual(jasmine.any(Function));
         });
         it("implements the expected properties", function() {
            expect(formatter.mentionsContainer).not.toBeUndefined();
            expect(formatter.fnContainer).not.toBeUndefined();
            expect(formatter.idContainer).not.toBeUndefined();
         });
      });
   
      describe("the formatData() method", function() {
         it("returns an empty string when data is null or undefined", function() {
            expect(formatter.formatData()).toBe('');
            expect(formatter.formatData(null)).toBe('');
         });
         it("returns the expected string when data contains only text nodes", function() {
            expect(formatter.formatData(TEXT_DATA)).toBe(FORMATTED.TEXT_DATA);
         });
         it("returns the expected string when data contains only html nodes", function() {
            expect(formatter.formatData(HTML_DATA)).toBe(FORMATTED.HTML_DATA);
         });
         it("returns the expected string when data contains only mention nodes", function() {
            expect(formatter.formatData(MENTIONS_DATA)).toBe(FORMATTED.MENTIONS_DATA);
         });
         it("returns the expected string when data contains a mix of text, html and mention nodes", function() {
            expect(formatter.formatData(MIXED_DATA)).toBe(FORMATTED.MIXED_DATA);
         });
      });
   });
});
