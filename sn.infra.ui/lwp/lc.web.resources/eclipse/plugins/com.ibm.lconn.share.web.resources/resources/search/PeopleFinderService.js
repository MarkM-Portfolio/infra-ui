/* Copyright IBM Corp. 2016  All Rights Reserved.              */

dojo.provide("lconn.share.search.PeopleFinderService");

dojo.require("lconn.core.peopleFinder.directory.PeopleFinderService");
dojo.require("com.ibm.social.personcard.widget.PersonWidget");
dojo.require("dojo.i18n");
dojo.requireLocalization("lconn.share.search", "PeopleFinderService");

/**
 * Override of lconn.core.peopleFinder.directory.PeopleFinderService
 * to support Files by Person scope.
 * 
 * IMPORTANT: for Files use only.
 * 
 * @class lconn.share.search.PeopleFinderService
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.share.search.PeopleFinderService",
	[lconn.core.peopleFinder.directory.PeopleFinderService], /** @lends lconn.share.search.PeopleFinderService.prototype */
{
	postMixInProperties: function(){
		this.inherited(arguments);
		this.strings = dojo.i18n.getLocalization("lconn.share.search", "PeopleFinderService");
		dojo.mixin(this, this.strings);
	},
	
	postCreate: function() {
		this.inherited(arguments);
		this.header.innerHTML = this.FILES_BY_PERSONS;
	},
	
	entrySelected: function(entry, evt) {
		if(evt) {
			dojo.stopEvent(evt);
		}
	},
	
	entryClicked: function(entry, evt) {
		if(evt && entry.hiddenLinkNode.contains(evt.target)) {
			dojo.stopEvent(evt);
			this.entrySelected(entry, evt);
		}
	}
});