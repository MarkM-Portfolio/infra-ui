/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/lang",
		"dojo/_base/declare",
		"dojo/fx",
		"dojo/fx/easing",
		"dojo/dom-attr",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/aspect",
		"dojo/dom-style",
		"dojo/has",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/query",
		"dojo/string",
		"dojo/text!ic-as/item/comment/templates/inlineComments.html",
		"dojo/topic",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-ui/controls/MessageBox",
		"ic-as/constants/events",
		"ic-as/item/comment/CommentRetriever",
		"ic-as/item/comment/CommentInputMentions",
		"ic-as/item/comment/FileAttached",
		"ic-as/item/comment/InlineComment",
		"ic-as/item/comment/SharedExternallyComments",
		"ic-as/util/LinkTarget",
		"ic-socgadget/people/scanner"
	], function (dojo, lang, declare, fx, easingModule, domAttr, i18nactivitystream, aspect, domStyle, has, domClass, domConstruct, array, query, string, template, topic, _Templated, _Widget, MessageBox, events, CommentRetriever, CommentInputMentions, FileAttached, InlineComment, SharedExternallyComments, LinkTarget, scanner) {
	
		/**
		 * Dijit for displaying inline news item comments. Implementation searches
		 * through the replies in a news event and create a list item for them.
		 * 
		 * @author Robert Campion
		 */
		
		var InlineComments = declare("com.ibm.social.as.item.comment.InlineComments", 
		[_Widget, _Templated,
		 LinkTarget], {
			
			createdByActivityStream: false,
			
			// Overall 'comments' object
			comments: null,
			
			additionalCommentCount: 0,
			additionalCommentStep: 0,
			
			commentsNodes: null,
			
			// Parent news item
			newsItem: null,
			
			// Boolean indicating if the Show More legend is displayed.
			showMoreDisplayed: false,
			
			// Resource bundle
			strings: null,
			
			network: null,
			
			commentRetriever: null,
			
		
			expandErrorMessage: null,
			
			// Path to the template HTML
			templateString: template,
			
			/**
			 * Comparator: sort the comments by date in ASC order
			 * Leave here in case third party comments come in different order
			 * @param comment1 {object} left
			 * @param comment2 {object} right
			 * @returns {Number} -1/0/1
			 */
			sortByDateAsc: function(comment1, comment2) {
				var date1 = Date.parse(comment1.updated);
				var date2 = Date.parse(comment2.updated);
				return date1 - date2;
			},
			
			postMixInProperties: function(){
				this.inherited(arguments);
				
				// Get the strings bundle
				this.strings = i18nactivitystream;
				
				this.commentRetriever = new CommentRetriever(
					this.newsItem.newsData.getActivityId(), // su ID
					this.comments // initial comments
				);
			},
			
			postCreate: function(){
				this.commentsNodes = [];
				
				this.initializeInlineComments(this.comments);
				if ( this.showAddComment ) {
					var input = new CommentInputMentions({
						newsItem: this.newsItem
					}, this.commentInputNodeInline);			
					
					this.newsItem.setCommentInput(input);
					
					if ( this.focusAddComment ) {
						this.showCommentInputStandalone();
					}
					this.own(topic.subscribe(events.COMMUNITYDISABLED, lang.hitch(this,"communityDisabled")));
				}
				
			},
			
			communityDisabled: function(communityId){
				if(this.newsItem && this.newsItem.newsData && this.newsItem.newsData.getCommunityId()===communityId && this.comments.totalItems>0) {
					this.newsItem.commentInput.collapseTextArea();
					domClass.add(this.newsItem.commentInput.commentActionsAP, "lotusHidden");
				}
			},
			
			initializeInlineComments: function(comments){
		
		        // add itself to the newsItem. workaround as the CommentsInput will need to access this InlineComments
		        this.newsItem.inlineComments = this;
		
				this.comments = comments;
				/* Add any comment items available to the UI. If we don't get any comments make sure
				   the array is initialized. */
				this.comments.items = (this.comments.items) ? this.comments.items : [];
				var commentItems = this.comments.items;
		
				// Validate the comments and remove invalid ones
				this.comments = this.validateComments(this.comments);
				
				// Set up the totalitems. If not supplied set it to the number of items we have.
				this.comments.totalItems = (this.comments.totalItems) ? this.comments.totalItems : commentItems.length;
				
				// If there are no items to display
				if(!this.comments.totalItems && !this.showAddComment){
					// Hide this inline comments node and return
					domClass.add(this.domNode, "lotusHidden");
					return;
				}
		
				// Setup more comments text
				this.setupMoreCommentsText();
				
				var numCommentItems = commentItems.length;
				var fragment = document.createDocumentFragment();
			
				commentItems.sort(this.sortByDateAsc);
				// Iterate through all comment items
				for(var c=0, l=numCommentItems; c<l; c++){
					var comment = commentItems[c];
					var commentDijit = this.createCommentNode(comment, (c==0));
					fragment.appendChild(commentDijit.domNode);
					
					// Only update if creating a widget for inline comment created
					// by the Activity Stream otherwise the initial build of News Feed  
					// will take care of updating all target links in one query
					if(this.createdByActivityStream){
						this.modifyContentLinkTargets(commentDijit.domNode);	
					}
				}
				domConstruct.place(fragment, this.expandCommentsErrorNode, "before");
				
				// add the shared externally comments block
				this.sharedExternallyComments = new SharedExternallyComments({useTimeout:true}, this.sharedExternallyComments);
			},
			
			/**
			 * Handle a call to reset the comment input on standalone
			 * or comment list. This will be used when a news item
			 * loses selection, we should snap the input back to default
			 */
			resetCommentInput: function(){
				//check to see if a commentInput exists first
				if(this.newsItem.commentInput){
					if(this.comments){
						if(this.comments.totalItems > 0){				
							this.newsItem.commentInput.resetNoDeselectEvent();
						}			
						else{
							this.hideCommentInputStandaloneNoDeselectEvent();
						}
					}			
				}
			},
			
			showCommentInputStandalone: function(){
				domClass.remove(this.commentListNode, "lotusHidden");
				this.newsItem.commentInput.expand();
			},
			
			hideCommentInputStandalone: function(){
				domClass.add(this.commentListNode, "lotusHidden");
				this.newsItem.commentInput.reset();
			},
			
			hideCommentInputStandaloneNoDeselectEvent: function(){
				domClass.add(this.commentListNode, "lotusHidden");
				this.newsItem.commentInput.resetNoDeselectEvent();
			},
			/**
			 * toggle external user message
			 */
			toggleSharedExternallyCommentsMessage : function(show){
				
				if(this.sharedExternallyComments){
					if(show){
						if(this.newsItem && this.newsItem.isSharedExternally)
							this.sharedExternallyComments.show();
					}
					else 
						this.sharedExternallyComments.hide();
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
			 * Validate the comments passed, making sure they have the correct properties.
			 * If they don't, remove them from the comments array.
			 * @param comments {Object} all comments.
			 * @returns comments {Object} possibly altered.
			 */
			validateComments: function(comments){
				for ( var c = comments.items.length-1; c >= 0; c-- ) {
					var comment = comments.items[c];
					
					// If the comment author or content aren't there
					// no point in showing the comment
					if(!(comment.author && comment.author.displayName && comment.author.id) 
							|| !comment.content){
						// Remove it from the array
						comments.items.splice(c, 1);
						if(comments.totalItems){
							comments.totalItems--;
						}
					}
				}
				
				return comments;
			},
			
			setupMoreCommentsText: function(){
				var numTotalComments = this.comments.totalItems;
				var numDisplayedComments = this.comments.items.length;
		
				this.showMoreDisplayed = false;
		
				// Form a title and comment that will be spoken by Jaws.
				var titleForAria = this.newsItem.titleForDescription || this.strings.noDescriptionAriaLabel;
				var ariaLabelForComment = "";
				
				// If not all the comments are shown in the UI display a message to say how many there are.
				if(!isNaN(numTotalComments) && numTotalComments > numDisplayedComments){
					// Do we want the StatusUpdate comment expander node, or the regular one?
					if ( this.newsItem.newsData.isStatusUpdate() ) {
						this.commentCounterNode.innerHTML = 
							string.substitute(this.strings.commentsCounter, [numDisplayedComments, numTotalComments]);
						this.toggleShowPreviousHideAdditional(true);
						domClass.remove(this.expandCommentsNode, "lotusHidden");
					} else {
						// Set the more comments text
						var commentText = this.strings.showMoreText;
						
						this.moreCommentsTextNode.innerHTML = commentText;
						
						this.showMoreDisplayed = true;
						
						// Set the ARIA label text to give information about the comments including number.
						ariaLabelForComment = string.substitute(this.strings.moreCommentsAriaLabel, 
								[titleForAria, numTotalComments]);
						
						// Show the more comments node
						domClass.remove(this.moreCommentsNode,"lotusHidden");
					}
				} else if (!isNaN(numTotalComments) && numTotalComments == numDisplayedComments) {
		            this.commentCounterNode.innerHTML =
		                string.substitute(this.strings.commentsCounter, [numDisplayedComments, numTotalComments]);
		        } else {
					ariaLabelForComment = string.substitute(this.strings.commentsAriaLabel, [titleForAria]);
				}
				
				domAttr.set(this.commentListNode, "aria-label", ariaLabelForComment);
			},
			
			/**
			 * Create a comment dom node
			 * @param comment {object} comment object (item in replies)
			 * @param isFirst {boolean} is first node or not
			 * @returns {DOM} comment node
			 */
			createCommentNode: function(comment, isFirst) {
				// Linkify Hashtags in comments before creating node
				var tagsArray = this.newsItem.getTagsArray(comment.tags);
				comment.content = this.newsItem.parseHashTags(comment.content, tagsArray);
				// Create a list item for this comment.
				// The first comment needs a "lotusFirst" class.
				var inlineComment = new InlineComment({
					newsItem: this.newsItem,
					comment: comment,
					rootClass: (isFirst ? "lotusFirst" : "")
				});
				
				// save the new dijit to destroy later
				this.commentsNodes.push(inlineComment);
				
				// Listen out for when comments are deleted
				this.own(aspect.after(inlineComment, "commentDestroyed", lang.hitch(this,"commentDeleted"), true));
				
				return inlineComment;
			},
			
			/**
			 * Add one comment to the last of the DOM node
			 * @param comment {object} comment objcet
			 */
			addComment: function(comment,fileDetails) {
				// the inlineComments widget is exist only if there is a comment for the news item
				// so we don't need to consider the case of 0 comment
				
				if (typeof fileDetails != 'undefined' && fileDetails != null){
					comment.attachments= [{
										displayName: fileDetails.fileName,
										url: fileDetails.fileLink,
										author: {displayName: fileDetails.authorInfo}
									}];
				}
				
				this.comments.items.push(comment);
		        this.commentRetriever.comments.push(comment);
				var commentDijit = this.createCommentNode(comment, false);
				//Update the target of the newly added comment
				this.modifyContentLinkTargets(commentDijit.domNode);
				domConstruct.place(commentDijit.domNode, this.expandCommentsErrorNode, "before");
				
				// Parse any vcards in there, including the comment poster
				var isGadget = (activityStreamAbstractHelper && activityStreamAbstractHelper.isGadget);
				scanner.scan(commentDijit.domNode, !isGadget);
				// Bidi support
		    	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(commentDijit.domNode);
				// Increment the total items .
				if (!isNaN(this.comments.totalItems)) {
					this.comments.totalItems++;
				}
				
				this.setupMoreCommentsText();
				
				// Make sure the <ul> isn't hidden
				domClass.remove(this.domNode, "lotusHidden");
			},
			
			onShowPreviousComments: function() {
				// summary:
				//		called when "Show Previous Comments..." link is clicked
		
				// prevent multiple clicks
				if ( this.showingPrevious ) 
					return;	
				else 
					this.showingPrevious = true;
				
				domClass.remove(this.loadingImageNode, "lotusHidden");
				
				// retrieve the comments
				this.commentRetriever.retrievePreviousComments(this.comments.items.length, this.additionalCommentStep++).then(
						lang.hitch(this, "doShowPreviousComments"),
						lang.hitch(this, "handleShowPreviousError")
				);
			},
			
			handleShowPreviousError: function(err) {
				this.showingPrevious = false;
				domClass.add(this.loadingImageNode, "lotusHidden");
				
				if (this.expandErrorMessage) {
					this.expandErrorMessage.destroyRecursive(true);
			        domConstruct.empty(this.expandCommentsErrorNode);
			        domClass.add(this.expandCommentsErrorNode, "lotusHidden");
				}
				
				// Default generic message
				var errorMsg = this.strings.errorRetrieveComments;
				
				if ( err.xhrErr ) {
					var s = err.xhrErr.xhr.status;
					if ( s == 404 ) {
						errorMsg = this.strings.errorRetrieveCommentsDeleted;
					} else if ( s == 401 ) {
						// session timeout, about to be redirected to login page
						// do not display an error (which would flicker onto page before redirect)
						return;
					} else { // 500 or other
						errorMsg = this.strings.errorRetrieveComments;
					}
				}
				
				var errorMore = err.message || err;
		
				this.expandErrorMessage = new MessageBox({
					canClose: true,
					type: MessageBox.TYPE.ERROR,
					msg: errorMsg,
					msgMore: errorMore,
					_strings: {
						a11y_label: this.strings.errorAlt,
						icon_alt: this.strings.errorText,
						close_btn_alt: this.strings.msgCloseAlt,
						close_btn_title: this.strings.msgCloseAlt
					}
				}, this.expandCommentsErrorNode);
				domClass.remove(this.expandCommentsErrorNode, "lotusHidden");
			},
			
			doShowPreviousComments: function(/* Object */ resp) {
				// summary:
				//		called then promise from CommentRetriever is resolved
				//		displays the new comments in a block
				// resp.actualCount:	actual count of comment (based on info available right now)
				// resp.comments:		array of comments returned
				var newLI = null, newUL = null;
				try {			
					if ( resp && resp.comments && resp.comments.length > 0 ) {
						// create a container for the block of comments - used for wipeIn/Out animation
						newLI = domConstruct.create("li", { style: "position: absolute; visibility: hidden;", "class" : "additionalComments" }, this.expandCommentsNode, "after");
						newUL = domConstruct.create("ul", {}, newLI);
		
		                resp.comments = array.filter(resp.comments, function(comment) {
		                    var isCommentAlreadyVisible = array.some(this.comments.items, function(existingComment){
		                        return comment.id == existingComment.id;
		                    });
		
		                    if (!isCommentAlreadyVisible){
							    var commentDijit = this.createCommentNode(comment, false);
							    newUL.appendChild(commentDijit.domNode);
		                        return true; //keep entry
		                    } else {
		                        return false; //discard entry
		                    }
						}, this);
						
						//Update the target of the newly added comment
						this.modifyContentLinkTargets(newLI);
				
						topic.publish(events.RESIZEHEIGHT, "allcomments", this.newsItem.newsData.getActivityId(), true);
				
						domStyle.set(newLI, { height: 0, visibility: '', position: '' });
						domClass.remove(newLI, "lotusHidden");
				
						// Parse any vcards in there, including the comment poster
						var isGadget = (activityStreamAbstractHelper && activityStreamAbstractHelper.isGadget);
						scanner.scan(newLI, !isGadget);
						
						domClass.add(this.loadingImageNode, "lotusHidden");
						
						var wrapUp = lang.hitch(this, function() {
							domStyle.set(newLI, { height: "auto"});
							this.additionalCommentCount += resp.comments.length;
							
							this.comments.totalItems = resp.actualCount;
							this.comments.items = resp.comments.concat(this.comments.items);
							
							// update the counter to reflect shown cont
							this.commentCounterNode.innerHTML = 
								string.substitute(this.strings.commentsCounter, [this.comments.items.length, this.comments.totalItems]);
							
							if ( this.comments.items.length == this.comments.totalItems ) {
								this.toggleShowPreviousHideAdditional(false);
							} else {
								domClass.add(this.loadingImageNode, "lotusHidden");
							}
							this.showingPrevious = false;
							
							topic.publish(events.RESIZEHEIGHT, "expandAllComments", this.newsItem.newsData.getActivityId(), true);
						});
										
						// add the new container at top of comment list, and use wipeIn animation to display
						if ( has("ie") ) { // IE cannot handle the animation
							wrapUp();
						} else {
							fx.wipeIn({ 
								node: newLI, 
								duration: resp.comments.length <= 5 ? 250 : resp.comments.length <= 15 ? 375 : 750,
								easing: easingModule.quadInOut,
								onEnd: lang.hitch(this, wrapUp)
							}).play();
						}
					} else if (resp && resp.comments.length == 0 && resp.actualCount == 0) {
		
		                query(".lotusCommentItem", this.commentListNode).forEach(function(node,index,arr) {
		                    if (index == 0 || index == 1 || domClass.contains(node,"expandCommentsError")) {
		                        //continue
		                    } else {
		                        domConstruct.destroy(node);
		                    }
		                });
		
		                this.commentCounterNode.innerHTML = string.substitute(this.strings.commentsCounter, [0, 0]);
		                domClass.add(this.loadingImageNode, "lotusHidden");
		                domClass.add(this.showPreviousLink, "lotusHidden");
		
		                this.comments.items = [];
		                this.comments.totalItems = 0;
		                this.additionalCommentCount =  0;
		                this.additionalCommentStep = 0;
		
		            } else if (resp && resp.comments.length == 0 && resp.actualCount > 0) {
		                this.comments.totalItems = resp.actualCount;
		                this.commentCounterNode.innerHTML = string.substitute(this.strings.commentsCounter, [this.comments.items.length, this.comments.totalItems ]);
		                domClass.add(this.loadingImageNode, "lotusHidden");
		                domClass.add(this.showPreviousLink, "lotusHidden");
		            }
				} catch (e ) {
					if ( newLI ) domConstruct.destroy(newLI);
					this.handleShowPreviousError(e);
				}		
			},
			
			onHideAdditionalComments: function() {
				// summary:
				//		called when the "Hide Additional Comments..." link is clicked
				
				if ( this.hidingAdditional )
					return;
				else
					this.hidingAdditional = true;
				
				// destroy all blocks of additional comments bar first
				var first = true;
				query(".additionalComments", this.commentListNode).forEach(function(node) {
					if ( first ) {
						first = false;
					} else {
						domConstruct.destroy(node);
					}
				});
				
				var wrapUp = lang.hitch(this, function(node) {
					domConstruct.destroy(node); 
		
					// discard the comments
					this.comments.items.splice(0, this.additionalCommentCount);
					this.commentRetriever.discardAdditionalComments(this.additionalCommentCount);
					this.additionalCommentCount = 0;
					this.additionalCommentStep = 0;
					
					// update the counter for current displayed count
					this.commentCounterNode.innerHTML = 
						string.substitute(this.strings.commentsCounter, [this.comments.items.length, this.comments.totalItems]);
					
					this.toggleShowPreviousHideAdditional(true);
					this.hidingAdditional = false;
				});
				
				// wipeOut the first block of additional comments, then destroy
				query(".additionalComments", this.commentListNode).forEach(function(node) {
					if ( has("ie") ) { // IE can't handle the animation
						wrapUp(node);
					} else {
						var count = query("li.lotusCommentItem", node).length;
						fx.wipeOut({
							node: node, 
							duration: count <= 5 ? 250 : count <= 15 ? 375 : 750,
							easing: easingModule.quadInOut,
							onEnd: lang.hitch(this, function() { wrapUp(node); })
						}).play();
					}
				}, this);
			},
			
			toggleShowPreviousHideAdditional: function(/* boolean */ showPrev) {
				// Switches between
				if ( showPrev ) {
					domClass.remove(this.showPreviousLink, "lotusHidden");			
					domClass.add(this.hideAdditionalLink, "lotusHidden");
				} else {
					domClass.remove(this.hideAdditionalLink, "lotusHidden");
					domClass.add(this.showPreviousLink, "lotusHidden");
				}
			},
			
			/**
			 * Called when a child comment has been deleted. If there are no more
			 * comments displayed inline, hide this dijit.
			 * @param id {String} ID of the comment being deleted.
			 */
			commentDeleted: function(id, isInAdditionalComments){
				// This is called during tear-down of this dijit... as well as when a comment is deleted
				// Ensure we still have a domNode before doing anything to avoid issues during teardown
				if ( this.domNode ) {
					// Remove the comment from the comment.items array.
					this.comments.items = array.filter(this.comments.items, function(x) { return x.id != id;});
		            this.commentRetriever.comments = array.filter(this.commentRetriever.comments, function(x) { return x.id != id;});
		
					// Decrement the total items.
					if (!isNaN(this.comments.totalItems)) {
						this.comments.totalItems--;
					}
		
		            if(isInAdditionalComments){
		                this.additionalCommentCount--;
		            }
		
					this.setupMoreCommentsText();
		
					// If there are no more comments and we don't have the Show all label shown hide the widget.
					if(this.comments.totalItems == 0 && !this.showMoreDisplayed){
						// Hide this <ul>
						domClass.add(this.domNode, "lotusHidden");
						domClass.add(this.hideAdditionalLink, "lotusHidden");
						
						// Hide the commentInput <ul>
						if ( this.newsItem.commentInput ) {
							this.newsItem.commentInput.hide();
						}
					}
				}
			},
			
			uninitialize: function() {		
		        if (this.has("ckeditor-lite-mentions") && dojo.getObject('newsItem.commentInput.textBoxControl', false, this)) {
		            this.newsItem.commentInput.textBoxControl.destroy();
		        }
				array.forEach(this.commentsNodes, function(node) {
					if ( node ) node.destroyRecursive();
				});
					
				comments = null;
				commentsNodes = null;
				this.newsItem = null;
				domConstruct.destroy(this.domNode);
				this.domNode = null;
		
				this.inherited(arguments);
			},
			
			/**
			 * Sets browser focus on the last inline comment 
			 * of the current news item
			 */
			focusLastComment: function() {
				var lastInlineCommentsIndex = this.commentsNodes.length - 1;
				this.commentsNodes[lastInlineCommentsIndex].domNode.focus();
			}
		});
		return InlineComments;
	});
