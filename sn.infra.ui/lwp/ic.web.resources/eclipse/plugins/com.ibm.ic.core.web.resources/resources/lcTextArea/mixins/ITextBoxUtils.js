define([
	"dojo/_base/declare",
	"ic-core/util/text",
	"dojo/has"
], function (declare, textModule, has) {

	/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */
	
	/**
	 * A dojo mix in that provides functionality that the StatusUpdate boxes
	 * require.
	 * <p>
	 * The class this is being mixed into must supply two functions:
	 * <dl>
	 * <dt>getText()</dt>
	 * <dd>Returns the text in the textbox as a String</dd>
	 * <dt>setText(s)</dt>
	 * <dd>Sets the text in the textbox to the value in the parameter passed in</dd>
	 * </dl>
	 * <p>
	 * The _showingShadowText attribute must be set to "true" if showing the shadow
	 * text.
	 * <p>
	 * The following attributes can be overridden:
	 * <dl>
	 * <dt>maxLength</dt>
	 * <dd>Maximum length of the text area in characters</dd>
	 * <dt>maxByteLength</dt>
	 * <dd>Maximum length of the text area in bytes</dd>
	 * </dl>
	 * Functions provided by this mixin are:
	 * <p>
	 * <dl>
	 * <dt>getTextLength()</dt>
	 * <dd>Returns the length in characters of the entered text.</dd>
	 * <dt>getUtfLength()</dt>
	 * <dd>Returns the length in bytes of the entered text</dd>
	 * <dt>isTextTooLong()</dt>
	 * <dd>Returns if the entered text is too long. Details about the maximum
	 * length are passed into the function.</dd>
	 * </dl>
	 * 
	 * @mixin ic-core.lcTextArea.mixins.ITextBoxUtils
	 * @author Jim Antill <antillj@ie.ibm.com>
	 */
	var ITextBoxUtils = declare("lconn.core.lcTextArea.mixins.ITextBoxUtils", null, /** @lends ic-core.lcTextArea.mixins.ITextBoxUtils.prototype */ {
	
	   /**
	    * Maximum length of text in characters
	    *
	    * @type {Number}
	    */
	   maxLength: 1000,
	
	   /**
	    * Maximum length of text in bytes
	    *
	    * @type {Number}
	    */
	   maxByteLength: 4000,
	

	   /**
	    * returns true only if the browser is IE (IE11 and Edge included).
	    */
	   isIE : has('ie') || 
	      !!navigator.userAgent.match(/Trident\/7\./) ||
	      !!navigator.userAgent.match(/Edge\//),
	   /**
	    * returns true only if the browser is IE11.
	    */
	   isIE11 : !!navigator.userAgent.match(/Trident\/7\./),
	   /**
	    * returns true only if the browser is Edge.
	    */
	   isEdge : !!navigator.userAgent.match(/Edge\//),

	   /**
	    * returns true in the case that the string param is a space.
	    */
	   isSpace : function(c) {
	      // ATT: keep the '\u200b' and 'trim' call for IE8 support
	      return (c && (!!c.match(/\s|\u00a0|\u200b/i) || textModule.trim(c).length == 0));
	   },
	   
	   /**
	    * Returns the length of text in characters.
	    * <p>
	    * Note: this method returns zero if the shadow text is
	    * displayed.
	    * 
	    * @returns {Number} the length of text in characters.
	    */
	   getTextLength : function() {
	      return (this._showingShadowText) ? 0 : this.getText().length;
	   },
	
	   /**
	    * Returns the length of text in bytes.
	    * <p>
	    * Note: this method returns zero if the shadow text is
	    * displayed.
	    * 
	    * @returns {Number} the length of text in bytes
	    */
	   getUtfLength : function() {
	      return (this._showingShadowText) ? 0 : textModule.lengthUtf8(this.getText());
	   },
	
	   /**
	    * Returns true if the entered text exceeds the max length in chars or max
	    * byte count.
	    * 
	    * @param {Number}
	    *           maxchar Maximum number of characters allowed (mandatory)
	    * @param {Number}
	    *           [maxbytes] Maximum number of bytes (optional, defaults to 4000).
	    *           return {boolean} true if text is too long.
	    * @returns {boolean} true if the entered text exceeds the max length in
	    *          chars or max byte count.
	    */
	   isTextTooLong: function() {
	      var text = this.getText();
	      var maxByteLength = (this.maxByteLength && this.maxByteLength != 0) ? this.maxByteLength : 4000;
	            
	      return (text.length > this.maxLength || this.getUtfLength() > maxByteLength);
	   },
	
	   /**
	    * Gets the text. If the truncation parameter is set to true then
	    * truncated text is returned.
	    *
	    * @param {boolean}
	    *           truncate Set to true to return truncated text.
	    * @returns {String} the text of this textbox
	    */
	   getTextOutput: function(truncate) {
	      var text = this.getText();
	
	      if (truncate) {
	         var truncatePoint = this.maxLength;
	
	         if ((this.getUtfLength(text) > this.maxByteLength) && this.maxByteLength != 0) {
	            truncatePoint = textModule.getCharIndexForUtf8Index(text, this.maxByteLength);
	         }
	         text = text.substr(0, truncatePoint);
	      }
	
	      return text;
	   },

	   /**
	    * Gets the text in the editor and returns true if there is no content or
	    * only blank spaces
	    *
	    * @returns {boolen} true if no content || only spaces
	    */
	   isEmptyExceptSpaces: function() {
	      return this._showingShadowText || textModule.trim(this.getText()).length == 0;
	   }
	});
	return ITextBoxUtils;
});
