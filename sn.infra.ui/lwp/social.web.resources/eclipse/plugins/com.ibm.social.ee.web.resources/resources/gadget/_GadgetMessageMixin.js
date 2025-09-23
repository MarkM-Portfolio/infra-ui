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


dojo.provide("com.ibm.social.ee.gadget._GadgetMessageMixin");

dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");
dojo.require("com.ibm.social.incontext.widget.MessageContainer");

dojo.declare("com.ibm.social.ee.gadget._GadgetMessageMixin", null, {
	nls : dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings"),
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
      var div = dojo.create("div");
      var node = this.getMissingErrorNode();
      var self = this;
     var message = {refId: null, canClose: true, message: div, onRemove: dojo.hitch(this, function() {dojo.style(node, "display","none");self.onSizeChange();})};
     dojo.mixin(message, msgType);
         div.appendChild(dojo.doc.createTextNode(strMsg ? strMsg : this.getMissingErrorMessage()));
      if (!this.missingMessageContainer) {

         this.missingMessageContainer = new com.ibm.social.incontext.widget.MessageContainer({items: [message], nls: this.nls.MESSAGE}, 
         node.appendChild(dojo.doc.createElement("div")));
         this.missingMessageContainer.onDisplayChange();
         dojo.connect(this.messageContainer, "onDisplayChange", this, "onSizeChange");
       }
       else {
          this.missingMessageContainer.clear();
          this.missingMessageContainer.add(message, true);
       }
      dojo.style(node, "display","");
      this.onSizeChange();
      this.onMissingItem();
   },
   onSizeChange: function() { }
});
   