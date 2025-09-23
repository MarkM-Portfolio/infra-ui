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

dojo.provide("com.ibm.social.ee.widget.GenericLoader");

dojo.require("com.ibm.social.ee.widget.AuthUserEELoader");
dojo.require("com.ibm.social.ee.gadget.GenericEE");
dojo.require("com.ibm.social.ee.data.OpenSocialRoutes");

dojo.declare("com.ibm.social.ee.widget.GenericLoader", com.ibm.social.ee.widget.AuthUserEELoader, {
   gadgetClass: "com.ibm.social.ee.gadget.GenericEE",
   createRoutes: function () {
      return new com.ibm.social.ee.data.OpenSocialRoutes(this.routesParams);
   },
   getGadgetErrorStrings: function () {
      return this.nls.generic;
   }   
});