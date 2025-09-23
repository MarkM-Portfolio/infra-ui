/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/on",
	"dojo/topic",
	"dijit/_Widget",
	"dojo/window",
	"ic-incontext/util/html",
	"ic-incontext/util/text"
], function (array, declare, lang, domClass, on, topic, _Widget, dojoWindow, html, textModule) {

	var MessageContainer = declare("com.ibm.social.incontext.widget.MessageContainer", _Widget, {
	
	   nls: {},
	   
	   /*filter: function(m) {
	      return !m.isGlobal;
	   },*/
	
	   postMixInProperties: function() {
	      if (this.messages) {
	         this.items = this.messages.getMessages();
	         if (this.filter)
	            this.items = array.filter(this.items, this.filter);
	         this.own(on(this.messages, "New", lang.hitch(this, "add")));
	         this.own(on(this.messages, "Clear", lang.hitch(this, "update")));
	      }
	      else
	         this.items = this.items || [];
	   },
	   
	   buildRendering: function() {
	      var d = document;
	      var el = this.domNode = this.srcNodeRef;
	      if (this.baseClass)
	         domClass.add(this.domNode, this.baseClass);
	      this.domNode.setAttribute("aria-live", "assertive");
	      this.update(this.items);
	   },
	
	   renderItem: function(el, item) {
	      var d = document;
	      
	      var text = this.nls.INFO;
	      var image = "lconnSprite lconnSprite-iconAttention16";
	      var style = "lotusMessage lotusInfo";
	      if (item.question) {
	         text = this.nls.QUESTION;
	         image = "lconnSprite lconnSprite-iconQuestion16"
	         style = "lotusMessage lotusInfo";
	      }
	      if (item.error) {
	         text = this.nls.ERROR;
	         image = "lconnSprite lconnSprite-iconError16";
	         style = "lotusMessage lotusError";
	      }
	      else if (item.warning) {
	         text = this.nls.WARNING;
	         image = "lconnSprite lconnSprite-iconWarning16";
	         style = "lotusMessage lotusWarning"
	      }
	      else if (item.success) {
	         text = this.nls.SUCCESS;
	         image = "lconnSprite lconnSprite-iconConfirmation16";
	         style = "lotusMessage lotusConfirm"
	      }
	      
	      var div = d.createElement("div");
	         div._id = item._id;
	         div.className = style;
	         
	         var img = d.createElement("img");
	            img.alt = img.title = (item.warning || item.error) ? text : "";
	            img.className = image;
	            img.src = this._blankGif;
	         div.appendChild(img);
	      
	         if (item.warning || item.error) {
	            var span = d.createElement("span");
	               span.className = "lotusAltText";
	               span.appendChild(d.createTextNode(text));
	            div.appendChild(span);
	         }
	         var msg = item.message, span;
	         if(msg && msg.nodeType && (msg.nodeName.toLowerCase() == "span")) {
	        	 span = msg;
	         } else {
	        	span = d.createElement("span");
	            if (msg) {
	               if (typeof msg == "function")
	                  msg = msg.apply(item, [d]);
	               if (typeof msg == "string")
	            	   textModule.breakString(item.message, d, span, 15);
	               else if (msg.nodeType)
	                  span.appendChild(msg);
	            }
	         }
	         div.appendChild(span);
	         
	         if (item.canClose) {
	            var a = d.createElement("a");
	               a.href = "javascript:;";
	               a.className = "lotusDelete";
	               a.title = this.nls.DISMISS;
	               on(a, "click", lang.hitch(this, "remove", item));
	               a.setAttribute("role", "button");
	               a.setAttribute("aria-hidden", false);
	               var img = d.createElement("img");
	                  img.alt = img.title = this.nls.DISMISS;
	                  img.src = this._blankGif;
	                  img.setAttribute("role", "presentation");
	               a.appendChild(img);
	               var span = d.createElement("span");
	                  span.className = "lotusAltText";
	                  span.appendChild(d.createTextNode("X"));
	               a.appendChild(span);
	            div.appendChild(a);
	         }
	
	      el.appendChild(div);
	      
	      // Set alert role after it is in the DOM
	      div.setAttribute("role", "alert");
	      
	      return div;
	   },
	   
	   update: function(m, scroll) {
	      var el = this.domNode;
	      html.removeChildren(el);
	
	      if (m && this.filter)
	         m = array.filter(m, this.filter, this);
	      
	      this.items = m = m || [];
	
	      for (var i=0; i<m.length; i++) {
	         var value = m[i];
	         value._id = i;
	         this.renderItem(el, value);
	      }
	      el.style.display = (m.length == 0) ? "none" : "";
	      if (scroll && (!this.isScrollAllowed || this.isScrollAllowed()))
	         dojoWindow.scrollIntoView(this.domNode);
	      this.onDisplayChange();
	   },
	   
	   remove: function(id, e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	
	      if (typeof id == "object")
	         id = id._id;
	      
	      var el = this.domNode;
	      if (!el)
	         return;
	      var nodes = el.childNodes;
	      for (var i=0; i<nodes.length; i++)
	         if (nodes[i]._id == id) {
	            html.removeChildren(nodes[i]);
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
	      this.onDisplayChange();
	   },
	
	   add: function(message, scroll) {
	      if (this.filter && !this.filter(message))
	         return;
	      
	      this.items.push(message);
	      message._id = this.items.length-1;      
	      var div = this.renderItem(this.domNode, message);
	      this.domNode.style.display = "";
	      if (scroll && (!this.isScrollAllowed || this.isScrollAllowed()))
	         dojoWindow.scrollIntoView(this.domNode);
	      this.onDisplayChange();
	   },
	   
	   replace: function(newMessage, oldMessage) {
	      var id = oldMessage._id;
	      var el = this.domNode;
	
	      // Find the old message node
	      var nodes = el.childNodes;
	      var oldNode = null;
	      for (var i=0; !oldNode && i < nodes.length; i++)
	         if (nodes[i]._id == id)
	            oldNode = nodes[i];
	      
	      if (!oldNode)
	         return;
	
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
	      html.removeChildren(oldNode);
	      this.onDisplayChange();
	   },
	
	   clear: function(exceptions) {
	      var items = this.items;
	      for (var i=0; i<items.length; i++) {
	         var value = items[i];
	         if (!value.refId || !exceptions || array.indexOf(exceptions, value.refId) == -1)
	            this.remove(value);
	      }
	      this.onDisplayChange();
	   },
	   onDisplayChange: function() {}
	});
	
	return MessageContainer;
});
