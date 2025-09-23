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

dojo.provide("com.ibm.social.ee.util.FilesStringLoader");

dojo.requireLocalization("lconn.files", "ui");

dojo.mixin(com.ibm.social.ee.util.FilesStringLoader, {
	strings: dojo.i18n.getLocalization("lconn.files", "ui")
});