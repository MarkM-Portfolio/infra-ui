/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.scenes.AbstractList");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.widget.StreamPaging");
dojo.require("lconn.share.scenes.AbstractScene");
dojo.require("lconn.share.scenes.AbstractSceneRender");
dojo.require("lconn.core.aria.Toolbar");
dojo.require("com.ibm.social.layout.widget.ActionBar");
dojo.require("lconn.share.util.configUtil");
dojo.require("lconn.share.scenehelper");


dojo.declare("lconn.share.scenes.AbstractList", [lconn.share.scenes.AbstractScene, lconn.share.scenes.AbstractSceneRender], {

   msgNoData: "Nothing to show",

   // set to true if and only if there are 1 or more items in the current list visible
   hasVisibleItems: false,
   // set to true if there are actions needed to be show though the list is empty
   showActionButtonsWhenEmpty: false,

   itemsPerPage: 10,
   showCustomColumns: true,

   constructor: function(app,sceneInfo) {
      this.app = app;
      this.sceneInfo = sceneInfo;

      this.highlightItems = {};
      this.activeFilters = [];
      this.params = {};
   },

   _byFilterId: function(arr, id) {
      if (arr)
         for (var i=0; i<arr.length; i++)
            if (arr[i] && arr[i].id == id && (!arr[i].isValid || arr[i].isValid(this.app,this)))
               return arr[i];
   },

   _changed: function(before, after) {
      var c = {};
      var rCount = 0;
      for (var key in before) {
         if (!after[key]) {
            c[key] = null;
            rCount++;
         }
      }
      var cCount = 0;
      for (var key in after) {
         var o = after[key];
         if (before[key] != o) {
            c[key] = o || null;
            cCount++;
         }
      }
      return {removed: rCount, changed: cCount, keys: c};
   },
   _isInfoEqual: function(a, b) {
      return a.id == b.id && a.pivot == b.pivot;
   },

   init: function(app, sceneInfo) {
      this.initFilters(app,sceneInfo);
      this.initPaging(app,sceneInfo);
      this.initView(app,sceneInfo);
      this.initColumns(app,sceneInfo);
      this.initSort(app,sceneInfo);
   },
   initPivot: function(app,sceneInfo) {
      var p = sceneInfo.parameters || {};
      if (this.pivots) {
         var pivotId = sceneInfo.pivot || p.pivot;
         var validPivots = dojo.filter(this.pivots, function(pivot) {return (!pivot.isValid || pivot.isValid(app,this));},this);
         var pivot = dojo.filter(validPivots, function(pivot) {return pivot.id == pivotId;})[0] || validPivots[0];
         if (pivot) {
            this.activePivot = pivot;
            this.params.pivot = pivot.id;
         }
      }
   },
   initView: function(app,sceneInfo) {
      var p = sceneInfo.parameters || {};
      if (this.views && this.views.length > 0) {
         var viewId = sceneInfo.view || (app.prefs && app.prefs.getDefaultView ? app.prefs.getDefaultView() : null);
         var validViews = dojo.filter(this.views, function(view) {return (!view.isValid || view.isValid(app,this));},this);
         var view = dojo.filter(validViews, function(view) {return view.id == viewId;})[0]
            || dojo.filter(this.views, function(view){return view.isDefault;})[0]
            || validViews[0];
         if (view)
            this.activeView = view;
      }
   },
   initSort: function(app,sceneInfo) {
      var p = sceneInfo.parameters || {};
      if (this.sorts) {
         var sortId = p.sort;
         var validSorts = dojo.filter(this.sorts, this.isSortValid || function(sort) {return (!sort.isValid || sort.isValid(app,this));},this);
         var sort = dojo.filter(validSorts, function(sort) {return sort.id == sortId;})[0] || this.defaultSort || validSorts[0];
         if (sort) {
            this.activeSort = sort;
            this.sortId = sort.id;
            this.sortReversed = (p.reverse == "1");
            this.params.sort = sort.id;
            this.params.sortReversed = this.sortReversed ? "1" : null;
         }
      }
   },
   initColumns: function(app,sceneInfo) {
      var arr = this.supportedColumns;
      if (arr) {
         var sorts = this.sorts = [];
         var defaults = this.defaultColumns = {};
         for (var i=0,col; col=arr[i]; i++) {
            var cid = col.id;
            if (col.isDefault)
               defaults[cid] = 1;
            if (col.isSortable) {
               var authenticatedUser = app ? app.authenticatedUser : null;
               if (lconn.share.util.configUtil.isNestedFolderEnabled(authenticatedUser) && sceneInfo.collectionId && col.sC)
                  col.sC = "all";
               sorts.push(col);
               if (cid == this.defaultSortId)
                  this.defaultSort = col;
            }
         }
      }
   },
   initPaging: function(app,sceneInfo) {
      var p = sceneInfo.parameters || {};
      if (p.page > 1)
         this.initialPage = this.params.page = p.page;
      else {
         this.initialPage = 1;
         this.params.page = null;
      }
      this.itemsPerPage = this.getListPageSize() || 10;
   },
   initFilters: function(app,sceneInfo) {
   },

   end: function(newScene) {
      this.list = null;
      this.inherited(arguments);
   },

   /** Allows the scene to bypass complete reload if only a minor scene change has occured */
   refresh: function(sceneInfo) {
      var oldSceneInfo = this.sceneInfo;
      if (!sceneInfo || !this._isInfoEqual(oldSceneInfo, sceneInfo))
         return false;
      var p = sceneInfo ? sceneInfo.parameters : null;
      if (p) {
         var c = this._changed(oldSceneInfo.parameters,p, 1);
         var d = c.changed + c.removed;
         if (d > 1)
            return false;
         if (d == 0) {
            this.sceneInfo = sceneInfo;
            this.update();
            return true;
         }
         if (typeof c.keys.page != "undefined") {
            this.sceneInfo = sceneInfo;
            this.initPaging(this.app,sceneInfo);
            this.update();
            return true;
         }
         return false;
      }
      this.sceneInfo = sceneInfo;
      this.update();
      return true;
   },

   /** Refreshes the scene with a new set of parameters */
   update: function(params) {},

   updateList: function(url) {
	  if (this.activeView != null && typeof this.activeView != undefined && this.activeView.id == "grid")
		  url = url + "&preview=true";
      this.app.net.get({
         url: url,
         handle: dojo.hitch(this, this.loadListData),
         timeout: this.timeout,
         auth: {preventLogin: this.preventListLogin, secured: this.listSecured},
         handleAs: this.handleAs || "xml"
      });
   },

   handlePastLastPage: function(paging) {
      if (paging.isPastEnd()) {
         var url = paging.getLastPageUrl();
         this.updateList(url);
         return true;
      }
      return false;
   },

   loadListData: function(response, ioArgs) {
      if (response instanceof Error) {
         this.loadListError(response, ioArgs);
      } else {
         var data = this.listData = {xml: response.documentElement, url: ioArgs.url};
         var paging = data.paging = new lconn.share.widget.StreamPaging({apiType: this.apiType});
         paging.detect(ioArgs.url, response.documentElement);

         if (paging.isPastEnd()) {
            var p = dojo.clone(this.params);
            p.page = paging.getLastPage();
            this.update(p);
         } else {
            this.loadListSuccess(data, response, ioArgs);
         }
      }

      dojo.publish("lconn/share/scene/loadListData", [this]);
   },

   loadListSuccess: function(data, response, ioArgs) {
      if (this.list)
         this.list.update(data);
   },

   onScroll: function(e) {
      var sceneBody = e.target ? e.target : null;
      if(sceneBody) {
         // Fix for defect CNXSHARE-76.  Rather than trigger scrolling when we are
         // EXACTLY at the bottom most pixel of page, we now trigger if we are close to
         // the bottom of the page.  That way if the size calculations are a pixel off
         // it doesn't matter.
         if((e.target.clientHeight + e.target.scrollTop + 100 >= e.target.scrollHeight)
             && this.list && this.list.data && this.list.data.paging.hasNext() ) {
           this.list.showLoading();
           this.list.url = this.list.data.paging.getNextUrl();
           this.list.data = null;
           this.list.update();
         }
      }
   },

   loadListError: function(response, ioArgs) {
      var error;
      if (response.code == "cancel")
         error = {message:this.app.nls.CONTENT.ERROR_REQUEST_CANCELLED, type: "requestCancelled"};
      else if (response.code == "timeout")
         error = {message:this.app.nls.CONTENT.ERROR_REQUEST_TIMEOUT, type: "serverNotResponding"};
      else if (response.code == "ItemNotFound")
         error = {message:this.msgNoData, type: "noFiles"};
      else
         error = {message:this.app.nls.CONTENT.ERROR_REQUEST_UNKNOWN, type: "unknown"};

      this.listData = {error: error, url: ioArgs.url};
      if (this.list)
         this.list.update(this.listData);
   },

   onListUpdate: function(data) {
      var previouslyVisible = !!this.hasVisibleItems;
      var currentlyVisible = (data.paging.total != 0);
      if (previouslyVisible != currentlyVisible) {
         this.hasVisibleItems = currentlyVisible;
         this.onListItemsVisible(currentlyVisible);
      }
   },

   onListItemsVisible: function(visible) {
      if (this.setActionContainerVisibility)
         this.setActionContainerVisibility(visible);
      var display = visible ? "" : "none";
      dojo.query("._qkrHideWhenEmpty").forEach(function(el) {el.style.display = display;});
      this.addPanelClassWhenEmpty(visible);
   },

   hideElementWhenEmpty: function(el) {
      if (this.setActionContainerVisibility)
         this.setActionContainerVisibility(this.hasVisibleItems);
      dojo.addClass(el, "_qkrHideWhenEmpty");
      el.style.display = this.hasVisibleItems ? "" : "none";
},

   addPanelClassWhenEmpty: function(itemVisible) {
     dojo.query(".lotusContent").toggleClass("filesListFilled", itemVisible);
   },

   _findById: function(id) {
      var map = dojo.getObject("list.data.itemById", false, this);
      return map ? map[id] : null;
   },

   getListUrl: function(opts) {return null;},
   getListOptions: function(opts) {
      var p = {};
      opts = opts || {}

      var unpaged = opts.unpaged;

      if (unpaged) {
         p.format = null;
         p.basicAuth = true;
         p.nonPersonal = true;
      }
      else {
         p.page = Math.max(opts.page || this.initialPage || 1,1);
         p.pageSize = (opts.items) ? opts.items : this.getListPageSize();
      }

      if (this.activeSort && !opts.noSort) {
         p.sortKey = this.activeSort.sK;
         var sortDescending = !this.activeSort.lowToHigh;
         if (this.sortReversed)
            sortDescending = !sortDescending;
         p.sortDescending = sortDescending;
         if (this.activeSort.sC)
            p.sortCategory = this.activeSort.sC;
      }

      for (var i=0; i<this.activeFilters.length;i++) {
         var filter = this.activeFilters[i];
         if (filter.setServiceOptions)
            filter.setServiceOptions(p, this);
      }
      if (this.activePivot && this.activePivot.setServiceOptions)
         this.activePivot.setServiceOptions(p, this);
      return p;
   },
   getListPageSize: function() {
      if (this.app.prefs && this.app.prefs.getListPageSize)
         return this.app.prefs.getListPageSize();
      return this.itemsPerPage;
   },
   setListPageSize: function(size) {
      if (this.app.prefs && this.app.prefs.setListPageSize)
         this.app.prefs.setListPageSize(size);
      else
         this.itemsPerPage = size;
   },

   getViewSvg: function(view) {
       var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute('width', '20px');
          svg.setAttribute('height', '20px');
          svg.setAttribute('viewBox', '0 0 24 24');
          svg.setAttribute('fill-rule', 'evenodd');

              var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              switch(view) {
                 case 'grid':
                    path.setAttribute('d', 'M13 23h8a2 2 0 0 0 2-2v-8H13zm1-9h8v7a1 1 0 0 1-1 1h-7zm7-13h-8v10h10V3a2 2 0 0 0-2-2zm1 9h-8V2h7a1 1 0 0 1 1 1zM1 21a2 2 0 0 0 2 2h8V13H1zm1-7h8v8H3a1 1 0 0 1-1-1zM1 3v8h10V1H3a2 2 0 0 0-2 2zm9 7H2V3a1 1 0 0 1 1-1h7z');
                    break;
                 case 'details':
                    path.setAttribute('d', 'M3 9v6h18V9zm17 5H4v-4h16zM3 21a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4H3zm1-3h16v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM21 3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4h18zm-1 3H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z');
                    break;
                 case 'summary':
                    path.setAttribute('d', 'M22 3H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 20H2a1 1 0 0 1-1-1v-4h4zm0-6H1V9h4zm0-6H1V5a1 1 0 0 1 1-1h3zm18 11a1 1 0 0 1-1 1H6v-5h17zm0-5H6V9h17zm0-6H6V4h16a1 1 0 0 1 1 1z');
                    break;
              }
           svg.appendChild(path);
       return svg;
    },

   renderView: function(d, el, inline) {
      var views = this.views;
      var activeView = this.activeView;
      var app = this.app;
      var list = this;

      var validViews = dojo.filter(views, function(view) { return !view.isValid || view.isValid(app,list); });
      if (validViews.length <= 1)
         return;

      var existingTable = d.getElementById("qkrViewControl");
      if (existingTable)
         lconn.share.util.html.removeChildren(existingTable);

      if (existingTable)
         inline = dojo.hasClass(existingTable, "qkrViewControlInline");

      var table = existingTable ? existingTable : d.createElement("table");
         table.id = "qkrViewControl";
         dijit.setWaiRole(table, "presentation");
         table.cellPadding = "0";
         table.className = "lotusViewControl";
         if (inline) {
            dojo.addClass(table, "qkrViewControlInline");

            // Inline styles for reuse
            if(dojo.hasClass(dojo.body(), "dijit_a11y")) {
               dojo.addClass(table, "lotusRight");
            }
            else {
            table.style.position = "absolute";
            table.style.bottom = "0";
            table.style[dojo._isBodyLtr() ? "right":"left"] = "0";
            }
            // calculate after: table.style.maxWidth = (70 + validViews.length*20) + "px";
         }
         else
            dojo.addClass(table, "lotusRight");

         var tbody = d.createElement("tbody");
            var tr = d.createElement("tr");
            var isFilesRefinePanelEnabled = lconn.share.util.configUtil.isFilesRefinePanelEnabled(this.app.authenticatedUser);
            if(!isFilesRefinePanelEnabled) {
               var label = this.app.nls.CONTENT.VIEW_SELECTION;
                   var td = d.createElement("td");
                      td.appendChild(d.createTextNode(label + "\u00a0"));
                   tr.appendChild(td);
            }
               var customize;
               var td = d.createElement("td");
                  var div = d.createElement("div");
                     dijit.setWaiRole(div, "toolbar");
                     dijit.setWaiState(div, "label", label);
                     var activedButton = null;
                     var activedIndex = -1;
                     for (var i=0; i<validViews.length; i++) {
                        var view = validViews[i];
                        if (view.customize)
                           customize = view;
                        var isActive = (view == activeView);
                        var a = d.createElement("a");
                           a.title = view.tooltip;

                           if(isFilesRefinePanelEnabled) {
                              a.className = "lotusSprite lotusView lotus"+view.img +" dsipalyView " + (isActive ? "viewOn" : "viewOff");
                              a.appendChild(this.getViewSvg(view.id));
                           } else {
                              a.className = "lotusSprite lotusView lotus"+view.img+(isActive ? "On" : "Off");
                           }
                           lconn.share.scenehelper.addToolTip(a);
                           a.href = "javascript:;";
                           dojo.connect(a, "onclick", dojo.hitch(this, this.changeView, view.id));
                           dijit.setWaiRole(a, "button");
                           if(isActive) {
                              dijit.setWaiState(a, "disabled", true);
                              activedButton = a;
                              activedIndex = i;
                           }
                           dijit.setWaiState(a, "label", view.name);

                           var altImg = d.createElement("img");
                              altImg.alt = view.name;
                              altImg.src = dojo.config.blankGif;
                           a.appendChild(altImg);

                           if(!isFilesRefinePanelEnabled) {
                              var altSpan = d.createElement("span");
                               altSpan.className = "lotusAltText " + (isActive ? "lotusBold":"");
                               altSpan.appendChild(d.createTextNode(view.name));
                               a.appendChild(altSpan);
                           }

                        div.appendChild(a);
                     }
                     new lconn.core.aria.Toolbar(div, {selIdx: activedIndex});
                  td.appendChild(div);
               tr.appendChild(td);
               if (customize && this.customizeViews && this.activeView.id == "summary") {
                  var td = d.createElement("td");
                     var a = d.createElement("a");
                        a.title = customize.cTooltip;
                        a.className = "lotusIndent10 lotusAction";
                        a.href = "javascript:;";
                        a.appendChild(d.createTextNode(this.app.nls.CONTENT.VIEW_SELECTION_CUSTOMIZE));
                        dijit.setWaiRole(a, "button");
                     td.appendChild(a);
                     this.connect(a, "onclick", this, "customizeViews");
                  tr.appendChild(td);
               }
            tbody.appendChild(tr);

         table.appendChild(tbody);
         dijit.focus(activedButton);
      this.hideElementWhenEmpty(table);
      if (!existingTable) {
         el.appendChild(table);
      }
      this.addPanelClassWhenEmpty(this.hasVisibleItems);
   },
   onViewOptionsChanged: function(view) {
      if (view.isValid && !view.isValid(this.app,this))
         return;
      var isActive = (view == this.activeView);
      if (!isActive)
         this.changeView(view.id);
      else {
         if (this.listData._isUpdated)
            this.update();
         else
            this.list.update(this.listData);
      }
   },

   _setView: function(viewId) {
      if (this.list) {
         var sceneBody = document.getElementById('scene-body');
         if (dojo.exists("list.view", this))
            dojo.removeClass(sceneBody, this.list.view);
         this.list.view = viewId;
         if (viewId)
            dojo.addClass(sceneBody, viewId);
         if (this.list.renderer)
            this.list.renderer.view = viewId;
      }
   },

   onKeypress: function(e) {
      if (this.list) {
         if (this.qkPreviousPage && e.keyChar == this.qkPreviousPage)
            this.list.previous();
         else if (this.qkNextPage && e.keyChar == this.qkNextPage)
            this.list.next();
         else if (this.qkFirstPage && e.keyChar == this.qkFirstPage)
            this.list.page(1);
         else if (this.qkLastPage && e.keyChar == this.qkLastPage)
            this.list.lastPage();
      }
   },

   changeView: function(viewId, e) {
      if (e) dojo.stopEvent(e);
      if (this.activeView && this.activeView.id == viewId)
         return;
      if (this.views && this.views.length > 0) {
         if (this.app.prefs && this.app.prefs.setDefaultView)
            this.app.prefs.setDefaultView(viewId);
         var view = viewId;
         this.activeView = lconn.share.util.misc.indexById(this.views, "id", view);
         if (!this.activeView || (this.activeView.isValid && !this.activeView.isValid(this.app, this)))
            this.activeView = dojo.filter(this.views, function(view){return view.isDefault;})[0] || this.views[0];
         this._setView(this.activeView.id);
         this.renderView(this.app.d);
      }
      else
         return;
      if (this.listData._isUpdated)
         this.update();
      else
         this.list.update(this.listData, {dataInited: true});
   },

   setPageSize: function(size, e) {
      if (e) dojo.stopEvent(e);

      if (size < 1)
         return;
      this.setListPageSize(size);
      this.update();
   },
   page: function(page, e) {
      if (e) dojo.stopEvent(e);

      if(page < 1 || page != parseInt(page))
         page = 1;
      var p = dojo.clone(this.params);
      p.page = page != 1 ? page : null;
      this.update(p);
   },
   nextPage: function(e) {
      if (e) dojo.stopEvent(e);
      if (this.listData.paging.hasNext()) {
         var page = this.listData.paging.getNextPage();
         var p = dojo.clone(this.params);
         p.page = page != 1 ? page : null;
         this.update(p);
      }
   },
   previousPage: function(e) {
      if (e) dojo.stopEvent(e);

      if (this.listData.paging.hasPrevious()) {
         var page = this.listData.paging.getPreviousPage();
         var p = dojo.clone(this.params);
         p.page = page != 1 ? page : null;
         this.update(p);
      }
   }
});
