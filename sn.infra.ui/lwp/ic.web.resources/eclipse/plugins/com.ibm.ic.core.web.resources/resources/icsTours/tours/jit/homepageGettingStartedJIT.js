/* Copyright IBM Corp. 2017 All Rights Reserved.             */
define([ 'dojo/i18n!../nls/Tours' ], function(nls) {
  /**
   * This module represents a Hopscotch tour object for
   * Connections Home Page (Getting Started) JIT tour.
   */
  var homepageGettingStartedJIT = {
    id : "jit-homepage-getting-started",
    type : 'jitTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
      title : nls.homepageWelcomeTitle,
      content : nls.homepageWelcomeContent,
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 260,
      yOffset : 68,
      placement : "bottom"
    }, {
      title : nls.haveLookAroundTitle,
      content : nls.haveLookAroundContent,
      target : "#gettingStart_tablist_dijit_layout_ContentPane_1",
      placement : "right",
      xOffset : 12
    }, {
      title : nls.whatNeedsAttentionTitle,
      content : nls.whatNeedsAttentionContent,
      target : "#_atMentions",
      placement : "right",
      xOffset : -12,
      yOffset : -8
    }, {
      title : nls.whatsImportantTitle,
      content : nls.whatsImportantContent,
      target : ".lconnHomepageMyPage",
      placement : "right",
      xOffset : -12,
      yOffset : -8
    } ]
  };
  return homepageGettingStartedJIT;
});
