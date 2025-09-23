/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/i18n!com/ibm/lconn/gadget/nls/bootstrapFormStrings",
	"dojo/text!com/ibm/lconn/gadget/test/lib/templates/BootstrapForm.html",
	"dijit/form/Button",
	"dijit/form/TextBox",
	"dijit/form/RadioButton",
	"dijit/_Widget",
	"dijit/_Container",
	"dijit/_Templated",
	"dijit/form/Form",
	"ic-gadget/config/settings"
], function (dojo, array, declare, i18n, i18nbootstrapFormStrings, template, Button, TextBox, RadioButton, _WidgetModule, _ContainerModule, _TemplatedModule, Form, settings) {

	(function(
	 dojo,
	 _Widget,
	 _Container,
	 _Templated,
	 developerSettings_) {
		
		var Export_ = var BootstrapForm = declare('com.ibm.lconn.gadget.test.lib.BootstrapForm', [_Widget, _Container, _Templated], {
			/* template path */
			templateString: template,
			
			/* Dijit includes other dijits */
			widgetsInTemplate : true,
			
			/* Properties */
			style : "",
			
			/* Localization */
			_nls : i18n.getLocalization(ibm.lconn.gadget', 'bo, strapFormStrings', 'en, ,
			),
			
			/* Internal AttachPoints */
			_gadgetUrlForm : null, 		// Form dijit		
			_gadgetAccessForm : null,	// Form dijit
			
			_gadgetUrl : null,			// Field dijit
			_gadgetUrlFormated : null,	// Field dijit
			
			/* Attachpoints for disablement */
			_proxyAccessIntranet : null,
			_proxyAccessIntranetText : null,
			_proxyAccessExternalOnly : null,
			
			_featureAccessSSO : null,
			_featureAccessSSOText : null,
			_featureAccessKitchenSink : null,
			_featureAccessKitchenSinkText : null,
			
			// dummy method for linking
			setRenderMode : function(mode) {},
			
			//
			// Getters
			//
			getGadgetUrl : function() {
				return this._gadgetUrl.get('value');
			},
			
			getGadgetUrlFormatted : function() {
				return this._gadgetUrlFormated.get('value')();
			},
			
			// connect to form change events
			postCreate : function() {
				this.connect(this._gadgetUrl, "onChange", "_handleDataChange");
	
				// dijit
				array.forEach(this._gadgetAccessForm.getChildren(), function (field) {
					this.connect(field, "onChange", "_handleDataChange");
				}, this);
				
				// html
				array.forEach(this._gadgetAccessForm.domNode.elements, function (field) {
					this.connect(field, "onchange", "_handleDataChange");
				}, this);
				
				// disable bad fields
				if (!developerSettings_.allowSSOFeature) {
					this._featureAccessSSO.disabled = true;
					this._featureAccessSSOText.style.setProperty("text-decoration", "line-through");
					this._featureAccessKitchenSink.disabled = true;
					this._featureAccessKitchenSinkText.style.setProperty("text-decoration", "line-through");
				}
				
				if (!developerSettings_.allowIntranetProxyAccess) {
					this._proxyAccessIntranet.checked = false;
					this._proxyAccessIntranet.disabled = true;
					this._proxyAccessIntranetText.style.setProperty("text-decoration", "line-through");
					this._proxyAccessExternalOnly.checked = true;
				}
			},
			
			/* handles data change */
			_handleDataChange : function() {
				var gUrl = this.getGadgetUrl();
				var query = dojo.formToQuery(this._gadgetAccessForm.domNode);
				var fUrl = null;
				
				if (gUrl.indexOf('?') >= 0) {
					fUrl = [gUrl, '&', query].join(''); 
				} else {
					fUrl = [gUrl, '?', query].join(''); 
				}
				
				if (gUrl.length > 0) {
					this._gadgetUrlFormated.set('value', fUrl);
				} else {
					this._gadgetUrlFormated.set('value', '');
				}
				
				this.setRenderMode(dojo.formToObject(this._gadgetAccessForm.domNode).__dev_appContexts__);
			}
			
		});
	
	//	dojo.extend(Export_, lconn.core.util.dojoPatches.TemplatedPatch);
		
	})
	(dojo,
	 _WidgetModule,
	 _ContainerModule,
	 _TemplatedModule,
	 settings.developer);
	return BootstrapForm;
});
