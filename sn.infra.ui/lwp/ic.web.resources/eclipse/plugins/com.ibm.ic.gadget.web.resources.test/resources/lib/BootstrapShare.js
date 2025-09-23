/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-style",
	"dojo/text!com/ibm/lconn/gadget/test/lib/templates/BootstrapShare.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/_Container",
	"ic-core/config",
	"ic-core/config/services",
	"ic-core/url",
	"ic-gadget/container/iContainer2",
	"ic-gadget/test/lib/authUtils",
	"ic-gadget/util/trace",
	"ic-incontext/util/proxy",
	"ic-sharebox/controls/ShareboxDialog",
	"ic-sharebox/data/ConfigDataStore",
	"ic-ui/util/proxy"
], function (declare, lang, domStyle, template, _TemplatedModule, _WidgetModule, _ContainerModule, config, services, urlModule, iContainer2, authUtils, trace, ibmSocialIncontextUtilProxy, ShareboxDialog, ConfigDataStore, proxy) {

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
		var loginSuccess_ = authUtils.isAuthenticated;
		
		var BootstrapShare = declare('com.ibm.lconn.gadget.test.lib.BootstrapShare', [_Widget, _Container, _Templated], {
			/* template path */
			templateString: template,
			
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
				this.connect(this.openGlobalShareButton, 'onclick', lang.hitch(this, '_handleShare', {type: "global"}));
				if (loginSuccess_) {
					// just cheat, add to the data returned by the server.
					var safeData = ConfigDataStore.prototype.handleData;
					ConfigDataStore.prototype.handleData = lang.hitch(this, function(req, data){
						data["forms"].push({inline:false, parameters: {}, url:this.definitionUrl});
						safeData(req, data);
					});
					domStyle.set(this.shareDialog, "display", "none");
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
			_WidgetModule,
			_ContainerModule,
			_TemplatedModule,
			iContainer2,
			ShareboxDialog,
			urlModule,
			services,
			proxy,
			trace);
	return BootstrapShare;
});
