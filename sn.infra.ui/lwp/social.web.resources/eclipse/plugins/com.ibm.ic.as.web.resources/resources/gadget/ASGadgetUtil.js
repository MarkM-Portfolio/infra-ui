/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/dom",
		"dojo/_base/declare",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/dom-style",
		"dojo/dom-geometry",
		"dojo/_base/lang",
		"dojo/dom-construct",
		"dojo/_base/window",
		"dojo/dom-class",
		"dojo/_base/array",
		"dojo/json",
		"dojo/string",
		"dojo/topic",
		"dijit/registry",
		"ic-as/ActivityStream",
		"ic-as/constants/events",
		"ic-as/nav/ASHeader",
		"ic-as/nav/ASSideNav",
		"ic-as/util/xhr/OSXhrHandler",
		"ic-core/theme",
		"ic-homepage/as/message/MessageContainer"
	], function (dojo, dom, declare, i18nactivitystream, domStyle, domGeometry, lang, domConstruct, windowModule, domClass, array, JSON, string, topic, registry, ActivityStream, events, ASHeader, ASSideNav, OSXhrHandler, theme, MessageContainer) {
	
		var ASGadgetUtil = declare("com.ibm.social.as.gadget.ASGadgetUtil", null, {
			strings: null,
			
			cfgUtil: null,
			
			rebuildConfig: false,
			
			configComplete: false,
			
			backToMainSubscription: null,
			
			constructor: function(){
				this.strings = i18nactivitystream;
			},
		
			initLogger: function() {
				if ( ( asc.isDebug && gadgets && gadgets.log ) ||
					 ( asc.isDebugFF && console && console.debug ) ) {
					window.as_console_debug = asc.log;			
				} else {
					window.as_console_debug = function() {};
				}
			},
				
			/**
			 * Lets get this thing started!
			 */
			initAS: function() {
				as_console_debug("ASGadgetUtil - initAS - entering");
				
				// Initialize the resize info
				asc.resize = {};
				asc.resize.curHeight = 0;
				asc.resize.steps = [ 500, 1000, 3500, 5000 ]; // increasing timeout sizes
				asc.resize.curStep = 0;
				asc.resize.timer = null;
		
				// register the resize dance to we can adjustHeight accordingly
				topic.subscribe(events.FEEDRENDERED, lang.hitch(this, "asResize"));
				topic.subscribe("widgetBlur", lang.hitch(this, "asResize"));
				window.onresize = lang.hitch(this, "asResize");
				
				// ensure we have etag for later requests
				window.ibmConfig = window.ibmConfig || {};
				window.ibmConfig.versionStamp = window.ibmConfig.versionStamp || 1234567890;
				
				if(gadgets.util.hasFeature("smartcloud3")) {
					theme.addStylesheet("activityStream");
				}
				
		
		     	if (gadgets.actions) {
		            var showASAction = {
		             	id: "showAS",
		               	callback: lang.hitch(this, "doAction")
		            };
		            gadgets.actions.updateAction(showASAction);
		        }
		     	
		     	this.handleMinMaxWidth();
				
				as_console_debug("ASGadgetUtil - initAS - gettin' the config");
		 		this.cfgUtil = new com.ibm.social.as.gadget.ActivityStreamConfigUtil();
		 		this.buildConf();
		
		 		as_console_debug("ASGadgetUtil - initAS - exiting");
			},
			
			handleMinMaxWidth: function() {
				// if a max-width preference has been passed in, apply it
				if ( asc.asMaxWidth ) {
					domStyle.set(dom.byId("lotusMain"), "maxWidth", asc.asMaxWidth);
				}
				
				// if a min-width preference has been passed in, apply it
				if ( asc.asMinWidth ) {
					domStyle.set(dom.byId("lotusFrame"), "minWidth", asc.asMinWidth);
				}
			},
			
			buildConf: function() {
				var promise;
				
		 		var configError = lang.hitch(this, function(error){
					as_console_debug("Error retrieving config", error);
					
					// hide the loading div & show the error div
					if(error.noUser) {
						// this looks awful, UI should be reviewed
						dom.byId("errorDiv").innerHTML = string.substitute(this.strings.noUser, {0:asc.actionEmail}) + "<br />";
						domConstruct.place(new com.ibm.social.as.gadget.nav.BackToMainButton().domNode, "errorDiv");
					} else {
						dom.byId("errorDiv").innerHTML = this.strings.invalidASConfig;
					}
					domClass.remove(dom.byId("errorDiv"), "lotusHidden");
					domClass.add(dom.byId("loadingDiv"), "lotusHidden");
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
			 			var profileId = gadgets.views.getParams().profileId;
			 			var singleEntryId = gadgets.views.getParams().profileSingleEntryId;
			 			promise = this.cfgUtil.getASConfig({mode: "profile", profileId: profileId, singleEntryId: singleEntryId});
			 		} else if ( asc.asConfig ) {
			 			// container passed in a config, ensure it has all we need, augment as required
			 			promise = this.cfgUtil.augmentConfig(JSON.parse(asc.asConfig));
			 		} else {
			 			// no feed or config passed, build default config
			 			promise = this.cfgUtil.getASConfig({ mode: "home" });
			 		}
		 		
			 		promise.then(lang.hitch(this, function(asCfg) {
			 			if(this.rebuildConfig) {
			 				this.rebuildConfig = false;
			 				this.buildConf();
			 				return;
			 			}
			 			as_console_debug("ASGadgetUtil - initAS - got config");
			 			asc.cfg = asCfg; // keep this for later/debugging
			 			window.activityStreamConfig = asCfg;
			 			
			 			// create placeholder for messages
			 			new MessageContainer({}, dom.byId("messageContainer"));
			 			
			 			// NOTE : the following constructor inits window.activityStreamAbstractHelper,
			 			// do not try to use that object before this line. Conveniently it is synchronous.
						var asWidget = new ActivityStream({
							configObject: asCfg,
							domNode: dom.byId("activityStream"),
							isGadget: true,
							selectedState: "discover" 
						});
			 			
			 			if ( asc.type === "wide" ) {
			 	 			if ( asc.showHeader && !asc.actionEmail ) {
				 	 			as_console_debug("ASGadgetUtil - initAS - adding header");
				 	 			new ASHeader(
				 	 					{configObject: asCfg }, dom.byId("asheader"));
			 	 			}
		
			 	 			// Create the sidenav dijit - if we have multiple views
			 	 			if ( asc.util.getViewCount() > 1 ) {
			 	 				as_console_debug("ASGadgetUtil - initAS - adding sidenav");
					 			new ASSideNav(
					 					{configObject: asCfg, useHrefs:false }, dom.byId("viewsidenav"));
					 			
					 			// Remove the display: none style from leftCol to show it
					 			domClass.remove(dom.byId("lotusColLeft"), "lotusHidden");
					 			domClass.remove(dom.byId("viewsidenav"), "lotusMenuSection");
					 			domClass.add(dom.byId("viewsidenav"), "lotusMenu");
			 	 			}
						}
			 			
			 			as_console_debug("ASGadgetUtil - initAS - creating AS dijit");	 				 	
						
						if(typeof asc.actionEmail === "undefined" && asc.showSharebox && lconn.core.config.services.microblogging ) {
							// if we have sharebox, and no shareboxBoardId, but we are in "profile" mode
							// assume that we are posting to the user who's profile we are viewing
							// unless it's ourself.
							if ( asc.showSharebox && ( !asc.shareboxBoardId || !asc.shareboxPostType ) && asc.asMode ==="profile" &&
										gadgets.views.getParams().profileId != asCfg.userInfo.id ) {
								asc.shareboxBoardId = gadgets.views.getParams().profileId;
								asc.shareboxPostType = "PROFILES_MESSAGE";
							}
							
							this.showInputForm();
						}
						
						if ( asCfg.views.actionRequired ) {
							asc.util.initialiseActionRequiredBadge();
						}
						
						// hide the loading div & show the main div
						domClass.remove(dom.byId("lotusMain"), "lotusHidden");
						domClass.add(dom.byId("loadingDiv"), "lotusHidden");
			 			this.configComplete = true;
					}), configError);
				} catch(e) {
					configError(e);
				}
			},
			
			showInputForm : function() {
		
				as_console_debug("ASGadgetUtil - showInputForm - entering");
				var url = activityStreamAbstractHelper.getMBSettingsUrl();
				var self = this;
					activityStreamAbstractHelper.xhrGet({
						url: url,
						handleAs: "json",
						load: function(resp) {
							as_console_debug("ASGadgetUtil - showInputForm - loaded, ", arguments);
							params = resp && resp.entry;
		
							self.loadShareBox(params);
							topic.publish(events.MICROBLOGCONFIGLOADED, params);
						},
						error: function() {
							as_console_debug("ASGadgetUtil - showInputForm - error, ", arguments);
						}
					});
				
				as_console_debug("ASGadgetUtil - showInputForm - exiting - returning nothing: ");
			},
			
			/**
			 * Called when window size changes, or after feed loaded
			 * Sets of a resize dance... kills current dance if in progress
			 */
			asResize: function () {
				//as_console_debug("ASGadgetUtil - asResize - entering, asc.resize: ", asc.resize);
				if ( asc.resize.timer ) { // kill existing dance timer
					clearTimeout(asc.resize.timer);
					asc.resize.timer = null;
				}
				
				asc.resize.curStep = -1; // back to start
				this.doResizeStep(); // kick off the first step
				//as_console_debug("ASGadgetUtil - asResize - exiting, asc.resize: ", asc.resize);
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
								osConfig: {
									network: activityStreamAbstractHelper.network
								},
								isASGadget: true
							},
							dom.byId("inputForm")
						);
						// Do not show the "attach a file" link
						// remove this line once the file picker works inside gadgets
						inputForm.removeFilePicker();				
						
						// old code attempting to make the filepicker use the right size and location
		//					dojo.subscribe("lconn/share/action/after/show", function(filePicker){
		//						asc.filePicker = filePicker;
		//						
		//						var fixPicker = dojo.hitch(filePicker.dialog, function(){
		//							this.domNode.style.top = "100px";
		//							
		//							// hack to fix fat filepicker
		//							dojo.style(this.domNode, "max-width", (dojo.position(dojo.body()).w - 20) + "px");
		//							dojo.query("*", this.domNode).style("max-width", (dojo.position(dojo.body()).w - 20) + "px");
		//							dojo.query(".lconnPicker, .lconnPicker *", this.domNode).style("max-width", (dojo.position(dojo.body()).w - 60) + "px");
		//							dojo.query(".lconnFileInput", this.domNode).style("width", "auto");
		//						});
		//						// sadly, the filePicker does not just display, it fades in, and changes
		//						// at later stages as well, so we need to "re-fix" on many events
		//						fixPicker();
		//						dojo.connect(filePicker.dialog.picker, "onSourceChange", fixPicker);
		//						dojo.connect(filePicker.dialog.picker, "onSourceLoaded", fixPicker);
		//					});	
				}
				
			},
			
			/**
			 * Callback for timer for resize dance
			 * Move to next step in timeout series
			 */
			doResizeStep: function() {
				if ( gadgets.util.hasFeature("dynamic-height" ) ) {
					//as_console_debug("ASGadgetUtil - doResizeStep - entering, asc.resize: ", asc.resize);
					asc.resize.curStep++;
					if ( asc.resize.curStep >= asc.resize.steps.length ) {
						// we're done
						clearTimeout(asc.resize.timer);
						asc.resize.timer = null;
						return;
					}
					
					// if height of main div has changed, calls adustHeight
					var newHeight = Math.floor(domGeometry.position(dom.byId('lotusFrame')).h);
					if ( newHeight != asc.resize.curHeight ) {
						asc.resize.curHeight = newHeight;
						gadgets.window.adjustHeight();
						as_console_debug("ASGadgetUtil - doResizeStep - resizing to: ", asc.resize.curHeight);
					}
					// kick off a timer to call us back for next step
					asc.resize.timer = setTimeout(lang.hitch(this, "doResizeStep"), asc.resize.steps[asc.resize.curStep]);
					//as_console_debug("ASGadgetUtil - doResizeStep - exiting, asc.resize: ", asc.resize);
				}
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
				as_console_debug("ASGadgetUtil - getViewCount - viewCount: ", count);
				return count;
			},
			
			doAction: function(selection) {
				asc.log("showAS action fired, args : ", arguments);
				
				var email = this.retrieveEmailFromActionSelection(selection);
				if ( email ) {
					asc.actionEmail = email;
					this.destroyAndRebuildWidgets();
					this.backToMainSubscription = this.backToMainSubscription || topic.subscribe(events.BACKTOMAIN, lang.hitch(this, "undoAction"));
				}
			},
			
			retrieveEmailFromActionSelection: function(selection) {
				asc.log("ASGadgetUtil - retrieveEmailFromActionSelection, args : ", arguments);
				var email = null;
				if ( selection ) {
					var personObj = null;
					array.forEach(selection, function(item) {
						if ( !personObj && item && item.dataObject && item.type === "opensocial.Person" ) {
							personObj = item.dataObject;
						}
					});
		
					if ( personObj && personObj.emails ) {
						var firstEmail = null;
						var primaryEmail = null;
		
						array.forEach(personObj.emails, function(item) {
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
				asc.log("ASGadgetUtil - retrieveEmailFromActionSelection, email : ", email);
				return email;
			},
			
			undoAction: function() {
				delete asc.actionEmail;
				this.destroyAndRebuildWidgets();
				this.backToMainSubscription.remove();
			},
			
			destroyAndRebuildWidgets: function() {
		
				domClass.add(dom.byId("errorDiv"), "lotusHidden");
				domClass.remove(dom.byId("loadingDiv"), "lotusHidden");
				domClass.add("lotusColLeft", "lotusHidden");
		
				if(this.configComplete) {
		 			
		 			var parentElem, asDijits = registry.findWidgets(windowModule.body());
		 			for(var i=0,l=asDijits.length;i<l;i++) {
		 				if(typeof asDijits[i] !== "undefined") {
		 	 				parentElem = asDijits[i].domNode.parentElement || asDijits[i].domNode.parentNode;
		 	 				asDijits[i].destroyRecursive();
		 	 				domConstruct.create("div", {"id":asDijits[i].id}, parentElem);
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
									topic.publish(events.ACTIONREQUIREDBADGEUPDATE, response.totalResults);
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
		
		return ASGadgetUtil;
	});
