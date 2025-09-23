/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.config.features");

(function () {
   "use strict";

   lconn.core.config.features = function (key) {
      var config = window.gatekeeperConfig || {}; // This is inside the function to help with unit testing
      return config[key];
   };

   lconn.core.config.features.add = function () {
      console.warn("lconn.core.config.features cannot be used to access dojo/has");
   };
}());
