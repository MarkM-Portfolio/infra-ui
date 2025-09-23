/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/query",
	"ic-core/config/services",
	"ic-core/url",
	"ic-gadget/people/util/localizer"
], function (declare, lang, domConstruct, domStyle, query, services, url, localizer) {

	com.ibm.social.gadget.people._vcard_utils = 
	(function() {
		
		var shouldKillLinks = (typeof services.profiles === "undefined" && typeof services.scprofiles === "undefined") && 
								!(lang.getObject("gadgets.util.hasFeature") && lang.getObject("gadgets.util.hasFeature")("smartcloud3"));
		
		// TODO (MIA) - make proper singleton
		//  quick hack to unblock social mail
		var Utils = declare('', localizer,
			{
				finalize_plain_vcards: function(domNode){
					if(shouldKillLinks) {
						this.killLinks_(domNode);
					} else {
						/* No Operation */
					}
					return domNode;
				},
				finalize_biz_vcards: function(domNode){
					/* allow SemTagSvc to deal with availability of profiles*/
					query("a.fn", domNode).forEach(function(link){link.removeAttribute("title");});
					SemTagSvc.parseDom(null, domNode);
					return domNode;
				},
				killLinks_:function(domNode){
					query("a.fn", domNode).forEach(function(personCardLink){
						personCardLink.removeAttribute("href");
						personCardLink.removeAttribute("target");
						personCardLink.removeAttribute("title");
						domStyle.set(personCardLink, {"textDecoration":"none", "cursor":"default"});
					});
				},
				/**
				 * Pass in an id, displayName and placement info and build the user Vcard
				 */
				generateVcard: function(uid, displayName, placement, miscOptions){
					miscOptions = miscOptions || {"inline":false};
					
					var profileUrl = url.getServiceUrl(services.profiles);
					var photoText = this.getLocalizedString("Photo of ${0}",[displayName]);
					var linkText = this.getLocalizedString("This is a link to the profile of ${0}", [displayName]);
					var profileUserUrl = profileUrl + "/html/profileView.do?userid=" + uid;
					var vcard = domConstruct.create("span", {className: "vcard"});
					vcard = domConstruct.place(vcard, placement.refNode, placement.relPos);
					
					var cardAnchor = 
						domConstruct.create("a", {
							href: profileUserUrl,
							title: linkText,
							className: "fn url bidiAware",
							target: this.linkTarget,
							innerHTML: displayName
					}, vcard);
					
					domConstruct.create("span", {
						className: "photo",
						src: profileUrl + "/photo.do?userid=" + uid,
						alt: photoText,
						style: {display: "none"}
					}, cardAnchor);
					
					domConstruct.create("span", {
						className: "x-lconn-userid",
						style: {display: "none"},
						innerHTML: uid
					}, vcard);
	
					if(miscOptions.inline && typeof window.SemTagSvc !== "undefined") {
						return this.finalize_biz_vcards(vcard);
					} else {
						return this.finalize_plain_vcards(vcard);
					}
				}
			});
		
		return new Utils();
	})();
	
	return com.ibm.social.gadget.people._vcard_utils;
});
