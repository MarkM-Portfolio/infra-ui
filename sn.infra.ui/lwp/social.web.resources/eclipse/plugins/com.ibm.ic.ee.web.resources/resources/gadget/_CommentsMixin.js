define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/html",
	"dojo/on",
	"dojo/string"
], function (declare, lang, dom, domConstruct, html, on, string) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2014                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var _CommentsMixin = declare("com.ibm.social.ee.gadget._CommentsMixin", null, {
	
	   // Must be implemented by subclass
	   getCommentOpts: function () {},
	   getCommentsTabLinkId: function() {},
	   
	   // May be implemented by subclass
	   commentCountChange: function (count) {
	      var title = string.substitute(this.nls.COMMENTS.TAB_TITLE, [count]);
	      html.set(dom.byId(this.getCommentsTabLinkId()), title);
	   },
	   
	   // May be set by subclass
	   commentWidgetClass: "com.ibm.social.ee.widget.Comments",
	
	   destroyUI: function () {
	      this.inherited(arguments);
	      if (this.commentCountConnect) { this.commentCountConnect.remove(); delete this.commentCountConnect; }
	      if (this.commentSizeChangeConnect) { this.commentSizeChangeConnect.remove(); delete this.commentSizeChangeConnect; }
	      if (this.commentsWidget) { this.commentsWidget.destroy(); delete this.commentsWidget; }
	   },
	        
	   initializeComments: function (dfd) {      
	      var commentsDiv = domConstruct.create("div", { }, this.getCommentsContainer());
	      
	      // Default comment options, can be overridden by subclass options
	      var self = this;
	      var commentOpts = {
	         authUser: self.authUser, 
	         commentCount: 0, 
	         initExpanded: true, 
	         net: self.network, 
	         url: "",
	         generateUserImage: lang.hitch(self, self.generateUserImage),
	         dsConstructor: null,
	         dsOpts: { },        
	         generateLinkToPerson: lang.hitch(self, self.generateLinkToPerson),
	         docTitle: "",
	         postModerationEnabled: false,
	         showVersion: false,
	         createdStrings: self.nls.COMMENT_CREATED,
	         currVersion: null,
	         linkifyComment: true,
	         htmlComments: false,
	         uuid: "",
	         isExternal: self.context && self.context.isSharedExternally?self.context.isSharedExternally:false,
	         routes: self.routes,
	         getFilesRoutes: lang.hitch(self, self.getFilesRoutes),
	         getAttachmentId: lang.hitch(self, self.getAttachmentId),
	         getAttachmentDetails: lang.hitch(self, self.getAttachmentDetails)
	      };      
	      var additionalOpts = this.getCommentOpts();
	      if (additionalOpts) {
	         lang.mixin(commentOpts, additionalOpts);
	      }      
	      var clz = lang.getObject(this.commentWidgetClass);
	      var comments = this.commentsWidget = new clz(commentOpts, commentsDiv);
	      if (dfd) {
	         var onDisplayedConnect = on(comments, "CommentsDisplayed", lang.hitch(null, function() {
	            onDisplayedConnect.remove();
	            dfd.callback();
	         }));
	      }
	      if (!commentOpts.noCountListener)
	         this.commentCountConnect = on(comments, "CountChange", lang.hitch(this, "commentCountChange"));
	      this.commentSizeChangeConnect = on(comments, "DisplayChange", lang.hitch(this, "onSizeChange"));      
	   }   
	});
	return _CommentsMixin;
});