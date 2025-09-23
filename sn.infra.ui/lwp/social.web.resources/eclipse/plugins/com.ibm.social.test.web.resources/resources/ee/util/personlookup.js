/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.ee.util.personlookup");

dojo.require("com.ibm.oneui.controls.AutocompleteInput");
dojo.require("com.ibm.oneui.controls.AutocompleteMenu");
dojo.require("com.ibm.oneui.controls.AutocompleteDataStore");
dojo.require("com.ibm.oneui.controls._caret");

(function () { 
	
	dojo.declare("com.ibm.social.test.ee.util.personlookup.PersonStore", [com.ibm.oneui.controls.AutocompleteDataStore], {
	     requestDelay: 200,
        cachedRequestDelay: 50,
        maximumResultsDelay: 1000,
        constructor: function (_profilesUrl) {
        	   this.profilesUrl = _profilesUrl;
        },
	     getQueryResults: function (kwArgs) {
	     	   var dfd = new dojo.Deferred();
	        	dojo.xhrGet({
	        	   url: this.profilesUrl + "/html/nameTypeahead.do?count=10&extended=false&lang=en_us&name=" + encodeURIComponent(kwArgs.query),
	        	   handleAs: "text",
	        	   handle: function (result) {
	        	   	try {
	        	   	var json = result.trim();
	        	   	json = json.substring(2, json.length-2);
	        	   	var obj = dojo.fromJson(json);
	        	   	dfd.callback(obj.items || []);
	        	   	} catch (e) {
	        	   		console.log("Error: ", e);
	        	   	}
	        	   }
	        	});
	        	return dfd;
	     }
	});	
	var lookup = com.ibm.social.test.ee.util.personlookup;	
	dojo.mixin(lookup, {
		createPersonTypeahead: function(textId, profilesUrl, selectFunction) {
			var node = dojo.byId(textId);
		   var ds = new lookup.PersonStore(profilesUrl);
		   var menu = new com.ibm.oneui.controls.AutocompleteMenu({
		      store: ds,
		      updateItem: function(item, newNode, store) {
               dojo.empty(newNode);
               dojo.create("img", { src: profilesUrl + "/photo.do?userid=" + store.getValue(item, "userid"), 
                                    style: { width: "32px", height: "32px" } }, newNode);
               dojo.create("span", { innerHTML: store.getValue(item, "name") }, newNode);
            }
		   });
		  var input = new com.ibm.oneui.controls.AutocompleteInput({
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
         dojo.connect(menu, "onSelect", input, "onSelect");
         if (selectFunction)
            dojo.connect(menu, "onSelect", null, selectFunction);   
		}		
	});	
})();
