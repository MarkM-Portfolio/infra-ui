/* Copyright IBM Corp. 2012, 2014  All Rights Reserved.              */
define([
      "dojo",
      "dojo/_base/array",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/i18n",
      "dojo/i18n!../nls/strings",
      "dojo/string",
      "dojo/text!./templates/AttachedFileList.html",
      "dijit/_Widget",
      "dijit/_Templated",
      "dijit/_Container",
      "ic-ui/ckeditor/plugins/publishBinaryData",
      "./AttachedFile"
], function(dojo, array, declare, lang, i18n, i18nstrings, string, template, _Widget, _Templated, _Container, icpublishBinaryData, AttachedFile) {

   var nls = i18nstrings;
   var index = 0;

   /**
    * Widget representing a file with filename and extension as a ICS UI Filter
    * component.
    * 
    * @class ic-core.widget.AttachedFileList
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @extends dijit._Container
    * @author Cecilia Bollini <ceciliab@ie.ibm.com>
    */
   var AttachedFileList = declare("lconn.core.widget.AttachedFileList", [
         _Widget,
         _Templated,
         _Container
   ], /** @lends ic-core.widget.AttachedFileList.prototype */
   {

      /**
       * Strings used by this widget
       * 
       * @type {Object}
       */
      _strings : {
         remove_alt : nls.rs_attachedfile_remove_alt
      },

      /**
       * Template path
       * 
       * @type {String}
       */
      templateString : template,

      /**
       * File provider, handles the source of the file TODO:
       */
      fileProvider : null,

      /**
       * Storage manager, handles the upload of files TODO:
       */
      storageManager : null,

      postCreate : function() {
         this.inherited(arguments);
         this.subscribe(icpublishBinaryData.TOPIC, lang.hitch(this, this.handleDataUri));
      },

      /**
       * Handles the pub sub notification emitted by the provider of the file
       * FIXME: should check if the fileProvider is the one we expect, or won't
       * work with multiple editors on a page
       * 
       * @param {Object}
       *           obj The topic of the notification
       */
      handleDataUri : function(obj) {
         if (obj && obj.filesArr) {
            array.forEach(obj.filesArr, lang.hitch(this, function(img) {
               var filename = img.name || string.substitute(nls.rs_attachedfile_filename, [ ++index
               ]);

               if (img.type === "html" || !img.type) {
                  var m = img.data[0].match(/^src="data:image\/(.*);base64,(.*)"$/);
                  img.type = m[1];
               }

               var filesize = img.size || (img.data[0].length) / 1.370;

               this.addChild(new AttachedFile({
                  strings : {
                     title : filename,
                     remove_alt : this._strings.remove_alt
                  },
                  filename : filename,
                  size : filesize,
                  extension : img.type,
                  id : img.id,
                  onClose : function() {
                     obj.deleteImagecb(this.id);
                  }
               }));
            }));
         }
      }
   });

   return AttachedFileList;
});
