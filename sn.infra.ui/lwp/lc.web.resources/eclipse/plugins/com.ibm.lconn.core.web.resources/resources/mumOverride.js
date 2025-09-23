/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.mumOverride");

dojo.require("com.ibm.mm.enabler.iw"); // Core MM implementation
dojo.require("com.ibm.mm.enabler.services.ConfigService"); // Default values
                                                            // for MM config
// dojo.//require("com.ibm.mm.enabler.debug"); // Debug behavior for MM,
// disabled for now
dojo.require("com.ibm.mm.livetext.serviceImpl"); // General page processing
dojo.require("com.ibm.mm.livetext.widgets"); // Livetext support for iwidgets
dojo.require("lconn.core.dynamiciwidget");

// FIXME: more elegant way to configure this?
var url = dojo.getObject("ibmConfig.proxyURL");
if (url) {
   // if (url.charAt(0) == '/')
   // url = window.location.protocol + "//" + window.location.host + url;
   (dojo.getObject("ibmConfig") || {})['com.ibm.mashups.proxy.url'] = url.replace(/\/$/, '');
}

com.ibm.mm.enabler.iw.InternalPersistentAttributesToPreferenceModelAdapter.prototype.save = function(callbackfn) {
   if (this.serverless)
      this._saveMicroformat();
   else
      return null;

   this.reload();

   var newCallbackfn = null;
   if (callbackfn) {
      newCallbackfn = function(attributeName, status) {
         if (callbackfn)
            callbackfn(attributeName, status);
      }
   }
   lconn.core.mumOverride.saveAttributes(this.widget, this.microformatItems, newCallbackfn);
   return (this);
};

com.ibm.mm.enabler.iw.iContextImpl.prototype.getUserProfile = function() {
   var userProfile = new com.ibm.mm.enabler.iw.ManagedItemSetImpl();
   if (window.widgetUserInfo != null) {
      userProfile.setUserInfo(widgetUserInfo);
   }
   else if (WidgetPlacementConfig.userInfoXML == null) {
      var dojoLoadCallback = function(res, ioArgs) {
         WidgetPlacementConfig.userInfoXML = res;
         userProfile.setXmlDoc(res);
      };

      var ioArgs = {
         url : WidgetPlacementConfig.userInfoUrl,
         handleAs : "xml",
         load : dojoLoadCallback,
         sync : true,
         error : lconn.core.errorhandling.DefaultXHRErrorHandler
      };
      dojo.xhrGet(ioArgs);
   }
   else
      userProfile.setXmlDoc(WidgetPlacementConfig.userInfoXML);

   return userProfile;
};

dojo.declare("com.ibm.mm.enabler.iw.ManagedItemSetImpl", com.ibm.mm.enabler.iw.ManagedItemSet, {
   constructor : function() {},
   getItemValue : function(itemName) {
      if (this.widgetUserInfo != null)
         return this.widgetUserInfo[itemName];
      else if (this.xmlDoc != null)
         return this.xmlDoc.documentElement.getAttribute(itemName);
      else
         return null;
   },

   setXmlDoc : function(xmlDoc) {
      this.xmlDoc = xmlDoc;
   },

   setUserInfo : function(widgetUserInfo) {
      this.widgetUserInfo = widgetUserInfo;
   }
});

com.ibm.mm.enabler.iWidgetWrapperDefaultImpl.prototype.update = function() {
   this._initialize();

   // Defect 74032 - microformat attributes can break finding the content div
   // try to use mm_content class to more reliably find it
   var contentDiv;

   var mmContentList = dojo.query('div.mm_content', this.rootElement);
   if (mmContentList.length > 0) {
      contentDiv = mmContentList[0];
   }
   else {
      contentDiv = this.rootElement.lastChild;
   }

   this._updateMarkup(this.currentMode, contentDiv);

   this._loadWidgetSharedResource();
   this._createiScope();
   // contentDiv = this.rootElement?
   this._evalScripts(contentDiv);
   this.windowManager[this.currentMode] = {
      id : this.currentMode,
      root : contentDiv,
      active : true,
      external : false
   };
}

com.ibm.mm.enabler.iWidgetWrapperDefaultImpl.prototype.handleEvent = function(eventName, iEvent) {
   if (typeof eventName == "undefined" || eventName == null)
      return false;
   // handle onModeChanged event
   if (eventName == com.ibm.mm.enabler.iw.iEvents.Constants.onModeChanged) {
      if (WidgetPlacementConfig.isTabbedFullPageWidgetRendering)
         handleModeExit();
      else {
         if (iEvent.payload != null && iEvent.payload.indexOf("fullpage") != -1) {
            // lconn.core.WidgetPlacement.loadFullpageView(this.id,null,true,
            // true);
            changeHash("fullpageWidgetId=" + this.id);
         }

         return this._handleModeChange(iEvent);
      }
   }
   if (eventName == "onNewWire") {
      return this._handleNewWire(iEvent);
   }
   if (eventName == "onRemoveWire") {
      return this._handleRemoveWire(iEvent);
   }
   return this._handleEventInternal(eventName, iEvent);
}

com.ibm.mm.enabler.iWidgetWrapperDefaultImpl.prototype._handleInlineMessage = function(type, message, details) {
   var nodes = [];
   com.ibm.mm.enabler.iw.utils.findElementByAttribute("class", this.ns + "content", this.rootElement, nodes, false);
   var aNode = nodes[0];
   if (aNode != null) {
      aNode.innerHTML = "";
      aNode.style.padding = "5px";
      lconn.core.errorhandling.DefaultErrorHandler(message, details, {
         htmlContainerElemId : aNode
      });
      // com.ibm.mm.enabler.debug.logInlineMessage(aNode,type,message,details);
   }
}

// overriden to add expectedContentType arg
com.ibm.mm.enabler.iw.services.widgetLoadService.prototype.getWidgetXML = function(widgetUrl, widgetId) {
   // summary: Retrieves the WidgetInfo for the given widget url.
   // widgetUrl: a widget URL, should come directly from the microformat or from
   // alias
   com.ibm.mm.enabler.debug.entry("widgetLoadService.getWidgetXML", "widgetUrl:" + widgetUrl + " widgetId:" + widgetId);
   this.widgetId = widgetId;
   var me = this;
   var contentUrl = widgetUrl;
   if (contentUrl.indexOf("http") === 0) {
      contentUrl = com.ibm.mm.enabler.utilities.rewriteURL(contentUrl);
   }
   var args = {
      url : contentUrl,
      load : function(data, ioArgs) {
         me.handleLoad(data, ioArgs.xhr);
      },
      error : function(data, ioArgs) {
         com.ibm.mm.enabler.debug.error("widgetLoadService.getWidgetXML", "Error widgetLoadService.getWidgetXML error loading!" + data);
         var args = [];
         args.push("error");
         var iwMessages = dojo.i18n.getLocalization("com.ibm.mm.enabler", "iwMessages");
         args.push(dojo.string.substitute(iwMessages.E_IWIDGETDEF_NOTAVAILABLE_1, [ contentUrl
         ]));
         args.push(data.message);
         dojo.publish("/enabler/inlineMessage/" + me.widgetId, args);
      },
      handleAs : "text", // tells framework this is an text document
      expectedContentType : "xml" // tells com.ibm.ajax.auth that xml is
                                    // expected
   };
   dojo.xhrGet(args);
}

// do not load compressed file from descriptors
lconn.core.mumOverride.registerLoadedResource = function(srcAndID) {
   var res = {};
   res[iwConstants.RESOURCE.src] = srcAndID;
   serviceManager.getService("loadService").modules[srcAndID] = res;
};

lconn.core.mumOverride.destroyWidget = function(widgetInstanceId) {
   eval('if(window._' + widgetInstanceId + '_iContext != null && _' + widgetInstanceId + '_iContext.iScope().onDestroyWidget != null) _' + widgetInstanceId
         + '_iContext.iScope().onDestroyWidget();');
   serviceManager.getService("eventService").publishEvent("/enabler/unloadWidget", [ widgetInstanceId
   ]);
   window["_" + widgetInstanceId + "_iContext"] = null;
}

lconn.core.mumOverride.renderSingleWidget = function(domNodeId) {
   if (lconn.core.WidgetPlacement.URLChangeCallBack == null) {
      lconn.core.WidgetPlacement.URLChangeCallBack = [ lconn.core.WidgetPlacement.URLChange
      ];
      registerBackButtonSupport();
   }

   var domNode = dojo.byId(domNodeId);
   if (domNode != null) {

      var iWidget = iWidgetContainer.createWidget(domNode);
      if (iWidget)
         iWidgetContainer.renderWidget(iWidget);
      /**
       * enabler 2.5 var widgetModel =
       * com.ibm.mashups.iwidget.model.Factory.getGlobalWidgetModel(); var
       * myWidget = widgetModel.createWidget(domNode); if (myWidget)
       * myWidget.doRender(); else console.log("renderSingleWidget: unable to
       * create iWidget");
       */
   }
};

lconn.core.mumOverride.saveAttributes = function(widget, objectArray, callbackfn) {
   var widgetId = widget.id;

   if (widget.iScope.iContext.getUserProfile().getItemValue("canPersonalize") == "true") {
      var xmlContent = "";

      // getting the admin attributes for comparing
      var attributesMap = [];
      var exp4 = "/tns:widgets/tns:layout/tns:page/tns:widgetInstance[@instanceId = '" + widgetId + "']";
      var widgetInstanceNode = lconn.core.xpath.selectSingleNode(exp4, WidgetPlacementConfig.widgetConfigXMLDocument);
      var defIdRef = null;
      if (widgetInstanceNode != null)
         defIdRef = widgetInstanceNode.getAttribute("defIdRef");
      else
         defIdRef = instanceId;
      // var exp5 = "/tns:widgets/tns:definitions/tns:widgetDef[@defId =
      // '"+defIdRef+"']/tns:itemSet/tns:item";
      var exp5 = "/tns:widgets/tns:layout/tns:page/tns:widgetInstance[@instanceId = '" + widgetId + "']/tns:itemSet/tns:item";
      var nodes = lconn.core.xpath.selectNodes(exp5, WidgetPlacementConfig.widgetConfigXMLDocument);
      for (var i = 0; nodes.length != null && i < nodes.length; i++) {
         var name = nodes[i].getAttribute("name");
         var arrItem = objectArray[name];
         var value = nodes[i].getAttribute("value");
         value = lconn.core.i18nOverrider.replaceParams(value, WidgetPlacementConfig.params);
         attributesMap.push({
            entryName : nodes[i].getAttribute("name"),
            entryValue : value
         });
         if (arrItem != null && name != "resourceId" && name != "resourceType")
            nodes[i].setAttribute("value", arrItem.value);

      }

      for (name in objectArray) {
         var arrayItem = objectArray[name];
         var shouldBeStore = true;
         // checking if its an admin attribute that has not been overwritten by
         // the widget instance
         /*
          * for (var i=0; attributesMap.length != null && i<attributesMap.length;
          * i++) { var attribute = attributesMap[i]; if((name ==
          * attribute.entryName && arrayItem.value == attribute.entryValue) ||
          * (name == "resourceId" || name == "resourceType")) { shouldBeStore =
          * false; break; } }
          */

         if (shouldBeStore)
            xmlContent += name + '=_=' + arrayItem.value + ',_,';
      }
      if (WidgetPlacementConfig.debug)
         console.log("lconn.core.mumOverride.saveAttributes: putContent: " + xmlContent);

      var url = WidgetPlacementConfig.applicationContext + "/saveWidgetPreferences.do?resourceId=" + WidgetPlacementConfig.resourceId;
      url += "&widgetInstanceId=" + widgetId;
      // alert(xmlContent);

      var timestamp = new Date().getTime();
      WidgetPlacementConfig.lastMod = timestamp + "saveAttributes";

      lconn.core.mumOverride.saveAttributes.callback = callbackfn;

      var temp3 = function() {
         WidgetPlacementConfig.widgetConfigXMLDocument = null;

         var temp = function(response, ioArgs) {
            WidgetPlacementConfig.widgetConfigXMLDocument = response;
            lconn.core.WidgetPlacement.refreshTitleAndMicroformat(widgetId, response, objectArray);
            if (lconn.core.mumOverride.saveAttributes.callback != null)
               lconn.core.mumOverride.saveAttributes.callback("attributes", true);
         };

         var tempErrHandler = function(response, ioArgs) {
            if (lconn.core.mumOverride.saveAttributes.callback != null)
               lconn.core.mumOverride.saveAttributes.callback("attributes", false);
            lconn.core.errorhandling.DefaultXHRErrorHandler(response, ioArgs);
         };

         dojo.xhrGet({
            url : WidgetPlacementConfig.layoutInfoUrl + "&lastMod=" + WidgetPlacementConfig.lastMod,
            error : tempErrHandler,
            handleAs : "xml",
            sync : true,
            load : temp
         });
      };

      dojo.xhrPut({
         url : url,
         headers : {
            'X-Update-Nonce' : window.dangerousurlnonce
         },
         putData : xmlContent,
         load : temp3,
         error : lconn.core.errorhandling.DefaultXHRErrorHandler,
         sync : true
      });
   }
   else
      throw new Error("user cannot edit preferences");
};
