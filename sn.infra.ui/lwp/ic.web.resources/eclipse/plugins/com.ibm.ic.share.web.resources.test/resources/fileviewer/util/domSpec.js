/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/util/dom",
  "dojox/xml/parser",
  "dojo/text!../data/sample/personal_file.xml"
], function (dom, parser, personalFileXml) {
  "use strict";

  describe("ic-share/fileviewer/util/dom", function () {
    var personalFileDoc = parser.parse(personalFileXml);

    describe("getAllUsers()", function () {
      it("should return users as an array", function () {
        var users = dom.getAllUsers(personalFileDoc, "modifier", dom.NS.TD);
        expect(users.length).toBe(1);
        expect(users[0].name).toBe("John Girata (modifier)");
      });
    });
    
    describe("getChildTextNSScheme()", function () {
      it("should return the child text of the element", function () {
        expect(dom.getChildTextNSScheme(personalFileDoc, "rank", dom.NS.SNX, "recommendations")).toBe("8");
        expect(dom.getChildTextNSScheme(personalFileDoc, "rank", dom.NS.SNX, "versions")).toBe("3");
        expect(dom.getChildTextNSScheme(personalFileDoc, "rank", dom.NS.SNX, "references")).toBe("0");
      });
    });

    describe("getChildAttrNS()", function () {
       beforeEach(function () {
          this.doc = parser.parse('<foo xmlns:td="urn:ibm.com/td" xmlns="http://www.w3.org/2005/Atom"><td:bar myAttr="myValue">myContent</td:bar></foo>');
       });

       it("should return the attribute value if the tag and attribute exist", function () {
          expect(dom.getChildAttrNS(this.doc, "bar", dom.NS.TD, "myAttr")).toEqual("myValue");
       });

       it("should return null if the attribute does not exist", function () {
          expect(dom.getChildAttrNS(this.doc, "bar", dom.NS.TD, "myMissingAttr")).toBeNull();
       });

       it("should return undefined if the node does not exist", function () {
          expect(dom.getChildAttrNS(this.doc, "missingNode", dom.NS.TD, "myAttr")).not.toBeDefined();
       });
    });
  });
});
