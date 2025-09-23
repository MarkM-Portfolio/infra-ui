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

dojo.provide("com.ibm.social.ee.track.ecmfile");

dojo.require("com.ibm.lconn.layout.track");

com.ibm.social.ee.track.ecmfile.read = function(data, network, oauth, isDownload){      
   var tracker = {
      ds: data.ds,
      item: data.item,
      authUser: data.authUser,
      communityId: data.communityid,
      getContentId : function() {
         return this.ds.getValue(this.item, "id");
      },
      getItemType : function() {
         return isDownload ? "FILE" : "FILESUMMARY";
      },
      getAuthUserId : function() {
         return this.authUser;
      },
      getCommunityId : function() {
         var id = this.communityId;
         return id ? id.substring(id.length - 36) : null;
      },
      getLibraryId : function() {
         var entryUrl = this.ds.getValue(this.item, "urlEntry");
         var regexp = /\/atom\/library\/([^\/]*)\/document/;
         var result = regexp.exec(entryUrl);
         if (result) { return result[1]; }
         return "";
      },
      getExtraMetrics : function() {
         var createDate = this.ds.getValue(this.item, "published");
         var author = this.ds.getValue(this.item, "author");
         return {
            contentTitle : this.ds.getValue(this.item, "title"),
            contentContainerId : this.getLibraryId(),
            contentCreatorId : author ? author.id : null,
            contentCreateTs : createDate ? dojo.date.stamp.toISOString(createDate) : null,
            contentLink : this.ds.getValue(this.item, "urlAlternate")
         };
      }
   };
   
   try{
      if (dojo.config.isDebug) {
         console.log("Send read event with itemType = "
               + tracker.getItemType() + ", contentId = "
               + tracker.getContentId());
         console.log("Options=" + dojo.toJson(tracker.getExtraMetrics(), true));
      }
      com.ibm.lconn.layout.track.read(tracker.getContentId(), tracker.getItemType(), {
	  	 context : "ee",
		 network : network,
		 oauth: oauth,
         source : "ECM",
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


//TODO: Enable when ECM metrics is supported in Connections
/*
(function() {
   dojo.subscribe("social/ee/ecm/load", function(data, network, oauth) {
      if (data) {
         com.ibm.social.ee.track.ecmfile.read(data, network, oauth, false);
      }         
   });
   
   dojo.subscribe("social/ee/ecm/download", function(data, network, oauth) {
      if (data) {
         com.ibm.social.ee.track.ecmfile.read(data, network, oauth, true);
      }         
   });   
})();
*/