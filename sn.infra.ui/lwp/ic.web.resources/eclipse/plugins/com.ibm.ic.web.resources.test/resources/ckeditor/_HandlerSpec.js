/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo/_base/lang",
      "dojo/keys",
      "dojo/has",
      "dojo/dom-attr",
      "dojo/string",
      "dojo/topic",
      "dojo/dom-construct",
      "dojo/query",
      "ic-ui/ckeditor/plugins/mentions/_Handler",
      "ic-test/mocks/ckeditor"
], function(lang, keys, has, domAttr, string, topic, domConstruct, query, _Handler, mocks) {
   var BUFFER = [
         'm',
         'e',
         'n',
         't',
         'i',
         'o',
         'n',
         's'
   ], BUFFER_JOINED = BUFFER.join(''), ACTIVATOR_CHAR = '@', LABELS = {
      compose : 'composed',
      cancelled : 'cancelled ${0}',
      completed : 'completed ${0}',
      removed : 'removed ${0}'
   }, noop = function() {
      return;
   }, BIDI_ACTIVATOR_CHAR = function() {
      return '@';
   };

   describe('the ic-ui/ckeditor/plugins/mentions/_Handler handler', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(_Handler.activate)).toBeTruthy();
         expect(lang.isFunction(_Handler.handleKeyDown)).toBeTruthy();
         expect(lang.isFunction(_Handler.handleKeyUp)).toBeTruthy();
         expect(lang.isFunction(_Handler.handleBackspace)).toBeTruthy();
         expect(lang.isFunction(_Handler.complete)).toBeTruthy();
         expect(lang.isFunction(_Handler.cancel)).toBeTruthy();
         expect(lang.isFunction(_Handler.showMenu)).toBeTruthy();
         expect(lang.isFunction(_Handler.getValue)).toBeTruthy();
         expect(lang.isFunction(_Handler.setValue)).toBeTruthy();
         expect(lang.isFunction(_Handler.onSelect)).toBeTruthy();
         expect(lang.isFunction(_Handler.onMenuKeyPress)).toBeTruthy();
         expect(lang.isFunction(_Handler.onMenuKeyDown)).toBeTruthy();
         expect(lang.isFunction(_Handler.dispatchEvent)).toBeTruthy();
         expect(lang.isFunction(_Handler.onComplete)).toBeTruthy();
         expect(lang.isFunction(_Handler.onCancel)).toBeTruthy();
         expect(lang.isFunction(_Handler.handleComposition)).toBeTruthy();
         expect(lang.isFunction(_Handler.handlePasteUndo)).toBeTruthy();
         expect(lang.isFunction(_Handler.handleBlur)).toBeTruthy();
         expect(lang.isFunction(_Handler.handleModeChange)).toBeTruthy();
         expect(dojo.isFunction(_Handler.handleBeforeGetData)).toBeTruthy();
         expect(dojo.isFunction(_Handler.removeMention)).toBeTruthy();
         expect(dojo.isFunction(_Handler.handleSetDataStore)).toBeTruthy();
         expect(dojo.isFunction(_Handler.handleSetNetwork)).toBeTruthy();
         expect(dojo.isFunction(_Handler.handleAddCallback)).toBeTruthy();
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/_Handler.activate() method', function() {
      var _CKEDITOR;
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         _Handler.ariaLabels = LABELS;
         _Handler.activatorChar = ACTIVATOR_CHAR;
         _Handler.bidiActivatorChar = BIDI_ACTIVATOR_CHAR;
         _Handler.activate(CKEDITOR);
         _Handler.addMicroFormat = noop;
      });
      afterEach(function() {
         _Handler._node.remove();
         _Handler.cancel();
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('resets the buffer', function() {
         expect(_Handler._buffer).toEqual([]);
      });
      it('stores a reference to the editor', function() {
         expect(_Handler._editor).toEqual(CKEDITOR);
      });
      it('creates a node for the mention', function() {
         // The member exists
         expect(_Handler._node).not.toBeNull();
         // The native node exists
         expect(_Handler._node.$).not.toBeNull();
         // It's an <a>
         expect(_Handler._node.$.tagName).toBe(has('ie') ? 'SPAN' : 'A');
         // It has a child node
         expect(_Handler._node.$.firstChild).not.toBeNull();
         // It is a text node
         expect(_Handler._node.$.firstChild.nodeType).toBe(3);
         // It has aria-labelledBy attribute
         expect(_Handler._node.$.hasAttribute("aria-labelledBy")).toBe(true);
      });

      function checkLabel(label, value) {
         // The label exists
         expect(label).not.toBeNull();
         // It's an <span>
         expect(label.tagName).toBe('SPAN');
         // It has an aria-label
         expect(domAttr.get(label, 'aria-label')).not.toBeNull();
         // It has a child node
         expect(label.firstChild).not.toBeNull();
         // It is a text node
         expect(label.firstChild.nodeType).toBe(3);
         // It has the correct value
         expect(label.firstChild.nodeValue).toBe(value);
      }

      it('sets an ARIA label when the mention is activated', function() {
         var label = _Handler.getLabel();
         checkLabel(label, LABELS.compose);
      });

      it('inserts the node in the editor', function() {
         expect(CKEDITOR.lastInserted).toBe(_Handler._node);
      });
      it('creates a range and selects it', function() {
         expect(CKEDITOR.dom.range.el).toBe(_Handler._node);
         expect(CKEDITOR.dom.range.end).toBe(_Handler._node);
         expect(CKEDITOR.dom.range.selected).toBeTruthy();
      });
   });

   describe('the coreui/ckeditor/plugins/mentions/_Handler.complete() method', function() {
      var _CKEDITOR;

      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         _Handler.ariaLabels = LABELS;
         _Handler.activatorChar = ACTIVATOR_CHAR;
         _Handler.activate(CKEDITOR);
         _Handler.menu = {
            isShowing : true,
            noResultsFound : function() {
               return true;
            }
         };
      });
      afterEach(function() {
         _Handler._node.remove();
         _Handler.cancel();
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      function checkLabel(label, value) {
         // The label exists
         expect(label).not.toBeNull();
         // It's an <span>
         expect(label.tagName).toBe('SPAN');
         // It has an aria-label
         expect(dojo.attr(label, 'aria-label')).not.toBeNull();
         // It has a child node
         expect(label.firstChild).not.toBeNull();
         // It is a text node
         expect(label.firstChild.nodeType).toBe(3);
         // It has the correct value
         expect(label.firstChild.nodeValue).toBe(value);
      }
      it('sets an ARIA label when the mention is completed', function() {
         _Handler.complete();
         var label = _Handler.getLabel();
         checkLabel(label, string.substitute(LABELS.completed, [ _Handler.getValue()
         ]));
      });
      it('closes an open typeahead menu', function() {
         spyOn(_Handler, 'hideMenu');
         _Handler.complete();
         expect(_Handler.hideMenu).toHaveBeenCalled();
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/_Handler.getValue() method', function() {
      beforeEach(function() {
         _Handler._buffer = BUFFER;
      });
      it('returns the joined buffer', function() {
         expect(_Handler.getValue()).toBe(BUFFER_JOINED);
      });
   });

   describe('ic-ui/ckeditor/plugins/mentions/_Handler.cancel() method', function() {
      var _CKEDITOR;
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         _Handler.ariaLabels = LABELS;
         _Handler.activatorChar = ACTIVATOR_CHAR;
         _Handler.activate(CKEDITOR);
         _Handler.menu = {
            isShowing : true,
            noResultsFound : function() {
               return true;
            }
         };
      });
      afterEach(function() {
         _Handler._node.remove();
         _Handler.cancel();
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('sets an ARIA label when the mention is cancelled', function() {
         function checkLabel(label, value) {
            // The label exists
            expect(label).not.toBeNull();
            // It's an <span>
            expect(label.tagName).toBe('SPAN');
            // It has an aria-label
            expect(dojo.attr(label, 'aria-label')).not.toBeNull();
            // It has a child node
            expect(label.firstChild).not.toBeNull();
            // It is a text node
            expect(label.firstChild.nodeType).toBe(3);
            // It has the correct value
            expect(label.firstChild.nodeValue).toBe(value);
         }
         _Handler.cancel();
         var label = _Handler.getLabel();
         checkLabel(label, dojo.string.substitute(LABELS.cancelled, [ _Handler.getValue()
         ]));
      });

      it('closes an open typeahead menu', function() {
         spyOn(_Handler, 'hideMenu');
         _Handler.cancel();
         expect(_Handler.hideMenu).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleBackspace() method', function() {
      var tempHandler = _Handler;
      it('will only call "cancel" if the node text being deleted consists of only the activator char', function() {
         tempHandler._node = {
            getText : function() {
               // by the time the function is called, @ has been deleted.
               return "";
            }
         };
         spyOn(tempHandler, 'cancel');
         tempHandler.handleBackspace();
         expect(tempHandler.cancel).toHaveBeenCalled();
      });

   });

   describe('the ic-ui/ckeditor/plugins/mentions/_Handler.setValue() method', function() {
      var _CKEDITOR;
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         _Handler.activatorChar = ACTIVATOR_CHAR;
         _Handler.bidiActivatorChar = BIDI_ACTIVATOR_CHAR;
         _Handler.activate(CKEDITOR);
         _Handler.setValue(BUFFER_JOINED);
      });
      afterEach(function() {
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('correctly sets the buffer', function() {
         expect(_Handler._buffer).toEqual(BUFFER);
      });
      it('correctly sets the mention text', function() {
         expect(_Handler._node.$.firstChild.nodeValue).toBe(ACTIVATOR_CHAR + BUFFER_JOINED);
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/_Handler.handleKeyUp() method', function() {
//      var evt = {
//         data : {
//            getKey : function() {
//               return keys.SPACE;
//            }
//         }
//      };
      _Handler.menu = {
         isShowing : true,
         noResultsFound : function() {
            return true;
         }
      };
      _Handler.hideMenu = function() {
         return true;
      };
      // TODO: update this function on cke/dbcs updates.
//      it('Cancels the @mention on SPACE, if no results returned in typeahead', function() {
//         spyOn(_Handler, 'cancel');
//         spyOn(_Handler, 'updateBuffer');
//         _Handler.handleKeyUp(evt);
//         expect(_Handler.updateBuffer).toHaveBeenCalled();
//         expect(_Handler.cancel).toHaveBeenCalled();
//      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleDeletion() method', function() {
      var _CKEDITOR, sub;
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         _Handler.activatorChar = ACTIVATOR_CHAR;
         _Handler.activate(CKEDITOR);
      });
      afterEach(function() {
         lang.setObject('CKEDITOR', _CKEDITOR);
         if (sub) {
            sub.remove();
         }
      });
      it('issues the lconn/microblogging/mention/removed topic when deleting a mention', function() {
         var issued = false, editor = null, mention = null,
            id, className, userId;
         _Handler.getMentionsAtRange = function() {
            var mentions = [ {
               name : 'Amy Jones2',
               id : '8af53b40-f6df-1032-9a75-d02a14283ea9'
            }
            ];
            return mentions;
         };
         sub = topic.subscribe('lconn/microblogging/mention/removed', function(obj) {
            issued = true;
            editor = obj.editor;
            mention = obj.mention;
            id = obj.id;
            className = obj.className;
            userId = obj.getUserId;
         });
         // spyOn(RANGE, 'select');
         _Handler.handleDeletion(CKEDITOR);
         expect(issued).toBeTruthy();
         expect(editor).toBe(CKEDITOR);
         expect(mention).toBe("Amy Jones2");
         expect(id).toBe('8af53b40-f6df-1032-9a75-d02a14283ea9');
         expect(className).toBe('PersonMentionsNode');
         expect(userId).toEqual(jasmine.any(Function));
         expect(userId()).toBe('8af53b40-f6df-1032-9a75-d02a14283ea9');
         // expect(RANGE.select).toHaveBeenCalled();
         // expect(RANGE.select).toHaveBeenCalledWith(/* no arguments */);
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/_Handler.handleComposition() method', function() {

      var EVT_COMPOSITION = {
         data : {
            $ : {
               data : '\u1234'
            }
         }
      },

      _CKEDITOR;

      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         _Handler.activatorChar = ACTIVATOR_CHAR;
         _Handler.activate(CKEDITOR);
         _Handler._buffer = [];
         _Handler.showMenu = noop;
       //in chrome node text is set on input, handler only updates buffer var.
         if(has('chrome')){
            _Handler._node.setText(ACTIVATOR_CHAR + EVT_COMPOSITION.data.$.data);
         }
      });

      afterEach(function() {
         lang.setObject('CKEDITOR', _CKEDITOR);
      });

      it('updates the buffer with the data presented by the event', function() {
         expect(_Handler._buffer).toEqual([]);
         _Handler.handleComposition(EVT_COMPOSITION);
         expect(_Handler._buffer).toEqual([ EVT_COMPOSITION.data.$.data ]);
      });

      it('calls showMenu() method when buffer is more than 1', function() {
         spyOn(_Handler, 'showMenu');
         _Handler.handleComposition(EVT_COMPOSITION);
         expect(_Handler.showMenu).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handlePasteUndo() method', function() {
      var emptyNode = domConstruct.toDom('<div></div>');
      var node = domConstruct.toDom('<div><span contenteditable="false" class="vcard">' + '<a class="fn url" href="www.ibm.com">test user</a>'
            + '<span class="x-lconn-userid" style="display: none">123456</span>' + '</span></div>');
      var mention = query("span.vcard", node)[0];
      var evt = {
         editor : {
            document : {
               $ : {}
            }
         }
      };
      _Handler.decorateContent = jasmine.createSpy("decorateContent() spy");
      it('does not call decorateContent if no mentions are found on the DOM', function() {
         evt.editor.document.$ = emptyNode;
         _Handler.handlePasteUndo(evt);
         expect(_Handler.decorateContent).not.toHaveBeenCalled();
      });
      it('sets checkBizCard correctly based on the name of the event - afterPaste', function() {
         evt.editor.document.$ = node;
         evt.name = 'afterPaste';
         _Handler.handlePasteUndo(evt);
         expect(_Handler.decorateContent).toHaveBeenCalledWith(mention, true);
      });
      it('sets checkBizCard correctly based on the name of the event - undo', function() {
         evt.name = 'undo';
         _Handler.handlePasteUndo(evt);
         expect(_Handler.decorateContent).toHaveBeenCalledWith(mention, false);
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleBeforeGetData() and handleModeChange methods', function() {
      it('cancel the mention', function() {
         spyOn(_Handler, 'cancel');
         _Handler.handleBeforeGetData();
         expect(_Handler.cancel).toHaveBeenCalled();
         _Handler.handleModeChange();
         expect(_Handler.cancel).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleBlur()', function() {
      it('hides the TA menu', function() {
         spyOn(_Handler, 'hideMenu');
         _Handler.handleBlur();
         expect(_Handler.hideMenu).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.removeMention() method', function() {
      it('calls the right functions', function() {
         spyOn(_Handler, 'setLabel');
         spyOn(_Handler._node, 'remove');
         spyOn(_Handler, 'hideMenu');
         spyOn(_Handler, 'onCancel');
         _Handler.removeMention();
         expect(_Handler.setLabel).toHaveBeenCalled();
         expect(_Handler._node.remove).toHaveBeenCalled();
         expect(_Handler.hideMenu).toHaveBeenCalled();
         expect(_Handler.onCancel).toHaveBeenCalled();
      });
      it('doesnt call the onRemoveMention callback', function() {
         var _eventHandles = _Handler.eventHandles;
         _Handler.eventHandles = {
            onRemoveMention : function() {
               return true;
            }
         };
         spyOn(_Handler.eventHandles, 'onRemoveMention');
         _Handler.removeMention();
         expect(_Handler.eventHandles.onRemoveMention).not.toHaveBeenCalled();
         _Handler.eventHandles = _eventHandles;
      });
   });

});
