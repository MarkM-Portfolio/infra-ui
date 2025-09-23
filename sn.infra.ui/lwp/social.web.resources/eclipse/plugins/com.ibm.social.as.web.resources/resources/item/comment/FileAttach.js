/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * @author decarey
 * @date 25/11/13
 */
dojo.provide("com.ibm.social.as.item.comment.FileAttach");

dojo.requireLocalization("com.ibm.social.as", "activitystream");
dojo.require("lconn.news.microblogging.sharebox.FilePickerManager");
dojo.require("lconn.core.util.LCDeferred");
dojo.require("lconn.core.url");
dojo.require("lconn.core.filesutil");

dojo.declare("com.ibm.social.as.item.comment.FileAttach",
	[dijit._Widget, dijit._Templated],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/comment/templates/fileAttach.html"),

	resourceStrings: null,
	_context: null,
	_filePickerManager: null,
	_filePickerOpened: false,
	_selectedFileAttachment: null,
    communityId: null,

	postMixInProperties: function() {
		this.resourceStrings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
		this._buildContext();
		this._filePickerManager = new lconn.news.microblogging.sharebox.FilePickerManager(this._context, null);
	},

	postCreate: function() {
		this.inherited(arguments);
		this._filePickerManager.uploadProgressNode = this.uploadProgressNode;

		dojo.style(this.attachActionButtonNode,{padding: '0', margin: '0'});
		dojo.style(this.fileAttachmentSectionNode,{padding: '0', margin: '0'});
	},

	_buildContext: function () {
        if (this.communityId && this.communityId != undefined && this.communityId != null){
            this._context = new lconn.news.microblogging.sharebox.Context(lconn.news.microblogging.sharebox.Context.COMMUNITIES_CONTEXT, this.communityId);
        } else {
            this._context = new lconn.news.microblogging.sharebox.Context(lconn.news.microblogging.sharebox.Context.PROFILES_CONTEXT, null);
        }
	},

	_onAttachFile: function () {
		var errorCallback = dojo.hitch(this, function (err) {
			console.debug("Error occurred when opening the file picker widget");
			console.debug(err);
		});

		this._filePickerManager.openFilePicker().addCallbacks(dojo.hitch(this, "_onFileSelected"), errorCallback);
		this._filePickerOpened = true;
	},

	_onFileSelected: function (file) {
		if (file === "cancel") {
			this._focusNode(this.attachActionButtonNode);
		} else {
			this._selectedFileAttachment = file;
			this._filePickerOpened = false;
			this._renderSelectedFile(file);
			this._focusNode(this.removeAttachmentNode);
		}
	},

	_focusNode: function(node){
		// Using setTimeout works round a Chrome issue of focusing on a link.
		setTimeout(dojo.hitch(this, function() {node.focus()}),100);
	},

	_renderSelectedFile: function (file) {
		var fileDisplayName = file.getName();

		if (this._isExistingFile(file)) {
			// Existing file in IC Files - render link to the file
			var fileDetailsActionLink = document.createElement("a");
			fileDetailsActionLink.href = file.getUrlDownload();
			fileDetailsActionLink.innerHTML = fileDisplayName;
			dojo.attr(fileDetailsActionLink,"aria-label",file.getName());
			dojo.attr(fileDetailsActionLink,"title",file.getName());
			this.fileAttachmentDetailsNode.appendChild(fileDetailsActionLink);
		} else {
			// File selected from local machine - yet to be uploaded
			var fileDetailsLabel = document.createElement("span");
			fileDetailsLabel.innerHTML = fileDisplayName;
			dojo.attr(fileDetailsLabel,"aria-label",file.getName());
			dojo.attr(fileDetailsLabel,"title",file.getName());
			this.fileAttachmentDetailsNode.appendChild(fileDetailsLabel);
		}

		this._showFileAttachmentNode(true);
	},

	_isExistingFile: function (file) {
		return (file && dojo.indexOf(["lconn.share.bean.File", "lconn.share.bean.FileFromJson"], file.declaredClass) !== -1);
	},

	_showFileAttachmentNode: function (show) {
		if (show){
			dojo.style(this.fileAttachmentNode, "display", "inline");
			dojo.style(this.attachActionButtonNode, "display", "none");
		} else	{
			dojo.style(this.fileAttachmentNode, "display", "none");
			dojo.style(this.attachActionButtonNode, "display", "inline");
		}
	},

	removeAttachment: function () {
		this._onRemoveAttachment();
	},

	_onRemoveAttachment: function () {
		this._showFileAttachmentNode(false);
		this._selectedFileAttachment = null;
		this.showUploadProgressBar(false);
		var nodeToRemove = this.fileAttachmentDetailsNode.firstElementChild || this.fileAttachmentDetailsNode.children[0];
		this.fileAttachmentDetailsNode.removeChild(nodeToRemove);
	},

	hasFileSelected: function(){
		if (this._selectedFileAttachment == null){
			return false;
		}

		return true;
	},

	postFile: function(){
		var deferred = new lconn.core.util.LCDeferred();

		var opt = {};

		if (!this.hasFileSelected()){
			return;
		}

		if (this._isExistingFile(this._selectedFileAttachment)) {
			if(this._selectedFileAttachment.isPrivate()){; //MAKE PUBLIC
				this._filePickerManager.setSelectedFile(this._selectedFileAttachment);
				this._filePickerManager.changeFileVisibility()
			}

			if (this._context.type == lconn.news.microblogging.sharebox.Context.COMMUNITIES_CONTEXT){
				lconn.core.filesutil.shareWithCommunity({file: this._selectedFileAttachment, community: [this.communityId]});
			}

			deferred.resolve({success: true, isExisting: true, file: this._selectedFileAttachment});
		} else {
			this.showUploadProgressBar(true);

			dojo.connect(this._filePickerManager._uploadUtils, "onUploadSuccess", dojo.hitch(this,this._uploadCallbackSuccess,deferred));
			dojo.connect(this._filePickerManager._uploadUtils, "onUploadError", dojo.hitch(this, this._uploadCallbackError,deferred));
			this._filePickerManager._uploadUtils.startUpload(opt);
		}

		return deferred;
	},

	showUploadProgressBar: function(show){
		if (show){
			dojo.style(this.uploadProgressContainer,"display","");
			dojo.style(this.fileAttachmentSectionNode,"display","none");
		} else {
			dojo.style(this.uploadProgressContainer,"display","none");
			dojo.style(this.fileAttachmentSectionNode,"display","");
		}
	},

	_uploadCallbackSuccess: function(deferred,file){
		this._filePickerManager.setSelectedFile(file);
		this._filePickerManager.changeFileVisibility(); //MAKE PUBLIC

		if (this._context.type == lconn.news.microblogging.sharebox.Context.COMMUNITIES_CONTEXT){
			lconn.core.filesutil.shareWithCommunity({file: file, community: [this.communityId]});
		}

		this._selectedFileAttachment = null;
		this.showUploadProgressBar(false);
		deferred.resolve({success: true, file: file});
	},

	_uploadCallbackError: function(deferred,file,error){
		this._selectedFileAttachment = null;
		console.debug("Error uploading the file");
		console.debug(file);
		console.debug(error);
		deferred.resolve({success: false, file: file, error: error});
	},

	// Build the JSON object passed in the POST request to end-point
	_buildRequestObj: function (message,file) {
		var requestObj = {
			content: message
		};

		if (typeof file != 'undefined' && file != null) {

			var weakRefObj = {
				author: {
					id: file.getAuthor().id
				},
				id: file.getId(),
				displayName: file.getTitle(),
				url: this._replaceFilesContextRoot(file.getUrlDownload()),
				summary: file.getDescription(),
				published: dojo.date.stamp.toISOString(file.getPublished(), {zulu:true})
			};

			// OGS: add url to file is it is an image as
			// thumbnail generation not ready
			var fileType = file.getMimeType();
			var isImage = fileType.match(/image/);

			if (isImage) {

				var urlThumbnail = null;

				try {
					urlThumbnail = file.getUrlThumbnail();
				} catch(e){
					// swallow - raised defect 59723 to fix getUrlThumbnail when
					// uploading file
				}

				if (urlThumbnail == null){
					// build thumbnail url - ideally this should be provided by
					// Files in the bean
					urlThumbnail = file.getUrlDownload();
					urlThumbnail = urlThumbnail.replace(/\/media.*/, "/thumbnail");
				}

				weakRefObj.image = {
					url: this._replaceFilesContextRoot(urlThumbnail)
				};
			}

			requestObj.attachments = [weakRefObj];
		}

		return requestObj;
	},

	_getContextRoot: function (serviceName) {
		var contextRoot = lconn.core.url.getServiceUrl(lconn.core.config.services[serviceName]).uri;

		return contextRoot;
	},

	_replaceFilesContextRoot: function (url) {
		// replace the context root to IC Files with the pattern {files}
		// the pattern is replaced server side on retrieval do nothing for ogs - use abs urls.
		var filesCtxRoot = this._getContextRoot("files");
		url = url.replace(filesCtxRoot, "{files}");

		return url;
	}
});
