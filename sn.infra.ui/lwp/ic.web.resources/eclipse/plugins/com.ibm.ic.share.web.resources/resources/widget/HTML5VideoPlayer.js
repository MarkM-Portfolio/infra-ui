/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/dom",
   "dojo/dom-style",
   "dojo/i18n!ic-share/html5_video_player/nls/html5VideoPlayerStrings",
   "dojo/dom-attr",
   "dojo/has",
   "dojo/dom-construct",
   "dojo/dom-geometry",
   "dojo/dom-class",
   "dojo/_base/window",
   "dojo/_base/declare",
   "dijit/_Widget",
   "dojo/on"
], function (dojo, dom, domStyle, i18nhtml5VideoPlayerStrings, domAttr, has, domConstruct, domGeometry, domClass, windowModule, declare, _Widget, on) {

   /*
   * This file demonstrates how to register an HTML5 video player for the Media Gallery UI. This file will
   * be evaluated after the core Dojo libraries have been loaded, so most dojo methods are 
   * available.  The Media Gallery application will not be completely started.
   */

   var HTML5VideoPlayer = declare("ic-share.widget.HTML5VideoPlayer", _Widget, {
      isA11y: false,
      nls: i18nhtml5VideoPlayerStrings,
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
         this.isA11y = domClass.contains(windowModule.doc.getElementsByTagName("body")[0], "dijit_a11y");
      },
      /*
       * converts time to a minutes and seconds format as well as sizes controls to properly display dynamic time
       */
      formatTime: function(time){
         var minutes = Math.floor(time / 60);
         var seconds = Math.floor(time - (minutes * 60));      
         var secondsFormat = seconds > 9 ? seconds: "0" + seconds; 
         var newWidth = 0;
         if(!has("ie")){//IE doesn't support HTML5 full screen API, therefore this button is removed
            newWidth += domStyle.get(this.handles.fullScreen, "width") + domStyle.get(this.handles.fullScreen, "marginRight") + domStyle.get(this.handles.fullScreen, "marginLeft");
         }
         newWidth += domStyle.get(this.handles.volumeBar, "width") + domStyle.get(this.handles.volumeBar, "marginRight") + domStyle.get(this.handles.volumeBar, "marginLeft");
         newWidth += domStyle.get(this.handles.volume, "width") + domStyle.get(this.handles.volume, "marginRight") + domStyle.get(this.handles.volume, "marginLeft");
         newWidth += domStyle.get(this.handles.durationTime, "width") + domStyle.get(this.handles.durationTime, "marginRight") + domStyle.get(this.handles.durationTime, "marginLeft");
         newWidth += domStyle.get(this.handles.controlsLineBreak, "width") + domStyle.get(this.handles.controlsLineBreak, "marginRight") + domStyle.get(this.handles.controlsLineBreak, "marginLeft");
         newWidth += domStyle.get(this.handles.currentTime, "width") + domStyle.get(this.handles.currentTime, "marginRight") + domStyle.get(this.handles.currentTime, "marginLeft");
         
         totalWidth = domStyle.get(this.handles.controlBar, "width");
         rightWidth = domStyle.get(this.handles.rightColumn, "width");
         leftWidth = domStyle.get(this.handles.leftColumn, "width");

         domStyle.set(this.handles.rightColumn, "width", newWidth + 10 + "px");
         domStyle.set(this.handles.centerColumn, "width", (totalWidth - leftWidth - rightWidth - 1) /*20*/ + "px");//20px offset for margin.
         
         this.handles.focusOnSeekContainer.setAttribute("aria-valuemax", this.handles.html5vid.duration);
         this.handles.focusOnSeekContainer.setAttribute("aria-valuenow", this.handles.html5vid.currentTime);

         return minutes + ":" + secondsFormat;
      },
      getHandles: function () {
         return this.handles;
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
      recalculateVideoSize: function (width) {
         if (width) {
            this.handles.html5vid.width = width;
         }
         
         var newHeight = Math.ceil((this.handles.html5vid.videoHeight * this.handles.html5vid.width) / this.handles.html5vid.videoWidth);

         this.handles.html5vid.height = newHeight;
         this.originalVideoHeight = this.handles.html5vid.height;
         this.originalVideoWidth = this.handles.html5vid.width;
         if(this.handles.playOverlay){
            this.handles.playOverlayWrapper.style.top = (newHeight / 2) - (domStyle.get(this.handles.playOverlay, "height") / 2) + "px";
         }

         domStyle.set(this.handles.videoWrapper, "height", newHeight + "px");
         if(this.handles.html5vid.duration >= 0 && this.handles.html5vid.duration != Number.POSITIVE_INFINITY){
            var timeOut = this.formatTime(this.handles.html5vid.duration);
            this.handles.durationTime.innerHTML = timeOut;
         }

         this.handles.html5vid.volume = this.initVolume;
         this.handles.focusOnVolume.setAttribute("aria-valuenow", this.initVolume);

      },
      /*
       * plays video file while hiding play button and displaying pause button
       */
      play:function(){   
         domStyle.set(this.handles.playButton, "display", "none");
         domStyle.set(this.handles.pauseButton, "display", "block");
   
         if(this.handles.html5vid.currentTime == this.handles.html5vid.duration){
            this.handles.html5vid.currentTime = 0;
         }         
   
         if(this.handles.poster){//destroy the poster when video starts
            domConstruct.destroy(this.handles.poster);
            this.handles.poster = null;
         }
   
         this.handles.html5vid.play();         
         this.isPlaying = true;
      },
      /*
       * pauses video file while hiding pause button and displaying play button
       */
      pause: function(){
         domStyle.set(this.handles.playButton, "display", "block");
         domStyle.set(this.handles.pauseButton, "display", "none");
         this.handles.html5vid.pause();
         this.isPlaying = false;
      },
      /*
       * mutes video file while hiding mute (handle is volume) button and displaying unmute (handle is mute) button
       */
      mute: function(){
         var self = this;
         domStyle.set(self.handles.volumeSlideKnob, "width", 0 + "px");
         self.lastVolumeValue = self.handles.html5vid.volume;
         self.handles.html5vid.volume = 0;
         self.handles.html5vid.muted = true;
         
         this.handles.focusOnVolume.setAttribute("aria-valuenow", self.handles.html5vid.volume);
         domStyle.set(self.handles.volume, "display", "none");
         domStyle.set(self.handles.mute, "display", "block");
         this.isMuted = true;
      },
      /*
       * unmutes video file while hiding unmute (handle is mute) button and displaying mute (handle is volume) button
       */
      unmute: function(){
         var self = this;
         var newWidth = this.lastVolumeValue * this.volumeWidth;
         domStyle.set(self.handles.volumeSlideKnob, "width", newWidth + "px");
         self.handles.html5vid.volume = self.lastVolumeValue;
         self.handles.html5vid.muted = false;

         this.handles.focusOnVolume.setAttribute("aria-valuenow", self.handles.html5vid.volume);
         domStyle.set(self.handles.mute, "display", "none");
         domStyle.set(self.handles.volume, "display", "block");
         this.isMuted = false;
      },
      /*
       * launches full screen mode while hiding the full screen button and displaying the collapse button
       * and adjusts controls to fit full screen
       */
      fullScreen: function(){
         if (has("ie")) {//IE doesn't support HTML5 full screen API, so this is disabled
            return;
         }
         if (this.handles.poster) {
            this.play();
         }
         domStyle.set(this.handles.fullScreen, "display", "none");
         domStyle.set(this.handles.collapse, "display", "block");
   
         if (this.isMini) {//loads new style sheet and icons if original player is the smaller version
            var popOut = window.parent.dojo.query("iframe")[0];//necessary for EE
            domAttr.set(popOut, "allowFullScreen", "true");
   
            var styleSheet = dom.byId("HTML5Video-styles");
            styleSheet.setAttribute("href", require.toUrl("ic-share") + "/html5_video_player/css/VideoStyles.css");
   
            domClass.add(this.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-16");
            domClass.add(this.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-16");
            domClass.add(this.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-16");
            domClass.add(this.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-16");
         }
   
         if (this.handles.videoWrapper.requestFullScreen) {//HTML5 full screen API calls
            this.handles.videoWrapper.requestFullScreen();
         } else if (this.handles.videoWrapper.webkitRequestFullScreen) {
            this.handles.videoWrapper.webkitRequestFullScreen(this.handles.videoWrapper.ALLOW_KEYBOARD_INPUT);
            domStyle.set(this.handles.videoWrapper, {"position":"fixed", "width": screen.width + "px", "height": screen.height + "px"});
         } else if (this.handles.videoWrapper.mozRequestFullScreen) {
            this.handles.videoWrapper.mozRequestFullScreen();
         }
         domStyle.set(this.handles.html5vid, {"width": screen.width + "px", "height": screen.height + "px"});
         domStyle.set(this.handles.controlBar, "width", "100%");
   
         this.formatTime(this.handles.html5vid.currentTime);
   
         var barPercent = Math.floor((this.handles.html5vid.currentTime / this.handles.html5vid.duration) * domStyle.get(this.handles.seekContainer, "width"));
         domStyle.set(this.handles.seekBar, "width", barPercent + "px");
         var bufferTime = Math.floor((this.handles.html5vid.buffered.end(0) / this.handles.html5vid.duration) * domStyle.get(this.handles.seekContainer, "width"));
         domStyle.set(this.handles.bufferBar, "width", bufferTime + "px");
         if(this.isA11y ) {
            var barDiv = null;
            if(!dom.byId("BarDiv")) {
               barDiv = domConstruct.create("div",{id:"BarDiv"},this.hadles.seekBar);
            }else {
               barDiv = dom.byId("BarDiv");
            }
            domConstruct.empty("BarDiv");
            var bufferLenght = domStyle.get(this.handles.seekContainer, "width");
            var LeftLenght = Math.floor(bufferLenght / 4.16);
            for(var i = 1;i<=LeftLenght;i++){
               var marginLeft = 4.16*i;
               domConstruct.create("div", {
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
         if (has("ie")) {
            return
         }
         domStyle.set(this.handles.collapse, "display", "none");
         domStyle.set(this.handles.fullScreen, "display", "block");
   
         if (this.isMini) {//loads new style sheet and icons if original view is small version
            var styleSheet = dom.byId("HTML5Video-styles");
            styleSheet.setAttribute("href", require.toUrl("ic-share") + "/html5_video_player/css/VideoEE.css");
   
            domClass.add(this.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-16");
            domClass.add(this.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-16");
            domClass.add(this.handles.volume, "otherHTML5Player24 otherHTML5Player24-volume-16");
            domClass.add(this.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-16");
         }
   
         if (document.cancelFullScreen) {//HTML5 full screen API calls
            document.cancelFullScreen();
         } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
            domStyle.set(this.handles.videoWrapper, {"position":"relative", "width": this.originalVideoWidth + "px", "height": this.originalVideoHeight + "px"});
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         }
         domStyle.set(this.handles.html5vid, {"width": this.originalVideoWidth + "px", "height": this.originalVideoHeight + "px"});
         domStyle.set(this.handles.controlBar, "width", "100%");
   
         this.formatTime(this.handles.html5vid.currentTime);
   
         var barPercent = Math.floor((this.handles.html5vid.currentTime / this.handles.html5vid.duration) * domStyle.get(this.handles.seekContainer, "width"));
         domStyle.set(this.handles.seekBar, "width", barPercent + "px");
         var bufferTime = Math.floor((this.handles.html5vid.buffered.end(0) / this.handles.html5vid.duration) * domStyle.get(this.handles.seekContainer, "width"));
         domStyle.set(this.handles.bufferBar, "width", bufferTime + "px");
         if(this.isA11y ) {
            var bufferLenght = domStyle.get(this.handles.seekContainer, "width");
            var LeftLenght =Math.floor(bufferLenght / 4.16);
            var barDiv = null;
            if(!dom.byId("BarDiv")) {
               barDiv = domConstruct.create("div",{id:"BarDiv"},this.hadles.seekBar);
            }else {
               barDiv = dom.byId("BarDiv");
            }
            domConstruct.empty("BarDiv");
            for(var i = 1;i<=LeftLenght;i++){
               var marginLeft = 4.16*i;
               domConstruct.create("div", {
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
         domStyle.set(this.handles.controlBar, "opacity", "0.9");
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
            linkTag.setAttribute("href", require.toUrl("ic-share") + "/html5_video_player/css/VideoEE.css");
         } else {
            linkTag.setAttribute("href", require.toUrl("ic-share") + "/html5_video_player/css/VideoStyles.css");
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
         on(this.handles.html5vid, "loadedmetadata", function(){
            //calculate the height based upon the aspect ratio
            self.recalculateVideoSize();
         });
         /*
          * plays the video when the poster is clicked (also destroys poster when the play() code)
          */
         on(this.handles.poster, "click", function(){
            self.play();
         });
   
         on(this.handles.controlBar, "mouseover", function(){
            self.isOverControlBar = true;
         });
   
         on(this.handles.controlBar, "mouseout", function(){
            self.isOverControlBar = false;
         });
         /*
          * plays or pauses the video whenever user clicks on the video itself
          */
         on(this.handles.html5vid, "click", function(){
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
         on(this.handles.videoWrapper, "keydown", function(e){
            self.showControls();
            
            if(e.charCode == 32 || e.keyCode == 32){//space
               if(self.playing){
                  domStyle.set(self.handles.playButton, "display", "block");
                  domStyle.set(self.handles.pauseButton, "display", "none");
                  self.handles.html5vid.pause();
                  self.playing = false;
               } else {
                  domStyle.set(self.handles.playButton, "display", "none");
                  domStyle.set(self.handles.pauseButton, "display", "block");

                  if(self.handles.html5vid.currentTime == self.handles.html5vid.duration){
                     self.handles.html5vid.currentTime = 0;
                  }         
                  self.handles.html5vid.play();
                  self.playing = true;
               }
               e.preventDefault();
               e.stopPropagation();
            }else if(e.charCode == 39 || e.keyCode == 39){//right arrow
               if(self.handles.html5vid.duration >= 0 && self.handles.html5vid.duration != Number.POSITIVE_INFINITY){
                  var newTime = self.handles.html5vid.currentTime + 3;
                  if(self.handles.html5vid.duration > newTime){
                     self.handles.focusOnSeekContainer.setAttribute("aria-valuenow",parseInt(newTime));
                     if(Number.POSITIVE_INFINITY != self.handles.html5vid.duration){
                        self.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider " + (Math.round(newTime / self.handles.html5vid.duration * 100)  + "%"));
                     } else {
                        self.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider " + self.ariaTimeFormat(newTime));
                     }
                     self.handles.html5vid.currentTime = newTime;
                  }else {
                     self.handles.html5vid.currentTime = self.handles.html5vid.duration;
                  }
               }
               e.preventDefault();
               e.stopPropagation();
            }else if(e.charCode == 37 || e.keyCode == 37){//left arrow
               var newTime = self.handles.html5vid.currentTime - 3;
               if(newTime < 0){
                  newTime = 0;
               }
               self.handles.focusOnSeekContainer.setAttribute("aria-valuenow",parseInt(newTime));
               if(Number.POSITIVE_INFINITY != self.handles.html5vid.duration) {
                  self.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider "+(Math.round(newTime / self.handles.html5vid.duration * 100)  + "%"));
               } else {
                  self.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider " + self.ariaTimeFormat(newTime));
               }
               self.handles.html5vid.currentTime = newTime;
               e.preventDefault();
               e.stopPropagation();
            }else if(e.charCode == 38 || e.keyCode == 38){//up arrow
               var focusElement = null;
               if (document.activeElement == self.handles.volume) {
                  focusElement = self.handles.volume;
               } else if (document.activeElement == self.handles.mute) {
                  focusElement = self.handles.mute;
               }

               var newVolume = self.handles.html5vid.volume;
               newVolume += .05;
               if(newVolume > 1){newVolume = 1}
               self.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider "+(Math.round(newVolume * 100)  + "%"));
               self.handles.html5vid.volume = newVolume;
               
               self.handles.focusOnVolume.setAttribute("aria-valuenow", self.handles.html5vid.volume);
               self.handles.html5vid.muted = false;
               dojo.animateProperty({
                  node:self.handles.volumeSlideKnob, 
                  properties:{
                     width:(self.handles.html5vid.volume * self.volumeWidth)
                  },
                  duration:100,
               }).play();
               if(self.isMuted){
                  domStyle.set(self.handles.mute, "display", "none");
                  domStyle.set(self.handles.volume, "display", "block");   
                  self.isMuted = false;
               }

               if (focusElement)
                  self.handles.volume.focus();
               e.preventDefault();
               e.stopPropagation();
            }else if(e.charCode == 40 || e.keyCode == 40){//down arrow
               var focusElement = null;
               if (document.activeElement == self.handles.volume) {
                  focusElement = self.handles.volume;
               } else if (document.activeElement == self.handles.mute) {
                  focusElement = self.handles.mute;
               }
               var newVolume = self.handles.html5vid.volume;
               newVolume -= .05;
               if(newVolume <= 0.075){
                  self.mute();
                  self.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider 0%");
                  if(focusElement) {
                     self.handles.mute.focus();
                  }
               } else {
                  self.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider "+(Math.round(newVolume * 100)  + "%"));
                  self.handles.html5vid.volume = newVolume;
                  self.handles.html5vid.muted = false;

                  self.handles.focusOnVolume.setAttribute("aria-valuenow", self.handles.html5vid.volume);
                  dojo.animateProperty({
                     node:self.handles.volumeSlideKnob, 
                     properties:{
                        width:(self.handles.html5vid.volume * self.volumeWidth)
                     },
                     duration:100,
                     onEnd:function(){
                        domStyle.set(self.handles.mute, "display", "none");
                        domStyle.set(self.handles.volume, "display", "block");
                        self.isMuted = false;
                     }
                  }).play();
                  if (focusElement) {
                     self.handles.volume.focus();
                  }
                  e.preventDefault();
                  e.stopPropagation();
               }
            } else if (e.charCode == 102 || e.keyCode == 102) {
               self.fullScreen();
               self.connectFullScreenListeners();
               e.preventDefault();
               e.stopPropagation();
            }
         });
         /*
          * updates the current time, seek bar and buffer bar
          */
         on(this.handles.html5vid, "timeupdate", function(){         
            try{
               //calculate via the container position to allow responsive width on seek bar
               var barPercent = Math.floor((self.handles.html5vid.currentTime / self.handles.html5vid.duration) * domGeometry.position(self.handles.seekContainer).w);            
               
               dojo.animateProperty({node:self.handles.seekBar, properties:{width:barPercent}, duration:10}).play();
   
               var bufferTime = Math.floor((self.handles.html5vid.buffered.end(0) / self.handles.html5vid.duration) * domGeometry.position(self.handles.seekContainer).w);
               dojo.animateProperty({node:self.handles.bufferBar, properties:{width:bufferTime}, duration:10}).play();
               if(this.isA11y ) {
                  var barLenght = Math.round(barPercent/4.16);
                  var bufferLenght = domStyle.get(self.handles.seekContainer, "width");
                  var barSumLenght =Math.round(bufferLenght/4.16);
                  for(var i = 1; i <= barLenght; i++ ) {
                     if(dom.byId("bar"+i)) {
                        dom.byId("bar"+i).style.display = "block";   
                     }else {
                        var marginLeft = 4.16*i;
                        domConstruct.create("div", {
                           id : "bar"+i,
                           className: "",
                           style: {
                              position : "absolute",
                              marginLeft : marginLeft +"px",
                              display : "block"
                           },
                           innerHTML: "|"
                        }, dom.byId("BarDiv"));
                        
                     }
                  };
                  for(var i = barLenght+1; i < barSumLenght; i++ ) {
                     if(dom.byId("bar"+i)) {
                           dom.byId("bar"+i).style.display = "none";   
                     }else {
                        var marginLeft = 4.16*i;
                        domConstruct.create("div", {
                           id : "bar"+i,
                           className: "",
                           style: {
                              position : "absolute",
                              marginLeft : marginLeft +"px",
                              display : "none"
                           },
                           innerHTML: "|"
                        }, dom.byId("BarDiv"));
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
         on(this.handles.videoWrapper, "mouseout", function(e){
            var mouseX = e.pageX;
            var mouseY = e.pageY;
            var parentCoords = domGeometry.position(self.handles.videoWrapper, true);
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
         on(this.handles.videoWrapper, "mousemove", function(e){
            self.showControls();
            if(self.handles.playOverlay){
               self.handles.playOverlay.style.display = "none";
               self.handles.playOverlay_hover.style.display = "block";
            }
         });
         /*
          * sets the video to a paused mode on end
          */
         on(this.handles.html5vid, "ended", function(){
            domStyle.set(self.handles.playButton, "display", "block");
            domStyle.set(self.handles.pauseButton, "display", "none");
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
            on(dom.byId(this.prevId), "keypress", function(e){
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
            on(dom.byId(this.nextId), "keypress", function(e){
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
         on(this.handles.playButton, "click", function(){
            self.play();
            self.handles.pauseButton.focus();
            domAttr.set(self.handles.pauseButton, "aria-pressed", true);
         });         
   
         on(this.handles.playButton, "mousedown", function(e){
            e.preventDefault();
         });
         /*
          * plays if enter
          * focuses the volume/mute button if tab
          * focuses the prevId if shift-tab
          */
         on(this.handles.playButton, "keypress", function(e){
            if(e.keyCode == 13){//enter
               self.play();
               self.handles.pauseButton.focus();
               domAttr.set(self.handles.pauseButton, "aria-pressed", true);
               e.preventDefault();
               
            }else if(e.keyCode == 9){//tab
               if(!e.shiftKey){
                  self.handles.focusOnSeekContainer.focus();
               }else {
                  dom.byId(self.prevId).focus();
               }
               e.preventDefault();
            }
         });
   
         on(this.handles.playButton, "mouseover", function(){
            domClass.add(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-hover-16");
         });
   
         on(this.handles.playButton, "mouseout", function(){
            domClass.remove(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-hover-16");
            domClass.add(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-16");
         });
   
         on(this.handles.playButton, "focus", function(){
            domClass.add(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-hover-16");
            self.showControls();
            self.isFocused = true;
         });
   
         on(this.handles.playButton, "blur", function(){
            domClass.remove(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-hover-16");
            domClass.add(self.handles.playButton, "otherHTML5Player24 otherHTML5Player24-play-16");
            self.isFocused = false;
         });
         /*
          * pauses video
          */
         on(this.handles.pauseButton, "click", function(){
            self.pause();
         });
   
         on(this.handles.pauseButton, "mousedown", function(e){
            e.preventDefault();
         });
         /*
          * pauses if enter
          * focuses the volume/mute button if tab
          * focuses the prevId if shift-tab
          */
         on(this.handles.pauseButton, "keypress", function(e){
            if(e.keyCode == 13){//enter
               self.pause();
               self.handles.playButton.focus();
               domAttr.set(self.handles.pauseButton, "aria-pressed", true);
               e.preventDefault();
            }else if(e.keyCode == 9){//tab
               if(!e.shiftKey){
                  self.handles.focusOnSeekContainer.focus();
                  e.preventDefault();
   
               }else {
                  if(self.prevId){
                     dom.byId(self.prevId).focus();
                     e.preventDefault();
                  }
   
               }
            }
         });
   
         on(this.handles.pauseButton, "mouseover", function(){
            domClass.add(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-hover-16");
         });
   
         on(this.handles.pauseButton, "mouseout", function(){
            domClass.remove(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-hover-16");
            domClass.add(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-16");
         });
   
         on(this.handles.pauseButton, "focus", function(){
            domClass.add(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-hover-16");
            self.showControls();
            self.isFocused = true;
         });
   
         on(this.handles.pauseButton, "blur", function(){
            domClass.remove(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-hover-16");
            domClass.add(self.handles.pauseButton, "otherHTML5Player24 otherHTML5Player24-pause-16");
            self.isFocused = false;
         });
         /*
          *if unable to do so, reverts back to current place
          */
         on(this.handles.focusOnSeekContainer, "keypress", function(e){
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
         on(this.handles.seekContainer, "click", function(e){
            try {
               var mouseX = e.pageX;
               var mouseY = e.pageY;
               var parentCoords = domGeometry.position(self.handles.seekContainer, true);
               if(mouseX > parentCoords.x && mouseX < (parentCoords.x + parentCoords.w) && mouseY > parentCoords.y && mouseY < (parentCoords.y + parentCoords.h)){
                  var videoPercent = (mouseX - parentCoords.x) / parentCoords.w;
                  var newTime = (self.handles.html5vid.duration * videoPercent);
                  var newWidth = Math.floor((newTime / self.handles.html5vid.duration) * domStyle.get(self.handles.seekContainer, "width"));
                  domStyle.set(self.handles.seekBar, "width", newWidth + "px");
                  self.handles.html5vid.currentTime = newTime;
               }         
            } catch(err){
               console.log("Error during seek: " + err);
            }
         });
         /*
          * launches full screen mode
          */
         on(this.handles.fullScreen, "click", function(){
            self.fullScreen();
            self.handles.collapse.focus();
            domAttr.set(self.handles.fullScreen, "aria-pressed", true);
            self.connectFullScreenListeners();
         });
         /*
          * launches full screen if enter or "f"
          * focuses the nextId if tab
          * focuses the volume/mute button if shift-tab
          */
         on(this.handles.fullScreen, "keypress", function(e){
            if(e.keyCode == 102 || e.keyCode == 13){//"f" or enter
               self.fullScreen();
               self.handles.collapse.focus();
               domAttr.set(self.handles.fullScreen, "aria-pressed", true);
               self.connectFullScreenListeners();
               e.preventDefault();
            }else if(e.keyCode == 9){//tab
               if(!e.shiftKey){
                  if(self.nextId){
                     dom.byId(self.nextId).focus();
                     e.preventDefault();
                  }
               }else {
                  self.handles.focusOnVolume.focus();
                  e.preventDefault();
               }
            }
         });
   
         on(this.handles.fullScreen, "mousedown", function(e){
            e.preventDefault();
         });
   
         on(this.handles.fullScreen, "mouseover", function(){
            domClass.add(self.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-hover-16");
         });
   
         on(this.handles.fullScreen, "mouseout", function(){
            domClass.remove(self.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-hover-16");
            domClass.add(self.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-16");
         });
   
         on(this.handles.fullScreen, "focus", function(){
            domClass.add(self.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-hover-16");
            self.showControls();
            self.isFocused = true;
         });
   
         on(this.handles.fullScreen, "blur", function(){
            domClass.remove(self.handles.fullScreen, "otherHTML5Player24 otherHTML5Player24-fullscreen-hover-16");
            domClass.add(self.handles.fullScreen, "  otherHTML5Player24 otherHTML5Player24-fullscreen-16");
            self.isFocused = false;
         });
         /*
          * returns to original view
          */
         on(this.handles.collapse, "click", function(){
            self.collapse();
            self.handles.fullScreen.focus();
            domAttr.set(self.handles.collapse, "aria-pressed", true);
            self.disconnectFullScreenListeners();
         });
         /*
          * returns to original view if enter
          * focuses the nextId if tab
          * focuses the volume/mute button if shift-tab
          */
         on(this.handles.collapse, "keypress", function(e){
            if(e.keyCode == 13){//enter
               self.collapse();
               self.handles.fullScreen.focus();
               domAttr.set(self.handles.collapse, "aria-pressed", true);
               self.disconnectFullScreenListeners();
               e.preventDefault();
            }else if(e.keyCode == 9){//tab
               if(!e.shiftKey){
                  if(self.nextId){
                     dom.byId(self.nextId).focus();
                     e.preventDefault();
                  }
               }else {
                  self.handles.focusOnVolume.focus();
                  e.preventDefault();
               }
            }
         });
   
         on(this.handles.collapse, "mouseover", function(){
            domClass.add(self.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-hover-16");
         });
   
         on(this.handles.collapse, "mouseout", function(){
            domClass.remove(self.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-hover-16");
            domClass.add(self.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-16");
         });
   
         on(this.handles.collapse, "mousedown", function(e){
            e.preventDefault();
         });
   
         on(this.handles.collapse, "focus", function(){
            domClass.add(self.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-hover-16");
            self.showControls();
            self.isFocused = true;
         });
   
         on(this.handles.collapse, "blur", function(){
            domClass.remove(self.handles.collapse, "otherHTML5Player24 otherHTML5Player24-collapse-hover-16");
            domClass.add(self.handles.collapse, "  otherHTML5Player24 otherHTML5Player24-collapse-16");
            self.isFocused = false;
         });
      },
      /*
       *connects event listeners for volume functionality 
       */
      connectVolumeEventListeners:function(){
         var self = this;
   
         on(this.handles.volume, "focus", function(){
            domClass.add(self.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-hover-16");
            self.isFocused = true;
            self.showControls();
         });
   
         on(this.handles.mute, "focus", function(){
            domClass.add(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-hover-16");
            self.isFocused = true;
            self.showControls();
         });
   
         on(this.handles.volume, "blur", function(){
            domClass.remove(self.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-hover-16");
            domClass.add(self.handles.volume, "otherHTML5Player24 otherHTML5Player24-volume-16");
            self.isFocused = false;
         });
   
         on(this.handles.mute, "blur", function(){
            domClass.remove(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-hover-16");
            domClass.add(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-16");
            self.isFocused = false;
         });
   
         on(this.handles.volume, "mouseover", function(e){
            domClass.add(self.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-hover-16");
         });
   
         on(this.handles.mute, "mouseover", function(e){
            domClass.add(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-hover-16");
         });
   
         on(this.handles.volume, "mouseout", function(e){
            domClass.remove(self.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-hover-16");
            domClass.add(self.handles.volume, "   otherHTML5Player24 otherHTML5Player24-volume-16");
         });
   
         on(this.handles.mute, "mouseout", function(e){
            domClass.remove(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-hover-16");
            domClass.add(self.handles.mute, "otherHTML5Player24 otherHTML5Player24-mute-16");
         });
         /*
          * mutes video
          */
         on(this.handles.volume, "click", function(e){
            self.mute();
            self.handles.mute.focus();
            domAttr.set(self.handles.volume, "aria-pressed", true);
         });
   
         on(this.handles.volume, "mousedown", function(e){
            e.preventDefault();
         });
         /*
          * mutes video if enter
          * focuses the full screen/collapse button if tab
          * focuses play/pause button if shift-tab
          */
         on(this.handles.volume, "keypress", function(e){
            if(e.keyCode == 13){//enter
               self.mute();
               self.handles.mute.focus();
               domAttr.set(self.handles.volume, "aria-pressed", true);
               e.preventDefault();
            }else if(e.keyCode == 9){//tab
               if(!e.shiftKey){
                  if (has("ie")) {//IE doesn't support HTML5 full screen API, therefore the full screen/collapse buttons have been removed
                     dom.byId(self.nextId).focus();
                  } else {
                     self.handles.focusOnVolume.focus();
                  }
               }else {
                  self.handles.focusOnSeekContainer.focus();
               }
               e.preventDefault();
            }
         });
          on(this.handles.focusOnVolume, "keypress", function(e){
               if(e.keyCode == 13){//enter
                  self.mute();
                  self.handles.mute.focus();
                  domAttr.set(self.handles.focusOnVolume, "aria-pressed", true);
                  e.preventDefault();
               }else if(e.keyCode == 9){//tab
                  if(!e.shiftKey){
                     if (has("ie")  || !self.allowFullScreen) {//IE doesn't support HTML5 full screen API, therefore the full screen/collapse buttons have been removed
                          dom.byId(self.nextId).focus();
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
         on(this.handles.mute, "click", function(e){
            self.unmute();
            self.handles.volume.focus();
            domAttr.set(self.handles.mute, "aria-pressed", true);
         });
   
         on(this.handles.mute, "mousedown", function(e){
            e.preventDefault();
         });
         /*
          * unmutes video if enter
          * focuses the full screen/collapse button if tab
          * focuses play/pause button if shift-tab
          */
         on(this.handles.mute, "keypress", function(e){
            if(e.keyCode == 13){//enter
               self.unmute();
               self.handles.volume.focus();
               domAttr.set(self.handles.mute, "aria-pressed", true);
               e.preventDefault();
            }else if(e.keyCode == 9){//tab
               if(!e.shiftKey){
                  if (has("ie")) {//IE doesn't support HTML5 full screen API, therefore the full screen/collapse buttons have been removed
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
   
         on(self.handles.volSlide, "mouseover", function(e){
            this.style.cursor="pointer";
         });
         /*
          * adjusts volume by allowing user to click within the volume slider 
          */
         on(self.handles.volSlide, "click", function(e){
            var mouseX = e.pageX;
            var mouseY = e.pageY;

            var parentCoords = domGeometry.position(self.handles.volSlide, true);
            if(mouseX > parentCoords.x && mouseX < (parentCoords.x + parentCoords.w) && mouseY > parentCoords.y && mouseY < (parentCoords.y + parentCoords.h)){
               var volumePercent = (mouseX - parentCoords.x) / parentCoords.w;
               if(volumePercent < .075){//mutes the audio if user clicks below the 7.5% mark, makes it easier to mute with the volume slider
                  self.mute();
               } else {
                  self.isMuted = false;
                  if(volumePercent > .925){//maximizes volume if user clicks above the 92.5% mark, makes it easier to max volume with the volume slider
                     volumePercent = 1;
                  }
                  self.handles.html5vid.muted = false;
                  if(this.isA11y) {
                     var newVolume = Math.round(volumePercent*10/2);
                     for(var i = 0 ;i <newVolume; i++) {
                        var number = i+1;
                        dom.byId("volume"+number).style.display="block";
                     }
                     for(var i = newVolume ;i <5; i++) {
                        var number = i+1;
                        dom.byId("volume"+number).style.display="none";
                     }
                  }
                  var newWidth = volumePercent * self.volumeWidth;
                  self.handles.html5vid.volume = volumePercent;
                  domStyle.set(self.handles.volumeSlideKnob, "width", newWidth + "px");
                  domStyle.set(self.handles.mute, "display", "none");
                  domStyle.set(self.handles.volume, "display", "block");
               }
               e.stopPropagation();
               e.preventDefault();
               self.handles.focusOnVolume.focus();
            }
         });
      },
      /*
       * connects event listeners for full screen mode
       */
      connectFullScreenListeners: function(){
         var self = this;
   
         this.fullscreenListeners.fullscreenchange = on(document, "fullscreenchange", function(){   
            if(domStyle.get(self.handles.html5vid, "width") > self.originalVideoWidth && !document.fullScreen){
               self.collapse();
               self.disconnectFullScreenListeners();
            }
         });
   
         this.fullscreenListeners.mozfullscreenchange = on(document, "mozfullscreenchange", function(){
            if(domStyle.get(self.handles.html5vid, "width") > self.originalVideoWidth && !document.mozFullScreen){
               self.collapse();
               self.disconnectFullScreenListeners();
            }
         });
   
         this.fullscreenListeners.webkitfullscreenchange = on(document, "webkitfullscreenchange", function(){   
            if(domStyle.get(self.handles.html5vid, "width") > self.originalVideoWidth && !document.webkitIsFullScreen){
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
   
         var posterBack = dom.byId("HTML5PosterBackground");
         on(posterBack, "click", function(){
            domConstruct.destroy(posterBack);
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

         if (!dom.byId("HTML5Video-styles")) {
            this.loadStyles();
         }
         /*
          * creates wrapper for the video player
          */
         this.handles.videoWrapper = domConstruct.create("div", {
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
         this.handles.html5vid = domConstruct.create("video", {
            className: "HTML5Video",
            id: "HTML5Video_" + this.id,
            tabIndex: "-1",
            width: videoWidth + "px",
            height: height + "px"
         }, this.handles.videoWrapper);
         /*
          * creates source for the video player
          */
         var source = domConstruct.create("source", {
            src: videoUrl,
            type: "video/mp4"
         }, this.handles.html5vid);
         /*
          * creates poster
          */
         this.handles.poster = domConstruct.create("div", {
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
            var posterImage = domConstruct.create("img", {
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
         this.handles.playOverlayWrapper = domConstruct.create("div", {
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
         this.handles.playOverlay = domConstruct.create("img", {
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
         this.handles.playOverlay_hover = domConstruct.create("img", {
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
         this.handles.controlBar = domConstruct.create("div", {
            className: "HTML5VideoControlWrapper",
            id: "HTML5VideoControlWrapper_" + this.id,
            style: {
               width: videoWidth + "px",
            }
         }, this.handles.videoWrapper);
         /*
          * creates wrapper for the left side of the control bar
          */
         this.handles.leftColumn = domConstruct.create("div", {
            className: "HTML5VideoControlsLeft HTML5VideoColumn",
            id: "HTML5VideoControlsLeft_" + this.id
         }, this.handles.controlBar);
         /*
          * creates play button
          */
         if(this.isA11y) {
            this.handles.playButton = domConstruct.create("a", {
               title: this.nls.videoPlayer.playButton, 
               href: "javascript:;", 
               alt: "Play", 
               role: "button",
               className: "HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16",
               id: "HTML5VideoPlay_" + this.id,
               innerHTML: '<span class="html5HighContrastThreeLine">' + this.nls.videoPlayer.playButton + '</span>'
            }, this.handles.leftColumn);
            domAttr.set(this.handles.playButton, "aria-label", "Play");
            domAttr.set(this.handles.playButton, "aria-pressed", true);
         }else {
            this.handles.playButton = domConstruct.create("a", {
               title: this.nls.videoPlayer.playButton, 
               href: "javascript:;", 
               alt: "Play", 
               role: "button",
               className: "HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16",
               id: "HTML5VideoPlay_" + this.id
            }, this.handles.leftColumn);   
            domAttr.set(this.handles.playButton, "aria-label", "Play");
            domAttr.set(this.handles.playButton, "aria-pressed", true);
         }
      
         /*
          * creates pause button
          */
         if(this.isA11y) {
            this.handles.pauseButton = domConstruct.create("a", {
               title: this.nls.videoPlayer.pauseButton,
               href: "javascript:;",
               alt: "Pause",
               role: "button",
               className: "HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16",
               id: "HTML5VideoPause_" + this.id,
               innerHTML: '<span class="html5HighContrastThreeLine">' + this.nls.videoPlayer.pauseButton + '</span>'
            }, this.handles.leftColumn);
            domAttr.set(this.handles.pauseButton, "aria-label", "Pause");
         }else {
            this.handles.pauseButton = domConstruct.create("a", {
               title: this.nls.videoPlayer.pauseButton,
               href: "javascript:;",
               alt: "Pause",
               role: "button",
               className: "HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16",
               id: "HTML5VideoPause_" + this.id
            }, this.handles.leftColumn);   
            domAttr.set(this.handles.pauseButton, "aria-label", "Pause");
         }

         /*
          * creates wrapper for the center section of the control bar
          */
         this.handles.centerColumn = domConstruct.create("div", {
            className: "HTML5VideoControlsCenter HTML5VideoColumn",
            id: "HTML5VideoControlsCenter_" + this.id
         }, this.handles.controlBar);
         /*
          * creates focusOnSeekContainer
          */
         this.handles.focusOnSeekContainer = domConstruct.create("a",{
            className: "HTML5OnFocus",
            role:"slider",
            href: "javascript:;",
            style: "width:100%;height:100%;display:block"
         },this.handles.centerColumn);
         this.handles.focusOnSeekContainer.setAttribute("aria-label" ,"video slider");
         this.handles.focusOnSeekContainer.setAttribute("aria-valuemin", "0:00")
         
         /*
          * creates seek container
          */
         this.handles.seekContainer = domConstruct.create("div", {
            title: this.nls.videoPlayer.scrubBar,
            className: "HTML5VideoSlider HTML5VideoControls",
            id: "HTML5VideoSlider_" + this.id
         }, this.handles.focusOnSeekContainer);
         /*
          * creates buffer bar
          */
         this.handles.bufferBar = domConstruct.create("div", {
            className: "HTML5VideoBuffer",
            id: "HTML5VideoBuffer_" + this.id
         }, this.handles.seekContainer);
         /*
          * creates seek bar
          */
         this.handles.seekBar = domConstruct.create("div", {
            className: "HTML5VideoKnob",
            id: "HTML5VideoKnob_" + this.id
         }, this.handles.seekContainer);
         if( this.isA11y ) {
            var bufferLenght = domStyle.get(this.handles.seekContainer, "width");
            var leftLenght = Math.floor(bufferLenght / 4.16);
            var barDiv = domConstruct.create("div",{id:"BarDiv"},this.handles.seekBar);
            domConstruct.empty("BarDiv");
            for(var i = 1;i<=leftLenght;i++){
               var marginLeft = 4.16*i;
               domConstruct.create("div", {
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
         /*
          * creates wrapper for the right side of the control bar
          */
         this.handles.rightColumn = domConstruct.create("div", {
            className: "HTML5VideoControlsRight HTML5VideoColumn",
            id: "HTML5VideoControlsRight_" + this.id
         }, this.handles.controlBar);
         /*
          * creates video's current time
          */
         this.handles.currentTime = domConstruct.create("span", {
            title: this.nls.videoPlayer.currentTimeDisplay,
            className: "HTML5VideoCurrentTime HTML5VideoText",
            id: "HTML5VideoCurrentTime_" + this.id,
            innerHTML: "--:--"
         }, this.handles.rightColumn);
         /*
          * creates line dividing current time and duration
          */
         this.handles.controlsLineBreak = domConstruct.create("div", {
            className: "HTML5VideoControlsLineBreak",
            id: "HTML5VideoControlsLineBreak_" + this.id
         }, this.handles.rightColumn);
         /*
          * creates video's duration
          */
         this.handles.durationTime = domConstruct.create("span", {
            title: this.nls.videoPlayer.timeDuration,
            className: "HTML5VideoDuration HTML5VideoText",
            id: "HTML5VideoDuration_" + this.id,
            innerHTML: "--:--"
         }, this.handles.rightColumn);
         /*
          * creates mute button (handle is volume)
          */
         
         if(this.isA11y) {
            this.handles.volume = domConstruct.create("a", {
               title: this.nls.videoPlayer.volumeButton,
               href: "javascript:;",
               alt: "Mute",
               role: "button",
               className: "HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16",
               id: "HTML5VideoVolume_" + this.id,
               innerHTML: '<span class="html5HighContrastThreeLine">' + this.nls.videoPlayer.volumeButton + '</span>'
            }, this.handles.rightColumn);
            domStyle.set(this.handles.volume, "display", "block");
            domAttr.set(this.handles.volume, "aria-label", "Mute");
         }else {
            this.handles.volume = domConstruct.create("a", {
               title: this.nls.videoPlayer.volumeButton,
               href: "javascript:;",
               alt: "Mute",
               role: "button",
               className: "HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16",
               id: "HTML5VideoVolume_" + this.id
            }, this.handles.rightColumn);
            domAttr.set(this.handles.volume, "aria-label", "Mute");
         }
      
         /*
          * creates unmute button (handle is mute)
          */
   
         
         if(this.isA11y) {
            this.handles.mute = domConstruct.create("a", {
               title: this.nls.videoPlayer.muteButton,
               href: "javascript:;",
               alt: "Unmute",
               role: "button",
               className: "HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16",
               id: "HTML5VideoMute_" + this.id,
               innerHTML: '<span class="html5HighContrastThreeLine">' + this.nls.videoPlayer.muteButton + '</span>'
            }, this.handles.rightColumn);
            domAttr.set(this.handles.mute, "aria-label", "Unmute");
         }else {
            this.handles.mute = domConstruct.create("a", {
               title: this.nls.videoPlayer.muteButton,
               href: "javascript:;",
               alt: "Unmute",
               role: "button",
               className: "HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16",
               id: "HTML5VideoMute_" + this.id
            }, this.handles.rightColumn);   
            domAttr.set(this.handles.mute, "aria-label", "Unmute");
         }
         /*
          * creates wrapper for the volume slider
          */
         this.handles.volumeBar = domConstruct.create("div", {
            title: this.nls.videoPlayer.volumeBar,
            className: "HTML5VideoVolumeBar",
            id: "HTML5VideoVolumeBar_" + this.id
         }, this.handles.rightColumn);
         /*
          * creates focusOnVolume
          */
         this.handles.focusOnVolume = domConstruct.create("a", {
            className: "HTML5OnFocus",
            href:"javascript:;",
            role:"slider",
            style:"width:100%;height:100%;display:block"
         }, this.handles.volumeBar);
         this.handles.focusOnVolume.setAttribute("aria-label" ,"volume slider");
         this.handles.focusOnVolume.setAttribute("aria-valuemin", "0");
         this.handles.focusOnVolume.setAttribute("aria-valuemax", "1");

         /*
          * creates volume slider container
          */
         this.handles.volSlide = domConstruct.create("div", {
            className: "HTML5VideoVolSlide",
            id: "HTML5VideoVolSlide_" + this.id
         }, this.handles.focusOnVolume);
         /*
          * creates volume slider
          */
         this.handles.volumeSlideKnob = domConstruct.create("div", {
            className: "HTML5VideoVolumeKnob",
            id: "HTML5VideoVolumeKnob_" + this.id
         }, this.handles.volSlide);
         /*
          * the following create the vertical bars within the volume slider container
          * volumeWindows allow the volume slider to be seen
          * volumeDividers break up the volume slider container into 6 bars
          */
         if(this.isA11y) {
            var volumeWindow1 = domConstruct.create("div", {
               id : "volume1",
               className: "",
               style: {
                  position:"absolute",
                  marginLeft:"5.2px"
               },
               innerHTML: "|"
            }, this.handles.volSlide);
            var volumeWindow2 = domConstruct.create("div", {
               id : "volume2",
               className: "",
               style: {
                  position:"absolute",
                  marginLeft:"10.4px"
               },
               innerHTML: "|"
            }, this.handles.volSlide);
            var volumeWindow3 = domConstruct.create("div", {
               id : "volume3",
               className: "",
               style: {
                  position:"absolute",
                  marginLeft:"15.6px"
               },
               innerHTML: "|"
            }, this.handles.volSlide);
            var volumeWindow4 = domConstruct.create("div", {
               id : "volume4",
               className: "",
               style: {
                  display:"none",
                  position:"absolute",
                  marginLeft:"20.8px"
               },
               innerHTML: "|"
            }, this.handles.volSlide);
            var volumeWindow5 = domConstruct.create("div", {
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
            var volumeWindow1 = domConstruct.create("div", {
               className: "HTML5VideoVolumeWindow"
            }, this.handles.volSlide);
            var volumeDivider1 = domConstruct.create("div", {
               className: "HTML5VideoVolumeDivider",
               style: {
                  marginLeft: "3px"
               }
            }, this.handles.volSlide);
            var volumeWindow2 = domConstruct.create("div", {
               className: "HTML5VideoVolumeWindow",
               style: {
                  marginLeft: "5px"
               }
            }, this.handles.volSlide);
            var volumeDivider2 = domConstruct.create("div", {
               className: "HTML5VideoVolumeDivider",
               style: {
                  marginLeft: "8px"
               }
            }, this.handles.volSlide);
            var volumeWindow3 = domConstruct.create("div", {
               className: "HTML5VideoVolumeWindow",
               style: {
                  marginLeft: "10x"
               }
            }, this.handles.volSlide);
            var volumeDivider3 = domConstruct.create("div", {
               className: "HTML5VideoVolumeDivider",
               style: {
                  marginLeft: "13px"
               }
            }, this.handles.volSlide);
            var volumeWindow4 = domConstruct.create("div", {
               className: "HTML5VolumeWindow",
               style: {
                  marginLeft: "15px"
               }
            }, this.handles.volSlide);
            var volumeDivider4 = domConstruct.create("div", {
               className: "HTML5VideoVolumeDivider",
               style: {
                  marginLeft: "18px"
               }
            }, this.handles.volSlide);
            var volumeWindow5 = domConstruct.create("div", {
               className: "HTML5VideoVolumeWindow",
               style: {
                  marginLeft: "20px"
               }
            }, this.handles.volSlide);
            var volumeDivider5 = domConstruct.create("div", {
               className: "HTML5VideoVolumeDivider",
               style: {
                  marginLeft: "23px"
               }
            }, this.handles.volSlide);
            var volumeWindow6 = domConstruct.create("div", {
               className: "HTML5VideoVolumeWindow",
               style: {
                  marginLeft: "25px"
               }
            }, this.handles.volSlide);
            
         }
         /*
          * creates full screen and collapse buttons, unless in IE
          */
         if(!has("ie") && this.allowFullScreen){//IE doesn't support HTML5 full screen API, therefore these buttons are removed
            if(this.isA11y) {
               this.handles.fullScreen = domConstruct.create("a", {
                  title: this.nls.videoPlayer.fullScreenButton,
                  href: "javascript:;",
                  role: "button",
                  alt: "Enter full screen mode",
                  className: "HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16",
                  id: "HTML5VideoFullScreen_" + this.id,
                  innerHTML: '<span class="html5HighContrast">' + this.nls.videoPlayer.fullScreenButton + '</span>'
               }, this.handles.rightColumn);
                domStyle.set(this.handles.fullScreen, "display", "block");
                domAttr.set(this.handles.fullScreen, "aria-label", "Enter full screen mode");
               
            }else {
               this.handles.fullScreen = domConstruct.create("a", {
                  title: this.nls.videoPlayer.fullScreenButton,
                  href: "javascript:;",
                  role: "button",
                  alt: "Enter full screen mode",
                  className: "HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16",
                  id: "HTML5VideoFullScreen_" + this.id
               }, this.handles.rightColumn);
                domAttr.set(this.handles.fullScreen, "aria-label", "Enter full screen mode");
            }
            if(this.isA11y) {
               this.handles.collapse = domConstruct.create("a", {
                  title: this.nls.videoPlayer.collapseButton,
                  href: "javascript:;",
                  role: "button",
                  alt: "Exit full screen mode",
                  className: "HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16",
                  id: "HTML5VideoCollapse_" + this.id,
                  innerHTML: '<span class="html5HighContrast">' + this.nls.videoPlayer.collapseButton + '</span>'
               }, this.handles.rightColumn);
               domAttr.set(this.handles.collapse, "aria-label", "Exit full screen mode");
            }else {
               this.handles.collapse = domConstruct.create("a", {
                  title: this.nls.videoPlayer.collapseButton,
                  href: "javascript:;",
                  role: "button",
                  alt: "Exit full screen mode",
                  className: "HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16",
                  id: "HTML5VideoCollapse_" + this.id
               }, this.handles.rightColumn);   
               domAttr.set(this.handles.collapse, "aria-label", "Exit full screen mode");
            }
   
         }
         
         this.connectVideoEventListeners();
         this.connectControlEventListeners();
         this.connectVolumeEventListeners();
         this.play();
         this.mute();
      }
   });
   return HTML5VideoPlayer;
});
