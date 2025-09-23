/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "exports",
  "dojo/_base/array",
  "../config/globals",
  "dojo/_base/lang",
  "dojo/Deferred",
  "../network/request",
  "../data/util/routes",
  "../util/dom",
  "../util/url"
], function (exports, array, globals, lang, Deferred, request, routes, dom, url) {
  
  var FILES_WIDGET_DEF_ID = "Files";
  
  lang.mixin(exports, {
    isFilesWidget: function (communityId, widgetId) {
      return request(routes.getCommunityWidgetsFeedUrl(communityId, FILES_WIDGET_DEF_ID), {
        handleAs: "xml"
      }).then(lang.hitch(this, this._isFilesWidget, widgetId));
    },
    
    _isFilesWidget: function (widgetId, widgetsXml) {
      var entries = dom.getAllTags(widgetsXml, "entry");
      return array.some(entries, function (entry) {
        return widgetId === dom.getChildTextNS(entry, "widgetInstanceId", dom.NS.SNX);
      }, this);
    }
  });
});
