/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2017                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([ 'dojo/i18n!../nls/Tours' ], function(nls) {
  /**
   * This module represents a Hopscotch tour object for
   * Files Guided JIT tour.
   */
  var filesTour = {
    id : "jit-files-nov18",
    type : 'jitTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
      title : nls.seeWhereTitle,
      content : nls.seeWhereContent,
      target : "#recentview",
      placement : "bottom",
      xOffset: 16
    }, {
      title : nls.filterFilesTitle,
      content : nls.filterFilesContent,
      target : ".files-enable-refine-panel .toolActions",
      placement : "right",
      xOffset : -120,
      yOffset : -6
    }, {
      title : nls.findCreateFileTitle,
      content : nls.findCreateFileContent,
      target : "#lconn_files_action_createitem_0",
      placement : "bottom"
    }, {
      title : nls.takeActionTitle,
      content : nls.takeActionContent,
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 400,
      yOffset : 48,
      placement: "bottom"
    } ],
  };
  return filesTour;
});
