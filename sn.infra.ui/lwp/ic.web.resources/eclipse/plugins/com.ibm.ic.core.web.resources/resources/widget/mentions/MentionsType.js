/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-class",
   "dojo/dom-construct"
], function (dojo, declare, lang, domClass, domConstruct) {

   var MentionsType = declare("lconn.core.widget.mentions.MentionsType", null, /** @lends ic-core.widget.mentions.MentionsType.prototype */ {
      /** Unused? */
      _id : "",
      /**
       * Type
       * @type {String}
       */
      // FIXME: can't this be inferred from declaredClass?
      _type : "MentionsType",
      /**
       * Activator character
       * @type {String}
       */
      _activatorChar : '~',
      /**
       * Auto-populated if datastore provided, or if no datastore then determined
       * by if profiles is enabled/disabled (?)
       */
      _typeaheadFeed : '',
      /**
       * Typeahead object
       */
      _typeahead : null,
      /**
       * Typeahead arguments
       * @type {Object}
       */
      _typeaheadArgs : {},
      /**
       * Parent node (?)
       * @type {Node}
       */
      // FIXME: why does the mention type require a parent node?
      parentNode : null,
   
      /**
       * Optional, if not provided, automatically create a data store based on if
       * profiles is enabled or not. It must match format that the
       * lconn.core.PeopleTypeahead widget expects.
       */
      typeaheadDataStore : null,
      /**
       * Dojo module representing the template class
       * @type {String}
       */
      templateClass : "lconn.core.widget.mentions.MentionsNode",
      /**
       * Base class for mention types.
       * @abstract
       * @class lconn.core.widget.mentions.MentionsType
       * @constructs
       */
      constructor : function(args) {
         if (args) {
            dojo.safeMixin(this, args);
         }
   
         this.initPlaceholderField();
   
         if (!this.typeaheadDataStore)
            this.initDefaultDataStore();
         else
            this.initFromDataStore();
   
         this.initTypeaheadArgs();
         this.initTypeahead();
   
         this.postTypeaheadInit();
      },
   
      /**
       * Initializes the dummy input field for the typeahead widget
       */
      initPlaceholderField : function() {
         this._typeahead = domConstruct.create("input", {
            type : "text",
            id : this.parentNode.id + "_" + this._type
         });
   
         if (this.parentNode)
            domConstruct.place(this._typeahead, this.parentNode);
      },
      /**
       * Initializes the arguments that are passed to the typeahead object
       */
      initTypeaheadArgs : function() {
         lang.mixin(this._typeaheadArgs, {
            id : this._typeahead.id,
            minChars : 1,
            searchDelay : 400,
            multipleValues : false,
            store : this.typeaheadDataStore
         });
      },
   
      /**
       * Initializes the typeahead
       * @abstract
       */
      initTypeahead : function() {},
   
      /**
       * Initializes the data store
       * @abstract
       */
      initDefaultDataStore : function() {},
   
      initFromDataStore : function() {
         // handle initializing feed url etc. from passed in datastore
         if (this.typeaheadDataStore) {
            this._typeaheadFeed = this.typeaheadDataStore.url;
            this._extendedTypeAhead = this.typeaheadDataStore.extendedTypeAheadUrl;
         } else
            throw "No data store available!";
      },
   
      /**
       * Handles anything that needs to be set after typeahead is successfully
       * initialized
       */
      postTypeaheadInit : function() {
         this._typeahead.focusNode.preventFocus = true;
         domClass.add(this._typeahead, "lotusMentionsTypeaheadField");
         domClass.add(this._typeahead.domNode, "lotusMentionsTypeaheadField");
      },
   
      /**
       * Shorthand method to set a value for the typeahead field
       */
      setTypeaheadValue : function(text) {
         if (this._typeahead && this._typeahead.focusNode)
            this._typeahead.focusNode.value = text;
      },
   
      /**
       * Shorthand method to hide the typeahead menu
       */
      hideResults : function() {
         if (this._typeahead)
            this._typeahead._hideResultList();
      },
   
      /**
       * @returns the typeahead widget
       */
      getTypeaheadField : function() {
         return this._typeahead;
      },
   
      /**
       * @returns the typeahead popup widget
       */
      getTypeaheadPopup : function() {
         if (this._typeahead)
            return this._typeahead._popupWidget;
      },
   
      /**
       * @returns the typeahead results
       */
      getTypeaheadResults : function() {
         if (this._typeahead)
            return this._typeahead.results;
      },
   
      /**
       * Returns a vertical offset for the typeahead menu. This is required in some
       * circumstances to correctly place the menu on screen. Will be removed.
       * @deprecated
       * @returns the vertical offset of the typeahead menu
       */
      getVOffset : function() {
         if (this._typeahead)
            return this._typeahead._vOffset;
      }
   });
   
   return MentionsType;
});
