/* Copyright IBM Corp. 2016  All Rights Reserved.              */
/**
 * This module handle the adding, removing, and retrieving of the tours passed down from the application.
 */

define([],
		function() {

  function ToursRegistryClass() {
    if (!(this instanceof ToursRegistryClass)) {
      throw new TypeError('ToursRegistryClass constructor cannot be called as a function.');
    }

    /**
     * Tour types
     */
    this.GUIDED_TOUR = 'guidedTour';

    this.JIT_TOUR = 'jitTour';

    this.WHATS_NEW_TOUR = 'whatsNewTour';

    /**
     * {Array} An array storing all the tours passed down by the appliaction.
     */
    this.tours = [];

    this.listeners = [];
  };

  ToursRegistryClass.prototype = {
    constructor: ToursRegistryClass,

    /**
     * Let other modules add a listener to listen to changes in the tours array
     * @param {Function} listener - callback functions to handle changes in the tours array
     */
    addListener: function(listener) {
      if (typeof listener !== 'function') {
        throw new Error('The listener passed in is not a function.');
      }
      this.listeners.push(listener);
    },

    /**
     * Send notification to modules that have registered a callback with toursRegistry
     */
    notifyListeners: function() {
      for (var i = 0; i < this.listeners.length; i++) {
        try {
          this.listeners[i](this.tours);
        }
        catch (e) {
          console.error('toursRegistry fails to notify listener with error: ' + e);
        }
      }
    },

    /**
     * Store all tours passed in by the applicaiton into the toursRegistry,
     * @param {Object | Array} tours - A tour definition or an array of tour definitions
     */
    addTours: function(tours) {
      if (tours.constructor === Array){
        for (var i = 0; i < tours.length; i++){
          this._addSingleTour(tours[i]);
        }
      } else {
        this._addSingleTour(tours);
      }
      this.notifyListeners();
    },

    /**
     * Get a particular tour's content by ID
     * @param {String} tourID - the ID of the tour to be retrieved
     * @return {Object} - the tour definition
     */
    getTourById: function(tourId) {
      var toursArray = this.tours;
      for (var i = 0; i < toursArray.length; i++) {
        if (toursArray[i].id === tourId) {
          return toursArray[i];
        }
      }
      return null;
    },

    /**
     * Get all registered tours.
     * @return {Array} tours - An array of registered tours.
     */
    getAllTours: function() {
      return this.tours;
    },

    /**
     * Removes single tour from the registry
     * @param {String} tourId - ID of the tour object to be removed
     * @return {Object} the tour definition that got removed, otherwise return null
     */
    removeTourById: function(tourId) {
      var index = this._getTourIndexById(tourId);
      if (index > -1) {
        var removedTour = this.tours.splice(index, 1);
        this.notifyListeners();
        return removedTour[0];
      }
      return null;
    },

    /**
     * Get a tour array of particular tour type
     * @param {String} tourType - the value of the 'type' key in the tour object
     * @return {Array} An array containing all the tours of the particular tourType
     */
    getToursByType: function(tourType) {
      var returnedTours = [];
      var tours = this.tours;
      for (var i = 0; i < tours.length; i++) {
        if (tours[i].type && tours[i].type === tourType) {
          returnedTours.push(tours[i]);
        }
      }
      return returnedTours;
    },

    /**
     * This private function is called by addTours to add one tour into the Registry
     * @param {Object} tour - One tour definition
     */
    _addSingleTour: function(tour) {
      this._validateTour(tour);
      this.tours.push(tour);
    },

    /**
     * Validates the tour being registered. Valid tour:
     * - Valid id.
     * - Valid type ('jitTour', 'whatsNewTour').
     * - Not previously registered.
     * - At least one step.
     * - First step of What's New tour should not have an onPrev.
     * - Last step of What's New tour should not have an onNext.
     *
     * @param {Object} tour - tour definition.
     * @throws Throws an error if tour is invalid.
     */
    _validateTour: function(tour) {
      if(!tour.id || typeof tour.id !== 'string' || tour.id.trim().length === 0) {
        throw new Error('Invalid tour id: ' + tour.id);
      } else if (tour.steps.length === 0) {
        throw new Error('Invalid tour steps: ' + tour.id);
      } else if (!tour.type || typeof tour.type !== 'string') {
        throw new Error('Invalid tour type: ' + tour.type + ' for tour: ' + tour.id);
      } else if (tour.type === this.WHATS_NEW_TOUR && tour.steps[0].onPrev) {
        throw new Error('First step of tour: ' + tour.id + ' should not have onPrev');
      } else if (tour.type === this.WHATS_NEW_TOUR && tour.steps[tour.steps.length - 1].onNext) {
        throw new Error('Last step of tour: ' + tour.id + ' should not have onNext');
      } else if (([this.JIT_TOUR, this.WHATS_NEW_TOUR, this.GUIDED_TOUR].indexOf(tour.type) === -1)) {
        throw new Error('Invalid tour type: ' + tour.type + ' for tour: ' + tour.id);
      } else if (this.getTourById(tour.id) !== null) {
        throw new Error('Tour: ' + tour.id + ' already exists');
      } else if (this._tourStepsHaveOnShow(tour.steps)) {
        throw new Error('Steps of tour: ' + tour.id + ' should not have onShow');
      }
    },

    /**
     * Return true if any steps have onShow defined
     * @param steps - Array of tour steps
     * @returns {Boolean} - True if any steps have onShow defined and otherwise false
     */
    _tourStepsHaveOnShow: function(steps) {
      if (!steps) {
        return false;
      }
      for (var i = 0; i < steps.length; i++) {
        if (steps[i].onShow){
          return true;
        }
      }
      return false;
    },

     /**
      * Find out index of the tour with ID tourID in the tours array in toursReigstry
      * @param {String} tourId - ID of the tour object to be removed
      * @return {Int} the index of the tour in the array; -1 if tour not found in the array
      */
    _getTourIndexById: function(tourId){
      var index = -1;
      for (var i = 0; i < this.tours.length; i++) {
        if (this.tours[i].id && (this.tours[i].id === tourId)){
          index = i;
        }
      }
      return index;
    }
  };

  return ToursRegistryClass;

});
