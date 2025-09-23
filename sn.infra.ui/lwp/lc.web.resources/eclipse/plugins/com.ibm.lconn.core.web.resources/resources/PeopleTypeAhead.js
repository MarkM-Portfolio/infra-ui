/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
author: Ryan Silva

*/

dojo.provide("lconn.core.PeopleTypeAhead");

dojo.require("lconn.core.PeopleTypeAheadFormatMixin");
dojo.require("lconn.core.TypeAhead");
dojo.require("lconn.core.Res");
dojo.require("dijit.form.ComboBox");
dojo.require('dijit.Tooltip');
dojo.require("lconn.core.config.properties");

dojo.declare(
    "lconn.core.PeopleTypeAhead",
    [lconn.core.TypeAhead,lconn.core.Res,lconn.core.PeopleTypeAheadFormatMixin],
    {
       isGroup: false,
       isPersonAndGroup: false,
       isCommunity: false,
       size: "",
       // default pageSize = 15. if no configuration property defined
       pageSize: lconn.core.config.properties["people.typeahead.pageSize"] ? lconn.core.config.properties["people.typeahead.pageSize"] : 15,
       multipleValues: false,
       NoResultsMessage: '',
       HeaderMessage: '',
       showHintText: true,
       disableSearchDirectory: false,
       autoSelectChars: [","],
       focused: false, //mark if the input dom has the focus
       templateString: null,
       templatePath: dojo.moduleUrl("lconn.core", "templates/ComboBox.html"),
       disableBizCard: false,

       postMixInProperties: function() {
          this.loadDefaultBundle();
          this.searchDirectory = this.resBundle.rs_searchDirectory;
          if(this.isGroup) {
             this.searchDirectory = this.resBundle.rs_searchGroupDirectory;
          } else if(this.isCommunity) {
             this.searchDirectory = this.resBundle.rs_searchCommunityDirectory;
          } else if(this.isPersonAndGroup) {
             this.searchDirectory = this.resBundle.rs_searchPersonAndGroupDirectory;
          }

          if (this.showHintText){
             this.hintText = this.resBundle.rs_shadowText_searchDirectory;

             if(this.isGroup) {
                //hintText is defined in "lconn.core.TypeAhead"
                this.hintText = this.resBundle.rs_shadowText_searchGroupDirectory;
             } else if(this.isCommunity) {
                //hintText is defined in "lconn.core.TypeAhead"
                this.hintText = this.resBundle.rs_shadowText_searchCommunityDirectory;
             } else if(this.isPersonAndGroup) {
                //hintText is defined in "lconn.core.TypeAhead"
                this.hintText = this.resBundle.rs_shadowText_searchPersonAndGroupDirectory;
             }
          } else {
             this.hintText = null;
          }

          this.inherited(arguments);
          this.baseClass = "lotusText";
        },

        postCreate: function(){
           this.inherited(arguments);

           // RTC#69640 - add aria-describedby to name type ahead fields
           var ariaDescribedByText = this.resBundle.rs_shadowText_searchDirectory;
           if(this.isGroup) {
              ariaDescribedByText = this.resBundle.rs_shadowText_searchGroupDirectory;
           } else if(this.isCommunity) {
              ariaDescribedByText = this.resBundle.rs_shadowText_searchCommunityDirectory;
           } else if(this.isPersonAndGroup) {
              ariaDescribedByText = this.resBundle.rs_shadowText_searchPersonAndGroupDirectory;
           }

           var node = dojo.place('<div id="'+this.id+'_ariaDescribedBy'+'" style="display:none;">'+ariaDescribedByText+'</div>', this.domNode, "after");
           dojo.attr(this.domNode, "aria-describedby", this.id+'_ariaDescribedBy');
        }, 

        //Convenience function to return the item or null if there isn't one.
        getItem: function() {
           return ( this.item ? this.item : null );
        },

        // overrides the '_onKey' of TypeAhead (onKeyDown handler)
        _onKey: function( /* Event */ evt) {
            // summary:
            //    Handles keyboard events

            this.inherited(arguments); // inherits from TypeAhead
            var keys = dojo.keys;
            //Sets the text back to what the user was typing.
            if(this.focusNode.value && this._currentInput && this.focusNode.value != this._currentInput && evt.keyCode !== dojo.keys.ENTER){
                this.focusNode.value = this._currentInput;
                
                //Fix for defect 162826 sets the cursor to the end
                if(dojo.isIE || (!!navigator.userAgent.match(/Trident\/7\./)))
                {         
                   var element = this.focusNode;
                   element.focus();
                   var range = element.createTextRange();
                   range.collapse(false);
                   range.select();
                }
             }
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
               case keys.ENTER:
                  var pw = this._popupWidget;
                  if(pw.getHighlightedOption() == pw.searchButton) {
                     // the user select "Person not listed? Use full search..."
                     pw.searchDirectory();
                  }
                  break;
            }
        },

      _onFocus: function(/*Event*/ evt) {
         this.inherited(arguments);
         this.focused = true;
      },

      _onBlur: function(/*Event*/ evt) {
         this.focused = false;

         //if focus is on bizcard, not close people typeahead menu
         var pw = this._popupWidget;
         if (!(pw && pw.tooltipFocused)) {
            this.inherited(arguments);
         }

         // RTC: 87198 - Have to remove this style when typeahead loses focus otherwise it interferes with other popups
         if(dojo.isIE && this.dropdownNode){
            dojo.removeClass(this.dropdownNode, "lconnTypeAhead");
         }
         this.updateHintText();
      },

      _startSearch: function(/*String*/ key, opt) {
        opt = opt || {};

         if (opt.searchImmediately) {
            opt.searchBoth = true;
         }

         var popupId = this.id + "_popup";
         if(!this._popupWidget){
            this._popupWidget = this.dropDown = new lconn.core.PeopleTypeAheadMenu({
               _strings: this._strings,
               rs_searchDirectory: this.searchDirectory,
               NoResultsMessage: this.NoResultsMessage,
               HeaderMessage: this.HeaderMessage,
               disableSearchDirectory: this.disableSearchDirectory,
               onChange: dojo.hitch(this, this._selectOption),
               id:popupId,
               inputWidget: this,
               disableBizCard: this.disableBizCard
            });

            // waiRole, waiState
            var role = this.textbox.getAttribute("wairole");
            if(role){
               dijit.setWaiRole(this.textbox, role);
            } 
            dijit.setWaiState(this._popupWidget.domNode, "live", "polite"); 
            dijit.removeWaiState(this.focusNode,"activedescendant");
            //dijit.setWaiState(this.textbox,"owns", popupId); // associate popup with textbox
         } else {
             dijit.setWaiState(this.focusNode,"activedescendant", popupId);
         }

         // create a new query to prevent accidentally querying for a hidden
         // value from FilteringSelect's keyField
         this.item = null; // #4872
         var query = dojo.clone(this.query); // #5970
         this._lastQuery = query = key;
         // #5970: set _lastQuery, *then* start the timeout
         // otherwise, if the user types and the last query returns before the timeout,
         // _lastQuery won't be set and their input gets rewritten
         //this.searchTimer=setTimeout(dojo.hitch(this, function(query, _this){
         this.searchTimer=this.defer(dojo.hitch(this, function(query, _this){
            var dataObject=this.store.fetch({
               queryOptions: dojo.mixin({
                  ignoreCase:this.ignoreCase,
                  deep:true
               }, opt),
               query: query,
               onComplete:dojo.hitch(this, "_openResultList"),
               onError: function(errText){
                  console.error('dijit.form.ComboBox: ' + errText);
                  dojo.hitch(_this, "_hideResultList")();
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
            this._nextSearch = this._popupWidget.onPage = dojo.hitch(this, nextSearch, dataObject);
            this._popupWidget.searchDirectory=dojo.hitch(this, dojo.hitch(this, function() {
               //this._startSearch(key, {searchDirectory:true});
               dataObject.queryOptions.searchDirectory=true;
               this.store.fetch(dataObject);
            }));

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

         if (results.length) {
            // Fill in the textbox with the first item from the drop down list,
            // and highlight the characters that were auto-completed. For
            // example, if user typed "CA" and the drop down list appeared, the
            // textbox would be changed to "California" and "ifornia" would be
            // highlighted.

            var zerothvalue = new String(this.formatItem(results[0]));
            if (zerothvalue && this.autoComplete && !this._prev_key_backspace &&
                  (dataObject.query != "")) {
               // when the user clicks the arrow button to show the full list,
               // startSearch looks for "*".
               // it does not make sense to autocomplete
               // if they are just previewing the options available.
               this._autoCompleteText(zerothvalue);
            }
         }
         dataObject._maxOptions = this._maxOptions;
         this._popupWidget.createOptions(
               results,
               dataObject,
               dojo.hitch(this, "_getMenuLabelFromItem")
         );

         this.results = results;

         // RTC 88769 - State of global sharebox esc key handler is not set properly
         // This is happening because the form.ComboBox always calls a hideResultsList
         // in the showResultsList function, but this is unnecessary and causes
         // issues with our publish open/close methods. Here we remove the hideResultList
         // functionality before calling the show method, then restore it afterwards.

         var hideFunction = dijit.form.ComboBox.prototype._hideResultList;
         dijit.form.ComboBox.prototype._hideResultList = function() { /* do nothing */ };

         // show our list (only if we have content, else nothing)
         this._showResultList();

         dijit.form.ComboBox.prototype._hideResultList = hideFunction;

         // Moving the header message out of the list of items
         dojo.place(this._popupWidget.headerNode, this._popupWidget.domNode, "before");

         this._popupWidget.domNode.parentNode.setAttribute("aria-label", "Type Ahead");
         document.activeElement.removeAttribute("aria-owns");
         // #125526 we need to restore the old logic. No item is pre-selected when the typeahead popup is displayed
         this._popupWidget.selected = null;

         // In IE, body will get focus if set node visibility into hidden,
         // so that focusNode will lose focus causing its onBlur never hit,
         // then the pop-up widget will never close. Reset focus here.
         if (dojo.isIE && (this.focusNode != document.activeElement) && !this.focusNode.preventFocus)
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
      }
   }
);

dojo.declare(
      "lconn.core.PeopleTypeAheadMenu",
      [dijit.form._ComboBoxMenu,lconn.core.Res],

      {
          rs_searchDirectory: ' ',
          NoResultsMessage: '',
          HeaderMessage: '',
          templateString: "<div waiRole='listbox' class='lconnPeopleTypeAheadMenu dijitReset dijitMenu' dojoAttachPoint='containerNode' tabIndex='-1' style='overflow:\"auto\";'>"
              +"<div class='dijitMenuItem dijitMenu headerNode lotusHidden' dojoAttachPoint='headerNode' tabIndex='-1'></div>"
              +"<div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton' role='option' tabIndex='-1'></div>"
              +"<div class='dijitMenuItem lotusAlignLeft resultsNode'  style='overflow: hidden;' dojoAttachPoint='resultsNode' role='option'></div>"
              +"<div class='dijitMenuItem searchDirectory ${searchDirectoryClass}' dojoAttachPoint='searchButton' role='option'>${rs_searchDirectory}</div>"
              +"<div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton' role='option'></div>"
              +"</div>",
          _messages: null,
          searchDirectoryClass: "",
          disableSearchDirectory: false,
          disableBizCard: false,

          inputWidget: null,
          tooltipFocused: false,      //mark if the focus is on bizcard
          tooltipAroundNode: null,    //Node that the tooltip is centered around
          tooltipTimeout: null,       //Return value of setTimeout()
          tooltipDelay: 600,          //Time to delay before showing tooltip
          tooltipId: 0,               //Counter used for the tooltips to make sure only the latest one gets drawn

          popupClosed: true,          //A flag for the tooltip.  We set to false in _focusOptionNode (when an option
                                      //  is highlighted).  If the menu is closed, set to true.  This way, a tooltip
                                      //  won't show itself if the menu has been closed.
                                      //This flag is not a test for whether the type ahead menu is open.

          postMixInProperties: function() {
             this.loadDefaultBundle();
             this.inherited("postMixInProperties",arguments);
             if (this.disableSearchDirectory)
                this.searchDirectoryClass = "lotusHidden";
             if (!this.NoResultsMessage)
                this.NoResultsMessage = this.resBundle.rs_noResults || "";
          },

          postCreate:function(){
           // RTC 89423 Using "More" and "Previous" strings from the resource bundle as we have nothing else.
             dojo.attr(this.previousButton, "aria-label", this.resBundle.rs_navPrevLabel);
             dojo.attr(this.searchButton, "aria-label", this.rs_searchDirectory);
             dojo.attr(this.nextButton, "aria-label", this.resBundle.rs_more);

             this.searchButton.selectHandler = dojo.hitch(this, function(evt) {
                 dojo.stopEvent(evt);
                 this.searchDirectory();
                 return true; // Return true to skip the rest of the default behavior
             });

             this.resultsNode.selectHandler = dojo.hitch(this, function(evt) {
                 dojo.stopEvent(evt);
                 return true; // Return true to skip the rest of the default behavior
             });

             // added due to dojo ticket #17752
             if (dojo.version.minor === 7 && dojo.version.patch > 4
                   || dojo.version.minor === 9 && dojo.version.patch > 2
                   || dojo.version.minor === 10) {
                this.connect(this.domNode, "mousedown", function(e) {
                   dojo.stopEvent(e);
                });
             }

             this.inherited("postCreate", arguments);
          },

          searchDirectory: function() {},

          setValue: function(/*Object*/ value){
             // INSERT: removed conditional check for " && parseInt(value.target.item.type) >= 0" from IF
             if ( value.target.item ) {
                this.value = value;
                this.onChange(value);
             }
          },

          _onClick:function(/*Event*/ evt){
             if(evt.target==this.searchButton){
                this.searchDirectory();
             }else if(evt.target!=this.resultsNode){
                this.inherited("_onClick", arguments);
             }
          },
          
          _onMouseUp : function( /* Event */evt) {
             if(evt.target==this.searchButton){
                this.searchDirectory();
             }else if(evt.target!=this.resultsNode){
                this.inherited("_onMouseUp", arguments);
             }
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

          // lconn.core: use dijitMenuItemHover
          _focusOptionNode: function(/*DomNode*/ node){
             // summary:
             //    Does the actual highlight.
             if(this._highlighted_option != node){
                this._blurOptionNode();
                this._highlighted_option = node;
                dojo.removeClass(this._highlighted_option, "dijitMenuItemSelected");
                dojo.addClass(this._highlighted_option, "dijitMenuItemHover");
                //Show biz card tooltip
                var userid = dojo.attr(node, "exid");
                //check type, making sure we don't put bizcard on a group
                var type = dojo.attr(node, "persontype");

                //Close any open tooltips
                this.closeTooltip();

                //This will make sure that we'll only actually display a tooltip if it's the current one.
                //  If you focus on a person in the drop-down, and then focus on "Search Directory", tooltipId
                //  will increment when you highlight "Search Directory".  Since tooltips get shown via a callback
                //  called after a round trip to the profiles server, it's possible there is a tooltip for a person
                //  that hasn't yet been displayed when the user is highlighting the "Search Directory" menu item.
                //  The end result would be that the last highlighted person would have a tooltip while the user is 
                //  moused over "Search Directory".  By associating an id with each tooltip callback, only the latest
                //  tooltip will be displayed.
                this.tooltipId++;
                this.popupClosed = false;
                if (userid && (type==0) && !this.disableBizCard) {
                   this.renderBizCard(userid, node); 
                } else if(type != -1){
                      this.inputWidget._announceOption(node);

                }
             }
          },


          renderBizCard: function(userId, node) {
             if (dojo.isFunction(dojo.getObject('lconn.profiles.bizCard.bizCard.renderMiniBizCard'))) {
                this.tooltipTimeout = setTimeout(
                      dojo.hitch(
                            lconn.profiles.bizCard.bizCard,
                            "renderMiniBizCard",
                            userId,
                            dojo.hitch(this, "showTooltip", this.tooltipId, node)
                      ),
                      this.tooltipDelay
                );
             } else {
               this.inputWidget._announceOption(node);
             }
          },

          // lconn.core: use dijitMenuItemHover
          _blurOptionNode:function(){
             // summary:
             // removes highlight on highlighted option
             if(this._highlighted_option){
                dojo.removeClass(this._highlighted_option, "dijitMenuItemHover");
                this._highlighted_option = null;
             }
          },

          _createOption:function(/*Object*/ item, labelFunc){
              var menuitem = this.inherited("_createOption", arguments);

              if (item.userid) {
                  dojo.attr(menuitem, "exid", item.userid);
                  dojo.attr(menuitem, "aria-labelledby", "bc_document_node");
              }
              if (item.type)
                  dojo.attr(menuitem, "persontype", item.type);

              return menuitem;
          },

          //We only override this function so that we can make it insert options before searchButton
          //  instead of before nextButton, and also to conditionally display the search button
          createOptions: function(results, dataObject, labelFunc){
              dojo.publish("lconn/core/typeahead/open");
              // Clear existing result nodes
              this.clearResultList();

              this.items = results;

              //this._dataObject=dataObject;
              //this._dataObject.onComplete=dojo.hitch(comboBox, comboBox._openResultList);
              // display "Previous . . ." button
              if (!dataObject.start || dataObject.start == 0) {
                 this.previousButton.style.display = "none";
              }
              else {
                 this.previousButton.style.display = "";
                 dojo.removeAttr(this.previousButton, "tabindex");
              }
              dojo.attr(this.previousButton, "id", this.id + "_prev");

              if (this.HeaderMessage) {
                 var el = this.headerNode;
                 while (el.firstChild) el.removeChild(el.firstChild);
                 el.appendChild(document.createTextNode(this.HeaderMessage));
                 el.setAttribute("id", this.id + "_headerMessage");
                 el.setAttribute("item", this.HeaderMessage);
                 this.domNode.setAttribute("aria-describedby", this.id + "_headerMessage");
                 dojo.removeClass(el, "lotusHidden");
                 if (!dojo._isBodyLtr()) {
                    dojo.addClass(el, "dijitMenuItemRtl");
                 }
              }

              // create options using _createOption function defined by parent
              // ComboBox (or FilteringSelect) class
              // #2309:
              //      iterate over cache nondestructively
              var pageStart = dataObject.start || 0;
              var pageEnd = pageStart + (dataObject.count || 0);
              dojo.forEach(results, function(item, i){
                 if (dataObject.count && (i < pageStart || i >= pageEnd)){
                     return;
                  }
                  var menuitem = this._createOption(item, labelFunc);
                  var text = menuitem.innerHTML;
                  if(results[i].userid == "null" && results[i].type == -1){
                     while (menuitem.firstChild) menuitem.removeChild(menuitem.firstChild);
                     menuitem.appendChild(document.createTextNode(text));
                     menuitem.item = text;
                     this.resultsNode = menuitem;
                  }else{
                     dojo.attr(menuitem, "id", this.id + i);
                     menuitem.className = dojo._isBodyLtr() ? "dijitMenuItem" : "dijitMenuItem dijitMenuItemRtl";                     
                     // index to this.items; use indirection to avoid mem leak
                     menuitem.setAttribute("item", i);
                  }
                  dojo.style(menuitem, "overflow", "hidden");
                  // Removed aria-label for defect 69657, aria-describedby read 
                  // only if no other aria-label attribute exists.
                  //dojo.attr(menuitem, "aria-label", item.name);
                  this.domNode.insertBefore(menuitem, this.nextButton);
              }, this);

              // display "Next . . ." button
              this.nextButton.style.display = (dataObject.count && pageEnd < results.length) ? "" : "none";
              dojo.attr(this.nextButton,"id", this.id + "_next");

              // INSERT: Added a message node to display when there are no results
              var el = this.resultsNode;
              if (results.length == 0 && this.NoResultsMessage) {
                 var noResultsMsg = dojo.string.substitute(this.NoResultsMessage, [dataObject.query]);
                 while (el.firstChild) el.removeChild(el.firstChild);
                 el.appendChild(document.createTextNode(noResultsMsg));
                 el.item = noResultsMsg;
                 this.domNode.insertBefore(el, this.nextButton);
              }
              //give an ID for a11y
              dojo.attr(this.resultsNode, "id", this.id + "_resultsNode");

              // INSERT: Add a search directory button if we haven't already searched
              if (!dataObject.queryOptions.searchDirectory && dataObject.searchType != "directory") {
                 this.domNode.insertBefore(this.searchButton, this.nextButton);
              }
              
              // If Use Full search button is showing, don't display next button
              if(lconn.core.config.properties['people.legacytypeahead.navigation'] == "true"){
            	  if(this.searchButton.isConnected == true){
            		  this.nextButton.style.display = "none";
            	  }
              }
              
              //give an ID for a11y
              dojo.attr(this.searchButton, "id", this.id + "_searchDir");
              if (!dojo._isBodyLtr()) dojo.addClass(this.searchButton, "dijitMenuItemRtl");
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
             return this.domNode.childNodes.length - 2 - (this.searchButton.parentNode ? 1 : 0) - (this.resultsNode.parentNode ? 1 : 0) - (this.headerNode.parentNode ? 1 : 0);
          },

          showTooltip: function(id,node,html){
              //Make sure that this is the tooltip we're supposed to show.
              //This prevents a tooltip from showing if we've already requested a new one
              if (node.parentNode && node.parentNode.parentNode && node.parentNode.parentNode.style.display === 'none') { // extra check as the showTooltip is called with some delay
                 this.popupClosed = true;
              }
              if (id == this.tooltipId && !this.popupClosed) {
                  this.tooltipAroundNode = node;
                  dijit.showTooltip(html, node, ['after', 'before']);

                  // Remove the wairole/role "alert" from tooltip, bizcard should not interrupt what is already being spoken.
                  dijit._masterTT.containerNode.removeAttribute("wairole");
                  dijit._masterTT.containerNode.removeAttribute("role");
                  this.inputWidget._announceOption(node);
              dojo.publish("com/ibm/social/incontext/typeahead/onMiniBizCardDisplay", [html]);

              //put focus on the link in bizcard
              var a = dojo.query("a", "cardBody")[0];
              if (a) {
                 //this.tooltipFocused = true;
                 //a.focus();

                 //if focus leave bizcard and is NOT on people typeahead input, close people typeahead menu
                 this.connect(a, "onblur", dojo.hitch(this, function(){
                    this.tooltipFocused = false;
                    var iw = this.inputWidget;
                    setTimeout(function(){
                       if (!(iw && iw.focused)) {
                          iw._hideResultList();
                       }
                    }, 100);
                 }));

                 dojo.connect(a, "onkeypress", dojo.hitch(this, function(evt){
                    var key = evt.charOrCode;
                    var dk = dojo.keys;
                    var iw = this.inputWidget;
                    switch(key){
                       //if press ESC key, close bizcard, move focus to people typeahead input
                       case dk.ESCAPE:
                          this.closeTooltip();
                             if(iw && iw.domNode){
                                iw.domNode.focus();
                          }
                          break;
                       case dk.TAB:
                           if(iw && iw.domNode){
                              iw.domNode.focus();
                          }
                          dojo.stopEvent(evt);
                          break;
                    }
                 })
                 );
              }
              }
          },

          closeTooltip: function() {

             if ( this.tooltipAroundNode ) {
                dijit.hideTooltip(this.tooltipAroundNode);
                this.tooltipAroundNode = null;
             }
             if ( this.tooltipTimeout ){
                clearTimeout(this.tooltipTimeout);
                this.tooltipTimeout = null;
             }
          },

 			onPage: function( /*Number*/ direction) {
             // summary:
             //    Notifies ComboBox/FilteringSelect that user clicked to advance to next/previous page.
             // tags:
             //    callback
             this.debugLog("Entered PeopleTypeAhead onPage: direction = " + direction);
             this.debugLog("Left PeopleTypeAhead onPage");
          },
          
          onClose:function(){
             dojo.publish("lconn/core/typeahead/close");
             this.popupClosed = true;
             this.closeTooltip();
             this._blurOptionNode();
          }
      }
  );
