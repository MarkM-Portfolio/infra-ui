/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

(function(){
   dojo.mixin(dojo.provide("lconn.share.util.ActionUtil"), {
      
      buildActions: function(actions) {
         //get Group actions
         var groupActions = dojo.filter(actions, function(action) {return action.hasChildren;});
         for(var i=0;i<groupActions.length;i++){
            delete groupActions[i].actions; 
            groupActions[i].actions = [];
         }
         
         //Remove Group Action
         actions = dojo.filter(actions, function(action) {return !action.hasChildren;});
         
         for(var i=0; i<groupActions.length;i++){
            var length = actions.length;
            var aIndex = [];
            for(var j=0;j<length; j++){
               if(actions[j].parentId && (actions[j].parentId.toLowerCase() == groupActions[i].getId())){
                  groupActions[i].actions.push(actions[j]);
                  aIndex.push(j);
               }
            }
            var f = aIndex[0];
            var l = aIndex.length;

            if(l > 1){
               actions.splice(f, 0, groupActions[i]);
               actions = dojo.filter(actions, function(action) {return !action.parentId ||(action.parentId && action.parentId.toLowerCase() != groupActions[i].getId());});
               if (groupActions[i].actions[0].isPrimary)
                  groupActions[i].isPrimary = true;
            }
         }
         return actions;
      },
      
      renderMenu: function(d, container, fWrap, action, node, opt, item) {
         if (!action.hasChildren)
            return;
         node.id = dijit.getUniqueId(action.getId());
         node.title = action.getTooltip();
         dijit.setWaiState(node, "haspopup", true);
         
         node.appendChild(d.createTextNode(" "));
         
         var img = d.createElement("img");
            img.alt = "";
            img.className = "lotusArrow lotusDropDownSprite";
            img.src = dojo.config.blankGif;
         node.appendChild(img);
         
         var altSpan = d.createElement("span");
            altSpan.className = "lotusAltText";
            altSpan.appendChild(d.createTextNode("\u25BC"));
         node.appendChild(altSpan);
         if(!opt.useButton)
            node = fWrap(d, node, !container.firstChild, true);
         var menu = new dijit.Menu();
         
         dojo.addClass(menu.domNode, "lotusActionMenu");
         dojo.addClass(menu.domNode, "lotusPlain");
         
         for (var i=0,a; a=action.actions[i]; i++) {
            var actionOpt = {}; dojo.mixin(actionOpt, opt);
            menu.addChild(new dijit.MenuItem({
               label: a.getName(item, actionOpt),
               title: a.getTooltip(item, actionOpt),
               id: dijit.getUniqueId(a.getId()),
               onClick: dojo.hitch(a, a.execute, item, actionOpt)
            }));
         }
         lconn.core.MenuUtility.attachListeners(menu, opt.useButton ? node : node.firstChild);
         var span = dojo.body().appendChild(d.createElement("span"));
            span.style.display = "none";
            span.setAttribute("widgetid", menu.id);
      },
      
      renderSubMenu: function(menu, action, item, actionOpt) {
         var subMenu = new dijit.Menu();
         var subAction = action.actions; 
         for(var j=0,act; act = subAction[j];j++) {
            var isDisabledAction = act.isDisabled == false || (typeof act.isDisabled == "function" ? act.isDisabled(item, actionOpt): false);
            subMenu.addChild(new dijit.MenuItem({
               disabled: isDisabledAction,
               label: act.getName(item, actionOpt),
               title: act.getTooltip(item, actionOpt),
               id: dijit.getUniqueId(act.getId()),
               onClick: dojo.hitch(act, act.execute, item, actionOpt)
            }));
         }
         dojo.addClass(subMenu.domNode, "lotusActionMenu");
         dojo.addClass(subMenu.domNode, "lotusPlain");
         menu.addChild(new dijit.PopupMenuItem({
            label: action.getName(),
            title: action.getTooltip(),
            popup:subMenu
        }));
      },

      // reOrg actions
      reOrgActions: function( actions, app, isCreateItem, addDivider, item, opt ) {
         var isArray = false;
         for (var i=0;i<actions.length;i++) {
            if (actions[i] instanceof Array) {
               isArray = true;
               break;
            }
         }
         // deal with the action that is invisible
         var impactions=new Array();
         if ( isArray ) {
            if ( isCreateItem ) {
               for(var i=0;i<actions.length;i++){
                  for (var j=0;j<actions[i].length;j++) {
                     var newState = {};
                     actions[i][j].selectionChanged(newState, [app.authenticatedUser], {});
                     if(!newState.visible){
                        actions[i][j] = undefined;
                     }
                  } 
               }
            }
            else {
               for (var i=0;i<actions.length;i++) {
                  for (var j=0;j<actions[i].length;j++){
                     if (!actions[i][j].isValid(item,opt)) {
                        actions[i][j] = undefined;
                     }
                  } 
               }
            }
          
            //filter action  and push 
            for(var i=0;i<actions.length;i++){
               actions[i] = dojo.filter(actions[i], function(action) {return action!=undefined;});
               for (var j=0;j<actions[i].length;j++){
                  if ( addDivider &&
                       ( j == (actions[i].length-1) ) && ( i != actions.length-1) ) {
                     actions[i][j].addDivider = true;
                  }
                  impactions.push(actions[i][j]);
               } 
             }
            return impactions;
         }
         else {
            if ( !isCreateItem ) {
               actions = dojo.filter(actions, function(action) {return action.isValid(item,opt);});
            }
            return actions;
         }
      },

      //reOrg actions with divider
      reOrgActionsWithDivider: function(actions, app, isCreateItem, item, opt){
         return lconn.share.util.ActionUtil.reOrgActions( actions, app, isCreateItem, true, item, opt );
      }
   });
})();
