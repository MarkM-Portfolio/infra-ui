/* Copyright IBM Corp. 2016  All Rights Reserved.             */
define(['dojo/_base/lang'], function(lang){
  /**
   * This module represents a Hopscotch tour object for
   * Communities Guided tour.
   */
  var commsTour = lang.mixin(lang.getObject('lconn.test.icsTour.tours.guided.commsGT', true), {
    id : "guided-comms",
    type : 'guidedTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
      title : "What's a Community?",
      content : "A community is a hub where you can share content and ideas. You can collaborate with your team or with people who share a common interest.",
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 200,
      yOffset : 48,
      placement : "bottom"
    }, { 
      title : "What can I join?",
      content : "Recommended communities identify communities your colleagues are part of. If you see one you like, click it. You can also search for communities to join.",
      target : "#lconn_communities_catalog_widgets_RecommendationsBox_0recommendTitle",
      placement : "left"
    }, { 
      title : "What are my colleagues up to?",
      content : "Your organization's view lists all of the public communities you can join. Browse for a community that interests you.",
      target : "#toolbar_catalog_menu_allcommunities",
      placement : "right",
      yOffset : -40,
      xOffset : -8
    }, { 
      title : "Start your own community!",
      content : "Don\'t see what you need? Start a community so that you can share and collaborate with others.",
      target : "#createPlaceButton",
      placement : "bottom"
    }, { 
      title : "Thanks for watching!",
      content : "Take this or other tours at any time from the Guided Tours option on the Help menu.",
      target : '#bsscom-helpMenu',
      placement : 'bottom',
      xOffset : -212,
      arrowOffset : 218,
      yOffset : -8
    } ],
  });
  return commsTour;
});
