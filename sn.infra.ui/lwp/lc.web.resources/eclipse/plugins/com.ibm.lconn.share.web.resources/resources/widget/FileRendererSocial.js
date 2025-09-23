/* Copyright IBM Corp. 2009, 2018  All Rights Reserved.              */

dojo.provide("lconn.share.widget.FileRendererSocial");

dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.xsl");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.widget.FileRendererCore");
dojo.require("lconn.share.widget.AbstractRendererSocial");
dojo.require("lconn.share.widget.FileRendererPostProcessor");
dojo.require("lconn.share.widget.Tagger");
dojo.require("lconn.share.widget.StreamRendererMultiSelection");
dojo.require("lconn.share.scenehelper");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("lconn.core.svg.svgHelper");

dojo.declare("lconn.share.widget.FileRendererSocial", [lconn.share.widget.FileRendererCore, lconn.share.widget.AbstractRendererSocial, lconn.share.widget.FileRendererPostProcessor, lconn.share.widget.StreamRendererMultiSelection], {
  
   showTags: true,
   showComments: true,
   showDownloads: true,
   showRecommendations: true,
   downloadFilesNodes: "<a><img alt=\"\"><span class=\"lotusAltText\"></span></a>",
   metas: [],

   constructor: function() {
      var metas = [];
      metas.push({
         id: "owner",
         isValid: dojo.hitch(this, function(file){
            var author = file.getAuthor();
            return this.displayOwner && author && author.name;
         }),
         render: dojo.hitch(this, function(app, file, d, el, opts){
            var a = el;
            this.generateLinkToPerson(file.getAuthor(), a);
            a.appendChild(d.createTextNode(file.getAuthor().name));
         })
      });
      metas.push({
         id: "modifier",
         isValid: dojo.hitch(this, function(file){
            var isChanged = (file.getUpdated().getTime() != file.getPublished().getTime()); 
            var modifier = isChanged? file.getModifier() : file.getAuthor();
            return !file.getConfiguration().hideListTime && modifier && modifier.name;
         }),
         render: dojo.hitch(this, function(app, file, d, el, opts){
            var d = document;
            var isChanged = (file.getUpdated().getTime() != file.getPublished().getTime()); 
            var modifier = isChanged? file.getModifier() : file.getAuthor();
            var nls = this._appstrings.DOCUMENTCONTENT;
            var dateStrings = isChanged ? nls.LABEL_UPDATED_OTHER : nls.LABEL_ADDED_OTHER;
            var df = new lconn.share.util.DateFormat(file.getUpdated());
            var text = df.formatByAge(dateStrings);
            lconn.share.util.html.substitute(d, el, text, {
               user: function() {
                  var a = d.createElement("a");
                     a.className = "lotusPerson";
                     a.appendChild(d.createTextNode(modifier.name));
                     this.generateLinkToPerson(modifier, a);
                  return a;
               }
            }, null, this);
            el.title = df.format(dateStrings.FULL);
         })
      });
      metas.push({
         id: "timesDownloaded",
         render: dojo.hitch(this, function(app, file, d, el, opts){
            var nls = this._strings;
            var timesDownloaded = file.getTimesDownloaded();
            if (timesDownloaded > 0){
               el.appendChild(d.createTextNode(dojo.string.substitute((timesDownloaded != 1) ? nls.DOWNLOAD_TOOLTIP_MANY : nls.DOWNLOAD_TOOLTIP_ONE, [dojo.number.format(timesDownloaded)])));
            }else 
               dojo.style(el, {"display": "none"});
         })
      });
      metas.push({
         id: "commentCount",
         render: dojo.hitch(this, function(app, file, d, el, opts){
            var commentCount = file.getCommentCount();
            var nls = this._appstrings;
            if (commentCount > 0){
               el.appendChild(d.createTextNode(dojo.string.substitute((commentCount != 1) ? nls.COMMENTS.COMMENT_COUNT_MANY : nls.COMMENTS.COMMENT_COUNT_ONE,[dojo.number.format(commentCount)])));
            }else 
               dojo.style(el, {"display": "none"});
         })
      });
      this.metas = metas;
   },
   
   _updateItem: function(stream, data, el, item, oldItem, position) {
      var tr = oldItem.element;
      var tbody = tr.parentNode;
      var table = tbody.parentNode;

      var retval = this.inherited(arguments);
      return retval;
   },
   
   _createTrs: function(max, stream, opt) {
     var d = document;
     var parentNode = d.createElement("div");
     var a = [];
     a.push("<tr style=\"display: none;\"><td class=\"lotusFirstCell\" style=\"width:2%;\"/><td class=\"lotusNowrap\" style=\"width:");
     a.push("3%");
     a.push("\">" + this.downloadFilesNodes + "</td>");
     a.push("<td><h4 class=\"lotusBreakWord lotusLeft\"><a class=\"entry-title\" rel=\"bookmark\"><img title=\"\" alt=\"\"></img></a></h4><div class=\"lotusMeta lotusClear\" role=\"list\">");
     if (this.displayOwner)
        a.push("<a class=\"lotusPerson\" role=\"listitem\"></a><span class=\"lotusDivider\" role=\"img\" aria-hidden=\"true\">|</span>");
     a.push("<span role=\"listitem\"></span></div></td>");
     //a.push("<span></span><span class=\"lotusDivider\" role=\"img\" aria-hidden=\"true\">|</span><span></span></div></td>");
     //a.push("<td class=\"lotusNowrap\"><a class=\"entry-content lconnDownloadable\"><img><span class=\"lotusMeta\"></span></a></td>");
     //a.push("<td><span><img><span class=\"lotusMeta\"></span></span></td>");
     a.push("<td></td>");
     if (this.createFavoriteToggle)
        a.push("<td></td>"); // <a><img><span class=\"lotusMeta\"></span></a>
     a.push("<td></td>");

     if (opt.enableShareLink)
        a.push("<td></td>");

     a.push("<td class=\"lotusAlignRight lotusLastCell lotusNowrap lotusTiny\" style=\"cursor:default;width:10%\"><a href=\"javascript:;\"></a></td>");
     a.push("</tr>");
     a.push("<tr class=\"lotusDetails\" style=\"display: none;\"><td class=\"lotusFirstCell\" colSpan=\"2\"><!-- IE --></td><td colSpan=\"");
     a.push(this.createFavoriteToggle ? 5 : 4);
     a.push("\"></td></tr>");
     var t = a.join("");

     a = ["<table cellpadding=\"0\" cellspacing=\"0\" style=\"display:none;\" class=\"lotusTable qkrIcon32\"><tbody>"];
     for (var i=0; i<max; i++)
        a.push(t);
     a.push("</tbody></table>");
     var t = a.join("");
     parentNode.innerHTML = t;
     
     var table = parentNode.firstChild;
     var tbody = table.firstChild;
     var padding = dojo._isBodyLtr() ? "paddingRight":"paddingLeft";
     for (var i=0; i<max; i++) {
        var tr = tbody.childNodes[i*2];
        var trdetails = tr.nextSibling;
        trdetails.id = dijit.getUniqueId("detailsRow");
        
        var td = tr.lastChild;
           var a = td.firstChild;
              a.title = this._strings.VIEW_EXTRA;
              if (a.lastChild) a.removeChild(a.lastChild);
              a.appendChild(d.createTextNode(this._strings.MORE));   
              dojo.connect(a, 'onclick', dojo.hitch(this, this.toggleItem, stream, i));
              dijit.setWaiRole(a, "button");
              dijit.setWaiState(a, "expanded", false);
              dijit.setWaiState(a, "controls", trdetails.id);

        var nodes = tr.childNodes;
        nodes[1].style[padding] = "8px";
        if (i == 0) {
           var c = 2;
           // Icon
           // Filename
           nodes[c++].style.width = "60%";
           // Recommendation
           if (this.showRecommendations) {
              td = nodes[c++];
              td.style[padding] = "20px";
              td.style.width = "5%";
              dojo.addClass(td, "lotusNowrap");
           }
           // Pinning
           if (this.createFavoriteToggle) {
              td = nodes[c++];
              td.style[padding] = "20px";
              td.style.width = "5%";
           }
           
           // Visibility
           td = nodes[c++];
           td.style[padding] = "20px";
           td.style.width = "5%";
           
           // ShareLink
           if (opt.enableShareLink) {
              td = nodes[c++];
              td.style[padding] = "20px";
              td.style.width = "5%";
           }
        }
     }
     return parentNode.firstChild;
   },
   
   _render: function(stream, el, data, opt) {
      var opt = opt || {};
      var items = this._getItems(data.xml);
      var size = (data.paging) 
            ? Math.min(data.paging.size,items.length)
            : items.length;

      if (this.useXslt && size > 0 && items[0].nodeName) {
         this.xsltDetails = this.xsltDetails || dojo.getObject("lconn.share.config.xslt.list.fileDetails");
         /* BUG: Safari 3 will occasionally lose the root documentElement node from the xml document when XSLT transformations
          * are run repeatedly.  Revert to JS rendering when that occurs.
          */ 
         if (this.xsltDetails && dojo.getObject("xml.ownerDocument.documentElement", false, data)) {
            this.renderXslt(stream, el, data);
            return;
         }
      }
      
      var d = document;
      
      var items = this.initData(data);
      
      var max = (data.paging) ? data.paging.size : size;

      var table = el.lastChild;
      
      if (table && (table._view != "details" || table.nodeName.toLowerCase() != "table") 
          || (table.firstChild.childNodes.length != max * 2 && !opt.enableContinuousScrolling )
          || (opt.dataInited != undefined && opt.enableContinuousScrolling)) {
         dojo.empty(el);
         table = null;
      }

      var currentTableChildNodesLenth = 0;
      
      if (!table) {
         table = this._createTrs(max, stream, opt);
         dojo.place( table, el, "first");
         table._view = "details";
         dojo.connect(table, "onmousedown", dojo.hitch(this, "toggleByElement", stream));
         var tbody = table.firstChild;
         dojo.addClass(tbody.firstChild,"lotusFirst");
         el.className = "lconnListView";
         this.emptySelection();
         this.initItemByPosition(items);
      } else if (opt.enableContinuousScrolling ) {
        currentTableChildNodesLenth = table.firstChild.childNodes.length;
        var tableNode = this._createTrs(size, stream, opt);
        var newNodes = tableNode.firstChild.childNodes;
        var newNodesLength = newNodes.length;
        for (var index = 0; index < newNodesLength; index++) {
          dojo.place( newNodes[0], table.firstChild, "last");
        }
        this.appendItemByPosition(items);
      }
      for (var i=0; items!=null&&i<items.length; i++) {
        if(items[i]._isSelected){
            this.appendSelection(items[i]);
        }
      }
      dijit.setWaiRole(table, "presentation");
      if (size > 0) {
         var fragment = d.createDocumentFragment();
         //var newArguments = dojo._toArray(arguments);
         //newArguments[1] = fragment;
         
         this.renderSorting(stream, fragment, data, opt);
         //lconn.share.widget.FileRendererSocial.superclass.renderSorting.apply(this, newArguments);
         
         if (el.firstChild != table) {
            var old = el.replaceChild(fragment, el.firstChild);
            lconn.share.util.html.destroyWidgets(old);
         }
         else
            el.insertBefore(fragment, el.firstChild);
         table.style.display = "";
         table.style.cursor = "default";

         var tbody = table.firstChild;
         for (var i=0; i<size; i++) {
            var tr = tbody.childNodes[currentTableChildNodesLenth + i*2];
            var trdetails = tr.nextSibling;
            this.renderItem(stream, tbody, data, items[i], i, i==0, (i==size-1), tr, trdetails);
            tr.style.display = "";
            lconn.share.scenehelper.applyDndProperty(tr, i + currentTableChildNodesLenth/2, items[i]);
         }
         if (!opt.enableContinuousScrolling ) {
           for (var i=size; i<max; i++) {
             var tr = tbody.childNodes[i*2];
             var trdetails = tr.nextSibling;
             tr.style.display = trdetails.style.display = "none";
          }
         }
         
         lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(stream.domNode);
         this.updatePaging(stream, el, data, opt);
         this.attachDragSource(table, stream, data);
      }
      else {
         this.renderEmpty(stream, el, data);
      }
   },
      
   renderXslt: function(stream, el, data) {
      try {
         var p = lconn.share.widget.FileRendererSocial._detailsXslt;
         if (!p) {
            lconn.share.util.xsl.Processor.documentImplementation = data.xml.ownerDocument.implementation;
            p = lconn.share.widget.FileRendererSocial._detailsXslt = lconn.share.util.xsl.createProcessor(this.xsltDetails);
         }
         if (!stream.xsltAct)
            stream.xsltAct = lconn.share.widget.FileRendererSocial.prototype.xsltAction;
         
         var start = new Date().getTime();

         var args = {
            widgetId: stream.id, 
            currentUserId: this.permissions.authenticatedId || "",
            userUrlTemplate: this.getLinkToUserTemplate("{userId}"),
            showFavorite: !!this.createFavoriteToggle,
            noBreak: dojo.isIE < 8,
            _blankGif: dojo.config.blankGif.toString(),
            newline: '\n' // Safari is insane, and needs this passed in
         };
         if (this.xsltDetailsParams)
            dojo.mixin(args, this.xsltDetailsParams);
         var frag = p.transformToHtml(data.xml.ownerDocument, document, args);
         
         var d = document;
   
         var startupdates = new Date().getTime();
         var table = frag.firstChild;
         dojo.connect(table, "onmousedown", dojo.hitch(this, "toggleByElement", stream));
         
         var rows = table.lastChild.childNodes;
         var length = rows.length;
         
         if (length > 0) {
            var padding = dojo._isBodyLtr() ? "paddingRight":"paddingLeft";
            var nodes = rows[0].childNodes;
            var i = 1;
            // Filename
            nodes[i++].style.width = "100%";
            // Recommendation
            if (this.showRecommendations) {
               var td = nodes[i++];
               td.style[padding] = "25px";
               dojo.addClass(td, "lotusNowrap");
            }
            // Pinning
            if (this.createFavoriteToggle)
               nodes[i++].style[padding] = "25px";
            // Visibility
            nodes[i++].style[padding] = "25px";
            
            // Icon
            for (var i=0; i<length; i+=2)
               rows[i].childNodes[0].style[padding] = "8px";
            
            if (this.createFavoriteToggle) {
               for (var i=0; i<length; i+=2) {
                  var r = rows[i];
                  var td = r.childNodes[3];
                  var t = this.createFavoriteToggle(dojo.attr(td, "_uid"));
                  td.appendChild(t);
               }
            }
         }

         this.postProcessTimestamps(rows, this._appstrings.DATE, this.getUserFragmentXsltStrings(), true);

         var old = [];
         
         var startheader = new Date().getTime();
         var fragment = d.createDocumentFragment();
         this.renderSorting(stream, fragment, data);
         if (fragment.firstChild) {
            if (el.firstChild)
               old.push(el.replaceChild(fragment.firstChild, el.firstChild));
            else
               el.appendChild(fragment);
         }
         else if (el.firstChild)
            old.push(el.removeChild(el.firstChild));
   
         var startpaging = new Date().getTime();
         this.updatePaging(stream, el, data);
   
         var startreplace = new Date().getTime();
         if (el.childNodes[1])
            old.push(el.replaceChild(table, el.childNodes[1]));
         else
            el.appendChild(table);
   
         while (table.nextSibling)
            old.push(el.removeChild(table.nextSibling));
   
         var end = new Date().getTime();
         setTimeout(function removeOldNodes() {dojo.forEach(old, dojo.empty);}, 0);

         if (this.highlightItems) {
            var initData = false;
            for (var id in this.highlightItems) {
               if (!initData) {
                  this.initXsltData(data, el);
                  initData = true;
               }
               var item = data.itemById[id];
               // Possible the item we want to highlight isn't on this page
               if (item) {
                  this.highlight(item.element);
                  this.highlight(item.elementDetails);
               }
               delete this.highlightItems[id];
            }
         }

         if (dojo.isIE && window.stats) {
            var xslt = window.stats.xslt = window.stats.xslt || {
               xsltRender: [],
               xsltPostProcess: [],
               domHeaderUpdate: [],
               domPagingUpdate: [],
               domReplace: [],
               all: []
            };
            if (!window.stats.avg)
               window.stats.avg = function(arr) {var avg = 0; for (var i=0; i<arr.length; i++) avg += arr[i]; return avg/arr.length;};
            xslt.xsltRender.push(startupdates - start);
            xslt.xsltPostProcess.push(startheader - startupdates);
            xslt.domHeaderUpdate.push(startpaging - startheader);
            xslt.domPagingUpdate.push(startreplace - startpaging);
            xslt.domReplace.push(end - startreplace);
            xslt.all.push(end - start);
         }
         this.attachDragSource(table, stream, data);
         //setTimeout(dojo.hitch(this, this.attachDragSource, table, stream, data), 2000);
      }
      catch (e) {
         console.error(e);
         this.renderError(stream, el, data, {message: this._appstrings.ERROR_OCCURRED});
      }
   },
   
   initXsltData: function(data, el) {
      this.initData(data);
      
      if (data._initXslt)
         return;
      data._initXslt = true;
      var tbody = (el.childNodes[1] || el.firstChild).lastChild;
      for (var i=0; i<data.itemByPosition.length; i++) {
         var item = data.itemByPosition[i];
         item.element = tbody.childNodes[i*2];
         item.elementDetails = tbody.childNodes[i*2+1];
      }
      if (dojo.getObject("SemTagSvc.onTagChanged"))
         SemTagSvc.onTagChanged(el, true);
   },
   
   renderShareLinkColumn: function(el, doc, app) {
      if (lconn.share.util.configUtil.isFilesEnableShareLink(this.authenticatedUser)) {
         var td = el.nextSibling;
         dojo.empty(td);

         if (typeof doc.getShareLink === 'function' && doc.getShareLink().url) {
            var shareLink = doc.getShareLink();

            var a = lconn.share.scenehelper.createCopyToClipboardAction(shareLink.url);
               
               switch (shareLink.type) {
                  case "PEOPLE_WITH_LINK": 
                     a.title = app.nls.SHARELINK_ICON_TITLE_2;
                     break;
                  case "PEOPLE_IN_MY_ORG":
                     a.title = app.nls.SHARELINK_ICON_TITLE_1;
                     break;
               }
            lconn.core.svg.svgHelper.loadIcon(a, "copyShareLink");
            td.appendChild(a);
         }
      }
   },
   
   renderItem: function(stream, el, data, doc, position, isFirst, isLast, existingTr, existingTrDetails) {
	   var d = document;
	   var app = this.app;
	   doc._isEcmFile = doc.getLibraryType()=="communityECMFiles";
	      
	   var td_t = d.createElement("td");
	   var a_t = d.createElement("a");
	   var span_t = d.createElement("span");
	   var img_t = d.createElement("img");
	   var div_t = d.createElement("div");
	                              
	   var downloadEnabled = !doc.getConfiguration().disableDownload;
	   var downloadTitle = downloadEnabled ? 
			   //dojo.string.substitute(this._appstrings.DOCUMENTCONTENT.DOWNLOAD_TOOLTIP, [doc.getTitle(), lconn.share.util.text.formatSize(doc.getSize())]) 
			   lconn.core.globalization.bidiUtil.substituteWithSTT(this._appstrings.DOCUMENTCONTENT.DOWNLOAD_TOOLTIP,
					   [doc.getTitle(), lconn.share.util.text.formatSize(doc.getSize())]) : null;
	   if (doc.getLibraryType()=="personalFiles" && doc.isSyncable() && !lconn.share.util.configUtil.isFolderSyncable(this.authenticatedUser)) {
		   if (downloadEnabled)
			   //downloadTitle = dojo.string.substitute(this._appstrings.DOCUMENTCONTENT.DOWNLOAD_WITH_FILE_SYNC_TOOLTIP, [doc.getTitle(), lconn.share.util.text.formatSize(doc.getSize())]);
			   downloadTitle = lconn.core.globalization.bidiUtil.substituteWithSTT(this._appstrings.DOCUMENTCONTENT.DOWNLOAD_WITH_FILE_SYNC_TOOLTIP,
					   [doc.getTitle(), lconn.share.util.text.formatSize(doc.getSize())]);
		   else
			   downloadTitle = this._appstrings.DOCUMENTCONTENT.DOWNLOAD_DISABLED_WITH_FILE_SYNC_TOOLTIP;
	   }
	   if(lconn.share.util.configUtil.isFilesAsyncVirusScan(this.authenticatedUser) &&  typeof doc.getMalwareScanState == "function" && doc.getMalwareScanState() === "virusDetected"){
         downloadTitle = this._appstrings.DOCUMENTCONTENT.DOWNLOAD_WITH_FILE_VIRUS_TOOLTIP;
      }
	   var tddownload;
	   var a1,a2;
	      
	   var tr = existingTr;
	   var trd = existingTrDetails;
	   tr.style.cursor = "default";
	   tr.itemPosition = position;
	         
	   lconn.share.widget.StreamRendererMultiSelection.renderSelection(null, stream, this, d, tr.firstChild, doc, position);
	   if ( doc.checkElement ) {
		   doc.checkElement.setAttribute("aria-label",this._appstrings.FILES_CHECKED_ALERT);
	   }

	   var td = tddownload = tr.firstChild.nextSibling;
	         
	   //<a> element may have widget "lconn.share.widget.HelpLauncher" on it, destroy and recreate it
	   lconn.share.util.html.destroyWidgets(td);
	   td.innerHTML = this.downloadFilesNodes;

	   var a = a1 = td.firstChild;
	   a.firstChild.alt = "";
	   a.firstChild.title = "";
	   dojo.addClass(a, "lconnIconContainer");
	   
	   if(typeof doc.getMalwareScanState == "function" && doc.getMalwareScanState() === "virusDetected"){
         a.title = downloadTitle;
         a.firstChild.title = downloadTitle;
         a.firstChild.alt = downloadTitle;
         a.lastChild.appendChild(d.createTextNode(doc.getExtension() || this._appstrings.CONTENT.DOWNLOAD_ALT));
      }else if(downloadEnabled){
		   dojo.addClass(a, "lconnDownloadable");
		   a.title = downloadTitle;
		   a.firstChild.title = downloadTitle;
		   a.firstChild.alt = downloadTitle;
		   a.lastChild.appendChild(d.createTextNode(doc.getExtension() || this._appstrings.CONTENT.DOWNLOAD_ALT));
	   }else if(doc.isSyncable()){
		   a.title = downloadTitle;
		   a.firstChild.title = downloadTitle;
		   a.firstChild.alt = doc.getExtension();
	   }
	   this.generateFileTypeImage(a.firstChild, lconn.share.util.text.getExtension(doc.getName()), 32, doc);
	   if (this.applyDownloadLink)
		   this.applyDownloadLink(app, doc, a, d, {isIcon: true});
	               
	   var img = a.childNodes[1];
	   img.src = dojo.config.blankGif;
	   img.alt = "";
	   if (doc.isSyncable() && doc.getLibraryType()=="personalFiles" && !lconn.share.util.configUtil.isFolderSyncable(this.authenticatedUser)) {
		   var syncIcon = d.createElement("img");
		   syncIcon.className = "iconsMessages32 iconsMessages32-myFileSync32";
		   syncIcon.src = dojo.config.blankGif;
		   dojo.addClass(syncIcon, "lconnFileSyncOverlay");
		   syncIcon.alt = "";
		   a.appendChild(syncIcon);
	            
		   var altSpan = d.createElement("span");
		   altSpan.appendChild(d.createTextNode(app.nls.FILE_SYNC_ICON.ALT));
		   altSpan.className = "lotusAltText";
		   a.appendChild(altSpan);
	   }
	   if(lconn.share.util.configUtil.isFilesAsyncVirusScan(this.authenticatedUser) && typeof doc.getMalwareScanState == "function" && doc.getMalwareScanState() === "virusDetected"){
         var virusIcon = d.createElement("img");
         virusIcon.className = "iconsMessages32-myFileVirus iconsMessages32-myFileVirus32";
         virusIcon.src = dojo.config.blankGif;
         dojo.addClass(virusIcon, "lconnFileVirusOverlay");
         virusIcon.alt = "";
         a.appendChild(virusIcon);
               
         var altSpan = d.createElement("span");
         altSpan.appendChild(d.createTextNode(app.nls.FILE_VIRUS_ICON.ALT));
         altSpan.className = "lotusAltText";
         a.appendChild(altSpan); 
	   }
	   if (td.lastChild.nodeName.toLowerCase() == "span") {
	               
		   var old = td.removeChild(td.lastChild);
		   lconn.share.util.html.destroyWidgets(old);
	   }

	   td = td.nextSibling;
	   var a = td.firstChild.firstChild;
	   a.innerHTML = "";
	   var name = doc.getNameNls();
	   lconn.share.util.html.breakString(name, d, a, 10);
	   if (!dojo._isBodyLtr()) 
		   a.innerHTML += "&rlm;";
	   a.title = name;
	   this.generateLinkToFile(doc,a);
	   while(a.nextSibling){
		   td.firstChild.removeChild(a.nextSibling);
	   }
	   if(doc.isLocked() && this.generateLockIcon)
		   this.generateLockIcon(d, td.firstChild, doc, app.getAuthenticatedUserId(), {nls: app.nls.CONTENT});
	   this.decorateFileName(doc,td.firstChild, a);
	               
	   var div = td.firstChild.nextSibling;
	   div.removeAttribute("role");
	   dojo.empty(div);
	   var metas = this.metas;
	   var opts = {
			   app: app,
			   file: doc,
			   className: "lotusInlinelist",
			   renderer: this,
			   nls: dojo.mixin({}, this._appstrings, this._strings)
	   };
	   if (this.applyFileDescriptions)
		   this.applyFileDescriptions(app, doc, metas, d, div, opts);

	   var ratingCount = doc.getRatingCount();
	   td = td.nextSibling;
	   dojo.empty(td);
	            
	   var top = td.appendChild(div_t.cloneNode(true));
	   this.buildRecommendation(doc, top);
	               
	   if (this.createFavoriteToggle) {
		   td = td.nextSibling;
		   dojo.empty(td);
		   if (doc.getLibraryType() != "communityFiles" && doc.getLibraryType() != "communityECMFiles") {
			   var t = this.createFavoriteToggle(doc.getId());
			   td.appendChild(t);
		   }
		   else {
			   td.appendChild(d.createTextNode("\u00a0"));
		   }
	   }
	         
	   var m = this.getShareMessage(doc, this._strings);
	   td = td.nextSibling;
	   dojo.addClass(td, "lotusNowrap");
	   td.innerHTML = "";
	   var img = img_t.cloneNode(true);
	   img.src = dojo.config.blankGif;
	   img.className = m.i;
	   img.alt = "";
	   img.style.marginTop = "1px";
	   this.renderShareLink(td, img, null, m.a, doc);
	   var parent = img.parentNode;
	   if(parent)
		   parent.title = dojo.string.substitute(m.s,[m.c]);

	   this.renderExternalIcon(parent || td, doc, this._strings.SHARE_INTENT, this._strings.SHARE_INTENT_T);
	   
	   this.renderShareLinkColumn(td, doc, app);

	   trd.style.cursor = "default";
	   trd.style.display = "none";
	   var td = trd.lastChild;
	   dojo.empty(td);
	            
	   this.renderShowLink(tr);

	   if (downloadEnabled && this.renderDownloadWarning)
		   this.renderDownloadWarning(doc.getLabel(), d, tddownload, a1);
	      
	   doc.element = tr;
	   doc.elementDetails = trd;
	      
	   if (this.highlightItems && this.highlightItems[doc.getId()]) {
		   this.highlight(tr);
		   this.highlight(trd);
		   delete this.highlightItems[doc.getId()];
	   }
   },
   
   renderUserFragment: function(stream, data, item, position, span) {
      var d = document;
      var isChanged = (item.getUpdated().getTime() != item.getPublished().getTime()); 
      var modifier = isChanged? item.getModifier() : item.getAuthor();
      var byMe = this.permissions.isAuthenticated() ? this.permissions.isAuthenticated(modifier.id) : false;
      var nls = this._appstrings.DOCUMENTCONTENT;
      var dateStrings = isChanged 
            ? (byMe ? nls.LABEL_UPDATED : nls.LABEL_UPDATED_OTHER)
            : (byMe ? nls.LABEL_ADDED : nls.LABEL_ADDED_OTHER);
      var df = new lconn.share.util.DateFormat(item.getUpdated());
      var text = df.formatByAge(dateStrings);
      text = lconn.core.globalization.bidiUtil.numShapeStr(text);
      lconn.share.util.html.substitute(d, span, text, {
         user: function() {
            var a = d.createElement("a");
               a.className = "lotusPerson";
               a.appendChild(d.createTextNode(modifier.name));
               this.generateLinkToPerson(modifier, a);
            return a;
         }
      }, null, this);
      span.title = df.format(dateStrings.FULL);
   },
      
   _renderItemExpand: function(stream, data, item, position) {
      var d = document;
      var doc = item;
      var tr = doc.element;
      var trd = doc.elementDetails;

      var div_t = d.createElement("div");
      var span_t = d.createElement("span");
   
      tr.style.cursor = trd.style.cursor = "";

      var actions = this.getActions(item);
      var unlockAction = dojo.filter(actions, function(a) {return a.declaredClass == "lconn.files.action.UnlockFile";})[0];
         
      var hasContent = false;
      if (this.showTags) {
         var canTag = this.permissions.canTag(item);
         var tags = doc.getTags();
         if (canTag || tags.length > 0) {
            hasContent = true;
            var tagger = new lconn.share.widget.Tagger({
               labelText: this._strings.TAGS_LABEL, 
               baseClass: "lotusTags lotusMeta", 
               editable: canTag, 
               docId: doc.getAtomId(),
               net: this.net,
               isEcmFile: doc._isEcmFile,
               urlEdit: this.routes.getProxiedUrl(this.getUrlEditTags(doc), {commonProxy: true}),
               urlFeed: this.routes.getProxiedUrl(doc._isEcmFile ? doc.getUrlEntry() : doc.getUrlFeed(), {commonProxy: true}),
               tagStore: this.tagStore,
               tags: tags, 
               generateTagLink: dojo.hitch(this, this.generateLinkToTag),
               renderPopup: this.renderPopup, 
               _strings: this._appstrings.TAGGER
            }, trd.lastChild.insertBefore(div_t.cloneNode(true), trd.lastChild.firstChild));
            dojo.connect(tagger, "onTagChange", dojo.hitch(this, lconn.share.widget.Tagger.updateFile, doc));
         }
      }

      if (item.isLocked()) {
         hasContent = true;
         var renderer = this;
         var lock = item.getLock();
         var lockDiv = div_t.cloneNode(true);
            lockDiv.className = "lotusMeta";
            dojo.attr(lockDiv, "aria-live", "assertive");
            var img = lockDiv.appendChild(d.createElement("IMG"));
               img.src = dojo.config.blankGif;
               img.className = (item.getPermissions().Unlock ? "lconnSprite lconnSprite-iconCheckedOutMe" : "lconnSprite lconnSprite-iconCheckedOut");
               dojo.attr(img, {
                  title: "", 
                  alt: "", 
                  role: "presentation"});
            var string = lock.getOwner().id == this.app.getAuthenticatedUserId() ? this._appstrings.DOCUMENTCONTENT.LABEL_LOCKED : this._appstrings.DOCUMENTCONTENT.LABEL_LOCKED_BY;
            var template = new lconn.share.util.DateFormat(lock.getLockTime()).formatByAge(string);
            template = lconn.core.globalization.bidiUtil.numShapeStr(template);
            var lockedByYou = lock.getOwner().id == this.app.getAuthenticatedUserId();
            dojo.attr(img, "alt", lockedByYou ? this._appstrings.CONTENT.LOCKED_BY_YOU : this._appstrings.CONTENT.LOCKED);
            lconn.share.util.html.substitute(d, lockDiv, template, {
               user: function() {
                  var a = d.createElement("a");
                     a.className = "lotusPerson";
                     renderer.generateLinkToPerson(lock.getOwner(), a);
                     a.appendChild(d.createTextNode(lock.getOwner().name));
                  return a;
               },
               unlock: function() {
                  if (item.getPermissions().Unlock && unlockAction) {
                     var opt = {};
                     var a = d.createElement("a");
                        a.href="javascript:;";
                        dijit.setWaiRole(a, "button");
                        a.appendChild(d.createTextNode(unlockAction.getName()));
                        a.title = unlockAction.getTooltip();
                        dojo.connect(a, "onclick", function(event) {
                           if (event)
                              dojo.stopEvent(event);
                           unlockAction.execute(item, opt);
                        });
                     return a;
                  }
                  return null;
               }
            });
         trd.lastChild.insertBefore(lockDiv, trd.lastChild.firstChild);
      }
      
      var td = trd.lastChild;      
         var divd = d.createElement("div");
            divd.className = "entry-summary";
            lconn.share.util.html.createTextNode(d, divd, item.getDescription());
            var hasDescription = !!divd.firstChild;
            if (hasDescription)
               td.appendChild(divd);  
      
         this.renderActionList(td, stream, data, item, actions);

      if (td.firstChild)
         dojo.addClass(td.firstChild, "lotusFirst");
         
      this.showNodes(trd, "");
      this.renderHideLink(tr);
   },
      
   isSkipNode: function(node) {
      return node.className == "lotusTags" || node.className == "lotusRecommend";
   },
      
   getSorts: function(sortId, direction) {
      var nls = this._appstrings.COLUMN.FILE;
      var sorts = [
         {id: "name", name: nls.NAME, lowToHigh: true, tooltip: nls.NAME_L},
         {id: "modified", name: nls.MODIFIED, isDefault: true, tooltip: nls.MODIFIED_L}
      ];

      if (this.showDownloads)
         sorts.push({id: "downloads", name: nls.DOWNLOADS, tooltip: nls.DOWNLOADS_L});
         
      if (this.showComments)
         sorts.push({id: "comments", name: nls.COMMENTS, tooltip: nls.COMMENTS_L});
      
      if (this.showRecommendations)
         sorts.push({id: "recommendations", name: nls.RECOMMENDATIONS, tooltip: nls.RECOMMENDATIONS_L});
      
      return sorts;
   },

   buildXsltRecommendation: function(doc, a) {
   },
   
   _xsltRecommender: function(stream, position, methodOnInit, e) {
      var item = stream.data.itemByPosition[position];
      var r = item._recommender;
      if (!r) {
         var a = item.element.childNodes[2].firstChild;
         r = item._recommender = this.buildXsltRecommendation(item, a);
         if (r != null)
             r[methodOnInit](e);
      }
   },
   
   clickRecommendation: function(stream, position, e) {
      this._xsltRecommender(stream, position, "onClick", e);
   }, 
   
   hoverRecommendation: function(stream, position, e) {
      this._xsltRecommender(stream, position, "onMouseEnter", e);
   },
   
   buildRecommendation: function(doc, a) {
   },
   
   generateLockIcon: function(d, el, doc, userid, opt){
   }
});
