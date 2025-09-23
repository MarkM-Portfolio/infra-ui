/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("ic-ui.util.fileViewerListener");

dojo.require("lconn.core.config.features");
dojo.require("ic-core/util/connectionsUrlUtil");
dojo.require("ic-share/fileviewer/ConnectionsFileViewer");
dojo.require("ic-share/fileviewer/util/history");
dojo.require("dojo/aspect");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");
dojo.require("ic-core/wp/utils");

(function (features, connectionsUrlUtil, ConnectionsFileViewer, historyUtil, aspect, services, coreUrl) {
   "use strict";

   var JS_HREF = "javascript:";

   // I usually hate relying on variable hoisting, but I think in this case it makes things easier to read

   if (features("fileviewer-everywhere") && (historyUtil.historySupported || historyUtil.doesPageSupportFileHash({services: services}))) {
     dojo.ready(function () {
       aspect.before(document, "onclick", onClick);
     });
   }

   function onClick(evt) {
      var linkTarget = getLinkTarget(evt);

      if (connectionsUrlUtil.shouldOpenConnectionsPreview(linkTarget)) {
         if (!historyUtil.historySupported && !isSameAppUrl(linkTarget, window.location.href)) {
            return false;
         }

         var fileId = connectionsUrlUtil.getFileId(linkTarget);
         ConnectionsFileViewer.openFromId(fileId, {linkTarget: linkTarget, openedFromFileViewerEverywhere: true});
         
         if (evt) {
           evt.preventDefault();
           evt.stopPropagation();
         } else {
           window.event.returnValue = false;
         }
      }
   }

   // TODO Why were we using 'this' from a static context?
   function getLinkTarget(evt) {
      try {
         if (forceOpenInNewWindow(evt || window.event)) {
            return;
         }

         var t = evt ? evt.target : dojo.getObject("event.srcElement");
         // don't open on right-click or middle click
         if (t && (!evt || evt.button === 0)) {
            var nn = t.nodeName.toLowerCase();

            if ("input" === nn || "select" === nn || "option" === nn) {
               return;
            }

            if ("a" !== nn) {
               do {
                  t = t.parentNode;
                  // TODO What is _nolink?
                  if (!t || t._nolink) {
                     t = evt.target.parentNode;
                     while (t && !t._nolink) {
                        t._nolink = true;
                        t = t.parentNode;
                     }
                     return;
                  }
               } while (t.nodeName.toLowerCase() !== "a");
            }

            if (t.href && !t.href.match(JS_HREF) && (linkOpensInSameWindow(t, evt || window.event) || isRichTextLink(t))) {
               return t.href;
            }
         }
      } catch (err) {
         console.log("Error caught while determining if file viewer should open", err);
      }

      return;
   }
   
   function forceOpenInNewWindow(evt) {
      return evt.ctrlKey || evt.metaKey;
   }
   
   function linkOpensInSameWindow(link, evt) {
      return (!link.getAttribute("target") || link.getAttribute("target") === "_self"); 
   }
   
   function isRichTextLink(link) {
      var previousNode = dojo.getObject("previousSibling.previousSibling", false, link);
      return !!previousNode && previousNode.tagName.toLowerCase() === "a" && previousNode.getAttribute("_ic_source") === "files" && !!previousNode.getAttribute("_ic_files_uuid");
   }
   
   function isSameAppUrl(linkTarget, pageUrl) {
      var linkTargetUrlInfo, pageUrlInfo;
      if (connectionsUrlUtil.isFilesAppUrl(linkTarget)) {
         return connectionsUrlUtil.isFilesAppUrl(pageUrl);
      }
      if (connectionsUrlUtil.isCommunityWidgetUrl(linkTarget)) {
         // If we reach this line of code, it can be assumed that pageURL is a community URL.
         // TODO: Implement this with support from connectionsUrlUtil
         var linkTargetCommunityUuid = coreUrl.parse(linkTarget).queryParameters.communityUuid;
         var pageUrlCommunityUuid = coreUrl.parse(pageUrl).queryParameters.communityUuid;
         return linkTargetCommunityUuid === pageUrlCommunityUuid;
      }
      return true;
   }
}(
   lconn.core.config.features,
   define._modules["ic-core/util/connectionsUrlUtil"],
   window["ic-share"].fileviewer.ConnectionsFileViewer,
   define._modules["ic-share/fileviewer/util/history"],
   define._modules["dojo/aspect"],
   lconn.core.config.services,
   lconn.core.url
));