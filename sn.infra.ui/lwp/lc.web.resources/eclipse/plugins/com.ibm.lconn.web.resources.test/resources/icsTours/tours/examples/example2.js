/* Copyright IBM Corp. 2016  All Rights Reserved.             */
/**
   * This module represents a Hopscotch tour object for
   * Communities Guided tour.
   */
    var tour =	{
	  	      id: "welcome_tour",
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
	  	    };
  // Start the tour!
  //hopscotch.startTour(tour);