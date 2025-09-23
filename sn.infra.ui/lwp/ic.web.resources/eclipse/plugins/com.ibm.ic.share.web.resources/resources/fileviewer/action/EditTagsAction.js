/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./Action",
  "../util/fidoNewRelic"
], function (declare, Action, fidoNewRelic) {
  "use strict";

  var EditTagsAction = declare([Action], {
    onLinkClicked: function () {
      this.widget.contentWidget.toggleEditing();
      fidoNewRelic.track("editTags");
    }
  });

  return {
    create: function (args) {
      return new EditTagsAction(args);
    },

    isValid: function (file) {
      return file.get("fullEntry").then(function () {
        return file.get("permissions").canTag();
      });
    },

    getClassName: function () {
      return "";
    }
  };
});
