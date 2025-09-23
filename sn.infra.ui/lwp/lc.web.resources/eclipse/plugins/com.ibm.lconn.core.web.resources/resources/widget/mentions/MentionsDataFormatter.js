/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.mentions.MentionsDataFormatter");

/**
 * Data formatter for a mention node.
 * <p>
 * Note: this module is a copy of
 * {@link lconn.news.microblogging.sharebox.data.MentionsDataFormatter} and
 * should be reconciled.
 * 
 * @class lconn.core.widget.mentions.MentionsDataFormatter
 * @see {@link lconn.news.microblogging.sharebox.data.MentionsDataFormatter}
 * @author Qi Wei Zhang <zhangqiw@cn.ibm.com>
 */
dojo.declare("lconn.core.widget.mentions.MentionsDataFormatter", null, /** @lends lconn.core.widget.mentions.MentionsDataFormatter */ {

   /**
    * Container for name
    *
    * @type {DOMNode}
    */
   mentionsContainer : null,

   /**
    * Wrapper node
    *
    * @type {DOMNode}
    */
   fnContainer : null,

   /**
    * Container for userid
    *
    * @type {DOMNode}
    */
   idContainer : null,

   constructor: function() {
      // Create the template used to form the microformat for @mentions users.
      this._createMentionsContainer();
   },

   /**
    * Formats the mentions data
    * 
    * FIXME: this should be a static method
    *
    * @param {Object} data The mentions data
    */
   formatData: function(data) {
      var formattedText = "";

      var textBreakdown = data && data.textData || [];

      // Go through the elements of the text.
      dojo.forEach(textBreakdown, dojo.hitch(this, function(item) {
         if (item.type === "text" || item.type === "html") {
            formattedText  = formattedText.concat(item.value);
         } else {
            // Concatenate the microformat for the mentions.
            formattedText = formattedText.concat(this._createMentionsMarkup(item));
         }
      }));

      return formattedText;
   },

   /**
    * Creates a template that the details for each mention microformat will be
    * inserted into.
    * 
    * TODO: Do not create microformat programmatically. Reuse the mentions.html
    * template instead
    */
   _createMentionsContainer: function() {
      // Create a container for the details.
      this.container = dojo.create("div");

      // Create a vcard that will contain the user name and id details.
      var vcard = dojo.create("span", {
         className : "vcard"
      }, this.container);

      this.fnContainer = dojo.create("span", {
         className : "fn"
      }, vcard);

      this.idContainer = dojo.create("span", {
         className : "x-lconn-userid"
      }, vcard);
   },

   /**
    * Create the markup for a mentions user.
    *
    * @param {Object}
    *           user Object containing details for the user
    * @returns {String} Microformat for the user
    */
   _createMentionsMarkup: function(user) {
      // Get details of the user from the object passed in.
      // Enable the code below once the hasSymbol attribute is added in trackedmentions.
      var displayName = user.displayName ? dojox.html.entities.encode(user.displayName) : "";
      
      this.fnContainer.innerHTML = (user.hasSymbol) ? "@".concat(displayName) : displayName;

      this.idContainer.innerHTML = user.userId || "";

      return dojox.html.entities.decode(this.container.innerHTML);
   }
});
