/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/dom-construct",
	"dojo/_base/declare",
	"dojo/_base/config",
	"dojo/dom-attr",
	"dojo/_base/window",
	"dojo/i18n!ic-incontext/nls/socialInContextCoreStrings",
	"dojo/_base/lang",
	"dojo/string",
	"dojo/text!ic-incontext/typeahead/widget/templates/CommunitySelector.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/config/services",
	"ic-incontext/ConnectionManager",
	"ic-incontext/NetworkDojo",
	"ic-incontext/typeahead/CommunitySearchQCSAdapter",
	"ic-incontext/util/proxy"
], function (dojo, domConstruct, declare, config, domAttr, windowModule, i18nsocialInContextCoreStrings, lang, string, template, _Templated, _Widget, services, ConnectionManager, NetworkDojo, CommunitySearchQCSAdapter, proxy) {

	(function() {
	var CommunitySelector = declare("com.ibm.social.incontext.typeahead.widget.CommunitySelector", [_Widget, _Templated], {
		templateString: template,
		_adapter: null,
		_connManager: null,
		_strings: i18nsocialInContextCoreStrings.COMMUNITYSELECTOR,
		selectedCommunity: null,
		postMixInProperties:function() {
			var isSecure = (window.location.protocol || "http").replace(':','') === "https";
			var communitiesUrl = services.communities[isSecure ? "secureUrl" : "url"];
			var network = new NetworkDojo();
			this._adapter = new CommunitySearchQCSAdapter(communitiesUrl, network, function(url) {
			   return proxy(url);
			});
			this._connManager = new ConnectionManager();
		},
		postCreate: function() {
			this.ci = this._adapter.createTypeAhead(this.communityInput, {
				id: domAttr.get(this.communityInput, "id"),
				name: domAttr.get(this.communityInput, "id")
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
			   domConstruct.empty(this.selectionsNode);
			   var span = domConstruct.create("span", null, this.selectionsNode), d = windowModule.doc;
			      span.appendChild(d.createTextNode(community.title));
			   var a = domConstruct.create("a", {href: "javascript:;", role: "button", className: "lconnRemoveLink"}, span);
			      a.style.padding="0px 5px";
			      var img = domConstruct.create("img", {className: "lotusDelete", src: config.blankGif, title: string.substitute(this._strings.REMOVE_LINK, [community.title]), alt: string.substitute(this._strings.REMOVE_LINK, [community.title])}, a);
			         var span=domConstruct.create("span", {className: "lotusAltText"}, a);
			            span.appendChild(d.createTextNode("X"));
	
			   this._connManager.cmconnect("shareCs", a, "onclick", lang.hitch(this, this.removeCommunitySelection, community, false));
			   
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
			   domConstruct.empty(this.selectionsNode);
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
	return CommunitySelector;
});
