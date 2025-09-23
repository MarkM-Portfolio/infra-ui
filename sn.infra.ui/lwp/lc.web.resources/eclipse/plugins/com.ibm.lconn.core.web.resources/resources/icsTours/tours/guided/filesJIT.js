/* Copyright IBM Corp. 2017 All Rights Reserved.             */
define([ 'dojo/i18n!../nls/Tours' ], function(nls) {
  /**
   * This module represents a Hopscotch tour object for
   * Files Guided JIT tour.
   */
  var filesTour = {
    id : "jit-files",
    type : 'jitTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
      title : nls.getOrganizedTitle,
      content : nls.getOrganizedContent,
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 400,
      yOffset : 48,
      placement : "bottom"
    }, { 
      title : nls.findCreateFileTitle,
      content : nls.findCreateFileContent,
      target : "#lconn_files_action_createitem_0",
      placement : "left"
    }, { 
      title : nls.takeActionTitle,
      content : nls.takeActionContent,
      target : "#scene-title",
      placement : "right",
      yOffset : -40,
      xOffset : -8
    }, { 
      title : nls.getLatestTitle,
      content : nls.getLatestContent,
      target : ".lotusMenuSection a[href*='filesync']",
      placement : "bottom"
    }, { 
      title : nls.thanksForWatchingTitle,
      content : nls.thanksForWatchingContent,
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 240,
      yOffset : 88,
      placement : "bottom"
    } ],
  };
  return filesTour;
});
