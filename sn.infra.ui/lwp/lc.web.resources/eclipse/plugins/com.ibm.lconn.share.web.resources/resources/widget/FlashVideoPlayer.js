/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.FlashVideoPlayer");
dojo.require("lconn.share.util.MediaUri");
if(dojo.getObject("quickr.lw.widget.VideoPlayer")){
   dojo.require("quickr.lw.widget.VideoPlayer");
}
  
/**
 * Flash-based video player
 */
dojo.declare("lconn.share.widget.FlashVideoPlayer", null, {   
   playVideo: function (node, item, videoWidth, videoHeight, prevId, nextId) {
     if (!prevId) prevId = "";
     if (!nextId) nextId = "";

     var url = item.getUrlDownload();
     var src = require.toUrl("lconn.share") + "/sn_media_video_player/SnMediaVideoPlayer.swf";
     var aspectRatio = 1.5;
     var height = videoWidth / aspectRatio;
     var width = videoWidth;
     var nls_supported = ["pt-br", "zh-tw"]; //used to handle cases of more specific languages that we do support
     var regExp = /([^\-]*\-[^\-]*)\-/;
     var locale = regExp.exec(dojo.locale.toLowerCase()[1]); //if more than one dash exists, strip down only to first dash
     if(!locale) locale = dojo.locale;
     var nls = dojo.locale.split("-")[0];
     if(dojo.indexOf(nls_supported, locale) != -1) {
        if(locale == "pt-br")
           nls = "pt_BR";
        else if(locale == "zh-tw")
           nls = "zh_TW";
     }
     if(nls == "he") nls = "iw"; //we use iw for our Hebrew strings file
     var elementId = dijit.getUniqueId("qkr_lw_VideoPlayer");
     
     var flashPath = lconn.share.util.MediaUri.rewriteUri(src, 
          { videoSource: url, 
            nls: nls, 
            height: height, 
            width: width, 
            ie: dojo.isIE,
            prevId: prevId,
            nextId: nextId,
            elementId: elementId });
     var scheme = (window.location.protocol || "http").replace(':','');
     var isSecure = (scheme === "https");
     var codebaseUrl = (isSecure ? "https" : "http") + "://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0";
     if (dojo.isIE) {        
        node.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' +
                                 'codebase="' + codebaseUrl + '" ' +
                                 'width="' + width + '" height="' + height + '" id="' + elementId + '">' + 
                             '<param name="movie" value="' + flashPath + '">' +
                             '<param name="allowFullScreen" value="true">' +
                             '<param name="tabIndex" value="0">' +
                         '</object>';
                                       
     }
     else {
        node.innerHTML = '<embed' + ' width="' + width + '" height="' + height + '"' + 'tabindex="0" allowfullscreen="true" pluginspage="http://www.adobe.com/go/getflashplayer" ' +
                                 'allownetworking="all" allowscriptaccess="sameDomain" swliveconnect="true" wmode="Transparent"' +
                                 'id="' + elementId + '" name="' + elementId + '" ' +
                                 'src="' + flashPath + '" type="application/x-shockwave-flash">';
     }
          
     if (!dojo.isIE) {
        dojo.connect(dojo.byId(elementId), "onfocus", function () {
           var obj = dojo.byId(elementId);
           if (obj) {
              obj.focusReceived();
           }
        });
     }
   }   
});


lconn.share.widget.FlashVideoPlayer.alertVideoMessage = function(elementId, msg) {
	 var element = dojo.byId(elementId), div;
	 if(element) {
	    div = dojo.create("div", {className: "lotusAccess qkrVideoMsgAlert", role: "alert"}, element.parentNode);
	    div.appendChild(dojo.doc.createTextNode(msg));
	 }
};

lconn.share.widget.FlashVideoPlayer.moveFocus = function(elementId) {
	var el = dojo.byId(elementId);
	if(el) {
		setTimeout(dojo.hitch(this, function(el) {el.focus();}, el), 0);
	}
};
