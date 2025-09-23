/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.core.helpTests");

dojo.require("doh.runner");
dojo.require("lconn.core.help");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

(function(lch) {
   // Super duper reversible mocking function for windows
   function mock(window) {
      var urls = [], names = [], params = [],
         _o = window.open, _f = window.focus;
      return dojo.mixin(window, {
         open: function(url, name, param) {
            urls.push(url);
            names.push(name);
            params.push(param);
            return this;
         },
         focus: function(){},
         getUrl: function() {
            return urls.pop();
         },
         getName: function() {
            return names.pop();
         },
         getParams: function() {
            return params.pop();
         },
         deMock: function() {
            delete this.getUrl;
            delete this.getName;
            delete this.getParams;
            delete this.deMock;
            this.open = _o;
            this.focus = _f;
         }
      });
   }
   
   var IC_HELP_WINDOW = '_icHelpWindow',
      IC_DEMO_WINDOW = '_icDemoWindow';
   
   function hu() {
      return lconn.core.url.getServiceUrl(lconn.core.config.services.help).toString();
   }
   
   var OPTIONS = "height=${h},width=${w},status=yes,toolbar=yes,menubar=no,location=no,scrollbars=yes,resizable=yes";
   function ho() {
      var h = Math.max(window.screen.height / 4, 770);
      var w = Math.max(window.screen.width / 4, 980);
      return dojo.string.substitute(OPTIONS, {h: h, w: w});
   }
   function hd() {
      var h = Math.max(window.screen.height / 4, 770);
      var w = Math.max(window.screen.width / 4, 980);
      return dojo.string.substitute(OPTIONS, {h: h, w: w});
   }
   
   doh.register("lconn.test.core.helpTests", [ {
      name : 'test interface',
      runTest : function() {
         doh.t(dojo.isFunction(lch.launchHelp));
         doh.t(dojo.isFunction(lch.launchDemo));
         doh.t(dojo.isFunction(lch.getProductHelpUrl));
         doh.t(dojo.isFunction(lch.createHelpLink));
      }
   }, {
      name : 'test launchHelp()',
      setUp : function() {
         this.ibmConfig = window.ibmConfig;
         window.ibmConfig = {};
         mock(window);
      },
      runTest : function() {
         dojo.setObject('ibmConfig.serviceName', 'activities');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.activities.help/aframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'blogs');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.blogs.help/bframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'dogear'); // exception
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.bookmarks.help/dframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'common');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.common.help/euframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'communities');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.communities.help/cframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'files');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.files.help/fframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'forums');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.forums.help/eframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'homepage');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.homepage.help/hframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'profiles');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.profiles.help/pframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());

         dojo.setObject('ibmConfig.serviceName', 'wikis');
         lch.launchHelp();
         doh.is(hu() + '/topic/com.ibm.lotus.connections.wikis.help/wframe.html', window.getUrl());
         doh.is(ho(), window.getParams());
         doh.is(IC_HELP_WINDOW, window.getName());
      },
      tearDown : function() {
         window.deMock();
         window.ibmConfig = this.ibmConfig;
      }
   }, {
      name : 'test launchDemo()',
      setUp : function() {
         mock(window);
      },
      runTest : function() {
         var URL1 = 'http://www.ibm.com';
         lch.launchDemo(URL1);
         doh.is(URL1, window.getUrl());
         doh.is(hd(), window.getParams());
         doh.is(IC_DEMO_WINDOW, window.getName());

         var URL2 = 'http://www.devworks.net';
         lch.launchDemo(URL2);
         doh.is(URL2, window.getUrl());
         doh.is(hd(), window.getParams());
         doh.is(IC_DEMO_WINDOW, window.getName());
      },
      tearDown : function() {
         window.deMock();
      }
   }, {
      name : 'test getProductHelpUrl()',
      setUp : function() {
         this.ibmConfig = window.ibmConfig;
         window.ibmConfig = {};
      },
      runTest : function() {
         dojo.setObject('ibmConfig.serviceName', 'activities');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.activities.help/aframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'blogs');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.blogs.help/bframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'dogear'); // exception
         doh.is(hu() + '/topic/com.ibm.lotus.connections.bookmarks.help/dframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'common');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.common.help/euframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'communities');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.communities.help/cframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'files');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.files.help/fframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'forums');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.forums.help/eframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'homepage');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.homepage.help/hframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'profiles');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.profiles.help/pframe.html', lch.getProductHelpUrl());

         dojo.setObject('ibmConfig.serviceName', 'wikis');
         doh.is(hu() + '/topic/com.ibm.lotus.connections.wikis.help/wframe.html', lch.getProductHelpUrl());
      },
      tearDown : function() {
         window.ibmConfig = this.ibmConfig;
      }
   }]);
}(lconn.core.help));
