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

dojo.provide("com.ibm.social.ee.bean.ECMUser");
dojo.require("com.ibm.social.ee.bean.User");

dojo.declare("com.ibm.social.ee.bean.ECMUser", null, {
   constructor: function(e) {
      var qsu = com.ibm.social.incontext.util.dom;
      this.userid = qsu.getChildElementTextContentNS(e, "userid", qsu.SNX_NAMESPACE) || qsu.getChildElementTextContentNS(e, "principalid", qsu.LCMIS_NAMESPACE);
      this.id =  this.userid ? this.userid : qsu.getChildElementTextContentNS(e, "uid", qsu.DOCUMENTS_ATOM_NAMESPACE);
      this.uri = qsu.getChildElementTextContentNS(e, "uri", qsu.DOCUMENTS_ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "uri", qsu.ATOM_NAMESPACE);
      this.name = qsu.getChildElementTextContentNS(e, "name", qsu.DOCUMENTS_ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "name", qsu.ATOM_NAMESPACE) || qsu.getChildElementTextContentNS(e, "displayname",qsu.LCMIS_NAMESPACE);
      this.state = qsu.getChildElementTextContentNS(e, "userState", qsu.SNX_NAMESPACE);
   }
});