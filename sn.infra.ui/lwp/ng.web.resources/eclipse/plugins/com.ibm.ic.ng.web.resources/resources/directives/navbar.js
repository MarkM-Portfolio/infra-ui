/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Navbar directive
 * <p>
 * This directive produces a navigation bar.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.directives.navbar
 */
define([ 'ng/main'
], function(angular) {
   'use strict';
   angular.module('ic-ng.directives.navbar', []).directive('navbar', NavBar);

   function NavBar() {
      var directive = {
         link : link,
         templateUrl : 'partials/navbar.html',
         /**
          * Restricts usage of directive to specific selectors
          * <ul>
          * <li>E: element</li>
          * <li>A: attribute</li>
          * <li>C: class</li>
          * </ul>
          */
         restrict : 'E'
      };
      return directive;
   }

   function link(scope, element, attr) {
      console.dir(arguments);
   }
});
