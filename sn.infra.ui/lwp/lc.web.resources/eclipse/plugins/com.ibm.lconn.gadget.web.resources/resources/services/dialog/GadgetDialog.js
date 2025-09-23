/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.services.dialog.GadgetDialog");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.Dialog");
dojo.require("dojo.i18n");

dojo.require("com.ibm.lconn.gadget.container.Topics");

dojo.requireLocalization("com.ibm.lconn.gadget", "gadgetDialogStrings");
dojo.requireLocalization("lconn.core", "strings");

dojo.declare("com.ibm.lconn.gadget.services.dialog.GadgetDialog",	
		[dijit._Widget, dijit._Templated],
		{	 
	blankGif: "",
	_extents : {"height": 300, "width": 700}, // Default height and width values if gadget prefs don't override.
	
	nlsCommon : dojo.i18n.getLocalization('lconn.core', 'strings'),

	templatePath: dojo.moduleUrl("com.ibm.lconn.gadget", "services/dialog/templates/GadgetDialog.html"),

	// Popup dialog hosting the preview
	popup: null,
	
	// Set width or height style to gadget prefs if provided by gadget.
	//
	_setExtentStyle : function(widthOrHeight, gadget_metadata) {
		var nodeName = "gadget" + widthOrHeight;
		
		// See if gadget pref has value for this extent
		//
		if ((typeof(gadget_metadata) != "undefined") && (gadget_metadata !=  null)) {
			var modulePrefsParam = gadget_metadata['modulePrefs'][widthOrHeight];
			if (modulePrefsParam != 0) {
				this._extents[widthOrHeight] = modulePrefsParam;
			}
		}
		this[nodeName] = this._extents[widthOrHeight] + "px";
	},
		
	constructor : function(paramsObj) {	
		var setTitle = function(param_default, gadget_metadata){
			var gtitle = "gadgettitle";
			if(typeof gadget_metadata != "undefined") {
				var modulePrefsParam = gadget_metadata['modulePrefs']["title"];
				
				this[gtitle] = modulePrefsParam !== "" ? modulePrefsParam : param_default;
			}
			else {
				this[gtitle] = param_default;
			}
		};
		
				
		setTitle.apply(this, ["Gadget Dialog", paramsObj.gadget_metadata]); // default title is "Gadget Dialog"
		this._setExtentStyle("width", paramsObj.gadget_metadata);
		this._setExtentStyle("height", paramsObj.gadget_metadata);
		
		this.inherited(arguments);
	},

	postMixInProperties : function(){
		this.blankGif=dojo.config.blankGif;
		this.inherited(arguments);
		this.nls = dojo.i18n.getLocalization("com.ibm.lconn.gadget", "gadgetDialogStrings");
	},

	postCreate : function(){

		this._subscribeAll();
		
	},
	
	_subscribeAll: function() {
		var topic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(this.gadgetNodeId, com.ibm.lconn.gadget.container.Topics.GadgetWindow.SITE_TOPIC_SET_TITLE);
		this.subscribe(topic, "onGadgetTitleUpdated");

		// make sure our dialog repositions on resize events
		topic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(this.gadgetNodeId, com.ibm.lconn.gadget.container.Topics.GadgetWindow.AFTER_ADJUST_WIDTH);
		this.subscribe(topic, "onWidthUpdated");

		topic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(this.gadgetNodeId, com.ibm.lconn.gadget.container.Topics.GadgetWindow.AFTER_ADJUST_HEIGHT);
		this.subscribe(topic, "onHeightUpdated");
		
		topic = com.ibm.lconn.gadget.container.Topics.getLifecycleEventTopic(osapi.container.CallbackType.ON_RENDER);
		this.subscribe(topic, "onGadgetLoaded");
	},

	show : function() {
	// Create the popup and show it
		if (this.popup == null) {
			this.popup = new dijit.Dialog();
		}
		this.popup.attr({content: this.domNode, title: ""});
		this.popup.show();
	},
	
	_updateStyles : function() {
		this.popup.resize();

		// the lotusDialog stylings do a good job of scrollbar management
		// eliminate dijit's added style so the CSS can take precedence
		try {
			dojo.style(this.gadgetNode, "overflow", null);
		} catch (e) { /** Throws exception on IE8 */ }	
		
		// If dojo sizes the dialog smaller than the extents requested by the gadget, 
		// Set the container and gadget node styles to automatic values for extent and overflow.
		// 
		var cnHeight = dojo.style(this.popup.containerNode, "height");
		var cnWidth  = dojo.style(this.popup.containerNode, "width");
		
		if (cnHeight < this._extents["height"]) {
			dojo.style(this.gadgetNode, "height", "auto");
			dojo.style(this.popup.containerNode, "height", "auto");
			if (!dojo.isIE) {
				if (dojo.isSafari) {	
					dojo.style(this.gadgetNode, "height", this._extents.height + "px");
				}
				else {
					dojo.style(this.gadgetNode, "height", "auto");
				}
				dojo.style(this.popup.containerNode, "overflow", "visible");
			}
			else  { // dojo.isIE
				dojo.style(this.popup.containerNode,"height", (this._extents.height + 67) + "px");
				dojo.style(this.popup.containerNode, "overflow", "visible");
			}
		}
		if (cnWidth < this._extents["width"]) {
			dojo.style(this.popup.containerNode, "width", "auto");
			if (!dojo.isIE) {
				dojo.style(this.gadgetNode, "width", "auto");
				dojo.style(this.popup.containerNode, "overflow", "visible");
				}
			else { //dojo.isIE
				dojo.style(this.popup.containerNode, "width", (this._extents.width + 25) + "px");
				dojo.style(this.popup.containerNode, "overflow", "visible");
			}
		}
	},
	

	hide : function(){
		this.popup.hide();
	},

	destroy : function(){
		this.inherited(arguments);
	},

	onGadgetTitleUpdated: function(title){
		this.titleNode.innerHTML=title;
	},

	onWidthUpdated: function(title){
		// update our width extent so _updateStyles acts correctly
		this._extents.width = dojo.style(dojo.query("iframe", this.gadgetNode)[0], "width");

		this._updateStyles();
	},

	onHeightUpdated: function(title){
		// update our height extent so _updateStyles acts correctly
		this._extents.height = dojo.style(dojo.query("iframe", this.gadgetNode)[0], "height");
		
		this._updateStyles();
	},
	
	// After gadget loads, update IFRAME scrolling for IE
	//
	onGadgetLoaded:  function(gadgetUrl, siteId){
		if (dojo.isIE && siteId == this.gadgetNodeId) {	// only react if *this* gadget just loaded
		//
		// Have to force the iframe to reload for the scrolling to take effect.
		//
			if(siteId === this.gadgetNodeId) {
				var iframeNode = dojo.query("iframe", dojo.byId(siteId))[0];
				if (iframeNode) {
					if (dojo.attr(iframeNode, "scrolling") == "no") {
						dojo.attr(iframeNode, "scrolling", "auto");
					
//						var parent = iframeNode.parentNode;
//						var parentInner = parent.innerHTML;
//						parent.removeChild(iframeNode);
//					
//						dojo.place(parentInner, parent);
					}
				}
			}
		}
		/* with iframe height > 300 we get vertical scrollbar outside iframe, 
		 * which forces an unnecessary horizontal scrollbar.
		 * with iframe height 300 or less, we get vertical scrollbar inside iframe (if needed)
		 * and no horizontal scrollbars!
		 */
		var iframeNode = dojo.query("iframe", this.gadgetNode)[0];
		if (iframeNode) {
			dojo.style(iframeNode, "maxHeight", "300px");
			dojo.style(this.gadgetNode, {"height": "auto", "width":"auto"});
			this._updateStyles();
		
			if(dojo.query("iframe", this.gadgetNode).length > 0)
				dojo.query("iframe", this.gadgetNode)[0].setAttribute("role", "presentation");
			}
	},
	
	/** Called when X clicked */
	closeDialog : function(){
		// Close the popup
		this.hide();
	}
});
