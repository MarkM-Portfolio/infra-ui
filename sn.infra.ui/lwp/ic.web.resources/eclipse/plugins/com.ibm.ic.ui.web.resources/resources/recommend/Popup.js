/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/cache",
        "dojo/dom-geometry",
        "dojo/dom-construct",
        "dojo/i18n",
        "dojo/i18n!ic-core/nls/strings",
        "dojo/i18n!./nls/Recommender",
        "dojo/_base/array",
        "dojo/dom-style",
        "dojo/dom",
        "dojo/_base/declare",
        "dojo/html",
        "dojo/dom-attr",
        "dojo/_base/lang",
        "dojo/query",
        "dojo/string",
        "dojo/topic",
        "dijit/_Templated",
        "../DialogUtil",
        "../HoverDialog",
        "../layout/people",
        "./_base",
        "./internal/PersonNode",
        "./internal/PopupContents"
],
   function(dojo, cache, domGeometry, domConstruct, i18n, i18nstrings, i18nRecommender, array, domStyle, dom, declare, html, domAttr, lang, query, string, topic, _Templated, DialogUtil, HoverDialog, people, _base, PersonNode, PopupContents) {

      // var recommendTitle =
      // i18nRecommender.POPUP.RECOMMENDED_HEADER_SHOWING_ALL;

      function callee(args) {
         return args.callee.nom;
      }

      /**
       * @class ic-ui.recommend.Popup
       * @extends ic-ui.recommend._base
       * @extends ic-ui.HoverDialog
       * @author Cesar A Wong <cawong@us.ibm.com>
       */
      return declare("com.ibm.oneui.recommend.Popup", [
                                                HoverDialog,
                                                _base
      ], /** @lends ic-ui.recommend.Popup.prototype */
      {
         // RTC 78809 The orientation is always set to "bottom" when it
         // really should have multiple paths depending on viewport
         // orientation.
         orient : {
            'TR' : 'TL',
            'TL' : 'TR',
            'BR' : 'BL',
            'BL' : 'BR'
         },
         orientRTL : {
            'TL' : 'TR',
            'TR' : 'TL',
            'BL' : 'BR',
            'BR' : 'BL'
         },

         coreWidgetClass : "ic-ui/recommend/Popup",

         // Set to false if we don't show actions in header because
         // launched from inline actions.
         showActions : true,

         count : 25,
         start : 0,
         ds : null, // Datastore
         popupLikeNamesNode : null,
         popupWidth : 300,
         dialogLabelledBy : true,
         dialogTitle : "",

         constructor : function() {
            this.offset = 10;
         },

         onError : function() {
            DialogUtil.alert(this._getStringResource("ERROR.TITLE"), this._getStringResource("ERROR.RECOMMEND_LOAD_FAILED"));
         },

         _clickAround : function(e) {
            var _this = this;

            setTimeout(function() {
               // Override to set container node for Dojo 1.6
               _this.containerNode = _this._getDomNode();
               _this.openWithFocus(_this._determineTarget(e.target));
            }, 100);
         },

         openWithFocus : function(target) {
            var dfd = new dojo.Deferred();
            var args = arguments;
            var _this = this;
			var internalPopup = this._getMasterPopup();
			var node = internalPopup.domNode;
            var top = dojo.create("a", {role: "button", className: "backTopHidden", href: "javascript:;",
                "aria-hidden": "true"}, node);
            dojo.style(top, { top: "-9999px", position: "absolute" });
			dojo.connect(top, "onfocus", this, "backToTop");
            
            dfd.addCallback(function() {
               _this.inherited(args);
            });
            topic.publish("com/ibm/oneui/recommend/popup/onOpen", _this);
            this.populateRecommend(dfd);
			this.focusFirstLink(this.content);            
         },

         destroy : function() {
            this.logEnter(arguments);

            this.inherited(arguments);

            this.logExit(arguments);

         },

         postMixInProperties : function() {
            this.logEnter(arguments);

            this.inherited(arguments);

            if (!this._getStateObject().store.data) {

               this._onError({
                  code : this.ERROR.DATASTORE_NOT_FOUND,
                  message : "Data store not found.",
                  callee : callee(arguments)
               });

            }

            this.logExit(arguments);
         },

         postCreate : function() {
            this.logEnter(arguments);
            this.inherited(arguments);
            var internalPopup = this._getMasterPopup();

            if (internalPopup) {

               this.commonStrings = i18nstrings;

               domAttr.set(internalPopup.closeNode, {
                  "title" : this._getStringResource("rs_close", "", this.commonStrings),
                  "aria-label" : this._getStringResource("rs_close", "", this.commonStrings)
               });
            }
            	this.logExit(arguments);
            },
         
	        backToTop: function (e) {
	        	this.focusFirstLink();
	            return;
	        },
	        
	        focusFirstLink: function (el) {
	        	var origLinks = dojo.query("a", el ? el : this.domNode);
	            var visibleLinks = [];
	            dojo.forEach(origLinks, function (link, i) {
	            	
	                if (dojo.style(link, "display") !== "none" && !dojo.hasClass(link, "lotusAltText") && !dojo.hasClass(link, "backTopHidden") && dojo.hasClass(link, "fn") && dojo.hasClass(link, "url")) {
	                    visibleLinks.push(link);
	                }
	            });
	            var focus = null;
	            if (visibleLinks.length > 0) {
	                focus = visibleLinks[0];
	                dijit.focus(focus);
	            }
	            else {
	            	var internalPopup = this._getMasterPopup();
	            	focus = internalPopup.closeNode;
	                dijit.focus(focus);  //if there are no links in the title, then focus on the close button
	            }
	        	
	            this._firstFocusItem = focus;
	            
	        },
         
         // override the position method so we can adjust the popup
         // left
         // for those cases where the popup is on the right side of the
         // screen
         // a horizontal scroll bar appears because of the oneui
         // styling.
         // Needed to nudge the popup position slightly to the left to
         // correct.
         position : function() {
            this.inherited(arguments);

            var internalPopup = this._getMasterPopup();

            if (internalPopup) {
               var node = internalPopup.domNode;
               node.setAttribute("role", "dialog");
               node.setAttribute("aria-labelledby", internalPopup.id);
               var pos = domGeometry.position(node, true);
               var newleft = pos.x - 5;
               if (newleft < 0) {
                  newleft = 0;
               }
               domStyle.set(node, "left", newleft + "px");
            }
         },

         _isPopulateLoaded : false,
         _editableLink : null,

         populateRecommend : function(dfd) {
            this.logEnter(arguments);
            if (!this._isPopulateLoaded) {

               var _this = this;

               var ds = this._getStateObject().store.data;

               var getWidgetNode = function(nam) {
                  return dom.byId(_this.id + "__" + nam);
               };

               var handleItemLoad = function(item) {

                  // if (_this._getRecommend()) {
                  //
                  // try {
                  // var attr = ds._getIdentifierAttribute();
                  //                     
                  // var itemId = ds.getValue(item, attr, null);
                  //                     
                  // }
                  // catch (ignore) {
                  // }
                  // }

                  if (item._node_ && item._node_[0]) {
                     var refNames = item._node_[0];
                     domConstruct.place(_this.createPersonNode(item), refNames, "last");
                  }

               };

               var handleError = function(error) {
                  ds.revert();
                  _this._onError({
                     code : _this.ERROR.ITEM_LOAD_FAILURE,
                     message : "Error loading item: " + error,
                     callee : callee(arguments)
                  }, error);
               };

               var moveCurrentUserFirst = function(items, currentUser) {
                  // If user is in item array, move it to front.
                  var i, cu;
                  for (i = 0; i < items.length; i++) {
                     if (items[i][ds._getIdentifierAttribute()] == currentUser) {
                        cu = items.splice(i, 1);
                        items.unshift(cu[0]);
                        break;
                     }
                  }
                  return items;

               };

               // This function is called with array of all datastore
               // items.
               //
               var handleComplete = function(items) {
                  if (dfd) {
                     dfd.callback();
                  }

                  items = moveCurrentUserFirst(items, _this.currentUserId);

                  var refMsg = getWidgetNode("recommendMessage");

                  var refNames = getWidgetNode("recommendNames");

                  var refLikeCount = getWidgetNode("popupLikeCount");

                  var refSmiley = getWidgetNode("popupSmiley"); // Smiley
                  // with
                  // count.

                  // Clean out recommendNames node so we can populate
                  // with new list of recommenders.

                  // ** dojo.empty(refNames);
                  if (_this.showActions == false) {
                     if (refMsg != null) {
                        domConstruct.destroy(refMsg);
                     }
                     refMsg = null;
                     // Don't show smiley for authenticated users when
                     // not showing actions.
                     if (refSmiley != null) {
                        domConstruct.destroy(refSmiley);
                     }
                     refSmiley = null;
                  }

                  // Right aligned header count message (e.g. "These
                  // people like this")
                  var headerCountMessageNode = getWidgetNode("popupHeaderCountMessage");

                  // RTC 79461 - Publish the new size for others to
                  // consume, ie inline
                  topic.publish("p_likeSizeUpdate", _this);

                  var curClass, iNumNames = _this.size;
                  if (iNumNames < 0) {
                     iNumNames = items.length;
                  }

                  if (iNumNames == 0 && refSmiley != null) {
                     // Add lotusNoLikes style.
                     curClass = domAttr.get(refSmiley, "class");
                     domAttr.set(refSmiley, "class", curClass + " lotusNoLikes");
                  }
                  else if (refSmiley != null) {
                     // Remove lotusNoLikes
                     curClass = domAttr.get(refSmiley, "class");
                     domAttr.set(refSmiley, "class", curClass.replace("lotusNoLikes", ""));
                  }

                  var str = "POPUP.";
                  if (iNumNames <= 0) {
                     str += "RECOMMENDED_NOTME_MANY";
                  }
                  else if (_this._getRecommend()) {
                     if (iNumNames == 1) {
                        str += "RECOMMENDED_ME_ONLY";
                     }
                     else if (iNumNames == 2) {
                        str += "RECOMMENDED_ME_ONE";
                     }
                     else {
                        str += "RECOMMENDED_ME_MANY";
                     }

                  }
                  else {
                     if (iNumNames == 1) {
                        str += "RECOMMENDED_NOTME_ONE";
                     }
                     else {
                        str += "RECOMMENDED_NOTME_MANY";
                     }

                  }

                  var oReplace = {
                     recommendCount : iNumNames,
                     numshown : _this.count, // max shown: 25
                     total : iNumNames,
                     id : _this.id
                  };
                  var sTip = "";
                  if (_this.showActions) {
                     sTip = _this._getStringResource(str + ".TOOLTIP");
                     sTip = string.substitute(sTip, oReplace);
                  }

                  var sText = _this._getStringResource(str + ".TEXT");
                  sText = string.substitute(sText, oReplace);

                  if (refMsg != null && _this.showActions !== false) {
                     html.set(refMsg, sText);
                  }
                  var count = (iNumNames == 0) ? "&nbsp;" : iNumNames.toString();
                  if (refLikeCount != null) {
                     html.set(refLikeCount, count);
                  }

                  // Add TITLE and ARIA-LABEL attributes to the count.
                  var resourceName = "INLINE.RECOMMENDED_";
                  if (iNumNames == 0) {
                     resourceName += "BYNONE";
                  }
                  else if (iNumNames == 1) {
                     resourceName += "BYONE";
                  }
                  else {
                     resourceName += "BYMANY";
                  }

                  resourceName += ".TOOLTIP";

                  var tooltip = string.substitute(_this._getStringResource(resourceName), oReplace);
                  var link = dom.byId('TOGGLE_' + _this.id);

                  if (link != null) {
                     domAttr.set(link, {
                        "title" : tooltip,
                        "aria-label" : tooltip
                     });
                  }

                  if (refSmiley != null) {
                     domAttr.set(refSmiley, {
                        title : tooltip,
                        alt : tooltip
                     });
                  }

                  // Remove actions node if _this.showActions == false
                  if (_this.showActions == false) {
                     if (refMsg != null) {
                        domConstruct.destroy(refMsg);
                     }
                     refMsg = null;
                  }
                  var messageString = "";
                  // Add the header message "People who like this...",
                  // or "Most recent 25"
                  if (iNumNames > _this.count) {// More than 25, add
                     // "Most recent 25"
                     // messageString =
                     // _this._getStringResource("POPUP.RECOMMENDED_HEADER_SHOWING_SOME");
                     messageString = "";
                  }
                  else {// Showing all names, add "People who like
                     // this..."
                     messageString = _this._getStringResource("POPUP.RECOMMENDED_HEADER_SHOWING_ALL");

                  }
                  // Add lotusRight css class to float the text right
                  // when showing actions
                  if (_this.showActions == true) {
                     messageString = "";
                     // var curClass =
                     // dojo.attr(headerCountMessageNode, "class");
                     // dojo.attr(headerCountMessageNode, "class",
                     // curClass + " lotusRight");

                  }

                  messageString = string.substitute(messageString, oReplace);
                  if (headerCountMessageNode) {
                     html.set(headerCountMessageNode, messageString);
                  }

                  // now connect the link.
                  link = dom.byId('TOGGLE_' + _this.id);
                  if (link == null) {
                     // pseudo-translation adds extra characters to the
                     // id.
                     link = dom.byId('TOGGLE_[' + _this.id + "]");
                  }
                  if (link) {
                     domAttr.set(link, "title", sTip);
                     _this._connect(link, "onclick", _this, "_toggleRecommend");
                  }
                  if (refNames) {
                     domConstruct.empty(refNames);

                     var ii;
                     for (ii = 0; ii < items.length; ii++) {
                        // Hit the max of 25, exit
                        if (_this.count == ii) {
                           break;
                        }

                        items[ii].id = items[ii].id || ds.getValue(items[ii], ds._getIdentifierAttribute(), null);

                        if (ds._getNameAttribute) {
                           items[ii].name = items[ii].name || ds.getValue(items[ii], ds._getNameAttribute(), null);
                        }
                        if (ds._getUserStateAttribute) {
                           items[ii].userState = items[ii].userState || ds.getValue(items[ii], ds._getUserStateAttribute(), null);
                        }

                        items[ii]._node_ = [ domConstruct.create("li", {
                           id : refNames.id + "__" + ii
                        })
                        ];
                        domConstruct.place(items[ii]._node_[0], refNames, "last");
                     }

                     // RTC 85240 Displays a message with 0 people
                     // liking it.
                     if (items.length == 0) {
                        var emptyListNode = domConstruct.create("li", {
                           id : refNames.id + "__" + "0"
                        });
                        html.set(emptyListNode, _this._getStringResource("INLINE.RECOMMENDED_BYNONE.TOOLTIP"));
                        domConstruct.place(emptyListNode, refNames, "last");
                     }
                  }

                  array.forEach(items, function(item, idx) {
                     if (ds.isItem(item)) {

                        if (ds.isItemLoaded(item)) {
                           handleItemLoad(item);
                        }
                        else {

                           ds.loadItem({
                              item : item,
                              onItem : function(item2) {
                                 handleItemLoad(item2);
                              }
                           });
                        }
                     }
                     else {
                        _this._onError({
                           code : _this.ERROR.ITEM_LOAD_FAILURE,
                           message : "Error loading item: " + item,
                           callee : callee(arguments)
                        });
                     }
                  });
                  // _this._isPopulateLoaded = true;

                  var internalPopup = _this._getMasterPopup();

                  if (internalPopup) {
                     var node = internalPopup.domNode;
                     domStyle.set(node, "zIndex", 800);
					 dijit.byId(internalPopup.closeNode).focus();                     
                  }

                  link = dom.byId('TOGGLE_' + _this.id);
                  if (link != null && _this.toggleFocus) {
                     link.focus();
                  }
               };

               var el = getWidgetNode("recommendMessage");
               if (el != null && _this.showActions !== false) {
                  html.set(el, _this._getStringResource("LOADING"));
               }

               var setSize = function(size, req) {
                  _this.size = size;
               };

               if (ds && ds != null) {
                  ds.fetchItemByIdentity({
                     identity : _this.currentUserId,
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
                     },
                     onError : function() {
                        if (_this.onError && lang.isFunction(_this.onError)) {
                           _this.onError.apply(_this, arguments);
                        }
                     }
                  });

               }
               // else {
               // // TODO - throw error
               // }
            }

            this.logExit(arguments);
         },

         createPersonNode : function(pObj) {
            this.logEnter(arguments);

            var pWid = dijit.byId(pObj.id);
            if (pWid != null) {
               pWid.destroy();
            }
            pWid = new PersonNode(pObj);
            this._getStateObject().widgets.push(pWid);

            this.logExit(arguments);

            return pWid.domNode;
         },

         createContents : function(tip) {
            this.logEnter(arguments);

            var _this = this;

            var cWid = new PopupContents({
               currentUserId : this.currentUserId,
               width : this.popupWidth
            });
            this.popupLikeNamesNode = cWid.recommendNames;

            // we need to set the id of the dom nodes we'll populate later.
            // "createContents" is expecting a domNode to be returned now, but
            // the code
            // to populate the UI is being set from the datastore, which uses
            // callbacks and may be asyncronous. So we'll put nodes with
            // placeholder ids
            // and set them when we get a response back from the data store.
            // var attr = "dojoattachpoint"; // =_____=
            var attr = "data-dojo-attach-point";

            query("*[" + attr + "!='']", cWid.domNode).forEach(function(node, idx, arr) {
               if ((!node.id || node.id.length == 0) && dojo.hasAttr(node, attr)) {
                  domAttr.set(node, "id", _this.id + "__" + domAttr.get(node, attr));
                  dojo.removeAttr(node, attr);
               }
            });

            this._getStateObject().widgets.push(cWid);

            this.logExit(arguments);

            return cWid.domNode;
         }
      });
   });
