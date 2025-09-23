/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ui/layout/people",
	"ic-ee/data/AbstractRoutes",
	"ic-ee/util/misc",
	"ic-incontext/util/url",
	"ic-core/config/services"
], function (declare, lang, icPeople, AbstractRoutes, miscModule, urlModule, services) {

	var url = urlModule;
	var misc = miscModule;
	var ProfilesRoutes = declare("com.ibm.social.ee.data.ProfilesRoutes", AbstractRoutes, {
	   service: "profiles",	   
	   getNetworkInviteEEUrl: function (actorId, contextId) {
	      var userId = misc.getItemId(actorId);
	      var inviteId = misc.getItemId(contextId);
	      var eeUrl = this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/app/person/@me/forms/connect/" + userId + "/connection/" + inviteId;
	      return eeUrl;      
	   },   
		getUserProfileUrl: function (id) {
		   if (this.isServiceEnabled() ) {
			    return url.rewrite(this.getServiceUrl() + "/html/profileView.do", { userid: id });
			}
			else if (icPeople) { 
			    var link = icPeople.createLink({userid: id });
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
	      else if(services.scprofiles){
				photoUrl = url.rewrite(this.getServiceUrl('scprofiles') + '/photo/' + id) ;
		  }
		  else if (icPeople) {
			    photoUrl = icPeople.getImageUrl({ userid: id });
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
	       var wrcfg = services.webresources; 
	       if (wrcfg)
	         return wrcfg[this.isSecure() ? "secureUrl" : "url"] + "/web/com.ibm.lconn.core.styles.oneui3/images/personNoPhoto128.gif";
	       return "";
		}
	});
	return ProfilesRoutes;
});
