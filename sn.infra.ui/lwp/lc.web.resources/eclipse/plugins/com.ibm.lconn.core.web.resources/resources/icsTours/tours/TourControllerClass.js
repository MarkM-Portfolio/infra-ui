/* Copyright IBM Corp. 2016  All Rights Reserved.              */

define([
  'dojo/_base/declare',
  'dojo/_base/kernel',
  'dojo/_base/lang',
  'dojo/has',
  'dojo/on',
  'dojo/topic',
  'dojo/query',
  './ToursManagerClass',
  'dojo/i18n!./nls/ToursUI',
  // guided tour definitions
  './guided/homepageOrigGT',
  './guided/homepageOrigJIT'
], function(declare,
	kernel,
	lang,
	has,
    on,
    topic,
    query,
    ToursManagerClass,
    nls,
    homepageOrigGT,
    homepageOrigJIT) {

  /**
   * A TourControllerClass
   *
   * This class loads all Verse tours and registers them using the ICS Tour's tourRegistry.
   * Provides a public API for ICS Tour's code.
   */
  var TourControllerClass = declare(null, {
    /** {String} version number of the What's New Tour, based on iteration */
    whatsNewTourVersion: 'i84',

    /** {String} URL for help link to What's New when there are no What's New tours available */
    _whatsNewHelpUrl: '',

    /** {Object} common translations shared by all tour definitions */
    _i18n: {
      stepNums: null,
      nextBtn: nls.nextBtn,
      prevBtn: nls.prevBtn,
      doneBtn: nls.doneBtn,
      skipBtn: nls.skipBtn,
      closeTooltip: nls.closeTooltip,
      nextBtnDisabled: nls.nextBtnDisabled,
      prevBtnDisabled: nls.prevBtnDisabled,
      tourAriaLabel: nls.tourAriaLabel,
      tourThisStepAriaLabel: nls.tourThisStepAriaLabel
    },

    /** @private {ics/tours/ToursManagerClass} Private reference to ICS Tour's ToursManagerClass instance.*/
    _toursManager: null,

    /**
     * Initialization method which loads tours for Connections and registers all tours when navbar is loaded.
     * @return {Promise} - Returns a promise of a "Removeable".
     * @override BaseControllerClass
     */

    init: function(){
        this._toursManager = new ToursManagerClass();
    },

    /**
     * Register the specified tours and include the required i18n configuration.
     */
    registerTours: function() {
      var tours = [];
      // Guided tours
      homepageOrigGT && tours.push(homepageOrigGT);
      homepageOrigJIT && tours.push(homepageOrigJIT);
      this.addTours(tours);
    },

    /**
     * Add tours into the toursRegistry
     * @param {Object | Array} tours - A tour definition or an array of tour definitions
     */
    addTours: function(tours) {
      this._toursManager.addTours(tours);
    },

    /**
     * Get registered tours from toursRegistry
     * @return {Array} tours - An array of tour definitions
     */
    getTours: function() {
      return this._toursManager.toursRegistry.getAllTours();
    },

    /**
     * Start a tour by ID.
     * @param {String} tourId - The defined tour ID.
     */
    startTour: function(tourId) {
    	var tour = this.getTourById(tourId);
    	if(!tour) {
    		console.warn('Tour with id %s could not be found', tourId);
    		return;
    	}

      if(tour.type === 'jitTour' && window.location.href.indexOf('skip-jit-tours=1') > -1) {
        console.warn('JIT tour with id %s tour is being skipped', tourId);
        return;
      }

      if(this._toursManager) {
    	  var timestamp = new Date();
    	  this._toursManager.storageAdaptor.init();
    	  if(tour.type === "guidedTour"){
    		  // Play the tour if it hasn't been played before
    		  if(!this._toursManager.storageAdaptor.getLastGuidedTourTime()){
    			  this._toursManager.startTour(tourId);
    			  this._toursManager.storageAdaptor.setLastGuidedTourTime(timestamp);
    		  }
    	  }else{
    		  this._toursManager.startTour(tourId);
    	  }
      }
    },

    /**
     * End a tour by ID.
     * @param {String} tourId - The defined tour ID.
     */
    endTour: function(tourId) {
      var tour = this.getTourById(tourId);
      if(!tour) {
        console.warn('Tour with id %s could not be found', tourId);
        return;
      }

      this._toursManager.endTour(tourId);
    },

    /**
     * Remove a tour by ID.
     * @param {String} tourId - The defined tour ID.
     * @return {Object} the tour definition that got removed, otherwise returns null.
     */
    removeTourById: function(tourId) {
      return this._toursManager.removeTourById(tourId);
    },

    /**
     * Get a tour array of particular tour type
     * @param {String} tourType - the value of the 'type' key in the tour object
     * @return {Array} An array containing all the tours of the particular tourType
     */
    getToursByType: function(tourType) {
      return this._toursManager.toursRegistry.getToursByType(tourType);
    },

    /**
     * Retrieve a tour by ID.
     * @param {String} tourId - The defined tour ID.
     * @return {Object} the tour definition, otherwise returns undefined.
     */
    getTourById: function(tourId) {
      var tour;
      if(this._toursManager) {
        tour = this._toursManager.getTourById(tourId);
      }
      return tour;
    },

    /**
     * Clear history of seen just-in-time and whats new tours.
     */
    clearSeenTours: function() {
      this._toursManager.clearSeenTours();
    },

    /**
    * Clear all tours or clear tours by specified type.
    * @param {String} (optional) - 3 types:
    * 'guidedTour', 'jitTour', 'whatsNewTour'.
    * If no type is provided, then all tours are cleared.
    */
    clearTours: function(type) {
      this._toursManager.clearTours(type);
    },

    /**
     * Get an array of seen tours' IDs by tour type
     * @param {String} tourType - the tour type, must be 'jitTour' or 'whatsNewTour'
     * @return {Array.<String>} - an Array of seen tours' IDs or an empty array if there are no seen tours of the special type
     */
    getSeenTourIds: function(tourType) {
      return this._toursManager.storageAdaptor.getSeenTourIds(tourType);
    }

  });

  return TourControllerClass;
});
