/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Side Navigation directive
 * <p>
 * This directive produces the side navigation menu of Connections
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.directives.sidenav
 */
define([ 'ng/main'
], function(angular) {
   'use strict';
   angular.module('ic-ng.directives.sidenav', []).directive('sidenav', SideNavigation);

   function SideNavigation() {
      var directive = {
         link : link,
         templateUrl : 'partials/sidenav.html',
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
