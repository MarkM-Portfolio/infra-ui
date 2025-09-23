/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.DYKWrapped"); 

dojo.require("lconn.sand.DYKProfiles");
dojo.requireLocalization("lconn.sand", "ui");

dojo.declare("lconn.sand.DYKWrapped",null,{

	userid: null,
			
	getProxy: function () {
		return com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.PROXY_URL);
	},

	onLoad: function () {	
		var attributesItemSet = this.iContext.getiWidgetAttributes();
		var lcSand = dojo.i18n.getLocalization("lconn.sand", "ui");

		this.sandUIRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandUIRoot"));
		this.sandBackEndRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandBackEndRoot"));
		var profilesRoot = attributesItemSet.getItemValue("profilesRoot"); 
		
		var inviteErrorHandler = attributesItemSet.getItemValue("inviteErrorHandler"); 
		if(inviteErrorHandler) {
			inviteErrorHandler = dojo.getObject(inviteErrorHandler);
		}
		var inviteXHRErrorHandler = attributesItemSet.getItemValue("inviteXHRErrorHandler"); 
		if(inviteXHRErrorHandler) {
			inviteXHRErrorHandler = dojo.getObject(inviteXHRErrorHandler);
		}

		//set global varibles for lconn.sand.DYKProfiles
		dojo.global.proxyUrl = this.getProxy();

		var widgetContextRoot = this.sandUIRoot + "js_src";
		var path = (widgetContextRoot) + "/lconn/sand";
		if (!dojo.exists("lconn.sand.DYKProfiles")) {
			if (dojo.exists("dojo.registerModulePath")) {
				dojo.registerModulePath('lconn.sand', path);
			} else if (dojo.exists("require")) {
				require({paths:{'lconn.sand': path}});
			}
			dojo.require("lconn.sand.DYKProfiles");		
		}
		
		var rootId = "_" + this.iContext.widgetId + "_root";
		var rootElement = this.iContext.getElementById(rootId); 
		this.userid = this.iContext.getUserProfile().getItemValue('userid'); //lconn.profiles.api.getLoggedInUserUid();
		
		// Instantiate the DYKProfiles widget
		var DYKWidget = new lconn.sand.DYKProfiles(
				{remoteUrl: this.sandBackEndRoot + "/atomfba/social/graph/list",
				 profilesRoot: profilesRoot,
				 currentUserId: this.userid,
				 inviteErrorHandler: inviteErrorHandler,
				 inviteXHRErrorHandler: inviteXHRErrorHandler});

		// place Dojo widget inside our iWidget
		dojo.place(DYKWidget.domNode, rootElement, "last");
	}
});
