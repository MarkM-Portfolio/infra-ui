/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2012, 2021                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.as.nav.ASSideNav");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("lconn.homepage.as.badge.ActionRequiredBadge");
dojo.require("lconn.homepage.as.badge.MyNotificationsBadge");
dojo.require("lconn.homepage.as.badge.MentionsBadge");
dojo.require("com.ibm.social.as.util.AbstractHelper");
dojo.require("com.ibm.social.as.util.configNormalizer");
dojo.require("lconn.core.config.properties");
dojo.require("lconn.core.util.LCDeferred");

dojo.require("dojo.i18n");
dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.nav.ASSideNav", 
[dijit._Widget, dijit._Templated,
 com.ibm.social.as.util.configNormalizer],
{
	// The currently selected view's id
	selectedViewId: "",
	
	// AS config - defining the views - to me mixedin
	configObject: null,
	
	//check from debug=dojo
	query: null,
	
	// Event to be called for changing the AS view
	abstractHelper: null,
	
	// should the menu have "real" links or just javascript handlers?
	useHrefs: true,
	
	hiddenASViews: "",
	
	myNotificationViewId: "myNotifications",
	
	mentionsViewId: "atMentions",
	
	actionRequiredViewId: "actionRequired",
	
	badgesSet: false,
	
	badgeLoadEvent: com.ibm.social.as.constants.events.BADGE_DATA_LOADED,
	
	templatePath: dojo.moduleUrl("com.ibm.social.as", "nav/templates/ASSideNav.html"),

    startupComplete: false,

	selectedLabel: "",

	postMixInProperties: function(){
		
		this.debug = ( typeof as_console_debug != "undefined" ) ? as_console_debug 
				: ( typeof hp_console_debug != "undefined" ) ? hp_console_debug : function() {};
		this.query = window.location.search;
		
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");

		this.selectedLabel=this.strings.selectedLabel + " - ";
		if (window.ui && window.ui._check_ui_enabled()) {
			this.selectedLabel = "";
		}

		this.abstractHelper = new com.ibm.social.as.util.AbstractHelper();
		if(!this.configObject){
			this.configObject=activityStreamConfig;

		}
		this.contextPath = lconn.core.url.getServiceUrl(lconn.core.config.services.homepage).uri;
	},
	
	postCreate: function(){
		// allow the user photo to display
		dojo.addClass(dojo.body(), "hasSideNav");
		
		// Subscribe to Activity Stream state updates. 
		this.subscribe(com.ibm.social.as.constants.events.STATEUPDATED, dojo.hitch(this, function(stateObj){
			// When a state update fires, change our view to the new one.
			this.setSelectedView(stateObj[0]);
			dojo.publish(com.ibm.social.as.constants.events.CHANGEPAGETITLE,[this.configObject.filters.options[stateObj[0]].label]);
		}));
		
		if ( this.configObject && this.configObject.filters ) {
			for ( var viewId in this.configObject.filters.options ) {
				var view = this.configObject.filters.options[viewId];
				this.debug("SideNav - viewId: ", viewId, ", view: ", view);
				
				var href = this.contextPath + "/web/updates/"+this.query+"#";
				var hashFragment = this.buildHashFragment(viewId, view);
				href += hashFragment;
				if(!this.useHrefs) {
					href = "javascript:;";
				}
		
				var li = dojo.create("li", { id: viewId + "View", "class": "lconnHomepage-" + viewId }, this.navUl);
				this[viewId + "View"] = li;
						
				var a = dojo.create("a", { 
						id: "_" +viewId, 
						href: href,  
						role: "button",
						"data-navbutton": "true",
						title: view.description
					},
					li);
				
				dojo.create("img", { 
					src: this._blankGif, 
					alt: "",
					className: "lconnStreamIcon", 
					role: "presentation"},
				a);
				
				var textNode = dojo.doc.createTextNode(view.label);
				a.appendChild(textNode);				
                switch (viewId){
                    case this.actionRequiredViewId:
                        var badge = dojo.create("span", {}, a);
                        new lconn.homepage.as.badge.ActionRequiredBadge({}, badge);
                        break;
                    case this.myNotificationViewId:                    	
                    	this.initializeBadgeNumbersNonASView();
                        var badge = dojo.create("span", {}, a);
                        new lconn.homepage.as.badge.MyNotificationsBadge({}, badge);
                        break;
                    case this.mentionsViewId:
                    	this.initializeBadgeNumbersNonASView();
                        var badge = dojo.create("span", {}, a);
                        new lconn.homepage.as.badge.MentionsBadge({}, badge);
                        break;
                    default:
                        break;
                }

				this.connect(li, "onclick", dojo.hitch(this, "viewClicked", viewId));
            }
		} 
		
		if(lconn.core.config.properties["com.ibm.lconn.homepage.config.HiddenASPages"]!=null) {
			this.hiddenASViews = lconn.core.config.properties["com.ibm.lconn.homepage.config.HiddenASPages"].split(",");		
			dojo.forEach(this.hiddenASViews, function(viewId, i){
				dojo.addClass(viewId + "View", "lotusHidden");
			}, this);
		}
		
		//Sticky header
		this.navParent = dojo.byId("homepageLeftNavigationMenuContainer");
		if(this.navParent) {			    
		    this.connect(window, "onscroll", dojo.hitch(this, "setSticky"));
		    this.connect(window, "onresize", dojo.hitch(this, "setSticky"));
		}     	 		
	},
	
	/**
	 * This will detect if not in ActivityStream View on the homepage only
	 * If so then call back for the notification & mentions badge nums via AS feed
	 */
	initializeBadgeNumbersNonASView: function(){
		var pathname = window.location.pathname;
    	if((!this.badgesSet && pathname.indexOf("/web/updates/") == -1) && lconn && lconn.homepage){
    		this.badgesSet = true;
            this.makeBadgeUpdateRequest();
    	}
	},
	
	makeBadgeUpdateRequest: function(){
		var helper = (typeof activityStreamAbstractHelper !== "undefined") ? activityStreamAbstractHelper : new com.ibm.social.as.util.RouteHelper({cfg: this.configObject});
        var urlCalled = helper.getBadgesDataUrl();
        var networkObj = (typeof activityStreamAbstractHelper !== "undefined") ? activityStreamAbstractHelper : dojo;
        var promise = new lconn.core.util.LCDeferred();	   
        networkObj.xhrGet({
            url: urlCalled,
            handleAs: "json",
            load: dojo.hitch(this,function(response) {
                if (response && response.connections) {
               	 if(!lconn.homepage.global){
               		 lconn.homepage.global = {};
               	 }
                    lconn.homepage.global.unreadNotificationsTotal = response.connections["unreadNotifications"];
                    lconn.homepage.global.unreadMentionsTotal = response.connections["unreadMentions"]; 
                    dojo.publish(this.badgeLoadEvent);
                    promise.resolve();
                }
            }),
            timeout: 10000
            
        });
        return promise;
	},
	
	getWinOffset: function(){
		return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	},
	
	setSticky: function(){
		if(!this.topOffset){
			this.topOffset = dojo.position(this.navParent, true).y - 10;
		}
		
		var isPaletteOpen = false;
		
		if (typeof dojo.global.isPaletteOpen != 'undefined' && dojo.global.isPaletteOpen){
			isPaletteOpen = true;
		} 
		
		if (!isPaletteOpen && this.getWinOffset() > this.topOffset && document.body.offsetWidth > 990) {	   
	      //block ie8 left nav stick until 110187 if fixed
	      if(!dojo.isIE || dojo.isIE != 8){
	    	  dojo.addClass(this.navParent, "isSticky");
	      }
	    } else {
	        dojo.removeClass(this.navParent, "isSticky");
	    }
	},


	/**
	 * Called when a list view in the side nav is clicked.
	 * Updates the selectedViewId and updates the AS view.
	 * @param e {Event}
	 */
	viewClicked: function(viewId){
		// Set the selected view based on the id of the target node.
		this.setSelectedView(viewId, true, true);
	},

	/**
	 * Sets the selected view to the viewId if it is supported
	 * and it is not already selected.
	 * @param viewId {String} ID of the view you want selected
	 * @param updateAS {Boolean} true if you want to update the
	 * Activity Stream
	 * @param force {Boolean} true if we want to force an update
	 */
	setSelectedView: function(viewId, updateAS, force){
		// Change the selected view
		this.changeSelectedView(this.selectedViewId, viewId, updateAS);
	},
	
	/**
	 * Change the selected view and send event publish, notifying others of
	 * the change.
	 * @param oldViewId {String} ID of the old view
	 * @param newViewId {String} ID of the new view
	 */
	changeSelectedView: function(oldViewId, newViewId, updateAS){

		if (newViewId == "topUpdates") {
			// interupt rendering AS, top updates will be rendered instead.
			return;
		}

		// Toggle the HTML classes
		this.toggleSelectedViewClasses(oldViewId, newViewId);
		
		this.maintainDescription(oldViewId, newViewId);

		// If we want to update the AS
		if(updateAS){
			// Create the state object
			var stateArr = [];
				
			// If we are selecting a new view and this is not a page refresh
			if(newViewId != this.selectedViewId){
				// Create a new state object with the new view id
				stateArr.push(newViewId);
			}
			
			// Call an update state event. The AS should be listening.
			this.abstractHelper.call(com.ibm.social.as.constants.events.UPDATESTATE, [stateArr]);
		}
		
		// Update the selected view
		this.selectedViewId = newViewId;
	},
	
	/**
	 * Toggle 'lotusSelected', moving it from the old view to the new one.
	 * @param oldViewId {String} ID of the old view
	 * @param newViewId {String} ID of the new view
	 */
	toggleSelectedViewClasses: function(oldViewId, newViewId){
		var oldViewNode = this[oldViewId + "View"];
		if(oldViewNode){
			// Remove the 'lotusSelected' class from the currently selected view
			dojo.removeClass(oldViewNode, "lotusSelected");
		}
		
		// Add the 'lotusSelected' class to the new one
		dojo.addClass(this[newViewId + "View"], "lotusSelected");
	},
	
	maintainDescription: function(oldViewId, newViewId) {
		try {
			if (oldViewId) {
				var oldNavButton = dojo.query("[data-navbutton]", this[oldViewId + "View"])[0];
				var idx = oldNavButton.title.indexOf(this.selectedLabel);
				if(idx == 0) {
					oldNavButton.title = oldNavButton.title.substring(this.selectedLabel.length);
				}
			}

			//add "Selected" to new
			var newNavButton = dojo.query("[data-navButton]", this[newViewId + "View"])[0];
			var idx1 = newNavButton.title.indexOf(this.selectedLabel);
			if(idx1 == -1) {
				newNavButton.title = this.selectedLabel + newNavButton.title;
			}

		} catch(err){
			console.error(err);
		}
	},

	/**
	 * Build up the hash fragment based on whether the view contains first or second filters
	 * @param view
	 */ 
	buildHashFragment: function(viewId, view){
		var firstFilterId = "";
		var firstFilterObject = "";
		var hashFragment = viewId;
		if(view.filters){
			for ( var filterId in view.filters.options ) {
				if (filterId){
					firstFilterId = filterId;
					firstFilterObject=view.filters.options[filterId];
					break;
				}
				
			}
			if (firstFilterId){
				hashFragment += "/"+firstFilterId;
			}
			
			var secondFilterId = null;
			if(firstFilterObject.filters){
				for ( var filterId2 in firstFilterObject.filters.options) {
					if (filterId2){
						secondFilterId=filterId2;
						break;
					}
				}
				
			}
			if (secondFilterId){
				hashFragment += "/"+secondFilterId;
			}
			
		}
		return hashFragment;
	}
});
