/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/kernel",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/has",
	"dojo/topic",
	"dojo/keys",
	"dijit/form/ComboBox",
	"dijit/focus",
	"dijit/form/_TextBoxMixin",
	"dijit/_ComboBoxMenu"
], function (dojo, array, kernel, declare, lang, windowModule, dom, domAttr, domConstruct, has, topic, keys, ComboBox, focusUtils, _TextBoxMixin, _ComboBoxMenu) {

	/*
	author: Ryan Silva
	Documentation: https://w3.webahead.ibm.com/w3ki/display/conndev/Dojo+TypeAhead+Widget
	
	*/
	
	// INSERT: Also changed the parent ComboBox to pass the "orient" argument down to the popup window, so that callers
	//         can specify that the menu should be aligned to the right edge of the input box.
	var TypeAhead = declare(
	    "com.ibm.social.incontext.typeahead.legacy.TypeAhead",
	    ComboBox,
	    {
	        //override
	        formatItem: function(item, html) {
	            if ( !html ) {
	                return item;
	            } else {
	                return item = item.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
	            }
	        },
	        formatItemHtml: function(item) {
	           return this.formatItem(item, true);
	        },
	        
	        // minChars: number
	        //      The number of characters that need to be typed before doing a search
	        minChars: 1,
	        
	        hasDownArrow: false,
	        
	        //multipleValues: bool
	        //      Sets whether or not this type-ahead should support multiple values.
	        //      If true, then typing a token (usually comma) will cause the type-ahead
	        //      to reset and begin searching for a new name. 
	        multipleValues: true,
	        
	        // token: string
	        //      The character to split all the names by in the text box.
	        //      Only used if multipleValues is true.
	        token: '',
	        
	        selectOnTab: true,
	        
	        autoSearchKeys: [keys.DOWN_ARROW],
	        autoSearchChars: [],
	        autoSelectKeys: [],
	        autoSelectChars: [],
	        autoCompleteAnySelectChar: false,
	        hintText: null,
	
	        hideEmptyResults: false,
	
	        autoComplete: false,
	        
	        // Addition to undo http://bugs.dojotoolkit.org/ticket/6220
	        postCreate: function(){
	           var focusNode = this.focusNode;
	           var domNode = this.domNode;
	           var dommyDivId = this.id + "_dommyDiv";
	           if (!dom.byId(dommyDivId)){
	              var div = domConstruct.create("div", {id: dommyDivId, role: "textbox", style:{display: "none"}});
	              windowModule.body().appendChild(div);
	           }
	           // Undo setting fontFamily, since we don't have an drop-down arrow to worry about
	           var fontFamily = focusNode.style.fontFamily || "";
	        // Certain LotusLive apps use dojo 1.5 which requires that "this.downArrowNode" be set
	           if (!this.downArrowNode) {
	              this.downArrowNode = domNode.parentNode.appendChild(domConstruct.create("div", {style:{display: "none"}}));
	           }
	           domNode.setAttribute("aria-owns", dommyDivId);
	           domNode.setAttribute("role", "combobox");
	           this.inherited(arguments);
	           focusNode.style.fontFamily = fontFamily;
	           this.updateHintText();
	           
	           //fix defect 88769: prevent ESC key on typeahead from affecting ShareBoxDialog
	           this.subscribe("lconn/core/typeahead/open", function() {
	              if (lang.getObject("ibm.connections.sharedialog")) {
	                 ibm.connections.sharedialog.preventCloseOnEsc();
	              }
	           });
	           this.subscribe("lconn/core/typeahead/close", function() {
	              //set timeout to avoid running sequence issue in IE
	              setTimeout(function(){
	                 if (lang.getObject("ibm.connections.sharedialog")) {
	                     ibm.connections.sharedialog.enableCloseOnEsc();
	                 }
	              }, 100);
	           });
	        },
	        _hideResultList: function() {
	           if (kernel.version.minor > 5) {//API update since dojo 1.6
	              this.closeDropDown(true);
	              return;
	           }
	           this.inherited(arguments);
	        },
	        _onFocus: function(/*Event*/ evt) {
	           this.updateHintText(null, true);
	           this.inherited(arguments);
	        },
	        _onBlur: function(/*Event*/ evt){
	           if(this.searchTimer)
	              clearTimeout(this.searchTimer);
	           this.inherited(arguments);
	           this.updateHintText();
	        },
	
	        setValue: function() {
	           this.inherited(arguments);
	           this.updateHintText();
	        },
	
	        updateHintText: function(hint, focus) {
	           if (hint)
	              this.hintText = hint;
	
	           var node = this.focusNode;
	           if (this.hintText) {
	              if(!node.title)
	                 node.title = this.hintText;
	              
	              if(!this._focused && (node.value == "" || !node.hasInput)) {
	                 node.hasInput = false;
	                 node.style.color = "#666";
	                 node.value = this.hintText || "";
	              }
	              else if (!node.hasInput) {
	                 node.hasInput = true;
	                 node.style.color = "#000";
	                 if (node.value != "") {
	                    node.value = "";
	                    
	                    // Make sure the input keeps focus when clicking in the field in FF
	                    if (focus && has("ff")) {
	                       setTimeout(function(){
	                          focusUtils.focus(node);
	                       },1);
	                    }
	                 }
	
	                 // Make sure the cursor is visible when tabbing into the main search box
	                 if (focus && has("ie"))
	                    try { _TextBoxMixin.selectInputText(node, 0, 0); } catch(e) { }
	              }
	           }
	        },
	        
	        _normalize: function(regex, cursorChar) {
	            
	            var cpos = this._getCaretPos(this.focusNode);
	            var value = this.focusNode.value;
	         
	            regex.lastIndex = 0;
	            var pre = value.substring(0, cpos) + cursorChar;
	            pre = pre.replace(regex, this.token);
	         
	            regex.lastIndex = 0;
	            var post = value.substring(cpos);
	            post = lang.trim(post).replace(regex, this.token);
	
	            if (pre && post)
	               value = pre + this.token + post;
	            else
	               value = pre+ post;
	            if (value != this.focusNode.value) {
	               this.focusNode.value = value;
	               this._setCaretPos(this.focusNode, pre.length);
	            }
	        },
	        
	        //Most of this function is verbatim from base except for a few modifications where noted
	        _onKeyPress: function(/*Event*/ evt){
	            // summary: handles keyboard events
	            var key = evt.charOrCode;
	            
	            // If we have an autoreplace pattern, convert anything that matches it into multi-value-separating tokens            
	            if (this.multipleValues && this.autoReplace && evt.keyChar) {
	               this.autoReplace.lastIndex = 0;
	               if (this.autoReplace.exec(evt.keyChar)) {
	                  evt.preventDefault(), evt.stopPropagation();
	                  this._normalize(this.autoReplace, this.token);
	
	                  // Behave as if we typed a separating character
	                  key = evt.keyChar = this.token;
	               }
	            }
	
	            //except for cutting/pasting case - ctrl + x/v
	            if(evt.altKey || (evt.ctrlKey && (key != 'x' && key != 'v')) || evt.key == keys.SHIFT){
	                return; // throw out weird key combinations and spurious events
	            }
	            var doSearch = false;
	            var opt = {};
	            var pw = this._popupWidget;
	            var dk = keys;
	            if(this._isShowingNow){
	                pw.handleKey(key);
	            }
	            
	            if (!this._isShowingNow && 
	                  (array.indexOf(this.autoSearchKeys, evt.keyCode) >= 0 || 
	                   array.indexOf(this.autoSearchChars, evt.keyChar) >= 0)) {
	               evt.preventDefault(), evt.stopPropagation();
	               this._prev_key_backspace = false;
	               this._prev_key_esc = false;
	
	               doSearch=true;
	               opt.searchImmediately = true;
	               opt.highlightFirstOption = true;
	            }
	            else if (array.indexOf(this.autoSelectKeys, evt.keyCode) >= 0 || 
	                     array.indexOf(this.autoSelectChars, evt.keyChar) >= 0) {
	               this._prev_key_backspace = false;
	               this._prev_key_esc = false;
	
	               if (this.autoCompleteAnySelectChar) {
	                  if (this._isShowingNow) {
	                     // prevent submitting form if user presses enter. Also
	                     // prevent accepting the value if either Next or Previous
	                     // are selected
	                     var highlighted = pw.getHighlightedOption();
	                     if (!highlighted)
	                        try { pw.highlightFirstOption(); highlighted = pw.getHighlightedOption();} catch(e) { } // Sometimes throws spurious exceptions in IE
	                     
	                     if (highlighted) {
	                        if (!highlighted.selectHandler && highlighted != pw.nextButton && highlighted != pw.previousButton) {
	                           evt.preventDefault();
	                           pw.set('value', { target: highlighted });
	                        }
	                     }
	                  }
	                  this._lastQuery = null; // in case results come back later
	                  this._hideResultList();
	               }
	               else {
	                  evt.preventDefault(), evt.stopPropagation();
	                  doSearch=true;
	                  opt.searchImmediately = true;
	                  opt.highlightFirstOption = true;
	                  opt.autoselectSingleResult = true;
	               }
	            }
	            else {
	              switch(key){
	                case dk.PAGE_DOWN:
	                case dk.DOWN_ARROW:
	                    if(!this._isShowingNow||this._prev_key_esc){
	                        this._arrowPressed();
	                        doSearch=true;
	                    }else{
	                        this._announceOption(pw.getHighlightedOption());
	                    }
	                    evt.preventDefault(), evt.stopPropagation();
	                    this._prev_key_backspace = false;
	                    this._prev_key_esc = false;
	                    break;
	
	                case dk.PAGE_UP:
	                case dk.UP_ARROW:
	                    if(this._isShowingNow){
	                        this._announceOption(pw.getHighlightedOption());
	                    }
	                    evt.preventDefault(), evt.stopPropagation();
	                    this._prev_key_backspace = false;
	                    this._prev_key_esc = false;
	                    break;
	
	                case dk.ENTER:
	                    // prevent submitting form if user presses enter. Also
	                    // prevent accepting the value if either Next or Previous
	                    // are selected
	                    var highlighted;
	                    if( this._isShowingNow && 
	                        (highlighted = pw.getHighlightedOption())
	                    ){
	                        // only stop event on prev/next, or if the highlighted node has it's own handler
	                        if(highlighted.selectHandler){
	                            if (highlighted.selectHandler(evt)) {
	                                return;
	                            }
	                            break;
	                        }
	                        else if(highlighted == pw.nextButton){
	                            this._nextSearch(1);
	                            evt.preventDefault(), evt.stopPropagation();
	                            break;
	                        }
	                        else if(highlighted == pw.previousButton){
	                            this._nextSearch(-1);
	                            evt.preventDefault(), evt.stopPropagation();
	                            break;
	                        }
	                    }else{
	                        // If nothing is selected, hide any popup and allow default submit behavior
	                        if (this._isShowingNow){
	                            this._hideResultList();
	                        }
	                        break;
	                    }
	                    // default case:
	                    // prevent submit, but allow event to bubble
	                    evt.preventDefault();
	                    // fall through
	
	                case dk.TAB:
	                	  if (!this.selectOnTab && key == dk.TAB) break;
	                    var newvalue = this.get('displayedValue');
	                    // #4617: 
	                    //      if the user had More Choices selected fall into the
	                    //      _onBlur handler
	                    if(pw && (
	                        (pw.getHighlightedOption() && pw.getHighlightedOption().selectHandler) ||
	                        newvalue == pw._messages["previousMessage"] ||
	                        newvalue == pw._messages["nextMessage"])
	                    ){
	                        break;
	                    }
	                    if(this._isShowingNow){
	                        this._prev_key_backspace = false;
	                        this._prev_key_esc = false;
	                        if(pw.getHighlightedOption()){
	                            pw.set('value', { target: pw.getHighlightedOption() });
	                        }
	                        this._lastQuery = null; // in case results come back later
	                        this._hideResultList();
	                    }
	                    break;
	
	                case dk.ESCAPE:
	                    this._prev_key_backspace = false;
	                    this._prev_key_esc = true;
	                    if(this._isShowingNow){
	                        evt.preventDefault(), evt.stopPropagation();
	                        this._hideResultList();
	                        
	                        if (this.originalValue) {
	                            var cpos = this._getCaretPos(this.focusNode);
	                            this.focusNode.value = this.originalValue;
	                            this._setCaretPos(this.focusNode, cpos);
	                        }
	                        this.originalValue = null;
	                    }
	                    //Remove because we just want escape to hide the drop-down
	                    //this.inherited(arguments);
	                    break;
	
	                case dk.DELETE:
	                case dk.BACKSPACE:
	                    this._prev_key_esc = false;
	                    this._prev_key_backspace = true;
	                    doSearch = true;
	                    break;
	
	                case dk.RIGHT_ARROW: // fall through
	                case dk.LEFT_ARROW: 
	                    this._prev_key_backspace = false;
	                    this._prev_key_esc = false;
	                    break;
	
	                default: // non char keys (F1-F12 etc..)  shouldn't open list
	                    this._prev_key_backspace = false;
	                    this._prev_key_esc = false;
	
	                    // Non char keys (F1-F12 etc..)  shouldn't open list. 
	                    // Ascii characters and IME input (Chinese, Japanese etc.) should. 
	                    // On IE and safari, IME input produces keycode == 229, and we simulate 
	                    // it on firefox by attaching to compositionend event (see compositionend method)
	                    doSearch = typeof key == 'string' || key == 229; 
	              }
	            }
	            if(this.searchTimer){
	                clearTimeout(this.searchTimer);
	            }
	            if(doSearch){
	                // need to wait a tad before start search so that the event
	                // bubbles through DOM and we have value visible
	                setTimeout(lang.hitch(this, "_startSearchFromInput", opt),1);
	            }
	        },
	
	        _numTokensPreceding: function(str, pos) {
	            var i=-1, count=0;
	                
	            while ( i < pos ) {
	                i = str.indexOf(this.token, i+1);
	                
	                if ( i == -1 )
	                    i = str.length;
	                else if ( i < pos )
	                    count++;
	            }
	            
	            return count;
	        },
	        
	        _autoCompleteText: function(/*String*/ text){
	            // summary:
	            //      Fill in the textbox with the first item from the drop down
	            //      list, and highlight the characters that were
	            //      auto-completed. For example, if user typed "CA" and the
	            //      drop down list appeared, the textbox would be changed to
	            //      "California" and "ifornia" would be highlighted.
	            
	            var fn = this.focusNode;
	            
	            var cpos = this._getCaretPos(fn);
	            
	            // IE7: clear selection so next highlight works all the time
	            _TextBoxMixin.selectInputText(fn, fn.value.length);
	            
	            var inputKeys;
	            
	            if ( this.multipleValues ) 
	                inputKeys = fn.value.split(this.token);
	            else
	                inputKeys = [fn.value];
	            
	            //Find which key the caret is currently in by counting the number of tokens preceding cpos
	            var count = 0;
	            if ( this.multipleValues )
	                count = this._numTokensPreceding(fn.value, cpos);
	            
	            if ( this.multipleValues && this.token != ' ' && count > 0 )
	                text = ' ' + text;
	            
	            // does text autoComplete the value in the textbox?
	            var caseFilter = this.ignoreCase? 'toLowerCase' : 'substr';
	            
	            if(lang.trim(text[caseFilter](0)).indexOf(lang.trim(inputKeys[count][caseFilter](0))) == 0){
	                
	                // only add to input node as we would overwrite Capitalisation of chars
	                // actually, that is ok
	                
	                if ( cpos + 1 > fn.value.length || fn.value.charAt(cpos) == this.token ) {
	                    var end = cpos + text.length - inputKeys[count].length;
	                    
	                    inputKeys[count] = text;//.substr(cpos);
	                    
	                    fn.value = inputKeys.join(this.token);
	                    // visually highlight the autocompleted characters
	                    _TextBoxMixin.selectInputText(fn, cpos, end);
	                }
	                    
	            }else{
	                // text does not autoComplete; replace the whole value and highlight
	                inputKeys[count] = text;
	                fn.value = inputKeys.join(this.token);
	                
	                var startPos = 0;
	                for( var i=0; i<count; i++)
	                    startPos += inputKeys[i].length;
	                    
	                startPos += this.token.length * count;
	                    
	                _TextBoxMixin.selectInputText(fn, startPos, startPos + text.length);
	            }
	        },
	
	        _openResultList: function(/*Object*/ results, /*Object*/ dataObject){
	            
	            if( !this.domNode ||
	                this.disabled || 
	                this.readOnly || 
	                (dataObject.query != this._lastQuery)
	            ){
	                return;
	            }
	            this._popupWidget.clearResultList();
	            if(!results.length && (this.hideEmptyResults || dataObject.hideEmptyResults)){
	                this._hideResultList();
	                return;
	            } 
	
	            // Fill in the textbox with the first item from the drop down list,
	            // and highlight the characters that were auto-completed. For
	            // example, if user typed "CA" and the drop down list appeared, the
	            // textbox would be changed to "California" and "ifornia" would be
	            // highlighted.
	
	            // INSERT: don't grab results[0] unless results isn't empty
	            var zerothvalue = (results.length > 0) ? new String(this.formatItem(results[0])) : null;
	            if(zerothvalue && this.autoComplete && !this._prev_key_backspace &&
	                (dataObject.query != "")){
	                // when the user clicks the arrow button to show the full list,
	                // startSearch looks for "*".
	                // it does not make sense to autocomplete
	                // if they are just previewing the options available.
	                this._autoCompleteText(zerothvalue);
	            }
	            dataObject._maxOptions = this._maxOptions;
	            this._popupWidget.createOptions(
	                results, 
	                dataObject, 
	                lang.hitch(this, "_getMenuLabelFromItem")
	            );
	
	            if (dataObject.queryOptions.autoselectAnyResult || (dataObject.queryOptions.autoselectSingleResult && results.length == 1)) {
	               var pw = this._popupWidget;
	               var target;
	               try { pw.highlightFirstOption(); target = pw.getHighlightedOption();} catch(e) { } // Sometimes throws spurious exceptions in IE
	               if (target && typeof target.item != "string")
	                  pw.set('value', { target: target });
	
	               if (this._isShowingNow) {
	                  this._hideResultList();
	               }
	
	               return;
	            }
	
	            // RTC 88769 - State of global sharebox esc key handler is not set properly
	            // This is happening because the form.ComboBox always calls a hideResultsList
	            // in the showResultsList function, but this is unnecessary and causes
	            // issues with our publish open/close methods. Here we remove the hideResultList
	            // functionality before calling the show method, then restore it afterwards.
	
	            var hideFunction = (kernel.version.minor == 9) ? ComboBox.prototype.closeDropDown : ComboBox.prototype._hideResultList;
	            ComboBox.prototype._hideResultList = function() { /* do nothing */ };
	            
	            // show our list (only if we have content, else nothing)
	            this._showResultList();
	
	            if (kernel.version.minor == 9)
	                ComboBox.prototype.closeDropDown = hideFunction;
	             else
	                ComboBox.prototype._hideResultList = hideFunction;
	
	            // #4091:
	            //      tell the screen reader that the paging callback finished by
	            //      shouting the next choice
	            if(dataObject.direction){
	                if(1 == dataObject.direction){
	                    this._popupWidget.highlightFirstOption();
	                }else if(-1 == dataObject.direction){
	                    this._popupWidget.highlightLastOption();
	                }
	                this._announceOption(this._popupWidget.getHighlightedOption());
	            }
	            else if(dataObject.queryOptions.highlightFirstOption) {
	                this._popupWidget.highlightFirstOption();
	                this._announceOption(this._popupWidget.getHighlightedOption());
	            }
	            else if (zerothvalue == dataObject.query) {
	                this._popupWidget.highlightFirstOption();
	            }
	        },
	        
	        _showResultList: function() {
	           this.inherited(arguments);
	           
	           // Override to set activedescendant when the popup shows if it doesn't already have one
	           var fn = this.focusNode;
	           var pw = this._popupWidget;
	           if (this._isShowingNow && pw && pw.id && !fn.getAttribute("aria-activedescendant"))
	          	fn.setAttribute("aria-activedescendant", pw.id);
	        },
	        
	        _announceOption: function(/*Node*/ node){
	            // summary:
	            //      a11y code that puts the highlighted option in the textbox
	            //      This way screen readers will know what is happening in the
	            //      menu
	            
	            if(!node){
	                return;
	            }
	            
	            // Get the cursor position before doing anything else
	            var cpos = this._getCaretPos(this.focusNode);
	            
	            // pull the text value from the item attached to the DOM node
	            var newValue;
	            if( node == this._popupWidget.nextButton ||
	                node == this._popupWidget.previousButton ||
	                node == this._popupWidget.searchButton ||
	                node == this._popupWidget.resultsNode){
	                newValue = node.innerHTML;
	                this.item = undefined;
	                this.value = '';
	            } else {
	               var item = this.dropDown.items[node.getAttribute("item")];
	               newValue = this.formatItem(item);
	               // currently this method causes the selected value to be written to the textbox.
	               // for a multiplevalue typeahead, this wipes out what the user previously typed
	               // Don't set the 'item' attribute if multiple values are allowed
	               // Doing so resets the input's value, and breaks autocomplete of multiple values
	               if (!this.multipleValues) this.set('item', item, false, newValue);
	            }
	            
	            if ( this.multipleValues ) {
	               // IE workaround: fall back to original position if we can't get the current position
	               cpos = cpos || this.caretPos || this.focusNode.value.length;
	
	               var curValue = this.focusNode.value
	               if (this._currentInput) {
	                  // restore the value the user originally typed
	                  curValue = this._currentInput;
	               }
	               var inputKeys = curValue.split(this.token);
	               var count = this._numTokensPreceding(curValue, cpos);
	
	               var q = this._lastQuery;
	
	               if (this.multipleValues && this.token != ' ' && count > 0) q = ' ' + q;
	
	               inputKeys[count] = q;
	
	               this.focusNode.value = inputKeys.join(this.token);
	            }
	            else {
	                this.focusNode.value = this.focusNode.value.substring(0, cpos);
	            }
	            
	            this._setCaretPos(this.focusNode, cpos);
	
	            //set up ARIA activedescendant
	            this.focusNode.setAttribute("aria-activedescendant", domAttr.get(node, "id")); 
	            // autocomplete the rest of the option to announce change
	            if (node != this._popupWidget.resultsNode) {
	               this._autoCompleteText(newValue);
	            }
	        },
	
	        formatItemForInput: function(item) {
	           // INSERT: support for duplicate entries in the text field
	           //var selected = this._selectedByText = this._selectedByText || {};
	           var text = this.formatItem(item);
	           //var i = 2;
	           var key = text;
	           // INSERT: support for duplicate entries in the text field
	           /*while (selected[key]) {
	              var existing = selected[key];
	              if ((this.store.getIdentity && this.store.getIdentity(existing) == this.store.getIdentity(item)) || item == existing)
	                 break;
	              key = text + " ["+(i++)+"]";
	           }
	           selected[key] = item;*/
	           return key;
	        },
	        
	        _selectOption: function(/*DOMNode*/ target){
	              // what if nothing is highlighted yet?
	           if(!target){
	              // handle autocompletion where the the user has hit ENTER or TAB
	              this.set('displayedValue', this.get('displayedValue'));
	              return;
	           // otherwise the user has accepted the autocompleted value
	           }
	              
	           // ?
	           //if(!target.noHide)
	              this._hideResultList();
	
	           // INSERT: bypass update of the input field for some typeahead
	           if (!this.noUpdateOnSelect)
	              this._doSelect(target);
	           
	           // INSERT: Need an event that happens after the caret position is adjusted
	           this.onSelect(this.dropDown.items[target.getAttribute('item')]);
	        },
	        
	        _doSelect: function(tgt){
	           var item = this.dropDown.items[tgt.getAttribute('item')];
	           var newValue = this.formatItemForInput(item);
	            
	           if(this.multipleValues) {
	              var oldValue = this.keyArr[this.keyIdx];
	              
	              this.keyArr[this.keyIdx] = (this.keyIdx != 0 && this.token != ' ' ? ' ' : '') + newValue;
	                
	              newValue = this.keyArr.join(this.token);
	                
	              //tokenSpace is token + space if token is not already a space
	              var tokenSpace = this.token + (this.token != ' ' ? ' ' : '');
	              
	              if ( newValue.length >= tokenSpace.length && 
	                    newValue.substring(newValue.length-tokenSpace.length) != tokenSpace )
	                 newValue += tokenSpace;
	           }
	           else {
	              this.item = item;
	           }
	            
	           this.set('value', newValue);
	           this._setCaretPos(this.focusNode, newValue.length);
	        },
	
	         // INSERT: Need an event that happens after the caret position is adjusted
	        onSelect: function(item) {},
	
	        _startSearchFromInput: function(opt){
	            //We need to split the string by "," and then do a search on the name 
	            //  where the cursor currently resides
	            
	            if (this.multipleValues && this.autoReplace) {
	               this._normalize(this.autoReplace, '');
	            }
	            
	            var currentInput = this.originalValue = this.focusNode.value;
	            var searchString = currentInput;
	            
	            if(this.multipleValues) {
	                this.keyArr = currentInput.split(this.token);
	                this.caretPos = this._getCaretPos(this.focusNode);
	                //The index associated with the name in keyArr which is currently being typed
	                //  is equal to the number of tokens preceding the cursor.
	                this.keyIdx = this._numTokensPreceding(currentInput, this.caretPos);
	                
	                searchString = this.keyArr[this.keyIdx];
	            }
	                
	            
	            //Trim white-space from the beginning and end of searchString
	            searchString = lang.trim(searchString);
	            
	            //Only search if the searchString is at least minChars long
	            if (this.shouldStartSearch(searchString))
	                this._startSearch(searchString, opt);
	            else
	                this._hideResultList();
	        },
	        
	        shouldStartSearch: function(/*String*/ query) {
	            var shouldStart;
	            if (this.store && this.store.shouldStartSearch)
	               shouldStart = this.store.shouldStartSearch(query);
	            
	            /**
	             * Ideographic written languages (Japanese Kanji, Chinese) have single characters 
	             * that represent more information than a Latin (English) character.  UTF-8 representation
	             * is a fair estimate of complexity, so minChars is treated as "minBytes".  encodeURIComponent
	             * is the simplest way to convert to UTF-8 in Javascript.
	             */
	            if (typeof shouldStart == "undefined") {
	               var minChars = this.minChars;
	               if (query.length >= minChars)
	                  return true;
	
	               var length = 0;
	               var encoded = encodeURIComponent(query); // converts strings to UTF-8 encoded representations
	               var encodedLength = Math.min(encoded.length, minChars);
	               for (var i=0; i<encodedLength; i++) {
	                  length++;
	                  if (encoded.charAt(i) == "%")
	                     i += 2;
	               }
	               shouldStart = length >= minChars;
	            }
	            return shouldStart;
	        },
	
	        _startSearch: function(/*String*/ key, opt){
	            opt = opt || {};
	            
	            if(!this._popupWidget){
	                var popupId = this.id + "_popup";
	                this._popupWidget = this.dropDown = new _ComboBoxMenu({
	                    onChange: lang.hitch(this, this._selectOption),
	                    id:popupId
	                });
	                this._popupWidget.domNode.setAttribute("role", "listbox");
	                this.focusNode.removeAttribute("aria-activedescendant");
	                this.textbox.setAttribute("aria-owns", popupId); // associate popup with textbox
	            }
	            // create a new query to prevent accidentally querying for a hidden
	            // value from FilteringSelect's keyField
	            this.item = null; // #4872
	            var query = lang.clone(this.query); // #5970
	            this._lastInput = key; // Store exactly what was entered by the user.
	            this._lastQuery = query = key;
	            // #5970: set _lastQuery, *then* start the timeout
	            // otherwise, if the user types and the last query returns before the timeout,
	            // _lastQuery won't be set and their input gets rewritten
	            this.searchTimer=this.defer(lang.hitch(this, function(query, _this){
	                
	                var fetch ={
	                    queryOptions: lang.mixin({
	                        ignoreCase:this.ignoreCase, 
	                        deep:true
	                    }, opt), 
	                    query: query, 
	                    onComplete:lang.hitch(this, "_openResultList"), 
	                    onError: function(errText){
	                        console.error('dijit.form.ComboBox: ' + errText);
	                        lang.hitch(_this, "_hideResultList")();
	                    },
	                    start:0, 
	                    count:this.pageSize
	                };
	                lang.mixin(fetch, _this.fetchProperties);
	                var dataObject = _this.store.fetch(fetch);
	                
	                var nextSearch = function(dataObject, direction){
	                    dataObject.start += dataObject.count*direction;
	                    // #4091:
	                    //      tell callback the direction of the paging so the screen
	                    //      reader knows which menu option to shout
	                    dataObject.direction = direction;
	                    this.store.fetch(dataObject);
	                };
	                this._nextSearch = this._popupWidget.onPage = lang.hitch(this, nextSearch, dataObject);
	            }, query, this), opt.searchImmediately ? 1 : this.getSearchDelay(query));
	        },
	        
	        getSearchDelay: function(/*String*/ query) {
	            if (this.store && this.store.getSearchDelay)
	               return this.store.getSearchDelay(query);
	            else
	               return this.searchDelay;
	        },
	        
	        getAttribute: function(/* string */ attr) {
	            if(this.item && this.item[attr])
	                return this.item[attr];
	            else
	                return '';
	        },
	        
	        //Get the real value in the text box
	        getTextBoxValue: function () {
	            return this.focusNode.value;
	        },
	        
	        _getMenuLabelFromItem:function(/*Item*/ item){
	            var label = this.formatItemHtml(item);
	            var key = '';
	            
	            if(this.multipleValues)
	                key = lang.trim(this.keyArr[this.keyIdx]);
	            else
	                key = lang.trim(this.focusNode.value);
	                
	            
	            //Escape html chars in key and label
	            key = key.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
	            
	            var labelLower = label.toLowerCase();
	            var keyLower = key.toLowerCase();
	            
	            var startIdx = 0;
	            var match = null;
	            
	            // INSERT: Changed algorithm to highlight matches that are not substring (i.e. typing "derek carr" 
	            //         does not highlight the "carr" in "DEREK W. CARR" because of the "W."). Also appending
	            //         to an array and then calling join is more efficient than string concatenation.
	            var keySegments = keyLower.split(/\s/);
	            var sbf = [];
	            
	            for (var i=0; i<keySegments.length;i++) {
	            	var s = keySegments[i];
	            	var match = labelLower.indexOf(s, startIdx);
	            	if (match != -1) {
	            		sbf.push(label.substring(startIdx, match));
	            		sbf.push("<b>");
	            		sbf.push(label.substring(match, match + s.length));
	            		sbf.push("</b>");
	            		startIdx = match + s.length;
	            	}
	            }
	        	sbf.push(label.substring(startIdx));
	            
	            return {html: true, label: sbf.join("")};
	        }
	    }
	);
	
	return TypeAhead;
});
