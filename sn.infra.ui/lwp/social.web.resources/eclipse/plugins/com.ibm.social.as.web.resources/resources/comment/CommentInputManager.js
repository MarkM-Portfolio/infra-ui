/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * @author Tao Shang (shtaosh@cn.ibm.com)
 * This class is used as a single point to control the behavior between 
 * EE, news item, comment input in news item, and dirty check for commenting
 */
dojo.provide("com.ibm.social.as.comment.CommentInputManager");

dojo.require("com.ibm.social.as.constants.events");

dojo.declare("com.ibm.social.as.comment.CommentInputManager", 
[com.ibm.social.as.listener.Subscriber],
{
	// Is there a news item being commented?
	isCommenting: false,
	
	// The current commenting news item ID
	commentingNewsItem: null,
	
	// The current commenting input
	currentCommentInput: null,
	
	// The comment chars limit
	maxCount: 1000,
	
	// Environment we are in - retrieved from config
	environment: "",
	
	// Event to indicate end of populating the news feed
	populateEventName: com.ibm.social.as.constants.events.POPULATE,

	
	constructor: function() {
		this.queryCommentInputRestrictions();
		
		this.subscribe(com.ibm.social.as.constants.events.STARTCOMMENT, 
				dojo.hitch(this, "onStartComment"));
		this.subscribe(com.ibm.social.as.constants.events.STOPCOMMENT,
				dojo.hitch(this, "onStopComment"));
		
		// callback for leaving the page with dirty - change the status to 'not commenting'
		this.subscribe(com.ibm.social.as.constants.events.DIRTYCHECKLEAVE + "asComment",
				dojo.hitch(this, "init"));
		
		// init when change views
		this.subscribe(com.ibm.social.as.constants.events.UPDATESTATE,
				dojo.hitch(this, "init"));
		
		// init when change filters
		this.subscribe(com.ibm.social.as.constants.events.UPDATEFILTERS,
				dojo.hitch(this, "init"));
	},
	
	/**
	 * Query the character limit of config settings for comment.If in gadget
	 * mode skip the xhr and wait for input form load
	 */
	queryCommentInputRestrictions: function() {
		this.subscribe(com.ibm.social.as.constants.events.MICROBLOGCONFIGLOADED, dojo.hitch(this, function(params){
			//handle two forms - shareboxConfigAction and Gadget requests to microblogging config
			var mbConfigParams = (params && params.params) ? params.params : params;
			this.maxCount = (mbConfigParams["maxNumberCommentChars"]) ? mbConfigParams["maxNumberCommentChars"] :
				mbConfigParams["com.ibm.connections.ublog.microblogCommentMaxChars"];
						
			this.environment = mbConfigParams["environment"];
		}));
		//if by the end of feed loading we dont have sharebox info fall back to get it via xhr
		this.subscribe(this.populateEventName, dojo.hitch(this, "checkForMicroblogConfig"));
	},
	
	checkForMicroblogConfig: function(){
		if(this.environment === ""){
			var apiUrl = activityStreamAbstractHelper.getMBSettingsUrl();
			var self = this;
			activityStreamAbstractHelper.xhrGet({
				url: apiUrl ,
				handleAs: "json",
				load: function(response) {
					// SHINDIG-1758
					if (response.list) {
						response.entry = response.list;
					}
					try {
						self.maxCount = (response.entry || response.list)["com.ibm.connections.ublog.microblogCommentMaxChars"];
						self.environment = (response.entry || response.list)["environment"];
					} catch(e) {				
						self.maxCount = 1000;
					}
				},
				error: function(error) {
					console.error(error);
				}
			});
		}
	},
	
	removeCommentInputIfCurrent: function(commentInput){
		
		if (this.currentCommentInput==commentInput){
			this.currentCommentInput = null;
		}
		
	},
	
	
	onStartComment: function(currentCommentInput) {
		// Close existing comment input box while opening another one
		if(this.currentCommentInput && this.currentCommentInput != currentCommentInput) {
			this.currentCommentInput.reset();
		}
		this.isCommenting = true;
		this.currentCommentInput = currentCommentInput;
	},
	
	onStopComment: function() {
		this.init();
	},
	
	init: function() {
		this.isCommenting = false;
		this.commentingNewsItem = null;
		this.currentCommentInput = null;
	}
});
