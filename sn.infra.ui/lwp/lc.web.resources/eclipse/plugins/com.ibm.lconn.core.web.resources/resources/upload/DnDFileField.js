/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2018                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.upload.DnDFileField");

dojo.require("lconn.core.upload.ui.DnDFileField");
dojo.require("lconn.core.upload.FileField");

/**
 * This provides a combo input which allow user use  drag-n-drop to select a set of files to an area.
 */
dojo.declare("lconn.core.upload.DnDFileField", [lconn.core.upload.FileField], {

   constructor: function(opts, srcNodeRef) {
      this.inherited(arguments);
   },

   _initWidget: function(srcNodeRef) {
      this.widget = new lconn.core.upload.ui.DnDFileField({controller: this}, srcNodeRef);
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

   onStartRename: function(file) {
   },

   onEndRename: function(file) {
   }
});
