/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/lang",
      "dojo/dom-class",
      "dojox/lang/functional/object"
], function(lang, domClass, df) {
   "use strict";

   /**
    * Utility that adds Gatekeeper feature flags as class names to the HTML root
    * node on document load.
    * <p>
    * It also provides a convenient accessor for the class names
    * 
    * @namespace ic-core.config.htmlClass
    * @author Claudio Procida <procidac@ie.ibm.com>
    */

   var htmlClass = lang.mixin(lang.getObject("lconn.core.config.htmlClass", true), /** @lends ic-core.config.htmlClass */
   {
      /**
       * Returns a space separated list of class names for enabled feature flags
       * 
       * @returns {String} a space separated list of class names for enabled
       *          feature flags
       */
      get : function() {
         var names = [];
         df.mapIn(lang.getObject("gatekeeperConfig"), function(value, key) {
            if (value === true) {
               names.push(key);
            }
         });

         // remove 'catalog-ui-update' and catalog-card-view from classnames list if we are not using hikari theme.
         // they only work with hikari
         if (names.indexOf('catalog-ui-updated') > -1 || names.indexOf('catalog-card-view') > -1) {
            if (lconn.core.config.properties && lconn.core.config.properties.LotusLive) { // lotuslive
               // in LL, the customization lotuslive.widgets.theme has been added to the footer component of each page to get theming info as well as set theme cookies such as themeId
               // the themeId cookie is set by a set-cookie header of the theming servlet request for the stylesheet: /theming/theme/onprem/3/<userid>/theming/<app>/<versionStamp>
               // additionally, sn.infra.ui/lwp/lc.web.resources/eclipse/plugins/com.ibm.lconn.core.web.resources/resources/theme.js:lconn.core.theme.isHikariTheme gets overloaded by the LL theming customization
               // see 198392: GEN4: Cloud only - Community catalog display issues with Communities header, 'Display' & 'Sort by' data, and Previous/Next links
               if (dojo.cookie('themeId') && !lconn.core.theme.isHikariTheme()) { // isHikariTheme relies on themeId cookie to be present
                  names = names.filter(function(e) { return e !== 'catalog-ui-updated' && e !== 'catalog-card-view'; });
               } 
            } else { // on-prem
               if (names.indexOf('hikari-default-theme') < 0) {
                 names = names.filter(function(e) { return e !== 'catalog-ui-updated' && e !== 'catalog-card-view'; });
               }
            }
         }

         return names.sort().join(" ");
      }
   });

   require([ 'dojo/domReady!'
   ], function() {
      domClass.add(document.getElementsByTagName('html')[0], htmlClass.get());
   });

   return htmlClass;
});
