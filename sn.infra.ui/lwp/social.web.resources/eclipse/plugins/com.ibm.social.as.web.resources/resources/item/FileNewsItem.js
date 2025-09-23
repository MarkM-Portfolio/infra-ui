/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.FileNewsItem");

dojo.require("com.ibm.social.as.item.NewsItem");
dojo.require("com.ibm.social.as.dialog.DownloadErrorDialog");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.as.config.enablement");
dojo.require("com.ibm.social.incontext.videoPreview.VideoPreviewNode");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("lconn.core.config.features");
dojo.require("lconn.core.globalization.bidiUtil");

/**
 * Widget used to display individual file news items in the
 * activity stream.
 * @author Robert Campion
 */

dojo.declare(
"com.ibm.social.as.item.FileNewsItem",
[com.ibm.social.as.item.NewsItem],
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
	templateExtension: dojo.cache("com.ibm.social.as", "item/templates/fileNewsItem.html"),

	downloadLinkConnect: null,

    // Video Preview Object
    videoPreview: null,

    //Node to place video preview node in
    videoPreviewContainer: null,

    fileContainer: null,

    fileDetailsContainer: null,

    image: null,

    html5VideoPlaying: com.ibm.social.as.constants.events.HTML5VIDEOPLAYING,

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
			var tagsText = dojo.string.substitute(this.strings.tagsText, [this.fileTags]);
			this.tagsTextNode = dojo.doc.createTextNode(tagsText);
			dojo.place(this.tagsTextNode, this.tagsListItem);
			dojo.removeClass(this.tagsListItem, "lotusHidden");// Show tags
		}

		// If the author info isn't set
		if(!this.authorInfo){
			// Hide the author info node and add lotusFirst to the tags li
			dojo.addClass(this.authorInfoItem, "lotusHidden");

			if(this.fileTags){
				dojo.addClass(this.tagsListItem, "lotusFirst");
			}
		}

		// Get the "profiles" node
		// This should contain the title content after the user's name
		var profilesContentNodes = dojo.query(".profiles", this.contentNode);

		if(profilesContentNodes.length > 0){
			var profilesContentNode = profilesContentNodes[0];

			var tagsArray = this.getTagsArray(this.newsData.getActivityTags());
			// Parse any hashtags to linkify them and put them back on the page
			profilesContentNode.innerHTML = this.parseHashTags(profilesContentNode.innerHTML, tagsArray);
		}

		this.setupDirectFileDownload();

        if (this.isVideoPlayable() && this.previewEnabled()){
            this.initVideoPreview();
            dojo.subscribe(this.html5VideoPlaying, dojo.hitch(this, function(){
                this.allowItemKeyboardNavigation = false;
            }));
        }

		if(!dojo._isBodyLtr()) {
			dojo.query("a", this.domNode)
			.forEach(
				dojo.hitch(this, function(node){
					if(node.innerHTML == this.fileName) {
						dojo.attr(node, "dir", "ltr");
					}
				})
			);
		}

        if (com.ibm.social.incontext.util.html.isHighContrast()){
            if(this.fileDetails){
                dojo.style(this.fileDetails, "top","0px");
                dojo.style(this.fileDetails, "float","right");
            }
            if(this.highContrastFileIcon){
                dojo.removeClass(this.highContrastFileIcon, "lotusHidden");
                dojo.attr(this.highContrastFileIcon, "innerHTML", this.strings.downloadError.slice(0,8));
            }
        }

        this.showFileOverlayInsteadEE = this.isFileOverlayEnabled();
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
		if (this.showFileOverlayInsteadEE) {
			this.showFileOverlay();
		} else {
			this.inherited(arguments);
		}
	},

	showFileOverlay: function () {
      var fileOverlayViewer = dojo.getObject("lconn.share.fileviewer.ConnectionsFileViewer");

      if (fileOverlayViewer && this.fileDirectUrl!="") {
         fileOverlayViewer.openFromUrl(this.fileDirectUrl);
      } else {
         console.error("Could not get lconn.share.fileviewer.ConnectionsFileViewer or url is empty, opening EE");
         this.showFileOverlayInsteadEE=false;
         this.openEE();
      }
   },

	setupDirectFileDownload: function(){
		//connect an event which sends a head request to the file to see
		//if the user has access to download
		if ( dojo.isFF < 4 || dojo.isWebKit < 536) {
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
        this.fileType = com.ibm.social.incontext.util.text.getExtension(this.fileName);
		this.fileTypeDisplayName = this.fileType.toUpperCase();
		this.fileDirectUrl = this.newsData.getActivityFileUrl() || "";
        if(this.newsData.getActivityType() === "note"){
            this.filePageURL = this.fileDirectUrl;
        }else{
            this.filePageURL = this.newsData.getPermaLink() || "";
        }
        fileName = this.fileName = lconn.core.globalization.bidiUtil.createSttDisplayString(fileName, "FILE_PATH");
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
		if(this.fileDirectUrl) {
			var encodedUrl = this.encodeFileUrl(this.fileDirectUrl);
			if (this.newsData.getGenerator().id == "files"){
				activityStreamAbstractHelper.xhrHead({
					url: encodedUrl,
					load: dojo.hitch(this, function () {
						downloadLink.href = this.fileDirectUrl;
						this.disconnect(this.downloadLinkConnect);
						downloadLink.click();
					}),
					error: dojo.hitch(this, "downloadFailed", downloadLink)
				});
			} else {
				downloadLink.href = this.fileDirectUrl;
				dojo.attr(downloadLink, "target", "_blank");
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
			this.downloadErrorDialog = new com.ibm.social.as.dialog.DownloadErrorDialog({});
		}
		this.downloadErrorDialog.show();
	},

    initVideoPreview: function(){

        dojo.addClass(this.fileContainer, "video");
        dojo.addClass(this.fileDetailsContainer, "lotusHidden");

        if(this.newsData.object.image){
           var previewImage = this.newsData.getActivityImageUrl();
        }

        var nextId = this.directFileLink? this.directFileLink.id : (this.iconFileLink ? this.iconFileLink.id : "");
        
        this.videoPreview = new com.ibm.social.incontext.videoPreview.VideoPreviewNode({
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
			return dojo.string.substitute(this.strings.listTags, [ tagsAll.slice(0,4).join(", "), (tagsAll.length - 4)]);
		}

		return tagsAll.join(", ");
	},


    previewEnabled: function(){
       return (com.ibm.social.as.configManager.isFeatureEnabledByConfig(com.ibm.social.as.config.enablement.AS_VIDEO_PREVIEW)
    		   && com.ibm.social.as.config.enablement.checkEnablement(com.ibm.social.as.config.enablement.AS_VIDEO_PREVIEW));
    },

    /**
     * Determine if the FileViewer should be displayed instead of EE
     * Note the following
     * 1) Gatekeeper switch
     * 2) Not gadget scenario (where EE must be launched for OpenSocial)
     * 3) check for generator - status updates with files attached share this hierarchy
     * for now they retain the StatusUpdate EE with file attachement (keeping inline commenting, liking etc as Microblogging)
     */
	isFileOverlayEnabled: function(){
		if(activityStreamAbstractHelper && activityStreamAbstractHelper.isGadget) {
			return false;
		}

		if (this.newsData.getGenerator().id !== "files"){
			return false;
		}
		if(lconn.core.config.features("fileviewer-everywhere") &&
				lconn.core.config.features("fileviewer-everywhere-activitystream")){
			return true;
		}

		return false;
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

dojo.declare("com.ibm.social.as.item.DummyFileNewsItem",null,
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/templates/fileNewsItem.html")
});
