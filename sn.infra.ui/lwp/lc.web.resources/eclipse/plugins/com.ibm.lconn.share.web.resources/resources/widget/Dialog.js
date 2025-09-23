/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.Dialog');
dojo.require("dijit.Dialog");

dojo.declare("lconn.share.widget.Dialog", [dijit.Dialog], {

   // initialFocusNode: DomNode
   //		A pointer to the node which should receive focus when the dialog is
   //		shown. If null, focus defaults to the first focusable node in the dialog.
   initialFocusNode: null,

   // Override to add initialFocusNode support
   onOpen: function(/*Object*/ pos){
      // summary: called when dialog is displayed

      this.orient(this.domNode,pos.aroundCorner, pos.corner);
      this._loadCheck(); // lazy load trigger
	
      if(this.autofocus){
         this._getFocusItems(this.containerNode);
         var node = (dojo.isFunction(this.initialFocusNode) ? this.initialFocusNode() : this.initialFocusNode) || this._firstFocusItem;
		 dijit.focus(node);
      }
   },
   
   _setup: function() {
      this.inherited(arguments);
      if (this.zIndex > 0) {
         var underlay = dijit._underlay;
         if(!underlay){
            underlay = dijit._underlay = new dijit.DialogUnderlay(this.underlayAttrs);
         }else{
            underlay.attr(this.underlayAttrs);
         }
         underlay.domNode.style.zIndex = this.zIndex;
         this.domNode.style.zIndex = this.zIndex + 1;
      }
      if (this._moveable) {
         // Prevent dragging the close icon
         var onDragDetected = this._moveable.onDragDetected;
         this._moveable.onDragDetected = function(e){
            var target = e.target;
            while (target && target.nodeName.toLowerCase() != "a")
               target = target.parentNode;
            if (target && target.nodeName.toLowerCase() == "a" && dojo.hasClass(target, "lotusClose"))
               return;

            if(onDragDetected)
               return onDragDetected.apply(this, arguments);
         };
         
         // Prevent dragging past the top/left
         var _onMoving = this._moveable.onMoving;
         this._moveable.onMoving = function(/* dojo.dnd.Mover */ mover, /* Object */ leftTop){
            leftTop.l = Math.max(leftTop.l, mover.marginBox.l + 5);
            leftTop.t = Math.max(leftTop.t, mover.marginBox.t + 5);
            if(_onMoving)
               return _onMoving.apply(this, arguments);
         };
      }
   },

   updatePositionAfterSizeChange: function() {
      this._relativePosition = null; // force default position
      this._position();
   },

   resize: function() {
      // For dojo version > 1.9:
      //    no resizing, just positioning
      if (dojo.version.major == 1 && dojo.version.minor <= 9) {
         this.inherited(arguments);
      }
      else {
         var isEventWindowScroll = false;
         if (arguments && arguments.length >= 1) {
            if (arguments[0] && arguments[0].type == "scroll") {
               isEventWindowScroll = true;
            }
            else if (arguments[1] && arguments[1].type == "scroll") {
               isEventWindowScroll = true;
            }
         }
         if (!isEventWindowScroll) {
            this._relativePosition = null; // force default position
         }
         this._position();
      }
   },

   _size: function() {
      // For dojo version <= 1.9 (since dojo version 1.10 this method is already a no-op):
      //    Make _size a no-op, since we have our own auto-scroll code
   },

   _position: function() {
      // get dialog position and size
      var node = this.domNode;
      var viewport = dijit.getViewport();
      var bb = dojo.position(node, true);
      if (this._compact) {
         this._compact(viewport, bb);
         bb = dojo.position(node, true);
      }

      if (bb.w == 0 || bb.h == 0)
         return;

       if(!dojo.hasClass(dojo.body(),"dojoMove")){
           var top;
           if (window.ui && window.ui._check_ui_enabled()) {
              top = Math.floor((viewport.h - bb.h) / 3);
           } else {
              top = Math.floor((viewport.h - bb.h) / 2);
           }
           var posForCentered = {
               l: Math.floor((viewport.w - bb.w) / 2),
               t: top
           };

          if (!this._relativePosition) {
             // Undefined this._relativePosition indicates that dialog should get its default position
             // --> centered, if possible, otherwise at top-left (top-right in RTL).
             // By adjusting <bb> to top-left (top-right in RTL) of viewport this position is applied, when centered is not possible.
             bb.y = viewport.t;
             bb.x = (dojo._isBodyLtr() ? viewport.l : viewport.l + (viewport.w - bb.w));
          }
          if (dojo.version.minor >= 9){
             var sizeTolerance = 2; // half of the amount of which the dialog is allowed to be larger than viewport for centering
             // center dialog, if no relative position is given and centered is possible
             var leftPos = (!this._relativePosition && posForCentered.l >= -sizeTolerance) ? posForCentered.l : (bb.x - viewport.l);
             var topPos = (!this._relativePosition && posForCentered.t >= -sizeTolerance) ? posForCentered.t : (bb.y - viewport.t);
             if (dojo._isBodyLtr()) {
                // in LTR - do not allow to move dialog out-of-side on the left
                if (leftPos + viewport.l < 0)
                   leftPos = 0;
             }
             else {
                // in RTL - do not allow to move dialog out-of-side on the right
                if (leftPos + viewport.l > (viewport.w - bb.w))
                   leftPos = (viewport.w - bb.w);
             }
             // do not allow to move dialog out-of-side on the top
             if (topPos + viewport.t < 0)
                topPos = 0;

             this._relativePosition = {x: leftPos, y: topPos};
          }
          else
             this._relativePosition = {
                x: posForCentered.l >= 0 ? posForCentered.l : bb.x - viewport.l,
                y: posForCentered.t >= 0 ? posForCentered.t : bb.y - viewport.t
             };
       }

       this.inherited("_position", arguments);
   },
   
   _compact: function(viewport, md) {
      var el = dojo.query("div.lotusDialogContent", this.domNode)[0];
      if (el) {
         var div;
         if (!dojo.hasClass(el, "_qkrDialogCompact")) {
            div = document.createElement("div");
            el.parentNode.insertBefore(div, el);
            el.parentNode.removeChild(el);
            div.appendChild(el);
            dojo.addClass(el, "_qkrDialogCompact");
         }
         else
            div = el.parentNode;

         var ms = dojo.marginBox(div);
         var mc = dojo.marginBox(el);
         
         // Don't auto-resize if the DOM can't give us size info
         if(ms.h == 0 || md.h == 0)
            return;
         
         var hOther = md.h - ms.h;
         var border = dojo.query("div.lotusDialogBorder", this.domNode)[0];
         if (border && el.firstChild) {
            var dialogWidth = dojo.marginBox(border).w;

            // Get the outer padding

            // Save the border padding, since we can't calculate it accurately with a very narrow browser window
            // Limit border padding to 20px, just in case the initially calculated value is incorrect and very large
            var borderPadding = this.savedBorderPadding;
            if (!borderPadding)
               this.savedBorderPadding = borderPadding = Math.min(20, dialogWidth - dojo.marginBox(div).w);

            var contentPadding = this.savedContentPadding;
            if (!contentPadding)
               this.savedContentPadding = contentPadding = dialogWidth - borderPadding - dojo.contentBox(el).w;

            // Get our content's preferred width
            var childIndex = 0;
            var preferredWidth = 0;
            while (el.childNodes[childIndex])
               preferredWidth = Math.max(preferredWidth, dojo.marginBox(el.childNodes[childIndex++]).w);

            // Don't auto-resize if the DOM can't give us size info
            if(dialogWidth == 0 || preferredWidth == 0)
               return;
            
            // Calculate the actual width
            var newDialogWidth = preferredWidth + contentPadding + borderPadding;

            if (dialogWidth < newDialogWidth) {
               dojo.marginBox(div, {w: newDialogWidth - borderPadding});
               dojo.marginBox(border, {w: newDialogWidth});
               dojo.marginBox(this.domNode, {w: newDialogWidth});
            }
         }
      }
   },
   
   isScrolling: function() {
      return !!dojo.query(".qkrDialogScrolledY", this.domNode)[0];
   }

});
