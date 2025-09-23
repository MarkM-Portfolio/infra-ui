/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * @author decarey
 * @date 03/12/13
 */
dojo.provide("com.ibm.social.as.item.comment.FileAttached");

dojo.require("com.ibm.social.as.dialog.DownloadErrorDialog");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.item.comment.FileAttached",
	[dijit._Widget, dijit._Templated],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/comment/templates/fileAttached.html"),

	resourceStrings: null,
	downloadLinkConnect: null,
	commentFileAttachedDivConnect: null,

	//template parameters
	fileName: "",
	fileUrl: "",
	fileTypeDisplayName: "",
	imageSrc: "",
	imageClass: "lconn-ftype32 lconn-ftype32-",
    imageStyle: "border: 0;",
	fileNameClass: "",
	authorInfo: "",
	tagsText: "",

	postMixInProperties: function() {
		this.resourceStrings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
	},

	postCreate: function(){
		this.inherited(arguments);
		this.downloadLinkConnect = this.connect(this.fileLink, "onclick", "downloadLinkClicked");
		this.commentFileAttachedDivConnect=this.connect(this.domNode.parentNode.parentNode,"onclick","showFileOverlay")
	},

	downloadLinkClicked: function(){
		if(this.fileLink && this.fileUrl){
			activityStreamAbstractHelper.xhrHead({
				url: this.fileUrl,
				load: dojo.hitch(this, function(){
					this.disconnect(this.downloadLinkConnect);
					this.fileLink.href = this.fileUrl;
					this.fileLink.click();
				}),
				error: dojo.hitch(this, "downloadFailed")
			});
		} else {
			this.downloadFailed();
		}
	},

	downloadFailed: function(e){
		if(this.downloadErrorDialog == null){
			this.downloadErrorDialog = new com.ibm.social.as.dialog.DownloadErrorDialog({});
		}
		this.downloadErrorDialog.show();
	},

	showFileOverlay: function (event) {
		var fileOverlayViewer = dojo.getObject("lconn.share.fileviewer.ConnectionsFileViewer");

		if (fileOverlayViewer) {
			fileOverlayViewer.openFromUrl(this.fileUrl);
		}

		event.stopPropagation();
	},
});
