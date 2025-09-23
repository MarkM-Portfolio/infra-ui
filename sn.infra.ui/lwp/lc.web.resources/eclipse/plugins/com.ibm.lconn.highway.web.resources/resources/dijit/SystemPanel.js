/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.dijit.SystemPanel");

dojo.require("lconn.highway.dijit.Info");
dojo.requireLocalization("lconn.highway", "strings");

dojo.declare("lconn.highway.dijit.SystemPanel",	
		[dijit._Widget, dijit._Templated, dijit._Container],	
		
		// properties and methods
		{
			templatePath: dojo.moduleUrl("lconn.highway", "templates/systemPanel.html"),
			configTitle : "Config Title", // placeholder
			configDesc : "Config Description", // placeholder
			info: null, // the info panel
			
			// containerNode : null, -- dojo attach for the containerNode
			
			/**
			 * Set the properties of the panel 
			 */
			constructor: function(object) {
							
				this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
				this.configTitle = this._resourceBundle["configTitleSystem"];
				this.configDescription = this._resourceBundle["configDescSystem"];
			},
			
			postCreate: function(){
				
				this.info = new lconn.highway.dijit.Info({}, dojo.byId("infoPanel"));
				this._resetInfo();
				//this._loadBasics();
			},
			
			_resetInfo: function() {
				this.info.resetToGeneral(this._resourceBundle.helpSystemTitle,
						this._resourceBundle.helpSystemMessage1, this._resourceBundle.helpSystemMessage2);
			},

			_clearPage: function(message) {
				if (message == null)
					this.containerNode.innerHTML="";
				else
					this.containerNode.innerHTML="<span class=\"lotusBold lotusBig\">"+message+"</span>";
			},

			_addError: function(text){
				var container = new lconn.highway.dijit.MessageContainer({}, dojo.byId("messageContainer"));
				container.createMessage(text, "ERROR", false);
			},
			
			// private
			_resourceBundle: null
		}
	);



