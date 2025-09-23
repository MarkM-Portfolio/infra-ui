/* Copyright IBM Corp. 2001, 2017  All Rights Reserved.              */

dojo.provide("lconn.communities.bizCard.core");

//this contains just what is needed for communities bizCard when loaded for external applications.
//lconn.communities.bizCard.core_internal holds the leave and delete functionality, which can only
//be used when used from within Connections itself
dojo.requireLocalization("lconn.communities.bizCard", "ui");
dojo.require("lconn.core.WidgetPlacement");
dojo.require("ic-core.wp.events");
dojo.require("lconn.core.util.Cookie");
dojo.require("com.ibm.lconn.layout.page");
dojo.require("lconn.communities.bizCard.newRelicTracker");
dojo.require('dojox.timing');
dojo.require("dijit._base.popup");
dojo.require("lconn.core.upload.util.UploadUtil");

lconn.communities.bizCard.core = {
   messages: dojo.i18n.getLocalization("lconn.communities.bizCard", "ui"),
   _firstActionShown: false,
   // Set to true after first action link is shown.
   _communityActionsNode: null,
   _nonCommunityActionBar: false,
   _messageWidget: null,
   _messageDiv: null,
   _navMenuOpen: false,
   _subMenuOpen: false,
   _currentMenuSelection: 0,
   _mouseOpenNavMenu: false,
   _mouseOpenSubMenu: false,
   _openMenuDelay: 600,
   _openingNavMenuTimer: null,
   _openingSubMenuTimer: null,
   _hideMenuDelay: 1500,
   _closingNavMenuTimer: null,
   _closingSubMenuTimer: null,
   _tabNavPanel: null,
   _curMenu: null,
   _curContainer: null,
   _menuArray: null,
   _menuEntryWidths: null,
   _totalMenuSize: 0,
   _moreBtnWidth: 0,

   // Set to true if we're inserting into other components action bar.
   openComposeEmail: function(composeEmailFormAction) {
      // Determine if high contrast mode has been enabled 
      var isHighContrast = false;
      var bodyElement = document.getElementsByTagName("body")[0];
      if (dojo.hasClass(bodyElement, "dijit_a11y")) {
         isHighContrast = true;
      }

      var windowHeight = 630;
      if (dojo.isIE) {
         windowHeight += 30;
      }
      if (isHighContrast) {
         windowHeight += 50;
      }

      var options = "width=1000,height=" + windowHeight + ",scrollbars=yes,resizable=yes,location=no,status=no,toolbar=no,menubar=no";
      window.open(composeEmailFormAction, "", options);
      return false;
   },

   // Enable buttons only after the page is fully loaded (for IE)
   enableTopButton: function(buttonId, buttonFunc) {
      var btn = dojo.byId(buttonId);
      if (btn) {
         dojo.connect(btn, "onclick", null, function(evt) {
            buttonFunc(evt);
            if (evt != null) dojo.stopEvent(evt);
            return false;
         });
       this.keyPressHandle = dojo.connect(btn, 'onkeypress', function(evt) {
         //Down arrow should do open action
          if (evt != null) {
            if (evt.keyCode == dojo.keys.DOWN_ARROW) {
               buttonFunc(evt);
               dojo.stopEvent(evt);
               dojo.disconnect(this.keyPressHandle); // Don't track keypresses until button is opened again
               }
            }
             return false;
          });
      }
   },


   setJoinCommunityReqCookie: function() {
      document.cookie = "JoinCommunityReqURL=" + location.href + "; expires=" + new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toGMTString() + "; path=" + location.href;
   },

   isNotEmpty: function(temp) {
      return temp != null && temp != "";
   },
   
   //function to check if Highlights is set as landing page for community
   isHighlightsStartPage: function() {
	   var isHighlightsLandingPage =false;
	   var highlightsWidgetDefId='';
	   if(typeof WidgetPlacementConfig.widgetConfigDocument == 'undefined'){
		   var urlHighlights ="";
	       var layouts= this.community.links;
	       for (var i = 0; i < layouts.length; i++) {
	    	   var widgetlink = layouts[i];
	    	   if (widgetlink.id == "Highlights") {
	    		   urlHighlights = widgetlink.url;
	    		   break;
	    	   }
	       }
	       if(urlHighlights.indexOf(this.community.startPage) > 0 ){
	    	   isHighlightsLandingPage =true;
	       }

	       highlightsWidgetDefId= urlHighlights.substring(urlHighlights.indexOf('#') + 1);
		   highlightsWidgetDefId= highlightsWidgetDefId.substring(highlightsWidgetDefId.indexOf('=') + 1);

		 }else{
			   var layouts= WidgetPlacementConfig.widgetConfigDocument.layouts;
			   for (var i = 0; i < layouts.length; i++) {
				   var layout = layouts[i];
				   for (var ii = 0; ii < layout.pages.length; ii++) {
					   var layoutPages = layout.pages[ii];
					   if(layoutPages.pageId == 'communityOverview'){
						   for (var j = 0; j < layoutPages.widgetInstances.length; j++) {
							   var widgetLink=layoutPages.widgetInstances[j];
							   if(widgetLink.defIdRef == 'Highlights'){
								   highlightsWidgetDefId=widgetLink.instanceId;
								   break;
							   }
	                       }
						   break;
					   }				  
				  }  
			   }
			   if(lconn.communities.bizCard.core.community.startPage==highlightsWidgetDefId){
				   isHighlightsLandingPage =true;
			   }
	     }		
	     return  [isHighlightsLandingPage , highlightsWidgetDefId];
  },
   
   buildActionsMenu: function(community) {
      if (!dojo.exists("dijit.byId")) return;
      var messages = this.messages;
      try {
         var tempMenu = dijit.byId("CommunitiesActionsMenuMain");
         if (tempMenu != null) tempMenu.destroyRecursive();
      } catch (exception1) {
         console.log(exception1);
      }
      dojo['require']("dijit.Menu");
      var actionsMenu = new dijit.Menu({
         "class": "lotusPlain",
         id: "CommunitiesActionsMenuMain"
      });

      var isInWidgetFullpageMode = false;
      if (lconn.core.WidgetPlacement != null && lconn.core.WidgetPlacement.isInWidgetFullpageMode) isInWidgetFullpageMode = true;

      if (community.showGoToComm == true) {
         actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.gotoComm'], "GOTOCOMM"));
      }
      
      //Connections CommunitiesCOMMUNITY-193
      //Community Actions -> Change layout loads the legacy layout. Should we change it to only change the layout on XCC? Close the Change layout page shows the 'Overview' page"
	  var showChangeLayoutCommunityActionItem =true;
	  var isHighlightsLandingPage = this.isHighlightsStartPage();	
	  if(isHighlightsLandingPage[0]== true){
          showChangeLayoutCommunityActionItem =false;
	  }	
	  
      if (community.editSubEnabled == true) {  
          actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.edit'], "EDITSUBURL"));
          if (lconn.core.WidgetPlacement.isOverviewLinkSelected()) {                         
              if (community.customizeEnabled) {
                 actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.theme.customize'], "CUSTOMIZE"));
 				if(showChangeLayoutCommunityActionItem == true){
                 	if ( lconn.core.WidgetPlacement._freeLayout ) {
                    		actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.theme.changelayout'], "CHANGELAYOUT"));
                 	} else {
 				  		if(community.disableChangeLayoutCommunityActionItem == true){
 					  		actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
 				  		}
                 	}
 				}
              } else {
 				  if(community.disableAddAppsCommunityActionItem == true){
 					  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.customize'], "CUSTOMIZE_DISABLED"));
 					  if(showChangeLayoutCommunityActionItem == true){
 					      actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
 					  }
 				  }
              }
           }else {                          
        	   if (community.customizeEnabled) {
                   actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.theme.customize'], "CUSTOMIZEURL"));
   				if(showChangeLayoutCommunityActionItem == true){
                      if ( lconn.core.WidgetPlacement._freeLayout ) {
                         actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.theme.changelayout'], "CHANGELAYOUTURL"));
                      } else {
   				     if(community.disableChangeLayoutCommunityActionItem == true){
   					     actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
   				     }
                      }
   				}
                } else {
   				  if(community.disableAddAppsCommunityActionItem == true){
   					  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.customize'], "CUSTOMIZE_DISABLED"));
   					  if(showChangeLayoutCommunityActionItem == true){
   					      actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
   					  }  
   				  }
                }
          }
      } else {
          if (community.editEnabled == false && community.editingOff == false) {
	    	  if(community.disableEditCommunityActionItem == true){
	    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.edit'], "EDITSUBURL_DISABLED"));
	    	  }
	    	  if(community.disableAddAppsCommunityActionItem == true){
	    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.customize'], "ADDAPPS_DISABLED"));
	    	  }
	    	  if(community.disableChangeLayoutCommunityActionItem == true && showChangeLayoutCommunityActionItem == true){
	    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
	    	  }
          }
      }
            
      if (community.editEnabled == true) {  
         actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.edit'], "EDITURL"));
         if (lconn.core.WidgetPlacement.isOverviewLinkSelected()) {            
             if (community.createSubEnabled == true) {
                actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.create'], "CREATESUB" + ((community && community.useTE) ? "URL" : "")));
             } else {
				  if(community.disableCreateSubCommunityActionItem == true){
					  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.create'], "CREATESUB_DISABLED"));
				  }
             }
             
             if (community.customizeEnabled) {
                 actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.theme.customize'], "CUSTOMIZE"));
 				if(showChangeLayoutCommunityActionItem == true){
                 if ( lconn.core.WidgetPlacement._freeLayout ) {
                    actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.theme.changelayout'], "CHANGELAYOUT"));
                 } else {
 				  if(community.disableChangeLayoutCommunityActionItem == true){
 					  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
 				  }
                 }
 				}
              } else {
 				  if(community.disableAddAppsCommunityActionItem == true){
 					  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.customize'], "CUSTOMIZE_DISABLED"));
 					  if(showChangeLayoutCommunityActionItem == true){
 					  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
 					  }
 				  }
              }
         }
         else {             
             if (community.createSubEnabled == true) {
                actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.create'], "CREATESUBURL"));
             } else {
				  if(community.disableCreateSubCommunityActionItem == true){
					  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.create'], "CREATESUB_DISABLED"));
				  }
             }
             
             if (community.customizeEnabled) {
                 actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.theme.customize'], "CUSTOMIZEURL"));
 				 if(showChangeLayoutCommunityActionItem == true){
 				    if ( lconn.core.WidgetPlacement._freeLayout ) {
 				       actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.theme.changelayout'], "CHANGELAYOUTURL"));
 				      } else {
                	    if(community.disableChangeLayoutCommunityActionItem == true){
                	        actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUTURL_DISABLED"));
                	    }
                	    }
 				    }
              } else {
 				  if(community.disableAddAppsCommunityActionItem == true){
 					  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.customize'], "CUSTOMIZE_DISABLED"));
 					  if(showChangeLayoutCommunityActionItem == true){
 						    actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
 					  }
 				  }
              }
         }         
      } else {
          if (community.editSubEnabled == false && community.editingOff == false) {
	    	  if(community.disableEditCommunityActionItem == true){
	    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.edit'], "EDITURL_DISABLED"));
	    	  }
	    	  if(community.disableCreateSubCommunityActionItem == true){
	    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.create'], "CREATESUBCOMMUNITY_DISABLED"));
	    	  }
	    	  if(community.disableAddAppsCommunityActionItem == true){
	    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.customize'], "ADDAPPS_DISABLED"));
	    	  }
	    	  if(community.disableChangeLayoutCommunityActionItem == true && showChangeLayoutCommunityActionItem == true){
	    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
	    	  }
          }
      }
      
      if (community.editingOff == true) {
    	  if(community.disableEditCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.edit'], "EDITURL_DISABLED"));
    	  }
    	  if(community.disableCreateSubCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.create'], "CREATESUBCOMMUNITY_DISABLED"));
    	  }
    	  if(community.disableAddAppsCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.customize'], "ADDAPPS_DISABLED"));
    	  }
    	  if(community.disableChangeLayoutCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.theme.changelayout'], "CHANGELAYOUT_DISABLED"));
    	  }
      }
      
      if (community.moderateEnabled == true) {
         actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.moderate'], "MODERATE"));
      }

      if (this.isNotEmpty(community.memberJoinURL)) {
         if (community.canJoinCommunity == true) actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.join'], "JOIN"));
         else actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.requestToJoin'], "REQUESTJOIN"));
      }
      /*else {
    	  if(community.disableJoinCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.join'], "JOIN_DISABLED"));
    	  }
      }*/

      if (community.mailEnabled == true) {
         actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.email'], "EMAIL"));
      } else {
    	  if(community.disableMailCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.email'], "EMAIL_DISABLED"));
    	  }
      }

      // Allow client to unsubscribe to mail in CR4
      if (community.mailSubscribeEnabled == true) {
        actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.subscribe'], "SUBSCRIBE"));
      }
      if (community.mailUnsubscribeEnabled == true) {
        actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.unsubscribe'], "UNSUBSCRIBE"));
      }

      if (this.isNotEmpty(community.leaveUrl)) {
         actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.leave'], "LEAVE"));
      } else {
    	  if(community.disableLeaveCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.leave'], "LEAVE_DISABLED"));
    	  }
      }

      if (community.showCommunityMoveAction == true) {
         actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.move'], "MOVE"));
      } else {
    	  if(community.disableMoveCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.move'], "MOVE_DISABLED"));
    	  }
      }
      
      if (this.isNotEmpty(community.deleteUrl)) {
         actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.delete'], "DELETE"));
      } else {
    	  if(community.disableDeleteCommunityActionItem == true){
    		  actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.delete'], "DELETE_DISABLED"));
    	  }
      }
      
      if (this.isNotEmpty(community.createCommunityCopyUrl)) {
          actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.createCopy'], "CREATECOPY"));
      } else {
    	  if(community.disableCopyCommunityActionItem == true){
              actionsMenu.addChild(lconn.communities.bizCard.core.buildActionsMenuItemDisabled(messages['label.top.buttons.createCopy'], "CREATECOPY_DISABLED"));
    	  }
      }

      var temp = function(item) {
            if (item != null) {
               if(item.action == "MOVE") {
                  lconn.communities.bizCard.core.moveCommunity(community);
               } else if (item.action == "GOTOCOMM") {
                  location.href = lconn.communities.bizCard.core.community.homeUrl;
               } else if (item.action == "EMAIL") {
                  lconn.communities.bizCard.core.openComposeEmail(lconn.communities.bizCard.core.getComposeURL(lconn.communities.bizCard.core.community));
               } else if (item.action == "SUBSCRIBE") {
                  lconn.communities.bizCard.core.confirmCommunitySubscribe();
               } else if (item.action == "UNSUBSCRIBE") {
                  lconn.communities.bizCard.core.confirmCommunityUnsubscribe();
               } else if (item.action == "CUSTOMIZE") {
                  lconn.core.applicationPalette.showPalette();
               } else if (item.action == "CUSTOMIZEURL") {
            	   // (COMMUNITY-180) Redirect to Highlights Admin Panel -> Apps after clicking on Community Actions-> Add Apps
            	   //  check if startPage is "" then redirect to 'Overview' else redirect to Highlights
            	     if(lconn.communities.bizCard.core.community.startPage==""){
            			     location.href = lconn.communities.bizCard.core.community.customizeUrl;
            		   }else{
            		      	var isHighlightsLandingPage =lconn.communities.bizCard.core.isHighlightsStartPage();
            			      highlightsWidgetDefId=isHighlightsLandingPage[1];
      						      if(isHighlightsLandingPage[0]== true){
			        			       location.href = lconn.communities.bizCard.core.community.customizeUrl+'#fullpageWidgetId=' + highlightsWidgetDefId;   
            	          }else{
            	            location.href = lconn.communities.bizCard.core.community.customizeUrl;
						            }
				          	}
               } else if (item.action == "CHANGELAYOUT") {
                  lconn.core.applicationPalette.showPalette(lconn.core.applicationPalette.CHANGE_LAYOUT_TAB);
               } else if (item.action == "CHANGELAYOUTURL") {
                  location.href = lconn.communities.bizCard.core.community.changeLayoutUrl;                  
               } else if (item.action == "EDIT") {
                  displayCommunityEdit();
               } else if (item.action == "EDITURL") {
                  location.href = lconn.communities.bizCard.core.community.editUrl;
               } else if (item.action == "MODERATE") {
                  location.href = community.moderationServiceUrl + community.uuid;
               } else if (item.action == "METRICS") {
                  location.href = community.metricsServiceUrl.replace("${0}", community.uuid);
               } else if (item.action == "EDITSUB") {
                  displaySubcommunityEdit();
               } else if (item.action == "EDITSUBURL") {                  
                  location.href = lconn.communities.bizCard.core.community.editSubUrl;
               } else if (item.action == "DELETE") {
                  lconn.communities.bizCard.core.confirmCommunityDeletion(community);
               } else if (item.action == "CREATESUB") {
                  displaySubcommunityCreate();
               } else if (item.action == "CREATESUBURL") {                  
                  location.href = lconn.communities.bizCard.core.community.createSubUrl;
               } else if (item.action == "LEAVE") {
                  lconn.communities.bizCard.core.confirmCommunityLeave();
               } else if (item.action == "JOIN") {
                  lconn.communities.bizCard.core.setJoinCommunityReqCookie();
                  lconn.communities.bizCard.core.doDangerousAction(lconn.communities.bizCard.core.community.memberJoinURL);
               } else if (item.action == "REQUESTJOIN") {
                  lconn.communities.bizCard.core.doDangerousAction(lconn.communities.bizCard.core.community.memberJoinURL);
               } else if (item.action == "CREATECOPY") {                  
                   location.href = community.createCommunityCopyUrl;
               }
            }
         }
      dojo.connect(actionsMenu, "onItemClick", temp);
      return actionsMenu;
   },

   buildActionsMenuItem: function(label, action) {
      var tempId = "communityMenu_" + action;

/*
      try {                                    
          dijit.byId(tempId).destroy();
      } 
      catch (e) {
          console.log(e);
      }
      */
      dojo['require']("dijit.Menu");
      var item = new dijit.MenuItem({
         label: label,
         id: tempId
      });
      item.action = action;
      return item;
   },

   buildActionsMenuItemDisabled: function(label, action) {
      var tempId = "communityMenu_DISABLED_" + action;

/*
      try {
          dijit.byId(tempId).destroy();
      }
      catch (e) {
          console.log(e);
      }
      */
      dojo['require']("dijit.Menu");
      var item = new dijit.MenuItem({
         label: label,
         id: tempId,
         style: "color:gray;cursor:not-allowed;"
      });
      item.action = action;
      return item;
   },

   openActionsMenu: function(evt) {
      try {
         var actionsMenu = lconn.communities.bizCard.core.buildActionsMenu(lconn.communities.bizCard.core.community);
         
         if (evt.target.id != null) {
            dojo.attr(evt.target, "aria-owns", evt.target.id + "_dropdown");
         }
         menuUtility.openMenu(evt, actionsMenu.id);
         dojo.stopEvent(evt);
      } catch (e) {
         console.log(e);
      }
   },

   closeActionsMenu: function() {
      var tempMenu = dijit.byId("CommunitiesActionsMenuMain");
      if (tempMenu) dijit.popup.close(tempMenu);
   },

   getComposeURL: function(community) {
      var baseURL = lconn.core.bizCard.bizCardUtils.getBaseURL("hgroup");
      return baseURL + "/service/html/composeemail?communityUuid=" + community.uuid;
   },

   joinComm: function() {
      lconn.communities.bizCard.core.setJoinCommunityReqCookie();
      lconn.communities.bizCard.core.doDangerousAction(lconn.communities.bizCard.core.community.memberJoinURL);
   },

   setCommunitiesReqCookie: function() {
      var contextRoot = location.href.substr(0, location.href.indexOf("/service"));
      contextRoot = contextRoot.substr(contextRoot.indexOf("/", contextRoot.indexOf("://") + 3));

      document.cookie = "CommunitiesReqURL=" + location.href + "; expires=" + new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toGMTString() 
         + "; SameSite=None; path=" + contextRoot + lconn.core.util.Cookie.secureString();
   },


   addCommunityActionsMenuUI: function(community) {
	          
      // Update theming to match community's org's theme
      // instead of user's org's theme.
      if (dojo.exists("lotuslive.widgets.common.setThemingToUseContentOrg")) {
          lotuslive.widgets.common.setContentOrg(community.communityOrgId);
	 	  lotuslive.widgets.common.setThemingToUseContentOrg(true);
	  }
      
      var messages = this.messages;
      var communityActions = this._getCommunityActionsNode();
      if (communityActions != null) {
         if (!community.authContextAuthenticated) {
            if (this._nonCommunityActionBar == false) { // Don't insert login action into other component's action bar
               var li = this.createActionListItem();
               li.innerHTML = community.translatedLoginLinkToParticipate
               dojo.place(li, communityActions);
               //Task 71647 - Update logoutLink listener to use Common JS API
               //
               dojo.connect(li, 'onclick', function() {
                  lconn.core.auth.login();
               });
               dojo.publish("CommunityActionBar", [{
                  type: "CreatedLogin",
                  community: community,
                  node: li
               }]);
            }
            return;
         }

         // Show Join button
         if (!community.showMemberActions && this.isNotEmpty(community.memberJoinURL) && !community.isSuperAdmin) {                                           
            
            // If menu element doesn't exist, create it
            var li = dojo.byId("joinDisplayActionsBtnLi");
            if (li == null) {                       
                li = this.createActionListItem();
                dojo.attr(li, "id", "joinDisplayActionsBtnLi");
                if (community.canJoinCommunity == true) {
                   li.innerHTML = '<a id="joinDisplayActionsBtn" href="javascript:lconn.communities.bizCard.core.joinComm();" role="button" title="' + messages['label.top.buttons.join.title'] + '" alt="' + messages['label.top.buttons.join'] + '">' + messages['label.top.buttons.join'] + '</a>';
                } 
                else {
                   li.innerHTML = '<a id="joinDisplayActionsBtn" href="' + community.memberJoinURL + '" role="button" title="' + messages['label.top.buttons.requestToJoin.title'] + '" alt="' + messages['label.top.buttons.requestToJoin'] + '">' + messages['label.top.buttons.requestToJoin'] + '</a>';
                }
                dojo.place(li, communityActions);
            } 
            // If menu element already exists, replace its contents
            else {                
                if (community.canJoinCommunity == true) {
                   li.innerHTML = '<a id="joinDisplayActionsBtn" href="javascript:lconn.communities.bizCard.core.joinComm();" role="button" aria-owns="joinDisplayActionsBtn" title="' + messages['label.top.buttons.join.title'] + '" alt="' + messages['label.top.buttons.join'] + '">' + messages['label.top.buttons.join'] + '</a>';
                } 
                else {
                   li.innerHTML = '<a id="joinDisplayActionsBtn" href="' + community.memberJoinURL + '" role="button" aria-owns="joinDisplayActionsBtn" title="' + messages['label.top.buttons.requestToJoin.title'] + '" alt="' + messages['label.top.buttons.requestToJoin'] + '">' + messages['label.top.buttons.requestToJoin'] + '</a>';
                }
            }
            dojo.publish("CommunityActionBar", [{
               type: "CreatedJoin",
               community: community,
               node: li
            }]);
         }
                  
         if (community.showMemberActions || community.isSuperAdmin) {
            // Defect 75156 - check for existing Community Actions button, and 
            // delete before creating new one.
            var topBtn = dojo.byId("displayActionsBtn");
            if (topBtn) {
               var btnParentNode = topBtn.parentNode;
               dojo.destroy(btnParentNode);
               this._firstActionShown = false;
            }

            // Show action button
            //aria-describedby="descr_id"
            var li = this.createActionListItem();
            // Note the extra space between label and dropdown arrow as mandated by OneUI markup
            li.innerHTML = '<a id="displayActionsBtn" href="javascript:;" role="button" aria-haspopup="true">' + messages['label.top.buttons.com.actions'] + ' <img class="lotusArrow lotusDropDownSprite" src="' + dijit._Widget.prototype._blankGif + '" role="presentation" alt=""/>' + '<span role="presentation" class="lotusAltText">&#x25bc;</span>' + '</a>';
            dojo.place(li, communityActions);
            this.community = community;
            this.enableTopButton("displayActionsBtn", lconn.communities.bizCard.core.openActionsMenu);
            dojo.publish("CommunityActionBar", [{
               type: "CreatedAction",
               community: community,
               node: li
            }]);
         }
         dojo.publish("CommunityActionBar", [{
            type: "Created",
            community: community
         }]);
      }
   },
   
   // Build the dropdown navigation menu
   buildDropdownNavMenu: function() {
      // Place dropdown nav menu in container
      var dropdownNavMenu = dojo.byId("leftNavMenu");
      dropdownNavMenu.parentNode.removeChild(dropdownNavMenu);
      dojo.attr(dropdownNavMenu, "id", "dropdownNavMenu");
      dojo.addClass(dropdownNavMenu, "lotusHidden");  
      var dropdownNavMenuContainer = dojo.byId("dropdownNavMenuContainer");
      dojo.place (dropdownNavMenu, dropdownNavMenuContainer, "last");
      var dropdownNavLabel = dojo.byId('applicationDropdownLabel');
      if (window.gatekeeperConfig && window.gatekeeperConfig['catalog-card-updated'] && dropdownNavLabel) {
         dropdownNavLabel.parentNode.removeChild(dropdownNavLabel);
         dojo.attr(dropdownNavLabel, "for", "dropdownNavMenuContainer");
         dojo.place(dropdownNavLabel, dropdownNavMenuContainer, "before");
      }
   },

   // Attach menu to the DOM
   addCommunityNavMenuUI: function(dropdownNavMenuTitle, community) {
   
      var messages = this.messages;       
         this.community = community;
         
         // Build menu
         lconn.communities.bizCard.core.buildDropdownNavMenu();
         
      // Enable the navigation and subcommunity menu buttons
      lconn.communities.bizCard.core.enableMenuButtons(true);     
            
        // Add parent Community link to banner
        lconn.communities.bizCard.core.updateCommunityBanner(community);
   },
  
   // Enable the navigation and subcommunity menu buttons
   enableMenuButtons: function(enableArrows) {  
   
      // Enable main menu
      var navMenuTitle = dojo.byId("dropdownNavMenuTitleLink");
      var navMenuTitleAnc = dojo.byId("dropdownNavMenuTitleLinkAnc");

      // Connect onclick event
      dojo.connect(navMenuTitle, "onclick", this, function(evt) {          
         lconn.communities.bizCard.core.toggleDropdownNavMenu();
         if (evt != null) {
            dojo.stopEvent(evt);
         }
         return false;
        });
         
      // Close menu if the user clicks elsewhere
      dojo.connect(document, "onclick", this, function(evt) {  
         lconn.communities.bizCard.core.hideDropdownMenu("dropdownNavMenu");
      });

      // Connect mouse enter/leave events
      var menuContainer = dojo.byId("dropdownNavMenuContainer");
      dojo.connect(menuContainer, "onmouseenter", this, function(evt) {          
         lconn.communities.bizCard.core.autoOpenMenu("dropdownNavMenu");
         if (evt != null) {
            dojo.stopEvent(evt);
         }
         return false;
      });
      dojo.connect(menuContainer, "onmouseleave", this, function(evt) { 
         if (this._mouseOpenNavMenu) {

            // Verify that IE is telling the truth (Defect 144241)
            var hasLeftMenu = true; 
            if (dojo.isIE) {
               var elementUnderMouse = document.elementFromPoint(evt.clientX, evt.clientY);
               if (elementUnderMouse) {
                  hasLeftMenu = this.hasLeftMenu("dropdownNavMenuContainer", elementUnderMouse);
               }
            }
            if (hasLeftMenu) {
               this._mouseOpenNavMenu = false;
               lconn.communities.bizCard.core.autoCloseMenu("dropdownNavMenu");
            }
         }
         // Clear timer that hasn't fired
         if (this._openingNavMenuTimer != null) {
            try { 
               clearTimeout(this._openingNavMenuTimer);
            }
            catch (e) { }
            this._openingNavMenuTimer = null; 
         }
         if (evt != null) {
            dojo.stopEvent(evt);
         }
         return false;
      }); 
      
      // Enable arrow keys
      var menuArray = dojo.query("li", "dropdownNavMenu");
      var code = null;
      dojo.forEach(menuArray, function(menuEntry, ii) {           
         dojo.connect(menuEntry, 'onkeydown', menuEntry, function(evt) {  
            // console.log("***** Navbar key pressed");
            if (evt) {
               code = evt.keyCode || evt.charCode;
               switch(code){
                  case dojo.keys.ENTER:
                  case dojo.keys.SPACE:
                     // console.log("***** Navbar enter/space pressed, click entry");
                     var curlink = dojo.query("a", this)[0];
                     if (curlink) {
                        curlink.click();
                     }
                     dojo.stopEvent(evt);
                     break;

                  case dojo.keys.UP_ARROW:
                  case dojo.keys.DOWN_ARROW:
                     if (enableArrows) {
                        // console.log("***** Navbar arrow key pressed, changing selection");
                        lconn.communities.bizCard.core.moveMenuSelection("dropdownNavMenu", code);
                        dojo.stopEvent(evt);
                     }
                     break;   
                  
                  case dojo.keys.ESCAPE:  
                  case dojo.keys.TAB:
                     // console.log("***** Navbar tab/escape key pressed, closing menu");
                     lconn.communities.bizCard.core.hideDropdownMenu("dropdownNavMenu");  
                     dojo.stopEvent(evt);
                     break;
               }
            }
         });               
      });      
      
      // Enable subcommunity menu
      lconn.communities.bizCard.core.enableSubcommunitiesMenu();
      
      // Make sure menu can always expand downward (as
      // lotusInner turns off menu overflow)
      var elm = dojo.byId("dropdownNavMenuContainer")
      while (elm && elm.parentNode) {
         elm = elm.parentNode;
         if (dojo.hasClass(elm, 'lotusInner')) {
            dojo.removeClass(elm, 'lotusInner');
            break;
         }
         else if (dojo.hasClass(elm, 'lotusColLeft')) {
            break;
         }
      }
   },

   // Enable Subcommunities menu (if there are any Subcommunities)
   enableSubcommunitiesMenu: function() {
      var messages = this.messages;
      var subMenu = dojo.byId("dropdownSubMenu");
      if (subMenu) {                
         header = subMenu.getElementsByTagName("h3")[0];          
         if (header) {                 
            header.parentNode.removeChild(header);
            var subMenuName = dojo.byId("dropdownSubMenuSelection");
            if (window.gatekeeperConfig && window.gatekeeperConfig['catalog-card-updated']) {
            	subMenuName.innerHTML = messages['label.subcommunities.default'];
            } else {
            	subMenuName.innerHTML = messages['label.subcommunities'];
            }
            var subMenuTitle = dojo.byId("dropdownSubMenuTitleLink");
            var subMenuTitleAnc = dojo.byId("dropdownSubMenuTitleLinkAnc");
            
            // Connect onclick event
            dojo.connect(subMenuTitle, "onclick", this, function(evt) {             
               lconn.communities.bizCard.core.toggleDropdownSubMenu();
               if (evt != null) {
                  dojo.stopEvent(evt);
               }
               return false;
            });
            
            // Close menu if the user clicks elsewhere
            dojo.connect(document, "onclick", this, function(evt) {  
               lconn.communities.bizCard.core.hideDropdownMenu("dropdownSubMenu");
            });   
            dojo.removeClass(dojo.byId("dropdownSubMenuContainer"), 'lotusHidden'); 
            var subMenuLabel = dojo.byId("subcommunityDropdownLabel");
            if (subMenuLabel) {
            	dojo.removeClass(subMenuLabel, 'lotusHidden');
            }
            
            var menuContainer = dojo.byId("dropdownSubMenuContainer");
            dojo.connect(menuContainer, "onmouseenter", this, function(evt) { 
               lconn.communities.bizCard.core.autoOpenMenu("dropdownSubMenu");
               if (evt != null) {
                  dojo.stopEvent(evt);
               }
               return false;
            });
            dojo.connect(menuContainer, "onmouseleave", this, function(evt) { 
               if (this._mouseOpenSubMenu) {
                  
                  // Verify that IE is telling the truth (Defect 144241)
                  var hasLeftMenu = true; 
                  if (dojo.isIE) {
                     var elementUnderMouse = document.elementFromPoint(evt.clientX, evt.clientY);
                     if (elementUnderMouse) {
                        hasLeftMenu = this.hasLeftMenu("dropdownSubMenuContainer", elementUnderMouse);
                     }
                  }
                  if (hasLeftMenu) {
                     this._mouseOpenSubMenu = false;
                     lconn.communities.bizCard.core.autoCloseMenu("dropdownSubMenu");
                  }
               }
               // Clear timer that hasn't fired
               if (this._openingSubMenuTimer != null) {
                  try { 
                     clearTimeout(this._openingSubMenuTimer);
                  }
                  catch (e) { }
                  this._openingSubMenuTimer = null; 
               }
               if (evt != null) {
                  dojo.stopEvent(evt);
               }
               return false;
            }); 
                              
            // Enable arrow keys
            var menuArray = dojo.query("li", "dropdownSubMenu");  
            var code = null;
            dojo.forEach(menuArray, function(menuEntry, ii) {              
               dojo.connect(menuEntry, 'onkeydown', menuEntry, function(evt) {   
                  if (evt) {
                     code = evt.keyCode || evt.charCode;
                     switch(code){
                        case dojo.keys.ENTER:
                        case dojo.keys.SPACE:
                           // console.log("***** Subcommunity enter/space pressed, click entry");
                           var curlink = dojo.query("a", this)[0];
                           if (curlink) {
                              curlink.click();
                           }
                           dojo.stopEvent(evt);
                           break;                  
                        case dojo.keys.UP_ARROW:
                        case dojo.keys.DOWN_ARROW:
                           // console.log("***** Subcommunity arrow key pressed, changing selection");                     
                           lconn.communities.bizCard.core.moveMenuSelection("dropdownSubMenu", code);
                           dojo.stopEvent(evt);
                           break;   
                        case dojo.keys.ESCAPE:                    
                        case dojo.keys.TAB:
                           // console.log("***** Subcommunity tab/escape key pressed, closing menu");
                           lconn.communities.bizCard.core.hideDropdownMenu("dropdownSubMenu");
                           dojo.stopEvent(evt);
                           break;
                     }
                  }
               });               

            });   
         }
      }
   },
   
   // Adjust the position of the dropdown menu if it won't fit
   // below the button
   adjustMenuPosition: function(menu) {
   
      // console.log("***** Entered adjustMenuPosition");
      var dropdownMenu, dropdownMenuRect;
      var dropdownMenuTitle, dropdownMenuTitleRect;
      var lotusMain, lotusMainRect;
      var lenAbove, lenBelow, adjust;
      var dropdownMenuHeight, dropdownMenuTitleHeight;
      
      // Determine if adjustment needed   
      var viewport = dojo.window.getBox();
      dropdownMenu = dojo.byId(menu);
      dropdownMenuRect = dropdownMenu.getBoundingClientRect();
      dropdownMenuHeight = dropdownMenuRect.bottom - dropdownMenuRect.top
      
      var checkFit = viewport.h - dropdownMenuRect.bottom;
      if (checkFit < 0 ) {
         // console.log("***** Menu does not fit");
         
         // Determine placement of container
         lotusMain = dojo.byId("lotusMain");
         if (!lotusMain) {
            lotusMain = dojo.query(".lotusMain")[0];
         }
         if (lotusMain) {
            lotusMainRect = lotusMain.getBoundingClientRect(); 
         }
         // Determine placement of menu button
         if (menu == "dropdownNavMenu") {                
            dropdownMenuTitle = dojo.byId("dropdownNavMenuTitle");               
         }
         else {
            dropdownMenuTitle = dojo.byId("dropdownSubMenuTitle")
         }
         dropdownMenuTitleRect = dropdownMenuTitle.getBoundingClientRect();
         dropdownMenuTitleHeight = dropdownMenuTitleRect.bottom - dropdownMenuTitleRect.top
               
         // Determine available space above button
         lenAbove = dropdownMenuTitleRect.top;
         lenAbove = (lenAbove < 0) ? 0 : lenAbove;
         if (lenAbove > 0) {
            if (lotusMainRect) {
               var topMain = (lotusMainRect.top < 0) ? 0 : lotusMainRect.top;
               var lenMain = (dropdownMenuTitleRect.top - topMain) - 15;
               lenAbove = (lenAbove > lenMain) ? lenMain : lenAbove;
            }
         }
         
         // Determine available space below button
         var bottom = viewport.h;
         if (lotusMainRect) {
            bottom = (bottom > lotusMainRect.bottom) ? lotusMainRect.bottom : bottom;
         }
         lenBelow = (bottom - dropdownMenuTitleRect.bottom) - 15;
         lenBelow = (lenBelow < 0) ? 0 : lenBelow;
         // console.log("***** Length Above: "+lenAbove+" Length Below: "+lenBelow);
         
         // More room above button
         if (lenAbove >= lenBelow) {
            // console.log("***** More room above the button");
            if (dropdownMenuHeight > lenAbove) {
               dojo.style(dropdownMenu, {"overflowY":"scroll", "height":lenAbove+"px"});
               adjust = dropdownMenuTitleHeight + lenAbove - 1;
            }
            else {
               adjust = dropdownMenuTitleHeight + dropdownMenuHeight - 1;
            }
            
            var newtop = -adjust;
            dojo.style(dropdownMenu, "top", newtop+"px");
         }
         // More room below button
         else {
            // console.log("***** More room below the button");
            if (dropdownMenuHeight > lenBelow) {
               dojo.style(dropdownMenu, {"overflowY":"scroll", "height":lenBelow+"px"});
            }
         
         }
      }
   },
   
   // Make sure that we've REALLY left the menu as IE
   // can get confused if you move the mouse too fast 
   hasLeftMenu: function(dropdownMenuId, currentObj) {
      var retval = true;
      try {
         while (currentObj) {
            if (currentObj.id == dropdownMenuId) {
               retval = false;
               break;
            }
            else {
               currentObj = currentObj.parentNode;
            }
         }
      }
       catch (e) {}
 
       return retval;
   },

   // Update menu selection (wrapping at top and bottom)
   moveMenuSelection: function(menu, key) { 
      // console.log("***** Entered moveMenuSelection, current idx: "+this._currentMenuSelection);
      var menuArray = dojo.query("li", menu);      
      switch(key){
         case dojo.keys.DOWN_ARROW:
            // console.log("***** Down arrow pressed!");
            if (this._currentMenuSelection < menuArray.length-1) {
               this._currentMenuSelection++;       
            }
            else {      
               this._currentMenuSelection = 0;
            }
            this.updateSelectedEntry (menuArray, this._currentMenuSelection);
            break;
         case dojo.keys.UP_ARROW:
            // console.log("***** Up arrow pressed!");
            if (this._currentMenuSelection != 0) {
               this._currentMenuSelection--;
            }
            else {
               this._currentMenuSelection = menuArray.length-1;   
            }
            this.updateSelectedEntry (menuArray, this._currentMenuSelection);
            break;
      }
   },
   
   // Update DOM entry
   updateSelectedEntry: function(menuArray, selection) {
      // console.log("***** Entered updateSelectedEntry, selecttion: "+this._currentMenuSelection);
      dojo.forEach(menuArray, function(menuEntry, ii) {
         if (ii == selection) {
            // Defect 146110: aria-pressed not helpful in a dropdown, setting to false
            dojo.addClass(menuEntry, "lotusSelected");
            dojo.attr(menuEntry, {"aria-pressed":"false","tabindex":"0"});
            menuEntry.focus();
         }
         else {
            dojo.removeClass(menuEntry, "lotusSelected");
            dojo.attr(menuEntry, {"aria-pressed":"false","tabindex":"-1"});
         }
      });
   },
   
   // Open menu onmouseenter after delay
   autoOpenMenu: function(menu) {
      // console.log("***** Entered autoOpenMenu, menu: "+menu);
      if (menu == "dropdownNavMenu") {                
         lconn.communities.bizCard.core.hideDropdownMenu("dropdownSubMenu");
         if (!this._mouseOpenNavMenu) {
            if (!this._openingNavMenuTimer) {      
               this._openingNavMenuTimer = setInterval(function () {lconn.communities.bizCard.core.timedOpenMenu("dropdownNavMenu")}, this._openMenuDelay);       
            }
         }
         try { 
            clearTimeout(this._closingNavMenuTimer);
         }
         catch (e) { }
         this._closingNavMenuTimer = null;         
      }
      else {
         lconn.communities.bizCard.core.hideDropdownMenu("dropdownNavMenu");
         if (!this._mouseOpenNavMenu) {
            if (!this._openingSubMenuTimer) {      
               this._openingSubMenuTimer = setInterval(function () {lconn.communities.bizCard.core.timedOpenMenu("dropdownSubMenu")}, this._openMenuDelay);       
            }
         }
         try { 
            clearTimeout(this._closingSubMenuTimer);
         }
         catch (e) { }
         this._closingSubMenuTimer = null;
      }
      // console.log("***** left autoOpenMenu");
   },
      
   // Open menu on timer
   timedOpenMenu: function (menu) { 
      // console.log("***** Entered timedOpenMenu, menu: "+menu);
      if (menu == "dropdownNavMenu") {
         this._mouseOpenNavMenu = true;
         this.showDropdownMenu("dropdownNavMenu");
         try { 
            clearTimeout(this._openingNavMenuTimer);
         }
         catch (e) { }
         this._openingNavMenuTimer = null;         
      }
      else {
         this._mouseOpenSubMenu = true;
         this.showDropdownMenu("dropdownSubMenu"); 
         try { 
            clearTimeout(this._openingSubMenuTimer);
         }
         catch (e) { }
         this._openingSubMenuTimer = null;
      }
   },
   
   // Close menu onmouseleave after delay
   autoCloseMenu: function(menu) {  
      // console.log("***** Entered autoCloseMenu, menu: "+menu);
      if (menu == "dropdownNavMenu") {    
         if (!this._mouseOpenNavMenu) {
            if (!this._closingNavMenuTimer) {      
               this._closingNavMenuTimer = setInterval(function () {lconn.communities.bizCard.core.timedCloseMenu("dropdownNavMenu")}, this._hideMenuDelay);         
            }
         }
      }
      else {
         if (!this._mouseOpenSubMenu) {
            if (!this._closingSubMenuTimer) {      
               this._closingSubMenuTimer = setInterval(function () {lconn.communities.bizCard.core.timedCloseMenu("dropdownSubMenu")}, this._hideMenuDelay);         
            }
         }
      }
      // console.log("***** left autoCloseMenu");
   },

   // Close menu on timer
   timedCloseMenu: function (menu) {   
      // console.log("***** Entered timedCloseMenu, menu: "+menu);
      if (menu == "dropdownNavMenu") {
         this.hideDropdownMenu("dropdownNavMenu");
         try { 
            clearTimeout(this._closingNavMenuTimer);
         }
         catch (e) { }
         this._closingNavMenuTimer = null;         
      }
      else {
         this.hideDropdownMenu("dropdownSubMenu"); 
         try { 
            clearTimeout(this._closingSubMenuTimer);
         }
         catch (e) { }
         this._closingSubMenuTimer = null;
      }
   },
   
   // Write breadcrumb to banner if this is a Subcommunity 
   updateCommunityBanner: function(community) {
      var messages = this.messages;
      var htmlContent = "";
      var placeBar = null;
      var commElem = null;
      var type = null;
      
      placeBar = dojo.query(".lotusPlaceBar .lotusRightCorner .lotusInner")[0];
      if (placeBar) {
         commElem= placeBar.getElementsByTagName("h2")[0];
      }

      if (community.parentName != null && community.parentName.length > 0) {
         type =  community.externalAllowed ? "external" : community.parentType;
         htmlContent += this.formatCommunity(community.parentName, community.parentUrl, type);
         htmlContent += '<div class="comNavInline comNavArrow"><div class="comNavInline"><img class="lotusSprite lotusArrow lotusTwistyClosed" src="' + dojo.config.blankGif + '" alt="" title=""/></img></div><span class="lotusAltText">&#9658;</span></div>'; 
      }
      type =  community.externalAllowed ? "external" : community.communityType;
      htmlContent += this.formatCommunity(community.name, null, type);
      
      if (commElem) {
         dojo.place(htmlContent, commElem, "only");
      }  
      },
      
      // Format the Community for display
      formatCommunity: function(name, url, type) {    
         var htmlContent = "";
         
         // Format parent Community as link
         if (url) {        
            var altText = this.messages['tooltip.startpage'];
         htmlContent += '<a class="lotusBold comNavInline" role="button" href="' + url + '" title="' + altText + '">';              
         htmlContent += this.formatImage(type)                             
         htmlContent += name + '</a>';          
         }
         else {
            htmlContent += '<div class="comNavInline">' + this.formatImage(type)+ name + '</div>'; 
         }
         return htmlContent;
      },
      
      // Format the Community icon
      formatImage: function(type) {
         var htmlContent = ""; 
      if (type != "public") {    
         if (type == "external") {
            htmlContent += '<span class="lotusLeft comNavIcon">';
            htmlContent += '<img class="lotusui30 lconnIconListSharedExternal" src="' + dojo.config.blankGif + '" alt="' + this.messages['label.external.members.allowed'] + '" title="' + this.messages['label.external.members.allowed'] + '" />';  
            htmlContent += '</span>';
            htmlContent += '<span class="lotusAltText">' + this.messages['label.external.members.allowed'] + ' </span>';            
         }
            else if (type == "private") {
            htmlContent += '<span class="lotusLeft comNavIcon">';
            htmlContent += '<img class="iconsStates16 iconsStates16-CheckedOut" src="' + dojo.config.blankGif + '" alt="' + this.messages['label.private.community.alt.text'] + '" title="' + this.messages['label.private.community.alt.text'] + '" />';
            htmlContent += '</span>';
            htmlContent += '<span class="lotusAltText">' + this.messages['label.private.community.alt.text'] + ' </span>';  
            } 
            else {
            htmlContent += '<span class="lotusLeft comNavIcon">';
            htmlContent += '<img class="iconsOther16 iconsOther16-ModeratedCommunity16" src="' + dojo.config.blankGif + '" alt="' + this.messages['label.moderated.community.alt.text'] + '" title="' + this.messages['label.moderated.community.alt.text'] + '"/>';
            htmlContent += '</span>';
            htmlContent += '<span class="lotusAltText">' + this.messages['label.moderated.community.alt.text'] + ' </span>';          
            }           
      }
      return htmlContent; 
   },
   
   // Toggle the left navigation 
   toggleDropdownNavMenu: function() {
      if (this._subMenuOpen) {
         this.hideDropdownMenu("dropdownSubMenu");
      }
      lconn.communities.bizCard.core.toggleDropdownMenu("dropdownNavMenu");
   },
   
   // Toggle the subcommunities navigation 
   toggleDropdownSubMenu: function() { 
      if (this._navMenuOpen) {
         lconn.communities.bizCard.core.hideDropdownMenu("dropdownNavMenu");
      }
      lconn.communities.bizCard.core.toggleDropdownMenu("dropdownSubMenu")
   },

   // Toggle dropdown menu
   toggleDropdownMenu: function(menu) {   
      var open = (menu == "dropdownNavMenu") ? this._navMenuOpen : this._subMenuOpen;
      if (open) {
         lconn.communities.bizCard.core.hideDropdownMenu(menu); 
      }  
      else {
         lconn.communities.bizCard.core.showDropdownMenu(menu);
      }           
   },

   // Hide the dropdown menu
   hideDropdownMenu: function(menu) {  
      // console.log("***** Entered hideDropdownMenu, menu: "+menu);
      var dropdownMenu = dojo.byId(menu);
      if (dropdownMenu) {
         if (menu == "dropdownNavMenu" && this._navMenuOpen) {
            dojo.byId("dropdownNavMenuTitleLinkAnc").focus();
            dojo.addClass(dropdownMenu, "lotusHidden");
            this._mouseOpenNavMenu = false;
            this._navMenuOpen = false;
         }
         else if (menu == "dropdownSubMenu"  && this._subMenuOpen) {
            dojo.byId("dropdownSubMenuTitleLinkAnc").focus();
            dojo.addClass(dropdownMenu, "lotusHidden");
            this._mouseOpenSubMenu = false;
            this._subMenuOpen = false;
         }
      }
   },
   
   // Show the dropdown menu
   showDropdownMenu: function(menu) {
	  var menuSelectionElm, menuSelection, ii, itemLink, itemName, done;
      var dropdownMenu = dojo.byId(menu);
      if (dropdownMenu) {

         // Retrieve menu
		 var menuArray = dojo.query("li", dropdownMenu);

		 // Select first entry in the list by default
         this._currentMenuSelection = 0;

         if (menu == "dropdownNavMenu") {
            this._navMenuOpen = true;

            // Select dropdown entry that matches current selection
            menuSelectionElm = dojo.byId("dropdownNavMenuSelection");
            if (menuSelectionElm) {
				menuSelection = (menuSelectionElm.textContent).trim();

				ii = 0;
				done = false;
				while (ii < menuArray.length && !done) {
				   itemLink = dojo.query("a", menuArray[ii])[0];
				   if (itemLink) {
				   	  itemName = (itemLink.textContent).trim();
			   	   }
				   if (menuSelection === itemName) {
					  this._currentMenuSelection = ii;
					  done = true;
				   }
	        	   ii++
			    }
			}
         }
         else if (menu == "dropdownSubMenu") {
            this._subMenuOpen = true;
         }

         // Reset menu position to neutral and then position it again
         dojo.style(dropdownMenu, {"top":"auto", "overflowY":"hidden", "overflow":"hidden", "height":"auto"});
         dojo.removeClass(dropdownMenu, "lotusHidden");
         this.adjustMenuPosition(menu);

         // Update Selection
         this.updateSelectedEntry (menuArray, this._currentMenuSelection);
      }
   },
  
      addParentCommunity: function(community) {
      var messages = this.messages;
      var htmlContent = "";
      if (community.parentName != null && community.parentName.length > 0) {
         htmlContent += '<div class="lotusMenuSection lotusIndent10">';
         htmlContent += '<h3>';
         htmlContent += '<div class="lotusIndent15 communityLink">';
         htmlContent += '<a class="lotusBold" style="display:inline" role="button" href="' + community.parentUrl + '" title="' + messages['tooltip.startpage'] + '">';

         if (community.parentType != "public") {
            {
               if (community.parentType == "private") {
                  htmlContent += '<img class="iconsStates16 iconsStates16-CheckedOut" src="' + dojo.config.blankGif + '" alt="' + messages['label.private.community.alt.text'] + '" title="' + messages['label.private.community.alt.text'] + '" />';
                  htmlContent += '<span class="lotusAltText">' + messages['label.private.community.alt.text'] + ' </span>';
               } else {
                  htmlContent += '<img class="iconsOther16 iconsOther16-ModeratedCommunity16" src="' + dojo.config.blankGif + '" alt="' + messages['label.moderated.community.alt.text'] + '" title="' + messages['label.moderated.community.alt.text'] + '"/>';
                  htmlContent += '<span class="lotusAltText">' + messages['label.moderated.community.alt.text'] + ' </span>';
               }
            }
         }
         htmlContent += ' ' + community.parentName + '</a>';
         htmlContent += '</div> </h3>';
         htmlContent += '</div><!--end section-->';
      }
      return htmlContent;

   },

   addSubCommunities: function(community) {
      var messages = this.messages;
      var htmlContent = "";
      if (community.subcommunities != null && community.subcommunities.length > 0) {
         htmlContent = '\
         <div class="lotusMenuSection" role="navigation" aria-label = "' + messages['label.subcommunities'] + '">\
            <h3>\
               <label for="' + community.uuid + '_subtwisty" id="' + community.uuid + '_subtwisty_label" class="lotusAccess">\
               ' + messages['label.collapse'] + ' ' + messages['label.subcommunities'] + '\
               </label>\
               <a role="button" \
                     title="' + messages['label.collapse'] + '" href="javascript:;" \
                     onfocus="lconn.communities.bizCard.core.setReaderContent(\'' + community.uuid + '_subtwisty_label\', true);"\
                     onblur="lconn.communities.bizCard.core.setReaderContent(\'' + community.uuid + '_subtwisty_label\', false);"\
                     onclick="lconn.communities.bizCard.core.toggleSection(\'' + community.uuid + "_subtwisty" + '\',\'' + community.uuid + "_comm_subLinks" + '\',\'' + community.uuid + "_subAltOpen" + '\');"\
               >\
                  <span id="' + community.uuid + '_subtwisty" class="lotusSprite lotusArrow lotusTwistyOpen"></span> \
                  <span id="' + community.uuid + '_subAltOpen" class="lotusAltText">&#x25bc;</span>\
                  <span id="' + community.uuid + '_subAltClosed" class="lotusHidden">&#x25BA;</span>\
                  <span> ' + messages['label.subcommunities'] + '</span>\
               </a>\
            </h3>\
            <div id="' + community.uuid + '_comm_subLinks" class="lotusMenuSubsection">\
               <ul role="toolbar" aria-label="' + messages['label.subcommunities'] + '">';

		 // Build Subcommunity list w/ encoded names
         for (var i = 0; i < community.subcommunities.length; i++) {
            var sub1 = community.subcommunities[i];

            var dirName = lconn.core.HTMLUtil.escape_q(sub1.name);
            if (dojo.exists("lconn.core.globalization.bidiUtil.enforceTextDirection")) {
               dirName = lconn.core.globalization.bidiUtil.enforceTextDirection(dirName);
            }
         	htmlContent += '\
                  <li role="button" >\
                     <a href="' + sub1.url + '" title="' + dirName + '">' + dirName + '</a>\
                  </li>';
         	}
         htmlContent += '\
               </ul>\
            </div>\
         </div>';
      }
      return htmlContent;
      },
   
   setReaderContent: function(id, enable) {
      var node = dojo.byId(id);
      if (node != null) {
         if (enable) {
            node.setAttribute("aria-live","polite");
         } else {
            node.removeAttribute("aria-live");
         }
      }   
   },

   toggleSection: function(twistyDomId, linksSectionDomId, altTextDomId, cookieName) {
        
      var messages = this.messages;
     var twistyDomNode = dojo.byId(twistyDomId);
      var appLinksDomNode = dojo.byId(linksSectionDomId);
      var altTextDomNode = dojo.byId(altTextDomId);
     var accyDomNode = dojo.byId(twistyDomId + "_label");

      if (appLinksDomNode.style.display == "none") {
         // Open
         // Remove sfx as they are no longer the OneUI standard
         // if(dojo.fx != null) 
         //   dojo.fx.wipeIn({node: appLinksDomNode, duration: 300}).play(); 
         // else
         //   lconn.core.utilities.show(appLinksDomNode, false, false, true);
         appLinksDomNode.style.display = "block";

         dojo.removeClass(twistyDomNode, 'lotusTwistyClosed');
         dojo.addClass(twistyDomNode, 'lotusTwistyOpen');
         dojo.attr(twistyDomNode, 'title', messages['label.collapse']);
         if (dojo.cookie && typeof cookieName == "string") dojo.cookie(cookieName, 1 /* open */ );
         altTextDomNode.innerHTML = "&#x25bc;";
         if (accyDomNode) accyDomNode.innerHTML = messages['label.collapse'] + ' ' + messages['label.subcommunities'];
      } else {
         // Close
         // Remove sfx as they are no longer the OneUI standard
         // if(dojo.fx != null)
         //   dojo.fx.wipeOut({node: appLinksDomNode, duration: 300}).play();
         // else
         //   lconn.core.utilities.hide(appLinksDomNode, false, true);             
         appLinksDomNode.style.display = "none";

         dojo.removeClass(twistyDomNode, 'lotusTwistyOpen');
         dojo.addClass(twistyDomNode, 'lotusTwistyClosed');
         dojo.attr(twistyDomNode, 'title', messages['label.expand']);
         if (dojo.cookie && typeof cookieName == "string") dojo.cookie(cookieName, 0 /* close */ );
         altTextDomNode.innerHTML = "&#x25ba;";
       if (accyDomNode) accyDomNode.innerHTML = messages['label.expand'] + ' ' + messages['label.subcommunities'];
      }
   },

   showFollowConfirmation: function(message) {
	   
	   // Insert above banner column if it exists, else insert as first child of lotusContent
	  var msgParent;
	  var banner = dojo.query(".lotusWidget_3columnsWithBannerTopMenuLayout #lotusColBanner"); 
	  if (banner.length > 0) {
		  msgParent = banner[0].parentNode;
	  } else {
		  msgParent = dojo.byId("lotusContent");
	  }
	  
      if (msgParent) {                        
            if (this._messageDiv == null) {
                           
	               // Create message area
	            this._messageDiv = document.createElement("div");  
	            dojo.attr(this._messageDiv, "role", "alert");       
	            dojo.attr(this._messageDiv, "aria-live", "assertive");
	            msgParent.insertBefore(this._messageDiv, msgParent.firstChild);                   
            }
            else {            
            
               // Clear any existing message                                     
            this.clearMessage();
            }
         
            this._messageWidget = new com.ibm.oneui.controls.MessageBox({
                canClose: true,
                _strings: {
                    icon_alt: this.messages["label.msgbox.success"],
                    a11y_label: this.messages["label.msgbox.success.a11y"],
                    close_btn_title: this.messages["label.msgbox.close"],
                    close_btn_alt: this.messages["label.msgbox.close"]
                },
                type: com.ibm.oneui.controls.MessageBox.TYPE.SUCCESS,
                msg: message
            }, dojo.byId(this._messageDiv));          
       }
    },

   // Clear message box (when a new message needs to
   // supercede an old one)
   clearMessage: function() {

      if (this._messageWidget) {
         this._messageWidget.destroy();
      }
   },

   follow: function() {
     if (!dojo.exists("dijit.byId")) return;
      var messages = this.messages;
      var temp = function(response, ioArgs) {
            var msgKey;
            if ((lconn.communities.bizCard.bizCard.currentCommunity && lconn.communities.bizCard.bizCard.currentCommunity.memberJoinURL) // biz card based page
            || (lconn.communities.bizCard.core.community && lconn.communities.bizCard.core.community.memberJoinURL)) { // community overview page
               msgKey = 'label.action.confirm.community.after.follow.nonmember';
            } else {
               msgKey = 'label.action.confirm.community.after.follow.member';
            }
            lconn.communities.bizCard.core.showFollowConfirmation(messages[msgKey]);

            var menuItem = dijit.byId("communityMenu_FOLLOW");
            if (menuItem == null) menuItem = dijit.byId("communityMenu_UNFOLLOW");
            if (menuItem != null) {
               dojo.attr(menuItem, "label", messages['label.top.buttons.unfollow']);
               dojo.attr(menuItem, "title", messages['label.top.buttons.unfollow.title']);
               menuItem.onClick = function() {
                  lconn.communities.bizCard.core.unFollow();
               };
            }

            var followLink = dojo.byId("followDisplayActionsBtn");
            if (followLink != null) {
               followLink.innerHTML = messages['label.top.buttons.unfollow'];

               if (dojo.isIE) followLink.onclick = function() {
                  lconn.communities.bizCard.core.unFollow();
               };
               else followLink.setAttribute("onclick", "lconn.communities.bizCard.core.unFollow()");

               dojo.attr(followLink, "title", messages['label.top.buttons.unfollow.title']);
               followLink.setAttribute("aria-label", messages['label.top.buttons.unfollow']);
            }
            dojo.publish("lconn.comm.commFollowed", [lconn.communities.bizCard.core.community.uuid]);
         }
      var url = lconn.communities.bizCard.core.community.followUrl;
      if (url == null) {
         url = lconn.communities.bizCard.core.community.unfollowUrl;
         url = url.replace("memberunfollowsubmit", "memberfollowsubmit");
      }

      if (window.SemTagSvcConfig != null && SemTagSvcConfig.proxyURL != null) {
         var ph = new lconn.core.url.ProxyUrlHelper(SemTagSvcConfig.proxyURL);
         url = ph.getProxifiedURL(url);
      }

      dojo.xhrGet({
         url: url,
         headers: {
            'X-Update-Nonce': 'true'
         },
         load: temp,
         error: this.xhrErrorCallback
      });
      return false;
   },

   xhrErrorCallback: function() {
      console.log("Action menu error callback");
      return function(response, ioArgs) {

         var messages = lconn.communities.bizCard.core.messages;

         var message;
         if (ioArgs.xhr.status == 401) {
            message = messages['label.msg.action.failed.need.login'];
         } else {
            message = messages['label.msg.action.failed'].replace("${0}", response);
         }

         var lotusContent = dojo.byId("lotusContent");
         if (lotusContent != null) {
            var confirmDivId = "followCommunityConfirmId";

            var existingMessage = dojo.byId(confirmDivId);
            if (existingMessage != null) {
               existingMessage.innerHTML = "";
               existingMessage.parentNode.removeChild(existingMessage);
            }

            var newDiv = document.createElement("div");
            dojo.addClass(newDiv, "lotusMessage2");
            dojo.attr(newDiv, "role", "alert");
            dojo.attr(newDiv, "id", confirmDivId);
            dojo.attr(newDiv, "aria-live", "assertive");
            newDiv.innerHTML = '<img class="lconnSprite lconnSprite-iconError16" title="' + messages['label.msg.error'] + '" alt="' + messages['label.msg.error'] + '" src="' + dijit._Widget.prototype._blankGif + '">';

            var span = document.createElement("span");
            span.innerHTML = message;
            newDiv.appendChild(span);

            lotusContent.insertBefore(newDiv, lotusContent.firstChild);
         }
      }
   },

   unFollow: function() {
     if (!dojo.exists("dijit.byId")) return;
      var messages = this.messages;
      var temp = function(response, ioArgs) {
            lconn.communities.bizCard.core.showFollowConfirmation(messages['label.action.confirm.community.after.unfollow']);

            var menuItem = dijit.byId("communityMenu_UNFOLLOW");
            if (menuItem == null) menuItem = dijit.byId("communityMenu_FOLLOW");
            if (menuItem != null) {
               dojo.attr(menuItem, "label", messages['label.top.buttons.follow']);
               dojo.attr(menuItem, "title", messages['label.top.buttons.follow.title']);

               menuItem.onClick = function() {
                  lconn.communities.bizCard.core.follow();
               };
            }

            var followLink = dojo.byId("followDisplayActionsBtn");
            if (followLink != null) {
               followLink.innerHTML = messages['label.top.buttons.follow'];

               if (dojo.isIE) followLink.onclick = function() {
                  lconn.communities.bizCard.core.follow();
               };
               else followLink.setAttribute("onclick", "lconn.communities.bizCard.core.follow()");
               followLink.setAttribute("aria-label", messages['label.top.buttons.follow']);
               dojo.attr(followLink, "title", messages['label.top.buttons.follow.title']);
            }

            dojo.publish("lconn.comm.commUnFollowed", [lconn.communities.bizCard.core.community.uuid]);
         }

      var url = lconn.communities.bizCard.core.community.unfollowUrl;
      if (url == null) {
         url = lconn.communities.bizCard.core.community.followUrl;
         url = url.replace("memberfollowsubmit", "memberunfollowsubmit");
      }

      if (window.SemTagSvcConfig != null && SemTagSvcConfig.proxyURL != null) {
         var ph = new lconn.core.url.ProxyUrlHelper(SemTagSvcConfig.proxyURL);
         url = ph.getProxifiedURL(url);
      }

      dojo.xhrGet({
         url: url,
         headers: {
            'X-Update-Nonce': 'true'
         },
         load: temp,
         error: this.xhrErrorCallback
      });
      return false;
   },


   addFollowActionsMenuUI: function(community) {
      if (!dojo.exists("dijit.byId")) return;
      var messages = this.messages;
      var followActionBar = dojo.byId("followActionBar");
      var followMenu = dijit.byId("followDropDownMenu"); //TODO get menu when in other apps
      var actions = this._getCommunityActionsNode();

      //inside community overview, member not in communities
      if (community.isCommunityOverview && this.isNotEmpty(community.followUrl)) {
         var li = this.createActionListItem();
         li.innerHTML = '<a id="followDisplayActionsBtn" href="javascript:void(0);" role="button" onclick="lconn.communities.bizCard.core.follow()" title="' + messages['label.top.buttons.follow.title'] + '">' + messages['label.top.buttons.follow'] + '</a>';
         dojo.place(li, actions);
         dojo.publish("FollowActionBar", [{
            type: "CreatedFollow",
            community: community,
            node: li
         }]);
      } else if (community.isCommunityOverview && this.isNotEmpty(community.unfollowUrl)) {
         var li = this.createActionListItem();
         li.innerHTML = '<a id="followDisplayActionsBtn" href="javascript:void(0);" role="button" onclick="lconn.communities.bizCard.core.unFollow()" title="' + messages['label.top.buttons.unfollow.title'] + '">' + messages['label.top.buttons.unfollow'] + '</a>';
         dojo.place(li, actions);
         dojo.publish("FollowActionBar", [{
            type: "CreatedunFollow",
            community: community,
            node: li
         }]);
      }

      //other app
      else if (followMenu != null) {
         if (this.isNotEmpty(community.followUrl)) {
            var menuItem = lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.follow'], "FOLLOW");
            menuItem.onClick = function() {
               lconn.communities.bizCard.core.follow();
            };
            dojo.attr(menuItem, "title", messages['label.top.buttons.follow.title']);
            followMenu.addChild(menuItem);
         } else if (this.isNotEmpty(community.unfollowUrl)) {
            var menuItem = lconn.communities.bizCard.core.buildActionsMenuItem(messages['label.top.buttons.unfollow'], "UNFOLLOW");
            menuItem.onClick = function() {
               lconn.communities.bizCard.core.unFollow();
            };
            dojo.attr(menuItem, "title", messages['label.top.buttons.unfollow.title']);
            followMenu.addChild(menuItem);
         }
      }
   },

   /**
    * Subcribe to Community Email
    *
    */
   mailSubscribe: function() {
      var messages = this.messages;
      var subscribeCallback = function(response, ioArgs) {

         // Display confirmation message
         lconn.communities.bizCard.core.showFollowConfirmation(messages['label.action.confirm.community.after.subscribe']);

         // Toggle menu
         lconn.communities.bizCard.core.community.mailSubscribeEnabled = false;
         lconn.communities.bizCard.core.community.mailUnsubscribeEnabled = true;
      }

      // Get subcribe url and run it through the proxy
      var url = lconn.communities.bizCard.core.community.mailSubscribeUrl;
      if (window.SemTagSvcConfig != null && SemTagSvcConfig.proxyURL != null) {
         var ph = new lconn.core.url.ProxyUrlHelper(SemTagSvcConfig.proxyURL);
         url = ph.getProxifiedURL(url);
      }

      // Subscribe in the member table
      dojo.xhrGet({
         url: url,
         headers: {
            'X-Update-Nonce': 'true'
         },
         load: subscribeCallback,
         error: this.xhrErrorCallback
      });
      return false;
   },

   /**
    * Unsubcribe from Community Email
    *
    */
   mailUnsubscribe: function() {
      var messages = this.messages;
      var unsubscribeCallback = function(response, ioArgs) {

         // Display confirmation message
         lconn.communities.bizCard.core.showFollowConfirmation(messages['label.action.confirm.community.after.unsubscribe']);

         // Toggle menu
         lconn.communities.bizCard.core.community.mailSubscribeEnabled = true;
         lconn.communities.bizCard.core.community.mailUnsubscribeEnabled = false;
      }

      // Get unsubcribe url and run it through the proxy
      var url = lconn.communities.bizCard.core.community.mailUnsubscribeUrl;
      if (window.SemTagSvcConfig != null && SemTagSvcConfig.proxyURL != null) {
         var ph = new lconn.core.url.ProxyUrlHelper(SemTagSvcConfig.proxyURL);
         url = ph.getProxifiedURL(url);
      }

      // Unsubscribe in the member table
      dojo.xhrGet({
         url: url,
         headers: {
            'X-Update-Nonce': 'true'
         },
         load: unsubscribeCallback,
         error: this.xhrErrorCallback
      });
      return false;
   },

   /**
    * Join Community
    *
    * @param msg: The confirmation message to display
    */
   joinCommunity: function(msg) {

      // Successful callback
      var joinCommunityCallback = function(response, ioArgs) {

         // Rebuild the action menu now that we're a member
         lconn.communities.bizCard.core.updateActionMenu(lconn.communities.bizCard.core.community);

         // Display confirmation message
         lconn.communities.bizCard.core.showFollowConfirmation(msg);
      }

      // Get the Join url and run it through the proxy
      var url = lconn.communities.bizCard.core.community.memberJoinURL;
      if (window.SemTagSvcConfig != null && SemTagSvcConfig.proxyURL != null) {
         var ph = new lconn.core.url.ProxyUrlHelper(SemTagSvcConfig.proxyURL);
         url = ph.getProxifiedURL(url);
      }

      // Join the Community.
      dojo.xhrGet({
         url: url,
         headers: {
            'X-Update-Nonce': 'true'
         },
         load: joinCommunityCallback,
         error: this.xhrErrorCallback
      });
      return false;
   },

   /**
    * Rebuild the action menu for new member
    *
    * @param community: a Community object with uuid set
    */
   updateActionMenu: function(community) {

      var updateMenuCallback = function(response, ioArgs) {

         // Remove Join button
         var joinBtn = dojo.byId('joinDisplayActionsBtnLi');
         if (joinBtn) {
            joinBtn.parentNode.removeChild(joinBtn);
         }

         // Retrieve new Community settings
         var newCommunity = dojo.fromJson( response.replace(/^\s*while\(1\);/,'') );

         // Rebuild action menu
         lconn.communities.bizCard.core.addCommunityActionsMenuUI(newCommunity);
      }

      // Fetch updated privileges and build menu
      try {
         lconn.communities.bizCard.core.getCommunityJSON(community, updateMenuCallback);
      }
      catch (e) {
         console.log(e);
      }
   },

   /**
    * Return Community JSON which contains Community menu options.
    *
    * @param community: a Community object with uuid set
    * @param callback: an optional callback method on success
    */
   getCommunityJSON: function(community, callback) {
      var messages = this.messages;
      var loadCallback;

      // Check input parameter
      if (community!=null && community.uuid.length > 0) {

        // Successful callback
        var defaultCallback = function(response, ioArgs) {
            community.json = dojo.fromJson( response.replace(/^\s*while\(1\);/,'') );
        }

        // Get json url and run it through the proxy
        var url = lconn.core.bizCard.bizCardUtils.getBaseURL("hgroup") + "/service/json/communityview?communityUuid="+community.uuid;
        if (window.SemTagSvcConfig != null && SemTagSvcConfig.proxyURL != null) {
            var ph = new lconn.core.url.ProxyUrlHelper(SemTagSvcConfig.proxyURL);
            url = ph.getProxifiedURL(url);
        }

        // Override default callback if desired
        if (typeof(callback) != "undefined" && callback != null) {
            loadCallback = callback;
        }
        else {
            loadCallback = defaultCallback;
        }

        // Fetch Community Json
        dojo.xhrGet({
           contentType:"application/json",
           url: url,
           load: loadCallback,
           error: this.xhrErrorCallback
        });
      }
      return (community);
   },

   startUp: function(community, SubCommData) {
      community.isCommunityOverview = true;

      this.addFollowActionsMenuUI(community);
      this.addCommunityActionsMenuUI(community);
      community.subcommunities = SubCommData.subcommunities;
      var subcommNav = dojo.byId("subcommArea");
      if (subcommNav) {
         subcommNav.innerHTML = this.addSubCommunities(community);
      }
      lconn.communities.bizCard.core.community = community;
      dojo.publish("lconn/communities/bizcard/community/set", [community]);

      var lotusTitleBar = dojo.byId('lotusTitleBar');
      var tabNavigation = dojo.byId('tabNavigation');

      if (lotusTitleBar != undefined && lotusTitleBar != null) {
         if (tabNavigation == undefined || tabNavigation != null) {
            tabNavigation = document.createElement("a");
            tabNavigation.setAttribute('id', 'tabNavigation');
            tabNavigation.setAttribute('name', 'tabNavigation');

            if (lotusTitleBar.firstChild) {
               lotusTitleBar.insertBefore(tabNavigation, lotusTitleBar.firstChild);
            } else {
               lotusTitleBar.appendChild(tabNavigation);
            }
         }
      }
     
      var avtLotusMenuLeftHelper;
     var leftNavRoot = dojo.byId("lotusNavBar");
      if (leftNavRoot) {
        // Make left nav aria compliant using helper class
         //
         try {
            avtLotusMenuLeftHelper = new lconn.core.WidgetPlacement.aria.Toolbar("lotusNavBar");
         } catch (ee) {
            avtLotusMenuLeftHelper = new lconn.core.aria.Toolbar("lotusNavBar");
         }
       
       // If new relic tracking is enabled - trigger actions for left nav clicks
       if (communityActionData.enableNewRelicTracking == true) {
          dojo.query("li", leftNavRoot).forEach(function(node) {
             dojo.connect(node, "onclick", null, function(){
               lconn.communities.bizCard.newRelicTracker.navAction(communityActionData.uuid,communityActionData.userUuid, dojo.attr(this, "widgetdefid"),this.id);
               return false;
             });
          });
        } 
     }        
   },

   createActionListItem: function() {
      var result = dojo.create("li");
      //#66563 - force no wrapping on action menu's
      dojo.addClass(result, "lotusNowrap");
      if (this._firstActionShown == false) {
         dojo.addClass(result, "lotusFirst");
         this._firstActionShown = true;
      }
      return (result);
   },

   /**
    * Returns <ul> node for adding actions.  Creates it if it doesn't exist
    * We add the <ul> because we can't expect it to be there when we insert into other components mark-up
    */
   _getCommunityActionsNode: function() {
      var ulNode = null;
      if (this._communityActionsNode == null) {
         // find CommunityActionBar node and add <ul id="communityActions" class="lotusInlinelist lotusActions lotusRight" > as first node
         var actionbarNode = dojo.byId("communityActionBar");
         if (actionbarNode != null) {
            // See if actionbarNode parent is a "ul", 
            var ulNode = this._getParentNode(actionbarNode);
            if (ulNode != null) {
               // parent is a "ul", we assume we just need to add <li> items to it AND we are not the first <li> item
               // Becuase parent is "ul" already - we are inserting into another component's action bar - remember that so we don't show login for this case.
               this._firstActionShown = dojo.query(".lotusFirst", ulNode).length != 0;
               this._nonCommunityActionBar = true;
               // replace the placehoder span with a hidden list item so that the strucher is correct, can not remove it because it use by the following menu too
               if (actionbarNode.tagName.toLowerCase() == "span") {
                  var newActionBar = dojo.create("li", {
                     id: "communityActionBar",
                     style: {
                        display: "none"
                     }
                  });
                  dojo.place(newActionBar, actionbarNode, "replace");
               }
            }
            if (ulNode == null) {
               ulNode = dojo.create("ul", {
                  "id": "communityActions",
                  "class": "lotusInlinelist lotusActions lotusRight"
               });
               dojo.place(ulNode, actionbarNode, "first");
            }
            this._communityActionsNode = ulNode;
         }
      }
      return (this._communityActionsNode);
   },

   /**
    * Returns parent node if it's a <ul> node, null o.w.
    */
   _getParentNode: function(node) {
      var result = null;
      var parent = node.parentNode;
      if (parent != null) {
         if (parent.nodeName.toLowerCase() == "li") {
            // IE finds li sibling as parent node if communityActionBar node is mixed in with <li> items.  Go up one more level and see if <ul> is the container
            parent = parent.parentNode;
         }
         if (parent.nodeName.toLowerCase() == "ul") {
            result = parent;
         }
      }
      return (result);
   },

   /**
     * Tabbed Navigation Methods 
     *
     */   

   /**
    * Write the tabbed navigation banner from the
    * business card.
    *
    * @param community: a Community object
    */    
   writeTabbedNavigation: function(community) {
      // console.log("***** Entered writeTabbedNavigation");
      
      // Setup Styling
      this.setupTabbedStyles();
   
      // Setup structure
      this.setupTabbedContainers(community);
   
      // Update the logo
      this.updateTabbedCommunityLogo("tabbedImage", community);
      
      // Update the Parent Community Name
      this.updateTabbedParentCommunityName("tabNavParentName", community);
      
      // Update the Community Name
      this.updateTabbedCommunityName("tabNavCommunityName", community);
      
      // Update Subcommunities Menu
      this.updateTabbedSubcommunitiesMenu();
      
      // Update Applications Menu
      this.updateTabbedApplicationsMenu("bizCardNavMenu", "tabNavContainer");
      
      // Fix Navigation to the Top of the Screen
      this.fixNavOnScroll();
   },

   /**
    * Set up the styles for the tabbed navigation
    *
    */
    setupTabbedStyles: function() {
      // console.log("***** Entered setupTabbedStyles");
      
      var htmlContent = "";
      var isLTR = dojo._isBodyLtr();
      if (isLTR) {
	      htmlContent += '<style>';
	
	      // General Styles
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavItemInline {display:inline;}';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavItemInBlk {display:inline-block;}';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavFullWidth {width:100%;}';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavOverflowHidden {overflow:hidden !important;}';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavTextEllipsis {overflow:hidden; white-space:nowrap; text-overflow:ellipsis}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavClearNone {clear:none;}';
	      htmlContent += '#moreButtonArrow { margin-left:4px; padding-bottom:2px; }';
	
	      // Title Bar
	      htmlContent += '.lotusui30 .tabNavBar    {height:110px; padding:15px 20px 15px 20px; background-color:white; background-image:none; z-index:850; box-shadow:0 1px 4px 0 rgba(40,40,40,0.2);}';
	      htmlContent += '.lotusui30 .tabNavBar    div#lotusTitleBar{padding-right:20px; background-color:white; background-image:none; height:80px; border-bottom-width:0px}';
	      htmlContent += '.lotusui30 .tabNavBar    div.lotusTitleBar2 .tabNavTitleBarWrapper {padding-left:0px; padding-right:0px}';
	      htmlContent += '.lotusui30 .tabNavBar    div.lotusTitleBar2 .lotusWrapper .tabNavInner {padding:0px 10px; overflow:visible}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavImage {background-color:white; background-image:none; float:left; display:inline;padding-left:1px;padding-right:1px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavImageSize {width:110px;height:110px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavCommunityName {background-color:white; background-image:none; padding: 25px 20px 0px 20px; display:inline-block; font-size:22px; color:black; font-weight:bold; vertical-align:top}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavCommunityName div {padding-top: 0px; max-width:600px}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubNames {display:inline-block;padding-top:15px}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavParentName {background-color:white; background-image:none; padding-left:20px; padding-right:20px; display:inline; font-size:14px; color:#5A5A5A; font-weight:bold; vertical-align:top}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavParentName a {text-decoration: none; max-width:700px; color:#5A5A5A;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavParentName .comNavIcon {margin: 1px 4px 5px 0px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubcommunityName {padding-left:20px; padding-right:20px; display:block; font-size:22px; color:black; font-weight:bold; vertical-align:top}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubcommunityName div {padding-top: 0px; max-width:700px}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubcommunityName .comNavIcon {margin: 1px 4px 5px 0px;}';
	      htmlContent += '.lotusui30 .tabNavBar    div#tabNavSearch {padding-left:20px; padding-right:20px; display:inline; top:0;}';
	      htmlContent += '.lotusui30 .tabNavBar    div.lotusTitleBar2 .lotusSearch {top:0;}';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusTitleBar2 .lotusSearch .lotusLayout {background-color:white; background-image:none; font-size:10px; padding:2px;}';
	      htmlContent += 'div#tabNavSubMenuContainer {margin-top:32px; }';
	
	      // Place Bar
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavPlaceBar {border-width:0px; background-color:transparent; height:30px; background:none}';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusPlaceBar .tabNavPlaceBarRightCorner {border-width:0px; background-color:transparent; clear:none; padding-right:0px;}';
		  htmlContent += '.lotusui30 .tabNavBar    div.lotusPlaceBar .tabNavPlaceBarInner {right:0px; background-color:transparent;}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusPlaceBar .tabNavMenu {padding-left:20px; background-color:white; height:30px;}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusPlaceBar .tabNavTabBar {position:relative;left:0px; margin:1px 1px 0;}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li {margin-top:1px; margin-left:1px; margin-right:25px}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li.lotusSelected {color:black; padding-bottom:17px; border-bottom:4px solid #4178be;}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li.lotusSelected a {color:black; }';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li a {font-size:13px; color:#5A5A5A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width:170px}';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li:focus {outline: 1px black dotted; }';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavMenu  #communityActionBar.tabNavActionsMenu,';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavMenu  .tabNavActionsMenu {display:inline-block;top:0px;font-size:14px;margin-top:3px;height:26px;visible;white-space:nowrap;position:absolute;right:0px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavMenu .tabNavActionsMenu #communityActions, ';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavMenu .tabNavActionsMenu ul { width: auto; }';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusPlaceBar .lotusInlinelist.lotusRight {top:0px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubSel {font-size:16px; font-weight:normal; color:#5a5a5a;}';
		  htmlContent += '.lotusui30 .tabNavBar    a#tabNavSubMenuTitleLinkAnc:focus, ';
		  htmlContent += '.lotusui30 .tabNavBar    a#tabNavSubMenuTitleLinkAnc:hover {text-decoration: none;}';
	
	      // Fixed Top Bar
	      htmlContent += '.lotusui30 .tabNavFixed  {height:68px; padding:11px 20px 11px 20px; position: fixed; left: 0; top: 0; width: 100%; background-color:white; background-image:none; z-index:850; box-shadow:2px 2px #e8e8e8;}';
	      htmlContent += '.lotusui30 .tabNavFixed  div#lotusTitleBar{height:34px; border-bottom-width:0px}';
	      htmlContent += '.lotusui30 .tabNavFixed  div.lotusPlaceBar .tabNavPlaceBarInner {right:0px; background-color:transparent; padding-top:6px}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavSubNames {display:inline-block;}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavCommunityName {background-color:white; background-image:none; padding: 6px 20px 0 20px; display:inline-block; font-size:22px; color:#292929; font-weight:bold; vertical-align:top}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavSubNames {display:inline-block; padding-top:6px;}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavParentName {display:none}';
		  htmlContent += '.lotusui30 .tabNavFixed .tabNavImage {background-color:white; background-image:none; float:left; display:inline;}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavImageSize {width:68px;height:68px;}';
	      htmlContent += '.lotusui30 .tabNavFixed  div#tabNavSubMenuContainer {display:none}';
	      // PMR 94856,122,000: We now show the Search button on scroll down per client request.
	      // htmlContent += '.lotusui30 .tabNavFixed  div#tabNavSearch {display:none}';
	      // htmlContent += '.lotusui30 .tabNavFixed  div.icSearchPaneButton {display:none}';
	      htmlContent += '.lotusui30 .tabNavFixed  div.lotusTitleBar2 .lotusSearch {display:none}';
	      htmlContent += '.lotusui30 .tabNavFixed  div.lotusTitleBar .lotusSearch {display:none}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavPlaceBar {border-width:0px; height:36px}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavPlaceBar .tabNavPlaceBarInner {right:0px; background-color:transparent; padding-top:6px}';
	      htmlContent += '.lotusui30 .tabNavFixed .lotusTabs li.lotusSelected {color:black; padding-bottom:12px; border-bottom:4px solid #4178be;}';
	      htmlContent += '.lotusui30 .tabNavFixed  div.lotusPlaceBar .tabNavActionsMenu .lotusActions {display:none}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavPlaceBar #communityActionBar.tabNavActionsMenu,';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavPlaceBar .tabNavActionsMenu {display:none}';

	      // Dropdown Menu styling
	      htmlContent += '.lotusui30 .dijitMenuPopup table.dijitMenuTable {padding: 15px 0px 15px 0px !important; }';
	      htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable td.dijitMenuItemLabel {padding-left: 20px !important; padding-right:20px !important; }';
		  htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable td.dijitMenuItemLabel:active, ';
		  htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable td.dijitMenuItemLabel:focus, ';
		  htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable td.dijitMenuItemLabel:hover {padding-left: 20px !important; padding-right:20px !important; border-top: 1px solid transparent !important; border-bottom: 1px solid transparent !important;}';
		  htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable .dijitMenuItemFocused td.dijitMenuItemLabel {padding-left: 20px !important; padding-right:20px !important; border-top: 1px solid transparent !important; border-bottom: 1px solid transparent !important;}';
	      htmlContent += 'table#SubcommunityMenu    td.dijitMenuItemLabel {white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width:350px}';
	      htmlContent += 'table#CommunitiesMoreMenu td.dijitMenuItemLabel {white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width:170px}';
	      htmlContent += '.lotusui30dojo .lconnContentTitleDropdownBody .dijitMenuItem.dijitMenuItemFocused .dijitReset, .lotusui30dojo .lotusGlobalActionBarMenu .dijitMenuItem.dijitMenuItemFocused .dijitReset{border-top:1px solid transparent!important; border-bottom:1px solid transparent!important;}';
        
	      // Tabbed nav subcommunity alignment
        htmlContent += '.tabNavParentName .tabNavTextEllipsis { vertical-align: bottom; margin: 0 5px; }';
        htmlContent += '#tabNavCommunityName .tabNavTextEllipsis .comNavIcon { float: none; display: inline-block; vertical-align: baseline; }';
	      htmlContent += '</style>';
      } else {
	      htmlContent += '<style>';
	  	
	      // General Styles
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavItemInline {display:inline;}';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavItemInBlk {display:inline-block;}';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavFullWidth {width:100%;}';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavOverflowHidden {overflow:hidden !important;}';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavTextEllipsis {overflow:hidden; white-space:nowrap; text-overflow:ellipsis}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavClearNone {clear:none;}';
		  htmlContent += '#moreButtonArrow { margin-right:4px; padding-bottom:2px; }';
	
	      // Title Bar
	      htmlContent += '.lotusui30 .tabNavBar    {height:110px; padding:15px 20px 15px 20px; background-color:white; background-image:none; z-index:850; box-shadow:0 1px 4px 0 rgba(40,40,40,0.2);}';
	      htmlContent += '.lotusui30 .tabNavBar    div#lotusTitleBar{padding-right:20px; background-color:white; background-image:none; height:80px; border-bottom-width:0px}';
	      htmlContent += '.lotusui30 .tabNavBar    div.lotusTitleBar2 .tabNavTitleBarWrapper {padding-left:0px; padding-right:0px}';
	      htmlContent += '.lotusui30 .tabNavBar    div.lotusTitleBar2 .lotusWrapper .tabNavInner {padding:0px 10px; overflow:visible}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavImage {background-color:white; background-image:none; float:right; display:inline;padding-left:1px;padding-right:1px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavImageSize {width:110px;height:110px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavCommunityName {background-color:white; background-image:none; padding: 25px 20px 0px 20px; display:inline-block; font-size:22px; color:black; font-weight:bold; vertical-align:top}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavCommunityName div {padding-top: 0px; max-width:600px}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubNames {display:inline-block;padding-top:15px}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavParentName {background-color:white; background-image:none; padding-left:20px; padding-right:20px; display:inline; font-size:14px; color:#5A5A5A; font-weight:bold; vertical-align:top}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavParentName a {text-decoration: none; max-width:700px; color:#5A5A5A;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavParentName .comNavIcon {margin: 1px 4px 5px 0px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubcommunityName {padding-left:20px; padding-right:20px; display:block; font-size:22px; color:black; font-weight:bold; vertical-align:top}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubcommunityName div {padding-top: 0px; max-width:700px}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubcommunityName .comNavIcon {margin: 1px 4px 5px 0px;}';
	      htmlContent += '.lotusui30 .tabNavBar    div#tabNavSearch {padding-left:20px; padding-right:20px; display:inline; top:0;}';
	      htmlContent += '.lotusui30 .tabNavBar    div.lotusTitleBar2 .lotusSearch {top:0;}';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusTitleBar2 .lotusSearch .lotusLayout {background-color:white; background-image:none; font-size:10px; padding:2px;}';
	      htmlContent += 'div#tabNavSubMenuContainer {margin-top:32px; }';
	
	      // Place Bar
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavPlaceBar {border-width:0px; background-color:transparent; height:30px; background:none}';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusPlaceBar .tabNavPlaceBarRightCorner {border-width:0px; background-color:transparent; clear:none; padding-left:0px;}';
		  htmlContent += '.lotusui30 .tabNavBar    div.lotusPlaceBar .tabNavPlaceBarInner {right:0px; background-color:transparent;}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusPlaceBar .tabNavMenu {padding-left:20px; background-color:white; height:30px;}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusPlaceBar .tabNavTabBar {position:relative;left:0px; margin:1px 1px 0;}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li {margin-top:1px;margin-left:1px;margin-right:25px}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li.lotusSelected {color:black; padding-bottom:17px; border-bottom:4px solid #4178be;}';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li.lotusSelected a {color:black; }';
		  htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li a {font-size:13px; color:#5A5A5A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width:170px}';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusTabs li:focus {outline: 1px black dotted; }';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavMenu  #communityActionBar.tabNavActionsMenu,';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavMenu  .tabNavActionsMenu {display:inline-block;top:0px;font-size:14px;margin-top:3px;height:26px;white-space:nowrap;position:absolute;left:0px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavMenu .tabNavActionsMenu #communityActions, ';
		  htmlContent += '.lotusui30 .tabNavBar   .tabNavMenu .tabNavActionsMenu ul { width: auto; }';
	      htmlContent += '.lotusui30 .tabNavBar   .lotusPlaceBar .lotusInlinelist.lotusRight {top:0px;}';
	      htmlContent += '.lotusui30 .tabNavBar   .tabNavSubSel {font-size:16px; font-weight:normal; color:#5a5a5a;}';
		  htmlContent += '.lotusui30 .tabNavBar    a#tabNavSubMenuTitleLinkAnc:focus, ';
		  htmlContent += '.lotusui30 .tabNavBar    a#tabNavSubMenuTitleLinkAnc:hover {text-decoration: none;}';
	
	      // Fixed Top Bar
	      htmlContent += '.lotusui30 .tabNavFixed  {height:68px; padding:11px 20px 11px 20px; position: fixed; left: 0; top: 0; width: 100%; background-color:white; background-image:none; z-index:850; box-shadow:2px 2px #e8e8e8;}';
	      htmlContent += '.lotusui30 .tabNavFixed  div#lotusTitleBar{height:34px; border-bottom-width:0px}';
	      htmlContent += '.lotusui30 .tabNavFixed  div.lotusPlaceBar .tabNavPlaceBarInner {right:0px; background-color:transparent; padding-top:6px}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavSubNames {display:inline-block;}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavCommunityName {background-color:white; background-image:none; padding: 6px 20px 0 20px; display:inline-block; font-size:22px; color:#292929; font-weight:bold; vertical-align:top}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavSubNames {display:inline-block; padding-top:6px;}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavParentName {display:none}';
		  htmlContent += '.lotusui30 .tabNavFixed .tabNavImage {background-color:white; background-image:none; float:right; display:inline;}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavImageSize {width:68px;height:68px;}';
	      htmlContent += '.lotusui30 .tabNavFixed  div#tabNavSubMenuContainer {display:none}';
	      // PMR 94856,122,000: We now show the Search button on scroll down per client request.
	      // htmlContent += '.lotusui30 .tabNavFixed  div#tabNavSearch {display:none}';
	      // htmlContent += '.lotusui30 .tabNavFixed  div.icSearchPaneButton {display:none}';
	      htmlContent += '.lotusui30 .tabNavFixed  div.lotusTitleBar2 .lotusSearch {display:none}';
	      htmlContent += '.lotusui30 .tabNavFixed  div.lotusTitleBar .lotusSearch {display:none}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavPlaceBar {border-width:0px; height:36px}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavPlaceBar .tabNavPlaceBarInner {right:0px; background-color:transparent; padding-top:6px}';
	      htmlContent += '.lotusui30 .tabNavFixed .lotusTabs li.lotusSelected {color:black; padding-bottom:12px; border-bottom:4px solid #4178be;}';
	      htmlContent += '.lotusui30 .tabNavFixed  div.lotusPlaceBar .tabNavActionsMenu .lotusActions {display:none}';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavPlaceBar #communityActionBar.tabNavActionsMenu,';
	      htmlContent += '.lotusui30 .tabNavFixed .tabNavPlaceBar .tabNavActionsMenu {display:none}';

	      // Dropdown Menu styling
	      htmlContent += '.lotusui30 .dijitMenuPopup table.dijitMenuTable {padding: 15px 0px 15px 0px !important; }';
	      htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable td.dijitMenuItemLabel {padding-left: 20px !important; padding-right:20px !important; }';
		  htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable td.dijitMenuItemLabel:active, ';
		  htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable td.dijitMenuItemLabel:focus, ';
		  htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable td.dijitMenuItemLabel:hover {padding-left: 20px !important; padding-right:20px !important; border-top: 1px solid transparent !important; border-bottom: 1px solid transparent !important;}';
		  htmlContent += '.lotusui30 .dijitMenuPopup .dijitMenuTable .dijitMenuItemFocused td.dijitMenuItemLabel {padding-left: 20px !important; padding-right:20px !important; border-top: 1px solid transparent !important; border-bottom: 1px solid transparent !important;}';
	      htmlContent += 'table#SubcommunityMenu    td.dijitMenuItemLabel {white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width:350px}';
	      htmlContent += 'table#CommunitiesMoreMenu td.dijitMenuItemLabel {white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width:170px}';
	      htmlContent += '.lotusui30dojo .lconnContentTitleDropdownBody .dijitMenuItem.dijitMenuItemFocused .dijitReset, .lotusui30dojo .lotusGlobalActionBarMenu .dijitMenuItem.dijitMenuItemFocused .dijitReset{border-top:1px solid transparent!important; border-bottom:1px solid transparent!important;}';
	      
        // Tabbed nav subcommunity alignment
        htmlContent += '.tabNavParentName .tabNavTextEllipsis { vertical-align: bottom; margin: 0 5px; }';
        htmlContent += '#tabNavCommunityName .tabNavTextEllipsis .comNavIcon { float: none; display: inline-block; vertical-align: baseline; }';
	      htmlContent += '</style>';
       }
      var bodyTag = dojo.query("body")[0];
      dojo.place(htmlContent, bodyTag, "first");
    },
   
   /**
    * Set up the containers and styling for top level 
    * tabbed navigation.
    *
    * @param community: a Community object    
    */
   setupTabbedContainers: function(community) {
      // console.log("***** Entered setupTabbedContainers");

      var htmlContent = "";
      var htmlEndContent = "";
      var header;
      var wrapper, rightCorner, inner;

      // Find landmarks by id or class
      var titleBar = dojo.byId("lotusTitleBar");
      if (!titleBar) {
         titleBar = dojo.query(".lotusTitleBar")[0];
      }
      var placeBar = dojo.byId("lotusPlaceBar");
      if (!placeBar) {
         placeBar = dojo.query(".lotusPlaceBar")[0];
      }
      if (titleBar && placeBar) {

         // Create a tab bar container and place title and place bars in it
         htmlContent = '<div id="tabNavBar" class="tabNavBar"></div>';
         if (typeof(tabNavBar) == "undefined")
            dojo.place(htmlContent, titleBar, "before");
         titleBar.parentNode.removeChild(titleBar);
         placeBar.parentNode.removeChild(placeBar);
         dojo.place(titleBar, tabNavBar, "last");
         dojo.place(placeBar, tabNavBar, "last");

		 // Set up Title Bar
		 dojo.attr(titleBar, "id", "lotusTitleBar");
		 dojo.removeClass(titleBar);
		 dojo.addClass(titleBar,"lotusTitleBar2");

		 // Set up inner containers
		 wrapper = dojo.query(".lotusWrapper", titleBar)[0];
		 htmlContent = "";
		 if (wrapper) {
			dojo.removeClass(wrapper);
			dojo.addClass(wrapper, "lotusWrapper tabNavTitleBarWrapper");
			rightCorner = dojo.query(".lotusRightCorner", wrapper)[0];
			if (rightCorner) {
				dojo.removeClass(rightCorner);
			}
         }
		 else {
			wrapper = dojo.query(".lotusRightCorner", titleBar)[0];
			if (wrapper) {
				dojo.removeClass(wrapper);
				dojo.addClass(wrapper, "lotusWrapper tabNavTitleBarWrapper");
			 }
			 else {
				htmlContent = '<div class="lotusWrapper tabNavTitleBarWrapper"></div>';
				htmlEndContent = '<div>';
	 	 	}
	 	 }
	 	 inner = dojo.query(".lotusInner", titleBar)[0];
		 if (!inner) {
			htmlContent += '<div class="lotusInner"></div>';
			htmlEndContent += '<div>';
		  }
		 else {
			 dojo.removeClass(inner);
			 dojo.addClass(inner, "lotusInner tabNavInner");
	 	 }
	 	 if (htmlContent.length > 0) {
			 dojo.place(htmlContent, titleBar, "first");
			 dojo.place(htmlEndContent, titleBar, "last");
	 	 }

         // Container for Logo
         if (!inner) {
         	inner = dojo.query(".lotusInner", titleBar)[0];
	     }
         htmlContent =  '<div id="tabbedImage" class="tabNavImage"></div>';

         // Containers for Community Names

         // Subcommunity Case
         if (community.parentName != null && community.parentName.length > 0) {
			htmlContent += '<div class="tabNavSubNames">';
            htmlContent += '<div id="tabNavParentName" class="tabNavParentName tabNavTextEllipsis"></div>';
            htmlContent += '<div id="tabNavCommunityName" class="tabNavSubcommunityName tabNavTextEllipsis"></div>';
         }
         // Parent Community case
         else {
			htmlContent += '<div class="tabNavItemInBlk">';
            htmlContent += '<div id="tabNavParentName" class="lotusHidden"></div>';
            htmlContent += '<div id="tabNavCommunityName" class="tabNavCommunityName"></div>';
         }

         // Container for Subcommunities Button and Menu
         htmlContent += '<div class="lotusHidden " id="tabNavSubMenuContainer">';
         htmlContent += '<div id="tabNavSubMenuTitle">';
         htmlContent += '<a id="tabNavSubMenuTitleLinkAnc" class="tabNavItemInline" href="javascript:void(0)" role="button" aria-haspopup="true">';
         htmlContent += '<div id="tabNavSubMenuSelection" class="tabNavSubSel tabNavItemInline"> </div>';
         htmlContent += '<div class="tabNavItemInline"><img class="lotusArrow lotusDropDownSprite" src="' + dojo.config.blankGif + '" alt="" title="" role="presentation"></img><span class="lotusAltText">&#9660;</span></span></div>';
         htmlContent += '</a>';
         htmlContent += '</div>';
         htmlContent += '<div id="tabNavSubMenu" class="lotusHidden"></div>';
         htmlContent += '</div>';

         if (inner && !(dojo.query("#tabbedImage",inner).length > 0)) {
            dojo.place(htmlContent, inner, "first");
         }

         // Data for Subcommunities Menu
         var subcommunityMenuData= dojo.byId("subcommArea");
         if (subcommunityMenuData) {
            subcommunityMenuData.parentNode.removeChild(subcommunityMenuData);
            var tabNavSubMenu = dojo.byId("tabNavSubMenu");
            if (tabNavSubMenu) {
               dojo.place(subcommunityMenuData, tabNavSubMenu, "first");
            }
         }

         // Style Place Bar
         dojo.addClass(placeBar, "tabNavPlaceBar");
         var placeBarCorner = dojo.query(".lotusRightCorner", placeBar)[0];
         if (placeBarCorner) {
			dojo.addClass(placeBarCorner, "tabNavPlaceBarRightCorner");
	 	 }
         var placeBarContents = dojo.query(".lotusInner", placeBarCorner)[0];

         // Create Tabbed Appplications Menu container
         if (placeBarContents) {
			dojo.addClass(placeBarContents, "tabNavPlaceBarInner");
            header= placeBarContents.getElementsByTagName("h2")[0];
            if (header) {
               header.parentNode.removeChild(header);
            }
            htmlContent =  '<div id="tabNavMenu" class="tabNavItemInBlk tabNavMenu">';
            htmlContent += '<div class="tabNavItemInBlk tabNavOverflowHidden">';
            htmlContent += '<div id="tabNavContainer" class="lotusTabs tabNavItemInBlk tabNavTabBar"></div>';
            htmlContent += '</div>';
            htmlContent += '</div>';
            dojo.place(htmlContent, placeBarContents, "first");
         }

         // Style Actions Bar
         var menuBar = dojo.byId("tabNavMenu");
         var actionsBar = dojo.query(".lotusTitleBarExt",placeBar)[0];
         if (actionsBar) {
            dojo.addClass(actionsBar, "tabNavActionsMenu");
        	if (menuBar) {
				actionsBar.parentNode.removeChild(actionsBar);
         		dojo.place(actionsBar, menuBar, "last");
	 		}
		 }
		 else {
			 try {
				 dojo.query(".lotusActions", placeBar).forEach(function(node, ii) {
					if (ii == 0) {
						htmlContent =  '<div id="communityActionBar" class="lotusTitleBarExt tabNavActionsMenu"></div>';
						dojo.place(htmlContent, menuBar, "last");
						actionsBar = dojo.byId("communityActionBar");;
					}
					if (actionsBar) {
						node.parentNode.removeChild(node);
						dojo.place(node, actionsBar, "last");
					}
				 });
			 }
			 catch (e) {
			 	console.log(e);
         	 }
	 	 }
      }
   },

   /**
    * Clear / hide elements that aren't part of the tabbed navigation.
    *
    */
   clearTopBanner: function() {
      // console.log("***** Entered clearTopBanner");
      var header;
      
      // Hide old structures
      var navMenu = dojo.query(".lotusColLeft .vcomm")[0];
      if (navMenu) {
         dojo.addClass(navMenu, "lotusHidden"); 
      }
      
      // Clear titlebar
      var titleBar = dojo.byId("lotusTitleBar");
      if (!titleBar) {
         titleBar = dojo.query(".lotusTitleBar")[0];
      }
      if (titleBar) {
         var titleBarContents = dojo.query(".lotusInner", titleBar)[0];
         if (titleBarContents) {
            header= titleBarContents.getElementsByTagName("h2")[0];
            if (header) {
               header.parentNode.removeChild(header);
            }  
         }  
      }
      
      // Clear placebar
      var placeBar = dojo.query(".lotusPlaceBar .lotusRightCorner .lotusInner")[0];
      if (placeBar) {
         header= placeBar.getElementsByTagName("h2")[0];
         if (header) {
            header.parentNode.removeChild(header);
         }     
      }
   }, 
   
   /**
    * Write Community Logo to banner
    *
    * @param container: the container for the result
    * @param community: a Community object
    */
   updateTabbedCommunityLogo: function(container, community) {

      var messages = this.messages;
      var htmlContent = new lconn.core.bizCard.bizCardUtils.out();
      var escapedCommunityName = lconn.core.HTMLUtil.escapeInlineText(community.name);
      htmlContent.write('<a title="'+messages['tooltip.startpage']+'" href="'+community.homeUrl+'" tabindex="-1"><img src="'+ community.imageUrl + '" alt="" class="discussCommunityLogo lotusForceLineHeight usersRadius tabNavImageSize" /><span class="lotusAltText">'+messages['tooltip.startpage']+'</span></a>');
      var container = dojo.byId(container);
      if (container) {
         dojo.empty(container);
         dojo.place(htmlContent.buffer, container, "first");
      }
   },

   /**
    * Write Community Name to banner
    *
    * @param container: the container for the result
    * @param community: a Community object
    */
   updateTabbedParentCommunityName: function(container, community) {
      if (community.parentName != null && community.parentName.length > 0) {
         var htmlContent = "";
         var type =  community.externalAllowed ? "external" : community.parentType;
         htmlContent += "<"
         htmlContent += this.formatTabCommunity(community.parentName, community.parentUrl, type);
         var container = dojo.byId(container);
         if (container) {
            dojo.empty(container);
            dojo.place(htmlContent, container, "first");
         }
      }
   },
   
   /**
    * Write Community Name to banner
    *
    * @param container: the container for the result
    * @param community: a Community object
    */
   updateTabbedCommunityName: function(container, community) {
      var htmlContent = "";
      var type =  community.externalAllowed ? "external" : community.communityType;
      htmlContent += this.formatTabCommunity(community.name, null, type);
      var container = dojo.byId(container);
      if (container) {
         dojo.empty(container);
         dojo.place(htmlContent, container, "first");
      }
   }, 
   
      /**
    * Format the Community for display
    *
    * @param name: the Community name
    * @param url:  the Community url
    * @param type: the Community type
    */
      formatTabCommunity: function(name, url, type) {    
         var htmlContent = "";
         
         // Format parent Community as link
         if (url) {        
            var altText = this.messages['tooltip.startpage'];
         htmlContent += '<a class="lotusBold comNavInline tabNavTextEllipsis" role="button" href="' + url + '" title="' + altText + '">';
         htmlContent += this.formatTabImage(type)
         htmlContent += name + '</a>';
         }
         else {
            htmlContent += '<div class="comNavInline tabNavTextEllipsis">' + this.formatTabImage(type)+ name + '</div>';
         }
         return htmlContent;
      },

   /**
    * Format the Community icon
    *
    * @param type: the Community type
    */
      formatTabImage: function(type) {
         var htmlContent = ""; 
      if (type != "public") {    
         if (type == "external") {
            htmlContent += '<span class="lotusLeft comNavIcon">';
            htmlContent += '<img class="lotusui30 lconnIconListSharedExternal" src="' + dojo.config.blankGif + '" alt="' + this.messages['label.external.members.allowed'] + '" title="' + this.messages['label.external.members.allowed'] + '" />';  
            htmlContent += '</span>';
            htmlContent += '<span class="lotusAltText">' + this.messages['label.external.members.allowed'] + ' </span>';            
         }
            else if (type == "private") {
            htmlContent += '<span class="lotusLeft comNavIcon">';
            htmlContent += '<img class="iconsStates16 iconsStates16-CheckedOut" src="' + dojo.config.blankGif + '" alt="' + this.messages['label.private.community.alt.text'] + '" title="' + this.messages['label.private.community.alt.text'] + '" />';
            htmlContent += '</span>';
            htmlContent += '<span class="lotusAltText">' + this.messages['label.private.community.alt.text'] + ' </span>';  
            } 
            else {
            htmlContent += '<span class="lotusLeft comNavIcon">';
            htmlContent += '<img class="iconsOther16 iconsOther16-ModeratedCommunity16" src="' + dojo.config.blankGif + '" alt="' + this.messages['label.moderated.community.alt.text'] + '" title="' + this.messages['label.moderated.community.alt.text'] + '"/>';
            htmlContent += '</span>';
            htmlContent += '<span class="lotusAltText">' + this.messages['label.moderated.community.alt.text'] + ' </span>';          
            }           
      }
      return htmlContent; 
   },

   /**
    * Update Subcommunities menu (if there are any Subcommunities)
    *
    */
   updateTabbedSubcommunitiesMenu: function() {
      
      var messages = this.messages;
      var subComTitle;
      var subMenu = dojo.byId("tabNavSubMenu");
      if (subMenu) {                
         
         // Remove header label
         header = subMenu.getElementsByTagName("h3")[0];          
         if (header) {                 
            header.parentNode.removeChild(header);
         }  
         
         // Check Subcommunity count
         var menuArray = dojo.query("li", "tabNavSubMenu"); 
         var subComCount = menuArray.length;
         if (subComCount > 0) {
         
            // Update Subcommunity label
            var subMenuName = dojo.byId("tabNavSubMenuSelection");
            if (subComCount==1) {
               subComTitle = messages['label.one.subcommunity'].replace("${0}", subComCount);
            }
            else {
               subComTitle = messages['label.mult.subcommunities'].replace("${0}", subComCount);
            }
            subMenuName.innerHTML = subComTitle;

			// Enable Subcommunity menu button
			this.enableTopButton("tabNavSubMenuTitleLinkAnc", lconn.communities.bizCard.core.openSubcommunityMenu);

			var subContainer = dojo.byId("tabNavSubMenuContainer");
			dojo.addClass(subContainer, "tabNavItemInBlk");
            dojo.removeClass(subContainer, "lotusHidden");
         }
      }
   },

   /**
    * Build Subcommunity dropdown menu to display in a parent
   	* Community header
   	*
   	* @param evt: the Subcommunity button click event
   	*/
  	buildSubcommunityMenu: function() {
  		var curlink, href;

	 	// Delete old copy of menu
	 	try {
			var oldMenu = dijit.byId("SubcommunityMenu");
			if (oldMenu != null) {
		 		oldMenu.destroyRecursive();
	 		}
	 	}
	 	catch (e) {
			console.log(e);
	 	}

	 	// Create new menu
	 	var subcommunityMenu = new dijit.Menu({
			"class": "lotusPlain",
			id: "SubcommunityMenu",
	 	});

  		// Create menu of Subcommunities
        var menuArray = dojo.query("li", "subcommArea");
  		dojo.forEach(menuArray, function(menuEntry, ii) {

		 	curlink = dojo.query("a", menuEntry)[0];
		 	href = dojo.attr(curlink,"href");

		 	subcommunityMenu.addChild(new dijit.MenuItem({
				id: "subcomIdx_"+ii,
				label: lconn.core.HTMLUtil.escape_q(curlink.innerHTML),
				title: curlink.innerText,
				action: href,
				onClick: function(evt){

					// Jump to Subcommunity
					window.location = this.action;
					dojo.stopEvent(evt);
				}
		 	}));

  		});
   		return subcommunityMenu;
   },

   /**
    * Open Subcommunity dropdown menu when button is clicked
    *
    * @param evt: the button click event
    */
   openSubcommunityMenu: function(evt) {
      try {
         // Adjust the aria properties of the button
         if (evt.target.id != null) {
            dojo.attr(evt.target, "aria-owns", evt.target.id + "_dropdown");
         }

         // Build the dropdown menu
         var newMenu = lconn.communities.bizCard.core.buildSubcommunityMenu();

         // Open the menu
         menuUtility.openMenu(evt, newMenu.id);
      }
      catch (e) {
         console.log(e);
      }
   },

   /**
    * Adjust the position of the dropdown menu if it won't fit
    * below the button
    *
    * @param menu: the menu name
    */
   adjustTabMenuPosition: function(menu) {

      // console.log("***** Entered adjustMenuPosition");
      var dropdownMenu, dropdownMenuRect;
      var dropdownMenuTitle, dropdownMenuTitleRect;
      var lotusMain, lotusMainRect;
      var lenAbove, lenBelow, adjust;
      var dropdownMenuHeight, dropdownMenuTitleHeight;
      
      // Determine if adjustment needed   
      var viewport = dojo.window.getBox();
      dropdownMenu = dojo.byId(menu);
      dropdownMenuRect = dropdownMenu.getBoundingClientRect();
      dropdownMenuHeight = dropdownMenuRect.bottom - dropdownMenuRect.top
      
      var checkFit = viewport.h - dropdownMenuRect.bottom;
      if (checkFit < 0 ) {
         // console.log("***** Menu does not fit");
         
         // Determine placement of container
         lotusMain = dojo.byId("lotusMain");
         if (!lotusMain) {
            lotusMain = dojo.query(".lotusMain")[0];
         }
         if (lotusMain) {
            lotusMainRect = lotusMain.getBoundingClientRect(); 
         }
         // Determine placement of menu button
         if (menu == "dropdownNavMenu") {                
            dropdownMenuTitle = dojo.byId("dropdownNavMenuTitle");               
         }
         else {
            dropdownMenuTitle = dojo.byId("tabNavSubMenuTitle")
         }
         dropdownMenuTitleRect = dropdownMenuTitle.getBoundingClientRect();
         dropdownMenuTitleHeight = dropdownMenuTitleRect.bottom - dropdownMenuTitleRect.top
               
         // Determine available space above button
         lenAbove = dropdownMenuTitleRect.top;
         lenAbove = (lenAbove < 0) ? 0 : lenAbove;
         if (lenAbove > 0) {
            if (lotusMainRect) {
               var topMain = (lotusMainRect.top < 0) ? 0 : lotusMainRect.top;
               var lenMain = (dropdownMenuTitleRect.top - topMain) - 15;
               lenAbove = (lenAbove > lenMain) ? lenMain : lenAbove;
            }
         }
         
         // Determine available space below button
         var bottom = viewport.h;
         if (lotusMainRect) {
            bottom = (bottom > lotusMainRect.bottom) ? lotusMainRect.bottom : bottom;
         }
         lenBelow = (bottom - dropdownMenuTitleRect.bottom) - 15;
         lenBelow = (lenBelow < 0) ? 0 : lenBelow;
         // console.log("***** Length Above: "+lenAbove+" Length Below: "+lenBelow);
         
         // More room above button
         if (lenAbove >= lenBelow) {
            // console.log("***** More room above the button");
            if (dropdownMenuHeight > lenAbove) {
               dojo.style(dropdownMenu, {"overflowY":"scroll", "height":lenAbove+"px"});
               adjust = dropdownMenuTitleHeight + lenAbove - 1;
            }
            else {
               adjust = dropdownMenuTitleHeight + dropdownMenuHeight - 1;
            }
            
            var newtop = -adjust;
            dojo.style(dropdownMenu, "top", newtop+"px");
         }
         // More room below button
         else {
            // console.log("***** More room below the button");
            if (dropdownMenuHeight > lenBelow) {
               dojo.style(dropdownMenu, {"overflowY":"scroll", "height":lenBelow+"px"});
            }

         }
      }
   },

  /**
   * Refresh the Tabbed Applications menu when a widget event occurs
   *
   * @param eventType: the type of event (i.e. add widget, remove widget, etc)
   * @param nodeId: the affected node
   */
   refreshTabbedApplicationsMenu: function(eventType, nodeId) {

	  // Handle full page mode
	  if (eventType == "ic-core/wp/enteredFullPageMode") {
			this.refreshFullpageSelection();
	  }

  	  // Handle everything else
  	  else {
		  // Refresh the tabbed menu
		  if (this._curMenu != null && this._curContainer != null) {
			   this.buildTabbedNavMenu(this._curMenu, this._curContainer);
		  }
	  }
   },

   /**
    * Update current menu selecton when switching to full page mode. Because of
    * a quirk in the widget framework the selection jumps to Overview first, THEN
    * switches to the correct widget later (causing timing issues).
    */
    refreshFullpageSelection: function() {
		setTimeout(function(){
	// CNXSERV-9214 You have joined the community and can now post content" message is getting disappeared from Community Highlight page.
	var isHighlightsLandingPageValues =lconn.communities.bizCard.core.isHighlightsStartPage();
	//clear message only if Highlights is not selected as Landing Page.
	if(!isHighlightsLandingPageValues[0]){
		// Clear an external message when going to full page mode (Defect: 200814)
        	clearMessage("com_ibm_oneui_controls_MessageBox_0");
	}
		  	var tabMenu = dojo.byId("tabNavContainer");
		  	var menuArray = dojo.query("li", tabMenu);
		  	dojo.forEach(menuArray, function(menuEntry, ii) {
				if (dojo.hasClass(menuEntry, "lotusSelected")) {
					if (dojo.hasClass(menuEntry, "lotusHidden")) {
						var tabNavMoreBtn = dojo.byId("tabNavMoreBtn");
						if (tabNavMoreBtn) {
							dojo.addClass(tabNavMoreBtn, "lotusSelected");
							tabNavMoreBtn.tabIndex = 0;
							tabNavMoreBtn.focus();
						}
					}
					else {
						menuEntry.tabIndex = 0;
						menuEntry.focus();
					}
				}
		  	});
		}, 500);
	},

   /**
    * Update the Tabbed Applications menu and set up event
    * handlers
    *
    * @param menuData: raw menu data
    * @param container: the container for the result
    */
   updateTabbedApplicationsMenu: function(menuData, container) {

      // console.log("***** Entered updateTabbedApplicationsMenu");
      var navMenu = dojo.byId(menuData);
      if (navMenu) {

		 // Setup keyboad navigation
	     this.enableMenuKeyboardNav(menuData);

		 // Place tabbed menu in container
		 this.buildTabbedNavMenu(menuData, container);
		 
		 // Enable poller to handle late loading CSS on cloud
		 this.startPlaceBarPoller();

         // Register for widget events
         lconn.core.WidgetPlacement.subscribeToWidgetEvents(this, this.refreshTabbedApplicationsMenu);

         // Also adjust tabs on resize
         dojo.connect(window, "onresize", this, function(evt) {
			this.calculateTabSizes();
			this.adjustTabbedMenuSize();
			if (evt != null) {
				dojo.stopEvent(evt);
			}
			return false;
		 });
      }
   },

   /**
    * Enable keyboard navigation for menu.
    *
    * @param menuId: the menu to modify
    */
   enableMenuKeyboardNav: function(menuId) {

      var menuArray = dojo.query("li", menuId);
      var code = null;
      dojo.forEach(menuArray, function(menuEntry, ii) {
         dojo.connect(menuEntry, 'onkeydown', menuEntry, function(evt) {
            // console.log("***** Navbar key pressed");
            if (evt) {
               code = evt.keyCode || evt.charCode;
               switch(code){
                  case dojo.keys.ENTER:
                  case dojo.keys.SPACE:
                     // console.log("***** Navbar enter/space pressed, click entry");
                     var curlink = dojo.query("a", this)[0];
                     if (curlink) {
                        curlink.click();
                     }
                     dojo.stopEvent(evt);
                     break;
               }
            }
         });
      });
   },

   /**
    * Build the Tabbed Applications menu
    *
    * @param menuData: raw menu data
    * @param container: the container for the result
    */
    buildTabbedNavMenu: function(menuData, container) {

    	 // console.log("***** Entered buildTabbedNavMenu");
    	 var messages = this.messages;
		 this._curMenu = menuData;
		 this._curContainer = container;
		 var morebtn;
		 var htmlContent = "";
		 var menuLength=0;
		 var marginBox;
		 var lotusMain, panelId;
		 var selFound = false;

         // Place tabbed menu in container
         var selIdx = 0;
         var navMenu = dojo.byId(menuData);
         if (navMenu) {

            // Initialize Menu
            dojo.attr(navMenu, {"class":"lotusTabs tabNavItemInBlk","role":"tablist"});
            navMenu.parentNode.removeChild(navMenu);
            dojo.addClass(navMenu, "lotusHidden");
            var tabMenu = dojo.byId(container);
            dojo.place (navMenu, tabMenu, "last");
            
            // Mark menu appropriate for all caps, if not Greek
            
            if (dojoConfig.locale && dojoConfig.locale.substring(0,2) !== "el") {
            	dojo.addClass(navMenu, "lotusAllCapsAllowed");
            }

            // Ensure More button is the last in the list, if it exists
            // it might not be, if widget just added
            morebtn = dojo.byId("tabNavMoreBtn");
            if (morebtn) {
				dojo.place(morebtn, navMenu, "last");
            }
            
            
            // Change aria roles and set selection.
            this._menuArray = dojo.query("li", tabMenu);
            menuLength = this._menuArray.length;
            dojo.forEach(this._menuArray, function(menuEntry, ii) {

			   // Initialize entries
			   dojo.attr(menuEntry, {"tabindex":"-1","aria-selected":"false","role":"tab"});
               menuEntry.removeAttribute("aria-pressed");

               if (dojo.hasClass(menuEntry, "lotusSelected") && !selFound) {
				  dojo.attr(menuEntry, {"tabindex":"0", "aria-selected":"true"});
                  selIdx = ii;
                  selFound = true;
               }

               // Add More button for menu overflow
               morebtn = dojo.byId("tabNavMoreBtn");
               if (morebtn == null) {
				   if (ii == menuLength-1) {
						htmlContent += '<li role="button" id="tabNavMoreBtn" aria-label="' + messages['label.top.buttons.com.action.menu'] +  messages['label.more'] +'"> <a href="javascript:">' + messages['label.more'];
						htmlContent += '<div class="tabNavItemInline"><img id="moreButtonArrow" class="lotusArrow lotusDropDownSprite" src="' + dojo.config.blankGif + '" alt="" title="" role="presentation"></img><span class="lotusAltText">&#9660;</span></span></div>';
						htmlContent += '</a></li>';
						dojo.place (htmlContent, menuEntry, "after");

						morebtn = dojo.byId("tabNavMoreBtn");
						if (morebtn) {
							dojo.attr(morebtn, {"tabindex":"-1","aria-selected":"false","role":"tab"});
							dojo.connect(morebtn, "onclick", this, function(evt) {
								lconn.communities.bizCard.core.openMoreMenu(evt);
								if (evt != null) {
									dojo.stopEvent(evt);
								}
								return false;
							});

							// Enable keyboard navigation
							this.enableMoreBtn();
						}
				   }
		       }
			}, this);

            // Mark the Tab Content area
            panelId = "lotusMain";
         	lotusMain = dojo.byId(panelId);
         	if (!lotusMain) {
            	lotusMain = dojo.query(".lotusMain")[0];
            	if (lotusMain) {
            		if (lotusMain.id) {
						panelId = lotusMain.id;
			    	}
			    	else {
						dojo.attr(lotusMain, {"id": panelId});
					}
				}
         	}
         	if (lotusMain) {
				dojo.attr(lotusMain, {"role":"tabpanel"});
         	}

            // Create Tab Panel menu
         	if (!this._tabNavPanel) {
         		this._tabNavPanel = new lconn.communities.bizCard.core.navTabPanel(menuData, {"selIdx": selIdx, "panel":panelId} );
         	}
         	
			// Calculate menu tab sizes
			this.calculateTabSizes();

            // Make Size adjustments if necessary
			this.adjustTabbedMenuSize();

			// Display menu
            dojo.removeClass(navMenu, "lotusHidden");
         }
    },

   /**
	* Enable the More button to respond to keyboard events (without
	* passing them along to the window)
	*
    */
	enableMoreBtn: function() {

		// Enable keyboard menu open
		var code = null;
		morebtn = dojo.byId("tabNavMoreBtn");
		if (morebtn != null) {
		   dojo.connect(morebtn, 'onkeydown', morebtn, function(evt) {
			  if (evt) {
				 code = evt.keyCode || evt.charCode;
				 switch(code){
					case dojo.keys.ENTER:
					case dojo.keys.SPACE:
					   // console.log("***** More button enter/space pressed, click entry");
					   var curlink = dojo.query("a", this)[0];
					   if (curlink) {
						  curlink.click();
					   }
					   dojo.stopEvent(evt);
					   break;

					case dojo.keys.UP_ARROW:
					case dojo.keys.DOWN_ARROW:
					   // console.log("***** More button arrow key pressed, changing selection");
					   dojo.stopEvent(evt);
					   break;
				 }
			  }
		   });
	    }
	},

   /**
    * Calculates the dimensions of each of the tabs in the menu, so menus can be resized if necessary.
    * All the tabs are initially hidden, and later are unhidden if they fit.
    */
    calculateTabSizes: function() {
      var morebtn;
	  var menuLength=0;
	  var marginBox;

	  // Loop through tabs
	  var tabMenu = dojo.byId("tabNavContainer");
	  if (tabMenu) {
		  this._menuArray = dojo.query("li", tabMenu);
		  this._menuEntryWidths = new Array();
		  this._totalMenuSize = 0;
		  dojo.forEach(this._menuArray, function(menuEntry, ii) {
			    if (dojo.hasClass(menuEntry, "lotusHidden")) {
					dojo.removeClass(menuEntry, "lotusHidden");
				}
	
				// Save tab dimensions
				marginBox = dojo.marginBox(menuEntry);
				this._menuEntryWidths[ii]= marginBox;
	
				// Hide tabs
				if (menuEntry.id !== "tabNavMoreBtn") {
					dojo.addClass(menuEntry, "lotusHidden");
					this._totalMenuSize += marginBox.w;
				}
	
				// Show More button
				else {
					this._moreBtnWidth = marginBox;
					dojo.removeClass(menuEntry, "lotusHidden");
				}
			}, this);
	    }
	},

   /**
    * adjustTabbedMenuSize determines if the entire tabbed application menu will be able to
    * fit on one line.  If there is not enough horizonal space the menu is truncated and the
    * More button is turned on.  It takes no parameters so that it can be called easily from
    * many spots.
    *
    */
    adjustTabbedMenuSize: function() {
	  var marginBox;
	  var appTabWidth;
	  var spaceNeeded;
	  var spaceAvailable;
	  var ii;
	  var done = false;

      // console.log("***** Entered adjustTabbedMenuSize");

      // Find containers we'll need
	  var placeBar = dojo.byId("lotusPlaceBar");
	  if (!placeBar) {
         placeBar = dojo.query(".lotusPlaceBar")[0];
	  }
	  var menuBar = dojo.byId("tabNavMenu");
      var tabMenu = dojo.byId("tabNavContainer");
      var actionsMenu = dojo.query(".tabNavActionsMenu")[0];

      // Determine if adjustment needed
      if (placeBar && menuBar && tabMenu && actionsMenu) {
         try {

            // Find More button and its visibility
            var tabNavMoreBtn = dojo.byId("tabNavMoreBtn");
            var tabNavMoreBtnHidden = dojo.hasClass(tabNavMoreBtn, "lotusHidden");

			// Calculate total menu width
			var placeBarRect  = placeBar.getBoundingClientRect();
            var placeBarWidth = placeBarRect.right - placeBarRect.left;
            var tabMenuRect  = tabMenu.getBoundingClientRect();
            var isLTR = dojo._isBodyLtr();
            if (isLTR) {
            	var inset = tabMenuRect.left - placeBarRect.left;
            } else {
            	var inset = placeBarRect.right - tabMenuRect.right;
            }
            var menuBarWidth = placeBarWidth - inset;
            // console.log("***** Total Menu Bar Width: "+menuBarWidth);

            // Calculate Actions Menu width
            var actionsMenuRect  = actionsMenu.getBoundingClientRect();
            var actionsMenuWidth = actionsMenuRect.right - actionsMenuRect.left;
            actionsMenuWidth += 25;  //Add a padding
            if (isLTR) {
            	var actionsMenuInset = placeBarRect.right - actionsMenuRect.right;
            } else {
            	var actionsMenuInset = actionsMenuRect.left - placeBarRect.left;
            }
            // console.log("***** Actions Menu Width: "+actionsMenuWidth);

            // Determine available Tab Menu space
            var tabMenuSpace = menuBarWidth - actionsMenuWidth - actionsMenuInset;
   	  		tabMenuWidth = this._totalMenuSize;

			// Determine if we have room
            // console.log("***** tabMenuWidth: "+tabMenuWidth+" tabMenuSpace: "+tabMenuSpace);
            if (tabMenuWidth > tabMenuSpace) {

				// Show More button if hidden
				if (tabNavMoreBtnHidden) {
					dojo.removeClass(tabNavMoreBtn, "lotusHidden");
					tabNavMoreBtnHidden = false;
				}
				// not enough room, need to factor in More button width
			    tabMenuWidth += this._moreBtnWidth.w;

				// Calculate how much space we need
				spaceNeeded = tabMenuWidth-tabMenuSpace;
				// console.log("***** Menu does not fit, space needed: "+spaceNeeded);

				// Skip More button, and start hiding entries
				ii = this._menuArray.length-2;
				while (spaceNeeded > 0) {

					// Calculate tab width
					var appTabWidth = this._menuEntryWidths[ii].w;

					// Hide tab
					if (!dojo.hasClass(this._menuArray[ii], "lotusHidden")) {
						dojo.addClass(this._menuArray[ii], "lotusHidden")
					}

					// Move selection to More button if necessary
					if (dojo.hasClass(this._menuArray[ii], "lotusSelected") && !tabNavMoreBtnHidden) {
						dojo.addClass(tabNavMoreBtn, "lotusSelected")
					}

					// Update space
					spaceNeeded -= appTabWidth;
					// console.log("***** Tab width: "+appTabWidth+" Space needed now: "+spaceNeeded);
					ii--;
				}
				
				// Made enough space, now unhide the remaining tabs
				while (ii > -1) {
					if (dojo.hasClass(this._menuArray[ii], "lotusHidden")) {
						dojo.removeClass(this._menuArray[ii], "lotusHidden")
					}
					ii--; 
				}
            }
            // Everything currently fits
            else {

      			// If we are showing more button see if there are
      			// more entries to expose
      			if (!tabNavMoreBtnHidden) {

					spaceAvailable = tabMenuSpace;
					// console.log("***** Expanding menu, space available: "+spaceAvailable);

					// Start unhidding entries
					var ii = 0;
					while (spaceAvailable > 0 && !done) {

						var appHidden = dojo.hasClass(this._menuArray[ii], "lotusHidden");
						if (appHidden) {

							// Calculate tab width
							var appTabWidth = this._menuEntryWidths[ii].w;

							// If we're down to last entry add in More button size
							if (ii == this._menuArray.length-2) {
								spaceAvailable += this._moreBtnWidth.w;
						    }

							if (appTabWidth < spaceAvailable) {

								// Show tab
								dojo.removeClass(this._menuArray[ii], "lotusHidden")

								// Move selection from More button if necessary
								if (dojo.hasClass(this._menuArray[ii], "lotusSelected") && !tabNavMoreBtnHidden) {
									dojo.removeClass(tabNavMoreBtn, "lotusSelected");
								}

								// Update space
								spaceAvailable -= appTabWidth;
								// console.log("***** Tab width: "+appTabWidth+" Space available now: "+spaceAvailable);

								// If all tabs are showing, hide the more button
								if (ii == this._menuArray.length-2) {
									dojo.addClass(tabNavMoreBtn, "lotusHidden");
									done = true;
								}
							}
							else {
								spaceAvailable = 0;
							}
						}
						ii++;
						if (ii >= this._menuArray.length) {
							done = true;
						}
					}
            	}
			}

			// Defect 192454: If we have a visible app selected make sure the More button is not selected also.
 			dojo.forEach(this._menuArray, function(menuEntry, ii) {
			   if (dojo.hasClass(menuEntry, "lotusSelected")) {
			   	   if ((!dojo.hasClass(menuEntry, "lotusHidden")) && menuEntry.id != "tabNavMoreBtn") {
					  dojo.removeClass(tabNavMoreBtn, "lotusSelected");
				   }
		   	   }
			}, this);
         }
         catch (e) {
            console.log(e);
         }
      }
       if (window.ui && typeof window.ui._check_ui_enabled === 'function' && window.ui._check_ui_enabled()) {
           var tabNavBar = document.getElementById("tabNavBar");
           var tertiary_level_nav = document.getElementById("tertiary_level_nav");
           if (tertiary_level_nav && !tertiary_level_nav.childNodes.length) {
               tertiary_level_nav.append(tabNavBar);
               dojo.addClass(tertiary_level_nav, "addHeight150");
           }
       }
   },
   
   getPlaceBarWidth : function() {
		var placeBar = dojo.byId("lotusPlaceBar");
		if (!placeBar) {
			placeBar = dojo.query(".lotusPlaceBar")[0];
		}

		var placeBarRect = placeBar.getBoundingClientRect();
		var placeBarWidth = placeBarRect.right - placeBarRect.left;
		return placeBarWidth;
   },

   getActionsBarWidth : function() {
		var actionsBar = dojo.query(".tabNavActionsMenu")[0];
		if (!actionsBar) {
			return 0;
		}

		var actionsBarRect = actionsBar.getBoundingClientRect();
		var actionsBarWidth = actionsBarRect.right - actionsBarRect.left;
		return actionsBarWidth;
  },

   startPlaceBarPoller : function() {
	   this.placeBarOldWidth = this.getPlaceBarWidth();
	   this.actionsBarOldWidth = this.getActionsBarWidth();
	   this.placeBarPollCount = 0;
	   this.placeBarPoller = new dojox.timing.Timer(300);
	   this.placeBarPoller.onTick = dojo.hitch(this, "checkPlaceBar");
	   this.placeBarPoller.start();
   },
   
   /* Periodic check the placebar because late loading CSS can alter
    * its width and the spacing of the tabs */
   checkPlaceBar : function() {
		this.placeBarPollCount++;

		var placeBarWidth = this.getPlaceBarWidth();
		var actionsBarWidth = this.getActionsBarWidth();
		if (this.placeBarOldWidth != placeBarWidth || this.actionsBarOldWidth != actionsBarWidth) {
			//console.log("PlaceBar/ActionBar resize detected - adjusting Tabbed Menu size");
			this.calculateTabSizes();
			this.adjustTabbedMenuSize();
		} else if (this.placeBarPollCount > 100) {
			this.placeBarPoller.stop();
		}
		this.placeBarOldWidth = placeBarWidth;
		this.actionsBarOldWidth = actionsBarWidth;
	},

   /**
	 * When the entire application menu doesn't fit on a single line, build
	 * dropdown menu containing a list of the applications which don't fit
	 * 
	 * @param evt:
	 *            the More button click event
	 */
   buildMoreMenu: function() {
	  var curlink;

      // Delete old copy of More menu
      try {
         var oldMoreMenu = dijit.byId("CommunitiesMoreMenu");
         if (oldMoreMenu != null) {
			 oldMoreMenu.destroyRecursive();
	 	 }
      }
      catch (e) {
         console.log(e);
      }

      // Create new menu
      var moreMenu = new dijit.Menu({
         "class": "lotusPlain tabNavBar",
         id: "CommunitiesMoreMenu"
      });

	  // Create menu of hidden elements
	  var menuArray = dojo.query("li", "tabNavContainer");
	  var isHighlightsLandingPageValues =lconn.communities.bizCard.core.isHighlightsStartPage();
	
	  dojo.forEach(menuArray, function(menuEntry, ii) {
	  	 if (dojo.hasClass(menuEntry, "lotusHidden")) {
			 curlink = dojo.query("a", menuEntry)[0];
			 //COMMUNITY-199 Overview page is displayed as a selection even though it's not part of the Community layout
			 
			if(isHighlightsLandingPageValues [0]== true){
				if(curlink.firstChild.data.indexOf("Overview") ==-1 ){ // if not overview then add child
				    moreMenu.addChild(new dijit.MenuItem({
					id: "moreIdx_"+ii,
					label: curlink.innerHTML,
					onClick: function(evt){

					var idxStr = this.get("id").substring(8);
					var idx = Number(idxStr);
					var navItem = menuArray[ii];
	  				var navlink = dojo.query("a", navItem)[0];

					morebtn = dojo.byId("tabNavMoreBtn");
               				if (morebtn) {
					    dojo.addClass(morebtn, "lotusSelected");
					}

					// Stop More menu event
					dojo.stopEvent(evt);

					// Trigger Navigation event
	  				lconn.communities.bizCard.core.triggerMenuItem(navlink);
				    }
		    		}));
			    }
			} else {
                moreMenu.addChild(new dijit.MenuItem({
                    id: "moreIdx_"+ii,
                    label: curlink.innerHTML,
                    onClick: function(evt){
   
                       var idxStr = this.get("id").substring(8);
                       var idx = Number(idxStr);
                       var navItem = menuArray[ii];
                         var navlink = dojo.query("a", navItem)[0];
   
                       morebtn = dojo.byId("tabNavMoreBtn");
                          if (morebtn) {
                           dojo.addClass(morebtn, "lotusSelected");
                       }
   
                       // Stop More menu event
                       dojo.stopEvent(evt);
   
                       // Trigger Navigation event
                       lconn.communities.bizCard.core.triggerMenuItem(navlink);
                   }
               }));
            }	
	 	 }

	  }, this);
      return moreMenu;
   },

   /**
    * When an item has been selected from the More dropdown menu
    * pass along a click event to the corresponding menu link.
    *
    * @param navlink: the target of the click event
    */
	triggerMenuItem: function(navlink) {
		// console.log("***** Entered triggerMenuItem");
		var mouseEvent;
		var retval;

		if (navlink.dispatchEvent) {
			mouseEvent = document.createEvent("MouseEvent");
			mouseEvent.initMouseEvent("click", true, true, window, 0,
				0, 0, 0, 0,
				false, false, false, false,
			    0, null);
			mouseEvent.synthetic = true;
    		setTimeout(function(){ navlink.dispatchEvent(mouseEvent, true); }, 1800);
		}
		return;
	},

   /**
    * When the entire application menu doesn't fit on a single line, a dropdown menu
    * is attached to a More button.
    *
    * @param evt: the More button click event
    */
   openMoreMenu: function(evt) {
	  var topTxt;
	  var idx;
	  var newTop;

	  // Don't open the menu if More button is hidden
	  var tabNavMoreBtn = dojo.byId("tabNavMoreBtn");
	  if (!dojo.hasClass(tabNavMoreBtn, "lotusHidden")) {
		  try {
			 // Adjust the aria properties of the button
			 if (evt.target.id != null) {
				dojo.attr(evt.target, "aria-owns", evt.target.id + "_dropdown");
			 }

			 // Build the overflow menu
			 var moreMenu = lconn.communities.bizCard.core.buildMoreMenu();

			 // Open the menu
			 var opts;
			 // set the parent to be the More button
			 openedBy = dojo.byId("tabNavMoreBtn");
			 menuUtility.openMenu(evt, moreMenu.id, openedBy, opts);
		  }
		  catch (e) {
			 console.log(e);
		  }
      }
   },

   /**
    * Fix the Tabbed Navigation to the top of the screen
    * when scrolling down.
    *
    */
   fixNavOnScroll: function() {
	  var megaMenuRect;
	  var windowAdjust;
	  var adjusted = false;

      var tabNavBar = dojo.query(".tabNavBar")[0];
      if (tabNavBar) {

	     var megaMenuHeight = 0;
	     var isFixedMegaMenu = false;

         var tabNavBarRect = tabNavBar.getBoundingClientRect();
         var viewport = dojo.window.getBox();
         var scrollStart = viewport.t + tabNavBarRect.top;

         // Calculate the height of the Mega Menu
         var megaMenu = dojo.byId("lotusBanner");
		 if (!megaMenu) {
		 	 megaMenu = dojo.query(".lotusBanner")[0];
      	 }
      	 if (megaMenu) {
			 megaMenuRect = megaMenu.getBoundingClientRect();
			 megaMenuHeight = megaMenuRect.bottom - megaMenuRect.top
	 	 }

         // Determine if mega-menu fixed
         var fixedMegaMenu = dojo.query(".ics-scbanner .isfixed")[0];
      	 if (fixedMegaMenu) {
		     isFixedMegaMenu = true;
	     }

		 // Calculate window adjustment
		 windowAdjust = tabNavBarRect.bottom + 10;

         dojo.connect(window, 'onscroll', this, function(event) {

         	var moreMenu = dijit.byId('CommunitiesMoreMenu');
            if (moreMenu && moreMenu.isShowingNow) {
               dijit.popup.close(moreMenu);
            }

            // Make sure that scrollStart is at least forty so we can always scroll back to the top
            var scrollStart = (megaMenuHeight > 40 ) ? megaMenuHeight : 40;

			var isFixed = dojo.hasClass(tabNavBar, "tabNavFixed");
            this.fixedMenuDisabled = this.fixedMenuDisabled || this.isCKEditorOpen();
            if (this.fixedMenuDisabled) {
            	if (isFixed) {
                  dojo.removeClass(tabNavBar, "tabNavFixed");
                  this.refreshTabbedApplicationsMenu(null, null);
            	}
            }
            else {

				// Fix for CR1 Defect: 193130
				if (!isFixed & !adjusted) {
                  // Fix for CR4 Defect: 223596
                  // FixNavOnScroll() would keep adding forums' footer by call adjustWindowHeight() after:
                  // 1. Closing the editor panel(submit or cancel)
                  // 2. Scroll to top until the fixed navigation bar is changed to full-size one
                  // Limit the footer's high to stop the unlimited growth
                  var lotusFooter;
                  var lotusFooterRect;
                  var lotusFooterHeight;
                  lotusFooter = dojo.byId('lotusFooter');
                  lotusFooterRect = lotusFooter.getBoundingClientRect();
                  lotusFooterHeight = lotusFooterRect.bottom - lotusFooterRect.top;
                  if (lotusFooterHeight < 200) {
                     console.log("lotusFooterHeight:", lotusFooterHeight)
                     this.adjustWindowHeight(windowAdjust);
                     adjusted = true;
                  }
				}

	            var scrollTop = dojo.docScroll().y;
            	// console.log("***** Scroll Event, scrollStart: "+scrollStart + " scrollTop: "+scrollTop);
	            if (scrollTop >= scrollStart + 10) {
	               if (!isFixed) {

	                  // Fix the menu and adjust top based on mega menu
                     dojo.addClass(tabNavBar, "tabNavFixed");
                     this.closeActionsMenu();
	                  if (isFixedMegaMenu) {
                        dojo.style(tabNavBar, "top", megaMenuHeight+"px")
                     }
	                  this.refreshTabbedApplicationsMenu(null, null);
	                  this.startFixedMenuPolling();
	               }
	            }
	            else if (scrollTop <= scrollStart - 10) {
	               if(isFixed) {
	                  dojo.removeClass(tabNavBar, "tabNavFixed");
	                  this.refreshTabbedApplicationsMenu(null, null);
	               }
	            }
	         }
         });
      }
    },

  /**
   * Fix for CR1 Defect: 193130
   *
   * When the Tab Nav menu is fixed to the top of the screen it has the side effect of increasing the
   * height of the underlying data window by the height of top menu (since the two now overlap).  If we're
   * scrolling, this extra height can cause the scroll bar to disappear and scrolling to fail.
   *
   * @param adjust: amount to adjust window size
   */
   adjustWindowHeight: function(adjust) {
	    // console.log("***** Entered adjustScrollHeight, adjustment: "+adjust);
	    var lotusFooter;
	    var lotusFooterRect;
	    var lotusFooterHeight;

 		// Find the footer
	    lotusFooter = dojo.byId('lotusFooter');
	    if (!lotusFooter) {
			lotusFooter = dojo.query(".lotusFooter")[0];
        }

	    // Adjust height of the footer
	    if (lotusFooter && adjust) {
		  	lotusFooterRect = lotusFooter.getBoundingClientRect();
		  	lotusFooterHeight = lotusFooterRect.bottom - lotusFooterRect.top;
		  	lotusFooterHeight += adjust;
		  	dojo.style(lotusFooter, {"height":lotusFooterHeight+"px"});
	  	}
   },

   doDangerousAction: function(link) {
      
      // create form which will POST to the link URL
       var nonceForm = document.createElement("FORM");
       nonceForm.action = link;  // set url for form
       nonceForm.method = "post";
       document.getElementsByTagName("body")[0].appendChild(nonceForm);
         
       lconn.communities.bizCard.core.submitFormWithNonces(nonceForm);
   },
   
   submitFormWithNonces: function(form, needToFixEXIF, event) {
    lconn.communities.bizCard.core.addNonceToForm(form);

    lconn.communities.bizCard.core.setNonceCookie();
      if (window.gatekeeperConfig && window.gatekeeperConfig['image_auto_rotate_enable']
        && needToFixEXIF) {
            if (form.name === 'editCommunityForm' || form.name === 'addCommunityForm') {
                // if it's sub community operation, should prevent the default form submittion
                // to avoid submit form twice
                event && event.preventDefault();
            }
            var uploadUtil = new lconn.core.upload.util.UploadUtil();
            var inputEls = form.getElementsByTagName('input');
            var photoEl = inputEls && inputEls.length ? (inputEls.photo || inputEls.editPhoto || inputEls.addPhoto) : null;
            var file = photoEl ? photoEl.files[0] : null;
            if (file) {
                uploadUtil.convertImageOrientation(file).then(
                    dojo.hitch(this, function(data) {
                    if (data && data.opts && !data.opts.isOrigin) {
                        var targetForm = dojo.clone(form);
                        var inputs = targetForm.getElementsByTagName('input');
                        var photoDataName = 'photo';
                        if (inputs && inputs.length) {
                            photoDataName = inputs.photo ? 'photo' : (inputs.addPhoto ? 'addPhoto' : 'editPhoto');
                            var photoElTarget = inputs.photo || inputs.editPhoto || inputs.addPhoto;
                            if (photoElTarget) {
                                photoElTarget.parentNode.removeChild(photoElTarget);
                            }
                        }
    
                        var uploadFormData = new FormData(targetForm);
                        uploadFormData.append(photoDataName, data.file, data.file.name);
                        
                        var args = {
                            load: function( res, ioArgs ) {
                                if (ioArgs.xhr && ioArgs.xhr.responseURL) {
                                    window.location.href = ioArgs.xhr.responseURL;
                                } else {
                                    document.open();
                                    document.write(res);
                                    document.close();
                                }
                            },
                        };
                        args.headers = {
                            'X-Update-Nonce': lconn.communities.bizCard.core.getNonce() || '',
                            'content-type' : false,
                            'Accept': "text/html, application/xhtml+xml, */*",
                        }
                        args.url = form.action;
                        args.rawBody = uploadFormData;
                        dojo.xhrPost( args );
                    } else {
                        form.submit();
                    }
                })).otherwise(function(){
                    form.submit();
                });
            } else {
                form.submit();
            }
      } else {
        form.submit();
      }
   },
   
	setNonceCookie: function() {
		var name ="X-Update-Nonce=";
		// clear any existing cookies
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		
		// Set session cookie, expires in 1 1/2 seconds
		var secure = '';
		if (window.location.protocol == "https:") {
			secure = '; secure';
		}
		
	    document.cookie = name + lconn.communities.bizCard.core.getNonce() + "; expires=" +
	    new Date(new Date().getTime() + 1500).toGMTString() + "; path=/" + secure;			
	},
	
   addNonceToForm: function(form) {
       // Add nonce field
       var inputField = document.createElement("INPUT");
       inputField.setAttribute("type", "hidden");  
       inputField.name="X-Update-Nonce";
       inputField.value=lconn.communities.bizCard.core.getNonce();
       form.appendChild(inputField);
   },
   
   getNonce: function() {
      if (typeof lconn.communities.bizCard.core.community != 'undefined' && 
            typeof lconn.communities.bizCard.core.community.dangerousurlnonce != 'undefined')
         return lconn.communities.bizCard.core.community.dangerousurlnonce;
      return window.dangerousurlnonce;
   },
   
   startFixedMenuPolling: function() {
	   
	   if (!this.focusTimer) {
		   this.focusTimer = new dojox.timing.Timer(200);
		   this.focusTimer.onTick = dojo.hitch(this, "handleFixedMenuPolling");
	   }

	   this.focusTimer.start();
   },
      
   handleFixedMenuPolling: function() {
       var tabNavBar = dojo.query(".tabNavBar")[0];
       var isFixed = tabNavBar && dojo.hasClass(tabNavBar, "tabNavFixed");
	   if (isFixed && document.querySelector('.tabNavBar') == null) {
		   this.handleFocusUnderFixedMenu();
	   }

       // Handle enabling/disabling the fixed menu based upon the CKEditor is open
       // Don't want our fixed menu to cover the CKeditor fixed toolbar
	   if (this.fixedMenuDisabled != this.isCKEditorOpen()) {
		   this.fixedMenuDisabled = this.isCKEditorOpen();
		   this.fixNavOnScroll();
	   } 
   },
   
   handleFocusUnderFixedMenu: function() {
	   
	   // If focus just changed, scroll the element with focus into view if covered by fixed tab nav menu
	   if (document.activeElement) {
		   
		   var FIXED_TAB_HEIGHT = 80;
		   
		   var elementPos = dojo.position(document.activeElement);
		   var atTopOfPage = (elementPos.y <= FIXED_TAB_HEIGHT);
		   
		   // ignore when focus put on things like a large div
		   var elementNotTooTall = elementPos.h <= 50;
		   
		   if (atTopOfPage && elementNotTooTall && !dojo.isDescendant(document.activeElement, "tabNavBar")
				   && document.activeElement !== this.lastActiveElement) {
//			   console.log("Focussed element " + document.activeElement.id + " covered.  Scrolling.")
			   window.scrollBy(0, -(FIXED_TAB_HEIGHT + 10));
		   }
		   this.lastActiveElement = document.activeElement;
	   }
   },
   
   isCKEditorOpen: function () {
	   return (dojo.query(".cke_toolbar").length > 0);
   },

   scrollToOffsetFixedMenu: function () {
       console.log("deprecated - use setupHashHandling instead");
  },
  
  /**
   * Scrolls to a document bookmark link factoring in the fixed, tab nav menu if it exists
   * Requires that the hash value only contains the document bookmark id
   */
  scrollToHash: function() {
	   var node;
	   var isEmptyNode = false;	 
	   var hash = dojo.hash();
	   if (hash) {
		   hash = decodeURIComponent(hash);
	   }
	   if (hash && (node = dojo.byId(hash)) || (node = dojo.query("a[name='"+hash+"']")[0])) {
		  //Fix the defect that clicking document bookmark link will 
		  //go to incorrect position when bookmark didn't have content.
		  if(node.innerHTML == "" || node.innerHTML == null || typeof node.innerHTML == "undefined"){
			  node.innerHTML = "&nbsp;";
			  isEmptyNode = true;
		  }
	      var newPosition = dojo.coords(node, true).y;
	      var offset = this.getFixedMenuOffset(newPosition);
	 	  newPosition += offset;
	      com.ibm.lconn.layout.page.scrollToY(newPosition);    
	 	  if(isEmptyNode)
		      node.innerHTML="";
	   }
  },
  
  /**
   * Enables event listener for when document bookmark links are used, factoring in the fixed, tab nav menu if it exists
   * Requires that the hash value only contains the document bookmark id
   */
  setupHashHandling: function() {
	  dojo.subscribe("/dojo/hashchange", null, dojo.hitch(this, lconn.communities.bizCard.core.scrollToHash));
	  this.scrollToHash();
  },
  
  
  /**
   * Returns an offset to scroll vertically to account for the tab nav's fixed menu
   * overlaying the top of the page.  
   *
   * @param additionalOffset optional - if vertical scrolling is imminent, the amount of that scrolling
   */
   getFixedMenuOffset: function(additionalOffset) {
 	  var offset = 0;
 	  
       var tabNavBar = dojo.query(".tabNavBar")[0];
       if (tabNavBar && this.isFixedMenuNeeded(additionalOffset)) {
     	  
           var isFixed = dojo.hasClass(tabNavBar, "tabNavFixed");
           if (!isFixed) {
         	  // fixed menu will be enabled soon which affects the vertical spacing
         	  offset = document.querySelector('.tabNavBar') == null ?  -240 : -260;
           } else {
         	  offset = -95;
           }
       }
 	  
 	  return offset;
   },
   
   isFixedMenuNeeded: function(additionalOffset) {

 	  if (this.fixedMenuDisabled || this.isCKEditorOpen()) {
 		  return false;
 	  }
       var tabNavBar = dojo.query(".tabNavBar")[0];
       if (!tabNavBar) {
     	  return false;
       }
       var tabNavBarRect = tabNavBar.getBoundingClientRect();
       var viewport = dojo.window.getBox();
       var scrollStart = viewport.t + tabNavBarRect.top;
       
       if (!additionalOffset) {
     	  additionalOffset = 0;
       }
          
 	  var scrollTop = dojo.docScroll().y + additionalOffset;
 	  return (scrollTop >= scrollStart + 10);
   }

};

/**
 * navTabPanel is an extension of an aria.TabPanel and so has
 * built in support for accessibility and keyboard navigation.
 *
 * @class   lconn.communities.bizCard.core.navTabPanel
 * @extends ic-core.aria.TabPanel
 */
dojo.provide("lconn.communities.bizCard.core.navTabPanel");
dojo.require("lconn.core.aria.TabPanel");
dojo.declare("lconn.communities.bizCard.core.navTabPanel", lconn.core.aria.TabPanel, {
   
   // Class to indicate widget selection
   selectedWidgetClass : 'lotusSelected',
      
   // Current selections
   selIdx : 0,
   
   // Tab Content Panel
   panel : null,

   // Scrolling limt
   _scrollLeftLimit: 0,

   /**
    * navTabPanel constructor
    */
   constructor : function() {
      // Call base class
      this.inherited(arguments);
      this.cycle = true;

	  // Pick up selection if available
      if (arguments[1].selIdx) {
	  	this.selIdx = arguments[1].selIdx;
      }

      // Pick up tab panel if available
	  if (arguments[1].panel) {
	 	this.panel = arguments[1].panel;
      }

      // Initialize menu array
      dojo.forEach(this.allItems, function(menuEntry, ii) {
         dojo.removeClass(menuEntry,"lotusSelected");
         dojo.removeClass(menuEntry,"lotusBold");
         dojo.attr(menuEntry, {"tabindex":"-1","role":"tab","aria-selected":"false"});
         if (this.panel && menuEntry.id != "tabNavMoreBtn") {
         	dojo.attr(menuEntry, {"aria-controls": this.panel});
	 	 }
         menuEntry.removeAttribute("aria-pressed");
         var curlink = dojo.query("a", menuEntry)[0];
         dojo.attr(curlink, {"tabindex":"-1"});
      }, this);

      // Mark the current widget as selected
      this._selectWidgetItem(this.selIdx, false, this.selectedWidgetClass);
   },

   /**
    * Activates an item by firing a click event
    */
   _activate : function(item, forceLink) {   
      return this.inherited(arguments);
   },

   /**
    * Selects a particular tab and optionally gives
    * it focus
    *
    * @param si: the item to select
    * @param bSkipFocus: does not give focus if true
    */
   _selectItem : function(si, bSkipFocus) {
      
      // Set default behavior
      if (typeof bSkipFocus === 'undefined') {
         bSkipFocus = false;
      }
      
      // Set selection
      this._setItemVisuals();
      this.inherited(arguments);
      
      // Optionally set focus
      if (!bSkipFocus) {
         this.allItems[this.selIdx].focus();
      }
   },
   
   /**
    * Selects a particular widget and optionally gives
    * it focus
    *
    * @param si: the item to select
    * @param bSkipFocus: does not give focus if true
    * @param selectionStyle
    */
   _selectWidgetItem : function(si, bSkipFocus, selectionStyle) {

      // Set default behavior
      if (typeof bSkipFocus === 'undefined') {
         bSkipFocus = false;
      }
      if (typeof selectionStyle === 'undefined') {
         selectionStyle = this.selectedWidgetClass;
      }

      // Set selection
      this._setItemVisuals(selectionStyle);
      this.inherited(arguments);

      if (!bSkipFocus) {

         // Selected entry
		 var selEntry = this.allItems[this.selIdx];

         setTimeout(function(){

			// Set focus after page settles
			if (selEntry) {
		 		selEntry.focus();
			}

			// Set focus on More button if selection hidden
 		  	var tabMenu = dojo.byId("tabNavContainer");
 		  	var menuArray = dojo.query("li", tabMenu);
 		  	dojo.forEach(menuArray, function(menuEntry, ii) {
 				if (dojo.hasClass(menuEntry, "lotusHidden") && dojo.hasClass(menuEntry, "lotusSelected")) {
 					var tabNavMoreBtn = dojo.byId("tabNavMoreBtn");
 					if (tabNavMoreBtn) {
 						dojo.addClass(tabNavMoreBtn, "lotusSelected");
 						dojo.attr(tabNavMoreBtn, {"tabindex":"0","aria-selected":"true"});
 						tabNavMoreBtn.focus();
 					}
 				}
 		  	});
 		}, 500);
      }
   },

   /**
    * Change a menu node to appear selected
    *
    * @param selectionStyle
    */
   _setItemVisuals : function(selectionStyle) {
      var menuEntry = this.allItems[this.selIdx];
      
      // Clear current selection
      dojo.forEach(this.allItems, function(menuEntry, ii) { 
         dojo.attr(menuEntry, {"tabindex":"-1","role":"tab","aria-selected":"false"});
         if (typeof selectionStyle != 'undefined') {
            dojo.removeClass(menuEntry, selectionStyle);
         }
               
      });   

      // Set new selection
      dojo.attr(menuEntry, {"tabindex":"0","role":"tab","aria-selected":"true"});
      if (typeof selectionStyle != 'undefined') {
         dojo.addClass(menuEntry, selectionStyle);
      }
   },

   /**
    * Update the selected index to match selected entry
    */
   _updateSelIdx: function() {

      // Find current selection
      dojo.forEach(this.allItems, function(menuEntry, ii) {
         if (dojo.hasClass(menuEntry, "lotusSelected")) {
            this.selIdx = ii;
         }
      }, this);
   },

   _onItemClick: function(e) {
	  this._updateSelIdx();
      var index = this.selIdx;
      var tabs = this.allItems;
      tabs[index].blur();
      setTimeout(function(){
          tabs[index].focus();
      }, 1000);
   }
});
