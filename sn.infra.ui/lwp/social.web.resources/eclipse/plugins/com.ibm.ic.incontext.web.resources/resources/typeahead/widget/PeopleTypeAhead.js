/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/on",
	"ic-incontext/typeahead/legacy/PeopleTypeAhead",
	"ic-incontext/util/html"
], function (declare, lang, aspect, on, PeopleTypeAhead, html) {

	var PeopleTypeAhead = declare("com.ibm.social.incontext.typeahead.widget.PeopleTypeAhead", PeopleTypeAhead, {
	
	   className: "lotusText",
	
	   nameAttr:'name',
	   minChars: lang.getObject("com.ibm.social.incontext.typeahead.config.minChars") || 2,
	   searchDelay: lang.getObject("com.ibm.social.incontext.typeahead.config.searchDelay") || 400,
	   pageSize: 25,
	   multipleValues: false,
	   hasDownArrow: false,
	   
	   postMixInProperties: function() {
	      this.inherited(arguments);
	      this.baseClass = this.className;
	   },
	
	   buildRendering: function() {
	      this.inherited(arguments);
	      this.own(on(this, "Click", lang.hitch(this, "_searchNow")));
	      this.own(aspect.after(this, "_onFocus", lang.hitch(this, "_onFocusSearchNow"), true));
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
	      setTimeout(lang.hitch(this, "_startSearchFromInput", {searchImmediately: true}),1);
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
	         var dirChar = html.getDirectionCode();
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
	         var dirChar = html.getDirectionCode();
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
	      var result = this.inherited(arguments);
	      this.onPopupOpened();
	      return result;
	   },
	   
	   _hideResultList: function() {
	      var result = this.inherited(arguments);
	      this.onPopupClosed();
	      return result;
	   },
	   
	   onPopupOpened: function () {},
	   onPopupClosed: function () {}
	});
	
	return PeopleTypeAhead;
});
