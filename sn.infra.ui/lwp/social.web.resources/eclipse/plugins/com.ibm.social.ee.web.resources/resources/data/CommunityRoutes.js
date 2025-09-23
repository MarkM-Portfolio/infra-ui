/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.CommunityRoutes");

dojo.declare("com.ibm.social.ee.data.CommunityRoutes", com.ibm.social.ee.data.AbstractRoutes, {
   service: "communities",
   getCommunityLink: function (id) {
      return this.getServiceUrl() + "/service/html/communityview?communityUuid=" + encodeURIComponent(id);
   },
   getTypeAheadUrl: function() {
      return this.getServiceUrl() + "/service/opensocial/" + (this.oauth ? "oauth/" : "") + "groups/@me"; 
   }
});