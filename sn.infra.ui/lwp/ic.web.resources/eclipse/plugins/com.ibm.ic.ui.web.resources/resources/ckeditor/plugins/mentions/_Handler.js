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

define([
      "dojo",
      "dojo/_base/array",
      "dojo/_base/lang",
      "dojo/keys",
      "dojo/string",
      "dojo/topic",
      "dojo/dom-construct",
      "dojo/query",
      "./TypeAheadMenu",
      "./_ARIAMixin",
      "ic-core/lcTextArea/mixins/ITextBoxUtils",
      "ic-core/events",
      "dojo/has",
      "dojo/_base/sniff"
],
   function(dojo, array, lang, keys, string, topic, domConstruct, query, TypeAheadMenu, ARIAMixin, ITextBoxUtils, events, has) {

      var textBoxUtils = new ITextBoxUtils();

      /*
       * Calculates the complexity of a string. A DBCS character yields a score
       * higher than an ASCII character. Used to decide whether a string should
       * start the typeahead.
       */
      function getComplexity(buffer) {
         var complexity = 0;
         array.map(buffer, function(c) {
            complexity += c.charCodeAt(0) > 1424 ? 2 : 1;
         });
         return complexity;
      }

      /*
       * Creates the actual mention node, has custom logic for IE to prevent it
       * from breaking up a hyperlink as soon as the user types a space
       * character.
       */
      function createMentionNode(editor, text) {
         var el = new CKEDITOR.dom.element(textBoxUtils.isIE ? 'span' : 'a', editor.document);
         if (textBoxUtils.isIE) {
            el.addClass('cke_mention'); // styles as hyperlink
         }
         // Set the text, if available
         if (text) {
            el.appendText(text);
         }
         editor.insertElement(el);
         return el;
      }

      /*
       * removes all the nodes with '\u200b' from the editor
       */
      function removeZeroWidthSpaces(range) {
         var endNode = range.endContainer.type == CKEDITOR.NODE_ELEMENT ? range.endContainer.getLast() : range.endContainer, nodeToRemove;
         while (endNode) {
            if (endNode.getText() == '\u200b') {
               nodeToRemove = endNode;
               nodeToRemove.remove();
            }
            endNode = endNode.getPrevious();
         }
      }

      /**
       * Base abstract mention handler
       * 
       * @namespace ic-ui.ckeditor.plugins.mentions._Handler
       */
      var _Handler = /** @lends ic-ui.ckeditor.plugins.mentions._Handler */
      {
         idx : 0,
         /**
          * Buffer of typed characters
          * 
          * @type Array
          * @private
          */
         _buffer : [],
         /**
          * boolean determining if user is inputting DBCS
          */
         dbcsComposing : false,
         /**
          * Editor instance
          * 
          * @type CKEditor
          * @private
          */
         _editor : null,

         /**
          * Container for callbacks set by conmponents
          * 
          * @type object
          */
         eventHandles : [],

         /**
          * Header text for the typeahead
          * 
          * @type String
          */
         typeaheadHeaderString : '',
         /**
          * Flag to see if the activator is in the selection
          * 
          * @type Boolean
          * @private
          */
         _activatorInSel : false,
         /**
          * Activates this mention handler
          * 
          * @param {CKEditor}
          *           editor The editor instance
          */
         activate : function(editor) {
            this._buffer = [];
            this._editor = editor;

            var el = this._node = createMentionNode(editor, this.activatorChar);
            this.addLabel(editor, el, (this.ariaLabels && this.ariaLabels.compose) || '');

            var range = new CKEDITOR.dom.range(el);
            range.moveToElementEditEnd(el);
            range.select();
         },

         /**
          * Handles composition-end event in the editor. Used to update the
          * internal buffer and handle terminator characters.
          * 
          * @param {Event}
          *           evt The composition-end event
          */
         handleComposition : function(evt) {
            if (has('ie') || has('chrome')) {
               this.updateBuffer();
            }
            else {
               this._buffer.push(evt.data.$.data);
            }
            if (getComplexity(this._buffer) > 1) {
               this.showMenu();
            }
            this.dbcsComposing = false;
         },
         /**
          * Informs the handler that the user is using DBCS input.
          */
         handleCompositionStart : function() {
            this.dbcsComposing = true;
         },
         /**
          * Handles the blur event in the editor. Used to hide the TA menu if
          * the user clicks outside the editor
          */
         handleBlur : function(ev) {
            if (this.menu) {
               // editorFocus is set in IE8 only and when selecting with the
               // mouse
               if (this.menu.editorFocus) {
                  ev.stop();
                  this._editor.focus();
                  this.menu.editorFocus = false;
               }
               if (this.menu.cancelBlur) {
                  this.menu.cancelBlur = false;
               }
               else {
                  this.hideMenu();
               }
            }
         },

         /**
          * Handles the changeMode event in the editor. Triggered when we switch
          * to the HTML editor.
          */
         handleModeChange : function() {
            this.cancel();
         },

         /**
          * Handles the BeforeGetData event in the editor. Triggered when
          * getData is called.
          */
         handleBeforeGetData : function() {
            this.cancel();
         },

         /**
          * Handles a keydown event in the editor. Used to conditionally
          * dispatch events to the typeahead menu.
          * 
          * @param {Event}
          *           evt The key up event
          */
         handleKeyDown : function(evt) {
            var key = evt.data.keyCode || evt.data.getKey();
            if (this.menu && this.menu.isShowing) {
               switch (key) {
                  case keys.UP_ARROW:
                     evt.data.preventDefault(true);
                     this.menu.focusPrevious(this._node.$);
                     this.setLabel(this.menu.getCurrentValue());
                     break;
                  case keys.DOWN_ARROW:
                     evt.data.preventDefault(true);
                     this.menu.focusNext(this._node.$);
                     this.setLabel(this.menu.getCurrentValue());
                     break;
                  case keys.PAGE_UP:
                  case keys.PAGE_DOWN:
                     // pass first hit to ESC key to menu
                  case keys.ESCAPE:
                     evt.data.preventDefault(true);
                     this.cancel();
                     break;
                  case keys.ENTER:
                     var highlightedOption = this.menu.getHighlightedOption();
                     if (highlightedOption) {
                        if (highlightedOption == this.menu.menu.searchButton) {
                           this.menu.menu.searchDirectory();
                        }
                        else {
                           this.onSelect();
                        }
                     }
                     evt.cancel();
                     break;
                  default:
                     // If If keys are in the range of 0-9,a-Z, or
                     // delete,backspace,space
                     if ((key >= 48 && key <= 90) || (key >= 96 && key <= 105) || dojo.keys.DELETE || dojo.keys.BACKSPACE || dojo.keys.SPACE) {
                        this.checkForActivatorInSel();
                     }
                     break;
               }
            }
            // TA not displayed yet
            else {
               switch (key) {
                  case keys.BACKSPACE:
                     this.checkForActivatorInSel();
                     // instance where user BACKSPACES after only typing the
                     // activator char, or with only the activator char
                     // remaining
                     if (this._node.getText() == this.activatorChar) {
                        if (has('ie')) {
                           this.cancel();
                        }
                        else {
                           evt.data.preventDefault(true);
                           this.removeMention();
                        }
                     }
                     break;
                  case keys.ENTER:
                     // Cancels the mention when no TA is displayed + Enter key
                     this.cancel();
                     evt.cancel();
                     break;
                  default:
                     // If If keys are in the range of 0-9,a-Z, or delete,space
                     if ((key >= 48 && key <= 90) || (key >= 96 && key <= 105) || dojo.keys.DELETE || dojo.keys.SPACE) {
                        this.checkForActivatorInSel();
                     }
                     break;
               }
            }
         },

         /**
          * Handles a key up event in the editor. TODO: reorganize with handler
          * for menu
          * 
          * @param {Event}
          *           evt The key up event
          */
         handleKeyUp : function(evt) {
            var key = evt.data.getKey();
            switch (key) {
               case keys.UP_ARROW:
               case keys.DOWN_ARROW:
                  break;
               case keys.ESCAPE:
               case keys.CANCEL:
                  this.cancel();
                  break;
               case keys.BACKSPACE:
                  // evt.data.preventDefault(true);
                  if (this._node.$.parentNode) {
                     return this.handleBackspace();
                  }
                  this.hideMenu();
                  this.onCancel();
                  break;
               case keys.SPACE:
                  // browserCheck will only be true for IE8-10. IE11, FF, and
                  // others will be false.
                  var browserCheck = ((has('ie') && !textBoxUtils.isIE11));
                  // if IE8-10, space has not been added yet - check if last
                  // char was a space.
                  var ieSpace = (this._buffer.length > 0 && browserCheck && textBoxUtils.isSpace(this._buffer[(this._buffer.length - 1)]));
                  // for IE11 & FF, space has already been added, make sure
                  // there arent 2 spaces in a row.
                  var compositionSpace = (!browserCheck && this._buffer.length > 1 && textBoxUtils.isSpace(this._buffer[(this._buffer.length - 1)]) && textBoxUtils
                        .isSpace(this._buffer[(this._buffer.length - 2)]));
                  // If the typeahead menu is showing and there are no
                  // matches, cancel
                  if ((compositionSpace && this.menu && this.menu.isShowing && this.menu.noResultsFound()) || ieSpace) {
                     if (ieSpace) {
                        this.updateBuffer();
                     }
                     this.cancel();
                     break;
                  }
               default:
                  // be sure we're NOT pasting anything
                  if (!(((key == 86 || key == keys.F7) && (evt.data.$.ctrlKey || evt.data.$.metaKey)) || (evt.data.$.shiftKey && key == keys.INSERT))
                        || (evt.data.$.ctrlKey && key == 88)) {
                     if (this._activatorInSel) {
                        this._activatorInSel = false;
                     }
                     else {
                        this.updateBuffer();
                        if (getComplexity(this._buffer) > 1) {
                           // if user is spacing on a menu with no results (non
                           // dbcs input): cancel. Otherwise, show updated menu.
                           if (key == keys.SPACE && this.menu.isShowing && this.menu.noResultsFound() && !this.dbcsComposing) {
                              this.cancel();
                              this.hideMenu();
                           }
                           else {
                              this.showMenu();
                           }
                        }
                     }
                  }
                  break;
            }
         },

         /**
          * Check to see if there is an uncompleted mention in the selection
          */
         activatorInSelection : function() {
            var selection = this._editor.getSelection().getSelectedText();
            return selection && selection.indexOf(this.activatorChar) > -1;
         },

         /**
          * Checks to see if there is an uncompleted metions in the selection
          * and if there is it removes it.
          */
         checkForActivatorInSel : function() {
            if (this.activatorInSelection()) {
               this.removeMention();
               this._activatorInSel = false;
            }
         },

         /**
          * Handles the backspace key, removes last typed character and cancels
          * mention if buffer is empty.
          */
         handleBackspace : function() {
            this.updateBuffer();
            var backspaceBuffer = this._node.getText().split('');
            if (backspaceBuffer.length < 1) {
               this.cancel();
               return true;
            }
            if (getComplexity(this._buffer) > 1) {
               this.showMenu();
            }
            else {
               this.hideMenu();
            }
         },

         /**
          * Updates the internal buffer with the content from the active node
          */
         updateBuffer : function() {
            // Removes the character from the buffer (can be anywhere within the
            // string)
            this._buffer = (this._node) ? this._node.getText().substring(1).split('') : [];
            // replace the non-breaking space (160) with a ' '
            array.forEach(this._buffer, lang.hitch(this, function(current, i) {
               // FIXME: compare with a number, not a string
               if (current.charCodeAt(0) == '160') {
                  this._buffer[i] = ' ';
               }
            }));
         },

         /**
          * Handles deletion of text to announce removed mentions
          * 
          * @param {CKEDITOR.editor}
          *           editor The editor instance
          * @param {CKEDITOR.dom.selection}
          *           selection The selection
          */
         handleDeletion : function(editor) {
            var range = editor.getSelection().getRanges()[0];
            var mentionsinSelection = this.getMentionsAtRange(range, editor);

            if (mentionsinSelection && mentionsinSelection.length > 0) {
               var endContainer = range.endContainer, bookmark, activatorChar;

               if (mentionsinSelection.length == 1 && !has('ie')) {
                  // read ARIA
                  ARIAMixin.addLabel(editor, endContainer.getParent(), string.substitute(this.ariaLabels.removed, [ mentionsinSelection[0].name
                  ]) || '');
               }

               array.forEach(mentionsinSelection, lang.hitch(this, function(mention) {
                  this._buffer = mention.name.split('');
                  activatorChar = this.bidiActivatorChar();
                  if (mention.name.indexOf(activatorChar) !== -1) {
                     mention.name = mention.name.substring(mention.name.indexOf(activatorChar) + activatorChar.length);
                  }
                  var removedInfo = {
                     editor : editor,
                     mention : mention.name,
                     node : mention.node,
                     id : mention.id,
                     className : "PersonMentionsNode",
                     getUserId : function() {
                        return mention.id;
                     }
                  };
                  var editorName = editor.name
                  if (this.eventHandles.onRemoveMention && this.eventHandles.onRemoveMention[editorName]) {
                     this.eventHandles.onRemoveMention[editorName](removedInfo);
                  }
                  // Notify subscribers that mention was removed
                  topic.publish("lconn/microblogging/mention/removed", removedInfo);
               }));

               if (endContainer.$.className == 'vcard') {
                  bookmark = endContainer.$;
               }
               range.deleteContents();
               range.collapse();
               // remove all the \u200b inserted after the completion of every
               // mention
               removeZeroWidthSpaces(range);

               if (bookmark) {
                  if (has('ie')) {
                     // Defect 130511: [CKEditor] IE10 - Using the backspace key
                     // after
                     // deleting a mentions will cause a backpage
                     // First set the cursor to be before the empty span
                     var newRange = editor.createRange();
                     newRange.setStartAt(endContainer, CKEDITOR.POSITION_AFTER_START);
                     newRange.setEndAt(endContainer, CKEDITOR.POSITION_BEFORE_START);
                     newRange.select();

                     // Deletes the empty span
                     endContainer.remove();
                  }
                  else {
                     // are you still here?
                     bookmark.remove();
                     // Deleting vcard node cause the focus to dissapear, we set
                     // it
                     // back where it was
                     var setCursor = editor.getSelection().getRanges()[0];
                     setCursor.select();
                  }
               }
            }
         },

         /**
          * Handles fixing a mention if data has been pasted
          */
         handlePasteUndo : function(evt) {
            var editorRefModified = false;
            var editorRefOld;
            var listOfMentions = query("span.vcard", evt.editor.document.$);
            var checkBizCard = (evt.name == 'afterPaste');
            // if this._editor = null use the reference from the event
            if (!this._editor) {
               editorRefOld = this._editor;
               this._editor = evt.editor;
               editorRefModified = true;
            }
            array.forEach(listOfMentions, lang.hitch(this, function(node) {
               this.decorateContent(node, checkBizCard);
            }));
            // restoring the reference of the editor (null)
            if (editorRefModified) {
               this._editor = editorRefOld;
            }
         },

         /**
          * Handles paste event in the editor. Used to update the internal
          * buffer and force the cursor/range.
          * 
          * @param {Event}
          *           evt The paste event
          */
         handlePasteActive : function(pasted, editor) {
            this._buffer = this._buffer.concat(pasted.split(''));
            this._node.$.textContent = this.bidiActivatorChar() + this._buffer.join('');

            var range = new CKEDITOR.dom.range(this._node);
            range.setStartAt(this._node, CKEDITOR.POSITION_BEFORE_END);
            range.setEndAt(this._node, CKEDITOR.POSITION_BEFORE_END);
            range.select();
            editor.focus();

            if (getComplexity(this._buffer) > 1) {
               this.showMenu();
            }
         },

         /**
          * Completes a mention
          */
         complete : function(item) {
            var zeroSpace = new CKEDITOR.dom.text('\u200b'), remove, removeSymbol, notify, completedInfo;

            // Adds the microformat
            if (lang.isFunction(this.addMicroFormat)) {
               this.addMicroFormat(item);
            }
            else {
               // we cannot add the mention so we cancel it.
               this.cancel();
               return;
            }

            // Hide menu
            this.hideMenu();
            this.onComplete();
            removeSymbol = lang.hitch(this, this.removeSymbol, this._node, item);
            completedInfo = {
               editor : this._editor,
               mention : lang.isFunction(this.formatData) ? this.formatData(item) : item,
               node : this._node.$,
               removeSymbol : removeSymbol,
               addSymbol : lang.hitch(this, this.addSymbol, this._node, item),
               isUserExternal : lang.hitch(this, this.isExternal, item),
               getUserId : lang.hitch(this, this.getUserId, item),
               getUserOrgId : lang.hitch(this, this.getUserOrgId, item),
               className : this.className,
               value : item && item.name
            };
            // handle onCreateMention callback
            var editorName = this._editor.name;
            if (this.eventHandles.onCreateMention && this.eventHandles.onCreateMention[editorName]) {
               this.eventHandles.onCreateMention[editorName](completedInfo);
            }

            // Notify subscribers that mention was completed
            topic.publish("lconn/microblogging/mention/completed", [ completedInfo
            ]);
            // Gives the caller a chance to reject the mention
            if (lang.isFunction(this._editor.config.ibmMentionShouldNotifyCallback)) {
               notify = this._editor.config.ibmMentionShouldNotifyCallback(item);
               if (!notify) {
                  // Remove mention immediately
                  remove();
               }
               else if (lang.isFunction(notify.then)) {
                  // Promise
                  notify.then(function() {
                     return;
                  }, remove);
               }
            }
            this.setLabel((this.ariaLabels && string.substitute(this.ariaLabels.completed, [ this.getValue()
            ])) || '');
            // Inserting the zero space char at the end so we can select/delete
            if (!textBoxUtils.isIE11) {
               zeroSpace.insertAfter(this._node);
            }
         },

         /**
          * Cancels a mention
          */
         cancel : function() {
            // sister function to 'removeMention', different in that it re-adds
            // the
            // activator char and any text
            // used to cancel a mention without removing any text.
            // remove the mention
            this.removeMention();
            // Replace with text
            this._editor.insertText(this.activatorChar + this.getValue());
         },

         /**
          * removes a mention
          */
         removeMention : function() {
            // sister function to 'cancel', different in that it does not re-add
            // the activator char.
            // needed for removing mention when only '@' char is remaining.
            this.setLabel((this.ariaLabels && string.substitute(this.ariaLabels.cancelled, [ this.getValue()
            ])) || '');
            this._node.remove();
            this.hideMenu();
            this.onCancel();
         },

         /**
          * Shows the typeahead menu
          */
         showMenu : function() {
            if (!this.menu) {
               this.menu = new TypeAheadMenu({
                  store : (this.getStore || function() {
                     return null;
                  })(),
                  onSelect : lang.hitch(this, this.onSelect),
                  onMenuKeyDown : lang.hitch(this, this.onMenuKeyDown),
                  onMenuKeyPress : lang.hitch(this, this.onMenuKeyPress),
                  idx : this.idx,
                  typeaheadHeaderString : this.typeaheadHeaderString
               });
               this.idx++;
            }

            if (dojo.isIE >= 8 || textBoxUtils.isIE11) {
               this.menu.cancelBlur = true;
            }

            // Enables JAWS to notify user typeahead has been opened
            this.setLabel(this.menu.getTypeaheadLabel());
            this.menu.search({
               input : this.getValue(),
               node : this._node.$
            });
         },

         /**
          * Hides the typeahead menu
          */
         hideMenu : function() {
            if (this.menu) {
               this.menu.hide();
            }
         },

         /**
          * Returns the value of this mention
          * 
          * @returns {String} The value
          */
         getValue : function() {
            return this._buffer.join('');
         },

         /**
          * Sets the value of this mention
          * 
          * @param {String}
          *           value The value
          */
         setValue : function(value) {
            this._buffer = value.split('');
            // Update the node
            this._node.setText(this.bidiActivatorChar() + this.getValue());
         },

         /**
          * Sets the header on the typeahead used to select a person.
          */
         handleSetTypeaheadHeader : function(s) {
            if (this.menu) {
               this.menu.setTypeaheadHeader(s);
            }
            else {
               this.typeaheadHeaderString = s;
            }
         },

         /**
          * Callback for the typeahead menu
          */
         onSelect : function() {
            var item = this.menu.getSelectedItem();
            if (item) {
               // Set the value
               this.setValue(this.getTextFromItem(item));
               // Complete mention
               this.complete(item);
               // There is no need to return the focus as it never leaves the
               // editor
            }
            else if (has('ie') == 8) {
               this.menu.cancelBlur = true;
            }
         },

         /**
          * Sets the header on the typeahead used to select a person.
          */
         handleAddCallback : function(handle, callback, editor) {
            if (!this.eventHandles[handle]) {
               this.eventHandles[handle] = {};
            }
            this.eventHandles[handle][editor.name] = callback;
         },

         /**
          * Changes the default dataStore
          */
         handleSetDataStore : function(store) {
            this.setStore(store);
         },

         /**
          * Changes the default network object
          */
         handleSetNetwork : function(network) {
            this.setNetwork(network);
         },

         /**
          * Callback for keypress events on the typeahead menu.
          */
         onMenuKeyPress : function(e) {
            if (e.charCode > 0) {
               this._buffer.push(String.fromCharCode(e.charCode));
               this.setValue(this.getValue());
            }
         },

         /**
          * Callback for keyup events on the typeahead menu.
          * 
          * @param {Event}
          *           e The keyboard event
          */
         onMenuKeyDown : function(e) {
            switch (e.keyCode) {
               case keys.ESCAPE:
               case keys.CANCEL:
                  this._editor.focus();
                  break;
               case keys.BACKSPACE:
                  e.preventDefault();
                  e.stopPropagation();
                  this._editor.focus();
                  this.dispatchEvent(this._node.$.ownerDocument.body, e);
                  if (this.menu) {
                     this.menu.focus();
                  }
                  this.handleBackspace();
                  break;
            }
         },

         /**
          * TODO: move to utils
          */
         dispatchEvent : function(target, e) {
            var event = /*
             * document.createEvent("KeyboardEvent");
             * (event.initKeyEvent ||
             * event.initKeyboardEvent).call(event, e.type,
             * e.bubbles, e.cancelable, null, e.ctrlKey, e.altKey,
             * e.shiftKey, e.metaKey, e.keyCode, e.charCode);
             */
            events.createKeyboardEvent(e.type, {
               "char" : String.fromCharCode(e.charCode),
               "key" : e.keyCode,
               "location" : 0,
               "ctrlKey" : e.ctrlKey,
               "shiftKey" : e.shiftKey,
               "altKey" : e.altKey,
               "metaKey" : e.metaKey,
               "repeat" : false,
               "locale" : "",

               "detail" : 0,
               "bubbles" : e.bubbles,
               "cancelable" : e.cancelable,

               // legacy properties
               "keyCode" : e.keyCode,
               "charCode" : e.charCode,
               "which" : e.which
            });
            target.dispatchEvent(event);
         },

         /**
          * Callback for completion. Must be set by caller.
          */
         onComplete : function() {
            return;
         },

         /**
          * Callback for cancelled mentions. Must be set by caller.
          */
         onCancel : function() {
            return;
         }
      };

      // Mixin ARIA helper methods
      lang.mixin(_Handler, ARIAMixin);

      return _Handler;
   });
