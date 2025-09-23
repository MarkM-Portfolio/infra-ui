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

dojo.provide("lconn.sand.socialPathWrapped"); 

dojo.requireLocalization("lconn.sand", "ui");

dojo.declare("lconn.sand.socialPathWrapped",null,{
	onLoad: function () {	
		var rootId = "_" + this.iContext.widgetId + "_root"; 
	    var attributesItemSet = this.iContext.getiWidgetAttributes();
		var me = this.iContext.getUserProfile().getItemValue("userid") ;

	    this.sandUIRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandUIRoot"));
	    this.sandBackEndRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandBackEndRoot"));
	    window.lcSandUIRoot = this.sandUIRoot;
	    var targetUserid = attributesItemSet.getItemValue("resourceId");

        var widgetContextRoot = this.sandUIRoot + "js_src";
        var lcSandStrings = dojo.i18n.getLocalization("lconn.sand", "ui");
        
		if (me && me != "") {
			var path = (widgetContextRoot) + "/lconn/sand";
			if (!dojo.exists("lconn.sand.sandAll") || !dojo.exists("lconn.sand.socialPath")) {
				if (dojo.exists("dojo.registerModulePath")) {
					dojo.registerModulePath('lconn.sand', path);
				} else if (dojo.exists("require")) {
					require({paths:{'lconn.sand': path}});
				}
				dojo.require("lconn.sand.sandAll");
				dojo.require("lconn.sand.socialPath");
			}
			
			if (me == profilesData.displayedUser.userid) {
				document.getElementById(this.iContext.widgetId + "Section").style.display = 'none';
			} else {
				// Instantiate the Path widget
				socialPathWidget = new lconn.sand.socialPath({userid: me, targetUserid: profilesData.displayedUser.userid, iContext: this.iContext});
				
				// place Dojo widget inside our iWidget
	        	dojo.place(socialPathWidget.domNode, this.iContext.getElementById(rootId), "last");
				socialPathWidget.populate();
			}
		} else {
			logInHREF = dojo.byId("logoutLink").href;
		        this.iContext.getElementById(rootId).innerHTML = 
				"<a href=\"" + logInHREF + "\">" + lcSandStrings.sand_Login + "</a> " + lcSandStrings.sand_LogInTIC;

				dojo.addClass(rootId, "lotusMeta");
				dojo.addClass(rootId, "lotusChunk");
		}	
	}
})
	
