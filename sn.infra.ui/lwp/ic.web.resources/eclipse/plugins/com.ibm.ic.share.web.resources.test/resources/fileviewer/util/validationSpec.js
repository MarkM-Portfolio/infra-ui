/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dojo/dom-construct",
  "dojo/query",
  "ic-share/fileviewer/util/validation"
], function (declare, _WidgetBase, domConstruct, query, validation) {
  "use strict";

  var MockCommentBox = declare([_WidgetBase], {
    value: "",
    postCreate: function() {
      this.textAreaContainer = this.domNode;
    },
    setValue: function (value) {
      this.value = value;
    },
    getValue: function () {
      return this.value;
    },
  });
  
  var MockTagTextBox = declare([_WidgetBase], {
    tags: "",
    postCreate: function() {
      this.inputContainer = this.domNode;
    },
    getValue: function () {
      return this.tags.split(/\s+/g);
    },
    
    setValue: function (tags) {
      this.tags = tags.join(" ");
    },
  });
  
  describe("ic-share/fileviewer/util/validation", function () {
    var fixture;
    beforeEach(function () {
      fixture = domConstruct.create("div", null, document.getElementsByTagName("body")[0]);
    });
    
    afterEach(function () {
      domConstruct.destroy(fixture);
    });
    
    describe("validateComment()", function () {
      var commentBox;
      beforeEach(function () {
        commentBox = new MockCommentBox();
        commentBox.placeAt(fixture);
        validation.COMMENT_LENGTH = 7;
      });
      
      it("should return true for a comment less than max length", function () {
        commentBox.setValue("12345");
        expect(validation.validateComment(commentBox)).toBe(true);
      });
      
      it("should return true for a comment with spaces less than max length", function () {
        commentBox.setValue("test c");
        expect(validation.validateComment(commentBox)).toBe(true);
      });
      
      it("should return true for a comment equal to max length", function () {
        commentBox.setValue("1234567");
        expect(validation.validateComment(commentBox)).toBe(true);
      });
      
      it("should return false and properly shorten a comment greater than max length", function () {
        commentBox.setValue("123456789");
        expect(validation.validateComment(commentBox)).toBe(false);
        fixValidationIssue();
        expect(commentBox.getValue()).toBe("1234567");
      });
      
      it("should return false and properly shorten a long comment greater than max length", function () {
        validation.COMMENT_LENGTH = 201;
        
        var comment = 
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
          "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
          "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit " +
          "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
          "culpa qui officia deserunt mollit anim id est laborum.";
        var expected =
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al";
        
        commentBox.setValue(comment);
        expect(validation.validateComment(commentBox)).toBe(false);
        fixValidationIssue();
        expect(commentBox.getValue()).toBe(expected);
      });
      
      it("should only ever add one shorten link if called multiple times", function () {
        commentBox.setValue("123456789");
        
        validation.validateComment(commentBox);
        expect(query(".ics-viewer-validation a", fixture).length).toBe(1);
        
        validation.validateComment(commentBox);
        expect(query(".ics-viewer-validation a", fixture).length).toBe(1);
        
        fixValidationIssue();
        expect(query(".ics-viewer-validation a", fixture).length).toBe(0);
        
        validation.validateComment(commentBox);
        expect(query(".ics-viewer-validation a", fixture).length).toBe(0);
        
        commentBox.setValue("1234567891011");
        validation.validateComment(commentBox);
        expect(query(".ics-viewer-validation a", fixture).length).toBe(1);
        
        validation.validateComment(commentBox);
        expect(query(".ics-viewer-validation a", fixture).length).toBe(1);
      });
    });
    
    describe("validateTags()", function () {
      var tagTextBox;
      beforeEach(function () {
        tagTextBox = new MockTagTextBox();
        tagTextBox.placeAt(fixture);
        validation.TAG_LENGTH = 7;
      });
      
      it("should return true for a single tag less than max length", function () {
        tagTextBox.setValue(["12345"]);
        expect(validation.validateTags(tagTextBox)).toBe(true);
      });
      
      it("should return true for a single tag greater than max length", function () {
        tagTextBox.setValue(["123456789"]);
        expect(validation.validateTags(tagTextBox)).toBe(false);
      });
      
      it("should return true for a multiple tags less than max length", function () {
        tagTextBox.setValue(["12345",  "123",  "1234567", "1234", "12"]);
        expect(validation.validateTags(tagTextBox)).toBe(true);
      });
      
      it("should return false for multiple tags where one is greater than max length", function () {
        tagTextBox.setValue(["12345",  "123",  "1234567", "123456789", "12"]);
        expect(validation.validateTags(tagTextBox)).toBe(false);
      });
      
      it("should return false for multiple tags where multiple are greater than max length", function () {
        tagTextBox.setValue(["12345",  "12345678",  "1234567", "123456789", "12"]);
        expect(validation.validateTags(tagTextBox)).toBe(false);
      });
      
      it("should shorten tags greater than max length when the shorten link is clicked", function () {
        tagTextBox.setValue(["12345",  "12345678",  "1234567", "123456789", "12"]);
        expect(validation.validateTags(tagTextBox)).toBe(false);
        fixValidationIssue();
        expect(tagTextBox.getValue()).toEqual(["12345",  "1234567",  "1234567", "1234567", "12"]);
      });
    });

    describe("validateDescription()", function () {
       beforeEach(function () {
          this.editBox = {
             get: function () {
                return;
             }
          };

          this.validateLength = validation.validateLength;
          spyOn(validation, "validateLength");
       });

       afterEach(function () {
          validation.validateLength = this.validateLength;
       });

       it("should default to a length of 2048", function () {
          validation.validateDescription(this.editBox);
          expect(validation.validateLength).toHaveBeenCalled();
          expect(validation.validateLength.calls.argsFor(0)[0].maxLength).toBe(2048);
       });

       it("should accept an overridden length", function () {
          validation.validateDescription(this.editBox, { maxLength: 2044 });
          expect(validation.validateLength).toHaveBeenCalled();
          expect(validation.validateLength.calls.argsFor(0)[0].maxLength).toBe(2044);
       });
    });
    
    function fixValidationIssue() {
      query(".ics-viewer-validation a", fixture)[0].click();
    }
  });
});
