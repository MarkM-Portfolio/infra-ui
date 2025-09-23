/* Copyright IBM Corp. 2015  All Rights Reserved.              */

/*******************************************************************************************************************************************************************************************************
 * 
 * BREADCRUMB FOLDER TREE WIDGET TODO: documentation
 * 
 ******************************************************************************************************************************************************************************************************/

dojo.provide("lconn.share.widget.TreeWithBreadcrumb");

dojo.require("lconn.share.widget.Tree");
dojo.require("lconn.share.widget.Breadcrumb");

/**
 * Tree with Breadcrumb Widget: TODO: documentation
 * 
 * @class lconn.share.widget.TreeWithBreadcrumb
 * @extends lconn.share.widget.Tree
 */
dojo.declare(
  "lconn.share.widget.TreeWithBreadcrumb",
  [lconn.share.widget.Tree],
{
   expandFolders: false, // optional parameter

   _breadcrumbWidget: null,

   _onClickHeaderCallback: null,
   _onClickTitleCallback: null,

   _showingRoot: true,
   _currentShownCollection: null,
   _showingSearchedCollectionContent: false,
   _maxTreeWidgetHeight: 0, // set via makeContainerNodeScrollable(..)

   _callbacks: {
      onShowCollection: null
   },

   _messageNodeId: "", // kept for updating message node's vertical position

   _pendingFocusToBreadcrumb: false,

   constructor: function( args ) {
      // Certain Tree configuration is assumed for Tree with Breadcrumb:
      // - breadcrumb is indicated to Tree - cfg.opts.isBreadcrumb == true
      // - no Drag-and-Drop - cfg.opts.isDnd == false
      // - shown depth of tree is 1 - cfg.opts.folder.maxDepth == 1
      // - folder are not selected - cfg.opts.folder.behavior.isSelectable == false
      // TODO: check the Tree configuration
      this._showingRoot = true;
      this._currentShownCollection = null;
      this._showingSearchedCollectionContent = false;
      this._maxTreeWidgetHeight = 0;

      // Override onClickIcon and onClickTitle callbacks with own one to
      // implement tree with breadcrumb behavior:
      // Click on a folder (icon or title) replaces the shown nodes by
      // the children of the clicked folder.
      this._overrideOnClickCallbacks();
      
      this.ariaRoleFilesTree = "menu";
      this.ariaRoleNode = "menuitem";
      this.ariaRoleNodeCheckbox = "menuitemcheckbox"; // Role for node which has checkbox 
      this.ariaRoleNodeRadio = "menuitemradio"; // Role for node which has radio button
      this.indentNodePx = 0;
   },

   postMixInProperties: function() {
      this.inherited( arguments );

      if ( this.cfg.cb.onShowCollection ) {
         this._callbacks.onShowCollection = this.cfg.cb.onShowCollection;
      }
      
      this.strings.noFolders = this.strings.noFolders || "";
      this.strings.msgNoData = this.strings.msgNoData || "";
   },

   _overrideOnClickCallbacks: function() {
      this._onClickHeaderCallback = this.cfg.cb.node.header.onclick;
      this._onClickTitleCallback = this.cfg.cb.node.header.title.onclick;

      this.cfg.cb.node.header.onclick = dojo.hitch( this, this._nodeHeaderClicked);
      this.cfg.cb.node.header.title.onclick = dojo.hitch( this, this._nodeTitleClicked);

      this._onTreeLoadedCallback = this.cfg.cb.treeLoaded;
      this.cfg.cb.treeLoaded = dojo.hitch( this, this._treeLoaded);

      this._onNodeRenderedCallback = this.cfg.cb.node.rendered;
      this.cfg.cb.node.rendered = dojo.hitch( this, this._nodeRendered);

      this._onNodeBeforeExpandedCallback = this.cfg.cb.node.beforeexpanded;
      this.cfg.cb.node.beforeexpanded = dojo.hitch( this, this._nodeBeforeExpanded);

      this._onNodeExpandedCallback = this.cfg.cb.node.expanded;
      this.cfg.cb.node.expanded = dojo.hitch( this, this._nodeExpanded);

      this._onNodeBeforeCollapsedCallback = this.cfg.cb.node.beforecollapsed;
      this.cfg.cb.node.beforecollapsed = dojo.hitch( this, this._nodeBeforeCollapsed);

      this._onNodeCollapsedCallback = this.cfg.cb.node.collapsed;
      this.cfg.cb.node.collapsed = dojo.hitch( this, this._nodeCollapsed);
   },

   postCreate : function() {
      if ( this.expandFolders ) {
         // breadcrumb in only needed, if folders can be expanded
         this._initBreadcrumbWidget();
      }

      this.inherited( arguments );
   },

   startup: function() {
      this.inherited( arguments );

      this._positionMessageNodeVerticallyCentered( null );

      if ( this._breadcrumbWidget ) {
         var self = this;
         setTimeout(
            function(){ self.makeContainerNodeScrollable( self._maxTreeWidgetHeight, self.getBreadcrumbHeight() ); },
            100 );
      }
   },

   destroy : function() {
      if (this._breadcrumbWidget) {
         this._breadcrumbWidget.destroy();
      }

      this.inherited( arguments );
   },
   
   getBreadcrumbHeight: function() {
      return this._breadcrumbWidget ? this._breadcrumbWidget.getBreadcrumbNodeHeight() : 0 ;
   },

   /**
    * Makes the node container scrollable.
    * @param {number} maxTreeWidgetHeight - the maximum tree widget height
    * @param {number} breadcrumbHeight - the breadcrumb height
    */
   makeContainerNodeScrollable: function( maxTreeWidgetHeight, breadcrumbHeight ) {
      if ( maxTreeWidgetHeight < 1 || !this.containerNode ) {
         return;
      }

      this._maxTreeWidgetHeight = maxTreeWidgetHeight;
      this.containerNode.style.overflowY = "auto";
      var containerNodeHeight = this._maxTreeWidgetHeight - breadcrumbHeight;
      this.containerNode.style.height = containerNodeHeight+"px";

      this.recalcNodeWidths( true );
      this._positionMessageNodeVerticallyCentered( null );
   },

   getBreadcrumbNavId: function() {
     var ret = dojo.exists( "_breadcrumbWidget.breadcrumb.id", this ) ? this._breadcrumbWidget.breadcrumb.id : null;
     return ret;
   },

   /**
    * @callback used to handle click on header element of tree node
    * 
    * @param node
    *           {lconn.share.widget.Node}
    */
   _nodeHeaderClicked: function( node ) {
      if( typeof( this._onClickHeaderCallback ) == "function") this._onClickHeaderCallback.call( node, node, arguments);
      this._nodeClicked( node );
   },

   _treeLoaded: function( tree ) {
      node =  tree.getParentNode();
      if ( !node ) {
         this._currentShownCollection = null;
      }
      else if ( node.expending ) {
         this._currentShownCollection = dojo.clone( node.getBean() );
         node.expending = undefined;
      }

      var children = tree.getChildren( );
      if ( ! children || children.length == 0 )
         this._showEmptyMessage( tree.containerNode, tree.containerNode.id );
      else
         this._hideEmptyMessage( tree.containerNode, tree.containerNode.id );

      if( typeof( this._onTreeLoadedCallback ) == "function") this._onTreeLoadedCallback.call( this, tree, arguments);
   },
   
   _onEscape: function( evt ) {
      if ( this._breadcrumbWidget.getItemCount() > 1 ) {
         this.actionOnBreadcrumbItem( true );
         this._breadcrumbWidget.removeBreadcrumbItems(1);
         dojo.stopEvent(evt);
      }
   }, 

   _nodeBeforeExpanded: function( node ) {
      if( typeof( this._onNodeBeforeExpandedCallback ) == "function") this._onNodeBeforeExpandedCallback.call( node, node, arguments);

      this._prepareShowCollection( (node.isFolder() ? node.getBean() : null) );

      var tree = node.getParentTree( );

      if ( tree ) {
         dojo.forEach( tree.getChildren( ), function( sib ) {
            if (sib.getId() != node.getId()) {
               dojo.style(sib.domNode, "display", "none");
               dijit.setWaiState(sib.domNode, "hidden", "true");
            }
            else {
               // Hide 
               dojo.style(sib.headerOuterDiv, "display", "none");
               dijit.setWaiState(sib.headerOuterDiv, "hidden", "true");
            }
         });
      }

      node.expending = true;
   },

   _nodeRendered: function( node ) {
      var headerSelector = node.headerSelectorDiv;
      if ( node.isSelectable() ) {
         dojo.attr( headerSelector, "role", node.isRadioed() ? this.ariaRoleNodeRadio : this.ariaRoleNodeCheckbox );
         dojo.attr( headerSelector, "aria-expanded", node.isExpanded() ? "true" : "false" );
         dojo.attr( headerSelector, "aria-selected", node.isSelected() ? "true" : "false" );
         dojo.attr( headerSelector, "aria-checked", node.isSelected() ? "true" : "false" );
      }
      else {
         dojo.attr( headerSelector, "role", this.ariaRoleNode );
         dojo.removeAttr( headerSelector, "aria-expanded" );
         dojo.removeAttr( headerSelector, "aria-selected" );
         dojo.removeAttr( headerSelector, "aria-checked" );
      }
      
      if ( !node.pTree.firstNode ) {
         node.pTree.firstNode = node;
         node.focus( false );
         this.rootTree.setTabindexable( node.headerSelectorDiv );
      }
      
      dijit.setWaiState( headerSelector, "controls", this.getBreadcrumbNavId());
      if( typeof( this._onNodeRenderedCallback ) == "function") this._onNodeRenderedCallback.call( node, node, arguments);
   },

   _nodeExpanded: function( node ) {
      if( typeof( this._onNodeExpandedCallback ) == "function") this._onNodeExpandedCallback.call( node, node, arguments);
    
      // Update breadcrumb.
      this.activeNode = node;
      this._appendBreadcrumb( node.getBean(), true );
      if (this._pendingFocusToBreadcrumb) {
         this._pendingFocusToBreadcrumb = false;
         this._breadcrumbWidget.setFocusOnLastElement();
      }
   },

   _nodeBeforeCollapsed: function( node ) {
      if( typeof( this._onNodeBeforeExpandedCallback ) == "function") this._onNodeBeforeExpandedCallback.call( node, node, arguments);
      
      node.wasExpanded = node.isExpanded();
   },
   
   _nodeCollapsed: function( node ) {
      if( typeof( this._onNodeCollapsedCallback ) == "function") this._onNodeCollapsedCallback.call( node, node, arguments);
      
      var anchorNode = node.getParentNode();

      var tree = node.getParentTree( );
      if ( !node.wasExpanded ) {
         anchorNode = node.getParentNode();

         // Should jump back to its grandparent
         if ( tree ) {
            var parent = tree.getParentNode();
            if ( parent )
               tree = parent.getParentTree( );
            else 
               tree = node.getRoot();
         }
         else 
            tree = node.getRoot();
      } 
      else {
         anchorNode = node;
      }

      dojo.forEach(tree.getChildren( ), function( sib ) {
         if (sib.getId() != anchorNode.getId()) {
            dojo.style(sib.domNode, "display", "block");
            dijit.setWaiState( sib.domNode, "hidden", "false");
         }
         else {
            dojo.style(sib.headerOuterDiv, "display", "block");
            dijit.setWaiState( sib.headerOuterDiv, "hidden", "false");
         }
      });

      this.activeNode = tree.getParentNode();

      node.wasExpanded = undefined;


      // Reload parent node.
      if ( this.activeNode ) {
         this._prepareShowCollection( (this.activeNode.isFolder() ? this.activeNode.getBean() : null) );

         this.activeNode.expending = true;
         this.activeNode.reloadTree();
      } else {
         this._showRoot( );
      }

      // Update breadcrumb
      this._removeBreadcrumb();
   },

   /**
    * @callback used to handle click on title element of tree node
    * 
    * @param node
    */
   _nodeTitleClicked: function( node ) {
      if( typeof( this._onClickTitleCallback ) == "function") this._onClickTitleCallback.call( node, node, arguments);
      this._nodeClicked( node );
   },

   _nodeClicked: function( node ) {
      if ( !this.expandFolders ) {
         // do nothing, if folders should not be expanded
         return;
      }

      if ( node.isDisabled() ) {
         // do nothing for disabled nodes
         return;
      }

      if( !node.isNavigatable( )) {
         // do nothing for nodes whose title anchor has been removed
         return;
      }

      var collection = node.isFolder() ? node.getBean() : null;
      if ( !collection ) {
         // only for collections
         return;
      }

      node.expand( false );
   },

   _initBreadcrumbWidget: function() {
      var breadcrumbOpts = { 
         rootName: this.cfg.opts.rootName || "",
         prefix: this.cfg.opts.prefix || "", // TODO 167702
         hideBreadcrumbWithRootOnly: this.cfg.opts.hideBreadcrumbWithRootOnly,
         blankGif: this.blankGif,
         actionBarMenuClass: "lconnPickerFilesTreeBreadcrumb",
         actionOnBreadcrumbRoot: dojo.hitch( this, this.actionOnBreadcrumbItem, true ),
         actionOnBreadcrumbNode: dojo.hitch( this, this.actionOnBreadcrumbItem, false ),
         getDropDownMenuPosOffset: dojo.hitch( this, this.getBreadcrumbDropDownMenuPosOffset ),
         aria: {
            "breadcrumb": {
              "role": "navigation",
              "label": "breadcrumbs"
            },
            "visibleItem": {
               "role": "link",
            }
         },
      };
      this._breadcrumbWidget = new lconn.share.widget.Breadcrumb( breadcrumbOpts );
      this._breadcrumbWidget.placeAt( this.domNode, "first" );
      dijit.setWaiState(this.domNode, "controls", this._breadcrumbWidget.breadcrumb.id);
   },

   _positionMessageNodeVerticallyCentered: function( messageNode ) {
      if (!messageNode && this._messageNodeId.length > 0) {
         messageNode = dojo.query( "#"+this._messageNodeId, this.containerNode )[0];
      }

      if (messageNode) {
         var containerNodeContentBox = dojo.contentBox( this.containerNode );
         var messageNodeBox = dojo.marginBox(messageNode);
         dojo.style(messageNode, "top", (containerNodeContentBox.h - messageNodeBox.h)/2 + "px" );
      }
   },

   _showEmptyMessage: function( el, nodeId ) {
      var id = nodeId + "_empty";
      var messageNode = dojo.query( "#"+id, el )[0];
      if ( !messageNode ) {
         messageNode = document.createElement("div");
            dojo.attr(messageNode, "id", id );
            dojo.attr(messageNode, "tabindex", "-1" );
            dijit.setWaiRole(messageNode, "alert");

            dojo.style(messageNode, "position", "relative");
            dojo.style(messageNode, "text-align", "center");
         el.appendChild( messageNode );
      } else {
         // if there is an empty message node, let it be visible
         dojo.style(messageNode, "display", "");
         dijit.setWaiState(messageNode, "hidden", "false");
      }

      var msgSpanId = id + "_span";
      var msgSpan = dojo.query( "#"+msgSpanId, el )[0];
      if ( !msgSpan ) {
         msgSpan = document.createElement("span");
            dojo.attr(msgSpan, "id", msgSpanId);
         messageNode.appendChild(msgSpan);
      }
      var emptyMsg = this._showingSearchedCollectionContent ? this.strings.msgNoData : this.strings.noFolders;
      dojo.place( dojo.doc.createTextNode( emptyMsg ), msgSpan, "only" );

      // after the new element of the breadcrumb is shown the focus should be set there
      this._pendingFocusToBreadcrumb = true;

      this._positionMessageNodeVerticallyCentered( messageNode );

      this._messageNodeId = id;
      
      dojo.addClass(el,"withoutFocusStyle");
   },
 
   _hideEmptyMessage: function( el, nodeId ) {
      var id = nodeId + "_empty";
      var messageNode = dojo.query( "#"+id, el )[0];
      if (messageNode) {
         // hide the empty message node if there is one
         this._pendingFocusToBreadcrumb = false;
         dojo.style(messageNode, "display", "none");
         dijit.setWaiState(messageNode, "hidden", "true");
      }

      this._messageNodeId = "";
      
      dojo.removeClass(el,"withoutFocusStyle");
   },

   /**
    * callback from breadcrumb, action on breadcrumb item
    * 
    * @param isRoot {Boolean}
    *    indicating, if it is the action on the root breadcrumb item
    * @param itemIndex
    *    optional, if !isRoot then it is the index of the breadcrumb item
    * @param collection {lconn.share.bean.Collection}
    *    optional, if !isRoot then it is the collection associated with the breadcrumb item
    * @param isLastItem {Boolean}
    *    optional, if !isRoot then it is indicating, if it is the last breadcrumb item
    */
   actionOnBreadcrumbItem: function( isRoot, itemIndex, collection, isLastItem ) {
      if (isRoot) {
         this._breadcrumbWidget.removeBreadcrumbItems( 0 );
         this._showRoot();
      }
      else {
         if (collection) {
            var bean = this.activeNode.getBean();
            while ( bean.getId() != collection.getId() ) {
               this.activeNode.wasExpanded = true;
               this._nodeCollapsed(this.activeNode);
               
               if (!this.activeNode) {
                  // Should not happend. But stop here.
                  break;
               }
               
               bean = this.activeNode.getBean();
            }
            
            // update height of container node
            this.makeContainerNodeScrollable( this._maxTreeWidgetHeight, this.getBreadcrumbHeight() );
         }
      }
   },

   /**
    * for breadcrumb - provide position offset for drop down menu
    * 
    * @returns {offsetX, offsetY}
    */
   getBreadcrumbDropDownMenuPosOffset: function() {
      return {
         offsetX: 0,
         offsetY: 10
      };
   },

   /**
    * show the content of the 'root' - items of the initial <datastore>
    */
   _showRoot: function() {
      this._showingRoot = true;
      this._currentShownCollection = null;
      this._showingSearchedCollectionContent = false;
      this.activeNode = null;

      if( this._callbacks.onShowCollection ) {
         this._callbacks.onShowCollection.call( this, this, null, this._showingSearchedCollectionContent );
      }

      this.makeContainerNodeScrollable( this._maxTreeWidgetHeight, this.getBreadcrumbHeight() );

      var tree = this.getRoot();
      var children = tree.getChildren( );
      if ( !children || children.length == 0 )
         this._showEmptyMessage( tree.containerNode, tree.containerNode.id );
      else
         this._hideEmptyMessage( tree.containerNode, tree.containerNode.id );
      
      this._clearNodes();
      this.firstNode = null;
      this._renderNodes( this.cfg.ds );

      if (this.selectedNode) {
         this.selectedNode._deselectSelectedNode();
      }
   },

   /**
    * 
    * @param collection - if null, then do nothing
    *           {lconn.share.bean.Collection}
    */
   _prepareShowCollection: function( collection ) {
      if (!collection) {
         return;
      }

      this._showingRoot = false;
      this._currentShownCollection = dojo.clone( collection );
      this._showingSearchedCollectionContent = false;

      if( this._callbacks.onShowCollection ) {
         this._callbacks.onShowCollection.call( this, this, this._currentShownCollection, this._showingSearchedCollectionContent );
      }
   },

   /**
    * show the content of the given <collection>
    * 
    * @param collection {lconn.share.bean.Collection}
    * @param addToBreadcrumb {Boolean}
    *    indicating, if a breadcrumb item has to be added for the given collection
    */
   _showCollection: function( collection, addToBreadcrumb ) {
      if (!this.expandFolders) {
         return;
      }

      if (addToBreadcrumb) {
         this._breadcrumbWidget.addBreadcrumbItem( collection, true );
      }
      // update height of container node
      this.makeContainerNodeScrollable( this._maxTreeWidgetHeight, this.getBreadcrumbHeight() );

      this._prepareShowCollection( collection );
      this._renderCollectionContent( this.getCurrentShownCollection() );
   },
   
   _appendBreadcrumb: function( collection ) {
      this._breadcrumbWidget.addBreadcrumbItem( collection, true );
      
      // update height of container node
      this.makeContainerNodeScrollable( this._maxTreeWidgetHeight, this.getBreadcrumbHeight() );
   },

   /**
    * remove last item from breadcrumb
    */
   _removeBreadcrumb: function() {
      this._breadcrumbWidget.removeLastItem( );
      
      // update height of container node
      this.makeContainerNodeScrollable( this._maxTreeWidgetHeight, this.getBreadcrumbHeight() );
   },

   /**
    * show the content of the current collection
    * - usage: back to complete content once it has been filtered via <searchCollectionContent>
    */
   showCollectionContent: function() {
      if (!this.expandFolders) {
         return;
      }

      if ( this.isShowingRoot() || this.getCurrentShownCollection() == null ) {
         return;
      }

      this._showingSearchedCollectionContent = false;
      this._renderCollectionContent( this.getCurrentShownCollection() );
   },

   /**
    * show the content of the current collection filter via the given feed URL search parameter
    * 
    * @param feedUrlSearchParams
    *           {string}
    */
   searchCollectionContent: function( feedUrlSearchParams ) {
      if (!this.expandFolders) {
         return;
      }

      if ( this.isShowingRoot() || this.getCurrentShownCollection() == null ) {
         return;
      }

      this._showingSearchedCollectionContent = true;
      this._renderCollectionContent( this.getCurrentShownCollection(), feedUrlSearchParams );
   },
   
   searchRootContent: function(feedUrl) {
      var datastore = dojo.clone(this.cfg.ds);
      datastore.uri = feedUrl;
      var tree = this.getRoot();
      tree._clearNodes();
      tree._renderNodes(datastore);
   },

   _renderCollectionContent: function( collection, additionalApiParams) {
      var datastore = dojo.clone( this.cfg.ds );
      
      var url = lconn.share.util.uri.rewriteUri(
            this.cfg.ds.baseUrl + "form/api/collection/" + encodeURIComponent(collection.getId()) + "/feed", additionalApiParams);
      url = lconn.share.util.uri.makeAtomUrlIESafe(url);

      datastore.uri = url;
      datastore.apiParamsOnUri = true; // add api params to uri feed
      datastore.feed = null; // clear possible existing feed data
      datastore.beans = [];  // clear possible existing bean data
      this.activeNode.tree._clearNodes();
      this.activeNode.tree._renderNodes( datastore );

      if (this.selectedNode) {
         this.selectedNode._deselectSelectedNode();
      }
   },

   /**
    * returns true, if 'root' is currently shown
    * 
    * @returns {Boolean}
    */
   isShowingRoot: function() {
      return this._showingRoot;
   },

   getCurrentShownCollection: function() {
      return this._currentShownCollection;
   }
});
