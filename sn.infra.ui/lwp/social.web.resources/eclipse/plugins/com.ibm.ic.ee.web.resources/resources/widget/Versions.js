/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/_base/config",
	"dojo/dom-construct",
	"dojo/string",
	"dojo/text!ic-ee/widget/templates/VersionStream.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-ee/widget/Stream",
	"ic-ee/widget/VersionStreamRenderer",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/atom",
	"ic-incontext/util/dom",
	"ic-incontext/util/text",
	"ic-incontext/util/uri"
], function (dojo, declare, lang, windowModule, config, domConstruct, string, template, _Templated, _Widget, Stream, VersionStreamRenderer, DateFormat, atom, dom, text, uri) {

	var Versions = declare("com.ibm.social.ee.widget.Versions",Stream, {
	
	   templateString: template,
	   additionalClasses: "",
	
	   url: null,
	
	   loadOnStartup: false,
	   versionCount: 1,
	   pageSize: 10,
	
	   /* Current version being viewed - can be null */
	   currentVersionId: null,
	   currentVersionLabel: null,
	
	   /* Most recent version that exists - should never be null */
	   latestVersionLabel: null,
	
	   /* Has restore permissions */
	   canRevert: false,
	
	   /* Has delete permissions */
	   canDelete: false,
	
	   /* Has edit permissions */
	   canEdit: false,
	
	   /* Display change summary */
	   displayVersionSummary: true,
	
	   /* If true, a "Download" link will be shown */
	   displayDownloadVersion: true,
	
	   /* Default for delete from selection box */
	   deleteFrom: null,
	
	   category: "version",   
	
	   _strings: i18nsocialEEStrings.VERSIONS,
	   msgNoData: i18nsocialEEStrings.VERSIONS.NO_VERSIONS,
	
	   postMixInProperties: function() {
	      this.pagingSize = this.pageSize;
	      var dsConstructor = lang.getObject(this.dsConstructor);
	      this.data = { dataStore: new dsConstructor({ url: this.url, net: this.net}),
	         paging: new com.ibm.social.ee.widget.StreamPaging({pageSize: this.pagingSize}), itemByPosition: [] };
	
	      this.renderer = new VersionStreamRenderer({
	         _strings: this._strings,
	         canRevert: this.canRevert,
	         canDelete: this.canDelete,
	         displayVersionSummary: this.displayVersionSummary,
	         generateVersionLink: this.generateVersionLink,
	         generateUserLink: this.generateUserLink,
	         generateViewLink: null,
	         generateDownloadLink: this.displayDownloadVersion ? lang.hitch(this, this.generateDownloadLink) : null,
	         generateDownloadIconLink: lang.hitch(this, this.generateDownloadIconLink)
	      });
	      this.inherited(arguments);
	   },
	
	   postCreate: function() {
	      this.inherited(arguments);
	      this.latestVersionLabel = text.parseInt(this.latestVersionLabel);
	      this.currentVersionLabel = text.parseInt(this.currentVersionLabel);
	      this.deleteFrom = text.parseInt(this.deleteFrom);
	      
	      this.loadVersions();
	      /*
	
	      if (this.versions) {
	         this.domNode.style.display="";
	         this.data = this.versionData = this.versions.data;
	         if (this.loadOnStartup)
	            this.refresh();
	         else
	            this.update();
	      }
	      else if (this.loadOnStartup) {
	         this.update();
	      }
	      else {
	         this.domNode.style.display="";
	      }
	      */
	   },
	   onVisible: function() {
	      if (!this._loaded) {
	         this._loaded = true;
	         this.refresh();
	      }
	   },
	   loadVersions: function() {
	      if(this.versionCount > 0)
	         this.refresh();
	   },
	   onUpdate: function(data) {
	      if (data && data.paging && data.paging.total)
	         this.onUpdateCount(data.paging.total);
	
	      this.versions = {
	         sI: data.paging.startIndex || 1,
	         total: this.versionCount,
	         list: data.dataStore,
	         data: data
	      };
	   },
	   onUpdateCount: function(count) {this.versionCount = count;},
	   generateDownloadLink: function(a, version) {
	      var d = windowModule.doc;
	      var ds = this.data.dataStore;
	      var params = {"errorPage":true};
	      a.href = uri.rewriteUri(ds.getValue(version, "urlDownload"), params);      
	      a.title = string.substitute(this._strings.CONTENT.DOWNLOAD_TOOLTIP, [text.formatSize(ds.getValue(version, "size"))]);
	      a.appendChild(d.createTextNode(this._strings.CONTENT.DOWNLOAD));
	   },
	   
	   generateDownloadIconLink: function (a, version) {
	      var d = windowModule.doc;
	      var ds = this.data.dataStore;
	      var params = {"errorPage": true};
	      a.href = uri.rewriteUri(ds.getValue(version, "urlDownload"), params);
	      var downloadText = string.substitute(this._strings.CONTENT.DOWNLOAD_TOOLTIP, [text.formatSize(ds.getValue(version, "size"))]); 
	      a.title = downloadText;
	      var ext = text.getExtension(ds.getValue(version, "label"));
	        var img = domConstruct.create("img", { className: "lconn-ftype16 lconn-ftype16-" + ext, alt: downloadText, src: config.blankGif }, a);        
	   }
	});
	return Versions;
});
