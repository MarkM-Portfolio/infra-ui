/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/on",
		"dojo/text!ic-as/item/comment/templates/fileAttached.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/dialog/DownloadErrorDialog"
	], function (dojo, declare, lang, i18nactivitystream, on, template, _Templated, _Widget, DownloadErrorDialog) {
	
		/**
		 * @author decarey
		 * @date 03/12/13
		 */
		var FileAttached = declare("com.ibm.social.as.item.comment.FileAttached",
			[_Widget, _Templated],
		{
			templateString: template,
		
			resourceStrings: null,
			downloadLinkConnect: null,
		
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
				this.resourceStrings = i18nactivitystream;
			},
		
			postCreate: function(){
				this.inherited(arguments);
				this.downloadLinkConnect = this.own(on(this.fileLink, "click", lang.hitch(this,"downloadLinkClicked")));
			},
		
			downloadLinkClicked: function(){
				if(this.fileLink && this.fileUrl){
					activityStreamAbstractHelper.xhrHead({
						url: this.fileUrl,
						load: lang.hitch(this, function(){
							this.disconnect(this.downloadLinkConnect);
							this.fileLink.href = this.fileUrl;
							this.fileLink.click();
						}),
						error: lang.hitch(this, "downloadFailed")
					});
				} else {
					this.downloadFailed();
				}
			},
		
			downloadFailed: function(e){
				if(this.downloadErrorDialog == null){
					this.downloadErrorDialog = new DownloadErrorDialog({});
				}
				this.downloadErrorDialog.show();
			}
		});
		
		return FileAttached;
	});
