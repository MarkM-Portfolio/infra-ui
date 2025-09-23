/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Corp. 2009, 2020                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
dojo.provide("lconn.share.widget.FileRendererCustom");

dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.xsl");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.scenehelper");
dojo.require("lconn.share.widget.FileRendererMenu");
dojo.require("lconn.share.widget.StreamRendererMultiSelection");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.share.widget.FileRendererCustom", [lconn.share.widget.FileRendererMenu, lconn.share.widget.StreamRendererMultiSelection], {

   showColumns: null,
   supportedColumns: [],
   preventDownload: false,
   
   DEFAULT_COLUMNS: {
      modified:1,
      downloads:1,
      size:1
   },
   COLUMN_ALIGN: {number: "lotusAlignRight", size: "lotusAlignRight", privacy: "lotusCenter", shareLink: "lotusCenter", favorites: "lotusAlignRight", lock: "lotusAlignRight", bool: "lotusAlignRight"},
   COLUMN_FRACTION: {number: 1, size: 1, person: 3, string: 3, date: 2},

   /**
    * Types that can be rendered as a column
    */
   COLUMN_TYPES: {
      number: function(s, stream, r, d, el) {
         el.appendChild(d.createTextNode(dojo.number.format(s || 0)));
      },
      size: function(s, stream, r, d, el) {
         el.appendChild(d.createTextNode(lconn.share.util.text.formatSize(s || 0)));
      },
      string: function(s, stream, r, d, el) {
         if (!s) return;
         el.appendChild(d.createTextNode(s));
      },
      person: function(user, stream, r, d, el) {
         if (!user) return;
         var a = d.createElement("a");
         a.className = "lotusPerson";
         a.appendChild(d.createTextNode(user.name));
         r.generateLinkToPerson(user, a);
         el.appendChild(a);
      },
      date: function(date, stream, r, d, el) {
         if (!date) return;
         el.appendChild(new lconn.share.util.DateFormat(date).formatByAgeToHtml(r._appstrings.DATE.COMPACT, d));
      },
      fileIcon: function(x, stream, r, d, el, doc) {
         dojo.addClass(el, "lotusNowrap");
         var downloadEnabled = !doc.getConfiguration().disableDownload;
         var downloadTitle = downloadEnabled ? 
                                 //dojo.string.substitute(r._appstrings.DOCUMENTCONTENT.DOWNLOAD_TOOLTIP, [doc.getTitle(), lconn.share.util.text.formatSize(doc.getSize())])
                                 lconn.core.globalization.bidiUtil.substituteWithSTT(r._appstrings.DOCUMENTCONTENT.DOWNLOAD_TOOLTIP,
                                                                                     [doc.getTitle(), lconn.share.util.text.formatSize(doc.getSize())])
                                 : null;
         if (doc.isSyncable() && !lconn.share.util.configUtil.isFolderSyncable(this.authenticatedUser)) {
            if (downloadEnabled)
               //downloadTitle = dojo.string.substitute(r._appstrings.DOCUMENTCONTENT.DOWNLOAD_WITH_FILE_SYNC_TOOLTIP, [doc.getTitle(), lconn.share.util.text.formatSize(doc.getSize())]);
               downloadTitle = lconn.core.globalization.bidiUtil.substituteWithSTT(r._appstrings.DOCUMENTCONTENT.DOWNLOAD_WITH_FILE_SYNC_TOOLTIP,
                                                                                [doc.getTitle(), lconn.share.util.text.formatSize(doc.getSize())]);
            else
               downloadTitle = r._appstrings.DOCUMENTCONTENT.DOWNLOAD_DISABLED_WITH_FILE_SYNC_TOOLTIP;
         }
         if(lconn.share.util.configUtil.isFilesAsyncVirusScan(this.authenticatedUser) &&  typeof doc.getMalwareScanState == "function" && doc.getMalwareScanState() === "virusDetected"){
            downloadTitle = r._appstrings.DOCUMENTCONTENT.DOWNLOAD_WITH_FILE_VIRUS_TOOLTIP;
         }
         var a = d.createElement("a");
            dojo.addClass(a, "lconnIconContainer");
            if(downloadEnabled)
               dojo.addClass(a, "lconnDownloadable");
            var img = d.createElement("img");
               if(downloadEnabled){
            	 img.title = img.alt = downloadTitle;
               }else{
                  img.atl="";
                  img.title="";
               }
               r.generateFileTypeImage(img, lconn.share.util.text.getExtension(doc.getName()), 16, doc);
            a.appendChild(img);
            
            if(typeof doc.getMalwareScanState == "function" && doc.getMalwareScanState() === "virusDetected"){
               a.title = downloadTitle;
               var altSpan = d.createElement("span");
                  altSpan.className = "lotusAltText";
                  altSpan.appendChild(d.createTextNode(doc.getExtension() || r._appstrings.CONTENT.DOWNLOAD_ALT));
               a.appendChild(altSpan);
            }else if(downloadEnabled){
               a.title = downloadTitle;
               var altSpan = d.createElement("span");
                  altSpan.className = "lotusAltText";
                  altSpan.appendChild(d.createTextNode(doc.getExtension() || r._appstrings.CONTENT.DOWNLOAD_ALT));
               a.appendChild(altSpan);
            }else if(doc.isSyncable()){
               a.title = downloadTitle;
            }
               
            if (r.applyDownloadLink)
 			   r.applyDownloadLink(r.app, doc, a, d, {isIcon: true});
            
            if (doc.isSyncable() && doc.getLibraryType()=="personalFiles" && !lconn.share.util.configUtil.isFolderSyncable(this.authenticatedUser)) {
               var syncIcon = d.createElement("img");
                  syncIcon.className = "iconsMessages16 iconsMessages16-myFileSync16";
                  syncIcon.src = dojo.config.blankGif;
                  dojo.addClass(syncIcon, "lconnFileSyncOverlay");
                  syncIcon.alt = "";
               a.appendChild(syncIcon);
               
               var altSpan = d.createElement("span");
                  altSpan.appendChild(d.createTextNode(r.app.nls.FILE_SYNC_ICON.ALT));
                  altSpan.className = "lotusAltText";
               a.appendChild(altSpan);
            }
            if(lconn.share.util.configUtil.isFilesAsyncVirusScan(this.authenticatedUser) &&  typeof doc.getMalwareScanState == "function" && doc.getMalwareScanState() === "virusDetected"){
               var virusIcon = d.createElement("img");
               virusIcon.className = "iconsMessages16-myFileVirus iconsMessages16-myFileVirus16";
               virusIcon.src = dojo.config.blankGif;
               dojo.addClass(virusIcon, "lconnFileVirusOverlay");
               virusIcon.alt = "";
               a.appendChild(virusIcon);
                     
               var altSpan = d.createElement("span");
               altSpan.appendChild(d.createTextNode(r.app.nls.FILE_VIRUS_ICON.ALT));
               altSpan.className = "lotusAltText";
               a.appendChild(altSpan); 
            }
         el.appendChild(a);
         if(downloadEnabled){
            if (r.renderDownloadWarning)
               r.renderDownloadWarning(doc.getLabel(), d, el, a);
         }
      },
      fileName: function(x, stream, r, d, el, doc) {
         dojo.addClass(el, "lotusRowHeader");
         var h4 = d.createElement("H4");
            h4.className = "lotusBreakWord lotusLeft";
            var adoc = d.createElement("a");
               var name = doc.getNameNls();
               lconn.share.util.html.breakString(name, d, adoc, 10);
               if (!dojo._isBodyLtr()) 
                  adoc.innerHTML += "&rlm;";
               adoc.title = name;
               adoc.className = "entry-title";
               adoc.rel = "bookmark";
               r.generateLinkToFile(doc, adoc);
               urlFile = adoc.href;
            h4.appendChild(adoc);
            r.decorateFileName(doc,h4,adoc);
         el.appendChild(h4);
      },
      select: function(x, stream, r, d, el, doc) {
         dojo.addClass(el, "lotusNowrap");
         return lconn.share.widget.StreamRendererMultiSelection.renderSelection.apply(this, arguments);
      },
      contextMenu: function(x, stream, r, d, el, doc, position) {
         var amenu = doc.elementMenu = d.createElement("a");
         	amenu.title = r._strings.CONTEXT_ALT;
            var img = d.createElement("img");
               img.alt = r._strings.CONTEXT_ALT;
               img.className = "lconnSprite lconnSprite-iconContext";
               img.src = dojo.config.blankGif;
            amenu.appendChild(img);
            
            var altSpan = d.createElement("span");
               altSpan.className = "lotusAltText";
               altSpan.appendChild(d.createTextNode("\u25BC"));
            amenu.appendChild(altSpan);
      
            amenu.href = "javascript:;";
            dojo.connect(amenu, "onmousedown", dojo.hitch(r, "mousedownMenu", stream, position));
            dojo.connect(amenu, "onclick", dojo.hitch(r, "showMenu", stream, position));
            dijit.setWaiRole(amenu, "button");
            dijit.setWaiState(amenu, "haspopup", true);
         el.appendChild(amenu);
      },
      favorites: function(x, stream, r, d, el, doc) {
         if(doc.getLibraryType() != "communityFiles" && doc.getLibraryType() != "communityECMFiles"){
            var t = r.createFavoriteToggle(doc.getId());
            el.appendChild(t);
         }
      },
      bool: function(x, stream, r, d, el) {
         var nls = r._appstrings.CONTENT;
         var msg = x ? nls.BOOLEAN_YES: nls.BOOLEAN_NO;
         el.appendChild(d.createTextNode(msg));
      },
      lock: function(x, stream, r, d, el, doc) {
    	  r.lock(d, el, doc, r.app.getAuthenticatedUserId(), {nls: r._appstrings.CONTENT});
      },
      privacy: function(x, stream, r, d, el, doc) {
         var m = r.getShareMessage(doc, r._strings);
         var img = d.createElement("img");
            img.src = dojo.config.blankGif;
            img.className = m.i;
            img.alt = m.s;
            img.style.marginTop = "1px";
         r.renderShareLink(el, img, null, m.a, doc);
         var parent = img.parentNode;
         if(parent)
         	parent.title = dojo.string.substitute(m.s,[m.c]);
         //if (parent && parent.nodeName.toLowerCase() == "a")
            //parent.tabIndex = -1;

         if (dojo.getObject("lconn.share.config.features.sharingIntent")) {
            var visibilityParent = parent || el;
            dojo.addClass(visibilityParent, "lotusNowrap");
            
            // Always create for spacing
            var img = d.createElement("img");
               img.src = dojo.config.blankGif;
               img.className = "lconnIconListSharedExternal";
               img.title = img.alt = "";
               img.style.marginTop = "1px";
               img.style[dojo._isBodyLtr() ? "marginLeft":"marginRight"] = "3px";
            visibilityParent.appendChild(img);

            // Show if external
            if (r.app && r.app.isCommunityScene && r.app.isExternalCommunity)
               img.style.visibility = "hidden";
            else
               img.style.visibility = doc.isExternal() ? "visible":"hidden";
            img.title = r._strings.SHARE_INTENT;
            img.alt = "";
            if (doc.isExternal()) {
               var alt = d.createElement("span");
                  alt.className = "lotusAltText";
                  alt.appendChild(d.createTextNode(", " + r._strings.SHARE_INTENT_T));
               visibilityParent.appendChild(alt);
            }
         }
      },
      shareLink: function(x, stream, r, d, el, doc) {
         if (lconn.share.util.configUtil.isFilesEnableShareLink(this.authenticatedUser)) {
            if (doc.getShareLink().url) {
               var shareLink = doc.getShareLink();

               var a = lconn.share.scenehelper.createCopyToClipboardAction(shareLink.url);
                  
                  switch (shareLink.type) {
                     case "PEOPLE_WITH_LINK": 
                        a.title = r._appstrings.SHARELINK_ICON_TITLE_2;
                        break;
                     case "PEOPLE_IN_MY_ORG":
                        a.title = r._appstrings.SHARELINK_ICON_TITLE_1;
                        break;
                  }
               lconn.core.svg.svgHelper.loadIcon(a, "copyShareLink");
               el.appendChild(a);
            }
         }
      }
   },
   /**
    * Types that can be rendered in a row
    */
   ROW_TYPES: {
      tags: function(tags, stream, r, d, el, item) {
         var canTag = item.getPermissions().Edit;//r.permissions.canTag(item);
         var tags = tags;
         if (canTag || tags.length > 0) {
            var tagger = new lconn.share.widget.Tagger({
               labelText: r._strings.TAGS_LABEL, 
               baseClass: "lotusTags lotusMeta", 
               editable: canTag, 
               docId: item.getAtomId(),
               net: r.net,
               urlEdit: r.getUrlEditTags(item),
               urlFeed: item.getUrlFeed(),
               tagStore: r.tagStore,
               tags: tags, 
               generateTagLink: dojo.hitch(r, r.generateLinkToTag),
               renderPopup: r.renderPopup, 
               _strings: r._appstrings.TAGGER
            }, el.appendChild(d.createElement("div")));
            dojo.connect(tagger, "onTagChange", dojo.hitch(this, lconn.share.widget.Tagger.updateFile, item));
         }      
      },
      description: function(s, stream, r, d, el) {
         if (!!s) {
            var div = d.createElement("div");
               div.className = "lotusBreakWord entry-summary";
               lconn.share.util.html.createTextNode(d, div, s);
            el.appendChild(div);
         }
      }
   },
   
   initData: function(data, opt) {
      var isInit = data._init;
      var ret = this.inherited(arguments);
      if (!isInit)
         this.initColumns(data, opt);
      return ret;
   },
   
   initColumns: function(data, opt) {
      var columns = [];
      var details = [];
      var widthTotal = 0;
      var order = this.supportedColumns;
      var defaults = this.DEFAULT_COLUMNS;
      var shouldShow = this.showColumns || defaults;
      var showing = {};
      var wideColumn;
      var noop = function() {};
      var matchesDefaults = true;
      for (var i=0,l=order.length; i<l; i++) {
         var column = order[i];
         var id = column.id;
         if (shouldShow[id] || column.vis) {
            if (id == "favorites" && !this.createFavoriteToggle)
               continue;
            if (id === "shareLink" && !opt.enableShareLink)
               continue;
            var columnRenderer = column.render || this.COLUMN_TYPES[column.type];
            var rowRenderer = column.rowRender || this.ROW_TYPES[column.type];
            if (rowRenderer) {
               details.push(column);
            }
            else {
               var w = column.wf;
               var className = this.COLUMN_ALIGN[column.type] || "";
               var c = {
                  className: className,
                  c: column,
                  r: columnRenderer,
                  acc: column.accessor,
                  header: column.header
               }
               if (w == -1) {
                  w = 0;
                  wideColumn = c;
               }
               if (!(w >= 0))
                  w = this.COLUMN_FRACTION[column.type];
               if (!(w >= 0))
                  w = 1;
               widthTotal += w;
               c.wf = w;
               columns.push(c);
            }
            showing[id] = 1;
            if (!defaults[id])
               matchesDefaults = false;
         }
      }
      if (matchesDefaults)
         for (var id in defaults)
            if (!showing[id]) {
               matchesDefaults = false;
               break;
            }      
         
      // there can be up to one wide column - calculate its width based on the other widths
      if (wideColumn) {
         var width = (widthTotal < 3) 
            ? 12
            : (widthTotal > 12 
              ? 6
              : (14 - 2/3*widthTotal)
              );
         wideColumn.wf = width;
         widthTotal += width;
      }
      columns.widthTotal = widthTotal;
      
      data.columns = columns;
      data.details = details;
      data.hasDefaultColumns = matchesDefaults;
   },
   
   _render: function(stream, el, data, opt) {
      var opt = opt || {};
      var items = this._getItems(data.xml);
      var size = (data.paging) 
            ? Math.min(data.paging.size,items.length)
            : items.length;

      var d = document;
      var initedItems = this.initData(data, opt);

      if (size < 1) {
         this.renderEmpty(stream, el, data);
         return;
      }
            
      this.initColumns(data, opt);
            
      if (data.hasDefaultColumns && this.useXslt && items[0].nodeName) {
         this.xsltSummary = this.xsltSummary || dojo.getObject("lconn.share.config.xslt.list.fileSummary")
         /* BUG: Safari 3 will occasionally lose the root documentElement node from the xml document when XSLT transformations
          * are run repeatedly.  Revert to JS rendering when that occurs.
          */ 
         if (this.xsltSummary && dojo.getObject("xml.ownerDocument.documentElement", false, data)) {
            this.renderXslt(stream, el, data);
            return;
         }
      }
      //fixes IE6 layout bug and makes content accessible instead of overflowing.   
      var style = el.style;
      style.width = "100%";
      style.overflowX = "auto";
      style.overflowY = "hidden";

      var fragment = d.createDocumentFragment();
      var newArguments = dojo._toArray(arguments);
      newArguments[1] = fragment;
      
      var table = el.lastChild;
      var tbody;
      var currentTableChildNodesLenth = 0;
        
      if (opt.enableContinuousScrolling && table && table.nodeName.toLowerCase() == "table" && table.firstChild.childNodes.length > 0 && table._view == "custom" && opt.dataInited == undefined) {
        var newTbody = this.renderHeader(stream, el, data, d, opt);
        tbody = table.firstChild;
        if (newTbody && tbody && newTbody.firstChild && tbody.firstChild)
          tbody.replaceChild(newTbody.firstChild, tbody.firstChild);
        currentTableChildNodesLenth = tbody.childNodes.length - 1;
        this.appendItemByPosition(initedItems);
      } else {
        table = d.createElement("TABLE");
        table._view = "custom";
        dijit.setWaiRole(table, "presentation");
        table.className = "lotusTable";
        table.cellSpacing = table.cellPadding = 0;
        
        tbody = this.renderHeader(stream, el, data, d, opt);
        if (tbody) 
           table.appendChild(tbody);
        el.className = "lconnCustomListView";
        this.emptySelection();
        this.initItemByPosition(initedItems);
      }
      for (var i=0; initedItems!=null&&i<initedItems.length; i++){
          if(initedItems[i]._isSelected)
             this.appendSelection(initedItems[i]);
      }
       dojo.connect(table, "onmousedown", dojo.hitch(this, "toggleByElement", stream, data.details.length > 0));
  
       for (var i=0; i<size; i++)
          this.renderItem(stream, tbody, data, initedItems[i], i, i==0, (i==size-1), null, null, currentTableChildNodesLenth);

       this.attachDragSource(table, stream, data);
       this.updatePaging(stream, el, data, opt);
       
       if (!opt.enableContinuousScrolling || table.parentNode == null) {
          fragment.appendChild(table);

          var existingChildren = dojo._toArray(el.childNodes);
          for (var child,i=0; child=existingChildren[i]; i++)
             child.style.display = "none";
          el.replaceChild(fragment, existingChildren[0]);
          for (var child,i=0; child=existingChildren[i]; i++) {
             lconn.share.util.html.destroyWidgets(child);
             if (child.parentNode) child.parentNode.removeChild(child);
         }
       }
      lconn.core.globalization.bidiUtil.applyNumShapeEx(el, "lotusAlignRight");
      lconn.core.globalization.bidiUtil.applyNumShapeEx(null, "numShape");
      lconn.core.globalization.bidiUtil.applyNumShapeEx(el, "_qkrHideWhenEmpty");
   },
   
   renderHeader: function(stream, el, data, d, opt) {
      var columns = data.columns;
      var widthTotal = columns.widthTotal;
   
      var a_t = d.createElement("a");
      var th_t = d.createElement("td");
      var span_t = d.createElement("span");
         
      var sortId = this.sortId;
      var sortReversed = this.sortReversed;
      
      var tbody = d.createElement("tbody");
         var tr = tbody.appendChild(d.createElement("TR"));
            tr.className = "lotusSort lotusFirst";
            for (var i=0,column; column=columns[i]; i++) {
               var c = column.c;

               var th = th_t.cloneNode(true);
               th.className = column.className;

               if (c) {
                  if (c.isSortable && this.isSortValid(c)) {
                     var a = th.appendChild(a_t.cloneNode(true));
                        var name = c.name;
                        dijit.setWaiRole(a, "button");
                        dijit.setWaiState(a, "pressed", c.id == sortId);
                        if (c.id == sortId) {
                           var asc = ((c.lowToHigh) ? !sortReversed : sortReversed);
                           dojo.addClass(a, asc ? "lotusAscending" : "lotusDescending");
                           
                           setTimeout(dojo.hitch(this, function(activedSortNode) {
                              if (activedSortNode && lconn.share.widget.StreamRenderer.prototype.updateFromSorting) {
                                 lconn.share.widget.StreamRenderer.prototype.updateFromSorting = false;
                                 dijit.focus(activedSortNode);
                              }
                           }, a), 20);
                        }else
                           var asc = !c.lowToHigh;
                        var nls = stream._strings;
                        
                        var ariaLabel = asc? nls.SORTING_DESC: nls.SORTING_ASC;
                        if (c.tooltip) {
                           a.title = c.tooltip;
                           ariaLabel = asc? dojo.string.substitute(nls.SORTING_DESC_LONG, [c.tooltip]) : dojo.string.substitute(nls.SORTING_ASC_LONG, [c.tooltip]);
                        }
                        dijit.setWaiState(a, "label", ariaLabel);
                        
                        if (name && !/[\s\u3000]/.exec(name))
                           dojo.addClass(a, "lotusNowrap");
                        this.generateSortLink(stream, c, ((sortId ? sortId != c.id : true) || sortReversed) ? true : false, a);
                        a.appendChild(d.createTextNode(name));
                        dojo.connect(a, "onclick", function() {
                           lconn.share.widget.StreamRenderer.prototype.updateFromSorting = true;
                        });
                        
                        if (c.id == sortId) {
                           var altSpan = span_t.cloneNode(true);
                              altSpan.className = "lotusAltText";
                              altSpan.appendChild(d.createTextNode(asc ? " \u25B2 " : " \u25BC "));
                           a.appendChild(altSpan);
                        }
                   }
                   else {
                      var span = th.appendChild(d.createElement("span"));
                         if (c.tooltip)
                            span.title = c.tooltip;
                         span.appendChild(d.createTextNode(c.name));
                         if (c.name && !/[\s\u3000]/.exec(c.name))
                            dojo.addClass(span, "lotusNowrap");
                   }
               }
               
               if (column.wf) {
                  // Round down to nearest tenth of a percent
                  var width = (column.wf/widthTotal) * 100;
                  th.style.width = (Math.floor(width * 10) / 10) + "%";
               }
               else
                  // Don't let icon columns take up much width
                  th.style.width = "1%";
               
               if (c.id == "contextMenu")
                  th.style.paddingRight = "30px";
               if (c.id == "select"){
                  this.renderSelectAll(stream, th, data, d, opt);
               }
               
               if (i == 0){
                  dojo.addClass(th, "lotusFirstCell");
                  if(dojo._isBodyLtr())
                  	th.style.paddingLeft = "10px";
                  else
                  	th.style.paddingRight = "10px";
               }
               tr.appendChild(th);
            }
            
      return tbody;
   },

   renderSorting: function(stream, el, data, opt) {
   },

   renderItem: function(stream, el, data, doc, position, isFirst, isLast, existingTr, existingTrDetails, currentTableChildNodesLenth) {
      var d = document;
      doc._isEcmFile = doc.getLibraryType() == "communityECMFiles";
      var currentTableChildNodesLenth = currentTableChildNodesLenth || 0;
      var aMore;
      var permissions = this.permissions;
      var td_t = d.createElement("td");
      var th_t = d.createElement("th");
      var a_t = d.createElement("a");
      var span_t = d.createElement("span");
      var img_t = d.createElement("img");
      var div_t = d.createElement("div");
                  
      var tr = d.createElement("TR");
         tr.className = "hentry"+ ( false && doc.isFolder()?"":" dojoDndItem" ); // only files are draggable for now
         tr.style.cursor = "default"
         tr.itemPosition = position;
         lconn.share.scenehelper.applyDndProperty(tr, position+currentTableChildNodesLenth, doc);
         if (isFirst)
            dojo.addClass(tr,"lotusFirst");

         var columns = data.columns;
         for (var i=0,column; column=columns[i]; i++) {
            var td = td_t.cloneNode(true);
            td.className = column.className;
            if (column.header)
               dojo.addClass(td, "lotusRowHeader");
            var acc = column.acc;
            var value;
            if (typeof acc == "function")
               value = acc(doc);
            else if (typeof doc[acc] == "function")
               value = doc[acc]();
            column.r(value, stream, this, d, td, doc, position);
            if ( doc.checkElement ) {
               doc.checkElement.setAttribute("aria-label",this._appstrings.FILES_CHECKED_ALERT);
            }
            tr.appendChild(td);
         }
        
         dojo.addClass(tr.firstChild, "lotusFirstCell");
         
         // If we're centering, don't add padding that will make it lopsided
         if(!dojo.hasClass(tr.lastChild, "lotusCenter"))
            dojo.addClass(tr.lastChild, "lotusLastCell");
                  
      doc.element = tr;
      
      var rows = data.details;
      if (rows.length > 0) {
         var trd = d.createElement("TR");
            trd.itemPosition = position;
            trd.className = "lotusDetails";
            var td = trd.appendChild(d.createElement("TD"));
               td.className = "lotusFirst";
            var td = trd.appendChild(d.createElement("TD"));
               dojo.attr(td, "colSpan", (this.createFavoriteToggle ? 4 : 3)+columns.length);
               
               for (var i=0,row; row=rows[i]; i++) {
                  var acc = row.accessor;
                  var f = this.ROW_TYPES[row.type];
                  if (typeof acc == "function") {
                     var value = acc(doc);
                     f(value, stream, this, d, td, doc);
                  }
                  else if (typeof doc[acc] == "function") {
                     var value = doc[acc]();
                     f(value, stream, this, d, td, doc);
                  }
               }
         trd.style.display = !!td.firstChild ? "" : "none";
         doc.elementDetails = trd;
      }
      if (existingTr) {
         el.replaceChild(tr, existingTr);
         if (trd) {
            el.replaceChild(trd, existingTrDetails);
            lconn.share.util.html.removeChildren(existingTrDetails);
         }
         lconn.share.util.html.removeChildren(existingTr);
      }
      else {
         el.appendChild(tr);
         if (trd)
            el.appendChild(trd);
      }     

      if (this.highlightItems && this.highlightItems[doc.getId()]) {
         this.highlight(doc.element);
         if (doc.elementDetails)
            this.highlight(doc.elementDetails);
         delete this.highlightItems[doc.getId()];
      }
   },

   initXsltData: function(data, el) {
      this.initData(data);

      if (data._initXslt)
         return;
      data._initXslt = true;
      var tbody = el.firstChild.lastChild;
      var factor = (data.details.length > 0) ? 2 : 1;
      var menuColumn = -1;
      for (var i=0, c; c = data.columns[i]; i++)
         if (c.c && c.c.id == 'contextMenu') {
            menuColumn = i;
            break;
         }
      
      for (var i=0; i<data.itemByPosition.length; i++) {
         var item = data.itemByPosition[i];
         item.element = tbody.childNodes[(i+1)*factor];
         if (menuColumn != -1)
            item.elementMenu = item.element.childNodes[menuColumn].firstChild;
      }
   },
   
   renderXslt: function(stream, el, data) {
      try {
         var p = lconn.share.widget.FileRendererCustom._summaryXslt;
         if (!p) {
            lconn.share.util.xsl.Processor.documentImplementation = data.xml.ownerDocument.implementation;
            p = lconn.share.widget.FileRendererCustom._summaryXslt = lconn.share.util.xsl.createProcessor(this.xsltSummary);
         }
         if (!stream.xsltAct)
            stream.xsltAct = lconn.share.widget.FileRendererCustom.prototype.xsltAction;
         
         var start = new Date().getTime();
         
         var args = {
            widgetId: stream.id, 
            currentUserId: this.permissions.authenticatedId || "",
            showFavorite: !!this.createFavoriteToggle,
            noBreak: dojo.isIE < 8,
            _blankGif: dojo.config.blankGif.toString(),
            newline: '\n' // Safari is insane, and needs this passed in
         };
         if (this.xsltSummaryParams)
            dojo.mixin(args, this.xsltSummaryParams);         
         var frag = p.transformToHtml(data.xml.ownerDocument, document, args);
         
         var d = document;
   
         var startupdates = new Date().getTime();
         var table = frag.firstChild;
         dojo.connect(table, "onmousedown", dojo.hitch(this, "toggleByElement", stream, data.details.length > 0));
   
         var qud = lconn.share.util.dom;
         var namespace = qud.DOCUMENTS_ATOM_NAMESPACE;
         var fromIsoString = dojo.date.stamp.fromISOString;
         var millisInDay = 86400000;
         var today = new Date();
         today.setHours(0);today.setMinutes(0);today.setSeconds(0);today.setMilliseconds(0);
         var year = today.getFullYear();
         today = today.getTime();
         var yesterday = today - millisInDay;
         var week = today - 6*millisInDay;
         var nlsDate = this._appstrings.DATE;
         var nlsToday = nlsDate.TODAY_U;
         var nlsYesterday = nlsDate.YESTERDAY_U;
         var nlsDays = dojo.date.locale.getNames("days", "wide");
         var optDate = {selector:'date',formatLength: 'short'};
         var optTime = {selector:'time',formatLength: 'short'};
         var qudate = lconn.share.util.date;
         
         var rows = table.firstChild.childNodes;
         var length = rows.length;
         for (var i=0; i<length; i++) {
            var tr = rows[i];
            var span = tr.childNodes[3].firstChild;
            var modified = span.title;
            var date = fromIsoString(modified);
            if (!date)
               continue;
            var datestamp = date.getTime();
            var s;
            if (datestamp > today)
               s = dojo.date.locale.format(date, optTime);
            else if (datestamp > yesterday)
               s = nlsYesterday;
            else if (date.getFullYear() == year)
               s = qudate.format(date, nlsDate.COMPACT.MONTH, nlsDate);
            else
               s = dojo.date.locale.format(date, optDate);
            span.appendChild(d.createTextNode(s));
            
            if (this.createFavoriteToggle) {
               var td = tr.childNodes[6];
               var t = this.createFavoriteToggle(dojo.attr(td, "_uid"));
               td.appendChild(t);
            }
         }
         
         var startheader = new Date().getTime();
         var tbody = this.renderHeader(stream, el, data, d);
         if (tbody) 
            table.insertBefore(tbody, table.firstChild);
   
         var startpaging = new Date().getTime();
         this.updatePaging(stream, el, data);
   
         var startreplace = new Date().getTime();
         var oldNode = el.replaceChild(table, el.firstChild);
   
         var old = [oldNode];
         while (table.nextSibling)
            old.push(el.removeChild(table.nextSibling));
         
         var end = new Date().getTime();
         setTimeout(function removeOldNodes() {dojo.forEach(old, lconn.share.util.html.removeChildren);}, 0);
   
         if (this.highlightItems) {
            var initData = false;
            for (var id in this.highlightItems) {
               if (!initData) {
                  this.initXsltData(data, el);
                  initData = true;
               }
               var item = data.itemById[id];
               // Possible the item we want to highlight isn't on this page
               if (item)
                  this.highlight(item.element);
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
         
      }
      catch (e) {
         console.error(e);
         this.renderError(stream, el, data, {message: this._appstrings.ERROR_OCCURRED});
      }
   },

   toggleByElement: function(stream, hasDetails, e) {
      // Ignore right-clicks
      if (!e || e.button > (dojo.isIE ? 1:0))
         return;

      var t = e.target;
      var testNodes = {td:1,th:1};
      if (t && t.nodeName) {
         if (dojo.indexOf(["h4","td","th"],t.nodeName.toLowerCase()) != -1) {
            while (!testNodes[t.nodeName.toLowerCase()])
               t = t.parentNode;
            var tr = t.parentNode;
            
            if (t.style.cursor == "pointer") {
               var i = dojo.indexOf(tr.parentNode.childNodes, tr) - 1;
               if (hasDetails)
                  i = Math.floor(i / 2);
               // Fire the mousedown handler to capture whether the menu is currently expanded
               this.mousedownMenu(stream, i, e);
               if (stream.xsltAct)
                  stream.xsltAct("showMenu", i, e);
               else
                  this.showMenu(stream, i, e);
            }
         }
      }      
   },
 
   _updateItem: function(stream, data, el, item, oldItem, position) {
      var d = document;
      
      var tr = oldItem.element;
      var trd = oldItem.elementDetails;

      oldItem.element = oldItem.elementDetails = null;

      var tbody = tr.parentNode;
      var table = tbody.parentNode;
      this.renderItem(stream, tbody, data, item, position, position == 0, position == data.itemByPosition.length-1, tr, trd);
      this.attachDragSource(table, stream, data);
     
   },
   
   getSorts: function() {throw "Not implemented";}
});


