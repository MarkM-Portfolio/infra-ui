/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.PeopleTypeAhead");
dojo.require("lconn.share.legacytypeahead.PeopleTypeAhead");
dojo.require("dojox.validate.web");

dojo.declare("lconn.share.widget.PeopleTypeAhead", [lconn.share.legacytypeahead.PeopleTypeAhead], {
   allowEmail: false,
   className: "lotusText",

   nameAttr:'name',
   minChars: dojo.getObject("lconn.share.config.services.peopleSearch.minChars") || 2,
   searchDelay: dojo.getObject("lconn.share.config.services.peopleSearch.searchDelay") || 400,
   pageSize: 25,
   multipleValues: false,
   hasDownArrow: false,
   
   postMixInProperties: function() {
      if (dojo.version.minor > 5)
         delete this.hasDownArrow;
      this.inherited(arguments);
      this.baseClass = this.className;
   },

   buildRendering: function() {
      this.inherited(arguments);
      this.connect(this, "onClick", "_searchNow");
      this.connect(this, "_onFocus", "_onFocusSearchNow");
   },

   /**
    * The onFocus method does not include the event, or whether the focus
    * was a click or a keyboard event.  Since we do not want to open the
    * drop down on keyboard focus, we hook directly to the widget _onFocus
    */
   _onFocusSearchNow: function(eventType) {
      if (eventType == "mouse")
         this._searchNow();
   },
   _searchNow: function() {
      var searchString = this.focusNode.value;
      searchString = dojo.string.trim(searchString);
      if(searchString != "")
         setTimeout(dojo.hitch(this, "_startSearchFromInput", {searchImmediately: true}),1);
   },

   formatItem: function(item) {
      var str = "";
      
      if (typeof item == "string")
         return item;
      if (!item || !item.name)
         return str;
      
      //If there's a comma in the name and there aren't already quotes around the name, then we'll surround the name in quotes
      if (item.name.indexOf(',') != -1 && item.name.length > 1 && item.name[0] != '"' && item.name[item.name.length-1] != '"')
         str += '"' + item.name + '"';
      else
         str += item.name;
     
      if ( item.email ){
         var dirChar = lconn.share.util.html.getDirectionCode();
         str += ' ' + dirChar + '<' + item.email + dirChar + '>';
      }
   
      if ( item.userState == 'inactive' ) {
         str += ' ';
         str += this._strings.INACTIVE;
      }
         
      return str;
   },
     
   formatItemHtml: function(item) {
      var str = "";
      if (typeof item == "string")
         return item;
      if (!item || !item.name)
         return str;
     
      var d = document;
      var el = d.createElement("DIV");
     
      //If there's a comma in the name and there aren't already quotes around the name, then we'll surround the name in quotes
      if (item.name.indexOf(',') != -1 && item.name.length > 1 && item.name[0] != '"' && item.name[item.name.length-1] != '"') {
         el.appendChild(d.createTextNode("\""));
         el.appendChild(d.createTextNode(item.name));
         el.appendChild(d.createTextNode("\""));
      } 
      else
         el.appendChild(d.createTextNode(item.name));
    
      if (item.email) {
         var dirChar = lconn.share.util.html.getDirectionCode();
         el.appendChild(d.createTextNode(" "+dirChar+"<"));
         el.appendChild(d.createTextNode(item.email));
         el.appendChild(d.createTextNode(dirChar+">"));
      }
   
      if (item.userState == 'inactive')
         el.appendChild(d.createTextNode(" "+this._strings.INACTIVE));
      
      return el.innerHTML;
   },
   
   /** If the typeahead does not have the focus we should not allow the result list to be opened */
   _openResultList: function() {
      if (!this._focused)
         return;
      return this.inherited(arguments);
   },
   
   doSelectUser: function(){
      var hl = null;
      if (this._isShowingNow) {
         var pw = this._popupWidget;
         hl = pw && pw.getHighlightedOption();
      }
      
      var obj = null;
      if (hl) {
         var id = hl.id.substring(3);  // remove li_
         if(id){                       //items like Prev/Next has no id, no need to process the fetch, leave it to parent method
            this.store.fetchItemByIdentity({
               identity: id, 
               onItem: dojo.hitch(this, function(item) {                  
                  this.item = item;
                  obj = [item];
               })
            });
         }
      }
      
      if (!obj && this.allowEmail) {
         var v = this.focusNode.value;
         if (v && dojox.validate.isEmailAddress(v)) {
            obj = [{email: v.toLowerCase()}];
         }
      }
      
      if (obj) {
         this.onSelect.apply(this, obj);
      }
   }
});
