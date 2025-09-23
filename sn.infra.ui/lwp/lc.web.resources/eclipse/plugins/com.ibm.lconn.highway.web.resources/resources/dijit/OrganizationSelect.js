/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.OrganizationSelect");

dojo.require("dojox.html.entities");

dojo.require("lconn.highway.util.restAPI");
dojo.require("lconn.highway.util.validate");
dojo.require("lconn.highway.util.styling");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");

dojo.requireLocalization("lconn.highway", "strings");

dojo.declare(
		// widget name and class
		"lconn.highway.dijit.OrganizationSelect",	
		[dijit._Widget, dijit._Templated, dijit._Container],	
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/organizationSelect.html"),
			
			userOrgText : "[Current Users Organization]", // default - will be overridden from nls
			title: "Organization", // default - will be overridden from nls
			value: "", // default
			orgchangeCallback: null,
			
			// messageContainerNode : null -- dojo attach for the message container
			// titleNode : null, -- dojo attach for the titleNode
			// valueNode : null, -- dojo attach for valueNode
			// valueEditNode : null, -- dojo attach for valueEditNode
			// valueEditTextBox : null, -- dojo attach for valueEditTextBox
			// editActionNode : null, -- dojo attach for settingsRole
			// updateActionNode : null, -- dojo attach for updateActionNode
			// cancelActionNode : null, -- dojo attach for cancelActionNode
			
			messageContainer: null,
			extraStyles: "",
			
			/**
			 * Set the properties of the setting 
			 */
			constructor: function(object) {
				console.log("OrganizationSelect constr");
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				this.userOrgText = this._resourceBundle.organizationUserOrg;
				this.title = this._resourceBundle.organizationTitle;
				this.value = object.organization;
				this.orgchangeCallback = object.callback;
				console.log("OrganizationSelect constr end");
			},
			
			postCreate: function(){
				this.setMode("VALUE");
				this.renderValue();
			},
			
			setMode: function(mode){
				if (mode == "EDIT") {
					dojo.addClass(this.valueNode, "lotusHidden");
					dojo.removeClass(this.valueEditNode, "lotusHidden");
					dojo.removeClass(this.saveActionNode, "lotusHidden");
					dojo.removeClass(this.cancelActionNode, "lotusHidden");
					dojo.addClass(this.editActionNode, "lotusHidden");
					
				} else { // mode == "VALUE"
					dojo.removeClass(this.editActionNode, "lotusHidden");
					dojo.addClass(this.valueEditNode, "lotusHidden");
					dojo.removeClass(this.valueNode, "lotusHidden");
					dojo.addClass(this.saveActionNode, "lotusHidden");
					dojo.addClass(this.cancelActionNode, "lotusHidden");					
				}
				
			},
			
			onCancel: function(){
				this.setMode("VALUE");
			},

			onEdit: function(){
				this.setMode("EDIT");
			},
			
			onUpdate : function(){
				this.value = this.valueEditTextBox.value;
				this.setMode("VALUE");
				this.orgchangeCallback(this.value);
				this.renderValue();
			},
			
			renderValue: function(){
				if (this.value.length < 1) {
					this.value = "Default";
					this.valueNode.innerHTML = this.value;
					dojo.addClass(this.valueNode, "lotusItalic");
				} else {
					this.valueNode.innerHTML = this.value;
					dojo.removeClass(this.valueNode, "lotusItalic");
				}
			},
			
			// private
			_resourceBundle: null
			
		}
	);


