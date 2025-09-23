/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.sharebox.widget.CommunityUploadFile");
dojo.require("dijit._Widget");
dojo.require("com.ibm.social.incontext.ConnectionManager");
dojo.require("com.ibm.social.incontext.widget.MessageContainer");
dojo.require("lconn.core.filepickerwidget");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.filesutil");
dojo.require("dojo.string");
dojo.requireLocalization("com.ibm.social.sharebox", "socialShareboxStrings");

dojo.declare("com.ibm.social.sharebox.widget.CommunityUploadFile", [dijit._Widget], {
   _connManager: null,
   communityId: null,
   filesWidget: null,
   msgContainer: null,
   postMixInProperties: function() {
	   this.nls= dojo.i18n.getLocalization("com.ibm.social.sharebox", "socialShareboxStrings"); 
	   this.shareNls = this.nls.COMMUNITYUPLOADFILE.SHARE_WITH_COMMUNITY;
	   this.uploadNls = this.nls.COMMUNITYUPLOADFILE.UPLOAD_TO_COMMUNITY;
	   this._connManager = new com.ibm.social.incontext.ConnectionManager();
	   this.connect = dojo.hitch(this._connManager, this._connManager.cmconnect, "cuf");
	   this.connect(this, "setCommunity", this, "update");
   },
   buildRendering: function(){
      var d = dojo.doc, filesDiv, div, divp, contentDiv, shareButton, cancelButton, uploadButton;
      contentDiv = this.contentDiv = dojo.create("div", null, this.domNode);
         contentDiv.style.display = "none";
      //Create Message Node for warnings and errors
      if(this.msgNode) {
    	 this.msgNode.style.display = "none";
      }
    		  
      //Create Files widget area
      filesDiv = dojo.create("div", {className: "filesDiv"}, contentDiv);
      //Create Footer area
      div = dojo.create("div", {className: "lotusDialogFooter lotusBorderTop"}, contentDiv);
         divp = this.progressNode = dojo.create("div", {className: "lotusLeft"}, div);         
         shareButton = this.shareButton = dojo.create("button", {className: "lotusFormButton"}, div);
            shareButton.style.display = "none";
            shareButton.appendChild(d.createTextNode(this.nls.COMMUNITYUPLOADFILE.SHARE));
            this.connect(shareButton, "onclick", this, "submitShare");
         uploadButton = this.uploadButton = dojo.create("button", {className: "lotusFormButton"}, div);
            uploadButton.style.display = "none";
            uploadButton.appendChild(d.createTextNode(this.nls.COMMUNITYUPLOADFILE.UPLOAD));
            this.connect(uploadButton, "onclick", this, "submitUpload");
         
         cancelButton = this.cancelButton = dojo.create("button", {className: "lotusFormButton"}, div); 
            cancelButton.appendChild(d.createTextNode(this.nls.COMMUNITYUPLOADFILE.CANCEL));
            this.connect(cancelButton, "onclick", this, "cancel");
      //Create Files widget
      lconn.core.filepickerwidget.create({
         filesService: dojo.getObject("lconn.core.config.services.files"),
         container: filesDiv,
         externalProgressNode: divp,
         delayUpload: false,
         showActionButtons: false,
         showShare: false,
         showShareEditor: true,
         defaultSourceId: "myfiles",
         onSourceChange: dojo.hitch(this, "onSizeChange"),
         onSourceLoaded: dojo.hitch(this, "setMode"),
         onUploadComplete: dojo.hitch(this, "onUploadComplete"),
         setMessage: dojo.hitch(this, "setMessage"),
         postCreate: dojo.hitch(this, function(widget){
               this.filesWidget = widget;
               this.updateMsgContainer();
               dojo.addClass(this.domNode, "lotusDialog");
               this.connect(widget, "resize", this, "onSizeChange");
               this.connect(widget, "onSelectionChange", this, "setMode");
               this.setMode();
               this.contentDiv.style.display = "";
               this.onLoaded();
         })
      });
   },
   onSizeChange: function(){},
   onLoaded: function(){},
   cancel: function() {
	  if(this.useCancelAlternative && this.filesWidget.cancel) {
		  //In the middle of doing an action so tell widget to cancel instead of doing full cancel 
		  this.filesWidget.cancel();
		  return;
	  }
	  this.clear();
      this.close();
   },
   clear: function() {
	  this.widgetMessage = null;
	  this.preventContextUpdate = false;
	  if(this.msgContainer)
		  this.msgContainer.clear();
	  this.filesWidget.reset({});
	  this.update();
	  this.onClear();
   },
   onClear: function() {},
   close: function(){
	   this.onClose();
   },
   onClose: function() {},
   setMode: function() {
      var fw = this.filesWidget;
      if(!fw || !fw.activeSource)
         return;
      if(fw.activeSource.id == "myfiles") {
         this.uploadButton.style.display = "none";
         this.shareButton.style.display = "";
         this.submitButton = this.shareButton;
      } else if(fw.activeSource.id == "mycomputer") {
         this.shareButton.style.display = "none";
         this.uploadButton.style.display = "";
         this.submitButton = this.uploadButton; 
      }
      this.update();
         	   
   },

   update: function() {
	  this.useCancelAlternative = false;
      if(this.filesWidget && (this.filesWidget.getSelectedItems().length > 0) && this.communityId) {
         this.submitButton.disabled = "";		   
         dojo.removeClass(this.submitButton, "lotusBtnDisabled");
      }
      else {
         this.submitButton.disabled = "disabled";		   
         dojo.addClass(this.submitButton, "lotusBtnDisabled");
      }
      this.cancelButton.disabled = "";
	  dojo.removeClass(this.cancelButton, "lotusBtnDisabled");

      this.updateMsgContainer();
   },
   updateMsgContainer: function() {
	   var messages = [];
	   this.msgNode.style.display = "none";
	   if(this.widgetMessage)
		   messages.push(this.widgetMessage);
	   if(this.usesPublicCommunity())
		   messages.push({message: this.nls.COMMUNITYUPLOADFILE.VISIBILITY_WARNING, error: false, warning: true, canClose: false});
	   
	   if(this.msgContainer) {
		   this.msgContainer.clear();
		   dojo.forEach(messages, function(m){
			   this.msgContainer.add(m, true);			   
		   }, this);		   
	   }
	   else {
		   this.msgContainer =  new com.ibm.social.incontext.widget.MessageContainer({
	        	 items: messages, nls: this.nls.MESSAGE,
	        	 isScrollAllowed: dojo.hitch(this, this.isScrollToMessageAllowed)
	        	 }, 
	    		  this.msgNode.appendChild(dojo.doc.createElement("div")));
		   this.connect(this.msgContainer, "remove", this, "onSizeChange");
	   }
	   if(messages.length > 0)
		   this.msgNode.style.display = "";
	   this.onSizeChange();
   },
   handleShareWithComplete: function(files, response, ioArgs) {
      var code = response ? response.code : null, 
         status = ioArgs.xhr.status, 
         isSingleFile = (files.length == 1);

      if((status == "204") || (dojo.isIE && status == "1223")) {
         if(isSingleFile) {
            this.setMessage({type: "success", message: dojo.string.substitute(this.shareNls.SUCCESS_ONE, [files[0].getName(), this.communityTitle])});   
    	 } else {
            this.setMessage({type: "success", message: dojo.string.substitute(this.shareNls.SUCCESS_PLURAL, [files.length, this.communityTitle])});    		   
         }
         this.clear();
    	 this.close();
       }
      else {
         if (code == "ShareQuotaExceeded")
            this.setErrorMessage(this.shareNls.MAX_SHARES_ERROR);
         else if (code == "RestrictionViolation")
             this.setErrorMessage(this.shareNls.VISIBILITY_RESTRICTION[isSingleFile ? "ERROR_SHARE" : "ERROR_SHARE_X"]);
         else if (code == "ItemNotFound")
             this.setErrorMessage(this.shareNls[isSingleFile ? "NOT_FOUND_ERROR" : "NOT_FOUND_ERROR_X"]);
         else if (code == "AccessDenied")
             this.setErrorMessage(this.shareNls[isSingleFile ? "ACCESS_DENIED_ERROR" : "ACCESS_DENIED_ERROR_X"]);
         else if (code == "SharingIntentRestriction") {
             this.setErrorMessage(this.shareNls[isSingleFile ? "EXTERNAL_SHARES_ERROR" : "EXTERNAL_SHARES_ERROR_X"]);
         }else if(code == "cancel")
             this.setErrorMessage(this.shareNls[isSingleFile ? "CANCEL_ERROR" : "CANCEL_ERROR_X"]);
         else if (code == "timeout")
             this.setErrorMessage(this.shareNls[isSingleFile ? "TIMEOUT_ERROR" : "TIMEOUT_ERROR_X"]);
         else if (code == "unauthenticated")
             this.setErrorMessage(this.shareNls[isSingleFile ? "NOT_LOGGED_IN_ERROR": "NOT_LOGGED_IN_ERROR"]);
         else
             this.setErrorMessage(this.shareNls[isSingleFile ? "ERROR" : "ERROR_X"]);
         this.submitButton.disabled = "";
         dojo.removeClass(this.submitButton, "lotusBtnDisabled");
      }
   },

   onUploadComplete: function(successful) {
      if(successful)
    	  this.close();
      else
    	  this.update();
   },
   setCommunity: function(id, title, type) {
      this.communityId = id;
      this.communityTitle = title;
      this.communityType = type;
      this.preventContextUpdate = true;
   },
   usesPublicCommunity: function() {
      return this.communityType && (this.communityType != "private");
   },
   setMessage: function(type, msg){},
   setErrorMessage: function(msg) {
      this.widgetMessage ={message: msg, error: true, warning: false, canClose: true};
      this.updateMsgContainer();
   },
   submitShare: function() {
      var files = this.filesWidget.getSelectedItems(),opts;
      this.widgetMessage = null;
      this.prepareForSubmit(false);
      if(this.communityId && (files.length > 0)) {
          opts = {file: files, 
      	    	community: [this.communityId],
      	        callback: dojo.hitch(this, this.handleShareWithComplete, files)};
          if(this.usesPublicCommunity())
          	  opts.visibility = "public";    	  
    	  lconn.core.filesutil.shareWithCommunity(opts);
      }
   },
   submitUpload: function() {
	  var opts = {community: this.communityId};
	  if(this.usesPublicCommunity())
		  opts.visibility = "public";
	  this.filesPending = false;
      this.widgetMessage = null;
      this.prepareForSubmit(true);
      this.filesWidget.upload.startUpload(opts);
   },
   prepareForSubmit: function(allowCancel) {
	   this.submitButton.disabled = "disabled";
       dojo.addClass(this.submitButton, "lotusBtnDisabled");
       if(allowCancel && this.filesWidget.cancel){
    	   this.useCancelAlternative = true;
       } else {
    	   this.cancelButton.disabled = "disabled";
    	   dojo.addClass(this.cancelButton, "lotusBtnDisabled");
       }
   },
   isScrollToMessageAllowed: function() {
      return (window.getComputedStyle && window.getComputedStyle(this.domNode, null) != null);   
   }
    
});