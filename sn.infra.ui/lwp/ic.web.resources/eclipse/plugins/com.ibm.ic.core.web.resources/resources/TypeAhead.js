/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/dom-attr",
      "dojo/_base/declare",
      "dojo/dom-style",
      "dojo/string",
      "dojo/dom-class",
      "dojo/aspect",
      "dojo/dom-construct",
      "dojo/has",
      "dojo/dom-geometry",
      "dojo/keys",
      "dojo/_base/lang",
      "dojo/_base/event",
      "dojo/text!ic-core/templates/ComboBox.html",
      "dojo/topic",
      "dijit/_base/wai",
      "dijit/focus",
      "dijit/form/ComboBox",
      "dijit/form/_ComboBoxMenu",
      "./globalization/bidiUtil",
      "./util/text",
      "./TypeAheadFormatMixin"
],
   function(dojo, domAttr, declare, domStyle, string, domClass, aspect, domConstruct, has, domGeometry, keys, lang, event, template, topic, wai, focusUtil, ComboBox, _ComboBoxMenu, bidiUtil, textModule, TypeAheadFormatMixin) {
      /**
       * Connections base typeahead widget
       * 
       * @class ic-core.TypeAhead
       * @extends dijit.form.ComboBox
       * @extends ic-core.TypeAheadFormatMixin
       * @author Ryan Silva <rsilva@us.ibm.com>
       */
      var TypeAhead = declare("lconn.core.TypeAhead", [
            ComboBox,
            TypeAheadFormatMixin
      ], /** @lends ic-core.TypeAhead.prototype */
      {
         size : "",
         templateString : null,
         templateString : template,

         // Convenience function to return the item or null if there isn't one.
         getItem : function() {
            return (this.item ? this.item : null);
         },

         // minChars: number
         // The number of characters that need to be typed before doing a search
         minChars : 1,

         // maxChars: number
         // The number of characters allowed per word. Default = -1 (no max)
         maxChars : -1,

         // multipleValues: bool
         // Sets whether or not this type-ahead should support multiple values.
         // If true, then typing a token (usually comma) will cause the
         // type-ahead
         // to reset and begin searching for a new name.
         multipleValues : true,

         // token: string
         // The character to split all the names by in the text box.
         // Only used if multipleValues is true.
         token : '',

         hintText : null,
         
         lastSearch : null,

         autoComplete : false,

         submitFormOnKey : false,

         submitFormOnNonSelectingEnter : false,

         searchDelay : 300,

         // Addition to undo http://bugs.dojotoolkit.org/ticket/6220
         postCreate : function() {

            // connect the publish hide function to the hideResult function
            this.own(aspect.after(this, "_showResultList", this._fixPosition, true));

            // Undo setting fontFamily, since we don't have an drop-down arrow
            // to worry about
            var fontFamily = this.focusNode.style.fontFamily || "";

            // Certain LotusLive apps use dojo 1.5 which requires that
            // "this.downArrowNode" be set
            if (!this.downArrowNode) {
               this.downArrowNode = this.domNode.parentNode.appendChild(domConstruct.create("div", {
                  style : {
                     display : "none"
                  }
               }));
            }

            // associate dummy popup with textbox to avoid PRT violation
            this.dummyPopupNode = this.domNode.parentNode.appendChild(domConstruct.create("div", {
               id : this.id + "_dummypopup",
               style : {
                  display : "none"
               }
            }));
            domAttr.set(this.dummyPopupNode, "role", "textbox");
            wai.setWaiState(this.domNode, "owns", this.dummyPopupNode.id);

            this.inherited(arguments);
            this.focusNode.style.fontFamily = fontFamily;
            this.updateHintText();
            this.focusNode.style.direction = bidiUtil.getTextDirection(this.focusNode.value);
         },

         _onFocus : function( /* Event */evt) {
            this.updateHintText(null, true);
            this.inherited(arguments);
            if (has("ie")) {
               // SPR #SYEE882LWY - workaround for another wacky IE focus issue
               // Texbox got focus when it was clicked on, but IE was not
               // sending any keydown events
               // focus the textbox with JS, which makes it start working
               window.setTimeout("dijit.focus(dojo.byId('" + this.textbox.id + "'))", 0);
            }
         },

         _trimKeys : function() {
            // if maxChars is set, make sure no words in the typeahead exceed
            // it.
            if (this.maxChars > 0) {
               var fn = this.focusNode;
               var inputKeys = ((this.multipleValues) ? fn.value.split(this.token) : [ fn.value
               ]);
               var changed = false;
               // truncate to the maximum chars
               for (var i = 0; i < inputKeys.length; i++) {
                  // need to check the actual byte length to make sure we don't
                  // exceed the storage
                  if (textModule.getByteLength(inputKeys[i]) > this.maxChars) {
                     var oldKey = inputKeys[i];
                     inputKeys[i] = textModule.trimToByteLength(inputKeys[i], this.maxChars);
                     changed = true;
                     // TODO - better logging?
                     if (window.console)
                        console.log("core.TypeAhead key too long. Trimming '" + oldKey + "' to '" + inputKeys[i] + "'.");
                  }
               }

               if (changed) {
                  fn.value = inputKeys.join((this.multipleValues) ? this.token : "");
               }

            }
         },

         _onBlur : function( /* Event */evt) {

            this._trimKeys();

            this.inherited(arguments);

            // RTC: 87198 - Have to remove this style when typeahead loses focus
            // otherwise it interferes with other popups
            if (has("ie") && this.dropdownNode) {
               domClass.remove(this.dropdownNode, "lconnTypeAhead");
            }
            this.updateHintText();
         },

         // Wrapper around hasAttribute DOM API unsupported by IE
         _hasAttr : function(domNode, attr) {
            return has("ie") ? domNode.getAttribute(attr) !== null : domNode.hasAttribute(attr);
         },

         setValue : function() {
            this.inherited(arguments);
            this.updateHintText(arguments[0], false);
         },

         updateHintText : function(hint, focus) {
            var focusNode = this.focusNode;
            if (hint)
               focusNode.title = this.hintText = hint;

            if (this.hintText) {
               if (!this._focused && (focusNode.value == "" || !focusNode.hasInput)) {
                  focusNode.hasInput = false;
                  focusNode.style.color = "#666";
                  focusNode.value = this.hintText || "";
               }
               else if (!focusNode.hasInput) {
                  focusNode.hasInput = true;
                  focusNode.style.color = "#000";

                  if (focusNode.value != "") {
                     focusNode.value = "";

                     // Make sure the input keeps focus when clicking in the
                     // field in FF
                     if (focus && has("ff")) {
                        setTimeout(function() {
                           dijit.focus(focusNode);
                        }, 1);
                     }
                  }

                  // Make sure the cursor is visible when tabbing into the main
                  // search box
                  if (focus && has("ie"))
                     try {
                        dijit.selectInputText(focusNode, 0, 0);
                     }
                     catch (e) {
                     }
               }
            }
         },

         // If maxChars is defined, then we need to restrict EACH individual tag
         // to this length.
         // Which means we need to determine the size of the current tag we're
         // typing, not just
         // the overall length of the field. So we'll need to inspect the
         // keypress event and
         // check the input and make sure it's allows so that no individual tag
         // will exceed this
         // maximum.
         _checkKeyLength : function( /* Event */evt) {

            try {
               // maxChars is defined, let's inspect the key and data...
               if (this.maxChars > 0) {
                  var this_ = this;

                  // loop through the list of special keys and allow them
                  // regardless
                  var isKeyAlwaysAllowed_ = function(event) {
                     var k = event.charOrCode;
                     var tk = this_.token;

                     // if the key is the token, allow it.
                     if (this_.multipleValues && tk.length == 1 && tk == k) {
                        return true;
                     }

                     // dojo.keys has a list of special key definitions. We'll
                     // use them
                     // to determine whether to allow the keypress to proceed.
                     var dk = dojo.keys;
                     for (dkname in dk) {
                        if (dk[dkname]) {
                           if (dkname !== "SPACE" && dkname.indexOf("NUMPAD_") == -1 && k == dk[dkname]) {
                              return true;
                           }
                        }
                     }

                     return false;
                  };

                  // get the current word where the caret position is at in the
                  // input field.
                  var getCurrentWord_ = function() {
                     var fn = this_.focusNode;
                     var tk = this_.token;

                     var cpos = this_._getCaretPos(this_.focusNode); // current
                     // cursor
                     // position
                     var cword = this_.getTextBoxValue(); // current overall
                     // text box value
                     if (this_.multipleValues && tk.length > 0) { // if
                        // multivalue,
                        // find the
                        // individual
                        // tag.
                        cword = tk + cword + tk;
                        cword = cword.substring(0, cword.indexOf(tk, cpos + tk.length));
                        cword = cword.substring(cword.lastIndexOf(tk) + tk.length);
                     }

                     return cword;
                  };

                  // check for the special characters and length of the current
                  // word.
                  if (isKeyAlwaysAllowed_(evt) || textModule.getByteLength(getCurrentWord_()) < this.maxChars) {
                     return true;
                  }

                  // if we got here, then the key pressed isn't a special key or
                  // token AND the length is too long
                  if (evt.preventDefault) {
                     evt.preventDefault();
                  }
                  else {
                     evt.returnValue = false; // ie
                  }
                  return false;

               }
            }
            catch (e) {
            }

            // catch-all
            return true;

         },

         // Enforcing text direction
         _onKeyUp : function( /* Event */evt) {
            this.inherited(arguments); // inherit from dijit._HasDropDown
            if(this.get('displayedValue').length < 2){
          	  this.lastSearch = null;
            }
            bidiUtil.inputRTLProcessing(this.textbox);
         },

         /**
          * This is just a stub to avoid breaking consumers
          * 
          * @param {Event}
          *           [e] The event, ignored
          * @protected
          */
         _onKeyPress : function(ignored) {},

         // overrides the '_onKey' of dijit.form._AutoCompleterMixin (onKeyDown
         // handler)
         _onKey : function( /* Event */evt) {
            // summary:
            // Handles keyboard events
            // This is called also by "handleUpDownArrow" (Mentions) in case of
            // UP/DOWN arrow keys

            if (!this._checkKeyLength(evt))
               return; // first check to make sure we're under maxchars for
            // this word
            this.inherited(arguments); // inherits from
            // dijit.form._AutoCompleterMixin
            if (evt.keyCode === keys.ENTER) {
               // be sure to keep the focus on the input text (even in IE)
               focusUtil.focus(this.domNode);
               // lconn.core: conditionally submit
               if (this.submitFormOnNonSelectingEnter) { // flag used by
                  // "core.CommonTags.CommonTagsTypeAhead"
                  if (this.searchTimer) {
                     this.searchTimer.remove();
                     this.searchTimer = null;
                  }
                  this._lastQuery = null;
                  if (this._opened && this._hideResultList) {
                     this._hideResultList();
                  }
                  if (this._trimKeys) {
                     this._trimKeys(); // trim any keys before submitting if
                     // maxChars is set
                  }
               }
               else if (!this.submitFormOnKey) { // flag set also in
                  // "lconn.wikis.widget.WikiTypeAhead",
                  // "lconn.bookmarklet.DogearTypeAhead"
                  event.stop(evt);
               }
            }
         },

         // lconn.core
         _numTokensPreceding : function(str, pos) {
            // figure out how many tokens (if any) are in the given string,
            // before pos
            var checkStr = str.substring(0, pos);
            // this should use _splitByToken, but the rest of the code is dumb
            // and uses a plain split, so just do that
            var count = checkStr.split(this.token).length - 1;

            return count;
         },

         // a function to split a string by the current token, ignoring repeated
         // tokens
         _splitByToken : function _splitByToken(str) {
            var retval = [ str
            ];
            if (this.token && str.indexOf(this.token) != -1) {
               // remove duplicate tokens
               str = str.replace(new RegExp(this.token + "+", "g"), this.token);
               // remove any leading or trailing tokens
               str = str.replace(new RegExp("^" + this.token), "");
               str = str.replace(new RegExp(this.token + "$"), "");
               // split on tokens
               retval = str.split(this.token);
            }
            return retval;
         },

         _autoCompleteText : function( /* String */text) {
            // summary:
            // Fill in the textbox with the first item from the drop down
            // list, and highlight the characters that were
            // auto-completed. For example, if user typed "CA" and the
            // drop down list appeared, the textbox would be changed to
            // "California" and "ifornia" would be highlighted.
            var fn = this.focusNode;

            var cpos = this._getCaretPos(fn);

            // IE7: clear selection so next highlight works all the time
            dijit.selectInputText(fn, fn.value.length);

            var inputKeys;

            if (this.multipleValues)
               inputKeys = fn.value.split(this.token);
            else
               inputKeys = [ fn.value
               ];

            // Find which key the caret is currently in by counting the number
            // of tokens preceding cpos
            var count = 0;
            if (this.multipleValues)
               count = this._numTokensPreceding(fn.value, cpos);

            if (this.multipleValues && this.token != ' ' && count > 0)
               text = ' ' + text;

            // does text autoComplete the value in the textbox?
            var caseFilter = this.ignoreCase ? 'toLowerCase' : 'substr';

            if (string.trim(text[caseFilter](0)).indexOf(string.trim(inputKeys[count][caseFilter](0))) == 0) {

               // only add to input node as we would overwrite Capitalisation of
               // chars
               // actually, that is ok
               if (cpos + 1 > fn.value.length || fn.value.charAt(cpos) == this.token) {
                  var end = cpos + text.length - inputKeys[count].length;

                  if (text != this.NoResultsMessage && text != this.searchDirectory && text.indexOf("**") == -1) {
                     inputKeys[count] = text; // .substr(cpos);
                     fn.value = inputKeys.join(this.token);
                     // visually highlight the autocompleted characters
                     dijit.selectInputText(fn, cpos, end);
                  }
                  else {
                     fn.value = this._currentInput;
                  }
               }

            }
            else {
               // text does not autoComplete; replace the whole value and
               // highlight
               if (text != this.NoResultsMessage && text != this.searchDirectory && text.indexOf("**") == -1) {
                  inputKeys[count] = text;
                  fn.value = inputKeys.join(this.token);
                  var startPos = 0;
                  for (var i = 0; i < count; i++)
                     startPos += inputKeys[i].length;

                  startPos += this.token.length * count;

                  dijit.selectInputText(fn, startPos, startPos + text.length);
               }
               else {
                  fn.value = this._currentInput;
               }
            }
         },

         _openResultList : function( /* Object */results, /* Object */dataObject) {
            this._fetchHandle = null;
            if (!this.domNode || // lconn.core: don't reveal results list if
            // node has been destroyed
            this.disabled || this.readOnly || (dataObject.query != this._lastQuery)) {
               return;
            }
            this._popupWidget.clearResultList();
            if (!results.length && (this.hideEmptyResults || dataObject.hideEmptyResults)) {
               this._hideResultList();
               return;
            }

            // Fill in the textbox with the first item from the drop down list,
            // and highlight the characters that were auto-completed. For
            // example, if user typed "CA" and the drop down list appeared, the
            // textbox would be changed to "California" and "ifornia" would be
            // highlighted.
            dataObject._maxOptions = this._maxOptions;
            var nodes = this._popupWidget.createOptions(results, dataObject, lang.hitch(this, "_getMenuLabelFromItem"));

            this.results = results;

            // show our list (only if we have content, else nothing)
            this._showResultList();

            // #4091:
            // tell the screen reader that the paging callback finished by
            // shouting the next choice
            if (dataObject.direction) {
               if (1 == dataObject.direction) {
                  this._popupWidget.highlightFirstOption();
               }
               else if (-1 == dataObject.direction) {
                  this._popupWidget.highlightLastOption();
               }
               this._announceOption(this._popupWidget.getHighlightedOption());
            }
            else if (this.autoComplete && !this._prev_key_backspace /*
                                                                      * &&
                                                                      * !dataObject.direction
                                                                      */
                  // when the user clicks the arrow button to show the full
                  // list,
                  // startSearch looks for "*".
                  // it does not make sense to autocomplete
                  // if they are just previewing the options available.
                  && !/^[*]+$/.test(dataObject.query[this.searchAttr])) {
               this._announceOption(nodes[1]); // 1st real item
            }
         },

         _showResultList : function() {
            this.inherited(arguments);

            // Override to set activedescendant when the popup shows if it
            // doesn't already have one
            var fn = this.focusNode;
            var pw = this._popupWidget;
            
            // Defect 153516 
            domStyle.set(pw.domNode, {"width" : "auto"} );
            domStyle.set(pw.domNode, {"width" : (pw.domNode.offsetWidth + 2) + "px"});
            if(fn.offsetWidth > pw.domNode.offsetWidth) {
               domStyle.set(pw.domNode, {"width" : (fn.offsetWidth+"px")} );
            }
            if (this._opened && pw && pw.id && !dijit.getWaiState(fn, "activedescendant"))
               wai.setWaiState(fn, "activedescendant", pw.id);

            // RTC: 86479
            // if(pw != null)
            // pw.domNode.style.height = "auto";
            // RTC: 83154 - In IE there is an overflow issue that causes
            // unnecessary horizontal scrollbars on initial render
            if (has("ie")) {
               domClass.add(pw.domNode.parentNode, "lconnTypeAhead");
               this.dropdownNode = pw.domNode.parentNode;
            }

         },

         _fixPosition : function() {
            var node = this.focusNode;
            if (node) {
               var listNode = this._popupWidget.domNode;
               var listPos = domGeometry.position(listNode, true);
               var windowWidth = dijit.getViewport().w;

               // Reposition if there is no space on the rigth
               if (listPos.x + listNode.parentNode.clientWidth > windowWidth) {
                  domStyle.set(listNode.parentNode, {
                     left : (windowWidth - listNode.parentNode.clientWidth) + "px"
                  });
               }
            }
            topic.publish("com/ibm/social/incontext/typeahead/onDisplayChange", this._popupWidget);
         },

         _announceOption : function( /* Node */node) {
            // summary:
            // a11y code that puts the highlighted option in the textbox.
            // This way screen readers will know what is happening in the
            // menu.
            if (!node) {
               return;
            }

            // Get the cursor position before doing anything else
            var cpos = this._getCaretPos(this.focusNode);

            // pull the text value from the item attached to the DOM node
            var newValue;
            if (node == this._popupWidget.nextButton || node == this._popupWidget.previousButton ||
            // lconn.core: exclude case when user clicks on the search from
            // directory item
            node == this._popupWidget.searchButton || node == this._popupWidget.resultsNode) {
               newValue = node.innerHTML;
               this.item = undefined;
               this.value = '';
            }
            else {
               var item = this.dropDown.items[node.getAttribute("item")];
               // lconn.core: we don't call labelFunc here - surprise, it gets
               // called in dojo 1.4 anyhow!
               newValue = this.formatItem(item);
               // currently this method causes the selected value to be written
               // to the textbox.
               // for a multiplevalue typeahead, this wipes out what the user
               // previously typed
               // Don't set the 'item' attribute if multiple values are allowed
               // Doing so resets the input's value, and breaks autocomplete of
               // multiple values
               if (!this.multipleValues)
                  this.set('item', item, false, newValue);
            }

            // lconn.core: get the text that the user manually entered (cut off
            // autocompleted text)
            if (this.multipleValues) {
               // IE workaround: fall back to original position if we can't get
               // the current position
               cpos = cpos || this.caretPos || this.focusNode.value.length;

               var curValue = this.focusNode.value
               if (this._currentInput) {
                  // restore the value the user originally typed
                  curValue = this._currentInput;
               }
               var inputKeys = curValue.split(this.token);
               var count = this._numTokensPreceding(curValue, cpos);

               var q = this._lastQuery;

               if (this.multipleValues && this.token != ' ' && count > 0)
                  q = ' ' + q;

               inputKeys[count] = q;

               this.focusNode.value = inputKeys.join(this.token);
            }
            else
               this.focusNode.value = this.focusNode.value.substring(0, cpos);

            this._setCaretPos(this.focusNode, cpos);

            // set up ARIA activedescendant
            wai.setWaiState(this.focusNode, "activedescendant", domAttr.get(node, "id"));
            // autocomplete the rest of the option to announce change
            if (node != this._popupWidget.resultsNode) {
               this._autoCompleteText(newValue);
            }
         },

         // lconn.core: override
         _selectOption : function( /* DomNode */target) {

            // summary:
            // Menu callback function, called when an item in the menu is
            // selected.
            // lconn.core: bypass update of the input field for some typeahead
            if (!this.noUpdateOnSelect) {
               this._announceOption(target);
            }
            this._hideResultList();
            this._setCaretPos(this.focusNode, this.focusNode.value.length);

            // lconn.core: Need an event that happens after the caret position
            // is adjusted
            this.onSelect(this.dropDown.items[target.getAttribute('item')]);

            this._handleOnChange(this.value, true);
            // Remove aria-activedescendant since the drop down is no loner
            // visible
            // after closeDropDown() but _announceOption() adds it back in
            if (this.focusNode){
          	  this.focusNode.removeAttribute("aria-activedescendant");
            }
            console.log("adding last Search = null fix on select.");
            //reset lastSearch as target was selected.  NOTE: lastQuery remains, so info is still present if needed.
            this.lastSearch = null;
         },

         // lconn.core: Need an event that happens after the caret position is
         // adjusted
         onSelect : function(item) {},

         // lconn.core
         _doSelect : function(tgt) {
            var newValue = this.formatItem(tgt.item);

            if (this.multipleValues) {
               var oldValue = this.keyArr[this.keyIdx];

               this.keyArr[this.keyIdx] = (this.keyIdx != 0 && this.token != ' ' ? ' ' : '') + newValue;

               newValue = this.keyArr.join(this.token);

               // tokenSpace is token + space if token is not already a space
               var tokenSpace = this.token + (this.token != ' ' ? ' ' : '');

               if (newValue.length >= tokenSpace.length && newValue.substring(newValue.length - tokenSpace.length) != tokenSpace)
                  newValue += tokenSpace;
            }
            else {
               this.item = tgt.item;
            }

            this.set('value', newValue);
            this._setCaretPos(this.focusNode, newValue.length);
         },

         _startSearchAll : function() {
            this._startSearch('');
         },

         _startSearchFromInput : function() {
            // We need to split the string by "," and then do a search on the
            // name
            // where the cursor currently resides
            var currentInput = this._currentInput = this.focusNode.value;
            var searchString = currentInput;

            if (this.multipleValues) {
               this.keyArr = currentInput.split(this.token);
               this.caretPos = this._getCaretPos(this.focusNode);
               // The index associated with the name in keyArr which is
               // currently being typed
               // is equal to the number of tokens preceding the cursor.
               this.keyIdx = this._numTokensPreceding(currentInput, this.caretPos);

               searchString = this.keyArr[this.keyIdx];
            }

            // Trim white-space from the beginning and end of searchString
            searchString = string.trim(searchString);

            // Only search if the searchString is at least minChars long
            if (this.shouldStartSearch(searchString)){
               //stops redundant searching triggered by 'compositionend' event
               //and stops new typeahead from being created
               if(searchString != this.lastSearch){
                  this._startSearch(searchString);
                  this.lastSearch = searchString;
               }
            }else{
               this._hideResultList();
            }

         },

         _hideResultList : function() {
            // Temporary workaround
            this.closeDropDown();
         },

         shouldStartSearch : function( /* String */query) {
            var shouldStart;
            if (this.store && this.store.shouldStartSearch)
               shouldStart = this.store.shouldStartSearch(query);

            /**
             * Ideographic written languages (Japanese Kanji, Chinese) have
             * single characters that represent more information than a Latin
             * (English) character. UTF-8 representation is a fair estimate of
             * complexity, so minChars is treated as "minBytes".
             * encodeURIComponent is the simplest way to convert to UTF-8 in
             * Javascript.
             */
            if (typeof shouldStart == "undefined") {
               var minChars = this.minChars;
               if (query.length >= minChars)
                  return true;

               var length = 0;
               var encoded = encodeURIComponent(query); // converts strings to
               // UTF-8 encoded
               // representations
               for (var i = 0; i < encoded.length; i++) {
                  length++;

                  if (length >= minChars)
                     break;

                  if (encoded.charAt(i) == "%")
                     i += 2;
               }
               shouldStart = length >= minChars;
            }
            return shouldStart;
         },

         _startSearch : function( /* String */key) {
            var popupId = this.id + "_popup";
            if (!this._popupWidget) {
               this._popupWidget = this.dropDown = new _ComboBoxMenu({
                  onChange : lang.hitch(this, this._selectOption),
                  id : popupId
               });
               wai.setWaiRole(this._popupWidget.domNode, "listbox");
               wai.setWaiState(this._popupWidget.domNode, "live", "polite");
               this._popupWidget.domNode.style.listStyleType = "none";
               wai.removeWaiState(this.focusNode, "activedescendant");
               wai.setWaiState(this.textbox, "owns", popupId); // associate
               // popup with
               // textbox
               domClass.add(this._popupWidget.domNode, "lconnHighlight");
            }
            else {
               wai.setWaiState(this.focusNode, "activedescendant", popupId);
            }
            // create a new query to prevent accidentally querying for a hidden
            // value from FilteringSelect's keyField
            var query = lang.clone(this.query); // #5970
            this._lastInput = key; // Store exactly what was entered by the
            // user.
            this._lastQuery = query = key;
            // #5970: set _lastQuery, *then* start the timeout
            // otherwise, if the user types and the last query returns before
            // the timeout,
            // _lastQuery won't be set and their input gets rewritten
            this.searchTimer = this.defer(lang.hitch(this, function(query, _this) {
               this.searchTimer = null;
               var fetch = {
                  queryOptions : {
                     ignoreCase : this.ignoreCase,
                     deep : true
                  },
                  query : query,
                  onComplete : lang.hitch(this, "_openResultList"),
                  onError : function(errText) {
                     _this._fetchHandle = null;
                     console.error('dijit.form.ComboBox: ' + errText);
                     lang.hitch(_this, "_hideResultList")();
                  },
                  start : 0,
                  count : this.pageSize
               };
               lang.mixin(fetch, _this.fetchProperties);
               this._fetchHandle = _this.store.fetch(fetch);

               var nextSearch = function(dataObject, direction) {
                  dataObject.start += dataObject.count * direction;
                  // #4091:
                  // tell callback the direction of the paging so the screen
                  // reader knows which menu option to shout
                  dataObject.direction = direction;
                  this._fetchHandle = this.store.fetch(dataObject);
               };
               this._nextSearch = this._popupWidget.onPage = lang.hitch(this, nextSearch, this._fetchHandle);
            }, query, this), this.searchDelay);
         },

         // lconn.core
         getAttribute : function( /* string */attr) {
            if (this.item && this.item[attr])
               return this.item[attr];
            else
               return '';
         },

         // lconn.core: get the real value in the text box
         getTextBoxValue : function() {
            return this.focusNode.value;
         }
      });

      return TypeAhead;

   });
