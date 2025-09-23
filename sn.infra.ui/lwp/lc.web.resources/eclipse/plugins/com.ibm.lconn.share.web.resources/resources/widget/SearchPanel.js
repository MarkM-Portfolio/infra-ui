/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('lconn.share.widget.SearchPanel');

dojo.require("ic-search.searchPanel.SearchPaneManager");
dojo.require("dijit._Widget");
dojo.require("lconn.share.search.SearchPaneManager");

dojo.declare("lconn.share.widget.SearchPanel",  [dijit._Widget], {
      
   postMixInProperties: function() {
      this.inherited(arguments);
      this.scopes = this.scopes || [];
   },
      
   buildRendering: function() {
      this._renderSearchPanel();
   },

   _renderSearchPanel: function(){
      var el = this.domNode = this.srcNodeRef;
      this.currentScope = this.decorateScope(this.defaultSearchScope);
      this.searchPanel = new lconn.share.search.SearchPaneManager({
         localOptions: [this.currentScope],
         onSubmit: dojo.hitch(this, "search")
         }, el);
      this.connect(this.searchPanel, "onPersonClick", function(personWidget, evt){
         if(personWidget && personWidget.userId) {
            var personScope = this.decorateScope("person");
            personScope.onSelect({
               id: personWidget.userId
               });
         }
      });
   },
   getCurrentScope: function() {
      return this.currentScope;
   },
   
   search: function(e) {
      if (e) 
         dojo.stopEvent(e);
      if((this.searchPanel.getSelectedOption().scope == this.searchPanel.globalScope.scope) || (this.searchPanel.isThirdPartySearchEngineSelected && this.searchPanel.isThirdPartySearchEngineSelected()))
    	 return true;
      this.searchPanel.setSearchBarMode(true);
      var scope = this.getCurrentScope();
      if (scope.onSearch)
         scope.onSearch(this.searchPanel.searchBar.getTextValue());
      
      return false;
   },
   
   changeScope: function(scope) {
      this.currentScope = this.decorateScope(scope);
      if(this.searchPanel && typeof this.searchPanel.setLocalOptions == "function")
         this.searchPanel.setLocalOptions(this.currentScope);
   },
   
   // TODO set check searchBox
   setValue: function(text) {
      if (!dojo.exists("searchPanel.searchBar.setTextValue", this)) {
         console.warn("searchPanel.searchBar.setTextValue is not defined.");
         return;
      }
      this.searchPanel.searchBar.setTextValue()
   },
   
   reset: function() {
      this.setValue("");
      
      if (!dojo.exists("searchPanel.setSearchBarMode", this)) {
         console.warn("searchPanel.setSearchBarMode is not defined.");
         return;
      }

      this.searchPanel.setSearchBarMode(false);
   },
   
   decorateScope: function(scope){
	   var app = this.app;

	   if (typeof scope == "string")
	      scope = dojo.filter(this.scopes, function(s) {return s.id == scope;})[0];
	      
	   if (!scope || !scope.isValid(app, app.scene))
	      scope = this.scopes[0];
	      
	   // For collections scene, old search option only provide getLabel method. 
	   if (scope.getLabel)
	      scope.label = scope.getLabel(app, app.scene);
	   return scope;
   }
});
