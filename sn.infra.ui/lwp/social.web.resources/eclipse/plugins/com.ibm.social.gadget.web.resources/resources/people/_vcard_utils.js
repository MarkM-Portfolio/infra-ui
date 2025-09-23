/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.gadget.people._vcard_utils");

dojo.require("com.ibm.social.gadget.people.util.localizer");

dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

com.ibm.social.gadget.people._vcard_utils = 
(function() {
	
	var shouldKillLinks = (typeof lconn.core.config.services.profiles === "undefined" && typeof lconn.core.config.services.scprofiles === "undefined") && 
							!(dojo.getObject("gadgets.util.hasFeature") && dojo.getObject("gadgets.util.hasFeature")("smartcloud3"));
	
	// TODO (MIA) - make proper singleton
	//  quick hack to unblock social mail
	var Utils = dojo.declare('', [com.ibm.social.gadget.people.util.localizer],
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
				dojo.query("a.fn", domNode).forEach(function(link){link.removeAttribute("title");});
				SemTagSvc.parseDom(null, domNode);
				return domNode;
			},
			killLinks_:function(domNode){
				dojo.query("a.fn", domNode).forEach(function(personCardLink){
					personCardLink.removeAttribute("href");
					personCardLink.removeAttribute("target");
					personCardLink.removeAttribute("title");
					dojo.style(personCardLink, {"textDecoration":"none", "cursor":"default"});
				});
			},
			/**
			 * Pass in an id, displayName and placement info and build the user Vcard
			 */
			generateVcard: function(uid, displayName, placement, miscOptions){
				miscOptions = miscOptions || {"inline":false};
				
				var profileUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles);
				var photoText = this.getLocalizedString("Photo of ${0}",[displayName]);
				var linkText = this.getLocalizedString("This is a link to the profile of ${0}", [displayName]);
				var profileUserUrl = profileUrl + "/html/profileView.do?userid=" + uid;
				var vcard = dojo.create("span", {className: "vcard"});
				vcard = dojo.place(vcard, placement.refNode, placement.relPos);
				
				var cardAnchor = 
					dojo.create("a", {
						href: profileUserUrl,
						title: linkText,
						className: "fn url bidiAware",
						target: this.linkTarget,
						innerHTML: displayName
				}, vcard);
				
				dojo.create("span", {
					className: "photo",
					src: profileUrl + "/photo.do?userid=" + uid,
					alt: photoText,
					style: {display: "none"}
				}, cardAnchor);
				
				dojo.create("span", {
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
