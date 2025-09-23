/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "./Bean",
  "../util/dom"
], function (declare, lang, array, Bean, dom) {
  "use strict";

  return declare([Bean], {
    _xmlSetter: function (xml) {
      this.xml = xml;
      
      var notificationElement = dom.getFirstTag(xml, "notifications", dom.NS.TD);
      var mediaNotifications = dom.getChildTextNS(xml, "media", dom.NS.TD, notificationElement);
      var commentNotifications = dom.getChildTextNS(xml, "comment", dom.NS.TD, notificationElement);
      this.set({
        id: dom.getChildTextNS(xml, "uuid", dom.NS.TD),
        name: dom.getChildTextNS(xml, "label", dom.NS.TD),
        size: parseInt(dom.getLinkAttrByRel(xml, "enclosure", "length")),
        totalSize: dom.getChildTextNS(xml, "totalMediaSize", dom.NS.TD),
        content: dom.getChildText(xml, "content"),
        summary: dom.getChildText(xml, "summary"),
        version: dom.getChildTextNS(xml, "versionLabel", dom.NS.TD),
        versionCount: dom.getChildTextNSScheme(xml, "rank", dom.NS.SNX, "versions"),
        commentCount: dom.getChildTextNSScheme(xml, "rank", dom.NS.SNX, "comment"),
        visibility: dom.getChildTextNS(xml, "visibility", dom.NS.TD),
        orgName: dom.getChildTextNS(xml, "orgName", dom.NS.SNX),
        author: dom.getUser(xml, "author"),
        modifier: dom.getUser(xml, "modifier", dom.NS.TD),
        dateCreated: dom.getChildDate(xml, "created"),
        dateModified: dom.getChildDate(xml, "modified"),
        canOthersShare: dom.getChildTextNS(xml, "propagation", dom.NS.TD) === "true",
        isEncrypted: dom.getChildTextNS(xml, "encrypt", dom.NS.SNX) === "true",
        isLocked: dom.getChildAttrNS(xml, "lock", dom.NS.TD, "type") !== "NONE",
        lock: this._getLock(xml),
        objectTypeId: dom.getChildTextNS(xml, "objectTypeId", dom.NS.TD),
        permissions: this._getPermissions(xml),
        tags: this._getTags(xml),
        entryUrl: dom.getLinkAttrByRel(xml, "self", "href"),
        alternateUrl: dom.getLinkAttrByRel(xml, "alternate", "href"),
        downloadUrl: dom.getLinkAttrByRel(xml, "enclosure", "href"),
        thumbnailUrl: dom.getLinkAttrByRel(xml, "thumbnail", "href"),
        recommendationUrl: dom.getLinkAttrByRel(xml, "recommendation", "href"),
        isExternal: dom.getChildTextNS(xml, "isExternal", dom.NS.SNX) === "true",
        libraryType: dom.getChildTextNS(xml, "libraryType", dom.NS.TD),
        libraryId: dom.getChildTextNS(xml, "libraryId", dom.NS.TD),
        libraryAuthor: dom.getUser(xml, "libraryAuthor", dom.NS.TD),
        libraryTitle: dom.getChildTextNS(xml, "libraryTitle", dom.NS.TD),
        recommendations: parseInt(dom.getChildTextNSScheme(xml, "rank", dom.NS.SNX, "recommendations")),
        downloads: dom.getChildTextNSScheme(xml, "rank", dom.NS.SNX, "hit"),
        downloadsAnonymous: dom.getChildTextNSScheme(xml, "rank", dom.NS.SNX, "anonymous_hit"),
        mediaNotifications: mediaNotifications ? mediaNotifications === "on" : undefined,
        commentNotifications: commentNotifications ? commentNotifications === "on" : undefined,
        isSyncable: dom.getChildTextNS(xml, "isSyncable", dom.NS.TD) === "true",
        isIndirectSyncable: dom.getChildTextNS(xml, "isIndirectSyncable", dom.NS.TD) === "true",
        currentUserDownloadInfo: this._getCurrentUserDownloadInfo(xml),
        mimeType: dom.getLinkAttrByRel(xml, "enclosure", "type") || this.get("mimeType"),
        reportUrl: dom.getLinkAttrByRel(xml, dom.NS.REPORT.LONG, "href"),
        status: dom.getChildAttributeNSScheme(xml, "category", dom.NS.STATUS, "term"),
        malwareScanState: dom.getChildTextNS(xml, "malwareScanState", dom.NS.TD),
        shareLink: this._getShareLink(xml)
      });
    },
    
    _getShareLink: function(xml) {
       var url = dom.getLinkAttrByRel(xml, "shareLink", "href");
       if(url) {
          var e = dom.getFirstTag(xml, "shareLink", dom.NS.TD);
          return {
             url: url,
             type: dom.getChildTextNS(e, "type", dom.NS.TD),
             scope: dom.getChildTextNS(e, "scope", dom.NS.TD),
             createdDate: dom.getChildTextNS(e, "created", dom.NS.TD)
          }
       }
       return {};
    },
    
    _getPermissions: function (xml) {
      var permissions = {}, permissionsString;

      permissionsString = dom.getChildTextNS(xml, "permissions", dom.NS.TD);
      if (permissionsString) {
        array.forEach(permissionsString.split(", "), function (permission) {
          if (permission) {
            permissions[permission] = true;
          }
        });
      }

      return permissions;
    },
    
    _getTags: function (xml) {
      var tags = [];
      var elements = dom.getAllTags(xml, "category");
      array.forEach(elements, function(element){
        if (element.getAttribute("scheme") == null) {
          tags.push(element.getAttribute("term"));
        }
      });
      
      // Some of the file POST responses will never return the tags, so if
      // no tags are found on the xml, return the current tags if we have them
      if (tags.length === 0) {
        return this.get("tags") || [];
      }
      
      return tags;
    },
    
    _getLock: function (xml) {
      var lockElement = dom.getFirstTag(xml, "lock", dom.NS.TD);
      return {
        user: dom.getUser(xml, "owner", dom.NS.TD, lockElement),
        date: dom.getChildDate(xml, "lockTime", dom.NS.TD, lockElement)
      };
    },
    
    _getCurrentUserDownloadInfo: function (xml) {
      var downloadInfoBlock = {};
      var downloadInfoElement = dom.getFirstTag(xml, "downloadInfo", dom.NS.TD);
      downloadInfoBlock.downloadedDate = dom.getChildDate(xml, "downloadedDate", dom.NS.TD, downloadInfoElement);
      downloadInfoBlock.versionUuid = dom.getChildTextNS(xml, "versionUuid", dom.NS.TD, downloadInfoElement);
      downloadInfoBlock.versionNumber = dom.getChildTextNS(xml, "versionNumber", dom.NS.TD, downloadInfoElement);
      downloadInfoBlock.hasDownloaded = !!downloadInfoBlock.versionUuid;
      return downloadInfoBlock;
    }
  });
});
