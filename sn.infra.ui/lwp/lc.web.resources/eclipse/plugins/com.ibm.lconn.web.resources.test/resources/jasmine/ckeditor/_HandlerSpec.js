/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.test.jasmine.ckeditor._HandlerSpec");

dojo.require("lconn.core.ckplugins.mentions._Handler");
dojo.require("lconn.test.mocks.ckeditor");
dojo.require("dojo.string");

(function(handler, mocks) {
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
   }, BIDI_ACTIVATOR_CHAR = function() {
      return '@';
   };

   describe('the lconn.core.ckplugins.mentions._Handler handler', function() {
      it('implements the expected methods', function() {
         expect(dojo.isFunction(handler.activate)).toBeTruthy();
         expect(dojo.isFunction(handler.handleKeyDown)).toBeTruthy();
         expect(dojo.isFunction(handler.handleKeyUp)).toBeTruthy();
         expect(dojo.isFunction(handler.handleBackspace)).toBeTruthy();
         expect(dojo.isFunction(handler.handleDeletion)).toBeTruthy();
         expect(dojo.isFunction(handler.complete)).toBeTruthy();
         expect(dojo.isFunction(handler.cancel)).toBeTruthy();
         expect(dojo.isFunction(handler.showMenu)).toBeTruthy();
         expect(dojo.isFunction(handler.getValue)).toBeTruthy();
         expect(dojo.isFunction(handler.setValue)).toBeTruthy();
         expect(dojo.isFunction(handler.onSelect)).toBeTruthy();
         expect(dojo.isFunction(handler.onMenuKeyPress)).toBeTruthy();
         expect(dojo.isFunction(handler.onMenuKeyDown)).toBeTruthy();
         expect(dojo.isFunction(handler.dispatchEvent)).toBeTruthy();
         expect(dojo.isFunction(handler.onComplete)).toBeTruthy();
         expect(dojo.isFunction(handler.onCancel)).toBeTruthy();
         expect(dojo.isFunction(handler.handleComposition)).toBeTruthy();
         expect(dojo.isFunction(handler.handlePasteUndo)).toBeTruthy();
         expect(dojo.isFunction(handler.handleBlur)).toBeTruthy();
         expect(dojo.isFunction(handler.handleModeChange)).toBeTruthy();
         expect(dojo.isFunction(handler.handleBeforeGetData)).toBeTruthy();
         expect(dojo.isFunction(handler.handleSetDataStore)).toBeTruthy();
         expect(dojo.isFunction(handler.handleSetNetwork)).toBeTruthy();
         expect(dojo.isFunction(handler.handleAddCallback)).toBeTruthy();
         expect(dojo.isFunction(handler.removeMention)).toBeTruthy();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.activate() method', function() {
      var _CKEDITOR;
      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         handler.ariaLabels = LABELS;
         handler.activatorChar = ACTIVATOR_CHAR;
         handler.bidiActivatorChar = BIDI_ACTIVATOR_CHAR;
         handler.activate(CKEDITOR);
         handler.addMicroFormat = function(item) {
            return;
         };
      });
      afterEach(function() {
         handler._node.remove();
         handler.cancel();
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('resets the buffer', function() {
         expect(handler._buffer).toEqual([]);
      });
      it('stores a reference to the editor', function() {
         expect(handler._editor).toEqual(CKEDITOR);
      });
      it('creates a node for the mention', function() {
         // The member exists
         expect(handler._node).not.toBeNull();
         // The native node exists
         expect(handler._node.$).not.toBeNull();
         // It's an <a>
         expect(handler._node.$.tagName).toBe(dojo.isIE ? 'SPAN' : 'A');
         // It has a child node
         expect(handler._node.$.firstChild).not.toBeNull();
         // It is a text node
         expect(handler._node.$.firstChild.nodeType).toBe(3);
         // It has aria-labelledBy attribute
         expect(handler._node.$.hasAttribute("aria-labelledBy")).toBe(true);
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

      it('sets an ARIA label when the mention is activated', function() {
         var label = handler.getLabel();
         checkLabel(label, LABELS.compose);
      });

      it('inserts the node in the editor', function() {
         expect(CKEDITOR.lastInserted).toBe(handler._node);
      });
      it('creates a range and selects it', function() {
         expect(CKEDITOR.dom.range.el).toBe(handler._node);
         expect(CKEDITOR.dom.range.end).toBe(handler._node);
         expect(CKEDITOR.dom.range.selected).toBeTruthy();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.complete() method', function() {
      var _CKEDITOR;

      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         handler.ariaLabels = LABELS;
         handler.activatorChar = ACTIVATOR_CHAR;
         handler.activate(CKEDITOR);
         handler.menu = {
            isShowing : true,
            noResultsFound : function() {
               return true;
            }
         };
      });
      afterEach(function() {
         handler._node.remove();
         handler.cancel();
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
         handler.complete();
         var label = handler.getLabel();
         checkLabel(label, dojo.string.substitute(LABELS.completed, [ handler.getValue()
         ]));
      });
      it('closes an open typeahead menu', function() {
         spyOn(handler, 'hideMenu');
         handler.complete();
         expect(handler.hideMenu).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.cancel() method', function() {
      var _CKEDITOR;

      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         handler.ariaLabels = LABELS;
         handler.activatorChar = ACTIVATOR_CHAR;
         handler.activate(CKEDITOR);
         handler.menu = {
            isShowing : true,
            noResultsFound : function() {
               return true;
            }
         };
      });
      afterEach(function() {
         handler._node.remove();
         handler.cancel();
         dojo.setObject('CKEDITOR', _CKEDITOR);
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
         handler.cancel();
         var label = handler.getLabel();
         checkLabel(label, dojo.string.substitute(LABELS.cancelled, [ handler.getValue()
         ]));
      });
      it('closes an open typeahead menu', function() {
         spyOn(handler, 'hideMenu');
         handler.cancel();
         expect(handler.hideMenu).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleBackspace() method', function() {
      var tempHandler = handler;
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

   describe('the lconn.core.ckplugins.mentions._Handler.getValue() method', function() {
      beforeEach(function() {
         handler._buffer = BUFFER;
      });
      it('returns the joined buffer', function() {
         expect(handler.getValue()).toBe(BUFFER_JOINED);
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.setValue() method', function() {
      var _CKEDITOR;

      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         handler.activatorChar = ACTIVATOR_CHAR;
         handler.activate(CKEDITOR);
         handler.setValue(BUFFER_JOINED);
      });
      afterEach(function() {
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('correctly sets the buffer', function() {
         expect(handler._buffer).toEqual(BUFFER);
      });
      it('correctly sets the mention text', function() {
         expect(handler._node.$.firstChild.nodeValue).toBe(ACTIVATOR_CHAR + BUFFER_JOINED);
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleKeyUp() method', function() {
//      var evt = {
//         data : {
//            $ : {},
//            getKey : function() {
//               return dojo.keys.SPACE;
//            }
//         }
//      };
      handler.menu = {
         isShowing : true,
         noResultsFound : function() {
            return true;
         }
      };
      // handler.cancel = function () { return true;};
      handler.hideMenu = function() {
         return true;
      };

      // TODO: update this function on cke/dbcs updates.
//      it('Cancels the @mention on SPACE, if no results returned in typeahead', function() {
//         spyOn(handler, 'cancel');
//         spyOn(handler, 'updateBuffer');
//         handler.handleKeyUp(evt);
//         expect(handler.updateBuffer).toHaveBeenCalled();
//         expect(handler.cancel).toHaveBeenCalled();
//      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleDeletion() method', function() {
      var _CKEDITOR, sub;
      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         handler.activatorChar = ACTIVATOR_CHAR;
         handler.activate(CKEDITOR);
      });
      afterEach(function() {
         dojo.setObject('CKEDITOR', _CKEDITOR);
         dojo.unsubscribe(sub);
      });
      it('issues the lconn/microblogging/mention/removed topic when deleting a mention', function() {
         var issued = false, editor = null, mention = null,
            id, className, userId;
         handler.getMentionsAtRange = function() {
            var mentions = [ {
               name : 'Amy Jones2',
               id : '8af53b40-f6df-1032-9a75-d02a14283ea9'
            }
            ];
            return mentions;
         };

         sub = dojo.subscribe('lconn/microblogging/mention/removed', function(obj) {
            issued = true;
            editor = obj.editor;
            mention = obj.mention;
            id = obj.id;
            className = obj.className;
            userId = obj.getUserId;
         });
         // spyOn(RANGE, 'select');
         handler.handleDeletion(CKEDITOR);
         expect(issued).toBeTruthy();
         expect(editor).not.toBeNull();
         expect(editor).toBe(CKEDITOR);
         expect(mention).not.toBeNull();
         expect(mention).toBe("Amy Jones2");
         expect(id).toBe('8af53b40-f6df-1032-9a75-d02a14283ea9');
         expect(className).toBe('PersonMentionsNode');
         expect(userId).toEqual(jasmine.any(Function));
         expect(userId()).toBe('8af53b40-f6df-1032-9a75-d02a14283ea9');
         // expect(RANGE.select).toHaveBeenCalled();
         // expect(RANGE.select).toHaveBeenCalledWith(/* no arguments */);
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleComposition() method', function() {
      var EVT_COMPOSITION = {
         data : {
            $ : {
               data : '\u1234'
            }
         }
      }, _CKEDITOR;

      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         handler.activatorChar = ACTIVATOR_CHAR;
         handler.activate(CKEDITOR);
         handler._buffer = [];
         handler.showMenu = function() {};
         //in chrome node text is set on input, handler only updates buffer var.
         if(dojo.isChrome){
            handler._node.setText(ACTIVATOR_CHAR + EVT_COMPOSITION.data.$.data);
         }
      });

      afterEach(function() {
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });

      it('updates the buffer with the data presented by the event', function() {
         expect(handler._buffer).toEqual([]);
         handler.handleComposition(EVT_COMPOSITION);
         expect(handler._buffer).toEqual([ EVT_COMPOSITION.data.$.data ]);
      });

      it('calls showMenu() method when buffer is more than 1', function() {
         spyOn(handler, 'showMenu');
         handler.handleComposition(EVT_COMPOSITION);
         expect(handler.showMenu).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handlePasteUndo() method', function() {
      var emptyNode = dojo.toDom('<div></div>');
      var node = dojo.toDom('<div><span contenteditable="false" class="vcard">' + '<a class="fn url" href="www.ibm.com">test user</a>'
            + '<span class="x-lconn-userid" style="display: none">123456</span>' + '</span></div>');
      var mention = dojo.query("span.vcard", node)[0];
      var evt = {
         editor : {
            document : {
               $ : {}
            }
         }
      };
      handler.decorateContent = jasmine.createSpy("decorateContent() spy");
      it('does not call decorateContent if no mentions are found on the DOM', function() {
         evt.editor.document.$ = emptyNode;
         handler.handlePasteUndo(evt);
         expect(handler.decorateContent).not.toHaveBeenCalled();
      });
      it('sets checkBizCard correctly based on the name of the event - afterPaste', function() {
         evt.editor.document.$ = node;
         evt.name = 'afterPaste';
         handler.handlePasteUndo(evt);
         expect(handler.decorateContent).toHaveBeenCalledWith(mention, true);
      });
      it('sets checkBizCard correctly based on the name of the event - undo', function() {
         evt.name = 'undo';
         handler.handlePasteUndo(evt);
         expect(handler.decorateContent).toHaveBeenCalledWith(mention, false);
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleBeforeGetData() and handleModeChange methods', function() {
      it('cancel the mention', function() {
         spyOn(handler, 'cancel');
         handler.handleBeforeGetData();
         expect(handler.cancel).toHaveBeenCalled();
         handler.handleModeChange();
         expect(handler.cancel).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.handleBlur()', function() {
      it('hides the TA menu', function() {
         spyOn(handler, 'hideMenu');
         handler.handleBlur();
         expect(handler.hideMenu).toHaveBeenCalled();
      });
   });

   describe('the lconn.core.ckplugins.mentions._Handler.removeMention() method', function() {
      it('calls the right functions', function() {
         spyOn(handler, 'setLabel');
         spyOn(handler._node, 'remove');
         spyOn(handler, 'hideMenu');
         spyOn(handler, 'onCancel');
         handler.removeMention();
         expect(handler.setLabel).toHaveBeenCalled();
         expect(handler._node.remove).toHaveBeenCalled();
         expect(handler.hideMenu).toHaveBeenCalled();
         expect(handler.onCancel).toHaveBeenCalled();
      });
      it('doesnt call the onRemoveMention callback', function() {
         var _eventHandles = handler.eventHandles;
         handler.eventHandles = {
            onRemoveMention : function() {
               return true;
            }
         };
         spyOn(handler.eventHandles, 'onRemoveMention');
         handler.removeMention();
         expect(handler.eventHandles.onRemoveMention).not.toHaveBeenCalled();
         handler.eventHandles = _eventHandles;
      });
   });

}(lconn.core.ckplugins.mentions._Handler, lconn.test.mocks.ckeditor));
