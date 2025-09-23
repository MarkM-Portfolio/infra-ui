/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.message");
dojo.require("lconn.share.util.html");
dojo.require("com.ibm.oneui.controls.MessageBox");

dojo.requireLocalization("lconn.core", "strings");
(function(m){
   m.level = {
      "info": {
         id: "info",
         alt: "INFO",
         imgClassName: "lconnSprite lconnSprite-iconAttention16",
         className: "lotusMessage lotusInfo"
      },
      "warning": {
         id: "warning",
         alt: "WARNING",
         imgClassName: "lconnSprite lconnSprite-iconWarning16",
         className: "lotusMessage lotusWarning"
      },
      "error": {
         id: "error",
         alt: "ERROR",
         imgClassName: "lconnSprite lconnSprite-iconError16",
         className: "lotusMessage lotusFormError"
      },
      "confirm": {
         id: "confirm",
         alt: "CONFIRM",
         imgClassName: "lconnSprite lconnSprite-iconConfirmation16",
         className: "lotusMessage lotusConfirm"
      }
   };
   
   m.defaultLevel = "info";
   m.nls = dojo.i18n.getLocalization("lconn.core", "strings");

   m._createErrorContent = function(/*String, Node, or Array of nodes*/contents, /* Optional error object */opt) {
      var nls = opt.nls || m.nls;
      var error = opt.error;
      if (error && error.message && error.message != error.code) {
         var d = document;
         var details = d.createElement("span");
            details.className = "qkrErrorDetailsText";
            details.appendChild(d.createElement("br"));
            details.appendChild(d.createTextNode(error.message));
            details.style.display = "none";

         var detailsLink = d.createElement("a");
            detailsLink.appendChild(d.createTextNode(nls.ERROR_DETAILS_LINK || "..."));
            detailsLink.className = "qkrErrorDetailsLink";
            detailsLink.href="javascript:;";
            detailsLink.title = nls.ERROR_DETAILS_TOOLTIP || "";
            detailsLink.onclick = function() {
               details.style.display = "";
               detailsLink.style.display = "none";
            };

         if (typeof contents == "string")
            contents = d.createTextNode(contents);
         if (!dojo.isArray(contents))
            contents = [contents];

         contents.push(d.createTextNode(" "));
         contents.push(detailsLink);
         contents.push(details);
      }
      return contents;
   };
   /**
    * lconn.share.util.message.setMessage
    * messageNode: the node to contain the message, in this method, this node will be emptied
    * contents: string/node, or Array of nodes
    * level: string value, one of "info", "error", "warning", "confirm", default is "info"
    * opt: {
    *    error: a link will be displayed after the message, for user to see the error detail. 
    *    container: if you want to have the message node customized, you may put messageNode in container, and pass it with opt. 
    *       Only container.style.display will be changed accordingly
    *    nls: 
    *       nls.INFO, nls.ERROR, nls.WARNING, nls.CONFIRM will be used for alt of the message icon
    *       nls.ERROR_DETAILS_LINK and nls.ERROR_DETAILS_TOOLTIP will be used for displaying opt.error message 
    *    canClose: true | false, when canClose message is displayed, we will set focus to Close(X) button. 
    *    focusPostClose: a node required if canClose is true. After the message is closed, we will set focus to this focusPostClose node. 
    * }
    */
   m.setMessage = function(messageNode, /*String, Node, or Array of nodes*/contents, /* String */ level, /* optional {nls, container, error} */opt) {
      var d = document;
      opt = opt || {};
      var nls = dojo.mixin({
         INFO: m.nls.rs_messagebox_info_icon_alt,
         WARNING: m.nls.rs_messagebox_warning_icon_alt,
         SUCCSS: m.nls.rs_messagebox_success_icon_alt,
         ERROR: m.nls.rs_messagebox_error_icon_alt,
         CLOSE: m.nls.rs_messagebox_close_btn_title
      }, opt.nls);
      var container = opt.container || messageNode;
      
      if (!contents) {
         container.style.display = "none";
         return;
      }
      
      dijit.setWaiState(container, "live", "assertive");
      dijit.setWaiRole(container, "alert");
      
      while(messageNode.firstChild) messageNode.removeChild(messageNode.firstChild);
      
      var text = nls.INFO;
      var type = com.ibm.oneui.controls.MessageBox.TYPE.INFO;
      var canClose = true;
      if (level == "warning") {
         text = nls.WARNING;
         type = com.ibm.oneui.controls.MessageBox.TYPE.WARNING;
      }
      else if (level == "success") {
         text = nls.SUCCESS;
         type = com.ibm.oneui.controls.MessageBox.TYPE.SUCCESS;
      }
      else if (level == "error") {
         text = nls.ERROR;
         type = com.ibm.oneui.controls.MessageBox.TYPE.ERROR;
         canClose = false;
      }
      
      if(!dojo.isArray(contents))
         contents = [contents];
      dojo.forEach(contents, function(content){
         var div = messageNode.appendChild(d.createElement("div"));
         var mb = new com.ibm.oneui.controls.MessageBox({
            canClose: canClose,
            type: type,
            msg: content,
            _strings: {
               a11y_label: text,
               icon_alt: text,
               close_btn_alt: nls.CLOSE,
               close_btn_title: nls.CLOSE
            }
         }, div);
            div.firstChild.style.marginBottom = "0px";
         if(canClose && opt.focusPostClose)
            dojo.connect(mb, "onClose", dojo.partial(m.remove, div, opt.focusPostClose));
      })
      

      container.style.display = "";
   };
   
   m.remove = function(el, focusPostClose, e) {
      if (e) dojo.stopEvent(e);
      el.style.display = "none";
      setTimeout(function(){dijit.focus(focusPostClose);}, 10);
   };
   
})(lconn.share.util.message);
