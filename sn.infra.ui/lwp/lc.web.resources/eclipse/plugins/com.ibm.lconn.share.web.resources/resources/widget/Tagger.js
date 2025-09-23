/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.Tagger');
dojo.require("dijit._Widget");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.validation");
dojo.require("lconn.share.bean.File");
dojo.require("lconn.share.widget.TagTypeAhead");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.share.widget.Tagger", [dijit._Widget], {
   inline: false,
   editable: true,
   _strings: {},
   highlightNew: "#FFFF75",
   tags: null,
   highlightTags: {},
   labelText: null,
   docId: null,
   libraryId: null,
   userLibrary: null,

   uninitialize: function() {
      this.addNode = null;
      this.errNode = null;
      this.formNode = null;
      this.inputField = null;
      this.tagCombo = null;
   },
   
   buildRendering: function() {
      var d = document;
      var el = this.domNode = this.srcNodeRef;
      while (el.firstChild) el.removeChild(el.firstChild);
      if (this.baseClass) dojo.addClass(el, this.baseClass);
      
      if (this.editable) {
         var a = this.addNode = d.createElement("a");
            a.style.display = "none";
            a.href = "javascript:;";
            dijit.setWaiRole(a, "button");
            dojo.connect(a, "onclick", dojo.hitch(this, this.editTags));
            a.appendChild(d.createTextNode(this.getLinkText()));
            a.title = this.getLinkTooltip();
         el.appendChild(a);
      }
      
      if (!this.tags)
         this.loadTags();
      this.update();
   },

   clearErrors: function() {
      if (this.errNode) {
         this.domNode.removeChild(this.errNode);
         this.errNode = null;
      }
   },
   setErrors: function(contents) {
      var errNode = document.createElement("div");
         errNode.className = "lotusFormError";

      dojo.forEach(contents, function(node) {
         errNode.appendChild(node);
      });
      
      if (this.errNode)
         this.domNode.replaceChild(errNode, this.errNode);
      else
         this.domNode.insertBefore(errNode, this.domNode.firstChild);

      dijit.setWaiState(errNode, "live", "assertive");
      this.errNode = errNode;
   },
   
   update: function(editMode) {
      var d = document;
      var el = this.domNode;
      var addNode = this.addNode;

      this.clearErrors();
      if (this.inputField) {
         this.tagCombo.staticClass = "lotusText";
         dojo.removeClass(this.inputField, "lotusFormErrorField");
      }

      if (addNode) {
         var cur = addNode;
         while (cur.previousSibling) {
         	if(dojo.hasClass(cur.previousSibling, "lotusFormError")) cur = cur.previousSibling;
         	else el.removeChild(cur.previousSibling);
         }
      }
      else
         while (el.lastChild) el.removeChild(el.lastChild);
      
      if (this.tags) {
         if (!editMode && this.tags.length == 0) {
            if (this.editable)
               addNode.style.display = "";
            else
               lconn.share.util.dom.insertBefore(el, d.createTextNode(this._strings.NOTAGS), addNode);
         }
         else {
            if (!editMode && addNode) addNode.style.display = "";
            if (this.labelText)
               lconn.share.util.dom.insertBefore(el, d.createTextNode(this.labelText), addNode);
            
            var container = d.createElement("span");
               dijit.setWaiRole(container, "list");
               lconn.share.util.dom.insertBefore(el, container, addNode);
            
            var delimiter_t = d.createElement("span");
               dijit.setWaiRole(delimiter_t, "separator");
               dijit.setWaiState(delimiter_t, "hidden", true);
               delimiter_t.appendChild(document.createTextNode(lconn.share.util.html.getDirectionCode() + ", "));

            for (var i=0; i<this.tags.length; i++) {
               var tag = this.tags[i];
               if (i > 0)
                  container.appendChild(delimiter_t.cloneNode(true));
               
               var item = d.createElement("span");
                  dijit.setWaiRole(item, "listitem");

               if (editMode) {
                  item.appendChild(d.createTextNode(tag));
                  item.appendChild(d.createTextNode(" "));
                  
                  // Force the close link to display on the correct side
                  item.appendChild(d.createTextNode(lconn.share.util.html.getDirectionCode()));
                  
                  var a = d.createElement("a");
                     dijit.setWaiRole(a, "button");
                     a.className = "lotusDelete";
                     a.href = "javascript:;";
                     a.title = this._strings.REMOVE;
                     var img = d.createElement("img");
                        img.alt = this._strings.REMOVE;
                        img.title = this._strings.REMOVE;
                        img.src = dojo.config.blankGif;
                        dojo.style(img,"verticalAlign","middle");
                        dijit.setWaiRole(img, "presentation");
                     a.appendChild(img);
                     
                     var altSpan = d.createElement("span");
                        altSpan.className = "lotusAltText";
                        altSpan.appendChild(d.createTextNode("X"));
                     a.appendChild(altSpan);

                     dojo.connect(a, 'onclick', dojo.hitch(this, this.deleteTag, tag));
                  item.appendChild(a);
               }
               else {
                  var a = d.createElement("a");
                     this.generateTagLink(tag, a);
                     a.appendChild(d.createTextNode(tag))
                     dojo.addClass(a, 'bidiAware');
                  item.appendChild(a);
               }
               container.appendChild(item);
               
   
               if (this.highlightTags[tag] && this.highlightNew) {
                  dojo.animateProperty(lconn.share.util.misc.animateBackground({
                     duration: 2000,
                     rate: 100,
                     node: a
                  }, this.highlightNew, "white")).play();      
               }
   
            }            
         }
         if (addNode) {
            while (addNode.lastChild) addNode.removeChild(addNode.lastChild);
            addNode.appendChild(d.createTextNode(this.getLinkText()));
            addNode.title = this.getLinkTooltip();
            if (this.tags.length == 0) 
               dojo.removeClass(addNode, "lotusIndent10") ;
            else {
               lconn.share.util.dom.insertBefore(el, d.createTextNode(" "), addNode);
               dojo.addClass(addNode, "lotusIndent10");
            }
         }
      }
      else {
         if (addNode) addNode.style.display = "none";
         lconn.share.util.dom.insertBefore(el, d.createTextNode(this._strings.ERROR_LOADING), addNode);
      }
         
      this.highlightTags = {};
   },
   
   /**
    * Consumers may connect to this method to see tag notifications.
    */
   onTagChange: function(addedTags,deletedTags) {},
   
   loadTags: function() {
      this.net.getXml({
         url: lconn.share.util.uri.rewriteUri(this.url, {includeTags: true}),
         handle: dojo.hitch(this, this.handleLoad)
      });
   },
   
   handleLoad: function(response, ioArgs) {
      if (response instanceof Error) {
         this.onLoadError(response.code);
      }
      else {
         var doc = response.documentElement;
         var entries = doc.getElementsByTagName("entry");
         var tags = [];            
         for(var i=0,entry; entry=entries[i]; i++)
            tags.push(lconn.share.util.dom.getChildElementTextContent(entry, "title"));
         this.tags = tags;
      }
      this.update();
   },
   
   onLoadError: function(code) {
      var d = document;
      this.tags = [];
      var error;
      if(code == "cancel")
         error = this._strings.LOADERROR_CANCEL;
      else if (code == "timeout")
         error = this._strings.LOADERROR_TIMEOUT;
      else
         error = this._strings.ERROR_LOADING;
      
      lconn.share.util.dom.insertBefore(this.domNode, d.createTextNode(error), this.addNode);
   },
         
   editTags: function(e) {
      if (e) dojo.stopEvent(e);
      if (!this.editable)
         return;
         
      if (!this.formNode) {
         var d = document;
         var el = this.domNode;
         var form = this.formNode = d.createElement("FORM");
            form.style.display = "inline"; // Inlined for Communities
            var input = d.createElement("input");
               input.type = "text";
               input.className = "lotusText";
               input.name = "_tags";
            form.appendChild(input);
            var combo = this.tagCombo = new lconn.share.widget.TagTypeAhead({
               id: this.id + "_selectTag",
               name: "_shareTaggerTypeAhead",
               size: "30",
               multipleValues: true,
               token: ' ',
               _strings: this._strings,
               hideEmptyResults: true,
               autoSelectChars: [],
               libraryId: this.libraryId,
               userLibrary: this.userLibrary,
               store: this.tagStore
            }, input);
            this.inputField = combo.textbox;
            lconn.core.globalization.bidiUtil.inputRTLProcessing(combo.textbox);
            dojo.connect(combo.textbox, "onkeyup", function(){
				lconn.core.globalization.bidiUtil.inputRTLProcessing(combo.textbox);
            });      			
            if(this.labelText)
               this.inputField.title = this.labelText;

            dojo.connect(form.firstChild, "onkeydown", this, function(e) {
               // Cancel editing if ESC is hit in this widget and wasn't already handled
               if(e && !e.cancelBubble && e.keyCode == dojo.keys.ESCAPE) {
                  dojo.stopEvent(e);
                  this.cancelEdit();
               }
            });
            
            var input = d.createElement("input");
               input.style.marginLeft = input.style.marginRight = "5px";
               input.type = "submit";
               input.className ="lotusBtnSmall";
               input.value = this._strings.OK;
            form.appendChild(input);
            var a = d.createElement("a");
               dijit.setWaiRole(a, "button");
               a.href = "javascript:;";
               a.className = "lotusBtnSmallGray";
               dojo.connect(a, "onclick", dojo.hitch(this, this.cancelEdit));
               a.appendChild(d.createTextNode(this._strings.CANCEL));
               a.title = this._strings.CANCEL_TOOLTIP;
            form.appendChild(a);
            dojo.connect(form, "onsubmit", dojo.hitch(this, this.createTags));
         el.appendChild(form);
      }
      else {
         this.formNode.firstChild.value = "";
      }
         
      this.update(true);
      this.formNode.style.display = "inline";
      this.addNode.style.display = "none";
      this.clearErrors();
      var input = this.formNode.firstChild;
      if (dojo.isIE) // IE8 compat mode also requires timeout
         setTimeout(function() {input.focus();},0);
      else 
         input.focus();
   }, 
   
   cancelEdit: function(e) {
      if (e) dojo.stopEvent(e);
      this.update();
      this.clearErrors();
      if (this.formNode) {
         this.formNode.style.display = "none";
      }
      if (this.inputField) {
         this.inputField.value = "";
      }
      if (this.addNode) {
         this.addNode.style.display = "";
         this.addNode.focus();
      }
   },
   
   createTags: function(e) {
      if (e) dojo.stopEvent(e);
      if (!this.editable)
         return;
      
      this.clearErrors();
      this.tagCombo.staticClass = "lotusText";
      dojo.removeClass(this.inputField, "lotusFormErrorField");
      
      var tagsText = this.formNode.firstChild.value;
      var tags = this.validateTags(tagsText);
      
      if(!this.validateTagLength(tags) || !this.validateTagChar(tagsText))
         return;

      if (tags && tags.length > 0) {
         var urlCreate = lconn.share.util.uri.rewriteUri(this.urlEdit || this.url, {tag: tags});

         var doc = lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE, [lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
            var entry = doc.documentElement;
               var category = lconn.share.util.dom.createElementNS(doc,"category",lconn.share.util.dom.ATOM_NAMESPACE);
                  category.setAttribute("term", "document");
                  category.setAttribute("label", "document");
                  category.setAttribute("scheme", "tag:ibm.com,2006:td/type");
               entry.appendChild(category);
               var atomId = lconn.share.util.dom.createElementNS(doc,"id",lconn.share.util.dom.ATOM_NAMESPACE);
                  atomId.appendChild(doc.createTextNode(this.docId));
               entry.appendChild(atomId);
         var text = lconn.share.util.dom.serializeXMLDocument(doc, true);

         this.net.putXml({
            url: urlCreate,
            postData: text,
            contentType: "application/atom+xml",
            handle: dojo.hitch(this, this.handleCreate, tags)
         });
      }
      else
         this.cancelEdit();
   },

   validateTagLength: function(tags) {
      var valid = true;
      var d = document;
      var el = this.inputField;

      var contents = [];
      var tagMsg = this._strings.WARN_LONG_TAG;
      dojo.forEach(tags, function(tag, i) {
         if (!lconn.share.util.validation.validateTextLength(tag, lconn.share.util.validation.TAG_LENGTH)) {
            contents.push(d.createTextNode(dojo.string.substitute(tagMsg, [lconn.share.util.text.trimToLength(tag, 30)])));
            valid = false;
         }
      });

      if (!valid) {
         var multiple = contents.length > 1;

         if (multiple)
            contents = [d.createTextNode(this._strings.WARN_LONG_TAGS)];

         contents.push(d.createTextNode(" "));

         var a = d.createElement("a");
            a.href = "javascript:;";
            dojo.connect(a, "onclick", this, "trimTags");
            a.appendChild(d.createTextNode(multiple ? this._strings.TRIM_TAGS : this._strings.TRIM_TAG));
            dijit.setWaiRole(a, "button");
         contents.push(a);

         this.tagCombo.staticClass = "lotusText lotusFormErrorField";
         dojo.addClass(el, "lotusFormErrorField");
         this.setErrors(contents);
      }

      return valid;
   },
   
   validateTagChar: function(tagInputValue){
      var valid = true;
      var d = document;
      var el = this.inputField;

      var contents = [];
      var tagInvalidCharMsg = this._strings.INVALID_CHAR_WARN_LONG;
      
      if (el.value.indexOf("&") != -1) {
         valid = false;
         contents.push(d.createTextNode(dojo.string.substitute(tagInvalidCharMsg, ['&'])));
         this.tagCombo.staticClass = "lotusText lotusFormErrorField";
         dojo.addClass(el, "lotusFormErrorField");
         this.setErrors(contents);   
      }
      return valid;
   },

   trimTags: function() {
      var el = this.inputField;
      var tags = lconn.share.bean.File.splitTags(el.value);
      tags = dojo.map(tags, function(tag) {
       var i = lconn.share.util.text.getCharIndexForUtf8Index(tag, lconn.share.util.validation.TAG_LENGTH);
       if (i != -1)
          tag = tag.substring(0, i);
       return tag;
      });
      el.value = tags.join(" ");
      
      this.clearErrors();
      
      this.tagCombo.staticClass = "lotusText";
      dojo.removeClass(el, "lotusFormErrorField");
   },

   handleCreate: function(requestedTags, response, ioArgs){
	   if (response instanceof Error) {
         this.onCreateError(response);
         return;
	   }

      // Remember our old tags
      var oldTags = this.tags || [];

      // Get the current tags
      var newTags = this.tags = new lconn.share.bean.File(response.documentElement).getTags().sort();

      var addedTags = [];
      var deletedTags = [];
      var i=0;
      var j=0;
      var oldTag = oldTags[i];
      var newTag = newTags[j];
      while (oldTag || newTag) {
         if (oldTag && (!newTag || newTag > oldTag)) {
            deletedTags.push(oldTag);
            i++;
         }
         else if (newTag && (!oldTag || oldTag > newTag)) {
            addedTags.push(newTag);
            j++;
         }
         else {
            i++;
            j++;
         }

         oldTag = oldTags[i];
         newTag = newTags[j];
      }

      var highlightTags = this.highlightTags = {};
      dojo.forEach(addedTags, function(tag) {highlightTags[tag] = 1;});
      dojo.forEach(requestedTags, function(tag) {highlightTags[tag] = 1;});
      
      dojo.publish("lconn/files/tags/changed");      
      this.onTagChange(addedTags, deletedTags);

      this.cancelEdit();
   },
   onCreateError: function(error) {
      var msg;
      if(error.code == "cancel")
         msg = this._strings.CREATEERROR_CANCEL;
      else if (error.code == "timeout")
         msg = this._strings.CREATEERROR_TIMEOUT;
      else if (error.code == "ItemNotFound")
         msg = this._strings.CREATEERROR_NOT_FOUND;
      else if (error.code == "AccessDenied")
         msg = this._strings.CREATEERROR_ACCESS_DENIED;    
      else if (error.code == "unauthenticated") {
      }
      else if (error.code == "ItemExists") {
            // Tolerate a tag already existing
      }
      else if (error.code == "InvalidTagCharacters")
      	this.setInvalidCharError(error.message);
      else
         msg = this._strings.CREATEERROR;
         
      if (msg)
         lconn.share.util.html.alert(msg);
   },

   deleteTag: function(tag, e) {
      if (e) dojo.stopEvent(e);
      if (!this.editable)
         return;
      
      // Remove the tag from the list
      this.tags = dojo.filter(this.tags, function(a) {return a != tag;});
      this.update(true);
      this.inputField.focus();

      // Do the delete
      var urlDelete = lconn.share.util.uri.rewriteUri(this.urlFeed, this.isEcmFile ? {removeTag: tag}: {category: "tag", tag: tag});
      var opt = {
         url: urlDelete,
         handle: dojo.hitch(this, this.handleDelete, tag)
      };
      this.isEcmFile ? this.net.putXml(opt) : this.net.deleteXml(opt);
   },
   
   handleDelete: function(tag, response, ioArgs){
      if (response instanceof Error) {
         var error = response.code;
         if (error == "ItemNotFound") {
            // Tolerate removing a tag that no longer exists
         }
         else {
            // We actually care about notifying them of this error
            this.onDeleteError(error);

            // Add the tag back into the list, since we couldn't delete it
            this.tags.push(tag);
            this.tags = this.tags.sort();
            this.update(true);
            return;
         }
      }

      dojo.publish("lconn/files/tags/changed");      
      this.onTagChange(null, [tag]);
   },
   onDeleteError: function(code) {
      var msg;
      if (code == "cancel")
         msg = this._strings.REMOVEERROR_CANCEL;
      else if (code == "timeout")
         msg = this._strings.REMOVEERROR_TIMEOUT;
      else if (code == "AccessDenied")
         msg = this._strings.REMOVEERROR_ACCESS_DENIED;  
      else if (code == "unauthenticated") {
      }
      else
         msg = this._strings.REMOVEERROR;
      
      if (msg)
         lconn.share.util.html.alert(msg);
   }, 
   
   generateTagLink: function(tag, a) {
      a.href = "javascript:;";
      a.onclick = function() {return false;};
   },
   
   getLinkText: function() {
      var tagNum = (this.tags ? this.tags.length : 0);
      return ((tagNum > 0) ? this._strings.ADD_REMOVE_TAGS : this._strings.ADD_TAGS);
   },
   getLinkTooltip: function() {
      var tagNum = (this.tags ? this.tags.length : 0);
      return ((tagNum > 0) ? this._strings.ADD_REMOVE_TAGS_TOOLTIP : this._strings.ADD_TAGS_TOOLTIP);
   },
   
   validateTags: function(tagsText) {
      return lconn.share.bean.File.splitTags(tagsText);
   },
   
   setInvalidCharError: function(errorMessage) {
      this.tagCombo.staticClass = "lotusText lotusFormErrorField";
      dojo.addClass(this.inputField, "lotusFormErrorField");
      
      this.setErrors([document.createTextNode(errorMessage)]);
   }
});

lconn.share.widget.Tagger.updateFile = function(file, addedTags, deletedTags){
   if(file){
      var tags = file.getTags();
      if(deletedTags){
	      var wasDeleted = {};
	      dojo.forEach(deletedTags, function(deletedOne){wasDeleted[deletedOne] = true});
	      tags = dojo.filter(tags, function(tag){ return !wasDeleted[tag]; });
      }
      if(addedTags){
	      var tagsExisted = {};
	      dojo.forEach(tags, function(tag){tagsExisted[tag] = true});
	      dojo.forEach(addedTags, function(addedOne){
	         if(!tagsExisted[addedOne]) 
	            tags.push(addedOne);
	      });
      }
      file.tags = tags.sort();
   }
}
