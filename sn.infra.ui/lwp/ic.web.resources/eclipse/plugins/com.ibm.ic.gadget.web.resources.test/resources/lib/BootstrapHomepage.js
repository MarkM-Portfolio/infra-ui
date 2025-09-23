/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/json",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/dom-style",
	"dojo/text!com/ibm/lconn/gadget/test/lib/templates/BootstrapHomepage.html",
	"dijit/_Container",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-gadget/container/Topics",
	"ic-gadget/container/iContainer2",
	"ic-gadget/util/trace"
], function (dojo, JSON, array, declare, domStyle, template, _ContainerModule, _TemplatedModule, _WidgetModule, Topics, iContainer2, trace) {

	(function(
	 dojo,
	 _Widget,
	 _Container,
	 _Templated,
	 iContainer,
	 _trace,
	 _topics) {
		
		var Modes_ = {
			WIDGET_2COL : '2col',
			WIDGET_3COL : '3col',
			UPDATES : 'updates'
		};
		
		var BootstrapHomepage = declare('com.ibm.lconn.gadget.test.lib.BootstrapHomepage', [_Widget, _Container, _Templated], {
			/* template path */
			templateString: template,
			
			/* Dijit includes other dijits */
			widgetsInTemplate : true,
			
			// widget handle
			_handle : null,
			
			// Widget attributes
			definitionUrl : '',
			userPrefs : {},
			
			// view area
			_mode : Modes_.WIDGET_2COL,
			
			// to fill in widget
			_blankGif : dojo.config.blankGif,
			
			// attach points from original dijit
			titleBar : null,
			maxNode : null,
			root : null,
			body : null,
			containerNode : null,
			iWidgetRootNode : null,
			
			// node for resizing viewable area
			sizer : null,				
		
			// buttons
			loadGadgetButton : null,
			unloadGadgetButton : null,
			
			// changes column values
			colSelectForm : null,
			userPrefsField : null,
			
			postCreate : function() {
				this._resize();
				
				array.forEach(this.colSelectForm.elements, function(colSelect) {
					this.connect(colSelect, 'onchange', '_handleModeChange');
				}, this);
				
				this.connect(this.loadGadgetButton, 'onclick', '_handleLoad');
				this.connect(this.unloadGadgetButton, 'onclick', '_handleUnload');
			},
			
			setDefinitionUrl : function(url) {
				this.definitionUrl = url;
			},
			
			getOptions : function() {
				// this cannot be the best way to do this...
				var elems = this.colSelectForm.elements;
				var _mode_id;
				for(var i=0;i<elems.length;i++) {
					if(elems[i].checked==true) {
						_mode_id = elems[i].id;
					}
				}
				return {"_mode_id":_mode_id, "userPrefsField":this.userPrefsField.value};
			},
			
			setOptions : function(options) {
				if(options._mode_id) {
					document.getElementById(options._mode_id).checked = "checked"; // do it this way so the user sees it and the change is handled.
				}
				this.userPrefsField.value = options.userPrefsField ? options.userPrefsField : this.userPrefsField.value;
				this._handleModeChange(); // not sure why but the onchange is not triggered here so fire manually.
			},
			
			unload : function() {
				this._handleUnload();
			},
			
			/* Set the homepage view mode */
			_handleModeChange : function() {
				var mode = dojo.formToObject(this.colSelectForm).colSelect;
				if (mode !== this._mode) {
					this._mode = mode;
					this._handleUnload();
					this._resize();
				}
			},
			
			/* Load the gadget */
			_handleLoad : function() {
				this._handleUnload();
				
				var spec = {
					definitionUrl: this.definitionUrl,
					componentType : 'gadget',
					placement : this.iWidgetRootNode,
					instanceData : {
						renderParams : {
							width : domStyle.get(this.sizer, 'width')-12,
							userPrefs : this._get_prefs()
						}
					}
				};
				
				this._handle = iContainer.loadWidget(spec);
			},
			
			/* Unload the gadget */
			_handleUnload : function() {
				if (this._handle) {
					this._handle.unload();
					this._handle = null;
				}
			},
			
			/* resize the view area */
			_resize : function() {
				var width = '475px';
				switch (this._mode) {
					case Modes_.WIDGET_2COL :
						width = '475px';
						break;
					case Modes_.WIDGET_3COL :
						width = '320px';
						break;
					case Modes_.UPDATES : 
						width = '260px';
						break;
				}
				domStyle.set(this.sizer, 'width', width);
			},
			
			_get_prefs: function(){
				var userPrefs = this.userPrefsField.value;
				try {
					userPrefs = JSON.parse(userPrefs);
				} catch(e) {
					_trace.log("error running dojo.fromJson on userPrefs, sending plain-text anyway...");
				}
				return userPrefs;
			}
			
		});
	
	})
	(dojo,
	 _WidgetModule,
	 _ContainerModule,
	 _TemplatedModule,
	 iContainer2,
	 trace,
	 Topics);
	return BootstrapHomepage;
});
