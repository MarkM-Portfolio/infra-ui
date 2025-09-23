/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.action.DialogAction");
dojo.require("lconn.share.widget.PreviewDialog");
dojo.require("lconn.share.action.Action");
dojo.requireLocalization("lconn.share","PreviewString");

// Developer Note:
// Most methods on this object are publicly documented. Do not modify this object without updating the 
// documentation if necessary and ensuring changes are backwards compatible.
dojo.declare("lconn.share.action.DialogAction", [lconn.share.action.Action], {
   constructor: function(items,app) {
      this.nls = dojo.i18n.getLocalization("lconn.share","PreviewString");
      this.listeners = [];
      this.isLtr = dojo._isBodyLtr();
      if(!app){
         this.app = {
            nls: dojo.i18n.getLocalization("lconn.files", "community")
         }
      } else {
         this.app = app;
      }
   },
   preExecute: function( item, opt, e, callback) {
      callback( item, opt, e);
   },
   execute: function(item, opt, e) {
      if(e) dojo.stopEvent(e);
      if (this.scene)
         this.scene.clearMessages();
     
      this.preExecute(item, opt, e, dojo.hitch(this, this.finishExecute));
   },
   finishExecute: function( item, opt, e) {
      var dialog = this.dialog;
      if (!dialog) {
         var d = dojo.doc;
         var div = dojo.create("DIV", null, d.body);
         var className = "lotusui qkrDialog";
         if (this.iw && this.iw.wEnvSprt && this.iw.wEnvSprt.mumTheme)
            className += " qkrMumTheme";
         if(dojo.isIE && dojo.isIE < 8)
            className += (dojo.isIE < 7) ? " lotusui_ie lotusui_ie6" : " lotusui_ie lotusui_ie7";
         if(dojo.isFF && (dojo.isFF < 3))
            className += " lotus_ff2";
         var bodyElem = d.getElementsByTagName("body")[0];
         if (dojo.hasClass(bodyElem, "dijit_a11y")) {            
            className += " lotusImagesOff";
         }
         var dialog = new lconn.share.widget.PreviewDialog({
        	 "class": className, 
        	 duration: 100,
        	 _position: function(){
                 var node = this.domNode,
                 	viewport = dijit.getViewport(),
                 	bb = dojo.position(node, true), 
                 	l = (viewport.w - bb.w) / 2,
                 	t = (viewport.h - bb.h) / 2
                 	;
				   
                 if (!this._relativePosition) {
					// Normalize position. The difference between dojo.position() and dojo._getBorderBox() is Y coordiate. 
					// When dialog is not displayed, dojo.position() returns the absolate offset of dom node, while dojo._getBorderBox() returns 0. 
					// If this._relativePosition is undifined, it is the fisrt time to show the dialog. Set its y to 0 in this case. 
					bb.y = 0;
                 }
				
                 this._relativePosition = {l: l >= 0 ? l : bb.l-viewport.l, t: t >=0 ? t : bb.y-viewport.t};
  				 this.inherited("_position", arguments);
        	 }
        }, div);
            dialog.domNode.setAttribute("aria-label", this.nls.DIALOG_TITLE);
         
         this.dialog = dialog;
         if(this.createDialog)
            this.createDialog(item, opt, dialog);
         dojo.addClass(this.dialog.containerNode, "qkrDialog");
         
      }
      else if(this.updateDialog)
         this.updateDialog(item, opt, dialog);

      var nodes = dialog.domNode.childNodes;
      for(var i = 0; i < nodes.length; i++) {
         var node = nodes[i];
         if(node.className == "dijitDialogTitleBar") {
            node.style.display="none";
         }
         if(node.className == "dijitDialogPaneContent") {
            node.style.padding = "0";
            node.style.borderWidth = "0px";
            node.style.marginTop = "0px";
         }
      }
      dialog.domNode.style.padding = "0px";
      dialog.show();
      //since we can't hack the dijit.Dialog code, timeout longer than the current timout in dijit.Dialog which is 50
      setTimeout(dojo.hitch(dialog, function(){
         this.focus();
      }), 200);
      this.onDialogExecute();
   },
   /* Used only for listeners to connect to since we cannot connect to the execute function from DocMain for some reason */
   onDialogExecute: function(e) { },
   cancelDialog: function(e) {
      if (e) dojo.stopEvent(e);
      var d = this.dialog;
      if (d) {
         this.skipCancelCleanupWork = true;
         d.onCancel();
         if (this.alwaysRecreate) {
            d.cancel();
            d.hide();
         }
         this.skipCancelCleanupWork = false;
         this.cleanupCancel();
      }
   },
   
   /** Subclasses may override to perform cleanup when the dialog is closed and listeners may connect to this */
   onDialogCancel: function(dontDestroy) {
      if (dontDestroy !== true)
         this.cleanupCancel();
   },
   cleanupCancel: function() {
      var d = this.dialog;      
      if(d && this.alwaysRecreate && !this.skipCancelCleanupWork)
         this.destroy();
      if(!this.skipCancelCleanupWork)
         this.onDialogCancelComplete();
   },
   
   onDialogCancelComplete: function() {},
   
   destroy: function() {
      this.title = null;
      this.inherited(arguments);
      if (this.dialog) {
         var d = this.dialog;
         this.cleanupDialog(d);       
      }      
   },
   
   cleanupDialog: function(d) {
      dojo.forEach(dojo.query(".qkrHelpIcon", d.domNode), function(icon) {
         var widget = dijit.byId(icon.id);
         widget.destroy();
      });
      d.destroyRecursive();
      if (this.moveable) {
         this.moveable.destroy();
         this.moveable = null;
      }
      this.dialog = null;    
   },
   
   enableInput: function(dialog) {this.toggleInput(dialog,true);},
   disableInput: function(dialog, hideProgressNode) {this.toggleInput(dialog, false, hideProgressNode);},
   toggleInput: function(dialog,enabled,hideProgressNode) {
      dialog = dialog || this.dialog;
      dojo.forEach(dojo.query("INPUT",dialog.domNode),function(el) {
         if (el.type != "file" && el.type != "hidden") {
            el.disabled = !enabled;
            if(el.type == "submit")
               enabled ? dojo.removeClass(el, "lotusBtnDisabled"): dojo.addClass(el, "lotusBtnDisabled");
         }
      });
      dojo.forEach(dojo.query("TEXTAREA",dialog.domNode),function(el) {el.disabled = !enabled;});
      dojo.forEach(dojo.query("BUTTON",dialog.domNode),function(el) {
     	 if(!dojo.hasClass(el, "qkrCancelBtn")) {
            el.disabled = !enabled;
            enabled ? dojo.removeClass(el, "lotusBtnDisabled"): dojo.addClass(el, "lotusBtnDisabled");
     	 }
      });
      if (dialog.progressNode)
         dialog.progressNode.style.display = (!enabled && !hideProgressNode) ? "" : "none";
   },

   enableSubmitInput: function(dialog) {
      this.toggleSubmitInput(dialog, true);
   },
   disableSubmitInput: function(dialog) {
      this.toggleSubmitInput(dialog, false);
   },
   toggleSubmitInput: function(dialog, enabled) {
      dojo.query("input[type='submit']", (dialog || this.dialog).domNode).forEach(function(el){
         if (el.type != "file" && el.type != "hidden") {
            el.disabled = !enabled;
            if(el.type == "submit")
               enabled ? dojo.removeClass(el, "lotusBtnDisabled"): dojo.addClass(el, "lotusBtnDisabled");
         }
      });
   },
   
   resize: function() {
      if (this.dialog)
         this.dialog._position();
   },
   
   complete: function(response, ioArgs) {
      if (response instanceof Error)
         this.onerror("unknown");
      else
         this.onsuccess();
   },
   onsuccess: function() {this.cancelDialog();},
   createHeader: function(el, title, moveable) {
      var d = dojo.doc;
      dojo.addClass(el, "lotusDraggable");
      var h1 = dojo.create("h1", {className: "lotusHeading"}, el);
         var span = this.title = dojo.create("span", null, h1);
            span.appendChild(d.createTextNode(title));
         
      var closeId = this.closeId = dijit.getUniqueId("share_action_dialogclose");
      var label = dojo.create("label", {'for': this.dialog.id, 'class': 'lotusOffScreen'}, el);
         label.appendChild(d.createTextNode("X"));
      var a = dojo.create("a", {href: "javascript:;", role: "button", className: "lotusDialogClose", id: closeId, title: this.nls.CANCEL}, el);
         a.style.lineHeight = "16px";
         dojo.connect(a, "onclick", this, "cancelDialog");
         var img = dojo.create("img", {alt: "", src: dijit._Widget.prototype._blankGif}, a);
         var closeSpan = dojo.create("span", {className: "lotusAltText"}, a);
            closeSpan.appendChild(d.createTextNode("X"));
      
      if(moveable) {
         this.moveable = (dojo.isIE == 6) ?
            new dojo.dnd.TimedMoveable(this.dialog.domNode, { handle: el }) :
            new dojo.dnd.Moveable(this.dialog.domNode, { handle: el, timeout: 0 });
      }
   },
   validateAndFocus: function(field, e) {
      if(e) dojo.stopEvent(e);
      var valid = true;
      if(typeof this[field] == "function")
         valid = this[field]();
      if(!valid) {   
         var firstErr = dojo.query(".lotusFormErrorField", this.dialog.domNode)[0];
         setTimeout(function(){dijit.focus(firstErr);}, 10); //TODO hack to get focus to work right w/ onchange
      }
      return valid;
   },  
   resourcesUrl: function() {
      var blankIcon = dijit._Widget.prototype._blankGif;
      var resourcesPath = blankIcon.substring(0,blankIcon.indexOf("blank.gif"));
      return resourcesPath;
   }
});
