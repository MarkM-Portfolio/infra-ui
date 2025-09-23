/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/has"
], function (declare, has) {

   /**
    * Rich textbox controls for Connections microblogging.
    * @namespace ic-core.lcTextArea
    */
   /**
    * Mixins for textbox controls for Connections microblogging.
    * @namespace ic-core.lcTextArea.mixins
    */
   /**
    * Interface that supports the mentions feature.
    * <p>
    * The interface provides attributes used to support the mentions feature,
    * allowing the attributes to be mixed in or supplied by the implementing class.
    * <p>
    * If the mentions feature is enabled in the BasicTextBox then textbox this
    * class should be mixed in.
    *
    * @mixin ic-core.lcTextArea.mixins.IMentionsSupport
    * @author Jim J Antill <antillj@ie.ibm.com>
    */

   function check() {
      if (!this._mentionsHelper) {
         console.warn('IMentionsSupport requires that the mixed-in class has a _mentionsHelper member');
         return false;
      }
      return true;
   }

   var IMentionsSupport = declare("lconn.core.lcTextArea.mixins.IMentionsSupport", null, /** @lends ic-core.lcTextArea.mixins.IMentionsSupport.prototype */ {
      /**
       * A mentions helper associated to this text box
       *
       * @type {core.widget.mentions.MentionsHelper}
       */
      _mentionsHelper: null,

      /**
       * Get the mentions that are contained in the textbox.
       *
       * @returns {Object} An object containing details of mentions.
       */
      getTrackedMentions: function() {
         return check.apply(this) ?
               this._mentionsHelper.getTextAsJson() : null;
      },

      /**
       * Returns the text in the textbox area used by the textbox.
       *
       * @returns {String} the text with leading spaces removed.
       */
      getText: function() {
         return check.apply(this) ?
               this._mentionsHelper.getText().replace(/^\s*/,"") : null;
      },

      /**
       * Sets the text in the textbox area used by the textbox.
       *
       * @param {String}
       *           text Text to put in the textbox.
       */
      setText: function(text) {
         if (check.apply(this))
            this._mentionsHelper.setText(text);
      },

      /**
       * Adds a callback to the mentions helper.
       *
       * @param {String}
       *           handle String handle for the callback
       * @param {Function}
       *           callback The callback
       */
      addMentionsCallback: function(handle, callback) {
         if (check.apply(this))
            this._mentionsHelper.addCallback(handle, callback);
      },

      /**
       * Sets the header on the typeahead menu. Useful if the user must be informed
       * of restrictions on selection
       *
       * @param {String}
       *           s Text for header of typeahead menu.
       */
      setTypeAheadHeader: function(s) {
         if (check.apply(this))
            this._mentionsHelper.setTypeaheadHeader(s);
      },

      formatForPlaintext : function(str) {
         return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
     },
     
      /**
       * Sets the contents of this text box.
       * 
       * @param {String}
       *           value Can be a mixture of plain text and mention
       *           microformat, both HTML or plain text.
       */
      setValue : function(value, plainTextOnly) {
         if(this._mentionsHelper && this._mentionsHelper._isTracking){
            this._mentionsHelper.cancelMention();
         }
         if(plainTextOnly){
            value = this.formatForPlaintext(value);
         }
         if (check.apply(this)){
            this._mentionsHelper.setValue(value);
         }else{
            //this.textAreaNode.innerHTML = value.replace(/(\r\n|\n|\r)/gm,"");
            var valueNode = dojo.toDom(value.replace(/(\r\n|\n|\r)/gm,""));
            dojo.empty(this.textAreaNode);
            this.textAreaNode.appendChild(valueNode);
         }
      },

      /**
       * Gets the contents of this text box.
       * 
       * @param {Boolean}
       *           will return the content of the textbox + mention 
       *           in plain text @{displayName|userID} if set to true
       * @returns {String} text contents of the text box.
       */
      getValue: function(plainTextOnly) {
         if (plainTextOnly) {
            if(this._mentionsHelper && this._mentionsHelper._isTracking){
               if(has("chrome")){
                  this._mentionsHelper.plainTextChromeCancelMention();
               }else{
                  this._mentionsHelper.cancelMention();
               }
            }
            return check.apply(this) ? this._mentionsHelper.getText(plainTextOnly).replace(/^\s*/, "")
                  : null;
         }
         else {
            return this.textAreaNode.innerHTML;
         }
      }
   });

   return IMentionsSupport;
});
