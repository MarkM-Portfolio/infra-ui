/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * Tests for the data package for the mentions data converter.
 */

dojo.provide("lconn.test.mentions.data.DataConverterTests");

dojo.require("doh.runner");
dojo.require("lconn.core.PeopleTypeAheadOpenSocialConverter");

doh.register("lconn.test.mentions.opensocialconverter.test",
	[
	  /* Tests a feed containing a single user */
	  { name: "singleUserTest",
		osFeed: null,
		setUp: function() {
			var members = [{displayName:"Joe Bloggs3", 
							emails: [
							   {type:"primary",
								value:"jbloggs3@ie.ibm.com",primary:true}
							],
							id: "urn:lsid:lconn.ibm.com:profiles.person:ae354"}];
			
			this.osFeed = {startIndex: 0,
						   totalResults: 10,
						   connections:{},
						   filtered: true,
						   itemsPerPage: 10,
						   sorted: true,
						   list: members};
		},
		runTest: function() {
			var converter = new lconn.core.PeopleTypeAheadOpenSocialConverter();
			
			var newFeed = converter.convertOpenSocialPeopleTypeAheadFeed(this.osFeed);
			
			doh.t(newFeed.items.length == 1);
			
			var item = newFeed.items[0];
			doh.t(item.name == "Joe Bloggs3");
			doh.t(item.member == "jbloggs3@ie.ibm.com");
			doh.t(item.userid == "ae354");
	    }
	  },
	  
	  /* Tests a feed containing multiple users. */
	  { name: "multipleUserTest",
			osFeed: null,
			setUp: function() {
				var members = [{displayName:"Joe Bloggs3", 
								emails: [
								   {type:"primary",
									value:"jbloggs3@ie.ibm.com",primary:true}
								],
								id: "urn:lsid:lconn.ibm.com:profiles.person:ae354"},
								{displayName:"Joe Bloggs4", 
									emails: [
									   {type:"primary",
										value:"jbloggs4@ie.ibm.com",primary:true}
									],
									id: "urn:lsid:lconn.ibm.com:profiles.person:ae355"}
								];
				
				this.osFeed = {startIndex: 0,
							   totalResults: 10,
							   connections:{},
							   filtered: true,
							   itemsPerPage: 10,
							   sorted: true,
							   list: members};
			},
			runTest: function() {
				var converter = new lconn.core.PeopleTypeAheadOpenSocialConverter();
				
				var newFeed = converter.convertOpenSocialPeopleTypeAheadFeed(this.osFeed);
				
				doh.t(newFeed.items.length == 2);
				
				var item = newFeed.items[0];
				doh.t(item.name == "Joe Bloggs3");
				doh.t(item.member == "jbloggs3@ie.ibm.com");
				doh.t(item.userid == "ae354");
				
				item = newFeed.items[1];
				doh.t(item.name == "Joe Bloggs4");
				doh.t(item.member == "jbloggs4@ie.ibm.com");
				doh.t(item.userid == "ae355");
				
		    }
		  },
		  
		  /* Tests that a user with no email details is converted correctly. */
		  { name: "noEmailTest",
				osFeed: null,
				setUp: function() {
					var members = [{displayName:"Joe Bloggs3", 
									emails: [],
									id: "urn:lsid:lconn.ibm.com:profiles.person:ae354"}];
					
					this.osFeed = {startIndex: 0,
								   totalResults: 10,
								   connections:{},
								   filtered: true,
								   itemsPerPage: 10,
								   sorted: true,
								   list: members};
				},
				runTest: function() {
					var converter = new lconn.core.PeopleTypeAheadOpenSocialConverter();
					
					var newFeed = converter.convertOpenSocialPeopleTypeAheadFeed(this.osFeed);
					
					doh.t(newFeed.items.length == 1);
					
					var item = newFeed.items[0];
					doh.t(item.name == "Joe Bloggs3");
					doh.t(item.member == "");
					doh.t(item.userid == "ae354");
			    }
		  },
		  
		  /* Tests that a user with multiple email addresses can be handled. */
		  { name: "multipleEmailTest",
				osFeed: null,
				setUp: function() {
					var members = [{displayName:"Joe Bloggs3", 
									emails: [
									    {type:"primary",
									     value:"jbloggs3@ie.ibm.com",primary:true},
									    {type:"alternate",
										     value:"jbloggs3@us.ibm.com",primary:true}
								   	],
									id: "urn:lsid:lconn.ibm.com:profiles.person:ae354"}];
					
					this.osFeed = {startIndex: 0,
								   totalResults: 10,
								   connections:{},
								   filtered: true,
								   itemsPerPage: 10,
								   sorted: true,
								   list: members};
				},
				runTest: function() {
					var converter = new lconn.core.PeopleTypeAheadOpenSocialConverter();
					
					var newFeed = converter.convertOpenSocialPeopleTypeAheadFeed(this.osFeed);
					
					doh.t(newFeed.items.length == 1);
					
					var item = newFeed.items[0];
					doh.t(item.name == "Joe Bloggs3");
					doh.t(item.member == "jbloggs3@ie.ibm.com");
					doh.t(item.userid == "ae354");
			    }
		  },
		  
		  /* Tests that a user with multiple email addresses, none of which are primary can be handled. */
		  { name: "multipleEmailNoPrimary",
				osFeed: null,
				setUp: function() {
					var members = [{displayName:"Joe Bloggs3", 
									emails: [
									    {type:"alternate",
									     value:"jbloggs3@ie.ibm.com",primary:true},
									    {type:"alternate",
										     value:"jbloggs3@us.ibm.com",primary:true}
								   	],
									id: "urn:lsid:lconn.ibm.com:profiles.person:ae354"}];
					
					this.osFeed = {startIndex: 0,
								   totalResults: 10,
								   connections:{},
								   filtered: true,
								   itemsPerPage: 10,
								   sorted: true,
								   list: members};
				},
				runTest: function() {
					var converter = new lconn.core.PeopleTypeAheadOpenSocialConverter();
					
					var newFeed = converter.convertOpenSocialPeopleTypeAheadFeed(this.osFeed);
					
					doh.t(newFeed.items.length == 1);
					
					var item = newFeed.items[0];
					doh.t(item.name == "Joe Bloggs3");
					doh.t(item.member == "jbloggs3@ie.ibm.com");
					doh.t(item.userid == "ae354");
			    }
		  }
	 ]	
);
