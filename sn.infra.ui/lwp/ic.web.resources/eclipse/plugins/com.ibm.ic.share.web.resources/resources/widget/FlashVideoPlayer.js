/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo",
   "dojo/_base/array",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/window",
   "dojo/dom",
   "dojo/dom-construct",
   "dojo/has",
   "dojo/on",
   "ic-share/util/MediaUri"
], function (dojo, array, declare, lang, windowModule, dom, domConstruct, has, on, MediaUri) {

   /**
    * Flash-based video player
    */
   var FlashVideoPlayer = declare(null, {   
      playVideo: function (node, url, videoWidth, videoHeight, prevId, nextId) {
        if (!prevId) prevId = "";
        if (!nextId) nextId = "";
   
        //var url = item.getUrlDownload();
        var src = require.toUrl("ic-share") + "/sn_media_video_player/SnMediaVideoPlayer.swf";
        var aspectRatio = 1.5;
        var height = videoWidth / aspectRatio;
        var width = videoWidth;
        var nls_supported = ["pt-br", "zh-tw"]; //used to handle cases of more specific languages that we do support
        var regExp = /([^\-]*\-[^\-]*)\-/;
        var locale = regExp.exec(dojo.locale.toLowerCase()[1]); //if more than one dash exists, strip down only to first dash
        if(!locale) locale = dojo.locale;
        var nls = dojo.locale.split("-")[0];
        if(array.indexOf(nls_supported, locale) != -1) {
           if(locale == "pt-br")
              nls = "pt_BR";
           else if(locale == "zh-tw")
              nls = "zh_TW";
        }
        if(nls == "he") nls = "iw"; //we use iw for our Hebrew strings file
        var elementId = dijit.getUniqueId("qkr_lw_VideoPlayer");
        
        var flashPath = MediaUri.rewriteUri(src, 
             { videoSource: url, 
               nls: nls, 
               height: height, 
               width: width, 
               ie: has("ie"),
               prevId: prevId,
               nextId: nextId,
               elementId: elementId });
        var scheme = (window.location.protocol || "http").replace(':','');
        var isSecure = (scheme === "https");
        var codebaseUrl = (isSecure ? "https" : "http") + "://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0";
        if (has("ie")) {        
           node.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' +
                                    'codebase="' + codebaseUrl + '" ' +
                                    'width="' + width + '" height="' + height + '" id="' + elementId + '">' + 
                                '<param name="movie" value="' + flashPath + '">' +
                                '<param name="allowFullScreen" value="true">' +
                                '<param name="tabIndex" value="0">' +
                                '<param name="wmode" value="transparent">' +
                            '</object>';
                                          
        }
        else {
           node.innerHTML = '<embed' + ' width="' + width + '" height="' + height + '"' + 'tabindex="0" allowfullscreen="true" pluginspage="http://www.adobe.com/go/getflashplayer" ' +
                                    'allownetworking="all" allowscriptaccess="sameDomain" swliveconnect="true" wmode="Transparent"' +
                                    'id="' + elementId + '" name="' + elementId + '" ' +
                                    'src="' + flashPath + '" type="application/x-shockwave-flash">';
        }
             
        setTimeout(function() {
           if (!has("ie")) {
              on(dom.byId(elementId), "focus", function () {
                 var obj = dom.byId(elementId);
                 if (obj) {
                    obj.focusReceived();
                 }
              });
           }
        }, 100);
      }   
   });
   
   
   FlashVideoPlayer.alertVideoMessage = function(elementId, msg) {
       var element = dom.byId(elementId), div;
       if(element) {
          div = domConstruct.create("div", {className: "lotusAccess qkrVideoMsgAlert", role: "alert"}, element.parentNode);
          div.appendChild(windowModule.doc.createTextNode(msg));
       }
   };
   
   FlashVideoPlayer.moveFocus = function(elementId) {
      var el = dom.byId(elementId);
      if(el) {
         setTimeout(lang.hitch(this, function(el) {el.focus();}, el), 0);
      }
   };
   
   return FlashVideoPlayer;
});