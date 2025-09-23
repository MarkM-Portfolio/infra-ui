/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.header.apps");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");
dojo.require("lconn.core.widget.MobileAppBanner");
dojo.require("dojo.cookie");
dojo.require("dijit._base.wai");
dojo.require("com.ibm.oneui.util.proxy");
dojo.require("ic-as.notification.NotificationCenter");

(function() {

   var BANNER_APPS = "lotusBannerApps", BANNER_HOMEPAGE = "lotusBannerHomepage", BANNER_FILES_EXTERNAL = "lotusBannerFilesExternal", BANNER_COMMUNITIES = "lotusBannerCommunities", BANNER_COMMUNITIES_EXTERNAL = "lotusBannerCommunitiesExternal", BANNER_MODERATION = "lotusBannerModeration", BANNER_PROFILES = "lotusBannerProfiles", BANNER_HEADER_METRICS = "lotusBannerHeaderMetrics", BANNER_FOOTER_METRICS = "lotusBannerFooterMetrics", BANNER_MAIL = "lotusBannerMail", BANNER_CALENDAR = "lotusBannerCalendar";

   function menuIdsFor(app) {
      switch (app) {
         case 'homepage':
            return [ BANNER_HOMEPAGE
            ];
         case 'files':
            return [
                  BANNER_FILES_EXTERNAL,
                  BANNER_APPS
            ];
         case 'communities':
            return [
                  BANNER_COMMUNITIES_EXTERNAL,
                  BANNER_COMMUNITIES
            ];
         case 'profiles':
            return [ BANNER_PROFILES
            ];
         case 'metrics':
            return [ BANNER_HEADER_METRICS
            ];
         case 'moderation':
            return [ BANNER_MODERATION
            ];
         default:
            return [ BANNER_APPS
            ];
      }
   }

   var userRoleSvcUrl = com.ibm.oneui.util.proxy(lconn.core.url.getServiceUrl(lconn.core.config.services.webresources).toString()) + "/web/user/roles?", sessionCookies = lconn.core.config.sessionCookies, appBanners = {
      "global-moderator" : [ BANNER_MODERATION
      ],
      "metrics-report-run" : [
            BANNER_HEADER_METRICS,
            BANNER_FOOTER_METRICS
      ],
      "admin" : [
            BANNER_HEADER_METRICS,
            BANNER_FOOTER_METRICS
      ],
      "mail-user" : [
            BANNER_FOOTER_METRICS,
            BANNER_CALENDAR,
            BANNER_MAIL
      ]
   };

   var APP_MENU_IDS = [
         BANNER_HOMEPAGE,
         BANNER_COMMUNITIES,
         BANNER_PROFILES,
         BANNER_APPS,
         BANNER_MODERATION,
         BANNER_HEADER_METRICS
   ];
   /**
    * Helper for application menus in the Connections header
    * 
    * @namespace lconn.core.header.apps
    * @author Ying BJ Mo <moyingbj@cn.ibm.com>
    */
   lconn.core.header.apps = /** @lends lconn.core.header.apps */
   {
      /**
       * Updates the banner by conditionally showing or hiding elements based on
       * the current user's JEE roles.
       */
      updateBannerByRoles : function() {
         var pending = [];

         for ( var role in appBanners)
            if (!this.updateBanner(appBanners[role], dojo.cookie("ROLE_" + role), role))
               pending.push(role);

         if (pending.length > 0)
            dojo.xhrGet({
               url : userRoleSvcUrl + dojo.objectToQuery({
                  role : pending
               }),
               handleAs : "json",
               load : dojo.hitch(this, function(auths) {
                  for ( var role in auths)
                     this.updateBanner(appBanners[role], auths[role], role);
               }),
               timeout : 10000
            });

         // Adds the mobile app banner
         if (lconn.core.widget.MobileAppBanner.isEnabled())
            new lconn.core.widget.MobileAppBanner();
      },

      /**
       * Updates the banner by conditionally showing or hiding elements based on
       * the current user's JEE roles.
       * 
       * @param {Array|String}
       *           ids id or array of ids of nodes to process.
       * @param {Boolean}
       *           authorized
       * @param {String}
       *           role
       */
      updateBanner : function(ids, authorized, role) {
         // Do nothing if unauthorized, otherwise, enable banner nodes
         if ((authorized == false) || (authorized == "false"))
            return true;

         if (!dojo.isArray(ids))
            ids = [ ids
            ];

         var nodes = dojo.map(ids, function(id) {
            return dojo.byId(id);
         });
         nodes = dojo.filter(nodes, function(node) {
            return node != undefined;
         });

         // Will get authorization data from server
         if (nodes.length > 0 && authorized == undefined)
            return false;

         if ((authorized == true) || (authorized == "true")) {
            // Defect 89756: specific to mail user
            // Only load mail related code for provisioned user
            // when Connections Mail is enabled
            if (role == "mail-user" && lconn.core.config.services.connectionsmail) {
               dojo.require("com.ibm.lconn.socialmail.gadget.NavigationHandler");
               new com.ibm.lconn.socialmail.gadget.NavigationHandler();
            }                        

            dojo.forEach(nodes, function(node) {
               node.style.display = "";
            });
         }

         return true;
      },
      
      /**
       * Initialize the NotificationCenter with appropriate landmarks, allowing
	   * to bootstrap and start listening for updates
       */
       initNotificationCenter: function() {
          var ncNode = dojo.byId("lotusBannerNotifications");
          if(typeof ui !== 'undefined' && ui._check_ui_enabled())
          {
              var ncNode = "notifications_action";
              
              var timer = setInterval(function()
              {
                  if(document.getElementById(ncNode) !== null)
                  {
                      clearInterval(timer);
                      if(ncNode && (dojo.getStyle(ncNode, "display") != "none"))
                      {
                          var NotificationCenter = dojo.getObject("ic-as.notification.NotificationCenter");

                          try{
                              NotificationCenter.getInstance(ncNode,  null, 'inlineOnPrem');
                          }catch(e){}
                      }
                  }
              },250);
          }
          else
          {
              if(ncNode && (dojo.getStyle(ncNode, "display") != "none")) {
                  var NotificationCenter = dojo.getObject("ic-as.notification.NotificationCenter");

                  try{
                      NotificationCenter.getInstance(ncNode,  null, 'inlineOnPrem');
                  }catch(e){}
              }
          }
       },

      /**
       * Moves the logout link from the banner to the dropdown menu.
       */
      updateUserNameMenu : function() {
         var logoutLink = dojo.byId("logoutLink");
         var logoutContainer = dojo.byId("logoutContainer");
         if (logoutLink && logoutContainer) {
            logoutContainer.appendChild(logoutLink);
            dojo.style(logoutLink, "display", "block");
            var logoutLi = dojo.byId("logoutLi");
            if (logoutLi)
               dojo.style(logoutLi, "display", "none");
         }
      },

      /**
       * Login event handler. Currently, clears role cookies.
       */
      onLogin : function() {
         for ( var role in appBanners)
            dojo.cookie("ROLE_" + role, null, {
               expires : -1,
               path : "/"
            });
      },

      /**
       * Logout event handler. Currently, clears session cookies.
       */
      onLogout : function() {
         dojo.forEach(sessionCookies, function(cookieID) {
            dojo.cookie(cookieID, null, {
               expires : -1,
               path : "/"
            });
         });
      },

      /**
       * Updates the login and logout links to move the region role from the
       * login link to logout link for a11y.
       */
      updateLoginRegion : function() {
         var il = dojo.byId("loginLabel"), ol = dojo.byId("logoutLabel");
         if (il && ol) {
            dijit.setWaiRole(ol, "region");
            dijit.removeWaiRole(il);
         }
      },

      /**
       * Sets the selected application in the banner
       * 
       * @param {String}
       *           app The name of the app to select e.g. 'homepage'
       */
      setSelected : function(app) {
         dojo.forEach(APP_MENU_IDS, function(menu_id) {
            var menu = dojo.byId(menu_id);
            if (menu) {
               dojo.removeClass(menu, "lotusSelected");
            }
         });
         dojo.forEach(menuIdsFor(app), function(menu_id) {
            var menu = dojo.byId(menu_id);
            if (menu) {
               dojo.addClass(menu, "lotusSelected");
            }
         });
      }
   };

   /**
    * Constants for banner ids
    * 
    * @property BANNER_IDS
    * @memberof lconn.core.header.apps
    */
   lconn.core.header.apps.BANNER_IDS = {
      BANNER_APPS : BANNER_APPS,
      BANNER_HOMEPAGE : BANNER_HOMEPAGE,
      BANNER_FILES_EXTERNAL : BANNER_FILES_EXTERNAL,
      BANNER_COMMUNITIES : BANNER_COMMUNITIES,
      BANNER_COMMUNITIES_EXTERNAL : BANNER_COMMUNITIES_EXTERNAL,
      BANNER_MODERATION : BANNER_MODERATION,
      BANNER_PROFILES : BANNER_PROFILES,
      BANNER_HEADER_METRICS : BANNER_HEADER_METRICS,
      BANNER_FOOTER_METRICS : BANNER_FOOTER_METRICS,
      BANNER_MAIL : BANNER_MAIL,
      BANNER_CALENDAR : BANNER_CALENDAR
   };

})();

dojo.addOnLoad(function() {
   var userNode = dojo.byId("headerUserName");
   var hasUsername = lconn.core.auth.isAuthenticated();
   if (userNode)
      dojo.attr(userNode, "onmenuloaded", "lconn.core.header.apps.updateUserNameMenu");
   if (!hasUsername){      
      lconn.core.auth.addLoginHandler(lconn.core.header.apps.onLogin);     
   }      
   else{
      //ensure we only ever initialize notification center for authenticated users (inc cometd connection)
      lconn.core.header.apps.initNotificationCenter();
      lconn.core.auth.addLogoutHandler(lconn.core.header.apps.onLogout);
   }

});
