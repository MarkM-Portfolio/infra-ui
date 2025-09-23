/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/SharingPanel.html",
  "dojo/i18n!../nls/FileViewerStrings",
  "./ShareLinkWidget",
  "../section/ShareSection",
  "./SharingWidget",
  "./DropdownStream",
  "../widget/ShareFolder",
  "../widget/ShareOptions",
  "../widget/ShareWithLink",
  "../action/MultiShareAction",
  "../config/globals",
  "dojo/dom-style",
  "./EntryWidget",
  "dojo/string",
  "dojo/_base/array",
  "dojo/dom-construct",
  "dojo/dom-class",
  "dojo/topic",
  "ic-core/config/features"
], function (declare, lang, _WidgetBase, _TemplatedMixin, template, i18n, ShareLinkWidget, ShareSection, SharingWidget,
    DropdownStream, ShareFolder, ShareOptions, ShareWithLink, MultiShareAction, globals, domStyle, EntryWidget, string, array,
    domConstruct, domClass, topic, features) {
  "use strict";

  var itemsWatchHandle, selectPanelHandle;
  
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    postMixInProperties: function () {
      this.nls = i18n.PANEL.SHARING;
    },

    postCreate: function () {
      var self = this;

      globals.layer2().then(function () {
        self.file.get("fullEntry").then(function () {
          self.render();
        });
      });
    },
    
    render: function () {
      var shareSection, shareFolder;

      if (this.file.get("libraryType") !== "personalFiles") {
        domClass.add(this.domNode, "community-file");
      }

      if (this.file.get("visibility") === "public") {
//        this._addPublicNotice(); // Removing for D40 per UX
      }
      
      this.file.watch("visibility", lang.hitch(this, function (name, oldValue, value) {
        domConstruct.empty(this.publicNoticeContainer);
        if (value === "public") {
//          this._addPublicNotice(); // Removing for D40 per UX
        }
      }));
      
      if (MultiShareAction.isValid(this.file, {})) {
       var multiShare = this.multiShare = MultiShareAction.create({
          panelDomNode: this.domNode,
          file: this.file,
          dataKey: "sharingFeed",
          permission: "View",
          isMulti: true,
          refreshPanel: lang.hitch(this, this._refresh)
        });
        
        multiShare.placeAt(this.multiAddContainer);
      } else {
        domStyle.set(this.multiAddContainer, "display", "none");
      }

      shareSection = this.shareSection = new ShareSection({
        file: this.file,
        dataKey: "sharingFeed",
        entryConstructor: SharingWidget,
        factory: this.factory,
        refreshPanel: lang.hitch(this, this._refresh)
      });

      shareSection.placeAt(this.permissionsSharingContainer);
      shareSection.startup();

      shareFolder = this._shareFolder = new ShareFolder({
        file: this.file,
        dataKey: "collectionSharingFeed",
        entryConstructor: SharingWidget,
        factory: this.factory,
        refreshPanel: lang.hitch(this, this._refresh)
      });

      shareFolder.placeAt(this.folderSharingContainer);

      if (this.file.get("libraryType") === "personalFiles") {
        this._addShareLinksWidget();
      }

      if (this.file.get("libraryType") !== "communityFiles") {
        this._shareOptions = new ShareOptions({
          file: this.file,
          factory: this.factory,
          refreshCallback: lang.hitch(this, this._refresh)
        });

        this._shareOptions.placeAt(this.domNode);
        this._shareOptions.startup();
      }

      if (selectPanelHandle) {
         selectPanelHandle.remove();
      }

      selectPanelHandle = topic.subscribe('ic-fileviewer/panel/share', lang.hitch(this, function (args) {
        if (args[0] === "multiShare" && this.multiShare) {
          this.multiShare.setupAdd(args[1]);
        }
      }));
      
      if(features("files-enable-file-share-with-link") && this.file.get("permissions").canGrantShareLink()) {
         this._shareWithLink = new ShareWithLink({
            file: this.file
        });
        this._shareWithLink.placeAt(this.domNode);
        this._shareWithLink.startup();
      }
    },

    _addPublicNotice: function () {
      if (!i18n.SHARE.PUBLIC) { // This can be removed in D41
        return;
      }
      
      var notice = i18n.SHARE.PUBLIC.LONG.GENERIC,
        widget;

      if (this.file.get("orgName")) {
        notice = string.substitute(i18n.SHARE.PUBLIC.LONG.ORG, {
          org: this.file.get("orgName")
        });
      }

      widget = new EntryWidget({
        h1: i18n.SHARE.PUBLIC.SHORT,
        h2: notice,
        baseClasses: "metadata metadata2"
      });

      widget.set("header2Tooltip", notice);
      widget.placeAt(this.publicNoticeContainer);
    },

    _addShareLinksWidget: function () {
      this._shareLinksWidget = new DropdownStream({
        entry: {h1: this.nls.SEE_WHO_HAS_SHARED},
        file: this.file,
        dataKey: "shareLinksFeed",
        entryConstructor: ShareLinkWidget
      });
      this._shareLinksWidget.placeAt(this.shareLinksContainer);
      this._shareLinksWidget.startup();

      if (this.shareSection.sharedWithUsers) {
        domStyle.set(this._shareLinksWidget.domNode, "display", "");
      } else {
        domStyle.set(this._shareLinksWidget.domNode, "display", "none");
      }
      
      if(itemsWatchHandle) {
        itemsWatchHandle.unwatch();
      }
      
      itemsWatchHandle = this.factory.watch("_items", lang.hitch(this, function (name, oldValue, newValue) {
        if(oldValue !== newValue) {
          this._setShareLinkVisibility(newValue);
          this._shareLinksWidget.reset();
        }
      }));
    },
    
    _setShareLinkVisibility: function(items) {
      var isSharedWithUser = array.some(items, function (item) {
        return item.get("type") === "user";
      });
      
      if (isSharedWithUser) {
        domStyle.set(this._shareLinksWidget.domNode, "display", "");
      } else {
        domStyle.set(this._shareLinksWidget.domNode, "display", "none");
      }
    },

    _refresh: function () {
      if (this.shareSection) {
        this.shareSection.refresh();
      }

      if (this._shareFolder) {
        this._shareFolder.refresh();
      }

      if (this._shareOptions) {
        this._shareOptions.refresh();
      }
    }
  });
});
