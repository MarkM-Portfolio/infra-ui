/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/on",
	"ic-incontext/widget/MessageContainer"
], function (dojo, declare, lang, windowModule, domConstruct, domStyle, i18nsocialEEStrings, on, MessageContainer) {

	
	var _GadgetMessageMixin = declare("com.ibm.social.ee.gadget._GadgetMessageMixin", null, {
		nls : i18nsocialEEStrings,
		// Must be implemented by subclass 
		getMissingErrorNode: function () { },
		getMissingErrorMessage: function () { },
		//maybe implemented by subclass
		onMissingItem: function () { },
	 
	   onErrorMessage: function(e, error, strMsg) {
	      this.generateMessage(e, error, strMsg, {error: true});
	   },
	   onInfoMessage: function(e, error, strMsg) {
	      this.generateMessage(e, error, strMsg, {info: true});
	   },
	   onSuccessMessage: function(e, error, strMsg) {
		   this.generateMessage(e, error, strMsg, {success: true});   
	   },
	   generateMessage: function(e, error, strMsg, msgType) {
	      var div = domConstruct.create("div");
	      var node = this.getMissingErrorNode();
	      var self = this;
	     var message = {refId: null, canClose: true, message: div, onRemove: lang.hitch(this, function() {domStyle.set(node, "display", "none");self.onSizeChange();})};
	     lang.mixin(message, msgType);
	         div.appendChild(windowModule.doc.createTextNode(strMsg ? strMsg : this.getMissingErrorMessage()));
	      if (!this.missingMessageContainer) {
	
	         this.missingMessageContainer = new MessageContainer({items: [message], nls: this.nls.MESSAGE}, 
	         node.appendChild(windowModule.doc.createElement("div")));
	         this.missingMessageContainer.onDisplayChange();
	         on(this.messageContainer, "DisplayChange", lang.hitch(this, "onSizeChange"));
	       }
	       else {
	          this.missingMessageContainer.clear();
	          this.missingMessageContainer.add(message, true);
	       }
	      domStyle.set(node, "display", "");
	      this.onSizeChange();
	      this.onMissingItem();
	   },
	   onSizeChange: function() { }
	});
	   
	return _GadgetMessageMixin;
});
