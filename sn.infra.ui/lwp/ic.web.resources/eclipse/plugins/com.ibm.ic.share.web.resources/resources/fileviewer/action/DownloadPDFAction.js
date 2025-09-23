/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/topic",
  "dojo/string",
  "dojo/io-query",
  "./Action",
  "dojo/i18n!../nls/FileViewerStrings",
  "../util/ibmDocs",
  "./DownloadDocsFileMixin",
  "dojo/date"
], function (declare, lang, topic, string, ioQuery, Action, i18n, ibmDocs, DownloadDocsFileMixin, date) {

  var DownloadPDFAction = declare([Action, DownloadDocsFileMixin], {
    groupId: 0,
    isDownloadAction: true,
    
    postMixInProperties: function () {
      this.nls = i18n.ACTION.DOWNLOAD_AS_PDF;
      this.name = this.nls.NAME;
      this.title = this.nls.TOOLTIP;
      this.a11y = this.nls.A11Y;
    },

    onLinkClicked: function () {
       var fileBean = this.file.bean;
       if (this.showWarning(fileBean) && fileBean.unpublishedChanges) {
          this._showDownloadPrompt(fileBean.unpublishedChanges.draftUpdateDate, fileBean.unpublishedChanges.fileUpdateDate);
       } else {
          this.doDownload();
       }
    },
    
    showWarning: function(file) {
       // Ensure the draft update date is never behind the file update date,
       // in case the clocks for the Docs and Files server are not in sync.
       if (date.compare(file.unpublishedChanges.draftUpdateDate, file.unpublishedChanges.fileUpdateDate) < 0) {
          file.unpublishedChanges.draftUpdateDate = file.unpublishedChanges.fileUpdateDate;
       }
        
       var isSameVersion = file.unpublishedChanges.baseVersion === file.get("version");
        
       if (isSameVersion &&
          (file.get("size") === 0 ||
          (file.unpublishedChanges.hasChanges && file.get("permissions").canEdit()))) {
             return true;
       }
        
       return false;
    },
    
    doDownload: function () {
      window.open(this.getDocsLink(this.file.bean.get("id")), "_blank");
    },

    getDocsLink: function (fileId) {
      var urlPathTemplate = "/app/doc/lcfiles/${id}/view/content";
      var url = this.services.getDocsUrl() + string.substitute(urlPathTemplate, { id: fileId });
      var options = {
        asFormat: "pdf"
      };
      var optionsString = ioQuery.objectToQuery(options);

      return url + "?" + optionsString;
    }
  });

   return {
     isSticky: false,
     isSubItem: true,

    create: function (args) {
      this.getWarningDialogInfo(args.file.bean);
      return new DownloadPDFAction(args);
    },
    
    getWarningDialogInfo: function(file) {
       file.unpublishedChanges = null;
       if (this._draftInfoRequest) {
           return;
       }
          
       this._draftInfoRequest = true;
       
       file.getDocsDraftInfo().then(lang.hitch(this, function (info) {
          this._draftInfoRequest = false;
            
          if (!info) {
             return;
          }
            
          var fileUpdateDate = file.get("dateModified");
          var draftUpdateDate = info.get("dateModified");
            
          file.unpublishedChanges = {fileUpdateDate: fileUpdateDate, draftUpdateDate: draftUpdateDate, baseVersion: info.get("baseVersion"), hasChanges: info.hasChanges};
            
       }));
          
    },

    isValid: function (file, args) {
      return file.bean.get("isDocsFile") && ibmDocs.isDocsEnabled();
    },

    getClassName: function () {
      return "ics-viewer-action-download-pdf";
    }
  };
});
