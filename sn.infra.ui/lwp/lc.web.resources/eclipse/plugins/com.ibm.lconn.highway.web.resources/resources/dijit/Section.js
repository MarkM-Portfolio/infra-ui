/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.Section");

dojo.require("lconn.highway.dijit.Setting");
dojo.require("lconn.highway.dijit.SettingDef");
dojo.require("dijit._Container");
dojo.require("dijit._Templated");
dojo.require("dijit._Widget");

dojo.requireLocalization("lconn.highway", "strings");

dojo.declare(
		// widget name and class
		"lconn.highway.dijit.Section",	
		[dijit._Widget, dijit._Templated, dijit._Container],	
		
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/section.html"),
			blankIcon: null,
			
			//containerNode: null, - dojo attach point
			//arrowNode: null, - dojo attach point
			
			// - mixed in on construction
			// organization: "", 
			// sectionName: "", 
			// sectionExpanded: "",
			// sectionSettings: "",
			// editDefinitions: false,
			// editDefault: false,
			// info: null,
			
			sectionName: "Section", // placeholder
			sectionTitle: "Section", // placeholder
			sectionExpanded: false,

			/**
			 * Set the properties of the panel 
			 */
			constructor: function(object) {
				
				console.log("Section constr in");
				
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				this.blankIcon = (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif"));
				this.sectionTitle = this._resourceBundle["category_"+object.sectionName];
				if (this.sectionTitle == null) {
					this.sectionTitle = object.sectionName;
				}
				
				console.log("Section constr out");
			},

			postCreate: function(){
				
				console.log("Section postCreate");
				
				for(var i=0, len=this.sectionSettings.length; i < len; i++){
					
					// TODO : this is currently needed, but shouldn't be !
					var settingDetails = {
							id: this.sectionSettings[i].id,
							name: this.sectionSettings[i].name,
							title: this.sectionSettings[i].title,
							category: this.sectionSettings[i].category,
							description:this.sectionSettings[i].description,
							canModify: this.sectionSettings[i].canModify,
							allowRoles: this.sectionSettings[i].allowRoles,
							validation: this.sectionSettings[i].validation,
							values: this.sectionSettings[i].values,
							defaultValues: this.sectionSettings[i].defaultValues,
							info: this.info
					};
					
					//var settingDetails = this.sectionSettings[i];
					settingDetails.organization = this.organization; // shoe-horn it in here for further reference
					if (this.editDefinitions) {
						this.addChild(new lconn.highway.dijit.SettingDef({settingDetails: settingDetails, editDefault: false}));
					} else {
						this.addChild(new lconn.highway.dijit.Setting({settingDetails: settingDetails, editDefault: this.editDefault}));
					}
				}
				
			},
			
			startup: function(){
				// sectionExpanded hasn't actually happened yet - so we set to unexpanded and toggle
				// easier than having conditionals in the template
				// Needs to be in startup so that the animations can take effect
				if (this.sectionExpanded) {
					this.sectionExpanded=false; // as toggle will switch it back
					this.toggle();
				}
			},
			
			fade: function(fadeIn){
				var children=this.getChildren();
				for(var i=0, len=children.length; i < len; i++){
					if (fadeIn) {
						children[i].fadeIn();
					} else {
						children[i].fadeOut();
					}
				}
			},
			
			toggle: function(){
				if (this.sectionExpanded) {
					this.fade(false);
					dojo.addClass(this.containerNode, "lotusHidden");
					dojo.removeClass(this.arrowNode, "lotusTwistyOpen");
					dojo.addClass(this.arrowNode, "lotusTwistyClosed");
				} else {
					dojo.removeClass(this.containerNode, "lotusHidden");
					dojo.removeClass(this.arrowNode, "lotusTwistyClosed");
					dojo.addClass(this.arrowNode, "lotusTwistyOpen");
					this.fade(true);
				};
				this.sectionExpanded = !this.sectionExpanded;
			},
			
			// private
			_resourceBundle: null
		}
	);



