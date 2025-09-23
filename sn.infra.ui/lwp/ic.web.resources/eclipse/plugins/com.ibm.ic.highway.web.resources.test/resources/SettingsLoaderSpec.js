/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for highway SettingsLoader
 * 
 * @module ic-highway-test.SettingsLoaderSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([ "ic-highway/SettingsLoader"
], function(SettingsLoader) {
   describe('The highway SettingsLoader class', function() {
      var loader;
      beforeEach(function() {
         loader = new SettingsLoader();
      });
      it('implements the expected properties', function() {
         expect(loader.contextRootPath).not.toBeNull();
         expect(loader.settingsAPIPath).not.toBeNull();
         expect(loader.CURRENT_ORGANIZATION).toBe('00000000-0000-0000-0000-000000000001');
      });
   });
});
