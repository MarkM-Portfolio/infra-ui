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

dojo.provide("com.ibm.social.ee.bean.ECMComment");
dojo.require("com.ibm.social.ee.bean.Comment");
dojo.require("com.ibm.social.ee.bean.ECMUser");
dojo.require("com.ibm.social.incontext.util.dom");

dojo.declare("com.ibm.social.ee.bean.ECMComment", [com.ibm.social.ee.bean.Comment], {
   getAuthor: function() {
      if (!this.author)
         this.author = new com.ibm.social.ee.bean.ECMUser(com.ibm.social.incontext.util.dom.getElementsByTagNameNS(this.e, "author", com.ibm.social.incontext.util.dom.ATOM_NAMESPACE)[0]);
      return this.author;
   }
});