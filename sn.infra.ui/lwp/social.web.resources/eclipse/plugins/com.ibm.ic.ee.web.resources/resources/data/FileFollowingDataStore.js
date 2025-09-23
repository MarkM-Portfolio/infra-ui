/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/string",
	"ic-ee/bean/AtomBean",
	"ic-ee/data/FeedDataStore"
], function (declare, string, AtomBean, FeedDataStore) {

	var FileFollowingDataStore = declare("com.ibm.social.ee.data.FileFollowingDataStore", FeedDataStore, {
	   _getPostBody: function (attrs) {
	      var template = '<entry xmlns="http://www.w3.org/2005/Atom"><notifications xmlns="urn:ibm.com/td"><comment>${following}</comment><media>${following}</media></notifications><id>${id}</id></entry>';
	      return string.substitute(template, { following: attrs.following ? "on" : "off" , id: 'urn:lsid:ibm.com:td:' + encodeURIComponent(attrs.id)});
	   },
	   isItem: function (item) {
	      return true;
	   },
	   _getSaveItemUrl: function (item) {
	      return this.url;
	   },
	   itemFromDocEl: function(el, base) {
	      return new AtomBean(el, base);
	   }
	});
	return FileFollowingDataStore;
});
