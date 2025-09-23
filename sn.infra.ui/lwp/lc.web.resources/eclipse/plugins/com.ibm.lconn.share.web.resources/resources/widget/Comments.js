/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.Comments');
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.bean.Comment");
dojo.require("lconn.share.widget.Stream");
dojo.require("lconn.share.widget.StreamRenderer");
dojo.require("lconn.share.widget.ProtectedAction");
dojo.require("lconn.share.util.message");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.util.validation");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("com.ibm.oneui.controls.MessageBox");

dojo.declare("lconn.share.widget.Comments", [lconn.share.widget.Stream, lconn.share.widget.ProtectedAction], {

   templatePath: dojo.moduleUrl("lconn.share","widget/templates/Comments.html"),

   baseClass: "",
   additionalClasses: "",
   _initWidgetStyle: "",
   showTitles: false,
   assumeNoEntries: false,
   loadOnStartup: true,
   showNotification: false,
   notifyOnComment: false,

   authenticatedUser: null,
   fileOwner: null,

   commentCount: 0,

   scrollTo: null,
   
   _strings: {},
   
   externalMsgBox: null,

   destroy: function() {
      this.inherited(arguments);
      this.commentListNode = null;
   },

   onVisible: function() {
      if (!this._loaded) {
         this._loaded = true;
         if (this.assumeNoEntries)
            this.update({fromUrl: true});
         else
            this.update();
      }
   },

   postMixInProperties: function() {
      var appNls = this._appstrings;
      var nls = this._strings;
      nls.JUMP_TO_PAGE = appNls.CONTENT.JUMP_TO_PAGE;
      nls.OF_PAGES = appNls.CONTENT.OF_PAGES;
      nls.JUMP_TO_PAGE_ALT = appNls.CONTENT.JUMP_TO_PAGE_ALT;
      nls.SORTING_DESC = appNls.CONTENT.SORTING_DESC;
      nls.SORTING_ASC = appNls.CONTENT.SORTING_ASC;
      nls.SORTING_DESC_LONG = appNls.CONTENT.SORTING_DESC_LONG;
      nls.SORTING_ASC_LONG = appNls.CONTENT.SORTING_ASC_LONG;
      this.renderer = new lconn.share.widget.CommentStreamRenderer({
         _strings: nls,
         _appstrings: appNls,
         net: this.net,
         sorts: this.sorts,
         sortId: this.sortId,
         sortReversed: this.sortReversed,
         authenticatedUser: this.authenticatedUser,
         fileOwner: this.fileOwner,
         generateLinkToPerson: this.generateLinkToPerson,
         generateLinkToComment: this.generateLinkToComment,
         generateUserImage: this.generateUserImage,
         generateFlagComment: this.generateFlagComment
      });

      this.inherited(arguments);
   },

   postCreate: function() {
      this.inherited(arguments);
               
      if (this.authenticatedUser)
         this.isEditable = true;
      this.cancelCreate();
      
      if (this.loadOnStartup) {
         this._loaded = true;
         if (this.assumeNoEntries)
            this.update({fromUrl: true});
         else
            this.update();
      }
   },
   
   _loadFromUrl: function(url){
      // Add or remove the scrollTo comment param before loading
      var args = {commentId: this.scrollTo};
      if (this.scrollTo)
         args.page = args.sI = null;
      arguments[0] = lconn.share.util.uri.rewriteUri(url, args);
      this.inherited(arguments);
   },
   
   _loadFromUrlComplete: function(response, ioArgs) {
      if (response instanceof Error && this.scrollTo) {
         // Try fetching the comments without scrolling to our specific comment, in case it was deleted
         delete this.scrollTo;
         ioArgs._finished = true;
         this.update();
      }
      else {
         this.inherited(arguments);
      }
   },

   onUpdate: function(data) {
      this._loaded = true;
      this.assumeNoEntries = false;
      this.inherited(arguments);
      if (data && data.paging && data.paging.total != -1)
         this.onCountChange(data.paging.total);
      if (this.scrollTo) {
         var node = this.domNode;
         if (data && data.itemByPosition.length)
            for (var i=0; i<data.itemByPosition.length; i++)
               if (data.itemByPosition[i].getId() == this.scrollTo) {
                  node = data.itemByPosition[i].element;
                  break;
               }
         dijit.scrollIntoView(node);
         delete this.scrollTo;
      }
   },
   getCommentCount: function() {return this.commentCount;},
   onCountChange: function(count) {this.commentCount = count;},

   updateLast: function(result) {
      if (this.data && this.data.paging) {
         var paging = this.data.paging;
         if (this.sortReversed) {
            dijit.scrollIntoView(this.domNode);
            this.page(1);
         }
         else if (!paging.isFullPage()) {
            this.resetData();
            var position = this.data.itemByPosition.length;
            paging.items++;
            paging.total++;
            this.renderer.updatePaging(this, this.streamNode, this.data);
            if (position == 0) {
               lconn.share.util.html.removeChildren(this.streamNode);
               this.renderer.renderSorting(this, this.streamNode, this.data);
            }
            var item = this.renderer._buildItem(result);
               item._position = position;
            this.data.itemByPosition[position] = item;
            
            this.renderer.renderItem(this, this.streamNode, this.data, item, position, position == 0, position == (paging.size-1));
            this.onCountChange(paging.total);
         }
         else {
            var total = paging.total;
            var size = paging.size;
            this.page((size > 0 && total > 0) ? (Math.floor(total/size)+1) : 100);
         }
      }
      else
         this.refresh();
   },
   removeItem: function(item) {
      if (this.data && this.data.paging) {
         var paging = this.data.paging;
         if (!paging.hasNext() && paging.items > 1) {
            paging.items--;
            paging.total--;

            this.renderer.updatePaging(this, this.streamNode, this.data);
            if (paging.items == 0)
               this.renderer.renderEmpty(this, this.streamNode, this.data);
            else
               this.renderer.removeItem(this, this.streamNode, this.data, item);
            this.onCountChange(paging.total);
         }
         else 
            this.refresh();
      }
      else
         this.refresh();
   },
   
   validateCreate: function() {
      var form = this.addCommentNode;
      var el = this.addCommentNode.getElementsByTagName("textarea")[0];
      lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode, el);
      lconn.share.util.validation.removeFormErrors(form);
      var valid = this.validateCommentContents(form,el,false);
      valid = this.validateCommentLength(form,el) && valid;
      return valid;
   },
   validateEdit: function(form) {
      var el = form.getElementsByTagName("textarea")[0];
      lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode, el);
      lconn.share.util.validation.removeFormErrors(form);
      var valid = this.validateCommentContents(form,el,true);
      valid = this.validateCommentLength(form,el) && valid;
      return valid;
   },
   validateDelete: function(form) {
      var el = form.getElementsByTagName("textarea")[0];
      lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode, el);
      lconn.share.util.validation.removeFormErrors(form);
      return this.validateCommentLength(form,el);
   },
   
   validateCommentContents: function(form,el,isEdit) {
      var valid = true;
      if (form) {
         var d = document;
         if (lconn.share.util.text.trim(el.value).length == 0) {
            lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode, el, "empty", isEdit ? this._strings.ERROR_NO_CONTENT_EDIT : this._strings.ERROR_NO_CONTENT);
            valid = false;
            el.setAttribute("aria-invalid", true);
            el.focus();
         }
      }
      return valid;
   },            
   validateCommentLength: function(form,el) {
      var valid = true;
      if (form) {
         var d = document;
         if (!lconn.share.util.validation.validateTextLength(el.value, lconn.share.util.validation.COMMENT_LENGTH)) {
            var contents = d.createElement("div");
               contents.appendChild(d.createTextNode(this._strings.WARN_LONG_COMMENT));
               contents.appendChild(d.createTextNode(" "));
               var a = d.createElement("a");
                  a.href = "javascript:;";
                  dojo.connect(a, "onclick", dojo.hitch(this,this.trimComment, el.id));
                  a.appendChild(d.createTextNode(this._strings.TRIM_LONG_COMMENT));
               contents.appendChild(a);
            lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode, el, "length", contents);
            valid = false;            
         }
      }
      return valid;
   },
   
   trimComment: function(id) {
      var el = document.getElementById(id);
      if (el) {
         var i = lconn.share.util.text.getCharIndexForUtf8Index(el.value, lconn.share.util.validation.COMMENT_LENGTH);
         if (i != -1)
            el.value = el.value.substring(0, i);
         lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode, el, "length");
      }
   },
   
   removeInlineErrors: function () {
      dojo.forEach(this.domNode.getElementsByTagName("FORM"), lconn.share.util.validation.removeFormErrors);
   },
          
   createComment: function(e) {
      if (e) dojo.stopEvent(e);
      if (this.isEditable) {
         this.notifyNode.style.display = this.showNotification ? "" : "none";
         this.notifyCheckboxNode.checked = this.notifyCheckboxNode.defaultChecked = this.notifyOnComment;
         this.toggleNode.style.display = "none";
         this.addCommentNode.style.display = "";
         if (this.showExternalWarning && !this.externalMsgBox) {
            var d = document;
            this.externalMsgNode.style.display = "";
            var td = d.createElement("td");
            this.externalMsgNode.appendChild(td);
            this.externalMsgBox = new com.ibm.oneui.controls.MessageBox({
                     canClose: false,
                     msg: this._strings.EXTERNAL_WARNING,
                     type: com.ibm.oneui.controls.MessageBox.TYPE.SHARED_EXTERNAL,
                     _strings: {
                     }
                  }, td);
         }
         else if(this.showExternalWarning && this.externalMsgBox){
            this.externalMsgNode.style.display = "";
         }
         else {
            this.externalMsgNode.style.display = "none";
         }
         var textarea = this.addCommentNode['description'];
         textarea.value = "";
         dijit.scrollIntoView(this.addCommentNode);
         if (dojo.isIE)
            setTimeout(dojo.hitch(dijit, "focus", textarea), 10);
         else
            dijit.focus(textarea);
      }
      else
         this.addCommentNode.style.display = this.toggleNode.style.display = "none";
   },
   cancelCreate: function(e) {
      if (e) dojo.stopEvent(e);
      if (this.isEditable) {
         lconn.share.util.validation.removeFormErrors(this.addCommentNode);
         this.addCommentNode.style.display = "none";
         this.toggleNode.style.display = "";
         
         this.addCommentNode['description'].value = "";
         
         dijit.focus(this.toggleLink);
      }
      else
         this.addCommentNode.style.display = this.toggleNode.style.display = "none";
   },
   hideCreate: function() {
      this.isEditable = false;
      this.cancelCreate();
   },
   performCreate: function(e) {
      if (e) dojo.stopEvent(e);
      
      if (!this.startAction())
         return;

      if (!this.validateCreate()) {
         this.endAction();
         return;
      }

      var notifyOnComment = this.notifyCheckboxNode.checked;
      var titleText;// = this.addCommentNode['title'].value;
      var commentNode = this.addCommentNode.getElementsByTagName("textarea")[0];
      var commentText = commentNode.value || "";

      var doc = lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE);
      var entry = doc.documentElement;
         var category = lconn.share.util.dom.createElementNS(doc,"category",lconn.share.util.dom.ATOM_NAMESPACE);
            category.setAttribute("term","comment");
            category.setAttribute("scheme","tag:ibm.com,2006:td/type");
            category.setAttribute("label","comment");
         entry.appendChild(category);
         if (titleText && titleText.length > 0) {
            var title = lconn.share.util.dom.createElementNS(doc,"title",lconn.share.util.dom.ATOM_NAMESPACE);
               title.appendChild(doc.createTextNode(titleText));
            entry.appendChild(title);
         }
         var content = lconn.share.util.dom.createElementNS(doc,"content",lconn.share.util.dom.ATOM_NAMESPACE);
            content.setAttribute("type","text/plain");
            content.appendChild(doc.createTextNode(commentText));
         entry.appendChild(content);
         
      var text = lconn.share.util.dom.serializeXMLDocument(doc, true);

      var url = this.url;
      if (this.showNotification)
         url = lconn.share.util.uri.rewriteUri(url, {commentNotification: notifyOnComment ? "on" : "off"});
      
      this.disableInput(this.addCommentNode);
      this.net.postXml({
         url: url,
         contentType: "application/atom+xml",
         postData: text,
         handle: dojo.hitch(this, this.handleCreate, notifyOnComment)
      });         
   },
   
   handleCreate: function(notifyOnComment, response, ioArgs) {
      this.endAction();
      this.enableInput(this.addCommentNode);
      if (response instanceof Error) {
         this.onCreateError(response.code);
      }
      else {
         this.cancelCreate();
         var c = new lconn.share.bean.Comment(response.documentElement);
         if(c.isPending()){
            var e = {
               messages: {success: true, message:this._strings.ADD_COMMENT_SUCCESS_PRE_MODERATION},
               commentChange: true
            };
            dojo.publish("lconn/share/action/completed", [e, this]);
         }
         if (this.notifyOnComment != notifyOnComment) {
            this.setNotifyOnComment(notifyOnComment);
            this.onNotificationChanged(notifyOnComment);
         }
         this.updateLast(response.documentElement);
         
         dijit.focus(this.toggleNode.firstChild);
      }
   },
   setNotifyOnComment: function(notifyOnComment) {
      this.notifyOnComment = notifyOnComment;
      this.notifyCheckboxNode.checked = this.notifyCheckboxNode.defaultChecked = notifyOnComment;
   },
   onNotificationChanged: function(notifyOnComment) {
   },
   onCreateError: function(code) {
      var type,msg;
      if (code == "cancel") {
         type = "createCancel";
         msg = this._strings.ERROR_CREATE_CANCEL;
      }
      else if (code == "timeout") {
         type = "createTimeout";
         msg = this._strings.ERROR_CREATE_TIMEOUT;
      } 
      else if (code == "ItemNotFound") {
         type = "createNotFound";
         msg = this._strings.ERROR_CREATE_NOT_FOUND;
      }
      else if (code == "AccessDenied") {
         type = "createAccessDenied";
         msg = this._strings.ERROR_CREATE_ACCESS_DENIED;
      }
      else if (code == "unauthenticated") {
         type = "createUnauthenticated";
         msg = this._strings.ERROR_CREATE_NOT_LOGGED_IN;
      }
      else {
         type = "createError";
         msg = this._strings.ERROR_CREATE;
      }
      lconn.share.util.validation.setFormError(this.addCommentNode, msg);
   },
   
   edit: function(comment, e) {
      if (e) dojo.stopEvent(e);
      var el = comment.element;
      
      var div = dojo.query("DIV._qkrEditSection", el)[0];
      if (div)
         div.parentNode.removeChild(div);
      dojo.query(".lotusPostContent", el)[0].style.display = "none";
         
      var d = document;
      div = d.createElement("div");
         div.className = "lotusPostContent _qkrEditSection";
         var form = d.createElement("form");
            form.className = "lotusForm qkrAddComment";
            dojo.connect(form, "onsubmit", dojo.hitch(this, this.performEdit, comment));
            var table = d.createElement("table");
               dijit.setWaiRole(table, "presentation");
               table.className = "lotusFormTable";
               var tbody = d.createElement("tbody");
               // This parameter is used for visitor model, for external file when editing a comment or adding a comment, there will be a warning.
               if (this.showExternalWarning){
                  var tr = d.createElement("tr");
                     tr.className = "lotusFormFieldRow";
                     var td = d.createElement("td");
                     var editMsgBox = new com.ibm.oneui.controls.MessageBox({
                        canClose: false,
                        msg: this._strings.EXTERNAL_WARNING,
                        type: com.ibm.oneui.controls.MessageBox.TYPE.SHARED_EXTERNAL,
                        _strings: {
                        }
                     }, td);
                     tr.appendChild(td);
                  tbody.appendChild(tr);
               }
                  var tr = d.createElement("tr");
                     tr.className = "lotusFormFieldRow";
                     var td = d.createElement("td");
                        var label = d.createElement("label");
                           label.appendChild(d.createTextNode(this._strings.COMMENT_LABEL));
                        td.appendChild(label);
                        var textarea = d.createElement("textarea");
                           textarea.id = dijit.getUniqueId("commentBody");
                           textarea.className = "lotusText";
                           textarea.name = "description";
                           textarea.value = comment.getContents();
						
                        lconn.core.globalization.bidiUtil.inputRTLProcessing(textarea);		
                        this.connect(textarea, "onkeyup", function(){
							lconn.core.globalization.bidiUtil.inputRTLProcessing(textarea);
                        });				
                        												   
                        td.appendChild(textarea);
                        dojo.attr(label, "for", textarea.id);
                     tr.appendChild(td);
                  tbody.appendChild(tr);
                  var tr = d.createElement("tr");
                     var td = d.createElement("td");
                        dijit.setWaiRole(td, "toolbar");
                        var input = d.createElement("input");
                           input.className = "lotusFormButton";
                           input.type = "submit";
                           input.value = this._strings.SAVE;
                        td.appendChild(input);
                        var cancelInput = d.createElement("input");
                           cancelInput.className = "lotusFormButton";
                           cancelInput.type = "button";
                           cancelInput.value = this._strings.CANCEL;
                           dojo.connect(cancelInput, "onclick", dojo.hitch(this, this.cancelEdit, comment));
                           dijit.setWaiRole(cancelInput, "button");
                           dojo.attr(cancelInput, "aria-label", this._strings.CANCEL);
                        td.appendChild(cancelInput);
                     tr.appendChild(td);
                  tbody.appendChild(tr);
               table.appendChild(tbody);
            form.appendChild(table);
         div.appendChild(form);
      el.appendChild(div);
      
      dijit.focus(textarea);
      dijit.scrollIntoView(div);
   },
   cancelEdit: function(comment, e) {
      if (e) dojo.stopEvent(e);

      var el = comment.element;
      var div = dojo.query("DIV._qkrEditSection", el)[0];
      if (div)
         div.parentNode.removeChild(div);
      dojo.query(".lotusPostContent", el)[0].style.display = "";
      dijit.focus(dojo.query("._qkrEditLink", el)[0]);
   },
   
   performEdit: function(comment, e) {
      if (e) dojo.stopEvent(e);

      if (!this.startAction())
         return;

      var el = comment.element;
      var form = dojo.query("DIV._qkrEditSection > FORM", el)[0];

      if (!this.validateEdit(form)) {
         this.endAction();
         return;
      }

      var titleText;
      var commentText = form.getElementsByTagName("textarea")[0].value;
      
      var doc = lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE);
      var entry = doc.documentElement;
         var category = lconn.share.util.dom.createElementNS(doc,"category",lconn.share.util.dom.ATOM_NAMESPACE);
            category.setAttribute("term","comment");
            category.setAttribute("scheme","tag:ibm.com,2006:td/type");
            category.setAttribute("label","comment");
         entry.appendChild(category);
         if (titleText && titleText.length > 0) {
            var title = lconn.share.util.dom.createElementNS(doc,"title",lconn.share.util.dom.ATOM_NAMESPACE);
               title.appendChild(doc.createTextNode(titleText));
            entry.appendChild(title);
         }
         var content = lconn.share.util.dom.createElementNS(doc,"content",lconn.share.util.dom.ATOM_NAMESPACE);
            content.setAttribute("type","text/plain");
            content.appendChild(doc.createTextNode(commentText));
         entry.appendChild(content);
      var text = lconn.share.util.dom.serializeXMLDocument(doc, true);
      
      this.disableInput(comment.element);
      this.net.putXml({
         url: lconn.share.util.uri.rewriteUri(comment.getUrlEntry(), {acls: true}),
         contentType: "application/atom+xml",
         postData: text,
         requireData: true,
         handle: dojo.hitch(this, this.handleEdit, comment)
      });         
   },

   handleEdit: function(comment, response, ioArgs) {
      this.endAction();
      this.enableInput(comment.element);
      if (response instanceof Error) {
         this.onEditError(comment, response.code);
      }
      else {
         this.cancelEdit(comment);
         var c = new lconn.share.bean.Comment(response.documentElement);
         if(c.isPending()){
            var e = {
               messages: {success: true, message:this._strings.ADD_COMMENT_SUCCESS_PRE_MODERATION},
               commentChange: true
            };
            dojo.publish("lconn/share/action/completed", [e, this]);
         }
         var element = comment.element;
         this.updateItem(comment, response.documentElement);
         dijit.focus(dojo.query("._qkrEditLink", element)[0]);
      }
   },
   onEditError: function(comment, code) {
      var type,msg;
      if (code == "cancel") {
         type = "editCancel";
         msg = this._strings.ERROR_EDIT_CANCEL;
      }
      else if (code == "timeout") {
         type = "editTimeout";
         msg = this._strings.ERROR_EDIT_TIMEOUT;
      } 
      else if (code == "ItemNotFound") {
         type = "editNotFound";
         msg = this._strings.ERROR_EDIT_NOT_FOUND;
      }
      else if (code == "AccessDenied") {
         type = "editAccessDenied";
         msg = this._strings.ERROR_EDIT_ACCESS_DENIED;
      }
      else if (code == "unauthenticated") {
         type = "editUnauthenticated";
         msg = this._strings.ERROR_EDIT_NOT_LOGGED_IN;
      }
      else {
         type = "editError";
         msg = this._strings.ERROR_EDIT;
      }
      lconn.share.util.validation.setFormError(comment.element.getElementsByTagName("FORM")[0], msg);
   },
   
   remove: function(comment, e) {
      if (e) dojo.stopEvent(e);
      
      if (!this.startAction())
         return;
      
      var onSuccess = dojo.hitch(this, "_remove", comment);
      lconn.share.util.html.confirm(this._strings.DELETECONFIRM, onSuccess, dojo.hitch(this, "endAction"), false, this._strings.DELETECOMMENT);
   },
   
   _remove: function(comment) {
      var doc = lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE,[lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
      var entry = doc.documentElement;
         var category = lconn.share.util.dom.createElementNS(doc,"category",lconn.share.util.dom.ATOM_NAMESPACE);
            category.setAttribute("term","comment");
            category.setAttribute("scheme","tag:ibm.com,2006:td/type");
            category.setAttribute("label","comment");
         entry.appendChild(category);
         var deleteWithRecord = lconn.share.util.dom.createElementNS(doc,"deleteWithRecord",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
            deleteWithRecord.appendChild(doc.createTextNode(/*hasComment ? "true" : */"false"));
         entry.appendChild(deleteWithRecord);
      var deleteUrl = comment.getUrlEntry();
      var text = lconn.share.util.dom.serializeXMLDocument(doc, true);
      this.net.deleteXml({
         url: deleteUrl,
         contentType: "application/atom+xml",
         postData: text,
         handle: dojo.hitch(this, this.handleRemove, comment, true)
      });  
   },

   handleRemove: function(comment, deleted, response, ioArgs) {
      this.endAction();
      if (response instanceof Error) {
         this.onRemoveError(comment, response.code);
      }
      else {
         if (deleted)
            this.removeItem(comment);
         else if (response.documentElement)
            this.updateItem(comment, response.documentElement);
         else
            this.refresh();
      }
   },
   onRemoveError: function(comment, code) {
      var type,msg;
      var d = document;
      if (code == "cancel") {
         type = "removeCancel";
         msg = this._strings.ERROR_DELETE_CANCEL;
      }
      else if (code == "timeout") {
         type = "removeTimeout";
         msg = this._strings.ERROR_DELETE_TIMEOUT;
      } 
      else if (code == "ItemNotFound") {
         type = "removeNotFound";
         msg = this._strings.ERROR_DELETE_NOT_FOUND;
      }
      else if (code == "AccessDenied") {
         type = "deleteAccessDenied";
         msg = this._strings.ERROR_DELETE_ACCESS_DENIED;
      }
      else if (code == "unauthenticated") {
         type = "removeUnauthenticated";
         msg = this._strings.ERROR_DELETE_NOT_LOGGED_IN;
      }
      else {
         type = "removeError";
         msg = this._strings.ERROR_DELETE;
      }
      lconn.share.util.message.setMessage(comment.mc, msg, "error", {nls: this._strings, canClose: false});
   }
});

dojo.declare("lconn.share.widget.CommentStreamRenderer", lconn.share.widget.StreamRenderer, {
   minimalPaging: true,
   _buildItem: function(item) {
      return new lconn.share.bean.Comment(item);
   },
   renderSorting: function(stream, el, data) {
      if(data && data.paging && data.paging.total > 0)
         this.inherited(arguments);
   },
   getSortUrl: function(stream, sort, naturalOrder) {
      stream.sortReversed = !naturalOrder;
      dojo.setObject("lconn.share.config.services.comments.sortReversed", !naturalOrder);
      return lconn.share.util.uri.rewriteUri(stream.url, {sK: sort, sO: naturalOrder ? "asc" : "dsc"});
   },
   generateSortLink: function(stream, sort, naturalOrder, a) {
      this.inherited(arguments);
   },
   
   renderError: function(stream, el, data, error) {
      if (error.code == "ItemNotFound")
         error.message = this._appstrings.DOCUMENTCONTENT.ERRORS.DEFAULT.MESSAGES;
      else if (error.code == "AccessDenied")
         error.message = this._appstrings.DOCUMENTCONTENT.ERRORS.ACCESS_DENIED.MESSAGES;
      stream.hideCreate();
      this.inherited(arguments);
   },
   
   _getCommentListNode: function(stream, el) {
      if(stream.commentListNode && stream.commentListNode.parentNode == el)
         return stream.commentListNode;

      var d = document;
      var commentListNode = stream.commentListNode = d.createElement("ul");
         commentListNode.className = "lotusCommentList";
      el.appendChild(commentListNode);
      
      return commentListNode;
   },
   _getCommentNode: function(item) {
      if(item && item.element && item.element.parentNode && item.element.parentNode.nodeName.toLowerCase() == "li")
         return item.element.parentNode;
      else
         return null;
   },

   renderItem: function(stream, el, data, comment, position, isFirst, isLast, existingDiv) {
      var d = document;

      var canDelete = comment.getPermissions().Delete;
      var canEdit = comment.getPermissions().Edit;
      var isUserComment = (this.authenticatedUser && comment.getAuthor().id == this.authenticatedUser.id); 
      var isFileOwner = (this.authenticatedUser && this.fileOwner && this.fileOwner.id == this.authenticatedUser.id);    
      var isDeleted = comment.isDeleted();
      var canFlag = this.generateFlagComment && this.authenticatedUser && comment.isFlaggable();
      var isQuarantined = comment.isQuarantined();
      var isPending = comment.isPending();
      var isRejected = comment.isRejected();

      var div = existingDiv;
      if(!div) {
         var ul = this._getCommentListNode(stream, el);

         var li = d.createElement("li");
            li.className = "lotusCommentItem";
            comment.mc = li.appendChild(d.createElement("div"));
            div = d.createElement("div");
            li.appendChild(div);
         ul.appendChild(li);
      }
      if (dojo._isBodyLtr())
         div.style.padding = "7px 7px 7px 0";
      if (!dojo._isBodyLtr())
         div.style.padding = "0 7px 7px 7px";
      dojo[isFirst ? "addClass" : "removeClass"](div.parentNode, "lotusFirst");

      if (isUserComment)
         dojo.addClass(div, "lotusCommentMy");
      else if (this.fileOwner && this.fileOwner.id == comment.getAuthor().id)
         dojo.addClass(div, "lotusCommentOwner");
      if (isDeleted)
         dojo.addClass(div, "lotusCommentDeleted");
      
      var anchor = d.createElement("a");
         anchor.name = anchor.id = "comment-" + comment.getId();
         anchor.className = "lotusHidden";
      div.appendChild(anchor);
      
      if(isQuarantined || isPending || isRejected){
         var u = null; //do not show user image when the comment is inactive;

         var divAuthor = d.createElement("div");
            divAuthor.className = "lotusPostAuthorInfo";
            
            var divAvatar = d.createElement("div");
               divAvatar.className = "lotusPostAvatar";
               if (this.generateUserImage)
                  this.generateUserImage(u, divAvatar, 35, 35, null, {imagePop: false});
            divAuthor.appendChild(divAvatar);
         div.appendChild(divAuthor);

         var divContent = d.createElement("div");
            divContent.className = "lotusPostContent";
            
            var divMeta = d.createElement("div");
               divMeta.className = "lotusContentDetail";     
            
               var span = d.createElement("span");
                  span.className = "lotusMeta";
                  if(isQuarantined || isRejected){
                     var msg = isQuarantined? this._strings.COMMENT_QUARANTINED: this._strings.COMMENT_REJECTED;
                     var string = new lconn.share.util.DateFormat(comment.getStateChangedWhen()).formatByAge(msg);
                     string = lconn.core.globalization.bidiUtil.numShapeStr(string);
                     var self = this;
                     lconn.share.util.html.substitute(d, span, string, {
                        user: function() {
                           var u = comment.getStateChangedBy();
                           var a = d.createElement("a");
                              a.className = "lotusPerson";
                              a.appendChild(d.createTextNode(u.name));
                              self.generateLinkToPerson(u, a);
                           return a;
                        }
                     });
                  }else if(isPending){
                     span.appendChild(d.createTextNode(this._strings.COMMENT_PENDING));
                  }
               divMeta.appendChild(span);
            divContent.appendChild(divMeta);
         div.appendChild(divContent);
      }else{
         
         var u = comment.getAuthor();
            u.state = u.state || u.userState;
         var divAuthor = d.createElement("div");
            divAuthor.className = "lotusPostAuthorInfo";
            
            var divAvatar = d.createElement("div");
               divAvatar.className = "lotusPostAvatar";
               if (this.generateUserImage)
                  this.generateUserImage(u, divAvatar, 35, 35, null, {imagePop: false});
            divAuthor.appendChild(divAvatar);
         div.appendChild(divAuthor);

         var divContent = d.createElement("div");
            divContent.className = "lotusPostContent";
            
            var divMeta = d.createElement("div");
               divMeta.className = "lotusMeta";     
            
               if (!isDeleted) {
                  if (this.showTitles) {
                     var h4 = d.createElement("h4");
                        h4.appendChild(d.createTextNode(comment.getTitle()));
                     divMeta.appendChild(h4);
                  }

                  if (comment.getUpdated().getTime() != comment.getPublished().getTime()) {         
                     var warning = d.createElement("span");
                        warning.className = "lotusRight";
                        var format = new lconn.share.util.DateFormat(comment.getUpdated());
                        var string = format.formatByAge(this._strings.COMMENT_EDITED);
                        string = lconn.core.globalization.bidiUtil.numShapeStr(string);
                        warning.title = format.toTimestamp();
                        warning.appendChild(d.createTextNode(string));
                     divMeta.appendChild(warning);
                  }

                  var span = d.createElement("span");
                     var format = new lconn.share.util.DateFormat(comment.getPublished());
                     var string = format.formatByAge(this._strings.COMMENT_CREATED);
                     string = lconn.core.globalization.bidiUtil.numShapeStr(string);
                     span.title = format.toTimestamp();
                     var self = this;
                     lconn.share.util.html.substitute(d, span, string, {
                        version: function() {
                           return comment.getVersionLabel();
                        },
                        user: function() {
                           var a = d.createElement("a");
                              a.className = "lotusPerson";
                              a.appendChild(d.createTextNode(u.name));
                              self.generateLinkToPerson(u, a);
                           return a;
                        },
                        timestamp: function() {
							var str;
                           if (self.generateLinkToComment) {
                              var a = d.createElement("a");
                                 //a.appendChild(d.createTextNode(new lconn.share.util.DateFormat(comment.getPublished()).formatByAge(self._strings.COMMENT_CREATED_TIME)));
                                 str = new lconn.share.util.DateFormat(comment.getPublished()).formatByAge(self._strings.COMMENT_CREATED_TIME);
                                 str = lconn.core.globalization.bidiUtil.numShapeStr(str);
                                 a.appendChild(d.createTextNode(str));                                 
                                 self.generateLinkToComment(comment, a);
                              return a;
                           }
                           //return d.createTextNode(new lconn.share.util.DateFormat(comment.getPublished()).formatByAge(self._strings.COMMENT_CREATED_TIME));
                           str = new lconn.share.util.DateFormat(comment.getPublished()).formatByAge(self._strings.COMMENT_CREATED_TIME);
                           str = lconn.core.globalization.bidiUtil.numShapeStr(str);
                           return d.createTextNode(str);
                        }
                     });                     
                  divMeta.appendChild(span);
               }
               else {
                  if (this.showTitles) {
                     var h4 = d.createElement("h4");
                        h4.appendChild(d.createTextNode(comment.getTitle()));
                     divMeta.appendChild(h4);
                  }
   
                  var span = d.createElement("span");
                     span.className = "lotusLeft";
                     var string = new lconn.share.util.DateFormat(comment.getUpdated()).formatByAge(this._strings.COMMENT_DELETED);
                     string = lconn.core.globalization.bidiUtil.numShapeStr(string);
                     var self = this;
                     lconn.share.util.html.substitute(d, span, string, {
                        user: function() {
                           var u = comment.getModifier();
                           var a = d.createElement("a");
                              a.className = "lotusPerson";
                              a.appendChild(d.createTextNode(u.name));
                              self.generateLinkToPerson(u, a);
                           return a;
                        }
                     });
                  divMeta.appendChild(span);
               }          
            divContent.appendChild(divMeta);

            var divDetails = d.createElement("div");
               divDetails.commentBody = comment.getContents();
               divDetails.className = "lotusPostDetails";
               
               var isQuarantined = comment.isQuarantined();
               var contents = (isQuarantined? this._strings.FLAG_QUARANTINED: comment.getContents()); 
               var divWide = d.createElement("div");
                  divWide.className = "lotusChunk lotusBreakWord bidiAware";
                  if (dojo.isIE) divWide.style.wordBreak = "normal";
                  lconn.share.util.html.createTextNode(d, divWide, contents);
               divDetails.appendChild(divWide);
            divContent.appendChild(divDetails);

            if (!isDeleted && !isQuarantined && (canDelete || canEdit || canFlag)) {
               var divActions = d.createElement("div");
               divActions.className = "lotusActions";
               var ul = d.createElement("ul");
                  ul.className = "lotusInlinelist";
                  if (canEdit) {                  
                     var li = d.createElement("li");
                        li.className = "lotusFirst";
                        var a = d.createElement("a");
                           a.className = "_qkrEditLink";
                           a.href = "javascript:;";
                           dijit.setWaiRole(a, "button");
                           dojo.connect(a, "onclick", dojo.hitch(stream, stream.edit, comment));
                           a.title = this._strings.EDIT_T;
                           a.appendChild(d.createTextNode(this._strings.EDIT));
                        li.appendChild(a);
                     ul.appendChild(li);
                  }
                  if (canDelete) {
                     var li = d.createElement("li");
                        if (!ul.firstChild)
                           li.className = "lotusFirst";
                        var a = d.createElement("a");
                           a.href = "javascript:;";
                           dijit.setWaiRole(a, "button");
                           dojo.connect(a, "onclick", dojo.hitch(stream, stream.remove, comment));
                           a.title = this._strings.DELETE_T;
                           a.appendChild(d.createTextNode(this._strings.DELETE));
                        li.appendChild(a);
                     ul.appendChild(li);
                  }
                  if (canFlag){
                     var li = d.createElement("li");
                        if (!ul.firstChild)
                           li.className = "lotusFirst";
                        var a = d.createElement("a");
                           a.href = "javascript:;";
                           dijit.setWaiRole(a, "button");
                           dojo.connect(a, "onclick", dojo.partial(this.generateFlagComment, comment));
                           a.title = this._strings.FLAG_T;
                           a.appendChild(d.createTextNode(this._strings.FLAG));
                        li.appendChild(a);
                     ul.appendChild(li);
                  }
                  divActions.appendChild(ul);
               divContent.appendChild(divActions);
            }

            // position:relative causes problems in IE when hiding/showing the comments.
            // it is only needed for absolutely positioned delete icons, which we don't use.
            // inlined so that comments on community-owned files work.
            divAuthor.style.position = divContent.style.position = "static";

         div.appendChild(divContent);
      }

      comment.element = div;
   },
   
   updateItem: function(stream, data, el, oldItem, result) {
      if (!result)
         throw "updateItem requires the new data";
      stream.resetData();
         
      var item = this._buildItem(result);
      var position = oldItem._position;
      data.itemByPosition[position] = item;
      data.itemById[item.getId()] = item;
      item._position = position;
      
      var d = document;
      
      var div = oldItem.element;
      lconn.share.util.html.removeChildren(div);
      
      oldItem.element = null;

      this.renderItem(stream, el, data, item, position, position == 0, position == data.itemByPosition.length-1, div);
      if (oldItem._isExpanded)
         this.toggleItem(stream, position);
   },
   removeItem: function(stream, el, data, item) {
      stream.resetData();

      var length = data.itemByPosition.length;
      var position = item._position;

      for (var i=position+1;i<length;i++) {
         var currentItem = data.itemByPosition[i];
            currentItem._position--;
      }
      data.itemByPosition.splice(position,1);
      delete data.itemById[item.getId()];            

      this._getCommentListNode(stream, el).removeChild(this._getCommentNode(item));

      if(position == 0 && data.itemByPosition.length > 0)
         dojo.addClass(this._getCommentNode(data.itemByPosition[0]), "lotusFirst");
      
      item.element = null;
   },

   generateLinkToPerson: function() {},
   generateLinkToComment: function() {}
});
