define/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "dojox/grid/DataGrid",
   "dojo/data/ItemFileWriteStore",
   "./NewRelicDebug",
   "dojo/_base/array",
   "dojox/lang/functional",
   "dojo/dom-construct",
   "dojo/on",
   "dojo/dom-style"
], function (DataGrid, ItemFileWriteStore, NewRelicDebug, array, functional, domConstruct, on, domStyle) {

   function getStore() {
      var entries, data, store, layout, cols;

      entries = NewRelicDebug._getData();

      data = {
         identifier: "event",
         items: []
      };

      layout = [[
         { name: 'event', field: 'event', width: '50px' },
         { name: 'timestamp', field: 'timestamp', width: '200px' },
         { name: 'actionName', field: 'actionName', width: '150px' }
      ]];

      cols = [];

      array.forEach(entries, function (entry, index) {
         var item = {
            event: index + 1,
            actionName: entry.actionName,
            timestamp: entry.timestamp
         };

         functional.forIn(entry.args, function (value, key) {
            var col = "args." + key;

            item[col] = value;

            if (cols.indexOf(col) === -1) {
               layout[0].push({
                  name: col,
                  field: col,
                  width: "150px"
               });

               cols.push(col);
            }
         });
         
         data.items.push(item);
      });

      store = new ItemFileWriteStore({ data: data });

      return {
         store: store,
         layout: layout
      };
   }

   function refresh(grid) {
      var store = getStore();

      grid.setStore(store.store);
      grid.set("structure", store.layout);
   }

   function toggleDebug() {
      NewRelicDebug._setDebugEnabled(!NewRelicDebug._isDebugEnabled());
   }

   function setDebugText(button) {
      button.innerHTML = NewRelicDebug._isDebugEnabled() ? "Disable Debug" : "Enable Debug";
   }

   return {
      render: function (parent) {
         var store, clearButton, refreshButton, toggleButton, grid;

         store = getStore();

         grid = new DataGrid({
            store: store.store,
            structure: store.layout,
            rowSelector: '20px'
         });

         toggleButton = domConstruct.create("button", {}, parent);
         setDebugText(toggleButton);

         refreshButton = domConstruct.create("button", {
            innerHTML: "Refresh"
         }, parent);

         clearButton = domConstruct.create("button", {
            innerHTML: "Clear Data",
            style: {
               "float": "right"
            }
         }, parent);

         on(toggleButton, "click", function () {
            toggleDebug(toggleButton);
            setDebugText(toggleButton)
         });

         on(refreshButton, "click", function () {
            refresh(grid);
         });
         
         on(clearButton, "click", function () {
            NewRelicDebug._clearData();
            refresh(grid);
         });

         grid.placeAt(parent);
         grid.startup();

         domStyle.set(parent, "height", "");
      }
   }
});