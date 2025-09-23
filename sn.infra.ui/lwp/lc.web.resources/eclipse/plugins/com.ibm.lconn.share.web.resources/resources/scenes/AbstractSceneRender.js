/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.scenes.AbstractSceneRender");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.scenehelper");
dojo.require("lconn.share.widget.MessageContainer");
dojo.require("lconn.share.util.configUtil");
dojo.require("lconn.share.widget.Scrollable");
dojo.require("lconn.core.aria.Toolbar");



/**
 * Base pattern for all standard scene rendering.  After data has been initialized on the scene, call .render().
 * To change behaviors, subclass the individual methods.  The call tree looks like:
 * 
 *    render
 *       reuse or init tabs, search, and placebar
 *          (during reuse the the navigation is preserved but filters and the main content area are cleared)
 *       renderNavigation - the green box
 *       renderFilters - any content in the left nav
 *       renderHeader - top of main column
 *          renderBreadcrumb - a breadcrumb if any
 *          renderHeaderTitle - the actual link in the H1
 *          renderHeaderDecorations - anything following the title, like the inactive text
 *          render meta section
 *             renderHeaderFilters (active filters) OR renderHeaderDescription
 *          renderMessages - local messages
 *          renderSceneActions - the actions relevant to the current header
 *             renderView - the options to toggle the view, may end up next to the header or next to actions
 *       renderBody - contents to main column
 *       renderBodyFooter - sometimes we need move footer into scrollable body area
 */
dojo.declare("lconn.share.scenes.AbstractSceneRender", null, {
  
   // Independent scrollbar static variables
   isbStatics: {
     isbSubscriber: null,
     isbInterval: null,
     isbListener: null
   },
  
   /**
    * @param navigationOnly If true, the framework of the scene will be initialized (including navigation) but 
    * none of the other methods will be invoked.  Useful for error messages that are substantially different
    * than the main scene. 
    */
   render: function(navigationOnly) {
      var app = this.app;
      var authenticatedUser = app ? app.authenticatedUser : null;
      var d = app.document;
      var activePivot = this.activePivot;
      
      var defaultSearchScope = this.defaultSearchScope;
      if (activePivot && activePivot.searchScope)
         defaultSearchScope = activePivot.searchScope;
      
      
      var reusing = lconn.share.scenehelper.reuseHomeTemplate(d, app, this._getOptionsToReuseHomeTemplate(defaultSearchScope));
      
      var c = d.getElementById("lotusMain");
         var el;
         if (reusing) {
            var leftColumn = d.getElementById("lotusColLeft");
               var leftColumnBody = d.getElementById("lconnSideNavBody");
               var lconnFolderNavPanel = d.getElementById("lconnFolderNavPanel");
               var lconnFilterPanel = d.getElementById("lconnFilterPanel");
               var sideNav = d.getElementById("lotusSidenav");
               
               if (!sideNav || sideNav.parentNode != lconnFolderNavPanel || lconnFolderNavPanel.parentNode != leftColumnBody) {
                  lconn.share.util.html.removeChildren(leftColumnBody);
                  leftColumnBody.appendChild(lconnFolderNavPanel);
                  this.renderNavigation(d, lconnFolderNavPanel);
               }
               else {
                  var div = d.createElement("div");
                  div.style.display = "none";
                  
                  c.appendChild(div);
                  var nextSibling = lconnFilterPanel.firstChild;
                  while(nextSibling) {
                     var temp = nextSibling.nextSibling;
                     div.appendChild(nextSibling);
                     nextSibling = temp;
                  }
                  lconn.share.util.html.removeChildren(div);
                  c.removeChild(div);
                  this.updateNavigation(d, lconnFolderNavPanel);
               }
               
               if (!navigationOnly)
                  this.renderFilters(d, lconnFilterPanel);
               
            el = d.getElementById("lotusContent");
            lconn.share.util.html.removeChildren(el);
         }
         else {
            var leftColumn = d.createElement("div");
               leftColumn.id = leftColumn.className = "lotusColLeft";
               this.leftColumn = leftColumn;
               
               this.renderNavigationGlobalButtons(d, leftColumn);

               var leftColumnBody = d.createElement("div");
                  leftColumnBody.id = "lconnSideNavBody";
                  leftColumnBody.style.boxSizing = "border-box";

                  var lconnFolderNavPanel = d.createElement("div");
                     lconnFolderNavPanel.id = "lconnFolderNavPanel";
                     
                     this.renderNavigation(d, lconnFolderNavPanel);
                  leftColumnBody.appendChild(lconnFolderNavPanel);
                  this.lconnFolderNavPanel = lconnFolderNavPanel;
        
                  var lconnFilterPanel = d.createElement("div");
                     lconnFilterPanel.id = "lconnFilterPanel";
                     
                     dojo.addClass(lconnFilterPanel, "lconnInvisible");
                     if (!navigationOnly)
                        this.renderFilters(d, lconnFilterPanel);
                  leftColumnBody.appendChild(lconnFilterPanel);
                  this.lconnFilterPanel = lconnFilterPanel;
                  
                  if (lconnFolderNavPanel.firstChild)
                     dojo.addClass(leftColumnBody.firstChild, "lotusFirst");
               
                  this._makeNavigationScrollable(leftColumnBody);
              leftColumn.appendChild(leftColumnBody);
            
            c.appendChild(leftColumn);
            
            if(lconn.share.util.configUtil.isFilesRefinePanelEnabled(this.app.authenticatedUser)) {
               this._addAnimation();
               leftColumn.addEventListener("transitionend", dojo.hitch(this, this._onTransitionEnd), false);
               lconnFilterPanel.addEventListener("transitionend", dojo.hitch(this, this._onTransitionEnd), false);
               lconnFolderNavPanel.addEventListener("transitionend", dojo.hitch(this, this._onTransitionEnd), false);
            }

            //148668: [D41][IE8] Left nav gray background is missing after the fold - files
            this.renderNavigationHidden(d, c);
            
            el = d.createElement("div");
               el.id = el.className = "lotusContent";
               dijit.setWaiRole(el, "main");
         }
         
         this.renderGlobalMessages(d, el);

         // only scroll once content starts appearing in the window
         window.scroll(0,0);
         
         if (!navigationOnly) {
            this.renderHeader(d, el);

            var sceneBody = d.createElement("div");
               sceneBody.id = "scene-body";
               if (dojo.exists("activeView.id", this))
                  dojo.addClass(sceneBody, this.activeView.id);
               this.renderBody(d, sceneBody);
               this.renderBodyFooter(d, sceneBody);
            el.appendChild(sceneBody);
            if (lconn.share.util.configUtil.isFilesEnableContinuousScrolling(this.app.authenticatedUser))
              sceneBody.onscroll = dojo.hitch(this, this.onScroll);

            this._makeSceneBodyScrollable(sceneBody);
         }
      dojo.publish("lconn/share/scene/render", [this, el]);
      
      c.appendChild(el);
      lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
      if (!this._isFileViewerOpen()) {
         this.setDefaultFocus();
      }
   },
   
   /* abstract function */
   onScroll: function() {},

   renderNavigationGlobalButtons: function(d, leftColumn) { },
   _makeSceneBodyScrollable: function(sceneBody) {},
   _makeNavigationScrollable: function(leftColumnBody) {},
   
   _getOptionsToReuseHomeTemplate: function(defaultSearchScope) {
      return  {
         activeTab: this.activeTab, 
         defaultSearchScope: defaultSearchScope
      };
   },
   
   _isFileViewerOpen: function () {
      var isOpenFunction = dojo.getObject("ic-share.fileviewer.FileViewer.isOpen");
      return dojo.isFunction(isOpenFunction) && isOpenFunction();
   },
   
   isIsbCompatible: function() {     
      return true;
   },

   setResponsivePanel: function() {
     if(this.isIsbCompatible()){
       this._addIndependentScrollStyles();
     } else {
       this._revertIndependentScrollStyles();
     }
   },

   // TODO remove this
   _addIndependentScrollStyles: function() { },
   
   // TODO remove this
   _revertIndependentScrollStyles: function() { },

   setDefaultFocus: function(){
      var a = this.focusSceneTitle ? this.headerLinkNode : this.getActiveNavigationLink();
      if (this.app && this.app.buttonFocusStatus){
         if(this.app.buttonFocusStatus.buttonName == "ToggleFollowingFolder"){
            var fs = dojo.query(".lotusBtnContainer .lotusBtn[id^=lconn_files_action_more_]");
            if(fs && fs.length==1) fs[0].focus();
            this.app.buttonFocusStatus = undefined;
         } else if (a) dijit.focus(a);
      } else {
         if (a) dijit.focus(a);
         this.app.buttonFocusStatus = undefined;
      }
   },
   renderGlobalMessages: function(d, el) {
      var app = this.app;
      this.globalMessageContainer = new lconn.share.widget.MessageContainer({messages: app.messages, nls: app.nls, filter: function(m) {return m.isGlobal;}}, el.appendChild(d.createElement("div")));
   },
   
   renderHeader: function(d, el) {
	  if(lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(this.app.authenticatedUser)){
		 this.renderMessages(d, el);
	  }
	  var sceneHeader = dojo.exists("app.layout.titleBar.sceneHeader", this) ? this.app.layout.titleBar.sceneHeader : null;
      
      if (sceneHeader)
         dojo.empty(sceneHeader.sceneTitleNode);

      this.renderBreadcrumb(d, sceneHeader ? sceneHeader.domNode : el);
      
      var header = this.headerNode = d.createElement("div");
      header.className = "lotusHeader";
      header.id = "lotusContentHeader";

      if (sceneHeader) {
         this._populateHeader(d, sceneHeader.sceneTitleNode);
         this.renderHeaderTitle(d, sceneHeader.sceneTitleNode);
         this.renderHeaderDecorations(d, sceneHeader.sceneTitleNode);
      } 
      else {
         this._populateHeader(d, header);

         var h1 = d.createElement("h1");
            h1.id = "scene-title";
            dijit.setWaiState(h1, "live", "polite");
            this.renderHeaderTitle(d, h1);
         this.renderHeaderDecorations(d, h1);
         header.appendChild(h1);
      }
 
      this.renderHeaderFilters(d, header);
      el.appendChild(header);         
      
      dojo.publish("lconn/share/scene/header/complete", [this]);
      
      if(!lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(this.app.authenticatedUser)){
 		 this.renderMessages(d, el);
 	  }
      this.renderSceneActions(d, el);
      
      dojo.publish("lconn/share/scene/actions/complete", [this]);
   },
   
   /**
    * Populate content in header. 
    */
   _populateHeader: function(d, header) { },
   
   getHeaderLink: function(){
      return this.getSceneUrl();
   },
   
   renderHeaderTitle: function(d, el) {
      var app = this.app;
      var pivotDescription = this.getHeaderText();
      if (window.ui && window.ui._check_ui_enabled() && app.isCommunityScene) {
    	  this.headerLinkNode = lconn.share.util.html.breakString(pivotDescription, d, el);
	  } else {
          var a = this.headerLinkNode = d.createElement("a");
          a.href = this.getHeaderLink();
          lconn.share.util.html.breakString(pivotDescription, d, a);
          dijit.setWaiState(a, "label", pivotDescription);
          a.title = app.nls.SCENE_TITLE_TOOLTIP;
          dojo.addClass(a, 'bidiSTT_URL');
          if(dojo.isIE){
             el.style.width = "95%";
          }
          el.appendChild(a);
	  }
   },
   
   renderBreadcrumb: function(d, el) { },
   
   /**
    * To render body footer. No-op by default. 
    */
   renderBodyFooter: function(d, el) { },
   
   renderMessages: function(d, el) {
      var app = this.app;
      this.messageContainer = new lconn.share.widget.MessageContainer({
         messages: app.messages, 
         filter: function(m) {return !m.isGlobal;}, 
         nls: app.nls
      }, el.appendChild(d.createElement("div")));
   },
   
   renderHeaderDecorations: function(d, el) {},
   
   renderHeaderFilters: function(d, el) {
      var nls = this.app.nls;
      var activeFilters = this.activeFilters || [];
      var params = this.params;

      var div = d.createElement("div");
         if (activeFilters.length > 0) {
            div.className = "lotusFilters2";
            div.style.marginTop = "10px";
            div.appendChild(d.createTextNode(nls.CONTENT.FILTERED_BY));
            for (var i=0; i<activeFilters.length; i++) {
               var args;
               if (activeFilters[i] && activeFilters[i].removeAppParams) {
                  args = dojo.clone(params);
                  activeFilters[i].removeAppParams(args);
               }
               else
                  args = {};
   
               div.appendChild(d.createTextNode("\u00a0"));
               var a = d.createElement("a");
                  a.className = "lotusFilter";
                  a.title = nls.CONTENT.REMOVE_FILTER_TOOLTIP;
                  a.appendChild(d.createTextNode(activeFilters[i].longName));
                  a.href = this.getSceneUrl(args);
                  var img = d.createElement("img");
                     img.className = "lotusDelete";
                     img.alt = nls.CONTENT.REMOVE_FILTER_ALT;
                     img.src = dojo.config.blankGif;
                     dijit.setWaiRole(img, "presentation");
                  a.appendChild(img);
                  var span = d.createElement("span");
                     span.className = "lotusAccess";
                     span.appendChild(d.createTextNode(nls.CONTENT.REMOVE_DISCRIPTION));
                  a.appendChild(span);
                  var span = d.createElement("span");
                     span.className = "lotusAltText";
                     span.appendChild(d.createTextNode(lconn.share.util.html.getDirectionCode() + "X"));
                  a.appendChild(span);
               div.appendChild(a);
            }
            if(this.collection){
               var userInfodiv = document.createElement("div");
                  userInfodiv.className = "lotusMeta";
               this.renderHeaderDescription(d, userInfodiv);
               el.appendChild(userInfodiv);
            }
         }
         
         div.className = "lotusMeta";
         this.renderHeaderDescription(d, div);
         
      el.appendChild(div);
   },
   
   renderHeaderDescription: function(d, el) {
      var ul = d.createElement("ul");
      ul.className = "lotusInlinelist";
      var desp = this.getHeaderDescription();
      if((typeof desp == "function") || (typeof desp == "string")){
         var li = d.createElement("li");
         li.className = "lotusFirst";
         if (typeof desp == "function") {
            desp.apply(this,[d, li]);
         } else if (typeof desp == "string") {
            li.appendChild(d.createTextNode(this.getHeaderDescription()));
         }
         ul.appendChild(li);
      }
      el.appendChild(ul);
   },

   renderSceneActions: function(d, el) {
      var isFilesRefinePanelEnabled = lconn.share.util.configUtil.isFilesRefinePanelEnabled(this.app.authenticatedUser);
      var dom = el;
      if(isFilesRefinePanelEnabled) {
         var toolBar = dojo.exists("app.layout.toolBar", this) ? this.app.layout.toolBar : null;
         if(toolBar) {
            var sceneActionNode = dojo.query('#lotusContentSceneActions', toolBar.domNode);
            if(sceneActionNode.length > 0) {
               dojo.destroy(sceneActionNode[0]);
            }
            dom = toolBar.domNode;
         }
      }
      var hasViews = !!this.activeView;
      var actions = this.renderSceneActionButtons(d, dom);
      
      if (actions && actions.firstChild) {
         var divact = d.createElement("div");
            divact.id = "lotusContentSceneActions";
            if(isFilesRefinePanelEnabled) {
               actions.setAttribute("role","toolbar");
               new lconn.core.aria.Toolbar(actions);
               divact.appendChild(actions);
            }
            dojo.addClass(divact, "lconnContentSceneActions");
            if (hasViews)
               this.renderView(d, divact);
            if(!isFilesRefinePanelEnabled) {
               divact.appendChild(actions);
            }
         dom.appendChild(divact);
      }
      else if (hasViews) {
         var header = this.headerNode;
         dojo.addClass(header, "qkrViewControlHeader");
         this.renderView(d, header, true);
      }
   },   

   setActionContext: function(actionContext) {
      this.actionContext = actionContext;
      if (this.actionBar)
         this.actionBar.selectionChanged(this.actionSelection, this.actionContext);
   },

   setActionSelection: function(actionSelection) {
      this.actionSelection = actionSelection;
      if (this.actionBar)
         this.actionBar.selectionChanged(this.actionSelection, this.actionContext);
   },

   renderSceneActionButtons: function(d, el) {
      if (!this.listActions || !this.listActions.length)
         return null;
      var div = d.createElement("div");
         div.className = "lotusBtnContainer";
         
         // TODO: replace with lotusActionBar when we switch to OneUI 3
         this.actionSelection=[];
         this.actionBar = new com.ibm.social.layout.widget.ActionBar({
               actions: this.listActions,
               selection: this.actionSelection,
               context: this.actionContext
            }, div);
         
      return div;
   },

   setActionContainerVisibility: function(hasVisibleItems){
      if(this.actionBar){
         this.actionBar.setActionBarButtonContainerVisibility(hasVisibleItems);
      }
   },

   renderNavigationHidden: function(d, el) {
      var leftColumnHidden = d.createElement("div");
      leftColumnHidden.className = "lotusHidden leftColBackgroundPlaceholder";
      leftColumnHidden.id = "leftColBgPlaceholder";
      leftColumnHidden.innerHTML = "&nbsp;";
      el.appendChild(leftColumnHidden);
   },
   
   _addAnimation: function() {     
      this.activeLeftPanel = this.lconnFolderNavPanel;
      this.leftPanels = {
         'navigationView': this.lconnFolderNavPanel,
         'filterView': this.lconnFilterPanel
      };
      
      this.leftColumnHidden = false;
      
      dojo.subscribe('lconn/share/toolbar/action/click', dojo.hitch(this,function(node) {
         if (!node || !node.id) return;
         if (!this.leftPanels[node.id]) return;
         if(!this.leftColumn || !this.lconnFolderNavPanel || !this.lconnFilterPanel) return;
         
         if (this.leftColumnHidden) {
            this.activeLeftPanel = this._switchPanels(this.leftPanels[node.id], this.activeLeftPanel);

            dojo.addClass(this.leftColumn, "lconnSlideIn");
            dojo.removeClass(this.leftColumn, "lconnSlideOut");
            dojo.removeClass(this.leftColumn, "lconnInvisible");

            this._adjustToolbar(false);
            
            this.leftColumnHidden = false;
            
            return;
         }
         
         if (this.leftPanels[node.id] === this.activeLeftPanel) {
            // should hide the whole left column
            dojo.addClass(this.leftColumn, "lconnSlideOut");
            dojo.addClass(this.leftColumn, "lconnInvisible");
            this._adjustToolbar(true);

            this.leftColumnHidden = true;
            
            return;
         }
         
         this.activeLeftPanel = this._switchPanels(this.leftPanels[node.id], this.activeLeftPanel, true);
      }));
    },
   
   _adjustToolbar: function(isLeftColumnHidden) {
      if(this.app.layout && this.app.layout.toolBar) {
         var node = this.app.layout.toolBar.domNode;
         if(isLeftColumnHidden) {
            dojo.addClass(node, 'colLeftHidden');
         } else {
            dojo.removeClass(node, 'colLeftHidden');
         }
      }
   },
   
   _switchPanels: function(activeNode, inactiveNode, animation) {
      // SlideOut to inactiveNode
      if (animation) {
         dojo.addClass(inactiveNode, "lconnSlideOut");
      }
      dojo.addClass(inactiveNode, "lconnInvisible");

      // SlideIn to activeNode
      if (animation) {
         dojo.addClass(activeNode, "lconnSlideIn");
         dojo.removeClass(activeNode, "lconnSlideOut");
      }
      dojo.removeClass(activeNode, "lconnInvisible");
      
      return activeNode;
   },

   _onTransitionEnd: function(e) {
      dojo.stopEvent(e);
      
      if (e.srcElement) {
         dojo.removeClass(e.srcElement, "lconnSlideIn");
         dojo.removeClass(e.srcElement, "lconnSlideOut");         
      }
      
      if (e.target) {
         dojo.removeClass(e.target, "lconnSlideIn");
         dojo.removeClass(e.target, "lconnSlideOut");         
      }
   }
});
