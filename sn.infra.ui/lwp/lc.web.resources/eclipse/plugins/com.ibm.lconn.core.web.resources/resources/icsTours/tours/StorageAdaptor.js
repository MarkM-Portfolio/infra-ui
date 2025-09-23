/* Copyright IBM Corp. 2016  All Rights Reserved.              */

define(['./Promise'],
		function(Promise) {

  var undef;

  /**
   * {Object} Default tour data for users who don't have any saved tour information
   */
  var DEFAULT_TOUR_DATA = {
    jitSeen: [],
    whatsNewSeen: [],
    lastGuidedTourTime: null
  };

  function StorageAdaptor() {
    /**
     * Storage item names
     */
    this.LAST_GUIDED_TOUR_TIME = 'lastGuidedTourTime';

    this.WHATS_NEW_SEEN = 'whatsNewSeen';

    this.JIT_TOURS_SEEN = 'jitSeen';
  }

  /**
   * This module uses local storage by default.
   * Consuming products can override the functions to use storage relevant to their product.
   */
  StorageAdaptor.prototype = {
    constructor: StorageAdaptor,

    /**
     * {Object} Contains tour related information for current user
     * e.g. IDs of tours that have been seen, and timestamp for last guided tour
     */
    tourData: null,

    /**
     * Initialize the storage adaptor, this loads the data from storage.
     * This function can be overwritten by consuming products to read from their relevant storage.
     */
    init: function() {
      var self = this;
      return this._loadTourData().then(function(data) {
        try {
          self.tourData = data ? JSON.parse(data) : DEFAULT_TOUR_DATA;
        } catch(err) {
          console.error('Error parsing tour data, caused by: %O', err);
          throw err;
        }
      }, function(err) {
        console.error('Failed to load tour data from storage');
        throw err;
      });
    },

    /**
     * Get an array of seen tours' IDs by tour type
     * @param {String} tourType - the tour type, must be ToursRegistryClass.JIT_TOUR or ToursRegistryClass.WHATS_NEW_TOUR
     * @return {Array.<String>} - an Array of seen tours' IDs or an empty array if there are no seen tours of the special type
     * @throws {Error} - if users seen tours cannot be read
     */
    getSeenTourIds: function(tourType) {
      var tourTypeAttr = this._mapTourTypeToAttr(tourType);
      var seenToursIds = this._getStorageItem(tourTypeAttr);
      return (!!seenToursIds && seenToursIds instanceof Array) ? seenToursIds : [];
    },

    /**
     * Add newly seen tour ID if it is not already stored
     * @param {Object} tour - the tour to be added
     */
    addSeenTourId: function(tour) {
      var tourType = tour.type;
      var tourId = tour.id;

      try {
        var seenToursIds = this.getSeenTourIds(tourType);
        var tourIndexInArray = seenToursIds.indexOf(tourId);

        if (tourIndexInArray === -1) {
          seenToursIds.push(tourId);
          var tourTypeAttr = this._mapTourTypeToAttr(tourType);
          this._addStorageItem(tourTypeAttr, seenToursIds);
        }
      } catch (err) {
        console.error('Unable to add seen tour id %s because %O', tourId, err);
      }
    },

    /**
     * Remove a tourId from the storage
     * @param {Object} tour - the tour to be removed
     */
    removeSeenTourId: function(tour) {
      var tourId = tour.id;
      var tourTypeAttr = this._mapTourTypeToAttr(tour.type);

      try {
        var seenToursIds = this.getSeenTourIds(tourTypeAttr);
        var tourIndexInArray = seenToursIds.indexOf(tourId);

        if (tourIndexInArray > -1) {
          seenToursIds.splice(tourIndexInArray, 1);
          this._addStorageItem(tourTypeAttr, seenToursIds);
        }
      } catch (err) {
        console.error('Unable to remove seen tour id %s because %O', tourId, err);
      }
    },

    /**
     * Remove all seen tours of the specified type from the storage
     * @param {String} tourType - the tour type, must be ToursRegistryClass.JIT_TOUR or ToursRegistryClass.WHATS_NEW_TOUR
     */
    removeSeenTours: function(tourType) {
      var tourTypeAttr = this._mapTourTypeToAttr(tourType);
      this._removeStorageItem(tourTypeAttr);
    },

    /**
     * Get the timestamp of when the user is last shown a guided tour programatically
     * @return {Date | null} - return a date if it is in the storage and could be parsed into a valid date,
     * otherwise return null if date not existed, return current timestamp if the timestamp in storage could not be parsed successfully.
     * @throws Throw an error if the lastGuidedTourTime returned could not be parsed into a valid date
     */
    getLastGuidedTourTime: function() {
      var lastGuidedTourTime = this._getStorageItem(this.LAST_GUIDED_TOUR_TIME);
      var parsedLastGuidedTourTime = null;
      if (!!lastGuidedTourTime) {
        try {
          parsedLastGuidedTourTime = new Date(lastGuidedTourTime);
          if (parsedLastGuidedTourTime == 'Invalid Date') {
            parsedLastGuidedTourTime = new Date();
            throw new Error('Failed to parse lastGuidedTourTime into valid date. Default to current time.');
          }
        } catch (e) {
          console.error('Failed to parse lastGuidedTourTime %O into format Date, with error: %O', lastGuidedTourTime, e);
        }
      }
      return parsedLastGuidedTourTime;
    },

    /**
     * Set the timestamp of when the user is last shown a guided tour progrmatically
     * @param {Date} timestamp - the timestamp of when the user is last shown a guided tour programatically
     */
    setLastGuidedTourTime: function(timestamp) {
      if (!timestamp || ! (timestamp instanceof Date) || timestamp == 'Invalid Date') {
        throw new Error('The parameter passed in is not a valid Date.');
      }

      this._addStorageItem(this.LAST_GUIDED_TOUR_TIME, timestamp);
    },

// All the code from this point on provide a default implementation of the storage adaptor
// which uses browser local storage. Implementors of a storage adaptor can use this code
// for reference purposes but these methods do not need to be implemented.

    /**
     * Map the tour type to its associated attribute in the storage
     * @param {String} tourType - the tour type, must be ToursRegistryClass.JIT_TOUR or ToursRegistryClass.WHATS_NEW_TOUR
     * @return {String} - the associated attribute in the storage
     */
    _mapTourTypeToAttr: function(tourType) {
      if (typeof tourType !== 'string') {
        throw new Error('The parameter passed in for storageAdaptor._mapTourTypeToAttr: ' + tourType + ' is not of type string');
      }

      var tourTypeAttr = tourType.replace('Tour', 'Seen');

      if ((tourTypeAttr !== this.JIT_TOURS_SEEN) && (tourTypeAttr !== this.WHATS_NEW_SEEN)) {
        throw new Error('The tour type passed in: ' + tourType + ' does not have an associated attribute in the storage');
      }

      return tourTypeAttr;
    },

    /**
     * Get value from storage by attribute.
     * @param {String} attr - the attribute's name
     * @return {Object} the attribute's associated value in the storage
     */
    _getStorageItem: function(attr) {
      if (!this.tourData) {
        throw new Error('tourData has not been loaded from the storage.');
      }
      if (attr === this.JIT_TOURS_SEEN || attr === this.WHATS_NEW_SEEN) {
        return (this.tourData[attr]) ? this.tourData[attr] : [];
      } else if (attr === this.LAST_GUIDED_TOUR_TIME) {
        return (this.tourData[attr]) ? this.tourData[attr] : null;
      } else {
        throw new Error('Unsupported storage item: ' + attr);
      }
    },

    /**
     * Add value to storage
     * @param {String} attr - the attribute's name
     * @param {Object} val - the value to be added into the storage
     */
    _addStorageItem: function(attr, val) {
      if (attr === this.JIT_TOURS_SEEN || attr === this.WHATS_NEW_SEEN || attr === this.LAST_GUIDED_TOUR_TIME) {
        if (this.tourData) {
          this.tourData[attr] = val;
        } else {
          throw new Error('Failed to add item: ' + attr + ' to tourData');
        }
      } else {
        throw new Error('Unsupported storage item: ' + attr);
      }
      this._saveTourData();
    },

    /**
     * Remove attribute with associated value from storage
     * @param {String} attr - the attribute's name
     */
    _removeStorageItem: function(attr) {
      if (attr === this.JIT_TOURS_SEEN || attr === this.WHATS_NEW_SEEN) {
        if (this.tourData && this.tourData[attr]) {
          this.tourData[attr] = [];
        } else {
          throw new Error(attr + ' not found in the tour data loaded');
        }
      } else if (attr === this.LAST_GUIDED_TOUR_TIME) {
        if (this.tourData && this.tourData[attr]) {
          this.tourData[attr] = null;
        } else {
          throw new Error(attr + ' not found in the tour data loaded');
        }
      } else {
        throw new Error('Unsupported storage item: ' + attr);
      }
      this._saveTourData();
    },

    /**
     * Check if the localStorage exists. If not, it throws an error.
     */
    _checkStorageExist: function() {
      if (typeof(Storage) == 'undefined') {
        throw new Error('Storage is undefined');
      }
    },

    /**
     * Load the tour data from local storage into this module
     * @return {Promise<Object>} - tour data stored in local storage
     */
    _loadTourData: function() {
      var promise = new Promise();

      try {
        this._checkStorageExist();
        var val = localStorage.getItem('tourData');
        promise.fulfilled(val);
      } catch (err) {
        console.error('Failed to get tour data from storage, caused by: %O', err);
        promise.rejected(err);
      }

      return promise;
    },

    /**
     * Save tour data to local storage
     * @return {Promise} - fulfilled or rejected promise indicating if the saving is done
     */
    _saveTourData: function() {
      var promise = new Promise();

      try {
        this._checkStorageExist();
        var value = JSON.stringify(this.tourData);
        localStorage.setItem('tourData', value);
        promise.fulfilled();
      } catch(err) {
        console.error('Failed to save tour data, caused by: %O', err);
        promise.rejected(err);
      }

      return promise;
    },
  };

  return StorageAdaptor;

});
