/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
      "dojo/dom-class",
      "dojo/_base/declare",
      "dojo/_base/array",
      "dojo/_base/lang",
      "dojo/aspect",
      "dijit/_base/manager",
      "./data/FileList",
      "./provider/HtmlFileProvider",
      "./ui/FileField",
      "./util/UploadManager"
], function(domClass, declare, array, lang, aspect, manager, FileList, HtmlFileProvider, UIFileField, UploadManager) {

   /**
    * @class ic-core.upload.FileField
    */
   var FileField = declare("lconn.core.upload.FileField", null, /** @lends ic-core.upload.FileField.prototype */
   {

      constructor : function(opts, srcNodeRef) {
         lang.mixin(this, opts);

         if (!this.id) {
            this.id = dijit.getUniqueId("lconn_FileField");
         }

         this.fileList = new FileList(opts);

         this._connects = [];
         this._connects.push(aspect.after(this.fileList, "onListChanged", lang.hitch(this, "onListChanged")));

         this._initWidget(srcNodeRef);
      },

      startup : function() {
         var provider = this.getFileProvider();
         var focuser = provider.getFocusNode();

         // required for flash to build the movie
         if (lang.isFunction(focuser)) {
            focuser();
         }
      },

      getInputID : function() {
         return this.getFileProvider()._getInputID(this);
      },

      _initWidget : function(srcNodeRef) {
         this.widget = new UIFileField({
            controller : this
         }, srcNodeRef);

         // Set initial width and height
         if (this.width)
            this.widget.domNode.style.width = this.width + "px";
         if (this.maxHeight)
            this.widget.domNode.style.maxHeight = this.maxHeight + "px";
         if (this.minHeight)
            this.widget.domNode.style.minHeight = this.minHeight + "px";

         this._connects.push(aspect.after(this.fileList, "onFileAdded", lang.hitch(this.widget, "_addRow")));
         this._connects.push(aspect.after(this.fileList, "onFileRemoved", lang.hitch(this.widget, "_removeRow")));

         this._connects.push(aspect.after(this.fileList, "onPropertyChange", lang.hitch(this.widget, "_handlePropertyChange")));
         this._connects.push(aspect.after(this.fileList, "onSetStatus", lang.hitch(this.widget, "_handleSetStatus")));
         this._connects.push(aspect.after(this.fileList, "onClearStatus", lang.hitch(this.widget, "_handleClearStatus")));
         this._connects.push(aspect.after(this.fileList, "startRename", lang.hitch(this.widget, "_handleStartRename"), true));

         this._connects.push(aspect.after(this.widget, "onStartRename", lang.hitch(this, "onStartRename")));
         this._connects.push(aspect.after(this.widget, "onEndRename", lang.hitch(this, "onEndRename")));
         this._connects.push(aspect.after(this.widget, "onLayout", lang.hitch(this, "onLayout")));

         this.widget.startup();
      },

      addHTML5Files : function(files) {
         if (files && files.length)
            this.getFileProvider().addHTML5Files(files, this.fileList);
      },

      destroy : function() {
         array.forEach(this._connects, dojo.disconnect);
         this.widget.destroyRecursive(false);
      },

      /**
       * @return the backing file list
       */
      getFileList : function() {
         return this.fileList;
      },

      getFileProvider : function() {
         if (!this.fileProvider) {
            this.fileProvider = new HtmlFileProvider();
         }

         return this.fileProvider;
      },

      setEnabled : function(enabled) {
         var n = this.widget.domNode;
         if (n)
            domClass.toggle(n, "lconnFileUploadDisabled", !enabled);
      },

      getUIWidget : function() {
         return this.widget;
      },

      isFileListDirty : function() {
         var fileItems = this.getFileList()._files;
         return fileItems && fileItems.length ? true : false;
      },
      /**
       * Creates an upload manager that can be used to upload files to the
       * server
       * 
       * @param fileArray
       *           the list of files to upload (try
       *           FileField.getFileList().getUploadableFiles())
       */
      createUploadManager : function(fileArray) {
         return new UploadManager(fileArray, this);
      },

      // end will not cancel any uploads in progress, because the FileField will
      // not keep track of any UploadManagers.
      // if you have an existing upload manager, call cancel on it explicitly
      end : function() {
         var deferreds = this.fileList._pendingRemoteChecks;

         while (deferreds.length > 0) {
            var dfd = deferreds.shift();
            dfd.cancel();
         }
      },

      cancelRemoteCheck : function(file) {
         if (file._pendingRemoteCheck) {
            file._pendingRemoteCheck.cancel();
            file._pendingRemoteCheck = null;
         }
      },

      /**
       * This is called when files are added or removed, or a file's properties
       * have changed. This is the main callback consumers should connect to.
       * 
       * @param fileList
       *           the list that changed
       */
      onListChanged : function(fileList) {},
      onStartRename : function(file) {},
      onEndRename : function(file) {},
      onLayout : function(isShrinking) {},
      onDupMultiFile: function(file, isMultiFile) {}
   });
   return FileField;
});
