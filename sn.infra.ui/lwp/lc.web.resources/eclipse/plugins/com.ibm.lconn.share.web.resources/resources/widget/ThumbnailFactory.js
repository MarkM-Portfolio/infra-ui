/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
(function(){
   dojo.provide("lconn.share.widget.ThumbnailFactory");
   dojo.require("lconn.share.widget.AbstractThumbnail");
   dojo.require("lconn.share.widget.FileThumbnail");
   dojo.require("lconn.share.widget.FolderThumbnail");
   dojo.require("dojo.date.stamp");
   dojo.require("lconn.core.auth");
   
   var ThumbnailFactory = lconn.share.widget.ThumbnailFactory;
   var AbstractThumbnail = lconn.share.widget.AbstractThumbnail;
   var FileThumbnail = lconn.share.widget.FileThumbnail;
   var FolderThumbnail = lconn.share.widget.FolderThumbnail;
   var stamp = dojo.date.stamp;

   ThumbnailFactory._constructWidgetData = function(bean, order, actions, showLockIcon, iconClass, disableVideoPreviewIcon) {
      var objectKey = "";
      var downloadObject;
      var widgetData = {
         index: order,
         role: "listitem",
         fileId: bean.getId(),
         fileName: bean.getPublishedTitle(),
         fileType: bean.getExtension(),
         fileAuthor: bean.getAuthor(),
         fileDatePublished: stamp.toISOString(bean.getPublished()),
         fileModifier: bean.getModifier(),
         fileDateModified: stamp.toISOString(bean.getUpdated()),
         fileDraft: bean.getDraftStatus(),
         filePath: bean.getUrlDownload(),
         context: bean.getLibraryType(),
         fileVisibilityLocking: ThumbnailFactory._getFileLockStatus(bean, lconn.core.auth.getUser()),
         actionListValue: [],
         fileTypeIconClass: iconClass,
         disableVideoPreviewIcon: disableVideoPreviewIcon
      };

      if (actions.download) {
         if(dojo.isFunction(actions.download)) {
            objectKey = "callback";
         } else if(dojo.isString(actions.download)) {
            objectKey = "href";
         }
         
         if(objectKey) {
            downloadObject = {name: "Download"};
            downloadObject[objectKey] = actions.download;
            widgetData.actionListValue.push(downloadObject);
         }
      }
      if (actions.preview) {
         widgetData.actionListValue.push({name: "Preview", callback: actions.preview});
      }
      //TODO: Add IBM Docs logic to use this instead of preview?
      if (actions.view) {
         widgetData.actionListValue.push({name: "View", callback: actions.view});
      }
      if (actions.summary) {
         widgetData.actionListValue.push({name: "Summary", callback: actions.summary});
      }
      if (actions.open) {
         widgetData.actionListValue.push({name: "Open", callback: actions.open});
      }
      return widgetData;
   };
   
   ThumbnailFactory._getFileLockStatus = function(bean, authUser) {
      var fileLockOwner = bean.getLockOwner();
      if (fileLockOwner != null) {
         if (fileLockOwner.id == (authUser && authUser.id)) {
            return "lockedByMe";
         }
         return "locked";
      }
   };
   
   ThumbnailFactory.createThumbnail = function(bean, order, actions, showLockIcon, iconClass, disableVideoPreviewIcon) {
      var constructor = lconn.share.widget[(bean.isFolder()) ? "FolderThumbnail" : "FileThumbnail" ];
      var widgetData = {value: lconn.share.widget.ThumbnailFactory._constructWidgetData(bean, order, actions, showLockIcon, iconClass, disableVideoPreviewIcon)};
      var thumbnailWidget = new constructor(widgetData);
      thumbnailWidget.shareFileBean = bean;
      dojo.connect(bean, "setThumbnailData", function(sizeFormat, thumbnailData) {
         if(ThumbnailFactory.getDefaultThumbnailSize(bean) == sizeFormat) {
            thumbnailWidget.applyImageBase64(thumbnailData);
         }
      });
      
      return thumbnailWidget;
   };
   
   ThumbnailFactory.getDefaultThumbnailSize = function(bean) {
      if(!bean) {
         return AbstractThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE;
      }

      var constructorAndObject = ((bean.isFolder()) ? FolderThumbnail : FileThumbnail);
      return constructorAndObject.DEFAULT_EXPECTED_THUMBNAIL_SIZE;
   };
}());
