/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/text!com/ibm/lconn/gadget/test/lib/templates/BootstrapView.html",
	"dijit/_Templated",
	"dijit/Dialog",
	"dijit/_Widget",
	"dijit/_Container",
	"dijit/layout/ContentPane",
	"dijit/layout/StackContainer",
	"ic-gadget/test/lib/BootstrapEE",
	"ic-gadget/test/lib/BootstrapHomepage",
	"ic-gadget/test/lib/BootstrapShare"
], function (declare, template, _TemplatedModule, Dialog, _WidgetModule, _ContainerModule, ContentPane, StackContainer, BootstrapEE, BootstrapHomepage, BootstrapShare) {

	(function(
	 dojo,
	 _Widget,
	 _Container,
	 _Templated) {	
		
		var BootstrapView = declare('com.ibm.lconn.gadget.test.lib.BootstrapView', [_Widget, _Container, _Templated], {
			/* template path */
			templateString: template,
			
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
	 _WidgetModule,
	 _ContainerModule,
	 _TemplatedModule);
	return BootstrapView;
});
