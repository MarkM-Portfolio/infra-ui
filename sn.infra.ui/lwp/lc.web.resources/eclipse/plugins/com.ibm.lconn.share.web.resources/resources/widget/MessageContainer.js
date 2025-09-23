/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.MessageContainer');
dojo.require("dijit._Widget");
dojo.require("lconn.share.util.html");
dojo.require("com.ibm.oneui.controls.MessageBox");

dojo.declare("lconn.share.widget.MessageContainer", [dijit._Widget], {

   nls: {},
   
   /*filter: function(m) {
      return !m.isGlobal;
   },*/

   postMixInProperties: function() {
      if (this.messages) {
         this.items = this.messages.getMessages();
         if (this.filter)
            this.items = dojo.filter(this.items, this.filter);
         this.connect(this.messages, "onNew", "add");
         this.connect(this.messages, "onClear", "update");
      }
      else
         this.items = this.items || [];
   },
   
   buildRendering: function() {
      var d = document;
      var el = this.domNode = this.srcNodeRef;
         dijit.setWaiState(el, "live", "assertive");
      if (this.baseClass)
         dojo.addClass(this.domNode, this.baseClass);
      dojo.addClass(this.domNode, "lotusMessageContainer");
      this.update(this.items);
   },

   /**
    * Interface to render a message item as the first child of element, el.
    * 
    * @param el where the message is crated in
    * @param item message object which contains the following types 
    *    warning
    *    success
    *    error
    *    external
    */
   renderItem: function(el, item) {
      var text = this.nls.INFO, type = com.ibm.oneui.controls.MessageBox.TYPE.INFO, canClose = (typeof item.canClose === "undefined") ? true : item.canClose;
      var a11yLabel = this.nls.INFO_COLON;
      if (item.warning) {
         text = this.nls.WARNING;
         a11yLabel = this.nls.WARNING_COLON;
         type = com.ibm.oneui.controls.MessageBox.TYPE.WARNING;
      }
      else if (item.success) {
         text = this.nls.SUCCESS;
         a11yLabel = this.nls.SUCCESS_COLON;
         type = com.ibm.oneui.controls.MessageBox.TYPE.SUCCESS;
      }
      else if (item.error) {
         text = this.nls.ERROR;
         a11yLabel = this.nls.ERROR_COLON;
         type = com.ibm.oneui.controls.MessageBox.TYPE.ERROR;
      }else if (item.external) {
         text = this.nls.EXTERNAL_WARNING;
         a11yLabel = this.nls.EXTERNAL_WARNING_COLON;
         type = com.ibm.oneui.controls.MessageBox.TYPE.SHARED_EXTERNAL;
      }
      if (!a11yLabel)
         a11yLabel = text;
      
      var div = dojo.create("div", {}, el);
      setTimeout(dojo.hitch(this, function(){
         var msg = item.message;
         if (typeof msg == "function")
            msg = msg.apply(item, [dojo.doc]);
         if (!msg) return;
         var mb = new com.ibm.oneui.controls.MessageBox({
            canClose: canClose,
            msg: msg,
            type: type,
            _strings: {
               icon_alt: text,
               a11y_label: a11yLabel,
               close_btn_alt: this.nls.CLOSE,
               close_btn_title: this.nls.CLOSE
            }
         }, div);
         this.connect(mb, "onClose", "remove");
         div.setAttribute("_id", item._id);
         dojo.publish("lconn/share/message/updated");
      }), 200);
      return div;
   },
   
   update: function(m, scroll) {
      var el = this.domNode;
      lconn.share.util.html.removeChildren(el);

      if (m && this.filter)
         m = dojo.filter(m, this.filter, this);
      
      this.items = m = m || [];

      for (var i=0; i<m.length; i++) {
         var value = m[i];
         value._id = i;
         this.renderItem(el, value);
      }
      el.style.display = (m.length == 0) ? "none" : "";
      if (scroll)
         dijit.scrollIntoView(this.domNode);
   },
   
   remove: function(id, e) {
      if (e) dojo.stopEvent(e);

      if (typeof id == "object")
         id = id._id;
      
      var el = this.domNode;
      if (!el)
         return;
      var nodes = el.childNodes;
      for (var i=0; i<nodes.length; i++)
         if (dojo.attr(nodes[i], "_id") == id) {
            lconn.share.util.html.removeChildren(nodes[i]);
            this.domNode.removeChild(nodes[i]);
            break;
         }
      var items = this.items;
      for (var i=0; i<items.length; i++)
         if (this.items[i]._id == id) {
            var item = this.items.splice(i,1)[0];
            item.closed = true;
            if (typeof item.onClose == "function")
               item.onClose();
            break;
         }
      el.style.display = (this.items.length == 0) ? "none" : "";
      dojo.publish("lconn/share/message/updated");
   },
   
   removeAll: function() {
      var el = this.domNode;
      lconn.share.util.html.removeChildren(el);
      el.style.display = "none";
   },

   add: function(message, scroll) {
      if (this.filter && !this.filter(message))
         return;
      
      this.items.push(message);
      message._id = this.items.length-1;      
      var div = this.renderItem(this.domNode, message);
      this.domNode.style.display = "";
      if (scroll)
         dijit.scrollIntoView(this.domNode);
   },
   
   replace: function(newMessage, oldMessage) {
      var id = oldMessage._id;
      var el = this.domNode;

      // Find the old message node
      var nodes = el.childNodes;
      var oldNode = null;
      for (var i=0; !oldNode && i < nodes.length; i++)
         if (dojo.getAttr(nodes[i], "_id") == id)
            oldNode = nodes[i];
      
      if (!oldNode) {
         this.add(newMessage, true);
         return;
      }

      // Find the old message object
      newMessage._id = id;
      var items = this.items;
      for (var i=0; i<items.length; i++)
         if (items[i]._id == id)
            items[i] = newMessage;

      // Render the new message
      var fragment = document.createDocumentFragment();
      var newNode = this.renderItem(fragment, newMessage);
      
      // Swap for the old
      el.replaceChild(newNode, oldNode);
      
      // Destroy the old
      lconn.share.util.html.removeChildren(oldNode);
   }
});
