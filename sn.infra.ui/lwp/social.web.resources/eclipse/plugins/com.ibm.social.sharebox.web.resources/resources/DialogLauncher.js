/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.sharebox.DialogLauncher");
dojo.requireLocalization("com.ibm.social.sharebox", "socialShareboxStrings");

dojo.require("lconn.core.config.services");

(function(scope) {
   var LOAD_TIMEOUT = 8000;
   
   var nls = dojo.i18n.getLocalization("com.ibm.social.sharebox", "socialShareboxStrings");
   if (!nls) {
      var strings = com.ibm.social.sharebox.nls.socialShareboxStrings;
      if (strings)
         for (x in strings)
            nls = strings[x];
   }
   var blankGif = dojo.config.blankGif ? dojo.config.blankGif : "/theming/css/lotus/images/blank.gif";
   var msgNls = nls.MESSAGE;
   var webResourcesSvcUrl, iframeId, dialog;
   var opened = false;
   var adjustedWidth = false;
   var dialogTemplate = "<div class=\"lcSharebox lotusTabDialog dijitDialog lotusDialog\" tabindex=\"-1\" waiRole=\"dialog\" waiState=\"labelledby-${id}_title\">" +
   "<div class=\"lotusDialogBorder\">" +
      "<div class=\"dijitDialogTitleBar lotusDialogHeader\" dojoattachpoint=\"titleBar\" title=\"\" style=\"padding:0 !important\">" +
      "<span class=\"dijitDialogTitle\" dojoattachpoint=\"titleNode\" id=\"${id}_title\" role=\"presentation\"></span>" +
      "<span title=\"" + nls.cancel.label + "\" role=\"button\" class=\"lotusDialogClose\" dojoattachevent=\"onclick:closeDialog\" dojoattachpoint=\"closeButtonNode\">" +
         "<img alt=\"" + nls.cancel.label + "\" role=\"presentation\" src=\"" + blankGif + "\">" +
         "<span class=\"lotusAltText\">X</span>" +
      "</span>" +
      "</div>" +
      "<div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent lotusui30 lotusTabDialog\" style=\"padding:0\">" +
      "</div>" +
      "<a role=\"button\" class=\"shareBackTopHidden\" href=\"javascript:;\" dojoattachpoint=\"backToTopLink\" title=\"" + nls.goBack.a11y + "\">${nls.goBack.label}</a>" +
   "</div>" +
"</div>";
   
   function isSecure() {
      var scheme = (window.location.protocol || "http").replace(':','');
      return (scheme === "https");
   }
   
   function dialogSizeChanged(newSize) {
      if (newSize) {
         var iframe = document.getElementById(iframeId);
         if (!adjustedWidth) {
            iframe.style.width = dojo.isIE ? "544px" : "540px";
         }
         var sizeInt = parseInt(newSize);
         if (!sizeInt) { return; }
         var size = parseInt(newSize) + 5;
         iframe.style.height = size + "px";
      }
   }
   
   function closeDialog(result) {
      if (dialog) {
         setTimeout(function(){
            dialog.hide();
         }, 0);
      }
   }
   
   function sendCloseEvent() {
      var iframe = document.getElementById(iframeId);
      iframe.contentWindow.postMessage("shareboxCloseDialog", webResourcesSvcUrl);
   }
   

   var msgContainer = null;
   
   function createMessageContainer() {
      // Find appropriate parent
      var isBanner = false;
      var nodes = dojo.query("div.lotusMain > div.lotusContent");
     if (nodes.length > 1) {
         nodes = dojo.filter(nodes, function(node) { return dojo.style(node, "display") != "none"; });
     }
      if(!nodes.length) {
         nodes = dojo.map(dojo.filter(dojo.query("div.lotusMain > *"), 
            function(node) {
               if(dojo.style(node, "display") != "none")
                  return true;
            }),
            function(node) { 
               return dojo.query("div.lotusContent", node)[0]; 
            });
      }
      if (!nodes.length) {
         nodes = dojo.query("div[role='banner']");
         if (nodes.length) {
            isBanner = true;
         }
      }
      var contentDiv = nodes.length ? nodes[0] : dojo.body();
      return dojo.create("div", {className: "shareStatus lotusRightCorner", role: "alert"}, contentDiv, isBanner ? "after" : "first");
   }
   
   function clearMessage () {
      if (msgContainer) {
        dojo.destroy(msgContainer);
         msgContainer = null;
      }
   }
   
   function createMessage_Oneui3 (type, msg) {
      var msgStyle = {
         error:   { msgClass: "lotusError", spriteClass: "msgError16", text: msgNls.ERROR },
         warning: { msgClass: "lotusWarning", spriteClass: "msgWarning16", text: msgNls.WARNING },
         success: { msgClass: "lotusSuccess", spriteClass: "msgSuccess16", text: msgNls.SUCCESS }
      }
      var spriteClass = "llcom-icon2";
     clearMessage();
      msgContainer = createMessageContainer();
      var msgNode = dojo.create("div", { className: "lotusMessage2 " + msgStyle[type].msgClass, role: "alert" }, msgContainer);
         dojo.create("img", { title: msgStyle[type].text, alt: msgStyle[type].text, src: blankGif, className: "lotusIcon " + spriteClass + " " + spriteClass + "-" + msgStyle[type].spriteClass}, msgNode);
         if (type ===  "error" || type === "warning")
            dojo.create("span", { className: "lotusAltText", innerHTML: msgStyle[type].text }, msgNode);
         dojo.create("div", { className: "lotusMessageBody", innerHTML: msg }, msgNode);
         var a = dojo.create("a", { href: "javascript:;", className: "lotusDelete", alt: msgNls.DISMISS, title: msgNls.DISMISS }, msgNode);
            dojo.create("img", { title: msgNls.DISMISS, alt: msgNls.DISMISS, role: "presentation", src: blankGif }, a);
            dojo.create("span", { className: "lotusAltText", innerHTML: "x" }, a);
      var connection = null;
      function destroyMessage() {
         if (connection) {
            dojo.disconnect(connection);
            connection = null;
         }
         dojo.empty(msgContainer);
      }
      connection = dojo.connect(a, "click", null, destroyMessage);
      return msgNode;
   }
   
   function createMessage_Oneui2 (type, msg) {
      var msgStyle = {
         error:   { msgClass: "lotusError", spriteClass: "msgError16", text: msgNls.ERROR },
         warning: { msgClass: "lotusWarning", spriteClass: "msgWarning16", text: msgNls.WARNING },
         success: { msgClass: "lotusConfirm", spriteClass: "msgSuccess16", text: msgNls.SUCCESS }
      }   
      var spriteClass = "llcom-icon2";
     clearMessage();
     msgContainer = createMessageContainer();
      
      var msgNode = dojo.create("div", { className: "lotusMessage " + msgStyle[type].msgClass, role: "alert" }, msgContainer);
         dojo.create("img", { title: msgStyle[type].text, alt: msgStyle[type].text, src: blankGif, className: "lotusLeft " + spriteClass + " " + spriteClass + "-" + msgStyle[type].spriteClass}, msgNode);
         if (type ===  "error" || type === "warning")
            dojo.create("span", { className: "lotusAltText", innerHTML: msgStyle[type].text }, msgNode);
         dojo.create("span", { innerHTML: msg }, msgNode);
         var a = dojo.create("a", { href: "javascript:;", className: "lotusDelete", alt: msgNls.DISMISS, title: msgNls.DISMISS }, msgNode);
            dojo.create("img", { title: msgNls.DISMISS, alt: msgNls.DISMISS, role: "presentation", src: blankGif }, a);
            dojo.create("span", { className: "lotusAltText", innerHTML: "x" }, a);
      var connection = null;
      function destroyMessage() {
         if (connection) {
            dojo.disconnect(connection);
            connection = null;
         }
         dojo.empty(msgContainer);
      }
      connection = dojo.connect(a, "click", null, destroyMessage);
      return msgNode;
   }
   
   var createMessage = null;
   
   function displayMessage(msgData) {
      var parts = msgData.split("|");
      var type = parts[0];
      var msg = parts[1];
      if (!createMessage) {
          createMessage = dojo.hasClass(dojo.body(), "lotusui30") ? createMessage_Oneui3 : createMessage_Oneui2;
      }
      createMessage(type, msg);
   }
   
   function messageReceived(event) {
      // Make sure it's coming from a connections window
      if (event && event.origin) {
         if (webResourcesSvcUrl.indexOf(event.origin) === 0) {
            var dataParts = event.data.split("|");
            var msg = dataParts ? dataParts[0] : null;
            if (msg === "sharebox_height_changed")
               dialogSizeChanged(dataParts[1]);
            else if (msg === "sharebox_dialog_closed")
               closeDialog();
            else if (msg === "sharebox_dialog_message")
               displayMessage(decodeURIComponent(dataParts[1]));
         }
      }
   }
   
   function preloadSharebox() {
      if (dialog) return;
      else {
         createDialog();
      }
   }
   
   function createDialog() {
      var dijitDialog = "dijit.Dialog";
      if (!dojo.getObject(dijitDialog)) {
         dojo.require(dijitDialog);
      }
      webResourcesSvcUrl = lconn.core.config.services.webresources[isSecure() ? "secureUrl" : "url"];
      var shareboxUrl = webResourcesSvcUrl + "/sharedialog/dialog";
      
      if (window.addEventListener)
         window.addEventListener("message", messageReceived, false);
      else
         window.attachEvent("onmessage", messageReceived);
            
      var dlg = dialog = new dijit.Dialog({ style: "width:546px", templateString: dialogTemplate, nls: nls, blankIcon: blankGif, closeDialog: sendCloseEvent });
      iframeId = dlg.id + "_sharebox_iframe";
      var widthString = dojo.isIE ? "546px" : "541px";
      var iframeContent = "<iframe id=\"" + iframeId + "\" src=\"" + shareboxUrl + "\" style=\"width:" + widthString + "; height:300px; border:none;\"></iframe>";
      if (dlg.set)
         dlg.set("content", iframeContent);
      else
         dlg.setContent(iframeContent);
      dojo.style(dlg.domNode, { visibility: "hidden", position: "absolute", display: ""});
   }
   
   function init() {
      setTimeout(preloadSharebox, LOAD_TIMEOUT);
   }
   
   function positionDialog() {
      dialog.domNode.style.top = "100px";
   }
   
   scope.open = function() {
      if (!dialog) {
         createDialog();
      }
      
      clearMessage();
      
      if (!opened) {
         opened = true;
         dojo.style(dialog.domNode, { display:"none", visibility: "visible"});
         dialog.show();
         positionDialog();
         window.setTimeout(function() {
            var iframe = document.getElementById(iframeId);
            iframe.contentWindow.postMessage("shareboxSetFocus", webResourcesSvcUrl);
         }, 100);
      }
      else {
         var iframe = document.getElementById(iframeId);
         iframe.style.width = dojo.isIE ? "546px" : "541px";
         adjustedWidth = false;
         iframe.contentWindow.postMessage("shareboxOpenDialog", webResourcesSvcUrl);
         dialog.show();
         positionDialog();
         window.setTimeout(function() {
            iframe.contentWindow.postMessage("shareboxSetFocus", webResourcesSvcUrl);
         }, 100);
      }
   }
   
   dojo.addOnLoad(init);
})(com.ibm.social.sharebox.DialogLauncher);