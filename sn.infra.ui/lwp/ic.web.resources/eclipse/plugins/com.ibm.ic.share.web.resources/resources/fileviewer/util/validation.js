/* Copyright HCL Technologies Limited 2014, 2020  All Rights Reserved.   */

define([
  "dojo/dom-construct",
  "dojo/dom-class",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/on",
  "dojo/_base/lang",
  "dojo/_base/array",
  "./text"
], function (domConstruct, domClass, i18n, on, lang, array, textUtil) {

  var nls = i18n.VALIDATION,
    validationClassName = "ics-viewer-validation";
  
  return {
    TAG_LENGTH: 100,
    FILENAME_LENGTH: 252,
    COLLECTIONNAME_LENGTH: 256,
    DESCRIPTION_LENGTH: 2048,
    SHARE_MESSAGE_LENGTH: 2048,
    COMMENT_LENGTH: 50*1024,
    INVALID_FILENAME_CHARS: /[\\\/\:\*\?\<\>\|\"]/g,
  
    validateComment: function (commentBox) {
      var args = {
        maxLength: this.COMMENT_LENGTH,
        nls: nls.COMMENT,
        node: commentBox.textAreaContainer,
        widget: commentBox,
        value: commentBox.getRawValue()
      };
      return this.validateLength(args);
    },
    
    // Todo: provide common validateEditBox
    validateDescription: function (editBox, args) {
      args = lang.mixin({
        maxLength: this.DESCRIPTION_LENGTH,
        nls: nls.DESCRIPTION,
        node: editBox.textContainer,
        widget: editBox,
        value: editBox.get("value")
      }, args);
      return this.validateLength(args);
    },
    
    validateShareMessage: function (editBox) {
      var args = {
        maxLength: this.SHARE_MESSAGE_LENGTH,
        nls: nls.SHARE_MESSAGE,
        node: editBox.textContainer,
        widget: editBox,
        value: editBox.get("value")
      };
      return this.validateLength(args);
    },
    
    validateTags: function (tagTextBox) {
      var maxLength = this.TAG_LENGTH;
      
      var shortenTags = function () {
        var tags = tagTextBox.getValue();
        tags = array.map(tags, function (tag) {
          return lconn.core.util.text.trim(tag, maxLength);
        });
        tagTextBox.setValue(tags);
      };
      
      var args = {
        maxLength: maxLength,
        nls: tagTextBox.getValue().length === 1 ? nls.TAG : nls.TAGS,
        node: tagTextBox.inputContainer,
        widget: tagTextBox,
        shorten: shortenTags
      };

      if ( tagTextBox.textBox.value.indexOf('&') != -1 ) {
        this.removeValidationMessage(args.node);
        var div, node = args.node;
        div = domConstruct.create("div", {className: validationClassName, role: "alert"});
        div.appendChild(document.createTextNode(nls.TAGCHAR.WARN_INVALID_CHARS_IN_TAG));
        domConstruct.place(div, node, "before");
        args.widget.validationNode = div;
        return false;
      }

      return array.every(tagTextBox.getValue(), function (tag) {
        args.value = tag;
        return this.validateLength(args);
      }, this);
    },
    
    validateLength: function (args) {
      this.removeValidationMessage(args.node);
      
      if (args.value.length <= args.maxLength) {
        return true;
      }
      
      var div, shortenLink, node = args.node;
      
      div = domConstruct.create("div", {className: validationClassName, role: "alert"});
      div.appendChild(document.createTextNode(args.nls.WARN_TOO_LONG));

      domConstruct.create("span", {innerHTML: "&nbsp;&nbsp;"}, div);
      var a11yText = i18n.VALIDATION.A11Y_TEXT || "Automatically shorten this text";
      shortenLink = domConstruct.create("a", {href: "javascript:;", role: "button", title: a11yText}, div);
      shortenLink.appendChild(document.createTextNode(args.nls.TRIM));
      on(shortenLink, "click", lang.hitch(this, function () {
        if (lang.isFunction(args.shorten)) {
          args.shorten();
        } else {
          var text = args.value;
          text = textUtil.trim(text, args.maxLength);
          args.widget.setValue(text);
        }
        domConstruct.destroy(div);
      }));
      
      domConstruct.place(div, node, "before");
      args.widget.validationNode = div;
      shortenLink.focus();
      return false;
    },
    
    removeValidationMessage: function (node) {
      var previousSibling = node.previousSibling;
      if (previousSibling && domClass.contains(previousSibling, validationClassName)) {
        domConstruct.destroy(previousSibling);
      }
    }
  };
});
