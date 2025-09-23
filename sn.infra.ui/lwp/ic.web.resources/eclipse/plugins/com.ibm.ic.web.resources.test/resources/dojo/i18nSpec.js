/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/i18n",
   "dojo/i18n!dojo/cldr/nls/gregorian",
   "dojo/i18n!dojo/nls/colors",
   "dojo/i18n!ic-core/nls/strings"
], function (dojo, i18n, i18ngregorian, i18ncolors, i18nstrings) {

   var nls_colors = i18n.getLocalization("dojo", "colors"),
   nls_cldr = i18n.getLocalization("dojo.cldr", "gregorian"),
   nls_lconn_core = i18n.getLocalization("lconn.core", "strings");
   describe("dojo.i18n.getLocalization", function() {
      it('can load AMD resource bundles in non-AMD code', function() {
         expect(nls_colors).not.toBeNull();
         expect(nls_cldr).not.toBeNull();
      });
      it('can load non-AMD resource bundles in non-AMD code', function() {
         expect(nls_lconn_core).not.toBeNull();
      });
   });

});
