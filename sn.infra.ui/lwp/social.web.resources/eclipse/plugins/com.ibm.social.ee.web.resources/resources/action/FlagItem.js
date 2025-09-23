/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.action.FlagItem");
dojo.require("com.ibm.social.ee.action.InlineAction");
dojo.require("com.ibm.social.ee.data.FlagItemDataStore");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.oneui.util.Url");
dojo.require("com.ibm.social.ee.util.validation");

dojo.declare("com.ibm.social.ee.action.FlagItem", [com.ibm.social.ee.action.InlineAction], {
    descLength: 1020,
    
    constructor: function(opts) {
      this.nls = this.nls.COMMENTS.FLAG_ITEM;
   },

   createActionArea: function(ds, item, opt) {
      var d = dojo.doc, divActions, ul, li, a;
      var itemClass = "comment";
  
      var div = dojo.create("div", {className: "lotusPostInlineActions"});
         var form = this.formNode = dojo.create("form", {method: "POST", enctype: "multipart/form-data", "encoding": "multipart/form-data", className: "lotusForm2 lotusStreamUpdate"}, div);
            var divcontent = this.mainContentNode = dojo.create("div", {}, form); 
               var label = dojo.create("label", {"for": "flag"}, divcontent);
                  label.appendChild(d.createTextNode(this.nls.ACTION));
               var txtCtnr = dojo.create("div", {className: "lotusFieldEmphasis"}, divcontent); 
                  var textarea = this.descriptionNode = dojo.create("textarea", {placeholder: this.nls.DESCRIPTION_LABEL, name: "description", className: "lotusText", id: "flag", "aria-label": this.nls.DESCRIPTION_LABEL, cols: "20", rows: "2"}, txtCtnr);
               var actionsCtnr = dojo.create("div", {className: "lotusActions"}, divcontent);
                  var ul = dojo.create("ul", {className: "lotusInlinelist"}, actionsCtnr);
                     var li = dojo.create("li", {className: "lotusFirst"}, ul);
                        var input = dojo.create("a", {className: "lotusAction", role: "button", href: "javascript:;"}, li);
                           var strong = dojo.create("strong", {}, input);
                              strong.appendChild(d.createTextNode(this.nls.OK));
                           this.connect(input, "onclick", dojo.hitch(this, this.submitMain, {type: itemClass}));
                        var button = dojo.create("input", {type: "button", value: this.nls.OK, role: "button", className: "lotusBtn", style: {display: "none"}}, li);
                     li = dojo.create("li", {}, ul);
                        var a = dojo.create("a", {className: "lotusAction", role: "button", href: "javascript:;"}, li);
                           this.connect(a, "onclick", dojo.hitch(this, this.cancelAction, true));
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
         var div = dojo.create("div");
         div.appendChild(dojo.doc.createTextNode(this.nls.SUCCESS_SAVING));
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
         var div = dojo.create("div"); 
            div.appendChild(dojo.doc.createTextNode(this.nls.ERROR_SAVING));    
         this.scene.addTopLevelErrorMessage(div); 
      }
      this.cancelAction();
   },    
   submitMain: function(opts, e) {
      if (e) dojo.stopEvent(e);
      this.e = e;
      this.urlFlagItem = new com.ibm.oneui.util.Url(lconn.core.config.services.files[com.ibm.oneui.util.Url.secure ? "secureUrl" : "url"]).uri + 
      "/basic/api/reports";
      var dsFlagItem = new com.ibm.social.ee.data.FlagItemDataStore({url: this.urlFlagItem, net: this.net});
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
