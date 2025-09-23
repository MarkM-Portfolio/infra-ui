/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Hello World directive
 * <p>
 * This directive prints a Hello World message.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @module ic-ng.directives.helloworld
 */
define([ 'ng/main',
         'ic-ui/TagCloud'
], function(angular, ICTagCloud) {
   'use strict';
   angular.module('ic-ng.directives.tagcloud', []).directive('tagcloud', NGTagCloud);

   function NGTagCloud() {
      var html = new ICTagCloud().domNode.innerHTML;

      var directive = {
         link : link,
         template : html,
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
