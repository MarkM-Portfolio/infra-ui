/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.container.Container");

dojo.require("com.ibm.lconn.gadget.container.Accessor");
dojo.require("com.ibm.lconn.gadget.container.Handle");

/**
 * Interface for Connections Container. This interface documents the methods
 * supported by <code>com.ibm.lconn.gadget.container.iContainer</code> to
 * load, preload iWidgets and gadgets.
 * @class
 */
dojo.declare("com.ibm.lconn.gadget.container.Container", null, {
	
	/**
	* Initializes widget loading from the client, either by declarative or procedural means.
	* @memberOf com.ibm.lconn.gadget.container.iContainer
	* @name loadWidget
	* @function
	* @param widgetSpec {Object} Takes a single widgetSpec matching iRuntime.loadWidgets
	* @example
	*  Gadget Example:
	*  {
	*   definitionUrl: "http://xxx.xml", 
	*   placement: "domId1" | DOMNode, 
	*   componentType : "gadget",
	*   instanceData: {
	*		renderType: "default" | "inline",		
	*		renderParams: {					# TODO - figure out values
	*			width:"700",
	*			height:"400",
	*			userPrefs: { 
	*				pref1:"value1",
	*				pref2:"value2"
	*			}
	*		},
	*		viewParams: {					# Gadget view param options
	*			"viewkey1":"viewvalue1"
	*		},
	*		callback:"cbFnName" | function() {...},
	*		errback: "cbFnName" | function() {...}
	*   }
	*  }
	*  
	*  EE Gadget Example:
	*  {
	*	definitionUrl:"<%= creHost %>/productserver/gadgets/embedded-experience/EEHelloWorld.xml",
	*	placement: "gadget-site-1" | DOMNode,
	*	componentType: "gadget",
	*	instanceData : {
	*		renderType: "default",		
	*		renderParams: {					# TODO - figure out all values
	*			width:"700",
	*			height:"400",
	*			userPrefs: { 
	*				pref1:"value1",
	*				pref2:"value2"
	*			}
	*		},
	*		eeDataModel: {
	*			context: "sample info for inline EE."
	*		},
	*		viewParams: {					# Gadget view parameters
	*			"viewkey1":"viewvalue1"
	*		},
	*		callback:"cbFnName" | function() {...},
	*		errback: "cbFnName" | function() {...}
	*	 }
	*	}
	*  
	*  EE URL Example:
	*  {
	*	placement: "gadget-site-1" | DOMNode,
	*	componentType: "gadget",
	*	instanceData : {
	*		renderType: "default",		
	*		renderParams: {					# EE Render parameters
	*			width:"700",
	*			height:"400",
	*			userPrefs: { 
	*				pref1:"value1",
	*				pref2:"value2"
	*			}
	*		},
	*		eeDataModel: {
	*			url: "http://some.domain/path/to/url/to/show.html"
	*		},
	*		viewParams: {					# URL view parameters
	*			"viewkey1 ": "viewvalue1"
	*		},
	*		callback:"cbFnName" | function() {...},
	*		errback: "cbFnName" | function() {...}
	*	 }
	*	}
	*  
	*  iWidget Example:
	*  {
	*	definitionUrl:"http:/.../widgets/simple_stock/stock3.xml",
	*	componentType : "iWidget",
	*	placement:"stock_widget_view" | DOMNode,
	*	moduleId:"sender5",					# TODO - Has to do with 'wires'.  Not used by LConn
	*	instanceData : {
	*		itemSet: [
	*			{
	*			 id:"attributes",
	*			 item: [{ id:"symbol", value:"IBM" },
	*					{ id:"symbol2", value:"APPL" }]
	*			},
	*			{
	*			 id:"more.attributes",
	*			 item: [{ id:"paint", value:"pretty" }]
	*			},
	*		],
	*		wires: [						# Feature is here, but should be ignored for the most part
	*			{
	*			 sourceWidget: "sender",
	*			 sourceEvent: "sendData",
	*			 targetEvent: "receiveData"
	*			}
	*		]
	*		renderType : "sandbox",
	*		callback:"cbFnName" | function() {...},
	*		errback: "cbFnName" | function() {...}
	*	}
	*  }
	*  
	*  CRE will take or a domNode containing the widget definition, position, and instance data.
	* @returns {Object} A com.ibm.lconn.gadget.container.Handle object
	*/ 
	loadWidget : function(widgetSpec) {},
	
	/**
	 * Loads a set of gadgets or widgets
	 * @memberOf com.ibm.lconn.gadget.container.iContainer
	 * @name preloadWidgets
	 * @function
	 * @param widgetSpecs {Object} Takes an array widgetSpec matching @see cre$.iRuntime.preloadWidgets
	 * @returns {Object} A promise object which resolves when the widgets are
	 *          loaded
	 * @public
	 */
	preloadWidgets : function(widgetSpecs) {},
	
	/**
	 * Loads a set of gadgets or widgets
	 * @memberOf com.ibm.lconn.gadget.container.iContainer
	 * @name loadWidgets
	 * @function
	 * @param widgetSpecs {Object} Takes an array widgetSpec matching @see cre$.iRuntime.loadWidgets
	 * @returns {Array} An array of com.ibm.lconn.gadget.container.Handle objects
	 * @public
	 */
	loadWidgets : function(widgetSpecs) {},
	
	/**
	 * Unloads a set of gadgets or widgets
	 * @memberOf com.ibm.lconn.gadget.container.iContainer
	 * @name unloadWidgets
	 * @function
	 * @param widgetIds {Array} Takes an array widgetIds matching @see cre$.iRuntime.unloadWidgets
	 * @returns {Object} A promise object
	 * @public
	 */
	unloadWidgets : function(widgetIds) {},
	
	/**
	 * Returns gadget meta-data via a promise.
	 * @memberOf com.ibm.lconn.gadget.container.iContainer
	 * @name getGadgetInfo
	 * @function
	 * @param url {string} 
	 * @returns {Object} A promise object which resolves to the metadata when loaded
	 * @public
	 */
	getGadgetInfo: function(url) {}
				
});

/**
 * This returns a the container singlton. Container API callers should not call this directly.
 * @see com.ibm.lconn.gadget.container.iContainer
 * 
 * @memberOf com.ibm.lconn.gadget.container.Container
 * @name __instance__
 * @function
 * @private
 * @param {Object} A promise to the accessor object.
 * @returns {Object} The Container singleton
 */
com.ibm.lconn.gadget.container.Container.__instance__ = 
	com.ibm.lconn.gadget.container.Container.__instance__ || function(iAccessor) {};
	
	

/**
 * Add render param constants as needed
 */
com.ibm.lconn.gadget.container.Container.RenderParam = {
	TEST_MODE : 'testmode'
};
