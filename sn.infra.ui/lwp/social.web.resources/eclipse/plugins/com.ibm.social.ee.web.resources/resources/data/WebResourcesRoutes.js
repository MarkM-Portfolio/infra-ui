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

dojo.provide("com.ibm.social.ee.data.WebResourcesRoutes");

dojo.require("com.ibm.social.ee.data.AbstractRoutes");
dojo.require("com.ibm.social.incontext.util.url");

dojo.declare("com.ibm.social.ee.data.WebResourcesRoutes", com.ibm.social.ee.data.AbstractRoutes, {
   getTopicEntryUrl: function (id) {
      return this.getForumsUrl() + "/atom/topic?topicUuid=" + id;
   },

   getWebResourcesUrl: function () {
      if (!this.webResourcesUrl) {
         if (dojo.getObject("lconn.core.config.services")) {
            this.webResourcesUrl = lconn.core.config.services.webresources[this.isSecure() ? "secureUrl" : "url"];
         }
         else {
            this.webResourcesUrl = "/connections/resources";
         }
      }
      return this.webResourcesUrl;
   },
   getSystemTimeUrl: function () {
      return this.getWebResourcesUrl() + "/web/systemTime";
   }
});