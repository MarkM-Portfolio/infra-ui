/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */


dojo.require("com.ibm.social.as.trending.InlineTagList");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.util.EventedArray");
dojo.require("lconn.core.util.EventMixin");
dojo.require("lconn.core.config.properties");
dojo.require("com.ibm.social.as.util.hashtag.search.InlineSelectedHashtag");
dojo.provide("com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag");


(function(){
dojo.declare("com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag", [lconn.core.util.EventMixin], {

	inlineListDijit: null,
	init: false,
	selectedTags: null,
	dateReqString: null,
	calledUpdateState: false,

	/**
	 * Called when the view loads on the page.
	 */
	onLoad: function() {
		this.selectedTags = new com.ibm.social.as.util.EventedArray();
		this.selectedTags.replaceWith([]);

		this.connect(this.selectedTags, "add", this, "addTagStream");
		this.connect(this.selectedTags, "remove", this, "removeTagStream");

		var streamNode = dojo.query("div.lotusStreamTopLoading")[0];
		this.inlineListDijit = this.inlineListDijit || new com.ibm.social.as.trending.InlineTagList({
				"selectedTags": this.selectedTags,
				"inlineTagClass": "com.ibm.social.as.util.hashtag.search.InlineSelectedHashtag"
			},
			dojo.create("div", {}, streamNode, "before"));

		this.subscribe(com.ibm.social.as.constants.events.UPDATESTATE,
			dojo.hitch(this, "onStateUpdate"));

		this.init = true;
	},

	onStateUpdate: function() {
		this.calledUpdateState = true;
		this.selectedTags.replaceWith([]);
	},

	/**
	 * Add a search tag to the tag list and fire off the
	 * updates to the stream
	 */
	addSearchTag: function(tag) {
		if (!this.init) {
			this.onLoad();
		}
		this.calledUpdateState = false;
		var tarArr = this.selectedTags.getArray();
		if(dojo.indexOf(tarArr, tag) >= 0){
			this.selectedTags.remove(tag);			
		}		
		this.selectedTags.add(tag);	
	},
	
	removeTagStream: function() {
		this.updateStream(false);
	},
	
	addTagStream: function() {
		this.updateStream(true);
	},

	updateStream: function(scrollTop) {
		if(this.calledUpdateState){
			return;
		}
		var paramsObj = {
			"filters": this.makeFiltersString()
		};
		if (this.dateReqString) {
			paramsObj["dateFilter"] = this.dateReqString;
		}
		this.setStreamFilteredEvent();
		// close EE if it's open
		dojo.publish(com.ibm.social.as.constants.events.CLOSEEE);
		dojo.publish(com.ibm.social.as.constants.events.PARAMCHANGE, [paramsObj, scrollTop]);
	},
	
	/**
	 * If more than 0 entries in selectedArray set a filter lock on the stream
	 * mainly to block any fake status updates on the stream.
	 */
	setStreamFilteredEvent: function(){
		if(this.selectedTags.getArray().length > 0){
			dojo.publish(com.ibm.social.as.constants.events.ASSTREAMFILTERED, [true]);
		} else {
			dojo.publish(com.ibm.social.as.constants.events.ASSTREAMFILTERED, [false]);
		}
	},

	
	publishViewChange: function(viewParam, filterParam){
		this.calledUpdateState = true;
		dojo.publish(com.ibm.social.as.constants.events.UPDATESTATE, [{
			view: viewParam,
			filter: filterParam
		}]);		
	},

	makeFiltersString: function() {
		var filterReq = [];
		dojo.forEach(this.selectedTags.getArray(), function(tag) {
			filterReq.push({
				'type': 'tag',
				'values': [tag]
			});
		});
		return dojo.toJson(filterReq);
	}
});

com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag.getInstance = function(opts) {
	   if(!com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag._instance)
		   com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag._instance = new com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag();
	   return com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag._instance;
	}

})();
