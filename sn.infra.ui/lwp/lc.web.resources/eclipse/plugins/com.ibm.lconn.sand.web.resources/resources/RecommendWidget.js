/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.RecommendWidget");

dojo.require("dojo.string");
dojo.require("dojo.date.locale");
dojo.require("dojo.cookie");
dojo.require("dojo.number");
dojo.require("dojox.date.posix");
dojo.require("dojox.xml.parser");
dojo.require("dojo._base.html");
dojo.require("com.ibm.oneui.util.Url");
dojo.require("com.ibm.oneui.util.proxy");
dojo.require("lconn.core.HelpLauncher");
dojo.require("lconn.core.xslt");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.util._XSLCache");

dojo.requireLocalization("lconn.sand", "ui");
dojo.requireLocalization("lconn.sand", "RecommendWidget");

dojo.declare("lconn.sand.RecommendWidget",[dijit._Widget, dijit._Templated, dijit._Container], {
		
		_resourceBundle: null,
		// nodes
		templatePath: dojo.moduleUrl("lconn.sand", "templates/RecommendWidget.html"),
		remoteUrl:"",
		feedbackUrl:"",
		sourceList:"",
		blankIcon: "",
		tt: null,
		page: 0,
		xhrErrorHandler: null,
		errorHtmlContainerElemId: null,
		profileViewURL: "",
		lastMod:"",
		currentUserId:null,
		_xslCache: new (dojo.declare("", [lconn.core.util._XSLCache], {
			xslStrings: {
				"recommend.xsl": {templatePath : dojo.moduleUrl("lconn.sand","xslt/recommend.xsl")}
			} 		
		})),
		
		postCreate: function(){	
			var searchService = lconn.core.config.services.search;
			if (com.ibm.oneui.util.Url.secure){
				var searchUrl = searchService.secureUrl;
			} else {
				var searchUrl = searchService.url;
			}
			
			this.feedbackUrl = searchUrl + "/api/feedback";
			
			var recommendUrl = searchUrl + "/atomfba/social/recommend";
			var defaultParams = "pageSize=15&locale="+dojo.locale+"&diversityboost=1.0f&dateboost=1.0f&randomize=true";
			if (!this.sourceList || this.sourceList=="") {
				this.remoteUrl = recommendUrl+"?"+defaultParams;
			} else {
				this.sourceList = this.sourceList.replace(new RegExp(', ','g'),',');
				var sources = this.sourceList.split(",");
				
				dojo.forEach(sources,function(item, i){
					if (item=="communities"){
						sources[i] = "Source/communities/entry";	
					} else {
						sources[i] = "Source/" + item;
					}
				});
				
				var constraint = {type: "category", values: sources};
				this.remoteUrl = recommendUrl+"?constraint="+dojo.toJson(constraint)+"&"+defaultParams;
			}
			
			var profilesService = lconn.core.config.services.profiles;
			if (profilesService){
				if (com.ibm.oneui.util.Url.secure){
					this.profileViewURL = profilesService.secureUrl + "/html/profileView.do?userid=";
				} else {
					this.profileViewURL = profilesService.url + "/html/profileView.do?userid=";
				}
			}
			
			this.recommendLoading.style.display="";
			
			this.welcomeNode.id = this.id+"_welcomeNode";
			if(this.errorHtmlContainerElemId == null) {
				this.errorHtmlContainerElemId = this.welcomeNode.id;
			}
		},		

		postMixInProperties: function(){
			if(this.blankIcon=="") {
				this.blankIcon=djConfig.blankGif;
			}
			this._resourceBundle = dojo.i18n.getLocalization("lconn.sand", "RecommendWidget");
		},
		
		handleAsyncRequest: function(data, evt){
			dojo.cookie("lconn.sand.recommendationsTimeout", null, {expires:-1});
			if(data!=null) {
				var xml = dojox.xml.parser.parse(data);
				var html = "";					
				var isLTR = "";
				if(dojo._isBodyLtr()){
					isLTR = "true";
				}
				else{
					 isLTR = "false";
				}
				var xslt = this._xslCache.getXslDoc("recommend.xsl");
				html = lconn.core.xslt.transform(xml,xslt, null,
						[	['activity',this._resourceBundle.ACTIVITY],
							['blog',this._resourceBundle.BLOG_ENTRY],
							['bookmark',this._resourceBundle.BOOKMARK],
							['community',this._resourceBundle.COMMUNITY],
							['file',this._resourceBundle.FILE],
							['wiki',this._resourceBundle.WIKI_PAGE],
							['forum',this._resourceBundle.DISCUSSION_TOPIC],
							['blankIcon',this.blankIcon],
							['tic',this._resourceBundle.NUM_TAG_IN_COMMON],
							['pic',this._resourceBundle.NUM_PEOPLE_IN_COMMON],
							['profileUrl',this.profileViewURL],
							['remove',this._resourceBundle.REMOVE]
						], true);
				if(html!= "") {
					this.boardingNode.innerHTML = html;
					var totalNode = dojo.query(".totalResults", this.boardingNode);
					var total = totalNode[0].innerHTML;
					totalNode.orphan();
					
					this.pageStart(0);
					if(total == 0){
						this.recommendLoading.style.display="none";
						this.recommendErrorNode.style.display="none";
						this.welcomeNode.style.display="";
						this.hidePaging();
					} else {						
						this.welcomeNode.style.display="none";
						this.recommendErrorNode.style.display="none";
						this.recommendLoading.style.display="none";
						this.recommendContainer.style.display="";
						this.recommendLinkDescription.style.display="";
					}
					
				} else {
					this.recommendLoading.style.display="none";
					this.recommendErrorNode.style.display="none";
					this.welcomeNode.style.display="";
					this.hidePaging();
				}						
			}
		},
		
		foo: function(evt){
			alert("foo!");
		},
		
		Recommend: function() {
			this.recommendLoading.style.display="";
			this.hidePaging();
			this.welcomeNode.style.display="none";
			this.recommendErrorNode.style.display="none";
			this.recommendContainer.style.display="none";
			this.recommendLinkDescription.style.display="none";
			var nlm = dojo.cookie("lconn.sand.lastmod");
			if(typeof(nlm)!='undefined' || nlm!=null) {
				this.lastMod=nlm;
			} else {
				this.lastMod=new Date().getTime();
				dojo.cookie("lconn.sand.lastmod", this.lastMod, {expires: 7, secure: !!window.location.protocol.match("https"), samesite: 'None'});
			}
			this.fetchRecommendations();
		},
		
		fetchRecommendations: function() {
			var recommendationsTimeout = dojo.cookie("lconn.sand.recommendationsTimeout");
			var reqArgs = {
				htmlContainerElemId: this.errorHtmlContainerElemId,
				url: com.ibm.oneui.util.proxy(this.remoteUrl),
				handleAs: "text",
				timeout: 30000,
				preventCache: false,
				content: {
					lastMod:this.lastMod,
					uid:this.currentUserId
				}
			
			};
			
			// cr4 communities suggestions use format=light
			// if (this.sourceList === 'communities') {
			//	 reqArgs.content.format = 'light';
			// }
			
			if(dojo.isIE){
				if(!recommendationsTimeout){
					dojo.cookie("lconn.sand.recommendationsTimeout", this.recommendationsTimeout, {expires: 1});
				}else{
					dojo.cookie("lconn.sand.recommendationsTimeout", null, {expires: -1});
					this.displayError({status: 503});
					return;
				}
			}

			var req = dojo.xhrGet(reqArgs);
			req.addCallback(dojo.hitch(this, "handleAsyncRequest"));
			req.addErrback(dojo.hitch(this, "handleError", req.ioArgs));
		},
		
		setContent: function(html){
			if(html=="") {
				this.welcomeNode.display="none";
				this.hidePaging();
				return;
			} else {
				
				this.recommendContainer.innerHTML = html;

				var recs = dojo.query(".rec", this.recommendContainer);
				var isFirst = true;
				dojo.forEach(recs, function(item){
					
					if (isFirst && dojo.style(item,"display")!="none"){
						isFirst = false;
						dojo.addClass(item,"lotusFirst");
					}
					
					var showRemoveButton = function(evt){
						var remove = dojo.query(".lotusDelete.feedback", this);
						remove.style("visibility", "visible");
						dojo.query(".lotusAccess.feedback", this.recommendContainer).style("visibility", "hidden");
					};
					var hideRemoveButton = function(evt){
						dojo.query(".lotusDelete.feedback", this.recommendContainer).style("visibility", "hidden");
						dojo.query(".lotusAccess.feedback", this.recommendContainer).style("visibility", "visible");
					};
					dojo.connect(item,'onmouseenter', showRemoveButton);
					dojo.connect(item,'onmouseleave', hideRemoveButton);
					
					var links = dojo.query("h4 a, .sand_tic, .sand_pic",item);
					links.connect('onfocus', item, showRemoveButton);
					
					var feedback = dojo.query("a.feedback", item);
					feedback.connect("onclick", this, "handleFeedback");

					this._formatEvidenceLinks(item);
					
				}, this);
				// Bidi support
				lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.recommendContainer);
			}
		},
		
		_formatEvidenceLinks:function(item){
			var tic = dojo.query(".sand_tic", item);
			if (tic.length > 0){
				var link = tic[0];
				var evidences = dojo.query(".tic_evidence>*", item);
				var content = evidences[0];
				
				this._formatEvidenceLink(
						link, 
						this._resourceBundle.NUM_TAG_IN_COMMON,
						this._resourceBundle.NUM_TAGS_IN_COMMON, 
						content, 
						this._resourceBundle.DIALOG_RELATED_TAGS,
						this._resourceBundle.DIALOG_RELATED_TAGS_CLOSE
						);
			}

			var pic = dojo.query(".sand_pic", item);
			if (pic.length > 0){
				var link = pic[0];
				var evidences = dojo.query(".pic_evidence", item);
				var vcard = dojo.query(".lotusList", evidences[0]);
				var content = vcard[0];
				
				try {
					SemTagSvc.parseDom(null, content);
				} catch(e) {}
				
				this._formatEvidenceLink(
						link,
						this._resourceBundle.NUM_PERSON_IN_COMMON, 
						this._resourceBundle.NUM_PEOPLE_IN_COMMON, 
						content, 
						this._resourceBundle.DIALOG_RELATED_PEOPLE,
						this._resourceBundle.DIALOG_RELATED_PEOPLE_CLOSE
						);
			}
		},
		
		_formatEvidenceLink:function(link, singularString, pluralString, dialogContent, dialogDescriptionString, dialogCloseString){
			if (link){
				var count = dojo.attr(link,"innerHTML");
				if (count == "1"){
					var label = dojo.string.substitute(singularString, [count]);
				} else {
					var label = dojo.string.substitute(pluralString, [count]);
				}
				dojo.attr(link,"innerHTML", label);
				
				return lconn.core.HelpLauncher.createHelpLink(link,
						"", dialogContent, 
						{
							HELP: dialogDescriptionString, 
							CLOSE: dialogCloseString
						}, true
				);
			}
		},
				
		handleError: function(ioArgs, data, evt){
			if(typeof(this.xhrErrorHandler) == "function") {
				this.xhrErrorHandler(data, ioArgs);
			} else {
				this.displayError(data);
			}
		},
		
		displayError: function(data){
			
			if (data && data.status === 503){
				dojo.attr(this.recommendErrorNode,"innerHTML",this._resourceBundle.UNAVAILABLE);
			}
			
			this.recommendLoading.style.display = "none";
			this.recommendContainer.style.display = "none";
			this.recommendLinkDescription.style.display="none";
			this.welcomeNode.style.display="none";
			this.recommendErrorNode.style.display="";
			this.hidePaging();
		},
		
		hidePaging: function() {
			dojo.style(this.pagingFooter,"display", "none"); 
		},

		handleFeedback: function(evt) {
			var targ;
			if(evt==null) { targ=window.event.srcElement; } else { targ=evt.target; }
			if(targ.nodeName!="A") { targ = targ.parentNode; }
			var action = targ.getAttribute("action").replace(/:/g,"\\:")
			var removeme = dojo.query("."+action, this.recommendContainer);
			
			for(var i=0; i<removeme.length; i++) {
				if(removeme[i].getAttribute("role") == "listitem") {
					var nextFocus = removeme[i].nextSibling;
					while(nextFocus && nextFocus.nodeType != 1) {
						nextFocus = nextFocus.nextSibling;
					}
					
					if (nextFocus && nextFocus.style.display === "none"){
						//nextLinkText is a span - IE8 does not allow puting focus on span, so we take its parent
						nextFocus = this.nextLinkText.parentNode;
					} else if (dojo.isIE && nextFocus && nextFocus.querySelectorAll(".lotusMeta").length > 0) {
						nextFocus = nextFocus.querySelectorAll(".lotusMeta")[0].getElementsByTagName("a")[0];
					} else if(nextFocus && nextFocus.getElementsByClassName("lotusMeta").length > 0) {
						nextFocus = nextFocus.getElementsByClassName("lotusMeta")[0].getElementsByTagName("a")[0];
					} else {
						//prevLinkText is a span - IE8 does not allow puting focus on span, so we take its parent
						nextFocus = this.prevLinkText.parentNode;
					}
					
					if (nextFocus){
						nextFocus.focus();
						break;
					}
				}
			}

			removeme.orphan();
			removeme = dojo.query("."+action, this.boardingNode);
			removeme.orphan();
			
						
			var reqArgs = {
				url: com.ibm.oneui.util.proxy(this.feedbackUrl),
				handleAs: "text",
				timeout: 30000,
				content: {
						client: "recommend",
						itemid: targ.getAttribute("action"),
						action: "remove"
					}
			};
			var req = dojo.xhrGet(reqArgs);
			this.lastMod=new Date().getTime();
			dojo.cookie("lconn.sand.lastmod",this.lastMod, {expires: 7, secure: !!window.location.protocol.match("https"), samesite: 'None'});
			//req.addCallback(dojo.hitch(this, "handleAsyncRequest"));
			//req.addErrback(dojo.hitch(this, "handleError"));
		},
		
		pageNext: function() {
			if(this.page<2) {
				this.pageStart(this.page+1);
			}
		},
		pagePrevious: function() {
			if(this.page>0) {
				this.pageStart(this.page-1);
			}
		},
		pageStart: function(pageNumber) {
			
			var recs = dojo.query(".rec", this.boardingNode);
			
			var pageStart = (pageNumber*5)+1;
			if (recs.length>=pageStart+5)
				var pageEnd = pageStart+4;
			else {
				var pageEnd = recs.length;
			}
			
			dojo.attr(this.pagePositionDiv, "innerHTML", dojo.string.substitute(
					this._resourceBundle.PAGE_POSITION, [pageStart,pageEnd,recs.length]));
			
			var label = dojo.string.substitute(this._resourceBundle.ARIA_PAGE_POSITION, [pageStart,pageEnd,recs.length]);
			dojo.attr(this.pagePositionDiv, "aria-label", label);
			dojo.attr(this.pagePositionDiv, "title", label);
			
			dojo.style(this.pagingFooter,"display", "");
			
			if(pageNumber==0) {
				this.prevLink.style.display="none";
				this.prevLinkText.style.display="";
			} else {
				this.prevLink.style.display="";
				this.prevLinkText.style.display="none";
			}

			for(var i=0;i<recs.length;i++) {
				recs[i].style.display="none";
			}

			if(recs.length>((pageNumber*5)+5)) {
				this.nextLink.style.display="";
				this.nextLinkText.style.display="none";
				for(var i=pageNumber*5;i<((pageNumber*5)+5);i++) {
					recs[i].style.display="";
				}
			} else {
				this.nextLink.style.display="none";
				this.nextLinkText.style.display="";
				for(var i=pageNumber*5;i<recs.length;i++) {
					recs[i].style.display="";
				}
			}
			this.setContent(this.boardingNode.innerHTML);

			this.page=pageNumber;
		}
		
	}
);
