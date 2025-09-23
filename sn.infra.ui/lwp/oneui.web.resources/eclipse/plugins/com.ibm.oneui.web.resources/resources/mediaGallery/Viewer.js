/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * @fileoverview  Control to display a series of resource items with thumbnail representations.
 */

/**
 * @name com.ibm.oneui.mediaGallery.Viewer
 * @class
 * @private
 */

/**
 * @name com.ibm.oneui.mediaGallery.Viewer
 * @class
 */
 
	dojo.provide("com.ibm.oneui.mediaGallery.Viewer");


	dojo.require("com.ibm.oneui._base");
	dojo.require("dijit._Templated");
	dojo.require("dojo.i18n");
	dojo.require("dojo.number");


	dojo.declare("com.ibm.oneui.mediaGallery.Viewer",
		[com.ibm.oneui._base, dijit._Templated],
		{
			
			/**
			 * <style>pre {font-family: "Lucida Grande",Tahoma,Arial,Helvetica,sans-serif;}</style>
			 * <pre>An array of objects containing the items to display.
			 * Used as an alternative to creating a data store.
			 * Example:
			 *	data: {
			 *		items: [
			 *			{
			 *				large: "http://www-03.ibm.com/innovation/us/watson/images/what-is-watson/img-overview-why-jeopardy.jpg",
			 *				title: "Jeopardy image",
			 *				author: "John Doe",
			 *				date: "July 27, 2010",
			 *				link: "http://www.ibm.com"
			 *			},
			 *			{
			 *				large: "http://www.ibm.com/us/en/sandbox/leadfpo/121410hp_watson_text_onlight.png",
			 *				title: "IBM Watson",
			 *				author: "Jane Doe",
			 *				date: "Aug 21, 2010",
			 *				link: "http://www.ibm.com"
			 *			}		 
			 *		]
			 *	}</pre>
			 * @name data
			 * @type Object
			 * @memberOf com.ibm.oneui.mediaGallery
			 */			
			data: null,
			
			
			/**
			 * <pre>Control's original class name.</pre>
			 * @name coreWidgetClass
			 * @private
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			coreWidgetClass: "com.ibm.oneui.mediaGallery.Viewer",
			
			
			
			/**
			 * <pre>ID of a node on the page which contains images to include in the Gallery.
			 * Used as an alternative to creating a data store.</pre>
			 * @name source
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			source: null,
			
			
			/**
			 * <pre>Object containing 3 objects: <br/>
			 * 		-data: Object derived from dojo.data.ItemFileReadStore
			 *		-request: Implementation of dojo.data.api.Request
			 *		-attributes: Object defining the names of the item attributes to fetch from the data store.
			 * <br/>Used as an alternative to creating a data store.</pre>
			 * @name store
			 * @type Object
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			store: {
				data: null,
				request: {},
				attributes: {}
			},		
			
			
			
			/**
			 * <pre>The overall width of the control.</pre>
			 * @name width
			 * @type String/Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			width: "700px",
			
			
			/**
			 * <pre>The overall height of the control.</pre>
			 * @name height
			 * @type String/Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			height: "500px",
			
			
			/**
			 * <pre>The overall width of each thumbnail.</pre>
			 * @name thumbWidth
			 * @type String/Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			//thumbWidth: "50px",
			
			
			/**
			 * <pre>The overall height of each thumbnail.</pre>
			 * @name thumbHeight
			 * @type String/Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			//thumbHeight: "50px",
			
			
			/**
			 * <pre>The overall height of the footer section.</pre>
			 * @name footerHeight
			 * @type String/Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			footerHeight: "75px",			
			
			
			/**
			 * <pre>Use the dojox.fx package to animate the UI.</pre>
			 * @name animate
			 * @type Boolean
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			animate: true,
			
			
			/**
			 * <pre>Fire the onSelect method when the main item is selected.</pre>
			 * @name selectable
			 * @type Boolean
			 * @memberOf com.ibm.oneui.mediaGallery
			 */			
			selectable: false,
			
			
			
			/**
			 * <pre>Force the locale of the control.
			 * If not set, the control will pull the locale from the dojo settings.</pre>
			 * @name locale
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			locale: null,
			
			
			/**
			 * <pre>Force the loading of the controls own string resources.
			 * If set to false, the instantiation code will need to provide all of the
			 * resources using the "strings" parameter.</pre>
			 * @name loadDefaultStrings
			 * @type Boolean
			 * @memberOf com.ibm.oneui.mediaGallery
			 */			
			loadDefaultStrings: true,
			
			
			/**
			 * <pre>Set to Number of records to retrieve from the data store per request.</pre>
			 * @name pageSize
			 * @type Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */	
			pageSize: 20,
			
			/**
			 * <pre>Set the total Number of records to retrieve from the data store.</pre>
			 * @name count
			 * @type Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */	
			count: -1,			
			
			
			/**
			 * <pre>Set to total Number of records that will be retreived from the data store.</pre>
			 * @name total
			 * @type Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			total: -1,
			
			
			/**
			 * <pre>Set to the index of record that will be retreived from the data store.</pre>
			 * @name start
			 * @type Number
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			start: 0,			
			
			

			/**
			 * <pre>Defines the name of the attribute to request from the store to retrieve the
			 * URL to link, if any.</pre>
			 * @name linkAttr
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			linkAttr: "link",
			

			/**
			 * <pre>Defines the name of the attribute to request from the store to retrieve the
			 * URL to the thumbnail of the item.</pre>
			 * @name thumbAttr
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */			
			thumbAttr: "thumb",
			

			/**
			 * <pre>Defines the name of the attribute to request from the store to retrieve the
			 * URL to the item.</pre>
			 * @name itemAttr
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			itemAttr: "large",
			

			/**
			 * <pre>Defines the name of the attribute to request from the store to retrieve the
			 * title of the item, if any.</pre>
			 * @name titleAttr
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			titleAttr: "title",		
			

			/**
			 * <pre>Defines the name of the attribute to request from the store to retrieve the
			 * description of the item, if any.</pre>
			 * @name descAttr
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		
			descAttr: "desc",				
			

			/**
			 * <pre>Defines the name of the attribute to request from the store to retrieve the
			 * author metadata, if any.</pre>
			 * @name authorAttr
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */			
			authorAttr: "author",
			
			
			/**
			 * <pre>Defines the name of the attribute to request from the store to retrieve the
			 * date metadata ISO 8601 format, if any.</pre>
			 * @name dateAttr
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */			
			dateAttr: "date",		
			
			
			/**
			 * <pre>Defines the name of the attribute to request from the store to retrieve the
			 * type of item.</pre>
			 * @name typeAttr
			 * @type String
			 * @memberOf com.ibm.oneui.mediaGallery
			 */			
			typeAttr: "type",


			
			
			/**
			 * <pre>Set to true if the css styles for this control are not already loaded on the page.</pre>
			 * @name loadIndividualStyles
			 * @type Boolean
			 * @memberOf com.ibm.oneui.mediaGallery
			 */	
			loadIndividualStyles: false,
			
			
			
			/**
			 * <pre>Error code for the condition where an item is expected but not available.</pre>
			 * @name ERROR.ITEM_NOT_FOUND
			 * @final
			 * @type Number
			 * @return 0
			 * @memberOf com.ibm.oneui.mediaGallery
			 */	

			/**
			 * <pre>Error code for the condition where an item's thumbnail fails to load.</pre>
			 * @name ERROR.THUMBNAIL_LOAD_FAILURE
			 * @final
			 * @type Number
			 * @return 1
			 * @memberOf com.ibm.oneui.mediaGallery
			 */
			 
			/**
			 * <pre>Error code for the condition where an item cannot be loaded.</pre>
			 * @name ERROR.ITEM_LOAD_FAILURE
			 * @final
			 * @type Number
			 * @return 2
			 * @memberOf com.ibm.oneui.mediaGallery
			 */	

			/**
			 * <pre>Error code for the condition where a data store is not set.</pre> 
			 * @name ERROR.DATASTORE_NOT_FOUND
			 * @final
			 * @type Number
			 * @return 3
			 * @memberOf com.ibm.oneui.mediaGallery
			 */		 

			/**
			 * <pre>Error code for the condition where a data store has no items.</pre> 
			 * @name ERROR.NO_ITEMS_FOUND
			 * @final
			 * @type Number
			 * @return 4
			 * @memberOf com.ibm.oneui.mediaGallery
			 */


			 
			ERROR: {
				ITEM_NOT_FOUND: 0,
				THUMBNAIL_LOAD_FAILURE: 1,
				ITEM_LOAD_FAILURE: 2,
				DATASTORE_NOT_FOUND: 3,
				NO_ITEMS_FOUND: 4
			},
			
			
			CLASS: {
				LOADING: "lotusLoading",
				NOIMAGE: "lotusNoImage",
				DISABLED: "lotusNavDisabled",
				SELECTED: "lotusSelected",
				THUMBNAIL: "lotusThumbnail",
				NOTHUMBNAIL: "lotusNoThumbnail",
				THUMBOVERLAY: "lotusThumbOverlay",
				TRIM: "lotusImageTrim"
			},
			
			
			templatePath: dojo.moduleUrl("com.ibm.oneui","mediaGallery/templates/Viewer.html"),
			

		

			
			/**
			 * Renders the main content resource item.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name renderItem
			 * @function
			 * @param index Index number of the item in the store to display.  null will use current index.
			 * @param callback Function definition to call when completed		 
			 */
			renderItem: function(index, callback) {	
				index = this._checkIndex(index);

				//defect 813 - This is causing rtl issues with ie7.  
				if (this._getIsBidi() && (!dojo.isIE || dojo.isIE >= 8)) dojo.addClass(this.itemWrapper, this.CLASS.LOADING);
				

				var _this = this;
				
				var stateObj = this._getStateObject();

				if (!_this.hasItem(index)) {
					if (index == _this.start) {
					
						_this._loadSelectedItem(index, callback);
					
					} else {
						_this.onError(
							{
								code: _this.ERROR.ITEM_NOT_FOUND,
								message: "Item not found: " + index, 
								callee: arguments.callee.nom
							}
						);
						
					}
						
				} else {
			
					var checkIsLoaded = function() {
						var item = _this.getItem(index);
						
						if (!item) {
							_this.onError(
								{
									code: _this.ERROR.ITEM_NOT_FOUND,
									message: "Item not found: " + index, 
									callee: "renderItem"
								}
							);	
						} else {
							
							
							if (!item._isLoaded) {
								setTimeout(function() {
									checkIsLoaded();
								},200);
							} else {
								//var node = dojo.clone(item.itemNode);

								var node = (item.itemNode);
								
								dojo.style(_this.itemNode,"opacity", 0);  //make sure we can't see it.

								dojo.place(node, _this.itemNode, "last");
								
								
								

								_this._fxFadeIn(
									_this.itemNode,
									null,
									function() {

										//flag to make sure we know something is loaded
										stateObj.hasItemLoaded = true;
										
										dojo.removeClass(_this.itemWrapper, _this.CLASS.LOADING);
										
										if (typeof callback === "function") {
											callback();
										}													
										

									}
								);
							}


						}
					};

					var loadCurrentItem = function() {
						//remove any nodes
						dojo.empty(_this.itemNode);
						
						_this._getItemNodeByIndex(
							index, 
							checkIsLoaded
						);
						
						_this._setCurrentIndex(index);
					};

					//render the rest of the UI
					_this.renderFooter(index);
					_this._adjustItemNavControls(index);
					_this.renderThumbnailStrip(index);
					
					
					if (stateObj.hasItemLoaded) {
						_this._fxFadeOut(
							_this.itemNode, 
							null, 
							function(){
								loadCurrentItem();
							}
						);
					} else {
						loadCurrentItem();
					}

				}

			},
			
			/**
			 * Checks to see if the item exists.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name hasItem
			 * @function
			 * @param index Index number of the item.  null will use current index.		 
			 */		
			hasItem: function(index) {
				return (typeof this._getStateObject().items[index] !== "undefined");
			},
			
			
			/**
			 * Gets the item from the loaded items.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name getItem
			 * @function
			 * @param index Index number of the item.  null will use current index.		 
			 */		
			getItem: function(index) {
				index = this._checkIndex(index);
				
				if (this.hasItem(index)) {
					var item = this._getStateObject().items[index];
					if (typeof item._index == "undefined") {
						item._index = index;
					}
					return item;
				} else {
					this.onError(
						{
							code: this.ERROR.ITEM_NOT_FOUND,
							message: "Item not found: " + index, 
							callee: arguments.callee.nom
						}
					);
					return null;
				}
			},
			
			
			/**
			 * Sets the item in the loaded items.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name setItem
			 * @function
			 * @param index Index number of the item.  null will use current index.		 
			 * @param item Object to put into the loaded items.	
			 */		
			setItem: function(index, item) {
				
				if ((typeof index == "number" || typeof index == "string") && index >= 0 && index < this.total) {
					var stateObj = this._getStateObject();
					if (stateObj.items.length < index + 1) {
						stateObj.items.length = index + 1;
					}
					stateObj.items[index] = item;
				}
			},
			

			
			/**
			 * Renders the next resource item.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name nextItem
			 * @function
			 * @param callback Function definition to call when completed		 
			 */			
			nextItem: function(callback) {
				this.logEnter(arguments);
			
				this._navToItem(
					this._getStateObject().current + (1), //(this._getIsBidi()?-1:1),
					callback
				);
				
				this.logExit(arguments);	
			},
			
			/**
			 * Renders the previous resource item.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name prevItem
			 * @function
			 * @param callback Function definition to call when completed		 
			 */			
			prevItem: function(callback) {
				this.logEnter(arguments);
				
				this._navToItem(
					this._getStateObject().current + (-1),// (this._getIsBidi()?1:-1),
					callback
				);
							
				this.logExit(arguments);	
			},

			/**
			 * Renders the footer of the item.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name getFooterNode
			 * @function
			 * @param store Datastore.
			 * @param item Item in the datastore.
			 * @returns node Node representation of footer
			 */			
			getFooterNode: function(ds, item) {
							
				this.logEnter(arguments);
				
				var stateObj = this._getStateObject();
								
				
				var index = this._checkIndex(item._index);
				
				var ret;
				
				if (!stateObj.footerNodes[index]) {
					
					var total = this.total;
					if (this.total < 0) {
						total = stateObj.items.length;
					}				
					
					var pWid = new com.ibm.oneui.mediaGallery.internal.FooterNode (
						{
							stateObj: stateObj,
							item: item,
							total: total,
							index: index
						}
					);
					
					this._getStateObject().widgets.push(pWid);
					
					stateObj.footerNodes[index] = pWid.domNode;
				}
				
					
				this.logExit(arguments);
				
				
				return stateObj.footerNodes[index];			
		

			},
			
			/**
			 * Renders the main content footer.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name renderFooter
			 * @function
			 * @param index Index number of the item in the store to display for the footer.  null will use current index.
			 * @param callback Function definition to call when completed		 
			 */			
			renderFooter: function(index, callback) {
				this.logEnter(arguments);

				index = this._checkIndex(index);
				
				
				var _this = this;
				
				var stateObj = this._getStateObject();
							
				var item = this.getItem(index);
				if (!item) {
					this.onError(
						{
							code: this.ERROR.ITEM_NOT_FOUND,
							message: "Item not found: " + index, 
							callee: arguments.callee.nom
						}
					);
					
				} else {
					var fnode = this.getFooterNode(stateObj.store.data, item);
				
					_this._fxFadeOut(
						_this.footerNode, 
						null, 
						function(){
							//main desc
							dojo.empty(_this.footerNode);
							dojo.html.set(_this.footerNode, fnode.innerHTML);
					

							_this._fxFadeIn(
								_this.footerNode,
								null,
								function() {
									if (typeof callback === "function") {
										callback();
									}													
								}
							);
						}
					);					
				}

				
				this.logExit(arguments);
			},
			
			/**
			 * Renders strip of thumbnails for the items.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name renderThumbnailStrip
			 * @function
			 * @param index Index number of the currenty selected thumbnail.  null will use current index.
			 * @param callback Function definition to call when completed		 
			 */			
			renderThumbnailStrip: function(index, callback) {
				this.logEnter(arguments);

				var _this = this;
				var stateObj = this._getStateObject();
				
				//index here presents which thumbnail to center.
				index = this._checkIndex(index, stateObj.thumbIndex);
				
				var tn = stateObj.thumbNodes;
	
				dojo.forEach(
					stateObj.items, 
					function(itm, idx) {
						if (itm && !tn[idx]) {
							var lastIdx = -1;
							for (var ii = 0; ii < idx + 1 ; ii++) {
								if (tn[ii]) {
									lastIdx = ii;
								}
								
								if (ii == idx) {
									if (lastIdx == -1) {
										dojo.place(
											_this._getThumbnailNodeByIndex(idx),
											_this.thumbnailWrapper,
											"first"
										);
									} else {
										dojo.place(
											_this._getThumbnailNodeByIndex(idx),
											tn[lastIdx],
											"after"
										);
									}
								}
							}								
						}
					}
				);
				
				
				//resize the wrapper so it'll scroll nicely
				var iPadding = (dojo.isIE)?dojo.style(this.thumbnailWrapper, "paddingLeft")*2:0;

				var iThumbCount = 0;

				dojo.forEach(tn, function(itm) {
					if (itm) iThumbCount++;
				});

				dojo.style(
					this.thumbnailWrapper,
					{
						width: ((this._getThumbNodeWidth() * iThumbCount) + iPadding) + "px"
					}
				);
				
				
				//scroll to the center of the selected thumbnail
				this._scrollThumbnailsTo(index);

			
				if (typeof callback === "function") {
					callback();
				}
				
				this.logExit(arguments);
			},
			
			
			getBlankThumbnailItem: function(index) {
				this.logEnter(arguments);
				
				index = this._checkIndex(index);
				
				var sText = this._getStringResource("THUMBNAILS.NO_IMAGE");
				
				var stateObj = this._getStateObject();

				var el = dojo.create(
					"div",
					{
						className: this.CLASS.NOIMAGE,
						title: sText
					}
				);
							
				this.logExit(arguments);
				
				return el;
			},		
			
			/**
			 * Renders a blank thumbnail for the item.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name renderBlankThumbnail
			 * @function
			 * @param item Index number of the currenty selected thumbnail.
			 */			
			renderBlankThumbnail: function(index) {
				this.logEnter(arguments);

				index = this._checkIndex(index);
				
				var stateObj = this._getStateObject();
				
				
				var el = this.getBlankThumbnailItem(index);
				
				var item = this.getItem(index);
				var node = stateObj.thumbNodes[index];
				
				dojo.addClass(node, this.CLASS.NOTHUMBNAIL);
				
				var img = dojo.query("img", node);		
				
				if (img && img[0]) {
					var pNode = img[0].parentNode;
					dojo.empty(pNode);
					dojo.place(el, pNode, "last");
				
				}

				
				dojo.removeClass(node, this.CLASS.LOADING);	
				
			

				this.logExit(arguments);			
			},
			
			/**
			 * Renders the individual thumbnail of the item.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name getThumbnailNode
			 * @function
			 * @param store Datastore.
			 * @param item Item in the datastore.
			 * @returns node Node representation of thumbnail
			 */
			getThumbnailNode: function(ds, item) {
				this.logEnter(arguments);

				var index = this._checkIndex(item._index);
				
				if (!item) {
					this.onError(
						{
							code: this.ERROR.ITEM_NOT_FOUND,
							message: "Item not found: " + index, 
							callee: arguments.callee.nom
						}
					);
					return null;
				}
				
				var stateObj = this._getStateObject();
				
				var ret = null;
				
				
				var _this = this;
				
				var item = this.getItem(index);	

				var overflowDiv = dojo.create(
					"div",
					{
						className: this.CLASS.TRIM
					}
				)
				
				var img = new Image();

				dojo.attr(img, "imgidx", index);
								
				
				var url = this._getValue(item, this.thumbAttr) || this._getValue(item, this.itemAttr);
				
				if (!url || dojo.trim(url).length == 0) {
					this.renderBlankThumbnail(index);
				
				} else {
				
					this._connect(
						img,
						"onerror",
						dojo.hitch(
							this,
							function() {
								this.renderBlankThumbnail(dojo.attr(img, "imgidx"));
							}
						)
					);
					
					this._connect(
						img, 
						"onload",
						dojo.hitch(
							this,
							function() {
							
								var idx = dojo.attr(img, "imgidx");

								var stateObj = this._getStateObject();
								//default is 50
								var dim = {
									w: 50,
									h: 50
								}
								
								var tn = dojo.byId(this.id + "__tn_" + idx);
								if (tn) {
									dim = {
										w: this.parseInt(dojo.style(tn, "width"),10),
										h: this.parseInt(dojo.style(tn, "height"), 10)
									}
								}
								
								var tsize;
								if (dojo.isIE) {
									tsize = {
										w: dojo.attr(img, "width"),
										h: dojo.attr(img, "height")
									}
								} else {
									tsize = dojo.marginBox(img);
								}

								var diff = {
									w: tsize.w - dim.w,
									h: tsize.h - dim.h
								}

								if (diff.w <= 0 && diff.h <= 0) {
									tsize.scale = 1
									tsize.crop = null;
								} else
								if (diff.w < diff.h) {
									tsize.scale = dim.w / tsize.w;
									tsize.crop = "h";
								} else
								{
									tsize.scale = dim.h / tsize.h;
									tsize.crop = "w";
								}
								
								if (!!tsize.crop) {
									tsize.w = this.parseInt(tsize.w*tsize.scale, 10);
									tsize.h = this.parseInt(tsize.h*tsize.scale, 10);
									
									dojo.attr(
										img, 
										{
											"height": tsize.h,
											"width": tsize.w
										}
									);
									
									if (tsize.crop == "w") {
										dojo.style(img, (this._getIsBidi()?"right":"left"), this.parseInt((tsize.w - dim.w) / -2, 10) + "px");
									} else {
										dojo.style(img, "top", this.parseInt((tsize.h - dim.h) / -2, 10) + "px");
									}
									
									dojo.style(
										img, 
										{
											"height": tsize.h,
											"width": tsize.w,
											"visibility": "visible"
										}
									);

								}
								
								dojo.removeClass(stateObj.thumbNodes[idx], this.CLASS.LOADING);
				
							}
						)
					);
					
						
					var title = this._getValue(item, this.titleAttr);
					
					

				
					dojo.attr(
						img,
						{
							"src": url,
							/*"title": title,*/
							"alt": title
							
						}
					);
					
				}
				
				dojo.place(
					img,
					overflowDiv,
					"last"
				);
				
				this.logExit(arguments);
				
				return overflowDiv;
			},
			
			_getThumbnailAlt: function(title, isSelected) {
				return this._getStringResource("THUMBNAILS.ALT." + ((isSelected)?"SELECTED":"NOTSELECTED")).replace("{desc}",title);	
			},
			 
			_getThumbnailNodeByIndex: function(index, callback) {
				this.logEnter(arguments);
				
				index = this._checkIndex(index);
				
				var stateObj = this._getStateObject();
				
				index = this._checkIndex(index);
				var ret = null;
				
				
				var _this = this;
				
				var item = this.getItem(index);
				
				if (!item) {
					this.onError(
						{
							code: this.ERROR.ITEM_NOT_FOUND,
							message: "Item not found: " + index, 
							callee: arguments.callee.nom
						}
					);
				} else 
				if (!stateObj.thumbNodes[index]) {

					stateObj.thumbNodes[index] = dojo.create(
						"div", 
						{
							id: this.id + "__tn_" + index,
							className: this.CLASS.LOADING + " " + this.CLASS.THUMBNAIL,// + (this._getIsBidi()? " " + this.CLASS.THUMBNAIL:""),
							role: "tab",
							title: this._getThumbnailAlt(this._getValue(item, this.titleAttr))
						}
					);
					
					var overflowDiv = this.getThumbnailNode(stateObj.store.data, item);
					

					var overlay = dojo.create(
						"div", 
						{
							id: this.id + "__sel_" + index,
							className: this.CLASS.THUMBOVERLAY
						}
					);

					dojo.place(
						overflowDiv,
						stateObj.thumbNodes[index],
						"last"
					);
					
					dojo.place(
						overlay,
						stateObj.thumbNodes[index],
						"last"
					);

					this._connect(
						stateObj.thumbNodes[index], 
						"onclick", 
						function () {				
							_this._loadSelectedItem(index);
						}
					);
					
					
					ret = stateObj.thumbNodes[index];
				} else
				{
					ret = stateObj.thumbNodes[index];
				}
				
				//check to make sure dummy thumbnail is gone...
				var el = dojo.byId(this.id + "__tn_dummy");
				if (el) {
					el.parentNode.removeChild(el);
				}				

				
				if (typeof callback === "function") {
					callback(ret);
				} else {
					return ret;
				}
				
				this.logExit(arguments);		
			},
			
			/**
			 * Renders the next set of thumbnails.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name nextThumbs
			 * @function
			 * @param callback Function definition to call when completed		 
			 */			
			nextThumbs: function(callback) {
				this.logEnter(arguments);

				var tpp = this._getThumbsPerPage();
				
				this._navToThumbs(
					this._getStateObject().thumbIndex + (tpp), //(this._getIsBidi()?-tpp:tpp),
					callback
				);			
				
				this.logExit(arguments);	
			},
			
			/**
			 * Renders the previous set of thumbnails.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name prevThumbs
			 * @function
			 * @param callback Function definition to call when completed		 
			 */			
			prevThumbs: function(callback) {
				this.logEnter(arguments);

				var tpp = this._getThumbsPerPage();
				
				this._navToThumbs(
					this._getStateObject().thumbIndex + (-tpp), //(this._getIsBidi()?tpp:-tpp),
					callback
				);			
							
				this.logExit(arguments);	
			},

			
			_setDataStore: function(data, request, attributes) {
				var stateObj = this._getStateObject();
				
				request = request || stateObj.store.request_def || {};
				attributes = attributes || {};
				
				

				stateObj.store.data = data;
				stateObj.store.request = request;//dojo.mixin(stateObj.store.request, request);
				stateObj.store.attributes = dojo.mixin(stateObj.store.attributes, attributes);

			},
			
			/**
			 * Set the dataStore to be used to render content in the control.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name setDataStore
			 * @function
			 * @param data Object derived from dojo.data.ItemFileReadStore		 
			 * @param request Object Implementation of dojo.data.api.Request
			 * @param attributes Object defining the names of the item attributes to fetch from the data store
			 */		
			setDataStore: function(data, request, attributes) {
				this.logEnter(arguments);

				this._setDataStore(data, request, attributes);
				this.reset();
				this.logExit(arguments);
				
			},
			
			
			/**
			 * Called when the control is completely loaded.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name onLoad
			 * @function
			 */			
			onLoad: function() {
				this.logEnter(arguments);
							
				
				this.logExit(arguments);	
			},
			
			/**
			 * Called when an item is changed.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name onItemChange
			 * @function
			 * @param item Selected item object
			 */			
			onItemChange: function(item) {
				this.logEnter(arguments);
							
				
				this.logExit(arguments);	
			},			
			
			/**
			 * Called when an item is selected.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name onSelect
			 * @function
			 * @param item Selected item object
			 */			
			onSelect: function(item) {
				this.logEnter(arguments);
							
				
				this.logExit(arguments);	
			},		
			
			
			/**
			 * Called when an error has occurred in the system.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name onError
			 * @function
			 * @param e Error object
			 */			
			onError: function(e) {
				this.logEnter(arguments);

				this.logError(e);
							
				this.logExit(arguments);	
			},
			
			/**
			 * Handle keystrokes on the page list, for advancing to next/previous button.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name onKeyPress
			 * @function
			 * @private
			 * @param e Event object
			 */		
			onKeyPress: function(/*Event*/ e){
				// summary:
				//		Handle keystrokes on the page list, for advancing to next/previous button
				//		and closing the current page if the page is closable.
				// tags:
				//		private
				var _this = this;
				
				var k = dojo.keys;

				if (e.target == this.navNextItem) {
					if (e.charOrCode == k.ENTER) {
						this.nextItem();
						dojo.stopEvent(e);
					}
					
				} else 
				if (e.target == this.navPrevItem) {
					if (e.charOrCode == k.ENTER) {
						this.prevItem();
						dojo.stopEvent(e);
					}	
					
				} else 
				if (e.target == this.navNextThumbs) {
					if (e.charOrCode == k.ENTER) {
						this.nextThumbs();
						dojo.stopEvent(e);
					}
					
				} else 
				if (e.target == this.navPrevThumbs) {
					if (e.charOrCode == k.ENTER) {
						this.prevThumbs();
						dojo.stopEvent(e);
					}	
					
				} else 				
				{
					if(e.altKey){ return; }
					var forward = null;

					
					switch(e.charOrCode){
						case k.ENTER:
							if (this._focusedThumbnail > 0) {
								this._navToItem( 
									this._focusedThumbnail, 
									function() {
										_this._focusedThumbnail = -1;
									} 
								);
							}
							break;
						
						case k.LEFT_ARROW:
						case k.UP_ARROW:
							forward = false;
							break;
						case k.PAGE_UP:
							if(e.ctrlKey){ forward = false; }
							break;
						case k.RIGHT_ARROW:
						case k.DOWN_ARROW:
							forward = true;
							break;
						case k.PAGE_DOWN:
							if(e.ctrlKey){ forward = true; }
							break;
							
						case k.TAB:
							if(e.ctrlKey){ forward = !e.shiftKey }
							break;
					}
					
					// handle page navigation
					if(forward !== null){
				
						if (forward) {
							this.focusNextThumbnail();
						} else {
							this.focusPrevThumbnail();
						}

						dojo.stopEvent(e);
					}
				}
			},
			
			focusNextThumbnail: function(callback) {
				var start = (this._focusedThumbnail < 0) ? this._getStateObject().current : this._focusedThumbnail;
				
				this._focusThumbnail(
					start + (this._getIsBidi()?-1:1),
					callback
				);			
			},
			
			focusPrevThumbnail: function(callback) {
				var start = (this._focusedThumbnail < 0) ? this._getStateObject().current : this._focusedThumbnail;
				
				this._focusThumbnail(
					start + (this._getIsBidi()?1:-1),
					callback
				);			
			},			
			
			_focusThumbnail: function(index, callback) {
				index = this._checkIndex(index);
				
				
				var start = (this._focusedThumbnail < 0) ? this._getStateObject().current : this._focusedThumbnail;
				var sel = dojo.byId(this.id + "__sel_" + start);
				if (sel) {
					dojo.removeClass(sel, this.CLASS.SELECTED);
				}
				sel = dojo.byId(this.id + "__sel_" + index);
				if (sel) {
					dojo.addClass(sel, this.CLASS.SELECTED);
				}
				
				
				var tn = dojo.byId(this.id + "__tn_" + index);
				if (tn) {
					tn.focus();
					this._focusedThumbnail = index;
				}
				
				if (typeof callback === "function") {
					callback();
				}
				
			},
			_focusedThumbnail: -1,
			
			
			/**
			 * Resets the UI and loaded items.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name reset
			 * @function
			 */		
			reset: function(doLoadUI) {
				if (typeof doLoadUI === "undefined") doLoadUI = true;
				
				var stateObj = this._getStateObject();
				if (stateObj.items.length > 0) {

					dojo.forEach(stateObj.items, function(itm, idx) {
						if (itm && itm.itemNode) itm.itemNode = null;
					});

					stateObj.items.length = 0;
				}

				var resetNodes = function(nodes) {
					if (nodes.length > 0) {

						dojo.forEach(nodes, function(itm, idx) {
							if (itm) {
								dojo.empty(itm);
								nodes[idx] = null;
							}
						});

						nodes.length = 0;
					}				
				}
				
				resetNodes(stateObj.thumbNodes);
				resetNodes(stateObj.footerNodes);
				



				if (this.thumbnailWrapper) {
					dojo.empty(this.thumbnailWrapper);
				}
				if (this.itemNode) {
					dojo.empty(this.itemNode);
				}
				if (this.footerNode) {
					dojo.empty(this.footerNode);
				}
				

				stateObj.hasItemLoaded = false;
				stateObj.current = this.start;
				
				if (doLoadUI) this._loadUI();
				
			},

			
			
			//INTERNAL DIJIT FUNCTIONS
			
			postMixInProperties: function() {
				this.logEnter(arguments);
				
				if (this.pageSize < 2) this.pageSize = 2;

				//since this is the first time we're calling the state object, let's make sure it has everything we need.
				var stateObj = this._getStateObject(
					{
						items: [],
						thumbNodes: [],
						footerNodes: [],
						store: {
							data: null,
							request: {
								count: this.pageSize,
								start: this.start
							},
							attributes: {
								thumbAttr: this.thumbAttr,
								itemAttr: this.itemAttr,
								titleAttr: this.titleAttr,
								descAttr: this.descAttr,
								linkAttr: this.linkAttr,
								authorAttr: this.authorAttr,
								dateAttr: this.dateAttr,
								typeAttr: this.typeAttr
							}
						},
						current: this.start,
						thumbIndex: this.start,
						hasItemLoaded: false
					}
				);
				
				stateObj.store.request_def = dojo.clone(stateObj.store.request);

				this._loadStyles();					
				
				this.inherited(arguments);
				
				this._loadSupplementalDojo();


				var ctrl = this.getControlInit();

				try {
					this._setDataStore(this.store.data, this.store.request, this.store.attributes);
					
				} catch (e) {
					this.onError(e);
				}



				
				
				if (this.loadDefaultStrings) {
					dojo.requireLocalization("com.ibm.oneui.mediaGallery", "mediaGallery");
					stateObj.strings = dojo.i18n.getLocalization("com.ibm.oneui.mediaGallery", "mediaGallery");	
				}

				if (this.strings) {
					if (!stateObj.strings) {
						stateObj.strings = this.strings;
					} else {
						stateObj.strings = this._mixin(stateObj.strings, this.strings);
					}
				}
				
				//assign the attributes back to the main widget
				for (sAttr in stateObj.store.attributes) {
					if (sAttr) {
						this[sAttr] = stateObj.store.attributes[sAttr];
					}
				}
				
				//make sure the width and height parameters will work
				if (typeof this.width === "number" || (typeof this.width === "string" && this.width.indexOf("%") == -1)) {
					this.width = parseInt(this.width, 10) + "px";
					this.height = parseInt(this.height, 10) + "px";
				}

				this.logExit(arguments);
				
			},
			
		
			
			
			postCreate: function() {
				this.logEnter(arguments);

				var _this = this;
				
				var stateObj = this._getStateObject();
				
				setTimeout(function() {
					if (typeof stateObj.store.data == "undefined" || stateObj.store.data == null) {
						_this.onError(
							{
								code: _this.ERROR.DATASTORE_NOT_FOUND,
								message: "DataStore or Request object not set.", 
								callee: arguments.callee.nom
							}
						);				
					}
				}, 1);


				//once we set the width/height of the coverall control AND the thumbnails,
				//we should be able to derive all other sizes

				dojo.style(
					this.galleryWrapper,
					{
						width: this.width,
						height: this.height
					}
				);

		
				//set the a11y attributes
				dojo.attr(this.thumbnailWrapper, "role", "tablist");
				
				var isBidi = this._getIsBidi();

				var sNext, sPrev;
				
				//if (!isBidi) {
					sNext = "NEXT";
					sPrev = "PREVIOUS";
				//} else {					
				//	sPrev = "NEXT";
				//	sNext = "PREVIOUS";
				//}

				
				dojo.attr(this.navNextImg, "alt", this._getStringResource("THUMBNAILS." + sNext));
				dojo.attr(this.navNextThumbs, "title", this._getStringResource("THUMBNAILS." + sNext));
				dojo.attr(this.navPrevImg, "alt", this._getStringResource("THUMBNAILS." + sPrev));
				dojo.attr(this.navPrevThumbs, "title", this._getStringResource("THUMBNAILS." + sPrev));
				
				dojo.attr(this.itemNextImg, "alt", this._getStringResource("ITEM." + sNext));
				dojo.attr(this.navNextItem, "title", this._getStringResource("ITEM." + sNext));
				dojo.attr(this.itemPrevImg, "alt", this._getStringResource("ITEM." + sPrev));
				dojo.attr(this.navPrevItem, "title", this._getStringResource("ITEM." + sPrev));

				
				//connect a key press with the scroller for a11y
				this._connect(
					_this.thumbnailScroller, 
					"onkeypress",
					function(e) {
						_this.onKeyPress(e);
					}
				);
				
				
				this._connect(
					_this.navPrevThumbs, 
					"onkeypress",
					function(e) {
						_this.onKeyPress(e);
					}
				);			
				
				this._connect(
					_this.navNextThumbs, 
					"onkeypress",
					function(e) {
						_this.onKeyPress(e);
					}
				);				
				
				this._connect(
					_this.navPrevItem, 
					"onkeypress",
					function(e) {
						_this.onKeyPress(e);
					}
				);			
				
				this._connect(
					_this.navNextItem, 
					"onkeypress",
					function(e) {
						_this.onKeyPress(e);
					}
				);


				if (this.selectable) {
					dojo.addClass(this.itemNode, "selectable");
					dojo.attr(this.itemNode, "tabindex", "0");
					
					this._connect(
						_this.itemNode, 
						"onclick",
						function(e) {
							_this.onSelect(
								_this.getItem()
							);
						}
					);
				
				}
				
				this._loadUI();

				
				//BB - HACK
				//This is a hack fix for defect 813.  If we're in a dialog and the 
				//classname changes for ie7 bidi, stuff disappears.
				//Probably related to hasLayout IE bug, but not able to fix in time.  
				//Hack no-ops the dialog's changing of class names.
				if (this._getIsBidi() && dojo.isIE && dojo.isIE == 7) {
					var pNode = this.domNode.parentNode;

					while (pNode) {
						if (dojo.hasAttr(pNode, "widgetid")) {
							var el = dijit.byId(dojo.attr(pNode, "widgetid"));
							if (el && el._setStateClass) {
								el._setStateClass = function() {};
								break;
							}
						}
						pNode = pNode.parentNode;
					}
				}
				//BB - END HACK


				this.logExit(arguments);			
			
			},
			
			_loadUI: function() {
				var _this = this;
				
				var stateObj = this._getStateObject();
				
				var loadFirst = function() {

					_this.resize(
						function() {
							_this._loadSelectedItem(
								null,
								function() {
									_this.onLoad();
								}
							);
						}
					);

				};
				
				if (stateObj.store.data) {
					if (this.total < 0) {
						stateObj.store.data.fetch(
							{
								onBegin: function(total) {
									if ( _this.count > 0 && total > _this.count ) total = _this.count;
									
									_this.total = total;
									loadFirst();
								},
								onError: function(err) {
									console.log(err);
									_this.logError(err);
								}, 
								start: 0, 
								count: 0
							}
						);
					} else {
						setTimeout(
							function() {
								loadFirst();
							},
							100
						);
					}
				}			
			},
			
			
			resize: function(callback) {
				this.logEnter(arguments);

				var stateObj = this._getStateObject();
				
				var mb_nav = dojo.marginBox(this.thumbnailStripWrapper);
				
				var iMargin = this.parseInt(dojo.style(this.navPrevThumbs, "width"), 10) + this.parseInt(dojo.style(this.navPrevThumbs, "left"), 10) + 1;
				var iWidth = mb_nav.w - (iMargin*2);
					
				
				if (dojo.isIE) {
					dojo.style(
						this.thumbnailScroller,
						{
							width: iWidth + "px"
						}
					);				
				}
				
				
				//this will center the thumbnails
				if (this.padThumbnailStrip) {
					var iPadding = this.parseInt(((iWidth/2) - (this.parseInt(stateObj.thumbWidth, 10)/2)), 10);
					dojo.style(
						this.thumbnailWrapper,
						{
							paddingRight: iPadding + "px",
							paddingLeft: iPadding + "px"
						}
					);
				}
				

				//size the items section
				var galleryHeight = dojo.marginBox(this.galleryWrapper).h;
				var thumbHeight = dojo.marginBox(this.thumbnailStripWrapper).h;
				var footerHeight = dojo.marginBox(this.footerWrapper).h;
				var itemHeight = dojo.marginBox(this.itemWrapper).h;
			
				
				itemHeight += galleryHeight - (thumbHeight + itemHeight + footerHeight);
				

				dojo.style(
					this.itemWrapper,
					{
						height: itemHeight + "px"
					}
				);
				
		
				var navIconHeight;
				
				//navIconHeight = (dojo.isIE)?20:30;
				//this._scaleBackgroudHeight(this.navPrevThumbs, navIconHeight);
				//this._scaleBackgroudHeight(this.navNextThumbs, navIconHeight);				

				//navIconHeight = 66;
				//this._scaleBackgroudHeight(this.navPrevItem, navIconHeight);
				//this._scaleBackgroudHeight(this.navNextItem, navIconHeight);
				

				
				if (typeof callback === "function") {
					callback();
				}
				
				
				this.logExit(arguments);	
			},
			
			_scaleLoop: 0,
			_scaleBackgroudHeight: function(el, navIconHeight) {
				try {	
					var newH = (dojo.marginBox(el).h / 2) - (navIconHeight / 2);
					var _this = this;
					if (newH < 0 && this._scaleLoop++ < 500) {
						setTimeout(function() {
							_this._scaleBackgroudHeight(el, navIconHeight);
						},100);
					} else {

						this._scaleLoop = 0;
						if (dojo.isIE) {
							dojo.style(
								el,
								{
									backgroundPositionY: newH + "px"
								}
							);
						} else {
							var aPos = dojo.style(el).backgroundPosition.split(" ");
							if (aPos.length > 1) {
								aPos[1] = newH + "px";
								dojo.style(
									el,
									{
										backgroundPosition: aPos[0] + " " + aPos[1]
									}
								);
							}
						}
					
					}
				} catch (ee) {}
			},


			destroy: function() {
				this.logEnter(arguments);


				//reset the data
				this.reset(false);
				
				
				//unload any styles added to the head tag specifically for this control
				this._unloadStyles();

				
				this.inherited(arguments);
				
				this.logExit(arguments);
				
			},
			
			
			
			//INTERNAL WIDGET FUNCTIONS AND PROPERTIES			
			
			_scrollThumbnailsTo: function(index, callback) {
				this.logEnter(arguments);

				var stateObj = this._getStateObject();
				
				var isBidi = this._getIsBidi();
				
				index = this._checkIndex(index, stateObj.thumbIndex);

				var thumbW = this._getThumbNodeWidth();
				var availW = dojo.style(this.thumbnailScroller, "width");
				
				var tn = stateObj.thumbNodes[index];
				
				var offset; 
				var doRender = true;
				
				if (isBidi && dojo.isWebKit) {
				
					offset = thumbW * (stateObj.thumbNodes.length - 1 - index);
					offset += this.parseInt(thumbW / 2, 10);
					
				} else
				if (isBidi && dojo.isIE && dojo.isIE == 7) {
					//this.animate = false;

					offset = thumbW * (stateObj.thumbNodes.length - 1 - index);
					offset += thumbW + 10;	
					
				} else 
				if (isBidi && dojo.isIE) {

					offset = thumbW * (index);
					offset += this.parseInt(thumbW / 2, 10) + 10;
				
				} else {
				
					offset = tn.offsetLeft;
					offset += this.parseInt(thumbW / 2, 10);
					
				}

				offset -= dojo.style(stateObj.thumbNodes[index], "marginLeft")+dojo.style(this.thumbnailWrapper, "paddingLeft");
				offset -= this.parseInt(availW / 2, 10);
				offset += dojo.style(stateObj.thumbNodes[index], "marginLeft")+dojo.style(stateObj.thumbNodes[index], "marginRight");

				if (this.animate) {
					var anim = this._fxScrollTo(
						{
							target: {x: offset, y: 0},
							win: this.thumbnailScroller,
							duration: 300
						}
					);
					
					if (typeof callback === "function") {
						anim.onEnd = callback;
					};
					anim.play(10);
				} else {
//*
					var _this = this;
					setTimeout(function() {
						_this.thumbnailScroller.scrollLeft = offset;
						if (typeof callback === "function") {
							callback();
						};						
					},1);
//*/
				
				}

				
				this._adjustThumbnailNavControls(index);
				
				this.logExit(arguments);

			},
			
			_fxScrollTo: function(args) {

				var delta = {
					x: args.target.x, 
					y: args.target.y
				};
				
				var anim = new dojo.Animation(
					dojo.mixin(
						{
							beforeBegin: function(){
								if(this.curve){ delete this.curve; }
								var current = {x: args.win.scrollLeft, y: args.win.scrollTop};

								anim.curve = new dojox.fx._Line([current.x,current.y],[delta.x,delta.y]);
							},
							onAnimate: function(val){
	
								args.win.scrollLeft = val[0];
								args.win.scrollTop = val[1];
							}
						},
						args
					)
				);
				return anim;		
			},		
			
			_fxFadeOut: function(el, duration, callback) {
				this.logEnter(arguments);
				
				if (this.animate) {
					var fadeOutParams =
					{
							node: el,
							duration: duration || 300
					}
					if (typeof(callback) === "function")
						fadeOutParams.onEnd = callback;
					dojo.fadeOut(fadeOutParams).play();
				} else {
					dojo.style(el,"opacity", 0);
					if (typeof callback === "function") {
						callback();
					};
				}
				
				this.logExit(arguments);
			},
			
			_fxFadeIn: function(el, duration, callback) {
				this.logEnter(arguments);
				
				if (this.animate) {
					if (typeof(callback) == "undefined") {
						dojo.fadeIn(
								{
									node: el,
									duration: duration || 300
								}
							).play();
					}
					else {
						var fadeInParams =
						{
								node: el,
								duration: duration || 300
						};
						if (typeof(callback) === "function")
							fadeInParams.onEnd = callback;
						
						dojo.fadeIn(fadeInParams).play();
					}	
				} else {
					dojo.style(el,"opacity", 1);
					if (typeof callback === "function") {
						callback();
					};				
				}
				
				this.logExit(arguments);
			},
			
			_getThumbNodeWidth: function() {
				var stateObj = this._getStateObject();
				var ret = -1;
				for (var ii = 0; ii < stateObj.thumbNodes.length; ii++) {
					if (stateObj.thumbNodes[ii]) {
						ret = dojo.marginBox(stateObj.thumbNodes[ii]).w;
						break;
					}
				}
				
				if (ret == -1) {
					ret = 50;
				}
				
				return ret;
			},
			
		
			_getThumbsPerPage: function() {
				var thumbW = this._getThumbNodeWidth();
				var availW = dojo.style(this.thumbnailScroller, "width");
				
				return Math.round(availW / thumbW);		
			},
			
			_adjustThumbnailNavControls: function(index) {

				var stateObj = this._getStateObject();
		
				index = this._checkIndex(index, stateObj.thumbIndex);
				
				var tpp = this._getThumbsPerPage();
				var len = stateObj.items.length;
				
				var offset = (tpp/2)-1;
				
				var min = 0;
				var max = dojo.marginBox(this.thumbnailWrapper).w;
				max -= (dojo.marginBox(this.thumbnailScroller).w - (dojo.style(this.thumbnailScroller, "marginRight") + dojo.style(this.thumbnailScroller, "marginLeft")));

				this._disableNavIcon(
					this.navPrevThumbs,
					(index <= (min + offset) || len < tpp || len == 0)
				);

				
				
				this._disableNavIcon(
					this.navNextThumbs,
					(index >= (len - offset - 1) || len < tpp || len == 0)
				);	
				
			},		

			
			_checkIndex: function(index, def)  {
				return this._checkValue(index, (this._isBlank(def)?this._getStateObject().current:def));
			},
			_checkValue: function(val, def) {
				return (this._isBlank(val)?(this._isBlank(def)?"":def):val);
			},
			_isBlank: function(val) {
				return (typeof val === "undefined" || val == null);
			},			

			
			
			_disableNavIcon: function(ctrl, bHide) {
				var isHidden = (dojo.hasClass(ctrl, this.CLASS.DISABLED));
				
				var img = dojo.query("img", ctrl);
				if (img.length > 0) img = img[0];
				
				if (!dojo.hasAttr(img,"alt_disabled") && dojo.hasAttr(img, "alt")) {
					dojo.attr(img, "alt_disabled", dojo.attr(img, "alt"));
				}
					
				if (!dojo.hasAttr(ctrl,"title_disabled") && dojo.hasAttr(ctrl, "title")) {
					dojo.attr(ctrl, "title_disabled", dojo.attr(ctrl, "title"));
				}
				

				if (bHide && !isHidden) {
					dojo.addClass(ctrl, this.CLASS.DISABLED);
					dojo.attr(ctrl, "tabindex", "-1");
					if (dojo.hasAttr(ctrl, "title")) dojo.removeAttr(ctrl, "title");
					if (img) dojo.attr(img, "alt", "");
				} else	
				if (!bHide && !!isHidden) {
					dojo.removeClass(ctrl, this.CLASS.DISABLED);
					dojo.attr(ctrl, "tabindex", "0");
					if (dojo.hasAttr(ctrl, "title_disabled")) dojo.attr(ctrl, "title", dojo.attr(ctrl,"title_disabled"));
					if (img && dojo.hasAttr(img, "alt_disabled")) dojo.attr(img, "alt", dojo.attr(img, "alt_disabled"));

				}
				
			},
			
			
			
			_navToItem: function(newIndex, callback) {
				this.logEnter(arguments);
								
				//check to make sure we're in bounds
				if (newIndex >= 0 && newIndex < this._getStateObject().items.length) {
					this._loadSelectedItem(newIndex, callback);
				}
				
				this.logExit(arguments);			
			},
			
			_navToThumbs: function(newIndex, callback) {	
				this.logEnter(arguments);
							
				
				var stateObj = this._getStateObject();
				var _this = this;
				
				//make sure we're in bounds...
				if (newIndex < 0) newIndex = 0;
				if (newIndex > this.total - 1) newIndex = this.total - 1;
				
				
				this._loadItemPage(
					newIndex,
					function() {
						stateObj.thumbIndex = newIndex;
						_this.renderThumbnailStrip(newIndex, callback);
					}
				)				

				this.logExit(arguments);	
			},		

			
			_adjustItemNavControls: function(index) {
				index = this._checkIndex(index);
				
				var stateObj = this._getStateObject();
			
				this._disableNavIcon(
					this.navPrevItem, //(this._getIsBidi()?this.navNextItem:this.navPrevItem), 
					(index == 0 || stateObj.items.length == 0)
				);
				
				this._disableNavIcon(
					this.navNextItem, //(this._getIsBidi()?this.navPrevItem:this.navNextItem), 
					(index == stateObj.items.length - 1 || stateObj.items.length == 0)
				);	
				
			},
			
			_loadSelectedItem: function(index, callback) {
				this.logEnter(arguments);

				index = this._checkIndex(index);

				var _this = this;
				
				
				//first, we need to make sure the page of items is loaded, 
				//on callback from that function, we can load our item
				this._loadItemPage(
					index,
					function() {
						if (_this.total > 0) {
							_this.renderItem(
								index, 
								function() {
									_this._focusedThumbnail = -1;
									if (typeof callback === "function") {
										callback();
									}
									
								}
							);
						} else {
							_this._adjustItemNavControls(index);
							_this._adjustThumbnailNavControls(index);
							dojo.removeClass(_this.itemWrapper, _this.CLASS.LOADING);
						}	
					}
				);
		
				
				
				this.logExit(arguments);
			},
			
			getBlankNodeItem: function(index) {
				this.logEnter(arguments);
				
				
				var sText = this._getStringResource("ITEM.NO_IMAGE");

				var el = dojo.create(
					"div",
					{
						className: this.CLASS.NOIMAGE,
						innerHTML: sText
					}
				);
				
				//call the error function to say item not loaded.
				this.onError(
					{
						code: this.ERROR.ITEM_LOAD_FAILURE,
						message: "Item could not be loaded: " + this._getValue(this.getItem(index), this.itemAttr), 
						callee: arguments.callee.nom
					}
				);
		
				
				this.logExit(arguments);
				
				return el;
				
			},
			
			renderBlankItem: function(index) {
				this.logEnter(arguments);
				
				index = this._checkIndex(index);
				
				var item = this.getItem(index);
				
				item.itemNode = this.getBlankNodeItem(index);

				dojo.empty(this.itemNode);
				
				dojo.style(this.itemNode,"opacity", 1);

				dojo.removeClass(this.itemWrapper, this.CLASS.LOADING);	
				
				dojo.place(item.itemNode, this.itemNode, "last");
				
				this._setCurrentIndex(index);

				
				this.logExit(arguments);
			},
			
			_sizeImageToSpace: function(img) {
				this._sizeImageToSpaceInternal(img, this);
			},
			
			_sizeImageToSpaceInternal: function(img, _this) {
				_this = _this || this

				//get the margin boxes so that we can inspect the dimensions
				//and resize the image to fit into our available area.

				var mb_img = {h: 0, w: 0};
				try {
					mb_img = dojo.marginBox(img);
				} catch (ee) {}
				
				if (mb_img.h == 0 || mb_img.w == 0) {
					mb_img = dojo.mixin(
						mb_img,
						{
							h: img.height,
							w: img.width
						}
					);
				}
				
				var avail = _this._getAvailableSpace();
			
				var availW = avail.w;
				var availH = avail.h;
				

				var diff = {
					w: availW / mb_img.w,
					h: availH / mb_img.h,
					scale: 1
				}
				
				if (diff.w < 1 || diff.h < 1) {  //something's too big for our spot
					if (diff.w < diff.h) {
						diff.scale = diff.w;
					} else {
						diff.scale = diff.h;
					}
					
					
					dojo.attr(
						img, 
						{
							"height": parseInt(mb_img.h * diff.scale, 10),
							"width": parseInt(mb_img.w * diff.scale, 10)
						}
					);
					
					dojo.style(
						img, 
						{
							"height": parseInt(mb_img.h * diff.scale, 10),
							"width": parseInt(mb_img.w * diff.scale, 10)
						}
					);											

				}

				
				//get the box again and set a top margin to center the image vertically
				mb_img = {h: 0, w: 0};
				try {
					mb_img = dojo.marginBox(img);
				} catch (ee) {}
				
				if (mb_img.h == 0 || mb_img.w == 0) {
					mb_img = dojo.mixin(
						mb_img,
						{
							h: img.height,
							w: img.width
						}
					);
				}								
												
				
				dojo.style(
					img,
					{
						"marginTop": parseInt((availH - mb_img.h)/2, 10) + "px"
					}
				);								
				
				var item = this.getItem(dojo.attr(img, "imgidx"));
				
				if (item) {
					item._isLoaded = true;
				}		
			},
			
			/**
			 * Gets the main content resource item.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name getItemNode
			 * @function
			 * @param store Datastore.
			 * @param item Item in the datastore.
			 * @returns node Node of the item to render.
			 */
			getItemNode: function(ds, item) {
				this.logEnter(arguments);
				
				var index = this._checkIndex(item._index);
				
				if (!item) {
					this.onError(
						{
							code: this.ERROR.ITEM_NOT_FOUND,
							message: "Item not found: " + index, 
							callee: arguments.callee.nom
						}
					);
					return null;
				}
				
				var img = new Image();				
			
				dojo.attr(img, "imgidx", index);
				
				var url = this._getValue(item, this.itemAttr);
				
				if (!url || dojo.trim(url).length == 0) {
					this.renderBlankItem(index);
					
				} else {				
				
					item._isLoaded = false;

					this._connect(
						img, 
						"onload", 
						dojo.hitch(
							this,
							function() {
								this._sizeImageToSpace(img);						
							}
						)
					);
					
								
					this._connect(
						img,
						"onerror",
						dojo.hitch(
							this, 
							function() {								
								this.renderBlankItem(dojo.attr(img, "imgidx"));
							}
						)
					);


					
					var title = this._getValue(item, this.titleAttr);
					

					
					dojo.attr(
						img, 
						{
							src: url,
							/*title: title,*/
							alt: title
						}
					);
				}

				this.logExit(arguments);
				return img;			
			},
			
			_getItemNodeByIndex: function(index, callback) {
				this.logEnter(arguments);
				index = this._checkIndex(index);
				
				var stateObj = this._getStateObject();
				
				if (!this.hasItem(index)) {
					stateObj.hasItemLoaded = false;
					
					this.onError(
						{
							code: this.ERROR.ITEM_NOT_FOUND,
							message: "Item not found: " + index, 
							callee: arguments.callee.nom
						}
					);
					
				} else {
					var item = this.getItem(index);
					
					if (!item.itemNode || item.itemNode.innerHTML == "") {
						var url = this._getValue(item, this.itemAttr);
						var title = this._getValue(item, this.titleAttr);
						var link = this._getValue(item, this.linkAttr);

						var img = this.getItemNode(stateObj.store.data, item);
						
						
						var div = dojo.create(
							"div", 
							{
								id: this.id + "_imageDiv" + index
							}
						);

						div.appendChild(img);
						
						item.itemNode = div;
						
					} else {
						item._isLoaded = true;
					}
					if (typeof callback === "function") {
						callback();
					}				

				}
				
				this.logExit(arguments);
			},
			
			
			/**
			 * Determines the available space for the main item to render.  Useful when resizing images or 
			 * other UI elements to fit in the existing space.
			 * @memberOf com.ibm.oneui.mediaGallery
			 * @name _getAvailableSpace
			 * @function
			 * @return object Object containing two elements, w and h (width and height in pixels)
			 */			
			_getAvailableSpace: function() {
		
				var mb_item = dojo.marginBox(this.itemWrapper);
				var mb_prev = dojo.marginBox(this.navPrevItem);
				var mb_next = dojo.marginBox(this.navNextItem);

				
				var availW = mb_item.w;

				availW -= (mb_prev.w + mb_next.w);
				availW -= 20;  //extra padding
				
				var availH = mb_item.h;
				availH -= 40  //extra padding


				return {
					w: availW,
					h: availH
				};
				
			},
			
			_appendItemPageLoad: function(aLoadFunctions, iMin, iMax) {
				var bNeedLoad = false;
				for (var ii = iMin; ii <= iMax; ii++) {
					if (!this.hasItem(ii)) {
						bNeedLoad = true;
						break;
					}
				}
				
				if (bNeedLoad) {
					
					aLoadFunctions.push(
						{
							chainIndex: parseInt(aLoadFunctions.length, 10),
							start: parseInt(iMin, 10),
							count: parseInt(iMax - (iMin - 1), 10)
						}
					);
				}
			},
			

			//loads the page of items for this index
			_loadItemPage: function(index, callback) {
				this.logEnter(arguments);
				
				var stateObj = this._getStateObject();
				
				var _this = this;

				
				if(!stateObj.store.request) { 
					this.onError(
						{
							code: this.ERROR.DATASTORE_NOT_FOUND,
							message: "DataStore or Request object not set.", 
							callee: arguments.callee.nom
						}
					);
					
				} else {

					var iLoadWindow = parseInt((this._getThumbsPerPage() + 1), 10);
					if (iLoadWindow > this.pageSize) iLoadWindow = this.pageSize;
					
					var aLoadWindow = [index-(iLoadWindow), index+(iLoadWindow - 1)];
					var aLoadFunctions = [];
					

					if (aLoadWindow[0] < 0) {
						aLoadWindow[0] = 0;
					}
					else
					if (aLoadWindow[1] > this.total - 1) {
						aLoadWindow[1] = this.total - 1;
					}
					
					this._appendItemPageLoad(aLoadFunctions, aLoadWindow[0], aLoadWindow[1]);
					
					
/*

					
					var iLoadMax = index + iLoadWindow;
					var iLoadMin = index - iLoadWindow;

					var aLoadFunctions = [];
					
					if (iLoadMin < 0) {

						//BB - unremark if we need to wrap
						//this._appendItemPageLoad(aLoadFunctions, this.total + iLoadMin, this.total - 1);
						
						if (!this.padThumbnailStrip) iLoadMax += iLoadWindow;
						this._appendItemPageLoad(aLoadFunctions, 0, iLoadMax);

					} else 
					if (iLoadMax > this.total - 1) {
					
						if (!this.padThumbnailStrip) iLoadMin -= iLoadWindow;
						this._appendItemPageLoad(aLoadFunctions, iLoadMin, this.total - 1);
						
						//BB - unremark if we need to wrap
						//this._appendItemPageLoad(aLoadFunctions, 0, iLoadMax - this.total - 1);						

					
					} else {
					
						this._appendItemPageLoad(aLoadFunctions, iLoadMin, iLoadMax);
					
					}
*/					
					
					var fLoadChainRequsts = function(idx) {
						if (typeof idx == "undefined") idx = 0;
						
						if (idx > aLoadFunctions.length - 1) {
							if (typeof callback == "function") {
								callback();
							}
							
						} else {
							var objF = aLoadFunctions[idx];

							stateObj.store.data.fetch(
								dojo.mixin(
									stateObj.store.request,
									{
										start: objF.start,
										count: objF.count,
										onError: function(err) {
											_this.logError(err);
										},
										onComplete: function(items) {
											if (items.length == 0 && stateObj.items.length == 0) {
												_this.total = 0;
											} else {
												dojo.forEach(
													items, 
													function(item, idx) {
														var idx2 = objF.start + idx;
														if (!_this.hasItem(idx2)) {
															_this.setItem(idx2, item);

															//preload the images retrieved from the store
															_this._preloadItem(idx2, item);

														}
													}
												);
											}

											fLoadChainRequsts(objF.chainIndex + 1);  //load the next request from the chain
										}
									}
								)
							);						
						}
					}
					
					fLoadChainRequsts(); 
					
				
				}
				
				this.logExit(arguments);			
			},
			
			
			_preloadItem: function(index, item) {
				this.logEnter(arguments);

				var stateObj = this._getStateObject();
				
				var _this = this;
				
				setTimeout(
					function() {
						if (_this && _this.domNode) {
							var url = _this._getValue(item, _this.itemAttr);

							var img = new Image();

							dojo.attr(img, "id", _this.id + "__pl_" + index);
							dojo.attr(img, "src", url);
							dojo.attr(img, "alt", "");
							dojo.style(img, {display: "none"});
							dojo.place(img, _this.domNode, "last");
							
							
							//load the thumbnails if they are a different url from the main item
							var thumb = _this._getValue(item, _this.thumbAttr);
							if (thumb && url != thumb) {
							
								var img = new Image();

								dojo.attr(img, "src", thumb);
								dojo.attr(img, "alt", "");
								dojo.style(img, {display: "none"});
								dojo.place(img, _this.domNode, "last");										
							}
						}
					}, 
					index*200
				);
				
				this.logExit(arguments);
			},
			
			_setActiveDescendant: function(index) {
				index = this._checkIndex(index);
				
				var stateObj = this._getStateObject();
				
				var _this = this;
				
				if (stateObj.thumbNodes[index]) {
		
					//reset the old thumbnail to -1 tabindex
					dojo.forEach(
						stateObj.thumbNodes, 
						function(itm, idx) {
							if (itm) {
							
								var img = dojo.query("img", itm);
								if (img.length > 0) img = img[0];
								

								var el = dojo.byId(_this.id + "__sel_" + idx);
								if (idx != index) {
									var sTitle = _this._getThumbnailAlt(_this._getValue(_this.getItem(index), _this.titleAttr));
									
									dojo.attr(
										itm, 
										{
											"tabindex": "-1",
											"aria-selected": "false",
											title: sTitle
										}
									);
									
									if (img) {
										dojo.attr(
											img,
											{
												alt: sTitle
											}
										);
									}
									
									if (el) {
										dojo.removeClass(el, _this.CLASS.SELECTED);
									}
								} else {
									var sTitle = _this._getThumbnailAlt(_this._getValue(_this.getItem(index), _this.titleAttr), true);
									
									dojo.attr(
										itm, 
										{
											"tabindex": "0",
											"aria-selected": "true",
											title: sTitle
										}
									);
									
									if (itm.id) {
										dojo.attr(
											_this.thumbnailWrapper, 
											"aria-activedescendant", 
											itm.id
										);
									}
									
									if (img) {
										dojo.attr(
											img,
											{
												alt: sTitle
											}
										);
									}
									
									if (el) {
										dojo.addClass(el, _this.CLASS.SELECTED);									
									}
								}
								
							}
						}
					);
					
					var imgContainer = stateObj.thumbNodes[index];
					
					if (imgContainer && imgContainer.id) {
						dojo.attr(this.thumbnailWrapper, "aria-activedescendant", imgContainer.id)
					}
				}
				
			},
			
			_setCurrentIndex: function(index) {
				index = this._checkIndex(index);
				
				var stateObj = this._getStateObject();
				
				stateObj.current = index;
				stateObj.thumbIndex = index;
				
				this.onItemChange(
					this.getItem()
				);
				
				this._setActiveDescendant(index);
			},
			
			_getCurrentIndex: function() {
				return this._getStateObject().current;
			},

			
			_loadSupplementalDojo: function() {
				if (this.animate) {
					dojo.require("dojo.fx");
					dojo.require("dojox.fx._core");
		
				}
				
				if (this.loadDefaultStrings) {
					dojo.require("dojo.i18n");
				}			
				
				dojo.require("dojo.string");
				dojo.require("dojo.html");
				
			},
			
			_loadStyles: function(dataStyle) {
				if (!!this.loadIndividualStyles) {
					dataStyle = dataStyle || this.declaredClass + "__" + this.id;
					
					var head = dojo.doc.getElementsByTagName("head")[0];
					head.appendChild(
						dojo.create(
							"link", 
							{
								type: "text/css",
								rel: "stylesheet",
								"data-stylefromwidget": dataStyle,
								href: dojo.moduleUrl("com.ibm.oneui","mediaGallery/resources/css/core.css")
							}
						)						
					);
					head.appendChild(
						dojo.create(
							"link", 
							{
								type: "text/css",
								rel: "stylesheet",
								"data-stylefromwidget": dataStyle,
								href: dojo.moduleUrl("com.ibm.oneui","mediaGallery/resources/css/defaultTheme.css")
							}
						)						
					);
					head.appendChild(
						dojo.create(
							"link", 
							{
								type: "text/css",
								rel: "stylesheet",
								"data-stylefromwidget": dataStyle,
								href: dojo.moduleUrl("com.ibm.oneui","mediaGallery/templates/Viewer.css") 
							}
						)						
					);					
				}				
			
			},

			
			_unloadStyles: function(dataStyle) {
				if (!!this.loadIndividualStyles) {
					dataStyle = dataStyle || this.declaredClass + "__" + this.id;
					
					dojo.query('[data-stylefromwidget="' + dataStyle + '"]').orphan();
				}
			}


		
		}
	);
	

	
	dojo.declare("com.ibm.oneui.mediaGallery.internal.FooterNode",
		[com.ibm.oneui._base, dijit._Templated],
		{
			
			templatePath: dojo.moduleUrl("com.ibm.oneui","mediaGallery/templates/FooterNode.html"),

			stateObj: {},
			item: null,

			total: -1,
			index: 0,
			
			
			buildRendering: function() {

				var item = this.item;
				
				var attr = this.stateObj.store.attributes;
				
				var title = this._getValue(item, attr.titleAttr) || "";
				var desc = this._getValue(item, attr.descAttr) || "";
				var date = this._getValue(item, attr.dateAttr) || "";
				var author = this._getValue(item, attr.authorAttr) || "";
				var link = this._getValue(item, attr.linkAttr) || "";
				var file = this._getValue(item, attr.itemAttr) || "";
				
				
				if (title == null || title.length == 0) {
					if (file.indexOf("/") > -1) {
						file = file.substring(file.lastIndexOf("/") + 1);
					}
					
					title = file;
				}
				

				var sCount;
				if (this.total >= 0) {
					sCount = this._getStringResource("ITEM.FOOTER.COUNT");
				} else {
					sCount = this._getStringResource("ITEM.FOOTER.COUNT_NOEND");
				}

				var sTotal;				
				if (dojo.number && typeof this.total === "number") {
					sTotal = dojo.number.format(this.total);
				} else {
					sTotal = this.total;
				}
				
				sCount = dojo.string.substitute(
					sCount,
					{ 
						current: 1 + this.index, 
						total: sTotal
					}
				);
				
				
				if (link.length > 0) {
					link = dojo.string.substitute(
						this._getStringResource("ITEM.FOOTER.LINK"),
						{ 
							link: link
						}
					);
				}
				
				if (author.length > 0) {
					author = dojo.string.substitute(
						this._getStringResource("ITEM.FOOTER.AUTHOR"),
						{ 
							author: author
						}
					);
				}

				//if it's a date object returned from the data store, localize it according to 
				//dojo.locale
				if (date) {
					if (typeof date === "object") {
						dojo.require("dojo.date.locale");
						date = dojo.date.locale.format(date);
					}
					if (date.length > 0) {
						date = dojo.string.substitute(					
							this._getStringResource("ITEM.FOOTER.DATE"),
							{ 
								date: date
							}
						);
					}
				}				

				
				this._computed = {
					count: sCount,
					title: title,
					desc: desc,
					link: link,
					author: author,
					date: date					
				};

				
				this.inherited(arguments);

				
			},
			
			_getStateObject: function() {
				return this.stateObj;
			},
			
			destroy: function() {
				this.stateObj = null;
				this.item = null;
				
				this.inherited(arguments);
			}
		
		}
	);
