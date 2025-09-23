/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "./ToggleAction",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-class",
  "dojo/when",
  "../config/globals",
  "dojo/Deferred",
  "dojo/topic",
  "../util/fidoNewRelic"
], function (declare, lang, array, ToggleAction, i18n, domClass, when, globals, Deferred, topic, fidoNewRelic) {
  "use strict";

  var ToggleFavoriteAction = declare([ToggleAction], {
    
    postMixInProperties: function () {
      this.nls = i18n.ACTION.TOGGLE_FAVORITE || {};
      this.toggleStrings = {
        unchecked: {
          title: this.nls.FAVORITE_TOOLTIP,
          a11y: this.nls.FAVORITE_A11Y,
        },
        checked: {
          title: this.nls.STOP_FAVORITEING_TOOLTIP,
          a11y: this.nls.STOP_FAVORITEING_A11Y,
        }
      };
      this.hide();
    },
    
    postCreate: function () {
      this._isFavorited();
      this._makeToggleButton();
    },
    
    onLinkClicked: function () {
       if (this.get("checked")) {
         this.removeFavorite();
       } else {
         this.makeFavorite();
       }
       fidoNewRelic.track("toggleFavorite", {"favoriteStatus": this.get("checked")});
    },
    
    _isFavorited: function () {
       this.file.bean.get("favoritesFeed").fetch().then(lang.hitch(this, function (response) {
          var favoriteIndex = array.indexOf(response, this.file.bean.get("id"));
          this.set("checked", favoriteIndex > -1 ? true : false);
          this.show();
       }));
    },
    
    makeFavorite: function () {
       this.file.bean.get("favoritesFeed").createItem(this.file.bean).then(lang.hitch(this, function(response) {
          this._toggle();
          topic.publish("lconn/files/files/myfavorites/add", [this.file.bean.get('id')]);
          topic.publish("ic-fileviewer/dirty");
          topic.publish("ic-fileviewer/push/messages", {
             type: "success",
             message: this.nls.FAVORITE_SUCCESS,
             cancelable: true
           });
       }));
    },
    
    removeFavorite: function () {
       this.file.bean.get("favoritesFeed").deleteItem(this.file.bean).then(lang.hitch(this, function(response) {
          this._toggle();
          topic.publish("lconn/files/files/myfavorites/remove", [this.file.bean.get('id')]);
          topic.publish("ic-fileviewer/dirty");
          topic.publish("ic-fileviewer/push/messages", {
             type: "success",
             message: this.nls.STOP_FAVORITEING_SUCCESS,
             cancelable: true
           });
       }));
    }
  });

  return {
    isSticky: true,
    isSubItem: false,
    
    create: function (args) {
      return new ToggleFavoriteAction(args);
    },

    isValid: function (file) {
      if(globals.isAuthenticated && file.bean.get("libraryType") === "personalFiles" && (globals.isPanels(file)))
        return true;
      else
        return false;
    },

    getClassName: function () {
      return "ics-viewer-action-favorite";
    }
  };
});
