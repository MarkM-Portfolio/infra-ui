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

dojo.provide("lconn.core.upload.ui.DnDFileField");
dojo.require("lconn.core.upload.ui.FileField");

dojo.requireLocalization("lconn.files", "action");

/**
 * This provides a combo input which allow user use  drag-n-drop to select a set of files to an area.
 */
dojo.declare("lconn.core.upload.ui.DnDFileField",[lconn.core.upload.ui.FileField], {

   buildRendering: function() {
      this.inherited(arguments);
      this.domNode.removeChild(this.containerNode);
      this.domNode.removeChild(this.inputContainer);
      var containerNode = this.containerNode = dojo.create('div');
      this.inputContainer = dojo.create('span', { 'className': 'lconnUploadContainer'});

      dojo.addClass(this.inputContainer, "pickerInputSpan");

      var divNode = dojo.create('div');
      divNode.appendChild(this.inputContainer);

      this.domNode.appendChild(divNode);
      this.domNode.appendChild(this.containerNode);

      var pDragAndDropDescription = this.pDragAndDropDescription = document.createElement("p");
         pDragAndDropDescription.id = "pickerDnDDescription";
         if(this.params.controller.MSG_DND_PROMPT)
            pDragAndDropDescription.appendChild(document.createTextNode(this.params.controller.MSG_DND_PROMPT));
         pDragAndDropDescription.className = "dropfilesDesc";
      this.containerNode.appendChild(pDragAndDropDescription);
      this.switchToHorizental(true);
    },

   _buildInput: function() {
      if (this.currentInput && this.currentInput.destroy)
         this.currentInput.destroy();

      var inputWidget = this.currentInput = this.controller.getFileProvider().buildInput(this, this.controller.label);

      this.inputContainer.innerHTML = '';
      this.inputContainer.appendChild(inputWidget.domNode);

      dojo.addClass(this.domNode, "lconnFileInput");

      if (this.isAllowMultipleFiles()) {
         dojo.addClass(this.domNode, "lconnUploadMultiple")
      }
     },

     _buildTable: function() {
        var length = this.controller.fileList.count();
        if (length == 0) {
           dojo.style(this.pDragAndDropDescription, "display", "");
        } else {
           dojo.style(this.pDragAndDropDescription, "display", "none");
        }
        dojo.forEach(this.controller.fileList.getAllFiles(), this._addRow, this);
      },

      switchToHorizental: function(isTrue){
         if (isTrue) {
            dojo.addClass(this.domNode,"dropfilesHorizentalPrompt");
            dojo.removeClass(this.domNode,"dropfilesVerticalPrompt");
            dojo.removeClass(this.inputContainer,"browserContainer");
            dojo.removeClass(this.inputContainer.parentNode, "lconnUploadRectangle");
         } else {
            dojo.addClass(this.domNode,"dropfilesVerticalPrompt");
            dojo.removeClass(this.domNode,"dropfilesHorizentalPrompt");
            dojo.addClass(this.inputContainer,"browserContainer");
            dojo.addClass(this.inputContainer.parentNode, "lconnUploadRectangle");
         }
      },

      _addRow: function(file){
        dojo.style(this.pDragAndDropDescription, "display", "none");
        this.switchToHorizental(false);

        var id = this.id + "_" + file.getId();
        var widget = new lconn.core.upload.ui.File({
           id: id,
           file: file,
           container: this
        });

        dojo.addClass(widget.labelRow,"pickerDnDLabelRow");
        dojo.addClass(widget.domNode,"pickerDropfilesList");
        this.addChild(widget);

        dojo.style(this.containerNode, "display", "");
        this.updateInputVisibility();

        this.onLayout();
        widget.focus();
      },

      _removeRow: function(file, idx) {
         var length = this.controller.fileList.count();
         var widget = this._findFileWidget(file);
         this.removeChild(widget);

         widget.destroyRecursive(false);

         this._focusFile(idx, 1) || this._focusFile(idx, -1);
         this.updateInputVisibility();
         if (length == 0) {
            dojo.style(this.pDragAndDropDescription, "display", "");
            this.switchToHorizental(true);
         }

         this.setFocus();

         this.onLayout(true);
       },
});
