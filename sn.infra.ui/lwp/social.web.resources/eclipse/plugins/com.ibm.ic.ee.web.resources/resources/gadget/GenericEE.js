/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/query",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/string",
	"dojo/text!ic-ee/gadget/templates/genericee.html",
	"dojo/topic",
	"ic-ee/gadget/_HistoryMixin",
	"ic-ee/gadget/_EEGadgetWidget",
	"ic-ee/track/generic",
	"ic-core/globalization/bidiUtil",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/html",
	"ic-incontext/util/misc",
	"ic-incontext/util/text"
], function (dojo, query, declare, lang, domAttr, domConstruct, string, template, topic, _HistoryMixin, _EEGadgetWidget, generic, bidiUtil, DateFormat, html, misc, text) {

	(function(){
	
	var g = com.ibm.social.ee.gadget;
	
	var GenericEE = declare("com.ibm.social.ee.gadget.GenericEE", 
	     [g._EEGadgetWidget, 
	      g._HistoryMixin], {
	   templateString: template,
	
	   context: null,
	   
	   loadData: function () {
	      this.initializeUI();
	      this.onLoaded();
	   },
	   
	   postMixInProperties: function() {
	      this.inherited(arguments);
	      if (!this.context.itemUrl) {
	         this.context.itemUrl = "javascript:;";
	      }
	      if (!this.context.iconUrl) {
	         this.context.iconUrl = "";
	      }
	   },
	
	   initializeUI: function () {
	      this.inherited(arguments);
	      this.setTitle();
	      this.setContentData();      
	      this.initializeHistoryTab();
	      var dfd = this.initializeHistory(); dfd.addCallback(lang.hitch(this, function() {
	         this.onSizeChange();
	      }));
	      // Bidi support
	 	 bidiUtil.enforceTextDirectionOnPage(this.titleNode.parentNode);
	      this.notifyLoaded();
	   },
	   
	   // History
	   getHistoryTab: function() { return this.historyTabContainer; },
	   getHistoryContainer: function() { return this.historyCtnr; },     
	   getId: function() { return this.context.id; },
	   
	   notifyLoaded: function () {
	      topic.publish("social/ee/generic/load", this.context, this.network, this.routes.oauth);
	   },
	   _removeATags: function(htmlText){
	
	      var container = domConstruct.create("div", {innerHTML: htmlText});
	
	      query("a", container).forEach(function(node, index, arr) {
	          var content = node.innerHTML;
	          domConstruct.place(content, node, "replace");
	      });
	
	      return container.innerHTML;
	   },
	
	   setTitle: function() {
	      var tooltipTitle = html.decodeHtml(this.context.title) || this.nls.generic.untitled;
	      domAttr.set(this.titleNode, "title", string.substitute(this.nls.generic.titleTooltip, {app: tooltipTitle}));
	      var title = this.context.title || this.context.eventTitle || this.nls.generic.untitled;
	       title = this._removeATags(title);
	      this.titleNode.innerHTML = title;
	      text.breakStringHTML(this.titleNode);
	      
	      if (!this.context.iconUrl)
	         this.iconNode.style.display = "none";
	   },
	   setContentData: function() {
	      var htmlData = this.context.summary;
		   if(htmlData) {
	         var ca = this.contentArea;
	         var span = domConstruct.create("span");
	             span.innerHTML = htmlData;
	             query("a", span).attr("target", "_blank");
	             text.breakStringHTML(span, 15);
	         ca.appendChild(span);
	         ca.style.display = "";
		   }
	   }
	});
	
	})();
	return GenericEE;
});
