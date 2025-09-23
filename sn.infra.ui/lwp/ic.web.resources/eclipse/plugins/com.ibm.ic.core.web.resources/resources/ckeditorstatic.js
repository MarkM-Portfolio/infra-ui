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

define([
   "dojo/_base/kernel",
   "ic-ui/ckeditor/static"
], function (kernel, ckeditorStatic) {

   kernel.deprecated("ic-core/ckeditorstatic", "Use ic-ui/ckeditor/static instead", "5.0");

   return ckeditorStatic;
});
