/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.action.InlineAction");
dojo.require("com.ibm.social.ee.util.ConnectionManager");


dojo.declare("com.ibm.social.ee.action.InlineAction", null, {
   nls: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings"),
   name: "",
   tooltip: "",   
   constructor: function(opts) {
      if(opts)
         dojo.mixin(this, opts);
      this.connManager = new com.ibm.social.ee.util.ConnectionManager();
      this.actionId = dijit.getUniqueId(this.declaredClass);      
   },
   isValid: function(ds, item,opt) {
      return true;
   },   
   execute: function(ds, item,opt) {
      if(!this.previousLink)
         this.savePreviousLink();
      var actionNode = this.actionNode, d = dojo.doc;
      if(!actionNode) {
         this.actionNode = dojo.create("div", null, this.rootNode);
         this.createActionArea(ds, item, opt);
      }
      else
         this.updateActionArea(ds, item, opt);
   },
   createActionArea: function(ds, item, opt) {},
   setContent: function(node) {
      dojo.place(node, this.actionNode, "only");
   },
   updateActionArea: function(ds, item, opt) {
      if(this.formNode)
         com.ibm.social.ee.util.validation.removeFormErrors(this.formNode);
      dojo.style(this.actionNode, "display", "");
      this.enableInput();
   },
   displayError: function(errorStr, displayAlert, additionalInfo) {
      if (displayAlert) {
         alert(errorStr);
      }
      else if(this.formNode){
         com.ibm.social.ee.util.validation.setFormError(this.formNode, errorStr, additionalInfo, this.dialog, this);
      }
   },
   onerror: function(error, errorNls, displayAlert, defaultError) {
      if (error.type == "ServerError" || error.type == "GeneralInformation" || error.type == "ConstraintViolation")
         this.displayError(defaultError ? defaultError : this.nls.ERROR, displayAlert, error.message);
      else
         this.displayError(defaultError ? defaultError : this.nls.ERROR, displayAlert);      
   },
   destroy: function() {
      dojo.empty(this.rootNode);
      this.connManager.clearConnScope(this.actionId);
   },
   connect: function(obj, event, context, method) {
      this.connManager.cmconnect(this.actionId, obj, event, context, method);
   },   

   enableInput: function() {this.toggleInput(this.actionNode, true);},
   disableInput: function() {this.toggleInput(this.actionNode, false);},
   toggleInput: function(node, enabled) {
      dojo.forEach(dojo.query("INPUT",node),function(el) {
         if (el.type != "file" && el.type != "hidden") {
            el.disabled = !enabled;
            if(el.type == "submit")
               enabled ? dojo.removeClass(el, "lotusBtnDisabled"): dojo.addClass(el, "lotusBtnDisabled");
         }
      });
      dojo.forEach(dojo.query("TEXTAREA",node),function(el) {el.disabled = !enabled;});
      dojo.forEach(dojo.query("BUTTON",node),function(el) {
         el.disabled = !enabled;
         enabled ? dojo.removeClass(el, "lotusBtnDisabled"): dojo.addClass(el, "lotusBtnDisabled");
      });

      /*if (dialog.saveNode)
         dialog.saveNode.disabled = !enabled;*/
   },
   cancelAction: function(setFocus) {
      if(setFocus)
         this.gotoPreviousLink();
      this.destroy();
   },
   renderQuestion: function(d, item, opt, dialog) {
      var el = this.questionNode;
      dojo.empty(el);
      if (this.cParams)
         com.ibm.social.incontext.util.html.createTextNode(d, el, dojo.string.substitute(this.CONFIRM || this.nls.CONFIRM, this.cParams), false);
      else
         com.ibm.social.incontext.util.html.createTextNode(d, el, this.CONFIRM || this.nls.CONFIRM, false);
   },   
   //Added savePreviousLink() & gotoPreviousLink() from Scene logic. Enable return to invoking link
   savePreviousLink: function() {
      this.previousLink = dojo.doc.activeElement;
   },
   gotoPreviousLink: function() {
      if(this.previousLink) {
         if(dojo.isIE)
            setTimeout(dojo.hitch(this.previousLink, this.previousLink.focus), 500);
         else
            this.previousLink.focus();
      }
   }
});