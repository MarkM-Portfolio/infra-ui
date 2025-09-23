/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("lconn.share.test.widget.ResizableSpec");

   dojo.require("dojo.cache");
   dojo.require("lconn.share.widget.Resizable");

   describe("lconn.share.test.widget.Resizable.(set|get)DefaultWidth", function() {
      var resizable = new lconn.share.widget.Resizable();

      it("set a valid default width", function() {
         resizable.setDefaultWidth(400);
         expect(resizable.getDefaultWidth()).toBe(400);
      });

      it("set an invalid default width", function() {
         resizable.setDefaultWidth(-1);
         expect(resizable.getDefaultWidth()).toBe(400);
      });
   });

   describe("lconn.share.test.widget.Resizable.(set|get)DefaultInnerWidths", function() {
      var resizable = new lconn.share.widget.Resizable();

      it("Add inner widget1", function() {
         resizable.setDefaultInnerWidth("widget1", 300);
         expect(resizable.getDefaultInnerWidth("widget1")).toBe(300);
      });

      it("Add inner widget2", function() {
         resizable.setDefaultInnerWidth("widget2", 310);
         expect(resizable.getDefaultInnerWidth("widget2")).toBe(310);
      });

      it("Update inner widget1", function() {
         resizable.setDefaultInnerWidth("widget1", 200);
         expect(resizable.getDefaultInnerWidth("widget1")).toBe(200);
      });

      it("An invalid name", function() {
         resizable.setDefaultInnerWidth(null, 210);
         expect(resizable.getDefaultInnerWidth(null)).toBe(null);
      });

      it("Invalid value", function() {
         resizable.setDefaultInnerWidth("widget2", -1);
         expect(resizable.getDefaultInnerWidth("widget2")).toBe(310);
      });
   });

   describe("lconn.share.test.widget.Resizable.adjustWidths", function() {
      
      it("Adjust w/o inner items", function() {
         var resizable = new lconn.share.widget.Resizable();
         resizable.setDefaultWidth(400);

         resizable.adjustWidths(500);
         expect(resizable.getDefaultWidth()).toBe(400);
         expect(resizable.getWidth()).toBe(500);
      });
      
      it("Adjust w/o inner items, set invalid width", function() {
         var resizable = new lconn.share.widget.Resizable();
         resizable.setDefaultWidth(400);

         resizable.adjustWidths(-1);
         expect(resizable.getDefaultWidth()).toBe(400);
         expect(resizable.getWidth()).toBe(400);
      });

      it("Adjust w/o inner items, set a invalid width", function() {
         var resizable = new lconn.share.widget.Resizable();
         resizable.setDefaultWidth(400);

         resizable.adjustWidths(null);
         expect(resizable.getDefaultWidth()).toBe(400);
         expect(resizable.getWidth()).toBe(400);
      });

      it("Adjust w/ inner itmes - increase", function() {
         var resizable = new lconn.share.widget.Resizable();
         resizable.setDefaultWidth(400);
         resizable.setDefaultInnerWidth("widget1", 300)
         resizable.setDefaultInnerWidth("widget2", 200)
         resizable.setDefaultInnerWidth("widget3", 210)

         resizable.adjustWidths(600);
         expect(resizable.getDefaultInnerWidth("widget1")).toBe(300);
         expect(resizable.getDefaultInnerWidth("widget2")).toBe(200);
         expect(resizable.getDefaultInnerWidth("widget3")).toBe(210);

         var ratio = 600 / 400;
         expect(resizable.getWidth()).toBe(600);
         expect(resizable.getInnerWidth("widget1")).toBe(Math.round(300 * ratio));
         expect(resizable.getInnerWidth("widget2")).toBe(Math.round(200 * ratio));
         expect(resizable.getInnerWidth("widget3")).toBe(Math.round(210 * ratio));
      });

      it("Adjust w/ inner itmes - shrink", function() {
         var resizable = new lconn.share.widget.Resizable();
         resizable.setDefaultWidth(400);
         resizable.setDefaultInnerWidth("widget1", 300)
         resizable.setDefaultInnerWidth("widget2", 200)
         resizable.setDefaultInnerWidth("widget3", 210)

         resizable.adjustWidths(300);
         expect(resizable.getDefaultInnerWidth("widget1")).toBe(300);
         expect(resizable.getDefaultInnerWidth("widget2")).toBe(200);
         expect(resizable.getDefaultInnerWidth("widget3")).toBe(210);

         var ratio = 300 / 400;
         expect(resizable.getWidth()).toBe(300);
         expect(resizable.getInnerWidth("widget1")).toBe(Math.round(300 * ratio));
         expect(resizable.getInnerWidth("widget2")).toBe(Math.round(200 * ratio));
         expect(resizable.getInnerWidth("widget3")).toBe(Math.round(210 * ratio));
      });
   });
   
   // TODO test getWidthInPix
   // TODO test getInnerWidthInPix
   
}());
