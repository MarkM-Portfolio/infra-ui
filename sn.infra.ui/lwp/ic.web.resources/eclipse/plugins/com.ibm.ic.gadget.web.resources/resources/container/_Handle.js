/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-attr",
	"ic-core/util/LCDeferred",
	"ic-core/util/LCChainedDeferred",
	"./Accessor",
	"./Handle",
	"../util/specHelper",
	"../util/trace"
], function (dojo, declare, lang, dom, domAttr, LCDeferred, LCChainedDeferred, Accessor, Handle, specHelper, trace) {

	(function(
	 dojo,
	 Handle_,
	 trace_,
	 specHelper_,
	 LCChainedDeferred_,
	 LCDeferred_) 
	{	
		/**
		 * Extract the node ID from the DOM Node
		 */
		function getDomId_(nodeOrString) {
			if (nodeOrString) {
				if (lang.isString(nodeOrString)) {
					return nodeOrString;
				} else {
					return domAttr.get(nodeOrString, 'id');
				}
			}
			
			return null;
		}	
		
		/**
		 * Base widget handle implementation
		 * 
		 * To implement abstract class implementors must write 4 methods:
		 * 
		 *  _loading : function(runtime) => return promise to runtime
		 *  _unload : function(runtime) => return null
		 *  _withRuntime : function(cbfunc, errbkfunc) => return promise to runtime
		 *  getWidgetInfo : function() => return promise to widgetInfo
		 *  
		 * Additional JSDoc below
		 * 
		 * @private
		 * @class
		 * @extends com.ibm.lconn.gadget.container.Handle
		 */
		var WidgetHandleBase_ = declare('', Handle_, {
			_accessor : null,
			_widgetSpec : null, // Widget definition
			_promise : null,
			_state : Handle_.UNLOADED,
			_originalPlacement: null, // Original placement used in widget spec.  CRE changes this fale in widget spec after a load so we squirrel it away here in case we have to re-load.
			
			/**
			 * Constructor interface for all extenders of _WidgetHandleBase
			 * @param accessor @see com.ibm.lconn.gadget.container.Acceessor
			 * @param widgetSpec @see com.ibm.lconn.gadget.container.Container.prototype.loadWidget
			 * @param _promise If the loading of the widget has already been externally initiated a 
			 * handle can be created by passing in a promise that resolves to the runtime
			 */
			constructor : function(accessor, widgetSpec, _promise) {
				this._accessor = accessor;
				this._widgetSpec = widgetSpec;
				this._originalPlacement = this._widgetSpec.placement;
				if (_promise) {
					this._state = Handle_.LOADING;
					this._promise = _promise;
					_promise.then(lang.hitch(this, '_loaded'), lang.hitch(this, this._failLoad));
				}
			},
			
			/**
			 *  @see com.ibm.lconn.gadget.container.Handle.prototype.unload()
			 *  
			 *  For this method to work, extenders must implement:
			 *  function _loading()
			 */
			load : function() {
				// for simplicity; since there is no partial unload state, 
				//   we only get here if fully unloaded
				if (this._state === Handle_.UNLOADED) {
					this._state = Handle_.LOADING;
					this._widgetSpec.placement = this._originalPlacement;
					this._promise = this._withRuntime(lang.hitch(this, '_loading'), lang.hitch(this, '_failLoad'));				
				}
			},
			
			/**
			 * Method must be implemented for load() to function
			 * 
			 * @param runtime
			 * @return runtime
			 */
			_loading : function(runtime) { alert('UNIMPLEMENTED: _loading()'); },
			
			/**
			 * Method must be implemented for load(.., loadPromise) to function
			 */
			_loaded : function(runtime) { alert('UNIMPLEMENTED: _loaded()'); },
			
			/**
			 * Method is called with loading fails
			 * 
			 * @private
			 */
			_failLoad : function() { // Failed loading widget.
				this._state = Handle_.ERROR;
				trace_.error('_WidgetHandleBase - ' + this._widgetSpec.componentType + ' failed to load (%o): ' /**+ dojo.toJson(arguments)**/, this._widgetSpec.definitionUrl);
				this._widgetSpec.instanceData.errback.apply(null, arguments);
			},
			
			/**
			 *  @see com.ibm.lconn.gadget.container.Handle.prototype.unload()
			 *  
			 *  For this method to work, extenders must implement:
			 *  function _unload()
			 */
			unload : function() {
				var state = this._state;
				if (state === Handle_.LOADING || state === Handle_.LOADED) {
					// ensure that promises unroll; then close
					this._promise.then(lang.hitch(this, '_unload'), lang.hitch(this, '_failUnload'));
				}
			},
			
			/**
			 * Method must be implemented for unload() to function
			 * @param runtime
			 */
			_unload : function(runtime) { alert('UNIMPLEMENTED: _unload()'); },
			
			/**
			 * Method is called when unload fails
			 * 
			 * @private
			 */
			_failUnload : function() { // Failed loading widget.
				this._state = Handle_.ERROR;
				trace_.error('_WidgetHandleBase - ' + this._widgetSpec.componentType + ' failed to load (%o): ' /**+ dojo.toJson(arguments)**/, this._widgetSpec.definitionUrl);
			},
			
			/**
			 *  @see com.ibm.lconn.gadget.container.Handle.prototype.getState()
			 */
			getState : function() {
				return this._state;
			},
	
			/**
			 *  @see com.ibm.lconn.gadget.container.Handle
			 *  @deprecated
			 */
			open : function() {
				trace_.log('open() is deprecated, use load() method instead.');
				this.load();
			},
			
			/**
			 *  @see com.ibm.lconn.gadget.container.Handle
			 *  @deprecated
			 */
			close : function() {
				trace_.log('close() is deprecated, use unload() method instead.');
				this.unload();
			}
		});
		
		
		/**
		 * Widget handle implementation
		 * @private
		 * @class
		 * @extends com.ibm.lconn.gadget.container.Handle
		 */
		var WidgetHandle_ = declare('', WidgetHandleBase_, {
			_widgetId : null, // Object used by CRE to open / close widget	
			
			_loading : function(iRuntime) {
				return iRuntime.loadWidgets([specHelper_.cloneSpec(this._widgetSpec)])
					.then(lang.hitch(this, '_loaded', iRuntime), lang.hitch(this, '_failLoad'));
			},
			
			_loaded : function(iRuntime) { // Widget loaded
				trace_.debug('_WidgetHandleImpl - %s loaded successfully: %o', this._widgetSpec.componentType, this._widgetSpec.definitionUrl);			
				var domId = getDomId_(this._widgetSpec.placement);
							
				this._widgetId = iRuntime.getWidgetIdByDomId(domId);
				
				// Work around CRE not knowing about Gadget ids after loading.  Use original spec's placement string
				if (this._widgetId == null) {
					this._widgetId = this._originalPlacement;
				}
				this._state = Handle_.LOADED;
				
				return iRuntime;
			},
			
			_unload : function(iRuntime) {
				// guards against multiple calls to unload
				var wid = this._widgetId;
				if (this._widgetId) {
					if (this._widgetSpec.componentType == "gadget") {
						var w = iRuntime.getWidgetIdByDomId(wid);
						wid = (w != null ? w : wid);
					}
					iRuntime.unLoadWidgets([wid], false);
					this._widgetId = null;
					this._promise = null;
					this._state = Handle_.UNLOADED;
				}
			},
			
			getWidgetInfo : function() {
				var state = this._state, self = this;
				
				if (state === Handle_.LOADING || state === Handle_.LOADED) {
					return this._promise.then(function (iRuntime) {
						return iRuntime.getWidgetById(self._widgetId);
					});
				} else {
					// Return promise which has resolved to error.
					var message = 'Unable to call getWidgetInfo() when widget handle is not in loaded state.  State of handle is:  ' + this._state;
					trace_.debug(message);
					var promise = new LCDeferred_();
					promise.reject(message);
					return(promise);
					
				}	
			},
			
			/**
			 * Creates promise chain using cbfn, errbk. 
			 */
			_withRuntime : function(cbkfn, errbkfn) {
				return new LCChainedDeferred_(
					this._accessor.getIRuntime().then(cbkfn, errbkfn)
				);
			}
		});
		
		/**
		 * Base for CommonContainer based handles
		 * @private
		 * @class
		 * @extends com.ibm.lconn.gadget.container.Handle
		 */
		var CommonContainerBase_ = declare('', WidgetHandleBase_, {
			_gadgetSite : null,
			
			_withRuntime : function(cbkfn, errbkfn) {
				return new LCChainedDeferred_(
					this._accessor.getCommonContainer().then(cbkfn, errbkfn)
				);
			},
			
			_execCallback : function() {
				try {
					var instanceData = this._widgetSpec.instanceData || {},
						cbfunc = instanceData.callback;
					
					if (cbfunc) {
						if (lang.isString(cbfunc)) {
							cbfunc = dojo.global[cbfunc];
							if (cbfunc) {
								cbfunc();
							}
						} else {
							cbfunc();
						}
					}
					
				} catch (e) {}
			}
		});
		
		/**
		 * Gadget widget handle impl. Needed until CRE issues resolved :(
		 * @private
		 * @class
		 * @extends com.ibm.lconn.gadget.container.Handle
		 */
		var GadgetHandle_ = declare('', CommonContainerBase_, {
			_placement: null, // Use to remember placement ID during refresh.
			_loading : function(cc) {
				var widgetSpec = this._widgetSpec,
					instanceData = widgetSpec.instanceData || {},
					renderParams = instanceData.renderParams || {},
					viewParams = instanceData.viewParams || {},
					loadedPromise = new LCDeferred_();				
				
				this._placement = widgetSpec.placement;
				var gadgetSite = this._gadgetSite || (this._gadgetSite = cc.newGadgetSite(dom.byId(widgetSpec.placement)));
	
				var isInline = specHelper_.isInlineGadget(widgetSpec),
					container = (isInline ? cc.inline : cc);
	
				// norm spec
				if (!renderParams[osapi.container.RenderParam.VIEW]) {
					renderParams[osapi.container.RenderParam.VIEW] = 'home';
				}
	
				container.navigateGadget(
						gadgetSite,
						widgetSpec.definitionUrl,
						viewParams, 
						renderParams,
						lang.hitch(this, '_loaded', cc, loadedPromise));
				
				return loadedPromise;
			},
			
			_loaded : function(cc, loadedPromise, gadgetInfo) {
				if (gadgetInfo.error) {
					loadedPromise.errback(gadgetInfo.error);
					this._failLoad(gadgetInfo.error);
				} else {
					this._state = Handle_.LOADED;
					loadedPromise.callback(cc);
					this._execCallback(gadgetInfo);
				}			
			},
			
			_unload : function(cc) {
				cc.closeGadget(this._gadgetSite);
				if (this._placement != null) {
					this._widgetSpec.placement = this._placement;
				}
				this._gadgetSite = null;
				this._state = Handle_.UNLOADED;
				return null;
			}
		});
		
		
		/**
		 * EE widget handle impl. Needed until CRE issues resolved :(
		 * @private
		 * @class
		 * @extends com.ibm.lconn.gadget.container.Handle
		 */
		var EEHandle_ = declare('', CommonContainerBase_, {
			_loading : function(cc) {
				var widgetSpec = this._widgetSpec,
					instanceData = widgetSpec.instanceData || {},
					eeRenderParams = {},
					eeDataModel = instanceData.eeDataModel || {},
					loadedPromise = new LCDeferred_();				
				
				var RenderParam = osapi.container.ee.RenderParam;
					
				// setup rendering and model
				if (widgetSpec.definitionUrl) {
					eeRenderParams[RenderParam.GADGET_RENDER_PARAMS] = instanceData.renderParams || {};
					eeRenderParams[RenderParam.GADGET_VIEW_PARAMS] = instanceData.viewParams || {};
					
					eeDataModel.gadget = widgetSpec.definitionUrl;				
				} else {
					eeRenderParams[RenderParam.URL_RENDER_PARAMS] = instanceData.renderParams || {};
				}	
				
				cc.ee.navigate(
					dom.byId(widgetSpec.placement), eeDataModel, eeRenderParams, 
					lang.hitch(this, '_loaded', cc, loadedPromise)
				);
							
				return loadedPromise;
			},
			
			_loaded : function(cc, loadedPromise, site, gadgetInfo) {
				if (gadgetInfo && gadgetInfo.error) {
					loadedPromise.errback(gadgetInfo.error);
					this._failLoad(gadgetInfo.error);
				} else {
					this._state = Handle_.LOADED;
					this._gadgetSite = site;
					loadedPromise.callback(cc);
					this._execCallback(gadgetInfo);
				}
			},
			
			_unload : function(cc) {
				cc.ee.close(this._gadgetSite);
				this._gadgetSite = null;
				this._state = Handle_.UNLOADED;
				return null;
			}
		});
		
		/*
		 * Implement factory method
		 */
		Handle_.__factory__ = function(accessor, widgetSpec, loadPromise) {
			if (specHelper_.isInlineEE(widgetSpec)) {
				throw 'Inline EE gadgets are not permitted. Attempted to load: ' /**+ dojo.toJson(widgetSpec)**/;
			}
			
			/* loadPromise only present on CRE based call; */
			if (!loadPromise && specHelper_.isGadget(widgetSpec)) {
				if (specHelper_.isEEGadget(widgetSpec)) {
					return new EEHandle_(accessor, widgetSpec);
				} else {
					return new GadgetHandle_(accessor, widgetSpec);
					//return new WidgetHandle_(accessor, widgetSpec);	// Breaks Sharedialog
				}
			} else {
				return new WidgetHandle_(accessor, widgetSpec, loadPromise);
			}
		};
		
	})(
	 dojo,
	 Handle,
	 trace,
	 specHelper,
	 LCChainedDeferred,
	 LCDeferred);
	
	return com.ibm.lconn.gadget.container._Handle;
});
