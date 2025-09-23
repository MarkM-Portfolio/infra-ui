/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
   
dojo.provide('lconn.share.widget.Resizable');

/**
 * Provide methods to resize a widget or dialog. To make a widget/dialog to be resizable, 
 * extend it from this class or create an instance inside of it. This class defines default 
 * dimensions for itself and key inner items. When it accept a new dimension, it need recalculate 
 * new dimensions for itself and inner items. And cascadly call inner items to resize.  
 * 
 * TODO to support resize when a widget/dialog is visible. Now it only support setting dimentions
 * before display the widget/dialog.
 * 
 * TODO how to work with _layoutWidget? 
 * 
 */
dojo.declare("lconn.share.widget.Resizable", null, {
   
   constructor: function() {
      this._defaultWidth= 400;
      this._width = this._defaultWidth;
      this._defaultInnerWidths = {};
      this._innerWidths = {};
   },
   
   setDefaultWidth: function(width) {
      if (width && width >=0 )
         this._defaultWidth = width;
      else 
         console.error("Invalid value: " + width);
    },
    
   getDefaultWidth: function() {
      return this._defaultWidth;
   },
    
   getDefaultInnerWidth: function(name) {
      for (var key in this._defaultInnerWidths) {
         if (key === name)
            return this._defaultInnerWidths[key];
      }
        
      return null;
   },
    
   setDefaultInnerWidth: function(name, value) {
      if (!name) {
         console.warn("Invalid name: " + name);
         return;
      }
         
      if (!value || value <0) {
         console.error("Invalid value for " + name + ": " + value);
         return;
      }
                  
      var appended = true;
      for (var key in this._defaultInnerWidths) {
         if (key === name) {
            this._defaultInnerWidths[key] = value;
            appended = false;
            break;
         }
      }
      
      if (appended)
         this._defaultInnerWidths[name] = value;
   }, 
   
   getWidth: function() {
      if (!this._width)
         this._width = this._defaultWidth;
      return this._width; 
   },
    
   getWidthInPx: function() {
      return this.getWidth() + "px"; 
   },

   getInnerWidth: function(name) {
      for (var key in this._innerWidths) {
         if (key === name)
            return this._innerWidths[key];
      }
        
      return null;
   },

   getInnerWidthInPx: function(name) {
      var ret = this.getInnerWidth(name); 
      return  ret ? ret + "px" : ret;
   },

   adjustWidths: function(newWidth) {
      if (!newWidth || newWidth <=0) {
         console.warn("Invalid new width for " + this.declaredClass + ": " + newWidth);
         return;
      }

      this._width = newWidth;

      var ratio = newWidth / this._defaultWidth;
      
      for (var key in this._defaultInnerWidths) {
         var value = Math.round(this._defaultInnerWidths[key] * ratio);
         if (value <=0) {
            console.warn("New width for " + key + "is too small:  " + value);
            value = 1;
         }
         this._innerWidths[key] = value;
      }
   }
});
