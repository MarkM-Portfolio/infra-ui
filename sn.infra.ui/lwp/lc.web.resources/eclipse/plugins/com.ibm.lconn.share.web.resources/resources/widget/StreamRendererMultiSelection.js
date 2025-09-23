/* Copyright IBM Corp. 2011, 2018  All Rights Reserved.              */

dojo.provide("lconn.share.widget.StreamRendererMultiSelection");

/**
 * 1. The check box ownership is managed in renderSelection
 * 2. The _isSelected is managed in all onXXChange method
 */
dojo.declare("lconn.share.widget.StreamRendererMultiSelection", null, {
   
   constructor: function(){
      this.selection = [];
      this.selectionListeners = [];
      this.selectionALLListeners = [];
      this.itemByPosition = [];
      this.enableContinuousScrolling = false;
   },
   
   renderSelectAll: function(stream, el, data, d, opt){
      var checkall;
      this.enableContinuousScrolling = opt && opt.enableContinuousScrolling;
      if (this.enableContinuousScrolling) {
        if (this.selectAllElement && this.selectAllElement.id == stream.id + "_selectall") {
          checkall = this.selectAllElement;
        } else {
          checkall = this.selectAllElement = this.createCheckbox(d);
          checkall.id = stream.id + "_selectall";
        }
        dojo.forEach(this.selectionALLListeners, dojo.disconnect);
        if (this.itemByPosition.length == 0) {
          this.itemByPosition = data.itemByPosition;
        }
        
        this.selectionALLListeners.push(dojo.connect(checkall, "onclick", dojo.hitch(this, "onSelectAll", { itemByPosition: this.itemByPosition }, checkall, el)));
        el.appendChild(checkall);
        this.selectAllElement.checked = this.isAllSelected({ itemByPosition: this.itemByPosition });
        
      } else {
        checkall = this.selectAllElement = this.createCheckbox(d);
        checkall.id = stream.id + "_selectall";
        this.selectionListeners.push(dojo.connect(checkall, "onclick", dojo.hitch(this, "onSelectAll", data, checkall, el)));
        el.appendChild(checkall);
        this.selectAllElement.checked = this.isAllSelected(data);
      }
      
      if(window.ui && window.ui._check_ui_enabled()) {
         var label = d.createElement("label");
         label.appendChild(d.createTextNode(this._appstrings.DOCUMENTCONTENT["SELECT_ALL_LABEL"]))
         label.htmlFor = checkall.id;
         el.append(label);
      }
      this.updateSelectAllTitle();
   },
   isAllSelected: function(data){
      data = data || this.scene.listData || {};
      var byPos = (this.enableContinuousScrolling ? this.itemByPosition : data.itemByPosition) || [];
      return byPos.length == this.selection.length;
   },
   updateSelectAllTitle: function() {
      var checkbox = this.selectAllElement;
      if (checkbox)
         checkbox.title = this._appstrings.DOCUMENTCONTENT[checkbox.checked ? "UNSELECT_ALL":"SELECT_ALL"];
   },
   
   // Called when the "select all" checkbox is checked or unchecked
   onSelectAll: function(data, checkbox, el) {
      if (!data || !data.itemByPosition)
         return;
      var items = data.itemByPosition;
      var isSelected = checkbox.checked; 
      var selection = [];
      dojo.forEach(items, function(item) {
         item._isSelected = item.checkElement.checked = isSelected;
         if (isSelected)
            selection.push(item);
      });
      this.selection = selection;
      this.selectionChanged(this.selection);
      this.updateSelectAllTitle();
   },

   // Called when the checkbox for an item is checked or unchecked
   onSelectItem: function(item, checkbox, el){
      item = checkbox.item || item;
      var isSelected = item._isSelected = checkbox.checked;
      var selection = this.selection;
      if (isSelected) 
         selection.push(item);
      else {
         var id = item.getId ? item.getId() : item.id;
         selection = this.selection = dojo.filter(selection, function(s) {
            if (s == item)
               return false;
            var sId = s.getId ? s.getId() : s.id;
            if (sId && id && sId == id)
               return false;
            return true;
         });
      }
      if (this.selectAllElement)
         this.selectAllElement.checked = this.isAllSelected();
      this.selectionChanged(this.selection);
      this.updateSelectAllTitle();
   }, 
   
   // Called when an item is updated in the list as the result of an edit
   selectionUpdateItem: function(newItem, oldItem){
      newItem._isSelected = oldItem._isSelected;
      var checkElement = newItem.checkElement = oldItem.checkElement;
      oldItem.checkElement = null;
      if(checkElement)
         checkElement.item = newItem;
      if(newItem._isSelected ){
         var i = -1;
         var oldItemId = oldItem.getId ? oldItem.getId() : oldItem.id;
         for (var n = 0; n < this.selection.length; n++) {
            var item = this.selection[n];
            if (item == oldItem) {
               i = n;
               break;
            }
            var itemId = item.getId ? item.getId() : item.id;
            if (itemId && oldItemId && itemId == oldItemId) {
               i = n;
               break;
            }
         };
         //var i = dojo.indexOf(this.selection, oldItem);
         if (i != -1)
            this.selection[i] = newItem;
         else
            this.selection.push(newItem);
      }
   },
   
   // Called when all list items are updated as the result of a data load
   selectionUpdateItems: function(items){
      var selectedIds = {};

      var oldSelection = this.selection;
      dojo.forEach(oldSelection, function(item){
         if (item && item.getId)
            selectedIds[item.getId()] = true;
      });
      
      this.selection = dojo.filter(this.enableContinuousScrolling ? this.itemByPosition : items, function(item){
         var id = item.getId ? item.getId() : item.id;
         return item._isSelected = selectedIds[id];
      });
      if(this.isAllSelected()){
         if (this.selectAllElement)
            this.selectAllElement.checked = true;
      }
      if(oldSelection.length != this.selection.length)
         this.selectionChanged(this.selection);
   },
   
   createCheckbox: function(d){
      var d = d || document;
      var checkbox = (dojo.isIE < 9) ? d.createElement("<input type=\"checkbox\">") : d.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "lotusCheckbox";
      return checkbox;
   },
   destroy: function(){
      this.inherited(arguments);
      this.selection = [];
      this.selectAllElement = null;
      
      dojo.forEach(this.selectionListeners, dojo.disconnect);
      this.selectionListeners = [];
   },
   appendItemByPosition: function(itemByPosition){
      this.itemByPosition = this.itemByPosition.concat(itemByPosition);
   },
   initItemByPosition: function(itemByPosition){
      this.itemByPosition = itemByPosition;
   },
   emptySelection: function(){
      this.selection = [];
   },
   appendSelection: function(selection){
      this.selection.push(selection);
   }
});

lconn.share.widget.StreamRendererMultiSelection.renderSelection = function(x, stream, r, d, el, doc, position) {
   while(el.firstChild)
      el.removeChild(el.firstChild);
   if(!doc)
      return;
   var isSelected = doc._isSelected;
   var parentId = stream.id;
   var checkbox = doc.checkElement = r.createCheckbox();
      checkbox.id = parentId + "_" + position;
      checkbox.checked = checkbox.defaultChecked = isSelected;
      if (doc.getName)
         checkbox.title = typeof doc.getNameNls === "function" ? doc.getNameNls() : doc.getName();
   el.appendChild(checkbox);
   r.selectionListeners.push(dojo.connect(checkbox, "onclick", dojo.hitch(r, "onSelectItem", doc, checkbox, el)));
};
