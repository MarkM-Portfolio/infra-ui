/* Copyright IBM Corp. 2015, 2016  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./EntryWidget",
  "../dialog/SharingDialog",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "../config/globals",
  "dojo/_base/array",
  "../data/util/routes",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/_base/lang",
  "dojo/dom-attr",
  "dojox/html/entities",
  "../util/html",
  "../svg/svgHelper",
  "ic-core/config/features"
], function (declare, EntryWidget, SharingDialog, i18n, string, globals, array, routes, domConstruct, domStyle, lang, domAttr, entities,
    htmlUtil, svgHelper, features) {

  return declare([ EntryWidget ], {
    postMixInProperties: function () {
      var promptKey, visibility;
      var pictureUrl = this.getPictureUrl();

      this.baseClasses = "share";
      this.reloadItem = true;
      this.DialogFactory = SharingDialog;
      
      this.org = this.file.get("orgName");
      this.publicLong = (this.org === undefined) ? i18n.SHARE.PUBLIC.LONG.GENERIC : string.substitute(i18n.SHARE.PUBLIC.LONG.ORG, {
        org: this.org
      });
      this.publicShort = i18n.SHARE.PUBLIC.SHORT;

      if (this.entry.get("permission") === "Owner" || this.getDeletePermission()) {
        this.baseClasses += " unremovable";
      }

      this.type = this.entry.get("type");
      this.libraryType = "";
      if (this.file) {
         this.libraryType = this.file.get("libraryType");  
      }

      if (this.type === "folder") {
        visibility = this.entry.get("visibility");
        if (array.indexOf(["private", "shared", "public"], visibility) > -1) {
          this.baseClasses += " " + visibility;
        }
        this._setFolderVisibility(visibility);
      } else if (this.type === "community" && this.libraryType === "communityFiles") {
         if (this.entry.get("visibility")){
            this.baseClasses += " community";
         }
         this._setFolderVisibility("community");
      } else if (this.type !== "community") {
        this.iconSource = (pictureUrl + this.entry.get("id")) || "";
      }

      if (this.type === "everyone") {
        this.h1 = this.tooltip = this.publicLong;
      } else {
        this.h1 = this.tooltip = this.entry.get("name") || this.entry.get("title") || this.entry.get("type") || "";
      }
      this.h2 = this.entry.get("permission");
      this.h3 = "";
      this.content = this.entry.get("content") || "";
      this.footer = ("Version " + this.entry.get("version")) || "";

      switch (this.entry.get("type")) {
      case "everyone":
        promptKey = "REMOVE_EVERYONE";
        this.baseClasses += " everyone";
        break;

      case "user":
        promptKey = "REMOVE_USER";
        this.baseClasses += " user";
        break;

      case "community":
        if (this.libraryType === "communityFiles" && this.entry.get("permission") !== "Owner") {
           promptKey = "REMOVE_FOLDER";
           this.baseClasses += " folder";
        } else {
           promptKey = "REMOVE_COMMUNITY";
           this.baseClasses += " community";
        }
        break;

      case "folder":
        promptKey = "REMOVE_FOLDER";
        this.baseClasses += " folder";
        break;

      default:
        if (this.entry.get("type")) {
          this.baseClasses += " " + this.entry.get("type");
        }
      }

      this.dialogArgs = {
        type: this.entry.get("type"),
        promptKey: promptKey,
        name: this.entry.get("name") || this.entry.get("title")
      };

      this.inherited(arguments);
    },
    
    postCreate: function () {
      this.inherited(arguments);
      domAttr.set(this.h1Node, "title", this.tooltip);
      if (this.type === "user" || this.type === "Owner") {
        domConstruct.empty(this.h1Node);
        this.setUserName(this.entry, this.h1Node);
        if (!lang.isFunction(globals.createPersonPhotoLink)) {
          this.iconLinkNode.setAttribute("target", "_blank");
        } else {
          var personPhotoLink = globals.createPersonPhotoLink(this.entry);
          if (personPhotoLink) {
            this.set("iconSource", personPhotoLink.firstChild.src);
          }
          domStyle.set(this.iconLinkNode, "display", "none");
          this.iconNodeContainer.appendChild(personPhotoLink);
        }
      } else if ((this.type === "folder") || ((this.type === "community") && (this.libraryType === "communityFiles") && this.entry.get("permission") !== "Owner")) {
         domConstruct.empty(this.h1Node);
         this.setFolderName(this.entry, this.h1Node);
         this._setFolderIcon();
      } else if (this.type === "community") {
         domConstruct.empty(this.h1Node);
         this.setCommunityName(this.entry, this.h1Node);
         this._setFolderIcon();
      } else if (this.type === "everyone") {
         this.set("iconLinkTitle", this.publicShort);
      } else if ((this.libraryType === "personalFiles") && (globals.currentUser.id !== this.file.author.id)) {
        domStyle.set(this.removeAction, "display", "none");
      }
    },

    _setFolderVisibility: function(visibility) {
      this.folderVisibility = visibility+"Folder";
    },
    
    _setFolderIcon: function() {
      if(features("files-enable-new-folder-icon")) {
        var svghelper = new svgHelper();
        this.updateIconContainerNode(svghelper.loadIcon, this.folderVisibility);
      }
    },
    getDeletePermission: function () {
      var addedBy = this.entry.get("td:addedBy"),
      addedById = addedBy ? addedBy["snx:userid"] : null;
      
      if (this.isTemporary) {
        return false;
      }
      
      if (this.entry.isCollection()) {
         return this.canDeleteFolder(addedById);
      }

      if (this.entry.get("role") === "manager" || 
            (globals.currentUser.id === addedById && this.entry.get("role") === "contributor")) {
         return false;
      }

      // this.myShares could be turned into dictionary with <target.id, target> pair
      // for improved efficiency
      if(this.file.myShares && this.file.myShares.length > 0) {
        if (array.some(this.file.myShares, lang.hitch(this, function(entry){
          return this.entry.id == entry.id; }))) {
          this.entry.isPersonalShare = true;
          return false;
        }
      }
      
      if (this.file.get("permissions")._permissions) {
        return !this.file.get("permissions").canDelete();
      }

      if (!this.file.get("canOthersShare") && (globals.currentUser.id !== this.file.get("author").id)) {
        return true;
      }

      return true;
    },

    canDeleteFolder: function (addedById) {
       var entryRole = this.entry.get("role");
       if (entryRole === "manager" || 
             (addedById === globals.currentUser.id && entryRole === "contributor")) {
          return false;
       }
       return true;
    },

    setCommunityName: function (community, parent) {
       var communityLink = domConstruct.create("span", null, parent);
       var link = this.createCommunityLink(community);
       communityLink.appendChild(link);
       this.set("iconLinkClasses", link.className);
       this.set("iconLink", link.href);
       this.set("iconLinkTitle", link.title);
       htmlUtil.processLink(this.iconLinkNode);
    },

    setFolderName: function (folder, parent) {
       var folderLink = domConstruct.create("span", null, parent);
       var link = this.createFolderLink(folder);
       if (!link) {
          folderLink.appendChild(domConstruct.toDom(folder.title));
          this.set("iconLinkTitle", folder.title);
       } else {
          folderLink.appendChild(link);
          this.set("iconLinkClasses", link.className);
          this.set("iconLink", link.href);
          this.set("iconLinkTitle", link.title);
          this.set("iconAltText", link.title);
          htmlUtil.processLink(this.iconLinkNode);
       }
    },

    createCommunityLink: function(community) {
       var title = community.get("title");
       var linkTitle = string.substitute(i18n.PANEL.SHARING.SHARED_WITH_COMMUNITY, [title]);
       var communityHref = routes.getCommunityLink(community);
       var ret = domConstruct.create("a", {
          className: "lotusPerson",
          title: linkTitle,
          href: communityHref,
          innerHTML: entities.encode(title)
        });
       htmlUtil.processLink(ret);
       return ret;
    },

    createFolderLink: function(folder) {
       var title = folder.get("title");
       var href = routes.getFolderLink(folder);
       var ret = domConstruct.create("a", {
          className: "",
          title: title,
          href: href,
          innerHTML: entities.encode(title)
        });
       htmlUtil.processLink(ret);
       return ret;
    }
  });
});
