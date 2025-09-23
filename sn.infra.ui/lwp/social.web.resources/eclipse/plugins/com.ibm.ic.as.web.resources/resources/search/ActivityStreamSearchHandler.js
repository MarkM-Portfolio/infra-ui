/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/constants/events"
	], function (declare, events) {
	
		(function(){
		var ActivityStreamSearchHandler = declare("com.ibm.social.as.search.ActivityStreamSearchHandler", null, {
			
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
				topic.publish(events.CLOSEEE);
				topic.publish(events.ASSTREAMFILTERED, true);
				topic.publish(events.PARAMCHANGE, paramsObj, scrollTop);
			},
			
			removeSearch: function(){
				topic.publish(events.UPDATESTATE, []);
				topic.publish(events.ASSTREAMFILTERED, false);
			}
		});
		
		com.ibm.social.as.search.ActivityStreamSearchHandler.getInstance = function(opts) {
			   if(!com.ibm.social.as.search.ActivityStreamSearchHandler._instance)
				   com.ibm.social.as.search.ActivityStreamSearchHandler._instance = new com.ibm.social.as.search.ActivityStreamSearchHandler();
			   return com.ibm.social.as.search.ActivityStreamSearchHandler._instance;
			}
		
		})();
		return ActivityStreamSearchHandler;
	});
