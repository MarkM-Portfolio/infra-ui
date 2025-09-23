/* Copyright IBM Corp. 2014, 2019  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/event",
	"dojo/date",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dojo/i18n",
	"dojo/i18n!./nls/GenericEntry",
	"dojo/string",
	"dojo/text!./templates/GenericEntry.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"../globalization/bidiUtil",
	"../globalization/config",
	"../DateUtil",
	"../url",
	"../widgetUtils",
	"../config/services",
	"ic-ui/layout/people"
], function (declare, lang, event, dateModule, domClass, domAttr, i18n, i18nGenericEntry, string, template, _Templated, _Widget, bidiUtil, bidiConfig, DateUtil, urlModule, widgetUtils, services, people) {
	
	/**
	 * 
	 * @class ic-core.quickResults.GenericEntry
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var GenericEntry = declare(
		"lconn.core.quickResults.GenericEntry",
		[_Widget, _Templated], /** @lends ic-core.quickResults.GenericEntry.prototype */
	{
		templateString: template,
		
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
			
			this._strings = i18nGenericEntry;
			lang.mixin(this, this._strings);
			this._initStrings();
			
			this._initIcon();
		},
		
		_initStrings: function() {
			this._authorString = this.isUpdate ? string.substitute(this.UPDATED_BY, {author: this.author}) : this.author;
			var entryTypeString = this._getEntryTypeString();
			
			if(this.date && entryTypeString) {
				var todayDate = new Date();
				
				switch(dateModule.difference(todayDate, this.date, "day")) {
					case 0:
						var delta;
						if((delta = dateModule.difference(this.date, todayDate, "hour")) > 0) {
							var str = delta == 1 ? this._strings[entryTypeString + "VIEWED_1_HOUR_AGO"] : this._strings[entryTypeString + "VIEWED_HOURS_AGO"];
							this._dateString = string.substitute(str, {hours: delta});
						} else if((delta = dateModule.difference(this.date, todayDate, "minute")) > 0) {
							var str = delta == 1 ? this._strings[entryTypeString + "VIEWED_1_MINUTE_AGO"] : this._strings[entryTypeString + "VIEWED_MINUTES_AGO"];
							this._dateString = string.substitute(str, {minutes: delta});
						} else {
							delta = dateModule.difference(this.date, todayDate, "second");
							var str = "";
							if(delta < 1) {
								str = this._strings[entryTypeString + "VIEWED_TODAY"]
							} else if(delta == 1){
								str = this._strings[entryTypeString + "VIEWED_1_SECOND_AGO"];
							} else {
								str = this._strings[entryTypeString + "VIEWED_SECONDS_AGO"];
							}
							this._dateString = string.substitute(str, {seconds: delta});
						}
						break;
					case -1: this._dateString = this._strings[entryTypeString + "VIEWED_YESTERDAY"]; break;
					default: this._dateString = string.substitute(this._strings[entryTypeString + "VIEWED_AT_DATE"], {date: DateUtil.toString(this.date)}); break;
				}
			}
		},
		
		_initIcon: function() {
			switch(this.source.toLowerCase()) {
				case "communities":
					var baseUrl = urlModule.getServiceUrl(services.communities);
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
					this.entryTitle = bidiUtil.enforceTextDirection(this.entryTitle, bidiConfig.TEXT_DIRECTION.LEFT_TO_RIGHT);
					break;
				case "profiles":
					this.photoUrl = widgetUtils.addVersionNumber(people.getImageUrl({userid: this.contentId}, 40));
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
				domClass.remove(this.dateNode, "lotusHidden");
			}
			
			if(this.date && this._authorString) {
				domClass.remove(this._separator, "lotusHidden");
			}
			
			if(this.source.toLowerCase() == "files") {
				domClass.add(this.dateNode, "lconnHideOnSelected");
				domClass.add(this.previewOnlyNode, "lconnShowOnSelected");
				domClass.remove(this.previewOnlyNode, "lotusHidden");
			}
			
			if(this.isFocusable) {
				this.domNode.focus = lang.hitch(this, "_focusEntry");
				this.hiddenLinkNode.style.display = "";
				this.linkNode.style.display = "none";
				domAttr.set(this.hiddenLinkNode, "aria-describedby", this.metaDataNode.id);
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
			var fidoOpenFromUrl = lang.getObject("lconn.share.fileviewer.ConnectionsFileViewer.openFromUrl");
			if(this.source.toLowerCase() == "files"
				&& (this.itemType.toLowerCase() != "files_folder" && this.itemType.toLowerCase() != "forums_topic" && this.itemType.toLowerCase() != "wikis_page")
				&& fidoOpenFromUrl) {
				if(evt) {
					event.stop(evt);
				}
				fidoOpenFromUrl(this.hiddenLinkNode.href);
			} else if(evt) {
				evt.stopPropagation();
			}
		}
	});
	return GenericEntry;
});
