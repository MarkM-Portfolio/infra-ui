/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/i18n!./nls/Sorting",
	"dojo/i18n!./nls/resultsView",
	"dojo/query",
	"dijit/_Widget",
	"dijit/registry",
	"ic-ui/layout/people",
	"ic-core/HelpLauncher",
	"ic-core/config/features",
	//"ic-ee/data/RecommendationsDataStore",
	"./Paging",
	"./Popup",
	"./Sorting",
	"./utils/DateFormater",
	"./rbl/RestrictedCommunityDialog",
	"ic-ui/MessageBox",
	"ic-ui/Like"
], function (declare, lang, domAttr, domClass, domConstruct, i18nSorting, i18nresultsView, query, _Widget, registry, people, HelpLauncher, has, /*RecommendationsDataStore,*/ Paging, Popup, Sorting, DateFormater, RestrictedCommunityDialog, MessageBox, Like) {

	//XXX hack to fix EE AMD widgets - to remove once LC #160663 is solved
	var RecommendationsDataStore = lang.getObject("com.ibm.social.ee.data.RecommendationsDataStore");
	//XXX end hack
	var resultsView = declare(
		"lconn.search.resultsView",
		_Widget,
	{
		clearSort:							function(){},	// Function callback to clear the sorting.
		currentComponentFilterFull:			null,			//String. Value of lconn.search.searchAPI.getComponentFilterFull()
		currentSortKey:						null,			// String. Value of lconn.search.searchAPI.getSortKey().
		currentSortOrder:					null,			// String. Value of lconn.search.searchAPI.getSortOrder().
		currentPage:						1,				// Integer. Value of lconn.search.searchAPI.getPage().
		dataStore:							null,			// Instance of lconn.search.searchData.
		onTransformError:					function(){},	// Callback function to perform when xslt transformation fails
		performPagination:					function(){},	// Function callback to perform pagination.
		showHeading:						false,			// Boolean. Value of lconn.search.searchResults.showHeader.
		sortBy:								function(){},	// Function callback to sort the search results
		_strings:							i18nresultsView,
		_rblDialog:							null,
		
		postCreate: function(){	
			if (this.dataStore){
				var results = this.dataStore.resultsTransform(this.id);
				if (results) {
					domAttr.set(this.domNode, "innerHTML", results);
					domClass.add(this.domNode, "lconnSearchResults");
					
					var that = this;
					query(".icConnectOnChildFocus", this.domNode).forEach(function(elem, pos) {
						that.connect(document.body || document.documentElement, "onfocusin", function() {
							setTimeout(function() {
								if(elem.contains(document.activeElement)) {
									domClass.add(elem, "icSearchResultSelected");
								} else {
									domClass.remove(elem, "icSearchResultSelected");
								}
							}, 1);
						});
					});
					
					if(lang.getObject("ibmConfig.serviceName") == "search"
						&& has("communities-list-restricted")) {
						
						query(".icRbLAction", this.domNode).forEach(function(elem, pos) {
							that._registerRbLDialogs(elem);
						});
					}
					
					if (this.showHeading === false){
						var heading = query("div.lotusHeader.lconnSearchResultsHeading", this.domNode);
						heading.style("display", "none");
					}
					
					// Setting the containerNode ensures destroyRecursive destroys the children
					this.containerNode = this.domNode;
		
					this._highlightQueryTerms();
					this._formatLocations();
					this._createBusinessCards();
					this._createHelpLaunchers();
					this._createLikeControls();
					this._createPagingControl();
					this._createSortingControl();
					this._formatStatusUpdatePhotos();
					this._formatDates();
					this.focus();
				} else {
					this.onTransformError(this.domNode, this._strings.UNEXPECTED_ERROR);
				}
			} else {
				this.onTransformError(this.domNode, this._strings.UNEXPECTED_ERROR);
			}
		},
		
		focus: function() {
			if (this.domNode){
				var firstResult = query("tr.lotusFirst h4 a", this.domNode);
				if (firstResult[0]){
					firstResult[0].focus();
				} else {
					var firstStatusUpdate = query("tr.lotusFirst .lconnStatusUpdateTitle a", this.domNode);
					if (firstStatusUpdate[0]){
						firstStatusUpdate[0].focus();
					}
				}
			}
		},
		
		_registerRbLDialogs: function(result) {
			if(!this._rblDialog) {
				this._rblDialog = new RestrictedCommunityDialog();
				this._rblDialog.startup();
				this.connect(this._rblDialog, "onSuccess", lang.hitch(this, function() {
					var message = this._strings.REQUEST_TO_JOIN_SUCCESS;
					this._showRbLMessageBox(message);
				}));
				this.connect(this._rblDialog, "onError", lang.hitch(this, function() {
					var message = this._strings.REQUEST_TO_JOIN_ERROR;
					this._showRbLMessageBox(message, true);
				}));
			}
			
			var rblAttr = query(".rbl", result)[0];
			if(rblAttr) {
				result.removeChild(rblAttr);
				var uuid = query(".uuid", rblAttr)[0];
				var name = query(".name", rblAttr)[0];
				var desc = query(".desc", rblAttr)[0];
				uuid.innerHTML = this._highlightReplace(uuid.innerHTML);
				name.innerHTML = this._highlightReplace(name.innerHTML);
				desc.innerHTML = this._highlightReplace(desc.innerHTML);
				uuid = uuid ? (uuid.textContent || uuid.innerText) : "" ;
				name = name ? (name.textContent || name.innerText) : "" ;
				desc = desc ? (desc.textContent || desc.innerText) : "" ;
				result.href = "javascript:;";
				this.connect(result, "onclick", lang.hitch(this._rblDialog, this._rblDialog.showJoinForm, uuid, name, desc));
			}
		},
	
		_showRbLMessageBox: function(message, isFailure) {
			var container = query(".icSearchRbLMessageBox")[0];
			if(!container) {
				container = domConstruct.create("div", {"class": "icSearchRbLMessageBox lotusHidden", "style": "margin-top: 12px"}, query(".lconnSearchDidYouMean")[0], "after");
			}
			
			var type = isFailure ? MessageBox.TYPE.ERROR : MessageBox.SUCCESS;
			var icon_alt = isFailure ? this._strings.ERROR : this._strings.CONFIRMATION;
			
			var messageContainer = domConstruct.create("div", {}, container, "only");
			var messageBox = new MessageBox({
				canClose: true,
				_strings: {
					icon_alt: icon_alt,
					a11y_label: icon_alt,
					close_btn_title: this._strings.CLOSE,
					close_btn_alt: this._strings.CLOSE
				},
				type: type,
				msg: message
			}, messageContainer);
			
			domClass.remove(container, "lotusHidden");
		},
	
		_createBusinessCards: function(){
			if (typeof(SemTagSvc) !== "undefined") {
				try {
					SemTagSvc.parseDom(null, this.domNode);
				} catch (e) {
				}
			}
		},
	
		_createHelpLaunchers: function(){
			var strings = this.dataStore._Trans;
			var helpButtons = query(".lconnSearchBookmarkHelpButton", this.domNode);
	
			helpButtons.forEach(function(node){
				var textNode = query(".lconnSearchBookmarkHelpText",node.parentNode);
				if (textNode && textNode.length>0){
					HelpLauncher.createHelpLink(node, strings.TAGS_ARE_FROM, textNode[0], {	
						HELP:	strings.BOOKMARK_HELP,
						CLOSE:	strings.CLOSE_BOOKMARK_HELP
					});
				}
			});
		},
	
		_createLikeControls: function(){
			var likesContainers = query(".searchLikesControlContainer", this.domNode);
			likesContainers.forEach(function(node, index, nodeList){
				var inline = new Like({
					disablePopup: true,
					disableBackground: true,
					dataStore: new RecommendationsDataStore({
						authUser:		{}, 
						recommendCount: node.getAttribute('rank'), 
						countOnly:		true
					})
				});
				domConstruct.place(inline.domNode, node, 'replace');
			});
		},
	
		_createPagingControl: function(){
			var pagingContainer = query(".pagingContainer", this.domNode);
			if (pagingContainer && pagingContainer.length>0){
				var pagingId = this.id+"_CenterPaging";
				var prevSpan;
				var nextSpan;
				var nextPrevSpan = query("span", pagingContainer[0]);
				if(nextPrevSpan && nextPrevSpan.length>1) {
					prevSpan = nextPrevSpan[0];
					nextSpan = nextPrevSpan[1];
					prevSpan.parentNode.removeChild(prevSpan);
					nextSpan.parentNode.removeChild(nextSpan);
				}
				
				var oldPaging = registry.byId(pagingId);
				if (oldPaging){
					oldPaging.destroyRecursive();
				}
				
				var paging = new Paging({
					currentPage:		this.currentPage,
					maxPage:			pagingContainer[0].getAttribute('maximum'),
					performPagination:	lang.hitch(this, "performPagination"),
					id:					pagingId,
					_nextNode:			nextSpan,
					_prevNode:			prevSpan
				});
				domConstruct.place(paging.domNode, pagingContainer[0], 'replace');
			}
		},
	
		_createSortingControl: function(){
			var container = query(".lotusSort", this.domNode);
			if (container && container.length>0){
	
				var strings = i18nSorting;
	
				var sortOptions = [];
				sortOptions.push({key:"relevance", label: strings.SORT_RELEVANCE});
				sortOptions.push({key:"date", label: strings.SORT_DATE});
	
				if (this.dataStore.getFilter() === "activities"){
					sortOptions[1].label = strings.SORT_LAST_UPDATED;
					sortOptions.push({key:"due_date", label: strings.SORT_DUE_DATE});
				} else if (this.dataStore.getFilter() === "blogs"){
					sortOptions.push({key:"number_comments", label: strings.SORT_COMMENTS});
	
					if(this.currentComponentFilterFull.indexOf("blogs:ideationblogs:ideationblog")=== -1){
						if(this.currentComponentFilterFull.indexOf("blogs:ideationblogs:idea")!== -1){
							sortOptions.push({key:"rating", label: strings.SORT_VOTES});
						}else if(this.currentComponentFilterFull.indexOf("blogs:entry")!== -1){
							sortOptions.push({key:"rating", label: strings.SORT_LIKES});
						}
					}
					
				} else if (this.dataStore.getFilter() === "dogear"){
					sortOptions.push({key:"popularity", label: strings.SORT_POPULARITY});
				} else if (this.dataStore.getFilter() === "profiles"){
					sortOptions.push({key:"first_name", label: strings.SORT_FIRSTNAME});
					sortOptions.push({key:"last_name", label: strings.SORT_LASTNAME});
				} else if (this.dataStore.getFilter() === "forums"){
					sortOptions.push({key:"FIELD_RECOMMENDATIONS_COUNT", label: strings.SORT_LIKES});
					sortOptions.push({key:"number_comments", label: strings.SORT_COMMENTS});
				}
	
				var sortingId = this.id + "_Sorting";
				
				var oldSorting = registry.byId(sortingId);
				if (oldSorting){
					oldSorting.destroyRecursive();
				}
				
				var sorting = new Sorting({
					clearSort:			lang.hitch(this,"clearSort"),
					currentSortKey:		this.currentSortKey,
					currentSortOrder:	this.currentSortOrder,
					id:					sortingId,
					sortOptions:		sortOptions,
					sortBy:				lang.hitch(this,"sortBy")
				});
				domConstruct.place(sorting.domNode, container[0], 'replace');
			}
		},
	
		_formatDates: function() {
			var dateFormatter = new DateFormater();
			var dateElement = query(".searchDateClass", this.domNode);
			for(var i=0; i<dateElement.length; i++) {
				dateElement[i].innerHTML=dateFormatter.formatDateTime(dateElement[i].innerHTML);
			}
	
		},
	
		_formatLocations: function(){
			var locations = query(".profilesLocationContainer",this.domNode);
			for(var i=0;i<locations.length;i++) {
				locations[i].innerHTML = this._linebreakReplace(locations[i].innerHTML);
			}
		},
	
		_formatStatusUpdatePhotos: function(){
			var photoContainers = query(".lconnStatusUpdatePhotoContainer",this.domNode);
			for(var i=0;i<photoContainers.length;i++) {
				var span = query("span.x-lconn-userid", photoContainers[i]);
				if (span.length===1){
					var userid = domAttr.get(span[0], "innerHTML");
					var src = people.getImageUrl({userid: userid}, 55);
	
					var img = domConstruct.create("img", {
						alt:		"",
						src:		src,
						width:		55,
						height:		55
					});
					domConstruct.place(img, photoContainers[i], "only");
				}
			}
		},
	
		_highlightQueryTerms: function(){
			var i;
			
			// FIXME: temporary fix to work around change in behavior of dojo.query() with compound selectors
			var summaries = query(".lconnSearchHighlight",this.domNode);
			for(i=0;i<summaries.length;i++) {
				summaries[i].innerHTML = this._highlightReplace(summaries[i].innerHTML);
			}
	
			var titles = query("h4 a",this.domNode);
			for(i=0;i<titles.length;i++) {
				titles[i].innerHTML = this._highlightReplace(titles[i].innerHTML);
			}
		},
	
		_highlightReplace: function(html) {
			var result = html.replace(new RegExp("&lt;b&gt;","g"),"<b class=\"bidiAware\">");
			result = result.replace(new RegExp("&lt;/b&gt;","g"),"</b>");
			return result;
		},
	
		_linebreakReplace: function(html) {
			var result = html.replace(new RegExp("&lt;br/&gt;","g"),"<br/>");
			return result;
		}
	
	});
	
	return resultsView;
});