/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
   dojo.provide("com.ibm.social.ee.bean.ECMDocumentUser");
   dojo.require("com.ibm.social.ee.bean.AtomBean");
   dojo.require("com.ibm.social.ee.bean.ECMUser");
   
   var util = com.ibm.social.incontext.util;
   
   dojo.declare("com.ibm.social.ee.bean.ECMDocumentUser", [com.ibm.social.ee.bean.AtomBean, com.ibm.social.ee.bean.ECMUser], {
      
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
         return this.id && (this.id == "#AUTHENTICATED-USERS" || this.id.indexOf("$IC-T-I-") == 0);
      },
      
      isCommunityMembers: function() {
         return !this.isPublic() && (this.type == "communityMember");
      },
      
      isCommunityOwners: function() {
         return (this.type == "communityOwner");
      }
   });
})();