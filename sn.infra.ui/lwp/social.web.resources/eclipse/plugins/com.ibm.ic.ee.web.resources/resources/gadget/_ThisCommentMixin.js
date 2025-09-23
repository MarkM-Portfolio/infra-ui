/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/on"
], function (declare, lang, domConstruct, on) {

	var _ThisCommentMixin = declare("com.ibm.social.ee.gadget._ThisCommentMixin", null, {
	
	   // Must be implemented by subclass
	   getThisCommentOpts: function () {},
	   getThisCommentContainer: function() {},
	   
	   // May be set by subclass
	   thisCommentWidgetClass: "com.ibm.social.ee.widget.ThisComment",
	
	   destroyUI: function () {
	      this.inherited(arguments);
		  if (this.thisCommentSizeChangeConnect) { this.thisCommentSizeChangeConnect.remove(); delete this.thisCommentSizeChangeConnect; }
	      if (this.thisCommentWidget) { this.thisCommentWidget.destroy(); delete this.thisCommentWidget; }
	   },
	        
	   initializeThisComment: function () {      
	      var commentsDiv = domConstruct.create("div", { }, this.getThisCommentContainer());
	      
	      // Default comment options, can be overridden by subclass options
	      var self = this;
	      var commentOpts = {
	         authUser: self.authUser, 
	         commentCount: 1, 
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
	         isExternal: self.context && self.context.isSharedExternally?self.context.isSharedExternally:false
	      };
	      var additionalOpts = this.getThisCommentOpts();
	      if (additionalOpts) {
	         lang.mixin(commentOpts, additionalOpts);
	      }      
	      var clz = lang.getObject(this.thisCommentWidgetClass);
	      this.thisCommentWidget = new clz(commentOpts, commentsDiv);
	      this.thisCommentSizeChangeConnect = on(this.thisCommentWidget, "DisplayChange", lang.hitch(this, "onSizeChange"));      
	   }   
	});
	return _ThisCommentMixin;
});
