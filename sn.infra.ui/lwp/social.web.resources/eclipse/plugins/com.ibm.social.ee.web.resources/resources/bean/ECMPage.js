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

dojo.provide("com.ibm.social.ee.bean.ECMPage");
dojo.require("com.ibm.social.ee.bean.ECMPublishedDoc");

dojo.declare("com.ibm.social.ee.bean.ECMPage", [com.ibm.social.ee.bean.ECMPublishedDoc], {
   category: "page",
// getCategory: function() {return "page";},
   getType: function() { return "page"; }
});
