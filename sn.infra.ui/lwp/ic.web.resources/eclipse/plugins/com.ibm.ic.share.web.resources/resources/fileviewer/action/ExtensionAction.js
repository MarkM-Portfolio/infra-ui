define([
   "dojo/_base/declare",
   "dojox/html/entities",
   "../config/globals",
   "dojo/_base/array"
], function (declare, entities, globals, array) {
   "use strict";

   var ExtensionAction = declare([], {
      isExtensionAction: true,

      constructor: function (opts) {
         this.name = entities.encode(opts.menu_text);
         this.tooltip = opts.tooltip || opts.menu_text;
         this.title = this.tooltip;
         this.url = opts.url;
         this.mimeType = globals.textUtil.trim(entities.encode(opts.mime_type));
         this.newWindow = !!opts.new_window;

         if (this.newWindow) {
            this.windowName = entities.encode(opts.window_name) || "";
            this.windowName = this.windowName.replace(/ /g, "_");
            this.windowName = this.windowName.replace(/-/g, "_");
            this.windowFeatures = opts.window_features;
         }
      },

      getName: function () {
         return this.name;
      },

      getTooltip: function () {
         return this.tooltip;
      },

      execute: function (file) {
         var url, userId, orgId;

         userId = getUserField(globals.currentUser, "id");
         orgId = getUserField(globals.currentUser, "orgId");

         url = this.url.replace("${file_id}", encodeURIComponent(file.get("id")));
         url = url.replace("${user_id}", userId);
         url = url.replace("${subscriber_id}", userId);
         url = url.replace("${org_id}", orgId);
         url = url.replace("${customer_id}", orgId);

         if (this.newWindow) {
            this._openWindow(url, this.windowName, this.windowFeatures);
         } else {
            this._redirect(url);
         }

         return true; // TODO Why are we returning true?
      },

      _openWindow: function (url, name, features) {
         window.open(url, name, features);
      },

      _redirect: function (url) {
         window.location.href = url;
      }
   });

   function isSanitary(url) {
      if (!url) {
         return false;
      }

      if (/^(javascript:|data:)/.test(url)) {
         return false;
      }

      return true;
   }

   function getUserField(user, field) {
      if (!user) {
         return "";
      }

      if (user._native) {
         user = user._native;
      }

      return encodeURIComponent(user[field] || "");
   }

   function create(args, file) {
      if (!args) {
         return;
      }

      if (args["extends"] !== "file_menu") {
         return;
      }

      if (args.type !== "action") {
         return;
      }

      if (args.mime_type && args.mime_type !== file.get("mimeType")) {
         return;
      }

      if (!isSanitary(args.url)) {
         return;
      }

      return new ExtensionAction(args);
   }

   function createActions(data, file) {
      var result = [];

      array.forEach(data, function (args) {
         var action = create(args, file);

         if (action) {
            result.push(action);
         }
      });

      return result;
   }

   return {
      createActions: createActions,

      // Intended for use in unit tests only
      _create: create,
      _isSanitary: isSanitary,
      _class: ExtensionAction,
      _getUserField: getUserField
   };
});