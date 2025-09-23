/* Copyright IBM Corp. 2014, 2016  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "dojo/date",
  "dojo/io-query",
  "../dialog/ConfirmationDialog",
  "../util/DateFormat",
  "dojo/promise/all",
  "dojo/_base/lang",
  "dojo/Deferred",
  "../config/globals"
], function (declare, i18n, string, date, ioQuery, ConfirmationDialog, DateFormat, all, lang, Deferred, globals) {

  return declare(null, {
    constructor: function () {
      this.downloadDocsFileNls = i18n.ACTION.DOWNLOAD_DOCS_FILE;
    },
    
    customDownload: function () {
      this._checkIfValid().then(lang.hitch(this, function (isValid) {
        if (!isValid) {
          this.doDownload();
          return;
        }
        
        this._downloadDocsFile();
      }));
    },
    
    _checkIfValid: function () {
      var promise;

      if (!this.file.bean.get("isDocsFile") || !globals.isPanels(this.file)) {
        promise = new Deferred();
        promise.resolve(false);
      } else {
        promise = all({
          hasDocsEntitlement: this.entitlements.getDocsDfd(),
          fullEntry: this.file.bean.get("fullEntry")
        }).then(lang.hitch(this, function (results) {
          return results.hasDocsEntitlement;
        }));
      }
      
      return promise;
    },

    doDownload: function () {
      window.location.href = this.file.args.links.download;
    },

    _downloadDocsFile: function () {
      if (this._draftInfoRequest) {
        return;
      }
      
      this._draftInfoRequest = true;
      this.file.bean.getDocsDraftInfo().then(lang.hitch(this, function (info) {
        this._draftInfoRequest = false;
        
        if (!info) {
          this.doDownload();
          return;
        }
        
        var fileUpdateDate = this.file.bean.get("dateModified");
        var draftUpdateDate = info.get("dateModified");

        // Ensure the draft update date is never behind the file update date,
        // in case the clocks for the Docs and Files server are not in sync.
        if (date.compare(draftUpdateDate, fileUpdateDate) < 0) {
          draftUpdateDate = fileUpdateDate;
        }
        
        var isSameVersion = info.get("baseVersion") === this.file.bean.get("version");
        
        if (isSameVersion &&
          (this.file.bean.get("size") === 0 ||
          (info.hasChanges && this.file.bean.get("permissions").canEdit()))) {
          
          this._showDownloadPrompt(draftUpdateDate, fileUpdateDate);
        } else {
          this.doDownload();
        }
      }));
    },
    
    _showDownloadPrompt: function (draftUpdateDate, fileUpdateDate) {
      var hideOk = false, dialogStrings, draftDateFormatter, fileDateFormatter;
      
      if (this.file.bean.get("size") === 0) {
        if (this.file.bean.get("permissions").canEdit()) {
          dialogStrings = this.downloadDocsFileNls.EMPTY_FILE_EDITOR;
        } else {
          dialogStrings = this.downloadDocsFileNls.EMPTY_FILE_READER;
        }
        hideOk = true;
      } else {
        dialogStrings = lang.clone(this.downloadDocsFileNls.NEWER_DRAFT_EXISTS);
        
        draftDateFormatter = new DateFormat(draftUpdateDate);
        dialogStrings.PROMPT = draftDateFormatter.formatByAge(dialogStrings.PROMPT);
        
        fileDateFormatter = new DateFormat(fileUpdateDate);
        dialogStrings.PROMPT2 = fileDateFormatter.formatByAge(dialogStrings.PROMPT2);
      }
      
      var dialog = new ConfirmationDialog({strings: dialogStrings, hideOk: hideOk});
      dialog.render();
      
      dialog.on("clicked", lang.hitch(this, function () {
        dialog.onCancel();
        this.doDownload();
      }));
    }
  });
});
