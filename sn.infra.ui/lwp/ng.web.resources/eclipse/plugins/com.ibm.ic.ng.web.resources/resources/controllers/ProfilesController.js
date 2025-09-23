/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/*global define*/

/**
 * IBM Connections Angular Files controller
 * <p>
 * This is the main controller of the Angular Production application packaged as AMD.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.controllers.ProfilesController
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
            $scope.name = 'Tracy Rankin';
            $scope.service = 'profiles';
            $scope.$apply();
         }
   ];
});
