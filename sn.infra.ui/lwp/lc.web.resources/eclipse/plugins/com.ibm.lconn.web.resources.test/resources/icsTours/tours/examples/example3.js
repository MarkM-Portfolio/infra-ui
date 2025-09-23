/* Copyright IBM Corp. 2016  All Rights Reserved.             */
  /**
   * This module represents a Hopscotch tour object for
   * Communities Guided tour.
   */
    var tour =     {
    	      id: "welcome_tour",
    	      customRenderer : 'bubble_ess_default',
    	      //showNavActions: true,
    	      arrowWidth: 20,
    	      showPrevButton: true,
    	      showProgress: true,
    	      steps: [
    	        {
    	          target: "lotusBannerProfiles",
    	          placement: "bottom",
    	          title: "This is profiles menu",
    	          content: "An unexamined life is not worth living.!"
    	        },
    	        {
    	          target: "lotusBannerApps",
    	          placement: "bottom",
    	          title: "Apps menu",
    	          content: "True knowledge exists in knowing that you know nothing."
    	        },
    	        {
      	          target: "editProfileButtonDiv",
      	          placement: "right",
      	          title: "Your profile picture",
      	          content: "Upload a profile picture here."
      	        },
    	        {
    	          target: "btn_actn__personCardSendEMail",
    	          placement: "bottom",
    	          title: "Send email",
    	          content: "To find yourself, think for yourself."
    	        },
    	        {
      	          target: "tabsWidget1_widgetId_moreActionsLink",
      	          placement: "left",
      	          title: "Small menu",
      	          content: "I cannot teach anybody anything, I can only make them think."
      	        }
    	      ]
    };
    // Start the tour!
    //hopscotch.startTour(tour);
