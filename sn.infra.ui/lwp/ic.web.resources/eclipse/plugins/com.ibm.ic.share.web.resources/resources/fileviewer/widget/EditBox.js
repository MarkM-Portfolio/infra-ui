/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/EditBox.html",
   "dojo/on",
   "dojo/_base/lang",
   "dojo/dom-style",
   "dijit/focus",
   "./MessageBox",
   "dojo/keys",
   "dojo/_base/array",
   "dojo/dom-construct",
   "dojo/dom-class",
   "dojo/i18n!../nls/FileViewerStrings",
   "dijit/registry",
   "dojo/dom-attr",
   "dojo/has",
   "dojo/topic"
], function (declare, _WidgetBase, _TemplatedMixin, template, on, lang, domStyle, focusUtil, MessageBox, keys, array,
    domConstruct, domClass, i18n, registry, domAttr, has, topic) {
  
   return declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,
      
      saveOnBlur: true,
      multiline: true,
      saveText: "",
      cancelText: "",
      invalidCharacters: undefined,
      useInlineMessages: true,
      
      postMixInProperties: function () {
        this.nls = i18n.EDIT_BOX;
        this.saveText = this.nls.SAVE || "Save";
        this.textLabelNls = (this.widgetType == "versions") ? i18n.UPLOAD_VERSION.CHANGE_SUMMARY : i18n.ACTION.EDIT_DESCRIPTION.TOOLTIP;
        var closeButtonId = registry.getUniqueId("fileviewer") + "_editBoxCloseButton";
        this.closeButton = {
          linkText: "",
          id: closeButtonId, 
          altText: this.nls.CANCEL.TOOLTIP,
          a11y: this.nls.CANCEL.A11Y
        };
      },
      
      postCreate: function () {
        if (this.closeButtonEnabled) {
          domClass.remove(this.closeButtonlink, "lotusHidden");
          domStyle.set(this.closeButtonlink, "display", "inline-block");
        }
        if (this.multiline) {
          this.textBox = this.multiLineInput;
          domStyle.set(this.singleLineInput, "display", "none");
        } else {
          this.textBox = this.singleLineInput;
          domStyle.set(this.multiLineInput, "display", "none");
        }
        this.textBox.id = registry.getUniqueId("fileviewer") + "_textBox_Unique";
        domAttr.set(this.textBoxNodeLabel, "for", this.textBox.id);
        domAttr.set(this.textBoxNodeLabel, "innerHTML", this.textLabelNls);
        
        if (this.saveOnBlur) {
          domStyle.set(this.actions, "display", "none");
        }
        
        on(this.textBox, "blur", lang.hitch(this, this._delayedEventHandler));
        on(this.textBox, "input", lang.hitch(this, this._handleInput));
        on(this.textBox, "keypress", lang.hitch(this, this._handleKeypress));
        on(this.textBox, "keydown", lang.hitch(this, function (e) {
          switch (e.keyCode) {
            case keys.ESCAPE:
              this._cancel();
              e.stopPropagation();
              e.preventDefault();
            case keys.BACKSPACE:
            default:
              this._clearMessages();
          }
        }));
      },
      
      focus: function () {
        // Timeout 500 fixes dijit 1.9 bug where IE hangs when elements is focused
        // while another element is yet to be blurred
        var timeout = (has("ie") || has("trident")) ? 500 : 0;
        setTimeout(lang.hitch(this, function(){
          focusUtil.focus(this.textBox); 
          this.setSelectionRange(0, 0);
        }), timeout);    
      },
      
      _clearMessages: function() {
        if (this.useInlineMessages) {
          this.removeInlineError();
        } else {
          topic.publish("ic-fileviewer/push/clearMessages");
        }
      },
      
      setErrorMessage: function (message) {
        if (!this._errorBox) {
          var msgArgs = {type: "error"};
          this._errorBox = MessageBox.create(msgArgs);
          this._errorBox.placeAt(this.errorContainer);
        }
        this._errorBox.setMessage(message);
      },
      
      setMessage: function (message) {
        if (this.useInlineMessages) {
          this.setInlineError(message);
        } else {
          topic.publish("ic-fileviewer/push/messages", {
            type: "error",
            message: message,
            cancelable: true,
            focus: false
          });
        }
      },
      
      setInlineError: function (message) {
        this.removeInlineError();
        domClass.add(this.domNode, "error");
        
        this._inlineError = domConstruct.create("span", {
          innerHTML: message,
          className: "inlineError"
        }, this.textBox, "after");
      },
      
      removeInlineError: function (message) {
        domClass.remove(this.domNode, "error");
        domConstruct.destroy(this._inlineError);
      },
      
      _getValueAttr: function () {
        return this.textBox.value;
      },
      
      _setValueAttr: function (value) {
        this.textBox.value = value;
      },
      
      getValue: function () {
        return this.get("value");
      },
      
      setValue: function (value) {
        this.set("value", value);
        this.focus();
      },
      
      _delayedEventHandler: function(e) {
        var classEventHandleName = "_handle" + e.type.charAt(0).toUpperCase() + e.type.toLowerCase().slice(1);
        var timeout = !(has("ie") || has("trident")) ? 500 : 0;
        setTimeout(lang.hitch(this, this[classEventHandleName]), timeout);
      },
      
      _handleBlur: function () {
        var currentlyFocusedNode = document.activeElement;
        
        if (!this._isDestroying && this.saveOnBlur && 
              !(this._isElementInsideOwnContainer(currentlyFocusedNode)) && !this.descriptionBox) {
          this._save();
        }
      },
      
      _isElementInsideOwnContainer: function(element) {
        return this.editBoxContainer.contains(element);
      },
      
      _handleKeypress: function (e) {
        this._clearMessages();

        if (e.keyCode === keys.ENTER && !this.multiline) {
          e.preventDefault();
          e.stopPropagation();
          this._save();
        } else if (this.invalidCharacters) {
          var c = String.fromCharCode(e.charCode || e.keyCode);
          if (c.match(this.invalidCharacters)) {
            e.stopPropagation();
            e.preventDefault();
            
            this.setMessage(this.nls.INVALID_CHARACTERS);
          }
        }
      },
      
      _handleInput: function () {
        if (this.invalidCharacters && this.textBox.value.match(this.invalidCharacters)) {
          this.textBox.value = this.textBox.value.replace(this.invalidCharacters, "");
          this.setMessage(this.nls.INVALID_CHARACTERS_REMOVED);
        }
      },
      
      setSelectionRange: function (start, end) {
        if (this.textBox.setSelectionRange) {
          this.textBox.setSelectionRange(start, end);
        } else {
          var range = this.textBox.createTextRange();
          range.move("character", 0);
          range.moveStart("character", start);
          range.moveEnd("character", end);
          range.select();
        }
      },
      
      _save: function () {
        this.emit("save", {commentBox: this});
      },
      
      _cancel: function () {
        this.emit("cancel", {commentBox: this});
      },
      
      destroy: function () {
        this._isDestroying = true;
        this.inherited(arguments);
      },
      
      onsave: function () {},
      oncancel: function () {}
   });
});
