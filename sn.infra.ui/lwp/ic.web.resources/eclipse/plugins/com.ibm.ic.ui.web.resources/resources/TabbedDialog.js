/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/text!com/ibm/oneui/controls/templates/TabbedDialog.html",
        "dijit/Dialog",
        "dijit/_Widget",
        "dijit/layout/TabContainer"
], function(declare, lang, template, Dialog, _Widget, TabContainer) {

   var TabbedDialog = declare("com.ibm.oneui.TabbedDialog", Dialog, {
      widgetsInTemplate : true,
      parseOnLoad : true,
      templateString : template,
      attributeMap : lang.delegate(_Widget.prototype.attributeMap, {
         title : []
      }),
      createTabs : function(tabs) {
         // tabs.startup();
         // tabs.resize();
         return;
      },
      _setup : function() {
         this.inherited(arguments);
         this.createTabs(this.tabs);
      }
   });
   return TabbedDialog;
});
