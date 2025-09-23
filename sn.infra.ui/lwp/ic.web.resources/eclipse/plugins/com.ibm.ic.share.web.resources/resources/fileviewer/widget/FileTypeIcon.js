/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "../sbw/StatefulBackedTemplatedWidget",
   "dojo/text!./templates/FileTypeIcon.html",
   "../preview/util",
   "dojo/i18n!../nls/FileViewerStrings",
   "../config/globals",
   "../util/DateFormat",
   "dojo/string",
   "dojo/query",
   "dijit/focus"
], function (declare, StatefulBackedTemplatedWidget, template, util, i18n, globals, DateFormat, string, query, focus) {
   "use strict";

   return declare([ StatefulBackedTemplatedWidget ], {
      templateString: template,

      constructor: function () {
         this.nls = i18n.FILE_STATE; // Overridden in unit tests
      },

      postMixInProperties: function () {
         this.model = this.file;
         window.fileTypeIcon = this;
         this.file.get("fullEntry").then();
      },

      focus: function () {
         query("img", this.domNode).forEach(function (element) {
            focus.focus(element);
         });
      },

      _getFileTypeClass: function () {
         return util.getIconClass(this.fileArgs || {}, 16);
      },

      _getLockString: function () {
         if (!this.file.get("isLocked") || !this.file.get("lock") || !this.file.get("lock").date) {
            return "";
         }

         var lock, nls, date;

         lock = this.file.get("lock");
         nls = lock.user.id === globals.currentUser.id ? this.nls.LOCKED_BY_YOU : this.nls.LOCKED_BY_OTHER;
         date = (new DateFormat(lock.date)).formatByAge(nls);

         return string.substitute(date, { user: lock.user.name });
      },

      _getLockClass: function () {
         if (!this.file.get("isLocked") || !this.file.get("lock") || !this.file.get("lock").date) {
            return "ics-viewer-unlocked";
         }

         var lock = this.file.get("lock");

         if (lock && lock.user.id === globals.currentUser.id) {
            return "ics-viewer-locked-by-you";
         }

         return "ics-viewer-locked-by-other";
      }
   });
});