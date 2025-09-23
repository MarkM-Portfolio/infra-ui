/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/dom-attr",
   "ic-core/widget/mentions/URLMentionsNode"
], function (dojo, domAttr, URLMentionsNode) {

   /**
    * Jasmine spec for {@link ic-core.widget.mentions.URLMentionsNode}
    *
    * @module ic-test.mentions.URLMentionsNodeSpec
    */
   var node;
   beforeEach(function() {
      node = new URLMentionsNode();
   });

   describe("the ic-core/widget/mentions/URLMentionsNode class", function() {
      it("implements the expected methods", function() {
         expect(node.setValue).toEqual(jasmine.any(Function));
         expect(node.toJsonString).toEqual(jasmine.any(Function));
      });

      it("implements the expected properties", function() {
         expect(node.templatePath).not.toBeUndefined();
         expect(node.symbol).not.toBeUndefined();
         expect(node.type).not.toBeUndefined();
         expect(node.hasPreview).not.toBeUndefined();

         expect(node.className).toBe("URLMentionsNode");
      });

      it("implements the expected static properties", function() {
         expect(URLMentionsNode.TYPE).toBe("URLMentions");
      });
   });

   describe("the ic-core/widget/mentions/URLMentionsNode.setValue() method", function() {
      it("sets the value", function() {
         node.setValue('http://www.ibm.com');
         expect(node.value).toBe('http://www.ibm.com');
         expect(node.href).toBe('http://www.ibm.com');

         node.setValue('www.ibm.com');
         expect(node.value).toBe('www.ibm.com');
         expect(node.href).toBe('http://www.ibm.com');

         node.setValue('HTTP://WWW.IBM.COM');
         expect(node.value).toBe('HTTP://WWW.IBM.COM');
         expect(node.href).toBe('HTTP://WWW.IBM.COM');
      });
      it("sets the expected attributes", function() {
         node.setValue('http://www.ibm.com');
         expect(domAttr.get(node.linkNode, "class")).toBe('');
         expect(domAttr.get(node.linkNode, "target")).toBe('_blank');
         expect(domAttr.get(node.linkNode, "href")).toBe(node.href);
      });
   });

   describe("the ic-core/widget/mentions/URLMentionsNode.toJsonString() method", function() {
      it("returns the expected JSON value", function() {
         node.setValue('www.ibm.com');
         expect(node.toJsonString()).toEqual({
            type : 'URLMentions',
            value : 'www.ibm.com',
            hasSymbol : false,
            hasPreview : false,
            previewData : '',
            href : 'http://www.ibm.com'
         });
      });
   });
});
