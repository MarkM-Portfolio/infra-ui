/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.CommonConnectionsDataStore");
dojo.require("com.ibm.social.ee.data.FeedDataStore");
dojo.require("com.ibm.social.ee.bean.ProfilesConnection");
dojo.declare("com.ibm.social.ee.data.CommonConnectionsDataStore", [com.ibm.social.ee.data.FeedDataStore], {
   net: null, // Make sure to pass in a network object for requests
   itemFromDocEl: function (el, base) {
      return new com.ibm.social.ee.bean.ProfilesConnection(el, base);
   }
});