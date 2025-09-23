/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/data/util/DomBuilder",
  "ic-share/fileviewer/bean/Bean",
  "ic-share/fileviewer/util/dom",
  "dojox/xml/parser",
  "dojo/text!../sample/personal_file.xml"
], function (DomBuilder, Bean, dom, parser, personalFileXml) {
  "use strict";

  describe("ic-share/fileviewer/data/util/DomBuilder", function () {
    var personalFileDoc = parser.parse(personalFileXml);

    describe("getPostBody()", function () {
      var bean, domBuilder;
      beforeEach(function () {
        bean = new Bean();
        domBuilder = new DomBuilder();
      });
      
      it("should set the category on the body if the item has a category", function () {
        bean.set("category", "testcategory");
        var postBodyDoc = parser.parse(domBuilder.getPostBody(bean));
        
        var category = dom.getFirstTag(postBodyDoc, "category");
        expect(category.getAttribute("term")).toBe("testcategory");
        expect(category.getAttribute("label")).toBe("testcategory");
        expect(category.getAttribute("scheme")).toBe("tag:ibm.com,2006:td/type");
      });
      
      it("should set all appropriate elements on the xml given a bean", function () {
        bean.set({
          canOthersShare: true,
          changeSummary: "Changes",
          versionUuid: 4,
          content: "testcontent",
          mimeType: "testmimetype"
        });
        var postBodyDoc = parser.parse(domBuilder.getPostBody(bean));
        
        expect(dom.getChildTextNS(postBodyDoc, "propagation", dom.NS.TD)).toBe("true");
        expect(dom.getChildTextNS(postBodyDoc, "changeSummary", dom.NS.TD)).toBe("Changes");
        expect(dom.getChildTextNS(postBodyDoc, "versionUuid", dom.NS.TD)).toBe("4");
        expect(dom.getChildTextNS(postBodyDoc, "content", dom.NS.ATOM)).toBe("testcontent");
      });
    });
  });
});
