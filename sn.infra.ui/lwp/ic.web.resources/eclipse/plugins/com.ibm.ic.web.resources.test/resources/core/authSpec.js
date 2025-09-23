/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/array",
      "dojo/_base/lang",
      "dojo/dom-construct",
      "dojo/json",
      "ic-core/auth"
], function(dojo, array, lang, domConstruct, JSON, auth) {

   /**
    * Core specs
    * 
    * @namespace ic-test.core
    */

   /**
    * Jasmine spec for core.auth.
    * 
    * @module ic-test.core.authSpec
    */
   var DISPLAY_NAME = 'Amy Jones1', USER_ID = '2bcb7566-785511de-8074e703-179b6183', ORG_ID = '00000000-0000-0000-0000-000000000000';
   function cp(c) {
      return c.substring(0, 1).toUpperCase() + c.substring(1);
   }
   function gc() {
      return [
            "activities",
            "blogs",
            "dogear",
            "communities",
            "files",
            "forums",
            "homepage",
            "metrics",
            "moderation",
            "news",
            "profiles",
            "wikis",
            "search",
            "oauth",
            "deploymentConfig",
            "cre"
      ];
   }
   function ec() {
      // External flag now widely supported
      return gc();
   }
   function oc() {
      // Organization data currently only supported in EE
      return [ "cre"
      ];
   }
   function su(c, ext) {
      switch (c) {
         case 'activities':
            lang.setObject('_oa_current_user', {
               name : DISPLAY_NAME,
               userid : USER_ID,
               isExternal : ext
            }, dojo.global);
            break;
         case 'blogs':
         case 'dogear':
            lang.setObject('currentLogin', {
               name : DISPLAY_NAME,
               extid : USER_ID,
               isExternal : ext
            });
            break;
         case 'communities':
            lang.setObject('communityActionData', {
               userName : DISPLAY_NAME,
               userUuid : USER_ID,
               userIsExternal : ext
            });
            break;
         case 'communitiesCatalog':
            lang.setObject('lconnCurrentUser', {
               displayName : DISPLAY_NAME,
               id : USER_ID,
               isExternal : ext
            });
            break;
         case 'forums':
            lang.setObject('forumsUser', DISPLAY_NAME);
            lang.setObject('forumsUserId', USER_ID);
            if (ext) {
               lang.setObject('forumsUserExternal', 1);
            }
            break;
         case 'cre':
            lang.setObject('currentViewer', {
               displayName : DISPLAY_NAME,
               id : 'urn:lsid:lconn.ibm.com:profiles.person:' + USER_ID,
               appData : {
                  connections : {
                     isExternal : ext ? "true" : "false",
                     organizationId : ORG_ID
                  }
               }
            });
            break;
         case 'homepage':
         case 'news':
            lang.setObject('lconn.homepage', {});
            lang.setObject('lconn.homepage.userName', DISPLAY_NAME);
            lang.setObject('lconn.homepage.userExtId', USER_ID);
            if (ext) {
               lang.setObject('lconn.homepage.userIsExternal', true);
            }
            break;
         case 'files':
         case 'wikis':
            domConstruct.create('div', {
               'class' : 'lotusHidden',
               innerText : JSON.stringify({
                  name : DISPLAY_NAME,
                  id : USER_ID,
                  isExternal : ext
               })
            }, document.body);
            lang.setObject('pe.authenticatedUser', {
               name : DISPLAY_NAME,
               id : USER_ID,
               isExternal : ext
            });
            break;
         case 'metrics':
         case 'moderation':
            lang.setObject('pe.authenticatedUser', {
               name : DISPLAY_NAME,
               id : USER_ID,
               isExternal : ext
            });
            break;
         case 'profiles':
            lang.setObject('profilesData.loggedInUser', {
               displayName : DISPLAY_NAME,
               userid : USER_ID,
               isExternal : ext
            });
            break;
         case 'search':
            lang.setObject('lconnCurrentUser', {
               id : USER_ID,
               displayName : DISPLAY_NAME,
               isExternal : ext
            });
            break;
         default:
            lang.setObject('icUser', {
               displayName : DISPLAY_NAME,
               id : USER_ID,
               isExternal : ext
            });
      }
   }

   function vs() {
      return [
            "_oa_current_user",
            "currentLogin",
            "currentViewer",
            "communityActionData",
            "forumsUser",
            "forumsUserId",
            "forumsUserExternal",
            "person",
            "pe.authenticatedUser",
            "lconn.homepage",
            "profilesData.loggedInUser",
            "icUser",
            "lconnCurrentUser"
      ];
   }

   function du() {
      array.forEach(vs(), function(v) {
         try {
            var p = v.split('.');
            if (p.length > 1) {
               if (lang.exists(v)) {
                  lang.setObject(p[0] + '.' + p[1], undefined);
               }
            }
            else {
               if (lang.exists(v)) {
                  lang.setObject(v, undefined);
               }
            }
         }
         catch (ignore) {
         }
      });
   }

   function fl(comp) {
      if (comp === 'communities') {
         return [
               comp,
               comp + 'Catalog'
         ];
      }
      return [ comp
      ];
   }

   describe("the interface of ic-core/auth", function() {
      it("implements the expected methods", function() {
         expect(auth.addLoginHandler).toEqual(jasmine.any(Function));
         expect(auth.addLogoutHandler).toEqual(jasmine.any(Function));
         expect(auth.login).toEqual(jasmine.any(Function));
         expect(auth.logout).toEqual(jasmine.any(Function));
         expect(auth.logoutAndLogin).toEqual(jasmine.any(Function));
         // Deprecated misspelled method
         expect(auth.logoutAndlogin).toEqual(auth.logoutAndLogin);
         expect(auth.isAuthenticated).toEqual(jasmine.any(Function));
         expect(auth.setAuthCheck).toEqual(jasmine.any(Function));
         expect(auth.getLoginUrl).toEqual(jasmine.any(Function));
         expect(auth.getLogoutUrl).toEqual(jasmine.any(Function));
         expect(auth.getUser).toEqual(jasmine.any(Function));
      });
   });
   // A describe() used to test a method
   describe("the method ic-core/auth.getUser()", function() {
      var _ibmConfig;
      beforeEach(function() {
         _ibmConfig = window.ibmConfig;
         window.ibmConfig = {};
         auth.setAuthCheck(function() {
            return true;
         });
      });
      afterEach(function() {
         window.ibmConfig = _ibmConfig;
         du();
         auth.setAuthCheck(function() {
            return false;
         });
      });
      array.forEach(gc(), function(comp) {
         array.forEach(fl(comp), function(compfl) {
            it('returns the current authenticated user in ' + cp(compfl), function() {
               lang.setObject('ibmConfig.serviceName', comp);
               su(compfl);
               var user = auth.getUser(comp);
               expect(user).not.toBeNull();
               expect(user.displayName).toBe(DISPLAY_NAME);
               expect(user.id).toBe(USER_ID);
               expect(user.isExternal).toBeFalsy();
            });
         });
      });
      array.forEach(ec(), function(comp) {
         array.forEach(fl(comp), function(compfl) {
            it('correctly detects external users in ' + cp(compfl), function() {
               lang.setObject('ibmConfig.serviceName', comp);
               su(compfl, true);
               var user = auth.getUser(comp);
               expect(user).not.toBeNull();
               expect(user.isExternal).toBeTruthy();
            });
         });
      });
      array.forEach(oc(), function(comp) {
         array.forEach(fl(comp), function(compfl) {
            it('correctly detects organization data in ' + cp(compfl), function() {
               lang.setObject('ibmConfig.serviceName', comp);
               su(compfl);
               var user = auth.getUser(comp);
               expect(user).not.toBeNull();
               expect(user.orgId).toBe(ORG_ID);
            });
         });
      });
      array.forEach(gc(), function(comp) {
         array.forEach(fl(comp), function(compfl) {
            it('returns null when user data is unavailable in ' + cp(compfl), function() {
               lang.setObject('ibmConfig.serviceName', comp);
               expect(auth.getUser(comp)).toBeNull();
            });
         });
      });
   });

});
