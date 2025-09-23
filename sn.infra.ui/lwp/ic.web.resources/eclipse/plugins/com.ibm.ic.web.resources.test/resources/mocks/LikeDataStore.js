/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
        "dojo/_base/array",
        "dojo/_base/declare",
        "dojo/_base/lang"
], function(array, declare, lang) {

   var IDENTIFIER = 'identity', ID = 'id', NAME = 'name', USER_STATE = 'userState';

   /*
    * Returns a map of the items suitable for use by the data store
    */
   function buildItems(items) {
      var obj = {};
      array.forEach(items, function(item) {
         obj[item[ID]] = item;
      });
      return obj;
   }

   /*
    * Returns a flattened array representing the data store's items
    */
   function flatten(_items) {
      var i, ret = [];
      for (i in _items) {
         if (_items.hasOwnProperty(i)) {
            ret.push(_items[i]);
         }
      }
      return ret;
   }

   /**
    * Mock data store for the Like widget
    * 
    * @class ic-test.mocks.LikeDataStore
    */
   return declare(null, /** @lends ic-test.mocks.LikeDataStore.prototype */ {
      _items : {},
      _count : 10E12,
      constructor : function(args) {
         this._allItems = {};
         if (args && args.items) {
            this._allItems = buildItems(args.items);
            this._items = dojo.clone(this._allItems);
         }
         if (args && args.backupItems) {
            lang.mixin(this._allItems, buildItems(args.backupItems));
         }
      },
      fetch : function(args) {
         console.log('fetch');
         console.dir(arguments);
         if (args.onBegin) {
            args.onBegin(this._count, args);
         }
         if (args.onComplete) {
            args.onComplete(flatten(this._items));
         }
      },
      getFeatures : function() {
         console.log('getFeatures');
         console.dir(arguments);
      },
      isItem : function(args) {
         console.log('isItem');
         console.dir(arguments);
         return this._items[args[ID]] !== undefined;
      },
      isItemLoaded : function() {
         console.log('isItemLoaded');
         console.dir(arguments);
         return this.isItem.apply(this, arguments);
      },
      isDirty : function() {
         console.log('isDirty');
         console.dir(arguments);
      },
      getAttributes : function() {
         console.log('getAttributes');
         console.dir(arguments);
      },
      getValue : function(args, key) {
         console.log('getValue');
         console.dir(arguments);
         var item = this._items[args[IDENTIFIER]];
         if (item && item[key] !== undefined) {
            return item[key];
         }
         return null;
      },
      fetchItemByIdentity : function(args) {
         console.log('fetchItemByIdentity');
         console.dir(arguments);
         var item = (args[IDENTIFIER] && this._items[args[IDENTIFIER]]) || null;
         if (args.onItem) {
            args.onItem(item);
         }
      },
      _getIdentifierAttribute : function() {
         console.log('_getIdentifierAttribute');
         console.dir(arguments);
         return ID;
      },
      _getNameAttribute : function() {
         console.log('_getNameAttribute');
         console.dir(arguments);
         return NAME;
      },
      _getUserStateAttribute : function() {
         console.log('_getUserStateAttribute');
         console.dir(arguments);
         return USER_STATE;
      },
      revert : function() {
         console.log('revert');
         console.dir(arguments);
         this._dirty = false;
      },
      save : function() {
         console.log('save');
         console.dir(arguments);
         this._dirty = false;
      },
      deleteItem : function(item) {
         console.log('deleteItem');
         console.dir(arguments);
         if (this.isItem(item)) {
            delete this._items[item[ID]];
            this._count--;
            this._dirty = true;
            return true;
         }
         return false;
      },
      newItem : function(item) {
         console.log('newItem');
         console.dir(arguments);
         if (!this.isItem(item)) {
            this._items[item[ID]] = this._allItems[item[ID]];
            this._count++;
            this._dirty = true;
            return true;
         }
         return false;
      }
   });

});
