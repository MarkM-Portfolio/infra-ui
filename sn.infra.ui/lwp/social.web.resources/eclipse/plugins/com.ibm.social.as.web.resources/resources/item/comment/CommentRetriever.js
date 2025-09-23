/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 */
dojo.provide("com.ibm.social.as.item.comment.CommentRetriever");

dojo.require("lconn.core.util.LCDeferred");
dojo.require("dojo.date.stamp");


dojo.declare("com.ibm.social.as.item.comment.CommentRetriever", null,
{
	reportedCount: 0,		// count of comments as claimed by stream
	actualCount: undefined,	// actual count of comment from API
	
	lastPageRetrieved: 0,	// need to keep track of which page we retrieved from API
	
	comments: null,			// full list of comments already loaded
	
	suId: null,				// id of status update
	
	constructor: function(/* string */ suId, /* object */ comments) {
		// summary:
		//   constructor. Seeds the datastore with information from AS feed entry
		// suId:
		//	status update id
		// replies:
		//	the replies object from feed. should contain latest 2 comments, and total count
		this.suId = suId;
		this.comments = [];
		if ( comments ) {
			this.reportedCount = comments.totalItems || 0;
			dojo.forEach(comments.items, function(comment) {
				if ( comment ) {
					this.comments.push(dojo.clone(comment));
				}
			}, this);
		}
	},
	
	retrievePreviousComments: function(/* int */ displayedCount, /* int */step) {
		// summary:
		//    Retrieves comments before the current 1st comment
		//    It is responsibility of consumer to ensure this is NOT called
		//	   multiple times concurrently! (disable multiple clicks!)
		// displayedCount: 
		//    count of currently displayed comments
		// step: 
		//    first two steps take 50 prev comments, subsequent steps take 100 comments
		// return:
		//    returns a promise (Deferred). Comment retrieval is async, so we will
		//    resolve the promise when we have the comments
		
		// for first two steps, we pull in 50 comments, after that we pull in 100 comments at a time
		// 100 is max that API will return.
		var retrieveCount = step < 2 ? 50 : 100;
		if ( step == 2 ) {
			// hacky, but API just supports page index & size. No "updatedBefore".
			// 2 pages @ 50 comments == 1 page @ 100 comments
			// when we get to third step, we are pulling 100 comments, which is now page 2
			// this can be fixed when API supports updatedBefore, instead of just startIndex
			this.lastPageRetrieved--;  
		}
		
		return this.loadMoreComments(retrieveCount)
				.then(dojo.hitch(this, "storeNewComments", retrieveCount))
				.then(dojo.hitch(this, function() {
					var startIndex = Math.max(0, this.comments.length - ( displayedCount + retrieveCount) );
					var endIndex = this.comments.length - displayedCount;
					return {
						actualCount: this.actualCount || this.reportedCount,
						comments: this.comments.slice(startIndex, endIndex)
					};
				}));	
	},
	
	storeNewComments: function(/* int */ retrieveCount, /* Object */ resp) {
		// summary:
		//	called to handle response from API request. 
		//	- store new comments in comments array
		//	- detect end of comments list (didnt get full page back)
		//  - update actualCount (versus reported count)
		//	- discard duplicates
		// resp
		// 	this is the json response from the API request
		// retrieveCount
		//	this is the pagesize we requested. used to determine if we hit end
		
		if ( !resp || !resp.list ) return; // cant do much
		
		// we only want comments older that first comment we already have.
		var curFirst = this.comments[0] || null;
		var curFirstTime = curFirst ? curFirst.published || curFirst.updated : null;
		curFirstTime = curFirstTime ? dojo.date.stamp.fromISOString(curFirstTime) : new Date();
		
		// comments returned in descending date, we want ascending
		resp.list.reverse();
		
		var newComments = [];
		dojo.some(resp.list, function(comment) {
			var cTime = dojo.date.stamp.fromISOString(comment.published);
			if ( dojo.date.compare(curFirstTime, cTime) > 0 ) { // is comment older?
				newComments.push(comment);
			} else if ( dojo.date.compare(curFirstTime, cTime) == 0 ) { // same time
				if ( curFirst && curFirst.id == comment.id ) { // we are up-to-date
					return true; // return true to get dojo.some to break out
				} else {
					// this is impossible right now... 
					// but maybe this code will live to see computers that fast
					newComments.push(comment);
				}
			} else { // comment newer
				return true; // return true to get dojo.some to break out
			}
			
		}, this);
		
		// add likeservice url to each comment - ublog API does not return it
		dojo.forEach(newComments, function(comment) {
			if ( comment && comment.id ) {
				comment.connections = comment.connections || {};
				comment.connections.likeService = activityStreamAbstractHelper.getMBCommentLikeUrl(comment.id);
				comment.updated = comment.published;
			}
		}, this);
	
		this.comments = newComments.concat(this.comments);
		
		// are we at end of comment list>
		if ( resp.itemsPerPage < retrieveCount ) {
			// our actual count is list of comments we have
			this.actualCount = this.comments.length;
		}
	},
	
	loadMoreComments: function(/* int */ retrieveCount) {
		// summary:
		//	load next page of comments from API
		var promise = new lconn.core.util.LCDeferred();
		
		retrieveCount = retrieveCount || this.defaultRetrieveCount;
		
		var page = this.lastPageRetrieved + 1;
		var url = activityStreamAbstractHelper.getCommentSvcRetrievalUrl(this.suId, page, retrieveCount);
		activityStreamAbstractHelper.xhrGet({
			url: url,
			handleAs: "json",
			load: dojo.hitch(this, function(resp) { 
				this.lastPageRetrieved++;
				promise.resolve(resp);
			}),
			error: function(err, xhrErr) {
				// inject the xhrErr into err so we have access to status, etc
				// when we want to display error message.
				err.xhrErr = xhrErr;
				promise.reject(err); 
			}
		});
		
		return promise;
	},
	
	discardAdditionalComments: function(/* int */ additionalCommentCount) {
		this.comments.splice(0, additionalCommentCount);
		this.lastPageRetrieved = 0;
	}
});
