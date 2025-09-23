/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.search.ActivityStreamSearchHandler");
dojo.require("dojox.html.entities");

(function(){
dojo.declare("com.ibm.social.as.search.ActivityStreamSearchHandler", null, {
	
	updateStream: function(query, filters, dateReq, scrollTop) {
		if(this.calledUpdateState){
			return;
		}
		var paramsObj = {};
		if(filters){
			paramsObj["filters"] = filters;
		}
		if (dateReq) {
			paramsObj["dateFilter"] = dateReq;
		}
		if (query) {
			paramsObj["query"] = query;
		} else { // someone has hit search with a blank text box - reset the query
			paramsObj["query"] = "";
		}

		// close EE if it's open
		dojo.publish(com.ibm.social.as.constants.events.CLOSEEE);
		dojo.publish(com.ibm.social.as.constants.events.ASSTREAMFILTERED, [true]);
		dojo.publish(com.ibm.social.as.constants.events.PARAMCHANGE, [paramsObj, scrollTop]);
	},
	
	removeSearch: function(){
		dojo.publish(com.ibm.social.as.constants.events.UPDATESTATE, [[]]);
		dojo.publish(com.ibm.social.as.constants.events.ASSTREAMFILTERED, [false]);
	}
});

com.ibm.social.as.search.ActivityStreamSearchHandler.getInstance = function(opts) {
	   if(!com.ibm.social.as.search.ActivityStreamSearchHandler._instance)
		   com.ibm.social.as.search.ActivityStreamSearchHandler._instance = new com.ibm.social.as.search.ActivityStreamSearchHandler();
	   return com.ibm.social.as.search.ActivityStreamSearchHandler._instance;
	}

})();
