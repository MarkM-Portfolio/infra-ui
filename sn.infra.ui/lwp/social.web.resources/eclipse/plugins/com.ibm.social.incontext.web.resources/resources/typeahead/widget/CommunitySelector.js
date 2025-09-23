/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.typeahead.widget.CommunitySelector");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.social.incontext.typeahead.CommunitySearchQCSAdapter");
dojo.require("com.ibm.social.incontext.NetworkDojo");
dojo.require("com.ibm.social.incontext.util.proxy");
dojo.require("com.ibm.social.incontext.ConnectionManager");
dojo.require("dojo.string");

dojo.requireLocalization("com.ibm.social.incontext", "socialInContextCoreStrings");

(function() {
dojo.declare("com.ibm.social.incontext.typeahead.widget.CommunitySelector", [dijit._Widget, dijit._Templated], {
	templatePath:dojo.moduleUrl("com.ibm.social.incontext", "typeahead/widget/templates/CommunitySelector.html"),
	_adapter: null,
	_connManager: null,
	_strings: dojo.i18n.getLocalization("com.ibm.social.incontext", "socialInContextCoreStrings").COMMUNITYSELECTOR,
	selectedCommunity: null,
	postMixInProperties:function() {
		var isSecure = (window.location.protocol || "http").replace(':','') === "https";
		var communitiesUrl = lconn.core.config.services.communities[isSecure ? "secureUrl" : "url"];
		var network = new com.ibm.social.incontext.NetworkDojo();
		this._adapter = new com.ibm.social.incontext.typeahead.CommunitySearchQCSAdapter(communitiesUrl, network, function(url) {
		   return com.ibm.social.incontext.util.proxy(url);
		});
		this._connManager = new com.ibm.social.incontext.ConnectionManager();
	},
	postCreate: function() {
		this.ci = this._adapter.createTypeAhead(this.communityInput, {
			id: dojo.attr(this.communityInput, "id"),
			name: dojo.attr(this.communityInput, "id")
		});		   
		this._adapter.connectOnSelect(this.ci, this, "addCommunitySelection");

		if(this.selectedCommunity && this.selectedCommunity.id){			
			this.addCommunitySelection(this.selectedCommunity, true, true);
		} else {
			this.selectorNode.style.display="";
		}
	},
	addCommunitySelection: function(community, preventPublish, skipSelectCheck) {
		if(skipSelectCheck || !this.isCommunitySelected(community)) {
		   if(!community.title)
			   community.title = community.id;
		   this.selectedCommunity = community;
		   this.selectionsNode.innerHTML = community.title;
		   dojo.empty(this.selectionsNode);
		   var span = dojo.create("span", null, this.selectionsNode), d = dojo.doc;
		      span.appendChild(d.createTextNode(community.title));
		   var a = dojo.create("a", {href: "javascript:;", role: "button", className: "lconnRemoveLink"}, span);
		      a.style.padding="0px 5px";
		      var img = dojo.create("img", {className: "lotusDelete", src: dojo.config.blankGif, title: dojo.string.substitute(this._strings.REMOVE_LINK, [community.title]), alt: dojo.string.substitute(this._strings.REMOVE_LINK, [community.title])}, a);
		         var span=dojo.create("span", {className: "lotusAltText"}, a);
		            span.appendChild(d.createTextNode("X"));

		   this._connManager.cmconnect("shareCs", a, "onclick", dojo.hitch(this, this.removeCommunitySelection, community, false));
		   
		   this.selectorNode.style.display="none";
		   this.selectionsNode.style.display="";
		   
		   if(!preventPublish)
		      this.onCommunitySelection(community);
		}
	},

	removeCommunitySelection: function(community, preventPublish) {
		if(this.isCommunitySelected(community)) {			
		   this.selectedCommunity = null;
		   this.ci.setValue("");
		   this.selectionsNode.style.display="none";
		   this.selectorNode.style.display="";
		   dojo.empty(this.selectionsNode);
		   if(!preventPublish)
		      this.onCommunityRemoval(community);
		}
	},

	isCommunitySelected: function(community) {
		return this.selectedCommunity && community && (community.id == this.selectedCommunity.id);
	},
	onCommunitySelection: function(community){},
	onCommunityRemoval: function(community){}
});
})();