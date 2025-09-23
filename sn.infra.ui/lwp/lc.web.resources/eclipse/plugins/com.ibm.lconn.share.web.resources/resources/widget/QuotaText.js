/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.QuotaText');
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.html");
dojo.require("dijit._Widget");

dojo.declare("lconn.share.widget.QuotaText", [dijit._Widget], {
   defer: false,
   labelDefer: null,
   
   delayClick: 200,
   
   /** The size of the container. NaN means unknown, All other values are bytes. */
   size: NaN,
   /** The size of the quota. NaN means unknown, 0 means unlimited. All other values are bytes. */
   totalSize: NaN,
   
   buildRendering: function() {
      var d = document;
      var el = this.domNode = this.srcNodeRef;
      lconn.share.util.html.removeChildren(el);
      
      this.updateText();
   },
   
   onClick: function(e) {
      if (this.defer)
         this.load();
      this.defer = false;
      if (!this._clickDelay) {
         if (isNaN(this.size))
            this._clickDelay = setTimeout(dojo.hitch(this,"updateText"),this.delayClick);
         else
            this.updateText();
      }
   },
   clearTimer: function() {
      clearTimeout(this._clickDelay); 
      this._clickDelay = null;
   },
      
   update: function(size, totalSize) {
      this.clearTimer();
      this.size = size;
      this.totalSize = totalSize;
      this.showError = false;
      this.updateText();
   },
   error: function(error) {
      this.clearTimer();
      this.size = this.totalSize = NaN;
      this.err = error;
      this.showError = true;
      this.updateText();
   },
   
   updateText: function() {
      this.clearTimer();
      var d = document;
      var nls = this._strings;
      var size = this.size;
      var total = this.totalSize;
      var el = this.domNode;
      var nls = this._strings;
      lconn.share.util.html.removeChildren(el);
      if (!isNaN(size)) {
         if (total > 0) {
            if (size <= total) {
               s = dojo.string.substitute(nls.LABEL_QUOTA, {
                  person: this.userName,
                  size: lconn.share.util.text.formatSize(this._sizeStrings, total - size), 
                  total: lconn.share.util.text.formatSize(this._sizeStrings, total)
               });
            }
            else {
               s = dojo.string.substitute(nls.LABEL_QUOTA_EXCEEDED, {
                  person: this.userName,
                  size: lconn.share.util.text.formatSize(this._sizeStrings, size - total), 
                  total: lconn.share.util.text.formatSize(this._sizeStrings, total)
               });
            }
            el.appendChild(d.createTextNode(s));
         }
         else if (!this.hideUnlimited) {
            s = dojo.string.substitute(nls.LABEL_UNLIMITED, {
               person: this.userName,
               size: lconn.share.util.text.formatSize(this._sizeStrings, size)
            });
            el.appendChild(d.createTextNode(s));
         }
      }
      else if (this.showError)
         el.appendChild(d.createTextNode(nls.LABEL_ERROR));
      else if (this.defer) {
         var a = d.createElement("a");
         a.href = "javascript:;";
            a.appendChild(d.createTextNode(this.labelDefer));
            this.connect(a, "onclick", "onClick");
         el.appendChild(a);
      }
      else
         el.appendChild(d.createTextNode(nls.LOADING));
   }
});
