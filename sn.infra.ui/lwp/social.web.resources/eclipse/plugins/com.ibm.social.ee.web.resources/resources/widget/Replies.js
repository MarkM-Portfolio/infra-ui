/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.Replies");

dojo.require("com.ibm.social.ee.widget.Comments");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.ee.util.ContentManipulation");
dojo.require("dojo.string");
dojo.require("net.jazz.ajax.xdloader");

(function () {

var util = com.ibm.social.incontext.util;

dojo.declare("com.ibm.social.ee.widget.Replies", com.ibm.social.ee.widget.Comments, {
   htmlComments: true,
   topicId: null,
   linkifyCreateComment: false,
   countAvailable: false,
   _repliesStrings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").REPLIES,
   _repliesStringsSubmitted: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").REPLIES_SUBMITTED,
   postMixInProperties: function () {
      this.inherited(arguments);
      this._strings = dojo.mixin({ }, this._strings);
      dojo.mixin(this._strings, this._repliesStrings);
      
      this._stringsSubmitted = dojo.mixin({ }, this._stringsSubmitted);
      dojo.mixin(this._stringsSubmitted, this._repliesStringsSubmitted);
   },
   
   updateShowingRecent: function() {        
      if (this.showingRecent) {         
         var msg = dojo.string.substitute(this._repliesStrings.SHOWING_RECENT_REPLIES, [this.showingDelta ? this.commentCount - this.showingDelta : this.defaultPageSize]);
         dojo.empty(this.showingRecent);
         this.showingRecent.appendChild(dojo.doc.createTextNode(msg));
      }
   },
   
   postCreate: function () {
        this.cmtList.style.display = "none";
        this.inherited(arguments);
        dojo.addClass(this.domNode, "lotusForumReplies");
        var d = dojo.doc;
      
      // Fix up the add comment/add reply link at the top
      var addLink = dojo.query("a", this.addCommentLink)[0];
      if (this.commentCount > this.defaultPageSize) {
         var ul = dojo.create("ul", { className: "lotusInlinelist" }, addLink.parentNode);
         this.showingRecent = dojo.create("li", { className: "lotusFirst lotusItalic" }, ul);
         this.updateShowingRecent();         
         var li = dojo.create("li", { }, ul);
         li.appendChild(addLink);
      }
      
      // Fix up the show more link
      var showMoreLink = dojo.query("a", this.showMoreLink)[0];
      dojo.attr(showMoreLink, "href", this.generateLinkToTopic(this.topicId));
      dojo.attr(showMoreLink, "target", "_blank");      
   },
   
   _showCommentsUI: function(commentArray, moreExists, isInitial) {
      this.cmtList.style.display = "";
      var comments = [];
      comments = comments.concat(commentArray);
      this.showingDelta = this.commentCount - comments.length;
      if (this.additionalReplies) {
         var a = this.additionalReplies;             
         for (var i = 0; i < a.length; i++) {
            comments.splice(0, 0, a[i]); // Insert items at beginning of array (inverse date order)
            this.commentCount++;
         }
         
         this.updateShowingRecent();
      }         
      if (!moreExists) {
          dojo.addClass(this.domNode, "noShowMore");
      }
      this.inherited(arguments, [comments, moreExists, isInitial]);
      
      com.ibm.social.ee.util.misc.addMessageToNewWindowLinks();
   },   
     
   commentMetaRendered: function(ds, comment, divMeta, isDeleted) {

      if (!isDeleted) {
         var parentUuid = ds.getValue(comment, "parentUuid");
         var isTopicReply = (parentUuid === this.topicId);
         var d = dojo.doc;
         var self = this;   
         
         var replyUrl = ds.getValue(comment, "urlAlternate");
         var a = dojo.create("a", { href: replyUrl, className: "navigateLink", title: this._strings.SHOW_FULL_REPLY_TOOLTIP, target: "_blank" }, divMeta);
             dojo.create("img", { src: this._blankGif, className: "lconnSprite lconnSprite-iconPopup16", alt: this._strings.SHOW_FULL_REPLY}, a);
             
         var ul = dojo.create("ul", { className: "lotusInlinelist lotusActions"}, divMeta, "after");
         var li = dojo.create("li", { className: "lotusFirst" }, ul);   
         if (isTopicReply) {
            util.html.substitute(d, li, this._repliesStrings.REPLY_TO_TOPIC, {
               thisTopic: function () {
                  var a = dojo.create("a", { 
                     href: self.generateLinkToTopic(self.topicId),
                     title: self._repliesStrings.NAVIGATE_TO_TOPIC,
                     target: "_blank"
                  });
                  a.appendChild(d.createTextNode(self._repliesStrings.THIS_TOPIC));
                  return a;
               }
            });
         }
         else {
            util.html.substitute(d, li, this._repliesStrings.REPLY_TO_REPLY, {
               thisReply: function () {
                  var a = dojo.create("a", { 
                     href: self.generateLinkToReply(self.topicId, parentUuid),
                     title: self._repliesStrings.NAVIGATE_TO_REPLY,
                     target: "_blank"
                  });
                  a.appendChild(d.createTextNode(self._repliesStrings.THIS_REPLY));
                  return a;
               }
            });
         }

          var divContent = divMeta.parentNode;
          divContent.actionList = ul;
      }

   },
   generateLinkToTopic: function (topicId) {
      return "#";
   },
   generateLinkToReply: function (topicId, replyId) {
      return "#";
   },
   _getMoreComments: function () {
      // No-op
   },
   _tryAgain: function(isInitial) {
      //every time we retrieve all replies so we want to make sure we don't show duplicates
      var scope = this;
      dojo.query(".lotusCommentItem", this.cmtList).forEach(function(item) {
         if(!dojo.hasClass(item, "showMore")) {
             scope.cmtList.removeChild(item);
         }
      });
      this.inherited(arguments);
   },
   setCommentContent: function (isDeleted, divDetails, p, contents, ds, comment) {
      var d = dojo.doc;
      if (isDeleted) {         
         if (contents && contents.length) {
            var msg = this._repliesStrings.REASON_FOR_DELETION;
            util.html.substitute(d, p, msg, {
               reason: function() { //encode the content as deletion messages are plain text
                  return dojo.create("span", {className: "lotusItalic", innerHTML: util.html.encodeHtml(contents)});
               }
            });
         }
      }
      else {
         this.setCommentContentSummary(contents, p, this.SHORT_COMMENT_LENGTH);
      }
   },
   _handleDS: function(commentText){

       var ds = this._moreDs;
       var item = ds.newItem({ });
       var title = dojo.string.substitute(this._repliesStrings.REPLY_TITLE, [this.topicDs.getValue(this.topicEntry, "title")]);
       ds.setValue(item, "contents", commentText);
       ds.setValue(item, "title", title);
       ds.setValue(item, "replyTo", this._getReplyTo());
       this._doPerformCreate(ds, item);
   },
   _getReplyTo: function () {
      return this.topicDs.getValue(this.topicEntry, "id");
   },
   addReply: function (item) {
      this._createCommentUItem(item, null, true, false, false);
   },
   onCountChange: function(count) {
      this.inherited(arguments);
      this.updateShowingRecent();
   },
   _getFetchCount: function(isInitial) {
      return this.initialPageSize;
   },
   displayRejectedStateChangedBy: function() {
      return false;
   },
   addRejectedDivContentNoPersonRef: function(parentDiv) {
      var divContent = dojo.create("div", null, parentDiv), 
         loadingDiv = dojo.create("div", null, parentDiv), spanMeta;
      divContent.style.display = "none";
      spanMeta = dojo.create("span", {className: "lotusMeta"}, divContent);
      com.ibm.social.incontext.util.html.showLoading(loadingDiv);
      
      // obtain string from forums
      var self = this;
      net.jazz.ajax.xdloader.batch_load_async(["com.ibm.social.ee.util.ForumsStringLoader"], function() {
         var str = dojo.getObject("com.ibm.social.ee.util.ForumsStringLoader.strings.rs_rejectReply");
         if (str) {
            spanMeta.appendChild(dojo.doc.createTextNode(str));            
         }
         loadingDiv.style.display = "none";
         divContent.style.display = "";
      });
      return divContent;
   },
   updateLikes: function () {
      dojo.query("div.lotusLike", this.domNode).forEach(function(node) {
         var ctrl = dijit.byNode(node);
         ctrl.populateRecommend();
      });
   },
    /**
     * @override
     * @returns string, the aria label
     * @protected
     */
    _getCommentAriaLabelSameDay: function(){
        return this._asStrings.replyAriaLabelSameDay;
    },
    /**
     * @override
     * @returns string, the aria label
     * @protected
     */
    _getCommentAriaLabelOtherDay: function(){
        return this._asStrings.replyAriaLabel;
    }
});

})();