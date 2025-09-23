/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.widget.NavigationTree");

dojo.require("dijit.Tree");

dojo.declare("com.ibm.social.layout.widget.NavigationTree", [dijit.Tree], {

   /*
   TODO:
   anchors as tree node labels
      attach urls
      ensure ctrl+click and middle click work
      handle url navigation
      publish nav clicks (url and id)

   drag/drop hooks
   action hooks ("+ Create page" in wikis)
   render separators
   
   set new store
   
   programatically select item (and expand to item)
      uses attr('path', [undefined, "id", "id2", ...]
      need to set lotusSelected at the end
      
   programatically unselect item
   
   programatically expand item
   
   programatically collapse item
      if we collapse a parent of the current focus node, what happens?

   */
   
   // Dijit tree options
   persist: false,
   showRoot: false,
   openOnDblClick:true,
   
   // Connections navigation tree options
   selectOnClick: true,
   expandOnClick: true,
   
   _nodePixelIndent: 10,
   
   constructor: function(opts) {
      return;
   },
   
   postCreate: function() {
      dojo.addClass(this.domNode, "lotusTree");
      this.inherited(arguments);
   },
   
   // Stop the event if the item has no url
   onClick: function(item, nodeWidget, e) {
      if (e) {
         dojo.stopEvent(e);
      }
      if (nodeWidget && nodeWidget.item.url) {
         document.location = nodeWidget.item.url;
         if (this.selectOnClick) {
            this.attr("lotusSelectedNode", nodeWidget);
         }
      }

// TODO: prevent weird interactions with double-click
      if (this.expandOnClick && nodeWidget.isExpandable && !nodeWidget.isExpanded) {
         this._expandNode(nodeWidget);
      }

      return this.inherited(arguments);
   },

   expandToPath: function(/*Item[] || String[]*/ path) {
      var dfd = new dojo.Deferred();
      
      if (!path || !path.length) {
         dfd.error({code:"path_missing", message:"Invalid path"});
         return dfd;
      }

      // If this is called during initialization, defer running until Tree has finished loading
      this._loadDeferred.addCallback(dojo.hitch(this, function(){
         if(!this.rootNode){
            if(dojo.config.isDebug) {
               console.debug("!this.rootNode");
            }
            dfd.error({code:"root", message:"No root node"});
            return;
         }
         if(path[0] !== this.rootNode.item && (dojo.isString(path[0]) && path[0] != this.model.getIdentity(this.rootNode.item))){
            console.error(this, ":path[0] doesn't match this.rootNode.item.  Maybe you are using the wrong tree.");
            dfd.error({code:"path_invalid", message:"First path segment doesn't match the root node item"});
            return;
         }
         path.shift();

         var node = this.rootNode;

         function handleError(error) {
            dfd.error(error);
         }
         function advance(){
            // summary:
            //       Called when "node" has completed loading and expanding.   Pop the next item from the path
            //    (which must be a child of "node") and advance to it, and then recurse.

            // Set item and identity to next item in path (node is pointing to the item that was popped
            // from the path _last_ time.
            var item = path.shift(),
               identity = dojo.isString(item) ? item : this.model.getIdentity(item);

            // Change "node" from previous item in path to the item we just popped from path
            var nodes = this._itemNodesMap[identity];
            dojo.some(nodes || [], function(n){
               if(n.getParent() == node){
                  node = n;
                  return true;
               }
               return false;
            });

            if(path.length){
               // Need to do more expanding
               this._expandNode(node).addCallback(dojo.hitch(this, advance)).addErrback(handleError);
            }else{
               dfd.callback(node);
            }
         }

         this._expandNode(node).addCallback(dojo.hitch(this, advance)).addErrback(handleError);
      }));
      
      return dfd;
   },
   
   _setLotusSelectedPathAttr: function(/*Item[] || String[]*/ path){
      var self = this;
      self.expandToPath(path).addCallback(function(node){
         self.attr("lotusSelectedNode", node);
      }).addErrback(function(error){
         self.attr("lotusSelectedNode", null);
      });
   },
   _getLotusSelectedPathAttr: function(){
      // summary:
      //    Return an array of items that is the path to selected tree node.
      var treeNode = this.attr("lotusSelectedNode");
      if(!treeNode){ return; }
      var res = [];
      while(treeNode && treeNode !== this.rootNode){
         res.unshift(treeNode.item);
         treeNode = treeNode.getParent();
      }
      res.unshift(this.rootNode.item);
      return res;
   },
   
   _setLotusSelectedNodeAttr: function(node) {
      var old = this._lotusSelectedNode;
      if (old != node) {
         if (old) {
            if (old.rowNode) {
               dojo.removeClass(old.rowNode, "lotusSelected");
            }
            if (old.labelNode) {
               dijit.setWaiState(old.labelNode, "selected", false);
            }
         }
         if (node) {
            if (node.rowNode) {
               dojo.addClass(node.rowNode, "lotusSelected");
            }
            if (node.labelNode) {
               dijit.setWaiState(node.labelNode, "selected", true);
            }
         }
      }
      this._lotusSelectedNode = node;
   },
   _getLotusSelectedNodeAttr: function() {
      return this._lotusSelectedNode;
   },

   _createTreeNode: function(/*Object*/ args){
      args = args || {};
      args.url = args.url || args.item.url || "javascript:;";
      return new com.ibm.social.layout.widget.NavigationTreeNode(args);
   }
});



dojo.declare("com.ibm.social.layout.widget.NavigationTreeNode", [dijit._TreeNode], {
   // Override to use anchor for label
   templatePath: dojo.moduleUrl("com.ibm.social.layout", "widget/templates/NavigationTreeNode.html"),
   
   // Override to add href attribute
   attributeMap: dojo.delegate(dijit._TreeNode.prototype.attributeMap, {
      url: {node: "labelNode", type: "attribute", attribute: "href"}
   }),
   
   // Override to avoid animating expansion... too slow
   expand: function(){
      // summary:
      //    Show my children
      // returns:
      //    Deferred that fires when expansion is complete

      // cancel in progress collapse operation
      if (this._wipeOut) {
         this._wipeOut.stop();
      }

      // All the state information for when a node is expanded, maybe this should be
      // set when the animation completes instead
      this.isExpanded = true;
      dijit.setWaiState(this.labelNode, "expanded", "true");
      dijit.setWaiRole(this.containerNode, "group");
      dojo.addClass(this.contentNode,'dijitTreeContentExpanded');
      this._setExpando();
      this._updateItemClasses(this.item);
      if(this == this.tree.rootNode){
         dijit.setWaiState(this.tree.domNode, "expanded", "true");
      }

      // Override to show immediately and return completed Deferred
      this.containerNode.style.display = "";
      var dfd = new dojo.Deferred();
      dfd.callback();
      return dfd;
   },
   
   // Override to decouple aria-selected state from focus
   setSelected: function(/*Boolean*/ selected){
      // summary:
      //    A Tree has a (single) currently selected node.
      //    Mark that this node is/isn't that currently selected node.
      // description:
      //    In particular, setting a node as selected involves setting tabIndex
      //    so that when user tabs to the tree, focus will go to that node (only).
      var labelNode = this.labelNode;
      labelNode.setAttribute("tabIndex", selected ? "0" : "-1");
      // dijit.setWaiState(labelNode, "selected", selected);
      dojo.toggleClass(this.rowNode, "dijitTreeNodeSelected", selected);
   } 
});
