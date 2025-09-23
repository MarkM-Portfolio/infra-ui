/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.AbstractRendererSocial");

dojo.declare("lconn.share.widget.AbstractRendererSocial", null, {
   allowMultipleExpand: function(stream) {
      return true;
   },
   
   renderItemExpand: function(stream, data, item, position) {
      var d = document;
      var tr = item.element;
      var trd = item.elementDetails || item.elementExtra;
   
      var td = trd.lastChild;
         var div = d.createElement("div");
            div.className = "_qkrMessage";
         td.appendChild(div);
   
      this.renderLoadingLink(stream, tr);
   
      item._expanding = true;
      this.net.getXml({
         url: item._isEcmFile ? this.routes.getProxiedUrl(this.getUrlExpand(item), {commonProxy: true}) : this.getUrlExpand(item),
         handle: dojo.hitch(this, this.completeItemExpand, stream, data, item, position, arguments),
         timeout: stream.timeoutRetrieve*1000,
         auth: {
            preventReload: true, 
            onLogin: dojo.hitch(this, this.renderItemExpand, stream, data, item, position)
         }
      });
   },
     
   completeItemExpand: function(stream, data, item, position, originalArguments, response, ioArgs) {
      var d = document;
      var tr = item.element;
      var trd = item.elementDetails || item.elementExtra;
      var td = trd.lastChild;
   
      item._expanding = false;
      
      for (var next,el=trd.lastChild.firstChild; el;) {
         next = el.nextSibling;
         if (dojo.hasClass(el, "_qkrMessage"))
            el.parentNode.removeChild(el);
         el = next;
      }
      
      if (response instanceof Error) {
         var errStrings = this._appstrings.FILE.EXPAND_ERROR;
         var errorCode = response.code;
         
         var errText;
         if(errorCode == "cancel")
            errText = errStrings.CANCEL;
         else if (errorCode == "timeout")
            errText = errStrings.TIMEOUT;
         else if (errorCode == "ItemNotFound" || errorCode == "AccessDenied")
            errText = errStrings.NOT_FOUND;
         else
            errText = errStrings.GENERIC;
   
         var errorDiv = d.createElement("div");
            errorDiv.className = "lotusFormError _qkrMessage";
            errorDiv.appendChild(d.createTextNode(errText));
         td.appendChild(errorDiv);
         
         this.renderHideLink(tr);
         trd.style.display = "";
      }
      else {
         // Replace item with newly constructed item
         var newArguments = dojo._toArray(originalArguments);
         item = newArguments[2] = this.replaceItem(data, item, response.documentElement);
         this._renderItemExpand.apply(this,newArguments);
      }
   },
   
   toggleByElement: function(stream, e) {
      // Ignore right-clicks
      if (!e || e.button > (dojo.isIE ? 1:0))
         return;

      var t = e.target;
      var testNodes = {td:1,th:1};
      if (t && t.nodeName) {
         if (dojo.indexOf(["div","ul","h4","td","th"],t.nodeName.toLowerCase()) != -1) {
            while (!testNodes[t.nodeName.toLowerCase()])
               t = t.parentNode;
            var tr = t.parentNode;
            
            // Don't expand from clicking on an active drag handle
            if (dojo.hasClass(t, "dojoDndHandle") && dojo.hasClass(tr, "dojoDndItemOver"))
               return;
            
            if (tr.style.cursor == "pointer" || t.style.cursor == "pointer") {
               var i = dojo.indexOf(tr.parentNode.childNodes, tr);
               i = Math.floor(i / 2);
               if (stream.xsltAct)
                  stream.xsltAct("toggleItem", i, e);
               else
                  this.toggleItem(stream, i);
            }
         }
      }      
   },

   expandItem: function(stream, data, item, position) {
      var el = item.element;
      var trd = item.elementDetails;
      el.style.cursor = trd.style.cursor = "";

      this.renderHideLink(el);
      this.showNodes(trd, "");

      var nodes = el.firstChild.nextSibling.lastChild.childNodes;
      for (var i=0; i<nodes.length; i++)
         if (this.isSkipNode(nodes[i])) {
            var s = nodes[i].previousSibling;
            while (s) {
               s.style.display = "";
               s = s.nextSibling;
            }
            break;
         }
   },
   
   collapseItem: function(stream, data, item, position) {
      var el = item.element;
      var trd = item.elementDetails;
      el.style.cursor = trd.style.cursor = "pointer";

      this.renderShowLink(el);
      this.showNodes(trd, "none");

      var nodes = el.firstChild.nextSibling.lastChild.childNodes;
      for (var i=0; i<nodes.length; i++)
         if (this.isSkipNode(nodes[i])) {
            var s = nodes[i].previousSibling;
            while (s) {
               s.style.display = "none";
               s = s.nextSibling;
            }
            break;
         }
   },
   
   isSkipNode: function(el) {
      return false;
   },
   
   _updateItem: function(stream, data, el, item, oldItem, position) {
      var d = document;
      
      var div = oldItem.element;
      var div2 = oldItem.elementDetails;
      
     // oldItem.element = oldItem.elementDetails = null;

      this.renderItem(stream, el, data, item, position, position == 0, position == data.itemByPosition.length-1, div, div2);

      if (oldItem._isExpanded) {
         item._isRendered = true;
         item._isExpanded = true;
         this._renderItemExpand(stream, data, item, position);
      }
   },
   
   renderHideLink: function(tr) {
      var a = tr.lastChild.firstChild;
         dojo.addClass(a,"qkrMoreLinkOpen");
         a.removeChild(a.firstChild);
         a.appendChild(document.createTextNode(this._strings.HIDE));
         a.title = this._appstrings.CONTENT.HIDE_EXTRA;
         dijit.setWaiRole(a, "button");
         dijit.setWaiState(a, "expanded", true);
   },
   renderShowLink: function(tr, trd) {
      var a = tr.lastChild.firstChild;
         dojo.removeClass(a,"qkrMoreLinkOpen");
         a.removeChild(a.firstChild);
         a.appendChild(document.createTextNode(this._strings.MORE));
         a.title = this._strings.VIEW_EXTRA;
         dijit.setWaiRole(a, "button");
         dijit.setWaiState(a, "expanded", false);
   },
   renderLoadingLink: function(stream, tr) {
      var a = tr.lastChild.firstChild;
         dojo.removeClass(a,"qkrMoreLinkOpen");
         a.removeChild(a.firstChild);
         a.title = "";
         var img = document.createElement("IMG");
            img.className = "lotusLoading";
            img.alt = stream._strings.MORE_LOAD;
            img.src = dojo.config.blankGif;
         a.appendChild(img);
   },
   
   renderDivider: function(d,el) {
      var span = d.createElement("span");
         span.className = "lotusDivider";
         span.appendChild(d.createTextNode("|"));
         dijit.setWaiState(span, "hidden", true);
         dijit.setWaiRole(span, "img");
      el.appendChild(span);
   },
   
   showNodes: function(trd, display) {
      if (!trd.lastChild.firstChild)
         trd.style.display = "none";
      else
         trd.style.display = display;
   },
   
   renderExternalIcon: function(el, item, msg, altText) {
	   if(dojo.isIE < 9 && el.nodeName.toLowerCase()== "td") {
		   el = el.firstChild;
	   }
      if (el && dojo.getObject("lconn.share.config.features.sharingIntent") && item && item.isExternal()) {
         if (this.app && this.app.isCommunityScene && this.app.isExternalCommunity)
            return;
         else {
            var img = document.createElement("img");;
               img.src = dojo.config.blankGif;
               img.className = "lconnIconListSharedExternal";
               img.title = msg;
               img.alt = "";
               img.style.marginTop = "1px";
               img.style[dojo._isBodyLtr() ? "marginLeft":"marginRight"] = "5px";
            el.appendChild(img);
            var alt = document.createElement("span");
               alt.className = "lotusAltText";
               alt.appendChild(document.createTextNode(", " + altText));
            el.appendChild(alt);
         }
      }
   }
});
