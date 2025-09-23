/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * Mentions helper. Transforms a textarea into a contenteditable div and manages
 * low level keyboard input
 * <p>
 * Note: this is a legacy class that will be removed after 5.0
 *
 * @class lconn.core.widget.mentions.MentionsHelper
 * @extends lconn.core.widget.mentions.MentionsUtils
 * @extends lconn.core.widget.mentions.MentionsKeyHandlers
 * @extends lconn.core.widget.mentions.MentionsTypeaheadUtils
 * @extends lconn.core.widget.mentions.URLPreviewMixin
 * @author Piyush K Agarwal <pagarwal@us.ibm.com>
 */

dojo.provide("lconn.core.widget.mentions.MentionsHelper");

dojo.require("dijit._Widget");

dojo.require("lconn.core.widget.mentions.MentionsUtils");
dojo.require("lconn.core.widget.mentions.MentionsKeyHandlers");
dojo.require("lconn.core.widget.mentions.MentionsTypeaheadUtils");
dojo.require("lconn.core.widget.mentions.URLPreviewMixin");
dojo.require("lconn.core.util.text");
dojo.require('lconn.core.globalization.bidiUtil');

dojo.requireLocalization("com.ibm.social.ublog", "Mentions");

(function(textUtils) {
   function isCarded(node) {
      return dijit.getWaiState(node, 'describedby') === 'semtagmenu';
   }

   var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);

   dojo.declare("lconn.core.widget.mentions.MentionsHelper", [lconn.core.widget.mentions.MentionsUtils, lconn.core.widget.mentions.MentionsKeyHandlers, lconn.core.widget.mentions.MentionsTypeaheadUtils, lconn.core.widget.mentions.URLPreviewMixin],
         /** @lends lconn.core.widget.mentions.MentionsHelper.prototype */ {

      MENTION_REGEX : /<[sS][pP][aA][nN] class="?vcard"?><[sS][pP][aA][nN] class="?fn"?>([^<>]+)<\/[sS][pP][aA][nN]><[sS][pP][aA][nN] class="?x-lconn-userid"?>([^<>]+)<\/[sS][pP][aA][nN]><\/[sS][pP][aA][nN]>/g,
      SMARTCLOUD_ENV: "SmartCloud",
      activatorChar : '@',
      bidiActivatorChar : function(nodeValue) {
         var isRTLMention = lconn.core.globalization.bidiUtil.isRTLValue(nodeValue);
         // Connections is in an RTL language (ie: Arabic) && the mention is in LTR language (ie: English) = enforceTextDirection
         return !dojo.isBodyLtr() && !isRTLMention ? lconn.core.globalization.bidiUtil.enforceTextDirection(this.activatorChar, 'ltr') : this.activatorChar;
      },

      // Internal vars for tracking
      _trackedMentions : null, // List of mentions that have been tracked for the current user input
      _isTracking : false, // Tracks if user has hit @ key and we should be tracking to init typeahead
      _currentNode : null, // The current node that the keyboard caret is in
      _rangySelection : null,
      _lastActivatorTrack : "",

      // Options for typeahead
      inputField : null, // Optional, use if you want to hide an existing text area/input, instead of using this as a repalcement
      eventHandles : null,
      multiline : false,
      disableBizCard : false,
      enableActivateAnyKey : false,
      disableMentions : false,

      _helperInstanceCounter: [0],

      constructor : function(args) {
         if (args) {
            dojo.safeMixin(this, args);
         }

         this._resourceBundle = dojo.i18n.getLocalization("com.ibm.social.ublog", "Mentions");

         if (dojo.isIE) {
            try {
               // Disable automatic URL detection in IE9+
               document.execCommand("AutoUrlDetect", false, false);
            } catch (e) {
               // Ignore, we're in IE8 or earlier
            }
            this.includeRangy(dojo.hitch(this, "initRangy"));
         }

         this._trackedMentions = [];

         if (!this.eventHandles) {
            this.eventHandles = [];
         }

         this._idx = 0;
         this.initTypeahead();
      },

      initRangy : function() {
         if (window.rangy) {
            rangy.config.preferTextRange = true;
         }
      },

      // Initialize the type-ahead, but hide the input field
      initTypeahead : function() {

      // Create a new index for the counter.
        var idx = this._helperInstanceCounter[0]++;

         /* The data-notOpenEE attribute is used to indicate that the EE isn't to be opened
            when this node is clicked on - used for in-line commenting on ActivityStream.
            The data-commentInput attribute stops the ActivityStream from acting on the key
            events generated when moving around the people list. */
         this.textAreaNode = dojo.create("div", {
            className : "lotusText lotusMentionsDiv bidiAware",
            contentEditable : "true",
            id : "mentionstextAreaNode_" + idx,
            "aria-labelledby" : "mentionstextAreaNode_" + idx,
            "data-notOpenEE" : "true",
            "data-commentInput" : "true",
            "role" : "textbox",
            "aria-multiline" : "true",
            "aria-autocomplete" : "inline"
         });

         // The first range object created in IE is invalid (which then causes further errors) if the node is empty..
         if (dojo.isIE) {
            this.textAreaNode.appendChild(document.createTextNode(dojo.isIE == 8 ? '\u200B' : ""));
         }

         if(this.isEE){
          this.domNode = dojo.create("div", {
                 id : "mentionsTypeaheadNode_" + idx,
                 className: "lotusOffScreen"
              });
         }
         else{
          this.domNode = dojo.create("div", {
                 id : "mentionsTypeaheadNode_" + idx
              });
         }

         var pos;
         if (this.inputField) {
            pos = dojo.position(this.inputField, true);
            dojo.place(this.textAreaNode, this.inputField, "before");
            dojo.style(this.inputField, "display", "none");
         }

         dojo.place(this.domNode, dojo.body());

         if(pos) {
            dojo.style(this.domNode, {
               top: (pos.y + pos.h - 5) + "px"
            });
         }

         this.tempTextArea = dojo.create("textarea", {
            style : "position: absolute; visibility: hidden; top: -9999px"
         });
         if (dojo.isIE) {
            dojo.style(this.tempTextArea, {
               position : "absolute",
               visibility : "hidden",
               top : "-9999px"
            });
         }
         dojo.place(this.tempTextArea, this.textAreaNode, "after");

         this.setAriaLabel(this.placeholder);
         dojo.place(this.ariaLabel, this.textAreaNode, "after");

         this.connectEvents();
         dojo.subscribe("com/ibm/social/incontext/typeahead/onDisplayChange", this, "resultListOpened");
         dojo.subscribe("com/ibm/social/incontext/typeahead/closeTypeahead", this, "closeTypeahead");

      },

      closeTypeahead : function() {
         this.handleActiveType_HideResults();
         this.resetTypeaheadAria();
      },

      resultListOpened : function(pw) {
         // Checking if the popup widget opened is the one that mentions owns.
         if (pw && this.getActiveType_Field() && this.getActiveType_Popup() && pw.id == this.getActiveType_Popup().id) {
            var listNode = pw.domNode;

            dojo.attr(listNode, "aria-live", "polite");
            dojo.attr(this.textAreaNode, "role", "combobox");
            dojo.attr(this.textAreaNode, "aria-autocomplete", "inline");
            dojo.attr(this.textAreaNode, "aria-expanded", "true");
            dojo.attr(this.textAreaNode, "aria-owns", this.getActiveType_Popup().id);
            // Fixes JAWS issues with the typeahead listbox (wotk item #106483)
            dojo.attr(this.textAreaNode, "aria-activedescendant", pw.id);
            this.setAriaLabel("");

            this.resizeTypeahead(listNode);
         }
      },

      resizeTypeahead : function(listNode) {
         var spaceAbove, spaceBelow, windowHeight, pos, popupHeight, topPosition;
         var node = this._currentNode;
         if (node) {
            if(this.isEE){
               this.applyEEStyles(listNode);
            }
            
            windowHeight = dijit.getViewport().h;
            // use linkNode because pos.h of domNode = 0 (IE)
            pos = dojo.position(node.linkNode, true);
            spaceAbove = pos.y;
            spaceBelow = windowHeight - pos.y - pos.h;
            popupHeight = listNode.parenNode ? listNode.parenNode.clientHeight : listNode.clientHeight;

            // TA results BELOW whenever there is space (default position)
            if (spaceBelow > popupHeight || spaceBelow > spaceAbove) {
               topPosition = spaceAbove + pos.h;
            }
            // TA results ABOVE
            else {
               topPosition = spaceAbove - popupHeight;
               // We need to resize the height the TA popup before putting it on top
               if (spaceAbove < popupHeight) {
                  topPosition = 2;
                  dojo.style(this.isEE? listNode : listNode.parentNode, {
                     height : spaceAbove - pos.h + 7 + "px"
                  });
               }
            }

            dojo.style(listNode.parentNode, {
               top : topPosition + "px"
            });
         }
      },

      applyEEStyles : function(listNode) {
         dojo.style(listNode.parentNode, {
            left : '15px',
            height : 'auto',
            overflowY : "hidden"
         });
         dojo.style(listNode, {
            overflow : "auto",
            height : "auto"
         });
         if (!dojo.isIE) {
            dojo.style(listNode.parentNode, {
               overflow : "visible",
               border : ""
            });
            dojo.style(listNode, {
               border : "",
               overflowX : "hidden"
            });
         }
      },

      mouseDownListener : function(e) {
         if (document.activeElement == this.textAreaNode) {
            this.mouseDown = true;
         }
      },

      mouseMoveListener : function(e) {
         if (this.mouseDown && document.activeElement == this.textAreaNode) {
            if (window.LCSemTagMenu) {
               window.LCSemTagMenu.preventFocus = true;
            }
         }
      },

      mouseUpListener : function(e) {
         if (this.mouseDown) {
            if (window.LCSemTagMenu) {
               window.LCSemTagMenu.preventFocus = false;
            }
            this.mouseDown = false;
         }
      },

      selectOption : function() {
         var curNode = this._currentNode;
         var value = curNode.value;

         var curSel = this.getSelection();
         var range = curSel.range;

         var item = null;

       item = this.getActiveType_Field().getItem();

         // Check if the user was selected from the directory or by entering directly
         if (item) {
            this.completeMention(item);
         } else {
            if (dojo.isIE) {
               this._stopBlur = true;
               var curSel = this.getSelection();
               var sel = curSel.selection;
               this.saveSelectionIE(sel);
            }

            this.setActiveType_FieldValue(this.stringSplice(value, 0, 1));
            this.search();
         }
      },

      createMentionsSpan : function(text, idx) {
         if (dojo.isFF < 4) {
            var nodesToRemove = [];
            dojo.forEach(this.textAreaNode.childNodes, function(node) {
               if ((node.nodeType === 3 && node.data === "\n") || // text node
               (node.nodeName == "BR" && (node.hasAttribute("_moz_dirty") || dojo.attr(node, "type") == "_moz"))) {
                  nodesToRemove.push(node);
               }
            });
            dojo.forEach(nodesToRemove, function(node) {
               this.textAreaNode.removeChild(node);
            }, this);
         }
         var options = {
            idx : idx
         };

         this.saveSelectionIE(sel);
         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;

         var span = document.createElement("span");
         span.id = this.textAreaNode.id + "_mentionsNode_" + idx;
         range.insertNode(span);

         try {
            var templateClass = dojo.getObject(this.getActiveType_NodeTemplateClass());
            if (!templateClass)
                throw "No mention template class available";
            var spanWidget = new templateClass(options, span.id);

            if (dojo.isIE) {
               dojo.attr(spanWidget.domNode, "unselectable", "on");
            }
            spanWidget.setValue(String.fromCharCode(this.trackedKeyCode));
            spanWidget.setValue('\u200B');

            this.setAriaLabel(this._resourceBundle.CREATED_MENTION);

            this._currentNode = spanWidget;

            var domNode = spanWidget.domNode;

            if (domNode) {
               var prevText, nextText = null;
               if (dojo.isWebKit){
                   prevText = document.createTextNode('\u200B');
               nextText = document.createTextNode('\u200B');
                } else if (dojo.isIE > 7) {
               if(!this._isTracking) {
                  prevText = document.createTextNode('\u200B');
                  nextText = document.createTextNode('\u200B');
              } else if (!!(window.event) && window.event.keyCode == 50 && window.event.ctrlKey && window.event.altKey) { //for German and other langauges where ctrl + alt are required
                 prevText = document.createTextNode('');
                 nextText = document.createTextNode('');
               } else if (!!(window.event) && window.event.keyCode == 50) { //for English and other similar languages where Shift + key is required
                 prevText = document.createTextNode('');
                 nextText = document.createTextNode('\u200B');
              } else {
                  prevText = document.createTextNode('');
                 nextText = document.createTextNode('\u200B');
               }
            } else {
                   prevText = document.createTextNode('');
                   nextText = document.createTextNode('');
              }
               if (!domNode.previousSibling) {
                  this.textAreaNode.insertBefore(prevText, domNode);
               }

               if (!domNode.nextSibling) {
                  this.textAreaNode.insertBefore(nextText, domNode.nextSibling);
               }
            }

            range = this.rangeMoveToNodeEnd(spanWidget, range);
            sel.removeAllRanges();
            sel.addRange(range);

            return spanWidget;
         } catch (e) {
            console.log(e);
         }

      },

      addTrack : function() {
         this._isTracking = true;
         if (dojo.isIE) {
            this._stopBlur = true;
            var curSel = this.getSelection();
            var sel = curSel.selection;
            this.saveSelectionIE(sel);
         }
         this.setActiveType_FieldValue("");
         var curNode = this.createMentionsSpan("", this._idx);
         this._idx++;

         this._trackedMentions.push(curNode);
         this._currentNode = curNode;

         this.positionTypeahead();
         dojo.publish("lconn/core/mentions/startTrack");
      },

      updateTrack : function(value) {
         console.log("Updating the tracking/search Value:: " + value);
         this._isTracking = true;

         if (dojo.isIE) {
            this._stopBlur = true;
            var curSel = this.getSelection();
            var sel = curSel.selection;
            this.saveSelectionIE(sel);
         }

         if (!this.enableActivateAnyKey) {
            value = value.substring(1, value.length);
         }

         this.setActiveType_FieldValue(value);
         this.search();

      },

      stopTrack : function() {
         this._isTracking = false;

         if (dojo.isIE) {
            this._stopBlur = true;
            var curSel = this.getSelection();
            var sel = curSel.selection;
            this.saveSelectionIE(sel);
         }

         // hideResultList function handles canceling the last search query and hiding the typeahead
         this.handleActiveType_HideResults();

         this.setActiveType_FieldValue("");
         this.search();
         this._currentNode = null;
         this.printDebug(this._trackedMentions);
         dojo.publish("lconn/core/mentions/stopTrack", Array.prototype.slice.call(arguments));
      },
      
      cancelMention : function() {
         this.convertMentionNodeToText(this._currentNode);
         this.stopTrack();
      },

      plainTextChromeCancelMention : function() {
         //update for chrome and plaintext mentions issue
         //where cancelled mentions node cause repeated text
         var prevNode = this._currentNode.domNode.previousSibling;
         prevNode.data += this._currentNode.value;
         this.removeMentionNode(this._currentNode);
         this.stopTrack();
         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;
         range.setStart(prevNode, prevNode.data.length);
         range.setEnd(prevNode, prevNode.data.length);
         sel.removeAllRanges();
         sel.addRange(range);
      },

      search : function() {
         // clear existing search if a new search was called before the existing search completed
         var activeField = this.getActiveType_Field();
         if (activeField) {
            if (activeField.searchTimer) {
               activeField.searchTimer.remove();
               activeField.searchTimer = null;
            }

            activeField.searchTimer = activeField.defer(dojo.hitch(activeField, activeField._startSearchFromInput), 50);
         }
      },

      positionTypeahead : function() {
         var node = this._currentNode;
         if (node) {
            var pos = dojo.position(node.domNode, true);

            if (dojo._isBodyLtr()) {
               dojo.style(this.getActiveType_Field().domNode, {
                  left : pos.x + "px",
                  top : (pos.y + pos.h - this.getActiveType_VOffset()) + "px"
               });
            } else {
               var windowWidth = dijit.getViewport().w;
               var newPos = windowWidth - pos.x - pos.w;

               dojo.style(this.getActiveType_Field().domNode, {
                  right : newPos + "px",
                  top : (pos.y + pos.h - this.getActiveType_VOffset()) + "px"
               });
            }

            dojo.style(this.domNode, {
               top: (pos.y + pos.h - 5) + "px"
            });
         }
      },

      clickListener : function(e) {
         this.preventDefault(e);
         this.textAreaNode.focus();
         if (dojo.isFF < 4) {
            if (this.textAreaNode.childNodes.length == 0) {
               var t = document.createTextNode("\n");
               this.textAreaNode.appendChild(t);
            }
         }

         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;

         if (this._isTracking) {
            if (!dojo.isIE) {
               this.handleResumeMention(sel, range);
            } else if (dojo.isIE && window.rangy) {
               setTimeout(dojo.hitch(this, function() {
                  //sel.refresh();
                  this._rangySelection = sel;
                  range = sel.getRangeAt(0);
                  this.printDebug("After Key: " + this.getRangeText(range) + " -- Start: " + range.startOffset + "    End: " + range.endOffset);
                  this.handleResumeMention(sel, range);
               }), 50);
            }
         } else {
            this._currentNode = null;
            if (dojo.isIE && window.rangy) {
               setTimeout(dojo.hitch(this, function() {
                  sel.refresh();
                  this._rangySelection = sel;
                  range = sel.getRangeAt(0);
                  //determine if the user is attempting to click next to a completed mention.
                  if(sel.anchorNode.parentNode.nodeName == ("A" || "SPAN")  && sel.anchorNode.parentNode.nodeType == 1){
                     //create new blank text node after the mention for user to continue typing into.
                      var t = document.createTextNode("\u200B");
                      this.textAreaNode.appendChild(t);
                      range.setStart(t, t.data.length);
                      range.setEnd(t, t.data.length);
                      sel.removeAllRanges();
                      sel.addRange(range);
                      this.saveSelectionIE(sel);
                  }
                  this.printDebug("After Key: " + this.getRangeText(range) + " -- Start: " + range.startOffset + "    End: " + range.endOffset);
               }), 50);
            }
         }

         if (this.eventHandles["onclick"]) {
            this.eventHandles.onclick();
         }

      },

      findNextNode : function(idx, increment) {
         var nodeType = -1;
         var newNode = this.textAreaNode.childNodes[idx + increment];
         if (newNode) {
            nodeType = newNode.nodeType;
         }

         return {
            "nodeType" : nodeType,
            "newNode" : newNode
         };
      },

      /**
       * @deprecated
       */
      getNodeAttributes : function(nodeId) {
         dojo.deprecated("MentionsHelper.getNodeAttributes", "The name of this method is misleading. Use MentionsHelper.findTrackedMentionById(nodeId) instead", "5.0");
         return this.findTrackedMentionById(nodeId);
      },

      /**
       * Finds a tracked mention by id
       * @param {String} mentionId The id of the mention
       */
      findTrackedMentionById : function(mentionId) {
         var foundNode = null;
         dojo.every(this._trackedMentions, function(mention) {
            if (mentionId == mention.id) {
               foundNode = mention;
               return false;
            }
            return true;
         }, this);

         return foundNode;
      },

      /**
       * Sets the value of the textarea.
       * 
       * @param {String}
       *           value Can be a mixture of plain text and mention microformat,
       *           both HTML or plain text.
       */
      setValue : function(value) {
         dojo.empty(this.textAreaNode);
         var valueNode = dojo.toDom(textUtils.htmlify(value));
         this.textAreaNode.appendChild(valueNode);
      },

      keyListener : function(e) {
         // if the active element is not the TextAreaNode, then make sure we don't
         // track any keyEvents that bubble to the node (can happen when mouse
         // hovers over an element in the TextAreaNode and the user continues
         // typing
         if ((document.activeElement != this.textAreaNode) && (!dojo.isIE && !dojo.keys.BACKSPACE)) {
            return;
         }
         if(dojo.isIE && e.keyCode == 20){
            //simply return and allow caps lock to be activated/deactivated
            return;
         }
         
         //fix for PMR 26949,070,724 - German @mentions input not allowing capitalized letters
         var germanCase = (dojo.isIE == 9 && dojo.config.locale == "de-de" && e.keyCode == 16 && this._isTracking);
         //if an IE8 user tries to highlight and type-over an active mention
         if(dojo.isIE && document.selection && this._isTracking){
            var curSel = this.getSelection();
            var sel = curSel.selection;
            var range = curSel.range;
            var IEselectionStart, IEselectionEnd;
            // get the current selection, then create a temp version of it
            // then use the 2 ends to determine start and end points
            // of original text. -workaround for IE8 range/selection issues-
            var IErange = document.selection.createRange();
            var tempRange = IErange.duplicate();
            tempRange.moveToElementText( this.textAreaNode );
            tempRange.setEndPoint( 'EndToEnd', IErange );
            IEselectionStart = tempRange.text.length - IErange.text.length;
            IEselectionEnd = IEselectionStart + IErange.text.length;
            var selText = tempRange.text.substr(IEselectionStart, IEselectionEnd);
            //if start/end dont meet this is an uncollapsed range.
            if(IEselectionStart != IEselectionEnd){
               //if startContainer parent is the link, the mentions has been selected
               if(range.startContainer && range.startContainer.parentNode == this._currentNode.linkNode){
                  //ensure it is a char key, and not a special key
                  if(e.charCode > 0){
                     //cancel mentions, then remove all selected text from text area
                     this.cancelMention();
                     //replace no-break spaces with '' so that selText can match up.
                     this.textAreaNode.innerHTML = this.textAreaNode.innerHTML.replace(/&nbsp;/,'');
                     this.textAreaNode.innerHTML = this.textAreaNode.innerHTML.replace(selText, '');
                     return;
                  }
               }
            }
         }else if(this._isTracking){
            var curSel = this.getSelection();
            var sel = curSel.selection;
            var range = curSel.range;
            //user is typing over selected text
            if(!range.collapsed){
               var startContainer = range.startContainer,
               endContainer = range.endContainer,
               chromeCheck = false;
               if(dojo.isChrome && this.textAreaNode.firstChild.textContent == '\u200B' && this.textAreaNode.firstElementChild  && 
                     this.textAreaNode.firstElementChild == this._currentNode.domNode){
                  //instance where user attempts to highlight and remove a mentions that it is the first thing in the BTB using chrome
                  chromeCheck = true;
               }
               if((startContainer.parentNode || endContainer.parentNode) == this._currentNode.linkNode  || chromeCheck){
                  this._currentNode.value = "";
                  this.cancelMention();
               }
            }
         }
         if (dojo.isIE && e.keyCode == 229 && e.charCode != 229 || (dojo.isIE && this._isComposition && e.keycode != 229 && e.keyCode == dojo.keys.SPACE)) {
            this._isComposition = true;
             this._wasComposition = false;
             if (this._currentNode)
                dojo.style(this._currentNode.domNode, "color", "#1970b0");
             if (this._isTracking && this._currentNode.linkNode) {
                if (!this._currentNode.linkNode.nextSibling){
                   var curSel = this.getSelection();
                   var sel = curSel.selection;
                   sel.refresh();
                   this._rangySelection = sel;
                   range = sel.getRangeAt(0);
                   var curNode = this._currentNode;
                   if (range.startContainer && range.startContainer.data) {
                      range.startContainer.data = "";
                      var textNode = curNode.getTextNode();
                      curNode.setTextRange(this.updateRange(textNode, textNode.length).nodeRange);
                   }
                }
                setTimeout(dojo.hitch(this, function() {
                   var imeNode = (this._currentNode && this._currentNode.linkNode && this._currentNode.linkNode.nextSibling) ? this._currentNode.linkNode.nextSibling : null;

                   if (imeNode && imeNode.nodeType == 3 && imeNode.data.length>1) {
                      if(dojo.isIE == 8){
                         var IMEdata = this._currentNode.value + imeNode.data.replace(/[\n\r\t]/g, '');
                      }else{
                         var IMEdata = this._currentNode.value + imeNode.data.substring(0, imeNode.data.length - 1).replace(/[\n\r\t]/g, '');
                      }
                      this.updateTrack(IMEdata);
                   }
                }), 50);
             }

         } else if (dojo.isIE && this._isComposition && e.keycode != 229 && e.keyCode != dojo.keys.SPACE) {
            this._wasComposition = true;
            this._isComposition = false;
            if (this._currentNode)
               dojo.style(this._currentNode.domNode, "color", "");
         }

         // Start a track if the key code to activate it was pressed.
         // let it fall through so the key can be tracked as normal
         var isTrackedKey = false;
         if (!this._isTracking) {
            isTrackedKey = this.isTrackedKeyCode(e);
            if (isTrackedKey) {
               isTrackedKey = this.handleActivatorKey(e);
            }
         }

         if (this.enableActivateAnyKey && this.getActiveType_Field() && (e.charCode || e.keyCode) == dojo.keys.SPACE && this._isTracking && this.getActiveType_Field().results.length < 2) {
            this.convertMentionNodeToText(this._currentNode);
            this.stopTrack();
            isTrackedKey = false;
         }

         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;

         //updates range to the end of current IME input.
         if (dojo.isIE && e.keyCode == 229 && e.charCode != 229) {
            var imeRangeTxt = this.getRangeText(range);
            if (imeRangeTxt){
               range.startOffset = imeRangeTxt.length;
               range.endOffset = imeRangeTxt.length;
               if(this._isTracking){
                  //IE check if tracking a mention, if true; then update the search,
                  //and the current node value, to the IME input.
                  this._currentNode.value = imeRangeTxt;
                  this.updateTrack(imeRangeTxt);
               }
            }
         }
         
         if(dojo.isFF < 4) {
            range = this.handleLegacyFF_EmptyNode(range);
            sel.removeAllRanges();
            sel.addRange(range);
         }

         startOffset = range.startOffset;
         endOffset = range.endOffset;

         // Handle other keys
         if (this.isRightArrow(e)) {
            if (dojo._isBodyLtr()) {
               this.handleRightArrowMain(e);
            } else {
               this.handleLeftArrowMain(e);
            }
         } else if (this.isLeftArrow(e)) {
            if (dojo._isBodyLtr()) {
               this.handleLeftArrowMain(e);
            } else {
               this.handleRightArrowMain(e);
            }
         } else if (this.isUpDownArrow(e)) {
            this.handleUpDownArrow(e);

         } else if (this.isEscape(e)) {
            this.handleEscape(e);
         } else if (this.isTab(e)) {
            this.handleTab(e);

         } else if (this.isBoldHotkey(e) || this.isItalicsHotkey(e) || this.isUnderlineHotkey(e)) {
            this.cancelEvent(e);

         } else if (this.isPasteHotkey(e)) {
            this.handlePrePaste(e);

         } else if (this.isBackspace(e)) {
            if (dojo.isIE && !this._isTracking) {
               sel.refresh();
               //range = sel.getRangeAt(0); //99049 - Causes the range to incorrectly reset in IE when the user
                                        //starts a new line. If the user then presses backspace, IE would crash.
            }
            var curNode = this._currentNode;
            var startOffset = range.startOffset;
            var endOffset = range.endOffset;

            // Handle when a user is currently adding an @mention,
            // if user uses arrow keys to go out of @mention without
            // completing it, it will be cancelled.
            if (this._isTracking) {
               this.preventDefault(e);
               var value = curNode.value;
               var newOffset = 0;
               // Handle backspace at cursor
               if (startOffset == endOffset) {
                  //RTC 102465 - Added to handle the case when a partial mention is highlighted
                  //and deleted via the backspace key
                 if (startOffset == 0 && endOffset == 0) {
                    value = this.stringSplice(value, startOffset, value.length);
                    newOffset = startOffset;
                 } else {
                      this.setAriaLabel(value.slice(endOffset - 1, -1));
                      value = this.stringSplice(value, endOffset - 1, 1);
                      newOffset = endOffset - 1;
                 }

                  // Handle backspace of a selection within @mention
               } else {
                  value = this.stringSplice(value, startOffset, endOffset - startOffset);
                  newOffset = startOffset;
               }

               if (value != "") {
                  curNode.setValue(value);
                  this.updateTrack(curNode.value);

                  if (dojo.isIE && window.rangy) {
                     var range = rangy.createRangyRange();
                     range.setStart(curNode.linkNode.firstChild, newOffset);
                     range.setEnd(curNode.linkNode.firstChild, newOffset);
                     sel.setSingleRangeEx(range);
                  } else {
                     curNode.setTextRange(this.updateRange(curNode.linkNode, newOffset).nodeRange);
                  }
               } else {
                  var focusNode = curNode.domNode.previousSibling;
                  var nextNode = this.removeMentionNode(curNode, true);
                  this.stopTrack();

                  range = this.rangeMoveToNodeStart(nextNode, range);
                  sel.removeAllRanges();
                  sel.addRange(range);
                  this.saveSelectionIE(sel);

                  if (dojo.isSafari) {
                     this.safariNodeFix(focusNode);
                  }
               }

               // Handle when user is not actively adding an @mention
            } else {

               // Handle case when the range is an actual node in the editable div
               if (range.startContainer != this.textAreaNode) {

                  // Handle backspace at cursor
                  if (startOffset == endOffset && range.startContainer == range.endContainer && range.startContainer.parentNode != null) {
                     // If it is an empty text range, go to the previous non-empty nodes
                     if (range.startContainer.nodeValue == "" || range.startContainer.nodeValue == '\u200B' || (dojo.indexOf(this.textAreaNode.childNodes, range.startContainer) > 0 && range.startContainer.nodeType == 3 && range.startOffset == 0)) {
                        curNode = this.moveToPreviousNode(range.startContainer, range, sel);
                        curSel = this.getSelection();
                        sel = curSel.selection;
                        range = curSel.range;
                        startOffset = range.startOffset;
                        endOffset = range.endOffset;
                        if (this._currentNode) {
                           curNode = this._currentNode;
                        }
                     }

                     // Get mentions widget to prepare deleting when the range startContainer is the node in mentions widget
                     if (!curNode) {
                        var start = range.startContainer;
                        if (start != this.textAreaNode) {
                           while (start && start.parentNode != this.textAreaNode)
                              start = start.parentNode;
                           if (this.isAnyMentionsDomNode(start))
                              curNode = dijit.byId(start.id);
                        }
                     }

                     // If curNode is not null, then a mention is selected
                     // set the cursor to before the mention, then delete the mention
                     if (curNode != null && dojo.indexOf(this._trackedMentions, curNode) != -1) {
                        this.preventDefault(e);
                        this.moveToPreviousNode(curNode.domNode, range, sel);
                        curSel = this.getSelection();
                        sel = curSel.selection;
                        range = curSel.range;
                        startOffset = range.startOffset;
                        endOffset = range.endOffset;
                        this.removeMentionNode(curNode);
                        this._currentNode = null;

                        if (dojo.isIE && window.rangy) {
                           sel.setSingleRangeEx(range);
                        } else {
                           sel.removeAllRanges();
                           sel.addRange(range);
                        }
                        // Otherwise handle deleting a character from the current range
                     } else {
                        if(dojo.isIE && curNode && curNode.previousSibling){
                           //go to previousNode becuase thats whats being deleted.
                           curNode = curNode.previousSibling;
                           startOffset = dojo.indexOf(this.textAreaNode.childNodes, curNode);
                           //check if curNode is actually added blank space, if so, get node before it.
                           while (curNode && curNode.nodeType == 3 && (curNode.data == "" || curNode.data == '\u200B') && startOffset > 0) {
                              startOffset = startOffset - 1;
                              nextNode = this.textAreaNode.childNodes[startOffset];
                              // Remove empty text nodes then update curNode variable
                              if (nextNode) {
                                 this.textAreaNode.removeChild(curNode);
                                 curNode = nextNode;
                              }
                           }
                           startOffset = dojo.indexOf(this.textAreaNode.childNodes, curNode);
                        }else{
                           curNode = range.startContainer;
                        }
                        

                        while (curNode && curNode.nodeType == 3 && (curNode.data == "" || curNode.data == '\u200B')) {
                           curNode.data = "";
                           startOffset = startOffset - 1;
                           endOffset = endOffset - 1;
                           nextNode = this.textAreaNode.childNodes[startOffset];

                           // Remove duplicate empty TextNodes, we only want one at the end
                           if (nextNode && nextNode.nodeType == 3 && nextNode.data == "") {
                              this.textAreaNode.removeChild(curNode);
                           }
                           curNode = nextNode;
                        }

                        if ((this.multiline && curNode && curNode.nodeName == "BR") && !(dojo.isIE == 7)) {
                           this.preventDefault(e);
                           var moveToNode = curNode.previousSibling;
                           this.textAreaNode.removeChild(curNode);
                           // let default delete occur, have to update range for IE
                        } else if (dojo.isIE > 7 && curNode && curNode.nodeType == 3 && range.startOffset == 1 && range.endOffset == 1 && curNode.data.charAt(0) == '\u200B') {
                           curNode = this.moveToPreviousNode(curNode, range, sel);
                           curSel = this.getSelection();
                           sel = curSel.selection;
                           range = curSel.range;
                           startOffset = range.startOffset;
                           endOffset = range.endOffset;
                           if (this.isAnyMentionsDomNode(curNode)) {
                              this.moveToPreviousNode(curNode, range, sel);
                              this.removeMentionById(curNode.id);
                           }
                           this._currentNode = null;

                           if (dojo.isIE && window.rangy) {
                              sel.setSingleRangeEx(range);
                           } else {
                              sel.removeAllRanges();
                              sel.addRange(range);
                           }
                        } else {
                           if (dojo.isIE && window.rangy) {
                              setTimeout(dojo.hitch(this, function() {
                                 sel.refresh();
                                 this._rangySelection = sel;
                                 range = sel.getRangeAt(0);
                                 this.printDebug("After Key: " + this.getRangeText(range) + " -- Start: " + range.startOffset + "    End: " + range.endOffset);

                              }), 500);
                           }
                        }

                        if (dojo.isSafari) {
                           // Call the onkeypress routine before returning false.
                           if (this.eventHandles["onkeypress"]) {
                              setTimeout(dojo.hitch(this, this.eventHandles.onkeypress), 50);
                           }

                           return false;
                        }
                     }

                     // Handle backspace of a selection
                  } else if (!dojo.isIE && !isIE11) {
                     this.removeSelection(e, range);
                  }
                  // Handle the case when the range is just indexes in the div
               } else {
                  this.preventDefault(e);
                  
                  //subtract one to get correct array index
                  startOffset = startOffset - 1;
                  endOffset = endOffset - 1;
                  
                  //ensure that offsets will be 0 at minimum.
                  if(startOffset < 0) {
                     startOffset = 0;
                  }
                  if(endOffset < 0) {
                     endOffset = 0;
                  }

                  var curNode = this.textAreaNode.childNodes[startOffset];
                  if (startOffset == endOffset) {
                     while (curNode && curNode.nodeType == 3 && (curNode.data == "" || curNode.data == '\u200B')) {
                        curNode.data = "";
                        startOffset = startOffset - 1;
                        endOffset = endOffset - 1;
                        nextNode = this.textAreaNode.childNodes[startOffset];

                        // Remove duplicate empty TextNodes, we only want one at the end
                        if (nextNode && nextNode.nodeType == 3 && (nextNode.data == "" || nextNode.data == '\u200B')) {
                           this.textAreaNode.removeChild(curNode);
                        }
                        curNode = nextNode;
                     }

                     if (curNode != null) {
                        if (curNode.nodeType == 3) {
                           range = this.updateRange(curNode, curNode.data.length).nodeRange;
                           endOffset = range.endOffset;
                           curNode.data = this.stringSplice(curNode.data, endOffset - 1, 1);
                           this.updateRange(curNode, endOffset);
                        } else if (curNode.nodeName == "BR") {
                           if ((curNode.hasAttribute && curNode.hasAttribute("_moz_dirty")) || dojo.attr(curNode, "type") == "_moz") {
                              var moveToNode = curNode.previousSibling;
                              this.textAreaNode.removeChild(curNode);
                              curNode = moveToNode;
                              while (moveToNode && moveToNode.nodeName != "BR") {
                                 moveToNode = curNode.previousSibling;
                                 this.textAreaNode.removeChild(curNode);

                                 if (this.isAnyMentionsDomNode(curNode)) {
                                    this.removeMentionById(curNode.id);
                                 }

                                 curNode = moveToNode;
                              }
                           }
                           while (curNode && curNode.nodeName == "BR") {
                              var moveToNode = curNode.previousSibling;
                              this.textAreaNode.removeChild(curNode);
                              curNode = moveToNode;
                           }
                           this.moveToNextNode(curNode, range, sel);
                           curSel = this.getSelection();
                           sel = curSel.selection;
                           range = curSel.range;
                           startOffset = range.startOffset;
                           endOffset = range.endOffset;
                        } else if (curNode.id || (curNode.nodeName == 'SPAN' && curNode.className.indexOf('vcard') > -1)) {
                           if(curNode.id){
                              //remove a standard mentions
                              nextNode = this.removeMentionById(curNode.id);
                           }else{
                              //remove a mention formatted from plainText
                              var tempNode = curNode.previousSibling;
                              this._trackedMentions.splice(dojo.indexOf(this._trackedMentions, curNode), 1);
                              this.textAreaNode.removeChild(curNode);
                              if (this.eventHandles["onRemoveMention"]) {
                                 this.eventHandles.onRemoveMention(mentionNode);
                              }
                              this.updateRange(tempNode, tempNode.length);
                           }
                           this._currentNode = null;
                      } else if (dojo.isFF) {
                           if (curNode.nodeType == 3 && curNode.data != '\n') {
                              range.setStart(curNode, curNode.data.length);
                              range.setEnd(curNode, curNode.data.length);
                              endOffset = curNode.data.length;
                              curNode.data = this.stringSplice(curNode.data, endOffset - 1, 1);
                              this.updateRange(curNode, endOffset);
                           }
                        }
                     }
                  } else {
                     this.removeSelection(e, range);
                  }
               }
            }

            // Have to normalize (combine adjacent TextNode in WebKit browser)
            // due to issue where even though range is moved to next TextNode
            // cursor does not move for adjacent TextNodes...
            if (dojo.isWebKit) {
               this.textAreaNode.normalize();
            }

            // handle delete key (on Mac ctrl-d is same as forward delete)
         } else if (this.isDelete(e)) {
            if (dojo.isIE && !this._isTracking) {
               sel.refresh();
               range = sel.getRangeAt(0);
            }
            var curNode = this._currentNode;
            var startOffset = range.startOffset;
            var endOffset = range.endOffset;

            // Handle delete when a user is currently adding an @mention,
            // if user uses arrow keys to go out of @mention without
            // completing it, it will be cancelled.
            if (this._isTracking) {
               this.preventDefault(e);
               var value = curNode.value;
               var newOffset = 0;
               // Handle delete at cursor
               if (startOffset == endOffset) {
                  value = this.stringSplice(value, endOffset, 1);
                  newOffset = endOffset;

                  // Handle delete of a selection within @mention (same as backspace)
               } else {
                  value = this.stringSplice(value, startOffset, endOffset - startOffset);
                  newOffset = startOffset;
               }

               if (value.charAt(0) == this.activatorChar) {
                  curNode.setValue(value);
                  var textNode = curNode.getTextNode();
                  if (dojo.isIE && window.rangy) {
                     var range = rangy.createRangyRange();
                     range.setStart(textNode, newOffset);
                     range.setEnd(textNode, newOffset);
                     sel.setSingleRangeEx(range);
                     this.saveSelectionIE(sel);
                  } else {
                     curNode.setTextRange(this.updateRange(textNode, newOffset).nodeRange);
                  }
                  this.updateTrack(curNode.value);
               } else {
                  var focusNode = curNode.domNode.previousSibling;
                  var nextNode = this.removeMentionNode(curNode, true);
                  this.stopTrack();

                  range = this.rangeMoveToNodeStart(nextNode, range);
                  sel.removeAllRanges();
                  sel.addRange(range);
                  this.saveSelectionIE(sel);

                  if (dojo.isSafari) {
                     this.safariNodeFix(focusNode);
                  }
               }

               // Handle when user is not actively adding an @mention
            } else {
               // Handle case when the range is an actual node in the editable div
               if (range.startContainer != this.textAreaNode) {

                  // Handle delete at cursor
                  if (startOffset == endOffset && range.startContainer == range.endContainer) {

                     if (dojo.isIE) {
                        var start = range.startContainer;
                        while (start.parentNode && start.parentNode != this.textAreaNode) {
                           start = start.parentNode;
                        }
                     }

                     // If at the beginning of a text range, go to the previous non-empty node
                     // if it is a mention then delete it
                     if (range.startOffset == range.startContainer.length) {
                        this.moveToNextNode(range.startContainer, range, sel);
                        curSel = this.getSelection();
                        sel = curSel.selection;
                        range = curSel.range;
                        startOffset = range.startOffset;
                        endOffset = range.endOffset;
                        curNode = this._currentNode;
                     }

                     // If curNode is not null, then a mention is selected
                     // set the cursor to before the mention, then delete the mention
                     if (curNode != null && dojo.indexOf(this._trackedMentions, curNode) != -1) {
                        this.preventDefault(e);
                        this.moveToPreviousNode(curNode.domNode, range, sel);
                        curSel = this.getSelection();
                        sel = curSel.selection;
                        range = curSel.range;
                        startOffset = range.startOffset;
                        endOffset = range.endOffset;
                        this.removeMentionNode(curNode);
                        this._currentNode = null;

                        if (dojo.isIE && window.rangy) {
                           sel.setSingleRangeEx(range);
                        } else {
                           sel.removeAllRanges();
                           sel.addRange(range);
                        }
                        // let default delete occur, have to update range for IE
                     } else {
                        if (dojo.isIE && window.rangy) {
                           setTimeout(dojo.hitch(this, function() {
                              sel.refresh();
                              this._rangySelection = sel;
                              range = sel.getRangeAt(0);
                              this.printDebug("After Key: " + this.getRangeText(range) + " -- Start: " + range.startOffset + "    End: " + range.endOffset);

                           }), 50);
                        }
                     }

                     // Handle delete of a selection (same as backspace)
                  } else if (!dojo.isIE && !isIE11) {
                     this.removeSelection(e, range);
                  }
                  // Handle the case when the range is just indexes in the div
               } else {
                  this.preventDefault(e);
                  var curNode = this.textAreaNode.childNodes[startOffset];
                  var nextNode = null;
                  if (startOffset == endOffset) {
                     while (curNode && curNode.nodeType == 3 && nextNode && (nextNode.data == "" || nextNode.data == '\u200B')) {
                        curNode.data = "";
                        startOffset = startOffset - 1;
                        endOffset = endOffset - 1;
                        nextNode = this.textAreaNode.childNodes[startOffset];

                        // Remove duplicate empty TextNodes, we only want one at the end
                        if (nextNode && nextNode.nodeType == 3 && (nextNode.data == "" || nextNode.data == '\u200B')) {
                           this.textAreaNode.removeChild(curNode);
                        }
                        curNode = nextNode;
                     }

                     if (curNode != null) {
                        if (curNode.nodeType == 3) {
                           range.selectNode(curNode);
                           endOffset = range.endOffset;
                           curNode.data = this.stringSplice(curNode.data, endOffset - 1, 1);
                        } else if (curNode.nodeName == "BR") {
                           this.textAreaNode.removeChild(curNode);
                        } else {
                           nextNode = this.removeMentionById(curNode.id);
                           this._currentNode = null;
                        }
                     }
                  } else {
                     this.removeSelection(e, range);
                  }
               }
            }

            // Have to normalize (combine adjacent TextNode in WebKit browser)
            // due to issue where even though range is moved to next TextNode
            // cursor does not move for adjacent TextNodes...
            if (dojo.isWebKit) {
               this.textAreaNode.normalize();
            }
            // Chrome detects Ctrl-Enter as keycode 10 instead of e.ctrlKey + e.keyCode = 13 (dojo.keys.ENTER)
         } else if (this.isCtrlEnter(e)) {
            this.preventDefault(e);
            if (lconn.profiles.bizCard.bizCard && !this.disableBizCard) {
               e.keyCode = 13;
               if (dojo.isIE > 8) {
                  window.event.keyCode = 13;
               }
               lconn.profiles.bizCard.bizCard.keystrokeHandler(e);
            }
         } else if (this.isEnter(e)) {
            if (!e.ctrlKey && !e.metaKey && this._isTracking && this.getActiveType_IsShowing()) {
               this.preventDefault(e);
               this.selectTypeaheadOption();
            // Line break
            } else {
               this.preventDefault(e);
               if (this.getActiveType_Field() && this._isTracking && !this.getActiveType_IsShowing()) {
               this.convertMentionNodeToText(this._currentNode);
                  this.stopTrack();
                  isTrackedKey = false;
            }
               if (this.multiline) {
                  var br = document.createElement("br");

                  if(range.startContainer != this.textAreaNode && range.startContainer.parentNode != this.textAreaNode) {
                     range.setStart(this.textAreaNode, this.textAreaNode.childNodes.length);
               range.setEnd(this.textAreaNode, this.textAreaNode.childNodes.length);
                  }

                  // Text node has space to fix bug in chrome where cursor does not move to
                  // after the <br> unless there is content in the TextNode after the <br>
                  var prevText = document.createTextNode('');
                  var nextText = null;
                  if (dojo.isWebKit || dojo.isIE) {
                     nextText = document.createTextNode('\u200B');
                  } else {
                if(dojo.isIE == 8) {
                  nextText = document.createTextNode('\u200B');
                } else {
                  nextText = document.createTextNode('');
                }
                  }

                  if (dojo.isIE) {
                     var start = range.startContainer;
                     while (start.parentNode && start.parentNode != this.textAreaNode) {
                        start = start.parentNode;
                     }

                     if (this.isAnyMentionsDomNode(start)) {
                        range = this.moveToNext(range, start);
                     }
                  }

                  range.insertNode(prevText);
                  range.setStartAfter(prevText);

                  sel.removeAllRanges();
                  sel.addRange(curSel.range);

                  range.insertNode(br);
                  range.setStartAfter(br);

                  sel.removeAllRanges();
                  sel.addRange(curSel.range);

                  // RTC 112615 - Check to see whether the last character typed is double
                  // byte and if so, handle the extra \u200B accordingly
                  // RTC 114144 - Included IE7 for Compat Mode case
                  /**
                   * This has been commented out for now. I will remove this code soon
                   * once I'm confident no regression occurs. This is for defect 117430.
                   * The previous two defects mentioned above still work without this
                   * code as further changes were made to render this part obsolete.
                   */
//            if (curSel.charCodeAt(curSel.length - 2) > 255 && curSel.charCodeAt(curSel.length - 1) > 255 && dojo.isIE < 9) {
//                nextText = document.createTextNode('');
//               range.insertNode(nextText);
//                      range.setStartAfter(nextText);
//               nextText = document.createTextNode('\u200B');
//            } else {
                  range.insertNode(nextText);
                 range.setStartAfter(nextText);
//            }

                  sel.removeAllRanges();
                  sel.addRange(curSel.range);

                  if (dojo.isIE)
                    range.setStartAfter(br);

                  var tempNode = document.createElement("span");
                  range.cloneRange().insertNode(tempNode);
                  // fix to scroll to the new line
                  this.textAreaNode.scrollTop = tempNode.offsetTop - this.textAreaNode.offsetTop;
                  tempNode.parentNode.removeChild(tempNode);

                  this.saveSelectionIE(sel);
               }
            }

            this.printDebug(dojo.toJson(this.getTextAsJson()));

         } else if ((isTrackedKey || this.isTrackedKey(e)|| germanCase) && !this._isComposition && e.keyCode != 20) {
            this.preventDefault(e);

            var curNode = this._currentNode;

            if(!curNode) {
               var start = range.startContainer;
               while (start && start.parentNode && start.parentNode != this.textAreaNode) {
                  start = start.parentNode;
                }
                curNode = this.getNodeAttributes(start.id);
               this._currentNode = curNode;
            }

            if (curNode) {
               var originalValue = curNode.value;
               var value = originalValue.replace('\u200B', '');

               // Making an adjustment to cursor due to incorrect placement with
               // Italian and German languages
               if (dojo.isIE) {
                  var offset = range.endOffset - (originalValue.length - value.length) + 1;
               } else {
                  var offset = range.endOffset - (originalValue.length - value.length);
               }
               if (startOffset != endOffset) {
                  range = this.removeSelection(e, range);
                  originalValue = curNode.value;
                  value = originalValue.replace('\u200B', '');
                  offset = range.startOffset;
               }
               
               if(!germanCase){
                  curNode.setValue(this.stringSplice(value, offset, 0, String.fromCharCode(e.charCode || e.keyCode)));

                  var textNode = curNode.getTextNode();
                  var newOffset = offset + 1;

                  if (newOffset > textNode.length) {
                     newOffset = textNode.length;
                  }

                  if (dojo.isIE && window.rangy) {
                     try {
                        var newRange = rangy.createRangyRange();
                        newRange.setStart(textNode, newOffset);
                        newRange.setEnd(textNode, newOffset);
                        sel.setSingleRangeEx(newRange);

                        this.saveSelectionIE(sel);
                     } catch (err) {
                        this.printDebug("Setting backup range on Mention Char addition.");
                        sel = rangy.getSelection();
                        var newRange = rangy.createRange();
                        newRange.setStart(textNode, textNode.data.length);
                        newRange.setEnd(textNode, textNode.data.length);
                        sel.removeAllRanges();
                        sel.addRange(newRange);
                        this.saveSelectionIE(sel);
                     }

                  } else {
                     curNode.setTextRange(this.updateRange(textNode, newOffset).nodeRange);
                  }
               }
               
               this.updateTrack(curNode.value);

               // Need to reposition typeahead/scroll incase user is doing @mention near the far most edge of textarea and text wraps to next line.
               // this needs to be optimized eventually so only occurs when it is near the edge rather than every character.
               this.positionTypeahead();
               this.textAreaNode.scrollTop = curNode.domNode.offsetTop - this.textAreaNode.offsetTop;

               // If there are no results, and the user presses SPACE, convert mention to plain text and remove the track.
               if (this.isSpace(e) && (this.getActiveType_IsShowing() && this.getActiveType_Field().results == 0)) {
                  this.convertMentionNodeToText(curNode);
                  this.stopTrack();
               }
               
               if (isTrackedKey) {
                  dojo.publish("lconn/core/mentions/started", [ {
                     editor : this.textAreaNode,
                     node : this._currentNode,
                     cancel : dojo.hitch(this, this.cancelMention)
                  } ]);
               }
            }
         } else if ((e.charCode || e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 36) && e.charCode != 229 || e.keyCode != 229 ) {
            if(this._isTracking) {
               var curSel = this.getSelection();
               var sel = curSel.selection;
               var range = curSel.range;

               // handle end key
               if(e.keyCode == 35 && e.charCode != 35) {
                  this.preventDefault(e);
                  if(e.shiftKey) {
                   range.setEnd(range.startContainer, range.startContainer.data.length);
                 } else {
                    range.setStart(range.startContainer, range.startContainer.data.length);
                    range.setEnd(range.startContainer, range.startContainer.data.length);
                 }
                     sel.removeAllRanges();
                     sel.addRange(range);
                     this.saveSelectionIE(sel);
               // handle home key
               } else if(e.keyCode == 36 && e.charCode != 36) {
                  if(!dojo.isIE) {
                     this.preventDefault(e);
                  }
                  if(e.shiftKey) {
                     range.setStart(range.startContainer, 0);
                     if (dojo.isIE == 8) {
                        range.setStart(range.startContainer, range.startContainer.data.length);
                     }
                  } else {
                        range.setStart(range.startContainer, 1);
                        range.setEnd(range.startContainer, 1);
                  }
                     sel.removeAllRanges();
                     sel.addRange(range);
                     this.saveSelectionIE(sel);
               }
            } else if (!e.ctrlKey && !e.altKey && !e.metaKey && this._currentNode) {
                  this.removeMentionNode(this._currentNode);
                  this._currentNode = null;
            }

            this.displayBizCard(e);

            // Update rangy representation if a non-tracked character is entered.
            if (dojo.isIE && window.rangy && e.keyCode != dojo.keys.SHIFT) {
               setTimeout(dojo.hitch(this, function() {
                  range = sel.getRangeAt(0);
                 sel.refresh();
                  this._rangySelection = sel;
                  this.printDebug("After Key: " + this.getRangeText(range) + " -- Start: " + range.startOffset + "    End: " + range.endOffset);
                  if (!this.getRangeText(range)) {
                     this.handleResumeMention(sel, range);
                  }

                  if (range.startContainer && this._currentNode && !(range.startContainer == this._currentNode.domNode || range.startContainer == this._currentNode.getTextNode())) {
                     if (this._isTracking) {
                        this.convertMentionNodeToText(this._currentNode, true);
                        this.stopTrack();
                     }
                  }

                  if (!this._currentNode && window.LCSemTagMenu && !this.disableBizCard) {
                     LCSemTagMenu.hide();
                  }
               }), 1);
            } else {
               setTimeout(dojo.hitch(this, function() {
                  var curSel = this.getSelection();
                  var range = curSel.range;
                  var originalValue = range.startContainer.data;

                  if(this.replaceBlank && originalValue.indexOf(' ') == 0) {
                  var value = originalValue.replace(' ', '');
                  var offset = range.endOffset - (originalValue.length - value.length);

                     range.startContainer.data = value
                     range.setStart(range.startContainer, offset);
                    range.setEnd(range.startContainer, offset);
                    sel.removeAllRanges();
                    sel.addRange(range);
                  }

                  if (range.startContainer && this._currentNode && !(range.startContainer == this._currentNode.domNode || range.startContainer == this._currentNode.getTextNode())) {
                     if (this._isTracking) {
                        this.convertMentionNodeToText(this._currentNode, true);
                        this.stopTrack();
                     }
                  }

                  if (!this._currentNode && window.LCSemTagMenu && !this.disableBizCard) {
                     LCSemTagMenu.hide();
                  }

                  if (this.getActiveType_IsShowing()) {
                     dojo.attr(this.textAreaNode, "role", "combobox");
                     dojo.attr(this.textAreaNode, "aria-autocomplete", "inline");
                     dojo.attr(this.textAreaNode, "aria-expanded", "true");
                  } else {
                     dojo.attr(this.textAreaNode, "role", "textbox");
                     dojo.removeAttr(this.textAreaNode, "aria-autocomplete");
                     dojo.removeAttr(this.textAreaNode, "aria-activedescendant");
                     dojo.removeAttr(this.textAreaNode, "aria-expanded");
                  }

               }), 50);
            }
         } else if (dojo.isIE && this._wasComposition && this._isTracking) {
            this.preventDefault(e);
            setTimeout(dojo.hitch(this, function() {
               sel.refresh();
               this._rangySelection = sel;
               range = sel.getRangeAt(0);

               var curNode = this._currentNode;
               if (curNode && range.startContainer && range.startContainer.data) {
                  curNode.setValue(curNode.value + range.startContainer.data);
                  range.startContainer.data = "";
                  var textNode = curNode.getTextNode();
                  curNode.setTextRange(this.updateRange(textNode, textNode.length).nodeRange);
                  this.updateTrack(curNode.value);
               }

               this._wasComposition = false;

            }), 50);
         }
         
         this.displayBizCard(e);

         if (dojo.isFF < 4) {
            if (this.textAreaNode.childNodes.length == 0) {
               var t = document.createTextNode('\n');
               this.textAreaNode.appendChild(t);
            }
         }

         if (this.eventHandles["onkeypress"]) {
            setTimeout(dojo.hitch(this, this.eventHandles.onkeypress), 50);
         }
      },

      displayBizCard : function(e) {
         if (this._currentNode) {
            this.printDebug("Current Node:" + this._currentNode);
            try {
               if (isCarded(this._currentNode.linkNode) && !this.disableBizCard) {
                  this.showBizCardHover(e, this._currentNode.linkNode);
               }
            } catch (e) {
               this.printDebug("Failed to show bizcard for Mention");
            }
         } else if (window.LCSemTagMenu && !this.disableBizCard) {
            LCSemTagMenu.hide();
         }
      },

      pasteListener : function(e) {
         // Stop the default event since we already take care of it on ctrl/cmd-v
         if (!dojo.isFF)
            this.preventDefault(e);

         // Webkit does not do a keypress event before the paste
         // this handles the pre-paste logic for that scenario
         if (dojo.isWebKit || dojo.isIE) {
            this.handlePrePaste(e);
         }

         // Handle FF paste event manually since clipboard access on paste
         // is not enabled. Adding support for this is tracked in bugzilla:
         // https://bugzilla.mozilla.org/show_bug.cgi?id=407983
         if (dojo.isFF) {
            var curSel = this.getSelection();
            var sel = curSel.selection;
            var range = curSel.range;

            if (range.startContainer != range.endContainer || range.startOffset != range.endOffset) {
               this.removeSelection(null, range);
               if (range.startContainer != this.textAreaNode) {
                  range.setStartBefore(range.startContainer);
               }
            }

            var pasteSpan = document.createElement("span");
            pasteSpan.id = this.textAreaNode.id + "_pasteSpan";

            range.insertNode(pasteSpan);

            // save the current selection
            this._prePasteSel = sel;
            this._prePasteRange = range;

            if (pasteSpan.nextSibling) {
               range.setEnd(pasteSpan.nextSibling, 0);
            }

            setTimeout(dojo.hitch(this, this.handleFFPaste), 5);
         }

         if (this.eventHandles["onkeypress"]) {
            this.eventHandles.onkeypress();
         }
      },

      // Manually handle re-creating the pasted content as plain text
      // Caveats: Might be a slight flicker especially on slower machines since
      // the normal paste goes through, then the following function converts it
      // back to plain text other than @mention nodes. Also the format of the plain
      // text is not 100% identical to how textarea html elements
      // convert rich to plain text.
      handleFFPaste : function() {
         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;

         var startContainer = this._prePasteRange.startContainer;
         var endContainer = this._prePasteRange.endContainer;

         var startOffset = this._prePasteRange.startOffset;
         if (startContainer == this.textAreaNode && startContainer.childNodes.length > 0) {
            startContainer = this.textAreaNode.childNodes[startOffset];
            startOffset = 0;
         }

         // select pasted text
         range.setStart(startContainer, startOffset);

         var extractedContents = range.extractContents();

         while (startContainer && startContainer != endContainer) {
            var next = startContainer.nextSibling;
            if (startContainer.nodeType != 3 && !this.isAnyMentionsDomNode(startContainer)) {
               this.textAreaNode.removeChild(startContainer);
            }
            startContainer = next;
         }

         var contentNode = document.createTextNode(extractedContents.textContent);
         if (this._prePasteRange.startContainer != this.textAreaNode) {
            this.textAreaNode.insertBefore(contentNode, endContainer);
         } else if (this.textAreaNode.childNodes.length > 0) {
            this.textAreaNode.insertBefore(contentNode, this.textAreaNode.childNodes[this._prePasteRange.startOffset]);
         } else {
            this.textAreaNode.appendChild(contentNode, endContainer);
         }

         if(!this.disableURLPreview) {
             contentNode = this.detectURL(contentNode);
         }

         if (contentNode) {
            range.setStartAfter(contentNode);
            range.setEndAfter(contentNode);
         }

         if (this.eventHandles["onkeypress"]) {
            this.eventHandles.onkeypress();
         }
      },

      postPaste : function() {
         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;
         
         this.textAreaNode.focus();
         this._isPasteFocusLoss = false;

         range.setStart(this._prePasteRange.startContainer, this._prePasteRange.startOffset);
         range.setEnd(this._prePasteRange.endContainer, this._prePasteRange.endOffset);
         sel.removeAllRanges();
         sel.addRange(range);

         if (range.startContainer != range.endContainer || range.startOffset != range.endOffset) {
            this.removeSelection(null, range);
         }

         var pasteTextNode = document.createTextNode(this.tempTextArea.value);

         var curNode = null;
         if (this._isTracking) {
            curNode = this._currentNode;
            value = curNode.value;
            var offset = range.endOffset;

            if (range.startOffset != range.endOffset) {
               this.removeSelection(null, range);
               offset = range.startOffset;
            }

            var text = (dojo.isIE) ? this.tempTextArea.innerText : this.tempTextArea.value;
            curNode.setValue(this.stringSplice(value, offset, 0, text));
            var textNode = curNode.getTextNode();

            var newOffset = offset + text.length;

            if (newOffset > textNode.length) {
               newOffset = textNode.length;
            }

            if (dojo.isIE && window.rangy) {
               var range = rangy.createRangyRange();
               range.setStart(textNode, newOffset);
               range.setEnd(textNode, newOffset);
               sel.setSingleRangeEx(range);
            } else {
               curNode.setTextRange(this.updateRange(textNode, newOffset).nodeRange);
               range = this.updateRange(textNode, newOffset).nodeRange;
            }
            this.updateTrack(curNode.value);

            var tempNode = document.createElement("span");
            range.cloneRange().insertNode(tempNode);
            this.textAreaNode.scrollTop = tempNode.offsetTop - this.textAreaNode.offsetTop;
            tempNode.parentNode.removeChild(tempNode);

            this.saveSelectionIE(sel);

            if (this.tempTextArea.value.length > 100) {
               this.convertMentionNodeToText(this._currentNode);
               this.stopTrack();
            }
         } else {
            if (dojo.isIE) {
               curSel = this.getSelection();
               sel = curSel.selection;
               sel.refresh();
               range = sel.getRangeAt(0);
            }

            range.insertNode(pasteTextNode);
            var node = range.endContainer;

            if (node == this.textAreaNode) {
               var idx = -1;
               if (dojo.isIE && window.rangy) {
                  idx = range.endOffset;
               } else {
                  idx = range.endOffset - 1;
               }

               if (idx < 0) {
                  idx = 0;
               } else if (idx >= this.textAreaNode.childNodes.length) {
                  idx = this.textAreaNode.childNodes.length - 1;
               }

               var focusNode = this.textAreaNode.childNodes[idx];

               var temp = this.detectURL(pasteTextNode);
               if (temp) {
                  focusNode = temp;
               }

               if (focusNode) {
                  if (focusNode.nodeType != 3) {
                     focusNode = this.getTextNode(focusNode);
                  }

                  range.setStart(focusNode, focusNode.data.length);
                  range.setEnd(focusNode, focusNode.data.length);
               }
               // otherwise the range is the node before the pasted content
            } else {
               focusNode = this.getTextNode(node.nextSibling);
               if (focusNode) {
                  range.setStart(focusNode, focusNode.data.length);
                  range.setEnd(focusNode, focusNode.data.length);
               }
            }

            var tempNode = document.createElement("span");
            range.cloneRange().insertNode(tempNode);
            this.textAreaNode.scrollTop = tempNode.offsetTop - this.textAreaNode.offsetTop;
            tempNode.parentNode.removeChild(tempNode);

            sel.removeAllRanges();
            sel.addRange(range);

            this.saveSelectionIE(sel);

            this.displayBizCard(null);
         }

         if (this.eventHandles["onkeypress"]) {
            this.eventHandles.onkeypress();
         }

         this.tempTextArea.value = "";
         dojo.style(this.tempTextArea, {
            visibility : "hidden"
         });
      },

      // Handle removing @mentions from the tracking array when cut occurs
      cutListener : function(e) {
         var curSel = this.getSelection();
         var range = curSel.range;

         if (range.cloneContents) {
            var cutSelection = range.cloneContents();
            dojo.forEach(cutSelection.childNodes, function(node) {
               if (node) {
                  var mentionNode = this.getNodeAttributes(node.id);

                  if (mentionNode) {
                     this._currentNode = (mentionNode == this._currentNode) ? null : this._currentNode;

                     // In IE opaste causes hidden link node text to be revealed.
                     if (dojo.isIE) {
                        if (mentionNode.linkNode) {
                           dojo.query('.x-lconn-userid', mentionNode.linkNode)[0].innerHTML = "";
                        }
                     }
                     this._trackedMentions.splice(dojo.indexOf(this._trackedMentions, mentionNode), 1);
                  }
               }
            }, this);

            cutSelection = null;
         }

         if (this.eventHandles["onkeypress"]) {
            this.eventHandles.onkeypress();
         }
      },

      resetBox : function() {
        if(dojo.isIE && window.rangy){
         try {
            var curSel = this.getSelection();
            var sel = curSel.selection;
            sel.removeAllRanges();
            this.saveSelectionIE(sel);
         } catch(err) {}
        }

         this._trackedMentions.length = 0;
         if (this._isTracking) {
            this.convertMentionNodeToText(this._currentNode, true);
            this.stopTrack();
         }
         this.setShadowText();
      },

      setShadowText : function() {
         this.placeholder = dojo.attr(this.textAreaNode, "placeholder");
         if (this.placeholder) {
            dojo.style(this.textAreaNode, "color", "#666");
            this.setText(this.placeholder);
            if (dojo.isWebKit)
               dojo.style(this.textAreaNode, "-webkit-user-select", "none");
         }
      },

     setText : function(text) {
        // cleans all the content of the text area
        dojo.empty(this.textAreaNode);

        this.MENTION_REGEX.lastIndex = 0;
        var match = this.MENTION_REGEX.exec(text);
        if(match == null) {
           if (dojo.isIE == 8) {
              dojo.place(document.createTextNode('\u200B'), this.textAreaNode);
           }
           dojo.place(document.createTextNode(text), this.textAreaNode);
           return;
        }

        this.MENTION_REGEX.lastIndex = 0;
        while(true) {
           var idx1 = this.MENTION_REGEX.lastIndex;
           var match = this.MENTION_REGEX.exec(text);
           var idx2 = match != null ? match.index : text.length;

           if(idx2 > idx1) {
              var s = text.substring(idx1, idx2);
              var el = document.createTextNode(s);
              var curSel = this.getSelection();
              var sel = curSel.selection;
              var range = curSel.range;
              range.insertNode(el);
              range.setStartAfter(el);
              sel.removeAllRanges();
              sel.addRange(range);
           }

           if(match == null) {
              break;
           } else {
               var hasSymbol = false;
               var usrName = match[1];
              if(usrName.indexOf(this.activatorChar) == 0) {
                  usrName = usrName.substring(1);
                 hasSymbol = true;
              }
              var usrId = match[2];
              this.addTrack();
              var currentNode = this._currentNode;
              this.completeMention({name: usrName, userid: usrId});
              if(!hasSymbol) {
                  currentNode.removeSymbol();
              }
           }
        }
     },

      blurListener : function(e) {
         dojo.publish("lconn/core/mentions/blur");
         this.setShadowText();
         this.setAriaLabel(this.placeholder);

         if (this._isTracking && !this._stopBlur) {
            var activeElementId = document.activeElement.id;
            var typeaheadPopup = this.getActiveType_Field() ? this.getActiveType_Popup() : null;
            var popupId = "";
            if (typeaheadPopup) {
               if (dojo.isIE) {
                  dojo.removeClass(typeaheadPopup.domNode.parentNode, "lconnTypeAhead");
               }

               popupId = typeaheadPopup ? typeaheadPopup.id : "";
               // Don't close menu in IE if active element is not popup
               if (dojo.isIE && activeElementId != popupId
                     // Close in all other browsers
                     || !dojo.isIE && !dojo.isChrome) {
                  this.closeTypeahead();
               }
            }
         }

         this._stopBlur = false;

         if (this.eventHandles["onblur"]) {
            this.eventHandles.onblur();
         }
      },

      focusListener : function(e) {
         dojo.publish("lconn/core/mentions/focus", [ this._isTracking ]);
         if (dojo.isWebKit)
            dojo.style(this.textAreaNode, "-webkit-user-select", "auto");
         dojo.style(this.textAreaNode, "color", "#000");
         if (this.placeholder) {
            if (this.placeholder == this.getText()) {
               this.setText("");
               setTimeout(dojo.hitch(this, function() {
                  this.getSelection()
               }), 5);
               // fix for webkit issue where clicking on "placeholder text" + removing it programmatically,
               // causes the focus to not move properly.
               if (dojo.isWebKit) {
                  var range = document.createRange();
                  range.selectNodeContents(this.textAreaNode);
                  var sel = this.getSelection().selection;
                  sel.removeAllRanges();
                  sel.addRange(range);
               }

            }
         }
         if(dojo.isIE == 8){
            if (this.textAreaNode.firstChild && this.textAreaNode.firstChild.data == '') {
                this.textAreaNode.firstChild.data = '\u200B';
            }
            this.preventDefault(e);
         }
         var curSel = this.getSelection();
         var sel = curSel.selection;
         var range = curSel.range;

         if ((dojo.isWebKit) && this.textAreaNode.childNodes.length == 0) {
            var t = document.createTextNode('\u200B');
            this.textAreaNode.appendChild(t);
            range.setStart(t, 1);
            range.setEnd(t, 1);
            sel.removeAllRanges();
            sel.addRange(range);
            this.saveSelectionIE(sel);
         }

         if (!this._isPasteFocusLoss) {
            this.handleResumeMention(sel, range);
         }

         var start = range.startContainer;
         if(dojo.isIE == 8 && start.previousSibling && start.previousSibling.tagName == "SPAN" && 
               (start.previousSibling.className.indexOf('vcard') != -1)){
            start = start.previousSibling;
         }else{
            while (start && start.parentNode && start.parentNode != this.textAreaNode) {
               start = start.parentNode;
            }
         }
         mentionNode = this.getNodeAttributes(start.id);

         if (mentionNode) {
            this._currentNode = mentionNode;
         }else{
            if(dojo.isIE){
               dojo.forEach(this.textAreaNode.childNodes, function(node) {
                  if(node.tagName == "SPAN"){
                     mentionNode = node;
                  }
               });
            this._currentNode = mentionNode;
            }
         }

         if (this._currentNode) {
            // force focus back to node whose bizcard was opened
            if (this._activeBizCard && !dojo.isIE) {
               // need to delay because bizcard code sets focus back first, this can
               // occur incorrectly depending on the browser
               setTimeout(dojo.hitch(this, function() {
                  var curSel = this.getSelection();
                  var sel = curSel.selection;
                  var range = curSel.range;

                  var contentNode = this.getTextNode(this._currentNode.domNode);
                  if (contentNode) {
                     if (!dojo.isIE) {
                        range.setStart(contentNode, 0);
                        range.setEnd(contentNode, contentNode.data.length);
                     } else {
                        range.selectNode(contentNode);
                     }
                  }
                  sel.removeAllRanges();
                  sel.addRange(range);
                  this._activeBizCard = false;
                  try {
                     if (this._currentNode && isCarded(this._currentNode.linkNode) && !this.disableBizCard) {
                        this.showBizCardHover(e, this._currentNode.linkNode);
                     }
                  } catch (e) {
                     this.printDebug("Failed to show bizcard for Mention");
                  }
               }), 5);
            }else if(dojo.isIE==8){
               //IE8 fix to move focus to last typed mention
               var t = document.createTextNode('\u200B');
               this.textAreaNode.appendChild(t);
               range.setStart(t, 1);
               range.setEnd(t, 1);
               sel.removeAllRanges();
               sel.addRange(range);
               this.saveSelectionIE(sel);
               if (!this._isTracking) 
                  this._currentNode = null;
            }
         } else if (window.LCSemTagMenu && !this.disableBizCard) {
            LCSemTagMenu.hide();
         } else if (dojo.isIE && this.textAreaNode.innerHTML == '') {
            this.setText('');
         }

         if (dojo.isFF < 4) {
            if (this.textAreaNode.childNodes.length == 0) {
               var t = document.createTextNode('\n');
               this.textAreaNode.appendChild(t);
            }
         }

         if (this.eventHandles["onfocus"]) {
            this.eventHandles.onfocus();
         }
      },

      /**
       * Get a keypress for the typeahead. This now delegates to a function mixed in
       * that's relevent to the environment and typeahead used.
       */
      selectTypeaheadOption : function() {
        if (this.handleTypeaheadKeyInput)
           this.handleTypeaheadKeyInput.apply(this, arguments);
      },

      safariNodeFix : function(focusNode) {
         curSel = this.getSelection();
         range = curSel.range;
         sel = curSel.selection;

         this.textAreaNode.normalize();

         if (focusNode) {
            if (focusNode.nodeType != 3) {
               focusNode = this.getTextNode(focusNode);
            }

            var length = Math.min(focusNode.length, focusNode.data.length);
            if (length < 0) {
               range.selectNodeContents(this.textAreaNode);
               if (this.textAreaNode.childNodes.length == 0) {
                  this.textAreaNode.appendChild(document.createElement("br"));
               }
            } else {
               range.setStart(focusNode, length);
               range.setEnd(focusNode, length);
            }
         } else {
            range.selectNodeContents(this.textAreaNode);
            if (this.textAreaNode.childNodes.length == 0) {
               this.textAreaNode.appendChild(document.createElement("br"));
            }
         }
         sel.removeAllRanges();
         sel.addRange(range);
      },

      getMentions : function() {
         return this._trackedMentions;
      },

      /**
       * Function to clean up the MentionsHelper on destruction.
       */
      cleanUp: function() {
        if (this._registeredTypes) {
           dojo.forEach(this._registeredTypes, function(item) {
              if (item) {
                 item.cleanUp();
              }
           });
        }
      }
   });

})(lconn.core.util.text);
