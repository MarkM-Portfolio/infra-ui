/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "./ToggleAction",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/text!./templates/CopyLinkAction.html",
   "dojo/topic"
  ], function (declare, lang, ToggleAction, i18n, template, topic) {
   "use strict";

   var CopyLinkAction = declare([ToggleAction], {
      templateString: template,
      postMixInProperties: function () {
        this.nls = i18n.SHARE_WITH_LINK;
        this.tooltips = {
           "PEOPLE_WITH_LINK": this.nls.COPY_LINK_ACTION_TOOLTIP_TYPE_1,
           "PEOPLE_IN_MY_ORG": this.nls.COPY_LINK_ACTION_TOOLTIP_TYPE_2
        };
      },
      
      postCreate: function () {
         this.copylink = this.link;
         this.input = document.createElement("input");
            this.input.style.position = "fixed";
            this.input.style.top = "-100px";
         this.domNode.appendChild(this.input);
         this.update(this.file.bean.get("shareLink"));
         topic.subscribe("ic-fileviewer/sharedLink/updated", lang.hitch(this, function(shareLink) {
             this.update(shareLink);
         }));
      },
      
      update: function(shareLink) {
         if(shareLink.url) {
            this.input.value = shareLink.url;
            this.copylink.title = this.tooltips[shareLink.type];
            this.show();
         } else {
            this.hide();
         }
      },

      onLinkClicked: function () {
         this.input.select();
         document.execCommand("copy");
         topic.publish("ic-fileviewer/push/messages", {message: this.nls.COPY_LINK_SUCCESS, type: "success"});
      }
   });

   return {
      isSticky: true,

      create: function (args) {
        return new CopyLinkAction(args);
      },

      isValid: function (file, args) {
         if(true || globals.isAuthenticated && (globals.isPanels(file)))
          return true;
         else
           return false;
      },

      getClassName: function (args) {
        return "ics-viewer-copy-shared-link";
      }
   };
});
