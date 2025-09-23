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

dojo.provide("com.ibm.social.ee.bean.Version");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.ee.bean.AtomBean");

(function(){
var du = com.ibm.social.incontext.util.dom;
var dt = com.ibm.social.incontext.util.text;
dojo.declare("com.ibm.social.ee.bean.Version", com.ibm.social.ee.bean.AtomBean, {
   category: "version",
   getDocumentId: function() {return du.getChildElementTextContentNS(this.e, "documentUuid", du.DOCUMENTS_ATOM_NAMESPACE);},
   getVersionLabel: function() {return du.getChildElementTextContentNS(this.e, "versionLabel", du.DOCUMENTS_ATOM_NAMESPACE);},
   getChangeSummary: function() {return du.getChildElementTextContent(this.e, "summary");},
   getSize: function() {return dt.parseInt(du.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "length"));}
});
})();