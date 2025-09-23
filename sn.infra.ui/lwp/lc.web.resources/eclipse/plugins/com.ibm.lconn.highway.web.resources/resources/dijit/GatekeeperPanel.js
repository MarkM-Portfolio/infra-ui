/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.GatekeeperPanel");

dojo.require("lconn.highway.dijit.GatekeeperFlag");
dojo.require("lconn.highway.dijit.Info");
dojo.require("lconn.highway.dijit.OrganizationSelect");
dojo.requireLocalization("lconn.highway", "strings");

dojo.declare("lconn.highway.dijit.GatekeeperPanel",	
		[dijit._Widget, dijit._Templated, dijit._Container],	
		
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/gatekeeperPanel.html"),
			DEFAULT_ORGANIZATION: "00000000-0000-0000-0000-000000000000",
			ONPREM_ORGANIZATION: "00000000-0000-0000-0000-000000000001",
			ONPREM_ORGANIZATION_EXTERNAL: "a",
			configTitle : "Config Title", // placeholder
			configDesc : "Config Description", // placeholder
			organization : "", // placeholder
			allSettings : [],
			info: null, // the info panel
			messageContainer: null,
			
			// containerNode : null, -- dojo attach for the containerNode
			// orgNode : null, -- dojo attach for the orgNode
			// sourceNode: null, - dojo attach point
			// roleNode: null, - dojo attach point
			// orgReceivedNode: null, - dojo attach point
			
			/**
			 * Set the properties of the panel 
			 */
			constructor: function(object) {
							
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				this.configTitle = this._resourceBundle["configTitleGatekeeper"];
				this.configDescription = this._resourceBundle["configDescGatekeeper"];
				this.organization = "";
			},
			
			postCreate: function(){
				
				var orgdetails = {
					organization: this.organization,
					callback: dojo.hitch(this, "_handleOrgChange")
				};
				
				this.info = new lconn.highway.dijit.Info({}, dojo.byId("infoPanel"));
				new lconn.highway.dijit.OrganizationSelect(orgdetails).placeAt(this.orgNode);
				this._resetInfo();
				this._loadPage();
			},
			
			_resetInfo: function() {
				this.info.resetToGeneral(this._resourceBundle.helpGatekeeperTitle,
						this._resourceBundle.helpGatekeeperMessage1, this._resourceBundle.helpGatekeeperMessage2);
			},

			_clearPage: function(message) {
				if (message == null)
					this.containerNode.innerHTML="";
				else
					this.containerNode.innerHTML="<span class=\"lotusBold lotusBig\">"+message+"</span>";
			},

			_loadPage: function() {
				console.log('GatekeeperPanel loadPage called');
				this.orgNode.value = this.organization;
				var caller = new lconn.highway.util.restAPI.Caller(dojo.hitch(this, "_handleSettingsResponse"));
				caller.getGatekeeperSettings(this.organization);
			},
			
			/**
			 * Pass in the list of settings as received
			 */
			_listSettings: function(settings){

				// error condition really - but at least we can be clean
				if (settings == null)
					return;
				
				// clear list
				this.allSettings = [];

				// pass the category to the section Widget
				for(var i=0, len=settings.length; i < len; i++){
					var newsetting = {
							organization : this.organization,
							name : settings[i].name,
							value : settings[i].value,
							description : settings[i].description,
							isDefault : settings[i].isDefault,
							isGlobal : settings[i].isGlobal,
							javascriptName : settings[i].javascriptName
					}
					this.allSettings.push(newsetting);
				}
	
			},
			
			_renderSettings: function(){
				
				// add all settings
				this._clearPage();
				for(var i=0; i<this.allSettings.length; i++){
					var setting = this.allSettings[i];
					setting.info = this.info;
					var gatekeeperFlag = new lconn.highway.dijit.GatekeeperFlag(setting);
					this.addChild(gatekeeperFlag);
				}
			},
			
			/**
			 * The handle function for XHR call
			 * @param json{Json} return data from the xhr call
			 * @param ioArgs{Object} pass the xhr parameters 
			 */
			_handleSettingsResponse: function(success, message, json) {
				console.log('_handleSettingsResponse called');
				if(success) {
					this._updateSource(json);
					this._updateRole(json);
					this._updateOrgReceived(json);
					this._listSettings(json.settings);
					this._renderSettings();
				} else {
					this._addError(message);
				}
			},
			
			_handleOrgChange: function(organization) {
				this.organization = organization;
				if (this.organization == null)
					this.organization = "";
				this._resetInfo();
				this._clearPage(this._resourceBundle.settingUpdating);
				this._loadPage();				
			},
			
			_updateSource: function(json) {
				// update the source
				var sourceLabel = this._resourceBundle.sourceUnknown;
				if (json.hasOwnProperty("source") && (json.source != null)) {
					if (json.source == "gatekeeper")
						sourceLabel = this._resourceBundle.sourceCloud;
					else
						sourceLabel = this._resourceBundle.sourceLocal;
				}
				this.sourceNode.innerHTML=sourceLabel;
			},
			
			_updateRole: function(json) {
				// update the role
				var roleLabel = this._resourceBundle.sourceUnknown;
				if (json.hasOwnProperty("role") && (json.source != null)) {
					roleLabel=json.role;
				}
				this.roleNode.innerHTML=roleLabel;
			},
			
			_updateOrgReceived: function(json) {
				// update the org received
				var orgLabel = this._resourceBundle.sourceUnknown;
				if (json.hasOwnProperty("organization") && (json.organization != null)) {
					orgLabel=json.organization;
				}
				this.orgReceivedNode.innerHTML=orgLabel;
			},
			
			_addError: function(text){
				if (this.messageContainer==null)
					this.messageContainer = new lconn.highway.dijit.MessageContainer({}, dojo.byId("messageContainer"));
				this.messageContainer.createMessage(text, "ERROR", false);
			},
			
			// private
			_resourceBundle: null
		}
	);



