/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('lconn.core.util.promises');

dojo.require('lconn.core.util.LCDeferred');
dojo.require('lconn.core.util.LCDeferredList');

(function(promises, d, LCDeferred, LCDeferredList) {
	
	/**
	 * An interface that represents the promise interface contract
	 * 
	 * @class
	 */
	promises.iFaceClass = d.declare('', null, {
		then : function(){},
		cancel : function(){}
	});
	
	/**
	 * Method to test if a particular object abides to the promises interface.
	 * 
	 * @memberOf lconn.core.util.promises
	 * @name isPromiseLike
	 * @function
	 * @public
	 * @param {Object} The object to check.
	 * @returns {Boolean}
	 */
	promises.isPromiseLike = function(obj) {
		if (obj && (obj.then && d.isFunction(obj.then)) /*&& (obj.cancel && d.isFunction(obj.cancel))*/) {
			return true;
		} else {
			return false
		}
	};
	
	/**
	 * Helper method to upgrade a 1.4 dojo.Deferred to an LCCeferred (the backport of 1.6 dojo.Deferred)
	 * 
	 * @memberOf lconn.core.util.promises
	 * @name deferredToPromise
	 * @function
	 * @public
	 * @param {Object} The deferred object to upgrade to a promise.
	 * @returns {Object} A promise object.
	 */
	promises.deferredToPromise = function(deferred) {
		if (promises.isPromiseLike(deferred)) {
			return deferred;
		} else {
			var p = new LCDeferred();
			
			deferred.addCallback(p, "callback");
			deferred.addErrback(p, "errback");
			
			return p;
		}
	};
	
})
(lconn.core.util.promises, 
 dojo,
 lconn.core.util.LCDeferred,
 lconn.core.util.LCDeferredList);
