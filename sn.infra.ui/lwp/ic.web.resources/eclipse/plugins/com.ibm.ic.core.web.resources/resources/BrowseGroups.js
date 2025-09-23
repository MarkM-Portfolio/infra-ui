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
   "dojo/_base/kernel",
   "ic-ui/BrowseGroups"
], function (kernel, BrowseGroups) {

   kernel.deprecated("ic-core/BrowseGroups", "This is a wrapper around ic-ui/BrowseGroups provided for backwards compatibility. Use that module directly instead.", "6.0");
   
   return BrowseGroups;
});
