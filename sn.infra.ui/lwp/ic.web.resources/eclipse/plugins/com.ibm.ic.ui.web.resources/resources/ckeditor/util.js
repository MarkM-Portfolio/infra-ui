/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Include this module if you want a static dependency on the CKEditor. It will
 * be loaded whenever your module is loaded. Otherwise, use
 * {@link ic-ui.ckeditor#replaceAsync} to load CKEditor on demand.
 * 
 * @namespace ic-ui.ckeditor.static
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

define([
        "dojo/_base/lang",
        "dojo/_base/array",
        "ic-core/widget/mentions/utilities",
        "dojo/topic"
], function(lang, array, utils, topic) {

   /*
    * Redefine CKEDITOR.editor.getData to sanitize HTML
    */
   var getData = CKEDITOR.editor.prototype.getData;
   CKEDITOR.editor.prototype.getData = function() {
      // publish event so we can cancel mentions that are in progress
      if (!this.keepMentionActive){
         topic.publish('CKEDITOR.beforeGetData');
      }
      var data = getData.apply(this, arguments);
      // clean up mentions code
      data = utils.cleanupHTML(data);
      return data;
   };

   /*
    * Redefine CKEDITOR.editor.setData to make mentions immutable and attach
    * bizcards
    */
   var setData = CKEDITOR.editor.prototype.setData;
   CKEDITOR.editor.prototype.setData = function() {
      var callback = arguments[1];

      arguments[1] = function() {
         if (this.document && this.document.$) {
            // Grab any mentions <span> elements
            var mentions = this.document.$.querySelectorAll('span.vcard');
            if (lang.exists("SemTagSvc")) {
               array.forEach(mentions, function(current) {
                  current.setAttribute('contenteditable', false);
                  lang.getObject("SemTagSvc").parseDom(0, current);
               });
            }
         }
         // If there was a callback, we call it now using original arguments,
         // updated with our 'data' adjustments above.
         if (lang.isFunction(callback)) {
            callback.apply(null, arguments);
         }
      };
      setData.apply(this, arguments);
   };

});
