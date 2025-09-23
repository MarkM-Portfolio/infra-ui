/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "dojo/_base/declare",
   "ic-share/fileviewer/preview/ImagePreview",
   "ic-share/fileviewer/FileViewer",
   "dojo/_base/config",
   "dojo/_base/array",
   "../MockFile"
], function (declare, ImagePreview, FileViewer, config, array, fileData) {
   "use strict";

   var ImageController = declare([], {
      constructor: function () {
         this.zoomToFit = true;
         this.height = 500;
         this.width = 500;
         this.window = {
            height: 500
         };
      },
      getHeight: function () {
         return this.height;
      },
      setHeight: function (height) {
         this.height = height;
      },
      getNaturalHeight: function () {
         return 1000;
      },
      getCurrentScale: function () {
         return (this.getHeight() / this.getNaturalHeight());
      },
      getZoomToFit: function () {
         return this.zoomToFit;
      },
      setZoomToFit: function () {
         this.zoomToFit = true;
         this.setHeight(this.window.height);
      },
      removeZoomToFit: function () {
         this.zoomToFit = false;
         this.setHeight(this.getNaturalHeight());
      }
   });

   function callThrough(context, name) {
     var spy = spyOn(context, name);

     if (spy.and) {
       spy.and.callThrough(); // Jasmine 2.0
     } else {
       spy.andCallThrough();  // Jasmine 1.3
     }
   }

   describe("ImagePreview.updateCurrentScale()", function () {
      beforeEach(function () {

         config.blankGif = "";
         this.file = FileViewer.createConnectionsFile(fileData);
         this.imageController = new ImageController();
         this.imagePreview = ImagePreview.create({ file: this.file, imageController: this.imageController});
      });
      it("Should update the scale with a ration to currentHeight:NaturalHeight", function () {
         this.imagePreview.currentScale = 10;
         this.imagePreview.updateCurrentScale();
         expect(this.imagePreview.getCurrentScale()).not.toEqual(10);
         expect(this.imagePreview.getCurrentScale()).toEqual(0.5);
      });
   });
   describe("ImagePreview.enableZoom()", function () {
      beforeEach(function () {
         config.blankGif = "";
         this.file = FileViewer.createConnectionsFile(fileData);
         this.imageController = new ImageController();
         this.imagePreview = ImagePreview.create({ file: this.file, imageController: this.imageController});
      });
      it("Should remove zoomToFit class", function () {
         this.imagePreview.enableZoom();
         expect(this.imageController.getZoomToFit()).toBe(false);
      });
      it("Should update 'this.scale' based on current scale", function () {
         this.imagePreview.enableZoom();
         expect(this.imagePreview.getZoomScale()).toEqual(0.5);
      });
   });
   describe("ImagePreview.zoomIn()", function () {
      beforeEach(function () {
         config.blankGif = "";
         this.file = FileViewer.createConnectionsFile(fileData);
         this.imageController = new ImageController();
         this.imagePreview = ImagePreview.create({ file: this.file, imageController: this.imageController});
         callThrough(this.imagePreview, '_zoom');
         callThrough(this.imagePreview, 'enableZoom');
         callThrough(this.imageController, 'setHeight');
      });
      it("Should call the private '_zoom()' function and 'enableZoom()' function", function () {
         expect(this.imageController.getZoomToFit()).toBe(true);
         this.imagePreview.zoomIn();
         expect(this.imagePreview._zoom).toHaveBeenCalled();
         expect(this.imagePreview.enableZoom).toHaveBeenCalled();
      });
      it("Should increase image height by the next scale increment", function () {
         this.imagePreview.zoomIn();
         expect(this.imageController.setHeight).toHaveBeenCalled();
         expect(this.imageController.getCurrentScale()).toEqual(0.75);
         expect(this.imageController.getHeight()).toEqual((0.75 * this.imageController.getNaturalHeight()));
      });
      it("Should not call 'enableZoom()' if zoomToFit is not enabled.", function () {
         this.imageController.removeZoomToFit();
         this.imagePreview.zoomIn();
         expect(this.imagePreview.enableZoom).not.toHaveBeenCalled();
      });
      it("Should not zoom past the max factor in increments", function () {
         var incrementsLen = this.imagePreview._increments.length;

         this.imagePreview.zoomIn();
         this.imagePreview.zoomIn();
         this.imagePreview.zoomIn();
         this.imagePreview.zoomIn();
         this.imagePreview.zoomIn();
         this.imagePreview.zoomIn();
         this.imagePreview.zoomIn();
         this.imagePreview.zoomIn();

         expect(this.imageController.getHeight())
            .toEqual((this.imageController.getNaturalHeight() * this.imagePreview._increments[incrementsLen - 1]));
      });
   });
   describe("ImagePreview.zoomOut()", function () {
      beforeEach(function () {
         config.blankGif = "";
         this.file = FileViewer.createConnectionsFile(fileData);
         this.imageController = new ImageController();
         this.imagePreview = ImagePreview.create({ file: this.file, imageController: this.imageController});
         callThrough(this.imagePreview, '_zoom');
         callThrough(this.imagePreview, 'enableZoom');
         callThrough(this.imageController, 'setHeight');
      });
      it("Should call the private '_zoom()' function and 'enableZoom()' function", function () {
         this.imagePreview.zoomOut();
         expect(this.imagePreview._zoom).toHaveBeenCalled();
         expect(this.imagePreview.enableZoom).toHaveBeenCalled();
      });
      it("Should decrease image height by the next scale increment", function () {
         this.imagePreview.zoomOut();
         expect(this.imageController.setHeight).toHaveBeenCalled();
         expect(this.imageController.getCurrentScale()).toEqual(0.25);
         expect(this.imageController.getHeight()).toEqual((0.25 * this.imageController.getNaturalHeight()));
      });
      it("Should not call 'enableZoom()' if zoomToFit is not enabled.", function () {
         this.imageController.removeZoomToFit();
         this.imagePreview.zoomOut();
         expect(this.imagePreview.enableZoom).not.toHaveBeenCalled();
      });
      it("Should not zoom below the lowest factor in increments", function () {

         this.imagePreview.zoomOut();
         this.imagePreview.zoomOut();
         this.imagePreview.zoomOut();
         this.imagePreview.zoomOut();
         this.imagePreview.zoomOut();
         this.imagePreview.zoomOut();

         expect(this.imageController.getHeight())
            .toEqual((this.imageController.getNaturalHeight() * this.imagePreview._increments[0]));
      });
   });
   describe("ImagePreview.reset()", function () {
      beforeEach(function () {
         config.blankGif = "";
         this.file = FileViewer.createConnectionsFile(fileData);
         this.imageController = new ImageController();
         this.imagePreview = ImagePreview.create({ file: this.file, imageController: this.imageController});
         this.imagePreview.zoomIn();
      });
      it("Should add the 'zoomToFit' class back", function () {
         expect(this.imageController.getZoomToFit()).toBe(false);
         this.imagePreview.reset();
         expect(this.imageController.getZoomToFit()).toBe(true);
      });
      it("Should update the scale based on window size", function () {
         expect(this.imageController.getZoomToFit()).toBe(false);
         expect(this.imageController.getCurrentScale()).toBeGreaterThan(0.5);
         this.imagePreview.reset();
         expect(this.imageController.getCurrentScale()).toEqual(0.5);
      });
   });
   describe("ImagePreview.isValid()", function () {
      beforeEach(function () {
         config.blankGif = "";
         this.file = FileViewer.createConnectionsFile(fileData);
         this.imageController = new ImageController();
      });

      array.forEach(["png", "jpg", "jpeg", "gif", "doc", "pdf"], function (type) {
         it("should return true if the file type is " + type, function () {
            this.file.args.type = type;
            expect(ImagePreview.isValid(this.file)).toBeTruthy();
         });
      });

      it("Should return false if it is not a valid file type", function () {
         this.file.args.type = "asd";
         expect(ImagePreview.isValid(this.file)).toBeFalsy();
      });
   });
});
