/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.ImagePop");
dojo.require("dijit._Widget");

dojo.declare("lconn.share.widget.ImagePop",[dijit._Widget], {
   showDelay: 100,
   hideDelay: 100,
   orient: "tl",

   buildRendering: function() {
      var d = document;
      var el = this.domNode = this.srcNodeRef;
      if (this.baseClass) dojo.addClass(el, this.baseClass);
      var t = this.target;
      dojo.forEach(["onMouseOver", "onMouseOut", "onHover", "onUnHover"], function(event){
         this.connect(t, event.toLowerCase(), "_"+event);
      }, this);
   },
   uninitialize: function(){
      this.close();
      if (this.largeImage) {
         this.largeImage.parentNode.removeChild(this.largeImage);
         this.largeImage = null;
      }
      if (this.listeners) {
         dojo.forEach(this._listeners, dojo.disconnect);
         delete this._listeners;
      }
   },
   
   _onMouseOver: function(/*Event*/ e) {this._onHover(e);},
   _onMouseOut: function(/*Event*/ e) {
      if (dojo.isDescendant(e.relatedTarget, e.target))
         return;
      this._onUnHover(e);
   },
   _onHover: function(/*Event*/ e){
      if (this._hideTimer) {
         clearTimeout(this._hideTimer);
         delete this._hideTimer;
      }
      if(!this._showTimer){
         var target = e.target;
         this._showTimer = setTimeout(dojo.hitch(this, function(){this.open(target)}), this.showDelay);
      }
   },
   _onUnHover: function(/*Event*/ e){
      if(this._focus){ return; }
      if(this._showTimer){
         clearTimeout(this._showTimer);
         delete this._showTimer;
      }
      if(!this._hideTimer)
         this._hideTimer = setTimeout(dojo.hitch(this,"close"), this.hideDelay);
   },
   _onMouseOverT: function() {
      if (this._connectNode) { this._onMouseOver({target: this._connectNode}); }
   },
   _onMouseOutT: function(e) {
      if(dojo.isDescendant(e.relatedTarget, e.target)){
         // false event; just moved from target to target child; ignore.
         return;
      }
      this._onUnHover({target: this._connectNode});
   },
   _onHoverT: function() {if (this._connectNode) { this._onHover({target: this._connectNode}); }},
   _onUnHoverT: function() {if (this._connectNode) { this._onUnHover({target: this._connectNode}); }},

   _getImage: function() {
      var img = this.largeImage;
      if (!img) {
         img = this.largeImage = document.createElement("img");
            img.src = this.target.src;
         dijit.popup.moveOffScreen(img);
         this._listeners = [
            dojo.connect(img, "onmouseover", this, "_onMouseOverT"),
            dojo.connect(img, "onmouseout", this, "_onMouseOutT"),
            dojo.connect(img, "onhover", this, "_onHoverT"),
            dojo.connect(img, "onunhover", this, "_onUnHoverT")
         ];
      }
      return img;
   },

   _disconnectTooltip: function() {
      dojo.forEach(this._listeners || [], function(l) {dojo.disconnect(l);});
      delete this._listeners;
   },
   left: function(small, large) {
      var l = small.x;
      if (this.orient.charAt(1) == (this.isLeftToRight() ? "r" : "l"))
         l -= (large.w - small.w);
      return l;
   },
   top: function(small, large) {
      var t = small.y;
      if (this.orient.charAt(0) == "b")
         t -= (large.h - small.h);
      return t;
   },
   open: function(/*DomNode*/ target){
      // summary: display the tooltip; usually not called directly.
      target = target || this.target;
      if (!target) return;
      if (this._showTimer) {
         clearTimeout(this._showTimer);
         delete this._showTimer;
      }
      var img = this._connectNode = this._getImage();
      img.style.display = "";
      var a = dojo.coords(this.target,true);
      var c = dojo.contentBox(this.target);
      a.h = c.h;
      a.w = c.w;
      var b = dojo.contentBox(img);
      dojo.marginBox(img, {
         l: this.left(a, b),
         t: this.top(a, b)
      });
      img.style.visibility = "";
   },
   
   close: function(){
      if(this._showTimer){
         clearTimeout(this._showTimer);
         delete this._showTimer;
      }
      delete this._connectNode;
      var img = this._getImage();
      img.style.display = "none";
      img.style.visibility = "hidden";
   }   
});
