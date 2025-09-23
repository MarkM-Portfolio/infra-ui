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

dojo.provide("lconn.core.fileViewerLoader");

dojo.require("lconn.core.config.features");
dojo.require("net.jazz.ajax.xdloader");

(function (features, xdloader) {
   if (features("fileviewer-everywhere")) {
      xdloader.load_async("ic-ui/util/fileViewerListener", function () {
         return;
      });
   }
}(lconn.core.config.features, net.jazz.ajax.xdloader));
