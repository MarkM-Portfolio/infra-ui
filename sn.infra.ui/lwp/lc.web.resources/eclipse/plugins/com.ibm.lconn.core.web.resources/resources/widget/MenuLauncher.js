/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

/**
 * Loosely based on dijit.form.DropDownButton. Enable a link that will launch a
 * menu. This class also provides the capability to instantiate the menu on
 * demand. You must pass an existing link as the source ref.
 *
 * @class lconn.core.widget.MenuLauncher
 * @extends dijit._Widget
 */
dojo.provide("lconn.core.widget.MenuLauncher");
dojo.require("dijit._Widget");

dojo.declare("lconn.core.widget.MenuLauncher", dijit._Widget, /** @lends lconn.core.widget.MenuLauncher.prototype */ {
   hideDelay: 1000,
   openDelay: 0,
   preloadDelay: 0, // if greater than zero, load in the background during the open delay

   classActive: "lotusHover",
   activeParent: 0,
   /** Set to true if you want focus events to open this menu */
   activateOnFocus: false,
   /** Set to true if you want focus events to open this menu */
   activateOnMouseOver: true,

   widthAdjust: 0,

   orient: {'BL':'TL', 'BR':'TR', 'TL':'BL', 'TR':'BR'},
   orientRTL: {'BR':'TR', 'BL':'TL', 'TR':'BR', 'TL':'BL'},

   //optMenu: {}, //arguments that should be passed to the menu when initialized

   buildRendering: function() {
      this.domNode = this.popupStateNode = this.srcNodeRef;
      /*
       * This check allows customers to disable mega menus on hover
       * by removing the onmouseover attribute from customized
       * header.jsp
       */
      var activateOnMouseOver = this.activateOnMouseOver;
      // If the widget is attached to a list item like in the banner
      if (this.domNode.tagName === "LI") {
         var anchorMenu = dojo.query('>a', this.domNode)[0];
         // Disable if the customer removed the onmouseover attribute from the anchor
         if (anchorMenu && !anchorMenu.onmouseover)
            activateOnMouseOver = false;
      }
      if (activateOnMouseOver)
         this.connect(this, "onMouseEnter", "_delayOpen");
      this.connect(this, "onMouseEnter", "_delayOpen");
      this.connect(this, "onMouseLeave", "_delayClose");
      if (this.activateOnFocus) {
         this.connect(this, "onFocus", "_delayOpen");
         this.connect(this, "onBlur", "_closeMenu");
      }
      else
         this.connect(this, "onClick", "_onClick");
      this.menuId = this.menuId || dojo.attr(this.domNode, "aria-owns") || dojo.attr(this.domNode, "aria-describedby") || (this.id ? (this.id +"_popup") : dijit.getUniqueId("ml"));
      this.externalContent = dojo.attr(this.domNode, "external-content");

      // We're done with the srcNode at this point
      // Removing it fixes an IE focus-loss problem replacing a DOM node with itself
      delete this.srcNodeRef;
   },

   decorateAria: function() {
      dojo.attr(this.domNode, "aria-owns", this.menuId);
   },

   whenInit: function() {
      // decorate aria only after menu is initialized to avoid invalid id reference
     this.decorateAria();
      var dfd = this._initDfd;
      if (!dfd) {
         var ret = this._initMenu();
         if (!(ret instanceof dojo.Deferred)) {
            if (!this.menu)
               throw "_initMenu must initialize this.menu or return a deferred";
            ret = new dojo.Deferred();
            ret.callback(this.menu);
         }
         dfd = this._initDfd = ret;
         dfd.addCallback(this, "initFinal").addErrback(this, function() {this._initDfd = null;});
      }
      return dfd;
   },

   /**
    * Called after this.menu is set
    */
   initFinal: function() {
      // attach a hidden widget reference node to ensure that the widget gets destroyed
      var menu = this.menu;
      menu._launcher = this;
      dijit.popup.moveOffScreen(menu.domNode);
      var span = document.createElement("span");
      span.style.display = "none";
      dojo.attr(span, "widgetId", menu.id);
      dojo.body().appendChild(span);

      var activeNode = this.domNode;
      for (var i=0; i<this.activeParent; i++)
         activeNode = activeNode.parentNode;
      this.activeNode = activeNode;

      if (this.externalContent) {
         var content = dijit.byId(this.externalContent);
         this.connect(content, "onMouseEnter", "_openMenu");
         this.connect(content, "onMouseLeave", "_delayClose");
         this.connect(content, "onClose", "_closeMenu");
         dojo.connect(this, "onOpen", dojo.hitch(this, function() {
            dojo.style(this.menu.domNode, {
               padding: 0
            });

            var pos = dojo.position(dojo.byId(content.bindto), true);
            dojo.style(content.domNode, {
               top: pos.y + 'px',
               left: pos.x + 'px',
               height: pos.h + 'px',
               width: pos.w +'px',
               zIndex: 2000
            });
            content.show(arguments);
         }));
         dojo.connect(this, "onClose", function() {
           content.hide();
         });
      }

      this.connect(menu, "onMouseEnter", "_openMenu");
      this.connect(menu, "onMouseLeave", "_delayClose");

   },

   /**
    * Should create a dropdown widget and set it to this.menu.  May optionally
    * return a dojo.Deferred to indicate that processing may take some time.
    */
   _initMenu: function() {
      throw "Must override initMenu() to do dynamic loading";
   },

   /**
    * @param {Event} e The event
    */
   _onClick: function(e) {
      if (e) dojo.stopEvent(e);
      this._openMenu("click");
   },

   _preloadMenu: function() {
      this.whenInit().addCallback(this, function() {
         var menu = this.menu;
         var dlcp = dojo.getObject("dijit.layout.ContentPane");
         if (menu._preload)
            menu._preload();
         else if (dlcp && menu instanceof dlcp) {
            // only preload if there are no inflight requests
            if (menu.isLoaded || menu.isFailed || menu._xhrDfd)
               return;
            menu._load();
         }
      });
   },

   /**
    * @param {String}
    *           [eventType] Type of the event
    */
   _openMenu: function(eventType) {
      this._shouldBeOpen = true;
      this.whenInit().addCallback(this, function() {
         if ((!this._opened && this._closing) || !this._shouldBeOpen)
            //_delayClose was called before init completed, and item has not yet been opened
            return;

         if (typeof eventType != "string")
            eventType = null;
         this._delayEnd();
         var menu = this.menu;
         if (!menu) { return; }
         if (!this._opened) {
            // If there's an href, then load that first, so we don't get a flicker
            if (menu.href && !(menu.isLoaded || menu.isFailed)) {
               var self = this;
               var onLoadHandler = dojo.connect(menu, "onLoad", function(){
                  dojo.disconnect(onLoadHandler);
                  self._openFinal(eventType);
               });
               var onDownloadErrorHandler = dojo.connect(menu, "onDownloadError", function(){
                  dojo.disconnect(onDownloadErrorHandler);
                  self._openFinal(eventType);
               });
               this._preloadMenu();
               return;
            }
            else
               this._openFinal(eventType);
         }
         else
            this.onOpen(eventType);
      });
   },

   /**
    * @param {String}
    *           [eventType] Type of the event
    */
   _openFinal: function(eventType){
      if (!this._shouldBeOpen)
         return;
      if (typeof eventType != "string")
         eventType = null;

      var menu = this.menu;
      var oldWidth=menu.domNode.style.width;
      var self = this;
      if (lconn.core.widget.MenuLauncher._menu)
         dijit.popup.close(lconn.core.widget.MenuLauncher._menu);

      if (this.onBeforeOpen(eventType) === true)
         return;

      dojo.addClass(this.activeNode, this.classActive);

      dijit.popup.open({
         parent: this,
         popup: menu,
         around: this.domNode,
         orient: this.getOrient(),
         onExecute: function(){
            self._closeMenu(true);
         },
         onCancel: function(){
            self._closeMenu(true);
         },
         onClose: function(){
            self._delayEnd();
            lconn.core.widget.MenuLauncher._menu = null;
            menu.domNode.style.width = oldWidth;
            dijit.setWaiState(menu.domNode, "hidden", "true");
            if (self.domNode)
               dojo.removeClass(self.activeNode, self.classActive);
            self._opened = false;
            self.onClose();
         }
      });
      lconn.core.widget.MenuLauncher._menu = menu;

      this._opened=true;

      this.onOpen(eventType);
   },

   _closeMenu: function(/*Boolean*/ focus){
      this._delayEnd();

      this._shouldBeOpen = false;
      if (this._opened) {
         if (dojo.isIE)
            setTimeout(dojo.hitch(this, "_closeMenuFinal", focus),0);
         else
            this._closeMenuFinal(focus);
      }
   },
   _closeMenuFinal: function(/*Boolean*/ focus){
      this._shouldBeOpen = false;
      dijit.popup.close(this.menu);
      if (focus) { dijit.focus(this.focusNode || this.domNode); }
   },

   getOrient: function() {
      return this.isLeftToRight() ? this.orient : this.orientRTL;
   },

   _delayOpen: function() {
      if (!this._opening) {
         this._delayEnd();
         this._opening = setTimeout(dojo.hitch(this, "_openMenu", "mouseover"), this.openDelay);
         if (this.preloadDelay > 0 && (!this.menu || !this.menu.isLoaded))
            this._preload = setTimeout(dojo.hitch(this, "_preloadMenu"), this.preloadDelay);
      }
   },
   _delayClose: function() {
      if (!this._closing) {
         this._delayEnd();
         this._closing = setTimeout(dojo.hitch(this, "_closeMenu", false), this.hideDelay);
      }
   },
   _delayEnd: function() {
      try {clearTimeout(this._opening);} catch (e) {}
      try {clearTimeout(this._closing);} catch (e) {}
      try {clearTimeout(this._preload);} catch (e) {}
      this._closing = this._opening = this._preload = null;
   },

   /**
    * If true is returned the open will be aborted
    * 
    * @param {String}
    *           [eventType] Type of the event
    */
   onBeforeOpen: function(eventType) {
      return false;
   },

   /**
    * Type will be null if the event that launched this menu was a
    * hover
    * 
    * @param {String}
    *           [eventType] Type of the event
    */
   onOpen: function(eventType) {
      if (eventType == "click" && !this.activateOnFocus)
         this.focusMenu();
      dijit.setWaiState(this.menu.domNode, "hidden", "false");
   },

   onClose: function() {
   },

   focusMenu: function() {
      var menu = this.menu;
      if(menu.focus)
         menu.focus();
      else {
         menu._getFocusItems(menu.containerNode);
         dijit.focus(menu._firstFocusItem);
      }
   }

});

