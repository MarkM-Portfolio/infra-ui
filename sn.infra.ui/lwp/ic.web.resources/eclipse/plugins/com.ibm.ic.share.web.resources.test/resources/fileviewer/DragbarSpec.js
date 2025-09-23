/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-share/fileviewer/Dragbar",
   "dojo/Stateful",
   "dojo/keys"
], function (Dragbar, Stateful, keys) {
   "use strict";

   describe("Dragbar._computeSizeWithMouse()", function () {
      beforeEach(function () {
         this.state = new Stateful({
            panelSize: 350
         });

         this.dragbar = new Dragbar({ model: this.state });

         this.args = {
            clientX: 600,
            windowWidth: 1000,
            panelsClosedSize: 10,
            previewSnapClosedSize: 100,
            previewMinimumSize: 500,
            panelsSnapClosedSize: 100,
            panelsMinimumSize: 300
         };
      });

      it("should allow the panels to be resized within the legal bounds", function () {
         expect(this.dragbar._computeSizeWithMouse(this.args)).toBe(400);
      });

      it("should limit the panels to their minimum size", function () {
         this.args.clientX = 850;
         expect(this.dragbar._computeSizeWithMouse(this.args)).toBe(300);
      });

      it("should snap the panels closed", function () {
         this.args.clientX = 950;
         expect(this.dragbar._computeSizeWithMouse(this.args)).toBe(10);
      });

      it("should limit the content area to its minimum size", function () {
         this.args.clientX = 300;
         expect(this.dragbar._computeSizeWithMouse(this.args)).toBe(500);
      });

      it("should snap the panels to fullscreen", function () {
         this.args.clientX = 50;
         expect(this.dragbar._computeSizeWithMouse(this.args)).toBe(1000);
      });
   });
   
   describe("Dragbar._computeSizeWithKey()", function () {
      beforeEach(function () {
         this.state = new Stateful({
            panelSize: 350
         });

         this.dragbar = new Dragbar({ model: this.state });

         this.args = {
            clientX: null,
            windowWidth: 1000,
            panelsClosedSize: 10,
            previewSnapClosedSize: 100,
            previewMinimumSize: 500,
            panelsSnapClosedSize: 100,
            panelsMinimumSize: 300
         };
      });

      it("should snap the panels closed", function () {
         this.keyCode = keys.RIGHT_ARROW;
         this.panelNavContainer = {offsetWidth: 200};
         this.leftToRight = true;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(10);
      });
      
      it("should increase size of the panel", function () {
         this.keyCode = keys.LEFT_ARROW;
         this.panelNavContainer = {offsetWidth: 300};
         this.leftToRight = true;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(310);
      });
      
      it("should decrease size of the panel", function () {
         this.keyCode = keys.RIGHT_ARROW;
         this.panelNavContainer = {offsetWidth: 400};
         this.leftToRight = true;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(390);
      });
      
      it("should snap the panels to fullscreen", function () {
         this.keyCode = keys.LEFT_ARROW;
         this.panelNavContainer = {offsetWidth: 600};
         this.leftToRight = true;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(1000);
      });
      
      it("should snap the panels to maximum size", function () {
         this.keyCode = keys.RIGHT_ARROW;
         this.panelNavContainer = {offsetWidth: 1000};
         this.leftToRight = true;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(500);
      });
      
      it("should keep panels at the minimum size", function () {
         this.keyCode = keys.RIGHT_ARROW;
         this.panelNavContainer = {offsetWidth: 10};
         this.leftToRight = true;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(10);
      });
      
      it("should keep panels at the maximum size", function () {
         this.keyCode = keys.LEFT_ARROW;
         this.panelNavContainer = {offsetWidth: 1000};
         this.leftToRight = true;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(1000);
      });
      
      it("should snap the panels closed in right-to-left", function () {
         this.keyCode = keys.LEFT_ARROW;
         this.panelNavContainer = {offsetWidth: 200};
         this.leftToRight = false;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(10);
      });
      
      it("should increase size of the panel in right-to-left", function () {
         this.keyCode = keys.RIGHT_ARROW;
         this.panelNavContainer = {offsetWidth: 300};
         this.leftToRight = false;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(310);
      });
      
      it("should decrease size of the panel in right-to-left", function () {
         this.keyCode = keys.LEFT_ARROW;
         this.panelNavContainer = {offsetWidth: 400};
         this.leftToRight = false;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(390);
      });
      
      it("should keep panels at the minimum size in right-to-left", function () {
         this.keyCode = keys.LEFT_ARROW;
         this.panelNavContainer = {offsetWidth: 10};
         this.leftToRight = false;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(10);
      });
      
      it("should snap the panels to fullscreen in right-to-left", function () {
         this.keyCode = keys.RIGHT_ARROW;
         this.panelNavContainer = {offsetWidth: 501};
         this.leftToRight = false;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(1000);
      });
      
      it("should snap the panels to maximum size in right-to-left", function () {
         this.keyCode = keys.LEFT_ARROW;
         this.panelNavContainer = {offsetWidth: 1000};
         this.leftToRight = false;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(500);
      });
      
      it("should keep panels at the maximum size in right-to-left", function () {
         this.keyCode = keys.RIGHT_ARROW;
         this.panelNavContainer = {offsetWidth: 1000};
         this.leftToRight = false;
         expect(this.dragbar._computeSizeWithKey(this.args, this.keyCode, this.panelNavContainer, this.leftToRight)).toBe(1000);
      });
   });
});
