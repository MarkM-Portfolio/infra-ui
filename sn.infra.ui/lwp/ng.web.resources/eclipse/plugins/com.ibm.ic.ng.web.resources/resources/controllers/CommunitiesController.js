/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * IBM Connections Angular Communities controller
 * <p>
 * This is the main controller of the Angular Production application packaged as AMD.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.controllers.CommunitiesController
 */
define([
      'ng/main',
      '../directives/sidenav'
], function(angular) {
   'use strict';

   return [
         '$scope',
         '$http',
         function($scope, $http) {
            $scope.name = 'Maureen Leland';
            $scope.service = 'communities';
            $scope.$apply();
         }
   ];
});
