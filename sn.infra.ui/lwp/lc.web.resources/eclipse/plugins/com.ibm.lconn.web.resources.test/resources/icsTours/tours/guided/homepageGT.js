/* Copyright IBM Corp. 2016  All Rights Reserved.             */
define(['dojo/_base/lang', '../nls/ToursUI'], function(lang, nls){
  /**
   * This module represents a Hopscotch tour object for
   * Connections Home Page tour.
   */
  var homepageTour = lang.mixin(lang.getObject('lconn.test.icsTour.tours.guided.homepageGT', true), {
    id : "guided-homepage",
    type : 'guidedTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
      //assuming we'd have already assembled the string with username replacement and retrieved it all from Tours.js nls 
      title : "Welcome, {username}!",
      content : "Your home page is your command center, where you can focus on important updates and see items that need your attention.",
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 200,
      yOffset : 48,
      placement : "bottom"
    }, { 
      title : "It's easy to keep up!",
      content : "Scan your homepage to stay on top of updates that you care about. View the latest blog posts and activity and community updates.",
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 240,
      yOffset : 88,
      placement : "bottom"
    }, { 
      title : "What needs your attention?",
      content : "Use the filters to see who is mentioning your name, to view other notifications, and to see items that need action.",
      target : "#_atMentions",
      placement : "right"
    }, { 
    }, { 
      title : "What's important to you?",
      content : "Move or remove views from your page to get the look and content you want.",
      // unclear on what target is desired; using generic target for now
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 240,
      yOffset : 88,
      placement : "bottom"
    }, { 
      title : "Customize your page",
      content : "Add apps to your home page so you can track just what you want from one place.",
      // unclear on what target is desired; using generic target for now
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 240,
      yOffset : 88,
      placement : "bottom"
    }, { 
      title : "Ready...Set...Collaborate!",
      content : "Use collaborative apps to engage with your colleagues and be more productive.",
      //Note - customData that supports links to start other guided tours; support included in ics-tours 1.0.7. 
      customData : {showArrow : 'hide', guidedLinks : [[nls.filesTitle,'guided-files'],[nls.commsTitle,'guided-comms']]},
      target : "#lotusBanner",
      xOffset : 200,
      yOffset : 48,
      placement : "bottom"
    } ],
  });
  return homepageTour;
});
