/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.container._Meta");

dojo.require('com.ibm.lconn.gadget.container.Meta');

dojo.require('com.ibm.lconn.gadget.util.trace');

dojo.require('lconn.core.config.services');

dojo.require('lconn.core.util.LCChainedDeferred');
dojo.require('lconn.core.util.LCDeferred');


/**
 * Implementations for Meta interface
 * @name com.ibm.lconn.gadget.container._Meta
 * @extends com.ibm.lconn.gadget.container.Meta
 * @class 
 */


(function(
 dojo,
 Meta_,
 trace_,
 LCChainedDeferred_,
 LCDeferred_) 
{	
	/**
	 * Meta implementation base class
	 * @private
	 * @class
	 * @extends com.ibm.lconn.gadget.container.Meta
	 */
	 Meta_._BASE_META_ = dojo.declare('', null, {
	 		_handle: null,
	
		constructor: function(handle) {
			this._handle = handle;
		}
	 });
	 
	 
	/**
	 * OS Gadget Implementation
	 * @private
	 * @class
	 * @extends com.ibm.lconn.gadget.container.Meta
	*/
	Meta_._GADGET_Meta_ = dojo.declare('', [Meta_._BASE_META_], {
		helpLinkRel:  "ibm.connections.help", // rel string for help link. Example:  <Link rel="ibm.connections.help" href="http://www.ibm.com"/>
	
		userPrefs: function() {
			return new lconn.core.util.LCChainedDeferred(this._getGadgetInfo(this._handle._widgetSpec.definitionUrl).then(dojo.hitch(this, function(data) {
				var promise = new lconn.core.util.LCDeferred;
				promise.resolve(data[this._handle._widgetSpec.definitionUrl].userPrefs);
				return(promise);
				}),
				//error resolution
				dojo.hitch(this, function(err) {
					var promise = new lconn.core.util.LCDeferred;
					promise.reject(err);
					return(promise);
				}))
			);
		},
		
		maxUrl: function() {
			
			return new lconn.core.util.LCChainedDeferred(this._getGadgetInfo(this._handle._widgetSpec.definitionUrl).then(dojo.hitch(this, function(data) {
				var promise = new lconn.core.util.LCDeferred;
				promise.resolve(data[this._handle._widgetSpec.definitionUrl].modulePrefs.titleUrl);
				return(promise);
				}))
			);
		},
		
		helpLink: function() {
			return new lconn.core.util.LCChainedDeferred(this._getGadgetInfo(this._handle._widgetSpec.definitionUrl).then(dojo.hitch(this, function(data) {
				var promise = new lconn.core.util.LCDeferred;
				var helpLink = null;
				
				// See if there are is a help link
				//
				var helpLinks = data[this._handle._widgetSpec.definitionUrl].modulePrefs.links;
				if (typeof(helpLinks) != "undefined") {
					var helpLink = helpLinks[this.helpLinkRel];
					if (typeof(helpLink) != "undefined") {
						helpLink = helpLink.href;
					}
				}
				if ((typeof(helpLink) != "undefined") && helpLink != null) {
					// Replace {help} context
					helpServices = lconn.core.config.services.help;
					if (helpServices != null) {
						if (helpServices.secureEnabled) {
							helpurl = helpServices.secureUrl;
						}
						else {
							helpurl = helpServices.url;
						}
						// Repalce help endpoint
						helpLink = helpLink.replace("endpoint://help",helpurl);
					}
				}
				promise.resolve(helpLink);
				return(promise);
				}))
			);
		},
	
		_getGadgetInfo: function(url) {
			var promise = new lconn.core.util.LCDeferred ();
			return new lconn.core.util.LCChainedDeferred(	
				this._handle._accessor.getCommonContainer().then(dojo.hitch(this, function (cc) {		
					cc.preloadGadget(url, dojo.hitch(this, this._cb, promise, url));  // Wire in the promise object so we get it in the callback
					return(promise);
				}), dojo.hitch(this, function(error) {
					trace_.error("Error (", error, ") while getting gadget metadata from: ", url);
					promise.reject(err); 
					return(promise);
				})));		
		},

		// Callback used by common container preloadGadget().
		//
		_cb: function(promise, url, metaData) {
			if (promise != null) {
				if (typeof(metaData[url].error) != "undefined") {
					promise.reject('Error while getting gadget metadata from:  ' + url);
				}
				else {
					promise.resolve(metaData);
				}
			}
		}
	 });
	
	
	
	/**
	 * IWidget Implementation
	 * @private
	 * @class
	 * @extends com.ibm.lconn.gadget.container.Meta
	*/
	 Meta_._WIDGET_Meta_ = dojo.declare('', [Meta_._BASE_META_], {
	 
		userPrefs: function() {
			var promise = new lconn.core.util.LCDeferred();
			
			promise.resolve(null);
			return(promise);
		},
		
		maxUrl: function() {
			return new lconn.core.util.LCChainedDeferred(this._handle.getWidgetInfo().then(dojo.hitch(this, function(wInfo) {
				var promise = new lconn.core.util.LCDeferred;
				var maxUrl = wInfo.getScopingInstance().getMaxUrl ? wInfo.getScopingInstance().getMaxUrl() : null;
				promise.resolve(maxUrl);
				return(promise);
			}))
		)},
		
		helpLink: function() {
			// TBD
			var promise = new lconn.core.util.LCDeferred;
			promise.resolve(null);
		}
	 });	 
	
})(
 dojo,
 com.ibm.lconn.gadget.container._Meta,
 com.ibm.lconn.gadget.util.trace,
 lconn.core.util.LCChainedDeferred,
 lconn.core.util.LCDeferred);
