/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-core/PeopleDataStoreOpenSocial",
	"ic-incontext/util/url"
], function (declare, PeopleDataStoreOpenSocial, url) {

	var PeopleDataStore = declare("com.ibm.social.ee.data.PeopleDataStore", PeopleDataStoreOpenSocial, {
	   
	   constructor: function (args) {
	      if (args.network) 
	         this.network = args.network;
	   },
	
	   networkGet: function(opts) {
	      if (opts.content)
	         opts.url = url.rewrite(opts.url, opts.content);     
	      this.network.get(opts);
	   }
	
	});
	return PeopleDataStore;
});
