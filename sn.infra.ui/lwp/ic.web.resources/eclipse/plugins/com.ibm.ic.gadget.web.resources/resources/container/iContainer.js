/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/has",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/json",
	"dojo/request",
	"ic-core/config",
	"ic-core/config/services",
	"ic-core/url",
	"./Handle",
	"ic-ui/util/Url",
	"ic-ui/util/proxy"
], function (dojo, has, declare, lang, dom, JSON, request, configModule, services, urlModule, Handle, Url, proxy) {

	/**
	 * Interface object
	 */
	var Handle_old = declare("com.ibm.lconn.gadget.container.Handle_old", null, {
		/**
		 * Open the gadget or widget
		 */
		open : function() {},
		
		/**
		 * Closes the gadget or widget
		 */
		close : function() {},
		
		/**
		 * Refresh the gadget or widget
		 */
		refresh : function() {
			this.close();
			this.open();},	
			
		/**
		 * Inidicates if the handle is open
		 */
		isOpen: function() { return false; }
	});
	
	
	var EEHandle = declare("com.ibm.lconn.gadget.container.EEHandle", Handle_old, {
		/* EEHandle overrides open() to open EE gadget */
	});
	
	
	/**
	 * Init container singleton
	 */
	com.ibm.lconn.gadget.container.iContainer = 
	
		(function init_lconn_core_cwgc_container(){
			/* Internal objects */
			var _global = dojo.global,
				_debug = dojo.config.isDebug;
				_cre_container = null,
				_debugParams = "&debug=" + _debug + "&noCache=" + _debug;
				_os_res = [
				   "{creHref}/gadgets/js/cre.iruntime:cre.iwidget:cre.iwidget.itemset:cre.util.stringify:cre.service.event:" + //cre.messages.en:" +
				   "core:container:rpc:views:embedded-experiences:selection:inline:actions:shared-script-frame:shindig.sha1:open-views.js?c=1" +
				   (_debug ? _debugParams : "")],
				
				_os_container = null,
				_api = {},
				_location = dojo.global.location;
				_lconn_core_url = urlModule,
				_creSvcConfig = services['opensocial'],
				_creResUrl = (function() {
				      var _svcUrl = _lconn_core_url.getServiceUrl(_creSvcConfig);
						var path = _svcUrl ? proxy(_svcUrl.toString()) : "";
					 	var loc = _global.location;
					 	
					 	if (path.indexOf(loc.protocol) === 0) {
					 		return path;
					 	} else {
					 		return [ loc.protocol, '//', loc.host, path ].join('');
					 	}
				 	})();
				 _creResUrlObj = _lconn_core_url.parse(_creResUrl);
				 
			/*
			* Private _iWidgethandle - object for creating and interacting with an iWidget.
			*/
			
			var _iWidgetHandle = declare([Handle], {
				_widgetObject : null, // Widget definition
				_widgetHandle : null,
				_loaded : null, // Set to true if loaded, false if loading failed.
				
				
				constructor : function(widgetObject) {
					this._widgetObject = widgetObject;
					// Remove this when CRE correctly handles multi-level context roots
					//cre$.config.CONTEXT_ROOT = _creResUrlObj;
					
					/*cre$.endpoint.registerEndpoints([
							{name: "creserverurl", url: _creResUrlObj.path}
							//, {name: "creproxyurl", url: _creResUrlObj.path + "/common/proxy?refresh=%refresh%&url=%url%%rewriteMime%"}
						]);
					*/
				},
				
				serverHost: function () {
					var loc = document.location;
					return(loc.protocol + "//" + location.hostname + ":" + location.port);
				},
				
				open : function() {
					// TBD - loadWidgets doesn't return any handles!  Have to get widget handle by it's dom id.
					//
					 var prom = cre$.iRuntime.loadWidgets(this._widgetObject);
					 prom.then(lang.hitch(this, "_loaded"), lang.hitch(this, "_fail"));
				},
				close : function() {
					if (this.isOpen()) {
						cre$.iRuntime.unLoadWidgets([this._widgetHandle], false);
						this._widgetHandle = null;
						this._loaded = null;
						}
				},
				
				refresh : function() {
				},
				
				isOpen : function() {
					return (this._loaded == true);
				},
				
				_loaded : function() { // Widget loaded
					this._loaded = true;
					this._widgetHandle = cre$.iRuntime.getWidgetIdByDomId(this._widgetObject[0].placement);			
					console.log("iContainer - iWidget loaded successfully");
				},
				
				_fail : function(err) { // Failed loading widget.
					this._loaded = false;
					console.log("iContainer - iWidget failed to load. " + JSON.stringify(arguments));
				}
			});
			
			/*
			 * Private _GadgetHandle ctor
			 */ 
			var _GadgetHandle = declare([Handle], {
				_gadgetSite : null,
				_definitionUrl : null,
				_placement : null,
				_inline: false,
				_viewParams: null,
				
				constructor : function(widgetObject) {
					this._placement = dom.byId(widgetObject.placement);
					this._definitionUrl = widgetObject.definitionUrl;
					this._inline = widgetObject.inline;
					this._viewParams = widgetObject.context || {};
					this._renderParams = widgetObject.renderParams || {};
				},
				
				open : function() {					
					if (!this._gadgetSite) {
						this._gadgetSite = _os_container.newGadgetSite(this._placement);
						
						this._renderParams[osapi.container.RenderParam.VIEW] = 'home';
						this._renderParams[osapi.container.RenderParam.TEST_MODE] = _debug;
						if(this._inline)
							_os_container.inline.navigateGadget(
									this._gadgetSite,
									this._definitionUrl,
									this._viewParams, 
									this._renderParams
							);
						else
						_os_container.navigateGadget(
								this._gadgetSite,
								this._definitionUrl,
								this._viewParams,
								this._renderParams
						);
					}
				},
				
				close : function() {
					if (this._gadgetSite) {
						_os_container.closeGadget(this._gadgetSite);
						this._gadgetSite = null;
					}
				},
				
				refresh : function() {
					this.close();
					this.open();
				},
				
				isOpen : function() {
					return this._gadgetSite != null;
				}
			});
				 
			var _EEGadgetHandle = declare([_GadgetHandle, com.ibm.lconn.gadget.container.EEHandle], {
				_eeContext: null,
				_renderCallback: null,
				_renderParams: null,
				constructor : function(widgetObject) {
					if(dojo.config.isDebug) {
						console.debug("iContainer - EEGadgetHandle - ctor - entering - %o", widgetObject);
					}
					this._eeContext = widgetObject.context || {};
					this._renderCallback = widgetObject.callback || null;
					this._renderParams = widgetObject.renderParams;
					if(dojo.config.isDebug) {
						console.debug("iContainer - EEGadgetHandle - ctor - exiting");
					}
				},
				
				open : function() {
					if(dojo.config.isDebug) {
						console.debug("iContainer - EEGadgetHandle - open - entering");
					}
					if ( this._gadgetSite ) {
						if(dojo.config.isDebug) {
							console.debug("iContainer - EEGadgetHandle - open - Existing gadgetSite (%o), attempting to close.", this._gadgetSite);
						}
						this.close();
					}
					
					// for now, force everything to 500 width.
					// when we move to CRE api, need to find clean way to set per gadget
				    var renderParams = {};
				    var gadgetRenderParams = this._renderParams || {};
				    renderParams[osapi.container.ee.RenderParam.GADGET_RENDER_PARAMS] = gadgetRenderParams;
	
					shindig.auth.updateSecurityToken('john.doe:john.doe:appid:cont:url:0:default');
	
					this._gadgetSite = _os_container.ee.navigate(
								this._placement,
								{ /* EE Data Model */
									gadget: this._definitionUrl,
									context: this._eeContext
								},
								renderParams,
								lang.hitch(this, function(site, metaData) {
									if(dojo.config.isDebug) {
										console.debug("iContainer - eeGadget navigate callback - entering - site: %o, metaData: %o", site, metaData);
									}
									this._gadgetSite = site;
									if ( this._renderCallback ) {
										if(dojo.config.isDebug) {
											console.debug("iContaner - eeGadget navigate callback - calling render callback");
										}
										this._renderCallback();
									}
									if(dojo.config.isDebug) {
										console.debug("iContainer - eeGadget nativate callback - exiting - this: %o", this);
									}
								})
					);
					if(dojo.config.isDebug) {
						console.debug("iContainer - EEGadgetHandle - open - exiting");
					}
				},
				
				close : function() {
					if(dojo.config.isDebug) {
						console.debug("iContainer - EEGadgetHandle - close - entering");
					}
					if ( this._gadgetSite ) {
						if(dojo.config.isDebug) {
							console.debug("iContainer - EEGadgetHandle - close - Found gadgetSite (%o), attempting to close.", this._gadgetSite);
						}
						_os_container.ee.close(this._gadgetSite);
						this._gadgetSite = null;
					}
					if(dojo.config.isDebug) {
						console.debug("iContainer - EEGadgetHandle - close - exiting");
					}
				}
			});
			
			/**
			 * Loads an array of js files
			 */	
			var _fn_loadJS_sync = function (_config, js_files) {
				if (js_files) {
					var index = js_files.length,
						 resUrl,
						 replacement = {creHref : _creResUrl};
					
					while (index--) {
						resUrl = lang.replace(js_files[index], replacement);
						console.log("Load: " + resUrl);
						request(resUrl, {method: "GET", handleAs: 'javascript', sync: true});
					}
				}
			};
			
			/**
			 * Init the OS container
			 */
			var _fn_initOSContainer = function (_config) {
				if(dojo.config.isDebug) {
					console.debug("iContainer - _fn_initOSContainer - entering - %o", _config);
				}
				var container_config = {}; 
	
				// Load resources
				if (typeof (cre$) !== "undefined" && _debug) {
					if(dojo.config.isDebug) {
						console.debug("CRE already loaded, skipping load of: " + JSON.stringify(_os_res));	
					}
				} else {
					_fn_loadJS_sync(_config, _os_res);						
				}
					
				_global.__CONTAINER = 'default'; // Line needs to be AFTER JS load
				
				// Setup container			
				container_config[osapi.container.ServiceConfig.API_HOST] = [_creResUrlObj.scheme, '://', _creResUrlObj.authority].join('');
				container_config[osapi.container.ServiceConfig.API_PATH] = _creResUrlObj.path + '/rpc';
				//container_config[osapi.container.ContainerConfig.RENDER_DEBUG] = true;
				if(dojo.config.isDebug) {
					console.debug("iContainer - _fn_initOSContainer - container_config: %o", container_config);
				}
							
				_os_container = new osapi.container.Container(container_config);
				cre$.iRuntime.setCommonContainer(_os_container);
				
				cre$.config.SCHEME = _location.protocol.substring(0, _location.protocol.length-1);
				cre$.config.HOST = _location.hostname;
				cre$.config.PORT = (_location.port && _location.port !== '') ? _location.port : '';
				cre$.config.CONTEXT_ROOT = _creResUrlObj.path;
				
				
				// So... this is a big strange. Even though the OScontianer provides the ability
				// to 'pass' context when launching EE gadget, it's up to ourselves to set
				// it to the gadget
				// TODO: Shindig is fixing this, need to remove this when fixed.
				/*
				_os_container.rpcRegister('ee_gadget_rendered', function(rpcArgs, data) {
					// Lifted from EEContainer.js in shindig examples
					if (dojo.config.isDebug) {
						console.debug("iContainer - ee_gadget_rendered - entering - rpcArgs: %o, data: %o", rpcArgs, data);
					}
					var gadgetSite = rpcArgs.gs;
					var renderParams = gadgetSite.currentGadgetHolder_.renderParams_;
					var eeDataModel = renderParams.eeDataModel;
					var context = null;
					if (eeDataModel) {
						context = eeDataModel.context;
					}
					if(dojo.config.isDebug) {
						console.debug("iContainer - ee_gadget_rendered - calling callback with context: ", context);
					}
					rpcArgs.callback(context);
					if(dojo.config.isDebug) {
						console.debug("iContainer - ee_gadget_rendered - exiting");
					}
				});*/
				if(dojo.config.isDebug) {
					console.debug("iContainer - _fn_initOSContainer  - exiting");
				}
			};
			
			/**
			 * create a new placement site
			 * @param widgetObject
			 */
			var _fn_newPlacementSite = function(widgetObject) {
				var placement_dom = dom.byId(widgetObject.placement),
					placement_site = _os_container.newGadgetSite(placement_dom);
				
				return placement_site;
			};
			
			/**
			 * @param config [JSON object] { 
			 * 			creHref [String] *REQUIRED* URL to CRE 
			 * 		}
			 */
			_api.init = function(config) {
				var _config = config || {};
				if(dojo.config.isDebug) {
					console.debug("iContainer - api.init - entering - %o", _config);
				}
				if (!_os_container) {
					// if(dojo.config.isDebug) {
					// console.debug("iCOntainer - api.init - loading CRE container");
					// }
					//_fn_initCRE(_config);
					//TODO: 1 -Remove once determined that everything in com.ibm doesn't get removed in IE
					var tmpComIbm = com.ibm;
					
					if(dojo.config.isDebug) {
						console.debug("iContainer - api.init - loading OS container");
					}
					_fn_initOSContainer(_config);
					
					//TODO: 1 Con't -Remove once determined that everything in com.ibm doesn't get removed in IE
					if(has("ie"))
				       lang.mixin(com.ibm, tmpComIbm);
	
				}
				if(dojo.config.isDebug) {
					console.debug("iContainer - api.init - exiting");
				}
			};		
			/**
			 * WILL_CHANGE
			 * 
			 * Copy of spec used by current CRE drop.
			 * 
			 * Slightly hacky... just enough function to enable integration test
			 * 
			 * @param widgetObject
			 * 	 { definitionUrl - URL of gadget
			 * 	   placement - ID of DOM node to place gadget
			 * 	   instanceData - context object for gadget }
			 * 
			 * @returns handle do gadget
			 */
			_api.renderGadget = function(widgetObject) {
				if(dojo.config.isDebug) {
					console.debug("iContainer - api.renderGadget - entering - %o", widgetObject);
				}
				
				var handle = new _GadgetHandle(widgetObject);
				handle.open();
	
				if(dojo.config.isDebug) {
					console.debug("iContainer - api.renderGadget - exiting - %o", handle);	
				}
				return handle;
			};
			
			_api.renderEEGadget = function(widgetObject) {
				if(dojo.config.isDebug) {
					console.debug("iContainer - api.renderEEGadget - entering - %o", widgetObject);
				}
				// Trial to use loadWidgets
			/*	
				widgetObject.componentType = "gadget";
				widgetObject.instanceData = 
					{renderParams:{
						renderType: "default"},
					 eeContext: {
						eeContext: widgetObject.context, 
						eeGadget: widgetObject.definitionUrl
						},
					callback: widgetObject.callback
					};
				
				debugger;
				var gadgetArray = [widgetObject];
				
				
				return(_api.renderWidget(gadgetArray));
				*/
				
	// Original way to load EE gadget
	
				var eeHandle = new _EEGadgetHandle(widgetObject);
				eeHandle.open();
				
				if(dojo.config.isDebug) {
					console.debug("iContainer - api.renderEEGadget - exiting - %o", eeHandle);
				}
				
				
				return eeHandle;
	
	
			};
			
			_api.renderWidget = function(widgetObject) {
			try {
				if(dojo.config.isDebug) {
					console.debug("iContainer - api.renderWidget - entering - %o", widgetObject);
				}
				var handle = new _iWidgetHandle(widgetObject);
				handle.open();
				//var handle = cre$.iRuntime.loadWidgets(widgetObject);
				if(dojo.config.isDebug) {
					console.debug("iContainer - api.renderWidget - exiting - %o", handle);	
				}
				return handle;
				} catch (e) {
					if(dojo.config.isDebug) {
						console.debug("iContainer - api.renderWidget - exception - %e", e);
					}
				}
			};
			_api.getActionsByPath = function(path) {
				var actions = [];
				if(_os_container && _os_container.actions)
					actions = _os_container.actions.getActionsByPath(path);
				return actions;
			};
			
			_api.preloadGadgets = function(gadgetsArray, callback) {
				if(_os_container) {				
					_os_container.preloadGadgets(gadgetsArray, callback);
				} else {
					if(dojo.config.isDebug) {
						console.debug("iContainer - api.preloadGadgets - osContainer  doesn't exist. Therefore, unable to preload gadgets.");
					}
				}
			};
			_api.registerShowActionHandler = function(handler) {
				if(_os_container && _os_container.actions)
					_os_container.actions.registerShowActionsHandler(handler); //TODO: Rename to registerShowActionHandler when shindig code is fixed to match the spec
			};
			_api.registerHideActionHandler = function(handler) {
				if(_os_container && _os_container.actions)
					_os_container.actions.registerHideActionsHandler(handler); //TODO: Rename to registerShowActionHandler when shindig code is fixed to match the spec
			};
			
			_api.registerNavigateGadgetHandler = function(handler) {
				if(_os_container && _os_container.actions)
					_os_container.actions.registerNavigateGadgetHandler(handler);
			};
			_api.runAction = function(actionId, opts) {
				if(_os_container && _os_container.actions)
					_os_container.actions.runAction(actionId, opts || {});
			};
	
			_api._os_container = function() {
				return _os_container;
			};
			
			/* Return public API */
			return _api;
		})();
	
	return EEHandle;
});
