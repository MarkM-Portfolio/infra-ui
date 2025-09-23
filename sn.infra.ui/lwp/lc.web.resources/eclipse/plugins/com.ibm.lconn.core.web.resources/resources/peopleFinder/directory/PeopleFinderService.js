/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.peopleFinder.directory.PeopleFinderService");

dojo.require("lconn.core.typeahead.Service");
dojo.require("lconn.core.peopleFinder.DataReader");
dojo.require("com.ibm.social.personcard.widget.PersonWidget");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.auth");

dojo.requireLocalization("lconn.core.peopleFinder.directory", "PeopleFinderService");

/**
 * lconn.core.typeahead.Service implementation for
 * People Finder service
 * 
 * @class lconn.core.peopleFinder.directory.PeopleFinderService
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.peopleFinder.directory.PeopleFinderService",
	[lconn.core.typeahead.Service], /** @lends lconn.core.peopleFinder.directory.PeopleFinderService.prototype */
{
	//lconn.core.peopleFinder.DataReader vars
	/**
	 * To change default additional fields values in the request;
	 * e.g. {
	 * 			low:['city','country'],
	 * 			medium:['workPhone'],
	 * 			high:['tag']
	 * 		}
	 * 
	 * @default [{low: ['city','country'], high: ['workPhone','tag']}]
	 * @type {{low: Array.<String>, medium: Array.<String>, high: Array<String>}}
	 */
	additionalFields: null,
	
	/**
	 * Overrides the default number of results returned from the request.
	 * 
	 * @default [4]
	 * @type {Number}
	 */
	resultsNumber: 4,
	
	/**
	 * If false results returned from the request would not contain the highlight tags around the query matches.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	highlight: true,
	
	/**
	 * If true the query will match names and emails only.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	searchOnlyNameAndEmail: false,
	
	/**
	 * If true at least one term in the query will match names and emails.
	 * 
	 * @default [false]
	 * @type {Boolean}
	 */
	mustMatchNameOrEmail: false,
	//End of lconn.core.peopleFinder.DataReader vars
	
	/**
	 * If true the service wont return any low confidence result.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	escapeLowConfidence: true,
	
	minToDisplay: 1,
	lengthToIgnoreMin: 3,
	
	postMixInProperties: function(){
		this.inherited(arguments);
		this.strings = dojo.i18n.getLocalization("lconn.core.peopleFinder.directory", "PeopleFinderService");
		dojo.mixin(this, this.strings);
	},
	
	postCreate: function() {
		if(!this.isDisabled) {
			this.isDisabled = (lconn.core.auth.getUser() && lconn.core.auth.getUser().isExternal);
		}
		this._dataReader = new lconn.core.peopleFinder.DataReader({
			pageSize: this.resultsNumber,
			highlight: this.highlight,
			searchOnlyNameAndEmail: this.searchOnlyNameAndEmail,
			mustMatchNameOrEmail: this.mustMatchNameOrEmail
		});
		if(this.additionalFields) {
			dojo.mixin(this._dataReader.additionalFields, this.additionalFields);
		}
		this._dataReader.startup();
		
		this.header = document.createElement("div");
		dojo.addClass(this.header, "pfTitle");
		this.header.innerHTML = this.DIRECTORY_RESULTS;
		
		this.footer = document.createElement("div");
		this.footer.setAttribute("aria-describedby", this.id + "_moreDirectoryAria");
		dojo.addClass(this.footer, "pfDirectoryLink");
		var moreLink = document.createElement("span");
		dojo.addClass(moreLink, "pfLinkNode");
		moreLink.innerHTML = this.MORE_DIRECTORY_RESULTS;
		this.footer.appendChild(moreLink);
		this.connect(this.footer, "onclick", "redirectToDirectory");
	},
	
	executeQuery: function(query) {
		var promise = new dojo.Deferred();
		
		if(this.isDisabled) {
			this._handleDisabled(promise);
		} else if(this.isLoginNeeded && !lconn.core.auth.isAuthenticated()) {
			this._handleLogin(promise);
		} else {
			this._dataReader.executeQuery(query,
					dojo.hitch(this, "_handleResults", promise, query),
					dojo.hitch(this, "_handleError", promise));
		}
		
		return promise.promise;
	},
	
	initResults: function(elements) {
		var results = {
				high: [],
				medium: [],
				low: []
		};
		
		for(var i=0; i<elements.length; i++) {
			if(this.escapeLowConfidence && elements[i].confidence == "low") {
				continue;
			}
			var entryWidget = new com.ibm.social.personcard.widget.PersonWidget({
				userId: (elements[i].id ? elements[i].id : ""),
				displayName: (elements[i].name ? elements[i].name : ""),
				preferredName: (elements[i].preferredFirstName ? elements[i].preferredFirstName : ""),
				givenNames: (elements[i].givenNames ? elements[i].givenNames : null),
				jobResponsibility: (elements[i].jobResponsibility ? elements[i].jobResponsibility : ""),
				mail: (elements[i].email ? elements[i].email : ""),
				address: (elements[i].city ? elements[i].city : "") + (elements[i].city && elements[i].country ? ", " : "") + (elements[i].country ? elements[i].country : ""),
				phone: (elements[i].workPhone ? elements[i].workPhone : ""),
				tags: (elements[i].confidence && elements[i].confidence == "high" ? elements[i].tag : null),	//because sometimes it can return tags even if it's not high
				compact: true,
				confidence: elements[i].confidence ? elements[i].confidence : "low",
				isFocusable: this.isFocusable
			});
			entryWidget.startup();
			this._createdWidgets.push(entryWidget);
			if(this.useAriaNodes) {
				entryWidget.domNode.setAttribute("aria-describedby", this.id + "_entryAria");
			}
			entryWidget.connect(entryWidget.domNode, "onclick", dojo.hitch(this, "entrySelected", entryWidget));
			entryWidget.connect(entryWidget, "linkClicked", dojo.hitch(this, "entryClicked", entryWidget));
			if(this.isFocusable) {
				entryWidget.connect(entryWidget, "onEntryFocused", dojo.hitch(this, "focusCallback", entryWidget.domNode));
			}
			results[entryWidget.confidence].push(entryWidget.domNode);
		}
		
		return results;
	},
	
	initAriaNodes: function() {
		var ariaNode = document.createElement("div");
		dojo.addClass(ariaNode, "lotusHidden");
		ariaNode.innerHTML = this.ENTRY_ARIA_LABEL;
		ariaNode.id = this.id + "_entryAria";
		
		var moreDirectoryAria = document.createElement("div");
		dojo.addClass(moreDirectoryAria, "lotusHidden");
		moreDirectoryAria.innerHTML = this.MORE_DIRECTORY_ARIA_LABEL;
		moreDirectoryAria.id = this.id + "_moreDirectoryAria";
		
		return [ariaNode, moreDirectoryAria];
	},
	
	entrySelected: function(entry, evt) {
		entry.personClick();
	},
	
	entryClicked: function(entry, evt) {
		//Callback - Nothing here
	},
	
	redirectToDirectory: function() {
		var url = this.getDirectoryLink();
		url += "#q=" + encodeURIComponent(this._dataReader.lastQuery.query);
		window.location = url;
	},
	
	getDirectoryLink: function() {
		var url = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles) || lconn.core.url.getServiceUrl(lconn.core.config.services.scprofiles).toString().replace(/\/contacts/, "");
		url += "/html/searchProfiles.do";
		return url;
	}
});
