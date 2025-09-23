/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/window",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/string",
	"dijit/registry",
	"ic-ee/util/ContentManipulation",
	"ic-ee/util/misc",
	"ic-ee/widget/Comments",
	"ic-incontext/util/html",
	"ic-incontext/util/text",
	"net/jazz/ajax/xdloader"
], function (dojo, windowModule, declare, lang, domAttr, domClass, domConstruct, query, string, registry, ContentManipulation, misc, Comments, html, text, xdloader) {

	(function () {
	
	var util = com.ibm.social.incontext.util;
	
	var Replies = declare("com.ibm.social.ee.widget.Replies", Comments, {
	   htmlComments: true,
	   topicId: null,
	   linkifyCreateComment: false,
	   countAvailable: false,
	   _repliesStrings: i18nsocialEEStrings.REPLIES,
	   _repliesStringsSubmitted: i18nsocialEEStrings.REPLIES_SUBMITTED,
	   postMixInProperties: function () {
	      this.inherited(arguments);
	      this._strings = lang.mixin({ }, this._strings);
	      lang.mixin(this._strings, this._repliesStrings);
	      
	      this._stringsSubmitted = lang.mixin({ }, this._stringsSubmitted);
	      lang.mixin(this._stringsSubmitted, this._repliesStringsSubmitted);
	   },
	   
	   updateShowingRecent: function() {        
	      if (this.showingRecent) {         
	         var msg = string.substitute(this._repliesStrings.SHOWING_RECENT_REPLIES, [this.showingDelta ? this.commentCount - this.showingDelta : this.defaultPageSize]);
	         domConstruct.empty(this.showingRecent);
	         this.showingRecent.appendChild(windowModule.doc.createTextNode(msg));
	      }
	   },
	   
	   postCreate: function () {
	        this.cmtList.style.display = "none";
	        this.inherited(arguments);
	        domClass.add(this.domNode, "lotusForumReplies");
	        var d = windowModule.doc;
	      
	      // Fix up the add comment/add reply link at the top
	      var addLink = query("a", this.addCommentLink)[0];
	      if (this.commentCount > this.defaultPageSize) {
	         var ul = domConstruct.create("ul", { className: "lotusInlinelist" }, addLink.parentNode);
	         this.showingRecent = domConstruct.create("li", { className: "lotusFirst lotusItalic" }, ul);
	         this.updateShowingRecent();         
	         var li = domConstruct.create("li", { }, ul);
	         li.appendChild(addLink);
	      }
	      
	      // Fix up the show more link
	      var showMoreLink = query("a", this.showMoreLink)[0];
	      domAttr.set(showMoreLink, "href", this.generateLinkToTopic(this.topicId));
	      domAttr.set(showMoreLink, "target", "_blank");      
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
	          domClass.add(this.domNode, "noShowMore");
	      }
	      this.inherited(arguments, [comments, moreExists, isInitial]);
	      
	      misc.addMessageToNewWindowLinks();
	   },   
	     
	   commentMetaRendered: function(ds, comment, divMeta, isDeleted) {
	
	      if (!isDeleted) {
	         var parentUuid = ds.getValue(comment, "parentUuid");
	         var isTopicReply = (parentUuid === this.topicId);
	         var d = windowModule.doc;
	         var self = this;   
	         
	         var replyUrl = ds.getValue(comment, "urlAlternate");
	         var a = domConstruct.create("a", { href: replyUrl, className: "navigateLink", title: this._strings.SHOW_FULL_REPLY_TOOLTIP, target: "_blank" }, divMeta);
	             domConstruct.create("img", { src: this._blankGif, className: "lconnSprite lconnSprite-iconPopup16", alt: this._strings.SHOW_FULL_REPLY}, a);
	             
	         var ul = domConstruct.create("ul", { className: "lotusInlinelist lotusActions"}, divMeta, "after");
	         var li = domConstruct.create("li", { className: "lotusFirst" }, ul);   
	         if (isTopicReply) {
	            util.html.substitute(d, li, this._repliesStrings.REPLY_TO_TOPIC, {
	               thisTopic: function () {
	                  var a = domConstruct.create("a", { 
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
	                  var a = domConstruct.create("a", { 
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
	      query(".lotusCommentItem", this.cmtList).forEach(function(item) {
	         if(!domClass.contains(item, "showMore")) {
	             scope.cmtList.removeChild(item);
	         }
	      });
	      this.inherited(arguments);
	   },
	   setCommentContent: function (isDeleted, divDetails, p, contents, ds, comment) {
	      var d = windowModule.doc;
	      if (isDeleted) {         
	         if (contents && contents.length) {
	            var msg = this._repliesStrings.REASON_FOR_DELETION;
	            util.html.substitute(d, p, msg, {
	               reason: function() { //encode the content as deletion messages are plain text
	                  return domConstruct.create("span", {className: "lotusItalic", innerHTML: util.html.encodeHtml(contents)});
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
	       var title = string.substitute(this._repliesStrings.REPLY_TITLE, [this.topicDs.getValue(this.topicEntry, "title")]);
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
	      var divContent = domConstruct.create("div", null, parentDiv), 
	         loadingDiv = domConstruct.create("div", null, parentDiv), spanMeta;
	      divContent.style.display = "none";
	      spanMeta = domConstruct.create("span", {className: "lotusMeta"}, divContent);
	      html.showLoading(loadingDiv);
	      
	      // obtain string from forums
	      var self = this;
	      xdloader.batch_load_async(["com.ibm.social.ee.util.ForumsStringLoader"], function() {
	         var str = lang.getObject("com.ibm.social.ee.util.ForumsStringLoader.strings.rs_rejectReply");
	         if (str) {
	            spanMeta.appendChild(windowModule.doc.createTextNode(str));            
	         }
	         loadingDiv.style.display = "none";
	         divContent.style.display = "";
	      });
	      return divContent;
	   },
	   updateLikes: function () {
	      query("div.lotusLike", this.domNode).forEach(function(node) {
	         var ctrl = registry.byNode(node);
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
	return Replies;
});
