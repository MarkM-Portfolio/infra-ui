/* Portions Copyright IBM Corp. 2013, 2015   All Rights Reserved           */

/*
 * Portions copyright 2006, 2007 by Patrick Hunlock.
 * The example code and concepts, unless otherwise noted, are released into the public domain and may be used and modified without compensation or attribution.
 * http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
 */
(function() {
   dojo.provide("com.ibm.oneui.util.css");

   dojo.require("dojo.query");
   dojo.require("lconn.core.url");
   dojo.require("lconn.core.config.services");

   function isRTL() {
      return !dojo.isBodyLtr();
   }

   function fixSel(sel) {
      // Convert test string to lower case.
      sel = sel.toLowerCase();
      return sel;
   }

   function findRule(styleSheet, ruleName, deleteFlag) {
      var ii = 0; // Initialize subCounter.
      var cssRule = false; // Initialize cssRule. 
      do { // For each rule in stylesheet
         try {
             if (styleSheet.cssRules) { // Browser uses cssRules?
                 cssRule = styleSheet.cssRules[ii]; // Yes --Mozilla Style
             } else { // Browser usses rules?
                 cssRule = styleSheet.rules[ii]; // Yes IE style.
             } // End IE check.
         } catch (e) {
	       console.debug(e);
         }
         if (cssRule) { // If we found a rule...
            if (cssRule.imports) {
               var jj = 0;
               do {
                  var styleSheet = cssRule.imports[jj];
                  var found = findRule(styleSheet, ruleName, deleteFlag);
                  if (found) return found;
                  jj++; // Increment sub-counter
               } while (styleSheet)
            } else {
               try { // FIXME: try / catch added for debugging, remove
                  if (cssRule.selectorText && cssRule.selectorText.toLowerCase() == ruleName) { //  match ruleName?
                     if (deleteFlag == 'delete') { // Yes.  Are we deleteing?
                        if (styleSheet.cssRules) { // Yes, deleting...
                           styleSheet.deleteRule(ii); // Delete rule, Moz Style
                        } else { // Still deleting.
                           styleSheet.removeRule(ii); // Delete rule IE style.
                        } // End IE check.
                        return true; // return true, class deleted.
                     } else { // found and not deleting.
                        return cssRule; // return the style object.
                     } // End delete Check
                  } else if (cssRule.styleSheet) { // Rule is an @import statement
                     // Recursion
                     var found = findRule(cssRule.styleSheet, ruleName, deleteFlag);
                     if (found) return found;
                  } // End found rule name
               } catch (e) { // FIXME: try / catch added for debugging, remove
                  console.debug(e);
               }
            }
         } // end found cssRule
         ii++; // Increment sub-counter
      } while (cssRule); // end While loop
   }

   /**
    * CSS utility
    * @namespace com.ibm.oneui.util.css
    */
   var css = com.ibm.oneui.util.css = /** @lends com.ibm.oneui.util.css */ {
      /**
       * Finds a rule by selector
       * 
       * @param {String}
       *           ruleName The selector of the rule
       * @param {boolean}
       *           deleteFlag Set to true to delete the rule
       */
      getRule: function(ruleName, deleteFlag) { // Return requested style obejct
         ruleName = fixSel(ruleName); // Fix selector
         if (document.styleSheets) { // If browser can play with stylesheets
            for (var i = 0; i < document.styleSheets.length; i++) { // For each stylesheet
               var styleSheet = document.styleSheets[i]; // Get the current Stylesheet
               var found = findRule(styleSheet, ruleName, deleteFlag);
               if (found)
                  return found;
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
      deleteRule: function(ruleName) { // Delete a CSS rule   
         return this.getRule(ruleName, 'delete'); // just call getCSSRule w/delete flag.
      },
      // end killCSSRule
      /**
       * Adds a rule by selector
       * 
       * @param {String}
       *           ruleName The selector of the rule
       */
      addRule: function(ruleName) { // Create a new css rule
         if (document.styleSheets) { // Can browser do styleSheets?
            if (!this.getRule(ruleName)) { // if rule doesn't exist...
               if (document.styleSheets[0].addRule) { // Browser is IE?
                  document.styleSheets[0].addRule(ruleName, null, 0); // Yes, add IE style
               } else { // Browser is IE?
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
         if (!id || dojo.byId("icStyle_" + id)) {
            // If no id provided, or the stylesheet exists already, return silently
            return;
         }
         var params = {
            "include" : id,
            "rtl" : isRTL()
         };
         if (!dojo.config.isDebug) {
            params.etag = dojo.getObject("ibmConfig.versionStamp");
         }
         var styleUrl = lconn.core.url.rewrite(lconn.core.url.getServiceUrl(lconn.core.config.services.webresources) + "/web/_style", params);
         var styleLink = dojo.create("link", {
            rel : "stylesheet",
            id : "icStyle_" + id,
            href : styleUrl.toString()
         }, dojo.query("head")[0]);
      },
      /**
       * Removes a stylesheet by id. Note, this can only remove stylesheets
       * added by {@link #addStylesheet}
       * 
       * @param {String}
       *           id The module id of the stylesheet
       */
      removeStylesheet : function(id) {
         if (!id || !dojo.byId("icStyle_" + id)) {
            // If no id provided, or the stylesheet doesn't exist, return silently
            return;
         }
         var link = dojo.byId("icStyle_" + id);
         link.parentNode.removeChild(link);
      }
   };
})();