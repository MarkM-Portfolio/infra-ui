/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.GatekeeperFlag");

dojo.require("dojox.html.entities");

dojo.require("lconn.highway.util.restAPI");
dojo.require("lconn.highway.util.validate");
dojo.require("lconn.highway.util.styling");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");

dojo.require("lconn.highway.dijit.Info");

dojo.requireLocalization("lconn.highway", "strings");

dojo.declare(
		// widget name and class
		"lconn.highway.dijit.GatekeeperFlag",	
		[dijit._Widget, dijit._Templated, dijit._Container],	
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/gatekeeperFlag.html"),
			
			// organization : null, -- mixed in
			// name : null, -- mixed in
			// value : null, -- mixed in
			// description : null, -- mixed in
			// isDefault : null, -- mixed in
			// javascriptName : null, -- mixed in
			// info: null, -- mixed in
			
			// messageContainerNode : null -- dojo attach for the message container
			// titleNode : null, -- dojo attach for the titleNode
			// valueNode : null, -- dojo attach for valueNode
			// valueUpdatingNode : null, -- dojo attach for valueUpdatingNode
			// valueEditNode : null, -- dojo attach for valueEditNode
			// valueEditSelectNode : null, -- dojo attach for valueEditTextBox
			// editActionNode : null, -- dojo attach for settingsRole
			// saveActionNode : null, -- dojo attach for saveActionNode
			// cancelActionNode : null, -- dojo attach for cancelActionNode
			
			messageContainer: null,

			// private
			_resourceBundle: null,
			
			/**
			 * Set the properties of the setting 
			 */
			constructor: function(object) {
				console.log("GatekeeperFlag constr");
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				console.log("GatekeeperFlag constr end");
			},
			
			postCreate: function(){
				
				// setup the value
				this.valueEditSelectNode.value = this.value;
				
				// set up the message container in case we need it
				this.messageContainer = new lconn.highway.dijit.MessageContainer({small:true}, this.messageContainerNode);
				this._updateSettingValue();
				this._setMode("VALUE");
			},
			
			_setMode: function(mode){
				if (mode == "EDIT") {
					dojo.addClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.valueUpdatingNode, "lotusHidden");
					dojo.removeClass(this.valueEditNode, "lotusHidden");
					dojo.removeClass(this.saveActionNode, "lotusHidden");
					dojo.removeClass(this.cancelActionNode, "lotusHidden");
					dojo.addClass(this.editActionNode, "lotusHidden");
					
				} else if (mode == "UPDATING") { 
					dojo.addClass(this.editActionNode, "lotusHidden");
					dojo.removeClass(this.valueUpdatingNode, "lotusHidden");
					dojo.addClass(this.valueEditNode, "lotusHidden");
					dojo.addClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.saveActionNode, "lotusHidden");
					dojo.addClass(this.cancelActionNode, "lotusHidden");
				} else { // mode == "VALUE"
					dojo.removeClass(this.editActionNode, "lotusHidden");
					dojo.addClass(this.valueUpdatingNode, "lotusHidden");
					dojo.addClass(this.valueEditNode, "lotusHidden");
					dojo.removeClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.saveActionNode, "lotusHidden");
					dojo.addClass(this.cancelActionNode, "lotusHidden");					
				}
				
			},
			
			onCancel: function(){
				this._setMode("VALUE");
			},

			onEdit: function(){
				this._setMode("EDIT");
			},
			
			onSave : function(){
				var newValue = this.valueEditSelectNode.value;
				var caller = new lconn.highway.util.restAPI.Caller(dojo.hitch(this, "handlePostResponse"));
				this._setMode("UPDATING");
				caller.postGatekeeperSetting(this.organization, this.name, newValue);
			},
			
			onSettingFocus: function(){
				dojo.addClass(this.titleNode, "lotusBold");
				dojo.addClass(this.valueNode, "lotusBold");
				this._updateSettingInfo();
			},
			
			onSettingBlur: function(){
				dojo.removeClass(this.titleNode, "lotusBold");
				dojo.removeClass(this.valueNode, "lotusBold");
			},
			
			onMouseOver: function(){
				dojo.addClass(this.titleNode, "lotusBig");
				dojo.addClass(this.valueNode, "lotusBig");
			},
			
			onMouseOut: function(){
				dojo.removeClass(this.titleNode, "lotusBig");
				dojo.removeClass(this.valueNode, "lotusBig");
			},
			
			handlePostResponse: function(success, message, json) {
				console.log('handlePostResponse called');
				if(!success) {
					this.messageContainer.createMessage(message, "ERROR", true);
					console.error("API Error: %o", message);
					this._setMode("EDIT");
				} else {
					if ((json.settings != null) && (json.settings.length > 0)) {
						this.isDefault= json.settings[0].isDefault;
						this.value= json.settings[0].value;
						this._updateSettingValue();	
						this._setMode("VALUE");
					} else {
						this.messageContainer.createMessage("Unexpected response", "ERROR", true); // shouldn't really get here
						this._setMode("EDIT");
					}
				}
			},
			
			_updateSettingValue: function(object) {
				this.valueNode.innerHTML = this.value ? this._resourceBundle.trueText : this._resourceBundle.falseText;
				if (!this.isDefault)
					lconn.highway.util.styling.styleNode("BLUE", this.tableNode);
				else
					lconn.highway.util.styling.styleNode("GRAY", this.tableNode);
			},
			
			_updateSettingInfo: function() {
				// Javascript name
				var javascriptName = ((this.javascriptName != null) && (this.javascriptName.length > 0)) ? this.javascriptName : "[not defined]";
				
				this.info.clear();
				this.info.addTextField(this._resourceBundle.helpSettingTitle, this.name);
				this.info.addTextField(this._resourceBundle.helpSettingDescription, this.description);
				this.info.addBooleanField(this._resourceBundle.helpSettingIsDefault, this.isDefault);
				this.info.addBooleanField(this._resourceBundle.helpSettingIsGlobal, this.isGlobal);
				this.info.addTextField(this._resourceBundle.helpSettingJavascriptName, this.javascriptName);
			}
		}
	);


