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

dojo.provide("com.ibm.social.ee.bean.ForumRecommendation");

dojo.require("com.ibm.social.ee.bean.AtomBean");

dojo.declare("com.ibm.social.ee.bean.ForumRecommendation", [com.ibm.social.ee.bean.AtomBean], {
   constructor: function() {
      // Mixin the author to the main bean so user attributes can be read off of main bean
      dojo.safeMixin(this, this.getAuthor());
   }
});