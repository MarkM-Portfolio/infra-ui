/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.people");

/**
 * This module provides the standard Social image and link API.
 */
com.ibm.social.layout.people = {
	/**
	 * Return a link to a person.  
	 * 
	 * @param person 
	 * 		An object with the following required properties
	 * 			name: The display name of the person
	 * 
	 * 		and the following optional properties
	 * 			userid: The IBM Connections snx:userid attribute
	 * 			uid: The directory unique identifier of the person
	 * 			dn: The distinguished name of the person
	 * 			email: The e-mail address of the person
	 * 			key: A value representing the unique identifier of the person, system-specific.
	 * 				For IBM Connections this value represents the Profiles UUID for the person.
	 */
	createLink: function(person) {
		return null;
	},
	createImage: function(person, size, link) {
		return null;
	},
	getImageUrl: function(person, size) {
		return null;
	},
	isImageEnabled: function() {
		return false;
	}
};

