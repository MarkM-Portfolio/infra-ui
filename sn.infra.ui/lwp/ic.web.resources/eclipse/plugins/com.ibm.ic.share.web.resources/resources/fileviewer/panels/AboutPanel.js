/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/AboutPanel.html",
  "dojo/when",
  "dojo/_base/array",
  "dojo/date",
  "dojo/Deferred",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/_base/lang",
  "dojo/on",
  "../preview/util",
  "../util/DateFormat",
  "dojo/i18n!../nls/FileViewerStrings",
  "./Stream",
  "../widget/TagWidget",
  "dojo/string",
  "dojo/dom-style",
  "../widget/ExpandableText",
  "./DropdownStream",
  "./NameWidget",
  "../action/EditDescriptionAction",
  "../action/EditTagsAction",
  "../widget/FileNameVersion",
  "dojo/promise/all",
  "../widget/ThumbnailWidget",
  "dojo/topic",
  "../widget/FileState",
  "../config/globals",
  "dojo/dom-attr"
  ], function (declare, _WidgetBase, _TemplatedMixin, template, when, array, date, Deferred, domClass, domConstruct,
    lang, on, util, DateFormat, i18n, Stream, TagWidget, string, domStyle, ExpandableText, DropdownStream,
    NameWidget, EditDescriptionAction, EditTagsAction, FileNameVersion, all, ThumbnailWidget, topic, FileState, globals, domAttr) {

  return declare([ _WidgetBase, _TemplatedMixin ], {
    templateString : template,
    
    _tagWidget: TagWidget,

    postMixInProperties : function () {
      this.nls = i18n.PANEL.ABOUT;

      //TODO @translation@
      this.nls.DOWNLOADS_COUNT = "${downloads}";

      if (!this.nls.DOWNLOADS_COUNT_FULL) {
        this.nls.DOWNLOADS_COUNT_FULL = "${downloads} - ${anonymousDownloads} anonymously";
      }

      this._watches = [];
    },

    postCreate : function () {
      all(this._getPromises()).then(lang.hitch(this, this.render));
    },
    
    _getPromises: function () {
      var promises = {
        fullEntry: this.file.get("fullEntry")
      };
      
      if (this.file.get("isDocsFile")) {
        promises.docsDraftInfo = this.file.getDocsDraftInfo();
      }
      
      return promises;
    },
    
    startup: function () {
      this.inherited(arguments);
      
      if (this._descriptionWidget) {
        this._descriptionWidget.startup();
      }
    },
    
    destroy: function () {
      array.forEach(this._watches, function (watch) {
        watch.unwatch();
      }, this);
      
      this.inherited(arguments);
    },

    render : function (data) {
      //TODO Is this line necessary? I do not see any custom attribute getters/setters for this class or the factory
      this.set("fileName", this.fileName);
      domClass.remove(this.domNode, "loading");

      var widgetArgs, widget, dateFormatter;

      // version
      widgetArgs = {
        baseClasses : "metadata metadata2"
      };
      widget = new this.entryConstructor({
        entry : widgetArgs,
        actions : this.factory.actions
      });
      var fileState = new FileState({ file: this.file });
      fileState.placeAt(widget.contentNode);
      widget.placeAt(this.versionContainer);
      
      this._watches.push(this.file.attachWatch("version", lang.hitch(this, function (widget) {
        widget.set("h1", string.substitute(this.nls.CURRENT_VERSION_HEADER, {
          versionNumber: this.file.get("version")
        }));
      }, widget)));
      
      // Dates
      this._renderDates(data);
      this._watches.push(this.file.watch("dateModified", lang.hitch(this, function (name, oldValue, value) {
        if (date.compare(oldValue, value) !== 0) {
          all(this._getPromises()).then(lang.hitch(this, this._renderDates));
        }
      })));

      // Description
      widgetArgs = {
        baseClasses : "metadata description",
        h1 : this.nls.DESCRIPTION_HEADER,
        content: this.file.get("summary")
      };
      widget = this._descriptionWidget = new this.entryConstructor({
        entry : widgetArgs,
        actions : this.factory.actions,
        headerAction: EditDescriptionAction,
        file: this.file,
        visibleContentLines: 3
      });
      
      domAttr.set(widget.header1Action, "alt", i18n.ACTION.EDIT_DESCRIPTION.TOOLTIP);
      domAttr.set(widget.header1Action, "title", i18n.ACTION.EDIT_DESCRIPTION.TOOLTIP);

      this._addHeaderActionLink(widget, this.nls.ADD_DESCRIPTION, this.nls.NO_DESCRIPTION);
      
      widget.placeAt(this.descriptionContainer);

      // likes
      widgetArgs = {
        baseClasses : "metadata metadata2",
        h1 : this.nls.LIKES_HEADER,
        h2 : this.file.get("recommendations") + "",
        isRecommendations: true
      };
      widget = new DropdownStream({
        entry : widgetArgs,
        file: this.file,
        dataKey : "recommendationFeed",
        entryConstructor: NameWidget
      });
      widget.placeAt(this.likesContainer);

      // downloads
      var downloadInfo = this.file.get("currentUserDownloadInfo");
      var downloadHeader = "", downloadLastVersion;
      if(this.nls.DOWNLOADS_HEADER_MORE && this.file.hasDownloadInfo() && globals.isAuthenticated) {
        if(this.file.hasDownloaded() && this.file.hasDownloadedLatest()
          || this.file.get("modifier").id === globals.currentUser.id) {
          downloadHeader = string.substitute(this.nls.DOWNLOADS_HEADER_MORE, {0: this.nls.DOWNLOADS_LATEST_VERSION});
        } else if(this.file.hasDownloaded()) {
          downloadLastVersion = string.substitute(this.nls.DOWNLOADS_LAST_VERSION, {0: downloadInfo.versionNumber});
          downloadHeader = string.substitute(this.nls.DOWNLOADS_HEADER_MORE, {0: downloadLastVersion});
        }
      }
      if (!downloadHeader) {
        downloadHeader = this.nls.DOWNLOADS_HEADER;
      }

      widgetArgs = {
        baseClasses : "metadata metadata2",
        h1 : downloadHeader,
        h2 : (this.file.downloadsAnonymous == 0) ? string.substitute(this.nls.DOWNLOADS_COUNT, {
          downloads: this.file.downloads          
        }) : string.substitute(this.nls.DOWNLOADS_COUNT_FULL, {
          downloads: this.file.downloads,
          anonymousDownloads: this.file.downloadsAnonymous
        }),
        isDownloads: true,
        entryArgs: {
           showDownloadInfo: true
        }
      };
      widget = new DropdownStream({
        entry : widgetArgs,
        file: this.file,
        dataKey : "downloadInfoFeed",
        entryConstructor: NameWidget
      });
      widget.placeAt(this.downloadsContainer);

      // tags
      widgetArgs = {
        baseClasses : "metadata tags",
        h1 : this.nls.TAGS_HEADER
      };
      var tags = new this.entryConstructor({
        entry : widgetArgs,
        actions : this.factory.actions,
        headerAction : EditTagsAction,
        file : this.file
      });
      tags.placeAt(this.tagsContainer);
      tags.startup();
      
      domAttr.set(tags.header1Action, "alt", i18n.TAG_WIDGET.EDIT_TAGS);
      domAttr.set(tags.header1Action, "title", i18n.TAG_WIDGET.EDIT_TAGS);
      tags.set("content", new this._tagWidget({file: this.file, entryWidget: tags}));

      this._addHeaderActionLink(tags, this.nls.ADD_TAGS, this.nls.NO_TAGS);

      // filesize
      this._renderFileSize();
      this._watches.push(this.file.watch("size", lang.hitch(this, "_renderFileSize", true)));
      this._watches.push(this.file.watch("totalSize", lang.hitch(this, "_renderFileSize", true)));
      this._watches.push(this.file.watch("versionCount", lang.hitch(this, "_renderFileSize", true)));
      
      // Security
      if(this.file.get("isEncrypted")) {
    	  widgetArgs = {
	        baseClasses : "metadata security",
	        h1 : this.nls.SECURITY,
	        h2 : this.nls.FILE_ENCRYPTED
	      };
    	  widget = new this.entryConstructor({
	        entry : widgetArgs,
	        actions : this.factory.actions
	      });
	      widget.placeAt(this.securityContainer);
      }
      
      // Links
      widgetArgs = {
        baseClasses : "metadata metadata2",
        h1 : this.nls.LINKS_HEADER,
        h2 : this.nls.GET_LINKS,
        links: this.file.links,
        file: this.file
      };
      widget = new this.entryConstructor({
        entry : widgetArgs,
        actions : this.factory.actions
      });
      widget.placeAt(this.linksContainer);
      
      // Thumbnail
      if (ThumbnailWidget.isValid(this.file) && this.file.get("permissions").canEdit()) {
         this._renderChangeThumbnailLink();
      }
    },
    
    _renderFileSize: function (redraw) {
       if (redraw) {      
          domConstruct.empty(this.filesizeContainer);
          this.filesizeWidget.destroy();
          this.filesizeWidget = undefined;
       }
       
       var widget, widgetArgs;
       if(this.file.versionCount > 1) {
          widgetArgs = {
            baseClasses : "metadata",
            h1 : this.nls.FILE_SIZE_HEADER,
            h2 : string.substitute(this.nls.CURRENT_VERSION_FILE_SIZE, {fileSize: globals.formatFileSize(parseInt(this.file.size))}),
            h3 : string.substitute(this.nls.ALL_VERSIONS_FILE_SIZE, {fileSize: globals.formatFileSize(parseInt(this.file.totalSize))})
          };
        } else {
          widgetArgs = {
            baseClasses : "metadata metadata2",
            h1 : this.nls.FILE_SIZE_HEADER,
            h2 : util.formatFileSize(parseInt(this.file.totalSize))
          };
        }
        widget = this.filesizeWidget = new this.entryConstructor({
          entry : widgetArgs,
          actions : this.factory.actions
        });
        widget.placeAt(this.filesizeContainer);
    },
    
    _renderChangeThumbnailLink: function () {
       this.thumbnailDiv = domConstruct.create("div");
       this.thumbnailWidget = new ThumbnailWidget({ file: this.file });
       this.changeThumbnailLink = domConstruct.create("a", { href: "javascript:;", role: "button", innerHTML: i18n.THUMBNAIL.CHANGE_LINK });

       domConstruct.place(this.changeThumbnailLink, this.thumbnailDiv);
       this.thumbnailWidget.placeAt(this.thumbnailDiv);
       this.thumbnailWidget.hide();
       
       on(this.changeThumbnailLink, "click", lang.hitch(this, "_showThumbnailWidget"));
       this.thumbnailWidget.on("cancel", lang.hitch(this, "_hideThumbnailWidget"));
       this.thumbnailWidget.on("uploaded", lang.hitch(this, "_thumbnailUploaded"));
       this.thumbnailWidget.on("error", lang.hitch(this, "_thumbnailError"));
       
       var widgetArgs = {
         baseClasses : "metadata metadata2",
         h1 : i18n.THUMBNAIL.TITLE,
       };
       var widget = new this.entryConstructor({
         entry : widgetArgs,
         actions : this.factory.actions
       });
       domConstruct.place(this.thumbnailDiv, widget.h2Node);
       widget.placeAt(this.thumbnailContainer);   
    },
    
    _showThumbnailWidget: function () {
        domClass.add(this.changeThumbnailLink, "lotusHidden");
        this.thumbnailWidget.show();
    },
    
    _hideThumbnailWidget: function () {
    	domClass.remove(this.changeThumbnailLink, "lotusHidden");
        this.thumbnailWidget.hide();
    },
    
    _thumbnailUploaded: function (evt) {
      topic.publish("ic-fileviewer/dirty", {});
      this._hideThumbnailWidget();
      topic.publish("ic-fileviewer/push/messages", {
        type: "success",
        message: evt.message,
        cancelable: true
      });
    },
     
     _thumbnailError: function (err) {
       topic.publish("ic-fileviewer/push/messages", {
         type: "error",
         message: err.message,
         cancelable: true
        });
      },
    
    _renderDates: function (data) {
      // docs draft updated
      this._renderDocsDraftUpdatedDate(data);

      var dateFormatter, widgetArgs, widget, isUpdated;
      
      isUpdated = this.file.get("dateModified").getTime() !== this.file.get("dateCreated").getTime();
      
      // updated
      domConstruct.empty(this.updatedDateContainer);
      if (isUpdated) {
        dateFormatter = new DateFormat(this.file.get("dateModified"));
        widgetArgs = {
          baseClasses : "metadata metadataIcon",
          h1 : this.file.get("isDocsFile") ? this.nls.DOCS_UPDATED_HEADER : this.nls.UPDATED_HEADER,
          h3 : dateFormatter.formatByAge(i18n.DATE.SHORT),
          iconSource : this.file.author.id
        };
        widget = new this.entryConstructor({
          entry : widgetArgs,
          actions : this.factory.actions,
          usernameMaxWidth: 237
        });
        widget.setUserName(this.file.get("modifier"), widget.h2Node);
        widget.setUserImage(this.file.get("modifier"));
        widget.placeAt(this.updatedDateContainer);
      }

      // created
      domConstruct.empty(this.createdDateContainer);
      if (!this.file.get("isDocsFile") || !isUpdated) {
        dateFormatter = new DateFormat(this.file.get("dateCreated"));
        widgetArgs = {
          baseClasses : "metadata metadataIcon",
          h1 : this.nls.CREATED_HEADER,
          h3 : dateFormatter.formatByAge(i18n.DATE.SHORT)
        };
        widget = new this.entryConstructor({
          entry : widgetArgs,
          actions : this.factory.actions,
          usernameMaxWidth: 237
        });
        widget.setUserName(this.file.get("author"), widget.h2Node);
        widget.setUserImage(this.file.get("author"));
        widget.placeAt(this.createdDateContainer);
      }
    },
    
    _renderDocsDraftUpdatedDate: function (data) {
      if (!data.docsDraftInfo || !this.file.get("isDocsFile") || !this.file.get("permissions").canEdit()) {
        return;
      }
      
      var docsDraftInfo, dateModified, dateCreated, isChange, dateFormatter, widgetArgs, widget;
      docsDraftInfo = data.docsDraftInfo;
      dateModified = docsDraftInfo.get("dateModified");
      dateCreated = docsDraftInfo.get("dateCreated");
      isChanged = date.compare(dateModified, dateCreated) !== 0;
      
      domConstruct.empty(this.docsDraftUpdatedDateContainer);

      if (date.compare(docsDraftInfo.get("dateModified"), this.file.get("dateModified")) <= 0) {
         return;
      }

      dateFormatter = new DateFormat(docsDraftInfo.get("dateModified"));
      widgetArgs = {
        baseClasses : "metadata metadataIcon",
        h1 : isChanged ? this.nls.DOCS_DRAFT_UPDATED_HEADER : this.nls.DOCS_DRAFT_CREATED_HEADER,
        h3 : dateFormatter.formatByAge(i18n.DATE.SHORT),
        iconSource : this.file.author.id
      };
      widget = new this.entryConstructor({
        entry : widgetArgs,
        actions : this.factory.actions,
        usernameMaxWidth: 237
      });
      widget.setUserName(docsDraftInfo.get("lastEditor"), widget.h2Node);
      widget.setUserImage(docsDraftInfo.get("lastEditor"));
      widget.placeAt(this.docsDraftUpdatedDateContainer);
    },
    
    _addHeaderActionLink: function (widget, validText, invalidText) {
      widget.on("headeractionplaced", lang.hitch(this, function (widget, e) {
        if (e.isValid) {
          var a = domConstruct.create("a", {href: "javascript:;", role: "button", innerHTML: validText});
          on(a, "click", e.execute);
          widget.set("h2", a);
        } else {
          widget.set("h2", invalidText);
        }
      }, widget));
    }
  });
});
