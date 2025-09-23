/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.upload.ui.File");

dojo.require("dojo.cache");
dojo.require("dojo.i18n");
dojo.require("dojo.string");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Contained");

dojo.require("lconn.core.utilities");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.util.html");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.requireLocalization("lconn.core.upload", "upload");

/**
 * @class lconn.core.upload.ui.File
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @extends dijit._Contained
 */
dojo.declare("lconn.core.upload.ui.File", [dijit._Widget, dijit._Templated, dijit._Contained], /** @lends lconn.core.upload.ui.File.prototype */ {

   templatePath:dojo.moduleUrl("lconn.core", "upload/ui/resources/File.html"),

   postMixInProperties: function() {
      this.nls = dojo.i18n.getLocalization("lconn.core.upload", "upload");
      this.container = this.container || this.getParent();

      this._listeners = [];

      var name = this.file.getName();
      this._ui = {
         originalName: lconn.core.util.html.formatFilename(name),
         fileIcon: lconn.core.utilities.getFileIconClassName(name, 16)
      };
   },

   postCreate: function() {
      this._setHoverText(this.file.getName());
      this._updateNameVisibility();
      this._setInitialStatus();
      this._setIds();
   },

   _setIds: function(){
      this.editTooltipNode.id = this.id + "_editTooltip";
   },

   destroy: function() {
      while (this._listeners.length > 0) {
         // empty the array as we disconnect to avoid potential memory leaks
         var connect = this._listeners.shift();
         dojo.disconnect(connect);
      }

      this.inherited(arguments);
   },

   getStatusNode: function(statusId) {
      var root = dojo.query('> [statusId="' + statusId + '"]', this.statusContainerNode);
      if (root && root.length > 0) {
         return root[0];
      } else {
         return null;
      }
   },

   setStatus: function(status) {
      var root = this.getStatusNode(status.id);

      var newStatus = false;
      if (!root) {
         root = dojo.create("div", { statusId: status.id });
         newStatus = true;
      }

      var fragment = dojo.doc.createDocumentFragment();
      fragment.appendChild(dojo.create("img", {
            alt: this.nls["LEVEL_" + (["INFO", "WARNING", "ERROR"])[status.level]],
            src: this._blankGif,
            className: "lconnFileUploadStatusIcon lotusIcon lotusIconMsg" + ((["Info", "Warning", "Error"])[status.level])
        }));

      var levelA11y = document.createElement('span');
      levelA11y.className = 'lotusAltText';
      levelA11y.appendChild(document.createTextNode(this.nls["A11Y_" + (["INFO", "WARNING", "ERROR"])[status.level]]));

      fragment.appendChild(levelA11y);

      var msgDiv = dojo.create("span", { "className": "lconnFileUploadStatusMessage", id: this.file._id + "_status_msg"});
      var actions = status.actions || [];

      if (!status.disableActionInline){
         var msg = status.message + "\u00a0 ";
         lconn.core.util.html.breakString(msg, dojo.doc, msgDiv, 30);
         if (actions.length == 1){
            var action = actions[0];
            var link = this.buildLink(action, this.file);
            msgDiv.appendChild(link);
            this.removeAccessInfoForRemoveLink(action.name);
         }else if (actions.length > 1){
            var ul = null;
            if (actions.length > 0) {
               ul = dojo.create("ul", {"className": "lotusInlinelist"});
            }

            for (var j = 0; j < actions.length; ++j) {
               var action = actions[j];

               var li = dojo.create("li");
               if (j == 0) {
                  dojo.addClass(li, "lotusFirst");
               }

               li.appendChild(this.buildLink(action, this.file));
               ul.appendChild(li);
               this.removeAccessInfoForRemoveLink(action.name);
               
            }

            if (ul) {
               var div = document.createElement("div");
                  dojo.addClass(div, "lotusClear");
                  dojo.html.set(div, "&nbsp;");
                  msgDiv.appendChild(div);
               msgDiv.appendChild(ul);
            }
         }
      }else {
         lconn.core.util.html.substitute(dojo.doc, msgDiv, status.message, {
            0: dojo.hitch(this, function(action, file){
                  var link = this.buildLink(action, file);
                  return link;
               }, actions[0], this.file)
         });
         
         var alertSpan = document.createElement("span");
         alertSpan.className = "lotusAccess";
         alertSpan.appendChild(document.createTextNode(this.nls["ALERT"] + this.nls["LEVEL_" + (["INFO", "WARNING", "ERROR"])[status.level]] + " "));
         dojo.place(alertSpan ,msgDiv, "first");
      }
      dijit.setWaiState(this.focusNode, "describedby", msgDiv.id);
      
      fragment.appendChild(msgDiv);

      root.innerHTML = "";
      root.className = "lotusMessage lotusMeta lotusTiny" +
            " lotus" + (["Info", "Warning", "Error"])[status.level] +
            " lconnFileUploadStatus_" + status.id;
      root.appendChild(fragment);

      if (newStatus) {
          this.statusContainerNode.appendChild(root);
          if(actions.length > 0){
        	  this.setAccessInfoForRemoveLink(actions[0].name);
          }
          
          
      }
      this.focus(this.focusNode);
      this.statusContainerNode.style.display = "";
      this.setAlertMessage(status, this.container.containerNode);      
   },
   
   setAccessInfoForRemoveLink: function(actionname){
	   var LinkContentA11Y = dojo.create("span", { "className": "lotusAccess", id: this.file._id + "_button_" + actionname});
       LinkContentA11Y.innerHTML = dojo.string.substitute(this.nls.A11Y_CLOSE_BUTTON_WITH_LINK, [actionname]);
       this.statusContainerNode.appendChild(LinkContentA11Y);
       dijit.setWaiState(this.removeLink, "describedby", LinkContentA11Y.id);
   },
   
   removeAccessInfoForRemoveLink: function(actionName){
	  var LinkContentA11Y = dojo.query('[id="' + this.file._id + "_button_" + actionName + '"]', this.statusContainerNode);
	  if(LinkContentA11Y.length != 0){
	      this.statusContainerNode.removeChild(LinkContentA11Y[0]);
	  }
      dojo.removeAttr(this.removeLink, "aria-describedby");  
   },
   
   setAlertMessage: function(status, containerNode) { 	   
	   if (containerNode.firstChild.id == "alert_msg" || status.level == 0) return;
	   
	   var alertDiv = document.createElement("span");
   	   alertDiv.id = "alert_msg";
	   dijit.setWaiRole(alertDiv, "status");
	   alertDiv.className = "lotusAccess";
	   alertDiv.appendChild(document.createTextNode(this.nls["ALERT_MESSAGE"]));
	   dojo.place(alertDiv ,containerNode, "first");	   
   },
   
   removeAlertMessage: function(containerNode) {
       if (containerNode.firstChild.id == "alert_msg")
    	  dojo.destroy(containerNode.firstChild);
   },
   
   buildLink: function(action, file) {
      var link = dojo.create("a", { "href": "javascript:;", "className": "lotusAction" });

      link.appendChild(dojo.doc.createTextNode(action.name));
      this._listeners.push(dojo.connect(link, "onclick", dojo.hitch(this, function(event) {
         dojo.stopEvent(event);

         if (file.isEnabled()) {
            action.execute(file);

            // since some actions (like rename) will explicitly set focus, let them tell us not to bother.
            // default will be true.
            if (action.setFocus !== false) {
               this.focus();
            }
         }
      })));

      dijit.setWaiRole(link, "button");
      return link;
   },

   clearStatus: function(status) {
      var root = this.getStatusNode(status.id);

      if (root) {
         var c = this.statusContainerNode;
         c.removeChild(root);
         if (c.childNodes.length == 0)c.style.display = "none";
      }
   },

   onNameChange: function(newName) {
      var name = lconn.core.util.html.formatFilename(newName);

      this.nameLink.innerHTML = ''
      this.nameNode.innerHTML = '';

      this.nameLink.appendChild(dojo.doc.createTextNode(name));

  	  this.nameNode.appendChild(dojo.doc.createTextNode(name));

      this.fileIcon.className = "lconnFileUploadIcon " + lconn.core.utilities.getFileIconClassName(name, 16);
      dojo.attr(this.fileIcon, "alt", "");

      this._setHoverText(newName);
   },

   onUploadStateChange: function(newState) {
      var states = this.file.UploadStates;

      dojo.style(this.removeLink, "display", "none");
      dojo.style(this.progressNode, "display", "none");
      dojo.style(this.uploadedNode, "display", "none");
      switch (newState) {
         case states.READY:
            dojo.style(this.removeLink, "display", "");
            break;
         case states.IN_PROGRESS:
            dojo.style(this.progressNode, "display", "");
            break;
         case states.UPLOADED:
            dojo.style(this.uploadedNode, "display", "");
            break;
      }
   },

   _setHoverText: function(name) {
      var text = name;
      
      text = lconn.core.globalization.bidiUtil.createSttDisplayString(text, "FILE_PATH"); 
      
      var keys = [text]; 
      
      var size = this.file.getSize();
      var fileSize = size >= 0 ? lconn.core.util.text.formatSize(this.nls, size) : this.nls.SIZE_UNKNOWN;
      keys.push(fileSize);

      var renameLinkHover = dojo.string.substitute(this.nls.UI_EDIT, keys);
      var removeLinkHover = dojo.string.substitute(this.nls.UI_REMOVE, keys);
      var progressHover = dojo.string.substitute(this.nls.STATE_UPLOADING, keys);
      var uploadedHover = dojo.string.substitute(this.nls.STATE_UPLOADED, keys);

      this.nameLink.alt = this.nameLink.title = renameLinkHover;
      var tooltip = new dijit.Tooltip({
         connectId: [this.nameLink],
         label: this.nameLink.title,
         position: ["above", "below"]
          });
      this.nameLink.setAttribute("hastooltip", tooltip.id);
      
      this.removeNode.alt = this.removeLink.title = removeLinkHover;
      var tooltip = new dijit.Tooltip({
         connectId: [this.removeLink],
         label: this.removeLink.title,
         position: ["above", "below"]
          });
      this.removeLink.setAttribute("hastooltip", tooltip.id);
      
      this.progressNodeImg.alt = this.progressNodeImg.title = this.progressNodeA11y.title = progressHover;
      this.uploadedNodeImg.alt = this.uploadedNodeImg.title = this.uploadedNodeA11y.title = uploadedHover;

   },

   onEnabledChange: function(isEnabled) {
      dojo.toggleClass(this.domNode, "lconnFileUploadDisabled", !isEnabled);
      this._updateNameVisibility();
   },

   _setInitialStatus: function() {
      this.statusContainerNode.innerHTML = "";
      this.statusContainerNode.style.display = "none";
      dojo.removeAttr(this.removeLink, "aria-describedby");
      dojo.forEach(this.file.getStatuses(), this.setStatus, this);
   },

   startRename: function(event) {
      if (event)
         dojo.stopEvent(event);
      if (!this.file.isEnabled() || !this.file.getOwningList().isRenameAllowed()) {
         return;
      }

      if (this.file.canEditFullName())
         this.originalValue = this.file.getName();
      else
         this.originalValue = lconn.core.util.text.trimExtension(this.file.getName());

      dojo.addClass(this.domNode, "lconnFileUploadEditing");
      dojo.style(this.editTooltipNode, 'display', '');
      dojo.style(this.nameLink, "display", "none");
      dojo.attr(this.nameInput, {
         "style": {
            "display": ""
         },
         "aria-describedby": this.editTooltipNode.id,
         "value": this.originalValue
      });

      this.nameInput.readOnly = this.nameInput.disabled = false;

      delete this.refocus;
      dijit.focus(this.nameInput);

      this.container.onStartRename(this.file);
      this.removeAlertMessage(this.container.containerNode);
   },

   _updateNameVisibility: function() {
      if (this.file.isEnabled() && this.file.getOwningList().isRenameAllowed()) {
         dojo.style(this.nameNode, "display", "none");
         dojo.style(this.nameLink, "display", "");
      } else {
         dojo.style(this.nameNode, "display", "");
         dojo.style(this.nameLink, "display", "none");
      }
   },

   _onEditKeyPress: function(event) {
      var code = event.keyCode;
        var keys = dojo.keys;

        if (code == keys.ESCAPE) {
           this.nameInput.value = this.originalValue;
        }

        if (code == keys.ESCAPE || code == keys.ENTER) {
           dojo.stopEvent(event);
           this.refocus = true;
           this.nameInput.blur();
        }
   },

   _onEditBlur: function(event) {
      var name = dojo.string.trim(this.nameInput.value) || this.originalValue;

      if (!this.file.canEditFullName()) {
         var extension = this.file.getExtension();
         if (extension && dojo.string.trim(extension).length > 0) {
            name = name + "." + extension;
         }
      }

      dojo.removeClass(this.domNode, "lconnFileUploadEditing");
      dojo.style(this.nameLink, "display", "");
      dojo.style(this.nameInput, "display", "none");

      this.file.setName(name);

      if (this.refocus) {
         dijit.focus(this.nameLink);
         delete this.refocus;
      }

      dojo.style(this.editTooltipNode, 'display', 'none');

      this.container.onEndRename(this.file);
   },

   _remove: function(event) {
      this.file.getOwningList().removeFileById(this.file.getId());
	  this.removeAlertMessage(this.container.containerNode);
   },

   _startHover: function() {
      dojo.addClass(this.labelRow, "lconnUploadHover");
   },

   _stopHover: function() {
      dojo.removeClass(this.labelRow, "lconnUploadHover");
   },

   _getFocusNode: function() {
      lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();

      var isVisible = (dojo.style(this.focusNode, "display") != 'none');
      if (isVisible) {
         return this.focusNode;
      }

      isVisible = (dojo.style(this.nameNode, "display") != 'none');
      return isVisible ? this.nameNode : this.domNode;
   },

   focus: function() {
      var node = this._getFocusNode();
      dijit.focus(node);
   }
});
