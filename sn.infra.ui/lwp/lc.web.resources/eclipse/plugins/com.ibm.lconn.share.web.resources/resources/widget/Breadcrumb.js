/* Copyright IBM Corp. 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.Breadcrumb");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.util.html");
dojo.require("com.ibm.social.layout.Action");
dojo.require("com.ibm.social.layout.widget.ActionBar");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare(
   "lconn.share.widget.Breadcrumb",
   [dijit._Widget, dijit._Templated],
{
      /**
       * Path to the widget template
       * 
       * @type {String}
       */
      templatePath : dojo.moduleUrl( "lconn.share", "widget/templates/Breadcrumb.html" ),

      classBreadcrumb : "lconnBreadcrumb",
      classBreadcrumbPrefix: "lconnBreadcrumbPrefix",
      classBreadcrumbDropdown : "lconnBreadcrumbdropdown",
      classBreadcrumbDiv : "lconnBreadcrumbdiv",
      classBreadcrumbItem : "lconnBreadcrumbitem",
      classBreadcrumbNode : "lconnBreadcrumbnode",
      classBreadcrumbTwisty : "lconnBreadcrumbtwisty",

      actionBarMenuClass: "", // optional - css class to adjust action bar menu 
      blankGif : null, // required - string for blank gif
      rootName : "", // optional - string for the root of the breadcrumb, if empty no root is rendered
      prefix : "", // optional - prefix in the beginning of a breadcrumb, e.g. Move To: 
      cloneCollection : true, // optional - indicating, if collections for which a breadcrumb item is added should be cloned or not.

      /**
       * To set proper ARIA role or states. 
       */
      aria: {
         "breadcrumb": {
           "role": null, 
           "label": null
         },
         "visibleItem": {
            "role": "button",
            "label": null
         },
         "dropdown": {
            "role": null,
            "label": null
         }, 
         "dropdownItem": {
            "role": null,
            "label": null
         }
      },

      /**
       * Needs to be overridden by owner or sub class
       * 
       * @param itemIndex {Integer}
       *    index of breadcrumb item
       * @param collection {lconn.share.bean.Collection|CollectionFromFeed}
       *    the collection associated with the breadcrumb node
       * @param isLast {Boolean}
       *    indicating, if it is the last breadcrumb node
       */
      actionOnBreadcrumbNode: function( itemIndex, collection, isLastItem ) {},

      /**
       * Needs to be overridden by owner or sub class
       */
      actionOnBreadcrumbRoot: function() {},
      
      /**
       * Needs to be overridden by owner or sub class to provide offset for drop down menu position
       * 
       * @return {offsetX ,offsetY }
       */
      getDropDownMenuPosOffset: function() {
         return {
            offsetX: 0,
            offsetY: 0
         };
      },
      
      getItemCount: function() {
         return this._breadcrumbItems.length;
      },

      /**
       * private variables
       */
      _breadcrumbItems: [],
      _breadcrumbNodes: [],
      _breadcrumbDropdownItems: [],
      _dropdownNode: null,
      _dropdownItemsActionBar: null,

      /**
       * private constant variable for UI rendering of the breadcrumb items
       */
      _truncationWidthInEm: "12em",
      _truncationWidthInPixel: -1, // needs to be calculated

      constructor: function(opts) {
         this._initVars();

         dojo.safeMixin(this, opts || {});
      },

      postCreate : function() {
         this._clearBreadcrumb();
         this._initBreadcrumb();

         this.inherited( arguments);
      },

      destroy : function() {
         this._clearBreadcrumb();

         this.inherited( arguments );
      },

      /**
       * add a breadcrumb item for the given collection
       * 
       * @param collection {lconn.share.bean.Collection}
       * @param updateBreadcrumb {Boolean}
       *    indicating, if breadcrumb shall be updated or not after adding the new item
       */
      addBreadcrumbItem: function( collection, updateBreadcrumb, ownElement ) {
         if ( !collection )
            return;
         
         var exists = dojo.some( this._breadcrumbItems,
                                 function(item) {
                                    if (item && ( item.getId() == collection.getId() ))
                                       return true;
                                 } );
         if (exists)
            return;
         
         var length = this._breadcrumbItems.push( this.cloneCollection ? dojo.clone(collection) : collection );

         var onclickCallback = dojo.hitch(this, "_onclickBreadcrumbNode", collection, length-1);
         var addTwisty = (length > 1);
         var newNode = this._getBreadcrumbNode( collection.getNameNls(), addTwisty, onclickCallback, ownElement );
         this._breadcrumbNodes.push(newNode);

         if (this.breadcrumbShownNodes.childElementCount==0)
         {
            var nav = dojo.doc.createElement("nav");
            nav.setAttribute("aria-label","Breadcrumb");
            dojo.addClass(nav, "breadcrumb");
            dojo.place(nav, this.breadcrumbShownNodes);
            
            var ol = dojo.doc.createElement("ol");
            dojo.place(ol, nav);
         }
         dojo.place(newNode, this.breadcrumbShownNodes.firstChild.firstChild);

         var dropdownItem = 
            new lconn.share.widget.BreadcrumbDropdownItem( collection.getNameNls(), onclickCallback );
         this._breadcrumbDropdownItems.push(dropdownItem);

         if (updateBreadcrumb) {
            this.renderBreadcrumb();
         }
      },

      /**
       * remove breadcrumb items starting at the given index
       * 
       * @param itemIndex {Integer}
       */
      removeBreadcrumbItems: function( itemIndex ) {
         if ( itemIndex >= this._breadcrumbItems.length ) {
            return;
         }

         if ( itemIndex == 0 || (this._hasRoot() && itemIndex == 1)) {
            if (this.hideBreadcrumbWithRootOnly)
               dojo.style(this.breadcrumb, "display", "none");
            
            this._hideBreadcrumbDropdown();
            this._clearBreadcrumb();
            this._initBreadcrumb();
         }
         else {
            this._hideBreadcrumbDropdown();
            while (this._breadcrumbItems.length > itemIndex) {
               this._breadcrumbItems.pop();
            }
            while (this._breadcrumbNodes.length > itemIndex) {
               dojo.destroy(this._breadcrumbNodes.pop());
            }
            while (this._breadcrumbDropdownItems.length > itemIndex) {
               dojo.destroy(this._breadcrumbDropdownItems.pop());
            }
            this.renderBreadcrumb();
         }
      },
      
      /**
       * Remove the last breadcrumb
       */
      removeLastItem: function( ) {
         this.removeBreadcrumbItems( this._breadcrumbItems.length -1 );
      },

      renderBreadcrumb: function() {
         if (this._breadcrumbItems.length == 0) {
            return;
         }


         if (this.aria.breadcrumb.role) {
            dijit.setWaiRole(this.breadcrumb, this.aria.breadcrumb.role);
         }
         if (this.aria.breadcrumb.label) {
            dijit.setWaiState(this.breadcrumb, "label", this.aria.breadcrumb.label);
         }

         dojo.style(this.breadcrumb, "display", "");
         var maxSpace = dojo.contentBox(this.breadcrumb).w - dojo.contentBox(this.breadcrumbPrefix).w;
         // Temporarily enlarge breadcrumb area for width calculations of item which are larger than <maxSpace>
         //    IMPORTANT NOTE: This needs to be undone - see below 
         dojo.style(this.breadcrumb, "width", maxSpace*2+"px");
         this._truncationWidthInPixel = this._getTruncationWidthInPixel();
         var breadcrumbItemWidths = this._getBreadcrumbItemWidths();

         var length = this._breadcrumbItems.length;
         var indexOfLastDropDownNode = -1;

         var spaceAlreadyTaken = 0;
         var countOfVisibleItems = 0;
         var dropDownShown = false;
         var nodeIdxOfToBeTruncated = length;
         var itemCountThreshold = 3;
         for ( var nodeIdx = length-1; nodeIdx >= 0; nodeIdx-- ) {
            var item = breadcrumbItemWidths[nodeIdx];
            if ( !item.alreadyTruncated && item.canBeTruncated ) {
               nodeIdxOfToBeTruncated = nodeIdx;
            }
            if ( spaceAlreadyTaken + item.width > maxSpace ) {
               if ( countOfVisibleItems < itemCountThreshold ) {
                  if ( nodeIdxOfToBeTruncated != length ) {
                     // truncate item and restart loop
                     this._getWidthForItem(breadcrumbItemWidths[nodeIdxOfToBeTruncated], this._truncationWidthInEm);
                     breadcrumbItemWidths[nodeIdxOfToBeTruncated].alreadyTruncated = true;
                     spaceAlreadyTaken = dropDownShown ? dojo.marginBox(this.breadcrumbDropdownDiv).w : 0;
                     countOfVisibleItems = 0;
                     nodeIdxOfToBeTruncated = length;
                     nodeIdx = length;
                     continue;
                  }
                  else {
                     // decrease item count threshold and restart loop
                     if ( itemCountThreshold > 1 ) {
                        itemCountThreshold--;
                        spaceAlreadyTaken = dropDownShown ? dojo.marginBox(this.breadcrumbDropdownDiv).w : 0;
                        countOfVisibleItems = 0;
                        nodeIdxOfToBeTruncated = length;
                        nodeIdx = length;
                        continue;
                     }
                     else {
                        // special case that available space is too small for one breadcrumb item
                        // --> show at least one item and shrink until it fits
                        var width = this._truncationWidthInPixel;
                        spaceAlreadyTaken = (nodeIdx > 0) ? dojo.marginBox(this.breadcrumbDropdownDiv).w : 0;
                        do {
                           width -= 10;
                           if ( width < 0 ) {
                              break;
                           }
                           this._getWidthForItem( item, width+"px" );
                        } while ( spaceAlreadyTaken + item.width > maxSpace )
                        indexOfLastDropDownNode = nodeIdx-1;
                        spaceAlreadyTaken += item.width;
                        break;
                     }
                  }
               }
               else {
                  if ( !dropDownShown ) {
                     // restart loop inclusive breadcrumb drop down
                     this._showBreadcrumbDropdown();
                     spaceAlreadyTaken = dojo.marginBox(this.breadcrumbDropdownDiv).w;
                     countOfVisibleItems = 0;
                     dropDownShown = true;
                     nodeIdxOfToBeTruncated = length;
                     nodeIdx = length;
                     breadcrumbItemWidths = this._getBreadcrumbItemWidths();
                     continue;
                  }
                  else {
                     // ready - current item will be the first one in breadcrumb drop down
                     indexOfLastDropDownNode = nodeIdx;
                     break;
                  }
               }
            }

            // next loop turn
            countOfVisibleItems++;
            spaceAlreadyTaken += item.width;
         }

         var tolerance = 2;
         spaceAlreadyTaken += tolerance;
         // if space is remaining, then enlarge last truncated item accordingly
         if ( spaceAlreadyTaken < maxSpace ) {
            var truncatedVisibleItems = dojo.filter( breadcrumbItemWidths, function( item, index ) {
               return index > indexOfLastDropDownNode && item.alreadyTruncated;
            });
            if ( truncatedVisibleItems.length > 0 ) {
               var itemToBeEnlarged = truncatedVisibleItems[truncatedVisibleItems.length-1];
               var itemWidthTruncated = itemToBeEnlarged.width;
               this._getWidthForItem( itemToBeEnlarged, "" );
               var availableSpace = maxSpace - spaceAlreadyTaken;
               if ( itemToBeEnlarged.width - itemWidthTruncated > availableSpace ) {
                  this._getWidthForItem( itemToBeEnlarged, (this._truncationWidthInPixel+availableSpace)+"px" );
                  spaceAlreadyTaken += availableSpace;
               }
               else {
                  spaceAlreadyTaken += (itemToBeEnlarged.width - itemWidthTruncated);
               }
            }
         }

         // Undo temporarily enlargement of breadcrumb area
         dojo.style(this.breadcrumb, "width", "");

         if (indexOfLastDropDownNode == -1) {
            // no drop down needed
            this._hideBreadcrumbDropdown();
         }
         else {
            this._showBreadcrumbDropdown();
            for ( nodeIdx = 0; nodeIdx <= indexOfLastDropDownNode; nodeIdx++) {
               dojo.style(this._breadcrumbNodes[nodeIdx], "display", "none");
               this._breadcrumbDropdownItems[nodeIdx].setVisibility( true );
            }
            for ( ; nodeIdx < length; nodeIdx++) {
               this._breadcrumbDropdownItems[nodeIdx].setVisibility( false );
            }
            this._createDropdown();
         }

         lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.domNode);
         return spaceAlreadyTaken;
      },

      setFocusOnLastElement: function() {
         if (this._breadcrumbNodes.length > 0) {
            var node = this._breadcrumbNodes[this._breadcrumbNodes.length - 1];
            if (node && node.firstChild) {
               node = node.firstChild;                
               var focusNode = dojo.query('[tabindex=0]', node);
               if (focusNode && focusNode.length > 0) {
                  dijit.focus(focusNode[0]);
               }
            }
         }
      },

      _getBreadcrumbItemWidths: function() {
         var breadcrumbItemWidths = [];
         var length = this._breadcrumbItems.length;
         for ( var nodeIdx = 0; nodeIdx < length; nodeIdx++ ) {
            var item = {
                  breadcrumbItem: this._breadcrumbNodes[nodeIdx].firstChild,
                  breadcrumbNode: null,
                  width: 0,
                  canBeTruncated: true,
                  alreadyTruncated: false
            };
            dojo.style(item.breadcrumbItem, "display", "");
            this._getWidthForItem(item, "");
            breadcrumbItemWidths.push(item);
         }

         return breadcrumbItemWidths;
      },

      _getWidthForItem: function( item, truncationWidth ) {
         item.breadcrumbNode = dojo.query('.'+this.classBreadcrumbNode+'[fullnode="true"]', item.breadcrumbItem)[0];

         this._setWidthAtTruncationNode( item, truncationWidth );

         item.width = dojo.marginBox(item.breadcrumbNode).w;
         var elements = dojo.query("."+this.classBreadcrumbTwisty, item.breadcrumbItem);
         if ( elements.length > 0 ) {
            item.width += dojo.marginBox(elements[0]).w;
         }
      },

      _setWidthAtTruncationNode: function( item, width ) {
         var nodeForTruncation = dojo.query('.'+this.classBreadcrumbNode+'[truncatenode="true"]', item.breadcrumbItem)[0];
         if (nodeForTruncation) {
            dojo.style(nodeForTruncation, "width", width);
         }
         var width = dojo.marginBox(nodeForTruncation).w;
         if (width < this._truncationWidthInPixel) {
            item.canBeTruncated = false;
         }
      },

      _getTruncationWidthInPixel: function() {
         if (!this.breadcrumb) {
            return -1;
         }

         var dummyNode = dojo.doc.createElement("div");
         dojo.style(dummyNode, "width", this._truncationWidthInEm);
         dojo.place(dummyNode, this.breadcrumb);
         var truncationWidthInPixel = dojo.marginBox(dummyNode).w;
         dojo.destroy(dummyNode);
         return truncationWidthInPixel;
      },

      getBreadcrumbNodeHeight: function() {
         if ( !this.breadcrumb ) {
            return 0;
         }
         else if ( dojo.style(this.breadcrumb, "display") == "none" ) {
            return 0;
         }
         return dojo.marginBox(this.breadcrumb).h;
      },

      _showBreadcrumbDropdown: function() {
         dojo.style(this.breadcrumbDropdownDiv, "display", "");
      },

      _hideBreadcrumbDropdown: function() {
         dojo.style(this.breadcrumbDropdownDiv, "display", "none");
      },

      _onclickBreadcrumbDropdown: function() {
         if (this._dropdownItemsActionBar) {
            var dropdownActionBarActions = this._dropdownItemsActionBar.actionElements;
            if (dropdownActionBarActions.length == 1) {
               this._dropdownItemsActionBar.executeActionElement(dropdownActionBarActions[0]);
            }
         }
      },

      _initBreadcrumb: function() {
         if ( this._hasRoot() ) {
            dojo.empty(this.breadcrumbShownNodes);
            // create nav and ol
            var nav = dojo.doc.createElement("nav");
            nav.setAttribute("aria-label","Breadcrumb");
            dojo.addClass(nav, "breadcrumb");
            dojo.place(nav, this.breadcrumbShownNodes);
            
            var ol = dojo.doc.createElement("ol");
            dojo.place(ol, nav);
            
            // create node for root
            this._breadcrumbItems.push(null); // dummy item for root

            var rootNode = this._getBreadcrumbNode( lconn.core.util.html.decodeHtml(this.rootName), false, dojo.hitch(this, this._onclickBreadcrumbRoot) );
            this._breadcrumbNodes.push(rootNode);
            dojo.place(rootNode, ol);

            var rootDropdownItem = 
               new lconn.share.widget.BreadcrumbDropdownItem( this.rootName, dojo.hitch(this, this._onclickBreadcrumbRoot) );
            this._breadcrumbDropdownItems.push(rootDropdownItem);
         }

         this._createDropdown();
         
         if (!this.hideBreadcrumbWithRootOnly)
            this.renderBreadcrumb();
      },

      _createDropdown: function() {
         if (this._dropdownItemsActionBar) {
            this._dropdownItemsActionBar.destroy();
            this._dropdownItemsActionBar = null;
         }
         if (this._dropdownNode) {
            dojo.destroy(this._dropdownNode);
            this._dropdownNode = null;
         }

         this._dropdownNode = dojo.doc.createElement("div");

         dojo.addClass(this._dropdownNode, this.classBreadcrumbDropdown);
         dojo.style(this._dropdownNode, "line-height", "10px");
         dojo.connect(this._dropdownNode, "onclick", dojo.hitch( this, this._onclickBreadcrumbDropdown ));

            var dropdownItems = [];
            dojo.forEach(this._breadcrumbDropdownItems, function(item) { dropdownItems.unshift(item); });
            var dropdownAction = new lconn.share.widget.BreadcrumbDropdown(dropdownItems);
            var opts = {
               actions: [dropdownAction],
               menuClass: this.actionBarMenuClass
            };
            this._dropdownItemsActionBar = new com.ibm.social.layout.widget.ActionBar(opts, this._dropdownNode);
            dojo.connect(this._dropdownItemsActionBar, "onActionComplete", dojo.hitch(this, this._onOpenDropdownMenu));

         dojo.place(this._dropdownNode, this.breadcrumbDropdownDiv);
         if ( dropdownAction.hasOnlyOneVisibleItem() ) {
            dijit.setWaiRole( this.breadcrumbDropdownDiv, "presentation" );
         }
         else {
            dijit.setWaiRole( this.breadcrumbDropdownDiv, "toolbar" );
         }
      },

      _onOpenDropdownMenu: function(action, element, result) {
         // position drop down menu directly under the breadcrumbNode
         var menu = element.menu;
         if (dojo.exists("domNode.parentNode", menu)) {
            var dropDownMenuPosOffset = this.getDropDownMenuPosOffset();
            if (dropDownMenuPosOffset) { 
               var newLeft = dojo.style(menu.domNode.parentNode, "left") + dropDownMenuPosOffset.offsetX;
               var newTop = dojo.style(menu.domNode.parentNode, "top") + dropDownMenuPosOffset.offsetY;
               dojo.style(menu.domNode.parentNode, "left", newLeft+"px");
               dojo.style(menu.domNode.parentNode, "top", newTop+"px");
            }
         }
      },

      getSimpleBreadcrumbNode: function( name ) {

         var simpleNode = dojo.doc.createElement("div");
            dojo.attr(simpleNode, "truncatenode", "true");
            dojo.addClass(simpleNode, this.classBreadcrumbItem);
            dojo.addClass(simpleNode, this.classBreadcrumbNode);

            this._insertBreadcrumbContent( simpleNode, name );

         return simpleNode;
      },

      _insertBreadcrumbContent: function( itemNode , name ) {
         // span with name hidden when accessibility is active
         var span = dojo.doc.createElement("span");
            dojo.addClass(span, "bidiAware");
            dojo.addClass(span, "lconnTextA11yHidden");
            span.appendChild(dojo.doc.createTextNode(name));
         dojo.place(span, itemNode);

         // link with title content shown when accessibility is active
         var altContent = dojo.doc.createElement("a");
            dojo.attr( altContent, "tabindex", "-1" );
            dojo.attr( altContent, "href", "javascript:;");
            dijit.setWaiRole( altContent, "presentation");
            dojo.addClass(altContent, "lotusAltText");
            var altSpan = dojo.doc.createElement("span");
               dojo.addClass(altSpan, "bidiAware");
               altSpan.appendChild(dojo.doc.createTextNode(name));
            dojo.place(altSpan, altContent);
         dojo.place( altContent, itemNode);
         
         lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(itemNode);
      },

      _getBreadcrumbNode: function( name, hasTwisty, onclickCallback, ownElement ) {
         var li = dojo.doc.createElement("li");
         
            var node = dojo.doc.createElement("div");
               dojo.style(node, "display", "none");
               dojo.addClass( node, this.classBreadcrumbDiv);
   
            if (hasTwisty) {
               var twistyNode = dojo.place(this._getBreadcrumbTwisty(), node);
               dojo.addClass(twistyNode, this.classBreadcrumbItem);
               dojo.addClass(twistyNode, this.classBreadcrumbTwisty);
            }
            var itemNode = null;
            if (ownElement) {
               itemNode = ownElement;
               dojo.place(ownElement, node);
            }
            else {
               itemNode = dojo.doc.createElement("div");
                  dojo.attr(itemNode, "tabindex", "0");
                  if (this.aria.visibleItem.role)
                     dijit.setWaiRole(itemNode, this.aria.visibleItem.role);
                  if (this.aria.visibleItem.label)
                     dijit.setWaiState(itemNode, "label", this.aria.visibleItem.label);
                  else
                     dijit.setWaiState(itemNode, "label", name);
   
                  dojo.attr(itemNode, "title", name);
                  dojo.place(itemNode, node);
   
                  this._insertBreadcrumbContent( itemNode, name );
   
               dojo.attr(itemNode, "truncatenode", "true");
               dojo.connect(itemNode, "onclick", onclickCallback);
               dojo.connect(itemNode, "onkeypress", onclickCallback);
            }
            dojo.attr(itemNode, "fullnode", "true");
            dojo.addClass(itemNode, this.classBreadcrumbItem);
            dojo.addClass(itemNode, this.classBreadcrumbNode);

         dojo.place(node, li);
         return li;
      },

      _getBreadcrumbTwisty: function() {
         var twistyImg = '<img class="lotusSprite lotusArrow lotusTwistyClosed" alt="" src="'+this.blankGif+'"></img>';
         var twistyAlt = '<span class="lotusAltText">></span>';
         var twisty = '<div role="presentation">'+twistyImg+twistyAlt+'</div>';
         return twisty;
      },

      _onclickBreadcrumbRoot: function( event ) {
         if (event) {
            if ( event.type != "click" && ( event.type != "keypress" || event.keyCode != dojo.keys.ENTER ) ) {
               return;
            }
            dojo.stopEvent(event);
         }

         this.actionOnBreadcrumbRoot();
      },

      _onclickBreadcrumbNode: function( collection, itemIndex, event ) {
         if (event) {
            if ( event.type != "click" && ( event.type != "keypress" || event.keyCode != dojo.keys.ENTER ) ) {
               return;
            }
            dojo.stopEvent(event);
         }

         var isLastItem = (itemIndex == this._breadcrumbItems.length-1);

         this.actionOnBreadcrumbNode( itemIndex, collection, isLastItem );
      },

      _initVars: function() {
         this._breadcrumbItems = [];
         this._breadcrumbNodes = [];
         this._breadcrumbDropdownItems = [];
         this._dropdownItemsActionBar = null;
         this._dropdownNode = null;

         this._truncationWidthInPixel = -1;
      },

      _hasRoot: function() {
         return this.rootName != null && this.rootName != undefined && this.rootName.length > 0;
      },

      _clearBreadcrumb: function() {
         while (this._breadcrumbItems.length > 0) {
            this._breadcrumbItems.pop();
         }
         while (this._breadcrumbNodes.length > 0) {
            dojo.destroy(this._breadcrumbNodes.pop());
         }
         while (this._breadcrumbDropdownItems.length > 0) {
            dojo.destroy(this._breadcrumbDropdownItems.pop());
         }

         if (this._dropdownNode) {
            dojo.destroy(this._dropdownNode);
            this._dropdownNode = null;
         }
         if (this._dropdownItemsActionBar) {
            this._dropdownItemsActionBar.destroy();
            this._dropdownItemsActionBar = null;
         }
      }
});

dojo.declare(
      "lconn.share.widget.BreadcrumbDropdownItem",
      [com.ibm.social.layout.Action],
{
   _isVisible: true,

   constructor: function(name, callback) {
      this.hasChildren = false;
      this.name = name;
      this.callback = callback;
   },

   getName: function(){
      name = lconn.core.util.html.encodeHtml(this.name);
      return name;
   },

   getTooltip: function() {
      return this.name;
   },

   setVisibility: function( isVisible ) {
      this._isVisible = isVisible;
   },

   isVisible: function() {
      return this._isVisible;
   },

   execute: function() {
      this.callback.call();
   }
});

dojo.declare(
      "lconn.share.widget.BreadcrumbDropdown",
      [com.ibm.social.layout.Action],
{
      constructor: function(dropdownItems) {
         this.dropdownItems = dropdownItems;
         this.visibleItems = dojo.filter(this.dropdownItems, function(item) { return item.isVisible(); });
         this.hasChildren = this.hasOnlyOneVisibleItem() ? false : true;
         this._strings = dojo.i18n.getLocalization("lconn.core", "strings");
      },

      hasOnlyOneVisibleItem: function() {
         return this.visibleItems.length == 1;
      },

      getName: function() {
         return "";
      },

      getTooltip: function() {
         if ( this.hasOnlyOneVisibleItem() ) {
            return this.visibleItems[0].getTooltip();
         }
         else {
            return this._strings ? this._strings.rs_more : "";
         }
      },

      getImgAltText: function() {
         return "...";
      },

      isVisible: function() {
         return true;
      },

      execute: function() {
         if ( this.hasOnlyOneVisibleItem() ) {
            this.visibleItems[0].execute();
         }
         else {
            var dfd = new dojo.Deferred();
            dfd.callback(this.dropdownItems);
            return dfd;
         }
      }
});
