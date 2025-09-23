/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.SearchBox');

dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.scenehelper");
dojo.require("dijit._Widget");
dojo.require("dijit.Menu");

dojo.require("lconn.core.typeahead.TypeAheadManager");
dojo.require("lconn.core.peopleFinder.directory.PeopleFinderService");
dojo.require("lconn.core.quickResults.QuickResultsService");

dojo.declare("lconn.share.widget.SearchBox", [dijit._Widget, lconn.core.typeahead.TypeAheadManager], {
      
   postMixInProperties: function() {
      this.inherited(arguments);
      
      this.scopes = this.scopes || [];
      if (this.app) {
         this.userStore = this.userStore || this.app.getUserTypeAheadStore();
         this._stringsUser = this._stringsUser || this.app.nls.USERSEARCH;
         this._strings =  this._strings || this.app.nls.SEARCH;
      }
      this.controls = [];
      
      var pfService = new lconn.core.peopleFinder.directory.PeopleFinderService();
      pfService.startup();
      var qrService = new lconn.core.quickResults.QuickResultsService();
      qrService.startup();
      this.TAservicesList = [qrService, pfService];
   },
   
   destroy: function() {
      lconn.share.util.misc.destroy(this.controls);
      this.controls = [];
      this.inherited(arguments);
   },
   
   buildRendering: function() {
      var app = this.app;
      var scopes = this.scopes;
      var validScopes = dojo.filter(scopes, function(s) { return s.isValid(app, app.scene); });
   
      var searchBox = this;
      var d = document;
      var el = this.domNode = this.srcNodeRef;
      if (this.baseClass) dojo.addClass(el, this.baseClass);
      
      var form = this.TAdropdownAnchor = el;
         form.className = "lotusSearch";
         dijit.setWaiRole(form, "search");
         dojo.connect(form, "onsubmit", this, "search");
         
         var scopeCell, inputCell, buttonCell;
         
         // Build overall search bar layout
         var table = d.createElement("table");
            dijit.setWaiRole(table, "presentation");
            table.className = "lotusLayout";
            dijit.setWaiRole(table, "presentation");
            table.cellSpacing = "0";

            var tbody = d.createElement("tbody");
               var tr = d.createElement("tr");
                  var td = d.createElement("td");
                     // Put the search scope link inside a nested DIV for OneUI compatibility
                     scopeCell = d.createElement("div");
                        // TODO: recompute this if scope validity changes
                        scopeCell.style.display = (validScopes.length > 1) ? "":"none";
                     td.appendChild(scopeCell);
                  tr.appendChild(td);
                  var td = inputCell = d.createElement("td");
                  tr.appendChild(td);
                  var td = buttonCell = this.buttonCell = d.createElement("td");
                  tr.appendChild(td);
               tbody.appendChild(tr);
            table.appendChild(tbody);
         form.appendChild(table);

         // Set up scope link
         var scopeLink = this.scopeLink = d.createElement("a");
            scopeLink.className = "lotusScope";
            scopeLink.title = this._strings.REFINE_OPTIONS;
            scopeLink.href="javascript:;";
            
            dijit.setWaiRole(scopeLink, "button");
            dijit.setWaiState(scopeLink, "haspopup", true);
            
            var scopeIcon = this.scopeIcon = d.createElement("img");
               scopeIcon.className = "lconnSprite";
               scopeIcon.alt = "";
               scopeIcon.src = dojo.config.blankGif;
            scopeLink.appendChild(scopeIcon);

            var scopeLabel = this.scopeLabel = this.TAscopeLabelNode = d.createElement("span");
            scopeLink.appendChild(scopeLabel);
            
            var dropDownAlt = d.createElement("span");
               dropDownAlt.className = "lotusAltText";
               dropDownAlt.appendChild(d.createTextNode("\u25BC"));
            scopeLink.appendChild(dropDownAlt);

         scopeCell.appendChild(scopeLink);
         
         // Set up scope drop down menu
         var dropDown = new dijit.Menu();

         var span = el.appendChild(d.createElement("span"));
            span.style.display = "none";
            span.setAttribute("widgetid", dropDown.id);
         
         // Add OneUI styles to the dropdown menu
         dojo.addClass(dropDown.domNode, "lotusNavMenu lconnSearchScope");
         
         // Add a colgroup to tighten up the icon column
         var table = dropDown.domNode;
         var colgroup = d.createElement("colgroup");
            var col = d.createElement("col");
            colgroup.appendChild(col);
            var col = d.createElement("col");
            colgroup.appendChild(col);
         table.insertBefore(colgroup, table.firstChild);

         lconn.core.MenuUtility.attachListeners(dropDown, scopeLink, function() {

            // Rebuild the menu for the current scene
            searchBox.buildPopup(dropDown);
            
            // Restore the menu to its original width if we know it
            if (dropDown.domNode.originalWidth)
               dojo.marginBox(dropDown.domNode, {w: dropDown.domNode.originalWidth});

            lconn.core.MenuUtility.openAround(dropDown, scopeLink);
            
            // Remember the original width of the menu so we can restore it if we widen it
            if (!dropDown.domNode.originalWidth)
               dropDown.domNode.originalWidth = dropDown.domNode.offsetWidth;

            // Widen to match the drop down if necessary
            var originalWidth = dropDown.domNode.offsetWidth;
            var minWidth = scopeLink.offsetWidth;
            if(minWidth > originalWidth) {
               // If we're in RTL mode, we might need to shift the parent left
               var containerNode = null;
               if(!dojo._isBodyLtr())
                  containerNode = dropDown.domNode.parentNode;

               dojo.marginBox(dropDown.domNode, {w: minWidth});

               if(containerNode)
                  containerNode.style.left = (containerNode.offsetLeft + originalWidth - minWidth) + "px";
            }
         });

         var hintText = "";

         if (dojo.some(scopes, function(a) {return a.typeahead == "people";})) {
            var input = d.createElement("INPUT");
               input.style.display = "none";
               input.size = "30";
            inputCell.appendChild(input);
            var userSearchAdapter = this.userSearchAdapter = app.getUserSearchAdapter();
            var opt = {
               _strings: this._stringsUser,
               noUpdateOnSelect: this.noTypeaheadUpdateOnSelect,
               id: this.id+"_people",
               name: this.id+"_people",
               orient: dojo._isBodyLtr() ? {'BR':'TR', 'TR':'BR'} : {'BL':'TL', 'TL':'BL'},
               store: this.userStore,
               hintText: hintText
            };
            var combo = this.people = userSearchAdapter.createTypeAhead(input, opt);
            combo.textbox.title = hintText || this._strings.SEARCH_ALT;
            dojo.addClass(combo.textbox, 'bidiAware');
                 
            this.userSearchAdapter.connectOnSelect(combo, this, dojo.partial(this.selectPerson, combo));
         }
         
         if (dojo.some(scopes, function(a) {return !a.typeahead;})) {
            var input = this.simpleInputNode = this.TAtextField = d.createElement("INPUT");
               input.className = "lotusText";
               input.style.display = "none";
               input.size = "30";
               input.id = this.id + "_simpleInput";
               input.value = hintText;
               input.title = hintText || this._strings.SEARCH_ALT;
               dojo.addClass(input, 'bidiAware');
            inputCell.appendChild(input);
            dojo.connect(input, "onfocus", input, this.onTextFocus);
            dojo.connect(input, "onblur", input, this.onTextBlur);
         }
         
         lconn.share.scenehelper.createSearchButton(d, buttonCell, this.id+"_submit", this._strings.SEARCH_ALT);
   },
   
   postCreate: function() {
      this.inherited(arguments);
      this.changeScope(this.defaultSearchScope);
   },
   
   buildPopup: function(dropDown) {
      var app = this.app;
      var searchBox = this;
      var scopes = this.scopes;
      var controls = this.controls;

      for (var i=0; i < scopes.length; i++) {
         var scope = scopes[i];
         var control = controls[i];

         if (!scope.isValid(app, app.scene)) {
            if (control) {
               //console.log(scope.id + " is invalid and has an existing control... removing...");
               dropDown.removeChild(control);
               lconn.share.util.misc.destroy(control);
               delete controls[i];
            }
            continue;
         }

         // Build the control if it doesn't exist or might be dynamic
         if (!control || scope.getLabel || scope.getTitle) {
            if (control)
               lconn.share.util.misc.destroy(control);
            
            if (scope.separator) {
               //console.log("Building separator control");
               control = controls[i] = new dijit.MenuSeparator();
            }
            else {
               var label = scope.getLabel ? scope.getLabel(app, app.scene) : scope.label;
               var title = scope.getTitle ? scope.getTitle(app, app.scene) : scope.title;
               
               //console.log("Building item for " + scope.id);
               control = controls[i] = new dijit.MenuItem({
                  baseClass: dojo._isBodyLtr() ? 'qkrSearchScope' : 'dijitMenuItemRtl qkrSearchScope',
                  iconClass: scope.iconClass,
                  label: label || "",
                  title: title || "",
                  onClick: dojo.hitch(searchBox, searchBox.changeScope, scope)
               });
               if(scope.onClick)
                  dojo.connect(control, "onClick", null, dojo.hitch(scope, scope.onClick, searchBox.app));
            }
         }

         dropDown.addChild(control);
      }
   },
   
   onTextFocus: function() {
      if (!this.hasInput) {
         this.hasInput = true;
         this.style.color = "#000";
         this.value = "";
      }
   },
   
   onTextBlur: function() {
      if (this.value == "") {
         this.hasInput = false;
         this.value = this.defaultText || "";
      }
   },
   
   getCurrentScope: function() {
      return this.currentScope;
   },
   
   /**
    * If scope is a string, check for a scope with that id.  If scope is null or is not found, use the first scope.
    */
   changeScope: function(scope) {
      var app = this.app;
      
      if (typeof scope == "string")
         scope = dojo.filter(this.scopes, function(s) {return s.id == scope;})[0];
      if (!scope || !scope.isValid(app, app.scene))
         scope = this.scopes[0];
      
      var i;
      var d = document;
      var ip = this.people;
      var is = this.simpleInputNode;
      var buttonCell = this.buttonCell;
      var isCloudMode = !!dojo.getObject("lconn.files.config.isCloudMode");

      this.currentScope = scope;

      lconn.share.util.html.removeChildren(this.scopeLabel);
      var label = scope.getLabel ? scope.getLabel(app, app.scene) : scope.label;
      this.scopeLabel.appendChild(d.createTextNode(label));

      this.scopeIcon.className = "lotusIcon " + scope.iconClass;
      
      if (scope.typeahead == "people") {
    	 this.TAdisable = true;
         ip.domNode.style.display = "";
         ip.hintText = scope.hintText || "";
         if (is)
            is.style.display = "none";
         if(isCloudMode && buttonCell)
            buttonCell.style.display = "none";
         i = this.inputNode = ip.textbox;

         ip.updateHintText(scope.hintText || "");
      }
      else {
    	 this.TAdisable = false;
         is.style.display = "";
         if(isCloudMode && buttonCell)
            buttonCell.style.display = "";
         if (ip)
            ip.domNode.style.display = "none";
         i = this.inputNode = is;
         
         i.defaultText = scope.hintText || "";
         i.title = scope.hintText || this._strings.SEARCH_ALT;
         if (!i.hasInput) {
            i.value = i.defaultText;
         }
      }
      
      this.TAupdateCurrentScope();
   },
   
   selectPerson: function(typeAhead) {
      var scope = this.getCurrentScope();
      var newArguments = dojo._toArray(arguments);
      newArguments.splice(0,1);
      var item = this.userSearchAdapter.getSelected(typeAhead, newArguments);
      
      if (scope.onSelect)
         scope.onSelect.apply(scope,[item]);
   },
   
   search: function(e) {
      if (e) dojo.stopEvent(e);
      var input = this.inputNode;
      var value = input.value;
      if (!input.hasInput || lconn.share.util.text.trim(value).length == 0)
         return;
      var scope = this.getCurrentScope();
      if (scope.onSearch)
         scope.onSearch(this.inputNode.value);
   },
   
   setValue: function(text){
      if(this.simpleInputNode) 
         this.onTextFocus.apply(this.simpleInputNode, []);
      this.inputNode.value = text;
   },
   
   reset: function() {
      
   },
   
   // override the parent method to manage placeholder
   TAisPlaceholderActive: function() {
	   return !this.TAtextField.hasInput;
   }
});
