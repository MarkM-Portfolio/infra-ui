/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/query",
		"dojo/string",
		"dojo/text!ic-as/item/templates/newsItem.html",
		"dojo/topic",
		"ic-as/item/SharedExternally",
		"ic-as/item/interfaces/INewsItem",
		"ic-as/item/NewsItemActions",
		"ic-as/util/hashtag/HashTagParser",
		"ic-as/util/LinkTarget",
		"ic-as/constants/events",
		"ic-core/aria/Toolbar",
		"ic-as/item/comment/InlineComments",
		"ic-as/item/liking/ASLikeDataStore",
		"ic-core/config/services",
		"ic-core/ext/timeago/Timeago",
		"ic-core/url",
		"ic-ui/controls/Like",
		"ic-ui/controls/MessageBox",
	], function (dojo, domConstruct, array, declare, lang, domAttr, domClass, i18nactivitystream, query, string, template, topic, SharedExternally, INewsItem, NewsItemActions, HashTagParser, LinkTarget, events, Toolbar, InlineComments, ASLikeDataStore, services, Timeago, url, Like, MessageBox) {
	
		/**
		 * Widget used to display individual news items in the river
		 * of news feed.
		 * @author Robert Campion
		 */
		
		var NewsItem = declare(
		"com.ibm.social.as.item.NewsItem", 
		[INewsItem,
		 NewsItemActions,
		 LinkTarget,
		 HashTagParser],
		{
			// Object, representing a person, of the type {id: , name:}
			actor: null,
			
			// Application or target that created the event
			// e.g. files, activities, wikis
			app: "", 
			
			// The name of the application we're a target of
			// e.g. Files, Activities, Wikis
			appName: "",
			
			// Localized version of the application name.
			appLocalizedDisplayName: "",
		
			// Content of the news item (HTML String)
			content: "",
			
			// Object containing all news data
			newsData: null,
			
			// Time of the news item
			time: null,
			
			// Template HTML strings that you can override to insert custom HTML
			templateExtension: "",
			extensionDescription: "",
			rollupExtension: "",
			
			// Resource bundle
			strings: null,
			
			// Object that can be overriden to provide extra strings (global)
			extraStrings: {},
			
			// The root class to be used on the DOM node
			rootClass: "",
			
			// The class for the "# likes" node & the like control node
			likeCountClass: "lotusHidden",
			likeControlClass: "lotusHidden",
		    actionToolbarSet: false,
			
			// Like control dijit - store for later destroy
			likeControl: null,
			
			// Flag for enabled/disabled EE
			isEEDisabled: false,
			
			// Tag names that shouldn't open the EE
			forbiddenEETagNames: null,
			
			// Indicate whether the EE is open for this news item
			isEEOpen: false,
			
			// The title of the item.
			titleForDescription: "",
			
			photoUrl: "",
			
			dynUpdateFailed: false,
			
			updatedSince: null,
			
			//We hold the inlineComments object to use throughout life of item
			inlineComments: null,
			
			commentInput:null,
			
			// Flag that can be used to suspend keyboard navigation from the item.
			noKeyNavigation: false,
			
			likeDataStore: null,
			
			templateString: template,
			
			itemClickedEvent: events.ITEMCLICKED,
			
			itemSelectedEvent:  events.ITEMSELECTED,
			
			addActivityEntryEvent: events.ADDACTIVITYENTRY,
		
			_errorMessage: null,
			
			_repostMessage: null,
			
			hasNewsActions: false,
			
			//Give likesText a default empty string until it is set
			likesText: "",
			
			//whether the content is shared externally
			isSharedExternally: false,
			
			newsItemToolBar: null,
		
		    allowItemKeyboardNavigation: true,
		
			/**
			 * Called before the widget is rendered in the UI.
			 * - Formats the time property
			 */
			postMixInProperties: function(){
				this.inherited(arguments);
				
				this.mixInData();
				// Setup the user photo
				this.photoUrl = this.getPhotoUrl(this.actor);
				
				this.setupStrings();
				this.setupLikes();
				this.setupEE();
				// Format the time so that it is more readable
				this.timeString = this.getDateString(this.strings, this.time);
				
				this.timeSeconds = this.getTimeWithSeconds(this.time).substring(0,11);
				
				// Init the forbidden EE tag names array
				this.forbiddenEETagNames = ["a", "textarea", "input"];		
				
				this.own(topic.subscribe(events.COMMUNITYDISABLED, lang.hitch(this,"communityDisabled")));
				
					
			},
			
			/**
			 * Called after the widget is rendered in the UI.
			 */
			postCreate: function(){		
				
				this.inherited(arguments);
				var newsData = this.newsData;
				
				// Update the state of action required for this news item if required
				if(this.updateSavedState){
					this.updateSavedState(newsData.connections);
				}
		
				this.timeago = new Timeago({}, this.timeagoNode);
				
				// TODO: Temp measure until defect 46575 is fixed.
				var newsReplies = newsData.getActivityReplies();
				
				// If we have comments to show or comments exist but aren't displayable in the AS
				// we need to show the inline comments widget.
				if(newsReplies && 
					((newsReplies.items && newsReplies.items[0].updated != "null") ||
			   		(newsReplies.totalItems && newsReplies.totalItems > 0))) {
						this.setupCommentContent(newsReplies);
				}
				
		
				// TODO: Need to look at refactoring how the actions are created by building an actions controller of some sort
				// This subscribe listens to the recommendation widget node being created, we need to rebuild the toolbar
				this.setupActionsToolbar();
		        var fn = lang.hitch(this, function(message){this.setupActionsToolbar(message)});
				this.own(topic.subscribe("com/ibm/oneui/recommend/inline/likeActionComplete", function(message){fn(message)}));
		        this.own(topic.subscribe(events.SAVEACTIONCOMPLETE, function(message){fn(message)}));
		        this.own(topic.subscribe(events.SHOWMORECLICKED, function(message){fn(message)}));        
		
				// create the Like control
				this.createLikeControl();
				
				this.resizeContentHeight();
		
				//check if it's shared externally
				if(this.isSharedExternally){
					this.sharedExternally = new SharedExternally({},this.sharedExternally);
				}
			},
			
			/**
			 * Build the Action list ARIA toolbar and destroy the existing one if it exists
			 */
			setupActionsToolbar: function(message){
		
		        if (!this.hasNewsActions){
		            return;
		        }
		        
		        //base call for all items, includes items with no likes - setup the toolbar and return
		        if(!message){
		        	this.actionsToolbar = new Toolbar(this.actionListContainer);
		        	return;
		        }
		        
		        var recommendClicked = this._isEventFromThisRecommendationNode(this.actionListContainer, message);
		        var saveClicked = this._isEventFromThisSavedNode(this.actionListContainer, message);
		        var moreClicked = this._isEventFromThisShowMoreNode(this.actionListContainer, message);
		        
		
		       if ( recommendClicked || saveClicked || moreClicked ) {
		
		           if (this.newsItemToolBar) {
		               this.newsItemToolBar.destroy();
		           }
		
		           this.actionsToolbar = new Toolbar(this.actionListContainer);
		
		           if (this.actionToolbarSet) {
		               if (this.actionsToolbar.allItems && this.actionsToolbar.allItems.length >= 1) {
		                   var linkIndex = recommendClicked?1:4;
		                   this.actionsToolbar.selIdx = linkIndex;
		               }
		
		               this.actionsToolbar.focus();
		           } else {
		               this.actionToolbarSet = true;
		           }
		       }
		
			},
		
		    /**
		     * we only want to catch events from this node
		     */
		
		    _isEventFromThisRecommendationNode: function(buttonsContainer, message) {
		
		        return this._isEventFromNode(buttonsContainer, message, "lotusLike");
		    },
		
		    _isEventFromThisSavedNode: function(buttonsContainer, message) {
		
		        return this._isEventFromNode(buttonsContainer, message, "activityStreamActionInactive");
		    },
		
		    _isEventFromThisShowMoreNode: function(buttonsContainer, message) {
		
		        return this._isEventFromNode(buttonsContainer, message, "actionMoreLink");
		    },
		
		
		    _isEventFromNode: function(buttonsContainer, message, className) {
		
		        var recommendationsNode = null;
		
		        if (buttonsContainer && message) {
		            recommendationsNode = message.recommendationsNode;
		
		            var likeElementList = query("." + className, buttonsContainer);
		
		            if (likeElementList.length > 0) {
		
		                var likeElement = likeElementList[0];
		                if (likeElement) {
		                    return likeElement.id === recommendationsNode.id;
		                }
		            }
		        }
		    },
		
			/**
			 * Subscribe to 'resizeHeight' event
			 * After text rendered if content height exceeds 100px , display 'Show more' link
			 */
			resizeContentHeight: function(){
				this.setContentHeight(this.contentNode,this.showMoreText,this.showLessText, this.newsData.getId());	
				this.addImageOnloadResizeSupport(this.contentNode, this.newsData.getId());
			},
			
			/**
			 * Mix incoming news date in with 
			 */
			mixInData: function(){
				var newsData = this.newsData;
		
				this.content = newsData.getTitle() || "";
				this.time = newsData.getActivityPublishTime() || newsData.getPublished();
				this.actor = newsData.getActor();
		
				// generate the Connections UserId from the OpenSocial one in the feed
				this.actor.connId = this.getConnectionsUserId(this.actor.id);
				
				// Set the application name. Fallback to 'Connections'.
				var generatorId = newsData.getGeneratorId();
				
				this.appName = (this.appMap[generatorId]) ? this.appMap[generatorId] : "";
				
				// Set up the generator image
				if(this.appName){
					// Connections event, show a sprite
					this.generatorImgSrc = this._blankGif;
					this.generatorImgClass = this.createGeneratorImgClass(this.appName);
				}else{
					// External event
					var generatorImageUrl = newsData.getGeneratorImageUrl();
					
					if(generatorImageUrl){
						this.generatorImgSrc = generatorImageUrl;
						this.generatorImgClass = "";
					}else{
						this.generatorImgSrc = this._blankGif;
						this.generatorImgClass = this.createGeneratorImgClass("Connections");
					}
					
				}
		
				//set up is external
				this.isSharedExternally = newsData.isActivityExternal();
				
				//setup the shared externally flag
				var obj = this.newsData.getEmbedObject();
				if(obj && obj.context){
					obj.context.isSharedExternally = this.isSharedExternally;
				}
			},
			
			/**
			 * Utility for creating css class per app
			 */
			createGeneratorImgClass: function(app){
				if ( app === "Library" ) {
					return "otherActivityStream14 otherActivityStream14-asLibraries14";
				} else {
					return "otherActivityStream14 otherActivityStream14-as" + app + "14";
				}
			},
			
			
			/**
			 * Setup the strings for this widget.
			 */
			setupStrings: function(){
				// Get the strings bundle
				this.strings = i18nactivitystream;
					
				// Mixin the extra string that may be there
				this.strings = lang.mixin(this.strings, this.extraStrings);
				
				var actorName = this.newsData.getActorDisplayName();
				this.photoOfText = string.substitute(this.strings.photoOfText, [actorName]);
		
				this.appLocalizedDisplayName = (this.newsData.getGeneratorDisplayName()) ? 
						this.newsData.getGeneratorDisplayName() : this.strings.externalApplication;
				
				// We need to use the localized display name. The appname isn't localized.
				// Do not use eventFromText if Generator is Profiles and Profiles is not enabled
				this.eventFromText = this.newsData.getGeneratorId() === "profiles" && !services.profiles 
						&& !services.scprofiles ? 
						"" : string.substitute(this.strings.eventFromText, [this.appLocalizedDisplayName]);
				
				// Get the plainTitle to use in the Aria describedby attribute. If undefined is return then make it blank so
				// the screenreader doesn't read "undefined".
				this.titleForDescription = this.newsData.getConnectionsPlainTitle() || "";
			},
			
			/**
			 * Setup the likes node for this news item and if necessary display it in the UI
			 */
			setupLikes: function(){
				if ( this.shouldShowLikeControl() ) {
					this.likeControlClass = "";
					// create the control later... once NewsItem dijit created
				} else {
					var numLikes = 0;
					
					var newsDataLikes = this.newsData.getActivityLikesCount();
					
					if(newsDataLikes && newsDataLikes > 0){
						// Unhide the likes node
						this.likeCountClass = "";
						// Update the numLikes
						numLikes = newsDataLikes;
					}
					
					// Just use the likeText for 1 like, otherwise, substitute the numLikes in
					this.likesText = (newsDataLikes === 1) ? 
							this.strings.likeText : string.substitute(this.strings.likesText, [numLikes]);
					
				}
			},
			
			/**
			 * Setup any EE specific properties.
			 */
			setupEE: function(){
				this.isEEDisabled = (this.newsData.getEmbedObject()) ? false : true;
				
				// If the EE is disabled
				if(this.isEEDisabled){
					// Change the root class to suit
					this.rootClass += " activityStreamEEDisabled";
					this.strings.openEEDescription = "";
				}
			},
			
			/**
			 * Setup the comments widget for NewsItem. This will init
			 * the inlineComments object in standalone mode. No comments
			 * and only comment input widget showing.
			 */
			setupCommentContentStandalone: function(){
				// Create the inline comments dijit, if not already available on the news item
				var args = {newsItem: this, comments: {}, focusAddComment: true, showAddComment: true};
				this.setupInlineComments(args, true);
			},
			
			/**
			 * Setup the comments widget for NewsItem. If already exists
			 * then reset with a fresh copy of replies.
			 */
			setupCommentContent: function(newsReplies){
				// Create the inline comments dijit
				var args = {newsItem: this, comments: newsReplies};
				this.setupInlineComments(args);
			},
			
			/**
			 * Helper function to create an inlineComments item for this newsItem
			 * Support standalone mode (only input text area no comments)
			 */
			setupInlineComments: function(args, standalone) {
				if(!this.inlineComments){
					this.inlineComments = new InlineComments(args, 
							this.inlineCommentsNode);								
				}
				else{
					if (standalone){
						this.inlineComments.showCommentInputStandalone();
					}
					else{
						if(args.newsReplies) this.inlineComments.initializeInlineComments(args.newsReplies);
					}				
				}
			},
			
			setCommentInput: function(input){
				this.commentInput = input;
			},
			
			/**
			 * Is the X (delete) icon displayed for this news item
			 * @returns {Boolean} true if it is, false otherwise
			 */
			isXDisplayed: function(){
				// By default, don't display the X
				return false;
			},
			
			/**
			 * Is the tag name passed permitted to open the EE.
			 * @param tagName {String} name of the tag, e.g. "div", "a"
			 * @returns {Boolean} false if it can't, true otherwise
			 */
			shouldTagOpenEE: function(tagName){
				// If the indexOf returns less than 0, the tag isn't forbidden
				return (array.indexOf(this.forbiddenEETagNames, tagName.toLowerCase()) < 0);
			},
		
			/**
			 * Prevents the EE from opening if the node clicked on has the
			 * data-notOpenEE attribute. This provides a way to suppress the
			 * EE for the MentionsHelper text area (which is a div).
			 * @param node - The node that might cause the EE to open
			 * @return boolean - true of the node shouldn't cause the EE to open.
			 */
			_notOpenEEForNode: function(node) {
				return (domAttr.has(node,"data-notOpenEE"));
			},
			
			/**
			 * Open the EE for this News item.
			 * @param e {Event} The event that caused the EE to open.
			 */
			openEE: function(e) {
				if(!this.isEEDisabled){
					topic.publish(this.itemSelectedEvent, this);
					topic.publish(this.itemClickedEvent, this, e);
				}
			},
			
			/**
			 * Handle keyboard navigation to a new item.
			 * Take into consideration the suspending of keyboard navigation, which is necessary to allow all
			 * keys to be used in the inlineComment box or other embedded textarea.
			 */
			keyboardNavigate: function(keyCode) {
				if ((!domAttr.get(document.activeElement, "data-commentInput")) && (!this._isDirty())) {
					topic.publish(events.KEYBOARDNAVIGATION, this.domNode, keyCode);
				}
			},
			
			/**
			 * Store on this news item that a dynamic update failed and the updatedSince 
			 * timestamp, allowing future clicks to attempt another update
			 */
			setDynamicUpdateFailed: function(updatedSince){
				this.dynUpdateFailed = true;
				this.updatedSince = updatedSince;
			},
			
			/**
			 * Called when the NewsItem is clicked anywhere.
			 * @param e {Event} the onClick event
			 */
			_onClick: function(e){
				// Get the DOM target of this event
				if(!this.dynUpdateFailed){
					var eventTarget = e.target;
					
					/* If the target node is explicitly defined to not open the EE by way of
					   an attribute then don't open. */
					if (this._notOpenEEForNode(e.target)) {
						return;
					}
					
					// Check if the target or it's parent is an anchor link
					for(var i = 0; i <= 1; i++){
						if(!this.shouldTagOpenEE(eventTarget.tagName)){
							// End here if a forbidden tag triggered the event
							return;
						}
						eventTarget = eventTarget.parentNode;
					}
					
					// Open the EE for this news item
					this.openEE();			
				}
				else{
					// Reset the dynUpdateFailed flag to stop subsequent requests.
					this.dynUpdateFailed = false;
					this.updatedSince = null;
					// Fire addactivityentry to retry dynamic update to this item.
					topic.publish(this.addActivityEntryEvent, this.newsData.getActivityId(), this.updatedSince, 2000, true);
				}
			},
		
			/**
			 * The enablement of items in the _onFocus and _onBlur events are handled by an
			 * instance of the ItemFocusHandler via the published events.
			 */	
			_onFocus: function(e){
				topic.publish(events.ITEMGOTFOCUS, this, e);
			},
			
			_onBlur: function(e){
				if (!this.isEEOpen && !this._isDirty()) {
					topic.publish(events.ITEMLOSTFOCUS, this, e);
				}
			},
			
			_onKeyPress: function(e) {
				// Open the EE if the return key was pressed or the spacebar was pressed and the node was an A 
				// and target has the data-eeopener attribute set to true.
				if (e) {
					var keyPressed = e.keyCode || e.which;
					
					if (domAttr.get(e.target, "data-eeopener")==="true" &&
						(keyPressed === 13 || (keyPressed === 32 && e.target.nodeName==="A"))) {
					
						this.openEE(e);
						
						// Stop the event bubbling or it prevents the EE from opening.
						e.preventDefault(), e.stopPropagation();
					}
		
					if((e.keyCode === 38 || e.keyCode === 40) && this.allowItemKeyboardNavigation) {
						this.keyboardNavigate(e.keyCode);
					}
				}
			},
			
			_isDirty: function(){		
				if (this.configManager.checkDirtyFlag()) {
					if(com.ibm.social.as.comment.commentInputManager.isCommenting &&
							com.ibm.social.as.DirtyChecker.isDirty()){
							return true;
					}	
				}
				return false;
			},
			
			/**
			 * Function used to show actions, activated by a Jaws user. The function
			 * doesn't need to do anything, pressing the return key is sufficient
			 * do display the actions. However, it needs to be here so dojoAttachEvent
			 * can work.
			 */
			_showActions: function() {
		
			},
			
			onShowMoreLessClicked : function(e){
				this.handleShowMoreLessClicked(e, this.contentNode, this.showMoreText, this.showLessText);
			},
			
			shouldShowLikeControl: function(readonly) {
				// we should only show like control if:
				// - item has likeService, AND
				// - item has > 0 likes OR item is likeable
				// If you cannot like, and there are no current likes control is pointless
				var curLikes = this.newsData.getActivityLikesCount() || 0;
				return ( this.newsData.isLikeEnabled() && ( curLikes > 0 || this.isLikeEditable(readonly) ) );
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
					var ds = this.likeDataStore = this.likeDataStore || new ASLikeDataStore(this, false);
					
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
					this.hasNewsActions = true;
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
			
			/*
			 * Used to re-create the like control in readonly mode after error occurs
			 */
			recreateLikeControl: function(readonly) {
				if ( this.likeControl ) {
					this.likeControl.destroyRecursive();
				}
				this.createLikeControl(readonly);
			},
			
			displayLikeError: function(errorMsg, errorMore) {
				if (this._errorMessage) {
					this._errorMessage.destroyRecursive(true);
			        domConstruct.empty(this.likeErrorNode);
			        domClass.add(this.likeErrorNode, "lotusHidden");
				}
		
				this._errorMessage = new MessageBox({
					canClose: true,
					type: MessageBox.TYPE.ERROR,
					msg: errorMsg,
					msgMore:errorMore,
					_strings: {
						a11y_label: this.strings.errorAlt,
						icon_alt: this.strings.errorText,
						close_btn_alt: this.strings.msgCloseAlt,
						close_btn_title: this.strings.msgCloseAlt
					}
				}, this.likeErrorNode);
				domClass.remove(this.likeErrorNode, "lotusHidden");
			},
			
			displayRepostMessage: function(success, Msg, errorMore) {
				if (this._repostMessage) {
					this._repostMessage.destroyRecursive(true);
			        domConstruct.empty(this.repostMessageNode);
			        domClass.add(this.repostMessageNode, "lotusHidden");
				}
		
				if(success){	
					this._repostMessage = new MessageBox({
						canClose: true,
						type: MessageBox.TYPE.SUCCESS,
						msg: Msg,
						_strings: {
							a11y_label: "Success:",
							icon_alt: "Success",
							close_btn_alt: this.strings.msgCloseAlt,
							close_btn_title: this.strings.msgCloseAlt
						}
					}, this.repostMessageNode);
					domClass.remove(this.repostMessageNode, "lotusHidden");
				}else{	
					this._repostMessage = new MessageBox({
						canClose: true,
						type: MessageBox.TYPE.ERROR,
						msg: Msg,
						msgMore:errorMore,
						_strings: {
							a11y_label: this.strings.errorAlt,
							icon_alt: this.strings.errorText,
							close_btn_alt: this.strings.msgCloseAlt,
							close_btn_title: this.strings.msgCloseAlt
						}
					}, this.repostMessageNode);
					domClass.remove(this.repostMessageNode, "lotusHidden");
				}
				
				
			},
			
			communityDisabled: function(communityId){
				if(this.newsData && this.newsData.getCommunityId()===communityId) {
					this.removeLikeControl();
					this.disableSingleActionUI("comment");
				}
			},
		
			/*
			* Utility function for destroying widgets in general
			* covers a case were a destroy method only is provided
			*/
			destroyWidget: function(widget) {
				if(widget && widget.destroyRecursive){
					widget.destroyRecursive();
				} else if (widget && widget.destroy){
					widget.destroy();
				}		
			},
			
			uninitialize: function() {						
				this.destroyWidget(this.likeDataStore);
				this.likeDataStore = null;
				this.destroyWidget(this.likeControl);
				this.destroyWidget(this.inlineComments);
				this.destroyWidget(this.commentInput);					
				this.destroyItemUtil();
				this.newsData = null;
				this.content = null;
				this.strings = null;
				
				this.templateExtension = null;
				this.rollupExtension = null;	
				this.inherited(arguments);
			}
		});
			
		return NewsItem;
	});
