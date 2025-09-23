/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for highway app
 * 
 * @module ic-highway-test.appSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([ "ic-highway/app"
], function(App) {
   describe('The highway app class', function() {
      var app;
      beforeEach(function() {
         app = new App();
      });
      it('implements the expected properties', function() {
         expect(app.contextRootPath).not.toBeNull();
         expect(app.settingsAPIPath).not.toBeNull();
      });
   });
});
