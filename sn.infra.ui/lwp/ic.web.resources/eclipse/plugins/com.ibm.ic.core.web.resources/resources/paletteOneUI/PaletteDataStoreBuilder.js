/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/Deferred",
      "dojo/_base/array",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/data/ItemFileWriteStore",
      "dojo/json",
      "dojo/request"
], function(dojo, Deferred, array, declare, lang, ItemFileWriteStore, JSON, request) {

   // FIXME: in Dojo 1.3, properties of DataStore items are no longer scalar
   // values, but arrays.
   // The paletteOneUI code makes the assumption that properties are scalar
   // values. This code must
   // be entirely refactored.

   var PaletteDataStoreBuilder = declare(
   // class
   "lconn.core.paletteOneUI.PaletteDataStoreBuilder",
   // superclass
   null, {
      // summary: Utility taking a JSON string format and returning an
      // ItemFileReadStore
      // description: Take a JSON string about the available widgets and
      // categories
      // (as described at
      // https://w3.tap.ibm.com/w3ki/display/conndev/Widget+palette+in+2.5)
      // and build an data store that can be consumed by the PaletteTree
      buildDataStore : function( /* String | Object */paletteJson, /* Boolean? */isXhr) {
         // summary: Build a data store from the Json data passed. The Json data
         // must follow the format described at
         // https://w3.tap.ibm.com/w3ki/display/conndev/Widget+palette+in+2.5)
         // description: If isXhr is true, paletteJson must represents an url
         // from where to fetch the Json data
         // If isXhr is false or undefined, paletteJson can be a Json string or
         // a Json object
         //
         // Return a dojo.Deferred object with callback of the form
         // function(dataStore)
         var result = null;
         var deferred = new Deferred();

         if (paletteJson != null) {

            // for the closure
            var that = this;
            // callback if isXhr is true, called directly otherwise
            var _buildStore = function(json) {
               try {
                  json = lang.isString(json) ? JSON.parse(json, false) : json;
                  var dataItems = that._connectionsFormat2DojoTreeFormat(json);
                  var store = new ItemFileWriteStore({
                     data : dataItems
                  });
                  deferred.resolve(store);
               }
               catch (e) {
                  deferred.reject(e);
               }
            }

            if (isXhr) {
               // paletteJson is an url. _buildStore is called after retrieval
               this._fetchJsonString(paletteJson).then(_buildStore, function(e) {
                  deferred.reject(e);
               });
            }
            else {
               // call _buildStore directly
               _buildStore(paletteJson);
            }
         }
         else {
            deferred.reject(new Error("Invalid paletteJson argument supplied to buildDataStore", paletteJson));
         }

         return deferred;
      },

      _connectionsFormat2DojoTreeFormat : function( /* Object */jsonObject) {
         // summary: Convert a Connections JSON string to the JSON
         // representation expected by Dijit Tree
         // description: Dijit Tree expects an Data Store built following a
         // specific hierachy and reserved names
         // Consequently, we have to convert the Connections JSON format
         // (https://w3.tap.ibm.com/w3ki/display/conndev/Widget+palette+in+2.5)
         // to the specific Dijit Tree format
         // (http://dojotoolkit.org/2008/02/24/dijit-tree-and-dojo-data-dojo-1-1-model)
         var dojoFormat = {
            label : 'name',
            identifier : 'id'
         };

         // build dojoFormat.items
         var items = [];

         if ((jsonObject != null) && (jsonObject.categories != null)) {
            // _handleCategory returns an array of items
            var returnedItems = array.map(jsonObject.categories, lang.hitch(this, "_handleCategory"));
            array.forEach(returnedItems, function(subItems) {
               array.forEach(subItems, function(item) {
                  items.push(item);
               });
            });
         }

         dojoFormat.items = items;
         return dojoFormat;
      },

      _handleCategory : function(category) {
         var items = [];

         var returnedItems = array.map(category.widgets, lang.hitch(this, "_buildWidgetItemFromWidgetObj"));
         array.forEach(returnedItems, function(item) {
            items.push(item);
         });

         items.push(this._buildCategoryItem(category.id, category.name, category.css, items));
         return items;
      },

      _fetchJsonString : function( /* String */url) {
         // sumary: fetch whatever is at the passed url (does not handle cross
         // domain proxing). Useful to fetch Json string
         // return deferrable object
         return request(url, {
            method : "GET",
            handleAs : 'json'
         });
      },

      _buildCategoryItem : function( /* String */id, /* String */name, /* String */css, /* Array[String] */widgets) {
         var catItem = {
            id : id,
            name : name,
            type : 'widgetCategory',
            // TODO: create const
            css : css,
            children : []
         };

         array.forEach(widgets, function(widget) {
            catItem.children.push({
               _reference : widget.id
            });
         });

         return catItem;
      },

      _buildWidgetItemFromWidgetObj : function(widget) {
         return this._buildWidgetItem(widget);
      },

      _buildWidgetItem : function(widget) {
         var widgetItem = {};

         for ( var key in widget) {
            if (key.charAt(0) != '_') {
               widgetItem[key] = widget[key];
            }
         }

         widgetItem.type = 'widget';

         return widgetItem;
      }
   });

   return PaletteDataStoreBuilder;
});
