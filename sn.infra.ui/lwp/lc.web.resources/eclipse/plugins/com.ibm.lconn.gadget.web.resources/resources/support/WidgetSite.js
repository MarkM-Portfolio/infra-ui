/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.support.WidgetSite');

dojo.require('com.ibm.lconn.gadget.support.Site');
dojo.require('com.ibm.lconn.gadget.support.WidgetAdapter');
dojo.require('com.ibm.lconn.gadget.container.iContainer2');

dojo.require('dijit._Widget');
dojo.require('dijit._Container');

/**
 * Concrete Dijit class for painting the main widget chrome and converting site calls
 * 
 * @class
 */
(function (Site, WidgetAdapter, iContainer, _Widget, _Container) {

	dojo.declare('com.ibm.lconn.gadget.support.WidgetSite', [_Widget, _Container, Site], {
		
		/**
		 * This is a plug point for component applications to add functionality to the behavior of the Gadget site.
		 * 
		 * @example
		 *  var WidgetSite_ = com.ibm.lconn.gadget.support.WidgetSite;
		 *  
		 *  dojo.declare('...HomepageWidgetSite', [WidgetSite_] {
		 *  	GadgetAdapter : dojo.declare('', [WidgetSite_.prototype.GadgetAdapter], {
		 *  		edit : function() { 
		 * 				// invoke homepage edit UI
		 * 			}
		 *  	}),
		 *  
		 *  	...  
		 *  });
		 * 
		 * @memberOf com.ibm.lconn.gadget.support.WidgetSite.prototype
		 * @name GadgetAdapter
		 * @field
		 * @public
		 */
		GadgetAdapter : WidgetAdapter.Gadget,
		
		/**
		 * This is a t point for component applications to add functionality to the behavior of the iWidget site.
		 * 
		 * @example
		 *  var WidgetSite_ = com.ibm.lconn.gadget.support.WidgetSite;
		 *  
		 *  dojo.declare('...HomepageWidgetSite', [WidgetSite_] {
		 *  	GadgetAdapter : dojo.declare('', [WidgetSite_.prototype.IWidgetAdapter], {
		 *  		edit : function() { 
		 * 				// invoke homepage edit UI
		 * 			}
		 *  	}),
		 *  
		 *  	...  
		 *  });
		 * 
		 * @memberOf com.ibm.lconn.gadget.support.WidgetSite.prototype
		 * @name IWidgetAdapter
		 * @field
		 * @public
		 */
		IWidgetAdapter : WidgetAdapter.IWidget,
				
		/**
		 * Child component for rendering calls calls to component model
		 * @field
		 * @private
		 */
		_adapter : null,
		
		/**
		 * Specification of this widget
		 * @see com.ibm.lconn.gadget.container.Container.prototype.loadWidget
		 * @field
		 * @public
		 */
		widgetSpec : null,
		
		/**
		 * @see com.ibm.lconn.gadget.support.Site.prototype.edit
		 */
		edit : function() {
			this._adapter.edit();
		},
		
		/**
		 * @see com.ibm.lconn.gadget.support.Site.prototype.refresh
		 */
		refresh : function() {
			this._adapter.refresh();			
		},
		
		/**
		 * @see com.ibm.lconn.gadget.support.Site.prototype.help
		 */
		help : function() {
			this._adapter.help();
		},
		
		/**
		 * @see com.ibm.lconn.gadget.support.Site.prototype.getMaxUrlAsync
		 */
		getMaxUrlAsync : function() {
			return this._adapter.getMaxUrlAsync();
		},
		
		/**
		 * @see com.ibm.lconn.gadget.support.Site.prototype.refresh
		 */
		getSupportedActionsAsync : function() {
			return this._adapter.getSupportedActionsAsync();
		},
		
		/**
		 * @see dijit._Widget.prototype.buildRendering
		 * 
		 * Creates dijit._Widget.domNode
		 */
		buildRendering : function() {
			this.containerNode = this.domNode = dojo.create('div');
		},
		
		/**
		 * Create widget adapter
		 * @see dijit._Widget.prototype.postCreate
		 */
		postCreate : function() {
			var spec = this.widgetSpec,
				adapter = null;
			
			switch (spec.componentType) {
				case 'gadget':					
					adapter = new this.GadgetAdapter({widgetSpec: spec});
					break;
				case 'iWidget':
				default: /* default consistent with CRE */
					adapter = new this.IWidgetAdapter({widgetSpec: spec});
					break;
			}
			
			this.addChild(this._adapter = adapter);
		},		
		
		/**
		 * @see dijit._Widget.prototype.destroy
		 */
		destroy : function() {
			// call parent; should automagically destroy adapter
			this.inherited(arguments);
			
			dojo.destroy(this.domNode);
			this.domNode = null;
		}
	});
	
})
(com.ibm.lconn.gadget.support.Site,
 com.ibm.lconn.gadget.support.WidgetAdapter,		
 com.ibm.lconn.gadget.container.iContainer2,
 dijit._Widget,
 dijit._Container);
