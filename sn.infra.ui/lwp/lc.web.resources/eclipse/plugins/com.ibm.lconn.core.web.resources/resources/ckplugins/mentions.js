/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {

   /**
    * CKEditor plugin for mentions
    *
    * @namespace lconn.core.ckplugins.mentions
    */
   var plugin = dojo.provide("lconn.core.ckplugins.mentions");

   /*
    * The name of the generic property that controls enablement of this feature
    */
   var PROPERTY = 'com.ibm.lconn.core.web.ckeditor.mentions.enabled';

   dojo.require("lconn.core.ckplugins.mentions.PersonHandler");
   dojo.require("lconn.core.ckplugins.mentions.HashtagHandler");
   dojo.require("lconn.core.ckplugins.mentions.TypeAheadMenu");
   dojo.require("lconn.core.lcTextArea.mixins.ITextBoxUtils");
   dojo.require("lconn.core.config.properties");
   dojo.require("lconn.core.auth");

   /**
    * The name of this plugin
    */
   var name = 'mentions';

   /**
    * Returns the name of this plugin
    *
    * @function getName
    * @memberof lconn.core.ckplugins.mentions
    */
   plugin.getName = function() {
      return name;
   };

   /**
    * Returns true if this plugin is enabled
    *
    * @function isEnabled
    * @memberof lconn.core.ckplugins.mentions
    * @returns true if the plugin is enabled
    */
   plugin.isEnabled = function() {
      return lconn.core.config.properties[PROPERTY] !== 'false';
   };

   /**
    * Dynamically adds a CKEditor plugin that enables an extensible set of
    * mentions.
    *
    * @function addPlugin
    * @memberof lconn.core.ckplugins.mentions
    */
   plugin.addPlugin = function() {
      if (CKEDITOR && CKEDITOR.plugins && CKEDITOR.plugins.registered
            && CKEDITOR.plugins.registered[name])
         return;

      CKEDITOR.plugins.add(name, {
         init : function(editor) {
            // Abort initialization if disabled trough instance config or user
            // is external
            if (editor.config.ibmMentionDisabled || lconn.core.auth.getUser()
                  && lconn.core.auth.getUser().isExternal)
               return;

               var READY = 0, ACTIVE = 1;
               var state = READY, handler = null;
               var dbcsComposing = false;
               var textUtils = lconn.core.lcTextArea.mixins.ITextBoxUtils();
               
               function resetState() {
                  state = READY;
               }

               /*
                * Handles the beforeGetData event to cancel all mentions if there is any active
                */
               dojo.subscribe('CKEDITOR.beforeGetData', onBeforeGetData);

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
                * registered handlers to check if the selection contains
                * mentions.
                */
               function handleDelete(ev) {
                  // Loops through all registered handlers
                  dojo.forEach(handlers, function(handler) {
                     handler.handleDeletion(editor);
                  });
               }
               
               function onKey(ev){
                  var key = ev.data.keyCode;
                  if (key != dojo.keys.ENTER) {
                     return;
                  }
                  switch (state) {
                     case ACTIVE:
                        if (handler && handler.handleKeyDown(ev)) {
                           delete handler;
                           resetState();
                        }
                  }
               }
               
               function onPaste(ev){
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
                           dojo.forEach(mentionNodes, function(node) {
                              if (node.childNodes.length && node.childNodes[1] && node.childNodes[1].className == 'x-lconn-userid') {
                                 node.childNodes[1].className = "";
                              }
                           });
                           ev.data.dataValue = tempNode.innerHTML;
                        }
                        break;
                  }
              }
               
               function onAfterPaste(ev){
                  switch (state) {
                     case ACTIVE:
                        handler.handlePasteUndo(ev);
                        break;
                     case READY:
                        // Loops through all registered handlers
                        dojo.forEach(handlers, function(handler) {
                           handler.handlePasteUndo(ev);
                        });
                        break;
                  }
               }

               function onClick(ev){
                  var targetNode = ev.data.getTarget();
                  if ((targetNode.$.tagName == "A" || targetNode.$.tagName == "SPAN") && targetNode.$.getAttribute('href')) {
                     //dont prevent FF right-click event.
                     if(!(dojo.isFF && ev.data.$.button && ev.data.$.button == 2)){
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
               
               function onCompositionEnd(ev){
                   switch (state) {
                   case ACTIVE:
                      //ignore for all IEs except IE11
                      if ((textUtils.isIE11 || !dojo.isIE) && handler && handler.handleComposition(ev)) {
                         delete handler;
                         resetState();
                      }
                   }
                   dbcsComposing = false;
                }
               
               function onKeyPress(ev){
                  var key = ev.data.getKey();
                  //var editor = ev.sender.editor;

                  if (key == dojo.keys.ENTER){
                     return;
                  }
                  switch (state) {
                     case READY:
                        var accel = dojo.filter(accelerators, function(accel) {
                           return key == accel[0];
                        })[0];
                        if (accel && textUtils.isSpace(getPreviousChar(editor))) {
                           ev.data.preventDefault();
                           handler = handlers[accel[1]];
                           handler.activate(editor);
                           handler.onComplete = resetState;
                           handler.onCancel = resetState;
                           state = ACTIVE;
                           dojo.publish("lconn/core/mentions/started", [ {
                              editor : editor,
                              node : handler._node,
                              cancel : dojo.hitch(handler, handler.cancel)
                           } ]);
                        }
                        break;
                     case ACTIVE:
                        break;
                  }
               }
               
               function onKeyDown(ev){
                  var key = ev.data.getKey();
                  if(dojo.isIE || dojo.isChrome){
                     dbcsComposing = (key == 229);
                  }
                  
                  if (key == dojo.keys.ENTER){
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
                        if (dojo.indexOf([dojo.keys.BACKSPACE, dojo.keys.DELETE], key) !== -1) {
                           handleDelete(ev);
                        }
                        // TODO: CODE BELOW MARKED TO BE REVIEWED AND REMOVED ASAP
                        if(key == dojo.keys.BACKSPACE || key == dojo.keys.DELETE){
                           // handles Chrome and IE9+ issue where deleting completed
                           // @mention navigates to previous page.
                           if(dojo.isChrome || dojo.isIE > 8){
                             //var editor = ev.sender.editor;
                             var range = editor.getSelection().getRanges()[0],
                             startNode = range.startContainer;
                             // determines if there is an @mentions
                              if (handler) {
                                 if(startNode.$ && (startNode.$.parentNode != editor)){
                                    var selectedNode = startNode.$;
                                     if(dojo.isIE && selectedNode.length <= 1 && selectedNode.previousSibling && selectedNode.previousSibling.tagName == "SPAN"){
                                        selectedNode = selectedNode.previousSibling;
                                     }else{
                                        // crawls up to get the selected texts parentNode
                                        while(selectedNode.tagName && selectedNode.tagName != ("P" || "SPAN") && selectedNode.parentNode.tagName != ("P" || "SPAN")){
                                           selectedNode = selectedNode.parentNode;
                                        }
                                     }
                                    
                                    // if selectedNode is an @mentions node,
                                    // then preventDefault action and remove.
                                    var nodeClass = selectedNode.className;
                                    if(nodeClass && nodeClass.indexOf('vcard') > -1){
                                       ev.data.preventDefault(true);
                                       if(handler._node && handler._node.$ == selectedNode){
                                             selectedNode = handler._node;
                                       }else if(dojo.isIE > 8){
                                          selectedNode = startNode.getPreviousSourceNode();
                                       }
                                       if(dojo.isChrome){
                                          selectedNode.remove();
                                       }else{
                                          //make range select from start of mention, to end... then remove.
                                          range.setStartBefore(selectedNode);
                                          range.setEndAfter(startNode);
                                          range.deleteContents();
                                       }  
                                       if(handler)
                                          delete handler;
                                    }
                                 }
                              }
                           }
                        }
                  }
               }

               function onKeyUp(ev){
                  var key = ev.data.getKey();
                  //boolean var determining if user is hitting space on IE to finish a DBCS input
                  var ieSpace, prevSpace;
                  if (key == dojo.keys.ENTER){
                     return;
                  }
                  switch (state) {
                     case ACTIVE:
                        var ieComposition = ((dojo.isIE > 8 && !textUtils.isIE11) && dbcsComposing);
                        ieSpace = (dojo.isIE && key == dojo.keys.SPACE && dbcsComposing);
                        prevSpace = textUtils.isSpace(getPreviousChar(editor));
                        if(ieComposition || (ieSpace && !prevSpace)){
                           if(handler){
                              handler.handleComposition(ev);
                           }
                        }else{
                           if(handler){
                              handler.dbcsComposing = false;
                              if (handler.handleKeyUp(ev)) {
                                 delete handler;
                                 resetState();
                              }
                           }
                        }
                     case READY:
                        if (dojo.indexOf([dojo.keys.BACKSPACE, dojo.keys.DELETE], key) !== -1 && dojo.isIE == 8) {
                           handleDelete(ev);
                        }
                  }
               }

               function onBlur(ev){
                  if(handler){
                     handler.handleBlur(ev);
                  }
               }

               function onbeforeSetMode(ev){
                  switch (state) {
                     case ACTIVE:
                        handler.handleModeChange();
                        resetState();
                        break;
                  }
               }

               function onAfterCommandExec(ev){
                  if (ev.data.name == 'undo' || ev.data.name == 'redo') {
                     switch (state) {
                        case ACTIVE:
                           handler.handlePasteUndo(ev);
                           break;
                        case READY:
                           // Loops through all registered handlers
                           dojo.forEach(handlers, function(handler) {
                              handler.handlePasteUndo(ev);
                           });
                           break;
                     }
                  }
               }

               function onBeforeGetData(ev){
                  switch (state) {
                     case ACTIVE:
                        handler.handleBeforeGetData(ev);
                        resetState();
                        break;
                  }
               }

               /*
                * Debug mode: expose event handlers for testing purposes
                */
               if (dojo.config.isDebug) {
                  plugin._eventHandlers = {
                     onAfterPaste : onAfterPaste,
                     onCompositionEnd : onCompositionEnd,
                     onKey : onKey,
                     onKeyDown : onKeyDown,
                     onKeyPress : onKeyPress,
                     onKeyUp : onKeyUp
                  };
                  plugin.resetState = resetState;
               }
               
               editor.on("mode", function(evt) {
                  if (editor.mode === "wysiwyg") {
                     /*
                      * Handles the Enter key
                      */
                     editor.on('key', onKey);
                     /*
                      * Handles the undo/redo event
                      */
                     editor.on('afterCommandExec', onAfterCommandExec);
                     /*
                      * Handles paste events
                      */
                     editor.on('afterPaste', onAfterPaste);
                     /*
                      * Handles for pasted data
                      */
                     editor.on('paste', onPaste);
                     /*
                      * Prevents clicks on links
                      */
                     editor.document.on("click", onClick);
                     /*
                      * Begins handling composition event for DBCS characters
                      */
                     editor.document.on("compositionstart", onCompositionStart);
                     /*
                      * Handles composition event for DBCS characters
                      */
                     editor.document.on("compositionend", onCompositionEnd);
                     /*
                      * Handles blur event for CKE
                      */
                     editor.on("blur", onBlur);
                     /*
                      * Handles the change event from CKeditor to HTML Mode
                      */
                     editor.on('beforeSetMode', onbeforeSetMode);
                     /*
                      * Handles keypress events for printable chars to enable mention,
                      * or to provide its contents
                      */
                     editor.document.on("keypress", onKeyPress);
                     /*
                      * Handles keydown events for non-printable chars when the
                      * mention is active
                      */
                     editor.document.on("keydown", onKeyDown);
                     /*
                      * Handles keyup events for non-printable chars when the mention
                      * is active
                      */
                     editor.document.on("keyup", onKeyUp);

                  }
               });
         },
         
         /**
          * cancels any currently active mention.
          */
         cancelActiveMentions : function(editor){
            dojo.forEach(handlers, function(handler){
               if(handler._editor && handler._editor == editor  && handler._node && handler._node.$.nodeName == "A" && handler._node.$.parentNode != null){
                  handler.cancel();
               }
            });
         },

         /**
          * Sets the header on the typeahead used to select a person.
          */
         setTypeaheadHeader : function(s) {
            dojo.forEach(handlers, function(handler) {
               handler.handleSetTypeaheadHeader(s);
            });
         },

         /**
          * Adds external callbacks to mentions
          */
         addCallback : function(handle, callback, editor) {
            dojo.forEach(handlers, function(handler) {
               handler.handleAddCallback(handle, callback, editor);
            });
         },

         /**
          * Changes the default dataStore
          */
         setDataStore : function(o) {
            dojo.forEach(handlers, function(handler) {
               handler.handleSetDataStore(o);
            });
         },

         /**
          * Changes the default network
          */
         setNetwork : function(o) {
            dojo.forEach(handlers, function(handler) {
               handler.handleSetNetwork(o);
            });
         }
      });

      // Register default handlers
      plugin.registerHandler(lconn.core.ckplugins.mentions.PersonHandler);
      // Hashtag handler is disabled for now
      // plugin.registerHandler(lconn.core.ckplugins.mentions.HashtagHandler);
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
    * @memberOf lconn.core.ckplugins.mentions
    * @param {Object}
    *           handler The handler to register
    */
   plugin.registerHandler = function(handler) {
      var index = handlers.push(handler) - 1;
      var arr = dojo.isArray(handler.activatorChar) ? handler.activatorChar
            : [ handler.activatorChar ];
      dojo.forEach(arr, function(c) {
         accelerators.push([ c.charCodeAt(0), index ]);
      });
   };
})();
