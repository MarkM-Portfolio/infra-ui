/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.auth");

dojo.require("dojo.string");
dojo.require("dojo.DeferredList");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.oneui.util.Url");
dojo.require("com.ibm.oneui.util.proxy");

(function(window, document) {
   var SERVICE_NAME = dojo.getObject('ibmConfig.serviceName');
   var xhrLogoutTimeOut = 5000, // seconds for timeout of xhr logout
   loginHandlers = [], logoutHandlers = [], loginUrls = {
      defaultApp : "${appSvcUrl}/core/login_redirect?redirect=${redirectUrl}",
      activities : "${appSvcUrl}/service/authredirect.jsp",
      blogs : "${appSvcUrl}/roller-ui/login-redirect.jsp?redirect=${redirectUrl}",
      communities : "${appSvcUrl}/service/html/login",
      dogear : "${appSvcUrl}/loginredirect?redirect=${redirectUrl}",
      files : "${appSvcUrl}/form/login_redirect?redirect=${redirectUrl}",
      forums : "${appSvcUrl}/auth/redirect",
      homepage : "${appSvcUrl}/web/login_redirect?redirectUrl=${redirectUrl}",
      metrics : "${appSvcUrl}/login_redirect?redirect=${redirectUrl}",
      moderation : "${appSvcUrl}/login_redirect?redirect=${redirectUrl}",
      news : "${appSvcUrl}/login_redirect?redirect=${redirectUrl}",
      oauth : "${appSvcUrl}/login_redirect?redirect=${redirectUrl}",
      profiles : "${appSvcUrl}/auth/loginRedirect.do",
      search : "${appSvcUrl}/login_redirect?redirect=${redirectUrl}",
      wikis : "${appSvcUrl}/form/login_redirect?redirect=${redirectUrl}",
      webresources : "${appSvcUrl}/login_redirect?redirect=${redirectUrl}"
   }, authCheckCallback = null, isAuthenticated = null, user = null;

   function _setLoginCookies(appName, opt) {
      switch (appName) {
         case "activities":
            _cookie("ActivitiesRedirect", opt.redirectUrl);
            break;
         case "communities":
            _cookie("CommunitiesReqURL", opt.redirectUrl);
            break;
         case "forums":
            _cookie("ForumReqURL", opt.redirectUrl);
            break;
         case "homepage":
            _cookie("ConnectionsHomepageActivityStreamState", opt.redirectUrl);
            break;
         case "profiles":
            _cookie("ProfilesReqURL", opt.redirectUrl);
            break;
      }
   }

   function _login() {
      var dfdList = [];
      if (!lconn.core.auth.isAuthenticated()) {
         dojo.forEach(loginHandlers, function(handler, i) {
            var dfd = handler();
            if (dfd && dfd instanceof dojo.Deferred)
               dfdList.push(dfd);
         });
      }
      return dfdList;
   }

   function _logout(ignoreAuthCheck) {
      var dfdList = [];
      if (ignoreAuthCheck || lconn.core.auth.isAuthenticated()) {
         dojo.forEach(logoutHandlers, function(handler, i) {
            var dfd = handler();
            if (dfd && dfd instanceof dojo.Deferred)
               dfdList.push(dfd);
         });
      }
      return dfdList;
   }

   function _cookie(key, value) {
      // can not use dojo.cookie as it encodes url then breaks redirection
      document.cookie = key + "=" + value + "; path=/" + ((!!lconn.core.config.forceConfidentialCommunications)||(lconn.core.config.properties.DeploymentModel=='SmartCloud') ? "; secure":"");
   }

   function _getServiceName() {
      // get own app name from config
      if (SERVICE_NAME)
         return SERVICE_NAME;
      // fall back, get app name from stylesheet link
      var baseLink = dojo.byId("lotusBaseStylesheet");
      if (baseLink) {
         var appName = dojo.attr(baseLink, "appName");
         if (appName)
            return appName;
      }
      // Defaults to News which is a mandatory component
      return 'news';
   }

   // Get base url for current component.
   function _getBaseUrl(secure) {
      var baseUrl = window.location.href;
      var serviceName = _getServiceName();
      var service = lconn.core.config.services[serviceName];
      if (service)
         baseUrl = (service.secureEnabled && secure !== false) ? service.secureUrl : service.url;

      var redirectUrl = lconn.core.url.parse(baseUrl);

      return redirectUrl.toString();
   }

   function _getShareUser() {
      var user = null, userInfo = dojo.byId("userInfo");
      if (userInfo) {
         user = dojo.fromJson(userInfo.innerText);
      }
      return user;
   }

   /**
    * Authentication helper that can perform login and logout with optional
    * redirection, and manages post login and logout handlers for third party
    * service cookie cleanup. This helper is currently used to perform
    * authentication by Connections Mail, and to cleanup Cognos cookies in
    * Metrics.
    * 
    * @namespace lconn.core.auth
    */
   lconn.core.auth = /** @lends lconn.core.auth */
   {
      /**
       * @param {Function}
       *           handler Login handler function
       */
      addLoginHandler : function(handler) {
         loginHandlers.push(handler);
      },

      /**
       * @param {Function}
       *           handler Logout handler function
       */
      addLogoutHandler : function(handler) {
         logoutHandlers.push(handler);
      },

      /**
       * Performs a login. Components can force redirect to given url. If no url
       * is given, redirect is generated from window.location
       * 
       * @param {String}
       *           url The redirect URL
       */
      login : function(url) {
         var dfdList = new dojo.DeferredList(_login(), false);
         var loginUrl = url || lconn.core.auth.getLoginUrl();
         dfdList.addBoth(function(result) {
            window.location.href = loginUrl;
         });
      },

      /**
       * Performs a logout and login. Used by Connections Mail when it needs to
       * force logout in case clock differences between Domino & Connections
       * servers
       * 
       * @param {String}
       *           url The redirect URL
       */
      logoutAndLogin : function(url) {
         _logout(true); // invoke loguout handlers
         var logoutUrl = lconn.core.auth.getLogoutUrl();
         // force logout
         dojo.xhrPost({
            url : logoutUrl,
            handleAs : "text",
            handle : function() {
               lconn.core.auth.login(url); // then login
            },
            secure : false,
            timeout : xhrLogoutTimeOut
         /* don't dawdle forever */
         });
      },

      /**
       * Performs a logout. Callers can request a redirect to an arbitrary URL.
       * If no url is given, redirect is generated from current service
       * 
       * @param {String}
       *           [url] The redirect URL
       */
      logout : function(url) {
         var dfdList = new dojo.DeferredList(_logout(), false);
         var logoutUrl = url || lconn.core.auth.getLogoutUrl('/');
         dfdList.addBoth(function(result) {
            window.location.href = logoutUrl;
         });
      },

      /**
       * @typedef UserType
       * @property {String} displayName Display name of this user
       * @property {String} id External id of this user
       * @property {String} [email] Email address of this user
       * @property {String} [hash] Hashed email address of this user
       * @property {Boolean} isExternal Informational message type
       * @property {String} [orgId] Id of this user's organization
       * @property {String} [orgName] Name of this user's organization
       */

      /**
       * Returns the current user, or null if the user is anonymous
       * 
       * @param {String}
       *           [serviceName] The service name. If omitted, will be looked up
       *           using <code>ibmConfig.serviceName</code>
       * @returns {UserType} A user object with well defined properties
       */
      getUser : function(serviceName) {
         // Keep in mind there could be a user object in the scope and the auth
         // check callback returns false
         if (!this.isAuthenticated())
            return null;
         serviceName = serviceName || SERVICE_NAME;
         if (!user || dojo.config.isDebug) {
            user = null;
            switch (serviceName) {
               case 'activities':
                  if (dojo.exists('_oa_current_user'))
                     user = {
                        displayName : _oa_current_user.name,
                        id : _oa_current_user.userid,
                        email : _oa_current_user.email,
                        isExternal : _oa_current_user.isExternal,
                        _native : _oa_current_user
                     };
                  break;
               case 'blogs':
               case 'dogear':
                  if (dojo.exists('currentLogin'))
                     user = {
                        displayName : currentLogin.name,
                        id : currentLogin.extid,
                        email : currentLogin.email,
                        isExternal : currentLogin.isExternal,
                        _native : currentLogin
                     };
                  break;
               case 'communities':
                  var userObj;
                  if (dojo.exists("communityActionData")) {
                     userObj = communityActionData;
                  }
                  else if (dojo.exists("lconn.communities.bizCard.core.community")) {
                     userObj = lconn.communities.bizCard.core.community;
                  }
                  if (userObj)
                     user = {
                        displayName : userObj.userName,
                        id : userObj.userUuid,
                        email : userObj.userEmail,
                        isExternal : userObj.userIsExternal,
                        _native : userObj
                     };
                  else if (dojo.exists('lconnCurrentUser')) {
                     user = dojo.clone(lconnCurrentUser);
                     user._native = lconnCurrentUser;
                  }
                  break;
               case 'forums':
                  if (dojo.exists('forumsUser'))
                     user = {
                        displayName : forumsUser
                     };
                  if (dojo.exists('forumsUserId')) {
                     user = user || {};
                     user.id = forumsUserId;
                  }
                  if (dojo.exists('forumsUserExternal')) {
                     user = user || {};
                     user.isExternal = forumsUserExternal == 1;
                  }
                  break;
               case 'homepage':
               case 'news':
                  if (dojo.exists('lconn.homepage.userName'))
                     user = {
                        displayName : lconn.homepage.userName
                     };
                  if (dojo.exists('lconn.homepage.userEmail')) {
                     user = user || {};
                     user.email = lconn.homepage.userEmail;
                  }
                  if (dojo.exists('lconn.homepage.userExtId')) {
                     user = user || {};
                     user.id = lconn.homepage.userExtId;
                  }
                  if (dojo.exists('lconn.homepage.userIsExternal')) {
                     user = user || {};
                     user.isExternal = lconn.homepage.userIsExternal;
                  }
                  break;
               case 'profiles':
                  if (dojo.exists('profilesData.loggedInUser'))
                     user = {
                        displayName : profilesData.loggedInUser.displayName,
                        id : profilesData.loggedInUser.userid,
                        email : profilesData.loggedInUser.email,
                        isExternal : profilesData.loggedInUser.isExternal,
                        _native : profilesData.loggedInUser
                     };
                  break;
               case 'files':
               case 'wikis':
               case 'metrics':
               case 'moderation':
                  // Files and Wikis share the same user object
                  // Metrics and Moderation have an identical user object
                  if (dojo.exists('pe.authenticatedUser')) {
                     user = {
                        displayName : pe.authenticatedUser.name,
                        id : pe.authenticatedUser.id,
                        email : pe.authenticatedUser.email,
                        isExternal : pe.authenticatedUser.isExternal,
                        _native : pe.authenticatedUser
                     };
                  }
                  else {
                     var shareUser = _getShareUser();
                     if (shareUser) {
                        user = {
                           displayName : shareUser.name,
                           email : shareUser.email,
                           id : shareUser.id,
                           isExternal : shareUser.isExternal,
                           _native : shareUser
                        };
                     }
                  }
                  break;
               case 'search':
                  if (dojo.exists('lconnCurrentUser')) {
                     user = dojo.clone(lconnCurrentUser);
                     user._native = lconnCurrentUser;
                  }
                  break;
               default:
                  if (dojo.exists('currentViewer')) {
                     user = {
                        displayName : currentViewer.displayName,
                        id : currentViewer.id && currentViewer.id.substring(currentViewer.id.lastIndexOf(':') + 1),
                        email : (dojo.filter(currentViewer.emails, function(e) {
                           return e.primary;
                        })[0] || {}).value,
                        isExternal : dojo.getObject("appData.connections.isExternal", false, currentViewer) === "true",
                        orgId : dojo.getObject("appData.connections.organizationId", false, currentViewer)
                     };
                     user._native = currentViewer;
                  }
                  else if (dojo.exists('icUser')) {
                     user = dojo.clone(icUser);
                     user._native = icUser;
                  }
            }
         }
         return user;
      },

      /**
       * Checks whether the user is authenticated. If the component has set an
       * authentication check callback, that is invoked and its return value
       * returned. Otherwise, the code tries its best to detect signals of user
       * authentication.
       * 
       * @returns true if the user is authenticated
       */
      isAuthenticated : function() {
         if (dojo.isFunction(authCheckCallback))
            return authCheckCallback();
         /*
          * The following optimization makes the assumption that the page is
          * reloaded when the user logs in or logs out.
          */
         if (isAuthenticated === null) {
            // Tries its best at detecting signals of authentication
            switch (SERVICE_NAME) {
               case "files":
               case "wikis":
                  isAuthenticated = dojo.getObject("pe.authenticatedUser");
                  if (!isAuthenticated) {
                     isAuthenticated = _getShareUser() !== null;
                  }
                  if (isAuthenticated) {
                     break;
                  }
                  // TODO: other components
               default:
                  // FIXME: do not uncomment
                  // This causes authentication redirects in some apps
                  // if (lconn.core.config.services.deploymentConfig) {
                  // dojo.xhrGet({
                  // url:
                  // com.ibm.oneui.util.proxy(lconn.core.url.getServiceUrl(lconn.core.config.services.deploymentConfig))
                  // + '/core/identity',
                  // handleAs: 'json',
                  // failOk: true, // Tolerate 404s
                  // load: function(response, ioArgs) {
                  // isAuthenticated = true;
                  // user = {
                  // displayName: response.displayName,
                  // id: response.id,
                  // email: response.emails[0].value
                  // };
                  // }
                  // });
                  // }
                  // Falls back to user name in banner
                  var userPhoto = dojo.query("#headerUserName img")[0];
                  var temp = userPhoto && userPhoto.alt !== "";
                  //Defect 167286
                  if(temp === undefined)
                	  isAuthenticated = null;
                  else
                	  isAuthenticated = temp;
            }
         }
         return isAuthenticated;
      },

      /**
       * Allows the caller to define a callback that returns true when the user
       * is authenticated. Needed to provide better reliability until common
       * authentication detection API is available.
       * 
       * @param {Function}
       *           [cb] a function that returns true when the user is
       *           authenticated
       */
      setAuthCheck : function(cb) {
         if (dojo.isFunction(cb))
            authCheckCallback = cb;
      },

      /**
       * Returns the logout URL with an optional redirect URL
       * 
       * @param {String}
       *           [exitPage] Post logout redirect URL
       * @returns the logout URL with an optional redirect URL
       */
      getLogoutUrl : function(/* String */exitPage) {
         var redirectUrl = _getBaseUrl(com.ibm.oneui.util.Url.secure);

         var logoutExitPage = exitPage || '/';
         redirectUrl = redirectUrl + '/ibm_security_logout?logoutExitPage=' + encodeURIComponent(logoutExitPage);
         return redirectUrl;
      },

      /**
       * Returns the login URL for the current component, with an optional
       * redirect URL
       * 
       * @param {String}
       *           [url] Post login redirect URL
       * @returns the login URL with an optional redirect URL
       */
      getLoginUrl : function(url) {
         url = url || window.location.href;

         // get current app name
         var appName = _getServiceName("default");

         var u = lconn.core.url.parse(url);
         if (u.fragment) {
            switch (appName) {
               case "activities":
                  u.fragment = u.fragment.replace(/,/g, "%2C");
                  break;
               case "files":
               case "metrics":
               case "moderation":
               case "wikis":
                  u.path += u.fragment.indexOf('!') === 0 ? u.fragment.substring(1) : u.fragment;
                  delete u.fragment;
            }
         }

         // prepare login params for current app
         var appSvcUrl = lconn.core.config.services[appName].secureUrl;
         if (appSvcUrl.charAt(appSvcUrl.length - 1) == "/")
            appSvcUrl = appSvcUrl.substring(0, appSvcUrl.length - 1);
         var opt = {
            appSvcUrl : appSvcUrl,
            redirectUrl : u.toCanonicalString(),
            hashSegment : u.fragment || ""
         };

         // set cookies
         _setLoginCookies(appName, opt);

         opt.redirectUrl = encodeURIComponent(opt.redirectUrl);

         // get login url
         return dojo.string.substitute(loginUrls[appName], opt);
      }
   };

   /**
    * Provides an alias to deprecated misspelled method name already in use.
    * 
    * @deprecated
    * @function logoutAndlogin
    * @memberof lconn.core.auth
    * @param {string}
    *           url The redirect URL
    * @see {@link lconn.core.auth.logoutAndLogin}
    */
   lconn.core.auth.logoutAndlogin = lconn.core.auth.logoutAndLogin;

}(window, document));
