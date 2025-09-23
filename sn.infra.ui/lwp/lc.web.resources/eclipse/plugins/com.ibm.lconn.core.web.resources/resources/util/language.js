/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.util.language");

dojo.require("lconn.core.config.language");
dojo.require("dojo.cookie");

(function(config, util) {

   /*
    * Returns the value of the language cookie if the Language Selector feature
    * is enabled, the browser locale otherwise
    */
   function getLanguage() {
      return config.enabled ? dojo.cookie(config.cookieName) : dojo.locale;
   }

   /**
    * @function getLanguage
    * @memberof lconn.core.util
    */
   util.getLanguage = function() { return getLanguage() };

}(lconn.core.config.language, lconn.core.util));
