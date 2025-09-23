/* Copyright IBM Corp. 2016  All Rights Reserved.             */
/**
   * This module represents a Hopscotch tour object for
   * Communities Guided tour.
   */
define(['dojo/_base/lang'], function(lang) {
    var tour = lang.mixin(lang.getObject('lconn.test.icsTour.tours.examples.example1', true), {
	  	      id: "welcome_tour",
	  	      type : 'guidedTour',
	  	      customRenderer : 'bubble_ess_default',
	  	      steps: [
	  	        {
	  	          target: "header",
	  	          placement: "bottom",
	  	          title: "This is the navigation menu",
	  	          content: "Use the links here to get around on our site!"
	  	        },
	  	        {
	  	          target: "content",
	  	          placement: "right",
	  	          title: "Your content ",
	  	          content: "Upload a content  here."
	  	        },
	  	        {
	  	          target: "footer",
	  	          placement: "bottom",
	  	          title: "Your footer",
	  	          content: "Upload a footer  here."
	  	        }
	  	      ]
	  	    });
    return tour;

});
  // Start the tour!
  //hopscotch.startTour(tour);