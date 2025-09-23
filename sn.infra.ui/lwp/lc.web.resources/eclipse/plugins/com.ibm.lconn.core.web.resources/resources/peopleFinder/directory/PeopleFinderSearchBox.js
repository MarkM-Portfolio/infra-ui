/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.peopleFinder.directory.PeopleFinderSearchBox");

dojo.require("lconn.core.config.services");
dojo.require("lconn.core.peopleFinder.directory.ResultDropDown");
dojo.require("lconn.core.peopleFinder.PeopleFinderSearchBox");
dojo.require("lconn.core.auth");

dojo.require("dojo.i18n");
dojo.requireLocalization("lconn.core.peopleFinder.directory", "PeopleFinderSearchBox");

/**
 * @class lconn.core.peopleFinder.directory.PeopleFinderSearchBox
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.peopleFinder.directory.PeopleFinderSearchBox",
	[lconn.core.peopleFinder.PeopleFinderSearchBox], /** @lends lconn.core.peopleFinder.directory.PeopleFinderSearchBox.prototype */
{
	PROFILE_ONLY_PROPERTY: "com.ibm.lconn.core.peopleFinder.profileOnly",
	PFstrings: null,
	
	ResultDropDownObject: lconn.core.peopleFinder.directory.ResultDropDown,
	showNoResultsMessage: false,
	
	postMixInProperties: function(){
		this.PFstrings = dojo.i18n.getLocalization("lconn.core.peopleFinder.directory", "PeopleFinderSearchBox");
		dojo.mixin(this, this.PFstrings);
		this.inherited(arguments);
	},
	
	postCreate: function() {
		var shouldDisable = (lconn.core.config.properties[this.PROFILE_ONLY_PROPERTY] === "true" && dojo.getObject('ibmConfig.serviceName') !== "profiles");
		
		this.PFdisable = shouldDisable || (lconn.core.auth.getUser() && lconn.core.auth.getUser().isExternal);
		
		this.orientation = dojo.isBodyLtr() ? {'BR':'TR'} : {'BL':'TL'};
		
		this.inherited(arguments);
		
		this.connect(this.resultDropDown, "searchOnScope", "search");
	},
	
	runQuery: function() {
		clearTimeout(this._timeoutID);
		
		this._timeoutID = setTimeout(dojo.hitch(this, function() {
			var str = this.PFtextField.value;
			str = dojo.string.trim(str);
			
			if(!str || this.PFisPlaceholderActive()) {
				this.dataReader.lastQuery.query = "";
				this.resultDropDown.closeResults();
				this.PFtextField.removeAttribute("aria-activedescendant");
				this.PFtextField.parentElement.setAttribute("aria-expanded", "false");
				this.activeDescendantId = null;
				return;
			}
			
			if(str === this.dataReader.lastQuery.query) {
				return;
			}
			
			this.resultDropDown.setQueryString(str, this.PFscopeLabelNode.innerHTML);
			this.dataReader.executeQuery(str, dojo.hitch(this, "showTypeaheadResults", "PF"), null);
		}), this._queryTimeout);
	},
	
	getDirectoryLink: function() {
		return this.resultDropDown.getDirectoryLink();
	},
	
	/**
	 * Method to be overriden by the subclass or to connect to 
	 */
	search: function() {
		//Method to override or connect
	}
});
