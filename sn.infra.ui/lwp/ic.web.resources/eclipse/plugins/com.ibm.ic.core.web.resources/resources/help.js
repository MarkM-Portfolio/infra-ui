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

/**
 * Connections Core JS
 * @namespace ic-core
 */

define(["./config/services",
        "./url",
        "dojo/_base/lang",
        "dojo/on",
        "dojo/dom",
        "dojo/dom-attr",
        "dojo/string"], function(services, url, lang, on, dom, domAttr, string) {

   var helpDebug = false;

   var TOPIC_BASE_PATH = "/user/",
      TOPIC_PATH = {
         activities:  TOPIC_BASE_PATH + "activities/",
         blogs:       TOPIC_BASE_PATH + "blogs/",
         dogear:      TOPIC_BASE_PATH + "bookmarks/",
         common:      TOPIC_BASE_PATH + "eucommon/",
         eucommon:    TOPIC_BASE_PATH + "eucommon/",
         communities: TOPIC_BASE_PATH + "communities/",
         files:       TOPIC_BASE_PATH + "files/",
         forums:      TOPIC_BASE_PATH + "forums/",
         homepage:    TOPIC_BASE_PATH + "homepage/",
         metrics:     TOPIC_BASE_PATH + "eucommon/",
         moderation:  TOPIC_BASE_PATH + "eucommon/",
         profiles:    TOPIC_BASE_PATH + "profiles/",
         wikis:       TOPIC_BASE_PATH + "wikis/",
         news:        TOPIC_BASE_PATH + "eucommon/",
         oauth:       TOPIC_BASE_PATH + "eucommon/",
         deploymentConfig:       TOPIC_BASE_PATH + "eucommon/",
         profilesMyNetwork:    TOPIC_BASE_PATH + "profiles/",
         profilesDirectory:    TOPIC_BASE_PATH + "profiles/"
      },
      DEFAULT_TOPIC_PATH = {
         activities:  TOPIC_PATH.activities  + "aframe.html",
         blogs:       TOPIC_PATH.blogs       + "bframe.html",
         dogear:      TOPIC_PATH.dogear      + "dframe.html",
         common:      TOPIC_PATH.common      + "euframe.html",
         eucommon:    TOPIC_PATH.common      + "euframe.html",
         communities: TOPIC_PATH.communities + "cframe.html",
         files:       TOPIC_PATH.files       + "fframe.html",
         forums:      TOPIC_PATH.forums      + "eframe.html",
         homepage:    TOPIC_PATH.homepage    + "hframe.html",
         metrics:     TOPIC_PATH.metrics     + "t_eucommon_metrics.html",
         moderation:  TOPIC_PATH.moderation  + "c_eucommon_global_moderation.html",
         profiles:    TOPIC_PATH.profiles    + "pframe.html",
         wikis:       TOPIC_PATH.wikis       + "wframe.html",
         news:        TOPIC_PATH.news        + "t_eucommon_set_email_preferences.html",	// the only /news (settings) help topic
         oauth:       TOPIC_PATH.oauth       + "c_eucommon_authorization.html",	// the only /oauth (settings) help topic
         deploymentConfig:       TOPIC_PATH.deploymentConfig        + "t_eucommon_change_lang.html",	// the only /deploymentConfig (settings) help topic
         profilesMyNetwork:       TOPIC_PATH.profilesMyNetwork        + "t_pers_add_colleagues.html",	// in Profiles with 'MY NETWORK' selected
         profilesDirectory:       TOPIC_PATH.profilesDirectory        + "t_pers_search_directory.html"
      },
      COMMON_TOPIC_PATH = TOPIC_PATH.common,
      DEFAULT_COMMON_TOPIC_PATH = DEFAULT_TOPIC_PATH.common,
      OPTIONS = "height=${h},width=${w},status=yes,toolbar=yes,menubar=no,location=no,scrollbars=yes,resizable=yes";

   function getTopicPath(topicPath, serviceName)
   {
	  if (helpDebug)
  		alert("ic getTopicPath1: topicPath: " + topicPath + "  serviceName: " + serviceName);

      var path = topicPath;

      /*
       * Allow the caller to specify a service name different from the
       * container's own service name. This use case is mostly for
       * community widgets that must launch help pages under their own
       * service's topic path.
       */
      serviceName = (serviceName && TOPIC_PATH[serviceName]) ? serviceName
                        : lang.getObject('ibmConfig.serviceName');

	  if (helpDebug)
		alert("ic getTopicPath2: topicPath: " + topicPath + "  serviceName: " + serviceName);

      // is there no topic path?, i.e., the user clicked help in the top or
	  // bottom banner.
      if (!topicPath)
      {
		if (helpDebug)
  			alert("ic getTopicPath3: topicPath: " + topicPath + "  serviceName: " + serviceName);


		var isProfilesMyNetwork = false;
		var isProfilesDirectory = false;

		if (helpDebug)
			alert("ic getTopicPath3.1: topicPath: " + topicPath + "  serviceName: " + serviceName);

    // basically, are we looking at a Profiles screen
    if (window.profilesData && window.profilesData.config && window.profilesData.config.loginReturnPageEnc)
    {
	  if (helpDebug)
  		alert("ic getTopicPath: window.profilesData.config.loginReturnPageEnc: " + window.profilesData.config.loginReturnPageEnc);

	//t_pers_add_colleagues.html
    if ((window.profilesData.config.loginReturnPageEnc).indexOf("networkView.do") != -1)
	    isProfilesMyNetwork = true;

	//t_pers_search_directory.html
    if ((window.profilesData.config.loginReturnPageEnc).indexOf("searchProfiles.do") != -1)
	    isProfilesDirectory = true;
   }

		if (helpDebug)
		{
		  alert("ic getTopicPath: isProfilesMyNetwork: " + isProfilesMyNetwork);
		  alert("ic getTopicPath: isProfilesDirectory: " + isProfilesDirectory);
		}

		if (isProfilesMyNetwork)
			serviceName = "profilesMyNetwork";
		else
		if (isProfilesDirectory)
			serviceName = "profilesDirectory";

		// Use default Help topic URL if no topic can be determined
		path = DEFAULT_TOPIC_PATH[serviceName] || DEFAULT_COMMON_TOPIC_PATH;

      }
      else if (topicPath.indexOf(TOPIC_BASE_PATH) !== 0)
      {

	    // hack for Files About screen
		if (topicPath.indexOf("t_files_add_files.html") !== -1)
			topicPath = "t_files_add_files_refresh.html";
		else
		if (topicPath.indexOf("t_files_collections.html") !== -1)
			topicPath = "t_files_folders_addfiles_refresh.html";
		else
		if (topicPath.indexOf("t_files_share_files.html") !== -1)
			topicPath = "t_files_share_with_comm_refresh.html";
		else
		if (topicPath.indexOf("t_files_find_files.html") !== -1)
			topicPath = "t_files_share_files_refresh.html";

	    // hack for Communities About screen
		else
		if (topicPath.indexOf("t_com_add_widgets.html") !== -1)
			topicPath = "c_com_add_widgets.html";
		else
		if (topicPath.indexOf("t_com_join.html") !== -1)
			topicPath = "c_com_join.html";


	    // hack for Profiles About screen
		else
		if (topicPath.indexOf("c_pers_tags.html") !== -1)
			topicPath = "t_pers_tag_profiles.html";

	    // hack for Homepage About screen
		else
		if (topicPath.indexOf("t_hp_use_updates_tab.html") !== -1)
		{
			serviceName = "profiles";
			topicPath = "c_pers_sharing_expertise.html";
		}
		else
		if (topicPath.indexOf("t_hp_update_status.html") !== -1)
		{
			serviceName = "profiles";
			topicPath = "t_pers_update_status.html";
		}
		else
		if (topicPath.indexOf("t_hp_follow_tags.html") !== -1)
		{
			serviceName = "eucommon";
			topicPath = "c_eucommon_tagging_content.html";
		}

	    // hack for Activities About screen
		else
		if (topicPath.indexOf("_oa_c_getting_started.html") !== -1)
		{
			topicPath = "c_get_started.html";
		}
		else
		if (topicPath.indexOf("w_oa_t_prioritizing_activities.html") !== -1)
		{
			topicPath = "c_prioritize_activity.html";
		}
		else
		if (topicPath.indexOf("w_oa_t_using_templates.html") !== -1)
		{
			topicPath = "c_using_templates.html";
		}

		else
		if (topicPath.indexOf("w_oa_t_adding_entry.html") !== -1)
		{
			topicPath = "c_add_entry.html";
		}
		else
		if (topicPath.indexOf("w_oa_t_adding_a_to_do.html") !== -1)
		{
			topicPath = "c_adding_a_todo.html";
		}
		else
		if (topicPath.indexOf("r_oa_t_managing_activities.html") !== -1)
		{
			topicPath = "c_organize_sections.html";
		}

	    // hack for Wikis About screen
		else
		if (topicPath.indexOf("t_wikis_create_pages.html") !== -1)
		{
			topicPath = "t_wikis_create_wikis.html";
		}

         // Rebase topic path off default topic path if not included by
         // caller
        path = (TOPIC_PATH[serviceName] || COMMON_TOPIC_PATH)
               + topicPath.substring(topicPath.lastIndexOf('/') + 1);

		if (helpDebug)
			alert("ic getTopicPath4: path: " + path );
      }

	  if (helpDebug)
  		alert("ic getTopicPath5: path: " + path );

      return path;
   }

   function getOptions() {
      var h = Math.max(window.screen.height / 4, 770);
      var w = Math.max(window.screen.width / 4, 980);
      return string.substitute(OPTIONS, {
         h : h,
         w : w
      });
   }

   /**
    * Helper object that knows how to launch demo videos and help topics
    *
    * @namespace ic-core.help
    */
   var help = lang.mixin(lang.getObject("lconn.core.help", true), /** @lends ic-core.help */
   {
      /**
       * Launches the product demo video in a popup window. Callers should
       * pass the URL of the demo video.
       * <p>
       * E.g. to open the Home Page demo video, you ought to call:
       * <code>core.help.launchDemo('http://ibmtvdemo.edgesuite.net/software/lotus/uxid/connections/homepage45/homepage_demo.html');</code>
       * <p>
       * If you don't provide a URL, the method will return without
       * effect.
       *
       * @param {String}
       *           demoUrl the URL of the demo video
       */
      launchDemo : function(/* String */demoUrl) {
		if (helpDebug)
		  alert("ic launchDemo: ");

         if (!demoUrl)
            return;

         var w = window.open(demoUrl, "_icDemoWindow", getOptions());
         if (w)
            w.focus();
      },

      /**
       * Launches the product help in a popup window. Callers should pass
       * the topic path, i.e. the part of the URL after the Help service
       * base URI. The method takes care of setting the service URL for
       * the Help application as defined in the service location
       * configuration file.
       * <p>
       * E.g. to open the help page:
       * http://localhost/help/topic/com.ibm.lotus.connections.homepage.help/hframe.html,
       * <p>
       * you ought to call:
       * <code>core.help.launchHelp('/topic/com.ibm.lotus.connections.homepage.help/hframe.html');</code>
       * <p>
       * If you don't provide a topic path, the help will be opened on the
       * front page.
       *
       * @param {String}
       *           topicPath the path to the help page
       * @param {String}
       *           [serviceName] the desired service name when different
       *           from the container's service name
       */
      launchHelp : function(topicPath, serviceName) {
		 if (helpDebug)
  			alert("ic launchHelp: topicPath: " + topicPath + "  serviceName: " + serviceName);

         if (!services.help) {
            return;
         }

         var w = window.open(this.getProductHelpUrl(topicPath,
               serviceName), "_icHelpWindow", getOptions());
         if (w) {
            w.focus();
         }
      },

      /**
       * Returns the URL to a page of the product help.
       *
       * @param {String}
       *           topicPath the path to the help page
       * @param {String}
       *           [serviceName] the desired service name when different
       *           from the container's service name
       * @returns the URL of a page of the product help
       */
	getProductHelpUrl : function(topicPath, serviceName) {
		if (helpDebug)
  			alert("ic getProductHelpUrl1: topicPath: " + topicPath + "  serviceName: " + serviceName);

         var helpUrl, baseUrl = url.getServiceUrl(services.help);

		if (helpDebug)
			alert("ic getProductHelpUrl1.5: baseUrl: " + baseUrl.toString() + "  services.help: " + services.help);


         var pattern = /(([A-Za-z]{3,9}):\/\/)([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/gi;
         // Checking if the topicPath is a legit url and context contains '/user/'.
         // If true we return the url, otherwise we return the related topic path
         if (pattern.test(topicPath)  && (topicPath.indexOf(TOPIC_BASE_PATH) !== -1))
         {
            helpUrl = topicPath;

			if (helpDebug)
				alert("ic getProductHelpUrl2: helpUrl: " + helpUrl );
         }
         else
         {
          if (baseUrl)
                 helpUrl = baseUrl.toString()
                       + getTopicPath(topicPath, serviceName);
		  if (helpDebug)
			  alert("ic getProductHelpUrl3: helpUrl: " + helpUrl );
         }

		 if (helpDebug)
			  alert("ic getProductHelpUrl4: helpUrl: " + helpUrl );

         return helpUrl;
      },

      /**
       * Convenience method that creates a hyperlink to the help topic
       * URL, that pops up the help window when clicked. This method
       * returns a reference to the return value of dojo.connect(), so the
       * caller can disconnect() it at their best convenience.
       *
       * @param {String|Node}
       *           el id or reference to the hyperlink
       * @param {String}
       *           topicPath the path to the help page
       * @param {String}
       *           [serviceName] the desired service name when different
       *           from the container's service name
       * @returns a reference to the dojo.connect() return value
       */
      createHelpLink : function(el, topicPath, serviceName) {
		 if (helpDebug)
		  alert("ic createHelpLink: topicPath: " + topicPath + "  serviceName: " + serviceName);

         var node = dom.byId(el), url = this.getProductHelpUrl(topicPath,
               serviceName);
         domAttr.set(el, "href", this.getProductHelpUrl(topicPath,
               serviceName));
         return on(el, "click", function(e) {
            e.preventDefault(), e.stopPropagation();
            help.launchHelp(topicPath);
         });
      }
   });

   return help;

});
