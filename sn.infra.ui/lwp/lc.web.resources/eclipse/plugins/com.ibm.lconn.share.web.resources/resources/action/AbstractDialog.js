/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.action.AbstractDialog");

dojo.require("lconn.share.action.DialogAction");

dojo.declare("lconn.share.action.AbstractDialog", [lconn.share.action.DialogAction], {
   alwaysRecreate: true,
   appendFooter: function(el, includeBack, includeLoading, includeProgressBar) {
      var dialog = this.dialog;
      var d = dojo.doc;
      var div = dojo.create("div", {className: "lotusDialogFooter"}, el);
      if (includeLoading) {
         var span = dialog.progressNode = dojo.create("span", {className: "qkrStatus"}, div);
            span.style.display = "none";
            var img = dojo.create("img", {alt: this.nls.BUSY, className: "lotusLoading", src: dijit._Widget.prototype._blankGif}, span);
            span.appendChild(d.createTextNode(this.nls.BUSY));
      }
      else if (includeProgressBar) {
         var divp = dialog.progressNode = dojo.create("div", {className: "lotusLeft qkrStatus"}, div);
            divp.style.display = "none";
            var divw = dojo.create("div", null, divp);
            var progress = this.progress = new dijit.ProgressBar({},divw);
      }
      if (includeBack) {
         var button = this.backButton = dojo.create("button", {className: "lotusFormButton", type: "button"}, div);
            button.style.display = "none";
            button.appendChild(d.createTextNode(this.nls.BACK)); 
            this.connect(button, "onclick", this, "back"); 
      }
      var input = this.okButton = dialog.saveNode = dojo.create("input", {type: "submit", value: this.nls.OK, className: "lotusFormButton"}, div);
      var confirmButton = this.confirmButton = dialog.confirmBtnNode = dojo.create("button", {className: "lotusFormButton"}, div);
         confirmButton.style.display = "none";
         confirmButton.appendChild(d.createTextNode(this.nls.CONFIRM_CHANGE));
      if (!this.noCancel) {
         var cancelButton = this.cancelButton = dojo.create("button", {className: "lotusFormButton qkrCancelBtn"}, div); 
            cancelButton.appendChild(d.createTextNode(this.nls.CANCEL));
            this.connect(cancelButton, "onclick", this, "cancelDialog");
      }
   },
   destroy: function() {
      this.backButton = this.okButton = this.secondButton = this.confirmButton = this.cancelButton = null;
      this.inherited(arguments);
   },
   cleanupDialog: function(d) {
      d.progressNode = null;
      d.saveNode = null;
      d.secondSaveNode = null;
      d.confirmBtnNode = null;
      this.inherited(arguments);
   },
   appendHeader: function(el) {
      var div = dojo.create("div", {className: "lotusDialogHeader"}, el);
         this.createHeader(div, this.nls.DIALOG_TITLE, true);
   },
   getFormNodeClassName: function() {
      return "lotusDialog lotusForm";            
   },
   getContentNodeClassName: function() {
      return "lotusDialog";
   },
   appendA11yRequiredInstruction: function(el) {
      var d = dojo.doc;
      var a11y = dojo.create("span", {className: "lotusAccess"}, el);
         a11y.appendChild(d.createTextNode(this.nls.REQUIRED_A11Y));
   }         
});
