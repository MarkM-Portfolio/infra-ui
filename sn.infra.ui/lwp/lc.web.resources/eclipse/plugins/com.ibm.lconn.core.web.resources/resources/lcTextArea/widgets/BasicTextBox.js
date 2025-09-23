/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * @namespace lconn.core.lcTextArea.widgets
 */

(function() {
dojo.provide("lconn.core.lcTextArea.widgets.BasicTextBox");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.core.ckeditor");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.lcTextArea.mixins.ITextBoxUtils");
dojo.require("lconn.core.lcTextArea.mixins.ITextBoxControl");
dojo.require("lconn.core.lcTextArea.mixins.ITextBoxSupport");
dojo.require("lconn.core.lcTextArea.mixins.IMentionsSupport");
dojo.require("lconn.core.lcTextArea.mixins.IMentionsSupportRTE");
dojo.require("lconn.core.config.features");

dojo.require("lconn.core.lcTextArea.providers.MentionsProvider");

dojo.requireLocalization("lconn.core.lcTextArea.widgets", "BasicTextBox");

/*
 * FIXME: hardcoded sizes
 */
var FONT_SIZE = 18, MARGIN = 11;
var has = lconn.core.config.features;

/*
 * Strips HTML by reading its textContent and removing hidden nodes from mentions
 */
function stripHTML(html, mentionsEnabled) {
   // CKEditor returns <BR />  for new lines only when pasting content :S
   html = dojo.isIE == 8 ? html.replace(/<\/p><p>/gi, '\n').replace(/<br \/><br \/>/gi, '<br \/>') : html.replace(/<br \/>/gi, '\n');
   // dojo.toDom doesnt work with IE + html = "<p>asd</p><p>&nbsp;</p>" replacing internal </p><p>
   var dummy = dojo.toDom(html),
      result = '';
   // textContent not supported by IE8
   if (dojo.isIE == 8) {
      result = dummy.innerHTML == '&nbsp;' ? '' : (dummy.innerText || '');
   }
   else {
      result = dummy.textContent || '';
   }
   if (mentionsEnabled) {
      // remove mentions hidden elements...
      var listOfIgnores = dojo.query(".x-lconn-userid", dummy);
      listOfIgnores.forEach(
            function(node) {
               result = result.replace(node.innerText || node.textContent, '');
               }
            );
      // removing ZWS
      result = result.replace(/\u200b/gi, '');
   }
   return result == '\u00a0' ? '' : result;
}

/*
 * Wraps shadow text into a span with color TODO: use CSS
 */
function wrapShadowText(text) {
   return '<span style="color:#666">' + text + '</span>';
}

/*
 * Returns true when the RTE should be loaded
 */
function useRTE(textbox) {
   return textbox.useRTE || has("ckeditor-lite-mentions");
}

/*
 * Adds a function to be executed when the rich text editor is loaded
 */
function addOnRTELoad(fn) {
   if (!useRTE(this)) {
      return;
   }
   if (this._editor) {
      fn.call(this);
   }
   else {
      this.onRTELoadFn.push(fn);
   }
}

/*
 * Removes a mention, can be called as a result of a rejected promise
 */
function removeMention(args) {
   // The mention knows how to remove itself
   if (args && dojo.isFunction(args.remove)) {
      args.remove();
   }
}

dojo.declare("lconn.core.lcTextArea.widgets.BasicTextBox", [dijit._Widget, dijit._Templated, lconn.core.lcTextArea.mixins.ITextBoxUtils, lconn.core.lcTextArea.mixins.ITextBoxControl], /** @lends lconn.core.lcTextArea.widgets.BasicTextBox.prototype */ {
   // Mapping "onkeypress", "oninput" and "onpropertychange" events to a same
   // method
   // this method likely to be called multiple times when user inputting
   // something
   // but this is necessary, because different browsers support different events
   // TODO: investgate it into detail, which browser support which events, so
   // that we could minimize the registered events and method call
   templateString: "<div class=\"lotusFieldEmphasis\"><textarea class=\"lotusText bidiAware\" dojoAttachPoint=\"textAreaNode\" autocomplete=\"off\">${shadowText}</textarea></div>",

   /**
    * Array of functions that will be called when CKEditor is loaded
    */
   onRTELoadFn: [],
   /**
    * Shadow text displayed in gray when the input field is empty
    */
   shadowText: "",
   /**
    * The title of the text area.
    */
   title: "",
   /**
    * XHR handler, behaves differently in case of OpenSocial gadgets or normal
    * widgets
    */
   xhrHandler: null,
   /**
    * Set to true to enable mentions
    */
   mentionsEnabled: true,
   /**
    * Set to true to use a CKEditor instance
    */
   useRTE: false,
   /**
    * var holder for tabKey function as a callback
    */
   keyDownCallback: null,
   /**
    * Set to true to use a CKEditor instance in the EE
    */
   isEE: false,
   /**
    * Array of subscription ids, used for cleanup
    * 
    * @private
    */
   _subs: [],
   /**
    * Array of mentions tracked by this textbox
    * 
    * @private
    */
   _mentions: [],
   /**
    * Set to true to disable the URLDetect plugin
    */
   disableURLPreview: false,
   /**
    * Object set by the consumer when they want to use a different network
    * for the TA
    */
   network: null,

   /**
    * A basic text entry widget that uses a normal HTML text area. It mixes in
    * the ITextBoxUtils and ITextBoxControl classes to give additional
    * functionality.
    * <p>
    * The only functions required are those to get and set the text.
    * 
    * @constructs
    * @author Jim J Antill <antillj@ie.ibm.com>
    */
   constructor: function(options, textNode) {
      this._strings = dojo.i18n.getLocalization("lconn.core.lcTextArea.widgets", "BasicTextBox");
      this.shadowText = this.shadowText || this._strings.SHADOW_TEXT;
      this.title = options.title || this._strings.CKE_LITE_TITLE;
      this.onRTELoadFn = [];
   },
   
   destroy: function(preserveDom) {
      // Unsubscribe topics
      dojo.forEach(this._subs, dojo.unsubscribe);
      this._subs = null;
      this._mentions = null;
      if (this._editor) {
         this._editor.destroy();
         this._editor = null;
      }
      while (this.onRTELoadFn.length > 0) {
         this.onRTELoadFn.pop();
     }
      this.inherited(arguments);
   },
   
   /**
    * Overridden method that instantiates a rich text editor if {@link #useRTE}
    * is set to true
    */
   buildRendering: function() {
      // Bypasses the {@link dijit._Templated#buildRendering} logic if we are
      // using a rich text editor
      if (useRTE(this)) {
         // Don't do this at home
         dijit._WidgetBase.prototype.buildRendering.apply(this, arguments);
         var self = this;
         var initialHeight = self.height || (self.textBoxRows || 3) * FONT_SIZE + MARGIN;
         // Setting the dataStore
         this.setDataStore(this.dataStore);
         // Setting the network object
         this.setNetwork(this.network);
         // setting the on load callback passed by the consumer
         if (self.onLoadCallback && dojo.isFunction(self.onLoadCallback)) {
            self.onRTELoadFn.push(self.onLoadCallback);
         }

         lconn.core.ckeditor.appendTo(this.domNode, {
            // loads the ckeditor lite
            lite: true,
            // are we in the EE?
            autoGrow: self.isEE,
            // The following two properties are needed to prevent CKEditor from
            // setting height to 200px
            height: initialHeight,
            width: self.width,
            title: self.title,
            autoGrow_minHeight: initialHeight,
            disableURLDetect: self.disableURLPreview,
            on : {
               instanceReady: function(ev) {
                  self._editor = ev.editor;
                  // Input event not supported in CKEditor, so fire on keyUp instead.
                  // Use 'change' when 150525 is fixed.
                  ev.editor.editable().on('keyup', function(ev){
                     self._onKeyPress.call(self, ev.data.$);
                  });
                  // Using input to calculate remaining chars when deleting with the 
                  // context menu instead of the keyboard (Chrome and FF)
                  // Use 'change' when 150525 is fixed.
                  ev.editor.editable().on('input', function(ev){
                     self._onKeyPress.call(self, ev.data.$);
                  });
                  ev.editor.editable().on('keydown', function(ev) {
                     // Make sure to pass the original event
                     self._onKeyDown.call(self, ev.data);
                  });
                  ev.editor.editable().on('drop', function(ev) {
                     // Make sure to pass the original event
                     self._onKeyPress.call(self, ev.data.$);
                  });
                  ev.editor.on('paste', function(ev) {
                     // Make sure to pass the original event
                     self._onKeyPress.call(self, ev.data.$);
                  });
                  if (self.isEE) {
                     ev.editor.on('resize', function(ev) {
                        self._onResize(ev.editor);
                     });
                  }
                  dojo.forEach(self.onRTELoadFn, function(fn) {
                     fn.call(self);
                  });
                  // Adds custom CSS classes
                  self.addCustomCSS(self.customCSS);
               },
               focus : function() {
                  self._onFocus.apply(self, arguments);
               },
               blur : function() {
                  self._onBlur.apply(self, arguments);
               }
            }
         });
         dojo.addClass(this.domNode, "lconnRTE");
      }
      else {
         this.inherited(arguments);
      }
   },

   /**
    * TODO: document
    */
   postCreate: function() {
      // Mix in any support required.
      this._mixInSupport();

      if (!useRTE(this)) {
         // Set the title on the textbox so Jaws reads it.
         dojo.attr(this.textAreaNode, "title", this.shadowText);

         // Construct an array of event callbacks that we want to send to the
         // mentionshelper.
         var eventCallbacks = {};
         eventCallbacks["onkeypress"] = dojo.hitch(this, this._onKeyPress);
         eventCallbacks["onfocus"] = dojo.hitch(this, this._onFocus);
         eventCallbacks["onblur"] = dojo.hitch(this, this._onBlur);

         if (this.mentionsEnabled) {
            this._mentionsHelper = lconn.core.lcTextArea.providers.addMentionsFeature(this.textAreaNode, eventCallbacks, null, {
               network: this.xhrHandler,
               context: this.context
            });

            // Replace the current input field with the helper's input field.
            this.textAreaNode = this._mentionsHelper.textAreaNode;
            dojo.addClass(this.textAreaNode, "bidiAware");

            this._subs.push(dojo.subscribe("lconn/core/mentions/url/entered", dojo.hitch(this, this.handleURLInput)));
         }

         // Bidi enablement
         lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.textAreaNode);
      }

      this.resetBox();

      if (useRTE(this)) {
         addOnRTELoad.call(this, this.onLoad);
         // Handle topic emitted when a URL is entered in the rich text editor
         this._subs.push(dojo.subscribe("lconn/core/ckeditor/url/entered", dojo.hitch(this, this.handleURLInput)));
         if (this.mentionsEnabled) {
            // Handle topic emitted when a mention is completed
            this._subs.push(dojo.subscribe("lconn/microblogging/mention/completed", dojo.hitch(this, this.handleMention)));
            this._subs.push(dojo.subscribe("lconn/microblogging/mention/removed", dojo.hitch(this, this.handleRemoveMention)));
         }
      }
      else {
         this.onLoad();
      }
   },

   resetBox: function() {
      if (useRTE(this)) {
         addOnRTELoad.call(this, function() {
            this.cancelActiveMentions();
            this._setInitialState();
         });
      }
      else {
         this.inherited(arguments);
      }
      this._mentions = [];
   },

   /**
    * TODO: document
    */
   resetFeature: function() {
      if (this._mentionsHelper) {
         this._mentionsHelper.resetBox();
      }
   },

   /**
    * TODO: document
    * 
    * @private
    */
   _mixInSupport: function() {
      if (this.mentionsEnabled) {
         if (useRTE(this))
            dojo.safeMixin(this, new lconn.core.lcTextArea.mixins.IMentionsSupportRTE());
         else
            dojo.safeMixin(this, new lconn.core.lcTextArea.mixins.IMentionsSupport());
      }
   },

   /**
    * Method to show the shadow text using the placeholder attribute if it's
    * available.
    * 
    * @private
    */
   _showShadowText: function() {
      if (useRTE(this)) {
         if (this.shadowText) {
            addOnRTELoad.call(this, function() {
               this._editor.document.getBody().setHtml('<span style="color:#666">' + this.shadowText + '</span>');
               this._showingShadowText = true;
            });
         }
      } else {
         // IE doesn't use the placeholder attribute so use the basic method to
         // set shadow text.
         dojo.attr(this.textAreaNode, "placeholder", this.shadowText);

         if (dojo.isIE) {
            dojo.style(this.textAreaNode, "color", "#666");
            this.inherited(arguments);
         } else {
            this.setText("");
            this._showingShadowText = true;
         }
      }
   },

   /**
    * Remove the placeholder attribute that is showing the shadow text if
    * available.
    */
   _hideShadowText: function() {
      if ( !this._showingShadowText ) {
         // shadow text not shown --> nothing to do
         return;
      }
      
      if (useRTE(this)) {
         addOnRTELoad.call(this, function() {
            this._editor.document.getBody().setHtml('');
            this._showingShadowText = false;
         });
      }
      else {
         dojo.removeAttr(this.textAreaNode, "placeholder");
         // IE doesn't use the placeholder attribute so use the basic method for
         // shadow text.
         if (dojo.isIE) {
            dojo.style(this.textAreaNode, "color", "#000");
            this.inherited(arguments);
         } 
         else {
            this._showingShadowText = false;
         }
      }
   },

   /**
    * Sets the number of rows.
    * 
    * @param {Number}
    *           rows number of rows to show.
    */
   setRows: function(rows) {
      if (useRTE(this)) {
         addOnRTELoad.call(this, function() {
            // FIXME: CKEDITOR.editor.resize bug: units are not accepted for
            // height
            // this._editor.resize('100%', rows + 'em', true, true);
            this._editor.resize('100%', rows * FONT_SIZE + MARGIN, true, true);
         });
      } else
         this.textAreaNode.rows = rows;
   },

   /**
    * Function to collapse the text box.
    */
   collapseTextBox: function() {
      if (useRTE(this)) {
         this.removeCustomCSS('lotusTextExpanded');
         this.addCustomCSS('lotusTextCollapsed');
      }
      else {
         dojo.addClass(this.textAreaNode, "lotusTextCollapsed");
      }
   },

   /**
    * Function to expand the text box.
    */
   expandTextBox: function() {
      if (useRTE(this)) {
         this.removeCustomCSS('lotusTextCollapsed');
         this.addCustomCSS('lotusTextExpanded');
      }
      else {
         dojo.removeClass(this.textAreaNode, "lotusTextCollapsed");
      }
   },

   /**
    * Function to set the text box to a readonly state.
    */
   setReadOnly: function() {
      useRTE(this) ? this._editor.setReadOnly(true) : dojo.attr(this.textAreaNode, "readonly", "readonly");
   },

   /**
    * Function to set the text box to an editable state.
    */
   setEditable: function() {
      useRTE(this) ? this._editor.setReadOnly(false) : dojo.removeAttr(this.textAreaNode, "readonly");
   },

   /**
    * TODO: document
    */
   setFocus: function() {
      if (useRTE(this)) {
         addOnRTELoad.call(this, function() {
            this._editor.focus();
         });
      }
      else {
         this.textAreaNode.focus();
      }

      this._hideShadowText();
   },

   /**
    * Returns the text in the textbox area used by the BasicTextBox.
    * 
    * @returns {String} Text in the editor.
    */
   getText: function() {
      var result = '';
      if (useRTE(this)) {
         if (this._editor) {
            this._editor.keepMentionActive = true;
            result = stripHTML(this._editor.getData(), this.mentionsEnabled);
            this._editor.keepMentionActive = false;
         }
      }
      else {
         result = this.textAreaNode.value;
      }
      return result;
   },

   /**
    * Sets the text in the textbox area used by the BasicTextBox.
    * 
    * @param {String}
    *           Text to put in the entry area.
    * @param {Boolean}
    *           Plain text only if true [Optional]
    */
   setText: function(text, plainTextOnly) {
      if (useRTE(this)) {
         addOnRTELoad.call(this, function() {
            this.setValue(text, plainTextOnly);
         });
      }
      else {
         this.textAreaNode.value = text;
      }
   },

   /**
    * Sets the attribute for the Editor
    * 
    * @param {String}
    *           state Name of the attribute.
    * @param {String}
    *           value value of the attribute.
    */
   setEditorAttr : function(state, value) {
      if (useRTE(this)) {
         addOnRTELoad.call(this, function() {
            this._editor.document.getBody().setAttribute(state, value);
         });
      }
      else {
         this.textAreaNode.setAttribute(state, value);
      }
   },

   /**
    * Returns an array of mentions. Throws an exception if the mentions feature
    * is not enabled
    * 
    * @returns An array of mentions
    */
   getMentions: function() {
      if (!this.mentionsEnabled)
         throw "The mentions feature is not enabled";
      return useRTE(this) ? this._mentions : this._mentionsHelper && this._mentionsHelper.getMentions();
   },

   /**
    * Handles subscription to the topic emitted when a URL is entered This
    * handles the wiring between the different internal implementations that
    * detect URLs, and sends a consistent topic to consumers.
    * 
    * @param {Object}
    *           args Contains the details about the URL and the editor where it
    *           was entered
    * @fires lconn/microblogging/url/entered
    */
   handleURLInput: function(args) {
      if (args.mentionsHelper === this._mentionsHelper || args.editor && args.editor === this._editor)
         dojo.publish("lconn/microblogging/url/entered", [{textbox: this, url: args.url}]);
   },

   /**
    * Handles the topic emitted when mentions are completed.
    * 
    * @param {Object}
    *           args Contains the details about the mention, the node, and the
    *           editor where it was entered
    */
   handleMention: function(args) {
      if (!args) {
         console.log("Incomplete mention topic received");
         return;
      }
      if (args.editor === this._editor && args.mention)
         this._mentions.push(args);
      var notify = this.shouldNotify(args && args.mention);
      if (!notify)
         // Remove mention immediately
         removeMention(args);
      else if (dojo.isFunction(notify.then))
         // Promise
         notify.then(function(){}, dojo.partial(removeMention, args));
   },

   /**
    * Handles the topic emitted when mentions are removed.
    * 
    * @param {Object}
    *           args Contains the details about the mention, the node, and the
    *           editor where it was entered
    */
   handleRemoveMention: function(args) {
      if (!args) {
         console.log("Incomplete mention topic received");
         return;
      }
      if (args.editor === this._editor) {
         // remove mention from this._mentions array
         this._mentions = dojo.filter(this._mentions, function(mention){
            return mention.node != args.node;
         });
      }
   },

   /**
    * Callback for whether a mention should trigger a
    * notification. Callers can mixin a method that either
    * returns a boolean value, if the answer is immediately
    * available, or a promise that will be resolved or
    * rejected at a later stage.
    * 
    * The default implementation always returns true.
    * 
    * @param {Object}
    *           mention Object containing details about the
    *           mention
    * @return {boolean|Promise} True, or a promise that will
    *         be resolved if the user should be notified
    */
   shouldNotify : function(mention) {
      return true;
   },

   /**
    * Sets the header on the typeahead menu. Useful if the user must be informed
    * of restrictions on selection
    * 
    * @param {String}
    *           s Text for header of typeahead dropdown.
    */
   setTypeAheadHeader : function(s) {
      if (useRTE(this)) {
         addOnRTELoad.call(this, function() {
            this._editor.plugins.mentions.setTypeaheadHeader(s);
         });
      }
      else {
         this._mentionsHelper && this._mentionsHelper.setTypeaheadHeader(s);
      }
   },
   
   /**
    * Adds a callback to the mentions.
    * 
    * @param {String}
    *           handle String handle for the callback
    * @param {Function}
    *           callback Function to hook onto the callback
    */
   addMentionsCallback : function(handle, callback) {
      if (useRTE(this)) {
         addOnRTELoad.call(this, function() {
            this._editor.plugins.mentions.addCallback(handle, callback, this._editor);
         });
      }
      else {
         this._mentionsHelper && this._mentionsHelper.addCallback(handle, callback);
      }
   },

   /**
    * Sets the default data store used to retrieve the results for the tyepahead (RTE only)
    * 
    * @param {Object}
    *           Object with the new data store
    */
   setDataStore : function(dataStore) {
      if (dataStore) {
         addOnRTELoad.call(this, function() {
            this._editor.plugins.mentions.setDataStore(dataStore);
         });
      }
   },

   /**
    * Sets the default data store used to retrieve the results for the tyepahead (RTE only)
    * 
    * @param {Object}
    *           Object with the new data store
    */
   setNetwork : function(network) {
      if (network) {
         addOnRTELoad.call(this, function() {
            this._editor.plugins.mentions.setNetwork(network);
         });
      }
   },

   /**
    * Adds the custom CSS class to the body and contents of the editor (RTE only)
    * 
    * @param {String}
    *           name of the class to be added
    */
   addCustomCSS : function(cssClass) {
      if (cssClass) {
         addOnRTELoad.call(this, function() {
            cssClass.split(' ').forEach(function(className){
               this._editor.document.getBody().addClass(className);
               this._editor.ui.space('contents').addClass(className);
            }, this);
         });
      }
   },

   /**
    * Removes the custom CSS class to the body and contents of the editor (RTE only)
    * 
    * @param {String}
    *           name of the class to be removed
    */
   removeCustomCSS : function(cssClass) {
      if (cssClass) {
         addOnRTELoad.call(this, function() {
            this._editor.document.getBody().removeClass(cssClass);
            this._editor.ui.space('contents').removeClass(cssClass);
         });
      }
   },

   /**
    * Returns a boolean with the focus info of the editor (RTE Only)
    * 
    * @returns true if the editor is focused
    */
   isFocused : function() {
      if (useRTE(this)) {
         return this._editor && this._editor.focusManager && this._editor.focusManager.hasFocus;
      }
   },

   /**
    * Callers can connect to this method to be notified when the text box has
    * finished initialization
    */
   onLoad: function() {
      dojo.publish('lconn/core/lcTextArea/BasicTextBox/loaded', [this]);
   }
});

})();