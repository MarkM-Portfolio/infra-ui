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

dojo.provide("lconn.core.ckeditorstatic");

/**
 * Include this module if you wish to take a static dependency on the CKEditor
 * (it is loaded whenever your module is loaded. Otherwise, use
 * lconn.core.ckeditor.replaceAsync to load CKEditor on demand.
 */
dojo.require("com.ibm.oneui.ckeditor.editor.dojo");
dojo.require("lconn.core.ckeditorstaticutil");
dojo.requireLocalization("com.ibm.oneui.ckeditor", "lang");