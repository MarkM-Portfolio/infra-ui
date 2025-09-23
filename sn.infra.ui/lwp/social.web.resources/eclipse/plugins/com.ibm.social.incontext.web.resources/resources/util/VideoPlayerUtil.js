/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                 */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.util.VideoPlayerUtil");

dojo.require("com.ibm.social.as.constants.events");
dojo.require("net.jazz.ajax.xdloader");

dojo.requireLocalization("com.ibm.social.incontext", "socialInContextCoreStrings");

/**
 * Utility helper playing video files
 *
 * @author johann ott
 */

dojo.declare("com.ibm.social.incontext.util.VideoPlayerUtil", null,

{

    strings : dojo.i18n.getLocalization("com.ibm.social.incontext", "socialInContextCoreStrings"),

    html5VideoPlaying: com.ibm.social.as.constants.events.HTML5VIDEOPLAYING,

    isHTML5Ready: function (name) {
        var isVideoFile = false;
        var regex = new RegExp((".mp4$"), "i");
        if (regex.test(name)) {
            isVideoFile = true;
        }
        return isVideoFile;

    },

    /**
     * Checks cross-browser flash detection.
     * This snippet is the auto generated code from the Closure compiler for:
     * 
     * // ==ClosureCompiler==
	 * // @compilation_level ADVANCED_OPTIMIZATIONS
     * // @output_file_name default.js
	 * // @formatting pretty_print
	 * // @use_closure_library true
	 * // ==/ClosureCompiler==
	 *
	 * goog.require('goog.userAgent.flash');
	 * 
	 * return {hasFlash: goog.userAgent.flash.HAS_FLASH, flashVersion: goog.userAgent.flash.VERSION};
	 * 
	 * 
	 * @private
	 * @returns {Object} -> {boolean} hasFlash - whether flash is detected; {string} flashVersion - the flash version detected.
     */
    _getFlashInfo : function() {
        
    	var a = !1,
        b = "";

    	function c(d) {
    		d = d.match(/[\d]+/g);
    		d.length = 3;
    		return d.join(".")
    	}
    	if (navigator.plugins && navigator.plugins.length) {
    		var e = navigator.plugins["Shockwave Flash"];
    		e && (a = !0, e.description && (b = c(e.description)));
    		navigator.plugins["Shockwave Flash 2.0"] && (a = !0, b = "2.0.0.11")
    	} else {
    		if (navigator.mimeTypes && navigator.mimeTypes.length) {
    			var f = navigator.mimeTypes["application/x-shockwave-flash"];
    			(a = f && f.enabledPlugin) && (b = c(f.enabledPlugin.description))
    		} else {
    			try {
    				var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
                    	a = !0,
                    	b = c(g.GetVariable("$version"))
    			} catch (h) {
    				try {
    					g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), a = !0, b = "6.0.21"
    				} catch (i) {
    					try {
    						g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a = !0, b = c(g.GetVariable("$version"))
    					} catch (j) {}
    				}
    			}
    		}
    	}
    	
    	return {hasFlash: a, flashVersion: b};
    },
     
    playVideo : function(videoName, videoUrl, videoContainer, imgWidthSize, imgHeightSize, maxHeight, onSizeChange, downloadFailed, prevId, nextId, context){

        var item = {
            getUrlDownload : dojo.hitch(this, function(){return videoUrl}),
            getName : dojo.hitch(this, function(){return videoName})
        };

        var allowFullScreen = true;
        if (onSizeChange){
            allowFullScreen = false;
        }


            if((dojo.isFF >=21 || dojo.isChrome || dojo.isIE >= 9) && this.isHTML5Ready(videoName)){
            net.jazz.ajax.xdloader.load_async("lconn.share.widget.HTML5VideoPlayer", dojo.hitch(this, function(){
                var videoPlayerClass = dojo.getObject("lconn.share.widget.HTML5VideoPlayer");
                var videoPlayer = new videoPlayerClass();
                videoPlayer.playVideo(videoContainer, videoUrl, null, imgWidthSize, imgHeightSize, prevId, nextId, allowFullScreen);
                dojo.query("video", videoContainer)
                    .forEach(
                        dojo.hitch(this, function(node){
                            dojo.connect(node, "playing", dojo.hitch(this, function(){
                                if(onSizeChange){
                                    onSizeChange();
                                }
                               
                            }));
                            dojo.connect(node, "loadedmetadata", dojo.hitch(this, function(){
                            	//run after html5videoplayer has adjusted heights then update for responsive design styles
                            	setTimeout(dojo.hitch(this, function(){
                            		dojo.removeAttr(node, "width");
                            		dojo.removeAttr(node, "height");
                            		dojo.style(node, "width", "100%");
                            		dojo.style(node, "height", "100%");
                            		dojo.style(videoContainer, "height", "auto");
                            		dojo.style(videoPlayer.handles.videoWrapper, {
                            			"maxWidth": "100%",
                            			"height":"100%",
                            			"width": "700px",
                            			"paddingBottom": "56%"
                            		});
                          
                            		}), 10);                               
                            }));
                            
                            dijit.focus(node);

                            dojo.query("source", videoContainer)
                                .forEach(
                                    dojo.hitch(this, function(node){
                                        dojo.connect(node, "error", dojo.hitch(this, function(){
                                            downloadFailed(videoContainer, this.strings.VIDEO_PREVIEW.HTML5_VIDEO_ERROR);
                                        }));
                                    })
                                );
                        })
                );
                dojo.query("*", videoContainer)
                    .forEach(
                        dojo.hitch(this, function(node){
                            dojo.attr(node, "data-notOpenEE","true");
                        })
                );
                dojo.attr(videoContainer,"style","height:"+maxHeight+"px; overflow:hidden;");

                dojo.publish(this.html5VideoPlaying);

                if(context && context.onCloseDeferred && context.onCloseDeferred.fired === -1){
                    context.onCloseDeferred.addCallback(this , function(){
                        if (videoPlayer){
                            videoPlayer.destroy();
                        }
                    });
                }

            }));

        } else {//use old video player
            //adjusts for aspect ratio
        	
        	// detect cross-browser flash support
        	var hasFlash = this._getFlashInfo().hasFlash;
        	
        	// only apply flash player if there is actually flash support
        	if (hasFlash){
        		net.jazz.ajax.xdloader.load_async("lconn.share.widget.FlashVideoPlayer", dojo.hitch(this, function(){
                    var videoPlayerClass = dojo.getObject("lconn.share.widget.FlashVideoPlayer");
                    var videoPlayer = new videoPlayerClass();
                    videoPlayer.playVideo(videoContainer, item, imgWidthSize, imgHeightSize, null, null);
                    dojo.query("embed", videoContainer)
                        .forEach(
                            dojo.hitch(this, function(node){
                                dojo.connect(node, "onload", dojo.hitch(this, function(){
                                    if (onSizeChange){
                                        onSizeChange();
                                    }
                                }));
                                dojo.connect(node, "onerror", dojo.hitch(this, function(){
                                    downloadFailed(videoContainer, this.strings.VIDEO_PREVIEW.FLASH_VIDEO_ERROR);
                                }));
                                node.height=maxHeight;
                                node.width="100%";
                                dojo.create("param", {
                                    name : "wmode",
                                    value : "opaque"
                                }, node);
                                dojo.attr(node, "data-notOpenEE","true");
                                dijit.focus(node);
                            })
                        );
                    dojo.query("object", videoContainer)
                        .forEach(
                            dojo.hitch(this, function(node){
                                dojo.connect(node, "onload", dojo.hitch(this, function(){
                                    if (onSizeChange){
                                        onSizeChange();
                                    }
                                }));
                                dojo.connect(node, "onerror", dojo.hitch(this, function(){
                                	downloadFailed(videoContainer, this.strings.VIDEO_PREVIEW.FLASH_VIDEO_ERROR);
                                }));
                                node.height=maxHeight;
                                node.width="100%";
                                dojo.create("param", {
                                    name : "wmode",
                                    value : "opaque"
                                }, node);
                                dojo.attr(node, "data-notOpenEE","true");
                                dijit.focus(node);
                            })
                        );
                }));
        	} else {
        		// if no flash support, just show the 'no flash' error msg
        		downloadFailed(videoContainer, this.strings.VIDEO_PREVIEW.FLASH_VIDEO_ERROR);
        	}
        	
            
        }

    }
});
