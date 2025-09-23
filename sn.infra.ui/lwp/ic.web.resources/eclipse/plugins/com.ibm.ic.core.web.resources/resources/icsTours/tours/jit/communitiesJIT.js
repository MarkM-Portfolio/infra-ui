/* Copyright IBM Corp. 2017 All Rights Reserved.             */
define([ 'dojo/i18n!../nls/Tours' ], function(nls) {
  /**
   * This module represents a Hopscotch tour object for
   * Communities Guided JIT tour.
   */
  var communitiesJIT = {
    id : "jit-communities",
    type : 'jitTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
      steps : [ {
        title : nls.whatsACommunityTitle,
        content : nls.whatsACommunityContent,
        target : "#lotusBanner",
        customData : {showArrow : "hide"},
        xOffset : 300,
        yOffset : 120,
        placement : "bottom"
      }, {
        title : nls.whatCanIJoinTitle,
        content : nls.whatCanIJoinContent,
        target : "#lconn_communities_catalog_widgets_RecommendationsBox_0recommendTitle",
        placement : "left"
      }, {
        title : nls.whatColleaguesUpToTitle,
        content : nls.whatColleaguesUpToContent,
        target : "#toolbar_catalog_menu_allcommunities",
        placement : "right",
        yOffset : -40,
        xOffset : -8
      }, {
        title : nls.startOwnCommTitle,
        content : nls.startOwnCommContent,
        target : "#createPlaceButton",
        placement : "bottom"
      } ]
    };
  return communitiesJIT;
});
