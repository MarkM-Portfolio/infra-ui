/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.ProfilesRoutes");

dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.ee.data.AbstractRoutes");
dojo.require("com.ibm.social.ee.util.misc");

(function () {
var url = com.ibm.social.incontext.util.url;
var misc = com.ibm.social.ee.util.misc;
dojo.declare("com.ibm.social.ee.data.ProfilesRoutes", com.ibm.social.ee.data.AbstractRoutes, {
   service: "profiles",
   getNetworkInviteEEUrl: function (actorId, contextId) {
      var userId = misc.getItemId(actorId);
      var inviteId = misc.getItemId(contextId);
      var eeUrl = this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/app/person/@me/forms/connect/" + userId + "/connection/" + inviteId;
      return eeUrl;      
   },   
	getUserProfileUrl: function (id) {
	   if (this.isServiceEnabled()) {
		    return url.rewrite(this.getServiceUrl() + "/html/profileView.do", { userid: id });
		}
		else if (dojo.getObject("com.ibm.lconn.layout.people.createLink")) { 
		    var link = com.ibm.lconn.layout.people.createLink({userid: id });
		    if (link) { 
		       return link.href; 
		    }
		}
		return "";
	},
	getUserPhotoUrl: function (id) {
	   var photoUrl;
	   if (this.isServiceEnabled()) {
		    photoUrl = url.rewrite(this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/photo.do", { userid: id });
		}
	   else if (dojo.getObject("com.ibm.lconn.layout.people.getImageUrl")) {
		    photoUrl = com.ibm.lconn.layout.people.getImageUrl({ userid: id });
		}
		else {
		    photoUrl = this._getNoPersonPhotoUrl();
		}
		// Rewrite the photo link so that it uses oauth parameters in 
		// the case the gadget is using OAuth in a non-Connections container
		if (this.network) {
		    photoUrl = this.network.rewriteUrl(photoUrl);
		}
		return photoUrl;
	},
	getUserProfileUrlByEmail: function (email) {
	   return this.isServiceEnabled()  ? url.rewrite(this.getServiceUrl() + "/html/profileView.do", { email: email }) : "";
	},
	getUserPhotoUrlByEmail: function (email) {
	   var tmp = this.isServiceEnabled() ? url.rewrite(this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/photo.do", { email: email }) : this._getNoPersonPhotoUrl();
	   if (this.network)
	      tmp = this.network.rewriteUrl(tmp);
	   return tmp;
	},
	_getNoPersonPhotoUrl: function() {
       var wrcfg = dojo.getObject("lconn.core.config.services.webresources"); 
       if (wrcfg)
         return wrcfg[this.isSecure() ? "secureUrl" : "url"] + "/web/com.ibm.lconn.core.styles.oneui3/images/personNoPhoto128.gif";
       return "";
	}
});
})();