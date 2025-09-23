/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.CommentsMentions');

dojo.require("lconn.share.widget.Comments");
dojo.require("lconn.share.widget.CommentMentionsStreamRenderer");
dojo.require("lconn.core.lcTextArea.widgets.BasicTextBox");
dojo.require("lconn.core.widget.mentions.MentionsDataFormatter");
dojo.require("com.ibm.oneui.controls.MessageBox");
dojo.require("lconn.share.util.html");
dojo.require("lconn.core.util.text");

/**
 * The comment widget itself have the ability to support @mention.
 */
dojo.declare("lconn.share.widget.CommentsMentions", [lconn.share.widget.Comments], {

   shadowText: " ",
   MENTION_REGEX : /<[sS][pP][aA][nN] class="?vcard"?><[sS][pP][aA][nN] class="?fn"?>([^<>]+)<\/[sS][pP][aA][nN]><[sS][pP][aA][nN] class="?x-lconn-userid"?>([^<>]+)<\/[sS][pP][aA][nN]><\/[sS][pP][aA][nN]>/g,
   REVERSE_MENTION_REGEX: /<[sS][pP][aA][nN] class="?vcard"?><[aA] class="?fn url"? href=".*?">([^<>]+)<\/[aA]><[sS][pP][aA][nN] (?:(?:class="?x-lconn-userid"? style="?[dD][iI][sS][pP][lL][aA][yY]: none;?"?)|(?:style="?[dD][iI][sS][pP][lL][aA][yY]: none;?"? class="?x-lconn-userid"?))>([^<>]+)<\/[sS][pP][aA][nN]><\/[sS][pP][aA][nN]>/g,
   MENTION_PART1: "<span class=\"vcard\"><span class=\"fn\">",
   MENTION_PART2: "</span><span class=\"x-lconn-userid\">",
   MENTION_PART3: "</span></span>",
   templatePath: dojo.moduleUrl("lconn.share","widget/templates/CommentsMentions.html"),

   postMixInProperties: function() {
      this.inherited(arguments);
      var appNls = this._appstrings;
      var nls = this._strings;
      nls.JUMP_TO_PAGE = appNls.CONTENT.JUMP_TO_PAGE;
      nls.OF_PAGES = appNls.CONTENT.OF_PAGES;
      nls.JUMP_TO_PAGE_ALT = appNls.CONTENT.JUMP_TO_PAGE_ALT;
      nls.SORTING_DESC = appNls.CONTENT.SORTING_DESC;
      nls.SORTING_ASC = appNls.CONTENT.SORTING_ASC;
      nls.SORTING_DESC_LONG = appNls.CONTENT.SORTING_DESC_LONG;
      nls.SORTING_ASC_LONG = appNls.CONTENT.SORTING_ASC_LONG;
      this.renderer = new lconn.share.widget.CommentMentionsStreamRenderer({
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
         generateFlagComment: this.generateFlagComment,
         parseCommentContent: this.parseCommentContent,
         formatContent: this.formatContent,
         MENTION_REGEX: this.MENTION_REGEX,
         REVERSE_MENTION_REGEX: this.REVERSE_MENTION_REGEX,
         MENTION_PART1: this.MENTION_PART1,
         MENTION_PART2: this.MENTION_PART2,
         MENTION_PART3: this.MENTION_PART3,
         createUser: this.createUser,
         getLeftTrimString: this.getLeftTrimString,
         getRightTrimString: this.getRightTrimString
      });
   },
   
   formatContent: function(content){
      var match;
      var oContent = content;
      var lastIndex = 0;
      while((match = this.REVERSE_MENTION_REGEX.exec(content))!==null) {
         var matchIndex = match.index;
         if(matchIndex >= lastIndex) {
            var o = content.substring(match.index, match.index + match[0].length);
            var n = this.MENTION_PART1 + match[1] + this.MENTION_PART2 + match[2] + this.MENTION_PART3;
            oContent = oContent.replace(o, n);
            lastIndex = matchIndex + match[0].length;
         }
      }
      return oContent;
   },

   /**
    * Create comment will always use a same instance, but edit will create a new instance every time as
    * Files supports multiple edit box show out at the same time.
    */
   createMentionTextBox: function(parentelement){
      var opts = {
         useRTE: this.useCKEditor,
         //not sure the exact value for now, give it a big value. maxByteLength will validate it.
         maxLength: 10000000,
         maxByteLength: lconn.share.util.validation.COMMENT_LENGTH,
         mentionsEnabled: true,
         shadowText: this.shadowText
      };
      var instance = new lconn.core.lcTextArea.widgets.BasicTextBox(opts, parentelement);

      //create an object to hold the variable for files, e.g. warningMsg, skipWarningMsg, validatedUsers.
      instance.mentions = {};
      //container for already validated users.
      instance.mentions.validatedUsers = {};
      instance.mentions.warningMsg = this._strings.ERROR_MENTIONS_NO_PERMISSION;

      if ( this.useCKEditor ) {
         instance.parentelement = parentelement;
      }
      else {
         dojo.attr(instance.textAreaNode, "name", "description");
         dojo.style(instance.textAreaNode, {height: "8em", width: "95%", padding: "5px;"});
         instance._mentionsHelper.disableURLPreview = true;
         //hack setting _activeType, as it will cause editInstance.setText fail because of lacking _activeType 
         if (instance._mentionsHelper._registeredTypes) {
            for(var i = 0; i < instance._mentionsHelper._registeredTypes.length; i++) {
               if(instance._mentionsHelper._registeredTypes[i].declaredClass == 'lconn.core.widget.mentions.PersonMentionsType') {
                  instance._mentionsHelper._activeType = instance._mentionsHelper._registeredTypes[i];
               }
            }
         }

         instance._mentionsHelper.addCallback("onCreateMention", dojo.hitch(this, this._onCreateMention, instance, dojo.hitch(this, this._handleACLValidation, instance)));
         instance._mentionsHelper.addCallback("onRemoveMention", this._onRemoveMention);
      }

      instance.resetBox();
      return instance;
   },

   _handleACLValidation: function(instance, mUserId, response, ioArgs){
      var status = -1; 
      try {
         status = ioArgs.xhr.status;
      } 
      catch(e) {}
         
      if ( status == -1 || status == 403 ) {
         instance.mentions.validatedUsers[mUserId] = "false";
      }
      else {
         instance.mentions.validatedUsers[mUserId] = "true";
      }
   },
   
   _checkACLForMentionedUser: function( mentionedUserId, requestCallback ) {
      var url = this.routes.getFilesACLValidationURL(this.authenticatedUser, this.doc.getId(), {});
      this.net.headXml({
         url: url,
         noStatus: true,
         timeout: lconn.share.config.services.timeout.update*1000,
         headers: {
            "X-LCONN-USER": mentionedUserId
         },
         handle: dojo.hitch(this, requestCallback, mentionedUserId),
         sync: true
       });
   },

   /**
    * 
    * user, passed by onCreateMention event.
    */
   _onCreateMention: function(instance, callback, mentionedUser){
      //for setting content for editing case, skip the permission check process.
      if(instance.mentions.skipWarningMsg){
         return;
      }
      
      var mUserId = mentionedUser.getUserId();
      var isUserValidated = instance.mentions.validatedUsers[mUserId];
      //true means it is validated, no need to do it again; false means we already display warning message, just
      //remove symbol.
      if (isUserValidated=="true") {
         return;
      }
      else if (isUserValidated=="false") {
         mentionedUser.removeSymbol();
         return;
      }
      
      if (this.doc && this.doc.getVisibility() == "public") {
         instance.mentions.validatedUsers[mUserId] = "true";
         return;
      }
      else {
         // check synchronously, if mentioned user has access
         this._checkACLForMentionedUser( mUserId, callback );
         
         isUserValidated = instance.mentions.validatedUsers[mUserId];
         if ( isUserValidated == "false" ) {
            this._showWarningMessage(instance, mentionedUser.value );
            mentionedUser.removeSymbol();
         }
      }
   },

   _onCreateMentionRTE: function(basicTextBox, mentionCompletionArgs) {
      // assure that event belongs to the BasicTextBox instance
      if ( basicTextBox._editor && mentionCompletionArgs.editor && basicTextBox._editor != mentionCompletionArgs.editor) {
         return;
      }

      var mentionedUser = dojo.fromJson(mentionCompletionArgs.mention);
      var mUserId = mentionedUser.userId;

      var isUserValidated = basicTextBox.mentions.validatedUsers[mUserId];
      // true means it is validated, no need to do it again; false
      // means we already display warning message, just
      // remove symbol.
      if (isUserValidated == "true") {
         return;
      } else if (isUserValidated == "false") {
         mentionCompletionArgs.remove();
         return;
      }
      if (this.doc && this.doc.getVisibility() == "public") {
         basicTextBox.mentions.validatedUsers[mUserId] = "true";
         return;
      } else {
         // Check delayed, if mentioned user has access
         // - needed HTTP request is delayed, because it causes trouble in CKEditor under Firefox
         setTimeout(dojo.hitch( this, this._onCreateMentionRTEDelayed,
                                basicTextBox, dojo.hitch(this, this._handleACLValidation, basicTextBox), mentionCompletionArgs),
                    300);
      }
   },

   _onCreateMentionRTEDelayed: function(basicTextBox, callback, mentionCompletionArgs) {
      var mentionedUser = dojo.fromJson(mentionCompletionArgs.mention);
      // Send synchronous HTTP request to check access
      // -- this.mentions.validatedUsers[mentionedUser.userId] is set
      this._checkACLForMentionedUser(mentionedUser.userId, callback);

      var isUserValidated = basicTextBox.mentions.validatedUsers[mentionedUser.userId];
      if (isUserValidated == "false") {
         this._showWarningMessage(basicTextBox, mentionedUser.displayName);
         mentionCompletionArgs.remove();
      }
   },

   _showWarningMessage: function(instance, mentionedUserName){
      var d = document;
      var commentNodeParent = this.useCKEditor ? instance.parentelement : instance.textAreaNode.parentNode;
      var messageNode = d.createElement("div");
         dojo.attr(messageNode, "aria-live", "assertive");
         dojo.style(messageNode, {margin: "10px 0 0 0", width: "95%"});
      commentNodeParent.appendChild(messageNode);

      if(!instance.mentions.msgBox){
         instance.mentions.msgBox = new com.ibm.oneui.controls.MessageBox({
            canClose: false,
            msg: instance.mentions.warningMsg,
            type: com.ibm.oneui.controls.MessageBox.TYPE.WARNING,
         }, messageNode);
         var msgBody = instance.mentions.msgBox.msgBody;
         var ul = d.createElement("ul");
         var li = d.createElement("li");
         li.appendChild(d.createTextNode(mentionedUserName));
         ul.appendChild(li);          
         msgBody.appendChild(ul);
      }
      else {
         //only update the non-permission user list.
         var li = d.createElement("li");
         li.appendChild(d.createTextNode(mentionedUserName));
         var msgBody = instance.mentions.msgBox.msgBody;
         var ul = msgBody.childNodes[1];
         ul.appendChild(li);
      }
   },

   onACLValidationError: function() {
      var msg = this._strings.ERROR_MENTIONS_NO_PERMISSION;
      lconn.share.util.validation.setFormError(this.addCommentNode, msg);
   },

   resetWarningMessage: function(instance){
      if(instance.mentions.msgBox){
         instance.mentions.msgBox.destroy();
         instance.mentions.msgBox = null;
      }
      
      if(instance.mentions.validatedUsers){
         instance.mentions.validatedUsers = {};
      }
   },

   _onRemoveMention: function(){
      
   },

   getCommentValue: function(instance){
      var mentionData = instance.getTrackedMentions();
      var size = mentionData.textData.length;
      var i = 0;
      for(i = 0; i < size; i++){
         if (mentionData.textData[i].type == "text" || mentionData.textData[i].type == "html") {
            if (dojo.isIE && dojo.isIE == 8 && mentionData.textData[i].type == "html") {
            //if IE8 dojo.toJson() must be used to keep markup.
               mentionData.textData[i].value = dojo.toJson(mentionData.textData[i].value);
            //due to Json return being a string, double captions("") must be removed using substring.
               mentionData.textData[i].value = mentionData.textData[i].value.substring(1, mentionData.textData[i].value.length - 1);
            }
            mentionData.textData[i].value = this.encodeHtml(mentionData.textData[i].value);
         }
      }
      return this.mentionsDataFormatter.formatData(mentionData);
   },
   
   encodeHtml: function(str){
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
   },
   
   decodeHtml: function(str){
      return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
   }, 
   
   getLeftTrimString: function(str){
      var l = "";
      for( var i = 0; i < str.length; i++){
         if (str.charAt(i) == ' ')
            l = l + " ";
         else
            return l;
      }
      return l;
   },
   
   getRightTrimString: function(str){
      var r = "";
      for( var i = str.length - 1; i >= 0; i--){
         if (str.charAt(i) == ' ')
            r = r + " ";
         else
            return r;
      }
      return r;
   },
   
   parseCommentContent: function(textAreaNode, commentContent){
      var commentsNode = dojo.toDom(lconn.core.util.text.htmlify(commentContent, true));
      textAreaNode.appendChild(commentsNode);
      var mentions = dojo.query("span.vcard", textAreaNode);
      if (dojo.exists("SemTagSvc.onTagChanged")) {
         if (mentions) {
            dojo.forEach(mentions, function(mention) {
               SemTagSvc.onTagChanged(mention, true);
            });
         }
      }
   },

   setCommentValue: function(instance, commentContent){
      setTimeout(dojo.hitch({instance: instance, commentContent: commentContent}, function(){
         this.instance.setFocus();
         this.instance.mentions.skipWarningMsg = true;
         this.instance.setText(this.commentContent);
         this.instance.mentions.skipWarningMsg = false;
      }), 10);
   },

   createUser: function(self, displayName, user) {
      var d = document;
      var a = d.createElement("a");
         a.className = "lotusPerson";
         a.appendChild(d.createTextNode(user.name));
         self.generateLinkToPerson(user, a);
      return a;
   },

   postCreate: function() {
      //create comment box use a singleton instance
      this.mentionsDataFormatter = new lconn.core.widget.mentions.MentionsDataFormatter();
      var textBoxParent = this.addCommentNode['description'];
      if ( this.useCKEditor ) {
         textBoxParent.style.display = "none";
         textBoxParent = textBoxParent.parentElement;
      }
      this.createTextBox = this.createMentionTextBox(textBoxParent);

      this.inherited(arguments);
   },
   
   validateCreate: function() {
	   var form = this.addCommentNode;
	   return this.validateEdit(form, this.createTextBox, true);
   },

   validateEdit: function(form, editTextBoxInstance, isEdit) {
      var el = null;
      if ( this.useCKEditor ) {
         el = editTextBoxInstance.parentelement;
         lconn.share.util.validation.removeInlineErrorRow(el.parentNode, el);
      }
      else {
         el = editTextBoxInstance.textAreaNode;
         lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode.parentNode, el);
      }

      lconn.share.util.validation.removeFormErrors(form);
      var commentContent = this.getCommentValue(editTextBoxInstance);
      var valid = this.validateCommentContents(form, el, isEdit, commentContent);
      valid = this.validateCommentLength(form, el, editTextBoxInstance, commentContent) && valid;
      return valid;
   },

   validateCommentContents: function(form, el, isEdit, commentContent) {
      var valid = true;
      if (form) {
         if (lconn.share.util.text.trim(commentContent).length == 0) {
            if ( this.useCKEditor ) {
               lconn.share.util.validation.addInlineErrorRow(el.parentNode, el, "empty", isEdit ? this._strings.ERROR_NO_CONTENT_EDIT : this._strings.ERROR_NO_CONTENT);
            }
            else {
               lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode.parentNode, el, "empty", isEdit ? this._strings.ERROR_NO_CONTENT_EDIT : this._strings.ERROR_NO_CONTENT);
            }
            valid = false;            
         }
      }
      return valid;
   },
   validateCommentLength: function(form, el, instance, commentContent) {
      var valid = true;
      if ( form ) {
         var d = document;
         if ( !lconn.share.util.validation.validateTextLength( commentContent, lconn.share.util.validation.COMMENT_LENGTH ) ) {
            var contents = [ d.createTextNode( this._strings.WARN_LONG_COMMENT ) ];
            var a = d.createElement( "a" );
            a.href = "javascript:;";
            dojo.connect( a, "onclick", dojo.hitch( this, this.trimComment, el.id, instance ) );
            a.appendChild( d.createTextNode( " " ) );
            a.appendChild( d.createTextNode( this._strings.TRIM_LONG_COMMENT ) );
            contents.push( a );

            if ( this.useCKEditor ) {
               lconn.share.util.validation.addInlineErrorRow( el.parentNode, el, "length", contents );
            }
            else {
               lconn.share.util.validation.addInlineErrorRow( el.parentNode.parentNode.parentNode, el, "length", contents );
            }
            valid = false;
         }
      }
      return valid;
   },

   trimComment: function(id, instance) {
      lconn.share.util.html.confirm(this._strings.TRIM_LONG_COMMENT_CONFIRM, dojo.hitch(this, this._trimComment, id, instance));
   },
   _trimComment: function(id, instance) {
      var el = document.getElementById(id);
      if (el) {
         var comment = this.getCommentValue(instance);
         var i = lconn.share.util.text.getCharIndexForUtf8Index(comment, lconn.share.util.validation.COMMENT_LENGTH);
         if (i != -1)
            this.setCommentValue(instance, comment.substring(0, i));
         lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode, el, "length");
      }
   },
         
   createComment: function(e) {
      if (e) dojo.stopEvent(e);
      if (this.isEditable) {
         this.notifyNode.style.display = this.showNotification ? "" : "none";
         this.notifyCheckboxNode.checked = this.notifyCheckboxNode.defaultChecked = this.notifyOnComment;
         this.addCommentNode.style.display = "";
         this.toggleNode.style.display = "none";
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
         this.createTextBox.resetBox();
         this.createTextBox.setEditorAttr( "aria-required", "true" );
         if ( this.useCKEditor ) {
            this.addCommentBodyNode.htmlFor = this.createTextBox.id;

            this.createTextBox.setFocus();
            this.createTextBox.parentelement.completionHandle = 
               dojo.subscribe("lconn/microblogging/mention/completed", dojo.hitch(this, this._onCreateMentionRTE, this.createTextBox));
         }
         else {
            var textarea = this.createTextBox.textAreaNode;

            this.addCommentBodyNode.htmlFor = textarea.id;

            setTimeout(dojo.partial(function(textarea){dijit.focus(textarea);},textarea),150);
         }
         dijit.scrollIntoView(this.addCommentNode);
      }
      else
         this.addCommentNode.style.display = this.toggleNode.style.display = "none";
   },

   cancelCreate: function(e) {
      if (e) dojo.stopEvent(e);

      if ( this.useCKEditor ) {
         dojo.unsubscribe(this.createTextBox.parentelement.completionHandle);
      }
      this.resetWarningMessage(this.createTextBox);

      if (this.isEditable) {
         lconn.share.util.validation.removeFormErrors(this.addCommentNode);
         this.addCommentNode.style.display = "none";
         this.toggleNode.style.display = "";

         this.createTextBox.resetBox();
      }
      else
         this.addCommentNode.style.display = this.toggleNode.style.display = "none";
   },

   performCreate: function(e) {
      if (e) dojo.stopEvent(e);
      
      this.resetWarningMessage(this.createTextBox);

      if (!this.validateCreate()){
         if ( this.useCKEditor ) {
            this.createTextBox.setFocus();
         }
         else {
            var textAreaNode = this.createTextBox.textAreaNode;
            setTimeout(dojo.hitch(this, function(){dijit.focus(textAreaNode);}),150);
         }
         return;
      }
      if ( this.useCKEditor ) {
         dojo.unsubscribe(this.createTextBox.parentelement.completionHandle);
      }

      var notifyOnComment = this.notifyCheckboxNode.checked;
      var titleText = "";
      var commentText = this.getCommentValue(this.createTextBox)|| "";

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
            content.setAttribute("type","html");
            content.appendChild(doc.createTextNode(commentText));
         entry.appendChild(content);
         
      var text = lconn.share.util.dom.serializeXMLDocument(doc, true);
      
      var url = this.url;
      if (this.showNotification)
         url = lconn.share.util.uri.rewriteUri(url, {commentNotification: notifyOnComment ? "on" : "off"});
      
      this.disableInput(this.addCommentNode);
      this.net.postXml({
         url: this.url,
         timeout: (dojo.getObject("lconn.share.config.services.timeout.update") || 10)*1000,
         contentType: "application/atom+xml",
         postData: text,
         handle: dojo.hitch(this, this.handleCreate, notifyOnComment)
      });         
   },
   
   _destory: function(w) {
      if ( !this.useCKEditor ) {
         if ( w._mentionsHelper.domNode ) {
            var mentionsTypeaheadNode = dojo.byId(w._mentionsHelper.domNode.id);
            if(mentionsTypeaheadNode) {
               mentionsTypeaheadNode.parentNode.removeChild(mentionsTypeaheadNode);
            }
            delete w._mentionsHelper.domNode;
         }
      }
      if (w) {
         if (w.destroyRecursive)
            w.destroyRecursive();
         else if (w.destroy)
            w.destroy();
      }
   },

   edit: function(comment, e) {
      if (e) dojo.stopEvent(e);
      var el = comment.element;
      
      var div = dojo.query("DIV._qkrEditSection", el)[0];
      if (div)
         div.parentNode.removeChild(div);
      dojo.query(".lotusPostDetails", el)[0].style.display = "none";
      
      var d = document;
      div = d.createElement("div");
         div.className = "lotusChunk _qkrEditSection";
         var form = d.createElement("form");
            form.className = "lotusForm qkrAddComment";
            dojo.connect(form, "onsubmit", dojo.hitch(this, this.performEdit, comment));
            var table = d.createElement("table");
               table.className = "lotusFormTable";
               dijit.setWaiRole(table, "presentation");
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
                        var textarea = this.useCKEditor 
                        			   ? d.createElement("div")
                        			   : d.createElement("textarea");
                           textarea.id = dijit.getUniqueId("commentBody");
                           if ( !this.useCKEditor ) {
                               textarea.className = "lotusText";
                           }
                           textarea.name = "description";
                           var editTextBox = this.createMentionTextBox(textarea);
                           comment.textBoxInstance = editTextBox;
                           editTextBox.setEditorAttr( "aria-required", "true" );
                           var content = comment.getContents();
                           if ( this.useCKEditor ) {
                              comment.completionHandle = 
                                 dojo.subscribe("lconn/microblogging/mention/completed", dojo.hitch(this, this._onCreateMentionRTE, comment.textBoxInstance));
                              // FIXME - set attribute "rows"
                           }
                           else {
                              content = this.decodeHtml(comment.getContents()); // Need decode. CKEditor-lite needn't this as it will decode internally.
                              
                              textarea = editTextBox.textAreaNode;
                              textarea.setAttribute("rows", this._commentsRowsNum);
                           }
                           this.setCommentValue(editTextBox, this.formatContent(content));
                  
                           lconn.core.globalization.bidiUtil.inputRTLProcessing(textarea);      
                           dojo.connect(textarea, "onkeyup", function(){
                              lconn.core.globalization.bidiUtil.inputRTLProcessing(textarea);
                           });            
                                       
                        td.appendChild(editTextBox.domNode);
                        dojo.attr(label, "for", textarea.id);
                     tr.appendChild(td);
                  tbody.appendChild(tr);
                  var tr = d.createElement("tr");
                     var td = d.createElement("td");
                        td.className = "lotusFormFooter";
                        var input = d.createElement("input");
                           input.className = "lotusFormButton";
                           input.type = "submit";
                           input.value = this._strings.SAVE;
                        td.appendChild(input);
                        var inputCancel = d.createElement("input");
                           inputCancel.className = "lotusFormButton";
                           inputCancel.type = "button";
                           inputCancel.value = this._strings.CANCEL;
                           dojo.connect(inputCancel, "onclick", dojo.hitch(this, this.cancelEdit, comment));
                        td.appendChild(inputCancel);
                     tr.appendChild(td);
                  tbody.appendChild(tr);
               table.appendChild(tbody);
            form.appendChild(table);
         div.appendChild(form);
      el.appendChild(div);
      
      var textAreaNode = editTextBox.textAreaNode;
      setTimeout(dojo.partial(function(textAreaNode){dijit.focus(textAreaNode);},textAreaNode),150);
      dijit.scrollIntoView(div);
   },
   cancelEdit: function(comment, e) {
      if (e) dojo.stopEvent(e);

      if ( this.useCKEditor ) {
         dojo.unsubscribe(comment.completionHandle);
      }
      //destory comment mention box.
      if(comment.textBoxInstance){
         this._destory(comment.textBoxInstance);
      }

      var el = comment.element;
      var div = dojo.query("DIV._qkrEditSection", el)[0];
      if (div)
         div.parentNode.removeChild(div);
      dojo.query(".lotusPostDetails", el)[0].style.display = "";
      
      if(comment.focusElement) dijit.focus(comment.focusElement);
   },
   
   performEdit: function(comment, e) {
      if (e) dojo.stopEvent(e);

      var el = comment.element;
      var form = dojo.query("DIV._qkrEditSection > FORM", el)[0];
      
      var editTextBoxInstance = comment.textBoxInstance;

      if (!this.validateEdit(form, editTextBoxInstance, true)){
         if ( this.useCKEditor ) {
        	 editTextBoxInstance.setFocus();
         }
         else {
             var textAreaNode = editTextBoxInstance.textAreaNode;
             setTimeout(dojo.partial(function(textAreaNode){dijit.focus(textAreaNode);},textAreaNode),150);
         }
         return;
      }
      if ( this.useCKEditor ) {
         dojo.unsubscribe(comment.completionHandle);
      }

      var titleText = "";
      var commentText = this.getCommentValue(editTextBoxInstance);
      
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
            content.setAttribute("type","html");
            content.appendChild(doc.createTextNode(commentText));
         entry.appendChild(content);
      var text = lconn.share.util.dom.serializeXMLDocument(doc, true);
      if (comment.saveAsNew) {
         this.net.postXml({
            url: this.url,
            timeout: (dojo.getObject("lconn.share.config.services.timeout.update") || 10)*1000,
            contentType: "application/atom+xml",
            postData: text,
            handle: dojo.hitch(this, this.handleSaveAsNew, comment)
         });
      } else {
         this.net.putXml({
            url: lconn.share.util.uri.rewriteUri(comment.getUrlEntry(), {acls: true}),
            timeout: (dojo.getObject("lconn.share.config.services.timeout.update") || 10)*1000,
            contentType: "application/atom+xml",
            postData: text,
            requireData: true,
            handle: dojo.hitch(this, this.handleEdit, comment)
         });
      }
      
      //destory comment mention box instance
      if(comment.textBoxInstance){
         this._destory(comment.textBoxInstance);
      }
   }
});
   
