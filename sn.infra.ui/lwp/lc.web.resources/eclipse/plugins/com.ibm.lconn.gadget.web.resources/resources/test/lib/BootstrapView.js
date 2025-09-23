/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.test.lib.BootstrapView');

dojo.require('dijit._Widget');
dojo.require('dijit._Container');
dojo.require('dijit._Templated');
dojo.require('dijit.Dialog');

dojo.require('dijit.layout.StackContainer');
dojo.require('dijit.layout.ContentPane');

dojo.require('com.ibm.lconn.gadget.test.lib.BootstrapHomepage');
dojo.require('com.ibm.lconn.gadget.test.lib.BootstrapEE');
dojo.require('com.ibm.lconn.gadget.test.lib.BootstrapShare');

(function(
 dojo,
 _Widget,
 _Container,
 _Templated) {	
	
	dojo.declare('com.ibm.lconn.gadget.test.lib.BootstrapView', [_Widget, _Container, _Templated], {
		/* template path */
		templatePath: dojo.moduleUrl('com.ibm.lconn.gadget', 'test/lib/templates/BootstrapView.html'),
		
		/* Dijit includes other dijits */
		widgetsInTemplate : true,
		
		/* attachpoints */
		viewContainer : null,
		homepageBootstrapPanel : null,
		homepageBootstrap : null,
		eeBootstrapPanel : null,
		eeBootstrap : null,
		shareBootstrapPanel : null,
		shareBootstrap : null,
		
		oldForm : null,
		
		/* render mode */
		renderMode : 'none_initially',
		
		/* setup */
		postCreate : function() {
			this.setRenderMode("EMBEDXP");
		},
		
		/* to connect between */
		setDefinitionUrl : function(url) {
			this.homepageBootstrap.setDefinitionUrl(url);
			this.eeBootstrap.setDefinitionUrl(url);
			this.shareBootstrap.setDefinitionUrl(url);
		},
				
		/* takes: 'EMBEDXP', 'SHAREDIALOG', 'WIDGET' */
		setRenderMode : function(mode) {
			if (this.renderMode !== mode) {
				this.renderMode = mode;
				
				var page = this.eeBootstrapPanel;
				var form = this.eeBootstrap;
				
				switch (mode) {
					case 'EMBEDXP':
						page = this.eeBootstrapPanel;
						form = this.eeBootstrap;
						break;
					case 'SHAREDIALOG':
						page = this.shareBootstrapPanel;
						form = this.shareBootstrap;
						break;
					case 'WIDGET':
						page = this.homepageBootstrapPanel;
						form = this.homepageBootstrap;
						break;
				}
				
				if (this.oldForm) {
					this.oldForm.unload();
				}
				
				this.oldForm = form;
				this.viewContainer.selectChild(page, true);
			}
		}
		
	});

})
(dojo,
 dijit._Widget,
 dijit._Container,
 dijit._Templated);
