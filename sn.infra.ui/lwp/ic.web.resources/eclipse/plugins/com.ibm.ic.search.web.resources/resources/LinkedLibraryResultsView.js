/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/dom-class",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/_base/array",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/i18n!./nls/LinkedLibraryResultsView",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/request/xhr",
	"dojo/query",
	"dojo/text!./templates/LinkedLibraryResultsView.html",
	"dojo/text!./xslt/LinkedLibrarySearch.xsl",
	"dojo/_base/config",
	"dojox/xml/parser,
	"dijit/_Widget",
	"dijit/_Templated",
	"ic-ui/layout/people",
	"ic-core/util/_XSLCache",
	"ic-core/util/html",
	"ic-core/xpath",
	"ic-core/xslt",
	"./utils/DateFormater",
	"ic-ui/controls/MessageBox"
], function (domClass, declare, windowModule, array, domAttr, domStyle, i18nLinkedLibraryResultsView, lang, domConstruct, on, xhr, query, template, template, config, parser, _Widget, _Templated, people, _XSLCache, html, xpath, xslt, DateFormater, MessageBox) {

	var LinkedLibraryResultsView = declare(
		"lconn.search.LinkedLibraryResultsView",
		[_Widget, _Templated],
	{
		
		// The following constants are prefix/suffix strings in HTML element ids
		// to guarantee the ids are unique. As such they do not require localization
		NEXT_ID_SUFFIX: 		"_Next",
		PREV_ID_SUFFIX:			"_Previous",
		PREV_NEXT_ID_PREFIX:	"Linked_Library_Paging",	
		PAGE_SIZE_ID_PREFIX:	"Linked_Library_PageSize",
		
		TIMEOUT:				12000,
	
		ecmSearchUrl:			null,	// The URL to use for the ecm search request
		templateString: template,
		_blankGif:				(config.blankGif || require.toUrl("dojo/resources/blank.gif")),
		_numberOfResults:		0,
		_pageSize:				10,
		_startIndex:			0,
		_strings:				i18nLinkedLibraryResultsView,
	
		_xslCache: new (declare("", _XSLCache, {
			xslStrings: {
				"LinkedLibrarySearch.xsl": {templateString: template}
			} 		
		}))(),
	
		postCreate: function(){
			this.inherited(arguments);
			this._performQuery();
		},
	
		_formatDates: function() {
			var dateFormatter = new DateFormater();
			var dateElement = query(".searchDateClass", this._contentNode);
			for(var i=0; i < dateElement.length; i++) {
				dateElement[i].innerHTML = dateFormatter.formatDateTime(dateElement[i].innerHTML);
			}
	
		},
		
		_formatPersons: function() {
			var personElements = query(".searchPersonClass", this._contentNode);
			if(personElements) {
				for(var i=0; i < personElements.length; i++) {
					var personElement = personElements[i];
					domClass.remove(personElement, "searchPersonClass");
					domClass.add(personElement, "lotusFirst");
					
					var searchNameElement = query(".searchNameClass", personElement);
					var searchNameStr;
					if(searchNameElement && searchNameElement.length > 0) {
						searchNameStr = searchNameElement[0].innerHTML;
					}
					
					var searchEmailElement = query(".searchEmailClass", personElement);
					var searchEmailStr;
					if(searchEmailElement && searchEmailElement.length > 0) {
						searchEmailStr = searchEmailElement[0].innerHTML;
					}
	
					var searchIdElement = query(".searchIdClass", personElement);
					var searchIdStr;
					if(searchIdElement && searchIdElement.length > 0) {
						searchIdStr = searchIdElement[0].innerHTML;
					}
					
					if ((searchIdStr || searchEmailStr) && searchNameStr){
						var personNode = people.createLink({userid: searchIdStr, email: searchEmailStr, name:searchNameStr});
						if(personNode) {
							if (!domClass.contains(personNode,"vcard")){
								domClass.add(personNode,"vcard");
							}
							if (!domClass.contains(personNode,"hasHover")){
								domClass.add(personNode,"hasHover");
							}
							
							while (personElement.childNodes.length > 0) {
								personElement.removeChild(personElement.firstChild);
							}
							personElement.appendChild(personNode);
						}
					}
				}
			}
			
			if (typeof(SemTagSvc) !== "undefined") {
				SemTagSvc.parseDom(null, this._contentNode);
			}
		},
		
		_setFileIcons: function() {
			var resultElements = query("td", this._contentNode);
			for(var i=0; i < resultElements.length; i++) {
				var title = query("h4 a", resultElements[i]);
				if (title.length > 0) {
					var originalString = domAttr.get(title[0], "innerHTML");
					domConstruct.empty(title[0]);
					html.breakString(originalString, windowModule.doc, title[0], 10);
					var splittedTitle = title[0].innerHTML.split(".");
					var fileExtension = "";
					if (splittedTitle.length > 1) {
						fileExtension = splittedTitle[splittedTitle.length - 1];
					}
					if (fileExtension.length > 0) {
						var imgElement = query("img", resultElements[i]);
						var iconClass = "lconn-ftype16-" + fileExtension;
						domClass.add(imgElement[0], iconClass);
					}
				}
			}
		},
		
		_performPagination: function(nextClicked) {
			if (nextClicked) {
				this._startIndex = this._startIndex + this._pageSize;
			} else {
				this._startIndex = this._startIndex - this._pageSize;
			}
			this._performQuery();
		},
		
		_performChangePageSize: function(pageSize) {
			this._pageSize = pageSize;
			this._startIndex = 0;
			this._performQuery();
		},
		
		_connectPagingEvents: function() {
			var eventElements = query(".lotusPaging a", this._contentNode);
			array.forEach(eventElements, function(anEventElement){
				this.connect(anEventElement, "onclick", lang.hitch(this, function(){
					var eventElementId = domAttr.get(anEventElement, "id");
					if (eventElementId.indexOf(this.PREV_NEXT_ID_PREFIX) === 0) {
						var nextClicked = (eventElementId.indexOf(this.NEXT_ID_SUFFIX, eventElementId.length-this.NEXT_ID_SUFFIX.length) !== -1);
						this._performPagination(nextClicked);
					} else if (eventElementId.indexOf(this.PAGE_SIZE_ID_PREFIX) === 0) {
						var pageSize = 10;
						var pageSizeIndex = eventElementId.length - 2;
						if (eventElementId.indexOf("25", pageSizeIndex) === pageSizeIndex) {
							pageSize = 25;
						} else if (eventElementId.indexOf("50", pageSizeIndex) === pageSizeIndex) {
							pageSize = 50;
						}
						this._performChangePageSize(pageSize);
					}
				}));
			}, this);
		},
		
		_transformResults: function(/*String*/xml){
			var xslTemplate = this._xslCache.getXslDoc("LinkedLibrarySearch.xsl");
			var results = null;
			var xmlDom = parser.parse(xml);
			if(xmlDom && xslTemplate) {
				var communityReference = domAttr.get("communityName", "href");
				results = xslt.transform(xmlDom, 
													xslTemplate, 
													null, 
													[
													 ["blankIcon", this._blankGif.toString()],
													 ["Community", this._strings.COMMUNITY],
													 ["CommunityRef", communityReference],
													 ["File", this._strings.FILE],
													 ["Files", this._strings.FILES],
													 ["LinkedLibraryPageSize", this.PAGE_SIZE_ID_PREFIX],
													 ["LinkedLibraryPrevNextPage", this.PREV_NEXT_ID_PREFIX],
													 ["MsgItems",this._strings.ITEMS],
													 ["MsgNext", this._strings.NEXT],
													 ["MsgPrevious", this._strings.PREVIOUS],
													 ["MsgShow",this._strings.SHOW],
													 ["NextSuffix", this.NEXT_ID_SUFFIX],
													 ["NoResultsMessage", this._strings.NORESULTSMESSAGE],
													 ["PagingTop", this._strings.PAGING_TOP],
													 ["PagingBottom", this._strings.PAGING_BOTTOM],
													 ["PreviousSuffix", this.PREV_ID_SUFFIX]
													],
													true);
			}
			if (results) {
				domAttr.set(this._contentNode, "innerHTML", results);
				this._formatDates();
				this._formatPersons();
				this._setFileIcons();
				this._connectPagingEvents();
			} else {
				this._onError();
			}
		},
		
		_getUrlWithPagingParameters:function(start, results) {
	
			//TODO Task 80572  - Append the pageNo and pageSize parameters to the URL
			var url = this.ecmSearchUrl + "&start=" + start + "&results=" + results;
			return url;
		},
	
		_onLoad:function(data) {
			// Remove lotusDim class applied in _showResultsViewIsLoading()
			domClass.remove(this._contentNode, "lotusDim");
			
			this._transformResults(data);
		},
		
		_showResultsViewIsLoading: function() {
			query(".lconnApplicationLoading", this._contentNode).orphan();
			
			domClass.add(this._contentNode, "lotusDim");
			
			var loadingDiv = domConstruct.create("div", {
				"class":		"lconnApplicationLoading"
			}, this._contentNode, "first");
			
			domStyle.set(loadingDiv, {
				"width":		domStyle.get(this._contentNode, "width")+"px"
			});
			
			domConstruct.create("img", {
				"class":		"lotusLoading",
				"src":			config.blankGif,
				"alt":			this._strings.LOADING,
				"role":			"presentation"
			}, loadingDiv);
			
			domConstruct.create("div", {
				"innerHTML":	this._strings.LOADING
			}, loadingDiv);
		},
		
		_onError: function(data) {
			domClass.remove(this._contentNode, "lotusDim");
			var messageContainer = domConstruct.create("div", {}, this._contentNode, "only");
			new MessageBox({
				canClose:	false,
				_strings:	{
								icon_alt:	this._strings.ERROR,
								a11y_label: this._strings.ERROR_PREFIX
							},
				type:		MessageBox.TYPE.ERROR,
				msg:		this._strings.ERROR_OCCURRED
			}, messageContainer);
		},
		
		_performQuery:function() {
	
			var url = this._getUrlWithPagingParameters(this._startIndex, this._pageSize+1);
			
			// show "loading... picture and text"
			this._showResultsViewIsLoading();
			
			var that = this;
			var req = xhr(url, {method: "GET", handleAs: "text", timeout: this.TIMEOUT, sync: false}).response.then(
					function(response) {
						var res = lang.mixin({}, response);
						res.args = lang.mixin(res.args, response.options);
						that._onLoad(response.data || response.text, res);
					}, function(response) {
						var res = lang.mixin(response, response.response);
						res.args = lang.mixin(res.args, res.options);
						that._onError(res);
					});
		}
	});
	return LinkedLibraryResultsView;
});
