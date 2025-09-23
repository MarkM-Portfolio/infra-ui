/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "ic-core/CommonTags/CommonTagsTypeAhead",
      "ic-core/TypeAheadDataStore",
      "ic-core/config",
      "ic-core/config/services",
      "ic-core/url",
      "ic-core/widget/mentions/MentionsType"
], function(declare, CommonTagsTypeAhead, TypeAheadDataStore, config, services, url, MentionsType) {

   /**
    * A mention type representing hashtags.
    * <p>
    * This mention type is activated by the hash '#' character and uses a tag
    * typeahead service to suggest tags that match the user input.
    * <p>
    * The current implementation queries an Activities service. In the future,
    * the Search tag typeahead service will be used.
    * 
    * @author Piyush K. Agarwal <pagarwal@us.ibm.com>
    * @class ic-core.widget.mentions.TagMentionsType
    * @extends ic-core.widget.mentions.MentionsType
    */
   var TagMentionsType = declare("lconn.core.widget.mentions.TagMentionsType", MentionsType,
   /** @lends ic-core.widget.mentions.TagMentionsType.prototype */
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
      templateClass : "ic-core/widget/mentions/TagMentionsNode",
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
         if (services.activities) {
            // TODO: use global routes
            this._typeaheadFeed = url.getServiceUrl(services.activities) + "/service/json/tags";
            this.typeaheadDataStore = new TypeAheadDataStore({
               url : this._typeaheadFeed,
               queryParam : "tag"
            });
         }
      },

      /**
       * Initializes the typeahead
       */
      initTypeahead : function() {
         this._typeahead = new CommonTagsTypeAhead(this._typeaheadArgs);
      }
   });

   return TagMentionsType;
});
