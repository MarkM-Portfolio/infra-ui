/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/string",
   "dojo/_base/array",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "../config/documentTypes",
   "dojo/_base/lang",
   "dojo/dom-class",
   "../preview/util",
   "dojo/request/xhr",
   "dojo/promise/all",
   "dojo/Deferred",
   "dojox/lang/functional"
], function (declare, Action, string, array, i18n, documentTypes, lang, domClass, util, xhr, all, Deferred,
      functional) {
   "use strict";

   function getDocsLink(fileId) {
      var url = "/docs/app/doc/lcfiles/${id}/edit/content";

      return string.substitute(url, { id: fileId });
   }

   var EditAction = declare([Action], {
      postMixInProperties: function () {
         this.nls = i18n.ACTION.EDIT_DOC;
         this.name = this.nls.NAME;
         this.title = string.substitute(this.nls.TOOLTIP, [this.file.args.name]);
         this.a11y = this.nls.A11Y;

         this.hide();
      },

      postCreate: function () {
         domClass.add(this.img, "lotusHidden");

         all({
            hasDocsEntitlement: this.entitlements.getDocsDfd(),
            permissions: this.getPermissions()
         }).then(lang.hitch(this, function (results) {
            if (results.hasDocsEntitlement && results.permissions.Edit) {
               this.show();
            }
         }));
      },

      getPermissions: function () {
         var deferred = new Deferred();
         if (functional.keys(this.file.args.permissions).length !== 0) {
            deferred.resolve(this.file.args.permissions);
         } else {
            xhr.get(this.file.args.links.entry + "?acls=true", {
               handleAs: "xml"
            }).then(lang.hitch(this, function (response) {
               var entryPermissions = response.getElementsByTagName("td:permissions")[0].innerHTML,
                  canEdit = array.indexOf(entryPermissions.split(", "), "Edit") !== -1;
               lang.setObject("permissions.Edit", canEdit, this.file.args);
               deferred.resolve(this.file.args.permissions);
            }));
         }

         return deferred;
      },

      onLinkClicked: function () {
         window.open(getDocsLink(this.file.args.id), "_blanks");
      }
   });

   return {
      create: function (args) {
         return new EditAction(args);
      },

      isValid: function (file, args) {
         var fileType = file.args.type;
         if (array.indexOf(documentTypes.edit, fileType) > -1 && !file.args.isEncrypted) {

            if (file.args.size === 0 && (fileType === "csv" || fileType === "txt")) {
               // IBM Docs does not support editing zero byte CSV and TXT files
               return false;
            }

            if (util.isDocsFile(file.args)) {
               return true;
            }

            return args.currentUser.id && args.currentUser.id === file.args.author.id;
         }

         return false;
      },

      getClassName: function () {
         return "ics-viewer-action-edit";
      }
   };
});
