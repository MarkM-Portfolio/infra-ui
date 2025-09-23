/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.upload.FileField");

dojo.require("dijit._base.manager");

dojo.require("lconn.core.upload.provider.HtmlFileProvider");
dojo.require("lconn.core.upload.data.FileList");
dojo.require("lconn.core.upload.util.UploadManager");
dojo.require("lconn.core.upload.ui.FileField");

/**
 * @class lconn.core.upload.FileField
 */
dojo.declare("lconn.core.upload.FileField", null, /** @lends lconn.core.upload.FileField.prototype */ {

   constructor: function(opts, srcNodeRef) {
      dojo.mixin(this, opts);

      if (!this.id) {
         this.id = dijit.getUniqueId("lconn_FileField");
      }

      this.fileList = new lconn.core.upload.data.FileList(opts);

      this._connects = [];
      this._connects.push(dojo.connect(this.fileList, "onListChanged", this, "onListChanged"));
      this._connects.push(dojo.connect(this.fileList, "updateButtonStatus", this, "updateButtonStatus"));

      this._initWidget(srcNodeRef);
   },

   startup: function() {
      var provider = this.getFileProvider();
      var focuser = provider.getFocusNode();

      // required for flash to build the movie
      if (dojo.isFunction(focuser)) {
         focuser();
      }
   },

   getInputID: function() {
      return this.getFileProvider()._getInputID(this);
   },

   _initWidget: function(srcNodeRef) {
      this.widget = new lconn.core.upload.ui.FileField({controller: this}, srcNodeRef);
		
      // Set initial width and height
      if (this.width)
         this.widget.domNode.style.width = this.width + "px";
      if (this.maxHeight)
         this.widget.domNode.style.maxHeight = this.maxHeight + "px";
      if (this.minHeight)
         this.widget.domNode.style.minHeight = this.minHeight + "px";

      this._connects.push(dojo.connect(this.fileList, "onFileAdded", this.widget, "_addRow"));
      this._connects.push(dojo.connect(this.fileList, "onFileRemoved", this.widget, "_removeRow"));

      this._connects.push(dojo.connect(this.fileList, "onPropertyChange", this.widget, "_handlePropertyChange"));
      this._connects.push(dojo.connect(this.fileList, "onSetStatus", this.widget, "_handleSetStatus"));
      this._connects.push(dojo.connect(this.fileList, "onClearStatus", this.widget, "_handleClearStatus"));
      this._connects.push(dojo.connect(this.fileList, "startRename", this.widget, "_handleStartRename"));

      this._connects.push(dojo.connect(this.widget, "onStartRename", this, "onStartRename"));
      this._connects.push(dojo.connect(this.widget, "onEndRename", this, "onEndRename"));
      this._connects.push(dojo.connect(this.widget, "onLayout", this, "onLayout"));

      this.widget.startup();
   },

   addHTML5Files: function(files) {
      if (files && files.length)
         this.getFileProvider().addHTML5Files(files, this.fileList, this.needToFixEXIF);
   },

   destroy: function() {
      dojo.forEach(this._connects, dojo.disconnect);
      this.widget.destroyRecursive(false);
   },

   /**
    * @return the backing file list
    */
   getFileList: function() {
      return this.fileList;
   },

   getFileProvider: function() {
      if (!this.fileProvider) {
         this.fileProvider = new lconn.core.upload.provider.HtmlFileProvider();
      }

      return this.fileProvider;
   },

   setEnabled: function(enabled) {
      var n = this.widget.domNode;
      if (n)
         dojo.toggleClass(n, "lconnFileUploadDisabled", !enabled);
   },

   getUIWidget: function() {
      return this.widget;
   },

   isFileListDirty: function() {
      var fileItems = this.getFileList()._files;
      return fileItems && fileItems.length ? true : false;
   },
   /**
    * Creates an upload manager that can be used to upload files to the server
    * @param fileArray the list of files to upload (try FileField.getFileList().getUploadableFiles())
    */
   createUploadManager: function(fileArray) {
      return new lconn.core.upload.util.UploadManager(fileArray, this);
   },

   // end will not cancel any uploads in progress, because the FileField will not keep track of any UploadManagers.
   // if you have an existing upload manager, call cancel on it explicitly
   end: function() {
      var deferreds = this.fileList._pendingRemoteChecks;

      while (deferreds.length > 0) {
         var dfd = deferreds.shift();
         dfd.cancel();
      }
   },

   cancelRemoteCheck: function(file) {
      if (file._pendingRemoteCheck) {
         file._pendingRemoteCheck.cancel();
         file._pendingRemoteCheck = null;
      }
   },

   /**
    * This is called when files are added or removed, or a file's properties have changed.
    * This is the main callback consumers should connect to.
    *
    * @param fileList the list that changed
    */
   onListChanged: function(fileList) {},
   onStartRename: function(file) {},
   onEndRename: function(file) {},
   onLayout: function(isShrinking) {},
   updateButtonStatus: function(fileList) {}
});
