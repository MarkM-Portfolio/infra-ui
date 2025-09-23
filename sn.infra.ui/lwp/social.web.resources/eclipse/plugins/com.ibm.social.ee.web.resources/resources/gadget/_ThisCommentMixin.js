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

dojo.provide("com.ibm.social.ee.gadget._ThisCommentMixin");

dojo.require("com.ibm.social.ee.widget.ThisComment");

dojo.declare("com.ibm.social.ee.gadget._ThisCommentMixin", null, {

   // Must be implemented by subclass
   getThisCommentOpts: function () {},
   getThisCommentContainer: function() {},
   
   // May be set by subclass
   thisCommentWidgetClass: "com.ibm.social.ee.widget.ThisComment",

   destroyUI: function () {
      this.inherited(arguments);
	  if (this.thisCommentSizeChangeConnect) { dojo.disconnect(this.thisCommentSizeChangeConnect); delete this.thisCommentSizeChangeConnect; }
      if (this.thisCommentWidget) { this.thisCommentWidget.destroy(); delete this.thisCommentWidget; }
   },
        
   initializeThisComment: function () {      
      var commentsDiv = dojo.create("div", { }, this.getThisCommentContainer());
      
      // Default comment options, can be overridden by subclass options
      var self = this;
      var commentOpts = {
         authUser: self.authUser, 
         commentCount: 1, 
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
         isExternal: self.context && self.context.isSharedExternally?self.context.isSharedExternally:false
      };
      var additionalOpts = this.getThisCommentOpts();
      if (additionalOpts) {
         dojo.mixin(commentOpts, additionalOpts);
      }      
      var clz = dojo.getObject(this.thisCommentWidgetClass);
      this.thisCommentWidget = new clz(commentOpts, commentsDiv);
      this.thisCommentSizeChangeConnect = dojo.connect(this.thisCommentWidget, "onDisplayChange", this, "onSizeChange");      
   }   
});