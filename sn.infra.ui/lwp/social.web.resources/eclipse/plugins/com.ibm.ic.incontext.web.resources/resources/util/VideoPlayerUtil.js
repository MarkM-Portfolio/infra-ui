/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.           */

define([
	"dojo",
	"dojo/query",
	"dojo/i18n!ic-incontext/nls/socialInContextCoreStrings",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/has",
	"dojo/aspect",
	"dojo/dom-style",
	"dojo/on",
	"dojo/topic",
	"dijit/focus",
	"ic-as/constants/events",
	"net/jazz/ajax/xdloader"
], function (dojo, query, i18nsocialInContextCoreStrings, domAttr, domConstruct, lang, declare, has, aspect, domStyle, on, topic, focusUtils, events, xdloader) {

	/**
	 * Utility helper playing video files
	 *
	 * @author johann ott
	 */
	
	var VideoPlayerUtil = declare("com.ibm.social.incontext.util.VideoPlayerUtil", null,
	
	{
	
	    strings : i18nsocialInContextCoreStrings,
	
	    html5VideoPlaying: events.HTML5VIDEOPLAYING,
	
	    isHTML5Ready: function (name) {
	        var isVideoFile = false;
	        var regex = new RegExp((".mp4$"), "i");
	        if (regex.test(name)) {
	            isVideoFile = true;
	        }
	        return isVideoFile;
	
	    },
	
	    playVideo : function(videoName, videoUrl, videoContainer, imgWidthSize, imgHeightSize, maxHeight, onSizeChange, downloadFailed, prevId, nextId, context){
	
	        var item = {
	            getUrlDownload : lang.hitch(this, function(){return videoUrl}),
	            getName : lang.hitch(this, function(){return videoName})
	        };
	
	        var allowFullScreen = true;
	        if (onSizeChange){
	            allowFullScreen = false;
	        }
	
	
	            if((has("ff") >=21 || has("chrome") || has("ie") >= 9) && this.isHTML5Ready(videoName)){
	            xdloader.load_async("lconn.share.widget.HTML5VideoPlayer", lang.hitch(this, function(){
	                var videoPlayerClass = lang.getObject("lconn.share.widget.HTML5VideoPlayer");
	                var videoPlayer = new videoPlayerClass();
	                videoPlayer.playVideo(videoContainer, videoUrl, null, imgWidthSize, imgHeightSize, prevId, nextId, allowFullScreen);
	                query("video", videoContainer)
	                    .forEach(
	                        lang.hitch(this, function(node){
	                            aspect.after(node, "playing", lang.hitch(this, function(){
	                                if(onSizeChange){
	                                    onSizeChange();
	                                }
	                               
	                            }), true);
	                            aspect.after(node, "loadedmetadata", lang.hitch(this, function(){
	                            	//run after html5videoplayer has adjusted heights then update for responsive design styles
	                            	setTimeout(lang.hitch(this, function(){
	                            		domAttr.remove(node, "width");
	                            		domAttr.remove(node, "height");
	                            		domStyle.set(node, "width", "100%");
	                            		domStyle.set(node, "height", "100%");
	                            		domStyle.set(videoContainer, "height", "auto");
	                            		domStyle.set(videoPlayer.handles.videoWrapper, {
	                            			"maxWidth": "100%",
	                            			"height":"100%",
	                            			"width": "700px",
	                            			"paddingBottom": "56%"
	                            		});
	                          
	                            		}), 10);                               
	                            }), true);
	                            
	                            focusUtils.focus(node);
	
	                            query("source", videoContainer)
	                                .forEach(
	                                    lang.hitch(this, function(node){
	                                        on(node, "error", lang.hitch(this, function(){
	                                            downloadFailed(videoContainer, this.strings.VIDEO_PREVIEW.HTML5_VIDEO_ERROR);
	                                        }));
	                                    })
	                                );
	                        })
	                );
	                query("*", videoContainer)
	                    .forEach(
	                        lang.hitch(this, function(node){
	                            domAttr.set(node, "data-notOpenEE", "true");
	                        })
	                );
	                domAttr.set(videoContainer, "style", "height:"+maxHeight+"px; overflow:hidden;");
	
	                topic.publish(this.html5VideoPlaying);
	
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
	            xdloader.load_async("lconn.share.widget.FlashVideoPlayer", lang.hitch(this, function(){
	                var videoPlayerClass = lang.getObject("lconn.share.widget.FlashVideoPlayer");
	                var videoPlayer = new videoPlayerClass();
	                videoPlayer.playVideo(videoContainer, item, imgWidthSize, imgHeightSize, null, null);
	                query("embed", videoContainer)
	                    .forEach(
	                        lang.hitch(this, function(node){
	                            on(node, "load", lang.hitch(this, function(){
	                                if (onSizeChange){
	                                    onSizeChange();
	                                }
	                            }));
	                            on(node, "error", lang.hitch(this, function(){
	                                downloadFailed(videoContainer, this.strings.VIDEO_PREVIEW.FLASH_VIDEO_ERROR);
	                            }));
	                            node.height=maxHeight;
	                            node.width="100%";
	                            domConstruct.create("param", {
	                                name : "wmode",
	                                value : "opaque"
	                            }, node);
	                            domAttr.set(node, "data-notOpenEE", "true");
	                            focusUtils.focus(node);
	                        })
	                    );
	                query("object", videoContainer)
	                    .forEach(
	                        lang.hitch(this, function(node){
	                            on(node, "load", lang.hitch(this, function(){
	                                if (onSizeChange){
	                                    onSizeChange();
	                                }
	                            }));
	                            on(node, "error", lang.hitch(this, function(){
	                            	downloadFailed(videoContainer, this.strings.VIDEO_PREVIEW.FLASH_VIDEO_ERROR);
	                            }));
	                            node.height=maxHeight;
	                            node.width="100%";
	                            domConstruct.create("param", {
	                                name : "wmode",
	                                value : "opaque"
	                            }, node);
	                            domAttr.set(node, "data-notOpenEE", "true");
	                            focusUtils.focus(node);
	                        })
	                    );
	            }));
	        }
	
	    }
	});
	
	return VideoPlayerUtil;
});
