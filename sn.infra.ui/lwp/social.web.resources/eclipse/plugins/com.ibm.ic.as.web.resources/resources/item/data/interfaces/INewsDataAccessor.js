/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare"
	], function (declare) {
	
		/**
		 * Interface that should be mixed into classes providing data from a feed for a  
		 * news item. The interface provides methods to get various attributes
		 * of the news data, conforming to the OpenSocial 2.0 specifications.
		 * 
		 */
		
		var INewsDataAccessor = declare(null,
		{
			/**
			 * Get the event's id
			 * @return {String} id
			 */
			getId: function() {},
			
			/**
			 * Gets the actor for the news item. 
			 * This is a MANDATORY attribute.
			 * @return {object} containing the Actor attributes.
			 */
			getActor: function() {},
			
			/**
			 * Gets the id of the actor for the news item.
			 * @return {string} containing the actor id, or undefined if no actor (which should never be the case).
			 */
			getActorId: function() {},
			
			/**
			 * Gets the display name of the actor.
			 * @return {string} containing the actor display name.
			 */
			getActorDisplayName: function() {},
			
			/**
			 * Gets the image url of the actor for the activity.
			 */
			
			getActorImageUrl: function() {},
			
			/**
			 * Gets the generator for the news item. This describes the application that
			 * generated the activity. Attributes follow the ActivityObject specification.
			 * @return {object} containing the Generator attributes.
			 */
			getGenerator: function() {},
			
			/**
			 * Get the generator id for the news item.
			 * @return {string} containing the Generator ID or undefined if the generator isn't specified.
			 */
			getGeneratorId: function() {},
				
			/**
			 * Get the generator display name.
			 * @return {string} containing the generator displayname.
			 */
			getGeneratorDisplayName: function() {},
			
			/**
			 * Get the url for the generator image.
			 * @return {string} containing the url for the generator image or undefined if one isn't specified.
			 */
			getGeneratorImageUrl: function() {},
				
			/**
			 * Gets the content as a string for the news item.
			 * @return {string} containing content.
			 */
			getContent: function() {},
			
			/**
			 * Gets the object from the activity, describing the primary object
			 * of the activity. Attributes follow the ActivityObject specification.
			 * @return {object} containing the activity object attributes.
			 */
			getObject: function() {},
			
			/**
			 * Get the object's author id.
			 * @return {String}
			 */
			getObjectAuthorId: function(){},
			
			/**
			 * Get the object's url.
			 * @return {String}
			 */
			getObjectUrl: function(){},
			
			/**
			 * Gets the date and time the activity was published as a string. 
			 * This is a MANDATORY attribute. 
			 * @return {string} containing the published date.
			 */
			getPublished: function() {},
			
			/**
			 * Gets the posted time of the activity.
			 * @return {string} containing the posted time.
			 */
			getPostedTime: function() {},
			
			/**
			 * Get the provider of the activity. Attributes follow the ActivityObject specification.
			 * @return {object} containing the provider attributes.
			 */
			getProvider: function() {},
			
			/**
			 * Get the target of the activity. Attributes follow the ActivityObject specification.
			 * @return {object} containing the target's attributes.
			 */
			getTarget: function() {},
			
			/**
			 * Get the id of the target of the activity.
			 * @return {string} containing the target's id.
			 */
			getTargetId: function() {},
			
			/**
			 * Get the object type of the target.
			 * @return {String | undefined}
			 */
			getTargetObjectType: function() {
				return (this.target) ? this.target.objectType : undefined;
			},
		
			/**
			 * Get the url of the target object.
			 * @return {String | undefined}
			 */
			getTargetUrl: function() {},
			
			/**
			 * Get the id of the target author.
			 * @return {String | undefined}
			 */
			getTargetAuthorId: function() {
				return (this.target && this.target.author) ? this.target.author.id : undefined;
			},
			
			/**
			 * Get the display name of the target author.
			 * @return {String | undefined}
			 */
			getTargetAuthorName: function() {},
			
			/**
			 * Get the title of the activity as a string.
			 * @return {string} containing title of the activity.
			 */
			getTitle: function() {},
			
			/**
			 * Get the updated date and time that a previously published activity has been modified as a string.
			 * @return {string} containing updated date of the activity.
			 */
			getUpdated: function() {},
			
			/**
			 * Get the url for the activity as a string.
			 * @return {string} containing url for the activity.
			 */
			getUrl: function() {},
			
			/**
			 * Get the verb for the activity entry as a string. 
			 * @return {string} containing verb for the activity.
			 */
			getVerb: function() {},
			
			/**
			 * Get news item type.
			 * @return {string} containing the activity type.
			 */
			getActivityType: function() {},
			
			/**
			 * Get news item id.
			 * @return {string} the activity id.
			 */
			getActivityId: function() {},
			
			/**
			 * Get (activity) display name.
			 * @return {string} containing the item name.
			 */
			getActivityDisplayName: function() {},
			
			/**
			 * Retrieve the (activity) image.
			 * @return {object} containing attributes of the image, as per the MediaLink object in theOpenSocial Specification
			 */
			getActivityImage: function() {},						
		
			/**
			 * Retrieve the (activity) file author id.
			 * @return {string} containing the author id
			 */
			getActivityFileAuthorId: function() {},
			
			/**
			 * Retrieve the (activity) file author name.
			 * @return {string} containing the author name
			 */
			getActivityFileAuthorName: function() {},
			
			/**
			 * Retrieve the (activity) file author url.
			 * @return {string} containing the author url
			 */
			getActivityFileAuthorUrl: function() {},
			
			/**
			 * Retrieve the (activity) file size.
			 * @return {string} containing the file size
			 */
			getActivityFileSize: function() {},
			
			/**
			 * Retrieve the (activity) publish time.
			 * @return {string} containing the publish time.
			 */
			getActivityPublishTime: function() {},
			
			/**
			 * Retrieve the (activity) url.
			 * @return {string} containing the url
			 */
			getActivityUrl: function() {},
			
			/**
			 * Retrieve the (activity) file url.
			 * @return {string} containing the file url
			 */
			getActivityFileUrl: function() {},
			
			/**
			 * Get the tags array for the activity.
			 * @return {array of string} returns the tags for the activity.
			 */
			getActivityTags: function() {},
		
			/**
			 * Get replies on the item. This is Connections specific. 
			 * Other implementations can return undefined or an empty array.
			 * @return {array object} - each object is a reply.
			 */
			getActivityReplies: function() {},
			
			/**
			 * Get the object author's id if available.
			 * @return {String | undefined} id of the author or undefined
			 */
			getActivityAuthorId: function() {},
			
			/**
			 * Get the object author's name if available.
			 * @return {String | undefined} name of the author or undefined
			 */
			getActivityAuthorName: function() {},
			
			/**
			 * Get the object author's image if available.
			 * @return {String | undefined} image of the author or undefined
			 */
			getActivityAuthorImage: function(){},
			
			/**
			 * Get the object author's image url if available.
			 * @return {String | undefined} image url of the author or undefined
			 */
			getActivityAuthorImageUrl: function(){},
			
			/**
			 * Check if the object is accessible to the public.
			 * @return {Boolean | undefined} true if it is public, false if it isn't and undefined if not present. 
			 */
			getActivityIsPublic: function() {},
		
			/**
			 * Get an object's mime type.
			 * @return {String | undefined} The mime type or undefined
			 */
			getActivityMimeType: function() {},
			
			/**
			 * Get the connections broadcast property.
			 * @return {String | undefined} "true", "false" or undefined
			 */
			getConnectionsBroadcast: function() {},
		
			/**
			 * Return the shortTitle attribute on the Connections object.
			 * @return {String | undefined} - The shortTitle attribute
			 */
			getConnectionsShortTitle: function() {},
		
			/**
			 * Return the plainTitle attribute on the Connections object.
			 * @return {String | undefined} - the plainTitle attribute
			 */
			getConnectionsPlainTitle: function() {},
			
			/**
			 * Return the read/unread attribute on the Connections object.
			 * @return {String | undefined} - the read attribute
			 */
			getConnectionsRead: function() {},
			
			/**
			 * Return the followedResource attribute on the Connections object
			 * @return {Boolean | undefined} - the followedResource attribute
			 */
			getConnectionsFollowedResource: function() {},
		
			/**
			 * Return the containerNAme attribute on the Connections object
			 * @return {Boolean | undefined} - the followedResource attribute
			 */
			getConnectionsContainerName: function() {},
			
			/**
			 * Return true if a Connections feed. This will return false for all third party feeds.
			 * @return {boolean} true if a Connections feed.
			 */
			isConnections: function() {},
			
			/**
			 * Check all the mandatory attributes of the news item have been supplied.
			 * @return {boolean} true if all mandatory attributes have been provided.
			 */
			isAllMandatorySupplied: function() {},
			
			/**
			 * Returns the summary for the news item.
			 * @return {string} - string containing item summary.
			 */
			getActivitySummary: function() {},
			
			/**
			 * Returns the summary for the news item...IF there is text in there
			 * @return {string} - string containing item summary
			 */
			getActivitySummaryValidated: function() {},
			
			/**
			 * Set the summary of an activity.
			 * @param summary {String}
			 */
			setActivitySummary: function(summary) {},
			
			/**
			 * Returns the attachments for the news item.
			 * @return {array} - array of objects representing attachments.
			 */
			getActivityAttachments: function() {},
			
			/**
			 * Does the news item contain a url attachment.
			 * @return {boolean} 
			 */
			isUrlAttachment: function() {},
			
			/**
			 * Returns the url attachments for the news item.
			 * @return {array} - array of objects representing url attachments.
			 */
			getUrlAttachment: function() {},
			
			/**
			 * Is the news item a status update.
			 * @return {Boolean} true if it is, false otherwise
			 */
			isStatusUpdate: function(newsItem) {},
			
			/**
			 * Is this item from a community
			 * @return {Boolean} true if this item is in a community
			 */
			isCommunity: function() {},
		
			/**
			 * Gets the community id from the news item, if there is one
			 * @return {String} community id if there is one, else null
			 */
			getCommunityId: function() {},
			
			/**
			 * Gets the like count for the activity object.
			 * @return {string} string containing the number of likes.
			 */
			getActivityLikesCount: function() {},
			
			/**
			 * Gets the likes items for activity object
			 * @return [] array of likes items (or empty array)
			 */
			getActivityLikesItems: function() {},
			
			/**
			 * Gets the userid of owner of the board the item was posted on.
			 * @return {string} string containing the ID of the owner of the board.
			 */
			getBoardUserId: function() {},
			
			/**
			 * Get the embed object for this piece of news data.
			 * @returns {Object}
			 */
			getEmbedObject: function() {},
			
			/**
			 * Get the perma-link for the news item.
			 * @returns {string} the url to the exact entry
			 */
			getPermaLink: function() {},
			
			/**
			 * Get the file published time
			 * @returns {string} time
			 */
			getFilePublshTime: function() {}, 
			
			/**
			 * Get the array of ActionLinks from the
			 * openSocial object for this item.
			 * @returns {string} time
			 */
			getActionLinks: function() {}
		});
		return INewsDataAccessor;
	});
