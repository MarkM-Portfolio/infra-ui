/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/i18n",
      "dojo/i18n!./nls/insertimagedialog",
      "dojo/_base/declare",
      "dojo/dom-geometry",
      "dojo/i18n!./nls/strings",
      "dojo/parser",
      "dojo/query",
      "dojo/text!./templates/TempTabbedDialog.html",
      "dojo/topic",
      "dijit/Dialog",
      "dijit/layout/TabContainer"
], function(dojo, i18n, i18ninsertimagedialog, declare, domGeometry, i18nstrings, parser, query, template, topic, Dialog, TabContainer) {

   var TempTabbedDialog = declare("lconn.core.TempTabbedDialog", Dialog, {
      templateString : null,
      widgetsInTemplate : true,
      parseOnLoad : true,
      templateString : template,
      blankGif : dijit._Widget.prototype._blankGif,

      rs : i18nstrings,
      messages : i18ninsertimagedialog,

      createTabs : function(tabs) {
         var widgets = query("> [widgetid]", this.containerNode).map(function(el) {
            return dijit.byNode(el)
         }).forEach(function(wid) {
            if (wid.declaredClass == "dijit.layout.ContentPane")
               tabs.addChild(wid)
         });

         this.subscribe(tabs.id + "-selectChild", this._changeTab);

         tabs.startup();

         tabs.resize();
         setTimeout(function() {
            var tablist = tabs.tablist;
            if (tablist) {
               tablist.tablistWrapper.style.width = domGeometry.position(tablist.domNode).w + "px";
            }
         }, 50);
      },

      postCreate : function() {
         this.inherited(arguments);
         this.tabs = new TabContainer({
            tabStrip : true,
            doLayout : false
         }, this.tabs);
      },

      _setup : function() {
         this.inherited(arguments);
         this.createTabs(this.tabs);
      },

      _changeTab : function(tab) {
         this._position();
         this.onTabChange(tab);
      },

      onTabChange : function(tab) {},

      save : function(e) {
         e.preventDefault(), e.stopPropagation();
         this.onSave();
      },

      onSave : function() {}
   });
   return TempTabbedDialog;
});
