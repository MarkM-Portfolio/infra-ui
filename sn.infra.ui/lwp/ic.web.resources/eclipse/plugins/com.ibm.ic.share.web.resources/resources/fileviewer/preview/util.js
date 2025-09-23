/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

define([
  "../config/extensionmap",
  "dojo/string",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/_base/lang",
  "dojo/number",
  "dojo/_base/array",
  "../config/documentTypes",
  "dojo/has",
  "ic-core/util/text",
  "dojo/topic",
], function (extensionMap, string, i18n, lang, number, array, documentTypes, has, text, topic) {
  "use strict";

  var INCREMENT_FACTOR = 1000,
    CONNECTIONS_DOCS_IDS = ["00000000-0000-0000-0001-000000000000", "00000000-00000-0000-0001-00000000000000"],
    util;

  util = {
    clamp: function (obj, floor, ceiling) {
      if (obj > ceiling) {
        return ceiling;
      }

      if (obj < floor) {
        return floor;
      }

      return obj;
    },

    formatFileSize: function (fileSize) {
      return text.formatSize(i18n.FILE_SIZE, fileSize);
    },

    getIconClass: function (fileArgs, size) {
      if (lang.isFunction(fileArgs.updateFromBean)) {
         fileArgs.updateFromBean();
      }
      var category, format, 
         docsString = this.isDocsFile(fileArgs) ? "Docs" : "", 
         type = fileArgs.type;
      
      if (has("hikari-default-theme") || this.isDocsFile(fileArgs)) {
         format = "iconsFileTypes${size} iconsFileTypes${size}-ft${category}${docsString}${size}";
         if (!lang.isString(type) || type.length === 0) {
            category = "Default";
         } else {
            category = lang.getObject(type, false, extensionMap) || "Default";
         }
      } else {
         format = "lconn-ftype${size} lconn-ftype${size}-${type}";
      }

      size = size || 128;

      return string.substitute(format, {
        size: size,
        category: category,
        docsString: docsString,
        type: type
      });
    },

    isDocsFile: function (fileArgs) {
      var typeId = "";
      typeId = fileArgs.objectTypeId;
      return fileArgs._isDocsFile || array.indexOf(CONNECTIONS_DOCS_IDS, typeId) !== -1;
    },

    isFileSizeFormatted: function (fileSize) {
      return !(Number(fileSize) == fileSize);
    },

    isFileViewable: function (file) {
      var type = (file.args || {}).type;
      return array.indexOf(documentTypes.view, type) > -1;
    },
    
    isCCM: function(file) {
      if (file) {
         if (file.bean) {
            if (file.bean.get("libraryType") === "library") {
               return true;
            }
         } else if (file.args) {
            if (file.args.libraryType === "library") {
               return true;
            }
         } else if (file.libraryType === "library") {
            return true;
         }
      }
      return false;
    },

    isMalicious: function(file) {
      var fileObject = file.bean || file;
      if (fileObject.malwareScanState === "virusDetected") {
        return true;
      } else {
        return false;
      }
    },

    isPreviewSafe: function(file, message) {
      var fileObject = file.bean || file;
      if (fileObject.malwareScanState === "unscanned") {
        if (message) {
          topic.publish("ic-fileviewer/push/messages", {
            type: "warning",
              message: message,
              cancelable: false
          });
        }
        return false;
      }
      return true;
    }
  };

  return util;
});
