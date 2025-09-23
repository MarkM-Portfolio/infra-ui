/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.tooltip.DialogBase");
dojo.require("lconn.share.widget.TooltipDialog");

dojo.declare("lconn.share.widget.tooltip.DialogBase", lconn.share.widget.TooltipDialog, {

   "class": "lotusTooltipDialog",
   placement: {'BL':'TL', 'TL':'BL', 'BR':'TR', 'TR':'BR'},
   placementRTL: {'BR':'TR', 'TR':'BR', 'BL':'TL', 'TL':'BL'},
   parseOnLoad: false,
   loadEarly: true,
   baseWidth: 200,
   
   postMixInProperties: function() {
      this.inherited(arguments);
      this.ioMethod = dojo.hitch(this, this._ioMethod);
      this.nls = this._strings = this.nls || this._strings;
   },
   
   postCreate: function(){
      this.inherited(arguments);
      if (this.role)
         dijit.setWaiRole(this.containerNode, this.role);
   },
   
   destroy: function() {
      dijit.popup.close(this);
      this.inherited(arguments);
   },
      
   _ioMethod: function(args) {
      args.handle = dojo.hitch(this, this.handleLoad);
      return this.net.get(args);
   },
   
   handleLoad: function(response, ioArgs) {
      if (response instanceof Error)
         return response;
      if (this.heading && !response.title)
         response.title = this.heading;
      return this.renderHtml(response, ioArgs);
   },
      
   renderLoading: function() {
      var d = document;
      var div = d.createElement("div");
         div.className = "lotusHelp";
         if (dojo.isIE)
            div.style.width = this.baseWidth/2 + "px";
         var div2 = d.createElement("div");
            div2.className = "lotusInfoBox";
            if (this.header) {
               var h3 = d.createElement("h3");
                  h3.appendChild(d.createTextNode(this.header));
               div2.appendChild(h3);
            }
            div2.appendChild(d.createTextNode(this.label));
         div.appendChild(div2);
      return div;
   },
   
   onDownloadStart: function() {
      return this.renderLoading();
   },
   
   onDownloadError: function(error) {
      var msg = this.getErrorMessage(error);
      
      var d = document;
      var div = d.createElement("div");
         div.className = "lotusHelp";
         if (dojo.isIE)
            div.style.width = this.baseWidth/2 + "px";
         var div2 = d.createElement("div");
            div2.className = "lotusInfoBox";
            if (this.header) {
               var h3 = d.createElement("h3");
                  h3.appendChild(d.createTextNode(this.header));
               div2.appendChild(h3);
            }
            div2.appendChild(d.createTextNode(msg));
         div.appendChild(div2);
      return div;
   },
   
   getErrorMessage: function(error) {
      if (error.msg)
         return error.msg;
      
      var msg;
      var code = error.code;
      if (this.nls) {
         if (code == "cancel")
            msg = this.nls.ERROR_CANCEL;
          else if (code == "timeout")
             msg = this.nls.ERROR_TIMEOUT;
          else if (code == "AccessDenied")
             msg = this.nls.ERROR_ACCESS_DENIED;
          else if (code == "ItemNotFound")
             msg = this.nls.ERROR_NOT_FOUND;
          
          if (!msg)
             msg = this.nls.ERROR;
      }
      return msg || this.msgError;
   },
   
   updatePosition: function() {
   }   
});

