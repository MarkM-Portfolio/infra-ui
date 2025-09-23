/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

var DiscussThis = {
	version: '4.5',
	
	name: '',
	description: '',
	site: '',
	topicLink: '',
	date: '',
	author: '',
	attachments: '',
	parentName: '',
	parentLink: '',
	parentImg: '',
	communityId: '',
	communityTitle: '',
	favicon:'',
	video:'',
	videoWidth:'400', //default
	videoHeight:'250', //default
	image:'',
	
	windowName: '',
	findBy:'simple',
	find:'article',
	
	getData: function() {
		this.getDataByMF() || this.getDataByMeta() || this.getSimpleData();
		if (!this.parentImg) {
			this.getFavicon();
		}
		this.windowName = '{"findBy":"'+encodeURIComponent(this.findBy)
		    +'","find":"'+encodeURIComponent(this.find)
		    +'","favicon":"'+encodeURIComponent(this.favicon)
		    +'","image":"'+encodeURIComponent(this.image)
		    +'","video":"'+encodeURIComponent(this.video)
		    +'","videoWidth":"'+encodeURIComponent(this.videoWidth)
		    +'","videoHeight":"'+encodeURIComponent(this.videoHeight)
			+'","topicLink":"'+encodeURIComponent(this.topicLink)
		    +'","communityId":"'+encodeURIComponent(this.communityId)
		    +'","communityTitle":"'+encodeURIComponent(this.communityTitle)
		    +'","parentName":"'+encodeURIComponent(this.parentName)
		    +'","parentImg":"'+encodeURIComponent(this.parentImg)
		    +'","parentLink":"'+encodeURIComponent(this.parentLink)
		    +'","name":"'+encodeURIComponent(this.name)
		    +'","description":"'+encodeURIComponent(this.description)
		    +'","date":"'+encodeURIComponent(this.date)
		    +'","author":"'+encodeURIComponent(this.author)
		    +'","attachments":"'+encodeURIComponent(this.attachments)+'"}';
	},
	
	openWindow: function(targetBookmarklet) {
		var findScript = false;
		var src;
		var ver;
		var scripts = document.getElementsByTagName('script');
		for (var i=scripts.length-1;i>=0;i--) {
			src = scripts[i].src;
			// Before 4.5, the ver is null
			ver = scripts[i].ver;
			if (src) {
				if (!findScript){
					if (src.match(/tools\/discussThis\.js(\?.*)?$/)) {
						DiscussThis.version = ver;
						findScript = true;
					}
				}
                if(findScript) break;
			}
		}
		var verArg="";
		if(ver)
			verArg = "?ver="+ver;

		var iWidth = 750;
		var iHeight = 500;
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
		var w = window.open("about:blank", "_blank",'toolbars=no,scrollbars=yes,resizable=yes,width='+iWidth+',height='+iHeight+',top='+iTop+',left='+iLeft);
		w.name = this.windowName;
		w.location.href = targetBookmarklet + "/discussThis/popup"+verArg;
	},

	getDataByMF: function() {
		if (typeof(dojo) == "undefined") {
			return false;
		}
	
		var host = document.location.protocol + "//" + document.location.host;
		this.topicLink = document.location.href;
	
		var entries = dojo.query(".hentry");
		if (entries.length == 0) {
			return false;
		}
		var entry = entries[0];
		var nameNode = dojo.query(".entry-title", entry)[0];
		if(!nameNode) {
		   return false;
		}
		
		this.name = nameNode.textContent || nameNode.innerText;
		var originDescription = dojo.query(".entry-content", entry)[0].innerHTML;
	   //defect 127169: filter bizcard processed attr
	   this.description = originDescription.replace(/_bizcardprocessed_="true"/g, "");
       
		this.date = dojo.query(".published", entry)[0].title;
		var authorNode = dojo.query(".fn", entry)[0];
		this.author = authorNode.textContent || authorNode.innerText;
	
		if (ic_comm_communityUuid && ic_comm_communitiesSvcRef && ic_comm_communityName) {
			this.parentImg = ic_comm_communitiesSvcRef + "/service/html/image?communityUuid=" + ic_comm_communityUuid + "&showDefaultForNoPermissions=true";
			this.parentName = ic_comm_communityName;
			this.parentLink = ic_comm_communitiesSvcRef + "/service/html/communityview?communityUuid=" + ic_comm_communityUuid;
			//http://tapstage.swg.usma.ibm.com/ic4/communities/service/html/image?communityUuid=7f4f2f66-aef2-42ca-8f48-b69bd6bb0ca0&showDefaultForNoPermissions=true
		} else {
			//temp code, for old release. will be changed after community information is microformated
			if (dojo.query(".lotusLayout").length > 1) {
				var communityElement = dojo.query("a", dojo.query(".lotusLayout")[1])[0];
				this.parentLink = communityElement.href;
				this.parentName = communityElement.innerHTML;
				var communityLiE = dojo.query("li", dojo.query(".lotusMenuSubsection")[0])[0];
				var communityIE = dojo.query("img", communityLiE)[0];
				if (communityIE) {
					if (communityIE.src && communityIE.src.indexOf('http')==0 && communityIE.src.indexOf('/service/html/image') > 0) {
						this.parentImg = communityIE.src;
						if (this.parentImg.indexOf('&showDefaultForNoPermissions=true') < 0) {
							this.parentImg += '&showDefaultForNoPermissions=true';
						}
					}					
				}
			}
		}
		
		//stand-alone forum 
		var commonUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.webresources);
		
		if (!this.parentImg) {
			var forumLink = dojo.query(".forumLink")[0];
			this.parentName = forumLink.innerHTML;
			this.parentLink = forumLink.href;
			this.parentImg = commonUrl + '/web/com.ibm.oneui3.styles/imageLibrary/Icons/ComponentsGray/ForumsGray32.png';
		}
		
		var attachments = "";
		var attachmentList = dojo.query(".dfAttachment", entry);
		if (attachmentList.length > 0) {
			var attachmentsElement = dojo.create("div");
			var divider = dojo.create("span", {
					className: 'lotusDivider'
			});
			for (i = 0; i < attachmentList.length; i++) {
				var attachmentElement = dojo.create("div");
				var attachment = attachmentList[i];
				var thumbnails = dojo.query(".dfThumbnail", attachment);
				var mimeIcons = dojo.query(".dfMimeIcon", attachment);
				var links = dojo.query(".dfLink", attachment);
				var sizes = dojo.query(".dfSize", attachment);
				var downloads = dojo.query(".dfDownload", attachment);
				if (thumbnails.length > 0) {
					var icon = dojo.create("span", {
						mimetype: "text/plain",
						className: "dfMimeIcon lconnSprite lconnSprite-iconVisualization16"
					});
					dojo.place(icon, attachmentElement);
				}
				if (mimeIcons.length > 0) {
					var mimeIcon = dojo.clone(mimeIcons[0]);
					dojo.place(mimeIcon, attachmentElement);
				}
				if (links.length > 0) {
					var link = dojo.clone(links[0]);
					dojo.place(link, attachmentElement);
				}
				if (sizes.length > 0) {
					var size = dojo.create("span", {
							className: "lotusMeta",
							innerHTML: sizes[0].innerHTML
					});
					dojo.place(dojo.clone(divider), attachmentElement);
					dojo.place(size, attachmentElement);
				}
				if (downloads.length > 0) {
					var download = dojo.clone(downloads[0]);
					dojo.place(dojo.clone(divider), attachmentElement);
					dojo.place(download, attachmentElement);
				}
				dojo.place(attachmentElement, attachmentsElement);
			}
			
			//change relative links to absolute links
			attachments = attachmentsElement.innerHTML;
			var hrefReg = new RegExp('href="/','g');
			if (host.lastIndexOf('/') == host.length-1) {
			    attachments = attachments.replace(hrefReg, 'href="' + host);
			} else {
			    attachments = attachments.replace(hrefReg, 'href="' + host + '/');
			}
			var srcReg = new RegExp('src="/','g');
			if (host.lastIndexOf('/') == host.length-1) {
			    attachments = attachments.replace(srcReg, 'src="' + host);
			} else {
			    attachments = attachments.replace(srcReg, 'src="' + host + '/');
			}
		};
		this.attachments = attachments;
		
		this.findBy = "DF";
		return true;
	},

	getDataByMeta: function() {
		var metas = document.getElementsByTagName("meta");
		var metaSupported = false;
	
		var secondDescription = "";
		for (var i = 0; i < metas.length; i++) {
			var property = metas[i].getAttribute("property");
			if (property) {
				property = property.toLowerCase();
				if (property == "og:site_name") {
					this.site = metas[i].content;
					metaSupported = true;
				} else if (property == "og:title") {
					this.name = metas[i].content;
					metaSupported = true;
				} else if (property == "og:description") {
					this.description = metas[i].content;
					metaSupported = true;
				} else if (property.toLowerCase() == "og:url") {
					this.topicLink = metas[i].content;
					metaSupported = true;
				} else if (property.toLowerCase() == "og:video") {
					this.video = metas[i].content;
					metaSupported = true;
				} else if (property.toLowerCase() == "og:video:width") {
					this.videoWidth = metas[i].content;
					metaSupported = true;
				} else if (property.toLowerCase() == "og:video:height") {
					this.videoHeight = metas[i].content;
					metaSupported = true;
				} else if (property.toLowerCase() == "og:image") {
					this.image = metas[i].content;
					metaSupported = true;
				} else if (property.toLowerCase() == "og:type") {
					this.find = metas[i].content;
					metaSupported = true;
				}
			}
			
			var name = metas[i].name.toLowerCase();
			if (name == "description") {
				secondDescription = metas[i].content;
			}
		}
		
		if (!metaSupported) return false;
		
		if (!this.description) {
			this.description = secondDescription;
		}		
		if (!this.name) {
			this.name = document.title;
		}
		if (!this.topicLink) {
			this.topicLink = document.location.href;
		}
		
		this.parentName = this.site;
		this.parentLink = '';
		
		this.findBy = "meta";
		if (this.videoWidth > 560) {
			this.videoHeight = this.videoHeight*(560/this.videoWidth);
			this.videoWidth = 560;			
		}
		return true;
	},

	getSimpleData: function() {
		this.name = document.title;
		this.topicLink = document.location.href;
		this.findBy = "simple";
	},
	
	getFavicon: function() {
		var links = document.getElementsByTagName("link");
		
		for (var i = 0; i < links.length; i++) {
			var rel = links[i].getAttribute("rel");
			if (rel) {
				rel = rel.toLowerCase();
				if (rel == "shortcut icon" || rel=="shortcut" || rel=="icon") {					
					if (links[i].href && links[i].href.indexOf('http')==0) {
						this.favicon = links[i].href;
						break;
					}
				} 
			}
		}
	}
};

if (typeof(targetBookmarklet) == "string") {
	DiscussThis.getData();
	DiscussThis.openWindow(targetBookmarklet);
	targetBookmarklet=null;
}