/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.QuickTips');
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");
dojo.require("dijit._Widget");
dojo.require("dijit.Tooltip");

dojo.declare(
   "lconn.share.widget.QuickTips",
   [dijit._Widget],
   {
      url: (dojo.getObject("lconn.share.config.baseUri") || "/") + "tips.xml",
      tips: null,
      _strings: {},
      net: null,
      _strings: {},
      prefs: null,
      firstTip: null,
      newestTip: -1,
      allowHide: false,

      postMixInProperties: function() {
         this._strings = this.strings || this._strings;
         if (this.prefs) {
            this.hidden = this.hidden || this.prefs.get("ntp");
         }
         if (!this.hidden)
            this.load();
      },
      
      buildRendering: function() {
         var d = document;
         var el = this.domNode = this.srcNodeRef;
         if (this.baseClass) dojo.addClass(el, this.baseClass);
         
         this.update();
      },
      
      load: function() {
         if (!this.tips)
            this.net.getXml({
               url: this.url,
               handle: dojo.hitch(this, this.handleLoad)
            });
         else
            this.findActiveIndex();
      },
      
      handleLoad: function(response, ioArgs) {
         if (response instanceof Error) {
            this.tips = [];
            this.update();
         }
         else {
            var entries = response.documentElement.getElementsByTagName("entry");
            this.tips = [];
            for (var i=0,e; e=entries[i]; i++) {
               var title = lconn.share.util.dom.getElementByLanguage(e.getElementsByTagName("title"), djConfig.locale || "en");
               var nodes = dojo.filter(e.getElementsByTagName("content"), function(el) {return el.getAttribute("type") == "text/xhtml";});
               var content = lconn.share.util.dom.getElementByLanguage(nodes, djConfig.locale || "en");
            
               var t = {
                  id: lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementTextContent(e, "id"),0),
                  published: lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(e, "published")),
                  title: lconn.share.util.text.trim(lconn.share.util.dom.xmlText(title)),
                  xhtml: content
               };
               this.tips.push(t);
            }

            this.findActiveIndex();
            this.update();
         }
      },
      
      findActiveIndex: function() {
         if (this.tips.length > 0) {
            lconn.share.util.misc.sort(this.tips, ["id", -1]);
            
            var activeIndex = this.tips.length-1;
            var activeTip = this.prefs ? this.prefs.get("tip") : null;

            var previousLastTip = this.prefs ? this.prefs.get("ttp") : null;
            if (previousLastTip && previousLastTip != this.tips[0].id) {
               for (var i=0; i<this.tips.length; i++)
                  if (this.tips[i].id == previousLastTip) {
                     activeIndex = Math.max(0,i-1);
                     break;
                  }
            }
            else if (activeTip) {
               for (var i=0; i<this.tips.length; i++)
                  if (this.tips[i].id == activeTip) {
                     activeIndex = i;
                     break;
                  }
            }
            this.setActiveIndex(activeIndex);
         }
         else
            this.setActiveIndex(-1);
      },
      
      newer: function() {
         if (!this.tips)
            return;
         var index = this.getActiveIndex();
         if (index > 0) {
            this.setActiveIndex(index-1);
            this.update();
         }
      },
      
      older: function() {
         if (!this.tips)
            return;
         var index = this.getActiveIndex();
         if (index < 0) {
            this.setActiveIndex(1);
            this.update();
         }
         else if (index < (this.tips.length-1)) {
            this.setActiveIndex(index+1);
            this.update();
         }
      },
      
      getActiveIndex: function() {
         return this.activeIndex;
      },
      setActiveIndex: function(index) {
         this.activeIndex = index;
         if (this.prefs) {
         
            var tip = this.tips[index];
            this.prefs.put("tip", tip ? tip.id : null);
            this.prefs.put("ttp", this.tips[0].id);
         }
      },
      setActiveTip: function(tip) {
         var tip = tip.id;
         this.activeTip = tip;
         if (this.prefs)
            this.prefs.put("tip", tip);
      },
      
      update: function() {
         var d = document;
         var el = this.domNode;
         if (!el)
            return;
         if (this.hidden) {
            while (el.firstChild) el.removeChild(el.firstChild);
         }
         else if (this.tips && this.tips.length > 0) {
            while (el.firstChild) el.removeChild(el.firstChild);
            
            var totalTips = this.tips.length;
            var active = this.getActiveIndex();
            var t = this.tips[active];
            
            if (t.xhtml)
               lconn.share.util.html.xhtmlToHtml(d, t.xhtml, el, true);
            else if (t.html)
               el.innerHTML = t.html;
            else if (t.content) {
               var p = d.createElement("p");
                  p.appendChild(d.createTextNode(t.content));
               el.appendChild(p);
            }
            
            var title = t.title;
            if (title.length > 0) {
               var h3 = d.createElement("h3");
                  h3.appendChild(d.createTextNode(title));
               if (el.firstChild) el.insertBefore(h3, el.firstChild); else el.appendChild(h3);
            }
            
            if (totalTips > 1) {
               var div = d.createElement("p");
                  div.className = "lotusTiny";
                  if (this.allowHide) {
                     var a = d.createElement("a");
                        a.className = "lotusRight";
                        a.href = "javascript:;";
                        dojo.connect(a, "onclick", this, "hide");
                        a.appendChild(d.createTextNode(this._strings.HIDE_TIPS));
                     div.appendChild(a);
                  }
                  var ul = d.createElement("ul");
                     ul.className = "lotusInlinelist";
                     if (active > 0) {
                        var li = d.createElement("li");
                           li.className = "lotusFirst";
                           var a = d.createElement("a");
                              a.href = "javascript:;";
                              dojo.connect(a, "onclick", this, "newer");
                              a.appendChild(d.createTextNode(this._strings.NEWER));
                           li.appendChild(a);
                        ul.appendChild(li);
                     }
                     if (active < (totalTips-1)) {
                        var li = d.createElement("li");
                           li.className = (!ul.firstChild) ? "lotusFirst" : "";
                           var a = d.createElement("a");
                              a.href = "javascript:;";
                              dojo.connect(a, "onclick", this, "older");
                              a.appendChild(d.createTextNode(this._strings.OLDER));
                           li.appendChild(a);
                        ul.appendChild(li);
                     }
                  div.appendChild(ul);
               el.appendChild(div);
            }
         }
         else {
            if (!this._empty) {
               while (el.firstChild) el.removeChild(el.firstChild);
               var h3 = d.createElement("h3");
                  h3.appendChild(d.createTextNode(this._strings.H));
               el.appendChild(h3);
               var p = d.createElement("p");
                  p.appendChild(d.createTextNode(this._strings.P1));
               el.appendChild(p);
               var p = d.createElement("p");
                  p.appendChild(d.createTextNode(this._strings.P2));
               el.appendChild(p);
            }
            this._empty = true;
         }
      }
   }
);
