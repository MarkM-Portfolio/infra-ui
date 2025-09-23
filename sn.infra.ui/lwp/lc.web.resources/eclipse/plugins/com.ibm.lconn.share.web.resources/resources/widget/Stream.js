/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.Stream");

dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.text");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.share.widget.StreamPaging");
dojo.require("lconn.share.widget.StreamRenderer");
dojo.require('lconn.core.svg.svgHelper');

dojo.declare("lconn.share.widget.Stream", [dijit._Widget, dijit._Templated], {

   templatePath: dojo.moduleUrl("lconn.share","widget/templates/Stream.html"),
   
   renderer: null,
   renderers: {},
   net: null,
   url: null,
   data: null,
   view: "summary",
   
   baseClass: "",

   timeoutRetrieve: 10,
   noStatus: false,
   
   proxyServlet: null,
   msgNoData: null,

   /** Be sure to define strings for
       LOADING, COUNT, ELLIPSIS, PAGE, NEXT, PREVIOUS, EMPTY, ERROR, ERROR_REQUEST_TIMEOUT, ERROR_REQUEST_CANCELLED, SORT_BY (optional)
       */
   _strings: {},
   
   postMixInProperties: function() {
      if (this.oldWidget) {
         var oldData = this.oldWidget.data;
         if (oldData && oldData.fromUrl && (oldData.xml || oldData.json)) {
            this.data = {
               fromUrl: oldData.fromUrl,
               xml: oldData.xml,
               json: oldData.json,
               paging: oldData.paging
            };
         }
         delete this.oldWidget;
      }
      var r = this.getRenderer();
      if (r) {
         this._initPageStyle = (r.minimalPaging) ? "display: none" : "";
         if (r.templatePath)
            this.templatePath = r.templatePath;
         if (r.templateString)
            this.templateString = r.templateString;
      }
      else
         throw "Streams must be passed a renderer during initialization or have one statically defined";
   },
   
   postCreate: function() {
      this.msgNoData = this.msgNoData || this._strings.EMPTY;
   
      this.inherited(arguments);
      
      if (this.labelledBy) {
         dijit.setWaiRole(this.streamNode, "region");
         dijit.setWaiState(this.streamNode, "labelledby", this.labelledBy);
      }
      
      if (this.pageSizeListNode) {
         var sizes = this.pageSizeListNode.getElementsByTagName("A");
         for (var i = 0; i < sizes.length; i++) {
            var size = sizes[i];
            var value = lconn.share.util.text.parseInt(size.innerHTML, -1);
            if (value != -1) {
               dojo.connect(size, "onclick", dojo.hitch(this, function(value) {
                  lconn.share.widget.StreamRenderer.prototype.updateFromPageSize = true;
                  this.setPageSize(value);
               }, value));

               var selectedNode = this["pageSize_"+value.toString()];
               selectedNode.title = size.title = dojo.string.substitute(this._strings.SHOW_ALT, [dojo.number.format(value)]);
            }
         }
      }
      
      this.getRenderer().renderLoading(this, this.streamNode);
   },
   
   destroy: function() {
      if (this.req && !this.req.ioArgs._finished)
         this.req.cancel();
      if (this.renderer)
         lconn.share.util.misc.destroy(this.renderer);
      var rs = this.renderers || {};
      for(var r in rs)
         if (rs.hasOwnProperty(r)) {
            //console.log("Destroying renderer for " + r);
            lconn.share.util.misc.destroy(rs[r]);
         }
      this.renderer = this.renderers = null;
      this.inherited(arguments);
   },
   
   getRenderer: function() {
      return this.renderers[this.view] || this.renderer;
   },

   setPageSize: function(size,e) {
      if (e) dojo.stopEvent(e);
      if (this.data) {
         if (this.data.paging && this.data.fromUrl) {
            var paging = this.data.paging;
            if (paging.size != size && size > 0) {
               var url = paging.getPageUrl(1,size);
               if (url) {
                  this.url = url;
                  this.refresh();
               }
            }
         }
      }
   },
   
   page: function(page, e) {
      if (e) dojo.stopEvent(e);
      if(page < 1 || page != parseInt(page))
         page = 1; 
      if (this.data) {
         if (this.data.paging && this.data.fromUrl) {
            var paging = this.data.paging;
            var url = paging.getPageUrl(page);
            if (url) {
               this.url = url;
               this.refresh();
            }
         }
      }
   },

   lastPage: function(e) {
      if (e) dojo.stopEvent(e);
      if (this.data && this.data.paging) 
         this.page(this.data.paging.getLastPage());
   },
   
   next: function(e) {
      if (e) dojo.stopEvent(e);
      if (this.data) {
         if (this.data.paging && this.data.fromUrl) {
            var paging = this.data.paging;
            var url = paging.getNextUrl();
            if (url) {
               this.url = url;
               this.refresh();
            }
         }
      }
   },
   
   previous: function(e) {
      if (e) dojo.stopEvent(e);
      if (this.data) {
         if (this.data.paging && this.data.fromUrl) {
            var paging = this.data.paging;
            var url = paging.getPreviousUrl();
            if (url) {
               this.refresh(url);
            }
         }
      }
   },

   refresh: function(url) {
      if (this.data) {
         if (this.data.fromUrl) {
            this.data = null;
            if (typeof url == "string") {
               this.url = url;
               this.updated = false;
            }
            this.update();
         }
         else
            this.update();
      }
   },
   update: function(data, option) {
   	option = option || {};
   	option.dataInited = option.dataInited || false;
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
      else if (this.data && this.data.rendered)
         return;
   
      if (!this.data && this.url) {
         this._loadFromUrl(this.url);
      }
      else if (this.data.error) {
         //Handle error object passed to stream.
         if(typeof this.data.error.message != "undefined")
            this.handleLoadError([this.data.error]);
         else
            this.handleLoadError([{type: "unknown",message: this._strings.ERROR}]);
      }
      else if (this.data.xml) {
         this.getRenderer().render(this, this.streamNode, this.data, option);
         this.data.rendered = true;
         this.onUpdate(this.data);
      }
      else if (this.data.json) {
         this.getRenderer().render(this, this.streamNode, this.data, option);
         this.data.rendered = true;
         this.onUpdate(this.data);
      }
      else if (!this.data.rendered) {
         this.getRenderer().renderEmpty(this, this.streamNode, this.data);
         this.data.rendered = true;
         this.onUpdate(this.data);
      }
   },
   
   updateItem: function(item, result) {
      this.getRenderer().updateItem(this, this.data, this.streamNode, item, result);
      lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.domNode);
   },

   handleLoadError: function(errors) {
      this.data = {fromUrl: true, error: errors[0]};
      this.onLoadError(errors);
      if (errors && errors.skip)
         return;
      this._updateWithError(errors[0]);
   },
   onLoadError: function(errors) {},
   
   _updateWithError: function(error) {
      this.getRenderer().renderError(this, this.streamNode, this.data, error);
   },

   _loadFromUrl: function(url){
      if(!url || url == "") {
         this._updateWithError({message:"No URL specified", type: "noUrl"});
      }
      else {
         if (this.req && !this.req.ioArgs._finished)
            this.req.cancel();

         var handleAs = this.handleAs || "xml";

         this.req = this.net.get({
            noStatus: this.noStatus,
            url: (this.getProxyUrl ? this.getProxyUrl(url) : url),
            handleAs: handleAs,
            timeout: this.timeoutRetrieve*1000,
            auth: this.retryAfterLogin 
                  ? {preventReload: true, onLogin: dojo.hitch(this, this._loadFromUrl, url)} 
                  : null,
            handle: dojo.hitch(this, this._loadFromUrlComplete)
         });
      }
   },

   getPaging: function() {
      return new lconn.share.widget.StreamPaging({checkForMore:this.checkForMore, apiType: this.apiType});
   },
   
   initLoading: function(){
     lconn.core.svg.svgHelper.loadIcon(this.loadingNode, "loadingIcon");
   },
   
   hideLoading: function() {
     if (this.loadingNode) {
       dojo.removeClass(this.loadingNode, "lconnLoadingShow");
       dojo.addClass(this.loadingNode, "lconnLoadingHide");
     }
   },
   
   showLoading: function() {
     if (this.loadingNode.childNodes.length == 0) {
       this.initLoading();
     }
     dojo.removeClass(this.loadingNode, "lconnLoadingHide");
     dojo.addClass(this.loadingNode, "lconnLoadingShow");
   },
   
   resetData: function() {
      if (this.data) {
         delete this.data.xml;
         delete this.data.json;
      }
   },
   
   _loadFromUrlComplete: function(response, ioArgs) {
      ioArgs = ioArgs || {};
      ioArgs._finished = true;
      if (response instanceof Error) {
         var nls = this._strings;
         var msgError = nls.ERROR_REQUEST_UNKNOWN || nls.ERROR_REQUEST || nls.ERROR;
         console.error(response);
         var error = response;
         if (response.code == "cancel") {
            error.message = nls.ERROR_REQUEST_CANCELLED;
            error.type = "requestCancelled";
         }
         else if (response.code == "timeout") {
            error.message = nls.ERROR_REQUEST_TIMEOUT;
            error.type = "serverNotResponding";
         }
         else if (response.code == "ItemNotFound") {
            error.message = this.msgNoData || nls.EMPTY;
            error.type = "noFiles";
         }
         else if (response.code == "unauthenticated") {
            error.message = nls.ERROR_REQUEST_UNAUTHENTICATED;
            error.type = "unauthenticated";
         }
         else {
            error.message = msgError;
            error.type = "unknown";
         }
         error.message = error.message || msgError;
         this.handleLoadError([error]);
      }
      else {
         var data = {url: ioArgs.url, fromUrl: true};
         data.paging = this.getPaging();
         if (ioArgs.handleAs == "xml") {
            data.xml = response.documentElement;
            data.paging.detect(ioArgs.url, response.documentElement);
         }
         else if (ioArgs.handleAs == "json") {
            data.json = response;
            data.paging.detect(ioArgs.url, response, "json");
         }
         
         if (this.handlePastLastPage(data.paging))
            return;
         
         this.data = data;
      
         this.hideLoading();
         
         this.getRenderer().render(this, this.streamNode, data);
         this.onUpdate(this.data);
      }
      this.req = null;
      return response;
   },
   
   handlePastLastPage: function(paging) {
      if (paging.isPastEnd()) {
         var url = paging.getLastPageUrl();
         this.url = url;
         this.update();
         return true;
      }
      return false;
   },
   
   onUpdate: function(data) {
      if (data && (data.xml || data.json)) {
         if (!this.updated) {
            this.updated = true;
            this.onFirstUpdate(data);
         }
      }
   },
   onFirstUpdate: function(data) {}
});
