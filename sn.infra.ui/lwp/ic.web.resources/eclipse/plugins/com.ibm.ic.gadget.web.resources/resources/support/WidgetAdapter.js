/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dijit/_Contained",
	"dijit/_Widget",
	"../container/iContainer2",
	"./Site"
], function (declare, domConstruct, _ContainedModule, _WidgetModule, iContainer2, SiteModule) {

	(function (dojo, _Widget, _Contained, Site, iContainer) {
		
		/**
		 * Interface for WidgetAdapter object. This object abstracts the
		 * functionality used by a 'WidgetSite' to adapt the Handle object for display.
		 * WidgetSite exposes a WidgetAdapter for each of the component models that
		 * it exposes. Applications can customize the adapters to suit their needs.
		 * 
		 * @class
		 */
		var WidgetAdapter_ = declare('com.ibm.lconn.gadget.support.WidgetAdapter', [_Widget, _Contained], {
			/**
			 * Handle object
			 * 
			 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter.prototype
			 * @name handle
			 * @field
			 * @public
			 */
			handle : null,
			
			/**
			 * Specification for the widget
			 * @see com.ibm.lconn.gadget.container.Container.prototype.loadWidge
			 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter.prototype
			 * @name widgetSpec
			 * @field
			 * @public
			 */
			widgetSpec : null,
			
			/**
			 * Invokes the edit action if one exists
			 * 
			 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter.prototype
			 * @name edit
			 * @function
			 * @public
			 */
			edit : function() {},
			
			/**
			 * Invokes the edit action if supported by this adapter/widget
			 * 
			 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter.prototype
			 * @name refresh
			 * @function
			 * @public
			 */
			refresh : function() {
				this.handle.refresh();
			},
			
			/**
			 * Invokes the help action if supported by this adapter/widget
			 * 
			 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter.prototype
			 * @name help
			 * @function
			 * @public
			 */
			help : function() {},
			
			/**
			 * Get the full page (APP) URL referenced by this widget
			 * 
			 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter.prototype
			 * @name getMaxUrlAsync
			 * @function
			 * @public
			 * @return {Object} A promise to obtain a URL to a web page containing a full page view of the current content
			 */
			getMaxUrlAsync : function() {},
			
			/**
			 * Gets the list of actions supported by this site.
			 * 
			 * @example
			 * 	this.site = ...;
			 * 	site.getSupportedActionsAsync().then(
			 * 		function(items) {
			 * 			var i = 0, len = items.length;
			 * 			for (; i < len; i++) {
			 * 				addToMenu(items[i]);
			 * 			}
			 * 		}, function(error) {
			 *  		console.log('Failed to retrieve items');
			 *  	});
			 * 
			 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter.prototype
			 * @name getSupportedActionsAsync
			 * @function
			 * @public
			 * @return {Object} Promise object that retrieves the supported actions.
			 */
			getSupportedActionsAsync : function() {},
			
			/**
			 * @see dijit._Widget.prototype.buildRendering
			 */
			buildRendering : function() {
				this.domNode = domConstruct.create('div');
			},
	
			/**
			 * @see dijit._Widget.prototype.postCreate
			 * 
			 * Set 'placement' for widget spec
			 */
			postCreate : function() {
				this.widgetSpec.placement = this.domNode;
			},
			
			/**
			 * @see dijit._Widget.prototype.startup
			 * 
			 * Invoked after page is rendered. This will either invoke
			 * iContainer.loadWidget() - when this is a clean unload - or use the
			 * injected 'handle' object to complete the widget loading.
			 * 
			 * @TODO - preload
			 */
			startup : function() {
				if (this.handle) {
					throw 'TODO implement preload';
				} else {
					this.handle = iContainer.loadWidget(this.widgetSpec);
				}
			},
			
			/**
			 * @see dijit._Widget.prototype.destroy
			 */
			destroy : function() {			
				// call parent
				this.inherited(arguments);
				
				// unload
				this.handle.unload();
				this.handle = null;
	
				domConstruct.destroy(this.domNode);
				this.domNode = null;
			}
		});
		
		
		/**
		 * This is a the base class for iWidget adapter functionality.
		 * 
		 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter
		 * @name IWidget
		 * @field
		 * @public
		 */
		WidgetAdapter_.IWidget = declare('', WidgetAdapter_, {
			// TODO
		});
		
		/**
		 * This is a the base class for Gadget adapter functionality.
		 * 
		 * @memberOf com.ibm.lconn.gadget.support.WidgetAdapter
		 * @name Gadget
		 * @field
		 * @public
		 */
		WidgetAdapter_.Gadget = declare('', WidgetAdapter_, {
			// TODO
		});
		
	})
	(dojo, 
	 _WidgetModule,
	 _ContainedModule,
	 SiteModule,
	 iContainer2);
	
	return com.ibm.lconn.gadget.support.WidgetAdapter.Gadget;
});
