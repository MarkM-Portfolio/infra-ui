/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.scenes.actions");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuSeparator");
dojo.require("dijit.PopupMenuItem");
dojo.require("lconn.core.MenuUtility");
dojo.require("lconn.share.util.ActionUtil");
dojo.require("lconn.core.config.features");
dojo.require("lconn.core.globalization.bidiUtil");

lconn.share.scenes.actions = {
   /**
    * Render an action array as a set of buttons.
    * @param d An HTML document
    * @param el An HTML element to add the actions under (optional)
    * @param item The first argument to the action
    * @param actions An array of actions
    * @param msgLoading a text string to indicate when things are not yet completely loaded
    * @param msgMoreActions A text string to draw the more actions button with
    * @param opt Additional parameters
    *    visibleActions - the number of actions to show before rendering items under a menu
    * @return An HTML element containing all of the actions
    */
   renderGridButton: function(d, el, item, actions, msgLoading, msgMoreActions, opt, app, data){
      var qssa = lconn.share.scenes.actions;
      
      var div = d.createElement("div");
      div.className = "grid-bottom";
      qssa._render(d, div, qssa._buttonIcon, item, actions, msgLoading, msgMoreActions, dojo.mixin({useButtonIcon: true}, opt), app, data);
      
      if (el)
         el.appendChild(div);
      return div;
   },
   renderButtons: function(d, el, item, actions, msgLoading, msgMoreActions, opt) {
      var qssa = lconn.share.scenes.actions;
      
      var div = d.createElement("div");
      div.className = "lotusBtnContainer";
   
      qssa._render(d, div, qssa._buttonSpan, item, actions, msgLoading, msgMoreActions, dojo.mixin({useButton: true}, opt));
      
      if (el)
         el.appendChild(div);
      return div;
   },
   
   /**
    * Render an action array as a set of action links in a list.
    * @param d An HTML document
    * @param el An HTML element to add the actions under (optional)
    * @param item The first argument to the action
    * @param actions An array of actions
    * @param msgLoading a text string to indicate when things are not yet completely loaded
    * @param msgMoreActions A text string to draw the more actions button with
    * @param opt Additional parameters
    *    visibleActions - the number of actions to show before rendering items under a menu
    *    msgEmpty - an optional text string to display if there are no valid actions
    * @return An HTML element containing all of the actions
    */
   renderList: function(d, el, item, actions, msgLoading, msgMoreActions, opt, data) {
      var qssa = lconn.share.scenes.actions;
     
      var ul = d.createElement("ul");
      ul.className = "lotusActions lotusInlinelist";
  
      qssa._render(d, ul, qssa._li, item, actions, msgLoading, msgMoreActions, opt, null, data);
     
      if (el)
         el.appendChild(ul);
      return ul;
   },
   
   /**
    * the method is only for compatibility reasons here
    * @deprecated: please use renderDropdownGetAllElements instead of this method,
    *              since it gets back all created elements, and thus allows to delete them
    */
   renderDropdown: function(d, el, item, actions, msgLoading, msgMoreActions, opt, data) {
      var qssa = lconn.share.scenes.actions;
      var elements = qssa.renderDropdownGetAllElements(d, el, item, actions, msgLoading, msgMoreActions, opt, data);
      return elements.toolbarElement;
   },

   renderDropdownGetAllElements: function(d, el, item, actions, msgLoading, msgMoreActions, opt, data) {
      var qssa = lconn.share.scenes.actions;

      var toolbarElement = d.createElement("div");
      dojo.attr(toolbarElement, "role", "toolbar");

      if ( opt.addActionDivider == undefined ) {
         opt.addActionDivider = true;
      }
      var menuElements = qssa._renderDropdownActions(d, toolbarElement, item, actions, msgLoading, msgMoreActions, opt, null, data);

      if (el) {
         el.appendChild(toolbarElement);
      }
      return {toolbarElement: toolbarElement, menuElements: menuElements};
   },

   renderImage: function(d, el, item, action, opt) {
      var a = d.createElement("a");
         a.href = "javascript:;";
         a.title = action.getTooltip(item, opt);
         if (opt.linkClass)
            a.className = opt.linkClass;
         dojo.connect(a, "onclick", dojo.hitch(action, action.execute, item, opt));
         dijit.setWaiRole(a, "button");
         var img = d.createElement("img");
            img.alt = img.title = a.title;
            img.src = dojo.config.blankGif;
            dijit.setWaiRole(img, "presentation");
         a.appendChild(img);
         if (opt.linkAlt) {
            img.alt = opt.linkAlt;
            var altSpan = d.createElement("span");
               altSpan.className = "lotusAltText";
               altSpan.appendChild(d.createTextNode(opt.linkAlt));
            a.appendChild(altSpan);
         }
      el.appendChild(a);      
   },
     
   _buttonSpan: function(d, a, isFirst, isMenu) {
      var span = d.createElement("span");
      span.className = "lotusBtn";
      if (isFirst)
         dojo.addClass(span, "lotusFirst");
      span.appendChild(a);
      return span;
   },
   
   _li: function(d, a, isFirst, isMenu) {
      var li = d.createElement("li");
      if (isFirst)
         dojo.addClass(li, "lotusFirst");
      li.appendChild(a);
      return li;
   },
   
   _buttonIcon: function(d, a, isFirst, isMenu) {
         var span = d.createElement("span");
         if (isFirst)
            dojo.addClass(span, "lotusFirst");
         span.appendChild(a);
         return span;
      },
      
   _deferredName: function(el, name) {
      if (el.firstChild)
         el.removeChild(el.firstChild);
      el.appendChild(document.createTextNode(name));
   },
   
   _render: function(d, container, fWrap, item, actions, msgLoading, msgMoreActions, opt, app, data) {
      opt = opt || {};
      var useButton = opt.useButton;
      var useButtonIcon = opt.useButtonIcon;
      var visibleActions = opt.visibleActions || 3;
      var validActions = dojo.filter(actions, function(action) {return action.isValid(item,opt);});
   
      if (validActions.length == 0 && opt.msgEmpty) {
         var msgNode = d.createTextNode(opt.msgEmpty);
         var wrapper = fWrap(d, msgNode, !container.firstChild);
         container.appendChild(wrapper); 
         return;
      }
      
      this.replaceViewWithPreview(actions, validActions);
      
      validActions = lconn.share.util.ActionUtil.buildActions(validActions);
      
      var moreActions = [];
      var primaryActions = [];
      for (var i=0,a; a=validActions[i]; i++) {
         var f = a.isPrimary;
         if ((typeof f == "function") ? a.isPrimary() : !!f)
            primaryActions.push(a);
         else
            moreActions.push(a);
      };
      while (primaryActions.length < visibleActions && moreActions.length > 0)
         primaryActions.push(moreActions.shift());
      if (moreActions.length == 1)
         primaryActions.push(moreActions.shift());
      
      for (var i=0,action; action=primaryActions[i]; i++) {
            var actionOpt = {}; dojo.mixin(actionOpt, opt, app);
            if(data != undefined && data != null)
               dojo.mixin(item, {feedItems : data});
            var url = action.getUrlResource? action.getUrlResource(item, actionOpt): null;
            var name = action.getName(item, opt);
            if(useButtonIcon){
               var a = d.createElement("imag");
                a.href = url || "javascript:;";
                a.src = dojo.config.blankGif;
                app.generateActionIcon(a,name,64, d);
                dijit.setWaiRole(a, "button");
                lconn.share.util.ActionUtil.renderMenu(d, container, fWrap, action, a, opt, item);
                var handler = dojo.hitch(action, action.execute, item, actionOpt);
            }else if(useButton){
               var a = d.createElement("button");
                  a.className = "lotusBtn";
                  a.appendChild(d.createTextNode(name));
                  lconn.share.util.ActionUtil.renderMenu(d, container, fWrap, action, a, opt, item);
                  var handler = url? dojo.partial(function(url){ window.location = url;}, url): dojo.hitch(action, action.execute, item, actionOpt) 
            }else{
               var a = d.createElement("a");
                  a.href = url || "javascript:;";
                  a.appendChild(d.createTextNode(name));
                  lconn.share.util.ActionUtil.renderMenu(d, container, fWrap, action, a, opt, item);
                  var handler = dojo.hitch(action, action.execute, item, actionOpt);
                  dijit.setWaiRole(a, "button");
            }
            
            a.id = dijit.getUniqueId(action.getId());
            dojo.connect(a, "onclick", handler);
            /* Callers that return a deferred must set an errback handler to prevent "loading..." from displaying forever */
            if (name instanceof dojo.Deferred) {
               a.appendChild(d.createTextNode(msgLoading));
               var lssa = lconn.share.scenes.actions;
               name.addCallback(dojo.partial(lssa._deferredName, a));
            }
            a.title = action.getTooltip(item, actionOpt);
            if (action.addExtra)
               action.addExtra(item, a);
            if(!useButton){
               a = fWrap(d, a, !container.firstChild);
            }
         container.appendChild(a); 
      }
         
      if (moreActions.length > 0) {
         if(useButton){
            var a = d.createElement("button");
            a.className = "lotusBtn";
         }else{
            var a = d.createElement("a");
            a.href = "javascript:;";
            dijit.setWaiRole(a, "button");
         }
            a.id = dijit.getUniqueId("lconn_files_action_more");
            a.appendChild(d.createTextNode(msgMoreActions));
            a.title = msgMoreActions;
            dijit.setWaiState(a, "haspopup", true);
            
            a.appendChild(d.createTextNode(" "));
            
            var img = d.createElement("img");
               img.alt = "";
               img.className = "lotusArrow lotusDropDownSprite";
               img.src = dojo.config.blankGif;
            a.appendChild(img);
            
            var altSpan = d.createElement("span");
               altSpan.className = "lotusAltText";
               altSpan.appendChild(d.createTextNode("\u25BC"));
            a.appendChild(altSpan);
            if(!useButton)
               a = fWrap(d, a, !container.firstChild, true);
         container.appendChild(a);
   
         var menu = new dijit.Menu();
         
         dojo.addClass(menu.domNode, "lotusActionMenu");
         dojo.addClass(menu.domNode, "lotusPlain");
         
         for (var i=0,action; action=moreActions[i]; i++) {
            var actionOpt = {}; dojo.mixin(actionOpt, opt);
            if (action.hasChildren)
               lconn.share.util.ActionUtil.renderSubMenu(menu, action, item, actionOpt);
            else
               menu.addChild(new dijit.MenuItem({
                  label: action.getName(item, actionOpt),
                  id: dijit.getUniqueId(action.getId()),
                  onClick: dojo.hitch(action, action.execute, item, actionOpt)
               }));
         }
         lconn.core.MenuUtility.attachListeners(menu, useButton ? a : a.firstChild);
         var span = dojo.body().appendChild(d.createElement("span"));
            span.style.display = "none";
            span.setAttribute("widgetid", menu.id);
      }
   },
   
   _renderDropdownActions: function(d, container, item, actions, msgLoading, msgMoreActions, opt, app, data) {
      opt = opt || {};
      var useButton = opt.useButton;
      var reorgActions = lconn.share.util.ActionUtil.reOrgActions(actions, app, false, opt.addActionDivider, item, opt);
      var validActions = dojo.filter(reorgActions, function(action) {return action.isValid(item,opt);});
   
      if (validActions.length == 0 && opt.msgEmpty) {
         var msgNode = d.createTextNode(opt.msgEmpty);
         container.appendChild(msgNode); 
         return {};
      }
      
      this.replaceViewWithPreview(actions, validActions);
      
      validActions = lconn.share.util.ActionUtil.buildActions(validActions);
      
      var moreActions = [];
      for (var i=0,a; a=validActions[i]; i++) {
         moreActions.push(a);
      };
      
      if (moreActions.length > 0) {
         var actionElement = null;
         if(useButton){
            actionElement = d.createElement("button");
            actionElement.className = "lotusBtn";
         }
         else {
            actionElement = d.createElement("div");
            dojo.attr(actionElement, "tabindex", "0");
         }
            dijit.setWaiRole(actionElement, "button");
            dojo.attr(actionElement, "aria-haspopup", "true");
            actionElement.id = dijit.getUniqueId("lconn_files_action_title_more");
            if (opt.title) {
               dojo.attr(actionElement, "title", opt.title);
            }
            if (opt.innerElement) {
               actionElement.appendChild(opt.innerElement);
            }
            var img = d.createElement("img");
               img.alt = "";
               img.className = "lotusArrow lotusDropDownSprite";
               img.src = dojo.config.blankGif;
            actionElement.appendChild(img);
            
            var altSpan = d.createElement("span");
               altSpan.className = "lotusAltText bidiAware";
               altSpan.appendChild(d.createTextNode("\u25BC"));
            actionElement.appendChild(altSpan);
         container.appendChild(actionElement);
         lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(container);
   
         var menu = new dijit.Menu();
         
         dojo.addClass(menu.domNode, "lotusActionMenu");
         dojo.addClass(menu.domNode, "lotusPlain");
         dojo.addClass(menu.domNode, "lconnContentTitleDropdownBody");
         
         for (var i=0,action; action=moreActions[i]; i++) {
            var actionOpt = {}; dojo.mixin(actionOpt, opt);
            if (action.hasChildren)
               lconn.share.util.ActionUtil.renderSubMenu(menu, action, item, actionOpt);
            else
               menu.addChild(new dijit.MenuItem({
                  label: action.getName(item, actionOpt),
                  id: dijit.getUniqueId(action.getId()),
                  onClick: dojo.hitch(action, action.execute, item, actionOpt)
               }));
            if (action.addDivider)
               menu.addChild(new dijit.MenuSeparator({}));
         }
         var openMenuHandler = opt.openMenuHandler ? dojo.partial(opt.openMenuHandler, menu, actionElement) : null;
         lconn.core.MenuUtility.attachListeners(menu, actionElement, openMenuHandler, true);
         var span = dojo.body().appendChild(d.createElement("span"));
            span.style.display = "none";
            span.setAttribute("widgetid", menu.id);
            return {span: span, menu: menu};
      }
      
      return {};
   },
   
   replaceViewWithPreview: function(actions, validActions) {
      var viewAction = dojo.filter(actions, function(action) {return action.declaredClass === "com.ibm.viewer.lcext.CCDView"})[0];
      var previewAction = dojo.filter(actions, function(action) {return action.declaredClass === "lconn.files.action.PreviewFile"})[0];
      
      var validViewActionIndex = dojo.indexOf(validActions, viewAction);
      var validPreviewActionIndex = dojo.indexOf(validActions, previewAction);
      
      if (viewAction && previewAction && validViewActionIndex !== -1 && validPreviewActionIndex === -1) {
         validActions[validViewActionIndex] = previewAction;
      }
   },
   
   _previewGrid: function(item, actions, opt, app, data) {
         opt = opt || {};
         var useButton = opt.useButton;
         var useButtonIcon = opt.useButtonIcon;
         var visibleActions = opt.visibleActions || 3;
         var validActions = dojo.filter(actions, function(action) {return action.isValid(item,opt);});
      
         if (validActions.length == 0 && opt.msgEmpty) {
            return null;
         }
         var moreActions = [];
         var primaryActions = [];
         var removePreview = false;
         var viewAction = "";
         var replacePreviewWithView = false;
         for (var i=0,a; a=validActions[i]; i++) {
            var f = a.isPrimary;
            if ((typeof f == "function") ? a.isPrimary() : !!f) {
               primaryActions.push(a);
              if(replacePreviewWithView && a.declaredClass == "com.ibm.viewer.lcext.CCDView") {
                 removePreview = true;
                 viewAction = a;
              }
            }
            else
               moreActions.push(a);
         };
         while (primaryActions.length < visibleActions && moreActions.length > 0)
            primaryActions.push(moreActions.shift());
         if (moreActions.length == 1)
            primaryActions.push(moreActions.shift());
         var actionList = new Array();
         var fileviewerEnabled = lconn.core.config.features("fileviewer-detailspage");
         for (var i=0,action; action=primaryActions[i]; i++) {
               var actionOpt = {}; dojo.mixin(actionOpt, opt, app);
               dojo.mixin(item, {feedItems : data});
               var name = null;
               var actionDataArgs = {};
               if(action.declaredClass=="lconn.files.action.DownloadFile"){
                  name = "Download";
               }else if(action.declaredClass=="lconn.files.action.PreviewFile"){
                  if (fileviewerEnabled) {
                     name = "Summary";
                     actionDataArgs.hideButton = true;
                  } else {
                     name = "Preview";
                     if(removePreview) {
                     action = viewAction;
                     name = "View";
                     }
                  }
                }else if(!fileviewerEnabled && action.declaredClass=="lconn.files.action.JumpToDetailsPage"){
                  name = "Summary";
                }
               if(useButtonIcon && name) {
                  var actionData = new Object(actionDataArgs);
                actionData.name = name;
                var handler = dojo.hitch(action, action.execute, item, actionOpt);
                actionData.callback = handler;
                actionList.push(actionData);
               }
         }
          return actionList;
            
      }};
