/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/dom",
	"dojox/uuid/generateRandomUuid",
	"ic-core/globalization/api",
	"ic-core/url"
], function (dojo, lang, dom, generateRandomUuid, api, url) {

	com.ibm.lconn.gadget.util.specHelper = (function(
	 lconn_core_url_)
	{
		var exports_ = {},
			location_ = lang.getObject("location", dojo.global).toString(),
			emptyMethod_ = function() {},
			global_ = dojo.global;
		
		/**
		 * Makes an error back
		 * @private
		 * @function
		 */
		var makeErrorback_ = function(errback) {
			if (errback) {
				if (lang.isString(errback)) {
					return function() {
						(global_[errback] || emptyMethod_).apply(null, arguments);
					};
				} else {
					return errback;
				}
			} else {
				return emptyMethod_;
			}
		};	
			
		/**
		 * Generate a DOM ID for nodes. For security this must be a random ID as the
		 * ID is used as the target ID for RPC. Using stable or semi-stable DOM-IDs,
		 * makes RPC susceptible to easy hijacking.
		 * 
		 * @public
		 * @function
		 * @name nextDomId
		 */
		var nextDomId_ = exports_.nextDomId = function() {
	      return "gadget_" + generateRandomUuid();
		};
		
		/**
		 * Ensure all widget placements have DOM-ids
		 */
		var ensurePlacementDomId_ = function (widgetSpec) {
			var placement = widgetSpec.placement
			if (placement && !lang.isString(placement)) {
				if (!placement.id) {
					placement.id = nextDomId_();
				}
			}
		}
		
		/**
		 * Just test if this is inline
		 * @private
		 * @function
		 * @name isInlineTest4Gadgets_
		 */
		var isInlineTest4Gadgets_ = function(widgetSpec) {
			return (widgetSpec &&
					widgetSpec.instanceData &&
					widgetSpec.instanceData.renderType &&  
					widgetSpec.instanceData.renderType === 'inline');
		};
		
		/**
		 * Test if widgetSpec is a gadget
		 * @private
		 * @memberOf com.ibm.lconn.gadget.util.specHelper
		 * @function
		 * @name isGadget
		 */
		var isGadget_ = exports_.isGadget = function(widgetSpec) {
			return (widgetSpec &&
					widgetSpec.componentType && 
					widgetSpec.componentType === 'gadget');
		};
			
		/**
		 * Test if widgetSpec is an EE gadget
		 * @private
		 * @memberOf com.ibm.lconn.gadget.util.specHelper
		 * @function
		 * @name isEEGadget
		 */
		var isEEGadget_ = exports_.isEEGadget = function(widgetSpec) {
			return (isGadget_(widgetSpec) &&
					widgetSpec.instanceData && 
					widgetSpec.instanceData.eeDataModel);
		};
		
		/**
		 * Test if widgetSpec is inline EE to deal with CRE oddities
		 * @private
		 * @memberOf com.ibm.lconn.gadget.util.specHelper
		 * @function
		 * @name isInlineEE
		 */
		var isInlineEE_ = exports_.isInlineEE = function(widgetSpec) {
			return (isEEGadget_(widgetSpec) && 
					isInlineTest4Gadgets_(widgetSpec))
		};
		
		/**
		 * Test if widgetSpec is an inline gadget
		 * @private
		 * @memberOf com.ibm.lconn.gadget.util.specHelper
		 * @function
		 * @name isInlineGadget
		 */
		var isInlineGadget_ = exports_.isInlineGadget = function(widgetSpec) {
			return (isGadget_(widgetSpec) && 
					isInlineTest4Gadgets_(widgetSpec));
		};
		
		/**
		 * Normalize widgetSpec to deal with CRE oddities
		 * @private
		 * @memberOf com.ibm.lconn.gadget.util.specHelper
		 * @function
		 * @name normalizeWidgetSpec
		 */
		var normalizeWidgetSpec_ = exports_.normalizeWidgetSpec = function(widgetSpec) {
			var instanceData = null,
				renderParams = null,
				placement = null,
				errback = null;
			
			// allow for relative URLs
			widgetSpec.definitionUrl =  lconn_core_url_.parse(location_, widgetSpec.definitionUrl).toString();
			
			// ensure insancedata
			instanceData = widgetSpec.instanceData || (widgetSpec.instanceData = {});
			
			// Validate constraints
			if (isInlineEE_(widgetSpec)) {
				throw 'Inline EE gadgets are not permitted. Attempted to load: ' + widgetSpec.definitionUrl;
			}
			
			// support debug mode rendering and bidi preferences
			if (isGadget_(widgetSpec)) {
				instanceData = widgetSpec.instanceData || (widgetSpec.instanceData = {});
	
				renderParams = instanceData.renderParams || (instanceData.renderParams = {});
				var userPrefs = renderParams.userPrefs || (renderParams.userPrefs = {});
	
				 if (api) {
					 userPrefs['lconn.core.globalization.api.calendar'] = api.getCalendar();
					 userPrefs['lconn.core.globalization.api.textDirection'] = api.getTextDirection();
					 userPrefs['lconn.core.globalization.api.bidiEnabled'] = api.isBidiEnabled();
				 }
	
				if (dojo.config.isDebug) {
					renderParams[com.ibm.lconn.gadget.container.Container.RenderParam.TEST_MODE] = true;
				}
			}
			
			// patch around various iRuntime bugs
			ensurePlacementDomId_(widgetSpec);
			
			// ensure errback
			instanceData.errback = makeErrorback_(widgetSpec.errback);
			
			return widgetSpec;
		};
		
		/**
		 * Does a shallow clone of the widget spec to handle oddities in iRuntime usage of the widgetSpec.
		 * @private
		 * @memberOf com.ibm.lconn.gadget.util.specHelper
		 * @function
		 * @name cloneSpec
		 */
		var cloneSpec_ = exports_.cloneSpec = function(widgetSpec) {
			if (!widgetSpec)
				return widgetSpec;
			
			var copy = {};
			
			for (var key in widgetSpec) {
				if (key === 'placement') {
					var val = widgetSpec[key];
					if (!lang.isString(val)) {
						val = dom.byId(val).id;
					}
					copy[key] = val;
				} else {
					copy[key] = widgetSpec[key];
				}
			}
			
			return copy;
		}
		
		return exports_;
	})
	(url);
	
	return com.ibm.lconn.gadget.util.specHelper;
});
