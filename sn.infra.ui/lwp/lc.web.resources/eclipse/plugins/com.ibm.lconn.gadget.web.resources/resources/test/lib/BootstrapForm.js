/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.test.lib.BootstrapForm');

dojo.require('com.ibm.lconn.gadget.config.settings');

dojo.require('dojo.i18n');

dojo.require('dijit._Widget');
dojo.require('dijit._Container');
dojo.require('dijit._Templated');

dojo.require('dijit.form.Form');
dojo.require('dijit.form.Button');
dojo.require('dijit.form.TextBox');
dojo.require('dijit.form.RadioButton');

dojo.requireLocalization('com.ibm.lconn.gadget', 'bootstrapFormStrings');

(function(
 dojo,
 _Widget,
 _Container,
 _Templated,
 developerSettings_) {
	
	var Export_ = dojo.declare('com.ibm.lconn.gadget.test.lib.BootstrapForm', [_Widget, _Container, _Templated], {
		/* template path */
		templatePath : dojo.moduleUrl('com.ibm.lconn.gadget', 'test/lib/templates/BootstrapForm.html'),
		
		/* Dijit includes other dijits */
		widgetsInTemplate : true,
		
		/* Properties */
		style : "",
		
		/* Localization */
		_nls : dojo.i18n.getLocalization('com.ibm.lconn.gadget', 'bootstrapFormStrings', 'en'),
		
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
			return this._gadgetUrl.attr('value');
		},
		
		getGadgetUrlFormatted : function() {
			return this._gadgetUrlFormated.attr('value')();
		},
		
		// connect to form change events
		postCreate : function() {
			this.connect(this._gadgetUrl, "onChange", "_handleDataChange");

			// dijit
			dojo.forEach(this._gadgetAccessForm.getChildren(), function (field) {
				this.connect(field, "onChange", "_handleDataChange");
			}, this);
			
			// html
			dojo.forEach(this._gadgetAccessForm.domNode.elements, function (field) {
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
				this._gadgetUrlFormated.attr('value', fUrl);
			} else {
				this._gadgetUrlFormated.attr('value', '');
			}
			
			this.setRenderMode(dojo.formToObject(this._gadgetAccessForm.domNode).__dev_appContexts__);
		}
		
	});

//	dojo.extend(Export_, lconn.core.util.dojoPatches.TemplatedPatch);
	
})
(dojo,
 dijit._Widget,
 dijit._Container,
 dijit._Templated,
 com.ibm.lconn.gadget.config.settings.developer);
