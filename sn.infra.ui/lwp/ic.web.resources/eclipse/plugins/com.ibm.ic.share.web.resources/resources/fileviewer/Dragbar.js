/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "dojo/_base/declare",
   "./sbw/StatefulBackedTemplatedWidget",
   "dojo/text!./templates/Dragbar.html",
   "dojo/on",
   "dojo/_base/lang",
   "dojo/window",
   "dojo/query",
   "dojo/dom-class",
   "dojo/keys",
   "dojo/i18n!./nls/FileViewerStrings"
], function (declare, StatefulBackedTemplatedWidget, template, on, lang, win, query, domClass, keys, i18n) {
   window.VIEWER_PANELS_DRAGBAR_SIZE = 15;

   window.VIEWER_PANELS_CLOSED_SIZE = window.VIEWER_PANELS_DRAGBAR_SIZE;
   window.VIEWER_PANELS_MINIMUM_SIZE = 340;
   window.VIEWER_PANELS_SNAP_CLOSED_SIZE = 240;
   window.VIEWER_PREVIEW_CLOSED_SIZE = 0;
   window.VIEWER_PREVIEW_MINIMUM_SIZE = 500;
   window.VIEWER_PREVIEW_SNAP_CLOSED_SIZE = 400;

   return declare([ StatefulBackedTemplatedWidget ], {
      templateString: template,
      
      postMixInProperties: function () {
         this.nls = i18n.ACTION.RESIZE;
         if (!this.nls) {
            this.nls = {
               RESIZE_BAR: "Resize the panel",
               USAGE: "Press left bracket or right bracket keys to resize the panel."
            };
         }
      },

      postCreate: function () {
         on(window, "resize", lang.hitch(this, function () {
            var args, newSize, windowWidth;

            windowWidth = win.getBox().w;

            args = {
               clientX: this.panelLocation === "left" ? this.model.get("panelSize") : windowWidth - this.model.get("panelSize"),
               windowWidth: windowWidth,
               previewClosedSize: window.VIEWER_PREVIEW_CLOSED_SIZE,
               previewMinimumSize: window.VIEWER_PREVIEW_MINIMUM_SIZE,
               previewSnapClosedSize: window.VIEWER_PREVIEW_SNAP_CLOSED_SIZE,
               panelsClosedSize: window.VIEWER_PANELS_CLOSED_SIZE,
               panelsMinimumSize: window.VIEWER_PANELS_MINIMUM_SIZE,
               panelsSnapClosedSize: window.VIEWER_PANELS_SNAP_CLOSED_SIZE
            };

            newSize = this._computeSizeWithMouse(args);
            this.model.set("panelSize", newSize);
         }));

         this.inherited(arguments);
      },

      _position: function (value) {
         var newValue = (value + -window.VIEWER_PANELS_DRAGBAR_SIZE) + "px";
         return newValue;
      },

      _onMouseDown: function (evt) {
         evt.preventDefault();
         evt.stopPropagation();

         if (this.moveHandler) {
            this.moveHandler.remove();
         }

         this.moveHandler = on(document, "mousemove", lang.hitch(this, "_resize"));
         this.upHandler = on(document, "mouseup", lang.hitch(this, "_removeListener"));

         this._setInterceptorsActive(true);
      },
      
      _listenForKeyboard: function(panelNavContainer) {
         this.rightBracket = 221;
         this.leftBracket = 219;
         
         on(this.domNode, "keydown", lang.hitch(this, function(evt) {

            switch (evt.keyCode) {
            case keys.RIGHT_ARROW:
            case keys.LEFT_ARROW:
            case this.rightBracket:
            case this.leftBracket:
                 this._resize(evt, evt.keyCode, panelNavContainer);
              break;
            }
         }));
      },

      _resize: function (evt, keyCode, panelNavContainer) {
         evt.preventDefault();
         evt.stopPropagation();
         
         var newSize, leftToRight;
         leftToRight = this.panelLocation === "right";
         var args = {
               clientX: evt.clientX,
               windowWidth: win.getBox().w,
               previewClosedSize: window.VIEWER_PREVIEW_CLOSED_SIZE,
               previewMinimumSize: window.VIEWER_PREVIEW_MINIMUM_SIZE,
               previewSnapClosedSize: window.VIEWER_PREVIEW_SNAP_CLOSED_SIZE,
               panelsClosedSize: window.VIEWER_PANELS_CLOSED_SIZE,
               panelsMinimumSize: window.VIEWER_PANELS_MINIMUM_SIZE,
               panelsSnapClosedSize: window.VIEWER_PANELS_SNAP_CLOSED_SIZE
            };

         if (keyCode) {
            newSize = this._computeSizeWithKey(args, keyCode, panelNavContainer, leftToRight);
         } else {
            newSize = this._computeSizeWithMouse(args);
         }
         this.model.set("panelSize", newSize);
      },
      
      _computeSizeWithKey: function(args, keyCode, panelNavContainer, leftToRight) {
         var newSize, maxPanelWidth, interval, previewWidth;

          maxPanelWidth = args.windowWidth - args.previewMinimumSize;
          interval = this._getInterval(keyCode, leftToRight);
          
          newSize = panelNavContainer.offsetWidth + interval;
          previewWidth = args.windowWidth - newSize;
          
          if (newSize < args.panelsMinimumSize) {
             newSize = this._newSizeWhenBelowMinimum(args, leftToRight, keyCode);
          } else if (newSize > maxPanelWidth) {
             newSize = this._newSizeWhenAboveMaximum(maxPanelWidth, args, leftToRight, keyCode);
          }
          
          return newSize;
       },

       _newSizeWhenBelowMinimum: function(args, leftToRight, keyCode) {
          return this._decreasePanelSize(leftToRight, keyCode) ? args.panelsClosedSize : args.panelsMinimumSize;
       },
       
       _newSizeWhenAboveMaximum: function(maxPanelWidth, args, leftToRight, keyCode) {
          return this._decreasePanelSize(leftToRight, keyCode) ? maxPanelWidth : args.windowWidth;   
       },
       
       _decreasePanelSize: function(leftToRight, keyCode) {
          return leftToRight ? this._rightkeyPressed(keyCode) : this._leftkeyPressed(keyCode);
       },
       
       _rightkeyPressed: function(keyCode) {
          return keyCode == keys.RIGHT_ARROW || keyCode == this.rightBracket;
       },
       
       _leftkeyPressed: function(keyCode) {
          return keyCode == keys.LEFT_ARROW || keyCode == this.leftBracket;
       },
       
      _computeSizeWithMouse: function (args) {
         var newWidth;

         if (this.panelLocation === "left") { // RTL
            args.clientX = args.windowWidth - args.clientX;
         }

         if (args.clientX < args.previewSnapClosedSize) {
            args.clientX = args.previewClosedSize;
         } else if (args.clientX < args.previewMinimumSize) {
            args.clientX = args.previewMinimumSize;
         }

         newWidth = args.windowWidth - args.clientX;

         if (newWidth < args.panelsSnapClosedSize) {
            newWidth = args.panelsClosedSize;
         } else if (newWidth < args.panelsMinimumSize) {
            newWidth = args.panelsMinimumSize;
         }

         return newWidth;
      },

      _getInterval: function(keyCode, leftToRight) {
         var interval;
         if (leftToRight) {
            interval = (keyCode == keys.RIGHT_ARROW || keyCode == this.rightBracket) ? -10 : 10;
         } else {
            interval = (keyCode == keys.LEFT_ARROW || keyCode == this.leftBracket) ? -10 : 10;
         }
        return interval; 
      },
      
      _removeListener: function (evt) {
         evt.preventDefault();
         evt.stopPropagation();

         this.upHandler.remove();
         this._setInterceptorsActive(false);

         if (this.moveHandler) {
            this.moveHandler.remove();
            this.moveHandler = undefined;
         }
      },

      _setInterceptorsActive: function (active) {
         query(".ics-viewer-event-interceptor").forEach(function (el) {
            domClass[active ? "add" : "remove"](el, "ics-viewer-event-interceptor-active");
         });
      }
   });
});