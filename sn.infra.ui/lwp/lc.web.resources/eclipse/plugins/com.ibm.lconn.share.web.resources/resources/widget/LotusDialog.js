/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited. 2010, 2022               */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('lconn.share.widget.LotusDialog');

dojo.require('dijit.Dialog');

dojo.declare('lconn.share.widget.LotusDialog', [dijit.Dialog], {

   title: "",
   titleImageSrc: "",
   contentClass: "lotusDialogContent",
   formMethod: "post",
   multipart: false,
   formEnabled: true,
   _relativePosition: null,

   /*
    * public variables for shrinking dailog
    */
   wDialog: "",

   /*
    * private variables for shrinking dialog
    */
   _resizeDialog: false,
   _dialogHorizontallyShrunk: false,
   _dialogVerticallyShrunk: false,

   attributeMap: dojo.mixin(dojo.clone(dijit.Dialog.prototype.attributeMap), {
      contentClass: {node: "containerNode", type: "class"}
   }),

   templateString: null,
   templatePath: dojo.moduleUrl("lconn.share", "widget/templates/LotusDialog.html"),

   show: function() {
      dojo.publish("lconn/share/scene/modal-dialog/shown", [this]);

      if (this._resizeDialog) {
         dojo.style(this.dialogBodyNode, "overflow", "hidden");
         if (dojo.isFunction(this.resize)) {
            dojo.connect(this, "resize", dojo.hitch(this, this._onDialogResize));
         }
         if (dojo.isFunction(this.layout)) { // for dojo version 1.5 (WebChat)
            dojo.connect(this, "layout", dojo.hitch(this, this._onDialogResize));
         }
      }

      return this.inherited(arguments);
   },

   postMixInProperties: function() {
      var buttonOk = this.buttonOk;
      var buttonOkTitle = this.buttonOkTitle || "";
      var buttonCancel = this.buttonCancel;
      this.inherited(arguments);
      this.buttonOk = buttonOk || this.buttonOk;
      this.buttonOkTitle = buttonOkTitle || this.buttonOkTitle;
      this.buttonCancel = buttonCancel || this.buttonCancel;
      this.buttonClose = this.buttonClose || this.buttonCancel;
   },

   postCreate: function() {
      this.inherited(arguments);

      if(this.multipart && this.formNode) {
         this.formNode.method = "POST";
         dojo.attr(this.formNode, "enctype", "multipart/form-data");
         dojo.attr(this.formNode, "encoding", "multipart/form-data");
      }

      if(this.draggable && this.titleBar)
         this.titleBar.style.cursor = "move";

      if(this.titleTooltip)
         dojo.attr(this.titleBar, "title", this.titleTooltip);

      if (this.resizeDialog) {
         this._resizeDialog = this.resizeDialog;
      }
      
      if(window.ui && window.ui._check_ui_enabled()){
    	  dojo.style(this.footerBar, "display", "flex");
    	  dojo.style(this.footerBar, "flex-flow", "row-reverse");
      }
   },

   _setup: function() {
      this.inherited(arguments);
      if (this.zIndex > 0) {
         this._underlay.domNode.style.zIndex = this.zIndex;
         this.domNode.style.zIndex = this.zIndex + 1;
      }
      if (this._moveable) {
         // Prevent dragging the close icon
         var onDragDetected = this._moveable.onDragDetected;
         this._moveable.onDragDetected = function(/* Event */ e){
            var target = e.target;
            while (target && target.nodeName.toLowerCase() != "a")
               target = target.parentNode;
            if (target && target.nodeName.toLowerCase() == "a" && dojo.hasClass(target, "lotusClose"))
               return false;

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

   _onSubmit: function(e) {
      dojo.stopEvent(e);
      if(this.formEnabled)
         this.inherited(arguments);
   },
   
   setSubmitButtonEnabled: function(enabled) {
      this.formEnabled = enabled;
      dojo[enabled ? "removeClass":"addClass"].apply(dojo, [this.submitButtonNode, "lotusBtnDisabled"]);
      if(dijit.setWaiState)
         dijit.setWaiState(this.submitButtonNode,"disabled",!enabled);
      if(dojo.hasClass(dojo.body(), "dijit_a11y"))
         if(dojo.isIE)
            this.submitButtonNode.style.filter = enabled ? "" : "alpha(opacity=33)";
         else
            this.submitButtonNode.style.opacity = enabled ? "1":".5";
      
      if(enabled)
         dojo.removeAttr(this.submitButtonNode, "disabled");
      else
         dojo.attr(this.submitButtonNode, "disabled", "");
   },
   
   keepOpen: function() {
      this._keepOpen = true;
   },
   
   hide: function() {
      if(this._keepOpen && !this.startUpload) {
         delete this["_keepOpen"];
         return;
      }
      
      if(!this._keepOpen) {
         dojo.publish("lconn/share/scene/modal-dialog/closed", [this]);
         return this.inherited(arguments);
      }
   },
   
   uploadStatus: function(startUpload) {
      this.startUpload = startUpload; 
   },

   _getFocusItems:function() {
      this.containerNode = this.formNode;
      this.inherited(arguments);
    },

    _updatePositionAfterSizeChange: function() {
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

    _position: function() {
       // get dialog position and size
       var node = this.domNode;
       var viewport = dijit.getViewport();
       var bb = dojo.position(node, true);

       if (bb.w == 0 || bb.h == 0)
          return;

       if(!dojo.hasClass(dojo.body(),"dojoMove")){
          var posForCentered = {
                l: Math.floor((viewport.w - bb.w) / 2),
                t: Math.floor((viewport.h - bb.h) / 2)
          };
          if (!this._relativePosition) {
             // Undefined this._relativePosition indicates that dialog should get its default position
             // --> centered, if possible, otherwise at top-left
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
          else {
             this._relativePosition = {
                x: posForCentered.l >= 0 ? posForCentered.l : bb.x - viewport.l,
                y: posForCentered.t >= 0 ? posForCentered.t : bb.y - viewport.t
             };
          }
       }

       this.inherited("_position", arguments);
    },

    _onDialogResize: function() {
       if ( !this.dialogBorder ) {
          return;
       }

       var dialogBoxBeforeResize = dojo.position(this.domNode, true);

       if ( this._dialogHorizontallyShrunk ) {
          dojo.style(this.dialogBorder, "width", this.wDialog);
          dojo.style(this.dialogBodyNode, "width", "");
          dojo.style(this.dialogBodyNode, "overflow-x", "hidden");
          this._dialogHorizontallyShrunk = false;
       }
       if ( this._dialogVerticallyShrunk ) {
          dojo.style(this.dialogBorder, "height", "");
          dojo.style(this.dialogBodyNode, "height", "");
          dojo.style(this.dialogBodyNode, "overflow-y", "hidden");
          this._dialogVerticallyShrunk = false;
       }

       var dialogBox = dojo.position(this.domNode, true);
       var viewport = dijit.getViewport();

       if ( dialogBox.w > viewport.w ) { 
          dojo.style(this.dialogBorder, "width", viewport.w+"px");
          dojo.style(this.dialogBodyNode, "width", viewport.w+"px");
          dojo.style(this.dialogBodyNode, "overflow-x", "scroll");
          this._dialogHorizontallyShrunk = true;
       }

       if ( dialogBox.h > viewport.h ) {
          dojo.style(this.dialogBorder, "height", viewport.h+"px");
          var dialogContentHeight = viewport.h
                                    - dojo.position(this.titleBar, true).h
                                    - dojo.position(this.footerBar, true).h;
          dojo.style(this.dialogBodyNode, "height", dialogContentHeight+"px");
          dojo.style(this.dialogBodyNode, "overflow-y", "scroll");
          this._dialogVerticallyShrunk = true;
       }

       var dialogBoxAfterResize = dojo.position(this.domNode, true);
       // update position of dialog height or width has been changed
       if ( dialogBoxBeforeResize.w != dialogBoxAfterResize.w
            || dialogBoxBeforeResize.h != dialogBoxAfterResize.h ) {
          this._updatePositionAfterSizeChange();
       }
    }
});
