/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/dom-class",
		"dojo/_base/window",
		"dojo/_base/lang",
		"dojo/_base/declare",
		"dojo/dom-attr",
		"dojo/dom-construct",
		"dojo/dom-style",
		"dojo/has",
		"dojo/on",
		"dojo/query",
		"dojo/string",
		"dojo/text!ic-as/item/templates/fileNewsItem.html",
		"dojo/topic",
		"dojo/dom-geometry",
		"ic-core/globalization/bidiUtil",
		"ic-as/dialog/DownloadErrorDialog",
		"ic-as/config/enablement",
		"ic-as/item/NewsItem",
		"ic-as/constants/events",
		"ic-incontext/util/html",
		"ic-incontext/util/text",
		"ic-incontext/videoPreview/VideoPreviewNode",
		"id-as/util/fileviewer/FileViewerUtil"
	], function (dojo, domClass, windowModule, lang, declare, domAttr, domConstruct, domStyle, has, on, query, string, template, topic, domGeometry, bidiUtil, DownloadErrorDialog, enablement, NewsItem, events, html, text, VideoPreviewNode, FileViewerUtil) {
	
		/**
		 * Widget used to display individual file news items in the
		 * activity stream.
		 * @author Robert Campion
		 */
		
		var FileNewsItem = declare(
		"com.ibm.social.as.item.FileNewsItem",
		NewsItem,
		/**
		 * @author brian
		 *
		 */
		{
			// Display name of the file
			fileName: "",
		
			// Class name for the file name container node
			fileNameClass: "",
		
			// A direct link to the file
			fileDirectUrl: "",
		
			// link to the file page e.g. /files/app#/file/xxxxx...
			filePageURL: "",
		
			// The file's type (e.g. css/html/pdf)
			fileType: "",
		
			// The file's type display name (e.g. CSS/HTML/PDF)
			fileTypeDisplayName: "",
		
			// Tags for the file
			fileTags: "",
		
		    //Tag Text Node
		    tagsTextNode: "",
		
			// The author info of the file if not the activity author
			authorInfo: "",
		
			// Image src we want to use
			iconSrc: "",
		
			// Class for the image, in this case a sprite class
			iconClass: "lconn-ftype32 lconn-ftype32-",
		
			downloadErrorDialog: null,
		
			// An template extension to be used inside the NewsItem dijit
			templateExtension: template,
		
			downloadLinkConnect: null,
		
		    // Video Preview Object
		    videoPreview: null,
		
		    //Node to place video preview node in
		    videoPreviewContainer: null,
		
		    fileContainer: null,
		
		    fileDetailsContainer: null,
		
		    image: null,
		    
		    html5VideoPlaying: events.HTML5VIDEOPLAYING,
		    
		    showFileOverlayInsteadEE: false,
		
		    /**
			 * Called before the widget is rendered in the UI.
			 */
			postMixInProperties: function(){
				// For a normal file, we show a sprite, so use blank.gif
				this.iconSrc = this._blankGif;
		
				this.inherited(arguments);
		
				this.fileTags = this.getFileTags(this.newsData.getActivityTags());
				
				this.setupAuthorInfo();
				this.updateIconClass();
		
				// Manually substitute all ${template} strings.
			   	this.templateExtension = this._stringRepl(this.templateExtension);
		
		    },
		
			/**
			 * Called after the widget is rendered in the UI.
			 */
			postCreate: function(){
				this.inherited(arguments);
		
		        // some templates use fileLink attach point instead of directFileLink
		        if(!this.directFileLink && this.fileLink){
		            this.directFileLink = this.fileLink;
		        }
		
				// If there are tags for this file
				// If the item is type of StatusFileNewsItem, hidden the tagslist
				//if(this.fileTags && this.newsData.getActivityType() != "note"){
				if(this.fileTags && this.newsData.getActivityType() != "note"){
					var tagsText = string.substitute(this.strings.tagsText, [this.fileTags]);
					this.tagsTextNode = windowModule.doc.createTextNode(tagsText);
					domConstruct.place(this.tagsTextNode, this.tagsListItem);
					domClass.remove(this.tagsListItem, "lotusHidden");// Show tags
				}
		
				// If the author info isn't set
				if(!this.authorInfo){
					// Hide the author info node and add lotusFirst to the tags li
					domClass.add(this.authorInfoItem, "lotusHidden");
		
					if(this.fileTags){								
						domClass.add(this.tagsListItem, "lotusFirst");
					}
				}
		
				// Get the "profiles" node
				// This should contain the title content after the user's name
				var profilesContentNodes = query(".profiles", this.contentNode);
		
				if(profilesContentNodes.length > 0){
					var profilesContentNode = profilesContentNodes[0];
		
					var tagsArray = this.getTagsArray(this.newsData.getActivityTags());
					// Parse any hashtags to linkify them and put them back on the page
					profilesContentNode.innerHTML = this.parseHashTags(profilesContentNode.innerHTML, tagsArray);
				}
		
		        if(this.newsData.getActivityType() === "note" && this.pageFileLink){
		            domAttr.remove(this.pageFileLink, "target");
		        }
		
				this.setupDirectFileDownload();
		
		        if (this.isVideoPlayable() && this.previewEnabled()){
		            this.initVideoPreview();
		            topic.subscribe(this.html5VideoPlaying, lang.hitch(this, function(){
		                this.allowItemKeyboardNavigation = false;
		            }));
		        }
		
				if(!domGeometry._isBodyLtr()) {
					query("a", this.domNode)
					.forEach(
						lang.hitch(this, function(node){
							if(node.innerHTML == this.fileName) {
								domAttr.set(node, "dir", "ltr");
							}
						})
					);
				}
		
		        if (html.isHighContrast()){
		            if(this.fileDetails){
		                domStyle.set(this.fileDetails, "top", "0px");
		                domStyle.set(this.fileDetails, "float", "right");
		            }
		            if(this.highContrastFileIcon){
		                domClass.remove(this.highContrastFileIcon, "lotusHidden");
		                domAttr.set(this.highContrastFileIcon, "innerHTML", this.strings.downloadError.slice(0,8));
		            }
		        }
		        
		        this.showFileOverlayInsteadEE = FileViewerUtil.isFileOverlayEnabled(this.newsData.getGenerator().id);
		        if (this.showFileOverlayInsteadEE) {
		        	
		            if(this.pageFileLink && this.pageFileLink.href){
		         	   this.pageFileLink.href = "javascript:;"
		                dojo.removeAttr(this.pageFileLink, "target");
		                this.pageFileLinkConnect = this.connect(this.pageFileLink, "onclick", "showFileOverlay");	   
		            }	
		            
		            if(this.iconFileLink && this.iconFileLink.href){
		         	   this.iconFileLink.href = "javascript:;"
		         	   dojo.removeAttr(this.iconFileLink, "target");
		                this.iconFileLinkConnect = this.connect(this.iconFileLink, "onclick", "showFileOverlay");
		            }
		         }
			},
			
			openEE: function (e) {
				if (this.showFileOverlayInsteadEE && this.fileDirectUrl!="") {
					try{
						FileViewerUtil.launchFileViewer(this.fileDirectUrl);	
					}catch(err){
						console.error("Could not get lconn.share.fileviewer.ConnectionsFileViewer, opening EE");
						this.showFileOverlayInsteadEE=false;
						this.openEE();
					}										
				} else {
					this.inherited(arguments);
				}
			},			
		
			setupDirectFileDownload: function(){
				//connect an event which sends a head request to the file to see
				//if the user has access to download
				if ( has("ff") < 4 || has("webkit") < 536) {
					// yet another Notes9 hack - screw the pre-check
					if ( this.fileDirectUrl && this.directFileLink ) {
						this.directFileLink.href = this.encodeFileUrl(this.fileDirectUrl);
					}
					if ( this.filePageURL && this.pageFileLink ) {
						this.pageFileLink.href = this.filePageURL;
						if (this.iconFileLink) {
							this.iconFileLink.href = this.filePageURL;
						}
					}
		
				} else {
					if(this.directFileLink){
						this.downloadLinkConnect = this.connect(this.directFileLink, "onclick", "downloadLinkClicked");	
					}
				}
			},
		
			/**
			 * Mix news data into this object.
			 */
			mixInData: function(){
				this.inherited(arguments);
		
				// Setup the file properties
				var fileName = this.fileName = this.newsData.getActivityDisplayName() || "";
				// TODO: File type will have to be derived from media type once available
				//this.fileType = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
		        this.fileType = text.getExtension(this.fileName);
				this.fileTypeDisplayName = this.fileType.toUpperCase();
				this.fileDirectUrl = this.newsData.getActivityFileUrl() || "";
		        if(this.newsData.getActivityType() === "note"){
		            this.filePageURL = this.fileDirectUrl;
		        }else{
		            this.filePageURL = this.newsData.getPermaLink() || "";
		        }
		        fileName = this.fileName = bidiUtil.createSttDisplayString(fileName, "FILE_PATH");
				this.extensionDescription = fileName;
			},
		
			/**
			 * Setup the file author info text. Sets the 'authorInfo' property if the actor
			 * of the current News item is different from the author of the File itself
			 */
			setupAuthorInfo: function(){
				if(this.newsData.getActivityFileAuthorName()){
					this.authorInfo = this.createNewsUser(this.newsData.getActivityFileAuthorId(),
							this.newsData.getActivityFileAuthorName());
				}
			},
		
			/**
			 * Dedicated function to update image class that can be overriden
			 * by a subclass who may not need it.
			 */
			updateIconClass: function(){
				// Update the image class (we'll have fileType by this stage)
				this.iconClass += this.fileType;
			},
		
			/**
			 * This encodes the filename part of the url.
			 * If we just pass the URL to dojo.xhrHead as-is, it will run encodeURI() on
			 * it, but this does not encode it properly. Need to run encodeURIComponent()
			 * on the filename part, and re-build the url
			 * @param url
			 * @returns encoded URL
			 */
			encodeFileUrl: function(url) {
				var retUrl = url;
				var idx = url.lastIndexOf('/');
				if ( -1 != idx ) {
					var base = url.substring(0, idx+1);
					var fname = url.substring(idx+1);
					fname = encodeURIComponent(fname);
					retUrl = base + fname;
				}
				return retUrl;
			},
		
			/**
			 * Handle a download click and make a head request to validate the link is
			 * valid. Used in conjuction with linking to files.
			 */
			downloadLinkClicked: function(e){
				var downloadLink = this.directFileLink;
				if(this.fileDirectUrl){
					var encodedUrl = this.encodeFileUrl(this.fileDirectUrl);
					if (this.newsData.getGenerator().id == "files"){
						activityStreamAbstractHelper.xhrHead({
							url: encodedUrl,
							load: lang.hitch(this, function(){
								downloadLink.href = this.fileDirectUrl;
								this.disconnect(this.downloadLinkConnect);
								downloadLink.click();
							}),
							error: lang.hitch(this, "downloadFailed", downloadLink)
						});
					}  else {
						downloadLink.href = this.fileDirectUrl;
						domAttr.set(downloadLink, "target", "_blank");
						this.disconnect(this.downloadLinkConnect);
						downloadLink.click();
					}
				} else{
					//if a file url is not provided launch the fail dialog
					this.downloadFailed(downloadLink);
				}
		
			},
		
			/**
			 * Handle a failure case in a download link by displaying the
			 * appropriate error dialog
			 */
			downloadFailed: function(downloadLink, err){
				downloadLink.href = "javascript:;";
				if(this.downloadErrorDialog == null){
					this.downloadErrorDialog = new DownloadErrorDialog({});
				}
				this.downloadErrorDialog.show();
			},
		
		    initVideoPreview: function(){
		
		        domClass.add(this.fileContainer, "video");
		        domClass.add(this.fileDetailsContainer, "lotusHidden");
		
		        if(this.newsData.object.image){
		           var previewImage = this.newsData.getActivityImageUrl();
		        }    
		
		        var nextId = this.directFileLink? this.directFileLink.id : (this.iconFileLink ? this.iconFileLink.id : "");
		        
		        this.videoPreview = new VideoPreviewNode({
		            data:{
		                title : this.fileName,
		                fileUrl : this.fileDirectUrl,
		                filePageUrl: this.filePageURL,
		                tagsTextNode: this.tagsTextNode,
		                authorInfo: this.authorInfo,
		                fileDetailsContainer: this.fileDetailsContainer,
		                image : previewImage,
		                imageHeight: 0,
		                maxHeight: 390,
		                prevId: null,
		                nextId: nextId,
		                isFileOverlayEnabled: this.isFileOverlayEnabled()
		            }
		        });
		        this.videoPreview.placeAt(this.videoPreviewContainer);
		
		
		
		    },		  		  
		
		    isVideoPlayable: function(){
		
		       //var fileType = com.ibm.social.incontext.util.text.getExtension(this.fileName);
		
		       return this.fileType === "mp4" || this.fileType === "mov";
		    },
		
		    /**
			 * Get tags from a tags object array.
			 * @param tagsObjArr {Array} e.g. [{objectType: "tag", displayName: "a"}].
			 * @returns {String|null} null if nothing available, tag String in the
			 * format of: "a, b, c" otherwise.
			 */
			getFileTags: function(tagsObjArr){
				// Return the tags in the "a, b, c" string form
				var tagsAll = this.getTagsArray(tagsObjArr);
				if(tagsAll.length > 4) {
					return string.substitute(this.strings.listTags, [ tagsAll.slice(0,4).join(", "), (tagsAll.length - 4)]);
				}
		
				return tagsAll.join(", ");
			},
		
		
		    previewEnabled: function(){    	
		       return (com.ibm.social.as.configManager.isFeatureEnabledByConfig(enablement.AS_VIDEO_PREVIEW)
		    		   && enablement.checkEnablement(enablement.AS_VIDEO_PREVIEW));
		    },
		
			uninitialize: function(){
				this.authorInfo = null;
				this.fileName = null;
				this.inherited(arguments);
		        this.fileDirectUrl = null;
		        this.directFileLink = null;
			}
		});
		
		/**
		 * Dummy class that is used as a means to serialize the fileNewsItem.html in the dojo build.
		 * It couldn't be put in the main FileNewsItem as it would overwrite the NewsItem's
		 * templatePath. If the HTML file is just pulled in from a property that isn't called
		 * templatePath, the dojo build doesn't serialize it and an extra XHR request is made for it.
		 */
		
		declare("com.ibm.social.as.item.DummyFileNewsItem",null,
		{
			templateString: template
		});
		
		return FileNewsItem;
	});
