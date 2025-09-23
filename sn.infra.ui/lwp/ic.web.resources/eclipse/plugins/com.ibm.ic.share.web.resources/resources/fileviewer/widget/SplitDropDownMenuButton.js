/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare", 
  "./DropDownMenuButton",
  "dojo/on",
  "dojo/_base/lang"
], function (declare, DropDownMenuButton, on, lang) {
  
  var SplitDropDownMenuButton = declare([DropDownMenuButton], {
    postCreate: function() {
       this.inherited(arguments);
       //overwrite
       this._popupMenu._onDropDownMouseDown = function(){};
       this._popupMenu._onBlur = function() {};
    },
    
    setDropDownButtonTitle: function() {
      this._popupMenu._buttonNode.title = this.nls.TITLE;
    },
    
    setClickEvent: function() {
       on(this._popupMenu._buttonNode, 'click', lang.hitch(this, function(e) {
          this.currentNode = e.target;
          this._popupMenu.toggleDropDown();
          e.stopPropagation();
          e.preventDefault();
       }));
    }
  }); 

  return SplitDropDownMenuButton;
});
