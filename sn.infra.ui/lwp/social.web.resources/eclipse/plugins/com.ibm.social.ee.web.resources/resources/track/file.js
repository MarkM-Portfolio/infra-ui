/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.track.file");

dojo.require("dojo.cookie");
dojo.require("com.ibm.lconn.layout.track");

com.ibm.social.ee.track.file.read = function(fileData, network, oauth){      
   var tracker = {
      file: fileData,
      getContentId : function() {
         return this.file.id;
      },
      getItemType : function() {
         return "FILESUMMARY";
      },
      getAuthUserId : function() {
         return this.file.authUser.id;
      },
      getCommunityId : function() {
         return this.file.inCommunity ? this.file.communityId : null;
      },
      getExtraMetrics : function() {
         return {
            contentTitle : this.file.title,
            contentContainerId : this.file.libraryId,
            contentCreatorId : this.file.createdBy.id,
            contentCreateTs : this.file.created,
            contentLink : this.file.altLink
         };
      }
   };
   
   try{
      com.ibm.lconn.layout.track.read(tracker.getContentId(), tracker.getItemType(), {
         context : "ee",
         sid: dojo.cookie("JSESSIONID"),
         network : network,
         oauth: oauth,
         source : "FILES",
         userId : tracker.getAuthUserId(),
         community : tracker.getCommunityId(),
         extra : tracker.getExtraMetrics()
      });
   }catch(e){
      if (dojo.config.isDebug){
         console.debug(e);
      }
   }
};

(function() {
   dojo.subscribe("social/ee/file/load", function(fileData, network, oauth) {
      if (fileData) {
         com.ibm.social.ee.track.file.read(fileData, network, oauth);
      }         
   });
})();