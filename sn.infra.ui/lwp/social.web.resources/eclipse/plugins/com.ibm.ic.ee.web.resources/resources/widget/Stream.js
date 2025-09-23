/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/dom-construct",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/dom",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/_base/lang",
	"dojo/on",
	"dojo/request",
	"dojo/string",
	"dojo/text!ic-ee/widget/templates/Stream.html",
	"dojo/topic",
	"dojo/number",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/registry",
	"ic-ee/bean/PermissionsBean",
	"ic-incontext/util/dom",
	"ic-incontext/util/html",
	"ic-incontext/util/misc",
	"ic-incontext/util/text",
	"ic-incontext/util/uri",
	"ic-core/globalization/bidiUtil"
], function (dojo, domConstruct, array, domClass, domDojo, declare, windowModule, lang, on, request, string, template, topic, number, 
                _Templated, _Widget, registry, PermissionsBean, dom, html, misc, text, uriModule, bidi) {

	//Keeps track of paging (current page) and provides useful methods to UI 
	//when rendering a stream.
	declare("com.ibm.social.ee.widget.StreamPaging", null, {   
	
	//  opt may include the following:
	//    - pageSize: the initial page size (default = 10)
	//    - page: the initial page (default = 1)
	   constructor: function(opt) {
	      lang.mixin(this, opt);
	      if (!this.pageSize) {
	         this.pageSize = 10;
	      }
	      if (!this.page) {
	         this.page = 1;
	      }
	   },
	
	// Sets total items. Generally this should be called
	// from the onBegin callback of the datastore with the 
	// size parameter.
	   setTotal: function (cnt) {
	      this.total = cnt;
	   },
	   
	
	// Sets the number of items fetched from a single fetch
	// request. Should be called from the onComplete callback
	// of the datastore, when we know how many items were fetched.
	   setFetched: function (cnt) {
	      this.fetched = cnt;
	   },
	   
	// Sets a flag to determine whether there are more records
	// available. This is only useful in the case that .setTotal
	// is called with a -1, which means that it's an unknown
	// number of items.
	   setHasNext: function (flag) {
	      this.hasMore = flag;
	   },
	   setPage: function (page) {
	      this.page = page;
	   },
	   setPageSize: function (pageSize) {
	      var startIndex = (this.page - 1)*this.pageSize;
	      this.pageSize = pageSize;
	      this.page = Math.floor(startIndex / pageSize) + 1;
	   },
	   hasNext: function () {
	      if (this.total > -1) {
	         return (this.page < this.getLastPage());
	      } else {
	         return this.hasMore;
	      }
	   },
	   hasPrevious: function () {
	      return this.page > 1;
	   },
	   nextPage: function () {
	      if (this.hasNext()) {
	         this.page++;
	      }      
	      return this.getStartIndex();
	   },
	   previousPage: function () {
	      if (this.hasPrevious()) {
	         this.page--;
	      }
	      return this.getStartIndex();
	   },
	   getStartIndex: function () {
	      var start = ((this.page - 1) * this.pageSize);
	      return start;
	   },
	   getNextPage: function() {
	      if (this.hasNext()) {
	         return this.page+1;
	      }
	      return -1;
	   },
	   getPreviousPage: function() {
	      if (this.hasPrevious()) {
	         return this.page-1;
	      }
	      return -1;
	   },
	   getLastPage: function() {
	      if (this.total > 0) {
	         return Math.ceil(this.total / this.pageSize);
	      }
	      return -1;
	   },
	   isFullPage: function() {
	      return (this.fetched > 0 && this.fetched == this.pageSize);
	   },
	   isPastEnd: function() {
	      if (this.page > 1) {
	         if (this.fetched === 0) { return true; }
	         var lastPage = this.getLastPage();
	         if (lastPage != -1 && this.page > lastPage) {
	            return true;
	         } 
	      }
	      return false;
	   },
	   
	   detect: function(url,data,type) {
	      var uri,p,pageSize=-1,startIndex=-1;
	      if (url) {
	         uri = uriModule.parseUri(url);
	         p = uri.queryParameters;
	         if (p.page) {
	            pageSize = text.parseInt(p.pageSize,10);
	            startIndex = (text.parseInt(p.page,1) - 1) * pageSize;
	         }
	         else if (p.sI) {
	            pageSize = text.parseInt(p.pageSize,-1);
	            startIndex = text.parseInt(p.sI,1) - 1;
	         }
	         else
	            pageSize = text.parseInt(p.pageSize,-1);
	      }
	      
	      var itemsInFeed,totalItems,previousUrl,nextUrl;
	      if (type == "json") {
	         itemsInFeed = (data.items) ? data.items.length : 0;
	         totalItems = -1;
	         if (typeof data.totalItems == "number")
	            totalItems = data.totalItems;
	         else if (typeof data.totalSize == "number")
	            totalItems = data.totalSize;
	         previousUrl = data.previousUrl;
	         nextUrl = data.nextUrl;
	      }
	      else {
	         itemsInFeed = data.getElementsByTagName("entry").length;
	         totalItems = text.parseInt(dom.getChildElementTextContentNS(data, "totalResults", dom.OPENSEARCH_NAMESPACE), -1);
	         previousUrl = dom.getChildElementAttributeMatching(data, "link", "rel", "previous", "href");
	         nextUrl = dom.getChildElementAttributeMatching(data, "link", "rel", "next", "href");
	      }
	      
	      // If we don't know our startIndex, but we know our pageSize and our previous url, calculate it
	      if (startIndex == -1 && pageSize != -1 && previousUrl) {
	         var previousUri = uriModule.parseUri(previousUrl);
	         var previousParams = previousUri.queryParameters;
	         if(previousParams.page)
	            startIndex = text.parseInt(previousParams.page,1) * pageSize;
	         else if(previousParams.sI)
	            startIndex = text.parseInt(previousParams.sI,1) - 1 + pageSize;
	      }
	
	      // If we still didn't find a starting index, default to the beginning
	      if (startIndex == -1)
	         startIndex = 0;
	
	      this.items = itemsInFeed;
	      if (data) {
	         if (totalItems != -1) {
	            this.mode = "index";
	            this.total = (startIndex === 0 && itemsInFeed < pageSize) ? itemsInFeed : totalItems;
	            this.startIndex = startIndex; 
	            this.uri = uri;
	         }
	         else if (startIndex === 0) {
	            this.mode = "index";
	            this.total = (itemsInFeed < pageSize) ? itemsInFeed : -1;
	            this.startIndex = 0;
	            this.uri = uri;
	         }
	   
	         if (!this.mode) {
	            if (previousUrl || nextUrl) {
	               this.mode = "url";
	               this.next = nextUrl;
	               this.previous = previousUrl;
	               this.startIndex = -1;
	               this.total = -1;
	            }
	            else {
	               this.mode = "index";
	               this.total = (itemsInFeed < pageSize) ? (startIndex+itemsInFeed) : -1;
	               this.startIndex = startIndex;
	               this.uri = uri;
	            }
	         }
	         if (!this.mode) {
	            this.mode = "unpaged";
	            this.startIndex = 0;
	            this.total = -1;
	         }
	
	         this.hasMore = (this.total != -1 && (this.startIndex + itemsInFeed) < this.total) || this.next || (this.total == -1 &&itemsInFeed == pageSize);
	         this.pastEnd = (itemsInFeed === 0 && (this.total > 0 || this.startIndex > 0));
	
	         if (pageSize == -1)
	            pageSize = itemsInFeed;
	         else if (this.checkForMore && pageSize > 0)
	            pageSize = pageSize - 1;         
	         this.size = pageSize;
	      }
	      else {
	         if (pageSize != -1) {
	            if (this.checkForMore)
	               pageSize = pageSize - 1;         
	
	            this.mode = "index";
	            this.startIndex = startIndex;
	            this.size = pageSize;
	            this.parameters = p;
	         }
	         else {
	            this.mode = "unpaged";
	            this.startIndex = 0;
	            this.size = -1;
	         }
	         this.total = -1;
	         this.visible = 0;
	      }
	   }
	});
	
	declare("com.ibm.social.ee.widget.StreamRenderer", null, {
	
	   minimalPaging: false,
	
	   constructor: function(opts) {
	      this.widgets = [];
	      this.sorts = [];
	      this.connections = [];
	      this.itemState = [];
	      lang.mixin(this, opts);
	   },
	   destroy: function() {
	      this.cleanup();
	   },
	   cleanup: function() {
	      misc.destroy(this.widgets);
	      this.widgets = [];
	      this.itemState = [];
	      // Cleanup connections
	      array.forEach(this.connections, function(entry, i){
    		if(entry){
    			entry.remove();
    		}
  		  });

	      this.connections = [];
	   },
	
	   render: function(stream, el, data) {
	      var i;
	      this.updatePaging(stream, el, data);
	      while(stream.actionConnections && stream.actionConnections.length > 0) {
	         stream.actionConnections[stream.actionConnections.length - 1].remove();
	         stream.actionConnections.pop();
	      }
	      if(!stream.actionConnections)
	         stream.actionConnections = [];
	      if(this.actions) {
	         for (i=0; i<this.actions.length; i++) {
	            if (this.actions[i].ondelete)
	               stream.actionConnections.push(on(this.actions[i], "delete", lang.hitch(stream, "refresh")));
	            else if (this.actions[i].onfilechange)
	               stream.actionConnections.push(on(this.actions[i], "filechange", lang.hitch(stream, "onfilechange")));
	            else if (this.actions[i].onsuccess)
	               stream.actionConnections.push(on(this.actions[i], "success", lang.hitch(stream, "refresh")));
	            else if (this.actions[i].onchangescene)
	               stream.actionConnections.push(on(this.actions[i], "changescene", lang.hitch(stream.widget, stream.widget.changeScene)));
	         }
	      }
	      if(this.folderActions) {
	         for (i=0; i<this.folderActions.length; i++) {
	            if (this.folderActions[i].ondelete)
	               stream.actionConnections.push(on(this.folderActions[i], "delete", lang.hitch(stream, "refresh")));
	            else if (this.folderActions[i].onfilechange)
	               stream.actionConnections.push(on(this.folderActions[i], "filechange", lang.hitch(stream, "onfilechange")));
	            else if (this.folderActions[i].onsuccess)
	               stream.actionConnections.push(on(this.folderActions[i], "success", lang.hitch(stream, "refresh")));
	            else if (this.folderActions[i].onchangescene)
	               stream.actionConnections.push(on(this.folderActions[i], "changescene", lang.hitch(stream.widget, stream.widget.changeScene)));
	         }
	      }
	      if(this.pageActions) {
	         for (i=0; i<this.pageActions.length; i++) {
	            if (this.pageActions[i].ondelete)
	               stream.actionConnections.push(on(this.pageActions[i], "delete", lang.hitch(stream, "refresh")));
	            else if (this.pageActions[i].onfilechange)
	               stream.actionConnections.push(on(this.pageActions[i], "filechange", lang.hitch(stream, "onfilechange")));
	            else if (this.pageActions[i].onsuccess)
	               stream.actionConnections.push(on(this.pageActions[i], "success", lang.hitch(stream, "refresh")));
	            else if (this.pageActions[i].onchangescene)
	               stream.actionConnections.push(on(this.pageActions[i], "changescene", lang.hitch(stream.widget, stream.widget.changeScene)));
	         }
	      }
	      var size = (data.json) ? (data.json.items ? data.json.items.length : 0 ) : (data.items ? data.items.length : 0 );
	      data = (data.json) ? data.json : data;
	      if (size === 0)
	         this.renderEmpty(stream, el, data);
	      else {
	         html.removeChildren(el);
	         if(this.sortingEnabled)
	            this.renderSorting(stream, el, data);
	         for (i=0; i<size; i++) {
	            data.items[i]._position = i;
	            this.itemState[i] = data.items[i];
	            this.renderItem(stream, el, data, data.items[i], i, i===0, (i==size-1));
	         }
	      }
	   },
	   
	   renderItems: function(stream, el, data, items, size) {
	      for (var i=0; i<size; i++)
	         this.renderItem(stream, el, data, items[i], i, i===0, (i==size-1));
	   },
	   
	   getSortInfo: function() {
	      var sortId = this.sortId;
	      var sortReversed = this.sortReversed;
	      var sorts = this.getSorts(sortId, sortReversed);
	      if (sorts && sorts.length > 0) {
	         var activeSort = misc.indexById(sorts, 'id', sortId);
	         if (!activeSort) {
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
	
	   renderSorting: function(stream, el, data) {
	      var sortInfo = this.getSortInfo();
	      if (sortInfo) {
	         var sorts = sortInfo.list;
	         var activeSort = sortInfo.active;
	         var sortReversed = sortInfo.reversed;
	         
	         var d = windowModule.doc;
	         var div = domConstruct.create("div", {className: "lotusSort"}, el);
	            var ul = domConstruct.create("ul", {className: "lotusInlinelist"}, div);
	               var li = domConstruct.create("li", {className: "lotusFirst"}, ul);
	                  li.appendChild(d.createTextNode(stream._strings.SORT_BY));
	               for (var i=0,sort; sort=sorts[i]; i++) {
	                  li = domConstruct.create("li", null, ul);
	                     if (i===0)
	                        li.className = "lotusFirst";
	                     var a = domConstruct.create("a", {role: "button"}, li);
	                        if (sort == activeSort) {
	                           a.setAttribute("aria-pressed", true);
	                           domClass.add(a, "lotusActiveSort");
	                           var sortAsc = (sort.lowToHigh) ? !sortReversed : sortReversed;
	                           domClass.add(a,  sortAsc ? "lotusAscending" : "lotusDescending");
	                           a.setAttribute("aria-sort", sortAsc ? "ascending" : "descending");
	                           if(sortAsc && sort.sortAscMsg)
	                              a.title = sort.sortAscMsg;
	                           else if(!sortAsc && sort.sortDescMsg)
	                              a.title = sort.sortDescMsg;
	                        }
	                        else {
	                           a.setAttribute("aria-pressed", false);
	                           a.removeAttribute("aria-sort");
	                        }
	                        this.generateSortLink(stream, sort, (sort != activeSort || sortReversed) ? true : false, a);
	                        a.appendChild(d.createTextNode(sort.name));
	               }
	      }
	   },
	      
	   renderItem: function(stream, el, data, item, position, isFirst, isLast) {
	   },
	      
	   renderError: function(stream, el, data, error) {
	      this.updatePaging(stream, el, {});
	      
	      if (error.type != "noFiles") {
	         var d = windowModule.doc;
	         html.removeChildren(el);
	   
	         var div = domConstruct.create("DIV", {className: "qkrError"}, el);
	            this.addRenderErrorMessage(div, stream, error);
	         stream.hideLoading();
	      }
	      else
	         this.renderEmpty(stream, el, data);
	   },
	   
	   //Subclasses may override this method with a more specialized error if desired
	   addRenderErrorMessage: function(div, stream, error) {
	      var d = windowModule.doc;
		   if(error.type)
		      div.appendChild(d.createTextNode(error.type + ": " + error.message));
		   else
		      div.appendChild(d.createTextNode(error.message));
	   },
	   
	   renderEmpty: function(stream, el, data) {
	      var d = windowModule.doc;
	      html.removeChildren(el);
	      
	      this.renderTypes(stream, el, data);
	      
	      var div = domConstruct.create("DIV", {className: "qkrEmpty"}, el);
	         var msg;
	         if (stream.msgNoData) {         
	            msg = stream.msgNoData.SHARE.DEFAULT;
	         }
	         div.appendChild(d.createTextNode(msg || "Empty"));
	   },
	   
	   renderTypes: function(stream, el, data) {
	      var d = windowModule.doc;
	      
	      if (this.types) {
	         var div = domConstruct.create("div", {className: "lotusSort"}, el);
	            var ul = domConstruct.create("ul", {className: "lotusInlinelist"}, div); 
	               var li = domConstruct.create("li", {className: "lotusFirst"}, ul);
	                  li.appendChild(d.createTextNode(stream.typeLabel));
	               for (var i=0,type; type=this.types[i]; i++) {
	                  li = domConstruct.create("li", null, ul);
	                     if (i===0)
	                        li.className = "lotusFirst";
	                     var a = domConstruct.create("a", null, li);
	                        if (type == this.activeType)
	                           domClass.add(a, "lotusActiveSort");
	                        this.generateLinkToTypes(stream, type, a);
	                        a.appendChild(d.createTextNode(type.name));
	               }
	      }
	   },
	   
	   allowMultipleExpand: function(stream) {
	      return true;
	   },
	   
	   toggleItem: function(stream, position, e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      var itemState = this.itemState[position];
	      
	      if (itemState._isExpanded) {
	         this.collapseItem(stream, stream.data, itemState, position);
	         itemState._isExpanded = false;
	
	         if (!this.allowMultipleExpand())
	            stream._expandItem = null;
	      }
	      else if (!itemState._isRendered) {
	         if (!this.allowMultipleExpand() && stream._expandItem) {
	            this.collapseItem(stream, stream.data, stream._expandItem.item, stream._expandItem._position);
	            stream._expandItem._isExpanded = false;
	            stream._expandItem = null;
	         }
	         
	         this.renderItemExpand(stream, stream.data, itemState, position);
	         itemState._isRendered = true;
	         itemState._isExpanded = true;
	         
	         if (!this.allowMultipleExpand())
	            stream._expandItem = itemState;
	      }
	      else {
	         if (!this.allowMultipleExpand() && stream._expandItem) {
	            this.collapseItem(stream, stream.data, stream._expandItem.item, stream._expandItem._position);
	            stream._expandItem._isExpanded = false;
	            stream._expandItem = null;
	         }
	
	         this.expandItem(stream, stream.data, itemState, position);
	         itemState._isExpanded = true;
	
	         if (!this.allowMultipleExpand())
	            stream._expandItem = itemState;
	      }
	   },
	   
	   updatePaging: function(s, el, data) {
	      var d = windowModule.doc;
	      if (s.jumpPageNode)
	         this.destroyJumpTo(s.jumpPageNode);
	      if (s.topPageNode)
	         s.topPageNode.className = "lotusPaging";
	      if (s.bottomPageNode)
	         s.bottomPageNode.className = "lotusPaging";
	
	      var paging = data.paging;
	
	      if (paging && paging.fetched > 0 && paging.pageSize !== 0 && (paging.total == -1 || paging.fetched < paging.total)) {
	         var hasPrevious = paging.hasPrevious();
	         var hasNext = paging.hasNext();
	         if (this.minimalPaging && !hasNext && !hasPrevious) {
	            this._h(s.topPageNode);
	            this._h(s.bottomPageNode);
	         }
	         else {
	         	if (s.pageSizeListNode) {
	   	         var sizes = s.pageSizeListNode.getElementsByTagName("A");
	   	         array.forEach(sizes, function (size) {
	   	         	size.parentNode.style.display = ""; 
	   	         	size.value = text.parseInt(size.innerHTML, -1);
	   	         	domDojo.byId(s.id+size.value.toString()).style.display = "none";
	   	         });
	   	         for (var i = 0; i < sizes.length; i++) {
	   	            var size = sizes[i];
	   	            if (size.value == paging.pageSize) {
	   	            	size.parentNode.style.display = "none";
	   	            	domDojo.byId(s.id+size.value.toString()).style.display = "";
	   	            }
	   	         }
	   	      }
	            this._d(s.tPreviousLinkNode,hasPrevious);
	            this._d(s.bPreviousLinkNode,hasPrevious);
	            this._d(s.tPreviousTextNode,!hasPrevious);
	            this._d(s.bPreviousTextNode,!hasPrevious);
	            this._d(s.tNextLinkNode,hasNext);
	            this._d(s.bNextLinkNode,hasNext);
	            this._d(s.tNextTextNode,!hasNext);
	            this._d(s.bNextTextNode,!hasNext);
	
	            if (this.minimalPaging) {
	               var display = (hasNext || hasPrevious) ? "" : "none";
	               this._s(s.topPageNode, display);
	               this._s(s.bottomPageNode, display);
	            }
	            this._s(s.topPageNavigateNode);
	            this._s(s.bottomPageNavigateNode);
	   
	            this.createPageCount(d, s, s.pageInfoNode, paging);
	            
	            if (paging.total != -1) {
	               var page = paging.page;
	               var pages = paging.getLastPage();
	               
	               this.createPageList(d, s, s.pageListNode, page, pages);
	               this.createJumpTo(d, s, s.jumpPageNode, page, pages);
	            }
	            else
	               this._h(s.pageListNode);
	
	            this._d(s.pageSizeListNode, paging.pageSize != -1);
	         }
	      }
	      else {
	         if (this.minimalPaging) {
	            this._h(s.topPageNode);
	            this._h(s.bottomPageNode);
	         }
	         this._h(s.topPageNavigateNode);
	         this._h(s.bottomPageNavigateNode);
	         this._h(s.pageSizeListNode);
	         this._h(s.pageInfoNode);
	         this._h(s.pageListNode);
	      }
	   },
	   
	//  helper methods to simplify checking whether elements have been removed
	   _d: function(el, bool) {if (!el) return; el.style.display = bool ? "" : "none";},
	   _h: function(el) {if (!el) return; el.style.display = "none";},   
	   _s: function(el, value) {if (!el) return; el.style.display = value || "";},   
	   hidePaging: function (s) {
	      this._h(s.topPageNavigateNode);
	      this._h(s.bottomPageNavigateNode);
	      this._h(s.pageSizeListNode);
	      this._h(s.pageInfoNode);
	      this._h(s.pageListNode);
	   },
	   createPageCount: function(d, s, el, paging) {
	      if (!el)
	         return;
	      var startIndex = paging.pageSize * (paging.page - 1);
	      var start = startIndex+1;
	      var end = paging.fetched+startIndex;
	      if (paging.total != -1) 
	         end = Math.min(end, paging.total);
	      var total;
	      if(paging.total == -1 && !paging.hasNext())
	         total = end;
	      else
	         total = paging.total != -1 ?number.format(paging.total) : "??";
	      domConstruct.empty(el);

	      var str;
	      if(total == "??")
	        str = string.substitute(s._strings.COUNT_SHORT, [number.format(start), number.format(end)]);
	      else
	        str = string.substitute(s._strings.COUNT, [number.format(start), number.format(end), total]);
	      str = bidi.numShapeStr(str);
	      el.appendChild(d.createTextNode(str));
          
	      el.style.display = "";
	   },
	   
	   createJumpTo: function(d, s, el, page, pages) {
	      if (!el)
	         return;
	         if (pages > 1) {
	         var label = domConstruct.create("label", null, el);
	            var id = registry.getUniqueId("qkrLW_label");
	            label.setAttribute("for", id);
	            label.appendChild(d.createTextNode(s._strings.JUMP_TO_PAGE));
	            var input = domConstruct.create("input", {type: "text", value: page, id: id}, el);
	            input.setAttribute("autocomplete","OFF");
	            var str = string.substitute(s._strings.OF_PAGES, [number.format(pages)]);
	            str = bidi.numShapeStr(str);
	            el.appendChild(d.createTextNode());
	         el.style.display = "";
	         var conn = on(input, "change", lang.hitch(null, function(scene, input, e){
	            if(e && (e.keyCode == 13))
	               scene.page(input.value);
	            }, s, input));
	         this.connections.push(conn);
	      }
	      else
	         el.style.display = "none";
	   },
	   destroyJumpTo: function(el) {
	      html.removeChildren(el);
	   },
	   
	   createPageList: function(d,s, el, page, pages) {
	      if (!el)
	        return;
	      domConstruct.empty(el);
	      el.style.display = "none";
	      var li = domConstruct.create("li", {className: "lotusFirst"}, el);
	         li.appendChild(d.createTextNode(s._strings.PAGE));
	         
	      if (pages > 1) {
	         var inEllipsis = false;
	         var pagesAroundCurrent = 3;
	         for (var i=1;i<=pages;i++) {
	            var delta = Math.abs(page-i);
	            if (delta <= pagesAroundCurrent) {
	               this.createSpecificPageLinks(d,s,el,i,i,page);
	               inEllipsis = false;
	            }
	            else if (i==1) {
	               this.createSpecificPageLinks(d,s,el,i,i,page);
	               inEllipsis = false;
	            }
	            else if (i==pages) {
	               this.createSpecificPageLinks(d,s,el,i,i,page);
	               inEllipsis = false;
	            }
	            else if (!inEllipsis) {
	               if (i+1 == pages) {
	                  this.createSpecificPageLinks(d,s,el,i,i,page);
	                  inEllipsis = false;
	               }
	               else if (i-1 == 1 && delta <= (pagesAroundCurrent+1)) {
	                  this.createSpecificPageLinks(d,s,el,i,i,page);
	                  inEllipsis = false;
	               }
	               else {
	                  var li = domConstruct.create("li", null, el);
	                     li.appendChild(d.createTextNode(s._strings.ELLIPSIS));
	                  inEllipsis = true;
	               }
	            }
	         }
	         el.style.display = "";
	      }
	      else
	         el.style.display = "none";
	   },
	   
	   createSpecificPageLinks: function(d, stream, el, startIndex, endIndex, current) {
	      for (var i=startIndex;i<=endIndex;i++) {
	         var li = domConstruct.create("li", null, el);
	            if (i == 1) 
	               li.className = "lotusFirst";
	            if (i != current) {
	               var a = domConstruct.create("a", null, li);
	                  this.generatePagingLink(stream, i, a);
	                  a.appendChild(d.createTextNode(i));
	            }
	            else {
	               var span = domConstruct.create("span", null, li);
	                  span.appendChild(d.createTextNode(number.format(i)));
	            }
	      }
	   },
	   
	   getSorts: function(sortId, direction) {
	      return this.sorts;
	   },
	   
	   changeSort: function(stream, sortId, naturalOrder) {
	      this.sortReversed = !naturalOrder;
	      this.sortId = sortId;
	      stream.refresh();
	   },
	   generateSortLink: function(stream, sort, naturalOrder, a) {
	      a.href = "javascript:;";
	      var conn = on(a, "click", lang.hitch(this, this.changeSort, stream, sort.id, naturalOrder));
	      this.connections.push(conn);
	   },
	   generatePagingLink: function(stream, page, a) {
	      a.href = "javascript:;";
	      var conn = on(a, "click", lang.hitch(stream, stream.page, page));
	      this.connections.push(conn);
	   }
	});
	
	var Stream = declare("com.ibm.social.ee.widget.Stream", [_Widget, _Templated], {
	
	   templateString: template,
	   
	   view: "summary",
	   baseClass: "",
	   renderer: new com.ibm.social.ee.widget.StreamRenderer(),
	   msgNoData: null,
	
	// Be sure to define strings for
	// LOADING, COUNT, ELLIPSIS, PAGE, NEXT, PREVIOUS, EMPTY, ERROR, ERROR_REQUEST_TIMEOUT, ERROR_REQUEST_CANCELLED, SORT_BY (optional)
	   _strings: null,
	   
	   postMixInProperties: function() {
	      if (this.oldWidget) {
	         this.data = { dataStore: this.oldWidget.dataStore, paging: this.oldWidget.paging };
	         delete this.oldWidget;
	      }
	      if (this.renderer) {
	         this._initPageStyle = (this.renderer.minimalPaging) ? "display: none" : "";
	         this._loadingImg = require.toUrl("ic-ee/images/loading.gif");
	         if (this.renderer.templatePath)
	            this.templatePath = this.renderer.templatePath;
	         if (this.renderer.templateString)
	            this.templateString = this.renderer.templateString;
	      }
	   },
	   
	   postCreate: function() {
	      this.msgNoData = this.msgNoData || this._strings.EMPTY;
	      this.inherited(arguments);
	      
	      if (this.pageSizeListNode) {
	         var sizes = this.pageSizeListNode.getElementsByTagName("A");
	         for (var i = 0; i < sizes.length; i++) {
	            var size = sizes[i];
	            var value = text.parseInt(size.innerHTML, -1);
	            if (value != -1) 
	               this.own(on(size, "click", lang.hitch(this, this.setPageSize, value)));
	         }
	      }
	      var pagingParam = {};
	      if (this.pageSize) {
	         pagingParam.pageSize = this.pageSize;         
	      }
	      if (this.startPage) {
	         pagingParam.page = this.startPage;
	      }
	      if (!this.data) {
	         this.data = { dataStore: this.dataStore, paging: new com.ibm.social.ee.widget.StreamPaging(pagingParam) };         
	      }      
	   },
	   getDataStore: function() {
	      return this.dataStore; 
	   },
	   setDataStore: function (ds) {
	      this.data.dataStore = this.dataStore = ds;
	      var pagingParam = { };
	      if (this.pageSize) {
	         pagingParam.pageSize = this.pageSize;         
	      }
	      this.data.paging = new com.ibm.social.ee.widget.StreamPaging(pagingParam);
	   },
	      
	   destroy: function() {
	      if (this.renderer) {
	         this.renderer.destroy();
	         this.renderer = null;
	      }
	      this.inherited(arguments);
	   },
	
	   setPageSize: function(size,e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      this.pageSize = size;
	      if(this.preferences)
	         this.preferences.put("itemsPerPage", size);
	      this.data.paging.setPageSize(size);
	      this.refresh();
	   },
	   
	   page: function(page, e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      if(page < 1 || page != parseInt(page))
	         page = 1; 
	      this.clearError();
	      if (!/^-?\d+$/.test(page)) {
	         this.setError(this._strings.ERROR_INVALID_PAGE);
	         return;
	      }
	      if (page > this.data.paging.getLastPage())
	         page = this.data.paging.getLastPage();
	      this.data.paging.setPage(page);
	      this.refresh();
	   },
	   setError: function(error) {
	       var d = windowModule.doc;
	       if(this.errorNode) {
		      this.errorNode.appendChild(d.createTextNode(error));
		      this.errorNode.style.display = "";
	       }
	   },
	   clearError: function() {
	      if(this.errorNode) {
	         html.removeChildren(this.errorNode);
	         this.errorNode.style.display = "none";
	      }
	   },
	   next: function(e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      this.data.paging.nextPage();
	      this.refresh();
	   },
	   
	   previous: function(e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      this.data.paging.previousPage();
	      this.refresh();
	   },
	   onfilechange: function(ds, file) {
	      this.renderer.highlightItems = {};
	      if(ds && file)
	        this.renderer.highlightItems[ds.getValue(file, "id")] = true;
	      this.refresh();
	   },
	
	   refresh: function() {
	      this.clearError();
	      var params = { 
	         scope: this, 
	         onBegin: this._dataBegin,
	         onComplete: this._dataComplete,
	         onError: this._dataError,
	         start: this.data.paging.getStartIndex(),
	         count: this.data.paging.pageSize     
	      };
	      // Obtain sorting information from renderer
	      var sortInfo = this.renderer.getSortInfo();      
	      if (sortInfo && sortInfo.active) {
	         var key = sortInfo.active.sK;
	         var descending = !sortInfo.active.lowToHigh;
	         if (sortInfo.reversed) {
	            descending = !descending;
	         }
	         params.sort = [{ attribute: key, descending: descending }];
	      }
	      this.data.dataStore.fetch(params);
	      this.toggleNode.style.display = "";
	   },
	
	   showLoading: function() {
	      if (this.loadingIndicator)
	         this.loadingIndicator.style.display="";
	      var el = this.streamNode;
	      domConstruct.empty(el);
	      this.renderer.hidePaging(this);
	   },
	
	   hideLoading: function() {
	      if (this.loadingIndicator)
	         this.loadingIndicator.style.display="none";
	   },
	   
	   _dataBegin: function (total, request) {
	      this.data.paging.setTotal(total);
	      // If no length is given, check if the request
	      // supports the hasNext method and get its value
	      if (total == -1 && request.hasNext) {
	         this.data.paging.setHasNext(request.hasNext());
	      }
	   },
	   
	   _dataComplete: function (items, request) {
	      this.permissions = new PermissionsBean({
	            owner:false,
	            authenticatedId: this.authUser
	         });
	      this.renderer.permissions = this.permissions;
	      this.data.paging.setFetched(items.length);
	      this.data.items = items;
	      if (request.getFeedItem) {
	         this.data.feedItem = request.getFeedItem();
	      }
	      if (this.data.paging.isPastEnd()) {
	         this.handlePastLastPage();
	      } 
	      else {
	         if (items.length > 0) {
	            this.renderer.render(this, this.streamNode, this.data);
	         } else {
	            this.renderer.updatePaging(this, this.streamNode, this.data);
	            this.renderer.renderEmpty(this, this.streamNode, this.data);
	         }
	         this.onUpdate(this.data);
	      }
	   },
	
	   _dataError: function(error, request) {
	      this.data.paging.setFetched(0);
	      this.renderer.renderError(this, this.streamNode, this.data, error);
	      if(error.type != "noFiles")
	         this.onError(error);
	   },   
	   handlePastLastPage: function() {
	      if (this.data.paging.isPastEnd()) {
	         var lastPage = this.data.paging.getLastPage();
	         if (lastPage == -1) { lastPage = 1; }
	         this.data.paging.setPage(lastPage);
	         this.refresh();
	         return true;
	      }
	      return false;
	   },
	   onUpdate: function(data) {
	   },
	   onError: function(error) {},
	
	   update: function(data) {
	      if (data) {
	         if (!data.paging && (data.xml || data.json)) {
	            data.paging = this.getPaging();
	            if (data.xml)
	               data.paging.detect(data.url, data.xml);
	            else if (data.json)
	               data.paging.detect(data.url, data.json, "json");
	            if (this.handlePastLastPage(data.paging))
	               return;
	         }
	      }
	      if (arguments.length > 0)
	         this.data = data;
	   
	      if (!this.data) {
	         this._loadFromUrl(this.url);
	      }
	      else if (this.data.error) {
	         //Handle error object passed to stream.
	         if(typeof this.data.error.message != "undefined")
	            this._updateWithError(this.data.error);
	         else
	            this._updateWithError({type: "unknown",message: this._strings.ERROR});
	      }
	      else if (this.data.xml) {
	         this.renderer.render(this, this.streamNode, this.data);
	         this.onUpdate(this.data);
	      }
	      else if (this.data.json) {
	         this.renderer.render(this, this.streamNode, this.data);
	         this.onUpdate(this.data);
	      }
	      else {
	         this.renderer.renderEmpty(this, this.streamNode, this.data);
	         this.onUpdate(this.data);
	      }
	   },
	   
	   updateItem: function(item, result) {
	      this.renderer.updateItem(this, this.data, this.streamNode, item, result);
	   },
	
	   _updateWithError: function(error) {
	      this.data = {fromUrl: true, error: error};
	      this.renderer.renderError(this, this.streamNode, this.data, error);
	   },
	
	   _loadFromUrl: function(url){
	      if(!url || url === "") {
	         this._updateWithError({message:"No URL specified", type: "noUrl"});
	      }
	      else {
	         if (this.req && !this.req.ioArgs._finished)
	            this.req.cancel();
	
	         var handleAs = this.handleAs || "xml";
	         if (this.handleAsXsl)
	            handleAs = "text";
	
	         this.req = request(url, {method: "GET", handleAs: handleAs, timeout: this.timeoutRetrieve*1000, handle: lang.hitch(this, this._loadFromUrlComplete)});
	      }
	   },
	
	   getPaging: function() {
	      return new com.ibm.social.ee.widget.StreamPaging({checkForMore:this.checkForMore});
	   },
	   
	   resetData: function() {
	      if (this.data) {
	         delete this.data.xml;
	         delete this.data.json;
	      }
	   }
	   
	});
	
	return Stream;
});
