/* Copyright IBM Corp. 2011, 2017  All Rights Reserved.              */

(function() {
	
	dojo.provide("com.ibm.oneui.recommend.Inline");

	dojo.require("dijit._Templated");
	dojo.require("dojo.cache");
	dojo.require("com.ibm.oneui.recommend._base");
	
	/**
	 * @class com.ibm.oneui.recommend.Inline
	 * @extends com.ibm.oneui.recommend._base
	 * @extends dijit._Templated
	 * @author Cesar A Wong <cawong@us.ibm.com>
	 */
	dojo.declare("com.ibm.oneui.recommend.Inline", 
		[com.ibm.oneui.recommend._base, dijit._Templated], /** @lends com.ibm.oneui.recommend.Inline.prototype */
		{
			coreWidgetClass: "com.ibm.oneui.recommend.Inline",
			templatePath: dojo.moduleUrl("com.ibm.oneui", "recommend/templates/Inline.html"),
			strings: null,
			_popup: null,
			likeSizeSubHandle: null,
			disableBackground: false, // Set to disable background on inline widget
			disablePopup: false, // Set to try to disable popup with list of likers
			
			destroy: function() {
				this.logEnter(arguments);
				
				this.inherited(arguments);
				
				if(this.likeSizeSubHandle)
					dojo.unsubscribe(this.likeSizeSubHandle);	
					
				if (this._popup != null)
					this._popup.destroy();
				
				this.logExit(arguments);
			},
			
			postMixInProperties: function() {
				this.logEnter(arguments);
				dojo.requireLocalization("com.ibm.oneui.recommend", "Recommender");
				this.strings = dojo.i18n.getLocalization("com.ibm.oneui.recommend", "Recommender");		
				this.inherited(arguments);				
				this.logExit(arguments);	
			},
			
			postCreate: function() {
				this.logEnter(arguments);
								
				this.inherited(arguments);
				
				//if the control is not read only, show the shark fin connector
				if (this.editable) {
					dojo.query(".lotusLikeConnector", this.domNode).forEach(function(divTag){
						if (dojo.hasClass(divTag, "lotusHidden")) {
							dojo.removeClass(divTag, "lotusHidden");
						}
					});
				}
				
				// RTC 79461 - Register event to handle like size update from popup dialog window
				this.likeSizeSubHandle = dojo.subscribe("p_likeSizeUpdate", this,"updateSizeInline");
				
				this.populateRecommend();
				
				this.logExit(arguments);
			},				
			
			_isPopupDirty: false,
			
			updateSizeInline: function(popup){
				if( this._popup && popup && popup.id == this._popup.id) {
					var size = popup.size;
					var dsId = popup.dataStore.id
					if(typeof(dsId) != "undefined" && dsId != this.dataStore.id)
						return;

					if (this.inlineLikeCount != null)
						dojo.empty(this.inlineLikeCount);	

					var oReplace = {
							recommendCount: size,
							id: this.id
					};
					var str = "INLINE.";
					var suffix = ".TEXT";
					if (!this.editable) {
						suffix = ".READONLYTEXT";
					}


					var str = "INLINE.";

					if (size == 0) {
						str += "RECOMMENDED_BYNONE";
					} else if (size == 1) {
						str += "RECOMMENDED_BYONE";
					} else {
						str += "RECOMMENDED_BYMANY";
					}

					var sText = dojo.string.substitute(this._getStringResource(str + suffix), oReplace );
					var bodyElem = dojo.body();
					//now set the second part of the smiley which contains the number of recommends
					if(!this.disablePopup) {
						dojo.attr(this.inlineLaunchPopup, "href", "javascript:;");
						dojo.attr(this.inlineLaunchPopup, "role", "button");
						dojo.attr(this.inlineLaunchPopup, "aria-haspopup", "true");
					}
					
					if (size > 0)
					{
						if (this.inlineLikeCount != null) {
							dojo.html.set(this.inlineLikeCount, sText);
			                if(!this.disablePopup) {
			                    dojo.attr(this.inlineLaunchPopup, "class", "lotusLikeCount");
			                } else {
			                	dojo.attr(this.inlineLaunchPopup, "class", "lotusLikeCount lotusDisabled");
		                    }
						} 
					}
					else {
						// Set inlineLikeCount to &nbsp
						if (dojo.hasClass(bodyElem, "dijit_a11y")) {
							dojo.html.set(this.inlineLikeCount, sText);
						} else {
							dojo.html.set(this.inlineLikeCount, "&nbsp;");
						}
					}
					
		            if (dojo.hasClass(bodyElem, "dijit_a11y")) {
						this.inlineLikeCount.innerHTML = "";
		            }
				}
			},
			
			populateRecommend: function() {
				//now we need to put out the necessary markup for inline rendering.
				
				var _this = this;
				
				dojo.addClass(_this.domNode, "inlineLoading");
				
				
				var ds = this._getStateObject().store.data;
				
				var setSize = function(size, req) {
					_this.size = size;
				};
				
				var handleComplete = function() {
					dojo.removeClass(_this.domNode, "inlineLoading");
					if (_this.inlineLikeActions != null) // Like-Undo actions
						dojo.empty(_this.inlineLikeActions);
					if (_this.inlineLikeCount != null)
						dojo.empty(_this.inlineLikeCount);	
				
					var str = "INLINE.";
					var suffix = ".TEXT";
					if (!_this.editable) {
						suffix = ".READONLYTEXT";
					}
					
					if (_this._getRecommend()) {  
						//this person already recommended it.
						str += "RECOMMENDED";
					} else {
						//this person didn't recommended it yet.
						
						str += "UNRECOMMENDED";
					}

					var iNumNames = _this.size;
					if (_this.prev_iNumNames == undefined) _this.prev_iNumNames = 0; 
					else _this.prev_iNumNames = iNumNames;
					
					// Disable clickability for no recommenders, or if this user is only recommender.
					// RTC 79458 - Removed case where you are the only liker, as we now want the pop up to show
					if (iNumNames == 0 ||  _this.disablePopup) {
						dojo.removeAttr(_this.inlineLaunchPopup, "href");
						dojo.removeAttr(_this.inlineLaunchPopup, "role");
						dojo.removeAttr(_this.inlineLaunchPopup, "title");
						dojo.removeAttr(_this.inlineLaunchPopup, "aria-haspopup");
						dojo.removeAttr(_this.inlineLaunchPopup, "aria-label");
						
						var inlineClasses = "";
						if(_this.disableBackground) {
							inlineClasses = "lconnLikeCountNoBackground lotusDisabled";
						} else {
							inlineClasses = "lotusLikeCount lotusDisabled";
						}

						dojo.attr(_this.inlineLaunchPopup, "class", inlineClasses);
					}
					else if (_this.prev_iNumNames == 0) {
							dojo.attr(_this.inlineLaunchPopup, "aria-haspopup", true);
						}

					var oReplace = {
						recommendCount: iNumNames,
						id: _this.id
					};
					
					// sText = "you like this - undo" or "Like"
					var sText = dojo.string.substitute( _this._getStringResource(str + suffix), oReplace );
					
					
					if (_this.inlineLikeActions != null && _this.currentUserId != null) {
						dojo.html.set(_this.inlineLikeActions, sText);	
					}
					
					// Tooltip to use for aria-label and title
					var tooltip = dojo.string.substitute(_this._getStringResource(str + ".TOOLTIP"), oReplace);
					var link = dojo.byId('TOGGLE_' + _this.id);
		            
					if(link != null) {
						dojo.attr(link,
							{
								"aria-label": tooltip
							});
					}
					
					str = "INLINE.";
					
					if (iNumNames == 0) {
						str += "RECOMMENDED_BYNONE";
					} else if (iNumNames == 1) {
						str += "RECOMMENDED_BYONE";
					} else {
						str += "RECOMMENDED_BYMANY";
					}

					// Tooltip to use for aria-label and title
					var tooltip = dojo.string.substitute(_this._getStringResource(str + ".TOOLTIP"), oReplace);
					
					dojo.attr(_this.inlineLaunchPopup,
							{
								"title":  tooltip
							});
					dojo.attr(_this.inlineSmiley, "alt", "");
					dojo.attr(_this.inlineSmiley, "title", tooltip);
					
					var useHeartLikeIcon = lconn.core.config.features("ui-heart-like-hikari");
					
					if (useHeartLikeIcon && lconn.core.theme.isHikariTheme()) {
						if(_this._getRecommend()){//I like sth, show blue50 heart icon
							dojo.style(_this.inlineSmiley, "background-position", "-1418px -8px");
						}else{// no one likes, show gray empty heart icon
							dojo.style(_this.inlineSmiley, "background-position", "-1395px -8px");
						}
					}
					
					sText = dojo.string.substitute( _this._getStringResource(str + suffix), oReplace );
					var bodyElem = dojo.body();
					//now set the second part of the smiley which contains the number of recommends
					
					if(!_this.disablePopup) {
						dojo.attr(_this.inlineLaunchPopup, "href", "javascript:;");
						dojo.attr(_this.inlineLaunchPopup, "role", "button");
						dojo.attr(_this.inlineLaunchPopup, "aria-haspopup", "true");
					}
					if (iNumNames > 0)
					{
						if (_this.inlineLikeCount != null) {
							dojo.html.set(_this.inlineLikeCount, sText);
							if(!this._disablePopup) {
								dojo.attr(_this.inlineLaunchPopup, "class", "lotusLikeCount");
		                     } else {
		                        dojo.attr(_this.inlineLaunchPopup, "class", "lotusLikeCount lotusDisabled");
		                     }
						} 
					}
					else {
						// Set inlineLikeCount to &nbsp
						if (dojo.hasClass(bodyElem, "dijit_a11y")) {
							dojo.html.set(_this.inlineLikeCount, sText);
					  	} else {
					  		dojo.html.set(_this.inlineLikeCount, "&nbsp;");
						}
					}

		            if (dojo.hasClass(bodyElem, "dijit_a11y")) {
						_this.inlineLikeCount.innerHTML = "";
		            }
		            _this.likeAltAP.innerHTML = tooltip;
					
					//now connect the links

					var link = dojo.byId('TOGGLE_' + _this.id);
					if (link == null)
						// pseudo-translation adds extra characters to the id.
						link = dojo.byId('TOGGLE_[' + _this.id + "]");
					if (link) {
						_this._connect(link, "onclick", _this, "_toggleRecommend");
					}
					
					link = _this.inlineLaunchPopup; 
					
					// RTC 79458 - Removed case where you are the only liker, as we now want the pop up to show
					if (link && !_this.disablePopup) {
						// Connect up to popup
						dojo.require("com.ibm.oneui.recommend.Popup");
						var stateObj = _this._getStateObject();
						var pWid = _this._getPopup(link, stateObj, oReplace);
						
						/*
						var pWid = new com.ibm.oneui.recommend.Popup(
							{
								debug: _this.debug,
								editable: _this.editable,
								around: link,
								currentUserId: _this.currentUserId,
								strings: {
									NOUN: oReplace.noun
								},				
								dataStore: stateObj.store.data,
								showActions: false // Don't show actions in popup - we're showing them inline
							}
						);
						*/
						//pass any errors through to the container
						_this.connect(pWid, "onError", _this, "onError");
						
						//need to see if the popup changed anything so we can redraw the inline if it's changed
						_this.connect(pWid, "_toggleRecommend", function() {
							_this._isPopupDirty = _this._getRecommend() != pWid._getRecommend();
						});
						
						_this.connect(pWid, "onClose", function() {
							if(_this._isPopupDirty) {								
								setTimeout(function() {
									_this.populateRecommend();									
									_this._isPopupDirty = false;
								},100);
							}
							
						});
						
						stateObj.widgets.push(pWid);
					}
					
		            link = dojo.byId('TOGGLE_' + _this.id);
		            if(link != null && _this.toggleFocus) {
		               link.focus();
		            }
		            
		            if(_this.disablePopup) {
	                  dojo.attr(_this.inlineLaunchPopup, "class", "lotusLikeCount lotusDisabled");
	               }

				   if ((typeof window.ICS_UI_ISCNX8UXENABLED !== 'undefined') && window.ICS_UI_ISCNX8UXENABLED) {
					if (document.getElementById("entry_rating_" + _this._getStateObject().store.data.itemId + "_widget")) {
						function insertAfter(referenceNode, newNode) {
							referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
						}
						
					if(!document.getElementById('shareWrapper_' + _this._getStateObject().store.data.itemId)){
						var wrapperDiv = document.createElement('div');
						wrapperDiv.id = 'shareWrapper_' + _this._getStateObject().store.data.itemId;
						// For public blogs
						if(document.getElementById("cnx8_latestBlogsTable")) {
							wrapperDiv.setAttribute("role", "listItem");
							wrapperDiv.className = "shareWrapper";
								// Divider Element 
								var divider = document.createElement('span'); 
								divider.className = "lotusDivider";
								divider.setAttribute("role", "img" );
								divider.innerHTML = "|";
								var likediv = document.getElementById("entry_rating_" + _this._getStateObject().store.data.itemId );
								var metaDiv = document.getElementById("meta_"+ _this._getStateObject().store.data.itemId);
								if(metaDiv && likediv) {
									metaDiv.append(likediv);
									metaDiv.append(divider);
									metaDiv.append(wrapperDiv);
								}
							} else {
								wrapperDiv.style['float'] = 'left';
								wrapperDiv.style['margin-left'] = '20px';
								wrapperDiv.style['margin-top'] = '4px';
								var likediv = document.getElementById("entry_rating_" + _this._getStateObject().store.data.itemId + "_widget");
								insertAfter(likediv, wrapperDiv);
							}
							var elem = document.getElementById("entry-" + _this._getStateObject().store.data.itemId + ":link:entries");
							var url = null;
							if(elem && elem.href) {
								url = elem.href;
							}
						if (com.ibm.ics && com.ibm.ics.apps) {
								com.ibm.ics.apps.loadReactApp(
									'cnx-react-components',
									'share',
									wrapperDiv.id, {
										url: url
									}
								)
							} else {
								com.ibm.ics.loadBundles(function() {
									com.ibm.ics.apps.loadReactApp(
										'cnx-react-components',
										'share',
										wrapperDiv.id, {
											url: url
										}
									)
								});
							}
						}
			   		}
				}
                   dojo.publish("com/ibm/oneui/recommend/inline/likeActionComplete", {recommendationsNode: _this.domNode});
                };
				
				var handleError = function() {
					ds.revert();
					this._onError(arguments[0]);
				};
					
				if (ds && ds != null) {
					ds.fetchItemByIdentity(
						{
							identity: this.currentUserId,
							onItem: function(item) {
								_this._currentUserItem = item;
								
								_this._setRecommend(
									(item != null),
									function() {
										ds.fetch(
											{
												onBegin: setSize,
												onComplete: handleComplete,
												onError: handleError,
												count: _this.count
											}
										);
									}
								);

							}
						}
					);				

				} else {
					//TODO - throw error
				}
				
				
				
				this.logExit(arguments);			
			},
			
			_getPopup: function(link, stateObj, oReplace) {
				return this.getPopup(
					{
						debug: this.debug,
						editable: this.editable,
						around: link,
						currentUserId: this.currentUserId,			
						dataStore: stateObj.store.data,
						showActions: false // Don't show actions in popup - we're showing them inline
					}
				);
			},
			
			getPopup: function(popupArgs) {
				if (this._popup == null)
					this._popup = new com.ibm.oneui.recommend.Popup(popupArgs);
				return(this._popup);
			}

		}
	)
	
	
})();
