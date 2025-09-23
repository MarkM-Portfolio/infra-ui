/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2020                         */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

dojo.provide("lconn.test.jasmine.core.helpSpec");

dojo.require("lconn.core.help");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

/**
 * Jasmine spec for lconn.core.help
 *
 * @module lconn.test.jasmine.core.helpSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

(function(help, url, services, array, lang, string, domConstruct) {
   // Super duper reversible mocking function for windows
   function mock(window) {
      var urls = [], names = [], params = [], _o = window.open, _f = window.focus;
      return lang.mixin(window, {
         open : function(url, name, param) {
            urls.push(url);
            names.push(name);
            params.push(param);
            return this;
         },
         focus : function() {},
         getUrl : function() {
            return urls.pop();
         },
         getName : function() {
            return names.pop();
         },
         getParams : function() {
            return params.pop();
         },
         deMock : function() {
            delete this.getUrl;
            delete this.getName;
            delete this.getParams;
            delete this.deMock;
            this.open = _o;
            this.focus = _f;
         }
      });
   }

   var IC_HELP_WINDOW = '_icHelpWindow', IC_DEMO_WINDOW = '_icDemoWindow';

   function hu() {
      return url.getServiceUrl(services.help).toString();
   }

   function wu() {
      return window.getUrl();
   }
   function wp() {
      return window.getParams();
   }

   var OPTIONS = "height=${h},width=${w},status=yes,toolbar=yes,menubar=no,location=no,scrollbars=yes,resizable=yes";

   function ho() {
      var h = Math.max(window.screen.height / 4, 770);
      var w = Math.max(window.screen.width / 4, 980);
      return string.substitute(OPTIONS, {
         h : h,
         w : w
      });
   }

   function cp(c) {
      return c.substring(0, 1).toUpperCase() + c.substring(1);
   }

   function bu(c) {
      var u = hu();
      switch (c) {
         case 'activities':
            u += '/user/activities/';
            break;
         case 'blogs':
            u += '/user/blogs/';
            break;
         case 'dogear':
            u += '/user/bookmarks/';
            break;
         case 'common':
            u += '/user/eucommon/';
            break;
         case 'communities':
            u += '/user/communities/';
            break;
         case 'files':
            u += '/user/files/';
            break;
         case 'forums':
            u += '/user/forums/';
            break;
         case 'homepage':
            u += '/user/homepage/';
            break;
         case 'metrics':
            u += '/user/eucommon/';
            break;
         case 'moderation':
            u += '/user/eucommon/';
            break;
         case 'profiles':
            u += '/user/profiles/';
            break;
         case 'wikis':
            u += '/user/wikis/';
            break;
      }
      return u;
   }

   function tu(c, t) {
      var u = bu(c);
      switch (c) {
         case 'activities':
            u += t || 'aframe.html';
            break;
         case 'blogs':
            u += t || 'bframe.html';
            break;
         case 'dogear':
            u += t || 'dframe.html';
            break;
         case 'common':
            u += t || 'euframe.html';
            break;
         case 'communities':
            u += t || 'cframe.html';
            break;
         case 'files':
            u += t || 'fframe.html';
            break;
         case 'forums':
            u += t || 'eframe.html';
            break;
         case 'homepage':
            u += t || 'hframe.html';
            break;
         case 'metrics':
            u += t || 't_eucommon_metrics.html';
            break;
         case 'moderation':
            u += t || 'c_eucommon_global_moderation.html';
            break;
         case 'profiles':
            u += t || 'pframe.html';
            break;
         case 'wikis':
            u += t || 'wframe.html';
            break;
      }
      return u;
   }

   function gc() {
      return 'activities|blogs|dogear|common|communities|files|forums|homepage|metrics|moderation|profiles|wikis'.split('|');
   }

   describe('the interface of lconn.core.help', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(help.launchHelp)).toBeTruthy();
         expect(lang.isFunction(help.launchDemo)).toBeTruthy();
         expect(lang.isFunction(help.getProductHelpUrl)).toBeTruthy();
         expect(lang.isFunction(help.createHelpLink)).toBeTruthy();
      });
   });

   describe('the method lconn.core.help.launchHelp()', function() {
      var _ibmConfig;
      beforeEach(function() {
         _ibmConfig = window.ibmConfig;
         window.ibmConfig = {};
         mock(window);
      });
      afterEach(function() {
         window.ibmConfig = _ibmConfig;
         window.deMock();
      });
      array.forEach(gc(), function(comp) {
         it('launches the correct ' + cp(comp) + ' help URL', function() {
            lang.setObject('ibmConfig.serviceName', comp);
            help.launchHelp();
            expect(wu()).toBe(tu(comp));
            expect(wp()).toBe(ho());
            expect(window.getName()).toBe(IC_HELP_WINDOW);
         });
      });
      array.forEach(gc(), function(comp) {
         it('launches the desired ' + cp(comp) + ' help topic URL', function() {
            lang.setObject('ibmConfig.serviceName', comp);
            help.launchHelp('foo.html');
            expect(wu()).toBe(tu(comp, 'foo.html'));
            expect(wp()).toBe(ho());
            expect(window.getName()).toBe(IC_HELP_WINDOW);
         });
      });
   });

   describe('the method lconn.core.help.getProductHelpUrl()', function() {
      var _ibmConfig;
      beforeEach(function() {
         _ibmConfig = window.ibmConfig;
         window.ibmConfig = {};
         mock(window);
      });
      afterEach(function() {
         window.deMock();
         window.ibmConfig = _ibmConfig;
      });
      array.forEach(gc(), function(comp) {
         it('returns the correct ' + cp(comp) + ' help URL', function() {
            lang.setObject('ibmConfig.serviceName', comp);
            help.launchHelp();
            expect(wu()).toBe(tu(comp));
            expect(wp()).toBe(ho());
            expect(window.getName()).toBe(IC_HELP_WINDOW);
         });
      });
   });

   describe('the method lconn.core.help.launchDemo()', function() {
      beforeEach(function() {
         mock(window);
      });
      afterEach(function() {
         window.deMock();
      });
      it('launches the desired demo URL', function() {
         spyOn(window, 'open').and.callThrough();
         var URL1 = 'http://www.ibm.com';
         help.launchDemo(URL1);
         expect(wu()).toBe(URL1);
         expect(wp()).toBe(ho());
         expect(window.getName()).toBe(IC_DEMO_WINDOW);
         expect(window.open).toHaveBeenCalled();

         var URL2 = 'http://www.devworks.net';
         help.launchDemo(URL2);
         expect(wu()).toBe(URL2);
         expect(wp()).toBe(ho());
         expect(window.getName()).toBe(IC_DEMO_WINDOW);
      });
      it('does not open a window if URL is not set', function() {
         spyOn(window, 'open').and.callThrough();
         help.launchDemo();
         help.launchDemo(null);
         expect(window.open).not.toHaveBeenCalled();
      });
   });

   describe('the method lconn.core.help.createHelpLink()', function() {
      var node = domConstruct.create('a');
      array.forEach(gc(), function(comp) {
         it('sets the href of the node to the correct ' + cp(comp) + ' help URL', function() {
            help.createHelpLink(node, undefined, comp);
            expect(node.href).toBe(tu(comp));
         });
      });
   });
}(lconn.core.help, lconn.core.url, lconn.core.config.services, dojo, dojo, dojo.string, dojo));
