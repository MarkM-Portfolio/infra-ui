/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget._CommentsMixin");

dojo.require("com.ibm.social.ee.widget.Comments");

dojo.declare("com.ibm.social.ee.gadget._CommentsMixin", null, {

   // Must be implemented by subclass
   getCommentOpts: function () {},
   getCommentsTabLinkId: function() {},
   
   // May be implemented by subclass
   commentCountChange: function (count) {
      var title = dojo.string.substitute(this.nls.COMMENTS.TAB_TITLE, [count]);
      dojo.html.set(dojo.byId(this.getCommentsTabLinkId()), title);
   },
   
   // May be set by subclass
   commentWidgetClass: "com.ibm.social.ee.widget.Comments",

   destroyUI: function () {
      this.inherited(arguments);
      if (this.commentCountConnect) { dojo.disconnect(this.commentCountConnect); delete this.commentCountConnect; }
      if (this.commentSizeChangeConnect) { dojo.disconnect(this.commentSizeChangeConnect); delete this.commentSizeChangeConnect; }
      if (this.commentsWidget) { this.commentsWidget.destroy(); delete this.commentsWidget; }
   },
        
   initializeComments: function (dfd) {      
      var commentsDiv = dojo.create("div", { }, this.getCommentsContainer());
      
      // Default comment options, can be overridden by subclass options
      var self = this;
      var commentOpts = {
         authUser: self.authUser, 
         commentCount: 0, 
         initExpanded: true, 
         net: self.network, 
         url: "",
         generateUserImage: dojo.hitch(self, self.generateUserImage),
         dsConstructor: null,
         dsOpts: { },        
         generateLinkToPerson: dojo.hitch(self, self.generateLinkToPerson),
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
         getFilesRoutes: dojo.hitch(self, self.getFilesRoutes),
         getAttachmentId: dojo.hitch(self, self.getAttachmentId),
         getAttachmentDetails: dojo.hitch(self, self.getAttachmentDetails)
      };      
      var additionalOpts = this.getCommentOpts();
      if (additionalOpts) {
         dojo.mixin(commentOpts, additionalOpts);
      }      
      var clz = dojo.getObject(this.commentWidgetClass);
      var comments = this.commentsWidget = new clz(commentOpts, commentsDiv);
      if (dfd) {
         var onDisplayedConnect = dojo.connect(comments, "onCommentsDisplayed", null, function() {
            dojo.disconnect(onDisplayedConnect);
            dfd.callback();
         });
      }
      if (!commentOpts.noCountListener)
         this.commentCountConnect = dojo.connect(comments, "onCountChange", this, "commentCountChange");
      this.commentSizeChangeConnect = dojo.connect(comments, "onDisplayChange", this, "onSizeChange");      
   }   
});