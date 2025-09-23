/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.urliWidget.web.resources.widget.urlWidgetImpl");
dojo.requireLocalization("com.ibm.social.urliWidget.web.resources", "urlWidget");

console.log("urlWidget");

dojo.extend(com.ibm.social.urliWidget.web.resources.widget.urlWidget,{
   onLoad: function() {    
      // URL of the iFrame
      this.extUrl = "";
      // Width of the iFrame
      this.extWidth = "";
      // Height of the iFrame
      this.extHeight = "";
      
      this._resourceBundle = dojo.i18n.getLocalization("com.ibm.social.urliWidget.web.resources", "urlWidget");
      
      // Pass context through a request parameter on URL
      this.onURL = false;

      // Context passed to iFrame
      this.context = {};
      
      this.remFrame = null;

      /*
       * Should only be true during development, otherwise default.
       */
      this.debug = false;
      
      this.init();
   },

   onUnload: function() {
      if (this.messageEventListener) {
            window.removeEventListener(this.messageEventListener);
            //this._widgetDebug('unloading widget and unregistering event listener');
      }
   },

   init: function() {         
      if (this.isHtml5()) {
         this.setupContext();
         this.setupIFrame();        
      } else {
         this.sendError(this._resourceBundle.ERROR_MSG_HTML5_SUPPORT);
         console.log("Non-html5 based browser");
      }
   },

   setupContext: function() {
	   if (!String.prototype.startsWith) {
		    String.prototype.startsWith = function(searchString, position){
		      position = position || 0;
		      return this.substr(position, searchString.length) === searchString;
		  };
	   }
      var attributesItemSet = this.iContext.getiWidgetAttributes();
      var i = null;

      this.extUrl = attributesItemSet.getItemValue("url");
      this.extWidth = attributesItemSet.getItemValue("width");
      this.extHeight = attributesItemSet.getItemValue("height");

      var names = [ "resourceId", "resourceName", "resourceType" ];
      this.context.source = {};
      for ( i = 0; i < names.length ; i++) {
         this.context.source[names[i]] = attributesItemSet.getItemValue(names[i]);
      }
      this.context.source.widgetInstanceId = this.iContext.getWidgetId();
      this.context.source.orgId = this.iContext.getUserProfile().getItemValue("orgId");

      this.context.user = {};
      names = ["userId", "orgId", "displayName", "email"];
         //this.iContext.getUserProfile().getAllNames();
      for ( i = 0; i < names.length; i++) {
         this.context.user[names[i]] = this.iContext.getUserProfile()
               .getItemValue(names[i]);
      }
      
      var that = this;
      
      this.context.extraContent = {
            canContribute: that.iContext.getUserProfile().getItemValue("canContribute"),
            canPersonalize: that.iContext.getUserProfile().getItemValue("canPersonalize")
      };
   },

   setupIFrame: function() {
      if (this.extUrl != null) {       
         this.remFrame = document.createElement('iframe');
         this.remFrame.id = 'thirdPartyFrame_' + this.context.source.widgetInstanceId;
         this.remFrame.style.border = "none";      
         this.remFrame.width = this.extWidth || "100%";
         this.remFrame.height = this.extHeight || "100%";
         this.remFrame.scrolling = "yes";
         this.remFrame.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms allow-modals";
         this.remFrame.setAttribute('allowFullScreen', '');
         var that = this;
         if (this.onURL){
            // pass through request parameters
            
            if (this.extUrl.indexOf("?") < 0){
               this.extUrl += "?";
            } else {
               this.extUrl += "&";
            }
            
            require(["dojo/json"], function(JSON){             
               that.extUrl += "context=" + JSON.stringify(that.context);
               
               var wrapper = that.iContext.getElementById('iframeWrapper');
               wrapper.appendChild(that.remFrame);
               
               that.remFrame.src = that.extUrl;
            });            
            
         } else {
            // See: https://gist.github.com/jlong/2428561 - simple URI parsing with JS
            //var iframeSrcParser = document.createElement('a');
            //iframeSrcParser.href = this.extUrl;
            //var iframeSrcOrigin = iframeSrcParser.protocol + '//' + iframeSrcParser.host;

            that.messageEventListener = window.addEventListener("message", function(evt) {
               //if (iframeSrcOrigin === evt.origin) { // origin matching the iframe src to the message origin
                  if (typeof evt.data === 'string') {
                     if (evt.data === "appReady") {
                        that.sendMessage();
                     }
                     if (evt.data.startsWith("setHeight|" + that.context.source.widgetInstanceId + "|")) {
                        if (evt.data.split("|")[2] > 0) {
                           that.remFrame.height = evt.data.split("|")[2];
                        }
                     }
                  } else if (typeof evt.data === 'object' && typeof evt.data.command === 'string' && typeof evt.data.widgetInstanceId === 'string' && evt.data.widgetInstanceId === that.context.source.widgetInstanceId) {

                     if (evt.data.command === 'openWindow') {
                        /*
                        openWindow: Assumes the following command:

                        parent.postMessage({
                           'command' : 'openWindow',
                           'url' : urlToOpen,
                           'name' : name,
                           'specs' : specs,
                           'replace' : replace,
                           'widgetInstanceId': widgetInstanceId
                        }, '*');

                        parent.postMessage({
                           'command' : 'openWindow',
                           'url' : urlToOpen,
                           'widgetInstanceId': widgetInstanceId
                        }, '*');
                         */
                        window.open(evt.data.url,
                           evt.data.name || '_blank',
                           evt.data.specs || '',
                           evt.data.replace || false
                        );

                     } else if (evt.data.command === 'appDialog') {
                        /*
                        appDialog: Assumes the following command

                        parent.postMessage( {
                           'command' : 'appDialog',
                           'title' : title,
                           'iFrameUrl' : iFrameUrl,
                           'width' : width,
                           'height' : height,
                           'widgetInstanceId': widgetInstanceId
                        }, '*');

                        parent.postMessage( {
                           'command' : 'appDialog',
                           'title' : title,
                           'iFrameUrl' : iFrameUrl,
                           'widgetInstanceId': widgetInstanceId
                        }, '*');
                        */

                        var self = this;
                        require(["dijit/Dialog", "dojo/domReady!"], function(Dialog) {
                           if (self.widgetDialog) {
                              if (self.widgetDialog === window.commAppLastDialog) {
                                 delete window.commAppLastDialog;
                              }
                              self.widgetDialog.destroy();
                              delete self.widgetDialog;
                           }
                           if (window.commAppLastDialog) {
                              window.commAppLastDialog.destroy();
                              delete window.commAppLastDialog;
                           }

                           // For dojo Dialogs, see the IBM OneUI Developer Guide here: http://infolib.lotus.com/resources/oneui/3.0/docPublic/components/dialog.htm
                           self.widgetDialog = new Dialog({
                              title: evt.data.title,
                              content: '<div class="commAppDialog lotusDialogBorder">' + // .lotusDialogBorder - this class is purely to allow flexibility in styling
                                 '<div class="lotusDialog">' + // .lotusDialog - assigned to either a wrapping div or a form
                                 '<header class="lotusDialogHeader">' + // .lotusDialogHeader - Assigned to a header/div tag that wraps the header text and close icon
                                 '<h1 class="lotusHeading">' + // .lotusHeading - Assigned to the heading element that sits in the lotusDialogHeader
                                 '<a title="Close" href="javascript:window.commAppLastDialog.destroy();" style="color: #fff; text-decoration: none; margin-right:10px;">✕</a>' +
                                 '<span class="title">' + (evt.data.title || 'Application dialog') + '</span>' +
                                 '</h1>' +
                                 '</header>' +
                                 '<div class="lotusDialogContent" style="max-height: 100%; padding: 0!important;" >' + // A header tag is used for the dialog header. This class, assigned to a div, wraps the rest of the dialog content and is set to scroll if it gets too big
                                 // Additionally, we're removing the padding so that there is no white space around the iframe
                                 '<iframe frameborder="0" width="100%" height="' + evt.data.height + '" src="' +
                                 evt.data.iFrameUrl +
                                 '" allowfullscreen="true" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"></iframe>' +
                                 '</div>' +
                                 '</div>' +
                                 '</div>',
                              style: "width: " + (evt.data.width || '900') + "px; height: " + (evt.data.height || '500') + "px;"
                           });
                           window.commAppLastDialog = self.widgetDialog;
                           self.widgetDialog.show();
                        });
                     }
                  }
               // } // origin matching
            }, false);

            // pass through HTML5 sendMessage         
            //this.remFrame.setAttribute("onerror", this.sendError());
            
            var wrapper = this.iContext.getElementById('iframeWrapper');            
            
            wrapper.appendChild(this.remFrame);
            
            this.remFrame.src = this.extUrl;
         }
      }
   },

   /**
    * checks to see if sandboxing is supported
    */
   isHtml5: function() {
      var res = false;
      var cvs = document.createElement('canvas');

      if (cvs.getContext === undefined) {
         res = false;
      } else {
         res = true;
      }
      return res;
   },

   /**
    * sendError() -> void reveals the error
    */
   sendError: function(msg) {

      var errorDesc = msg === undefined ? this._resourceBundle.ERROR_MSG : msg;
      
      // Present Forbidden Error
      this.iContext.getElementById('fatalError').style.display = "";
      this.iContext.getElementById('fatalError').style.display = "inline";
      this.iContext.getElementById('iframeWrapper').style.display = "none";

      this.iContext.getElementById('errorTitle').innerHTML = this._resourceBundle.ERROR;
      this.iContext.getElementById('errorDesc').innerHTML = errorDesc;
   },

   /**
    * sendMessage() -> void send message uses the post function in HTML5 only
    * sends to the extensionUrl and the contentWindow
    * 
    */
   sendMessage: function() {
      var message = this.context;
      
      var that = this;

      try {
         if (this.debug) {
            console.log("Message Posted to Content Window: ");
            console.dir(message);
         }
                  
         console.log(that.remFrame);
         that.remFrame.contentWindow.postMessage(message, '*');
      } catch (e) {
         console.log(e);
      }
   }
});
