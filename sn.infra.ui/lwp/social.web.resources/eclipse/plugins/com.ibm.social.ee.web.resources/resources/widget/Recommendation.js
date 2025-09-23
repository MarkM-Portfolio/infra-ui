/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.Recommendation");

(function () {

    dojo.require("com.ibm.oneui.controls.Like");
    dojo.require("net.jazz.ajax.xdloader");


    dojo.declare("com.ibm.social.ee.widget.Recommendation", [com.ibm.oneui.controls.Like], {
        getPopup: function (popupArgs) {
            if (!this._popup) {
                popupArgs.popupWidth = 260;
                popupArgs.orientation = "B";
                popupArgs.dataStore = this.popupDataStore || this.dataStore;
                popupArgs.getUserProfileUrl = this.getUserProfileUrl;
                popupArgs.getUserPhotoUrl = this.getUserPhotoUrl;
                this._popup = new com.ibm.social.ee.widget.RecommendationPopup(popupArgs);
                this._popup._inlineControl = this;
                this._connect(this._popup, "populateRecommend", dojo.hitch(this, function () {
                    this.onSizeChange(dojo.position(this._popup.containerNode).y + dojo.position(this._popup.containerNode).h + 10);
                }));
                this._connect(this._popup, "onClose", dojo.hitch(this, function () {
                    window.setTimeout(dojo.hitch(this, function () {
                        this.onSizeChange();
                    }), 0);
                }));
                this._popup.onError = dojo.hitch(this, this.onError);
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

    dojo.declare("com.ibm.social.ee.widget.RecommendationPopup", [com.ibm.oneui.controls.LikePopup], {
        populateRecommend: function (dfd) {
            dfd.addCallback(dojo.hitch(this, function () {
                window.setTimeout(dojo.hitch(this, function () {
                    var pos = dojo.position(this.containerNode);
                    if (this._inlineControl) {
                        this._inlineControl.onSizeChange(pos.y + pos.h + 10);
                    }
                }), 0);
            }));
            this.inherited(arguments);
        },
        close: function (e, clicked) {
            //enable escape again after close
            if (dojo.getObject("com.ibm.connections.ee")) {
                com.ibm.connections.ee.allowCloseOnEscape(!clicked);
            }
            this.inherited(arguments);
        },
        open: function (target) {
            //prevent escape from closing the whole gadget
            if (dojo.getObject("com.ibm.connections.ee")) {
                com.ibm.connections.ee.preventCloseOnEscape();
            }
            this.inherited(arguments);
        }
    });

})();
