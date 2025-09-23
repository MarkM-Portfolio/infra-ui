/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.Versions");

dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util.atom");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("com.ibm.social.ee.widget.Stream");
dojo.require("com.ibm.social.ee.widget.VersionStreamRenderer");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("com.ibm.social.ee.widget.Versions",[com.ibm.social.ee.widget.Stream], {

   templatePath: dojo.moduleUrl("com.ibm.social.ee","widget/templates/VersionStream.html"),
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

   _strings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").VERSIONS,
   msgNoData: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").VERSIONS.NO_VERSIONS,

   postMixInProperties: function() {
      this.pagingSize = this.pageSize;
      var dsConstructor = dojo.getObject(this.dsConstructor);
      this.data = { dataStore: new dsConstructor({ url: this.url, net: this.net}),
         paging: new com.ibm.social.ee.widget.StreamPaging({pageSize: this.pagingSize}), itemByPosition: [] };

      this.renderer = new com.ibm.social.ee.widget.VersionStreamRenderer({
         _strings: this._strings,
         canRevert: this.canRevert,
         canDelete: this.canDelete,
         displayVersionSummary: this.displayVersionSummary,
         generateVersionLink: this.generateVersionLink,
         generateUserLink: this.generateUserLink,
         generateViewLink: null,
         generateDownloadLink: this.displayDownloadVersion ? dojo.hitch(this, this.generateDownloadLink) : null,
         generateDownloadIconLink: dojo.hitch(this, this.generateDownloadIconLink)
      });
      this.inherited(arguments);
   },

   postCreate: function() {
      this.inherited(arguments);
      this.latestVersionLabel = com.ibm.social.incontext.util.text.parseInt(this.latestVersionLabel);
      this.currentVersionLabel = com.ibm.social.incontext.util.text.parseInt(this.currentVersionLabel);
      this.deleteFrom = com.ibm.social.incontext.util.text.parseInt(this.deleteFrom);
      
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
      var d = dojo.doc;
      var ds = this.data.dataStore;
      var params = {"errorPage":true};
      a.href = com.ibm.social.incontext.util.uri.rewriteUri(ds.getValue(version, "urlDownload"), params);      
      a.title = dojo.string.substitute(this._strings.CONTENT.DOWNLOAD_TOOLTIP, [com.ibm.social.incontext.util.text.formatSize(ds.getValue(version, "size"))]);
      a.appendChild(d.createTextNode(this._strings.CONTENT.DOWNLOAD));
   },
   
   generateDownloadIconLink: function (a, version) {
      var d = dojo.doc;
      var ds = this.data.dataStore;
      var params = {"errorPage": true};
      a.href = com.ibm.social.incontext.util.uri.rewriteUri(ds.getValue(version, "urlDownload"), params);
      var downloadText = dojo.string.substitute(this._strings.CONTENT.DOWNLOAD_TOOLTIP, [com.ibm.social.incontext.util.text.formatSize(ds.getValue(version, "size"))]); 
      a.title = downloadText;
      var ext = com.ibm.social.incontext.util.text.getExtension(ds.getValue(version, "label"));
        var img = dojo.create("img", { className: "lconn-ftype16 lconn-ftype16-" + ext, alt: downloadText, src: dojo.config.blankGif }, a);        
   }
});