/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-geometry",
	"ic-ui/controls/Like",
	"net/jazz/ajax/xdloader"
], function (declare, lang, domGeometry, Like, xdloader) {

	(function () {
	
	            var Recommendation = declare("com.ibm.social.ee.widget.Recommendation", Like, {
	        getPopup: function (popupArgs) {
	            if (!this._popup) {
	                popupArgs.popupWidth = 260;
	                popupArgs.orientation = "B";
	                popupArgs.dataStore = this.popupDataStore || this.dataStore;
	                popupArgs.getUserProfileUrl = this.getUserProfileUrl;
	                popupArgs.getUserPhotoUrl = this.getUserPhotoUrl;
	                this._popup = new com.ibm.social.ee.widget.RecommendationPopup(popupArgs);
	                this._popup._inlineControl = this;
	                this._connect(this._popup, "populateRecommend", lang.hitch(this, function () {
	                    this.onSizeChange(domGeometry.position(this._popup.containerNode).y + domGeometry.position(this._popup.containerNode).h + 10);
	                }));
	                this._connect(this._popup, "onClose", lang.hitch(this, function () {
	                    window.setTimeout(lang.hitch(this, function () {
	                        this.onSizeChange();
	                    }), 0);
	                }));
	                this._popup.onError = lang.hitch(this, this.onError);
	            }
	            return this._popup;
	        },
	        onError: function (e, error) {
	            this.onErrorMessage(null, null, this.params.strings.error_404);
	        },
	        onSizeChange: function (height) {
	        },
	        //Instantiating classes can provide this method to handle cases when the item does not exist anymore. E.g., it was delete after the EE was opened
	        onErrorMessage: function () {
	        },
	        populateRecommend: function () {
	
	            this.inherited(arguments);
	        }
	    });
	
	    declare("com.ibm.social.ee.widget.RecommendationPopup", com.ibm.oneui.controls.LikePopup, {
	        populateRecommend: function (dfd) {
	            dfd.addCallback(lang.hitch(this, function () {
	                window.setTimeout(lang.hitch(this, function () {
	                    var pos = domGeometry.position(this.containerNode);
	                    if (this._inlineControl) {
	                        this._inlineControl.onSizeChange(pos.y + pos.h + 10);
	                    }
	                }), 0);
	            }));
	            this.inherited(arguments);
	        },
	        close: function (e, clicked) {
	            //enable escape again after close
	            if (lang.getObject("com.ibm.connections.ee")) {
	                com.ibm.connections.ee.allowCloseOnEscape(!clicked);
	            }
	            this.inherited(arguments);
	        },
	        open: function (target) {
	            //prevent escape from closing the whole gadget
	            if (lang.getObject("com.ibm.connections.ee")) {
	                com.ibm.connections.ee.preventCloseOnEscape();
	            }
	            this.inherited(arguments);
	        }
	    });
	
	})();
	
	return Recommendation;
});
