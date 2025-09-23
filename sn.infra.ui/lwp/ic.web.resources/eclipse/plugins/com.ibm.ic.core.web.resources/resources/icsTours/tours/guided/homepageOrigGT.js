/* Copyright IBM Corp. 2017 All Rights Reserved.             */
define([ 'dojo/i18n!../nls/Tours' ], function(nls) {
  /**
   * This module represents a Hopscotch tour object for
   * Connections Home Page tour.
   */
  var homepageOrigGT = {
    id : "guided-homepage",
    type : 'guidedTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
      title : nls.homepageWelcomeTitle,
      content : nls.homepageWelcomeContent,
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 200,
      yOffset : 48,
      placement : "bottom"
    }, {
      title : nls.EasyKeepUpTitle,
      content : nls.EasyKeepUpContent,
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 240,
      yOffset : 88,
      placement : "bottom"
    }, {
      title : nls.whatNeedsAttentionTitle,
      content : nls.whatNeedsAttentionContent,
      target : "#_atMentions",
      placement : "right"
    }, {
      title : nls.whatsImportantTitle,
      content : nls.whatsImportantContent,
      // unclear on what target is desired; using generic target for now
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 240,
      yOffset : 88,
      placement : "bottom"
    }, {
      title : nls.customizePageTitle,
      content : nls.customizePageContent,
      // unclear on what target is desired; using generic target for now
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 240,
      yOffset : 88,
      placement : "bottom"
    } ]
  };
  return homepageOrigGT;
});
