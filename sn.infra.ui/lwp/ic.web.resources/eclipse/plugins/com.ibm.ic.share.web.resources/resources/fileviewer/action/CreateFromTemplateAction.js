/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/string",
   "dojo/_base/array",
   "dojo/i18n!../nls/FileViewerStrings",
   "../config/documentTypes",
   "dojo/_base/lang",
   "dojo/dom-class",
   "dojo/dom-style",
   "../preview/util",
   "dojo/request/xhr",
   "dojo/promise/all",
   "dojo/Deferred",
   "dojo/on",
   "../dialog/CreateFromTemplateDialog",
   "../util/fidoNewRelic"
], function (declare, Action, string, array, i18n, documentTypes, lang, domClass, domStyle, util, xhr, all,
      Deferred, on, DialogFactory, fidoNewRelic) {
   "use strict";
   // Should be identical with CreateFromTemplateDialog.doc_type
   var doc_type = {
       "ott" : "text",
       "ots" : "sheet",
       "otp" : "pres",
       "dot" : "text",
       "xlt" : "sheet",
       "pot" : "pres",
       "dotx" : "text",
       "xltx" : "sheet",
       "potx" : "pres"
   },

   EditAction = declare([Action], {
     groupId: 1,

     constructor: function (args) {
       lang.mixin(this, args);
       this.nls = i18n.ACTION.CREATE_FROM_TEMPLATE;
       this.title = this.name = this.nls.ACTION_NAME;       
       this.a11y = this.nls.A11Y[doc_type[this.file.bean.get("type")].toUpperCase()];
     },

      onLinkClicked: function () {
    	  this.createDialog();
    	 fidoNewRelic.track("createFromTemplate");
      },
      
      createDialog: function () {
        this.dialog = new DialogFactory({file: this.file.bean});
        this.dialog.placeAt(document.body);
        this.dialog.startup();
        this.dialog.show();
        on(this.dialog, "clicked", lang.hitch(this, "execute"));
      },
      
      execute: function () {
        var url = this.getCreateLink(this.file.args.id);
        window.open(url, "_blank");
        this.dialog.onCancel();
      },

      getCreateLink: function (fileId) {
        var url = this.services.getDocsUrl() + "/app/newdoc?type=${docType}&template_uri=${id}&doc_title=${fileName}";
        if (this.file.bean.get("libraryType") === "personalFiles") {
           url += "&isExternal=${isExternal}";
        } else {
          url += "&community=${commName}&isExternal=${isExternal}";
        }

         return string.substitute(url, {
           docType: doc_type[this.file.bean.get("type")],
           id: fileId,
           fileName: this.dialog.content.fileName.value,
           isExternal: this.dialog.content.isExternal.checked,
           commName: this.file.bean.get("libraryId")
           });
      }
   });

   return {
     isSplitButtonItem: true,
     
      create: function (args) {
         return new EditAction(args);
      },

      isValid: function (file, args) {

        var deferred = new Deferred()

        if (file.type === "verse") {
          return deferred.resolve(false);
        }
        
        all({
          hasDocsEntitlement: args.entitlements.getDocsDfd(),
          file: file.bean.get("fullEntry")
        }).then(lang.hitch(this, function (results) {
          // File type can be changed with EditFilenameAction, so placed this condition
          // inside of callback of file.getFullEntry to check the updated file type
          if (array.indexOf(documentTypes.create, results.file.type) <= -1 || results.file.isEncrypted) {
            return deferred.resolve(false);
          }
          if (results.hasDocsEntitlement) {
            deferred.resolve(true);
          } else {
            deferred.resolve(false);
          }
        }), lang.hitch(this, function (results) {
          deferred.resolve(false);
        }));
        
        return deferred;
      },

      getClassName: function () {
         return "ics-viewer-action-templateCreate";
      },

      getActionCategory: function () {
         return "create";
      }
   };
});
