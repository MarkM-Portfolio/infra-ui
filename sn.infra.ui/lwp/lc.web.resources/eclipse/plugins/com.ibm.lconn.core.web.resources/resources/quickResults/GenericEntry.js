/* Copyright IBM Corp. 2014, 2019  All Rights Reserved.              */

dojo.provide("lconn.core.quickResults.GenericEntry");

dojo.require("dojo.date");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("lconn.core.globalization.config");
dojo.require("lconn.core.DateUtil");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.widgetUtils");
dojo.require("com.ibm.lconn.layout.people");


dojo.require("dojo.i18n");
dojo.requireLocalization("lconn.core.quickResults", "GenericEntry");

/**
 * 
 * @class lconn.core.quickResults.GenericEntry
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.quickResults.GenericEntry",
	[dijit._Widget, dijit._Templated], /** @lends lconn.core.quickResults.GenericEntry.prototype */
{
	templatePath: dojo.moduleUrl("lconn.core", "quickResults/templates/GenericEntry.html"),
	
	contentId: "",
	entryTitle: "",
	details: "",
	author: "",
	date: null,
	source: "",
	itemType: "",
	isUpdate: false,
	resourceUrl: "",
	photoUrl: "",
	fileType: "",
	isFocusable: false,
	
	_strings: null,
	_authorString: "",
	_dateString: "",
	_additionalClass: "",
	
	postMixInProperties: function() {
		this.inherited(arguments);
		
		if(this.source == "updates") {
			this.isUpdate = true;
		}
		
		this._strings = dojo.i18n.getLocalization("lconn.core.quickResults", "GenericEntry");
		dojo.mixin(this, this._strings);
		this._initStrings();
		
		this._initIcon();
	},
	
	_initStrings: function() {
		this._authorString = this.isUpdate ? dojo.string.substitute(this.UPDATED_BY, {author: this.author}) : this.author;
		var entryTypeString = this._getEntryTypeString();
		
		if(this.date && entryTypeString) {
			var todayDate = new Date();
			
			switch(dojo.date.difference(todayDate, this.date, "day")) {
				case 0:
					var delta;
					if((delta = dojo.date.difference(this.date, todayDate, "hour")) > 0) {
						var string = delta == 1 ? this._strings[entryTypeString + "VIEWED_1_HOUR_AGO"] : this._strings[entryTypeString + "VIEWED_HOURS_AGO"];
						this._dateString = dojo.string.substitute(string, {hours: delta});
					} else if((delta = dojo.date.difference(this.date, todayDate, "minute")) > 0) {
						var string = delta == 1 ? this._strings[entryTypeString + "VIEWED_1_MINUTE_AGO"] : this._strings[entryTypeString + "VIEWED_MINUTES_AGO"];
						this._dateString = dojo.string.substitute(string, {minutes: delta});
					} else {
						delta = dojo.date.difference(this.date, todayDate, "second");
						var string = "";
						if(delta < 1) {
							string = this._strings[entryTypeString + "VIEWED_TODAY"]
						} else if(delta == 1){
							string = this._strings[entryTypeString + "VIEWED_1_SECOND_AGO"];
						} else {
							string = this._strings[entryTypeString + "VIEWED_SECONDS_AGO"];
						}
						this._dateString = dojo.string.substitute(string, {seconds: delta});
					}
					break;
				case -1: this._dateString = this._strings[entryTypeString + "VIEWED_YESTERDAY"]; break;
				default: this._dateString = dojo.string.substitute(this._strings[entryTypeString + "VIEWED_AT_DATE"], {date: lconn.core.DateUtil.toString(this.date)}); break;
			}
		}
	},
	
	_initIcon: function() {
		switch(this.source.toLowerCase()) {
			case "communities":
				var baseUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.communities);
				this.photoUrl = baseUrl + "/service/html/image?communityUuid=" + this.contentId + "&showDefaultForNoPermissions=true";
				break;
			case "files":
			case "ecm":
				this.photoUrl = this._blankGif;
				if(this.itemType.toLowerCase() == "files_folder") {
					this._additionalClass = "lconnSprite-iconFolderClose32";
				} else {
					var extension = this.fileType;
					var escapedTitle = this.entryTitle.replace(/(<b>|<\/b>)/ig, "");
					if(!this.fileType && escapedTitle.match(/.*[.](\w*)$/i)) {
						extension = escapedTitle.match(/.*[.](\w*)$/i)[1];
					}
					this._additionalClass = "lconn-ftype32 lconn-ftype32-" + extension;
				}
				this.entryTitle = lconn.core.globalization.bidiUtil.enforceTextDirection(this.entryTitle, lconn.core.globalization.config.TEXT_DIRECTION.LEFT_TO_RIGHT);
				break;
			case "profiles":
				this.photoUrl = lconn.core.widgetUtils.addVersionNumber(com.ibm.lconn.layout.people.getImageUrl({userid: this.contentId}, 40));
				this._additionalClass = "lconn_userImage";
				break;
			case "activities":
				this.photoUrl = this._blankGif;
				if(this.itemType.toLowerCase() == "activities_todo") {
					this._additionalClass = "lconnSprite-iconTodos30";
				} else {
					this._additionalClass = "lconnSprite-iconActivities30";
				}
				break;
			case "bookmarks":
				this.photoUrl = this._blankGif;
				this._additionalClass = "lconnSprite-iconBookmarks30";
				break;
			case "blogs":
			case "ideationblog":
				this.photoUrl = this._blankGif;
				this._additionalClass = "lconnSprite-iconBlogs30";
				break;
			case "forums":
				this.photoUrl = this._blankGif;
				this._additionalClass = "lconnSprite-iconForums30";
				break;
			case "wikis":
				this.photoUrl = this._blankGif;
				this._additionalClass = "lconnSprite-iconWikis30";
				break;
			case "calendar":
				this.photoUrl = this._blankGif;
				this._additionalClass = "lconnSprite-iconCalendar30";
				break;
			case "forms":
				this.photoUrl = this._blankGif;
				this._additionalClass = "lconn-iconSurvey30";
				break;
			default:
				this.photoUrl = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0id" +
						"XRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4" +
						"cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnN" +
						"pb249IjEuMSIgaWQ9IkxheWVyXzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zy" +
						"IgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iM" +
						"HB4IgoJIHdpZHRoPSIzMHB4IiBoZWlnaHQ9IjMwcHgiIHZpZXdCb3g9IjAgMCAzMCAzMCIgc3R5" +
						"bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAgMzA7IiB4bWw6c3BhY2U9InByZXNlcnZ" +
						"lIj4KPHBhdGggZD0iTTI4LDRIN0g2SDJDMC45LDQsMCw0LjksMCw2djV2MXY2djF2NWMwLDEuMS" +
						"wwLjksMiwyLDJoNGgxaDIxYzEuMSwwLDItMC45LDItMlY2QzMwLDQuOSwyOS4xLDQsMjgsNHogT" +
						"TEsNgoJYzAtMC41NTEsMC40NDktMSwxLTFoNHY2SDFWNnogTTEsMTJoNXY2SDFWMTJ6IE0yLDI1" +
						"Yy0wLjU1MSwwLTEtMC40NDktMS0xdi01aDV2NkgyeiBNMjksMjRjMCwwLjU1MS0wLjQ0OSwxLTE" +
						"sMUg3di02aDIyVjI0egoJIE0yOSwxOEg3di02aDIyVjE4eiBNMjksMTFIN1Y1aDIxYzAuNTUxLD" +
						"AsMSwwLjQ0OSwxLDFWMTF6Ii8+Cjwvc3ZnPgo=";
				break;
		}
	},
	
	_getEntryTypeString: function() {
		var entryString = "";
		
		switch(this.source.toLowerCase()) {
			case "communities":
				entryString = "COMMUNITY_";
				break;
			case "files":
			case "ecm":
				entryString = "FILE_";
				break;
			case "profiles":
				entryString = "PROFILE_";
				break;
			case "activities":
				entryString = "ACTIVITY_";
				break;
			case "bookmarks":
				entryString = "BOOKMARK_";
				break;
			case "blogs":
			case "ideationblog":
				entryString = "BLOG_";
				break;
			case "forums":
				entryString = "FORUM_";
				break;
			case "wikis":
				entryString = "WIKI_";
				break;
			case "todos":
				entryString = "TODO_";
				break;
			case "calendar":
				entryString = "EVENT_";
				break;
			case "forms":
				entryString = "SURVEY_";
				break;
			default:
				entryString = "GENERIC_";
				break;
		}
		
		return entryString;
	},
	
	startup: function() {
		if(this.date) {
			dojo.removeClass(this.dateNode, "lotusHidden");
		}
		
		if(this.date && this._authorString) {
			dojo.removeClass(this._separator, "lotusHidden");
		}
		
		if(this.source.toLowerCase() == "files") {
			dojo.addClass(this.dateNode, "lconnHideOnSelected");
			dojo.addClass(this.previewOnlyNode, "lconnShowOnSelected");
			dojo.removeClass(this.previewOnlyNode, "lotusHidden");
		}
		
		if(this.isFocusable) {
			this.domNode.focus = dojo.hitch(this, "_focusEntry");
			this.hiddenLinkNode.style.display = "";
			this.linkNode.style.display = "none";
			dojo.setAttr(this.hiddenLinkNode, "aria-describedby", this.metaDataNode.id);
		}
		
		this.inherited(arguments);
	},
	
	_focusEntry: function() {
		this.hiddenLinkNode.focus();
	},
	
	entryClick: function() {
		this.hiddenLinkNode.click();
	},
	
	linkClicked: function(evt) {
		var fidoOpenFromUrl = dojo.getObject("lconn.share.fileviewer.ConnectionsFileViewer.openFromUrl");
		if(this.source.toLowerCase() == "files"
			&& (this.itemType.toLowerCase() != "files_folder" && this.itemType.toLowerCase() != "forums_topic" && this.itemType.toLowerCase() != "wikis_page")
			&& fidoOpenFromUrl) {
			if(evt) {
				dojo.stopEvent(evt);
			}
			fidoOpenFromUrl(this.hiddenLinkNode.href);
		} else if(evt) {
			evt.stopPropagation();
		}
	}
});
