/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.LinkTarget");
dojo.require("com.ibm.social.as.config.enablement");
dojo.require("com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag");
/**
 * Provide a base class for updating link targets within the Activity Stream
 *
 * @author scrawford
 */

dojo.declare("com.ibm.social.as.util.LinkTarget", null,
{
	//the target action for AS feed links
	linkTarget: "_blank",
	
	anchorTarget: "",
	
	/**
	 * Widgets that inherit from this class will call this to initialize the anchor target
	 */
	postMixInProperties: function(){
		this.inherited(arguments);
		
		this.anchorTarget = this.getActivityStreamTarget();
	},
	
	/**
	 * Run through all Anchor nodes Fragment's contentNodes and
	 * modify the target to Activity Stream target value
	 */
	modifyContentLinkTargets: function(newsFeedFragment){
		dojo.query(".asLinkContainer",newsFeedFragment)
		.query('a').forEach(dojo.hitch(this, function(node, index){
			// Do not set a target:
			// 1) for "javascript:" links;
			// 2) for any links that go to Files service (files should be opened in file viewer)
			// Otherwise we will open blank pages
			var filesContextRoot = lconn.core.url.getServiceUrl(lconn.core.config.services.files).path;
	        var filesRegexp = new RegExp(filesContextRoot, 'i');
	        var href;
	        try {
	        	href = dojo.attr(node, "href");
	        }
	        catch (err) {
	        	// IE11 throws a security error if a href contains an '@' character
	        	// Catch to prevent component breaking - [PMR 49900,082,000]
	        	console.log("Error caught getting href attribute while determining whether to modify content link target: ", err);
	        }
			if ( !href || ( href && href.indexOf("javascript:") != 0 && !href.match(filesRegexp)) ) {
				dojo.attr(node, "target", this.getLinkTarget());
				dojo.attr(node, "rel", "nofollow noopener noreferrer");
			}
			href = null;
			node = null;
		}));
		
		//only run if enabled
		if(com.ibm.social.as.config.enablement.checkEnablement(com.ibm.social.as.config.enablement.AS_HASHTAG_SEARCH)){
			this.modifyHashtagSearchLinks(newsFeedFragment);	
		}
		
		newsFeedFragment = null;
	},		
	

	/**
	 * run over the known hashtag links and connect the event to call back into onclick
	 */
	modifyHashtagSearchLinks: function(domNode){		
		var hashtagLinks = dojo.query("a.hashtagSearchLink",domNode).forEach(dojo.hitch(this, function(node, index){
			if(node){
				this.connect(node, "onclick", "handleHashtagSearch")
			}
			node = null;
		}));	
		domNode = null;
	},
	
	handleHashtagSearch: function(e){
		var target = e.target;
		var tagName = dojo.attr(target, "tag");	
		com.ibm.social.as.util.hashtag.search.ActivityStreamSearchHashtag.getInstance().addSearchTag(tagName);
	},
	
	/**
	 * Used by view objects that need to include a target into anchor tags.
	 * Generally the anchor in the target should contain a placeholder, then
	 * this function used to include the target or blank if none is configured. 
	 */
	getActivityStreamTarget: function(){
		return "target="+"'"+this.getLinkTarget()+"'";			
	},
	
	/**
	 * Accessor for linkTarget value 
	 */
	getLinkTarget: function(){
		var configMgr = com.ibm.social.as.configManager;
		return configMgr? configMgr.getLinkTarget() : this.linkTarget;
	}
});
