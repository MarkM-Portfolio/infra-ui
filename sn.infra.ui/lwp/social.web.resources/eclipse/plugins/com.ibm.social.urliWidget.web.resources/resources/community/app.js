/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/dom",
        "dojo/dom-attr",
        "dojo/dom-construct",
        "dojo/query",
        "dojo/dom-style",
        "dojo/_base/url",
        "dojo/_base/lang",
        "dojo/on",
        "dojo/has",
        "dojo/_base/sniff",
        "ic-extension-box/community/view"
], function(dj, djDeclare, djDom, djDomAttr, djDomConstruct, djDomQuery, djDomStyle, djUrl, djLang, djOn, djHas, djSniff, View) {
   
   return djDeclare(null, {
      
      _view: null,
      
      constructor: function(iwContext, rootDom, opt) {
         this._iwContext = iwContext;
         this._rootDom = rootDom;
         this.editCommunity = false;
         
         this._config = {
            clientId: opt.clientId,
            linkType: opt.linkType || "shared",
            multiselect: opt.multiselect || "false"
         };
         
         if (djHas("ie") || djHas("trident")) {
            this._config.domain = "https://box.com";
         }
      },
      
      getContext: function() {
         return this._iwContext;
      },
      
      startup: function() {
         if(!this._view) {
            this._view = new View({app: this});
         }

         this._view.buildRendering();
      }, 
      
      resize: function(dim) {
         console.debug("app.resize + dim = " + dim);
         
         if (dim && dim.height) {
            djDomStyle.set(this._rootDom, "height", dim.height);
         }
      },
      
      onEditDone: function(){
         // FIXME should postMessage to SingleIframeWidget. From there, change window's locatio. 
         UWidget.switchMode("view");
      },
        
      setWidgetHeight: function(key, value) {
          UWidget.setStyle(key, value);
      },  
      
      chooseFolder: function() {
        this._onChooseFolder(arguments);
        
        if("overview" == this._iwContext.container.scene) {
           UWidget.switchMode("view");
         }
      },
       
      _onChooseFolder: function() {
         var boxSelect = new BoxSelect(this._config);
         
         // Register a success callback handler
         var that = this;
         
         boxSelect.success(function(response) {
            if(response[0].type != "folder") {
               that._view.renderFileNotSupportMessage();
               return;
            }
            var attributes = [{"key":"widgetTitle", "value":response[0].name},{"key":"contentName", "value":response[0].name},{"key":"contentURL", "value":response[0].url}];
                        
            UWidget.setAttributes(JSON.stringify(attributes), function(value) {
               var items = JSON.parse(value);
               var item = {};
               for (var i = 0; i < items.length; i++) {
                  item = items[i]; 
                  that._iwContext.widgetAttributes[item.key] = item.value;
               }   
               that._view.buildRendering();   
             }, that);
            
         });

         // Register a cancel callback handler
         boxSelect.cancel(function() {
            boxSelect.closePopup();
         });
         
         boxSelect.launchPopup();
      },

      convertUrlToEmbedUrl: function(directUrl) {
         var uri = new djUrl(directUrl);
         
         var ret = uri.scheme + "://";
         ret = ret + (this._iwContext.widgetAttributes["embedHostname"] || (uri.host || "app.box.com"));
         ret = ret + (this._iwContext.widgetAttributes["embedContextRoot"] || "/embed") + uri.path;
         ret = ret + "?showParentPath=false";
         ret = ret + "&partner_id=314";
         
         var theme = this._iwContext.widgetAttributes["embedTheme"] || "gray";
         ret = ret + "&theme=" + theme;
         
         if (uri.query)
            ret = ret + "&" + uri.query;
         
         if (uri.fragment)
            ret = ret + "#" + uri.fragment;
         
         return ret;
      }
   });
});
