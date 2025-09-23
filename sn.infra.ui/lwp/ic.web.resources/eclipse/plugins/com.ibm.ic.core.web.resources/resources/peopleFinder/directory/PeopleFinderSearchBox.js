/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/dom-geometry",
	"dojo/i18n",
	"dojo/i18n!./nls/PeopleFinderSearchBox",
	"../../auth",
	"../../config/properties",
	"../../config/services",
	"../PeopleFinderSearchBox",
	"./ResultDropDown"
], function (dojo, lang, declare, domGeometry, i18n, i18nPeopleFinderSearchBox, auth, properties, services, PeopleFinderSearchBox, ResultDropDown) {

	/**
	 * @class ic-core.peopleFinder.directory.PeopleFinderSearchBox
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var PeopleFinderSearchBox = declare(
		"lconn.core.peopleFinder.directory.PeopleFinderSearchBox",
		PeopleFinderSearchBox, /** @lends ic-core.peopleFinder.directory.PeopleFinderSearchBox.prototype */
	{
		PROFILE_ONLY_PROPERTY: "com.ibm.lconn.core.peopleFinder.profileOnly",
		PFstrings: null,
		
		ResultDropDownObject: ResultDropDown,
		showNoResultsMessage: false,
		
		postMixInProperties: function(){
			this.PFstrings = i18nPeopleFinderSearchBox;
			lang.mixin(this, this.PFstrings);
			this.inherited(arguments);
		},
		
		postCreate: function() {
			var shouldDisable = (properties[this.PROFILE_ONLY_PROPERTY] === "true" && lang.getObject('ibmConfig.serviceName') !== "profiles");
			
			this.PFdisable = shouldDisable || !services.profiles || (auth.getUser() && auth.getUser().isExternal);
			
			this.orientation = domGeometry.isBodyLtr() ? {'BR':'TR'} : {'BL':'TL'};
			
			this.inherited(arguments);
			
			this.connect(this.resultDropDown, "searchOnScope", "search");
		},
		
		runQuery: function() {
			clearTimeout(this._timeoutID);
			
			this._timeoutID = setTimeout(lang.hitch(this, function() {
				var str = this.PFtextField.value;
				str = lang.trim(str);
				
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
				this.dataReader.executeQuery(str, lang.hitch(this, "showTypeaheadResults"), null);
			}), this._queryTimeout);
		},
		
		/**
		 * Method to be overriden by the subclass or to connect to 
		 */
		search: function() {
			//Method to override or connect
		}
	});
	return PeopleFinderSearchBox;
});
