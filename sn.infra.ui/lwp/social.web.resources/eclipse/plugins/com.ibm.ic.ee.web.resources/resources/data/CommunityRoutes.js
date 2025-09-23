/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/data/AbstractRoutes"
], function (declare, AbstractRoutes) {

	var CommunityRoutes = declare("com.ibm.social.ee.data.CommunityRoutes", AbstractRoutes, {
	   service: "communities",
	   getCommunityLink: function (id) {
	      return this.getServiceUrl() + "/service/html/communityview?communityUuid=" + encodeURIComponent(id);
	   },
	   getTypeAheadUrl: function() {
	      return this.getServiceUrl() + "/service/opensocial/" + (this.oauth ? "oauth/" : "") + "groups/@me"; 
	   }
	});
	return CommunityRoutes;
});
