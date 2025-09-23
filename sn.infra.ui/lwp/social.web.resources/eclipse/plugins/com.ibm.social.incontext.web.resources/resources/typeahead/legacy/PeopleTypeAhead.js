/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
author: Ryan Silva

*/

dojo.provide("com.ibm.social.incontext.typeahead.legacy.PeopleTypeAhead");

dojo.require("com.ibm.social.incontext.typeahead.legacy.TypeAhead");
dojo.require("dijit.form.ComboBox");
dojo.require('dijit.Tooltip');

dojo.declare(
    "com.ibm.social.incontext.typeahead.legacy.PeopleTypeAhead",
    [com.ibm.social.incontext.typeahead.legacy.TypeAhead],
    {
    	size: "",
		pageSize: 15,
		multipleValues: false,
        templateString: null,
        templatePath: dojo.moduleUrl("com.ibm.social.incontext", "typeahead/legacy/templates/ComboBox.html"),
        
        postMixInProperties: function() {
           this.inherited(arguments);
           
           // Init with Files strings in case we're used directly, like in the Add Files to Folder action
           this._strings = this._strings || dojo.i18n.getLocalization("com.ibm.social.incontext", "socialInContextCoreStrings").USERSEARCH;
        },
        
        //Convenience function to return the item or null if there isn't one.
        getItem: function() {
            return ( this.item ? this.item : null );
        },
        
        formatItem: function(item, html) {
            var str = "";
            
            if (typeof item == "string")
               return html ? this._htmlify(item) : item;
            if (!item || !item.name)
               return str;
            
            //If there's a comma in the name and there aren't already quotes around the name, then we'll surround the name in quotes
            if(item.name.indexOf(',') != -1 && item.name.length > 1 && item.name[0] != '"' && item.name[item.name.length-1] != '"') {
                if (html) {
                    str += '&quot;' + this._htmlify(item.name) + '&quot;';
                }
                else {
                    str += '"' + item.name + '"';
                }
            } else {
                if ( html ) {
                    str += this._htmlify(item.name );
                }
                else {
                    str += item.name;
                }
            }
           
            if ( item.member ){
                var dirChar = (dojo._isBodyLtr() ? "" : "\u200F"); // prepend the text with a Unicode directional cue when RTL 
                if (html) {
                    str += ' ' + dirChar + '&lt;' + this._htmlify(item.member) + dirChar + '&gt;';
                } else {
                    str += ' ' + dirChar + '<' + item.member + dirChar + '>';
                }
            }

            if (item.userState == 'inactive') {
   				str += ' ';
   				str += this._strings.INACTIVE;
            }
            
            return str;
        },

        _htmlify: function(str) {
            return str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
        },
     
        _startSearch: function(/*String*/ key, opt) {

            opt = opt || {};
            
            if(!this._popupWidget){
                var popupId = this.id + "_popup";
                this._popupWidget = this.dropDown = new com.ibm.social.incontext.typeahead.legacy.PeopleTypeAheadMenu({
                    _strings: this._strings,
                    onChange: dojo.hitch(this, this._selectOption),
                    id:popupId
                });
                dijit.removeWaiState(this.focusNode,"activedescendant");
                dijit.setWaiState(this.textbox,"owns",popupId); // associate popup with textbox
            }
            
            // create a new query to prevent accidentally querying for a hidden
            // value from FilteringSelect's keyField
            this.item = null; // #4872
            var query = dojo.clone(this.query); // #5970
            this._lastInput = key; // Store exactly what was entered by the user.
            this._lastQuery = query = key;
            // #5970: set _lastQuery, *then* start the timeout
            // otherwise, if the user types and the last query returns before the timeout,
            // _lastQuery won't be set and their input gets rewritten
            //console.log("setTimeout: " + this.searchTimer);
            
            this.searchTimer=this.defer(dojo.hitch(this, function(query, _this){
                //console.log("FETCHING");
                var fetch = {
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
                };
                dojo.mixin(fetch, _this.fetchProperties);
                var dataObject = _this.store.fetch(fetch);
                
                var nextSearch = function(dataObject, direction){
                    dataObject.start += dataObject.count*direction;
                    // #4091:
                    //      tell callback the direction of the paging so the screen
                    //      reader knows which menu option to shout
                    dataObject.direction = direction;
                    this.store.fetch(dataObject);
                };
                this._nextSearch = this._popupWidget.onPage = dojo.hitch(this, nextSearch, dataObject);
                this._popupWidget.searchDirectory=dojo.hitch(this, dojo.hitch(this, function() {
                    this._startSearch(key, {searchDirectory:true});
                }));
                
            }, query, this), opt.searchImmediately ? 1 : this.getSearchDelay(query));
        }
    }
);


dojo.declare(
    "com.ibm.social.incontext.typeahead.legacy.PeopleTypeAheadMenu",
    [dijit.form._ComboBoxMenu],

    {
        rs_searchDirectory: '',
        
        templateString: "<ul class='dijitReset dijitMenu'  data-dojo-attach-point='containerNode' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut' waiRole='listbox' tabIndex='-1' style='overflow:\"auto\";'>"
                +"<li class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></li>"
                +"<li class='dijitMenuItem resultsNode' dojoAttachPoint='resultsNode'></li>"
                +"<li class='dijitMenuItem searchDirectory' dojoAttachPoint='searchButton'>${_strings.SEARCH_DIRECTORY}</li>"
                +"<li class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></li>"
                +"</ul>",
        _messages: null,
        
        tooltipAroundNode: null,    //Node that the tooltip is centered around
        tooltipTimeout: null,       //Return value of setTimeout()
        tooltipDelay: 600,          //Time to delay before showing tooltip
        tooltipId: 0,               //Counter used for the tooltips to make sure only the latest one gets drawn
        
        popupClosed: true,          //A flag for the tooltip.  We set to false in _focusOptionNode (when an option
                                    //  is highlighted).  If the menu is closed, set to true.  This way, a tooltip
                                    //  won't show itself if the menu has been closed.
                                    //This flag is not a test for whether the type ahead menu is open.
        
        postCreate:function(){
            this.searchButton.selectHandler = dojo.hitch(this, function(evt) {
            	dojo.stopEvent(evt);
            	this.searchDirectory();
            	return true; // Return true to skip the rest of the default behavior
            });
            
            this.resultsNode.selectHandler = dojo.hitch(this, function(evt) {
            	dojo.stopEvent(evt);
            	return true; // Return true to skip the rest of the default behavior
            });
            
            this.inherited("postCreate", arguments);
        },
        
        searchDirectory: function() {},
        
        _setValueAttr: function(/*Object*/ value){
            // INSERT: removed conditional check for " && parseInt(value.target.item.type) >= 0" from IF
            if ( value.target.item ) {
                this.value = value;
                this.onChange(value);
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
        
        //We only override this function so that we can make it insert options before searchButton
        //  instead of before nextButton, and also to conditionally display the search button
        createOptions: function(results, dataObject, labelFunc){

            // Clear existing result nodes
            this.clearResultList();

            this.items = results;
            
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
                menuitem.className = "dijitMenuItem lotusHideOverflow";
                menuitem.setAttribute("item", i);   // index to this.items; use indirection to avoid mem leak
                dojo.attr(menuitem, "id", this.id + i);
                this.domNode.insertBefore(menuitem, this.nextButton);
            }, this);
            
            // display "Next . . ." button
            this.nextButton.style.display = (dataObject.count && dataObject.count < results.length) ? "" : "none";
            dojo.attr(this.nextButton,"id", this.id + "_next");

            // INSERT: Added a message node to display when there are no results
            var el = this.resultsNode;            
            if (results.length == 0) {
               var noResultsMsg = dojo.string.substitute(this._strings.NO_RESULTS, [dataObject.query]);
               while (el.firstChild) el.removeChild(el.firstChild);
               el.appendChild(document.createTextNode(noResultsMsg));
               el.item = noResultsMsg;
               el.selectHandler = function() {return false};
               this.domNode.insertBefore(el, this.nextButton);
            }
            
            // INSERT: Add a search directory button if we haven't already searched
            if (!dataObject.queryOptions.searchDirectory && dataObject.searchType != "directory") {
               this.domNode.insertBefore(this.searchButton, this.nextButton);
            }
        },
        
        _onMouseUp:function(/*Event*/ evt){
            if(evt.target==this.searchButton)
                this.searchDirectory();
            else if(evt.target!=this.resultsNode)
                this.inherited("_onMouseUp", arguments);
        },
        
        _onMouseOver:function(/*Event*/ evt){
            if(evt.target === this.domNode){ return; }
            var tgt=evt.target;
            if(!(tgt==this.previousButton||tgt==this.nextButton||tgt==this.searchButton||tgt==this.resultsNode)){
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
           },
        
        _focusOptionNode:function(/*DomNode*/ node){
            if(this._highlighted_option != node){
                
                var userid = dojo.attr(node, "exid");
                
                
                //Only for testing
                //userid = 'e7831a40-8f0a-1028-88f0-db07163b51b2';
                
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
                
                if ( userid && window.lconn && lconn.profiles && lconn.profiles.bizCard.bizCard.renderMiniBizCard ) {
                    this.tooltipTimeout = setTimeout(
                        dojo.hitch(this, "renderBizCard", userid, dojo.hitch(this, "showTooltip", this.tooltipId, node)),
                        this.tooltipDelay
                    );
                }
            }
        },
        renderBizCard: function(userId, fn) {
            if ( userId && window.lconn && lconn.profiles && lconn.profiles.bizCard.bizCard.renderMiniBizCard ) {
                lconn.profiles.bizCard.bizCard.renderMiniBizCard(userId, fn);
            }
        },
        showTooltip: function(id,node,html){
            //Make sure that this is the tooltip we're supposed to show.
            //This prevents a tooltip from showing if we've already requested a new one
            if ( id == this.tooltipId && !this.popupClosed) {
                this.tooltipAroundNode = node;
                dijit.showTooltip(html, node, ['after', 'before']);
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
        
        onClose:function(){
            this.popupClosed = true;
            this.closeTooltip();
            this._blurOptionNode();
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
            return this.domNode.childNodes.length - 2 - (this.searchButton.parentNode ? 1 : 0) - (this.resultsNode.parentNode ? 1 : 0);
        }
    }
);
