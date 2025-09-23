/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
        "ic-core/widget/mentions/TagMentionsNode"
], function (TagMentionsNode) {

   /**
    * Jasmine spec for {@link ic-core.widget.mentions.TagMentionsNode}
    * 
    * @module ic-test.mentions.TagMentionsNodeSpec
    */
   var node;
   beforeEach(function() {
      node = new TagMentionsNode();
   });

   describe("the ic-core/widget/mentions/TagMentionsNode class", function() {
      it("implements the expected methods", function() {
         expect(node.toJsonString).toEqual(jasmine.any(Function));
      });

      it("implements the expected properties", function() {
         expect(node.type).not.toBeUndefined();

         expect(node.symbol).toBe('#');
         expect(node.className).toBe("TagMentionsNode");
      });

      it("implements the expected static properties", function() {
         expect(TagMentionsNode.TYPE).toBe("TagMentions");
      });
   });

   describe("the ic-core/widget/mentions/TagMentionsNode.toString() method", function() {
      it("returns the value", function() {
         node.setValue('social-business');
         expect(node.toString()).toBe('social-business');
      });
   });

   describe("the ic-core/widget/mentions/TagMentionsNode.toJsonString() method", function() {
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
});
