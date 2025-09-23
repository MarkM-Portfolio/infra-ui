/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.controls.TabbedDialog");
dojo.require("dijit.Dialog");
dojo.require("dijit.layout.TabContainer");

dojo.declare("com.ibm.oneui.controls.TabbedDialog", dijit.Dialog,  {
   templateString: null,
   widgetsInTemplate: true,
   parseOnLoad: true,
   templatePath: dojo.moduleUrl("com.ibm.oneui", "controls/templates/TabbedDialog.html"),
   attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
      title: []
   }),      
   createTabs: function(tabs) {  
      //tabs.startup();
      //tabs.resize();
   },
   _setup: function() {
     this.inherited(arguments);
     this.createTabs(this.tabs);
   }
});
