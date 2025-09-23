/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

dojo.provide("com.ibm.lconn.gadget.registry.ee.iEEGadgetRegistry");
dojo.provide("com.ibm.lconn.gadget.registry.ee._EEGadgetMapper");

dojo.require("lconn.core.util.text");

/**
 * This utility takes a gadget config JSON of the form:
     { 
     	gadget: "url/to/defaultConnectionsGadgetDef.xml",
     	services: {
 			"files": {
 				gadget: "url/to/default/files/gadget.xml",
 				objectTypes: { 
 					"folder": { gadget: "folderGadget.xml" }
 				}
 			},
 			
 			"profiles": {
 				objectTypes: {
 					network: { gadget: "networkGadget.xml" }
 				|
 			}
 		}     	
     }
 */

/**
 * Declare internal _EEGadgetMapper utility object for mapping:
 * 	{eeGadgetRoot}/{service}/{objectType}/gadget.xml
 * 		=> {real_path_to_gadget}.xml
 */
(function declare_lconn_core_cwgc_ee_EEGadgetMapper(){
	
	/**
	 * Utility method to extact the gadget defs from a config object
	 * @param config
	 * @returns
	 */
	var _getDefAtConfigLevel = function(defList, config) {
		if (config.gadget) {
			defsList.push(config.gadget); 
		}
	};
	
	/**
	 * Utility to extrac
	 */
	var _extractGadgetDefs = function(config) {
		var nullVal = {},
			defsList = [];

		// deal with root / default gadget
		_getDefAtConfigLevel(defsList, config);
		
		// deal with services
		config.services = config.services || {};

		dojo.forEach(config.services, function(service) {
			_getDefAtConfigLevel(defsList, service);
						
			// deal with objectTypes
			service.objectTypes = service.objectTypes || {};
			
			dojo.forEach(service.objectTypes, function(objectType) {
				_getDefAtConfigLevel(defsList, objectType);
			});
		});
		
		return lconn.core.util.text.uniquifyStringList(defsList);
	};
	
	/**
	 * 
	 */
	var _baseUrlToRegExpStr = function(baseEEUrl) {
		// TODO: throw exception if baseEEUrl is null
		if (baseEEUrl > 0 && 
			baseEEUrl.lastIndexOf('/') === (baseEEUrl.length - 1)) 
		{
			baseEEUrl = baseEEUrl.substring(0, baseEEUrl.length-1); // chomp '/'
		}
		
		baseEEUrl = baseEEUrl.replace(/([\/\.\:])/g, '\\$1');
		
		return baseEEUrl;
	};

	/**
	 * GadgetMappings utility 
	 */
	dojo.declare("com.ibm.lconn.gadget.registry.ee._EEGadgetMapper", null, {
		/* The config object as given above */
		_config : null,
		
		_eeUrlMatcher: null,
		
		/* List of unique gadgets */
		gadgetDefs: null,
		
		/**
		 * 
		 * @param eeConfigJson {json: see above}
		 */
		constructor: function(baseEEUrl, eeConfigJson) {
			this._eeUrlMatcher = 
				new RegExp(_baseUrlToRegExpStr(baseEEUrl) 
							+ '\\/([^(\\/)]+)\\/([^(\\/)]+)\\/[^(\\/)]+\\.xml');
			this._config = eeConfigJson;
			this.gadgetDefs = _extractGadgetDefs(eeConfigJson);
		},
		
		/**
		 * Get a definition spec object
		 * 
		 * @param defUrl {String} Url to the definition
		 * @param requestDim {String} Dimensions of the request
		 * @return Object of the form 
		 * 		{ preloaded: [true|false], 
		 * 		  gadgetUrl: [url_to_retrieve_def_from],
		 * 		  preloadedGadgetUrl: [url_of_resolved_data_url] }
		 */
		getGadgetSpec : function(gadgetUrl, requestDim) {
			var spec = { 
					preloaded : false,
					gadgetUrl : gadgetUrl
				};
			
			spec.preloadedGadgetUrl = this._resolvePreloadedGadget(gadgetUrl, requestDim);
			// TODO if (result.preloadedGadgetUrl) { result.preloaded = true; }
			
			return spec;
		},
		
		/**
		 * Resolves the preloaded gadget corresponding to this gadget URL if one exists
		 * @param gadgetUrl
		 */
		_resolvePreloadedGadget : function(gadgetUrl, requestDim) {
			var config = this._config.config,
				matcher = this._eeUrlMatcher;
			
			if (matcher.test(gadgetUrl)) {
				
				// path variables
				var pathParts = matcher.exec(gadgetUrl),
					svcName = pathParts[1],
					objectType = pathParts[2];
								
				// resolved gadgetXml
				var resolvedGadgetXml = config.gadget;				
				
				// sub-config
				var svcConfig = config.services[svcName],
					objConfig;
				
				// check for more specific gadgetXml
				if (svcConfig) {
					resolvedGadgetXml = svcConfig.gadget || resolvedGadgetXml;
					
					objConfig = svcConfig.objectTypes[objectType];
					if (objConfig) {
						resolvedGadgetXml = objConfig.gadget || resolvedGadgetXml;
					}
				}
				
				return resolvedGadgetXml;
			}
			
			return gadgetUrl;
		}
	});
})();

/**
 * Construct registry as singleton objects
 * @returns
 */
com.ibm.lconn.gadget.registry.ee.iEEGadgetRegistry = (function init_lconn_core_cwgc_ee_iEEGadgetRegistry() {
	//
	// TODO init mappings / baseUrl
	//   Will get mapping object from object from server which is to be delivered by resources framework.
	//
	var _baseEEUrl = "http://connections.com/test/ee";
	var _gadgetMappings = new com.ibm.lconn.gadget.registry.ee._EEGadgetMapper(_baseEEUrl, {});
	
	return {
		getGadgetSpec : function(gadgetUrl, requestDim) {
			return _gadgetMappings.getGadgetSpec(gadgetUrl, requestDim);
		}
	};
})();
