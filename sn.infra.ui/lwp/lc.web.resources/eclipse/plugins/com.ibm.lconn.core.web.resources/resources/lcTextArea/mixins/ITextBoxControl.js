/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * This mixin provides the following functionality for the Sharebox:
 * <ul><li>Calling of callback for when the text area is empty/filled</li>
 * <li>Calling of callback when the max length has been reached</li>
 * <li>Hiding/Showing of number of characters based upon a configurable limit</li>
 * <li>Hiding/Showing of shadow text.</li></ul>
 * <p>
 * The mixin can be used in conjunction with the ITextBoxUtils mixin. As with that mixin
 * the containing class must provide the following functions:
 * <p>
 * The class this is being mixed into must supply two functions:
 * <dl><dt>getText()</dt><dd>Returns the text in the textbox as a String</dd>
 * <dt>setText(s)</dt><dd>Sets the text in the textbox to the value in the parameter passed in.</dd></dl>
 * <p>
 * The following attributes can be overriden to customize behaviour:
 *       charRemainingAriaText      Text to be displayed as an aria label for the character count.
 *       charRemainingDisplay    Node that will be used to show the number of characters remaining.
 *                            The node passed in can either be the actual node to display chars in
 *                            or a container for that node. If it's a container then the field to
 *                            show chars in must be given the class "charDisplay".
 *                            A node of class "ariaCharLabel" can also be specified that contains
 *                            text to be read in a live region by Jaws.
 *       maxByteLength           Maximum length of the allowed text in bytes
 *       maxLength               Maximum length of the allowed text in characters
 *    onFocusCallback            Callback fired when the control gets focus.
 *    onBlurCallback          CAllback fired when the control loses focus.
 *       reachedCharLimitCallback   Callback fired when the character limit has been reached.
 *       shadowText              Text to be displayed when the textfield is empty.
 *       showRemainingLimit:     The limit at which the characters left becomes visible.
 *       textPopulatedCallback      Callback that is invoked when the text area changes between empty and
 *                            having something in it.
 * <p>
 * The following functions can be hooked into to carry out actions:
 *
 *       _onFocus Hook to be activated when the textbox gets focus
 *       _onBlur     Hook to be activated when the textbox loses focus
 *       _onKeypress Hook to be activated when a character is entered into the text area
 * <p>
 * The following functions can be used to affect the textbox:
 *
 *       resetBox Resets the textbox to be empty and puts any shadow text in
 * <p>
 * Other functions can be added by mixing in the ITextBoxUtils class. See that class for full documentation.
 * @mixin lconn.core.lcTextArea.mixins.ITextBoxControl
 * @author Jim J Antill <antillj@ie.ibm.com>
 * @mixin lconn.core.lcTextArea.mixins.ITextBoxControl
 */

dojo.provide("lconn.core.lcTextArea.mixins.ITextBoxControl");

dojo.require("lconn.core.util.text");
dojo.require("lconn.core.lcTextArea.mixins.ITextBoxUtils");

dojo.declare("lconn.core.lcTextArea.mixins.ITextBoxControl", lconn.core.lcTextArea.mixins.ITextBoxUtils,
      /** @lends lconn.core.lcTextArea.mixins.ITextBoxControl.prototype */ {
   showRemainingLimit: 50,
   maxLength: 1000,
   charRemainingDisplay: null,
   charRemainingAriaText: "",
   reachedCharLimitCallback: null,
   textPopulatedCallback: null,
   onFocusCallback: null,
   onBlurCallback: null,

   _charRemainingDisplayNode: null,
   _charRemainingAriaNode: null,
   _previousCharLimitCall: false,
   _showingCharsRemaining: false,
   _previousEmpty:true,

   /**
    * Reset the widget, clearing out the text box.
    */
   resetBox: function() {
      this._setInitialState();
   },

   /**
    * TODO: document
    * @private
    */
   _showShadowText: function() {
      if (this._showingShadowText)
         return;
      this.setText(this.shadowText);
      this._showingShadowText = true;
   },

   /**
    * TODO: document
    * @private
    */
   _hideShadowText: function() {
      if (!this._showingShadowText)
         return;
      // need the following to prevent IE from removing the content when using setValue
      if (this.shadowText == this.getText()) {
         this.setText("");
      }
      this._showingShadowText = false;
   },

   /**
    * By default the initial state will be an empty checkbox with the shadow text displayed.
    * @private
    */
   _setInitialState: function() {
      this._showShadowText();

      if(this.resetFeature) {
         this.resetFeature();
      }

      // If we have been given a field to show chars search for the field to show the chars in.
      if (this.charRemainingDisplay) {
         var displayFields = dojo.query(".charDisplay", this.charRemainingDisplay);
         this._charRemainingDisplayNode = (displayFields && displayFields.length > 0) ? displayFields[0] : this.charRemainingDisplay;

         var ariaFields = dojo.query(".ariaCharLabel", this.charRemainingDisplay);
         this._charRemainingAriaNode = (ariaFields && ariaFields.length > 0) ? ariaFields[0] : null;
      }

      // Set showingCharsRemaining to true - it will be hidden by the calculateRemainingChars function if needed.
      this._showingCharsRemaining = true;

      this._calculateRemainingChars();
      this._previousCharLimitCall=false;
      this._previousEmpty = true;
   },

   /**
    * Shows the number of characters remaining if it is below the
    * given limit.
    * @private
    * @param {Number} noChars Number of chars in text box.
    */
   _showCharsRemaining: function(noChars) {
      if (noChars > this.showRemainingLimit) {
         if (this._showingCharsRemaining) {
            dojo.style(this.charRemainingDisplay,"display","none");

            // Clear the remaining char field and aria text so it can't be read by the Jaws virtual cursor.
            this._charRemainingDisplayNode.innerHTML = "";

            if (this._charRemainingAriaNode) {
               this._charRemainingAriaNode.innerHTML = "";
            }

            this._showingCharsRemaining = false;
         }
      } else {
         if (!(this._showingCharsRemaining)) {
            dojo.style(this.charRemainingDisplay,"display","inline");
            this._showingCharsRemaining = true;
         }
         this._charRemainingDisplayNode.innerHTML = noChars;

         // It's probable the aria label for chars remaining is in a live region. If so we need to repopulate the text
         // in order for Jaws to re-read it.
         if (this._charRemainingAriaNode) {
            this._charRemainingAriaNode.innerHTML = this.charRemainingAriaText;
         }
      }
   },

   /**
    * Calculate the number of remaining characters.
    * @private
    */
   _calculateRemainingChars: function() {
      var textInEditor = this.getText();
      var noCharsInTextArea = lconn.core.util.text.trim(textInEditor).length ?
            lconn.core.util.text.length(textInEditor) : 0;

      // If the shadow text is being shown then we have the maximum number of characters left.
      var remainingChars = (!this._showingShadowText) ? this.maxLength - noCharsInTextArea : this.maxLength;

      if (this._charRemainingDisplayNode) {
         this._showCharsRemaining(remainingChars);
      }

      // Invoke the callback to handle the character limit being exceeded.
      if (this.reachedCharLimitCallback) {
         if (remainingChars < 0) {
            this.reachedCharLimitCallback(true);
            this._previousCharLimitCall=true;
         } else {
            if (remainingChars >=0 && this._previousCharLimitCall) {
               this.reachedCharLimitCallback(false);
               this._previousCharLimitCall=false;
            }
         }
      }

      // Invoke the callback when text switches from non-populated to populated and vice-versa.
      if (this.textPopulatedCallback) {
         // Only invoke the call back if the last state we notified about
         // is different.
         if ( (!noCharsInTextArea == 0 && !this._showingShadowText) != !this._previousEmpty) {
            this.textPopulatedCallback(noCharsInTextArea==0 || this._showingShadowText);
            this._previousEmpty = !this._previousEmpty;
         }
      }

   },

   /**
    * Executed when the text area gets focus.
    *
    * FIXME: this is never invoked when useRTE==false && mentionsEnabled==false
    * @private
    */
   _onFocus: function() {
      // If we have the show text then replace with blank.
      if (this._showingShadowText) {
         this._hideShadowText();
      }

      if (this.onFocusCallback) {
         this.onFocusCallback();
      }
   },

   /**
    * Executed when the text area loses focus.
    *
    * FIXME: this is never invoked when useRTE==false && mentionsEnabled==false
    * @private
    */
   _onBlur: function() {
      // If the box is empty then replace with the shadow text.
      if (this.getText().length == 0) {
         this._showShadowText();
      }else if(this.isIE11){
         //TODO: once CKE IE11 event handling is updated this should be removed.
         this._calculateRemainingChars();
      }
      

      if (this.onBlurCallback) {
         this.onBlurCallback();
      }
   },
   
   /**
    * Executed when a keyDown is made in the text area.
    *
    */
   _onKeyDown: function(ev) {
      //if key callback has been created ,call it.
      if(this.keyDownCallback && dojo.isFunction(this.keyDownCallback)){
         this.keyDownCallback(ev);
      }
   },

   /**
    * Executed when a keypress is made in the text area.
    *
    * FIXME: this is never invoked when useRTE==false && mentionsEnabled==false
    * @private
    */
   _onKeyPress: function() {
      // Always clear shadow text on key press to resolve a bug in
      // Chrome where focus stays in the field when cancelling the
      // comment in the EE
      if (dojo.isChrome && this._showingShadowText) {
         this._hideShadowText();
      }

      setTimeout(dojo.hitch(this, function() {
         this._calculateRemainingChars();
      }), 50);
   },

   /**
    * Executed when a the RTE changes its height. It creates a new topic with that info.
    * @private
    * @param {Object} editor that is being resized
    */
   _onResize: function(editor) {
      dojo.publish("lconn/core/basictextbox/resized", [{
         height : editor.container.$.clientHeight,
         editor : editor
      }]);
   }
});
