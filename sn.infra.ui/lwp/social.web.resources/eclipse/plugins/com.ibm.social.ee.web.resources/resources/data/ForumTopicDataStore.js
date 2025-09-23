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

dojo.provide("com.ibm.social.ee.data.ForumTopicDataStore");

dojo.require("com.ibm.social.ee.data.EntryDataStore");
dojo.require("com.ibm.social.ee.bean.ForumTopic");

dojo.declare("com.ibm.social.ee.data.ForumTopicDataStore", [com.ibm.social.ee.data.EntryDataStore], {

	itemFromDocEl: function(el, base) {
		return new com.ibm.social.ee.bean.ForumTopic(el, base);
	}
});
