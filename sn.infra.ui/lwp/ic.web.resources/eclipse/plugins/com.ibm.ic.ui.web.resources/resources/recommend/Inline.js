/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/window",
        "dojo/_base/declare",
        "dojo/string",
        "dojo/dom-construct",
        "dojo/dom",
        "dojo/dom-class",
        "dojo/_base/lang",
        "dojo/cache",
        "dojo/dom-attr",
        "dojo/html",
        "dojo/i18n",
        "dojo/i18n!./nls/Recommender",
        "dojo/query",
        "dojo/text!./templates/Inline.html",
        "dojo/topic",
        "dijit/_Templated",
        "./Popup",
        "./_base"
],
   function(dojo, windowModule, declare, string, domConstruct, dom, domClass, lang, cache, domAttr, html, i18n, i18nRecommender, query, template, topic, _Templated, Popup, _base) {

      /**
       * @class ic-ui.recommend.Inline
       * @extends ic-ui.recommend._base
       * @extends dijit._Templated
       * @author Cesar A Wong <cawong@us.ibm.com>
       */
      return declare("com.ibm.oneui.recommend.Inline", [
                                                 _base,
                                                 _Templated
      ], /** @lends ic-ui.recommend.Inline.prototype */
      {
         coreWidgetClass : "ic-ui/recommend/Inline",
         templateString : template,
         strings : null,
         _popup : null,
         likeSizeSubHandle : null,
         /** Set to disable background on inline widget */
         disableBackground : false,
         /** Set to try to disable popup with list of likers */
         disablePopup : false,

         destroy : function() {
            this.logEnter(arguments);

            this.inherited(arguments);

            if (this.likeSizeSubHandle) {
               this.likeSizeSubHandle.remove();
            }

            if (this._popup != null) {
               this._popup.destroy();
            }

            this.logExit(arguments);
         },

         postMixInProperties : function() {
            this.logEnter(arguments);
            this.strings = i18nRecommender;
            this.inherited(arguments);
            this.logExit(arguments);
         },

         postCreate : function() {
            this.logEnter(arguments);

            this.inherited(arguments);

            // if the control is not read only, show the shark fin
            // connector
            if (this.editable) {
               query(".lotusLikeConnector", this.domNode).forEach(function(divTag) {
                  if (domClass.contains(divTag, "lotusHidden")) {
                     domClass.remove(divTag, "lotusHidden");
                  }
               });
            }

            // RTC 79461 - Register event to handle like size update
            // from popup dialog window
            this.likeSizeSubHandle = topic.subscribe("p_likeSizeUpdate", lang.hitch(this, "updateSizeInline"));

            this.populateRecommend();

            this.logExit(arguments);
         },

         _isPopupDirty : false,

         updateSizeInline : function(popup) {
            this.logEnter(arguments);
            if (this._popup && popup && popup.id == this._popup.id) {
               var size = popup.size;
               var dsId = popup.dataStore.id;
               if (dsId !== undefined && dsId != this.dataStore.id) {
                  return;
               }

               if (this.inlineLikeCount != null) {
                  domConstruct.empty(this.inlineLikeCount);
               }

               var oReplace = {
                  recommendCount : size,
                  id : this.id
               };
               var str = "INLINE.";
               var suffix = ".TEXT";
               if (!this.editable) {
                  suffix = ".READONLYTEXT";
               }

               if (size == 0) {
                  str += "RECOMMENDED_BYNONE";
               }
               else if (size == 1) {
                  str += "RECOMMENDED_BYONE";
               }
               else {
                  str += "RECOMMENDED_BYMANY";
               }

               var sText = string.substitute(this._getStringResource(str + suffix), oReplace);
               var bodyElem = windowModule.body();
               // now set the second part of the smiley which contains
               // the number of recommends
               if (!this.disablePopup) {
                  domAttr.set(this.inlineLaunchPopup, "href", "javascript:;");
                  domAttr.set(this.inlineLaunchPopup, "role", "button");
                  domAttr.set(this.inlineLaunchPopup, "aria-haspopup", "true");
               }

               if (size > 0) {
                  if (this.inlineLikeCount != null) {
                     html.set(this.inlineLikeCount, sText);
                     if (!this.disablePopup) {
                        domAttr.set(this.inlineLaunchPopup, "class", "lotusLikeCount");
                     }
                     else {
                        domAttr.set(this.inlineLaunchPopup, "class", "lotusLikeCount lotusDisabled");
                     }
                  }
               }
               else {
                  // Set inlineLikeCount to &nbsp
                  if (domClass.contains(bodyElem, "dijit_a11y")) {
                     html.set(this.inlineLikeCount, sText);
                  }
                  else {
                     html.set(this.inlineLikeCount, "&nbsp;");
                  }
               }

               if (domClass.contains(bodyElem, "dijit_a11y")) {
                  this.inlineLikeCount.innerHTML = "";
               }
            }
            this.logExit(arguments);
         },

         populateRecommend : function() {
            this.logEnter(arguments);
            // now we need to put out the necessary markup for inline
            // rendering.

            var _this = this;

            domClass.add(_this.domNode, "inlineLoading");
            var ds = this._getStateObject().store.data;

            var setSize = function(size, req) {
               _this.size = size;
            };

            var handleComplete = function() {
               _this.logEnter(arguments);
               domClass.remove(_this.domNode, "inlineLoading");
               // Like-Undo actions
               if (_this.inlineLikeActions != null) {
                  domConstruct.empty(_this.inlineLikeActions);
               }
               if (_this.inlineLikeCount != null) {
                  domConstruct.empty(_this.inlineLikeCount);
               }

               var str = "INLINE.";
               var suffix = ".TEXT";
               if (!_this.editable) {
                  suffix = ".READONLYTEXT";
               }

               if (_this._getRecommend()) {
                  // this person already recommended it.
                  str += "RECOMMENDED";
               }
               else {
                  // this person didn't recommended it yet.

                  str += "UNRECOMMENDED";
               }

               var iNumNames = _this.size;
               if (_this.prev_iNumNames == undefined) {
                  _this.prev_iNumNames = 0;
               }
               else {
                  _this.prev_iNumNames = iNumNames;
               }

               // Disable clickability for no recommenders, or if this
               // user is only recommender.
               // RTC 79458 - Removed case where you are the only
               // liker, as we now want the pop up to show
               if (iNumNames == 0 || _this.disablePopup) {
                  dojo.removeAttr(_this.inlineLaunchPopup, "href");
                  dojo.removeAttr(_this.inlineLaunchPopup, "role");
                  dojo.removeAttr(_this.inlineLaunchPopup, "title");
                  dojo.removeAttr(_this.inlineLaunchPopup, "aria-haspopup");
                  dojo.removeAttr(_this.inlineLaunchPopup, "aria-label");

                  var inlineClasses = "";
                  if (_this.disableBackground) {
                     inlineClasses = "lconnLikeCountNoBackground lotusDisabled";
                  }
                  else {
                     inlineClasses = "lotusLikeCount lotusDisabled";
                  }

                  domAttr.set(_this.inlineLaunchPopup, "class", inlineClasses);
               }
               else if (_this.prev_iNumNames == 0) {
                  domAttr.set(_this.inlineLaunchPopup, "aria-haspopup", true);
               }

               var oReplace = {
                  recommendCount : iNumNames,
                  id : _this.id
               };

               // sText = "you like this - undo" or "Like"
               var sText = string.substitute(_this._getStringResource(str + suffix), oReplace);
               if (_this.inlineLikeActions != null && _this.currentUserId != null) {
                  html.set(_this.inlineLikeActions, sText);
               }

               // Tooltip to use for aria-label and title
               var tooltip = string.substitute(_this._getStringResource(str + ".TOOLTIP"), oReplace);
               var link = dom.byId('TOGGLE_' + _this.id);

               if (link != null) {
                  domAttr.set(link, {
                     "aria-label" : tooltip
                  });
               }

               str = "INLINE.";

               if (iNumNames == 0) {
                  str += "RECOMMENDED_BYNONE";
               }
               else if (iNumNames == 1) {
                  str += "RECOMMENDED_BYONE";
               }
               else {
                  str += "RECOMMENDED_BYMANY";
               }

               // Tooltip to use for aria-label and title
               tooltip = string.substitute(_this._getStringResource(str + ".TOOLTIP"), oReplace);

               domAttr.set(_this.inlineLaunchPopup, {
                  "aria-label" : tooltip
               });

               sText = string.substitute(_this._getStringResource(str + suffix), oReplace);
               var bodyElem = windowModule.body();
               // now set the second part of the smiley which contains
               // the number of recommends

               if (!_this.disablePopup) {
                  domAttr.set(_this.inlineLaunchPopup, "href", "javascript:;");
                  domAttr.set(_this.inlineLaunchPopup, "role", "button");
                  domAttr.set(_this.inlineLaunchPopup, "aria-haspopup", "true");
               }
               if (iNumNames > 0) {
                  if (_this.inlineLikeCount != null) {
                     html.set(_this.inlineLikeCount, sText);
                     if (!_this.disablePopup) {
                        domAttr.set(_this.inlineLaunchPopup, "class", "lotusLikeCount");
                     }
                     else {
                        domAttr.set(_this.inlineLaunchPopup, "class", "lotusLikeCount lotusDisabled");
                     }
                  }
               }
               else {
                  // Set inlineLikeCount to &nbsp
                  if (domClass.contains(bodyElem, "dijit_a11y")) {
                     html.set(_this.inlineLikeCount, sText);
                  }
                  else {
                     html.set(_this.inlineLikeCount, "&nbsp;");
                  }
               }

               if (domClass.contains(bodyElem, "dijit_a11y")) {
                  _this.inlineLikeCount.innerHTML = "";
               }
               _this.likeAltAP.innerHTML = tooltip;

               // now connect the links

               link = dom.byId('TOGGLE_' + _this.id);
               if (link == null) {
                  // pseudo-translation adds extra characters to the id.
                  link = dom.byId('TOGGLE_[' + _this.id + "]");
               }
               if (link) {
                  _this._connect(link, "onclick", _this, "_toggleRecommend");
               }

               link = _this.inlineLaunchPopup;

               // RTC 79458 - Removed case where you are the only
               // liker, as we now want the pop up to show
               if (link && !_this.disablePopup) {
                  // Connect up to popup
                  var stateObj = _this._getStateObject();
                  var pWid = _this._getPopup(link, stateObj, oReplace);

                  /*
                   * var pWid = new Popup( { debug: _this.debug, editable:
                   * _this.editable, around: link, currentUserId:
                   * _this.currentUserId, strings: { NOUN: oReplace.noun },
                   * dataStore: stateObj.store.data, showActions: false // Don't
                   * show actions in popup - we're showing them inline } );
                   */
                  // pass any errors through to the container
                  _this.connect(pWid, "onError", _this, "onError");

                  // need to see if the popup changed anything so we
                  // can redraw the inline if it's changed
                  _this.connect(pWid, "_toggleRecommend", function() {
                     _this._isPopupDirty = _this._getRecommend() != pWid._getRecommend();
                  });

                  _this.connect(pWid, "onClose", function() {
                     if (_this._isPopupDirty) {
                        setTimeout(function() {
                           _this.populateRecommend();
                           _this._isPopupDirty = false;
                        }, 100);
                     }

                  });

                  stateObj.widgets.push(pWid);
               }

               link = dom.byId('TOGGLE_' + _this.id);
               if (link != null && _this.toggleFocus) {
                  link.focus();
               }

               if (_this.disablePopup) {
                  domAttr.set(_this.inlineLaunchPopup, "class", "lotusLikeCount lotusDisabled");
               }
               _this.logExit(arguments);
            };

            var handleError = function(error) {
               _this.logEnter(arguments);
               ds.revert();
               this._onError(error);
               _this.logExit(arguments);
            };

            if (ds && ds != null) {
               ds.fetchItemByIdentity({
                  identity : this.currentUserId,
                  onItem : function(item) {
                     _this._currentUserItem = item;

                     _this._setRecommend((item != null), function() {
                        ds.fetch({
                           onBegin : setSize,
                           onComplete : handleComplete,
                           onError : handleError,
                           count : _this.count
                        });
                     });

                  }
               });

            }
            // else {
            // // TODO - throw error
            // }
            this.logExit(arguments);
         },

         _getPopup : function(link, stateObj, oReplace) {
            this.logEnter(arguments);
            this.logExit(arguments);
            return this.getPopup({
               debug : this.debug,
               editable : this.editable,
               around : link,
               currentUserId : this.currentUserId,
               dataStore : stateObj.store.data,
               showActions : false
            // Don't show actions in popup - we're showing them inline
            });
         },

         getPopup : function(popupArgs) {
            this.logEnter(arguments);
            if (this._popup == null) {
               this._popup = new Popup(popupArgs);
            }
            this.logExit(arguments);
            return (this._popup);
         }
      });

   });
