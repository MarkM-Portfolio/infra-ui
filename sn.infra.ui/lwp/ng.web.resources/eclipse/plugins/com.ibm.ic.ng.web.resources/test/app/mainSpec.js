/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Jasmine spec for test application
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng-test.app.testSpec
 */
define([
      'ng/main',
      'ng-mocks/main',
      'ic-ng/app/main'
], function(angular, angularMocks, app) {

   describe('the angular test app module', function() {
      it('exists', function() {
         expect(app).toBeDefined();
      });
   });

   describe('the angular test app', function() {
      beforeEach(angularMocks.module('ic-ng.app.test'));

      it('routes correctly', function() {
      // TODO:
      });
   });
});
