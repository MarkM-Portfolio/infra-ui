/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('com.ibm.social.ee.widget.Dialog');
dojo.require("dijit.Dialog");

dojo.declare("com.ibm.social.ee.widget.Dialog", [dijit.Dialog], {

   // initialFocusNode: DomNode
   //		A pointer to the node which should receive focus when the dialog is
   //		shown. If null, focus defaults to the first focusable node in the dialog.
   initialFocusNode: null,
   hPad: 20,

   setContent: function(domNode) {
      this.inherited(arguments);
   },
   
   isOpen: function() {
      return this.open;
   },
   
   // Override to add initialFocusNode support
   show: function() {
      var autofocus = this.autofocus;
      this.autofocus = false;
      
      this.inherited(arguments);
      
      this.autofocus = autofocus;
      if(this.autofocus){
         // find focusable Items each time dialog is shown since if dialog contains a widget the 
         // first focusable items can change
         this._getFocusItems(this.domNode);
	
         // set timeout to allow the browser to render dialog
         setTimeout(dojo.hitch(dijit,"focus",this.initialFocusNode || this._firstFocusItem), 50);
      }
   },

   // Override to add initialFocusNode support
   onOpen: function(/*Object*/ pos){
      // summary: called when dialog is displayed

      this.orient(this.domNode,pos.aroundCorner, pos.corner);
      this._loadCheck(); // lazy load trigger
	
      if(this.autofocus){
         this._getFocusItems(this.containerNode);
         dijit.focus(this.initialFocusNode || this._firstFocusItem);
      }
      if (this._moveable) {
         // Prevent dragging the close icon
         var onDragDetected = this._moveable.onDragDetected;
         this._moveable.onDragDetected = function(/* Event */ e){
            var target = e.target;
            while (target && target.nodeName != "A")
               target = target.parentNode;
            if (target && target.nodeName == "A" && dojo.hasClass(target, "lotusClose"))
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
   
   _setup: function() {
      this.inherited(arguments);
      if (this.zIndex > 0) {
         this._underlay.domNode.style.zIndex = this.zIndex;
         this.domNode.style.zIndex = this.zIndex + 1;
      }
   },

   _size: function() {
      // Make _size a no-op, since we have our own auto-scroll code
   },

   _position: function() {
      var viewport = dijit.getViewport();
      var mb = dojo.marginBox(this.domNode);
      if (this._compact) {
         this._compact(viewport, mb);
         mb = dojo.marginBox(this.domNode);
      }
      if(!dojo.hasClass(dojo.body(),"dojoMove")){
         var p = this._relativePosition;
         var left = Math.floor(viewport.l + (p ? p.l : (viewport.w - mb.w) / 2));
         var top = Math.floor(viewport.t + (p ? p.t : (viewport.h - mb.h) / 2));
         if(!p) {
            left = Math.max(left,0);
            top = Math.max(top,0);
         }
         dojo.style(this.domNode,{
            left: left + "px",
            top: top + "px"
         });
      }
   },
   
   _compact: function(viewport, md) {
      var el = dojo.query("div.lotusDialogContent", this.domNode)[0];
      if (el) {
         var div;
         el.style.width=""; //We pick up our size from the border, not the dialog content node, allowing a fixed size on the content messes things up         
         if (!dojo.hasClass(el, "_qkrDialogCompact")) {
            div = dojo.doc.createElement("div");
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
         if(ms.h === 0 || md.h === 0)
            return;
         
         var hOther = md.h - ms.h;
         var scrollingY = false;
         if ((hOther + mc.h) > (viewport.h - this.hPad))
            scrollingY = true;

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
            if (this.dontCheckChildWidth)
               preferredWidth = dojo.contentBox(el).w;
            else {
               while (el.childNodes[childIndex]) {
                  var child = el.childNodes[childIndex++];
                  var childWidth = dojo.marginBox(child).w;
                  if (child.tagName.toLowerCase() != "table") {
                     var tables = dojo.query("table", child);
                     for (var i = 0; i < tables.length; i++) {
                        childWidth = Math.max(childWidth, dojo.marginBox(tables[i]).w);
                     }
                  }
                  preferredWidth = Math.max(preferredWidth, childWidth);
               }
            }
            // Don't auto-resize if the DOM can't give us size info
            if(dialogWidth === 0 || preferredWidth === 0)
               return;
            
            // Calculate the actual width
            var newDialogWidth = preferredWidth + contentPadding + borderPadding;

            var previouslyScrolling = dojo.hasClass(div, "qkrDialogScrolledY");
            var scrollChanged = (previouslyScrolling && !scrollingY) || (!previouslyScrolling && scrollingY);
            if (scrollingY) {
               var newHeight = Math.max(viewport.h - this.hPad, 185);
               dojo.addClass(div, "qkrDialogScrolledY");
               dojo.marginBox(div, {h: newHeight - hOther});
               dojo.marginBox(this.domNode, {h: newHeight});
            }
            else {
               dojo.removeClass(div, "qkrDialogScrolledY");
               div.style.height = "";
               this.domNode.style.height = "";
            }


            if (dialogWidth < newDialogWidth) {
               dojo.marginBox(div, {w: newDialogWidth - borderPadding});
               dojo.marginBox(border, {w: newDialogWidth});
               dojo.marginBox(this.domNode, {w: newDialogWidth});
            }
         }
      }
   },
   
   _onKey: function (evt) {
      this.inherited(arguments);
		if(evt.keyCode === dojo.keys.BACKSPACE){
			var node = evt.target;
			var tag = node.tagName.toLowerCase();
			if (tag == "input") {
			   var type = node.type.toLowerCase();
			   if (type != "text" && type != "file")
              dojo.stopEvent(evt);
			}
			else if (tag != "textarea")
			   dojo.stopEvent(evt);
		}
   }
   
});