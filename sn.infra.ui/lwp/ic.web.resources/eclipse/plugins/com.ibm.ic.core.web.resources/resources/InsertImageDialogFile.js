/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/cache",
      "dojo/i18n!./nls/insertimagedialog",
      "dojo/_base/declare",
      "dojo/dom-class",
      "dojo/i18n",
      "dojo/string",
      "dojo/text!./templates/InsertImageDialogFile.html",
      "dijit/_Templated",
      "dijit/_Widget",
      "./util/html",
      "./util/text",
      "./utilities"
], function(dojo, cache, i18ninsertimagedialog, declare, domClass, i18n, string, template, _Templated, _Widget, html, text, utilities) {

   var messages = i18ninsertimagedialog;

   var InsertImageDialogFile = declare("lconn.core.InsertImageDialogFile", [
         _Widget,
         _Templated
   ], {

      messages : messages,
      templateString : template,

      /* mixins */
      file : null,

      remove : function(file) {},
      /* end mixins */
      _remove : function() {
         this.remove(this);
         this.destroy();
      },

      postMixInProperties : function() {
         var name = this._fileName = this.file.getName();
         this._fileIcon = utilities.getFileIconClassName(name, 16);
      },

      _startHover : function() {
         domClass.add(this.labelRow, "lconnUploadHover");
      },

      _stopHover : function() {
         domClass.remove(this.labelRow, "lconnUploadHover");
      }
   });

   return InsertImageDialogFile;
});
