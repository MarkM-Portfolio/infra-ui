/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// This file is not currently used.  See defect associated with this line for details.

define([
   "ic-core/config/features"
], function (features) {
   if(features("fileviewer-everywhere") || features("file-viewer-everywhere")){
      require(["ic-ui.util.fileViewerListener"], function () {});
   }
});