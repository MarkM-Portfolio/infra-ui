/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.widget.urlPreview.URLPreviewNodeSpec");

dojo.require("lconn.core.widget.urlPreview.URLPreviewNode");
dojo.require("lconn.core.config.properties");

/**
 * URL Preview Node widget Jasmine spec
 * 
 * @module lconn.test.jasmine.widget.urlPreview.URLPreviewNodeSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(array, lang, topic, URLPreviewNode, properties) {
   var THUMBS = [
         'a',
         'b'
   ], DATA = {
      url : 'http://www.example.com'
   };

   describe("the URLPreviewNode widget", function() {
      var widget, _property;
      beforeEach(function() {
         widget = new URLPreviewNode({
            data : DATA
         });
         _property = properties['lconn.core.widget.urlPreview.fullScreeVideosEnabled'];
      });
      afterEach(function() {
         if (widget) {
            widget.destroy();
         }
         properties['lconn.core.widget.urlPreview.fullScreeVideosEnabled'] = _property;
      });
      it("throws an error if instantiated with no arguments", function() {
         expect(function() {
            widget = new URLPreviewNode();
         }).toThrow();
      });
      it("throws an error if instantiated with an argument without a data member", function() {
         expect(function() {
            widget = new URLPreviewNode({
               foo : 'bar'
            });
         }).toThrow();
      });
      it("can be instantiated without errors - URL with http: protocol", function() {
         expect(function() {
            widget = new URLPreviewNode({
               data : {
                  url : 'http://www.example.com'
               }
            });
         }).not.toThrow();
         expect(widget).not.toBeNull();
         expect(widget.isFullScreenEnabled).toBeTruthy();
      });
      it("can be instantiated without errors - URL with no protocol", function() {
         expect(function() {
            widget = new URLPreviewNode({
               data : {
                  url : 'www.example.com'
               }
            });
         }).not.toThrow();
         expect(widget).not.toBeNull();
         expect(widget.isFullScreenEnabled).toBeTruthy();
      });
      it("can be instantiated without errors - fullscreen disabled", function() {
         properties['lconn.core.widget.urlPreview.fullScreeVideosEnabled'] = 'false';
         expect(function() {
            widget = new URLPreviewNode({
               data : DATA
            });
         }).not.toThrow();
         expect(widget).not.toBeNull();
         expect(widget.isFullScreenEnabled).toBeFalsy();
      });
      it("sets editable to true if closeCallback is set", function() {
         widget = new URLPreviewNode({
            data : DATA,
            closeCallback : function() {
               return;
            }
         });
         expect(widget.editable).toBeTruthy();
      });
      it("sets enablePlayback to true if data.enablePlayback is set", function() {
         widget = new URLPreviewNode({
            data : lang.mixin(lang.clone(DATA), {
               enablePlayback : true
            })
         });
         expect(widget.enablePlayback).toBeTruthy();
      });

      describe("the showMedia method", function() {
         it("is an alias to showVideo", function() {
            var EVENT = {};
            spyOn(widget, "showVideo");
            widget.showMedia(EVENT);
            expect(widget.showVideo).toHaveBeenCalledWith(EVENT);
         });
      });

      describe("the nextThumbnail method", function() {
         it("does nothing if data.thumbnails is not a non-empty array", function() {
            spyOn(widget, "setThumbnail");
            delete widget.data;
            widget.nextThumbnail();
            expect(widget.setThumbnail).not.toHaveBeenCalled();
         });
         it("bumps up the thumbnail index if data.thumbnails is a non-empty array", function() {
            spyOn(widget, "setThumbnail");
            widget.data = lang.mixin(lang.clone(DATA), {
               thumbnails : THUMBS
            });
            array.forEach([
                  0,
                  THUMBS.length - 1
            ], function(i) {
               var index = widget._currentThumbnailIndex = i;
               widget.nextThumbnail();
               expect(widget.setThumbnail).toHaveBeenCalled();
               index = index >= THUMBS.length - 1 ? 0 : index + 1;
               expect(widget._currentThumbnailIndex).toBe(index);
            });
         });
      });
      describe("the previousThumbnail method", function() {
         it("does nothing if data.thumbnails is not a non-empty array", function() {
            spyOn(widget, "setThumbnail");
            delete widget.data;
            widget.previousThumbnail();
            expect(widget.setThumbnail).not.toHaveBeenCalled();
         });
         it("bumps down the thumbnail index if data.thumbnails is a non-empty array", function() {
            spyOn(widget, "setThumbnail");
            widget.data = lang.mixin(lang.clone(DATA), {
               thumbnails : THUMBS
            });
            array.forEach([
                  0,
                  THUMBS.length - 1
            ], function(i) {
               var index = widget._currentThumbnailIndex = i;
               widget.previousThumbnail();
               expect(widget.setThumbnail).toHaveBeenCalled();
               index = (index < 1 ? THUMBS.length : index) - 1;
               expect(widget._currentThumbnailIndex).toBe(index);
            });
         });
      });

      describe("the renderData method", function() {
         var DATA_ONE_FLASH_VIDEO = {
            title : 'Flash Gordon',
            enablePlayback : true,
            video : [ {
               'video:type' : 'application/x-shockwave-flash',
               'type' : 'application/x-shockwave-flash'
            }
            ],
            provider_url : 'http://www.youtube.com'
         }, DATA_NO_VIDEO = {
            title : 'Under Pressure',
            enablePlayback : true,
            provider_url : 'http://www.youtube.com'
         };
         it("shows the play button when there's at least one video", function() {
            widget.renderData(DATA_ONE_FLASH_VIDEO);
            expect(dojo.hasClass(widget.playBtn, "lotusHidden")).toBeFalsy();
         });
         it("hides the play button when there is no video", function() {
            widget.renderData(DATA_NO_VIDEO);
            expect(dojo.hasClass(widget.playBtn, "lotusHidden")).toBeTruthy();
         });
      });

      describe("the toggleImage method", function() {
         it("toggles the visibility of the thumbnail and image controls", function() {
            widget.checkBox.checked = true;
            widget.toggleImage();
            expect(dojo.hasClass(widget.leftPane, "lconnPreviewHidden")).toBeTruthy();
            expect(dojo.hasClass(widget.imageChooser, "lconnPreviewHidden")).toBeTruthy();

            widget.checkBox.checked = false;
            widget.toggleImage();
            expect(dojo.hasClass(widget.leftPane, "lconnPreviewHidden")).toBeFalsy();
            expect(dojo.hasClass(widget.imageChooser, "lconnPreviewHidden")).toBeTruthy();

            widget.checkBox.checked = false;
            widget.data = lang.mixin(lang.clone(DATA), {
               thumbnails : THUMBS
            });
            widget.toggleImage();
            expect(dojo.hasClass(widget.leftPane, "lconnPreviewHidden")).toBeFalsy();
            expect(dojo.hasClass(widget.imageChooser, "lconnPreviewHidden")).toBeFalsy();
         });
      });

      describe("the setThumbnail method", function() {
         var THUMB_DATA = {
            alt : 'A rainbow unicorn running in a field',
            src : 'http://www.example.com/unicorn.gif'
         };
         it("sets the thumbnail", function() {
            widget.setThumbnail(THUMB_DATA);
            expect(widget.thumbnail.getAttribute('aria-label')).toBe(THUMB_DATA.alt);
            if (dojo.isIE === 8) {
               expect(widget.thumbnail.src).toBe(THUMB_DATA.src);
               expect(widget.thumbnail.style.width).toBe('120px');
               expect(widget.thumbnail.style.height).toBe('120px');
            }
            else {
               expect(widget.thumbnailContainer.style.background).toMatch(THUMB_DATA.src);
               expect(widget.thumbnailContainer.style.backgroundSize).toBe('cover');
            }
         });
      });

      describe("the closePreview method", function() {
         var sub;
         afterEach(function() {
            if (sub) {
               sub.remove();
            }
         });
         it("invokes the optional closeCallback", function() {
            widget.closeCallback = jasmine.createSpy('closeCallback');
            widget.closePreview();
            expect(widget.closeCallback).toHaveBeenCalled();
         });
         it("emits the topic", function() {
            var emitted = false;
            sub = topic.subscribe("ic-ui/urlpreview/closed", function() {
               emitted = true;
            });
            widget.closePreview();
            expect(emitted).toBeTruthy();
         });
      });
   });

   describe("the lconn.core.widget.urlPreview.URLPreviewNode.getCurrentData() method", function() {
      var results = {};
      var widget = new URLPreviewNode({
         data : DATA
      });
      var videoValues = {};
      var thumbnailValues = [
            {
               src : 'www.source1.com',
               alt : 'alt text #1'
            },
            {
               src : 'www.source2.com',
               alt : 'alt text #2'
            }
      ];
      widget._currentThumbnailIndex = 0;
      widget.data = {
         thumbnails : thumbnailValues,
         url : 'http://www.thisistheurl.com/v=000&options=nothing',
         provider_url : 'http://www.thisistheprovider.com',
         title : 'This is the title',
         description : 'Nice despcription for the video',
         video : videoValues
      };

      it("returns the current data", function() {
         results = widget.getCurrentData();
         expect(results.url).toBe('http://www.thisistheurl.com/v=000&options=nothing');
         expect(results.provider_url).toBe('http://www.thisistheprovider.com');
         expect(results.title).toBe('This is the title');
         expect(results.description).toBe('Nice despcription for the video');
         expect(results.thumbnail).toEqual(thumbnailValues[0]);
         expect(results.video).toBe(videoValues);
         widget._currentThumbnailIndex = 0;
      });

      it("returns the selected thumbnail", function() {
         widget._currentThumbnailIndex = 1;
         results = widget.getCurrentData();
         expect(results.thumbnail).toEqual(thumbnailValues[1]);

         widget.checkBox.checked = true;
         results = widget.getCurrentData();
         expect(results.thumbnail).toEqual({});
      });
   });

   describe("the lconn.core.widget.urlPreview.URLPreviewNode.constructor", function() {
      var widget = new URLPreviewNode({
         data : {
            url : 'www.thisistheurl.com/v=000&options=nothing',
            title : '<image/src="http://apps.collabservsvt2.swg.usma.ibm.com'
         }
      });

      it("initializes the input params and encodes the title", function() {
         expect(widget.url).toBe('http://www.thisistheurl.com/v=000&options=nothing');
         expect(widget.data.title).toBe('&lt;image/src=&quot;http://apps.collabservsvt2.swg.usma.ibm.com');
         expect(widget.data.provider_url).toBe('');
      });
   });
}(dojo, dojo, dojo, lconn.core.widget.urlPreview.URLPreviewNode, lconn.core.config.properties));
