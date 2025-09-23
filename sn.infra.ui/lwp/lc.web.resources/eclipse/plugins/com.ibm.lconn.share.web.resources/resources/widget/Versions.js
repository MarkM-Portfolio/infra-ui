/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.Versions');
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.bean.File");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.files.util.HtmlMessage");
dojo.require("lconn.share.bean.Version");
dojo.require("lconn.share.widget.Stream");
dojo.require("lconn.share.widget.VersionStreamRenderer");

dojo.declare("lconn.share.widget.Versions",[lconn.share.widget.Stream], {

   templatePath: dojo.moduleUrl("lconn.share","widget/templates/VersionStream.html"),
   additionalClasses: "",
   
   url: null,

   loadOnStartup: false,
   pageSize: dojo.getObject("lconn.share.config.services.versions.pageSize") || 20,

   /* Current version being viewed - can be null */
   currentVersionId: null,
   currentVersionLabel: null,
   
   /* Most recent version that exists - should never be null */
   latestVersionId: null,
   latestVersionLabel: null,

   /* Has restore permissions */
   canRevert: false,

   /* Display change summary */
   displayVersionSummary: false,
   
   /* If true and canRevert==true, a "Restore" link will be shown */
   displayRevertVersion: false,
   
   /* If true, a "Download" link will be shown */
   displayDownloadVersion: false,

   /* If true, a "Compare [X] to [Y]" section will be shown */
   displayCompareVersions: false,
   
   /* Defaults for from/to selection boxes */
   compareFrom: null,
   compareTo: null,

   /* If true and has delete permission on the version, a "Delete" link will be shown */
   displayDeletePriorVersions: false,

   _strings: {},
   
   postMixInProperties: function() {
      this._strings.JUMP_TO_PAGE = this._appstrings.CONTENT.JUMP_TO_PAGE;
      this._strings.OF_PAGES = this._appstrings.CONTENT.OF_PAGES;
      this._strings.JUMP_TO_PAGE_ALT = this._appstrings.CONTENT.JUMP_TO_PAGE_ALT;
      this.msgNoData = this._strings.NO_VERSIONS;

      if (typeof this.url == "function") {
         this.url = this.url({isPersonalFilesInCommunity: this.isPersonalFilesInCommunity, page: 1, pageSize: this.pageSize, fetchAcl: true, preventCache: !!dojo.isIE});
      }

      this.renderer = new lconn.share.widget.VersionStreamRenderer({
         _strings: this._strings,
         _appstrings: this._appstrings,

         canRevert: this.canRevert,
         canDelete: this.displayDeletePriorVersions,

         displayVersionSummary: this.displayVersionSummary,

         generateDeleteVersionsLink: dojo.hitch(this, this.generateDeleteVersionsLink),
         generateFileTypeImage: this.generateFileTypeImage,
         generateVersionLink: null,
         generateUserLink: this.generateUserLink,
         generateViewLink: this.generateViewLink,
         renderDownloadWarning: this.renderDownloadWarning,
         generateDownloadLink: this.displayDownloadVersion ? dojo.hitch(this, this.generateDownloadLink) : null,
         generateRevertLink: this.displayRevertVersion ? dojo.hitch(this, this.generateRevertLink) : null
      });
      this.inherited(arguments);
   },
   
   postCreate: function() {
      this.inherited(arguments);             
   
      this.latestVersionLabel = lconn.share.util.text.parseInt(this.latestVersionLabel);
      this.currentVersionLabel = lconn.share.util.text.parseInt(this.currentVersionLabel);
      this.compareFrom = lconn.share.util.text.parseInt(this.compareFrom);
      this.compareTo = lconn.share.util.text.parseInt(this.compareTo);
      
      if (this.displayCompareVersions) {
         this.compareFrom = this.compareFrom || this.currentVersionLabel || this.latestVersionLabel;
         this.compareTo = this.compareTo || (this.compareFrom - 1);

         if (this.compareFromNode)
            dojo.connect(this.compareFromNode, "onchange", dojo.hitch(this, this.updateCompareFrom, null, true));
         if (this.compareToNode)
            dojo.connect(this.compareToNode, "onchange", dojo.hitch(this, this.updateCompareTo, null));
         if (this.compareLink) {
            var fromFunc = dojo.hitch(this, function(){ return this.compareFrom; });
            var toFunc = dojo.hitch(this, function(){ return this.compareTo; });
            this.generateCompareLink(this.compareLink, this.ownerId, this.docId, fromFunc, toFunc);
         }
      }
      
      if (this.versions) {
         this.domNode.style.display="";
         this.data = this.versionData = this.versions.data;
         this.update();         
      } 
      else if (this.loadOnStartup) {
         this.update();
      } 
      else {
         this.domNode.style.display="";           
      }
   },

   onVisible: function() {
      if (!this.data) {
         this.update();
      }
   },

   onUpdate: function(data) {
      var entries = data.xml.getElementsByTagName("entry");
      var versions = dojo.map(
         entries,
         function(e) {return new lconn.share.bean.Version(e);}
      );

      this.versions = {
         sI: data.paging.startIndex || 1,
         total: Math.max(data.paging.total, versions.length),
         list: versions,
         data: data
      };
      
      
      if (this.compareNode) {
         if (this.displayCompareVersions && this.versions.total > 1) {
            this.compareNode.style.display = "";
            this.updateCompareFrom(null, false);
         }
         else {
            this.compareNode.style.display = "none";
         }
      }
      
      this.onUpdateCount(this.versions.total);
   },
   onUpdateCount: function(count) {},
         
   updateCompareFrom: function(value, changeCompareTo) {
      var max = this.latestVersionLabel;
      var min = (this.latestVersionLabel - this.versions.total + 2);
      var selected = lconn.share.util.text.parseInt(value || this.compareFromNode.value || this.compareFrom);

      if (min > max)
         min = max;
      if (selected > max)
         selected = max;
      if (selected < min)
         selected = min;
         
      var compareTo;
      
      if (min != this.compareFromMin || max != this.compareFromMax || selected != this.compareFrom || selected != this.compareFromNode.value) {
         var d = document;
      
         while (this.compareFromNode.firstChild) this.compareFromNode.removeChild(this.compareFromNode.firstChild)
         
         for(var i = max; i >= min; i--) {
            var option = d.createElement("option");
               option.value = i;
               option.appendChild(d.createTextNode(dojo.number.format(i)));
               if (i == selected)
                  option.selected = "selected";
            this.compareFromNode.appendChild(option);
         }
         
         this.compareFromMin = min;
         this.compareFromMax = max;
         this.compareFrom = selected;

         if (changeCompareTo)
            compareTo = selected - 1;
      }
      
      this.updateCompareTo(compareTo);
   },
      
   updateCompareTo: function(value) {
      var max = this.compareFrom - 1;
      var min = this.latestVersionLabel - this.versions.total + 1;
      var selected = lconn.share.util.text.parseInt(value || this.compareToNode.value || this.compareTo || (this.compareFrom - 1));

      if (min > max)
         min = max;
      if (selected > max)
         selected = max;
      if (selected < min)
         selected = min;
         
      if (min != this.compareToMin || max != this.compareToMax || selected != this.compareTo || selected != this.compareToNode.value) {
         var d = document;
      
         while (this.compareToNode.firstChild) this.compareToNode.removeChild(this.compareToNode.firstChild)
         
         for(var i = max; i >= min; i--) {
            var option = d.createElement("option");
               option.value = i;
               option.appendChild(d.createTextNode(dojo.number.format(i)));
               if (i == selected)
                  option.selected = "selected";
            this.compareToNode.appendChild(option);
         }
         
         this.compareToMin = min;
         this.compareToMax = max;
         this.compareTo = selected;
      }
   },


   generateDownloadLink: function(a, version, opt) {
      opt = opt || {};
      var d = document;
      a.title = dojo.string.substitute(this._appstrings.DOCUMENTCONTENT.DOWNLOAD_TOOLTIP_V, [lconn.share.util.html.formatFilename(version.getLabel()), lconn.share.util.text.formatSize(version.getSize())]);
      a.appendChild(d.createTextNode(this._strings.CONTENT.DOWNLOAD));
      dojo.addClass(a, "lconnDownloadable");
      a.href = version.getUrlDownload();
      dojo.connect(a, "onclick", dojo.partial(function(file, opt, event){
         if (event) dojo.stopEvent(event);
         lconn.files.scenehelper.downloadFile(file, opt);
      }, version, {app: this.app, file: opt.file, version: version, nls: this.app.nls}));
   },

   generateCompareLink: function(a, ownerId, docId, fromFunc, toFunc) {
      a.href = "javascript:;";
      dijit.setWaiRole(a, "button");
      dojo.connect(a, "onclick", dojo, "stopEvent");
      dojo.connect(a, "onclick", null, dojo.hitch(this, this.compareVersions, ownerId, docId, fromFunc, toFunc));
   },


   generateRevertLink: function(version, a) {
      a.href = "javascript:;";
      dojo.connect(a, "onclick", dojo, "stopEvent");
      dojo.connect(a, "onclick", null, dojo.hitch(this, this.revertVersion, version));
      dojo.addClass(a, "lotusAction");
      dijit.setWaiRole(a, "button");
   },
   revertVersion: function(version) {
      var documentId = version.getDocumentId();
      var versionId = version.getId();
      var revisionNum = version.getVersionLabel();
      var df = new lconn.share.util.DateFormat(version.getUpdated());
      var versionCreated = df.toTimestamp(this._strings.DATE.RELATIVE_TIME);
      var modifier = version.getModifier().name;

      this.revertTo(documentId, versionId, revisionNum, versionCreated, modifier, this.ownerId);
   },
   revertTo: function(documentId, versionId, revisionNum, versionCreated, modifier, ownerId) {
      lconn.share.util.html.confirm(dojo.string.substitute(this._strings.REVERT_CONFIRM, [revisionNum, versionCreated, modifier]), 
         dojo.hitch(this, "_revertTo", documentId, versionId, revisionNum, ownerId), null, false, this._strings.REVERT_TITLE);
   },
   _revertTo: function(documentId, versionId, revisionNum, ownerId) {
      var doc = lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE, [lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
      var entry = doc.documentElement;

         var change = lconn.share.util.dom.createElementNS(doc,"changeSummary",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
            change.appendChild(doc.createTextNode(dojo.string.substitute(this._strings.REVERT_DESCRIPTION, [dojo.number.format(revisionNum)])));
         entry.appendChild(change); 

         var version = lconn.share.util.dom.createElementNS(doc,"versionUuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
            version.appendChild(doc.createTextNode(versionId));
         entry.appendChild(version);

      var postBody = lconn.share.util.dom.serializeXMLDocument(doc, true);
           
      var theUrl = this.app.routes.getFileInfoServiceUrl(documentId, {submit:true, createVersion: true});

      this.net.putXml({
         url: theUrl,
         postData: postBody,
         requireData: false,
         headers: {"Content-Type":"application/atom+xml; charset=\"UTF-8\""},
         handle: dojo.hitch(this, this.handleRevertVersion)
      });
   },
   handleRevertVersion: function(response, ioArgs) {
      if (response instanceof Error)
         this.onRevertVersionError(response);
      else{
         this.onRevertVersion();
         var entry = response.firtChild || response.documentElement;
         var file = lconn.share.bean.File.createBean(entry);
         if (file.isPending()){
            var m = new lconn.files.util.HtmlMessage(this._strings.REVERT.INFO_SUCCESS_PRE_MODERATION, this.app, {success: true, name: lconn.share.util.html.formatFilename(file.getTitle())});
         }else {
            var m = new lconn.files.util.HtmlMessage(this._strings.REVERT.INFO_SUCCESS, this.app, {success: true, file: file, link: lconn.files.util.HtmlMessage.prototype.FILE_LINK});
         }
         var e = {filePending: file.isPending(), fileChange: true, file: file, messages: m};
         dojo.publish("lconn/share/action/completed", [e, this]);
      }
   },
   onRevertVersionError: function(error) {
      var msg;
      if (error.code == "AccessDenied")
         msg = this._strings.REVERT.ERROR_ACCESS_DENIED;
      else if (error.code == "QuotaViolation") {
         var neededSpace = lconn.share.util.text.parseInt(error.uploadSize - (error.libraryQuota - error.librarySize), "??");
         msg = dojo.string.substitute(this._strings.REVERT.ERROR_QUOTA_VIOLATION,[lconn.share.util.text.formatSize(neededSpace)]);
      }
      else if (error.code == "ItemNotFound")
         msg = this._strings.REVERT.ERROR_NOT_FOUND;
      else if (error.code == "ItemExists")      
         msg = this._strings.REVERT.ERROR_NAME_EXISTS;                        
      else if(error.code == "cancel")
         msg = this._strings.REVERT.ERROR_CANCEL;
      else if (error.code == "timeout")      
         msg = this._strings.REVERT.ERROR_TIMEOUT;         
      else if (error.code == "unauthenticated") {      
         // do nothing         
      }
      else if (error.code == "ContentMaxSizeExceeded") {
         var text = dojo.string.substitute(this._strings.REVERT.ERROR_MAX_CONTENT_SIZE, [lconn.share.util.text.formatSize(lconn.share.config.services.maxPageSize)]);
         msg = text;
      }
      else
         msg = this._strings.REVERT.GENERIC_ERROR;
         
      if (msg)
         lconn.share.util.html.alert(msg);
   },
   
   onRevertVersion: function() {
      this.data = this.versions = null;
   },

   generateDeleteVersionsLink: function(a, version, isOldest) {
      a.href = "javascript:;";
      dojo.connect(a, "onclick", dojo, "stopEvent");
      dojo.connect(a, "onclick", null, dojo.hitch(this, this.deleteVersions, version, isOldest));
      dojo.addClass(a, "lotusAction");
      dijit.setWaiRole(a, "button");
   },

   deleteVersions: function(version, isOldest) {
      lconn.share.requireAsync("lconn.files.action.impl.DeleteVersion").addCallback(this, function() {      
         new lconn.files.action.impl.DeleteVersion(this.app).execute(version, {isOldest: isOldest});
      });
      
   }
});
