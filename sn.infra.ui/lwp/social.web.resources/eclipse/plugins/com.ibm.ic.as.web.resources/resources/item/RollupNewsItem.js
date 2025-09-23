/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/has",
		"dojo/string",
		"dojo/text!ic-as/item/templates/rollupNewsItem.html",
		"ic-as/item/NewsItem"
	], function (dojo, declare, domClass, domConstruct, has, string, template, NewsItem) {
	
		/**
		 * @author Robert Campion
		 */
		
		var RollupNewsItem = declare("com.ibm.social.as.item.RollupNewsItem", 
		NewsItem,
		{
			// An template extension to be used inside the NewsItem dijit
			rollupExtension: template,
			
			summary: "",
			
			rollupNewsContent: "",
			
			// Rollup user object
			rollupUser: null,
			rollupPhotoUrl: "",
			rollupUserName: "",
			
			// By default, show nothing. Only show if there's a summary.
			rollupRootClass: "lotusHidden",
			
			rollupSummaryClass: "lotusHidden",
			
			rollupContentClass: "lotusHidden",
			
			rollupSummaryStyle: "",
			
			
			/**
			 * Called before the widget is rendered in the UI.
			 */
			postMixInProperties: function(){
				this.rollupUser = {
					id: "",
					connId: "",
					html: "",
					photoOfText : "",
					photoClass: "lotusHidden",
					image: {url: ""}
				};
				
				this.inherited(arguments);
				
				// Manually substitute all ${template} strings.
				// Only set the extension property if we have a summary to show
				this.rollupExtension = (this.newsData.getContent || this.newsData.getActivitySummary()) ? 
						this._stringRepl(this.rollupExtension) : "";		
			},
			
			/**
			 * Called after the widget is rendered in the UI.
			 */
			postCreate: function(){
				this.inherited(arguments);	
				this.resizeContentHeight();
				
				// add border separating the summary from the content
		        if (this.newsData.getActivityType() !== "file"){
		            domClass.add(this.contentNode, "lotusTitle");
		        }
			},
			
			/**
			 * Override NewsItem function to set max height for rollup content
			 */
			resizeContentHeight: function(){
				this.setContentHeight(this.rollupContent,this.showMoreText,this.showLessText, this.newsData.getActivityId());	
				this.addImageOnloadResizeSupport(this.rollupContent, this.newsData.getActivityId());
			},
			
			/**
			 * Mix news data into this object.
			 */
			mixInData: function(){
				this.inherited(arguments);
				
				// Setup rollup for this news item
				this.setupRollup(this.newsData);		
				// Setup the user photo
				if ( this.rollupUser.id ) {
					this.rollupPhotoUrl = this.getPhotoUrl(this.rollupUser);
				} else if ( has("ie") ) {
					// nasty 'feature' in IE. It will try to load images that are hidden. 
					// Therefore when we have <img src=''> it will try to load current url path.
					// This causes unnecessary requests, and 404s in some cases
					this.rollupPhotoUrl = djConfig.blankGif;
				}
			},
			
			/**
			 * Setup the rollup template string is summary content is available
			 * and this news item is rolled up.
			 * @param newsData {Object} data from the REST API for this news item.
			 */
			setupRollup: function(newsData){		
				// If content exists set it to include first. Put two breaks in to clearly separate it
				// Using breaks to ensure we dont mess up show more cut off point.
				this.rollupNewsContent = (newsData.getContent()) ? newsData.getContent() : "";
				
				// Get the object summary
				var summary = newsData.getActivitySummary();
				// If it's available, build up the right HTML
				if(summary){
					this.summary = summary;
					// Show the summary
					this.rollupRootClass = "";
					this.rollupSummaryClass = "";
					if(this.rollupNewsContent){
						this.rollupContentClass = "";
						this.rollupSummaryStyle = "lotusChunk";
					}
					
					var activityAuthorId = newsData.getActivityAuthorId();
					var activityAuthorName = newsData.getActivityAuthorName();
					var activityAuthorImageUrl = newsData.getActivityAuthorImageUrl();
					var actorId = newsData.getActorId();
					
					// If both the object author id and name are available build the vcard
					if(activityAuthorId && activityAuthorName && activityAuthorId !== actorId){
						// Show the rollup user's photo
						this.rollupUser.photoClass = "";
						
						this.rollupUser.image.url = activityAuthorImageUrl;
						
						// Set the rollup user id
						this.rollupUser.id = activityAuthorId;
						
						//Set the photoOfText
						//this.strings extended from NewsItem has not been initialized ,
						//so loading resource bundle for photoOfText here
						var bundleStrings = i18nactivitystream;
						this.rollupUser.photoOfText = string.substitute(bundleStrings.photoOfText, [activityAuthorName]);
						
						// Generate the Connections userid
						this.rollupUser.connId = this.getConnectionsUserId(activityAuthorId);
						
						// Create the rollup user's html name (for business card processing).
						this.rollupUser.html = this.createNewsUser(activityAuthorId, activityAuthorName);
					}
					else {
						//no user info being included need to add breaks after content to separate from summary
						if(this.rollupNewsContent){
							this.rollupContentClass = "";
							this.rollupSummaryStyle = "lotusChunk";
						}
					}
				}
				else{
					if(this.rollupNewsContent){
						// Show the rollup
						this.rollupRootClass = "";
						this.rollupContentClass = "";
					}
				}
			},
			onShowMoreLessClicked : function(e){
				this.handleShowMoreLessClicked(e, this.rollupContent, this.showMoreText, this.showLessText);
			},
			
			uninitialize: function() {
				this.rollupExtension = null;
				this.rollupNewsContent = null;
				this.rollupUser = null;
				this.rollupPhotoUrl = null;
				this.rollupUsername = null;
				this.rollupRootClass = null;
				this.rollupContentClass = null;
				this.rollupSummaryStyle = null;
				this.summary = null;
				domConstruct.destroy(this.rollupContent);
				this.rollupContent = null;
				this.inherited(arguments);
			}
			
			
		});
		
		/**
		 * Dummy class that is used as a means to serialize the rollupNewsItem.html in the dojo build.
		 * It couldn't be put in the main RollupNewsItem as it would overwrite the NewsItem's 
		 * templatePath. If the HTML file is just pulled in from a property that isn't called
		 * templatePath, the dojo build doesn't serialize it and an extra XHR request is made for it.
		 */
		
		declare("com.ibm.social.as.item.DummyRollupNewsItem",null,
		{
			templateString: template
		});
		return RollupNewsItem;
	});
