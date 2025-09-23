/* Copyright IBM Corp. 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.tree.dnd.Source");

dojo.require("dojo.dnd.Source");

dojo.declare("lconn.share.widget.tree.dnd.Source", dojo.dnd.Source, {
  // augment functionality on our dnd implementation with folder checks  
  
   customCanDrop: false,
  
   _markTargetAnchor: function(before) {
      if( this.current && this.current.id ){
         var target = this.getItem( this.current.id );
         // do some additional checking
         // since the entire list of items is a single source that accepts both files and folders,
         // check here if we are trying to drop on something other than a folder
         if((target && target.type && target.type[0] != "folder")) { // only allow drops on folders
            this.disableDrop();
            return;
         }
         var targetNode = this.current.parentNode;
         var targetCollection = dijit.byId(targetNode.id);
         
         var nodes = dojo.dnd.manager().nodes;
         var dndSource = dojo.dnd.manager().source;
         for(var i=0; i<nodes.length; i++) {
            var sourceItem = nodes[i];
            var sourceNode = (sourceItem && sourceItem.id) ? dndSource.getItem(sourceItem.id, true) : null;
            var sourceCollection = sourceNode ? sourceNode.data : null;
            if(this.disableDropForItem(targetCollection, sourceCollection, this.app)) {
               this.disableDrop();
               return;
            }
         }
         

         this.customCanDrop = true;
      }

      this.inherited(arguments);
   },
   
   disableDropForItem: function(targetCollection, sourceCollection) {
      return false;
   },
   
   disableDrop: function() {
      if(this.targetAnchor)
         this._removeItemClass(this.targetAnchor, this.before ? "Before" : "After");
      this.customCanDrop = false;
   },
  
   onMouseMove: function(e){
      if( dojo.dnd.manager().avatar ) this.inherited(arguments);
    
      if( !this.customCanDrop ) {
         var m = dojo.dnd.manager();
         if( m && m.avatar ) {
            m.canDrop( false );
         }
      }
   }
});
