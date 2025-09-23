define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/has"
], function (dojo, declare, lang, domAttr, domStyle, has) {

	/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */
	
	/**
	 * Mixin for key handling in the mentions helper
	 *
	 * @mixin ic-core.widget.mentions.MentionsKeyHandlers
	 */
	var MentionsKeyHandlers = declare("lconn.core.widget.mentions.MentionsKeyHandlers", null, /** @lends ic-core.widget.mentions.MentionsKeyHandlers.prototype */ {
	
	   hasNoKeyModifiers : function(e) {
	      return !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey;
	   },
	
	   canActivate : function(preChar) {
	      var code = preChar.charCodeAt(0);
	      return !this._isTracking && (code == 32 || code == 160 || preChar == "" || preChar == '\u200B' || preChar == 'NaN');
	   },
	
	   handleActivatorKey : function(e) {
	      var curSel = this.getSelection();
	
	      if(has("ie")==8){
	        if (curSel.range.startOffset==0){
	           try {
	           curSel.selection.refresh();
	           curSel.range.refresh();
	           }
	           catch(err){}
	        }
	      }
	
	      var sel = curSel.selection;
	      var range = curSel.range;
	      var startOffset = range.startOffset;
	      var endOffset = range.endOffset;
	      var textArea = this.textAreaNode;
	      var nodes = textArea.childNodes;
	
	      if (range.startContainer != range.endContainer || range.startOffset != range.endOffset) {
	         this.removeSelection(null, range);
	      }
	
	      if (range.startContainer == textArea && nodes.length > 0) {
	         var selectNode = (startOffset > 0) ? nodes[startOffset - 1] : nodes[0];
	
	         if (selectNode.nodeName == "BR") {
	            var next = selectNode.nextSibling;
	            if (next && next.nodeType != 3) {
	               selectNode = textArea.insertBefore(document.createTextNode(""), next);
	            } else {
	               selectNode = next;
	            }
	         }
	         if (selectNode) {
	            range = this.updateRange(selectNode, selectNode.data.length).nodeRange;
	            startOffset = range.startOffset;
	            sel.removeAllRanges();
	            sel.addRange(range);
	         }
	      }
	
	      var value = this.getRangeText(range);
	      if (e.type == "compositionupdate") {
	         value = value.slice(0, value.length - 1);
	      }
	      var preChar = "";
	      if (value && !(has("ie") && value == '\u200b')) {
	         preChar = value.substring(startOffset - 1, startOffset);
	      }
	      else {
	         var curNode = this.skipBlankSpaces(range.startContainer);
	         if (curNode && curNode.nodeType == 3)
	            preChar = curNode.data.substring(curNode.data.length - 1);
	      }
	
	      // Ignore @ if part of an email address
	      if (this.canActivate(preChar)) {
	         this.preventDefault(e);
	         this.addTrack();
	         this.saveSelectionIE(sel);
	
	         return true;
	      } else {
	         return false;
	      }
	   },
	
	   isLeftArrow : function(e) {
	      return e.charCode == 0 && e.keyCode == dojo.keys.LEFT_ARROW;
	   },
	
	   moveToPrevious : function(range, node) {
	      var startOffset = range.startOffset;
	      var previousSibling = null;
	
	      if (node != this.textAreaNode) {
	         if (this.isAnyMentionsDomNode(range.startContainer)) {
	            this._currentNode = this.getNodeAttributes(range.startContainer.id);
	            if (has("ie") && window.rangy) {
	               range.selectNode(range.startContainer);
	            } else {
	               var temp = node.getElementsByTagName('a')[0].firstChild;
	               range.setStart(temp, 0);
	               range.setEnd(temp, temp.data.length);
	            }
	            // If the node is a TextNode and its parent is the TextAreaNode, we know
	            // that this node can't be a mention Node.
	         } else if (node && node.nodeName == "BR") {
	            previousSibling = node.previousSibling;
	         } else if (node && node.nodeType == 3 && node.parentNode == this.textAreaNode) {
	            var IECond = dojo.isIE ? (!node.previousSibling) || (node.previousSibling && !this.isMentionsDomNode(node.previousSibling)) : true;
	            if (IECond && (startOffset == 0 || node.data == '' || node.data == '\u200B')) {
	               previousSibling = this.skipBlankSpaces(node.previousSibling);
	               if (previousSibling && previousSibling.nodeName == "BR") {
	                  previousSibling = previousSibling.previousSibling;
	               }
	            } else {
	               var newOffset = startOffset - 1;
	               range.setStart(range.startContainer, newOffset);
	               range.setEnd(range.startContainer, newOffset);
	
	               if (has("ie") > 7 && newOffset == 0) {

	                  if (has("ie") == 8) {
	                     var tempNode = node;
	                     // skip all the blank spaces introduced
	                     while (tempNode.previousSibling && tempNode.previousSibling.nodeType == 3) {
	                        tempNode = tempNode.previousSibling;
	                     }
	                     // update the node if the previous one is a mention
	                     if (tempNode.previousSibling && this.isMentionsDomNode(tempNode.previousSibling)) {
	                        node = tempNode.previousSibling;
	                     }
	                  }

	                  if (node.previousSibling && this.isMentionsDomNode(node.previousSibling)) {
	                      node = node.previousSibling;
	                  }

	                  range = this.moveToPrevious(range, node);
	               }
	            }
	         } else if (node && node.nodeType == 3 && node.parentNode) {
	            var newNode = this.getNodeAttributes(node.parentNode.parentNode.id);
	            if (this.isAnyMentionsDomNode(node.parentNode.parentNode) && this._currentNode != newNode) {
	               this._currentNode = newNode;
	               if (has("ie") && window.rangy) {
	                  if (has("ie") > 7) {
	                     var textNode = this.getTextNode(newNode.domNode);
	                     range.setStart(textNode, 0);
	                     range.setEnd(textNode, textNode.data.length);
	                  } else {
	                     range.selectNode(newNode.domNode);
	                  }
	               } else {
	                  var temp = newNode.domNode.getElementsByTagName('a')[0].firstChild;
	                  range.setStart(temp, 0);
	                  range.setEnd(temp, temp.data.length);
	               }
	            } else {
	               var start = node;
	               var previousSibling = start ? start.previousSibling : null;
	               while (!previousSibling && start) {
	                  if (start == this.textAreaNode)
	                     break;
	                  start = start.parentNode;
	                  previousSibling = start ? start.previousSibling : null;
	               }
	            }
	         } else {
	            var start = node;
	            var previousSibling = start ? start.previousSibling : null;
	            while (!previousSibling && start) {
	               if (start == this.textAreaNode)
	                  break;
	               start = start.parentNode;
	               previousSibling = start ? start.previousSibling : null;
	            }
	         }
	
	         if (previousSibling) {
	            if (previousSibling.nodeType == 3) {
	               this._currentNode = null;
	               range.setStart(previousSibling, previousSibling.data.length);
	               range.setEnd(previousSibling, previousSibling.data.length);
	            } else if (previousSibling.nodeName == "BR") {
	               range = this.moveToPrevious(range, previousSibling);
	            } else {
	               // nodetype = Element (probably the SPAN for the mention)
	               if (this.isAnyMentionsDomNode(previousSibling)) {
	                  // previous sibling contains a mention...
	                  this._currentNode = this.findTrackedMentionById(previousSibling.id);
	                  if (has("ie") && window.rangy) {
	                     var textNode = previousSibling.className == "vcard" ? this.skipBlankSpaces(node.previousSibling) : this.getTextNode(node);
	                     // advance to the next sibling for SC envs support
	                     range.setStartBefore(textNode.nextSibling, 0);
	                     range.setEndBefore(textNode.nextSibling, 0);
	                  } else {
	                     if (node.previousSibling.className == "vcard") {
	                        previousSibling = node.previousSibling;
	                     } else {
	                        previousSibling = node;
	                     }
	                     range.setStartBefore(previousSibling, 0);
	                     range.setEndBefore(previousSibling, 0);
	                     previousSibling = node;
	                  }
	               }
	            }
	         }
	      } else if (!has("ie")) {
	         var prevNode = null;
	         if (range.startOffset == range.endOffset) {
	            var length = this.textAreaNode.childNodes.length;
	            if (range.startOffset == 0) {
	               prevNode = this.textAreaNode.childNodes[0];
	            } else {
	               if (range.endOffset >= length) {
	                  prevNode = this.textAreaNode.childNodes[length - 1];
	                  if (prevNode.nodeType == 3) {
	                     range.setStart(prevNode, prevNode.data.length);
	                     range.setEnd(prevNode, prevNode.data.length);
	                  }
	               } else {
	                  prevNode = this.textAreaNode.childNodes[range.endOffset - 1];
	               }
	            }
	         } else {
	            prevNode = this.textAreaNode.childNodes[range.startOffset];
	         }
	
	         if (prevNode)
	            range = this.moveToPrevious(range, prevNode);
	
	      }
	
	      return range;
	   },
	
	   moveToNext : function(range, node) {
	      var startOffset = range.startOffset;
	      var nextSibling = null;
	
	      if (node != this.textAreaNode) {
	         if (this.isAnyMentionsDomNode(range.startContainer)) {
	            this._currentNode = this.getNodeAttributes(range.startContainer.id);
	            if (has("ie") && window.rangy) {
	               range.selectNode(range.startContainer);
	            } else {
	               var temp = node.getElementsByTagName('a')[0].firstChild;
	               range.setStart(temp, 0);
	               range.setEnd(temp, temp.data.length);
	            }
	            // If the node is a TextNode and its parent is the TextAreaNode, we know
	            // that this node can't be a mention Node.
	         } else if (node && node.nodeName == "BR") {
	            nextSibling = node.nextSibling;
	         } else if (node && node.nodeType == 3 && node.parentNode == this.textAreaNode) {
	            if (startOffset == node.data.length || node.data == '' || node.data == '\u200B') {
	               nextSibling = node.nextSibling;
	
	               while (nextSibling && nextSibling.nodeType == 3 && (nextSibling.data == '' || nextSibling.data == '\u200B')) {
	                  nextSibling = nextSibling.nextSibling;
	               }
	
	               if (nextSibling && nextSibling.nodeName == "BR") {
	                  nextSibling = nextSibling.nextSibling;
	               }
	            } else {
	               range.setStart(range.startContainer, startOffset + 1);
	               range.setEnd(range.startContainer, startOffset + 1);
	            }
	         } else if (node && node.nodeType == 3 && node.parentNode) {
	            var newNode = this.getNodeAttributes(node.parentNode.parentNode.id);
	            if (this.isAnyMentionsDomNode(node.parentNode.parentNode) && this._currentNode != newNode) {
	               this._currentNode = newNode;
	               if (has("ie") && window.rangy) {
	                  range.selectNode(newNode.domNode);
	               } else {
	                  var temp = newNode.domNode.getElementsByTagName('a')[0].firstChild;
	                  range.setStart(temp, 0);
	                  range.setEnd(temp, temp.data.length);
	               }
	            } else {
	               var start = node;
	               var nextSibling = start ? start.nextSibling : null;
	               while (start && start.parentNode != this.textAreaNode) {
	                  start = start.parentNode;
	                  nextSibling = start ? start.nextSibling : null;
	               }
	            }
	         } else {
	            var start = node;
	            var nextSibling = start ? start.nextSibling : null;
	            while (start && start.parentNode != this.textAreaNode) {
	               start = start.parentNode;
	               nextSibling = start ? start.nextSibling : null;
	            }
	         }
	
	         if (nextSibling) {
	            if (nextSibling.nodeType == 3) {
	               this._currentNode = null;
	               var parent = node.parentNode;
	               var isMentionNode = false;
	               if (has("webkit") && parent && parent.parentNode && this.isAnyMentionsDomNode(parent.parentNode)) {
	                  isMentionNode = true;
	               }
	               var pos = (nextSibling.data.charAt(0) == '\u200B' || (has("webkit") && !isMentionNode)) ? 1 : 0;
	               range.setStart(nextSibling, pos);
	               range.setEnd(nextSibling, pos);
	            } else if (nextSibling.nodeName == "BR") {
	               range = this.moveToNext(range, nextSibling);
	            } else {
	               if (this.isAnyMentionsDomNode(nextSibling)) {
	                  this._currentNode = this.getNodeAttributes(nextSibling.id);
	                  if (has("ie") && window.rangy) {
	                     if (has("ie") > 7) {
	                        var textNode;
	                        if(node.nextSibling.className == "vcard") {
	                           textNode = this.getTextNode(node.nextSibling);
	                        } else {
	                           textNode = this.getTextNode(node);
	                        }
	                        range.setStartAfter(textNode, 0);
	                        range.setEndAfter(textNode, 0);
	                        textNode = this.getTextNode(node);
	                     } else {
	                        range.selectNode(nextSibling);
	                     }
	                  } else {
	                     if (node.nextSibling.className == "vcard") {
	                        nextSibling = node.nextSibling;
	                     } else {
	                        nextSibling = node;
	                     }
	                     range.setStartAfter(nextSibling, 0);
	                     range.setEndAfter(nextSibling, 0);
	                     nextSibling = node;
	                  }
	               }
	            }
	         }
	      } else if (!has("ie")) {
	         var nextNode = null;
	         var length = this.textAreaNode.childNodes.length;
	         if (range.endOffset >= length) {
	            nextNode = null;
	         } else {
	            var nextIndex = range.endOffset - 1;
	            if (nextIndex > 0) {
	               nextNode = this.textAreaNode.childNodes[nextIndex];
	            } else {
	               nextNode = this.textAreaNode.childNodes[0];
	               range.setStart(nextNode, 0);
	               range.setEnd(nextNode, 0);
	            }
	         }
	
	         if (nextNode)
	            range = this.moveToNext(range, nextNode);
	      }
	
	      return range;
	   },
	
	   handleLeftArrowMain : function(e) {
	      if (!e.shiftKey && !e.ctrlKey) {
	         this.preventDefault(e);
	         var curSel = this.getSelection();
	         var sel = curSel.selection;
	         var range = curSel.range;
	
	         if (!range.collapsed) {
	            // if shift key isn't held down, collapse the selection to the start offset.
	            if (has("ff")) {
	               sel.collapseToStart();
	            }
	
	            range.collapse(true);
	         }
	
	         var origValue = "";
	         var value = "";
	         if (range.startContainer.nodeType == 3) {
	            origValue = range.startContainer.data;
	            value = origValue.replace('/200', '');
	         }
	         var startOffset = range.startOffset - (origValue.length - value.length);
	         var endOffset = range.endOffset - (origValue.length - value.length);
	
	         // Handle left arrow within a tracked node,
	         // stop the track if user left arrows out of the mention.
	         if (this._isTracking) {
	            var curTextNode = this._currentNode.getTextNode();
	            var curNodeRange = range.cloneRange();
	            curNodeRange.setStart(curTextNode, 1);
	            curNodeRange.setEnd(curTextNode, curTextNode.data.length);
	
	            compareStartPoints = range.compareBoundaryPoints(Range.START_TO_START, curNodeRange);
	            compareEndPoints = range.compareBoundaryPoints(Range.END_TO_END, curNodeRange);
	
	            //RTC 103491 - Functionality removed which disabled an @mention when the cursor moved
	            //          over the @ symbol. See comment 3 in the defect for reasoning.
	
	            if (compareStartPoints != 0) {
	//               var newNode = this.convertMentionNodeToText(this._currentNode, true);
	//               this.stopTrack();
	//               range = this.rangeMoveToNodeStart(newNode, range);
	//            } else {
	               range.setStart(range.startContainer, startOffset - 1);
	               range.setEnd(range.endContainer, endOffset - 1);
	            }
	
	            // Handle if caret is at left most position of a node
	         } else {
	            range = this.moveToPrevious(range, range.startContainer);
	         }
	
	         if (has("ie") && window.rangy) {
	            sel.setSingleRangeEx(range);
	         } else {
	            sel.removeAllRanges();
	            sel.addRange(range);
	         }
	
	         this.saveSelectionIE(sel);
	         this.getSelection();
	      } else if (has("ie")) {
	         setTimeout(lang.hitch(this, function() {
	            var curSel = this.getSelection();
	            curSel.selection.refresh();
	            this._rangySelection = curSel.selection;
	         }, 50));
	      }
	   },
	
	   isRightArrow : function(e) {
	      return e.charCode == 0 && e.keyCode == dojo.keys.RIGHT_ARROW;
	   },
	
	   handleRightArrowMain : function(e) {
	      if (!e.shiftKey && !e.ctrlKey) {
	         this.preventDefault(e);
	         var curSel = this.getSelection();
	         var sel = curSel.selection;
	         var range = curSel.range;
	
	         if (!range.collapsed) {
	            // if shift key isn't held down, collapse the selection to the start offset.
	            if (has("ff")) {
	               sel.collapseToEnd();
	            }
	
	            range.collapse(false);
	         }
	
	         var origValue = "";
	         var value = "";
	         if (range.startContainer.nodeType == 3) {
	            origValue = range.startContainer.data;
	            value = origValue.replace('/200', '');
	         }
	         var startOffset = range.startOffset - (origValue.length - value.length);
	         var endOffset = range.endOffset - (origValue.length - value.length);
	
	         // if shift key isn't held down, collapse the selection to the start offset.
	         if (!e.shiftKey) {
	            range.collapse(true);
	         }
	
	         // Handle left arrow within a tracked node,
	         // stop the track if user left arrows out of the mention.
	         if (this._isTracking) {
	            var curTextNode = this._currentNode.getTextNode();
	            var curNodeRange = range.cloneRange();
	            curNodeRange.setStart(curTextNode, 0);
	            curNodeRange.setEnd(curTextNode, curTextNode.data.length);
	
	            compareStartPoints = range.compareBoundaryPoints(Range.START_TO_START, curNodeRange);
	            compareEndPoints = range.compareBoundaryPoints(Range.END_TO_END, curNodeRange);
	
	            //RTC 103491 - Functionality removed which disabled an @mention when the cursor moved
	            //          over the @ symbol. See comment 3 in the defect for reasoning.
	
	            if (compareEndPoints != 0) {
	//               var newNode = this.convertMentionNodeToText(this._currentNode);
	//               range = null;
	//               this.stopTrack();
	//            } else {
	               range.setStart(range.startContainer, startOffset + 1);
	               range.setEnd(range.endContainer, endOffset + 1);
	            }
	            // Handle if caret is at left most position of a node
	         } else {
	            range = this.moveToNext(range, range.startContainer);
	         }
	
	         if (range) {
	            sel.removeAllRanges();
	            sel.addRange(range);
	
	            this.saveSelectionIE(sel);
	            this.getSelection();
	         }
	      } else if (has("ie")) {
	         setTimeout(lang.hitch(this, function() {
	            var curSel = this.getSelection();
	            curSel.selection.refresh();
	            this._rangySelection = curSel.selection;
	         }, 50));
	      }
	   },
	
	   isEscape : function(e) {
	      return (e.charCode == 0 && e.keyCode == dojo.keys.ESCAPE) || (has("ie") > 8 && e.charCode == dojo.keys.ESCAPE && e.keyCode == dojo.keys.ESCAPE)
	   },
	
	   handleEscape : function(e) {
	      if (this._isTracking) {
	         this.convertMentionNodeToText(this._currentNode);
	         this.stopTrack(e);
	
	         e.cancelBubble = true;
	         if (e.stopPropagation) {
	            e.stopPropagation();
	         }
	         this.cancelEvent(e);
	      }
	   },
	
	   isTab : function(e) {
	      return e.charCode == 0 && e.keyCode == dojo.keys.TAB;
	   },
	
	   handleTab : function(e) {
	      if (this._isTracking) {
	         // this.preventDefault(e); //RTC 101299 Prevented tab from behaving naturally in the browser
	         // this.selectTypeaheadOption();
	      }
	   },
	
	   isBoldHotkey : function(e) {
	      return e.keyCode == 66 && (e.ctrlKey || e.metaKey);
	   },
	
	   isItalicsHotkey : function(e) {
	      return e.keyCode == 73 && (e.ctrlKey || e.metaKey);
	   },
	
	   isUnderlineHotkey : function(e) {
	      return e.keyCode == 85 && (e.ctrlKey || e.metaKey);
	   },
	
	   isPasteHotkey : function(e) {
	      return (e.keyCode == 86 || e.keyCode == 118 || e.charCode == 86 || e.charCode == 118) && (e.ctrlKey || e.metaKey) || (e.shiftKey && e.keyCode == 45);
	   },
	
	   handlePrePaste : function(e) {
	        if (has("ie")) { //RTC 96636 & 110143 - Fixes Ctrl + V pasting issue in IE
	      var emptyBeforePaste = (this.textAreaNode.innerText == "");
	      this.preventDefault(e);
	      this.tempTextArea.value = clipboardData.getData("Text");
	      if (emptyBeforePaste) {
	         this.setText("");
	         if (has("ie") == 8) this._rangySelection = null;
	      }
	     }
	
	      var curSel = this.getSelection();
	      var sel = curSel.selection;
	      var range = curSel.range;
	
	      if ((has("webkit") || has("ie")) && this.textAreaNode.childNodes.length == 0) {
	         var t = document.createTextNode('\u200B');
	         this.textAreaNode.appendChild(t);
	         range.setStart(t, 1);
	         range.setEnd(t, 1);
	         sel.removeAllRanges();
	         sel.addRange(range);
	         this.saveSelectionIE(sel);
	      }
	
	      // save the current selection
	      this._prePasteSel = sel;
	      this._prePasteRange = range;
	
	      // On OSX WebKit, the focus cannot be moved since this is
	      // invoked from the onpaste event, so we just use the clipboardData
	      // directly.
	      if (has("webkit")) {
	         this.tempTextArea.value = e.clipboardData ? e.clipboardData.getData('text/plain') : "";
	      } else if (!has("ie")) {
	         domStyle.set(this.tempTextArea, {
	            visibility : "visible"
	         });
	
	         // focus the hidden temp TextArea so paste behaves consistently
	         this._isPasteFocusLoss = true;
	         this.tempTextArea.focus();
	      }
	
	      if (this._postPasteTimeout) {
	         clearTimeout(this._postPasteTimeout);
	         this._postPasteTimeout = null;
	      }
	      this._postPasteTimeout = setTimeout(lang.hitch(this, this.postPaste), 50);
	   },
	
	   isBackspace : function(e) {
	      return e.charCode == 0 && e.keyCode == dojo.keys.BACKSPACE;
	   },
	
	   handleBackspace : function(e) {
	     var curSel = this.getSelection();
	     var sel = curSel.selection;
	     var range = curSel.range;
	     var curNode = range.startContainer;
	
	     this.convertMentionNodeToText(this._currentNode);
	     this.stopTrack(e);
	     this.closeTypeahead();
	
	     e.cancelBubble = true;
	     if (e.stopPropagation) {
	       e.stopPropagation();
	     }
	     this.cancelEvent(e);
	   },
	
	   isDelete : function(e) {
	      return (e.charCode == 0 && e.keyCode == dojo.keys.DELETE) || (has("mac") && e.ctrlKey && (e.charCode == 100 || e.keyCode == 68)) || (e.keyCode == 46 && e.keyChar != '.' && !(has("ie") == 8));
	   },
	
	   isSpace : function(e) {
	      return (e.charCode || e.keyCode) == dojo.keys.SPACE && this._isTracking;
	   },
	
	   isCtrlEnter : function(e) {
	      return (e.ctrlKey && e.charCode == 0 && e.keyCode == dojo.keys.ENTER) || e.keyCode == 10;
	   },
	
	   isEnter : function(e) {
	      return !e.ctrlKey && !e.metaKey && ((e.charCode == 0 && e.keyCode == dojo.keys.ENTER) || (has("ie") > 8 && e.charCode == dojo.keys.ENTER && e.keyCode == dojo.keys.ENTER));
	   },
	
	   isTrackedKey : function(e) {
	      return this._isTracking && ((e.ctrlKey && e.altKey && e.charCode != 0) || (!e.ctrlKey && !e.metaKey && !(e.altKey && e.keyCode == 18) && !(e.shiftKey && e.keyCode == 16) && (e.charCode != 0 || e.data != null))) && !(e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 36);
	   },
	
	   isUpDownArrow : function(e) {
	      return e.charCode == 0 && (e.keyCode == dojo.keys.UP_ARROW || e.keyCode == dojo.keys.DOWN_ARROW);
	   },
	
	   handleUpDownArrow : function(e) {
	      if (this._isTracking && e) {
	         this.preventDefault(e);
	         if (this.getActiveType_IsShowing()) {
	            this.getActiveType_Field()._onKey(e);
	            var highlighted = this.getActiveType_Popup().getHighlightedOption();
	            // AVT: Fixes JAWS issues with the typeahead listbox (wotk item #106483)
	            highlighted && domAttr.set(this.textAreaNode, "aria-activedescendant", highlighted.id);
	         }
	      } else if (has("ie")) {
	         setTimeout(lang.hitch(this, function() {
	            var curSel = this.getSelection();
	            curSel.selection.refresh();
	            this._rangySelection = curSel.selection;
	         }, 50));
	      }
	   }
	});
	
	return MentionsKeyHandlers;
});
