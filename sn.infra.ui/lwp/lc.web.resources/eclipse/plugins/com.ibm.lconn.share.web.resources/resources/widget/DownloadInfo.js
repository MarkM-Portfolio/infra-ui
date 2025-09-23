/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.DownloadInfo');
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.share.widget.DownloadInfoStream");

dojo.declare(
   "lconn.share.widget.DownloadInfo",
   [dijit._Widget],
   {
      net: null,
      data: null,
      file: null,
      url: null,
      user: null,
   
      additionalClasses: "",
      loadOnStartup: true,
      
      _strings: {},
      
      buildRendering: function() {
         var d = document;
         var el = this.domNode = this.containerNode = this.srcNodeRef;
         if (this.baseClass) dojo.addClass(el, this.baseClass);
         if (this.additionalClasses) dojo.addClass(el, this.additionalClasses);
         
         if (!this.data && this.oldWidget) {
            this._hasData = this.oldWidget._hasData;
            this.data = this.oldWidget.data;
         }

         this.update();
         
         if (!this.data && this.loadOnStartup)
            this.load();
      },
               
      load: function() {
         this._loaded = true;
         this._hasData = false;
         this.data = null;

         var requests = this._loader;
         if (!this._loader) {
            requests = this._loader = new lconn.share.util.AsyncLoader({net: this.net});
            dojo.connect(requests, "onRequestsCompleted", this, "onRequestsCompleted");
            dojo.connect(requests, "onRequestCompleted", this, "onRequestCompleted");
         }
         requests.cancel();
         requests.add(this.url, dojo.hitch(this, "handleData"), "json");
         requests.start();
      },
      
      onRequestsCompleted: function(errors) {
         if (errors.length > 0)
            this.handleLoadError(errors);
         else {
            this._hasData = true;
            this.update();
         }
      },
      onRequestCompleted: function(error) {return true;},   
      handleData: function(response, ioArgs) {
         var error;
         if (!response || response instanceof Error) {
            this.data = null;
            error = response;
            error._type = "data";
         }
         else
            this.data = response;
         return error;
      },
      updateError: function(errors) {
         var d = document;
         var el = this.domNode; 
      
         while (el.firstChild) el.removeChild(el.firstChild);
         
         var div = d.createElement("div");
            div.className = "qkrError";
            div.appendChild(d.createTextNode(this._strings.ERROR));
         el.appendChild(div);
      },
      handleLoadError: function(errors) {
         this.onLoadError(errors);
         if (errors && errors.skip)
            return;
         this.updateError(errors);
      },
      onLoadError: function(errors) {},
      
      update: function() {
         var d = document;
         var el = this.domNode; 
      
         while (el.firstChild) el.removeChild(el.firstChild);

         if (this._hasData) {
            var divgroup = d.createElement("div");
            el.appendChild(divgroup);
            
            var renderOptions = {
                  minimalPaging: true,
                  file: this.file,
                  url: this.url,
                  net: this.net,
                  _strings: this._strings,
                  _appstrings: this._appstrings,
                  generateLinkToPerson: this.generateLinkToPerson
               };
            var renderer = new lconn.share.widget.DownloadInfoStreamRenderer(renderOptions);
            var list = this.list = new lconn.share.widget.DownloadInfoStream({
                  baseClass: "",
                  file: this.file,
                  url: this.url,
                  net: this.net,
                  msgNoData: this._strings.EMPTY,
                  _strings: this._appstrings.CONTENT,
                  _appstrings: this._appstrings,
                  handleAs: "json",
                  renderer: renderer
               }, divgroup);
            list.update({json: this.data, url: this.url, fromUrl: this.url ? true:false});
         }
         else {
            var div = d.createElement("div");
               div.className = "qkrLoading";
               var img = d.createElement("IMG");
                  img.className = "lotusLoading";
                  img.alt = "";
                  img.src = dojo.config.blankGif;
               div.appendChild(img);
               div.appendChild(d.createTextNode("\u00a0"));
               div.appendChild(d.createTextNode(this._strings.LOADING));
            el.appendChild(div);
         }
      },
      
      onVisible: function() {
         if (!this._loaded)
            this.load();
      }
   }
);
