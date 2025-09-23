/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/event",
	"dojo/dom-geometry",
	"dojo/dom-class",
	"dojo/fx",
	"dojo/_base/fx",
	"dojo/keys",
	"dojo/i18n",
	"dojo/i18n!./nls/SearchPane",
	"dojo/text!./templates/SearchPane.html",
	"dijit/_DialogMixin",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/focus"
], function (declare, lang, eventModule, domGeom, domClass, coreFx, fx, keys, i18n, i18nSearchPane, template, _DialogMixin, _Templated, _Widget, focusUtil) {

	/**
	 * 
	 * @class ic-search/searchPanel/SearchPane
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var SearchPane = declare(
		"lconn.search.searchPanel.SearchPane",
		[_Widget, _Templated, _DialogMixin], /** @lends ic-search.searchPanel.SearchPane.prototype */
	{
		templateString: template,
		paneWidth: 400,
		topSectionClass: "",
		topSectionStyle: "",
		bottomSectionClass: "",
		bottomSectionStyle: "",
		commonStrings: null,
		_modalOnKey: null,
		_focusHandler: null,
		_secondFocusHandler: null,
		_lastFocusEntry: null,
		_isVisible: false,
		
		postMixInProperties: function(){
			this.commonStrings = i18nSearchPane;
			lang.mixin(this, this.commonStrings);
			this.inherited(arguments);
		},
		
		startup: function() {
			this.scrollFixer.style.width = (this.paneWidth - 17) + "px"; // 17 = max scrollbar size
			document.body.appendChild(this.domNode);
			this.containerNode = this.domNode;
			this.connect(this.domNode, "onscroll", "onScrollToUpdate");
		},
		
		show: function() {
			if(this._isVisible) {
				return;
			}
			this._isVisible = true;
			
			this._modalOnKey = this.connect(this.domNode, "keydown", lang.hitch(this, "_onKey"));
			var node = this.domNode;
			var self = this;
			fx.animateProperty({
				node: node,
				duration: 500,
				properties: {
					width: {
						start: 0,
						end: this.paneWidth,
						units: "px"
					}
				},
				onBegin: function() {
					//document.body.style.overflow = "hidden";
					node.style.display = "";
				},
				onEnd: function() {
					self._focusHandler = focusUtil.watch("curNode", function(name, oldValue, newValue) {
						if(!self.domNode.contains(newValue) && focusUtil.activeStack.indexOf(self.id) < 0 && self._isVisible) {
							self.hide();
						}
						self._checkLastFocus(newValue);
					});
					self._secondFocusHandler = focusUtil.watch("activeStack", function(name, oldValue, newValue) {
						if(newValue.indexOf(self.id) < 0 && self._isVisible) {
							self.hide();
						}
					});
					self.onShowEnded();
				}
			}).play();
		},
		
		hide: function() {
			if(!this._isVisible) {
				return;
			}
			this._isVisible = false;
			
			var node = this.domNode;
			var self = this;
			fx.animateProperty({
				node: node,
				duration: 500,
				properties: {
					width: {
						start: this.paneWidth,
						end: 0,
						units: "px"
					}
				},
				onBegin: function() {
					self._focusHandler.remove();
					self._secondFocusHandler.remove();
				},
				onEnd: function() {
					//document.body.style.overflow = "";
					node.style.display = "none";
					self.onHideEnded();
				}
			}).play();
			
			this._modalOnKey.remove();
		},
		
		_onKey: function(evt) {
			if(evt.keyCode == keys.TAB){
				this._getFocusItems(this.domNode);
				var node = evt.target;
				if(this._firstFocusItem == this._lastFocusItem) {
					eventModule.stop(evt);
				} else if(node == this._firstFocusItem && evt.shiftKey) {
					focusUtil.focus(this._lastFocusItem);
					eventModule.stop(evt);
				} else if(node == this._lastFocusItem && !evt.shiftKey) {
					focusUtil.focus(this._firstFocusItem);
					eventModule.stop(evt);
				}
			} else if(evt.keyCode == keys.ESCAPE) {
				this.hide();
			}
		},
		
		_checkLastFocus: function(element) {
			if(this._lastFocusEntry && !this._lastFocusEntry.contains(element)) {
				domClass.remove(this._lastFocusEntry, "spSelected");
			}
		},
		
		_onEntryFocused: function(element) {
			if(this._lastFocusEntry) {
				domClass.remove(this._lastFocusEntry, "spSelected");
			}
			if(!element) {
				return;
			}
			
			this._lastFocusEntry = element;
			domClass.add(this._lastFocusEntry, "spSelected");
			
			var containerPos = domGeom.position(this.domNode);
			var elemPos = domGeom.position(element);
			
			if((elemPos.y + elemPos.h) > (containerPos.y + containerPos.h)) {
				this.domNode.scrollTop += (elemPos.y + elemPos.h) - (containerPos.y + containerPos.h);
			} else if(elemPos.y < containerPos.y) {
				this.domNode.scrollTop +=  elemPos.y - containerPos.y;
			}
		},
		
		focus: function() {
			//Nothing here, just a callback
		},
		
		onScrollToUpdate: function() {
			//Nothing here, just a callback
		},
		
		onShowEnded: function() {
			//Nothing here, just a callback
		},
		
		onHideEnded: function() {
			//Nothing here, just a callback
		}
	});
	
	return SearchPane;
});