/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Hello World directive
 * <p>
 * This directive prints a Hello World message.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.directives.helloworld
 */
define([ 'ng/main'
], function(angular) {
   'use strict';
   angular.module('ic-ng.directives.helloworld', []).directive('helloworld', HelloWorld);

   function HelloWorld() {
      var directive = {
         link : link,
         templateUrl : 'partials/helloworld.html',
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
