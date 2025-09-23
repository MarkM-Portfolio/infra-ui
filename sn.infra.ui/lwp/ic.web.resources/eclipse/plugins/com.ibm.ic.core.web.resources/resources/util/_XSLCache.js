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
      "dojo/_base/declare",
      "dojo/cache",
      "../xslt"
], function(declare, cache, xslt) {

   /**
    * Connections Core utilities
    * 
    * @namespace ic-core.util
    */

   /**
    * Mixin that inlines XSL files and allows them to be returned as XSL
    * documents via {@link ic-core.xslt}
    * 
    * @mixin ic-core.util._XSLCache
    * @author Eamon Phelan <eaphelan@ie.ibm.com>
    */
   var _XSLCache = declare("lconn.core.util._XSLCache", null, /** @lends ic-core.util._XSLCache.prototype */
   {
      /**
       * Add xsl files to be inlined with dojo.cache in the following format in
       * derived class - minus the '_' in templatePath
       */
      xslDocs : null,
      /**
       * Contains key/value pairs of names and module URLs of XSL files that
       * will be inlined with dojo.cache. Override with the XSL files your
       * module needs.
       * 
       * <pre>
       * xslStrings : {
       *    &quot;files.xsl&quot; : {
       *       templatePath : dojo.moduleUrl(&quot;lconn.homepage&quot;, &quot;widgets/files/files.xsl&quot;)
       *    }
       * }
       * </pre>
       */
      xslStrings : {},

      constructor : function() {
         this.xslDocs = {};
      },

      /**
       * Returns an XSL document by name. Pass the key to the
       * {@link #xslStrings} object as argument.
       * 
       * @param {String}
       *           xslName The key of the XSL template in the xslStrings object
       * @returns {XSLDoc} An XSL document
       */
      getXslDoc : function(xslName) {
         if (xslName in this.xslStrings) {
            if (xslName in this.xslDocs) {
               return this.xslDocs[xslName];
            }
            var xslDoc = null;
            try {
               xslDoc = xslt.loadXslString(cache(this.xslStrings[xslName].templatePath));
            }
            catch (e) {
               return null;
               // if there's an error, return null and allow the caller to try
               // an
               // alternate way of loading the xsl
            }
            this.xslDocs[xslName] = xslDoc;
            return xslDoc;
         }
         return null;
      }
   });

   return _XSLCache;
});
