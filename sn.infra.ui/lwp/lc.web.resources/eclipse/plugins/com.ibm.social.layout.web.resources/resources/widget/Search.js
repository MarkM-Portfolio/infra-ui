/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("com.ibm.social.layout.widget.Search");
   
   dojo.require("com.ibm.oneui.controls.AutocompleteInput");
   dojo.require("com.ibm.oneui.controls.AutocompleteMenu");
   
   dojo.requireLocalization("com.ibm.social.layout.widget", "Search");

   // TODO: This really, really, needs to be something more generic and more reusable.  Dojo doesn't
   // really provide an easy templating mechanism w/ HTML escaping.
   function safeReplace(tmpl, dict){
     // convert dict to a function, if needed
     var fn = dojo.isFunction(dict) ? dict : function(_, name){
       return dojo.getObject(name, false, dict);
     };
     // perform the substitution
     return dojo.replace(tmpl, function(_, name){
      var value;
       if (name.charAt(0) == '!'){
         // no escaping
         value = fn(_, name.slice(1));
       }
       else {
          // escape
          value = fn(_, name).
            replace(/&/g, "&amp;").
            replace(/</g, "&lt;").
            replace(/>/g, "&gt;").
            replace(/"/g, "&quot;");
       }
       return dojo.replace(value, fn);
     });
   }

   dojo.declare("com.ibm.social.layout.widget.EmptyStore", null, {
      fetch: function(request) {
         request.abort = function() {};
         var scope = request.scope || dojo.global();
         request.onBegin.call(scope, 0, request); 
         request.onComplete.call(scope, [], request); 
         return request;
      }
   });
   
   dojo.declare("com.ibm.social.layout.widget.Search", com.ibm.oneui.controls.AutocompleteInput, {
      // scopes: array of {label: string}
      scopes: null,
      // suggest: object or function returning object with members: {
      //    store: the data store for suggestions
      //    messages: any search specific messages
      //    renderer: items to mixin to the renderer
      suggest: null,
      
      allowSubmit: false,
      
      postMixInProperties: function() {
         this.inherited(arguments);
         var scopes = this.scopes;
         if (scopes) {
            scopes.active = scopes[0];
         }
      },
      
      /**
       * If no onSearch handler is defined for a scope, this method will be invoked.
       */
      onSearch: function(value, scope) {
      },
      
      /**
       * When submitted, execute the default scope as a search.
       */
      onSubmit: function(value) {
         this.onSearch(value, this.scopes.active);
      },
      
      setScopes: function(scopes, active) {
         this.scopes = scopes;
         scopes.active = active || scopes[0];
         var renderer = this.renderer;
         if (renderer)
            renderer.updateScopes(scopes);
      },
      
      initRenderer: function() {
         var suggestionHelper = this.suggest;
         if (typeof suggestionHelper == "function")
            suggestionHelper = suggestionHelper(this.scopes.active);
         if (!suggestionHelper)
            suggestionHelper = {};
         
         this.store = suggestionHelper.store || new com.ibm.social.layout.widget.EmptyStore();
         //this.noSuggestions = ;
         
         var widget = new com.ibm.social.layout.widget.SearchMenu(dojo.mixin({
            around: this.domNode,
            store: this.store,
            scopes: this.scopes,
            pageSize: 10, //FIXME: defaults to 10, should be inferred from window size
            searchMessages: dojo.delegate(dojo.i18n.getLocalization("com.ibm.social.layout.widget", "Search"), suggestionHelper.messages),
            noSuggestions: !suggestionHelper.store,
            parent: this
         }, suggestionHelper.renderer));
         this.connect(widget, "onSelect", "onSelect");
         return widget;
      }
   });
   
   dojo.declare("com.ibm.social.layout.widget.SearchMenu", com.ibm.oneui.controls.AutocompleteMenu, {
      
      idProperty: "id",
      menuClass: "lotusSearchMenu",
      
      // expects this.itemTemplate != null
      // expects this.searchMessages != null
      
      scopesTemplate: "<h4 class='_query'>{searchMessages.scopes}</h4><div class='lotusSearchScope _scopes'></div><h4>{searchMessages.suggestion}</h4>",
      scopeTemplate: "<div class='_selectable' clickMethod='search'>{scope.label}</div>",
      defaultTemplate: "<div class='_selectable' clickMethod='search'>{scope.label} <span>{searchMessages.defaultScope}</span></div>",
      inputTemplate: "<span class='_input'>&nbsp;</span>",
      
      buildRendering: function() {
         this.inherited(arguments);
         dojo.addClass(this.domNode, this.menuClass);
         this.templateNode.innerHTML = this.itemTemplate;
         this.buildScopes();
      },
      buildScopes: function() {
         var scopeMenuNode = dojo.create("li", {
            className: "dijitMenuItem",
            innerHTML: safeReplace(this.scopesTemplate, this)
         });
         if (this.noSuggestions)
            scopeMenuNode.lastChild.style.display = "none";
         this.scopesNode = dojo.query("._scopes", scopeMenuNode)[0];
         this.queryTextNode = dojo.query("._query", scopeMenuNode)[0].firstChild;
         scopeMenuNode._ignoreHide = true;
         this.updateScopes(this.scopes);
         
         dojo.place(scopeMenuNode, this.listNode, "first");
      },
      
      search: function(node) {
         var scope = this.scopes[node._index];
         var value = this.parent.attr("value");
         if (dojo.trim(value).length > 0) {
            var f = scope.onSearch || this.parent.onSearch;
            f.call(this.parent, value, scope);
            this.hide();
         }
         else {
            this.parent.setScopes(this.scopes, scope);
         }
         return true;
      },
      
      start: function(request) {
         this.updateTextForRequest(request);
         this.inherited(arguments);
      },
      
      updateTextForRequest: function(request) {
         var query = dojo.trim(request.query);
         var messages = this.searchMessages;
         this.queryTextNode.data = dojo.string.substitute(query.length > 0 ? messages.scopes : messages.scopesNoQuery, [query]);
      },
      
      updateScopes: function(scopes) {
         delete this.selectable; // when altering the DOM we must purge the selectable nodes
         this.scopes = scopes;

         var scopesNode = this.scopesNode;
         dojo.empty(scopesNode);
         
         for (var i=0,l=scopes.length; i<l; i++) {
            var scope = scopes[i];
            this.scope = scope;
            var scopeNode = scopesNode.appendChild(dojo._toDom(safeReplace(scopes.active == scope ? this.defaultTemplate : this.scopeTemplate, this)));
            scopeNode._index = i;
         }
         delete this.scope;
         if (this.showing) // regenerate the selected scopes when open
            this._getSelectable();
      },
      
      empty: function(query, hasPrevious) {
         if (this.noSuggestions) {
            this.emptyNode.firstChild.data = this.searchMessages.instruction;
            this._hideExcept("emptyNode");
         }
         else
            this.inherited(arguments);
      },
      
      error: function(errorData, request) {
         this.updateTextForRequest(request);
         this.inherited(arguments);
      },
      
      loading: function() {
         if (this.noSuggestions)
            this._hideExcept();
         else
            this.inherited(arguments);
      }     
   });
})();
