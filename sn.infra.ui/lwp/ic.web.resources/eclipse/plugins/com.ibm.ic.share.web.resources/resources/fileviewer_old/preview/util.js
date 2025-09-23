/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "../config/extensionmap",
   "dojo/string",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "dojo/_base/lang",
   "dojo/number",
   "dojo/_base/array"
], function (extensionMap, string, i18n, lang, number, array) {
   "use strict";
   var INCREMENT_FACTOR = 1000,
      CONNECTIONS_DOCS_IDS = ["00000000-0000-0000-0001-000000000000", "00000000-00000-0000-0001-00000000000000"];

   return {
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
         var sizeKB = 0, sizeMB = 0, sizeGB = 0, sizeTB = 0;
         sizeKB = number.round(fileSize / 1024);
         sizeMB = number.round(sizeKB / 1024, 1);
         sizeGB = number.round(sizeMB / 1024, 1);
         sizeTB = number.round(sizeGB / 1024, 1);

         if (sizeGB >= INCREMENT_FACTOR) {
            return string.substitute(i18n.FILE_SIZE.TERRABYTES, {
               size: sizeTB
            });
         }

         if (sizeMB >= INCREMENT_FACTOR) {
            return string.substitute(i18n.FILE_SIZE.GIGABYTES, {
               size: sizeGB
            });
         }

         if (sizeKB >= INCREMENT_FACTOR) {
            return string.substitute(i18n.FILE_SIZE.MEGABYTES, {
               size: sizeMB
            });
         }

         if (fileSize >= INCREMENT_FACTOR) {
            return string.substitute(i18n.FILE_SIZE.KILOBYTES, {
               size: sizeKB
            });
         }

         return string.substitute(i18n.FILE_SIZE.BYTES, {
            size: fileSize
         });
      },

      getIconClass: function (fileArgs, size) {
         var category, format = "iconsFileTypes${size} iconsFileTypes${size}-ft${category}${docsString}${size}",
            docsString = this.isDocsFile(fileArgs) ? "Docs" : "",
            type = fileArgs.type;

         if (!lang.isString(type) || type.length === 0) {
            category = "Default";
         } else {
            category = lang.getObject(type, false, extensionMap) || "Default";
         }

         size = size || 128;

         return string.substitute(format, {
            size: size,
            category: category,
            docsString: docsString
         });
      },

      isDocsFile: function (fileArgs) {
         var typeId = "";
         typeId = fileArgs.objectTypeId;
         return fileArgs._isDocsFile || array.indexOf(CONNECTIONS_DOCS_IDS, typeId) !== -1;
      }
   };
});
