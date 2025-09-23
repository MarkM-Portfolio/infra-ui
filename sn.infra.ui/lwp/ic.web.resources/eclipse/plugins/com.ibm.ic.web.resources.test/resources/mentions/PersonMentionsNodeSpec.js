/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-core/widget/mentions/PersonMentionsNode"
], function(PersonMentionsNode) {

   /**
    * Jasmine spec for {@link ic-core.widget.mentions.PersonMentionsNode}
    * 
    * @module ic-test.mentions.PersonMentionsNodeSpec
    */
   describe("the ic-core/widget/mentions/PersonMentionsNode class", function() {

      var node;
      beforeEach(function() {
         node = new PersonMentionsNode();
      });

      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(node.setUserId).toEqual(jasmine.any(Function));
            expect(node.getUserId).toEqual(jasmine.any(Function));
            expect(node.setComplete).toEqual(jasmine.any(Function));
            expect(node.addSymbol).toEqual(jasmine.any(Function));
            expect(node.removeSymbol).toEqual(jasmine.any(Function));
            expect(node.toString).toEqual(jasmine.any(Function));
            expect(node.toJsonString).toEqual(jasmine.any(Function));
            expect(node.parseNode).toEqual(jasmine.any(Function));
            expect(node.getTextNode).toEqual(jasmine.any(Function));
            expect(node.stringSplice).toEqual(jasmine.any(Function));
         });

         it("implements the expected properties", function() {
            expect(node.type).not.toBeUndefined();
            expect(node.symbol).not.toBeUndefined();

            expect(node.className).toBe("PersonMentionsNode");
         });

         it("implements the expected static properties", function() {
            expect(PersonMentionsNode.TYPE).toBe("PersonMentions");
         });
      });

      describe("the ic-core/widget/mentions/PersonMentionsNode.toString() method", function() {
         it("returns the value", function() {
            node.setValue('Amy Jones7');
            expect(node.toString()).toBe('Amy Jones7');
         });
      });

      describe("the ic-core/widget/mentions/PersonMentionsNode.toJsonString() method", function() {
         it("returns the expected JSON value", function() {
            node.setValue('Amy Jones110');
            expect(node.toJsonString()).toEqual({
               type : 'PersonMentions',
               displayName : 'Amy Jones110',
               hasSymbol : true,
               userId : ''
            });

            node.setValue('Amy Jones2');
            node.setData('255f9a20-a0d2-4485-87fd-a17e8eb4797c');
            expect(node.toJsonString()).toEqual({
               type : 'PersonMentions',
               displayName : 'Amy Jones2',
               hasSymbol : true,
               userId : '255f9a20-a0d2-4485-87fd-a17e8eb4797c'
            });
         });
      });
   });
});
