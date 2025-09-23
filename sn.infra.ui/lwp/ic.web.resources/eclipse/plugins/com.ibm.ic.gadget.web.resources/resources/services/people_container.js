/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"ic-core/config",
	"ic-core/config/services",
	"ic-core/url",
	"../people/_vcard_utils",
	"../people/util/localizer"
], function (declare, domConstruct, config, services, url, _vcard_utils, localizer) {

	
	/*
	 * Legacy code
	 * this file is no longer used. It was previously called by the CRE people SPI.
	 * That functionality has moved to com.ibm.social.gadget.people._vcard_utils
	 *
	 * */
	
	com.ibm.lconn.gadget.services.people_container = 
	(function() {
		// TODO (MIA) - make proper singleton
		//  quick hack to unblock social mail
		var people_containerCls = declare('', localizer,
			{
				/**
				 * Pass in an id, displayName and placement info and build the user Vcard
				 */
				generateVcard: function(uid, displayName, placement){
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
							className: "fn url",
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
	
					return vcard;
				}
			});
		
		return new people_containerCls();
	})();
	
	return com.ibm.lconn.gadget.services.people_container;
});
