/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

/*
 * This file demonstrates how to register an HTML5 video player for the Media Gallery UI. This file will
 * be evaluated after the core Dojo libraries have been loaded, so most dojo methods are 
 * available.  The Media Gallery application will not be completely started.
 */

dojo.provide("lconn.share.widget.HTML5VideoPlayer");

dojo.require("dijit._Widget");
dojo.require("dojo.NodeList-traverse");
dojo.requireLocalization("lconn.share.html5_video_player", "html5VideoPlayerStrings");

dojo.declare("lconn.share.widget.HTML5VideoPlayer", [dijit._Widget], {
	isA11y: dojo.hasClass(dojo.doc.getElementsByTagName("body")[0], "dijit_a11y"),
	nls: dojo.i18n.getLocalization("lconn.share.html5_video_player", "html5VideoPlayerStrings"),
	prevId: null,
	nextId: null,
	isMini: null,
	originalVideoHeight:0,
	originalVideoWidth:0,
	initVolume:0.67,
	lastVolumeValue: 0.67,
	volumeWidth: 28,
	focused: false,
	controlsTimedOut:null,
	timeOutHandle: null,
	isMuted: false,
	isPlaying: false,
	isFullScreen: false,
    allowFullScreen: true,
	constructor:function(){
		this.handles = {};
		this.volumeListeners = {};
		this.fullscreenListeners = {};
	},
	/*
	 * converts time to a minutes and seconds format as well as sizes controls to properly display dynamic time
	 */
	formatTime: function(time){
		var minutes = Math.floor(time / 60);
		var seconds = Math.floor(time - (minutes * 60));		
		var secondsFormat = seconds > 9 ? seconds: "0" + seconds; 
		var newWidth = 0;
		if(!dojo.isIE){//IE doesn't support HTML5 full screen API, therefore this button is removed
			newWidth += dojo.style(this.handles.fullScreen, "width") + dojo.style(this.handles.fullScreen, "marginRight") + dojo.style(this.handles.fullScreen, "marginLeft");
		}
		newWidth += dojo.style(this.handles.volumeBar, "width") + dojo.style(this.handles.volumeBar, "marginRight") + dojo.style(this.handles.volumeBar, "marginLeft");
		newWidth += dojo.style(this.handles.volume, "width") + dojo.style(this.handles.volume, "marginRight") + dojo.style(this.handles.volume, "marginLeft");
		newWidth += dojo.style(this.handles.durationTime, "width") + dojo.style(this.handles.durationTime, "marginRight") + dojo.style(this.handles.durationTime, "marginLeft");
		newWidth += dojo.style(this.handles.controlsLineBreak, "width") + dojo.style(this.handles.controlsLineBreak, "marginRight") + dojo.style(this.handles.controlsLineBreak, "marginLeft");
		newWidth += dojo.style(this.handles.currentTime, "width") + dojo.style(this.handles.currentTime, "marginRight") + dojo.style(this.handles.currentTime, "marginLeft");

		dojo.style(this.handles.rightColumn, "width", newWidth + 10 + "px");
		dojo.style(this.handles.centerColumn, "marginRight", newWidth + 20 + "px");//20px offset for margin.

		return minutes + ":" + secondsFormat;
	},
	/*
	 * format ariaTime
	 */
	ariaTimeFormat: function (sec) {
		var m = Math.floor(sec / 60) < 10 ? '' + Math.floor(sec / 60) : Math.floor(sec / 60);
		var s = Math.floor(sec - (m * 60)) < 10 ? '' + Math.floor(sec - (m * 60)) : Math.floor(sec - (m * 60));
		var formatedTime;

		var min = 'minutes';
		var sec = 'seconds';

		if(m==1) min = 'minute';
		if(s==1) sec = 'second';

		if (m!=0) {
			formatedTime = m + ' ' + min + ' ' + s + ' ' + sec;
		} else {
			formatedTime = s + ' ' + sec;
		};

		return formatedTime;
	},
	/*
	 * plays video file while hiding play button and displaying pause button
	 */
	play:function(){	
		dojo.style(this.handles.playButton, "display", "none");
		dojo.style(this.handles.pauseButton, "display", "block");

		if(this.handles.html5vid.currentTime == this.handles.html5vid.duration){
			this.handles.html5vid.currentTime = 0;
		}			

		if(this.handles.poster){//destroy the poster when video starts
			dojo.destroy(this.handles.poster);
			this.handles.poster = null;
		}

		this.handles.html5vid.play();			
		this.isPlaying = true;
	},
	/*
	 * pauses video file while hiding pause button and displaying play button
	 */
	pause: function(){
		dojo.style(this.handles.playButton, "display", "block");
		dojo.style(this.handles.pauseButton, "display", "none");
		this.handles.html5vid.pause();
		this.isPlaying = false;
	},
	/*
	 * mutes video file while hiding mute (handle is volume) button and displaying unmute (handle is mute) button
	 */
	mute: function(){
		var self = this;
		dojo.style(self.handles.volumeSlideKnob, "width", 0 + "px");
		self.lastVolumeValue = self.handles.html5vid.volume;
		self.handles.html5vid.volume = 0;
		dojo.style(self.handles.volume, "display", "none");
		dojo.style(self.handles.mute, "display", "block");
		this.isMuted = true;
	},
	/*
	 * unmutes video file while hiding unmute (handle is mute) button and displaying mute (handle is volume) button
	 */
	unmute: function(){
		var self = this;
		var newWidth = this.lastVolumeValue * this.volumeWidth;
		dojo.style(self.handles.volumeSlideKnob, "width", newWidth + "px");
		self.handles.html5vid.volume = self.lastVolumeValue;
		dojo.style(self.handles.mute, "display", "none");
		dojo.style(self.handles.volume, "display", "block");
		this.isMuted = false;
	},
	/*
	 * launches full screen mode while hiding the full screen button and displaying the collapse button
	 * and adjusts controls to fit full screen
	 */
	fullScreen: function(){
		if (dojo.isIE) {//IE doesn't support HTML5 full screen API, so this is disabled
			return;
		}
		if (this.handles.poster) {
			this.play();
		}
		dojo.style(this.handles.fullScreen, "display", "none");
		dojo.style(this.handles.collapse, "display", "block");

		if (this.isMini) {//loads new style sheet and icons if original player is the smaller version
			var popOut = window.parent.dojo.query("iframe")[0];//necessary for EE
			dojo.attr(popOut, "allowFullScreen", "true");

			var styleSheet = dojo.byId("HTML5Video-styles");
			styleSheet.setAttribute("href", require.toUrl("lconn.share") + "/html5_video_player/css/VideoStyles.css");

			dojo.addClass(this.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-16");
			dojo.addClass(this.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-16");
			dojo.addClass(this.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-16");
			dojo.addClass(this.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-16");
		}

		if (this.handles.videoWrapper.requestFullScreen) {//HTML5 full screen API calls
			this.handles.videoWrapper.requestFullScreen();
		} else if (this.handles.videoWrapper.webkitRequestFullScreen) {
			this.handles.videoWrapper.webkitRequestFullScreen(this.handles.videoWrapper.ALLOW_KEYBOARD_INPUT);
			dojo.style(this.handles.videoWrapper, {"position":"fixed", "width": screen.width + "px", "height": screen.height + "px"});
		} else if (this.handles.videoWrapper.mozRequestFullScreen) {
			this.handles.videoWrapper.mozRequestFullScreen();
		}
		dojo.style(this.handles.html5vid, {"width": screen.width + "px", "height": screen.height + "px"});
		dojo.style(this.handles.controlBar, "width", "100%");

		this.formatTime(this.handles.html5vid.currentTime);

		var barPercent = Math.floor((this.handles.html5vid.currentTime / this.handles.html5vid.duration) * dojo.style(this.handles.seekContainer, "width"));
		dojo.style(this.handles.seekBar, "width", barPercent + "px");
		var bufferTime = Math.floor((this.handles.html5vid.buffered.end(0) / this.handles.html5vid.duration) * dojo.style(this.handles.seekContainer, "width"));
		dojo.style(this.handles.bufferBar, "width", bufferTime + "px");
		if(this.isA11y ) {
			var barDiv = null;
			if(!dojo.byId("BarDiv")) {
				barDiv = dojo.create("div",{id:"BarDiv"},this.hadles.seekBar);
			}else {
				barDiv = dojo.byId("BarDiv");
			}
			dojo.empty("BarDiv");
			var bufferLenght = dojo.style(this.handles.seekContainer, "width");
			var LeftLenght = Math.floor(bufferLenght / 4.16);
			for(var i = 1;i<=LeftLenght;i++){
				var marginLeft = 4.16*i;
				dojo.create("div", {
					id : "bar"+i,
					className: "",
					style: {
						position:"absolute",
						marginLeft:marginLeft +"px",
						display : "none"
					},
					innerHTML: "|"
				}, barDiv);
			}
		};

		this.isFullScreen = true;
	},
	/*
	 * returns to original viewing size while hiding collapse button and displaying the full screen button
	 * and adjusts controls to fit original size
	 */
	collapse: function(){//IE doesn't support HTML5 full screen API, so this is disabled
		if (dojo.isIE) {
			return
		}
		dojo.style(this.handles.collapse, "display", "none");
		dojo.style(this.handles.fullScreen, "display", "block");

		if (this.isMini) {//loads new style sheet and icons if original view is small version
			var styleSheet = dojo.byId("HTML5Video-styles");
			styleSheet.setAttribute("href", require.toUrl("lconn.share") + "/html5_video_player/css/VideoEE.css");

			dojo.addClass(this.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-16");
			dojo.addClass(this.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-16");
			dojo.addClass(this.handles.volume, "otherHTML5Player24 otherHTML5Player24-volume-16");
			dojo.addClass(this.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-16");
		}

		if (document.cancelFullScreen) {//HTML5 full screen API calls
			document.cancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
			dojo.style(this.handles.videoWrapper, {"position":"relative", "width": this.originalVideoWidth + "px", "height": this.originalVideoHeight + "px"});
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
		dojo.style(this.handles.html5vid, {"width": this.originalVideoWidth + "px", "height": this.originalVideoHeight + "px"});
		dojo.style(this.handles.controlBar, "width", "100%");

		this.formatTime(this.handles.html5vid.currentTime);

		var barPercent = Math.floor((this.handles.html5vid.currentTime / this.handles.html5vid.duration) * dojo.style(this.handles.seekContainer, "width"));
		dojo.style(this.handles.seekBar, "width", barPercent + "px");
		var bufferTime = Math.floor((this.handles.html5vid.buffered.end(0) / this.handles.html5vid.duration) * dojo.style(this.handles.seekContainer, "width"));
		dojo.style(this.handles.bufferBar, "width", bufferTime + "px");
		if(this.isA11y ) {
			var bufferLenght = dojo.style(this.handles.seekContainer, "width");
			var LeftLenght =Math.floor(bufferLenght / 4.16);
			var barDiv = null;
			if(!dojo.byId("BarDiv")) {
				barDiv = dojo.create("div",{id:"BarDiv"},this.hadles.seekBar);
			}else {
				barDiv = dojo.byId("BarDiv");
			}
			dojo.empty("BarDiv");
			for(var i = 1;i<=LeftLenght;i++){
				var marginLeft = 4.16*i;
				dojo.create("div", {
					id : "bar"+i,
					className: "",
					style: {
						position:"absolute",
						marginLeft:marginLeft +"px",
						display : "none"
					},
					innerHTML: "|"
				}, barDiv);
			}
		};

		this.isFullScreen = false;
	},
	/*
	 * handles displaying the control bar and fading it out
	 */
	showControls:function(){
		dojo.style(this.handles.controlBar, "opacity", "0.9");
		var self = this;
		if(self.controlsTimedOut == false){
			if(self.timeOutHandle != null){
				clearTimeout(self.timeOutHandle);
			}
			self.timeOutHandle = setTimeout(function(){
				if(!self.isFocused && !self.isOverControlBar){
					dojo._fade({node:self.handles.controlBar, start:0.9, end:0, duration: 250}).play(); 
					self.controlsTimedOut = true;
					self.timeOutHandle = null;
				}else {
					self.showControls();
				}
			}, 3000);
		}else{
			dojo._fade({node:self.handles.controlBar, start:0, end:0.9, duration: 250}).play(); 

			if(self.controlsTimedOut == null){
				self.timeOutHandle = setTimeout(function(){
					dojo._fade({node:self.handles.controlBar, start:0.9, end:0, duration: 250}).play(); 
					self.controlsTimedOut = true;
					self.timeOutHandle = null;
				}, 3000);
			}
			self.controlsTimedOut = false;

		}	
	},
	/*
	 * links css
	 */
	loadStyles: function(){
		var linkTag = document.createElement("link");
		linkTag.setAttribute("id", "HTML5Video-styles");
		linkTag.setAttribute("rel", "stylesheet");
		linkTag.setAttribute("type", "text/css");
		if (this.isMini){
			linkTag.setAttribute("href", require.toUrl("lconn.share") + "/html5_video_player/css/VideoEE.css");
		} else {
			linkTag.setAttribute("href", require.toUrl("lconn.share") + "/html5_video_player/css/VideoStyles.css");
		}
		document.getElementsByTagName("head")[0].appendChild(linkTag);
	},
	/*
	 * connects event listeners for basic functionality (loading, keyboard, updating and ending)
	 */
	connectVideoEventListeners: function(){
		var self = this;
		/*
		 * initializes aspect ratio, duration and volume
		 */
		this.connect(this.handles.html5vid, "loadedmetadata", function(){
			//calculate the height based upon the aspect ratio
			var newHeight = Math.ceil((self.handles.html5vid.videoHeight * self.handles.html5vid.width) / self.handles.html5vid.videoWidth);
			//change the height of the video
			self.handles.videoWrapper.parentNode.style.height = newHeight + "px";

			self.handles.html5vid.height = newHeight;
			self.originalVideoHeight = self.handles.html5vid.height;
			self.originalVideoWidth = self.handles.html5vid.width;
			if(self.handles.playOverlay){
				self.handles.playOverlayWrapper.style.top = (newHeight / 2) - (dojo.style(self.handles.playOverlay, "height") / 2) + "px";
			}

			dojo.style(self.handles.videoWrapper, "height", newHeight + "px");
			if(self.handles.html5vid.duration >= 0 && self.handles.html5vid.duration != Number.POSITIVE_INFINITY){
				var timeOut = self.formatTime(self.handles.html5vid.duration);
				self.handles.durationTime.innerHTML = timeOut;
			}

			self.handles.html5vid.volume = self.initVolume;
		});
		/*
		 * plays the video when the poster is clicked (also destroys poster when the play() code)
		 */
		this.connect(this.handles.poster, "click", function(){
			self.play();
		});

		this.connect(this.handles.controlBar, "mouseover", function(){
			self.isOverControlBar = true;
		});

		this.connect(this.handles.controlBar, "mouseout", function(){
			self.isOverControlBar = false;
		});
		/*
		 * plays or pauses the video whenever user clicks on the video itself
		 */
		this.connect(this.handles.html5vid, "click", function(){
			if(!self.isPlaying){
				self.play();
			}else {
				self.pause();
			}
		});
		/*
		 * connects basic keyboard controls
		 * space - plays or pauses
		 * right arrow - skips ahead 3 seconds
		 * left arrow - rewinds 3 seconds
		 * up arrow - increases volume by 5%
		 * down arrow - decreases volume by 5%
		 */
		this.connect(this.handles.videoWrapper, "keypress", function(e){
			self.showControls();

			if(e.keyCode == 32){//space
				e.preventDefault();
				if(self.playing){
					dojo.style(self.handles.playButton, "display", "block");
					dojo.style(self.handles.pauseButton, "display", "none");
					self.handles.html5vid.pause();
					self.playing = false;
				} else {
					dojo.style(self.handles.playButton, "display", "none");
					dojo.style(self.handles.pauseButton, "display", "block");

					if(self.handles.html5vid.currentTime == self.handles.html5vid.duration){
						self.handles.html5vid.currentTime = 0;
					}			
					self.handles.html5vid.play();			
					self.playing = true;
				}
			}else if(e.keyCode == 39){//right arrow
				if(self.handles.html5vid.duration >= 0 && self.handles.html5vid.duration != Number.POSITIVE_INFINITY){
					var newTime = self.handles.html5vid.currentTime + 3;
					if(self.handles.html5vid.duration > newTime){
						self.handles.focusOnSeekContainer.setAttribute("ria-valuenow",parseInt(newTime));
						if(Number.POSITIVE_INFINITY != self.handles.html5vid.duration){
							self.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider " + (Math.round(newTime / self.handles.html5vid.duration * 100)  + "%"));
						} else {
							self.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider " + self.ariaTimeFormat(newTime));
						}
						self.handles.html5vid.currentTime = newTime;
					}else {
						self.handles.html5vid.currentTime = self.handles.html5vid.duration;
					}
					e.preventDefault();
				}
			}else if(e.keyCode == 37){//left arrow
				var newTime = self.handles.html5vid.currentTime - 3;
				if(newTime < 0){
					newTime = 0;
				}
	         self.handles.focusOnSeekContainer.setAttribute("ria-valuenow",parseInt(newTime));
	         if(Number.POSITIVE_INFINITY != self.handles.html5vid.duration) {
	            self.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider "+(Math.round(newTime / self.handles.html5vid.duration * 100)  + "%"));
	         } else {
	            self.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider " + self.ariaTimeFormat(newTime));
	         }
				self.handles.html5vid.currentTime = newTime;
				e.preventDefault();

			}else if(e.keyCode == 38){//up arrow
				var newVolume = self.handles.html5vid.volume;
				newVolume += .05;
				if(newVolume > 1){newVolume = 1}
				self.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider "+(Math.round(newVolume * 100)  + "%"));
				self.handles.html5vid.volume = newVolume;
				dojo.animateProperty({
					node:self.handles.volumeSlideKnob, 
					properties:{
						width:(self.handles.html5vid.volume * self.volumeWidth)
					},
					duration:100,
				}).play();
				if(self.isMuted){
					dojo.style(self.handles.mute, "display", "none");
					dojo.style(self.handles.volume, "display", "block");	
					self.isMuted = false;
				}
				e.preventDefault();
			}else if(e.keyCode == 40){//down arrow
				var newVolume = self.handles.html5vid.volume;
				newVolume -= .05;
				if(newVolume <= 0.075){
					self.mute();
					self.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider 0%");
				} else {
					self.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider "+(Math.round(newVolume * 100)  + "%"));
					self.handles.html5vid.volume = newVolume;
					dojo.animateProperty({
						node:self.handles.volumeSlideKnob, 
						properties:{
							width:(self.handles.html5vid.volume * self.volumeWidth)
						},
						duration:100,
						onEnd:function(){
							dojo.style(self.handles.mute, "display", "none");
							dojo.style(self.handles.volume, "display", "block");
							self.isMuted = false;
						}
					}).play();
					e.preventDefault();
				}
			} else if (e.keyCode == 102) {
				self.fullScreen();
				self.connectFullScreenListeners();
				e.preventDefault();
			}
		});
		/*
		 * updates the current time, seek bar and buffer bar
		 */
		this.connect(this.handles.html5vid, "timeupdate", function(){			
			try{
				//calculate via the container position to allow responsive width on seek bar
				var barPercent = Math.floor((self.handles.html5vid.currentTime / self.handles.html5vid.duration) * dojo.position(self.handles.seekContainer).w);				
				
				dojo.animateProperty({node:self.handles.seekBar, properties:{width:barPercent}, duration:10}).play();

				var bufferTime = Math.floor((self.handles.html5vid.buffered.end(0) / self.handles.html5vid.duration) * dojo.position(self.handles.seekContainer).w);
				dojo.animateProperty({node:self.handles.bufferBar, properties:{width:bufferTime}, duration:10}).play();
				if(this.isA11y ) {
					var barLenght = Math.round(barPercent/4.16);
					var bufferLenght = dojo.style(self.handles.seekContainer, "width");
					var barSumLenght =Math.round(bufferLenght/4.16);
					for(var i = 1; i <= barLenght; i++ ) {
						if(dojo.byId("bar"+i)) {
							dojo.byId("bar"+i).style.display = "block";	
						}else {
							var marginLeft = 4.16*i;
							dojo.create("div", {
								id : "bar"+i,
								className: "",
								style: {
									position : "absolute",
									marginLeft : marginLeft +"px",
									display : "block"
								},
								innerHTML: "|"
							}, dojo.byId("BarDiv"));
							
						}
					};
					for(var i = barLenght+1; i < barSumLenght; i++ ) {
						if(dojo.byId("bar"+i)) {
							   dojo.byId("bar"+i).style.display = "none";	
							}else {
								var marginLeft = 4.16*i;
								dojo.create("div", {
									id : "bar"+i,
									className: "",
									style: {
										position : "absolute",
										marginLeft : marginLeft +"px",
										display : "none"
									},
									innerHTML: "|"
								}, dojo.byId("BarDiv"));
								
							}
						};
						}	
				}
			catch(err){
				console.log("Time update error: " + err);
			}

			if(self.handles.html5vid.currentTime >= 0){
				var timeOut = self.formatTime(self.handles.html5vid.currentTime);
				self.handles.currentTime.innerHTML = timeOut;
			}

			if(self.handles.html5vid.duration >= 0 && self.handles.html5vid.duration != Number.POSITIVE_INFINITY){
				var timeOut = self.formatTime(self.handles.html5vid.duration);
				self.handles.durationTime.innerHTML = timeOut;
			}
		});

		/*
		 * remove controls when leaving widget
		 */
		this.connect(this.handles.videoWrapper, "mouseout", function(e){
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var parentCoords = dojo.position(self.handles.videoWrapper, true);
			if(mouseX <= parentCoords.x || mouseX >= (parentCoords.x + parentCoords.w) || mouseY <= parentCoords.y || mouseY >= (parentCoords.y + parentCoords.h)){
				if(!self.isFocused){
					dojo._fade({node:self.handles.controlBar, start:0.9, end:0, duration: 250}).play(); 
					self.controlsTimedOut = null;
					clearTimeout(self.timeOutHandle);
				}
				if(self.handles.playOverlay){
					self.handles.playOverlay.style.display = "block";
					self.handles.playOverlay_hover.style.display = "none";
				}
			}
		});
		/*
		 * shows play icon overlay hover style
		 */
		this.connect(this.handles.videoWrapper, "mousemove", function(e){
			self.showControls();
			if(self.handles.playOverlay){
				self.handles.playOverlay.style.display = "none";
				self.handles.playOverlay_hover.style.display = "block";
			}
		});
		/*
		 * sets the video to a paused mode on end
		 */
		this.connect(this.handles.html5vid, "ended", function(){
			dojo.style(self.handles.playButton, "display", "block");
			dojo.style(self.handles.pauseButton, "display", "none");
			self.playing = false;
		});
	},
	/*
	 * connects event listeners for the control bar
	 */
	connectControlEventListeners: function(){
		var self = this;	
		this.firstFocus = false;
		if(this.prevId){
			//self.prevId / self.nextId listeners
			this.connect(dojo.byId(this.prevId), "keypress", function(e){
				if(e.keyCode == 9 && !e.shiftKey){
				   if(this.firstFocus){
                  if(self.handles.playButton.style.display == "block") {
                     self.handles.playButton.focus();
                  } else
                     self.handles.pauseButton.focus();
                  this.firstFocus= false;
				   }else
				      this.firstFocus =true;
				e.preventDefault();
				}
			});
		}

		if(this.nextId){
			this.connect(dojo.byId(this.nextId), "keypress", function(e){
				if(e.keyCode == 9 && e.shiftKey){
					if(!self.isFullScreen){
						self.handles.fullScreen.focus();
					}else {
						self.handles.collapse.focus();
					}
					e.preventDefault();
				}
			});
		}
		/*
		 * plays video
		 */
		this.connect(this.handles.playButton, "click", function(){
			self.play();
			self.handles.pauseButton.focus();
			dojo.attr(this.handles.pauseButton, "aria-pressed", true);
		});			

		this.connect(this.handles.playButton, "mousedown", function(e){
			e.preventDefault();
		});
		/*
		 * plays if enter
		 * focuses the volume/mute button if tab
		 * focuses the prevId if shift-tab
		 */
		this.connect(this.handles.playButton, "keypress", function(e){
			if(e.keyCode == 13){//enter
				self.play();
				self.handles.pauseButton.focus();
				dojo.attr(this.handles.pauseButton, "aria-pressed", true);
				e.preventDefault();
				
			}else if(e.keyCode == 9){//tab
				if(!e.shiftKey){
					if(!self.isMuted){
						self.handles.focusOnSeekContainer.focus();
					}else {
						self.handles.mute.focus();
					}
				}else {
					dojo.byId(self.prevId).focus();
				}
				e.preventDefault();
			}
		});

		this.connect(this.handles.playButton, "mouseover", function(){
			dojo.addClass(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-hover-16");
		});

		this.connect(this.handles.playButton, "mouseout", function(){
			dojo.addClass(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-16");
		});

		this.connect(this.handles.playButton, "focus", function(){
			dojo.addClass(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-hover-16");
			self.showControls();
			self.isFocused = true;
		});

		this.connect(this.handles.playButton, "blur", function(){
			dojo.addClass(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-16");
			self.isFocused = false;
		});
		/*
		 * pauses video
		 */
		this.connect(this.handles.pauseButton, "click", function(){
			self.pause();
		});

		this.connect(this.handles.pauseButton, "mousedown", function(e){
			e.preventDefault();
		});
		/*
		 * pauses if enter
		 * focuses the volume/mute button if tab
		 * focuses the prevId if shift-tab
		 */
		this.connect(this.handles.pauseButton, "keypress", function(e){
			if(e.keyCode == 13){//enter
				self.pause();
				self.handles.playButton.focus();
				dojo.attr(this.handles.pauseButton, "aria-pressed", true);
				e.preventDefault();
			}else if(e.keyCode == 9){//tab
				if(!e.shiftKey){
					if(!self.isMuted){
						self.handles.focusOnSeekContainer.focus();
					}else {
						self.handles.mute.focus();
					}
					e.preventDefault();

				}else {
					if(self.prevId){
						dojo.byId(self.prevId).focus();
						e.preventDefault();
					}

				}
			}
		});

		this.connect(this.handles.pauseButton, "mouseover", function(){
			dojo.addClass(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-hover-16");
		});

		this.connect(this.handles.pauseButton, "mouseout", function(){
			dojo.addClass(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-16");
		});

		this.connect(this.handles.pauseButton, "focus", function(){
			dojo.addClass(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-hover-16");
			self.showControls();
			self.isFocused = true;
		});

		this.connect(this.handles.pauseButton, "blur", function(){
			dojo.addClass(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-16");
			self.isFocused = false;
		});
		/*
       *if unable to do so, reverts back to current place
       */
      this.connect(this.handles.focusOnSeekContainer, "keypress", function(e){
         if(e.keyCode == 13){//enter
            self.play();
            self.handles.pauseButton.focus();
            e.preventDefault();
         }else if(e.keyCode == 9){//tab
            if(!e.shiftKey){
               if(!self.isMuted){
                  self.handles.volume.focus();
               }else {
                  self.handles.mute.focus();
               }
            }else {
            	if(self.handles.playButton.style.display == "block") {
                  self.handles.playButton.focus();
               } else
                  self.handles.pauseButton.focus();
            }
            e.preventDefault();
         }
      });
		/*
		 * seeks within the video, if unable to do so, reverts back to current place
		 */
		this.connect(this.handles.seekContainer, "click", function(e){
			try {
				var mouseX = e.pageX;
				var mouseY = e.pageY;
				var parentCoords = dojo.position(self.handles.seekContainer, true);
				if(mouseX > parentCoords.x && mouseX < (parentCoords.x + parentCoords.w) && mouseY > parentCoords.y && mouseY < (parentCoords.y + parentCoords.h)){
					var videoPercent = (mouseX - parentCoords.x) / parentCoords.w;
					var newTime = (self.handles.html5vid.duration * videoPercent);
					var newWidth = Math.floor((newTime / self.handles.html5vid.duration) * dojo.style(self.handles.seekContainer, "width"));
					dojo.style(self.handles.seekBar, "width", newWidth + "px");
					self.handles.html5vid.currentTime = newTime;
				}			
			} catch(err){
				console.log("Error during seek: " + err);
			}
		});
		/*
		 * launches full screen mode
		 */
		this.connect(this.handles.fullScreen, "click", function(){
			self.fullScreen();
			self.handles.collapse.focus();
			dojo.attr(this.handles.fullScreen, "aria-pressed", true);
			self.connectFullScreenListeners();
		});
		/*
		 * launches full screen if enter or "f"
		 * focuses the nextId if tab
		 * focuses the volume/mute button if shift-tab
		 */
		this.connect(this.handles.fullScreen, "keypress", function(e){
			if(e.keyCode == 102 || e.keyCode == 13){//"f" or enter
				self.fullScreen();
				self.handles.collapse.focus();
				dojo.attr(this.handles.fullScreen, "aria-pressed", true);
				self.connectFullScreenListeners();
				e.preventDefault();
			}else if(e.keyCode == 9){//tab
				if(!e.shiftKey){
					if(self.nextId){
						dojo.byId(self.nextId).focus();
						e.preventDefault();
					}
				}else {
					self.handles.focusOnVolume.focus();
					e.preventDefault();
				}
			}
		});

		this.connect(this.handles.fullScreen, "mousedown", function(e){
			e.preventDefault();
		});

		this.connect(this.handles.fullScreen, "mouseover", function(){
			dojo.addClass(self.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-hover-16");
		});

		this.connect(this.handles.fullScreen, "mouseout", function(){
			dojo.addClass(self.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-16");
		});

		this.connect(this.handles.fullScreen, "focus", function(){
			dojo.addClass(self.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-hover-16");
			self.showControls();
			self.isFocused = true;
		});

		this.connect(this.handles.fullScreen, "blur", function(){
			dojo.addClass(self.handles.fullScreen, "  otherHTML5Player24 otherHTML5Player24-fullscreen-16");
			self.isFocused = false;
		});
		/*
		 * returns to original view
		 */
		this.connect(this.handles.collapse, "click", function(){
			self.collapse();
			self.handles.fullScreen.focus();
			dojo.attr(this.handles.collapse, "aria-pressed", true);
			self.disconnectFullScreenListeners();
		});
		/*
		 * returns to original view if enter
		 * focuses the nextId if tab
		 * focuses the volume/mute button if shift-tab
		 */
		this.connect(this.handles.collapse, "keypress", function(e){
			if(e.keyCode == 13){//enter
				self.collapse();
				self.handles.fullScreen.focus();
				dojo.attr(this.handles.collapse, "aria-pressed", true);
				self.disconnectFullScreenListeners();
				e.preventDefault();
			}else if(e.keyCode == 9){//tab
				if(!e.shiftKey){
					if(self.nextId){
						dojo.byId(self.nextId).focus();
						e.preventDefault();
					}
				}else {
					self.handles.focusOnVolume.focus();
					e.preventDefault();
				}
			}
		});

		this.connect(this.handles.collapse, "mouseover", function(){
		   dojo.addClass(self.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-hover-16");
		});

		this.connect(this.handles.collapse, "mouseout", function(){
		   dojo.addClass(self.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-16");
		});

		this.connect(this.handles.collapse, "mousedown", function(e){
			e.preventDefault();
		});

		this.connect(this.handles.collapse, "focus", function(){
		   dojo.addClass(self.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-hover-16");
			self.showControls();
			self.isFocused = true;
		});

		this.connect(this.handles.collapse, "blur", function(){
		   dojo.addClass(self.handles.collapse, "  otherHTML5Player24 otherHTML5Player24-collapse-16");
			self.isFocused = false;
		});
	},
	/*
	 *connects event listeners for volume functionality 
	 */
	connectVolumeEventListeners:function(){
		var self = this;

		this.connect(this.handles.volume, "focus", function(){
			dojo.addClass(self.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-hover-16");
			self.isFocused = true;
			self.showControls();
		});

		this.connect(this.handles.mute, "focus", function(){
			dojo.addClass(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-hover-16");
			self.isFocused = true;
			self.showControls();
		});

		this.connect(this.handles.volume, "blur", function(){
			dojo.addClass(self.handles.volume, "otherHTML5Player24 otherHTML5Player24-volume-16");
			self.isFocused = false;
		});

		this.connect(this.handles.mute, "blur", function(){
			dojo.addClass(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-16");
			self.isFocused = false;
		});

		this.connect(this.handles.volume, "mouseover", function(e){
		   dojo.addClass(self.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-hover-16");
		});

		this.connect(this.handles.mute, "mouseover", function(e){
			dojo.addClass(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-hover-16");
		});

		this.connect(this.handles.volume, "mouseout", function(e){
			dojo.addClass(self.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-16");
		});

		this.connect(this.handles.mute, "mouseout", function(e){
         dojo.addClass(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-16");
		});
		/*
		 * mutes video
		 */
		this.connect(this.handles.volume, "click", function(e){
			self.mute();
			self.handles.mute.focus();
			dojo.attr(this.handles.volume, "aria-pressed", true);
		});

		this.connect(this.handles.volume, "mousedown", function(e){
			e.preventDefault();
		});
		/*
		 * mutes video if enter
		 * focuses the full screen/collapse button if tab
		 * focuses play/pause button if shift-tab
		 */
		this.connect(this.handles.volume, "keypress", function(e){
			if(e.keyCode == 13){//enter
				self.mute();
				self.handles.mute.focus();
				dojo.attr(this.handles.volume, "aria-pressed", true);
				e.preventDefault();
			}else if(e.keyCode == 9){//tab
				if(!e.shiftKey){
					if (dojo.isIE) {//IE doesn't support HTML5 full screen API, therefore the full screen/collapse buttons have been removed
						dojo.byId(self.nextId).focus();
					} else {
					   self.handles.focusOnVolume.focus();
					}
				}else {
					self.handles.focusOnSeekContainer.focus();
				}
				e.preventDefault();
			}
		});
	    this.connect(this.handles.focusOnVolume, "keypress", function(e){
	         if(e.keyCode == 13){//enter
	            self.mute();
	            self.handles.mute.focus();
	            dojo.attr(this.handles.focusOnVolume, "aria-pressed", true);
	            e.preventDefault();
	         }else if(e.keyCode == 9){//tab
	            if(!e.shiftKey){
	               if (dojo.isIE  || !self.allowFullScreen) {//IE doesn't support HTML5 full screen API, therefore the full screen/collapse buttons have been removed
                       dojo.byId(self.nextId).focus();
	               } else {
	                  if(!self.isFullScreen){
	                     self.handles.fullScreen.focus();
	                  }else {
	                     self.handles.collapse.focus();
	                  }
	               }
	            }else {
	               if(!self.isMuted){
	                  self.handles.volume.focus();
	               }else {
	                  self.handles.mute.focus();
	               }
	            }
	            e.preventDefault();
	         }
	      });
		
		/*
		 * unmutes video
		 */
		this.connect(this.handles.mute, "click", function(e){
			self.unmute();
			self.handles.volume.focus();
			dojo.attr(this.handles.mute, "aria-pressed", true);
		});

		this.connect(this.handles.mute, "mousedown", function(e){
			e.preventDefault();
		});
		/*
		 * unmutes video if enter
		 * focuses the full screen/collapse button if tab
		 * focuses play/pause button if shift-tab
		 */
		this.connect(this.handles.mute, "keypress", function(e){
			if(e.keyCode == 13){//enter
				self.unmute();
				self.handles.volume.focus();
				dojo.attr(this.handles.mute, "aria-pressed", true);
				e.preventDefault();
			}else if(e.keyCode == 9){//tab
				if(!e.shiftKey){
					if (dojo.isIE) {//IE doesn't support HTML5 full screen API, therefore the full screen/collapse buttons have been removed
						self.nextId.focus();
					} else {
					   self.handles.focusOnVolume.focus();
					}
				}else {
					self.handles.focusOnSeekContainer.focus();
				}
				e.preventDefault();
			}
		});

		this.connect(self.handles.volSlide, "mouseover", function(e){
			this.style.cursor="pointer";
		});
		/*
		 * adjusts volume by allowing user to click within the volume slider 
		 */
		this.connect(self.handles.volSlide, "click", function(e){
			var mouseX = e.pageX;
			var mouseY = e.pageY;

			var parentCoords = dojo.position(self.handles.volSlide, true);
			if(mouseX > parentCoords.x && mouseX < (parentCoords.x + parentCoords.w) && mouseY > parentCoords.y && mouseY < (parentCoords.y + parentCoords.h)){
				var volumePercent = (mouseX - parentCoords.x) / parentCoords.w;
				if(volumePercent < .075){//mutes the audio if user clicks below the 7.5% mark, makes it easier to mute with the volume slider
					self.mute();
				} else {
					self.isMuted = false;
					if(volumePercent > .925){//maximizes volume if user clicks above the 92.5% mark, makes it easier to max volume with the volume slider
						volumePercent = 1;
					}
					self.handles.html5vid.volume = volumePercent;
					if(this.isA11y) {
						var newVolume = Math.round(volumePercent*10/2);
						for(var i = 0 ;i <newVolume; i++) {
							var number = i+1;
							dojo.byId("volume"+number).style.display="block";
						}
						for(var i = newVolume ;i <5; i++) {
							var number = i+1;
							dojo.byId("volume"+number).style.display="none";
						}
					}
					var newWidth = self.handles.html5vid.volume * self.volumeWidth;
					dojo.style(self.handles.volumeSlideKnob, "width", newWidth + "px");
					dojo.style(self.handles.mute, "display", "none");
					dojo.style(self.handles.volume, "display", "block");
				}
			}
		});
	},
	/*
	 * connects event listeners for full screen mode
	 */
	connectFullScreenListeners: function(){
		var self = this;

		this.fullscreenListeners.fullscreenchange = this.connect(document, "fullscreenchange", function(){	
			if(dojo.style(self.handles.html5vid, "width") > self.originalVideoWidth && !document.fullScreen){
				self.collapse();
				self.disconnectFullScreenListeners();
			}
		});

		this.fullscreenListeners.mozfullscreenchange = this.connect(document, "mozfullscreenchange", function(){
			if(dojo.style(self.handles.html5vid, "width") > self.originalVideoWidth && !document.mozFullScreen){
				self.collapse();
				self.disconnectFullScreenListeners();
			}
		});

		this.fullscreenListeners.webkitfullscreenchange = this.connect(document, "webkitfullscreenchange", function(){	
			if(dojo.style(self.handles.html5vid, "width") > self.originalVideoWidth && !document.webkitIsFullScreen){
				self.collapse();
				self.disconnectFullScreenListeners();
			}
		});
	},
	/*
	 * disconnects event listeners for full screen mode
	 */
	disconnectFullScreenListeners:function(){
		if(this.fullscreenListeners.fullscreenchange){
			this.disconnect(this.fullscreenListeners.fullscreenchange);
			this.fullscreenListeners.fullscreenchange = null;
		}
		if(this.fullscreenListeners.mozfullscreenchange){
			this.disconnect(this.fullscreenListeners.mozfullscreenchange);
			this.fullscreenListeners.mozfullscreenchange = null;
		}
		if(this.fullscreenListeners.webkitfullscreenchange){
			this.disconnect(this.fullscreenListeners.webkitfullscreenchange);
			this.fullscreenListeners.webkitfullscreenchange = null;
		}
	},
	/*
	 * connects event listeners for poster
	 */
	connectPosterEventListeners: function(){
		var self = this;

		var posterBack = dojo.byId("HTML5PosterBackground");
		this.connect(posterBack, "click", function(){
			dojo.destroy(posterBack);
			self.play();
		});
	},
	/*
	 * main function called by other objects to create video player
	 */
	playVideo: function (node, videoUrl, mediaImage, videoWidth, videoHeight, prevId, nextId, allowFullScreen) {
		var height = videoWidth * 0.75;
		/*
		 * determines whether to use small version of the player (if width is <= 300px)
		 */
		videoWidth <= 300 ? this.isMini = true: this.isMini = false;

		/*
		 * sets button icons appropriate to size of the video player
		 */
		this.prevId = prevId;
		this.nextId = nextId;
		if(allowFullScreen !== undefined){
			   this.allowFullScreen = allowFullScreen;
		}

		this.loadStyles();
		/*
		 * creates wrapper for the video player
		 */
		this.handles.videoWrapper = dojo.create("div", {
			className: "HTML5VideoWrapper",
			id: "HTML5VideoWrapper_" + this.id,
			style: {
				width: videoWidth + "px",
				height: height + "px",
				position: "relative"
			}
		}, node);
		/*
		 * creates video player
		 */
		this.handles.html5vid = dojo.create("video", {
			className: "HTML5Video",
			id: "HTML5Video_" + this.id,
			tabIndex: "-1",
			width: videoWidth + "px",
			height: height + "px"
		}, this.handles.videoWrapper);
		/*
		 * creates source for the video player
		 */
		var source = dojo.create("source", {
			src: videoUrl,
			type: "video/mp4"
		}, this.handles.html5vid);
		/*
		 * creates poster
		 */
		this.handles.poster = dojo.create("div", {
			className: "HTML5VideoPosterWrapper",
			id: "HTML5VideoPosterWrapper_" + this.id,
			style: {
				width: "100%",
				height: "100%",
				position:"absolute"	
			}
		}, this.handles.videoWrapper);
		if(mediaImage){
			/*
			 * creates poster image if available
			 */
			var posterImage = dojo.create("img", {
				className: "HTML5VideoPosterImage", 
				id:  "HTML5VideoPosterImage_" + this.id,
				src: mediaImage, 
				style: {
					height: "auto",
					width: "auto",
					maxHeight: "100%",
					maxWidth: "100%",
					display: "block",
					margin: "auto"
				}
			}, this.handles.poster);
		}
		/*
		 * sets play overlay icon appropriate to size of the video player
		 */
		var playOverlay = "otherHTML5Player24 otherHTML5Player24-play-overlay-lg"; 
		var playOverlay_hover = "otherHTML5Player24 otherHTML5Player24-play-overlay-lg-hover";
		var playOverlaySize = 64;
		if(this.isMini){
			playOverlay = "otherHTML5Player16 otherHTML5Player16-play-overlay-sm";
			playOverlay_hover = "otherHTML5Player16 otherHTML5Player16-play-overlay-sm-hover";
			playOverlaySize = 36;
		}
		/*
		 * fills in any extra space that the poster image doesn't take up with black space
		 */
		var leftOverlay = (videoWidth / 2) - (playOverlaySize / 2) + "px";
		var topOverlay = (height / 2) - (playOverlaySize / 2) + "px";
		/*
		 * creates play overlay wrapper
		 */
		this.handles.playOverlayWrapper = dojo.create("div", {
			className: "HTML5VideoPosterPlayWrapper",
			id: "HTML5VideoPosterPlayWrapper_" + this.id,
			style:{
				position:"absolute",
				left:leftOverlay,
				top: topOverlay,
				cursor:"pointer"
			}

		}, this.handles.poster);
		/*
		 * creates play overlay
		 */
		this.handles.playOverlay = dojo.create("img", {
			className: "HTML5VideoPosterPlay "+playOverlay,
			id: "HTML5VideoPosterPlay_" + this.id,
			style: {
				height:playOverlaySize + "px",
				width:playOverlaySize + "px",
				display: "block"
			}
		}, this.handles.playOverlayWrapper);
		/*
		 * creates play overlay with hover styling
		 */
		this.handles.playOverlay_hover = dojo.create("img", {
			className: "HTML5VideoPosterPlay_hover "+playOverlay_hover,
			id: "HTML5VideoPosterPlay_hover_" + this.id,
			style: {
				height:playOverlaySize + "px",
				width:playOverlaySize + "px",
				display: "none"
			}
		}, this.handles.playOverlayWrapper);
		/*
		 * creates wrapper for the video player controls
		 */
		this.handles.controlBar = dojo.create("div", {
			className: "HTML5VideoControlWrapper",
			id: "HTML5VideoControlWrapper_" + this.id,
			style: {
				width: videoWidth + "px",
			}
		}, this.handles.videoWrapper);
		/*
		 * creates wrapper for the left side of the control bar
		 */
		var controlsLeft = dojo.create("div", {
			className: "HTML5VideoControlsLeft HTML5VideoColumn",
			id: "HTML5VideoControlsLeft_" + this.id
		}, this.handles.controlBar);
		/*
		 * creates play button
		 */
		if(this.isA11y) {
			this.handles.playButton = dojo.create("a", {
				title: this.nls.videoPlayer.playButton, 
				href: "javascript:;", 
				alt: "Play", 
				role: "button",
				className: "HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16",
				id: "HTML5VideoPlay_" + this.id,
				innerHTML: this.nls.videoPlayer.playButton  
			}, controlsLeft);
			dojo.attr(this.handles.playButton, "aria-label", "Play");
			dojo.attr(this.handles.playButton, "aria-pressed", true);
		}else {
			this.handles.playButton = dojo.create("a", {
				title: this.nls.videoPlayer.playButton, 
				href: "javascript:;", 
				alt: "Play", 
				role: "button",
				className: "HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16",
				id: "HTML5VideoPlay_" + this.id
			}, controlsLeft);	
			dojo.attr(this.handles.playButton, "aria-label", "Play");
			dojo.attr(this.handles.playButton, "aria-pressed", true);
		}
	
		/*
		 * creates pause button
		 */
		if(this.isA11y) {
			this.handles.pauseButton = dojo.create("a", {
				title: this.nls.videoPlayer.pauseButton,
				href: "javascript:;",
				alt: "Pause",
				role: "button",
				className: "HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16",
				id: "HTML5VideoPause_" + this.id,
				innerHTML: this.nls.videoPlayer.pauseButton
			}, controlsLeft);
			dojo.attr(this.handles.pauseButton, "aria-label", "Pause");
		}else {
			this.handles.pauseButton = dojo.create("a", {
				title: this.nls.videoPlayer.pauseButton,
				href: "javascript:;",
				alt: "Pause",
				role: "button",
				className: "HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16",
				id: "HTML5VideoPause_" + this.id
			}, controlsLeft);	
			dojo.attr(this.handles.pauseButton, "aria-label", "Pause");
		}
	

		/*
		 * creates wrapper for the right side of the control bar
		 */
		this.handles.rightColumn = dojo.create("div", {
			className: "HTML5VideoControlsRight HTML5VideoColumn",
			id: "HTML5VideoControlsRight_" + this.id
		}, this.handles.controlBar);
		/*
		 * creates video's current time
		 */
		this.handles.currentTime = dojo.create("span", {
			title: this.nls.videoPlayer.currentTimeDisplay,
			className: "HTML5VideoCurrentTime HTML5VideoText",
			id: "HTML5VideoCurrentTime_" + this.id,
			innerHTML: "--:--"
		}, this.handles.rightColumn);
		/*
		 * creates line dividing current time and duration
		 */
		this.handles.controlsLineBreak = dojo.create("div", {
			className: "HTML5VideoControlsLineBreak",
			id: "HTML5VideoControlsLineBreak_" + this.id
		}, this.handles.rightColumn);
		/*
		 * creates video's duration
		 */
		this.handles.durationTime = dojo.create("span", {
			title: this.nls.videoPlayer.timeDuration,
			className: "HTML5VideoDuration HTML5VideoText",
			id: "HTML5VideoDuration_" + this.id,
			innerHTML: "--:--"
		}, this.handles.rightColumn);
		/*
		 * creates mute button (handle is volume)
		 */
		
		if(this.isA11y) {
			this.handles.volume = dojo.create("a", {
				title: this.nls.videoPlayer.volumeButton,
				href: "javascript:;",
				alt: "Mute",
				role: "button",
				className: "HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16",
				id: "HTML5VideoVolume_" + this.id,
				innerHTML: this.nls.videoPlayer.volumeButton
			}, this.handles.rightColumn);
			dojo.style(this.handles.volume, "display", "block");
			dojo.attr(this.handles.volume, "aria-label", "Mute");
		}else {
			this.handles.volume = dojo.create("a", {
				title: this.nls.videoPlayer.volumeButton,
				href: "javascript:;",
				alt: "Mute",
				role: "button",
				className: "HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16",
				id: "HTML5VideoVolume_" + this.id
			}, this.handles.rightColumn);
			dojo.attr(this.handles.volume, "aria-label", "Mute");
		}
	
		/*
		 * creates unmute button (handle is mute)
		 */

		
		if(this.isA11y) {
			this.handles.mute = dojo.create("a", {
				title: this.nls.videoPlayer.muteButton,
				href: "javascript:;",
				alt: "Unmute",
				role: "button",
				className: "HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16",
				id: "HTML5VideoMute_" + this.id,
				innerHTML: this.nls.videoPlayer.muteButton
			}, this.handles.rightColumn);
			dojo.attr(this.handles.mute, "aria-label", "Unmute");
		}else {
			this.handles.mute = dojo.create("a", {
				title: this.nls.videoPlayer.muteButton,
				href: "javascript:;",
				alt: "Unmute",
				role: "button",
				className: "HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16",
				id: "HTML5VideoMute_" + this.id
			}, this.handles.rightColumn);	
			dojo.attr(this.handles.mute, "aria-label", "Unmute");
		}
		/*
		 * creates full screen and collapse buttons, unless in IE
		 */
		if(!dojo.isIE && this.allowFullScreen){//IE doesn't support HTML5 full screen API, therefore these buttons are removed
			if(this.isA11y) {
				this.handles.fullScreen = dojo.create("a", {
					title: this.nls.videoPlayer.fullScreenButton,
					href: "javascript:;",
					role: "button",
					alt: "Enter full screen mode",
					className: "HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16",
					id: "HTML5VideoFullScreen_" + this.id,
					innerHTML: this.nls.videoPlayer.fullScreenButton
				}, this.handles.rightColumn);
				 dojo.style(this.handles.fullScreen, "display", "block");
				 dojo.attr(this.handles.fullScreen, "aria-label", "Enter full screen mode");
				
			}else {
				this.handles.fullScreen = dojo.create("a", {
					title: this.nls.videoPlayer.fullScreenButton,
					href: "javascript:;",
					role: "button",
					alt: "Enter full screen mode",
					className: "HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16",
					id: "HTML5VideoFullScreen_" + this.id
				}, this.handles.rightColumn);
				 dojo.attr(this.handles.fullScreen, "aria-label", "Enter full screen mode");
			}
			if(this.isA11y) {
				this.handles.collapse = dojo.create("a", {
					title: this.nls.videoPlayer.collapseButton,
					href: "javascript:;",
					role: "button",
					alt: "Exit full screen mode",
					className: "HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16",
					id: "HTML5VideoCollapse_" + this.id,
					innerHTML: this.nls.videoPlayer.collapseButton
				}, this.handles.rightColumn);
				dojo.attr(this.handles.collapse, "aria-label", "Exit full screen mode");
			}else {
				this.handles.collapse = dojo.create("a", {
					title: this.nls.videoPlayer.collapseButton,
					href: "javascript:;",
					role: "button",
					alt: "Exit full screen mode",
					className: "HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16",
					id: "HTML5VideoCollapse_" + this.id
				}, this.handles.rightColumn);	
				dojo.attr(this.handles.collapse, "aria-label", "Exit full screen mode");
			}

		}
		/*
		 * creates wrapper for the volume slider
		 */
		this.handles.volumeBar = dojo.create("div", {
			title: this.nls.videoPlayer.volumeBar,
			className: "HTML5VideoVolumeBar",
			id: "HTML5VideoVolumeBar_" + this.id
		}, this.handles.rightColumn);
		/*
		 * creates focusOnVolume
		 */
      this.handles.focusOnVolume = dojo.create("a", {
         className: "HTML5OnFocus",
         href:"javascript:;",
         role:"slider",
         style:"width:100%;height:100%;display:block"
      }, this.handles.volumeBar);
      this.handles.focusOnVolume.setAttribute("aria-label" ,"volume slider");
      
		/*
		 * creates volume slider container
		 */
		this.handles.volSlide = dojo.create("div", {
			className: "HTML5VideoVolSlide",
			id: "HTML5VideoVolSlide_" + this.id
		}, this.handles.focusOnVolume);
		/*
		 * creates volume slider
		 */
		this.handles.volumeSlideKnob = dojo.create("div", {
			className: "HTML5VideoVolumeKnob",
			id: "HTML5VideoVolumeKnob_" + this.id
		}, this.handles.volSlide);
		/*
		 * the following create the vertical bars within the volume slider container
		 * volumeWindows allow the volume slider to be seen
		 * volumeDividers break up the volume slider container into 6 bars
		 */
		if(this.isA11y) {
			var volumeWindow1 = dojo.create("div", {
				id : "volume1",
				className: "",
				style: {
					position:"absolute",
					marginLeft:"5.2px"
				},
				innerHTML: "|"
			}, this.handles.volSlide);
			var volumeWindow2 = dojo.create("div", {
				id : "volume2",
				className: "",
				style: {
					position:"absolute",
					marginLeft:"10.4px"
				},
				innerHTML: "|"
			}, this.handles.volSlide);
			var volumeWindow3 = dojo.create("div", {
				id : "volume3",
				className: "",
				style: {
					position:"absolute",
					marginLeft:"15.6px"
				},
				innerHTML: "|"
			}, this.handles.volSlide);
			var volumeWindow4 = dojo.create("div", {
				id : "volume4",
				className: "",
				style: {
					display:"none",
					position:"absolute",
					marginLeft:"20.8px"
				},
				innerHTML: "|"
			}, this.handles.volSlide);
			var volumeWindow5 = dojo.create("div", {
				id : "volume5",
				className: "",
				style: {
					display:"none",
					position:"absolute",
					marginLeft:"26px"
				},
				innerHTML: "|"
			}, this.handles.volSlide);
			
		}else {
			var volumeWindow1 = dojo.create("div", {
				className: "HTML5VideoVolumeWindow"
			}, this.handles.volSlide);
			var volumeDivider1 = dojo.create("div", {
				className: "HTML5VideoVolumeDivider",
				style: {
					marginLeft: "3px"
				}
			}, this.handles.volSlide);
			var volumeWindow2 = dojo.create("div", {
				className: "HTML5VideoVolumeWindow",
				style: {
					marginLeft: "5px"
				}
			}, this.handles.volSlide);
			var volumeDivider2 = dojo.create("div", {
				className: "HTML5VideoVolumeDivider",
				style: {
					marginLeft: "8px"
				}
			}, this.handles.volSlide);
			var volumeWindow3 = dojo.create("div", {
				className: "HTML5VideoVolumeWindow",
				style: {
					marginLeft: "10x"
				}
			}, this.handles.volSlide);
			var volumeDivider3 = dojo.create("div", {
				className: "HTML5VideoVolumeDivider",
				style: {
					marginLeft: "13px"
				}
			}, this.handles.volSlide);
			var volumeWindow4 = dojo.create("div", {
				className: "HTML5VolumeWindow",
				style: {
					marginLeft: "15px"
				}
			}, this.handles.volSlide);
			var volumeDivider4 = dojo.create("div", {
				className: "HTML5VideoVolumeDivider",
				style: {
					marginLeft: "18px"
				}
			}, this.handles.volSlide);
			var volumeWindow5 = dojo.create("div", {
				className: "HTML5VideoVolumeWindow",
				style: {
					marginLeft: "20px"
				}
			}, this.handles.volSlide);
			var volumeDivider5 = dojo.create("div", {
				className: "HTML5VideoVolumeDivider",
				style: {
					marginLeft: "23px"
				}
			}, this.handles.volSlide);
			var volumeWindow6 = dojo.create("div", {
				className: "HTML5VideoVolumeWindow",
				style: {
					marginLeft: "25px"
				}
			}, this.handles.volSlide);
			
		}
		
		/*
		 * creates wrapper for the center section of the control bar
		 */
		this.handles.centerColumn = dojo.create("div", {
			className: "HTML5VideoControlsCenter HTML5VideoColumn",
			id: "HTML5VideoControlsCenter_" + this.id
		}, this.handles.controlBar);
		/*
		 * creates focusOnSeekContainer
		 */
		this.handles.focusOnSeekContainer = dojo.create("a",{
		   className: "HTML5OnFocus",
		   role:"slider",
		   href: "javascript:;",
	      style: "width:100%;height:100%;display:block"
		},this.handles.centerColumn);
		this.handles.focusOnSeekContainer.setAttribute("aria-label" ,"video slider");
		
		/*
		 * creates seek container
		 */
		this.handles.seekContainer = dojo.create("div", {
			title: this.nls.videoPlayer.scrubBar,
			className: "HTML5VideoSlider HTML5VideoControls",
			id: "HTML5VideoSlider_" + this.id
		}, this.handles.focusOnSeekContainer);
		/*
		 * creates buffer bar
		 */
		this.handles.bufferBar = dojo.create("div", {
			className: "HTML5VideoBuffer",
			id: "HTML5VideoBuffer_" + this.id
		}, this.handles.seekContainer);
		/*
		 * creates seek bar
		 */
		this.handles.seekBar = dojo.create("div", {
			className: "HTML5VideoKnob",
			id: "HTML5VideoKnob_" + this.id
		}, this.handles.seekContainer);
		if( this.isA11y ) {
			var bufferLenght = dojo.style(this.handles.seekContainer, "width");
			var leftLenght = Math.floor(bufferLenght / 4.16);
			var barDiv = dojo.create("div",{id:"BarDiv"},this.handles.seekBar);
			dojo.empty("BarDiv");
			for(var i = 1;i<=leftLenght;i++){
				var marginLeft = 4.16*i;
				dojo.create("div", {
				id : "bar"+i,
				className: "",
				style: {
					position : "absolute",
					marginLeft : marginLeft +"px",
					display : "none"
				},
				innerHTML: "|"
			}, barDiv);
			}
		}

		this.connectVideoEventListeners();
		this.connectControlEventListeners();
		this.connectVolumeEventListeners();
		this.play();
	}
});
