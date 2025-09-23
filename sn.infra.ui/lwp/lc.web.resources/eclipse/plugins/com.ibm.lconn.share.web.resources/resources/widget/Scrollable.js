/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
   
dojo.provide('lconn.share.widget.Scrollable');

/**
 * Provide methods to make a div scrollable, including adding css style, adjust height according to v
 * 
 * TODO horizontal scroll is not supported yet. 
 */
dojo.declare("lconn.share.widget.Scrollable", null, {
   _element: null, 
   _options: null, 
   _minHeight: 0,
   _windowResizeListener: null,
   _onScrollListener: null,
   _suppressPageScroll: true, // Indicate whether page scroll is suppressed. 
   _modalDialogShowing: false, // Whether a modal dialog is showing.
   
   /**
   * @param el the DIV element to be added scroll capability.
   * @param opt options like min-height, max-height. 
   */
   constructor: function(el, opt) {
      if (!el) {
         console.warn("Try to add scroll capability to undefined element");
         return;
      }
      
      this._element = el;
      this._options = opt || {};
      this._minHeight = this._options.minHeight || 100;
      
      // Set CSS style
      this.configPage();
      this._addStyle();
      
      // Calculate initial height
      this._onWindowResize();
      
      // Add listener
      this._windowResizeListener = dojo.connect(window, "resize", dojo.hitch(this, "_onWindowResize"));
      // this._onScrollListener = dojo.connect(this._element, "onscroll", dojo.hitch(this, "_onScroll"));
      dojo.subscribe("lconn/share/scene/render", this, "_adjustHeight");  // Event published when scene is rendered
      dojo.subscribe("lconn/share/scene/updated", this, "_adjustHeight"); // Event published by DOM change after scene is initialized
      dojo.subscribe("lconn/share/message/updated", this, "_adjustHeight"); // Event published by DOM change after a message is updated
      dojo.subscribe("lconn/share/scene/modal-dialog/shown", this, "_onModalDialogShown");  // Event published when scene is rendered
      dojo.subscribe("lconn/share/scene/modal-dialog/closed", this, "_onModalDialogClosed"); // Event published by DOM change after scene is initialized
      dojo.subscribe("lconn/share/scene/loadListData", this, "_adjustHeight");  // Event published when scene is rendered
   },
   
   /**
    * Utility to config html page to be ready to use this scroll capability. 
    */
   configPage: function() {
      if (!this._isIndependentScrollbarsEnabled())
         dojo.addClass(document.documentElement, "files-independent-scrollbars-compatible");
      
      this._disablePageScrollbar();
   },
   
   /**
    * Add CSS for scroll capability 
    */
   _addStyle: function() {
      if (!this._element)
         return;
      
      this._element.style.overflowY = "auto";
      this._element.style.overflowX = "hidden";
      this._element.style.minHeight = this._minHeight + "px";
      this._element.style.boxSizing = "border-box";
      this._element.style.marginBottom = ( this._options.marginBottom || 10 ) + "px";
      
      dojo.addClass(this._element, "lotusStyledScroll");
    },
    
    _isIndependentScrollbarsEnabled: function() {
       return dojo.hasClass(document.documentElement, "files-independent-scrollbars-compatible"); 
     },

    _isPageScrollbarEnabled: function() {
      return !dojo.hasClass(document.body, "lconnNonVerticalScrollableBody"); 
    },
    
    _enablePageScrollbar: function() {
       if (!this._isPageScrollbarEnabled())
          dojo.removeClass(document.body, "lconnNonVerticalScrollableBody");
    },

    _disablePageScrollbar: function() {
       if (this._isPageScrollbarEnabled() && !this._modalDialogShowing)
          dojo.addClass(document.body, "lconnNonVerticalScrollableBody");
    },
     
    _onModalDialogShown: function() {
       this._modalDialogShowing = true;
       this._enablePageScrollbar();
    },
     
    _onModalDialogClosed: function() {
       this._modalDialogShowing = false;
       this._disablePageScrollbar();
       this._adjustHeight();
    },

    _onWindowResize: function() {
       this._adjustHeight();
   },
   
   _onScroll: function() {
      this._adjustHeight();
   },
   
   _adjustHeight: function() {
      if (!this._isIndependentScrollbarsEnabled())
         return;

      // If the attached element is not DOM, no need to adjust.
      if (!this._element || !document.body.contains(this._element))
         return;
      
      var vp = dojo.window.getBox();
      
      if (this._suppressPageScroll && vp.t > 0) {
         window.scroll(vp.l, 0);
         vp = dojo.window.getBox();
      }

      var elPos = dojo.position(this._element);
      var height = vp.h > elPos.y ? vp.h - elPos.y : 0;
      
      this._element.style.height = height + "px";
      
      dojo.publish("lconn/share/widget/scrollable/adjusted", [this]);

      // If height is smaller than minHeight, bring back page level scrollbar. 
      if (height < this._minHeight) {
         this._enablePageScrollbar();
      } 
      else {
         this._disablePageScrollbar();
      }
   }
});
