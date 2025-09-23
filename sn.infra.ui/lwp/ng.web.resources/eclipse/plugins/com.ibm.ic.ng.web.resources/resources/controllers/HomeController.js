/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * IBM Connections Angular Homepage controller
 * <p>
 * This is the controller of the Homepage of the Angular Test application
 * packaged as AMD.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.controllers.HomeController
 */
define([
      'ng/main',
      '../directives/helloworld'
], function(angular) {
   'use strict';

   function switchTheme() {
      require([ 'ic-core/theme'
      ], function(theme) {
         theme.switchTheme('red');
      });
   }

   return [
         '$scope',
         '$http',
         function($scope, $http) {
            $scope.switchTheme = switchTheme;

            $scope.name = 'Claudio Procida';

            $scope.developer = 'Maureen';

            $scope.service = 'homepage';

            $scope.fetch = function() {
               // Simple GET request example :
               $http.get('/web/ic-ng/data/name.json').success(function(data, status, headers, config) {
                  $scope.name = data.name;
               }).error(function(data, status, headers, config) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
               });
            }

            $scope.services = {
               homepage : true,
               files : true,
               profiles : true,
               communities : true,
               wikis : true
            };

            $scope._blankGif = dojoConfig.blankGif;

            // because this has happened asynchroneusly we've missed
            // Angular's initial call to $apply after the controller has been
            // loaded
            // hence we need to explicityly call it at the end of our Controller
            // constructor
            $scope.$apply();
         }
   ];
});
