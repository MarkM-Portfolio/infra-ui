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

dojo.provide("com.ibm.social.ee.bean.Comment");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.bean.AtomBean");
dojo.require("com.ibm.social.ee.bean.Moderated");

(function(){
var du = com.ibm.social.incontext.util.dom;
dojo.declare("com.ibm.social.ee.bean.Comment", [com.ibm.social.ee.bean.AtomBean, com.ibm.social.ee.bean.Moderated], {
   category: "comment",   
   getDocumentId: function() {return du.getChildElementTextContentNS(this.e, "documentId", du.DOCUMENTS_ATOM_NAMESPACE);},
   isDeleted: function() {return (du.getChildElementTextContentNS(this.e, "deleteWithRecord", du.DOCUMENTS_ATOM_NAMESPACE) == "true");},
   getVersionLabel: function() { return du.getChildElementTextContentNS(this.e, "versionLabel", du.DOCUMENTS_ATOM_NAMESPACE); }
});

})();