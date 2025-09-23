/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/dom-construct",
      "dojo/string",
      "ic-ui/AutocompleteInput",
      "ic-ui/AutocompleteMenu",
      "ic-core/widget/autocomplete/person"
], function(declare, lang, domConstruct, string, AutocompleteInput, AutocompleteMenu, person) {

   /**
    * Requires a data store that implements dojo.data.api.Read.getFeatures().
    */
   var People = declare("lconn.core.widget.autocomplete.People", AutocompleteInput, {
      initRenderer : function() {
         var widget = new PeopleMenu({
            around : this.domNode,
            store : this.store,
            parent : this
         });
         this.connect(widget, "onSelect", "onSelect");
         return widget;
      }
   });

   var PeopleItems = declare("lconn.core.widget.autocomplete.PeopleItems", null, person);

   var PeopleMenu = declare("lconn.core.widget.autocomplete.PeopleMenu", [
         AutocompleteMenu,
         PeopleItems
   ], {
      idProperty : "id",
      pageSize : 20, // FIXME: Temporary
      directoryResults : false, // When true, the menu will hide the search
                                 // directory menu item
      postCreate : function() {
         this.inherited(arguments);
         this.templateNode.innerHTML = this.itemTemplate;
         if (this.store.getFeatures()['ic-core/widget/autocomplete.directorysearch']) {
            this.searchNode = domConstruct.create("li", {
               className : "dijitMenuItem dijitMenuNextButton _selectable",
               clickMethod : "searchDirectory",
               style : {
                  display : "none"
               },
               waiRole : "option",
               innerHTML : "Person not listed?  Use full search..."
            }, this.listNode);
         }
         this.complexity = this.store.getFeatures()['ic-core/widget/autocomplete.complexity'] || 0;
      },
      onBeforeRequest : function(kwArgs) {
         this.inherited(arguments);
         this.directoryResults = kwArgs.queryOptions.directory;
      },
      done : function() {
         this.inherited(arguments);
         this._showSearch();
      },
      empty : function(query, hasPrevious) {
         var validQuery = this.store.hasComplexity({
            query : query
         }, this.complexity);
         if (!validQuery) {
            var msg = (query.length > 0) ? this.messages.notEnoughInput : this.messages.noQuery;
            this.emptyNode.firstChild.data = string.substitute(msg, [ query
            ]);
            this._hideExcept("emptyNode", hasPrevious ? "previousNode" : null);
         }
         else {
            this.inherited(arguments);
            this._showSearch();
         }
      },
      _showSearch : function() {
         var searchNode = this.searchNode;
         if (searchNode && !this.directoryResults)
            searchNode.style.display = "";
      },

      searchDirectory : function() {
         var info = this.info;
         this.directoryResults = true;
         var options = lang.mixin({}, info.queryOptions, {
            directory : true,
            start : 0
         });
         this.clearSelect();
         this.fetch(info.query, options);
         // Returns true so that the ENTER key, when pressed on this item, does
         // not submit the input value.
         return true;
      }
   });
   return People;
});
