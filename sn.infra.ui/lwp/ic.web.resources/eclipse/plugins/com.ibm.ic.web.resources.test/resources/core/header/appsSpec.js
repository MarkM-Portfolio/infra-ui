/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Jasmine spec for ic-core.header.apps
 * 
 * @module ic-test.core.header.appsSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([
      "ic-core/header/apps",
      "dojo/_base/array",
      "dojo/dom-class",
      "dojo/dom-construct",
      "dojo/dom",
      "dijit/_base/wai"
], function(apps, array, domClass, domConstruct, dom, wai) {

   function gc() {
      return [
            "activities",
            "blogs",
            "dogear",
            "common",
            "communities",
            "files",
            "forums",
            "homepage",
            "metrics",
            "moderation",
            "profiles",
            "wikis"
      ];
   }

   function cp(c) {
      return c.substring(0, 1).toUpperCase() + c.substring(1);
   }

   function menuIdsFor(app) {
      switch (app) {
         case 'homepage':
            return [ apps.BANNER_IDS.BANNER_HOMEPAGE
            ];
         case 'files':
            return [
                  apps.BANNER_IDS.BANNER_FILES_EXTERNAL,
                  apps.BANNER_IDS.BANNER_APPS
            ];
         case 'communities':
            return [
                  apps.BANNER_IDS.BANNER_COMMUNITIES_EXTERNAL,
                  apps.BANNER_IDS.BANNER_COMMUNITIES
            ];
         case 'profiles':
            return [ apps.BANNER_IDS.BANNER_PROFILES
            ];
         case 'metrics':
            return [ apps.BANNER_IDS.BANNER_HEADER_METRICS
            ];
         case 'moderation':
            return [ apps.BANNER_IDS.BANNER_MODERATION
            ];
         default:
            return [ apps.BANNER_IDS.BANNER_APPS
            ];
      }
   }

   describe('the interface of lconn.core.header.apps', function() {
      var METHODS = [
            'onLogin',
            'onLogout',
            'setSelected',
            'updateBanner',
            'updateBannerByRoles',
            'updateUserNameMenu',
            'initNotificationCenter'
      ];
      it('implements the expected methods', function() {
         array.forEach(METHODS, function(method) {
            expect(apps[method]).toEqual(jasmine.any(Function));
         });
      });
      it('implements the expected properties', function() {
         expect(apps.BANNER_IDS).toBeDefined();
      });
   });

   describe('the method updateLoginRegion()', function() {
      var il, ol;
      beforeEach(function() {
         il = domConstruct.create('div', {
            id : 'loginLabel',
            role : 'region'
         }, document.body);
         ol = domConstruct.create('div', {
            id : 'logoutLabel'
         }, document.body);
      });
      afterEach(function() {
         document.body.removeChild(il);
         document.body.removeChild(ol);
         il = undefined;
         ol = undefined;
      });
      it('correctly assigns the role=region to the logout node if it exists', function() {
         expect(wai.getWaiRole(il)).toBe('region');
         expect(wai.getWaiRole(ol)).toBe('');
         apps.updateLoginRegion();
         expect(wai.getWaiRole(il)).toBe('');
         expect(wai.getWaiRole(ol)).toBe('region');
      });
      it('leaves the role in the login node if logout does not exist', function() {
         // Reassigns the id, so byId('logoutLabel') returns null
         ol.id = '';
         expect(wai.getWaiRole(il)).toBe('region');
         expect(wai.getWaiRole(ol)).toBe('');
         apps.updateLoginRegion();
         expect(wai.getWaiRole(il)).toBe('region');
         expect(wai.getWaiRole(ol)).toBe('');
      });
   });

   describe('the method lconn.core.header.apps.setSelected()', function() {
      var fake_banner;
      beforeEach(function() {
         fake_banner = domConstruct.create('div', {
            'class' : 'lotusHidden'
         }, document.body);
         array.forEach(gc(), function(comp) {
            array.forEach(menuIdsFor(comp), function(menu_id) {
               if (dom.byId(menu_id)) {
                  return;
               }
               domConstruct.create('div', {
                  id : menu_id
               }, fake_banner);
            });
         });
      });
      afterEach(function() {
         if (fake_banner) {
            document.body.removeChild(fake_banner);
         }
      });
      array.forEach(gc(), function(comp) {
         it('correctly selects the menu for ' + cp(comp), function() {
            apps.setSelected(comp);
            var comp_menu_ids = menuIdsFor(comp);
            array.forEach(apps.BANNER_IDS, function(menu_id) {
               if (array.indexOf(comp_menu_ids, menu_id) === -1) {
                  expect(!domClass.contains(dom.byId(menu_id), "lotusSelected")).toBeFalsy();
               }
            });
            array.forEach(comp_menu_ids, function(menu_id) {
               expect(domClass.contains(dom.byId(menu_id), "lotusSelected")).toBeTruthy();
            });
         });
      });
   });
});
