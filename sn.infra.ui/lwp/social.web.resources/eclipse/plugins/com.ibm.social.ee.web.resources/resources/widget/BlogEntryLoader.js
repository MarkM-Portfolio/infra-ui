/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.BlogEntryLoader");

dojo.require("com.ibm.social.ee.gadget.BlogEntry");
dojo.require("com.ibm.social.ee.data.BlogsRoutes");
dojo.require("com.ibm.social.ee.widget.AuthUserEELoader");


dojo.declare("com.ibm.social.ee.widget.BlogEntryLoader", [com.ibm.social.ee.widget.AuthUserEELoader], {
   gadgetClass: "com.ibm.social.ee.gadget.BlogEntry",
   createRoutes: function () {
      return new com.ibm.social.ee.data.BlogsRoutes(this.routesParams);
   },
   getGadgetErrorStrings: function () {
      return this.nls.blog;
   }
});