/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.VersionStreamRenderer");

dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.bean.Version");
dojo.require("lconn.share.widget.StreamRenderer");
dojo.require("lconn.files.config");

dojo.declare("lconn.share.widget.VersionStreamRenderer", [lconn.share.widget.StreamRenderer], {

   _strings: {},
   minimalPaging: true,
   
   /* If true, the version change summary will be shown */
   displayVersionSummary: true,
   
   /* If null, create date will not be linked */
   generateVersionLink: null,
   
   /* If null, user names will not be linked */
   generateUserLink: null,
   
   /* If null, no View action will be shown */
   generateViewLink: null,
   
   /* If null, no Download action will be shown */
   generateDownloadLink: null,
   
   /* If null, no Restore action will be shown */
   generateRevertLink: null,
   
   /* If null, no Delete action will be shown */
   generateDeleteVersionsLink: null,
   
   _buildItem: function(item) {
      return new lconn.share.bean.Version(item);
   },
   
   render: lconn.share.widget.StreamRenderer.prototype.renderAsTable, /*function(stream, el, data) {

      lconn.share.util.html.removeChildren(el);

      // Create a table to hold our version data
      if (data.xml.getElementsByTagName("entry").length > 0) {
         var d = document;
         var table = d.createElement("table");
            table.className = "lotusTable lotusClear";
            table.cellSpacing = table.cellPadding = 0;
            var tbody = d.createElement("tbody");
            table.appendChild(tbody);
         el.appendChild(table);

         arguments[1] = tbody;
      }

      this.inherited(arguments);
   },*/

   
   renderItem: function(stream, el, data, version, position, isFirst, isLast, existingTr, existingExtra) {
      var file = stream.app.scene.document;
      var versionLabel = lconn.share.util.text.parseInt(version.getVersionLabel());
      if(versionLabel > stream.latestVersionLabel) {
         stream.latestVersionLabel = versionLabel;
         stream.latestVersionId = version.getId();
      }

      var d = document;
      var tr = (existingTr) ? existingTr : d.createElement("tr");
      //if (position % 2 == 1) 
      //   dojo.addClass(tr,"lotusAltRow");
      if (position == 0)
         dojo.addClass(tr, "lotusFirst");
      
      var df = new lconn.share.util.DateFormat(version.getPublished());
      var versionCreated = df.formatByAge(this._strings.DATE.RELATIVE_TIME);
      
      var td = d.createElement("td");
         td.style.verticalAlign = "top";
         td.className = "lotusNowrap lotusFirstCell lotusAlignRight";
         td.appendChild(d.createTextNode(dojo.string.substitute(this._appstrings.VERSIONS.VERSION_NUMBER, [version.getVersionLabel()])));
      tr.appendChild(td);
      
      var a1;
      var canDownload = true;
      if (version.getSize() == 0){
         canDownload = lconn.files.config.actionConfig.isActionAllowed(version.getObjectTypeId(), stream.app.authenticatedUser, "downloadEmptyFile");
      }
      
      if (this.generateFileTypeImage) {
         var td = d.createElement("td");
            td.style.verticalAlign = "top";
            td.className = "lotusNowrap";
            
            var img = d.createElement("img");
            img.alt = "";
            this.generateFileTypeImage(img, lconn.share.util.text.getExtension(version.getName()), 16, version);
               
            if (this.generateDownloadLink && canDownload) {
               var a = a1 = d.createElement("a");
                  a.tabIndex = -1;
                  this.generateDownloadLink(a, version, {file: file});
                  a.removeChild(a.firstChild);
                  a.appendChild(img);
                  img.alt = a.title || "";
                  
                  var altSpan = d.createElement("span");
                  altSpan.className = "lotusAltText";
                  altSpan.appendChild(d.createTextNode(this._strings.CONTENT.DOWNLOAD));
                  a.appendChild(altSpan);
               
               td.appendChild(a);
            }
            else
               td.appendChild(img);
         tr.appendChild(td);
      }
      
      if (this.generateDownloadLink) {
         var td = d.createElement("td");
            td.style.verticalAlign = "top";
            td.className = "lotusNowrap";
            if (canDownload) {
               var a = d.createElement("a");
                  this.generateDownloadLink(a, version, {file: file});
               td.appendChild(a);
               if (this.renderDownloadWarning) {
                  this.renderDownloadWarning(version.getLabel(), d, td, a1);//, a);
                  this.renderDownloadWarning(version.getLabel(), d, td, a);//, a);
               }
            }
         tr.appendChild(td);
      }
      
      var td = d.createElement("td");
         td.style.verticalAlign = "top";
         td.className = "lotusNowrap";
         if (this.generateVersionLink) {
            var a = d.createElement("a");
               this.generateVersionLink(version, a);
               a.title = df.toTimestamp();
               a.appendChild(d.createTextNode(versionCreated));
            td.appendChild(a);
         } 
         else {
            td.title = df.toTimestamp();
            td.appendChild(d.createTextNode(versionCreated));
         }
      tr.appendChild(td);

      var td = d.createElement("td");
         td.className = "lotusNowrap";
         td.style.verticalAlign = "top";
         if (this.generateUserLink) {
            var a = d.createElement("a");
            a.className = "lotusPerson";
            a.appendChild(d.createTextNode(version.getModifier().name));
            this.generateUserLink(version.getModifier(), a);
            td.appendChild(a);
         }  
         else {
            td.appendChild(d.createTextNode(version.getModifier().name));
         }
      tr.appendChild(td);

      if (this.generateViewLink) {
         var td = d.createElement("td");
            td.style.verticalAlign = "top";
            td.className = "lotusNowrap lotusActions";
            if (stream.currentVersionId != version.getId()) {
               var a = d.createElement("a");
                  if (stream.latestVersionLabel != version.getVersionLabel()) {
                    this.generateViewLink(a, stream.ownerId, version.getDocumentId(), version.getId());
                  }
                  else {
                    this.generateViewLink(a, stream.ownerId, version.getDocumentId(), null);
                  }
                  a.appendChild(d.createTextNode(this._strings.CONTENT.VIEW));
               td.appendChild(a);
            }
            else {
               var div = d.createElement("div");
                  div.style.color = "gray";
                  div.appendChild(d.createTextNode(this._strings.CONTENT.VIEW));
               td.appendChild(div);
            }
         tr.appendChild(td);  
      }
      
      var td = d.createElement("td");
         td.className = "lotusNowrap lotusAlignRight";
         td.appendChild(d.createTextNode(lconn.share.util.text.formatSize(version.getSize())));
      tr.appendChild(td);

      if (this.canDelete && version.getPermissions().Delete && this.generateDeleteVersionsLink) {
         var tdDelete = d.createElement("td");
            tdDelete.style.verticalAlign = "top";
            tdDelete.className = "lotusNowrap";
            if (stream.latestVersionLabel != version.getVersionLabel()) {
               var a = d.createElement("a");
               this.generateDeleteVersionsLink(a, version, isLast);
                  a.appendChild(d.createTextNode(this._strings.CONTENT.DELETE));
               tdDelete.appendChild(a);
            }
            else {
               tdDelete.appendChild(d.createTextNode(" "));
            }
         tr.appendChild(tdDelete);
      }

      if (this.canRevert && this.generateRevertLink) {
         var tdRevert = d.createElement("td");
            tdRevert.style.verticalAlign = "top";
            tdRevert.className = "lotusNowrap";
            if (stream.latestVersionLabel != version.getVersionLabel()) {
               var a = d.createElement("a");
                  this.generateRevertLink(version, a);
                  a.appendChild(d.createTextNode(this._strings.CONTENT.REVERT));
               tdRevert.appendChild(a);
            } 
            else {
               tdRevert.appendChild(d.createTextNode(" "));
            }
         tr.appendChild(tdRevert);                     
      }
      
      var td = d.createElement("td");
         td.style.verticalAlign = "top";
         td.style.width = "100%";
         var text = version.getChangeSummary();
         if (this.displayVersionSummary && text && text.length > 0) {
            var div = td.appendChild(d.createElement("div"));
               div.className = "lotusBreakWord";
               lconn.share.util.html.createTextNode(d, div, text);
         }
         else {
            td.appendChild(d.createTextNode(" "));
         }
      tr.appendChild(td);
         
      el.appendChild(tr);
   },
   
   renderError: function(stream, el, data, error) {
      if (error.code == "ItemNotFound")
         error.message = this._appstrings.DOCUMENTCONTENT.ERRORS.DEFAULT.MESSAGES;
      else if (error.code == "AccessDenied")
         error.message = this._appstrings.DOCUMENTCONTENT.ERRORS.ACCESS_DENIED.MESSAGES;
      this.inherited(arguments);
   }
});
