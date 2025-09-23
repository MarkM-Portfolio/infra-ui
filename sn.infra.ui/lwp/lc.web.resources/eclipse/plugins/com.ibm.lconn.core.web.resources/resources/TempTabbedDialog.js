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

(function() {
   dojo.provide("lconn.core.TempTabbedDialog");
   dojo.require("dijit.Dialog");
   dojo.require("dojo.parser");
   dojo.require("dijit.layout.TabContainer");
   dojo.requireLocalization('lconn.core', 'strings');
   dojo.requireLocalization("lconn.core", "insertimagedialog");
   dojo.declare("lconn.core.TempTabbedDialog", [dijit.Dialog], {
         templateString: null,
         widgetsInTemplate: true,
         parseOnLoad: true,
         templatePath: dojo.moduleUrl("lconn.core", "templates/TempTabbedDialog.html"),
         blankGif: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")),
         
         rs: dojo.i18n.getLocalization('lconn.core', 'strings'), 
         messages: dojo.i18n.getLocalization("lconn.core", "insertimagedialog"),
         
         createTabs: function(tabs) {
            var widgets = dojo.query("> [widgetid]", this.containerNode).map(function(el){return dijit.byNode(el)}).forEach(function(wid){if(wid.declaredClass == "dijit.layout.ContentPane")tabs.addChild(wid)});
            
            this.subscribe(tabs.id+"-selectChild", this._changeTab);
            
            tabs.startup();
			
            tabs.resize();
            setTimeout(function(){
                var tablist = tabs.tablist;
                if (tablist){
                    tablist.tablistWrapper.style.width = dojo.position(tablist.domNode).w + "px";
                }
            }, 50);
         },
         
         postCreate: function(){
             this.inherited(arguments);
             this.tabs = new dijit.layout.TabContainer({tabStrip: true, doLayout: false}, this.tabs);
         },
         
         _setup: function() {
           this.inherited(arguments);
           this.createTabs(this.tabs);
         },
         
         _changeTab: function(tab){
            this._position();
            this.onTabChange(tab);
         },
         
         onTabChange: function(tab){},
         
         save: function(e){ dojo.stopEvent(e); this.onSave(); },
         
         onSave: function(){}
      });
})();
