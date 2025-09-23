/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.test.ckeditor.ckeditorstaticTests");

dojo.require("doh.runner");
dojo.require("lconn.core.ckeditorstatic");

doh.register("lconn.test.ckeditor.ckeditorstaticTests", [ {
   name : 'test static loading',
   setUp: function() {
      dojo.setObject('ibmConfig', {versionStamp:'abc'}, dojo.global);
   },
   runTest : function() {
      doh.t(CKEDITOR != null);
//      doh.is("4.4.5.1", CKEDITOR.version);
      // TODO: check current timestamp
      doh.t(null != CKEDITOR.timestamp);
   },
   tearDown: function() {
      dojo.setObject('ibmConfig', undefined, dojo.global);
   }
}]);
