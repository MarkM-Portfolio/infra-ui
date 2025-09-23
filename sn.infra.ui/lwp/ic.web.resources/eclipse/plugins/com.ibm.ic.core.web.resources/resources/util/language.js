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

define([
        "dojo/_base/kernel",
        "dojo/cookie",
        "../config/language"
        ], function(kernel, cookie, config) {

   /*
    * Returns the value of the language cookie if the Language Selector feature
    * is enabled, the browser locale otherwise
    */
   function getLanguage() {
      return config.enabled ? cookie(config.cookieName) : kernel.locale;
   }

   /**
    * @function getLanguage
    * @memberof ic-core/util
    */
   return getLanguage;

});
