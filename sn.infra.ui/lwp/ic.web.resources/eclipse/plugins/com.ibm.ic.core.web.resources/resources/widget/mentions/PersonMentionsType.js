/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "ic-core/PeopleDataStoreOpenSocial",
   "ic-core/HybridPeopleDataStoreOpenSocial",
   "ic-core/PeopleTypeAhead",
   "ic-core/config",
   "ic-core/config/services",
   "ic-core/locale",
   "ic-core/url",
   "ic-core/widget/mentions/MentionsType",
   "ic-core/widget/mentions/PersonMentionsNode"
], function (declare, lang, PeopleDataStoreOpenSocial, HybridPeopleDataStoreOpenSocial, PeopleTypeAhead, config, services, locale, url, MentionsType, PersonMentionsNode) {

   
   /**
    * A mention type representing a person.
    * <p>
    * This mention type is activated by the at '@' character and uses a people
    * typeahead service to suggest people that match the user input.
    * <p>
    * The current implementation is an empty skeleton that gains specialized
    * behavior based on the execution environment, e.g. SmartCloud, on-premises,
    * etc.
    * <p>
    * This implementation uses a factory pattern to return the appropriate
    * typeahead and data store implementations based on context variables. In the
    * future, it will use behavioral overrides based on Shared Web Resources
    * framework bindings.
    *
    * @author Piyush K. Agarwal <pagarwal@us.ibm.com>
    * @class ic-core.widget.mentions.PersonMentionsType
    * @extends lconn.core.widget.mentions.MentionsType
    */
   var PersonMentionsType = declare("lconn.core.widget.mentions.PersonMentionsType", MentionsType,
         /** @lends ic-core.widget.mentions.PersonMentionsType.prototype */ {
      /**
       * Type
       * @type {String}
       */
      // FIXME: can't this be inferred from declaredClass?
      _type : "PersonMentionsType",
      /**
       * Activator character
       * @type {String}
       */
      _activatorChar : '@',
      /**
       * Dojo module representing the template class
       * @type {String}
       */
      templateClass : "lconn.core.widget.mentions.PersonMentionsNode",
      /** @type {Boolean} */
      isPersonAndGroup : false,
      /** @type {String} */
      noResultsMsg : "",
      /** @type {String} */
      headerMsg : "",
      /** @type {Boolean} */
      disableSearchDirectory : false,
      /** @type {Boolean} */
      disableBizCard : false,
   
      /**
       * Initializes the data store
       */
      initDefaultDataStore : function() {
         var osParams = {
            filterBy : "displayName",
            count : 15
         };
   
         if (PersonMentionsType.SEARCH_URL) {
            // TODO: move to global routes
            this._typeaheadFeed = PersonMentionsType.SEARCH_URL
               + (this.network && this.network.oauth ? '/oauth' : '/anonymous') + '/people/typeahead';
            // TODO: move to global routes
            this._extendedTypeAheadFeed = PersonMentionsType.OPENSOCIAL_URL
               + (this.network && this.network.oauth ? '/oauth' : '/anonymous') + '/rest/people/@public/@all';
   
            this.typeaheadDataStore = new HybridPeopleDataStoreOpenSocial({
               url : this._typeaheadFeed,
               queryParam : "name",
               extendedTypeAheadUrl : this._extendedTypeAheadFeed,
               extendedQueryParam : "filterValue",
               openSocialParameters : osParams,
               network : this.network
            });
         } else {
            this._typeaheadFeed = PersonMentionsType.OPENSOCIAL_URL
               + (this.network && this.network.oauth ? '/oauth' : '/anonymous') + '/rest/people/@public/@all';
            this.typeaheadDataStore = new PeopleDataStoreOpenSocial({
               url : this._typeaheadFeed,
               queryParam : "filterValue",
               openSocialParameters : osParams,
               network : this.network
            });
         }
      },
   
      /**
       * Initializes the arguments that are passed to the typeahead object
       */
      initTypeaheadArgs : function() {
         this.inherited(arguments);
         // Add new properties
         lang.mixin(this._typeaheadArgs, {
            isPersonAndGroup: this.isPersonAndGroup,
            // FIXME: use mixedCase names
            NoResultsMessage: this.noResultsMsg,
            // FIXME: use mixedCase names
            HeaderMessage: this.headerMsg,
            "class": "typeAhead",
            minChars: 2,
            multipleValues: false,
            searchDelay: 600,
            disableSearchDirectory: this.disableSearchDirectory,
            disableBizCard: this.disableBizCard
         });
      },
   
      /**
       * Instantiates the typeahead.
       */
      initTypeahead : function() {
         this._typeahead = new PeopleTypeAhead(this._typeaheadArgs, this._typeahead);
         this._typeahead._vOffset = 4;
      },
   
      /**
       * Cleans up the widget created by this instance
       */
      cleanUp: function() {
         if (this._typeahead) {
            this._typeahead.destroyRecursive();
            this._typeahead = null;
         }
      }
   });
   
   if (services.search) {
      PersonMentionsType.SEARCH_URL = url.getServiceUrl(services.search);
   }
   
   PersonMentionsType.OPENSOCIAL_URL = url.getServiceUrl(services.opensocial);
   
   return PersonMentionsType;
});
