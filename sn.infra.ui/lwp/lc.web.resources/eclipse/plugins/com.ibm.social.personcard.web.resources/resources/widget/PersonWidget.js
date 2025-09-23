/* Copyright IBM Corp. 2014, 2016  All Rights Reserved.              */

dojo.provide("com.ibm.social.personcard.widget.PersonWidget");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.url");
dojo.require("lconn.core.widgetUtils");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.require("com.ibm.social.personcard.widget.Localization");

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
dojo.declare(
	"com.ibm.social.personcard.widget.PersonWidget",
	[dijit._Widget, dijit._Templated, com.ibm.social.personcard.widget.Localization], /** @lends com.ibm.social.personcard.widget.PersonWidget.prototype */
{

	templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget.html"),
	
	medium_templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget_medium.html"),
	high_templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget_high.html"),
	
	compact_templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget_compact.html"),
	mediumCompact_templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget_medium_compact.html"),
	highCompact_templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget_high_compact.html"),
	
	compactFocusable_templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget_compactFocusable.html"),
	mediumCompactFocusable_templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget_medium_compactFocusable.html"),
	highCompactFocusable_templatePath: dojo.moduleUrl("com.ibm.social.personcard", "widget/templates/PersonWidget_high_compactFocusable.html"),
	
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
					dojo.removeClass(this.additionalInfo, "lotusHidden");
				}
				if(this.tags) {
					dojo.removeClass(this.tagsContainer, "lotusHidden");
				}
			}
			if(this.mailNode && !this.mail) {
				dojo.addClass(this.mailNode, "lotusHidden");
			}
		}
		
		if(this.tagsContainer) {
			var links = [];
			if(dojo.isIE <= 8) {
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
			dojo.removeClass(this.exceededMessage, "lotusHidden");
			dojo.addClass(this.exceededMessage, "exceededMessage");
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
				t[i] = lconn.core.globalization.bidiUtil.enforceTextDirection(t[i], document.dir);
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
				t[i] = lconn.core.globalization.bidiUtil.enforceTextDirection(t[i], document.dir);
			}
			var tmpArray = t.slice(0, this.maxTagsInCompact);
			this.tagString = "<span class='tag'>" + tmpArray.join("</span>, <span class='tag'>") + "</span>" + (data.tags.length > this.maxTagsInCompact ? "..." : "");
		}
	},
	
	_chooseTemplate: function() {
		
		this.profileUrl = com.ibm.lconn.layout.people.getProfileUrl({userid: this.userId});

		if(this.compact) {
			this.photoUrl = lconn.core.widgetUtils.addVersionNumber(com.ibm.lconn.layout.people.getImageUrl({userid: this.userId}, this._compactSize));
			this.templatePath = this.isFocusable ? this.compactFocusable_templatePath : this.compact_templatePath;
				
			if(((this.mail && (this.confidence == this.MEDIUM_CONFIDENCE || this.confidence == this.HIGH_CONFIDENCE)) || this.phone) && !this.tags) {
				this.templatePath = this.isFocusable ? this.mediumCompactFocusable_templatePath : this.mediumCompact_templatePath;
			}
			
			if(this.tags) {
				this.templatePath = this.isFocusable ? this.highCompactFocusable_templatePath : this.highCompact_templatePath;
			}
		} else {
			var size = this.confidence == this.LOW_CONFIDENCE ? this._normalSize : this._bigSize;
			if(this.confidence == this.MEDIUM_CONFIDENCE) {
				this.templatePath = this.medium_templatePath;
			} else if(this.confidence == this.HIGH_CONFIDENCE) {
				this.templatePath = this.high_templatePath;
			}
			
			this.photoUrl = lconn.core.widgetUtils.addVersionNumber(com.ibm.lconn.layout.people.getImageUrl({userid: this.userId}, size));
		}
	},
	
	showExceedingTags: function(evt) {
		if(evt) {
			dojo.stopEvent(evt);
		}
		
		dojo.addClass(this.exceededMessage, "lotusHidden");
		dojo.removeClass(this.exceededMessage, "exceededMessage");
		dojo.removeClass(this.exceededTags, "lotusHidden");
	},
	
	_tagClicked: function(evt) {
		if(evt) {
			dojo.stopEvent(evt);
		}
		var link = evt.target;
		if(!dojo.hasClass(link, "tag")) {
			link = link.parentElement;
		}
		this.onTagClicked(link.innerHTML.replace(/(<b>|<\/b>)/ig, ""));
	},
	
	_nameFocused: function(evt) {
		if(evt) {
			dojo.stopEvent(evt);
		}
		this.onNameFocused(this.domNode);
	},
	
	_mailClicked: function(evt) {
		if(evt) {
			if(dojo.isIE <= 8) {
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
