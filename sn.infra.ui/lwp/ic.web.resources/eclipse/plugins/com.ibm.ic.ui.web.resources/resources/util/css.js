/* Portions Copyright IBM Corp. 2013, 2015   All Rights Reserved     */

/*
 * Portions copyright 2006, 2007 by Patrick Hunlock.
 * The example code and concepts, unless otherwise noted, are released into the public domain and may be used and modified without compensation or attribution.
 * http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
 */

/**
 * CSS utility
 * @module ic-ui.util.css
 */
define([
   "dojo/has",
   "dojo/_base/lang",
   "dojo/dom",
   "dojo/dom-construct",
   "dojo/dom-geometry",
   "dojo/query",
   "ic-core/url",
   "ic-core/config/services"
], function (has, lang, dom, domConstruct, domGeometry, query, urlUtil, servicesConfig) {

   function isRTL() {
      return !domGeometry.isBodyLtr();
   }

   function fixSel(sel) {
      // Convert test string to lower case.
      sel = sel.toLowerCase();
      // Fix pseudo-element selectors to work on browsers that do not support
      // the CSS 3 double colon '::' notation
      if (has("ff") || has("ie") < 9) {
         sel = sel.replace(/\:\:/g, ':');
      }
      return sel;
   }

   function findRule(styleSheet, ruleName, deleteFlag) {
      var ii = 0, jj, found; // Initialize subCounter.
      var cssRule = false; // Initialize cssRule.
      do { // For each rule in stylesheet
         if (styleSheet.cssRules) { // Browser uses cssRules?
            cssRule = styleSheet.cssRules[ii]; // Yes --Mozilla Style
         }
         else { // Browser usses rules?
            cssRule = styleSheet.rules[ii]; // Yes IE style.
         } // End IE check.
         if (cssRule) { // If we found a rule...
            if (cssRule.imports) {
               jj = 0;
               do {
                  styleSheet = cssRule.imports[jj];
                  // Recurse
                  found = findRule(styleSheet, ruleName, deleteFlag);
                  if (found) {
                     return found;
                  }
                  jj += 1; // Increment sub-counter
               } while (styleSheet);
            }
            else {
               try { // FIXME: try / catch added for debugging, remove
                  if (cssRule.selectorText
                        && cssRule.selectorText.toLowerCase() == ruleName) { // match
                     // ruleName?
                     if (deleteFlag == 'delete') { // Yes. Are we deleteing?
                        if (styleSheet.cssRules) { // Yes, deleting...
                           styleSheet.deleteRule(ii); // Delete rule, Moz
                           // Style
                        }
                        else { // Still deleting.
                           styleSheet.removeRule(ii); // Delete rule IE
                           // style.
                        } // End IE check.
                        return true; // return true, class deleted.
                     }
                     // found and not deleting.
                     return cssRule; // return the style object.
                     // End delete Check
                  }
                  if (cssRule.styleSheet) { // Rule is an @import
                     // statement
                     // Recursion
                     found = findRule(cssRule.styleSheet, ruleName,
                           deleteFlag);
                     if (found) {
                        return found;
                     }
                  } // End found rule name
               }
               catch (e) { // FIXME: try / catch added for debugging, remove
                  console.debug(e);
               }
            }
         } // end found cssRule
         ii += 1; // Increment sub-counter
      } while (cssRule); // end While loop
   }

   return /** @lends ic-ui.util.css */ {
      /**
       * Finds a rule by selector
       * 
       * @param {String}
       *           ruleName The selector of the rule
       * @param {boolean}
       *           deleteFlag Set to true to delete the rule
       */
      getRule : function(ruleName, deleteFlag) { // Return requested style
         // obejct
         ruleName = fixSel(ruleName); // Fix selector
         if (document.styleSheets) { // If browser can play with
            // stylesheets
            var i, styleSheet, found;
            for (i = 0; i < document.styleSheets.length; i++) { // For
               // each
               // stylesheet
               styleSheet = document.styleSheets[i]; // Get the current
               // Stylesheet
               found = findRule(styleSheet, ruleName, deleteFlag);
               if (found) {
                  return found;
               }
            } // end For loop
         } // end styleSheet ability check
         return false; // we found NOTHING!
      },
      // end getCSSRule
      /**
       * Deletes a rule by selector
       * 
       * @param {String}
       *           ruleName The selector of the rule
       */
      deleteRule : function(ruleName) { // Delete a CSS rule
         return this.getRule(ruleName, 'delete'); // just call getCSSRule
         // w/delete flag.
      },
      // end killCSSRule
      /**
       * Adds a rule by selector
       * 
       * @param {String}
       *           ruleName The selector of the rule
       */
      addRule : function(ruleName) { // Create a new css rule
         if (document.styleSheets) { // Can browser do styleSheets?
            if (!this.getRule(ruleName)) { // if rule doesn't exist...
               if (document.styleSheets[0].addRule) { // Browser is IE?
                  document.styleSheets[0].addRule(ruleName, null, 0); // Yes,
                  // add
                  // IE
                  // style
               }
               else { // Browser is IE?
                  document.styleSheets[0].insertRule(ruleName + ' { }', 0); // Yes, add Moz style.
               } // End browser check
            } // End already exist check.
         } // End browser ability check.
         return this.getRule(ruleName); // return rule we just created.
      },
      /**
       * Adds a stylesheet by id
       * 
       * @param {String}
       *           id The module id of the stylesheet
       */
      addStylesheet : function(id) {
         if (!id || dom.byId("icStyle_" + id)) {
            // If no id provided, or the stylesheet exists already, return silently
            return;
         }
         var params = {
            "include" : id,
            "rtl" : isRTL()
         };
         if (!dojoConfig.isDebug) {
            params.etag = lang.getObject("ibmConfig.versionStamp");
         }
         var styleUrl = urlUtil.rewrite(urlUtil.getServiceUrl(servicesConfig.webresources) + "/web/_style", params);
         var styleLink = domConstruct.create("link", {
            rel : "stylesheet",
            id : "icStyle_" + id,
            href : styleUrl.toString()
         }, query("head")[0]);
      },
      /**
       * Removes a stylesheet by id. Note, this can only remove stylesheets
       * added by {@link #addStylesheet}
       * 
       * @param {String}
       *           id The module id of the stylesheet
       */
      removeStylesheet : function(id) {
         if (!id || !dom.byId("icStyle_" + id)) {
            // If no id provided, or the stylesheet doesn't exist, return silently
            return;
         }
         var link = dom.byId("icStyle_" + id);
         link.parentNode.removeChild(link);
      }
   };
});
