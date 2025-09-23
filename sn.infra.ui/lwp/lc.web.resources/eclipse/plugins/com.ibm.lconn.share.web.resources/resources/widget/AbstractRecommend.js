/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.AbstractRecommend');
dojo.require("dijit._Widget");

dojo.declare("lconn.share.widget.AbstractRecommend", dijit._Widget, {
   
   userRecommended: false,
   timesRated: -1,
   
   baseClass: "lotusRecommend",
   _strings: {
   /* Pass the same strings here that are passed to lconn.share.widget.AbstractRecommendInfo" */
   },

   postMixInProperties: function() {
      // support both _strings and nls as arguments
      this.nls = this._strings = this.nls || this._strings;
   },
   
   buildRendering: function() {
      var d = document;
      var el = this.domNode = this.srcNodeRef;
      if (this.baseClass) dojo.addClass(el, this.baseClass);
      
      this.update();
   },
   
   getIconUrl: function() {
      return dojo.config.blankGif;
   },
   
   getIconClassName: function() {
      var type = "lconnSprite lconnSprite-iconRating";
      type += this.small ? "11": (this.large ? "16":"14");
      type += this.userRecommended ? "-on" : "-off";
      return type;
   },
   
   update: function() {
      var d = document;
      var el = this.domNode;
      if (!el) return;
      dojo.addClass(el, "lotusClickable");
      
      var nls = this._strings;
      var isRecommended = this.userRecommended;
      
      if (!el.firstChild) {
         var img = this.imgNode = d.createElement("img");
            var linkId = img.id = this.id + "_link";
            img.alt = "";
         el.appendChild(img);

         var label = this.labelNode = d.createElement("label");
            label.className = "lotusClickable";
            dojo.attr(label, "for", linkId);
            label.appendChild(d.createTextNode(nls.LABEL_TRUE + "\u0020"));
            label.style.display = "none";
         el.appendChild(label);
         
         var a = this.linkNode = d.createElement("a");
            dijit.setWaiRole(a, "button");
            a.className = "lotusAction";
            a.href = "javascript:;";
         el.appendChild(a);       
         
         dojo.connect(el, "onclick", dojo.hitch(this, this.toggleRecommend));
      }
      
      var i = this.imgNode;
      i.className = this.getIconClassName();
      i.src = this.getIconUrl();
      
      el.title = isRecommended ? nls.UNRECOMMEND_TOOLTIP : nls.RECOMMEND_TOOLTIP;
      
      var n = this.labelNode;
      n.style.display = isRecommended ? "" : "none";
      
      var a = this.linkNode;
      while (a.firstChild) a.removeChild(a.firstChild);
      a.appendChild(d.createTextNode(isRecommended ? nls.UNRECOMMEND : nls.LABEL_FALSE));
      
      a.title = el.title;
   },
   
   toggleRecommend: function(e) {
      this.recommend(!this.userRecommended, e);
   },
   
   /**
    * Implement this method to handle saving a changed recommendation.
    * 
    * <pre>
    * recommend: function(recommended,e) {
    *   if (e) dojo.stopEvent(e);
    *   ...
    * },
    * </pre>
    * 
    * When the recommendation has been updated on the server, do the following:
    * 
    * <pre>
    *    this.userRecommended = <new value> 
    *    this.timesRated = <new value>
    *    this.update();
    *    this.onrecommend(this.userRecommended, this.timesRated);
    * </pre>
    * 
    * If an error occurs, display the error in a lightbox (or inline if available).
    */
 
   onrecommend: function(userRecommended, timesRated) {}
});
