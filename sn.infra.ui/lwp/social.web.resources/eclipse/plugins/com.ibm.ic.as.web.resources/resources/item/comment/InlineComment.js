/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/dom-construct",
		"dojo/_base/declare",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/_base/lang",
		"dojo/_base/config",
		"dojo/dom-class",
		"dojo/string",
		"dojo/text!ic-as/item/comment/templates/inlineComment.html",
		"dojo/topic",
		"dojo/date",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/item/interfaces/IItem",
		"ic-as/item/comment/FileAttached",
		"ic-as/constants/events",
		"ic-as/item/liking/ASCommentLikeDataStore",
		"ic-as/util/LinkTarget",
		"ic-as/util/Localizer",
		"ic-core/ext/timeago/Timeago",
		"ic-ui/controls/Like",
		"ic-ui/controls/MessageBox",
	], function (dojo, domConstruct, declare, i18nactivitystream, lang, config, domClass, string, template, topic, dojoDate, _Templated, _Widget, IItem, FileAttached, events, ASCommentLikeDataStore, LinkTarget, Localizer, Timeago, Like, MessageBox) {
	
		/**
		 * Dijit for displaying inline news item comments. Implementation searches
		 * through the replies in a news event and create a list item for them.
		 * 
		 * @author Robert Campion
		 */
		
		var InlineComment = declare("com.ibm.social.as.item.comment.InlineComment", 
		[_Widget, _Templated,
		 LinkTarget,
		 Localizer,
		 IItem], {
			
			// The CSS class to be applied to the root element of this dijit
			rootClass: "",
		
			// Comment object which will be used to build this inline comment
			comment: null,
		
			// The content/text of the comment
			commentText: "",
			
			// Aria label for the comment
			commentAriaLabel: "",
			
			// Text of type "Photo of <username>"
			photoOfText: "",
			
			// The time the comment was made
			time: "",
			
			// Resource bundle
			strings: null,
			
			// Parent news item
			newsItem: null,
			
			photoUrl: "",
			
			// class used to show/hide the comment control - used by the template
			commentLikeClass: "lotusHidden",
			
			// datastore for like control
			likeDataStore: null,
			
			likeControl: null,
			
			fileDetails: null,
				
			templateString: template,
			
			postMixInProperties: function(){
				this.inherited(arguments);
				
				// Get the strings bundle
				this.strings = i18nactivitystream;
				
				this.commentText = this.comment.content || "";
				this.time = this.getDateString(this.strings, this.comment.updated);
		
				var commentAuthor = this.comment.author;
				// Setup the user photo
				this.photoUrl = this.getPhotoUrl(commentAuthor);
				this.actorHtml = this.createNewsUser(commentAuthor.id, commentAuthor.displayName);
				this.photoOfText = string.substitute(this.strings.photoOfText, [commentAuthor.displayName]);
				
				// This line located in function postMixInProperties in com.ibm.social.as.util.LinkTarget
				// it overwritten by postMixInProperties in com.ibm.social.as.item.interfaces.IItem
				this.anchorTarget = this.getActivityStreamTarget();
				
				// generate the Connections Id for the Comment author
				this.comment.author.connId = this.getConnectionsUserId(this.comment.author.id);
				
				// Set the aria label on the comment to a string relevant to the date format.
		        // The aria label should also have the seconds in time to enforce unique labels
		        var ariaTimeFn = function(date, nls) {
		            return dojoDate.locale.format(this.dt, {selector:'time', timePattern: 'hh:mm:ss a', locale: djConfig.locale });
		        };
		        var parameters = {time: ariaTimeFn};
		        var ariaTimestampStr = this.getDateString(this.strings, this.comment.updated, parameters);
		        var ariaString = "";
		
		        // items from forums use the "reply" concept instead of "comment"
		        var isNewsItemFromForums = this.newsItem && this.newsItem.newsData && this.newsItem.newsData.isForumsItem();
		        if (isNewsItemFromForums){
		            ariaString =
		                ariaTimestampStr.match(/^\d{1,2}:\d\d/) ? this.strings.replyAriaLabelSameDay : this.strings.replyAriaLabel;
		        } else {
		            ariaString =
		                ariaTimestampStr.match(/^\d{1,2}:\d\d/) ? this.strings.commentAriaLabelSameDay : this.strings.commentAriaLabel;
		        }
				this.commentAriaLabel = string.substitute(ariaString, [this.comment.author.displayName, ariaTimestampStr]);
				
				// if liking is enable, allow Like control to be shown
				if ( this.shouldShowLikeControl() ) {
					this.commentLikeClass = "";
				}
				
				this.own(topic.subscribe(events.COMMUNITYDISABLED, lang.hitch(this,"communityDisabled")));
			},
			
			communityDisabled: function(communityId){
				if(this.newsItem && this.newsItem.newsData && this.newsItem.newsData.getCommunityId()===communityId) {
					this.removeLikeControl();
				}
			},
			
			destroyWidget: function(widget) {
				if(widget && widget.destroyRecursive){
					widget.destroyRecursive();
				} else if (widget && widget.destroy){
					widget.destroy();
				}
			},
		
			/*
			 * Override uninitialize. This is called automatically when the comment widget is destroyed. 
			 */
			uninitialize: function() {		
				this.destroyWidget(this.likeDataStore);
				//not a widget nullify the reference
				this.likeDataStore = null;
				this.destroyItemUtil();
				this.destroyWidget(this.likeControl);
				// Call the commentDestroyed function passing in the ID of the comment.
				try{
		            var isInAdditionalComments = domClass.contains(this.domNode.parentElement.parentElement, "additionalComments");
					this.commentDestroyed(this.comment.id,isInAdditionalComments);
				}catch(e){}
				
				this.strings = null;
				this.time = null;
				this.rootClass = null;
				this.commentContent = null;
				this.commentText = null;
				this.commentAriaLabel = null;
				this.photoOfText = null;
				this.photoUrl = null;
				this.commentLikeClass = null;
				this.comment = null;
				this.newsItem = null;
				domConstruct.destroy(this.domNode);
				this.domNode = null;
						
				this.inherited(arguments);
			},
			
			/*
			 * This function can be hooked into by other code using dojo.connect. The comment id parameter is
			 * passed forward to the connected function.
			 * @param id - ID of the comment being removed.
			 */
			commentDestroyed: function(id) {
			},
			
			postCreate : function() {
				this.inherited(arguments);		
				this.setContentHeight(this.commentContent,this.showMoreText,this.showLessText,this.comment.id);
				this.addImageOnloadResizeSupport(this.commentContent, this.comment.id);
				this.createLikeControl();
		        this.initAttachment();
				new Timeago({}, this.timeagoNode);
			},
			
		    initAttachment: function(){
		        if (this.comment.attachments && this.comment.attachments.length != 0){
		            var file = this.comment.attachments[0];
		            var fileType = file.displayName.substring(file.displayName.lastIndexOf(".")+1).toLowerCase();
		            var fileDetails = {
		                fileName: file.displayName,
		                fileUrl: file.url,
		                imageSrc: config.blankGif,
		                imageClass: "lconn-ftype32 lconn-ftype32-" + fileType,
		                fileTypeDisplayName: fileType.toUpperCase(),
		                authorInfo: file.author.displayName,
		                tagsText: ""
		            };
		
		            this.fileDetails = new FileAttached(fileDetails,this.commentFileAttachedDetails);
		        }
		    },
			
			onShowMoreLessClicked : function(e){
				this.handleShowMoreLessClicked(e, this.commentContent, this.showMoreText, this.showLessText);
			},
			
			shouldShowLikeControl: function(readonly) {
				// we should only show like control if:
				// - item has likeService, AND
				// - item has > 0 likes OR item is likeable
				// If you cannot like, and there are no current likes control is pointless
				var curLikes = ( this.comment.likes && this.comment.likes.totalItems ) ? this.comment.likes.totalItems : 0;
				return ( this.isLikeEnabled() && ( curLikes > 0 || this.isLikeEditable(readonly) ) );
			},
			
			isLikeEnabled: function() {
				return ( this.comment && this.comment.connections && this.comment.connections.likeService) ? true : false;
			},
			
			isLikeEditable: function(readonly) {
				var editable = true;
				if ( readonly != undefined ) {
					editable = !readonly;
				} else {
					editable = ( com.ibm.social.as.configManager.getUserInfoId() != null ) &&
							   ( com.ibm.social.as.configManager.isReadonlyLikes() ? false: true ); 
				}
				return editable;
			},
			
			createLikeControl: function(readonly) {
				if ( this.shouldShowLikeControl(readonly) ) {
					var ds = this.likeDataStore = this.likeDataStore || new ASCommentLikeDataStore(this.newsItem, this);
		
					var editable = this.isLikeEditable(readonly);
		
					var likeControlNode = domConstruct.create("span", null, this.likeControlContainer);
					
					this.likeControl = new Like({
						editable: editable,
						loadIndividualStyles: false,
						currentUserId: com.ibm.social.as.configManager.getUserInfoId(),
						dataStore: ds,
						getUserProfileUrl: lang.hitch(ds, ds.getUserProfileUrl),
						getUserPhotoUrl: lang.hitch(ds, ds.getUserPhotoUrl)
					}, likeControlNode);
					likeControlNode = null;
				} else {
					this.removeLikeControl();
				}
			},
			
			removeLikeControl: function(){
				// hide the like control node
				var likeParent = this.likeControlContainer.parentElement;
				domClass.add(likeParent, "lotusHidden");
				
				// make the next node the first one
				while(likeParent = likeParent.nextSibling) {
					if(!domClass.contains(likeParent, "lotusHidden")) {
						domClass.add(likeParent, "lotusFirst");
						break;
					}
				}
			},
			
			displayLikeError: function(errorMsg) {
				domConstruct.empty(this.likeErrorNode);
				new MessageBox({
					canClose: true,
					type: MessageBox.TYPE.ERROR,
					msg: errorMsg,
					_strings: {
						a11y_label: this.strings.errorAlt,
						icon_alt: this.strings.errorText,
						close_btn_alt: this.strings.msgCloseAlt,
						close_btn_title: this.strings.msgCloseAlt
					}
				}, this.likeErrorNode);
				domClass.remove(this.likeErrorNode, "lotusHidden");
			},
		
			/*
			 * Used to re-create the like control in readonly mode after error occurs
			 */
			recreateLikeControl: function(readonly) {
				if ( this.likeControl ) {
					this.likeControl.destroyRecursive();
				}
				this.createLikeControl(readonly);
			}
		});
		return InlineComment;
	});
