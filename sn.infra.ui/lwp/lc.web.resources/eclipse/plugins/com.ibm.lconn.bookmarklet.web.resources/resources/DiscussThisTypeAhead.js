/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.bookmarklet.DiscussThisTypeAhead");

dojo.require("lconn.core.TypeAhead");
dojo.require("dojo.io.iframe");
dojo.require('lconn.core.util.dojoPatches');
dojo.require("lconn.bookmarklet.Res");
dojo.requireLocalization("lconn.bookmarklet", "strings");

dojo.declare("lconn.bookmarklet.DiscussThisTypeAhead", [lconn.core.TypeAhead], {
	multipleValues: false,
    NoResultsMessage: '',
	inputClass: '',
	communitiesUrl: '',
	forumsUrl: '',
	authErrorCallback: null,
	
	postMixInProperties: function() {
       this.inherited(arguments);
       this.baseClass = this.inputClass;
       dojo.mixin(this, {_lang:dojo.i18n.getLocalization('lconn.bookmarklet', 'strings')});
       this.hintText = this._lang.forumNameHint;
    },
    
    postCreate: function() {
    	this.inherited(arguments);
    	dojo.attr(this.domNode, {'aria-required':'true'});
    },
    
	//Convenience function to return the item or null if there isn't one.
    getItem: function() {
        return ( this.item ? this.item : null );
    },
    formatItem: function(item, html) {
    	if (html) {
    		var title = this._escapeHtml(item.title)
    		return title;
    	
    	} else
    		return item.title;
    },
    
    _startSearchFromInput:function() {
    	this.preSearch();
    	this.inherited(arguments);
    },

    _getMenuLabelFromItem:function(/*Item*/ item){
        // lconn.core: we don't use labelFunc
        var label = this.formatItem(item, true);
        var key = '';
        
        if(this.multipleValues)
            key = dojo.string.trim(this.keyArr[this.keyIdx]);
        else
            key = dojo.string.trim(this.focusNode.value);
            
        //Escape html chars in key and label
        key = this._escapeHtml(key);
        
        var labelLower = label.toLowerCase();
        var keyLower = key.toLowerCase();
        
        var startIdx = 0;
        var match = null;
        
        // Originally changed from Files:
        //    Changed algorithm to highlight matches that are not substring (i.e. typing "derek carr" 
        //    does not highlight the "carr" in "DEREK W. CARR" because of the "W."). Also appending
        //    to an array and then calling join is more efficient than string concatenation.
        var keySegments = keyLower.split(/\s/);
        var sbf = [];
        for (var i=0; i<keySegments.length;i++) {
            var s = keySegments[i];
            var match = labelLower.indexOf(s, startIdx);
            if (match != -1) {
               sbf.push(label.substring(startIdx, match));
               sbf.push("<b>");
               sbf.push(label.substring(match, match + s.length));
               sbf.push("</b>");
               startIdx = match + s.length;
            }
         }
         sbf.push(label.substring(startIdx));
         return {html: true, label: sbf.join("")};
	},
	preSearch:function() {
		
	},	
	onSelect: function(item) {
	},
	_openResultList: function(/*Object*/ results, /*Object*/ dataObject){
		if (results.status == 401) {
			this.authErrorCallback();
			return;
		}
        this._fetchHandle = null;
         if( !this.domNode || // lconn.core: don't reveal results list if node has been destroyed
             this.disabled || 
             this.readOnly || 
             (dataObject.query != this._lastQuery)
         ){
             return;
         }
         this._popupWidget.clearResultList();
         if (!results.entry.length && (this.hideEmptyResults || dataObject.hideEmptyResults)) {
             this._hideResultList();
             return;
         } 

         // Fill in the textbox with the first item from the drop down list,
         // and highlight the characters that were auto-completed. For
         // example, if user typed "CA" and the drop down list appeared, the
         // textbox would be changed to "California" and "ifornia" would be
         // highlighted.

         dataObject._maxOptions = this._maxOptions;
         var nodes = this._popupWidget.createOptions(
             results.entry, 
             dataObject, 
             dojo.hitch(this, "_getMenuLabelFromItem")
         );

         // show our list (only if we have content, else nothing)
         this._showResultList();
         dojo.query("#typeahead_popup").style({ "overflow": "auto","overflow-x": "hidden"});
     },
     
     _startSearch: function(key){
         var popupId = this.id + "_popup";
         var inputWidth = dojo.query("#typeahead").style("width"); // forum name input width
         if(!this._popupWidget){
             this._popupWidget = this.dropDown = new lconn.bookmarklet.DiscussThisTypeAheadMenu({
                 onChange: dojo.hitch(this, this._selectOption),
                 communitiesUrl: this.communitiesUrl,
             	 forumsUrl: this.forumsUrl,
                 id:popupId,
                 inputWidth: inputWidth
             });
             dijit.removeWaiState(this.focusNode,"activedescendant");
             dijit.setWaiState(this.textbox,"owns",popupId); // associate popup with textbox
         }else {
             dijit.setWaiState(this.focusNode, "activedescendant", popupId);
          }
         // create a new query to prevent accidentally querying for a hidden
         // value from FilteringSelect's keyField
         var query = dojo.clone(this.query); // #5970
         this._lastInput = key; // Store exactly what was entered by the user.
         this._lastQuery = query = key;
         // #5970: set _lastQuery, *then* start the timeout
         // otherwise, if the user types and the last query returns before the timeout,
         // _lastQuery won't be set and their input gets rewritten
         this.searchTimer=this.defer(dojo.hitch(this, function(query, _this){
             if (this.searchTimer){
                 this.searchTimer.remove();
                 this.searchTimer = null;
             }
             var dataObject=this.store.fetch({
                 queryOptions: {
                     ignoreCase:this.ignoreCase, 
                     deep:true
                 }, 
                 query: query, 
                 onComplete:dojo.hitch(this, "_openResultList"), 
                 onError: function(errText){
                     console.error('lconn.bookmarklet.DiscussThisTypeAhead: ' + errText);
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
         }, query, this), this.searchDelay);
     }
});

dojo.declare("lconn.bookmarklet.DiscussThisTypeAheadMenu", [dijit.form._ComboBoxMenu, lconn.bookmarklet.Res], {
	forumsUrl: '',
	communitiesUrl: '',
	communityForum: '',
	inputWidth: null,
	templateString: [
	                 '<ul class="dijitReset dijitMenu" data-dojo-attach-point="containerNode" tabIndex="-1" style="overflow:auto;overflow-x: hidden;max-height:250px;width:${inputWidth}px">',
	                 	'<li class="dijitMenuItem dijitMenuPreviousButton" data-dojo-attach-point="previousButton" waiRole="option"></li>',
	                 	'<li class="dijitMenuItem lotusHidden" data-dojo-attach-point="template" waiRole="option">',
	                 		'<img width="24" height="24" data-dojo-attach-point="templateImg"/>',
	                 		'<span class="templateSpan" data-dojo-attach-point="templateName" style="margin-left: 5px;"></span>',
	                 		'<span class="lotusMeta lotusItalic" style="margin-left: 5px; font-size:0.8em; margin-right: 5px;" data-dojo-attach-point="templateCommunityForum"></span>',
	                 	'</li>',
	                 	'<li class="dijitMenuItem dijitMenuNextButton" data-dojo-attach-point="nextButton" waiRole="option"></li>',
	                 '</ul>'
					].join(''),
					
	postMixInProperties: function() {
		var res = new lconn.bookmarklet.Res();
		res.loadDefaultBundle();
		var b = res.resBundle;
		this.communityForum = b["communityForum"];
		this.inherited("postMixInProperties", arguments);
	},
	
	_createOption: function(/*Object*/ item, labelFunc){
		// summary: creates an option to appear on the popup menu
		// subclassed by FilteringSelect
		var labelObject=labelFunc(item);
		if (item.communityUuid == "") {
			this.templateImg.className = "iconsComponentsGray24 iconsComponentsGray24-ForumsGray24";
			this.templateImg.src = dojo.config.blankGif;
			this.templateCommunityForum.innerHTML = "";
		}
		else {
			this.templateImg.src = this.communitiesUrl + "/service/html/image?communityUuid=" + item.communityUuid;
			this.templateCommunityForum.innerHTML = this.communityForum;
		}
		this.templateName.innerHTML = labelObject.label;
		var menuitem = dojo.clone(this.template);
		dojo.removeClass(menuitem, "lotusHidden");
	    menuitem.item = item;
	    return menuitem;
	}
});

