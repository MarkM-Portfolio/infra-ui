/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/window",
   "./FileViewerImpl",
   "dojo/_base/lang",
   "dojo/dom-class",
   "dijit/focus"
], function (declare, win, FileViewerImpl, lang, domClass, focus) {
   "use strict";

   var Viewer = declare([], {
      constructor: function (args) {
         this._files = [];
         this._args = args;
      },

      /**
       * Adds a file object to the list of files available to view.
       * 
       * @param file An object representing a file returned by one of the create...() functions below
       * 
       * @return An identifier for the newly added file that can be used in calls to open()
       */
      addFile: function (file) {
         var last;

         this._files.push(file);

         last = this._files.length - 1;
         file.id = last;

         if (last > 0) {
            this._files[last].paging.previous = this._files[last - 1];
            this._files[last - 1].paging.next = this._files[last];

            this._files[0].paging.next = this._files[1];
            this._files[1].paging.previous = this._files[0];
         }

         return last;
      },

      /**
       * Opens the file viewer (if it is not already open) and displays the indicated file.
       * 
       * @param id An identifier returned by addFile() to indicate which file should be displayed
       */
      open: function (id, source) {
         if (!id || id < 0) {
            id = 0;
         }

         this.close();

         this.impl = new FileViewerImpl(lang.mixin({
            file: this._files[id],
            text: this._args.text,
            source: source,
            open: lang.hitch(this, "open"),
            close: lang.hitch(this, "close")
         }, this._args));

         this.focused = focus.curNode;

         if (this.focused) {
            this.focused.blur();
         }

         domClass.add(win.body(), "ics-viewer-open");
         this.impl.placeAt(win.body());
      },

      close: function () {
         domClass.remove(win.body(), "ics-viewer-open");

         if (this.impl) {
            this.impl.destroy();
         }

         focus.focus(this.focused);
         this.focused = undefined;
      }
   });

   return {
      /**
       * Creates an instance of the File Viewer.
       */
      create: function (args) {
         return new Viewer(args);
      },

      /**
       * Creates an object representing a Connections file.  The resulting object can be passed into
       * the viewer's addFile() function.
       * 
       * @param file An instance of lconn.share.bean.File
       * 
       * @return An object representing a Connections file
       */
      createConnectionsFile: function (file) {
         return {
            type: "connections",
            paging: {},
            args: {
               name: file.getTitle(),
               type: file.getExtension(),
               id: file.getId(),
               size: file.getSize(),
               created: file.getPublished(),
               updated: file.getUpdated(),
               modifier: file.getModifier(),
               author: file.getAuthor(),
               isEncrypted: file.isEncrypted(),
               objectTypeId: file.getObjectTypeId(),
               permissions: file.getPermissions(),
               links: {
                  download: file.getUrlDownload(),
                  details: file._urlDetails || file.getUrlVia(),
                  thumbnail: file.getUrlThumbnail(),
                  entry: file.getUrlEntry()
               }
            }
         };
      }
   };
});
