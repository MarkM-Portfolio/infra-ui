/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.help");

dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");
dojo.require("dojo.string");

(function(window, document) {
   
   var TOPIC_BASE_PATH = "/topic/",
      TOPIC_PATH = {
         activities:  TOPIC_BASE_PATH + "com.ibm.lotus.connections.activities.help/",
         blogs:       TOPIC_BASE_PATH + "com.ibm.lotus.connections.blogs.help/",
         dogear:      TOPIC_BASE_PATH + "com.ibm.lotus.connections.bookmarks.help/",
         common:      TOPIC_BASE_PATH + "com.ibm.lotus.connections.common.help/",
         communities: TOPIC_BASE_PATH + "com.ibm.lotus.connections.communities.help/",
         files:       TOPIC_BASE_PATH + "com.ibm.lotus.connections.files.help/",
         forums:      TOPIC_BASE_PATH + "com.ibm.lotus.connections.forums.help/",
         homepage:    TOPIC_BASE_PATH + "com.ibm.lotus.connections.homepage.help/",
         metrics:     TOPIC_BASE_PATH + "com.ibm.lotus.connections.common.help/",
         moderation:  TOPIC_BASE_PATH + "com.ibm.lotus.connections.common.help/",
         profiles:    TOPIC_BASE_PATH + "com.ibm.lotus.connections.profiles.help/",
         wikis:       TOPIC_BASE_PATH + "com.ibm.lotus.connections.wikis.help/"
      },
      DEFAULT_TOPIC_PATH = {
         activities:  TOPIC_PATH.activities  + "aframe.html",
         blogs:       TOPIC_PATH.blogs       + "bframe.html",
         dogear:      TOPIC_PATH.dogear      + "dframe.html",
         common:      TOPIC_PATH.common      + "euframe.html",
         communities: TOPIC_PATH.communities + "cframe.html",
         files:       TOPIC_PATH.files       + "fframe.html",
         forums:      TOPIC_PATH.forums      + "eframe.html",
         homepage:    TOPIC_PATH.homepage    + "hframe.html",
         metrics:     TOPIC_PATH.metrics     + "t_eucommon_metrics.html",
         moderation:  TOPIC_PATH.moderation  + "c_eucommon_global_moderation.html",
         profiles:    TOPIC_PATH.profiles    + "pframe.html",
         wikis:       TOPIC_PATH.wikis       + "wframe.html"
      },
      COMMON_TOPIC_PATH = TOPIC_PATH.common,
      DEFAULT_COMMON_TOPIC_PATH = DEFAULT_TOPIC_PATH.common,
      OPTIONS = "height=${h},width=${w},status=yes,toolbar=yes,menubar=no,location=no,scrollbars=yes,resizable=yes";
   
   function getTopicPath(topicPath, serviceName) {
      var path = topicPath;
      /*
       * Allow the caller to specify a service name different from the container's own service name.
       * This use case is mostly for community widgets that must launch help pages under their own
       * service's topic path.
       */
      var serviceName = (serviceName && TOPIC_PATH[serviceName]) ? serviceName : dojo.getObject('ibmConfig.serviceName');
      if (!topicPath) {
         // Use default Help topic URL if no topic provided
         path = DEFAULT_TOPIC_PATH[serviceName] || DEFAULT_COMMON_TOPIC_PATH;
      } else if (topicPath.indexOf(TOPIC_BASE_PATH) !== 0) {
         // Rebase topic path off default topic path if not included by caller
         path = (TOPIC_PATH[serviceName] || COMMON_TOPIC_PATH) + topicPath.substring(topicPath.lastIndexOf('/') + 1);
      }
      return path;
   }
   
   function getOptions() {
      var h = Math.max(window.screen.height / 4, 770);
      var w = Math.max(window.screen.width / 4, 980);
      return dojo.string.substitute(OPTIONS, {h: h, w: w});
   }
   
   /**
    * Helper object that knows how to launch demo videos and help topics
    * @namespace lconn.core.help
    */
   lconn.core.help = /** @lends lconn.core.help */ {
         /**
          * Launches the product demo video in a popup window. Callers should
          * pass the URL of the demo video.
          * <p>
          * E.g. to open the Home Page demo video, you ought to call:
          * <code>lconn.core.help.launchDemo('http://ibmtvdemo.edgesuite.net/software/lotus/uxid/connections/homepage45/homepage_demo.html');</code>
          * <p>
          * If you don't provide a URL, the method will return without effect.
          * 
          * @param {String} demoUrl the URL of the demo video
          */
         launchDemo: function(/* String */ demoUrl) {
            if (!demoUrl)
               return;
            
            var w = window.open(demoUrl, "_icDemoWindow", getOptions());
            if (w) w.focus();
         },
         
         /**
          * Launches the product help in a popup window. Callers should pass the
          * topic path, i.e. the part of the URL after the Help service base
          * URI. The method takes care of setting the service URL for the Help
          * application as defined in the service location configuration file.
          * <p>
          * E.g. to open the help page:
          * http://localhost/help/topic/com.ibm.lotus.connections.homepage.help/hframe.html,
          * <p>
          * you ought to call:
          * <code>lconn.core.help.launchHelp('/topic/com.ibm.lotus.connections.homepage.help/hframe.html');</code>
          * <p>
          * If you don't provide a topic path, the help will be opened on the
          * front page.
          * 
          * @param {String}
          *           topicPath the path to the help page
          * @param {String}
          *           [serviceName] the desired service name when different from the container's service name
          */
         launchHelp: function(topicPath, serviceName) {
            if (!lconn.core.config.services.help)
               return;
            
            var w = window.open(this.getProductHelpUrl(topicPath, serviceName), "_icHelpWindow", getOptions());
            if (w) w.focus();
         },
         
         /**
          * Returns the URL to a page of the product help.
          * 
          * @param {String}
          *           topicPath the path to the help page
          * @param {String}
          *           [serviceName] the desired service name when different from the container's service name
          * @returns the URL of a page of the product help
          */
         getProductHelpUrl: function(topicPath, serviceName) {
            var url, baseUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.help);
            if (baseUrl)
               url = baseUrl.toString() + getTopicPath(topicPath , serviceName);
            return url;
         },

         /**
          * Convenience method that creates a hyperlink to the help topic URL,
          * that pops up the help window when clicked.
          * This method returns a reference to the return value of dojo.connect(),
          * so the caller can disconnect() it at their best convenience.
          * 
          * @param {String|Node}
          *           el id or reference to the hyperlink
          * @param {String}
          *           topicPath the path to the help page
          * @param {String}
          *           [serviceName] the desired service name when different from the container's service name
          * @returns a reference to the dojo.connect() return value
          */
         createHelpLink: function(el, topicPath, serviceName) {
            var node = dojo.byId(el), url = this.getProductHelpUrl(topicPath, serviceName);
            dojo.attr(el, "href", this.getProductHelpUrl(topicPath, serviceName));
            return dojo.connect(el, "onclick", function(e) { dojo.stopEvent(e); lconn.core.help.launchHelp(topicPath); });
         }
   }
   
}(window, document));
