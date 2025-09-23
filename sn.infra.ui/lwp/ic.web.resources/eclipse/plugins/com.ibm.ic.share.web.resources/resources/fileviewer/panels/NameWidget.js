/* Copyright IBM Corp. 2015, 2016  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./EntryWidget",
  "dojo/i18n!../nls/FileViewerStrings",
  "../util/DateFormat",
  "dojo/dom-style",
  "dojo/_base/lang",
  "../config/globals"
], function (declare, EntryWidget, i18n, DateFormat, domStyle, lang, globals) {

  return declare([ EntryWidget ], {
    postMixInProperties: function () {
       
      var pictureUrl = this.getPictureUrl();
      this.baseClasses = "name";
      this.reloadItem = true;

      this.type = this.entry.get("type");
      this.iconSource = (pictureUrl + this.entry.get("id")) || "";

      this.h1 = "";
      this.h2 = "";
      this.h3 = "";
      this.content = "";
      this.footer = "";
      this.versionsNls = i18n.PANEL.COMMENTS;
      
      this.usernameMaxWidth = 215;
    },
    
    postCreate: function () {
      this.inherited(arguments);
      this.setUserName(this.entry, this.h1Node);
      if (this.showDownloadInfo) {
         this.setDownloadVersion(this.entry, this.h2Node);
      }
      if (lang.isFunction(globals.createPersonPhotoLink)) {
        var personPhotoLink = globals.createPersonPhotoLink(this.entry);
        if (personPhotoLink) {
          this.set("iconSource", personPhotoLink.firstChild.src);
        }
        domStyle.set(this.iconLinkNode, "display", "none");
        this.iconNodeContainer.appendChild(personPhotoLink);
      }
    },
    
    setDownloadVersion: function(user, parent) {
       var versionNumber = user.versionNumber;
       var dateObject = dojo.date.stamp.fromISOString(user.time);
       var dateFormatter = new DateFormat(dateObject);
       var downloadTime = dateFormatter.formatByAge(i18n.DATE.VERY_SHORT);
       var longDownloadTime = dateFormatter.formatByAge(i18n.DATE.LONG);
       parent.innerHTML = dojo.string.substitute(this.versionsNls.VERSION, [versionNumber]) + " - " + downloadTime;
       parent.title = longDownloadTime;
    }
  });
});
