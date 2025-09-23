/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.CommentMentionsStreamRenderer");

dojo.require("lconn.share.widget.Comments");
dojo.require("lconn.core.lcTextArea.widgets.BasicTextBox");
dojo.require("lconn.core.widget.mentions.MentionsDataFormatter");
dojo.require("com.ibm.oneui.controls.MessageBox");
dojo.require("lconn.share.util.html");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.share.widget.CommentMentionsStreamRenderer", [lconn.share.widget.CommentStreamRenderer], {
   decodeHtml: function(str){
      return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
   },
   
   unEscapeText: function(text) {
      if ( dojo.isIE == 8 ) {
         // assure that groups of spaces are not collapsed
         var SPACES_REGEX = / {2}/g;
         text = text.replace( SPACES_REGEX, ' &nbsp;' );
      }

      var unEescapeBuffer = document.getElementById("unEscapeBufferDiv");
      
      if (!unEescapeBuffer) {
          var tmp = document.createElement("div");
          tmp.id = 'unEscapeBufferDiv';
          tmp.style.display = 'none';
          document.body.appendChild(tmp);
          unEescapeBuffer = tmp;
      }
      unEscapeBufferDiv.innerHTML = text;
      var unEscaped = unEscapeBufferDiv.innerHTML;
      unEscapeBufferDiv.innerHTML = '';

      return unEscaped;
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
                        warning.title = format.toTimestamp();
                        string = lconn.core.globalization.bidiUtil.numShapeStr(string);
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
                                str = new lconn.share.util.DateFormat(comment.getPublished()).formatByAge(self._strings.COMMENT_CREATED_TIME);
                                str = lconn.core.globalization.bidiUtil.numShapeStr(str);
                                a.appendChild(d.createTextNode(str));
                                self.generateLinkToComment(comment, a);
                              return a;
                           }
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
               
               var pbody = d.createElement("p");
               pbody.className = "bidiAware";
               //transfer microformat to display format.
               
               this.parseCommentContent(pbody, this.formatContent(this.unEscapeText(comment.getContents())));
               
               var isQuarantined = comment.isQuarantined();
               var contents = (isQuarantined? this._strings.FLAG_QUARANTINED: comment.getContents()); 
               var divWide = d.createElement("div");
                  divWide.className = "lotusChunk lotusBreakWord bidiAware";
                  if (dojo.isIE) divWide.style.wordBreak = "normal";
                  divWide.appendChild(pbody);
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
      }

});
