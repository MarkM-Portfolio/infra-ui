/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */
(function() {
dojo.provide("lconn.share.action.impl.FilePreviewDialog");
dojo.require("lconn.share.widget.FileRendererCore");
dojo.require("lconn.share.previewConfig");
dojo.require("lconn.share.action.AbstractDialog");
dojo.require("lconn.share.widget.FlashVideoPlayer");
dojo.require("lconn.share.widget.HTML5VideoPlayer");
dojo.require('lconn.share.widget.FileDateFormatter');
dojo.requireLocalization("lconn.share","FileThumbnail");
dojo.requireLocalization("lconn.files","ui");
dojo.requireLocalization("lconn.files","community");
dojo.require("lconn.core.utilities");
dojo.require("lconn.share.scenehelper");
dojo.require("lconn.share.action.impl.fileViewer");
dojo.require("lconn.share.util.IBMDocs.ThumbnailConstants");
dojo.require("lconn.share.util.IBMDocs.ViewerAPI");
dojo.require("lconn.share.util.IBMDocs.ViewerRoutes");

var ThumbnailConstants = lconn.share.util.IBMDocs.ThumbnailConstants;
var ViewerAPI = lconn.share.util.IBMDocs.ViewerAPI;
var ViewerRoutes = lconn.share.util.IBMDocs.ViewerRoutes;

dojo.declare("lconn.share.action.impl.FilePreviewDialog", [lconn.share.action.AbstractDialog], {
   previewConfig: lconn.share.previewConfig,
   feedItems: null,
   nls:null,
   constructor: function(feedItems) {
      this.iw = null;
      this.scene = null;
      this.feedItems = feedItems;
   },
   videoConfig: {
      filePreviewBackgroundHeight: 400,
      filePreviewBackgroundWidth: 400,
      playArrowWidth: 75,
      playArrowHeight: 75
   },
   createDialog: function(item, opt, dialog) {
      var d = dojo.doc;
      var imgWidthSize = this.imgWidthSize =  this.previewConfig.previewViewWidth;
      var imgHeightSize = this.imgHeightSize = this.previewConfig.previewViewHeight;
      //  get the current position in the feed to get next/previous item later on
      var position;
      if(this.feedItems){
        position= this.getPositionInFeed(this.feedItems, item);
      }
      var border = dojo.create("div", {className: "lotusDialogBorder"});
         border.style.width = dojo.number.parse(imgWidthSize) + 175 + "px";
         var el = dojo.create("form", {className: this.getFormNodeClassName()}, border);
            this.appendHeader(el);
            var galleryLightBox = dojo.create("div", {className: "galleryLightBox "+this.getContentNodeClassName()}, el);
            var table = dojo.create("table", {className: "lotusTable qkrFixedWidth", cellPadding: 0, role: "presentation"}, galleryLightBox);
               var tbody = dojo.create("tbody", null, table);
                  var tr = dojo.create("tr", {className: "lotusFirst"}, tbody);
                     this.renderLightBoxNav(tr, true);             
                     var img = dojo.create("td", {className: "qkrGalleryPreview", role: "alert", id: "qkrGalleryPreview"}, tr);
                     img.style.width = imgWidthSize + "px";
                     img.style.height = imgHeightSize + "px";
                     img.style.textAlign = "center";
                     img.style.verticalAlign = "middle";
                     this.renderLightBoxNav(tr);
                     tr = dojo.create("tr", {className: "lotusFirst"}, tbody);
                     dojo.create("td", {}, tr);
                     this.desc = dojo.create("td", {}, tr);
                     dojo.create("td", {}, tr);
                     this.renderMediaPreview(img,item);
      dialog.setContent(border);
      // make items available for update event
      dialog.file = item;
      dialog.img = img;
      dialog.desc = this.desc;
      dialog.position = position;
      dialog.fixedOffsetHeight = 100;
      if(position!=null){
         dialog.itemsLength = this.feedItems.length;
         if(position == 0) this.updateLightBoxNav(true, true);
          if(position == this.feedItems.length-1) this.updateLightBoxNav(true, false); 
      }else{
        this.updateLightBoxNav(true, true);
        this.updateLightBoxNav(true, false); 
      }
      dojo.connect(galleryLightBox, "onkeypress", this, "keyEvent");      
   },
   _renderFileLink: function(descDiv, item, scene) {
      var d = document;
      var fileLinkId = this.fileLinkId = dijit.getUniqueId("share_action_fileLink");
      var adoc = dojo.create("a", {id: fileLinkId, className: "lotusAction", title: this.nls.DETAILS_TITLE, href: "javascript:;"}, descDiv);
         adoc.setAttribute("role", "button");
         adoc.appendChild(d.createTextNode(this.nls.DETAILS));
         var a11y = dojo.create("span", {className: "lotusAccess"}, adoc);
            a11y.style.width = "200px"; //to prevent outline from stretching beyond dialog
            a11y.appendChild(d.createTextNode(this.nls.DETAILS_A11Y));
      dojo.connect(adoc, "onclick",  dojo.hitch(this, this.showDetails, item));     
   },
   showDetails: function(doc, e) {
      if(e)
         dojo.stopEvent(e);
      if(this.showDetailsExternalAction && dojo.isFunction(this.showDetailsExternalAction)) {
         this.showDetailsExternalAction(this, doc, e);
      } else {
         var url = this.getUrlForPersonalFileInCommunity(doc);
         window.location=url;
         this.cancelDialog();
      }
      
   },
   getUrlForPersonalFileInCommunity: function(file, opt) {
      var routes = this.app.routes;
      var fileId = file.getId();
      
      var url = file.getUrlAlternate ? file.getUrlAlternate() : null;
      if (file.isLibraryContext()) {
         url = url || file.getUrlVia ? file.getUrlVia() : null;
      }
      if (routes) {
         url = url || routes.getFileSummaryUrl(null, fileId, {section: (opt) ? opt.section : null});
         if (this.app.restrictUserInComm && this.app.isCommunityScene && file.getLibraryType() != "communityFiles")
            url = routes.getFileSummaryUrl(null, fileId, {section: (opt) ? opt.section : null});
      }
      return url;
       
   },
   keyEvent: function(e) {
      switch(e.charOrCode){
         case dojo.keys.LEFT_ARROW:
            if(e.target.className != "HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16 otherHTML5Player24-collapse-hover-16" +
               "" && e.target.className != "HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16 otherHTML5Player24-mute-hover-16" +
               "" && e.target.className != "HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16 otherHTML5Player24-pause-hover-16" +
               "" && e.target.className != "HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16 otherHTML5Player24-play-hover-16" +
               "" && e.target.className != "HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16 otherHTML5Player24-volume-hover-16" +
               "" && e.target.className != "HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16 otherHTML5Player24-fullscreen-hover-16" +
               "" && e.target.className != "HTML5OnFocus" ){
                  this.updateImage(true);
            };
            break;
         case dojo.keys.RIGHT_ARROW:
            if(e.target.className != "HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16 otherHTML5Player24-collapse-hover-16" +
               "" && e.target.className != "HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16 otherHTML5Player24-mute-hover-16" +
               "" && e.target.className != "HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16 otherHTML5Player24-pause-hover-16" +
               "" && e.target.className != "HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16 otherHTML5Player24-play-hover-16" +
               "" && e.target.className != "HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16 otherHTML5Player24-volume-hover-16" +
               "" && e.target.className != "HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16 otherHTML5Player24-fullscreen-hover-16" +
               "" && e.target.className != "HTML5OnFocus" ){
                  this.updateImage(false);
            };
            break;
      }
   },   
   updateImage: function(isPrev) {
      var count = isPrev ? -1 : 1;
      if(this.dialog.position == 1 && count == -1) {this.updateLightBoxNav(true, true); this.focusOther = true;};
      if(this.dialog.position == 0 && count == 1) this.updateLightBoxNav(false, true);
      if(this.dialog.itemsLength-2 == this.dialog.position && count == 1) {this.updateLightBoxNav(true, false); this.focusOther = true;};
      if(this.dialog.itemsLength-1 == this.dialog.position && count == -1) this.updateLightBoxNav(false, false); 
      if(!(this.dialog.position == 0 && count == -1) && !(this.dialog.itemsLength-1 == this.dialog.position && count == 1)) {
         // render new image and description  after update
         var nextPrev = this.dialog.position+count;
         var item = this.feedItems[nextPrev];
         var imgDiv = this.dialog.img;
            imgDiv.className = "lotusFirst";
         this.renderMediaPreview(imgDiv,item);
         this.dialog.position = nextPrev;     
      }
      this.updateFocus(isPrev);
   },
   updateFocus: function(isPrev) {
      if(this.focusOther) {
         //if only one arrow exists, focus on the other
         var el = isPrev ? dojo.byId("galleryLightBoxNavnextLink") : dojo.byId("galleryLightBoxNavpreviousLink");
         if(el)
            el.focus();
         this.focusOther = false;
      }  
   },
   getPositionInFeed: function(feedItems, item) {
      dojo.forEach(feedItems, function(feedItem, i) {
         if((feedItem._position) == item._position) 
            position = i;
      });
      return position;
   },
   renderLightBoxNav: function(el, isPrev) {
      var altSymbol;
      var isLtr = dojo._isBodyLtr();
         isLtr ? (altSymbol = isPrev ? " \u25C0 " : " \u25B6 ") : (altSymbol = isPrev ? " \u25B6 " : " \u25C0 ");

      var action = (isLtr ? isPrev : !isPrev) ? "file-preview-back-arrow-lg" : "file-preview-next-arrow-lg";
      var actionHover = action + "-hover";

      var id = isPrev ? "galleryLightBoxNavprevious" : "galleryLightBoxNavnext";
      var title = isPrev ? this.nls.PREV_TITLE: this.nls.NEXT_TITLE;
      var position = isPrev ? "lotusLeft" : "lotusRight";

      var idLink = isPrev ? "galleryLightBoxNavpreviousLink" : "galleryLightBoxNavnextLink";
      
      var d = dojo.doc;
      var td = dojo.create("td", {id: id}, el);
         td.style.cursor = "pointer";
         td.style.verticalAlign = "middle";
         var a = dojo.create("a", {href: "javascript:;", title: title, id: idLink}, td);
             a.setAttribute("role", "button");
            dojo.addClass(a, position);
            var img = dojo.create("img", {src: dijit._Widget.prototype._blankGif, alt: "", className: "qkrHideA11yImg"}, a);
               img.setAttribute("aria-hidden", "true");
               img.setAttribute("role", "presentation");
               dojo.addClass(img, action);
               dojo.addClass(img, "file-preview");
         dojo.connect(td, "onclick", dojo.hitch(this, this.updateImage, isPrev));
         dojo.connect(td,"onmouseover", dojo.hitch(this, function(img, action, actionHover){
            dojo.removeClass(img, action);
            dojo.addClass(img, actionHover);
         },img, action, actionHover) );
         dojo.connect(td,"onmouseout", dojo.hitch(this, function(img, action, actionHover){
            dojo.removeClass(img, actionHover);
            dojo.addClass(img, action);
         },img, action, actionHover));
            var altSpan = dojo.create("span", {className: "lotusAltText"}, a);
               altSpan.appendChild(d.createTextNode(altSymbol));
   },
   updateLightBoxNav: function(isHidden, isPrev) {
      var action = isHidden ? "hidden" : "visible";
      var id = isPrev ? "galleryLightBoxNavprevious" : "galleryLightBoxNavnext";
      dojo.byId(id).style.visibility = action;
   },
   isVideo: function (item) {
      var ext = item.getExtension();
      var videoExts = this.previewConfig.validVideoExts;
      var arrayExts = videoExts.split(",");
      var videoIndex = dojo.indexOf(arrayExts, ext);
      return (videoIndex != -1) ? true : false;
   },
   isImg: function (item) {
      var ext = item.getExtension();
      var photoExts = this.previewConfig.validPhotoExts;
      var arrayExts = photoExts.split(",");
      var photoIndex = dojo.indexOf(arrayExts, ext);
      return (photoIndex != -1) ? true : false;
   },
   
   isHTML5Ready: function (name) {
      var isVideoFile = false;
      var regex = new RegExp((".mp4$"), "i");
      if (regex.test(name)) {
         isVideoFile = true;
         dojo.byId("qkrGalleryPreview").removeAttribute("role");
      }
      return isVideoFile;
         
   },
   
    playVideo: function (el, item) {
       dojo.empty (el);
       el.style.height = "";
       var prevId = dojo.byId("galleryLightBoxNavprevious").style.visibility == "hidden" ? this.closeId : "galleryLightBoxNavpreviousLink";
       var nextId = dojo.byId("galleryLightBoxNavnext").style.visibility == "hidden" ? this.fileLinkId : "galleryLightBoxNavnextLink";
       var videoUrl = item.getUrlDownload();
       var videoName = item.getName();
       
       if((dojo.isFF >=21 || dojo.isChrome || dojo.isIE >= 9) && this.isHTML5Ready(videoName)){
          var videoPlayerClass = dojo.getObject("lconn.share.widget.HTML5VideoPlayer");
          var videoPlayer = new videoPlayerClass();
          videoPlayer.playVideo(el, videoUrl, null, this.imgWidthSize, this.imgHeightSize, prevId, nextId);
       } else {//use old video player   
          //adjusts for aspect ratio
          var videoPlayerClass = dojo.getObject("lconn.share.widget.FlashVideoPlayer");
          var videoPlayer = new videoPlayerClass();
          videoPlayer.playVideo(el, item, this.imgWidthSize, this.imgHeightSize, prevId, nextId);
       }
       
    },
   renderMediaPreview: function(el, item) {
      dojo.empty(el);
      var imgParent = el;
      var isVideo = false;
      var descr = item.getDescription();
      if(!descr)
           descr = this.nls.NODESCRIPFILE;
      var optimalImgType = "thumbnailLarge";
      var name = item.getName();
      if (this.isVideo(item) && !this.disableVideoPreview) {
         el = dojo.create("div", null, el);
         el.title = dojo.string.substitute(this.nls.PLAY_VIDEO_TOOLTIP, [lconn.core.util.text.trimToLength(name,24)]);
         el.style.position = "relative";
         el.style.height = this.imgHeightSize + "px";
         el.style.width = this.imgWidthSize + "px";
         var link = dojo.create("a", { href: "javascript:;", title: "" }, el);
             dojo.connect(link, "onclick", null, dojo.hitch (this, this.playVideo, el,item));
         imgParent = link;
         isVideo = true;
      }
      var isA11y = dojo.hasClass(dojo.doc.getElementsByTagName("body")[0], "dijit_a11y");
      var imgPrev = dojo.create("img", {title: name, className: "lotusLTR", style:"border:1px solid #ccc"}, imgParent);
         dojo.connect(imgPrev,"onerror",dojo.hitch(this,this.pendingIcon,imgParent,item));
      if (!isVideo) {
         var isRendition = false;
         isRendition = this.previewThumbnail(item, imgPrev, optimalImgType, this.imgWidthSize, this.imgHeightSize);
         if(!isRendition) {
            this.pendingIcon(imgParent,item);
         }
      }
      else {
         var thumbnail = false;
         imgPrev.setAttribute("aria-label", dojo.string.substitute(this.nls.A11Y, {description: descr}));
         dojo.addClass(imgPrev, "previewThumbnail");
         if(isA11y) {
            dojo.style(imgPrev, "left", "auto");
            dojo.style(imgPrev, "bottom", "auto"); 
           }
         if (isVideo && item.getUrlThumbnail()) {
            this.previewThumbnail(item, imgPrev, optimalImgType, this.imgWidthSize, this.imgHeightSize);
            thumbnail = true;
              this.createVideoRenditionOverlay(this.imgHeightSize, this.imgWidthSize, imgParent, thumbnail);
         }else {
              this.previewNoThumbnail(this.imgWidthSize,this.imgHeightSize,imgParent,imgPrev,item.getExtension());
              this.createVideoRenditionOverlay(this.imgHeightSize, this.imgWidthSize, imgParent, thumbnail);
         }
      }
      this.renderDesc(item);
   },
   previewThumbnail: function(item, img, type, width, height) {
      if(this.disableThumbnail) {
         return false;
      }

      var sizeFormat = lconn.share.action.impl.FilePreviewDialog.DEFAULT_THUMBNAIL_SIZE;
      var batchRequestSent = false;

      var url = item.getUrlThumbnail();
      if (url) {
         url = url.replace("mediumview", "largeview") + "&etag=" ;
         if (this.isVideo(item)) {
          url = url + new Date(item.getSystemLastModified()).getTime();
         }
         else {
          url = url + new Date(item.getUpdated()).getTime();
         }
      } else {
         if(ViewerAPI.canSendThumbnailBatchRequest(item)) {
            var imgParent = img.parentNode;
            ViewerAPI.sendThumbnailBatchRequest(item, sizeFormat, dojo.hitch(this, function(items, sizeFormat, batchThumbnailData) {
               var uri = this._getSingleUriFromBatchThumbnailData(items, sizeFormat, batchThumbnailData);
               this.setThumbnailData(img, width, height, uri);
               this.reAttachImage(imgParent, img);
            }));

            batchRequestSent = true;
         }

         // If the batch request doesn't return any data, the single request should be consistent and not have any as well.
         if(!batchRequestSent && ViewerRoutes.canBuildViewerServiceURL()) {
            url = item.getThumbnailUrl(sizeFormat);
         }
      }
      if(url) {
         this.setThumbnailData(img, width, height, url);
         return true;
      }
      return false;
   },
   _getSingleUriFromBatchThumbnailData: function(items, sizeFormat, batchThumbnailData) {
      if(!items) {
         return;
      }
      var item = items[0];
      var uri = item.getThumbnailData(sizeFormat);
      
      return uri;
   },
   setThumbnailData: function(img, width, height, url) {
      img.src = url;
      if(!dojo.hasClass(dojo.doc.body, "lotusImagesOff")) {
         if(width)
            img.style.maxWidth = width + "px";
         if(height)
            img.style.maxHeight = height + "px";
      }
   },
   reAttachImage: function(imgParent, img) {
      dojo.empty(imgParent);
      dojo.place(img, imgParent);
   },
    previewNoThumbnail: function(imgWidth,imgHeight,el,img,type) {
       el.style.position = "absolute";
       el.style.top = ((imgWidth/2) - (this.videoConfig.filePreviewBackgroundWidth/2)) + "px";
       el.style.right = ((imgHeight/2) - (this.videoConfig.filePreviewBackgroundHeight/2)) + "px";
       el.style.textAlign = "center";
       el.style.verticalAlign = "middle";
       el.style.display = "block";
       el.style.backgroundColor = "rgb(0, 0, 0)";
       el.className ="file-preview-background";
       el.setAttribute("role","button");
       img.src = dijit._Widget.prototype._blankGif;
//       img.className="lconn-ftype256 lconn-ftype256-middle";
//       img.alt="";
    },
   pendingIcon: function(el,item){
      dojo.empty(el);
      var name = item.getName();
      var imgParent = dojo.create("div",{className: "file-preview-background"},el);
         var imgDiv = dojo.create("div",{title:name,className: "file-preview-ics-icon"},imgParent);
         var img = dojo.create("img", {title: name}, imgDiv);
         var iconClassName = dojo.isFunction(this.getFileIconClassName) ?
               this.getFileIconClassName(item, 64) :
               lconn.core.utilities.getFileIconClassName('.'+item.getExtension(), 64);
         dojo.addClass(img, iconClassName);
         var viewObject = new Object();
         viewObject = lconn.share.scenehelper.customizeViewObject(item, viewObject, 64);
         if(viewObject.fileTypeIconPath) {
            dojo.style(img, "backgroundImage", "url(" + dijit._Widget.prototype._blankGif + ")");
            img.src = viewObject.fileTypeIconPath;
         } else 
            img.src =dijit._Widget.prototype._blankGif;
         var iconText = dojo.create("span",{title: "",className: "file-preview-icon-span"},imgParent);
            iconText.innerHTML=this.nls.FILEVIEW_NO_FOUND;
            iconText.setAttribute("aria-label",this.nls.FILEVIEW_NO_FOUND);
            iconText.setAttribute("tabindex",0);
   },
   renderDesc: function (item) {  
      dojo.empty(this.desc);
      var d = dojo.doc;
      var div = dojo.create("div", {id: "galleryLightDesc", className: "lotusClear"}, this.desc);
         div.style.paddingTop = "15px";
         div.style.paddingLeft = "5px";
         div.style.wordBreak = "break-all";
         var titleDiv = dojo.create("div", null, div);
            //Add title
            var h4 = dojo.create("h4", null, titleDiv);
               h4.style.display = "inline";
               h4.dir = "ltr";
               h4.setAttribute("aria-label",item.getName());
               h4.setAttribute("tabindex",0);
               this.breakString(item.getName(), d, h4);
         var contnr = dojo.create("div", null, div);
            contnr.setAttribute("role","list");
            // add the author and date
            this.renderAuthorAndDate(this.app, item, d, contnr);
      if(this.feedItems && !this.hideFileDetailsLink)
         this._renderFileLink(div, item, this.scene);
   },
   renderAuthorAndDate: function(app,item, d, el){
       var isChanged = (item.getUpdated().getTime() != item.getPublished().getTime()); 
       var modifier = isChanged? item.getModifier() : item.getAuthor();
       var cons = app.nls.DOCUMENTCONTENT;
       var dateStrings = isChanged ? cons.LABEL_UPDATED_OTHER : cons.LABEL_ADDED_OTHER;
       var df = new lconn.share.util.DateFormat(item.getUpdated());
       
       dojo.mixin(this, dojo.i18n.getLocalization("lconn.share","FileThumbnail"));
       var nlsFiles = dojo.i18n.getLocalization("lconn.files","ui");
       var nlsProfileDateFormatter = {
             nls_profile: this.ft_backAuthor,
             nls_dateFormatFileCreated: nlsFiles.DOCUMENTCONTENT.LABEL_ADDED_OTHER,
             nls_dateFormatFileModified: nlsFiles.DOCUMENTCONTENT.LABEL_UPDATED_OTHER
       };
       
       var fileDateFormatter = new lconn.share.widget.FileDateFormatter(
          {isUpdated:isChanged,date:item.getUpdated().toJSON(),profileName:item.getModifier(),showBizCard:true,domNode:el,i18n:nlsProfileDateFormatter});
       
       el.title = df.format(dateStrings.FULL);
       if(el.children[0]) {
          var a = el.children[0];
          this.generateUserLink(this.app, modifier, a);
       }
       return el;
    },
   getOptionAuthor: function (item) {
      var createTime = item.getPublished();
      var updateTime = item.getUpdated();
      var isUpdated = (dojo.date.difference(createTime,updateTime, "second") != 0);
      if(isUpdated){
         return item.getModifier();
      }
      return item.getAuthor();
   },
   getDateInfo: function (item) {
      var published = item.getPublished();
      var updated = item.getUpdated();
      var isUpdated = (dojo.date.difference(published,updated, "second") != 0);
      var df = new lconn.share.util.DateFormat(published);
      var format = df.MMMM() + " " + df.dd() + ", " + df.YYYY();
      var d = document;
      var dateInfo = d.createElement("SPAN");
      if (updated) {
         dateInfo.appendChild(d.createTextNode(format ? "created "+format : "date unavailable"));
      }
      else {
         dateInfo.appendChild(d.createTextNode(format ? "updated "+format : "date unavailable"));
      }
      return dateInfo;
   },
   createVideoRenditionOverlay: function(height, width, imgParent, thumbnail) {
      var overlay = dojo.create("img", {className: "previewLgPlayIcon otherHTML5Player24 otherHTML5Player24-play-overlay-lg"}, imgParent);
      var span = dojo.create("span",{className:"lotusAltText",style:"font-size:78px;float:right"},imgParent);
      span.style.lineHeight = ((height) - (this.videoConfig.playArrowHeight / 2)) + "px";
      span.style.paddingRight = ((width / 2) - (this.videoConfig.playArrowWidth / 2)) + "px";
      span.innerHTML = "&#9654";
      if(thumbnail){
         overlay.style.top = ((height / 2) - (this.videoConfig.playArrowHeight / 2)) + "px";
         overlay.style.right = ((width / 2) - (this.videoConfig.playArrowWidth / 2)) + "px";
      } else {
         dojo.addClass(overlay, "noThumbnailPlayIcon");
      }  
      overlay.alt = "";
      overlay.src =dijit._Widget.prototype._blankGif;
      overlay.setAttribute("aria-hidden", true);
      overlay.setAttribute("role", "button");
      overlay.style.position = "absolute";
   },
   breakString: function(/* String */ s, /* DOMDocument */ d, /* Parent element */ el, breakLength, replaceBr) {
      if (!s)
         return;
      breakLength = breakLength || 10;
      var text = function (el, s) {         
         if (replaceBr) {
            var br = /\n/g;
            if (br.test(s)) {
               el.innerHTML += quickr.lw.util.html.newLineToBR(s);
            }
            else
               el.appendChild(d.createTextNode(s));
         }
         else {
            el.appendChild(d.createTextNode(s));
         }
      }
      var b = new RegExp("[^\\s]{"+(breakLength+1)+"}", "g");
      var r;
      var start=0,end;
      if (dojo.isIE || dojo.isSafari || dojo.isChrome)
         while (r = b.exec(s)) {
            end = --b.lastIndex;   
            // If the terminating character is a high surrogate, increment the end to grab the low surrogate
            var code = s.charCodeAt(end-1);
            if (code >= 55296 && code < 56192)
               end++;     
            text(el, s.substring(start, end));
            el.appendChild(d.createElement("wbr"));
            start = end;
         }
      else
         while (r = b.exec(s)) {
            end = --b.lastIndex;
            // If the terminating character is a high surrogate, increment the end to grab the low surrogate
            var code = s.charCodeAt(end-1);
            if (code >= 55296 && code < 56192)
               end++; 
            text(el, s.substring(start, end)+"\u200B");
            start = end;
         }
      text(el, s.substring(end));
   },
   generateUserLink: function(app, user, a) {
      a.title = dojo.isIE ? "" : " ";
      if (dojo.getObject("lconn.core.config.services.profiles")) {
         var person = {userid: user.id, name: user.name, state: user.userState, email: user.email};
         com.ibm.lconn.layout.people.createLink(person, null, a);
         //Remove the text node appended by createLink
         var children = a.childNodes;
         for(var i=children.length-1; i>=0; i--){
            var child = children[i];
            if(child.nodeType == 3 && child.nodeValue == user.name){
               a.removeChild(child);
               break;
            }
         }
      }else {
            dojo.addClass(a, "lotusPerson");
            if (user && window['SemTagSvc']) {
               dojo.addClass(a, "vcard");
               dojo.addClass(a, "fn");
               if (lconn.share.util.text.trim(user.email).length > 0) {
                  var span = document.createElement("span");
                     span.className = "email";
                     span.style.display = "none";
                     span.appendChild(document.createTextNode(user.email));
                  a.appendChild(span);
               }
               var span = document.createElement("span");
                  span.className = "x-lconn-userid";
                  span.style.display = "none";
                  span.appendChild(document.createTextNode(user.id));
               a.appendChild(span);
            }
      }
      if (dojo.getObject("SemTagSvc.onTagChanged"))
         SemTagSvc.onTagChanged(a, true);
   }
});

lconn.share.action.impl.FilePreviewDialog.DEFAULT_THUMBNAIL_SIZE = ThumbnailConstants.thumbnailSizes.large;

})();

(function () {
   dojo.addOnLoad(function () {
      lconn.share.action.impl.fileViewer.addFileViewer();
   });
})();
