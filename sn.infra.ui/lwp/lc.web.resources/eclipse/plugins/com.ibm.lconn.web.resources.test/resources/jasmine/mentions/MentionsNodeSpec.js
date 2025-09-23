/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link lconn.core.widget.mentions.MentionsNode}
 * 
 * @module lconn.test.jasmine.mentions.MentionsNodeSpec
 */
dojo.provide("lconn.test.jasmine.mentions.MentionsNodeSpec");

dojo.require("lconn.core.widget.mentions.MentionsNode");

(function(MentionsNode) {

   var node;
   beforeEach(function() {
      node = new MentionsNode();
   });

   describe("the lconn.core.widget.mentions.MentionsNode class", function() {
      it("implements the expected methods", function() {
         expect(node.preventResize).toEqual(jasmine.any(Function));
         expect(node.disableBizCardFocus).toEqual(jasmine.any(Function));
         expect(node.cancelEvent).toEqual(jasmine.any(Function));
         expect(node.setValue).toEqual(jasmine.any(Function));
         expect(node.setData).toEqual(jasmine.any(Function));
         expect(node.setTextRange).toEqual(jasmine.any(Function));
         expect(node.setComplete).toEqual(jasmine.any(Function));
         expect(node.toString).toEqual(jasmine.any(Function));
         expect(node.toJsonString).toEqual(jasmine.any(Function));
         expect(node.getTextNode).toEqual(jasmine.any(Function));
         expect(node.getLinkValueNode).toEqual(jasmine.any(Function));
      });

      it("implements the expected properties", function() {
         expect(node.templatePath).not.toBeUndefined();
         expect(node.type).not.toBeUndefined();
         expect(node.data).not.toBeUndefined();
         expect(node.value).not.toBeUndefined();

         expect(node.idx).toBe(0);
         expect(node.widgetsInTemplate).toBeFalsy();
         expect(node.className).toBe("MentionsNode");
         expect(node.symbol).toBe('@');
         expect(node.isComplete).toBeFalsy();
         expect(node.textRange).toBeNull();
      });

      it("implements the expected static properties", function() {
         expect(lconn.core.widget.mentions.MentionsNode.TYPE).toBe("mentions");
      });
   });

   describe("the lconn.core.widget.mentions.MentionsNode.toString() method", function() {
      it("returns the value", function() {
         node.setValue('foo');
         expect(node.toString()).toBe('foo');
      });
   });

   describe("the lconn.core.widget.mentions.MentionsNode.toJsonString() method", function() {
      it("returns the expected JSON value", function() {
         node.setValue('foo');
         expect(node.toJsonString()).toEqual({
            type : 'mentions',
            value : 'foo',
            data : ''
         });

         node.setValue('bar');
         node.setData('baz');
         expect(node.toJsonString()).toEqual({
            type : 'mentions',
            value : 'bar',
            data : 'baz'
         });
      });
   });

   describe("the lconn.core.widget.mentions.MentionsNode.setData() method", function() {
      it("sets the data", function() {
         node.setData('baz');
         expect(node.data).toBe('baz');
      });
   });

   describe("the lconn.core.widget.mentions.MentionsNode.setValue() method", function() {
      it("sets the value", function() {
         node.setValue('foo');
         expect(node.value).toBe('foo');
      });
   });

   describe("the lconn.core.widget.mentions.MentionsNode.setComplete() method", function() {
      it("makes the mention immutable if argument is true", function() {
         node.setComplete(true);
         expect(node.isComplete).toBeTruthy();
         expect(dojo.attr(node.domNode, 'contentEditable')).toBe('false');
         dojo.forEach(node.domNode.childNodes, function(child) {
            if (child && child.nodeType == 1) {
               expect(dojo.attr(child, 'contentEditable')).toBe('false');
            }
         });
      });

      it("makes the mention editable if argument is false", function() {
         node.setComplete(false);
         expect(node.isComplete).toBeFalsy();
         expect(dojo.attr(node.domNode, 'contentEditable')).toBe('true');
         dojo.forEach(node.domNode.childNodes, function(child) {
            if (child && child.nodeType == 1) {
               expect(dojo.attr(child, 'contentEditable')).toBe('true');
            }
         });
      });
   });

   describe("the lconn.core.widget.mentions.MentionsNode.preventResize() method", function() {
      it("returns false", function() {
         expect(node.preventResize()).toBeFalsy();
      });
   });

   describe("the lconn.core.widget.mentions.MentionsNode.getTextNode() method", function() {
      it("returns the first text node", function() {
         node.setValue('bar');
         var text = node.getTextNode();
         expect(text.nodeType).toBe(3);
         expect(text.nodeValue).toBe('bar');
         expect(text.parentNode).toBe(node.linkNode);
      });
   });

   describe("the lconn.core.widget.mentions.MentionsNode.getLinkValueNode() method", function() {
      it("returns the first text node", function() {
         node.setValue('bar');
         var text = node.getLinkValueNode();
         expect(text.nodeType).toBe(3);
         expect(text.nodeValue).toBe('bar');
         expect(text.parentNode).toBe(node.linkNode);
         expect(text).toBe(node.getTextNode());
      });
   });
}(lconn.core.widget.mentions.MentionsNode));

