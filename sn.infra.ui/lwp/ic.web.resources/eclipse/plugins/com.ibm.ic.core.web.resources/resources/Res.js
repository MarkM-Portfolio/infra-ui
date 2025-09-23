/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      //XXX hack to support non amd code - to remove once non amd code is deprecated
      "dojo",
      //XXX end hack
      "dojo/_base/declare",
      //"dojo/i18n",
      "dojo/string"
], function(dojo, declare, /*i18n,*/ string) {

   //XXX hack to support non amd code - to remove once non amd code is deprecated
   var i18n = dojo.i18n;
   //XXX end hack
   
   // DESIGNED ONLY TO WORK WITH THE 'strings' BUNDLE, AND NO OTHER
   var Res = declare("lconn.core.Res", [], {
      // the identifier for which package this Resource handle will operate with
      // by default
      bundleFor : 'ic-core',
      
      resBundle : null,

      // THE FOLLOWING FUNCTIONS SHOULD ONLY BE PERFORMED AT RUNTIME, NOT AT
      // DOJO LOAD TIME

      // SET resBundle TO DEFAULT BUNDLE
      loadDefaultBundle : function() {
         this.resBundle = i18n.getLocalization(this.bundleFor, "strings");
      },

      // SET resBundle TO REQUESTED PACKAGE'S BUNDLE
      loadBundle : function(/* str */pkg) {
         this.resBundle = i18n.getLocalization(pkg, "strings");
      },

      // RETURNS DEFAULT BUNDLE
      getDefaultBundle : function() {
         return i18n.getLocalization(this.bundleFor, "strings");
      },

      // RETURNS REQUESTED PACKAGE'S BUNDLE
      getBundle : function(/* str */pkg) {
         return i18n.getLocalization(pkg, "strings");
      },

      // GET STRING FROM A BUNDLE
      // if params is non-empty, then the function will go to substitute mode,
      // and return the 'printfed' string
      getStringFrom : function(/* str */pkg, /* str */key, /* order array */params) {
         var strtemp = i18n.getLocalization(pkg, "strings")[key];
         if (params == undefined) {
            return strtemp;
         }
         else {
            return string.substitute(strtemp, params);
         }
      },

      // GET STRING FROM DEFAULT BUNDLE
      // if params is non-empty, then the function will go to substitute mode,
      // and return the 'printfed' string
      getString : function(/* str */key, /* order array */params) {
         var strtemp = i18n.getLocalization(this.bundleFor, "strings")[key];
         if (params == undefined) {
            return strtemp;
         }
         else {
            return string.substitute(strtemp, params);
         }
      }

   });

   return Res;
});
