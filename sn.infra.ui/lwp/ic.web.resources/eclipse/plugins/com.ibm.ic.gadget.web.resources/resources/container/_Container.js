/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./Container",
	"ic-core/util/promises",
	"ic-core/util/LCDeferred",
	"./Accessor",
	"ic-core/util/LCChainedDeferred",
	"./Handle",
	"./_Handle",
	"../services/people_container",
	"../util/specHelper",
	"../util/trace"
], function (array, declare, lang, Container, promises, LCDeferred, Accessor, LCChainedDeferred, Handle, _Handle, people_container, specHelper, trace) {

	(function init_com_ibm_lconn_gadget_container_Container(
	 trace_,
	 specHelper_,
	 Handle_)
	{
		var instance_ = null,
			normalizeWidgetSpec_ = specHelper_.normalizeWidgetSpec,
			cloneSpec_ = specHelper_.cloneSpec;
		
		/**
		 * Container implementation
		 * @private
		 * @class
		 * @extends com.ibm.lconn.gadget.container.Container
		 */
		var Container_ = declare('', Container, {
			_accessor : null,
			
			constructor : function (accessor) {
				this._accessor = accessor;
			},
			
			loadWidgets : function(widgetSpecs) {
				trace_.debug("Container's loadWidgets called");
	
				var accessor = this._accessor;
	
				if (widgetSpecs && lang.isArray(widgetSpecs)) {
					var idx = widgetSpecs.length, promise = null;
					var widgetSpecsCpy = [];
					var widgetHandles = [];
					var widgetPromises = []; // uses DOM node as index
	
					while (idx--) {
						widgetSpecsCpy[idx] = cloneSpec_(normalizeWidgetSpec_(widgetSpecs[idx]));
						trace_.debug("_CONTAINER 1 widgetSpecs[idx].placement:  ", widgetSpecs[idx].placement);
					}
	
					/**
					 * Test for load success
					 */
					function loadTest(iRuntime, widgetRefArray) {
						array.forEach(widgetRefArray, function(widgetRef, i) {
							var id = null;
							if ( widgetRef.widgetObject.domId ) {
							   id = widgetRef.widgetObject.domId;
							} else {
							   id = widgetRef.widgetObject.getDomId();
							}
							var promise = widgetPromises[id]; // Depends on promise array being in same order as widgetRefArray.
							if (widgetRef.isError()) {
								var err = widgetRef.getError();
								trace_.error('Error (', widgetRef.getError().message, ') while loading widget: ', widgetRef);
								
								promise.errback(widgetRef.getError());
							}
							else {
								promise.callback(iRuntime);
							}
						});
					}
	
					/**
					 * Error out each widget handle
					 */
					function failLoad(widgetRefArray) {
						trace_.error('Error while loading widgets: ', widgetSpecs);
						array.forEach(widgetRefArray, function(widgetRef, i) {
							var promise = widgetPromises[i]; // Depends on promise array being in same order as widgetRefArray.
							promise.errback(widgetRefArray);
						});
					}
					
					/**
					 * Get the dom ID from the spec.placements
					 */
					function getDomId(placement) {
					   if (placement && placement.id) {
					      return placement.id;
					   }

					   if (lang.isString(placement)) {
					      return placement;
					   }

					   return null;
					}
	
					// 
					// Make promises...
					//
					array.forEach(widgetSpecs, function(widgetSpec) {
						var promise = new LCDeferred();
						widgetPromises[getDomId(widgetSpec.placement)] = promise; // Use widget's dom id to get it's promise back in the promise callback;
						widgetHandles.push(Handle_.__factory__(accessor, widgetSpec, promise));
					});
					
					accessor.getIRuntime().then(function (iRuntime) {
						var loadTestCb = lang.hitch(null, loadTest, iRuntime);
						iRuntime.loadWidgets(widgetSpecsCpy).then(loadTestCb, loadTestCb);
					}, failLoad);
	
					return widgetHandles;
	
				} else {
					throw ('parameter must be an array: ' + widgetSpecs);
				}
			},
			
			loadWidget : function(widgetSpec) {
				return this.loadWidgets([widgetSpec])[0];
			},
			
			preloadWidgets : function(widgetSpecs) {
				if (widgetSpecs && lang.isArray(widgetSpecs) && widgetSpecs.length>0) {
					var idx = widgetSpecs.length,
						promise = null;
							
					while (idx--) {
						normalizeWidgetSpec_(widgetSpecs[idx]);
					}
					
					return new LCChainedDeferred(
						this._accessor.getIRuntime().then(function (iRuntime) {
							return iRuntime.preloadWidgets(widgetSpecs);
						}, function(error) {
							trace_.error('Error (', error, ') while preloading widgets: ', widgetSpecs);
						}));
				} else {
					var promise = new LCDeferred ();
					promise.errback('WidgetSpecs is empty, undefined or a non-array type.');
					return promise;
				}
			},
			
			unloadWidgets : function(widgetIds) {
				trace_.debug("Container's unloadWidgets called");
				this._accessor.getIRuntime().then(function (iRuntime) {
							return iRuntime.unLoadWidgets(widgetIds, false);
						}, function(error) {
							trace_.error('Error (', error, ') while unloading widgets: ', widgetIds);
						});
			},
			
			getGadgetInfo: function(url) {
				var promise = new LCDeferred ();
				return new LCChainedDeferred(	
					this._accessor.getCommonContainer().then(lang.hitch(this, function (cc) {
						cc.preloadGadget(url, lang.hitch(this, this._cb, promise, url));  // Wire in the promise object so we get it in the callback
						return(promise);
					}), lang.hitch(this, function(error) {
						trace_.error('Error (', error, ') while getting gadget metadata:  ', url);
						promise.resolve(null); // ok if this isn't a gadget - just resolve to null for metadata
					})));		
				},
	
			// Callback used by common container preloadGadget().
			//
			_cb: function(promise, url, metaData) {
				if (promise != null) {
					promise.resolve(metaData[url]);
					}
				else {
					trace_.error('Error while getting gadget metadata');
					promise.resolve(null); // ok if this isn't a gadget - just resolve to null for metadata
				}
			}
		});
		
		/*
		 * Override static methods 
		 */
		lang.mixin(Container, {
			/**
			 * Implement real method
			 * @private
			 * @function
			 * @memberOf com.ibm.lconn.gadget.container._Container
			 * @name __instance__
			 * @extends com.ibm.lconn.gadget.container.Container
			 */
			__instance__ : function (accessor) {
				if (!instance_) {
					instance_ = new Container_(accessor);
				}
				return instance_;
			}
		});
		
	})
	(trace,
	 specHelper,
	 Handle);
	
	return com.ibm.lconn.gadget.container._Container;
});
