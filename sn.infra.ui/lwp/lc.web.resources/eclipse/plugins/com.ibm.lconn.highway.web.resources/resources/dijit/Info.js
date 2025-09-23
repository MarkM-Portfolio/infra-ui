/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.Info");

dojo.require("dijit._Container");
dojo.require("dijit._Templated");
dojo.require("dijit._Widget");

dojo.requireLocalization("lconn.highway", "strings");

dojo.declare(
		// widget name and class
		"lconn.highway.dijit.Info",	
		[dijit._Widget, dijit._Templated, dijit._Container],	
		
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/info.html"),
			isFixed: false,
			
			// infoContentNode: null, - dojo attach point
			
			/**
			 * Set the properties of the info 
			 */
			constructor: function(object) {
				
				console.log("Info constr in");
				
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				window.onscroll = dojo.hitch(this, "handleScroll");
				
				console.log("Info constr out");
			},

			postCreate: function(){
				this.containerNode.innerHTML = "<span class=\"lotusBold\">Information</span><p>General information pane</p>";
			},
			
			addTextField: function(title, value) {
				this.addChild(new lconn.highway.dijit.InfoLine({title: title, content: value}));
			},
			
			addBooleanField: function(title, value) {
				var valueText = this._getBooleanFromInput(value) ? this._resourceBundle.yes : this._resourceBundle.no ;
				this.addTextField(title, valueText);
			},
			
			resetToGeneral: function(title, content1, content2) {
				this.containerNode.innerHTML = "<span class=\"lotusBold\">"+title+"</span><p>"+content1+"</p><p>"+content2+"</p>";
			},

			handleScroll: function() {
				if (window.pageYOffset > 210) {
					if (!this.isFixed) {
						this.isFixed=true;
						this.set("style","position: fixed; top: 10px; width: 220px;");
					}
				} else {
					if (this.isFixed){
						this.isFixed=false;
						this.set("style", "position: static;");
					}
				};
			},

			clear: function() {
				this.containerNode.innerHTML = "";
			},

			_getBooleanFromInput: function(inputValue) {
				if (inputValue != null) {
					if (typeof inputValue == "boolean")
						return inputValue;
					if ((inputValue == "true") || (inputValue == "yes")) {
						return true;
					}
				}
				return false;
			},
			
			// private
			_resourceBundle: null
		}
	);

dojo.declare(
		// widget name and class
		"lconn.highway.dijit.InfoLine",	
		[dijit._Widget, dijit._Templated],	
		
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/infoLine.html"),
			// title: null; // mixed in on construction 
			// content: null; // mixed in on construction
			
			/**
			 * Set the properties of the line 
			 */
			constructor: function(object) {
				
				console.log("Info line constr in");
				
				console.log("Info line constr out");
			},

			postCreate: function(){
				
			},
			

		}
	);



