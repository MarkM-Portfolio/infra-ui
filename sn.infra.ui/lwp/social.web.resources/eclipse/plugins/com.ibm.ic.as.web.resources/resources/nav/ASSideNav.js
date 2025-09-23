/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/dom-class",
		"dojo/_base/declare",
		"dojo/_base/window",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/dom",
		"dojo/_base/lang",
		"dojo/dom-geometry",
		"dojo/has",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/dom-attr",
		"dojo/on",
		"dojo/query",
		"dojo/text!ic-as/nav/templates/ASSideNav.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-as/util/AbstractHelper",
		"ic-as/util/configNormalizer",
		"ic-core/config/properties",
		"ic-core/config/services",
		"ic-core/url",
		"ic-core/util/LCDeferred",
		"ic-homepage/as/badge/ActionRequiredBadge",
		"ic-homepage/as/badge/MentionsBadge",
		"ic-homepage/as/badge/MyNotificationsBadge"
	], function (dojo, domClass, declare, windowModule, domConstruct, array, dom, lang, domGeometry, has, i18nactivitystream, domAttr, on, query, template, _Templated, _Widget, events, AbstractHelper, configNormalizer, properties, services, url, LCDeferred, ActionRequiredBadge, MentionsBadge, MyNotificationsBadge) {
	
		var ASSideNav = declare("com.ibm.social.as.nav.ASSideNav", 
		[_Widget, _Templated,
		 configNormalizer],
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
			
			badgeLoadEvent: events.BADGE_DATA_LOADED,
			
			templateString: template,
		
		    startupComplete: false,
			
			postMixInProperties: function(){
				
				this.debug = ( typeof as_console_debug != "undefined" ) ? as_console_debug 
						: ( typeof hp_console_debug != "undefined" ) ? hp_console_debug : function() {};
				this.query = window.location.search;
				
				this.strings = i18nactivitystream;
				this.abstractHelper = new AbstractHelper();
				if(!this.configObject){
					this.configObject=activityStreamConfig;
		
				}
				this.contextPath = url.getServiceUrl(services.homepage).uri;
			},
			
			postCreate: function(){
				// allow the user photo to display
				domClass.add(windowModule.body(), "hasSideNav");
				
				// Subscribe to Activity Stream state updates. 
				this.subscribe(events.STATEUPDATED, lang.hitch(this, function(stateObj){
					// When a state update fires, change our view to the new one.
					this.setSelectedView(stateObj[0]);
					topic.publish(events.CHANGEPAGETITLE, this.configObject.filters.options[stateObj[0]].label);
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
				
						var li = domConstruct.create("li", { id: viewId + "View", "class": "lconnHomepage-" + viewId }, this.navUl);
						this[viewId + "View"] = li;
								
						var a = domConstruct.create("a", { 
								id: "_" +viewId, 
								href: href,  
								role: "button",
								"data-navbutton": "true",
								title: view.description
							},
							li);
						
						domConstruct.create("img", { 
							src: this._blankGif, 
							alt: "",
							className: "lconnStreamIcon", 
							role: "presentation"},
						a);
						
						var textNode = windowModule.doc.createTextNode(view.label);
						a.appendChild(textNode);				
		                switch (viewId){
		                    case this.actionRequiredViewId:
		                        var badge = domConstruct.create("span", {}, a);
		                        new ActionRequiredBadge({}, badge);
		                        break;
		                    case this.myNotificationViewId:                    	
		                    	this.initializeBadgeNumbersNonASView();
		                        var badge = domConstruct.create("span", {}, a);
		                        new MyNotificationsBadge({}, badge);
		                        break;
		                    case this.mentionsViewId:
		                    	this.initializeBadgeNumbersNonASView();
		                        var badge = domConstruct.create("span", {}, a);
		                        new MentionsBadge({}, badge);
		                        break;
		                    default:
		                        break;
		                }
		
						this.own(on(li, "click", lang.hitch(this, "viewClicked", viewId)));
		            }
				} 
				
				if(properties["com.ibm.lconn.homepage.config.HiddenASPages"]!=null) {
					this.hiddenASViews = properties["com.ibm.lconn.homepage.config.HiddenASPages"].split(",");		
					array.forEach(this.hiddenASViews, function(viewId, i){
						domClass.add(viewId + "View", "lotusHidden");
					}, this);
				}
				
				//Sticky header
				this.navParent = dom.byId("homepageLeftNavigationMenu");
				if(this.navParent) {			    
				    this.own(on(window, "scroll", lang.hitch(this, "setSticky")));
				    this.own(on(window, "resize", lang.hitch(this, "setSticky")));
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
		        var promise = new LCDeferred();	   
		        networkObj.xhrGet({
		            url: urlCalled,
		            handleAs: "json",
		            load: lang.hitch(this,function(response) {
		                if (response && response.connections) {
		               	 if(!lconn.homepage.global){
		               		 lconn.homepage.global = {};
		               	 }
		                    lconn.homepage.global.unreadNotificationsTotal = response.connections["unreadNotifications"];
		                    lconn.homepage.global.unreadMentionsTotal = response.connections["unreadMentions"]; 
		                    topic.publish(this.badgeLoadEvent);
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
					this.topOffset = domGeometry.position(this.navParent, true).y - 10;
				}
				
				var isPaletteOpen = false;
				
				//use of global anti-pattern - for review
				if (typeof window.isPaletteOpen != 'undefined' && window.isPaletteOpen){
					isPaletteOpen = true;
				} 
				
				if (!isPaletteOpen && this.getWinOffset() > this.topOffset && document.body.offsetWidth > 990) {	   
			      //block ie8 left nav stick until 110187 if fixed
			      if(!has("ie") || has("ie") != 8){
			    	  domClass.add(this.navParent, "isSticky");
			      }
			    } else {
			        domClass.remove(this.navParent, "isSticky");
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
		
				// Toggle the HTML classes
				this.toggleSelectedViewClasses(oldViewId, newViewId);
				
				// Maintain the aria-pressed attribute.
				this.maintainAriaPressed(oldViewId, newViewId);
				
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
					this.abstractHelper.call(events.UPDATESTATE, [stateArr]);
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
					domClass.remove(oldViewNode, "lotusSelected");
				}
				
				// Add the 'lotusSelected' class to the new one
				domClass.add(this[newViewId + "View"], "lotusSelected");
			},
			
			maintainAriaPressed: function(oldViewId, newViewId) {
				if (oldViewId) {
					// Remove the aria-pressed attribute from the old.
					var oldNavButton = query("[data-navbutton]",this[oldViewId + "View"])[0];
					domAttr.remove(oldNavButton,"aria-pressed");
				}
				
				// Add aria-pressed to the new node.
				var newNavButton = query("[data-navButton]",this[newViewId + "View"])[0];
				domAttr.set(newNavButton, "aria-pressed", "true");
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
		return ASSideNav;
	});
