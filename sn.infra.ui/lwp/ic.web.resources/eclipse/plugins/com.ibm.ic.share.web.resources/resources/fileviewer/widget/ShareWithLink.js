define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/ShareWithLink.html",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/_base/lang",
  "dojo/dom-style",
  "dojo/dom-class",
  "dojo/_base/array",
  "dojo/dom-construct",
  "dojo/topic",
  "../dialog/ConfirmationDialog",
  "../util/network",
  "dojo/string"
], function (declare, _WidgetBase, _TemplatedMixin, template, i18n, lang, domStyle, domClass, array, domConstruct, topic, ConfirmationDialog, network, string) {
  return declare([_WidgetBase, _TemplatedMixin], {

    templateString: template,
    open: true,
    
    postMixInProperties: function () {
      this.nls = i18n.SHARE_WITH_LINK;
      this.iconSource = this._blankGif;
      this.dropDownButton = i18n.ACTION.DROPDOWN_BUTTON
      this.accessTypes = [
         {
            type: "PEOPLE_WITH_LINK",
            title: this.nls.ACCESS_TYPE_1,
            description: this.nls.ACCESS_TYPE_1_DESCRIPTION,
            defaultScope: true,
            VisibleInternal: false
            
         },
         {
            type: "PEOPLE_IN_MY_ORG",
            title: this.nls.ACCESS_TYPE_2,
            description: this.nls.ACCESS_TYPE_2_DESCRIPTION,
            defaultScope: false,
            VisibleInternal: true
         }
      ];
    },

    postCreate: function () {
       this.update(this.open);
       var shareLink = this.file.get("shareLink");
       if(shareLink.url) {
          this._showLink(shareLink.url);
          this._renderSelector();
       } else {
          domStyle.set(this.descriptionContent, "display", "");
       }
       topic.publish("ic-fileviewer/sharedLink/updated", {url: shareLink.url, type: shareLink.type});
    },
    
    _clickMenu: function() {
       this.update(!this.open);
    },
    
    update: function(isOpen) {
       if(isOpen) {
          this.iconNode.className = "arrowOpen";
          domStyle.set(this.shareWithLinkContainter, "display", "");
          this.open = true;
       } else {
          this.iconNode.className = "arrowClosed";
          domStyle.set(this.shareWithLinkContainter, "display", "none");
          this.open = false;
       }
    },

    _showLink: function(value) {
       domStyle.set(this.linkContent, "display", "");
       this.linkInput.value = value;
    },
    
    _renderSelector: function() {
        domConstruct.empty(this.typeSelector);
        var selectedType = this.file.get("shareLink").type;
        var items = [];
        for(var i=0; i<this.accessTypes.length; i++) {
          // if(!this.file.get("isExternal") && !this.accessTypes[i].VisibleInternal) {
           if(!this.accessTypes[i].VisibleInternal) {
              continue;
           }
           items.push(this.accessTypes[i]);
           var option = document.createElement("option");
              option.appendChild(document.createTextNode(this.accessTypes[i].title));
              option.value = this.accessTypes[i].type;
              option.selected = selectedType ? selectedType === this.accessTypes[i].type: this.accessTypes[i].defaultScope;
              if(option.selected) {
                 this.shareLinkDescription.innerText = this.accessTypes[i].description;
              }
           this.typeSelector.appendChild(option);
        }
       
        if(items.length > 1) {
           domStyle.set(this.typeSelector, "display", "");
        } else {
           domConstruct.empty(this.typeLabel);
           this.typeLabel.appendChild(document.createTextNode(items[0].title));
           domStyle.set(this.typeLabel, "display", "");
        }
       domStyle.set(this.selectContent, "display", "");
    },
    
    _createAction: function() {
       var accessTypes = [];
       for(var i=0; i<this.accessTypes.length; i++) {
         // if(!this.file.get("isExternal") && !this.accessTypes[i].VisibleInternal) {
    	   if(!this.accessTypes[i].VisibleInternal) {
             continue;
          }
          accessTypes.push(this.accessTypes[i]);
       }
       var defaultScope = accessTypes.length > 1 ? array.filter(accessTypes, function(item) {return item.defaultScope}) : accessTypes;
       this.file.get("shareWithLinkEntry").createItem(this.file, "add", defaultScope[0].type).then(lang.hitch(this, function(){
          domStyle.set(this.descriptionContent, "display", "none");
          this._showLink(this.file.get("shareLink").url);
          this._renderSelector();
          topic.publish("ic-fileviewer/push/messages", {message: this.nls.CREATE_SHARELINK_SUCCESS, type: "success"});
          topic.publish("ic-fileviewer/sharedLink/updated", {url: this.file.get("shareLink").url, type: this.file.get("shareLink").type});
       }));
    },
    
    _changeType: function() {
       this.file.get("shareWithLinkEntry").createItem(this.file, "replace", this.typeSelector.options[this.typeSelector.selectedIndex].value).then(lang.hitch(this, function(){
          var type = this.typeSelector.options[this.typeSelector.selectedIndex].value;
          var selectedType = array.filter(this.accessTypes, function(item) { return item.type === type });
          this.shareLinkDescription.innerText = selectedType[0].description;
          topic.publish("ic-fileviewer/push/messages", {message: this.nls.CHANGE_TYPE_SUCCESS, type: "info"});
          topic.publish("ic-fileviewer/sharedLink/updated", {url: this.file.get("shareLink").url, type: type});
       }));
    },
    
    _deleteAction: function() {
        var dialog = new ConfirmationDialog({strings: this.nls.CONFIRM_DIALOG});
        dialog.on("clicked", lang.hitch(this, this._deleteLink, dialog));
        dialog.render();
    },
    
    _deleteLink: function(dialog) {
       this.file.get("shareWithLinkEntry").createItem(this.file, "remove", null).then(lang.hitch(this, function(){
          var fileName = this.file.name;
          var bidiUtil = dojo.getObject("lconn.core.globalization.bidiUtil");
          if (bidiUtil)
             fileName = bidiUtil.createSttDisplayString(fileName, "FILE_PATH");
          var message = string.substitute(this.nls.DELETE_SHARELINK_SUCCESS, {file: fileName});
          topic.publish("ic-fileviewer/push/messages", {message: message, type: "success"});
          topic.publish("ic-fileviewer/sharedLink/updated", {url: null});
          dialog.onCancel();
          this._showEmpty();
       }));
    },
    
    _showEmpty: function() {
       domStyle.set(this.descriptionContent, "display", "");
       domStyle.set(this.selectContent, "display", "none");
       domStyle.set(this.linkContent, "display", "none");
    },
    
    _copyLink: function() {
       this.linkInput.select();
       document.execCommand("copy");
       topic.publish("ic-fileviewer/push/messages", {message: this.nls.COPY_LINK_SUCCESS, type: "success"});
    }
  });
});