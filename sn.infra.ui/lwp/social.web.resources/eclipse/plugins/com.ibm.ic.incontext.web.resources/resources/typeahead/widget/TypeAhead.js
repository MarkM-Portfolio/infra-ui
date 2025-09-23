/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/has",
	"dojo/keys",
	"dojo/_base/kernel",
	"dojo/text!ic-incontext/typeahead/widget/templates/TypeAhead.html",
	"dojo/dom-attr",
	"dojo/string",
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/_base/lang",
	"dojo/topic",
	"dijit/form/ComboBox",
	"dijit/form/_ComboBoxMenu",
	"ic-incontext/typeahead/legacy/TypeAhead"
], function (dojo, array, has, keys, kernel, template, domAttr, string, declare, domClass, lang, topic, ComboBox, _ComboBoxMenu, TypeAhead) {

	var TypeAhead = declare("com.ibm.social.incontext.typeahead.widget.TypeAhead", TypeAhead, {
	   
	   className: "lotusText",
	
	   size: "",
	   pageSize: 15,
	   
	   templateString: null,
	   templateString: template,
	   
	   multipleValues: false,
	   hasDownArrow: false,
	   minChars: 2,
	   searchDelay: 400,
	
	   nameAttr:'name',
	   
	   searchOpts: null,
	   
	   postMixInProperties: function() {
	      this.inherited(arguments);
	      this.baseClass = this.className;
	      
	      //if (!this.orient)
	         //this.orient = dojo._isBodyLtr() ? {'BL':'TL', 'TL':'BL'} : {'BR':'TR', 'TR':'BR'};
	   },
	
	   formatItem: function(item) {
	      if (item[this.nameAttr])
	         return item[this.nameAttr];
	      return item;
	   },
	
	   formatItemHtml: function(item) {
	      var s = (item[this.nameAttr]) ? item[this.nameAttr] : item;
	      var el = document.createElement("div");
	      el.appendChild(document.createTextNode(s));
	      return el.innerHTML;
	   },
	
	   decorateItem: function(el, item) {
	   },
	
	   _onKey: function( /* Event */ evt) {
	      // summary:
	      //    Handles keyboard events
	      this.inherited(arguments); // inherits from TypeAhead	     
	      switch(evt.keyCode){
	         case keys.PAGE_DOWN:
	         case keys.DOWN_ARROW:
	         case keys.PAGE_UP:
	         case keys.UP_ARROW:
	            if(this._opened) {
	               // Keystroke caused ComboBox_menu to move to a different item.
	               // Copy new item to <input> box.
	               this._popupWidget._focusOptionNode(this._popupWidget.getHighlightedOption());
	            }
	            break;
	      }
	   },
	
	   _startSearch: function(/*String*/ key, overrides) {
	      var opt = {};
	      if(this.searchOpts)
	         opt = lang.mixin(opt, this.searchOpts);
	      if(overrides)
	         opt = lang.mixin(opt, overrides);
	
	      var popupId = this.id + "_popup";
	      if(!this._popupWidget){
	          this._popupWidget = this.dropDown = new com.ibm.social.incontext.typeahead.widget.TypeAheadMenu({
	              _strings: this._strings,
	              onChange: lang.hitch(this, this._selectOption),
	              decorateItem: lang.hitch(this, this.decorateItem),
	              id: popupId
	          });
	          // waiRole, waiState
	          var role = this.textbox.getAttribute("wairole");
	          if(role){
	             this.textbox.setAttribute("role", role);
	          }  
	          this._popupWidget.domNode.setAttribute("aria-live", "polite");
	          this.focusNode.removeAttribute("aria-activedescendant");
	      } else {
	         this.focusNode.setAttribute("aria-activedescendant", popupId);
	      }
	         
	      // create a new query to prevent accidentally querying for a hidden
	      // value from FilteringSelect's keyField
	      this.item = null; // #4872
	      var query = lang.clone(this.query); // #5970
	      this._lastQuery = query = key;
	      // #5970: set _lastQuery, *then* start the timeout
	      // otherwise, if the user types and the last query returns before the timeout,
	      // _lastQuery won't be set and their input gets rewritten
	      //clearTimeout(this.searchTimer);
	      this.searchTimer=this.defer(lang.hitch(this, function(query, _this){
	          var dataObject=this.store.fetch({
	             queryOptions: lang.mixin({
	                ignoreCase:this.ignoreCase, 
	                deep:true
	             }, opt), 
	             query: query, 
	             onComplete:lang.hitch(this, "_openResultList"), 
	             onError: function(errText){
	                //console.error('dijit.form.ComboBox: ' + errText);
	                lang.hitch(_this, "_hideResultList")();
	             },
	             start:0, 
	             count:this.pageSize
	          });
	          
	          var nextSearch = function(dataObject, direction){
	              dataObject.start += dataObject.count*direction;
	              // #4091:
	              //      tell callback the direction of the paging so the screen
	              //      reader knows which menu option to shout
	              dataObject.direction = direction;
	              this.store.fetch(dataObject);
	          }
	          this._nextSearch = this._popupWidget.onPage = lang.hitch(this, nextSearch, dataObject);
	          
	      }, query, this), opt.searchImmediately ? 1 : this.searchDelay);
	   },
	   
	   _openResultList: function(/*Object*/ results, /*Object*/ dataObject){
	      if( this.disabled || 
	            this.readOnly || 
	            (dataObject.query != this._lastQuery)
	      ){
	         return;
	      }
	      this._popupWidget.clearResultList();
	      
	      if(!results.length && (this.hideEmptyResults || dataObject.hideEmptyResults)){
	          this._hideResultList();
	          return;
	      } 
	
	      // Fill in the textbox with the first item from the drop down list,
	      // and highlight the characters that were auto-completed. For
	      // example, if user typed "CA" and the drop down list appeared, the
	      // textbox would be changed to "California" and "ifornia" would be
	      // highlighted.
	
	      // INSERT: don't grab results[0] unless results isn't empty
	      var zerothvalue = (results.length > 0) ? new String(this.formatItem(results[0])) : null;
	      if(zerothvalue && this.autoComplete && !this._prev_key_backspace &&
	          (dataObject.query != "")){
	          // when the user clicks the arrow button to show the full list,
	          // startSearch looks for "*".
	          // it does not make sense to autocomplete
	          // if they are just previewing the options available.
	          this._autoCompleteText(zerothvalue);
	      }
	      dataObject._maxOptions = this._maxOptions;
	      this._popupWidget.createOptions(
	          results, 
	          dataObject, 
	          lang.hitch(this, "_getMenuLabelFromItem")
	      );
	
	      if (dataObject.queryOptions.autoselectAnyResult || (dataObject.queryOptions.autoselectSingleResult && results.length == 1)) {
	         var pw = this._popupWidget;
	         var target;
	         try { pw.highlightFirstOption(); target = pw.getHighlightedOption();} catch(e) { } // Sometimes throws spurious exceptions in IE
	         if (target && typeof target.item != "string")
	            pw.set('value', { target: target });
	
	         if (this._isShowingNow) {
	            this._hideResultList();
	         }
	
	         return;
	      }
	
	      // RTC 88769 - State of global sharebox esc key handler is not set properly
	      // This is happening because the form.ComboBox always calls a hideResultsList
	      // in the showResultsList function, but this is unnecessary and causes
	      // issues with our publish open/close methods. Here we remove the hideResultList
	      // functionality before calling the show method, then restore it afterwards.
	
	      var hideFunction = (kernel.version.minor == 9) ? ComboBox.prototype.closeDropDown : ComboBox.prototype._hideResultList;
	      ComboBox.prototype._hideResultList = function() { /* do nothing */ };
	      
	      // show our list (only if we have content, else nothing)
	      this._showResultList();
	
	      if (kernel.version.minor == 9)
	          ComboBox.prototype.closeDropDown = hideFunction;
	       else
	          ComboBox.prototype._hideResultList = hideFunction;
	
	      // Higlight + focus the first option in the list when the TA opens
	      this._popupWidget.highlightFirstOption();
	      this._popupWidget._focusOptionNode(this._popupWidget.selected);
	      this._popupWidget.domNode.parentNode.setAttribute("aria-label", "Type Ahead");
	      this._popupWidget.domNode.removeAttribute("aria-labelledby");
	      document.activeElement.removeAttribute("aria-owns");
	      domAttr.set(document.activeElement, "aria-activedescendant", this._popupWidget.selected.id);
	
	      // In IE, body will get focus if set node visibility into hidden,
	      // so that focusNode will lose focus causing its onBlur never hit,
	      // then the pop-up widget will never close. Reset focus here.
	      if (has("ie") && (this.focusNode != document.activeElement) && !this.focusNode.preventFocus)
	         this.focusNode.focus();
	
	      // #4091:
	      //      tell the screen reader that the paging callback finished by
	      //      shouting the next choice
	      if(dataObject.direction){
	         if(1 == dataObject.direction){
	            this._popupWidget.highlightFirstOption();
	         }else if(-1 == dataObject.direction){
	            this._popupWidget.highlightLastOption();
	         }
	      }
	  },
	   
	   _hideResultList: function() {
	      var result = this.inherited(arguments);
	      this.onPopupClosed();
	      return result;
	   },
	   
	   onPopupOpened: function () {},
	   onPopupClosed: function () {}   
	   
	});
	
	
	declare("com.ibm.social.incontext.typeahead.widget.TypeAheadMenu", _ComboBoxMenu, { 
		templateString: "<div class='dijitReset dijitMenu lotusList' dojoAttachPoint='containerNode' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut' role='listbox' waiRole='listbox' tabIndex='-1' style='overflow:\"auto\";'>"
	             +"<div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div>"
	             +"<div class='dijitMenuItem resultsNode' dojoAttachPoint='resultsNode'></div>"
	             +"<div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div>"
	             +"</div>",
	     _messages: null,
	     
	     postCreate:function(){
	         this.resultsNode.selectHandler = lang.hitch(this, function(evt) {
	         	evt.preventDefault(), evt.stopPropagation();
	         	return true; // Return true to skip the rest of the default behavior
	         });
	         
	         this.inherited("postCreate", arguments);
	     },
	     
	     setValue: function(/*Object*/ value){
	         // INSERT: removed conditional check for " && parseInt(value.target.item.type) >= 0" from IF
	         if ( value.target.item ) {
	             this.value = value;
	             this.onChange(value);
	         }
	     },
	     
	     _onMouseUp:function(/*Event*/ evt){
	         if(evt.target!=this.resultsNode)
	             this.inherited("_onMouseUp", arguments);
	             //this.inherited("_onMouseUp", arguments);
	     },
	     
	     _onMouseOver:function(/*Event*/ evt){
	        if(evt.target === this.domNode){ return; }
	        var tgt=evt.target;
	        if(!(tgt==this.previousButton||tgt==this.nextButton||tgt==this.searchButton||tgt==this.resultsNode)){
	           // while the clicked node is inside the div
	           while(tgt && !tgt.getAttribute('item')){
	               // recurse to the top
	              tgt=tgt.parentNode;
	           }
	        }
	        this._focusOptionNode(tgt);
	    },
	    
	    _focusOptionNode: function(/*DomNode*/ node){
	       // summary:
	       //    Does the actual highlight.
	       //if(this._highlighted_option != node){
	          this._blurOptionNode();
	          this._highlighted_option = node;
	          domClass.remove(this._highlighted_option, "dijitMenuItemSelected");
	          domClass.add(this._highlighted_option, "dijitMenuItemHover");
	          //this.inputWidget._announceOption(node);
	       //}
	    },
	    
	    _blurOptionNode:function(){
	       // summary:
	       // removes highlight on highlighted option
	       if(this._highlighted_option){
	          domClass.remove(this._highlighted_option, "dijitMenuItemHover");
	          this._highlighted_option = null;
	       }
	    },
	     
	     //We only override this function so that we can make it insert options before searchButton
	     //  instead of before nextButton, and also to conditionally display the search button
	     createOptions: function(results, dataObject, labelFunc){
	         topic.publish("lconn/core/typeahead/open");
	         // Clear existing result nodes
	         this.clearResultList();
	         this.items = results;
	
	         // display "Previous . . ." button
	         if (!dataObject.start || dataObject.start == 0) {
	            this.previousButton.style.display = "none";
	         }
	         else {
	            this.previousButton.style.display = "";
	            domAttr.remove(this.previousButton, "tabindex");
	         }
	         domAttr.set(this.previousButton, "id", this.id + "_prev");
	
	         // create options using _createOption function defined by parent
	         // ComboBox (or FilteringSelect) class
	         // #2309:
	         //      iterate over cache nondestructively
	         array.forEach(results, function(item, i){
	            if (dataObject.count && i >= dataObject.count)
	               return;
	 
	            var menuitem = this._createOption(item, labelFunc);
	            menuitem.className = "dijitMenuItem";
	            menuitem.setAttribute("item", i);  // index to this.items; use indirection to avoid mem leak
	            domAttr.set(menuitem, "id", this.id + i);
	
	            if (this.decorateItem)
	               this.decorateItem(menuitem, item);
	
	            this.domNode.insertBefore(menuitem, this.nextButton);
	         }, this);
	
	         // display "Next . . ." button
	         this.nextButton.style.display = (dataObject.count && dataObject.count < results.length) ? "" : "none";
	         domAttr.set(this.nextButton, "id", this.id + "_next");
	
	         // INSERT: Added a message node to display when there are no results
	         var el = this.resultsNode;
	         if (results.length == 0) {
	            var noResultsMsg = string.substitute(this._strings.NO_RESULTS, [dataObject.query]);
	            while (el.firstChild) el.removeChild(el.firstChild);
	            el.appendChild(document.createTextNode(noResultsMsg));
	            domAttr.set(el, "aria-label", noResultsMsg);
	            el.item = noResultsMsg;
	            this.domNode.insertBefore(el, this.nextButton);
	         }
	         //give an ID for a11y
	         domAttr.set(this.resultsNode, "id", this.id + "_resultsNode");
	     },
	
	     //Override this function just to delete everything between the first and last items
	     clearResultList:function(){
	         // keep the previous and next buttons of course
	         // INSERT: Added a message node to display when there are no results
	         var first = this.previousButton;
	         var last = this.nextButton;
	         while (first.nextSibling && first.nextSibling != last)
	            this.domNode.removeChild(first.nextSibling);
	     },
	     
	     //Override this function just to change 2 to 3 since we added an extra node into the menu
	     getListLength:function(){
	         // INSERT: Added a message node to display when there are no results
	         return this.domNode.childNodes.length - 2 - (this.resultsNode.parentNode ? 1 : 0);
	     },
	     
	     onClose:function(){
	        topic.publish("lconn/core/typeahead/close");
	        this.inherited(arguments);
	     }
	});
	
	return TypeAhead;
});
