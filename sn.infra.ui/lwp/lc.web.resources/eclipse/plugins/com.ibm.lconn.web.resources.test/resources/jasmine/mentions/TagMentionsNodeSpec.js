/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link lconn.core.widget.mentions.TagMentionsNode}
 * 
 * @module lconn.test.jasmine.mentions.TagMentionsNodeSpec
 */
dojo.provide("lconn.test.jasmine.mentions.TagMentionsNodeSpec");

dojo.require("lconn.core.widget.mentions.TagMentionsNode");

(function(TagMentionsNode) {

   var node;
   beforeEach(function() {
      node = new TagMentionsNode();
   });

   describe("the lconn.core.widget.mentions.TagMentionsNode class", function() {
      it("implements the expected methods", function() {
         expect(node.toJsonString).toEqual(jasmine.any(Function));
      });

      it("implements the expected properties", function() {
         expect(node.type).not.toBeUndefined();

         expect(node.symbol).toBe('#');
         expect(node.className).toBe("TagMentionsNode");
      });

      it("implements the expected static properties", function() {
         expect(lconn.core.widget.mentions.TagMentionsNode.TYPE).toBe("TagMentions");
      });
   });

   describe("the lconn.core.widget.mentions.TagMentionsNode.toString() method", function() {
      it("returns the value", function() {
         node.setValue('social-business');
         expect(node.toString()).toBe('social-business');
      });
   });

   describe("the lconn.core.widget.mentions.TagMentionsNode.toJsonString() method", function() {
      it("returns the expected JSON value", function() {
         node.setValue('sentiment-analytics');
         expect(node.toJsonString()).toEqual({
            type : 'TagMentions',
            value : 'sentiment-analytics'
         });

         node.setValue('bigdata');
         expect(node.toJsonString()).toEqual({
            type : 'TagMentions',
            value : 'bigdata'
         });
      });
   });
}(lconn.core.widget.mentions.TagMentionsNode));

