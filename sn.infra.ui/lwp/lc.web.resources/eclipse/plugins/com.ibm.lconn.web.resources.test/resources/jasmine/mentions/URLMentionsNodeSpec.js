/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link lconn.core.widget.mentions.URLMentionsNode}
 * 
 * @module lconn.test.jasmine.mentions.URLMentionsNodeSpec
 */
dojo.provide("lconn.test.jasmine.mentions.URLMentionsNodeSpec");

dojo.require("lconn.core.widget.mentions.URLMentionsNode");

(function(URLMentionsNode) {

   var node;
   beforeEach(function() {
      node = new URLMentionsNode();
   });

   describe("the lconn.core.widget.mentions.URLMentionsNode class", function() {
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
         expect(lconn.core.widget.mentions.URLMentionsNode.TYPE).toBe("URLMentions");
      });
   });

   describe("the lconn.core.widget.mentions.URLMentionsNode.setValue() method", function() {
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
         expect(dojo.attr(node.linkNode, "class")).toBe('');
         expect(dojo.attr(node.linkNode, "target")).toBe('_blank');
         expect(dojo.attr(node.linkNode, "href")).toBe(node.href);
      });
   });

   describe("the lconn.core.widget.mentions.URLMentionsNode.toJsonString() method", function() {
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
}(lconn.core.widget.mentions.URLMentionsNode));

