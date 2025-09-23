/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2009, 2020                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

dojo.provide("lconn.share.widget.FileRendererMenu");
dojo.require("lconn.share.widget.FileRendererCore");
dojo.require("lconn.core.MenuUtility");
dojo.require("dijit.MenuItem");
dojo.require("dijit.PopupMenuItem");
dojo.require("lconn.share.util.ActionUtil");
dojo.require("lconn.share.scenes.actions");
dojo.declare("lconn.share.widget.FileRendererMenu", [lconn.share.widget.FileRendererCore], {

   actionOpts: {},

   replaceItem: function() {
      var item = this.inherited(arguments);
      item._menu = null;
      return item;
   },

   toggleByElementSummary: function(stream, e) {
      // Ignore right-clicks
      if (!e || e.button > (dojo.isIE ? 1:0))
         return;

      var t = e.target;
      var testNodes = {td:1,th:1};
      if (t && t.nodeName) {
         if (dojo.indexOf(["h4","td","th"],t.nodeName.toLowerCase()) != -1) {
            while (!testNodes[t.nodeName.toLowerCase()])
               t = t.parentNode;
            if (t.style.cursor == "pointer") {
               var tr = t.parentNode;
               var i = dojo.indexOf(tr.parentNode.childNodes, tr);
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

   mousedownMenu: function(stream, position, e) {
      if (!stream || !stream.data || !stream.data.itemByPosition)
         return;

      var item = stream.data.itemByPosition[position];
      if (item && item._menu)
         item._menu.wasShowing = item._menu.isShowingNow;
   },

   showMenu: function(stream, position, e) {
      if (e) dojo.stopEvent(e);
      var item = stream.data.itemByPosition[position];
      if (item._menuLoading)
         return;
      dijit.focus(item.elementMenu);
      if (!item._menu || item._menu.error) {
         item._menuLoading = true;
         var f = dojo.hitch(this, this.completeMenuLoad, stream, stream.data, item, position);
         this.net.getXml({
            url: item._isEcmFile ? this.routes.getProxiedUrl(this.getUrlExpand(item), {commonProxy: true}) : this.getUrlExpand(item),
            handle: f,
            timeout: stream.timeoutRetrieve*1000,
            auth: {
               preventReload: true,
               onLogin: dojo.hitch(this, this.showMenu, stream, position, null)
            }
         });
         return;
      }
      lconn.core.MenuUtility.openAround(item._menu, item.elementMenu, {orient: (dojo._isBodyLtr() ? {'BR':'TR', 'TR':'BR'} : {'BL':'TL', 'TL':'BL'})});
   },

   // Return true if object type is file.
   isFile: function(response) {
      var retval = false;
      for (var ii = 0; ii < response.all.length; ii++) {
         if ((response.all[ii].nodeName.indexOf("objectTypeName") > -1) && (response.all[ii].innerHTML == "snx:file" || response.all[ii].textContent == "snx:file"  || response.all[ii].innerHTML == "ibmdocs:file" || response.all[ii].textContent == "ibmdocs:file")) {
            retval = true;
         }
      }
      return retval;
   },

   completeMenuLoad: function(stream, data, item, position, response, ioArgs) {
      var actions;
      var d = document;
      item._menuLoading = false;

      var menu = new dijit.Menu();
      dojo.addClass(menu.domNode, "lotusActionMenu");
      dojo.addClass(menu.domNode, "lotusPlain");
      if (response instanceof Error) {
         menu.error = true;
         if(response.code == "ItemNotFound" || response.code == "AccessDenied")
            menu.addChild(new dijit.MenuItem({label: stream._strings.EMPTY_MENU}));
         else
            menu.addChild(new dijit.MenuItem({label: stream._strings.ERROR_MENU}));
      }
      else {
         menu.error = false;
         // Replace item with newly constructed item
         item = this.replaceItem(data, item, response.documentElement);
         var opt = this.actionOpts;

         // Use the File or Collection action menu as appropriate
         if (this.isFile(response)) {
            actions = this.getActions(item);
         }
         else {
            actions = this.scene.collectionActions;
         }
         var validActions = dojo.filter(actions, function(action) {return action.isValid(item,opt);});
         lconn.share.scenes.actions.replaceViewWithPreview(actions, validActions);
         validActions = lconn.share.util.ActionUtil.buildActions(validActions);
         for (var i=0; i < validActions.length; i++) {
            var action = validActions[i];
            var actionOpt = {}; dojo.mixin(actionOpt, opt, {noLink: true});
            var isDisabledAction = action.isDisabled == false || (typeof action.isDisabled == "function" ? action.isDisabled(item, actionOpt):false);
            if (action.declaredClass == "lconn.files.action.PreviewFile"){
               var app = {};
               var feedItems = {};
               dojo.mixin(item, {feedItems : data});
               dojo.mixin(actionOpt, {app : this.app});
            }
            if (action.hasChildren)
               lconn.share.util.ActionUtil.renderSubMenu(menu, action, item, actionOpt);
            else {
               var menuItem = new dijit.MenuItem({
                  disabled: isDisabledAction,
                  label: action.getName(item, actionOpt),
                  title: action.getTooltip(item, actionOpt),
                  onClick: dojo.hitch(action, action.execute, item, actionOpt)
               });
               if (action.addExtra){
                  action.addExtra(item, menuItem.containerNode, actionOpt);
               }
               menu.addChild(menuItem);
            }
         }
         if (validActions.length == 0)
            menu.addChild(new dijit.MenuItem({iconClass: 'lotusHidden', label: stream._strings.EMPTY_MENU}));
      }
      item._menu = menu;
      dojo.connect(menu, "onOpen", item.elementMenu, function() {
         dojo.addClass(this, "hover");
      });
      dojo.connect(menu, "_onBlur", item.elementMenu, function() {
         dojo.removeClass(this, "hover");
      });
      var span = item.element.firstChild.appendChild(d.createElement("span"));
         span.style.display = "none";
         span.setAttribute("widgetid", menu.id);
      lconn.core.MenuUtility.openAround(menu, item.elementMenu, {orient: (dojo._isBodyLtr() ? {'BR':'TR', 'TR':'BR'} : {'BL':'TL', 'TL':'BL'})});
   }
});
