/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/has",
   "dojox/lang/functional"
], function (has, functional) {
   "use strict";

   var config = window.gatekeeperConfig || {};

   functional.forIn(config, function (value, key) {
      has.add(key, value);
   });

   return has;
});
