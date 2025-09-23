/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/has",
   "./AboutPanelFactory",
   "./CommentsPanelFactory",
   "./SharingPanelFactory",
   "./VersionPanelFactory",
   "../util/feature"
], function (has, AboutPanelFactory, CommentsPanelFactory, SharingPanelFactory, VersionPanelFactory, feature) {
   "use strict";

   if (feature.isTextNavEnabled()) {
      return [ CommentsPanelFactory, SharingPanelFactory, VersionPanelFactory, AboutPanelFactory ];
   }

   return [ AboutPanelFactory, CommentsPanelFactory, SharingPanelFactory, VersionPanelFactory ];
});
