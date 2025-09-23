/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/lang",
      "dojo/_base/array",
      "dojo/_base/declare",
      "dojo/_base/window",
      "dojo/aspect",
      "dojo/dom",
      "dojo/dom-attr",
      "dojo/dom-class",
      "dojo/dom-construct",
      "dojo/dom-style",
      "dojo/has",
      "dojo/on",
      "dojo/string",
      "dojo/query"
], function(dojo, lang, array, declare, windowModule, aspect, dom, domAttr, domClass, domConstruct, domStyle, has, on, string, query) {

   /**
    * Mixin for mentions utilities
    * 
    * @mixin ic-core.widget.mentions.MentionsUtils
    * @author Piyush K Agarwal <pagarwal@us.ibm.com>
    */
   var MentionsUtils = declare("lconn.core.widget.mentions.MentionsUtils", null, /** @lends ic-core.widget.mentions.MentionsUtils.prototype */
   {
      disableBizCard : false,

      includeRangy : function(cb) {
         if (net.jazz.ajax.xdloader.load_async) {
            net.jazz.ajax.xdloader.load_async("lconn.core.ext.rangy.rangyCore", cb);
         }
      },

      rangeSelectNode : function(node, range) {
         if (node) {
            if (this.isAnyMentionsNode(node)) {
               range.selectNodeContents(node.getTextNode());
            }
            else if (this.isAnyMentionsDomNode(node)) {
               var link = node.getElementsByTagName('a');
               if (link && link.length == 1) {
                  range.selectNodeContents(link[0].firstChild);
               }
            }
            else {
               range.selectNodeContents(node);
            }
         }

         return range;
      },

      rangeMoveToNodeStart : function(node, range) {
         if (node) {
            range = this.rangeSelectNode(node, range);
            range.collapse(true);
         }
         return range;
      },

      rangeMoveToNodeEnd : function(node, range) {
         if (node) {
            range = this.rangeSelectNode(node, range);
            range.collapse(false);
         }
         return range;
      },

      isAnyMentionsDomNode : function(domNode) {
         return this.isPersonMentionsDomNode(domNode) || this.isMentionsDomNode(domNode);
      },

      isMentionsDomNode : function(domNode) {
         var type = domAttr.get(domNode, 'type');
         var isMentions = false;
         if (type) {
            isMentions = type.indexOf("MentionsNode") != -1;
         }

         return isMentions;
      },

      isPersonMentionsDomNode : function(domNode) {
         return (domAttr.get(domNode, 'type') == "PersonMentionsNode");
      },

      isAnyMentionsNode : function(node) {
         return node.className && node.className.indexOf("MentionsNode") != -1;
      },

      isMentionsNode : function(node) {
         return node.className && node.className == "MentionsNode";
      },

      isPersonMentionsNode : function(node) {
         return node.className && node.className == "PersonMentionsNode";
      },

      isSelectedNode : function(node) {
         return node == this._currentNode;
      },

      setSelectedNode : function(node) {
         this._currentNode = node;
      },

      isInputNode : function(node) {
         return node == this.textAreaNode;
      },

      isTextNode : function(node) {
         return node.nodeType == 3;
      },

      isStartOfTextNode : function(range) {
         return range.startOffset == 0 && range.startContainer.nodeType == 3;
      },

      isEndOfTextNode : function(range) {
         var node = range.startContainer;
         return (range.endOffset >= node.length - 1) && node.nodeType == 3;
      },

      saveSelectionIE : function(sel) {
         if (has("ie")) {
            this._rangySelection = sel;
         }
      },

      connectEvents : function() {
         on(this.textAreaNode, "keypress", lang.hitch(this, this.keyListener));
         on(this.textAreaNode, "paste", lang.hitch(this, this.pasteListener));
         on(this.textAreaNode, "blur", lang.hitch(this, this.blurListener));
         on(this.textAreaNode, "focus", lang.hitch(this, this.focusListener));
         on(this.textAreaNode, "cut", lang.hitch(this, this.cutListener));
         on(this.textAreaNode, "click", lang.hitch(this, this.clickListener));

         // Enable composition events for IME handling
         // defect 127178: Removed IE browser from composition event, as it does
         // not work well with mentions. Using IE8 approach instead
         if (has("webkit") || has("mozilla")) {
            aspect.after(this.textAreaNode, "compositionstart", lang.hitch(this, this.compositionStart), true);
            aspect.after(this.textAreaNode, "compositionupdate", lang.hitch(this, this.compositionUpdate), true);
            aspect.after(this.textAreaNode, "compositionend", lang.hitch(this, this.compositionEnd), true);
         }

         // bizcard hacks
         on(this.textAreaNode, "mousedown", lang.hitch(this, this.mouseDownListener));
         on(this.textAreaNode, "mousemove", lang.hitch(this, this.mouseMoveListener));
         on(this.textAreaNode, "mouseup", lang.hitch(this, this.mouseUpListener));

         // Prevent drag and drop on @mentions for now due to differences in how
         // each browser handles it
         on(this.textAreaNode, "drop", lang.hitch(this, this.cancelEvent)); // For
                                                                              // FF
         on(this.textAreaNode, "dragover", lang.hitch(this, this.cancelEvent)); // Needs
                                                                                 // to
                                                                                 // be
                                                                                 // cancelled
                                                                                 // for
                                                                                 // WebKit
      },

      compositionStart : function(e) {
         this.printDebug("Started composition from IME: " + e.data);
         this._isComposition = true;
         if (!this._isTracking) {
            if (e.data == String.fromCharCode(this.trackedKeyCode)) {
               e.keyCode = this.trackedKeyCode;
               this.keyListener(e);
            }
         }

      },

      compositionUpdate : function(e) {
         this.printDebug("Updated composition from IME: " + e.data);
         if (this.eventHandles["onkeypress"]) {
            setTimeout(lang.hitch(this, this.eventHandles.onkeypress), 50);
         }
      },

      compositionEnd : function(e) {
         this.printDebug("Ended composition from IME: " + e.data);
         if (this._isTracking) {
            var curNode = this._currentNode;
            curNode.value = curNode.value + e.data;
            var textNode = curNode.getTextNode();
            // if(!has("chrome")) //123999 chrome duplicate ime char
            // curNode.setTextRange(this.updateRange(textNode,
            // textNode.length).nodeRange);
            this.updateTrack(curNode.value);

         }

         if (this.eventHandles["onkeypress"]) {
            setTimeout(lang.hitch(this, this.eventHandles.onkeypress), 50);
         }
         this._isComposition = false;
      },

      cancelEvent : function(e, preventBubble) {
         e.preventDefault();

         if (preventBubble) {
            e.cancelBubble = true;
            if (e.stopPropagation) {
               e.stopPropagation();
            }
         }

         return false;
      },

      stringSplice : function(curString, idx, numCharsToRemove, insertString) {
         return (curString.slice(0, idx) + (insertString || "") + curString.slice(idx + Math.abs(numCharsToRemove)));
      },

      /**
       * Function to enable the text on the typeahead header to be set after the
       * MentionsHelper has been created.
       * 
       * @param String -
       *           Text for header.
       */
      setTypeaheadHeader : function(s) {
         /*
          * We need to find a PersonMentionsType typeahead from the registered
          * types. We then need to set it's header item.
          */
         if (this._registeredTypes) {
            var personTypeaheads = array.filter(this._registeredTypes, function(item) {
               return item._type == "PersonMentionsType";
            });

            if (personTypeaheads.length > 0) {
               if (personTypeaheads[0] && personTypeaheads[0]._typeahead) {
                  var typeahead = personTypeaheads[0]._typeahead;

                  // If the typeahead has a function to set the header then use
                  // that e.g SC typeahead
                  if (typeahead.setHeaderMessage) {
                     typeahead.setHeaderMessage(s);
                  }
                  else {
                     if (typeahead._popupWidget) {
                        typeahead._popupWidget.HeaderMessage = s;
                     }
                     typeahead.HeaderMessage = s;
                  }
               }
            }
         }
      },

      /**
       * Works around side effect of fix for issue #24 Control selection
       * sometimes fails to clear when removeAllRanges() is called in IE
       * http://code.google.com/p/rangy/issues/detail?id=24 See RTC #83239
       */
      _fixRangySelection : function(sel) {
         sel.removeAllRangesEx = lang.partial(function(me) {
            // Added try/catch as fix for issue #21
            try {
               this.docSelection.empty();
               // Check for empty() not working (issue #24)
               if (this.docSelection.type != "None") {
                  // Instead of creating a text range on the body, create a
                  // dummy input element
                  var tmp = domConstruct.create("input", {
                     type : "text",
                     style : "display: none"
                  }, me.textAreaNode, "after");
                  var textRange = tmp.createTextRange();
                  textRange.select();
                  this.docSelection.empty();
                  // Remove the dummy element when done
                  me.textAreaNode.parentNode.removeChild(tmp);
               }
            }
            catch (ignore) {
            }
            // Inline call to updateEmptySelection(this); as the function is
            // unavailable outside its closure
            this.anchorNode = sel.focusNode = null;
            this.anchorOffset = sel.focusOffset = 0;
            this.rangeCount = 0;
            this.isCollapsed = true;
            this._ranges.length = 0;
         }, this);
         sel.setSingleRangeEx = function(range) {
            if (has("ie") < 8)
               this.removeAllRangesEx();
            else
               this.removeAllRanges();
            try {
               this.addRange(range);
            }
            catch (err) {
            }
         };
      },

      // Get the current selection and range
      getSelection : function() {
         var selection, range;

         if (has("ie") && window.rangy) {
            // work with the original rangy selection and
            // manage it manually for best results
            if (!this._rangySelection) {
               rangy.init();
               selection = rangy.getSelection();
               selection.refresh();
               this._fixRangySelection(selection);
               this._rangySelection = selection;
            }
            else {
               selection = this._rangySelection;
            }

            var startContainer = null;
            if (selection.rangeCount > 0) {
               range = selection.getRangeAt(0);
               startContainer = range.startContainer;
            }

            // if the saved selection range data gets corrupted
            // reset it to the current range from Rangy
            if (!startContainer || typeof startContainer.nodeValue === 'unknown') {
               selection = rangy.getSelection();
               selection.refresh();
               this._fixRangySelection(selection);
               this._rangySelection = selection;
               range = selection.getRangeAt(0);
               startContainer = range.startContainer;
            }

            if (startContainer == windowModule.body()) {
               startContainer = this.textAreaNode;
               if (startContainer.childNodes.length == 0) {
                  startContainer.appendChild(document.createTextNode(""));
                  range = this.rangeMoveToNodeEnd(startContainer.firstChild, range);
               }
            }
            else if (startContainer == this.textAreaNode) {
               if (startContainer.childNodes.length == 0) {
                  startContainer.appendChild(document.createTextNode(""));
                  range = this.rangeMoveToNodeEnd(startContainer.firstChild, range);
               }
               else {
                  range = this.rangeMoveToNodeEnd(startContainer.childNodes[range.startOffset], range);
               }
            }
         }
         else {
            if (window.getSelection) {
               selection = window.getSelection();
            }
            else if (document.selection) {
               selection = document.selection.createRange();
            }

            if (selection.getRangeAt && selection.rangeCount > 0) {
               range = selection.getRangeAt(0);
            }
            else {
               if (document.createRange) { // Handle Safari
                  range = document.createRange();
                  if (selection.anchorNode && selection.focusNode) {
                     range.setStart(selection.anchorNode, selection.anchorOffset);
                     range.setEnd(selection.focusNode, selection.focusOffset);
                  }
               }
               else if (document.selection.createRange) { // Handle IE
                  range = document.selection.createRange();
                  var dupRange = range.duplicate();
                  dupRange.moveToElementText(this.textAreaNode);
                  dupRange.setEndPoint('EndToEnd', range);
                  range.startOffset = dupRange.text.length - range.text.length;
                  range.endOffset = range.startOffset + range.text.length;
               }
            }
         }
         this.printDebug("Node: " + this.getRangeText(range) + " -- Start: " + range.startOffset + "    End: " + range.endOffset);
         return {
            selection : selection,
            range : range
         };
      },

      // Get the text content of a range
      getRangeText : function(range) {
         if (has("ie")) {
            if (range && range.startContainer)
               return range.startContainer.data;
         }
         else {
            return range.startContainer.textContent;
         }

         return "";
      },

      setRange : function(range, node, startOffset, endOffset) {
         range.setEnd(node, endOffset);
         var nodeRange = range.cloneRange();
         range.setStart(node, startOffset);

         return {
            nodeRange : nodeRange,
            selectionRange : range
         };
      },

      updateRange : function(node, offset) {
         var curSel = this.getSelection();
         node = this.getTextNode(node);
         var length = node.data.length;
         var sel = curSel.selection;
         var range = curSel.range;
         var nodeRange = null;
         var ranges;

         if (offset <= length) {
            ranges = this.setRange(range, node, offset, offset);
         }
         else {
            ranges = this.setRange(range, node, length, length);
         }

         if (has("ie") && window.rangy) {
            sel.setSingleRangeEx(ranges.selectionRange);
         }
         else {
            sel.removeAllRanges();
            sel.addRange(ranges.selectionRange);
         }
         nodeRange = ranges.nodeRange;

         this.printDebug("NodeRange: " + this.getRangeText(nodeRange) + " -- Start: " + nodeRange.startOffset + "    End: " + nodeRange.endOffset);
         this.printDebug("SelectionRange: " + this.getRangeText(range) + " -- Start: " + range.startOffset + "    End: " + range.endOffset);
         return {
            nodeRange : nodeRange,
            selectionRange : range
         };
      },

      setRangeBeforeNode : function(node) {
         curSel = this.getSelection();
         var range = curSel.range;
         var sel = curSel.selection;
         if (has("ie") < 9) {
            if (node.nodeType != 3) {
               range.moveToElementText(node);
               range.select();
            }
         }
         else {
            range.setStartBefore(node);
            if (has("ie") && window.rangy) {
               sel.setSingleRangeEx(range);
            }
            else {
               sel.removeAllRanges();
               sel.addRange(range);
            }
         }
      },

      setRangeAfterNode : function(node) {
         curSel = this.getSelection();
         var range = curSel.range;
         var sel = curSel.selection;
         if (has("ie") < 9) {
            if (node.nodeType != 3) {
               range.moveToElementText(node);
               range.select();
            }
         }
         else {
            range.setStartAfter(node);

            if (has("ie") && window.rangy) {
               sel.setSingleRangeEx(range);
            }
            else {
               sel.removeAllRanges();
               sel.addRange(range);
            }
         }
      },

      showBizCardHover : function(e, node) {
         if (e && node && !this.disableBizCard) {
            var evt = null;
            if (document.createEvent) {
               evt = document.createEvent("KeyboardEvent");
               if (evt.initKeyEvent) {
                  evt.initKeyEvent("keypress", false, false, null, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.keyCode, e.charCode);
               }
               else {
                  evt.initKeyboardEvent("keypress", false, false, null, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.keyCode, e.charCode);
               }
               node.dispatchEvent(evt);
            }
            else if (document.createEventObject) {
               evt = document.createEventObject();
               if (typeof e.type !== "unknown" && e.type == "keypress") {
                  evt.keyCode = e.keyCode;
                  evt.ctrlKey = e.ctrlKey;
                  evt.altKey = e.altKey;
                  evt.shiftKey = e.shiftKey;
                  evt.repeat = false;
                  evt.cancelBubble = true;
                  evt.returnValue = false;
                  evt.target = node;
               }
            }

            // hack around LCSemTagMenu.focusA11Y method to avoid losing focus
            // from mentions
            var temp = dom.byId("bc_document_node");
            if (!temp)
               temp = dom.byId("bc_document_node_comm");
            if (temp) {
               var oldid = temp.id;
               temp.id = "bc_document_node_hidden";
            }

            this._activeBizCard = true;

            if (evt) {
               // FIXME: this is not applicable to SmartCloud
               if (lconn.profiles.bizCard.bizCard && lang.isFunction(lconn.profiles.bizCard.bizCard.showMenu))
                  LCSemTagMenu.showHover(evt, lconn.profiles.bizCard.bizCard.showMenu);
               if (this._currentNode && dom.byId('semtagmenu').firstChild) {
                  this.setAriaLabel(this._resourceBundle.SELECTED_MENTION + " " + domAttr.get(dom.byId('semtagmenu').firstChild, "aria-label"),
                     [ this._currentNode.linkNode.innerHTML
                     ]);
               }
            }

            if (temp) {
               temp.id = oldid;
            }

            setTimeout(lang.hitch(this, function() {
               this.textAreaNode.focus();
            }), 10);
         }
      },

      hideBizCardHover : function() {
         if (window.LCSemTagMenu && !this.disableBizCard) {
            LCSemTagMenu.hide();
         }
      },

      getIdxFromId : function(node) {
         var idx = 0;
         var id = node.id;

         var idx = parseInt(id.slice(-2));
         if (isNaN(idx)) {
            idx = parseInt(id.slice(-1));
         }
         return idx;
      },

      // Get the inner-most text node in the first child node of a parent node
      getTextNode : function(parentNode) {
         var textNode = null;
         if (parentNode) {
            if (parentNode.nodeType == 3)
               textNode = parentNode;
            else if (parentNode.firstChild)
               textNode = this.getTextNode(parentNode.firstChild);
         }

         return textNode;
      },

      setText : function(text) {
         if (has("ie")) {
            this.textAreaNode.innerText = text;
         }
         else {
            this.textAreaNode.innerHTML = text;
         }
      },

      getText : function(formatMention) {
         return (this.getNodeText(this.textAreaNode, formatMention)).replace(new RegExp('\u200B', 'g'), '');
      },

      getNodeText : function(node, formatMention) {
         var plainText = "";
         if (node) {
            array.forEach(node.childNodes, function(entry, i) {
               if (entry.nodeName == "BR") {
                  plainText += "\n";
               }
               else {
                  // CCM libraries support returning the mentions
                  // @{displayName|uid}
                  if (formatMention && entry.className == "vcard") {
                     plainText += this.getPlainMention(entry);
                  }
                  else {
                     var txtNode = this.getTextNode(entry);
                     if (txtNode) {
                        var data = txtNode.data;
                        if (data.charCodeAt(0) == 128 && data.length == 1) {
                           data = '';
                        }
                        plainText += data;
                     }
                  }
               }
            }, this);
         }

         // remove invisible spaces
         if (has("webkit")) {
            plainText = plainText.replace('\u200B', '');
            if (plainText.charCodeAt(0) == 128 && plainText.length == 1) {
               plainText = '';
            }
         }

         return plainText;
      },

      getPlainMention : function(node) {
         var nameInMention = '';
         var userId = '';
         var txtNode = this.getTextNode(node);
         var hasSymbol = false;

         if (txtNode && txtNode.data.search(this.bidiActivatorChar(txtNode.data)) == 0) {
            nameInMention = txtNode.data.replace(this.bidiActivatorChar(txtNode.data), '');
            hasSymbol = true;
         }
         else {
            nameInMention = txtNode.data;
         }

         var uidNode = query('.x-lconn-userid', node)[0];
         if (uidNode) {
            userId = has("ff") ? uidNode.innerHTML : uidNode.innerText;
         }

         return this.activatorChar + '{{' + userId + '|' + nameInMention + (hasSymbol ? '|notify' : '') + '}}';
      },

      getTextAsJson : function() {
         var nodesArray = [];
         var nodes = this.textAreaNode.childNodes;

         for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var type = "text";
            if (node.id) {
               if (node.id.indexOf("mentionsNode_") != -1) {
                  var attr = this.getNodeAttributes(node.id);

                  // If mentions is complete post as mention JSON format,
                  // otherwise post as plain text
                  if (attr) {
                     if (attr.isComplete) {
                        nodesArray.push(attr.toJsonString());
                     }
                     else {
                        nodesArray.push({
                           type : "text",
                           value : attr.value
                        });
                     }
                  }
               }
            }
            else {
               var nodeData = node.data;
               if (nodeData && nodeData != "" && nodeData != '\u200B' && node.nodeName != "BR") {
                  nodeData = nodeData.replace('\u200B', '');
                  // replace non-breaking spaces (&nbsp;) by spaces
                  nodeData = nodeData.replace(/\u00A0/g, " ");
                  nodesArray.push({
                     type : "text",
                     value : nodeData
                  });
               }
               else if (node.nodeName == "BR") {
                  nodesArray.push({
                     type : "html",
                     value : "\n"
                  });
               }
               else if (node.nodeName == "A") {
                  nodesArray.push({
                     type : "text",
                     value : (node.innerText || node.textContent)
                  });
               }
            }
         }

         return {
            textData : nodesArray
         };
      },

      // Moves to the node before a given node.
      // If the new node is a TextNode move to the last character,
      // otherwise if it is a MentionsNode select it.
      moveToPreviousNode : function(node, range, sel) {
         node = this.adjustRangeWebKit(node, range);
         var nodeBeforeCursor = null;
         var nodeIdx = array.indexOf(this.textAreaNode.childNodes, node);
         if (nodeIdx > 0) {
            nodeBeforeCursor = this.textAreaNode.childNodes[nodeIdx - 1];
            if (nodeBeforeCursor.nodeType == 3) {
               if (nodeBeforeCursor.length == 0) {
                  this.moveToPreviousNode(nodeBeforeCursor, range, sel);
               }
               else if (has("ie") > 8 && nodeBeforeCursor.length == 1 && nodeBeforeCursor.data.charAt(0) == '\u200B') {
                  this.moveToPreviousNode(nodeBeforeCursor, range, sel);
               }
               else {
                  range.setStart(nodeBeforeCursor, nodeBeforeCursor.length);
                  range.setEnd(nodeBeforeCursor, nodeBeforeCursor.length);
               }

               if (window.LCSemTagMenu && !this.disableBizCard) {
                  LCSemTagMenu.hide();
               }

            }
            else {
               if (has("ie") > 7) {
                  var textNode = this.getTextNode(nodeBeforeCursor);
                  try {
                     range.setStart(textNode, 0);
                     range.setEnd(textNode, textNode.data.length);
                  }
                  catch (err) {
                  }
               }
               else {
                  range.selectNode(nodeBeforeCursor);
               }
               this._currentNode = this.getNodeAttributes(nodeBeforeCursor.id);
            }
         }
         else {
            if (node) {
               range.setStart(node, 0);
               range.setEnd(node, 0);
            }
            else {
               range.selectNodeContents(this.textAreaNode);
            }
         }

         if (sel && range) {
            if (has("ie") && window.rangy) {
               sel.setSingleRangeEx(range);
            }
            else {
               sel.removeAllRanges();
               sel.addRange(range);
            }

            this.saveSelectionIE(sel);
         }

         return nodeBeforeCursor;
      },

      // Moves to the node after a given node.
      // If the new node is a TextNode move to the last character,
      // otherwise if it is a MentionsNode select it.
      moveToNextNode : function(node, range, sel) {
         node = this.adjustRangeWebKit(node, range);
         var nodeAfterCursor = null;
         var nodeIdx = array.indexOf(this.textAreaNode.childNodes, node);
         if (nodeIdx < this.textAreaNode.childNodes.length - 1) {
            nodeAfterCursor = this.textAreaNode.childNodes[nodeIdx + 1];
            if (nodeAfterCursor.nodeType == 3) {
               if (nodeAfterCursor.length == 0) {
                  this.moveToNextNode(nodeAfterCursor, range, sel);
               }
               else {
                  range.setStart(nodeAfterCursor, 0);
                  range.setEnd(nodeAfterCursor, 0);
               }

               if (window.LCSemTagMenu && !this.disableBizCard) {
                  LCSemTagMenu.hide();
               }

            }
            else {
               if (has("ie") > 7) {
                  var textNode = this.getTextNode(nodeAfterCursor);
                  if (textNode) {
                     range.setStart(textNode, 0);
                     range.setEnd(textNode, textNode.data.length);
                  }
               }
               else {
                  range.selectNode(nodeAfterCursor);
               }
               this._currentNode = this.getNodeAttributes(nodeAfterCursor.id);
            }
         }
         else {
            if (node) {
               range.setStart(node, node.length);
               range.setEnd(node, node.length);
            }
            else {
               range.selectNodeContents(this.textAreaNode);
            }
         }

         if (sel && range) {
            if (has("ie") && window.rangy) {
               sel.setSingleRangeEx(range);
            }
            else {
               sel.removeAllRanges();
               sel.addRange(range);
            }
            this.saveSelectionIE(sel);
         }

         return nodeAfterCursor;
      },

      adjustRangeWebKit : function(node, range) {
         if (has("webkit")) {
            while (node && node.parentElement && node.parentElement != this.textAreaNode) {
               range.selectNode(range.startContainer);
               node = range.startContainer;
            }
         }
         return node;
      },

      setReadOnly : function() {
         domAttr.set(this.textAreaNode, "contenteditable", false);
      },

      setEditable : function() {
         domAttr.set(this.textAreaNode, "contenteditable", true);
      },

      removeSelection : function(e) {
         if (e)
            e.preventDefault();

         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;
         curSel.selection.collapseToStart();
         if (has("ie")) {
            sel.refresh();
            range = sel.getRangeAt(0);
         }
         var mentionNode = null;

         // handle the case where only the text of a mention is selected
         if (range.startContainer == range.endContainer) {
            var start = range.startContainer;
            while (start && start.parentNode && start.parentNode != this.textAreaNode) {
               start = start.parentNode;
            }
            mentionNode = this.getNodeAttributes(start.id);
            this._currentNode = (mentionNode == this._currentNode) ? null : this._currentNode;
            if (mentionNode) {
               if (this._isTracking) {
                  var startOffset = range.startOffset;
                  range.extractContents();
                  mentionNode.setValue(range.startContainer.data);
                  range.setStart(range.startContainer, startOffset);
                  range.setEnd(range.startContainer, startOffset);
                  sel.removeAllRanges();
                  sel.addRange(range);
                  this.saveSelectionIE(sel);
               }
               else {
                  this.removeMentionNode(mentionNode);
               }
            }
         }

         if (!mentionNode) {
            var extractedContents = range.extractContents();
            array.forEach(extractedContents.childNodes, function(node) {
               if (node) {
                  var mentionNode = this.getNodeAttributes(node.id);

                  if (mentionNode) {
                     this._currentNode = (mentionNode == this._currentNode) ? null : this._currentNode;
                     this.removeMentionNode(mentionNode);
                  }
               }
            }, this);
         }

         if (range.startContainer == this.textAreaNode) {
            // Old WebKit has a bug where if you have two adjacent TextNodes in
            // the dom
            // then you cannot place the cursor at the 0th position of 2nd
            // node...
            // "hello""|world" (cannot place cursor where | is). So we merge
            // adjacent nodes to handle this. (Fixes issues in Safari 5.x)
            if (has("safari")) {
               range = this.mergeAdjacentTextNodes(range, this.textAreaNode.childNodes[range.startOffset]);
            }
            else {
               var start = this.textAreaNode.childNodes[range.startOffset];
               if (start) {
                  range.setStart(start, 0);
                  range.setEnd(start, 0);
               }
            }

         }
         else {
            try {
               range.setStart(range.startContainer, range.startOffset);
               range.setEnd(range.startContainer, range.startOffset);
            }
            catch (err) {
            }
         }

         if (has("ie") && window.rangy) {
            sel.setSingleRangeEx(range);
            this.saveSelectionIE(sel);
         }
         else {
            sel.removeAllRanges();
            sel.addRange(range);
         }

         extractedContents = null;
         return range;
      },

      mergeAdjacentTextNodes : function(range, startNode) {
         var mergedText = "";
         var offset = 0;

         if (startNode && startNode.nodeType == 3) {
            var previous = startNode.previousSibling;
            var next = startNode.nextSibling;

            if (previous && previous.nodeType == 3) {
               mergedText += previous.data;
               offset += previous.data.length;
               previous.parentNode.removeChild(previous);
            }

            mergedText += startNode.data;

            if (next && next.nodeType == 3) {
               mergedText += next.data;
               next.parentNode.removeChild(next);
            }

            var newNode = document.createTextNode(mergedText);
            startNode = startNode.parentNode.replaceChild(newNode, startNode);
            range.setStart(newNode, offset);
            range.setEnd(newNode, offset);
         }

         return range;
      },

      completeMention : function(data) {
         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;

         var curNode = this._currentNode;
         curNode.setComplete(true, data, this.disableBizCard);

         this.clearImeNodeIE(curNode);

         this.setAriaLabel(this._resourceBundle.COMPLETED_MENTION, [ curNode.value
         ]);
         this.resetTypeaheadAria();

         var typeaheadPopup = this.typeaheadField ? this.typeaheadField._popupWidget : null;
         if (typeaheadPopup && has("ie")) {
            domClass.remove(typeaheadPopup.domNode.parentNode, "lconnTypeAhead");
         }

         if (this.eventHandles["onCreateMention"]) {
            this.eventHandles.onCreateMention(curNode);
         }

         var domNode = curNode.domNode;

         if (domNode) {
            var prevText, nextText = null;
            if (has("webkit") || has("ie") > 7) {
               prevText = document.createTextNode('\u200B');
               nextText = document.createTextNode('\u200B');
            }
            else {
               prevText = document.createTextNode('');
               nextText = document.createTextNode('');
            }

            if (!domNode.previousSibling) {
               this.textAreaNode.insertBefore(prevText, domNode);
            }
            else if (has("webkit")) {
               prevSib = domNode.previousSibling;
               if (prevSib.nodeType == 3 && prevSib.data === '') {
                  prevSib.data = '\u200B';
               }
            }

            if (!domNode.nextSibling || (has("ie") && domNode.nextSibling.length == 0)) {
               this.textAreaNode.insertBefore(nextText, domNode.nextSibling);
            }
            else if (has("webkit")) {
               nextSib = domNode.nextSibling;
               if (nextSib.nodeType == 3 && nextSib.data === '') {
                  nextSib.data = '\u200B';
               }
            }
         }

         range = this.rangeMoveToNodeStart(domNode.nextSibling, range);

         if (has("ie") > 7) {
            range.setStart(range.startContainer, 1);
            range.setEnd(range.endContainer, 1);
         }

         try {
            if (has("ie") && window.rangy) {
               sel.setSingleRangeEx(range);
            }
            else {
               sel.removeAllRanges();
               sel.addRange(range);
            }
         }
         catch (err) {
            this.printDebug("Setting backup range on Mention Completion.");
            sel = rangy.getSelection();
            var range = rangy.createRangyRange();
            range.selectNode(domNode);
            range.collapse();
            if (has("ie") && window.rangy) {
               sel.setSingleRangeEx(range);
            }
            else {
               sel.removeAllRanges();
               sel.addRange(range);
            }
            this.saveSelectionIE(sel);
         }

         this.saveSelectionIE(sel);
         this.getSelection();

         this.updateTrack(curNode.value);
         this.stopTrack();
      },

      clearImeNodeIE : function(mentionsNode) {
         if (has("ie") && mentionsNode && mentionsNode.linkNode) {
            var imeNode = mentionsNode.linkNode.nextSibling;
            if (imeNode && imeNode.nodeType == 3) {
               imeNode.data = "";
            }
         }
      },

      removeMentionNode : function(mentionNode) {
         var nextNode = mentionNode.domNode.nextSibling;

         this._trackedMentions.splice(array.indexOf(this._trackedMentions, mentionNode), 1);

         // remove mentionNode from mentions field so callback count is correct
         // check to make sure the node was not extracted from the document
         // incase of a selection delete
         var domNode = mentionNode.domNode;
         if (domNode && domNode.parentNode && domNode.parentNode.nodeType != 11) {
            // We are on the first node and the previous one is empty so we
            // replace it for one with \u200B
            // to avoid IE8 crashes
            if (has("ie") == 8 && this.textAreaNode.firstChild.data == "") {
               this.textAreaNode.replaceChild(document.createTextNode('\u200B'), domNode);
            }
            else {
               this.textAreaNode.removeChild(domNode);
            }
         }

         if (this.eventHandles["onRemoveMention"]) {
            this.eventHandles.onRemoveMention(mentionNode);
         }
         this.setAriaLabel(this._resourceBundle.REMOVED_MENTION, [ mentionNode.value
         ]);
         this.resetTypeaheadAria();

         mentionNode.destroy();

         return nextNode;
      },

      // dontMoveCursor is optional, if true cursor is not moved after the new
      // textnode
      convertMentionNodeToText : function(mentionNode, dontMoveCursor) {
         var nextNode = mentionNode.domNode.nextSibling;

         this.clearImeNodeIE(this._currentNode);

         this._trackedMentions.splice(array.indexOf(this._trackedMentions, mentionNode), 1);

         // remove mentionNode from mentions field so callback count is correct
         // check to make sure the node was not extracted from the document
         // incase of a selection delete
         var domNode = mentionNode.domNode;
         if (domNode && domNode.parentNode && domNode.parentNode.nodeType != 11) {
            this.textAreaNode.removeChild(domNode);
         }

         this.setAriaLabel(this._resourceBundle.CANCELLED_MENTION, [ mentionNode.value
         ]);
         this.resetTypeaheadAria();

         var textNode = document.createTextNode(mentionNode.value);

         // fix to scroll to the new line
         this.textAreaNode.scrollTop = mentionNode.domNode.offsetTop - this.textAreaNode.offsetTop;
         this.textAreaNode.insertBefore(textNode, nextNode);

         if (this.eventHandles["onRemoveMention"]) {
            this.eventHandles.onRemoveMention(mentionNode);
         }

         if (!dontMoveCursor) {
            var curSel = this.getSelection();
            var sel = curSel.selection;
            var range = curSel.range;

            var length = textNode.data.length;
            range.setStart(textNode, length);
            range.setEnd(textNode, length);

            if (has("ie") && window.rangy) {
               sel.setSingleRangeEx(range);
            }
            else {
               sel.removeAllRanges();
               sel.addRange(range);
            }

            this.saveSelectionIE(sel);
         }

         mentionNode.destroy();

         return textNode;
      },

      resetTypeaheadAria : function() {
         domAttr.set(this.textAreaNode, "role", "textbox");
         dojo.removeAttr(this.textAreaNode, "aria-expanded");
         dojo.removeAttr(this.textAreaNode, "aria-activedescendant");
         dojo.removeAttr(this.textAreaNode, "aria-owns");
      },

      removeMentionById : function(mentionId) {
         var mentionNode = this.getNodeAttributes(mentionId);
         if (mentionNode != null) {
            nextNode = this.removeMentionNode(mentionNode);
         }
         return nextNode;
      },

      handleResumeMention : function(sel, range) {
         var node = range.startContainer;

         if (node && this._currentNode && !this._currentNode.isComplete) {
            var curMentionTextNode = this._currentNode.getTextNode();

            while (node && node.nodeType == 3 && (node.data == '' || node.data == '\u200B')) {
               node = node.previousSibling;
            }

            if (node && node.nodeType == 1 && this.isAnyMentionsDomNode(node)) {
               if (node.getElementsByTagName('a')[0]) {
                  node = node.getElementsByTagName('a')[0].firstChild;
               }
            }

            if (node && curMentionTextNode && (document.activeElement == this.textAreaNode && node != window.document)
                  && (node.data != curMentionTextNode.data || (node.data == curMentionTextNode.data && node != curMentionTextNode && range.startOffset != 0))) {
               this.convertMentionNodeToText(this._currentNode, true);
               this.stopTrack();
            }
            else if (node && range.startContainer != node) {
               range.setStart(node, node.data.length);
               range.setEnd(node, node.data.length);
               sel.removeAllRanges();
               sel.addRange(range);
               this.saveSelectionIE(sel);
            }
         }
      },

      addCallback : function(handle, callback) {
         this.eventHandles[handle] = callback;
      },

      printDebug : function(msg) {
         if (dojo.config.isDebug) {
            var d = new Date();
            if (console.debug) {
               console.debug("[" + d.toLocaleTimeString() + "." + d.getMilliseconds() + "] MentionsHelper: " + msg);
            }
            else {
               console.log("[" + d.toLocaleTimeString() + "." + d.getMilliseconds() + "] MentionsHelper: " + msg);
            }
         }
      },

      simulateKeyPressEvent : function(el, key) {
         var keyPressEvent = document.createEvent("KeyboardEvent");
         var initMethod = typeof keyPressEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
         keyPressEvent[initMethod]("keypress", false, false, window, false, false, false, false, key, 0);

         el.dispatchEvent(keyPressEvent);
      },

      setAriaLabel : function(label, content) {
         if (!this.ariaLabel) {
            this.ariaLabel = domConstruct.create("div", {
               id : "mentionsAria_" + this.idx,
               "aria-label" : "What do you want to share?",
               "aria-live" : "polite",
               "aria-atomic" : "true",
               style : "position: absolute; top:-9999px"
            });
            if (has("ie")) {
               domStyle.set(this.ariaLabel, {
                  position : "absolute",
                  top : "-9999px"
               });
            }
         }
         this.ariaLabel[has("ie") ? "innerText" : "innerHTML"] = (content ? string.substitute(label, content) : label) || "";
      },

      preventDefault : function(e) {
         e.preventDefault();
         if (has("ie") > 8) {
            window.event.returnValue = false;
         }
      },

      handleLegacyFF_EmptyNode : function(range) {
         if (has("ff") < 4 && this.textAreaNode.childNodes.length == 1) {
            var node = this.textAreaNode.childNodes[0];
            if (range.startContainer == node && node.nodeType == 3 && node.data == '\n') {
               var blank = document.createTextNode(' ');
               this.replaceBlank = true;
               this.textAreaNode.appendChild(blank);
               this.textAreaNode.removeChild(this.textAreaNode.childNodes[0]);
               range.setStart(blank, 1);
               range.setEnd(blank, 1);
            }
         }
         else {
            this.replaceBlank = false;
         }

         return range;
      },

      skipBlankSpaces : function(node) {
         while (node && node.nodeType == 3 && (node.data == '' || node.data == '\u200B')) {
            node = node.previousSibling;
         }
         return node;
      }
   });

   return MentionsUtils;
});
