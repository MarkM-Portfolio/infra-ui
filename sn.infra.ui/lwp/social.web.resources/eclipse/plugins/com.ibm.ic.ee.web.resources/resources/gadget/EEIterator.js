/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/dom",
	"dojo/Deferred",
	"ic-ui/controls/ItemIterator"
], function (dojo, declare, dom, Deferred, ItemIterator) {

	/*
	 * Example iterator implementation
	 */
	var EEIterator = declare("com.ibm.social.ee.gadget.EEIterator", ItemIterator, {
	   reset: function(items) {
	      this._position = 0;
	      this._items = items;
	   },
	   transform: function(item) {
	      //Make every fifth item a deferred
	      if ((this._position %5 == 4) && item.deferred === undefined) {
	         var timer;
	         var dfd = item.deferred = new Deferred(function() {clearTimeout(timer);});
	         timer = setTimeout(function() {
	            dfd.callback({title: item.activityObj.appTitle,
	                eventHtml: item.eventHtml,
	                around: dom.byId(item.around),
	                activityObj: item.activityObj,
	                gadgetXmlUrl: item.gadgetXmlUrl
	         });
	         }, 2000);
	      }
	      else {
	         item = {title: item.activityObj.appTitle,
	            around: dom.byId(item.around),
	            activityObj: item.activityObj,
	            gadgetXmlUrl: item.gadgetXmlUrl,
	            eventHtml: item.eventHtml,
	            isPublic: item.isPublic,
	            isLoggedIn: item.isLoggedIn
	         };
	      }
	      return item;
	   }
	});
	return EEIterator;
});
