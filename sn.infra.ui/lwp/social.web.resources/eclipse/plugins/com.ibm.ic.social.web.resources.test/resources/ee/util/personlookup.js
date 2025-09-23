/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/dom-construct",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/json",
	"dojo/on",
	"dojo/request",
	"dojo/Deferred",
	"ic-ui/controls/AutocompleteDataStore",
	"ic-ui/controls/AutocompleteInput",
	"ic-ui/controls/AutocompleteMenu"
], function (dojo, domConstruct, declare, lang, dom, JSON, on, request, Deferred, AutocompleteDataStore, AutocompleteInput, AutocompleteMenu) {

	(function () { 
		
		declare("com.ibm.social.test.ee.util.personlookup.PersonStore", AutocompleteDataStore, {
		     requestDelay: 200,
	        cachedRequestDelay: 50,
	        maximumResultsDelay: 1000,
	        constructor: function (_profilesUrl) {
	        	   this.profilesUrl = _profilesUrl;
	        },
		     getQueryResults: function (kwArgs) {
		     	   var dfd = new Deferred();
		        	request(this.profilesUrl + "/html/nameTypeahead.do?count=10&extended=false&lang=en_us&name=" + encodeURIComponent(kwArgs.query), {method: "GET", handleAs: "text", handle: function (result) {
		        	   	try {
		        	   	var json = result.trim();
		        	   	json = json.substring(2, json.length-2);
		        	   	var obj = JSON.parse(json);
		        	   	dfd.callback(obj.items || []);
		        	   	} catch (e) {
		        	   		console.log("Error: ", e);
		        	   	}
		        	   }});
		        	return dfd;
		     }
		});	
		var lookup = com.ibm.social.test.ee.util.personlookup;	
		lang.mixin(lookup, {
			createPersonTypeahead: function(textId, profilesUrl, selectFunction) {
				var node = dom.byId(textId);
			   var ds = new lookup.PersonStore(profilesUrl);
			   var menu = new AutocompleteMenu({
			      store: ds,
			      updateItem: function(item, newNode, store) {
	               domConstruct.empty(newNode);
	               domConstruct.create("img", { src: profilesUrl + "/photo.do?userid=" + store.getValue(item, "userid"), 
	                                    style: { width: "32px", height: "32px" } }, newNode);
	               domConstruct.create("span", { innerHTML: store.getValue(item, "name") }, newNode);
	            }
			   });
			  var input = new AutocompleteInput({
	            searchDelay: 2000,
	            store: ds,
	            renderer: menu,
	            valueOnSelect: "name",
	            initRenderer: function() {
	               menu.parent = input;
	               menu.around = input.domNode;
	               return menu;
	            }
	         }, node);
	         on(menu, "Select", lang.hitch(input, "onSelect"));
	         if (selectFunction)
	            on(menu, "Select", lang.hitch(null, selectFunction));   
			}		
		});	
	})();
	
	return com.ibm.social.test.ee.util.personlookup;
});
