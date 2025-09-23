/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

dojo.provide("lconn.core.util.LCDeferred");

/**
 * Copy of dojo 1.6 dojo.deferred
 * 
 * NOTE: this will go away once we upgrade to Dojo 1.7+
 * 
 * @class
 */
(function(){
	var mutator = function(){};
	var freeze = Object.freeze || function(){};
	// A deferred provides an API for creating and resolving a promise.
	lconn.core.util.LCDeferred = function(/*Function?*/canceller){
		var result, finished, isError, head, nextListener;
		var promise = (this.promise = {});
		
		function complete(value){
			dojo.deprecated("lconn.core.util.LCDeferred", "Use dojo.Deferred instead", "5.0");
			if(!finished){
				result = value;
				finished = true;
				notify();
			}
		}
		function notify(){
			var mutated;
			while(!mutated && nextListener){
				var listener = nextListener;
				nextListener = nextListener.next;
				if((mutated = (listener.progress == mutator))){ // assignment and check
					finished = false;
				}
				var func = (isError ? listener.error : listener.resolved);
				if (func) {
					try {
						var newResult = func(result);
						if (newResult && typeof newResult.then === "function") {
							newResult.then(dojo.hitch(listener.deferred, "resolve"), dojo.hitch(listener.deferred, "reject"));
							continue;
						}
						var unchanged = mutated && newResult === undefined;
						if(mutated && !unchanged){
							isError = newResult instanceof Error;
						}
						listener.deferred[unchanged && isError ? "reject" : "resolve"](unchanged ? result : newResult);
					}
					catch (e) {
						listener.deferred.reject(e);
					}
				}else {
					if(isError){
						listener.deferred.reject(result);
					}else{
						listener.deferred.resolve(result);
					}
				}
			}
		}
		// calling resolve will resolve the promise
		this.resolve = this.callback = function(value){
			// summary:
			//		Fulfills the Deferred instance successfully with the provide value
			this.fired = 0;
			this.results = [value, null];
			complete(value);
		};
		
		
		// calling error will indicate that the promise failed
		this.reject = this.errback = function(error){
			// summary:
			//		Fulfills the Deferred instance as an error with the provided error
			isError = true;
			this.fired = 1;
			complete(error);
			this.results = [null, error];
			if(!error || error.log !== false){
				(dojo.config.deferredOnError || function(x){ console.error(x); })(error);
			}
		};
		// call progress to provide updates on the progress on the completion of the promise
		this.progress = function(update){
			// summary
			//		Send progress events to all listeners
			var listener = nextListener;
			while(listener){
				var progress = listener.progress;
				progress && progress(update);
				listener = listener.next;
			}
		};
		this.addCallbacks = function(/*Function?*/callback, /*Function?*/errback){
			this.then(callback, errback, mutator);
			return this;
		};
		// provide the implementation of the promise
		this.then = promise.then = function(/*Function?*/resolvedCallback, /*Function?*/errorCallback, /*Function?*/progressCallback){
			// summary:
			// 		Adds a fulfilledHandler, errorHandler, and progressHandler to be called for
			// 		completion of a promise. The fulfilledHandler is called when the promise
			// 		is fulfilled. The errorHandler is called when a promise fails. The
			// 		progressHandler is called for progress events. All arguments are optional
			// 		and non-function values are ignored. The progressHandler is not only an
			// 		optional argument, but progress events are purely optional. Promise
			// 		providers are not required to ever create progress events.
			//
			// 		This function will return a new promise that is fulfilled when the given
			// 		fulfilledHandler or errorHandler callback is finished. This allows promise
			// 		operations to be chained together. The value returned from the callback
			// 		handler is the fulfillment value for the returned promise. If the callback
			// 		throws an error, the returned promise will be moved to failed state.
			//
			// example:
			// 		An example of using a CommonJS compliant promise:
  			//		|	asyncComputeTheAnswerToEverything().
			//		|		then(addTwo).
			//		|		then(printResult, onError);
  			//		|	>44
			//
			var returnDeferred = progressCallback == mutator ? this : new lconn.core.util.LCDeferred(promise.cancel);
			var listener = {
				resolved: resolvedCallback,
				error: errorCallback,
				progress: progressCallback,
				deferred: returnDeferred
			};
			if(nextListener){
				head = head.next = listener;
			}
			else{
				nextListener = head = listener;
			}
			if(finished){
				notify();
			}
			return returnDeferred.promise;
		};
		var deferred = this;
		this.cancel = promise.cancel = function () {
			// summary:
			//		Cancels the asynchronous operation
			if(!finished){
				var error = canceller && canceller(deferred);
				if(!finished){
					if (!(error instanceof Error)) {
						error = new Error(error);
					}
					error.log = false;
					deferred.reject(error);
				}
			}
		};
		freeze(promise);
	};
	dojo.extend(lconn.core.util.LCDeferred, {
		addCallback: function (/*Function*/callback) {
			return this.addCallbacks(dojo.hitch.apply(dojo, arguments));
		},
	
		addErrback: function (/*Function*/errback) {
			return this.addCallbacks(null, dojo.hitch.apply(dojo, arguments));
		},
	
		addBoth: function (/*Function*/callback) {
			var enclosed = dojo.hitch.apply(dojo, arguments);
			return this.addCallbacks(enclosed, enclosed);
		},
		fired: -1
	});
})();