/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"dojo/dom-construct",
		"dojo/string",
		"dojo/dom-attr",
		"ic-as/item/NewsItem",
		"ic-core/config/services",
		"ic-core/widget/urlPreview/URLPreviewNode",
		"ic-incontext/util/url"
	], function (declare, domConstruct, string, domAttr, NewsItem, services, URLPreviewNode, url) {
	
		/**
		 * @author Robert Campion
		 */
		
		var StatusNewsItem = declare(
		"com.ibm.social.as.item.StatusNewsItem", 
		NewsItem,
		{
			/**
			 * Mix in data 
			 */
			mixInData: function(){
				this.statusMixInData();
				// Get the object summary
				var objectSummary = this.newsData.getActivitySummary();
				
				// The get the tags for this news item
				this.tagsArray = this.getTagsArray(this.newsData.getActivityTags());
				
				// If it exists
				if(objectSummary){
					// Parse any hash tags it may contain
					this.newsData.setActivitySummary(this.parseHashTags(objectSummary, this.tagsArray));
				}
				
				this.inherited(arguments);
				
				// The get the tags for this news item
				this.tagsArray = this.getTagsArray(this.newsData.getActivityTags());
			},
				
			/**
			 * Function that allows extensions to override safely.
			 * If we simply overrode the mixInData it appears to
			 * clobber the superclass's mixInData, meaning they 
			 * aren't called.
			 */
			statusMixInData: function(){
				// Override if you want to do something
			},
			
			/**
			 * Called before the widget is rendered in the UI.
			 * - Formats the timeStamp
			 */
			postCreate: function(){		
				this.inherited(arguments);
				
				var newTimeNode,
					nodeType = "span",
					href = "",
					title = this.timeagoNode.textContent,
					target = "";
				
				// Set appropriate timeago element if Profiles is enabled
				if (services.profiles || services.scprofiles) {			
					nodeType = "a";
					href = this.newsData.getPermaLink();
					
					/* If we have an app name then use it's localized version to describe the link. */
					title = (this.appName && this.newsData.getGeneratorDisplayName()) ? 
						string.substitute(this.strings.linkToAriaLabel,[this.newsData.getGeneratorDisplayName(), this.appLocalizedDisplayName]): "";
						
					target = this.getLinkTarget();
				} 
				
				newTimeNode = domConstruct.create(nodeType, {
					"href":href,
					"class":"timeago",
					"aria-label":title, 
					title: domAttr.get(this.timeagoNode, "title"),
					"target":target
					});
				
				domConstruct.place(newTimeNode, this.timeagoNode.parentNode, "first");
				
				domConstruct.place(this.timeagoNode, newTimeNode);
				//dojo.attr(this.timeagoNode, "aria-hidden", "true");
				
				//Get any url attachments
				var urlAttachments = this.newsData.isUrlAttachment();
				
				//If url attachments exist create the URL Preview Node 
				if (urlAttachments){
					
					this.urlAttachments = this.newsData.getUrlAttachment();
					
					var urlThumbnails = [];
					var playbackEnabled = false;
					var urlVideo = "";
					var provider_url = "";
		
					if(this.urlAttachments.image){		
						urlThumbnails = [ { src : this.urlAttachments.image.url, alt: this.urlAttachments.summary}];                           
					}

					var videoUrl = this.urlAttachments.url;

					if (this.urlAttachments.connections && this.urlAttachments.connections.video){

						if (videoUrl === undefined)
							videoUrl = this.urlAttachments.connections.video[0].url;
						
						if (this.urlAttachments.connections.video[0].url.indexOf("?") > 0){					
							this.urlAttachments.connections.video[0].url += "&wmode=transparent";
						}else{
							this.urlAttachments.connections.video[0].url += "?wmode=transparent";	
						}
						  
						var videoType = (this.urlAttachments.connections.video[0].connections) ?  this.urlAttachments.connections.video[0].connections["mime-type"] : "";
			    		  urlVideo = [{
			    			  "type" : videoType,
			    			  "width" : this.urlAttachments.connections.video[0].width,
			    			  "height" : this.urlAttachments.connections.video[0].height,
			    			  "url" : this.urlAttachments.connections.video[0].url            				 	            				  
			    		  }];
			            		  
			        }
		
					provider_url = url.removeRelativePathFromHost(videoUrl);
					
					this._urlPreview = new URLPreviewNode({
						url : this.urlAttachments.url,
						data:{
							   url : this.urlAttachments.url,
							   provider_url : provider_url,
			                   title : this.urlAttachments.displayName,
			                   description : this.urlAttachments.summary,
			                   thumbnails : urlThumbnails,
			                   video : urlVideo,
			                   enablePlayback: playbackEnabled
						  }
						});
					this._urlPreview.placeAt(this.urlPreviewNode, "after");
		        }
			},		
			
			/**
			 * Setup the CommentInput widget for StatusNewsItem
			 * The commentInput only displayed in status news item.
			 * It would overwrite the NewsItem's setupCommentContent
			 */
			setupCommentContent: function(newsReplies) {
				var showAddComment = this.isActionEnabled("comment");
				// Create the inline comments dijit
				var args = {newsItem: this, comments: newsReplies, showAddComment: showAddComment};
				this.setupInlineComments(args);		
			},
			
			/**
			 * Ensure that we remove the reference to this item from commentInputManager when destroying.
			 * This ensures that if we dynamically update a news item while commenting. The replacement
			 * wont be marked as being currently commented. 
			 */
			uninitialize: function() {
				if(this.isActionEnabled("comment")){
					if(com.ibm.social.as.comment.commentInputManager &&
						com.ibm.social.as.comment.commentInputManager.commentingNewsItem == this.newsData.id){
						com.ibm.social.as.comment.commentInputManager.commentingNewsItem = null;
					}
				}		
				this.inherited(arguments);
				if(this._urlPreview){
					this._urlPreview.destroy();
				    this._urlPreview = null;	
				}
				
			}
		});
		
		return StatusNewsItem;
	});
