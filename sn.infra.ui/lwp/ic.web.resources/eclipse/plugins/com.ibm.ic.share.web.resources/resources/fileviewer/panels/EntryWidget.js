/* Copyright IBM Corp. 2015, 2016  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/EntryWidget.html",
  "dojo/dom-class",
  "dojo/_base/array",
  "dojo/_base/lang",
  "../util/network",
  "../util/DateFormat",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "dojo/dom-construct",
  "../config/globals",
  "dojox/html/entities",
  "../widget/ExpandableText",
  "dojo/dom-style",
  "dojo/when",
  "../util/html",
  "dojo/dom-geometry",
  "dojo/query",
  "../uiState"
], function (declare, _WidgetBase, _TemplatedMixin, template, domClass, array, lang, networkUtil, DateFormat, i18n,
    string, domConstruct, globals, htmlEntities, ExpandableText, domStyle, when, html, domGeometry, query, uiState) {

  return declare([ _WidgetBase, _TemplatedMixin ], {
    templateString: template,

    _setIconSourceAttr: { node: "iconNode", type: "attribute", attribute: "src" },
    _setH1Attr: { node: "h1Node", type: "innerHTML" },
    _setIconAltTextAttr: { node: "iconNode", type: "attribute", attribute: "alt" },
    _setIconLinkAttr: { node: "iconLinkNode", type: "attribute", attribute: "href" },
    _setIconLinkTitleAttr: { node: "iconLinkNode", type: "attribute", attribute: "title" },
    _setIconLinkClassesAttr: { node: "iconLinkNode", type: "attribute", attribute: "class" },
    _setHeader1TooltipAttr: { node: "h1Node", type: "attribute", attribute: "title" },
    _setHeader2TooltipAttr: { node: "h2Node", type: "attribute", attribute: "title" },
    _setHeader3TooltipAttr: { node: "h3Node", type: "attribute", attribute: "title" },

    constructor: function () {
      this.entryNls = i18n.ENTRY;
      if (!this.entryNls.FLAG)
        this.entryNls.FLAG = "Flag As Inappropriate";
      this.editNls = i18n.SHARE.ACTION.EDIT;
      this.editDescNls = i18n.ACTION.EDIT_DESCRIPTION;
      this.downloadNls = i18n.ACTION.DOWNLOAD;
      this.iconSource = this._blankGif;
      this.iconAltText = "";
      this.iconLink = "javascript:;";
      this.iconLinkClasses = "";
      this.iconLinkTitle = "";
      this.dropDownButton = i18n.ACTION.DROPDOWN_BUTTON || "Dropdown button",
      this.iconClasses = "";
      this.downloadLink = "";
      this.restoreTooltip = "";
      this.editTooltip = "";
      this.removeTooltip = "";
      this.downloadTooltip = "";
      this.flagTooltip = "";
      this.h1 = "";
      this.h2 = "";
      this.h3 = "";
      this.content = "";
      this.footer = "";
    },
    
    postMixInProperties: function () {
       this.h1 = htmlEntities.encode(this.h1);
       this.h2 = htmlEntities.encode(this.h2);
       this.h3 = htmlEntities.encode(this.h3);
       this.content = htmlEntities.encode(this.content);
       this.footer = htmlEntities.encode(this.footer);
    },
    
    buildRendering: function () {
      this.inherited(arguments);
      
      domClass.add(this.domNode, "emptyContent");
    },

    postCreate: function () {
      domClass.add(this.domNode, this.baseClasses);
      array.forEach(this.actions, lang.hitch(this, function (action) {
        if (!lang.isFunction(this.isActionValid) || this.isActionValid(action, this)) {
          domClass.add(this.actionContainer, action);
        }
      }));
      
      domStyle.set(this.header1Action, "display", "none");
      if (this.headerAction) {
        var args = {
          file: this.file,
          widget: this
        };
        when(this.headerAction.isValid(this.file, args), lang.hitch(this, function (isValid) {
          var execute = lang.hitch(this, function () {
            new this.headerAction.create(args).onLinkClicked();
          });
          
          setTimeout(lang.hitch(this, function () {
            this.emit("headeractionplaced", {
              isValid: isValid,
              execute: execute
            });
          }), 0);
          
          if (!isValid) {
            return;
          }
          
          domStyle.set(this.header1Action, "display", "");
          
          this.on("headeraction", execute);
        }));
      }
    },
    
    startup: function () {
      this.inherited(arguments);
      
      if (this._contentText) {
        this._contentText.startup();
      }
    },

    setUserName: function (user, parent) {
      var userLink = domConstruct.create("span", null, parent);
      domConstruct.create("span", {
        className: "x-lconn-userid",
        style: "display: none;",
        innerHTML: user.id
      }, userLink);
      if (!lang.isFunction(globals.createPersonLink)) {
        userLink.appendChild(domConstruct.toDom(user.name));
      } else {
         var personLink = globals.createPersonLink(user);
         if (personLink) {
            this.set("iconLinkClasses", personLink.className);
            this.set("iconLink", personLink.href);
            this.iconLinkNode.setAttribute("target", "_blank");
         }
         var pictureString = string.substitute(this.entryNls.USER_PICTURE, [user.name]);
         this.set("iconAltText", pictureString);
         this.set("iconLinkTitle", pictureString);
         userLink.appendChild(personLink);
         if (lang.isFunction(globals.attachBizCard)) {
          globals.attachBizCard(userLink);
          
          var setLinkSize = lang.hitch(this, function () {
            var bizcardDropdown = query(".menu_drop_icon", parent)[0];
            query("a.lotusPerson", parent).forEach(lang.hitch(this, function (node) {
              var maxWidth = this.usernameMaxWidth || domGeometry.position(parent).w;
              if (bizcardDropdown) {
                maxWidth -= 14;
              }
              
              if (maxWidth > 0) {
                node.style.maxWidth = maxWidth + "px";
              }
            }));
          });
          
          setTimeout(setLinkSize, 0);
          uiState.watch("panelSize", setLinkSize);
        }
      }
    },
    
    getPictureUrl: function () {
       var cloudUserImage = "/photo/";
       var onpremUserImage = "/photo.do?r=true&small=true&userid=";

       if (!!lconn.core.config.services.scprofiles) {
         pictureUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.scprofiles).path + cloudUserImage;
       } else {
         pictureUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).path + onpremUserImage; 
       }

       if (window.notesiniParameters) {
         pictureUrl = window.notesiniParameters.bssUrl + pictureUrl;
       }

       return pictureUrl;
    },
    
    setUserImage: function (user) {
      if (!lang.isFunction(globals.createPersonPhotoLink)) {
        var pictureUrl = this.getPictureUrl(globals.currentUser);
        this.set("iconSource", pictureUrl + user.id);
        this.iconLinkNode.setAttribute("target", "_blank");
      } else {
        var personPhotoLink = globals.createPersonPhotoLink(user);
        if (personPhotoLink) {
          this.set("iconSource", personPhotoLink.firstChild.src);
        }
        domStyle.set(this.iconLinkNode, "display", "none");
        this.iconNodeContainer.appendChild(personPhotoLink);
      }
    },

    createDialog: function (args) {
      this.dialog = new this.DialogFactory(lang.mixin(this.dialogArgs, args));
      this.dialog.placeAt(document.body);
      this.dialog.startup();
      this.dialog.show();
    },
    formatDate: function (date, dateStrings) {
      var dateFormatter = new DateFormat(date);
      return dateFormatter.formatByAge(dateStrings || i18n.DATE.SHORT);
    },
    mouseOver: function () {
      domClass.add(this.domNode, "hover");
    },
    mouseOut: function () {
      domClass.remove(this.domNode, "hover");
    },

    createItem: function () {
      this.entry.create();
    },

    edit: function () {
      if (this.dialog) {
        return;
      }

      if (this.onEdit) {
        this.onEdit(this);
        return;
      }

      this.createDialog({ action: "edit" });
      this.setupAction({action: this.entry.update});
    },

    remove: function () {
      if (this.dialog) {
        return;
      }
      this.createDialog({ action: "remove" });
      this.setupAction({
        action: this.entry.remove,
        errorStrings: this.deleteErrorStrings
      });
    },

    update: function () {
      if (this.dialog) {
        return;
      }
      this.createDialog({ action: "update" });
      domClass.add(this.dialog.domNode, "restore");
      this.setupAction({action: this.entry.update});
    },

    download: function () {
      return;
    },

    restore: function () {
      if (this.dialog) {
        return;
      }
      this.createDialog({ action: "restore" });
      domClass.add(this.dialog.domNode, "restore");
      this.setupAction({action: this.entry.restore});
    },
    flag: function () {
      return;
    },
    reload: function () {
      return;
    },

    setupAction: function (args) {
      this._currEvt = lang.hitch(this, args.action);
      this.dialog.on("clicked", lang.hitch(this, function (arg) {
        this.fireEvent(arg, this.dialog, args.errorStrings);
      }));

      this.dialog.on("close", lang.hitch(this, function () {
        this.dialog = undefined;
        this._currEvt = "";
      }));

    },

    fireEvent: function (arg, dialog, errorStrings) {
      this._currEvt(arg).then(lang.hitch(this, function () {
        dialog.onCancel();
        if (this.reloadItem) {
          this.refresh(this);
        }
        this.onEventSuccess(arg, dialog);
      }), lang.hitch(this, function (error) {
        if (errorStrings) {
          dialog.showError(networkUtil.getErrorMessage(error, errorStrings));
        }
        this.onEventFailure(error);
      }));
    },
    
    onEventSuccess: function (arg, dialog) {},
    
    onEventFailure: function (error) {}, 
    
    _setH2Attr: function (value) {
      if (lang.isString(value)) {
        html.setText(this.h2Node, value);
      } else {
        domConstruct.place(value, this.h2Node, "only");
      }
    },
    
    _setContentAttr: function (value) {
      if (lang.isString(value)) {
        this._setContentText(value);
      } else {
        this._setContentWidget(value);
      }
    },
    
    _setContentText: function (value) {
      if (!this._contentText) {
        this._contentText = new ExpandableText({visibleLines: this.visibleContentLines, htmlText: this.htmlContentText});
        this._contentText.placeAt(this.contentContainer);
        if (this._started) {
          this._contentText.startup();
        }
      }
      
      if (this.contentWidget) {
        this.contentWidget.destroy();
      }
      this._contentText.domNode.style.display = "";
      this._contentText.set("text", value);
      
      if (value === "") {
        domClass.add(this.domNode, "emptyContent");
      } else {
        domClass.remove(this.domNode, "emptyContent");
      }
    },
    
    _setContentWidget: function (widget) {
      if (this._contentText) {
        this._contentText.domNode.style.display = "none";
      }
      
      if (this.contentWidget) {
        this.contentWidget.destroy();
      }
      
      this.contentWidget = widget;
      this.contentWidget.placeAt(this.contentContainer);
      this.contentWidget.startup();
    },

    _headerActionClick: function () {
      this.emit("headeraction", {});
    },
    
    onheaderactionplaced: function () {},
    
    onheaderaction: function () {
       return;
    },
    updateIconContainerNode: function (updateIcon, name) {
      if (this.iconLinkNode) {
        this.iconNodeContainer.removeChild(this.iconLinkNode);
      }
      if (lang.isFunction(updateIcon)) {
        updateIcon(this.iconNodeContainer, name);
      }
    }
  });
});
