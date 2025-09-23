/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.dojo.i18nSpec");

dojo.require("dojo.i18n");
dojo.requireLocalization("dojo", "colors");
dojo.requireLocalization("dojo.cldr", "gregorian");
dojo.requireLocalization("lconn.core", "strings");

(function(i18n) {
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
}(dojo.i18n));
