/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Convenient wrapper for <code>lconn.core.strings</code> Dojo module resources.
 * Require this module to save a call to <code>dojo.requireLocalization("lconn.core", "strings");</code>.
 * @namespace lconn.core.strings
 * @deprecated
 */
dojo.provide("lconn.core.strings");

dojo.require("dojo.i18n");
dojo.requireLocalization("lconn.core", "strings");
