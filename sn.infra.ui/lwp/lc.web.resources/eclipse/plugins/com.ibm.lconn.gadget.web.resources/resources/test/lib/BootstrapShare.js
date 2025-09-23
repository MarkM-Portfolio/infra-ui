/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.test.lib.BootstrapShare');

dojo.require('dijit._Widget');
dojo.require('dijit._Container');
dojo.require('dijit._Templated');

dojo.require('lconn.core.url');
dojo.require('lconn.core.config.services');

dojo.require('com.ibm.oneui.util.proxy');

dojo.require('com.ibm.social.sharebox.data.ConfigDataStore');
dojo.require('com.ibm.social.sharebox.controls.ShareboxDialog');
dojo.require('com.ibm.social.incontext.util.proxy');

dojo.require('com.ibm.lconn.gadget.test.lib.authUtils');

dojo.require('com.ibm.lconn.gadget.container.iContainer2');
dojo.require('com.ibm.lconn.gadget.util.trace');

(function(
		dojo,
		_Widget,
		_Container,
		_Templated,
		iContainer,
		ShareboxDialog_,
		lconn_core_url_,
		lconn_core_config_services_,
		com_ibm_oneui_util_proxy_,
		_trace) {

	// hook to indicate login fail
	var loginSuccess_ = com.ibm.lconn.gadget.test.lib.authUtils.isAuthenticated;
	
	dojo.declare('com.ibm.lconn.gadget.test.lib.BootstrapShare', [_Widget, _Container, _Templated], {
		/* template path */
		templatePath: dojo.moduleUrl('com.ibm.lconn.gadget', 'test/lib/templates/BootstrapShare.html'),
		
		/* Dijit includes other dijits */
		widgetsInTemplate : loginSuccess_,

		disableButtons : (loginSuccess_) ? '' : 'disabled="disabled"', 

		buttonStyle : (loginSuccess_) ? 'lotusBtn' : 'lotusBtnDisabled',
		
		// Widget attributes
		definitionUrl : '',
		
		// attach points
		shareDialog : null,
		preloadGadgetButton : null,
		openGlobalShareButton : null,

		// internal structures
		_handle : null,
		
		//
		postCreate : function() {		
			this.connect(this.openGlobalShareButton, 'onclick', dojo.hitch(this, '_handleShare', {type: "global"}));
			if (loginSuccess_) {
				// just cheat, add to the data returned by the server.
				var safeData = com.ibm.social.sharebox.data.ConfigDataStore.prototype.handleData;
				com.ibm.social.sharebox.data.ConfigDataStore.prototype.handleData = dojo.hitch(this, function(req, data){
					data["forms"].push({inline:false, parameters: {}, url:this.definitionUrl});
					safeData(req, data);
				});
				dojo.style(this.shareDialog, "display", "none");
			}
		},
		
		// set the definition URL
		setDefinitionUrl : function(url) {
			this.definitionUrl = url;
		},
		
		getOptions : function() {
			// no op
		},
		
		setOptions : function(options) {
			// no op
		},

		/* Load the sharebox */
		_handleShare : function(ctx) {
			com.ibm.social.sharebox.show(ctx);
		},
		
		// no op, cannot un-preload gadgets, but sometimes called when switching render modes
		unload : function() {}
	});

})
(dojo,
		dijit._Widget,
		dijit._Container,
		dijit._Templated,
		com.ibm.lconn.gadget.container.iContainer2,
		com.ibm.social.sharebox.controls.ShareboxDialog,
		lconn.core.url,
		lconn.core.config.services,
		com.ibm.oneui.util.proxy,
		com.ibm.lconn.gadget.util.trace);
