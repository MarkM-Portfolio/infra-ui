/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.Quota');
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.html");
dojo.require("dijit._Widget");

dojo.declare("lconn.share.widget.Quota", [dijit._Widget], {
   wImage: 400,
   wWidget: 90,
   
   /** The size of the container. -1 means unknown, All other values are bytes. */
   size: -1,
   /** The size of the quota. -1 means unknown, 0 means unlimited. All other values are bytes. */
   totalSize: -1,
   
   showFree: true,
   
   buildRendering: function() {
      var d = document;
      var el = this.domNode = this.srcNodeRef;
      lconn.share.util.html.removeChildren(el);
      
      var nls = this._strings;
      var span = el;
         span.className = this.baseClass || "lotusBtn lotusBtnAction";
         span.style.width = this.wWidget+"px";
         var a = this.barNode = d.createElement("a");
            a.style.background = "#F1F2F4";
            a.style.backgroundImage = "url(/files/images/progressBarFull.png)";
            a.style.backgroundRepeat = "no-repeat";
            a.href = "javascript:;";
            dijit.setWaiRole(a, "button");
            this.updateImage();
         span.appendChild(a);
      this.connect(a, "onclick", "onClick");
   },
   
   onClick: function(e) {
      this.showFree = !this.showFree;
      this.onToggle(this.showFree);
      this.updateImage();
   },
   onToggle: function(showFree) {},
      
   update: function(size, totalSize) {
      this.size = size;
      this.totalSize = totalSize;
      this.showError = false;
      this.updateImage();
   },
   error: function(error) {
      this.size = this.totalSize = -1;
      this.err = error;
      this.showError = true;
      this.updateImage();
   },
   
   updateImage: function() {
      var d = document;
      var nls = this._strings;
      var size = this.size;
      var total = this.totalSize;
      var a = this.barNode;
      lconn.share.util.html.removeChildren(a);
      if (size != -1) {
         var showFree = this.showFree;
         if (total > 0) {
            var fraction = size / total;
            a.style.backgroundPosition = this.getOffset(fraction) + "px center";
            a.title = dojo.string.substitute(nls.MSG, [Math.round(fraction * 100), lconn.share.util.text.formatSize(this._sizeStrings, total)]);
         }
         else {
            showFree = false;
            a.style.backgroundPosition = (-this.wImage) + "px center";
            a.title = nls.UNLIMITED_TITLE;
         }
         var s = (showFree) 
                  ? dojo.string.substitute(nls.LABEL_FREE, [lconn.share.util.text.formatSize(this._sizeStrings, total - size)])
                  : dojo.string.substitute(nls.LABEL_USED, [lconn.share.util.text.formatSize(this._sizeStrings, size)]);
         a.appendChild(d.createTextNode(s));
      }
      else {
         a.style.backgroundPosition = (-this.wImage) + "px center";
         a.appendChild(d.createTextNode((this.showError ? nls.LABEL_ERROR : nls.LOADING)));
         a.title = "";
      }
   },
   
   getOffset: function(fraction) {
      var w = Math.round(fraction * this.wWidget);
      var y = this.isLeftToRight() ? (w - this.wImage) : (this.wWidget - w)
      return y;
   }
});
