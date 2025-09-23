/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("lconn.share.test.widget.CommentsMentionsStreamRendererSpec");
   dojo.require("dojo.cache");
   dojo.require("dojo.date.stamp");
   dojo.require("lconn.share.widget.CommentMentionsStreamRenderer");

   describe("lconn.share.test.widget.CommentsMentionsStreamRenderer", function() {
      var renderer = null;

      it("renderer instance can be created", function() {
         renderer = new lconn.share.widget.CommentMentionsStreamRenderer({});
         expect(renderer).not.toBe(null);
      });

      it("and has function unEscapeText(..)", function() {
         expect(renderer.unEscapeText).toBeDefined();
      });
      
      if ( dojo.isIE == 8 ) {
         describe("continue with IE 8 browser specific tests", function() {

            it("unEscapeText(<string with two spaces>) returns <string with one space and one non-breaking space>", function() {
               expect(renderer.unEscapeText("TextBeforeTwoSpaces  TextAfterTwoSpaces")).toBe("TextBeforeTwoSpaces &nbsp;TextAfterTwoSpaces");
            });

            it("unEscapeText(<string with three spaces>) returns <string with ' &nbsp; '>", function() {
               expect(renderer.unEscapeText("TextBeforeTwoSpaces   TextAfterTwoSpaces")).toBe("TextBeforeTwoSpaces &nbsp; TextAfterTwoSpaces");
            });
         });
      }
      else {
         describe("continue with specific tests for non IE 8 browsers", function() {

            it("unEscapeText(<string with two spaces>) returns <string with two spaces>", function() {
               expect(renderer.unEscapeText("TextBeforeTwoSpaces  TextAfterTwoSpaces")).toBe("TextBeforeTwoSpaces  TextAfterTwoSpaces");
            });

            it("unEscapeText(<string with three spaces>) returns <string with three spaces>", function() {
               expect(renderer.unEscapeText("TextBeforeTwoSpaces   TextAfterTwoSpaces")).toBe("TextBeforeTwoSpaces   TextAfterTwoSpaces");
            });
         });
      }
   });
}());
