/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/util/text"
], function (text) {
   "use strict";

   describe("ic-share/fileviewer/util/text", function () {
      describe("htmlify()", function () {
         it("should replace newlines with line break tags", function () {
            expect(text.htmlify("foo\nbar")).toEqual("foo<br>bar");
         });

         it("should replace newlines with line break tags in IE8", function () {
            var mockIE8 = window.mockIE8;
            window.mockIE8 = true;

            expect(text.htmlify("foo\nbar")).toEqual("foo<br>bar");

            window.mockIE8 = mockIE8;
         });

         it("should replace links with anchor tags", function () {
            expect(text.htmlify("https://foo.com")).toEqual('<a href="https://foo.com">https://foo.com</a>');
         });

         it("should replace duplicate spaces with non-breaking spaces", function () {
            expect(text.htmlify("    ")).toEqual(' &nbsp; &nbsp;');
         });

         it("should not fail if the string is empty", function () {
            expect(text.htmlify("")).toEqual("");
         });

         it("should not fail if the string is undefined", function () {
            expect(text.htmlify()).toEqual("");
         });
      });

      describe("trim()", function () {
         it("should do nothing for an all-letter string", function () {
            expect(text.trim("123")).toEqual("123");
         });

         it("should remove leading and trailing whitespace", function () {
            expect(text.trim("  123  ")).toEqual("123");
         });

         it("should truncate strings if a maxlength is given", function () {
            expect(text.trim("1234", 3)).toEqual('123');
         });

         it("should handle multi-byte files", function () {
            expect(text.trim("12\u00E0", 4)).toEqual('12\u00E0');
         });
      });

      describe("breakString()", function () {
         it("should not modify a string with no spaces", function () {
            var str = "LoremIpsumDolorSitAmet";
            expect(text.breakString(str)).toBe(str);
         });

         it("should not replace the first character in the string", function () {
            var str = " lorem";
            expect(text.breakString(str)).toBe(str);
         });

         it("should not replace the last character in the string", function () {
            var str = "lorem ";
            expect(text.breakString(str)).toBe(str);
         });

         it("should break the string if the only space is in the first half", function () {
            var input = "Lorem IpsumDolorSitAmet",
               expected = "Lorem<br />IpsumDolorSitAmet";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break the string if the only space is in the last half", function () {
            var input = "LoremIpsumDolorSit Amet",
               expected = "LoremIpsumDolorSit<br />Amet";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break the string if the only space is in the last character in the first half", function () {
            var input = "LoremIpsum DolorSitAmet",
               expected = "LoremIpsum<br />DolorSitAmet";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break the string if the only space is exactly in the middle", function () {
            var input = "LoremIpsumD olorSitAmet",
               expected = "LoremIpsumD<br />olorSitAmet";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break the string if the first character in the last half", function () {
            var input = "LoremIpsumDo lorSitAmet",
            expected = "LoremIpsumDo<br />lorSitAmet"
               expect(text.breakString(input)).toEqual(expected);
         });

         it("should break the string closest to the center if the closest space is in the first half", function () {
            var input = "Lo re mI psu mDolor Sit Amet",
               expected = "Lo re mI psu<br />mDolor Sit Amet";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break the string closest to the center if the closest space is in the last half", function () {
            var input = "Lo re mI psumDo lor Sit Amet",
               expected = "Lo re mI psumDo<br />lor Sit Amet";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break the string in the middle if there is a space in the middle even if there are other spaces", function () {
            var input = "Lo re mI psum D o lor Sit Amet",
               expected = "Lo re mI psum D<br />o lor Sit Amet";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break in the middle of even-length strings", function () {
            var input = "am et",
               expected = "am<br />et";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break one to the left of the middle in odd-length strings", function () {
            var input = "do lor",
               expected = "do<br />lor";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break one to the right of the middle in odd-length strings", function () {
            var input = "do lor",
               expected = "do<br />lor";

            expect(text.breakString(input)).toEqual(expected);
         });

         it("should break one to the right of the middle in odd-length strings", function () {
            var input = "dol or",
               expected = "dol<br />or";

            expect(text.breakString(input)).toEqual(expected);
         });
      });
   });
});
