/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2015, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

dojo.provide("ic-share.fileviewer.ConnectionsFileViewer");

dojo.require("lconn.core.util.html");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.auth");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.validation");
dojo.require("ic-core/config/features");
dojo.require("lconn.core.config.htmlClass");
dojo.require("lconn.core.config.features");
dojo.require("lconn.core.lcTextArea.widgets.BasicTextBox");
dojo.require("lconn.core.widget.mentions.MentionsDataFormatter");
dojo.require("lconn.core.PeopleTypeAhead");
dojo.require("lconn.core.PeopleDataStoreOpenSocial");
dojo.require("lconn.core.TypeAheadDataStore");
dojo.require("lconn.share.widget.TagTypeAhead");
dojo.require("lconn.share.util.Network");
dojo.require("lconn.share.util.configUtil");
dojo.requireLocalization("ic-share.fileviewer", "FileViewerStrings");
dojo.require("ic-share/fileviewer/FileViewer");
dojo.require("ic-core/util/connectionsUrlUtil");
dojo.require("dojo.Deferred");
dojo.require("lconn.core.auth");
dojo.require("com.ibm.lconn.layout.track");
dojo.require("lconn.core.DialogUtil");
dojo.require("lconn.core.upload.provider.HtmlFileProvider");
dojo.require("lconn.core.upload.data.File");

(function (ConnectionsFileViewer) {
   "use strict";

   var FileViewer = define._modules["ic-share/fileviewer/FileViewer"],
      i18n = dojo.getLocalization("ic-share.fileviewer", "FileViewerStrings"),
      etag,
      layer2Deferred,
      baseFilesConfigDeferred;

   /**
    * Opens the file viewer for a Connections file given only the file's ID.  This is the simplest API for consumers,
    * though not always the most efficient.
    *
    * @param fileId The ID of a Connections file as a string
    */
   ConnectionsFileViewer.openFromId = function (fileId, opts) {
      var viewer, id;

      viewer = ConnectionsFileViewer.create(opts);
      id = viewer.addFile(fileId);

      var deferred = new dojo.Deferred();

      viewer.on("success", function () {
        deferred.resolve(viewer);
      });

      viewer.on("error", function (error) {
        if (deferred.isFulfilled()) {
          return;
        }

        if (!opts || !opts.preventLoginRedirect) {
          if (viewer._args.isAuthenticated()) {
            if (error.code === "Unauthenticated") {
              showSessionExpiredDialog();
            }
          } else {
            if (error.code === "Unauthenticated" || error.code === "AccessDenied") {
              lconn.core.auth.login();
            }
          }
        }

        deferred.reject(error);
      });

      viewer.open(id);

      return deferred;
   };

   function showSessionExpiredDialog() {
     var strings = i18n.LOST_AUTHENTICATION_DIALOG;
     var prompt = dojo.string.substitute(strings.PROMPT, {lineBreaks: "<br/><br/>"});
     lconn.core.DialogUtil.prompt(strings.DIALOG_TITLE, prompt, strings.OK, strings.CANCEL, function (okSelected) {
       if (okSelected) {
         lconn.core.auth.login();
       }
     });
   }

   /**
    * Opens the file viewer for a Connections file URL.  At a minimum, the following URLs are supported:
    *
    * 1. Personal file details page URLs
    * 2. Community file details page URLs
    * 3. File download URLs
    *
    * @param url A Connections file URL as a string
    */
   ConnectionsFileViewer.openFromUrl = function (url, opts) {
      var id = define._modules["ic-core/util/connectionsUrlUtil"].getFileId(url);
      ConnectionsFileViewer.openFromId(id, opts);
   };

   ConnectionsFileViewer.create = function (inputs) {
      var args = {},
         people = dojo.getObject("com.ibm.lconn.layout.people"),
         semTagSvc = dojo.getObject("SemTagSvc");

      if (!inputs) {
         inputs = {};
      }

      if (inputs.createPersonLink) {
         args.createPersonLink = inputs.createPersonLink;
      } else if (people) {
         args.createPersonLink = function (person) {
            return people.createLink(person);
         };
      }

      if (inputs.createPersonPhotoLink) {
         args.createPersonPhotoLink = inputs.createPersonPhotoLink;
      }

      if (inputs.previewOptions) {
         args.previewOptions = inputs.previewOptions;
      }

      if (semTagSvc) {
         args.attachBizCard = function (node) {
            dojo.addClass(node, "vcard");
            dojo.addClass(node, "bidiAware");
            semTagSvc.onTagChanged(node, true);
         };
      }

      args.formatDateByAge = function (date, strings) {
         var dateFormat = new lconn.share.util.DateFormat(date);
         return dateFormat.formatByAge(strings);
      };

      var fileSizeStrings = dojo.i18n.getLocalization("ic-share.fileviewer", "FileViewerStrings").FILE_SIZE;
      // TODO: Remove once translated
      if (!fileSizeStrings.B) {
        fileSizeStrings.B = "${0} B";
        fileSizeStrings.KB = "${0} KB";
        fileSizeStrings.MB = "${0} MB";
        fileSizeStrings.GB = "${0} GB";
        fileSizeStrings.TB = "${0} TB";
      }

      dojo.mixin(args, {
         login: lconn.core.auth.login,
         htmlSubstitute: lconn.core.util.html.substitute,
         isAuthenticated: lconn.core.auth.isAuthenticated,
         formatSize: dojo.partial(lconn.share.util.text.formatSize, fileSizeStrings),
         properties: lconn.core.config.properties,
         currentUser: inputs.currentUser || lconn.core.auth.getUser() || {},
         TextBoxWidget: lconn.core.lcTextArea.widgets.BasicTextBox,
         MentionsDataFormatter: lconn.core.widget.mentions.MentionsDataFormatter,
         PeopleTypeAhead: lconn.core.PeopleTypeAhead,
         HybridPeopleDataStoreOpenSocial: lconn.core.HybridPeopleDataStoreOpenSocial,
         TypeAheadDataStore: lconn.core.TypeAheadDataStore,
         TagTypeAhead: lconn.share.widget.TagTypeAhead,
         pickerAuth: lconn.core.auth,
         coreServices: lconn.core.config.services,
         coreUrl: lconn.core.url,
         network: lconn.share.util.Network,
         textUtil: lconn.share.util.text,
         validationUtil: lconn.share.util.validation,
         configUtil: lconn.share.util.configUtil,
         tracker: com.ibm.lconn.layout.track,
         loadCurrentUser: inputs.loadCurrentUser,
         tornOff: !!inputs.tornOff,
         isIframePage: !!inputs.isIframePage,
         shareLink: inputs.shareLink,
         baseFilesConfig: getBaseFilesConfig(),
         layer2: function () {
            if (layer2Deferred) {
              return layer2Deferred;
            }

            layer2Deferred = new dojo.Deferred();

            net.jazz.ajax.xdloader.batch_load_async([
               "lconn.files.FilesRoutes",
               "lconn.files.comm.Routes",
               "lconn.files.action.impl.AddToCollection",
               "lconn.files.action.impl.MoveToCollection",
               "lconn.files.action.impl.CopyFile",
               "lconn.files.action.impl.TransferFile",
               "lconn.files.util.LibraryDataStore",
               "lconn.files.util.TagDataStore",
               "lconn.files.util.HtmlMessage"
            ], function () {
               layer2Deferred.resolve({
                  pickerRoutes: dojo.getObject("lconn.files.FilesRoutes"),
                  commRoutes: dojo.getObject("lconn.files.comm.Routes"),
                  addToCollection: dojo.getObject("lconn.files.action.impl.AddToCollection"),
                  moveToCollection: dojo.getObject("lconn.files.action.impl.MoveToCollection"),
                  copyFileAction: dojo.getObject("lconn.files.action.impl.CopyFile"),
                  transferFileAction: dojo.getObject("lconn.files.action.impl.TransferFile"),
                  LibraryDataStore: dojo.getObject("lconn.files.util.LibraryDataStore"),
                  TagDataStore: dojo.getObject("lconn.files.util.TagDataStore"),
                  pickerNLS: dojo.i18n.getLocalization("lconn.files", "ui")
               });
            });

            return layer2Deferred;
         }
      });

      args.policy = inputs.policy || {};
      args.showErrorInOverlay = inputs.showErrorInOverlay;
      args.linkTarget = inputs.linkTarget;
      args.openedFromFileViewerEverywhere = inputs.openedFromFileViewerEverywhere;
      if (inputs.showDetailsExternalAction) {
         args.showDetailsExternalAction = inputs.showDetailsExternalAction;
      }
      return FileViewer.create(args);
   };

   ConnectionsFileViewer._openForFiles = function (inputs) {
      var viewer = ConnectionsFileViewer.create(inputs),
         initialId;

      dojo.forEach(inputs.allFiles || [ inputs.initialFile ], function (file) {
         if (!file.isFolder()) {
            try {
              file._urlDetails = lconn.core.url.ensureQualified(inputs.getUrlForPersonalFileInCommunity(file));
            } catch (e) {
            }

            if (inputs.showDetailsExternalAction) {
               file.showDetailsExternalAction = inputs.showDetailsExternalAction;
            }

            var id = viewer.addFile(FileViewer.createConnectionsFile(file));

            if (inputs.initialFile.getId() === file.getId()) {
               initialId = id;
            }
         }
      });

      viewer.open(initialId);
      var bidiUtil = dojo.getObject("lconn.core.globalization.bidiUtil");
      if (bidiUtil) {
      	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(viewer.impl.domNode);
      }
   };

   function getEtag() {
      // This probably isn't the best solution
      // and by "probably" I mean "definitely"
      if (!etag) {
         var groups = /etag=([^&]+)/.exec(dojo.getObject("net.jazz.ajax.config.params"));
         etag = (groups && groups[1]) || "17";
      }

      return etag;
   }

   function getBaseFilesConfig() {
     if (baseFilesConfigDeferred) {
       return baseFilesConfigDeferred;
     }

     if (window._lconn_files_config) {
       baseFilesConfigDeferred = dojo.when(window._lconn_files_config);
     } else {
       // TODO We'll need to confirm with the Files team that this is a valid solution
       baseFilesConfigDeferred = dojo.xhrGet({
         url: "/files/static/" + getEtag() + "!en-us/iwidgets/CommunityReferentialWidget/core.js",
         handleAs: "javascript"
       }).then(function () {
         return window._lconn_files_config;
       });
     }

     return baseFilesConfigDeferred;
   }

   if (!window._fidoStylesLoaded) {
      setTimeout(function () {
         var webresourcesUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.webresources);

         dojo.create("link", {
            rel: "stylesheet",
            href: webresourcesUrl + "/web/_style?include=ic-share.fileviewer.style.connections.css&etag=" + getEtag()
         }, document.getElementsByTagName("head")[0]);
         
         /*
         if (window.ui && window.ui._check_ui_enabled()) {
        	 var css = dojo.byId('fileviewer_cnx8_css');
        	 var cssPath = "/files/v8/fileViewer.css";
        	 var isCSSExist = css && css.href && css.href.includes(cssPath);
        	 if (!isCSSExist) {
            	 dojo.create("link", {
                     rel: "stylesheet",
                     id: "fileviewer_cnx8_css",
                     href: cssPath
                 }, document.getElementsByTagName("head")[0]);
			 }
         }*/
      }, 1);
   }

   dojo.getObject("lconn.share.fileviewer", true);
   lconn.share.fileviewer.ConnectionsFileViewer = ConnectionsFileViewer;
}(window["ic-share"].fileviewer.ConnectionsFileViewer));