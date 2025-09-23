define([
	"dojo",
	"dojo/topic",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/_base/array",
	"dojo/cache",
	"dojo/text!ic-core/upload/ui/resources/File.html",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/html",
	"dojo/i18n",
	"dojo/i18n!ic-core/upload/nls/upload",
	"dojo/on",
	"dojo/query",
	"dojo/string",
	"dijit/_Templated",
	"dijit/_Contained",
	"dijit/_Widget",
	"ic-core/globalization/bidiUtil",
	"ic-core/util/html",
	"ic-core/util/text",
	"ic-core/utilities"
], function (dojo, topic, declare, lang, windowModule, array, cache, template, domConstruct, domAttr, domClass, domStyle, html, i18n, i18nupload, on, query, string, 
             _Templated, _Contained, _Widget, bidiUtil, html, text, utilities) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	/**
	 * @class ic-core.upload.ui.File
	 * @extends dijit._Widget
	 * @extends dijit._Templated
	 * @extends dijit._Contained
	 */
	var File = declare("lconn.core.upload.ui.File", [_Widget, _Templated, _Contained], /** @lends ic-core.upload.ui.File.prototype */ {
	
	   templateString: template,
	
	   postMixInProperties: function() {
	      this.nls = i18nupload;
	      this.container = this.container || this.getParent();
	
	      this._listeners = [];
	
	      var name = this.file.getName();
	      this._ui = {
	         originalName: html.formatFilename(name),
	         fileIcon: utilities.getFileIconClassName(name, 16)
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
	         connect.remove();
	      }
	
	      this.inherited(arguments);
	   },
	
	   getStatusNode: function(statusId) {
	      var root = query('> [statusId="' + statusId + '"]', this.statusContainerNode);
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
	         root = domConstruct.create("div", { statusId: status.id });
	         newStatus = true;
	      }
	
	      var fragment = windowModule.doc.createDocumentFragment();
	      fragment.appendChild(domConstruct.create("img", {
	            alt: this.nls["LEVEL_" + (["INFO", "WARNING", "ERROR"])[status.level]],
	            src: this._blankGif,
	            className: "lconnFileUploadStatusIcon lotusIcon lotusIconMsg" + ((["Info", "Warning", "Error"])[status.level])
	        }));
	
	      var levelA11y = document.createElement('span');
	      levelA11y.className = 'lotusAltText';
	      levelA11y.appendChild(document.createTextNode(this.nls["A11Y_" + (["INFO", "WARNING", "ERROR"])[status.level]]));
	
	      fragment.appendChild(levelA11y);
	
	      var msgDiv = domConstruct.create("span", { "className": "lconnFileUploadStatusMessage", id: this.file._id + "_status_msg"});
	      var actions = status.actions || [];
	
	      if (!status.disableActionInline){
	         var msg = status.message + "\u00a0 ";
	         html.breakString(msg, windowModule.doc, msgDiv, 30);
	         if (actions.length == 1){
	            var action = actions[0];
	            var link = this.buildLink(action, this.file);
	            msgDiv.appendChild(link);
	            if (status.id == this.file.StatusKeys.RENAMED){
	               var span = windowModule.doc.createElement("span");
	                  span.className = "lotusAccess";
	                  span.appendChild(windowModule.doc.createTextNode(status.message));
	               link.insertBefore(span, link.firstChild);
	            }
	
	         }else if (actions.length > 1){
	            var ul = null;
	            if (actions.length > 0) {
	               ul = domConstruct.create("ul", {"className": "lotusInlinelist"});
	            }
	
	            for (var j = 0; j < actions.length; ++j) {
	               var action = actions[j];
	
	               var li = domConstruct.create("li");
	               if (j == 0) {
	                  domClass.add(li, "lotusFirst");
	               }
	
	               li.appendChild(this.buildLink(action, this.file));
	               ul.appendChild(li);
	            }
	
	            if (ul) {
	               var div = document.createElement("div");
	                  domClass.add(div, "lotusClear");
	                  html.set(div, "&nbsp;");
	                  msgDiv.appendChild(div);
	               msgDiv.appendChild(ul);
	            }
	         }
	      }else {
	         html.substitute(windowModule.doc, msgDiv, status.message, {
	            0: lang.hitch(this, function(action, file){
	                  var link = this.buildLink(action, file);
	                  return link;
	               }, actions[0], this.file)
	         });
	         dijit.setWaiState(this.focusNode, "describedby", msgDiv.id);
	      }
	      fragment.appendChild(msgDiv);
	
	      root.innerHTML = "";
	      root.className = "lotusMessage lotusMeta lotusTiny" +
	            " lotus" + (["Info", "Warning", "Error"])[status.level] +
	            " lconnFileUploadStatus_" + status.id;
	      root.appendChild(fragment);
	
	      if (newStatus) {
	         this.statusContainerNode.appendChild(root);
	      }
	
	      dijit.setWaiState(this.statusContainerNode, "live", "assertive");
	      this.statusContainerNode.style.display = "";
	   },
	
	   buildLink: function(action, file) {
	      var link = domConstruct.create("a", { "href": "javascript:;", "className": "lotusAction" });
	
	      link.appendChild(windowModule.doc.createTextNode(action.name));
	      this._listeners.push(on(link, "click", lang.hitch(this, function(event) {
	         event.preventDefault(), event.stopPropagation();
	
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
	      var name = html.formatFilename(newName);
	
	      this.nameLink.innerHTML = ''
	      this.nameNode.innerHTML = '';
	
	      this.nameLink.appendChild(windowModule.doc.createTextNode(name));
	
	       var span = this.nameLink.appendChild(windowModule.doc.createElement("span"));
	          span.className = "lotusAccess";
	          span.appendChild(windowModule.doc.createTextNode(this.nls.UI_EDIT_A11Y));
	       this.nameNode.appendChild(windowModule.doc.createTextNode(name));
	
	      this.fileIcon.className = "lconnFileUploadIcon " + utilities.getFileIconClassName(name, 16);
	
	      this._setHoverText(newName);
	   },
	
	   onUploadStateChange: function(newState) {
	      var states = this.file.UploadStates;
	
	      domStyle.set(this.removeLink, "display", "none");
	      domStyle.set(this.progressNode, "display", "none");
	      domStyle.set(this.uploadedNode, "display", "none");
	      switch (newState) {
	         case states.READY:
	            domStyle.set(this.removeLink, "display", "");
	            break;
	         case states.IN_PROGRESS:
	            domStyle.set(this.progressNode, "display", "");
	            break;
	         case states.UPLOADED:
	            domStyle.set(this.uploadedNode, "display", "");
	            break;
	      }
	   },
	
	   _setHoverText: function(name) {
	      var text = name;
	      
	      text = bidiUtil.createSttDisplayString(text, "FILE_PATH");
	      
	      var keys = [text];
	      var size = this.file.getSize();
	
	      keys.push(size >= 0 ? text.formatSize(this.nls, size) : this.nls.SIZE_UNKNOWN);
	
	      var renameLinkHover = string.substitute(this.nls.UI_EDIT, keys);
	      var removeLinkHover = string.substitute(this.nls.UI_REMOVE, keys);
	      var progressHover = string.substitute(this.nls.STATE_UPLOADING, keys);
	      var uploadedHover = string.substitute(this.nls.STATE_UPLOADED, keys);
	
	      this.nameLink.alt = this.nameLink.title = renameLinkHover;
	      this.removeNode.alt = this.removeLink.title = removeLinkHover;
	      this.progressNodeImg.alt = this.progressNodeImg.title = this.progressNodeA11y.title = progressHover;
	      this.uploadedNodeImg.alt = this.uploadedNodeImg.title = this.uploadedNodeA11y.title = uploadedHover;
	
	   },
	
	   onEnabledChange: function(isEnabled) {
	      domClass.toggle(this.domNode, "lconnFileUploadDisabled", !isEnabled);
	      this._updateNameVisibility();
	   },
	
	   _setInitialStatus: function() {
	      this.statusContainerNode.innerHTML = "";
	      this.statusContainerNode.style.display = "none";
	      array.forEach(this.file.getStatuses(), this.setStatus, this);
	   },
	
	   startRename: function(event) {
	      if (event)
	         event.preventDefault(), event.stopPropagation();
	      if (!this.file.isEnabled() || !this.file.getOwningList().isRenameAllowed()) {
	         return;
	      }
	
	      if (this.file.canEditFullName())
	         this.originalValue = this.file.getName();
	      else
	         this.originalValue = text.trimExtension(this.file.getName());
	
	      domClass.add(this.domNode, "lconnFileUploadEditing");
	      domStyle.set(this.editTooltipNode, 'display', '');
	      domStyle.set(this.nameLink, "display", "none");
	      domAttr.set(this.nameInput, {
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
	   },
	
	   _updateNameVisibility: function() {
	      if (this.file.isEnabled() && this.file.getOwningList().isRenameAllowed()) {
	         domStyle.set(this.nameNode, "display", "none");
	         domStyle.set(this.nameLink, "display", "");
	      } else {
	         domStyle.set(this.nameNode, "display", "");
	         domStyle.set(this.nameLink, "display", "none");
	      }
	   },
	
	   _onEditKeyPress: function(event) {
	      var code = event.keyCode;
	        var keys = dojo.keys;
	
	        if (code == keys.ESCAPE) {
	           this.nameInput.value = this.originalValue;
	        }
	
	        if (code == keys.ESCAPE || code == keys.ENTER) {
	           event.preventDefault(), event.stopPropagation();
	           this.refocus = true;
	           this.nameInput.blur();
	        }
	   },
	
	   _onEditBlur: function(event) {
	      var name = string.trim(this.nameInput.value) || this.originalValue;
	
	      if (!this.file.canEditFullName()) {
	         var extension = this.file.getExtension();
	         if (extension && string.trim(extension).length > 0) {
	            name = name + "." + extension;
	         }
	      }
	
	      domClass.remove(this.domNode, "lconnFileUploadEditing");
	      domStyle.set(this.nameLink, "display", "");
	      domStyle.set(this.nameInput, "display", "none");
	
	      this.file.setName(name);
	
	      if (this.refocus) {
	         dijit.focus(this.nameLink);
	         delete this.refocus;
	      }
	
	      domStyle.set(this.editTooltipNode, 'display', 'none');
	
	      this.container.onEndRename(this.file);
	   },
	
	   _remove: function(event) {
	      this.file.getOwningList().removeFileById(this.file.getId());
	   },
	
	   _startHover: function() {
	      domClass.add(this.labelRow, "lconnUploadHover");
	   },
	
	   _stopHover: function() {
	      domClass.remove(this.labelRow, "lconnUploadHover");
	   },
	
	   _getFocusNode: function() {
	      bidiUtil.enforceTextDirectionOnPage();
	
	      var isVisible = (domStyle.get(this.focusNode, "display") != 'none');
	      if (isVisible) {
	         return this.focusNode;
	      }
	
	      isVisible = (domStyle.get(this.nameNode, "display") != 'none');
	      return isVisible ? this.nameNode : this.domNode;
	   },
	
	   focus: function() {
	      var node = this._getFocusNode();
	      dijit.focus(node);
	   }
	});
	return File;
});
