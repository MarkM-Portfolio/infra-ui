/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom",
        "dojo/html",
        "dojo/i18n",
        "dojo/i18n!./nls/Recommender",
        "ic-ui/_base"
], function(dojo, declare, lang, dom, html, i18n, i18nRecommender, _base) {

   function callee(args) {
      return args.callee.nom;
   }

   /**
    * @namespace ic-ui.recommend
    */

   /**
    * @class ic-ui.recommend._base
    * @extends com.ibm.oneui._base
    * @author Cesar A Wong <cawong@us.ibm.com>
    */
   return declare("com.ibm.oneui.recommend._base", _base, /** @lends ic-ui.recommend._base.prototype */
   {

      loadIndividualStyles : false,
      loadDefaultStrings : true,
      currentUserId : null,

      dataStore : null,

      displayNameAttr : "displayName",
      userIdAttr : "userId",
      mailAttr : "mail",

      editable : true,

      size : -1,

      ERROR : {
         ITEM_NOT_FOUND : 0,
         ITEM_LOAD_FAILURE : 2,
         DATASTORE_NOT_FOUND : 3
      },

      _getDefaultStateObject : function() {
         return {
            store : {
               data : this.dataStore,
               request : {
                  count : this.count
               },
               attributes : {
                  displayNameAttr : this.displayNameAttr,
                  userIdAttr : this.userIdAttr,
                  mailAttr : this.mailAttr
               }
            }
         };
      },

      postMixInProperties : function() {
         this._loadSupplementalDojo();

         var _this = this;
         _this.toggleFocus = false;

         // since this is the first time we're calling the state object, let's
         // make sure it has everything we need.
         var sAttr, stateObj = this._getStateObject(this._getDefaultStateObject());

         // assign the attributes back to the main widget
         for (sAttr in stateObj.store.attributes) {
            if (stateObj.store.attributes.hasOwnProperty(sAttr)) {
               if (sAttr) {
                  this[sAttr] = stateObj.store.attributes[sAttr];
               }
            }
         }

         if (this.loadDefaultStrings) {
            stateObj.strings = i18nRecommender;
         }

         if (this.strings !== null && typeof this.strings === "object") {
            if (!stateObj.strings) {
               stateObj.strings = this.strings;
            }
            else {
               stateObj.strings = this._mixin(stateObj.strings, this.strings);
            }
         }

         try {
            if (typeof this.around === "string") {
               this.around = dom.byId(this.around);
            }
         }
         catch (ignore) {
         }

         if (this.currentUserId == null || this.currentUserId == "" || this.currentUserId.toLowerCase() == "anonymous") {
            this.editable = false;
         }

         setTimeout(function() {
            if (stateObj.store.data === undefined || stateObj.store.data == null) {
               _this.onError({
                  code : _this.ERROR.DATASTORE_NOT_FOUND,
                  message : "DataStore or Request object not set.",
                  callee : callee(arguments)
               });
            }
         }, 1);

         this.inherited(arguments);

      },

      // override this in your subclassed widget
      populateRecommend : function() {
         return;
      },

      _toggleRecommend : function() {
         this.toggleFocus = true;
         this.logEnter(arguments);

         var _this = this;

         this._setRecommend(!this._getRecommend(), function() {
            setTimeout(function() {
               _this.populateRecommend();
            }, 1);
         });
         this.logExit(arguments);
      },

      _isUserRecommended : false,
      _currentUserItem : null,
      _setRecommend : function(yn, callback) {

         var previousIsUserRecommended = this._isUserRecommended;

         this._isUserRecommended = !!yn;

         var _this = this;

         var success;

         var ds = this._getStateObject().store.data;
         if (!ds) {
            this.onError({
               code : this.ERROR.DATASTORE_NOT_FOUND,
               message : "Data store not found.",
               callee : callee(arguments)
            });
            return;
         }

         if (this._currentUserItem == null && this._isUserRecommended) {
            var newObj = {};
            newObj[ds._getIdentifierAttribute()] = this.currentUserId;

            try {
               success = ds.newItem(newObj);
            }
            catch (ee) {
               // this item may have already be in the store. Just swallow it.
               success = true;
            }
            if (success) {
               this._isPopulateLoaded = false;
            }

         }
         else if (this._currentUserItem != null && !this._isUserRecommended) {
            this._currentUserItem._node_ = null;

            try {
               success = ds.deleteItem(this._currentUserItem);
            }
            catch (ee) {
               // this item may have already been removed by popup. Just swallow
               // it.
               success = true;
            }

            if (success) {
               this._isPopulateLoaded = false;
            }

         }

         if (ds.isDirty()) {
            ds.save({
               onComplete : function() {
                  if (lang.isFunction(callback)) {
                     callback();
                  }
               },
               onError : function(error) {
                  ds.revert();
                  _this._isUserRecommended = previousIsUserRecommended;
                  _this._onError({
                     code : _this.ERROR.ITEM_LOAD_FAILURE
                  }, error);
               }
            });
         }
         else {
            if (lang.isFunction(callback)) {
               callback();
            }
         }

         this.logExit(arguments);
      },

      _getRecommend : function() {
         return !!this._isUserRecommended;
      },

      _getWidgetClassName : function(def) {
         return def || this.coreWidgetClass || this.declaredClass;
      },

      _loadSupplementalDojo : function() {
         this.logEnter(arguments);

         // if (this.loadDefaultStrings) {
         // }

         this.logExit(arguments);
      },

      _onError : function(e, error) {
         this.logEnter(arguments);

         this.onError.apply(this, arguments);

         this.logExit(arguments);
      },
      onError : function(e, error) {
         this.logError(e);
      }

   });
});
