/* Copyright IBM Corp. 2016  All Rights Reserved.              */

dojo.provide("lconn.share.widget.FileRendererCoreDndSource");
dojo.require("lconn.core.config.features");
dojo.require("dojo.dnd.Source");

dojo.declare("lconn.share.widget.FileRendererCoreDndSource", dojo.dnd.Source, {
   // augment functionality from dojo's Source.js in order to implement drops on folders nodes only
  customCanDrop: false,
  allowNested: true,

  _markTargetAnchor: function(before) {
    if( this.current && this.current.id ){
      var targetItem = this.getItem(this.current.id, true);
      var nodes = dojo.dnd.manager().nodes;

      if(this.disableDropItem(targetItem, nodes) || (this.current.id in this.selection) ) { // only allow drops on folders
         if(this.targetAnchor)
            this._removeItemClass(this.targetAnchor, this.before ? "Before" : "After");
         this.customCanDrop = false;
         return;
      }
      else {
         this.customCanDrop = true;
      }
    }

    this.inherited(arguments);
  },
  
  disableDropItem: function(targetItem, sourceItems) {
     // check if target is folder
     var isFolder = (targetItem && targetItem.type && targetItem.type[0] == "folder");
     if(!isFolder)
        return true;
     
     var allowDropFolder = lconn.share.util.configUtil.isSingleFolderDndRightToRightEnabled(this.app.authenticatedUser);
     var allowDropFile = lconn.share.util.configUtil.isSingleFileDndRightToRightEnabled(this.app.authenticatedUser);
     
     for(var i=0; i<sourceItems.length; i++){
        var sourceItem = this.getItem(sourceItems[i].id, true);
        if(sourceItem && sourceItem.type) {
           switch (sourceItem.type[0]) {
              case "folder" : if(!allowDropFolder || targetItem.data.getId() === sourceItem.data.getParentId()) //check if any source Item has been in target folder
                                 return true;
                              break;
              case "file" : if(!allowDropFile)
                               return true;
                            break;
              default : break;
           }
        }
     }
     return false;
  },
  
   onMouseMove: function(e){
      this.inherited(arguments);
      var m = dojo.dnd.manager();
      if( !this.customCanDrop && m && m.avatar ) {
         m.canDrop( false );
      }
   },
   
   onMouseDown: function(e){
      if(!this.current)
         return;
      this.inherited(arguments);
      var allowDragMulti = lconn.share.util.configUtil.isMultipleFileAndFolderDndEnabled(this.app.authenticatedUser);
      var nodes = this.getAllNodes();
      this._removeSelection();
      
      for(var i=0; i < nodes.length; i++) {
         if(nodes[i].style.display == "none")
            continue;
         var item = this.getItem(nodes[i].id, true);
         if(item && item.data._isSelected){
            this.selection[nodes[i].id] = 1;
            this._addItemClass(nodes[i], "Selected");
         }
      }
      
      var checkedCount = Object.getOwnPropertyNames(this.selection).length;
      if(this.current.id in this.selection) {
         if(checkedCount > 1 && allowDragMulti || checkedCount == 1)
            return;
         else
            this._removeSelection();        	
      }
      else if(checkedCount == 0)
         this.selection[this.current.id] = 1;
      else
         this._removeSelection();
   },

   onDndCancel: function() {
      this.inherited(arguments);
      var manager = dojo.dnd.manager();
      for(var i=0; i<manager.nodes.length; i++) {
         if(dojo.hasClass(manager.nodes[i], "DndItemMoving"))
            dojo.removeClass(manager.nodes[i], "DndItemMoving");
      }
      setTimeout(function(){
         if(manager.mouseDrag)
            manager.mouseDrag = false;
      },100);
   },
   
   onDndStart: function() {
      this.inherited(arguments);
      var manager = dojo.dnd.manager();
      manager.mouseDrag = true;
      
      for(var i=0; i<manager.nodes.length; i++) {
         if(!dojo.hasClass(manager.nodes[i], "DndItemMoving"))
            dojo.addClass(manager.nodes[i], "DndItemMoving");
      }
      
   }
});
