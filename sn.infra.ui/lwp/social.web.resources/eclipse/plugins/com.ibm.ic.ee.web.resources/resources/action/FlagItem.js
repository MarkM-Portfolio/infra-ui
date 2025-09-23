/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/window",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/topic",
	"ic-core/config/services",
	"ic-ee/action/InlineAction",
	"ic-ee/data/FlagItemDataStore",
	"ic-ui/util/Url"
], function (dojo, windowModule, declare, lang, domConstruct, on, topic, services, InlineAction, FlagItemDataStore, Url) {

	var FlagItem = declare("com.ibm.social.ee.action.FlagItem", InlineAction, {
	    descLength: 1020,
	    
	    constructor: function(opts) {
	      this.nls = this.nls.COMMENTS.FLAG_ITEM;
	   },
	
	   createActionArea: function(ds, item, opt) {
	      var d = windowModule.doc, divActions, ul, li, a;
	      var itemClass = "comment";
	  
	      var div = domConstruct.create("div", {className: "lotusPostInlineActions"});
	         var form = this.formNode = domConstruct.create("form", {method: "POST", enctype: "multipart/form-data", "encoding": "multipart/form-data", className: "lotusForm2 lotusStreamUpdate"}, div);
	            var divcontent = this.mainContentNode = domConstruct.create("div", {}, form); 
	               var label = domConstruct.create("label", {"for": "flag"}, divcontent);
	                  label.appendChild(d.createTextNode(this.nls.ACTION));
	               var txtCtnr = domConstruct.create("div", {className: "lotusFieldEmphasis"}, divcontent); 
	                  var textarea = this.descriptionNode = domConstruct.create("textarea", {placeholder: this.nls.DESCRIPTION_LABEL, name: "description", className: "lotusText", id: "flag", "aria-label": this.nls.DESCRIPTION_LABEL, cols: "20", rows: "2"}, txtCtnr);
	               var actionsCtnr = domConstruct.create("div", {className: "lotusActions"}, divcontent);
	                  var ul = domConstruct.create("ul", {className: "lotusInlinelist"}, actionsCtnr);
	                     var li = domConstruct.create("li", {className: "lotusFirst"}, ul);
	                        var input = domConstruct.create("a", {className: "lotusAction", role: "button", href: "javascript:;"}, li);
	                           var strong = domConstruct.create("strong", {}, input);
	                              strong.appendChild(d.createTextNode(this.nls.OK));
	                           this.own(on(input, "click", lang.hitch(this, this.submitMain, {type: itemClass})));
	                        var button = domConstruct.create("input", {type: "button", value: this.nls.OK, role: "button", className: "lotusBtn", style: {display: "none"}}, li);
	                     li = domConstruct.create("li", {}, ul);
	                        var a = domConstruct.create("a", {className: "lotusAction", role: "button", href: "javascript:;"}, li);
	                           this.own(on(a, "click", lang.hitch(this, this.cancelAction, true)));
	                           a.appendChild(d.createTextNode(this.nls.CANCEL));
	                        this.setContent(div);
	                        this.file = item;
	                        a.focus(); 
	   },
	   destroy: function() {
	      this.mainContentNode = null;
	      this.inherited(arguments); 
	   },
	   cleanupDialog: function(d) {
	      d.formNode = null;
	      d.descripNodeRow = null;
	      d.descriptionNode = null;
	      this.inherited(arguments);
	   },
	   onSuccess: function() { 
	      if(!this.hadError) {
	         var div = domConstruct.create("div");
	         div.appendChild(windowModule.doc.createTextNode(this.nls.SUCCESS_SAVING));
	         this.scene.addTopLevelSuccessMessage(div); 
	      }
	      this.cancelAction();
	   },
	   onFail: function(errorData) {
	      this.hadError = true;
	      if(this.comment) {
	         //If we know the specific comment, show the message inline to be consistent with other comment error actions
	         this.scene.showInlineCommentError(this.comment, this.nls.ERROR_SAVING);
	      }
	      else {
	         var div = domConstruct.create("div"); 
	            div.appendChild(windowModule.doc.createTextNode(this.nls.ERROR_SAVING));    
	         this.scene.addTopLevelErrorMessage(div); 
	      }
	      this.cancelAction();
	   },    
	   submitMain: function(opts, e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      this.e = e;
	      this.urlFlagItem = new Url(services.files[Url.secure ? "secureUrl" : "url"]).uri + 
	      "/basic/api/reports";
	      var dsFlagItem = new FlagItemDataStore({url: this.urlFlagItem, net: this.net});
	      this.flagReason = this.descriptionNode.value;      
	      this.flagRef = this.file.id;
	      dsFlagItem.newItem({flagReason: this.flagReason, flagRef: this.flagRef, flagRefitemType: this.flagRefitemType});
	      dsFlagItem.save({scope: this, onComplete: this.onSuccess, onError: this.onFail }); 
	   },
	   isValid: function(ds, item, opt) {
	      return false; // dojo.getObject("quickr.lw.config.postModerationEnabled") && opt.authUser && opt.authUser.id;
	                    // FIXME: Obtain configuration from dynamic module
	   },
	   getFormNodeClassName: function() {
	      return "lotusForm";            
	   },
	   getContentNodeClassName: function() {
	      return "lotusDialogContent";
	   }
	});
	
	return FlagItem;
});
