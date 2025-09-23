/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Mock objects for CKEditor tests
 * 
 * @namespace lconn.test.test.ckeditor
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

(function() {
   var mocks = dojo.provide('lconn.test.test.ckeditor');

   var _root = dojo.create('div', {
      style : {
         'display' : 'none'
      }
   });

   dojo.mixin(mocks, /** @lends lconn.test.mocks.ckeditor */
   {
      CKEDITOR : {
         version : 'this.is.a.mock',
         config : {},
         NODE_ELEMENT : 1,
         NODE_TEXT : 3,
         plugins : {
            add : function(name, obj) {
               if (mocks.CKEDITOR.plugins.registered[name])
                  throw "The resource <" + name + "> is already registered";
               mocks.CKEDITOR.plugins.registered[name] = obj;
            },
            registered : {},
            reset : function() {
               this.registered = {};
            }
         },
         _eventHandlers : {},
         on : function(type, handler) {
            this._eventHandlers[type] = handler;
         },
         fire : function(type, evt) {
            if (this._eventHandlers[type]) {
               this._eventHandlers[type].call(this, evt);
            }
         },
         dom : {
            range : function(el) {
               mocks.CKEDITOR.dom.range.el = el;
               this.moveToElementEditEnd = function(el) {
                  mocks.CKEDITOR.dom.range.end = el;
               };
               this.select = function() {
                  mocks.CKEDITOR.dom.range.selected = true;
               };
               this.setStartBefore = function(el) {
                  this.startsBefore = el;
               };
               this.setStartAfter = function(el) {
                  this.startsAfter = el;
               };
               this.setEndAfter = function(el) {
                  this.endsAfter = el;
               };
               this.deleteContents = function() {
                  this.deletedContents = true;
               };
            },
            text : function(str) {
               this.$ = document.createTextNode(str);
               this.appendTo = function(el) {
                  el.$.appendChild(this.$);
               };
               this.insertAfter = function(other) {
                  if (other && other.getParent())
                     other.$.parentNode.insertBefore(this.$, other.$.nextSibling);
               };
            },
            element : function(elOrTagName, doc) {
               doc = doc || document;
               this.$ = elOrTagName.nodeType ? elOrTagName : doc.createElement(elOrTagName);
               this.setText = function(txt) {
                  while (this.$.childNodes.length)
                     this.$.removeChild(this.$.childNodes[0]);
                  this.$.appendChild(document.createTextNode(txt));
               };
               this.setAttribute = function(name, value) {
                  this.$.setAttribute(name, value);
               };
               this.insertAfter = function(other) {
                  if (other && other.getParent())
                     other.$.parentNode.insertBefore(this.$, other.$.nextSibling);
               };
               this.remove = function() {
                  if (this.$.parentNode)
                     this.$.parentNode.removeChild(this.$);
                  return this.$;
               };
               this.getParent = function() {
                  return this.$.parentNode;
               };
               this.getDocument = function() {
                  return this.$.ownerDocument;
               };
            },
            walker : function(range) {
               this.previous = function() {
                  return range.getFirst();
               };
            }
         },
         getSelection : function() {
            var selection = {
               getRanges : function() {
                  var range = new mocks.CKEDITOR.dom.range();
                  range.endContainer = new CKEDITOR.dom.element('a', document);
                  range.startContainer = new CKEDITOR.dom.element('p', document);
                  range.endOffset = 1;
                  range.startOffset = 0;
                  return new Array(range);
               }
            };
            return selection;

         },
         insertElement : function(el) {
            if (el)
               _root.appendChild(el.$);
            this.lastInserted = el;
         },
         insertText : function(text) {
            var el = new this.dom.text(text);
            this.insertElement(el);
            this.lastInserted = el;
         },
         document : window.document,
         container : {
            $ : window.document.body
         }
      }
   });

   mocks.CKEDITOR.dom.element.createFromHtml = function(html) {
      var node = dojo.toDom(html);
      return {
         $ : node,
         replace : function(node) {
            return true;
         },
         setAttribute : function(a, b) {
            return null;
         }
      };
   };

   return mocks;

}());
