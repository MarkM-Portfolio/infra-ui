/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dijit/registry",
   "dojo/text!./templates/FileViewerImpl.html",
   "./preview/previews",
   "./action/actions",
   "dojo/_base/array",
   "dojo/_base/config",
   "dojo/dom-class",
   "dojo/dom-construct",
   "dojo/html",
   "dojo/_base/lang",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "dojo/string",
   "dojo/on",
   "dojo/keys",
   "dijit/focus",
   "dojo/dom-attr",
   "dojo/query",
   "dojo/_base/window",
   "./preview/util",
   "./preview/EntitlementChecker"
], function (declare, _WidgetBase, _TemplatedMixin, registry, template, previews, actions, array,
      config, domClass, domConstruct, html, lang, i18n, string, on, keys, focus, domAttr, query,
      win, util, EntitlementChecker) {
   "use strict";

   return declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,

      postMixInProperties: function () {
         this.formatFileSize = this.formatSize || util.formatFileSize;

         this.nls = i18n;
         this.blank = config.blankGif || "";
         this.ariaLabelId = registry.getUniqueId("fileviewer") + "_title";
         this.fileTypeClass = util.getIconClass(this.file.args, 16);
         this.fileSize = this.formatFileSize(this.file.args.size);
         this.entitlements = new EntitlementChecker({isAuthenticated: this.isAuthenticated});

         this.textDirection = domClass.contains(query("html")[0], "dijitRtl") ? "rtl" : "ltr";
         this.rtl = "rtl" === this.textDirection;
         this.ltr = !this.rtl;
      },

      postCreate: function () {
         this.fileIconLink.title = string.substitute(this.nls.ICON_TOOLTIP, [this.file.args.name]);

         if (!this.source) {
            setTimeout(lang.hitch(focus, "focus", this.fileDetails, 1));
         }

         domClass.add(this.viewerContent, this.textDirection);

         this._setPreviewWidget();
         this._addActions();
         this._configNav();
         this._renderLastUpdated();
         this._fixTabOrder();
         this._listenForKeys();
      },

      _setPreviewWidget: function () {
         array.some(previews, function (preview) {
            if (preview.isValid(this.file)) {
               this.preview = preview.create({
                  file: this.file,
                  entitlements: this.entitlements,
                  errorHandler: lang.hitch(this, this._onError)
               });

               this.preview.placeAt(this.previewContainer);

               return true;
            }
         }, this);
      },

      _addActions: function () {
         array.forEach(actions, function (action) {
            var li, widget, args;

            args = {
               file: this.file,
               entitlements: this.entitlements,
               hide: function () { domClass.add(li, "lotusHidden"); },
               show: function () { domClass.remove(li, "lotusHidden"); },
               properties: this.properties,
               currentUser: this.currentUser || {},
               viewerActions: {
                  close: lang.hitch(this, "_close"),
                  showDetailsPanel: lang.hitch(this, "_showDetailsPanel")
               }
            };

            if (action.isValid(this.file, args)) {
               li = domConstruct.create("li", {
                  className: "ics-viewer-action " + action.getClassName()
               }, this.actionContainer);

               widget = action.create(args);

               widget.placeAt(li);
               this.lastAction = widget;
            }
         }, this);
      },

      _configNav: function () {
         var directions = ["previous", "next"];

         array.forEach(directions, function (direction) {
            var dom = direction;

            if (this.rtl) {
               dom = directions[1 - array.indexOf(directions, direction)];
            }

            if (this.file.paging[direction]) {
               html.set(this[dom + "Name"], this.file.paging[direction].args.name);
               domAttr.set(this[dom + "Image"], "alt", this.file.paging[direction].args.name);
               domClass.add(this[dom + "Icon"], util.getIconClass(this.file.paging[direction].args, 16));
               domAttr.set(this[dom + "Arrow"], "tabindex", 0);

               if (this.source === direction) {
                  setTimeout(lang.hitch(focus, "focus", this[dom + "Arrow"], 1));
               }
            } else {
               domClass.add(this[dom], "ics-viewer-nav-disabled");
            }
         }, this);
      },

      _renderLastUpdated: function () {
         var date = this.file.args.created,
            updated = this.file.args.updated,
            strings = this.nls.DATE.CREATED || this.nls.DATE.LAST_UPDATED,
            formatted;

         if (date.getTime() < updated.getTime()) {
            date = updated;
            strings = this.nls.DATE.LAST_UPDATED;
         }

         formatted = this.formatDateByAge(date, strings);

         this.htmlSubstitute(win.doc, this.lastUpdated, formatted, {
            user: lang.hitch(this, this._createUserLink, this.file.args.modifier)
         });
      },

      _createUserLink: function (user) {
         var userLink = domConstruct.create("span");
         domConstruct.create("span", {
            className: "x-lconn-userid",
            style: "display: none;",
            innerHTML: user.id
         }, userLink);

         if (!lang.isFunction(this.createPersonLink)) {
            userLink.appendChild(domConstruct.toDom(user.name));
         } else {
            userLink.appendChild(this.createPersonLink(user));

            if (lang.isFunction(this.attachBizCard)) {
               this.attachBizCard(userLink);
            }
         }

         return userLink;
      },

      _fixTabOrder: function () {
         on(this.firstFocusable, "keydown", lang.hitch(this, "_onKeyPressFirstFocusable"));

         query("body > *").forEach(function (el) {
            on(el, "focusin", lang.hitch(this, function (evt) {
               evt.preventDefault();
               focus.focus(this.firstFocusable);
            }));
         }, this);
      },

      _onKeyPressFirstFocusable: function (evt) {
         if (evt.keyCode === keys.TAB && evt.shiftKey) {
            evt.preventDefault();

            this.lastAction.focus();
            focus.focus(this.lastFocusable);
         }
      },

      _listenForKeys: function () {
         this.keyListener = on(win.body(), "keydown", lang.hitch(this, function (evt) {
            switch (evt.keyCode) {
            case keys.ESCAPE:
               this._close(evt);
               break;

            case keys.LEFT_ARROW:
               this._previous(evt);
               break;

            case keys.RIGHT_ARROW:
               this._next(evt);
               break;

            case keys.UP_ARROW:
            case keys.DOWN_ARROW:
            case keys.PAGE_UP:
            case keys.PAGE_DOWN:
               evt.stopPropagation();
               evt.preventDefault();
               break;
            }
         }));
      },

      _previous: function (evt) {
         evt.stopPropagation();
         this._page(this.ltr ? "previous" : "next");
      },

      _next: function (evt) {
         evt.stopPropagation();
         this._page(this.ltr ? "next" : "previous");
      },

      _page: function (direction) {
         if (this.file.paging[direction]) {
            this.keyListener.remove();
            this.open(this.file.paging[direction].id, direction);
         }
      },

      _close: function (evt) {
         if (evt) {
            evt.stopPropagation();
         }

         this.keyListener.remove();
         this.close();
      },

      _showDetailsPanel: function (show) {
         var func = show ? "add" : "remove";
         domClass[func](this.viewerContent, "ics-viewer-details-expanded");
      },
      _onError: function () {
         this.preview.destroy();
         this.preview = previews[previews.length - 1].create({file: this.file});
         this.preview.placeAt(this.previewContainer);
      }
   });
});
