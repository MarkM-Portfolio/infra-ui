/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


/*
 * Legacy code
 * this file is no longer used. It was previously called by the CRE people SPI.
 * That functionality has moved to com.ibm.social.gadget.people._vcard_utils
 *
 * */

dojo.provide("com.ibm.lconn.gadget.services.people_container");

dojo.require("com.ibm.social.gadget.people._vcard_utils");
dojo.require("com.ibm.social.gadget.people.util.localizer");

dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

com.ibm.lconn.gadget.services.people_container = 
(function() {
	// TODO (MIA) - make proper singleton
	//  quick hack to unblock social mail
	var people_containerCls = dojo.declare('', [com.ibm.social.gadget.people.util.localizer],
		{
			/**
			 * Pass in an id, displayName and placement info and build the user Vcard
			 */
			generateVcard: function(uid, displayName, placement){
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
						className: "fn url",
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

				return vcard;
			}
		});
	
	return new people_containerCls();
})();
