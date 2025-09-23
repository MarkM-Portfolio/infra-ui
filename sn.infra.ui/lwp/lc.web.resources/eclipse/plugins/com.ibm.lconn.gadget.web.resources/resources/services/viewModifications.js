/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.services.viewModifications');

dojo.require("com.ibm.lconn.gadget.container.Views");
dojo.require("com.ibm.lconn.gadget.services.ViewContainer");
dojo.require("com.ibm.lconn.gadget.services.dialog.GadgetDialog");
dojo.require("com.ibm.lconn.gadget.container.Topics");

dojo.require("com.ibm.lconn.gadget.util.specHelper");
dojo.require('com.ibm.lconn.gadget.util.trace');

dojo.require("lconn.core.url");

com.ibm.lconn.gadget.services.viewModifications = 
	(function(lconn_core_url,
			_trace) {
		/* API to export */
		var api_ = {};
		/* ViewContainer / View implementation singleton */
		var view_container = com.ibm.lconn.gadget.container.Views.__instance__();
		/* function to get the next domId */
		var nextDomId_ = com.ibm.lconn.gadget.util.specHelper.nextDomId;
		
		var publish_GadgetSite_event_from_func = function(function_name, event_name) {
			var orig_func = osapi.container.GadgetSite.prototype[function_name];
			
			osapi.container.GadgetSite.prototype[function_name] = function() {
				orig_func.apply(this, arguments);
				
				var topic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(this.getId(), com.ibm.lconn.gadget.container.Topics.GadgetWindow[event_name]);
				dojo.publish(topic, Array.prototype.slice.call(arguments, 0));
			};
		};
		
		/**
		 * Associate the view_container instance with a container
		 * @function
		 * @public
		 * @memberOf com.ibm.lconn.gadget.services.viewModification
		 * @param container {osapi.container.Container} Instance of common container
		 */
		api_.registerService = function(container) {
			var cviews = container.views;
			
			/*
			 * Bind view_container to common container instance.
			 */
			view_container.bindContainer(container);
			
			/*
			 * Associate container methods with view_container variants
			 */
			cviews.createElementForGadget = dojo.hitch(view_container, 'createElementForGadget');
			cviews.createElementForEmbeddedExperience = dojo.hitch(view_container, 'createElementForEmbeddedExperience');
			cviews.createElementForUrl = dojo.hitch(view_container, 'createElementForUrl');
			cviews.destroyElement = dojo.hitch(view_container, 'destroyElement');
			

			/*
			 * Add the requestNavigateTo method
			 */
			container.rpcRegister("requestNavigateTo", function(rpcArgs, toView, opt_params, opt_ownerId){
				var gadgetSite = rpcArgs.gs;
				var gadgetUrl = gadgetSite.currentGadgetHolder_.gadgetInfo_.url;
				var renderParams = gadgetSite.currentGadgetHolder_.renderParams_ || {};
				renderParams.view = toView;
				
				var viewParams = { };
				if (opt_params) {
						 if (dojo.isObject(opt_params)) {
						 		 dojo.mixin(viewParams, opt_params);
						 } else if (dojo.isString(opt_params)) {
						 		 dojo.mixin(viewParams, lconn_core_url.splitQuery(opt_params));
						 } else {
							 _trace.log("opt_params passed to gadgets.views.requestNavigateTo could not be processed.", opt_params);
						 } 
				}
				
				container.navigateGadget(gadgetSite, gadgetUrl, viewParams, renderParams, null);
			});
			

			// add resize events manually			
			publish_GadgetSite_event_from_func("setHeight", "AFTER_ADJUST_HEIGHT");
			publish_GadgetSite_event_from_func("setWidth", "AFTER_ADJUST_WIDTH");
		};
		
		/*
		 * Setup view defaults
		 */
		view_container.registerCreateElementGadgetHandler(null, d_createElementForGadget, d_destroyElement);
		view_container.registerCreateElementForEEHandler(null, d_createElementForEmbeddedExperience, d_destroyElement);
		view_container.registerCreateElementForUrlHandler(null, d_createElementForUrl, d_destroyElement);
		

		/**
		 * Method will be called to create the DOM element to place the Gadget Site in.
		 */
		function d_createElementForGadget(metadata, rel, opt_view, opt_viewTarget, opt_coordinates, parentSite) 
		{
			var surfaceView = opt_view || 'default';
			var viewTarget = opt_viewTarget || 'default';

			switch (viewTarget.toLowerCase()) {
			case "modaldialog":
				return _openInDialog(this, true, surfaceView, true, metadata);
				break;
			default:
				return _openInDialog(this, true, surfaceView, true, metadata);
			}
		};

		/**
		 * Method will be called to create the DOM element to place the embedded
		 * experience in.
		 * 
		 * using gadgets.selection to pass the ActivityStream Item or any other information
		 * relevant to the Embedded Experience chrome such as title etc. Hoping to have
		 * this passed directly to this function in future.
		 */
		function d_createElementForEmbeddedExperience(rel, opt_gadgetInfo, opt_viewTarget, opt_coordinates, parentSite){
			//console.log("function createElementForEmbeddedExperience is extremely minimal!");
			return _openInDialog(this, true, "embedded", true);
		};

		/**
		 * Method will be called to create the DOM element to place the UrlSite
		 * in.
		 * 
		 * currently forwarded directly to EE code.
		 */
		function d_createElementForUrl(rel, opt_viewTarget, opt_coordinates, parentSite){
			return d_createElementForEmbeddedExperience.apply(this, arguments);
		};

		/**
		 * Method will be called when a gadget wants to close itself or the parent
		 * gadget wants to close a gadget or url site it has opened.
		 *
		 * @param {object=} site
		 *          The id of the site to close. maybe.
		 */
		function d_destroyElement(site) {
			closeDialog(this, site);
		};

		/**
		 * private method will be called to create the dialog DOM element.
		 * @private
		 * @param {osapi.container.Container} container
		 * 	Common container instance.
		 * @param {boolean} modaldialog
		 *          true for modal dialog.
		 * @param {string} view
		 *          view type.
		 * @param {boolean} isGadget
		 *          true for gadget, false for url.
		 * @param {string} opt_gadgetMetadata
		 *          gadget metadata.
		 * @return {Object} The DOM element to place the gadget or url site object in.
		 */
		function _openInDialog(container, modaldialog, view, isGadget, opt_gadgetMetadata, opt_pos) {

			var gadgetNodeId = nextDomId_();

			var dialogParams = {
					"id":"gadget_dialog_"+gadgetNodeId,
					"gadgetNodeId":gadgetNodeId,
					"gadget_metadata" : opt_gadgetMetadata
			};
			var dialog = new com.ibm.lconn.gadget.services.dialog.GadgetDialog(dialogParams);

			// this is important, we need to make sure we close the gadget properly if the user closes our dialog
			// some dialog gadgets will set a return value, closing them correctly makes sure this is passed back
			dialog.closeDialog = function() {
				var iFrameId = dojo.attr(dojo.query("#"+gadgetNodeId+">iframe")[0], "id");
				d_destroyElement.call(container, container.getGadgetSiteByIframeId_(iFrameId));
			};
			dialog.show();
			
			return dialog.gadgetNode;
		}
		
		/**
		 * private method will be called to destroy dialog object.
		 * @private
		 * @param {osapi.container.Container} container
		 * 	Common container instance.
		 * @param {object} site
		 *          gadget site.
		 */
		function closeDialog(container, site) {
			var base = site.el_.id;
			var dialogId = "gadget_dialog_"+base;

			container.closeGadget(site);

			var dialog = dijit.byId(dialogId);
			if(dialog){
				dialog.hide();
				dialog.destroyRecursive();
			}
		}
		
		return api_;
	})(lconn.core.url,
			com.ibm.lconn.gadget.util.trace);
