/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * IBM Connections Angular Test controllers
 * <p>
 * A collection of controllers of the Angular Test application packaged as AMD.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.controllers.test
 */
define([ 'ng/main'
], function(angular) {
   'use strict';
   /* Controllers */
   return angular.module('ic-ng.controllers.main', [])
   // More involved example where controller is required from an external file
   .controller('HomeController', [
         '$scope',
         '$injector',
         function($scope, $injector) {
            require([ 'ic-ng/controllers/HomeController'
            ], function(controller) {
               /*
                * injector method takes an array of modules as the first
                * argument if you want your controller to be able to use
                * components from any of your other modules, make sure you
                * include it together with 'ng' Furthermore we need to pass on
                * the $scope as it's unique to this controller
                */
               $injector.invoke(controller, this, {
                  '$scope' : $scope
               });
            });
         }
   ]).controller('CommunitiesController', [
         '$scope',
         '$injector',
         function($scope, $injector) {
            require([ 'ic-ng/controllers/CommunitiesController'
            ], function(controller) {
               $injector.invoke(controller, this, {
                  '$scope' : $scope
               });
            });
         }
   ]).controller('FilesController', [
         '$scope',
         '$injector',
         function($scope, $injector) {
            require([ 'ic-ng/controllers/FilesController'
            ], function(controller) {
               $injector.invoke(controller, this, {
                  '$scope' : $scope
               });
            });
         }
   ]).controller('ProfilesController', [
         '$scope',
         '$injector',
         function($scope, $injector) {
            require([ 'ic-ng/controllers/ProfilesController'
            ], function(controller) {
               $injector.invoke(controller, this, {
                  '$scope' : $scope
               });
            });
         }
   ]);
});
