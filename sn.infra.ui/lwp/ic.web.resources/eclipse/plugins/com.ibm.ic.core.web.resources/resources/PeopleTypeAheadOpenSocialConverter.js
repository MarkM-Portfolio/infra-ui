/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo/_base/array",
	"dojo/_base/declare"
], function (array, declare) {

/*
	 * Class that takes the OpenSocial people feed and converts it into a format
	 * that the common PeopleTypeAhead can use.
	 *
	 * @class ic-core.PeopleTypeAheadOpenSocialConverter
	 * @author Jim Antill
	 */
	var PeopleTypeAheadOpenSocialConverter = declare("lconn.core.PeopleTypeAheadOpenSocialConverter", null, /** @lends ic-core.PeopleTypeAheadOpenSocialConverter.prototype */ {
	   /**
	    * The id prefix of OpenSocial items
	    *
	    * FIXME: shouldn't this be a constant?
	    *
	    * @type {String}
	    */
	   idPrefix: "urn:lsid:lconn.ibm.com:profiles.person:",
	
	   /**
	    * Converts the OpenSocial feed into a feed the PeopleTypeAhead can
	    * consume.
	    *
	    * @param {Object}
	    *           osFeed The OpenSocial people feed.
	    * @returns {Object} Object containing the PeopleTypeAhead consumable feed.
	    */
	   convertOpenSocialPeopleTypeAheadFeed: function(osFeed) {
	      var wrapper = this._createWrapper();
	
	      var self = this;
	
	      // Use the map function to convert each OpenSocial people item
	      wrapper.items = array.map(osFeed.list, function(osItem) {
	         return self._convertItem(osItem);
	      })
	
	      return wrapper;
	   },
	
	
	   /**
	    * Create a wrapper for the people items.
	    *
	    * @private
	    * @returns {Object} Wrapper for the feed.
	    */
	   _createWrapper: function() {
	      var wrapper =
	         {identifier: "member",
	          label: "name",
	          items: []
	         };
	
	      return wrapper;
	   },
	
	
	   /**
	    * Function to create an individual people item consumable by the
	    * PersonTypeAhead.
	    *
	    * @private
	    * @param {Object}
	    *           osItem The item from the OpenSocial feed
	    * @returns {Object} The person item consumable by the PersonTypeAhead.
	    */
	   _convertItem: function(osItem) {
	
	      var emailAddress = this._getEmail(osItem.emails);
	
	      var userId = osItem.id.replace(this.idPrefix, "");
	
	      var item =
	         {name: osItem.displayName,
	          userid: userId,
	          member: emailAddress,
	          type: "0"};
	
	      return item;
	   },
	
	   /**
	    * Retrieves the email address from an OpenSocial item.
	    * We return either the first email address with a type of "primary"
	    * or the first other email address in the array.
	    *
	    * @private
	    * @param  {Array} emails Array of email addresses
	    * @returns {String} Primary email address of person
	    */
	   _getEmail: function(emails) {
	      var emailToReturn = "";
	
	      if (emails && emails.length > 0) {
	         // If we only have one email, which will be the normal case, then just return that.
	         if (emails.length == 1) {
	            emailToReturn = emails[0].value;
	         } else {
	            // Use filter to get any emails of type primary
	            var primaryMails = array.filter(emails, function(email) { return email.type == "primary"} );
	
	            if (primaryMails.length > 0) {
	               emailToReturn = primaryMails[0].value;
	            } else {
	               // If we don't have any primary ones but do have some addresses just return the first one.
	               emailToReturn = emails[0].value;
	            }
	         }
	      }
	
	      return emailToReturn;
	   }
	
	});
	
	return PeopleTypeAheadOpenSocialConverter;
});
