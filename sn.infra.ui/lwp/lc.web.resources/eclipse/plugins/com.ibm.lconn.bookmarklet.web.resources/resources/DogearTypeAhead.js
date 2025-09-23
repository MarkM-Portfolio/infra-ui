/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.bookmarklet.DogearTypeAhead");

dojo.require("dijit.form.ComboBox");
dojo.require("lconn.bookmarklet.Res");
dojo.require("lconn.core.TypeAhead");

dojo.declare(
    "lconn.bookmarklet.DogearTypeAhead",
    [lconn.core.TypeAhead],
    {
        // minChars: number
        //      The number of characters that need to be typed before doing a search
        minChars: 1,
        
        //multipleValues: bool
        //      Sets whether or not this type-ahead should support multiple values.
        //      If true, then typing a token (usually comma) will cause the type-ahead
        //      to reset and begin searching for a new name. 
        multipleValues: true,
        
        // token: string
        //      The character to split all the names by in the text box.
        //      Only used if multipleValues is true.
        token: '',
        
        autoComplete: false,
        
        submitFormOnKey: false,
      
      	_caretPos:0,
      
      	postCreate: function(){
      		if (initStoreUrl){
      			initStoreUrl();
      		}
      		this.inherited("postCreate", arguments);
      	},
      	
        _openResultList: function(/*Object*/ results, /*Object*/ dataObject){
            
            if( this.disabled || 
                this.readOnly || 
                (dataObject.query != this._lastQuery)
            ){
                return;
            }
            this._popupWidget.clearResultList();
            if(!(results.length || results.tagcounts.length)){
                this._hideResultList();
                return;
            } 

            // Fill in the textbox with the first item from the drop down list,
            // and highlight the characters that were auto-completed. For
            // example, if user typed "CA" and the drop down list appeared, the
            // textbox would be changed to "California" and "ifornia" would be
            // highlighted.
			
            var zerothvalue = "";
            if (results.tagcounts){
            	zerothvalue = new String(this.formatItem(results.tagcounts[0].tag));
            }else {
            	zerothvalue = new String(this.formatItem(results[0]));
            }
            if(zerothvalue && this.autoComplete && !this._prev_key_backspace &&
                (dataObject.query != "")){
                // when the user clicks the arrow button to show the full list,
                // startSearch looks for "*".
                // it does not make sense to autocomplete
                // if they are just previewing the options available.
                this._autoCompleteText(zerothvalue);
            }
            this._popupWidget.createOptions(
                results, 
                dataObject, 
                dojo.hitch(this, "_getMenuLabelFromItem")
            );

            // show our list (only if we have content, else nothing)
            this._showResultList();

            // #4091:
            //      tell the screen reader that the paging callback finished by
            //      shouting the next choice
            if(dataObject.direction){
                this._popupWidget.highlightFirstOption();
                this._announceOption(this._popupWidget.getHighlightedOption());
            }
        },
		
		_startSearchFromInput: function(){
            //We need to split the string by "," and then do a search on the name 
            //  where the cursor currently resides
            var currentInput = this.focusNode.value;
            var searchString = currentInput;
            if(this.multipleValues) {
                this.keyArr = currentInput.split(this.token);
                this.caretPos = this._getCaretPos(this.focusNode);
                //The index associated with the name in keyArr which is currently being typed
                //  is equal to the number of tokens preceding the cursor.
                this.keyIdx = this._numTokensPreceding(currentInput, this.caretPos);
                
                searchString = this.keyArr[this.keyIdx];
            }
                
            
            //Trim white-space from the beginning and end of searchString
            searchString = dojo.string.trim(searchString);
            
            //Only search if the searchString is at least minChars long
            if(searchString.length >= this.minChars)
                this._startSearch(searchString);
            else
                this._hideResultList();
            this._caretPos = this._getCaretPos(this.focusNode);
        },
		
		_announceOption: function(/*Node*/ node){
            // summary:
            //      a11y code that puts the highlighted option in the textbox
            //      This way screen readers will know what is happening in the
            //      menu
            
            if(node == null){
                return;
            }
            // pull the text value from the item attached to the DOM node
            var newValue;
            if( node == this._popupWidget.nextButton ||
                node == this._popupWidget.previousButton ||
                node == this._popupWidget.searchButton){
                newValue = node.innerHTML;
            }else{
            	if(node.item&&isNaN(node.item)){
            		if (node.item.tag){
                		newValue = this.formatItem(node.item.tag)
                	}else {
     	               newValue = this.formatItem(node.item);
     	             }
            	}else{
            		newValue=this.formatItem(node.innerText);
            	}
            	
            }
            
            // get the text that the user manually entered (cut off autocompleted text)
            if ( this.multipleValues ) {
                var cpos = this._caretPos;
                var inputKeys = this.focusNode.value.split(this.token);
                var count = this._numTokensPreceding(this.focusNode.value, cpos);
                
                var q = this._lastQuery;
                
                if ( this.multipleValues && this.token != ' ' && count > 0 )
                    q = ' ' + q;
                    
                inputKeys[count] = q;
                
                this.focusNode.value = inputKeys.join(this.token);
            }
            else
                this.focusNode.value = this.focusNode.value.substring(0, this._getCaretPos(this.focusNode));
            
            this._setCaretPos(this.focusNode, cpos);
            
            //this.focusNode.value = this.focusNode.value.substring(0, this._getCaretPos(this.focusNode));
            //set up ARIA activedescendant
            dijit.setWaiState(this.focusNode, "activedescendant", dojo.attr(node, "id")); 
            // autocomplete the rest of the option to announce change
            this._autoCompleteText(newValue);
        },
		
		_doSelect: function(evt){
			var tgt = evt.target;
			if (tgt == null) return;
            var newValue = "";
            if (tgt.item.tag) {
            	newValue = this.formatItem(tgt.item.tag);
            }else {
            	newValue = this.formatItem(tgt.item);
            }
            
            if(this.multipleValues) {
                var oldValue = this.keyArr[this.keyIdx];
                
                this.keyArr[this.keyIdx] = (this.keyIdx != 0 && this.token != ' ' ? ' ' : '') + newValue;
                
                newValue = this.keyArr.join(this.token);
                
                //tokenSpace is token + space if token is not already a space
                var tokenSpace = this.token + (this.token != ' ' ? ' ' : '');
                
                if ( newValue.length >= tokenSpace.length && 
                     newValue.substring(newValue.length-tokenSpace.length) != tokenSpace )
                    newValue += tokenSpace;
            }
            else {
                this.item = tgt.item;
            }
            
			this.setValue(" ", true);
			this._setCaretPos(this.focusNode, 0);
			
			this.defer(dojo.hitch(this, function(){
				this.setValue(newValue, true);
				this._setCaretPos(this.focusNode, newValue.length);
			}), 1);
        },
		
		_showResultList: function() {
           this.inherited(arguments);
           
           // Override to set activedescendant when the popup shows if it doesn't already have one
           var fn = this.focusNode;
           var pw = this._popupWidget;
           if (this._opened && pw && pw.id && !dijit.getWaiState(fn, "activedescendant"))
              dijit.setWaiState(fn, "activedescendant", pw.id);
        },

		_startSearch: function(/*String*/ key){
            if(!this._popupWidget){
                var popupId = this.id + "_popup";
                this._popupWidget = this.dropDown = new lconn.bookmarklet.DogearTypeAheadMenu({
                    onChange: dojo.hitch(this, this._selectOption),
                    id:popupId
                });
				dijit.setWaiRole(this._popupWidget.domNode, "listbox");
                dijit.removeWaiState(this.focusNode,"activedescendant");
                dijit.setWaiState(this.textbox,"owns",popupId); // associate popup with textbox
            }
            // create a new query to prevent accidentally querying for a hidden
            // value from FilteringSelect's keyField
            this.item = null; // #4872
            var query = dojo.clone(this.query); // #5970
            this._lastQuery = query = key;
            // #5970: set _lastQuery, *then* start the timeout
            // otherwise, if the user types and the last query returns before the timeout,
            // _lastQuery won't be set and their input gets rewritten
            this.searchTimer=this.defer(dojo.hitch(this, function(query, _this){
                
                var dataObject=this.store.fetch({
                    queryOptions: {
                        ignoreCase:this.ignoreCase, 
                        deep:true
                    }, 
                    query: query, 
                    onComplete:dojo.hitch(this, "_openResultList"), 
                    onError: function(errText){
                        console.error('lconn.bookmarklet.DogearTypeAhead: ' + errText);
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
        },
		
		_getMenuLabelFromItem:function(/*Item*/ item){
            var label = '';
            if(item.tag){
            	label = this.formatItem(item.tag, true);
            }else {
            	label = this.formatItem(item, true);
            }
            var key = '';
            
            if(this.multipleValues)
                key = dojo.string.trim(this.keyArr[this.keyIdx]);
            else
                key = dojo.string.trim(this.focusNode.value);
                
            
            //Escape html chars in key and label
            key = key.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
            
            var _label = label.tag? label.tag : label;
            var labelLower = _label.toLowerCase();
            var keyLower = key.toLowerCase();
            
            var startIdx = 0;
            var match = null;
            
            while(key && -1 < (match = labelLower.indexOf(keyLower, startIdx))){
                _label = _label.substr(0, match) 
                      + '<b>' + _label.substring(match, match + key.length) + '</b>' 
                      + _label.substring(match + key.length);
                startIdx = match + key.length + 7; //<b></b> is 7 characters
                labelLower = _label.toLowerCase();
            }
            if (label.tag){
            	_label = "<table border='0' cellspacing='0' cellpadding='3' width='100%'><tr><td><div>"+_label+"</div></td><td width='40'><div class='tagcount'>" + label.count + "</div></td></tr></table>"
            }
            return {html: true, label: _label};
        }
    }
);

dojo.declare(
    "lconn.bookmarklet.DogearTypeAheadMenu",
    [dijit.form._ComboBoxMenu, lconn.bookmarklet.Res],
	{
		templateString: "<table class='dijitReset dijitMenu' cellpadding='3' cellspacing='3' width='100%' dojoAttachPoint='containerNode'>" +
							"<tr dojoAttachPoint='tagsYoursField'>" +
								"<td class='lotusFormLabel' style='width:23%;' valign='top'>" +
									"<span style='padding:5px;'>${tagsyours}</span>" +
								"</td>" +
								"<td valign='top'>" +
									"<ul id='tagsyours' dojoAttachPoint='tagsyours' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut'  style='overflow:auto;margin:0px;'>" + 
									"</ul>" +
								"</td>" +
							"</tr>" +
							
							"<tr dojoAttachPoint='tagsAllField'>" +
								"<td class='lotusFormLabel' style='width:23%;'>" +
									"<span style='padding:5px;'>${tagsall}</span>" +
								"</td>" +
								"<td><ul id='tagsall' dojoAttachPoint='tagsall' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut'  style='overflow:auto;margin:0px;'></ul></td>" +
							"</tr>" +
							"<tr style='display:none;'><td colSpan='2'><ul><li class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></li><li class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></li></ul></td></tr>" +
						"</table>",
		_messages: null,
		cPath: null,
		txtHelp: null,
		txtHelpTags: null,
		txtHelpTagsClose: null,
		tagsall: null,
		tagsyours: null,
		tagsrecent: null,
		tagspopular: null,
		tagsrecommended: null,
	//	matchset: {},
		
		currentHighlightedItemIndex: -1,
		currentHighlishtedItemParent: null,
		
		postMixInProperties: function() {
            var res = new lconn.bookmarklet.Res();
		    res.loadDefaultBundle();
		    var b = res.resBundle;
            this.cPath = cPath;
			this.tagsall = b["tagsall"];
			this.tagsyours = b["tagsyours"];
			this.tagsrecent = b["tagsrecent"];
			this.tagspopular = b["tagspopular"];
			this.tagsrecommended = b["tagsrecommended"];
			this.txtHelp = b["txtHelp"];
			this.txtHelpTags = b["txtHelpTags"];
			this.txtHelpTagsClose = b["txtHelpTagsClose"];
            this.inherited("postMixInProperties", arguments);
        },
		
		_createOption: function(/*Object*/ item, labelFunc){
            // summary: creates an option to appear on the popup menu
            // subclassed by FilteringSelect
            var labelObject=labelFunc(item);
            
            var menuitem = document.createElement("li");
            
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
		
		createOptions: function(results, dataObject, labelFunc){
            //this._dataObject=dataObject;
            //this._dataObject.onComplete=dojo.hitch(comboBox, comboBox._openResultList);
            dojo.publish("lconn/core/typeahead/open");
			
            // Clear existing result nodes
            this.clearResultList();
            
            this.items = results;
			
           
            this.previousButton.style.display = (dataObject.start == 0) ? "none" : "";
			dojo.attr(this.previousButton, "id", this.id + "_prev");
			
			this.nextButton.style.display = (dataObject.start == 0) ? "none" : "";
			dojo.attr(this.nextButton, "id", this.id + "_next");
			
			if (results){
				if(util.tagrecs){
					var matches = [];
					var matchset = {};
					var mine = util.tagrecs.mine;
					for(var i=0;i<mine.length;i++){
						var item = mine[i];
						if (item.tag.toLowerCase().charAt(0)>results.prefix.toLowerCase().charAt(0)) break;
						if (item.tag.indexOf(results.prefix) >= 0){
							item.mine = true;
							matches.push(item);
							matchset[item.tag] = item;
						}
						if (matches.length == 10) break;
					}
					matches.sort(function(a, b){
						var c = b.count - a.count; 
						if (c != 0)
							return c;
						return a.tag.localeCompare(b.tag);
					});
					for(var i=0; matches.length < 10 && i<results.tagcounts.length;i++){
						if (!matchset[results.tagcounts[i].tag]){
							results.tagcounts[i].mine = false;
							matches.push(results.tagcounts[i]);
							matchset[results.tagcounts[i].tag] = results.tagcounts[i];
						}
						if (matches.length == 10) break;
					}
					dojo.forEach(matches, function(item, i){
		                var menuitem = this._createOption(item, labelFunc);
		                menuitem.className = "dijitMenuItem";
						menuitem.setAttribute("item", i); 
		                dojo.attr(menuitem, "id", this.id + i);
		                if (true == item.mine){
		                	menuitem.className = menuitem.className + " both mine"
		                	this.tagsyours.appendChild(menuitem);
		                }else {
		                	this.tagsall.appendChild(menuitem);
		                }
		            }, this);
		            if (this.tagsyours.childNodes.length == 0){
		            	this.tagsYoursField.style.display = "none";
		            }else {
		            	this.tagsYoursField.style.display = "";
		            }
		             if (this.tagsall.childNodes.length == 0){
		            	this.tagsAllField.style.display = "none";
		            }else {
		            	this.tagsAllField.style.display = "";
		            }
				}else {
					dojo.forEach(results.tagcounts, function(item, i){
		                var menuitem = this._createOption(item, labelFunc);
		                menuitem.className = "dijitMenuItem";
		                dojo.attr(menuitem, "id", this.id + i);
		                this.tagsall.appendChild(menuitem);
		            }, this);
				}
				
			}else {
	            dojo.forEach(results, function(item, i){
	                var menuitem = this._createOption(item, labelFunc);
	                menuitem.className = "dijitMenuItem";
	                dojo.attr(menuitem, "id", this.id + i);
	                this.tagsall.appendChild(menuitem);
	            }, this);
	            this.tagsYoursField.style.display = "none";
            }
            
        },
		
		clearResultList:function(){
			while(this.tagsyours.childNodes.length > 0){
				this.tagsyours.removeChild(this.tagsyours.childNodes[0]);
			}
			while(this.tagsall.childNodes.length > 0){
				this.tagsall.removeChild(this.tagsall.childNodes[0]);
			}
		},
		
		_highlightPrevOption:function(){
			if(!this.getHighlightedOption()){
				return;
			}else {
				var ns = null;
				if (this.currentHighlightedItemIndex == 0){
					var top = false;
					var tempNode  = this.currentHighlightedItemParent;
					do{
						if (tempNode == this.tagsall){
							tempNode = this.tagsyours;
						}else if (tempNode == this.tagsyours){
							top = true;
							break;
						}
					}while (tempNode.childNodes.length == 0);
					if(tempNode.childNodes.length > 0 && !top){
						this.currentHighlightedItemParent = tempNode;
						if (this.currentHighlightedItemParent.childNodes.length > 0){
							ns = this.currentHighlightedItemParent.lastChild;
							this.currentHighlightedItemIndex = this.currentHighlightedItemParent.childNodes.length -1;
						}
					}
				}else {
					ns = this._highlighted_option.previousSibling;
					this.currentHighlightedItemIndex --;
				}
				if(ns && ns.style.display!="none"){
					this._focusOptionNode(ns);
				}
			}
			
		},
		
		_highlightNextOption:function(){
			//	summary:
			// 		Highlight the item just below the current selection.
			// 		If nothing selected, highlight first option

			// because each press of a button clears the menu,
			// the highlighted option sometimes becomes detached from the menu!
			// test to see if the option has a parent to see if this is the case.
			
			if(!this.getHighlightedOption()){
				var fc = null;
				if (this.tagsyours.childNodes.length>0){
					fc=this.tagsyours.firstChild;
					this.currentHighlightedItemIndex = 0;
					this.currentHighlightedItemParent = this.tagsyours;
				}else if (this.tagsall.childNodes.length>0){
					fc = this.tagsall.firstChild;
					this.currentHighlightedItemIndex = 0;
					this.currentHighlightedItemParent = this.tagsall;
				}
				if (fc!=null){
					this._focusOptionNode(fc);
				}
			}else{
				var ns = null;
				if (this.currentHighlightedItemIndex + 1 == 
						this.currentHighlightedItemParent.childNodes.length){
					var tempIndex = this.currentHighlightedItemIndex;
					var tempNode = this.currentHighlightedItemParent;
					var bottom = false;
					while (tempIndex + 1 == tempNode.childNodes.length){
						if (tempNode == this.tagsyours){
							tempNode = this.tagsall;
							tempIndex = -1;
							break;
						}
						if (tempNode == this.tagsall){
							bottom = true;
							break;
						}
					}
					if (!bottom && tempNode.childNodes.length > 0){
						this.currentHighlightedItemParent = tempNode;
						this.currentHighlightedItemIndex = tempIndex;
						if (this.currentHighlightedItemParent.childNodes.length > 0){
							ns = this.currentHighlightedItemParent.firstChild;
							this.currentHighlightedItemIndex = 0;
						}
					}
				}else {
					ns = this._highlighted_option.nextSibling;
					this.currentHighlightedItemIndex ++;
				}
				if(ns && ns.style.display!="none"){
					this._focusOptionNode(ns);
				}
			}
			// scrollIntoView is called outside of _focusOptionNode because in IE putting it inside causes the menu to scroll up on mouseover
			dijit.scrollIntoView(this._highlighted_option);
		},
		
		highlightFirstOption:function(){
			if (this.tagsyours.childNodes.length>0){
				this._focusOptionNode(this.tagsyours.firstChild);
				dijit.scrollIntoView(this._highlighted_option);
			}else if (this.tagsall.childNodes.length>0){
				this._focusOptionNode(this.tagsall.firstChild);
				dijit.scrollIntoView(this._highlighted_option);
			}
		},
		
		_listConnect: function(/*String|Function*/ eventType, /*String*/ callbackFuncName){
			var self = this;
			require(["dojo/on"], function(on){
				return self.own(on(self.containerNode,
					on.selector(
						function(eventTarget, selector, target){
							return dojo.query('.dijitMenuItem', target).indexOf(eventTarget) != -1;
						},
						eventType
					),
					function(evt){
						if(!/^touch/.test(evt.type)){
							evt.preventDefault();
						}
						self[callbackFuncName](evt, this);
					}
				));
			});
		},
		
		selectFirstNode: function(){
			// summary:
			//		Select the first displayed item in the list.
			var t = dojo.query('.dijitMenuItem', this.containerNode);
			var first = t[0];
			var idx = 0;
			while(first && first.style.display == "none" && idx < t.length){
			    idx = idx + 1;
				first = t[idx];
			}
			this._setSelectedAttr(first);
		},

		selectLastNode: function(){
			// summary:
			//		Select the last displayed item in the list
			var t = dojo.query('.dijitMenuItem', this.containerNode);
			var idx = t.length - 1;
			var last = t[idx];
			while(last && last.style.display == "none" && idx >= 0){
			    idx = idx - 1;
				last = t[idx];
			}
			this._setSelectedAttr(last);
		},
		
		selectNextNode: function(){
			// summary:
			//		Select the item just below the current selection.
			//		If nothing selected, select first node.
			var selectedNode = this.selected;
			if(!selectedNode){
				this.selectFirstNode();
			}else{
			    var t = dojo.query('.dijitMenuItem', this.containerNode);
				var idx = 0;
				while(idx < t.length) {
				    if(t[idx] == selectedNode) break;
					idx = idx + 1;
				}
				idx = idx + 1;
				var next = null;
				if(idx < t.length) {
				    next = t[idx];
					while(next && next.style.display == "none" && idx < t.length){
						idx = idx + 1;
						next = t[idx];
					}
				}
				if(!next){
					this.selectFirstNode();
				}else{
					this._setSelectedAttr(next);
				}
			}
		},

		selectPreviousNode: function(){
			// summary:
			//		Select the item just above the current selection.
			//		If nothing selected, select last node (if
			//		you select Previous and try to keep scrolling up the list).
			var selectedNode = this.selected;
			if(!selectedNode){
				this.selectLastNode();
			}else{
			    var t = dojo.query('.dijitMenuItem', this.containerNode);
				var idx = t.length - 1;
				while(idx >= 0) {
				    if(t[idx] == selectedNode) break;
					idx = idx - 1;
				}
				idx = idx - 1;
				var prev = null;
				if(idx >= 0) {
					var prev = t[idx];
					while(prev && prev.style.display == "none" && idx >= 0){
						idx = idx - 1;
						prev = t[idx];
					}
				}
				if(!prev){
					this.selectLastNode();
				}else{
					this._setSelectedAttr(prev);
				}
			}
		},
		
		_onMouseOver: function(/*Event*/ evt){
			if(evt.target === this.domNode){ return; }
			var tgt = evt.target;
			if(!(tgt == null || tgt == this.previousButton || tgt == this.nextButton)){
				// while the clicked node is inside the div
				while(tgt.parentNode && !tgt.item){
					// recurse to the top
					tgt = tgt.parentNode;
				}
			}
			this._focusOptionNode(tgt);
		},
		
		getListLength:function(){
            return this.tagsyours.childNodes.length + this.tagsall.childNodes.length;
        },
		
		// lconn.core: use dijitMenuItemHover
         _focusOptionNode: function(/*DomNode*/ node){
            // summary:
            //    Does the actual highlight.
            if(this._highlighted_option != node){
               this._blurOptionNode();
               this._highlighted_option = node;
               dojo.addClass(this._highlighted_option, "dijitMenuItemHover");
               dojo.addClass(this._highlighted_option, "dijitMenuItemSelected");
            }
         },
         // lconn.core: use dijitMenuItemHover
         _blurOptionNode:function(){
            // summary:
            // removes highlight on highlighted option
            if(this._highlighted_option){
            	dojo.removeClass(this._highlighted_option, "dijitMenuItemHover");
               dojo.removeClass(this._highlighted_option, "dijitMenuItemSelected");
               this._highlighted_option = null;
            }
         }
	}
);
