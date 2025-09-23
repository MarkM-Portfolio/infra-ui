/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.support.Preloader');

dojo.require('com.ibm.lconn.gadget.container.iContainer2');
dojo.require('com.ibm.lconn.gadget.util.trace');

dojo.require('dijit._Widget');


(function (dojo, _Widget, iContainer, trace) {
	
	/**
	 * Dijit for programatically preloading widgets. This is equivalent to the
	 * preload() iContainer method (@see
	 * com.ibm.lconn.gadget.container.Container.prototype.preload).
	 * 
	 * @example
	 * 	<div dojoType="com.ibm.lconn.gadget.support.Preloader"
	 * 		 widgets="['../../gadgets/helo.xml', '../../iWidgets/hello.xml']"/>
	 * 
	 * @name com.ibm.lconn.gadget.support.Preloader
	 * @class
	 * @public
	 */
	dojo.declare('com.ibm.lconn.gadget.support.Preloader', [_Widget], {
		
		/**
		 * REQUIRED parameter of dijit to preload gadgets. This takes an array
		 * of widgetSpecs containing at least {definitionUrl, componentType}
		 * 
		 * @memberOf com.ibm.lconn.gadget.support.Preloader.prototype
		 * @name widgetSpecs
		 * @field
		 * @public
		 */
		widgetSpecs : null,
		
		/**
		 * @see dijit._Widget.prototype.buildRendering
		 */
		buildRendering : function() {
			this.domNode = dojo.create('div');
		},
		
		/**
		 * @see dijit._Widget.prototype.buildRendering
		 */
		postCreate : function() {
			this.inherited(arguments);
			
			var widgets = this.widgetSpecs || [];
			
			if (!widgets) {
				trace.error('Preloader was not supplied "widgetSpecs" argument.');
			} else if (!dojo.isArray(widgets)) {
				trace.error('"widgets" argument to Preloader is not an array.');
			} else {
				
				// TODO - Hack
				//  CRE defect: 
				//  Will remove when preloadWidgets() fixed
				var dom = this.domNode;
				dojo.forEach(widgets, function(w) {
					w.placement = dom;
				})
				
				iContainer.preloadWidgets(widgets).then(function() {
					trace.debug('Successfully preloaded: {o}', widgets);
				});
			}
		},
		
		/**
		 * @see dijit._Widget.prototype.destroy
		 */
		destroy : function() {
			this.inherited(arguments);			
			dojo.destroy(this.domNode);
			this.domNode = null;			
		}
	});
	
})
(dojo, 
 dijit._Widget,
 com.ibm.lconn.gadget.container.iContainer2,
 com.ibm.lconn.gadget.util.trace);
