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

dojo.provide("lconn.core.ckeditorstaticutil");

/**
 * Include this module if you wish to take a static dependency on the CKEditor
 * (it is loaded whenever your module is loaded. Otherwise, use
 * lconn.core.ckeditor.replaceAsync to load CKEditor on demand.
 */
dojo.require("lconn.core.widget.mentions.utilities");

(function(utils) {

   /*
    * Redefine CKEDITOR.editor.getData to sanitize HTML
    */
   var getData = CKEDITOR.editor.prototype.getData;
   CKEDITOR.editor.prototype.getData = function() {
      // publish event so we can cancel mentions that are in progress
      if (!this.keepMentionActive){
         dojo.publish('CKEDITOR.beforeGetData');
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
      var data = arguments[0];
      var callback = arguments[1];

      arguments[1] = function() {
         if (this.document && this.document.$) {
            // Grab any mentions <span> elements
            var mentions = this.document.$.querySelectorAll('span.vcard');
            if (dojo.exists("SemTagSvc")) {
               dojo.forEach(mentions, function(current) {
                  current.setAttribute('contenteditable', false);
                  SemTagSvc.parseDom(0, current);
               });
            }
         }
         // If there was a callback, we call it now using original arguments,
         // updated with our 'data' adjustments above.
         if (dojo.isFunction(callback)) {
            callback.apply(null, arguments);
         }
      }
      setData.apply(this, arguments);
   };

}(lconn.core.widget.mentions.utilities));
