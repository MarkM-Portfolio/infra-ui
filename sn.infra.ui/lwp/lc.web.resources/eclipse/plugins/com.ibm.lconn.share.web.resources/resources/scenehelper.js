/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.scenehelper");

dojo.require("dijit._Widget");
dojo.require("lconn.core.locale");
dojo.require("lconn.core.svg.svgHelper");
dojo.require("lconn.share.widget.HelpLauncher");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.configUtil");

lconn.share.scenehelper = {
    
  /**
  * Look for an existing lotusFrame in the page and strip any custom elements out of it for
  * reuse.  If the lotusFrame is not the original div (from the first load) remove it from
  * the DOM after deleting any children.  Use when you are not intending to use the header
  * or footer.
  * 
  * Returns a map with the following keys
  *    frame - a lotusFrame that is empty and ready for new elements
  */
  hideLotusFrame: function(d, app) {
     var lssh = lconn.share.scenehelper;
     var body = d.body;
     var oldframe = d.getElementById("lotusFrame");
     if (oldframe) {
        body = oldframe.parentNode;
        if (dojo.hasClass(oldframe, "_qkrInitial"))
           lssh.prepStorage(d, oldframe);
        else {
           lssh.saveCustomTemplate(d, "qkrStorage");
           lconn.share.util.html.destroyWidgets(oldframe);
           body.removeChild(oldframe);
        }
     }
     var el = d.createElement("div");
     el.className = "lotusFrame lotusui30_layout";
     el.id = "lotusFrame";
     body.appendChild(el);
     return {frame: el};
  },

  /**
   * Look for an existing lotusFrame in the page and strip any custom elements out of it for
   * reuse.  If the lotusFrame is not the original div (from the first load) remove it from
   * the DOM after deleting any children. Use when you are intending to reuse the header or
   * footer
   * 
   * Returns a map with the following keys
   *    frame - a lotusFrame that is empty and ready for new elements
   *    lotusBanner - the header element for the page (detached from DOM)
   *    lotusFooter - the footer element for the page (detached from DOM)
   */
  resetLotusFrame: function(d, app) {
     var lssh = lconn.share.scenehelper;
     var old = lssh.detachCustomTemplate(d, app, null, true);
     var body = d.body;
     var oldframe = d.getElementById("lotusFrame");
     if (oldframe) {
        body = oldframe.parentNode;
        if (dojo.hasClass(oldframe, "_qkrInitial"))
           lssh.prepStorage(d, oldframe);
        else {
           lconn.share.util.html.destroyWidgets(oldframe);
           body.removeChild(oldframe);
        }
     }
     var el = old.frame = d.createElement("div");
     el.className = "lotusFrame lotusui30_layout";
     el.id = "lotusFrame";
     body.appendChild(el);
     var footerNode = dojo.byId("lotusFooter");
     if (footerNode)
        dojo.place(el, footerNode, "before");
     return old;
  },
  
  /**
   * This method tries to preserve the lotusFrame if it matches the specified frame type, or
   * initialize/reset the frame back to a default state.
   */
  reuseLotusFrame: function(d, app, frameType) {
     var lssh = lconn.share.scenehelper;
     var frame = d.getElementById("lotusFrame");
     if (!frame) {
        var el = frame = d.createElement("div");
        el.className = "lotusFrame lotusui30_layout";
        el.id = "lotusFrame";
        body.appendChild(el);
     }
     else if (dojo.hasClass(frame, "_qkrInitial") || frameType != frame._type) {
        var old = lssh.resetLotusFrame(d, app);
        old.frame._type = frameType;
        return old;
     }
     frame._type = frameType;
     var old = lssh.detachCustomTemplate(d, app, frame, true);
     old.frame = frame;
     return old;
  },

  /**
   * This method should remove any nodes from the initial page load that no longer need to be preserved. Elements
   * with ids that may be duplicated by the app are especially important to remove.
   */
  prepStorage: function(d, el) {
     el.style.display = "none";
     el.id = "qkrStorage";
     el.className = "";
     var loading = dojo.byId("lconnApplicationLoading");
     var body = dojo.byId("body");
     if (loading && loading.parentNode == el)
        el.removeChild(loading);
     else if(body && loading && dojo.getObject('ibmConfig.serviceName') && dojo.getObject('ibmConfig.serviceName') == "files") {
           body.removeChild(loading);
     }
  },
  
  /**
   * @keepInDOM Indicate whether to keep the detached elements in DOM, instead of removing the from DOM. 
   */
  detachCustomTemplate: function(d, app, frame, keepInDOM) {
     var detached = {};
     dojo.forEach(["lotusBanner","lotusFooter"], function(id) {
        var el = d.getElementById(id);

        if (!el) return;
        
        if(!el.fixedLinks) {
           dojo.forEach(el.getElementsByTagName("A"), lconn.share.scenehelper.applyLinkRulesForConnections, app);
           el.fixedLinks = true;
        }
        if(!el.movedStyleNodes) {
           // Move CSS-related nodes outside the header and footer, so they don't get disconnected and reconnected, which causes flicker in IE
           dojo.forEach(["LINK","STYLE"], function(type) {
              dojo.query(type, el).forEach(function(el) { d.body.appendChild(el); });
           });
           // Remove src from SCRIPT to avoid IE to reload it. 
           if (dojo.isIE) {
              dojo.query("SCRIPT", el).forEach(function(el) {
                 if (el.src) {
                    el.oldSrc = el.src;
                    el.removeAttribute("src");
                 }
              });
           }
           el.movedStyleNodes = true;
        }
        if (!frame || !dojo.isDescendant(el, frame)) {
           
           if (keepInDOM)
              d.body.appendChild(el);
           else
              el.parentNode.removeChild(el);
           
           this[id] = el;
        }
        el.style.display = "";
     }, detached);
     return detached;
  },
  
  /**
   * Return global footer.
   */
  getLotusFooter: function() {
     return dojo.byId("lotusFooter");
  },

  /**
   * To move lotusFooter to be the last child of targetNode. If targetNode is not set, move to lotusFrame. 
   * 
   */
  moveLotusFooter: function(targetNode) {
     var footer = lconn.share.scenehelper.getLotusFooter();
     
     if (!targetNode) {
        targetNode = dojo.byId("lotusFrame");
     }
     
     if (footer && targetNode)
        dojo.place(footer, targetNode, "last");
  },

  saveCustomTemplate: function(d, node) {
     var s = dojo.byId(node);
     if (!s)
        throw "saveCustomTemplate called but the save node was not found";
     dojo.forEach(["lotusBanner","lotusFooter"], function(id) {
        var el = dojo.byId(id);
        if (el) {
           el.parentNode.removeChild(el);
           s.appendChild(el);
        }
     });
  },

  applyHomeTemplate: function(d, authenticatedUser, app, routes, opt) {
     var lssh = lconn.share.scenehelper;
     var old = lssh.resetLotusFrame(d, app);
     var frame = old.frame;
       var div = frame.appendChild(d.createElement("div"));
          div.id = div.className = "lotusTopNav";
          dijit.setWaiRole(div, "banner");
          dojo.attr(div, "aria-label", app.nls.APP_NAME_TITLE_BAR);
          if (old["lotusBanner"]){
             div.appendChild(old["lotusBanner"]);
             old["lotusBanner"].removeAttribute("role");
          }
          else
             throw "Header was not in the DOM when applyHomeTemplate was called"; 
   
          if (opt.titleBar) {
             var el = d.createElement("div");
                el.id = el.className = "lotusTitleBar";
                lssh.applyTitleBar(d, el, app, opt);
             div.appendChild(el);
          }
          
          if (!opt.hidePlaceBar) {
             var el = d.createElement("div");
                el.id = "lotusPlaceBar";
                el.className = "lotusPlaceBar lotusTitleBarExt";
                lssh.applyPlaceBar(d, el, app);
             div.appendChild(el);
           }

     var el = d.createElement("div");
        el.id = el.className = "lotusMain";
     frame.appendChild(el);

     if (old["lotusFooter"])
        frame.appendChild(old["lotusFooter"]);
  },
  
  applyTitleBar: function() {
    throw "Implementor must provide applyTitleBar() when using applyHomeTemplate";
  },
  reuseTitleBar: function() {
    throw "Implementor must provide reuseTitleBar() when using reuseHomeTemplate";
  },
  
  applyPlaceBar: function() {
  },
  reusePlaceBar: function() {
  },

  /**
   * Create global actions. No-op by default. 
   */
  applyGlobalActions: function() {}, 
  
  reuseHomeTemplate: function(d, app, opt) {
     var lssh = lconn.share.scenehelper;
     var old = lssh.reuseLotusFrame(d, app, "main");
     var frame = old.frame;
     var reusing = !!frame.firstChild;
     
     if (reusing) {
        if (opt.titleBar)
           lssh.reuseTitleBar(d, d.getElementById("lotusTitleBar"), app, opt);
        
        if (!opt.hidePlaceBar)
           lssh.reusePlaceBar(d, d.getElementById("lotusPlaceBar"), app, opt);
     }
     else {
        var divBanner = d.createElement("div");
           divBanner.id = divBanner.className = "lotusTopNav";
           dijit.setWaiRole(divBanner, "banner");
           dojo.attr(divBanner, "aria-label", app.nls.APP_NAME_TITLE_BAR);
        frame.appendChild(divBanner);
        
        // ensure the header and footer are in place

          var banner = old["lotusBanner"];
             banner.removeAttribute("role");
          divBanner.appendChild(banner);
          
          if (opt.titleBar) {
             var el = d.createElement("div");
                el.id = el.className = "lotusTitleBar";
                lssh.applyTitleBar(d, el, app, opt);
             divBanner.appendChild(el);
          }
          
          if (opt.toolBar) {
              var el = d.createElement("div");
                 el.id = el.className = "lotusToolBar";
                 lssh.applyToolBar(el, app);
              divBanner.appendChild(el);
           }
          
          if (!opt.hidePlaceBar) {
             var el = placebar = d.createElement("div");
                el.id = "lotusPlaceBar";
                el.className = "lotusPlaceBar lotusTitleBarExt";
                lssh.applyPlaceBar(d, el, app, opt);
             divBanner.appendChild(el);
          }
        
        var el = d.createElement("div");
           el.id = el.className = "lotusMain";
        frame.appendChild(el);
        
        var footer = old["lotusFooter"];
        if (footer)
           frame.appendChild(footer);
     }

     return reusing;
  },
  
   applyDndProperty: function(el, index, item) {
	   el.setAttribute("dndData", index + "");
	   el.setAttribute("dndType", (item && item.isFolder()? "folder":"file" ));
	   el.setAttribute("dndElementTitle", item.getName());
	   dojo.addClass(el, "dojoDndItem dojoDndHandle");
   },
  /*******************************************************************************
   * Common rendering functions for the footer and header. Should be used by all
   * scenes.
   ******************************************************************************/

  applyLinkRulesForConnections: function(a) {
     var lssh = lconn.share.scenehelper;
     if (a.href) {
        if (/login_app_replace$/.test(a.href)) {
           lssh.setOnClick(a, this, "javascript:;", this.login);
        }
        else if (/logout_app_replace$/.test(a.href)) {
           lssh.setOnClick(a, this, "javascript:;", this.logout);
        }
        else if (/help_app_replace$/.test(a.href)) {
           a.href = "javascript:;"; 
           dojo.connect(a, "onclick", dojo.hitch(this, "activateHelp"));
        }
     }
  },
  
  setOnClick: function(a, obj, href, method) {
      if (dojo.isIE < 9) {//workaround IE8 bug: link text will become the url link when the text contains the character "@"
         var initInnerHTML = a.innerHTML;
         a.setAttribute("href", href);
         a.innerHTML = initInnerHTML;
      }
      else
         a.href = href;
     if (!a._registered) {
        if (method)
           dojo.connect(a, "onclick", obj, method);
        else if (method == false)
           a.ignore = true;
        a._registered = true;
     }
  },  

  applyLoading: function(app) {
     var d = app.document;

     var old = lconn.share.scenehelper.hideLotusFrame(d, app);
     var frame = old.frame;
        var el = d.createElement("div");
           el.id = el.className = "lconnApplicationLoading";
           el.appendChild(d.createTextNode(app.nls.LOADING));
        frame.appendChild(el);
  },
    
  createSearchButton: function(d, el, id, text) {
     var searchSpan = d.createElement("span");
        searchSpan.className = "lotusBtnImg";
        searchSpan.title = text;
              
        var input = d.createElement("INPUT");
           if(id) input.id = id;
           input.className = "lotusSearchButton";
           input.type = "image";
           input.title = input.alt = text;
           input.src = dojo.config.blankGif;
        searchSpan.appendChild(input);

        var searchAlt = d.createElement("a");
           searchAlt.href = "javascript:;";
           searchAlt.className = "lotusAltText";
           searchAlt.appendChild(d.createTextNode(text));
           dojo.connect(searchAlt, "onclick", function() { try { input.click(); }catch(e){} });
           dijit.setWaiRole(searchAlt, "button");
        searchSpan.appendChild(searchAlt);

     if(el) el.appendChild(searchSpan);
     
     return input;
  },

  applyFeedLink: function(el, url, text, title, feedTitle) {
     title = title || text;
     feedTitle = feedTitle || title;
     var d = document;
     var divf = d.createElement("div");
        divf.className = "lotusFeeds lotusLeft";
        var a = divf.appendChild(d.createElement("a"));
           a.className = "lotusFeed lotusAction";
           a.href = url
           a.title = title;
           a.appendChild(d.createTextNode(text));
     el.appendChild(divf); 
     return divf;
  },

  applyGenericPopup: function(app, el, a, msgString) {
     var d = app.d;
     if (dojo.isArray(a))
        throw "Arrays no longer supported for popups";
     
     a.href = a.href || "javascript:;";
     var div = d.createElement("div");
     div.style.width = "250px";
     div.className = "lotusHelp";
     var div2 = div.appendChild(d.createElement("div"));
     div2.className = "lotusInfoBox";
     div2.appendChild(d.createTextNode(msgString));
     return new lconn.share.widget.HelpLauncher({openDelay: 50, hideDelay: 0, optMenu: {content: div}}, a);
  },
  
  applyTipPopup: function(app, el, a, topicId, header) {
     var d = app.d;
     if (dojo.isArray(a))
        throw "Arrays no longer supported for popups";
     
     a.href = a.href || "javascript:;";
     //hide help tip for cnx8.0
     if (window.ui && window.ui._check_ui_enabled()) {
         a.title = '';
     } else {
         a.title = app.nls.MENUBAR.HELP_TITLE;
     }

     var tooltip = new dijit.Tooltip({
        connectId: [a],
        label: a.title,
        position: ["above", "below"]
      });
     dojo.setAttr(a, "hastooltip", tooltip.id);
     
     return new lconn.share.widget.HelpLauncher({optMenu: {
        net: app.net,
        href: app.routes.getHelpTopicUrl(topicId),
        label: app.nls.LOADING,
        heading: header,
        labelClose: app.nls.CLOSE,
        title: (window.ui && window.ui._check_ui_enabled()) ? '' : header,
        msgError: app.nls.TIPS.ERROR,
        msgEmpty: app.nls.TIPS.ERROR
     }}, a);
  },
  
  customizeViewObject: function(file, viewObject) {
     return viewObject;
  },
  
  createHelpLink: function(app, el, topic, opt) {
     opt = opt || {};
     var popHeader  = "";
     var d = document;
     var a = d.createElement("A");
        a.href = "javascript:;";
        dijit.setWaiRole(a, "button");
        var img = d.createElement("IMG");
           img.alt = app.nls.MENUBAR.HELP;
           img.className = lconn.core.locale.getLanguage() === "ar" ? "lconnSprite lconnSprite-iconHelp16-ar": "lconnSprite lconnSprite-iconHelp16";
           img.src = opt.blankGif || dojo.config.blankGif;
        a.appendChild(img);
        
        var altSpan = d.createElement("span");
           dijit.setWaiState(altSpan, "label", app.nls.MENUBAR.HELP);
           altSpan.className = "lotusAltText";
           altSpan.appendChild(d.createTextNode(lconn.core.locale.getLanguage() === "ar" ? "\u061F" : "?"));
        a.appendChild(altSpan);
        if(opt.header)
          popHeader = opt.header;
        if (topic)
           lconn.share.scenehelper.applyTipPopup(app, el, a, topic, popHeader);
        
        if (opt && opt.inline)
           a.style.verticalAlign = "text-top";
        if (opt && opt.label){
           var span = d.createElement("span");
              span.className = "lotusAccess";
              span.appendChild(d.createTextNode(opt.label));
           a.insertBefore(span, a.firstChild);
        }
     el.appendChild(a);
     return a;
  },
  
  addToolTip: function(node) {
     if(!node.getAttribute("hastooltip")){
        new dijit.Tooltip({
               connectId: [node],
               label: node.title,
               position: ["above", "below"]
           });
        node.setAttribute("hastooltip", true);
     }
  },
  
  setLastView: function(baseUrl, userExternalId, lastVisitUrl, lastViewLabel) {
     var lssh = lconn.share.scenehelper;
     if (lastVisitUrl.indexOf('/file/') < 0) {
        var key = baseUrl + userExternalId;
        lssh.storeLastVisitView(key, lastVisitUrl, true, lastViewLabel, false);
     }
  },
  
  visitLastView: function(baseUrl, userExternalId, isLocalStorageAvailable) {
     var lssh = lconn.share.scenehelper;
     var key = baseUrl + userExternalId;
     var lastVisitUrl;
     var lastViewLabel;
     var lastVisitUrlObj = lssh.getLastVisitView(key);
     if (lastVisitUrlObj) {
        lastVisitUrl = lastVisitUrlObj.lastVisitUrl;
        lastViewLabel = lastVisitUrlObj.lastViewLabel;
     }
     var uri = lconn.share.util.uri.parseUri(window.location.href);
     if (!uri.fragment || uri.fragment === '/') {
        if (lastVisitUrl) {
           lssh.storeLastVisitView(key, lastVisitUrl, true, lastViewLabel, true);        
           window.location.href = lastVisitUrl;
        }
     }
  },
  
  isLocalStorageAvailable: function() {
     try {
        localStorage = '__localStorage__';
        window.localStorage.setItem(localStorage, localStorage);
        window.localStorage.removeItem(localStorage);
        return true;
     }
     catch(e) {
        return false;
     }
  },
  
  getLastVisitView: function(key) {
     var lastVisitUrlObj;
     if (window.isLocalStorageAvailable) {
        if(window.localStorage.getItem(key) && (window.localStorage.getItem(key).indexOf('{"')==0 || window.localStorage.getItem(key).indexOf("{'")==0)){
           lastVisitUrlObj = dojo.fromJson(window.localStorage.getItem(key));
        }
     } else {
        if(dojo.cookie(key) && (dojo.cookie(key).indexOf('{"')==0 || dojo.cookie(key).indexOf("{'")==0)){
           lastVisitUrlObj = dojo.fromJson(dojo.cookie(key));
        }
     }
     return lastVisitUrlObj;
  },
  
  storeLastVisitView: function(key, lastVisitUrl, isAvailable, lastViewLabel, isLastViewUsed) {
     var uri = lconn.share.util.uri.parseUri(lastVisitUrl);
     if (!uri.fragment)
        return;

     if (window.isLocalStorageAvailable) {
        window.localStorage.setItem(key, dojo.toJson({'lastVisitUrl':lastVisitUrl, 'isAvailable':isAvailable, 'lastViewLabel':lastViewLabel, 'isLastViewUsed':isLastViewUsed}));
     } else {
        dojo.cookie(key, dojo.toJson({'lastVisitUrl':lastVisitUrl, 'isAvailable':isAvailable, 'lastViewLabel':lastViewLabel, 'isLastViewUsed':isLastViewUsed}), {expires: 365});
     }
  },
  
  goDefaultPage: function(app, authenticatedUser) {
     var lssh = lconn.share.scenehelper;
     if (authenticatedUser != null) {
        var key = app.baseUriPath + authenticatedUser.id;
        var lastVisitUrlObj = lssh.getLastVisitView(key);
        if (lastVisitUrlObj) {
           if (lastVisitUrlObj.isLastViewUsed && (lconn.share.util.uri.parseUri(window.location.href).fragment) != lssh.getFilesDefaultPage(app)) {
              var lastViewLabel = lastVisitUrlObj.lastViewLabel || '';
              var defaultPage = window.location.href.replace(lconn.share.util.uri.parseUri(window.location.href).fragment,"/");
              lssh.storeLastVisitView(key, '', false, lastViewLabel, false);
              window.location.href = defaultPage;
           }
        }
     }
  },
  
  showMessageForNotAvailablePage: function(app) {
      var key = app.baseUriPath + app.authenticatedUser.id;
      var lastVisitUrlObj = lconn.share.scenehelper.getLastVisitView(key);
      if (lastVisitUrlObj && lastVisitUrlObj.lastViewLabel && !(lastVisitUrlObj.isAvailable)) {
         var e = {messages: {warning: true, message:dojo.string.substitute(app.nls.PIVOTS.WARN_VIEW_NOT_AVAILABLE,[lastVisitUrlObj.lastViewLabel])}};
         dojo.publish("lconn/share/action/completed", [e, this]);
      }
  },
  
  getFilesDefaultPage: function(app) {
     if(lconn.share.util.configUtil.isFilesRecentViewEnabled(app.authenticatedUser)) {
        return "/recent";
     }
     return "/filesync";
  },
  
  createPinIcon: function() {
	 if (lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
		var divNode = document.createElement("div");
	    dojo.addClass(divNode, 'lconnSprite lconnSprite-iconPinned16-off');
        lconn.core.svg.svgHelper.loadIcon(divNode, "pinnedIcon");
        return divNode; 
 	 } else {
 	    var img = document.createElement("img");
        img.src = dojo.config.blankGif;
        img.alt = "";
        dijit.setWaiRole(img, "presentation");
        img.className = "lconnSprite lconnSprite-iconPinned16-off";
        return img;
    }  
  },
  
  createTogglePin: function() {
      if (lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
    	 return lconn.share.scenehelper.createPinIcon(); 
      } else {
    	 // Use default img pin
    	 return null;
      }
   },
   
   createCopyToClipboardAction: function(value) {
      var input = document.getElementById("copyToClipboard");
      if (!input) {
         input = document.createElement("input");
            input.id = "copyToClipboard";
            input.style.position = "fixed";
            input.style.top = -10;
            input.style.left = -10;
         document.body.appendChild(input);
      }
      var a = document.createElement("a");
         a.style.cursor="pointer";
         a.onclick = dojo.hitch(this, function(e) {
            dojo.stopEvent(e);
            input.value = value;
            input.select();
            try {
               document.execCommand('copy');
               var e = {value: value, success: true};
               dojo.publish("lconn/share/action/copytoclipboard/completed", [e]);
            } catch (err) {
               var e = {value: err, success: false};
               dojo.publish("lconn/share/action/copytoclipboard/completed", [e]);
            }
          });
      return a; 
    }
};
