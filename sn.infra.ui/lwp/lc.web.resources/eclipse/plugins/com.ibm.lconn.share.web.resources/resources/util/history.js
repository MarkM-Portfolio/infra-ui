/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2009, 2022                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.share.util.history");
dojo.require("lconn.share.util.uri");

/**
 * To register the IFRAME from within the core page use this markup:
 * 
 * <!--[if IE]>
 * <iframe onload="this._ready=true;" src="path_to/blank.html" style="border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name="history" id="history"></iframe>
 * <![endif]-->
 * 
 * IE users should call lconn.share.util.history.init() prior to the onload event completing.  If the IFRAME is not available once the page loads the history
 * may be lost.  Also, if the initial page is not served as a 304 Not Modified the history will be removed.
 *
 */
lconn.share.util.history = {
   _getHash: function() { return window.location.hash; },
   
   /* See defects #221789, #242164 - Internet Explorer reports window.location.hash incorrectly after a file 
    * download.  Resetting the hash to the current value fixes the issue.  5 seconds is about the average length
    * of time required to recreate the scenario in the UI - fast enough to catch most issues and slow enough not
    * to cause significant CPU usage in IE.
    */
   _resetHashTimeout: null,
   resetHash: function(/*Array*/times, /*Boolean*/fireImmediately) {
      if (this._resetHashTimeout) {
         window.clearTimeout(this._resetHashTimeout);
         this._resetHashTimeout = null;
      }

      if (fireImmediately)
         window.location.hash = lconn.share.util.history._getHash();

      times = times || [2,5,5,5];
      var time = times.shift();
      if(time > 0) {
         this._resetHashTimeout = window.setTimeout(function() {
            lconn.share.util.history.resetHash(times, true);
         }, time * 1000);
      }
   },
   
   init: function() {
      if (this.inited)
         return;
      this.inited = true;
      if (dojo.isIE) {
         var body = dojo.body();
         var d = body.ownerDocument;
         var frame = d.getElementById("history");
         if (frame) {
            frame.attachEvent("onload", dojo.hitch(lconn.share.util.history, lconn.share.util.history.onload, frame));
            if (frame._ready)
               this.setFirstState(frame);
         }
         else {
            var urlBlank = "javascript:''";
            if (dojo.isIE < 9) {
               frame = document.createElement('<iframe onload="lconn.share.util.history.onload(this);" style="border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;" name="history" id="history" src="' + urlBlank + '">');
                  frame.name = frame.id = "history";
               body.appendChild(frame);
            } else {
               frame = dojo.create('iframe', {
                  style: "border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;",
                  name: "history",
                  id: "history",
                  src: urlBlank
               }, dojo.body());
               dojo.connect(frame, "onload", dojo.hitch(this, this.onload, frame));
             }
         }
      }
      else {
         var url = this.pending;
         if (url) {
            this.pending = null;
            setTimeout(function() {lconn.share.util.history.add(url);},0);
         }
      }
      this.start();
      dojo.connect(window, "onunload", this, "stop");
   },
   
   setFirstState: function(frame) {
      frame._init = true;
      try {
         frame.writingState = true;
         var frameDocument = frame.contentWindow.document;
         frameDocument.open();
         frameDocument.write("<html><head><title>"+document.title+"</title></head><body><div id=\"state\">"+this._getHash()+"</div></body></html>");
         frameDocument.close();
      } catch (e) {
         console.log("unable to write the original state to the history iframe");
      }
   },
   
   onload: function() {
      if (!this.inited) {
         console.log("history.js not initialized");
         return;
      }
      var frame = document.getElementById("history");
      if (frame.writingState) {
         frame.writingState = false;
         var url = this.pending;
         if (url) {
            this.pending = null;
            setTimeout(function(){lconn.share.util.history.add(url);},0);
         }
         return;
      }
      if (!frame._init) {
         setTimeout(function(){lconn.share.util.history.setFirstState(frame);},0);
         return;
      }
      
      var frameWindow = frame.contentWindow;
      var frameDocument = frameWindow.document;
      var state = frameDocument.getElementById("state");
      if (state) {
         this._trackHash = window.location.hash = state.innerText;
         
         var ignoreUrlChangeFunction = dojo.getObject("ic-share.fileviewer.FileViewer.shouldIgnoreUrlChange");
         if (ignoreUrlChangeFunction && ignoreUrlChangeFunction()) {
           return;
         }
         
         // notify of state change
         this.onchange(window.location.href);
      }
   },
   
   add: function(url, replace, state) {
      if (!this.inited) {
         this.pending = url;
         this.init();
         return;
      }
      
      var useHtml5History = !!(state && window.history.pushState); 
      
      var pageWillReload = !lconn.share.util.history.isUrlEqual(url, window.location.href) && !useHtml5History;
      
      if (replace) {
         if (useHtml5History) {
            window.history.replaceState(state, null, url);
         } else {
            window.location.replace(url);
         }
      }
      else {
         if (useHtml5History) {
            window.history.pushState(state, null, url);
         } else {
            window.location.href = url;
         }
      }

      if (dojo.isIE && !replace) {
         var frame = document.getElementById("history");
         if (frame) {
            frame.writingState = true;
            var frameDocument = frame.contentWindow.document;
            frameDocument.title = document.title;
            frameDocument.open();
            frameDocument.write("<html><head><title></title></head><body><div id=\"state\">"+this._getHash()+"</div></body></html>");
            frameDocument.close();
         }
         else {
            alert("history.js not initialized");
         }
      }
      this.start();
      
      if (!pageWillReload)
         this.onchange(url);
   },
   
   reload: function(url) {
      lconn.share.util.history.stop();
      window.location.assign(url);
      window.location.reload(false);
   },
   
   isUrlEqual: function(a, b) {
      var a = lconn.share.util.uri.parseUri(a);
      var b = lconn.share.util.uri.parseUri(b);
      return (
         (a.scheme == null || b.scheme == null || a.scheme == b.scheme) && 
         (a.host == null || b.host == null || a.host == b.host) && 
         a.path == b.path && 
         a.query == b.query
         );
   },
   
   start: function() {
      if (!this.inited) {
         console.log("history.js not initialized");
         return;
      }
      if (!this.urlTracker) {
         this._trackHash = this._getHash();
         this._trackCallback = dojo.hitch(this, this.checkUrl);
         this._trackTimeout = setInterval(this._trackCallback, 75);
      }
   },
   
   stop: function() {
      if (!this.inited) {
         console.log("history.js not initialized");
         return;
      }
      if (this._trackTimeout)
         clearInterval(this._trackTimeout);
      this._trackTimeout = null;
   },

   isSearchDisplayed: function() {
      var ret = false;
      if (window.uiSearchLoaded) {
         ret = !!(window.ui && window.ui && window.ui.is_search_displayed && window.ui.is_search_displayed());
      }
      return ret;
   },
   
   checkUrl: function() {
      if (!this.inited) {
         console.log("history.js not initialized");
         return;
      }
      var hash = this._getHash();
      if (hash != this._trackHash) {
         this._trackHash = hash;
         
         var ignoreUrlChangeFunction = dojo.getObject("ic-share.fileviewer.FileViewer.shouldIgnoreUrlChange");
         if (ignoreUrlChangeFunction && ignoreUrlChangeFunction()) {
         return;
         }

         // CNXSERV-13466 - interrupt the onchange behavior in case the search is displayed so that the files UI doesn't 
         // attempt to rerender. This will fail because the search decouples the content DOM nodes which leads to DOM
         // manipulation errors
         if (this.isSearchDisplayed()) {
            console.log('history.js:search displayed, interrupt rerender');
            return;
         }
         
         this.onchange(window.location.href);
      }
   },
   
   onchange: function(url) {
   }
}
