/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/aspect",
		"dojo/dom-construct",
		"dojo/json",
		"dojo/query",
		"ic-as/constants/events",
		"ic-as/trending/InlineTagList",
		"ic-as/util/EventedArray",
		"ic-core/config/properties",
		"ic-core/util/EventMixin"
	], function (array, declare, lang, aspect, domConstruct, JSON, query, events, InlineTagList, EventedArray, properties, EventMixin) {
	
		
		var ActivityStreamSearchHashtag = declare(EventMixin, {
		
			inlineListDijit: null,
			init: false,
			selectedTags: null,
			dateReqString: null,
			calledUpdateState: false,
		
			/**
			 * Called when the view loads on the page.
			 */
			onLoad: function() {
				this.selectedTags = new EventedArray();
				this.selectedTags.replaceWith([]);
		
				this.own(aspect.after(this.selectedTags, "add", lang.hitch(this, "addTagStream"), true));
				this.own(aspect.after(this.selectedTags, "remove", lang.hitch(this, "removeTagStream"), true));
		
				var streamNode = query("div.lotusStreamTopLoading")[0];
				this.inlineListDijit = this.inlineListDijit || new InlineTagList({
						"selectedTags": this.selectedTags,
						"inlineTagClass": "com.ibm.social.as.util.hashtag.search.InlineSelectedHashtag"
					},
					domConstruct.create("div", {}, streamNode, "before"));
		
				this.subscribe(events.UPDATESTATE,
					lang.hitch(this, "onStateUpdate"));
		
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
				if(array.indexOf(tarArr, tag) >= 0){
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
				topic.publish(events.CLOSEEE);
				topic.publish(events.PARAMCHANGE, paramsObj, scrollTop);
			},
			
			/**
			 * If more than 0 entries in selectedArray set a filter lock on the stream
			 * mainly to block any fake status updates on the stream.
			 */
			setStreamFilteredEvent: function(){
				if(this.selectedTags.getArray().length > 0){
					topic.publish(events.ASSTREAMFILTERED, true);
				} else {
					topic.publish(events.ASSTREAMFILTERED, false);
				}
			},
		
			
			publishViewChange: function(viewParam, filterParam){
				this.calledUpdateState = true;
				topic.publish(events.UPDATESTATE, {
					view: viewParam,
					filter: filterParam
				});		
			},
		
			makeFiltersString: function() {
				var filterReq = [];
				array.forEach(this.selectedTags.getArray(), function(tag) {
					filterReq.push({
						'type': 'tag',
						'values': [tag]
					});
				});
				return JSON.stringify(filterReq);
			}
		});
		
		ActivityStreamSearchHashtag._Instance = null;

		ActivityStreamSearchHashtag.getInstance = function(){
			if(ActivityStreamSearchHashtag._Instance == null){
				ActivityStreamSearchHashtag._Instance = new ActivityStreamSearchHashtag();
		  	}
		  	return ActivityStreamSearchHashtag._Instance;
		}
		
		return ActivityStreamSearchHashtag;
	});
