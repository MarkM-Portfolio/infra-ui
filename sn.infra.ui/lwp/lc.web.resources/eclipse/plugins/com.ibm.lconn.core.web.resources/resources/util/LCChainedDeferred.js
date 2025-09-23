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

dojo.provide("lconn.core.util.LCChainedDeferred");

dojo.require("lconn.core.util.LCDeferred");
dojo.require("lconn.core.util.promises");

(function(d, promises, LCDeferredCls) {
	/**
	 * Define promise interface
	 * 
	 * Wraps a promise object that could potentially return promises. Callers
	 * will only be called back via 'then()' once the inner promise chain has
	 * resolved.
	 */
	d.declare("lconn.core.util.LCChainedDeferred", promises.iFaceClass, {
		_promiseChain : null,
		_deferred : null,
		_errored : false,
		
		constructor : function(promiseChain) {
			this._deferred = new LCDeferredCls();
			this._promiseChain = promiseChain;
			this._hitch();
		},
		
		then : function (cb, ebk) {
			return this._deferred.then(cb, ebk);
		},
		
		cancel : function () {
			if (this._promiseChain.cancel) {
				return this._promiseChain.cancel.apply(this._promiseChain, arguments);
			}
			this._errback.apply(this, arguments);
		},
		
		_errback : function() {
			this._errored = true;
			var def = this._deferred;
			def.errback.apply(def.errback, arguments);
		},
		
		_callback : function(val) {
			if (!this._errored) {
				if (promises.isPromiseLike(val)) {
					this._promiseChain = val;
					this._hitch();
				} else {
					this._deferred.callback(val);
				}
			}
		},
		
		_hitch : function () {
			this._promiseChain.then(
				dojo.hitch(this, '_callback'),
				dojo.hitch(this, '_errback'));
		}
	});
}(dojo, lconn.core.util.promises, lconn.core.util.LCDeferred));
