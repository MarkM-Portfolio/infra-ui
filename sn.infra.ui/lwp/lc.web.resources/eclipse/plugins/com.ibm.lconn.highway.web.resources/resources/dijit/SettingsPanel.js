/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.SettingsPanel");

dojo.require("lconn.highway.dijit.Setting");
dojo.requireLocalization("lconn.highway", "strings");

dojo.declare("lconn.highway.dijit.SettingsPanel",	
		[dijit._Widget, dijit._Templated, dijit._Container],	
		
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/settingsPanel.html"),
			configTitle : "Config Title", // placeholder
			configDesc : "Config Description", // placeholder
			createButtonClass : "lotusHidden", // by default
			
			DEFAULT_ORGANIZATION: "00000000-0000-0000-0000-000000000000",
			ONPREM_ORGANIZATION: "00000000-0000-0000-0000-000000000001",
			ONPREM_ORGANIZATION_EXTERNAL: "a",

			info: null, // set up in postCreate
			categories : null,
			organization: "", // use default
			
			//orgNode: null, - dojo attach point
			//orgReceivedNode: null, - dojo attach point
			//containerNode: null, - dojo attach point
			
			// - mixed in on construction
			//panelTitle: "",
			//panelDescription: "",
			//editDefinitions: false,
			//editDefaults: false,
			
			/**
			 * Set the properties of the panel 
			 */
			constructor: function(object) {
				
				console.log("Panel in");
				
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				this.configTitle = this._resourceBundle[object.panelTitle];
				this.configDescription = this._resourceBundle[object.panelDescription];
				if (object.editDefinitions) {
					this.createButtonClass=""; // not hidden
				}

			},
			
			postCreate: function(){

				// add organisation selector unless we're editing definitions
				if ((!this.editDefinitions) && (!this.editDefaults)){
					var orgdetails = {organization: this.organization, callback: dojo.hitch(this, "_handleOrgChange")};
					new lconn.highway.dijit.OrganizationSelect(orgdetails).placeAt(this.orgNode);
				}

				this.info = new lconn.highway.dijit.Info({}, dojo.byId("infoPanel"));
				this._resetInfo();
				this._loadPage();
			},
			
			onNewSetting: function() {
				new lconn.highway.dijit.SettingDefDlg({
					newSetting: true,
					settingId: "",
					settingName: "new.setting",
					settingTitle: "New Setting",
					settingCategory: "general",
					settingDescription: "Description of new setting",
					settingCanModify: true,
					settingAllowRoles: false,
					settingValidationType: "",
					settingValidationDetails: "",
					settingDefaultValue: "default"
				}).show();
			},

			_handleOrgChange: function(organization) {
				this.organization = organization;
				if ((this.organization == null) || (this.organization.length==0))
					this.organization = ""; // use default
				this.containerNode.innerHTML=""; // TODO : delete widgets more effectively
				this._resetInfo();
				this._loadPage();
			},

			_loadPage: function() {
				console.log('_loadPage called');
				var caller = new lconn.highway.util.restAPI.Caller(dojo.hitch(this, "_handleSettingsResponse"));
				if (this.editDefinitions) {
					caller.getDefinitions();
				} else if (this.editDefaults) {
					caller.getDefaults();
				} else {
					caller.getSettings(this.organization);
				}
			},
			
			_handleSettingsResponse: function(success, message, json) {
				console.log('_handleSettingsResponse called');
				if(success) {
					this._updateOrgReceived(json);
					this._setupCategories(json.settings);
					this._renderCategories();
				} else {
					this._addError(message);
				}
			},
			
			_updateOrgReceived: function(json) {
				// update the org received
				var orgLabel = this._resourceBundle.sourceUnknown;
				if (json.hasOwnProperty("organization") && (json.organization != null)) {
					orgLabel=json.organization;
				}
				this.orgReceivedNode.innerHTML=orgLabel;
			},
			
			/**
			 * Pass in the list of settings as received
			 */
			_setupCategories: function(settings){

				// go through all settings and generate the categories
				// The general category is always present and always first
				this.categories = {"general": []};
				
				// error condition really - but at least we can be clean
				if (settings == null)
					return;

				// pass the category to the section Widget
				for(var i=0, len=settings.length; i < len; i++){
					this._addSettingToCategory(settings[i]);
				}
				
			},

			/**
			 * Find a category name in a set of categories (actually a javascript object
			 * where each category is a property) and add the passed setting to it
			 */
			_addSettingToCategory: function(setting){
				
				var categoryName = setting.category;
				if (categoryName == null) {
					categoryName = "Other";
				}
				
				// get the category property - if it doesn't exist then create it
				var category = this.categories[categoryName];
				if (category == null) {
					category = new Array(); 
					this.categories[categoryName] = category;
				}		
				
				// and finally add the setting
				category.push(setting);		
			},
			
			_renderCategories: function(){

				// for all categories, create a section and pass it the settings to be shown in that section
				var firstUp=true;
				for(categoryName in this.categories){
					var section = new lconn.highway.dijit.Section({
						organization: this.organization,
						sectionName: categoryName,
						sectionSettings: this.categories[categoryName],
						sectionExpanded: firstUp,
						editDefinitions: this.editDefinitions,
						editDefault: this.editDefaults,
						info: this.info
					});
					firstUp = false;
					this.addChild(section);
				}
			},
			
			_resetInfo: function() {
				this.info.resetToGeneral(this._resourceBundle.helpOverviewTitle,
						this._resourceBundle.helpOverviewMessage1, this._resourceBundle.helpOverviewMessage2);
			},
			
			_addError: function(text){ // add to global error space
				var container = new lconn.highway.dijit.MessageContainer({}, dojo.byId("messageContainer"));
				container.createMessage(text, "ERROR", false);
			},
			
			// private
			_resourceBundle: null
		}
	);



