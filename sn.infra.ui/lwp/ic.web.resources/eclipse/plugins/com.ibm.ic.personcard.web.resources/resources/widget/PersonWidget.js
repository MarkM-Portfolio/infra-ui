/* Copyright IBM Corp. 2014, 2016  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/has",
	"dojo/text!./templates/PersonWidget.html",
	"dojo/text!./templates/PersonWidget_medium.html",
	"dojo/text!./templates/PersonWidget_high.html",
	"dojo/text!./templates/PersonWidget_compact.html",
	"dojo/text!./templates/PersonWidget_medium_compact.html",
	"dojo/text!./templates/PersonWidget_high_compact.html",
	"dojo/text!./templates/PersonWidget_compactFocusable.html",
	"dojo/text!./templates/PersonWidget_medium_compactFocusable.html",
	"dojo/text!./templates/PersonWidget_high_compactFocusable.html",
	"dojo/topic",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/globalization/bidiUtil",
	"ic-core/url",
	"ic-core/widgetUtils",
	"ic-personcard/widget/Localization",
	"ic-ui/layout/people"
], function (declare, domClass, has, template, templateMedium, templateHigh, templateComp, templateCompMedium, templateCompHigh, templateCompFocus, templateCompMediumFocus, templateCompHighFocus, topic, _Templated, _Widget, bidiUtil, url, widgetUtils, Localization, peopleModule) {

	/**
	 * Creates a widget representing a person with 3 different level of informations
	 * and 2 way of style for each level. All below variables can be passes to the
	 * constructor in order to populate the widget (except for those with the comment
	 * "Read-only"). It's possible to connect to these 2 callbacks:
	 * onNameFocused - triggered when the display name will get a focus event
	 * onTagClicked - triggered when a tag is clicked
	 * 
	 * @class com.ibm.social.personcard.widget.PersonWidget
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var PersonWidget = declare(
		"com.ibm.social.personcard.widget.PersonWidget",
		[_Widget, _Templated, Localization], /** @lends com.ibm.social.personcard.widget.PersonWidget.prototype */
	{
	
		templateString: template,
		
		medium_templatePath: templateMedium,
		high_templatePath: templateHigh,
		
		compact_templatePath: templateComp,
		mediumCompact_templatePath: templateCompMedium,
		highCompact_templatePath: templateCompHigh,
		
		compactFocusable_templatePath: templateCompFocus,
		mediumCompactFocusable_templatePath: templateCompMediumFocus,
		highCompactFocusable_templatePath: templateCompHighFocus,
		
		/**
		 * High confidence constant.
		 * 
		 * @readonly
		 * @type {String}
		 */
		HIGH_CONFIDENCE: "high",
		
		/**
		 * Medium confidence constant.
		 * 
		 * @readonly
		 * @type {String}
		 */
		MEDIUM_CONFIDENCE: "medium",
		
		/**
		 * Low confidence constant.
		 * 
		 * @readonly
		 * @type {String}
		 */
		LOW_CONFIDENCE: "low",
		
		/**
		 * Person profile URL.
		 * 
		 * @readonly
		 * @type {String}
		 */
		profileUrl: "",
		
		/**
		 * Person photo URL.
		 * 
		 * @readonly
		 * @type {String}
		 */
		photoUrl: "",
		
		/**
		 * Person user ID.
		 * 
		 * @type {String}
		 */
		userId: "",
		
		/**
		 * Person display name.
		 * 
		 * @type {String}
		 */
		displayNameString: "",
		
		/**
		 * Person display name without highlighting.
		 * 
		 * @readonly
		 * @type {String}
		 */
		displayNameEscaped: "",
		
		/**
		 * Person preferred name.
		 * 
		 * @type {String}
		 */
		preferredName: "",
		
		/**
		 * Person given names
		 * 
		 * @type {Array.<String>}
		 */
		givenNames: null,
		
		/**
		 * Person job responsibility.
		 * 
		 * @type {String}
		 */
		jobResponsibility: "",
		
		/**
		 * Person email address
		 * 
		 * @type {String}
		 */
		mail: "",
		
		/**
		 * Person email address without highlighting.
		 * 
		 * @readonly
		 * @type {String}
		 */
		_escapedMail: "",
		
		/**
		 * Person address
		 * 
		 * @type {String}
		 */
		address: "",
		
		/**
		 * Person phone number
		 * 
		 * @type {String}
		 */
		phone: "",
		
		/**
		 * Person tags
		 * 
		 * @type {Array.<String>}
		 */
		tags: null,
		
		tagString: "",			//Read-only
		_exceededTagsCount: -1,	//Read-only
		exceedingTagString: "",	//Read-only
		
		/**
		 * Max tags displayed in NON-compact mode.
		 * All exceeding tags will be hidden and a link to show them will be placed in the UI.
		 * 
		 * @default [20]
		 * @type {Number}
		 */
		maxTags: 20,
		
		/**
		 * If true the graphical view will be generated to apply a small space of rendering.
		 * 
		 * @default [false]
		 * @type {Boolean}
		 */
		compact: false,
		
		/**
		 * Max tags displayed in compact mode.
		 * All exceeding tags will be hidden and never displayed.
		 * 
		 * @default [3]
		 * @type {Number}
		 */
		maxTagsInCompact: 3,
		
		/**
		 * Entry confidence level.
		 * It determinate the layout of the Person content.
		 * 
		 * @default ["low"]
		 * @type {String}
		 */
		confidence: "",
		
		/**
		 * If true, the widget will use a focusable version of the compact
		 * templates.
		 * 
		 * @default [false]
		 * @type {Boolean}
		 */
		isFocusable: false,
		
		_compactSize: 40,
		_normalSize: 60,
		_bigSize: 128,
		
		constructor: function(data) {
			
			// Populate and calculate all the variables
			this._setValues(data);
			
			// Calculate which template should be used
			this._chooseTemplate();
		},
		
		postCreate: function() {
			
			this.connect(this.linkNode, "onfocus", "_nameFocused");
			
			if(!this.compact) {
				if(this.confidence == this.LOW_CONFIDENCE || this.confidence == this.MEDIUM_CONFIDENCE) {
					if(this.mail.match(/(<b>|<\/b>)/ig) || this.phone.match(/(<b>|<\/b>)/ig)) {
						domClass.remove(this.additionalInfo, "lotusHidden");
					}
					if(this.tags) {
						domClass.remove(this.tagsContainer, "lotusHidden");
					}
				}
				if(this.mailNode && !this.mail) {
					domClass.add(this.mailNode, "lotusHidden");
				}
			}
			
			if(this.tagsContainer) {
				var links = [];
				if(has("ie") <= 8) {
					links = this.tagsContainer.querySelectorAll(".tag");
				} else {
					links = this.tagsContainer.getElementsByClassName("tag");
				}
				for(var i=0; i<links.length; i++) {
					this.connect(links[i], "onclick", "_tagClicked");
				}
			}
			
			if(this._exceededTagsCount > 0 && this.exceededMessage) {
				this.exceededMessage.innerHTML = this._exceededTagsCount > 1 ? this.getString("EXCEEDED_TAGS", {count: this._exceededTagsCount}) : this.getString("EXCEEDED_ONE_TAG");
				domClass.remove(this.exceededMessage, "lotusHidden");
				domClass.add(this.exceededMessage, "exceededMessage");
			}
			
			this.inherited(arguments);
		},
		
		_setValues: function(data) {
			
			if(data.maxTags) {
				this.maxTags = data.maxTags;
			}
			if(data.maxTagsInCompact) {
				this.maxTagsInCompact = data.maxTagsInCompact;
			}
			
			this.isFocusable = data.isFocusable ? true : false;
			this.compact = data.compact ? true : false;
			this.userId = data.userId ? data.userId : "NULL";
			this.preferredName = data.preferredName ? data.preferredName : "";
			this.givenNames = data.givenNames ? data.givenNames : null;
			this.displayNameString = data.displayName ? data.displayName : "";
			
			if(!this.preferredName && this.givenNames) {
				for(var i=0; i<this.givenNames.length && !this.preferredName; i++) {
					var gn = this.givenNames[i].match(/<b>\w*<\/b>/i);
					if(!gn) {
						continue;
					}
					var reg = new RegExp(gn[0], "i");
					if(!this.displayNameString.match(reg)) {
						this.preferredName = this.givenNames[i];
					}
				}
			}
			
			if(this.preferredName) {
				this.displayNameString += " ("+this.preferredName+")\u200E";
			}
			
			this.displayNameEscaped = this.displayNameString.replace(/(<b>|<\/b>)/ig, "");
			this.jobResponsibility = data.jobResponsibility ? data.jobResponsibility : "";
			this.mail = data.mail ? data.mail : "";
			this._escapedMail = this.mail.replace(/(<b>|<\/b>)/ig, "");
			this.address = data.address ? data.address : "";
			this.phone = data.phone ? data.phone : "";
			this.tags = data.tags ? data.tags : null;
			this.confidence = data.confidence;
			
			if(!this.compact && data.tags) {
				var t = data.tags;
				for(var i=0; i < t.length; i++) {
					t[i] = bidiUtil.enforceTextDirection(t[i], document.dir);
				}
				var tmpArray = t.slice(0, this.maxTags);
				var tmpExceededArray = t.slice(this.maxTags);
				this._exceededTagsCount = tmpExceededArray.length;
				this.tagString = "<a href='javascript:;' class='tag'>" + tmpArray.join("</a>, <a href='javascript:;' class='tag'>") + "</a>";
				if(this._exceededTagsCount > 0) {
					this.exceedingTagString = "<a href='javascript:;' class='tag'>" + tmpExceededArray.join("</a>, <a href='javascript:;' class='tag'>") + "</a>";
				}
			} else if(data.tags) {
				var t = data.tags;
				for(var i=0; i < t.length; i++) {
					t[i] = bidiUtil.enforceTextDirection(t[i], document.dir);
				}
				var tmpArray = t.slice(0, this.maxTagsInCompact);
				this.tagString = "<span class='tag'>" + tmpArray.join("</span>, <span class='tag'>") + "</span>" + (data.tags.length > this.maxTagsInCompact ? "..." : "");
			}
		},
		
		_chooseTemplate: function() {
			
			this.profileUrl = peopleModule.getProfileUrl({userid: this.userId});
	
			if(this.compact) {
				this.photoUrl = widgetUtils.addVersionNumber(peopleModule.getImageUrl({userid: this.userId}, this._compactSize));
				this.templateString = this.isFocusable ? this.compactFocusable_templatePath : this.compact_templatePath;
					
				if(((this.mail && (this.confidence == this.MEDIUM_CONFIDENCE || this.confidence == this.HIGH_CONFIDENCE)) || this.phone) && !this.tags) {
					this.templateString = this.isFocusable ? this.mediumCompactFocusable_templatePath : this.mediumCompact_templatePath;
				}
				
				if(this.tags) {
					this.templateString = this.isFocusable ? this.highCompactFocusable_templatePath : this.highCompact_templatePath;
				}
			} else {
				var size = this.confidence == this.LOW_CONFIDENCE ? this._normalSize : this._bigSize;
				if(this.confidence == this.MEDIUM_CONFIDENCE) {
					this.templateString = this.medium_templatePath;
				} else if(this.confidence == this.HIGH_CONFIDENCE) {
					this.templateString = this.high_templatePath;
				}
				
				this.photoUrl = widgetUtils.addVersionNumber(peopleModule.getImageUrl({userid: this.userId}, size));
			}
		},
		
		showExceedingTags: function(evt) {
			if(evt) {
				evt.preventDefault(), evt.stopPropagation();
			}
			
			domClass.add(this.exceededMessage, "lotusHidden");
			domClass.remove(this.exceededMessage, "exceededMessage");
			domClass.remove(this.exceededTags, "lotusHidden");
		},
		
		_tagClicked: function(evt) {
			if(evt) {
				evt.preventDefault(), evt.stopPropagation();
			}
			var link = evt.target;
			if(!domClass.contains(link, "tag")) {
				link = link.parentElement;
			}
			this.onTagClicked(link.innerHTML.replace(/(<b>|<\/b>)/ig, ""));
		},
		
		_nameFocused: function(evt) {
			if(evt) {
				evt.preventDefault(), evt.stopPropagation();
			}
			this.onNameFocused(this.domNode);
		},
		
		_mailClicked: function(evt) {
			if(evt) {
				if(has("ie") <= 8) {
					evt.cancelBubble();
				} else {
					evt.stopPropagation();
				}
			}
		},
		
		/**
		 * To simulate a click on the person profile link.
		 * This will trigger the page to load person profile page.
		 */
		personClick: function() {
			if(this.compact) {
				this.hiddenLinkNode.click();
			} else {
				this.linkNode.click();
			}
		},
		
		linkClicked: function(evt) {
			if(evt) {
				evt.stopPropagation();
			}
		},
		
		/**
		 * Method to be overridden or connected to.
		 * Triggered when a tag is clicked (it only works on NON-compact mode).
		 * 
		 * @abstract
		 */
		onTagClicked: function(tag) {
		},
		
		/**
		 * Method to be overridden or connected to.
		 * Triggered when the person name is focused (it only works on NON-compact mode).
		 * 
		 * @abstract
		 */
		onNameFocused: function(element) {
		},
		
		/**
		 * Method to be overridden or connected to.
		 * Triggered when any focusable node receives focus (it only works on COMPACT mode).
		 * 
		 * @abstract
		 */
		onEntryFocused: function(evt) {
		}
	});
	return PersonWidget;
});
