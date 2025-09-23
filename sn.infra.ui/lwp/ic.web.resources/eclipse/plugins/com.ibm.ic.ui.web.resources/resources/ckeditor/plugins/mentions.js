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
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/has",
        "dojo/keys",
        "./mentions/PersonHandler",
        // "./mentions/HashtagHandler",
        "./mentions/TypeAheadMenu",
        "ic-core/auth",
        "ic-core/config",
        "ic-core/config/properties",
        "ic-core/lcTextArea/mixins/ITextBoxUtils",
        "ic-core/util/text",
        "dojo/topic"
], function(array, lang, has, keys, PersonHandler, /* HashtagHandler, */TypeAheadMenu, auth, config, properties, ITextBoxUtils, textUtils, topic) {

   var textBoxUtils = new ITextBoxUtils();
   /**
    * CKEditor plugin for mentions
    * 
    * @namespace ic-ui.ckeditor.plugins.mentions
    */
   var plugin = {};
   /*
    * The name of the generic property that controls enablement of this feature
    */
   var PROPERTY = 'com.ibm.lconn.core.web.ckeditor.mentions.enabled';

   /**
    * The name of this plugin
    */
   var name = 'mentions';

   /**
    * Returns the name of this plugin
    * 
    * @function getName
    * @memberof ic-ui.ckeditor.plugins.mentions
    */
   plugin.getName = function() {
      return name;
   };

   /**
    * Returns true if this plugin is enabled
    * 
    * @function isEnabled
    * @memberof ic-ui.ckeditor.plugins.mentions
    * @returns true if the plugin is enabled
    */
   plugin.isEnabled = function() {
      return properties[PROPERTY] !== 'false';
   };

   /**
    * Dynamically adds a CKEditor plugin that enables an extensible set of
    * mentions.
    * 
    * @function addPlugin
    * @memberof ic-ui.ckeditor.plugins.mentions
    */
   plugin.addPlugin = function() {
      if (CKEDITOR && CKEDITOR.plugins && CKEDITOR.plugins.registered && CKEDITOR.plugins.registered[name]) {
         return;
      }

      CKEDITOR.plugins.add(name, {
         init : function(editor) {
            // Abort initialization if disabled trough instance config or user
            // is external
            if (editor.config.ibmMentionDisabled || (auth.getUser() && auth.getUser().isExternal)) {
               return;
            }

            var READY = 0, ACTIVE = 1;
            var state = READY, handler = null;
            var dbcsComposing = false;

            
            function resetState() {
               state = READY;
            }

            /*
             * Returns the char before the cursor. Used to check if there's a
             * space before the activator char and the handler should be
             * activated
             */
            function getPreviousChar(editor) {
               // get char before cursor to determine if there is space
               // before @mentions
               var range = editor.getSelection().getRanges()[0],
                  startNode = range.startContainer;
               // the range is at the <p> element get the offset child
               if (startNode.type == CKEDITOR.NODE_ELEMENT) {
                  // startNode is an element node -> get the text value from the element at the endOffset position
                  var selectedElement = startNode.getChild(range.startOffset > 0 ? range.startOffset - 1 : 0);
                  if (selectedElement) {
                     var text = selectedElement.getText();
                     // if text == '' then we are at the start of a line
                     return text == '' ? ' ' : text[range.startOffset > 0 ? text.length - 1 : 0];
                  }
               }
               // Range at the non-zero position of a text node.
               if (startNode.type == CKEDITOR.NODE_TEXT && startNode.getText() != '\u200b') {
                  return startNode.getText()[range.startOffset ? range.startOffset - 1 : 0];
               }
               // We go backwards skipping &nbsp; and nodes with no content...
               while (startNode && (startNode.getText() == '' || startNode.getText() == '\u200b')){
                  startNode = startNode.getPrevious();
               }
               return startNode ? startNode.getText()[startNode.getText().length - 1] : ' ';
            }

            /*
             * Handles deletion of a selection or via caret. Delegates all
             * registered handlers to check if the selection contains mentions.
             */
            function handleDelete(ev) {
               // Loops through all registered handlers
               array.forEach(handlers, function(handler) {
                  handler.handleDeletion(editor);
               });
            }
            function onKey(ev) {
               var key = ev.data.keyCode;
               if (key != keys.ENTER) {
                  return;
               }
               switch (state) {
                  case ACTIVE:
                     if (handler && handler.handleKeyDown(ev)) {
                        delete handler;
                        resetState();
                     }
                     break;
               }
            }

            function onPaste(ev) {
               // Update the text
               switch (state) {
                  case ACTIVE:
                     if (handler && handler.handlePasteActive(ev.data.dataValue, editor)) {
                        delete handler;
                        resetState();
                     }
                     ev.cancel();
                     editor.fire('afterPaste', ev);
                     break;
                  case READY:
                     // remove userid of the paste mention, so the bizcard could be retrieved
                     // for paste mention
                     if (ev && ev.data) {
                        var tempNode = document.createElement('div');
                        tempNode.innerHTML = ev.data.dataValue;
                        var mentionNodes = dojo.query("span.vcard", tempNode);
                        array.forEach(mentionNodes, function(node) {
                           if (node.childNodes.length && node.childNodes[1] && node.childNodes[1].className == 'x-lconn-userid') {
                              node.childNodes[1].className = "";
                           }
                        });
                        ev.data.dataValue = tempNode.innerHTML;
                     }
                     break;
               }
            }

            function onAfterPaste(ev) {
               switch (state) {
                  case ACTIVE:
                     handler.handlePasteUndo(ev);
                     break;
                  case READY:
                     // Loops through all registered handlers
                     array.forEach(handlers, function(handler) {
                        handler.handlePasteUndo(ev);
                     });
                     break;
               }
            }

            function onClick(ev) {
               var targetNode = ev.data.getTarget();
               if ((targetNode.$.tagName == "A" || targetNode.$.tagName == "SPAN") && targetNode.$.getAttribute('href')) {
                  //dont prevent FF right-click event.
                  if(!(has('ff') && ev.data.$.button && ev.data.$.button == 2)){
                     //you are clicking on a link, prevent the default action during editing mode, for AVT compliance.
                     ev.data.preventDefault(true);
                  }
               }
            }
            
            
            function onCompositionStart(ev){
               dbcsComposing = true;
               if(handler){
                  handler.handleCompositionStart();
               }
            }

            function onCompositionEnd(ev) {
               switch (state) {
                  case ACTIVE:
                     if ((textBoxUtils.isIE11 || !has('ie')) && handler && handler.handleComposition(ev)) {
                        delete handler;
                        resetState();
                     }
                     break;
               }
               dbcsComposing = false;
            }

            function onKeyPress(ev) {
               var key = ev.data.getKey();
               if (key == keys.ENTER) {
                  return;
               }
               switch (state) {
                  case READY:
                     var accel = array.filter(accelerators, function(accel) {
                        return key == accel[0];
                     })[0];
                     if (accel && textBoxUtils.isSpace(getPreviousChar(editor))) {
                        ev.data.preventDefault();
                        handler = handlers[accel[1]];
                        handler.activate(editor);
                        handler.onComplete = resetState;
                        handler.onCancel = resetState;
                        state = ACTIVE;
                        topic.publish("lconn/core/mentions/started", {
                           editor : editor,
                           node : handler._node,
                           cancel : lang.hitch(handler, handler.cancel)
                        });
                     }
                     break;
                  case ACTIVE:
                     break;
               }
            }

            function onKeyDown(ev) {
               var key = ev.data.getKey();
               if(has('ie') || has('chrome'))
                  dbcsComposing = (key == 229);
               if (key == keys.ENTER) {
                  return;
               }
               switch (state) {
                  case ACTIVE:
                     if (handler && handler.handleKeyDown(ev)) {
                        delete handler;
                        resetState();
                     }
                     break;
                  case READY:
                     if (array.indexOf([keys.BACKSPACE, keys.DELETE], key) !== -1) {
                        handleDelete(ev);
                     }
                     // TODO: CODE BELOW MARKED TO BE REVIEWED AND REMOVED ASAP
                     if (key == keys.BACKSPACE || key == keys.DELETE) {
                        // handles Chrome and IE9+ issue where deleting
                        // completed @mention navigates to previous page.
                        if (has('chrome') || has('ie') > 8) {
                           // var editor = ev.sender.editor;
                           var range = editor.getSelection().getRanges()[0], startNode = range.startContainer;
                           // determines if there is an @mentions
                           if (handler) {
                              if (startNode.$ && (startNode.$.parentNode != editor)) {
                                 var selectedNode = startNode.$;
                                 if (has('ie') && selectedNode.length <= 1 && selectedNode.previousSibling && selectedNode.previousSibling.tagName == "SPAN") {
                                    selectedNode = selectedNode.previousSibling;
                                 }
                                 else {
                                    // crawls up to get the selected texts
                                    // parentNode
                                    while (selectedNode.tagName && 
                                          array.indexOf(["P", "SPAN"], selectedNode.tagName) !== -1 &&
                                          array.indexOf(["P", "SPAN"], selectedNode.parentNode.tagName) !== -1) {
                                       selectedNode = selectedNode.parentNode;
                                    }
                                 }

                                 // if selectedNode is an @mentions node,
                                 // then preventDefault action and remove.
                                 var nodeClass = selectedNode.className;
                                 if (nodeClass && nodeClass.indexOf('vcard') > -1) {
                                    ev.data.preventDefault(true);
                                    if (handler._node && handler._node.$ == selectedNode) {
                                       selectedNode = handler._node;
                                    }
                                    else if (has('ie') > 8) {
                                       selectedNode = startNode.getPreviousSourceNode();
                                    }
                                    if (has('chrome')) {
                                       selectedNode.remove();
                                    }
                                    else {
                                       // make range select from start of
                                       // mention, to end... then remove.
                                       range.setStartBefore(selectedNode);
                                       range.setEndAfter(startNode);
                                       range.deleteContents();
                                    }
                                    if (handler) {
                                       handler = undefined;
                                    }
                                 }
                              }

                           }
                        }
                     }
               }
            }

            function onKeyUp(ev) {
               var key = ev.data.getKey();
               //boolean var determining if user is hitting space on IE<11 during DBCS input
               var ieSpace, prevSpace;
               if (key == keys.ENTER) {
                  return;
               }
               switch (state) {
                  case ACTIVE:
                     var ieComposition = ((has('ie') > 8 && !textUtils.isIE11) && dbcsComposing);
                     ieSpace = (has('ie') && key == keys.SPACE && dbcsComposing);
                     prevSpace = textBoxUtils.isSpace(getPreviousChar(editor));
                     if(ieComposition || (ieSpace && !prevSpace)){
                        if(handler)
                           handler.handleComposition(ev);
                     }
                     else {
                        if(handler){
                           handler.dbcsComposing = false;
                           if(handler.handleKeyUp(ev)) {
                              delete handler;
                              resetState();
                           }
                        }
                     }
                  case READY:
                     if (array.indexOf([keys.BACKSPACE, keys.DELETE], key) !== -1 && has('ie') == 8) {
                        handleDelete(ev);
                     }
                     break;
               }
            }

            function onAfterCommandExec(ev) {
               if (ev.data.name == 'undo' || ev.data.name == 'redo') {
                  switch (state) {
                     case ACTIVE:
                        handler.handlePasteUndo(ev);
                        break;
                     case READY:
                        // Loops through all registered handlers
                        array.forEach(handlers, function(handler) {
                           handler.handlePasteUndo(ev);
                        });
                        break;
                  }
               }
            }

            function onBlur(ev) {
               switch (state) {
                  case ACTIVE:
                     handler.handleBlur();
                     break;
               }
            }

            function onbeforeSetMode(ev) {
               switch (state) {
                  case ACTIVE:
                     handler.handleModeChange();
                     resetState();
                     break;
               }
            }

            function onBeforeGetData(ev) {
               switch (state) {
                  case ACTIVE:
                     handler.handleBeforeGetData(ev);
                     resetState();
                     break;
               }
            }

            editor.on("mode", function(evt) {
               if (editor.mode === "wysiwyg") {
                  /*
                   * Handles the onBlur event
                   */
                  editor.on('blur', onBlur);
                  /*
                   * Handles the change event from CKeditor to HTML Mode
                   */
                  editor.on('beforeSetMode', onbeforeSetMode);
                  /*
                   * Handles the Enter key
                   */
                  editor.on('key', onKey);
                  /*
                   * Handles for pasted data
                   */
                  editor.on('paste', onPaste);
                  /*
                   * Handles the undo/redo event
                   */
                  editor.on('afterCommandExec', onAfterCommandExec);
                  /*
                   * Handles paste events
                   */
                  editor.on('afterPaste', onAfterPaste);
                  /*
                   * Begins handling composition event for DBCS characters
                   */
                  editor.document.on("compositionstart", onCompositionStart);
                  /*
                   * Handles composition event for DBCS characters
                   */
                  editor.document.on("compositionend", onCompositionEnd);
                  /*
                   * Handles keypress events for printable chars to enable
                   * mention, or to provide its contents
                   */
                  editor.document.on("keypress", onKeyPress);
                  /*
                   * Prevents clicks on links
                   */
                  editor.document.on("click", onClick);
                  /*
                   * Handles keydown events for non-printable chars when the
                   * mention is active
                   */
                  editor.document.on("keydown", onKeyDown);
                  /*
                   * Handles keyup events for non-printable chars when the
                   * mention is active
                   */
                  editor.document.on("keyup", onKeyUp);
               }
            })
            /*
             * Handles the beforeGetData event to cancel all mentions if there
             * is any active
             */
            topic.subscribe('CKEDITOR.beforeGetData', onBeforeGetData);
         },
         
         /**
          * cancels any currently active mention.
          */
         cancelActiveMentions : function(editor){
            array.forEach(handlers, function(handler){
               if(handler._editor && handler._editor == editor  && handler._node && handler._node.$.nodeName == "A" && handler._node.$.parentNode != null){
                  handler.cancel();
               }
            });
         },

          /**
           * Sets the header on the typeahead used to select a person.
           */
          setTypeaheadHeader : function(s) {
             array.forEach(handlers, function(handler) {
                handler.handleSetTypeaheadHeader(s);
             });
          },

          /**
           * Adds external callbacks to mentions
           */
          addCallback : function(handle, callback, editor) {
             array.forEach(handlers, function(handler) {
                handler.handleAddCallback(handle, callback, editor);
             });
          },

          /**
           * Changes the default dataStore
           */
          setDataStore : function(o) {
             array.forEach(handlers, function(handler) {
                handler.handleSetDataStore(o);
             });
          },

          /**
           * Changes the default network
           */
          setNetwork : function(o) {
             array.forEach(handlers, function(handler) {
                handler.handleSetNetwork(o);
             });
          }
      });

      // Register default handlers
      plugin.registerHandler(PersonHandler);
      // Hashtag handler is disabled for now
      // plugin.registerHandler(HashtagHandler);
   };

   /*
    * List of handlers. Each registered handler can have an activator key, and
    * will become active (i.e. handle user input) as it's typed in the editor
    */
   var handlers = [],

   /*
    * List of accelerators for handlers. Each accelerator represents the char
    * code of the activator key of the handler, and the handler's index in the
    * handlers list
    */
   accelerators = [];

   /**
    * Registers a new handler with the mentions plugin
    * 
    * @function registerHandler
    * @memberOf ic-ui.ckeditor.plugins.mentions
    * @param {Object}
    *           handler The handler to register
    */
   plugin.registerHandler = function(handler) {
      var index = handlers.push(handler) - 1;
      var arr = lang.isArray(handler.activatorChar) ? handler.activatorChar : [ handler.activatorChar
      ];
      array.forEach(arr, function(c) {
         accelerators.push([
                            c.charCodeAt(0),
                            index
         ]);
      });
   };

   return plugin;
});
