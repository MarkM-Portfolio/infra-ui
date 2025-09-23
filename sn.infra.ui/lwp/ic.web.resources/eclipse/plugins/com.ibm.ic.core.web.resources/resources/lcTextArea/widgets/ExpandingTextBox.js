/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/lang",
      "dojo/_base/declare",
      "dojo/i18n",
      "dojo/dom-attr",
      "dojo/i18n!./nls/ExpandingTextBox",
      "dojo/has",
      "dojo/dom-style",
      "dijit/_Templated",
      "dijit/_Widget",
      "dijit/form/Textarea",
      "../mixins/IMentionsSupport",
      "../mixins/ITextBoxControl",
      "../mixins/ITextBoxSupport",
      "../mixins/ITextBoxUtils",
      "../providers/MentionsProvider"
],
   function(dojo, lang, declare, i18n, domAttr, i18nExpandingTextBox, has, domStyle, _Templated, _Widget, Textarea, IMentionsSupport, ITextBoxControl, ITextBoxSupport, ITextBoxUtils, MentionsProvider) {

      /**
       * @mixin ic-core.lcTextArea.widgets.ExpandingTextBoxSupport
       */
      var ExpandingTextBoxSupport = declare("lconn.core.lcTextArea.widgets.ExpandingTextBoxSupport", null, /** @lends ic-core.lcTextArea.widgets.ExpandingTextBoxSupport.prototype */
      {

         getText : function() {
            if (this._showingShadowText)
               return "";

            var value = this.textArea.get("value");
            return (value ? value.replace(/^\s*/, "") : "");
         },

         setText : function(text) {
            this.textArea.set("value", text);
         }
      });

      /**
       * A text entry widget that uses a dijit.form.Textarea to give an
       * expanding text field. It mixes in the ITextBoxControl class to give
       * additional functionality.
       * 
       * @class ic-core.lcTextArea.widgets.ExpandingTextBox
       * @extends dijit._Widget
       * @extends dijit._Templated
       * @extends ic-core.lcTextArea.mixins.ITextBoxControl
       * @author Jim Antill <antillj@ie.ibm.com>
       */
      var ExpandingTextBox = declare("lconn.core.lcTextArea.widgets.ExpandingTextBox", [
            _Widget,
            _Templated,
            ITextBoxControl
      ],
      /** @lends ic-core.lcTextArea.widgets.ExpandingTextBox.prototype */
      {
         // FIXME: use templatePath, move template to separate HTML file
         templateString : "<div style=\"padding-bottom: 0px;\" class=\"lotusFieldEmphasis\"><textarea dojoAttachPoint=\"textBoxNode\"></textarea></div>",

         shadowText : "",
         textAreaNode : null,
         mentionsEnabled : false,
         // FIXME: you can't load dependencies synchronously
         textAreaClass : "dijit.form.Textarea",

         startup : function() {
            this.resetBox();
         },

         postCreate : function(options, textNode) {
            this._strings = i18nExpandingTextBox;
            this.shadowText = this.shadowText || this._strings.SHADOW_TEXT;

            var opts = this._getTextAreaOpts();

            // Create a text area.
            var taClass = lang.getObject(this.textAreaClass);
            this.textArea = new taClass(opts, this.textBoxNode);
            var tanode = this.textAreaNode = this.textArea.domNode;
            domAttr.set(tanode, "placeholder", this.shadowText);
            domAttr.set(tanode, "autocomplete", "off");
            domAttr.set(tanode, "title", this.shadowText);
            domAttr.set(tanode, "aria-label", this.ariaLabel || this.shadowText);
            this.connect(tanode, "onkeypress", "_onKeyPress");
            this.connect(tanode, "oninput", "_onKeyPress");
            this.connect(tanode, "onpropertychange", "_onKeyPress");
            this.connect(tanode, "onpaste", "_onKeyPress");
            if (!this.mentionsEnabled) {
               this.connect(tanode, "onfocus", "_onTextAreaFocus");
               this.connect(tanode, "onblur", "_onTextAreaBlur");
               this._onFocus = this._onBlur = function() {};
            }
            this.connect(this.textArea, "onChange", "onChange");

            if (this.mentionsEnabled) {
               lang.mixin(this, new IMentionsSupport());
               // Construct an array of event callbacks that we want to send to
               // the
               // mentionshelper.
               var eventCallbacks = [];
               var ta = this.textArea;
               eventCallbacks["onkeypress"] = lang.hitch(this, this._onKeyPress);
               eventCallbacks["onfocus"] = lang.hitch(this, this._onFocus);
               eventCallbacks["onblur"] = lang.hitch(this, this._onBlur);

               this._mentionsHelper = lconn.core.lcTextArea.providers.addMentionsFeature(this.textAreaNode, eventCallbacks, null, {
                  "network" : this.memberStore.network,
                  isEE : this.isEE
               });

               // Replace the current input field with the helper's input field.
               this.textAreaNode = this._mentionsHelper.textAreaNode;
               this.connect(this.textAreaNode, "onkeypress", "onChange");
               this.connect(this.textAreaNode, "oninput", "onChange");
               this.connect(this.textAreaNode, "onpropertychange", "onChange");
               this.connect(this.textAreaNode, "onpaste", "onChange");
               this.connect(this.textAreaNode, "oncut", "onChange");

               this.getText = function() {
                  // Defect 133574 - [IE11] 'Add a comment' works as input in
                  // Files&ECM EE after backspace a non-member mention in
                  // private
                  // community
                  // Checking the style of the shadow text to see if it should
                  // be
                  // treated as one
                  var isShadowStyle = (domStyle.get(this.textAreaNode, "color") == "rgb(0, 0, 0)");
                  isShadowStyle = !isShadowStyle;

                  if (this._showingShadowText && isShadowStyle)
                     return "";
                  return IMentionsSupport.prototype.getText.apply(this);
               }
            }
            else {
               lang.mixin(this, new ExpandingTextBoxSupport());
            }
         },

         /**
          * Method to show the shadow text using the placeholder attribute if
          * it's available.
          */
         _showShadowText : function() {
            if (this._showingShadowText)
               return;
            // IE doesn't use the placeholder attribute so use the basic method
            // to
            // set shadow text.
            domAttr.set(this.textAreaNode, "placeholder", this.shadowText);
            if (has("ie")) {
               domStyle.set(this.textAreaNode, "color", "#a9a5a2");
               this.inherited(arguments);
            }
            else {
               this.setText("");
               this._showingShadowText = true;
            }
         },

         resetFeature : function() {
            if (this._mentionsHelper) {
               this._mentionsHelper.resetBox();
            }
         },

         /**
          * Remove the placeholder attribute that is showing the shadow text if
          * available.
          */
         _hideShadowText : function() {
            if (!this._showingShadowText)
               return;
            dojo.removeAttr(this.textAreaNode, "placeholder");
            // IE doesn't use the placeholder attribute so use the basic method
            // for
            // shadow text.
            if (has("ie")) {
               domStyle.set(this.textAreaNode, "color", "#000");
               this.inherited(arguments);
            }
            else {
               this._showingShadowText = false;
            }
         },

         setFocus : function() {
            this.textAreaNode.focus();
            this._hideShadowText();
         },

         _getTextAreaOpts : function() {
            var opts = {
               baseClass : "lotusText",
               intermediateChanges : true
            };
            if (this.textAreaOpts) {
               lang.mixin(opts, this.textAreaOpts);
            }
            return opts;
         },

         onChange : function() {},
         _onFocus : function() {
            this.inherited(arguments);
            this.onFocus();
         },
         _onBlur : function() {
            this.inherited(arguments);
            this.onBlur();
         },
         _onTextAreaFocus : function() {
            ITextBoxControl.prototype._onFocus.apply(this, arguments);
            this.onFocus();
         },

         _onTextAreaBlur : function() {
            ITextBoxControl.prototype._onBlur.apply(this, arguments);
            this.onBlur();
         }
      });
      return ExpandingTextBox;
   });
