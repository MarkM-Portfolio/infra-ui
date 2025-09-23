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

dojo.provide("lconn.urlwidget.widget.SingleIframeWidgetImpl");

dojo.require("lconn.urlwidget.util.event");
dojo.require("lconn.core.theme");
dojo.requireLocalization("lconn.urlwidget", "urlWidget");


/**
 * Widget that use single iframe in the whole widget lifecycle.
 */
dojo.extend(lconn.urlwidget.widget.SingleIframeWidget, {
   _iframe: null,
   _channel: null,
   _windowResizeListener: null,
   _communityAppTitle: "",
   
   onLoad: function() {    
      this.nls = dojo.i18n.getLocalization("lconn.urlwidget", "urlWidget");
      
      this._init();
   },

   onView: function() {
      var url = this.getAttribute("url");
      var iframe = this._setupIFrame(this._normalizeUrl(url), this.iContext.getRootElement());
      if (iframe.reused) {
         var event = new lconn.urlwidget.util.event();
         event.setEventType("widgetevent");
         event.setEventKey("onview");
         this._channel.sendEvent(event, iframe.contentWindow);
      }
   },
   
 

   onFullpage: function() {
      dojo.addClass(dojo.body(), "lconnSingleIframeWidgetFullpage");
      
      window.scrollTo(0,0); 
      
      var LeftNaviationLayout = JSON.parse(this.getAttribute("LeftNaviationLayout"));
      var TabbedNavigationLayout = JSON.parse(this.getAttribute("TabbedNavigationLayout"));
      if(!document.getElementById("tabNavBar")){
         if(LeftNaviationLayout.communityActions === "none"){
            this._hideCommunityActions(true);
         }
      }
      else {
         if(TabbedNavigationLayout.leftPane === "none"){
            dojo.addClass(dojo.body(), "fullpageWidgetWithNoLeftPane");
         }
      }
      
     var url = this.getAttribute("fullpageUrl");
     if (!url)
        url = this.getAttribute("url");
     
     var iframe = this._setupIFrame(this._normalizeUrl(url), this.iContext.getRootElement());
     this._onWindowResize([], true);

     var that = this;
     if (iframe.reused) {
        var event = new lconn.urlwidget.util.event();
        event.setEventType("widgetevent");
        event.setEventKey("onfullpage");
        event.setEventValue({"height": iframe.height});
        that._channel.sendEvent(event, iframe.contentWindow);
     }
  },
  
   onEdit: function() {
      var url = this.getAttribute("editUrl");
      if (!url)
         url = this.getAttribute("url");
      
      var keepWarn = this.getAttribute("edit_saveBeforeLeave") || false;
      if ("editpage" == this._getContainerScene() && !keepWarn) {
         var node = dojo.byId("editWarningMessage");
         if (node)
            dojo.style(node, "display", "none");
      }
      
      var iframe = this._setupIFrame(this._normalizeUrl(url), this.iContext.getRootElement());
      if (iframe.reused) {
         var event = new lconn.urlwidget.util.event();
         event.setEventType("widgetevent");
         event.setEventKey("onedit");
         this._channel.sendEvent(event, iframe.contentWindow);
      }
   },
  
   onSearch: function() {
      var url = this.getAttribute("searchUrl");
      if (!url)
         url = this.getAttribute("url");

      var iframe = this._setupIFrame(this._normalizeUrl(url), this.iContext.getRootElement());
      if (iframe.reused) {
         var event = new lconn.urlwidget.util.event();
         event.setEventType("widgetevent");
         event.setEventKey("onsearch");
         this._channel.sendEvent(event, iframe.contentWindow);
      }
   },
   
   onUnload: function() {

      if ("fullpage" == this.iContext._mode) {
         dojo.removeClass(dojo.body(), "lconnSingleIframeWidgetFullpage");
         
         var LeftNaviationLayout = JSON.parse(this.getAttribute("LeftNaviationLayout"));
         var TabbedNavigationLayout = JSON.parse(this.getAttribute("TabbedNavigationLayout"));
         if(!document.getElementById("tabNavBar")){
            if(LeftNaviationLayout.communityActions === "none"){
               this._hideCommunityActions(false);
            }
         }
         else {
            if(TabbedNavigationLayout.leftPane === "none"){
               dojo.removeClass(dojo.body(), "fullpageWidgetWithNoLeftPane");
            }
         }
      }
      
      if (this._windowResizeListener) {
         dojo.disconnect(this._windowResizeListener);
         this._windowResizeListener = null;
      }
      
     this.inherited(arguments); 
   },

   getAttribute: function(attr) {
      var ictx = this._getIContext(this.iContext.getWidgetId());
      var attributesItemSet = ictx.getiWidgetAttributes();
      return(attributesItemSet.getItemValue(attr));
   },
   
   _disablePageVerticalScrollbar: function(disable) {
      dojo.style(dojo.body(), "overflow-y", disable ? "hidden" : "auto");
   },
   
   _getCommunityNameNode: function() {
      var parentNode = dojo.byId("lotusTitleBar"); 

      if (!parentNode)
         return null;
      
      var nodes = dojo.query(".lotusText a", parentNode); 
      
      return nodes ? nodes[0] : null;
   },
   
   _getContainer:function(){
      var type = this._getContainerType();
      var scene = this._getContainerScene();
      var url  = this._getContainerUrl();
      
      return {
         type: type,
         scene: scene,
         url: url
      };
   },
   
   _getContainerScene:function() {
      var ictx = this._getIContext(this.iContext.getWidgetId());
      
      if ("fullpage" == ictx._mode)
         return "fullpage";
      
      var node = dojo.byId("editCommunityForm");
      if (node)
         return "editpage";
      
      return "overview";
   },
   
   _getContainerType:function() {
      return this.getAttribute("resourceType");
   },
   
   _getContainerUrl:function(){
      return this._communityAppUrl + '/service/html/communitystart?communityUuid=' + this.getAttribute("resourceId");
   },
   
   _getContentNode: function() {
      return lotusContent = dojo.byId("lotusContent");
    },
    
   _getIContext: function(widgetId) {
      var ctxname = '_' + widgetId + '_iContext';
      return window[ctxname];
   }, 
   
   _getIFrameId: function() {
      return "ifr_" + this.iContext.getWidgetId();
   },

   _getMaxHeightOfContent: function() {
      var contentNode = this._getContentNode();
      var pos = dojo.position(contentNode, true);
      var winSize = dojo.window.getBox();
      
      var ret = winSize.h - pos.y;
      
      console.debug("Height of content node is " + pos.y + ", height of window is " + winSize.h + ", _getMaxHeightOfContent() returns " + ret);
      
      return ret > 10 ? ret : 10;
   },
    
   _getUser: function() {
      return widgetUserInfo;
   },

   _handleEvent: function(event, sourceWindow, dispatcher) {
      if (this._getIFrameId() != sourceWindow.frameElement.id) {
         // This event is from a different widget instance. 
         return;
      }
         
      var type = event.getEventType();
      var key = event.getEventKey();
      var value = event.getEventValue();
      var ictx = this._getIContext(this.iContext.getWidgetId());
      
      if(type == "setAttribute") { 
         var attributesItemSet = ictx.getiWidgetAttributes();
         attributesItemSet.setItemValue(key, value);
         attributesItemSet.commit();
         
         // Update tab of the widget in community edit page to make the change immediately. Otherwise, user have to refresh page to see the change.
         // Ideally this should be done by Communities. Once Communities can do this, this code will be removed. 
         
         if ("widgetTitle" == key) {
            this._updateWidgetTab(value);
         }
         
         if (event.getCallback()) {
            var msg = new lconn.urlwidget.util.event();
            msg.setEventType("callback");
            msg.setEventKey("setAttribute");
            msg.setEventValue(value);
            msg.setCallback(event.getCallback());
            dispatcher.sendEvent(msg, sourceWindow);      
         }
      }
      else if(type == "changeMode") { 
          ictx.iEvents.fireEvent("onModeChanged", "", "{'newMode': '" + key + "'}");
          
          if (event.getCallback()) {
             var msg = new lconn.urlwidget.util.event();
             msg.setEventType("callback");
             msg.setEventKey("changeMode");
             msg.setEventValue(key);
             msg.setCallback(event.getCallback());
             dispatcher.sendEvent(msg, sourceWindow);      
          }
       }
      else if(type == "getAttribute") {
         var value = this.getAttribute(key);
 
         if (event.getCallback()) {
            var msg = new lconn.urlwidget.util.event();
            msg.setEventType("callback");
            msg.setEventKey("getAttribute");
            msg.setEventValue(value);
            msg.setCallback(event.getCallback());
            dispatcher.sendEvent(msg, sourceWindow);      
         }
      }
      else if (type == "getContext") {
         var user = this._getUser();
         var context = {"user": user};
         context.widgetId = ictx.getWidgetId();
         context.mode = ictx._mode;
         context.widgetTheme = ictx.getTheme();
         
         var attributesItemSet = ictx.getiWidgetAttributes();
         context.widgetAttributes = {};
         dojo.forEach(attributesItemSet.getAllNames(), function(key) {
            context.widgetAttributes[key] = attributesItemSet.getItemValue(key);
         });
         
         if ("fullpage" == context.mode) {
            context.widgetMaxHeight = this._getMaxHeightOfContent() + "px";
         }
         
         context.container= this._getContainer();
         var msg = new lconn.urlwidget.util.event();
         msg.setEventType("callback");
         msg.setEventKey("getContext");
         msg.setEventValue(context);
         msg.setCallback(event.getCallback());
         dispatcher.sendEvent(msg, sourceWindow);        
      }
      else if (type == "setStyle") { 
         if("height" == key){
            var iframe = dojo.byId(this._iframe.id);
            if (iframe)
               iframe.height = value;
         }      
      }
      else if (type == "setAttributes") { 
         var items = JSON.parse(value);
         var item = {};
         for (var i = 0; i < items.length; i++) {
            item = items[i];
            var itemKey = item.key;
            var itemValue = item.value; 
            var attributesItemSet = ictx.getiWidgetAttributes();
            attributesItemSet.setItemValue(itemKey, itemValue);
            attributesItemSet.commit();
            if ("widgetTitle" == itemKey) {
               this._updateWidgetTab(itemValue);
            }
         }   
         if (event.getCallback()) {
            var msg = new lconn.urlwidget.util.event();
            msg.setEventType("callback");
            msg.setEventKey("setAttributes");
            msg.setEventValue(value);
            msg.setCallback(event.getCallback());
            dispatcher.sendEvent(msg, sourceWindow);      
         }            
      }
      
      else {
         console.warn("[SingleIframeWidgetImpl] Unknown type of event: " + type);
      }
   },
   
   _hideCommunityActions: function(hide) {
      var node = dojo.byId("lotusTitleBar"); 
      
      if (hide) {
         var refNode = dojo.byId("lotusColLeft"); 
         if (node && refNode) {
            dojo.place(node, refNode, "first");
            
            var nameNode = this._getCommunityNameNode();
            var communityName = this.getAttribute("resourceName");
            var communityId = this.getAttribute("resourceId");
            if (communityName && nameNode) {
               nameNode.innerHTML = communityName;
               dojo.attr(nameNode, "href", this._communityAppUrl + "/service/html/communitystart?communityUuid=" + communityId);
               dojo.attr(nameNode, "title", communityName);
            }
         }
      }
      else {
         var refNode = dojo.byId("lotusBanner"); 
         if (node && refNode) {
            dojo.place(node, refNode, "after");
            
            var nameNode = this._getCommunityNameNode();
            if (nameNode) {
               nameNode.innerHTML = this._communityAppTitle;
               dojo.attr(nameNode, "href", this._communityAppUrl);
               dojo.removeAttr(nameNode, "title");
            }
         }
      }
    },
   
   _init: function() {         
      if (this._isHtml5()) {
         if (!dojo.exists("iContext.getRootElement", this)) {
            console.warn("Can not properly initialize because iContext.getRootElement doesn't exist.");
            return;
         }
         
         this._setupIFrame("about:blank", this.iContext.getRootElement());

         if(this._channel == null)
            this._channel = new lconn.urlwidget.util.channel(this._iframe, dojo.hitch(this, "_handleEvent"));  
         
         if (!this._windowResizeListener)
            this._windowResizeListener = dojo.connect(window, "resize", dojo.hitch(this, "_onWindowResize"));
         
         // Get community app title
         var node = dojo.byId("lotusTitleBar"); 
         if (node) {
            var nameNode = this._getCommunityNameNode();
            if (nameNode) {
               this._communityAppTitle = nameNode.innerHTML;
               this._communityAppUrl = dojo.attr(nameNode, "href");
            }
         }
      } 
      else {
         // FIXME this is not necessary to show this warning by posting message. 
         this._sendError(this.nls.ERROR_MSG_HTML5_SUPPORT);
         console.warn("Non-html5 based browser");
      }
   },
       
   /*
    * checks to see if HTML5 is supported.
    */
   _isHtml5: function() {
      var res = false;
      var cvs = document.createElement('canvas');

      if (cvs.getContext === undefined) {
         res = false;
      } else {
         res = true;
      }
      return res;
   },
    
   _normalizeUrl: function(url) {
      if (!url)
         return url;
      
      var uri = new dojo._Url(url);  //  directUrl.replace("ibm.b5x.com", "app.box.com/embed_widget");
      
      var ret = uri.scheme + "://" + uri.host;
      
      if (uri.port)
         ret = ret + ":" + uri.port;
      
      ret = ret + uri.path;

      var query = "render=html-template";
      if (window.debugDojo) {
         query = query + (query.length > 0 ? "&" : "") + "debug=dojo"; 
      }
      else if (window.debugMode) {
         query = query + (query.length > 0 ? "&" : "") + "debug=true"; 
      }
      
      if (dojo.exists("lconn.core.locale")) {
         var value = lconn.core.locale.getLanguage();
         if (value)
            query = query + (query.length > 0 ? "&" : "") + "lang=" + value; 

         var value = lconn.core.locale.getCountry();
         if (value)
            query = query + (query.length > 0 ? "&" : "") + "country=" + value; 
      }
      
      var themeId = lconn.core.theme.getCurrentThemeId();
      if (themeId && themeId.length > 0)
         query = query + (query.length > 0 ? "&" : "") + "theme=" + themeId; 
      
      if (uri.query)
         query = query + (query.length > 0 ? "&" : "") + uri.query; 
   
      if (query.length > 0)
         ret = ret + "?" + query;
      
      if (uri.fragment && uri.fragment.length > 0)
         ret = ret + "#" + uri.fragment;
      
      return ret;
   },
       
   _onWindowResize: function(evt, notFireEvent) {
      var ictx = this._getIContext(this.iContext.getWidgetId());
      if (!ictx)
         return;
      
      console.debug("_onWindowResize triggered, curent mode is " + ictx._mode);
      if ("fullpage" == ictx._mode) {
         this._disablePageVerticalScrollbar(true);
         var newHeight = this._getMaxHeightOfContent() + "px";
         
         if (this._iframe.height != newHeight && !notFireEvent && this._channel) {
            var event = new lconn.urlwidget.util.event();
            event.setEventType("widgetevent");
            event.setEventKey("onresize");
            event.setEventValue({"height": newHeight});
            this._channel.sendEvent(event, this._iframe.contentWindow);
         }
         
         this._iframe.height = newHeight;
         
      }
      else {
         this._disablePageVerticalScrollbar(false);
      }
      
   },

   _sendError: function(msg) {
      var errorDesc = msg === undefined ? this.nls.ERROR_MSG : msg;
      
      // Present Forbidden Error
      this.iContext.getElementById('fatalError').style.display = "";
      this.iContext.getElementById('fatalError').style.display = "inline";
      this.iContext.getElementById('iframeWrapper').style.display = "none";

      this.iContext.getElementById('errorTitle').innerHTML = this.nls.ERROR;
      this.iContext.getElementById('errorDesc').innerHTML = errorDesc;
   },
   
   _setupIFrame: function(url, parentNode) {
      console.debug("Setup iframe for url= " + url + ", parentNode= " + parentNode);

      if (this._iframe) {
         console.debug(this._iframe.id + " exists.");
         
         if (url && url != this._iframe.src) {
             this._iframe.src = url;
         }
         else {
            this._iframe.reused = true;
         }
      
         return this._iframe;
      }
      
      var src = url || "about:blank";
      var parent = parentNode ? parentNode : this.iContext.getElementById('iframeWrapper');
            
      this._iframe = document.createElement('iframe');
      this._iframe.id = this._getIFrameId();
      this._iframe.title = "SingleIframeWidget";
      this._iframe.style.border = "none"; 
      
      var width = this.getAttribute("width");
      this._iframe.width = width || "100%";
      
      this._iframe.scrolling = "yes";
      this._iframe.src = src;
      
      dojo.attr(this._iframe, "allowfullscreen", "");
      dojo.attr(this._iframe, "webkitallowfullscreen", "");
      dojo.attr(this._iframe, "mozallowfullscreen", "");
      dojo.attr(this._iframe, "msallowfullscreen", "");
      
      this._iframe.sandbox = this.getAttribute("iframeSandbox") || "allow-same-origin  allow-scripts allow-popups allow-forms";
      
      if (!dojo.isSafari) {
         this._iframe.sandbox += " allow-popups-to-escape-sandbox";
      }
      
      parent.appendChild(this._iframe);
      
      return this._iframe;
   },
   
   _updateWidgetTab: function(value) {
      if ("editpage" == this._getContainerScene()) {
         var id = this.iContext.widgetId + "_TabItem";
         var nodes = dojo.query("#" + id + " a");
         if (!nodes || nodes.length ==0)
            return;
         
         nodes[0].innerHTML = value;
      }
      else if ("fullpage" == this._getContainerScene()) {
         var node = dojo.byId("dropdownNavMenuSelection");
         if (node)
            node.innerHTML = value;
      }
   }
});