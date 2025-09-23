/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.extension.TrendingExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.trending.TagList");
dojo.require("com.ibm.social.as.trending.InlineTagList");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.util.EventedArray");
dojo.require("lconn.core.util.EventMixin");
dojo.require("lconn.core.config.properties");


dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.extension.TrendingExtension", 
[com.ibm.social.as.extension.interfaces.IExtension, lconn.core.util.EventMixin],
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
		this.availableTags = new com.ibm.social.as.util.EventedArray();
		this.selectedTags = new com.ibm.social.as.util.EventedArray();
	},
	
	/**
	 * Called when the view loads on the page.
	 */
	onLoad: function(){
		
		if(!dojo.byId("lotusColLeft") || (lconn.core.config.properties["com.ibm.social.as.useTrends"]!=="true" || (lconn && lconn.homepage && lconn.homepage.userIsExternal))) {
			// we are not welcome here, kill the extension.
			this.onLoad = this.onUnload = function(){};
			return;
		}
		
		if(lconn.core.config.properties["com.ibm.social.as.trendDays"]) {
			var numDays = +lconn.core.config.properties["com.ibm.social.as.trendDays"],
				dateObj = new Date();
			dateObj.setDate(dateObj.getDate()-numDays);
			this.dateReqString = "{'from':'" + dojo.date.stamp.toISOString(dateObj) + "'}";
		}
		this.selectedTags.replaceWith([]);
		this.availableTags.setUpdating();
		
		this.connect(this.selectedTags, "add", this, "updateStream");
		this.connect(this.selectedTags, "remove", this, "updateStream");
		

		this.tagListDijit = this.tagListDijit || new com.ibm.social.as.trending.TagList(
				{"availableTags": this.availableTags, "selectedTags": this.selectedTags},
				dojo.create("div", {}, "homepageLeftNavigationMenuContainer"));
		this.tagListDijit.show();
		
		if ( !this.inlineListDijit ) {
			var streamNode = dojo.query("ul.lotusStream")[0];
			this.inlineListDijit = new com.ibm.social.as.trending.InlineTagList(
					{"selectedTags": this.selectedTags},
					dojo.create("div", {}, streamNode, "before"));
			 
		}
		
		var urlGen = new com.ibm.social.as.controller.UrlGenerator({"defaultUrlTemplateValues":activityStreamConfig.defaultUrlTemplateValues});
		urlGen.attachUrlPart(activityStreamConfig.filters.options.myStream.filters.options.discover);
		urlGen.attachUrlPart({params:{"facetRequests":this.facetReqString, "count":"1"}});
		if(this.dateReqString) {
			urlGen.attachUrlPart({params:{"dateFilter":this.dateReqString}});
		}
		
		this.discoverAllFacetReqUrl = urlGen.getCurrentUrl();
		
		this.fetchTagList();
		
		this.subscribe(com.ibm.social.as.constants.events.POPULATE,
				dojo.hitch(this, "updateIfTrendsIncluded"));
		
		this.subscribe(com.ibm.social.as.constants.events.UPDATESTATE,
				dojo.hitch(this, "onStateUpdate"));
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
					load: dojo.hitch(this, "updateTagList")
				});
	},
	
	updateTagList: function(resp) {
		var tags = dojo.getObject("connections.facets.hot_topics", false, resp) || [];
		
		tags = dojo.map(tags, function(tag){return tag.label;});
		// don't display already selected tags here.
		dojo.forEach(this.selectedTags.getArray(), function(selectedTag){
			tags.splice(dojo.indexOf(tags, selectedTag), 1);
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
				dojo.publish(com.ibm.social.as.constants.events.UPDATESTATE, [{view:"discover"}]);
			}
			// so this is kind of weird, but pushing a new change immediately actually cancels the previous
			// xhr for the discover view. I still don't feel good about cancelling xhrs though so
			// TODO: refactor. add some kind of UPDATESTATEANDUSECUSTOMPARAMS event. maybe choose a better name...
			dojo.publish(com.ibm.social.as.constants.events.PARAMCHANGE, [paramsObj]);
		}
	},
	
	makeFiltersString: function(){
		var filterReq = [];
		dojo.forEach(this.selectedTags.getArray(), function(tag){
			filterReq.push({'type':'hot_topic', 'values':[tag]});
		});
		return dojo.toJson(filterReq);
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
