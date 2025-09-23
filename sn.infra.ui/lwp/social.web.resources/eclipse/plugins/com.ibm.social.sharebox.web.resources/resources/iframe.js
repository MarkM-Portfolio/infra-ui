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

dojo.provide("com.ibm.social.sharebox.iframe");

dojo.require("lconn.core.util.dojoPatches");
dojo.require("com.ibm.social.sharebox.dialog");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.social.incontext.util.url");



(function(scope){
   function messageReceived(event) {
      if (event) {
         if (event.data === "shareboxCloseDialog") {
            var shb = com.ibm.social.sharebox._getInstance();
            if (shb && shb._dialog) {
               var dlg = shb._dialog;
               dlg.closeDialog();
            }
         }
         else if (event.data === "shareboxOpenDialog") {
            com.ibm.social.sharebox.show();
            dojo.publish("com/ibm/social/sharebox/pane/resized");
         }
         else if (event.data === "shareboxSetFocus") {
            window.focus();
         }
      }
   }
   
   function sendMessage(msg) {
      if (window.parent && window.parent.postMessage)
         window.parent.postMessage(msg, "*");
   }
   
   function isSecure() {
      var scheme = (window.location.protocol || "http").replace(':','');
      return (scheme === "https");
   }
   
   function handleLogin() {
      // Send message to parent to prepare for login
      var commonSvcRef = lconn.core.config.services.webresources.secureUrl;
      var redirectUrl = encodeURIComponent(window.location.href);
      var loginUrl = commonSvcRef + "/login_redirect?redirect=" + redirectUrl;
      window.location.href=loginUrl;
   }
   
   function checkLoggedIn() {
      var openSocialSvcRef = lconn.core.config.services.opensocial[isSecure() ? "secureUrl" : "url"];
      var url = openSocialSvcRef + "/rest/people/@me/@self";
      function handleFunc(response, ioArgs) {
         if (response instanceof Error) {
            window.setTimeout(handleLogin, 0);
         }
         else {
            var auth = ioArgs.xhr.getResponseHeader("X-LConn-Auth");
            if (auth && auth === "false")
               window.setTimeout(handleLogin, 0);
         }
      }
      var opts = {
         url: url,
         handle: handleFunc,
         failOk: true
      };
      return dojo.xhrGet(opts);
   }
   
   scope.init = function() {
      dojo.extend(com.ibm.social.sharebox.controls._ShareboxDialog, {
         draggable: false,
         setPosition: function() {
            this.domNode.style.top = "0px";
         },
         cancelDialog: function() {
            this._cancelDialog();
            sendMessage("sharebox_dialog_closed|");
         },
         displayMessage: function(type, msg) {
            var msg = encodeURIComponent(type + "|" + msg);
            sendMessage("sharebox_dialog_message|" + msg);
         },
         displayMessageHtml: function(type, msg) {
            var msg = encodeURIComponent(type + "|" + msg);
            sendMessage("sharebox_dialog_message|" + msg);
         },
         _position: function(){
            dojo.style(this.domNode,{ left: "0", top: "0" });
         }
      });
      // Override the DialogUtil code to customize the prompt dialog
      var original_getDialog = lconn.core.DialogUtil._getDialog;
      lconn.core.DialogUtil._getDialog = function() {
         var dlg = original_getDialog.apply(this, arguments);
         dlg._position = function() { 
            dojo.style(this.domNode, { left: "0", top: "0" });
         }
         return dlg;
      };
      
      com.ibm.social.sharebox.show();
      dojo.subscribe("com/ibm/social/sharebox/pane/resized", function() {
         var shb = com.ibm.social.sharebox._getInstance();
         if (shb && shb._dialog) {
            var dlg = shb._dialog;
            var pos = dojo.position(dlg.domNode);
            sendMessage("sharebox_height_changed|" + Math.floor(dojo.position(dlg.domNode).h));
         }
      });
      dojo.connect(window, "message", null, messageReceived);
   }
  
})(com.ibm.social.sharebox.iframe);