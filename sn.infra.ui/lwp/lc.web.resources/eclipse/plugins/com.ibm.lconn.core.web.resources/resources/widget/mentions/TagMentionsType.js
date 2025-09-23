/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.mentions.TagMentionsType");

dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.widget.mentions.MentionsType");
dojo.require("lconn.core.TypeAheadDataStore");
dojo.require("lconn.core.CommonTags.CommonTagsTypeAhead");

/**
 * A mention type representing hashtags.
 * <p>
 * This mention type is activated by the hash '#' character and uses a tag
 * typeahead service to suggest tags that match the user input.
 * <p>
 * The current implementation queries an Activities service. In the future, the
 * Search tag typeahead service will be used.
 * 
 * @author Piyush K. Agarwal <pagarwal@us.ibm.com>
 * @name lconn.core.widget.mentions.TagMentionsType
 * @augments lconn.core.widget.mentions.MentionsType
 * @class
 */
dojo.declare("lconn.core.widget.mentions.TagMentionsType", lconn.core.widget.mentions.MentionsType,
/** @lends lconn.core.widget.mentions.TagMentionsType.prototype */
{
   /**
    * Type
    * 
    * @type {String}
    */
   // FIXME: can't this be inferred from declaredClass?
   _type : "TagMentionsType",
   /**
    * Activator character
    * 
    * @type {String}
    */
   _activatorChar : '#',
   /**
    * Dojo module representing the template class
    * 
    * @type {String}
    */
   templateClass : "lconn.core.widget.mentions.TagMentionsNode",
   /**
    * The typeahead widget
    * 
    * @private
    */
   _typeahead : null,
   /**
    * Initializes the data store
    */
   initDefaultDataStore : function() {
      // FIXME: Looks like a prototype using an Activities service?
      // TODO: Use Search tag typeahead service
      if (lconn.core.config.services.activities) {
         // TODO: use global routes
         this._typeaheadFeed = lconn.core.url.getServiceUrl(lconn.core.config.services.activities) + "/service/json/tags";
         this.typeaheadDataStore = new lconn.core.TypeAheadDataStore({
            url : this._typeaheadFeed,
            queryParam : "tag"
         });
      }
   },

   /**
    * Initializes the typeahead
    */
   initTypeahead : function() {
      this._typeahead = new lconn.core.CommonTags.CommonTagsTypeAhead(this._typeaheadArgs);
   }
});
