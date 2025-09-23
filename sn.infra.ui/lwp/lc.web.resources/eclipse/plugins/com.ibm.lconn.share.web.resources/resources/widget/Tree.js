/* Copyright IBM Corp. 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.Tree");

dojo.require("dijit._WidgetBase");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.share.widget.tree.dnd.Source");
dojo.require("lconn.share.widget.tree.dnd.Avatar");
dojo.require("lconn.share.widget.KeyNavigatable");

dojo.require("net.jazz.ajax.xdloader");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");
dojo.require("lconn.core.auth");
dojo.require("com.ibm.ajax.auth");

dojo.require("lconn.core.util.html");
dojo.require("lconn.core.svg.svgHelper");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.bean.File");
dojo.require("lconn.share.bean.Collection");

dojo.require("lconn.core.utilities");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require('com.ibm.oneui.util.proxy');

dojo.requireLocalization("lconn.share","Tree");

/**
 * Share widgets
 * @namespace lconn.share.widget
 */


/**
 * FILES TREE WIDGET
 * <br/>
 * a flexible and configurable widget used to display files and folders as an expandable lazy-loaded tree,
 * with data acquired from one of a number of possible repositories (files app, ecm, provided API, or xml/atom object),
 * and allows for the interaction with the instantiator via callbacks.
 * <br/>
 * <br/>
 * Hierarchical parent/child container pattern:<br/>
 * 1. a tree is composed of a node or set of nodes,<br/>
 * 2. a node is composed of the node header and the node container<br/>
 * 3. a node's container is composed of a tree... goto step 1<br/>
 * <br/>
 *  To use this widget, you instantiate a TREE widget with a configuration object (parameters) that control the following:<br/>
 *  1. where to get the data from (api) or an xml/atom document ojbect itself<br/>
 *  2. what parts of the data to display (filtering/features)<br/>
 *  3. how the displayed data (files/folders) should look (node styling)<br/>
 *  4. who to call when the user interacts with the nodes of a tree (node events and user actions)<br/>
 * <br/>
 *  The tree widget is responsible for:<br/>
 *  0. acquiring all controlling parameters from caller/initialization<br/>
 *  1. instantiating a datastore object, if required<br/>
 *  2. displaying a container of nodes of the tree<br/>
 *  3. instantiating node widgets for each xml atom entry node (of either the xhr response of the datastore or the xml/atom document passed in)<br/>
 * <br/>
 *  The node widget is responsible for:<br/>
 *  1. displaying the node itself from the atom entry passed in<br/>
 *  2. handle the event framework of the node (i.e. click, open, close, select, etc. user actions), executing callbacks as defined<br/>
 *  3. instantiate the tree widget for the containing subset (recursive usage of tree/node paradigm)<br/>
 * <br/>
 *  The datastore widget part is responsible for:<br/>
 *  1. data loading (firing actual xhr calls) based on parameters received<br/>
 * <br/>
 * <br/>
 * Instantiates:<br/>
 * 1) a datastore widget object<br/>
 * 2) node widget object from each data item acquired (see datastore or beans in config)<br/>
 * 3) recursively more tree objects for each node within a tree object that gets loaded at runtime<br/>
 * <br/>
 *
 * @fires lconn.share.widget.Tree#treeLoaded
 *
 * @namespace lconn.core.widget.Tree
 * @class lconn.share.widget.Tree
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @author Antonio Estrada <testrada@us.ibm.com>
 * @co-author Oliver-R Wittmann  <orwitt@de.ibm.com>
 *
 * @version *** PRE-PRODUCTION code *** Public Interfaces may still change;  contact authors for details/questions
 */
dojo.declare(
  "lconn.share.widget.Tree",
  [dijit._Widget, dijit._Templated, lconn.share.widget.KeyNavigatable], /** @lends lconn.share.widget.Tree.prototype */
{
  templatePath: dojo.moduleUrl("lconn.share","widget/templates/Tree.html"),

  /** css class prefix for tree elements  
    * @type {string}
    */
  classFilesTree: "lconnFilesTree",
  
  ariaRoleFilesTree: "tree",

  ariaRoleNode: "treeitem", // Role for general node. 
  ariaRoleNodeCheckbox: "treeitem", // Role for node which has checkbox 
  ariaRoleNodeRadio: "treeitem", // Role for node which has radio button
  indentNodePx: 10,
  
  /** css class for tree elements  
    * @type {string}
    */
  classTreeDiv: "tree",

  /** reference to the top most tree 
    * @type {lconn.share.widget.Tree}
    */
  rootTree: null,
  
  /** reference to the parent node that owns this tree 
    * @type {lconn.share.widget.Node}
    */
  parentNode: null,
  
  /** reference to the selected node (only available at the root tree)
    * @type {lconn.share.widget.Node}
    */
  selectedNode: null, // used by FolderNode instances to mark selected node
  
  initHeight: "auto",
  
  /** reference to the templated dom element that will contain the nodes of this tree
    * @type {domNode}
    */
  containerNode: null,
  
  /**
   * First child node of this tree
   */
  firstChildNode: null,

  _nextPageUri: null, // for loadMore
  
  /***
    * lconn.share.widget.Tree widget constructor
    * @param {object} args - the parameters which are mixed into this widget must contain the following object:<br/>  
    *   {object} datastore config obj
    *   {object} callbacks config obj
    *   {object} features config obj
    *   {object} [rootTree] - for child nodes, the reference to the root tree object
    *   {object} [parentNode] - for child nodes, the reference to the parent node object
    *
    */
  constructor: function(args) {
    this._initVars();
    dojo.safeMixin(this, args || {});
    
    // copy the config options passed in into our config object;
    // any option not supplied by consumer will remain with its default value as defined above
    dojo.safeMixin( this.cfg.ds, this.datastore );
    this._mergeObj( this.cfg.opts, this.features );
    this._mergeObj( this.cfg.cb, this.callbacks );

    var svcs = lconn.core.config.services;
    var isSecure = location.protocol == "https:";
    this.webresources = lconn.core.url.getServiceUrl(svcs.webresources, isSecure && svcs.webresources.secureEnabled).uri;
    this.blankGif = (dojo.config.blankGif? dojo.config.blankGif : this.webresources+"/web/com.ibm.lconn.core.styles.oneui3/images/blank.gif");
  },

  _initVars: function() {
    this.cfg = {
       
        ds:{ // datastore
          beans: [],
          feed: null,
          predefined: null,
          uri: null,
          apiParams: null,
          apiParamsOnUri: true,
          xhrSync: true, // true = xhr synchronously, false = xhr async 
          lazyLoad: true,
          scrollLoad: null,
          nextPageUri: null,

          isAuthed: null,
          onError: null
        },

        opts:{ // options (features)
          isDndTarget: false,
          isDndSource: false,
          isCached: false,
          isBreadcrumb: false,
          indentNodePx: 10,
          isRecalcedOnResize: true,
          prefix: null,
          rootName: null,
          folder:{
            show: true,
            aria: {
               LABEL_CONTENT_IN_ROOT: "",
               LABEL_CONTENT_IN_FOLDER: ""
            },
            render:{
              checkbox: false,
              twisty: true,
              icon: true,
              title: true,
              externalIcon: true,
              visibilityIcon: true
            },
            behavior:{
              isSelectable: true,
              isTitleAnchored: true,
              isHighlightedOnSelect: true,
              isCheckedOnSelect: true,
              isMultiSelectable: false,
              titleWidthCalcConsidersSuffixedElements: true
            },
            maxDepth: 0
          },
          file:{
            show: true,
            render:{
              checkbox: true,
              twisty: false,
              icon: true,
              title: true,
              externalIcon: true,
              visibilityIcon: true
            },
            behavior:{
              isSelectable: true,
              isTitleAnchored: false,
              isHighlightedOnSelect: true,
              isCheckedOnSelect: true,
              isMultiSelectable: false,
              titleWidthCalcConsidersSuffixedElements: true
            }
          }
        },
        
        cb:{ // callbacks
          onError: null,
          
          treeLoaded: null,  // emits: lconn/share/widget/Tree/treeLoaded
          onDrop:     null,  // called upon drop on root tree
          filterNode: null,  // to filter out node before creation of node object
          disableDropForItem: null,   //check if the item can drop
          
          node:{
            rendered:   null,  // emits: lconn/share/widget/Node/rendered
            selected:   null,  // emits: lconn/share/widget/Node/selected
            unselected: null,  // emits: lconn/share/widget/Node/unselected
            beforeexpanded: null, // emits: lconn/share/widget/Node/beforeexpanded
            expanded:   null,  // emits: lconn/share/widget/Node/expanded
            beforecollapsed:  null,  // emits: lconn/share/widget/Node/beforecollapsed
            collapsed:  null,  // emits: lconn/share/widget/Node/collapsed
            preselect:  null,  // to pre-select node
            disable:    null,  // to disable node
            tooltip:    null,  // to customize tool tip of node
            header:{
              onchange: null,
              onclick: null,
              onclickchildexcludelist:{ 
                 checkbox: true,
                 twisty: true,
                 icon: true,
                 title: true
              },
              onmouseenter: null,
              onmouseleave: null,
              checkbox:{ onclick: null },
              twisty:{ onclick: null },
              icon:{ onclick: null },
              title:{ onclick: null }
            }
          }
        }
      };

     this.rootTree = null;
     this.parentNode = null;
     this.selectedNode = null;
     this.firstChildNode = null; // Track of the first child

     this._dndSource = null; // note: dnd reference object maintained only at the root tree

     this._nextPageUri = null; // for loadMore

     this._nodes = {}; // objects (associative array) of all nodes in this tree.  In root tree it contains ALL the nodes in all the levels
     this._nNodes = 0; // total number of nodes in this tree.  In root tree it contains total of all the nodes in all the levels
     
     this._strings = {};
  },
  
  _swapTabIndexable: function( currentEl ) {
     if ( currentEl ) {
        
        if ( this.rootTree.lastTabIndexable )
           dojo.attr( this.rootTree.lastTabIndexable, "tabindex", "-1" );

        dojo.attr( currentEl, "tabindex", "0" );
        
        this.rootTree.lastTabIndexable = currentEl;
        dijit.setWaiState( this.rootTree.domNode, "activedescendant", currentEl.id );
     }
   },

   _mergeObj: function( trgObj, srcObj) {
    if( typeof trgObj !== 'object') trgObj={};

    for( var prop in srcObj) {
      if ( srcObj.hasOwnProperty(prop)) {
        var srcProp = srcObj[prop];
        if ( typeof srcProp === 'object' ) {
          trgObj[prop] = this._mergeObj( trgObj[prop], srcProp);
          continue;
        }
        trgObj[prop] = srcProp;
      }
    }

    for( var i=2, l=arguments.length; i<l; i++) this._mergeObj(trgObj, arguments[i]); // merge all incoming args 
    return trgObj;
  },
  
  postMixInProperties: function() {
    this.inherited( arguments);
    dojo.mixin( this._strings, dojo.i18n.getLocalization("lconn.core", "strings"));
    dojo.mixin( this._strings, dojo.i18n.getLocalization("lconn.share","Tree"));

    if( this._isRoot( )) {
      this.rootTree = this;
      this._setLevel( 1 );
      
      if( this.cfg.opts.isRecalcedOnResize ) {
        this._resizeListener = dojo.connect( window, "resize", dojo.hitch(this, 
          function(evt){ 
            this.recalcNodeWidths( true ); 
          }));
      }
        
    } else {
      this._setLevel( this.parentNode._getLevel( )+1 ); // depth level
    }
  },

  postCreate: function() {
    this.inherited( arguments);
    if(this.cfg.ds.scrollLoad && this.containerNode) {
       this.containerNode.onscroll = dojo.hitch(this, '_onScroll');
    }
  },

  startup: function() {
    this._renderNodes( this.cfg.ds );
  },

  destroy: function() {
    this._destroyed = true;

    this._clearNodes();
    this._clearDatastore();
    if( this._resizeListener ) dojo.disconnect( this._resizeListener );

    this.inherited(arguments);
  },

  hasScrollBar: function() {
     var ret = false;
     if ( this.containerNode ) {
        ret = this.containerNode.clientHeight < this.containerNode.scrollHeight;
     }
     return ret;
  },
  
  queryByDomId: function( domId ) {
     var ret = null;
     
     for( id in this._nodes ) {
        var node = this._nodes[id];
        if (node.domNode.id == domId) {
           ret = node;
           break;
        }
     }
     
     return ret;
  },

  /**
   * Set tabindexable to a domNode in this tree. Only one domNode is set to be tabindex = 0.
   */
  setTabindexable: function( domNode ) {
     if ( domNode )
        this.rootTree._swapTabIndexable( domNode ); 
  },

  /**
   * destroys all nodes in this tree recursively and zeroes out node arrays (done at node destroy) and counters
   */
  _clearNodes: function() {
     for( id in this._nodes ) {
        if( this._nodes[id].destroyRecursive ) 
          this._nodes[id].destroyRecursive();
     }
     this._nNodes = 0;
  },

  /**
   * destroys this tree's datastore object
   */
  _clearDatastore: function() {
     if( this._datastore) dojo.destroy(this._datastore);
  },

  _isRoot: function() { 
    return( !this.parentNode ); // parent node is only set from the node object, thus if its null this tree has no parent node, meaning we are root.
  },

  _getLevel: function() { return( this.level ); },

  _setLevel: function( level ) { this.level = level; },

  /**
   * creates and renders nodes based on the supplied datastore object params,
   * using the following sequence for determining where to load data from:<br/>
   * 1. datastore.beans array<br/>
   * 2. datastore.feed document object<br/>
   * 3. datastore.uri or datastore.predefined strings (datastore xhr)<br/>
   *  
   * @param {object} datastore - the datastore config object
   */
  _renderNodes: function( datastore, loadOnce ) {
    var getNextPageUri = function( resp ) { return( resp && dojo.query("link[rel='next']",resp).length ? dojo.query("link[rel='next']",resp)[0].getAttribute("href") : null ); };

    this.loadingDiv.style.display = "block";
    
    // use file/collection beans array
    if( datastore.beans.length) {  
      this._createNodes( datastore.beans );
      
      this._nextPageUri = datastore.nextPageUri;
      if( datastore.lazyLoad ) {
        this._loadMore( this._nextPageUri );
      } else if ( this._nextPageUri ) {
        this._showLoadMore( );
      }
      this.loadingDiv.style.display = "none";

    // use atom/xml feed document object
    } else if( datastore.feed) { 
      this._createNodes( datastore.feed );

      // use nextPageUri out of datastore or, if none was provided, attempt to set it by getting it out of the feed's link rel=next node
      this._nextPageUri = datastore.nextPageUri || getNextPageUri( datastore.feed );
      if( datastore.lazyLoad ) {
        this._loadMore( this._nextPageUri );
      } else if ( this._nextPageUri ) {
        this._showLoadMore( );
      }
      this.loadingDiv.style.display = "none";

    // use xhr with datastore uri or internally predefined uri
    } else if( datastore.uri || datastore.predefined ){ 
      this._clearDatastore();
      this._datastore = new lconn.share.widget.datastore( datastore );
      this._datastore.load( dojo.hitch( this,
        function(resp, ioargs){
          if ( this._destroyed ){
             return;
          }

          this._createNodes( resp );

          this._nextPageUri = getNextPageUri( resp );
          if( this._datastore.cfg.scrollLoad) {
             if(loadOnce) {
                this.loadingDiv.style.display = "none";
                return;
             }
             this._loadMoreByScrollDown( this._nextPageUri, loadOnce );
          }else if( this._datastore.cfg.lazyLoad ) {
            this._loadMore( this._nextPageUri );
          } else if ( this._nextPageUri ) {
            this._showLoadMore(  );
          }
          
          this.loadingDiv.style.display = "none";
        })
      );
    }
  },

  /**
   * called from within _renderNodes stack or from the template's "load more" onclick event
   * calls _renderNodes (recursively) with a datastore updated to use the next page uri until there are no more nextPageUri's set
   * @param {string|object} param - the next page uri or the event when called from the templates "load more" onclick event
   */
  _loadMore: function( param ) {
    if ( this._destroyed ){
       return;
    }

    this._hideLoadMore(); // more will get redisplayed based on results from this load more event...

    var nextPageUri = ( typeof( param ) === "string"? param : null);
    if( !nextPageUri && !this._nextPageUri ) return; // exit, as we don't have a next page to load...

    var ds = dojo.clone( this.cfg.ds );
    ds.feed = null; // clear possible existing feed data, since we are going to query tree using URI
    ds.beans = [];  // clear possible existing bean data, since we are going to query tree using URI
    ds.apiParamsOnUri = false; // use the next page URI straight without adding params (URI may have params already on it)
    ds.uri = nextPageUri || this._nextPageUri; // if we got a nextPageUri as a param use it, otherwise use the one in the tree object
    ds.xhrSync = false; // always asynchronously lazyload or user triggered load more 
    
    this._renderNodes( ds ); // go render more nodes....
  },
  
  /**
   * called from within _renderNodes stack or from the template's "load more" onclick event
   * calls _renderNodes (recursively) with a datastore updated to use the next page if no scroll bar shows
   * @param {string|object} param - the next page uri or the event when called from the templates "load more" onclick event
   */
  _loadMoreByScrollDown: function( param, loadOnce) {
    if ( this._destroyed ){
       return;
    }
    
    if( this.containerNode.scrollHeight > this.containerNode.clientHeight && !loadOnce) {
       return;
    }

    this._hideLoadMore(); // more will get redisplayed based on results from this load more event...

    var nextPageUri = ( typeof( param ) === "string"? param : null);
    if( !nextPageUri && !this._nextPageUri ) return; // exit, as we don't have a next page to load...

    var ds = dojo.clone( this.cfg.ds );
    ds.feed = null; // clear possible existing feed data, since we are going to query tree using URI
    ds.beans = [];  // clear possible existing bean data, since we are going to query tree using URI
    ds.apiParamsOnUri = false; // use the next page URI straight without adding params (URI may have params already on it)
    ds.uri = nextPageUri || this._nextPageUri; // if we got a nextPageUri as a param use it, otherwise use the one in the tree object
    ds.xhrSync = false; // always asynchronously lazyload or user triggered load more 
    
    this._renderNodes( ds, loadOnce); // go render more nodes....
  },
  
  _onScroll: function(e) {
    if(e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight - 1) {
        if(this._oldPage === this._nextPageUri) {
           return;
        }
        this._oldPage = this._nextPageUri;
        this._loadMoreByScrollDown(this._nextPageUri, true);
     }
  },
  
  _showLoadMore: function( ) {
    this.moreDiv.style.display = "block";
  },
  
  _hideLoadMore: function( ) {
    this.moreDiv.style.display = "none";
  },
  
  /**
   * Iterates over a data source, which may be beans array or an object of an atom/xml feed entries, and creates nodes from it 
   * @param {array|object} data - is either an array of either lconn.share.bean.File|lconn.share.bean.Collection objects OR an atom/xml DOM object.
   * @returns {lconn.share.widget.Node[]|null} nodes object array containing instance references to all the added nodes
   */
  _createNodes: function( data ) { // data: beans | xml doc 
    if( typeof( data ) != "object" ) return null;
    
    var entries = [];
    
    if( !dojo.isArray( data )) { // DATA IS XML OBJECT
      entries = dojo.query("entry", data); // get array of entry nodes from the feed

    } else if( dojo.isArray( data )) { // DATA IS A BEANS ARRAY
      entries = data;
    }
    
    var node = null;
    dojo.forEach( entries, dojo.hitch( this,
      function( entry, i) {
        node = this._createNode( entry);
        if( node ) this._addNode( node );
      })
    );

    // recalc node widths AFTER all nodes have been rendered;
    if( this.getRoot()) this.getRoot().recalcNodeWidths( true );
    
    // Set arial-label
    if ( !this.getParentNode() ) {
       dojo.attr( this.containerNode, "aria-label", this.cfg.opts.folder.aria.LABEL_CONTENT_IN_ROOT + this.cfg.opts.rootName)
    }
    else {
       dojo.attr( this.containerNode, "aria-label", this.cfg.opts.folder.aria.LABEL_CONTENT_IN_FOLDER + this.getParentNode().getTitle());
    }
    
    /** event lconn/share/widget/Tree/treeLoaded fires when the tree is loaded with nodes
      * @event lconn.share.widget.Tree#treeLoaded
      * @type {dojo.publish}
      * @param {lconn.share.widget.Tree} - the tree object
      */    
    dojo.publish("lconn/share/widget/Tree/treeLoaded", [this]);
    if( this.cfg.cb.treeLoaded) this.cfg.cb.treeLoaded.call( this, this);
    
    return this._nodes;
  },
  
  /**
   * creates a node from the entry, which can be a bean or a DOM atom/xml entry node 
   * @param {lconn.share.bean.File|lconn.share.bean.Collection|domNode} data - is either a lconn.share.bean.File|lconn.share.bean.Collection object OR an atom/xml entry DOM object.
   * @returns {lconn.share.widget.Node|null} the node created or null
   */
  _createNode: function( entry ) {
    if( typeof( entry ) != "object" ) return null;

    /*
    var _isCommunityCollection = function(ds) { 
      var isCommunity = ic_comm_communityUuid? true : false;
      return( ( isCommunity && !ds.uri && !ds.feed && ds.beans.length == 0 && ds.predefined == "files") || (ds.uri && ds.uri.indexOf("/communitycollection/") != -1) ); // if we are in a community and using the built-in predefined files API, and we don't have a URI, feed, nor beans objects, OR we have a URI with /communitycollection/ in it, then this is a communitycollection
    };
    */

    var _filterNode = function( tree, nodebean) { // FILTER OUT NODES?
      // filter out files or folders depending on show<kind> features
      if( !tree.cfg.opts.file.show   && !nodebean.isFolder()) return true;
      if( !tree.cfg.opts.folder.show &&  nodebean.isFolder()) return true;
      if ( typeof( tree.cfg.cb.filterNode ) == "function" && tree.cfg.cb.filterNode.call( tree, nodebean.getBean() ) ) return true;

      /* 
      see RTC: 156244: common tree widget:  tree should not filter out fiiles from the /communitycollection/ API
      // the "communitycollection" includes all files, including those inside all the nested folders,
      // thus, until the API provides an option to only return "communitycollection" root level elements,
      // we need to filter out files that do not belong in the root level (i.e. those that are filed in a folder)
      // TODO: This should be taken care of by the API call; API should provide param to return only items in collection.  Remove this check once API is updated.
      if( _isCommunityCollection( tree.cfg.ds) && !file.isFolder()) {
        if( file.isFiledInFolder()) return true; // skip files that are in folders if we are asking for the communitycollection
      }
      */

      return false; // don't filter node
    };
    
    var nodebean = null;

    // BEAN
    if ( lconn.share.widget.nodebean.isSupportedBean( entry ) ) {
      nodebean = lconn.share.widget.nodebean.createNodeBean( entry );

    // ATOM/XML ENTRY
    } else {  
      var testFileBean = new lconn.share.bean.File( entry );
      if( testFileBean && !testFileBean.isFolder()) {
         nodebean = lconn.share.widget.nodebean.createNodeBean( testFileBean );
      }
      else {
         nodebean = lconn.share.widget.nodebean.createNodeBean( new lconn.share.bean.Collection( entry ) );
      }
    }

    if( _filterNode( this, nodebean )) return null;

    return (new lconn.share.widget.Node({ pTree: this, 
       _strings: this._strings, 
       nodebean: nodebean, 
       ariaRoleNode: this.ariaRoleNode, 
       ariaRoleNodeCheckbox: this.ariaRoleNodeCheckbox, 
       ariaRoleNodeRadio: this.ariaRoleNodeRadio, 
       indentNodePx: this.cfg.opts.indentNodePx }));
  },
  
  /**
   * adds the node instance to the nodes array, places and starts up the node
   * @param {lconn.share.widget.Node} node
   * @returns {lconn.share.widget.Node|null} node created or null
   */
  _addNode: function( node ) {
    if( node ) {
      this._addNodeRef( node );
      node.pTree = this;
      node.placeAt( this.loadingDiv, "before");
      node.startup();
      this._setupDnd();
      return node;
    }
    return null;
  },
  
  /**
   * adds the reference to the node to this tree's array/counter
   * @param {lconn.share.widget.Node} node
   */
  _addNodeRef: function( node ) {
    if( !node || typeof(node) != "object" || node.declaredClass != "lconn.share.widget.Node") return null;
    
    if( this._nodes[node.data.entryId] == undefined ) { // node does not currently exist in this tree...
      this._nNodes++; 
      
      if ( this._nNodes == 1 )
         this.firstChildNode = node;

      var pNode = this.getParentNode();
      if( pNode ) {
        pNode.data.childrenCount++;
        pNode._displayTwisty();
      }
    }
    
    this._nodes[node.data.entryId] = node;
  },

  /**
   * removes the reference to the node from this tree's array/counter
   * @param {lconn.share.widget.Node} node
   * @returns {boolean|null} true if node existed in this tree's array and was removed; null if it was not found in this tree
   */
  _removeNodeRef: function( node ) {
    if( !node || typeof(node) != "object" || node.declaredClass != "lconn.share.widget.Node") return null;
    
    if( this._nodes[node.data.entryId] ) {
      delete this._nodes[node.data.entryId];
      this._nNodes--;

      var pNode = this.getParentNode();
      if( pNode ) {
        pNode.data.childrenCount--;
        pNode._displayTwisty();
      }

      return true;
    }
    return null;
  },
  
  _setupDnd: function( ) {
    if( !lconn.core.auth.isAuthenticated( )) return;

    var isSource = this.cfg.opts.isDndSource;
    if( this.cfg.opts.isDndTarget || isSource ) {
        if( this._isRoot( ) ) {
          var accept = ["file", "folder"];
          this._dndSource = new lconn.share.widget.tree.dnd.Source( this.domNode, {
            isSource: isSource, // false means this will only be a target for drops
            accept: accept,
            selfAccept: true,
            singular: true,
            copyOnly: true,
            allowNested: true,
            dropParent: this.containerNode,
            createAvatar: dojo.hitch( this, this._createAvatar),
            onDrop: dojo.hitch( this, this._onDrop),
            disableDropForItem: dojo.hitch(this, this._disableDrop)
          });
          
          setTimeout( dojo.hitch( this, function(){  this.getDnd( ).sync( ); }), 500);
          
        } else if( this.getDnd( ) ){
          this.getDnd( ).sync( ); // sync up the nodes added
        }

        // avatar
        if( this.cfg.opts.isDndSource && this._dndSource ) {
          // if manager has a makeAvatar function already... save it
          if( typeof( dojo.dnd.manager().makeAvatar) == "function" && dojo.dnd.manager().makeAvatar != this._dndSource.makeAvatar ) {
            dojo.dnd.manager().previousMakeAvatarFunc = dojo.dnd.manager().makeAvatar;
          }
          dojo.dnd.manager().makeAvatar = this._dndSource.createAvatar; // avatar for dragging this node
        }
    }
  },
  
   _disableDrop: function(targetCollection, sourceCollection) {
      var disableDrop = false;
     
      //check if target collection is the same with current dragged collection
      if(sourceCollection && sourceCollection.isFolder()) {
         if(sourceCollection.getId() == targetCollection.getId())
            disableDrop = true;
         if(sourceCollection.getParentId() && sourceCollection.getParentId() == targetCollection.getId())
            disableDrop = true;
      }

      //check if the dragged Item has been in target Collection
      if(!disableDrop && this.cfg.cb.disableDropForItem)
         disableDrop = this.cfg.cb.disableDropForItem.call(this, this, targetCollection);
      return disableDrop;
   },

  _createAvatar: function( ) {
    var node = dijit.byId( dojo.dnd.manager().source.node.id );
    var isTreeNode = ( node && ( node.declaredClass == "lconn.share.widget.Node" || node.declaredClass == "lconn.share.widget.Tree" ));
    
    if( !isTreeNode ) { // if we are not dragging a tree node
      if( dojo.dnd.manager().previousMakeAvatarFunc ) { // if there was a previous makeAvatar set, use it...
        return dojo.dnd.manager().previousMakeAvatarFunc();
      } else { // otherwise fallback to default
        return new dojo.dnd.Avatar( dojo.dnd.manager() );
      }
    } else {
      return new lconn.share.widget.tree.dnd.Avatar( dojo.dnd.manager() );
    }
  },
  
  _onDrop: function( source, nodes, isCopy) {
     try {
        var targetNode = this.getDnd().targetAnchor; // get the target from our tree's dnd target object
        if( targetNode ) {
           if( dojo.getAttr(targetNode,"name") === "headerOuter" ) 
              targetNode = targetNode.parentNode;
           if( typeof( this.cfg.cb.onDrop ) == "function")
              this.cfg.cb.onDrop.call( this, this, targetNode, source, nodes, isCopy);
        }
     } catch( ex ) {
        dojo.publish("/dnd/cancel", [target]);
        throw new Error("Exception: something went wrong during drag and drop operation: " + ex);
     }
  },
  
  //----------------------------------------------------------------------
  // Keyboard navigation
  //
  _onDownArrow: function( evt ) {
     var children = this.getChildren();
     if ( children && children.length > 0 ) {
        children[0].focus( false );
     }
  }, 
  
  //----------------------------------------------------------------------
  // BEGIN TREE PUBLIC INTERFACE METHODS
  //

  /**
   * @returns {lconn.share.widget.Datastore} this tree's datastore object
   */
  getDatastore: function() {
    return( this._datastore );
  },

  /** @returns {boolean} true if the tree is breadcrumb type */
  isBreadcrumb: function() { return( this.cfg.opts.isBreadcrumb /* this.declaredClass === "lconn.share.widget.TreeWithBreadcrumb" */ ); },
  
  /**
   * @returns {lconn.share.widget.Tree} the root tree object of this widget (aka. the first level)
   */
  getRoot: function() { return( this.rootTree ); },
  
  /** @returns {dojo.dnd.Source|null} the dnd Source for the tree */
  getDnd: function() { return( this.getRoot()? this.getRoot()._dndSource : null); },

  /** @returns {lconn.share.widget.Node} the parent node of this tree */
  getParentNode: function() { return( this.parentNode ); },

  /** @returns {lconn.share.widget.Node|null} the currently single selected node as referenced by the root tree, or null if no node is selected or multiselection is enabled */
  getSelectedNode: function() { return( this.getRoot( ).selectedNode ); },

  /**
   * Returns a node <code>lconn.share.widget.Node</code> object for the given id, if it has been loaded/created, or null if not found
   * @param {string} id - the entry id of the node requested
   * @param {boolean} [isRecursive=false] - search inner nodes as well.  if omitted, only search this tree
   * @returns {lconn.share.widget.Node|null} the node object that matches the given id, or null if not found
   */
  getNodeById: function( id, isRecursive ) {
    if( typeof(isRecursive) == "undefined" ) isRecursive = false; 
    return this.getNodes(isRecursive)[id]; 
  },
  
  /**
   * Returns the first found node <code>lconn.share.widget.Node</code> object within the tree (or inner tree if opt) if it has been loaded/created, or null if not found
   * @param {string}  title - the title of the node requested
   * @param {boolean} [isRecursive=false] - search inner nodes as well.  if omitted, only search this tree
   * @returns {lconn.share.widget.Node|null} the first node object that matches the given title, or null if not found
   */
  getNodeByTitle: function( title, isRecursive ) {
    if( typeof(isRecursive) == "undefined" ) isRecursive = false; 
    var node = null;
    var nodes = this.getNodes(isRecursive);
    for(id in nodes){
      if( nodes[id].data.title == title) {
        node = nodes[id];
        break;
      }
    }
    return node;
  },
  
  /**
   * Returns the node referenced by the supplied bean.getId() or null if not found.
   * Searches in the following order: this tree, this inner trees, inner trees starting from root tree.
   * @param {lconn.share.bean.File|lconn.share.bean.Collection} bean - the bean to to search for (matches against the id of the bean)
   * @returns {lconn.share.widget.Node|null} the node object that matches the given bean (by id), or null if not found
   */
  getNodeByBean: function( bean ) {
    if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;

    var nodebean = lconn.share.widget.nodebean.createNodeBean(bean);
    var node = this.getNodeById( nodebean.getId());
    if( !node ) node = this.getNodeById( nodebean.getId(), true /* search inner trees recursively */ );
    if( !node ) node = this.getRoot().getNodeById( nodebean.getId(), true /* search from root tree recursively */ );
    return node;
  },
  
  /**
   * Returns a hash map of all the nodes in all the levels starting with this tree
   * @param {boolean} [isRecursive=false] - return inner nodes as well.  if omitted, only return this tree's nodes
   * @returns {lconn.share.widget.Node[]|null} hash object array (aka associative array) of node objects in this tree, and inner trees if recursive
   *
   * @example 
   * allNodes = myTree.getRoot().getNodes(true);
   * for(id in allNodes) { console.log("node: "+allNodes[id].getTitle()); }
   */
  getNodes: function( isRecursive ) {
    if( typeof(isRecursive) == "undefined" ) isRecursive = false; 
    var nodes = this._nodes;

    if( isRecursive ) {
      var allNodes = {};
      for( id in nodes ) {
        var node = nodes[id];
        if( node.tree && node.tree.getNodes()) { // if this node's inner tree has inner nodes
          allNodes[id] = node;
          var innerNodes = node.tree.getNodes( isRecursive );
          for( id2 in innerNodes) allNodes[id2] = innerNodes[id2];
        } else {
          allNodes[id] = this.getNodeById( id );
        }
      }
      return allNodes;
    }
    return nodes;
  },

  /**
   * @returns {number} this tree's relative depth level
   */
  getNodesCount: function() {
     return this._nNodes;
  },

  /**
   * @returns {number} the relative depth level of this tree within the loaded trees (i.e. 1=root level)
   */
  getDepth: function() {
    return( this.level );
  },
  
  /**
   * Places the supplied node object into this tree.  Consumer must start the node via node.startup() if the node was not previously started.
   * @param {lconn.share.widget.Node|lconn.share.bean.File|lconn.share.bean.Collection} node - the node to add.  note: the node's node.data.entryId property must be unique and not exist in currently loaded nodes 
   * @returns {lconn.share.widget.Node|null} the node after being added to the tree or null if it was not added
   */
  addNode: function( node ) {
    if( !node ) return null;
    if( typeof(node) != "object" ) return null;
    if( node.declaredClass != "lconn.share.widget.Node" && !lconn.share.widget.nodebean.isSupportedBean( node ) ) return null;

    var newNode = lconn.share.widget.nodebean.isSupportedBean( node ) ? this.addNodeFromBean( node ) : this._addNode( node );
    return( newNode );
  },

  /**
   * Creates a node from the supplied lconn.share.bean.File|lconn.share.bean.Collection bean object and adds it to this tree.
   * @param {lconn.share.bean.File|lconn.share.bean.Collection} bean - the bean to to search for (matches against the id of the bean)
   * @param {boolean} [sort] - sort the tree after adding the node 
   * @todo - figure out how to implement sort
   * @returns {lconn.share.widget.Node|null} the node after being added to the tree or null if it was not added
   */
  addNodeFromBean: function( bean ) {
    if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;
    if( this.getNodeByBean(bean) ) return null; // bean already exists as a node; can't add

    var newNode = this._createNode( bean );
    if( newNode ) this._addNode( newNode );
    
    return( newNode );
  },
  
  /**
   * Creates nodes from the atom/xml entry nodes found in the results of the supplied API URI and adds them to this tree.
   * @param {string} uri - the API's URI that returns the node(s) atom/xml feed entries
   * @returns {lconn.share.widget.Node[]|null} nodes object array containing instance references to all the nodes of this tree, or null if non were added
   */
  addNodeFromURI: function( uri  ) {
    var datastore = new lconn.share.widget.datastore({
      uri: uri,         
      beans: [],
      feed: null,
      predefined: null,
      apiParams: null,
      isAuthed: this.cfg.ds.isAuthed,   
      onError: this.cfg.ds.onError
    });
    
    var nodes = null;
    datastore.load( dojo.hitch( this, 
      function(resp, ioargs){
        nodes = this._createNodes( resp );
      })
    );
    
    return nodes;
  },

  /**
   * Removes the given node from the tree, updates tree's node counters and arrays, and destroys it from memory
   * @param node {lconn.share.widget.Node}
   * @returns {Boolean} - true: node removed; false: node not removed, because it is not a child of this Tree
   */
  removeNode: function( node ) {
    if( !node || typeof(node) != "object" || node.declaredClass != "lconn.share.widget.Node") return false;
    if ( this.getNodeById( node.getId(), false ) ) {
      if( node.remove( )) return true;
    }
    return false;
  },

 /**
  * Sorts the nodes in this tree and places them in the sorted order
  * @param {object} [ascending:true] - sort direction.
  */
  sortNodes: function( params ) {
    if( typeof(params) === "undefined" ){
      params = {};
      params.ascending = true;
    }
    
    // put nodes in sequential array
    var topNodes = [];
    var bottomNodes = [];
    var autoNodes = [];
    
    var nodes = this.getNodes( );
    if( nodes && this.getNodesCount( ) > 1 ) {
      var topIndex=0;
      var bottomIndex=0;
      var autoIndex=0;
      for( id in nodes ) {
        if (nodes[id].getSortType() == "top") {
          topNodes[topIndex++] = nodes[id];
        }
        else if (nodes[id].getSortType() == "bottom") {
          bottomNodes[bottomIndex++] = nodes[id];
        }
        else {
          autoNodes[autoIndex++] = nodes[id];
        }
      }
    }
    
    // sort nodes using native array sort
    autoNodes.sort( dojo.hitch( params, function(a,b) {
      return( this.ascending? ( a.getTitle() > b.getTitle() ? 1 : -1 ) : ( a.getTitle() < b.getTitle() ? 1 : -1 ) );
    }));
    
    // place the nodes as sorted
    for( i = bottomNodes.length-1; i >= 0; i-- ) dojo.place( bottomNodes[i].domNode, this.containerNode, "first");
    for( i = autoNodes.length-1; i >= 0; i-- ) dojo.place( autoNodes[i].domNode, this.containerNode, "first");
    for( i = topNodes.length-1; i >= 0; i-- ) dojo.place( topNodes[i].domNode, this.containerNode, "first");
    
    this.firstChildNode = topNodes.length == 0 ? (autoNodes.length == 0 ? bottomNodes[0] : autoNodes[0]) : topNodes[0];
  },
  
  /**
   * Updates the node referenced by the supplied bean.
   * @param {lconn.share.bean.File|lconn.share.bean.Collection} bean - the bean to use to get the node and update it with.
   * @returns {lconn.share.widget.Node|null} the node after being update, or null if none was updated
   */
  updateNode: function( bean ) {
    if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;
    var node = this.getNodeByBean( bean );
    if( node )  
      return( node.update( bean ));
    else
      return null;
  },
  
  /**
   * Updates this tree's nodes with the supplied visibility
   * @param {lconn.share.bean.File|lconn.share.bean.Collection} bean - the bean to use to get the visibility from
   * @param {boolean} [isRecursive=false] - true:also inner nodes.  false or omitted, only this tree's nodes
   * @returns {null} null if invalid params
   */
  updateNodesVisibility: function( bean, isRecursive ) {
    if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;
    if( typeof(isRecursive) == "undefined" ) isRecursive = false;

    var nodes = this.getNodes( isRecursive );
    for( id in nodes ) {
      var node = nodes[id];
      node.updateVisibility( bean );
    }
  },

  /**
   * Recalculates this tree's nodes widths
   * @param {boolean} [isRecursive=false] - true:also inner nodes.  false or omitted, only this tree's nodes
   */
  recalcNodeWidths: function( isRecursive ) {
    if( typeof(isRecursive) == "undefined" ) isRecursive = false;
    var nodes = this.getNodes( isRecursive );
    for( id in nodes ) {
      var node = nodes[id];
      node.recalcWidths( );
    }
  },

  /**
   * Replaces the node referenced by the supplied bean.
   * If the node does not exist, it will create the node from the bean.
   * Differs from updateNode in that replaceNode actually recreates the node by first destroying it and then creating a new one.
   * @param {lconn.share.bean.File|lconn.share.bean.Collection} bean - the bean to use to recreate the node with.
   * @returns {lconn.share.widget.Node|null} the node after being created, or null if none was created
   */
  replaceNode: function( bean ) {
    if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;
    var node = this.getNodeByBean( bean );
    if( node ) node.destroy();
    return( this.addNodeFromBean( bean ));
  },
  
  /**
   * Expands (opens) this tree's nodes.
   * @param {boolean} [isRecursive=false] - expand inner nodes as well.  if omitted, only expand this tree
   */
  expandNodes: function( isRecursive ) {
    if( typeof(isRecursive) === "undefined" ) isRecursive = false;
    if( isRecursive) {
      var sync = this.cfg.ds.xhrSync;
      this.cfg.ds.xhrSync = true;
    }
    
    for( id in this._nodes ) this._nodes[id].expand( );
    if( isRecursive ){
      for( id in this._nodes ) {
        if( this._nodes[id].tree ) {
          this._nodes[id].tree.expandNodes( isRecursive );
        }
      }
    }

    this.cfg.ds.xhrSync = sync;
  }, 

  /**
   * Loads the nodes by navigating the supplied path and expanding each node of the path found.  
   * Useful to display the tree with certain inner node expanded.
   * Uses getNodeByTitle to search for the node within the path
   *
   * @example
   * tree.expandByPath("/Designs/Nested Folders/Specs")
   *  
   * @param {string} path - the path to load with nodes separated by slash character or delim if supplied.
   * @param {string} [delim="/"] - the node separator delimiter character used in the path supplied. Defaults to "/" if not supplied.
   * @returns {lconn.share.widget.Node|null} returns the last loaded node found in the path, or null
   */
  expandByPath: function( path, delim ) {
    if( typeof(path) != "string" ) return null;
    if( typeof(delim) === "undefined" ) delim = "/";

    var sync = this.cfg.ds.xhrSync;
    this.cfg.ds.xhrSync = true;
    
    var nodeTitles = path.split( delim );
    if( !nodeTitles.length ) return null;
    
    var node = null;
    var tree = this;
    for( var i=0; i<nodeTitles.length; i++) {
      var title = nodeTitles[i];
      if( !title ) continue;
      if( tree && tree.getNodeByTitle ) {
        node = tree.getNodeByTitle( title );
        if( node ) {
          node.expand( true /* quiet */ );
          tree = node.tree;
        }
      }      
    }
    
    this.cfg.ds.xhrSync = sync;
    return node;
  },
  
  /**
   * Loads the nodes by navigating the supplied path (via id's) and expanding each node of the path found.  
   * Useful to display the tree with certain inner node expanded.
   * Uses getNodeById to search for the node within the path
   *
   * @example
   * tree.expandByPath("/248d361f-4e59-4210-9329-bc1817a4b3ba/114d361f-4a59-4219-9329-bc1817a4b3cc/a11d361f-4dd9-4aa0-c32c-bc1817a1aaba")
   *  
   * @param {string} path - the path to load with nodes separated by slash character or delim if supplied.
   * @param {string} [delim="/"] - the node separator delimiter character used in the path supplied. Defaults to "/" if not supplied.
   * @returns {lconn.share.widget.Node|null} returns the last loaded node found in the path, or null
   */
  expandByPathId: function( path, delim ) {
    if( typeof(path) != "string" ) return null;
    if( typeof(delim) === "undefined" ) delim = "/";

    var sync = this.cfg.ds.xhrSync;
    this.cfg.ds.xhrSync = true;
    
    var nodeIds = path.split( delim );
    if( !nodeIds.length ) return null;
    
    var node = null;
    var tree = this;
    for( var i=0; i<nodeIds.length; i++) {
      var id = nodeIds[i];
      if( !id ) continue;
      if( tree && tree.getNodeById ) {
        node = tree.getNodeById( id );
        if( node ) {
          node.expand( true /* quiet */ );
          tree = node.tree;
        }
      }      
    }
    
    this.cfg.ds.xhrSync = sync;
    return node;
  },

  /**
   * Collapses (closes) this tree's nodes without destroying their innards.
   */
  collapseNodes: function() {
    for( id in this._nodes ) this._nodes[id].collapse( );
  },

  /**
   * Collapses this tree's nodes and destroys all the inner levels.
   */
  reset: function() { // reset tree
    this.collapseNodes();
    for( id in this._nodes ) {
      if( this._nodes[id].tree && this._nodes[id].tree.destroy ) this._nodes[id].tree.destroy();
    }
  },
  
  /**
   * Reloads this tree's nodes.  If recursive, then reload inner node's too
   * @param {boolean} [isRecursive=false] - true:reload inner nodes.  if omitted, only reload this tree's nodes
   */
  reloadNodes: function( isRecursive ) {
    if( typeof(isRecursive) == "undefined" ) isRecursive = false;
    
    var nodes = this.getNodes( isRecursive );
    for( id in nodes ) {
      var node = nodes[id];
      if( node.isExpanded( )) {
        node.render( );
        node.expand( true ); // expand quietly
      } else {
        node.render( );
      }
    }
  },
  
  /**
   * Updates the nodes of this tree, adding new nodes and removing deleted nodes.  Existing nodes that were not removed are untouched .  
   */
  updateNodes: function( ) {
    var oNodes = this._nodes; // copy of nodes of this tree
    this._nodes = [];
    this.startup( ); // load and render nodes from the server (this will create duplicate nodes since we have not removed the nodes in this tree yet)

    // remove any original nodes that are no longer in the new loaded nodes array
    for( id in oNodes ) if( !this._nodes[id] ) oNodes[id].destroy(); 
    
    // remove the nodes that are still remaning in the original nodes, 
    // in order to maintain their original state, and transfer them into nodes array
    for( id in this._nodes ) {
      if( oNodes[id] ) { 
        this._nodes[id].destroy();
        this._nodes[id] = oNodes[id];
      }
    }
    
    this.sortNodes();
  }
  

  //
  // END TREE PUBLIC INTERFACE METHODS
  //----------------------------------------------------------------------
  
});




/**
 * Files Tree Node Widget<br/>
 * represents a node within a tree widget<br/>
 * <br/>
 * Instantiates:<br/>
 * 1) upon node expansion, a tree widget<br/>
 * @todo TODO this widget cannot live without a tree widget, so make it a dependancy and uninstantiable from outside a tree widget<br/>
 * <br/>
 *
 * @fires lconn.share.widget.Node#rendered
 * @fires lconn.share.widget.Node#selected
 * @fires lconn.share.widget.Node#unselected
 * @fires lconn.share.widget.Node#collapsed
 * @fires lconn.share.widget.Node#expanded
 *
 * @namespace lconn.core.widget.Tree
 * @class lconn.share.widget.Node
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @author Antonio Estrada <testrada@us.ibm.com>
 * @author Oliver-R Wittmann  <orwitt@de.ibm.com>
 *
 * @version *** PRE-PRODUCTION code *** Public Interfaces may still change;  contact authors for details/questions
 */
dojo.declare(
  "lconn.share.widget.Node",
  [dijit._Widget, dijit._Templated, lconn.share.widget.KeyNavigatable], /** @lends lconn.share.widget.Node.prototype */
{
  templatePath: dojo.moduleUrl("lconn.share","widget/templates/Node.html"),

  // control params
  /** the parent tree object of this node 
    * @type {lconn.share.widget.Tree} 
    */
  pTree: null,

  /** the child tree object of this node (inited when inner tree is requested)
    * @type {lconn.share.widget.Tree} 
    */
  tree: null,

  /** the wrapper for the different 'bean' types to instantiate the node from 
    * @type {lconn.share.widget.nodebean} 
    */
  nodebean: null,

  // template elements
  headerOuterDiv: null,
  headerSelectorDiv: null,
  headerDiv: null,
  checkboxDiv: null,
  checkbox: null,
  twistyDiv: null,
  twistyAnchor: null,
  iconDiv: null,
  titleDiv: null,
  titleAnchor: null,
  externalDiv: null,
  visibilityDiv: null,

  // template classes (overrideable)
  classNodeDiv: "node",
  classNodeHighlighted: "highlight",
  classNodeSelected: "selected",
  classNodeDisabled: "disabled",
  classHeaderOuterDiv: "headerOuter",
  classHeaderSelectorDiv: "headerSelector",
  classHeaderDiv: "header",
  classCheckboxDiv: "checkbox",
  classTwistyDiv: "twisty",
  classIconDiv: "icon",
  classTitleDiv: "title",
  classExternalDiv: "external",
  classVisibilityDiv: "visibility",
  classContainerDiv: "container",
  
  // template alt/title strings
  altNode: "",
  altHeader: "",
  altCheckbox: "",
  altTwisty: "",
  altIcon: "",
  altTitle: "",
  altExternal: "",
  altVisibility: "",
  ariaLabelTitle: "",

  // template images (overrideable)
  imgFolderClosedNode: null,
  imgFolderPrivateNode: null,
  imgFolderPublicNode: null, 
  imgFolderSharedNode: null,
  imgFolderCommunityNode: null,
  imgFileNode: null,
  imgExternalNode: null,
  imgVisSharedNode: null,
  imgVisPublicNode: null,
  imgVisPrivateNode: null,
  imgVisCommunityNode: null,

  data: {
    entryId: null,
    title: null,
    feed: null
  },

  // misc definitions / helpers
  _isFlatDepth: function() { return( this.cfg.opts.folder.maxDepth == 1); },
  _isLessThanMaxDepth: function() { return( this.cfg.opts.folder.maxDepth == 0 || this.pTree.level < this.cfg.opts.folder.maxDepth); },
  _isTwistyOpen: false,     // state of the folder expanded/collapse twisty image
  _isContainerLoaded: false,  // state of the container tree, loaded children or empty?
  
  /** amount of pixels to indent nodes by
   * @type {number}
   * @default 10
   */  
  indentNodePx: 10,

  _DOCMIMETYPE:{
    JPEG: "image/jpeg"
  },
  

  /***
   * required arguments:
   *    pTree: the parent tree object of this node
   *    nodebean: lconn.share.widget.nodebean object
   */
  constructor: function( args ) {
    dojo.safeMixin(this, args || {});

    this.cfg = dojo.clone( this.pTree.cfg ); // clone the config so that each node has control of its own config without affecting the other nodes configs

    this._initNodeData();
    this._initImgHtml();
    
    if( dojo.isIE == 8 ) this.canHaveChildren = true; // RTC#156889
  },

  _initNodeData: function() {
    this.data = {};
    if( !this.nodebean ) throw "Invalid arguments used to create a lconn.share.widget.Node object";
    
    this.data.entryId    = this.nodebean.getId();
    this.data.title      = this.nodebean.getTitle();
    this.data._titleForHTML = this.isFile() ? lconn.core.util.html.formatFilename(this.getTitle()) : this.getTitle();
    this.data.feed       = this.nodebean.getUrlFeed();

    this._initChildNodeData( );
    this._initTooltip( );
  },
  
  _initTooltip: function() {
    
    this._setTitleAltText( );
    this.altCheckbox = this.altTitle; // set by _setTitleAltText
    
    this.altIcon = this._getExtendedAltText( null, null, null, "_gen");
    this.altExternal = this._strings["gen_shared_ext"];
    this.altVisibility = this._getExtendedAltText( null, null, null, "_gen");
    
    this._setTwistyAltText( );
    
    // reset attributes of the previously rendered node
    if( this.iconDiv && this.iconDiv.title ) {
      this.iconDiv.title = this.altIcon;
      span = dojo.query("img+span", this.iconDiv).length? dojo.query("img+span", this.iconDiv)[0] : null;
      if( span ) span.innerHTML = this.ariaLabelTitle;
    }
    
    if( this.checkboxDiv && this.checkboxDiv.title ) {
      this.checkboxDiv.title = this.altCheckbox;
    }
  },
  
  _initChildNodeData: function() {
    if ( this.isFolder() ) {
       this.data.childrenCount = 0;
       if (this.cfg.opts.folder.show ) {
          this.data.childrenCount += this.getCollBean().getCollectionCount();
       }
       if (this.cfg.opts.file.show ) {
          this.data.childrenCount += this.getCollBean().getMediaCount();
       }
    }
    else {
       this.data.childrenCount = 0;
    }
  },

  _initImgHtml: function() {
    _getImgNode = function(name, src, className, str, opt) {
      var opt = opt || {};
      if (opt.useNewIcon) {
        var div = document.createElement("div");
          div.className = className;
          lconn.core.svg.svgHelper.loadIcon(div, name);
        
        return div;
      } else {
        var img = document.createElement("img");
          img.name = name;
          img.src = src;
          img.className = className;
          img.alt = str || " ";
        
        return img;
      }
       
    };

    this.blankGif = this.pTree.blankGif;

    var opt = {
      useNewIcon: this.cfg.opts.folder.render.useNewIcon
    }
    // folder icons
    this.imgFolderClosedNode  = _getImgNode("closedFolder", this.blankGif, "lconnSprite-iconFolderClose24", null, opt);
    this.imgFolderPublicNode  = _getImgNode("publicFolder", this.blankGif, "lconnSprite-iconFolderClose24 lconnSprite-iconFolderPublic24" ,this._getExtendedAltText( "folder", "_public"), opt);
    this.imgFolderPrivateNode = _getImgNode("privateFolder", this.blankGif, "lconnSprite-iconFolderClose24 lconnSprite-iconFolderPrivate24", this._getExtendedAltText( "folder", "_private"), opt);
    this.imgFolderSharedNode = _getImgNode("sharedFolder", this.blankGif, "lconnSprite-iconFolderClose24 lconnSprite-iconFolderShared24", this._getExtendedAltText( "folder", "_shared"), opt);
    this.imgFolderCommunityNode = _getImgNode("communityFolder", this.blankGif, "lconnSprite-iconFolderClose24 lconnSprite-iconFolderCommunity24", this._getExtendedAltText( "folder", "_community"), opt);

    // file icon
    var fileClassName = lconn.core.utilities.getFileIconClassName(this.getTitle(), 16);
    this.imgFileNode = _getImgNode("genericFileIcon", this.blankGif, fileClassName, this._getExtendedAltText("file"));
    
    // external icon
    this.imgExternalNode = _getImgNode("externalIcon", this.blankGif, "lconnIconListSharedExternal", this._strings["gen_shared_ext"]);
    
    // visibility icons
    this.imgVisPublicNode = _getImgNode("publicIcon", this.blankGif, "lconnSprite lconnSprite-iconPublic16", this._strings["gen_public"]);
    this.imgVisPrivateNode = _getImgNode("privateIcon", this.blankGif, "lconnSprite lconnSprite-iconPrivate16", this._strings["gen_private"]);
    this.imgVisSharedNode = _getImgNode("sharedIcon", this.blankGif, "lconnSprite lconnSprite-iconShared16", this._strings["gen_shared"]);
    this.imgVisCommunityNode = _getImgNode("communityFolder", this.blankGif, "lconnSprite lconnSprite-iconCommunities16", this._strings["gen_community_folder"]);
  },

  _getExtendedAltText: function( base, vis, ext, gen ) {
    base = typeof(base) == "string"? base : this.isFolder()? "folder" : "file";
    vis  = typeof(vis)  == "string"? vis  : (base == "folder" && this.isCommunityFolder())? "_community" : this.isPublic()? "_public" : this.isShared()? "_shared" : "_private";
    ext  = typeof(ext)  == "string"? ext  : this.isExternal( )? "_ext" : "";
    gen  = typeof(gen)  == "string"? gen  : this.getTitle( )? "" : "_gen";
    var str = this._strings[ base+vis+gen+ext ];
    return( str.indexOf("{0}") > -1? dojo.replace( str, { 0: this._getTitleForHTML() }) : str );
  },
  
  postMixInProperties: function() {
    this.inherited(arguments);
  },

  postCreate: function() {
    this.inherited(arguments);
  },

  startup: function() {
    this.render();
  },

  destroy: function() {
    this.pTree._removeNodeRef( this ); // update the containing tree's counters
    if( this.pTree.rootTree.selectedNode === this)  this.pTree.rootTree.selectedNode = null;
    this.inherited(arguments);
    return true;
  },


  //----------------------------------------------------------------------
  // BEGIN NODE PUBLIC INTERFACE METHODS SECTION
  //
  
  /** @returns {domNode} template's node header html div element */
  getElHeader: function() { return( this.headerDiv); },
  
  /** @returns {domNode} template's node checkbox html div element */
  getElCheckbox: function() { return( this.checkboxDiv); },
  
  /** @returns {domNode} template's node twisty html div element */
  getElTwisty: function() { return( this.twistyDiv); },
  
  /** @returns  {domNode} template's node icon html div element */
  getElIcon: function() { return( this.iconDiv); },

  /** @returns {domNode} template's node title html div element */
  getElTitle: function() { return( this.titleDiv); },

  /** @returns {domNode} template's node external icon html div element */
  getElExternalIcon: function() { return( this.externalDivDiv); },

  /** @returns {domNode} template's node visibility icon html div element */
  getElVisibility: function() { return( this.visibilityDivDiv); },

  /** @returns {lconn.share.widget.Tree} the containing tree of this node (aka. parent tree) */
  getParentTree: function() { return( this.pTree); },

  /** @returns {lconn.share.widget.Tree|null} the inner tree of this node (aka. child tree container) or null if there is no container (such as in file nodes or folder nodes that have never been expanded) */
  getChildTree: function() { return( this.tree); },

  /** @returns {lconn.share.widget.Node} the parent node of this node */
  getParentNode: function() { return( this.getParentTree( ).parentNode ); },

  /** @returns {lconn.share.widget.Tree|null} the root tree object of this widget (aka. the first level) */
  getRoot: function() {
    if( this.getParentTree( ) ) return( this.getParentTree( ).getRoot( ) );
    return null;
  },

  /** @returns {dojo.dnd.Source|null} the dnd Source for the tree */
  getDnd: function() { return( this.getRoot()? this.getRoot().getDnd() : null); },

  /** 
   * @param {boolean} [isRecursive=false] - if true, return inner nodes as well.  if omitted, only return this tree's nodes
   * @returns {lconn.share.widget.Node[]|null} hash object array (aka associative array) of node objects under this node's this tree, and inner trees if recursive
   */
  getNodes: function( isRecursive ) {
    if( typeof(isRecursive) == "undefined" ) isRecursive = false; 
    if( this.getChildTree( ))
      return this.getChildTree( ).getNodes( isRecursive ); 
    else
      return null;
  },

  /** @returns {lconn.share.bean.File} file bean of this node */
  getFileBean: function() { return( this.nodebean.getFileBean() ); },

  /** @returns {lconn.share.bean.Collection|CollectionFromFeed} collection bean of this node */
  getCollBean: function() { return( this.nodebean.getCollBean() ); },
  
  /** @returns {lconn.share.bean.File|lconn.share.bean.Collection} the node's file bean, or, if node is a folder, the collection bean   */
  getBean: function() { return( (this.isFolder()? this.getCollBean() : this.getFileBean())); },

  /** @returns {string} this node's data id */
  getId: function() { return( this.data.entryId ); },

  /** @returns {string} this node's data title */
  getTitle: function() { return( this.data.title ); },

  /** @returns {string} this node's feed URI */
  getFeedURI: function() { return( this.data.feed ); },

  /** @returns {boolean} true if this node is a folder (aka isCollection) */
  isFolder: function() { return( this.nodebean.isFolder()); },

  /** @returns {boolean} true if this node is currently a file (aka isDocument) */
  isFile: function() { return( !this.nodebean.isFolder()); },

  /** @returns {boolean} true if this node is from an external source */
  isExternal: function() { return( this.nodebean.isExternal()); },
  
  /** @returns {boolean} true if this node is private */
  isPrivate: function() { return( this.nodebean.isPrivate()); },

  /** @returns {boolean} true if this node is public */
  isPublic: function() { return( this.nodebean.isPublic()); },

  /** @returns {boolean} true if this node is shared */
  isShared: function() { return( this.nodebean.isShared()); },
  
  /** @returns {boolean} true if this node is a community folder */
  isCommunityFolder: function() { return( this.nodebean.isCommunityFolder()); },
  
  /** @returns {boolean} true if this node is a community folder */
  isCommunity: function() { return( this.nodebean.isCommunity()); },
  
  /** @returns {boolean} true if this nodebean is dirty (ie. visibility data changed artificially) */
  isDirty: function() { return( this.nodebean.isDirty()); },
  
  /** @returns {boolean} true if the node belongs to a breadcrumb type tree */
  isBreadcrumb: function() { return( this.getParentTree( ) && this.getParentTree( ).isBreadcrumb( ) ); },

  /** @returns {boolean} true if the node is out of sorting */
  getSortType: function() { return( this.nodebean.getSortType() ) },
  
  /**
   * Sets this node in selected state
   * @param {boolean} [quiet=false] if true, do not call registered callback or emit event
   */
  select: function( quiet ) {
    if( typeof(quiet) === "undefined") quiet = false;
    this._selectNode( quiet );
  },
  /**
   * Sets this node in focused state
   * @param {boolean} [quiet=false] if true, do not call registered callback or emit event
   */
  focus: function( quiet ) {
    if( typeof(quiet) === "undefined") quiet = false;
    this._focusNode( quiet );
  },
  /**
   * Sets this node in unselected state
   * @param {boolean} [quiet=false] if true, do not call registered callback or emit event
   */
  unselect: function( quiet ) {
    if( typeof(quiet) === "undefined") quiet = false;
    this._deselectNode( quiet );
  },
   
  /**
   * Toggles node between selected and unselected states
   * @param {boolean} [quiet=false] if true, do not call registered callback or emit event
   */
  selectToggle: function( quiet ) {
    if( typeof(quiet) === "undefined") quiet = false;
    this._toggleSelectNode( quiet );
  }, 

  /** @returns {boolean} true if this node is selectable */
  isSelectable: function() {
    return this._isSelectable();
  },

  /** @returns {boolean} true if this node is currently selected */
  isSelected: function() {
    return this._isSelected();
  },
  
  /** Sets this node in disabled state */
  disable: function() {
    this._disableNode();
  },
  
  /** Sets this node in enabled state */
  enable: function() {
    this._enableNode();
  },
  
  /** @returns {boolean} true if this node is currently disabled */
  isDisabled: function() {
    return this._isDisabled();
  },

  /**
   * Expands the current node synchronously and displays its inner tree.  Calls tree load it if it has not been loaded.
   * @param {boolean} [quiet=false] if true, do not call registered callback or emit event
   */
  expand: function( quiet ){
    if( typeof(quiet) === "undefined") quiet = false;
    var sync = this.cfg.ds.xhrSync;
    this.cfg.ds.xhrSync = true;

    this._expandNode( quiet );
    
    this.cfg.ds.xhrSync = sync;
  },
  
  /** @returns {boolean} true if this node is expandable under the current rules (i.e. not disabled, and not past the max levels) */
  isExpandable: function(){
     var root = this.getRoot();
    return( this.isFolder() && !this.isDisabled() && !this._isFlatDepth() && this._isLessThanMaxDepth() && ( this.hasChildren() || root.cfg.opts.isBreadcrumb )); // TODO not to use root.cfg.opts.isBreadcrumb. But to pass it in to allow empty folder to be drilled into.  
  },
  
  /**
   * @returns true if this node is currently expanded
   */
  isExpanded: function(){
    return this._isTwistyOpen;
  },
  
  /** @returns {boolean} true if this node's title is setup to have a title anchor element */
  isNavigatable: function( ) {
    return ( this.isFolder()? this.cfg.opts.folder.behavior.isTitleAnchored : this.cfg.opts.file.behavior.isTitleAnchored );
  },

  /**
   * Collapses (closes) the current node's tree.
   * @param {boolean} [quiet=false] if true, do not call registered callback or emit event
   */
  collapse: function( quiet ){
    if( typeof(quiet) === "undefined") quiet = false;
    this._collapseNode( quiet );
  },

  /** @returns {boolean} true if this node's inner tree has been loaded */
  isTreeLoaded: function(){ 
    return this._isContainerLoaded; 
  },
  
  /** Destroys and reloads this node's inner tree */
  reloadTree: function() { // reload tree
    if( this.tree ) this.tree.destroy();
    this._loadTree();
  },

  /** @returns {boolean} true if this node has children by checking either childrenCount data value or if there are nodes in child tree  */
  hasChildren: function() { return( this.data.childrenCount > 0 || ( this.getChildTree() && this.getChildTree().getNodesCount() > 0) ); },

  /**
   * Places the supplied node object into the child tree
   * @param {lconn.share.widget.Node|lconn.share.bean.File|lconn.share.bean.Collection} node - the node to add
   * @param {Boolean} loadTree - if there is no child tree, true:load the child tree nodes. false:create the child tree without loading nodes. default true
   * @returns {lconn.share.widget.Node|null} the node after being added to the tree or null if it was not added
   */
  addChildNode: function( node, loadTree ) {
    if( !node ) return null;
    if( typeof(node) != "object" ) return null;
    if( node.declaredClass != "lconn.share.widget.Node" && !lconn.share.widget.nodebean.isSupportedBean( node )) return null;
    if( typeof(loadTree) == "undefined" ) loadTree = true;

    if( !this.getChildTree( ) ) { // if child tree has not been loaded, load it synchronously so we can add the node
      if( loadTree ) {
        var sync = this.cfg.ds.xhrSync;
        this.cfg.ds.xhrSync = true;
        this._loadTree();
        this.cfg.ds.xhrSync = sync;
      } else {
        this._createTree( ); // create empty collapsed tree
        this.collapse( );
      }
    }

    return( this.getChildTree( )? this.getChildTree( ).addNode( node ) : null );
  },

  /**
   * Updates this node with he supplied lconn.share.bean.File|lconn.share.bean.Collection bean object
   * @param {lconn.share.bean.File|lconn.share.bean.Collection} bean - the bean to use to update this node
   * @returns {lconn.share.widget.Node|null} the node after being updated
   */
  update: function( bean ) {
    if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;

    var nodebean = lconn.share.widget.nodebean.createNodeBean( bean );

    // if we have child nodes rendered AND visibility has changed,
    // dirty update all the child nodes' visibility with the supplied node's visibility params (see RTC# 164975)
    if( this.getChildTree( ) && this.nodebean.visibilityDiffers( nodebean )) {
      this.getChildTree( ).updateNodesVisibility( nodebean, true /* recursive */);
    }
    
    this.nodebean = nodebean;
    this._initNodeData();
    this._initImgHtml();
    this._displayHeader();
    return this;
  },

  /**
   * Updates this node with he supplied lconn.share.bean.File|lconn.share.bean.Collection bean object
   * @param {lconn.share.bean.File|lconn.share.bean.Collection} bean - the bean to use to update this node's visibility. if not supplied, it will use current node's bean
   */
  updateVisibility: function( bean ) {
    if( typeof(bean) == "undefined" ) bean = this.nodebean;
    if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;

    this.nodebean.setNodeVisibilityData( bean );

    this._initTooltip( );
    this._initImgHtml();
    this._displayHeader();
  },

  /**
   * Places this node into the supplied target tree or into the child tree of the supplied target node .
   * @param {lconn.share.widget.Tree|lconn.share.widget.Node} target - the target node or tree to move this node under (appends it).
   * @param {Boolean} loadTree - if there is no child tree, true:load the child tree nodes. false:create the child tree without loading nodes. default true
   * @returns {lconn.share.widget.Node|null} node after being moved, null if move was not successful
   */
  move: function( target, loadTree ) {
    if( !target || typeof(target) != "object" ) return null;
    if( target.declaredClass != "lconn.share.widget.Tree" && target.declaredClass != "lconn.share.widget.Node" ) return null;
    if( typeof(loadTree) == "undefined" ) loadTree = true;

    if( this == target ) return null;  // can't move onto itself

    var targetIsNode = ( target.declaredClass == "lconn.share.widget.Node" );
      
    var sourceTree = this.pTree; // get reference to the nodes current parent tree before we move it
    var sourceNode = sourceTree.getParentNode(); // reference to the parent node before we move this node

    var targetTree = ( targetIsNode ? target.getChildTree( ) : target );
    var targetNode = ( targetIsNode ? target : target.getParentNode( ));

    // load the target node's tree if it has not been loaded
    if( !targetTree ) { 
       targetNode._createTree( );
      if(!loadTree) {
         targetNode.collapse( );
      }
      targetTree = target.getChildTree( );
    }

    if( targetTree ) {
      // if a node with the same id already exists in the target tree (because we just expanded it above and API has already moved it), 
      // we don't want to duplicate the node by moving this one there, thus, remove the dup node in the target tree before moving this one there
      var duppedNode = targetTree.getNodeById( this.getId( ));
      if( duppedNode ) duppedNode.remove();
      
      if( targetTree.addNode( this )) { // place this node under the target node's tree
        
        if( sourceTree._removeNodeRef( this )) { // remove the reference to this node from the original containing tree

          // reindent all inner nodes recursively
          var innerNodes = this.getNodes( true );
          for(id in innerNodes ) {
            var node = innerNodes[id];
            var pNode = node.getParentNode( );
            if( pNode ) node._setLevel( pNode._getLevel( )+1 ); 
            innerNodes[id]._indent( ); // reset indentation of the inner nodes
          }
  
          // redisplay old parent and new parent in case things need updating visually (such as the twisties)
          if( targetNode ) targetNode.render();
          if( sourceNode ) sourceNode.render();

          return this;
        }
      }
    }
    
    return null;
  },
  
  /**
   * Removes this node by calling this node's dijit destroy
   * @returns {Boolean} - true: node removed; false: node not removed
   */
  remove: function( ) {
    this.destroyRecursive();

    var pNode = this.getParentNode();
    if( pNode && !pNode.hasChildren()) { // if removing the only node in the tree, closeup the parent
      pNode.collapse(true);
    }
  },
  
  /**
   * Sorts this node's inner nodes under this node's tree
   * @param {object} [ascending:true] - sort direction.
   */
  sortNodes: function( params ) {
     if( this.getChildTree( ) ) this.getChildTree( ).sortNodes( params );
  },

  /**
   * @returns {Boolean} - true: if node is using radio button
   */
  isRadioed: function( ) {
    return (
      ( this.isFolder() && this.cfg.opts.folder.render.checkbox && !this.cfg.opts.folder.behavior.isMultiSelectable ) ||
      ( this.isFile()   && this.cfg.opts.file.render.checkbox   && !this.cfg.opts.file.behavior.isMultiSelectable ) 
    );
  },
  
  /** Recalculates widths based on container elements */
  recalcWidths: function( ) {
    this._calcAndApplyWidths( );    
  },

  /** @returns {Boolean} - true: if node is visible */
  isVisible: function( ) {
     if(!this.headerDiv)
        return;
     return( !(( dojo.exists("domNode.offsetParent", this) && this.domNode.offsetParent === null ) || (dojo.contentBox(this.headerDiv).w == 0)) );
  },

  //
  // END NODE PUBLIC INTERFACE METHODS SECTION
  //----------------------------------------------------------------------

  
  //----------------------------------------------------------------------
  // BEGIN NODE ELEMENTS DISPLAY AND EVENT INTERFACES SECTION
  //

  //------------------------
  // THE NODE
  render: function() {
    try{
      // save scrollbar state before rendering this node
      var rootTree = this.getRoot();
      var hasPreRenderScrollBar = false;
      if( rootTree ) hasPreRenderScrollBar = rootTree.hasScrollBar();
      
      this._displayHeader();
      this._addDnd();
      
      // if there was a scrollbar state change after we rendered this node, recalculate all existing node widths
      if( rootTree && hasPreRenderScrollBar != rootTree.hasScrollBar() ) rootTree.recalcNodeWidths(true);

      if( typeof( this.cfg.cb.node.preselect ) == "function" && this.cfg.cb.node.preselect.call( this, this)) this._selectNode(); // should this node be rendered pre-selected?
      if( typeof( this.cfg.cb.node.disable ) == "function" && this.cfg.cb.node.disable.call( this, this)) this._disableNode(); // should this node be rendered disabled?
      
      /** event lconn/share/widget/Node/rendered fires when the node is rendered
        * @event lconn.share.widget.Node#rendered
        * @type {dojo.publish}
        * @param {lconn.share.widget.Node} - the node object
        */    
      dojo.publish("lconn/share/widget/Node/rendered", [this]);
      if( typeof( this.cfg.cb.node.rendered ) == "function" ) this.cfg.cb.node.rendered.call( this, this);
    } catch(ex) {
      throw new Error(ex);
    }
  },

  _isDisabled: function() { 
    if( !this.headerOuterDiv ) return null;
    return( dojo.hasClass( this.headerOuterDiv, this.classNodeDisabled)); 
  },
  _enableNode: function() { 
    if( this.headerOuterDiv) dojo.removeClass( this.headerOuterDiv, this.classNodeDisabled);
    if( this.titleAnchor ) dojo.style( this.titleAnchor, "cursor", "auto");
  },
  _disableNode: function() { 
    if( this.headerOuterDiv) dojo.addClass( this.headerOuterDiv, this.classNodeDisabled);
    if( this.titleAnchor ) dojo.style( this.titleAnchor, "cursor", "default");
  },

  _isSelectable: function() {
    return (this.isFolder() && this.cfg.opts.folder.behavior.isSelectable)
           || (this.isFile()   && this.cfg.opts.file.behavior.isSelectable);
     
  },

  _isSelected: function() { 
    if( !this.headerSelectorDiv ) return null;
    return( dojo.hasClass( this.headerSelectorDiv, this.classNodeSelected)); 
  },
  
  //----------------------------------------------------------------------
  // Keyboard navigation
  //

  _onUpArrow: function( evt ) {
     if ( this.cfg.opts.isBreadcrumb && this.isExpanded()) {
        // No-op
        return;
     }
     
     // If it is the first child, move to parent
     var nodes = dojo.query( "div[name='node']", this.pTree.containerNode );
     var first = nodes[0];
     
     if ( first.id == this.domNode.id ) {
        if ( !this.cfg.opts.isBreadcrumb ) {
           var parent = this.getParentNode();
           if ( parent ) {
              parent.focus( false );
           }
        }
     } 
     else {
        var previousSibling = this.domNode.previousElementSibling || this.domNode.previousSibling;
        if ( !this.cfg.opts.isBreadcrumb ) {
           nodes = dojo.query( "div[name='node']", previousSibling );
           for ( var i = nodes.length - 1; i >= 0; i-- ) {
              if ( nodes[i].offsetHeight > 0 ) {
                 previousSibling = nodes[i];
                 break;
              }
           }
           
           this._focusNodeByDOMNode( previousSibling );
        }
        else {
           this._focusNodeByDOMNode( previousSibling );
        }
     }
  }, 

  _onDownArrow: function( evt ) {
     if ( this.isExpanded() ) {
        var e = dojo.query( "div[name='node']", this.tree.containerNode ) [0];
        if ( e )
           this._focusNodeByDOMNode( e );
     } 
     else {
        var nodes = null;
        var root = this.getRoot();
        
        if ( root.cfg.opts.isBreadcrumb )
           nodes = dojo.query( "div[name='node']", this.pTree.containerNode );
        else
           nodes = dojo.query("div[name='node']");
           
        if ( nodes && nodes.length > 0 ) {
           var nextDomNode = null;
           for ( var i=0, start = false; i < nodes.length; i++ ) {
              if ( nodes[i].id == this.domNode.id ) { 
                 start = true;
                 continue;
              }
              if ( start ) {
                 if ( nodes[i].offsetHeight ) {
                    nextDomNode = nodes[i];
                    break;
                 }
              }
           }
           
           if ( nextDomNode ) {
              this._focusNodeByDOMNode( nextDomNode );
           }
        }
     }
  },
  
  _onRightArrow: function( evt ) {
     if ( !this.isExpandable() )
        return;
     
     if ( this.isExpanded() ) {
        // No-op. Normally this should move to the first child. 
     } else {
        this.expand( false );
     }
  }, 
  
  _onLeftArrow: function( evt ) {
     if ( this.isExpanded() ) {
        // Collapse itself
        this.collapse( false );
     } 
     else {
        parent = this.getParentNode();
        if ( !this.cfg.opts.isBreadcrumb ) {
           // Go and focus on parent
           if ( parent )
              parent.focus( );
        }
        else {
           if ( parent )
              parent.collapse( false );
        }
     }
  }, 

  _onSpace: function( evt ) {
     if ( this._isSelectable() ) {
        // Toggle check/uncheck
        this._toggleSelectNode( false );
     }
  }, 
  
  _onEnter: function( evt ) {
     this._onclickTitle( null );
  }, 
  
  _onHome: function( evt ) {
     var e = dojo.query( "div[name='node']", this.pTree.containerNode )[0];
     if ( e )
        this._focusNodeByDOMNode( e );
  }, 

  _onEnd: function( evt ) {
     var nodes = dojo.query( "div[name='node']", this.pTree.containerNode );
     var e = nodes[nodes.length - 1];
     if ( e )
        this._focusNodeByDOMNode( e );
  }, 

  /**
   * Focus on a node by its DOM node
   */
  _focusNodeByDOMNode: function( domNode ) {
     if ( !domNode )
        return;
     
     var e = dojo.query("[name='headerSelector']", domNode)[0];
     if ( e )
        e.focus();
  }, 
  
  _focusNode: function( quiet ) {
     if( this.headerSelectorDiv ) {
        this.headerSelectorDiv.focus();
        this.getRoot().setTabindexable( this.headerSelectorDiv );
     }
  },
  
  _selectNode: function( quiet ) {
    if( typeof(quiet) === "undefined") quiet = false;
    if( this.isDisabled()) return;

    // deselect the currently selected node if multiselect is not enabled.
    if( this.isFolder() && !this.cfg.opts.folder.behavior.isMultiSelectable) this._deselectSelectedNode( quiet );
    if( this.isFile()   && !this.cfg.opts.file.behavior.isMultiSelectable) this._deselectSelectedNode( quiet );

    dojo.attr( this.domNode, "aria-selected", "true" );

    // select <this> node by adding corresponding css classes.
    if( this.headerSelectorDiv) {
      dojo.addClass( this.headerSelectorDiv, this.classNodeSelected); 
      dojo.addClass( this.headerSelectorDiv, "lotusSelected"); 
    }
    if( this.titleDiv ){
      dojo.attr( this.titleDiv, "aria-pressed", "true");
    }

    // perform requested actions/behaviors when a node is selected.
    if( this.isFolder()) {
      if( this.cfg.opts.folder.behavior.isHighlightedOnSelect) this._highlightNode();
      if( this.cfg.opts.folder.behavior.isCheckedOnSelect) this._checkboxNode();

    } else if( this.isFile()) {
      if( this.cfg.opts.file.behavior.isHighlightedOnSelect) this._highlightNode();
      if( this.cfg.opts.file.behavior.isCheckedOnSelect) this._checkboxNode();
    }

    // set flag at root tree to point to this node as the one selected
    this.pTree.rootTree.selectedNode = ( !this.cfg.opts.folder.behavior.isMultiSelectable && !this.cfg.opts.file.behavior.isMultiSelectable)? this : null; 

    // TODO select/deselect should set focus as well. 
    
    if( !quiet ){
      /** event lconn/share/widget/Node/selected fires when the node is selected
        * @event lconn.share.widget.Node#selected
        * @type {dojo.publish}
        * @param {lconn.share.widget.Node} - the node object
        */    
      dojo.publish("lconn/share/widget/Node/selected", [this]);
      if( typeof( this.cfg.cb.node.selected ) == "function") this.cfg.cb.node.selected.call( this, this);
    }
  },

  _deselectNode: function( quiet ) {
    if( typeof(quiet) === "undefined") quiet = false;
    if( this.isDisabled()) return;

    dojo.attr( this.domNode, "aria-selected", "false" );

    if( this.headerSelectorDiv) {
      dojo.removeClass( this.headerSelectorDiv, this.classNodeSelected); 
      dojo.removeClass( this.headerSelectorDiv, "lotusSelected"); 
    }
    if( this.titleDiv ){
      dojo.attr( this.titleDiv, "aria-pressed", "false");
    }

    this._dehighlightNode();
    this._decheckboxNode();
    this.pTree.rootTree.selectedNode = null;

    if( !quiet ){
      /** event lconn/share/widget/Node/unselected fires when the node is unselected
        * @event lconn.share.widget.Node#unselected
        * @type {dojo.publish}
        * @param {lconn.share.widget.Node} - the node object
        */    
      dojo.publish("lconn/share/widget/Node/unselected", [this]);
      if( typeof( this.cfg.cb.node.unselected ) == "function") this.cfg.cb.node.unselected.call( this, this);
    }
  },

  _deselectSelectedNode: function(quiet) {
    if( typeof(quiet) === "undefined") quiet = false;
    if( this.pTree.rootTree.selectedNode) {
      this.pTree.rootTree.selectedNode._deselectNode();
    }
  },
  
  _toggleSelectNode: function( quiet ) {
    if( typeof(quiet) === "undefined") quiet = false;
    if( this.isDisabled()) return;

    if( this._isSelected( quiet )) {
      this._deselectNode( quiet ); 
    } else {
      this._selectNode( quiet );
    }
  },

  _highlightNode: function(){ 
    if( this.headerSelectorDiv) {
      dojo.addClass( this.headerSelectorDiv, this.classNodeHighlighted);
    }
  },

  _dehighlightNode: function(){  
    if( this.headerSelectorDiv) {
      dojo.removeClass( this.headerSelectorDiv, this.classNodeHighlighted); 
    }
  },

  _checkboxNode: function(){
     this.checkbox.checked = true;
     this.radio.checked = true;
  },
  _decheckboxNode: function(){
     this.checkbox.checked = false;
     this.radio.checked = false;
  },

  _onfocusRadio: function() {
    // if we are showing radio buttons and there are no selected radio buttons, default this to selected (RTC 161807)
    if( this.isRadioed() && !this.isSelected() && !this.getParentTree().getSelectedNode()) {
      this.select( );
    }
  },
  
  _collapseNode:function( quiet ){
    if( typeof(quiet) === "undefined") quiet = false;

    if( !quiet ) {
       if( typeof( this.cfg.cb.node.beforecollapsed ) == "function") this.cfg.cb.node.beforecollapsed.call( this, this);
    }

    this._isTwistyOpen = false;
    this._setTwistyAltText( );    
    this._displayTwisty();
    this._hideContainer();
    
    dojo.attr( this.domNode, "aria-expanded", "false" );

    if( !quiet ){
      /** event lconn/share/widget/Node/collapsed fires when the node is collapsed (closed)
        * @event lconn.share.widget.Node#collapsed
        * @type {dojo.publish}
        * @param {lconn.share.widget.Node} - the node object
        */    
      dojo.publish("lconn/share/widget/Node/collapsed", [this]);
      if( typeof( this.cfg.cb.node.collapsed ) == "function") this.cfg.cb.node.collapsed.call( this, this);
    }
  },

  _expandNode:function( quiet ){
    if( typeof(quiet) === "undefined") quiet = false;
    
    if( !quiet ){
       if( typeof( this.cfg.cb.node.beforeexpanded ) == "function") this.cfg.cb.node.beforeexpanded.call( this, this);
    }
    
    this._isTwistyOpen = true;
    this._setTwistyAltText( );    
    this._displayTwisty();
    
    dojo.attr( this.domNode, "aria-expanded", "true" );

    if( this._isContainerLoaded && this.cfg.opts.isCached && !this.isDirty() ) { // unhide previously loaded tree if we are caching or node is not dirty...
      this._showContainer();
    } else {
      this._loadTree();
    }

    if( !quiet ){
      /** event lconn/share/widget/Node/expanded fires when the node is expanded (opened)
        * @event lconn.share.widget.Node#expanded
        * @type {dojo.publish}
        * @param {lconn.share.widget.Node} - the node object
        */    
      dojo.publish("lconn/share/widget/Node/expanded", [this]);
      if( typeof( this.cfg.cb.node.expanded ) == "function") this.cfg.cb.node.expanded.call( this, this);
    }
  },

  _addDnd: function( ) {
    if( !lconn.core.auth.isAuthenticated( )) return;

    var isSource = this.cfg.opts.isDndSource;
    if( this.cfg.opts.isDndTarget || isSource ) {
      dojo.addClass( this.headerOuterDiv, "dojoDndItem");
      dojo.attr( this.headerOuterDiv, "dndType", this.isFolder()?"folder":"file");
      dojo.attr( this.headerOuterDiv, "dndElementTitle", this.getTitle());
    }
  },

  //------------------------
  // THE NODE'S HEADER
  _displayHeader: function() {
    this._displayCheckbox();
    this._displayTwisty();
    this._displayIcon();
    this._displayTitle();
    this._displayExternal();
    this._displayVisibility();

    this._indent( );
    this.headerDiv.style.display = "";

    this._calcAndApplyWidthsWhenVisible( );
    lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.domNode);
  },

  _indent: function( ) {
    this._indentHeader( this._getIndentPx() );
  },
  
  _indentHeader: function( indentPx ) {
    if( typeof indentPx === "undefined") indentPx = 0;
    
    // indent based on depth level; 
    // this is necessary instead of indenting the entire container tree because selecting a node needs to highlight the entire width of the tree
    if ( dojo._isBodyLtr())
      this.headerDiv.style.marginLeft  = indentPx+"px";
    else
      this.headerDiv.style.marginRight = indentPx+"px";
  },

  _getIndentPx: function( ) { return( (this._getLevel()-1)*this.indentNodePx ); },
  _getLevel: function( ) { return( this.getParentTree( )._getLevel( ) ); },
  _setLevel: function( level ) { this.getParentTree( )._setLevel( level ); },
  
  // checks for node to be visible before calculating and applying its widths
  // this is needed because the tree is sometimes rendered inside a hidden element by the consumer of the tree, thus,
  // if the tree widget is not visible, the calculations for its max widths are off due to the containing element being hidden.
  // therefore, we need to wait until the node is visible before we can calculate its node widths
  // see RTC#165654 and RTC#168343
  _calcAndApplyWidthsWhenVisible: function( ) {
    if( this.isVisible( ) ) {
      this._calcAndApplyWidths( );
    } else {
      var self = this;
      setTimeout( function( ){ self._calcAndApplyWidthsWhenVisible( ); }, 500 );    
    }
  },
  
  _calcAndApplyWidths: function() {
    if( !this.isVisible( ) ) return;
    
    var minTitleWidthPx = 10;
    var maxTitleWidthPx = this._calcAndApplyMaxWidthForTitle( minTitleWidthPx );
    
    // if compacted title does not fit in display area, hide the entire node (RTC#165126)
    var doesNotFit = ( maxTitleWidthPx != null && maxTitleWidthPx < minTitleWidthPx );

    if( doesNotFit ) { 
      dojo.style( this.domNode, "display", "none" );
      
    } else { // it fits
      if( dojo.style( this.domNode, "display" ) == "none" ) { // reset display if we had previosly set it to none
        dojo.style( this.domNode, "display", "block" );
      }
    }    
  },

  // calculate maximum width for title field (in order to use ellipsis for text)
  _calcAndApplyMaxWidthForTitle: function( minTitleWidthPx ) {
    if( typeof minTitleWidthPx == "undefined" ) minTitleWidthPx = 10; // default
    var rootTree = this.getRoot();
    var maxAvailableWidth = null; // default
    
    // set title width constrained by the tree widget's containing html element available width
    // by substracting margings and elements widths that preceed the title
    if( rootTree && rootTree.domNode.parentNode ) {

      // set current available with to that of the tree widget's containing element
      maxAvailableWidth = dojo.contentBox( rootTree.domNode.parentNode ).w; 

      // consider width for existing scroll bar at tree
      if ( rootTree.hasScrollBar() ) {
         maxAvailableWidth -= dojo.marginBox(rootTree.containerNode).w - dojo.contentBox(this.domNode).w;
      }

      // subtract margins, borders and paddings of header divs
      maxAvailableWidth -= dojo.marginBox(this.headerOuterDiv).w - dojo.contentBox(this.headerOuterDiv).w;
      maxAvailableWidth -= dojo.marginBox(this.headerSelectorDiv).w - dojo.contentBox(this.headerSelectorDiv).w;
      maxAvailableWidth -= dojo.marginBox(this.headerDiv).w - dojo.contentBox(this.headerDiv).w; // this includes the header indentation

      // subtract elements that preceed the title
      maxAvailableWidth -= dojo.marginBox(this.checkboxDiv).w;
      maxAvailableWidth -= dojo.marginBox(this.twistyDiv).w;
      maxAvailableWidth -= dojo.marginBox(this.iconDiv).w;
      
      var subtractSuffixElements = ( (this.isFolder() && this.cfg.opts.folder.behavior.titleWidthCalcConsidersSuffixedElements) || 
                                     (this.isFile()   && this.cfg.opts.file.behavior.titleWidthCalcConsidersSuffixedElements  ) );
      if( subtractSuffixElements ) {
        maxAvailableWidth -= dojo.marginBox(this.externalDiv).w;
        maxAvailableWidth -= dojo.marginBox(this.visibilityDiv).w;
      }

      // substract title element's margins, borders and paddings
      maxAvailableWidth -= dojo.marginBox(this.titleDiv).w - dojo.contentBox(this.titleDiv).w;
      maxAvailableWidth -= 2; // edge cases
      maxAvailableWidth -= 4; // dnd border width cases

      // decrease 4 pixels per nested depth; RTC#169067, RTC#167443
      maxAvailableWidth -= Math.max(1, this._getLevel()) * 4;
 
      // apply calculated maxWidth to title element
      dojo.style( this.titleDiv, "maxWidth",  Math.max(maxAvailableWidth, minTitleWidthPx)+"px" );
    }
    
    return maxAvailableWidth;
  },

  // events
  _onchangeHeader: function(evt) { if( typeof( this.cfg.cb.node.header.onchange ) == "function") this.cfg.cb.node.header.onchange.call( this, this, evt); },

  _isClickedTargetExcludedChild: function( clickedTarget )
  {
     var isExcludedChild = 
        ( (this.cfg.cb.node.header.onclickchildexcludelist.checkbox && ( clickedTarget == this.checkbox || clickedTarget == this.radio ) )
          || (this.cfg.cb.node.header.onclickchildexcludelist.twisty && clickedTarget == this.twistyAnchor )
          || (this.cfg.cb.node.header.onclickchildexcludelist.icon && ( clickedTarget == this.iconDiv || clickedTarget.parentElement == this.iconDiv ) )
          || (this.cfg.cb.node.header.onclickchildexcludelist.title && ( clickedTarget == this.titleDiv || clickedTarget == this.titleAnchor ) ) );
     return isExcludedChild;
  },

  _onclickHeader: function(evt)
  {
     if( this.isDisabled()) return;

     if( typeof( this.cfg.cb.node.header.onclick ) == "function") {
        if ( !evt || !this._isClickedTargetExcludedChild( evt.target )) {
           this.cfg.cb.node.header.onclick.call( this, this, evt);
        }
     }

     if (evt && evt.target
         && (evt.target == this.checkbox || evt.target == this.radio
             || evt.target == this.twistyAnchor
             || evt.target == this.iconDiv  || evt.target.parentElement == this.iconDiv 
             || evt.target == this.titleDiv || evt.target == this.titleAnchor)) {
        return;
     }
     // toggle selection, if requested (same behavior as on click title)
     if (evt) dojo.stopEvent(evt);
     if ( this._isSelectable() ) {
        this._toggleSelectNode();
     }
  },

  _onmouseenterHeader: function(evt) { if( typeof( this.cfg.cb.node.header.onmouseenter ) == "function") this.cfg.cb.node.header.onmouseenter.call( this, this, evt); },
  _onmouseleaveHeader: function(evt) { if( typeof( this.cfg.cb.node.header.onmouseleave ) == "function") this.cfg.cb.node.header.onmouseleave.call( this, this, evt); },


  //------------------------
  // THE CHECKBOX
  _displayCheckbox: function() {
    if(( this.isFolder() && this.cfg.opts.folder.render.checkbox ) || ( this.isFile() && this.cfg.opts.file.render.checkbox )) {
      this.checkboxDiv.style.display = "";
      var headerSelector = this.headerSelectorDiv;
  	  if( this.isRadioed() ) { 
         this.radio.style.display = ""; 
         dojo.attr( headerSelector, "role", this.ariaRoleNodeRadio );
      } 
      else {
         this.checkbox.style.display = "";
         dojo.attr( headerSelector, "role", this.ariaRoleNodeCheckbox );
      }
    }
  },

  // events
  _onclickCheckbox: function(evt) {
    if( typeof( this.cfg.cb.node.header.checkbox.onclick ) == "function") this.cfg.cb.node.header.checkbox.onclick.call( this, this, evt);
    if( this.isDisabled()) {
       this._decheckboxNode();
       return;
    }

    // once selected, radio buttons cannot be unselected by clicking on them (only by clicking on another radio button)
    if( this.isRadioed()) { // radio
      if( !this.isSelected()) this.select();
    }
    else { // checkbox (toggle on/off)
      this._toggleSelectNode(); 
    } 
  },



  //------------------------
  // THE TWISTY
  _displayTwisty: function() {
    if( this.isFolder() && !this.cfg.opts.folder.render.twisty) return;
    if( this.isFile()   && !this.cfg.opts.file.render.twisty  ) return;
    if( this._isFlatDepth() ) return;
    
    this.twistyDiv.style.display = ""; // display empty twisty div (anchor is hidden)

    if( this._isLessThanMaxDepth( )) {
      if( this.hasChildren() ) {
        if( this.isFolder() ) {
          if( this._isTwistyOpen ) {
            dojo.replaceClass( this.twistyAnchor, "lotusTwistyOpen", "lotusTwistyClosed");
            dojo.attr(this.twistySymbol, "innerHTML", "V");
          } else {
            dojo.replaceClass( this.twistyAnchor, "lotusTwistyClosed", "lotusTwistyOpen");
            dojo.attr(this.twistySymbol, "innerHTML", ">");
          }
          this.twistyAnchor.style.display = "";
        }
      } else {
        this.twistyAnchor.style.display = "none";  // no children, hide twisty
      }
    }
  },

  _getTwistyAltText: function( ) {
    var s = "";
    if( this.isFolder( )) {
      s = ( this.isExpanded( )? this._strings["folder_collapse"] : this._strings["folder_expand"] );
      s = ( s && s.indexOf("{0}") > -1? dojo.replace( s, { 0: this._getTitleForHTML() }) : s );
    }
    return( s || null );
  },

  _setTwistyAltText: function( ) {
    this.altTwisty = this._getTwistyAltText( );
    if( this.twistyDiv && this.twistyDiv.title ) {
      this.twistyDiv.title = this.altTwisty;
      if( this.twistyAnchor && dojo.attr( this.twistyAnchor, "aria-label") ) dojo.attr( this.twistyAnchor, "aria-label", this.altTwisty); 
    }
  },
  
  // events
  _onclickTwisty: function(evt) {
    if( typeof( this.cfg.cb.node.header.twisty.onclick ) == "function") this.cfg.cb.node.header.twisty.onclick.call( this, this, evt); // do callback if one was supplied?
    if( this.isDisabled()) return;
    if( this._isFlatDepth()) return;
    if( this._isTwistyOpen) this._collapseNode(); else this._expandNode();
  },



  //------------------------
  // THE ICON
  _displayIcon: function() {
    if( this.isFolder() && !this.cfg.opts.folder.render.icon) return;
    if( this.isFile()   && !this.cfg.opts.file.render.icon  ) return;
    var iconNode = document.createElement("span");
    iconNode.appendChild(this._getHtmlIcon());
    dojo.place( iconNode, this.iconDiv, "only");
    this.iconDiv.style.display = "";
  },

  // displayers
  _getHtmlIcon: function() {
    if( this.isFolder()) {
      return this._getFolderIconHtml();
    } else {
      return this._getDocIconHtml();
    }
  },

  _getFolderIconHtml: function() {
    if( this.isCommunityFolder() ) return this.imgFolderCommunityNode;
    if( this.isPrivate()         ) return this.imgFolderPrivateNode;
    if( this.isPublic()          ) return this.imgFolderPublicNode;
    if( this.isShared()          ) return this.imgFolderSharedNode;
    return this.imgFolderClosedNode;
  },
  
  _getDocIconHtml: function() {
    return this.imgFileNode;
  },

  // events
  _onclickIcon: function(evt) {
    if( typeof( this.cfg.cb.node.header.icon.onclick ) == "function") this.cfg.cb.node.header.icon.onclick.call( this, this, evt);
    if( this.isDisabled()) return;
    if( this.isFolder()) {
       if ( this.isExpandable() ) {
          this._onclickTwisty(evt); // treat as if twisty was clicked
       }
       else if ( this._isSelectable() ) {
          this._toggleSelectNode();
       }
    }
  },



  //------------------------
  // THE NODE TITLE
  _displayTitle: function() {
    if( (this.isFolder() && this.cfg.opts.folder.render.checkbox) || (this.isFile() && this.cfg.opts.file.render.checkbox) ) {
       dojo.attr( this.titleDiv, "for", this.id + (this.cfg.opts.folder.behavior.isMultiSelectable? "_checkbox" : "_radio"));
    }
    if( this.isNavigatable( )) {
       dojo.attr( this.titleDiv, "tabindex", "-1");
    }

    this._insertHtmlTitle( this.titleDiv );

    if( this.isFolder() && !this.cfg.opts.folder.render.title) return;
    if( this.isFile()   && !this.cfg.opts.file.render.title  ) return;
    this.titleDiv.style.display = "";
  },

  // displayers
  _getTitleForHTML: function() {
     return this.data._titleForHTML;
  },

  _getHtmlTitle: function() { 
    var titleContentNode = dojo.doc.createElement("span");
       dojo.addClass(titleContentNode, "bidiAware");
       var titleContent = dojo.doc.createTextNode(this._getTitleForHTML());
       dojo.place( titleContent, titleContentNode );

    return titleContentNode;
  },

  _insertHtmlTitle: function( domNode ) {
     // span with title content hidden when accessibility is active
     var titleContent = this._getHtmlTitle();
        dojo.addClass(titleContent, "lconnTextA11yHidden");
        dojo.addClass(titleContent, "bidiAware");
     dojo.place( titleContent, domNode, "only");

     // link with title content shown when accessibility is active
     var titleAltContentNode = dojo.doc.createElement("a");
        dojo.attr( titleAltContentNode, "tabindex", "-1" );
        dojo.attr( titleAltContentNode, "href", "javascript:;");
        dijit.setWaiRole( titleAltContentNode, "presentation");
        dojo.addClass(titleAltContentNode, "lotusAltText");
        var titleAltContent = this._getHtmlTitle();
        dojo.place( titleAltContent, titleAltContentNode, "only");
     dojo.place( titleAltContentNode, domNode);
     
     lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(domNode);

  },

  _getTitleAltText: function( ) {
    // set value for alternative title attribute
    var customizedTitleToolTip = null;
    if( typeof( this.cfg.cb.node.tooltip ) == "function" ) {
       customizedTitleToolTip = this.cfg.cb.node.tooltip.call( this, this);
    }
    return ( (customizedTitleToolTip && customizedTitleToolTip.length > 0)? customizedTitleToolTip : this._getTitleForHTML() );    
  },
  
  _getTitleAriaText: function( ) {
    var s = ( this.isDisabled( )? this._strings["gen_disabled"] : ( this._isSelectable()? this._strings["gen_click_to_select"] : this._strings["gen_click_to_expand"] ) );
    s = ( s && s.indexOf("{0}") > -1? dojo.replace( s, { 0: this.getTitle() }) : s );
    return( s || null );
  },

  _setTitleAltText: function( ) {
    this.altTitle = this._getTitleAltText( );
    this.ariaLabelTitle = this._getTitleAriaText( );
    
    if( this.titleDiv && this.titleDiv.title ) {
      this.titleDiv.title = this.altTitle;
      if( dojo.attr( this.titleDiv, "aria-label") ) dojo.attr( this.titleDiv, "aria-label", this.ariaLabelTitle ); 
    }
  },
  
  // events
  // - also handles ENTER key pressed
  _onclickTitle: function(evt) {
    if (evt) {
      if ( evt.type != "click" && ( evt.type != "keypress" || evt.keyCode != dojo.keys.ENTER ) ) {
        return;
      }
      dojo.stopEvent(evt);
    }
    if( this.isDisabled()) return;

    if( typeof( this.cfg.cb.node.header.title.onclick ) == "function") this.cfg.cb.node.header.title.onclick.call( this, this, evt);
    if ( this._isSelectable() ) {
       this._toggleSelectNode();
    }
  },



  //------------------------
  // THE NODE EXTERNAL
  _displayExternal: function() {
    if( this.isFolder() && !this.cfg.opts.folder.render.externalIcon) return;
    if( this.isFile()   && !this.cfg.opts.file.render.externalIcon  ) return;

    if( this._getHtmlExternal()) {
      dojo.place( this._getHtmlExternal(), this.externalDiv, "only");
      this.externalDiv.style.display = "";
    }
  },

  // displayers
  _getHtmlExternal: function() { return( this.isExternal()? this.imgExternalNode : null);  },



  //------------------------
  // THE NODE VISIBILITY
  _displayVisibility: function() {
    if( this.isFolder() && !this.cfg.opts.folder.render.visibilityIcon) return;
    if( this.isFile()   && !this.cfg.opts.file.render.visibilityIcon  ) return;

    if( this._getHtmlVisibility()) {
      dojo.place( this._getHtmlVisibility(), this.visibilityDiv, "only");
      this.visibilityDiv.style.display = "";
    }
  },

  // displayers
  _getHtmlVisibility: function() {
    if( this.isCommunity()		 ) return this.imgVisCommunityNode;
    if( this.isPrivate()         ) return this.imgVisPrivateNode;
    if( this.isPublic()          ) return this.imgVisPublicNode;
    if( this.isShared()          ) return this.imgVisSharedNode;
  },




  //----------------------------
  // THE NODE'S CONTAINER TREE
  _createTree: function(){
    if( this.tree ) this.tree.destroy();

    var treeArgs = {}; 
    treeArgs.datastore = dojo.clone( this.cfg.ds );
    treeArgs.callbacks = dojo.clone( this.cfg.cb );
    treeArgs.features  = dojo.clone( this.cfg.opts );
    
    treeArgs.datastore.uri = this.data.feed; // link to a feed that returns the contained items
    treeArgs.datastore.apiParamsOnUri = true; // add api params to uri feed
    treeArgs.datastore.feed = null; // clear possible existing feed data, since we are going to query new tree using URI 
    treeArgs.datastore.beans = [];  // clear possible existing bean data, since we are going to query new tree using URI

    // pass parent/child relationship
    treeArgs.parentNode = this;
  
    treeArgs.rootTree = this.getRoot();
    treeArgs._nodes = [];
    treeArgs.ariaRoleFilesTree = "presentation"; // ARIA role set to be presentation if it is a sub-tree
    treeArgs.initHeight = treeArgs.rootTree.initHeight;

    this.data.childrenCount = 0; // reset children count as it will be recalculated by the added nodes
    
    this.tree = new lconn.share.widget.Tree( treeArgs );
    if( this.tree ) {
      this.tree.placeAt( this.domNode, "last");
    }
    
    return this.tree;
  },

  _loadTree: function(){
    if( this._createTree() ) {
      this.tree.startup(); // startup will load nodes into the tree based on datastore options
      this._isContainerLoaded = true; // flag to cache previously loaded containers
      this._isTwistyOpen = true;
      this._displayTwisty( );
      return true;
    }
    
    return false;
  },
    
  _hideContainer: function() { if( this.tree && this.tree.containerNode ) dojo.style( this.tree.containerNode, "display", "none"); },
  _showContainer: function() { if( this.tree && this.tree.containerNode ) dojo.style( this.tree.containerNode, "display", ""); }

    
  
  //
  // END NODE ELEMENTS DISPLAY AND EVENT INTERFACES SECTION
  //----------------------------------------------------------------------
});



/**
 * Files Tree Datastore Widget
 * @namespace lconn.core.widget.Tree
 * @class lconn.share.widget.datastore
 * @author Antonio Estrada <testrada@us.ibm.com>
 * @author Oliver-R Wittmann  <orwitt@de.ibm.com>
 *
 * @version *** PRE-PRODUCTION code *** Public Interfaces may still change;  contact authors for details/questions
 * @todo make this class dependant on tree class
 */
dojo.declare(
  "lconn.share.widget.datastore",
  null, /** @lends lconn.share.widget.datastore.prototype */
{
  cfg:{
    /*
    uses ONE of the following properties to dictate where to get data from, listed in priority order:
    1) uri + apiParams - use the supplied URI + params as the XHR GET URL
    2) predefined - use the predefined (possible values: files, ecm) default API as the XHR GET URL
    */
    predefined: "files",
    uri: null,
    apiParams: null, // used in conjunction with uri API or predefined API
    apiParamsOnUri: true, // if true, apiParams tacked onto the supplied URI; false, URI used without supplied apiParams (URI may contain params already as part of the URI)

    xhrSync: true, // default: runs xhr synchronously 
    lazyLoad: true, // if true, autoload every page; false, consumer controls page loads via params
    nextPageUri: null,

    isAuthed: null, // is the user authenticated?

    onError: null
  },
  
  xhr:{
    uri: null,
    contentType: "xml",
    sync: false,
    xhrTimeout: 5000 // timeout in millisiconds for xhr operations
  },
  
  constructor: function(args) {
    dojo.safeMixin(this.cfg, args || {});
  
    try {
      this.xhr.sync = this.cfg.xhrSync;
    
      if( this.cfg.uri) {
        this.xhr.uri = (this.cfg.apiParamsOnUri? this._addParams( this.cfg.uri, this.cfg.apiParams ) : this.cfg.uri);
      } else {
        if(this.cfg.predefined === "files") {
          this.xhr.uri = ( this.cfg.apiParamsOnUri? this._addParams( this._getFilesAPI(), this.cfg.apiParams ) : this._getFilesAPI() );
        } else if(this.cfg.predefined === "ecm") {
          this.xhr.uri = ( this.cfg.apiParamsOnUri? this._addParams( this._getEcmAPI(), this.cfg.apiParams ) : this._getEcmAPI() );
        }
      }
    } catch(ex) {
      throw new Error( ex.message);
    }
  },

  _addParams: function( uri, params ) {
    if( !uri ) return null;
    if( !params ) return uri;
    params = (params[0] == "?" || params[0] == "&") ? params.substring(1) : params; // stripout leading ? or &
    return( uri + ( uri.indexOf("?") > -1 ? "&" : "?" ) + params );
  },

  /** @returns {boolean} true if user is authenticated */
  _isAuthenticated: function() {
    return(
      this.cfg.isAuthed ||
      (this.cfg.isAuthed == null && 
        ( lconn.core.auth.isAuthenticated() ||
        ( dojo.cookie("X-IC-Container-Token") && dojo.cookie("X-IC-Container-Token").indexOf("$anonymous") == -1 )))
    ); 
  },
  
  /**
    * Builds up and returns a string defining the built-in (predefined) files app API URL
    * @returns {string} files app API URL
    */
  _getFilesAPI: function() {
    // note: if we are being hosted in a community and have requested the files API,
    //       use the ../communitycollection/.. API
    //       otherwise, use the ../collection/.. API
    var commUuid = ic_comm_communityUuid? ic_comm_communityUuid : null;
    var isCommunity = commUuid != null;
    var isSecure = location.protocol == "https:";
    var svcs = lconn.core.config.services;
    var filesSvc = lconn.core.url.getServiceUrl(svcs.files, isSecure && svcs.files.secureEnabled).uri;
    return( filesSvc+"/form"+(this._isAuthenticated()?"":"/anonymous")+"/api"+(isCommunity? "/communitycollection/"+commUuid : "/collections")+"/feed");
  },

  /**
    * Builds up and returns a string defining the built-in (predefined) ECM API URL
    * @returns {string} ECM API URL
    * @todo disabled until we can get the lib id 
    */
  _getEcmAPI: function() {
    return null; // disabled for D41 TODO... need get the lib id
    var isSecure = location.protocol == "https:";
    var svcs = lconn.core.config.services;
    var ecmSvc = lconn.core.url.getServiceUrl(svcs.ecm_files, isSecure && svcs.ecm_files.secureEnabled).uri;
    var libId = "1CEE4C0B-5FEE-4C7B-8257-12E217740499;2442D594-24B0-4BA1-B169-39ED57E1096D";  // TODO FIX: get the actual lib id from DOM obj
    return( ecmSvc+"/atom"+(this._isAuthenticated()?"":"/anonymous")+"library/"+libId+"/feed");
  },
  
  /**
   * @callback requestCallback
   * @param {number} responseCode
   * @param {string} responseMessage
   */

  /**
    * Fires an xhr GET request and callsback upon success
    * @param {requestCallback} cb - the callback function to call upon xhr load
    */
  load: function( cb ) {
    this._xhrGet({
      url: com.ibm.oneui.util.proxy( this.xhr.uri ),
      handleAs: this.xhr.contentType,
      timeout: this.xhr.xhrTimeout,
      sync: this.xhr.sync,

      error: dojo.hitch(this, function( resp, ioargs) {
        if( this.cfg.onError) this.cfg.onError.apply(this, arguments);
        if (resp.alreadyHandled) return resp.response;
        this._xhrError(resp,ioargs);
        return resp.response;
      }),

      load: dojo.hitch(this, function( resp, ioargs) {
        cb.apply(this, arguments);
      })
    });
  },

  // XHR wrappers/helpers
  _xhrGet: function(args) { return this._xhr("GET", args); },
  _xhrPost: function(args) { return this._xhr("POST", args); },
  _xhrDelete: function(args) { return this._xhr("DELETE", args); },
  _xhrPut: function(args) { return this._xhr("PUT", args); },
  _xhr: function(method, args) {
    if (dojo.getObject("com.ibm.ajax.auth")) com.ibm.ajax.auth.prepareSecure(args);
    return dojo.xhr(method, args);
  },
  _xhrError: function( resp, ioArgs ) {
    if(typeof(ioArgs) == "undefined") ioArgs = "";
    if( resp ) {
      if ( resp.status != 401 && resp.dojoType != "cancel" ) {
        throw new Error( resp.message? resp.message : resp);
      }
    }
  }
});



/**
 * class to wrap the needed interfaces of lconn.share.bean.File|Collection|CollectionFromFeed
 */
dojo.declare(
      "lconn.share.widget.nodebean",
      null, /** @lends lconn.share.widget.nodebean.prototype */
{
   _bean: null,
   _isFile: false,
   _isFolder: false,
   _isExternal: false,
   _isPublic: false,
   _isPrivate: false,
   _isShared: false,
   _isCommunityFolder: false,
   _isCommunity: false,

  _isDirty: false,  // flag to indicate that the nodebean dataset has been mocked with and could differ from the original bean or disk

   constructor: function( bean ) {
      if (!lconn.share.widget.nodebean.isSupportedBean(bean)) {
         throw "Invalid arguments used to create a lconn.share.widget.nodebean object";
      }

      this._bean = bean;
      switch ( bean.declaredClass ) {
      case "lconn.share.bean.File":
      {
         this._isFile = true;
      }
      break;

      case "lconn.share.bean.Collection":
      {
         this._isFolder = true;
      }
      break;

      case "lconn.share.bean.CollectionFromFeed":
      {
         this._isFolder = true;
      }
      break;

      case "lconn.share.bean.CollectionFromJson":
      {
         this._isFolder = true;
      }
      break;
      }
      
      this._initNodeVisibilityData( this.getBean() );
      
      this._isDirty = false;
   },
   
   _initNodeVisibilityData: function( bean ) {
     if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;
     this._isExternal        = bean.isExternal();
     this._isPublic          = bean.isPublic();
     this._isPrivate         = bean.isPrivate();
     this._isShared          = bean.isShared();
     this._isCommunityFolder = ( bean.isCommunityFolder? bean.isCommunityFolder() : this._calcIsCommunityFolder());
     this._isCommunity       = this._isCommunityFolder || ( this.isFolder() ? false : (this.getBean().getLibraryType() == "communityFiles" ? true : false));
   },

   getBean: function() {
      return this._bean;
   },

   getFileBean: function() {
      return this.isFolder() ? null : this.getBean();
   },

   getCollBean: function() {
      return this.isFolder() ? this.getBean() : null;
   },

   isFolder: function() {
      return this._isFolder;
   },

   getId: function() {
      return this.getBean().getId();
   },

   getTitle: function() {
      return this.isFolder() ? this.getBean().getName() : this.getBean().getTitle();
   },

   getUrlFeed: function() {
      return this.isFolder() ? this.getBean().getUrlFeed() : null; 
   },

   isExternal: function() {
      return this._isExternal;
   },

   isPrivate: function() {
      return this._isPrivate;
   },

   isPublic: function() {
      return this._isPublic;
   },

   isShared: function() {
      return this._isShared;
   },

   getMimeType: function() {
      return this.isFolder() ? null : this.getBean().getMimeType();
   },

   isCommunityFolder: function() {
     return this._isCommunityFolder;
   },
   
   isCommunity: function() {
     return this._isCommunity;
   },
   
   _calcIsCommunityFolder: function() {
      if (!this.isFolder()) {
         return false;
      }

      return( ( !this.isPublic()
                && this.getBean().getLibraryType
                && ( this.getBean().getLibraryType() == "communityFiles"
                     || this.getBean().getLibraryType() == "communityECMFiles") )
              || ( this.getBean().getType && this.getBean().getType() == "community") ); 
   },
   
   setNodeVisibilityData: function( bean ) {
     if( typeof(bean) == "undefined" ) bean = this.getBean();
     if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;
     
     this._isDirty = this.visibilityDiffers( bean )? true : false;
     this._initNodeVisibilityData( bean );
   },
   
  /**
   * Returns true|false if the visibility of the supplied bean, or current object's original bean, differs from the inited data set
   * @param [{lconn.share.bean.File|lconn.share.bean.Collection}] bean - the bean to use to compare against. if not supplied, it will use current node's bean
   * @returns {Boolean|null} - true: visibility differs; false: visibility is the same; null, invalid input parameter 
   */
   visibilityDiffers: function( bean ) {
     if( typeof(bean) == "undefined" ) bean = this.getBean();
     if( typeof(bean) != "object" || !lconn.share.widget.nodebean.isSupportedBean( bean )) return null;
    
     return(
       this.isExternal()        != bean.isExternal() ||
       this.isPublic()          != bean.isPublic()   ||
       this.isPrivate()         != bean.isPrivate()  ||
       this.isShared()          != bean.isShared()   ||
       ( bean._isCommunityFolder && this.isCommunityFolder() != bean.isCommunityFolder() )
     );
   },
   
   isDirty: function() {
     return this._isDirty;
   },
   
   getSortType: function() {
     if (this.isFolder() && (typeof this.getBean().getSortType == "function")) {
       return this.getBean().getSortType();
     }
     return "auto";
   }
});

lconn.share.widget.nodebean.isSupportedBean = function( bean ) {
   return bean.declaredClass == "lconn.share.bean.File"
          || bean.declaredClass == "lconn.share.bean.Collection"
          || bean.declaredClass == "lconn.share.bean.CollectionFromFeed"
          || bean.declaredClass == "lconn.share.bean.CollectionFromJson"
          || bean.declaredClass == "lconn.share.widget.nodebean";
};

lconn.share.widget.nodebean.createNodeBean = function( bean ) {
   if ( lconn.share.widget.nodebean.isSupportedBean(bean) ) {
      return new lconn.share.widget.nodebean( bean );
   }

   return null;
};
