/* Copyright IBM Corp. 2016  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Stream",
   "./Panel",
   "dojo/Stateful",
   "./VersionWidget",
   "dojo/_base/lang",
   "dojo/dom-class",
   "../data/util/routes",
   "../bean/FileAdapter",
   "../config/globals",
   "dojo/i18n!../nls/FileViewerStrings",
   "../util/ibmDocs",
   "../widget/NewVersionWidget",
   "../sbw/StatefulBackedTemplatedWidget",
   "dojo/topic",
   "dojo/dom-construct",
   "dojo/on",
   "dojo/_base/array",
   "dojo/date",
   "../util/fidoNewRelic",
   "dojo/dom-attr"
], function (declare, Stream, Panel, Stateful, VersionWidget, lang, domClass, routes, FileAdapter, globals, i18n, ibmDocs,
      NewVersionWidget, StatefulBackedTemplatedWidget, topic, domConstruct, on, array, date, fidoNewRelic, domAttr) {

   var versionPanelHandle;
  
   var NewVersion = declare([ StatefulBackedTemplatedWidget ], {
      templateString: '<div data-sbw-bind="permissions:style=display!_getDisplayStyle"></div>',

      postMixInProperties: function () {
         this.model = this.file;
      },

      postCreate: function () {
         this.inherited(arguments);
         this._renderUploadNewVersionLink();
         
         if(versionPanelHandle) {
           versionPanelHandle.remove();
         }
         
         versionPanelHandle = topic.subscribe("ic-fileviewer/panel/version", lang.hitch(this, function () {
           array.every(arguments, lang.hitch(this, function(actions){
             var actionName = "";
             
             if(actions[0] === "showNewVersionWidget") {
               actionName = "showNewVersionWidget";
               this._showNewVersionWidget();
             }
             
             if(actions.length > 1 && actionName != "") {
               topic.publish("ic-fileviewer/panel/version/"+actionName, actions.slice(1));
             }
           }));
         }));
      },
      
      _renderUploadNewVersionLink: function () {
         this.newVersionContainer = domConstruct.create("div", { style: "margin-bottom: 20px;" });
         this.newVersionWidget = new NewVersionWidget({
            file: this.file
         });
         this.newVersionLink = domConstruct.create("a", { href: "javascript:;", role: "button", innerHTML: i18n.UPLOAD_VERSION.LINK, className: "ics-viewer-upload-new-version" });

         domConstruct.place(this.newVersionLink, this.newVersionContainer);
         this.newVersionWidget.placeAt(this.newVersionContainer);
         this.newVersionWidget.hide();
         
         on(this.newVersionLink, "click", lang.hitch(this, "_showNewVersionWidget"));
         this.newVersionWidget.on("cancel", lang.hitch(this, "_hideNewVersionWidget"));
         this.newVersionWidget.on("uploaded", lang.hitch(this, "_newVersionUploaded"));
         this.newVersionWidget.on("error", lang.hitch(this, "_newVersionError"));
         
         domConstruct.place(this.newVersionContainer, this.domNode);
      },
      
      _showNewVersionWidget: function () {
         if (domAttr.has(this.newVersionLink, "disabled")) {
            return;
         }
         domClass.add(this.newVersionLink, "lotusHidden");
         domClass.remove(this.newVersionWidget.form, "lotusHidden");
         this.newVersionWidget.show();
         this.newVersionWidget.setupMessageBox();
         fidoNewRelic.track("uploadNewVersion");
      },
        
      _hideNewVersionWidget: function () {
         domClass.remove(this.newVersionLink, "lotusHidden");
         this.newVersionWidget.hide();
      },
        
      _newVersionUploaded: function (evt) {
         sessionStorage.setItem('/versionChanged/'+ this.file.id, true);
         this._hideNewVersionWidget();
         this.emit("uploaded", evt);
      },
      
      _newVersionError: function (err) {
         this.emit("error", err);
      },
       
      _getDisplayStyle: function (permissions) {
         return permissions.canEdit() ? "inherit" : "none";
      },

      // This is a workaround for a bug in IE11 when running in IE9 compatibility mode.  It should
      // be safe to remove once IE11 is running in native mode.
      onuploaded: function () {
         return;
      }
   });

   return declare([ Stateful ], {
      id: "version",
      urlParameterId: "versions",
      actions: ["restore", "delete", "download"],

      constructor: function () {
         this.nls = i18n.PANEL.VERSIONS;
         this.title = this.nls.TITLE;
         this.titleWithCount = this.nls.TITLE_WITH_COUNT;
         this.hideTitleCount = true;
      },

      _panelGetter: function () {
         return new Panel({factory: this});
      },
      
      renderContent: function (panel) {
         var versionStream = new Stream({
            file: this.file,
            dataKey: "versionFeed",
            entryConstructor: VersionWidget,
            factory: this,
            isActionValid: lang.hitch(this, "_isActionValid", this.file),
            requireFullFileEntry: true
         });

         var newVersionWidget = new NewVersion({ file: this.file });
         newVersionWidget.startup();
         newVersionWidget.placeAt(panel.content);

         newVersionWidget.on("uploaded", 
            lang.hitch(this, function (evt) {
               topic.publish("ic-fileviewer/dirty");
               topic.publish("ic-fileviewer/refresh");
               topic.publish("ic-fileviewer/push/messages", {
                  type: "success",
                  message: evt.message,
                  cancelable: true
               });
            })
         );
         
         newVersionWidget.on("error", function (err) {
            topic.publish("ic-fileviewer/push/messages", {
               type: "error",
               message: err.message,
               cancelable: true
            });
         });

         versionStream.placeAt(panel.content);

         var bean = FileAdapter(this.file);
         var versionsFeedLink = routes.getVersionListServiceUrl(this.file, {isPersonalFilesInCommunity: bean.isPersonalFilesInCommunity(this.file.get("location")), basicAuth: true, anonymous: bean.isPublic(), nonPersonal: true});
         panel.set("feedLink", versionsFeedLink);
         panel.set("feedLinkTitle", this.nls.FEED_TITLE);
         panel.set("feedText", this.nls.FEED_LINK);
         panel.set("feedDivClasses", "panelContent panelFeed");

      },

      _isActionValid: function (file, action, widget) {
         if (action === "download") {
            return true;
         }

         if (file.get("version") === widget.entry.get("version")) {
            return false;
         }

         var permissions = widget.entry.get("permissions"),
           isDocsFile = ibmDocs.isDocsFile(file);
         if (action === "restore") {
            return (!isDocsFile || (isDocsFile && ibmDocs.isRestoreEnabled())) && this.file.get("permissions").canEdit();
         } else if (action === "delete") {
            return permissions.Delete;
         }
         return false;
      }
   });
});
