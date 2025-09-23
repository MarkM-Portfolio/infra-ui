/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-class",
   "dojo/parser",
   "dojo/topic",
   "dijit/Tree"
], function (declare, lang, domClass, parser, topic, Tree) {

   var PaletteTree = declare(
   // widget name and class
   "lconn.core.paletteOneUI.PaletteTree",

   // superclass
   Tree,

   // properties and methods
   {
      // summary: Widget displaying the available iWidgets to the end-user as a clickable tree
      // description: See https://w3.tap.ibm.com/w3ki/display/conndev/Widget+palette+in+2.5 for more details
      //      This class extends the dijit standard Tree widget: 
      //        - Adds the possibility to display CSS sprites for the Connections icons
      // openOnClick: Boolean
      //      Overriden from parent to expend a category folder rather than selecting it like the tree's leaves
      openOnClick: false,

      // persist: Boolean
      //      Overriden from parent. Enables/disables use of cookies for state saving.
      persist: false,

      // WIDGET_SELECTED_EVENT: Const String
      //   Name of internal event published by the tree when the user selects an widget in the tree
      WIDGET_SELECTED_EVENT: "/ic-core/palette/widgetSelected",

      // CATEGORY_SELECTED_EVENT: Const String
      //   Name of internal event published by the tree when the user selects a category in the tree
      CATEGORY_SELECTED_EVENT: "/ic-core/palette/categorySelected",

      // PERSIST_LABEL_CSS: Const String
      //   Name of CSS class used tp persist the background color or the last selected node, even when the focus is no longer on the tree
      PERSIST_LABEL_CSS: "persistLabelFocused",

      WIDGET_CATEGORY: "widgetCategory",

      postCreate: function() {
         // summary: post create initialization
         console.log("postCreate");
         this.inherited("postCreate", arguments);
      },

      getIconClass: function( /*dojo.data.Item*/ item, /*Boolean*/ opened) {
         // summary: Overriden to add support for Connections CSS sprites  
         var customClass = "";
         if ((item != null) && (item.css != null)) {
            customClass = lang.trim(item.css[0]) + " lotusIconSprite lotusSprite";
            return customClass;
         }
         return (!item || this.model.mayHaveChildren(item)) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf";
      },


      getLabelClass: function( /*dojo.data.Item*/ item, /*Boolean*/ opened) {
         // summary: Overriden to add support for widgetCategory folder styling
         if ((item != null) && (item.type != null) && (item.type[0] == this.WIDGET_CATEGORY)) {
            return "bold";
         }
         return "blueLeaf";
      },

      onClick: function( /* dojo.data */ item, /*TreeNode*/ node) {
         // summary: send an internal event to the panel in order to display data related to the selected widget
         if (item.type[0] == this.WIDGET_CATEGORY) {
            topic.publish(this.CATEGORY_SELECTED_EVENT, item);
         } else {
            topic.publish(this.WIDGET_SELECTED_EVENT, item);
         }
      },

      _onExpandoClick: function( /*Object*/ message) {
         // summary: Overriden to publish category selected event on expendo click
         this.inherited(arguments);

         var item = message.node.item;
         topic.publish(this.CATEGORY_SELECTED_EVENT, item);

         // need to mark the associated label node as _onTreeFocus does not seem to do the trick for expendos
         var labelNode = message.node.labelNode;
         domClass.add(labelNode, this.PERSIST_LABEL_CSS);
      },

      blurNode: function() {
         // summary: Overriden to remove custom persistLabelCSS      
         var node = this.lastFocused;
         if (!node) {
            return;
         }
         var labelNode = node.labelNode;
         domClass.remove(labelNode, this.PERSIST_LABEL_CSS);

         // calling parent at the end as it is setting lastFocused to null
         this.inherited(arguments);
      },

      _onTreeFocus: function( /*Widget*/ node) {
         // summary: Overriden to add custom persistLabelCSS         
         if (node) {
            var labelNode = node.labelNode;
            domClass.add(labelNode, this.PERSIST_LABEL_CSS);
         }

         this.inherited(arguments);
      }
   });

   return PaletteTree;
});
