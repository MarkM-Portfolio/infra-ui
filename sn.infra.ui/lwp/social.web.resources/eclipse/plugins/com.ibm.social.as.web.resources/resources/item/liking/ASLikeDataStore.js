/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.liking.ASLikeDataStore");

dojo.require("lconn.core.util.LCDeferred");
dojo.require("com.ibm.lconn.layout.people");
dojo.require("com.ibm.social.as.constants.events");

dojo.requireLocalization("com.ibm.social.ublog", "InlineLiking");
dojo.requireLocalization("com.ibm.social.as","activitystream");

/**
 * DataStore for Like control for AS
 * 
 * @author BrianOG
 */

dojo.declare("com.ibm.social.as.item.liking.ASLikeDataStore", [],
{
	_items: null,
	_newsItem: null,
	_firstFetch: true,
	_likeSvcUrl: null,
	_likeStatusPromise: null,
	_getItemsPromise: null,
	_curUserLikes: false,
	_curUserId: null,
	_curUserDisplayName: null,
	_dirtyItem: null,
	_ublogStrings: null,
	_asStrings: null,
	_joinCommunityGenericStr: null,
	_joinCommunitySpecificStr: null,

	constructor: function(newsItem) {
		this._newsItem = newsItem;
		
		this._likeSvcUrl = newsItem.newsData.getLikeSvcUrl();
		this._likeStatusPromise = new lconn.core.util.LCDeferred();
		this._curUserId = com.ibm.social.as.configManager.getUserInfoId();
		this._curUserDisplayName = com.ibm.social.as.configManager.getUserInfoDisplayName();
		this._curUserLikes = this.doesCurrentUserLike(this._newsItem.newsData.getActivityLikesItems());
		this._curLikeCount = this._newsItem.newsData.getActivityLikesCount() || 0;
		
		this._ublogStrings = dojo.i18n.getLocalization("com.ibm.social.ublog", "InlineLiking");
		this._asStrings = dojo.i18n.getLocalization("com.ibm.social.as","activitystream");
		this._joinCommunityGenericStr = this._ublogStrings.SU_LIKE_JOIN_GENERIC;
		this._joinCommunitySpecificStr = this._ublogStrings.SU_LIKE_JOIN_COMMUNITY;
	},
	
	destroy: function() {
		as_console_debug("ASLikeDataStore.destroy");
		this._newsItem = null;
		this._likeSvcUrl = null;
		this._curUserLikes = null;
		this._curLikeCount = null;
		this._likeStatusPromise = null;
		this._items = null;
		this._dirtyItem = null;
	},
	
	/*
	 * Used to sort items by display name
	 */
	itemComparator: function(a, b) {
		if ( a.name < b.name ) return -1;
		if ( a.name > b.name ) return 1;
		return 0;	
	},
	
	_getItems: function() {
		as_console_debug("ASLikeDataStore._getItems - entering - arguments: ", arguments);
		if ( this._getItemsPromise == null ) {
			this._getItemsPromise = new lconn.core.util.LCDeferred();

			// need to fetch the items
			// we need to request the feed of likes
			this.getLikes().then(dojo.hitch(this, function(items) {
				this._items = items;
				
				// Sort list by display name, alphabetically
				this._items.sort(this.itemComparator);
				as_console_debug("ASLikeDataStore._getItems - resolving promise - items: ", this._items);
				this._getItemsPromise.resolve(this._items);
			}));
		}
		
		return this._getItemsPromise;
	},
	
	_findItemIndex: function(items, item) {
		for ( var i = 0; i<items.length; i++ ) {
			if ( items[i].id === item.id ) {
				return i;
			}
		}
		return -1;
	},

	/*
	 * This will be called multiple times.
	 * First time it is called is when control is displayed... in this case
	 *  we do NOT want to get the list of users that like the item... too many requests
	 *  For first call, we just need to set the number so the like control can display
	 * Subsequent calls to this are when the popup is launched or item un/likes. 
	 * In this case we need to request the feed of likes, and return the results.
	 */
	fetch: function(request) {
		as_console_debug("ASLikeDataStore.fetch - entering - request:", request);
		
		var target = (request.scope) ? request.scope : dojo.global;
		if ( this._firstFetch ) {
			as_console_debug("ASLikeDataStore.fetch - firstFetch - calling onBegin - _curLikeCount:", this._curLikeCount);
			request.onBegin.call(target, this._curLikeCount, request);
			as_console_debug("ASLikeDataStore.fetch - firstFetch - calling onComplete - items:", null);
			request.onComplete.call(target, null, request);
			this._firstFetch = false;
		} else {
			this._getItems().then(dojo.hitch(this, function(items) {
				// so, this is **really** nasty... however...
				// When we request the feed of likes, we get back a max of 25 items
				// We do NOT get a total count of items... so we only believe the
				// count from the feed if it's 24 or less. If it's 25, it might not
				// be full list.
				// If it's 24 or less, update the count we got from AS feed.
				// If it's 25 of more, we have to live with count we have in AS feed
				if ( items.length <= 24 ) {
					this._curLikeCount = items.length;
				}
				
				as_console_debug("ASLikeDataStore.fetch - calling onBegin - _curLikeCount:", this._curLikeCount);
				request.onBegin.call(target, this._curLikeCount, request);
				as_console_debug("ASLikeDataStore.fetch - calling onComplete - items:", items);
				request.onComplete.call(target, items, request);
			}));
		}
	},

	/*
	 * Called to check if the current user likes this item.
	 * If no use (unauthenticated) we return null
	 * If current user does not like, we return empty array
	 * If current user does like, we return item with current user details
	 */
	fetchItemByIdentity: function (request) {
		as_console_debug("ASLikeDataStore.fetchItemByIdentity - entering - request:", request);
		
		// should only be called for current user
		if ( this._curUserId == request.identity ) {
			var user = null;
			
			if ( this._curUserLikes ) {
				user = {
					id: this._curUserId,
					name: this._curUserDisplayName
				};
			}
			
			if ( request.onItem ) {
				var scope = request.scope ? request.scope : dojo.global;
				var result = user ? [ user ] : [];
				// The Like control does not seem to like if you return immediately
				window.setTimeout(function () {
					request.onItem.apply(scope, result);
					as_console_debug("ASLikeDataStore.fetchItemByIdentity - calling onItem() - result:", result);
				}, 10);
			}
		} else if ( !this._curUserId ) {
			// if unauthenticated, send back null
			if (request.onItem) {
				var scope = request.scope ? request.scope : dojo.global;
				request.onItem.apply(scope, null);
				as_console_debug("ASLikeDataStore.fetchItemByIdentity - calling onItem() - user:", null);
			}
		}
	},
	
	/*
	 * Called to remove current user's like
	 * Do not perform the unlike here... control will call back to save if ds is dirty
	 */
	deleteItem: function(item) {
		as_console_debug("ASLikeDataStore.deleteItem - entering - arguments:", arguments);
		if ( item.id == this._curUserId ) { // should only ever be called for current user
			item.isDirty = true;
			item.isDeleted = true;
			this._dirtyItem = item;
			
			// close EE if it's open
			dojo.publish(com.ibm.social.as.constants.events.CLOSEEE);
		}
	},
	
	/*
	 * Called to add like for current user
	 * Do not perform the like here... control will call back to save if ds is dirty
	 */
	newItem: function(item) {
		as_console_debug("ASLikeDataStore.newItem - entering - arguments:", arguments);

		if ( item.id == this._curUserId ) { // should only ever be called for current user
			// add displayname to the item
			item.name = this._curUserDisplayName;
			item.isNew = true;
			item.isDirty = true;
			this._dirtyItem = item;
			
			// close EE if it's open
			dojo.publish(com.ibm.social.as.constants.events.CLOSEEE);
		}
	},
	
	/*
	 * Called by the Like control to save the dirty item if there has been a change
	 * e.g. item is liked or unliked by the user
	 * We can provide feedback to the control, via onComplete/onError functions in saveArgs
	 */
	save: function(saveArgs) {
		as_console_debug("ASLikeDataStore.save - entering - arguments:", arguments);
		
		if ( this._dirtyItem ) {
			var item = this._dirtyItem;
			if ( item.isNew ) { // new item == news item was liked
				// call the overrideable like() to perform the API like
				this.like(item).then(dojo.hitch(this, function() {
					this._curUserLikes = true;
					this._curLikeCount += 1;
					
					this._getItems().then(dojo.hitch(this, function(items) {
						if ( -1 == this._findItemIndex(items, item)) {
							// remove the item from list of items
							items.push(item);
							items.sort(this.itemComparator);
						}
						
						// clean up dirty item
						this.revert();
						
						// let control know all was ok
						if ( saveArgs.onComplete ) {
							saveArgs.onComplete();
						}
					}));										
				}), dojo.hitch(this, function(error) {
					// build & display error message to user
					var msg = this._getLikeErrorMessage(error, true); 
					this.displayLikeError(msg, error.message || error);
					
					// if error was Unauthorized, re-render like control as readonly to prevent user re-trying
					if ( error.status === 403 ) {
						this.recreateLikeControl(true);
					}
					
					if ( saveArgs.onError ) {
						saveArgs.onError(error);
					}
				}));			
			} else if ( item.isDeleted ) { // deleted item == news item was unliked
				// call the overridable unlike() to perform the API unlike
				this.unlike(item).then(dojo.hitch(this, function() {
					this._curUserLikes = false;
					this._curLikeCount -= 1;
					
					// remove the item from list of items
					this._getItems().then(dojo.hitch(this, function(items) {
						var idx = this._findItemIndex(items, item);
						if ( idx != -1 ) {
							items.splice(idx, 1);
						}
						
						// clean up dirty item
						this.revert();
						
						// let control know all was ok
						if ( saveArgs.onComplete ) {
							saveArgs.onComplete();
						}
					}));
				}), dojo.hitch(this, function(error) {
					// build & display error message to user
					var msg = this._getLikeErrorMessage(error, false); 
					this.displayLikeError(msg, error.message || error);
					
					// if error was Unauthorized, re-render like control as readonly to prevent user re-trying
					if ( error.status === 403 ) {
						this.recreateLikeControl(true);
					}
					if ( saveArgs.onError ) {
						saveArgs.onError(error);
					}
				}));
			}
		}
	},
	
	_getLikeErrorMessage: function(error, liking) {
		var msg;
		if ( error.status === 403 ) {
			msg = this._joinCommunityGenericStr;
			
			var d = this._newsItem.newsData;
			if ( d && d.getGeneratorId() === "communities" ) {
				var communityId = d.getCommunityId();
				var communityName = d.getConnectionsContainerName();
				
				dojo.publish(com.ibm.social.as.constants.events.COMMUNITYDISABLED, [communityId]);				
				
				// Commented out due to PMR 25532,070,724
                // Message displayed asked the user to join when the user was already joined
                // No way to sense Community membership at the moment - to be revisited, story 145038
				/*
				if ( communityId && communityName ) {	
					var tempDiv = dojo.create("div");
					dojo.create("a", {
						innerHTML: communityName, 
						target: this._newsItem.linkTarget, 
						href: this._newsItem.getConnectionsCommunityUrl(communityId)}
					, tempDiv);					
					
					msg = dojo.string.substitute(this._joinCommunitySpecificStr, [tempDiv.innerHTML]);

                    msg = dojo.create("div", {innerHTML: msg});
				}
				*/
			}
		} else {
			/* If the error is not a 403, give a "generic" (translatable) error message */
			msg = liking ? this._asStrings.likeError : this._asStrings.unLikeError;
		}
		
		return msg;
	},
	
	recreateLikeControl: function(readonly) {
		this._newsItem.recreateLikeControl(true);
	},
	
	displayLikeError: function(msg, msgMore) {
		this._newsItem.displayLikeError(msg, msgMore);
	},
	
	/*
	 * Called by Like control is there was error saving.
	 * Also called by ourselved to tidy up dirty item after completing saving
	 */
	revert: function() {
		//as_console_debug("ASLikeDataStore.revert - entering - arguments:", arguments);
		if ( this._dirtyItem ) {
			this._dirtyItem.isNew = false;
			this._dirtyItem.isDeleted = false;
			this._dirtyItem.isDirty = false;
			this._dirtyItem = null;
		}
	},
	
	isItem: function(item) {
		//as_console_debug("ASLikeDataStore.isItem - entering - arguments:", arguments);
		return ( item && "id" in item && item.id ); 
	},
	
	isItemLoaded: function(item) {
		//as_console_debug("ASLikeDataStore.isItemLoaded - entering - arguments:", arguments);
		return (item && item.id && item.name);
	},
	
	loadItem: function() {
		// no-op
	},
	
	getValue: function() {
		// no-op
	},
	
	/*
	 * Called by Like control to see if datastore or an item is dirty
	 * If item passed, check if that is dirty, else check if ds is dirty
	 */
	isDirty: function(/* optional */ item) {
		as_console_debug("ASLikeDataStore.isDirty - entering - arguments:", arguments);
		var dirty = item ? item.isDirty : this._dirtyItem != null;
		as_console_debug("ASLikeDataStore.isDirty - exiting - dirty:", dirty);
		return dirty;
	},
	
	_getIdentifierAttribute: function() {
		return "id";
	},
	
	/*
	 * Called by popup
	 * Passed as callback when creating Like control
	 */
	getUserPhotoUrl: function(id) {		
		return this._newsItem.getPhotoUrl({id : id});
	},
	
	/*
	 * Called by popup
	 * Passed as callback when creating Like control
	 */
	getUserProfileUrl: function(id) {
		if(com.ibm.lconn.layout.people.getProfileUrl)
			return com.ibm.lconn.layout.people.getProfileUrl({id: id});
		else
			return id;
	},
	
	/*
	 * Checks the newsItem to see if the current user is listed in  [object/target].likes.items
	 * @returns {Boolean}
	 */
	doesCurrentUserLike: function(likesItems) {
		var curUser = com.ibm.social.as.configManager.getUserInfoId();
		
		for ( var i = 0; i < likesItems.length; i++ ) {
			var likeUser = likesItems[i].id;
			if ( likeUser ) {
				likeUser = this._newsItem.getConnectionsUserId(likeUser);
				if ( likeUser === curUser ) {
					return true;
				}
			}
		}
		return false;
	},
	
	getLikes: function() {
		as_console_debug("ASLikeDataStore.getLikes - entering - arguments: ", arguments);
		var promise = new lconn.core.util.LCDeferred();
		
		// feed returns 20 items by default. popup supports max of 25, just request the 25 in request so we get all needed
		var url = this._likeSvcUrl + ( this._likeSvcUrl.indexOf("?") == -1 ? "?count=400" : "&count=400" ); 
		
		activityStreamAbstractHelper.xhrGet({
			url: url,
			handleAs: "json",
			load: dojo.hitch(this, function(response) {
				var likes = [];
				if ( response && response.list ) {
					for ( var i = 0; i<response.list.length; i++ ) {
						var id = this._newsItem.getConnectionsUserId(response.list[i].author.id);
						var item = {
								id: id,
								name: response.list[i].author.displayName,
								userState: response.list[i].author.connections.state
						};
						likes.push(item);
					}
				}
				as_console_debug("ASLikeDataStore.getLikes - resolving promise - likes: ", likes);
				promise.resolve(likes);
				
			}),
			error: function(error) {
				promise.reject(error);
			}		
		});
		
		return promise;
	},
	
	like: function() {
		var promise = new lconn.core.util.LCDeferred();
		
		var currUserIdLike = this._newsItem.getOpenSocialUserId(this._curUserId);
		
		// like the item
		activityStreamAbstractHelper.xhrPost({
			url: this._likeSvcUrl + "/" + currUserIdLike,
			headers: {"Content-Type":"application/json; charset=utf-8"},
			handleAs: "json",
			load: function(response) {
				as_console_debug("ASLikeDataStore.like - liked");
				promise.resolve();
			},
			error: function(error) {
				promise.reject(error);
			}		
		});
		
		return promise;
	},
	
	unlike: function() {
		var promise = new lconn.core.util.LCDeferred();
		
		var currUserIdUnlike = this._newsItem.getOpenSocialUserId(this._curUserId);
		
		// unlike the item
		activityStreamAbstractHelper.xhrDelete({
			url: this._likeSvcUrl + "/" + currUserIdUnlike,
			handleAs: "json",
			load: function(response) {
				as_console_debug("ASLikeDataStore.unlike - unliked");
				promise.resolve();
			},
			error: function(error) {
				promise.reject(error);
			}		
		});
		
		return promise;
	}
});
