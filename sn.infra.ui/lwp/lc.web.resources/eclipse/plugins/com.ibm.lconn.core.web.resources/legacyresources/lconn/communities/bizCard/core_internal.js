/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
dojo.provide("lconn.communities.bizCard.core_internal");

dojo.require("lconn.communities.bizCard.core");
dojo.require("net.jazz.ajax.xdloader");

//this contains just what is needed for communities bizCard when loaded from within Connections itself.
//This extends the lconn.communities.bizCard.core object to include the leave and delete functionality.
dojo.require("lconn.communities.bizCard.dialogs.actionConfirm");
dojo.require("lconn.communities.bizCard.dialogs.deleteConfirm");
dojo.require("lconn.communities.bizCard.dialogs.deleteConfirmTrash");

dojo.require("lconn.core.DialogUtil");

//extend the core object to include the internal only functions
lconn.communities.bizCard.core = dojo.mixin(lconn.communities.bizCard.core, {

   CommunityDelete: function() {
	   lconn.communities.bizCard.core.doDangerousAction(lconn.communities.bizCard.core.community.deleteUrl);
   },

   CommunityLeave: function() {
	   lconn.communities.bizCard.core.doDangerousAction(lconn.communities.bizCard.core.community.leaveUrl);
   },

   CommunityUnsubscribe: function() {
     lconn.communities.bizCard.core.mailUnsubscribe();
   },

   CommunitySubscribe: function() {
     lconn.communities.bizCard.core.mailSubscribe();
   },

   // Confirm deletion of Community
   confirmCommunityDeletion: function(community) {
      var numSubs = community.subcommunities.length;
	  var params = {
			 "communityTitle": ic_comm_communityName,
			 "callback": this.CommunityDelete,
			 "numSubs": numSubs,
			 "userName": community.userName
		  };
	  if ((community.trashEnabled == true) && (community.trashUIEnabled == true)) {
		var dlg = new lconn.communities.bizCard.dialogs.deleteConfirmTrash(params);
	  }
	  else {
		  var dlg = new lconn.communities.bizCard.dialogs.deleteConfirm(params);
	}
      dlg.show();
   },

   // Confirm leave the Community
   confirmCommunityLeave: function(groupSupportEnabled) {
      var nlsKey = 'label.action.confirm.community.before.leave';
      if (groupSupportEnabled != null) {
         if (groupSupportEnabled) {
           nlsKey = 'label.action.confirm.community.before.leave.groupEnabled';
         }
      }
      else if (this.community.groupSupportEnabled) {
         nlsKey = 'label.action.confirm.community.before.leave.groupEnabled';
      }
      var dlg = new lconn.communities.bizCard.dialogs.actionConfirm({
         "dlgTitle": this.messages["label.leaveConfirm.dlgTitle"],
         "dlgContent": this.messages[nlsKey],
         "okButtonValue": this.messages["label.leaveConfirm.okButtonValue"],
         "callback": this.CommunityLeave
      });
      dlg.show();
   },

   // Confirm unsubscribing from Community email
   confirmCommunityUnsubscribe: function() {
      var dlg = new lconn.communities.bizCard.dialogs.actionConfirm({
          "dlgTitle": this.messages["label.unsubscribeConfirm.dlgTitle"],
          "dlgContent": this.messages["label.unsubscribeConfirm.dlgContents"],
          "okButtonValue": this.messages["label.unsubscribeConfirm.okButtonValue"],
          "callback": this.CommunityUnsubscribe
       });
       dlg.show();
   },

   // Confirm subscribing to Community email
   confirmCommunitySubscribe: function() {
      var dlg = new lconn.communities.bizCard.dialogs.actionConfirm({
          "dlgTitle": this.messages["label.subscribeConfirm.dlgTitle"],
          "dlgContent": this.messages["label.subscribeConfirm.dlgContents"],
          "okButtonValue": this.messages["label.subscribeConfirm.okButtonValue"],
          "callback": this.CommunitySubscribe
       });
       dlg.show();
   },

   // Load Move Community code and bring up the dialog.
   moveCommunity: function(community) {
	// Only load move community code from Community jar if Community app is loaded.
	//
	   if (lconn.core.config.services.communities) {
	   	net.jazz.ajax.xdloader.batch_load_async(["lconn.comm.controls.dialog.MoveSubCommunity", 
	   	                                         "lconn.comm.controls.dialog.MoveCommunity", 
	   	                                         "lconn.comm.controls.data.CommunityItem"], function() {
	   		   dojo.mixin(lconn.communities.bizCard.core, {
	   			   communityMoveCallback: function(overviewUrl, moveType, result) {
	   					if (result.status == lconn.comm.controls.data.CommunityItem.errorCode.SUCCESS) {
	   						if (moveType == lconn.comm.controls.dialog.MoveSubCommunity.moveType.NAMES_NEED_CHECK) {
	   							location.href=overviewUrl + "&successMessage=move.success";
	   						}
	   						else {
	   							location.href=overviewUrl + "&successMessage=move.success.toTopLevel";
	   						}
	   					}
	   					else {
                if (communityActionData && communityActionData.hasHandle) {
                  location.href=overviewUrl + "&errorMessage=move.error.handle";
                }
                else {
	   						  location.href=overviewUrl + "&errorMessage=move.error.generic";
                }
	   					}
	   			   },
	   			   
	   			   moveCommunity_internal : function(community) {
	   				  if (community.subcommunities.length != 0) {
	   					// If this is a parent community, and it has subs, show error
	   					//
	   					var errMessage = this.messages['move.error.hasSubs.alert.body'];
	   					var errTitle = this.messages['move.error.hasSubs.alert.title'];
	   					var dlg = new lconn.core.DialogUtil.alert(errTitle, "<span>" + errMessage + "</span>", null);
	   					
	   				  }
	   				  else {
	   					   var CommunityItem = new lconn.comm.controls.data.CommunityItem(community.uuid);
	   					   var dialog = null;
	   					   var overviewUrl =  lconn.core.url.getServiceUrl(lconn.core.config.services.communities) + "/service/html/communityoverview?communityUuid=" + CommunityItem.getId();
	   					   var cb = dojo.hitch(this, "communityMoveCallback", overviewUrl);
	   					   var isInternal = CommunityItem.isInternal();
	   					   var orgId = CommunityItem.getOrgId();
	   					   var moveParams = {CommunityItemToMove: CommunityItem, internalOnly: isInternal, orgid: orgId, isSuperAdmin: community.isSuperAdmin, callback: cb};
	   					   var parentUuid = CommunityItem.getParentUuid();
	   					   if (parentUuid != null) {
	   						   // Subcommunity
	   						   moveParams = dojo.mixin(moveParams, {skipId: parentUuid});
	   						   dialog = new lconn.comm.controls.dialog.MoveSubCommunity(moveParams);
	   					   }
	   					   else { // Top level community
	   							moveParams = dojo.mixin(moveParams, {skipId: community.uuid});
	   							dialog = new lconn.comm.controls.dialog.MoveCommunity(moveParams);
	   					   }
	   						dialog.show();
	   				  }
	   			   }
	   	   		}
	   	   		
	   		   );
	   		// Now that move community code is loaded, invoke the move dialog.
		   		//
		   		lconn.communities.bizCard.core.moveCommunity_internal(community);
	      		});
	   	}
	   else {
		   console.error("Community Move code not loaded - Community App not deployed.");
	   }
   }
   
});

