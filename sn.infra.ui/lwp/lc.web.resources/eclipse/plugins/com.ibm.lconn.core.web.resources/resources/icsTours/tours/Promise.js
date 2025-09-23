/* Copyright IBM Corp. 2013  All Rights Reserved.              */
/**
 * Promise implementation.
 */

define([], 
		function() {

  function Promise(response) {
    if (!(this instanceof Promise)) {
      throw new TypeError('Promise constructor cannot be called as a function.');
    }
    this._isRejected = false;
    this._isFulfilled = false;
    this._isCanceled = false;
    this._deferreds = null;
    this.response = null;
    this.error = null;

    if (response) {
      if (response instanceof Error) {
        this.rejected(response);
      } else {
        this.fulfilled(response);
      }
    } else {
      this._deferreds = [];
    }
  };

  Promise.prototype = {
    constructor: Promise,

    /*
     * Add new callbacks to the promise.
     */
    then: function(fulfilledHandler, errorHandler) {
      var promise = new Promise();
      if (this._isFulfilled) {
        this._fulfilled(fulfilledHandler, errorHandler, promise, this.data);
      } else if (this._isRejected) {
        this._rejected(errorHandler, promise, this.error);
      } else {
        this._deferreds.push([ fulfilledHandler, errorHandler, promise ]);
      }
      return promise;
    },

    /*
     * Inform the deferred it may cancel its asynchronous operation.
     */
    cancel: function(reason, strict) {
      this._isCanceled = true;
    },

    /*
     * Checks whether the promise has been resolved.
     */
    isResolved: function() {
      return this._isRejected || this._isFulfilled;
    },

    /*
     * Checks whether the promise is in the rejected state.
     */
    isRejected: function() {
      return this._isRejected;
    },

    /*
     * Checks whether the promise is in the fulfilled state.
     * true - fulfilled
     * false - not fulfilled
     */
    isFulfilled: function() {
      return this._isFulfilled;
    },

    /*
     * Checks whether the promise has been canceled.
     */
    isCanceled: function() {
      return this._isCanceled;
    },

    /*
     * Called if the promise has been fulfilled
     */
    fulfilled : function(data) {
      if (this._isCanceled) {
        return;
      }

      this._isFulfilled = true;
      this.data = data;

      if (this._deferreds) {
        while (this._deferreds.length > 0) {
          var deferred = this._deferreds.shift();
          var fulfilledHandler = deferred[0];
          var errorHandler = deferred[1];
          var promise = deferred[2];
          this._fulfilled(fulfilledHandler, errorHandler, promise, data);
        }
      }
    },

    /*
     * Call if the promise has been rejected
     */
    rejected : function(error) {
      if (this._canceled) {
        return;
      }

      this._isRejected = true;
      this.error = error;

      if (this._deferreds) {
        while (this._deferreds.length > 0) {
          var deferred = this._deferreds.shift();
          var errorHandler = deferred[1];
          var promise = deferred[2];
          this._rejected(errorHandler, promise, error);
        }
      }
    },

    _fulfilled : function(fulfilledHandler, errorHandler, promise, data) {
      if (fulfilledHandler) {
        try {
          var retval = fulfilledHandler(data);
          if (retval instanceof Promise) {
            retval.then(function(data) {
              promise.fulfilled(data);
            }, function(error) {
              promise.rejected(error);
            });
          } else {
            promise.fulfilled(retval);
          }
        } catch (error) {
          promise.rejected(error);
        }
      } else {
        promise.fulfilled(data);
      }
    },

    _rejected : function(errorHandler, promise, error) {
      if (errorHandler) {
        try {
          var retval = errorHandler(error);
          if (!retval) {
            // stop propogating errors
            promise.rejected(retval);
          }
        } catch (error1) {
          promise.rejected(error1);
        }
      } else {
        promise.rejected(error);
      }
    }
  };

  return Promise;

});