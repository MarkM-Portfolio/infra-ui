/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.action.ActionMsg");
dojo.require("com.ibm.social.layout.Action");

dojo.declare("lconn.share.action.ActionMsg", com.ibm.social.layout.Action, {
   isVisible: function(selection, context) {
      return this.isValid();
   },
   getName: function(){
      return this.name;
   },
   getTooltip: function(){
      return this.tooltip;
   },
   updateDialogStyle: function(dialog, contentWidth) {
      var divcontainer = dialog.containerNode;
         divcontainer.style.padding = "15px";
      dialog.titleBar.style[dojo._isBodyLtr() ? "paddingLeft":"paddingRight"] = "16px";
      dialog.footerBar.style[dojo._isBodyLtr() ? "paddingLeft":"paddingRight"] = "16px";

      // Undo OneUI auto-scrolling
      if (contentWidth) {
         dialog.formNode.style.width = "auto";
         dialog.dialogBorder.style.maxWidth = (contentWidth + 30) + "px";
         if(dojo.isIE)
            dialog.dialogBorder.style.width = (contentWidth + 30) + "px";
      }
   },
   
   addFooterContainer: function(dialog) {
      var d = document;
      var div = this.footerContainer = d.createElement("div");
         div.className = "lotusDialogFooter";
         div.style.borderTop = "1px solid #CCCCCC";
         div.style.borderBottom = "1px solid #CCCCCC";
         div.style.paddingTop = "7px";
         div.style.paddingBottom = "7px";
         div.style.display = "none";
      dialog.containerNode.appendChild(div);
      this.renderFooterContainer(div);
   },
   
   renderFooterContainer: function(footer) {
   },
   
   setFooterContainerVisible: function(visible) {
      if (this.footerContainer)
         this.footerContainer.style.display = visible ? "":"none";
   },
   
   addMessageContainer: function(dialog) {
      var d = document;
      var messageContainer = this.messageContainer = d.createElement("div");
         messageContainer.style.display = "none";
         var messageNode = this.messageNode = d.createElement("div");
            messageNode.className = "lotusMessage2";
            messageNode.style.margin = "0";
            messageNode.style[dojo._isBodyLtr() ? "paddingLeft":"paddingRight"] = "16px";
         messageContainer.appendChild(messageNode);
      dialog.containerNode.appendChild(messageContainer);
      return messageContainer;
   },
      
   setMessage: function(msg, level) {
      var d = dojo.doc;
      var messageContainer = this.messageContainer;
      
      if(!msg) {
         messageContainer._currentMessage = null;
         messageContainer._currentLevel = null;
         messageContainer.style.display = "none";
         return;
      }
      
      level = {"warning":"warning","error":"error", "external":"external"}[level] || "info";

      if (msg == messageContainer._currentMessage && level == messageContainer._currentLevel)
         return;
      messageContainer._currentMessage = msg;
      messageContainer._currentLevel = level;

      messageContainer.style.display = "";

      var messageNode = this.messageNode;
         dijit.setWaiState(messageNode, "live", "assertive");
      while(messageNode.firstChild) messageNode.removeChild(messageNode.firstChild);
      
      var appNls = this.app.nls;
      var levelString =  {
            "info":appNls.INFO,
            "warning":appNls.WARNING,
            "error":appNls.ERROR,
            "external":appNls.EXTERNAL_WARNING
         }[level];
      var img = d.createElement("img");
         img.src = dojo.config.blankGif;
         img.alt = levelString;
         img.className = {
            "info":"lotusIcon lotusIconMsgInfo",
            "warning":"lotusIcon lotusIconMsgWarning",
            "error":"lotusIcon lotusIconMsgError",
            "external":"lotusIcon lconnIconMsgSharedExternal"
         }[level];
         dijit.setWaiRole(img, "presentation");
      messageNode.appendChild(img);
      var span = d.createElement("span");
         span.className = "lotusAltText";
         span.appendChild(d.createTextNode(levelString));
      messageNode.appendChild(span);
      var alertDiv = d.createElement("div");
         alertDiv.className = "lotusMessageBody";
         alertDiv.appendChild(document.createTextNode(msg));
      messageNode.appendChild(alertDiv);
      
      if(level != "error" && level != "external"){
         var a  = d.createElement("a");
            a.className = "lotusDelete";
            a.href = "javascript:;";
            a.role = "button";
            a.title = appNls.CLOSE;
            var img = d.createElement("img");
               img.src = dojo.config.blankGif;
               img.alt = appNls.CLOSE;
            a.appendChild(img);
            var span = d.createElement("span");
               span.className = "lotusAltText";
               span.appendChild(d.createTextNode("X"));
            a.appendChild(span);
            dojo.connect(a, "onclick", dojo.hitch(this, this.deleteMessage, messageNode));
         messageNode.appendChild(a);
      }
      messageNode.className = {
         "info":"lotusMessage2 lotusInfo",
         "warning":"lotusMessage2 lotusWarning",
         "error":"lotusMessage2 lotusFormError",
         "external": "lotusMessage2 lconnSharedExternal"
      }[level];
      messageNode.style.display = "";
   },
   deleteMessage: function(node, e){
      if (e) dojo.stopEvent(e);
      node.style.display = "none";
   },
   clearErrors: function() {
      // This action manages its own errors
   }
});
