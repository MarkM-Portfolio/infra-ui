/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw.iContextImpl");

dojo.require("com.ibm.mm.enabler.iw.ItemSet");
dojo.require("com.ibm.mm.enabler.iw.utils");
dojo.require("com.ibm.mm.enabler.iw.event");
dojo.require("com.ibm.mm.enabler.iw.io");
dojo.require("com.ibm.mm.enabler.iw.iContext");

dojo.declare("com.ibm.mm.enabler.iw.iContextImpl", com.ibm.mm.enabler.iw.iContext, {

    constructor:function (id) {
    //information accessible from iwidget 
        this.widgetId =id; 
        this.scope =  {};
        this.iEvents = new com.ibm.mm.enabler.iw.iEventsImpl(this.widgetId);
        this.io = new com.ibm.mm.enabler.iw.io(this.widgetId);

        //todo: root is associated with mode
        this.rootElement = document.getElementById(id);
        this.ns = this.rootElement.className.substr(0,3);  
        this._mm = new com.ibm.mm.enabler.iw.iContextImpl.mmExtension(this.widgetId);  
    },
    getRootElement:function(){
        //summary: returns the root element of the iWidget such that iWidget can easily do things such as
        // searching its own markup. RootElement can also be a convenient place to place items which iWidget wishes
        // to access later.
        return this.rootElement;
    },
    getElementById: function(/*String*/id,root){
         com.ibm.mm.enabler.debug.entry("iContext.getElementById ","id:"+id+" root:"+root);

         //summary: this method provides the same semantics as the DOM method by the same name with the distinction that
         //  this method will restrict the search to the iWidget's markup rather than entire page
          if (!root) {
             root = this._getContentRoot();
         }
         var element=[];
         var rc = com.ibm.mm.enabler.iw.utils.findElementByAttribute("id",id,root,element,false);
         com.ibm.mm.enabler.debug.log("iContext.getElementById", "found:"+rc);

         if (rc) {
             return element[0];
         }
         else
             return null;
    },
    getiWidgetAttributes: function(){
        //Summary: returns an ManagedItemSet which provides access to the iWidget's customization attributes. 
        //          The returned ManagedItemSet will be the same as getItemSet(iContext.constants.itemset.ATTRIBUTES).
        //          returns empty set if there's no ItemSet.
        var widget = iWidgetContainer.getWidgetById(this.widgetId);
        var attrs = widget.getWidgetAttributes();
        return attrs;
    },  
     getItemSet:function(/*String*/ name){
        com.ibm.mm.enabler.debug.entry("iContext.getItemSet","name:"+name);
        if (typeof name == "undefined" || name == null) return null;
        if (name == iwConstants.ATTRIBUTES) return this.getiWidgetAttributes();
        if (name == iwConstants.USERPROFILE) return this.getUserProfile();
        if (name == iwConstants.IDESCRIPTOR) return this.getiDescriptor(); 
         

        var widget  = iWidgetContainer.getWidgetById(this.widgetId);
        var itemSet = widget.getWidgetItemSet(name);
        if (typeof itemSet == 'undefined' || itemSet == null) {
            itemSet = new com.ibm.mm.enabler.iw.DefaultItemSetImpl();
        }
        com.ibm.mm.enabler.debug.exit("iContext.getItemSet","object:"+itemSet);

        return itemSet;
    },
    requires: function(/*String*/ requiredItem,/*String*/version,/*String*/uri,/*function*/cb,mimeType){
         //Summery: provides means for iWidget to declare dependency on set of non-required items:
         //         "io"...
         //         no uri should be specified for above
         // shared resources can be loaded just once for all iwidgets like dojo.js
         // version support?
         // support dynamic loads in asynchronous manner
         if (typeof mimeType == "undefined" || mimeType == null){
             mimeType = "text/plain";
         }
         if (typeof uri != "undefined" && uri != null){
               serviceManager.getService("loadService").loadResource(this.widgetId,requiredItem,uri,cb,mimeType);
         } 
    },
    iScope:function(){
          return this.scope;
    },
    processMarkup:function(/*string*/markup){
         //return null upon failure
         var oldMarkup = markup.replace(/_IWID_/g,"_"+this.widgetId+"_");
         var finalMarkup = oldMarkup.replace(/iContext(?=\.|\s|\(|\))/g,"_"+this.widgetId+"_iContext");
        return finalMarkup;  
    },
    processiWidgets:function(/*domnode*/root){
         dojo.publish("/com/ibm/mashups/livetext/livetextchanged",[root,true]);
    },
    getElementByClass:function(classname,root){
         if (!root) {
            root = this._getContentRoot();
        }

        //todo: use dojo.query
        var element=[];
        var rc = com.ibm.mm.enabler.iw.utils.findElementByAttribute("class",classname,root,element,true);
        com.ibm.mm.enabler.debug.log("iContext.getElementByClass", "found:"+rc);

        if (rc) {
            return element;
        }
        else
            return null;   
    },
    _getWidgetBaseUri: function(){
         var widget = iWidgetContainer.getWidgetById(this.widgetId);
         var widgetBaseUri = widget.getWidgetInstance().widgetXMLUrl;
         return widgetBaseUri.substring(0,widgetBaseUri.lastIndexOf("/")+1);
    },    
    _getContentRoot:function(){
         var contentRoot = this.rootElement;
         var widget = iWidgetContainer.getWidgetById(this.widgetId);
         if (widget) {
             var currentMode = widget.currentMode;
         }
         if (!currentMode) {
             currentMode = "view";
         } 
         var currentWindow = widget.windowManager[currentMode];
         if (typeof currentWindow != "undefined" && currentWindow != null) {
             var temp = currentWindow.root;
             if (typeof temp != "undefined" || temp != null) contentRoot = temp;
         }
         com.ibm.mm.enabler.debug.exit("iContext._getContentRoot", contentRoot);
         return contentRoot;
    },
    getUserProfile:function(){
         var userModel = com.ibm.mashups.enabler.model.Factory.getUserModel();
         var user = userModel.findCurrentUser();
         var userProfile = null;
         if (typeof user != "undefined" && user != null) {
            userProfile = new com.ibm.mm.enabler.iw.UserProfile(this.widgetId,user);
         }                                                             
         return userProfile;
    },
    getiDescriptor:function(){
        var widget = iWidgetContainer.getWidgetById(this.widgetId);
        var iDescriptor= widget.getIDescriptor();
        return iDescriptor;
    }
});    

dojo.declare("com.ibm.mm.enabler.iw.iContextImpl.mmExtension", null, {

    constructor:function (id) {
    //information accessible from iwidget 
        this.widgetId =id; 
    },
    getSupportedModes:function(){
          var widget = iWidgetContainer.getWidgetById(this.widgetId);
          var supportedModes = widget.widgetDef.getSupportedModes();
          return supportedModes;            
    },
    getPayloadDef:function(name){
        if (typeof this.widget == "undefined" || this.widget == null)
        {
            this.widget = iWidgetContainer.getWidgetById(this.widgetId);
        }
        var payloadDefs = this.widget.widgetDef.payloadDefs;    
        var payloadDef = payloadDefs[name];
        if (typeof payloadDef == "undefined") return null;
        return payloadDef;          
    },
    getPayloadDefNames:function(){
        if (typeof this.widget == "undefined" || this.widget == null)
                   this.widget = iWidgetContainer.getWidgetById(this.widgetId);
         var payloadDefs = this.widget.widgetDef.payloadDefs;                       
         var arr = [];
         var a;
         for (a in payloadDefs){
                      arr.push(a);                      
         }
         return arr;
    }
});
