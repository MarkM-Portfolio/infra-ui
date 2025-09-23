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
   * Connections Home Page (My Page) JIT tour.
   */
  var homepageMyPageJIT = {
    id : "jit-homepage-mypage",
    type : 'jitTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
    	title : nls.homepageWelcomeTitle,
    	content : nls.homepageWelcomeContent,
    	target : "#lotusBanner",
    	customData : {showArrow : "hide"},
    	xOffset : 360,
    	yOffset : 68,
    	placement : "bottom"
    }, {
    	title : nls.easyKeepUpTitle,
    	content : nls.easyKeepUpContent,
    	target : "#lotusBanner",
    	customData : {showArrow : "hide"},
    	xOffset : 380,
    	yOffset : 68,
    	placement : "bottom"
    }, {
    	title : nls.whatNeedsAttentionTitle,
    	content : nls.whatNeedsAttentionContent,
    	target : "#_atMentions",
    	placement : "right",
    	xOffset : -12,
    	yOffset : -8
    } ]
  };
  return homepageMyPageJIT;
});
