/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/text!ic-ee/widget/templates/DownloadInfo.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-ee/widget/Stream",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/atom",
	"ic-incontext/util/dom",
	"ic-incontext/util/text",
	"ic-incontext/util/uri"
], function (dojo, declare, lang, windowModule, domClass, domConstruct, template, _Templated, _Widget, Stream, DateFormat, atom, dom, text, uri) {

	var DownloadInfo = declare("com.ibm.social.ee.widget.DownloadInfo",Stream, {
	
	   templateString: template,
	   additionalClasses: "",
	   url: null,
	
	   loadOnStartup: true,
	   pageSize: 100,
	
	   category: "version", 
	
	   _strings: i18nsocialEEStrings.DOWNLOAD_INFO,
	   
	
	   postMixInProperties: function() {
	      this.msgNoData = this._strings.FILE.EMPTY;
	      
	      this.pagingSize = this.pageSize;
	      var dsConstructor = lang.getObject(this.dsConstructor);
	      this.data = { dataStore: new dsConstructor({ url: this.url, net: this.net}),
	         paging: new com.ibm.social.ee.widget.StreamPaging({pageSize: this.pagingSize}), itemByPosition: [] };
	
	      this.renderer = new com.ibm.social.ee.widget.DownloadInfoRenderer({
	         _strings: this._strings,
	         generateUserLink: this.generateUserLink
	      });
	      this.inherited(arguments);
	   },
	
	   postCreate: function() {
	      this.inherited(arguments);
	      this.domNode.style.overflow="auto";
	      this.refresh();
	   },
	   onVisible: function() {
	      if (!this._loaded) {
	         this._loaded = true;
	         this.refresh();
	      }
	   }
	});
	
	declare("com.ibm.social.ee.widget.DownloadInfoRenderer",com.ibm.social.ee.widget.StreamRenderer, {
	   
	   minimalPaging: true,
	   
	   renderEmpty: function(stream, el, data) {
	      var d = windowModule.doc;
	      domConstruct.empty(el);
	      
	      var div = domConstruct.create("div", {className: "qkrEmpty"}, el);
	         var msg;
	         if (stream.msgNoData) {        
	            msg = stream.msgNoData;
	         }
	         div.appendChild(d.createTextNode(msg || "Empty"));
	   },
	   render: function(stream, el, data) {
	      data.itemById = {};
	      this.baseUrl = stream.baseUrl;
	      domConstruct.empty(el);
	
	      var d = windowModule.doc;
	      var table = domConstruct.create("table", {className: "lotusTable", style: "width: auto"}, el);
	         var tbody = domConstruct.create("tbody", null, table);
	
	      arguments[1] = tbody;
	
	      this.inherited(arguments, [stream, tbody, data]);
	   },
	   
	   renderItem: function(stream, el, data, item, position, isFirst, isLast, existingTr, existingExtra) {
	      var ds = data.dataStore;
	      var d = windowModule.doc;      
	      var df = new DateFormat(ds.getValue(item, "time"));
	      df.version = function () { return ds.getValue(item, "versionNumber"); };
	      var versionCreated = df.formatByAge(this._strings.VERSION, d); 
	      
	      //Create row
	      var tr = domConstruct.create("tr", null, el);      
	         //Add Person column
	         var td = domConstruct.create("td", { className: "lotusFirstCell" }, tr);           
	            if (this.generateUserLink) {
	               var div = domConstruct.create("div", null, td);
	                  this.generateUserLink(div, item);
	            }
	            else
	               td.appendChild(d.createTextNode(ds.getValue(item, "name")));
	         // Add version download info
	         td = domConstruct.create("td", { className: "lotusAlignRight", title: df.toTimestamp() }, tr);
	             if (ds.getValue(item, "versionId") != stream.currentVersionId)
	                domClass.add(td, "lotusInactive");
	             td.appendChild(d.createTextNode(versionCreated));        
	  }  
	});
	return DownloadInfo;
});
