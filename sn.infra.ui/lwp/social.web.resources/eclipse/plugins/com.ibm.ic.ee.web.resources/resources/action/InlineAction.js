/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/dom-class",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/has",
	"dojo/query",
	"dojo/string",
	"dijit/registry",
	"ic-ee/util/ConnectionManager",
	"ic-ee/util/validation"
], function (dojo, domClass, array, declare, lang, windowModule, domConstruct, domStyle, has, query, stringUtils, ConnectionManager, validation) {

	var InlineAction = declare("com.ibm.social.ee.action.InlineAction", null, {
	   nls: i18nsocialEEStrings,
	   name: "",
	   tooltip: "",   
	   constructor: function(opts) {
	      if(opts)
	         lang.mixin(this, opts);
	      this.connManager = new ConnectionManager();
	      this.actionId = registry.getUniqueId(this.declaredClass);      
	   },
	   isValid: function(ds, item,opt) {
	      return true;
	   },   
	   execute: function(ds, item,opt) {
	      if(!this.previousLink)
	         this.savePreviousLink();
	      var actionNode = this.actionNode, d = windowModule.doc;
	      if(!actionNode) {
	         this.actionNode = domConstruct.create("div", null, this.rootNode);
	         this.createActionArea(ds, item, opt);
	      }
	      else
	         this.updateActionArea(ds, item, opt);
	   },
	   createActionArea: function(ds, item, opt) {},
	   setContent: function(node) {
	      domConstruct.place(node, this.actionNode, "only");
	   },
	   updateActionArea: function(ds, item, opt) {
	      if(this.formNode)
	         validation.removeFormErrors(this.formNode);
	      domStyle.set(this.actionNode, "display", "");
	      this.enableInput();
	   },
	   displayError: function(errorStr, displayAlert, additionalInfo) {
	      if (displayAlert) {
	         alert(errorStr);
	      }
	      else if(this.formNode){
	         validation.setFormError(this.formNode, errorStr, additionalInfo, this.dialog, this);
	      }
	   },
	   onerror: function(error, errorNls, displayAlert, defaultError) {
	      if (error.type == "ServerError" || error.type == "GeneralInformation" || error.type == "ConstraintViolation")
	         this.displayError(defaultError ? defaultError : this.nls.ERROR, displayAlert, error.message);
	      else
	         this.displayError(defaultError ? defaultError : this.nls.ERROR, displayAlert);      
	   },
	   destroy: function() {
	      domConstruct.empty(this.rootNode);
	      this.connManager.clearConnScope(this.actionId);
	   },
	   connect: function(obj, event, context, method) {
	      this.connManager.cmconnect(this.actionId, obj, event, context, method);
	   },   
	
	   enableInput: function() {this.toggleInput(this.actionNode, true);},
	   disableInput: function() {this.toggleInput(this.actionNode, false);},
	   toggleInput: function(node, enabled) {
	      array.forEach(query("INPUT",node),function(el) {
	         if (el.type != "file" && el.type != "hidden") {
	            el.disabled = !enabled;
	            if(el.type == "submit")
	               enabled ? domClass.remove(el, "lotusBtnDisabled"): domClass.add(el, "lotusBtnDisabled");
	         }
	      });
	      array.forEach(query("TEXTAREA",node),function(el) {el.disabled = !enabled;});
	      array.forEach(query("BUTTON",node),function(el) {
	         el.disabled = !enabled;
	         enabled ? domClass.remove(el, "lotusBtnDisabled"): domClass.add(el, "lotusBtnDisabled");
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
	      domConstruct.empty(el);
	      if (this.cParams)
	         com.ibm.social.incontext.util.html.createTextNode(d, el, stringUtils.substitute(this.CONFIRM || this.nls.CONFIRM, this.cParams), false);
	      else
	         com.ibm.social.incontext.util.html.createTextNode(d, el, this.CONFIRM || this.nls.CONFIRM, false);
	   },   
	   //Added savePreviousLink() & gotoPreviousLink() from Scene logic. Enable return to invoking link
	   savePreviousLink: function() {
	      this.previousLink = windowModule.doc.activeElement;
	   },
	   gotoPreviousLink: function() {
	      if(this.previousLink) {
	         if(has("ie"))
	            setTimeout(lang.hitch(this.previousLink, this.previousLink.focus), 500);
	         else
	            this.previousLink.focus();
	      }
	   }
	});
	return InlineAction;
});
