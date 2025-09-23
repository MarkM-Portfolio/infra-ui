/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/ECMUser"
], function (declare, AtomBean, ECMUser) {

	(function() {
	            
	   var util = com.ibm.social.incontext.util;
	   
	   var ECMDocumentUser = declare("com.ibm.social.ee.bean.ECMDocumentUser", [AtomBean, ECMUser], {
	      
	      category: "user",
	      
	      constructor: function(e) {
	         this.role = util.dom.getChildElementTextContentNS(e, "role", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	         this.type = util.dom.getChildElementTextContentNS(e, "memberType", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	         this.isSecurityInherited = util.dom.getChildElementTextContentNS(e, "isSecurityInherited", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	      },
	      
	      getRole: function() {
	         return this.role;
	      },
	      
	      getIsSecurityInherited: function() {
	         this.isSecurityInherited == "true";
	      },
	      
	      getType: function() {
	         return this.type;  // user | group | communityOwners | communityMembers
	      },
	      
	      isGroup: function(){
	        return (this.type == "group" || this.isCommunityMembers() || this.isCommunityOwners()); 
	      },
	      
	      isPublic: function() {
	         return (this.type == "group") && (this.id == "#AUTHENTICATED-USERS");
	      },
	      
	      isCommunityMembers: function() {
	         return (this.type == "communityMember");
	      },
	      
	      isCommunityOwners: function() {
	         return (this.type == "communityOwner");
	      }
	   });
	})();
	return ECMDocumentUser;
});
