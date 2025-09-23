/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/string",
   "dojo/text!./_extensions.json",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/_base/json",
   "dojo/_base/array",
   "../util/feature",
   "dojo/_base/lang",
   "dojo/promise/all",
   "ic-core/config/services",
   "../config/globals",
   "dojo/topic",
   "dojo/dom-class",
   "../util/fidoNewRelic"
], function (declare, Action, string, extensionsString, i18n, json, array, feature, lang, all, services, globals, topic, domClass, fidoNewRelic) {
   "use strict";

   var extensions = [],
      ExtensionAction;

   if (feature.isOffice365Enabled()) {
      try {
         extensions = json.fromJson(extensionsString);
      } catch (e) {
         console.warn("Failed to load extensions from JSON", e);
      }
   }

   function getServiceConfig() {
      if (!services["files-wopi"]) {
         return "";
      }
      return services["files-wopi"].secureUrl;
   }

   function getUserField(field) {
      var user = globals.currentUser;

      if (!user) {
         return "";
      }

      if (user._native) {
         user = user._native;
      }

      return encodeURIComponent(user[field] || "");
   }

   ExtensionAction = declare([ Action ], {
      postMixInProperties: function () {
         this.nls = i18n.ACTION;
         var extension = getActionDefinition(this.file.bean.get("type"));
         switch (extension.fileType) {
            case "Word":
               if (!this.nls.EDIT_OFFICE_WORD) {
                  this.name = this.splitButtonName || "Edit in Microsoft Word Online";
                  this.title = "Use Microsoft Word Online to edit this file";
                  this.a11y = "This button opens the file for editing in Microsoft Word Online inside of a new window.";
               } else {
                  this.name = this.splitButtonName || this.nls.EDIT_OFFICE_WORD.NAME;
                  this.title = this.nls.EDIT_OFFICE_WORD.TOOLTIP;
                  this.a11y = this.nls.EDIT_OFFICE_WORD.A11Y;
               }
               break;
            case "Excel":
               if (!this.nls.EDIT_OFFICE_EXCEL) {
                  this.name = this.splitButtonName || "Edit in Microsoft Excel Online";
                  this.title = "Use Microsoft Excel Online to edit this file";
                  this.a11y = "This button opens the file for editing in Microsoft Excel Online inside of a new window.";
               } else {
                  this.name = this.splitButtonName || this.nls.EDIT_OFFICE_EXCEL.NAME;
                  this.title = this.nls.EDIT_OFFICE_EXCEL.TOOLTIP;
                  this.a11y = this.nls.EDIT_OFFICE_EXCEL.A11Y;
               }
               break;
            case "PowerPoint":
                if (!this.nls.EDIT_OFFICE_POWERPOINT) {
                  this.name = this.splitButtonName || "Edit in Microsoft PowerPoint Online";
                  this.title = "Use Microsoft PowerPoint Online to edit this file";
                  this.a11y = "This button opens the file for editing in Microsoft PowerPoint Online inside of a new window.";
               } else {
                  this.name = this.splitButtonName || this.nls.EDIT_OFFICE_POWERPOINT.NAME;
                  this.title = this.nls.EDIT_OFFICE_POWERPOINT.TOOLTIP;
                  this.a11y = this.nls.EDIT_OFFICE_POWERPOINT.A11Y;
               }
               break;
            default:
               if (!this.nls.EDIT_OFFICE) {
                  this.name = this.splitButtonName || "Edit in Microsoft Office Online";
                  this.title = "Use Microsoft Office Online to edit this file";
                  this.a11y = "This button opens the file for editing in Microsoft Office Online inside of a new window.";
               } else {
                  this.name = this.splitButtonName || this.nls.EDIT_OFFICE.NAME;
                  this.title = this.nls.EDIT_OFFICE.TOOLTIP;
                  this.a11y = this.nls.EDIT_OFFICE.A11Y;
               }
         }
         if (domClass.contains(this.parentNode, "ics-viewer-action-edit") && !feature.isOffice365EnabledWithoutDocsEditor()) {
            this.a11y = this.nls.EDIT_OFFICE.TITLE;
         }
      },

      onLinkClicked: function () {
         if (domClass.contains(this.parentNode, "ics-viewer-action-edit") && !feature.isOffice365EnabledWithoutDocsEditor()) {
            topic.publish("ic-fileviewer/toggleActionDropdown");
         } else {
            window.open(this.getLink(this.file.args), "fidoEditExtension");
            fidoNewRelic.track("editOffice365");
         }
      },

      getLink: function (args) {
         var extension = getActionDefinition(args.type);
         var url = extension.target;
         var queryString = {
            wopi: getServiceConfig(),
            file_id: args.id
         };

         return string.substitute(url, queryString);
      }
   });

   function getActionDefinition(type) {
      var matches = array.filter(extensions, function (extension) {
         return array.indexOf(extension.types, type) !== -1;
      });

      return matches && matches[0];
   }

   return {
      isSplitButtonItem: true,

      isValid: function (file, args) {
          if (globals.isCCM(file)) {
              return false;
           }

         return all({
            fileBean: file.bean.get("fullEntry")
         }).then(lang.hitch(this, function (results) {
            if (file.type === "verse") {
                 return false;
            }

            if (file.bean.get("isEncrypted")) {
               return false;
            }

            if (getServiceConfig() === "") {
                return false;
            }

            return !!getActionDefinition(file.bean.get("type")) && file.bean.get("permissions").canEdit();
         }));
      },

      create: function (args) {
         return new ExtensionAction(args);
      },

      getClassName: function () {
         return "ics-viewer-action-edit";
      },

      getActionCategory: function () {
         return "edit";
      }
   };
});