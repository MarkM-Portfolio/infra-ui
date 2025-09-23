/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/welcomeBox.html",
   "dojo/aspect",
   "dojo/i18n!./nls/FileViewerStrings",
   "dojo/dom-construct",
   "dojo/has",
   "ic-ui/MessageBox",
   "dojo/dom-class",
   "./config/globals",
   "dojo/dom-attr",
   "dijit/registry"
], function (declare, _WidgetBase, _TemplatedMixin, template, aspect, strings, domConstruct, has, MessageBox, domClass, globals, domAttr, registry) {
   "use strict";

   var WelcomeMessageWidget,
      LOCAL_STORAGE_KEY = "ic.fileviewer.hideWelcome";

   function getLine(index) {
      return strings.WELCOME.LINES["LINE_" + index];
   }

   WelcomeMessageWidget = declare([ _WidgetBase, _TemplatedMixin ], {
      templateString: template,

      postMixInProperties: function () {
         this.nls = {
            title: strings.WELCOME.TITLE,
            subtitle: strings.WELCOME.SUBTITLE
         };
      },

      postCreate: function () {
         var titleId = registry.getUniqueId("fileviewer") + "_titleContent";
         var subtitleId = registry.getUniqueId("fileviewer") + "_welcomeContent";
         domAttr.set(this.titleContainer, "id", titleId);
         domAttr.set(this.subtitleContainer, "id", subtitleId);

         var counter = 1,
            line;

         line = getLine(counter);

         while (line) {
            domConstruct.create("li", {
               innerHTML: line
            }, this.lineContainer);

            counter += 1;
            line = getLine(counter);
         }
      }
   });

   function showMessage(file) {
      if (globals.isCCM(file)) {
         return false;
      }
      return window.localStorage && !window.localStorage.getItem(LOCAL_STORAGE_KEY) && has("fileviewer-welcome");
   }

   function buildMessage() {
      var widget = new WelcomeMessageWidget();
      return widget.domNode;
   }

   function onClose() {
      domClass.remove(document.body, "ics-viewer-welcome-showing");

      if (!window.localStorage) {
         return;
      }

      window.localStorage.setItem(LOCAL_STORAGE_KEY, "true");
   }

   function render(parent) {
      var message = new MessageBox({
         canClose: true,
         _strings: {
            icon_alt: "",
            a11y_label: "",
            close_btn_title: strings.ACTION.CLOSE.TOOLTIP,
            close_btn_alt: strings.ACTION.CLOSE.TOOLTIP
         },
         type: "welcome",
         msg: buildMessage()
      }, parent);
      
      domAttr.set(message.domNode, "role", "alertdialog");
      var subtitleTextId = message.msgBody.querySelector(".subtitle-text").id;
      var titleTextId = message.msgBody.querySelector(".title-text").id;
      domAttr.set(message.domNode, "aria-labelledby", titleTextId);
      domAttr.set(message.domNode, "aria-describedby", subtitleTextId);
      aspect.after(message, "onClose", onClose);
      domClass.add(document.body, "ics-viewer-welcome-showing");
   }

   function execute(parent, file) {
      if (!showMessage(file)) {
         return;
      }

      render(parent);
   }

   return {
      execute: execute
   };
});