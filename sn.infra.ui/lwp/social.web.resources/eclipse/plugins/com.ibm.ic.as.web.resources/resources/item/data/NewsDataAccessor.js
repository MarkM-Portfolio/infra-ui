/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-construct",
		"dojo/has",
		"dojo/query",
		"dojo/io-query",
		"ic-as/config/enablement",
		"ic-as/item/data/interfaces/INewsDataAccessor"
	], function (dojo, declare, lang, domConstruct, has, query, ioQuery, enablement, INewsDataAccessor) {
	
		/**
		 * Implementation of the INewsDataAccessors that provides getters to retrieve information as
		 * supplied in a News feed that conforms to the OpenSocial Data v2.0 specification.
		 */
		
		var NewsDataAccessor = declare(INewsDataAccessor,
		{
			activity: null,
			
			activityIsTarget: true,
			
			/**
			 * Call to initialize the Accessor.
			 */
			init: function() {
				// Set the activity to point to object or target
				if(this.isConnections() && this.getTarget() && 
				   this.connections.rollupid == this.getTargetId()){
					// Make the target the main activity for this Accessor
					this.activity = this.getTarget();
				}else{
					// Make the object the main activity for this Accessor
					this.activity = this.getObject();
					this.activityIsTarget = false;
				}
			},
			
			isActivityTarget: function(){
				return this.activityIsTarget;
			},
			
			getId: function(){
				return this.id;
			},
			
			/**
			 * Gets the actor for the news item. 
			 * This is a MANDATORY attribute.
			 */
			getActor: function() {
				return this.actor || undefined;
			},
			
			/**
			 * Gets the id of the actor for the news item.
			 */
			getActorId: function() {
				return (this.actor) ? this.actor.id : undefined;
			},
			
			/**
			 * Gets the display name of the actor for the activity.
			 */
			getActorDisplayName: function() {
				return (this.actor && this.actor.displayName) ? this.actor.displayName : "";
			},
			
			/**
			 * Gets the image url of the actor for the activity.
			 */
			
			getActorImageUrl: function() {
				return (this.actor && this.actor.image) ? this.actor.image.url : undefined;
			},
			
			/**
			 * Gets the generator for the news item. This describes the application that
			 * generated the activity. Attributes follow the ActivityObject specification.
			 */
			getGenerator: function() {
				return this.generator || undefined;
			},
			
			/**
			 * Gets the generator id for the news item. 
			 */
			getGeneratorId: function() {
				return (this.generator) ? this.generator.id : undefined;
			},
			
			/**
			 * Gets the generator displayname.
			 */
			getGeneratorDisplayName: function() {
				return (this.generator) ? this.generator.displayName : undefined;
			},
			
			/**
			 * Gets the generator image URL.
			 */
			getGeneratorImageUrl: function() {
				return (this.generator && this.generator.image) ? this.generator.image.url : undefined;
			},		
			
			/**
			 * Gets the content as a string for the news item.
			 */
			getContent: function() {
				return this.content || "";
			},
			
			/**
			 * Gets the object from the activity, describing the primary object
			 * of the activity. Attributes follow the ActivityObject specification.
			 */
			getObject: function() {
				return this.object || undefined;
			},
			
			/**
			 * Get the object's author id.
			 * @return {String}
			 */
			getObjectAuthorId: function(){
				return (this.object && this.object.author) ? this.object.author.id : undefined;
			},
			
			/**
			 *  Get the object's url.
			 * @return {String}
			 */
			getObjectUrl: function(){
				return (this.object) ? this.object.url : undefined;
			},
			
			/**
			 * Gets the date and time the activity was published as a string. 
			 * This is a MANDATORY attribute. 
			 */
			getPublished: function() {
				return this.published || undefined;
			},
			
			/**
			 * Gets the posted time of the activity.
			 */
			getPostedTime: function() {
				return this.postedTime || undefined;
			},
			
			/**
			 * Get the provider of the activity. Attributes follow the ActivityObject specification.
			 */
			getProvider: function() {
				return this.provider || undefined;
			},
			
			/**
			 * Get the target of the activity. Attributes follow the ActivityObject specification.
			 */
			getTarget: function() {
				return this.target || undefined;
			},
		
			/**
			 * Get the id of the target of the activity.
			 */
			getTargetId: function() {
				return (this.target) ? this.target.id : undefined;
			},
			
			/**
			 * Get the object type of the target.
			 */
			getTargetObjectType: function() {
				return (this.target) ? this.target.objectType : undefined;
			},
			
			/** 
			 * Get the url of the target.
			 */
			getTargetUrl: function() {
				return (this.target) ? this.target.url : undefined;
			},	
			
			/**
			 * Get the id of the target author.
			 */
			getTargetAuthorId: function() {
				return (this.target && this.target.author) ? this.target.author.id : undefined;
			},
			
			/**
			 * Get the display name of the target author.
			 */
			getTargetAuthorName: function() {
				return (this.target && this.target.author) ? this.target.author.name : undefined;
			},
			
			/**
			 * Get the title of the activity as a string.
			 */
			getTitle: function() {
				return this.title || undefined;
			},
			
			/**
			 * Get the updated date and time that a previously published activity has been modified as a string.
			 */
			getUpdated: function() {
				return this.updated || undefined;
			},
			
			/**
			 * Get the url for the activitiy as a string.
			 */
			getUrl: function() {
				return this.url || undefined;
			},
			
			/**
			 * Get the verb for the activity.
			 */
			getVerb: function() {
				return this.verb || "";
			},
			
			/**
			 * Gets the type of the news item. This could be held in either the type or objectType attributes.
			 */
			getActivityType: function() {
				if (this.activity) {
					var type = this.activity.type || this.activity.objectType;
					return type || undefined;
				}
				
				return undefined;
			},
			
			getActivityId: function() {
				return (this.activity) ? this.activity.id : undefined;
			},
			
			getActivityDisplayName: function() {
				return (this.activity) ? this.activity.displayName : undefined;
			},
			
			getActivityImage: function() {
				return (this.activity) ? this.activity.image : undefined;
			},
			
			getActivityImageUrl: function() {
				return (this.getActivityImage()) ? this.getActivityImage().url : undefined;
			},
		
		    getActivityMimeType: function() {
		        return (this.activity) ? this.activity.mimeType : undefined;
		    },
		
			/**
			 * Return the target author id- as this is the author of the file.
			 * If a target does not exist then the activity is the owner
			 */
			getActivityFileAuthorId: function(){
				var targetAuthorId = this.getTargetAuthorId();
				return (targetAuthorId) ? targetAuthorId : this.getActivityAuthorId(); 
			},
			
			/**
			 * Return the target author name - as this is the author of the file.
			 * If a target does not exist then the activity is the owner
			 */
			getActivityFileAuthorName: function(){
				var targetAuthorName = this.getTargetAuthorName();
				return (targetAuthorName) ? targetAuthorName : this.getActivityAuthorName(); 
			},
			
			/**
			 * Return the target author URL - as this is the author of the file.
			 * TODO - this is undefined while the feed does not return this value yet
			 * for File items
			 */
			getActivityFileAuthorUrl: function(){
				return undefined; 
			},
			
			/**
			 * Return the file size from the activity if available
			 */
			getActivityFileSize: function(){
				return (this.activity) ? this.activity.fileSize : undefined;
			},
			
			/**
			 * Return the published time of the activity
			 */
			getActivityPublishTime: function(){
				return (this.activity) ? this.activity.published : undefined;
			},
		
			getActivityUrl: function() {
				return (this.activity) ? this.activity.url : undefined;
			},
			
			getActivityFileUrl: function() {
				return (this.activity) ? this.activity.fileUrl : undefined;
			},
			
			getActivityTags: function() {
				return (this.activity && this.activity.tags) || [];
			},
		
			getActivityReplies: function() {
				return (this.activity && this.activity.replies) || undefined;
			},
			
			getActivityAuthorId: function(){
				return (this.activity && this.activity.author) ? this.activity.author.id : undefined;
			},
			
			getActivityAuthorName: function(){
				return (this.activity && this.activity.author) ? this.activity.author.displayName : undefined;
			},
			
			getActivityAuthorImage: function(){
				return (this.activity && this.activity.author) ? this.activity.author.image : undefined;
			},
			
			getActivityAuthorImageUrl: function(){
				return (this.getActivityAuthorImage()) ? this.getActivityAuthorImage().url : undefined;
			},
				
			getActivityIsPublic: function() {
				return (this.connections) ? (this.connections.isPublic === "true") : undefined;
			},
			
			getConnectionsBroadcast: function() {
				return (this.connections) ? this.connections.broadcast : undefined;
			},
			
			getConnectionsShortTitle: function() {
				return (this.connections) ? this.connections.shortTitle: undefined;
			},
			
			getConnectionsPlainTitle: function() {
				return (this.connections) ? this.connections.plainTitle: undefined;
			},
			
			getConnectionsRead: function() {
				return (this.connections) ? this.connections.read: undefined;
			},
			
			getConnectionsFollowedResource: function() {
				return (this.connections) ? this.connections.followedResource: undefined;
			},
			
			getConnectionsContainerName: function() {
				return (this.connections && this.connections.containerName) ? this.connections.containerName : undefined;
			},
		
			isConnections: function() {
				return (this.connections) ? true : false;
			},
		
			isAllMandatorySupplied: function() {
				// For a new item tp be valid the actor and published attributes must be present.
				return (this.getActor()  && this.getPublished());
			},
			
			getActivitySummary: function() {
				return (this.activity) ? this.activity.summary : undefined;
			},
			
			getActivitySummaryValidated: function() {
				var srcSummary = this.getActivitySummary();
				var ret = null;
				
				if ( srcSummary ) {
					var tmpDiv = domConstruct.create("div", { innerHTML: srcSummary});
					var txtContent = has("ie") ? tmpDiv.innerText: tmpDiv.textContent;
					txtContent = txtContent ? lang.trim(txtContent) : null;
					if ( txtContent ) {	// is there any actual text
						ret = srcSummary;
					} else if ( query("img", tmpDiv).length > 0 ) { // or any images
						ret = srcSummary;
					}
				}
				return ret;
			},
			
			setActivitySummary: function(summary) {
				if(this.activity){
					this.activity.summary = summary;
				}
			},
			
			getActivityAttachments: function() {
				return (this.activity) ? this.activity.attachments : undefined;
			},
			
			isUrlAttachment: function() {
				return (this.activity && this.activity.attachments) 
					? (this.activity.attachments[0].objectType === "link") : undefined;
			},
			
			getUrlAttachment: function(){
				var activityAttachments = this.getActivityAttachments();
				
				if(activityAttachments && activityAttachments.length > 0){
					return activityAttachments[0];
				}
			},
			
			isStatusUpdate: function() {
				return (this.getConnectionsBroadcast() === "true"
						&& this.getActivityType() === "note");
			},
			
			isRepost: function() {
				return (this.verb) ? (this.verb === "bump") : undefined;
			},
			
			isCommunity: function() {
				return this.getCommunityId() != null;
			},
			
			getCommunityId: function() {
				return ( this.connections && this.connections.communityid ) || null;
			},
			
			getActivityLikesCount: function() {
				return (this.activity && this.activity.likes) ? this.activity.likes.totalItems : undefined;
			},
			
			getActivityLikesItems: function() {
				return ( this.activity && this.activity.likes && this.activity.likes.items ) ? this.activity.likes.items : [];
			},
			
			/*
			 * TODO: Change the implementation of the getBoardUserId so the ID is obtained from
			 * an attribute in the feed. For now we're parsing the URL of the target.
			 */
			getBoardUserId: function() {	
				var boardUserId = "";
				var targetType = this.getTargetObjectType();
				
				if (targetType === "person") {
					boardUserId = this.getTargetId();
				} else {
					if (targetType === "note") {
						var targetUrl = this.getTargetUrl();
						if (targetUrl) {
							var params = targetUrl.substring(targetUrl.indexOf("?") + 1, targetUrl.length);
							boardUserId = ioQuery.queryToObject(params).userid;
						}
					}
				}
			
				return boardUserId;
			},
			
			getEmbedObject: function() {
				return (this.openSocial) ? this.openSocial.embed : undefined;
			},
			
			getPermaLink: function() {
				return (this.activity) ? this.activity.url : undefined;
			},
			
			getFilePublshTime: function() {
				return this.getActivityPublishTime();
			},
			
			getActionLinks: function() {
				return (this.openSocial) ? this.openSocial.actionLinks : undefined; 
			},
			
			isLikeEnabled: function() {
				return ( this.connections && this.connections.likeService ) ? true : false;
			},
			
			getLikeSvcUrl: function() {
				return ( this.connections && this.connections.likeService ) ? this.connections.likeService : null;
			},
		
		    /**
		     * Some activity streams (Communities for instance) may want to disable the Shared Externally feature
		     */
		    isSharedExternallyDisabledOnActivityStream: function(){
		
		        var asc = window.activityStreamConfig;
		
		        return asc && asc.containerInfo && asc.containerInfo.disableSharedExternally;
		    },
		
			isActivityExternal : function(){
		
				// if the shared externally feature is off, then the news data is marked as 'not external'. Otherwise we'll just return its value
				if(!enablement.checkEnablement(enablement.AS_SHARED_EXTERNALLY) || this.isSharedExternallyDisabledOnActivityStream()) {
		            return false;
		        }
				
				// this.activity.connections.isExternal is carrying a string instead of a boolean
				return this.activity.connections && this.activity.connections.isExternal && this.activity.connections.isExternal === "true";
			},
		
		    /**
		     * Checks whether this NewsItem is a Forum NewsItem. Forum NewsItem have its comments renamed as "replies", for instance.
		     *
		     * @returns {boolean}, whether this item is a Forums NewsItem
		     */
		    isForumsItem: function(){
		
		        return this.isFromType("forums");
		    },
		
		    /**
		     * Checks if a NewsItem is from a given type. Types should belong to the closed set keys of INewsItem.appMap
		     *
		     * @param {string} type, a string that must be one of the keys of INewsItem.appMap
		     * @returns {boolean}, whether this item is from that type
		     */
			isFromType: function(type){
		
		        var generatorId = this.getGeneratorId();
		
		        if(!generatorId){
		            return false;
		        }
		
				return generatorId === type;
			}
		});
		
		
		return NewsDataAccessor;
	});
