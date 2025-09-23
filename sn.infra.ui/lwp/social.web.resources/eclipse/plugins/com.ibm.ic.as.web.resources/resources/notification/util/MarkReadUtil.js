/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
define([
	"dojo/_base/declare",
	"dojo/_base/json",
	"../../util/xhr/XhrHandler",
	"ic-as/util/RouteHelper"
], function (declare, JSON, XhrHandler, RouteHelper) {
	
	/**
	 * Utility class to handle requests to ActivityStream API to mark
	 * items read/unreaD
	 */	
	var MarkReadUtil = declare(null,
	{	
		/**
		 * Mark All notification items as READ only
		 * @return {Promise} the XHR Promise
		 */
		markAllNotificationsRead: function(){
			var apiObj = this.generateModelObject(true);
			var markReadUrl = RouteHelper.getInstance().getMarkAllReadUrl();
			return this.handleAPICall(markReadUrl, apiObj);
		},

		/**
		 * Mark an ActivityStream entry as Read/Unread
		 * @param  {String} id
		 * @param  {Boolean} read
		 * @return {Promise} the XHR Promise
		 */
		markNotificationRead: function(id, read){
			var apiObj = this.generateModelObject(read);
			var markReadUrl = RouteHelper.getInstance().getActivityByIDUrl(id);
			return this.handleAPICall(markReadUrl, apiObj);
		},

		 /**
	     * Handle a request to toggle the current read status of the 
	     */
	    handleAPICall: function(url, modelObj){	    		    		    	
	    	return XhrHandler.xhrPut({
	                url:  url,
	                headers: {
	    				"Content-Type": "application/json; charset=utf-8"
	    			},
	                data: JSON.toJson(modelObj)
	        });	    	   		
	    },

		/**
		 * Take the current activityEntry and convert it for posting to endpoint.
		 * @param  {boolean} readVal determines whether we are marking read=true or unread=false
		 * @return {Obj} The mininmum amount required by the AS API to update the read/unread value
		 */
	    generateModelObject: function(readVal){	    	
	    	var activityEntry = {
	    		connections: {
	    			read: readVal
	    		},
	    		id: "",
	    		actor: {id:""},
	    		verb: "",
	    		object: {id:""}	    		
	    	};
	    	return activityEntry;
	    }
		
	});
	
	MarkReadUtil._Instance = null;
	  
	MarkReadUtil.getInstance = function(init){
		if(MarkReadUtil._Instance == null){
			MarkReadUtil._Instance = new MarkReadUtil();			
	  	}
	  	return MarkReadUtil._Instance;
	}
	
	return MarkReadUtil.getInstance();
	
});