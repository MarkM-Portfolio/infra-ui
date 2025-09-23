/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Utility functions used throughout the mentions feature
 * 
 * @namespace lconn.core.widget.mentions.utilities
 * @author Jim Antill <antillj@ie.ibm.com>
 */

dojo.provide("lconn.core.widget.mentions.utilities");

dojo.require("lconn.core.config.services");

/**
 * Returns true if the context argument contains a property environment with
 * value "SmartCloud".
 * 
 * FIXME: This function will be removed. Use declarative bindings to
 * differentiate code in SmartCloud
 * 
 * @function isSmartCloud
 * @memberof lconn.core.widget.mentions.utilities
 * @param {Object}
 *           context Context object from calling component.
 * @return {boolean} true if in a SmartCloud environment.
 */
lconn.core.widget.mentions.utilities.isSmartCloud = function(context) {
   dojo.deprecated("Use declarative bindings to differentiate code in SmartCloud", "5.0");
   return context && context.environment === "SmartCloud";
};

/**
 * Returns true if profiles is enabled.
 * 
 * FIXME: This function will be removed. Use lconn.core.config.services.profiles
 * to check if Profiles is enabled
 * 
 * @function isProfilesEnabled
 * @memberof lconn.core.widget.mentions.utilities
 * @returns {Boolean} true if Profiles is enabled.
 */
lconn.core.widget.mentions.utilities.isProfilesEnabled = function() {
   dojo.deprecated("Use lconn.core.config.services.profiles to check if Profiles is enabled", "5.0");
   return lconn.core.config.services.profiles;
};

/**
 * Cleans up HTML containing mention nodes to strip unnecessary attributes in
 * order to produce the correct mention microformat accepted by Connections
 * APIs.
 *
 * @function cleanupHTML
 * @memberof lconn.core.widget.mentions.utilities
 * @param {String}
 *           data A string of HTML markup containing mentions
 * @returns {String} The string of HTML cleaned up from unnecessary attributes
 */
lconn.core.widget.mentions.utilities.cleanupHTML = function(data) {
   if (data.indexOf("vcard") > -1) {
      data = data.replace(/(\s|")contenteditable="false"/gi, "$1");
      data = data.replace(/class=\"fn url hasHover\"/gi, "class=\"fn url\"");
      data = data.replace(/(\s|")icbizcard_ref="\d+"/gi, "$1");
      data = data.replace(/(\s|")icbizcard_idx="\d+"/gi, "$1");
      data = data.replace(/(\s|")aria-label="[^"\r\n]*"/gi, "$1");
      data = data.replace(/(\s|")_bizcardprocessed_="true"/gi, "$1");
   }
   return data;
}
