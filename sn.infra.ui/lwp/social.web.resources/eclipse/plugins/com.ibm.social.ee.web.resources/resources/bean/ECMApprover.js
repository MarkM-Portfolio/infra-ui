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

dojo.provide("com.ibm.social.ee.bean.ECMApprover");
dojo.require("com.ibm.social.ee.bean.ECMUser");
dojo.require("com.ibm.social.ee.bean.AtomBean");

dojo.declare("com.ibm.social.ee.bean.ECMApprover", [com.ibm.social.ee.bean.AtomBean, com.ibm.social.ee.bean.ECMUser], {
   category: "user",
   constructor: function(e) {
      this.inherited(arguments);
      this.scope = com.ibm.social.incontext.util.dom.getChildElementTextContentNS(e, "approvalScope", com.ibm.social.incontext.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      this.status = com.ibm.social.incontext.util.dom.getChildElementTextContentNS(e, "approvalState", com.ibm.social.incontext.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      this.isSelf = com.ibm.social.incontext.util.dom.getChildElementTextContentNS(e, "approverSelf", com.ibm.social.incontext.util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true";
      this.type = com.ibm.social.incontext.util.dom.getChildElementTextContentNS(e, "approverType", com.ibm.social.incontext.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      this.id = com.ibm.social.incontext.util.dom.getChildElementTextContentNS(e, "approverId", com.ibm.social.incontext.util.dom.DOCUMENTS_ATOM_NAMESPACE);
      this.submitUrl = this.getUrlEntry();
   }
});