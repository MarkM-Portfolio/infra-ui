/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./EntryWidget",
  "dojo/_base/array",
  "dojo/dom-construct",
  "dojo/i18n!../nls/FileViewerStrings",
  "../config/globals",
  "../util/html"
], function (declare, EntryWidget, array, domConstruct, i18n, globals, html) {
  return declare([ EntryWidget ], {
    postMixInProperties: function () {
      this.nls = i18n.SHARE_LINK;
      this.baseClass = "shareLink";
      this.baseClasses = "";
      
      this.usernameMaxWidth = 230;
    },
    
    postCreate: function () {
      if (this.entry.get("id") === globals.currentUser.id) {
        html.appendText(this.h1Node, this.nls.MY_SHARES);
      } else {
        this.setUserName(this.entry, this.h1Node);
      }
      
      var list = domConstruct.create("ul", {});
      array.forEach(this.entry.get("targets"), function (target) {
        var listItem = domConstruct.create("li", {className: "targetUser"}, list);
        this.setUserName(target, listItem);
      }, this);
      this.contentContainer.appendChild(list);
    }
  });
});
