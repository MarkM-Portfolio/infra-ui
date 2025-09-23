/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/lang",
		"dojo/_base/declare",
		"dojo/dom-attr",
		"dojo/_base/array",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/date/stamp",
		"dojo/dom-style",
		"dojo/on",
		"dojo/text!ic-as/item/comment/templates/fileAttach.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-core/config/services",
		"ic-core/filesutil",
		"ic-core/url",
		"ic-core/util/LCDeferred",
		"ic-news/microblogging/sharebox/FilePickerManager"
	], function (dojo, lang, declare, domAttr, array, i18nactivitystream, stamp, domStyle, on, template, _Templated, _Widget, services, filesutil, urlModule, LCDeferred, FilePickerManager) {
	
		/**
		 * @author decarey
		 * @date 25/11/13
		 */
		var FileAttach = declare("com.ibm.social.as.item.comment.FileAttach",
			[_Widget, _Templated],
		{
			templateString: template,
		
			resourceStrings: null,
			_context: null,
			_filePickerManager: null,
			_filePickerOpened: false,
			_selectedFileAttachment: null,
		    communityId: null,
		
			postMixInProperties: function() {
				this.resourceStrings = i18nactivitystream;
				this._buildContext();
				this._filePickerManager = new FilePickerManager(this._context, null);
			},
		
			postCreate: function() {
				this.inherited(arguments);
				this._filePickerManager.uploadProgressNode = this.uploadProgressNode;
		
				domStyle.set(this.attachActionButtonNode, {padding: '0', margin: '0'});
				domStyle.set(this.fileAttachmentSectionNode, {padding: '0', margin: '0'});
			},
		
			_buildContext: function () {
		        if (this.communityId && this.communityId != undefined && this.communityId != null){
		            this._context = new lconn.news.microblogging.sharebox.Context(lconn.news.microblogging.sharebox.Context.COMMUNITIES_CONTEXT, this.communityId);
		        } else {
		            this._context = new lconn.news.microblogging.sharebox.Context(lconn.news.microblogging.sharebox.Context.PROFILES_CONTEXT, null);
		        }
			},
		
			_onAttachFile: function () {
				var errorCallback = lang.hitch(this, function (err) {
					console.debug("Error occurred when opening the file picker widget");
					console.debug(err);
				});
		
				this._filePickerManager.openFilePicker().addCallbacks(lang.hitch(this, "_onFileSelected"), errorCallback);
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
				setTimeout(lang.hitch(this, function() {node.focus()}),100);
			},
		
			_renderSelectedFile: function (file) {
				var fileDisplayName = file.getName();
		
				if (this._isExistingFile(file)) {
					// Existing file in IC Files - render link to the file
					var fileDetailsActionLink = document.createElement("a");
					fileDetailsActionLink.href = file.getUrlDownload();
					fileDetailsActionLink.innerHTML = fileDisplayName;
					domAttr.set(fileDetailsActionLink, "aria-label", file.getName());
					domAttr.set(fileDetailsActionLink, "title", file.getName());
					this.fileAttachmentDetailsNode.appendChild(fileDetailsActionLink);
				} else {
					// File selected from local machine - yet to be uploaded
					var fileDetailsLabel = document.createElement("span");
					fileDetailsLabel.innerHTML = fileDisplayName;
					domAttr.set(fileDetailsLabel, "aria-label", file.getName());
					domAttr.set(fileDetailsLabel, "title", file.getName());
					this.fileAttachmentDetailsNode.appendChild(fileDetailsLabel);
				}
		
				this._showFileAttachmentNode(true);
			},
		
			_isExistingFile: function (file) {
				return (file && array.indexOf(["lconn.share.bean.File", "lconn.share.bean.FileFromJson"], file.declaredClass) !== -1);
			},
		
			_showFileAttachmentNode: function (show) {
				if (show){
					domStyle.set(this.fileAttachmentNode, "display", "inline");
					domStyle.set(this.attachActionButtonNode, "display", "none");
				} else	{
					domStyle.set(this.fileAttachmentNode, "display", "none");
					domStyle.set(this.attachActionButtonNode, "display", "inline");
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
				var deferred = new LCDeferred();
		
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
						filesutil.shareWithCommunity({file: this._selectedFileAttachment, community: [this.communityId]});
					}
		
					deferred.resolve({success: true, isExisting: true, file: this._selectedFileAttachment});
				} else {
					this.showUploadProgressBar(true);
		
					on(this._filePickerManager._uploadUtils, "UploadSuccess", lang.hitch(this,this._uploadCallbackSuccess,deferred));
					on(this._filePickerManager._uploadUtils, "UploadError", lang.hitch(this, this._uploadCallbackError,deferred));
					this._filePickerManager._uploadUtils.startUpload(opt);
				}
		
				return deferred;
			},
		
			showUploadProgressBar: function(show){
				if (show){
					domStyle.set(this.uploadProgressContainer, "display", "");
					domStyle.set(this.fileAttachmentSectionNode, "display", "none");
				} else {
					domStyle.set(this.uploadProgressContainer, "display", "none");
					domStyle.set(this.fileAttachmentSectionNode, "display", "");
				}
			},
		
			_uploadCallbackSuccess: function(deferred,file){
				this._filePickerManager.setSelectedFile(file);
				this._filePickerManager.changeFileVisibility(); //MAKE PUBLIC
		
				if (this._context.type == lconn.news.microblogging.sharebox.Context.COMMUNITIES_CONTEXT){
					filesutil.shareWithCommunity({file: file, community: [this.communityId]});
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
						published: stamp.toISOString(file.getPublished(), {zulu:true})
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
				var contextRoot = urlModule.getServiceUrl(services[serviceName]).uri;
		
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
		
		return FileAttach;
	});
