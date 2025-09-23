/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.AbstractRecommendInfo');
dojo.require("dijit._Widget");
dojo.require("dojo.number");
dojo.require("lconn.core.widget.MenuLauncher");

dojo.declare("lconn.share.widget.AbstractRecommendInfo", lconn.core.widget.MenuLauncher, {
   
   openDelay: 250,
   preloadDelay: 150,
   hideDelay: 400,
   /** 
    * When a user clicks on the link, don't allow toggling until the popup has been open for this many 
    * milliseconds. This prevents accidental toggles by new users.  This is ignored when the user's recommendation
    * info is displayed in the UI (!countOnly)
    */
   hesitateToggleDelay: 800,
   
   /** Has the current user recommended this file?  Should be false if the user is unauthenticated */
   userRecommended: false, 
   /** Total number of recommendations for this item, -1 indicates error. */
   timesRated: -1, 
   /** If true, only display the icon and a count.  Otherwise display a full text string */
   countOnly: false,
   
   /**
    * small: false, // Display the icon as 11px if true, 14px otherwise
    * large: false, // Display the icon as 16px if true, 14px otherwise
    */
   
   _strings: {
   /* These are the strings for this class.  Replace <noun> with "file", "page", etc. You must pass an object with the these keys:

      ALT_TEXT : "Recommendations",
      ERROR : "An error has occurred.",
      ERROR_RETRIEVE : "Unable to retrieve recommendations at this time.",
      LABEL_FALSE : "Recommended this <noun>.",
      LABEL_A_MANY : "${0} people recommended this:",
      LABEL_A_ONE : "1 person recommended this:",
      LABEL_R_MANY : "${0} other people recommended this:",
      LABEL_R_ONE : "1 other person recommended this:",
      LABEL_HIDDEN_MANY : "${0} others not shown",
      LABEL_HIDDEN_ONE : "1 other not shown",
      LABEL_TRUE : "You have recommended this <noun>.",
      LOADING : "Loading...",
      NOT_RECOMMENDED : "No recommendations",
      ONE_HAS_RECOMMENDED : "1 person",
      RECOMMEND : "Recommend",
      RECOMMEND_TOOLTIP : "Recommend this <noun> to your colleagues",
      UNRECOMMEND : "Undo",
      UNRECOMMEND_TOOLTIP : "Remove your recommendation from this <noun>",
      X_HAVE_RECOMMENDED : "${0} people",
      YOU_AND_ONE_HAVE_RECOMMENDED : "You and 1 other",
      YOU_AND_X_HAVE_RECOMMENDED : "You and ${0} others",
      YOU_HAVE_RECOMMENDED : "You have recommended"      
    */
   },

   postMixInProperties: function() {
      // support both _strings and nls as arguments
      this.nls = this._strings = this.nls || this._strings;
   },
   
   buildRendering: function() {
      var d = document;
      if (this.srcNodeRef.nodeName.toLowerCase() != "a")
         throw "AbstractRecommendInfo requires an 'A' element passed as the dom node";
      this.inherited(arguments);
      var el = this.domNode;
      if (this.baseClass) dojo.addClass(el, this.baseClass);
      dijit.setWaiRole(el, "button");
      if (!this._rendered)
         this.update();
   },
   
   getIconUrl: function() {
      return dojo.config.blankGif;
   },
   
   getIconClassName: function() {
      var type = "lconnSprite lconnSprite-iconRating";
      type += this.small ? "11": (this.large ? "16":"14");
      type += (this.timesRated > 0 ? "-on":"-off");
      return type;
   },
   
   /** 
    * Subclasses must implement this method, which instantiates the popup widget and associates it with this widget.  Be sure
    * to pass the strings from this widget to the popup.  Must return a deferred object.
    * 
    * See lconn.files.widget.RecommendInfo for a Files specific-example  
    */
   _initMenu: function() {},
   
   update: function() {
      var d = document;
      var el = this.domNode;
      
      var countOnly = this.countOnly;
      var nls = this._strings;
      var number = dojo.number.format(this.timesRated);
      
      if (!el.firstChild) {
         dojo.attr(this.domNode, "aria-owns", this.menuId);
         var img = this.imgNode = el.appendChild(d.createElement("img"));
            img.src = this.getIconUrl();
         if (countOnly) {
            var altSpan = el.appendChild(d.createElement("span"));
               altSpan.className = "lotusAltText";
               altSpan.appendChild(d.createTextNode(nls.ALT_TEXT));
               altSpan.appendChild(d.createTextNode(" "));
         }
         var label = this.labelNode = el.appendChild(d.createElement("span"));
            label.className = "lotusMeta";
      }
      
      var img = this.imgNode;
      img.className = this.getIconClassName();
      img.alt = countOnly ? nls.ALT_TEXT : "";
      
      var label = this.labelNode;
      while (label.firstChild) label.removeChild(label.firstChild);
      
      var descriptionText;
      if (countOnly) {
         descriptionText = "\u00a0" + number;
      }
      else {
         dijit.setWaiState(el, "pressed", this.userRecommended);

         if (this.timesRated <= 0) {
            if (this.userRecommended) {
               descriptionText = nls.ERROR_RETRIEVE;
            }
            else {
               descriptionText = nls.NOT_RECOMMENDED;
            }
         }
         else if (this.userRecommended) {
            if (this.timesRated == 1)
               descriptionText = nls.YOU_HAVE_RECOMMENDED;
            else if (this.timesRated == 2)
               descriptionText = nls.YOU_AND_ONE_HAVE_RECOMMENDED;
            else
               descriptionText = dojo.string.substitute(nls.YOU_AND_X_HAVE_RECOMMENDED, [number-1]);
         }
         else {
            if (this.timesRated == 1)
               descriptionText = nls.ONE_HAS_RECOMMENDED;
            else
               descriptionText = dojo.string.substitute(nls.X_HAVE_RECOMMENDED, [number]);
         }
      }
      label.appendChild(d.createTextNode(descriptionText));
   },

   onrecommend: function(userRecommended, timesRated) {
      this.userRecommended = userRecommended;
      this.timesRated = timesRated;
      this.update();
   },
   
   onBeforeOpen: function(eventType) {
      var isClick = (eventType == "click");
      var menu = this.menu;
      var shouldCancelOpen = false;
      if (!this.countOnly) {
         if (menu.info && (menu.info.timesRated - menu.info.isUserRecommended ? 1 : 0) < 1) {
            var r = menu.recommender;
            if (r && isClick)
               r.toggleRecommend();
            shouldCancelOpen = !!(!isClick || r);
         }
      }
      else if (menu.info && menu.info.timesRated == 0 && !isClick)
         shouldCancelOpen = true;
      
      // when we cancel open and the user can recommend, we should have a tooltip
      if (shouldCancelOpen) {
         var s;
         if (menu.recommender)
            s = this.nls.RECOMMEND_TOOLTIP;
         else if (menu.info && menu.info.timesRated == 0)
            s = this.nls.NOT_RECOMMENDED;
         this.domNode.title = s;
      } else {
         dojo.removeAttr(this.domNode, "title");
      }
      
      return shouldCancelOpen;
   },
   
   onOpen: function(eventType) {
      var isClick = (eventType == "click");
      if (isClick)
         this.focusMenu();
      var menu = this.menu;
      if (menu && menu.recommender && isClick) {
         var r = menu.recommender;
         if (this._openedLong || !this.countOnly)
            r.toggleRecommend();
         else
            r.recommend(true);
      }
      if (!this._ot)
         this._ot = setTimeout(dojo.hitch(this, function() {this._openedLong = true;}), this.hesitateToggleDelay);
   },
   
   onClose: function() {
      clearTimeout(this._ot); this._ot = null;
      this._openedLong = false;
   }
});
