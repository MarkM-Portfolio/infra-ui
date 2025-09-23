
;/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

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
            add : function add_$0(name, obj) {
               if (mocks.CKEDITOR.plugins.registered[name])
                  throw "The resource <" + name + "> is already registered";
               mocks.CKEDITOR.plugins.registered[name] = obj;
            },
            registered : {},
            reset : function reset_$1() {
               this.registered = {};
            }
         },
         _eventHandlers : {},
         on : function on_$2(type, handler) {
            this._eventHandlers[type] = handler;
         },
         fire : function fire_$3(type, evt) {
            if (this._eventHandlers[type]) {
               this._eventHandlers[type].call(this, evt);
            }
         },
         dom : {
            range : function range_$4(el) {
               mocks.CKEDITOR.dom.range.el = el;
               this.moveToElementEditEnd = function moveToElementEditEnd_$5(el) {
                  mocks.CKEDITOR.dom.range.end = el;
               };
               this.select = function select_$6() {
                  mocks.CKEDITOR.dom.range.selected = true;
               };
               this.setStartBefore = function setStartBefore_$7(el) {
                  this.startsBefore = el;
               };
               this.setStartAfter = function setStartAfter_$8(el) {
                  this.startsAfter = el;
               };
               this.setEndAfter = function setEndAfter_$9(el) {
                  this.endsAfter = el;
               };
               this.deleteContents = function deleteContents_$10() {
                  this.deletedContents = true;
               };
            },
            text : function text_$11(str) {
               this.$ = document.createTextNode(str);
               this.appendTo = function appendTo_$12(el) {
                  el.$.appendChild(this.$);
               };
               this.insertAfter = function insertAfter_$13(other) {
                  if (other && other.getParent())
                     other.$.parentNode.insertBefore(this.$, other.$.nextSibling);
               };
            },
            element : function element_$14(elOrTagName, doc) {
               doc = doc || document;
               this.$ = elOrTagName.nodeType ? elOrTagName : doc.createElement(elOrTagName);
               this.setText = function setText_$15(txt) {
                  while (this.$.childNodes.length)
                     this.$.removeChild(this.$.childNodes[0]);
                  this.$.appendChild(document.createTextNode(txt));
               };
               this.setAttribute = function setAttribute_$16(name, value) {
                  this.$.setAttribute(name, value);
               };
               this.insertAfter = function insertAfter_$17(other) {
                  if (other && other.getParent())
                     other.$.parentNode.insertBefore(this.$, other.$.nextSibling);
               };
               this.remove = function remove_$18() {
                  if (this.$.parentNode)
                     this.$.parentNode.removeChild(this.$);
                  return this.$;
               };
               this.getParent = function getParent_$19() {
                  return this.$.parentNode;
               };
               this.getDocument = function getDocument_$20() {
                  return this.$.ownerDocument;
               };
            },
            walker : function walker_$21(range) {
               this.previous = function previous_$22() {
                  return range.getFirst();
               };
            }
         },
         getSelection : function getSelection_$23() {
            var selection = {
               getRanges : function getRanges_$24() {
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
         insertElement : function insertElement_$25(el) {
            if (el)
               _root.appendChild(el.$);
            this.lastInserted = el;
         },
         insertText : function insertText_$26(text) {
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

   mocks.CKEDITOR.dom.element.createFromHtml = function createFromHtml_$27(html) {
      var node = dojo.toDom(html);
      return {
         $ : node,
         replace : function replace_$28(node) {
            return true;
         },
         setAttribute : function setAttribute_$29(a, b) {
            return null;
         }
      };
   };

   return mocks;

}());

