/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.StreamRenderer");

dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.core.aria.Toolbar");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.share.widget.StreamRenderer", null,  {

   minimalPaging: false,
   isPaging: true, // indicates, if stream is rendered paged or not; can be overridden by sub classes
   emptyClass: "lconnEmpty",
   loadingClass: "qkrLoading",
   errorClass: "qkrError",
   currentById: [],

   constructor: function(opts) {
      this.widgets = [];
      this.sorts = [];
      dojo.mixin(this, opts);
   },
   postMixInProperties: function() {
   },
   destroy: function() {
      this.cleanup();
   },
   cleanup: function() {
      lconn.share.util.misc.destroy(this.widgets);
      this.widgets = [];
   },

   isPagedRenderer: function() {
      return this.isPaging;
   },

   /*
    * interface function, to be overridden by sub classes
    * in order to apply a maximum height for the widget rendering the stream
    * 
    * @param {int} maxHeight - maximum height for the widget (unit: px)
    */
   setMaxRendererHeight: function( maxHeight ) {
      // default behavior: nothing to do
      // override function, if handling is needed
   },

   _getItems: function(xml) {
      return dojo.filter(lconn.share.util.dom.getElementsByTagNameNS(xml, "entry", lconn.share.util.dom.NAMESPACES.ATOM),function(e) {return e.parentNode == xml;});
   },
   _buildItem: function(item) {
      return item;
   },
   
   initData: function(data) {
      if (data._init) {
         dojo.forEach(data.itemByPosition, function(item){item._isExpanded = item._isRendered = null;});
         return data.itemByPosition;
      }
      var byId;
      
      if (lconn.share.util.configUtil.isFilesEnableContinuousScrolling(this.app.authenticatedUser)) {
        byId = data.itemById = this.currentById;
      } else {
        byId = data.itemById = {};
      }
      var byPos = data.itemByPosition = [];
      
      var items = (data.json) 
         ? data.json.items
         : this._getItems(data.xml);
      var size = (data.paging) 
            ? Math.min(data.paging.size,items.length)
            : items.length;

      for (var i=0; i<size; i++) {
         var item = items[i];
         var qualifier = undefined;
         item = this._buildItem(item);
         byPos.push(item);
         if (typeof item.getId == "function")
            byId[item.getId()] = item;
         else if (item.id)
            byId[item.id] = item;
         try {
            item._position = i;
            item._qualifier = qualifier;
            item.feedItems = data;         
         } catch (e) {} // some objects may be read only
      }
      
      this.selectionUpdateItems(byPos);
      
      data._init = true;
      return byPos;
   },
   
   selectionChanged: function(selection) {},
   selectionUpdateItem: function(newitem, olditem) {},
   selectionUpdateItems: function(items) {},
   
   updateItem: function(stream, data, el, item, newItem) {
      if (data.itemByPosition && typeof item == "number")
         item = data.itemByPosition[item];
      if (typeof item._position == "undefined")
         item = data.itemById[item.getId()];
      if (!item)
         throw "Can't determine what row item was in";
     
      if (item) {
         if (newItem) {
            newItem = this.replaceItem(data, item, newItem);
            this.updateItemFinal(stream, data, el, item, newItem);
         }
         else
            this.net.getXml({
               url: this.getUrlExpand(item),
               handle: dojo.hitch(this, this.updateItemComplete, stream, data, el, item),
               timeout: stream.timeoutRetrieve*1000
            });            
      }
   },
   updateItemComplete: function(stream, data, el, oldItem, response, ioArgs) {
      if (response instanceof Error) {
      }
      else {
         var item = this.replaceItem(data, oldItem, response.documentElement);
         this.updateItemFinal(stream, data, el, oldItem, item);
      }
   },
   updateItemFinal: function(stream, data, el, oldItem, item) {
      data._isUpdated = true;
      var position = oldItem._position;
      this.animations = [];
      this._updateItem(stream, data, el, item, oldItem, position);
      for (var i=0; i<this.animations.length; i++)
         this.animations[i].play();
   },

   render: function(stream, el, data) {
      this.cleanup();

      data._init = false;
      var items = this.initData(data);
      var size = items.length;
      
      if (size == 0)
         this.renderEmpty(stream, el, data);
      else {
         this.updatePaging(stream, el, data);
         lconn.share.util.html.removeChildren(el);
         this.renderSorting(stream, el, data);
         this.renderItems(stream, el, data, items, size);
      }
	  lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
   },
   
   createA11NMessage: function(s, label){
      var titleEl = dojo.byId("scene-title");
      var link = dojo.query("a", titleEl)[0];
         if (titleEl && link) {
            dijit.setWaiState(link, "describedby", label);
         }
   },
   
   renderAsTable: function(stream, el, data, item) {
      this.cleanup();
      
      data._init = false;
      var adapter = this.feedAdapter;
      var items = null;
      if (adapter)
         items = adapter.parse(data);
      else
         items = this.initData(data);
      
      if (this.showRoot) {
         items.unshift(this.rootItem);
      }
      
      var size = items.length;

      if (size > 0) {
         var d = document;
         var fragment = d.createDocumentFragment();
         
         var th_t = d.createElement("th");
         var a_t = d.createElement("a");
         var span_t = d.createElement("span");
         dijit.setWaiState(el, "live", "assertive");                        
         var table = d.createElement("TABLE");
            dijit.setWaiRole(table, "presentation");
            table.className = "lotusTable";
            table.style.fontSize = "inherit";
            table.cellSpacing = table.cellPadding = 0;
            this.decorateTable(table);

            var sortInfo = this.getSortInfo(stream,data);
            if (sortInfo) {
               var sorts = sortInfo.list;
               var activeSort = sortInfo.active;
               var sortReversed = sortInfo.reversed;
         
               var thead = d.createElement("THEAD");
                  var tr = d.createElement("TR");
                     tr.className = "lotusSort";
                     for (var i=0,sort; sort=sorts[i]; i++) {
                        var th = th_t.cloneNode(true);
                        if (sort.width)
                           th.width = sort.width;

                        if (sort.className) th.className = sort.className;

                        if (sort.isSortable != false) {
                           var a = a_t.cloneNode(true);
                              dijit.setWaiRole(a, "button");
                              dijit.setWaiState(a, "pressed", sort == activeSort);
                              var asc = false;
                              if (sort == activeSort) {
                                 asc = ((sort.lowToHigh) ? !sortReversed : sortReversed);
                                 dojo.addClass(a, asc ? "lotusAscending" : "lotusDescending");
                              }
                              this.generateSortLink(stream, sort, ((activeSort ? activeSort.id != sort.id : true) || sortReversed) ? true : false, a);
                              a.appendChild(d.createTextNode(sort.name));
                              if (sort == activeSort) {
                                 var altSpan = span_t.cloneNode(true);
                                    altSpan.className = "lotusAltText";
                                    altSpan.appendChild(d.createTextNode(asc ? " \u25B2 " : " \u25BC "));
                                 a.appendChild(altSpan);
                              }
                           th.appendChild(a);
                         }
                         else
                            th.appendChild(d.createTextNode(sort.name));
                        tr.appendChild(th);
                     }
                  thead.appendChild(tr);
               table.appendChild(thead);
            }
            var tbody = d.createElement("TBODY");
      
            for (var i=0; i<size; i++)
               this.renderItem(stream, tbody, data, items[i], i, i==0, (i==size-1));

            table.appendChild(tbody);

            setTimeout(dojo.hitch(this, this.attachDragSource, table, stream, data), 2000);

         fragment.appendChild(table);
            
         this.updatePaging(stream, el, data);
                  
         var existingChildren = dojo._toArray(el.childNodes);
         for (var child,i=0; child=existingChildren[i]; i++)
            child.style.display = "none";
         el.replaceChild(fragment, existingChildren[0]);
         for (var child,i=0; child=existingChildren[i]; i++) {
            lconn.share.util.html.destroyWidgets(child);
            if (child.parentNode) child.parentNode.removeChild(child);
         }         
      }
      else
         this.renderEmpty(stream, el, data);
   },
   decorateTable: function(table) {},
   attachDragSource: function(table, stream, data) {},
   
   renderItems: function(stream, el, data, items, size) {
      for (var i=0; i<size; i++)
         this.renderItem(stream, el, data, items[i], i, i==0, (i==size-1));
   },
   
   isSortValid: function(sort) {
      return true;
   },

   getSortInfo: function(stream,data) {
      var sortId = this.sortId;
      var sortReversed = this.sortReversed;

      var sorts = dojo.filter(this.getSorts(sortId, sortReversed, stream, data), dojo.hitch(this, this.isSortValid));
      if (sorts && sorts.length > 0) {
         var activeSort = lconn.share.util.misc.indexById(sorts, 'id', sortId);
         if (!sortId && !activeSort) {
            for (var i=0; i<sorts.length; i++)
               if (sorts[i].isDefault) {
                  activeSort = sorts[i];
                  break;
               }
            if (!activeSort)
               activeSort = sorts[0];
            sortReversed = false;
         }
         return {list: sorts, active: activeSort, reversed: sortReversed};
      }
   },
   
   renderSorting: function(stream, el, data, opt) {
      var sortInfo = this.getSortInfo(stream,data);
      if (sortInfo) {
         var sorts = sortInfo.list;
         var activeSort = sortInfo.active;
         var sortReversed = sortInfo.reversed;
         
         var d = document;
         var div = d.createElement("div");
         el.appendChild(div);
         el = div;
         var div = d.createElement("div");
            div.className = "lotusLeft lconnSelectAllContainer";
            this.renderSelectAll(stream, div, data, d, opt);
         el.appendChild(div);
         var div = d.createElement("div");
            div.className = "lotusSort";
            var ul = d.createElement("ul");
               ul.className = "lotusInlinelist";
                  dijit.setWaiRole(ul, "toolbar");
                  dijit.setWaiState(ul, "label", stream._strings.SORT_BY);
               var li = d.createElement("li");
                  li.className = "lotusFirst";
                  li.appendChild(d.createTextNode(stream._strings.SORT_BY));
               ul.appendChild(li);
               for (var i=0,sort; sort=sorts[i]; i++) {
                  if (!sort.id || sort.isSortable == false)
                     continue;
                  var li = d.createElement("li");
                     var a = d.createElement("a");
                        dijit.setWaiRole(a, "button");
                        dijit.setWaiState(a, "pressed", sort == activeSort);
                        var asc = false;
                        if (sort == activeSort) {
                           asc = ((sort.lowToHigh) ? !sortReversed : sortReversed);
                           dojo.addClass(a, "lotusActiveSort");
                           dojo.addClass(a, asc ? "lotusAscending" : "lotusDescending");
                           setTimeout(dojo.hitch(this, function(activedSortNode) {
                              if (activedSortNode && lconn.share.widget.StreamRenderer.prototype.updateFromSorting) {
                                 lconn.share.widget.StreamRenderer.prototype.updateFromSorting = false;
                                 dijit.focus(activedSortNode);
                              }
                           }, a), 120);
                        }else
                           asc = !sort.lowToHigh;
                        var nls = stream._strings;
                        
                        var ariaLabel = asc? nls.SORTING_DESC : nls.SORTING_ASC;
                        if (sort.tooltip) {
                           a.title = sort.tooltip;
                           ariaLabel =  asc? dojo.string.substitute(nls.SORTING_DESC_LONG, [sort.tooltip]) : dojo.string.substitute(nls.SORTING_ASC_LONG, [sort.tooltip]);
                        }
                        dijit.setWaiState(a, "label", ariaLabel);

                        this.generateSortLink(stream, sort, ((activeSort ? activeSort.id != sort.id : true) || sortReversed) ? true : false, a);
                        a.appendChild(d.createTextNode(sort.name));
                        dojo.connect(a, "onclick", function() {
                           lconn.share.widget.StreamRenderer.prototype.updateFromSorting = true;
                        });
                        if (sort == activeSort) {
                           var altSpan = d.createElement("span");
                              altSpan.className = "lotusAltText";
                              altSpan.appendChild(d.createTextNode(asc ? " \u25B2 " : " \u25BC "));
                           a.appendChild(altSpan);
                        }
                     li.appendChild(a);
                  ul.appendChild(li);
               }
               if (ul.firstChild.nextSibling)
                  dojo.addClass(ul.firstChild.nextSibling, "lotusFirst");
               var tb = new lconn.core.aria.Toolbar(ul, {
                  _isSelected: function(item) {
                     return dojo.hasClass(item, "lotusActiveSort");
                  }
               });
               if (this.widgets) this.widgets.push(tb);
            div.appendChild(ul);
         el.appendChild(div);
      }
   },
      
   renderSelectAll: function(stream, el, data, d, opt) {
   },
   
   renderItem: function(stream, el, data, item, position, isFirst, isLast) {
   },
   
   renderLoading: function(stream, el) {
      var d = document;
      lconn.share.util.html.removeChildren(el);

      var div = d.createElement("DIV");
         div.className = this.loadingClass || "";
         var img = d.createElement("IMG");
            img.className = "lotusLoading";
            img.alt = "";
            img.src = dojo.config.blankGif;
         div.appendChild(img);
         div.appendChild(d.createTextNode("\u00a0"));
         div.appendChild(d.createTextNode(stream._strings.LOADING));
      el.appendChild(div);
   },
   
   renderError: function(stream, el, data, error) {
      if (error.type != "noFiles") {
         var d = document;
         lconn.share.util.html.removeChildren(el);
   
         this.updatePaging(stream, el, {});
         this.renderSorting(stream, el, data);
   
         var div = d.createElement("DIV");
            div.className = this.errorClass || "";
            div.appendChild(d.createTextNode(error.message));
            dijit.setWaiState(div, "live", "assertive");
         el.appendChild(div);
      }
      else
         this.renderEmpty(stream, el, data);
   },
   
   renderEmpty: function(stream, el, data) {
      var d = document;
      lconn.share.util.html.removeChildren(el);
      this.updatePaging(stream, el, data);
      var eMsg=null;
      if(stream._strings.RECENTLY_CONTRIBUTED!=undefined && stream._strings.RECENTLY_CONTRIBUTED!=null && stream._strings.RECENTLY_CONTRIBUTED!=''){
    	  eMsg=stream._strings.RECENTLY_CONTRIBUTED.EMPTY.CONTRIBUTOR.ANY;
      }else{
    	  eMsg=stream._strings.EMPTY;
      }
      var div = d.createElement("DIV");
         div.className = this.emptyClass || "";
         var contents = stream.msgNoData || eMsg;
         if (typeof contents == "string")
            contents = d.createTextNode(contents);
         else
            contents = contents.cloneNode(true);
         div.appendChild(contents);
         dijit.setWaiState(div, "live", "assertive");
      el.appendChild(div);
      
      var label = div.id = "emptyMsg";
      this.createA11NMessage(stream, label);
   },
   
   renderTypes: function(stream, el, data) {
      var d = document;
      
      if (this.types) {
         var div = d.createElement("div");
            div.className = "lotusSort";                     
            var ul = d.createElement("ul");                     
               ul.className = "lotusInlinelist";
               var li = d.createElement("li");
                  li.className = "lotusFirst";
                  li.appendChild(d.createTextNode(stream.typeLabel));
               ul.appendChild(li);
               for (var i=0,type; type=this.types[i]; i++) {
                  var li = d.createElement("li");
                     if (i==0)
                        li.className = "lotusFirst";
                     var a = d.createElement("a");
                        if (type == this.activeType)
                           dojo.addClass(a, "lotusActiveSort");
                        this.generateLinkToTypes(stream, type, a);
                        a.appendChild(d.createTextNode(type.name));
                     li.appendChild(a);
                  ul.appendChild(li);
               }
            div.appendChild(ul);
         el.appendChild(div);
      }
   },
   
   allowMultipleExpand: function(stream) {
      return true;
   },
   
   forceExpandItem: function(stream, position, e) {
      if (e) dojo.stopEvent(e);
      var item = stream.data.itemByPosition[position];
      
      if (!item._isExpanded)
         this.toggleItem(stream, position);
   },

   toggleItem: function(stream, position, e) {
      if (e) dojo.stopEvent(e);
      var item = stream.data.itemByPosition[position];
      
      if (item._expanding)
         return;
      
      if (item._isExpanded) {
         this.collapseItem(stream, stream.data, item, position);
         item._isExpanded = false;

         if (!this.allowMultipleExpand())
            stream._expandItem = null;
      }
      else if (!item._isRendered) {
         if (!this.allowMultipleExpand() && stream._expandItem) {
            this.collapseItem(stream, stream.data, stream._expandItem, stream._expandItem._position);
            stream._expandItem._isExpanded = false;
            stream._expandItem = null;
         }
         this.renderItemExpand(stream, stream.data, item, position);
         item._isRendered = true;
         item._isExpanded = true;
         
         if (!this.allowMultipleExpand())
            stream._expandItem = item;
      }
      else {
         if (!this.allowMultipleExpand() && stream._expandItem) {
            this.collapseItem(stream, stream.data, stream._expandItem, stream._expandItem._position);
            stream._expandItem._isExpanded = false;
            stream._expandItem = null;
         }

         this.expandItem(stream, stream.data, item, position);
         item._isExpanded = true;

         if (!this.allowMultipleExpand())
            stream._expandItem = item;
      }
   },
   
   updatePaging: function(s, el, data, opt) {
      var d = document;
      opt = opt || {};
      if (s.topPageNode)
         s.topPageNode.className = "lotusPaging";
      if (s.bottomPageNode)
         s.bottomPageNode.className = "lotusPaging";

      var paging = data.paging;
      if ( (this.isPagedRenderer() 
          && paging && paging.size > 0 && paging.total != 0) && !opt.enableContinuousScrolling ) {
         var hasPrevious = paging.hasPrevious();
         var hasNext = paging.hasNext();
         
         if (this.minimalPaging && !hasNext && !hasPrevious) {
            this._h(s.topPageNode);
            this._h(s.bottomPageNode);
         }
         else {
         	if (s.pageSizeListNode) {
         	   var focusedNode = null;
   	         var sizes = s.pageSizeListNode.getElementsByTagName("A");
   	         dojo.forEach(sizes, function (size) {
   	         	size.parentNode.style.display = ""; 
   	         	size.value = parseInt(size.id.replace('pageSize_', ''));
   	         	
   	         	var selectedNode = s[size.id];
   	         	selectedNode.style.display = "none";
   	         });
   	         for (var i = 0; i < sizes.length; i++) {
   	            var size = sizes[i];
   	            if (size.value == paging.size) {
   	            	size.parentNode.style.display = "none";
   	            	
   	            	var selectedNode = s[size.id];
   	            	selectedNode.style.display = "";
   	         	   if (i == sizes.length-1) {
	         		   focusedNode = sizes[0];
	         	   }
	         	   else {
	         		   focusedNode = sizes[i+1];
	         	   }
   	            }
   	            else if (size.value != -1) {
   	               dijit.setWaiState(size, "pressed", false);
   	               dojo.connect(size, "onclick", dojo.hitch(this, this.setPageSize, size.value));
                  }
   	         }
   	         setTimeout(dojo.hitch(this, function() {
   	            if (focusedNode && lconn.share.widget.StreamRenderer.prototype.updateFromPageSize) {
   	               lconn.share.widget.StreamRenderer.prototype.updateFromPageSize = false;
   	               dijit.focus(focusedNode);
   	            }
   	         }), 120);
   	         new lconn.core.aria.Toolbar(s.pageSizeListNode);
   	      }
         
            this._d(s.tPreviousLinkNode,hasPrevious);
            this._d(s.bPreviousLinkNode,hasPrevious);
            this._d(s.tNextLinkNode,hasNext);
            this._d(s.bNextLinkNode,hasNext);

            this._d(s.tPreviousTextNode,!hasPrevious && hasNext);
            this._d(s.bPreviousTextNode,!hasPrevious && hasNext);
            this._d(s.tNextTextNode,!hasNext && hasPrevious);
            this._d(s.bNextTextNode,!hasNext && hasPrevious);
            
            var node = null;
            if(!opt.dataInited){
               if(!hasPrevious && hasNext)
                  if(node = s.tNextLinkNode || s.bNextLinkNode)
                     dijit.focus(node.firstChild);
               if(!hasNext && hasPrevious)
                  if(node = s.tPreviousLinkNode || s.bPreviousLinkNode)
                     dijit.focus(node.firstChild);
            }
               
            if (this.minimalPaging) {
               var display = (hasNext || hasPrevious) ? "" : "none";
               this._s(s.topPageNode, display);
               this._s(s.bottomPageNode, display);
            }
            else {
               this._s(s.topPageNode);
               this._s(s.bottomPageNode);
            }
               
            this._s(s.topPageNavigateNode);
            this._s(s.bottomPageNavigateNode);
   
            this.createPageCount(d, s, s.pageInfoNode, paging);
            
            if (paging.total != -1) {
               var page = Math.floor((paging.startIndex) / paging.size) + 1;
               var pages = Math.ceil(paging.total / paging.size);
               
               this.createPageList(d, s, s.pageListNode, page, pages);
               this.createJumpTo(d, s, s.jumpPageNode, page, pages);
            }
            else
               this._h(s.pageListNode);

            this._d(s.pageSizeListNode, paging.size != -1);
            var label = s.pageInfoNode.id = "_paging_";
            this.createA11NMessage(s, label);
         }
      }
      else {
         this._h(s.topPageNode);
         this._h(s.bottomPageNode);
         this._h(s.topPageNavigateNode);
         this._h(s.bottomPageNavigateNode);
         this._h(s.pageSizeListNode);
         this._h(s.pageInfoNode);
         this._h(s.pageListNode);
         this._h(s.jumpPageNode);
      }
   },
   
   /** helper methods to simplify checking whether elements have been removed */
   _d: function(el, bool) {if (!el) return; el.style.display = bool ? "" : "none";},
   _h: function(el) {if (!el) return; el.style.display = "none";},   
   _s: function(el, value) {if (!el) return; el.style.display = value || "";},   
   
   createPageCount: function(d, s, el, paging) {
      if (!el)
         return;
      if (paging.startIndex != -1) {
         var total = paging.total != -1 ? dojo.number.format(paging.total) : "-1";
         if (paging.displayTotal > 0)
            total = dojo.number.format(paging.displayTotal);
         var start = paging.startIndex+1;
         var end = paging.size+paging.startIndex;
         if (paging.total != -1) 
            end = Math.min(end, paging.total);
         while (el.firstChild) el.removeChild(el.firstChild);
         
         var args = [dojo.number.format(start),dojo.number.format(end),total];
         var status = total == -1 ? dojo.string.substitute(s._strings.COUNT2, args) : dojo.string.substitute(s._strings.COUNT, args);
         var statusAlt = total == -1 ? dojo.string.substitute(s._strings.COUNT2, args) : dojo.string.substitute(s._strings.COUNT_ALT, args);

         status = lconn.core.globalization.bidiUtil.numShapeStr(status);
         statusAlt = lconn.core.globalization.bidiUtil.numShapeStr(statusAlt);
         
         el.appendChild(d.createTextNode(status));
         el.title = statusAlt;
         dijit.setWaiState(el, "label", statusAlt);

         if (s.msgCap && !paging.hasNext() && paging.total != -1 && paging.displayTotal > paging.total) {
            var img = d.createElement("img");
               img.alt = img.title = dojo.string.substitute(s.msgCap, [dojo.number.format(paging.total)]);
               img.className = "lconnSprite lconnSprite-iconAttention16";
               img.style.margin = "0 4px";
               img.src = dojo.config.blankGif;
            el.appendChild(img);
         }
         el.style.display = "";
      }
      else
         el.style.display = "none";
   },
   
   createJumpTo: function(d, s, el, page, pages) {
      if (!el)
         return;
      if (pages > 1) {
          while (el.firstChild) el.removeChild(el.firstChild);
            var label = d.createElement("label");
              label.appendChild(d.createTextNode(s._strings.JUMP_TO_PAGE));
            el.appendChild(label);
            var input = d.createElement("input");
              input.id = s.id + "_ij";
            input.type = "text";
            input.value = page;
            input.setAttribute("autocomplete","OFF");
            
            var altText = dojo.string.substitute(s._strings.JUMP_TO_PAGE_ALT, [dojo.number.format(1), dojo.number.format(pages)]);
            altText = lconn.core.globalization.bidiUtil.numShapeStr(altText);
            input.title = altText;
            dijit.setWaiState(input, "label", altText);
            
          el.appendChild(input);
            var str = dojo.string.substitute(s._strings.OF_PAGES, [dojo.number.format(pages)]);
            str = lconn.core.globalization.bidiUtil.numShapeStr(str);
            el.appendChild(d.createTextNode(str));
          dojo.attr(label, "for", input.id);
          el.style.display = "";
          dojo.connect(input, "onkeypress", function(e) {if (e.charOrCode == dojo.keys.ENTER) {dojo.stopEvent(e);s.page(this.value >=pages? pages: this.value);}});
          dojo.connect(input, "onfocus", function(e) {dijit.selectInputText(this);});
      }
      else
         el.style.display = "none";
   },
   
   createPageList: function(d,s, el, page, pages) {
      if (!el)
         return;
      el.style.display = "none";
      
      if (pages > 1) {
         while (el.firstChild) el.removeChild(el.firstChild);
         var li = d.createElement("li");
            li.className = "lotusFirst";
            li.appendChild(d.createTextNode(s._strings.PAGE));
         el.appendChild(li);

         var pagesAroundCurrent = 3;
         
         // Always show page 1
         this.createSpecificPageLinks(d,s,el,1,1,page,pages);

         var startSurround = page - pagesAroundCurrent;
         if (startSurround <= 3)
            startSurround = 2;

         var endSurround = page + pagesAroundCurrent;
         if (endSurround >= pages - 2)
            endSurround = pages - 1;

         // Opening ellipsis
         if (startSurround > 2) {
            var li = d.createElement("li");
               li.appendChild(d.createTextNode(s._strings.ELLIPSIS));
            el.appendChild(li);
         }

         for (var i=startSurround; i <= endSurround; i++)
            this.createSpecificPageLinks(d,s,el,i,i,page,pages);
         
         // Closing ellipsis
         if (endSurround < pages - 1) {
            var li = d.createElement("li");
               li.appendChild(d.createTextNode(s._strings.ELLIPSIS));
            el.appendChild(li);
         }
         
         // Always show the last page
         this.createSpecificPageLinks(d,s,el,pages,pages,page,pages);
         
         el.style.display = "";
      }
      else
         el.style.display = "none";
   },
   
   createSpecificPageLinks: function(d, stream, el, startIndex, endIndex, current, total) {
      for (var i=startIndex;i<=endIndex;i++) {
         var li = d.createElement("li");
            if (i == 1) 
               li.className = "lotusFirst";

            var altText = dojo.string.substitute(stream._strings.PAGE_ALT, [dojo.number.format(i), dojo.number.format(total)]);
            if (i != current) {
               var a = d.createElement("a");
                  this.generatePagingLink(stream, i, a);
                  a.appendChild(d.createTextNode(i));
                  a.title = altText;
                  dijit.setWaiState(a, "label", altText);
               li.appendChild(a);
            }
            else {
               var span = d.createElement("span");
                  span.appendChild(d.createTextNode(dojo.number.format(i)));
                  span.title = altText;
                  dijit.setWaiState(span, "label", altText);
               li.appendChild(span);
            }
         el.appendChild(li);
      }
   },
   
   getSorts: function(sortId, direction) {
      return this.sorts;
   },
   
   changeSort: function(stream, sortId) {
      if (this.sortId)
         this.sortReversed = (this.sortId == sortId) ? !this.sortReversed : false;
      else
         this.sortReversed = false;
      this.sortId = sortId;
      if (this.getSortUrl) {
         stream.url = this.getSortUrl(stream, sortId, !this.sortReversed);
         stream.refresh();
      }
   },
   generateSortLink: function(stream, sort, naturalOrder, a) {
      a.href = "javascript:;";
      dojo.connect(a, "onclick", dojo.hitch(this, this.changeSort, stream, sort.id));
   },
   generatePagingLink: function(stream, page, a) {
      a.href = "javascript:;";
      dojo.connect(a, "onclick", dojo.hitch(stream, stream.page, page));
   }
});
