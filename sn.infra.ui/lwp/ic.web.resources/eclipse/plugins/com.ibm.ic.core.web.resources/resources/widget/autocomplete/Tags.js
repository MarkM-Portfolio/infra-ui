/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
      "dojo/_base/declare",
      "dojo/dom-class",
      "ic-ui/AutocompleteInput",
      "ic-ui/AutocompleteMenu"
], function(declare, domClass, AutocompleteInput, AutocompleteMenu) {

   var Tags = declare("lconn.core.widget.autocomplete.Tags", AutocompleteInput, {
      // When a tag is selected, add it to the input using the name attribute on
      // the item.
      valueOnSelect : "name",
      // The separator for tags is a space (TODO: support others?)
      token : ' ',
      initRenderer : function() {
         var widget = new TagsMenu({
            around : this.domNode,
            store : this.store,
            parent : this
         });
         this.connect(widget, "onSelect", "onSelect");
         return widget;
      }
   });

   var TagsMenu = declare("lconn.core.widget.autocomplete.TagsMenu", AutocompleteMenu, {
      idProperty : "name",
      itemTemplate : "<span class='lotusLeft'>&nbsp;</span><span class='lotusMeta'>&nbsp;</span>",
      postCreate : function() {
         this.inherited(arguments);
         var templateNode = this.templateNode;
         domClass.add(templateNode, "lotusAlignRight");
         templateNode.innerHTML = this.itemTemplate;
      },
      updateItem : function(item, node, store) {
         node.lastChild.firstChild.data = store.getValue(item, "count", "\u00A0");
         node.firstChild.firstChild.data = store.getValue(item, "name");
      }
   });
   return Tags;
});
