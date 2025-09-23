/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./ToggleAction",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/string",
   "dojo/dom-class",
   "../config/globals",
   "dojo/_base/lang",
   "dojo/Deferred",
   "dojo/aspect",
   "../util/fidoNewRelic",
   "dojo/has"
  ], function (declare, ToggleAction, i18n, string, domClass, globals, lang, Deferred, aspect, fidoNewRelic, has) {
   "use strict";

   var LikeAction = declare([ToggleAction], {
      postMixInProperties: function () {
        this.nls = i18n.ACTION.LIKE;
        this.title = this.a11y = "";
        
        this.hide();
      },
      
      postCreate: function () {
        this.file.bean.get("fullEntry").then(lang.hitch(this, this.render));
      },
      
      render: function () {
        this.show();
        
        this.isLiked = !!this.file.bean.get("recommendationUrl");
        this.updateButton();
        
        this._makeToggleButton();
      },

      onLinkClicked: function () {
         if (this.isLiked) {
           this.file.bean.unlike().then(lang.hitch(this, this.setLikeStatus));
         } else {
           this.file.bean.like().then(lang.hitch(this, this.setLikeStatus));
         }
         fidoNewRelic.track("toggleLike", {"likeStatus": this.isLiked});
      },
      setLikeStatus: function(){
        this.isLiked = !this.isLiked;
        var likes = parseInt(this.file.bean.get("recommendations"));
        likes += this.isLiked ? 1 : -1;
        this.file.bean.set("recommendations", likes, false);
        this.updateButton();
      },
      
      updateButton: function () {
        if(this.isLiked) {
          domClass.replace(this.domNode, "checked",  "unchecked");
          this.title = string.substitute(this.nls.UNLIKE, [this.file.bean.name]);
          this.a11y = this.nls.UNLIKE_A11Y;
        } else {
          domClass.replace(this.domNode, "unchecked",  "checked");
          this.title = string.substitute(this.nls.LIKE, [this.file.bean.name]);
          this.a11y = this.nls.LIKE_A11Y;
        }
        
        this._setTitle(this.title);
        this.describedBy.innerHTML = this.a11y;
      }
   });

   return {
     isSticky: true,

      create: function (args) {
        return new LikeAction(args);
      },

      isValid: function (file, args) {
         if(globals.isAuthenticated && (globals.isPanels(file)))
          return true;
         else
           return false;
      },

      getClassName: function (args) {
        if (has("hikari-default-theme") && !has("ui-heart-like-hikari")) {
          return "ics-viewer-action-like-smiley";
        }
        return "ics-viewer-action-like";
      }
   };
});
