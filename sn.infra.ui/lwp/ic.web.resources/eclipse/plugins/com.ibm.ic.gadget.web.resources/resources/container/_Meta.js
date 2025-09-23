/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-core/config",
	"ic-core/config/services",
	"ic-core/util/LCChainedDeferred",
	"ic-core/util/LCDeferred",
	"./Meta",
	"../util/trace"
], function (declare, lang, config, services, LCChainedDeferred, LCDeferred, Meta, trace) {

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
		 Meta_._BASE_META_ = declare('', null, {
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
		Meta_._GADGET_Meta_ = declare('', Meta_._BASE_META_, {
			helpLinkRel:  "ibm.connections.help", // rel string for help link. Example:  <Link rel="ibm.connections.help" href="http://www.ibm.com"/>
		
			userPrefs: function() {
				return new LCChainedDeferred(this._getGadgetInfo(this._handle._widgetSpec.definitionUrl).then(lang.hitch(this, function(data) {
					var promise = new LCDeferred;
					promise.resolve(data[this._handle._widgetSpec.definitionUrl].userPrefs);
					return(promise);
					}),
					//error resolution
					lang.hitch(this, function(err) {
						var promise = new LCDeferred;
						promise.reject(err);
						return(promise);
					}))
				);
			},
			
			maxUrl: function() {
				
				return new LCChainedDeferred(this._getGadgetInfo(this._handle._widgetSpec.definitionUrl).then(lang.hitch(this, function(data) {
					var promise = new LCDeferred;
					promise.resolve(data[this._handle._widgetSpec.definitionUrl].modulePrefs.titleUrl);
					return(promise);
					}))
				);
			},
			
			helpLink: function() {
				return new LCChainedDeferred(this._getGadgetInfo(this._handle._widgetSpec.definitionUrl).then(lang.hitch(this, function(data) {
					var promise = new LCDeferred;
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
						helpServices = services.help;
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
				var promise = new LCDeferred ();
				return new LCChainedDeferred(	
					this._handle._accessor.getCommonContainer().then(lang.hitch(this, function (cc) {		
						cc.preloadGadget(url, lang.hitch(this, this._cb, promise, url));  // Wire in the promise object so we get it in the callback
						return(promise);
					}), lang.hitch(this, function(error) {
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
		 Meta_._WIDGET_Meta_ = declare('', Meta_._BASE_META_, {
		 
			userPrefs: function() {
				var promise = new LCDeferred();
				
				promise.resolve(null);
				return(promise);
			},
			
			maxUrl: function() {
				return new LCChainedDeferred(this._handle.getWidgetInfo().then(lang.hitch(this, function(wInfo) {
					var promise = new LCDeferred;
					var maxUrl = wInfo.getScopingInstance().getMaxUrl ? wInfo.getScopingInstance().getMaxUrl() : null;
					promise.resolve(maxUrl);
					return(promise);
				}))
			)},
			
			helpLink: function() {
				// TBD
				var promise = new LCDeferred;
				promise.resolve(null);
			}
		 });	 
		
	})(
	 dojo,
	 com.ibm.lconn.gadget.container._Meta,
	 trace,
	 LCChainedDeferred,
	 LCDeferred);
	
	return com.ibm.lconn.gadget.container._Meta;
});
