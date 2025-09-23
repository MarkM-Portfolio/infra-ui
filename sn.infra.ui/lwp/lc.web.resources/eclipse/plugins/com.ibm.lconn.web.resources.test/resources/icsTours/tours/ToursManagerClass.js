/* Copyright IBM Corp. 2016  All Rights Reserved.              */
/**
 * This module is the API entry point for the application that wants to use the icsTours.
 * It allows the applicaiton to add tours, remove tours, start tours.
 * It also handles updating navbar notification and chaining What's New tours.
 */

define(['./toursRegistry', './StorageAdaptor', './hopscotch'],
		function (toursRegistry, StorageAdaptor, hopscotch) {

  var undef;

  /**
   * @param {Object} args - optional customised modules to overwrite the default storageAdaptor and toursRegistry. eg. {storageAdaptor: myStorageAdaptor}
   */
  function ToursManagerClass(args) {
    this.toursRegistry = args && args.toursRegistry || toursRegistry;
    this.storageAdaptor = args && args.storageAdaptor || new StorageAdaptor();
    this.locale = args && args.locale || (navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage)).substring(0,2);
    this.i18n = args && args.i18n || {};
    this.isRtl = args && args.isRtl || false;
    this.whatsNewHelpUrl = args && args.whatsNewHelpUrl || '';
    this.hopscotch = args && args.hopscotch || hopscotch;
    var self = this;

    /**
     * A listener to handle updating the navbar red icon and the tour badge number when new what's new tours are added
     */
    var listener = function() {
      self._updateWhatsNewTours(true);
      self._updateGuidedTours();
    };

    /**
     * Register the listener with toursRegistry to receive changes related to adding or removing tours
     * @param {Function} listener - a callback function to handle changes in the toursRegistry
     */
    this.toursRegistry.addListener(listener);

    /**
     * Add a step show listener which will add support to:
     * 1. close each bubble using escape
     * 2. focus guided and whats new tours
     */
    var showListener = function() {
      self._onShow();
    };
    this.hopscotch.listen('show', showListener);
  }

  ToursManagerClass.prototype = {
    /** Constructor of the ToursManagerClass */
    constructor: ToursManagerClass,

    /**
     * A module handling the adding, removing, and retrieving of the tours passed down from the application
     */
    toursRegistry: undef,

    /**
     * A module handling interaction with the backend storage
     */
    storageAdaptor: undef,

    /**
     * {String} - the locale of the user
     */
    locale: undef,

    /**
     * {Object} - translation for shared ics-tours components
     */
    i18n: undef,

    /**
     * {Boolean} - if the user's UI is a right-to-left language
     */
    isRtl: undef,

    /**
     * {String} - URL for what's new help topic
     */
    whatsNewHelpUrl: undef,

    /**
     * Add tours into the toursRegistry, and update what's new tours
     * @param {Object | Array} tours - A tour definition or an array of tour definitions
     */
    addTours: function (tours) {
      for(var i=0; i<tours.length; i++){
        if (tours[i].type !== this.toursRegistry.WHATS_NEW_TOUR) {
          this._setTourI18n(tours[i]);
        }
      }
      this.toursRegistry.addTours(tours);
    },

    /**
     * Removes single tour from the registry, and update what's new tours if relevant
     * @param {String} tourId - ID of the tour object to be removed
     * @return {Object} removedTour - the tour definition that get removed from the registry
     */
    removeTourById: function (tourId) {
      return this.toursRegistry.removeTourById(tourId);
    },

    /**
     * Retrieves a single tour from the registry
     * @param {String} tourId - ID of the tour object to be retrieved
     * @return {Object} tour - the tour definition that for the associated tour id or undefined if tour with that id does not exist
     */
    getTourById: function (tourId) {
      return this.toursRegistry.getTourById(tourId);
    },

    /**
     * Pass the tour through decision tree unless skipDecisionTree is true, then start or skip the tour based on return value from the decisionTree.
     * All tours are currently started by calling this method, except what's new tours.
     * @param {String} tourId - the tour ID
     * @param {Boolean} skipDecisionTree - if the guidedTour is started by user click and should always be shown
     */
    startTour: function (tourId, skipDecisionTree) {
      var tour = this.toursRegistry.getTourById(tourId);
      if (!tour) {
        throw new Error('The tour for tourId: "' + tourId + '" could not be found.');
      }

      var shouldShowTour = true;
      if (!skipDecisionTree) {
        shouldShowTour = this._shouldShowTour(tour);
      }
      if (shouldShowTour) {
        this._dispatchShowTourEvent(tour);
        if (this.hopscotch.getCurrTour()) {
          this.hopscotch.endTour();
        }
        this.hopscotch.startTour(tour);
      }
    },

    /**
     * Starts What's New tour array. Called from the What's New tour event handler.
     * @param {Object} args - optional argument that may contain bubbleWidth and/or customRenderer.
     */
    startWhatsNewTour: function(args) {
      var whatsNewTour = this._buildWhatsNewTour(args);
      this._dispatchShowTourEvent(whatsNewTour);
      var startingStep = this._initWhatsNewTourStartStep(whatsNewTour);
      if (this.hopscotch.getCurrTour()) {
        this.hopscotch.endTour();
      }
      this.hopscotch.startTour(whatsNewTour, startingStep);
    },

    /**
     * Clear history of seen just-in-time and whats new tours.
     * Used by setting to allow users to reset seen tours for testing purposes.
     */
    clearSeenTours: function() {
      this.storageAdaptor.removeSeenTours(toursRegistry.WHATS_NEW_TOUR);
      this.storageAdaptor.removeSeenTours(toursRegistry.JIT_TOUR);
      this._updateWhatsNewTours(true);
    },

    /**
     * Clear all tours or clear tours by specified type.
     * @param {String} (optional) - 3 types:
     * 'guidedTour', 'jitTour', 'whatsNewTour'.
     * If no type is provided, then all tours are cleared.
     */
    clearTours: function(type) {
      var tours = undef;
      if(type) {
        tours = this.toursRegistry.getToursByType(type);
      } else {
        tours = this.toursRegistry.getAllTours();
      }

      for(var i = tours.length; i > 0; i--) {
        this.toursRegistry.removeTourById(tours[i - 1].id);
      }
    },

    /**
     * Add event listeners for any tour links that are included in a 
     * step with step.customData.guidedLinks.
     * Checks toursRegistry and hides link if tour is not available.
     * For available tours, adds event listeners to start the tour.
     */
    _addGuidedTourLinkListener: function() {
      var self = this;

      var tourLinks = document.getElementsByClassName('ics-tours guided-links');
      if (tourLinks.length > 0) {
        for (var i=0; i<tourLinks.length; i++) {
          var thisTourLink = tourLinks[i].id;
          var thisTour = this.getTourById(thisTourLink);
          if (!thisTour) {
            tourLinks[i].parentNode.setAttribute('class','hide');
          } else {
            // add the event listeners for each link
            (function(thisTourLink) {
              tourLinks[i].addEventListener('click', function(event) {
                event.stopPropagation();
                event.preventDefault();
                self.startTour(thisTourLink, true);
              }, false);
              tourLinks[i].addEventListener('keydown', function(event) {
                if (event.keyCode == 13) {
                  event.stopPropagation();
                  event.preventDefault();
                  self.startTour(thisTourLink, true);
                }
              }, false);
            })(thisTourLink);
          }
        }
      }
    },

    /**
     * Add event listeners for tab stops to control looping of forward and backtabs.
     * These work with empty divs in the bubble_ess_default template with tabindex settings
     * of 2, 3, and 8.  These settings work with the following event listeners to produce
     * forward tab order of next-close-links-prev and backtab order of prev-links-close-next.
     */
    _addTabListeners: function() {
      // catches forward tab and loops to start
      var elEndTabLoop = document.getElementById('loop-tab-8');
      if (elEndTabLoop) {
        elEndTabLoop.addEventListener('focus', function() {
          document.querySelector('#loop-tab-2').focus();
        }, false);
      }

      // start tab for forward loop
      var elForwardTabLoop = document.getElementById('loop-tab-2');
      if (elForwardTabLoop) {
        elForwardTabLoop.addEventListener('focus', function() {
          document.querySelectorAll('#next-enabled, .hopscotch-bubble-close')[0].focus();
        }, false);
      }

      // catches back tab and loops to end
      var elBackTabLoop = document.getElementById('loop-tab-3');
      if (elBackTabLoop) {
        elBackTabLoop.addEventListener('focus', function() {
          document.querySelectorAll('#prev-enabled, .hopscotch-content a:last-of-type, .hopscotch-bubble-close')[0].focus();
        }, false);
      }
    },

    /**
     * Add an event listener for the ESC key to a bubble and adding focus to a bubble.
     */
    _addEscListener: function() {
      var self = this;
      var handleKeydown = function(evt) {
        if (evt.keyCode == 27) {
          evt.stopPropagation();
          evt.preventDefault();
          self.hopscotch.endTour();
        }
      };

      var elements = document.getElementsByClassName('hopscotch-bubble-container');
      if (elements.length > 0) {
        elements[0].addEventListener('keydown', handleKeydown, false);
        var tour = this.hopscotch.getCurrTour();
        if (tour.type === this.toursRegistry.GUIDED_TOUR || tour.id === 'whats-new') {
          elements[0].focus();
        }
      }
    },

    /**
     * Add event listeners for a11y when bubble shows
     */
    _onShow: function() {
      this._addEscListener();
      this._addGuidedTourLinkListener();
      this._addTabListeners();

      // Add role attribute to main hopscotch div to address accessibility issue
      var elementsHopBubble = document.getElementsByClassName('hopscotch-bubble');
      if (elementsHopBubble.length) {
        elementsHopBubble[0].setAttribute('role','presentation');
      }
    },

    /**
     * Initialises the specified whats new tour so that the onStart from the first unseen step is called when
     * the whats new tour is started. The index of the first step to be displayed is returned.
     * @param {Object} wntour - Aggregated What's New tour.
     * @return {Number} startingStep - the step number on which the What's New tour should start.
     */
    _initWhatsNewTourStartStep: function(wntour) {
      var startingStep = 0;
      try {
        var seenTourIds = this.storageAdaptor.getSeenTourIds(this.toursRegistry.WHATS_NEW_TOUR);
        var tours = this.toursRegistry.getToursByType(this.toursRegistry.WHATS_NEW_TOUR);
        if(seenTourIds.length === 0) {
          return startingStep;
        }
        var tour = null;

        for(var i = 0; i < wntour.steps.length; i++) {
          var subTourId = wntour.steps[i].tourId;
          if(subTourId) {
            tour = this.toursRegistry.getTourById(subTourId);
            if (!this._isTourSeen(tour, seenTourIds)) {
              wntour.onStart = tour.onStart;
              startingStep = i;
              break;
            }
          }
        }
      } catch (err) {
        console.error('Unable initialise whats new tour with first step because %O', err);
      }

      return startingStep;
    },

    /**
     * Check if a tour has already been seen.
     * @param {Object} tour - the tour we need to check.
     * @param {Array} tourIds - seen tour ids.
     * @return {Boolean} true if the tour is seen / false otherwise.
     */
    _isTourSeen: function(tour, tourIds) {
      if(!tourIds) {
        try {
          tourIds = this.storageAdaptor.getSeenTourIds(tour.type);
        } catch (err) {
          console.error('Unable to check has a tour already been seen because %O', err);
          return true;
        }
      }

      return tourIds.indexOf(tour.id) > -1;
    },

    /**
     * Decide if we should show a just-in-time tour or potentially a guided tour
     * @param {Object} tour - The tour definition
     * @return {Boolean} True if we should show the tour, False otherwise
     */
    _shouldShowTour: function(tour) {
      var tourType = tour.type;
      if (!tourType) {
        throw new Error('Tour with id ' + tour.id + ' has no tourType.');
      }
      if (tourType === this.toursRegistry.JIT_TOUR) {
        return this._shouldShowJitTour(tour);
      } else if (tourType === this.toursRegistry.GUIDED_TOUR){
    	  return true;
      } else {
        return false;
      }
    },

    /**
     * Decide if we should show a just-in-time tour
     * @param {Object} tour - just-in-time tour definition
     * @return {Boolean} True if the tour should be shown, otherwise False
     */
    _shouldShowJitTour: function(tour) {
      var tourSeen = this._isTourSeen(tour);
      if (!tourSeen) {
        this.storageAdaptor.addSeenTourId(tour);
      }
      return !tourSeen;
    },

    /**
     * Firing an event to show the 'Guided Tours' link in the help menu.
     */
    _updateGuidedTours: function() {
      var self = this;
      var guidedTour = this.toursRegistry.getToursByType(toursRegistry.GUIDED_TOUR);
      if(guidedTour.length === 0) {
        return;
      }

      var updateGuidedTours = this._createCustomEvent('updateGuidedTours', {
        detail: {
          node: 'guided-tours',
          eventHandler: function(e) {
            setTimeout(function() {
              self.startTour(guidedTour[0].id, true);
            }, 0);
          },
          eventName: 'guidedTours'
        },
        bubbles: false,
        cancelable: true
      });

      this._dispatchCustomTourEvent(updateGuidedTours, false);
    },

    /**
     * Update the unseen what's new tours count by pulling in information from the backend
     * @param {Array} - An array of all the what's new tours available
     * @return {Integer} - The number of unseen what's new tours
     */
    _computeUnseenWhatsNewCount: function(whatsNewArray) {
      if (!whatsNewArray || whatsNewArray.constructor !== Array) {
        throw new Error('The parameter passed in needs to be of type Array.');
      }

      if (whatsNewArray.length === 0) {
        return 0;
      }

      var unseenWhatsNewCount = 0;

      try {
        var currentSeenWhatsNewIds = this.storageAdaptor.getSeenTourIds(toursRegistry.WHATS_NEW_TOUR);
        for (var i = 0; i < whatsNewArray.length; i++) {
          var tour = whatsNewArray[i];

          var hasSeen = currentSeenWhatsNewIds.indexOf(tour.id) > -1;

          if (!hasSeen) {
            unseenWhatsNewCount += tour.steps.length;
          }
        }
      } catch (err) {
        console.error('Unable to compute the whats new unseen tour count because %O', err);
      }

      return unseenWhatsNewCount;
    },

    /**
     * Create a custom event for the What's New / Guided Tour link.
     * @param {String} name - The name of the Custom Event. 'updateWhatsNewTours' or 'updateGuidedTours'
     * @param {Object} data - The Custom Event data.
     * @return {Event} evt - The Custom Event.
     */
    _createCustomEvent: function(name, data) {
      var evt;
      if(typeof window.CustomEvent !== 'function') {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(name, data.bubbles, data.cancelable, data.detail);
      } else {
        evt = new CustomEvent(name, data);
      }
      return evt;
    },

    /**
     * Firing an event with the updated tour list and time stamp for the navbar
     * @param {Boolean} showIcon - shall there be a red dot at the help menu
     */
    _updateWhatsNewTours: function(showIcon) {
      var whatsNewArray = this.toursRegistry.getToursByType(toursRegistry.WHATS_NEW_TOUR);
      var whatsNewUrl = this.whatsNewHelpUrl;
      if(whatsNewArray.length === 0) {
        if (whatsNewUrl.length === 0) {
          return;
          } else {
            var self = this;
            showIcon = false;

            var updateWhatsNewTours = this._createCustomEvent('updateWhatsNewTours', {
              detail: {
                node: 'whatsnew-tours',
                replacedNode: 'whatsnew',
                showIcon: showIcon,
                count: unseenWhatsNewCount,
                eventHandler: function(e) {
                  setTimeout(function() {
                    window.open(whatsNewUrl, '_blank', 'resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0');
                    }, 0);
                },
                eventName: 'whatsNewTours'
              },
              bubbles: false,
              cancelable: true
              });
            };

        //add whatsnew tours to help menu
        } else {
          var unseenWhatsNewCount = this._computeUnseenWhatsNewCount(whatsNewArray);
          var self = this;

          if (unseenWhatsNewCount === 0) {
            showIcon = false;
          }

          var updateWhatsNewTours = this._createCustomEvent('updateWhatsNewTours', {
            detail: {
              node: 'whatsnew-tours',
              replacedNode: 'whatsnew',
              showIcon: showIcon,
              count: unseenWhatsNewCount,
              eventHandler: function(e) {
                setTimeout(function() {
                  self.startWhatsNewTour();
                }, 0);
              },
              eventName: 'whatsNewTours'
            },
            bubbles: false,
            cancelable: true
          });
        }

      this._dispatchCustomTourEvent(updateWhatsNewTours, true);
    },

    /**
     * Check for and wait for either Whats New Tours or Guided Tours menu item to appear
     * then dispatch the CustomEvent to it.
     * @param {Object} evt - the CustomEvent that will need to be dispatched.
     * @param {Boolean} whatsNew - true if What's New tour, false if Guided Tour.
     * @throws Throws an error if Whats New / Guided Tour link was not found.
     */
    _dispatchCustomTourEvent: function(evt, whatsNew) {
      var nodeSelector = whatsNew ? 'a.whatsnew-tours' : 'a.guided-tours';
      var count = 0;
      var link = document.querySelector(nodeSelector);
      if(link) {
        link.dispatchEvent(evt);
      }
    },

    /**
     * Dispatch an event indicating the tour with the specified id is being shown.
     * @param {Object} tour - the tour definition of the tour that is being shown.
     */
    _dispatchShowTourEvent: function(tour) {
      var showTourEvent = this._createCustomEvent('showTour', {
        detail: {
          eventName: 'showTour',
          tourId: tour.id,
          tourType: tour.type
        },
        bubbles: true,
        cancelable: true
      });

      document.dispatchEvent(showTourEvent);
    },

    /**
     * Dispatch an event indicating the tour with the specified id is being closed.
     */
    dispatchCloseTourEvent: function() {
      var tour = this.hopscotch.getCurrTour();
      var stepNum = this.hopscotch.getCurrStepNum();
      var tourId = (tour.id === 'whats-new') ? tour.subTourId : tour.id;
      var tourType = (tour.id === 'whats-new') ? this.toursRegistry.WHATS_NEW_TOUR : tour.type;
      var closeTourEvent = this._createCustomEvent('closeTour', {
        detail: {
          eventName: 'closeTour',
          tourId: tourId,
          tourType: tourType,
          stepNum: stepNum + 1,
          totalSteps: tour.steps.length
        },
        bubbles: true,
        cancelable: true
      });

      document.dispatchEvent(closeTourEvent);
    },

    /**
     * Updates the seen list of tours in storage once the first step of a tour is displayed for the user.
     */
    _markWhatsNewTourAsSeen: function() {
      var currentTour = hopscotch.getCurrTour();
      var currentStepNum = hopscotch.getCurrStepNum();
      var currTourId = currentTour.steps[currentStepNum].tourId;
      var tour = this.toursRegistry.getTourById(currTourId);

      if(tour) {
        currentTour.subTourId = tour.id;
        this.storageAdaptor.addSeenTourId(tour);
        this._dispatchShowTourEvent(tour);
      }
    },

    /**
     * Calls the current step's tour onEnd.
     */
    _closeTour: function() {
      var currentTour = hopscotch.getCurrTour();
      var tour = this.toursRegistry.getTourById(currentTour.subTourId);

      if (tour && tour.onEnd) {
        tour.onEnd();
      }
    },

    /**
     * Aggregates an array of tour objects into one single
     * tour object.
     * @param {Array} tourArr - Sorted What's New tour array.
     * @param {Object} args - optional argument that may contain bubbleWidth and/or customRenderer.
     * @return {Object} aggregateWhatsNewTour - Aggregated What's New tour object.
     */
    _aggregateWhatsNewTour: function(tourArr, args) {
      var whatsNewOnStart;
      var bubbleWidth = args && args.bubbleWidth || 260;
      var customRenderer = args && args.customRenderer || 'bubble_ess_default';

      if(tourArr[0].onStart) {
        whatsNewOnStart = tourArr[0].onStart;
      }

      var self = this;

      var whatsNewOnShow = function() {
        self._markWhatsNewTourAsSeen();
        self._onShow();
      };

      var whatsNewOnEnd = function() {
        self.dispatchCloseTourEvent();
        self._closeTour();
        self._updateWhatsNewTours(false);
      };

      var whatsNewEndStart = function(end, start) {
        return function() {
          end();
          start();
        };
      };

      var aggregateWhatsNewTour = {
        id: 'whats-new',
        customRenderer: customRenderer,
        bubbleWidth: bubbleWidth,
        subTourId: tourArr[0].id,
        i18n: this.i18n,
        steps: [],
        onStart: whatsNewOnStart,
        onClose: whatsNewOnEnd
      };

      for (var i = 0; i < tourArr.length; i++) {
        for(var n = 0; n < tourArr[i].steps.length; n++) {
          var tourStep = tourArr[i].steps[n];
          var isFirstStepOfTour = (n === 0);
          var isLastStepOfTour = (n === tourArr[i].steps.length - 1);
          var tourId = undef;
          var onNext = undef;
          var onPrev = undef;
          var onShow = undef;

          if(isLastStepOfTour) {
            if(tourArr[i + 1] && tourArr[i + 1].onStart && tourArr[i].onEnd) {
              var tourOnStart = tourArr[i + 1].onStart;
              var tourOnEnd = tourArr[i].onEnd;
              onNext = whatsNewEndStart(tourOnEnd, tourOnStart);
            } else if (tourArr[i + 1] && tourArr[i + 1].onStart) {
              onNext = tourArr[i + 1].onStart;
            } else if (tourArr[i].onEnd) {
              onNext = tourArr[i].onEnd;
            }
          }

          if(isFirstStepOfTour) {
            tourStep.tourId = tourArr[i].id;
            tourStep.onShow = whatsNewOnShow;
            if(tourArr[i - 1] && tourArr[i - 1].onStart && tourArr[i].onEnd) {
              var tourOnStart = tourArr[i - 1].onStart;
              var tourOnEnd = tourArr[i].onEnd;
              onPrev = whatsNewEndStart(tourOnEnd, tourOnStart);
            } else if(tourArr[i - 1] && tourArr[i - 1].onStart) {
              onPrev = tourArr[i - 1].onStart;
            } else if (tourArr[i].onEnd) {
              onPrev = tourArr[i].onEnd;
            }
          }

          if(onNext) {
            tourStep.onNext = onNext;
          }

          if(onPrev) {
            tourStep.onPrev = onPrev;
          }

          aggregateWhatsNewTour.steps.push(tourStep);
        }
      }

      this._setTourI18n(aggregateWhatsNewTour);

      return aggregateWhatsNewTour;
    },

    /**
     * Passes an array of sorted What's New tours to _aggregateWhatsNewTour() and returns the
     * final What's New tour object.
     * @param {Object} args - optional argument that may contain bubbleWidth and/or customRenderer.
     * @throws Throws an error if there are no Whats New tours.
     * @return {Object} whatsNewTour - What's New tour object.
     */
    _buildWhatsNewTour: function(args) {
      var tours = this.toursRegistry.getToursByType(toursRegistry.WHATS_NEW_TOUR);
      if (tours.length === 0){
        throw new Error('No What\'s New tours available.');
      }
      var whatsNewTour = this._aggregateWhatsNewTour(tours, args);
      return whatsNewTour;
    },

    /**
     * Set shared i18n and isRtl attribute for the individual tour definition
     * and assign the stepNums if locale is Arabic.
     * @param {Object} tour - tour definition
     */
    _setTourI18n: function(tour) {
      if (this.isRtl) {
        tour.isRtl = this.isRtl;
      }
      tour.i18n = (JSON.parse(JSON.stringify(this.i18n)));
      tour.i18n.stepNums = this._generateI18nStepNumsArr(tour.steps);
    },

    /**
     * Generates stepNums array that contains a list of strings to be shown as the step numbers.
     * Currently, special treatment is performed for Arabic locale only. In all other cases - numerals ('1', '2', '3', etc.) will be used by default.
     * @param {Array} steps - input array of steps
     * @return {Array} generated stepNums array
     */
    _generateI18nStepNumsArr: function(steps) {
      if (this.locale != 'ar')
        return;
      var n = steps.length;
      var resultArr=[];
      for (var i=0; i<n; i++){
        resultArr[i]=String.fromCharCode(i+0x0660+1);
      }
      return resultArr;
    }
  };

  return ToursManagerClass;

});
