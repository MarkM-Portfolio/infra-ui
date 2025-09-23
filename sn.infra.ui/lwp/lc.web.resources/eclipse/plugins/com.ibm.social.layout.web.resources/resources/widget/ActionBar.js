/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.widget.ActionBar");

dojo.require("dijit._Widget");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuSeparator");
dojo.require("dijit.PopupMenuItem");
dojo.require("com.ibm.oneui.util.openAround");

dojo.declare("com.ibm.social.layout.widget.ActionBar", [dijit._Widget], {

   /*
   TODO: ActionBar
   nls
   global enable/disable
   grouping actions
   link-style rendering
   collapse inside "more actions" drop-downs
   role="toolbar" aria stuff
   prevent double-clicks
   show progress while loading deferred (dojo.Deferred from execute()?)
   setActions() tear-down and rebuild
   removeAction()?
   focus management (especially when hiding something that is focused)
   handle falsy selections like "false", "", 0, etc... wrap in array?
   */

   postMixInProperties: function() {
      this.actions = this.actions || [];
      this.actionElements = this.actionElements || [];
      this.selection = this.selection || [];
      this.context = this.context || {};
   },

   selectionChanged: function(selection, context) {
      this.selection = selection || [];
      this.context = context || {};
      var i;
      for (i=0; i < this.actionElements.length; i++) {
         this.updateActionState(this.actionElements[i]);
      }
   },

   _onKeyUp: function(event) {
      if (event && event.keyCode == dojo.keys.SPACE) {
         this._onClick(event);
      }
   },
   _onClick: function(event) {
      var target = event.target;
      while (target && target != this.domNode) {
         if (this.isActionElement(target)) {
            dojo.stopEvent(event);
            this.executeActionElement(target);
            break;
         }
         else {
            target = target.parentNode;
         }
      }
   },

   buildRendering: function() {
      this.inherited(arguments);

      // if programatically constructed, render buttons
      var i;
      this.domNode.style.display = "none";
      for (i=0; i < this.actions.length; i++) {
         this.domNode.appendChild(this.renderAction(this.actions[i]));
      }

      this.connect(this.domNode, "onclick", "_onClick");
      this.connect(this.domNode, "onkeyup", "_onKeyUp");
   },

   destroy: function() {
      if (this.actionElements) {
         // destroy the attached menu if any
         for (var ind = 0; ind < this.actionElements.length; ind++) {
            if (this.actionElements[ind] && typeof this.actionElements[ind].menu !== "undefined" && this.actionElements[ind].menu) {
               this.actionElements[ind].menu.destroy();
            }
         }
      }
      delete this.actionElements;
      
      this.inherited(arguments);
   },

   addAll: function(actions, addToBeginning) {
      dojo.forEach(actions, function(item) {this.addAction(item, addToBeginning);}, this);
   },

   addAction: function(action, addToBeginning) {
      var actions = this.actions;
      var domNode = this.domNode;
      var element = this.renderAction(action);
      if (addToBeginning) {
         actions.unshift(action);
         dojo.place(element, domNode, "first");
      }
      else {
         actions.push(action);
         dojo.place(element, domNode);
      }
   },
   renderAction: function(action) {
      var d = document;
         var el = d.createElement("button");
            el.className = "lotusBtn";
            dijit.setWaiRole(el, "button");
            el.id = dijit.getUniqueId(action.getId());
            if (action.canHaveChildren && action.canHaveChildren()) {
               dijit.setWaiState(el, "hasPopup", true);
               el.appendChild(d.createTextNode(" "));
               var img = d.createElement("img");
                  img.alt = "";
                  img.src = this._blankGif;
                  img.className = "lotusArrow lotusDropDownSprite";
               el.appendChild(img);
            }
            if ( ( action.canHaveChildren && action.canHaveChildren() )
                 || dojo.isFunction(action.getImgAltText) ) {
               var span = d.createElement("span");
                  span.className = "lotusAltText";
                  var imgAltText = "\u25BC";
                  if ( dojo.isFunction(action.getImgAltText) ) {
                     imgAltText = action.getImgAltText();
                  }
                  span.appendChild(d.createTextNode(imgAltText));
               el.appendChild(span);
            }
         var jawsReadSpan = d.createElement("span");
         jawsReadSpan.id = el.id + "_JawsReadSpan";
         jawsReadSpan.className = "lotusAccess";
         jawsReadSpan.setAttribute("role", "status");
         el.appendChild(jawsReadSpan);
         
         //added by vinayak for Files New UI
         if (window.ui && window.ui._check_ui_enabled() && action.canHaveChildren && action.canHaveChildren()){
        	 var divele=d.createElement("div")
        	 divele.className = "lotusBtnDivFiles";
        	 
        	 var ul = d.createElement("ul");
        	 ul.setAttribute("role", "listbox");
        	 ul.className = "bx--dropdown icCatalogFileCreate";
        	 
        	 var li_2 = d.createElement("li");
        	 li_2.className ="li--dropdown-image";
             
             var el3 = d.createElement("button");
             el3.className = "lotusBtn";
             dijit.setWaiRole(el3, "button");
             el3.id = dijit.getUniqueId(action.getId());
             if (action.canHaveChildren && action.canHaveChildren()) {
                dijit.setWaiState(el3, "hasPopup", true);
                el3.appendChild(d.createTextNode(" "));
                var img = d.createElement("img");
                   img.alt = "";
                   img.src = this._blankGif;
                   img.className = "lotusArrow lotusDropDownSprite";
                el3.appendChild(img);
             }
             
             li_2.appendChild (el3);
        	 ul.appendChild(li_2);
             divele.appendChild (ul);
             this.registerActionElement(ul, action);
             return divele;
         }else{
        	 this.registerActionElement(el, action);
             return el;
         }   
         
   },

   isActionElement: function(element) {
      return element.action;
   },
   registerActionElement: function(element, action) {
      element.action = action;
      this.updateActionState(element);
      this.actionElements.push(element);
   },
   executeActionElement: function(element) {
      if (element.loading) {
         return;
      }

      var actionBar = this;
      var action = element.action;
      var state = element.state;

      // Only proceed if we're visible and enabled
      if (state && (!state.enabled || !state.visible)) {
         return;
      }

      if (action.isLoaded()) {
         if (state && state.enabled && state.visible) {
            actionBar.executeAction(action, element);
         }
         return;
      }
      else {
         // TODO: Show loading indicator while waiting to load
         element.loading = true;
         action.load().addBoth(function(){
            // TODO: Hide loading indicator
            element.loading = false;
         }).addCallback(function() {
            var state = actionBar.updateActionState(element);
            if (state && state.enabled && state.visible) {
               actionBar.executeAction(action, element);
            }
            else {
               alert("This action is not available");
            }
         }).addErrback(function(error){
            alert(error);
         });
      }
   },
   executeAction: function(action, element) {
      try {
         var dfd = action.execute(this.selection, this.context);
         if (dfd && dfd.addCallback && dfd.addErrback) {
            dfd.addCallback(this, "onActionComplete", action, element).addErrback(function(error){
               alert("A deferred error occurred while running the action");
               console.error(error);
            });
         }
      }
      catch(e) {
         alert("An error occurred while running the action");
         console.error(e);
      }
   },
   updateActionState: function(element) {
      if (!element.nodeType) {
         return element.state;
      }

      var oldState = element.state || {};
      var newState = dojo.clone(oldState);
      var action = element.action;
      action.selectionChanged(newState, this.selection, this.context);
      var state = element.state = newState;

      var menu = element.menu;
      if (menu) {
         console.log('menu purged');
         menu.destroyRecursive();
         element.menu = null;
      }

      if (newState.name != oldState.name) {
         var d = document;
         var nameNode = element.actionNameNode;
         if (!nameNode) {
            nameNode = element.firstChild;
            if (!nameNode || nameNode.nodeType != 3) {
               nameNode = element.insertBefore(document.createTextNode(""), element.firstChild);
            }
         }
         var newNameNode = d.createTextNode(state.name || "");
         nameNode.parentNode.replaceChild(newNameNode, nameNode);
         element.actionNameNode = newNameNode;
      }

      if (newState.tooltip != oldState.tooltip && state.tooltip)
         element.title = state.tooltip;

      if (newState.visible != oldState.visible) {
         if (state.visible == false) {
            element.style.display = "none";
            dijit.setWaiState(element, "hidden", true);
         }
         else {
            element.style.display = "";
            dijit.removeWaiState(element, "hidden");
            this.domNode.style.display = "";
         }
      }

      if (newState.enabled != oldState.enabled) {
         // update of aria state needs to be delayed to assure that JAWS can correctly react, 
         // if the action was hidden before.
         var self = this;
         setTimeout( function(){ self._updateAriaState(element, state.enabled); }, 100 );
      }

      return newState;
   },

   _updateAriaState: function(element, isEnabled) {	   
      var jawsReadSpanNode = dojo.byId(element.id + "_JawsReadSpan");
      if (isEnabled) {
         dojo.removeClass(element, "lotusBtnDisabled");
         if(jawsReadSpanNode) jawsReadSpanNode.innerHTML = element.action.getEnableActionString() || "";
      }
      else {
         dojo.addClass(element, "lotusBtnDisabled");
         if(jawsReadSpanNode) jawsReadSpanNode.innerHTML = element.action.getDisableActionString() || "";
      }
      dijit.setWaiState(element, "disabled", !isEnabled);
   },

   onActionComplete: function(action, element, result) {
      if (result instanceof dojo.Deferred) {
         result.addCallback(this, "onActionComplete", action, element);
      }
      else if (action.canHaveChildren()) {
         this.openMenu(action, element, result);
      }
      else if (result !== undefined) {
         console.log("Result:", result);
      }
   },

   openMenu: function(action, element, actions) {
	   //added by vinayak to swap the sequence of new button dropdown options for new UI.
	   if(window.ui && window.ui._check_ui_enabled() && actions!=undefined){
		   if(actions.length > 1){
			   var swapvar=actions[0];
			   actions[0]=actions[1];
			   actions[1]=swapvar;
		   }
		  
	   }
	   
      var menu = element.menu;
      if (!menu) {
         var menu = element.menu = new dijit.Menu({}, dojo.create("span"));
         dojo.addClass(menu.domNode, "lotusActionMenu lotusPlain");
         if (this.menuClass)
            dojo.addClass(menu.domNode, this.menuClass);
         //var span = dojo.create("span", {widgetid: menu.id, style: {display: "none"}}, this.domNode);

         var i, child, children = 0;
         for (i=0,action; action=actions[i]; i++) {
            if (!action.canHaveChildren()) {
               var newState = {};
               action.selectionChanged(newState, this.selection, this.context);
               if (newState.visible) {
                  child = new dijit.MenuItem({
                     label: newState.name,
                     id: dijit.getUniqueId(action.getId()),
                     disabled: !newState.enabled,
                     state: newState,
                     action: action
                  });
                  child.onClick = dojo.hitch(this, "executeActionElement", child);
                  menu.addChild(child);
                  if (action.addDivider) {//add divider line
                     menu.addChild(new dijit.MenuSeparator({}));
                  }
                  this.registerActionElement(child, action);
                  children++;
               }
            } else {
               if(dojo.config.isDebug) {
                  console.debug("Sub menus not yet supported");
               }
            }
            /*else {
               child = new dijit.PopupMenuItem({
                  label: newState.name,
                  title: newState.tooltip,
                  state: newState,
                  popup: new dijit.Menu({})
               });
               child.popup.addChild(new dijit.MenuItem({label: "Empty"}));
            }
            menu.addChild(child);
            this.registerActionElement(child, action);*/
         }
         if (children == 0) {
            menu.addChild(new dijit.MenuItem({
               label: "No actions available",
               disabled: true
            }));
         }
      }
      com.ibm.oneui.util.openAround(menu, element);
   },

   /**
    * Show actionBar button container when has visible items and visible buttons
    */
   setActionBarButtonContainerVisibility: function(hasVisibleItems){
      this.domNode.style.display = "none";
      if (this.actionElements) {
         for (var ind = 0; ind < this.actionElements.length; ind++) {
            if (hasVisibleItems && this.actionElements[ind].style.display == "") {
               this.domNode.style.display = "";
            }
         }
      }
   }
});
