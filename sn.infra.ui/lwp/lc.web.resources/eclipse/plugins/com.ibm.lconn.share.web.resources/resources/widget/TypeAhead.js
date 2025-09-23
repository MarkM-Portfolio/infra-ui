/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.TypeAhead");

dojo.require("lconn.share.legacytypeahead.TypeAhead");
dojo.require("dijit.form.ComboBox");
dojo.require("lconn.share.util.text");
dojo.declare("lconn.share.widget.TypeAhead", [lconn.share.legacytypeahead.TypeAhead], {
   
   className: "lotusText",

   size: "",
   pageSize: 15,
   
   templateString: null,
   templatePath: dojo.moduleUrl("lconn.share", "widget/templates/TypeAhead.html"),
   
   multipleValues: false,
   hasDownArrow: false,
   minChars: 2,
   searchDelay: 400,

   nameAttr:'name',
   
   searchOpts: null,
   
   postMixInProperties: function() {
      if (dojo.version.minor > 5)
         delete this.hasDownArrow;
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
   
   _hideResultList: function() {
      if (dojo.version.minor > 5) {
         this.closeDropDown(true);
         return;
      }
      this.inherited(arguments);
   },
   
   _hideResultList: function() {
      if (dojo.version.minor > 5) {//API update since dojo 1.6
         this.closeDropDown(true);
         return;
      }
      this.inherited(arguments);
   },
   
   _startSearch: function(/*String*/ key, overrides) {
      var opt = {};
      if(this.searchOpts)
         opt = dojo.mixin(opt, this.searchOpts);
      if(overrides)
         opt = dojo.mixin(opt, overrides);

      if(!this._popupWidget){
          var popupId = this.id + "_popup";
          this._popupWidget = this.dropDown = new lconn.share.widget.TypeAheadMenu({
              _strings: this._strings,
              onChange: dojo.hitch(this, this._selectOption),
              decorateItem: dojo.hitch(this, this.decorateItem),
              id:popupId
          });
          dijit.removeWaiState(this.focusNode,"activedescendant");
          dijit.setWaiState(this.textbox,"owns",popupId); // associate popup with textbox
          
          if (this.popupClassName) {
             dojo.addClass(this.dropDown.domNode, this.popupClassName);
          }
      }
         
      // create a new query to prevent accidentally querying for a hidden
      // value from FilteringSelect's keyField
      this.item = null; // #4872
      var query = dojo.clone(this.query); // #5970
      this._lastQuery = query = key;
      // #5970: set _lastQuery, *then* start the timeout
      // otherwise, if the user types and the last query returns before the timeout,
      // _lastQuery won't be set and their input gets rewritten
      if (this.searchTimer)
         (dojo.version.minor >= 9) ? this.searchTimer.remove() : clearTimeout(this.searchTimer);
         
      var deferredAction = dojo.hitch(this, function(query, _this){
         var dataObject=this.store.fetch({
            queryOptions: dojo.mixin({
                ignoreCase:this.ignoreCase, 
                deep:true
            }, opt), 
            query: query, 
            onComplete:dojo.hitch(this, "_openResultList"), 
            onError: function(errText){
                //console.error('dijit.form.ComboBox: ' + errText);
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
        
      }, query, this);
      var deferredTime = opt.searchImmediately ? 1 : this.searchDelay;
      
      this.searchTimer = (dojo.version.minor >= 9) ? this.defer(deferredAction, deferredTime) : setTimeout(deferredAction, deferredTime);
   },
   
   /** If the typeahead does not have the focus we should not allow the result list to be opened */
   _openResultList: function() {
      if (!this._focused)
         return;
      return this.inherited(arguments);
   }
});


dojo.declare("lconn.share.widget.TypeAheadMenu", [dijit.form._ComboBoxMenu], {
     templateString: "<ul role='listbox' class='dijitReset dijitMenu lotusui30dojo' dojoAttachPoint='containerNode' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut' tabIndex='-1' style='overflow:\"auto\";'>"
             +"<li class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></li>"
             +"<li class='dijitMenuItem dijitMenuItemRtl resultsNode' dojoAttachPoint='resultsNode'></li>"
             +"<li class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></li>"
             +"</ul>",
     _messages: null,
     
     postCreate:function(){
         this.resultsNode.selectHandler = dojo.hitch(this, function(evt) {
         	dojo.stopEvent(evt);
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
         if(!(tgt==this.previousButton||tgt==this.nextButton||tgt==this.resultsNode)){
             // while the clicked node is inside the div
             while(!tgt.item){
                 // recurse to the top
                 tgt=tgt.parentNode;
             }
         }
         this._focusOptionNode(tgt);
     },        
  // lconn.core: use dijitMenuItemHover
     _blurOptionNode:function(){
        // summary:
        // removes highlight on highlighted option
        if(this._highlighted_option){
           dojo.removeClass(this._highlighted_option, "dijitMenuItemHover");
           this._highlighted_option = null;
        }
        this.inherited(arguments);
     },
     
     _focusOptionNode:function(/*DomNode*/ node){
         if(this._highlighted_option != node){
            this._blurOptionNode();
            this._highlighted_option = node;
            dojo.addClass(this._highlighted_option, "dijitMenuItemHover");
         }
         this.inherited(arguments);
     },
     //We only override this function so that we can make it insert options before searchButton
     //  instead of before nextButton, and also to conditionally display the search button
     createOptions: function(results, dataObject, labelFunc){
         dojo.publish("lconn/core/typeahead/open");

         // Clear existing result nodes
         this.clearResultList();

         //this._dataObject=dataObject;
         //this._dataObject.onComplete=dojo.hitch(comboBox, comboBox._openResultList);
         // display "Previous . . ." button
         this.previousButton.style.display = (!dataObject.start || dataObject.start == 0) ? "none" : "";
         dojo.attr(this.previousButton, "id", this.id + "_prev");

         // create options using _createOption function defined by parent
         // ComboBox (or FilteringSelect) class
         // #2309:
         //      iterate over cache nondestructively
            dojo.forEach(results, function(item, i){
                if (dataObject.count && i >= dataObject.count)
                    return;
 
                var menuitem = this._createOption(item, labelFunc);
                menuitem.className = this.isLeftToRight() ? "dijitMenuItem" : "dijitMenuItem dijitMenuItemRtl";
             dojo.attr(menuitem, "id", this.id + i);

             if (this.decorateItem)
                this.decorateItem(menuitem, item);
             this.domNode.style.width = "";
             this.domNode.insertBefore(menuitem, this.nextButton);
         }, this);

         // display "Next . . ." button
         this.nextButton.style.display = (dataObject.count && dataObject.count < results.length) ? "" : "none";
         dojo.attr(this.nextButton,"id", this.id + "_next");

         // INSERT: Added a message node to display when there are no results
         var el = this.resultsNode;            
         if (results.length == 0) {
            var noResultsMsg = lconn.share.util.text.trimToLength(dojo.string.substitute(this._strings.NO_RESULTS, [dataObject.query]), 55);
            while (el.firstChild) el.removeChild(el.firstChild);
            el.appendChild(document.createTextNode(noResultsMsg));
            el.item = noResultsMsg;
            this.domNode.insertBefore(el, this.nextButton);
         }
     },
     
     _createOption:function(/*Object*/ item, labelFunc){
        // summary: creates an option to appear on the popup menu
        // subclassed by FilteringSelect
        var labelObject=labelFunc(item);
        
        var menuitem = document.createElement("li");
        
        dijit.setWaiRole(menuitem, "option");
        
        if ( item.userid )
            dojo.attr(menuitem, "exid", item.userid);
        
        if (labelObject.html) {
            menuitem.innerHTML = labelObject.label;
        }
        else {
            menuitem.appendChild(document.createTextNode(labelObject.label));
        }
        
        // #3250: in blank options, assign a normal height
        if(menuitem.innerHTML==""){
            menuitem.innerHTML="&nbsp;";
        }
        menuitem.item=item;
        return menuitem;
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
     
     onClose:function() {
        dojo.publish("lconn/core/typeahead/close");
        this.inherited(arguments);
     }
});
