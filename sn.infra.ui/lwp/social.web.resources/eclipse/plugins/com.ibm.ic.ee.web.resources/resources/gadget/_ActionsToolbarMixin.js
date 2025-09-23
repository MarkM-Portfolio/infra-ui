/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/query",
	"dojo/topic",
	"ic-core/aria/Toolbar"
], function (declare, lang, query, topic, Toolbar) {

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
	
	var _ActionsToolbarMixin = declare("com.ibm.social.ee.gadget._ActionsToolbarMixin", null, {
	
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
	
	        var fnsetupActionsToolbar = lang.hitch(this, function (message) {
	            this.setupActionsToolbar(buttonsContainer, message);
	        });
	
	        topic.subscribe("com/ibm/oneui/recommend/inline/likeActionComplete", function(message){
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
	
			buttonsContainer.setAttribute("role", "toolbar");
	        if (this.actionsToolbar) {
	            this.actionsToolbar.destroy();
	        }
	
	        this.actionsToolbar = new Toolbar(buttonsContainer);
	
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
	
	            var likeElementList = query(".lotusLike", buttonsContainer);
	
	            if (likeElementList.length > 0){
	
	                var likeElement = likeElementList[0];
	                if(likeElement){
	                    return likeElement.id === recommendationsNode.id;
	                }
	            }
	        }
	    }
	});
	return _ActionsToolbarMixin;
});
