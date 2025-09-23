/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2016                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo",
   "dojo/_base/lang"
], function (dojo, lang) {
   
   /**
    * Helper cookie functions
    * @namespace ic-core.util.Cookie
    */
	var Cookie = lang.mixin(lang.getObject("lconn.core.util.Cookie", true), /** @lends ic-core.util.Cookie */
   {
   
	      /**
	       * Returns string that should be appended to cookie definitions so that
	       * cookies are secure if LCC.xml forceSSL is set
	       */
		secureString : function () {
		      if (window.ibmConfig.forceSSL) {
		         return "; secure";
		      }
		      return "";
		}
   });
   
   return Cookie;
});
