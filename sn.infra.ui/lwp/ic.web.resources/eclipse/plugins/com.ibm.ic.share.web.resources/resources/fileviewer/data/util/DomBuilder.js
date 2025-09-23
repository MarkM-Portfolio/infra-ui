/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojox/html/entities",
  "../../util/dom"
], function (declare, entities, dom) {
  "use strict";

  function appendElement(doc, element, tagName, namespace, text) {
    var childElement = dom.createElementNS(doc, tagName, namespace);
    
    if (text !== undefined && text !== null) {
      text = "" + text;
    }
    if (text) {
      childElement.appendChild(doc.createTextNode(text));
    }
    
    element.appendChild(childElement);
    return childElement;
  }
  
  return declare([], {
    getPostBody: function(item) {
      var doc, entry;
      doc = dom.newXmlDocument("entry", dom.NS.ATOM, [dom.NS.TD, dom.NS.SNX]);
      entry = doc.documentElement;
      
      if (item.get("category")) {
        var category = appendElement(doc, entry, "category", dom.NS.ATOM);
        category.setAttribute("term", item.get("category"));
        category.setAttribute("label", item.get("category"));
        category.setAttribute("scheme", "tag:ibm.com,2006:td/type");
      }
      
      if (item.hasPropertyChanged("canOthersShare")) {
        appendElement(doc, entry, "propagation", dom.NS.TD, item.get("canOthersShare"));
      }
      
      if (item.hasPropertyChanged("changeSummary")) {
        appendElement(doc, entry, "changeSummary", dom.NS.TD, item.get("changeSummary"));
      }
      
      if (item.hasPropertyChanged("versionUuid")) {
        appendElement(doc, entry, "versionUuid", dom.NS.TD, item.get("versionUuid"));
      }
      
      if (item.hasPropertyChanged("visibility")) {
        appendElement(doc, entry, "visibility", dom.NS.TD, item.get("visibility"));
      }
      
      if (item.hasPropertyChanged("isExternal")) {
        appendElement(doc, entry, "isExternal", dom.NS.SNX, item.get("isExternal"));
      }
      
      if (item.hasPropertyChanged("content") && item.get("mimeType")) {
        // First decode the content since it will be encoded when appended to the xml document
        var content = appendElement(doc, entry, "content", dom.NS.ATOM, entities.decode(item.get("content")));
        content.setAttribute("type", item.get("mimeType"));
      }
      
      if (item.hasPropertyChanged("name")) {
        appendElement(doc, entry, "label", dom.NS.TD, item.get("name"));
      }
      
      if (item.hasPropertyChanged("summary")) {
        var summary = appendElement(doc, entry, "summary", dom.NS.ATOM, item.get("summary"));
        summary.setAttribute("type", "text");
      }
      
      if (item.hasPropertyChanged("mediaNotifications") || item.hasPropertyChanged("commentNotifications")) {
        var notifications = appendElement(doc, entry, "notifications", dom.NS.TD);
        
        if (item.hasPropertyChanged("mediaNotifications")) {
          appendElement(doc, notifications, "media", dom.NS.TD, item.get("mediaNotifications") ? "on" : "off");
        }
        
        if (item.hasPropertyChanged("commentNotifications")) {
          appendElement(doc, notifications, "comment", dom.NS.TD, item.get("commentNotifications") ? "on" : "off");
        }
      }
      
      return dom.serializeXMLDocument(doc);
    }
  });
});
