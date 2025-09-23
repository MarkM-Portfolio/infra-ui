/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/dom",
		"dojo/_base/declare",
		"dojo/dom-attr",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/has",
		"dojo/dom-construct",
		"dojo/dom-class",
		"dojo/_base/lang",
		"dojo/i18n!ic-ublog/nls/Mentions",
		"dojo/json",
		"dojo/string",
		"dojo/text!ic-as/item/comment/templates/commentInput.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-core/url",
		"ic-as/constants/events",
		"com/ibm/ajax/auth",
		"ic-as/item/comment/InlineComments",
		"ic-core/auth",
		"ic-core/config/services",
		"ic-core/util/text",
		"ic-incontext/util/checkLoginMixin"
	], function (dojo, dom, declare, domAttr, i18nactivitystream, has, domConstruct, domClass, lang, i18nMentions, JSON, string, template, _Templated, _Widget, url, events, ibmAjaxAuth, InlineComments, auth, services, textModule, checkLoginMixin) {
	
		/**
		 * @author Yi Ming Huang (huangyim@cn.ibm.com)
		 * This class is used to implement the comment input in the news item
		 */
		var CommentInput = declare("com.ibm.social.as.item.comment.CommentInput", 
				[_Widget, _Templated, checkLoginMixin], {
		
			templateString: template,
		
			newsItem: null,
		
			strings: null,
			mentionsStrings: null,
		
			commentNotPermittedReason: null,
		
			hasError: false,
		
			maxCount: 1000,
			_fileAttachWidget: null,
			environment: "",
		
			postDisabled: true,
			cancelDisabled: false,
			_remainingChars: null,
		
			dirty: false,
			created: false,
		    checkLoginOrPerm: true,
			_defaultAuthHandler: null,
		
			// No. of chars remaining when we show the char count.
			showCharCount: 50,	
		
			// Max comment byte count.
			_maxByteCount: 4000,
		
			asCtx: url.getServiceUrl(services.opensocial).uri + "/rest/activitystreams",
			asPrefix: "urn:lsid:ibm.com:activitystreams:",
		
			itemDeselectedEvent:  events.ITEMDESELECTED,
			itemSelectedEvent:  events.ITEMSELECTED,
		
			postMixInProperties: function() {
				this.strings = i18nactivitystream;
				this.mentionsStrings = i18nMentions;
				this.inherited(arguments);
			},
		
			constructor :function(){
				this.maxCount = com.ibm.social.as.comment.commentInputManager.maxCount;
				this.environment = com.ibm.social.as.comment.commentInputManager.environment;
			},
		
			postCreate: function() {
				this._remainingChars = this.maxCount;
				this.created = true;
			},
		
			/**
			 * Hide the post/cancel action
			 */
			hideActions: function() {
				domClass.add(this.commentActionsAP, "lotusHidden");
			},
		
			/**
			 * Show the post/cancel action
			 */
			showActions: function() {
				if (!this.hasError) {
					domClass.remove(this.commentActionsAP, "lotusHidden");
				}
			},
		
			/**
			 * Disable the post actoin
			 */
			disablePostAction: function() {
				domClass.add(this.commentPostActoin, "lotusPersonInactive");
				domAttr.set(this.commentPostActoin, "aria-disabled", "true");
				this.postDisabled = true;
			},
			
			disableCancelBtn: function() {
				domClass.add(this.commentCancelBtn, "lotusPersonInactive");
				domAttr.set(this.commentCancelBtn, "aria-disabled", "true");
				this.cancelDisabled = true;
			},
		
			/**
			 * Enable the post action
			 */
			enableAction: function() {
				domClass.remove(this.commentPostActoin, "lotusPersonInactive");
				domAttr.set(this.commentPostActoin, "aria-disabled", "false");
				this.postDisabled = false;
			},
			
			enableCancelBtn: function() {
				domClass.remove(this.commentCancelBtn, "lotusPersonInactive");
				domAttr.set(this.commentCancelBtn, "aria-disabled", "false");
				this.cancelDisabled = false;
			},
		
			/**
			 * Function to trap pressing the spacebar to expand inline comment box
			 * @param e {Event} - Event that caused the function to be fired.
			 */
			expandKey: function(e) {
				// If spacebar has been pressed then expand the textbox.
				if (e && (e.keyCode || e.which) === 32) {
						this.expand();
				}
			},
		
			/**
			 * Expand the input link to textarea, also perform permission check
			 */
			expand: function() {		
		
				domClass.remove(this.addCommentAP, "lotusHidden");
				this.expandTextArea();
				domClass.remove(this.commentActionsAP, "lotusHidden");
				this.disablePostAction();
				this.setIsCommenting(true);
				topic.publish(this.itemSelectedEvent, this.newsItem);
				this._focusTextArea();
			},
			/**
			 * find external user message node
			 */
			getInlineComments: function(){
				var newsItem = this.newsItem || {};
				var inlineComments = newsItem.inlineComments || {};
				
				return inlineComments;
			},
			/**
			 * toggle external user message
			 */
			toggleSharedExternallyCommentsMessage : function(show){
				
				var inlineComments = this.getInlineComments();
				
				if(inlineComments && inlineComments.toggleSharedExternallyCommentsMessage){
					inlineComments.toggleSharedExternallyCommentsMessage(show);
				}
			},
			/**
			 * show external user message
			 */
			showSharedExternallyCommentsMessage : function(){
				this.toggleSharedExternallyCommentsMessage(true);
			},
			/**
			 * hide external user message
			 */
			hideSharedExternallyCommentsMessage : function(){
				this.toggleSharedExternallyCommentsMessage(false);
			},
			/**
			 * Put focus on the text area so user can enter a comment.
			 */
			_focusTextArea: function() {
				this._updateRemainingChars();
		
				if(this.checkLoginOrPerm){
					this._checkLogin();
		
					// show after permission check, since the not permitted case is rare
					this.checkPermission();
				}
		
				//IE losing focus
				if(has("ie")){
					if (document.activeElement.id != this.commentTextAP.id){
						setTimeout(lang.hitch(this, function(){
							if (document.activeElement.id != this.commentTextAP.id){
								this.commentTextAP.focus();
							}
						}), 500);
					}
				} else {
					this.commentTextAP.focus();
				}
			},
		
			/**
			 * Hide the inputWidget when delete all the inlineComment
			 */	
			hide: function() {
				this.collapseTextArea();
				domClass.add(this.addCommentAP, "lotusHidden");
				domClass.add(this.commentActionsAP, "lotusHidden");
			},
		
			/**
			 * Expand the text area and update the placeholder text
			 */
			expandTextArea: function() {
				domClass.remove(this.commentTextAP, "lotusTextCollapsed");
				domAttr.set(this.commentTextAP, "placeholder", this.strings.writeCommentText);
			},
		
			/**
			 * Collapse the text area and update the placeholder text
			 */
			collapseTextArea: function() {
				domClass.add(this.commentTextAP, "lotusTextCollapsed");
				domAttr.set(this.commentTextAP, "placeholder", this.strings.addCommentText);
			},
		
			setIsCommenting: function(isCommenting) {
				// need immediate sets because different subscribes happen in unexpected order
				com.ibm.social.as.comment.commentInputManager.isCommenting = isCommenting;
				if (isCommenting) {
					com.ibm.social.as.comment.commentInputManager.commentingNewsItem = this.newsItem.newsData.id;
					topic.publish(events.STARTCOMMENT, this);
					this.dirty = true;
					topic.publish(events.PAGEDIRTY, "asComment");
				} else {
					com.ibm.social.as.comment.commentInputManager.commentingNewsItem = null;
					topic.publish(events.STOPCOMMENT);
					this._keepAlive(false);
					this.dirty = false;
					topic.publish(events.PAGECLEAN, "asComment");
				}
			},
		
			/**
			 * Cancel action
			 */
			cancel: function() {
				if(!this.cancelDisabled){
					this.reset();
				}
			},
			
			reset: function() {
				this.resetNoDeselectEvent();
				topic.publish(this.itemDeselectedEvent, this.newsItem);
			},
		
			/**
			 * Provide the reset without a call to deselect event - we want to 
			 * call reset from a deselect event, based on selection of another
			 * news item. 
			 */
			resetNoDeselectEvent: function(){
				this.commentTextAP.value = "";
				this.collapseTextArea();
				var inlineComments = this.newsItem.inlineComments;
				if (inlineComments) {
					// The AS entry row should reduce back to its original size when comment num is 0.
					if(inlineComments.comments.totalItems == 0){
						domClass.add(this.addCommentAP, "lotusHidden");
					}else{
						domClass.remove(this.addCommentAP, "lotusHidden");
						this.hideActions();
					}
				}
		
				this._remainingChars = this.maxCount;
				this.commentCountdownAP.innerHTML = this._remainingChars;
				this.setIsCommenting(false);
				this.dirty = false;
				topic.publish(events.PAGECLEAN, "asComment");
		
			},
		    
		    _resetNoDeselectEventSetFocus: function (inlineComments) {
		        if (inlineComments) {
		            if (inlineComments.comments.totalItems === 0) {
		                if (dojo.isIE &&
		                        (document.activeElement == this.commentPostActoin
		                        || document.activeElement == this.commentCancelBtn)) {
		                    this.newsItem.placeFocusOnAction(this.strings.commentText);
		                } else if (this.focused){
		                    this.newsItem.placeFocusOnAction(this.strings.commentText);
		                } 
		            } else {
		                 if (dojo.isIE &&
		                        (document.activeElement == this.commentPostActoin
		                        || document.activeElement == this.commentCancelBtn)) {
		                    inlineComments.focusLastComment();   
		                } else if (this.focused){
		                    inlineComments.focusLastComment();   
		                } 
		            }
		        }            
		    },
		
			/**
			 * post the comment 
			 */
			post: function() {
				as_console_debug("com.ibm.social.as.item.comment.CommentInput - post");
		
				if (this.postDisabled) {
					this.commentTextAP.value = string.trim(this.commentTextAP.value);
					return;
				}
		
				// Check that the comment isn't too long in either length or byte count.
				var commentToPost = string.trim(this.commentTextAP.value);
				var commentBytes = textModule.lengthUtf8(commentToPost);
		
				if (commentBytes > this._maxByteCount || commentBytes.length > this.maxCount) {
					this.showCommentError(this.strings.commentLengthExceeded);
					return;
				}
		
				var id = this.newsItem.newsData.getActivityId();
				var commentUrl = activityStreamAbstractHelper.getCommentUrl(id);
				var commentObj = {
					content: commentToPost
				};
		
				var _this = this;
				_this.disablePostAction();
		
				activityStreamAbstractHelper.xhrPost({
					url: commentUrl,
					postData: JSON.stringify(commentObj),
					headers: {"Content-Type":"application/json; charset=utf-8"},
					handleAs: "json",
					load: function(response) {
						// SHINDIG-1758
						if (response.list) {
							response.entry = response.list;
						}
		
						// Look for the area to put hidden aria message.
						var ariaMessageDiv = dom.byId("hiddenAriaMessage");
		
						// If we have an area populate it. This will cause Jaws to utter the message.
						if (ariaMessageDiv) {
							ariaMessageDiv.innerHTML = _this.strings.commentPosted;
						}
		
						_this.addInlineComment(response.entry);
						_this.reset();
		
					},
					error: function(error) {
						as_console_debug(error);
						_this.showCommentError(_this.strings.commentFailureText);
					}
				});
			},
		
			/**
			 * Check permission if needed
			 */
			checkPermission: function() {
				// If we have already performed the permission check & it's not permitted 
				if (this.isCommentingPermitted === false) {
					this.showCommentError(this.commentNotPermittedReason);
				} else if ( this.isCommentingPermitted == "checking" ) {
					return; // we are already checking
				} else if (this.isCommentingPermitted == undefined) {
					this.isCommentingPermitted = "checking";
		
					// If we have never check the permission, check it
					var osEntryId = this.newsItem.newsData.getActivityId();
		
					// The MB isPermitted API only supports the Connections ID.
					// Need to strip the OpenSocial prefix from the ID.
					var connEntryId = this.getConnectionsEntryId(osEntryId);			
					var self = this;	
					var asc = window.activityStreamConfig;
		
					var args = {
						url: activityStreamAbstractHelper.getCommentPermittedUrl(connEntryId),
						handleAs: "xml",
						headers: {},
						handle: lang.hitch(this, function(doc) {
							this._resetDefaultHandler();
		
							if (doc instanceof Error){
								this.isCommentingPermitted = undefined;
		    					self.showCommentError(self.strings.commentFailureText);
								return;
							}
		
							this.isCommentingPermitted = undefined;
							try {
								// parsing the XML
								var isResult = doc.getElementsByTagName("result").length > 0;
								var resultTag = (isResult) ? "result" : "snx:result";
								var resultNode = doc.getElementsByTagName(resultTag)[0];
								var resultValue = resultNode.textContent || resultNode.text;

								var reasonTag = (isResult) ? "reason" : "snx:reason";
								var reasonNode = doc.getElementsByTagName(reasonTag)[0];
								var reasonValue = reasonNode ? reasonNode.textContent || reasonNode.text : "";
		
								// store the permission in NewsItem widget
								this.isCommentingPermitted = (resultValue == "true");
		
								if (this.isCommentingPermitted === false) {
									if ( reasonValue === "NOT_COMMUNITY_MEMBER" ) {
										this.generateCommunityIsCommentPermittedMsg(asc);
									} else if ( reasonValue === "NOT_AUTHENTICATED" ) {
										auth.login();
										return;
									} else {
										this.commentNotPermittedReason = this.strings.commentNotPermittedText;
									}
		
									this.showCommentError(this.commentNotPermittedReason);
								}
							} catch(e) {				
								this.showCommentError(this.strings.commentNotPermittedText);
							}
						})
					};
		
					// inject user relationship (membership/userrole/etc) hint
					if(asc.containerInfo && asc.containerInfo.relationship) {
						args.headers["X-CONN-REL"] = asc.containerInfo.relationship;
					}
		
					this._preventLoginRedirect(args);
		
					activityStreamAbstractHelper.xhrGet(args);
				}
			},
		
			/**
			* Use com.ibm.ajax.auth to capture authentication redirection on a request
			* allowing users copy any form data they may have entered before going to login page
			* e.g. if LTPA cookies were deleted or sesion timed out
			*
			* @param args
			* @private
			*/
			_preventLoginRedirect: function(args){
				if (lang.getObject("com.ibm.ajax.auth")) {
					args = ibmAjaxAuth.prepareSecure(args);
					this._defaultAuthHandler = ibmAjaxAuth.authenticationHandler;
		
					ibmAjaxAuth.setAuthenticationHandler(lang.hitch(this, function (data, ioArgs, onauthenticated) {
						this.checkLoginOrPerm = false;
						var timeout_str = string.substitute(this.strings.commentSessionTimedOut, ["/homepage"]);
		
						if (typeof data.dojoType != 'undefined' && data.dojoType == "unauthenticated") {
							this.showCommentError(timeout_str);
						} else if(data instanceof SyntaxError || (data instanceof Error && typeof data.unauthenticated != 'undefined' && data.unauthenticated)){
							this.showCommentError(timeout_str);
						} else if(data instanceof Error){
							this.showCommentError(this.strings.commentFailureText);
						}
		
					   this._resetDefaultHandler();
					}));
				}
			},
		
			/**
			 *
			 * @private
			 */
			_resetDefaultHandler: function () {
				if (lang.getObject("com.ibm.ajax.auth")) {
					ibmAjaxAuth.setAuthenticationHandler(this._defaultAuthHandler);
				}
			},
		
		
			/**
			 * Take ref to activity stream config
			 * Build the error message to display for community related
			 * commenting permission errors. 
			 * If in a community show relative message, if not then include
			 * the Community name linkified.
			 */
			generateCommunityIsCommentPermittedMsg: function(asc) {
				var communityId = this.newsItem.newsData.getCommunityId();
				topic.publish(events.COMMUNITYDISABLED, communityId);
				if(asc.containerInfo && asc.containerInfo.resourceId && asc.containerInfo.resourceId === communityId) {
					this.commentNotPermittedReason = this.mentionsStrings.JOIN_COMMUNITY;										
				} 
				else { //not relative build the community link
					var communityName = this.newsItem.newsData.getConnectionsContainerName();
					try {										
						//build a link using configured _target
						var tempDiv = domConstruct.create("div");
						domConstruct.create("a", {innerHTML: communityName, 
							target: this.newsItem.linkTarget, href: this.newsItem.getConnectionsCommunityUrl(communityId)}, tempDiv);
		
						this.commentNotPermittedReason = 
							string.substitute(this.mentionsStrings.JOIN_COMMUNITY_NON_SPECIFIC, [tempDiv.innerHTML]);																															
					} 
					catch(e) {
						if(communityName){
							this.commentNotPermittedReason = 
								string.substitute(this.mentionsStrings.JOIN_COMMUNITY_NON_SPECIFIC, [communityName]);
						} else {
							this.commentNotPermittedReason = this.mentionsStrings.JOIN_COMMUNITY;
						}						
					}
				}									
			},
		
			/**
			 * Show error and hide post/cancel actions
			 * @param text {string} error text
			 */
			showCommentError: function(text) {
				this.commentFailureTextAP.innerHTML = text;
				domClass.add(this.commentActionsAP, "lotusHidden");
				domClass.remove(this.commentErrorAP, "lotusHidden");
				this.hasError = true;
				this.setIsCommenting(false);
		
				// Put focus on the close button after displaying the message.
				this.closeBtn.focus();
			},
		
			/**
			 * Add an inline comment
			 * @param entry {object} comment entry
			 */
			addInlineComment: function(entry, fileDetails) {
				// map the comment object to reply object
				var comment = {
					id: entry.id,
					content: entry.content,
					author: entry.author,
					tags: entry.tags,
					updated: entry.published
				};
		
				// If inline liking is enabled for the SU, add likeService url to comment so we get like control
				if ( this.newsItem.newsData.isLikeEnabled() ) {
					comment.connections = { likeService: activityStreamAbstractHelper.getMBCommentLikeUrl(entry.id) };
				}
		
				if (this.newsItem.inlineComments) { // has comment already
					this.newsItem.inlineComments.addComment(comment,fileDetails);
		
				} else { // no comment yet, create inlineComments widget
					var replies = {
						items: [comment],
						totalItems: 1
					};
					this.newsItem.inlineComments = new InlineComments({
						newsItem: this.newsItem,
						comments: replies, 
						createdByActivityStream: true,
						showAddComment: true,
						focusAddComment: true
					}, this.newsItem.inlineCommentsNode);
				}		
				topic.publish(events.RESIZEHEIGHT, "comment", comment.id);
			},
		
			onKeyPress : function(evt) {
				// onkeypress is fired before the char is added to the
				// text area - quick approach is to use a timeout
				setTimeout(lang.hitch(this, function() {
					this._updateRemainingChars();
				}), 50);
			},
		
			/**
			 * Called while user input by keyboard or mouse
			 * Event listened to : 'onpropertychange' on IE7/8 , 'oninput' on other latest browses
			 */
			onInput : function(evt) {
				this._updateRemainingChars();
			},
		
			clearErrorMsg : function(){
				domClass.remove(this.commentActionsAP, "lotusHidden");
				domClass.add(this.commentErrorAP, "lotusHidden");
				this.hasError = false;
			},
		
			// Update UI with remaining number of chars and styling
			// and _remainingChars in the model
			_updateRemainingChars: function() {
		        this.maxCount = com.ibm.social.as.comment.commentInputManager.maxCount;
		        
				if ( ! this.created ) {
					// On IE, this is called before dijit fully created
					// and all the dojoAttachPoints are undefined, results in errors
					return;
				}
				// Setup remaining chars, making sure to string trim the comment value
				var commentLen = textModule.length(string.trim(this.commentTextAP.value));
				var remainingChars = this.maxCount - commentLen;
		
				// Decide whether to show the character counter or not.
				if (remainingChars > this.showCharCount) {
					domClass.add(this.commentCountdownContainer,"lotusHidden");
				} else {
					domClass.remove(this.commentCountdownContainer,"lotusHidden");
				}
		
				this.commentCountdownAP.innerHTML = remainingChars;
				this._remainingChars = remainingChars;
		
				if (remainingChars >= 0 && remainingChars != this.maxCount) {
					this.enableAction();
				} else {
					this.disablePostAction();
				}
		
				if(commentLen > 20) {
					this._keepAlive(10);
				}
			},
		
			_onFocus: function(){
		        // for a subclass to skip _onFocus execution
		        if(this._onFocusSubclassSkip()) {
		            return;
		        };
		        
				this.setIsCommenting(true);
				if(this.checkLoginOrPerm){
		            this._checkLogin();
		        }
		
				this.showSharedExternallyCommentsMessage();
			},
		    
		    _onFocusSubclassSkip : function(){},
		    
			
			_onBlur : function(){
		        // for a subclass to skip _onBlur execution
		        if(this._onBlurSubclassSkip()) {
		            return;
		        } else if((this._fileAttachWidget && (this._fileAttachWidget._filePickerOpened || this._fileAttachWidget.hasFileSelected()))){
					return;
				}
				else if(this.maxCount == this._remainingChars){
					this.reset();
				}
		
		        if(!com.ibm.social.as.comment.commentInputManager.isCommenting) {
		            this.hideSharedExternallyCommentsMessage();
		        }
			},
		    
		    _onBlurSubclassSkip : function(){},
		
			/**
			 * Pass in a OpenSocial User ID to retrieve the Connections user ID
			 * This will strip off the OpenSocial prefix on the ID
			 */
			getConnectionsEntryId: function(openSocialEntryId) {
				var ret = openSocialEntryId;
				if ( ret.indexOf('urn:lsid:lconn.ibm.com:') != -1 ) {
					var endPrefix = ret.lastIndexOf(':');
					if ( endPrefix != -1 ) {
						ret = ret.substr(endPrefix+1);
					}
				}
				return ret;
			}, 
		
			/*
			 * Override uninitialize. This is called automatically when the comment widget is destroyed. 
			 */
			uninitialize: function() {			
				com.ibm.social.as.comment.commentInputManager.removeCommentInputIfCurrent(this);					
				this.newsItem = null;
				this.strings = null;
				this.mentionStrings = null;
				domConstruct.destroy(this.domNode);
				this.domNode = null;
		
				this.inherited(arguments);					
			}
		
		});
		return CommentInput;
	});
