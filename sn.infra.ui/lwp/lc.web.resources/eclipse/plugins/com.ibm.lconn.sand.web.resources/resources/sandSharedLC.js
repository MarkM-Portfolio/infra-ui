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

dojo.provide("lconn.sand.sandSharedLC");

dojo.require("lconn.sand.sharedLC");

/**
 * Things in Common iWidget wrapper
 */
(function() {
	var instances_ = {};
	
	dojo.declare("lconn.sand.sandSharedLC",null,{
		onLoad: function () {
			var attributesItemSet = this.iContext.getiWidgetAttributes();
			this.sandUIRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandUIRoot"));
			this.sandBackEndRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandBackEndRoot"));
			window.lcSandUIRoot = this.sandUIRoot;
	
			var widgetContextRoot = this.sandUIRoot + "js_src";

			var me = lconn.profiles.api.isUserLoggedIn() ? this.iContext.getUserProfile().getItemValue("userid") : null;
			
			var searchURL = (this.sandBackEndRoot + "/atomfba/mysearch");
			var pathToSharedLC = (widgetContextRoot) + "/lconn/sand";
			if (!dojo.exists("lconn.sand.sharedLC")) {
				if (dojo.exists("dojo.registerModulePath")) {
					dojo.registerModulePath('lconn.sand', pathToSharedLC);
				} else if (dojo.exists("require")) {
					require({paths:{'lconn.sand': pathToSharedLC}});
				}
				dojo.require("lconn.sand.sharedLC");		
			}
			
			var rootId = "_" + this.iContext.widgetId + "_root";
		
			//if this instance is already created, destroy it and recreate it.
			//this is the only reliable way to get it running for IE
			if (instances_[rootId]) {
				dojo.destroy(instances_[rootId]);
				delete instances_[rootId];
			}
			instances_[rootId] = new lconn.sand.sharedLC (
				{
					profileSelfUid: me,
					profileTargetUid: profilesData.displayedUser.userid,
					serviceUrl: searchURL,
					iContext: this.iContext
				}
			); 
			
			
			// place Dojo widget inside our iWidget
			dojo.place(instances_[rootId].domNode, this.iContext.getElementById(rootId), "only");
			instances_[rootId].populate();
		}	
	});
	
})();
