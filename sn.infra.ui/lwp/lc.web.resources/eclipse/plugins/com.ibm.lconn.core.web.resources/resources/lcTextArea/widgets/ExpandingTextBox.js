/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.lcTextArea.widgets.ExpandingTextBox");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.Textarea");

dojo.require("lconn.core.lcTextArea.mixins.ITextBoxUtils");
dojo.require("lconn.core.lcTextArea.mixins.ITextBoxControl");
dojo.require("lconn.core.lcTextArea.mixins.IMentionsSupport");
dojo.require("lconn.core.lcTextArea.mixins.ITextBoxSupport");
dojo.require("lconn.core.lcTextArea.providers.MentionsProvider");

dojo.requireLocalization("lconn.core.lcTextArea.widgets", "ExpandingTextBox");

/**
 * @mixin lconn.core.lcTextArea.widgets.ExpandingTextBoxSupport
 */
dojo.declare("lconn.core.lcTextArea.widgets.ExpandingTextBoxSupport", null, /** @lends lconn.core.lcTextArea.widgets.ExpandingTextBoxSupport.prototype */ {

   getText: function() {
      if (this._showingShadowText)
         return "";

      var value = this.textArea.attr("value");
      return (value ? value.replace(/^\s*/,"") : "");
   },

   setText: function(text) {
      this.textArea.attr("value", text);
   }
});

/**
 * A text entry widget that uses a dijit.form.Textarea to give an expanding text
 * field. It mixes in the ITextBoxControl class to give additional
 * functionality.
 *
 * @class lconn.core.lcTextArea.widgets.ExpandingTextBox
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @extends lconn.core.lcTextArea.mixins.ITextBoxControl
 * @author Jim Antill <antillj@ie.ibm.com>
 */
dojo.declare("lconn.core.lcTextArea.widgets.ExpandingTextBox",
      [ dijit._Widget, dijit._Templated, lconn.core.lcTextArea.mixins.ITextBoxControl ],
            /** @lends lconn.core.lcTextArea.widgets.ExpandingTextBox.prototype */ {
   // FIXME: use templatePath, move template to separate HTML file
   templateString : "<div style=\"padding-bottom: 0px;\" class=\"lotusFieldEmphasis\"><textarea dojoAttachPoint=\"textBoxNode\"></textarea></div>",

   shadowText: "",
   textAreaNode: null,
   mentionsEnabled: false,
   textAreaClass: "dijit.form.Textarea",

   startup: function() {
      this.resetBox();
   },

   postCreate: function(options, textNode) {
      this._strings = dojo.i18n.getLocalization("lconn.core.lcTextArea.widgets", "ExpandingTextBox");
      this.shadowText = this.shadowText || this._strings.SHADOW_TEXT;

      var opts = this._getTextAreaOpts();

      // Create a text area.
      var taClass = dojo.getObject(this.textAreaClass);
      this.textArea = new taClass(opts, this.textBoxNode);
      var tanode = this.textAreaNode = this.textArea.domNode;
      dojo.attr(tanode, "placeholder", this.shadowText);
      dojo.attr(tanode, "autocomplete", "off");
      dojo.attr(tanode, "title", this.shadowText);
      dojo.attr(tanode, "aria-label", this.ariaLabel || this.shadowText);
      this.connect(tanode, "onkeypress", "_onKeyPress");
      this.connect(tanode, "oninput", "_onKeyPress");
      this.connect(tanode, "onpropertychange", "_onKeyPress");
      this.connect(tanode, "onpaste", "_onKeyPress");
      if (!this.mentionsEnabled) {
         this.connect(tanode, "onfocus", "_onTextAreaFocus");
         this.connect(tanode, "onblur","_onTextAreaBlur");
         this._onFocus = this._onBlur = function() { };
      }
      this.connect(this.textArea, "onChange", "onChange");

      if (this.mentionsEnabled) {
         dojo.safeMixin(this, new lconn.core.lcTextArea.mixins.IMentionsSupport());
         // Construct an array of event callbacks that we want to send to the mentionshelper.
         var eventCallbacks = [];
         var ta = this.textArea;
         eventCallbacks["onkeypress"] = dojo.hitch(this, this._onKeyPress);
         eventCallbacks["onfocus"] = dojo.hitch(this, this._onFocus);
         eventCallbacks["onblur"] = dojo.hitch(this, this._onBlur);

         this._mentionsHelper =
             lconn.core.lcTextArea.providers.addMentionsFeature(this.textAreaNode, eventCallbacks, null, {"network":this.memberStore.network, isEE : this.isEE});

         // Replace the current input field with the helper's input field.
         this.textAreaNode = this._mentionsHelper.textAreaNode;
         this.connect(this.textAreaNode, "onkeypress", "onChange");
         this.connect(this.textAreaNode, "oninput", "onChange");
         this.connect(this.textAreaNode, "onpropertychange", "onChange");
         this.connect(this.textAreaNode, "onpaste", "onChange");
         this.connect(this.textAreaNode, "oncut", "onChange");

         this.getText = function() {
        	//Defect 133574 - [IE11] 'Add a comment' works as input in Files&ECM EE after backspace a non-member mention in private community
            //Checking the style of the shadow text to see if it should be treated as one 
            var isShadowStyle = (dojo.getStyle(this.textAreaNode,"color") == "rgb(0, 0, 0)");
            isShadowStyle = !isShadowStyle;
             
            if (this._showingShadowText && isShadowStyle)
               return "";
            return lconn.core.lcTextArea.mixins.IMentionsSupport.prototype.getText.apply(this);
         }
      }
      else {
         dojo.safeMixin(this, new lconn.core.lcTextArea.widgets.ExpandingTextBoxSupport());
      }
   },

   /**
    * Method to show the shadow text using the placeholder attribute if it's available.
    **/
   _showShadowText: function() {
      if (this._showingShadowText)
         return;
      // IE doesn't use the placeholder attribute so use the basic method to set shadow text.
      dojo.attr(this.textAreaNode,"placeholder", this.shadowText);
      if (dojo.isIE) {
         dojo.style(this.textAreaNode,"color","#a9a5a2");
         this.inherited(arguments);
      } else {
         this.setText("");
         this._showingShadowText = true;
      }
   },

   resetFeature : function() {
      if(this._mentionsHelper) {
         this._mentionsHelper.resetBox();
      }
   },

   /**
    * Remove the placeholder attribute that is showing the shadow text if available.
    **/
   _hideShadowText: function() {
      if (!this._showingShadowText)
         return;
      dojo.removeAttr(this.textAreaNode,"placeholder");
      // IE doesn't use the placeholder attribute so use the basic method for shadow text.
      if (dojo.isIE) {
         dojo.style(this.textAreaNode,"color","#000");
         this.inherited(arguments);
      } else {
         this._showingShadowText = false;
      }
   },

   setFocus: function() {
      this.textAreaNode.focus();
      this._hideShadowText();
   },

   _getTextAreaOpts: function() {
      var opts = {
         baseClass: "lotusText",
         intermediateChanges: true
      };
      if (this.textAreaOpts) {
         dojo.mixin(opts, this.textAreaOpts);
      }
      return opts;
   },

   onChange: function () { },
   _onFocus: function () {
      this.inherited(arguments);
      this.onFocus();
   },
   _onBlur: function () {
      this.inherited(arguments);
      this.onBlur();
   },
   _onTextAreaFocus: function() {
      lconn.core.lcTextArea.mixins.ITextBoxControl.prototype._onFocus.apply(this, arguments);
      this.onFocus();
   },

   _onTextAreaBlur: function() {
      lconn.core.lcTextArea.mixins.ITextBoxControl.prototype._onBlur.apply(this, arguments);
      this.onBlur();
   }
});
