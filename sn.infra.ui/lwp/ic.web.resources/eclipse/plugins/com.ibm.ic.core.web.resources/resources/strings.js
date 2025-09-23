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

define([
   "dojo",
   "dojo/_base/kernel",
   "dojo/i18n",
   "dojo/i18n!ic-core/nls/strings"
], function (dojo, kernel, i18n, i18nstrings) {

   /**
    * Convenient wrapper for <code>lconn.core.strings</code> Dojo module resources.
    * Require this module to save a call to <code>dojo.requireLocalization("lconn.core", "strings");</code>.
    * @namespace ic-core.strings
    * @deprecated
    */
   kernel.deprecated("ic-core/strings", "Require dojo/i18n!ic-core/nls/strings instead", "5.0");

   return i18nstrings;
});
