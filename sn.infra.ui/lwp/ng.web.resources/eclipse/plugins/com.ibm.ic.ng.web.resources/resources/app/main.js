/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * IBM Connections Angular Test application
 * <p>
 * This is the main module of the Angular Test application packaged as AMD.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.app.test
 */
define([
      'ng/main',
      'ng-route/main',
      'ic-ng/controllers/main',
      'ic-ng/directives/helloworld',
      'ic-ng/directives/tagcloud',
      'ic-ng/directives/navbar',
      'ic-ng/directives/sidenav'
], function(angular) {
   'use strict';

   // Declare app level module which depends on filters, and services

   return angular.module('ic-ng.app.main', [
         'ngRoute',
         'ic-ng.controllers.main',
         'ic-ng.directives.helloworld',
         'ic-ng.directives.tagcloud',
         'ic-ng.directives.navbar',
         'ic-ng.directives.sidenav'
   ]).config([
         '$routeProvider',
         function($routeProvider) {
            $routeProvider.when('/homepage', {
               templateUrl : 'partials/homepage.html',
               controller : 'HomeController'
            });
            $routeProvider.when('/communities', {
               templateUrl : 'partials/communities.html',
               controller : 'CommunitiesController'
            });
            $routeProvider.when('/files', {
               templateUrl : 'partials/files.html',
               controller : 'FilesController'
            });
            $routeProvider.when('/profiles', {
               templateUrl : 'partials/profiles.html',
               controller : 'ProfilesController'
            });
            $routeProvider.otherwise({
               redirectTo : '/homepage'
            });
         }
   ]);

});
