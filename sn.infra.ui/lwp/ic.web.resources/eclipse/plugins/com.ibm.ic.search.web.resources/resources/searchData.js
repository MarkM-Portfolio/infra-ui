/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/i18n!./nls/searchData",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/request/xhr",
	"dojo/text!./xslt/searchAll.xsl",
	"dojo/text!./xslt/searchProfiles.xsl",
	"dojo/_base/config",
	"dojox/xml/parser",
	"ic-core/ajax/auth",
	"ic-core/url",
	"ic-core/xpath",
	"ic-core/xslt",
	"ic-core/config/features",
	"ic-core/config/services",
	"./Constants"
], function (array, i18nsearchData, declare, lang, xhr, templateSearchAll, templateSearchProfiles, config, parser, auth, urlModule, xpath, xsltModule, has, services, Constants) {

	var searchData = declare(
		"lconn.search.searchData",
		null,
	{
		
		TIMEOUT:		120000,
		
		_blankGif:		(config.blankGif || require.toUrl("dojo/resources/blank.gif")),
		_dataCache:		null,
		_errorMessage:	null,
		_filter:		"none",
		_hasError:		false,
		_Trans:			i18nsearchData,
		_xslCache:		{
							"searchAll.xsl":		{ templateString: templateSearchAll },
							"searchProfiles.xsl":	{ templateString: templateSearchProfiles }
						},
		_xslTemplate:	null,
		
		usePersonalization: false,	// if true will show personalization UI options
		
		constructor: function(/*Object*/args){
			lang.mixin(this, args);
			this.setFilter(this._filter);
			
			//global function to be used by entries
			window.__isContainedInChildAnchor = function(parent, target) {
				var anchors = parent.getElementsByTagName("a");
				var contained = false;
				for(var i=0; i < anchors.length && !contained; i++) {
					contained = anchors[i].contains(target);
				}
				return contained;
			}
		},
		
		performQuery: function(/*boolean*/isPublic, /*String*/url, /*function*/callback, /*Object?*/mixin, /*boolean*/isCallbackManagingError) {
			// summary: Fetch new data
			
			var bindArgs = {
				error: isCallbackManagingError ? lang.hitch(this,"_onErrorWithCallback", callback) : lang.hitch(this,"_onError"),
				load: lang.hitch(this,"_cacheData"),
				handle: callback,
				handleAs: "text",
				sync: false,
				timeout: this.TIMEOUT,
				method: "GET",
				url: urlModule.rewrite(url, {format: "light"})
			};
			
			if (mixin){
				lang.mixin(bindArgs, mixin);
			}
			
			if(!isPublic && (typeof auth.prepareSecure==="function")) {
				bindArgs = auth.prepareSecure(bindArgs,lang.hitch(this,"_isLogin"));
			}
			
			xhr(bindArgs.url, bindArgs).response.then(
					function(response){
						var res = lang.mixin({}, response);
						res.args = lang.mixin(res.args, response.options);
						bindArgs.load(response.data || response.text, res);
						bindArgs.handle(response.data || response.text, res);
					},
					function(response) {
						var res = lang.mixin(response, response.response);
						res.args = lang.mixin(res.args, res.options);
						bindArgs.error(res);
					});
		},
		
		_isLogin: function(/*Object*/response, /*Object*/ioArgs) {
			var login = true;
			if (response) {
				if (response.name === "Error" || response.status === 500 || response.status === 503 || response.status === 404){
					this._onError(response, ioArgs);
					login = false;
				} else if (response.substring(0, 5) === "<?xml") {
					login = false;
				}
			}
			return login;
		},
		
		_cacheData: function(/*String*/data,/*Object*/evt) {
			// summary: Add data to cache
			
			this._hasError=false;
			if(data.substring(0,5)==="<?xml") {
				this._dataCache=data;
			} else {
				this._dataCache='<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom />"';
				this._errorMessage=this._Trans.NO_CONTACT;
				this._hasError=true;
			}
		},
		
		_onError: function(/*Object*/data) {
			this._onErrorWithCallback(null, data);
		},
		
		_onErrorWithCallback: function(/*function*/callback, /*Object*/data) {
			// summary: Parse data for error status and, if applicable, error message.  
			
			this._hasError=true;
			
			if ((data.status === 500 || data.status === 503) && data.xhr && data.xhr.responseText && data.xhr.responseText.substring(0,5)==="<?xml" && data.xhr.responseText.indexOf("<message>")>5){
				var response = data.xhr.responseText;
				var messageStart = response.indexOf("<message>")+9;
				var messageEnd = response.indexOf("</message>");
				this._errorMessage=response.substring(messageStart,messageEnd);
			} else if(data.status===404) {
				this._errorMessage=this._Trans.NO_CONTACT;
			} else if(data.status===500) {
				this._errorMessage=this._Trans.SERVER_ERROR;
			} else if(data.status===403) {
				this._errorMessage=this._Trans.NO_CONTACT;
			} else {
				this._errorMessage=this._Trans.NO_CONTACT;
			}
			
			if(callback) {
				callback(data, data);
			}
		},
		
		getError: function() {
			if (this._hasError){
				return this._errorMessage;
			} else {
				return null;
			}
		},
		
		resultsTransform: function(/*String*/domNodeId, /*String?*/data,/*String?*/template) {
			// summary: Transform the cached data using the template
			// returns: DOM fragment for the results
			
			var xml;
			var xslt;
			var result;
	
			if(data) {
				xml = parser.parse(data);
			} else {
				xml = parser.parse(this._dataCache);
			}
	
			if(template) {
				xslt=template;
			} else {
				xslt=this._xslTemplate;
			}
			
			var newStyleEnabled = lang.getObject("ibmConfig.serviceName") == "search" && has("search-global-search-restyle");
			var isRbLEnabled = lang.getObject("ibmConfig.serviceName") == "search" && has("communities-list-restricted");
			var isResultLimitEnabled = lang.getObject("ibmConfig.serviceName") == "search" && has("search-pagination-limit-ui");
			
			if(xml && xslt) {
				if(this._filter === "profiles") {
					result=xsltModule.transform(xml, xslt, null, [
											['domNodeId', domNodeId],['MsgHeading', this._getMsgHeading()],
											['blankIcon',this._blankGif.toString()],['inactive',this._Trans.INACTIVE],["MsgShow",this._Trans.SHOW],
											["PagingTop",this._Trans.PAGING_TOP],["PagingBottom",this._Trans.PAGING_BOTTOM],
											["MsgPrevious",this._Trans.PREVIOUS],["MsgNext",this._Trans.NEXT],
											["MsgResults",this._Trans.RESULTS],["MsgPage",this._Trans.PAGE],
											["Profiles",this._Trans.PROFILES],["Tags",this._Trans.TAGS],
											["NoResultsMessage",this._Trans.NORESULTSMESSAGE],
											['Bookmarkers',this._Trans.BOOKMARKERS],['TagsMore',this._Trans.TAGSMORE],
											['fromACommunity',this._Trans.COMMUNITY_ALONE],
											['Profile',this._Trans.PROFILE],['Phone',this._Trans.PHONE],
											['Email',this._Trans.EMAIL],['LastUpdated',this._Trans.LASTUPDATED],
											['MsgItems',this._Trans.ITEMS],['NoDescription',this._Trans.NODESCRIPTION],
											['fromXCommunities',this._Trans.FROMXCOMMUNITIES],
											['tagsAreFrom',this._Trans.TAGS_ARE_FROM],['bookmarksTitle',this._Trans.BOOKMARKS_TITLE],
											['communitiesTitle',this._Trans.COMMUNITIES_TITLE],['activitiesTitle',this._Trans.ACTIVITIES_TITLE],
											['help',this._Trans.HELP],['TmpIndexingDifficulties',this._Trans.TEMPDIFFICULTIES], 
											['ResultNotFound',this._Trans.RESULTNOTFOUND],
											['MulTmpIndexingDifficulties',this._Trans.MULTIPLETEMPDIFFICULTIES],
											['newStyle', newStyleEnabled],
											['communitiesURL', urlModule.getServiceUrl(services.communities).toString()],
											['isResultLimitEnabled', isResultLimitEnabled],
											['resultLimitMessage', this._Trans.LAST_PAGE_MESSAGE],
											['resultLimitSubMessage', this._Trans.LAST_PAGE_SUBMESSAGE]
										], true); 
				} else {
				
					var msgHeading = this._Trans.SEARCH_RESULTS;
					var msgLatestStatusUpdate = this._Trans.LATEST_STATUS_UPDATE;
					if (this._filter === "activities"){
						msgHeading = this._Trans.ACTIVITIES_SEARCH_RESULTS;
					} else if (this._filter === "blogs"){
						msgHeading = this._Trans.BLOGS_SEARCH_RESULTS;
					} else if (this._filter === "communities"){
						msgHeading = this._Trans.COMMUNITIES_SEARCH_RESULTS;
						msgLatestStatusUpdate = this._Trans.LATEST_COMMUNITY_STATUS_UPDATE;
					} else if (this._filter === "dogear"){
						msgHeading = this._Trans.BOOKMARKS_SEARCH_RESULTS;
					} else if (this._filter === "files" || this._filter === "all_files" || this._filter === "ecm_files"){
						msgHeading = this._Trans.FILES_SEARCH_RESULTS;
					} else if (this._filter === "forums"){
						msgHeading = this._Trans.FORUMS_SEARCH_RESULTS;
					} else if (this._filter === "status_updates"){
						msgHeading = this._Trans.STATUS_UPDATES_SEARCH_RESULTS;
						msgLatestStatusUpdate = this._Trans.LATEST_STATUS_UPDATE;
					} else if (this._filter === "wikis"){
						msgHeading = this._Trans.WIKIS_SEARCH_RESULTS;
					} 
				
					result=xsltModule.transform(
							xml, xslt, null, [
											['domNodeId', domNodeId],['MsgHeading', msgHeading],['ViewAll',this._Trans.VIEW_ALL],
											['MsgLatestStatusUpdate', msgLatestStatusUpdate],['blankIcon',this._blankGif.toString()],
											['inactive',this._Trans.INACTIVE],['NoDescription',this._Trans.NODESCRIPTION],
											["PagingTop",this._Trans.PAGING_TOP],["PagingBottom",this._Trans.PAGING_BOTTOM],
											["MsgShow",this._Trans.SHOW],["MsgPrevious",this._Trans.PREVIOUS],["MsgNext",this._Trans.NEXT],
											["MsgResults",this._Trans.RESULTS],["MsgPage",this._Trans.PAGE],
											["Activities",this._Trans.ACTIVITIES],["Blogs",this._Trans.BLOGS],
											["Communities",this._Trans.COMMUNITIES],["Bookmarks",this._Trans.BOOKMARKS],
											["Files",this._Trans.FILES],["Forums",this._Trans.FORUMS],
											["Profiles",this._Trans.PROFILES],["Wiki",this._Trans.WIKI],["Feeds",this._Trans.FEEDS],
											["private",this._Trans.PRIVATE],["communityActivity",this._Trans.COMMUNITY_ACTIVITY],
											["communityBlog",this._Trans.COMMUNITY_BLOG],["communityFile",this._Trans.COMMUNITY_FILE],
											["communityWiki",this._Trans.COMMUNITY_WIKI],["communityFeed",this._Trans.COMMUNITY_FEED],
											["Tags",this._Trans.TAGS],["NoResultsMessage",this._Trans.NORESULTSMESSAGE],["People",this._Trans.PEOPLE],
											["OnePerson",this._Trans.ONEPERSON],
											['communityBookmark',this._Trans.COMMUNITY_BOOKMARK],['ratingAlt',this._Trans.RATING],
											['commentOn',this._Trans.COMMENT_ON],["communityForum",this._Trans.COMMUNITY_FORUM],
											['Bookmarkers',this._Trans.BOOKMARKERS],['Comments',this._Trans.COMMENTS],
											['TagsMore',this._Trans.TAGSMORE],
											['fromAnActivity',this._Trans.ACTIVITY_ALONE],['fromABlog',this._Trans.BLOG_ALONE],
											['fromAForum',this._Trans.FORUM_ALONE],['fromAWiki',this._Trans.WIKI_ALONE],
											['fromACommunity',this._Trans.COMMUNITY_ALONE],
											['Activity',this._Trans.ACTIVITY], ['ActivityBookmark',this._Trans.BOOKMARK],
											['ActivityComment',this._Trans.COMMENT], 
											['ActivityEntry',this._Trans.ENTRY],['ActivitySection',this._Trans.SECTION],
											['ActivityTodo',this._Trans.TODO],['ActivityFile',this._Trans.ATTACHMENT],['Blog',this._Trans.BLOG],
											['BlogEntry',this._Trans.ENTRY],['Bookmark',this._Trans.BOOKMARK],
											['Comment',this._Trans.COMMENT],['Community',this._Trans.COMMUNITY], 
											['Entry',this._Trans.ENTRY_ALONE],['Feed',this._Trans.FEED],
											['File',this._Trans.FILE],['Forum',this._Trans.FORUM],
											['ForumCategory',this._Trans.CATEGORY],['LastUpdated',this._Trans.LASTUPDATED],
											['ForumTopic',this._Trans.TOPIC],['ForumTopicWithAttachment',this._Trans.TOPIC_WITH_ATTACHMENT],
											['ForumAttachment',this._Trans.ATTACHMENT],['Profile',this._Trans.PROFILE],
											['WikiType',this._Trans.WIKITYPE],['WikiPage',this._Trans.PAGE],
											['MsgItems',this._Trans.ITEMS],['WikiFile',this._Trans.ATTACHMENT],
											['fromXCommunities',this._Trans.FROMXCOMMUNITIES],['OneComment',this._Trans.ONECOMMENT],
											['tagsAreFrom',this._Trans.TAGS_ARE_FROM],['bookmarksTitle',this._Trans.BOOKMARKS_TITLE],
											['communitiesTitle',this._Trans.COMMUNITIES_TITLE],['activitiesTitle',this._Trans.ACTIVITIES_TITLE],
											['help',this._Trans.HELP],['Idea',this._Trans.IDEA],['IdeationBlog',this._Trans.IDEATIONBLOG],
											['Votes',this._Trans.VOTES],['OneVote',this._Trans.ONEVOTE],['Graduated',this._Trans.GRADUATED],
											['BlogComment',this._Trans.BLOGCOMMENT],['IdeaComment',this._Trans.IDEACOMMENT],
											['fromAnIdeationBlog',this._Trans.IDEATIONBLOG_ALONE],['CalendarEvent',this._Trans.CALENDAREVENT],
											['Events',this._Trans.EVENTS],['EventDateOn', this._Trans.EVENTDATEON],
											['EventRepeats',this._Trans.EVENTREPEATS],['EventIsAllDay', this._Trans.EVENTISALLDAY],
											['StatusUpdate',this._Trans.STATUSUPDATE], ['MoreStatusUpdates', this._Trans.MORESTATUSUPDATES],
											['DocumentTypePrefix',this._Trans.DOCUMENT_TYPE_PREFIX],
											['TmpIndexingDifficulties',this._Trans.TEMPDIFFICULTIES], 
											['ResultNotFound',this._Trans.RESULTNOTFOUND],
											['MulTmpIndexingDifficulties',this._Trans.MULTIPLETEMPDIFFICULTIES],
											['StatusUpdates',this._Trans.STATUS_UPDATES],
											['YouAreAuthor', "(" + this._Trans.YOUAREAUTHOR + ")"],
											['YouAreContributor', "(" + this._Trans.YOUARECONTRIBUTOR + ")"],
											['YouAreOwner', "(" + this._Trans.YOUAREOWNER + ")"],
											['YouAreMember', "(" + this._Trans.YOUAREMEMBER + ")"],
											['shouldShowPersonalization', this.usePersonalization],
											['newStyle', newStyleEnabled],
											['communitiesURL', urlModule.getServiceUrl(services.communities).toString()],
											['isRbLEnabled', isRbLEnabled],
											['isResultLimitEnabled', isResultLimitEnabled],
											['resultLimitMessage', this._Trans.LAST_PAGE_MESSAGE],
											['resultLimitSubMessage', this._Trans.LAST_PAGE_SUBMESSAGE]
										], true);
				}
			
			}
			return result;
		},
		
		// This function is required for SmartCloud override
		_getMsgHeading: function() {
			return this._Trans.PROFILES_SEARCH_RESULTS;
		},
		
		getQueryCategoryConstraints: function(facetId){
			return this.getQueryConstraintsAsObjects("category",facetId);
		},
		
		getQueryConstraintsAsObjects: function(constraintType,valueMatch){
			var nodePath = "openSearch:Query/ibmsc:constraint";
			var constraintsAsDomNodes = this._getFragments(nodePath);
			
			var constraints = [];
			
			array.forEach(constraintsAsDomNodes, function(constraintAsDomNode){
	
				var type = constraintAsDomNode.getAttribute("type");
				if (constraintType && (type !== constraintType)){
					return;
				}
				var id = constraintAsDomNode.getAttribute("id");
				var label = constraintAsDomNode.getAttribute("label");
				var dataType = constraintAsDomNode.getAttribute("dataType");
				
				var constraintAsText = parser.innerXML(constraintAsDomNode);
				
				//var constraintAsXml = parser.parse(constraintAsText);
				//var valuesAsDomNodes = xpath.selectNodes("ibmsc:constraintValue", constraintAsXml, Constants.Namespaces);
				
				var valuesAsDomNodes =  this._getFragments("ibmsc:constraintValue", constraintAsText);
				
				var values = [];
				
				var foundMatchingValue = false; 
				array.forEach(valuesAsDomNodes, function(valueAsDomNode){
					
					var valueId = valueAsDomNode.getAttribute("id");
					var valueLabel = valueAsDomNode.getAttribute("label");
					if (valueMatch){
						if ((valueId.indexOf(valueMatch)>-1) || (valueLabel.indexOf(valueMatch)>-1)){
							foundMatchingValue = true;
						}
					}
					
					var lowerInclusive = valueAsDomNode.getAttribute("lowerInclusive");
					var lowerExclusive = valueAsDomNode.getAttribute("lowerExclusive");
					var upperInclusive = valueAsDomNode.getAttribute("upperInclusive");
					var upperExclusive = valueAsDomNode.getAttribute("upperExclusive");
					
					var valueObject = {};
					if (valueId){ 
						valueObject.id = valueId;
					}
					if (valueLabel){
						valueObject.label = valueLabel;
					}
					if (lowerInclusive){
						valueObject.ge = lowerInclusive;
					}
					if (lowerExclusive){
						valueObject.g = lowerExclusive;
					}
					if (upperInclusive){
						valueObject.le = upperInclusive;
					}
					if (upperExclusive){
						valueObject.l = upperExclusive;
					}
					values.push(valueObject);
				}, this);
				
				if (valueMatch && !foundMatchingValue){
					return;
				}
				var constraintObject = {
					type:		type,
					values:		values
				};
				if (id){
					constraintObject.id = id;
				}
				if (label){
					constraintObject.label = label;
				}
				if (dataType){
					constraintObject.dataType = dataType;
				}
				constraints.push(constraintObject);
	
			}, this);
			
			return constraints;
		},
		
		getFilter: function(){
			return this._filter;
		},
		
		getFacetValuesFragment: function(/*String*/facetId){
			var nodePath = "ibmsc:facets/ibmsc:facet[@id=\'"+facetId+"\']/ibmsc:facetValue";
			return this._getFragments(nodePath);
		},
		
		_getFragments: function(/*String*/ nodePath, /*String*/ xmlStr){
			if(!xmlStr) {
				xmlStr = this._dataCache
			}
			
			var xml = parser.parse(xmlStr);
			if(xpath.isIE11()) {
				xml = xpath.loadDOMIE11(xmlStr);
			}
			
			if(xml && xml.firstChild && nodePath){
				var fragments = xpath.selectNodes(nodePath,xml,Constants.Namespaces);
			
				return fragments;
			}
			
			return [];
		},
		
		dateTransform: function(/*String?*/data,/*String?*/template) {
			// summary: Transform the cached data using the template
			// returns: DOM fragment for the date facet
			
			var xml;
			var xslt;
			var result;
			
			if(data) {
				xml = parser.parse(data);
			} else {
				xml = parser.parse(this._dataCache);
			}
			
			if(template) {
				xslt = template;
			} else {
				xslt = this._xslTemplate;
			}
	
			if(xml && xslt) {
				result=xsltModule.transform(
						xml, xslt, null, [
									['action','date'],
									['Jan',this._Trans.JAN],
									['Feb',this._Trans.FEB],
									['Mar',this._Trans.MAR],
									['Apr',this._Trans.APR],
									['May',this._Trans.MAY],
									['Jun',this._Trans.JUN],
									['Jul',this._Trans.JUL],
									['Aug',this._Trans.AUG],
									['Sep',this._Trans.SEP],
									['Oct',this._Trans.OCT],
									['Nov',this._Trans.NOV],
									['Dec',this._Trans.DEC],
									['noDate',this._Trans.NO_DATE],
									['twistyAlt',this._Trans.EXPAND_MONTHS_FILTER]
								], true);
			}
			return result;
		},
		
		peopleTransform: function(/*String?*/data,/*String?*/template) {
			// summary: Transform the cached data using the template
			// returns: DOM fragment for the people facet
			
			var xml;
			var xslt;
			var result;
	
			if(data) {
				xml = parser.parse(data);
			} else {
				xml = parser.parse(this._dataCache);
			}
	
			if(template) {
				xslt=template;
			} else {
				xslt=this._xslTemplate;
			}
	
			if(xml && xslt) {
				result=xsltModule.transform(xml, xslt, null,
						[['action','people'],['inactive',this._Trans.INACTIVE],['noPeople',this._Trans.NO_PEOPLE]], 
						true);
			}
	
			return result;
		},
		
		didYouMeanTransform: function(/*String?*/data,/*String?*/template) {
			// summary: Transform the cached data using the template 
			// returns: The 'Did you mean' message
			
			var xml;
			var xslt;
			var result;
			
			if(data) {
				xml = parser.parse(data);
			} else {
				xml = parser.parse(this._dataCache);
			}
			
			if(template) {
				xslt = template;
			} else {
				xslt = this._xslTemplate;
			}
	
			if(xml && xslt) {
				result = xsltModule.transform(xml,xslt, null, [['action','suggest']], true);
			}
			return result;
		},
		
		setFilter: function(/*String*/filter) {
			if(filter === "profiles") {
				this._xslTemplate = xsltModule.loadXslString(this._xslCache["searchProfiles.xsl"].templateString);
			} else {
				this._xslTemplate = xsltModule.loadXslString(this._xslCache["searchAll.xsl"].templateString);
			}
			this._filter = filter;
		}
	});
	return searchData;
});