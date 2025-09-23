/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/request",
      "dojo/_base/lang",
      "dojo/cookie",
      "dojo/dom-class",
      "dojo/dom-style",
      "dojo/_base/array",
      "dojo/dom",
      "dojo/dom-attr",
      "dijit/_base/wai",
      //"ic-mail/gadget/NavigationHandler",
      "ic-as/notification/NotificationCenter",
      "ic-ui/util/proxy",
      "../auth",
      "../config",
      "../config/services",
      "jazz/inverted!ic-core/header",
      "../url",
      "../widget/MobileAppBanner"
],
   function(dojo, request, lang, cookie, domClass, domStyle, array, dom, domAttr, wai, /* NavigationHandler, */ NotificationCenter, proxy, auth, config, services, header, url, MobileAppBanner) {
	  //var NavigationHandler = lang.getObject("com.ibm.lconn.socialmail.gadget.NavigationHandler");
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

      var userRoleSvcUrl = proxy(url.getServiceUrl(services.webresources).toString()) + "/web/user/roles?", sessionCookies = config.sessionCookies, appBanners = {
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
       * @namespace ic-core.header.apps
       * @author Ying BJ Mo <moyingbj@cn.ibm.com>
       */
      var apps = lang.mixin(lang.getObject("lconn.core.header.apps", true), /** @lends ic-core.header.apps */
      {
         /**
          * Updates the banner by conditionally showing or hiding elements based
          * on the current user's JEE roles.
          */
         updateBannerByRoles : function() {
            var pending = [];

            for ( var role in appBanners)
               if (!this.updateBanner(appBanners[role], cookie("ROLE_" + role), role))
                  pending.push(role);

            if (pending.length > 0)
               request(userRoleSvcUrl + dojo.objectToQuery({
                  role : pending
               }), {
                  method : "GET",
                  handleAs : "json",
                  timeout : 10000
               }).then(lang.hitch(this, function(auths) {
                  for ( var role in auths)
                     this.updateBanner(appBanners[role], auths[role], role);
               }));

            // Adds the mobile app banner
            if (MobileAppBanner.isEnabled())
               new MobileAppBanner();
         },

         /**
          * Updates the banner by conditionally showing or hiding elements based
          * on the current user's JEE roles.
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

            if (!lang.isArray(ids))
               ids = [ ids
               ];

            var nodes = array.map(ids, function(id) {
               return dom.byId(id);
            });
            nodes = array.filter(nodes, function(node) {
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

                array.forEach(nodes, function(node) {
                  node.style.display = "";
               });
            }

            return true;
         },

         /**
          * Initialize the NotificationCenter with appropriate landmarks,
          * allowing to bootstrap and start listening for updates
          */
         initNotificationCenter : function() {
            var ncNode = dom.byId("lotusBannerNotifications");
            if (ncNode && (domStyle.get(ncNode, "display") != "none")) {
               NotificationCenter.getInstance(ncNode, null, 'inlineOnPrem');
            }
         },

         /**
          * Moves the logout link from the banner to the dropdown menu.
          */
         updateUserNameMenu : function() {
            var logoutLink = dom.byId("logoutLink");
            var logoutContainer = dom.byId("logoutContainer");
            if (logoutLink && logoutContainer) {
               logoutContainer.appendChild(logoutLink);
               domStyle.set(logoutLink, "display", "block");
               var logoutLi = dom.byId("logoutLi");
               if (logoutLi)
                  domStyle.set(logoutLi, "display", "none");
            }
         },

         /**
          * Login event handler. Currently, clears role cookies.
          */
         onLogin : function() {
            for ( var role in appBanners)
               cookie("ROLE_" + role, null, {
                  expires : -1,
                  path : "/"
               });
         },

         /**
          * Logout event handler. Currently, clears session cookies.
          */
         onLogout : function() {
            array.forEach(sessionCookies, function(cookieID) {
               cookie(cookieID, null, {
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
            var il = dom.byId("loginLabel"), ol = dom.byId("logoutLabel");
            if (il && ol) {
               wai.setWaiRole(ol, "region");
               wai.removeWaiRole(il);
            }
         },

         /**
          * Sets the selected application in the banner
          * 
          * @param {String}
          *           app The name of the app to select e.g. 'homepage'
          */
         setSelected : function(app) {
            array.forEach(APP_MENU_IDS, function(menu_id) {
               var menu = dom.byId(menu_id);
               if (menu) {
                  domClass.remove(menu, "lotusSelected");
               }
            });
            array.forEach(menuIdsFor(app), function(menu_id) {
               var menu = dom.byId(menu_id);
               if (menu) {
                  domClass.add(menu, "lotusSelected");
               }
            });
         }
      });

      /**
       * Constants for banner ids
       * 
       * @property BANNER_IDS
       * @memberof ic-core.header.apps
       */
      apps.BANNER_IDS = {
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

      require([ 'dojo/domReady!'
      ], function() {
         var userNode = dom.byId("headerUserName");
         var hasUsername = auth.isAuthenticated();
         if (userNode) {
            // FIXME: don't use the global namespace
            domAttr.set(userNode, "onmenuloaded", "lconn.core.header.apps.updateUserNameMenu");
         }
         if (!hasUsername) {
            auth.addLoginHandler(apps.onLogin);
         }
         else {
            auth.addLogoutHandler(apps.onLogout);
            //ensure we only ever initialize notification center for authenticated users (inc cometd connection)
            lconn.core.header.apps.initNotificationCenter();
         }
         var searchButton = dojo.byId("lotusSearchButton");
         // var searchWidget = new SearchPaneManager({}, searchButton); AMD
         // version not ready yet.
      });

      return apps;
   });
