/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang"
], function (array, declare, lang) {

	var OperationMonitor = declare("com.ibm.social.incontext.util.OperationMonitor", null, {
	
	   url: null,
	   timeout: 10,
	   interval: 30,
	   maxFailures: 1,
	   attempts: 2,
	   maxAttempts: -1,
	   validStatusCodes: [200],
	   dontAlterUrl: false,
	   monitorStarted: false,
	   routes: null, //Expecting an instance of Routes
	   net: null, //Expecting an instance of Network
	
	   constructor: function(opt) {
	      lang.mixin(this,opt);
		},
	
	   start: function() {
	   	this.cancel();
	   	this.monitorStarted = true;
		   this.failed = this.attempts = 0;
	      this._scheduled = setTimeout(lang.hitch(this, this._connect), this.interval*1000);
	   },
	   cancel: function() {
	      this.monitorStarted = false;
	      if (this._xhr) this._xhr.cancel();
	      this._xhr = null;
	      if (this._scheduled) {
	         clearTimeout(this._scheduled);
	         this._scheduled = null;
	      }
	   },
	   onInterval: function(response,ioArgs) {},
	   onFailure: function(failures) {},
	
	   isCancel: function(response, ioArgs) {
	      return (response && response.dojoType == "cancel");
	   },
	   isFailure: function(response, ioArgs) {
	      if (ioArgs.xhr && array.indexOf(this.validStatusCodes, ioArgs.xhr.status) != -1)
	         return false;
	      return (!response || response instanceof Error);
	   },
	   _connect: function() {
	      if (this.monitorStarted) {
	         this.cancel();
	         this.monitorStarted = true;
	         this.attempts++;
	         var opts = {
	            url: this.dontAlterUrl ? this.url : this.routes.getMonitorUrl(this.url),
	            handleAs: "text",
	            noStatus: true,
	            timeout: this.timeout*1000,         
	            hideLoadingMsg: true,
	            handle: lang.hitch(this, this._complete)
	         };            
	         lang.mixin(opts, this.ioArgs || {});
	         this._xhr = this.net.get(opts);
	      }
	   },
	   _complete: function(response, ioArgs) {
	      this._xhr = null;
	      if (this.isCancel(response, ioArgs)) {
	         // stop monitoring
	         //console.log("OperationMonitor::complete DEBUG monitor canceled");
	         return;
	      }
	      else if (this.isFailure(response, ioArgs)) {
	         // any other reason implies we failed
	         // increment times failed
	         // schedule monitor for next interval
	         this.failed++;
	         //console.log("OperationMonitor::complete DEBUG monitor failed");
	         if (this.failed >= this.maxFailures) {
	         	this.onFailure(this.failed);
	         	return;
	        	}
	      }
	      else {
	         // reset number of successive failures, schedule monitor for next interval
	         this.failed = 0;
	         if (this.onInterval)
	            this.onInterval(response,ioArgs);
	         //console.log("OperationMonitor::complete DEBUG monitor succeeded");
	      }
	      // don't end on a failure
	      if (this.maxAttempts > 0 && this.attempts >= this.maxAttempts && this.failed < 1) {
	         //console.log("OperationMonitor::complete DEBUG max attempts reached");
	         return;
	      }
	      this._scheduled = setTimeout(lang.hitch(this, this._connect), this.interval*1000);
	   }
	});
	return OperationMonitor;
});
