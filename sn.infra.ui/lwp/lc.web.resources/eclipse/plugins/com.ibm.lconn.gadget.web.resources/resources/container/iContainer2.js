/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.container.iContainer2');

dojo.require('com.ibm.lconn.gadget.container.Accessor');
dojo.require('com.ibm.lconn.gadget.container._Accessor');
dojo.require('com.ibm.lconn.gadget.container.Container');
dojo.require('com.ibm.lconn.gadget.container._Container');
dojo.require('com.ibm.lconn.gadget.container.Views');
dojo.require('com.ibm.lconn.gadget.container.ICActions');
dojo.require('com.ibm.lconn.gadget.services.ICActionsContainer');
dojo.require('com.ibm.lconn.gadget.services.ViewContainer');

dojo.require('com.ibm.lconn.gadget.util.trace');

/**
 * Container Singleton. This object implements exposes a singleton that
 * implements the core interfaces:
 * <ul>
 * <li><code>{@link com.ibm.lconn.gadget.container.Accessor}</code>
 * <li>
 * <li><code>{@link com.ibm.lconn.gadget.container.Container}</code>
 * <li>
 * </ul>
 * See those interfaces for API details.
 * 
 * In addition this object provides a '.views' property which exposes the
 * singleton instance of {@link om.ibm.lconn.gadget.container.Views}.
 * 
 * You may use the object directly and it will transparently instantiate. To
 * immediately start instantiation call the <code>init()</code> method. This
 * will cause resources to be downloaded in the background.
 * 
 * @see com.ibm.lconn.gadget.container.Accessor
 * @see com.ibm.lconn.gadget.container.Container
 * @see com.ibm.lconn.gadget.container.Views
 * 
 * @namespace com.ibm.lconn.gadget.container.iContainer
 */
(function init_com_ibm_lconn_gadget_container_iContainer2() {
	var com_ibm_lconn_gadget_container_iContainer = com.ibm.lconn.gadget.container.iContainer2,
		/* Interfaces */
		__ContainerCls = com.ibm.lconn.gadget.container.Container,
		__AccessorCls = com.ibm.lconn.gadget.container.Accessor,
		/* singleton objects */
		__accessor = null,
		__container = null,
		/* tracing utilities */
		__trace = com.ibm.lconn.gadget.util.trace,
		/* helper method to apply interface methods */
		__subIFaceMethods = null,
		__skipDojoMethods = new (dojo.declare('', null, { constructor : function(){}}))();
		
	/*
	 * Internal method to help change interface methods on iContainer
	 */
	__subIFaceMethods = function (clsProtoArr, methodReplacer) {
		var methodName, clsProto,
			iContainer = com_ibm_lconn_gadget_container_iContainer;
		
		for (var i=0, len=clsProtoArr.length; i<len; i++) {
			clsProto = clsProtoArr[i];
			for (methodName in clsProto) {
				if (!__skipDojoMethods[methodName] && dojo.isFunction(clsProto[methodName])) {
					iContainer[methodName] = methodReplacer(methodName);
				}
			}
		}
	}
	
	/*
	 * Add Accessor & Container methods to iContainer
	 */
	__subIFaceMethods([__AccessorCls.prototype, __ContainerCls.prototype], function(methodName) {
		return function() {
			var args = arguments,
				iContainer = com_ibm_lconn_gadget_container_iContainer.init();
			
			return iContainer[methodName].apply(null, args); // iContainer uses global scope
		};
	});
	
	/*
	 * Expose additional API
	 */
	dojo.mixin(com_ibm_lconn_gadget_container_iContainer, {		
		/**
		 * Initializes the loading of iContainer resources.
		 * 
		 * @memberOf com.ibm.lconn.gadget.container.iContainer
		 * @name init
		 * @function
		 * @param {Object} Optional configuration parameters
		 * @returns {Object} Reference to iContainer singleton.
		 */
		init : function(config) {
			__trace.entering('com.ibm.lconn.gadget.container.iContainer', 'init', config);

			// inintialize instances
			__accessor = __AccessorCls.__instance__(config);
			__container = __ContainerCls.__instance__(__accessor);
			
			__trace.debug('Accessor: ' + __accessor);
			__trace.debug('Container: ' + __container);
			
			// mutate so it calls skip full init
			com_ibm_lconn_gadget_container_iContainer.init = function() {
				return com_ibm_lconn_gadget_container_iContainer;
			};
			
			// pass through interface calls to real objects
			__subIFaceMethods([__AccessorCls.prototype], function(methodName) {
				return dojo.hitch(__accessor, methodName);
			});
			
			__subIFaceMethods([__ContainerCls.prototype], function(methodName) {
				return dojo.hitch(__container, methodName);
			});
			
			__trace.exiting('com.ibm.lconn.gadget.container.iContainer', 'init', config);
			
			return com_ibm_lconn_gadget_container_iContainer;
		},
		
		/**
		 * Accessor for @see com.ibm.lconn.gadget.container.Views singleton.
		 * @memberOf com.ibm.lconn.gadget.container.iContainer
		 * @name views
		 * @property
		 * @type {com.ibm.lconn.gadget.container.Views}
		 */
		views : com.ibm.lconn.gadget.container.Views.__instance__(),
		
		/**
		 * Accessor for @see com.ibm.lconn.gadget.container.ICActions singleton.
		 * @memberOf com.ibm.lconn.gadget.container.iContainer
		 * @name ICActions
		 * @property
		 * @type {com.ibm.lconn.gadget.container.ICActions}
		 */
		ICactions : com.ibm.lconn.gadget.container.ICActions.__instance__()
	});
	
	/* Complete the initialization of iContainer */
	if (dojo.global.__iContainer_skip_init__) {
		__trace.debug('Defering iContainer init.');
	} else {
		dojo.ready(function() {
			var prom = dojo.global.__iContainer_defer_init__;
            if(prom && prom.then) {
              var self = this;
              prom.then(dojo.hitch(self, function() {
                com_ibm_lconn_gadget_container_iContainer.init();
              }));
            } else {
              com_ibm_lconn_gadget_container_iContainer.init();
            }
		});
	}
})();
