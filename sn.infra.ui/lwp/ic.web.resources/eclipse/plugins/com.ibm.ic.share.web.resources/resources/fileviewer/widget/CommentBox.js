/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/CommentBox.html",
   "dojo/on",
   "dojo/_base/lang",
   "dojo/dom-style",
   "dojo/dom-class",
   "dojo/dom-geometry",
   "dojox/html/entities",
   "dijit/focus",
   "../config/globals",
   "../util/FileAccessChecker",
   "../util/mentions",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/dom-construct",
   "dojo/_base/array",
   "./MessageBox",
   "dojo/keys",
   "dojo/has",
   "dojo/query",
   "dojo/topic",
   "dojo/sniff"
], function (declare, _WidgetBase, _TemplatedMixin, template, on, lang, domStyle, domClass, domGeometry, entities,
    focusUtil, globals, FileAccessChecker, mentions, i18n, domConstruct, array, MessageBox, keys, has, query, topic) {
   
   return declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,
      
      showShadowText: false,
      cancelOnBlur: false,
      
      postMixInProperties: function () {
        this.nls = i18n.COMMENT_BOX;
        this._saveText = this.isNew ? this.nls.POST : this.nls.SAVE;
        this._shadowText = this.showShadowText ? this.nls.SHADOW_TEXT : " ";
        this._accessChecker = new FileAccessChecker(this.file);
        this._mentionsDataFormatter = new globals.MentionsDataFormatter();
        this._invalidMentions = [];
      },
      
      postCreate: function () {
        var args = {
          maxLength: 100000000,
          mentionsEnable: true,
          shadowText: this._shadowText,
          title: this.nls.TITLE,
          disableURLPreview: true,
          onFocusCallback: lang.hitch(this, this.activate),
          onBlurCallback: lang.hitch(this, this._handleBlur),
          width: "100%",
          customCSS: "ics-viewer-width-auto"
        };
        
        //determine if ckeditor is enabled
        if (has("ckeditor-lite-mentions")) {
          args.keyDownCallback = lang.hitch(this, this._handleKey);
          this.textBox = new globals.TextBoxWidget(args, this.textdiv);
          domClass.add(this.textAreaContainer, "ckeditor");
        } else {
          this.textBox = new globals.TextBoxWidget(args, this.textarea);
          this.textAreaNode = this.textBox.textAreaNode;
        }
        
        this.textBox.addMentionsCallback("onCreateMention", dojo.hitch(this, this._onCreateMention));
        this.textBox.addMentionsCallback("onRemoveMention", dojo.hitch(this, this._onRemoveMention));
        
        if (!has("ckeditor-lite-mentions")) {
          var textNodeLabel = domConstruct.create("label", {
            "for": this.textAreaNode.id,
            "innerHTML": this._shadowText,
            "class": "lotusOffScreen"
          });
          
          domConstruct.place(textNodeLabel, this.textAreaNode, "before");
          // Required for making the legacy BTB code work
          this.textBox._mentionsHelper.disableURLPreview = true;
          if (this.textBox._mentionsHelper._registeredTypes) {
            for (var i = 0; i < this.textBox._mentionsHelper._registeredTypes.length; i++) {
              if (this.textBox._mentionsHelper._registeredTypes[i].declaredClass == "lconn.core.widget.mentions.PersonMentionsType") {
                this.textBox._mentionsHelper._activeType = this.textBox._mentionsHelper._registeredTypes[i];
              }
            }
          }
          
          // only done in legacy BTB code because there is not yet support for listening to keydown events when ckeditor is enabled
          on(this.textAreaNode, "keydown", lang.hitch(this, function (evt) {
            evt.getKey = function () {
              return evt.keyCode;
            };
            this._handleKey(evt);
          }));
        }
        
        var msgArgs = {type: "warning"};
        this._warningBox = MessageBox.create(msgArgs);
        this._warningBox._hide();
        this._warningBox.placeAt(this.warningContainer);
        
        if (this.file.get("isExternal")) {
          domStyle.set(this.externalIcon, "display", "");
        }
        
        this.file.watch("isExternal", lang.hitch(this, function (name, oldValue, value) {
           if (oldValue !== value && value === false) {
              domStyle.set(this.externalIcon, "display", "none");
           }
        }));
      },
      
      _handleBlur: function () {
        var commentValue = this.textBox.getText();
        if (this.cancelOnBlur && (commentValue === "" || commentValue === this._shadowText)) {
          // Disable tabbing to the actions so the browser does not try to focus on them when tabbing out
          this._disableActionTabbing();
          
          this._cancel();
        }
      },
      
      _handleKey: function(evt){
        var keyCode = evt.getKey();
        if (keyCode === keys.TAB) {
          this._handleBlur();
        } else if(keyCode === keys.ESCAPE) {
          focusUtil.focus(this.cancelButton);
          this._cancel();
          evt.stopPropagation();
          evt.preventDefault();
        }  
      },
      
      _disableActionTabbing: function () {
        array.forEach(this._getActions(), function(action) {
          action.tabIndex = "-1";
        }, this);
      },
      
      _enableActionTabbing: function () {
        array.forEach(this._getActions(), function(action) {
          action.tabIndex = "";
        }, this);
      },
      
      _getActions: function () {
        return query("a", this.commentActionsContainer);
      },
      
      focus: function () {
        if (has("ckeditor-lite-mentions")) {
           setTimeout(lang.hitch(this, function() {
             this.textBox.setFocus();
           }), 0);
         } else {
            focusUtil.focus(this.textAreaNode);
         }
      },
      
      getValue: function () {
        var mentionData = this.textBox.getTrackedMentions();
        for (var i = 0; i < mentionData.textData.length; i++) {
          var type = mentionData.textData[i].type;
          if (type === "text" || type === "html") {
            mentionData.textData[i].value = entities.encode(mentionData.textData[i].value);
          }
        }
        
        var commentValue = this._mentionsDataFormatter.formatData(mentionData);
        return entities.encode(commentValue);
      },
      
      getRawValue: function () {
         var mentionData = this.textBox.getTrackedMentions();
         var commentValue = this._mentionsDataFormatter.formatData(mentionData);
         return entities.encode(commentValue);
      },
      
      setValue: function (text) {
        text = entities.decode(text);
        text = mentions.formatMentionsForEdit(text);
        
        this.activate();
        
        // Without this, the comment box breaks when editing a comment which contains mentions
        this.focus();
        
        this._isSettingContent = true;
        setTimeout(lang.hitch(this, function() {
          this.textBox.setText(text);
          this._isSettingContent = false;
        }), 0);
      },
      
      activate: function () {
        if (domClass.contains(this.domNode, "active")) {
          return;
        }
        domClass.add(this.domNode, "active");
        this._enableActionTabbing();
        topic.publish("ic-fileviewer/editStart");
      },
      
      reset: function () {
        if (!domClass.contains(this.domNode, "active")) {
          return;
        }
        domClass.remove(this.domNode, "active");
        this._invalidMentions = [];
        this._updateWarning();
        this.textBox.resetBox();
        if (this.validationNode) {
          domConstruct.destroy(this.validationNode);
        }
        topic.publish("ic-fileviewer/editStop");
      },
      
      _onCreateMention: function (mentionedUser) {
        if (this._isSettingContent) {
          return;
        }
        
        this._accessChecker.checkAccess({
          id: mentionedUser.getUserId()
        }).then(lang.hitch(this, this._handleAccessCheckResult, mentionedUser));
      },
      
      _handleAccessCheckResult: function (mentionedUser, hasAccess) {
        if (!hasAccess) {
          mentionedUser.removeSymbol();
          this._invalidMentions.push(mentionedUser);
          this._updateWarning();
        }
      },
      
      _updateWarning: function () {
        this._warningBox.removeMessage();
        
        if (this._invalidMentions.length === 0) {
          return;
        }
        
        var messageNode = document.createDocumentFragment();
        messageNode.appendChild(document.createTextNode(this.nls.CANNOT_ACCESS_CONTENT));
        domConstruct.create("br", {}, messageNode);
        
        var ul = domConstruct.create("ul", {}, messageNode);
        array.forEach(mentions.getUniqueMentions(this._invalidMentions), function(mention) {
           var li = domConstruct.create("li", {}, ul);
           li.appendChild(document.createTextNode(mention.value));
        }, this);
        
        this._warningBox.setMessage(messageNode);
      },
      
      _onRemoveMention: function (mentionedUser) {
        var index = array.indexOf(this._invalidMentions, mentionedUser);
        if (index !== -1) {
          this._invalidMentions.splice(index, 1);
          this._updateWarning();
        }
      },
      
      _save: function () {
        this.emit("save", {commentBox: this});
      },
      
      _cancel: function () {
        this.reset();
        this.emit("cancel", {commentBox: this});
      },
      
      onsave: function () {},
      oncancel: function () {}
   });
});
