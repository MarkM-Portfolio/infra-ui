/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.gadget.ASComponentUtil");

dojo.require("com.ibm.social.as.nav.ASSideNav");
dojo.require("com.ibm.social.as.nav.ASHeader");
dojo.require("com.ibm.social.as.ActivityStream");
dojo.require("lconn.homepage.as.message.MessageContainer");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.social.as.util.xhr.OSXhrHandler");
dojo.require("lconn.core.theme");
dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.gadget.ASComponentUtil", null, {
	strings: null,
	
	cfgUtil: null,
	
	rebuildConfig: false,
	
	configComplete: false,
	
	backToMainSubscription: null,
	
	constructor: function(){
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
	},
	
	initLogger: function() {
		if ( ( asc.isDebug || asc.isDebugFF && (console && console.debug) ) ) {
			window.as_console_debug = asc.log;			
		} else {
			window.as_console_debug = function() {};
		}
	},
		
	/**
	 * Lets get this thing started!
	 */
	initAS: function() {
		as_console_debug("ASComponentUtil - initAS - entering");
		
		// Initialize the resize info
		asc.resize = {};
		asc.resize.curHeight = 0;
		asc.resize.steps = [ 500, 1000, 3500, 5000 ]; // increasing timeout sizes
		asc.resize.curStep = 0;
		asc.resize.timer = null;
		
		// ensure we have etag for later requests
		window.ibmConfig = window.ibmConfig || {};
		window.ibmConfig.versionStamp = asc.versionStamp_;
        
		
		as_console_debug("ASComponentUtil - initAS - gettin' the config");
 		this.cfgUtil = new com.ibm.social.as.gadget.ActivityStreamConfigUtil();
 		this.buildConf();
 		this.handleMinMaxWidth();

 		as_console_debug("ASComponentUtil - initAS - exiting");
	},
	
	handleMinMaxWidth: function() {
		// if a max-width preference has been passed in, apply it
		if ( asc.asMaxWidth ) {
			dojo.style(dojo.byId("lotusMain"), "maxWidth", asc.asMaxWidth);
		}
		
		// if a min-width preference has been passed in, apply it
		if ( asc.asMinWidth ) {
			dojo.style(dojo.byId("lotusFrame"), "minWidth", asc.asMinWidth);
		}
	},
	
	buildConf: function() {
		var promise;
		
 		var configError = dojo.hitch(this, function(error){
			asc.log("Error retrieving config", error);
			
			// hide the loading div & show the error div
			if(error.noUser) {
				// this looks awful, UI should be reviewed
				dojo.byId("errorDiv").innerHTML = dojo.string.substitute(this.strings.noUser, {0:asc.actionEmail}) + "<br />";
				dojo.place(new com.ibm.social.as.gadget.nav.BackToMainButton().domNode, "errorDiv");
			} else {
				dojo.byId("errorDiv").innerHTML = this.strings.invalidASConfig;
			}
			dojo.removeClass(dojo.byId("errorDiv"), "lotusHidden");
			dojo.addClass(dojo.byId("loadingDiv"), "lotusHidden");
 			this.configComplete = true;
		});
 		
		this.configComplete = false;
		
		try {
			if ( asc.actionEmail ) {
	 			// container triggered an action, build a basic config around it
	 			promise = this.cfgUtil.buildConfigFromEmail(asc.actionEmail);
	 		} else if ( asc.asFeed ) { 
	 			// container passed in feed, build a basic config around it
	 			promise = this.cfgUtil.buildConfigFromFeed(asc.asFeed);
	 		} else if ( asc.asMode && asc.asMode == "profile" ) {
	 			var profileId = "FIXME";
	 			var singleEntryId = "FIXME";
	 			promise = this.cfgUtil.getASConfig({mode: "profile", profileId: profileId, singleEntryId: singleEntryId});
	 		} else if ( asc.asConfig ) {
	 			// container passed in a config, ensure it has all we need, augment as required
	 			promise = this.cfgUtil.augmentConfig(dojo.fromJson(asc.asConfig));
	 		} else {
	 			// no feed or config passed, build default config
	 			promise = this.cfgUtil.getASConfig({ mode: "home" });
	 		}						
 		
	 		promise.then(dojo.hitch(this, function(asCfg) {
	 			if(this.rebuildConfig) {
	 				this.rebuildConfig = false;
	 				this.buildConf();
	 				return;
	 			}
	 			if ( asCfg.eeManager ) 	asCfg.eeManager = "com.ibm.social.as.ee.EEManagerURLLauncher";
	 			if (asc.isInlineCommentingEnabled === false)	asCfg.inlineCommentingEnabled = asc.isInlineCommentingEnabled;
	 			if (asc.count){
	 				if(asCfg.defaultUrlTemplateValues){
	 					asCfg.defaultUrlTemplateValues.count = asc.count;
	 				} else {
	 					asCfg.defaultUrlTemplateValues = {count: asc.count};
	 				}
	 			}
	 			as_console_debug("ASComponentUtil - initAS - got config");
	 			asc.cfg = asCfg; // keep this for later/debugging
	 			window.activityStreamConfig = asCfg;
	 			
	 			// create placeholder for messages
	 			new lconn.homepage.as.message.MessageContainer({}, dojo.byId("messageContainer"));
	 			
	 			// NOTE : the following constructor inits window.activityStreamAbstractHelper,
	 			// do not try to use that object before this line. Conveniently it is synchronous.
				var asWidget = new com.ibm.social.as.ActivityStream({
					configObject: asCfg,
					domNode: dojo.byId("activityStream"),
					isGadget: true,
					selectedState: "imfollowing" 
				});
	 			
	 			if ( asc.type === "wide" ) {
	 	 			if ( asc.showHeader && !asc.actionEmail ) {
		 	 			as_console_debug("ASComponentUtil - initAS - adding header");
		 	 			new com.ibm.social.as.nav.ASHeader(
		 	 					{configObject: asCfg }, dojo.byId("asheader"));
	 	 			}

	 	 			// Create the sidenav dijit - if we have multiple views
	 	 			if ( asc.util.getViewCount() > 1 ) {
	 	 				as_console_debug("ASComponentUtil - initAS - adding sidenav");
			 			new com.ibm.social.as.nav.ASSideNav(
			 					{configObject: asCfg, useHrefs:false }, dojo.byId("viewsidenav"));
			 			
			 			// Remove the display: none style from leftCol to show it
			 			dojo.removeClass(dojo.byId("lotusColLeft"), "lotusHidden");
			 			dojo.removeClass(dojo.byId("viewsidenav"), "lotusMenuSection");
			 			dojo.addClass(dojo.byId("viewsidenav"), "lotusMenu");
	 	 			}
				}
	 			
	 			as_console_debug("ASComponentUtil - initAS - creating AS dijit");	 				 	
				
				if(typeof asc.actionEmail === "undefined" && asc.showSharebox && lconn.core.config.services.microblogging ) {
					// if we have sharebox, and no shareboxBoardId, but we are in "profile" mode
					// assume that we are posting to the user who's profile we are viewing
					// unless it's ourself.
					if ( asc.showSharebox && ( !asc.shareboxBoardId || !asc.shareboxPostType ) && asc.asMode ==="profile" &&
								"FIXME" != asCfg.userInfo.id ) {
						asc.shareboxBoardId = "FIXME";
						asc.shareboxPostType = "PROFILES_MESSAGE";
					}
					
					this.showInputForm();
				}
				
				if ( asCfg.views.actionRequired ) {
					asc.util.initialiseActionRequiredBadge();
				}
				
				// hide the loading div & show the main div
				dojo.removeClass(dojo.byId("lotusMain"), "lotusHidden");
				dojo.addClass(dojo.byId("loadingDiv"), "lotusHidden");
	 			this.configComplete = true;
			}), configError);
		} catch(e) {
			configError(e);
		}
	},
	
	showInputForm : function() {

		as_console_debug("ASComponentUtil - showInputForm - entering");
		var url = activityStreamAbstractHelper.getMBSettingsUrl();
		var self = this;
			activityStreamAbstractHelper.xhrGet({
				url: url,
				handleAs: "json",
				load: function(resp) {
					as_console_debug("ASComponentUtil - showInputForm - loaded, ", arguments);
					params = resp && resp.entry;

					self.loadShareBox(params);
					dojo.publish(com.ibm.social.as.constants.events.MICROBLOGCONFIGLOADED, [params]);
				},
				error: function() {
					as_console_debug("ASComponentUtil - showInputForm - error, ", arguments);
				}
			});
		
		as_console_debug("ASComponentUtil - showInputForm - exiting - returning nothing: ");
	},
	
	/**
	 * Called when window size changes, or after feed loaded
	 * Sets of a resize dance... kills current dance if in progress
	 */
	asResize: function () {
		//as_console_debug("ASComponentUtil - asResize - entering, asc.resize: ", asc.resize);
		if ( asc.resize.timer ) { // kill existing dance timer
			clearTimeout(asc.resize.timer);
			asc.resize.timer = null;
		}
		
		asc.resize.curStep = -1; // back to start
		this.doResizeStep(); // kick off the first step
		//as_console_debug("ASComponentUtil - asResize - exiting, asc.resize: ", asc.resize);
	},
	
	loadShareBox: function(params){
		if(params){
			params.maxNumberChars = params["com.ibm.connections.ublog.microblogEntryMaxChars"];
			params.boardId = "@me";
			params.postType = lconn.news.microblogging.sharebox.Context.SU_CONTEXT;

			// only apply if both params are provided ("" is falsy)
			if(asc.shareboxBoardId && asc.shareboxPostType) {
				params.boardId = asc.shareboxBoardId;
				params.postType = asc.shareboxPostType;
			}
			
			// this is ridiculous TODO fix on InputForm side
			params["com.ibm.connections.ublog.AtMentionsEnabled"] = params["com.ibm.connections.ublog.AtMentionsEnabled"] ? "true" : "false";
			
			var inputForm = new lconn.news.microblogging.sharebox.InputForm(
					{
						params:params,
						"UBLOG_RELATIVE_PATH":window.activityStreamAbstractHelper.getUblogRelativePath(),						
					},
					dojo.byId("inputForm")
				);
				// Do not show the "attach a file" link
				// remove this line once the file picker works inside gadgets
				inputForm.removeFilePicker();				
		}
		
	},
	
	/**
	 * Callback for timer for resize dance
	 * Move to next step in timeout series
	 */
	doResizeStep: function() {
		as_console_debug("ASComponentUtil - doResizeStep - entering, asc.resize: ", asc.resize);
		asc.resize.curStep++;
		if ( asc.resize.curStep >= asc.resize.steps.length ) {
			// we're done
			clearTimeout(asc.resize.timer);
			asc.resize.timer = null;
			return;
		}
		
		// if height of main div has changed, calls adustHeight
		var newHeight = Math.floor(dojo.position(dojo.byId('lotusFrame')).h);
		if ( newHeight != asc.resize.curHeight ) {
			asc.resize.curHeight = newHeight;
			gadgets.window.adjustHeight();
			as_console_debug("ASComponentUtil - doResizeStep - resizing to: ", asc.resize.curHeight);
		}
		// kick off a timer to call us back for next step
		asc.resize.timer = setTimeout(dojo.hitch(this, "doResizeStep"), asc.resize.steps[asc.resize.curStep]);
		as_console_debug("ASComponentUtil - doResizeStep - exiting, asc.resize: ", asc.resize);
	},
	
	/**
	 * Counts the number of views in the config. Used to determine if we need viewnav
	 * @returns nunber of views in the config
	 */
	getViewCount: function() {
		var count = 0;
		if ( asc && asc.cfg && asc.cfg.views ) {
			for ( var v in asc.cfg.views ) {
				if ( asc.cfg.views.hasOwnProperty(v) ) {
					count++;
				}
			}
		}
		as_console_debug("ASComponentUtil - getViewCount - viewCount: ", count);
		return count;
	},
	
	doAction: function(selection) {
		asc.log("showAS action fired, args : ", arguments);
		
		var email = this.retrieveEmailFromActionSelection(selection);
		if ( email ) {
			asc.actionEmail = email;
			this.destroyAndRebuildWidgets();
			this.backToMainSubscription = this.backToMainSubscription || dojo.subscribe(com.ibm.social.as.constants.events.BACKTOMAIN, this, "undoAction");
		}
	},
	
	retrieveEmailFromActionSelection: function(selection) {
		asc.log("ASComponentUtil - retrieveEmailFromActionSelection, args : ", arguments);
		var email = null;
		if ( selection ) {
			var personObj = null;
			dojo.forEach(selection, function(item) {
				if ( !personObj && item && item.dataObject && item.type === "opensocial.Person" ) {
					personObj = item.dataObject;
				}
			});

			if ( personObj && personObj.emails ) {
				var firstEmail = null;
				var primaryEmail = null;

				dojo.forEach(personObj.emails, function(item) {
					if ( item && item.value && typeof item.value === "string" ) {
						if ( !firstEmail ) {
							firstEmail = item.value;
						}

						if ( item.primary === "true" ) {
							primaryEmail = item.value;
						}
					}
				});

				email = primaryEmail || firstEmail || null;
			}
		}
		asc.log("ASComponentUtil - retrieveEmailFromActionSelection, email : ", email);
		return email;
	},
	
	undoAction: function() {
		delete asc.actionEmail;
		this.destroyAndRebuildWidgets();
		dojo.unsubscribe(this.backToMainSubscription);
	},
	
	destroyAndRebuildWidgets: function() {

		dojo.addClass(dojo.byId("errorDiv"), "lotusHidden");
		dojo.removeClass(dojo.byId("loadingDiv"), "lotusHidden");
		dojo.addClass("lotusColLeft", "lotusHidden");

		if(this.configComplete) {
 			
 			var parentElem, asDijits = dijit.findWidgets(dojo.body());
 			for(var i=0,l=asDijits.length;i<l;i++) {
 				if(typeof asDijits[i] !== "undefined") {
 	 				parentElem = asDijits[i].domNode.parentElement || asDijits[i].domNode.parentNode;
 	 				asDijits[i].destroyRecursive();
 	 				dojo.create("div", {"id":asDijits[i].id}, parentElem);
 				}
 			}
 			
 			this.buildConf();
 		} else {
 			this.rebuildConfig = true;
 		}
	},

	/**
	 * Used to initialise the ActionRequired badge.
	 * Need to make initial request to @actions feed to get total results count
	 * Called via timeout to allow other loading work to complete
	 */
	initialiseActionRequiredBadge: function() {
		// delay it to allow stream load
		setTimeout(function() {
			activityStreamAbstractHelper.xhrGet({
					url: activityStreamAbstractHelper.getActionRequiredInitUrl(),
					handleAs: "json",
					load: function(response) {
						if ( response && response.totalResults ) {
							dojo.publish(com.ibm.social.as.constants.events.ACTIONREQUIREDBADGEUPDATE, [response.totalResults]);
						}
					},
					error: function(error) {
						as_console_debug(error);
					}
				}
			);
		}, 100);
	}
});
