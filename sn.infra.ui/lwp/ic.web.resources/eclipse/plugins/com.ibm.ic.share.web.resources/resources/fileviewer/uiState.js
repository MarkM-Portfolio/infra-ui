/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/Stateful"
], function (Stateful) {
   "use strict";

   window.VIEWER_PANELS_DEFAULT_SIZE = 410;

   return new Stateful({
      panelSize: window.VIEWER_PANELS_DEFAULT_SIZE
   });
});