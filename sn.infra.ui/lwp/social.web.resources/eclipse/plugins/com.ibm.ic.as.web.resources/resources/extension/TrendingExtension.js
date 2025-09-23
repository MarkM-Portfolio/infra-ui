/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/lang",
		"dojo/_base/declare",
		"dojo/dom",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/aspect",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/json",
		"dojo/query",
		"dojo/date",
		"ic-as/constants/events",
		"ic-as/controller/UrlGenerator",
		"ic-as/extension/interfaces/IExtension",
		"ic-as/trending/InlineTagList",
		"ic-as/trending/TagList",
		"ic-as/util/EventedArray",
		"ic-core/config/properties",
		"ic-core/util/EventMixin"
	], function (dojo, lang, declare, dom, i18nactivitystream, aspect, domConstruct, array, JSON, query, date, events, UrlGenerator, IExtension, InlineTagList, TagList, EventedArray, properties, EventMixin) {
	
		var TrendingExtension = declare("com.ibm.social.as.extension.TrendingExtension", 
		[IExtension, EventMixin],
		{
			
			tagListDijit: null,
			inlineListDijit: null,
			
			availableTags: null,
			selectedTags: null,
			
			facetReqString: "[{'hot_topics':8}]",
			dateReqString: null,
			
			calledUpdateState: false,
			removingTags: false,
			
			disconnectionFuncName: "onUnload",
			
			discoverAllFacetReqUrl: null,
			
			constructor: function(){
				this.availableTags = new EventedArray();
				this.selectedTags = new EventedArray();
			},
			
			/**
			 * Called when the view loads on the page.
			 */
			onLoad: function(){
				
				if(!dom.byId("lotusColLeft") || (properties["com.ibm.social.as.useTrends"]!=="true" || (lconn && lconn.homepage && lconn.homepage.userIsExternal))) {
					// we are not welcome here, kill the extension.
					this.onLoad = this.onUnload = function(){};
					return;
				}
				
				if(properties["com.ibm.social.as.trendDays"]) {
					var numDays = +properties["com.ibm.social.as.trendDays"],
						dateObj = new Date();
					dateObj.setDate(dateObj.getDate()-numDays);
					this.dateReqString = "{'from':'" + date.stamp.toISOString(dateObj) + "'}";
				}
				this.selectedTags.replaceWith([]);
				this.availableTags.setUpdating();
				
				this.own(aspect.after(this.selectedTags, "add", lang.hitch(this, "updateStream"), true));
				this.own(aspect.after(this.selectedTags, "remove", lang.hitch(this, "updateStream"), true));
				
		
				this.tagListDijit = this.tagListDijit || new TagList(
						{"availableTags": this.availableTags, "selectedTags": this.selectedTags},
						domConstruct.create("div", {}, "homepageLeftNavigationMenu"));
				this.tagListDijit.show();
				
				if ( !this.inlineListDijit ) {
					var streamNode = query("ul.lotusStream")[0];
					this.inlineListDijit = new InlineTagList(
							{"selectedTags": this.selectedTags},
							domConstruct.create("div", {}, streamNode, "before"));
					 
				}
				
				var urlGen = new UrlGenerator({"defaultUrlTemplateValues":activityStreamConfig.defaultUrlTemplateValues});
				urlGen.attachUrlPart(activityStreamConfig.filters.options.myStream.filters.options.discover);
				urlGen.attachUrlPart({params:{"facetRequests":this.facetReqString, "count":"1"}});
				if(this.dateReqString) {
					urlGen.attachUrlPart({params:{"dateFilter":this.dateReqString}});
				}
				
				this.discoverAllFacetReqUrl = urlGen.getCurrentUrl();
				
				this.fetchTagList();
				
				this.subscribe(events.POPULATE,
						lang.hitch(this, "updateIfTrendsIncluded"));
				
				this.subscribe(events.UPDATESTATE,
						lang.hitch(this, "onStateUpdate"));
			},
			
			onStateUpdate: function(){
				if(this.calledUpdateState) {
					this.calledUpdateState = false;
					return;
				}
				this.removingTags = true;
				this.selectedTags.replaceWith([]);
				this.fetchTagList(); // update just in case (without distracting loading text)
				this.removingTags = false;
			},
			
			updateIfTrendsIncluded: function(resp, ignore1, ignore2, ignore3, ignore4, url) {
				if((typeof url === "undefined") || url.indexOf("facetRequests")===-1){
					// do nothing
				} else {
					this.updateTagList(resp);
				}
			},
			
			fetchTagList: function(){
				activityStreamAbstractHelper.xhrGet(
						{
							url:this.discoverAllFacetReqUrl,
							handleAs:"json",
							load: lang.hitch(this, "updateTagList")
						});
			},
			
			updateTagList: function(resp) {
				var tags = lang.getObject("connections.facets.hot_topics", false, resp) || [];
				
				tags = array.map(tags, function(tag){return tag.label;});
				// don't display already selected tags here.
				array.forEach(this.selectedTags.getArray(), function(selectedTag){
					tags.splice(array.indexOf(tags, selectedTag), 1);
				});
				this.availableTags.replaceWith(tags);
			},
			
			updateStream: function(){
				if(!this.removingTags){
					var paramsObj = {
					                   	"facetRequests":this.facetReqString,
					                   	"filters":this.makeFiltersString()
									};
					if(this.dateReqString) {
						paramsObj["dateFilter"] = this.dateReqString;
					}
			
					this.availableTags.setUpdating();
					if((stateHandler.currentStateObj.view !== "discover" || stateHandler.currentStateObj.filter !== "all")) {
						this.calledUpdateState = true;
						topic.publish(events.UPDATESTATE, {view:"discover"});
					}
					// so this is kind of weird, but pushing a new change immediately actually cancels the previous
					// xhr for the discover view. I still don't feel good about cancelling xhrs though so
					// TODO: refactor. add some kind of UPDATESTATEANDUSECUSTOMPARAMS event. maybe choose a better name...
					topic.publish(events.PARAMCHANGE, paramsObj);
				}
			},
			
			makeFiltersString: function(){
				var filterReq = [];
				array.forEach(this.selectedTags.getArray(), function(tag){
					filterReq.push({'type':'hot_topic', 'values':[tag]});
				});
				return JSON.stringify(filterReq);
			},
			
			/**
			 * Called when the view is moved away from.
			 */
			onUnload: function(){
				if(this.tagListDijit) {
					this.tagListDijit.hide();
				}
			}
		});
		return TrendingExtension;
	});
