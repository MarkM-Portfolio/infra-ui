/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Mixin that handles the EE actions toolbar which includes the recommendation widget.
 * This class sets the toolbar behavior and handles "like/dislike" events to regenerate the toolbar.
 *
 * Classes that use this mixin have just to call initActionsToolbar() and implement the getActionsToolbarNode() method
 * which should return the node that holds the toolbar (normally the UL with the role="toolbar").
 *
 * Also make sure that your gadget calls the initActionsToolbar() AFTER adding extra buttons to the toolbar and
 * BEFORE calling initializeRecommendations()
 *
 * eg:
 *
 * this.setButtonActions();
 * this.initActionsToolbar();
 * this.initializeRecommendations();
 *
 * @author Marco Vicente
 */

/* globals lconn */

dojo.require("lconn.core.aria.Toolbar");

dojo.provide("com.ibm.social.ee.gadget._ActionsToolbarMixin");

dojo.declare("com.ibm.social.ee.gadget._ActionsToolbarMixin", null, {

    actionToolbarSet: false,

    /**
     * abstract. should be implemented by children.
     */
    getActionsToolbarNode: function () {

        throw new Error("Not implemented");
    },
    /**
     * this method sets up aria-toolbar behavior to the action buttons, and adds a listener that recreates
     * the toolbar when a like action is performed
     * @param buttonsContainer
     */
    initActionsToolbar: function () {

        var buttonsContainer = this.getActionsToolbarNode();

        var fnsetupActionsToolbar = dojo.hitch(this, function (message) {
            this.setupActionsToolbar(buttonsContainer, message);
        });

        dojo.subscribe("com/ibm/oneui/recommend/inline/likeActionComplete", function(message){
            fnsetupActionsToolbar(message);
        });
    },
    /**
     * adds aria-toolbar behavior to the action buttons.
     * if we call this after a likeAction is performed we also set the focus appropriately
     *
     * @param buttonsContainer
     * @param likeActionPerformed
     */
    setupActionsToolbar: function (buttonsContainer, message) {

        if(!this._isEventFromThisRecommendationNode(buttonsContainer, message)){
            return;
        }

        dijit.setWaiRole(buttonsContainer, "toolbar");

        if (this.actionsToolbar) {
            this.actionsToolbar.destroy();
        }

        this.actionsToolbar = new lconn.core.aria.Toolbar(buttonsContainer);

        if (this.actionToolbarSet) {
            if (this.actionsToolbar.allItems && this.actionsToolbar.allItems.length >= 1) {
                this.actionsToolbar.selIdx = 1;
            }

            this.actionsToolbar.focus();
        } else {
            this.actionToolbarSet = true;
        }
    },
    /**
     * we only want to catch events from this node
     */
    _isEventFromThisRecommendationNode: function(buttonsContainer, message){

        var recommendationsNode = null;

        if(message){
            recommendationsNode =  message.recommendationsNode;

            var likeElementList = dojo.query(".lotusLike", buttonsContainer);

            if (likeElementList.length > 0){

                var likeElement = likeElementList[0];
                if(likeElement){
                    return likeElement.id === recommendationsNode.id;
                }
            }
        }
    }
});