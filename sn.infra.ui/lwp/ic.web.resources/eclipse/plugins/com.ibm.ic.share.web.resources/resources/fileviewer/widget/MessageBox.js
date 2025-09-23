/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/MessageBox.html",
   "dojo/dom-class",
   "dojo/dom-style",
   "dojo/dom-construct",
   "dojo/_base/config",
   "dojo/_base/lang",
   "ic-ui/MessageBox",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/aspect",
   "dijit/focus"
], function (declare, _WidgetBase, _TemplatedMixin, template, domClass, domStyle, domConstruct, config, lang, MessageBox, i18n,
    aspect, focusUtil) {
   
   var VerseMessageBox = declare([_WidgetBase, _TemplatedMixin], {
     templateString: template,

     postMixInProperties: function () {
       this.blank = config.blankGif || dijit._WidgetBase.prototype._blankGif;
     },
     
     postCreate: function () {
       domClass.add(this.icon, this.type);
       if (!this.cancelable) {
         domStyle.set(this.closeBtn, "display", "none");
       }
       this._hide();
       
       if (this.message) {
         this.setMessage(this.message);
       }
     },
     
     setMessage: function (node) {
       this.removeMessage();
       
       if (node === "") {
         return;
       }
       
       if (lang.isString(node)) {
         var message = node;
         node = domConstruct.create("div");
         node.appendChild(document.createTextNode(message));
       }
       
       this.messageNode.appendChild(node);
       this._show();
     },
     
     removeMessage: function () {
       this._hide();
       domConstruct.empty(this.messageNode);
     },
     
     _hide: function () {
       domClass.add(this.domNode, "lotusHidden");
     },
     
     _show: function () {
       domClass.remove(this.domNode, "lotusHidden");
     },
     
     _close: function () {
       this.destroy();
     }
   });

   return {
      create: function (args) {
         var msgStatusValues={'success': MessageBox.TYPE.SUCCESS, 'warning': MessageBox.TYPE.WARNING, 'info': MessageBox.TYPE.INFO, 'error': MessageBox.TYPE.ERROR};
         var msgType = msgStatusValues[args.type];
         var msgNode = domConstruct.create("div");

         var message = new MessageBox({
            canClose: args.cancelable,
             _strings: {
                icon_alt: "",
                a11y_label: "",
                close_btn_title: i18n.ACTION.CLOSE.TOOLTIP,
                close_btn_alt: i18n.ACTION.CLOSE.TOOLTIP
             },
             type: msgType,
             msg: args.message,
             messageOptions: args,
             isSticky: args.isSticky,
             focusPostClose: args.focusPostClose || this.firstFocusable
          }, msgNode);
         
         message.msgBody.style.color = "#222";
         message._hide = function(){domClass.add(this.domNode, "lotusHidden");};
         message._show = function(){domClass.remove(this.domNode, "lotusHidden");};
         message.removeMessage = function(){
            this._hide();
            domConstruct.empty(this.msgBody);
         };
         message.setMessage = function(node) {
            this.removeMessage();
            
            if (node === "") {
              return;
            }
            
            if (lang.isString(node)) {
              var messageText = node;
              node = domConstruct.create("div");
              node.appendChild(document.createTextNode(messageText));
            }
            
            this.msgBody.appendChild(node);
            this._show();
         };
         
         aspect.after(message, "startup", function () {
           if (args.focus) {
             focusUtil.focus(message.closeBtn);
           }
         });
         
         return message;
      }
   };
});
