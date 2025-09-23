/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.mentions.PersonMentionsType");

dojo.require("lconn.core.locale");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.widget.mentions.MentionsType");
dojo.require("lconn.core.widget.mentions.PersonMentionsNode");
dojo.require("lconn.core.PeopleTypeAhead");
dojo.require("lconn.core.PeopleDataStore");
dojo.require("lconn.core.PeopleDataStoreOpenSocial");

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
 * @name lconn.core.widget.mentions.PersonMentionsType
 * @augments lconn.core.widget.mentions.MentionsType
 * @class
 */
dojo.declare("lconn.core.widget.mentions.PersonMentionsType", lconn.core.widget.mentions.MentionsType,
      /** @lends lconn.core.widget.mentions.PersonMentionsType.prototype */ {
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

      if (lconn.core.widget.mentions.PersonMentionsType.SEARCH_URL) {
         // TODO: move to global routes
          this._typeaheadFeed = lconn.core.widget.mentions.PersonMentionsType.SEARCH_URL
            + (this.network && this.network.oauth ? '/oauth' : '/anonymous') + '/people/typeahead';
         // TODO: move to global routes
         this._extendedTypeAheadFeed = lconn.core.widget.mentions.PersonMentionsType.OPENSOCIAL_URL
            + (this.network && this.network.oauth ? '/oauth' : '/anonymous') + '/rest/people/@public/@all';

         this.typeaheadDataStore = new lconn.core.HybridPeopleDataStoreOpenSocial({
            url : this._typeaheadFeed,
            queryParam : "name",
            extendedTypeAheadUrl : this._extendedTypeAheadFeed,
            extendedQueryParam : "filterValue",
            openSocialParameters : osParams,
            network : this.network
         });
      } else {
         this._typeaheadFeed = lconn.core.widget.mentions.PersonMentionsType.OPENSOCIAL_URL
            + (this.network && this.network.oauth ? '/oauth' : '/anonymous') + '/rest/people/@public/@all';
         this.typeaheadDataStore = new lconn.core.PeopleDataStoreOpenSocial({
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
      dojo.mixin(this._typeaheadArgs, {
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
      this._typeahead = new lconn.core.PeopleTypeAhead(this._typeaheadArgs, this._typeahead);
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

if (lconn.core.config.services.search) {
   lconn.core.widget.mentions.PersonMentionsType.SEARCH_URL = lconn.core.url.getServiceUrl(lconn.core.config.services.search);
}

lconn.core.widget.mentions.PersonMentionsType.OPENSOCIAL_URL = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial);
